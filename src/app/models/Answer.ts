import * as firebase from 'firebase';

export default class Answer {
  id: string;
  userId: string;
  timestamp: number;

  constructor(id: string, userId: string, timestamp: number) {
    this.id = id;
    this.userId = userId;
    this. timestamp = timestamp;
  }
}
