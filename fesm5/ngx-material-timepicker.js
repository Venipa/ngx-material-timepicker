import { __decorate, __param, __assign, __extends } from 'tslib';
import { ɵɵdefineInjectable, Injectable, ComponentFactoryResolver, ApplicationRef, Injector, Optional, Inject, ɵɵinject, INJECTOR, InjectionToken, HostBinding, Input, HostListener, Component, EventEmitter, Output, Directive, ContentChild, ElementRef, ChangeDetectionStrategy, ViewChild, Pipe, Renderer2, NgModule } from '@angular/core';
import { DOCUMENT, CommonModule } from '@angular/common';
import { Subject, BehaviorSubject, merge } from 'rxjs';
import { shareReplay, takeUntil, filter, tap, map, distinctUntilChanged } from 'rxjs/operators';
import { trigger, transition, style, animate, sequence } from '@angular/animations';
import { DateTime, Info } from 'luxon';
import { NG_VALUE_ACCESSOR, FormsModule } from '@angular/forms';

var NgxMaterialTimepickerEventService = /** @class */ (function () {
    function NgxMaterialTimepickerEventService() {
        this.backdropClickSubject = new Subject();
        this.keydownEventSubject = new Subject();
    }
    Object.defineProperty(NgxMaterialTimepickerEventService.prototype, "backdropClick", {
        get: function () {
            return this.backdropClickSubject.asObservable().pipe(shareReplay({ bufferSize: 1, refCount: true }));
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(NgxMaterialTimepickerEventService.prototype, "keydownEvent", {
        get: function () {
            return this.keydownEventSubject.asObservable().pipe(shareReplay({ bufferSize: 1, refCount: true }));
        },
        enumerable: true,
        configurable: true
    });
    NgxMaterialTimepickerEventService.prototype.dispatchEvent = function (event) {
        switch (event.type) {
            case 'click':
                this.backdropClickSubject.next(event);
                break;
            case 'keydown':
                this.keydownEventSubject.next(event);
                break;
            default:
                throw new Error('no such event type');
        }
    };
    NgxMaterialTimepickerEventService.ngInjectableDef = ɵɵdefineInjectable({ factory: function NgxMaterialTimepickerEventService_Factory() { return new NgxMaterialTimepickerEventService(); }, token: NgxMaterialTimepickerEventService, providedIn: "root" });
    NgxMaterialTimepickerEventService = __decorate([
        Injectable({
            providedIn: 'root'
        })
    ], NgxMaterialTimepickerEventService);
    return NgxMaterialTimepickerEventService;
}());

var DomService = /** @class */ (function () {
    function DomService(cfr, appRef, injector, document) {
        this.cfr = cfr;
        this.appRef = appRef;
        this.injector = injector;
        this.document = document;
    }
    DomService.prototype.appendTimepickerToBody = function (timepicker, config) {
        var _this = this;
        this.componentRef = this.cfr
            .resolveComponentFactory(timepicker)
            .create(this.injector);
        Object.keys(config).forEach(function (key) { return (_this.componentRef.instance[key] = config[key]); });
        this.appRef.attachView(this.componentRef.hostView);
        var domElement = this.componentRef
            .hostView
            .rootNodes[0];
        this.document.body.appendChild(domElement);
    };
    DomService.prototype.destroyTimepicker = function () {
        this.componentRef.destroy();
        this.appRef.detachView(this.componentRef.hostView);
    };
    DomService.ctorParameters = function () { return [
        { type: ComponentFactoryResolver },
        { type: ApplicationRef },
        { type: Injector },
        { type: undefined, decorators: [{ type: Optional }, { type: Inject, args: [DOCUMENT,] }] }
    ]; };
    DomService.ngInjectableDef = ɵɵdefineInjectable({ factory: function DomService_Factory() { return new DomService(ɵɵinject(ComponentFactoryResolver), ɵɵinject(ApplicationRef), ɵɵinject(INJECTOR), ɵɵinject(DOCUMENT, 8)); }, token: DomService, providedIn: "root" });
    DomService = __decorate([
        Injectable({
            providedIn: "root",
        }),
        __param(3, Optional()), __param(3, Inject(DOCUMENT))
    ], DomService);
    return DomService;
}());

var TimeUnit;
(function (TimeUnit) {
    TimeUnit[TimeUnit["HOUR"] = 0] = "HOUR";
    TimeUnit[TimeUnit["MINUTE"] = 1] = "MINUTE";
})(TimeUnit || (TimeUnit = {}));

var TimePeriod;
(function (TimePeriod) {
    TimePeriod["AM"] = "AM";
    TimePeriod["PM"] = "PM";
})(TimePeriod || (TimePeriod = {}));

var TimeFormat;
(function (TimeFormat) {
    TimeFormat["TWELVE"] = "hh:mm a";
    TimeFormat["TWELVE_SHORT"] = "h:m a";
    TimeFormat["TWENTY_FOUR"] = "HH:mm";
    TimeFormat["TWENTY_FOUR_SHORT"] = "H:m";
})(TimeFormat || (TimeFormat = {}));

function isSameOrAfter(time, compareWith, unit) {
    if (unit === void 0) { unit = 'minutes'; }
    if (unit === 'hours') {
        return time.hour >= compareWith.hour;
    }
    if (unit === 'minutes') {
        return time.hasSame(compareWith, unit) || time.valueOf() > compareWith.valueOf();
    }
}
function isSameOrBefore(time, compareWith, unit) {
    if (unit === void 0) { unit = 'minutes'; }
    if (unit === 'hours') {
        return time.hour <= compareWith.hour;
    }
    if (unit === 'minutes') {
        return time.hasSame(compareWith, unit) || time.valueOf() <= compareWith.valueOf();
    }
}
function isBetween(time, before, after, unit) {
    if (unit === void 0) { unit = 'minutes'; }
    if (unit === 'hours') {
        return isSameOrBefore(time, after, unit) && isSameOrAfter(time, before, unit);
    }
    if (unit === 'minutes') {
        return isSameOrBefore(time, after) && isSameOrAfter(time, before);
    }
}
function isDigit(e) {
    // Allow: backspace, delete, tab, escape, enter
    if ([46, 8, 9, 27, 13].some(function (n) { return n === e.keyCode; }) ||
        // Allow: Ctrl/cmd+A
        (e.keyCode == 65 && (e.ctrlKey === true || e.metaKey === true)) ||
        // Allow: Ctrl/cmd+C
        (e.keyCode == 67 && (e.ctrlKey === true || e.metaKey === true)) ||
        // Allow: Ctrl/cmd+X
        (e.keyCode == 88 && (e.ctrlKey === true || e.metaKey === true)) ||
        // Allow: home, end, left, right, up, down
        (e.keyCode >= 35 && e.keyCode <= 40)) {
        return true;
    }
    return !((e.keyCode < 48 || e.keyCode > 57) && (e.keyCode < 96 || e.keyCode > 105));
}

// @dynamic
var TimeAdapter = /** @class */ (function () {
    function TimeAdapter() {
    }
    TimeAdapter.parseTime = function (time, opts) {
        var _a = TimeAdapter.getLocaleOptionsByTime(time, opts), numberingSystem = _a.numberingSystem, locale = _a.locale;
        var isPeriodExist = time.split(' ').length === 2;
        var timeMask = isPeriodExist ? TimeFormat.TWELVE_SHORT : TimeFormat.TWENTY_FOUR_SHORT;
        return DateTime.fromFormat(time, timeMask, { numberingSystem: numberingSystem, locale: locale });
    };
    TimeAdapter.formatTime = function (time, opts) {
        if (!time) {
            return 'Invalid Time';
        }
        var format = opts.format;
        var parsedTime = TimeAdapter.parseTime(time, opts).setLocale(TimeAdapter.DEFAULT_LOCALE);
        if (format !== 24) {
            return parsedTime.toLocaleString(__assign({}, DateTime.TIME_SIMPLE, { hour12: format !== 24, numberingSystem: TimeAdapter.DEFAULT_NUMBERING_SYSTEM })).replace(/\u200E/g, '');
        }
        return parsedTime.toISOTime({
            includeOffset: false,
            suppressMilliseconds: true,
            suppressSeconds: true
        }).replace(/\u200E/g, '');
    };
    TimeAdapter.toLocaleTimeString = function (time, opts) {
        if (opts === void 0) { opts = {}; }
        var _a = opts.format, format = _a === void 0 ? TimeAdapter.DEFAULT_FORMAT : _a, _b = opts.locale, locale = _b === void 0 ? TimeAdapter.DEFAULT_LOCALE : _b;
        var hourCycle = format === 24 ? 'h23' : 'h12';
        var timeFormat = __assign({}, DateTime.TIME_SIMPLE, { hourCycle: hourCycle });
        var timeMask = (format === 24) ? TimeFormat.TWENTY_FOUR_SHORT : TimeFormat.TWELVE_SHORT;
        return DateTime.fromFormat(time, timeMask).setLocale(locale).toLocaleString(timeFormat);
    };
    TimeAdapter.isTimeAvailable = function (time, min, max, granularity, minutesGap, format) {
        if (!time) {
            return;
        }
        var convertedTime = this.parseTime(time, { format: format });
        var minutes = convertedTime.minute;
        if (minutesGap && minutes === minutes && minutes % minutesGap !== 0) {
            throw new Error("Your minutes - " + minutes + " doesn't match your minutesGap - " + minutesGap);
        }
        var isAfter = (min && !max)
            && isSameOrAfter(convertedTime, min, granularity);
        var isBefore = (max && !min)
            && isSameOrBefore(convertedTime, max, granularity);
        var between = (min && max)
            && isBetween(convertedTime, min, max, granularity);
        var isAvailable = !min && !max;
        return isAfter || isBefore || between || isAvailable;
    };
    /***
     *  Format hour according to time format (12 or 24)
     */
    TimeAdapter.formatHour = function (currentHour, format, period) {
        if (format === 24) {
            return currentHour;
        }
        var hour = period === TimePeriod.AM ? currentHour : currentHour + 12;
        if (period === TimePeriod.AM && hour === 12) {
            return 0;
        }
        else if (period === TimePeriod.PM && hour === 24) {
            return 12;
        }
        return hour;
    };
    TimeAdapter.fromDateTimeToString = function (time, format) {
        var timeFormat = format === 24 ? TimeFormat.TWENTY_FOUR : TimeFormat.TWELVE;
        return time.reconfigure({
            numberingSystem: TimeAdapter.DEFAULT_NUMBERING_SYSTEM,
            locale: TimeAdapter.DEFAULT_LOCALE
        }).toFormat(timeFormat);
    };
    TimeAdapter.getLocaleOptionsByTime = function (time, opts) {
        var _a = DateTime.local().setLocale(opts.locale).resolvedLocaleOpts(), numberingSystem = _a.numberingSystem, locale = _a.locale;
        var localeConfig = { numberingSystem: numberingSystem, locale: locale };
        var defaultConfig = { numberingSystem: TimeAdapter.DEFAULT_NUMBERING_SYSTEM, locale: TimeAdapter.DEFAULT_LOCALE };
        return isNaN(parseInt(time, 10)) ? localeConfig : defaultConfig;
    };
    TimeAdapter.DEFAULT_FORMAT = 12;
    TimeAdapter.DEFAULT_LOCALE = 'en-US';
    TimeAdapter.DEFAULT_NUMBERING_SYSTEM = 'latn';
    return TimeAdapter;
}());

var DEFAULT_HOUR = {
    time: 12,
    angle: 360
};
var DEFAULT_MINUTE = {
    time: 0,
    angle: 360
};
var NgxMaterialTimepickerService = /** @class */ (function () {
    function NgxMaterialTimepickerService() {
        this.hourSubject = new BehaviorSubject(DEFAULT_HOUR);
        this.minuteSubject = new BehaviorSubject(DEFAULT_MINUTE);
        this.periodSubject = new BehaviorSubject(TimePeriod.AM);
    }
    Object.defineProperty(NgxMaterialTimepickerService.prototype, "hour", {
        set: function (hour) {
            this.hourSubject.next(hour);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(NgxMaterialTimepickerService.prototype, "selectedHour", {
        get: function () {
            return this.hourSubject.asObservable();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(NgxMaterialTimepickerService.prototype, "minute", {
        set: function (minute) {
            this.minuteSubject.next(minute);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(NgxMaterialTimepickerService.prototype, "selectedMinute", {
        get: function () {
            return this.minuteSubject.asObservable();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(NgxMaterialTimepickerService.prototype, "period", {
        set: function (period) {
            var isPeriodValid = (period === TimePeriod.AM) || (period === TimePeriod.PM);
            if (isPeriodValid) {
                this.periodSubject.next(period);
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(NgxMaterialTimepickerService.prototype, "selectedPeriod", {
        get: function () {
            return this.periodSubject.asObservable();
        },
        enumerable: true,
        configurable: true
    });
    NgxMaterialTimepickerService.prototype.setDefaultTimeIfAvailable = function (time, min, max, format, minutesGap) {
        /* Workaround to double error message*/
        try {
            if (TimeAdapter.isTimeAvailable(time, min, max, 'minutes', minutesGap)) {
                this.setDefaultTime(time, format);
            }
        }
        catch (e) {
            console.error(e);
        }
    };
    NgxMaterialTimepickerService.prototype.getFullTime = function (format) {
        var selectedHour = this.hourSubject.getValue().time;
        var selectedMinute = this.minuteSubject.getValue().time;
        var hour = selectedHour != null ? selectedHour : DEFAULT_HOUR.time;
        var minute = selectedMinute != null ? selectedMinute : DEFAULT_MINUTE.time;
        var period = format === 12 ? this.periodSubject.getValue() : '';
        var time = (hour + ":" + minute + " " + period).trim();
        return TimeAdapter.formatTime(time, { format: format });
    };
    NgxMaterialTimepickerService.prototype.setDefaultTime = function (time, format) {
        var defaultTime = TimeAdapter.parseTime(time, { format: format }).toJSDate();
        if (DateTime.fromJSDate(defaultTime).isValid) {
            var period = time.substr(time.length - 2).toUpperCase();
            var hour = defaultTime.getHours();
            this.hour = __assign({}, DEFAULT_HOUR, { time: formatHourByPeriod(hour, period) });
            this.minute = __assign({}, DEFAULT_MINUTE, { time: defaultTime.getMinutes() });
            this.period = period;
        }
        else {
            this.resetTime();
        }
    };
    NgxMaterialTimepickerService.prototype.resetTime = function () {
        this.hour = __assign({}, DEFAULT_HOUR);
        this.minute = __assign({}, DEFAULT_MINUTE);
        this.period = TimePeriod.AM;
    };
    NgxMaterialTimepickerService.ngInjectableDef = ɵɵdefineInjectable({ factory: function NgxMaterialTimepickerService_Factory() { return new NgxMaterialTimepickerService(); }, token: NgxMaterialTimepickerService, providedIn: "root" });
    NgxMaterialTimepickerService = __decorate([
        Injectable({
            providedIn: 'root'
        })
    ], NgxMaterialTimepickerService);
    return NgxMaterialTimepickerService;
}());
/***
 *  Format hour in 24hours format to meridian (AM or PM) format
 */
function formatHourByPeriod(hour, period) {
    switch (period) {
        case TimePeriod.AM:
            return hour === 0 ? 12 : hour;
        case TimePeriod.PM:
            return hour === 12 ? 12 : hour - 12;
        default:
            return hour;
    }
}

var TIME_LOCALE = new InjectionToken('TimeLocale', {
    providedIn: 'root',
    factory: function () { return TimeAdapter.DEFAULT_LOCALE; }
});

var AnimationState;
(function (AnimationState) {
    AnimationState["ENTER"] = "enter";
    AnimationState["LEAVE"] = "leave";
})(AnimationState || (AnimationState = {}));
var NgxMaterialTimepickerContainerComponent = /** @class */ (function () {
    function NgxMaterialTimepickerContainerComponent(timepickerService, eventService, locale) {
        this.timepickerService = timepickerService;
        this.eventService = eventService;
        this.locale = locale;
        this.timeUnit = TimeUnit;
        this.activeTimeUnit = TimeUnit.HOUR;
        this.unsubscribe = new Subject();
    }
    Object.defineProperty(NgxMaterialTimepickerContainerComponent.prototype, "class", {
        get: function () {
            return this.hostClass;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(NgxMaterialTimepickerContainerComponent.prototype, "defaultTime", {
        get: function () {
            return this._defaultTime;
        },
        set: function (time) {
            this._defaultTime = time;
            this.setDefaultTime(time);
        },
        enumerable: true,
        configurable: true
    });
    NgxMaterialTimepickerContainerComponent.prototype.onKeydown = function (e) {
        this.eventService.dispatchEvent(e);
        e.stopPropagation();
    };
    NgxMaterialTimepickerContainerComponent.prototype.ngOnInit = function () {
        this.animationState = !this.disableAnimation && AnimationState.ENTER;
        this.defineTime();
        this.selectedHour = this.timepickerService.selectedHour.pipe(shareReplay({ bufferSize: 1, refCount: true }));
        this.selectedMinute = this.timepickerService.selectedMinute.pipe(shareReplay({ bufferSize: 1, refCount: true }));
        this.selectedPeriod = this.timepickerService.selectedPeriod.pipe(shareReplay({ bufferSize: 1, refCount: true }));
        this.timepickerBaseRef.timeUpdated
            .pipe(takeUntil(this.unsubscribe))
            .subscribe(this.setDefaultTime.bind(this));
    };
    NgxMaterialTimepickerContainerComponent.prototype.onHourChange = function (hour) {
        this.timepickerService.hour = hour;
        this.onTimeChange();
    };
    NgxMaterialTimepickerContainerComponent.prototype.onHourSelected = function (hour) {
        if (!this.hoursOnly) {
            this.changeTimeUnit(TimeUnit.MINUTE);
        }
        this.timepickerBaseRef.hourSelected.next(hour);
    };
    NgxMaterialTimepickerContainerComponent.prototype.onMinuteChange = function (minute) {
        this.timepickerService.minute = minute;
        this.onTimeChange();
    };
    NgxMaterialTimepickerContainerComponent.prototype.changePeriod = function (period) {
        this.timepickerService.period = period;
        this.onTimeChange();
    };
    NgxMaterialTimepickerContainerComponent.prototype.changeTimeUnit = function (unit) {
        this.activeTimeUnit = unit;
    };
    NgxMaterialTimepickerContainerComponent.prototype.setTime = function () {
        this.timepickerBaseRef.timeSet.next(this.timepickerService.getFullTime(this.format));
        this.close();
    };
    NgxMaterialTimepickerContainerComponent.prototype.close = function () {
        if (this.disableAnimation) {
            this.timepickerBaseRef.close();
            return;
        }
        this.animationState = AnimationState.LEAVE;
    };
    NgxMaterialTimepickerContainerComponent.prototype.animationDone = function (event) {
        if (event.phaseName === "done" &&
            event.toState === AnimationState.LEAVE) {
            this.timepickerBaseRef.close();
        }
    };
    NgxMaterialTimepickerContainerComponent.prototype.ngOnDestroy = function () {
        this.unsubscribe.next();
        this.unsubscribe.complete();
    };
    NgxMaterialTimepickerContainerComponent.prototype.setDefaultTime = function (time) {
        this.timepickerService.setDefaultTimeIfAvailable(time, this.minTime, this.maxTime, this.format, this.minutesGap);
    };
    NgxMaterialTimepickerContainerComponent.prototype.defineTime = function () {
        var minTime = this.minTime;
        if (minTime && !this.time && !this.defaultTime) {
            var time = TimeAdapter.fromDateTimeToString(minTime, this.format);
            this.setDefaultTime(time);
        }
    };
    NgxMaterialTimepickerContainerComponent.prototype.onTimeChange = function () {
        var time = TimeAdapter.toLocaleTimeString(this.timepickerService.getFullTime(this.format), {
            locale: this.locale,
            format: this.format,
        });
        this.timepickerBaseRef.timeChanged.emit(time);
    };
    NgxMaterialTimepickerContainerComponent.ctorParameters = function () { return [
        { type: NgxMaterialTimepickerService },
        { type: NgxMaterialTimepickerEventService },
        { type: String, decorators: [{ type: Inject, args: [TIME_LOCALE,] }] }
    ]; };
    __decorate([
        HostBinding("class")
    ], NgxMaterialTimepickerContainerComponent.prototype, "class", null);
    __decorate([
        Input()
    ], NgxMaterialTimepickerContainerComponent.prototype, "defaultTime", null);
    __decorate([
        HostListener("keydown", ["$event"])
    ], NgxMaterialTimepickerContainerComponent.prototype, "onKeydown", null);
    NgxMaterialTimepickerContainerComponent = __decorate([
        Component({
            selector: "ngx-material-timepicker-container",
            template: "<div class=\"timepicker-backdrop-overlay\" [overlay]=\"preventOverlayClick\"\n     [ngClass]=\"{'timepicker-backdrop-overlay--transparent': appendToInput}\"></div>\n<div class=\"timepicker-overlay\">\n    <ngx-material-timepicker-content [appendToInput]=\"appendToInput\"\n                                     [inputElement]=\"inputElement\"\n                                     [ngxMaterialTimepickerTheme]=\"theme\">\n        <div class=\"timepicker\"\n             [@timepicker]=\"animationState\"\n             (@timepicker.done)=\"animationDone($event)\"\n             [ngClass]=\"timepickerClass\">\n            <header class=\"timepicker__header\">\n                <ngx-material-timepicker-dial [format]=\"format\" [hour]=\"(selectedHour | async)?.time\"\n                                              [minute]=\"(selectedMinute | async)?.time\"\n                                              [period]=\"selectedPeriod | async\"\n                                              [activeTimeUnit]=\"activeTimeUnit\"\n                                              [minTime]=\"minTime\"\n                                              [maxTime]=\"maxTime\"\n                                              [isEditable]=\"enableKeyboardInput\"\n                                              [editableHintTmpl]=\"editableHintTmpl\"\n                                              [minutesGap]=\"minutesGap\"\n                                              [hoursOnly]=\"hoursOnly\"\n                                              (periodChanged)=\"changePeriod($event)\"\n                                              (timeUnitChanged)=\"changeTimeUnit($event)\"\n                                              (hourChanged)=\"onHourChange($event)\"\n                                              (minuteChanged)=\"onMinuteChange($event)\"\n                ></ngx-material-timepicker-dial>\n            </header>\n            <div class=\"timepicker__main-content\">\n                <div class=\"timepicker__body\" [ngSwitch]=\"activeTimeUnit\">\n                    <div *ngSwitchCase=\"timeUnit.HOUR\">\n                        <ngx-material-timepicker-24-hours-face *ngIf=\"format === 24;else ampmHours\"\n                                                               (hourChange)=\"onHourChange($event)\"\n                                                               [selectedHour]=\"selectedHour | async\"\n                                                               [minTime]=\"minTime\"\n                                                               [maxTime]=\"maxTime\"\n                                                               [format]=\"format\"\n                                                               (hourSelected)=\"onHourSelected($event)\"></ngx-material-timepicker-24-hours-face>\n                        <ng-template #ampmHours>\n                            <ngx-material-timepicker-12-hours-face\n                                (hourChange)=\"onHourChange($event)\"\n                                [selectedHour]=\"selectedHour | async\"\n                                [period]=\"selectedPeriod | async\"\n                                [minTime]=\"minTime\"\n                                [maxTime]=\"maxTime\"\n                                (hourSelected)=\"onHourSelected($event)\"></ngx-material-timepicker-12-hours-face>\n                        </ng-template>\n                    </div>\n                    <ngx-material-timepicker-minutes-face *ngSwitchCase=\"timeUnit.MINUTE\"\n                                                          [selectedMinute]=\"selectedMinute | async\"\n                                                          [selectedHour]=\"(selectedHour | async)?.time\"\n                                                          [minTime]=\"minTime\"\n                                                          [maxTime]=\"maxTime\"\n                                                          [format]=\"format\"\n                                                          [period]=\"selectedPeriod | async\"\n                                                          [minutesGap]=\"minutesGap\"\n                                                          (minuteChange)=\"onMinuteChange($event)\"></ngx-material-timepicker-minutes-face>\n                </div>\n                <div class=\"timepicker__actions\">\n                    <div (click)=\"close()\">\n                        <!--suppress HtmlUnknownAttribute -->\n                        <ng-container\n                            *ngTemplateOutlet=\"cancelBtnTmpl ? cancelBtnTmpl : cancelBtnDefault\"></ng-container>\n                    </div>\n                    <div (click)=\"setTime()\">\n                        <!--suppress HtmlUnknownAttribute -->\n                        <ng-container\n                            *ngTemplateOutlet=\"confirmBtnTmpl ? confirmBtnTmpl : confirmBtnDefault\"></ng-container>\n                    </div>\n                </div>\n            </div>\n        </div>\n    </ngx-material-timepicker-content>\n</div>\n<ng-template #cancelBtnDefault>\n    <ngx-material-timepicker-button>Cancel</ngx-material-timepicker-button>\n</ng-template>\n<ng-template #confirmBtnDefault>\n    <ngx-material-timepicker-button>Ok</ngx-material-timepicker-button>\n</ng-template>\n",
            animations: [
                trigger("timepicker", [
                    transition("* => " + AnimationState.ENTER, [
                        style({ transform: "translateY(-30%)" }),
                        animate("0.2s ease-out", style({ transform: "translateY(0)" })),
                    ]),
                    transition(AnimationState.ENTER + " => " + AnimationState.LEAVE, [
                        style({ transform: "translateY(0)", opacity: 1 }),
                        animate("0.2s ease-out", style({ transform: "translateY(-30%)", opacity: 0 })),
                    ]),
                ]),
            ],
            providers: [NgxMaterialTimepickerService],
            styles: [".timepicker-backdrop-overlay{position:fixed;top:0;bottom:0;right:0;left:0;background-color:rgba(0,0,0,.3);z-index:999;pointer-events:auto}.timepicker-backdrop-overlay--transparent{background-color:transparent}.timepicker-overlay{position:fixed;top:0;left:0;width:100%;height:100%;display:flex;justify-content:center;align-items:center;z-index:999;pointer-events:none}.timepicker{width:300px;border-radius:2px;box-shadow:rgba(0,0,0,.25) 0 14px 45px,rgba(0,0,0,.22) 0 10px 18px;outline:0;position:static;z-index:999;pointer-events:auto}.timepicker__header{padding:15px 30px;background-color:#00bfff}@supports (background-color:var(--dial-background-color)){.timepicker__header{background-color:var(--dial-background-color)}}.timepicker__body{padding:15px 5px;display:flex;justify-content:center;align-items:center;background-color:#fff}@supports (background-color:var(--body-background-color)){.timepicker__body{background-color:var(--body-background-color)}}.timepicker__actions{display:flex;justify-content:flex-end;padding:15px;background-color:#fff}@supports (background-color:var(--body-background-color)){.timepicker__actions{background-color:var(--body-background-color)}}@media (max-device-width:1023px) and (orientation:landscape){.timepicker{display:flex;width:515px}.timepicker__header{display:flex;align-items:center}.timepicker__main-content{display:flex;flex-direction:column;width:100%}.timepicker__actions{padding:5px;margin-top:-1px}}"]
        }),
        __param(2, Inject(TIME_LOCALE))
    ], NgxMaterialTimepickerContainerComponent);
    return NgxMaterialTimepickerContainerComponent;
}());

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
    __decorate([
        Input()
    ], NgxMaterialTimepickerComponent.prototype, "hostClass", void 0);
    __decorate([
        Input()
    ], NgxMaterialTimepickerComponent.prototype, "cancelBtnTmpl", void 0);
    __decorate([
        Input()
    ], NgxMaterialTimepickerComponent.prototype, "editableHintTmpl", void 0);
    __decorate([
        Input()
    ], NgxMaterialTimepickerComponent.prototype, "confirmBtnTmpl", void 0);
    __decorate([
        Input('ESC')
    ], NgxMaterialTimepickerComponent.prototype, "isEsc", void 0);
    __decorate([
        Input()
    ], NgxMaterialTimepickerComponent.prototype, "enableKeyboardInput", void 0);
    __decorate([
        Input()
    ], NgxMaterialTimepickerComponent.prototype, "preventOverlayClick", void 0);
    __decorate([
        Input()
    ], NgxMaterialTimepickerComponent.prototype, "disableAnimation", void 0);
    __decorate([
        Input()
    ], NgxMaterialTimepickerComponent.prototype, "appendToInput", void 0);
    __decorate([
        Input()
    ], NgxMaterialTimepickerComponent.prototype, "hoursOnly", void 0);
    __decorate([
        Input()
    ], NgxMaterialTimepickerComponent.prototype, "defaultTime", void 0);
    __decorate([
        Input()
    ], NgxMaterialTimepickerComponent.prototype, "timepickerClass", void 0);
    __decorate([
        Input()
    ], NgxMaterialTimepickerComponent.prototype, "theme", void 0);
    __decorate([
        Input()
    ], NgxMaterialTimepickerComponent.prototype, "min", void 0);
    __decorate([
        Input()
    ], NgxMaterialTimepickerComponent.prototype, "max", void 0);
    __decorate([
        Input()
    ], NgxMaterialTimepickerComponent.prototype, "ngxMaterialTimepickerTheme", null);
    __decorate([
        Input()
    ], NgxMaterialTimepickerComponent.prototype, "format", null);
    __decorate([
        Input()
    ], NgxMaterialTimepickerComponent.prototype, "minutesGap", null);
    __decorate([
        Output()
    ], NgxMaterialTimepickerComponent.prototype, "timeSet", void 0);
    __decorate([
        Output()
    ], NgxMaterialTimepickerComponent.prototype, "opened", void 0);
    __decorate([
        Output()
    ], NgxMaterialTimepickerComponent.prototype, "closed", void 0);
    __decorate([
        Output()
    ], NgxMaterialTimepickerComponent.prototype, "hourSelected", void 0);
    __decorate([
        Output()
    ], NgxMaterialTimepickerComponent.prototype, "timeChanged", void 0);
    NgxMaterialTimepickerComponent = __decorate([
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

/* To override a default toggle icon */
var NgxMaterialTimepickerToggleIconDirective = /** @class */ (function () {
    function NgxMaterialTimepickerToggleIconDirective() {
    }
    NgxMaterialTimepickerToggleIconDirective = __decorate([
        Directive({ selector: '[ngxMaterialTimepickerToggleIcon]' })
    ], NgxMaterialTimepickerToggleIconDirective);
    return NgxMaterialTimepickerToggleIconDirective;
}());

var NgxMaterialTimepickerToggleComponent = /** @class */ (function () {
    function NgxMaterialTimepickerToggleComponent() {
    }
    Object.defineProperty(NgxMaterialTimepickerToggleComponent.prototype, "disabled", {
        get: function () {
            return this._disabled === undefined ? this.timepicker.disabled : this._disabled;
        },
        set: function (value) {
            this._disabled = value;
        },
        enumerable: true,
        configurable: true
    });
    NgxMaterialTimepickerToggleComponent.prototype.open = function (event) {
        if (this.timepicker) {
            this.timepicker.open();
            event.stopPropagation();
        }
    };
    __decorate([
        Input('for')
    ], NgxMaterialTimepickerToggleComponent.prototype, "timepicker", void 0);
    __decorate([
        Input()
    ], NgxMaterialTimepickerToggleComponent.prototype, "disabled", null);
    __decorate([
        ContentChild(NgxMaterialTimepickerToggleIconDirective, { static: true })
    ], NgxMaterialTimepickerToggleComponent.prototype, "customIcon", void 0);
    NgxMaterialTimepickerToggleComponent = __decorate([
        Component({
            selector: 'ngx-material-timepicker-toggle',
            template: "<button class=\"ngx-material-timepicker-toggle\" (click)=\"open($event)\" [disabled]=\"disabled\" type=\"button\">\n    <svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 24 24\" width=\"24px\" height=\"24px\" *ngIf=\"!customIcon\">\n        <path\n            d=\"M 12 2 C 6.4889971 2 2 6.4889971 2 12 C 2 17.511003                   6.4889971 22 12 22 C 17.511003 22 22 17.511003 22 12 C 22 6.4889971 17.511003 2 12 2 z M 12 4 C 16.430123 4 20 7.5698774 20 12 C 20 16.430123 16.430123 20 12 20 C 7.5698774 20 4 16.430123 4 12 C 4 7.5698774 7.5698774 4 12 4 z M 11 6 L 11 12.414062 L 15.292969 16.707031 L 16.707031 15.292969 L 13 11.585938 L 13 6 L 11 6 z\"/>\n    </svg>\n\n    <ng-content select=\"[ngxMaterialTimepickerToggleIcon]\"></ng-content>\n</button>\n",
            styles: [".ngx-material-timepicker-toggle{display:flex;justify-content:center;align-items:center;padding:4px;background-color:transparent;border-radius:50%;text-align:center;border:none;outline:0;-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none;transition:background-color .3s;cursor:pointer}.ngx-material-timepicker-toggle:focus{background-color:rgba(0,0,0,.07)}"]
        })
    ], NgxMaterialTimepickerToggleComponent);
    return NgxMaterialTimepickerToggleComponent;
}());

var TimepickerDirective = /** @class */ (function () {
    function TimepickerDirective(elementRef, locale) {
        this.elementRef = elementRef;
        this.locale = locale;
        this._format = 12;
        this._value = '';
        this.timepickerSubscriptions = [];
        this.onTouched = function () {
        };
        this.onChange = function () {
        };
    }
    TimepickerDirective_1 = TimepickerDirective;
    Object.defineProperty(TimepickerDirective.prototype, "format", {
        get: function () {
            return this._format;
        },
        set: function (value) {
            this._format = value === 24 ? 24 : 12;
            var isDynamicallyChanged = value && (this.previousFormat && this.previousFormat !== this._format);
            if (isDynamicallyChanged) {
                this.value = this._value;
                this._timepicker.updateTime(this._value);
            }
            this.previousFormat = this._format;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(TimepickerDirective.prototype, "min", {
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
    Object.defineProperty(TimepickerDirective.prototype, "max", {
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
    Object.defineProperty(TimepickerDirective.prototype, "timepicker", {
        set: function (picker) {
            this.registerTimepicker(picker);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(TimepickerDirective.prototype, "value", {
        get: function () {
            if (!this._value) {
                return '';
            }
            return TimeAdapter.toLocaleTimeString(this._value, { format: this.format, locale: this.locale });
        },
        set: function (value) {
            if (!value) {
                this._value = '';
                this.updateInputValue();
                return;
            }
            var time = TimeAdapter.formatTime(value, { locale: this.locale, format: this.format });
            var isAvailable = TimeAdapter.isTimeAvailable(time, this._min, this._max, 'minutes', this._timepicker.minutesGap, this._format);
            if (isAvailable) {
                this._value = time;
                this.updateInputValue();
                return;
            }
            console.warn('Selected time doesn\'t match min or max value');
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(TimepickerDirective.prototype, "element", {
        get: function () {
            return this.elementRef && this.elementRef.nativeElement;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(TimepickerDirective.prototype, "defaultTime", {
        set: function (time) {
            this._timepicker.defaultTime = TimeAdapter.formatTime(time, { locale: this.locale, format: this.format });
        },
        enumerable: true,
        configurable: true
    });
    TimepickerDirective.prototype.updateValue = function (value) {
        this.value = value;
        this.onChange(value);
    };
    TimepickerDirective.prototype.ngOnChanges = function (changes) {
        if (changes['value'] && changes['value'].currentValue) {
            this.defaultTime = changes['value'].currentValue;
        }
    };
    TimepickerDirective.prototype.onClick = function (event) {
        if (!this.disableClick) {
            this._timepicker.open();
            event.stopPropagation();
        }
    };
    TimepickerDirective.prototype.writeValue = function (value) {
        this.value = value;
        if (value) {
            this.defaultTime = value;
        }
    };
    TimepickerDirective.prototype.registerOnChange = function (fn) {
        this.onChange = fn;
    };
    TimepickerDirective.prototype.registerOnTouched = function (fn) {
        this.onTouched = fn;
    };
    TimepickerDirective.prototype.setDisabledState = function (isDisabled) {
        this.disabled = isDisabled;
    };
    TimepickerDirective.prototype.ngOnDestroy = function () {
        this.timepickerSubscriptions.forEach(function (s) { return s.unsubscribe(); });
    };
    TimepickerDirective.prototype.registerTimepicker = function (picker) {
        var _this = this;
        if (picker) {
            this._timepicker = picker;
            this._timepicker.registerInput(this);
            this.timepickerSubscriptions.push(this._timepicker.timeSet.subscribe(function (time) {
                _this.value = time;
                _this.onChange(_this.value);
                _this.onTouched();
                _this.defaultTime = _this._value;
            }));
        }
        else {
            throw new Error('NgxMaterialTimepickerComponent is not defined.' +
                ' Please make sure you passed the timepicker to ngxTimepicker directive');
        }
    };
    TimepickerDirective.prototype.updateInputValue = function () {
        this.elementRef.nativeElement.value = this.value;
    };
    var TimepickerDirective_1;
    TimepickerDirective.ctorParameters = function () { return [
        { type: ElementRef },
        { type: String, decorators: [{ type: Inject, args: [TIME_LOCALE,] }] }
    ]; };
    __decorate([
        Input()
    ], TimepickerDirective.prototype, "format", null);
    __decorate([
        Input()
    ], TimepickerDirective.prototype, "min", null);
    __decorate([
        Input()
    ], TimepickerDirective.prototype, "max", null);
    __decorate([
        Input('ngxTimepicker')
    ], TimepickerDirective.prototype, "timepicker", null);
    __decorate([
        Input()
    ], TimepickerDirective.prototype, "value", null);
    __decorate([
        Input()
    ], TimepickerDirective.prototype, "disabled", void 0);
    __decorate([
        Input()
    ], TimepickerDirective.prototype, "disableClick", void 0);
    __decorate([
        HostListener('click', ['$event'])
    ], TimepickerDirective.prototype, "onClick", null);
    TimepickerDirective = TimepickerDirective_1 = __decorate([
        Directive({
            selector: '[ngxTimepicker]',
            providers: [
                {
                    provide: NG_VALUE_ACCESSOR,
                    useExisting: TimepickerDirective_1,
                    multi: true
                }
            ],
            host: {
                '[disabled]': 'disabled',
                '(change)': 'updateValue($event.target.value)',
                '(blur)': 'onTouched()',
            },
        }),
        __param(1, Inject(TIME_LOCALE))
    ], TimepickerDirective);
    return TimepickerDirective;
}());

var NgxMaterialTimepickerThemeDirective = /** @class */ (function () {
    function NgxMaterialTimepickerThemeDirective(elementRef) {
        this.element = elementRef.nativeElement;
    }
    NgxMaterialTimepickerThemeDirective.prototype.ngAfterViewInit = function () {
        if (this.theme) {
            this.setTheme(this.theme);
        }
    };
    NgxMaterialTimepickerThemeDirective.prototype.setTheme = function (theme) {
        for (var val in theme) {
            if (theme.hasOwnProperty(val)) {
                if (typeof theme[val] === 'string') {
                    for (var prop in theme) {
                        if (theme.hasOwnProperty(prop)) {
                            this.element.style.setProperty("--" + camelCaseToDash(prop), theme[prop]);
                        }
                    }
                    return;
                }
                this.setTheme(theme[val]);
            }
        }
    };
    NgxMaterialTimepickerThemeDirective.ctorParameters = function () { return [
        { type: ElementRef }
    ]; };
    __decorate([
        Input('ngxMaterialTimepickerTheme')
    ], NgxMaterialTimepickerThemeDirective.prototype, "theme", void 0);
    NgxMaterialTimepickerThemeDirective = __decorate([
        Directive({ selector: '[ngxMaterialTimepickerTheme]' })
    ], NgxMaterialTimepickerThemeDirective);
    return NgxMaterialTimepickerThemeDirective;
}());
function camelCaseToDash(myStr) {
    return myStr.replace(/([a-z])([A-Z])/g, '$1-$2').toLowerCase();
}

// @dynamic
var TimepickerTimeUtils = /** @class */ (function () {
    function TimepickerTimeUtils() {
    }
    TimepickerTimeUtils.getHours = function (format) {
        return Array(format).fill(1).map(function (v, i) {
            var angleStep = 30;
            var time = v + i;
            var angle = angleStep * time;
            return { time: time === 24 ? 0 : time, angle: angle };
        });
    };
    TimepickerTimeUtils.disableHours = function (hours, config) {
        if (config.min || config.max) {
            return hours.map(function (value) {
                var hour = config.format === 24 ? value.time : TimeAdapter.formatHour(value.time, config.format, config.period);
                var currentTime = DateTime.fromObject({ hour: hour }).toFormat(TimeFormat.TWELVE);
                return __assign({}, value, { disabled: !TimeAdapter.isTimeAvailable(currentTime, config.min, config.max, 'hours') });
            });
        }
        return hours;
    };
    TimepickerTimeUtils.getMinutes = function (gap) {
        if (gap === void 0) { gap = 1; }
        var minutesCount = 60;
        var angleStep = 360 / minutesCount;
        var minutes = [];
        for (var i = 0; i < minutesCount; i++) {
            var angle = angleStep * i;
            if (i % gap === 0) {
                minutes.push({ time: i, angle: angle !== 0 ? angle : 360 });
            }
        }
        return minutes;
    };
    TimepickerTimeUtils.disableMinutes = function (minutes, selectedHour, config) {
        if (config.min || config.max) {
            var hour_1 = TimeAdapter.formatHour(selectedHour, config.format, config.period);
            return minutes.map(function (value) {
                var currentTime = DateTime.fromObject({ hour: hour_1, minute: value.time }).toFormat(TimeFormat.TWELVE);
                return __assign({}, value, { disabled: !TimeAdapter.isTimeAvailable(currentTime, config.min, config.max, 'minutes') });
            });
        }
        return minutes;
    };
    return TimepickerTimeUtils;
}());

var NgxMaterialTimepickerHoursFace = /** @class */ (function () {
    function NgxMaterialTimepickerHoursFace(format) {
        this.hourChange = new EventEmitter();
        this.hourSelected = new EventEmitter();
        this.hoursList = [];
        this.hoursList = TimepickerTimeUtils.getHours(format);
    }
    NgxMaterialTimepickerHoursFace.prototype.onTimeSelected = function (time) {
        this.hourSelected.next(time);
    };
    __decorate([
        Input()
    ], NgxMaterialTimepickerHoursFace.prototype, "selectedHour", void 0);
    __decorate([
        Input()
    ], NgxMaterialTimepickerHoursFace.prototype, "minTime", void 0);
    __decorate([
        Input()
    ], NgxMaterialTimepickerHoursFace.prototype, "maxTime", void 0);
    __decorate([
        Input()
    ], NgxMaterialTimepickerHoursFace.prototype, "format", void 0);
    __decorate([
        Output()
    ], NgxMaterialTimepickerHoursFace.prototype, "hourChange", void 0);
    __decorate([
        Output()
    ], NgxMaterialTimepickerHoursFace.prototype, "hourSelected", void 0);
    return NgxMaterialTimepickerHoursFace;
}());

var NgxMaterialTimepicker24HoursFaceComponent = /** @class */ (function (_super) {
    __extends(NgxMaterialTimepicker24HoursFaceComponent, _super);
    function NgxMaterialTimepicker24HoursFaceComponent() {
        return _super.call(this, 24) || this;
    }
    NgxMaterialTimepicker24HoursFaceComponent.prototype.ngAfterContentInit = function () {
        this.hoursList = TimepickerTimeUtils.disableHours(this.hoursList, {
            min: this.minTime,
            max: this.maxTime,
            format: this.format
        });
    };
    NgxMaterialTimepicker24HoursFaceComponent = __decorate([
        Component({
            selector: 'ngx-material-timepicker-24-hours-face',
            template: "<ngx-material-timepicker-face [selectedTime]=\"selectedHour\" [faceTime]=\"hoursList\" [format]=\"format\"\n                              (timeChange)=\"hourChange.next($event)\"\n                              (timeSelected)=\"onTimeSelected($event)\"></ngx-material-timepicker-face>\n",
            changeDetection: ChangeDetectionStrategy.OnPush
        })
    ], NgxMaterialTimepicker24HoursFaceComponent);
    return NgxMaterialTimepicker24HoursFaceComponent;
}(NgxMaterialTimepickerHoursFace));

var NgxMaterialTimepicker12HoursFaceComponent = /** @class */ (function (_super) {
    __extends(NgxMaterialTimepicker12HoursFaceComponent, _super);
    function NgxMaterialTimepicker12HoursFaceComponent() {
        return _super.call(this, 12) || this;
    }
    NgxMaterialTimepicker12HoursFaceComponent.prototype.ngOnChanges = function (changes) {
        if (changes['period'] && changes['period'].currentValue) {
            this.hoursList = TimepickerTimeUtils.disableHours(this.hoursList, {
                min: this.minTime,
                max: this.maxTime,
                format: this.format,
                period: this.period
            });
        }
    };
    __decorate([
        Input()
    ], NgxMaterialTimepicker12HoursFaceComponent.prototype, "period", void 0);
    NgxMaterialTimepicker12HoursFaceComponent = __decorate([
        Component({
            selector: 'ngx-material-timepicker-12-hours-face',
            template: "<ngx-material-timepicker-face [selectedTime]=\"selectedHour\" [faceTime]=\"hoursList\"\n                              (timeChange)=\"hourChange.next($event)\" (timeSelected)=\"onTimeSelected($event)\"></ngx-material-timepicker-face>\n",
            changeDetection: ChangeDetectionStrategy.OnPush
        })
    ], NgxMaterialTimepicker12HoursFaceComponent);
    return NgxMaterialTimepicker12HoursFaceComponent;
}(NgxMaterialTimepickerHoursFace));

var NgxMaterialTimepickerMinutesFaceComponent = /** @class */ (function () {
    function NgxMaterialTimepickerMinutesFaceComponent() {
        this.minutesList = [];
        this.timeUnit = TimeUnit;
        this.minuteChange = new EventEmitter();
    }
    NgxMaterialTimepickerMinutesFaceComponent.prototype.ngOnChanges = function (changes) {
        if (changes['period'] && changes['period'].currentValue) {
            var minutes = TimepickerTimeUtils.getMinutes(this.minutesGap);
            this.minutesList = TimepickerTimeUtils.disableMinutes(minutes, this.selectedHour, {
                min: this.minTime,
                max: this.maxTime,
                format: this.format,
                period: this.period
            });
        }
    };
    __decorate([
        Input()
    ], NgxMaterialTimepickerMinutesFaceComponent.prototype, "selectedMinute", void 0);
    __decorate([
        Input()
    ], NgxMaterialTimepickerMinutesFaceComponent.prototype, "selectedHour", void 0);
    __decorate([
        Input()
    ], NgxMaterialTimepickerMinutesFaceComponent.prototype, "period", void 0);
    __decorate([
        Input()
    ], NgxMaterialTimepickerMinutesFaceComponent.prototype, "minTime", void 0);
    __decorate([
        Input()
    ], NgxMaterialTimepickerMinutesFaceComponent.prototype, "maxTime", void 0);
    __decorate([
        Input()
    ], NgxMaterialTimepickerMinutesFaceComponent.prototype, "format", void 0);
    __decorate([
        Input()
    ], NgxMaterialTimepickerMinutesFaceComponent.prototype, "minutesGap", void 0);
    __decorate([
        Output()
    ], NgxMaterialTimepickerMinutesFaceComponent.prototype, "minuteChange", void 0);
    NgxMaterialTimepickerMinutesFaceComponent = __decorate([
        Component({
            selector: 'ngx-material-timepicker-minutes-face',
            template: "<ngx-material-timepicker-face [faceTime]=\"minutesList\" [selectedTime]=\"selectedMinute\"\n                              [minutesGap]=\"minutesGap\"\n                              (timeChange)=\"minuteChange.next($event)\" [unit]=\"timeUnit.MINUTE\"></ngx-material-timepicker-face>\n"
        })
    ], NgxMaterialTimepickerMinutesFaceComponent);
    return NgxMaterialTimepickerMinutesFaceComponent;
}());

var CLOCK_HAND_STYLES = {
    small: {
        height: '75px',
        top: 'calc(50% - 75px)'
    },
    large: {
        height: '103px',
        top: 'calc(50% - 103px)'
    }
};
var NgxMaterialTimepickerFaceComponent = /** @class */ (function () {
    function NgxMaterialTimepickerFaceComponent() {
        this.timeUnit = TimeUnit;
        this.innerClockFaceSize = 85;
        this.timeChange = new EventEmitter();
        this.timeSelected = new EventEmitter();
    }
    NgxMaterialTimepickerFaceComponent.prototype.ngAfterViewInit = function () {
        this.setClockHandPosition();
        this.addTouchEvents();
    };
    NgxMaterialTimepickerFaceComponent.prototype.ngOnChanges = function (changes) {
        var _this = this;
        var faceTimeChanges = changes['faceTime'];
        var selectedTimeChanges = changes['selectedTime'];
        if ((faceTimeChanges && faceTimeChanges.currentValue)
            && (selectedTimeChanges && selectedTimeChanges.currentValue)) {
            /* Set time according to passed an input value */
            this.selectedTime = this.faceTime.find(function (time) { return time.time === _this.selectedTime.time; });
        }
        if (selectedTimeChanges && selectedTimeChanges.currentValue) {
            this.setClockHandPosition();
        }
        if (faceTimeChanges && faceTimeChanges.currentValue) {
            // To avoid an error ExpressionChangedAfterItHasBeenCheckedError
            setTimeout(function () { return _this.selectAvailableTime(); });
        }
    };
    NgxMaterialTimepickerFaceComponent.prototype.trackByTime = function (_, time) {
        return time.time;
    };
    NgxMaterialTimepickerFaceComponent.prototype.onMousedown = function (e) {
        e.preventDefault();
        this.isStarted = true;
    };
    NgxMaterialTimepickerFaceComponent.prototype.selectTime = function (e) {
        if (!this.isStarted && (e instanceof MouseEvent && e.type !== 'click')) {
            return;
        }
        var clockFaceCords = this.clockFace.nativeElement.getBoundingClientRect();
        /* Get x0 and y0 of the circle */
        var centerX = clockFaceCords.left + clockFaceCords.width / 2;
        var centerY = clockFaceCords.top + clockFaceCords.height / 2;
        /* Counting the arctangent and convert it to from radian to deg */
        var arctangent = Math.atan(Math.abs(e.clientX - centerX) / Math.abs(e.clientY - centerY)) * 180 / Math.PI;
        /* Get angle according to quadrant */
        var circleAngle = countAngleByCords(centerX, centerY, e.clientX, e.clientY, arctangent);
        /* Check if selected time from the inner clock face (24 hours format only) */
        var isInnerClockChosen = this.format && this.isInnerClockFace(centerX, centerY, e.clientX, e.clientY);
        /* Round angle according to angle step */
        var angleStep = this.unit === TimeUnit.MINUTE ? (6 * (this.minutesGap || 1)) : 30;
        var roundedAngle = roundAngle(circleAngle, angleStep);
        var angle = (roundedAngle || 360) + (isInnerClockChosen ? 360 : 0);
        var selectedTime = this.faceTime.find(function (val) { return val.angle === angle; });
        if (selectedTime && !selectedTime.disabled) {
            this.timeChange.next(selectedTime);
            /* To let know whether user ended interaction with clock face */
            if (!this.isStarted) {
                this.timeSelected.next(selectedTime.time);
            }
        }
    };
    NgxMaterialTimepickerFaceComponent.prototype.onMouseup = function (e) {
        e.preventDefault();
        this.isStarted = false;
    };
    NgxMaterialTimepickerFaceComponent.prototype.ngOnDestroy = function () {
        this.removeTouchEvents();
    };
    NgxMaterialTimepickerFaceComponent.prototype.addTouchEvents = function () {
        this.touchStartHandler = this.onMousedown.bind(this);
        this.touchEndHandler = this.onMouseup.bind(this);
        this.clockFace.nativeElement.addEventListener('touchstart', this.touchStartHandler);
        this.clockFace.nativeElement.addEventListener('touchend', this.touchEndHandler);
    };
    NgxMaterialTimepickerFaceComponent.prototype.removeTouchEvents = function () {
        this.clockFace.nativeElement.removeEventListener('touchstart', this.touchStartHandler);
        this.clockFace.nativeElement.removeEventListener('touchend', this.touchEndHandler);
    };
    NgxMaterialTimepickerFaceComponent.prototype.setClockHandPosition = function () {
        if (this.format === 24) {
            if (this.selectedTime.time > 12 || this.selectedTime.time === 0) {
                this.decreaseClockHand();
            }
            else {
                this.increaseClockHand();
            }
        }
        this.clockHand.nativeElement.style.transform = "rotate(" + this.selectedTime.angle + "deg)";
    };
    NgxMaterialTimepickerFaceComponent.prototype.selectAvailableTime = function () {
        var _this = this;
        var currentTime = this.faceTime.find(function (time) { return _this.selectedTime.time === time.time; });
        this.isClockFaceDisabled = this.faceTime.every(function (time) { return time.disabled; });
        if ((currentTime && currentTime.disabled) && !this.isClockFaceDisabled) {
            var availableTime = this.faceTime.find(function (time) { return !time.disabled; });
            this.timeChange.next(availableTime);
        }
    };
    NgxMaterialTimepickerFaceComponent.prototype.isInnerClockFace = function (x0, y0, x, y) {
        /* Detect whether time from the inner clock face or not (24 format only) */
        return Math.sqrt(Math.pow(x - x0, 2) + Math.pow(y - y0, 2)) < this.innerClockFaceSize;
    };
    NgxMaterialTimepickerFaceComponent.prototype.decreaseClockHand = function () {
        this.clockHand.nativeElement.style.height = CLOCK_HAND_STYLES.small.height;
        this.clockHand.nativeElement.style.top = CLOCK_HAND_STYLES.small.top;
    };
    NgxMaterialTimepickerFaceComponent.prototype.increaseClockHand = function () {
        this.clockHand.nativeElement.style.height = CLOCK_HAND_STYLES.large.height;
        this.clockHand.nativeElement.style.top = CLOCK_HAND_STYLES.large.top;
    };
    __decorate([
        Input()
    ], NgxMaterialTimepickerFaceComponent.prototype, "faceTime", void 0);
    __decorate([
        Input()
    ], NgxMaterialTimepickerFaceComponent.prototype, "selectedTime", void 0);
    __decorate([
        Input()
    ], NgxMaterialTimepickerFaceComponent.prototype, "unit", void 0);
    __decorate([
        Input()
    ], NgxMaterialTimepickerFaceComponent.prototype, "format", void 0);
    __decorate([
        Input()
    ], NgxMaterialTimepickerFaceComponent.prototype, "minutesGap", void 0);
    __decorate([
        Output()
    ], NgxMaterialTimepickerFaceComponent.prototype, "timeChange", void 0);
    __decorate([
        Output()
    ], NgxMaterialTimepickerFaceComponent.prototype, "timeSelected", void 0);
    __decorate([
        ViewChild('clockFace', { static: true })
    ], NgxMaterialTimepickerFaceComponent.prototype, "clockFace", void 0);
    __decorate([
        ViewChild('clockHand', { static: true })
    ], NgxMaterialTimepickerFaceComponent.prototype, "clockHand", void 0);
    __decorate([
        HostListener('mousedown', ['$event'])
    ], NgxMaterialTimepickerFaceComponent.prototype, "onMousedown", null);
    __decorate([
        HostListener('click', ['$event']),
        HostListener('touchmove', ['$event.changedTouches[0]']),
        HostListener('touchend', ['$event.changedTouches[0]']),
        HostListener('mousemove', ['$event'])
    ], NgxMaterialTimepickerFaceComponent.prototype, "selectTime", null);
    __decorate([
        HostListener('mouseup', ['$event'])
    ], NgxMaterialTimepickerFaceComponent.prototype, "onMouseup", null);
    NgxMaterialTimepickerFaceComponent = __decorate([
        Component({
            selector: 'ngx-material-timepicker-face',
            template: "<div class=\"clock-face\" #clockFace>\n    <div *ngIf=\"unit !== timeUnit.MINUTE;else minutesFace\" class=\"clock-face__container\">\n        <div class=\"clock-face__number clock-face__number--outer\"\n             [ngStyle]=\"{'transform': 'rotateZ('+ time.angle +'deg) translateX(-50%)'}\"\n             *ngFor=\"let time of faceTime | slice: 0 : 12; trackBy: trackByTime\">\n\t\t\t<span [ngStyle]=\"{'transform': 'rotateZ(-'+ time.angle +'deg)'}\"\n                  [ngClass]=\"{'active': time.time | activeHour: selectedTime.time : isClockFaceDisabled,\n                   'disabled': time.disabled}\">\n                {{time.time | timeLocalizer: timeUnit.HOUR}}\n            </span>\n        </div>\n        <div class=\"clock-face__inner\" *ngIf=\"faceTime.length > 12\"\n             [style.top]=\"'calc(50% - ' + innerClockFaceSize + 'px)'\">\n            <div class=\"clock-face__number clock-face__number--inner\"\n                 [ngStyle]=\"{'transform': 'rotateZ('+ time.angle +'deg) translateX(-50%)'}\"\n                 [style.height.px]=\"innerClockFaceSize\"\n                 *ngFor=\"let time of faceTime | slice: 12 : 24; trackBy: trackByTime\">\n\t\t\t<span [ngStyle]=\"{'transform': 'rotateZ(-'+ time.angle +'deg)'}\"\n                  [ngClass]=\"{'active': time.time | activeHour: selectedTime?.time : isClockFaceDisabled,\n                   'disabled': time.disabled}\">\n                {{time.time | timeLocalizer: timeUnit.HOUR}}</span>\n            </div>\n        </div>\n    </div>\n\n    <span class=\"clock-face__clock-hand\" [ngClass]=\"{'clock-face__clock-hand_minute': unit === timeUnit.MINUTE}\"\n          #clockHand [hidden]=\"isClockFaceDisabled\"></span>\n</div>\n<ng-template #minutesFace>\n    <div class=\"clock-face__container\">\n        <div class=\"clock-face__number clock-face__number--outer\"\n             [ngStyle]=\"{'transform': 'rotateZ('+ time.angle +'deg) translateX(-50%)'}\"\n             *ngFor=\"let time of faceTime; trackBy: trackByTime\">\n\t<span [ngStyle]=\"{'transform': 'rotateZ(-'+ time.angle +'deg)'}\"\n          [ngClass]=\"{'active': time.time | activeMinute: selectedTime?.time:minutesGap:isClockFaceDisabled,\n           'disabled': time.disabled}\">\n\t{{time.time | minutesFormatter: minutesGap | timeLocalizer: timeUnit.MINUTE}}</span>\n        </div>\n    </div>\n</ng-template>\n",
            changeDetection: ChangeDetectionStrategy.OnPush,
            styles: [".clock-face{width:290px;height:290px;border-radius:50%;position:relative;display:flex;justify-content:center;padding:20px;box-sizing:border-box;background-color:#f0f0f0}@supports (background-color:var(--clock-face-background-color)){.clock-face{background-color:var(--clock-face-background-color)}}.clock-face__inner{position:absolute}.clock-face__container{margin-left:-2px}.clock-face__number{position:absolute;transform-origin:0 100%;width:50px;text-align:center;z-index:2}.clock-face__number--outer{height:calc(290px / 2 - 20px)}.clock-face__number--outer>span{font-size:16px;color:#6c6c6c}@supports (color:var(--clock-face-time-inactive-color)){.clock-face__number--outer>span{color:var(--clock-face-time-inactive-color)}}.clock-face__number--inner>span{font-size:14px;color:#929292}@supports (color:var(--clock-face-inner-time-inactive-color)){.clock-face__number--inner>span{color:var(--clock-face-inner-time-inactive-color)}}.clock-face__number>span{-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none;width:30px;height:30px;display:flex;justify-content:center;align-items:center;margin:auto;border-radius:50%;font-weight:500;font-family:Roboto,sans-serif}@supports (font-family:var(--primary-font-family)){.clock-face__number>span{font-family:var(--primary-font-family)}}.clock-face__number>span.active{background-color:#00bfff;color:#fff}@supports (background-color:var(--clock-hand-color)){.clock-face__number>span.active{background-color:var(--clock-hand-color);color:var(--clock-face-time-active-color)}}.clock-face__number>span.disabled{color:#c5c5c5}@supports (color:var(--clock-face-time-disabled-color)){.clock-face__number>span.disabled{color:var(--clock-face-time-disabled-color)}}.clock-face__clock-hand{height:103px;width:2px;transform-origin:0 100%;position:absolute;top:calc(50% - 103px);z-index:1;background-color:#00bfff}@supports (background-color:var(--clock-hand-color)){.clock-face__clock-hand{background-color:var(--clock-hand-color)}}.clock-face__clock-hand:after{content:'';width:7px;height:7px;border-radius:50%;background-color:inherit;position:absolute;bottom:-3px;left:-3.5px}.clock-face__clock-hand_minute:before{content:'';width:7px;height:7px;background-color:#fff;border-radius:50%;position:absolute;top:-8px;left:calc(50% - 8px);box-sizing:content-box;border:4px solid #00bfff}@supports (border-color:var(--clock-hand-color)){.clock-face__clock-hand_minute:before{border-color:var(--clock-hand-color)}}@media (max-device-width:1023px) and (orientation:landscape){.clock-face{width:225px;height:225px;padding:5px}.clock-face__number--outer{height:calc(225px / 2 - 5px)}.clock-face__clock-hand_minute:before{top:0}}"]
        })
    ], NgxMaterialTimepickerFaceComponent);
    return NgxMaterialTimepickerFaceComponent;
}());
function roundAngle(angle, step) {
    return Math.round(angle / step) * step;
}
function countAngleByCords(x0, y0, x, y, currentAngle) {
    if (y > y0 && x >= x0) { // II quarter
        return 180 - currentAngle;
    }
    else if (y > y0 && x < x0) { // III quarter
        return 180 + currentAngle;
    }
    else if (y < y0 && x < x0) { // IV quarter
        return 360 - currentAngle;
    }
    else { // I quarter
        return currentAngle;
    }
}

var NgxMaterialTimepickerButtonComponent = /** @class */ (function () {
    function NgxMaterialTimepickerButtonComponent() {
    }
    NgxMaterialTimepickerButtonComponent = __decorate([
        Component({
            selector: 'ngx-material-timepicker-button',
            template: "<button class=\"timepicker-button\" type=\"button\">\n  <span><ng-content></ng-content></span>\n</button>\n",
            styles: [".timepicker-button{display:inline-block;height:36px;min-width:88px;line-height:36px;border:12px;border-radius:2px;background-color:transparent;text-align:center;transition:450ms cubic-bezier(.23,1,.32,1);overflow:hidden;-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none;position:relative;cursor:pointer;outline:0;color:#00bfff}@supports (color:var(--button-color)){.timepicker-button{color:var(--button-color)}}.timepicker-button:focus,.timepicker-button:hover{background-color:rgba(153,153,153,.2)}.timepicker-button>span{font-size:14px;text-transform:uppercase;font-weight:600;padding-left:16px;padding-right:16px;font-family:Roboto,sans-serif}@supports (font-family:var(--primary-font-family)){.timepicker-button>span{font-family:var(--primary-font-family)}}"]
        })
    ], NgxMaterialTimepickerButtonComponent);
    return NgxMaterialTimepickerButtonComponent;
}());

var NgxMaterialTimepickerDialComponent = /** @class */ (function () {
    function NgxMaterialTimepickerDialComponent(locale) {
        this.locale = locale;
        this.timeUnit = TimeUnit;
        this.meridiems = Info.meridiems({ locale: this.locale });
        this.periodChanged = new EventEmitter();
        this.timeUnitChanged = new EventEmitter();
        this.hourChanged = new EventEmitter();
        this.minuteChanged = new EventEmitter();
    }
    NgxMaterialTimepickerDialComponent.prototype.ngOnChanges = function (changes) {
        if (changes['period'] && changes['period'].currentValue
            || changes['format'] && changes['format'].currentValue) {
            var hours = TimepickerTimeUtils.getHours(this.format);
            this.hours = TimepickerTimeUtils.disableHours(hours, {
                min: this.minTime,
                max: this.maxTime,
                format: this.format,
                period: this.period
            });
        }
        if (changes['period'] && changes['period'].currentValue
            || changes['hour'] && changes['hour'].currentValue) {
            var minutes = TimepickerTimeUtils.getMinutes(this.minutesGap);
            this.minutes = TimepickerTimeUtils.disableMinutes(minutes, +this.hour, {
                min: this.minTime,
                max: this.maxTime,
                format: this.format,
                period: this.period
            });
        }
    };
    NgxMaterialTimepickerDialComponent.prototype.changeTimeUnit = function (unit) {
        this.timeUnitChanged.next(unit);
    };
    NgxMaterialTimepickerDialComponent.prototype.changePeriod = function (period) {
        this.periodChanged.next(period);
    };
    NgxMaterialTimepickerDialComponent.prototype.changeHour = function (hour) {
        this.hourChanged.next(hour);
    };
    NgxMaterialTimepickerDialComponent.prototype.changeMinute = function (minute) {
        this.minuteChanged.next(minute);
    };
    NgxMaterialTimepickerDialComponent.prototype.showHint = function () {
        this.isHintVisible = true;
    };
    NgxMaterialTimepickerDialComponent.prototype.hideHint = function () {
        this.isHintVisible = false;
    };
    NgxMaterialTimepickerDialComponent.ctorParameters = function () { return [
        { type: String, decorators: [{ type: Inject, args: [TIME_LOCALE,] }] }
    ]; };
    __decorate([
        Input()
    ], NgxMaterialTimepickerDialComponent.prototype, "editableHintTmpl", void 0);
    __decorate([
        Input()
    ], NgxMaterialTimepickerDialComponent.prototype, "hour", void 0);
    __decorate([
        Input()
    ], NgxMaterialTimepickerDialComponent.prototype, "minute", void 0);
    __decorate([
        Input()
    ], NgxMaterialTimepickerDialComponent.prototype, "format", void 0);
    __decorate([
        Input()
    ], NgxMaterialTimepickerDialComponent.prototype, "period", void 0);
    __decorate([
        Input()
    ], NgxMaterialTimepickerDialComponent.prototype, "activeTimeUnit", void 0);
    __decorate([
        Input()
    ], NgxMaterialTimepickerDialComponent.prototype, "minTime", void 0);
    __decorate([
        Input()
    ], NgxMaterialTimepickerDialComponent.prototype, "maxTime", void 0);
    __decorate([
        Input()
    ], NgxMaterialTimepickerDialComponent.prototype, "isEditable", void 0);
    __decorate([
        Input()
    ], NgxMaterialTimepickerDialComponent.prototype, "minutesGap", void 0);
    __decorate([
        Input()
    ], NgxMaterialTimepickerDialComponent.prototype, "hoursOnly", void 0);
    __decorate([
        Output()
    ], NgxMaterialTimepickerDialComponent.prototype, "periodChanged", void 0);
    __decorate([
        Output()
    ], NgxMaterialTimepickerDialComponent.prototype, "timeUnitChanged", void 0);
    __decorate([
        Output()
    ], NgxMaterialTimepickerDialComponent.prototype, "hourChanged", void 0);
    __decorate([
        Output()
    ], NgxMaterialTimepickerDialComponent.prototype, "minuteChanged", void 0);
    NgxMaterialTimepickerDialComponent = __decorate([
        Component({
            selector: 'ngx-material-timepicker-dial',
            template: "<div class=\"timepicker-dial\">\n    <div class=\"timepicker-dial__container\">\n        <div class=\"timepicker-dial__time\">\n            <ngx-material-timepicker-dial-control [timeList]=\"hours\" [time]=\"hour\" [timeUnit]=\"timeUnit.HOUR\"\n                                                  [isActive]=\"activeTimeUnit === timeUnit.HOUR\"\n                                                  [isEditable]=\"isEditable\"\n                                                  (timeUnitChanged)=\"changeTimeUnit($event)\"\n                                                  (timeChanged)=\"changeHour($event)\"\n                                                  (focused)=\"showHint()\"\n                                                  (unfocused)=\"hideHint()\">\n\n            </ngx-material-timepicker-dial-control>\n            <span>:</span>\n            <ngx-material-timepicker-dial-control [timeList]=\"minutes\" [time]=\"minute\" [timeUnit]=\"timeUnit.MINUTE\"\n                                                  [isActive]=\"activeTimeUnit === timeUnit.MINUTE\"\n                                                  [isEditable]=\"isEditable\"\n                                                  [minutesGap]=\"minutesGap\"\n                                                  [disabled]=\"hoursOnly\"\n                                                  (timeUnitChanged)=\"changeTimeUnit($event)\"\n                                                  (timeChanged)=\"changeMinute($event)\"\n                                                  (focused)=\"showHint()\"\n                                                  (unfocused)=\"hideHint()\">\n\n            </ngx-material-timepicker-dial-control>\n        </div>\n        <ngx-material-timepicker-period class=\"timepicker-dial__period\"\n                                        [ngClass]=\"{'timepicker-dial__period--hidden': format === 24}\"\n                                        [selectedPeriod]=\"period\" [activeTimeUnit]=\"activeTimeUnit\"\n                                        [maxTime]=\"maxTime\" [minTime]=\"minTime\" [format]=\"format\"\n                                        [hours]=\"hours\" [minutes]=\"minutes\" [selectedHour]=\"hour\"\n                                        [meridiems]=\"meridiems\"\n                                        (periodChanged)=\"changePeriod($event)\"></ngx-material-timepicker-period>\n    </div>\n    <div *ngIf=\"isEditable || editableHintTmpl\" [ngClass]=\"{'timepicker-dial__hint-container--hidden': !isHintVisible}\">\n        <!--suppress HtmlUnknownAttribute -->\n        <ng-container *ngTemplateOutlet=\"editableHintTmpl ? editableHintTmpl : editableHintDefault\"></ng-container>\n        <ng-template #editableHintDefault>\n            <small class=\"timepicker-dial__hint\"> * use arrows (<span>&#8645;</span>) to change the time</small>\n        </ng-template>\n    </div>\n</div>\n",
            changeDetection: ChangeDetectionStrategy.OnPush,
            styles: [".timepicker-dial{text-align:right}.timepicker-dial__container{display:flex;align-items:center;justify-content:flex-end;-webkit-tap-highlight-color:transparent}.timepicker-dial__time{display:flex;align-items:baseline;line-height:normal;font-size:50px;color:rgba(255,255,255,.5);font-family:Roboto,sans-serif}@supports (font-family:var(--primary-font-family)){.timepicker-dial__time{font-family:var(--primary-font-family);color:var(--dial-inactive-color)}}.timepicker-dial__period{display:block;margin-left:10px}.timepicker-dial__hint-container--hidden,.timepicker-dial__period--hidden{visibility:hidden}.timepicker-dial__hint{display:inline-block;font-size:10px;color:#fff}@supports (color:var(--dial-active-color)){.timepicker-dial__hint{color:var(--dial-active-color)}}.timepicker-dial__hint span{font-size:14px}@media (max-device-width:1023px) and (orientation:landscape){.timepicker-dial__container{flex-direction:column}.timepicker-dial__period{margin-left:0}}"]
        }),
        __param(0, Inject(TIME_LOCALE))
    ], NgxMaterialTimepickerDialComponent);
    return NgxMaterialTimepickerDialComponent;
}());

var TimeParserPipe = /** @class */ (function () {
    function TimeParserPipe(locale) {
        this.locale = locale;
        this.numberingSystem = DateTime.local().setLocale(this.locale).resolvedLocaleOpts().numberingSystem;
    }
    TimeParserPipe.prototype.transform = function (time, timeUnit) {
        if (timeUnit === void 0) { timeUnit = TimeUnit.HOUR; }
        if (time == null || time === '') {
            return '';
        }
        if (!isNaN(+time)) {
            return time;
        }
        if (timeUnit === TimeUnit.MINUTE) {
            return this.parseTime(time, 'm', 'minute');
        }
        return this.parseTime(time, 'H', 'hour');
    };
    TimeParserPipe.prototype.parseTime = function (time, format, timeMeasure) {
        var parsedTime = DateTime.fromFormat(String(time), format, { numberingSystem: this.numberingSystem })[timeMeasure];
        if (!isNaN(parsedTime)) {
            return parsedTime;
        }
        throw new Error("Cannot parse time - " + time);
    };
    TimeParserPipe.ctorParameters = function () { return [
        { type: String, decorators: [{ type: Inject, args: [TIME_LOCALE,] }] }
    ]; };
    TimeParserPipe = __decorate([
        Pipe({
            name: 'timeParser'
        }),
        Injectable(),
        __param(0, Inject(TIME_LOCALE))
    ], TimeParserPipe);
    return TimeParserPipe;
}());

var NgxMaterialTimepickerDialControlComponent = /** @class */ (function () {
    function NgxMaterialTimepickerDialControlComponent(timeParserPipe) {
        this.timeParserPipe = timeParserPipe;
        this.timeUnitChanged = new EventEmitter();
        this.timeChanged = new EventEmitter();
        this.focused = new EventEmitter();
        this.unfocused = new EventEmitter();
    }
    Object.defineProperty(NgxMaterialTimepickerDialControlComponent.prototype, "selectedTime", {
        get: function () {
            var _this = this;
            if (!!this.time) {
                return this.timeList.find(function (t) { return t.time === +_this.time; });
            }
        },
        enumerable: true,
        configurable: true
    });
    NgxMaterialTimepickerDialControlComponent.prototype.saveTimeAndChangeTimeUnit = function (event, unit) {
        event.preventDefault();
        this.previousTime = this.time;
        this.timeUnitChanged.next(unit);
        this.focused.next();
    };
    NgxMaterialTimepickerDialControlComponent.prototype.updateTime = function () {
        var time = this.selectedTime;
        if (time) {
            this.timeChanged.next(time);
            this.previousTime = time.time;
        }
    };
    NgxMaterialTimepickerDialControlComponent.prototype.changeTimeByKeyboard = function (e) {
        var char = String.fromCharCode(e.keyCode);
        if (isTimeDisabledToChange(this.time, char, this.timeList)) {
            e.preventDefault();
        }
    };
    NgxMaterialTimepickerDialControlComponent.prototype.onKeydown = function (e) {
        if (!isDigit(e)) {
            e.preventDefault();
        }
        else {
            this.changeTimeByArrow(e.keyCode);
        }
    };
    NgxMaterialTimepickerDialControlComponent.prototype.onModelChange = function (value) {
        this.time = this.timeParserPipe.transform(value, this.timeUnit).toString();
    };
    NgxMaterialTimepickerDialControlComponent.prototype.changeTimeByArrow = function (keyCode) {
        var ARROW_UP = 38;
        var ARROW_DOWN = 40;
        var time;
        if (keyCode === ARROW_UP) {
            time = String(+this.time + (this.minutesGap || 1));
        }
        else if (keyCode === ARROW_DOWN) {
            time = String(+this.time - (this.minutesGap || 1));
        }
        if (!isTimeUnavailable(time, this.timeList)) {
            this.time = time;
            this.updateTime();
        }
    };
    NgxMaterialTimepickerDialControlComponent.ctorParameters = function () { return [
        { type: TimeParserPipe }
    ]; };
    __decorate([
        Input()
    ], NgxMaterialTimepickerDialControlComponent.prototype, "timeList", void 0);
    __decorate([
        Input()
    ], NgxMaterialTimepickerDialControlComponent.prototype, "timeUnit", void 0);
    __decorate([
        Input()
    ], NgxMaterialTimepickerDialControlComponent.prototype, "time", void 0);
    __decorate([
        Input()
    ], NgxMaterialTimepickerDialControlComponent.prototype, "isActive", void 0);
    __decorate([
        Input()
    ], NgxMaterialTimepickerDialControlComponent.prototype, "isEditable", void 0);
    __decorate([
        Input()
    ], NgxMaterialTimepickerDialControlComponent.prototype, "minutesGap", void 0);
    __decorate([
        Input()
    ], NgxMaterialTimepickerDialControlComponent.prototype, "disabled", void 0);
    __decorate([
        Output()
    ], NgxMaterialTimepickerDialControlComponent.prototype, "timeUnitChanged", void 0);
    __decorate([
        Output()
    ], NgxMaterialTimepickerDialControlComponent.prototype, "timeChanged", void 0);
    __decorate([
        Output()
    ], NgxMaterialTimepickerDialControlComponent.prototype, "focused", void 0);
    __decorate([
        Output()
    ], NgxMaterialTimepickerDialControlComponent.prototype, "unfocused", void 0);
    NgxMaterialTimepickerDialControlComponent = __decorate([
        Component({
            selector: 'ngx-material-timepicker-dial-control',
            template: "<!--suppress HtmlFormInputWithoutLabel, HtmlUnknownAttribute -->\n<input class=\"timepicker-dial__control timepicker-dial__item\"\n       [ngClass]=\"{'timepicker-dial__item_active': isActive}\"\n       [ngModel]=\"time | timeLocalizer: timeUnit\"\n       (ngModelChange)=\"time = $event\"\n       [disabled]=\"disabled\"\n       (input)=\"updateTime()\" (focus)=\"saveTimeAndChangeTimeUnit($event, timeUnit)\"\n       readonly [timepickerAutofocus]=\"isActive\"\n       *ngIf=\"!isEditable;else editableTemplate\">\n\n<ng-template #editableTemplate>\n    <!--suppress HtmlFormInputWithoutLabel, HtmlUnknownAttribute -->\n    <input class=\"timepicker-dial__control timepicker-dial__item timepicker-dial__control_editable\"\n           [ngClass]=\"{'timepicker-dial__item_active': isActive}\"\n           [ngModel]=\"time | timeParser: timeUnit | timeLocalizer: timeUnit : true\"\n           (ngModelChange)=\"onModelChange($event)\"\n           [disabled]=\"disabled\"\n           (input)=\"updateTime()\" (focus)=\"saveTimeAndChangeTimeUnit($event, timeUnit)\"\n           [timepickerAutofocus]=\"isActive\" (keydown)=\"onKeydown($event)\" (keypress)=\"changeTimeByKeyboard($event)\">\n</ng-template>\n",
            providers: [TimeParserPipe],
            styles: [".timepicker-dial__item{cursor:pointer;color:rgba(255,255,255,.5);font-family:Roboto,sans-serif}@supports (font-family:var(--primary-font-family)){.timepicker-dial__item{font-family:var(--primary-font-family);color:var(--dial-inactive-color)}}.timepicker-dial__item_active{color:#fff}@supports (color:var(--dial-active-color)){.timepicker-dial__item_active{color:var(--dial-active-color)}}.timepicker-dial__control{border:none;background-color:transparent;font-size:50px;width:60px;padding:0;border-radius:3px;text-align:right}.timepicker-dial__control_editable:focus{color:#00bfff;background-color:#fff;outline:#00bfff}@supports (color:var(--dial-editable-active-color)){.timepicker-dial__control_editable:focus{color:var(--dial-editable-active-color)}}@supports (background-color:var(--dial-editable-background-color)){.timepicker-dial__control_editable:focus{background-color:var(--dial-editable-background-color)}}@supports (outline:var(--dial-editable-active-color)){.timepicker-dial__control_editable:focus{outline:var(--dial-editable-active-color)}}.timepicker-dial__control:disabled{cursor:default}"]
        })
    ], NgxMaterialTimepickerDialControlComponent);
    return NgxMaterialTimepickerDialControlComponent;
}());
function isTimeDisabledToChange(currentTime, nextTime, timeList) {
    var isNumber = /\d/.test(nextTime);
    if (isNumber) {
        var time = currentTime + nextTime;
        return isTimeUnavailable(time, timeList);
    }
}
function isTimeUnavailable(time, timeList) {
    var selectedTime = timeList.find(function (value) { return value.time === +time; });
    return !selectedTime || (selectedTime && selectedTime.disabled);
}

var NgxMaterialTimepickerPeriodComponent = /** @class */ (function () {
    function NgxMaterialTimepickerPeriodComponent() {
        this.timePeriod = TimePeriod;
        this.isPeriodAvailable = true;
        this.periodChanged = new EventEmitter();
    }
    NgxMaterialTimepickerPeriodComponent.prototype.changePeriod = function (period) {
        this.isPeriodAvailable = this.isSwitchPeriodAvailable(period);
        if (this.isPeriodAvailable) {
            this.periodChanged.next(period);
        }
    };
    NgxMaterialTimepickerPeriodComponent.prototype.animationDone = function () {
        this.isPeriodAvailable = true;
    };
    NgxMaterialTimepickerPeriodComponent.prototype.isSwitchPeriodAvailable = function (period) {
        var time = this.getDisabledTimeByPeriod(period);
        return !time.every(function (t) { return t.disabled; });
    };
    NgxMaterialTimepickerPeriodComponent.prototype.getDisabledTimeByPeriod = function (period) {
        switch (this.activeTimeUnit) {
            case TimeUnit.HOUR:
                return TimepickerTimeUtils.disableHours(this.hours, {
                    min: this.minTime,
                    max: this.maxTime,
                    format: this.format,
                    period: period
                });
            case TimeUnit.MINUTE:
                return TimepickerTimeUtils.disableMinutes(this.minutes, +this.selectedHour, {
                    min: this.minTime,
                    max: this.maxTime,
                    format: this.format,
                    period: period
                });
            default:
                throw new Error('no such TimeUnit');
        }
    };
    __decorate([
        Input()
    ], NgxMaterialTimepickerPeriodComponent.prototype, "selectedPeriod", void 0);
    __decorate([
        Input()
    ], NgxMaterialTimepickerPeriodComponent.prototype, "format", void 0);
    __decorate([
        Input()
    ], NgxMaterialTimepickerPeriodComponent.prototype, "activeTimeUnit", void 0);
    __decorate([
        Input()
    ], NgxMaterialTimepickerPeriodComponent.prototype, "hours", void 0);
    __decorate([
        Input()
    ], NgxMaterialTimepickerPeriodComponent.prototype, "minutes", void 0);
    __decorate([
        Input()
    ], NgxMaterialTimepickerPeriodComponent.prototype, "minTime", void 0);
    __decorate([
        Input()
    ], NgxMaterialTimepickerPeriodComponent.prototype, "maxTime", void 0);
    __decorate([
        Input()
    ], NgxMaterialTimepickerPeriodComponent.prototype, "selectedHour", void 0);
    __decorate([
        Input()
    ], NgxMaterialTimepickerPeriodComponent.prototype, "meridiems", void 0);
    __decorate([
        Output()
    ], NgxMaterialTimepickerPeriodComponent.prototype, "periodChanged", void 0);
    NgxMaterialTimepickerPeriodComponent = __decorate([
        Component({
            selector: 'ngx-material-timepicker-period',
            template: "<div class=\"timepicker-period\">\n\t\t\t<button class=\"timepicker-dial__item timepicker-period__btn\"\n                  [ngClass]=\"{'timepicker-dial__item_active': selectedPeriod === timePeriod.AM}\"\n                  (click)=\"changePeriod(timePeriod.AM)\"\n                  type=\"button\">{{meridiems[0]}}</button>\n    <button class=\"timepicker-dial__item timepicker-period__btn\"\n          [ngClass]=\"{'timepicker-dial__item_active': selectedPeriod === timePeriod.PM}\"\n          (click)=\"changePeriod(timePeriod.PM)\"\n          type=\"button\">{{meridiems[1]}}</button>\n    <div class=\"timepicker-period__warning\" [@scaleInOut] (@scaleInOut.done)=\"animationDone()\" *ngIf=\"!isPeriodAvailable\">\n        <p>Current time would be invalid in this period.</p>\n    </div>\n</div>\n",
            animations: [
                trigger('scaleInOut', [
                    transition(':enter', [
                        style({ transform: 'scale(0)' }),
                        animate('.2s', style({ transform: 'scale(1)' })),
                        sequence([
                            animate('3s', style({ opacity: 1 })),
                            animate('.3s', style({ opacity: 0 }))
                        ])
                    ])
                ])
            ],
            styles: [".timepicker-dial__item{cursor:pointer;color:rgba(255,255,255,.5);font-family:Roboto,sans-serif}@supports (font-family:var(--primary-font-family)){.timepicker-dial__item{font-family:var(--primary-font-family);color:var(--dial-inactive-color)}}.timepicker-dial__item_active{color:#fff}@supports (color:var(--dial-active-color)){.timepicker-dial__item_active{color:var(--dial-active-color)}}.timepicker-period{display:flex;flex-direction:column;position:relative}.timepicker-period__btn{padding:1px 3px;border:0;background-color:transparent;font-size:18px;font-weight:500;-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none;outline:0;border-radius:3px;transition:background-color .5s;font-family:Roboto,sans-serif}.timepicker-period__btn:focus{background-color:rgba(0,0,0,.07)}.timepicker-period__warning{padding:5px 10px;border-radius:3px;background-color:rgba(0,0,0,.55);color:#fff;position:absolute;width:200px;left:-20px;top:40px}.timepicker-period__warning>p{margin:0;font-size:12px;font-family:Roboto,sans-serif}@supports (font-family:var(--primary-font-family)){.timepicker-period__btn,.timepicker-period__warning>p{font-family:var(--primary-font-family)}}"]
        })
    ], NgxMaterialTimepickerPeriodComponent);
    return NgxMaterialTimepickerPeriodComponent;
}());

var TimeFormatterPipe = /** @class */ (function () {
    function TimeFormatterPipe() {
    }
    TimeFormatterPipe.prototype.transform = function (time, timeUnit) {
        if (time == null || time === '') {
            return time;
        }
        switch (timeUnit) {
            case TimeUnit.HOUR:
                return DateTime.fromObject({ hour: +time }).toFormat('HH');
            case TimeUnit.MINUTE:
                return DateTime.fromObject({ minute: +time }).toFormat('mm');
            default:
                throw new Error('no such time unit');
        }
    };
    TimeFormatterPipe = __decorate([
        Pipe({
            name: 'timeFormatter'
        })
    ], TimeFormatterPipe);
    return TimeFormatterPipe;
}());

var OverlayDirective = /** @class */ (function () {
    function OverlayDirective(eventService) {
        this.eventService = eventService;
    }
    OverlayDirective.prototype.onClick = function (e) {
        if (!this.preventClick) {
            this.eventService.dispatchEvent(e);
        }
        e.preventDefault();
    };
    OverlayDirective.ctorParameters = function () { return [
        { type: NgxMaterialTimepickerEventService }
    ]; };
    __decorate([
        Input('overlay')
    ], OverlayDirective.prototype, "preventClick", void 0);
    __decorate([
        HostListener('click', ['$event'])
    ], OverlayDirective.prototype, "onClick", null);
    OverlayDirective = __decorate([
        Directive({
            selector: '[overlay]'
        })
    ], OverlayDirective);
    return OverlayDirective;
}());

var MinutesFormatterPipe = /** @class */ (function () {
    function MinutesFormatterPipe() {
    }
    MinutesFormatterPipe.prototype.transform = function (minute, gap) {
        if (gap === void 0) { gap = 5; }
        if (!minute) {
            return minute;
        }
        return minute % gap === 0 ? minute : '';
    };
    MinutesFormatterPipe = __decorate([
        Pipe({
            name: 'minutesFormatter'
        })
    ], MinutesFormatterPipe);
    return MinutesFormatterPipe;
}());

var AutofocusDirective = /** @class */ (function () {
    function AutofocusDirective(element, document) {
        this.element = element;
        this.document = document;
        this.activeElement = this.document.activeElement;
    }
    AutofocusDirective.prototype.ngOnChanges = function () {
        var _this = this;
        if (this.isFocusActive) {
            // To avoid ExpressionChangedAfterItHasBeenCheckedError;
            setTimeout(function () { return _this.element.nativeElement.focus({ preventScroll: true }); });
        }
    };
    AutofocusDirective.prototype.ngOnDestroy = function () {
        var _this = this;
        // To avoid ExpressionChangedAfterItHasBeenCheckedError;
        setTimeout(function () { return _this.activeElement.focus({ preventScroll: true }); });
    };
    AutofocusDirective.ctorParameters = function () { return [
        { type: ElementRef },
        { type: undefined, decorators: [{ type: Optional }, { type: Inject, args: [DOCUMENT,] }] }
    ]; };
    __decorate([
        Input('timepickerAutofocus')
    ], AutofocusDirective.prototype, "isFocusActive", void 0);
    AutofocusDirective = __decorate([
        Directive({
            selector: '[timepickerAutofocus]'
        }),
        __param(1, Optional()), __param(1, Inject(DOCUMENT))
    ], AutofocusDirective);
    return AutofocusDirective;
}());

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
            return __assign({}, clockFaceTime, { time: null });
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
    __decorate([
        Input()
    ], NgxTimepickerFieldComponent.prototype, "disabled", void 0);
    __decorate([
        Input()
    ], NgxTimepickerFieldComponent.prototype, "toggleIcon", void 0);
    __decorate([
        Input()
    ], NgxTimepickerFieldComponent.prototype, "buttonAlign", void 0);
    __decorate([
        Input()
    ], NgxTimepickerFieldComponent.prototype, "clockTheme", void 0);
    __decorate([
        Input()
    ], NgxTimepickerFieldComponent.prototype, "controlOnly", void 0);
    __decorate([
        Input()
    ], NgxTimepickerFieldComponent.prototype, "cancelBtnTmpl", void 0);
    __decorate([
        Input()
    ], NgxTimepickerFieldComponent.prototype, "confirmBtnTmpl", void 0);
    __decorate([
        Input()
    ], NgxTimepickerFieldComponent.prototype, "format", null);
    __decorate([
        Input()
    ], NgxTimepickerFieldComponent.prototype, "min", null);
    __decorate([
        Input()
    ], NgxTimepickerFieldComponent.prototype, "max", null);
    __decorate([
        Input()
    ], NgxTimepickerFieldComponent.prototype, "defaultTime", null);
    __decorate([
        Output()
    ], NgxTimepickerFieldComponent.prototype, "timeChanged", void 0);
    NgxTimepickerFieldComponent = NgxTimepickerFieldComponent_1 = __decorate([
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
        __param(1, Inject(TIME_LOCALE))
    ], NgxTimepickerFieldComponent);
    return NgxTimepickerFieldComponent;
}());

var NgxTimepickerTimeControlComponent = /** @class */ (function () {
    function NgxTimepickerTimeControlComponent(timeParser) {
        this.timeParser = timeParser;
        this.timeChanged = new EventEmitter();
    }
    NgxTimepickerTimeControlComponent.prototype.ngOnChanges = function (changes) {
        if (changes.timeList && this.time != null) {
            if (this.isSelectedTimeDisabled(this.time)) {
                this.setAvailableTime();
            }
        }
    };
    NgxTimepickerTimeControlComponent.prototype.changeTime = function (event) {
        event.stopPropagation();
        var char = String.fromCharCode(event.keyCode);
        var time = concatTime(String(this.time), char);
        this.changeTimeIfValid(time);
    };
    NgxTimepickerTimeControlComponent.prototype.onKeydown = function (event) {
        event.stopPropagation();
        if (!isDigit(event)) {
            event.preventDefault();
        }
        switch (event.key) {
            case 'ArrowUp':
                this.increase();
                break;
            case 'ArrowDown':
                this.decrease();
                break;
        }
        if (this.preventTyping && event.key !== 'Tab') {
            event.preventDefault();
        }
    };
    NgxTimepickerTimeControlComponent.prototype.increase = function () {
        if (!this.disabled) {
            var nextTime = +this.time + 1;
            if (nextTime > this.max) {
                nextTime = this.min;
            }
            if (this.isSelectedTimeDisabled(nextTime)) {
                nextTime = this.getAvailableTime(nextTime, this.getNextAvailableTime.bind(this));
            }
            if (nextTime !== this.time) {
                this.timeChanged.emit(nextTime);
            }
        }
    };
    NgxTimepickerTimeControlComponent.prototype.decrease = function () {
        if (!this.disabled) {
            var previousTime = +this.time - 1;
            if (previousTime < this.min) {
                previousTime = this.max;
            }
            if (this.isSelectedTimeDisabled(previousTime)) {
                previousTime = this.getAvailableTime(previousTime, this.getPrevAvailableTime.bind(this));
            }
            if (previousTime !== this.time) {
                this.timeChanged.emit(previousTime);
            }
        }
    };
    NgxTimepickerTimeControlComponent.prototype.onFocus = function () {
        this.isFocused = true;
        this.previousTime = this.time;
    };
    NgxTimepickerTimeControlComponent.prototype.onBlur = function () {
        this.isFocused = false;
        if (this.previousTime !== this.time) {
            this.changeTimeIfValid(+this.time);
        }
    };
    NgxTimepickerTimeControlComponent.prototype.onModelChange = function (value) {
        this.time = +this.timeParser.transform(value, this.timeUnit);
    };
    NgxTimepickerTimeControlComponent.prototype.changeTimeIfValid = function (value) {
        if (!isNaN(value)) {
            this.time = value;
            if (this.time > this.max) {
                var timeString = String(value);
                this.time = +timeString[timeString.length - 1];
            }
            if (this.time < this.min) {
                this.time = this.min;
            }
            this.timeChanged.emit(this.time);
        }
    };
    NgxTimepickerTimeControlComponent.prototype.isSelectedTimeDisabled = function (time) {
        return this.timeList.find(function (faceTime) { return faceTime.time === time; }).disabled;
    };
    NgxTimepickerTimeControlComponent.prototype.getNextAvailableTime = function (index) {
        var timeCollection = this.timeList;
        var maxValue = timeCollection.length;
        for (var i = index + 1; i < maxValue; i++) {
            var time = timeCollection[i];
            if (!time.disabled) {
                return time.time;
            }
        }
    };
    NgxTimepickerTimeControlComponent.prototype.getPrevAvailableTime = function (index) {
        for (var i = index; i >= 0; i--) {
            var time = this.timeList[i];
            if (!time.disabled) {
                return time.time;
            }
        }
    };
    NgxTimepickerTimeControlComponent.prototype.getAvailableTime = function (currentTime, fn) {
        var currentTimeIndex = this.timeList.findIndex(function (time) { return time.time === currentTime; });
        var availableTime = fn(currentTimeIndex);
        return availableTime != null ? availableTime : this.time;
    };
    NgxTimepickerTimeControlComponent.prototype.setAvailableTime = function () {
        this.time = this.timeList.find(function (t) { return !t.disabled; }).time;
        this.timeChanged.emit(this.time);
    };
    NgxTimepickerTimeControlComponent.ctorParameters = function () { return [
        { type: TimeParserPipe }
    ]; };
    __decorate([
        Input()
    ], NgxTimepickerTimeControlComponent.prototype, "time", void 0);
    __decorate([
        Input()
    ], NgxTimepickerTimeControlComponent.prototype, "min", void 0);
    __decorate([
        Input()
    ], NgxTimepickerTimeControlComponent.prototype, "max", void 0);
    __decorate([
        Input()
    ], NgxTimepickerTimeControlComponent.prototype, "placeholder", void 0);
    __decorate([
        Input()
    ], NgxTimepickerTimeControlComponent.prototype, "timeUnit", void 0);
    __decorate([
        Input()
    ], NgxTimepickerTimeControlComponent.prototype, "disabled", void 0);
    __decorate([
        Input()
    ], NgxTimepickerTimeControlComponent.prototype, "timeList", void 0);
    __decorate([
        Input()
    ], NgxTimepickerTimeControlComponent.prototype, "preventTyping", void 0);
    __decorate([
        Output()
    ], NgxTimepickerTimeControlComponent.prototype, "timeChanged", void 0);
    NgxTimepickerTimeControlComponent = __decorate([
        Component({
            selector: 'ngx-timepicker-time-control',
            template: "<div class=\"ngx-timepicker-control\" [ngClass]=\"{'ngx-timepicker-control--active': isFocused}\">\n    <!--suppress HtmlFormInputWithoutLabel -->\n    <input class=\"ngx-timepicker-control__input\"\n           maxlength=\"2\"\n           [ngModel]=\"time | timeParser: timeUnit | timeLocalizer: timeUnit : true\"\n           (ngModelChange)=\"onModelChange($event)\"\n           [placeholder]=\"placeholder\"\n           [disabled]=\"disabled\"\n           (keydown)=\"onKeydown($event)\"\n           (keypress)=\"changeTime($event)\"\n           (focus)=\"onFocus()\"\n           (blur)=\"onBlur()\">\n    <div class=\"ngx-timepicker-control__arrows\">\n            <span class=\"ngx-timepicker-control__arrow\" role=\"button\" (click)=\"increase()\">\n                &#9650;\n            </span>\n        <span class=\"ngx-timepicker-control__arrow\" role=\"button\" (click)=\"decrease()\">\n                &#9660;\n            </span>\n    </div>\n</div>\n",
            changeDetection: ChangeDetectionStrategy.OnPush,
            providers: [TimeParserPipe],
            styles: [".ngx-timepicker-control{position:relative;display:flex;width:60px;height:30px;padding:0 5px;box-sizing:border-box}.ngx-timepicker-control--active:after{content:'';position:absolute;bottom:-2px;left:0;width:100%;height:1px;background-color:#00bfff}.ngx-timepicker-control__input{width:100%;height:100%;padding:0 5px 0 0;border:0;font-size:1rem;color:inherit;outline:0;text-align:center}.ngx-timepicker-control__input:disabled{background-color:transparent}.ngx-timepicker-control__arrows{position:absolute;right:2px;top:0;display:flex;flex-direction:column}.ngx-timepicker-control__arrow{font-size:11px;color:rgba(0,0,0,.4);cursor:pointer;transition:color .2s;-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none}.ngx-timepicker-control__arrow:hover{color:rgba(0,0,0,.9)}"]
        })
    ], NgxTimepickerTimeControlComponent);
    return NgxTimepickerTimeControlComponent;
}());
function concatTime(currentTime, nextTime) {
    var isNumber = /\d/.test(nextTime);
    if (isNumber) {
        var time = currentTime + nextTime;
        return +time;
    }
}

var NgxTimepickerPeriodSelectorComponent = /** @class */ (function () {
    function NgxTimepickerPeriodSelectorComponent(locale) {
        this.locale = locale;
        this.periodSelected = new EventEmitter();
        this.period = TimePeriod;
        this.meridiems = Info.meridiems({ locale: this.locale });
    }
    Object.defineProperty(NgxTimepickerPeriodSelectorComponent.prototype, "selectedPeriod", {
        set: function (period) {
            if (period) {
                var periods = [TimePeriod.AM, TimePeriod.PM];
                this.localizedPeriod = this.meridiems[periods.indexOf(period)];
            }
        },
        enumerable: true,
        configurable: true
    });
    NgxTimepickerPeriodSelectorComponent.prototype.open = function () {
        if (!this.disabled) {
            this.isOpened = true;
        }
    };
    NgxTimepickerPeriodSelectorComponent.prototype.select = function (period) {
        this.periodSelected.next(period);
        this.isOpened = false;
    };
    NgxTimepickerPeriodSelectorComponent.prototype.backdropClick = function () {
        this.isOpened = false;
    };
    NgxTimepickerPeriodSelectorComponent.ctorParameters = function () { return [
        { type: String, decorators: [{ type: Inject, args: [TIME_LOCALE,] }] }
    ]; };
    __decorate([
        Input()
    ], NgxTimepickerPeriodSelectorComponent.prototype, "isOpened", void 0);
    __decorate([
        Input()
    ], NgxTimepickerPeriodSelectorComponent.prototype, "disabled", void 0);
    __decorate([
        Input()
    ], NgxTimepickerPeriodSelectorComponent.prototype, "selectedPeriod", null);
    __decorate([
        Output()
    ], NgxTimepickerPeriodSelectorComponent.prototype, "periodSelected", void 0);
    NgxTimepickerPeriodSelectorComponent = __decorate([
        Component({
            selector: 'ngx-timepicker-period-selector',
            template: "<div class=\"period\">\n    <div class=\"period-control\">\n        <button class=\"period-control__button period__btn--default\"\n                [ngClass]=\"{'period-control__button--disabled': disabled}\"\n                type=\"button\"\n                (click)=\"open()\">\n            <span>{{localizedPeriod}}</span>\n            <span class=\"period-control__arrow\">&#9660;</span>\n        </button>\n    </div>\n    <ul class=\"period-selector\" @scaleInOut *ngIf=\"isOpened\" [timepickerAutofocus]=\"true\">\n        <li>\n            <button class=\"period-selector__button period__btn--default\"\n                    type=\"button\"\n                    (click)=\"select(period.AM)\"\n                    [ngClass]=\"{'period-selector__button--active': localizedPeriod === meridiems[0]}\">{{meridiems[0]}}</button>\n        </li>\n        <li>\n            <button class=\"period-selector__button period__btn--default\"\n                    type=\"button\"\n                    (click)=\"select(period.PM)\"\n                    [ngClass]=\"{'period-selector__button--active': localizedPeriod === meridiems[1]}\">{{meridiems[1]}}</button>\n        </li>\n    </ul>\n</div>\n<div class=\"overlay\" (click)=\"backdropClick()\" *ngIf=\"isOpened\"></div>\n",
            changeDetection: ChangeDetectionStrategy.OnPush,
            animations: [
                trigger('scaleInOut', [
                    transition(':enter', [
                        style({ transform: 'scale(0)', opacity: 0 }),
                        animate(200, style({ transform: 'scale(1)', opacity: 1 }))
                    ]),
                    transition(':leave', [
                        animate(200, style({ transform: 'scale(0)', opacity: 0 }))
                    ])
                ])
            ],
            styles: [".period{position:relative}.period__btn--default{padding:0;border:none;background-color:transparent;cursor:pointer;text-align:left;-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none;-webkit-tap-highlight-color:transparent;outline:0}.period-control{position:relative}.period-control__button{position:relative;width:60px;font-size:1rem;color:inherit;text-align:center}.period-control__button:not(.period-control__button--disabled):focus:after{content:'';position:absolute;bottom:-8px;left:0;width:100%;height:1px;background-color:#00bfff}.period-control__arrow{margin-left:10px;font-size:12px;color:rgba(0,0,0,.4)}.period-selector{position:absolute;top:calc(50% - 50px);right:calc(-50% + -50px);max-width:135px;width:150px;padding:6px 0;margin:0;list-style:none;background-color:#f5f5f5;box-shadow:0 1px 3px 0 rgba(0,0,0,.2),0 1px 1px 0 rgba(0,0,0,.14),0 2px 1px -1px rgba(0,0,0,.12);z-index:201}.period-selector__button{width:100%;height:48px;padding:0 16px;line-height:48px}.period-selector__button--active{color:#00bfff}.period-selector__button:focus{background-color:#eee}.overlay{position:fixed;width:100%;height:100%;top:0;left:0;background-color:transparent;z-index:200}"]
        }),
        __param(0, Inject(TIME_LOCALE))
    ], NgxTimepickerPeriodSelectorComponent);
    return NgxTimepickerPeriodSelectorComponent;
}());

var TimeLocalizerPipe = /** @class */ (function () {
    function TimeLocalizerPipe(locale) {
        this.locale = locale;
    }
    TimeLocalizerPipe.prototype.transform = function (time, timeUnit, isKeyboardEnabled) {
        if (isKeyboardEnabled === void 0) { isKeyboardEnabled = false; }
        if (time == null || time === '') {
            return '';
        }
        switch (timeUnit) {
            case TimeUnit.HOUR: {
                var format = (time === 0 || isKeyboardEnabled) ? 'HH' : 'H';
                return this.formatTime('hour', time, format);
            }
            case TimeUnit.MINUTE:
                return this.formatTime('minute', time, 'mm');
            default:
                throw new Error("There is no Time Unit with type " + timeUnit);
        }
    };
    TimeLocalizerPipe.prototype.formatTime = function (timeMeasure, time, format) {
        var _a;
        try {
            return DateTime.fromObject((_a = {}, _a[timeMeasure] = +time, _a)).setLocale(this.locale).toFormat(format);
        }
        catch (_b) {
            throw new Error("Cannot format provided time - " + time + " to locale - " + this.locale);
        }
    };
    TimeLocalizerPipe.ctorParameters = function () { return [
        { type: String, decorators: [{ type: Inject, args: [TIME_LOCALE,] }] }
    ]; };
    TimeLocalizerPipe = __decorate([
        Pipe({
            name: 'timeLocalizer'
        }),
        __param(0, Inject(TIME_LOCALE))
    ], TimeLocalizerPipe);
    return TimeLocalizerPipe;
}());

var ActiveHourPipe = /** @class */ (function () {
    function ActiveHourPipe() {
    }
    ActiveHourPipe.prototype.transform = function (hour, currentHour, isClockFaceDisabled) {
        if (hour == null || isClockFaceDisabled) {
            return false;
        }
        return hour === currentHour;
    };
    ActiveHourPipe = __decorate([
        Pipe({
            name: 'activeHour'
        })
    ], ActiveHourPipe);
    return ActiveHourPipe;
}());

var ActiveMinutePipe = /** @class */ (function () {
    function ActiveMinutePipe() {
    }
    ActiveMinutePipe.prototype.transform = function (minute, currentMinute, gap, isClockFaceDisabled) {
        if (minute == null || isClockFaceDisabled) {
            return false;
        }
        var defaultGap = 5;
        return ((currentMinute === minute) && (minute % (gap || defaultGap) === 0));
    };
    ActiveMinutePipe = __decorate([
        Pipe({
            name: 'activeMinute'
        })
    ], ActiveMinutePipe);
    return ActiveMinutePipe;
}());

var NgxMaterialTimepickerContentComponent = /** @class */ (function () {
    function NgxMaterialTimepickerContentComponent() {
    }
    __decorate([
        Input()
    ], NgxMaterialTimepickerContentComponent.prototype, "appendToInput", void 0);
    __decorate([
        Input()
    ], NgxMaterialTimepickerContentComponent.prototype, "inputElement", void 0);
    NgxMaterialTimepickerContentComponent = __decorate([
        Component({
            selector: 'ngx-material-timepicker-content',
            template: "<div [ngxAppendToInput]=\"inputElement\" *ngIf=\"appendToInput;else timepickerModal\">\n    <!--suppress HtmlUnknownAttribute -->\n    <ng-container *ngTemplateOutlet=\"timepickerOutlet\"></ng-container>\n</div>\n\n<ng-template #timepickerModal>\n    <!--suppress HtmlUnknownAttribute -->\n    <ng-container *ngTemplateOutlet=\"timepickerOutlet\"></ng-container>\n</ng-template>\n\n<ng-template #timepickerOutlet>\n    <ng-content></ng-content>\n</ng-template>\n"
        })
    ], NgxMaterialTimepickerContentComponent);
    return NgxMaterialTimepickerContentComponent;
}());

var AppendToInputDirective = /** @class */ (function () {
    function AppendToInputDirective(elementRef, renderer) {
        this.renderer = renderer;
        this.element = elementRef.nativeElement;
    }
    Object.defineProperty(AppendToInputDirective.prototype, "inputCords", {
        get: function () {
            return this.inputElement.getBoundingClientRect();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AppendToInputDirective.prototype, "direction", {
        get: function () {
            var height = this.element.offsetHeight;
            var _a = this._inputCords, bottom = _a.bottom, top = _a.top;
            var isElementFit = (window && window.innerHeight) - bottom < height;
            var isTop = isElementFit && top > height;
            var isCenter = isElementFit && top < height;
            if (isTop) {
                return 'top';
            }
            else if (isCenter) {
                return 'center';
            }
            return 'bottom';
        },
        enumerable: true,
        configurable: true
    });
    AppendToInputDirective.prototype.ngAfterViewInit = function () {
        this._inputCords = this.inputCords;
        this._direction = this.direction;
        this.append();
    };
    AppendToInputDirective.prototype.changePosition = function () {
        var _a = this.inputCords, bottom = _a.bottom, top = _a.top;
        var y = this.defineElementYByDirection(top, bottom);
        this.setStyle('top', y + "px");
    };
    AppendToInputDirective.prototype.append = function () {
        var _a = this._inputCords, left = _a.left, bottom = _a.bottom, top = _a.top;
        var y = this.defineElementYByDirection(top, bottom);
        this.setStyle('position', 'fixed');
        this.setStyle('left', left + "px");
        this.setStyle('top', y + "px");
    };
    AppendToInputDirective.prototype.setStyle = function (style, value) {
        this.renderer.setStyle(this.element, style, value);
    };
    AppendToInputDirective.prototype.defineElementYByDirection = function (inputTop, inputBottom) {
        if (this._direction === 'top') {
            return inputTop - this.element.offsetHeight;
        }
        else if (this._direction === 'center') {
            return inputTop - (this.element.offsetHeight / 2);
        }
        return inputBottom;
    };
    AppendToInputDirective.ctorParameters = function () { return [
        { type: ElementRef },
        { type: Renderer2 }
    ]; };
    __decorate([
        Input('ngxAppendToInput')
    ], AppendToInputDirective.prototype, "inputElement", void 0);
    __decorate([
        HostListener('window:scroll')
    ], AppendToInputDirective.prototype, "changePosition", null);
    AppendToInputDirective = __decorate([
        Directive({
            selector: '[ngxAppendToInput]'
        })
    ], AppendToInputDirective);
    return AppendToInputDirective;
}());

var NgxMaterialTimepickerModule = /** @class */ (function () {
    function NgxMaterialTimepickerModule() {
    }
    NgxMaterialTimepickerModule_1 = NgxMaterialTimepickerModule;
    NgxMaterialTimepickerModule.setLocale = function (locale) {
        return {
            ngModule: NgxMaterialTimepickerModule_1,
            providers: [
                { provide: TIME_LOCALE, useValue: locale }
            ]
        };
    };
    var NgxMaterialTimepickerModule_1;
    NgxMaterialTimepickerModule = NgxMaterialTimepickerModule_1 = __decorate([
        NgModule({
            imports: [
                CommonModule,
                FormsModule
            ],
            exports: [
                NgxMaterialTimepickerComponent,
                NgxMaterialTimepickerToggleComponent,
                NgxTimepickerFieldComponent,
                TimepickerDirective,
                NgxMaterialTimepickerToggleIconDirective,
                NgxMaterialTimepickerThemeDirective,
                NgxMaterialTimepicker24HoursFaceComponent,
                NgxMaterialTimepicker12HoursFaceComponent,
                NgxMaterialTimepickerMinutesFaceComponent,
                NgxMaterialTimepickerFaceComponent,
                NgxMaterialTimepickerDialComponent,
                NgxMaterialTimepickerDialControlComponent
            ],
            declarations: [
                NgxMaterialTimepickerComponent,
                NgxMaterialTimepicker24HoursFaceComponent,
                NgxMaterialTimepicker12HoursFaceComponent,
                NgxMaterialTimepickerMinutesFaceComponent,
                NgxMaterialTimepickerFaceComponent,
                NgxMaterialTimepickerToggleComponent,
                NgxMaterialTimepickerButtonComponent,
                NgxMaterialTimepickerDialComponent,
                NgxMaterialTimepickerDialControlComponent,
                NgxMaterialTimepickerPeriodComponent,
                TimeFormatterPipe,
                TimepickerDirective,
                OverlayDirective,
                NgxMaterialTimepickerToggleIconDirective,
                AutofocusDirective,
                MinutesFormatterPipe,
                NgxMaterialTimepickerThemeDirective,
                NgxTimepickerFieldComponent,
                NgxTimepickerTimeControlComponent,
                NgxTimepickerPeriodSelectorComponent,
                TimeLocalizerPipe,
                TimeParserPipe,
                ActiveHourPipe,
                ActiveMinutePipe,
                NgxMaterialTimepickerContainerComponent,
                NgxMaterialTimepickerContentComponent,
                AppendToInputDirective
            ],
            entryComponents: [NgxMaterialTimepickerContainerComponent]
        })
    ], NgxMaterialTimepickerModule);
    return NgxMaterialTimepickerModule;
}());

/**
 * Generated bundle index. Do not edit.
 */

export { NgxMaterialTimepicker12HoursFaceComponent, NgxMaterialTimepicker24HoursFaceComponent, NgxMaterialTimepickerComponent, NgxMaterialTimepickerDialComponent, NgxMaterialTimepickerDialControlComponent, NgxMaterialTimepickerFaceComponent, NgxMaterialTimepickerMinutesFaceComponent, NgxMaterialTimepickerModule, NgxMaterialTimepickerThemeDirective, NgxMaterialTimepickerToggleIconDirective, NgxTimepickerFieldComponent, TimepickerDirective, NgxMaterialTimepickerEventService as ɵa, DomService as ɵb, NgxMaterialTimepickerToggleComponent as ɵc, NgxMaterialTimepickerService as ɵd, TIME_LOCALE as ɵe, NgxMaterialTimepickerHoursFace as ɵf, TimeParserPipe as ɵg, NgxMaterialTimepickerButtonComponent as ɵh, NgxMaterialTimepickerPeriodComponent as ɵi, TimeFormatterPipe as ɵj, OverlayDirective as ɵk, AutofocusDirective as ɵl, MinutesFormatterPipe as ɵm, NgxTimepickerTimeControlComponent as ɵn, NgxTimepickerPeriodSelectorComponent as ɵo, TimeLocalizerPipe as ɵp, ActiveHourPipe as ɵq, ActiveMinutePipe as ɵr, AnimationState as ɵs, NgxMaterialTimepickerContainerComponent as ɵt, NgxMaterialTimepickerContentComponent as ɵu, AppendToInputDirective as ɵv };
//# sourceMappingURL=ngx-material-timepicker.js.map
