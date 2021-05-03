import * as tslib_1 from "tslib";
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { merge, Subject } from 'rxjs';
import { NgxMaterialTimepickerEventService } from './services/ngx-material-timepicker-event.service';
import { filter, takeUntil } from 'rxjs/operators';
import { DomService } from './services/dom.service';
import { NgxMaterialTimepickerContainerComponent } from './components/ngx-material-timepicker-container/ngx-material-timepicker-container.component';
var ESCAPE = 27;
var NgxMaterialTimepickerComponent = /** @class */ (function () {
    function NgxMaterialTimepickerComponent(eventService, domService) {
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
    Object.defineProperty(NgxMaterialTimepickerComponent.prototype, "ngxMaterialTimepickerTheme", {
        /**
         * @deprecated Since version 5.1.1. Will be deleted on version 6.0.0. Use @Input() theme instead
         */
        set: function (theme) {
            console.warn("'ngxMaterialTimepickerTheme' is deprecated. Use 'theme' instead");
            this._ngxMaterialTimepickerTheme = theme;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(NgxMaterialTimepickerComponent.prototype, "format", {
        get: function () {
            return this.timepickerInput ? this.timepickerInput.format : this._format;
        },
        set: function (value) {
            this._format = value === 24 ? 24 : 12;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(NgxMaterialTimepickerComponent.prototype, "minutesGap", {
        get: function () {
            return this._minutesGap;
        },
        set: function (gap) {
            if (gap == null) {
                return;
            }
            gap = Math.floor(gap);
            this._minutesGap = gap <= 59 ? gap : 1;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(NgxMaterialTimepickerComponent.prototype, "minTime", {
        get: function () {
            return this.timepickerInput ? this.timepickerInput.min : this.min;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(NgxMaterialTimepickerComponent.prototype, "maxTime", {
        get: function () {
            return this.timepickerInput ? this.timepickerInput.max : this.max;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(NgxMaterialTimepickerComponent.prototype, "disabled", {
        get: function () {
            return this.timepickerInput && this.timepickerInput.disabled;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(NgxMaterialTimepickerComponent.prototype, "time", {
        get: function () {
            return this.timepickerInput && this.timepickerInput.value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(NgxMaterialTimepickerComponent.prototype, "inputElement", {
        get: function () {
            return this.timepickerInput && this.timepickerInput.element;
        },
        enumerable: true,
        configurable: true
    });
    /***
     * Register an input with this timepicker.
     * input - The timepicker input to register with this timepicker
     */
    NgxMaterialTimepickerComponent.prototype.registerInput = function (input) {
        if (this.timepickerInput) {
            throw Error('A Timepicker can only be associated with a single input.');
        }
        this.timepickerInput = input;
    };
    NgxMaterialTimepickerComponent.prototype.open = function () {
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
    };
    NgxMaterialTimepickerComponent.prototype.close = function () {
        this.domService.destroyTimepicker();
        this.closed.next(this.time);
        this.unsubscribeFromEvents();
    };
    NgxMaterialTimepickerComponent.prototype.updateTime = function (time) {
        this.timeUpdated.next(time);
    };
    NgxMaterialTimepickerComponent.prototype.subscribeToEvents = function () {
        var _this = this;
        merge(this.eventService.backdropClick, this.eventService.keydownEvent.pipe(filter(function (e) { return e.keyCode === ESCAPE && _this.isEsc; })))
            .pipe(takeUntil(this.unsubscribe))
            .subscribe(function () { return _this.close(); });
    };
    NgxMaterialTimepickerComponent.prototype.unsubscribeFromEvents = function () {
        this.unsubscribe.next();
        this.unsubscribe.complete();
    };
    NgxMaterialTimepickerComponent.ctorParameters = function () { return [
        { type: NgxMaterialTimepickerEventService },
        { type: DomService }
    ]; };
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
    return NgxMaterialTimepickerComponent;
}());
export { NgxMaterialTimepickerComponent };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibmd4LW1hdGVyaWFsLXRpbWVwaWNrZXIuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6Im5nOi8vbmd4LW1hdGVyaWFsLXRpbWVwaWNrZXIvIiwic291cmNlcyI6WyJzcmMvYXBwL21hdGVyaWFsLXRpbWVwaWNrZXIvbmd4LW1hdGVyaWFsLXRpbWVwaWNrZXIuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxPQUFPLEVBQUUsU0FBUyxFQUFFLFlBQVksRUFBRSxLQUFLLEVBQUUsTUFBTSxFQUFlLE1BQU0sZUFBZSxDQUFDO0FBQ3BGLE9BQU8sRUFBRSxLQUFLLEVBQUUsT0FBTyxFQUFFLE1BQU0sTUFBTSxDQUFDO0FBQ3RDLE9BQU8sRUFBRSxpQ0FBaUMsRUFBRSxNQUFNLGtEQUFrRCxDQUFDO0FBQ3JHLE9BQU8sRUFBRSxNQUFNLEVBQUUsU0FBUyxFQUFFLE1BQU0sZ0JBQWdCLENBQUM7QUFHbkQsT0FBTyxFQUFFLFVBQVUsRUFBRSxNQUFNLHdCQUF3QixDQUFDO0FBQ3BELE9BQU8sRUFDSCx1Q0FBdUMsRUFDMUMsTUFBTSw0RkFBNEYsQ0FBQztBQUlwRyxJQUFNLE1BQU0sR0FBRyxFQUFFLENBQUM7QUFTbEI7SUE2REksd0NBQW9CLFlBQStDLEVBQy9DLFVBQXNCO1FBRHRCLGlCQUFZLEdBQVosWUFBWSxDQUFtQztRQUMvQyxlQUFVLEdBQVYsVUFBVSxDQUFZO1FBNUQxQyxnQkFBVyxHQUFHLElBQUksT0FBTyxFQUFVLENBQUM7UUFDM0IsY0FBUyxHQUFHLEVBQUUsQ0FBQztRQUlWLFVBQUssR0FBRyxJQUFJLENBQUM7UUFLbEIsY0FBUyxHQUFHLEtBQUssQ0FBQztRQXFDakIsWUFBTyxHQUFHLElBQUksWUFBWSxFQUFVLENBQUM7UUFDckMsV0FBTSxHQUFHLElBQUksWUFBWSxFQUFFLENBQUM7UUFDNUIsV0FBTSxHQUFHLElBQUksWUFBWSxFQUFVLENBQUM7UUFDcEMsaUJBQVksR0FBRyxJQUFJLFlBQVksRUFBVSxDQUFDO1FB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TSxFQUFFO2tFQUE2QjtJQUM1QjtRQUFULE1BQU0sRUFBRTtrRUFBcUM7SUFDcEM7UUFBVCxNQUFNLEVBQUU7d0VBQTJDO0lBQzFDO1FBQVQsTUFBTSxFQUFFO3VFQUEwQztJQXJEMUMsOEJBQThCO1FBUDFDLFNBQVMsQ0FBQztZQUNQLFFBQVEsRUFBRSx5QkFBeUI7WUFDbkMsUUFBUSxFQUFFLEVBQUU7WUFDWixJQUFJLEVBQUU7Z0JBQ0YsT0FBTyxFQUFFLFdBQVc7YUFDdkI7U0FDSixDQUFDO09BQ1csOEJBQThCLENBZ0oxQztJQUFELHFDQUFDO0NBQUEsQUFoSkQsSUFnSkM7U0FoSlksOEJBQThCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ29tcG9uZW50LCBFdmVudEVtaXR0ZXIsIElucHV0LCBPdXRwdXQsIFRlbXBsYXRlUmVmIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBtZXJnZSwgU3ViamVjdCB9IGZyb20gJ3J4anMnO1xuaW1wb3J0IHsgTmd4TWF0ZXJpYWxUaW1lcGlja2VyRXZlbnRTZXJ2aWNlIH0gZnJvbSAnLi9zZXJ2aWNlcy9uZ3gtbWF0ZXJpYWwtdGltZXBpY2tlci1ldmVudC5zZXJ2aWNlJztcbmltcG9ydCB7IGZpbHRlciwgdGFrZVVudGlsIH0gZnJvbSAncnhqcy9vcGVyYXRvcnMnO1xuaW1wb3J0IHsgVGltZXBpY2tlckRpcmVjdGl2ZSB9IGZyb20gJy4vZGlyZWN0aXZlcy9uZ3gtdGltZXBpY2tlci5kaXJlY3RpdmUnO1xuaW1wb3J0IHsgRGF0ZVRpbWUgfSBmcm9tICdsdXhvbic7XG5pbXBvcnQgeyBEb21TZXJ2aWNlIH0gZnJvbSAnLi9zZXJ2aWNlcy9kb20uc2VydmljZSc7XG5pbXBvcnQge1xuICAgIE5neE1hdGVyaWFsVGltZXBpY2tlckNvbnRhaW5lckNvbXBvbmVudFxufSBmcm9tICcuL2NvbXBvbmVudHMvbmd4LW1hdGVyaWFsLXRpbWVwaWNrZXItY29udGFpbmVyL25neC1tYXRlcmlhbC10aW1lcGlja2VyLWNvbnRhaW5lci5jb21wb25lbnQnO1xuaW1wb3J0IHsgVGltZXBpY2tlclJlZiB9IGZyb20gJy4vbW9kZWxzL3RpbWVwaWNrZXItcmVmLmludGVyZmFjZSc7XG5pbXBvcnQgeyBOZ3hNYXRlcmlhbFRpbWVwaWNrZXJUaGVtZSB9IGZyb20gJy4vbW9kZWxzL25neC1tYXRlcmlhbC10aW1lcGlja2VyLXRoZW1lLmludGVyZmFjZSc7XG5cbmNvbnN0IEVTQ0FQRSA9IDI3O1xuXG5AQ29tcG9uZW50KHtcbiAgICBzZWxlY3RvcjogJ25neC1tYXRlcmlhbC10aW1lcGlja2VyJyxcbiAgICB0ZW1wbGF0ZTogJycsXG4gICAgaG9zdDoge1xuICAgICAgICAnY2xhc3MnOiAnaG9zdENsYXNzJ1xuICAgIH1cbn0pXG5leHBvcnQgY2xhc3MgTmd4TWF0ZXJpYWxUaW1lcGlja2VyQ29tcG9uZW50IGltcGxlbWVudHMgVGltZXBpY2tlclJlZiB7XG5cbiAgICB0aW1lVXBkYXRlZCA9IG5ldyBTdWJqZWN0PHN0cmluZz4oKTtcbiAgICBASW5wdXQoKSBob3N0Q2xhc3MgPSAnJztcbiAgICBASW5wdXQoKSBjYW5jZWxCdG5UbXBsOiBUZW1wbGF0ZVJlZjxOb2RlPjtcbiAgICBASW5wdXQoKSBlZGl0YWJsZUhpbnRUbXBsOiBUZW1wbGF0ZVJlZjxOb2RlPjtcbiAgICBASW5wdXQoKSBjb25maXJtQnRuVG1wbDogVGVtcGxhdGVSZWY8Tm9kZT47XG4gICAgQElucHV0KCdFU0MnKSBpc0VzYyA9IHRydWU7XG4gICAgQElucHV0KCkgZW5hYmxlS2V5Ym9hcmRJbnB1dDogYm9vbGVhbjtcbiAgICBASW5wdXQoKSBwcmV2ZW50T3ZlcmxheUNsaWNrOiBib29sZWFuO1xuICAgIEBJbnB1dCgpIGRpc2FibGVBbmltYXRpb246IGJvb2xlYW47XG4gICAgQElucHV0KCkgYXBwZW5kVG9JbnB1dDogYm9vbGVhbjtcbiAgICBASW5wdXQoKSBob3Vyc09ubHkgPSBmYWxzZTtcbiAgICBASW5wdXQoKSBkZWZhdWx0VGltZTogc3RyaW5nO1xuICAgIEBJbnB1dCgpIHRpbWVwaWNrZXJDbGFzczogc3RyaW5nO1xuICAgIEBJbnB1dCgpIHRoZW1lOiBOZ3hNYXRlcmlhbFRpbWVwaWNrZXJUaGVtZTtcbiAgICBASW5wdXQoKSBtaW46IERhdGVUaW1lO1xuICAgIEBJbnB1dCgpIG1heDogRGF0ZVRpbWU7XG4gICAgLyoqXG4gICAgICogQGRlcHJlY2F0ZWQgU2luY2UgdmVyc2lvbiA1LjEuMS4gV2lsbCBiZSBkZWxldGVkIG9uIHZlcnNpb24gNi4wLjAuIFVzZSBASW5wdXQoKSB0aGVtZSBpbnN0ZWFkXG4gICAgICovXG4gICAgQElucHV0KClcbiAgICBzZXQgbmd4TWF0ZXJpYWxUaW1lcGlja2VyVGhlbWUodGhlbWU6IE5neE1hdGVyaWFsVGltZXBpY2tlclRoZW1lKSB7XG4gICAgICAgIGNvbnNvbGUud2FybihgJ25neE1hdGVyaWFsVGltZXBpY2tlclRoZW1lJyBpcyBkZXByZWNhdGVkLiBVc2UgJ3RoZW1lJyBpbnN0ZWFkYCk7XG4gICAgICAgIHRoaXMuX25neE1hdGVyaWFsVGltZXBpY2tlclRoZW1lID0gdGhlbWU7XG4gICAgfVxuXG4gICAgQElucHV0KClcbiAgICBzZXQgZm9ybWF0KHZhbHVlOiBudW1iZXIpIHtcbiAgICAgICAgdGhpcy5fZm9ybWF0ID0gdmFsdWUgPT09IDI0ID8gMjQgOiAxMjtcbiAgICB9XG5cbiAgICBnZXQgZm9ybWF0KCk6IG51bWJlciB7XG4gICAgICAgIHJldHVybiB0aGlzLnRpbWVwaWNrZXJJbnB1dCA/IHRoaXMudGltZXBpY2tlcklucHV0LmZvcm1hdCA6IHRoaXMuX2Zvcm1hdDtcbiAgICB9XG5cbiAgICBASW5wdXQoKVxuICAgIHNldCBtaW51dGVzR2FwKGdhcDogbnVtYmVyKSB7XG4gICAgICAgIGlmIChnYXAgPT0gbnVsbCkge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIGdhcCA9IE1hdGguZmxvb3IoZ2FwKTtcbiAgICAgICAgdGhpcy5fbWludXRlc0dhcCA9IGdhcCA8PSA1OSA/IGdhcCA6IDE7XG4gICAgfVxuXG4gICAgZ2V0IG1pbnV0ZXNHYXAoKTogbnVtYmVyIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX21pbnV0ZXNHYXA7XG4gICAgfVxuXG4gICAgQE91dHB1dCgpIHRpbWVTZXQgPSBuZXcgRXZlbnRFbWl0dGVyPHN0cmluZz4oKTtcbiAgICBAT3V0cHV0KCkgb3BlbmVkID0gbmV3IEV2ZW50RW1pdHRlcigpO1xuICAgIEBPdXRwdXQoKSBjbG9zZWQgPSBuZXcgRXZlbnRFbWl0dGVyPHN0cmluZz4oKTtcbiAgICBAT3V0cHV0KCkgaG91clNlbGVjdGVkID0gbmV3IEV2ZW50RW1pdHRlcjxudW1iZXI+KCk7XG4gICAgQE91dHB1dCgpIHRpbWVDaGFuZ2VkID0gbmV3IEV2ZW50RW1pdHRlcjxzdHJpbmc+KCk7XG5cbiAgICBwcml2YXRlIF9taW51dGVzR2FwOiBudW1iZXI7XG4gICAgcHJpdmF0ZSBfZm9ybWF0OiBudW1iZXI7XG4gICAgcHJpdmF0ZSBfbmd4TWF0ZXJpYWxUaW1lcGlja2VyVGhlbWU6IE5neE1hdGVyaWFsVGltZXBpY2tlclRoZW1lO1xuICAgIHByaXZhdGUgdGltZXBpY2tlcklucHV0OiBUaW1lcGlja2VyRGlyZWN0aXZlO1xuICAgIHByaXZhdGUgdW5zdWJzY3JpYmUgPSBuZXcgU3ViamVjdCgpO1xuXG4gICAgY29uc3RydWN0b3IocHJpdmF0ZSBldmVudFNlcnZpY2U6IE5neE1hdGVyaWFsVGltZXBpY2tlckV2ZW50U2VydmljZSxcbiAgICAgICAgICAgICAgICBwcml2YXRlIGRvbVNlcnZpY2U6IERvbVNlcnZpY2UpIHtcbiAgICB9XG5cbiAgICBnZXQgbWluVGltZSgpOiBEYXRlVGltZSB7XG4gICAgICAgIHJldHVybiB0aGlzLnRpbWVwaWNrZXJJbnB1dCA/ICh0aGlzLnRpbWVwaWNrZXJJbnB1dC5taW4gYXMgRGF0ZVRpbWUpIDogdGhpcy5taW47XG4gICAgfVxuXG4gICAgZ2V0IG1heFRpbWUoKTogRGF0ZVRpbWUge1xuICAgICAgICByZXR1cm4gdGhpcy50aW1lcGlja2VySW5wdXQgPyAodGhpcy50aW1lcGlja2VySW5wdXQubWF4IGFzIERhdGVUaW1lKSA6IHRoaXMubWF4O1xuICAgIH1cblxuICAgIGdldCBkaXNhYmxlZCgpOiBib29sZWFuIHtcbiAgICAgICAgcmV0dXJuIHRoaXMudGltZXBpY2tlcklucHV0ICYmIHRoaXMudGltZXBpY2tlcklucHV0LmRpc2FibGVkO1xuICAgIH1cblxuICAgIGdldCB0aW1lKCk6IHN0cmluZyB7XG4gICAgICAgIHJldHVybiB0aGlzLnRpbWVwaWNrZXJJbnB1dCAmJiB0aGlzLnRpbWVwaWNrZXJJbnB1dC52YWx1ZTtcbiAgICB9XG5cbiAgICBnZXQgaW5wdXRFbGVtZW50KCk6IGFueSB7XG4gICAgICAgIHJldHVybiB0aGlzLnRpbWVwaWNrZXJJbnB1dCAmJiB0aGlzLnRpbWVwaWNrZXJJbnB1dC5lbGVtZW50O1xuICAgIH1cblxuICAgIC8qKipcbiAgICAgKiBSZWdpc3RlciBhbiBpbnB1dCB3aXRoIHRoaXMgdGltZXBpY2tlci5cbiAgICAgKiBpbnB1dCAtIFRoZSB0aW1lcGlja2VyIGlucHV0IHRvIHJlZ2lzdGVyIHdpdGggdGhpcyB0aW1lcGlja2VyXG4gICAgICovXG4gICAgcmVnaXN0ZXJJbnB1dChpbnB1dDogVGltZXBpY2tlckRpcmVjdGl2ZSk6IHZvaWQge1xuICAgICAgICBpZiAodGhpcy50aW1lcGlja2VySW5wdXQpIHtcbiAgICAgICAgICAgIHRocm93IEVycm9yKCdBIFRpbWVwaWNrZXIgY2FuIG9ubHkgYmUgYXNzb2NpYXRlZCB3aXRoIGEgc2luZ2xlIGlucHV0LicpO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMudGltZXBpY2tlcklucHV0ID0gaW5wdXQ7XG4gICAgfVxuXG4gICAgb3BlbigpOiB2b2lkIHtcbiAgICAgICAgdGhpcy5kb21TZXJ2aWNlLmFwcGVuZFRpbWVwaWNrZXJUb0JvZHkoTmd4TWF0ZXJpYWxUaW1lcGlja2VyQ29udGFpbmVyQ29tcG9uZW50LCB7XG4gICAgICAgICAgICB0aW1lcGlja2VyQmFzZVJlZjogdGhpcyxcbiAgICAgICAgICAgIHRpbWU6IHRoaXMudGltZSxcbiAgICAgICAgICAgIGRlZmF1bHRUaW1lOiB0aGlzLmRlZmF1bHRUaW1lLFxuICAgICAgICAgICAgbWF4VGltZTogdGhpcy5tYXhUaW1lLFxuICAgICAgICAgICAgbWluVGltZTogdGhpcy5taW5UaW1lLFxuICAgICAgICAgICAgZm9ybWF0OiB0aGlzLmZvcm1hdCxcbiAgICAgICAgICAgIG1pbnV0ZXNHYXA6IHRoaXMubWludXRlc0dhcCxcbiAgICAgICAgICAgIGRpc2FibGVBbmltYXRpb246IHRoaXMuZGlzYWJsZUFuaW1hdGlvbixcbiAgICAgICAgICAgIGNhbmNlbEJ0blRtcGw6IHRoaXMuY2FuY2VsQnRuVG1wbCxcbiAgICAgICAgICAgIGNvbmZpcm1CdG5UbXBsOiB0aGlzLmNvbmZpcm1CdG5UbXBsLFxuICAgICAgICAgICAgZWRpdGFibGVIaW50VG1wbDogdGhpcy5lZGl0YWJsZUhpbnRUbXBsLFxuICAgICAgICAgICAgZGlzYWJsZWQ6IHRoaXMuZGlzYWJsZWQsXG4gICAgICAgICAgICBlbmFibGVLZXlib2FyZElucHV0OiB0aGlzLmVuYWJsZUtleWJvYXJkSW5wdXQsXG4gICAgICAgICAgICBwcmV2ZW50T3ZlcmxheUNsaWNrOiB0aGlzLnByZXZlbnRPdmVybGF5Q2xpY2ssXG4gICAgICAgICAgICBhcHBlbmRUb0lucHV0OiB0aGlzLmFwcGVuZFRvSW5wdXQsXG4gICAgICAgICAgICBob3Vyc09ubHk6IHRoaXMuaG91cnNPbmx5LFxuICAgICAgICAgICAgdGhlbWU6IHRoaXMudGhlbWUgfHwgdGhpcy5fbmd4TWF0ZXJpYWxUaW1lcGlja2VyVGhlbWUsXG4gICAgICAgICAgICB0aW1lcGlja2VyQ2xhc3M6IHRoaXMudGltZXBpY2tlckNsYXNzLFxuICAgICAgICAgICAgaW5wdXRFbGVtZW50OiB0aGlzLmlucHV0RWxlbWVudCxcbiAgICAgICAgICAgIGhvc3RDbGFzczogdGhpcy5ob3N0Q2xhc3NcbiAgICAgICAgfSk7XG4gICAgICAgIHRoaXMub3BlbmVkLm5leHQoKTtcbiAgICAgICAgdGhpcy5zdWJzY3JpYmVUb0V2ZW50cygpO1xuICAgIH1cblxuICAgIGNsb3NlKCk6IHZvaWQge1xuICAgICAgICB0aGlzLmRvbVNlcnZpY2UuZGVzdHJveVRpbWVwaWNrZXIoKTtcbiAgICAgICAgdGhpcy5jbG9zZWQubmV4dCh0aGlzLnRpbWUpO1xuICAgICAgICB0aGlzLnVuc3Vic2NyaWJlRnJvbUV2ZW50cygpO1xuICAgIH1cblxuICAgIHVwZGF0ZVRpbWUodGltZTogc3RyaW5nKTogdm9pZCB7XG4gICAgICAgIHRoaXMudGltZVVwZGF0ZWQubmV4dCh0aW1lKTtcbiAgICB9XG5cbiAgICBwcml2YXRlIHN1YnNjcmliZVRvRXZlbnRzKCk6IHZvaWQge1xuICAgICAgICBtZXJnZSh0aGlzLmV2ZW50U2VydmljZS5iYWNrZHJvcENsaWNrLFxuICAgICAgICAgICAgdGhpcy5ldmVudFNlcnZpY2Uua2V5ZG93bkV2ZW50LnBpcGUoZmlsdGVyKGUgPT4gZS5rZXlDb2RlID09PSBFU0NBUEUgJiYgdGhpcy5pc0VzYykpKVxuICAgICAgICAgICAgLnBpcGUodGFrZVVudGlsKHRoaXMudW5zdWJzY3JpYmUpKVxuICAgICAgICAgICAgLnN1YnNjcmliZSgoKSA9PiB0aGlzLmNsb3NlKCkpO1xuICAgIH1cblxuICAgIHByaXZhdGUgdW5zdWJzY3JpYmVGcm9tRXZlbnRzKCk6IHZvaWQge1xuICAgICAgICB0aGlzLnVuc3Vic2NyaWJlLm5leHQoKTtcbiAgICAgICAgdGhpcy51bnN1YnNjcmliZS5jb21wbGV0ZSgpO1xuICAgIH1cbn1cbiJdfQ==