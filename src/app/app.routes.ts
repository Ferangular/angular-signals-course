import {Routes} from '@angular/router';
import {HomeComponent} from "./pages/home/home.component";
import {LoginComponent} from "./pages/login/login.component";

import {CourseComponent} from "./pages/course/course.component";
import {LessonsComponent} from "./pages/lessons/lessons.component";

export const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
    // canActivate: [isUserAuthenticated]
  },
  {
    'path': 'courses/:courseId',
    component: CourseComponent,
    // canActivate: [isUserAuthenticated],
    // resolve: {
    //   course: courseResolver,
    //   lessons: courseLessonsResolver
    // }
  },
  {
    path: "login",
    component: LoginComponent
  },
  {
    path: "lessons",
    component: LessonsComponent
  },
  {
    path: '**',
    redirectTo: '/'
  }
];
