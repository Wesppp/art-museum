import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

@Component({
  selector: 'app-toast-message',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './toast-message.component.html',
  styleUrl: './toast-message.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ToastMessageComponent {
  @Input() public message: string = 'Something went wrong...';
}
