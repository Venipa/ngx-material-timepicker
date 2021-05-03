import * as tslib_1 from "tslib";
import { EventEmitter, Input, Output } from '@angular/core';
import { TimepickerTimeUtils } from '../../utils/timepicker-time.utils';
export class NgxMaterialTimepickerHoursFace {
    constructor(format) {
        this.hourChange = new EventEmitter();
        this.hourSelected = new EventEmitter();
        this.hoursList = [];
        this.hoursList = TimepickerTimeUtils.getHours(format);
    }
    onTimeSelected(time) {
        this.hourSelected.next(time);
    }
}
tslib_1.__decorate([
    Input()
], NgxMaterialTimepickerHoursFace.prototype, "selectedHour", void 0);
tslib_1.__decorate([
    Input()
], NgxMaterialTimepickerHoursFace.prototype, "minTime", void 0);
tslib_1.__decorate([
    Input()
], NgxMaterialTimepickerHoursFace.prototype, "maxTime", void 0);
tslib_1.__decorate([
    Input()
], NgxMaterialTimepickerHoursFace.prototype, "format", void 0);
tslib_1.__decorate([
    Output()
], NgxMaterialTimepickerHoursFace.prototype, "hourChange", void 0);
tslib_1.__decorate([
    Output()
], NgxMaterialTimepickerHoursFace.prototype, "hourSelected", void 0);
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibmd4LW1hdGVyaWFsLXRpbWVwaWNrZXItaG91cnMtZmFjZS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL25neC1tYXRlcmlhbC10aW1lcGlja2VyLyIsInNvdXJjZXMiOlsic3JjL2FwcC9tYXRlcmlhbC10aW1lcGlja2VyL2NvbXBvbmVudHMvdGltZXBpY2tlci1ob3Vycy1mYWNlL25neC1tYXRlcmlhbC10aW1lcGlja2VyLWhvdXJzLWZhY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLE9BQU8sRUFBRSxZQUFZLEVBQUUsS0FBSyxFQUFFLE1BQU0sRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUc1RCxPQUFPLEVBQUUsbUJBQW1CLEVBQUUsTUFBTSxtQ0FBbUMsQ0FBQztBQUd4RSxNQUFNLE9BQU8sOEJBQThCO0lBWXZDLFlBQXNCLE1BQWM7UUFMMUIsZUFBVSxHQUFHLElBQUksWUFBWSxFQUFpQixDQUFDO1FBQy9DLGlCQUFZLEdBQUcsSUFBSSxZQUFZLEVBQVUsQ0FBQztRQUVwRCxjQUFTLEdBQW9CLEVBQUUsQ0FBQztRQUc1QixJQUFJLENBQUMsU0FBUyxHQUFHLG1CQUFtQixDQUFDLFFBQVEsQ0FBQyxNQUFNLENBQUMsQ0FBQztJQUMxRCxDQUFDO0lBRUQsY0FBYyxDQUFDLElBQVk7UUFDdkIsSUFBSSxDQUFDLFlBQVksQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7SUFDakMsQ0FBQztDQUNKO0FBakJZO0lBQVIsS0FBSyxFQUFFO29FQUE2QjtBQUM1QjtJQUFSLEtBQUssRUFBRTsrREFBbUI7QUFDbEI7SUFBUixLQUFLLEVBQUU7K0RBQW1CO0FBQ2xCO0lBQVIsS0FBSyxFQUFFOzhEQUFnQjtBQUVkO0lBQVQsTUFBTSxFQUFFO2tFQUFnRDtBQUMvQztJQUFULE1BQU0sRUFBRTtvRUFBMkMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBFdmVudEVtaXR0ZXIsIElucHV0LCBPdXRwdXQgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IERhdGVUaW1lIH0gZnJvbSAnbHV4b24nO1xuaW1wb3J0IHsgQ2xvY2tGYWNlVGltZSB9IGZyb20gJy4uLy4uL21vZGVscy9jbG9jay1mYWNlLXRpbWUuaW50ZXJmYWNlJztcbmltcG9ydCB7IFRpbWVwaWNrZXJUaW1lVXRpbHMgfSBmcm9tICcuLi8uLi91dGlscy90aW1lcGlja2VyLXRpbWUudXRpbHMnO1xuXG5cbmV4cG9ydCBjbGFzcyBOZ3hNYXRlcmlhbFRpbWVwaWNrZXJIb3Vyc0ZhY2Uge1xuXG4gICAgQElucHV0KCkgc2VsZWN0ZWRIb3VyOiBDbG9ja0ZhY2VUaW1lO1xuICAgIEBJbnB1dCgpIG1pblRpbWU6IERhdGVUaW1lO1xuICAgIEBJbnB1dCgpIG1heFRpbWU6IERhdGVUaW1lO1xuICAgIEBJbnB1dCgpIGZvcm1hdDogbnVtYmVyO1xuXG4gICAgQE91dHB1dCgpIGhvdXJDaGFuZ2UgPSBuZXcgRXZlbnRFbWl0dGVyPENsb2NrRmFjZVRpbWU+KCk7XG4gICAgQE91dHB1dCgpIGhvdXJTZWxlY3RlZCA9IG5ldyBFdmVudEVtaXR0ZXI8bnVtYmVyPigpO1xuXG4gICAgaG91cnNMaXN0OiBDbG9ja0ZhY2VUaW1lW10gPSBbXTtcblxuICAgIHByb3RlY3RlZCBjb25zdHJ1Y3Rvcihmb3JtYXQ6IG51bWJlcikge1xuICAgICAgICB0aGlzLmhvdXJzTGlzdCA9IFRpbWVwaWNrZXJUaW1lVXRpbHMuZ2V0SG91cnMoZm9ybWF0KTtcbiAgICB9XG5cbiAgICBvblRpbWVTZWxlY3RlZCh0aW1lOiBudW1iZXIpOiB2b2lkIHtcbiAgICAgICAgdGhpcy5ob3VyU2VsZWN0ZWQubmV4dCh0aW1lKTtcbiAgICB9XG59XG4iXX0=