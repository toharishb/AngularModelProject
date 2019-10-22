import { Component, OnInit } from '@angular/core';
import { Note } from '../note';
import { NotesService } from '../services/notes.service';
import { filter } from 'rxjs/operators';
import { map } from 'rxjs/operators';



@Component({
  selector: 'app-list-view',
  templateUrl: './list-view.component.html',
  styleUrls: ['./list-view.component.css']
})
export class ListViewComponent implements OnInit {

  notStartedNotes: Array<Note>;
  startedNotes: Array<Note>;
  completedNotes: Array<Note>;
  note: Note;

  constructor(private notesservice: NotesService) {
    this.notStartedNotes = [];
    this.startedNotes = [];
    this.completedNotes = [];
  }

  ngOnInit() {
    this.notesservice
      .getNotes().subscribe(data => {
        this.notStartedNotes = data.filter(d => d.state === 'not-started');
        this.startedNotes = data.filter(d => d.state === 'started');
        this.completedNotes = data.filter(d => d.state === 'completed');
      }, err => console.log(err));
}
}
