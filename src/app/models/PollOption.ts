import * as firebase from 'firebase';

import Timestamp = firebase.firestore.Timestamp;

export default class PollOption {
  id: string;
  text: string;
  order: number;
  totalAnswers: number;
  color: string;
  answers: Timestamp[];

  constructor(id: string = null, text: string = '', totalAnswers: number = 0, color: string = PollOption.randomRgba(), order: number = null) {
    this.id = id;
    this.text = text;
    this.order = order;
    this.totalAnswers = totalAnswers;
    this.color = color;
    this.answers = [];
  }

  static randomRgba() {
    const o = Math.round, r = Math.random, s = 255;
    return 'rgba(' + o(r() * s) + ',' + o(r() * s) + ',' + o(r() * s) + ',' + r().toFixed(1) + ')';
  }
}
