import * as tslib_1 from "tslib";
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { NgxMaterialTimepickerHoursFace } from '../timepicker-hours-face/ngx-material-timepicker-hours-face';
import { TimepickerTimeUtils } from '../../utils/timepicker-time.utils';
var NgxMaterialTimepicker24HoursFaceComponent = /** @class */ (function (_super) {
    tslib_1.__extends(NgxMaterialTimepicker24HoursFaceComponent, _super);
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
    NgxMaterialTimepicker24HoursFaceComponent = tslib_1.__decorate([
        Component({
            selector: 'ngx-material-timepicker-24-hours-face',
            template: "<ngx-material-timepicker-face [selectedTime]=\"selectedHour\" [faceTime]=\"hoursList\" [format]=\"format\"\n                              (timeChange)=\"hourChange.next($event)\"\n                              (timeSelected)=\"onTimeSelected($event)\"></ngx-material-timepicker-face>\n",
            changeDetection: ChangeDetectionStrategy.OnPush
        })
    ], NgxMaterialTimepicker24HoursFaceComponent);
    return NgxMaterialTimepicker24HoursFaceComponent;
}(NgxMaterialTimepickerHoursFace));
export { NgxMaterialTimepicker24HoursFaceComponent };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibmd4LW1hdGVyaWFsLXRpbWVwaWNrZXItMjQtaG91cnMtZmFjZS5jb21wb25lbnQuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9uZ3gtbWF0ZXJpYWwtdGltZXBpY2tlci8iLCJzb3VyY2VzIjpbInNyYy9hcHAvbWF0ZXJpYWwtdGltZXBpY2tlci9jb21wb25lbnRzL3RpbWVwaWNrZXItMjQtaG91cnMtZmFjZS9uZ3gtbWF0ZXJpYWwtdGltZXBpY2tlci0yNC1ob3Vycy1mYWNlLmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUEsT0FBTyxFQUFvQix1QkFBdUIsRUFBRSxTQUFTLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDckYsT0FBTyxFQUFFLDhCQUE4QixFQUFFLE1BQU0sNkRBQTZELENBQUM7QUFDN0csT0FBTyxFQUFFLG1CQUFtQixFQUFFLE1BQU0sbUNBQW1DLENBQUM7QUFReEU7SUFBK0QscUVBQThCO0lBRXpGO2VBQ0ksa0JBQU0sRUFBRSxDQUFDO0lBQ2IsQ0FBQztJQUVELHNFQUFrQixHQUFsQjtRQUNJLElBQUksQ0FBQyxTQUFTLEdBQUcsbUJBQW1CLENBQUMsWUFBWSxDQUFDLElBQUksQ0FBQyxTQUFTLEVBQUU7WUFDOUQsR0FBRyxFQUFFLElBQUksQ0FBQyxPQUFPO1lBQ2pCLEdBQUcsRUFBRSxJQUFJLENBQUMsT0FBTztZQUNqQixNQUFNLEVBQUUsSUFBSSxDQUFDLE1BQU07U0FDdEIsQ0FBQyxDQUFDO0lBQ1AsQ0FBQztJQVpRLHlDQUF5QztRQU5yRCxTQUFTLENBQUM7WUFDUCxRQUFRLEVBQUUsdUNBQXVDO1lBQ2pELHlTQUFtRTtZQUNuRSxlQUFlLEVBQUUsdUJBQXVCLENBQUMsTUFBTTtTQUNsRCxDQUFDO09BRVcseUNBQXlDLENBYXJEO0lBQUQsZ0RBQUM7Q0FBQSxBQWJELENBQStELDhCQUE4QixHQWE1RjtTQWJZLHlDQUF5QyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEFmdGVyQ29udGVudEluaXQsIENoYW5nZURldGVjdGlvblN0cmF0ZWd5LCBDb21wb25lbnQgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IE5neE1hdGVyaWFsVGltZXBpY2tlckhvdXJzRmFjZSB9IGZyb20gJy4uL3RpbWVwaWNrZXItaG91cnMtZmFjZS9uZ3gtbWF0ZXJpYWwtdGltZXBpY2tlci1ob3Vycy1mYWNlJztcbmltcG9ydCB7IFRpbWVwaWNrZXJUaW1lVXRpbHMgfSBmcm9tICcuLi8uLi91dGlscy90aW1lcGlja2VyLXRpbWUudXRpbHMnO1xuXG5AQ29tcG9uZW50KHtcbiAgICBzZWxlY3RvcjogJ25neC1tYXRlcmlhbC10aW1lcGlja2VyLTI0LWhvdXJzLWZhY2UnLFxuICAgIHRlbXBsYXRlVXJsOiAnbmd4LW1hdGVyaWFsLXRpbWVwaWNrZXItMjQtaG91cnMtZmFjZS5jb21wb25lbnQuaHRtbCcsXG4gICAgY2hhbmdlRGV0ZWN0aW9uOiBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneS5PblB1c2hcbn0pXG5cbmV4cG9ydCBjbGFzcyBOZ3hNYXRlcmlhbFRpbWVwaWNrZXIyNEhvdXJzRmFjZUNvbXBvbmVudCBleHRlbmRzIE5neE1hdGVyaWFsVGltZXBpY2tlckhvdXJzRmFjZSBpbXBsZW1lbnRzIEFmdGVyQ29udGVudEluaXQge1xuXG4gICAgY29uc3RydWN0b3IoKSB7XG4gICAgICAgIHN1cGVyKDI0KTtcbiAgICB9XG5cbiAgICBuZ0FmdGVyQ29udGVudEluaXQoKSB7XG4gICAgICAgIHRoaXMuaG91cnNMaXN0ID0gVGltZXBpY2tlclRpbWVVdGlscy5kaXNhYmxlSG91cnModGhpcy5ob3Vyc0xpc3QsIHtcbiAgICAgICAgICAgIG1pbjogdGhpcy5taW5UaW1lLFxuICAgICAgICAgICAgbWF4OiB0aGlzLm1heFRpbWUsXG4gICAgICAgICAgICBmb3JtYXQ6IHRoaXMuZm9ybWF0XG4gICAgICAgIH0pO1xuICAgIH1cbn1cbiJdfQ==