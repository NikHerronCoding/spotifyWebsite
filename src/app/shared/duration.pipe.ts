import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'durationPipe',
  standalone: true
})
export class DurationPipe implements PipeTransform {
  transform(milliseconds: number): string {
    const minutes = Math.floor(milliseconds / 60000);
    const seconds = Math.floor((milliseconds % 60000) / 1000);
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  }
}