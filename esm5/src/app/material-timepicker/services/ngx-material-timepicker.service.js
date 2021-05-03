import * as tslib_1 from "tslib";
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { TimePeriod } from '../models/time-period.enum';
import { TimeAdapter } from './time-adapter';
import { DateTime } from 'luxon';
import * as i0 from "@angular/core";
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
            this.hour = tslib_1.__assign({}, DEFAULT_HOUR, { time: formatHourByPeriod(hour, period) });
            this.minute = tslib_1.__assign({}, DEFAULT_MINUTE, { time: defaultTime.getMinutes() });
            this.period = period;
        }
        else {
            this.resetTime();
        }
    };
    NgxMaterialTimepickerService.prototype.resetTime = function () {
        this.hour = tslib_1.__assign({}, DEFAULT_HOUR);
        this.minute = tslib_1.__assign({}, DEFAULT_MINUTE);
        this.period = TimePeriod.AM;
    };
    NgxMaterialTimepickerService.ngInjectableDef = i0.ɵɵdefineInjectable({ factory: function NgxMaterialTimepickerService_Factory() { return new NgxMaterialTimepickerService(); }, token: NgxMaterialTimepickerService, providedIn: "root" });
    NgxMaterialTimepickerService = tslib_1.__decorate([
        Injectable({
            providedIn: 'root'
        })
    ], NgxMaterialTimepickerService);
    return NgxMaterialTimepickerService;
}());
export { NgxMaterialTimepickerService };
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibmd4LW1hdGVyaWFsLXRpbWVwaWNrZXIuc2VydmljZS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL25neC1tYXRlcmlhbC10aW1lcGlja2VyLyIsInNvdXJjZXMiOlsic3JjL2FwcC9tYXRlcmlhbC10aW1lcGlja2VyL3NlcnZpY2VzL25neC1tYXRlcmlhbC10aW1lcGlja2VyLnNlcnZpY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFFM0MsT0FBTyxFQUFFLGVBQWUsRUFBYyxNQUFNLE1BQU0sQ0FBQztBQUNuRCxPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0sNEJBQTRCLENBQUM7QUFDeEQsT0FBTyxFQUFFLFdBQVcsRUFBRSxNQUFNLGdCQUFnQixDQUFDO0FBQzdDLE9BQU8sRUFBRSxRQUFRLEVBQUUsTUFBTSxPQUFPLENBQUM7O0FBR2pDLElBQU0sWUFBWSxHQUFrQjtJQUNoQyxJQUFJLEVBQUUsRUFBRTtJQUNSLEtBQUssRUFBRSxHQUFHO0NBQ2IsQ0FBQztBQUNGLElBQU0sY0FBYyxHQUFrQjtJQUNsQyxJQUFJLEVBQUUsQ0FBQztJQUNQLEtBQUssRUFBRSxHQUFHO0NBQ2IsQ0FBQztBQUtGO0lBSEE7UUFLWSxnQkFBVyxHQUFHLElBQUksZUFBZSxDQUFnQixZQUFZLENBQUMsQ0FBQztRQUMvRCxrQkFBYSxHQUFHLElBQUksZUFBZSxDQUFnQixjQUFjLENBQUMsQ0FBQztRQUNuRSxrQkFBYSxHQUFHLElBQUksZUFBZSxDQUFhLFVBQVUsQ0FBQyxFQUFFLENBQUMsQ0FBQztLQTJFMUU7SUF4RUcsc0JBQUksOENBQUk7YUFBUixVQUFTLElBQW1CO1lBQ3hCLElBQUksQ0FBQyxXQUFXLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDO1FBQ2hDLENBQUM7OztPQUFBO0lBRUQsc0JBQUksc0RBQVk7YUFBaEI7WUFDSSxPQUFPLElBQUksQ0FBQyxXQUFXLENBQUMsWUFBWSxFQUFF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QU8sWUFBWSxJQUFFLElBQUksRUFBRSxrQkFBa0IsQ0FBQyxJQUFJLEVBQUUsTUFBb0IsQ0FBQyxHQUFDLENBQUM7WUFDcEYsSUFBSSxDQUFDLE1BQU0sd0JBQU8sY0FBYyxJQUFFLElBQUksRUFBRSxXQUFXLENBQUMsVUFBVSxFQUFFLEdBQUMsQ0FBQztZQUNsRSxJQUFJLENBQUMsTUFBTSxHQUFHLE1BQW9CLENBQUM7U0FFdEM7YUFBTTtZQUNILElBQUksQ0FBQyxTQUFTLEVBQUUsQ0FBQztTQUNwQjtJQUNMLENBQUM7SUFFTyxnREFBUyxHQUFqQjtRQUNJLElBQUksQ0FBQyxJQUFJLHdCQUFPLFlBQVksQ0FBQyxDQUFDO1FBQzlCLElBQUksQ0FBQyxNQUFNLHdCQUFPLGNBQWMsQ0FBQyxDQUFDO1FBQ2xDLElBQUksQ0FBQyxNQUFNLEdBQUcsVUFBVSxDQUFDLEVBQUUsQ0FBQztJQUNoQyxDQUFDOztJQTlFUSw0QkFBNEI7UUFIeEMsVUFBVSxDQUFDO1lBQ1IsVUFBVSxFQUFFLE1BQU07U0FDckIsQ0FBQztPQUNXLDRCQUE0QixDQStFeEM7dUNBbkdEO0NBbUdDLEFBL0VELElBK0VDO1NBL0VZLDRCQUE0QjtBQWlGekM7O0dBRUc7QUFDSCxTQUFTLGtCQUFrQixDQUFDLElBQVksRUFBRSxNQUFrQjtJQUN4RCxRQUFRLE1BQU0sRUFBRTtRQUNaLEtBQUssVUFBVSxDQUFDLEVBQUU7WUFDZCxPQUFPLElBQUksS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDO1FBQ2xDLEtBQUssVUFBVSxDQUFDLEVBQUU7WUFDZCxPQUFPLElBQUksS0FBSyxFQUFFLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsSUFBSSxHQUFHLEVBQUUsQ0FBQztRQUN4QztZQUNJLE9BQU8sSUFBSSxDQUFDO0tBQ25CO0FBQ0wsQ0FBQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEluamVjdGFibGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IENsb2NrRmFjZVRpbWUgfSBmcm9tICcuLi9tb2RlbHMvY2xvY2stZmFjZS10aW1lLmludGVyZmFjZSc7XG5pbXBvcnQgeyBCZWhhdmlvclN1YmplY3QsIE9ic2VydmFibGUgfSBmcm9tICdyeGpzJztcbmltcG9ydCB7IFRpbWVQZXJpb2QgfSBmcm9tICcuLi9tb2RlbHMvdGltZS1wZXJpb2QuZW51bSc7XG5pbXBvcnQgeyBUaW1lQWRhcHRlciB9IGZyb20gJy4vdGltZS1hZGFwdGVyJztcbmltcG9ydCB7IERhdGVUaW1lIH0gZnJvbSAnbHV4b24nO1xuXG5cbmNvbnN0IERFRkFVTFRfSE9VUjogQ2xvY2tGYWNlVGltZSA9IHtcbiAgICB0aW1lOiAxMixcbiAgICBhbmdsZTogMzYwXG59O1xuY29uc3QgREVGQVVMVF9NSU5VVEU6IENsb2NrRmFjZVRpbWUgPSB7XG4gICAgdGltZTogMCxcbiAgICBhbmdsZTogMzYwXG59O1xuXG5ASW5qZWN0YWJsZSh7XG4gICAgcHJvdmlkZWRJbjogJ3Jvb3QnXG59KVxuZXhwb3J0IGNsYXNzIE5neE1hdGVyaWFsVGltZXBpY2tlclNlcnZpY2Uge1xuXG4gICAgcHJpdmF0ZSBob3VyU3ViamVjdCA9IG5ldyBCZWhhdmlvclN1YmplY3Q8Q2xvY2tGYWNlVGltZT4oREVGQVVMVF9IT1VSKTtcbiAgICBwcml2YXRlIG1pbnV0ZVN1YmplY3QgPSBuZXcgQmVoYXZpb3JTdWJqZWN0PENsb2NrRmFjZVRpbWU+KERFRkFVTFRfTUlOVVRFKTtcbiAgICBwcml2YXRlIHBlcmlvZFN1YmplY3QgPSBuZXcgQmVoYXZpb3JTdWJqZWN0PFRpbWVQZXJpb2Q+KFRpbWVQZXJpb2QuQU0pO1xuXG5cbiAgICBzZXQgaG91cihob3VyOiBDbG9ja0ZhY2VUaW1lKSB7XG4gICAgICAgIHRoaXMuaG91clN1YmplY3QubmV4dChob3VyKTtcbiAgICB9XG5cbiAgICBnZXQgc2VsZWN0ZWRIb3VyKCk6IE9ic2VydmFibGU8Q2xvY2tGYWNlVGltZT4ge1xuICAgICAgICByZXR1cm4gdGhpcy5ob3VyU3ViamVjdC5hc09ic2VydmFibGUoKTtcbiAgICB9XG5cbiAgICBzZXQgbWludXRlKG1pbnV0ZTogQ2xvY2tGYWNlVGltZSkge1xuICAgICAgICB0aGlzLm1pbnV0ZVN1YmplY3QubmV4dChtaW51dGUpO1xuICAgIH1cblxuICAgIGdldCBzZWxlY3RlZE1pbnV0ZSgpOiBPYnNlcnZhYmxlPENsb2NrRmFjZVRpbWU+IHtcbiAgICAgICAgcmV0dXJuIHRoaXMubWludXRlU3ViamVjdC5hc09ic2VydmFibGUoKTtcbiAgICB9XG5cbiAgICBzZXQgcGVyaW9kKHBlcmlvZDogVGltZVBlcmlvZCkge1xuICAgICAgICBjb25zdCBpc1BlcmlvZFZhbGlkID0gKHBlcmlvZCA9PT0gVGltZVBlcmlvZC5BTSkgfHwgKHBlcmlvZCA9PT0gVGltZVBlcmlvZC5QTSk7XG5cbiAgICAgICAgaWYgKGlzUGVyaW9kVmFsaWQpIHtcbiAgICAgICAgICAgIHRoaXMucGVyaW9kU3ViamVjdC5uZXh0KHBlcmlvZCk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBnZXQgc2VsZWN0ZWRQZXJpb2QoKTogT2JzZXJ2YWJsZTxUaW1lUGVyaW9kPiB7XG4gICAgICAgIHJldHVybiB0aGlzLnBlcmlvZFN1YmplY3QuYXNPYnNlcnZhYmxlKCk7XG4gICAgfVxuXG5cbiAgICBzZXREZWZhdWx0VGltZUlmQXZhaWxhYmxlKHRpbWU6IHN0cmluZywgbWluOiBEYXRlVGltZSwgbWF4OiBEYXRlVGltZSwgZm9ybWF0OiBudW1iZXIsIG1pbnV0ZXNHYXA/OiBudW1iZXIpIHtcbiAgICAgICAgLyogV29ya2Fyb3VuZCB0byBkb3VibGUgZXJyb3IgbWVzc2FnZSovXG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgICBpZiAoVGltZUFkYXB0ZXIuaXNUaW1lQXZhaWxhYmxlKHRpbWUsIG1pbiwgbWF4LCAnbWludXRlcycsIG1pbnV0ZXNHYXApKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5zZXREZWZhdWx0VGltZSh0aW1lLCBmb3JtYXQpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9IGNhdGNoIChlKSB7XG4gICAgICAgICAgICBjb25zb2xlLmVycm9yKGUpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgZ2V0RnVsbFRpbWUoZm9ybWF0OiBudW1iZXIpOiBzdHJpbmcge1xuICAgICAgICBjb25zdCBzZWxlY3RlZEhvdXIgPSB0aGlzLmhvdXJTdWJqZWN0LmdldFZhbHVlKCkudGltZTtcbiAgICAgICAgY29uc3Qgc2VsZWN0ZWRNaW51dGUgPSB0aGlzLm1pbnV0ZVN1YmplY3QuZ2V0VmFsdWUoKS50aW1lO1xuICAgICAgICBjb25zdCBob3VyID0gc2VsZWN0ZWRIb3VyICE9IG51bGwgPyBzZWxlY3RlZEhvdXIgOiBERUZBVUxUX0hPVVIudGltZTtcbiAgICAgICAgY29uc3QgbWludXRlID0gc2VsZWN0ZWRNaW51dGUgIT0gbnVsbCA/IHNlbGVjdGVkTWludXRlIDogREVGQVVMVF9NSU5VVEUudGltZTtcbiAgICAgICAgY29uc3QgcGVyaW9kID0gZm9ybWF0ID09PSAxMiA/IHRoaXMucGVyaW9kU3ViamVjdC5nZXRWYWx1ZSgpIDogJyc7XG4gICAgICAgIGNvbnN0IHRpbWUgPSBgJHtob3VyfToke21pbnV0ZX0gJHtwZXJpb2R9YC50cmltKCk7XG5cbiAgICAgICAgcmV0dXJuIFRpbWVBZGFwdGVyLmZvcm1hdFRpbWUodGltZSwge2Zvcm1hdH0pO1xuICAgIH1cblxuICAgIHByaXZhdGUgc2V0RGVmYXVsdFRpbWUodGltZTogc3RyaW5nLCBmb3JtYXQ6IG51bWJlcikge1xuICAgICAgICBjb25zdCBkZWZhdWx0VGltZSA9IFRpbWVBZGFwdGVyLnBhcnNlVGltZSh0aW1lLCB7Zm9ybWF0fSkudG9KU0RhdGUoKTtcblxuICAgICAgICBpZiAoRGF0ZVRpbWUuZnJvbUpTRGF0ZShkZWZhdWx0VGltZSkuaXNWYWxpZCkge1xuICAgICAgICAgICAgY29uc3QgcGVyaW9kID0gdGltZS5zdWJzdHIodGltZS5sZW5ndGggLSAyKS50b1VwcGVyQ2FzZSgpO1xuICAgICAgICAgICAgY29uc3QgaG91ciA9IGRlZmF1bHRUaW1lLmdldEhvdXJzKCk7XG5cbiAgICAgICAgICAgIHRoaXMuaG91ciA9IHsuLi5ERUZBVUxUX0hPVVIsIHRpbWU6IGZvcm1hdEhvdXJCeVBlcmlvZChob3VyLCBwZXJpb2QgYXMgVGltZVBlcmlvZCl9O1xuICAgICAgICAgICAgdGhpcy5taW51dGUgPSB7Li4uREVGQVVMVF9NSU5VVEUsIHRpbWU6IGRlZmF1bHRUaW1lLmdldE1pbnV0ZXMoKX07XG4gICAgICAgICAgICB0aGlzLnBlcmlvZCA9IHBlcmlvZCBhcyBUaW1lUGVyaW9kO1xuXG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICB0aGlzLnJlc2V0VGltZSgpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgcHJpdmF0ZSByZXNldFRpbWUoKTogdm9pZCB7XG4gICAgICAgIHRoaXMuaG91ciA9IHsuLi5ERUZBVUxUX0hPVVJ9O1xuICAgICAgICB0aGlzLm1pbnV0ZSA9IHsuLi5ERUZBVUxUX01JTlVURX07XG4gICAgICAgIHRoaXMucGVyaW9kID0gVGltZVBlcmlvZC5BTTtcbiAgICB9XG59XG5cbi8qKipcbiAqICBGb3JtYXQgaG91ciBpbiAyNGhvdXJzIGZvcm1hdCB0byBtZXJpZGlhbiAoQU0gb3IgUE0pIGZvcm1hdFxuICovXG5mdW5jdGlvbiBmb3JtYXRIb3VyQnlQZXJpb2QoaG91cjogbnVtYmVyLCBwZXJpb2Q6IFRpbWVQZXJpb2QpOiBudW1iZXIge1xuICAgIHN3aXRjaCAocGVyaW9kKSB7XG4gICAgICAgIGNhc2UgVGltZVBlcmlvZC5BTTpcbiAgICAgICAgICAgIHJldHVybiBob3VyID09PSAwID8gMTIgOiBob3VyO1xuICAgICAgICBjYXNlIFRpbWVQZXJpb2QuUE06XG4gICAgICAgICAgICByZXR1cm4gaG91ciA9PT0gMTIgPyAxMiA6IGhvdXIgLSAxMjtcbiAgICAgICAgZGVmYXVsdDpcbiAgICAgICAgICAgIHJldHVybiBob3VyO1xuICAgIH1cbn1cbiJdfQ==