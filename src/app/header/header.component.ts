import { Component } from '@angular/core';
import { RouterService } from '../services/router.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {
  isNoteView = true;

  constructor(private routerservice: RouterService) {

  }

  toggleview(view) {
    if (view === 'list') {
      this.isNoteView = false;
      this.routerservice.routeToListView();
    } else {
      this.isNoteView = true;
      this.routerservice.routeToNoteView();
    }
  }
}
