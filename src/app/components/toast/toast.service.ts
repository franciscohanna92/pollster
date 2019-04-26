import { Injectable } from '@angular/core';
import {Observable, Subject} from 'rxjs';
import {ToastMessage} from './ToastMessage';

@Injectable({
  providedIn: 'root'
})
export class ToastService {
  toastMessage = new Subject<any>();

  constructor() { }

  show(content: string, type: string): void {
    this.toastMessage.next(new ToastMessage(content, type));
  }

  newMessage(): Observable<ToastMessage> {
    return this.toastMessage.asObservable();
  }
}
