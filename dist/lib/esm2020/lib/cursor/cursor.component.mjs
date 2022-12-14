import { Component, Input } from '@angular/core';
import * as i0 from "@angular/core";
export class CursorComponent {
    constructor() {
        this.radius = 8;
    }
}
CursorComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "14.2.3", ngImport: i0, type: CursorComponent, deps: [], target: i0.ɵɵFactoryTarget.Component });
CursorComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "14.2.3", type: CursorComponent, selector: "lib-cursor", inputs: { radius: "radius" }, ngImport: i0, template: "<div class=\"cursor-content\" [style.height.px]=\"radius*2\" [style.width.px]=\"radius*2\"></div>\n", styles: [".cursor-content{border:#222 solid 2px;border-radius:50%;cursor:default}\n"] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "14.2.3", ngImport: i0, type: CursorComponent, decorators: [{
            type: Component,
            args: [{ selector: 'lib-cursor', template: "<div class=\"cursor-content\" [style.height.px]=\"radius*2\" [style.width.px]=\"radius*2\"></div>\n", styles: [".cursor-content{border:#222 solid 2px;border-radius:50%;cursor:default}\n"] }]
        }], propDecorators: { radius: [{
                type: Input
            }] } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY3Vyc29yLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uL3Byb2plY3RzL2xpYi9zcmMvbGliL2N1cnNvci9jdXJzb3IuY29tcG9uZW50LnRzIiwiLi4vLi4vLi4vLi4vLi4vcHJvamVjdHMvbGliL3NyYy9saWIvY3Vyc29yL2N1cnNvci5jb21wb25lbnQuaHRtbCJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUUsU0FBUyxFQUFFLEtBQUssRUFBRSxNQUFNLGVBQWUsQ0FBQzs7QUFPakQsTUFBTSxPQUFPLGVBQWU7SUFMNUI7UUFNYSxXQUFNLEdBQVcsQ0FBQyxDQUFDO0tBQy9COzs0R0FGWSxlQUFlO2dHQUFmLGVBQWUsZ0ZDUDVCLHFHQUNBOzJGRE1hLGVBQWU7a0JBTDNCLFNBQVM7K0JBQ0ksWUFBWTs4QkFLYixNQUFNO3NCQUFkLEtBQUsiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDb21wb25lbnQsIElucHV0IH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5cbkBDb21wb25lbnQoe1xuICAgIHNlbGVjdG9yOiAnbGliLWN1cnNvcicsXG4gICAgdGVtcGxhdGVVcmw6ICcuL2N1cnNvci5jb21wb25lbnQuaHRtbCcsXG4gICAgc3R5bGVVcmxzOiBbJy4vY3Vyc29yLmNvbXBvbmVudC5jc3MnXVxufSlcbmV4cG9ydCBjbGFzcyBDdXJzb3JDb21wb25lbnQge1xuICAgIEBJbnB1dCgpIHJhZGl1czogbnVtYmVyID0gODtcbn1cbiIsIjxkaXYgY2xhc3M9XCJjdXJzb3ItY29udGVudFwiIFtzdHlsZS5oZWlnaHQucHhdPVwicmFkaXVzKjJcIiBbc3R5bGUud2lkdGgucHhdPVwicmFkaXVzKjJcIj48L2Rpdj5cbiJdfQ==