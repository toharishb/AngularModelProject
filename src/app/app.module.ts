import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { Routes, RouterModule } from '@angular/router';
import { CanActivateRouteGuard } from './can-activate-route.guard';
import { LoginComponent } from './login/login.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { NoteTakerComponent } from './note-taker/note-taker.component';
import { HeaderComponent } from './header/header.component';
import { NoteViewComponent } from './note-view/note-view.component';
import { NoteComponent } from './note/note.component';
import { ListViewComponent } from './list-view/list-view.component';
import { EditNoteOpenerComponent } from './edit-note-opener/edit-note-opener.component';
import { EditNoteViewComponent } from './edit-note-view/edit-note-view.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AuthenticationService } from './services/authentication.service';
import { NotesService } from './services/notes.service';
import { RouterService } from './services/router.service';
import { AppComponent } from './app.component';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatFormFieldModule, MatDialogModule } from '@angular/material';
import { MatInputModule } from '@angular/material/input';
import { HttpClientModule } from '@angular/common/http';
import { MatCardModule } from '@angular/material/card';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatSelectModule } from '@angular/material/select';


const routes: Routes = [
  { path: 'login', component: LoginComponent },
  {
    path: 'dashboard',
    component: DashboardComponent,
    canActivate: [CanActivateRouteGuard],
    children: [
      { path: 'view/noteview', component: NoteViewComponent },
      { path: 'view/listview', component: ListViewComponent },
      {
        path: 'note/:noteid/edit', component: EditNoteOpenerComponent,
        outlet: 'noteEditOutlet'
      },

      { path: '', redirectTo: 'view/noteview', pathMatch: 'full' }
    ]
  },
  { path: '', redirectTo: 'dashboard', pathMatch: 'full' }
];


@NgModule({
  declarations: [AppComponent, DashboardComponent, EditNoteOpenerComponent,
    EditNoteViewComponent, HeaderComponent, NoteViewComponent,
    LoginComponent,
    NoteTakerComponent,
    NoteComponent, ListViewComponent
  ],
  imports: [RouterModule.forRoot(routes),
    BrowserAnimationsModule,
    FormsModule, ReactiveFormsModule,
    MatIconModule,
    MatListModule,
    BrowserAnimationsModule,
    MatButtonToggleModule,
    MatExpansionModule,
    MatFormFieldModule,
    MatInputModule,
    HttpClientModule,
    MatCardModule,
    MatToolbarModule,
    MatDialogModule,
    MatSelectModule
  ],
  providers: [CanActivateRouteGuard, AuthenticationService, RouterService, NotesService],
  bootstrap: [AppComponent],
  entryComponents: [EditNoteViewComponent]
})

export class AppModule { }
