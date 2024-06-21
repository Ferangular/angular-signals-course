import {Component, inject} from "@angular/core";
import {MatProgressSpinner} from "@angular/material/progress-spinner";
import {LoadingService} from "./loading.service";

@Component({
  selector: "loading",
  imports: [MatProgressSpinner],
  standalone: true,
  template: `
    @if (loading()) {
      <div class="spinner-container">
        <mat-spinner />
      </div>
    }
  `,
  styleUrls: ["./loading.component.scss"],

})
export class LoadingIndicatorComponent {
  loadingService = inject(LoadingService);
  loading = this.loadingService.loading;
}
