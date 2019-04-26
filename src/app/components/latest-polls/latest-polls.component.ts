import {Component, OnInit} from '@angular/core';
import {AngularFirestore} from '@angular/fire/firestore';
import {PollService} from '../../services/poll.service';
import Poll from '../../models/Poll';
import {AuthService} from '../../services/auth.service';

@Component({
  selector: 'app-latest-polls',
  templateUrl: './latest-polls.component.html',
  styleUrls: ['./latest-polls.component.css']
})
export class LatestPollsComponent implements OnInit {
  polls: any[];

  constructor(private db: AngularFirestore, private pollService: PollService, private authService: AuthService) {
  }

  ngOnInit() {
    if (this.authService.isUserLoggedIn()) {
      this.getLatestPolls();
    } else {
      this.authService
        .getCurrentUser()
        .subscribe(user => {
          if (user) {
            this.getLatestPolls();
          }
        });
    }
  }

  getLatestPolls() {
    this.pollService
      .getLatestPolls()
      .subscribe(polls => {
        this.polls = polls;
      });
  }
}
