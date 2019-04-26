export default class Poll {
  id: string;
  userId: string;
  title: string;
  totalAnswers: number;

  constructor(id: string = null, userId: string = null, title: string = null, totalAnswers: number = 0) {
    this.id = id;
    this.userId = userId;
    this.title = title;
    this.totalAnswers = totalAnswers;
  }
}
