import * as firebase from 'firebase';
import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {faPollH} from '@fortawesome/free-solid-svg-icons';
import {AuthService} from './services/auth.service';
import {ToastService} from './components/toast/toast.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'pollster';
  faPollH = faPollH;

  constructor(public router: Router, private authService: AuthService) {
    this.login();
  }

  ngOnInit() {
  }

  login() {
    this.authService.login();
  }
}
