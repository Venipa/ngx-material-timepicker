import * as tslib_1 from "tslib";
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { TimePeriod } from '../../models/time-period.enum';
import { TimeUnit } from '../../models/time-unit.enum';
import { animate, sequence, style, transition, trigger } from '@angular/animations';
import { TimepickerTimeUtils } from '../../utils/timepicker-time.utils';
var NgxMaterialTimepickerPeriodComponent = /** @class */ (function () {
    function NgxMaterialTimepickerPeriodComponent() {
        this.timePeriod = TimePeriod;
        this.isPeriodAvailable = true;
        this.periodChanged = new EventEmitter();
    }
    NgxMaterialTimepickerPeriodComponent.prototype.changePeriod = function (period) {
        this.isPeriodAvailable = this.isSwitchPeriodAvailable(period);
        if (this.isPeriodAvailable) {
            this.periodChanged.next(period);
        }
    };
    NgxMaterialTimepickerPeriodComponent.prototype.animationDone = function () {
        this.isPeriodAvailable = true;
    };
    NgxMaterialTimepickerPeriodComponent.prototype.isSwitchPeriodAvailable = function (period) {
        var time = this.getDisabledTimeByPeriod(period);
        return !time.every(function (t) { return t.disabled; });
    };
    NgxMaterialTimepickerPeriodComponent.prototype.getDisabledTimeByPeriod = function (period) {
        switch (this.activeTimeUnit) {
            case TimeUnit.HOUR:
                return TimepickerTimeUtils.disableHours(this.hours, {
                    min: this.minTime,
                    max: this.maxTime,
                    format: this.format,
                    period: period
                });
            case TimeUnit.MINUTE:
                return TimepickerTimeUtils.disableMinutes(this.minutes, +this.selectedHour, {
                    min: this.minTime,
                    max: this.maxTime,
                    format: this.format,
                    period: period
                });
            default:
                throw new Error('no such TimeUnit');
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
    return NgxMaterialTimepickerPeriodComponent;
}());
export { NgxMaterialTimepickerPeriodComponent };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibmd4LW1hdGVyaWFsLXRpbWVwaWNrZXItcGVyaW9kLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiJuZzovL25neC1tYXRlcmlhbC10aW1lcGlja2VyLyIsInNvdXJjZXMiOlsic3JjL2FwcC9tYXRlcmlhbC10aW1lcGlja2VyL2NvbXBvbmVudHMvdGltZXBpY2tlci1wZXJpb2Qvbmd4LW1hdGVyaWFsLXRpbWVwaWNrZXItcGVyaW9kLmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUEsT0FBTyxFQUFFLFNBQVMsRUFBRSxZQUFZLEVBQUUsS0FBSyxFQUFFLE1BQU0sRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUN2RSxPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0sK0JBQStCLENBQUM7QUFDM0QsT0FBTyxFQUFFLFFBQVEsRUFBRSxNQUFNLDZCQUE2QixDQUFDO0FBRXZELE9BQU8sRUFBRSxPQUFPLEVBQUUsUUFBUSxFQUFFLEtBQUssRUFBRSxVQUFVLEVBQUUsT0FBTyxFQUFFLE1BQU0scUJBQXFCLENBQUM7QUFFcEYsT0FBTyxFQUFFLG1CQUFtQixFQUFFLE1BQU0sbUNBQW1DLENBQUM7QUFtQnhFO0lBakJBO1FBbUJJLGVBQVUsR0FBRyxVQUFVLENBQUM7UUFDeEIsc0JBQWlCLEdBQUcsSUFBSSxDQUFDO1FBWWYsa0JBQWEsR0FBRyxJQUFJLFlBQVksRUFBYyxDQUFDO0lBc0M3RCxDQUFDO0lBcENHLDJEQUFZLEdBQVosVUFBYSxNQUFrQjtRQUMzQixJQUFJLENBQUMsaUJBQWlCLEdBQUcsSUFBSSxDQUFDLHVCQUF1QixDQUFDLE1BQU0sQ0FBQyxDQUFDO1FBQzlELElBQUksSUFBSSxDQUFDLGlCQUFpQixFQUFFO1lBQ3hCLElBQUksQ0FBQyxhQUFhLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDO1NBQ25DO0lBQ0wsQ0FBQztJQUVELDREQUFhLEdBQWI7UUFDSSxJQUFJLENBQUMsaUJBQWlCLEdBQUcsSUFBSSxDQUFDO0lBQ2xDLENBQUM7SUFFTyxzRUFBdUIsR0FBL0IsVUFBZ0MsTUFBa0I7UUFDOUMsSUFBTSxJQUFJLEdBQUcsSUFBSSxDQUFDLHVCQUF1QixDQUFDLE1BQU0sQ0FBQyxDQUFDO1FBQ2xELE9BQU8sQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLFVBQUEsQ0FBQyxJQUFJLE9BQUEsQ0FBQyxDQUFDLFFBQVEsRUFBVixDQUFVLENBQUMsQ0FBQztJQUN4QyxDQUFDO0lBRU8sc0VBQXVCLEdBQS9CLFVBQWdDLE1BQWtCO1FBQzlDLFFBQVEsSUFBSSxDQUFDLGNBQWMsRUFBRTtZQUN6QixLQUFLLFFBQVEsQ0FBQyxJQUFJO2dCQUNkLE9BQU8sbUJBQW1CLENBQUMsWUFBWSxDQUFDLElBQUksQ0FBQyxLQUFLLEVBQUU7b0JBQ2hELEdBQUcsRUFBRSxJQUFJLENBQUMsT0FBTztvQkFDakIsR0FBRyxFQUFFLElBQUksQ0FBQyxPQUFPO29CQUNqQixNQUFNLEVBQUUsSUFBSSxDQUFDLE1BQU07b0JBQ25CLE1BQU0sUUFBQTtpQkFDVCxDQUFDLENBQUM7WUFDUCxLQUFLLFFBQVEsQ0FBQyxNQUFNO2dCQUNoQixPQUFPLG1CQUFtQixDQUFDLGNBQWMsQ0FBQyxJQUFJLENBQUMsT0FBTyxFQUFFLENBQUMsSUFBSSxDQUFDLFlBQVksRUFBRTtvQkFDeEUsR0FBRyxFQUFFLElBQUksQ0FBQyxPQUFPO29CQUNqQixHQUFHLEVBQUUsSUFBSSxDQUFDLE9BQU87b0JBQ2pCLE1BQU0sRUFBRSxJQUFJLENBQUMsTUFBTTtvQkFDbkIsTUFBTSxRQUFBO2lCQUNULENBQUMsQ0FBQztZQUNQO2dCQUNJLE1BQU0sSUFBSSxLQUFLLENBQUMsa0JBQWtCLENBQUMsQ0FBQztTQUMzQztJQUNMLENBQUM7SUEvQ1E7UUFBUixLQUFLLEVBQUU7Z0ZBQTRCO0lBQzNCO1FBQVIsS0FBSyxFQUFFO3dFQUFnQjtJQUNmO1FBQVIsS0FBSyxFQUFFO2dGQUEwQjtJQUN6QjtRQUFSLEtBQUssRUFBRTt1RUFBd0I7SUFDdkI7UUFBUixLQUFLLEVBQUU7eUVBQTBCO0lBQ3pCO1FBQVIsS0FBSyxFQUFFO3lFQUFtQjtJQUNsQjtRQUFSLEtBQUssRUFBRTt5RUFBbUI7SUFDbEI7UUFBUixLQUFLLEVBQUU7OEVBQStCO0lBQzlCO1FBQVIsS0FBSyxFQUFFOzJFQUFxQjtJQUVuQjtRQUFULE1BQU0sRUFBRTsrRUFBZ0Q7SUFmaEQsb0NBQW9DO1FBakJoRCxTQUFTLENBQUM7WUFDUCxRQUFRLEVBQUUsZ0NBQWdDO1lBQzFDLDZ5QkFBNEQ7WUFFNUQsVUFBVSxFQUFFO2dCQUNSLE9BQU8sQ0FBQyxZQUFZLEVBQUU7b0JBQ2xCLFVBQVUsQ0FBQyxRQUFRLEVBQUU7d0JBQ2pCLEtBQUssQ0FBQyxFQUFDLFNBQVMsRUFBRSxVQUFVLEVBQUMsQ0FBQzt3QkFDOUIsT0FBTyxDQUFDLEtBQUssRUFBRSxLQUFLLENBQUMsRUFBQyxTQUFTLEVBQUUsVUFBVSxFQUFDLENBQUMsQ0FBQzt3QkFDOUMsUUFBUSxDQUFDOzRCQUNMLE9BQU8sQ0FBQyxJQUFJLEVBQUUsS0FBSyxDQUFDLEVBQUMsT0FBTyxFQUFFLENBQUMsRUFBQyxDQUFDLENBQUM7NEJBQ2xDLE9BQU8sQ0FBQyxLQUFLLEVBQUUsS0FBSyxDQUFDLEVBQUMsT0FBTyxFQUFFLENBQUMsRUFBQyxDQUFDLENBQUM7eUJBQ3RDLENBQUM7cUJBQ0wsQ0FBQztpQkFDTCxDQUFDO2FBQ0w7O1NBQ0osQ0FBQztPQUNXLG9DQUFvQyxDQXFEaEQ7SUFBRCwyQ0FBQztDQUFBLEFBckRELElBcURDO1NBckRZLG9DQUFvQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENvbXBvbmVudCwgRXZlbnRFbWl0dGVyLCBJbnB1dCwgT3V0cHV0IH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBUaW1lUGVyaW9kIH0gZnJvbSAnLi4vLi4vbW9kZWxzL3RpbWUtcGVyaW9kLmVudW0nO1xuaW1wb3J0IHsgVGltZVVuaXQgfSBmcm9tICcuLi8uLi9tb2RlbHMvdGltZS11bml0LmVudW0nO1xuaW1wb3J0IHsgQ2xvY2tGYWNlVGltZSB9IGZyb20gJy4uLy4uL21vZGVscy9jbG9jay1mYWNlLXRpbWUuaW50ZXJmYWNlJztcbmltcG9ydCB7IGFuaW1hdGUsIHNlcXVlbmNlLCBzdHlsZSwgdHJhbnNpdGlvbiwgdHJpZ2dlciB9IGZyb20gJ0Bhbmd1bGFyL2FuaW1hdGlvbnMnO1xuaW1wb3J0IHsgRGF0ZVRpbWUgfSBmcm9tICdsdXhvbic7XG5pbXBvcnQgeyBUaW1lcGlja2VyVGltZVV0aWxzIH0gZnJvbSAnLi4vLi4vdXRpbHMvdGltZXBpY2tlci10aW1lLnV0aWxzJztcblxuQENvbXBvbmVudCh7XG4gICAgc2VsZWN0b3I6ICduZ3gtbWF0ZXJpYWwtdGltZXBpY2tlci1wZXJpb2QnLFxuICAgIHRlbXBsYXRlVXJsOiAnbmd4LW1hdGVyaWFsLXRpbWVwaWNrZXItcGVyaW9kLmNvbXBvbmVudC5odG1sJyxcbiAgICBzdHlsZVVybHM6IFsnbmd4LW1hdGVyaWFsLXRpbWVwaWNrZXItcGVyaW9kLmNvbXBvbmVudC5zY3NzJ10sXG4gICAgYW5pbWF0aW9uczogW1xuICAgICAgICB0cmlnZ2VyKCdzY2FsZUluT3V0JywgW1xuICAgICAgICAgICAgdHJhbnNpdGlvbignOmVudGVyJywgW1xuICAgICAgICAgICAgICAgIHN0eWxlKHt0cmFuc2Zvcm06ICdzY2FsZSgwKSd9KSxcbiAgICAgICAgICAgICAgICBhbmltYXRlKCcuMnMnLCBzdHlsZSh7dHJhbnNmb3JtOiAnc2NhbGUoMSknfSkpLFxuICAgICAgICAgICAgICAgIHNlcXVlbmNlKFtcbiAgICAgICAgICAgICAgICAgICAgYW5pbWF0ZSgnM3MnLCBzdHlsZSh7b3BhY2l0eTogMX0pKSxcbiAgICAgICAgICAgICAgICAgICAgYW5pbWF0ZSgnLjNzJywgc3R5bGUoe29wYWNpdHk6IDB9KSlcbiAgICAgICAgICAgICAgICBdKVxuICAgICAgICAgICAgXSlcbiAgICAgICAgXSlcbiAgICBdXG59KVxuZXhwb3J0IGNsYXNzIE5neE1hdGVyaWFsVGltZXBpY2tlclBlcmlvZENvbXBvbmVudCB7XG5cbiAgICB0aW1lUGVyaW9kID0gVGltZVBlcmlvZDtcbiAgICBpc1BlcmlvZEF2YWlsYWJsZSA9IHRydWU7XG5cbiAgICBASW5wdXQoKSBzZWxlY3RlZFBlcmlvZDogVGltZVBlcmlvZDtcbiAgICBASW5wdXQoKSBmb3JtYXQ6IG51bWJlcjtcbiAgICBASW5wdXQoKSBhY3RpdmVUaW1lVW5pdDogVGltZVVuaXQ7XG4gICAgQElucHV0KCkgaG91cnM6IENsb2NrRmFjZVRpbWVbXTtcbiAgICBASW5wdXQoKSBtaW51dGVzOiBDbG9ja0ZhY2VUaW1lW107XG4gICAgQElucHV0KCkgbWluVGltZTogRGF0ZVRpbWU7XG4gICAgQElucHV0KCkgbWF4VGltZTogRGF0ZVRpbWU7XG4gICAgQElucHV0KCkgc2VsZWN0ZWRIb3VyOiBudW1iZXIgfCBzdHJpbmc7XG4gICAgQElucHV0KCkgbWVyaWRpZW1zOiBzdHJpbmdbXTtcblxuICAgIEBPdXRwdXQoKSBwZXJpb2RDaGFuZ2VkID0gbmV3IEV2ZW50RW1pdHRlcjxUaW1lUGVyaW9kPigpO1xuXG4gICAgY2hhbmdlUGVyaW9kKHBlcmlvZDogVGltZVBlcmlvZCk6IHZvaWQge1xuICAgICAgICB0aGlzLmlzUGVyaW9kQXZhaWxhYmxlID0gdGhpcy5pc1N3aXRjaFBlcmlvZEF2YWlsYWJsZShwZXJpb2QpO1xuICAgICAgICBpZiAodGhpcy5pc1BlcmlvZEF2YWlsYWJsZSkge1xuICAgICAgICAgICAgdGhpcy5wZXJpb2RDaGFuZ2VkLm5leHQocGVyaW9kKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGFuaW1hdGlvbkRvbmUoKTogdm9pZCB7XG4gICAgICAgIHRoaXMuaXNQZXJpb2RBdmFpbGFibGUgPSB0cnVlO1xuICAgIH1cblxuICAgIHByaXZhdGUgaXNTd2l0Y2hQZXJpb2RBdmFpbGFibGUocGVyaW9kOiBUaW1lUGVyaW9kKTogYm9vbGVhbiB7XG4gICAgICAgIGNvbnN0IHRpbWUgPSB0aGlzLmdldERpc2FibGVkVGltZUJ5UGVyaW9kKHBlcmlvZCk7XG4gICAgICAgIHJldHVybiAhdGltZS5ldmVyeSh0ID0+IHQuZGlzYWJsZWQpO1xuICAgIH1cblxuICAgIHByaXZhdGUgZ2V0RGlzYWJsZWRUaW1lQnlQZXJpb2QocGVyaW9kOiBUaW1lUGVyaW9kKTogQ2xvY2tGYWNlVGltZVtdIHtcbiAgICAgICAgc3dpdGNoICh0aGlzLmFjdGl2ZVRpbWVVbml0KSB7XG4gICAgICAgICAgICBjYXNlIFRpbWVVbml0LkhPVVI6XG4gICAgICAgICAgICAgICAgcmV0dXJuIFRpbWVwaWNrZXJUaW1lVXRpbHMuZGlzYWJsZUhvdXJzKHRoaXMuaG91cnMsIHtcbiAgICAgICAgICAgICAgICAgICAgbWluOiB0aGlzLm1pblRpbWUsXG4gICAgICAgICAgICAgICAgICAgIG1heDogdGhpcy5tYXhUaW1lLFxuICAgICAgICAgICAgICAgICAgICBmb3JtYXQ6IHRoaXMuZm9ybWF0LFxuICAgICAgICAgICAgICAgICAgICBwZXJpb2RcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIGNhc2UgVGltZVVuaXQuTUlOVVRFOlxuICAgICAgICAgICAgICAgIHJldHVybiBUaW1lcGlja2VyVGltZVV0aWxzLmRpc2FibGVNaW51dGVzKHRoaXMubWludXRlcywgK3RoaXMuc2VsZWN0ZWRIb3VyLCB7XG4gICAgICAgICAgICAgICAgICAgIG1pbjogdGhpcy5taW5UaW1lLFxuICAgICAgICAgICAgICAgICAgICBtYXg6IHRoaXMubWF4VGltZSxcbiAgICAgICAgICAgICAgICAgICAgZm9ybWF0OiB0aGlzLmZvcm1hdCxcbiAgICAgICAgICAgICAgICAgICAgcGVyaW9kXG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICBkZWZhdWx0OlxuICAgICAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcignbm8gc3VjaCBUaW1lVW5pdCcpO1xuICAgICAgICB9XG4gICAgfVxufVxuIl19