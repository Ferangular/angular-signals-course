import {Component, computed, effect, inject, Injector, signal} from '@angular/core';
import {CoursesService} from "../services/courses.service";
import {Course} from "../models/course.model";
import {MatTab, MatTabGroup} from "@angular/material/tabs";
import {CoursesCardListComponent} from "../courses-card-list/courses-card-list.component";
import {MatDialog} from "@angular/material/dialog";


type Counter = {
  value: number;
}
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


counter = signal<Counter>({
  value: 0
})

increment(){
this.counter.update(c => ({...c, value: c.value + 1}));
}



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
