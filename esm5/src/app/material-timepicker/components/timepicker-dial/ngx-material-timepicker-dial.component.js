import * as tslib_1 from "tslib";
import { ChangeDetectionStrategy, Component, EventEmitter, Inject, Input, Output } from '@angular/core';
import { TimeUnit } from '../../models/time-unit.enum';
import { Info } from 'luxon';
import { TIME_LOCALE } from '../../tokens/time-locale.token';
import { TimepickerTimeUtils } from '../../utils/timepicker-time.utils';
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
    tslib_1.__decorate([
        Input()
    ], NgxMaterialTimepickerDialComponent.prototype, "editableHintTmpl", void 0);
    tslib_1.__decorate([
        Input()
    ], NgxMaterialTimepickerDialComponent.prototype, "hour", void 0);
    tslib_1.__decorate([
        Input()
    ], NgxMaterialTimepickerDialComponent.prototype, "minute", void 0);
    tslib_1.__decorate([
        Input()
    ], NgxMaterialTimepickerDialComponent.prototype, "format", void 0);
    tslib_1.__decorate([
        Input()
    ], NgxMaterialTimepickerDialComponent.prototype, "period", void 0);
    tslib_1.__decorate([
        Input()
    ], NgxMaterialTimepickerDialComponent.prototype, "activeTimeUnit", void 0);
    tslib_1.__decorate([
        Input()
    ], NgxMaterialTimepickerDialComponent.prototype, "minTime", void 0);
    tslib_1.__decorate([
        Input()
    ], NgxMaterialTimepickerDialComponent.prototype, "maxTime", void 0);
    tslib_1.__decorate([
        Input()
    ], NgxMaterialTimepickerDialComponent.prototype, "isEditable", void 0);
    tslib_1.__decorate([
        Input()
    ], NgxMaterialTimepickerDialComponent.prototype, "minutesGap", void 0);
    tslib_1.__decorate([
        Input()
    ], NgxMaterialTimepickerDialComponent.prototype, "hoursOnly", void 0);
    tslib_1.__decorate([
        Output()
    ], NgxMaterialTimepickerDialComponent.prototype, "periodChanged", void 0);
    tslib_1.__decorate([
        Output()
    ], NgxMaterialTimepickerDialComponent.prototype, "timeUnitChanged", void 0);
    tslib_1.__decorate([
        Output()
    ], NgxMaterialTimepickerDialComponent.prototype, "hourChanged", void 0);
    tslib_1.__decorate([
        Output()
    ], NgxMaterialTimepickerDialComponent.prototype, "minuteChanged", void 0);
    NgxMaterialTimepickerDialComponent = tslib_1.__decorate([
        Component({
            selector: 'ngx-material-timepicker-dial',
            template: "<div class=\"timepicker-dial\">\n    <div class=\"timepicker-dial__container\">\n        <div class=\"timepicker-dial__time\">\n            <ngx-material-timepicker-dial-control [timeList]=\"hours\" [time]=\"hour\" [timeUnit]=\"timeUnit.HOUR\"\n                                                  [isActive]=\"activeTimeUnit === timeUnit.HOUR\"\n                                                  [isEditable]=\"isEditable\"\n                                                  (timeUnitChanged)=\"changeTimeUnit($event)\"\n                                                  (timeChanged)=\"changeHour($event)\"\n                                                  (focused)=\"showHint()\"\n                                                  (unfocused)=\"hideHint()\">\n\n            </ngx-material-timepicker-dial-control>\n            <span>:</span>\n            <ngx-material-timepicker-dial-control [timeList]=\"minutes\" [time]=\"minute\" [timeUnit]=\"timeUnit.MINUTE\"\n                                                  [isActive]=\"activeTimeUnit === timeUnit.MINUTE\"\n                                                  [isEditable]=\"isEditable\"\n                                                  [minutesGap]=\"minutesGap\"\n                                                  [disabled]=\"hoursOnly\"\n                                                  (timeUnitChanged)=\"changeTimeUnit($event)\"\n                                                  (timeChanged)=\"changeMinute($event)\"\n                                                  (focused)=\"showHint()\"\n                                                  (unfocused)=\"hideHint()\">\n\n            </ngx-material-timepicker-dial-control>\n        </div>\n        <ngx-material-timepicker-period class=\"timepicker-dial__period\"\n                                        [ngClass]=\"{'timepicker-dial__period--hidden': format === 24}\"\n                                        [selectedPeriod]=\"period\" [activeTimeUnit]=\"activeTimeUnit\"\n                                        [maxTime]=\"maxTime\" [minTime]=\"minTime\" [format]=\"format\"\n                                        [hours]=\"hours\" [minutes]=\"minutes\" [selectedHour]=\"hour\"\n                                        [meridiems]=\"meridiems\"\n                                        (periodChanged)=\"changePeriod($event)\"></ngx-material-timepicker-period>\n    </div>\n    <div *ngIf=\"isEditable || editableHintTmpl\" [ngClass]=\"{'timepicker-dial__hint-container--hidden': !isHintVisible}\">\n        <!--suppress HtmlUnknownAttribute -->\n        <ng-container *ngTemplateOutlet=\"editableHintTmpl ? editableHintTmpl : editableHintDefault\"></ng-container>\n        <ng-template #editableHintDefault>\n            <small class=\"timepicker-dial__hint\"> * use arrows (<span>&#8645;</span>) to change the time</small>\n        </ng-template>\n    </div>\n</div>\n",
            changeDetection: ChangeDetectionStrategy.OnPush,
            styles: [".timepicker-dial{text-align:right}.timepicker-dial__container{display:flex;align-items:center;justify-content:flex-end;-webkit-tap-highlight-color:transparent}.timepicker-dial__time{display:flex;align-items:baseline;line-height:normal;font-size:50px;color:rgba(255,255,255,.5);font-family:Roboto,sans-serif}@supports (font-family:var(--primary-font-family)){.timepicker-dial__time{font-family:var(--primary-font-family);color:var(--dial-inactive-color)}}.timepicker-dial__period{display:block;margin-left:10px}.timepicker-dial__hint-container--hidden,.timepicker-dial__period--hidden{visibility:hidden}.timepicker-dial__hint{display:inline-block;font-size:10px;color:#fff}@supports (color:var(--dial-active-color)){.timepicker-dial__hint{color:var(--dial-active-color)}}.timepicker-dial__hint span{font-size:14px}@media (max-device-width:1023px) and (orientation:landscape){.timepicker-dial__container{flex-direction:column}.timepicker-dial__period{margin-left:0}}"]
        }),
        tslib_1.__param(0, Inject(TIME_LOCALE))
    ], NgxMaterialTimepickerDialComponent);
    return NgxMaterialTimepickerDialComponent;
}());
export { NgxMaterialTimepickerDialComponent };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibmd4LW1hdGVyaWFsLXRpbWVwaWNrZXItZGlhbC5jb21wb25lbnQuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9uZ3gtbWF0ZXJpYWwtdGltZXBpY2tlci8iLCJzb3VyY2VzIjpbInNyYy9hcHAvbWF0ZXJpYWwtdGltZXBpY2tlci9jb21wb25lbnRzL3RpbWVwaWNrZXItZGlhbC9uZ3gtbWF0ZXJpYWwtdGltZXBpY2tlci1kaWFsLmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUEsT0FBTyxFQUNILHVCQUF1QixFQUN2QixTQUFTLEVBQ1QsWUFBWSxFQUNaLE1BQU0sRUFDTixLQUFLLEVBRUwsTUFBTSxFQUdULE1BQU0sZUFBZSxDQUFDO0FBRXZCLE9BQU8sRUFBRSxRQUFRLEVBQUUsTUFBTSw2QkFBNkIsQ0FBQztBQUV2RCxPQUFPLEVBQVksSUFBSSxFQUFFLE1BQU0sT0FBTyxDQUFDO0FBQ3ZDLE9BQU8sRUFBRSxXQUFXLEVBQUUsTUFBTSxnQ0FBZ0MsQ0FBQztBQUM3RCxPQUFPLEVBQUUsbUJBQW1CLEVBQUUsTUFBTSxtQ0FBbUMsQ0FBQztBQVF4RTtJQTJCSSw0Q0FBeUMsTUFBYztRQUFkLFdBQU0sR0FBTixNQUFNLENBQVE7UUF6QnZELGFBQVEsR0FBRyxRQUFRLENBQUM7UUFJcEIsY0FBUyxHQUFHLElBQUksQ0FBQyxTQUFTLENBQUMsRUFBQyxNQUFNLEVBQUUsSUFBSSxDQUFDLE1BQU0sRUFBQyxDQUFDLENBQUM7UUFnQnhDLGtCQUFhLEdBQUcsSUFBSSxZQUFZLEVBQWMsQ0FBQztRQUMvQyxvQkFBZSxHQUFHLElBQUksWUFBWSxFQUFZLENBQUM7UUFDL0MsZ0JBQVcsR0FBRyxJQUFJLFlBQVksRUFBaUIsQ0FBQztRQUNoRCxrQkFBYSxHQUFHLElBQUksWUFBWSxFQUFpQixDQUFDO0lBRzVELENBQUM7SUFFRCx3REFBVyxHQUFYLFVBQVksT0FBc0I7UUFDOUIsSUFBSSxPQUFPLENBQUMsUUFBUSxDQUFDLElBQUksT0FBTyxDQUFD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QWUsRUFBRSx1QkFBdUIsQ0FBQyxNQUFNOztTQUNsRCxDQUFDO1FBNEJlLG1CQUFBLE1BQU0sQ0FBQyxXQUFXLENBQUMsQ0FBQTtPQTNCdkIsa0NBQWtDLENBOEU5QztJQUFELHlDQUFDO0NBQUEsQUE5RUQsSUE4RUM7U0E5RVksa0NBQWtDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtcbiAgICBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneSxcbiAgICBDb21wb25lbnQsXG4gICAgRXZlbnRFbWl0dGVyLFxuICAgIEluamVjdCxcbiAgICBJbnB1dCxcbiAgICBPbkNoYW5nZXMsXG4gICAgT3V0cHV0LFxuICAgIFNpbXBsZUNoYW5nZXMsXG4gICAgVGVtcGxhdGVSZWZcbn0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBUaW1lUGVyaW9kIH0gZnJvbSAnLi4vLi4vbW9kZWxzL3RpbWUtcGVyaW9kLmVudW0nO1xuaW1wb3J0IHsgVGltZVVuaXQgfSBmcm9tICcuLi8uLi9tb2RlbHMvdGltZS11bml0LmVudW0nO1xuaW1wb3J0IHsgQ2xvY2tGYWNlVGltZSB9IGZyb20gJy4uLy4uL21vZGVscy9jbG9jay1mYWNlLXRpbWUuaW50ZXJmYWNlJztcbmltcG9ydCB7IERhdGVUaW1lLCBJbmZvIH0gZnJvbSAnbHV4b24nO1xuaW1wb3J0IHsgVElNRV9MT0NBTEUgfSBmcm9tICcuLi8uLi90b2tlbnMvdGltZS1sb2NhbGUudG9rZW4nO1xuaW1wb3J0IHsgVGltZXBpY2tlclRpbWVVdGlscyB9IGZyb20gJy4uLy4uL3V0aWxzL3RpbWVwaWNrZXItdGltZS51dGlscyc7XG5cbkBDb21wb25lbnQoe1xuICAgIHNlbGVjdG9yOiAnbmd4LW1hdGVyaWFsLXRpbWVwaWNrZXItZGlhbCcsXG4gICAgdGVtcGxhdGVVcmw6ICduZ3gtbWF0ZXJpYWwtdGltZXBpY2tlci1kaWFsLmNvbXBvbmVudC5odG1sJyxcbiAgICBzdHlsZVVybHM6IFsnbmd4LW1hdGVyaWFsLXRpbWVwaWNrZXItZGlhbC5jb21wb25lbnQuc2NzcyddLFxuICAgIGNoYW5nZURldGVjdGlvbjogQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3kuT25QdXNoXG59KVxuZXhwb3J0IGNsYXNzIE5neE1hdGVyaWFsVGltZXBpY2tlckRpYWxDb21wb25lbnQgaW1wbGVtZW50cyBPbkNoYW5nZXMge1xuXG4gICAgdGltZVVuaXQgPSBUaW1lVW5pdDtcblxuICAgIGhvdXJzOiBDbG9ja0ZhY2VUaW1lW107XG4gICAgbWludXRlczogQ2xvY2tGYWNlVGltZVtdO1xuICAgIG1lcmlkaWVtcyA9IEluZm8ubWVyaWRpZW1zKHtsb2NhbGU6IHRoaXMubG9jYWxlfSk7XG5cbiAgICBpc0hpbnRWaXNpYmxlOiBib29sZWFuO1xuXG4gICAgQElucHV0KCkgZWRpdGFibGVIaW50VG1wbDogVGVtcGxhdGVSZWY8Tm9kZT47XG4gICAgQElucHV0KCkgaG91cjogbnVtYmVyIHwgc3RyaW5nO1xuICAgIEBJbnB1dCgpIG1pbnV0ZTogbnVtYmVyIHwgc3RyaW5nO1xuICAgIEBJbnB1dCgpIGZvcm1hdDogbnVtYmVyO1xuICAgIEBJbnB1dCgpIHBlcmlvZDogVGltZVBlcmlvZDtcbiAgICBASW5wdXQoKSBhY3RpdmVUaW1lVW5pdDogVGltZVVuaXQ7XG4gICAgQElucHV0KCkgbWluVGltZTogRGF0ZVRpbWU7XG4gICAgQElucHV0KCkgbWF4VGltZTogRGF0ZVRpbWU7XG4gICAgQElucHV0KCkgaXNFZGl0YWJsZTogYm9vbGVhbjtcbiAgICBASW5wdXQoKSBtaW51dGVzR2FwOiBudW1iZXI7XG4gICAgQElucHV0KCkgaG91cnNPbmx5OiBib29sZWFuO1xuXG4gICAgQE91dHB1dCgpIHBlcmlvZENoYW5nZWQgPSBuZXcgRXZlbnRFbWl0dGVyPFRpbWVQZXJpb2Q+KCk7XG4gICAgQE91dHB1dCgpIHRpbWVVbml0Q2hhbmdlZCA9IG5ldyBFdmVudEVtaXR0ZXI8VGltZVVuaXQ+KCk7XG4gICAgQE91dHB1dCgpIGhvdXJDaGFuZ2VkID0gbmV3IEV2ZW50RW1pdHRlcjxDbG9ja0ZhY2VUaW1lPigpO1xuICAgIEBPdXRwdXQoKSBtaW51dGVDaGFuZ2VkID0gbmV3IEV2ZW50RW1pdHRlcjxDbG9ja0ZhY2VUaW1lPigpO1xuXG4gICAgY29uc3RydWN0b3IoQEluamVjdChUSU1FX0xPQ0FMRSkgcHJpdmF0ZSBsb2NhbGU6IHN0cmluZykge1xuICAgIH1cblxuICAgIG5nT25DaGFuZ2VzKGNoYW5nZXM6IFNpbXBsZUNoYW5nZXMpIHtcbiAgICAgICAgaWYgKGNoYW5nZXNbJ3BlcmlvZCddICYmIGNoYW5nZXNbJ3BlcmlvZCddLmN1cnJlbnRWYWx1ZVxuICAgICAgICAgICAgfHwgY2hhbmdlc1snZm9ybWF0J10gJiYgY2hhbmdlc1snZm9ybWF0J10uY3VycmVudFZhbHVlKSB7XG4gICAgICAgICAgICBjb25zdCBob3VycyA9IFRpbWVwaWNrZXJUaW1lVXRpbHMuZ2V0SG91cnModGhpcy5mb3JtYXQpO1xuXG4gICAgICAgICAgICB0aGlzLmhvdXJzID0gVGltZXBpY2tlclRpbWVVdGlscy5kaXNhYmxlSG91cnMoaG91cnMsIHtcbiAgICAgICAgICAgICAgICBtaW46IHRoaXMubWluVGltZSxcbiAgICAgICAgICAgICAgICBtYXg6IHRoaXMubWF4VGltZSxcbiAgICAgICAgICAgICAgICBmb3JtYXQ6IHRoaXMuZm9ybWF0LFxuICAgICAgICAgICAgICAgIHBlcmlvZDogdGhpcy5wZXJpb2RcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgICAgIGlmIChjaGFuZ2VzWydwZXJpb2QnXSAmJiBjaGFuZ2VzWydwZXJpb2QnXS5jdXJyZW50VmFsdWVcbiAgICAgICAgICAgIHx8IGNoYW5nZXNbJ2hvdXInXSAmJiBjaGFuZ2VzWydob3VyJ10uY3VycmVudFZhbHVlKSB7XG4gICAgICAgICAgICBjb25zdCBtaW51dGVzID0gVGltZXBpY2tlclRpbWVVdGlscy5nZXRNaW51dGVzKHRoaXMubWludXRlc0dhcCk7XG5cbiAgICAgICAgICAgIHRoaXMubWludXRlcyA9IFRpbWVwaWNrZXJUaW1lVXRpbHMuZGlzYWJsZU1pbnV0ZXMobWludXRlcywgK3RoaXMuaG91ciwge1xuICAgICAgICAgICAgICAgIG1pbjogdGhpcy5taW5UaW1lLFxuICAgICAgICAgICAgICAgIG1heDogdGhpcy5tYXhUaW1lLFxuICAgICAgICAgICAgICAgIGZvcm1hdDogdGhpcy5mb3JtYXQsXG4gICAgICAgICAgICAgICAgcGVyaW9kOiB0aGlzLnBlcmlvZFxuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBjaGFuZ2VUaW1lVW5pdCh1bml0OiBUaW1lVW5pdCk6IHZvaWQge1xuICAgICAgICB0aGlzLnRpbWVVbml0Q2hhbmdlZC5uZXh0KHVuaXQpO1xuICAgIH1cblxuICAgIGNoYW5nZVBlcmlvZChwZXJpb2Q6IFRpbWVQZXJpb2QpOiB2b2lkIHtcbiAgICAgICAgdGhpcy5wZXJpb2RDaGFuZ2VkLm5leHQocGVyaW9kKTtcbiAgICB9XG5cbiAgICBjaGFuZ2VIb3VyKGhvdXI6IENsb2NrRmFjZVRpbWUpOiB2b2lkIHtcbiAgICAgICAgdGhpcy5ob3VyQ2hhbmdlZC5uZXh0KGhvdXIpO1xuICAgIH1cblxuICAgIGNoYW5nZU1pbnV0ZShtaW51dGU6IENsb2NrRmFjZVRpbWUpOiB2b2lkIHtcbiAgICAgICAgdGhpcy5taW51dGVDaGFuZ2VkLm5leHQobWludXRlKTtcbiAgICB9XG5cbiAgICBzaG93SGludCgpOiB2b2lkIHtcbiAgICAgICAgdGhpcy5pc0hpbnRWaXNpYmxlID0gdHJ1ZTtcbiAgICB9XG5cbiAgICBoaWRlSGludCgpOiB2b2lkIHtcbiAgICAgICAgdGhpcy5pc0hpbnRWaXNpYmxlID0gZmFsc2U7XG4gICAgfVxufVxuIl19