export default class Comments {
  timestamp: number;
  userId: string;
  text: string;

  constructor(userId: string, text: string) {
    this.timestamp = new Date().getTime();
    this.userId = userId;
    this.text = text;
  }
}
