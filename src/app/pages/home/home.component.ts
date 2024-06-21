import {afterNextRender, Component, computed, effect, inject, Injector, signal, viewChild} from '@angular/core';

import {Course, sortCoursesBySeqNo} from "../../core/models/course.model";
import {MatTab, MatTabGroup} from "@angular/material/tabs";
import {CoursesCardListComponent} from "../course/components/courses-card-list/courses-card-list.component";

import {CoursesServiceWithFetch} from "../../core/services/courses-fetch.service";
import {CoursesService} from "../../core/services/courses.service";
import {MessagesService} from "../../libs/ui/messages/messages.service";
import {openEditCourseDialog} from "../course/components/edit-course-dialog/edit-course-dialog.component";
import {catchError, from} from "rxjs";
import {toObservable, toSignal} from "@angular/core/rxjs-interop";
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

  coursesServiceFetch = inject(CoursesServiceWithFetch);
  coursesService = inject(CoursesService);

  dialog = inject(MatDialog);

  beginnerCourses = computed(() => {
    const courses = this.#courses();
    return courses.filter(course =>
      course.category === "BEGINNER")
  });

  advancedCourses = computed(() => {
    const courses = this.#courses();
    return courses.filter(course =>
      course.category === "ADVANCED")
  });

  messageService = inject(MessagesService);

  beginnersList = viewChild<CoursesCardListComponent>("beginnersList");

constructor() {

  effect(() => {
    console.log(`beginnersList: `, this.beginnersList())
  })

  effect(() => {
    console.log(`Beginner courses: `, this.beginnerCourses())
    console.log(`Advanced courses: `, this.advancedCourses())
  });

  this.loadCourses().then(()=> console.log('Loaded courses: ', this.#courses()));
  /** afterNextRender
   * Se va a llamar una vez al crear el componente
   * cosa que (no confundir)
   * afterRender, este se llama multiples veces
   */
  // afterNextRender(() => {
  //   this.loadCourses().then(()=> console.log('Loaded courses: ', this.courses()));
  // })
}


  async loadCourses() {
    try {
      const courses = await this.coursesService.loadAllCourses();
      this.#courses.set(courses.sort(sortCoursesBySeqNo));
      this.messageService.showMessage(
        `All courses loaded!`,
        "success"
      );
    }
    catch(err) {
      this.messageService.showMessage(
        `Error loading courses!`,
        "error"
      );
      console.error(err);
    }
  }

  onCourseUpdated(updatedCourse: Course) {
  console.log(updatedCourse)
    const courses = this.#courses();
    const newCourses = courses.map(course => (
      course.id === updatedCourse.id ? updatedCourse : course
    ));
    this.#courses.set(newCourses);
  }

  async onCourseDeleted(courseId: string) {
    try {
      await this.coursesService.deleteCourse(courseId);
      const courses = this.#courses();
      const newCourses = courses.filter(
        course => course.id !== courseId)
      this.#courses.set(newCourses);
    }
    catch (err) {
      console.error(err)
      alert(`Error deleting course.`)
    }
  }

  async onAddCourse() {
    const newCourse = await openEditCourseDialog(
      this.dialog,
      {
        mode: "create",
        title: "Create New Course"
      }
    )
    if (!newCourse) {
      return;
    }
    const newCourses = [
      ...this.#courses(),
      newCourse
    ];
    this.#courses.set(newCourses);
  }

  onToObservableExample() {
    const numbers = signal(0);
    numbers.set(1);
    numbers.set(2);
    numbers.set(3);
    const numbers$ = toObservable(numbers, {
      injector: this.injector
    });
    numbers.set(4);
    numbers$.subscribe(val => {
      console.log(`numbers$: `, val)
    })
    numbers.set(5);
  }


  injector = inject(Injector);

  onToSignalExample() {
    try {
      const courses$ = from(this.coursesService.loadAllCourses())
        .pipe(
          catchError(err => {
            console.log(`Error caught in catchError`, err)
            throw err;
          })
        );
      const courses = toSignal(courses$, {
        injector: this.injector,
        rejectErrors: true
      })
      effect(() => {
        console.log(`Courses: `, courses())
      }, {
        injector: this.injector
      })

      setInterval(() => {
        console.log(`Reading courses signal: `, courses())
      }, 1000)

    }
    catch (err) {
      console.log(`Error in catch block: `, err)
    }

  }

}


