import {inject, Injectable} from "@angular/core";
import {HttpClient, HttpContext} from "@angular/common/http";

import {firstValueFrom, map, Observable} from "rxjs";
import {Course} from "../models/course.model";
import {GetCoursesResponse} from "../models/get-courses.response";
import {environment} from "../../environments/environment.development";
import {SkipLoading} from "../loading/skip-loading.component";


@Injectable({
  providedIn: "root"
})
export class CoursesService {

  http = inject(HttpClient);
  env = environment;

  async loadAllCourses():Promise<Course[]> {
    const courses$ =
      this.http.get<GetCoursesResponse>(`${this.env.apiRoot}/courses`,
      //   {
      //   context: new HttpContext().set(SkipLoading,true)
      // }
      );
    const response = await firstValueFrom(courses$);
    return response.courses;
  }

  loadAllCoursesObservable(): Observable<Course[]> {
    return this.http.get<GetCoursesResponse>(`${this.env.apiRoot}/courses`)
      .pipe(map(response => response.courses));
  }

  async createCourse(course: Partial<Course>) : Promise<Course> {
    const course$ =
      this.http.post<Course>(`${this.env.apiRoot}/courses`, course)
    return firstValueFrom(course$);
  }

  createCourseObservable(course: Partial<Course>): Observable<Course> {
    return this.http.post<Course>(`${this.env.apiRoot}/courses`, course);
  }


  async saveCourse(courseId:string,
                   changes: Partial<Course>) : Promise<Course> {
    const course$ =
      this.http.put<Course>(`${this.env.apiRoot}/courses/${courseId}`,
        changes)
    return firstValueFrom(course$);
  }

  saveCourseObservable(courseId: string, changes: Partial<Course>): Observable<Course> {
    return this.http.put<Course>(`${this.env.apiRoot}/courses/${courseId}`, changes);
  }


  async deleteCourse(courseId:string) {
    const delete$ =
      this.http.delete(`${this.env.apiRoot}/courses/${courseId}`);
    return firstValueFrom(delete$);
  }

  deleteCourseObservable(courseId: string): Observable<void> {
    return this.http.delete<void>(`${this.env.apiRoot}/courses/${courseId}`);
  }

}
