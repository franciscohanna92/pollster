import {Component, OnInit} from '@angular/core';
import {PollService} from '../../services/poll.service';
import {Router} from '@angular/router';
import Poll from '../../models/Poll';
import PollOption from '../../models/PollOption';
import {AngularFirestore} from '@angular/fire/firestore';
import {AuthService} from '../../services/auth.service';

@Component({
  selector: 'app-poll-create',
  templateUrl: './poll-create.component.html',
  styleUrls: ['./poll-create.component.css']
})
export class PollCreateComponent implements OnInit {
  poll: Poll;
  pollOptions: PollOption[];

  constructor(private pollService: PollService, private router: Router, private db: AngularFirestore, private authService: AuthService) {
    this.poll = new Poll(this.db.createId());
    this.pollOptions = [
      new PollOption(this.db.createId()),
      new PollOption(this.db.createId()),
      new PollOption(this.db.createId())
    ];
  }

  ngOnInit() {
  }

  addOption(): void {
    this.pollOptions.push(new PollOption(this.db.createId()));
  }

  removeOption(i: number): void {
    this.pollOptions.splice(i, 1);
  }

  onSubmit(): void {
    this.pollService.savePoll(this.poll, this.pollOptions).then(() => {
      this.router.navigate(['poll', this.poll.id]);
    });
  }
}
