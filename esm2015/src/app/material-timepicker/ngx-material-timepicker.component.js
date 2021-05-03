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
        this.closed.next();
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibmd4LW1hdGVyaWFsLXRpbWVwaWNrZXIuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6Im5nOi8vbmd4LW1hdGVyaWFsLXRpbWVwaWNrZXIvIiwic291cmNlcyI6WyJzcmMvYXBwL21hdGVyaWFsLXRpbWVwaWNrZXIvbmd4LW1hdGVyaWFsLXRpbWVwaWNrZXIuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxPQUFPLEVBQUUsU0FBUyxFQUFFLFlBQVksRUFBRSxLQUFLLEVBQUUsTUFBTSxFQUFlLE1BQU0sZUFBZSxDQUFDO0FBQ3BGLE9BQU8sRUFBRSxLQUFLLEVBQUUsT0FBTyxFQUFFLE1BQU0sTUFBTSxDQUFDO0FBQ3RDLE9BQU8sRUFBRSxpQ0FBaUMsRUFBRSxNQUFNLGtEQUFrRCxDQUFDO0FBQ3JHLE9BQU8sRUFBRSxNQUFNLEVBQUUsU0FBUyxFQUFFLE1BQU0sZ0JBQWdCLENBQUM7QUFHbkQsT0FBTyxFQUFFLFVBQVUsRUFBRSxNQUFNLHdCQUF3QixDQUFDO0FBQ3BELE9BQU8sRUFDSCx1Q0FBdUMsRUFDMUMsTUFBTSw0RkFBNEYsQ0FBQztBQUlwRyxNQUFNLE1BQU0sR0FBRyxFQUFFLENBQUM7QUFTbEIsSUFBYSw4QkFBOEIsR0FBM0MsTUFBYSw4QkFBOEI7SUE2RHZDLFlBQW9CLFlBQStDLEVBQy9DLFVBQXNCO1FBRHRCLGlCQUFZLEdBQVosWUFBWSxDQUFtQztRQUMvQyxlQUFVLEdBQVYsVUFBVSxDQUFZO1FBNUQxQyxnQkFBVyxHQUFHLElBQUksT0FBTyxFQUFVLENBQUM7UUFDM0IsY0FBUyxHQUFHLEVBQUUsQ0FBQztRQUlWLFVBQUssR0FBRyxJQUFJLENBQUM7UUFLbEIsY0FBUyxHQUFHLEtBQUssQ0FBQztRQXFDakIsWUFBTyxHQUFHLElBQUksWUFBWSxFQUFVLENBQUM7UUFDckMsV0FBTSxHQUFHLElBQUksWUFBWSxFQUFRLENBQUM7UUFDbEMsV0FBTSxHQUFHLElBQUksWUFBWSxFQUFRLENBQUM7UUFDbEMsaUJB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QUFFLHlCQUF5QjtRQUNuQyxRQUFRLEVBQUUsRUFBRTtRQUNaLElBQUksRUFBRTtZQUNGLE9BQU8sRUFBRSxXQUFXO1NBQ3ZCO0tBQ0osQ0FBQztHQUNXLDhCQUE4QixDQWdKMUM7U0FoSlksOEJBQThCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ29tcG9uZW50LCBFdmVudEVtaXR0ZXIsIElucHV0LCBPdXRwdXQsIFRlbXBsYXRlUmVmIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBtZXJnZSwgU3ViamVjdCB9IGZyb20gJ3J4anMnO1xuaW1wb3J0IHsgTmd4TWF0ZXJpYWxUaW1lcGlja2VyRXZlbnRTZXJ2aWNlIH0gZnJvbSAnLi9zZXJ2aWNlcy9uZ3gtbWF0ZXJpYWwtdGltZXBpY2tlci1ldmVudC5zZXJ2aWNlJztcbmltcG9ydCB7IGZpbHRlciwgdGFrZVVudGlsIH0gZnJvbSAncnhqcy9vcGVyYXRvcnMnO1xuaW1wb3J0IHsgVGltZXBpY2tlckRpcmVjdGl2ZSB9IGZyb20gJy4vZGlyZWN0aXZlcy9uZ3gtdGltZXBpY2tlci5kaXJlY3RpdmUnO1xuaW1wb3J0IHsgRGF0ZVRpbWUgfSBmcm9tICdsdXhvbic7XG5pbXBvcnQgeyBEb21TZXJ2aWNlIH0gZnJvbSAnLi9zZXJ2aWNlcy9kb20uc2VydmljZSc7XG5pbXBvcnQge1xuICAgIE5neE1hdGVyaWFsVGltZXBpY2tlckNvbnRhaW5lckNvbXBvbmVudFxufSBmcm9tICcuL2NvbXBvbmVudHMvbmd4LW1hdGVyaWFsLXRpbWVwaWNrZXItY29udGFpbmVyL25neC1tYXRlcmlhbC10aW1lcGlja2VyLWNvbnRhaW5lci5jb21wb25lbnQnO1xuaW1wb3J0IHsgVGltZXBpY2tlclJlZiB9IGZyb20gJy4vbW9kZWxzL3RpbWVwaWNrZXItcmVmLmludGVyZmFjZSc7XG5pbXBvcnQgeyBOZ3hNYXRlcmlhbFRpbWVwaWNrZXJUaGVtZSB9IGZyb20gJy4vbW9kZWxzL25neC1tYXRlcmlhbC10aW1lcGlja2VyLXRoZW1lLmludGVyZmFjZSc7XG5cbmNvbnN0IEVTQ0FQRSA9IDI3O1xuXG5AQ29tcG9uZW50KHtcbiAgICBzZWxlY3RvcjogJ25neC1tYXRlcmlhbC10aW1lcGlja2VyJyxcbiAgICB0ZW1wbGF0ZTogJycsXG4gICAgaG9zdDoge1xuICAgICAgICAnY2xhc3MnOiAnaG9zdENsYXNzJ1xuICAgIH1cbn0pXG5leHBvcnQgY2xhc3MgTmd4TWF0ZXJpYWxUaW1lcGlja2VyQ29tcG9uZW50IGltcGxlbWVudHMgVGltZXBpY2tlclJlZiB7XG5cbiAgICB0aW1lVXBkYXRlZCA9IG5ldyBTdWJqZWN0PHN0cmluZz4oKTtcbiAgICBASW5wdXQoKSBob3N0Q2xhc3MgPSAnJztcbiAgICBASW5wdXQoKSBjYW5jZWxCdG5UbXBsOiBUZW1wbGF0ZVJlZjxOb2RlPjtcbiAgICBASW5wdXQoKSBlZGl0YWJsZUhpbnRUbXBsOiBUZW1wbGF0ZVJlZjxOb2RlPjtcbiAgICBASW5wdXQoKSBjb25maXJtQnRuVG1wbDogVGVtcGxhdGVSZWY8Tm9kZT47XG4gICAgQElucHV0KCdFU0MnKSBpc0VzYyA9IHRydWU7XG4gICAgQElucHV0KCkgZW5hYmxlS2V5Ym9hcmRJbnB1dDogYm9vbGVhbjtcbiAgICBASW5wdXQoKSBwcmV2ZW50T3ZlcmxheUNsaWNrOiBib29sZWFuO1xuICAgIEBJbnB1dCgpIGRpc2FibGVBbmltYXRpb246IGJvb2xlYW47XG4gICAgQElucHV0KCkgYXBwZW5kVG9JbnB1dDogYm9vbGVhbjtcbiAgICBASW5wdXQoKSBob3Vyc09ubHkgPSBmYWxzZTtcbiAgICBASW5wdXQoKSBkZWZhdWx0VGltZTogc3RyaW5nO1xuICAgIEBJbnB1dCgpIHRpbWVwaWNrZXJDbGFzczogc3RyaW5nO1xuICAgIEBJbnB1dCgpIHRoZW1lOiBOZ3hNYXRlcmlhbFRpbWVwaWNrZXJUaGVtZTtcbiAgICBASW5wdXQoKSBtaW46IERhdGVUaW1lO1xuICAgIEBJbnB1dCgpIG1heDogRGF0ZVRpbWU7XG4gICAgLyoqXG4gICAgICogQGRlcHJlY2F0ZWQgU2luY2UgdmVyc2lvbiA1LjEuMS4gV2lsbCBiZSBkZWxldGVkIG9uIHZlcnNpb24gNi4wLjAuIFVzZSBASW5wdXQoKSB0aGVtZSBpbnN0ZWFkXG4gICAgICovXG4gICAgQElucHV0KClcbiAgICBzZXQgbmd4TWF0ZXJpYWxUaW1lcGlja2VyVGhlbWUodGhlbWU6IE5neE1hdGVyaWFsVGltZXBpY2tlclRoZW1lKSB7XG4gICAgICAgIGNvbnNvbGUud2FybihgJ25neE1hdGVyaWFsVGltZXBpY2tlclRoZW1lJyBpcyBkZXByZWNhdGVkLiBVc2UgJ3RoZW1lJyBpbnN0ZWFkYCk7XG4gICAgICAgIHRoaXMuX25neE1hdGVyaWFsVGltZXBpY2tlclRoZW1lID0gdGhlbWU7XG4gICAgfVxuXG4gICAgQElucHV0KClcbiAgICBzZXQgZm9ybWF0KHZhbHVlOiBudW1iZXIpIHtcbiAgICAgICAgdGhpcy5fZm9ybWF0ID0gdmFsdWUgPT09IDI0ID8gMjQgOiAxMjtcbiAgICB9XG5cbiAgICBnZXQgZm9ybWF0KCk6IG51bWJlciB7XG4gICAgICAgIHJldHVybiB0aGlzLnRpbWVwaWNrZXJJbnB1dCA/IHRoaXMudGltZXBpY2tlcklucHV0LmZvcm1hdCA6IHRoaXMuX2Zvcm1hdDtcbiAgICB9XG5cbiAgICBASW5wdXQoKVxuICAgIHNldCBtaW51dGVzR2FwKGdhcDogbnVtYmVyKSB7XG4gICAgICAgIGlmIChnYXAgPT0gbnVsbCkge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIGdhcCA9IE1hdGguZmxvb3IoZ2FwKTtcbiAgICAgICAgdGhpcy5fbWludXRlc0dhcCA9IGdhcCA8PSA1OSA/IGdhcCA6IDE7XG4gICAgfVxuXG4gICAgZ2V0IG1pbnV0ZXNHYXAoKTogbnVtYmVyIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX21pbnV0ZXNHYXA7XG4gICAgfVxuXG4gICAgQE91dHB1dCgpIHRpbWVTZXQgPSBuZXcgRXZlbnRFbWl0dGVyPHN0cmluZz4oKTtcbiAgICBAT3V0cHV0KCkgb3BlbmVkID0gbmV3IEV2ZW50RW1pdHRlcjxudWxsPigpO1xuICAgIEBPdXRwdXQoKSBjbG9zZWQgPSBuZXcgRXZlbnRFbWl0dGVyPG51bGw+KCk7XG4gICAgQE91dHB1dCgpIGhvdXJTZWxlY3RlZCA9IG5ldyBFdmVudEVtaXR0ZXI8bnVtYmVyPigpO1xuICAgIEBPdXRwdXQoKSB0aW1lQ2hhbmdlZCA9IG5ldyBFdmVudEVtaXR0ZXI8c3RyaW5nPigpO1xuXG4gICAgcHJpdmF0ZSBfbWludXRlc0dhcDogbnVtYmVyO1xuICAgIHByaXZhdGUgX2Zvcm1hdDogbnVtYmVyO1xuICAgIHByaXZhdGUgX25neE1hdGVyaWFsVGltZXBpY2tlclRoZW1lOiBOZ3hNYXRlcmlhbFRpbWVwaWNrZXJUaGVtZTtcbiAgICBwcml2YXRlIHRpbWVwaWNrZXJJbnB1dDogVGltZXBpY2tlckRpcmVjdGl2ZTtcbiAgICBwcml2YXRlIHVuc3Vic2NyaWJlID0gbmV3IFN1YmplY3QoKTtcblxuICAgIGNvbnN0cnVjdG9yKHByaXZhdGUgZXZlbnRTZXJ2aWNlOiBOZ3hNYXRlcmlhbFRpbWVwaWNrZXJFdmVudFNlcnZpY2UsXG4gICAgICAgICAgICAgICAgcHJpdmF0ZSBkb21TZXJ2aWNlOiBEb21TZXJ2aWNlKSB7XG4gICAgfVxuXG4gICAgZ2V0IG1pblRpbWUoKTogRGF0ZVRpbWUge1xuICAgICAgICByZXR1cm4gdGhpcy50aW1lcGlja2VySW5wdXQgPyAodGhpcy50aW1lcGlja2VySW5wdXQubWluIGFzIERhdGVUaW1lKSA6IHRoaXMubWluO1xuICAgIH1cblxuICAgIGdldCBtYXhUaW1lKCk6IERhdGVUaW1lIHtcbiAgICAgICAgcmV0dXJuIHRoaXMudGltZXBpY2tlcklucHV0ID8gKHRoaXMudGltZXBpY2tlcklucHV0Lm1heCBhcyBEYXRlVGltZSkgOiB0aGlzLm1heDtcbiAgICB9XG5cbiAgICBnZXQgZGlzYWJsZWQoKTogYm9vbGVhbiB7XG4gICAgICAgIHJldHVybiB0aGlzLnRpbWVwaWNrZXJJbnB1dCAmJiB0aGlzLnRpbWVwaWNrZXJJbnB1dC5kaXNhYmxlZDtcbiAgICB9XG5cbiAgICBnZXQgdGltZSgpOiBzdHJpbmcge1xuICAgICAgICByZXR1cm4gdGhpcy50aW1lcGlja2VySW5wdXQgJiYgdGhpcy50aW1lcGlja2VySW5wdXQudmFsdWU7XG4gICAgfVxuXG4gICAgZ2V0IGlucHV0RWxlbWVudCgpOiBhbnkge1xuICAgICAgICByZXR1cm4gdGhpcy50aW1lcGlja2VySW5wdXQgJiYgdGhpcy50aW1lcGlja2VySW5wdXQuZWxlbWVudDtcbiAgICB9XG5cbiAgICAvKioqXG4gICAgICogUmVnaXN0ZXIgYW4gaW5wdXQgd2l0aCB0aGlzIHRpbWVwaWNrZXIuXG4gICAgICogaW5wdXQgLSBUaGUgdGltZXBpY2tlciBpbnB1dCB0byByZWdpc3RlciB3aXRoIHRoaXMgdGltZXBpY2tlclxuICAgICAqL1xuICAgIHJlZ2lzdGVySW5wdXQoaW5wdXQ6IFRpbWVwaWNrZXJEaXJlY3RpdmUpOiB2b2lkIHtcbiAgICAgICAgaWYgKHRoaXMudGltZXBpY2tlcklucHV0KSB7XG4gICAgICAgICAgICB0aHJvdyBFcnJvcignQSBUaW1lcGlja2VyIGNhbiBvbmx5IGJlIGFzc29jaWF0ZWQgd2l0aCBhIHNpbmdsZSBpbnB1dC4nKTtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLnRpbWVwaWNrZXJJbnB1dCA9IGlucHV0O1xuICAgIH1cblxuICAgIG9wZW4oKTogdm9pZCB7XG4gICAgICAgIHRoaXMuZG9tU2VydmljZS5hcHBlbmRUaW1lcGlja2VyVG9Cb2R5KE5neE1hdGVyaWFsVGltZXBpY2tlckNvbnRhaW5lckNvbXBvbmVudCwge1xuICAgICAgICAgICAgdGltZXBpY2tlckJhc2VSZWY6IHRoaXMsXG4gICAgICAgICAgICB0aW1lOiB0aGlzLnRpbWUsXG4gICAgICAgICAgICBkZWZhdWx0VGltZTogdGhpcy5kZWZhdWx0VGltZSxcbiAgICAgICAgICAgIG1heFRpbWU6IHRoaXMubWF4VGltZSxcbiAgICAgICAgICAgIG1pblRpbWU6IHRoaXMubWluVGltZSxcbiAgICAgICAgICAgIGZvcm1hdDogdGhpcy5mb3JtYXQsXG4gICAgICAgICAgICBtaW51dGVzR2FwOiB0aGlzLm1pbnV0ZXNHYXAsXG4gICAgICAgICAgICBkaXNhYmxlQW5pbWF0aW9uOiB0aGlzLmRpc2FibGVBbmltYXRpb24sXG4gICAgICAgICAgICBjYW5jZWxCdG5UbXBsOiB0aGlzLmNhbmNlbEJ0blRtcGwsXG4gICAgICAgICAgICBjb25maXJtQnRuVG1wbDogdGhpcy5jb25maXJtQnRuVG1wbCxcbiAgICAgICAgICAgIGVkaXRhYmxlSGludFRtcGw6IHRoaXMuZWRpdGFibGVIaW50VG1wbCxcbiAgICAgICAgICAgIGRpc2FibGVkOiB0aGlzLmRpc2FibGVkLFxuICAgICAgICAgICAgZW5hYmxlS2V5Ym9hcmRJbnB1dDogdGhpcy5lbmFibGVLZXlib2FyZElucHV0LFxuICAgICAgICAgICAgcHJldmVudE92ZXJsYXlDbGljazogdGhpcy5wcmV2ZW50T3ZlcmxheUNsaWNrLFxuICAgICAgICAgICAgYXBwZW5kVG9JbnB1dDogdGhpcy5hcHBlbmRUb0lucHV0LFxuICAgICAgICAgICAgaG91cnNPbmx5OiB0aGlzLmhvdXJzT25seSxcbiAgICAgICAgICAgIHRoZW1lOiB0aGlzLnRoZW1lIHx8IHRoaXMuX25neE1hdGVyaWFsVGltZXBpY2tlclRoZW1lLFxuICAgICAgICAgICAgdGltZXBpY2tlckNsYXNzOiB0aGlzLnRpbWVwaWNrZXJDbGFzcyxcbiAgICAgICAgICAgIGlucHV0RWxlbWVudDogdGhpcy5pbnB1dEVsZW1lbnQsXG4gICAgICAgICAgICBob3N0Q2xhc3M6IHRoaXMuaG9zdENsYXNzXG4gICAgICAgIH0pO1xuICAgICAgICB0aGlzLm9wZW5lZC5uZXh0KCk7XG4gICAgICAgIHRoaXMuc3Vic2NyaWJlVG9FdmVudHMoKTtcbiAgICB9XG5cbiAgICBjbG9zZSgpOiB2b2lkIHtcbiAgICAgICAgdGhpcy5kb21TZXJ2aWNlLmRlc3Ryb3lUaW1lcGlja2VyKCk7XG4gICAgICAgIHRoaXMuY2xvc2VkLm5leHQoKTtcbiAgICAgICAgdGhpcy51bnN1YnNjcmliZUZyb21FdmVudHMoKTtcbiAgICB9XG5cbiAgICB1cGRhdGVUaW1lKHRpbWU6IHN0cmluZyk6IHZvaWQge1xuICAgICAgICB0aGlzLnRpbWVVcGRhdGVkLm5leHQodGltZSk7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBzdWJzY3JpYmVUb0V2ZW50cygpOiB2b2lkIHtcbiAgICAgICAgbWVyZ2UodGhpcy5ldmVudFNlcnZpY2UuYmFja2Ryb3BDbGljayxcbiAgICAgICAgICAgIHRoaXMuZXZlbnRTZXJ2aWNlLmtleWRvd25FdmVudC5waXBlKGZpbHRlcihlID0+IGUua2V5Q29kZSA9PT0gRVNDQVBFICYmIHRoaXMuaXNFc2MpKSlcbiAgICAgICAgICAgIC5waXBlKHRha2VVbnRpbCh0aGlzLnVuc3Vic2NyaWJlKSlcbiAgICAgICAgICAgIC5zdWJzY3JpYmUoKCkgPT4gdGhpcy5jbG9zZSgpKTtcbiAgICB9XG5cbiAgICBwcml2YXRlIHVuc3Vic2NyaWJlRnJvbUV2ZW50cygpOiB2b2lkIHtcbiAgICAgICAgdGhpcy51bnN1YnNjcmliZS5uZXh0KCk7XG4gICAgICAgIHRoaXMudW5zdWJzY3JpYmUuY29tcGxldGUoKTtcbiAgICB9XG59XG4iXX0=