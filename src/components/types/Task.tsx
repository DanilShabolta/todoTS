class Task {
  id: number;
  index: number;
  title: string;
  text: string;
  isPinned?: boolean;

  constructor(title: string, text: string, index: number) {
    this.id = new Date().getTime();
    this.index = index;
    this.title = title;
    this.text = text;
    this.isPinned = false;
  }
}

export default Task;

export interface iTask {
  id: number;
  index: number;
  title: string;
  text: string;
  isPinned?: boolean;
}
