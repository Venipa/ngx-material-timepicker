import * as tslib_1 from "tslib";
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { TimeUnit } from '../../models/time-unit.enum';
import { TimepickerTimeUtils } from '../../utils/timepicker-time.utils';
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
    return NgxMaterialTimepickerMinutesFaceComponent;
}());
export { NgxMaterialTimepickerMinutesFaceComponent };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibmd4LW1hdGVyaWFsLXRpbWVwaWNrZXItbWludXRlcy1mYWNlLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiJuZzovL25neC1tYXRlcmlhbC10aW1lcGlja2VyLyIsInNvdXJjZXMiOlsic3JjL2FwcC9tYXRlcmlhbC10aW1lcGlja2VyL2NvbXBvbmVudHMvdGltZXBpY2tlci1taW51dGVzLWZhY2Uvbmd4LW1hdGVyaWFsLXRpbWVwaWNrZXItbWludXRlcy1mYWNlLmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUEsT0FBTyxFQUFFLFNBQVMsRUFBRSxZQUFZLEVBQUUsS0FBSyxFQUFhLE1BQU0sRUFBaUIsTUFBTSxlQUFlLENBQUM7QUFFakcsT0FBTyxFQUFFLFFBQVEsRUFBRSxNQUFNLDZCQUE2QixDQUFDO0FBR3ZELE9BQU8sRUFBRSxtQkFBbUIsRUFBRSxNQUFNLG1DQUFtQyxDQUFDO0FBT3hFO0lBSkE7UUFNSSxnQkFBVyxHQUFvQixFQUFFLENBQUM7UUFDbEMsYUFBUSxHQUFHLFFBQVEsQ0FBQztRQVVWLGlCQUFZLEdBQUcsSUFBSSxZQUFZLEVBQWlCLENBQUM7SUFhL0QsQ0FBQztJQVhHLCtEQUFXLEdBQVgsVUFBWSxPQUFzQjtRQUM5QixJQUFJLE9BQU8sQ0FBQyxRQUFRLENBQUMsSUFBSSxPQUFPLENBQUMsUUFBUSxDQUFDLENBQUMsWUFBWSxFQUFFO1lBQ3JELElBQU0sT0FBTyxHQUFHLG1CQUFtQixDQUFDLFVBQVUsQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDLENBQUM7WUFDaEUsSUFBSSxDQUFDLFdBQVcsR0FBRyxtQkFBbUIsQ0FBQyxjQUFjLENBQUMsT0FBTyxFQUFFLElBQUksQ0FBQyxZQUFZLEVBQUU7Z0JBQzlFLEdBQUcsRUFBRSxJQUFJLENBQUMsT0FBTztnQkFDakIsR0FBRyxFQUFFLElBQUksQ0FBQyxPQUFPO2dCQUNqQixNQUFNLEVBQUUsSUFBSSxDQUFDLE1BQU07Z0JBQ25CLE1BQU0sRUFBRSxJQUFJLENBQUMsTUFBTTthQUN0QixDQUFDLENBQUM7U0FDTjtJQUNMLENBQUM7SUFwQlE7UUFBUixLQUFLLEVBQUU7cUZBQStCO0lBQzlCO1FBQVIsS0FBSyxFQUFFO21GQUFzQjtJQUNyQjtRQUFSLEtBQUssRUFBRTs2RUFBb0I7SUFDbkI7UUFBUixLQUFLLEVBQUU7OEVBQW1CO0lBQ2xCO1FBQVIsS0FBSyxFQUFFOzhFQUFtQjtJQUNsQjtRQUFSLEtBQUssRUFBRTs2RUFBZ0I7SUFDZjtRQUFSLEtBQUssRUFBRTtpRkFBb0I7SUFFbEI7UUFBVCxNQUFNLEVBQUU7bUZBQWtEO0lBYmxELHlDQUF5QztRQUpyRCxTQUFTLENBQUM7WUFDUCxRQUFRLEVBQUUsc0NBQXNDO1lBQ2hELHdTQUFvRTtTQUN2RSxDQUFDO09BQ1cseUNBQXlDLENBMEJyRDtJQUFELGdEQUFDO0NBQUEsQUExQkQsSUEwQkM7U0ExQlkseUNBQXlDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ29tcG9uZW50LCBFdmVudEVtaXR0ZXIsIElucHV0LCBPbkNoYW5nZXMsIE91dHB1dCwgU2ltcGxlQ2hhbmdlcyB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgQ2xvY2tGYWNlVGltZSB9IGZyb20gJy4uLy4uL21vZGVscy9jbG9jay1mYWNlLXRpbWUuaW50ZXJmYWNlJztcbmltcG9ydCB7IFRpbWVVbml0IH0gZnJvbSAnLi4vLi4vbW9kZWxzL3RpbWUtdW5pdC5lbnVtJztcbmltcG9ydCB7IFRpbWVQZXJpb2QgfSBmcm9tICcuLi8uLi9tb2RlbHMvdGltZS1wZXJpb2QuZW51bSc7XG5pbXBvcnQgeyBEYXRlVGltZSB9IGZyb20gJ2x1eG9uJztcbmltcG9ydCB7IFRpbWVwaWNrZXJUaW1lVXRpbHMgfSBmcm9tICcuLi8uLi91dGlscy90aW1lcGlja2VyLXRpbWUudXRpbHMnO1xuXG5cbkBDb21wb25lbnQoe1xuICAgIHNlbGVjdG9yOiAnbmd4LW1hdGVyaWFsLXRpbWVwaWNrZXItbWludXRlcy1mYWNlJyxcbiAgICB0ZW1wbGF0ZVVybDogJy4vbmd4LW1hdGVyaWFsLXRpbWVwaWNrZXItbWludXRlcy1mYWNlLmNvbXBvbmVudC5odG1sJ1xufSlcbmV4cG9ydCBjbGFzcyBOZ3hNYXRlcmlhbFRpbWVwaWNrZXJNaW51dGVzRmFjZUNvbXBvbmVudCBpbXBsZW1lbnRzIE9uQ2hhbmdlcyB7XG5cbiAgICBtaW51dGVzTGlzdDogQ2xvY2tGYWNlVGltZVtdID0gW107XG4gICAgdGltZVVuaXQgPSBUaW1lVW5pdDtcblxuICAgIEBJbnB1dCgpIHNlbGVjdGVkTWludXRlOiBDbG9ja0ZhY2VUaW1lO1xuICAgIEBJbnB1dCgpIHNlbGVjdGVkSG91cjogbnVtYmVyO1xuICAgIEBJbnB1dCgpIHBlcmlvZDogVGltZVBlcmlvZDtcbiAgICBASW5wdXQoKSBtaW5UaW1lOiBEYXRlVGltZTtcbiAgICBASW5wdXQoKSBtYXhUaW1lOiBEYXRlVGltZTtcbiAgICBASW5wdXQoKSBmb3JtYXQ6IG51bWJlcjtcbiAgICBASW5wdXQoKSBtaW51dGVzR2FwOiBudW1iZXI7XG5cbiAgICBAT3V0cHV0KCkgbWludXRlQ2hhbmdlID0gbmV3IEV2ZW50RW1pdHRlcjxDbG9ja0ZhY2VUaW1lPigpO1xuXG4gICAgbmdPbkNoYW5nZXMoY2hhbmdlczogU2ltcGxlQ2hhbmdlcykge1xuICAgICAgICBpZiAoY2hhbmdlc1sncGVyaW9kJ10gJiYgY2hhbmdlc1sncGVyaW9kJ10uY3VycmVudFZhbHVlKSB7XG4gICAgICAgICAgICBjb25zdCBtaW51dGVzID0gVGltZXBpY2tlclRpbWVVdGlscy5nZXRNaW51dGVzKHRoaXMubWludXRlc0dhcCk7XG4gICAgICAgICAgICB0aGlzLm1pbnV0ZXNMaXN0ID0gVGltZXBpY2tlclRpbWVVdGlscy5kaXNhYmxlTWludXRlcyhtaW51dGVzLCB0aGlzLnNlbGVjdGVkSG91ciwge1xuICAgICAgICAgICAgICAgIG1pbjogdGhpcy5taW5UaW1lLFxuICAgICAgICAgICAgICAgIG1heDogdGhpcy5tYXhUaW1lLFxuICAgICAgICAgICAgICAgIGZvcm1hdDogdGhpcy5mb3JtYXQsXG4gICAgICAgICAgICAgICAgcGVyaW9kOiB0aGlzLnBlcmlvZFxuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICB9XG59XG5cbiJdfQ==