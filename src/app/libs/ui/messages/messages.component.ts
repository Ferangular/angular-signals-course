import {Component, inject} from "@angular/core";
import {MessagesService} from "./messages.service";
import {NgClass} from "@angular/common";

@Component({
  selector: 'messages',
  standalone: true,
  imports: [
    NgClass
  ],
  template: `
    @if(message()) {
      <div class="messages-container">
        <div class="message" [ngClass]="message()?.severity">
          {{message()?.text}}
          <img class="close" src="assets/icons/close.svg"
               (click)="onClose()">
        </div>
      </div>
    }

  `,
  styleUrls: ['./messages.component.scss'],
})
export class MessagesComponent {
  messagesService = inject(MessagesService);

  message = this.messagesService.message;

  onClose() {
    this.messagesService.clear();
  }

}
