import { Component, TemplateRef, ViewChild } from '@angular/core';
import { Note } from '../note-model';

import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
@Component({
  selector: 'app-note',
  templateUrl: './note.component.html',
  styleUrls: ['./note.component.css'],
})
export class NoteComponent {
  constructor(private modalService: BsModalService) {}
  modalRef?: BsModalRef;
  @ViewChild('manageNote', { static: true })
  manageNoteModal!: TemplateRef<any>;
  toggleDone(x: any) {
    x.task = !x.task;
  }
  deleteNote(x: any) {
    x.show = false;
  }
  popAdd(x: any) {
    this.modalRef = this.modalService.show(this.manageNoteModal);
    //only triggered if editing: set up the target
    if (x.noteID != null) {
      this.targetNote.noteID = x.noteID;
      if (x.task == true) {
        this.targetNote.task = true;
      } else {
        this.targetNote.task = false;
      }
      this.targetNote.createdDate = new Date();
      this.targetNote.createdDateString = new Date().toLocaleDateString();
      this.targetNote.description = x.description;
      this.targetNote.title = x.title;
      this.targetNote.show = true;
    }
  }
  initialID = 0;
  targetNote: Note = {} as Note;
  notes: Array<Note> = [];

  onSubmit(value: any): void {
    this.modalRef?.hide();

    //find instead of pushing
    let s = this.notes.find((x) => x.noteID == this.targetNote.noteID);
    if (s == null) {
      if (value.task == true) {
        this.targetNote.task = value.task;
      } else {
        this.targetNote.task = undefined;
      }
      this.targetNote.noteID = this.initialID;
      this.initialID++;
      this.targetNote.show = true;
      this.targetNote.createdDate = new Date();
      this.targetNote.createdDateString = new Date().toLocaleDateString();
      this.targetNote.description = value.description;
      this.targetNote.title = value.title;
      this.notes.push(this.targetNote);
      this.targetNote = {} as Note;
    } else {
      if (value.task == false) {
        console.log(value);
        s.task = undefined;
      } else if (value.task == true) {
        s.task = true;
      }
      s.title = value.title;
      s.description = value.description;
    }
    this.targetNote = {} as Note;
  }

  onClose(): void {
    this.modalRef?.hide();
    this.targetNote = {} as Note;
  }
}
