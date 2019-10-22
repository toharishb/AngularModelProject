import { Injectable } from '@angular/core';
import { Route, Router } from '@angular/router';

@Injectable()
export class RouterService {

  constructor(private route: Router) {
  }

  routeToDashboard() {
    this.route.navigate(['dashboard']);
  }

  routeToLogin() {
    this.route.navigate(['login']);

  }

  routeToEditNoteView(noteId) {
    this.route.navigate(['dashboard', {
      outlets: {
        noteEditOutlet: ['note', noteId, 'edit']
      }
    }]);
  }
  routeBack() {

  }

  routeToNoteView() {
    this.route.navigate(['dashboard/view/noteview']);

  }

  routeToListView() {
    this.route.navigate(['dashboard/view/listview']);

  }
}
