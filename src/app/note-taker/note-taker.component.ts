import { Component, OnInit } from '@angular/core';
import { Note } from '../note';
import { NotesService } from '../services/notes.service';

@Component({
  selector: 'app-note-taker',
  templateUrl: './note-taker.component.html',
  styleUrls: ['./note-taker.component.css']
})
export class NoteTakerComponent implements OnInit {

  note: Note;
  notes: Note[];
  errMessage: string;

  constructor(private noteservice: NotesService) {
    this.note = new Note();
    this.notes = [];
  }
  ngOnInit() {
  }

  addNote() {
    if (this.note.title && this.note.text) {
      this.notes.push(this.note);
      this.noteservice.addNote(this.note).subscribe(
        data => { },
        err => {
          this.errMessage = err.message;
        });
      this.note = new Note();
    } else {
      this.errMessage = 'Title and Text both are required fields';
    }
  }


}


