import * as tslib_1 from "tslib";
import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { NgxMaterialTimepickerHoursFace } from '../timepicker-hours-face/ngx-material-timepicker-hours-face';
import { TimepickerTimeUtils } from '../../utils/timepicker-time.utils';
let NgxMaterialTimepicker12HoursFaceComponent = class NgxMaterialTimepicker12HoursFaceComponent extends NgxMaterialTimepickerHoursFace {
    constructor() {
        super(12);
    }
    ngOnChanges(changes) {
        if (changes['period'] && changes['period'].currentValue) {
            this.hoursList = TimepickerTimeUtils.disableHours(this.hoursList, {
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
], NgxMaterialTimepicker12HoursFaceComponent.prototype, "period", void 0);
NgxMaterialTimepicker12HoursFaceComponent = tslib_1.__decorate([
    Component({
        selector: 'ngx-material-timepicker-12-hours-face',
        template: "<ngx-material-timepicker-face [selectedTime]=\"selectedHour\" [faceTime]=\"hoursList\"\n                              (timeChange)=\"hourChange.next($event)\" (timeSelected)=\"onTimeSelected($event)\"></ngx-material-timepicker-face>\n",
        changeDetection: ChangeDetectionStrategy.OnPush
    })
], NgxMaterialTimepicker12HoursFaceComponent);
export { NgxMaterialTimepicker12HoursFaceComponent };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibmd4LW1hdGVyaWFsLXRpbWVwaWNrZXItMTItaG91cnMtZmFjZS5jb21wb25lbnQuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9uZ3gtbWF0ZXJpYWwtdGltZXBpY2tlci8iLCJzb3VyY2VzIjpbInNyYy9hcHAvbWF0ZXJpYWwtdGltZXBpY2tlci9jb21wb25lbnRzL3RpbWVwaWNrZXItMTItaG91cnMtZmFjZS9uZ3gtbWF0ZXJpYWwtdGltZXBpY2tlci0xMi1ob3Vycy1mYWNlLmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUEsT0FBTyxFQUFFLHVCQUF1QixFQUFFLFNBQVMsRUFBRSxLQUFLLEVBQTRCLE1BQU0sZUFBZSxDQUFDO0FBQ3BHLE9BQU8sRUFBRSw4QkFBOEIsRUFBRSxNQUFNLDZEQUE2RCxDQUFDO0FBRTdHLE9BQU8sRUFBRSxtQkFBbUIsRUFBRSxNQUFNLG1DQUFtQyxDQUFDO0FBU3hFLElBQWEseUNBQXlDLEdBQXRELE1BQWEseUNBQTBDLFNBQVEsOEJBQThCO0lBSXpGO1FBQ0ksS0FBSyxDQUFDLEVBQUUsQ0FBQyxDQUFDO0lBQ2QsQ0FBQztJQUVELFdBQVcsQ0FBQyxPQUFzQjtRQUM5QixJQUFJLE9BQU8sQ0FBQyxRQUFRLENBQUMsSUFBSSxPQUFPLENBQUMsUUFBUSxDQUFDLENBQUMsWUFBWSxFQUFFO1lBQ3JELElBQUksQ0FBQyxTQUFTLEdBQUcsbUJBQW1CLENBQUMsWUFBWSxDQUFDLElBQUksQ0FBQyxTQUFTLEVBQUU7Z0JBQzlELEdBQUcsRUFBRSxJQUFJLENBQUMsT0FBTztnQkFDakIsR0FBRyxFQUFFLElBQUksQ0FBQyxPQUFPO2dCQUNqQixNQUFNLEVBQUUsSUFBSSxDQUFDLE1BQU07Z0JBQ25CLE1BQU0sRUFBRSxJQUFJLENBQUMsTUFBTTthQUN0QixDQUFDLENBQUM7U0FDTjtJQUNMLENBQUM7Q0FDSixDQUFBO0FBaEJZO0lBQVIsS0FBSyxFQUFFO3lFQUFvQjtBQUZuQix5Q0FBeUM7SUFOckQsU0FBUyxDQUFDO1FBQ1AsUUFBUSxFQUFFLHVDQUF1QztRQUNqRCxzUEFBbUU7UUFDbkUsZUFBZSxFQUFFLHVCQUF1QixDQUFDLE1BQU07S0FDbEQsQ0FBQztHQUVXLHlDQUF5QyxDQWtCckQ7U0FsQlkseUNBQXlDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3ksIENvbXBvbmVudCwgSW5wdXQsIE9uQ2hhbmdlcywgU2ltcGxlQ2hhbmdlcyB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgTmd4TWF0ZXJpYWxUaW1lcGlja2VySG91cnNGYWNlIH0gZnJvbSAnLi4vdGltZXBpY2tlci1ob3Vycy1mYWNlL25neC1tYXRlcmlhbC10aW1lcGlja2VyLWhvdXJzLWZhY2UnO1xuaW1wb3J0IHsgVGltZVBlcmlvZCB9IGZyb20gJy4uLy4uL21vZGVscy90aW1lLXBlcmlvZC5lbnVtJztcbmltcG9ydCB7IFRpbWVwaWNrZXJUaW1lVXRpbHMgfSBmcm9tICcuLi8uLi91dGlscy90aW1lcGlja2VyLXRpbWUudXRpbHMnO1xuXG5cbkBDb21wb25lbnQoe1xuICAgIHNlbGVjdG9yOiAnbmd4LW1hdGVyaWFsLXRpbWVwaWNrZXItMTItaG91cnMtZmFjZScsXG4gICAgdGVtcGxhdGVVcmw6ICduZ3gtbWF0ZXJpYWwtdGltZXBpY2tlci0xMi1ob3Vycy1mYWNlLmNvbXBvbmVudC5odG1sJyxcbiAgICBjaGFuZ2VEZXRlY3Rpb246IENoYW5nZURldGVjdGlvblN0cmF0ZWd5Lk9uUHVzaFxufSlcblxuZXhwb3J0IGNsYXNzIE5neE1hdGVyaWFsVGltZXBpY2tlcjEySG91cnNGYWNlQ29tcG9uZW50IGV4dGVuZHMgTmd4TWF0ZXJpYWxUaW1lcGlja2VySG91cnNGYWNlIGltcGxlbWVudHMgT25DaGFuZ2VzIHtcblxuICAgIEBJbnB1dCgpIHBlcmlvZDogVGltZVBlcmlvZDtcblxuICAgIGNvbnN0cnVjdG9yKCkge1xuICAgICAgICBzdXBlcigxMik7XG4gICAgfVxuXG4gICAgbmdPbkNoYW5nZXMoY2hhbmdlczogU2ltcGxlQ2hhbmdlcykge1xuICAgICAgICBpZiAoY2hhbmdlc1sncGVyaW9kJ10gJiYgY2hhbmdlc1sncGVyaW9kJ10uY3VycmVudFZhbHVlKSB7XG4gICAgICAgICAgICB0aGlzLmhvdXJzTGlzdCA9IFRpbWVwaWNrZXJUaW1lVXRpbHMuZGlzYWJsZUhvdXJzKHRoaXMuaG91cnNMaXN0LCB7XG4gICAgICAgICAgICAgICAgbWluOiB0aGlzLm1pblRpbWUsXG4gICAgICAgICAgICAgICAgbWF4OiB0aGlzLm1heFRpbWUsXG4gICAgICAgICAgICAgICAgZm9ybWF0OiB0aGlzLmZvcm1hdCxcbiAgICAgICAgICAgICAgICBwZXJpb2Q6IHRoaXMucGVyaW9kXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgIH1cbn1cbiJdfQ==