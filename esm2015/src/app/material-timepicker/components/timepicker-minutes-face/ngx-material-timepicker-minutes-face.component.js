import * as tslib_1 from "tslib";
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { TimeUnit } from '../../models/time-unit.enum';
import { TimepickerTimeUtils } from '../../utils/timepicker-time.utils';
let NgxMaterialTimepickerMinutesFaceComponent = class NgxMaterialTimepickerMinutesFaceComponent {
    constructor() {
        this.minutesList = [];
        this.timeUnit = TimeUnit;
        this.minuteChange = new EventEmitter();
    }
    ngOnChanges(changes) {
        if (changes['period'] && changes['period'].currentValue) {
            const minutes = TimepickerTimeUtils.getMinutes(this.minutesGap);
            this.minutesList = TimepickerTimeUtils.disableMinutes(minutes, this.selectedHour, {
                min: this.minTime,
                max: this.maxTime,
                format: this.format,
                period: this.period
            });
        }
    }
};
tslib_1.__decorate([
    Input()
], NgxMaterialTimepickerMinutesFaceComponent.prototype, "selectedMinute", void 0);
tslib_1.__decorate([
    Input()
], NgxMaterialTimepickerMinutesFaceComponent.prototype, "selectedHour", void 0);
tslib_1.__decorate([
    Input()
], NgxMaterialTimepickerMinutesFaceComponent.prototype, "period", void 0);
tslib_1.__decorate([
    Input()
], NgxMaterialTimepickerMinutesFaceComponent.prototype, "minTime", void 0);
tslib_1.__decorate([
    Input()
], NgxMaterialTimepickerMinutesFaceComponent.prototype, "maxTime", void 0);
tslib_1.__decorate([
    Input()
], NgxMaterialTimepickerMinutesFaceComponent.prototype, "format", void 0);
tslib_1.__decorate([
    Input()
], NgxMaterialTimepickerMinutesFaceComponent.prototype, "minutesGap", void 0);
tslib_1.__decorate([
    Output()
], NgxMaterialTimepickerMinutesFaceComponent.prototype, "minuteChange", void 0);
NgxMaterialTimepickerMinutesFaceComponent = tslib_1.__decorate([
    Component({
        selector: 'ngx-material-timepicker-minutes-face',
        template: "<ngx-material-timepicker-face [faceTime]=\"minutesList\" [selectedTime]=\"selectedMinute\"\n                              [minutesGap]=\"minutesGap\"\n                              (timeChange)=\"minuteChange.next($event)\" [unit]=\"timeUnit.MINUTE\"></ngx-material-timepicker-face>\n"
    })
], NgxMaterialTimepickerMinutesFaceComponent);
export { NgxMaterialTimepickerMinutesFaceComponent };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibmd4LW1hdGVyaWFsLXRpbWVwaWNrZXItbWludXRlcy1mYWNlLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiJuZzovL25neC1tYXRlcmlhbC10aW1lcGlja2VyLyIsInNvdXJjZXMiOlsic3JjL2FwcC9tYXRlcmlhbC10aW1lcGlja2VyL2NvbXBvbmVudHMvdGltZXBpY2tlci1taW51dGVzLWZhY2Uvbmd4LW1hdGVyaWFsLXRpbWVwaWNrZXItbWludXRlcy1mYWNlLmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUEsT0FBTyxFQUFFLFNBQVMsRUFBRSxZQUFZLEVBQUUsS0FBSyxFQUFhLE1BQU0sRUFBaUIsTUFBTSxlQUFlLENBQUM7QUFFakcsT0FBTyxFQUFFLFFBQVEsRUFBRSxNQUFNLDZCQUE2QixDQUFDO0FBR3ZELE9BQU8sRUFBRSxtQkFBbUIsRUFBRSxNQUFNLG1DQUFtQyxDQUFDO0FBT3hFLElBQWEseUNBQXlDLEdBQXRELE1BQWEseUNBQXlDO0lBSnREO1FBTUksZ0JBQVcsR0FBb0IsRUFBRSxDQUFDO1FBQ2xDLGFBQVEsR0FBRyxRQUFRLENBQUM7UUFVVixpQkFBWSxHQUFHLElBQUksWUFBWSxFQUFpQixDQUFDO0lBYS9ELENBQUM7SUFYRyxXQUFXLENBQUMsT0FBc0I7UUFDOUIsSUFBSSxPQUFPLENBQUMsUUFBUSxDQUFDLElBQUksT0FBTyxDQUFDLFFBQVEsQ0FBQyxDQUFDLFlBQVksRUFBRTtZQUNyRCxNQUFNLE9BQU8sR0FBRyxtQkFBbUIsQ0FBQyxVQUFVLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxDQUFDO1lBQ2hFLElBQUksQ0FBQyxXQUFXLEdBQUcsbUJBQW1CLENBQUMsY0FBYyxDQUFDLE9BQU8sRUFBRSxJQUFJLENBQUMsWUFBWSxFQUFFO2dCQUM5RSxHQUFHLEVBQUUsSUFBSSxDQUFDLE9BQU87Z0JBQ2pCLEdBQUcsRUFBRSxJQUFJLENBQUMsT0FBTztnQkFDakIsTUFBTSxFQUFFLElBQUksQ0FBQyxNQUFNO2dCQUNuQixNQUFNLEVBQUUsSUFBSSxDQUFDLE1BQU07YUFDdEIsQ0FBQyxDQUFDO1NBQ047SUFDTCxDQUFDO0NBQ0osQ0FBQTtBQXJCWTtJQUFSLEtBQUssRUFBRTtpRkFBK0I7QUFDOUI7SUFBUixLQUFLLEVBQUU7K0VBQXNCO0FBQ3JCO0lBQVIsS0FBSyxFQUFFO3lFQUFvQjtBQUNuQjtJQUFSLEtBQUssRUFBRTswRUFBbUI7QUFDbEI7SUFBUixLQUFLLEVBQUU7MEVBQW1CO0FBQ2xCO0lBQVIsS0FBSyxFQUFFO3lFQUFnQjtBQUNmO0lBQVIsS0FBSyxFQUFFOzZFQUFvQjtBQUVsQjtJQUFULE1BQU0sRUFBRTsrRUFBa0Q7QUFibEQseUNBQXlDO0lBSnJELFNBQVMsQ0FBQztRQUNQLFFBQVEsRUFBRSxzQ0FBc0M7UUFDaEQsd1NBQW9FO0tBQ3ZFLENBQUM7R0FDVyx5Q0FBeUMsQ0EwQnJEO1NBMUJZLHlDQUF5QyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENvbXBvbmVudCwgRXZlbnRFbWl0dGVyLCBJbnB1dCwgT25DaGFuZ2VzLCBPdXRwdXQsIFNpbXBsZUNoYW5nZXMgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IENsb2NrRmFjZVRpbWUgfSBmcm9tICcuLi8uLi9tb2RlbHMvY2xvY2stZmFjZS10aW1lLmludGVyZmFjZSc7XG5pbXBvcnQgeyBUaW1lVW5pdCB9IGZyb20gJy4uLy4uL21vZGVscy90aW1lLXVuaXQuZW51bSc7XG5pbXBvcnQgeyBUaW1lUGVyaW9kIH0gZnJvbSAnLi4vLi4vbW9kZWxzL3RpbWUtcGVyaW9kLmVudW0nO1xuaW1wb3J0IHsgRGF0ZVRpbWUgfSBmcm9tICdsdXhvbic7XG5pbXBvcnQgeyBUaW1lcGlja2VyVGltZVV0aWxzIH0gZnJvbSAnLi4vLi4vdXRpbHMvdGltZXBpY2tlci10aW1lLnV0aWxzJztcblxuXG5AQ29tcG9uZW50KHtcbiAgICBzZWxlY3RvcjogJ25neC1tYXRlcmlhbC10aW1lcGlja2VyLW1pbnV0ZXMtZmFjZScsXG4gICAgdGVtcGxhdGVVcmw6ICcuL25neC1tYXRlcmlhbC10aW1lcGlja2VyLW1pbnV0ZXMtZmFjZS5jb21wb25lbnQuaHRtbCdcbn0pXG5leHBvcnQgY2xhc3MgTmd4TWF0ZXJpYWxUaW1lcGlja2VyTWludXRlc0ZhY2VDb21wb25lbnQgaW1wbGVtZW50cyBPbkNoYW5nZXMge1xuXG4gICAgbWludXRlc0xpc3Q6IENsb2NrRmFjZVRpbWVbXSA9IFtdO1xuICAgIHRpbWVVbml0ID0gVGltZVVuaXQ7XG5cbiAgICBASW5wdXQoKSBzZWxlY3RlZE1pbnV0ZTogQ2xvY2tGYWNlVGltZTtcbiAgICBASW5wdXQoKSBzZWxlY3RlZEhvdXI6IG51bWJlcjtcbiAgICBASW5wdXQoKSBwZXJpb2Q6IFRpbWVQZXJpb2Q7XG4gICAgQElucHV0KCkgbWluVGltZTogRGF0ZVRpbWU7XG4gICAgQElucHV0KCkgbWF4VGltZTogRGF0ZVRpbWU7XG4gICAgQElucHV0KCkgZm9ybWF0OiBudW1iZXI7XG4gICAgQElucHV0KCkgbWludXRlc0dhcDogbnVtYmVyO1xuXG4gICAgQE91dHB1dCgpIG1pbnV0ZUNoYW5nZSA9IG5ldyBFdmVudEVtaXR0ZXI8Q2xvY2tGYWNlVGltZT4oKTtcblxuICAgIG5nT25DaGFuZ2VzKGNoYW5nZXM6IFNpbXBsZUNoYW5nZXMpIHtcbiAgICAgICAgaWYgKGNoYW5nZXNbJ3BlcmlvZCddICYmIGNoYW5nZXNbJ3BlcmlvZCddLmN1cnJlbnRWYWx1ZSkge1xuICAgICAgICAgICAgY29uc3QgbWludXRlcyA9IFRpbWVwaWNrZXJUaW1lVXRpbHMuZ2V0TWludXRlcyh0aGlzLm1pbnV0ZXNHYXApO1xuICAgICAgICAgICAgdGhpcy5taW51dGVzTGlzdCA9IFRpbWVwaWNrZXJUaW1lVXRpbHMuZGlzYWJsZU1pbnV0ZXMobWludXRlcywgdGhpcy5zZWxlY3RlZEhvdXIsIHtcbiAgICAgICAgICAgICAgICBtaW46IHRoaXMubWluVGltZSxcbiAgICAgICAgICAgICAgICBtYXg6IHRoaXMubWF4VGltZSxcbiAgICAgICAgICAgICAgICBmb3JtYXQ6IHRoaXMuZm9ybWF0LFxuICAgICAgICAgICAgICAgIHBlcmlvZDogdGhpcy5wZXJpb2RcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgfVxufVxuXG4iXX0=