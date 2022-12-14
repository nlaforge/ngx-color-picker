import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TextDirective, SliderDirective } from './helpers';
import { ColorPickerService } from './color-picker.service';
import { ColorPickerComponent } from './color-picker.component';
import { ColorPickerDirective } from './color-picker.directive';
import './ng-dev-mode';
import { CursorComponent } from './cursor/cursor.component';
import * as i0 from "@angular/core";
export class ColorPickerModule {
}
ColorPickerModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "14.2.3", ngImport: i0, type: ColorPickerModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
ColorPickerModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "14.0.0", version: "14.2.3", ngImport: i0, type: ColorPickerModule, declarations: [ColorPickerComponent, ColorPickerDirective, TextDirective, SliderDirective, CursorComponent], imports: [CommonModule], exports: [ColorPickerDirective] });
ColorPickerModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "14.2.3", ngImport: i0, type: ColorPickerModule, providers: [ColorPickerService], imports: [CommonModule] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "14.2.3", ngImport: i0, type: ColorPickerModule, decorators: [{
            type: NgModule,
            args: [{
                    imports: [CommonModule],
                    exports: [ColorPickerDirective],
                    providers: [ColorPickerService],
                    declarations: [ColorPickerComponent, ColorPickerDirective, TextDirective, SliderDirective, CursorComponent]
                }]
        }] });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29sb3ItcGlja2VyLm1vZHVsZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3Byb2plY3RzL2xpYi9zcmMvbGliL2NvbG9yLXBpY2tlci5tb2R1bGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLFFBQVEsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUN6QyxPQUFPLEVBQUUsWUFBWSxFQUFFLE1BQU0saUJBQWlCLENBQUM7QUFFL0MsT0FBTyxFQUFFLGFBQWEsRUFBRSxlQUFlLEVBQUUsTUFBTSxXQUFXLENBQUM7QUFFM0QsT0FBTyxFQUFFLGtCQUFrQixFQUFFLE1BQU0sd0JBQXdCLENBQUM7QUFDNUQsT0FBTyxFQUFFLG9CQUFvQixFQUFFLE1BQU0sMEJBQTBCLENBQUM7QUFDaEUsT0FBTyxFQUFFLG9CQUFvQixFQUFFLE1BQU0sMEJBQTBCLENBQUM7QUFFaEUsT0FBTyxlQUFlLENBQUM7QUFDdkIsT0FBTyxFQUFFLGVBQWUsRUFBRSxNQUFNLDJCQUEyQixDQUFDOztBQVE1RCxNQUFNLE9BQU8saUJBQWlCOzs4R0FBakIsaUJBQWlCOytHQUFqQixpQkFBaUIsaUJBRlosb0JBQW9CLEVBQUUsb0JBQW9CLEVBQUUsYUFBYSxFQUFFLGVBQWUsRUFBRSxlQUFlLGFBSGhHLFlBQVksYUFDWixvQkFBb0I7K0dBSXBCLGlCQUFpQixhQUhqQixDQUFFLGtCQUFrQixDQUFFLFlBRnRCLFlBQVk7MkZBS1osaUJBQWlCO2tCQU43QixRQUFRO21CQUFDO29CQUNSLE9BQU8sRUFBRSxDQUFFLFlBQVksQ0FBRTtvQkFDekIsT0FBTyxFQUFFLENBQUUsb0JBQW9CLENBQUU7b0JBQ2pDLFNBQVMsRUFBRSxDQUFFLGtCQUFrQixDQUFFO29CQUNqQyxZQUFZLEVBQUUsQ0FBRSxvQkFBb0IsRUFBRSxvQkFBb0IsRUFBRSxhQUFhLEVBQUUsZUFBZSxFQUFFLGVBQWUsQ0FBRTtpQkFDOUciLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBOZ01vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgQ29tbW9uTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uJztcblxuaW1wb3J0IHsgVGV4dERpcmVjdGl2ZSwgU2xpZGVyRGlyZWN0aXZlIH0gZnJvbSAnLi9oZWxwZXJzJztcblxuaW1wb3J0IHsgQ29sb3JQaWNrZXJTZXJ2aWNlIH0gZnJvbSAnLi9jb2xvci1waWNrZXIuc2VydmljZSc7XG5pbXBvcnQgeyBDb2xvclBpY2tlckNvbXBvbmVudCB9IGZyb20gJy4vY29sb3ItcGlja2VyLmNvbXBvbmVudCc7XG5pbXBvcnQgeyBDb2xvclBpY2tlckRpcmVjdGl2ZSB9IGZyb20gJy4vY29sb3ItcGlja2VyLmRpcmVjdGl2ZSc7XG5cbmltcG9ydCAnLi9uZy1kZXYtbW9kZSc7XG5pbXBvcnQgeyBDdXJzb3JDb21wb25lbnQgfSBmcm9tICcuL2N1cnNvci9jdXJzb3IuY29tcG9uZW50JztcblxuQE5nTW9kdWxlKHtcbiAgaW1wb3J0czogWyBDb21tb25Nb2R1bGUgXSxcbiAgZXhwb3J0czogWyBDb2xvclBpY2tlckRpcmVjdGl2ZSBdLFxuICBwcm92aWRlcnM6IFsgQ29sb3JQaWNrZXJTZXJ2aWNlIF0sXG4gIGRlY2xhcmF0aW9uczogWyBDb2xvclBpY2tlckNvbXBvbmVudCwgQ29sb3JQaWNrZXJEaXJlY3RpdmUsIFRleHREaXJlY3RpdmUsIFNsaWRlckRpcmVjdGl2ZSwgQ3Vyc29yQ29tcG9uZW50IF1cbn0pXG5leHBvcnQgY2xhc3MgQ29sb3JQaWNrZXJNb2R1bGUge31cbiJdfQ==