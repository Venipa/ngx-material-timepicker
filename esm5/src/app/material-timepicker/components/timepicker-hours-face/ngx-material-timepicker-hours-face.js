import * as tslib_1 from "tslib";
import { EventEmitter, Input, Output } from '@angular/core';
import { TimepickerTimeUtils } from '../../utils/timepicker-time.utils';
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
    return NgxMaterialTimepickerHoursFace;
}());
export { NgxMaterialTimepickerHoursFace };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibmd4LW1hdGVyaWFsLXRpbWVwaWNrZXItaG91cnMtZmFjZS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL25neC1tYXRlcmlhbC10aW1lcGlja2VyLyIsInNvdXJjZXMiOlsic3JjL2FwcC9tYXRlcmlhbC10aW1lcGlja2VyL2NvbXBvbmVudHMvdGltZXBpY2tlci1ob3Vycy1mYWNlL25neC1tYXRlcmlhbC10aW1lcGlja2VyLWhvdXJzLWZhY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLE9BQU8sRUFBRSxZQUFZLEVBQUUsS0FBSyxFQUFFLE1BQU0sRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUc1RCxPQUFPLEVBQUUsbUJBQW1CLEVBQUUsTUFBTSxtQ0FBbUMsQ0FBQztBQUd4RTtJQVlJLHdDQUFzQixNQUFjO1FBTDFCLGVBQVUsR0FBRyxJQUFJLFlBQVksRUFBaUIsQ0FBQztRQUMvQyxpQkFBWSxHQUFHLElBQUksWUFBWSxFQUFVLENBQUM7UUFFcEQsY0FBUyxHQUFvQixFQUFFLENBQUM7UUFHNUIsSUFBSSxDQUFDLFNBQVMsR0FBRyxtQkFBbUIsQ0FBQyxRQUFRLENBQUMsTUFBTSxDQUFDLENBQUM7SUFDMUQsQ0FBQztJQUVELHVEQUFjLEdBQWQsVUFBZSxJQUFZO1FBQ3ZCLElBQUksQ0FBQyxZQUFZLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDO0lBQ2pDLENBQUM7SUFoQlE7UUFBUixLQUFLLEVBQUU7d0VBQTZCO0lBQzVCO1FBQVIsS0FBSyxFQUFFO21FQUFtQjtJQUNsQjtRQUFSLEtBQUssRUFBRTttRUFBbUI7SUFDbEI7UUFBUixLQUFLLEVBQUU7a0VBQWdCO0lBRWQ7UUFBVCxNQUFNLEVBQUU7c0VBQWdEO0lBQy9DO1FBQVQsTUFBTSxFQUFFO3dFQUEyQztJQVd4RCxxQ0FBQztDQUFBLEFBbkJELElBbUJDO1NBbkJZLDhCQUE4QiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEV2ZW50RW1pdHRlciwgSW5wdXQsIE91dHB1dCB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgRGF0ZVRpbWUgfSBmcm9tICdsdXhvbic7XG5pbXBvcnQgeyBDbG9ja0ZhY2VUaW1lIH0gZnJvbSAnLi4vLi4vbW9kZWxzL2Nsb2NrLWZhY2UtdGltZS5pbnRlcmZhY2UnO1xuaW1wb3J0IHsgVGltZXBpY2tlclRpbWVVdGlscyB9IGZyb20gJy4uLy4uL3V0aWxzL3RpbWVwaWNrZXItdGltZS51dGlscyc7XG5cblxuZXhwb3J0IGNsYXNzIE5neE1hdGVyaWFsVGltZXBpY2tlckhvdXJzRmFjZSB7XG5cbiAgICBASW5wdXQoKSBzZWxlY3RlZEhvdXI6IENsb2NrRmFjZVRpbWU7XG4gICAgQElucHV0KCkgbWluVGltZTogRGF0ZVRpbWU7XG4gICAgQElucHV0KCkgbWF4VGltZTogRGF0ZVRpbWU7XG4gICAgQElucHV0KCkgZm9ybWF0OiBudW1iZXI7XG5cbiAgICBAT3V0cHV0KCkgaG91ckNoYW5nZSA9IG5ldyBFdmVudEVtaXR0ZXI8Q2xvY2tGYWNlVGltZT4oKTtcbiAgICBAT3V0cHV0KCkgaG91clNlbGVjdGVkID0gbmV3IEV2ZW50RW1pdHRlcjxudW1iZXI+KCk7XG5cbiAgICBob3Vyc0xpc3Q6IENsb2NrRmFjZVRpbWVbXSA9IFtdO1xuXG4gICAgcHJvdGVjdGVkIGNvbnN0cnVjdG9yKGZvcm1hdDogbnVtYmVyKSB7XG4gICAgICAgIHRoaXMuaG91cnNMaXN0ID0gVGltZXBpY2tlclRpbWVVdGlscy5nZXRIb3Vycyhmb3JtYXQpO1xuICAgIH1cblxuICAgIG9uVGltZVNlbGVjdGVkKHRpbWU6IG51bWJlcik6IHZvaWQge1xuICAgICAgICB0aGlzLmhvdXJTZWxlY3RlZC5uZXh0KHRpbWUpO1xuICAgIH1cbn1cbiJdfQ==