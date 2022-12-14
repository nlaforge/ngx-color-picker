import { Directive, Input, Output, EventEmitter, HostListener, Injector } from '@angular/core';
import { ColorPickerComponent } from './color-picker.component';
import * as i0 from "@angular/core";
import * as i1 from "./color-picker.service";
// Caretaker note: we have still left the `typeof` condition in order to avoid
// creating a breaking change for projects that still use the View Engine.
// The `ngDevMode` is always available when Ivy is enabled.
// This will be evaluated during compilation into `const NG_DEV_MODE = false`,
// thus Terser will be able to tree-shake `console.warn` calls.
const NG_DEV_MODE = typeof ngDevMode === 'undefined' || !!ngDevMode;
export class ColorPickerDirective {
    constructor(injector, cfr, appRef, vcRef, elRef, _service) {
        this.injector = injector;
        this.cfr = cfr;
        this.appRef = appRef;
        this.vcRef = vcRef;
        this.elRef = elRef;
        this._service = _service;
        this.dialogCreated = false;
        this.ignoreChanges = false;
        this.viewAttachedToAppRef = false;
        this.cpWidth = '230px';
        this.cpHeight = 'auto';
        this.cpSliderSLHeight = '130';
        this.cpCursorRadius = '8';
        this.cpToggle = false;
        this.cpDisabled = false;
        this.cpIgnoredElements = [];
        this.cpFallbackColor = '';
        this.cpColorMode = 'color';
        this.cpCmykEnabled = false;
        this.cpOutputFormat = 'auto';
        this.cpAlphaChannel = 'enabled';
        this.cpDisableInput = false;
        this.cpDialogDisplay = 'popup';
        this.cpSaveClickOutside = true;
        this.cpCloseClickOutside = true;
        this.cpUseRootViewContainer = false;
        this.cpPosition = 'auto';
        this.cpPositionOffset = '0%';
        this.cpPositionRelativeToArrow = false;
        this.cpOKButton = false;
        this.cpOKButtonText = 'OK';
        this.cpOKButtonClass = 'cp-ok-button-class';
        this.cpCancelButton = false;
        this.cpCancelButtonText = 'Cancel';
        this.cpCancelButtonClass = 'cp-cancel-button-class';
        this.cpEyeDropper = false;
        this.cpPresetLabel = 'Preset colors';
        this.cpPresetColorsClass = 'cp-preset-colors-class';
        this.cpMaxPresetColorsLength = 6;
        this.cpPresetEmptyMessage = 'No colors added';
        this.cpPresetEmptyMessageClass = 'preset-empty-message';
        this.cpAddColorButton = false;
        this.cpAddColorButtonText = 'Add color';
        this.cpAddColorButtonClass = 'cp-add-color-button-class';
        this.cpRemoveColorButtonClass = 'cp-remove-color-button-class';
        this.cpInputChange = new EventEmitter(true);
        this.cpToggleChange = new EventEmitter(true);
        this.cpSliderChange = new EventEmitter(true);
        this.cpSliderDragEnd = new EventEmitter(true);
        this.cpSliderDragStart = new EventEmitter(true);
        this.colorPickerOpen = new EventEmitter(true);
        this.colorPickerClose = new EventEmitter(true);
        this.colorPickerCancel = new EventEmitter(true);
        this.colorPickerSelect = new EventEmitter(true);
        this.colorPickerChange = new EventEmitter(false);
        this.cpCmykColorChange = new EventEmitter(true);
        this.cpPresetColorsChange = new EventEmitter(true);
    }
    handleClick() {
        this.inputFocus();
    }
    handleFocus() {
        this.inputFocus();
    }
    handleInput(event) {
        this.inputChange(event);
    }
    ngOnDestroy() {
        if (this.cmpRef != null) {
            if (this.viewAttachedToAppRef) {
                this.appRef.detachView(this.cmpRef.hostView);
            }
            this.cmpRef.destroy();
            this.cmpRef = null;
            this.dialog = null;
        }
    }
    ngOnChanges(changes) {
        if (changes.cpToggle && !this.cpDisabled) {
            if (changes.cpToggle.currentValue) {
                this.openDialog();
            }
            else if (!changes.cpToggle.currentValue) {
                this.closeDialog();
            }
        }
        if (changes.colorPicker) {
            if (this.dialog && !this.ignoreChanges) {
                if (this.cpDialogDisplay === 'inline') {
                    this.dialog.setInitialColor(changes.colorPicker.currentValue);
                }
                this.dialog.setColorFromString(changes.colorPicker.currentValue, false);
                if (this.cpUseRootViewContainer && this.cpDialogDisplay !== 'inline') {
                    this.cmpRef.changeDetectorRef.detectChanges();
                }
            }
            this.ignoreChanges = false;
        }
        if (changes.cpPresetLabel || changes.cpPresetColors) {
            if (this.dialog) {
                this.dialog.setPresetConfig(this.cpPresetLabel, this.cpPresetColors);
            }
        }
    }
    openDialog() {
        if (!this.dialogCreated) {
            let vcRef = this.vcRef;
            this.dialogCreated = true;
            this.viewAttachedToAppRef = false;
            if (this.cpUseRootViewContainer && this.cpDialogDisplay !== 'inline') {
                const classOfRootComponent = this.appRef.componentTypes[0];
                const appInstance = this.injector.get(classOfRootComponent, Injector.NULL);
                if (appInstance !== Injector.NULL) {
                    vcRef = appInstance.vcRef || appInstance.viewContainerRef || this.vcRef;
                    if (NG_DEV_MODE && vcRef === this.vcRef) {
                        console.warn('You are using cpUseRootViewContainer, ' +
                            'but the root component is not exposing viewContainerRef!' +
                            'Please expose it by adding \'public vcRef: ViewContainerRef\' to the constructor.');
                    }
                }
                else {
                    this.viewAttachedToAppRef = true;
                }
            }
            const compFactory = this.cfr.resolveComponentFactory(ColorPickerComponent);
            if (this.viewAttachedToAppRef) {
                this.cmpRef = compFactory.create(this.injector);
                this.appRef.attachView(this.cmpRef.hostView);
                document.body.appendChild(this.cmpRef.hostView.rootNodes[0]);
            }
            else {
                const injector = Injector.create({
                    providers: [],
                    // We shouldn't use `vcRef.parentInjector` since it's been deprecated long time ago and might be removed
                    // in newer Angular versions: https://github.com/angular/angular/pull/25174.
                    parent: vcRef.injector,
                });
                this.cmpRef = vcRef.createComponent(compFactory, 0, injector, []);
            }
            const cpSliderWidth = this.cpSliderSLWidth ?? this.cpWidth;
            this.cmpRef.instance.setupDialog(this, this.elRef, this.colorPicker, this.cpWidth, this.cpHeight, this.cpSliderSLHeight, cpSliderWidth, this.cpCursorRadius, this.cpDialogDisplay, this.cpFallbackColor, this.cpColorMode, this.cpCmykEnabled, this.cpAlphaChannel, this.cpOutputFormat, this.cpDisableInput, this.cpIgnoredElements, this.cpSaveClickOutside, this.cpCloseClickOutside, this.cpUseRootViewContainer, this.cpPosition, this.cpPositionOffset, this.cpPositionRelativeToArrow, this.cpPresetLabel, this.cpPresetColors, this.cpPresetColorsClass, this.cpMaxPresetColorsLength, this.cpPresetEmptyMessage, this.cpPresetEmptyMessageClass, this.cpOKButton, this.cpOKButtonClass, this.cpOKButtonText, this.cpCancelButton, this.cpCancelButtonClass, this.cpCancelButtonText, this.cpAddColorButton, this.cpAddColorButtonClass, this.cpAddColorButtonText, this.cpRemoveColorButtonClass, this.cpEyeDropper, this.elRef, this.cpExtraTemplate);
            this.dialog = this.cmpRef.instance;
            if (this.vcRef !== vcRef) {
                this.cmpRef.changeDetectorRef.detectChanges();
            }
        }
        else if (this.dialog) {
            this.dialog.openDialog(this.colorPicker);
        }
    }
    closeDialog() {
        if (this.dialog && this.cpDialogDisplay === 'popup') {
            this.dialog.closeDialog();
        }
    }
    cmykChanged(value) {
        this.cpCmykColorChange.emit(value);
    }
    stateChanged(state) {
        this.cpToggleChange.emit(state);
        if (state) {
            this.colorPickerOpen.emit(this.colorPicker);
        }
        else {
            this.colorPickerClose.emit(this.colorPicker);
        }
    }
    colorChanged(value, ignore = true) {
        this.ignoreChanges = ignore;
        this.colorPickerChange.emit(value);
    }
    colorSelected(value) {
        this.colorPickerSelect.emit(value);
    }
    colorCanceled() {
        this.colorPickerCancel.emit();
    }
    inputFocus() {
        const element = this.elRef.nativeElement;
        const ignored = this.cpIgnoredElements.filter((item) => item === element);
        if (!this.cpDisabled && !ignored.length) {
            if (typeof document !== 'undefined' && element === document.activeElement) {
                this.openDialog();
            }
            else if (!this.dialog || !this.dialog.show) {
                this.openDialog();
            }
            else {
                this.closeDialog();
            }
        }
    }
    inputChange(event) {
        if (this.dialog) {
            this.dialog.setColorFromString(event.target.value, true);
        }
        else {
            this.colorPicker = event.target.value;
            this.colorPickerChange.emit(this.colorPicker);
        }
    }
    inputChanged(event) {
        this.cpInputChange.emit(event);
    }
    sliderChanged(event) {
        this.cpSliderChange.emit(event);
    }
    sliderDragEnd(event) {
        this.cpSliderDragEnd.emit(event);
    }
    sliderDragStart(event) {
        this.cpSliderDragStart.emit(event);
    }
    presetColorsChanged(value) {
        this.cpPresetColorsChange.emit(value);
    }
}
ColorPickerDirective.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "14.2.3", ngImport: i0, type: ColorPickerDirective, deps: [{ token: i0.Injector }, { token: i0.ComponentFactoryResolver }, { token: i0.ApplicationRef }, { token: i0.ViewContainerRef }, { token: i0.ElementRef }, { token: i1.ColorPickerService }], target: i0.ɵɵFactoryTarget.Directive });
ColorPickerDirective.ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "14.0.0", version: "14.2.3", type: ColorPickerDirective, selector: "[colorPicker]", inputs: { colorPicker: "colorPicker", cpWidth: "cpWidth", cpHeight: "cpHeight", cpSliderSLHeight: "cpSliderSLHeight", cpSliderSLWidth: "cpSliderSLWidth", cpCursorRadius: "cpCursorRadius", cpToggle: "cpToggle", cpDisabled: "cpDisabled", cpIgnoredElements: "cpIgnoredElements", cpFallbackColor: "cpFallbackColor", cpColorMode: "cpColorMode", cpCmykEnabled: "cpCmykEnabled", cpOutputFormat: "cpOutputFormat", cpAlphaChannel: "cpAlphaChannel", cpDisableInput: "cpDisableInput", cpDialogDisplay: "cpDialogDisplay", cpSaveClickOutside: "cpSaveClickOutside", cpCloseClickOutside: "cpCloseClickOutside", cpUseRootViewContainer: "cpUseRootViewContainer", cpPosition: "cpPosition", cpPositionOffset: "cpPositionOffset", cpPositionRelativeToArrow: "cpPositionRelativeToArrow", cpOKButton: "cpOKButton", cpOKButtonText: "cpOKButtonText", cpOKButtonClass: "cpOKButtonClass", cpCancelButton: "cpCancelButton", cpCancelButtonText: "cpCancelButtonText", cpCancelButtonClass: "cpCancelButtonClass", cpEyeDropper: "cpEyeDropper", cpPresetLabel: "cpPresetLabel", cpPresetColors: "cpPresetColors", cpPresetColorsClass: "cpPresetColorsClass", cpMaxPresetColorsLength: "cpMaxPresetColorsLength", cpPresetEmptyMessage: "cpPresetEmptyMessage", cpPresetEmptyMessageClass: "cpPresetEmptyMessageClass", cpAddColorButton: "cpAddColorButton", cpAddColorButtonText: "cpAddColorButtonText", cpAddColorButtonClass: "cpAddColorButtonClass", cpRemoveColorButtonClass: "cpRemoveColorButtonClass", cpExtraTemplate: "cpExtraTemplate" }, outputs: { cpInputChange: "cpInputChange", cpToggleChange: "cpToggleChange", cpSliderChange: "cpSliderChange", cpSliderDragEnd: "cpSliderDragEnd", cpSliderDragStart: "cpSliderDragStart", colorPickerOpen: "colorPickerOpen", colorPickerClose: "colorPickerClose", colorPickerCancel: "colorPickerCancel", colorPickerSelect: "colorPickerSelect", colorPickerChange: "colorPickerChange", cpCmykColorChange: "cpCmykColorChange", cpPresetColorsChange: "cpPresetColorsChange" }, host: { listeners: { "click": "handleClick()", "focus": "handleFocus()", "input": "handleInput($event)" } }, exportAs: ["ngxColorPicker"], usesOnChanges: true, ngImport: i0 });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "14.2.3", ngImport: i0, type: ColorPickerDirective, decorators: [{
            type: Directive,
            args: [{
                    selector: '[colorPicker]',
                    exportAs: 'ngxColorPicker'
                }]
        }], ctorParameters: function () { return [{ type: i0.Injector }, { type: i0.ComponentFactoryResolver }, { type: i0.ApplicationRef }, { type: i0.ViewContainerRef }, { type: i0.ElementRef }, { type: i1.ColorPickerService }]; }, propDecorators: { colorPicker: [{
                type: Input
            }], cpWidth: [{
                type: Input
            }], cpHeight: [{
                type: Input
            }], cpSliderSLHeight: [{
                type: Input
            }], cpSliderSLWidth: [{
                type: Input
            }], cpCursorRadius: [{
                type: Input
            }], cpToggle: [{
                type: Input
            }], cpDisabled: [{
                type: Input
            }], cpIgnoredElements: [{
                type: Input
            }], cpFallbackColor: [{
                type: Input
            }], cpColorMode: [{
                type: Input
            }], cpCmykEnabled: [{
                type: Input
            }], cpOutputFormat: [{
                type: Input
            }], cpAlphaChannel: [{
                type: Input
            }], cpDisableInput: [{
                type: Input
            }], cpDialogDisplay: [{
                type: Input
            }], cpSaveClickOutside: [{
                type: Input
            }], cpCloseClickOutside: [{
                type: Input
            }], cpUseRootViewContainer: [{
                type: Input
            }], cpPosition: [{
                type: Input
            }], cpPositionOffset: [{
                type: Input
            }], cpPositionRelativeToArrow: [{
                type: Input
            }], cpOKButton: [{
                type: Input
            }], cpOKButtonText: [{
                type: Input
            }], cpOKButtonClass: [{
                type: Input
            }], cpCancelButton: [{
                type: Input
            }], cpCancelButtonText: [{
                type: Input
            }], cpCancelButtonClass: [{
                type: Input
            }], cpEyeDropper: [{
                type: Input
            }], cpPresetLabel: [{
                type: Input
            }], cpPresetColors: [{
                type: Input
            }], cpPresetColorsClass: [{
                type: Input
            }], cpMaxPresetColorsLength: [{
                type: Input
            }], cpPresetEmptyMessage: [{
                type: Input
            }], cpPresetEmptyMessageClass: [{
                type: Input
            }], cpAddColorButton: [{
                type: Input
            }], cpAddColorButtonText: [{
                type: Input
            }], cpAddColorButtonClass: [{
                type: Input
            }], cpRemoveColorButtonClass: [{
                type: Input
            }], cpExtraTemplate: [{
                type: Input
            }], cpInputChange: [{
                type: Output
            }], cpToggleChange: [{
                type: Output
            }], cpSliderChange: [{
                type: Output
            }], cpSliderDragEnd: [{
                type: Output
            }], cpSliderDragStart: [{
                type: Output
            }], colorPickerOpen: [{
                type: Output
            }], colorPickerClose: [{
                type: Output
            }], colorPickerCancel: [{
                type: Output
            }], colorPickerSelect: [{
                type: Output
            }], colorPickerChange: [{
                type: Output
            }], cpCmykColorChange: [{
                type: Output
            }], cpPresetColorsChange: [{
                type: Output
            }], handleClick: [{
                type: HostListener,
                args: ['click']
            }], handleFocus: [{
                type: HostListener,
                args: ['focus']
            }], handleInput: [{
                type: HostListener,
                args: ['input', ['$event']]
            }] } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29sb3ItcGlja2VyLmRpcmVjdGl2ZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3Byb2plY3RzL2xpYi9zcmMvbGliL2NvbG9yLXBpY2tlci5kaXJlY3RpdmUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLFNBQVMsRUFBd0IsS0FBSyxFQUFFLE1BQU0sRUFBRSxZQUFZLEVBQ25FLFlBQVksRUFDWixRQUFRLEVBQTBELE1BQU0sZUFBZSxDQUFDO0FBRzFGLE9BQU8sRUFBRSxvQkFBb0IsRUFBRSxNQUFNLDBCQUEwQixDQUFDOzs7QUFJaEUsOEVBQThFO0FBQzlFLDBFQUEwRTtBQUMxRSwyREFBMkQ7QUFDM0QsOEVBQThFO0FBQzlFLCtEQUErRDtBQUMvRCxNQUFNLFdBQVcsR0FBRyxPQUFPLFNBQVMsS0FBSyxXQUFXLElBQUksQ0FBQyxDQUFDLFNBQVMsQ0FBQztBQU1wRSxNQUFNLE9BQU8sb0JBQW9CO0lBc0cvQixZQUFvQixRQUFrQixFQUFVLEdBQTZCLEVBQ3pELE1BQXNCLEVBQVUsS0FBdUIsRUFBVSxLQUFpQixFQUNsRixRQUE0QjtRQUY1QixhQUFRLEdBQVIsUUFBUSxDQUFVO1FBQVUsUUFBRyxHQUFILEdBQUcsQ0FBMEI7UUFDekQsV0FBTSxHQUFOLE1BQU0sQ0FBZ0I7UUFBVSxVQUFLLEdBQUwsS0FBSyxDQUFrQjtRQUFVLFVBQUssR0FBTCxLQUFLLENBQVk7UUFDbEYsYUFBUSxHQUFSLFFBQVEsQ0FBb0I7UUFyR3hDLGtCQUFhLEdBQVksS0FBSyxDQUFDO1FBQy9CLGtCQUFhLEdBQVksS0FBSyxDQUFDO1FBRy9CLHlCQUFvQixHQUFZLEtBQUssQ0FBQztRQUlyQyxZQUFPLEdBQVcsT0FBTyxDQUFDO1FBQzFCLGFBQVEsR0FBVyxNQUFNLENBQUM7UUFDMUIscUJBQWdCLEdBQVcsS0FBSyxDQUFDO1FBR2pDLG1CQUFjLEdBQVcsR0FBRyxDQUFDO1FBRTdCLGFBQVEsR0FBWSxLQUFLLENB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LG1CQUFtQjtzQkFBM0IsS0FBSztnQkFDRyx1QkFBdUI7c0JBQS9CLEtBQUs7Z0JBRUcsb0JBQW9CO3NCQUE1QixLQUFLO2dCQUNHLHlCQUF5QjtzQkFBakMsS0FBSztnQkFFRyxnQkFBZ0I7c0JBQXhCLEtBQUs7Z0JBQ0csb0JBQW9CO3NCQUE1QixLQUFLO2dCQUNHLHFCQUFxQjtzQkFBN0IsS0FBSztnQkFFRyx3QkFBd0I7c0JBQWhDLEtBQUs7Z0JBRUcsZUFBZTtzQkFBdkIsS0FBSztnQkFFSSxhQUFhO3NCQUF0QixNQUFNO2dCQUVHLGNBQWM7c0JBQXZCLE1BQU07Z0JBRUcsY0FBYztzQkFBdkIsTUFBTTtnQkFDRyxlQUFlO3NCQUF4QixNQUFNO2dCQUNHLGlCQUFpQjtzQkFBMUIsTUFBTTtnQkFFRyxlQUFlO3NCQUF4QixNQUFNO2dCQUNHLGdCQUFnQjtzQkFBekIsTUFBTTtnQkFFRyxpQkFBaUI7c0JBQTFCLE1BQU07Z0JBQ0csaUJBQWlCO3NCQUExQixNQUFNO2dCQUNHLGlCQUFpQjtzQkFBMUIsTUFBTTtnQkFFRyxpQkFBaUI7c0JBQTFCLE1BQU07Z0JBRUcsb0JBQW9CO3NCQUE3QixNQUFNO2dCQUVnQixXQUFXO3NCQUFqQyxZQUFZO3VCQUFDLE9BQU87Z0JBSUUsV0FBVztzQkFBakMsWUFBWTt1QkFBQyxPQUFPO2dCQUljLFdBQVc7c0JBQTdDLFlBQVk7dUJBQUMsT0FBTyxFQUFFLENBQUMsUUFBUSxDQUFDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgRGlyZWN0aXZlLCBPbkNoYW5nZXMsIE9uRGVzdHJveSwgSW5wdXQsIE91dHB1dCwgRXZlbnRFbWl0dGVyLFxuICBIb3N0TGlzdGVuZXIsIEFwcGxpY2F0aW9uUmVmLCBDb21wb25lbnRSZWYsIEVsZW1lbnRSZWYsIFZpZXdDb250YWluZXJSZWYsXG4gIEluamVjdG9yLCBDb21wb25lbnRGYWN0b3J5UmVzb2x2ZXIsIEVtYmVkZGVkVmlld1JlZiwgVGVtcGxhdGVSZWYgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcblxuaW1wb3J0IHsgQ29sb3JQaWNrZXJTZXJ2aWNlIH0gZnJvbSAnLi9jb2xvci1waWNrZXIuc2VydmljZSc7XG5pbXBvcnQgeyBDb2xvclBpY2tlckNvbXBvbmVudCB9IGZyb20gJy4vY29sb3ItcGlja2VyLmNvbXBvbmVudCc7XG5cbmltcG9ydCB7IEFscGhhQ2hhbm5lbCwgQ29sb3JNb2RlLCBPdXRwdXRGb3JtYXQgfSBmcm9tICcuL2hlbHBlcnMnO1xuXG4vLyBDYXJldGFrZXIgbm90ZTogd2UgaGF2ZSBzdGlsbCBsZWZ0IHRoZSBgdHlwZW9mYCBjb25kaXRpb24gaW4gb3JkZXIgdG8gYXZvaWRcbi8vIGNyZWF0aW5nIGEgYnJlYWtpbmcgY2hhbmdlIGZvciBwcm9qZWN0cyB0aGF0IHN0aWxsIHVzZSB0aGUgVmlldyBFbmdpbmUuXG4vLyBUaGUgYG5nRGV2TW9kZWAgaXMgYWx3YXlzIGF2YWlsYWJsZSB3aGVuIEl2eSBpcyBlbmFibGVkLlxuLy8gVGhpcyB3aWxsIGJlIGV2YWx1YXRlZCBkdXJpbmcgY29tcGlsYXRpb24gaW50byBgY29uc3QgTkdfREVWX01PREUgPSBmYWxzZWAsXG4vLyB0aHVzIFRlcnNlciB3aWxsIGJlIGFibGUgdG8gdHJlZS1zaGFrZSBgY29uc29sZS53YXJuYCBjYWxscy5cbmNvbnN0IE5HX0RFVl9NT0RFID0gdHlwZW9mIG5nRGV2TW9kZSA9PT0gJ3VuZGVmaW5lZCcgfHwgISFuZ0Rldk1vZGU7XG5cbkBEaXJlY3RpdmUoe1xuICBzZWxlY3RvcjogJ1tjb2xvclBpY2tlcl0nLFxuICBleHBvcnRBczogJ25neENvbG9yUGlja2VyJ1xufSlcbmV4cG9ydCBjbGFzcyBDb2xvclBpY2tlckRpcmVjdGl2ZSBpbXBsZW1lbnRzIE9uQ2hhbmdlcywgT25EZXN0cm95IHtcbiAgcHJpdmF0ZSBkaWFsb2c6IGFueTtcblxuICBwcml2YXRlIGRpYWxvZ0NyZWF0ZWQ6IGJvb2xlYW4gPSBmYWxzZTtcbiAgcHJpdmF0ZSBpZ25vcmVDaGFuZ2VzOiBib29sZWFuID0gZmFsc2U7XG5cbiAgcHJpdmF0ZSBjbXBSZWY6IENvbXBvbmVudFJlZjxDb2xvclBpY2tlckNvbXBvbmVudD47XG4gIHByaXZhdGUgdmlld0F0dGFjaGVkVG9BcHBSZWY6IGJvb2xlYW4gPSBmYWxzZTtcblxuICBASW5wdXQoKSBjb2xvclBpY2tlcjogc3RyaW5nO1xuXG4gIEBJbnB1dCgpIGNwV2lkdGg6IHN0cmluZyA9ICcyMzBweCc7XG4gIEBJbnB1dCgpIGNwSGVpZ2h0OiBzdHJpbmcgPSAnYXV0byc7XG4gIEBJbnB1dCgpIGNwU2xpZGVyU0xIZWlnaHQ6IHN0cmluZyA9ICcxMzAnO1xuICBASW5wdXQoKSBjcFNsaWRlclNMV2lkdGg6IHN0cmluZztcblxuICBASW5wdXQoKSBjcEN1cnNvclJhZGl1czogc3RyaW5nID0gJzgnO1xuXG4gIEBJbnB1dCgpIGNwVG9nZ2xlOiBib29sZWFuID0gZmFsc2U7XG4gIEBJbnB1dCgpIGNwRGlzYWJsZWQ6IGJvb2xlYW4gPSBmYWxzZTtcblxuICBASW5wdXQoKSBjcElnbm9yZWRFbGVtZW50czogYW55ID0gW107XG5cbiAgQElucHV0KCkgY3BGYWxsYmFja0NvbG9yOiBzdHJpbmcgPSAnJztcblxuICBASW5wdXQoKSBjcENvbG9yTW9kZTogQ29sb3JNb2RlID0gJ2NvbG9yJztcblxuICBASW5wdXQoKSBjcENteWtFbmFibGVkOiBib29sZWFuID0gZmFsc2U7XG5cbiAgQElucHV0KCkgY3BPdXRwdXRGb3JtYXQ6IE91dHB1dEZvcm1hdCA9ICdhdXRvJztcbiAgQElucHV0KCkgY3BBbHBoYUNoYW5uZWw6IEFscGhhQ2hhbm5lbCA9ICdlbmFibGVkJztcblxuICBASW5wdXQoKSBjcERpc2FibGVJbnB1dDogYm9vbGVhbiA9IGZhbHNlO1xuXG4gIEBJbnB1dCgpIGNwRGlhbG9nRGlzcGxheTogc3RyaW5nID0gJ3BvcHVwJztcblxuICBASW5wdXQoKSBjcFNhdmVDbGlja091dHNpZGU6IGJvb2xlYW4gPSB0cnVlO1xuICBASW5wdXQoKSBjcENsb3NlQ2xpY2tPdXRzaWRlOiBib29sZWFuID0gdHJ1ZTtcblxuICBASW5wdXQoKSBjcFVzZVJvb3RWaWV3Q29udGFpbmVyOiBib29sZWFuID0gZmFsc2U7XG5cbiAgQElucHV0KCkgY3BQb3NpdGlvbjogc3RyaW5nID0gJ2F1dG8nO1xuICBASW5wdXQoKSBjcFBvc2l0aW9uT2Zmc2V0OiBzdHJpbmcgPSAnMCUnO1xuICBASW5wdXQoKSBjcFBvc2l0aW9uUmVsYXRpdmVUb0Fycm93OiBib29sZWFuID0gZmFsc2U7XG5cbiAgQElucHV0KCkgY3BPS0J1dHRvbjogYm9vbGVhbiA9IGZhbHNlO1xuICBASW5wdXQoKSBjcE9LQnV0dG9uVGV4dDogc3RyaW5nID0gJ09LJztcbiAgQElucHV0KCkgY3BPS0J1dHRvbkNsYXNzOiBzdHJpbmcgPSAnY3Atb2stYnV0dG9uLWNsYXNzJztcblxuICBASW5wdXQoKSBjcENhbmNlbEJ1dHRvbjogYm9vbGVhbiA9IGZhbHNlO1xuICBASW5wdXQoKSBjcENhbmNlbEJ1dHRvblRleHQ6IHN0cmluZyA9ICdDYW5jZWwnO1xuICBASW5wdXQoKSBjcENhbmNlbEJ1dHRvbkNsYXNzOiBzdHJpbmcgPSAnY3AtY2FuY2VsLWJ1dHRvbi1jbGFzcyc7XG5cbiAgQElucHV0KCkgY3BFeWVEcm9wcGVyOiBib29sZWFuID0gZmFsc2U7XG5cbiAgQElucHV0KCkgY3BQcmVzZXRMYWJlbDogc3RyaW5nID0gJ1ByZXNldCBjb2xvcnMnO1xuICBASW5wdXQoKSBjcFByZXNldENvbG9yczogc3RyaW5nW107XG4gIEBJbnB1dCgpIGNwUHJlc2V0Q29sb3JzQ2xhc3M6IHN0cmluZyA9ICdjcC1wcmVzZXQtY29sb3JzLWNsYXNzJztcbiAgQElucHV0KCkgY3BNYXhQcmVzZXRDb2xvcnNMZW5ndGg6IG51bWJlciA9IDY7XG5cbiAgQElucHV0KCkgY3BQcmVzZXRFbXB0eU1lc3NhZ2U6IHN0cmluZyA9ICdObyBjb2xvcnMgYWRkZWQnO1xuICBASW5wdXQoKSBjcFByZXNldEVtcHR5TWVzc2FnZUNsYXNzOiBzdHJpbmcgPSAncHJlc2V0LWVtcHR5LW1lc3NhZ2UnO1xuXG4gIEBJbnB1dCgpIGNwQWRkQ29sb3JCdXR0b246IGJvb2xlYW4gPSBmYWxzZTtcbiAgQElucHV0KCkgY3BBZGRDb2xvckJ1dHRvblRleHQ6IHN0cmluZyA9ICdBZGQgY29sb3InO1xuICBASW5wdXQoKSBjcEFkZENvbG9yQnV0dG9uQ2xhc3M6IHN0cmluZyA9ICdjcC1hZGQtY29sb3ItYnV0dG9uLWNsYXNzJztcblxuICBASW5wdXQoKSBjcFJlbW92ZUNvbG9yQnV0dG9uQ2xhc3M6IHN0cmluZyA9ICdjcC1yZW1vdmUtY29sb3ItYnV0dG9uLWNsYXNzJztcblxuICBASW5wdXQoKSBjcEV4dHJhVGVtcGxhdGU6IFRlbXBsYXRlUmVmPGFueT47XG5cbiAgQE91dHB1dCgpIGNwSW5wdXRDaGFuZ2UgPSBuZXcgRXZlbnRFbWl0dGVyPHtpbnB1dDogc3RyaW5nLCB2YWx1ZTogbnVtYmVyIHwgc3RyaW5nLCBjb2xvcjogc3RyaW5nfT4odHJ1ZSk7XG5cbiAgQE91dHB1dCgpIGNwVG9nZ2xlQ2hhbmdlID0gbmV3IEV2ZW50RW1pdHRlcjxib29sZWFuPih0cnVlKTtcblxuICBAT3V0cHV0KCkgY3BTbGlkZXJDaGFuZ2UgPSBuZXcgRXZlbnRFbWl0dGVyPHtzbGlkZXI6IHN0cmluZywgdmFsdWU6IHN0cmluZyB8IG51bWJlciwgY29sb3I6IHN0cmluZ30+KHRydWUpO1xuICBAT3V0cHV0KCkgY3BTbGlkZXJEcmFnRW5kID0gbmV3IEV2ZW50RW1pdHRlcjx7c2xpZGVyOiBzdHJpbmcsIGNvbG9yOiBzdHJpbmd9Pih0cnVlKTtcbiAgQE91dHB1dCgpIGNwU2xpZGVyRHJhZ1N0YXJ0ID0gbmV3IEV2ZW50RW1pdHRlcjx7c2xpZGVyOiBzdHJpbmcsIGNvbG9yOiBzdHJpbmd9Pih0cnVlKTtcblxuICBAT3V0cHV0KCkgY29sb3JQaWNrZXJPcGVuID0gbmV3IEV2ZW50RW1pdHRlcjxzdHJpbmc+KHRydWUpO1xuICBAT3V0cHV0KCkgY29sb3JQaWNrZXJDbG9zZSA9IG5ldyBFdmVudEVtaXR0ZXI8c3RyaW5nPih0cnVlKTtcblxuICBAT3V0cHV0KCkgY29sb3JQaWNrZXJDYW5jZWwgPSBuZXcgRXZlbnRFbWl0dGVyPHN0cmluZz4odHJ1ZSk7XG4gIEBPdXRwdXQoKSBjb2xvclBpY2tlclNlbGVjdCA9IG5ldyBFdmVudEVtaXR0ZXI8c3RyaW5nPih0cnVlKTtcbiAgQE91dHB1dCgpIGNvbG9yUGlja2VyQ2hhbmdlID0gbmV3IEV2ZW50RW1pdHRlcjxzdHJpbmc+KGZhbHNlKTtcblxuICBAT3V0cHV0KCkgY3BDbXlrQ29sb3JDaGFuZ2UgPSBuZXcgRXZlbnRFbWl0dGVyPHN0cmluZz4odHJ1ZSk7XG5cbiAgQE91dHB1dCgpIGNwUHJlc2V0Q29sb3JzQ2hhbmdlID0gbmV3IEV2ZW50RW1pdHRlcjxhbnk+KHRydWUpO1xuXG4gIEBIb3N0TGlzdGVuZXIoJ2NsaWNrJykgaGFuZGxlQ2xpY2soKTogdm9pZCB7XG4gICAgdGhpcy5pbnB1dEZvY3VzKCk7XG4gIH1cblxuICBASG9zdExpc3RlbmVyKCdmb2N1cycpIGhhbmRsZUZvY3VzKCk6IHZvaWQge1xuICAgIHRoaXMuaW5wdXRGb2N1cygpO1xuICB9XG5cbiAgQEhvc3RMaXN0ZW5lcignaW5wdXQnLCBbJyRldmVudCddKSBoYW5kbGVJbnB1dChldmVudDogYW55KTogdm9pZCB7XG4gICAgdGhpcy5pbnB1dENoYW5nZShldmVudCk7XG4gIH1cblxuICBjb25zdHJ1Y3Rvcihwcml2YXRlIGluamVjdG9yOiBJbmplY3RvciwgcHJpdmF0ZSBjZnI6IENvbXBvbmVudEZhY3RvcnlSZXNvbHZlcixcbiAgICAgICAgICAgICAgcHJpdmF0ZSBhcHBSZWY6IEFwcGxpY2F0aW9uUmVmLCBwcml2YXRlIHZjUmVmOiBWaWV3Q29udGFpbmVyUmVmLCBwcml2YXRlIGVsUmVmOiBFbGVtZW50UmVmLFxuICAgICAgICAgICAgICBwcml2YXRlIF9zZXJ2aWNlOiBDb2xvclBpY2tlclNlcnZpY2UpIHt9XG5cbiAgbmdPbkRlc3Ryb3koKTogdm9pZCB7XG4gICAgaWYgKHRoaXMuY21wUmVmICE9IG51bGwpIHtcbiAgICAgIGlmICh0aGlzLnZpZXdBdHRhY2hlZFRvQXBwUmVmKSB7XG4gICAgICAgIHRoaXMuYXBwUmVmLmRldGFjaFZpZXcodGhpcy5jbXBSZWYuaG9zdFZpZXcpO1xuICAgICAgfVxuXG4gICAgICB0aGlzLmNtcFJlZi5kZXN0cm95KCk7XG5cbiAgICAgIHRoaXMuY21wUmVmID0gbnVsbDtcbiAgICAgIHRoaXMuZGlhbG9nID0gbnVsbDtcbiAgICB9XG4gIH1cblxuICBuZ09uQ2hhbmdlcyhjaGFuZ2VzOiBhbnkpOiB2b2lkIHtcbiAgICBpZiAoY2hhbmdlcy5jcFRvZ2dsZSAmJiAhdGhpcy5jcERpc2FibGVkKSB7XG4gICAgICBpZiAoY2hhbmdlcy5jcFRvZ2dsZS5jdXJyZW50VmFsdWUpIHtcbiAgICAgICAgdGhpcy5vcGVuRGlhbG9nKCk7XG4gICAgICB9IGVsc2UgaWYgKCFjaGFuZ2VzLmNwVG9nZ2xlLmN1cnJlbnRWYWx1ZSkge1xuICAgICAgICB0aGlzLmNsb3NlRGlhbG9nKCk7XG4gICAgICB9XG4gICAgfVxuXG4gICAgaWYgKGNoYW5nZXMuY29sb3JQaWNrZXIpIHtcbiAgICAgIGlmICh0aGlzLmRpYWxvZyAmJiAhdGhpcy5pZ25vcmVDaGFuZ2VzKSB7XG4gICAgICAgIGlmICh0aGlzLmNwRGlhbG9nRGlzcGxheSA9PT0gJ2lubGluZScpIHtcbiAgICAgICAgICB0aGlzLmRpYWxvZy5zZXRJbml0aWFsQ29sb3IoY2hhbmdlcy5jb2xvclBpY2tlci5jdXJyZW50VmFsdWUpO1xuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy5kaWFsb2cuc2V0Q29sb3JGcm9tU3RyaW5nKGNoYW5nZXMuY29sb3JQaWNrZXIuY3VycmVudFZhbHVlLCBmYWxzZSk7XG5cbiAgICAgICAgaWYgKHRoaXMuY3BVc2VSb290Vmlld0NvbnRhaW5lciAmJiB0aGlzLmNwRGlhbG9nRGlzcGxheSAhPT0gJ2lubGluZScpIHtcbiAgICAgICAgICB0aGlzLmNtcFJlZi5jaGFuZ2VEZXRlY3RvclJlZi5kZXRlY3RDaGFuZ2VzKCk7XG4gICAgICAgIH1cbiAgICAgIH1cblxuICAgICAgdGhpcy5pZ25vcmVDaGFuZ2VzID0gZmFsc2U7XG4gICAgfVxuXG4gICAgaWYgKGNoYW5nZXMuY3BQcmVzZXRMYWJlbCB8fCBjaGFuZ2VzLmNwUHJlc2V0Q29sb3JzKSB7XG4gICAgICBpZiAodGhpcy5kaWFsb2cpIHtcbiAgICAgICAgdGhpcy5kaWFsb2cuc2V0UHJlc2V0Q29uZmlnKHRoaXMuY3BQcmVzZXRMYWJlbCwgdGhpcy5jcFByZXNldENvbG9ycyk7XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgcHVibGljIG9wZW5EaWFsb2coKTogdm9pZCB7XG4gICAgaWYgKCF0aGlzLmRpYWxvZ0NyZWF0ZWQpIHtcbiAgICAgIGxldCB2Y1JlZiA9IHRoaXMudmNSZWY7XG5cbiAgICAgIHRoaXMuZGlhbG9nQ3JlYXRlZCA9IHRydWU7XG4gICAgICB0aGlzLnZpZXdBdHRhY2hlZFRvQXBwUmVmID0gZmFsc2U7XG5cbiAgICAgIGlmICh0aGlzLmNwVXNlUm9vdFZpZXdDb250YWluZXIgJiYgdGhpcy5jcERpYWxvZ0Rpc3BsYXkgIT09ICdpbmxpbmUnKSB7XG4gICAgICAgIGNvbnN0IGNsYXNzT2ZSb290Q29tcG9uZW50ID0gdGhpcy5hcHBSZWYuY29tcG9uZW50VHlwZXNbMF07XG4gICAgICAgIGNvbnN0IGFwcEluc3RhbmNlID0gdGhpcy5pbmplY3Rvci5nZXQoY2xhc3NPZlJvb3RDb21wb25lbnQsIEluamVjdG9yLk5VTEwpO1xuXG4gICAgICAgIGlmIChhcHBJbnN0YW5jZSAhPT0gSW5qZWN0b3IuTlVMTCkge1xuICAgICAgICAgIHZjUmVmID0gYXBwSW5zdGFuY2UudmNSZWYgfHwgYXBwSW5zdGFuY2Uudmlld0NvbnRhaW5lclJlZiB8fCB0aGlzLnZjUmVmO1xuXG4gICAgICAgICAgaWYgKE5HX0RFVl9NT0RFICYmIHZjUmVmID09PSB0aGlzLnZjUmVmKSB7XG4gICAgICAgICAgICBjb25zb2xlLndhcm4oJ1lvdSBhcmUgdXNpbmcgY3BVc2VSb290Vmlld0NvbnRhaW5lciwgJyArXG4gICAgICAgICAgICAgICAgJ2J1dCB0aGUgcm9vdCBjb21wb25lbnQgaXMgbm90IGV4cG9zaW5nIHZpZXdDb250YWluZXJSZWYhJyArXG4gICAgICAgICAgICAgICAgJ1BsZWFzZSBleHBvc2UgaXQgYnkgYWRkaW5nIFxcJ3B1YmxpYyB2Y1JlZjogVmlld0NvbnRhaW5lclJlZlxcJyB0byB0aGUgY29uc3RydWN0b3IuJyk7XG4gICAgICAgICAgfVxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHRoaXMudmlld0F0dGFjaGVkVG9BcHBSZWYgPSB0cnVlO1xuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIGNvbnN0IGNvbXBGYWN0b3J5ID0gdGhpcy5jZnIucmVzb2x2ZUNvbXBvbmVudEZhY3RvcnkoQ29sb3JQaWNrZXJDb21wb25lbnQpO1xuXG4gICAgICBpZiAodGhpcy52aWV3QXR0YWNoZWRUb0FwcFJlZikge1xuICAgICAgICB0aGlzLmNtcFJlZiA9IGNvbXBGYWN0b3J5LmNyZWF0ZSh0aGlzLmluamVjdG9yKTtcbiAgICAgICAgdGhpcy5hcHBSZWYuYXR0YWNoVmlldyh0aGlzLmNtcFJlZi5ob3N0Vmlldyk7XG4gICAgICAgIGRvY3VtZW50LmJvZHkuYXBwZW5kQ2hpbGQoKHRoaXMuY21wUmVmLmhvc3RWaWV3IGFzIEVtYmVkZGVkVmlld1JlZjxhbnk+KS5yb290Tm9kZXNbMF0gYXMgSFRNTEVsZW1lbnQpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgY29uc3QgaW5qZWN0b3IgPSBJbmplY3Rvci5jcmVhdGUoe1xuICAgICAgICAgIHByb3ZpZGVyczogW10sXG4gICAgICAgICAgLy8gV2Ugc2hvdWxkbid0IHVzZSBgdmNSZWYucGFyZW50SW5qZWN0b3JgIHNpbmNlIGl0J3MgYmVlbiBkZXByZWNhdGVkIGxvbmcgdGltZSBhZ28gYW5kIG1pZ2h0IGJlIHJlbW92ZWRcbiAgICAgICAgICAvLyBpbiBuZXdlciBBbmd1bGFyIHZlcnNpb25zOiBodHRwczovL2dpdGh1Yi5jb20vYW5ndWxhci9hbmd1bGFyL3B1bGwvMjUxNzQuXG4gICAgICAgICAgcGFyZW50OiB2Y1JlZi5pbmplY3RvcixcbiAgICAgICAgfSk7XG5cbiAgICAgICAgdGhpcy5jbXBSZWYgPSB2Y1JlZi5jcmVhdGVDb21wb25lbnQoY29tcEZhY3RvcnksIDAsIGluamVjdG9yLCBbXSk7XG4gICAgICB9XG5cbiAgICAgIGNvbnN0IGNwU2xpZGVyV2lkdGggPSB0aGlzLmNwU2xpZGVyU0xXaWR0aCA/PyB0aGlzLmNwV2lkdGg7XG4gICAgICB0aGlzLmNtcFJlZi5pbnN0YW5jZS5zZXR1cERpYWxvZyh0aGlzLCB0aGlzLmVsUmVmLCB0aGlzLmNvbG9yUGlja2VyLFxuICAgICAgICAgIHRoaXMuY3BXaWR0aCwgdGhpcy5jcEhlaWdodCwgdGhpcy5jcFNsaWRlclNMSGVpZ2h0LCBjcFNsaWRlcldpZHRoLCB0aGlzLmNwQ3Vyc29yUmFkaXVzLCB0aGlzLmNwRGlhbG9nRGlzcGxheSwgdGhpcy5jcEZhbGxiYWNrQ29sb3IsIHRoaXMuY3BDb2xvck1vZGUsXG4gICAgICAgICAgdGhpcy5jcENteWtFbmFibGVkLCB0aGlzLmNwQWxwaGFDaGFubmVsLCB0aGlzLmNwT3V0cHV0Rm9ybWF0LCB0aGlzLmNwRGlzYWJsZUlucHV0LFxuICAgICAgICAgIHRoaXMuY3BJZ25vcmVkRWxlbWVudHMsIHRoaXMuY3BTYXZlQ2xpY2tPdXRzaWRlLCB0aGlzLmNwQ2xvc2VDbGlja091dHNpZGUsXG4gICAgICAgICAgdGhpcy5jcFVzZVJvb3RWaWV3Q29udGFpbmVyLCB0aGlzLmNwUG9zaXRpb24sIHRoaXMuY3BQb3NpdGlvbk9mZnNldCxcbiAgICAgICAgICB0aGlzLmNwUG9zaXRpb25SZWxhdGl2ZVRvQXJyb3csIHRoaXMuY3BQcmVzZXRMYWJlbCwgdGhpcy5jcFByZXNldENvbG9ycyxcbiAgICAgICAgICB0aGlzLmNwUHJlc2V0Q29sb3JzQ2xhc3MsIHRoaXMuY3BNYXhQcmVzZXRDb2xvcnNMZW5ndGgsIHRoaXMuY3BQcmVzZXRFbXB0eU1lc3NhZ2UsXG4gICAgICAgICAgdGhpcy5jcFByZXNldEVtcHR5TWVzc2FnZUNsYXNzLCB0aGlzLmNwT0tCdXR0b24sIHRoaXMuY3BPS0J1dHRvbkNsYXNzLFxuICAgICAgICAgIHRoaXMuY3BPS0J1dHRvblRleHQsIHRoaXMuY3BDYW5jZWxCdXR0b24sIHRoaXMuY3BDYW5jZWxCdXR0b25DbGFzcyxcbiAgICAgICAgICB0aGlzLmNwQ2FuY2VsQnV0dG9uVGV4dCwgdGhpcy5jcEFkZENvbG9yQnV0dG9uLCB0aGlzLmNwQWRkQ29sb3JCdXR0b25DbGFzcyxcbiAgICAgICAgICB0aGlzLmNwQWRkQ29sb3JCdXR0b25UZXh0LCB0aGlzLmNwUmVtb3ZlQ29sb3JCdXR0b25DbGFzcywgdGhpcy5jcEV5ZURyb3BwZXIsIHRoaXMuZWxSZWYsXG4gICAgICAgICAgdGhpcy5jcEV4dHJhVGVtcGxhdGUpO1xuXG4gICAgICB0aGlzLmRpYWxvZyA9IHRoaXMuY21wUmVmLmluc3RhbmNlO1xuXG4gICAgICBpZiAodGhpcy52Y1JlZiAhPT0gdmNSZWYpIHtcbiAgICAgICAgdGhpcy5jbXBSZWYuY2hhbmdlRGV0ZWN0b3JSZWYuZGV0ZWN0Q2hhbmdlcygpO1xuICAgICAgfVxuICAgIH0gZWxzZSBpZiAodGhpcy5kaWFsb2cpIHtcbiAgICAgIHRoaXMuZGlhbG9nLm9wZW5EaWFsb2codGhpcy5jb2xvclBpY2tlcik7XG4gICAgfVxuICB9XG5cbiAgcHVibGljIGNsb3NlRGlhbG9nKCk6IHZvaWQge1xuICAgIGlmICh0aGlzLmRpYWxvZyAmJiB0aGlzLmNwRGlhbG9nRGlzcGxheSA9PT0gJ3BvcHVwJykge1xuICAgICAgdGhpcy5kaWFsb2cuY2xvc2VEaWFsb2coKTtcbiAgICB9XG4gIH1cblxuICBwdWJsaWMgY215a0NoYW5nZWQodmFsdWU6IHN0cmluZyk6IHZvaWQge1xuICAgIHRoaXMuY3BDbXlrQ29sb3JDaGFuZ2UuZW1pdCh2YWx1ZSk7XG4gIH1cblxuICBwdWJsaWMgc3RhdGVDaGFuZ2VkKHN0YXRlOiBib29sZWFuKTogdm9pZCB7XG4gICAgdGhpcy5jcFRvZ2dsZUNoYW5nZS5lbWl0KHN0YXRlKTtcblxuICAgIGlmIChzdGF0ZSkge1xuICAgICAgdGhpcy5jb2xvclBpY2tlck9wZW4uZW1pdCh0aGlzLmNvbG9yUGlja2VyKTtcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5jb2xvclBpY2tlckNsb3NlLmVtaXQodGhpcy5jb2xvclBpY2tlcik7XG4gICAgfVxuICB9XG5cbiAgcHVibGljIGNvbG9yQ2hhbmdlZCh2YWx1ZTogc3RyaW5nLCBpZ25vcmU6IGJvb2xlYW4gPSB0cnVlKTogdm9pZCB7XG4gICAgdGhpcy5pZ25vcmVDaGFuZ2VzID0gaWdub3JlO1xuXG4gICAgdGhpcy5jb2xvclBpY2tlckNoYW5nZS5lbWl0KHZhbHVlKTtcbiAgfVxuXG4gIHB1YmxpYyBjb2xvclNlbGVjdGVkKHZhbHVlOiBzdHJpbmcpOiB2b2lkIHtcbiAgICB0aGlzLmNvbG9yUGlja2VyU2VsZWN0LmVtaXQodmFsdWUpO1xuICB9XG5cbiAgcHVibGljIGNvbG9yQ2FuY2VsZWQoKTogdm9pZCB7XG4gICAgdGhpcy5jb2xvclBpY2tlckNhbmNlbC5lbWl0KCk7XG4gIH1cblxuICBwdWJsaWMgaW5wdXRGb2N1cygpOiB2b2lkIHtcbiAgICBjb25zdCBlbGVtZW50ID0gdGhpcy5lbFJlZi5uYXRpdmVFbGVtZW50O1xuXG4gICAgY29uc3QgaWdub3JlZCA9IHRoaXMuY3BJZ25vcmVkRWxlbWVudHMuZmlsdGVyKChpdGVtOiBhbnkpID0+IGl0ZW0gPT09IGVsZW1lbnQpO1xuXG4gICAgaWYgKCF0aGlzLmNwRGlzYWJsZWQgJiYgIWlnbm9yZWQubGVuZ3RoKSB7XG4gICAgICBpZiAodHlwZW9mIGRvY3VtZW50ICE9PSAndW5kZWZpbmVkJyAmJiBlbGVtZW50ID09PSBkb2N1bWVudC5hY3RpdmVFbGVtZW50KSB7XG4gICAgICAgIHRoaXMub3BlbkRpYWxvZygpO1xuICAgICAgfSBlbHNlIGlmICghdGhpcy5kaWFsb2cgfHwgIXRoaXMuZGlhbG9nLnNob3cpIHtcbiAgICAgICAgdGhpcy5vcGVuRGlhbG9nKCk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICB0aGlzLmNsb3NlRGlhbG9nKCk7XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgcHVibGljIGlucHV0Q2hhbmdlKGV2ZW50OiBhbnkpOiB2b2lkIHtcbiAgICBpZiAodGhpcy5kaWFsb2cpIHtcbiAgICAgIHRoaXMuZGlhbG9nLnNldENvbG9yRnJvbVN0cmluZyhldmVudC50YXJnZXQudmFsdWUsIHRydWUpO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLmNvbG9yUGlja2VyID0gZXZlbnQudGFyZ2V0LnZhbHVlO1xuXG4gICAgICB0aGlzLmNvbG9yUGlja2VyQ2hhbmdlLmVtaXQodGhpcy5jb2xvclBpY2tlcik7XG4gICAgfVxuICB9XG5cbiAgcHVibGljIGlucHV0Q2hhbmdlZChldmVudDogYW55KTogdm9pZCB7XG4gICAgdGhpcy5jcElucHV0Q2hhbmdlLmVtaXQoZXZlbnQpO1xuICB9XG5cbiAgcHVibGljIHNsaWRlckNoYW5nZWQoZXZlbnQ6IGFueSk6IHZvaWQge1xuICAgIHRoaXMuY3BTbGlkZXJDaGFuZ2UuZW1pdChldmVudCk7XG4gIH1cblxuICBwdWJsaWMgc2xpZGVyRHJhZ0VuZChldmVudDogeyBzbGlkZXI6IHN0cmluZywgY29sb3I6IHN0cmluZyB9KTogdm9pZCB7XG4gICAgdGhpcy5jcFNsaWRlckRyYWdFbmQuZW1pdChldmVudCk7XG4gIH1cblxuICBwdWJsaWMgc2xpZGVyRHJhZ1N0YXJ0KGV2ZW50OiB7IHNsaWRlcjogc3RyaW5nLCBjb2xvcjogc3RyaW5nIH0pOiB2b2lkIHtcbiAgICB0aGlzLmNwU2xpZGVyRHJhZ1N0YXJ0LmVtaXQoZXZlbnQpO1xuICB9XG5cbiAgcHVibGljIHByZXNldENvbG9yc0NoYW5nZWQodmFsdWU6IGFueVtdKTogdm9pZCB7XG4gICAgdGhpcy5jcFByZXNldENvbG9yc0NoYW5nZS5lbWl0KHZhbHVlKTtcbiAgfVxufVxuIl19