import { Component, Input } from '@angular/core';

@Component({
    selector: 'lib-cursor',
    templateUrl: './cursor.component.html',
    styleUrls: ['./cursor.component.css']
})
export class CursorComponent {
    @Input() radius: number = 8;
}
