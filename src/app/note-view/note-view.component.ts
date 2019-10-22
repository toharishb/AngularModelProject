import { Component } from '@angular/core';
import { Note } from '../note';
import { NotesService } from '../services/notes.service';
import { OnInit } from '@angular/core/src/metadata/lifecycle_hooks';

@Component({
  selector: 'app-note-view',
  templateUrl: './note-view.component.html',
  styleUrls: ['./note-view.component.css']
})
export class NoteViewComponent implements OnInit {

  notes: Array<Note>;

  constructor(private notesservice: NotesService) {

    this.notes = [];
  }

  ngOnInit() {
    this.notesservice
      .getNotes()
      .subscribe(data => (this.notes = data), err => console.log(err));
  }
}
