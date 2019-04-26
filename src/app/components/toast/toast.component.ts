import {Component, OnInit} from '@angular/core';
import {ToastService} from './toast.service';
import {ToastMessage} from './ToastMessage';

@Component({
  selector: 'app-toast',
  templateUrl: './toast.component.html',
  styleUrls: ['./toast.component.css']
})
export class ToastComponent implements OnInit {
  message: ToastMessage;
  showToast: boolean;

  constructor(private toastService: ToastService) {
    this.showToast = false;
  }

  ngOnInit() {
    this.toastService
      .newMessage()
      .subscribe(message => {
        this.message = message;
        setTimeout(() => {
          this.message = null
        }, 2000)
      })
  }

  // getMessageClass() {
  //   return `alert-${this.message.type}`
  // }
}
