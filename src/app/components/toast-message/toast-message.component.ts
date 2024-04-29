import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, input } from '@angular/core';

@Component({
  selector: 'app-toast-message',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './toast-message.component.html',
  styleUrl: './toast-message.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ToastMessageComponent {
  message = input<string>('Something went wrong...');
}
