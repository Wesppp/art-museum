import { Component, OnInit, ViewChild, ViewContainerRef } from '@angular/core';
import { RouterOutlet } from '@angular/router';

import { HeaderComponent } from '@components/header/header.component';
import { FooterComponent } from '@components/footer/footer.component';
import { ToastMessageComponent } from '@components/toast-message/toast-message.component';
import { MessageService } from '@services/message.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, HeaderComponent, FooterComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent implements OnInit {
  @ViewChild('messages', { read: ViewContainerRef })
  messagesContainer!: ViewContainerRef;

  public title: string = 'art-museum';

  constructor(private messageService: MessageService) {}

  public ngOnInit(): void {
    this.messageService.errorMessage$.subscribe((message: string) => {
      this.createComponent(message);
    });
  }

  public createComponent(message: string): void {
    const messageRef = this.messagesContainer.createComponent(
      ToastMessageComponent
    );

    messageRef.setInput('message', message);
  }
}
