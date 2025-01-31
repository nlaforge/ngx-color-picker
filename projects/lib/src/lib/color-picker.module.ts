import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TextDirective, SliderDirective } from './helpers';

import { ColorPickerService } from './color-picker.service';
import { ColorPickerComponent } from './color-picker.component';
import { ColorPickerDirective } from './color-picker.directive';

import './ng-dev-mode';
import { CursorComponent } from './cursor/cursor.component';

@NgModule({
  imports: [ CommonModule ],
  exports: [ ColorPickerDirective ],
  providers: [ ColorPickerService ],
  declarations: [ ColorPickerComponent, ColorPickerDirective, TextDirective, SliderDirective, CursorComponent ]
})
export class ColorPickerModule {}
