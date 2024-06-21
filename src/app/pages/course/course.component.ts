import {Component, inject, OnInit, signal} from '@angular/core';
import {Lesson} from "../../core/models/lesson.model";
import {Course} from "../../core/models/course.model";
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'course',
  standalone: true,
  imports: [],
  templateUrl: './course.component.html',
  styleUrl: './course.component.scss'
})
export class CourseComponent implements OnInit {

  course = signal<Course | null>(null);

  lessons = signal<Lesson[]>([]);

  route = inject(ActivatedRoute);

  ngOnInit() {
    this.course.set(this.route.snapshot.data["course"]);
    this.lessons.set(this.route.snapshot.data["lessons"]);
  }

}