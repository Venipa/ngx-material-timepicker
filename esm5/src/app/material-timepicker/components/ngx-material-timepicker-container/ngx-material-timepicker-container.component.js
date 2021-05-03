import * as tslib_1 from "tslib";
import { Component, HostListener, Inject, Input } from '@angular/core';
import { TimeUnit } from '../../models/time-unit.enum';
import { animate, style, transition, trigger } from '@angular/animations';
import { NgxMaterialTimepickerService } from '../../services/ngx-material-timepicker.service';
import { Subject } from 'rxjs';
import { shareReplay, takeUntil } from 'rxjs/operators';
import { TimeAdapter } from '../../services/time-adapter';
import { NgxMaterialTimepickerEventService } from '../../services/ngx-material-timepicker-event.service';
import { TIME_LOCALE } from '../../tokens/time-locale.token';
export var AnimationState;
(function (AnimationState) {
    AnimationState["ENTER"] = "enter";
    AnimationState["LEAVE"] = "leave";
})(AnimationState || (AnimationState = {}));
var NgxMaterialTimepickerContainerComponent = /** @class */ (function () {
    function NgxMaterialTimepickerContainerComponent(timepickerService, eventService, locale) {
        this.timepickerService = timepickerService;
        this.eventService = eventService;
        this.locale = locale;
        this.timeUnit = TimeUnit;
        this.activeTimeUnit = TimeUnit.HOUR;
        this.unsubscribe = new Subject();
    }
    Object.defineProperty(NgxMaterialTimepickerContainerComponent.prototype, "defaultTime", {
        get: function () {
            return this._defaultTime;
        },
        set: function (time) {
            this._defaultTime = time;
            this.setDefaultTime(time);
        },
        enumerable: true,
        configurable: true
    });
    NgxMaterialTimepickerContainerComponent.prototype.onKeydown = function (e) {
        this.eventService.dispatchEvent(e);
        e.stopPropagation();
    };
    NgxMaterialTimepickerContainerComponent.prototype.ngOnInit = function () {
        this.animationState = !this.disableAnimation && AnimationState.ENTER;
        this.defineTime();
        this.selectedHour = this.timepickerService.selectedHour
            .pipe(shareReplay({ bufferSize: 1, refCount: true }));
        this.selectedMinute = this.timepickerService.selectedMinute
            .pipe(shareReplay({ bufferSize: 1, refCount: true }));
        this.selectedPeriod = this.timepickerService.selectedPeriod
            .pipe(shareReplay({ bufferSize: 1, refCount: true }));
        this.timepickerBaseRef.timeUpdated.pipe(takeUntil(this.unsubscribe))
            .subscribe(this.setDefaultTime.bind(this));
    };
    NgxMaterialTimepickerContainerComponent.prototype.onHourChange = function (hour) {
        this.timepickerService.hour = hour;
        this.onTimeChange();
    };
    NgxMaterialTimepickerContainerComponent.prototype.onHourSelected = function (hour) {
        if (!this.hoursOnly) {
            this.changeTimeUnit(TimeUnit.MINUTE);
        }
        this.timepickerBaseRef.hourSelected.next(hour);
    };
    NgxMaterialTimepickerContainerComponent.prototype.onMinuteChange = function (minute) {
        this.timepickerService.minute = minute;
        this.onTimeChange();
    };
    NgxMaterialTimepickerContainerComponent.prototype.changePeriod = function (period) {
        this.timepickerService.period = period;
        this.onTimeChange();
    };
    NgxMaterialTimepickerContainerComponent.prototype.changeTimeUnit = function (unit) {
        this.activeTimeUnit = unit;
    };
    NgxMaterialTimepickerContainerComponent.prototype.setTime = function () {
        this.timepickerBaseRef.timeSet.next(this.timepickerService.getFullTime(this.format));
        this.close();
    };
    NgxMaterialTimepickerContainerComponent.prototype.close = function () {
        if (this.disableAnimation) {
            this.timepickerBaseRef.close();
            return;
        }
        this.animationState = AnimationState.LEAVE;
    };
    NgxMaterialTimepickerContainerComponent.prototype.animationDone = function (event) {
        if (event.phaseName === 'done' && event.toState === AnimationState.LEAVE) {
            this.timepickerBaseRef.close();
        }
    };
    NgxMaterialTimepickerContainerComponent.prototype.ngOnDestroy = function () {
        this.unsubscribe.next();
        this.unsubscribe.complete();
    };
    NgxMaterialTimepickerContainerComponent.prototype.setDefaultTime = function (time) {
        this.timepickerService.setDefaultTimeIfAvailable(time, this.minTime, this.maxTime, this.format, this.minutesGap);
    };
    NgxMaterialTimepickerContainerComponent.prototype.defineTime = function () {
        var minTime = this.minTime;
        if (minTime && (!this.time && !this.defaultTime)) {
            var time = TimeAdapter.fromDateTimeToString(minTime, this.format);
            this.setDefaultTime(time);
        }
    };
    NgxMaterialTimepickerContainerComponent.prototype.onTimeChange = function () {
        var time = TimeAdapter.toLocaleTimeString(this.timepickerService.getFullTime(this.format), {
            locale: this.locale,
            format: this.format
        });
        this.timepickerBaseRef.timeChanged.emit(time);
    };
    NgxMaterialTimepickerContainerComponent.ctorParameters = function () { return [
        { type: NgxMaterialTimepickerService },
        { type: NgxMaterialTimepickerEventService },
        { type: String, decorators: [{ type: Inject, args: [TIME_LOCALE,] }] }
    ]; };
    tslib_1.__decorate([
        Input()
    ], NgxMaterialTimepickerContainerComponent.prototype, "defaultTime", null);
    tslib_1.__decorate([
        HostListener('keydown', ['$event'])
    ], NgxMaterialTimepickerContainerComponent.prototype, "onKeydown", null);
    NgxMaterialTimepickerContainerComponent = tslib_1.__decorate([
        Component({
            selector: 'ngx-material-timepicker-container',
            template: "<div class=\"timepicker-backdrop-overlay\" [overlay]=\"preventOverlayClick\"\n     [ngClass]=\"{'timepicker-backdrop-overlay--transparent': appendToInput}\"></div>\n<div class=\"timepicker-overlay\">\n    <ngx-material-timepicker-content [appendToInput]=\"appendToInput\"\n                                     [inputElement]=\"inputElement\"\n                                     [ngxMaterialTimepickerTheme]=\"theme\">\n        <div class=\"timepicker\"\n             [@timepicker]=\"animationState\"\n             (@timepicker.done)=\"animationDone($event)\"\n             [ngClass]=\"timepickerClass\">\n            <header class=\"timepicker__header\">\n                <ngx-material-timepicker-dial [format]=\"format\" [hour]=\"(selectedHour | async)?.time\"\n                                              [minute]=\"(selectedMinute | async)?.time\"\n                                              [period]=\"selectedPeriod | async\"\n                                              [activeTimeUnit]=\"activeTimeUnit\"\n                                              [minTime]=\"minTime\"\n                                              [maxTime]=\"maxTime\"\n                                              [isEditable]=\"enableKeyboardInput\"\n                                              [editableHintTmpl]=\"editableHintTmpl\"\n                                              [minutesGap]=\"minutesGap\"\n                                              [hoursOnly]=\"hoursOnly\"\n                                              (periodChanged)=\"changePeriod($event)\"\n                                              (timeUnitChanged)=\"changeTimeUnit($event)\"\n                                              (hourChanged)=\"onHourChange($event)\"\n                                              (minuteChanged)=\"onMinuteChange($event)\"\n                ></ngx-material-timepicker-dial>\n            </header>\n            <div class=\"timepicker__main-content\">\n                <div class=\"timepicker__body\" [ngSwitch]=\"activeTimeUnit\">\n                    <div *ngSwitchCase=\"timeUnit.HOUR\">\n                        <ngx-material-timepicker-24-hours-face *ngIf=\"format === 24;else ampmHours\"\n                                                               (hourChange)=\"onHourChange($event)\"\n                                                               [selectedHour]=\"selectedHour | async\"\n                                                               [minTime]=\"minTime\"\n                                                               [maxTime]=\"maxTime\"\n                                                               [format]=\"format\"\n                                                               (hourSelected)=\"onHourSelected($event)\"></ngx-material-timepicker-24-hours-face>\n                        <ng-template #ampmHours>\n                            <ngx-material-timepicker-12-hours-face\n                                (hourChange)=\"onHourChange($event)\"\n                                [selectedHour]=\"selectedHour | async\"\n                                [period]=\"selectedPeriod | async\"\n                                [minTime]=\"minTime\"\n                                [maxTime]=\"maxTime\"\n                                (hourSelected)=\"onHourSelected($event)\"></ngx-material-timepicker-12-hours-face>\n                        </ng-template>\n                    </div>\n                    <ngx-material-timepicker-minutes-face *ngSwitchCase=\"timeUnit.MINUTE\"\n                                                          [selectedMinute]=\"selectedMinute | async\"\n                                                          [selectedHour]=\"(selectedHour | async)?.time\"\n                                                          [minTime]=\"minTime\"\n                                                          [maxTime]=\"maxTime\"\n                                                          [format]=\"format\"\n                                                          [period]=\"selectedPeriod | async\"\n                                                          [minutesGap]=\"minutesGap\"\n                                                          (minuteChange)=\"onMinuteChange($event)\"></ngx-material-timepicker-minutes-face>\n                </div>\n                <div class=\"timepicker__actions\">\n                    <div (click)=\"close()\">\n                        <!--suppress HtmlUnknownAttribute -->\n                        <ng-container\n                            *ngTemplateOutlet=\"cancelBtnTmpl ? cancelBtnTmpl : cancelBtnDefault\"></ng-container>\n                    </div>\n                    <div (click)=\"setTime()\">\n                        <!--suppress HtmlUnknownAttribute -->\n                        <ng-container\n                            *ngTemplateOutlet=\"confirmBtnTmpl ? confirmBtnTmpl : confirmBtnDefault\"></ng-container>\n                    </div>\n                </div>\n            </div>\n        </div>\n    </ngx-material-timepicker-content>\n</div>\n<ng-template #cancelBtnDefault>\n    <ngx-material-timepicker-button>Cancel</ngx-material-timepicker-button>\n</ng-template>\n<ng-template #confirmBtnDefault>\n    <ngx-material-timepicker-button>Ok</ngx-material-timepicker-button>\n</ng-template>\n",
            animations: [
                trigger('timepicker', [
                    transition("* => " + AnimationState.ENTER, [
                        style({ transform: 'translateY(-30%)' }),
                        animate('0.2s ease-out', style({ transform: 'translateY(0)' }))
                    ]),
                    transition(AnimationState.ENTER + " => " + AnimationState.LEAVE, [
                        style({ transform: 'translateY(0)', opacity: 1 }),
                        animate('0.2s ease-out', style({ transform: 'translateY(-30%)', opacity: 0 }))
                    ])
                ])
            ],
            providers: [NgxMaterialTimepickerService],
            host: {
                'class': 'class'
            },
            styles: [":host{--body-background-color:#fff;--primary-font-family:'Roboto',sans-serif;--button-color:deepskyblue;--dial-active-color:#fff;--dial-inactive-color:rgba(255, 255, 255, .5);--dial-background-color:deepskyblue;--dial-editable-active-color:deepskyblue;--dial-editable-background-color:#fff;--clock-face-time-active-color:#fff;--clock-face-time-inactive-color:#6c6c6c;--clock-face-inner-time-inactive-color:#929292;--clock-face-time-disabled-color:#c5c5c5;--clock-face-background-color:#f0f0f0;--clock-hand-color:deepskyblue}.timepicker-backdrop-overlay{position:fixed;top:0;bottom:0;right:0;left:0;background-color:rgba(0,0,0,.3);z-index:999;pointer-events:auto}.timepicker-backdrop-overlay--transparent{background-color:transparent}.timepicker-overlay{position:fixed;top:0;left:0;width:100%;height:100%;display:flex;justify-content:center;align-items:center;z-index:999;pointer-events:none}.timepicker{width:300px;border-radius:2px;box-shadow:rgba(0,0,0,.25) 0 14px 45px,rgba(0,0,0,.22) 0 10px 18px;outline:0;position:static;z-index:999;pointer-events:auto}.timepicker__header{padding:15px 30px;background-color:#00bfff}@supports (background-color:var(--dial-background-color)){.timepicker__header{background-color:var(--dial-background-color)}}.timepicker__body{padding:15px 5px;display:flex;justify-content:center;align-items:center;background-color:#fff}@supports (background-color:var(--body-background-color)){.timepicker__body{background-color:var(--body-background-color)}}.timepicker__actions{display:flex;justify-content:flex-end;padding:15px;background-color:#fff}@supports (background-color:var(--body-background-color)){.timepicker__actions{background-color:var(--body-background-color)}}@media (max-device-width:1023px) and (orientation:landscape){.timepicker{display:flex;width:515px}.timepicker__header{display:flex;align-items:center}.timepicker__main-content{display:flex;flex-direction:column;width:100%}.timepicker__actions{padding:5px;margin-top:-1px}}"]
        }),
        tslib_1.__param(2, Inject(TIME_LOCALE))
    ], NgxMaterialTimepickerContainerComponent);
    return NgxMaterialTimepickerContainerComponent;
}());
export { NgxMaterialTimepickerContainerComponent };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibmd4LW1hdGVyaWFsLXRpbWVwaWNrZXItY29udGFpbmVyLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiJuZzovL25neC1tYXRlcmlhbC10aW1lcGlja2VyLyIsInNvdXJjZXMiOlsic3JjL2FwcC9tYXRlcmlhbC10aW1lcGlja2VyL2NvbXBvbmVudHMvbmd4LW1hdGVyaWFsLXRpbWVwaWNrZXItY29udGFpbmVyL25neC1tYXRlcmlhbC10aW1lcGlja2VyLWNvbnRhaW5lci5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLE9BQU8sRUFBRSxTQUFTLEVBQUUsWUFBWSxFQUFFLE1BQU0sRUFBRSxLQUFLLEVBQWtDLE1BQU0sZUFBZSxDQUFDO0FBR3ZHLE9BQU8sRUFBRSxRQUFRLEVBQUUsTUFBTSw2QkFBNkIsQ0FBQztBQUV2RCxPQUFPLEVBQUUsT0FBTyxFQUFrQixLQUFLLEVBQUUsVUFBVSxFQUFFLE9BQU8sRUFBRSxNQUFNLHFCQUFxQixDQUFDO0FBQzFGLE9BQU8sRUFBRSw0QkFBNEIsRUFBRSxNQUFNLGdEQUFnRCxDQUFDO0FBQzlGLE9BQU8sRUFBYyxPQUFPLEVBQUUsTUFBTSxNQUFNLENBQUM7QUFDM0MsT0FBTyxFQUFFLFdBQVcsRUFBRSxTQUFTLEVBQUUsTUFBTSxnQkFBZ0IsQ0FBQztBQUN4RCxPQUFPLEVBQUUsV0FBVyxFQUFFLE1BQU0sNkJBQTZCLENBQUM7QUFHMUQsT0FBTyxFQUFFLGlDQUFpQyxFQUFFLE1BQU0sc0RBQXNELENBQUM7QUFFekcsT0FBTyxFQUFFLFdBQVcsRUFBRSxNQUFNLGdDQUFnQyxDQUFDO0FBRTdELE1BQU0sQ0FBTixJQUFZLGNBR1g7QUFIRCxXQUFZLGNBQWM7SUFDdEIsaUNBQWUsQ0FBQTtJQUNmLGlDQUFlLENBQUE7QUFDbkIsQ0FBQyxFQUhXLGNBQWMsS0FBZCxjQUFjLFFBR3pCO0FBdUJEO0lBaURJLGlEQUFvQixpQkFBK0MsRUFDL0MsWUFBK0MsRUFDMUIsTUFBYztRQUZuQyxzQkFB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QUFLLENBQUMsRUFBQyxTQUFTLEVBQUUsZUFBZSxFQUFFLE9BQU8sRUFBRSxDQUFDLEVBQUMsQ0FBQzt3QkFDL0MsT0FBTyxDQUFDLGVBQWUsRUFBRSxLQUFLLENBQUMsRUFBQyxTQUFTLEVBQUUsa0JBQWtCLEVBQUUsT0FBTyxFQUFFLENBQUMsRUFBQyxDQUFDLENBQUM7cUJBQy9FLENBQUM7aUJBQ0wsQ0FBQzthQUNMO1lBQ0QsU0FBUyxFQUFFLENBQUMsNEJBQTRCLENBQUM7WUFDekMsSUFBSSxFQUFFO2dCQUNGLE9BQU8sRUFBRSxPQUFPO2FBQ25COztTQUNKLENBQUM7UUFvRGUsbUJBQUEsTUFBTSxDQUFDLFdBQVcsQ0FBQyxDQUFBO09BbkR2Qix1Q0FBdUMsQ0EwSm5EO0lBQUQsOENBQUM7Q0FBQSxBQTFKRCxJQTBKQztTQTFKWSx1Q0FBdUMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDb21wb25lbnQsIEhvc3RMaXN0ZW5lciwgSW5qZWN0LCBJbnB1dCwgT25EZXN0cm95LCBPbkluaXQsIFRlbXBsYXRlUmVmIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBDbG9ja0ZhY2VUaW1lIH0gZnJvbSAnLi4vLi4vbW9kZWxzL2Nsb2NrLWZhY2UtdGltZS5pbnRlcmZhY2UnO1xuaW1wb3J0IHsgVGltZVBlcmlvZCB9IGZyb20gJy4uLy4uL21vZGVscy90aW1lLXBlcmlvZC5lbnVtJztcbmltcG9ydCB7IFRpbWVVbml0IH0gZnJvbSAnLi4vLi4vbW9kZWxzL3RpbWUtdW5pdC5lbnVtJztcbmltcG9ydCB7IERhdGVUaW1lIH0gZnJvbSAnbHV4b24nO1xuaW1wb3J0IHsgYW5pbWF0ZSwgQW5pbWF0aW9uRXZlbnQsIHN0eWxlLCB0cmFuc2l0aW9uLCB0cmlnZ2VyIH0gZnJvbSAnQGFuZ3VsYXIvYW5pbWF0aW9ucyc7XG5pbXBvcnQgeyBOZ3hNYXRlcmlhbFRpbWVwaWNrZXJTZXJ2aWNlIH0gZnJvbSAnLi4vLi4vc2VydmljZXMvbmd4LW1hdGVyaWFsLXRpbWVwaWNrZXIuc2VydmljZSc7XG5pbXBvcnQgeyBPYnNlcnZhYmxlLCBTdWJqZWN0IH0gZnJvbSAncnhqcyc7XG5pbXBvcnQgeyBzaGFyZVJlcGxheSwgdGFrZVVudGlsIH0gZnJvbSAncnhqcy9vcGVyYXRvcnMnO1xuaW1wb3J0IHsgVGltZUFkYXB0ZXIgfSBmcm9tICcuLi8uLi9zZXJ2aWNlcy90aW1lLWFkYXB0ZXInO1xuaW1wb3J0IHsgVGltZXBpY2tlclJlZiB9IGZyb20gJy4uLy4uL21vZGVscy90aW1lcGlja2VyLXJlZi5pbnRlcmZhY2UnO1xuaW1wb3J0IHsgVGltZXBpY2tlckNvbmZpZyB9IGZyb20gJy4uLy4uL21vZGVscy90aW1lcGlja2VyLWNvbmZpZy5pbnRlcmZhY2UnO1xuaW1wb3J0IHsgTmd4TWF0ZXJpYWxUaW1lcGlja2VyRXZlbnRTZXJ2aWNlIH0gZnJvbSAnLi4vLi4vc2VydmljZXMvbmd4LW1hdGVyaWFsLXRpbWVwaWNrZXItZXZlbnQuc2VydmljZSc7XG5pbXBvcnQgeyBOZ3hNYXRlcmlhbFRpbWVwaWNrZXJUaGVtZSB9IGZyb20gJy4uLy4uL21vZGVscy9uZ3gtbWF0ZXJpYWwtdGltZXBpY2tlci10aGVtZS5pbnRlcmZhY2UnO1xuaW1wb3J0IHsgVElNRV9MT0NBTEUgfSBmcm9tICcuLi8uLi90b2tlbnMvdGltZS1sb2NhbGUudG9rZW4nO1xuXG5leHBvcnQgZW51bSBBbmltYXRpb25TdGF0ZSB7XG4gICAgRU5URVIgPSAnZW50ZXInLFxuICAgIExFQVZFID0gJ2xlYXZlJ1xufVxuXG5AQ29tcG9uZW50KHtcbiAgICBzZWxlY3RvcjogJ25neC1tYXRlcmlhbC10aW1lcGlja2VyLWNvbnRhaW5lcicsXG4gICAgdGVtcGxhdGVVcmw6ICcuL25neC1tYXRlcmlhbC10aW1lcGlja2VyLWNvbnRhaW5lci5jb21wb25lbnQuaHRtbCcsXG4gICAgc3R5bGVVcmxzOiBbJy4vbmd4LW1hdGVyaWFsLXRpbWVwaWNrZXItY29udGFpbmVyLmNvbXBvbmVudC5zY3NzJ10sXG4gICAgYW5pbWF0aW9uczogW1xuICAgICAgICB0cmlnZ2VyKCd0aW1lcGlja2VyJywgW1xuICAgICAgICAgICAgdHJhbnNpdGlvbihgKiA9PiAke0FuaW1hdGlvblN0YXRlLkVOVEVSfWAsIFtcbiAgICAgICAgICAgICAgICBzdHlsZSh7dHJhbnNmb3JtOiAndHJhbnNsYXRlWSgtMzAlKSd9KSxcbiAgICAgICAgICAgICAgICBhbmltYXRlKCcwLjJzIGVhc2Utb3V0Jywgc3R5bGUoe3RyYW5zZm9ybTogJ3RyYW5zbGF0ZVkoMCknfSkpXG4gICAgICAgICAgICBdKSxcbiAgICAgICAgICAgIHRyYW5zaXRpb24oYCR7QW5pbWF0aW9uU3RhdGUuRU5URVJ9ID0+ICR7QW5pbWF0aW9uU3RhdGUuTEVBVkV9YCwgW1xuICAgICAgICAgICAgICAgIHN0eWxlKHt0cmFuc2Zvcm06ICd0cmFuc2xhdGVZKDApJywgb3BhY2l0eTogMX0pLFxuICAgICAgICAgICAgICAgIGFuaW1hdGUoJzAuMnMgZWFzZS1vdXQnLCBzdHlsZSh7dHJhbnNmb3JtOiAndHJhbnNsYXRlWSgtMzAlKScsIG9wYWNpdHk6IDB9KSlcbiAgICAgICAgICAgIF0pXG4gICAgICAgIF0pXG4gICAgXSxcbiAgICBwcm92aWRlcnM6IFtOZ3hNYXRlcmlhbFRpbWVwaWNrZXJTZXJ2aWNlXSxcbiAgICBob3N0OiB7XG4gICAgICAgICdjbGFzcyc6ICdjbGFzcydcbiAgICB9XG59KVxuZXhwb3J0IGNsYXNzIE5neE1hdGVyaWFsVGltZXBpY2tlckNvbnRhaW5lckNvbXBvbmVudCBpbXBsZW1lbnRzIE9uSW5pdCwgT25EZXN0cm95LCBUaW1lcGlja2VyQ29uZmlnIHtcblxuICAgIHNlbGVjdGVkSG91cjogT2JzZXJ2YWJsZTxDbG9ja0ZhY2VUaW1lPjtcbiAgICBzZWxlY3RlZE1pbnV0ZTogT2JzZXJ2YWJsZTxDbG9ja0ZhY2VUaW1lPjtcbiAgICBzZWxlY3RlZFBlcmlvZDogT2JzZXJ2YWJsZTxUaW1lUGVyaW9kPjtcblxuICAgIHRpbWVVbml0ID0gVGltZVVuaXQ7XG4gICAgYWN0aXZlVGltZVVuaXQgPSBUaW1lVW5pdC5IT1VSO1xuXG4gICAgYW5pbWF0aW9uU3RhdGU6IEFuaW1hdGlvblN0YXRlO1xuXG4gICAgY2FuY2VsQnRuVG1wbDogVGVtcGxhdGVSZWY8Tm9kZT47XG4gICAgZWRpdGFibGVIaW50VG1wbDogVGVtcGxhdGVSZWY8Tm9kZT47XG4gICAgY29uZmlybUJ0blRtcGw6IFRlbXBsYXRlUmVmPE5vZGU+O1xuICAgIGlucHV0RWxlbWVudDogYW55O1xuXG4gICAgZW5hYmxlS2V5Ym9hcmRJbnB1dDogYm9vbGVhbjtcbiAgICBwcmV2ZW50T3ZlcmxheUNsaWNrOiBib29sZWFuO1xuICAgIGRpc2FibGVBbmltYXRpb246IGJvb2xlYW47XG4gICAgZGlzYWJsZWQ6IGJvb2xlYW47XG4gICAgYXBwZW5kVG9JbnB1dDogYm9vbGVhbjtcbiAgICBob3Vyc09ubHk6IGJvb2xlYW47XG5cbiAgICBmb3JtYXQ6IG51bWJlcjtcbiAgICBtaW51dGVzR2FwOiBudW1iZXI7XG5cbiAgICBtaW5UaW1lOiBEYXRlVGltZTtcbiAgICBtYXhUaW1lOiBEYXRlVGltZTtcbiAgICB0aW1lOiBzdHJpbmc7XG5cbiAgICB0aW1lcGlja2VyQ2xhc3M6IHN0cmluZztcbiAgICBjbGFzczogc3RyaW5nO1xuICAgIHRoZW1lOiBOZ3hNYXRlcmlhbFRpbWVwaWNrZXJUaGVtZTtcbiAgICB0aW1lcGlja2VyQmFzZVJlZjogVGltZXBpY2tlclJlZjtcblxuICAgIEBJbnB1dCgpXG4gICAgc2V0IGRlZmF1bHRUaW1lKHRpbWU6IHN0cmluZykge1xuICAgICAgICB0aGlzLl9kZWZhdWx0VGltZSA9IHRpbWU7XG4gICAgICAgIHRoaXMuc2V0RGVmYXVsdFRpbWUodGltZSk7XG4gICAgfVxuXG4gICAgZ2V0IGRlZmF1bHRUaW1lKCk6IHN0cmluZyB7XG4gICAgICAgIHJldHVybiB0aGlzLl9kZWZhdWx0VGltZTtcbiAgICB9XG5cbiAgICBwcml2YXRlIF9kZWZhdWx0VGltZTogc3RyaW5nO1xuXG4gICAgcHJpdmF0ZSB1bnN1YnNjcmliZSA9IG5ldyBTdWJqZWN0KCk7XG5cbiAgICBjb25zdHJ1Y3Rvcihwcml2YXRlIHRpbWVwaWNrZXJTZXJ2aWNlOiBOZ3hNYXRlcmlhbFRpbWVwaWNrZXJTZXJ2aWNlLFxuICAgICAgICAgICAgICAgIHByaXZhdGUgZXZlbnRTZXJ2aWNlOiBOZ3hNYXRlcmlhbFRpbWVwaWNrZXJFdmVudFNlcnZpY2UsXG4gICAgICAgICAgICAgICAgQEluamVjdChUSU1FX0xPQ0FMRSkgcHJpdmF0ZSBsb2NhbGU6IHN0cmluZykge1xuICAgIH1cblxuICAgIEBIb3N0TGlzdGVuZXIoJ2tleWRvd24nLCBbJyRldmVudCddKVxuICAgIG9uS2V5ZG93bihlOiBhbnkpOiB2b2lkIHtcbiAgICAgICAgdGhpcy5ldmVudFNlcnZpY2UuZGlzcGF0Y2hFdmVudChlKTtcbiAgICAgICAgZS5zdG9wUHJvcGFnYXRpb24oKTtcbiAgICB9XG5cbiAgICBuZ09uSW5pdCgpOiB2b2lkIHtcblxuICAgICAgICB0aGlzLmFuaW1hdGlvblN0YXRlID0gIXRoaXMuZGlzYWJsZUFuaW1hdGlvbiAmJiBBbmltYXRpb25TdGF0ZS5FTlRFUjtcblxuICAgICAgICB0aGlzLmRlZmluZVRpbWUoKTtcblxuICAgICAgICB0aGlzLnNlbGVjdGVkSG91ciA9IHRoaXMudGltZXBpY2tlclNlcnZpY2Uuc2VsZWN0ZWRIb3VyXG4gICAgICAgICAgICAucGlwZShzaGFyZVJlcGxheSh7YnVmZmVyU2l6ZTogMSwgcmVmQ291bnQ6IHRydWV9KSk7XG5cbiAgICAgICAgdGhpcy5zZWxlY3RlZE1pbnV0ZSA9IHRoaXMudGltZXBpY2tlclNlcnZpY2Uuc2VsZWN0ZWRNaW51dGVcbiAgICAgICAgICAgIC5waXBlKHNoYXJlUmVwbGF5KHtidWZmZXJTaXplOiAxLCByZWZDb3VudDogdHJ1ZX0pKTtcblxuICAgICAgICB0aGlzLnNlbGVjdGVkUGVyaW9kID0gdGhpcy50aW1lcGlja2VyU2VydmljZS5zZWxlY3RlZFBlcmlvZFxuICAgICAgICAgICAgLnBpcGUoc2hhcmVSZXBsYXkoe2J1ZmZlclNpemU6IDEsIHJlZkNvdW50OiB0cnVlfSkpO1xuXG4gICAgICAgIHRoaXMudGltZXBpY2tlckJhc2VSZWYudGltZVVwZGF0ZWQucGlwZSh0YWtlVW50aWwodGhpcy51bnN1YnNjcmliZSkpXG4gICAgICAgICAgICAuc3Vic2NyaWJlKHRoaXMuc2V0RGVmYXVsdFRpbWUuYmluZCh0aGlzKSk7XG4gICAgfVxuXG4gICAgb25Ib3VyQ2hhbmdlKGhvdXI6IENsb2NrRmFjZVRpbWUpOiB2b2lkIHtcbiAgICAgICAgdGhpcy50aW1lcGlja2VyU2VydmljZS5ob3VyID0gaG91cjtcbiAgICAgICAgdGhpcy5vblRpbWVDaGFuZ2UoKTtcbiAgICB9XG5cbiAgICBvbkhvdXJTZWxlY3RlZChob3VyOiBudW1iZXIpOiB2b2lkIHtcbiAgICAgICAgaWYgKCF0aGlzLmhvdXJzT25seSkge1xuICAgICAgICAgICAgdGhpcy5jaGFuZ2VUaW1lVW5pdChUaW1lVW5pdC5NSU5VVEUpO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMudGltZXBpY2tlckJhc2VSZWYuaG91clNlbGVjdGVkLm5leHQoaG91cik7XG4gICAgfVxuXG4gICAgb25NaW51dGVDaGFuZ2UobWludXRlOiBDbG9ja0ZhY2VUaW1lKTogdm9pZCB7XG4gICAgICAgIHRoaXMudGltZXBpY2tlclNlcnZpY2UubWludXRlID0gbWludXRlO1xuICAgICAgICB0aGlzLm9uVGltZUNoYW5nZSgpO1xuICAgIH1cblxuICAgIGNoYW5nZVBlcmlvZChwZXJpb2Q6IFRpbWVQZXJpb2QpOiB2b2lkIHtcbiAgICAgICAgdGhpcy50aW1lcGlja2VyU2VydmljZS5wZXJpb2QgPSBwZXJpb2Q7XG4gICAgICAgIHRoaXMub25UaW1lQ2hhbmdlKCk7XG4gICAgfVxuXG4gICAgY2hhbmdlVGltZVVuaXQodW5pdDogVGltZVVuaXQpOiB2b2lkIHtcbiAgICAgICAgdGhpcy5hY3RpdmVUaW1lVW5pdCA9IHVuaXQ7XG4gICAgfVxuXG4gICAgc2V0VGltZSgpOiB2b2lkIHtcbiAgICAgICAgdGhpcy50aW1lcGlja2VyQmFzZVJlZi50aW1lU2V0Lm5leHQodGhpcy50aW1lcGlja2VyU2VydmljZS5nZXRGdWxsVGltZSh0aGlzLmZvcm1hdCkpO1xuICAgICAgICB0aGlzLmNsb3NlKCk7XG4gICAgfVxuXG4gICAgY2xvc2UoKTogdm9pZCB7XG4gICAgICAgIGlmICh0aGlzLmRpc2FibGVBbmltYXRpb24pIHtcbiAgICAgICAgICAgIHRoaXMudGltZXBpY2tlckJhc2VSZWYuY2xvc2UoKTtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuXG4gICAgICAgIHRoaXMuYW5pbWF0aW9uU3RhdGUgPSBBbmltYXRpb25TdGF0ZS5MRUFWRTtcbiAgICB9XG5cbiAgICBhbmltYXRpb25Eb25lKGV2ZW50OiBBbmltYXRpb25FdmVudCk6IHZvaWQge1xuICAgICAgICBpZiAoZXZlbnQucGhhc2VOYW1lID09PSAnZG9uZScgJiYgZXZlbnQudG9TdGF0ZSA9PT0gQW5pbWF0aW9uU3RhdGUuTEVBVkUpIHtcbiAgICAgICAgICAgIHRoaXMudGltZXBpY2tlckJhc2VSZWYuY2xvc2UoKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIG5nT25EZXN0cm95KCk6IHZvaWQge1xuICAgICAgICB0aGlzLnVuc3Vic2NyaWJlLm5leHQoKTtcbiAgICAgICAgdGhpcy51bnN1YnNjcmliZS5jb21wbGV0ZSgpO1xuICAgIH1cblxuICAgIHByaXZhdGUgc2V0RGVmYXVsdFRpbWUodGltZTogc3RyaW5nKTogdm9pZCB7XG4gICAgICAgIHRoaXMudGltZXBpY2tlclNlcnZpY2Uuc2V0RGVmYXVsdFRpbWVJZkF2YWlsYWJsZShcbiAgICAgICAgICAgIHRpbWUsIHRoaXMubWluVGltZSwgdGhpcy5tYXhUaW1lLCB0aGlzLmZvcm1hdCwgdGhpcy5taW51dGVzR2FwKTtcbiAgICB9XG5cbiAgICBwcml2YXRlIGRlZmluZVRpbWUoKTogdm9pZCB7XG4gICAgICAgIGNvbnN0IG1pblRpbWUgPSB0aGlzLm1pblRpbWU7XG5cbiAgICAgICAgaWYgKG1pblRpbWUgJiYgKCF0aGlzLnRpbWUgJiYgIXRoaXMuZGVmYXVsdFRpbWUpKSB7XG4gICAgICAgICAgICBjb25zdCB0aW1lID0gVGltZUFkYXB0ZXIuZnJvbURhdGVUaW1lVG9TdHJpbmcobWluVGltZSwgdGhpcy5mb3JtYXQpO1xuXG4gICAgICAgICAgICB0aGlzLnNldERlZmF1bHRUaW1lKHRpbWUpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBvblRpbWVDaGFuZ2UoKTogdm9pZCB7XG4gICAgICAgIGNvbnN0IHRpbWUgPSBUaW1lQWRhcHRlci50b0xvY2FsZVRpbWVTdHJpbmcodGhpcy50aW1lcGlja2VyU2VydmljZS5nZXRGdWxsVGltZSh0aGlzLmZvcm1hdCksIHtcbiAgICAgICAgICAgIGxvY2FsZTogdGhpcy5sb2NhbGUsXG4gICAgICAgICAgICBmb3JtYXQ6IHRoaXMuZm9ybWF0XG4gICAgICAgIH0pO1xuXG4gICAgICAgIHRoaXMudGltZXBpY2tlckJhc2VSZWYudGltZUNoYW5nZWQuZW1pdCh0aW1lKTtcbiAgICB9XG5cbn1cbiJdfQ==