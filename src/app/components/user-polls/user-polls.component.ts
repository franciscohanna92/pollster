import {Component, OnInit} from '@angular/core';
import {PollService} from '../../services/poll.service';
import {AuthService} from '../../services/auth.service';
import Poll from '../../models/Poll';

@Component({
  selector: 'app-user-polls',
  templateUrl: './user-polls.component.html',
  styleUrls: ['./user-polls.component.css']
})
export class UserPollsComponent implements OnInit {
  polls: Poll[];

  constructor(private pollService: PollService, private authService: AuthService) {
  }

  ngOnInit() {
    if (this.authService.isUserLoggedIn()) {
      this.getUserPolls();
    } else {
      this.authService
        .getCurrentUser()
        .subscribe(user => {
          if (user) {
            this.getUserPolls();
          }
        });
    }
  }

  getUserPolls(): void {
    this.pollService
      .getUserPolls()
      .subscribe((polls: Poll[]) => {
        this.polls = polls;
      });
  }
}
