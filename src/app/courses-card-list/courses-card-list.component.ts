import {Component, inject, input, output} from '@angular/core';
import {RouterLink} from "@angular/router";
import {Course} from "../models/course.model";
import {MatDialog} from "@angular/material/dialog";
import {openEditCourseDialog} from "../edit-course-dialog/edit-course-dialog.component";

@Component({
  selector: 'courses-card-list',
  standalone: true,
  imports: [
    RouterLink
  ],
  templateUrl: './courses-card-list.component.html',
  styleUrl: './courses-card-list.component.scss'
})
export class CoursesCardListComponent {
  courses = input.required<Course[]>();

  courseUpdated = output<Course>();

  courseDeleted = output<string>();

  dialog = inject(MatDialog);

  async onEditCourse(course: Course) {
    console.log(`Editing course:`, course);
    const newCourse = await openEditCourseDialog(
      this.dialog,
      {
        mode: "update",
        title: "Update Existing Course",
        course
      }
    )
    if (!newCourse) { return; }
    console.log(`Course edited:`, newCourse);
    this.courseUpdated.emit(newCourse);
  }

  onCourseDeleted(course: Course) {
    this.courseDeleted.emit(course.id);
  }

}
