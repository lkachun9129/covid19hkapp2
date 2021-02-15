import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'counter' })
export class CounterPipe implements PipeTransform {
    transform(value: number): string {
        let minutes = Math.floor(value / 60);
        let seconds = value - minutes * 60;
        
        let hours = Math.floor(minutes / 60);
        minutes = minutes - hours * 60;
        if (hours > 0) {
            return `${hours}:${this.padZero(minutes)}:${this.padZero(seconds)}`;
        } else {
            return `${this.padZero(minutes)}:${this.padZero(seconds)}`;
        }
    }

    private padZero(value: number) {
        return value >= 10? `${value}` : `0${value}`;
    }
}