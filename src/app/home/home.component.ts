import {afterNextRender, Component, computed, effect, EffectRef, inject, Injector, signal} from '@angular/core';
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


  dialog = inject(MatDialog);


  counter = signal<Counter>({value: 0})
  values = signal<number[]>([0]);

  tenXCounter = computed(()=>{
    return this.counter().value * 10
  });

  hundredXCounter = computed(()=>{
    return this.tenXCounter() * 100
  });

  /**
   * Así que ahora, porque hemos pasado aquí manualmente este
   * inyector específico que está vinculado al ciclo de vida
   * de esta instancia de componente.
   * Cuando el inyector se limpie, también va a activar la limpieza de este efecto.
   */
  injector = inject(Injector);

  // Manual Effect Cleanup
  effectRef: EffectRef | null = null;

  //TODO INMUTABILIDAD - OBJECTOS
  increment() {
    this.counter.update((c) => ({...c, value: c.value + 1}));
  }

  append() {
    this.values.update(value => [...value, value[value.length - 1] + 1]);
  }

  constructor() {
    // Rara ves se usará esta construcción
    /*afterNextRender(()=>{

      effect(() => {
        console.log('counter value: ',  this.counter().value)
      },
        {
          injector: this.injector
        });
    })*/
    /** allowSignalWrites
     *  ojo!!! que podrias crear bucles infinitos
     */

  //   effect(() => {
  //     console.log('counter value: ',  this.counter().value)
  //   },
  // {allowSignalWrites: false}
  // );

    this.effectRef = effect((onCleanup) => {

      const counter = this.counter();
      const timeout = setTimeout(() => {
        console.log(`counter value: ${counter.value}` )
      },500)

      onCleanup(()=> {
        console.log('calling clean up')
        clearTimeout(timeout)
      })

    });

  }

  cleanUp() {

      this.effectRef?.destroy();

  }

}
