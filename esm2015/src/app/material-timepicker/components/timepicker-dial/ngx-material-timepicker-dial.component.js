import * as tslib_1 from "tslib";
import { ChangeDetectionStrategy, Component, EventEmitter, Inject, Input, Output } from '@angular/core';
import { TimeUnit } from '../../models/time-unit.enum';
import { Info } from 'luxon';
import { TIME_LOCALE } from '../../tokens/time-locale.token';
import { TimepickerTimeUtils } from '../../utils/timepicker-time.utils';
let NgxMaterialTimepickerDialComponent = class NgxMaterialTimepickerDialComponent {
    constructor(locale) {
        this.locale = locale;
        this.timeUnit = TimeUnit;
        this.meridiems = Info.meridiems({ locale: this.locale });
        this.periodChanged = new EventEmitter();
        this.timeUnitChanged = new EventEmitter();
        this.hourChanged = new EventEmitter();
        this.minuteChanged = new EventEmitter();
    }
    ngOnChanges(changes) {
        if (changes['period'] && changes['period'].currentValue
            || changes['format'] && changes['format'].currentValue) {
            const hours = TimepickerTimeUtils.getHours(this.format);
            this.hours = TimepickerTimeUtils.disableHours(hours, {
                min: this.minTime,
                max: this.maxTime,
                format: this.format,
                period: this.period
            });
        }
        if (changes['period'] && changes['period'].currentValue
            || changes['hour'] && changes['hour'].currentValue) {
            const minutes = TimepickerTimeUtils.getMinutes(this.minutesGap);
            this.minutes = TimepickerTimeUtils.disableMinutes(minutes, +this.hour, {
                min: this.minTime,
                max: this.maxTime,
                format: this.format,
                period: this.period
            });
        }
    }
    changeTimeUnit(unit) {
        this.timeUnitChanged.next(unit);
    }
    changePeriod(period) {
        this.periodChanged.next(period);
    }
    changeHour(hour) {
        this.hourChanged.next(hour);
    }
    changeMinute(minute) {
        this.minuteChanged.next(minute);
    }
    showHint() {
        this.isHintVisible = true;
    }
    hideHint() {
        this.isHintVisible = false;
    }
};
NgxMaterialTimepickerDialComponent.ctorParameters = () => [
    { type: String, decorators: [{ type: Inject, args: [TIME_LOCALE,] }] }
];
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
export { NgxMaterialTimepickerDialComponent };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibmd4LW1hdGVyaWFsLXRpbWVwaWNrZXItZGlhbC5jb21wb25lbnQuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9uZ3gtbWF0ZXJpYWwtdGltZXBpY2tlci8iLCJzb3VyY2VzIjpbInNyYy9hcHAvbWF0ZXJpYWwtdGltZXBpY2tlci9jb21wb25lbnRzL3RpbWVwaWNrZXItZGlhbC9uZ3gtbWF0ZXJpYWwtdGltZXBpY2tlci1kaWFsLmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUEsT0FBTyxFQUNILHVCQUF1QixFQUN2QixTQUFTLEVBQ1QsWUFBWSxFQUNaLE1BQU0sRUFDTixLQUFLLEVBRUwsTUFBTSxFQUdULE1BQU0sZUFBZSxDQUFDO0FBRXZCLE9BQU8sRUFBRSxRQUFRLEVBQUUsTUFBTSw2QkFBNkIsQ0FBQztBQUV2RCxPQUFPLEVBQVksSUFBSSxFQUFFLE1BQU0sT0FBTyxDQUFDO0FBQ3ZDLE9BQU8sRUFBRSxXQUFXLEVBQUUsTUFBTSxnQ0FBZ0MsQ0FBQztBQUM3RCxPQUFPLEVBQUUsbUJBQW1CLEVBQUUsTUFBTSxtQ0FBbUMsQ0FBQztBQVF4RSxJQUFhLGtDQUFrQyxHQUEvQyxNQUFhLGtDQUFrQztJQTJCM0MsWUFBeUMsTUFBYztRQUFkLFdBQU0sR0FBTixNQUFNLENBQVE7UUF6QnZELGFBQVEsR0FBRyxRQUFRLENBQUM7UUFJcEIsY0FBUyxHQUFHLElBQUksQ0FBQyxTQUFTLENBQUMsRUFBQyxNQUFNLEVBQUUsSUFBSSxDQUFDLE1BQU0sRUFBQyxDQUFDLENBQUM7UUFnQnhDLGtCQUFhLEdBQUcsSUFBSSxZQUFZLEVBQWMsQ0FBQztRQUMvQyxvQkFBZSxHQUFHLElBQUksWUFBWSxFQUFZLENBQUM7UUFDL0MsZ0JBQVcsR0FBRyxJQUFJLFlBQVksRUFBaUIsQ0FBQztRQUNoRCxrQkFBYSxHQUFHLElBQUksWUFBWSxFQUFpQixDQUFDO0lBRzVELENBQUM7SUFFRCxXQUFXLENBQUMsT0FBc0I7UUFDOUIsSUFBSSxPQUFPLENBQUMs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ZSxFQUFFLHVCQUF1QixDQUFDLE1BQU07O0tBQ2xELENBQUM7SUE0QmUsbUJBQUEsTUFBTSxDQUFDLFdBQVcsQ0FBQyxDQUFBO0dBM0J2QixrQ0FBa0MsQ0E4RTlDO1NBOUVZLGtDQUFrQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7XG4gICAgQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3ksXG4gICAgQ29tcG9uZW50LFxuICAgIEV2ZW50RW1pdHRlcixcbiAgICBJbmplY3QsXG4gICAgSW5wdXQsXG4gICAgT25DaGFuZ2VzLFxuICAgIE91dHB1dCxcbiAgICBTaW1wbGVDaGFuZ2VzLFxuICAgIFRlbXBsYXRlUmVmXG59IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgVGltZVBlcmlvZCB9IGZyb20gJy4uLy4uL21vZGVscy90aW1lLXBlcmlvZC5lbnVtJztcbmltcG9ydCB7IFRpbWVVbml0IH0gZnJvbSAnLi4vLi4vbW9kZWxzL3RpbWUtdW5pdC5lbnVtJztcbmltcG9ydCB7IENsb2NrRmFjZVRpbWUgfSBmcm9tICcuLi8uLi9tb2RlbHMvY2xvY2stZmFjZS10aW1lLmludGVyZmFjZSc7XG5pbXBvcnQgeyBEYXRlVGltZSwgSW5mbyB9IGZyb20gJ2x1eG9uJztcbmltcG9ydCB7IFRJTUVfTE9DQUxFIH0gZnJvbSAnLi4vLi4vdG9rZW5zL3RpbWUtbG9jYWxlLnRva2VuJztcbmltcG9ydCB7IFRpbWVwaWNrZXJUaW1lVXRpbHMgfSBmcm9tICcuLi8uLi91dGlscy90aW1lcGlja2VyLXRpbWUudXRpbHMnO1xuXG5AQ29tcG9uZW50KHtcbiAgICBzZWxlY3RvcjogJ25neC1tYXRlcmlhbC10aW1lcGlja2VyLWRpYWwnLFxuICAgIHRlbXBsYXRlVXJsOiAnbmd4LW1hdGVyaWFsLXRpbWVwaWNrZXItZGlhbC5jb21wb25lbnQuaHRtbCcsXG4gICAgc3R5bGVVcmxzOiBbJ25neC1tYXRlcmlhbC10aW1lcGlja2VyLWRpYWwuY29tcG9uZW50LnNjc3MnXSxcbiAgICBjaGFuZ2VEZXRlY3Rpb246IENoYW5nZURldGVjdGlvblN0cmF0ZWd5Lk9uUHVzaFxufSlcbmV4cG9ydCBjbGFzcyBOZ3hNYXRlcmlhbFRpbWVwaWNrZXJEaWFsQ29tcG9uZW50IGltcGxlbWVudHMgT25DaGFuZ2VzIHtcblxuICAgIHRpbWVVbml0ID0gVGltZVVuaXQ7XG5cbiAgICBob3VyczogQ2xvY2tGYWNlVGltZVtdO1xuICAgIG1pbnV0ZXM6IENsb2NrRmFjZVRpbWVbXTtcbiAgICBtZXJpZGllbXMgPSBJbmZvLm1lcmlkaWVtcyh7bG9jYWxlOiB0aGlzLmxvY2FsZX0pO1xuXG4gICAgaXNIaW50VmlzaWJsZTogYm9vbGVhbjtcblxuICAgIEBJbnB1dCgpIGVkaXRhYmxlSGludFRtcGw6IFRlbXBsYXRlUmVmPE5vZGU+O1xuICAgIEBJbnB1dCgpIGhvdXI6IG51bWJlciB8IHN0cmluZztcbiAgICBASW5wdXQoKSBtaW51dGU6IG51bWJlciB8IHN0cmluZztcbiAgICBASW5wdXQoKSBmb3JtYXQ6IG51bWJlcjtcbiAgICBASW5wdXQoKSBwZXJpb2Q6IFRpbWVQZXJpb2Q7XG4gICAgQElucHV0KCkgYWN0aXZlVGltZVVuaXQ6IFRpbWVVbml0O1xuICAgIEBJbnB1dCgpIG1pblRpbWU6IERhdGVUaW1lO1xuICAgIEBJbnB1dCgpIG1heFRpbWU6IERhdGVUaW1lO1xuICAgIEBJbnB1dCgpIGlzRWRpdGFibGU6IGJvb2xlYW47XG4gICAgQElucHV0KCkgbWludXRlc0dhcDogbnVtYmVyO1xuICAgIEBJbnB1dCgpIGhvdXJzT25seTogYm9vbGVhbjtcblxuICAgIEBPdXRwdXQoKSBwZXJpb2RDaGFuZ2VkID0gbmV3IEV2ZW50RW1pdHRlcjxUaW1lUGVyaW9kPigpO1xuICAgIEBPdXRwdXQoKSB0aW1lVW5pdENoYW5nZWQgPSBuZXcgRXZlbnRFbWl0dGVyPFRpbWVVbml0PigpO1xuICAgIEBPdXRwdXQoKSBob3VyQ2hhbmdlZCA9IG5ldyBFdmVudEVtaXR0ZXI8Q2xvY2tGYWNlVGltZT4oKTtcbiAgICBAT3V0cHV0KCkgbWludXRlQ2hhbmdlZCA9IG5ldyBFdmVudEVtaXR0ZXI8Q2xvY2tGYWNlVGltZT4oKTtcblxuICAgIGNvbnN0cnVjdG9yKEBJbmplY3QoVElNRV9MT0NBTEUpIHByaXZhdGUgbG9jYWxlOiBzdHJpbmcpIHtcbiAgICB9XG5cbiAgICBuZ09uQ2hhbmdlcyhjaGFuZ2VzOiBTaW1wbGVDaGFuZ2VzKSB7XG4gICAgICAgIGlmIChjaGFuZ2VzWydwZXJpb2QnXSAmJiBjaGFuZ2VzWydwZXJpb2QnXS5jdXJyZW50VmFsdWVcbiAgICAgICAgICAgIHx8IGNoYW5nZXNbJ2Zvcm1hdCddICYmIGNoYW5nZXNbJ2Zvcm1hdCddLmN1cnJlbnRWYWx1ZSkge1xuICAgICAgICAgICAgY29uc3QgaG91cnMgPSBUaW1lcGlja2VyVGltZVV0aWxzLmdldEhvdXJzKHRoaXMuZm9ybWF0KTtcblxuICAgICAgICAgICAgdGhpcy5ob3VycyA9IFRpbWVwaWNrZXJUaW1lVXRpbHMuZGlzYWJsZUhvdXJzKGhvdXJzLCB7XG4gICAgICAgICAgICAgICAgbWluOiB0aGlzLm1pblRpbWUsXG4gICAgICAgICAgICAgICAgbWF4OiB0aGlzLm1heFRpbWUsXG4gICAgICAgICAgICAgICAgZm9ybWF0OiB0aGlzLmZvcm1hdCxcbiAgICAgICAgICAgICAgICBwZXJpb2Q6IHRoaXMucGVyaW9kXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgICAgICBpZiAoY2hhbmdlc1sncGVyaW9kJ10gJiYgY2hhbmdlc1sncGVyaW9kJ10uY3VycmVudFZhbHVlXG4gICAgICAgICAgICB8fCBjaGFuZ2VzWydob3VyJ10gJiYgY2hhbmdlc1snaG91ciddLmN1cnJlbnRWYWx1ZSkge1xuICAgICAgICAgICAgY29uc3QgbWludXRlcyA9IFRpbWVwaWNrZXJUaW1lVXRpbHMuZ2V0TWludXRlcyh0aGlzLm1pbnV0ZXNHYXApO1xuXG4gICAgICAgICAgICB0aGlzLm1pbnV0ZXMgPSBUaW1lcGlja2VyVGltZVV0aWxzLmRpc2FibGVNaW51dGVzKG1pbnV0ZXMsICt0aGlzLmhvdXIsIHtcbiAgICAgICAgICAgICAgICBtaW46IHRoaXMubWluVGltZSxcbiAgICAgICAgICAgICAgICBtYXg6IHRoaXMubWF4VGltZSxcbiAgICAgICAgICAgICAgICBmb3JtYXQ6IHRoaXMuZm9ybWF0LFxuICAgICAgICAgICAgICAgIHBlcmlvZDogdGhpcy5wZXJpb2RcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgY2hhbmdlVGltZVVuaXQodW5pdDogVGltZVVuaXQpOiB2b2lkIHtcbiAgICAgICAgdGhpcy50aW1lVW5pdENoYW5nZWQubmV4dCh1bml0KTtcbiAgICB9XG5cbiAgICBjaGFuZ2VQZXJpb2QocGVyaW9kOiBUaW1lUGVyaW9kKTogdm9pZCB7XG4gICAgICAgIHRoaXMucGVyaW9kQ2hhbmdlZC5uZXh0KHBlcmlvZCk7XG4gICAgfVxuXG4gICAgY2hhbmdlSG91cihob3VyOiBDbG9ja0ZhY2VUaW1lKTogdm9pZCB7XG4gICAgICAgIHRoaXMuaG91ckNoYW5nZWQubmV4dChob3VyKTtcbiAgICB9XG5cbiAgICBjaGFuZ2VNaW51dGUobWludXRlOiBDbG9ja0ZhY2VUaW1lKTogdm9pZCB7XG4gICAgICAgIHRoaXMubWludXRlQ2hhbmdlZC5uZXh0KG1pbnV0ZSk7XG4gICAgfVxuXG4gICAgc2hvd0hpbnQoKTogdm9pZCB7XG4gICAgICAgIHRoaXMuaXNIaW50VmlzaWJsZSA9IHRydWU7XG4gICAgfVxuXG4gICAgaGlkZUhpbnQoKTogdm9pZCB7XG4gICAgICAgIHRoaXMuaXNIaW50VmlzaWJsZSA9IGZhbHNlO1xuICAgIH1cbn1cbiJdfQ==