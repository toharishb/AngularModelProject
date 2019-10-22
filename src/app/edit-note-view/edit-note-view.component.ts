import { Component, Inject } from '@angular/core';
import { Note } from '../note';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { NotesService } from '../services/notes.service';
import { RouterService } from '../services/router.service';
import { OnInit } from '@angular/core/src/metadata/lifecycle_hooks';

@Component({
  selector: 'app-edit-note-view',
  templateUrl: './edit-note-view.component.html',
  styleUrls: ['./edit-note-view.component.css']
})
export class EditNoteViewComponent implements OnInit {
  note: Note;
  states: Array<string> = ['not-started', 'started', 'completed'];
  errMessage: string;
  noteForm: FormGroup;

  constructor(private dialogRef: MatDialogRef<EditNoteViewComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private noteservice: NotesService,
    private routerservice: RouterService) {
  }

  ngOnInit() {
    this.note = this.noteservice.getNoteById(this.data.noteId);
  }

  onSave() {
    const note: Note = new Note();

    note.id = this.note.id;
    note.title = this.note.title;
    note.text = this.note.text;
    note.state = this.note.state;

    this.noteservice.editNote(note).subscribe(
      editNote => {
        this.dialogRef.close();
      },
      err => {
        if (err.status === 404) {
          this.errMessage = err.message;
        } else {
          this.errMessage = err.error.message;
        }
      });
  }
}
