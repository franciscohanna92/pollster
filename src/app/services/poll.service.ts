import * as firebase from 'firebase';
import {Injectable} from '@angular/core';
import {Observable, of} from 'rxjs';
import {AngularFireDatabase, AngularFireList, SnapshotAction, snapshotChanges} from '@angular/fire/database';
import {Action, AngularFirestore, DocumentChangeAction, DocumentReference, DocumentSnapshot} from '@angular/fire/firestore';

import Poll from '../models/Poll';
import {map} from 'rxjs/operators';
import PollOption from '../models/PollOption';
import FieldValue = firebase.firestore.FieldValue;
import {AuthService} from './auth.service';
import Answer from '../models/Answer';

@Injectable({
  providedIn: 'root'
})
export class PollService {
  pollsRef: AngularFireList<any>;

  constructor(private db: AngularFirestore, private authService: AuthService) {
  }

  getLatestPolls(): Observable<{}[]> {
    return this.db
      .collection('polls', ref => ref.limit(10)
        .orderBy('id', 'desc'))
      .valueChanges();
    // .pipe(
    //   map((actions: DocumentChangeAction<Poll>[]) => {
    //     return actions.map((a: DocumentChangeAction<Poll>) => {
    //       const poll: Poll = a.payload.doc.data() as Poll;
    //       poll.id = a.payload.doc.id;
    //       return poll;
    //     });
    //   }),
    // );
  }

  getPoll(pollId: string): Observable<Poll> {
    return this.db.collection('polls')
      .doc(pollId)
      .snapshotChanges()
      .pipe(
        map((snapshopt: Action<DocumentSnapshot<Poll>>) => {
          const poll: Poll = snapshopt.payload.data() as Poll;
          poll.id = snapshopt.payload.id;
          return poll;
        })
      );
  }

  getPollOptions(pollId: string): Observable<PollOption[]> {
    return this.db.collection(`polls/${pollId}/options`, ref => ref.orderBy('order', 'asc'))
      .snapshotChanges()
      .pipe(
        map((actions: DocumentChangeAction<PollOption>[]) => {
          return actions.map((a: DocumentChangeAction<PollOption>) => {
            const pollOption: PollOption = a.payload.doc.data() as PollOption;
            pollOption.id = a.payload.doc.id;
            return pollOption;
          });
        }),
      );
  }

  async savePoll(newPoll: Poll, newPollOptions: PollOption[]): Promise<void> {
    newPoll.userId = this.authService.getCurrentUserId();
    await this.db.collection('polls')
      .doc(newPoll.id)
      .set({...newPoll});
    for (let i: number = 0; i < newPollOptions.length; i++) {
      let option: PollOption = newPollOptions[i];
      option.order = i;
      await this.db.collection(`polls/${newPoll.id}/options`)
        .doc(option.id)
        .set({color: PollService.randomRgba(), ...option});
    }
  }

  static randomRgba() {
    const o = Math.round, r = Math.random, s = 255;
    return 'rgba(' + o(r() * s) + ',' + o(r() * s) + ',' + o(r() * s) + ', 1)';
  }

  addAnswer(pollId: string, selectedOptionId: string): Promise<void> {
    const userId = this.authService.getCurrentUserId();
    const timestamp = new Date().getTime();
    const answer = new Answer(this.db.createId(), userId, timestamp);

    const pollRef = this.db.collection(`polls`).doc(pollId).ref;
    const optionRef = this.db.collection(`polls/${pollId}/options`).doc(selectedOptionId).ref;
    const answerRef = this.db.collection(`polls/${pollId}/options/${selectedOptionId}/answers`).doc(answer.id).ref;
    const userPollsAnsweredRef = this.db.collection(`users/${userId}/pollsAnswered`).doc(this.db.createId()).ref;

    return this.db.firestore.runTransaction(transaction => {
      transaction.update(optionRef, {totalAnswers: FieldValue.increment(1)});
      transaction.update(pollRef, {totalAnswers: FieldValue.increment(1)});
      transaction.set(answerRef, {...answer});
      transaction.set(userPollsAnsweredRef, {
        pollId,
        selectedOptionId,
        timestamp
      });

      return Promise.resolve();
    });
  }

  async isPollAlreadyAnsweredByUser(pollId: string): Promise<any> {
    const userId = this.authService.getCurrentUserId();
    const snapshot = await this.db
      .collection(`users/${userId}/pollsAnswered`, ref => {
        return ref.where('pollId', '==', pollId)
      }).get()
      .toPromise();
    return Promise.resolve(snapshot.docs.length > 0 ? snapshot.docs[0].data() : null);
  }
}
