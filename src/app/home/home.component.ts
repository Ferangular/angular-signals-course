import {Component, computed, effect, inject, Injector, signal} from '@angular/core';
import {CoursesService} from "../services/courses.service";
import {Course, sortCoursesBySeqNo} from "../models/course.model";
import {MatTab, MatTabGroup} from "@angular/material/tabs";
import {CoursesCardListComponent} from "../courses-card-list/courses-card-list.component";
import {MatDialog} from "@angular/material/dialog";
import {MessagesService} from "../messages/messages.service";
import {catchError, from, throwError} from "rxjs";
import {toObservable, toSignal, outputToObservable, outputFromObservable} from "@angular/core/rxjs-interop";

@Component({
  selector: 'home',
  standalone: true,
  imports: [
    MatTabGroup,
    MatTab,
    CoursesCardListComponent
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {

  #courses = signal<Course[]>([]);

  coursesService = inject(CoursesService);

  dialog = inject(MatDialog);



  onCourseDeleted($event: Event) {
throw new Error('Method not implemented.');
}
advancedCourses() {
throw new Error('Method not implemented.');
}
beginnerCourses() {
throw new Error('Method not implemented.');
}
onCourseUpdated($event: Event) {
throw new Error('Method not implemented.');
}
onToSignalExample() {
throw new Error('Method not implemented.');
}
onToObservableExample() {
throw new Error('Method not implemented.');
}
onAddCourse() {
throw new Error('Method not implemented.');
}


}
