import {Component, OnInit, AfterViewInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {PollService} from '../../services/poll.service';
import Poll from '../../models/Poll';
import PollOption from '../../models/PollOption';
import {ToastrService} from 'ngx-toastr';
import {AuthService} from '../../services/auth.service';
import {ToastService} from '../../toast/toast.service';

@Component({
  selector: 'app-poll-view',
  templateUrl: './poll-view.component.html',
  styleUrls: ['./poll-view.component.css']
})
export class PollViewComponent implements OnInit, AfterViewInit {
  pollId: string;
  poll: Poll;
  pollOptions: PollOption[];
  selectedOptionId: string;
  currentUrl = window.location.href;
  currentUrlInput = null;
  alreadyAnswered: boolean;

  ngAfterViewInit() {
    this.currentUrlInput = document.getElementById('currentUrlInput');
  }

  constructor(private currentRoute: ActivatedRoute,
              private router: Router,
              private pollService: PollService,
              private toastService: ToastService,
              private authService: AuthService) {
    this.pollId = this.currentRoute.snapshot.paramMap.get('pollId');
    this.alreadyAnswered = false;
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
    this.isPollAlreadyAnsweredByUser();
    this.getPoll();
    this.getPollOptions();
  }

  isPollAlreadyAnsweredByUser() {
    this.pollService.isPollAlreadyAnsweredByUser(this.pollId).then(answer => {
      if(answer) {
        this.selectedOptionId = answer.selectedOptionId;
        this.alreadyAnswered = true;
      }
    });
  }

  getPoll() {
    this.pollService
      .getPoll(this.pollId)
      .subscribe(poll => {
        this.poll = poll;
      });
  }

  getPollOptions() {
    this.pollService
      .getPollOptions(this.pollId)
      .subscribe(pollOptions => {
        this.pollOptions = pollOptions;
      });
  }

  copyLink(): void {
    // console.log(this.currentUrlInput.value);
    this.currentUrlInput.select();
    document.execCommand('copy');
    this.toastService.show('Link copied to the clipboard', 'success');
    this.currentUrlInput.blur();
  }

  onSubmit() {
    this.pollService
      .addAnswer(this.poll.id, this.selectedOptionId)
      .then(() => {
        this.router.navigate(['poll', this.poll.id, 'results']);
      });
  }
}
