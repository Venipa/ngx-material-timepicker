import * as tslib_1 from "tslib";
var NgxTimepickerFieldComponent_1;
import { ChangeDetectionStrategy, Component, EventEmitter, Inject, Input, Output } from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import { NgxMaterialTimepickerService } from '../../services/ngx-material-timepicker.service';
import { Subject } from 'rxjs';
import { TimePeriod } from '../../models/time-period.enum';
import { TimeUnit } from '../../models/time-unit.enum';
import { TimeAdapter } from '../../services/time-adapter';
import { TIME_LOCALE } from '../../tokens/time-locale.token';
import { TimepickerTimeUtils } from '../../utils/timepicker-time.utils';
import { distinctUntilChanged, map, takeUntil, tap } from 'rxjs/operators';
let NgxTimepickerFieldComponent = NgxTimepickerFieldComponent_1 = class NgxTimepickerFieldComponent {
    constructor(timepickerService, locale) {
        this.timepickerService = timepickerService;
        this.locale = locale;
        this.minHour = 1;
        this.maxHour = 12;
        this.timeUnit = TimeUnit;
        this.buttonAlign = 'right';
        this.timeChanged = new EventEmitter();
        this._format = 12;
        this.unsubscribe$ = new Subject();
        this.isFirstTimeChange = true;
        this.onChange = () => {
        };
    }
    set format(value) {
        this._format = value === 24 ? 24 : 12;
        this.minHour = this._format === 12 ? 1 : 0;
        this.maxHour = this._format === 12 ? 12 : 23;
        this.hoursList = TimepickerTimeUtils.getHours(this._format);
        const isDynamicallyChanged = value && (this.previousFormat && this.previousFormat !== this._format);
        if (isDynamicallyChanged) {
            this.updateTime(this.timepickerTime);
        }
        this.previousFormat = this._format;
    }
    get format() {
        return this._format;
    }
    set min(value) {
        if (typeof value === 'string') {
            this._min = TimeAdapter.parseTime(value, { locale: this.locale, format: this.format });
            return;
        }
        this._min = value;
    }
    get min() {
        return this._min;
    }
    set max(value) {
        if (typeof value === 'string') {
            this._max = TimeAdapter.parseTime(value, { locale: this.locale, format: this.format });
            return;
        }
        this._max = value;
    }
    get max() {
        return this._max;
    }
    set defaultTime(val) {
        this._defaultTime = val;
        this.isDefaultTime = !!val;
    }
    get defaultTime() {
        return this._defaultTime;
    }
    ngOnInit() {
        this.initTime(this.defaultTime);
        this.hoursList = TimepickerTimeUtils.getHours(this._format);
        this.minutesList = TimepickerTimeUtils.getMinutes();
        this.isTimeRangeSet = !!(this.min || this.max);
        this.hour$ = this.timepickerService.selectedHour.pipe(tap((clockTime) => this.selectedHour = clockTime.time), map(this.changeDefaultTimeValue.bind(this)), tap(() => this.isTimeRangeSet && this.updateAvailableMinutes()));
        this.minute$ = this.timepickerService.selectedMinute.pipe(map(this.changeDefaultTimeValue.bind(this)), tap(() => this.isFirstTimeChange = false));
        if (this.format === 12) {
            this.timepickerService.selectedPeriod.pipe(distinctUntilChanged(), tap((period) => this.period = period), tap(period => this.isChangePeriodDisabled = this.isPeriodDisabled(period)), takeUntil(this.unsubscribe$)).subscribe(() => this.isTimeRangeSet && this.updateAvailableTime());
        }
    }
    writeValue(val) {
        if (val) {
            this.initTime(val);
        }
        else {
            this.resetTime();
        }
    }
    registerOnTouched(fn) {
    }
    registerOnChange(fn) {
        this.onChange = fn;
    }
    setDisabledState(isDisabled) {
        this.disabled = isDisabled;
    }
    changeHour(hour) {
        this.timepickerService.hour = this.hoursList.find(h => h.time === hour);
        this.changeTime();
    }
    changeMinute(minute) {
        this.timepickerService.minute = this.minutesList.find(m => m.time === minute);
        this.changeTime();
    }
    changePeriod(period) {
        this.timepickerService.period = period;
        this.changeTime();
    }
    onTimeSet(time) {
        this.updateTime(time);
        this.emitLocalTimeChange(time);
    }
    ngOnDestroy() {
        this.unsubscribe$.next();
        this.unsubscribe$.complete();
    }
    changeTime() {
        const time = this.timepickerService.getFullTime(this.format);
        this.timepickerTime = time;
        this.emitLocalTimeChange(time);
    }
    resetTime() {
        this.timepickerService.hour = { angle: 0, time: null };
        this.timepickerService.minute = { angle: 0, time: null };
    }
    emitLocalTimeChange(time) {
        const localTime = TimeAdapter.toLocaleTimeString(time, { format: this.format, locale: this.locale });
        this.onChange(localTime);
        this.timeChanged.emit(localTime);
    }
    changeDefaultTimeValue(clockFaceTime) {
        if (!this.isDefaultTime && this.isFirstTimeChange) {
            return Object.assign({}, clockFaceTime, { time: null });
        }
        return clockFaceTime;
    }
    updateAvailableHours() {
        this.hoursList = TimepickerTimeUtils.disableHours(this.hoursList, {
            min: this.min,
            max: this.max,
            format: this.format,
            period: this.period
        });
    }
    updateAvailableMinutes() {
        this.minutesList = TimepickerTimeUtils.disableMinutes(this.minutesList, this.selectedHour, {
            min: this.min,
            max: this.max,
            format: this.format,
            period: this.period
        });
    }
    updateAvailableTime() {
        this.updateAvailableHours();
        if (this.selectedHour) {
            this.updateAvailableMinutes();
        }
    }
    updateTime(time) {
        if (time) {
            const formattedTime = TimeAdapter.formatTime(time, { locale: this.locale, format: this.format });
            this.timepickerService.setDefaultTimeIfAvailable(formattedTime, this.min, this.max, this.format);
            this.timepickerTime = formattedTime;
        }
    }
    initTime(time) {
        const isDefaultTimeAvailable = TimeAdapter
            .isTimeAvailable(time, this.min, this.max, 'minutes', null, this.format);
        if (!isDefaultTimeAvailable) {
            if (this.min) {
                this.updateTime(TimeAdapter.fromDateTimeToString(this.min, this.format));
                return;
            }
            if (this.max) {
                this.updateTime(TimeAdapter.fromDateTimeToString(this.max, this.format));
                return;
            }
        }
        this.updateTime(time);
    }
    isPeriodDisabled(period) {
        return TimepickerTimeUtils.disableHours(TimepickerTimeUtils.getHours(12), {
            min: this.min,
            max: this.max,
            format: 12,
            period: period === TimePeriod.AM ? TimePeriod.PM : TimePeriod.AM
        }).every(time => time.disabled);
    }
};
NgxTimepickerFieldComponent.ctorParameters = () => [
    { type: NgxMaterialTimepickerService },
    { type: String, decorators: [{ type: Inject, args: [TIME_LOCALE,] }] }
];
tslib_1.__decorate([
    Input()
], NgxTimepickerFieldComponent.prototype, "disabled", void 0);
tslib_1.__decorate([
    Input()
], NgxTimepickerFieldComponent.prototype, "toggleIcon", void 0);
tslib_1.__decorate([
    Input()
], NgxTimepickerFieldComponent.prototype, "buttonAlign", void 0);
tslib_1.__decorate([
    Input()
], NgxTimepickerFieldComponent.prototype, "clockTheme", void 0);
tslib_1.__decorate([
    Input()
], NgxTimepickerFieldComponent.prototype, "controlOnly", void 0);
tslib_1.__decorate([
    Input()
], NgxTimepickerFieldComponent.prototype, "cancelBtnTmpl", void 0);
tslib_1.__decorate([
    Input()
], NgxTimepickerFieldComponent.prototype, "confirmBtnTmpl", void 0);
tslib_1.__decorate([
    Input()
], NgxTimepickerFieldComponent.prototype, "format", null);
tslib_1.__decorate([
    Input()
], NgxTimepickerFieldComponent.prototype, "min", null);
tslib_1.__decorate([
    Input()
], NgxTimepickerFieldComponent.prototype, "max", null);
tslib_1.__decorate([
    Input()
], NgxTimepickerFieldComponent.prototype, "defaultTime", null);
tslib_1.__decorate([
    Output()
], NgxTimepickerFieldComponent.prototype, "timeChanged", void 0);
NgxTimepickerFieldComponent = NgxTimepickerFieldComponent_1 = tslib_1.__decorate([
    Component({
        selector: 'ngx-timepicker-field',
        template: "<div class=\"ngx-timepicker\" [ngClass]=\"{'ngx-timepicker--disabled': disabled}\">\n    <ngx-timepicker-time-control\n        class=\"ngx-timepicker__control--first\"\n        [placeholder]=\"'HH'\"\n        [time]=\"(hour$ | async)?.time\"\n        [min]=\"minHour\"\n        [max]=\"maxHour\"\n        [timeUnit]=\"timeUnit.HOUR\"\n        [disabled]=\"disabled\"\n        [timeList]=\"hoursList\"\n        [preventTyping]=\"isTimeRangeSet\"\n        (timeChanged)=\"changeHour($event)\"></ngx-timepicker-time-control>\n    <span class=\"ngx-timepicker__time-colon ngx-timepicker__control--second\">:</span>\n    <ngx-timepicker-time-control\n        class=\"ngx-timepicker__control--third\"\n        [placeholder]=\"'MM'\"\n        [time]=\"(minute$ | async)?.time\"\n        [min]=\"0\"\n        [max]=\"59\"\n        [timeUnit]=\"timeUnit.MINUTE\"\n        [disabled]=\"disabled\"\n        [timeList]=\"minutesList\"\n        [preventTyping]=\"isTimeRangeSet\"\n        (timeChanged)=\"changeMinute($event)\"></ngx-timepicker-time-control>\n    <ngx-timepicker-period-selector\n        class=\"ngx-timepicker__control--forth\"\n        [selectedPeriod]=\"period\"\n        [disabled]=\"disabled || isChangePeriodDisabled\"\n        (periodSelected)=\"changePeriod($event)\"\n        *ngIf=\"format !== 24\"></ngx-timepicker-period-selector>\n    <ngx-material-timepicker-toggle\n        class=\"ngx-timepicker__toggle\"\n        *ngIf=\"!controlOnly\"\n        [ngClass]=\"{'ngx-timepicker__toggle--left': buttonAlign === 'left'}\"\n        [for]=\"timepicker\"\n        [disabled]=\"disabled\">\n        <span ngxMaterialTimepickerToggleIcon>\n            <!--suppress HtmlUnknownAttribute -->\n            <ng-container *ngTemplateOutlet=\"toggleIcon || defaultIcon\"></ng-container>\n        </span>\n    </ngx-material-timepicker-toggle>\n</div>\n<ngx-material-timepicker\n    [min]=\"min\"\n    [max]=\"max\"\n    [theme]=\"clockTheme\"\n    [defaultTime]=\"timepickerTime\"\n    [format]=\"format\"\n    [cancelBtnTmpl]=\"cancelBtnTmpl\"\n    [confirmBtnTmpl]=\"confirmBtnTmpl\"\n    (timeSet)=\"onTimeSet($event)\" #timepicker></ngx-material-timepicker>\n\n<ng-template #defaultIcon>\n    <svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 24 24\" width=\"24px\" height=\"24px\">\n        <!--suppress CheckEmptyScriptTag -->\n        <path\n            d=\"M 12 2 C 6.4889971 2 2 6.4889971 2 12 C 2 17.511003                   6.4889971 22 12 22 C 17.511003 22 22 17.511003 22 12 C 22 6.4889971 17.511003 2 12 2 z M 12 4 C 16.430123 4 20 7.5698774 20 12 C 20 16.430123 16.430123 20 12 20 C 7.5698774 20 4 16.430123 4 12 C 4 7.5698774 7.5698774 4 12 4 z M 11 6 L 11 12.414062 L 15.292969 16.707031 L 16.707031 15.292969 L 13 11.585938 L 13 6 L 11 6 z\"/>\n    </svg>\n</ng-template>\n",
        providers: [
            NgxMaterialTimepickerService,
            {
                provide: NG_VALUE_ACCESSOR,
                useExisting: NgxTimepickerFieldComponent_1,
                multi: true
            }
        ],
        changeDetection: ChangeDetectionStrategy.OnPush,
        styles: [".ngx-timepicker{display:flex;align-items:center;height:100%;border-bottom:1px solid rgba(0,0,0,.12)}.ngx-timepicker--disabled{background:rgba(0,0,0,.07);pointer-events:none}.ngx-timepicker__time-colon{margin-left:10px}.ngx-timepicker__control--first{order:1}.ngx-timepicker__control--second{order:2}.ngx-timepicker__control--third{order:3}.ngx-timepicker__control--forth,.ngx-timepicker__toggle{order:4}.ngx-timepicker__toggle--left{order:0}"]
    }),
    tslib_1.__param(1, Inject(TIME_LOCALE))
], NgxTimepickerFieldComponent);
export { NgxTimepickerFieldComponent };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibmd4LXRpbWVwaWNrZXItZmllbGQuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6Im5nOi8vbmd4LW1hdGVyaWFsLXRpbWVwaWNrZXIvIiwic291cmNlcyI6WyJzcmMvYXBwL21hdGVyaWFsLXRpbWVwaWNrZXIvY29tcG9uZW50cy90aW1lcGlja2VyLWZpZWxkL25neC10aW1lcGlja2VyLWZpZWxkLmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBLE9BQU8sRUFBRSx1QkFBdUIsRUFBRSxTQUFTLEVBQUUsWUFBWSxFQUFFLE1BQU0sRUFBRSxLQUFLLEVBQXFCLE1BQU0sRUFBZSxNQUFNLGVBQWUsQ0FBQztBQUN4SSxPQUFPLEVBQXdCLGlCQUFpQixFQUFFLE1BQU0sZ0JBQWdCLENBQUM7QUFDekUsT0FBTyxFQUFFLDRCQUE0QixFQUFFLE1BQU0sZ0RBQWdELENBQUM7QUFDOUYsT0FBTyxFQUFjLE9BQU8sRUFBRSxNQUFNLE1BQU0sQ0FBQztBQUUzQyxPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0sK0JBQStCLENBQUM7QUFDM0QsT0FBTyxFQUFFLFFBQVEsRUFBRSxNQUFNLDZCQUE2QixDQUFDO0FBRXZELE9BQU8sRUFBRSxXQUFXLEVBQUUsTUFBTSw2QkFBNkIsQ0FBQztBQUMxRCxPQUFPLEVBQUUsV0FBVyxFQUFFLE1BQU0sZ0NBQWdDLENBQUM7QUFDN0QsT0FBTyxFQUFFLG1CQUFtQixFQUFFLE1BQU0sbUNBQW1DLENBQUM7QUFFeEUsT0FBTyxFQUFFLG9CQUFvQixFQUFFLEdBQUcsRUFBRSxTQUFTLEVBQUUsR0FBRyxFQUFFLE1BQU0sZ0JBQWdCLENBQUM7QUFnQjNFLElBQWEsMkJBQTJCLG1DQUF4QyxNQUFhLDJCQUEyQjtJQWlHcEMsWUFBb0IsaUJBQStDLEVBQzFCLE1BQWM7UUFEbkMsc0JBQWlCLEdBQWpCLGlCQUFpQixDQUE4QjtRQUMxQixXQUFNLEdBQU4sTUFBTSxDQUFRO1FBNUZ2RCxZQUFPLEdBQUcsQ0FBQyxDQUFD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InNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENoYW5nZURldGVjdGlvblN0cmF0ZWd5LCBDb21wb25lbnQsIEV2ZW50RW1pdHRlciwgSW5qZWN0LCBJbnB1dCwgT25EZXN0cm95LCBPbkluaXQsIE91dHB1dCwgVGVtcGxhdGVSZWYgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IENvbnRyb2xWYWx1ZUFjY2Vzc29yLCBOR19WQUxVRV9BQ0NFU1NPUiB9IGZyb20gJ0Bhbmd1bGFyL2Zvcm1zJztcbmltcG9ydCB7IE5neE1hdGVyaWFsVGltZXBpY2tlclNlcnZpY2UgfSBmcm9tICcuLi8uLi9zZXJ2aWNlcy9uZ3gtbWF0ZXJpYWwtdGltZXBpY2tlci5zZXJ2aWNlJztcbmltcG9ydCB7IE9ic2VydmFibGUsIFN1YmplY3QgfSBmcm9tICdyeGpzJztcbmltcG9ydCB7IENsb2NrRmFjZVRpbWUgfSBmcm9tICcuLi8uLi9tb2RlbHMvY2xvY2stZmFjZS10aW1lLmludGVyZmFjZSc7XG5pbXBvcnQgeyBUaW1lUGVyaW9kIH0gZnJvbSAnLi4vLi4vbW9kZWxzL3RpbWUtcGVyaW9kLmVudW0nO1xuaW1wb3J0IHsgVGltZVVuaXQgfSBmcm9tICcuLi8uLi9tb2RlbHMvdGltZS11bml0LmVudW0nO1xuaW1wb3J0IHsgTmd4TWF0ZXJpYWxUaW1lcGlja2VyVGhlbWUgfSBmcm9tICcuLi8uLi9tb2RlbHMvbmd4LW1hdGVyaWFsLXRpbWVwaWNrZXItdGhlbWUuaW50ZXJmYWNlJztcbmltcG9ydCB7IFRpbWVBZGFwdGVyIH0gZnJvbSAnLi4vLi4vc2VydmljZXMvdGltZS1hZGFwdGVyJztcbmltcG9ydCB7IFRJTUVfTE9DQUxFIH0gZnJvbSAnLi4vLi4vdG9rZW5zL3RpbWUtbG9jYWxlLnRva2VuJztcbmltcG9ydCB7IFRpbWVwaWNrZXJUaW1lVXRpbHMgfSBmcm9tICcuLi8uLi91dGlscy90aW1lcGlja2VyLXRpbWUudXRpbHMnO1xuaW1wb3J0IHsgRGF0ZVRpbWUgfSBmcm9tICdsdXhvbic7XG5pbXBvcnQgeyBkaXN0aW5jdFVudGlsQ2hhbmdlZCwgbWFwLCB0YWtlVW50aWwsIHRhcCB9IGZyb20gJ3J4anMvb3BlcmF0b3JzJztcblxuQENvbXBvbmVudCh7XG4gICAgc2VsZWN0b3I6ICduZ3gtdGltZXBpY2tlci1maWVsZCcsXG4gICAgdGVtcGxhdGVVcmw6ICcuL25neC10aW1lcGlja2VyLWZpZWxkLmNvbXBvbmVudC5odG1sJyxcbiAgICBzdHlsZVVybHM6IFsnLi9uZ3gtdGltZXBpY2tlci1maWVsZC5jb21wb25lbnQuc2NzcyddLFxuICAgIHByb3ZpZGVyczogW1xuICAgICAgICBOZ3hNYXRlcmlhbFRpbWVwaWNrZXJTZXJ2aWNlLFxuICAgICAgICB7XG4gICAgICAgICAgICBwcm92aWRlOiBOR19WQUxVRV9BQ0NFU1NPUixcbiAgICAgICAgICAgIHVzZUV4aXN0aW5nOiBOZ3hUaW1lcGlja2VyRmllbGRDb21wb25lbnQsXG4gICAgICAgICAgICBtdWx0aTogdHJ1ZVxuICAgICAgICB9XG4gICAgXSxcbiAgICBjaGFuZ2VEZXRlY3Rpb246IENoYW5nZURldGVjdGlvblN0cmF0ZWd5Lk9uUHVzaFxufSlcbmV4cG9ydCBjbGFzcyBOZ3hUaW1lcGlja2VyRmllbGRDb21wb25lbnQgaW1wbGVtZW50cyBPbkluaXQsIE9uRGVzdHJveSwgQ29udHJvbFZhbHVlQWNjZXNzb3Ige1xuXG4gICAgcGVyaW9kOiBUaW1lUGVyaW9kO1xuICAgIGhvdXIkOiBPYnNlcnZhYmxlPENsb2NrRmFjZVRpbWU+O1xuICAgIG1pbnV0ZSQ6IE9ic2VydmFibGU8Q2xvY2tGYWNlVGltZT47XG5cbiAgICBtaW5Ib3VyID0gMTtcbiAgICBtYXhIb3VyID0gMTI7XG5cbiAgICB0aW1lVW5pdCA9IFRpbWVVbml0O1xuICAgIHRpbWVwaWNrZXJUaW1lOiBzdHJpbmc7XG5cbiAgICBob3Vyc0xpc3Q6IENsb2NrRmFjZVRpbWVbXTtcbiAgICBtaW51dGVzTGlzdDogQ2xvY2tGYWNlVGltZVtdO1xuXG4gICAgaXNUaW1lUmFuZ2VTZXQ6IGJvb2xlYW47XG4gICAgaXNDaGFuZ2VQZXJpb2REaXNhYmxlZDogYm9vbGVhbjtcblxuICAgIEBJbnB1dCgpIGRpc2FibGVkOiBib29sZWFuO1xuICAgIEBJbnB1dCgpIHRvZ2dsZUljb246IFRlbXBsYXRlUmVmPEhUTUxPYmplY3RFbGVtZW50PjtcbiAgICBASW5wdXQoKSBidXR0b25BbGlnbjogJ3JpZ2h0JyB8ICdsZWZ0JyA9ICdyaWdodCc7XG4gICAgQElucHV0KCkgY2xvY2tUaGVtZTogTmd4TWF0ZXJpYWxUaW1lcGlja2VyVGhlbWU7XG4gICAgQElucHV0KCkgY29udHJvbE9ubHk6IGJvb2xlYW47XG4gICAgQElucHV0KCkgY2FuY2VsQnRuVG1wbDogVGVtcGxhdGVSZWY8Tm9kZT47XG4gICAgQElucHV0KCkgY29uZmlybUJ0blRtcGw6IFRlbXBsYXRlUmVmPE5vZGU+O1xuXG4gICAgQElucHV0KClcbiAgICBzZXQgZm9ybWF0KHZhbHVlOiBudW1iZXIpIHtcbiAgICAgICAgdGhpcy5fZm9ybWF0ID0gdmFsdWUgPT09IDI0ID8gMjQgOiAxMjtcbiAgICAgICAgdGhpcy5taW5Ib3VyID0gdGhpcy5fZm9ybWF0ID09PSAxMiA/IDEgOiAwO1xuICAgICAgICB0aGlzLm1heEhvdXIgPSB0aGlzLl9mb3JtYXQgPT09IDEyID8gMTIgOiAyMztcbiAgICAgICAgdGhpcy5ob3Vyc0xpc3QgPSBUaW1lcGlja2VyVGltZVV0aWxzLmdldEhvdXJzKHRoaXMuX2Zvcm1hdCk7XG4gICAgICAgIGNvbnN0IGlzRHluYW1pY2FsbHlDaGFuZ2VkID0gdmFsdWUgJiYgKHRoaXMucHJldmlvdXNGb3JtYXQgJiYgdGhpcy5wcmV2aW91c0Zvcm1hdCAhPT0gdGhpcy5fZm9ybWF0KTtcblxuICAgICAgICBpZiAoaXNEeW5hbWljYWxseUNoYW5nZWQpIHtcbiAgICAgICAgICAgIHRoaXMudXBkYXRlVGltZSh0aGlzLnRpbWVwaWNrZXJUaW1lKTtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLnByZXZpb3VzRm9ybWF0ID0gdGhpcy5fZm9ybWF0O1xuICAgIH1cblxuICAgIGdldCBmb3JtYXQoKTogbnVtYmVyIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX2Zvcm1hdDtcbiAgICB9XG5cbiAgICBASW5wdXQoKVxuICAgIHNldCBtaW4odmFsdWU6IHN0cmluZyB8IERhdGVUaW1lKSB7XG4gICAgICAgIGlmICh0eXBlb2YgdmFsdWUgPT09ICdzdHJpbmcnKSB7XG4gICAgICAgICAgICB0aGlzLl9taW4gPSBUaW1lQWRhcHRlci5wYXJzZVRpbWUodmFsdWUsIHtsb2NhbGU6IHRoaXMubG9jYWxlLCBmb3JtYXQ6IHRoaXMuZm9ybWF0fSk7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5fbWluID0gdmFsdWU7XG4gICAgfVxuXG4gICAgZ2V0IG1pbigpOiBzdHJpbmcgfCBEYXRlVGltZSB7XG4gICAgICAgIHJldHVybiB0aGlzLl9taW47XG4gICAgfVxuXG4gICAgQElucHV0KClcbiAgICBzZXQgbWF4KHZhbHVlOiBzdHJpbmcgfCBEYXRlVGltZSkge1xuICAgICAgICBpZiAodHlwZW9mIHZhbHVlID09PSAnc3RyaW5nJykge1xuICAgICAgICAgICAgdGhpcy5fbWF4ID0gVGltZUFkYXB0ZXIucGFyc2VUaW1lKHZhbHVlLCB7bG9jYWxlOiB0aGlzLmxvY2FsZSwgZm9ybWF0OiB0aGlzLmZvcm1hdH0pO1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMuX21heCA9IHZhbHVlO1xuICAgIH1cblxuICAgIGdldCBtYXgoKTogc3RyaW5nIHwgRGF0ZVRpbWUge1xuICAgICAgICByZXR1cm4gdGhpcy5fbWF4O1xuICAgIH1cblxuICAgIEBJbnB1dCgpXG4gICAgc2V0IGRlZmF1bHRUaW1lKHZhbDogc3RyaW5nKSB7XG4gICAgICAgIHRoaXMuX2RlZmF1bHRUaW1lID0gdmFsO1xuICAgICAgICB0aGlzLmlzRGVmYXVsdFRpbWUgPSAhIXZhbDtcbiAgICB9XG5cbiAgICBnZXQgZGVmYXVsdFRpbWUoKTogc3RyaW5nIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX2RlZmF1bHRUaW1lO1xuICAgIH1cblxuICAgIEBPdXRwdXQoKSB0aW1lQ2hhbmdlZCA9IG5ldyBFdmVudEVtaXR0ZXI8c3RyaW5nPigpO1xuXG4gICAgcHJpdmF0ZSBfZGVmYXVsdFRpbWU6IHN0cmluZztcbiAgICBwcml2YXRlIF9mb3JtYXQgPSAxMjtcbiAgICBwcml2YXRlIF9taW46IHN0cmluZyB8IERhdGVUaW1lO1xuICAgIHByaXZhdGUgX21heDogc3RyaW5nIHwgRGF0ZVRpbWU7XG4gICAgcHJpdmF0ZSBwcmV2aW91c0Zvcm1hdDogbnVtYmVyO1xuXG4gICAgcHJpdmF0ZSB1bnN1YnNjcmliZSQgPSBuZXcgU3ViamVjdCgpO1xuXG4gICAgcHJpdmF0ZSBpc0ZpcnN0VGltZUNoYW5nZSA9IHRydWU7XG4gICAgcHJpdmF0ZSBpc0RlZmF1bHRUaW1lOiBib29sZWFuO1xuICAgIHByaXZhdGUgc2VsZWN0ZWRIb3VyOiBudW1iZXI7XG5cbiAgICBwcml2YXRlIG9uQ2hhbmdlOiAodmFsdWU6IHN0cmluZykgPT4gdm9pZCA9ICgpID0+IHtcbiAgICB9XG5cbiAgICBjb25zdHJ1Y3Rvcihwcml2YXRlIHRpbWVwaWNrZXJTZXJ2aWNlOiBOZ3hNYXRlcmlhbFRpbWVwaWNrZXJTZXJ2aWNlLFxuICAgICAgICAgICAgICAgIEBJbmplY3QoVElNRV9MT0NBTEUpIHByaXZhdGUgbG9jYWxlOiBzdHJpbmcpIHtcbiAgICB9XG5cbiAgICBuZ09uSW5pdCgpIHtcbiAgICAgICAgdGhpcy5pbml0VGltZSh0aGlzLmRlZmF1bHRUaW1lKTtcblxuICAgICAgICB0aGlzLmhvdXJzTGlzdCA9IFRpbWVwaWNrZXJUaW1lVXRpbHMuZ2V0SG91cnModGhpcy5fZm9ybWF0KTtcbiAgICAgICAgdGhpcy5taW51dGVzTGlzdCA9IFRpbWVwaWNrZXJUaW1lVXRpbHMuZ2V0TWludXRlcygpO1xuICAgICAgICB0aGlzLmlzVGltZVJhbmdlU2V0ID0gISEodGhpcy5taW4gfHwgdGhpcy5tYXgpO1xuXG4gICAgICAgIHRoaXMuaG91ciQgPSB0aGlzLnRpbWVwaWNrZXJTZXJ2aWNlLnNlbGVjdGVkSG91ci5waXBlKFxuICAgICAgICAgICAgdGFwKChjbG9ja1RpbWU6IENsb2NrRmFjZVRpbWUpID0+IHRoaXMuc2VsZWN0ZWRIb3VyID0gY2xvY2tUaW1lLnRpbWUpLFxuICAgICAgICAgICAgbWFwKHRoaXMuY2hhbmdlRGVmYXVsdFRpbWVWYWx1ZS5iaW5kKHRoaXMpKSxcbiAgICAgICAgICAgIHRhcCgoKSA9PiB0aGlzLmlzVGltZVJhbmdlU2V0ICYmIHRoaXMudXBkYXRlQXZhaWxhYmxlTWludXRlcygpKVxuICAgICAgICApIGFzIE9ic2VydmFibGU8Q2xvY2tGYWNlVGltZT47XG4gICAgICAgIHRoaXMubWludXRlJCA9IHRoaXMudGltZXBpY2tlclNlcnZpY2Uuc2VsZWN0ZWRNaW51dGUucGlwZShcbiAgICAgICAgICAgIG1hcCh0aGlzLmNoYW5nZURlZmF1bHRUaW1lVmFsdWUuYmluZCh0aGlzKSksXG4gICAgICAgICAgICB0YXAoKCkgPT4gdGhpcy5pc0ZpcnN0VGltZUNoYW5nZSA9IGZhbHNlKVxuICAgICAgICApIGFzIE9ic2VydmFibGU8Q2xvY2tGYWNlVGltZT47XG5cbiAgICAgICAgaWYgKHRoaXMuZm9ybWF0ID09PSAxMikge1xuICAgICAgICAgICAgdGhpcy50aW1lcGlja2VyU2VydmljZS5zZWxlY3RlZFBlcmlvZC5waXBlKFxuICAgICAgICAgICAgICAgIGRpc3RpbmN0VW50aWxDaGFuZ2VkPFRpbWVQZXJpb2Q+KCksXG4gICAgICAgICAgICAgICAgdGFwKChwZXJpb2Q6IFRpbWVQZXJpb2QpID0+IHRoaXMucGVyaW9kID0gcGVyaW9kKSxcbiAgICAgICAgICAgICAgICB0YXAocGVyaW9kID0+IHRoaXMuaXNDaGFuZ2VQZXJpb2REaXNhYmxlZCA9IHRoaXMuaXNQZXJpb2REaXNhYmxlZChwZXJpb2QpKSxcbiAgICAgICAgICAgICAgICB0YWtlVW50aWwodGhpcy51bnN1YnNjcmliZSQpXG4gICAgICAgICAgICApLnN1YnNjcmliZSgoKSA9PiB0aGlzLmlzVGltZVJhbmdlU2V0ICYmIHRoaXMudXBkYXRlQXZhaWxhYmxlVGltZSgpKTtcbiAgICAgICAgfVxuXG4gICAgfVxuXG4gICAgd3JpdGVWYWx1ZSh2YWw6IHN0cmluZyk6IHZvaWQge1xuICAgICAgICBpZiAodmFsKSB7XG4gICAgICAgICAgICB0aGlzLmluaXRUaW1lKHZhbCk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICB0aGlzLnJlc2V0VGltZSgpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgcmVnaXN0ZXJPblRvdWNoZWQoZm46IGFueSk6IHZvaWQge1xuICAgIH1cblxuICAgIHJlZ2lzdGVyT25DaGFuZ2UoZm46IGFueSk6IHZvaWQge1xuICAgICAgICB0aGlzLm9uQ2hhbmdlID0gZm47XG4gICAgfVxuXG4gICAgc2V0RGlzYWJsZWRTdGF0ZShpc0Rpc2FibGVkOiBib29sZWFuKTogdm9pZCB7XG4gICAgICAgIHRoaXMuZGlzYWJsZWQgPSBpc0Rpc2FibGVkO1xuICAgIH1cblxuICAgIGNoYW5nZUhvdXIoaG91cjogbnVtYmVyKTogdm9pZCB7XG4gICAgICAgIHRoaXMudGltZXBpY2tlclNlcnZpY2UuaG91ciA9IHRoaXMuaG91cnNMaXN0LmZpbmQoaCA9PiBoLnRpbWUgPT09IGhvdXIpO1xuICAgICAgICB0aGlzLmNoYW5nZVRpbWUoKTtcbiAgICB9XG5cbiAgICBjaGFuZ2VNaW51dGUobWludXRlOiBudW1iZXIpOiB2b2lkIHtcbiAgICAgICAgdGhpcy50aW1lcGlja2VyU2VydmljZS5taW51dGUgPSB0aGlzLm1pbnV0ZXNMaXN0LmZpbmQobSA9PiBtLnRpbWUgPT09IG1pbnV0ZSk7XG4gICAgICAgIHRoaXMuY2hhbmdlVGltZSgpO1xuICAgIH1cblxuICAgIGNoYW5nZVBlcmlvZChwZXJpb2Q6IFRpbWVQZXJpb2QpOiB2b2lkIHtcbiAgICAgICAgdGhpcy50aW1lcGlja2VyU2VydmljZS5wZXJpb2QgPSBwZXJpb2Q7XG4gICAgICAgIHRoaXMuY2hhbmdlVGltZSgpO1xuICAgIH1cblxuICAgIG9uVGltZVNldCh0aW1lOiBzdHJpbmcpOiB2b2lkIHtcbiAgICAgICAgdGhpcy51cGRhdGVUaW1lKHRpbWUpO1xuICAgICAgICB0aGlzLmVtaXRMb2NhbFRpbWVDaGFuZ2UodGltZSk7XG4gICAgfVxuXG4gICAgbmdPbkRlc3Ryb3koKTogdm9pZCB7XG4gICAgICAgIHRoaXMudW5zdWJzY3JpYmUkLm5leHQoKTtcbiAgICAgICAgdGhpcy51bnN1YnNjcmliZSQuY29tcGxldGUoKTtcbiAgICB9XG5cbiAgICBwcml2YXRlIGNoYW5nZVRpbWUoKTogdm9pZCB7XG4gICAgICAgIGNvbnN0IHRpbWUgPSB0aGlzLnRpbWVwaWNrZXJTZXJ2aWNlLmdldEZ1bGxUaW1lKHRoaXMuZm9ybWF0KTtcbiAgICAgICAgdGhpcy50aW1lcGlja2VyVGltZSA9IHRpbWU7XG5cbiAgICAgICAgdGhpcy5lbWl0TG9jYWxUaW1lQ2hhbmdlKHRpbWUpO1xuICAgIH1cblxuICAgIHByaXZhdGUgcmVzZXRUaW1lKCk6IHZvaWQge1xuICAgICAgICB0aGlzLnRpbWVwaWNrZXJTZXJ2aWNlLmhvdXIgPSB7YW5nbGU6IDAsIHRpbWU6IG51bGx9O1xuICAgICAgICB0aGlzLnRpbWVwaWNrZXJTZXJ2aWNlLm1pbnV0ZSA9IHthbmdsZTogMCwgdGltZTogbnVsbH07XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBlbWl0TG9jYWxUaW1lQ2hhbmdlKHRpbWU6IHN0cmluZyk6IHZvaWQge1xuICAgICAgICBjb25zdCBsb2NhbFRpbWUgPSBUaW1lQWRhcHRlci50b0xvY2FsZVRpbWVTdHJpbmcodGltZSwge2Zvcm1hdDogdGhpcy5mb3JtYXQsIGxvY2FsZTogdGhpcy5sb2NhbGV9KTtcblxuICAgICAgICB0aGlzLm9uQ2hhbmdlKGxvY2FsVGltZSk7XG4gICAgICAgIHRoaXMudGltZUNoYW5nZWQuZW1pdChsb2NhbFRpbWUpO1xuICAgIH1cblxuICAgIHByaXZhdGUgY2hhbmdlRGVmYXVsdFRpbWVWYWx1ZShjbG9ja0ZhY2VUaW1lOiBDbG9ja0ZhY2VUaW1lKTogQ2xvY2tGYWNlVGltZSB7XG4gICAgICAgIGlmICghdGhpcy5pc0RlZmF1bHRUaW1lICYmIHRoaXMuaXNGaXJzdFRpbWVDaGFuZ2UpIHtcbiAgICAgICAgICAgIHJldHVybiB7Li4uY2xvY2tGYWNlVGltZSwgdGltZTogbnVsbH07XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIGNsb2NrRmFjZVRpbWU7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSB1cGRhdGVBdmFpbGFibGVIb3VycygpOiB2b2lkIHtcbiAgICAgICAgdGhpcy5ob3Vyc0xpc3QgPSBUaW1lcGlja2VyVGltZVV0aWxzLmRpc2FibGVIb3Vycyh0aGlzLmhvdXJzTGlzdCwge1xuICAgICAgICAgICAgbWluOiB0aGlzLm1pbiBhcyBEYXRlVGltZSxcbiAgICAgICAgICAgIG1heDogdGhpcy5tYXggYXMgRGF0ZVRpbWUsXG4gICAgICAgICAgICBmb3JtYXQ6IHRoaXMuZm9ybWF0LFxuICAgICAgICAgICAgcGVyaW9kOiB0aGlzLnBlcmlvZFxuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICBwcml2YXRlIHVwZGF0ZUF2YWlsYWJsZU1pbnV0ZXMoKTogdm9pZCB7XG4gICAgICAgIHRoaXMubWludXRlc0xpc3QgPSBUaW1lcGlja2VyVGltZVV0aWxzLmRpc2FibGVNaW51dGVzKHRoaXMubWludXRlc0xpc3QsIHRoaXMuc2VsZWN0ZWRIb3VyLCB7XG4gICAgICAgICAgICBtaW46IHRoaXMubWluIGFzIERhdGVUaW1lLFxuICAgICAgICAgICAgbWF4OiB0aGlzLm1heCBhcyBEYXRlVGltZSxcbiAgICAgICAgICAgIGZvcm1hdDogdGhpcy5mb3JtYXQsXG4gICAgICAgICAgICBwZXJpb2Q6IHRoaXMucGVyaW9kXG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIHByaXZhdGUgdXBkYXRlQXZhaWxhYmxlVGltZSgpOiB2b2lkIHtcbiAgICAgICAgdGhpcy51cGRhdGVBdmFpbGFibGVIb3VycygpO1xuICAgICAgICBpZiAodGhpcy5zZWxlY3RlZEhvdXIpIHtcbiAgICAgICAgICAgIHRoaXMudXBkYXRlQXZhaWxhYmxlTWludXRlcygpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgcHJpdmF0ZSB1cGRhdGVUaW1lKHRpbWU6IHN0cmluZyk6IHZvaWQge1xuICAgICAgICBpZiAodGltZSkge1xuICAgICAgICAgICAgY29uc3QgZm9ybWF0dGVkVGltZSA9IFRpbWVBZGFwdGVyLmZvcm1hdFRpbWUodGltZSwge2xvY2FsZTogdGhpcy5sb2NhbGUsIGZvcm1hdDogdGhpcy5mb3JtYXR9KTtcbiAgICAgICAgICAgIHRoaXMudGltZXBpY2tlclNlcnZpY2Uuc2V0RGVmYXVsdFRpbWVJZkF2YWlsYWJsZShmb3JtYXR0ZWRUaW1lLCB0aGlzLm1pbiBhcyBEYXRlVGltZSwgdGhpcy5tYXggYXMgRGF0ZVRpbWUsIHRoaXMuZm9ybWF0KTtcbiAgICAgICAgICAgIHRoaXMudGltZXBpY2tlclRpbWUgPSBmb3JtYXR0ZWRUaW1lO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBpbml0VGltZSh0aW1lKTogdm9pZCB7XG4gICAgICAgIGNvbnN0IGlzRGVmYXVsdFRpbWVBdmFpbGFibGUgPSBUaW1lQWRhcHRlclxuICAgICAgICAgICAgLmlzVGltZUF2YWlsYWJsZSh0aW1lLCB0aGlzLm1pbiBhcyBEYXRlVGltZSwgdGhpcy5tYXggYXMgRGF0ZVRpbWUsICdtaW51dGVzJywgbnVsbCwgdGhpcy5mb3JtYXQpO1xuICAgICAgICBpZiAoIWlzRGVmYXVsdFRpbWVBdmFpbGFibGUpIHtcbiAgICAgICAgICAgIGlmICh0aGlzLm1pbikge1xuICAgICAgICAgICAgICAgIHRoaXMudXBkYXRlVGltZShUaW1lQWRhcHRlci5mcm9tRGF0ZVRpbWVUb1N0cmluZyh0aGlzLm1pbiBhcyBEYXRlVGltZSwgdGhpcy5mb3JtYXQpKTtcbiAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAodGhpcy5tYXgpIHtcbiAgICAgICAgICAgICAgICB0aGlzLnVwZGF0ZVRpbWUoVGltZUFkYXB0ZXIuZnJvbURhdGVUaW1lVG9TdHJpbmcodGhpcy5tYXggYXMgRGF0ZVRpbWUsIHRoaXMuZm9ybWF0KSk7XG4gICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIHRoaXMudXBkYXRlVGltZSh0aW1lKTtcbiAgICB9XG5cbiAgICBwcml2YXRlIGlzUGVyaW9kRGlzYWJsZWQocGVyaW9kKTogYm9vbGVhbiB7XG4gICAgICAgIHJldHVybiBUaW1lcGlja2VyVGltZVV0aWxzLmRpc2FibGVIb3VycyhUaW1lcGlja2VyVGltZVV0aWxzLmdldEhvdXJzKDEyKSwge1xuICAgICAgICAgICAgbWluOiB0aGlzLm1pbiBhcyBEYXRlVGltZSxcbiAgICAgICAgICAgIG1heDogdGhpcy5tYXggYXMgRGF0ZVRpbWUsXG4gICAgICAgICAgICBmb3JtYXQ6IDEyLFxuICAgICAgICAgICAgcGVyaW9kOiBwZXJpb2QgPT09IFRpbWVQZXJpb2QuQU0gPyBUaW1lUGVyaW9kLlBNIDogVGltZVBlcmlvZC5BTVxuICAgICAgICB9KS5ldmVyeSh0aW1lID0+IHRpbWUuZGlzYWJsZWQpO1xuICAgIH1cblxufVxuIl19