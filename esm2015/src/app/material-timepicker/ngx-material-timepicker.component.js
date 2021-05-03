import * as tslib_1 from "tslib";
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { merge, Subject } from 'rxjs';
import { NgxMaterialTimepickerEventService } from './services/ngx-material-timepicker-event.service';
import { filter, takeUntil } from 'rxjs/operators';
import { DomService } from './services/dom.service';
import { NgxMaterialTimepickerContainerComponent } from './components/ngx-material-timepicker-container/ngx-material-timepicker-container.component';
const ESCAPE = 27;
let NgxMaterialTimepickerComponent = class NgxMaterialTimepickerComponent {
    constructor(eventService, domService) {
        this.eventService = eventService;
        this.domService = domService;
        this.timeUpdated = new Subject();
        this.hostClass = '';
        this.isEsc = true;
        this.hoursOnly = false;
        this.timeSet = new EventEmitter();
        this.opened = new EventEmitter();
        this.closed = new EventEmitter();
        this.hourSelected = new EventEmitter();
        this.timeChanged = new EventEmitter();
        this.unsubscribe = new Subject();
    }
    /**
     * @deprecated Since version 5.1.1. Will be deleted on version 6.0.0. Use @Input() theme instead
     */
    set ngxMaterialTimepickerTheme(theme) {
        console.warn(`'ngxMaterialTimepickerTheme' is deprecated. Use 'theme' instead`);
        this._ngxMaterialTimepickerTheme = theme;
    }
    set format(value) {
        this._format = value === 24 ? 24 : 12;
    }
    get format() {
        return this.timepickerInput ? this.timepickerInput.format : this._format;
    }
    set minutesGap(gap) {
        if (gap == null) {
            return;
        }
        gap = Math.floor(gap);
        this._minutesGap = gap <= 59 ? gap : 1;
    }
    get minutesGap() {
        return this._minutesGap;
    }
    get minTime() {
        return this.timepickerInput ? this.timepickerInput.min : this.min;
    }
    get maxTime() {
        return this.timepickerInput ? this.timepickerInput.max : this.max;
    }
    get disabled() {
        return this.timepickerInput && this.timepickerInput.disabled;
    }
    get time() {
        return this.timepickerInput && this.timepickerInput.value;
    }
    get inputElement() {
        return this.timepickerInput && this.timepickerInput.element;
    }
    /***
     * Register an input with this timepicker.
     * input - The timepicker input to register with this timepicker
     */
    registerInput(input) {
        if (this.timepickerInput) {
            throw Error('A Timepicker can only be associated with a single input.');
        }
        this.timepickerInput = input;
    }
    open() {
        this.domService.appendTimepickerToBody(NgxMaterialTimepickerContainerComponent, {
            timepickerBaseRef: this,
            time: this.time,
            defaultTime: this.defaultTime,
            maxTime: this.maxTime,
            minTime: this.minTime,
            format: this.format,
            minutesGap: this.minutesGap,
            disableAnimation: this.disableAnimation,
            cancelBtnTmpl: this.cancelBtnTmpl,
            confirmBtnTmpl: this.confirmBtnTmpl,
            editableHintTmpl: this.editableHintTmpl,
            disabled: this.disabled,
            enableKeyboardInput: this.enableKeyboardInput,
            preventOverlayClick: this.preventOverlayClick,
            appendToInput: this.appendToInput,
            hoursOnly: this.hoursOnly,
            theme: this.theme || this._ngxMaterialTimepickerTheme,
            timepickerClass: this.timepickerClass,
            inputElement: this.inputElement,
            hostClass: this.hostClass
        });
        this.opened.next();
        this.subscribeToEvents();
    }
    close() {
        this.domService.destroyTimepicker();
        this.closed.next(this.time);
        this.unsubscribeFromEvents();
    }
    updateTime(time) {
        this.timeUpdated.next(time);
    }
    subscribeToEvents() {
        merge(this.eventService.backdropClick, this.eventService.keydownEvent.pipe(filter(e => e.keyCode === ESCAPE && this.isEsc)))
            .pipe(takeUntil(this.unsubscribe))
            .subscribe(() => this.close());
    }
    unsubscribeFromEvents() {
        this.unsubscribe.next();
        this.unsubscribe.complete();
    }
};
NgxMaterialTimepickerComponent.ctorParameters = () => [
    { type: NgxMaterialTimepickerEventService },
    { type: DomService }
];
tslib_1.__decorate([
    Input()
], NgxMaterialTimepickerComponent.prototype, "hostClass", void 0);
tslib_1.__decorate([
    Input()
], NgxMaterialTimepickerComponent.prototype, "cancelBtnTmpl", void 0);
tslib_1.__decorate([
    Input()
], NgxMaterialTimepickerComponent.prototype, "editableHintTmpl", void 0);
tslib_1.__decorate([
    Input()
], NgxMaterialTimepickerComponent.prototype, "confirmBtnTmpl", void 0);
tslib_1.__decorate([
    Input('ESC')
], NgxMaterialTimepickerComponent.prototype, "isEsc", void 0);
tslib_1.__decorate([
    Input()
], NgxMaterialTimepickerComponent.prototype, "enableKeyboardInput", void 0);
tslib_1.__decorate([
    Input()
], NgxMaterialTimepickerComponent.prototype, "preventOverlayClick", void 0);
tslib_1.__decorate([
    Input()
], NgxMaterialTimepickerComponent.prototype, "disableAnimation", void 0);
tslib_1.__decorate([
    Input()
], NgxMaterialTimepickerComponent.prototype, "appendToInput", void 0);
tslib_1.__decorate([
    Input()
], NgxMaterialTimepickerComponent.prototype, "hoursOnly", void 0);
tslib_1.__decorate([
    Input()
], NgxMaterialTimepickerComponent.prototype, "defaultTime", void 0);
tslib_1.__decorate([
    Input()
], NgxMaterialTimepickerComponent.prototype, "timepickerClass", void 0);
tslib_1.__decorate([
    Input()
], NgxMaterialTimepickerComponent.prototype, "theme", void 0);
tslib_1.__decorate([
    Input()
], NgxMaterialTimepickerComponent.prototype, "min", void 0);
tslib_1.__decorate([
    Input()
], NgxMaterialTimepickerComponent.prototype, "max", void 0);
tslib_1.__decorate([
    Input()
], NgxMaterialTimepickerComponent.prototype, "ngxMaterialTimepickerTheme", null);
tslib_1.__decorate([
    Input()
], NgxMaterialTimepickerComponent.prototype, "format", null);
tslib_1.__decorate([
    Input()
], NgxMaterialTimepickerComponent.prototype, "minutesGap", null);
tslib_1.__decorate([
    Output()
], NgxMaterialTimepickerComponent.prototype, "timeSet", void 0);
tslib_1.__decorate([
    Output()
], NgxMaterialTimepickerComponent.prototype, "opened", void 0);
tslib_1.__decorate([
    Output()
], NgxMaterialTimepickerComponent.prototype, "closed", void 0);
tslib_1.__decorate([
    Output()
], NgxMaterialTimepickerComponent.prototype, "hourSelected", void 0);
tslib_1.__decorate([
    Output()
], NgxMaterialTimepickerComponent.prototype, "timeChanged", void 0);
NgxMaterialTimepickerComponent = tslib_1.__decorate([
    Component({
        selector: 'ngx-material-timepicker',
        template: '',
        host: {
            'class': 'hostClass'
        }
    })
], NgxMaterialTimepickerComponent);
export { NgxMaterialTimepickerComponent };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibmd4LW1hdGVyaWFsLXRpbWVwaWNrZXIuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6Im5nOi8vbmd4LW1hdGVyaWFsLXRpbWVwaWNrZXIvIiwic291cmNlcyI6WyJzcmMvYXBwL21hdGVyaWFsLXRpbWVwaWNrZXIvbmd4LW1hdGVyaWFsLXRpbWVwaWNrZXIuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxPQUFPLEVBQUUsU0FBUyxFQUFFLFlBQVksRUFBRSxLQUFLLEVBQUUsTUFBTSxFQUFlLE1BQU0sZUFBZSxDQUFDO0FBQ3BGLE9BQU8sRUFBRSxLQUFLLEVBQUUsT0FBTyxFQUFFLE1BQU0sTUFBTSxDQUFDO0FBQ3RDLE9BQU8sRUFBRSxpQ0FBaUMsRUFBRSxNQUFNLGtEQUFrRCxDQUFDO0FBQ3JHLE9BQU8sRUFBRSxNQUFNLEVBQUUsU0FBUyxFQUFFLE1BQU0sZ0JBQWdCLENBQUM7QUFHbkQsT0FBTyxFQUFFLFVBQVUsRUFBRSxNQUFNLHdCQUF3QixDQUFDO0FBQ3BELE9BQU8sRUFDSCx1Q0FBdUMsRUFDMUMsTUFBTSw0RkFBNEYsQ0FBQztBQUlwRyxNQUFNLE1BQU0sR0FBRyxFQUFFLENBQUM7QUFTbEIsSUFBYSw4QkFBOEIsR0FBM0MsTUFBYSw4QkFBOEI7SUE2RHZDLFlBQW9CLFlBQStDLEVBQy9DLFVBQXNCO1FBRHRCLGlCQUFZLEdBQVosWUFBWSxDQUFtQztRQUMvQyxlQUFVLEdBQVYsVUFBVSxDQUFZO1FBNUQxQyxnQkFBVyxHQUFHLElBQUksT0FBTyxFQUFVLENBQUM7UUFDM0IsY0FBUyxHQUFHLEVBQUUsQ0FBQztRQUlWLFVBQUssR0FBRyxJQUFJLENBQUM7UUFLbEIsY0FBUyxHQUFHLEtBQUssQ0FBQztRQXFDakIsWUFBTyxHQUFHLElBQUksWUFBWSxFQUFVLENBQUM7UUFDckMsV0FBTSxHQUFHLElBQUksWUFBWSxFQUFFLENBQUM7UUFDNUIsV0FBTSxHQUFHLElBQUksWUFBWSxFQUFVLENBQUM7UUFDcEMsaUJB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QUFTLENBQUM7UUFDUCxRQUFRLEVBQUUseUJBQXlCO1FBQ25DLFFBQVEsRUFBRSxFQUFFO1FBQ1osSUFBSSxFQUFFO1lBQ0YsT0FBTyxFQUFFLFdBQVc7U0FDdkI7S0FDSixDQUFDO0dBQ1csOEJBQThCLENBZ0oxQztTQWhKWSw4QkFBOEIiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDb21wb25lbnQsIEV2ZW50RW1pdHRlciwgSW5wdXQsIE91dHB1dCwgVGVtcGxhdGVSZWYgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IG1lcmdlLCBTdWJqZWN0IH0gZnJvbSAncnhqcyc7XG5pbXBvcnQgeyBOZ3hNYXRlcmlhbFRpbWVwaWNrZXJFdmVudFNlcnZpY2UgfSBmcm9tICcuL3NlcnZpY2VzL25neC1tYXRlcmlhbC10aW1lcGlja2VyLWV2ZW50LnNlcnZpY2UnO1xuaW1wb3J0IHsgZmlsdGVyLCB0YWtlVW50aWwgfSBmcm9tICdyeGpzL29wZXJhdG9ycyc7XG5pbXBvcnQgeyBUaW1lcGlja2VyRGlyZWN0aXZlIH0gZnJvbSAnLi9kaXJlY3RpdmVzL25neC10aW1lcGlja2VyLmRpcmVjdGl2ZSc7XG5pbXBvcnQgeyBEYXRlVGltZSB9IGZyb20gJ2x1eG9uJztcbmltcG9ydCB7IERvbVNlcnZpY2UgfSBmcm9tICcuL3NlcnZpY2VzL2RvbS5zZXJ2aWNlJztcbmltcG9ydCB7XG4gICAgTmd4TWF0ZXJpYWxUaW1lcGlja2VyQ29udGFpbmVyQ29tcG9uZW50XG59IGZyb20gJy4vY29tcG9uZW50cy9uZ3gtbWF0ZXJpYWwtdGltZXBpY2tlci1jb250YWluZXIvbmd4LW1hdGVyaWFsLXRpbWVwaWNrZXItY29udGFpbmVyLmNvbXBvbmVudCc7XG5pbXBvcnQgeyBUaW1lcGlja2VyUmVmIH0gZnJvbSAnLi9tb2RlbHMvdGltZXBpY2tlci1yZWYuaW50ZXJmYWNlJztcbmltcG9ydCB7IE5neE1hdGVyaWFsVGltZXBpY2tlclRoZW1lIH0gZnJvbSAnLi9tb2RlbHMvbmd4LW1hdGVyaWFsLXRpbWVwaWNrZXItdGhlbWUuaW50ZXJmYWNlJztcblxuY29uc3QgRVNDQVBFID0gMjc7XG5cbkBDb21wb25lbnQoe1xuICAgIHNlbGVjdG9yOiAnbmd4LW1hdGVyaWFsLXRpbWVwaWNrZXInLFxuICAgIHRlbXBsYXRlOiAnJyxcbiAgICBob3N0OiB7XG4gICAgICAgICdjbGFzcyc6ICdob3N0Q2xhc3MnXG4gICAgfVxufSlcbmV4cG9ydCBjbGFzcyBOZ3hNYXRlcmlhbFRpbWVwaWNrZXJDb21wb25lbnQgaW1wbGVtZW50cyBUaW1lcGlja2VyUmVmIHtcblxuICAgIHRpbWVVcGRhdGVkID0gbmV3IFN1YmplY3Q8c3RyaW5nPigpO1xuICAgIEBJbnB1dCgpIGhvc3RDbGFzcyA9ICcnO1xuICAgIEBJbnB1dCgpIGNhbmNlbEJ0blRtcGw6IFRlbXBsYXRlUmVmPE5vZGU+O1xuICAgIEBJbnB1dCgpIGVkaXRhYmxlSGludFRtcGw6IFRlbXBsYXRlUmVmPE5vZGU+O1xuICAgIEBJbnB1dCgpIGNvbmZpcm1CdG5UbXBsOiBUZW1wbGF0ZVJlZjxOb2RlPjtcbiAgICBASW5wdXQoJ0VTQycpIGlzRXNjID0gdHJ1ZTtcbiAgICBASW5wdXQoKSBlbmFibGVLZXlib2FyZElucHV0OiBib29sZWFuO1xuICAgIEBJbnB1dCgpIHByZXZlbnRPdmVybGF5Q2xpY2s6IGJvb2xlYW47XG4gICAgQElucHV0KCkgZGlzYWJsZUFuaW1hdGlvbjogYm9vbGVhbjtcbiAgICBASW5wdXQoKSBhcHBlbmRUb0lucHV0OiBib29sZWFuO1xuICAgIEBJbnB1dCgpIGhvdXJzT25seSA9IGZhbHNlO1xuICAgIEBJbnB1dCgpIGRlZmF1bHRUaW1lOiBzdHJpbmc7XG4gICAgQElucHV0KCkgdGltZXBpY2tlckNsYXNzOiBzdHJpbmc7XG4gICAgQElucHV0KCkgdGhlbWU6IE5neE1hdGVyaWFsVGltZXBpY2tlclRoZW1lO1xuICAgIEBJbnB1dCgpIG1pbjogRGF0ZVRpbWU7XG4gICAgQElucHV0KCkgbWF4OiBEYXRlVGltZTtcbiAgICAvKipcbiAgICAgKiBAZGVwcmVjYXRlZCBTaW5jZSB2ZXJzaW9uIDUuMS4xLiBXaWxsIGJlIGRlbGV0ZWQgb24gdmVyc2lvbiA2LjAuMC4gVXNlIEBJbnB1dCgpIHRoZW1lIGluc3RlYWRcbiAgICAgKi9cbiAgICBASW5wdXQoKVxuICAgIHNldCBuZ3hNYXRlcmlhbFRpbWVwaWNrZXJUaGVtZSh0aGVtZTogTmd4TWF0ZXJpYWxUaW1lcGlja2VyVGhlbWUpIHtcbiAgICAgICAgY29uc29sZS53YXJuKGAnbmd4TWF0ZXJpYWxUaW1lcGlja2VyVGhlbWUnIGlzIGRlcHJlY2F0ZWQuIFVzZSAndGhlbWUnIGluc3RlYWRgKTtcbiAgICAgICAgdGhpcy5fbmd4TWF0ZXJpYWxUaW1lcGlja2VyVGhlbWUgPSB0aGVtZTtcbiAgICB9XG5cbiAgICBASW5wdXQoKVxuICAgIHNldCBmb3JtYXQodmFsdWU6IG51bWJlcikge1xuICAgICAgICB0aGlzLl9mb3JtYXQgPSB2YWx1ZSA9PT0gMjQgPyAyNCA6IDEyO1xuICAgIH1cblxuICAgIGdldCBmb3JtYXQoKTogbnVtYmVyIHtcbiAgICAgICAgcmV0dXJuIHRoaXMudGltZXBpY2tlcklucHV0ID8gdGhpcy50aW1lcGlja2VySW5wdXQuZm9ybWF0IDogdGhpcy5fZm9ybWF0O1xuICAgIH1cblxuICAgIEBJbnB1dCgpXG4gICAgc2V0IG1pbnV0ZXNHYXAoZ2FwOiBudW1iZXIpIHtcbiAgICAgICAgaWYgKGdhcCA9PSBudWxsKSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgZ2FwID0gTWF0aC5mbG9vcihnYXApO1xuICAgICAgICB0aGlzLl9taW51dGVzR2FwID0gZ2FwIDw9IDU5ID8gZ2FwIDogMTtcbiAgICB9XG5cbiAgICBnZXQgbWludXRlc0dhcCgpOiBudW1iZXIge1xuICAgICAgICByZXR1cm4gdGhpcy5fbWludXRlc0dhcDtcbiAgICB9XG5cbiAgICBAT3V0cHV0KCkgdGltZVNldCA9IG5ldyBFdmVudEVtaXR0ZXI8c3RyaW5nPigpO1xuICAgIEBPdXRwdXQoKSBvcGVuZWQgPSBuZXcgRXZlbnRFbWl0dGVyKCk7XG4gICAgQE91dHB1dCgpIGNsb3NlZCA9IG5ldyBFdmVudEVtaXR0ZXI8c3RyaW5nPigpO1xuICAgIEBPdXRwdXQoKSBob3VyU2VsZWN0ZWQgPSBuZXcgRXZlbnRFbWl0dGVyPG51bWJlcj4oKTtcbiAgICBAT3V0cHV0KCkgdGltZUNoYW5nZWQgPSBuZXcgRXZlbnRFbWl0dGVyPHN0cmluZz4oKTtcblxuICAgIHByaXZhdGUgX21pbnV0ZXNHYXA6IG51bWJlcjtcbiAgICBwcml2YXRlIF9mb3JtYXQ6IG51bWJlcjtcbiAgICBwcml2YXRlIF9uZ3hNYXRlcmlhbFRpbWVwaWNrZXJUaGVtZTogTmd4TWF0ZXJpYWxUaW1lcGlja2VyVGhlbWU7XG4gICAgcHJpdmF0ZSB0aW1lcGlja2VySW5wdXQ6IFRpbWVwaWNrZXJEaXJlY3RpdmU7XG4gICAgcHJpdmF0ZSB1bnN1YnNjcmliZSA9IG5ldyBTdWJqZWN0KCk7XG5cbiAgICBjb25zdHJ1Y3Rvcihwcml2YXRlIGV2ZW50U2VydmljZTogTmd4TWF0ZXJpYWxUaW1lcGlja2VyRXZlbnRTZXJ2aWNlLFxuICAgICAgICAgICAgICAgIHByaXZhdGUgZG9tU2VydmljZTogRG9tU2VydmljZSkge1xuICAgIH1cblxuICAgIGdldCBtaW5UaW1lKCk6IERhdGVUaW1lIHtcbiAgICAgICAgcmV0dXJuIHRoaXMudGltZXBpY2tlcklucHV0ID8gKHRoaXMudGltZXBpY2tlcklucHV0Lm1pbiBhcyBEYXRlVGltZSkgOiB0aGlzLm1pbjtcbiAgICB9XG5cbiAgICBnZXQgbWF4VGltZSgpOiBEYXRlVGltZSB7XG4gICAgICAgIHJldHVybiB0aGlzLnRpbWVwaWNrZXJJbnB1dCA/ICh0aGlzLnRpbWVwaWNrZXJJbnB1dC5tYXggYXMgRGF0ZVRpbWUpIDogdGhpcy5tYXg7XG4gICAgfVxuXG4gICAgZ2V0IGRpc2FibGVkKCk6IGJvb2xlYW4ge1xuICAgICAgICByZXR1cm4gdGhpcy50aW1lcGlja2VySW5wdXQgJiYgdGhpcy50aW1lcGlja2VySW5wdXQuZGlzYWJsZWQ7XG4gICAgfVxuXG4gICAgZ2V0IHRpbWUoKTogc3RyaW5nIHtcbiAgICAgICAgcmV0dXJuIHRoaXMudGltZXBpY2tlcklucHV0ICYmIHRoaXMudGltZXBpY2tlcklucHV0LnZhbHVlO1xuICAgIH1cblxuICAgIGdldCBpbnB1dEVsZW1lbnQoKTogYW55IHtcbiAgICAgICAgcmV0dXJuIHRoaXMudGltZXBpY2tlcklucHV0ICYmIHRoaXMudGltZXBpY2tlcklucHV0LmVsZW1lbnQ7XG4gICAgfVxuXG4gICAgLyoqKlxuICAgICAqIFJlZ2lzdGVyIGFuIGlucHV0IHdpdGggdGhpcyB0aW1lcGlja2VyLlxuICAgICAqIGlucHV0IC0gVGhlIHRpbWVwaWNrZXIgaW5wdXQgdG8gcmVnaXN0ZXIgd2l0aCB0aGlzIHRpbWVwaWNrZXJcbiAgICAgKi9cbiAgICByZWdpc3RlcklucHV0KGlucHV0OiBUaW1lcGlja2VyRGlyZWN0aXZlKTogdm9pZCB7XG4gICAgICAgIGlmICh0aGlzLnRpbWVwaWNrZXJJbnB1dCkge1xuICAgICAgICAgICAgdGhyb3cgRXJyb3IoJ0EgVGltZXBpY2tlciBjYW4gb25seSBiZSBhc3NvY2lhdGVkIHdpdGggYSBzaW5nbGUgaW5wdXQuJyk7XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy50aW1lcGlja2VySW5wdXQgPSBpbnB1dDtcbiAgICB9XG5cbiAgICBvcGVuKCk6IHZvaWQge1xuICAgICAgICB0aGlzLmRvbVNlcnZpY2UuYXBwZW5kVGltZXBpY2tlclRvQm9keShOZ3hNYXRlcmlhbFRpbWVwaWNrZXJDb250YWluZXJDb21wb25lbnQsIHtcbiAgICAgICAgICAgIHRpbWVwaWNrZXJCYXNlUmVmOiB0aGlzLFxuICAgICAgICAgICAgdGltZTogdGhpcy50aW1lLFxuICAgICAgICAgICAgZGVmYXVsdFRpbWU6IHRoaXMuZGVmYXVsdFRpbWUsXG4gICAgICAgICAgICBtYXhUaW1lOiB0aGlzLm1heFRpbWUsXG4gICAgICAgICAgICBtaW5UaW1lOiB0aGlzLm1pblRpbWUsXG4gICAgICAgICAgICBmb3JtYXQ6IHRoaXMuZm9ybWF0LFxuICAgICAgICAgICAgbWludXRlc0dhcDogdGhpcy5taW51dGVzR2FwLFxuICAgICAgICAgICAgZGlzYWJsZUFuaW1hdGlvbjogdGhpcy5kaXNhYmxlQW5pbWF0aW9uLFxuICAgICAgICAgICAgY2FuY2VsQnRuVG1wbDogdGhpcy5jYW5jZWxCdG5UbXBsLFxuICAgICAgICAgICAgY29uZmlybUJ0blRtcGw6IHRoaXMuY29uZmlybUJ0blRtcGwsXG4gICAgICAgICAgICBlZGl0YWJsZUhpbnRUbXBsOiB0aGlzLmVkaXRhYmxlSGludFRtcGwsXG4gICAgICAgICAgICBkaXNhYmxlZDogdGhpcy5kaXNhYmxlZCxcbiAgICAgICAgICAgIGVuYWJsZUtleWJvYXJkSW5wdXQ6IHRoaXMuZW5hYmxlS2V5Ym9hcmRJbnB1dCxcbiAgICAgICAgICAgIHByZXZlbnRPdmVybGF5Q2xpY2s6IHRoaXMucHJldmVudE92ZXJsYXlDbGljayxcbiAgICAgICAgICAgIGFwcGVuZFRvSW5wdXQ6IHRoaXMuYXBwZW5kVG9JbnB1dCxcbiAgICAgICAgICAgIGhvdXJzT25seTogdGhpcy5ob3Vyc09ubHksXG4gICAgICAgICAgICB0aGVtZTogdGhpcy50aGVtZSB8fCB0aGlzLl9uZ3hNYXRlcmlhbFRpbWVwaWNrZXJUaGVtZSxcbiAgICAgICAgICAgIHRpbWVwaWNrZXJDbGFzczogdGhpcy50aW1lcGlja2VyQ2xhc3MsXG4gICAgICAgICAgICBpbnB1dEVsZW1lbnQ6IHRoaXMuaW5wdXRFbGVtZW50LFxuICAgICAgICAgICAgaG9zdENsYXNzOiB0aGlzLmhvc3RDbGFzc1xuICAgICAgICB9KTtcbiAgICAgICAgdGhpcy5vcGVuZWQubmV4dCgpO1xuICAgICAgICB0aGlzLnN1YnNjcmliZVRvRXZlbnRzKCk7XG4gICAgfVxuXG4gICAgY2xvc2UoKTogdm9pZCB7XG4gICAgICAgIHRoaXMuZG9tU2VydmljZS5kZXN0cm95VGltZXBpY2tlcigpO1xuICAgICAgICB0aGlzLmNsb3NlZC5uZXh0KHRoaXMudGltZSk7XG4gICAgICAgIHRoaXMudW5zdWJzY3JpYmVGcm9tRXZlbnRzKCk7XG4gICAgfVxuXG4gICAgdXBkYXRlVGltZSh0aW1lOiBzdHJpbmcpOiB2b2lkIHtcbiAgICAgICAgdGhpcy50aW1lVXBkYXRlZC5uZXh0KHRpbWUpO1xuICAgIH1cblxuICAgIHByaXZhdGUgc3Vic2NyaWJlVG9FdmVudHMoKTogdm9pZCB7XG4gICAgICAgIG1lcmdlKHRoaXMuZXZlbnRTZXJ2aWNlLmJhY2tkcm9wQ2xpY2ssXG4gICAgICAgICAgICB0aGlzLmV2ZW50U2VydmljZS5rZXlkb3duRXZlbnQucGlwZShmaWx0ZXIoZSA9PiBlLmtleUNvZGUgPT09IEVTQ0FQRSAmJiB0aGlzLmlzRXNjKSkpXG4gICAgICAgICAgICAucGlwZSh0YWtlVW50aWwodGhpcy51bnN1YnNjcmliZSkpXG4gICAgICAgICAgICAuc3Vic2NyaWJlKCgpID0+IHRoaXMuY2xvc2UoKSk7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSB1bnN1YnNjcmliZUZyb21FdmVudHMoKTogdm9pZCB7XG4gICAgICAgIHRoaXMudW5zdWJzY3JpYmUubmV4dCgpO1xuICAgICAgICB0aGlzLnVuc3Vic2NyaWJlLmNvbXBsZXRlKCk7XG4gICAgfVxufVxuIl19