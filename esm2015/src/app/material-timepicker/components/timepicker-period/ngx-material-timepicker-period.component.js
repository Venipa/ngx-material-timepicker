import * as tslib_1 from "tslib";
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { TimePeriod } from '../../models/time-period.enum';
import { TimeUnit } from '../../models/time-unit.enum';
import { animate, sequence, style, transition, trigger } from '@angular/animations';
import { TimepickerTimeUtils } from '../../utils/timepicker-time.utils';
let NgxMaterialTimepickerPeriodComponent = class NgxMaterialTimepickerPeriodComponent {
    constructor() {
        this.timePeriod = TimePeriod;
        this.isPeriodAvailable = true;
        this.periodChanged = new EventEmitter();
    }
    changePeriod(period) {
        this.isPeriodAvailable = this.isSwitchPeriodAvailable(period);
        if (this.isPeriodAvailable) {
            this.periodChanged.next(period);
        }
    }
    animationDone() {
        this.isPeriodAvailable = true;
    }
    isSwitchPeriodAvailable(period) {
        const time = this.getDisabledTimeByPeriod(period);
        return !time.every(t => t.disabled);
    }
    getDisabledTimeByPeriod(period) {
        switch (this.activeTimeUnit) {
            case TimeUnit.HOUR:
                return TimepickerTimeUtils.disableHours(this.hours, {
                    min: this.minTime,
                    max: this.maxTime,
                    format: this.format,
                    period
                });
            case TimeUnit.MINUTE:
                return TimepickerTimeUtils.disableMinutes(this.minutes, +this.selectedHour, {
                    min: this.minTime,
                    max: this.maxTime,
                    format: this.format,
                    period
                });
            default:
                throw new Error('no such TimeUnit');
        }
    }
};
tslib_1.__decorate([
    Input()
], NgxMaterialTimepickerPeriodComponent.prototype, "selectedPeriod", void 0);
tslib_1.__decorate([
    Input()
], NgxMaterialTimepickerPeriodComponent.prototype, "format", void 0);
tslib_1.__decorate([
    Input()
], NgxMaterialTimepickerPeriodComponent.prototype, "activeTimeUnit", void 0);
tslib_1.__decorate([
    Input()
], NgxMaterialTimepickerPeriodComponent.prototype, "hours", void 0);
tslib_1.__decorate([
    Input()
], NgxMaterialTimepickerPeriodComponent.prototype, "minutes", void 0);
tslib_1.__decorate([
    Input()
], NgxMaterialTimepickerPeriodComponent.prototype, "minTime", void 0);
tslib_1.__decorate([
    Input()
], NgxMaterialTimepickerPeriodComponent.prototype, "maxTime", void 0);
tslib_1.__decorate([
    Input()
], NgxMaterialTimepickerPeriodComponent.prototype, "selectedHour", void 0);
tslib_1.__decorate([
    Input()
], NgxMaterialTimepickerPeriodComponent.prototype, "meridiems", void 0);
tslib_1.__decorate([
    Output()
], NgxMaterialTimepickerPeriodComponent.prototype, "periodChanged", void 0);
NgxMaterialTimepickerPeriodComponent = tslib_1.__decorate([
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
export { NgxMaterialTimepickerPeriodComponent };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibmd4LW1hdGVyaWFsLXRpbWVwaWNrZXItcGVyaW9kLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiJuZzovL25neC1tYXRlcmlhbC10aW1lcGlja2VyLyIsInNvdXJjZXMiOlsic3JjL2FwcC9tYXRlcmlhbC10aW1lcGlja2VyL2NvbXBvbmVudHMvdGltZXBpY2tlci1wZXJpb2Qvbmd4LW1hdGVyaWFsLXRpbWVwaWNrZXItcGVyaW9kLmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUEsT0FBTyxFQUFFLFNBQVMsRUFBRSxZQUFZLEVBQUUsS0FBSyxFQUFFLE1BQU0sRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUN2RSxPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0sK0JBQStCLENBQUM7QUFDM0QsT0FBTyxFQUFFLFFBQVEsRUFBRSxNQUFNLDZCQUE2QixDQUFDO0FBRXZELE9BQU8sRUFBRSxPQUFPLEVBQUUsUUFBUSxFQUFFLEtBQUssRUFBRSxVQUFVLEVBQUUsT0FBTyxFQUFFLE1BQU0scUJBQXFCLENBQUM7QUFFcEYsT0FBTyxFQUFFLG1CQUFtQixFQUFFLE1BQU0sbUNBQW1DLENBQUM7QUFtQnhFLElBQWEsb0NBQW9DLEdBQWpELE1BQWEsb0NBQW9DO0lBakJqRDtRQW1CSSxlQUFVLEdBQUcsVUFBVSxDQUFDO1FBQ3hCLHNCQUFpQixHQUFHLElBQUksQ0FBQztRQVlmLGtCQUFhLEdBQUcsSUFBSSxZQUFZLEVBQWMsQ0FBQztJQXNDN0QsQ0FBQztJQXBDRyxZQUFZLENBQUMsTUFBa0I7UUFDM0IsSUFBSSxDQUFDLGlCQUFpQixHQUFHLElBQUksQ0FBQyx1QkFBdUIsQ0FBQyxNQUFNLENBQUMsQ0FBQztRQUM5RCxJQUFJLElBQUksQ0FBQyxpQkFBaUIsRUFBRTtZQUN4QixJQUFJLENBQUMsYUFBYSxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQztTQUNuQztJQUNMLENBQUM7SUFFRCxhQUFhO1FBQ1QsSUFBSSxDQUFDLGlCQUFpQixHQUFHLElBQUksQ0FBQztJQUNsQyxDQUFDO0lBRU8sdUJBQXVCLENBQUMsTUFBa0I7UUFDOUMsTUFBTSxJQUFJLEdBQUcsSUFBSSxDQUFDLHVCQUF1QixDQUFDLE1BQU0sQ0FBQyxDQUFDO1FBQ2xELE9BQU8sQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLFFBQVEsQ0FBQyxDQUFDO0lBQ3hDLENBQUM7SUFFTyx1QkFBdUIsQ0FBQyxNQUFrQjtRQUM5QyxRQUFRLElBQUksQ0FBQyxjQUFjLEVBQUU7WUFDekIsS0FBSyxRQUFRLENBQUMsSUFBSTtnQkFDZCxPQUFPLG1CQUFtQixDQUFDLFlBQVksQ0FBQyxJQUFJLENBQUMsS0FBSyxFQUFFO29CQUNoRCxHQUFHLEVBQUUsSUFBSSxDQUFDLE9BQU87b0JBQ2pCLEdBQUcsRUFBRSxJQUFJLENBQUMsT0FBTztvQkFDakIsTUFBTSxFQUFFLElBQUksQ0FBQyxNQUFNO29CQUNuQixNQUFNO2lCQUNULENBQUMsQ0FBQztZQUNQLEtBQUssUUFBUSxDQUFDLE1BQU07Z0JBQ2hCLE9BQU8sbUJBQW1CLENBQUMsY0FBYyxDQUFDLElBQUksQ0FBQyxPQUFPLEVBQUUsQ0FBQyxJQUFJLENBQUMsWUFBWSxFQUFFO29CQUN4RSxHQUFHLEVBQUUsSUFBSSxDQUFDLE9BQU87b0JBQ2pCLEdBQUcsRUFBRSxJQUFJLENBQUMsT0FBTztvQkFDakIsTUFBTSxFQUFFLElBQUksQ0FBQyxNQUFNO29CQUNuQixNQUFNO2lCQUNULENBQUMsQ0FBQztZQUNQO2dCQUNJLE1BQU0sSUFBSSxLQUFLLENBQUMsa0JBQWtCLENBQUMsQ0FBQztTQUMzQztJQUNMLENBQUM7Q0FDSixDQUFBO0FBaERZO0lBQVIsS0FBSyxFQUFFOzRFQUE0QjtBQUMzQjtJQUFSLEtBQUssRUFBRTtvRUFBZ0I7QUFDZjtJQUFSLEtBQUssRUFBRTs0RUFBMEI7QUFDekI7SUFBUixLQUFLLEVBQUU7bUVBQXdCO0FBQ3ZCO0lBQVIsS0FBSyxFQUFFO3FFQUEwQjtBQUN6QjtJQUFSLEtBQUssRUFBRTtxRUFBbUI7QUFDbEI7SUFBUixLQUFLLEVBQUU7cUVBQW1CO0FBQ2xCO0lBQVIsS0FBSyxFQUFFOzBFQUErQjtBQUM5QjtJQUFSLEtBQUssRUFBRTt1RUFBcUI7QUFFbkI7SUFBVCxNQUFNLEVBQUU7MkVBQWdEO0FBZmhELG9DQUFvQztJQWpCaEQsU0FBUyxDQUFDO1FBQ1AsUUFBUSxFQUFFLGdDQUFnQztRQUMxQyw2eUJBQTREO1FBRTVELFVBQVUsRUFBRTtZQUNSLE9BQU8sQ0FBQyxZQUFZLEVBQUU7Z0JBQ2xCLFVBQVUsQ0FBQyxRQUFRLEVBQUU7b0JBQ2pCLEtBQUssQ0FBQyxFQUFDLFNBQVMsRUFBRSxVQUFVLEVBQUMsQ0FBQztvQkFDOUIsT0FBTyxDQUFDLEtBQUssRUFBRSxLQUFLLENBQUMsRUFBQyxTQUFTLEVBQUUsVUFBVSxFQUFDLENBQUMsQ0FBQztvQkFDOUMsUUFBUSxDQUFDO3dCQUNMLE9BQU8sQ0FBQyxJQUFJLEVBQUUsS0FBSyxDQUFDLEVBQUMsT0FBTyxFQUFFLENBQUMsRUFBQyxDQUFDLENBQUM7d0JBQ2xDLE9BQU8sQ0FBQyxLQUFLLEVBQUUsS0FBSyxDQUFDLEVBQUMsT0FBTyxFQUFFLENBQUMsRUFBQyxDQUFDLENBQUM7cUJBQ3RDLENBQUM7aUJBQ0wsQ0FBQzthQUNMLENBQUM7U0FDTDs7S0FDSixDQUFDO0dBQ1csb0NBQW9DLENBcURoRDtTQXJEWSxvQ0FBb0MiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDb21wb25lbnQsIEV2ZW50RW1pdHRlciwgSW5wdXQsIE91dHB1dCB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgVGltZVBlcmlvZCB9IGZyb20gJy4uLy4uL21vZGVscy90aW1lLXBlcmlvZC5lbnVtJztcbmltcG9ydCB7IFRpbWVVbml0IH0gZnJvbSAnLi4vLi4vbW9kZWxzL3RpbWUtdW5pdC5lbnVtJztcbmltcG9ydCB7IENsb2NrRmFjZVRpbWUgfSBmcm9tICcuLi8uLi9tb2RlbHMvY2xvY2stZmFjZS10aW1lLmludGVyZmFjZSc7XG5pbXBvcnQgeyBhbmltYXRlLCBzZXF1ZW5jZSwgc3R5bGUsIHRyYW5zaXRpb24sIHRyaWdnZXIgfSBmcm9tICdAYW5ndWxhci9hbmltYXRpb25zJztcbmltcG9ydCB7IERhdGVUaW1lIH0gZnJvbSAnbHV4b24nO1xuaW1wb3J0IHsgVGltZXBpY2tlclRpbWVVdGlscyB9IGZyb20gJy4uLy4uL3V0aWxzL3RpbWVwaWNrZXItdGltZS51dGlscyc7XG5cbkBDb21wb25lbnQoe1xuICAgIHNlbGVjdG9yOiAnbmd4LW1hdGVyaWFsLXRpbWVwaWNrZXItcGVyaW9kJyxcbiAgICB0ZW1wbGF0ZVVybDogJ25neC1tYXRlcmlhbC10aW1lcGlja2VyLXBlcmlvZC5jb21wb25lbnQuaHRtbCcsXG4gICAgc3R5bGVVcmxzOiBbJ25neC1tYXRlcmlhbC10aW1lcGlja2VyLXBlcmlvZC5jb21wb25lbnQuc2NzcyddLFxuICAgIGFuaW1hdGlvbnM6IFtcbiAgICAgICAgdHJpZ2dlcignc2NhbGVJbk91dCcsIFtcbiAgICAgICAgICAgIHRyYW5zaXRpb24oJzplbnRlcicsIFtcbiAgICAgICAgICAgICAgICBzdHlsZSh7dHJhbnNmb3JtOiAnc2NhbGUoMCknfSksXG4gICAgICAgICAgICAgICAgYW5pbWF0ZSgnLjJzJywgc3R5bGUoe3RyYW5zZm9ybTogJ3NjYWxlKDEpJ30pKSxcbiAgICAgICAgICAgICAgICBzZXF1ZW5jZShbXG4gICAgICAgICAgICAgICAgICAgIGFuaW1hdGUoJzNzJywgc3R5bGUoe29wYWNpdHk6IDF9KSksXG4gICAgICAgICAgICAgICAgICAgIGFuaW1hdGUoJy4zcycsIHN0eWxlKHtvcGFjaXR5OiAwfSkpXG4gICAgICAgICAgICAgICAgXSlcbiAgICAgICAgICAgIF0pXG4gICAgICAgIF0pXG4gICAgXVxufSlcbmV4cG9ydCBjbGFzcyBOZ3hNYXRlcmlhbFRpbWVwaWNrZXJQZXJpb2RDb21wb25lbnQge1xuXG4gICAgdGltZVBlcmlvZCA9IFRpbWVQZXJpb2Q7XG4gICAgaXNQZXJpb2RBdmFpbGFibGUgPSB0cnVlO1xuXG4gICAgQElucHV0KCkgc2VsZWN0ZWRQZXJpb2Q6IFRpbWVQZXJpb2Q7XG4gICAgQElucHV0KCkgZm9ybWF0OiBudW1iZXI7XG4gICAgQElucHV0KCkgYWN0aXZlVGltZVVuaXQ6IFRpbWVVbml0O1xuICAgIEBJbnB1dCgpIGhvdXJzOiBDbG9ja0ZhY2VUaW1lW107XG4gICAgQElucHV0KCkgbWludXRlczogQ2xvY2tGYWNlVGltZVtdO1xuICAgIEBJbnB1dCgpIG1pblRpbWU6IERhdGVUaW1lO1xuICAgIEBJbnB1dCgpIG1heFRpbWU6IERhdGVUaW1lO1xuICAgIEBJbnB1dCgpIHNlbGVjdGVkSG91cjogbnVtYmVyIHwgc3RyaW5nO1xuICAgIEBJbnB1dCgpIG1lcmlkaWVtczogc3RyaW5nW107XG5cbiAgICBAT3V0cHV0KCkgcGVyaW9kQ2hhbmdlZCA9IG5ldyBFdmVudEVtaXR0ZXI8VGltZVBlcmlvZD4oKTtcblxuICAgIGNoYW5nZVBlcmlvZChwZXJpb2Q6IFRpbWVQZXJpb2QpOiB2b2lkIHtcbiAgICAgICAgdGhpcy5pc1BlcmlvZEF2YWlsYWJsZSA9IHRoaXMuaXNTd2l0Y2hQZXJpb2RBdmFpbGFibGUocGVyaW9kKTtcbiAgICAgICAgaWYgKHRoaXMuaXNQZXJpb2RBdmFpbGFibGUpIHtcbiAgICAgICAgICAgIHRoaXMucGVyaW9kQ2hhbmdlZC5uZXh0KHBlcmlvZCk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBhbmltYXRpb25Eb25lKCk6IHZvaWQge1xuICAgICAgICB0aGlzLmlzUGVyaW9kQXZhaWxhYmxlID0gdHJ1ZTtcbiAgICB9XG5cbiAgICBwcml2YXRlIGlzU3dpdGNoUGVyaW9kQXZhaWxhYmxlKHBlcmlvZDogVGltZVBlcmlvZCk6IGJvb2xlYW4ge1xuICAgICAgICBjb25zdCB0aW1lID0gdGhpcy5nZXREaXNhYmxlZFRpbWVCeVBlcmlvZChwZXJpb2QpO1xuICAgICAgICByZXR1cm4gIXRpbWUuZXZlcnkodCA9PiB0LmRpc2FibGVkKTtcbiAgICB9XG5cbiAgICBwcml2YXRlIGdldERpc2FibGVkVGltZUJ5UGVyaW9kKHBlcmlvZDogVGltZVBlcmlvZCk6IENsb2NrRmFjZVRpbWVbXSB7XG4gICAgICAgIHN3aXRjaCAodGhpcy5hY3RpdmVUaW1lVW5pdCkge1xuICAgICAgICAgICAgY2FzZSBUaW1lVW5pdC5IT1VSOlxuICAgICAgICAgICAgICAgIHJldHVybiBUaW1lcGlja2VyVGltZVV0aWxzLmRpc2FibGVIb3Vycyh0aGlzLmhvdXJzLCB7XG4gICAgICAgICAgICAgICAgICAgIG1pbjogdGhpcy5taW5UaW1lLFxuICAgICAgICAgICAgICAgICAgICBtYXg6IHRoaXMubWF4VGltZSxcbiAgICAgICAgICAgICAgICAgICAgZm9ybWF0OiB0aGlzLmZvcm1hdCxcbiAgICAgICAgICAgICAgICAgICAgcGVyaW9kXG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICBjYXNlIFRpbWVVbml0Lk1JTlVURTpcbiAgICAgICAgICAgICAgICByZXR1cm4gVGltZXBpY2tlclRpbWVVdGlscy5kaXNhYmxlTWludXRlcyh0aGlzLm1pbnV0ZXMsICt0aGlzLnNlbGVjdGVkSG91ciwge1xuICAgICAgICAgICAgICAgICAgICBtaW46IHRoaXMubWluVGltZSxcbiAgICAgICAgICAgICAgICAgICAgbWF4OiB0aGlzLm1heFRpbWUsXG4gICAgICAgICAgICAgICAgICAgIGZvcm1hdDogdGhpcy5mb3JtYXQsXG4gICAgICAgICAgICAgICAgICAgIHBlcmlvZFxuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgZGVmYXVsdDpcbiAgICAgICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ25vIHN1Y2ggVGltZVVuaXQnKTtcbiAgICAgICAgfVxuICAgIH1cbn1cbiJdfQ==