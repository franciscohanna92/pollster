import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';

import Poll from '../../models/Poll';
import PollOption from '../../models/PollOption';
import {PollService} from '../../services/poll.service';
import {AuthService} from '../../services/auth.service';

@Component({
  selector: 'app-poll-results',
  templateUrl: './poll-results.component.html',
  styleUrls: ['./poll-results.component.css']
})
export class PollResultsComponent implements OnInit {
  poll: Poll;
  pollOptions: PollOption[] = [];

  constructor(private currentRoute: ActivatedRoute, private router: Router, private pollService: PollService, private authService: AuthService) {
  }

  ngOnInit() {
    if (this.authService.isUserLoggedIn()) {
      this.initData();
    } else {
      this.authService
        .getCurrentUser()
        .subscribe(user => {
          if (user) {
            this.initData();
          }
        });
    }
  }

  initData() {
    this.getPoll();
    this.getPollOptions();
  }

  getPoll() {
    const pollId = this.currentRoute.snapshot.paramMap.get('pollId');
    this.pollService
      .getPoll(pollId)
      .subscribe(poll => {
        this.poll = poll;
      });
  }

  getPollOptions() {
    const pollId = this.currentRoute.snapshot.paramMap.get('pollId');
    this.pollService
      .getPollOptions(pollId)
      .subscribe(pollOptions => {
        this.pollOptions = pollOptions;
      });
  }

  getPercentage(totalAnswers: number): number {
    return parseFloat((totalAnswers / this.poll.totalAnswers * 100)
      .toFixed(2));
  }
}
