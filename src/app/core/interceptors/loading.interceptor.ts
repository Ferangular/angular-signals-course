import { HttpHandlerFn, HttpInterceptorFn, HttpRequest } from "@angular/common/http";
import {inject} from "@angular/core";
import {LoadingService} from "../../libs/ui/loading/loading.service";
import {finalize} from "rxjs";
import {SkipLoading} from "../../libs/ui/loading/skip-loading.component";


export const loadingInterceptor: HttpInterceptorFn =  (req: HttpRequest<unknown>, next: HttpHandlerFn) => {
  console.log('loadingInterceptor',req.context.get(SkipLoading))
  /**
   * Ejemplo CoursesService
   * loadAllCourses()
   *    {
   *         context: new HttpContext().set(SkipLoading,true)
   *       }
   */
    if(req.context.get(SkipLoading)) {
      console.log('loadingInterceptor if()',req.context.get(SkipLoading))
     return next(req);
    }
    const loadingService = inject(LoadingService);
    loadingService.loadingOn();
    console.log('loadingInterceptor loadingService',loadingService)
    return next(req)
      .pipe(
        finalize(() => {
          loadingService.loadingOff()
        })
      )
  }
