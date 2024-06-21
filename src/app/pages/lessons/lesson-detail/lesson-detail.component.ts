import {Component, inject, input, output} from '@angular/core';

import {ReactiveFormsModule} from "@angular/forms";


@Component({
  selector: 'lesson-detail',
  standalone: true,
  imports: [
    ReactiveFormsModule
  ],
  templateUrl: './lesson-detail.component.html',
  styleUrl: './lesson-detail.component.scss'
})
export class LessonDetailComponent {



}
