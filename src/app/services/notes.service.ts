import { Injectable } from '@angular/core';
import { Note } from '../note';
import { Observable, BehaviorSubject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { AuthenticationService } from './authentication.service';
import { HttpHeaders } from '@angular/common/http';
import { tap } from 'rxjs/operators';


@Injectable()
export class NotesService {

  notes: Array<Note>;
  notesSubject: BehaviorSubject<Array<Note>>;
  private noteURL: string;


  constructor(private httpClient: HttpClient,
    private authService: AuthenticationService) {
    this.noteURL = 'http://localhost:3000/api/v1/notes';
    this.notes = [];
    this.notesSubject = new BehaviorSubject([]);
  }

  fetchNotesFromServer() {
    return this.httpClient.get<Note[]>(this.noteURL, {
      headers: new HttpHeaders().set('Authorization', `${this.authService.getBearerToken()}`)
    }).subscribe(notesResult => {
      this.notes = notesResult;
      this.notesSubject.next(this.notes);
    },
      err => {
        this.notesSubject.error(err);
      });
  }

  getNotes(): BehaviorSubject<Array<Note>> {
    return this.notesSubject;

  }

  addNote(note: Note): Observable<Note> {

    return this.httpClient.post<Note>(this.noteURL, note, {
      headers: new HttpHeaders().set('Authorization', `${this.authService.getBearerToken()}`)
    }).pipe(tap(addedNote => {
      this.notes.push(addedNote);
      this.notesSubject.next(this.notes);
    }));
  }

  editNote(note: Note): Observable<Note> {
    return this.httpClient.put<Note>(`http://localhost:3000/api/v1/notes/${note.id}`, note, {
      headers: new HttpHeaders().set('Authorization', `${this.authService.getBearerToken()}`)
    }).pipe(tap(editedNote => {
      const note1 = this.notes.find(data => data.id === editedNote.id);
      Object.assign(note1, editedNote);
      this.notesSubject.next(this.notes);
    }));
  }

  getNoteById(noteId): Note {
    const foundNote = this.notes.find(note => note.id === noteId);
    return foundNote;

  }
}
