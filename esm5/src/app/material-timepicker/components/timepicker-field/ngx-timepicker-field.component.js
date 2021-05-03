import * as tslib_1 from "tslib";
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
var NgxTimepickerFieldComponent = /** @class */ (function () {
    function NgxTimepickerFieldComponent(timepickerService, locale) {
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
        this.onChange = function () {
        };
    }
    NgxTimepickerFieldComponent_1 = NgxTimepickerFieldComponent;
    Object.defineProperty(NgxTimepickerFieldComponent.prototype, "format", {
        get: function () {
            return this._format;
        },
        set: function (value) {
            this._format = value === 24 ? 24 : 12;
            this.minHour = this._format === 12 ? 1 : 0;
            this.maxHour = this._format === 12 ? 12 : 23;
            this.hoursList = TimepickerTimeUtils.getHours(this._format);
            var isDynamicallyChanged = value && (this.previousFormat && this.previousFormat !== this._format);
            if (isDynamicallyChanged) {
                this.updateTime(this.timepickerTime);
            }
            this.previousFormat = this._format;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(NgxTimepickerFieldComponent.prototype, "min", {
        get: function () {
            return this._min;
        },
        set: function (value) {
            if (typeof value === 'string') {
                this._min = TimeAdapter.parseTime(value, { locale: this.locale, format: this.format });
                return;
            }
            this._min = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(NgxTimepickerFieldComponent.prototype, "max", {
        get: function () {
            return this._max;
        },
        set: function (value) {
            if (typeof value === 'string') {
                this._max = TimeAdapter.parseTime(value, { locale: this.locale, format: this.format });
                return;
            }
            this._max = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(NgxTimepickerFieldComponent.prototype, "defaultTime", {
        get: function () {
            return this._defaultTime;
        },
        set: function (val) {
            this._defaultTime = val;
            this.isDefaultTime = !!val;
        },
        enumerable: true,
        configurable: true
    });
    NgxTimepickerFieldComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.initTime(this.defaultTime);
        this.hoursList = TimepickerTimeUtils.getHours(this._format);
        this.minutesList = TimepickerTimeUtils.getMinutes();
        this.isTimeRangeSet = !!(this.min || this.max);
        this.hour$ = this.timepickerService.selectedHour.pipe(tap(function (clockTime) { return _this.selectedHour = clockTime.time; }), map(this.changeDefaultTimeValue.bind(this)), tap(function () { return _this.isTimeRangeSet && _this.updateAvailableMinutes(); }));
        this.minute$ = this.timepickerService.selectedMinute.pipe(map(this.changeDefaultTimeValue.bind(this)), tap(function () { return _this.isFirstTimeChange = false; }));
        if (this.format === 12) {
            this.timepickerService.selectedPeriod.pipe(distinctUntilChanged(), tap(function (period) { return _this.period = period; }), tap(function (period) { return _this.isChangePeriodDisabled = _this.isPeriodDisabled(period); }), takeUntil(this.unsubscribe$)).subscribe(function () { return _this.isTimeRangeSet && _this.updateAvailableTime(); });
        }
    };
    NgxTimepickerFieldComponent.prototype.writeValue = function (val) {
        if (val) {
            this.initTime(val);
        }
        else {
            this.resetTime();
        }
    };
    NgxTimepickerFieldComponent.prototype.registerOnTouched = function (fn) {
    };
    NgxTimepickerFieldComponent.prototype.registerOnChange = function (fn) {
        this.onChange = fn;
    };
    NgxTimepickerFieldComponent.prototype.setDisabledState = function (isDisabled) {
        this.disabled = isDisabled;
    };
    NgxTimepickerFieldComponent.prototype.changeHour = function (hour) {
        this.timepickerService.hour = this.hoursList.find(function (h) { return h.time === hour; });
        this.changeTime();
    };
    NgxTimepickerFieldComponent.prototype.changeMinute = function (minute) {
        this.timepickerService.minute = this.minutesList.find(function (m) { return m.time === minute; });
        this.changeTime();
    };
    NgxTimepickerFieldComponent.prototype.changePeriod = function (period) {
        this.timepickerService.period = period;
        this.changeTime();
    };
    NgxTimepickerFieldComponent.prototype.onTimeSet = function (time) {
        this.updateTime(time);
        this.emitLocalTimeChange(time);
    };
    NgxTimepickerFieldComponent.prototype.ngOnDestroy = function () {
        this.unsubscribe$.next();
        this.unsubscribe$.complete();
    };
    NgxTimepickerFieldComponent.prototype.changeTime = function () {
        var time = this.timepickerService.getFullTime(this.format);
        this.timepickerTime = time;
        this.emitLocalTimeChange(time);
    };
    NgxTimepickerFieldComponent.prototype.resetTime = function () {
        this.timepickerService.hour = { angle: 0, time: null };
        this.timepickerService.minute = { angle: 0, time: null };
    };
    NgxTimepickerFieldComponent.prototype.emitLocalTimeChange = function (time) {
        var localTime = TimeAdapter.toLocaleTimeString(time, { format: this.format, locale: this.locale });
        this.onChange(localTime);
        this.timeChanged.emit(localTime);
    };
    NgxTimepickerFieldComponent.prototype.changeDefaultTimeValue = function (clockFaceTime) {
        if (!this.isDefaultTime && this.isFirstTimeChange) {
            return tslib_1.__assign({}, clockFaceTime, { time: null });
        }
        return clockFaceTime;
    };
    NgxTimepickerFieldComponent.prototype.updateAvailableHours = function () {
        this.hoursList = TimepickerTimeUtils.disableHours(this.hoursList, {
            min: this.min,
            max: this.max,
            format: this.format,
            period: this.period
        });
    };
    NgxTimepickerFieldComponent.prototype.updateAvailableMinutes = function () {
        this.minutesList = TimepickerTimeUtils.disableMinutes(this.minutesList, this.selectedHour, {
            min: this.min,
            max: this.max,
            format: this.format,
            period: this.period
        });
    };
    NgxTimepickerFieldComponent.prototype.updateAvailableTime = function () {
        this.updateAvailableHours();
        if (this.selectedHour) {
            this.updateAvailableMinutes();
        }
    };
    NgxTimepickerFieldComponent.prototype.updateTime = function (time) {
        if (time) {
            var formattedTime = TimeAdapter.formatTime(time, { locale: this.locale, format: this.format });
            this.timepickerService.setDefaultTimeIfAvailable(formattedTime, this.min, this.max, this.format);
            this.timepickerTime = formattedTime;
        }
    };
    NgxTimepickerFieldComponent.prototype.initTime = function (time) {
        var isDefaultTimeAvailable = TimeAdapter
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
    };
    NgxTimepickerFieldComponent.prototype.isPeriodDisabled = function (period) {
        return TimepickerTimeUtils.disableHours(TimepickerTimeUtils.getHours(12), {
            min: this.min,
            max: this.max,
            format: 12,
            period: period === TimePeriod.AM ? TimePeriod.PM : TimePeriod.AM
        }).every(function (time) { return time.disabled; });
    };
    var NgxTimepickerFieldComponent_1;
    NgxTimepickerFieldComponent.ctorParameters = function () { return [
        { type: NgxMaterialTimepickerService },
        { type: String, decorators: [{ type: Inject, args: [TIME_LOCALE,] }] }
    ]; };
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
    return NgxTimepickerFieldComponent;
}());
export { NgxTimepickerFieldComponent };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibmd4LXRpbWVwaWNrZXItZmllbGQuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6Im5nOi8vbmd4LW1hdGVyaWFsLXRpbWVwaWNrZXIvIiwic291cmNlcyI6WyJzcmMvYXBwL21hdGVyaWFsLXRpbWVwaWNrZXIvY29tcG9uZW50cy90aW1lcGlja2VyLWZpZWxkL25neC10aW1lcGlja2VyLWZpZWxkLmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUEsT0FBTyxFQUFFLHVCQUF1QixFQUFFLFNBQVMsRUFBRSxZQUFZLEVBQUUsTUFBTSxFQUFFLEtBQUssRUFBcUIsTUFBTSxFQUFlLE1BQU0sZUFBZSxDQUFDO0FBQ3hJLE9BQU8sRUFBd0IsaUJBQWlCLEVBQUUsTUFBTSxnQkFBZ0IsQ0FBQztBQUN6RSxPQUFPLEVBQUUsNEJBQTRCLEVBQUUsTUFBTSxnREFBZ0QsQ0FBQztBQUM5RixPQUFPLEVBQWMsT0FBTyxFQUFFLE1BQU0sTUFBTSxDQUFDO0FBRTNDLE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSwrQkFBK0IsQ0FBQztBQUMzRCxPQUFPLEVBQUUsUUFBUSxFQUFFLE1BQU0sNkJBQTZCLENBQUM7QUFFdkQsT0FBTyxFQUFFLFdBQVcsRUFBRSxNQUFNLDZCQUE2QixDQUFDO0FBQzFELE9BQU8sRUFBRSxXQUFXLEVBQUUsTUFBTSxnQ0FBZ0MsQ0FBQztBQUM3RCxPQUFPLEVBQUUsbUJBQW1CLEVBQUUsTUFBTSxtQ0FBbUMsQ0FBQztBQUV4RSxPQUFPLEVBQUUsb0JBQW9CLEVBQUUsR0FBRyxFQUFFLFNBQVMsRUFBRSxHQUFHLEVBQUUsTUFBTSxnQkFBZ0IsQ0FBQztBQWdCM0U7SUFpR0kscUNBQW9CLGlCQUErQyxFQUMxQixNQUFjO1FBRG5DLHNCQUFpQixHQUFqQixpQkFBaUIsQ0FBOEI7UUFDMUIsV0FBTSxHQUFOLE1BQU0sQ0FBUTtRQTVGdkQsWUFBTyxHQUFHLENBQUMsQ0FBQztRQUNaLFlBQU8sR0FBRyxFQUFFLENBQUM7UUFFYixhQUFRLEdBQUcsUUFBUSxDQUFDO1FBV1gsZ0JBQVcsR0FBcUIsT0FBTyxDQUFDO1FBNER2QyxnQkFBVyxHQUFHLElBQUksWUFBWSxFQUFVLENBQUM7UUFHM0MsWUFBTyxHQUFHLEVBQUUsQ0FBQztRQUtiLGlCQUFZLEdBQUcsSUFBSSxPQUFPLEVBQUUsQ0FBQztRQUU3QixzQkFBaUIsR0FBRyxJQUFJLENBQUM7UUFJekIsYUFBUSxHQUE0QjtRQUM1QyxDQUFDLENBQUE7SUFJRCxDQUFDO29DQW5HUSwyQkFBMkI7SUEyQnBDLHNCQUFJLCtDQUFNO2FBYVY7WUFDSSxPQUFPLElBQUksQ0FBQyxPQUFPLENBQUM7UUFDeEIsQ0FBQzthQWZELFVBQVcsS0FBYTtZQUNwQixJQUFJLENBQUMsT0FBTyxHQUFHLEtBQUssS0FBSyxFQUFFLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDO1lBQ3RDLElBQUksQ0FBQyxPQUFPLEdBQUcsSUFBSSxDQUFDLE9BQU8sS0FBSyxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO1lBQzNDLElBQUksQ0FBQyxPQUFPLEdBQUcsSUFBSSxDQUFDLE9BQU8sS0FBSyxFQUFFLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDO1lBQzdDLElBQUksQ0FBQyxTQUFTLEdBQUcsbUJBQW1CLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQztZQUM1RCxJQUFNLG9CQUFvQixHQUFHLEtBQUssSUFBSSxDQUFDLElBQUksQ0FBQyxjQUFjLElBQUksSUFBSSxDQUFDLGNBQWMsS0FBSyxJQUFJLENBQUMsT0FBTyxDQUFDLENBQUM7WUFFcEcsSUFBSSxvQkFBb0IsRUFBRTtnQkFDdEIsSUFBSSxDQUFDLFVBQVUsQ0FBQyxJQUFJLENBQUMsY0FBYyxDQUFDLENBQUM7YUFDeEM7WUFDRCxJQUFJLENBQUMsY0FBYyxHQUFHLElBQUksQ0FBQyxPQUFPLENBQUM7UUFDdkMsQ0FBQzs7O09BQUE7SUFPRCxzQkFBSSw0Q0FBRzthQVFQO1lBQ0ksT0FBTyxJQUFJLENBQUMsSUFBSSxDQUFDO1FBQ3JCLENBQUM7YUFWRCxVQUFRLEtBQXdCO1lBQzVCLElBQUksT0FBTyxLQUFLLEtBQUssUUFBUSxFQUFFO2dCQUMzQixJQUFJLENBQUMsSUFBSSxHQUFHLFdBQVcsQ0FBQyxTQUFTLENBQUMsS0FBSyxFQUFFLEVBQUMsTUFBTSxFQUFFLElBQUksQ0FBQyxNQUFNLEVBQUUsTUFBTSxFQUFFLElBQUksQ0FBQyxNQUFNLEVBQUMsQ0FBQyxDQUFDO2dCQUNyRixPQUFPO2FBQ1Y7WUFDRCxJQUFJLENBQUMsSUFBSSxHQUFHLEtBQUssQ0FBQztRQUN0QixDQUFDOzs7T0FBQTtJQU9ELHNCQUFJLDRDQUFHO2FBUVA7WUFDSSxPQUFPLElBQUksQ0FBQyxJQUFJLENBQUM7UUFDckIsQ0FBQzthQVZELFVBQVEsS0FBd0I7WUFDNUIsSUFBSSxPQUFPLEtBQUssS0FBSyxRQUFRLEVBQUU7Z0JBQzNCLElBQUksQ0FBQyxJQUFJLEdBQUcsV0FBVyxDQUFDLFNBQVMsQ0FBQyxLQUFLLEVBQUUsRUFBQyxNQUFNLEVBQUUsSUFBSSxDQUFDLE1BQU0sRUFBRSxNQUFNLEVBQUUsSUFBSSxDQUFDLE1BQU0sRUFBQyxDQUFDLENBQUM7Z0JBQ3JGLE9BQU87YUFDVjtZQUNELElBQUksQ0FBQyxJQUFJLEdBQUcsS0FBSyxDQUFDO1FBQ3RCLENBQUM7OztPQUFBO0lBT0Qsc0JBQUksb0RBQVc7YUFLZjtZQUNJLE9BQU8sSUFBSSxDQUFDLFlBQVksQ0FBQztRQUM3QixDQUFDO2FBUEQsVUFBZ0IsR0FBVztZQUN2QixJQUFJLENBQUMsWUFBWSxHQUFHLEdBQUcsQ0FBQztZQUN4QixJQUFJLENBQUMsYUFBYSxHQUFHLENBQUMsQ0FBQyxHQUFHLENBQUM7UUFDL0IsQ0FBQzs7O09BQUE7SUEyQkQsOENBQVEsR0FBUjtRQUFBLGlCQTBCQztRQXpCRyxJQUFJLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxXQUFXLENBQUMsQ0FBQztRQUVoQyxJQUFJLENBQUMsU0FBUyxHQUFHLG1CQUFtQixDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLENBQUM7UUFDNUQsSUFBSSxDQUFDLFdBQVcsR0FBRyxtQkFBbUIsQ0FBQyxVQUFVLEVBQUUsQ0FBQztRQUNwRCxJQUFJLENBQUMsY0FBYyxHQUFHLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxHQUFHLElBQUksSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDO1FBRS9DLElBQUksQ0FBQyxLQUFLLEdBQUcsSUFBSSxDQUFDLGlCQUFpQixDQUFDLFlBQVksQ0FBQyxJQUFJLENBQ2pELEdBQUcsQ0FBQyxVQUFDLFNBQXdCLElBQUssT0FBQSxLQUFJLENBQUMsWUFBWSxHQUFHLFNBQVMsQ0FBQyxJQUFJLEVBQWxDLENBQWtDLENBQUMsRUFDckUsR0FBRyxDQUFDLElBQUksQ0FBQyxzQkFBc0IsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUMsRUFDM0MsR0FBRyxDQUFDLGNBQU0sT0FBQSxLQUFJLENBQUMsY0FBYyxJQUFJLEtBQUksQ0FBQyxzQkFBc0IsRUFBRSxFQUFwRCxDQUFvRCxDQUFDLENBQ3JDLENBQUM7UUFDL0IsSUFBSSxDQUFDLE9BQU8sR0FBRyxJQUFJLENBQUMsaUJBQWlCLENBQUMsY0FBYyxDQUFDLElBQUksQ0FDckQsR0FBRyxDQUFDLElBQUksQ0FBQyxzQkFBc0IsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUMsRUFDM0MsR0FBRyxDQUFDLGNBQU0sT0FBQSxLQUFJLENBQUMsaUJBQWlCLEdBQUcsS0FBSyxFQUE5QixDQUE4QixDQUFDLENBQ2YsQ0FBQztRQUUvQixJQUFJLElBQUksQ0FBQyxNQUFNLEtBQUssRUFBRSxFQUFFO1lBQ3BCLElBQUksQ0FBQyxpQkFBaUIsQ0FBQyxjQUFjLENBQUMsSUFBSSxDQUN0QyxvQkFBb0IsRUFBYyxFQUNsQyxHQUFHLENBQUMsVUFBQyxNQUFrQixJQUFLLE9BQUEsS0FBSSxDQUFDLE1BQU0sR0FBRyxNQUFNLEVBQXBCLENBQW9CLENBQUMsRUFDakQsR0FBRyxDQUFDLFVBQUEsTUFBTSxJQUFJLE9BQUEsS0FBSSxDQUFDLHNCQUFzQixHQUFHLEtBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxNQUFNLENBQUMsRUFBM0QsQ0FBMkQsQ0FBQyxFQUMxRSxTQUFTLENBQUMsSUFBSSxDQUFDLFlBQVksQ0FBQyxDQUMvQixDQUFDLFNBQVMsQ0FBQyxjQUFNLE9BQUEsS0FBSSxDQUFDLGNBQWMsSUFBSSxLQUFJLENBQUMsbUJBQW1CLEVBQUUsRUFBakQsQ0FBaUQsQ0FBQyxDQUFDO1NBQ3hFO0lBRUwsQ0FBQztJQUVELGdEQUFVLEdBQVYsVUFBVyxHQUFXO1FBQ2xCLElBQUksR0FBRyxFQUFFO1lBQ0wsSUFBSSxDQUFDLFFBQVEsQ0FBQyxHQUFHLENBQUMsQ0FBQztTQUN0QjthQUFNO1lBQ0gsSUFBSSxDQUFDLFNBQVMsRUFBRSxDQUFDO1NBQ3BCO0lBQ0wsQ0FBQztJQUVELHVEQUFpQixHQUFqQixVQUFrQixFQUFPO0lBQ3pCLENBQUM7SUFFRCxzREFBZ0IsR0FBaEIsVUFBaUIsRUFBTztRQUNwQixJQUFJLENBQUMsUUFBUSxHQUFHLEVBQUUsQ0FBQztJQUN2QixDQUFDO0lBRUQsc0RBQWdCLEdBQWhCLFVBQWlCLFVBQW1CO1FBQ2hDLElBQUksQ0FBQyxRQUFRLEdBQUcsVUFBVSxDQUFDO0lBQy9CLENBQUM7SUFFRCxnREFBVSxHQUFWLFVBQVcsSUFBWTtRQUNuQixJQUFJLENBQUMsaUJBQWlCLENBQUMsSUFBSSxHQUFHLElBQUksQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLFVBQUEsQ0FBQyxJQUFJLE9BQUEsQ0FBQyxDQUFDLElBQUksS0FBSyxJQUFJLEVBQWYsQ0FBZSxDQUFDLENBQUM7UUFDeEUsSUFBSSxDQUFDLFVBQVUsRUFBRSxDQUFDO0lBQ3RCLENBQUM7SUFFRCxrREFBWSxHQUFaLFVBQWEsTUFBYztRQUN2QixJQUFJLENBQUMsaUJBQWlCLENBQUMsTUFBTSxHQUFHLElBQUksQ0FBQyxXQUFXLENBQUMsSUFBSSxDQUFDLFVBQUEsQ0FBQyxJQUFJLE9BQUEsQ0FBQyxDQUFDLElBQUksS0FBSyxNQUFNLEVBQWpCLENBQWlCLENBQUMsQ0FBQztRQUM5RSxJQUFJLENBQUMsVUFBVSxFQUFFLENBQUM7SUFDdEIsQ0FBQztJQUVELGtEQUFZLEdBQVosVUFBYSxNQUFrQjtRQUMzQixJQUFJLENBQUMsaUJBQWlCLENBQUMsTUFBTSxHQUFHLE1BQU0sQ0FBQztRQUN2QyxJQUFJLENBQUMsVUFBVSxFQUFFLENBQUM7SUFDdEIsQ0FBQztJQUVELCtDQUFTLEdBQVQsVUFBVSxJQUFZO1FBQ2xCLElBQUksQ0FBQyxVQUFVLENBQUMsSUFBSSxDQUFDLENBQUM7UUFDdEIsSUFBSSxDQUFDLG1CQUFtQixDQUFDLElBQUksQ0FBQyxDQUFDO0lBQ25DLENBQUM7SUFFRCxpREFBVyxHQUFYO1FBQ0ksSUFBSSxDQUFDLFlBQVksQ0FBQyxJQUFJLEVBQUUsQ0FBQztRQUN6QixJQUFJLENBQUMsWUFBWSxDQUFDLFFBQVEsRUFBRSxDQUFDO0lBQ2pDLENBQUM7SUFFTyxnREFBVSxHQUFsQjtRQUNJLElBQU0sSUFBSSxHQUFHLElBQUksQ0FBQyxpQkFBaUIsQ0FBQyxXQUFXLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDO1FBQzdELElBQUksQ0FBQyxjQUFjLEdBQUcsSUFBSSxDQUFDO1FBRTNCLElBQUksQ0FBQyxtQkFBbUIsQ0FBQyxJQUFJLENBQUMsQ0FBQztJQUNuQyxDQUFDO0lBRU8sK0NBQVMsR0FBakI7UUFDSSxJQUFJLENBQUMsaUJBQWlCLENBQUMsSUFBSSxHQUFHLEVBQUMsS0FBSyxFQUFFLENBQUMsRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFDLENBQUM7UUFDckQsSUFBSSxDQUFDLGlCQUFpQixDQUFDLE1BQU0sR0FBRyxFQUFDLEtBQUssRUFBRSxDQUFDLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBQyxDQUFDO0lBQzNELENBQUM7SUFFTyx5REFBbUIsR0FBM0IsVUFBNEIsSUFBWTtRQUNwQyxJQUFNLFNBQVMsR0FBRyxXQUFXLENBQUMsa0JBQWtCLENBQUMsSUFBSSxFQUFFLEVBQUMsTUFBTSxFQUFFLElBQUksQ0FBQyxNQUFNLEVBQUUsTUFBTSxFQUFFLElBQUksQ0FBQyxNQUFNLEVBQUMsQ0FBQyxDQUFDO1FBRW5HLElBQUksQ0FBQyxRQUFRLENBQUMsU0FBUyxDQUFDLENBQUM7UUFDekIsSUFBSSxDQUFDLFdBQVcsQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLENBQUM7SUFDckMsQ0FBQztJQUVPLDREQUFzQixHQUE5QixVQUErQixhQUE0QjtRQUN2RCxJQUFJLENBQUMsSUFBSSxDQUFDLGFBQWEsSUFBSSxJQUFJLENBQUMsaUJBQWlCLEVBQUU7WUFDL0MsNEJBQVcsYUFBYSxJQUFFLElBQUksRUFBRSxJQUFJLElBQUU7U0FDekM7UUFDRCxPQUFPLGFBQWEsQ0FBQztJQUN6QixDQUFDO0lBRU8sMERBQW9CLEdBQTVCO1FBQ0ksSUFBSSxDQUFDLFNBQVMsR0FBRyxtQkFBbUIsQ0FBQyxZQUFZLENBQUMsSUFBSSxDQUFDLFNBQVMsRUFBRTtZQUM5RCxHQUFHLEVBQUUsSUFBSSxDQUFDLEdBQWU7WUFDekIsR0FBRyxFQUFFLElBQUksQ0FBQyxHQUFlO1lBQ3pCLE1BQU0sRUFBRSxJQUFJLENBQUMsTUFBTTtZQUNuQixNQUFNLEVBQUUsSUFBSSxDQUFDLE1BQU07U0FDdEIsQ0FBQyxDQUFDO0lBQ1AsQ0FBQztJQUVPLDREQUFzQixHQUE5QjtRQUNJLElBQUksQ0FBQyxXQUFXLEdBQUcsbUJBQW1CLENBQUMsY0FBYyxDQUFDLElBQUksQ0FBQyxXQUFXLEVBQUUsSUFBSSxDQUFDLFlBQVksRUFBRTtZQUN2RixHQUFHLEVBQUUsSUFBSSxDQUFDLEdBQWU7WUFDekIsR0FBRyxFQUFFLElBQUksQ0FBQyxHQUFlO1lBQ3pCLE1BQU0sRUFBRSxJQUFJLENBQUMsTUFBTTtZQUNuQixNQUFNLEVBQUUsSUFBSSxDQUFDLE1BQU07U0FDdEIsQ0FBQyxDQUFDO0lBQ1AsQ0FBQztJQUVPLHlEQUFtQixHQUEzQjtRQUNJLElBQUksQ0FBQyxvQkFBb0IsRUFBRSxDQUFDO1FBQzVCLElBQUksSUFBSSxDQUFDLFlBQVksRUFBRTtZQUNuQixJQUFJLENBQUMsc0JBQXNCLEVBQUUsQ0FBQztTQUNqQztJQUNMLENBQUM7SUFFTyxnREFBVSxHQUFsQixVQUFtQixJQUFZO1FBQzNCLElBQUksSUFBSSxFQUFFO1lBQ04sSUFBTSxhQUFhLEdBQUcsV0FBVyxDQUFDLFVBQVUsQ0FBQyxJQUFJLEVBQUUsRUFBQyxNQUFNLEVBQUUsSUFBSSxDQUFDLE1BQU0sRUFBRSxNQUFNLEVBQUUsSUFBSSxDQUFDLE1BQU0sRUFBQyxDQUFDLENBQUM7WUFDL0YsSUFBSSxDQUFDLGlCQUFpQixDQUFDLHlCQUF5QixDQUFDLGFBQWEsRUFBRSxJQUFJLENBQUMsR0FBZSxFQUFFLElBQUksQ0FBQyxHQUFlLEVBQUUsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDO1lBQ3pILElBQUksQ0FBQyxjQUFjLEdBQUcsYUFBYSxDQUFDO1NBQ3ZDO0lBQ0wsQ0FBQztJQUVPLDhDQUFRLEdBQWhCLFVBQWlCLElBQUk7UUFDakIsSUFBTSxzQkFBc0IsR0FBRyxXQUFXO2FBQ3JDLGVBQWUsQ0FBQyxJQUFJLEVBQUUsSUFBSSxDQUFDLEdBQWUsRUFBRSxJQUFJLENBQUMsR0FBZSxFQUFFLFNBQVMsRUFBRSxJQUFJLEVBQUUsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDO1FBQ3JHLElBQUksQ0FBQyxzQkFBc0IsRUFBRTtZQUN6QixJQUFJLElBQUksQ0FBQyxHQUFHLEVBQUU7Z0JBQ1YsSUFBSSxDQUFDLFVBQVUsQ0FBQyxXQUFXLENBQUMsb0JBQW9CLENBQUMsSUFBSSxDQUFDLEdBQWUsRUFBRSxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQztnQkFDckYsT0FBTzthQUNWO1lBQ0QsSUFBSSxJQUFJLENBQUMsR0FBRyxFQUFFO2dCQUNWLElBQUksQ0FBQyxVQUFVLENBQUMsV0FBVyxDQUFDLG9CQUFvQixDQUFDLElBQUksQ0FBQyxHQUFlLEVBQUUsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUM7Z0JBQ3JGLE9BQU87YUFDVjtTQUNKO1FBQ0QsSUFBSSxDQUFDLFVBQVUsQ0FBQyxJQUFJLENBQUMsQ0FBQztJQUMxQixDQUFDO0lBRU8sc0RBQWdCLEdBQXhCLFVBQXlCLE1BQU07UUFDM0IsT0FBTyxtQkFBbUIsQ0FBQyxZQUFZLENBQUMsbUJBQW1CLENBQUMsUUFBUSxDQUFDLEVBQUUsQ0FBQyxFQUFFO1lBQ3RFLEdBQUcsRUFBRSxJQUFJLENBQUMsR0FBZTtZQUN6QixHQUFHLEVBQUUsSUFBSSxDQUFDLEdBQWU7WUFDekIsTUFBTSxFQUFFLEVBQUU7WUFDVixNQUFNLEVBQUUsTUFBTSxLQUFLLFVBQVUsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLFVBQVUsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLFVBQVUsQ0FBQyxFQUFFO1NBQ25FLENBQUMsQ0FBQyxLQUFLLENBQUMsVUFBQSxJQUFJLElBQUksT0FBQSxJQUFJLENBQUMsUUFBUSxFQUFiLENBQWEsQ0FBQyxDQUFDO0lBQ3BDLENBQUM7OztnQkE5SnNDLDRCQUE0Qjs2Q0FDdEQsTUFBTSxTQUFDLFdBQVc7O0lBaEZ0QjtRQUFSLEtBQUssRUFBRTtpRUFBbUI7SUFDbEI7UUFBUixLQUFLLEVBQUU7bUVBQTRDO0lBQzNDO1FBQVIsS0FBSyxFQUFFO29FQUF5QztJQUN4QztRQUFSLEtBQUssRUFBRTttRUFBd0M7SUFDdkM7UUFBUixLQUFLLEVBQUU7b0VBQXNCO0lBQ3JCO1FBQVIsS0FBSyxFQUFFO3NFQUFrQztJQUNqQztRQUFSLEtBQUssRUFBRTt1RUFBbUM7SUFHM0M7UUFEQyxLQUFLLEVBQUU7NkRBWVA7SUFPRDtRQURDLEtBQUssRUFBRTswREFPUDtJQU9EO1FBREMsS0FBSyxFQUFFOzBEQU9QO0lBT0Q7UUFEQyxLQUFLLEVBQUU7a0VBSVA7SUFNUztRQUFULE1BQU0sRUFBRTtvRUFBMEM7SUFoRjFDLDJCQUEyQjtRQWR2QyxTQUFTLENBQUM7WUFDUCxRQUFRLEVBQUUsc0JBQXNCO1lBQ2hDLDh2RkFBb0Q7WUFFcEQsU0FBUyxFQUFFO2dCQUNQLDRCQUE0QjtnQkFDNUI7b0JBQ0ksT0FBTyxFQUFFLGlCQUFpQjtvQkFDMUIsV0FBVyxFQUFFLDZCQUEyQjtvQkFDeEMsS0FBSyxFQUFFLElBQUk7aUJBQ2Q7YUFDSjtZQUNELGVBQWUsRUFBRSx1QkFBdUIsQ0FBQyxNQUFNOztTQUNsRCxDQUFDO1FBbUdlLG1CQUFBLE1BQU0sQ0FBQyxXQUFXLENBQUMsQ0FBQTtPQWxHdkIsMkJBQTJCLENBaVF2QztJQUFELGtDQUFDO0NBQUEsQUFqUUQsSUFpUUM7U0FqUVksMkJBQTJCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3ksIENvbXBvbmVudCwgRXZlbnRFbWl0dGVyLCBJbmplY3QsIElucHV0LCBPbkRlc3Ryb3ksIE9uSW5pdCwgT3V0cHV0LCBUZW1wbGF0ZVJlZiB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgQ29udHJvbFZhbHVlQWNjZXNzb3IsIE5HX1ZBTFVFX0FDQ0VTU09SIH0gZnJvbSAnQGFuZ3VsYXIvZm9ybXMnO1xuaW1wb3J0IHsgTmd4TWF0ZXJpYWxUaW1lcGlja2VyU2VydmljZSB9IGZyb20gJy4uLy4uL3NlcnZpY2VzL25neC1tYXRlcmlhbC10aW1lcGlja2VyLnNlcnZpY2UnO1xuaW1wb3J0IHsgT2JzZXJ2YWJsZSwgU3ViamVjdCB9IGZyb20gJ3J4anMnO1xuaW1wb3J0IHsgQ2xvY2tGYWNlVGltZSB9IGZyb20gJy4uLy4uL21vZGVscy9jbG9jay1mYWNlLXRpbWUuaW50ZXJmYWNlJztcbmltcG9ydCB7IFRpbWVQZXJpb2QgfSBmcm9tICcuLi8uLi9tb2RlbHMvdGltZS1wZXJpb2QuZW51bSc7XG5pbXBvcnQgeyBUaW1lVW5pdCB9IGZyb20gJy4uLy4uL21vZGVscy90aW1lLXVuaXQuZW51bSc7XG5pbXBvcnQgeyBOZ3hNYXRlcmlhbFRpbWVwaWNrZXJUaGVtZSB9IGZyb20gJy4uLy4uL21vZGVscy9uZ3gtbWF0ZXJpYWwtdGltZXBpY2tlci10aGVtZS5pbnRlcmZhY2UnO1xuaW1wb3J0IHsgVGltZUFkYXB0ZXIgfSBmcm9tICcuLi8uLi9zZXJ2aWNlcy90aW1lLWFkYXB0ZXInO1xuaW1wb3J0IHsgVElNRV9MT0NBTEUgfSBmcm9tICcuLi8uLi90b2tlbnMvdGltZS1sb2NhbGUudG9rZW4nO1xuaW1wb3J0IHsgVGltZXBpY2tlclRpbWVVdGlscyB9IGZyb20gJy4uLy4uL3V0aWxzL3RpbWVwaWNrZXItdGltZS51dGlscyc7XG5pbXBvcnQgeyBEYXRlVGltZSB9IGZyb20gJ2x1eG9uJztcbmltcG9ydCB7IGRpc3RpbmN0VW50aWxDaGFuZ2VkLCBtYXAsIHRha2VVbnRpbCwgdGFwIH0gZnJvbSAncnhqcy9vcGVyYXRvcnMnO1xuXG5AQ29tcG9uZW50KHtcbiAgICBzZWxlY3RvcjogJ25neC10aW1lcGlja2VyLWZpZWxkJyxcbiAgICB0ZW1wbGF0ZVVybDogJy4vbmd4LXRpbWVwaWNrZXItZmllbGQuY29tcG9uZW50Lmh0bWwnLFxuICAgIHN0eWxlVXJsczogWycuL25neC10aW1lcGlja2VyLWZpZWxkLmNvbXBvbmVudC5zY3NzJ10sXG4gICAgcHJvdmlkZXJzOiBbXG4gICAgICAgIE5neE1hdGVyaWFsVGltZXBpY2tlclNlcnZpY2UsXG4gICAgICAgIHtcbiAgICAgICAgICAgIHByb3ZpZGU6IE5HX1ZBTFVFX0FDQ0VTU09SLFxuICAgICAgICAgICAgdXNlRXhpc3Rpbmc6IE5neFRpbWVwaWNrZXJGaWVsZENvbXBvbmVudCxcbiAgICAgICAgICAgIG11bHRpOiB0cnVlXG4gICAgICAgIH1cbiAgICBdLFxuICAgIGNoYW5nZURldGVjdGlvbjogQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3kuT25QdXNoXG59KVxuZXhwb3J0IGNsYXNzIE5neFRpbWVwaWNrZXJGaWVsZENvbXBvbmVudCBpbXBsZW1lbnRzIE9uSW5pdCwgT25EZXN0cm95LCBDb250cm9sVmFsdWVBY2Nlc3NvciB7XG5cbiAgICBwZXJpb2Q6IFRpbWVQZXJpb2Q7XG4gICAgaG91ciQ6IE9ic2VydmFibGU8Q2xvY2tGYWNlVGltZT47XG4gICAgbWludXRlJDogT2JzZXJ2YWJsZTxDbG9ja0ZhY2VUaW1lPjtcblxuICAgIG1pbkhvdXIgPSAxO1xuICAgIG1heEhvdXIgPSAxMjtcblxuICAgIHRpbWVVbml0ID0gVGltZVVuaXQ7XG4gICAgdGltZXBpY2tlclRpbWU6IHN0cmluZztcblxuICAgIGhvdXJzTGlzdDogQ2xvY2tGYWNlVGltZVtdO1xuICAgIG1pbnV0ZXNMaXN0OiBDbG9ja0ZhY2VUaW1lW107XG5cbiAgICBpc1RpbWVSYW5nZVNldDogYm9vbGVhbjtcbiAgICBpc0NoYW5nZVBlcmlvZERpc2FibGVkOiBib29sZWFuO1xuXG4gICAgQElucHV0KCkgZGlzYWJsZWQ6IGJvb2xlYW47XG4gICAgQElucHV0KCkgdG9nZ2xlSWNvbjogVGVtcGxhdGVSZWY8SFRNTE9iamVjdEVsZW1lbnQ+O1xuICAgIEBJbnB1dCgpIGJ1dHRvbkFsaWduOiAncmlnaHQnIHwgJ2xlZnQnID0gJ3JpZ2h0JztcbiAgICBASW5wdXQoKSBjbG9ja1RoZW1lOiBOZ3hNYXRlcmlhbFRpbWVwaWNrZXJUaGVtZTtcbiAgICBASW5wdXQoKSBjb250cm9sT25seTogYm9vbGVhbjtcbiAgICBASW5wdXQoKSBjYW5jZWxCdG5UbXBsOiBUZW1wbGF0ZVJlZjxOb2RlPjtcbiAgICBASW5wdXQoKSBjb25maXJtQnRuVG1wbDogVGVtcGxhdGVSZWY8Tm9kZT47XG5cbiAgICBASW5wdXQoKVxuICAgIHNldCBmb3JtYXQodmFsdWU6IG51bWJlcikge1xuICAgICAgICB0aGlzLl9mb3JtYXQgPSB2YWx1ZSA9PT0gMjQgPyAyNCA6IDEyO1xuICAgICAgICB0aGlzLm1pbkhvdXIgPSB0aGlzLl9mb3JtYXQgPT09IDEyID8gMSA6IDA7XG4gICAgICAgIHRoaXMubWF4SG91ciA9IHRoaXMuX2Zvcm1hdCA9PT0gMTIgPyAxMiA6IDIzO1xuICAgICAgICB0aGlzLmhvdXJzTGlzdCA9IFRpbWVwaWNrZXJUaW1lVXRpbHMuZ2V0SG91cnModGhpcy5fZm9ybWF0KTtcbiAgICAgICAgY29uc3QgaXNEeW5hbWljYWxseUNoYW5nZWQgPSB2YWx1ZSAmJiAodGhpcy5wcmV2aW91c0Zvcm1hdCAmJiB0aGlzLnByZXZpb3VzRm9ybWF0ICE9PSB0aGlzLl9mb3JtYXQpO1xuXG4gICAgICAgIGlmIChpc0R5bmFtaWNhbGx5Q2hhbmdlZCkge1xuICAgICAgICAgICAgdGhpcy51cGRhdGVUaW1lKHRoaXMudGltZXBpY2tlclRpbWUpO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMucHJldmlvdXNGb3JtYXQgPSB0aGlzLl9mb3JtYXQ7XG4gICAgfVxuXG4gICAgZ2V0IGZvcm1hdCgpOiBudW1iZXIge1xuICAgICAgICByZXR1cm4gdGhpcy5fZm9ybWF0O1xuICAgIH1cblxuICAgIEBJbnB1dCgpXG4gICAgc2V0IG1pbih2YWx1ZTogc3RyaW5nIHwgRGF0ZVRpbWUpIHtcbiAgICAgICAgaWYgKHR5cGVvZiB2YWx1ZSA9PT0gJ3N0cmluZycpIHtcbiAgICAgICAgICAgIHRoaXMuX21pbiA9IFRpbWVBZGFwdGVyLnBhcnNlVGltZSh2YWx1ZSwge2xvY2FsZTogdGhpcy5sb2NhbGUsIGZvcm1hdDogdGhpcy5mb3JtYXR9KTtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLl9taW4gPSB2YWx1ZTtcbiAgICB9XG5cbiAgICBnZXQgbWluKCk6IHN0cmluZyB8IERhdGVUaW1lIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX21pbjtcbiAgICB9XG5cbiAgICBASW5wdXQoKVxuICAgIHNldCBtYXgodmFsdWU6IHN0cmluZyB8IERhdGVUaW1lKSB7XG4gICAgICAgIGlmICh0eXBlb2YgdmFsdWUgPT09ICdzdHJpbmcnKSB7XG4gICAgICAgICAgICB0aGlzLl9tYXggPSBUaW1lQWRhcHRlci5wYXJzZVRpbWUodmFsdWUsIHtsb2NhbGU6IHRoaXMubG9jYWxlLCBmb3JtYXQ6IHRoaXMuZm9ybWF0fSk7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5fbWF4ID0gdmFsdWU7XG4gICAgfVxuXG4gICAgZ2V0IG1heCgpOiBzdHJpbmcgfCBEYXRlVGltZSB7XG4gICAgICAgIHJldHVybiB0aGlzLl9tYXg7XG4gICAgfVxuXG4gICAgQElucHV0KClcbiAgICBzZXQgZGVmYXVsdFRpbWUodmFsOiBzdHJpbmcpIHtcbiAgICAgICAgdGhpcy5fZGVmYXVsdFRpbWUgPSB2YWw7XG4gICAgICAgIHRoaXMuaXNEZWZhdWx0VGltZSA9ICEhdmFsO1xuICAgIH1cblxuICAgIGdldCBkZWZhdWx0VGltZSgpOiBzdHJpbmcge1xuICAgICAgICByZXR1cm4gdGhpcy5fZGVmYXVsdFRpbWU7XG4gICAgfVxuXG4gICAgQE91dHB1dCgpIHRpbWVDaGFuZ2VkID0gbmV3IEV2ZW50RW1pdHRlcjxzdHJpbmc+KCk7XG5cbiAgICBwcml2YXRlIF9kZWZhdWx0VGltZTogc3RyaW5nO1xuICAgIHByaXZhdGUgX2Zvcm1hdCA9IDEyO1xuICAgIHByaXZhdGUgX21pbjogc3RyaW5nIHwgRGF0ZVRpbWU7XG4gICAgcHJpdmF0ZSBfbWF4OiBzdHJpbmcgfCBEYXRlVGltZTtcbiAgICBwcml2YXRlIHByZXZpb3VzRm9ybWF0OiBudW1iZXI7XG5cbiAgICBwcml2YXRlIHVuc3Vic2NyaWJlJCA9IG5ldyBTdWJqZWN0KCk7XG5cbiAgICBwcml2YXRlIGlzRmlyc3RUaW1lQ2hhbmdlID0gdHJ1ZTtcbiAgICBwcml2YXRlIGlzRGVmYXVsdFRpbWU6IGJvb2xlYW47XG4gICAgcHJpdmF0ZSBzZWxlY3RlZEhvdXI6IG51bWJlcjtcblxuICAgIHByaXZhdGUgb25DaGFuZ2U6ICh2YWx1ZTogc3RyaW5nKSA9PiB2b2lkID0gKCkgPT4ge1xuICAgIH1cblxuICAgIGNvbnN0cnVjdG9yKHByaXZhdGUgdGltZXBpY2tlclNlcnZpY2U6IE5neE1hdGVyaWFsVGltZXBpY2tlclNlcnZpY2UsXG4gICAgICAgICAgICAgICAgQEluamVjdChUSU1FX0xPQ0FMRSkgcHJpdmF0ZSBsb2NhbGU6IHN0cmluZykge1xuICAgIH1cblxuICAgIG5nT25Jbml0KCkge1xuICAgICAgICB0aGlzLmluaXRUaW1lKHRoaXMuZGVmYXVsdFRpbWUpO1xuXG4gICAgICAgIHRoaXMuaG91cnNMaXN0ID0gVGltZXBpY2tlclRpbWVVdGlscy5nZXRIb3Vycyh0aGlzLl9mb3JtYXQpO1xuICAgICAgICB0aGlzLm1pbnV0ZXNMaXN0ID0gVGltZXBpY2tlclRpbWVVdGlscy5nZXRNaW51dGVzKCk7XG4gICAgICAgIHRoaXMuaXNUaW1lUmFuZ2VTZXQgPSAhISh0aGlzLm1pbiB8fCB0aGlzLm1heCk7XG5cbiAgICAgICAgdGhpcy5ob3VyJCA9IHRoaXMudGltZXBpY2tlclNlcnZpY2Uuc2VsZWN0ZWRIb3VyLnBpcGUoXG4gICAgICAgICAgICB0YXAoKGNsb2NrVGltZTogQ2xvY2tGYWNlVGltZSkgPT4gdGhpcy5zZWxlY3RlZEhvdXIgPSBjbG9ja1RpbWUudGltZSksXG4gICAgICAgICAgICBtYXAodGhpcy5jaGFuZ2VEZWZhdWx0VGltZVZhbHVlLmJpbmQodGhpcykpLFxuICAgICAgICAgICAgdGFwKCgpID0+IHRoaXMuaXNUaW1lUmFuZ2VTZXQgJiYgdGhpcy51cGRhdGVBdmFpbGFibGVNaW51dGVzKCkpXG4gICAgICAgICkgYXMgT2JzZXJ2YWJsZTxDbG9ja0ZhY2VUaW1lPjtcbiAgICAgICAgdGhpcy5taW51dGUkID0gdGhpcy50aW1lcGlja2VyU2VydmljZS5zZWxlY3RlZE1pbnV0ZS5waXBlKFxuICAgICAgICAgICAgbWFwKHRoaXMuY2hhbmdlRGVmYXVsdFRpbWVWYWx1ZS5iaW5kKHRoaXMpKSxcbiAgICAgICAgICAgIHRhcCgoKSA9PiB0aGlzLmlzRmlyc3RUaW1lQ2hhbmdlID0gZmFsc2UpXG4gICAgICAgICkgYXMgT2JzZXJ2YWJsZTxDbG9ja0ZhY2VUaW1lPjtcblxuICAgICAgICBpZiAodGhpcy5mb3JtYXQgPT09IDEyKSB7XG4gICAgICAgICAgICB0aGlzLnRpbWVwaWNrZXJTZXJ2aWNlLnNlbGVjdGVkUGVyaW9kLnBpcGUoXG4gICAgICAgICAgICAgICAgZGlzdGluY3RVbnRpbENoYW5nZWQ8VGltZVBlcmlvZD4oKSxcbiAgICAgICAgICAgICAgICB0YXAoKHBlcmlvZDogVGltZVBlcmlvZCkgPT4gdGhpcy5wZXJpb2QgPSBwZXJpb2QpLFxuICAgICAgICAgICAgICAgIHRhcChwZXJpb2QgPT4gdGhpcy5pc0NoYW5nZVBlcmlvZERpc2FibGVkID0gdGhpcy5pc1BlcmlvZERpc2FibGVkKHBlcmlvZCkpLFxuICAgICAgICAgICAgICAgIHRha2VVbnRpbCh0aGlzLnVuc3Vic2NyaWJlJClcbiAgICAgICAgICAgICkuc3Vic2NyaWJlKCgpID0+IHRoaXMuaXNUaW1lUmFuZ2VTZXQgJiYgdGhpcy51cGRhdGVBdmFpbGFibGVUaW1lKCkpO1xuICAgICAgICB9XG5cbiAgICB9XG5cbiAgICB3cml0ZVZhbHVlKHZhbDogc3RyaW5nKTogdm9pZCB7XG4gICAgICAgIGlmICh2YWwpIHtcbiAgICAgICAgICAgIHRoaXMuaW5pdFRpbWUodmFsKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHRoaXMucmVzZXRUaW1lKCk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICByZWdpc3Rlck9uVG91Y2hlZChmbjogYW55KTogdm9pZCB7XG4gICAgfVxuXG4gICAgcmVnaXN0ZXJPbkNoYW5nZShmbjogYW55KTogdm9pZCB7XG4gICAgICAgIHRoaXMub25DaGFuZ2UgPSBmbjtcbiAgICB9XG5cbiAgICBzZXREaXNhYmxlZFN0YXRlKGlzRGlzYWJsZWQ6IGJvb2xlYW4pOiB2b2lkIHtcbiAgICAgICAgdGhpcy5kaXNhYmxlZCA9IGlzRGlzYWJsZWQ7XG4gICAgfVxuXG4gICAgY2hhbmdlSG91cihob3VyOiBudW1iZXIpOiB2b2lkIHtcbiAgICAgICAgdGhpcy50aW1lcGlja2VyU2VydmljZS5ob3VyID0gdGhpcy5ob3Vyc0xpc3QuZmluZChoID0+IGgudGltZSA9PT0gaG91cik7XG4gICAgICAgIHRoaXMuY2hhbmdlVGltZSgpO1xuICAgIH1cblxuICAgIGNoYW5nZU1pbnV0ZShtaW51dGU6IG51bWJlcik6IHZvaWQge1xuICAgICAgICB0aGlzLnRpbWVwaWNrZXJTZXJ2aWNlLm1pbnV0ZSA9IHRoaXMubWludXRlc0xpc3QuZmluZChtID0+IG0udGltZSA9PT0gbWludXRlKTtcbiAgICAgICAgdGhpcy5jaGFuZ2VUaW1lKCk7XG4gICAgfVxuXG4gICAgY2hhbmdlUGVyaW9kKHBlcmlvZDogVGltZVBlcmlvZCk6IHZvaWQge1xuICAgICAgICB0aGlzLnRpbWVwaWNrZXJTZXJ2aWNlLnBlcmlvZCA9IHBlcmlvZDtcbiAgICAgICAgdGhpcy5jaGFuZ2VUaW1lKCk7XG4gICAgfVxuXG4gICAgb25UaW1lU2V0KHRpbWU6IHN0cmluZyk6IHZvaWQge1xuICAgICAgICB0aGlzLnVwZGF0ZVRpbWUodGltZSk7XG4gICAgICAgIHRoaXMuZW1pdExvY2FsVGltZUNoYW5nZSh0aW1lKTtcbiAgICB9XG5cbiAgICBuZ09uRGVzdHJveSgpOiB2b2lkIHtcbiAgICAgICAgdGhpcy51bnN1YnNjcmliZSQubmV4dCgpO1xuICAgICAgICB0aGlzLnVuc3Vic2NyaWJlJC5jb21wbGV0ZSgpO1xuICAgIH1cblxuICAgIHByaXZhdGUgY2hhbmdlVGltZSgpOiB2b2lkIHtcbiAgICAgICAgY29uc3QgdGltZSA9IHRoaXMudGltZXBpY2tlclNlcnZpY2UuZ2V0RnVsbFRpbWUodGhpcy5mb3JtYXQpO1xuICAgICAgICB0aGlzLnRpbWVwaWNrZXJUaW1lID0gdGltZTtcblxuICAgICAgICB0aGlzLmVtaXRMb2NhbFRpbWVDaGFuZ2UodGltZSk7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSByZXNldFRpbWUoKTogdm9pZCB7XG4gICAgICAgIHRoaXMudGltZXBpY2tlclNlcnZpY2UuaG91ciA9IHthbmdsZTogMCwgdGltZTogbnVsbH07XG4gICAgICAgIHRoaXMudGltZXBpY2tlclNlcnZpY2UubWludXRlID0ge2FuZ2xlOiAwLCB0aW1lOiBudWxsfTtcbiAgICB9XG5cbiAgICBwcml2YXRlIGVtaXRMb2NhbFRpbWVDaGFuZ2UodGltZTogc3RyaW5nKTogdm9pZCB7XG4gICAgICAgIGNvbnN0IGxvY2FsVGltZSA9IFRpbWVBZGFwdGVyLnRvTG9jYWxlVGltZVN0cmluZyh0aW1lLCB7Zm9ybWF0OiB0aGlzLmZvcm1hdCwgbG9jYWxlOiB0aGlzLmxvY2FsZX0pO1xuXG4gICAgICAgIHRoaXMub25DaGFuZ2UobG9jYWxUaW1lKTtcbiAgICAgICAgdGhpcy50aW1lQ2hhbmdlZC5lbWl0KGxvY2FsVGltZSk7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBjaGFuZ2VEZWZhdWx0VGltZVZhbHVlKGNsb2NrRmFjZVRpbWU6IENsb2NrRmFjZVRpbWUpOiBDbG9ja0ZhY2VUaW1lIHtcbiAgICAgICAgaWYgKCF0aGlzLmlzRGVmYXVsdFRpbWUgJiYgdGhpcy5pc0ZpcnN0VGltZUNoYW5nZSkge1xuICAgICAgICAgICAgcmV0dXJuIHsuLi5jbG9ja0ZhY2VUaW1lLCB0aW1lOiBudWxsfTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gY2xvY2tGYWNlVGltZTtcbiAgICB9XG5cbiAgICBwcml2YXRlIHVwZGF0ZUF2YWlsYWJsZUhvdXJzKCk6IHZvaWQge1xuICAgICAgICB0aGlzLmhvdXJzTGlzdCA9IFRpbWVwaWNrZXJUaW1lVXRpbHMuZGlzYWJsZUhvdXJzKHRoaXMuaG91cnNMaXN0LCB7XG4gICAgICAgICAgICBtaW46IHRoaXMubWluIGFzIERhdGVUaW1lLFxuICAgICAgICAgICAgbWF4OiB0aGlzLm1heCBhcyBEYXRlVGltZSxcbiAgICAgICAgICAgIGZvcm1hdDogdGhpcy5mb3JtYXQsXG4gICAgICAgICAgICBwZXJpb2Q6IHRoaXMucGVyaW9kXG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIHByaXZhdGUgdXBkYXRlQXZhaWxhYmxlTWludXRlcygpOiB2b2lkIHtcbiAgICAgICAgdGhpcy5taW51dGVzTGlzdCA9IFRpbWVwaWNrZXJUaW1lVXRpbHMuZGlzYWJsZU1pbnV0ZXModGhpcy5taW51dGVzTGlzdCwgdGhpcy5zZWxlY3RlZEhvdXIsIHtcbiAgICAgICAgICAgIG1pbjogdGhpcy5taW4gYXMgRGF0ZVRpbWUsXG4gICAgICAgICAgICBtYXg6IHRoaXMubWF4IGFzIERhdGVUaW1lLFxuICAgICAgICAgICAgZm9ybWF0OiB0aGlzLmZvcm1hdCxcbiAgICAgICAgICAgIHBlcmlvZDogdGhpcy5wZXJpb2RcbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSB1cGRhdGVBdmFpbGFibGVUaW1lKCk6IHZvaWQge1xuICAgICAgICB0aGlzLnVwZGF0ZUF2YWlsYWJsZUhvdXJzKCk7XG4gICAgICAgIGlmICh0aGlzLnNlbGVjdGVkSG91cikge1xuICAgICAgICAgICAgdGhpcy51cGRhdGVBdmFpbGFibGVNaW51dGVzKCk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBwcml2YXRlIHVwZGF0ZVRpbWUodGltZTogc3RyaW5nKTogdm9pZCB7XG4gICAgICAgIGlmICh0aW1lKSB7XG4gICAgICAgICAgICBjb25zdCBmb3JtYXR0ZWRUaW1lID0gVGltZUFkYXB0ZXIuZm9ybWF0VGltZSh0aW1lLCB7bG9jYWxlOiB0aGlzLmxvY2FsZSwgZm9ybWF0OiB0aGlzLmZvcm1hdH0pO1xuICAgICAgICAgICAgdGhpcy50aW1lcGlja2VyU2VydmljZS5zZXREZWZhdWx0VGltZUlmQXZhaWxhYmxlKGZvcm1hdHRlZFRpbWUsIHRoaXMubWluIGFzIERhdGVUaW1lLCB0aGlzLm1heCBhcyBEYXRlVGltZSwgdGhpcy5mb3JtYXQpO1xuICAgICAgICAgICAgdGhpcy50aW1lcGlja2VyVGltZSA9IGZvcm1hdHRlZFRpbWU7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBwcml2YXRlIGluaXRUaW1lKHRpbWUpOiB2b2lkIHtcbiAgICAgICAgY29uc3QgaXNEZWZhdWx0VGltZUF2YWlsYWJsZSA9IFRpbWVBZGFwdGVyXG4gICAgICAgICAgICAuaXNUaW1lQXZhaWxhYmxlKHRpbWUsIHRoaXMubWluIGFzIERhdGVUaW1lLCB0aGlzLm1heCBhcyBEYXRlVGltZSwgJ21pbnV0ZXMnLCBudWxsLCB0aGlzLmZvcm1hdCk7XG4gICAgICAgIGlmICghaXNEZWZhdWx0VGltZUF2YWlsYWJsZSkge1xuICAgICAgICAgICAgaWYgKHRoaXMubWluKSB7XG4gICAgICAgICAgICAgICAgdGhpcy51cGRhdGVUaW1lKFRpbWVBZGFwdGVyLmZyb21EYXRlVGltZVRvU3RyaW5nKHRoaXMubWluIGFzIERhdGVUaW1lLCB0aGlzLmZvcm1hdCkpO1xuICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmICh0aGlzLm1heCkge1xuICAgICAgICAgICAgICAgIHRoaXMudXBkYXRlVGltZShUaW1lQWRhcHRlci5mcm9tRGF0ZVRpbWVUb1N0cmluZyh0aGlzLm1heCBhcyBEYXRlVGltZSwgdGhpcy5mb3JtYXQpKTtcbiAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy51cGRhdGVUaW1lKHRpbWUpO1xuICAgIH1cblxuICAgIHByaXZhdGUgaXNQZXJpb2REaXNhYmxlZChwZXJpb2QpOiBib29sZWFuIHtcbiAgICAgICAgcmV0dXJuIFRpbWVwaWNrZXJUaW1lVXRpbHMuZGlzYWJsZUhvdXJzKFRpbWVwaWNrZXJUaW1lVXRpbHMuZ2V0SG91cnMoMTIpLCB7XG4gICAgICAgICAgICBtaW46IHRoaXMubWluIGFzIERhdGVUaW1lLFxuICAgICAgICAgICAgbWF4OiB0aGlzLm1heCBhcyBEYXRlVGltZSxcbiAgICAgICAgICAgIGZvcm1hdDogMTIsXG4gICAgICAgICAgICBwZXJpb2Q6IHBlcmlvZCA9PT0gVGltZVBlcmlvZC5BTSA/IFRpbWVQZXJpb2QuUE0gOiBUaW1lUGVyaW9kLkFNXG4gICAgICAgIH0pLmV2ZXJ5KHRpbWUgPT4gdGltZS5kaXNhYmxlZCk7XG4gICAgfVxuXG59XG4iXX0=