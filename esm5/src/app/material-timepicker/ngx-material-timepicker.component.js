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
            class: this.hostClass
        });
        this.opened.next();
        this.subscribeToEvents();
    };
    NgxMaterialTimepickerComponent.prototype.close = function () {
        this.domService.destroyTimepicker();
        this.closed.next();
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibmd4LW1hdGVyaWFsLXRpbWVwaWNrZXIuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6Im5nOi8vbmd4LW1hdGVyaWFsLXRpbWVwaWNrZXIvIiwic291cmNlcyI6WyJzcmMvYXBwL21hdGVyaWFsLXRpbWVwaWNrZXIvbmd4LW1hdGVyaWFsLXRpbWVwaWNrZXIuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxPQUFPLEVBQUUsU0FBUyxFQUFFLFlBQVksRUFBRSxLQUFLLEVBQUUsTUFBTSxFQUFlLE1BQU0sZUFBZSxDQUFDO0FBQ3BGLE9BQU8sRUFBRSxLQUFLLEVBQUUsT0FBTyxFQUFFLE1BQU0sTUFBTSxDQUFDO0FBQ3RDLE9BQU8sRUFBRSxpQ0FBaUMsRUFBRSxNQUFNLGtEQUFrRCxDQUFDO0FBQ3JHLE9BQU8sRUFBRSxNQUFNLEVBQUUsU0FBUyxFQUFFLE1BQU0sZ0JBQWdCLENBQUM7QUFHbkQsT0FBTyxFQUFFLFVBQVUsRUFBRSxNQUFNLHdCQUF3QixDQUFDO0FBQ3BELE9BQU8sRUFDSCx1Q0FBdUMsRUFDMUMsTUFBTSw0RkFBNEYsQ0FBQztBQUlwRyxJQUFNLE1BQU0sR0FBRyxFQUFFLENBQUM7QUFTbEI7SUE2REksd0NBQW9CLFlBQStDLEVBQy9DLFVBQXNCO1FBRHRCLGlCQUFZLEdBQVosWUFBWSxDQUFtQztRQUMvQyxlQUFVLEdBQVYsVUFBVSxDQUFZO1FBNUQxQyxnQkFBVyxHQUFHLElBQUksT0FBTyxFQUFVLENBQUM7UUFDM0IsY0FBUyxHQUFHLEVBQUUsQ0FBQztRQUlWLFVBQUssR0FBRyxJQUFJLENBQUM7UUFLbEIsY0FBUyxHQUFHLEtBQUssQ0FBQztRQXFDakIsWUFBTyxHQUFHLElBQUksWUFBWSxFQUFVLENBQUM7UUFDckMsV0FBTSxHQUFHLElBQUksWUFBWSxFQUFRLENBQUM7UUFDbEMsV0FBTSxHQUFHLElBQUksWUFBWSxFQUFRLENBQUM7UUFDbEMsaUJBQVksR0FBRyxJQUFJLFlBQVksRUFBVSxDQUFDO1FB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UUFBVCxNQUFNLEVBQUU7a0VBQW1DO0lBQ2xDO1FBQVQsTUFBTSxFQUFFO3dFQUEyQztJQUMxQztRQUFULE1BQU0sRUFBRTt1RUFBMEM7SUFyRDFDLDhCQUE4QjtRQVAxQyxTQUFTLENBQUM7WUFDUCxRQUFRLEVBQUUseUJBQXlCO1lBQ25DLFFBQVEsRUFBRSxFQUFFO1lBQ1osSUFBSSxFQUFFO2dCQUNGLE9BQU8sRUFBRSxXQUFXO2FBQ3ZCO1NBQ0osQ0FBQztPQUNXLDhCQUE4QixDQWdKMUM7SUFBRCxxQ0FBQztDQUFBLEFBaEpELElBZ0pDO1NBaEpZLDhCQUE4QiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENvbXBvbmVudCwgRXZlbnRFbWl0dGVyLCBJbnB1dCwgT3V0cHV0LCBUZW1wbGF0ZVJlZiB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgbWVyZ2UsIFN1YmplY3QgfSBmcm9tICdyeGpzJztcbmltcG9ydCB7IE5neE1hdGVyaWFsVGltZXBpY2tlckV2ZW50U2VydmljZSB9IGZyb20gJy4vc2VydmljZXMvbmd4LW1hdGVyaWFsLXRpbWVwaWNrZXItZXZlbnQuc2VydmljZSc7XG5pbXBvcnQgeyBmaWx0ZXIsIHRha2VVbnRpbCB9IGZyb20gJ3J4anMvb3BlcmF0b3JzJztcbmltcG9ydCB7IFRpbWVwaWNrZXJEaXJlY3RpdmUgfSBmcm9tICcuL2RpcmVjdGl2ZXMvbmd4LXRpbWVwaWNrZXIuZGlyZWN0aXZlJztcbmltcG9ydCB7IERhdGVUaW1lIH0gZnJvbSAnbHV4b24nO1xuaW1wb3J0IHsgRG9tU2VydmljZSB9IGZyb20gJy4vc2VydmljZXMvZG9tLnNlcnZpY2UnO1xuaW1wb3J0IHtcbiAgICBOZ3hNYXRlcmlhbFRpbWVwaWNrZXJDb250YWluZXJDb21wb25lbnRcbn0gZnJvbSAnLi9jb21wb25lbnRzL25neC1tYXRlcmlhbC10aW1lcGlja2VyLWNvbnRhaW5lci9uZ3gtbWF0ZXJpYWwtdGltZXBpY2tlci1jb250YWluZXIuY29tcG9uZW50JztcbmltcG9ydCB7IFRpbWVwaWNrZXJSZWYgfSBmcm9tICcuL21vZGVscy90aW1lcGlja2VyLXJlZi5pbnRlcmZhY2UnO1xuaW1wb3J0IHsgTmd4TWF0ZXJpYWxUaW1lcGlja2VyVGhlbWUgfSBmcm9tICcuL21vZGVscy9uZ3gtbWF0ZXJpYWwtdGltZXBpY2tlci10aGVtZS5pbnRlcmZhY2UnO1xuXG5jb25zdCBFU0NBUEUgPSAyNztcblxuQENvbXBvbmVudCh7XG4gICAgc2VsZWN0b3I6ICduZ3gtbWF0ZXJpYWwtdGltZXBpY2tlcicsXG4gICAgdGVtcGxhdGU6ICcnLFxuICAgIGhvc3Q6IHtcbiAgICAgICAgJ2NsYXNzJzogJ2hvc3RDbGFzcydcbiAgICB9XG59KVxuZXhwb3J0IGNsYXNzIE5neE1hdGVyaWFsVGltZXBpY2tlckNvbXBvbmVudCBpbXBsZW1lbnRzIFRpbWVwaWNrZXJSZWYge1xuXG4gICAgdGltZVVwZGF0ZWQgPSBuZXcgU3ViamVjdDxzdHJpbmc+KCk7XG4gICAgQElucHV0KCkgaG9zdENsYXNzID0gJyc7XG4gICAgQElucHV0KCkgY2FuY2VsQnRuVG1wbDogVGVtcGxhdGVSZWY8Tm9kZT47XG4gICAgQElucHV0KCkgZWRpdGFibGVIaW50VG1wbDogVGVtcGxhdGVSZWY8Tm9kZT47XG4gICAgQElucHV0KCkgY29uZmlybUJ0blRtcGw6IFRlbXBsYXRlUmVmPE5vZGU+O1xuICAgIEBJbnB1dCgnRVNDJykgaXNFc2MgPSB0cnVlO1xuICAgIEBJbnB1dCgpIGVuYWJsZUtleWJvYXJkSW5wdXQ6IGJvb2xlYW47XG4gICAgQElucHV0KCkgcHJldmVudE92ZXJsYXlDbGljazogYm9vbGVhbjtcbiAgICBASW5wdXQoKSBkaXNhYmxlQW5pbWF0aW9uOiBib29sZWFuO1xuICAgIEBJbnB1dCgpIGFwcGVuZFRvSW5wdXQ6IGJvb2xlYW47XG4gICAgQElucHV0KCkgaG91cnNPbmx5ID0gZmFsc2U7XG4gICAgQElucHV0KCkgZGVmYXVsdFRpbWU6IHN0cmluZztcbiAgICBASW5wdXQoKSB0aW1lcGlja2VyQ2xhc3M6IHN0cmluZztcbiAgICBASW5wdXQoKSB0aGVtZTogTmd4TWF0ZXJpYWxUaW1lcGlja2VyVGhlbWU7XG4gICAgQElucHV0KCkgbWluOiBEYXRlVGltZTtcbiAgICBASW5wdXQoKSBtYXg6IERhdGVUaW1lO1xuICAgIC8qKlxuICAgICAqIEBkZXByZWNhdGVkIFNpbmNlIHZlcnNpb24gNS4xLjEuIFdpbGwgYmUgZGVsZXRlZCBvbiB2ZXJzaW9uIDYuMC4wLiBVc2UgQElucHV0KCkgdGhlbWUgaW5zdGVhZFxuICAgICAqL1xuICAgIEBJbnB1dCgpXG4gICAgc2V0IG5neE1hdGVyaWFsVGltZXBpY2tlclRoZW1lKHRoZW1lOiBOZ3hNYXRlcmlhbFRpbWVwaWNrZXJUaGVtZSkge1xuICAgICAgICBjb25zb2xlLndhcm4oYCduZ3hNYXRlcmlhbFRpbWVwaWNrZXJUaGVtZScgaXMgZGVwcmVjYXRlZC4gVXNlICd0aGVtZScgaW5zdGVhZGApO1xuICAgICAgICB0aGlzLl9uZ3hNYXRlcmlhbFRpbWVwaWNrZXJUaGVtZSA9IHRoZW1lO1xuICAgIH1cblxuICAgIEBJbnB1dCgpXG4gICAgc2V0IGZvcm1hdCh2YWx1ZTogbnVtYmVyKSB7XG4gICAgICAgIHRoaXMuX2Zvcm1hdCA9IHZhbHVlID09PSAyNCA/IDI0IDogMTI7XG4gICAgfVxuXG4gICAgZ2V0IGZvcm1hdCgpOiBudW1iZXIge1xuICAgICAgICByZXR1cm4gdGhpcy50aW1lcGlja2VySW5wdXQgPyB0aGlzLnRpbWVwaWNrZXJJbnB1dC5mb3JtYXQgOiB0aGlzLl9mb3JtYXQ7XG4gICAgfVxuXG4gICAgQElucHV0KClcbiAgICBzZXQgbWludXRlc0dhcChnYXA6IG51bWJlcikge1xuICAgICAgICBpZiAoZ2FwID09IG51bGwpIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICBnYXAgPSBNYXRoLmZsb29yKGdhcCk7XG4gICAgICAgIHRoaXMuX21pbnV0ZXNHYXAgPSBnYXAgPD0gNTkgPyBnYXAgOiAxO1xuICAgIH1cblxuICAgIGdldCBtaW51dGVzR2FwKCk6IG51bWJlciB7XG4gICAgICAgIHJldHVybiB0aGlzLl9taW51dGVzR2FwO1xuICAgIH1cblxuICAgIEBPdXRwdXQoKSB0aW1lU2V0ID0gbmV3IEV2ZW50RW1pdHRlcjxzdHJpbmc+KCk7XG4gICAgQE91dHB1dCgpIG9wZW5lZCA9IG5ldyBFdmVudEVtaXR0ZXI8bnVsbD4oKTtcbiAgICBAT3V0cHV0KCkgY2xvc2VkID0gbmV3IEV2ZW50RW1pdHRlcjxudWxsPigpO1xuICAgIEBPdXRwdXQoKSBob3VyU2VsZWN0ZWQgPSBuZXcgRXZlbnRFbWl0dGVyPG51bWJlcj4oKTtcbiAgICBAT3V0cHV0KCkgdGltZUNoYW5nZWQgPSBuZXcgRXZlbnRFbWl0dGVyPHN0cmluZz4oKTtcblxuICAgIHByaXZhdGUgX21pbnV0ZXNHYXA6IG51bWJlcjtcbiAgICBwcml2YXRlIF9mb3JtYXQ6IG51bWJlcjtcbiAgICBwcml2YXRlIF9uZ3hNYXRlcmlhbFRpbWVwaWNrZXJUaGVtZTogTmd4TWF0ZXJpYWxUaW1lcGlja2VyVGhlbWU7XG4gICAgcHJpdmF0ZSB0aW1lcGlja2VySW5wdXQ6IFRpbWVwaWNrZXJEaXJlY3RpdmU7XG4gICAgcHJpdmF0ZSB1bnN1YnNjcmliZSA9IG5ldyBTdWJqZWN0KCk7XG5cbiAgICBjb25zdHJ1Y3Rvcihwcml2YXRlIGV2ZW50U2VydmljZTogTmd4TWF0ZXJpYWxUaW1lcGlja2VyRXZlbnRTZXJ2aWNlLFxuICAgICAgICAgICAgICAgIHByaXZhdGUgZG9tU2VydmljZTogRG9tU2VydmljZSkge1xuICAgIH1cblxuICAgIGdldCBtaW5UaW1lKCk6IERhdGVUaW1lIHtcbiAgICAgICAgcmV0dXJuIHRoaXMudGltZXBpY2tlcklucHV0ID8gKHRoaXMudGltZXBpY2tlcklucHV0Lm1pbiBhcyBEYXRlVGltZSkgOiB0aGlzLm1pbjtcbiAgICB9XG5cbiAgICBnZXQgbWF4VGltZSgpOiBEYXRlVGltZSB7XG4gICAgICAgIHJldHVybiB0aGlzLnRpbWVwaWNrZXJJbnB1dCA/ICh0aGlzLnRpbWVwaWNrZXJJbnB1dC5tYXggYXMgRGF0ZVRpbWUpIDogdGhpcy5tYXg7XG4gICAgfVxuXG4gICAgZ2V0IGRpc2FibGVkKCk6IGJvb2xlYW4ge1xuICAgICAgICByZXR1cm4gdGhpcy50aW1lcGlja2VySW5wdXQgJiYgdGhpcy50aW1lcGlja2VySW5wdXQuZGlzYWJsZWQ7XG4gICAgfVxuXG4gICAgZ2V0IHRpbWUoKTogc3RyaW5nIHtcbiAgICAgICAgcmV0dXJuIHRoaXMudGltZXBpY2tlcklucHV0ICYmIHRoaXMudGltZXBpY2tlcklucHV0LnZhbHVlO1xuICAgIH1cblxuICAgIGdldCBpbnB1dEVsZW1lbnQoKTogYW55IHtcbiAgICAgICAgcmV0dXJuIHRoaXMudGltZXBpY2tlcklucHV0ICYmIHRoaXMudGltZXBpY2tlcklucHV0LmVsZW1lbnQ7XG4gICAgfVxuXG4gICAgLyoqKlxuICAgICAqIFJlZ2lzdGVyIGFuIGlucHV0IHdpdGggdGhpcyB0aW1lcGlja2VyLlxuICAgICAqIGlucHV0IC0gVGhlIHRpbWVwaWNrZXIgaW5wdXQgdG8gcmVnaXN0ZXIgd2l0aCB0aGlzIHRpbWVwaWNrZXJcbiAgICAgKi9cbiAgICByZWdpc3RlcklucHV0KGlucHV0OiBUaW1lcGlja2VyRGlyZWN0aXZlKTogdm9pZCB7XG4gICAgICAgIGlmICh0aGlzLnRpbWVwaWNrZXJJbnB1dCkge1xuICAgICAgICAgICAgdGhyb3cgRXJyb3IoJ0EgVGltZXBpY2tlciBjYW4gb25seSBiZSBhc3NvY2lhdGVkIHdpdGggYSBzaW5nbGUgaW5wdXQuJyk7XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy50aW1lcGlja2VySW5wdXQgPSBpbnB1dDtcbiAgICB9XG5cbiAgICBvcGVuKCk6IHZvaWQge1xuICAgICAgICB0aGlzLmRvbVNlcnZpY2UuYXBwZW5kVGltZXBpY2tlclRvQm9keShOZ3hNYXRlcmlhbFRpbWVwaWNrZXJDb250YWluZXJDb21wb25lbnQsIHtcbiAgICAgICAgICAgIHRpbWVwaWNrZXJCYXNlUmVmOiB0aGlzLFxuICAgICAgICAgICAgdGltZTogdGhpcy50aW1lLFxuICAgICAgICAgICAgZGVmYXVsdFRpbWU6IHRoaXMuZGVmYXVsdFRpbWUsXG4gICAgICAgICAgICBtYXhUaW1lOiB0aGlzLm1heFRpbWUsXG4gICAgICAgICAgICBtaW5UaW1lOiB0aGlzLm1pblRpbWUsXG4gICAgICAgICAgICBmb3JtYXQ6IHRoaXMuZm9ybWF0LFxuICAgICAgICAgICAgbWludXRlc0dhcDogdGhpcy5taW51dGVzR2FwLFxuICAgICAgICAgICAgZGlzYWJsZUFuaW1hdGlvbjogdGhpcy5kaXNhYmxlQW5pbWF0aW9uLFxuICAgICAgICAgICAgY2FuY2VsQnRuVG1wbDogdGhpcy5jYW5jZWxCdG5UbXBsLFxuICAgICAgICAgICAgY29uZmlybUJ0blRtcGw6IHRoaXMuY29uZmlybUJ0blRtcGwsXG4gICAgICAgICAgICBlZGl0YWJsZUhpbnRUbXBsOiB0aGlzLmVkaXRhYmxlSGludFRtcGwsXG4gICAgICAgICAgICBkaXNhYmxlZDogdGhpcy5kaXNhYmxlZCxcbiAgICAgICAgICAgIGVuYWJsZUtleWJvYXJkSW5wdXQ6IHRoaXMuZW5hYmxlS2V5Ym9hcmRJbnB1dCxcbiAgICAgICAgICAgIHByZXZlbnRPdmVybGF5Q2xpY2s6IHRoaXMucHJldmVudE92ZXJsYXlDbGljayxcbiAgICAgICAgICAgIGFwcGVuZFRvSW5wdXQ6IHRoaXMuYXBwZW5kVG9JbnB1dCxcbiAgICAgICAgICAgIGhvdXJzT25seTogdGhpcy5ob3Vyc09ubHksXG4gICAgICAgICAgICB0aGVtZTogdGhpcy50aGVtZSB8fCB0aGlzLl9uZ3hNYXRlcmlhbFRpbWVwaWNrZXJUaGVtZSxcbiAgICAgICAgICAgIHRpbWVwaWNrZXJDbGFzczogdGhpcy50aW1lcGlja2VyQ2xhc3MsXG4gICAgICAgICAgICBpbnB1dEVsZW1lbnQ6IHRoaXMuaW5wdXRFbGVtZW50LFxuICAgICAgICAgICAgY2xhc3M6IHRoaXMuaG9zdENsYXNzXG4gICAgICAgIH0pO1xuICAgICAgICB0aGlzLm9wZW5lZC5uZXh0KCk7XG4gICAgICAgIHRoaXMuc3Vic2NyaWJlVG9FdmVudHMoKTtcbiAgICB9XG5cbiAgICBjbG9zZSgpOiB2b2lkIHtcbiAgICAgICAgdGhpcy5kb21TZXJ2aWNlLmRlc3Ryb3lUaW1lcGlja2VyKCk7XG4gICAgICAgIHRoaXMuY2xvc2VkLm5leHQoKTtcbiAgICAgICAgdGhpcy51bnN1YnNjcmliZUZyb21FdmVudHMoKTtcbiAgICB9XG5cbiAgICB1cGRhdGVUaW1lKHRpbWU6IHN0cmluZyk6IHZvaWQge1xuICAgICAgICB0aGlzLnRpbWVVcGRhdGVkLm5leHQodGltZSk7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBzdWJzY3JpYmVUb0V2ZW50cygpOiB2b2lkIHtcbiAgICAgICAgbWVyZ2UodGhpcy5ldmVudFNlcnZpY2UuYmFja2Ryb3BDbGljayxcbiAgICAgICAgICAgIHRoaXMuZXZlbnRTZXJ2aWNlLmtleWRvd25FdmVudC5waXBlKGZpbHRlcihlID0+IGUua2V5Q29kZSA9PT0gRVNDQVBFICYmIHRoaXMuaXNFc2MpKSlcbiAgICAgICAgICAgIC5waXBlKHRha2VVbnRpbCh0aGlzLnVuc3Vic2NyaWJlKSlcbiAgICAgICAgICAgIC5zdWJzY3JpYmUoKCkgPT4gdGhpcy5jbG9zZSgpKTtcbiAgICB9XG5cbiAgICBwcml2YXRlIHVuc3Vic2NyaWJlRnJvbUV2ZW50cygpOiB2b2lkIHtcbiAgICAgICAgdGhpcy51bnN1YnNjcmliZS5uZXh0KCk7XG4gICAgICAgIHRoaXMudW5zdWJzY3JpYmUuY29tcGxldGUoKTtcbiAgICB9XG59XG4iXX0=