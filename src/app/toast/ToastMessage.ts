export class ToastMessage {
  content: string;
  type: string;

  constructor(content: string, type: string) {
    this.content = content;
    this.type = type || 'info';
  }
}
