export interface Note {
  title: string;
  description: string;
  createdDate: Date;
  createdDateString: string;
  noteID: number;
  task?: boolean;
  show: boolean;
}
