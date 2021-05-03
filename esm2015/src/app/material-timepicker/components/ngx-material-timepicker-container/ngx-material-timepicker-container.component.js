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
let NgxMaterialTimepickerContainerComponent = class NgxMaterialTimepickerContainerComponent {
    constructor(timepickerService, eventService, locale) {
        this.timepickerService = timepickerService;
        this.eventService = eventService;
        this.locale = locale;
        this.timeUnit = TimeUnit;
        this.activeTimeUnit = TimeUnit.HOUR;
        this.unsubscribe = new Subject();
    }
    set defaultTime(time) {
        this._defaultTime = time;
        this.setDefaultTime(time);
    }
    get defaultTime() {
        return this._defaultTime;
    }
    onKeydown(e) {
        this.eventService.dispatchEvent(e);
        e.stopPropagation();
    }
    ngOnInit() {
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
    }
    onHourChange(hour) {
        this.timepickerService.hour = hour;
        this.onTimeChange();
    }
    onHourSelected(hour) {
        if (!this.hoursOnly) {
            this.changeTimeUnit(TimeUnit.MINUTE);
        }
        this.timepickerBaseRef.hourSelected.next(hour);
    }
    onMinuteChange(minute) {
        this.timepickerService.minute = minute;
        this.onTimeChange();
    }
    changePeriod(period) {
        this.timepickerService.period = period;
        this.onTimeChange();
    }
    changeTimeUnit(unit) {
        this.activeTimeUnit = unit;
    }
    setTime() {
        this.timepickerBaseRef.timeSet.next(this.timepickerService.getFullTime(this.format));
        this.close();
    }
    close() {
        if (this.disableAnimation) {
            this.timepickerBaseRef.close();
            return;
        }
        this.animationState = AnimationState.LEAVE;
    }
    animationDone(event) {
        if (event.phaseName === 'done' && event.toState === AnimationState.LEAVE) {
            this.timepickerBaseRef.close();
        }
    }
    ngOnDestroy() {
        this.unsubscribe.next();
        this.unsubscribe.complete();
    }
    setDefaultTime(time) {
        this.timepickerService.setDefaultTimeIfAvailable(time, this.minTime, this.maxTime, this.format, this.minutesGap);
    }
    defineTime() {
        const minTime = this.minTime;
        if (minTime && (!this.time && !this.defaultTime)) {
            const time = TimeAdapter.fromDateTimeToString(minTime, this.format);
            this.setDefaultTime(time);
        }
    }
    onTimeChange() {
        const time = TimeAdapter.toLocaleTimeString(this.timepickerService.getFullTime(this.format), {
            locale: this.locale,
            format: this.format
        });
        this.timepickerBaseRef.timeChanged.emit(time);
    }
};
NgxMaterialTimepickerContainerComponent.ctorParameters = () => [
    { type: NgxMaterialTimepickerService },
    { type: NgxMaterialTimepickerEventService },
    { type: String, decorators: [{ type: Inject, args: [TIME_LOCALE,] }] }
];
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
                transition(`* => ${AnimationState.ENTER}`, [
                    style({ transform: 'translateY(-30%)' }),
                    animate('0.2s ease-out', style({ transform: 'translateY(0)' }))
                ]),
                transition(`${AnimationState.ENTER} => ${AnimationState.LEAVE}`, [
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
export { NgxMaterialTimepickerContainerComponent };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibmd4LW1hdGVyaWFsLXRpbWVwaWNrZXItY29udGFpbmVyLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiJuZzovL25neC1tYXRlcmlhbC10aW1lcGlja2VyLyIsInNvdXJjZXMiOlsic3JjL2FwcC9tYXRlcmlhbC10aW1lcGlja2VyL2NvbXBvbmVudHMvbmd4LW1hdGVyaWFsLXRpbWVwaWNrZXItY29udGFpbmVyL25neC1tYXRlcmlhbC10aW1lcGlja2VyLWNvbnRhaW5lci5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLE9BQU8sRUFBRSxTQUFTLEVBQUUsWUFBWSxFQUFFLE1BQU0sRUFBRSxLQUFLLEVBQWtDLE1BQU0sZUFBZSxDQUFDO0FBR3ZHLE9BQU8sRUFBRSxRQUFRLEVBQUUsTUFBTSw2QkFBNkIsQ0FBQztBQUV2RCxPQUFPLEVBQUUsT0FBTyxFQUFrQixLQUFLLEVBQUUsVUFBVSxFQUFFLE9BQU8sRUFBRSxNQUFNLHFCQUFxQixDQUFDO0FBQzFGLE9BQU8sRUFBRSw0QkFBNEIsRUFBRSxNQUFNLGdEQUFnRCxDQUFDO0FBQzlGLE9BQU8sRUFBYyxPQUFPLEVBQUUsTUFBTSxNQUFNLENBQUM7QUFDM0MsT0FBTyxFQUFFLFdBQVcsRUFBRSxTQUFTLEVBQUUsTUFBTSxnQkFBZ0IsQ0FBQztBQUN4RCxPQUFPLEVBQUUsV0FBVyxFQUFFLE1BQU0sNkJBQTZCLENBQUM7QUFHMUQsT0FBTyxFQUFFLGlDQUFpQyxFQUFFLE1BQU0sc0RBQXNELENBQUM7QUFFekcsT0FBTyxFQUFFLFdBQVcsRUFBRSxNQUFNLGdDQUFnQyxDQUFDO0FBRTdELE1BQU0sQ0FBTixJQUFZLGNBR1g7QUFIRCxXQUFZLGNBQWM7SUFDdEIsaUNBQWUsQ0FBQTtJQUNmLGlDQUFlLENBQUE7QUFDbkIsQ0FBQyxFQUhXLGNBQWMsS0FBZCxjQUFjLFFBR3pCO0FBdUJELElBQWEsdUNBQXVDLEdBQXBELE1BQWEsdUNBQXVDO0lBaURoRCxZQUFvQixpQkFBK0MsRUFD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QUUsQ0FBQyxFQUFDLENBQUM7b0JBQy9DLE9BQU8sQ0FBQyxlQUFlLEVBQUUsS0FBSyxDQUFDLEVBQUMsU0FBUyxFQUFFLGtCQUFrQixFQUFFLE9BQU8sRUFBRSxDQUFDLEVBQUMsQ0FBQyxDQUFDO2lCQUMvRSxDQUFDO2FBQ0wsQ0FBQztTQUNMO1FBQ0QsU0FBUyxFQUFFLENBQUMsNEJBQTRCLENBQUM7UUFDekMsSUFBSSxFQUFFO1lBQ0YsT0FBTyxFQUFFLE9BQU87U0FDbkI7O0tBQ0osQ0FBQztJQW9EZSxtQkFBQSxNQUFNLENBQUMsV0FBVyxDQUFDLENBQUE7R0FuRHZCLHVDQUF1QyxDQTBKbkQ7U0ExSlksdUNBQXVDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ29tcG9uZW50LCBIb3N0TGlzdGVuZXIsIEluamVjdCwgSW5wdXQsIE9uRGVzdHJveSwgT25Jbml0LCBUZW1wbGF0ZVJlZiB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgQ2xvY2tGYWNlVGltZSB9IGZyb20gJy4uLy4uL21vZGVscy9jbG9jay1mYWNlLXRpbWUuaW50ZXJmYWNlJztcbmltcG9ydCB7IFRpbWVQZXJpb2QgfSBmcm9tICcuLi8uLi9tb2RlbHMvdGltZS1wZXJpb2QuZW51bSc7XG5pbXBvcnQgeyBUaW1lVW5pdCB9IGZyb20gJy4uLy4uL21vZGVscy90aW1lLXVuaXQuZW51bSc7XG5pbXBvcnQgeyBEYXRlVGltZSB9IGZyb20gJ2x1eG9uJztcbmltcG9ydCB7IGFuaW1hdGUsIEFuaW1hdGlvbkV2ZW50LCBzdHlsZSwgdHJhbnNpdGlvbiwgdHJpZ2dlciB9IGZyb20gJ0Bhbmd1bGFyL2FuaW1hdGlvbnMnO1xuaW1wb3J0IHsgTmd4TWF0ZXJpYWxUaW1lcGlja2VyU2VydmljZSB9IGZyb20gJy4uLy4uL3NlcnZpY2VzL25neC1tYXRlcmlhbC10aW1lcGlja2VyLnNlcnZpY2UnO1xuaW1wb3J0IHsgT2JzZXJ2YWJsZSwgU3ViamVjdCB9IGZyb20gJ3J4anMnO1xuaW1wb3J0IHsgc2hhcmVSZXBsYXksIHRha2VVbnRpbCB9IGZyb20gJ3J4anMvb3BlcmF0b3JzJztcbmltcG9ydCB7IFRpbWVBZGFwdGVyIH0gZnJvbSAnLi4vLi4vc2VydmljZXMvdGltZS1hZGFwdGVyJztcbmltcG9ydCB7IFRpbWVwaWNrZXJSZWYgfSBmcm9tICcuLi8uLi9tb2RlbHMvdGltZXBpY2tlci1yZWYuaW50ZXJmYWNlJztcbmltcG9ydCB7IFRpbWVwaWNrZXJDb25maWcgfSBmcm9tICcuLi8uLi9tb2RlbHMvdGltZXBpY2tlci1jb25maWcuaW50ZXJmYWNlJztcbmltcG9ydCB7IE5neE1hdGVyaWFsVGltZXBpY2tlckV2ZW50U2VydmljZSB9IGZyb20gJy4uLy4uL3NlcnZpY2VzL25neC1tYXRlcmlhbC10aW1lcGlja2VyLWV2ZW50LnNlcnZpY2UnO1xuaW1wb3J0IHsgTmd4TWF0ZXJpYWxUaW1lcGlja2VyVGhlbWUgfSBmcm9tICcuLi8uLi9tb2RlbHMvbmd4LW1hdGVyaWFsLXRpbWVwaWNrZXItdGhlbWUuaW50ZXJmYWNlJztcbmltcG9ydCB7IFRJTUVfTE9DQUxFIH0gZnJvbSAnLi4vLi4vdG9rZW5zL3RpbWUtbG9jYWxlLnRva2VuJztcblxuZXhwb3J0IGVudW0gQW5pbWF0aW9uU3RhdGUge1xuICAgIEVOVEVSID0gJ2VudGVyJyxcbiAgICBMRUFWRSA9ICdsZWF2ZSdcbn1cblxuQENvbXBvbmVudCh7XG4gICAgc2VsZWN0b3I6ICduZ3gtbWF0ZXJpYWwtdGltZXBpY2tlci1jb250YWluZXInLFxuICAgIHRlbXBsYXRlVXJsOiAnLi9uZ3gtbWF0ZXJpYWwtdGltZXBpY2tlci1jb250YWluZXIuY29tcG9uZW50Lmh0bWwnLFxuICAgIHN0eWxlVXJsczogWycuL25neC1tYXRlcmlhbC10aW1lcGlja2VyLWNvbnRhaW5lci5jb21wb25lbnQuc2NzcyddLFxuICAgIGFuaW1hdGlvbnM6IFtcbiAgICAgICAgdHJpZ2dlcigndGltZXBpY2tlcicsIFtcbiAgICAgICAgICAgIHRyYW5zaXRpb24oYCogPT4gJHtBbmltYXRpb25TdGF0ZS5FTlRFUn1gLCBbXG4gICAgICAgICAgICAgICAgc3R5bGUoe3RyYW5zZm9ybTogJ3RyYW5zbGF0ZVkoLTMwJSknfSksXG4gICAgICAgICAgICAgICAgYW5pbWF0ZSgnMC4ycyBlYXNlLW91dCcsIHN0eWxlKHt0cmFuc2Zvcm06ICd0cmFuc2xhdGVZKDApJ30pKVxuICAgICAgICAgICAgXSksXG4gICAgICAgICAgICB0cmFuc2l0aW9uKGAke0FuaW1hdGlvblN0YXRlLkVOVEVSfSA9PiAke0FuaW1hdGlvblN0YXRlLkxFQVZFfWAsIFtcbiAgICAgICAgICAgICAgICBzdHlsZSh7dHJhbnNmb3JtOiAndHJhbnNsYXRlWSgwKScsIG9wYWNpdHk6IDF9KSxcbiAgICAgICAgICAgICAgICBhbmltYXRlKCcwLjJzIGVhc2Utb3V0Jywgc3R5bGUoe3RyYW5zZm9ybTogJ3RyYW5zbGF0ZVkoLTMwJSknLCBvcGFjaXR5OiAwfSkpXG4gICAgICAgICAgICBdKVxuICAgICAgICBdKVxuICAgIF0sXG4gICAgcHJvdmlkZXJzOiBbTmd4TWF0ZXJpYWxUaW1lcGlja2VyU2VydmljZV0sXG4gICAgaG9zdDoge1xuICAgICAgICAnY2xhc3MnOiAnY2xhc3MnXG4gICAgfVxufSlcbmV4cG9ydCBjbGFzcyBOZ3hNYXRlcmlhbFRpbWVwaWNrZXJDb250YWluZXJDb21wb25lbnQgaW1wbGVtZW50cyBPbkluaXQsIE9uRGVzdHJveSwgVGltZXBpY2tlckNvbmZpZyB7XG5cbiAgICBzZWxlY3RlZEhvdXI6IE9ic2VydmFibGU8Q2xvY2tGYWNlVGltZT47XG4gICAgc2VsZWN0ZWRNaW51dGU6IE9ic2VydmFibGU8Q2xvY2tGYWNlVGltZT47XG4gICAgc2VsZWN0ZWRQZXJpb2Q6IE9ic2VydmFibGU8VGltZVBlcmlvZD47XG5cbiAgICB0aW1lVW5pdCA9IFRpbWVVbml0O1xuICAgIGFjdGl2ZVRpbWVVbml0ID0gVGltZVVuaXQuSE9VUjtcblxuICAgIGFuaW1hdGlvblN0YXRlOiBBbmltYXRpb25TdGF0ZTtcblxuICAgIGNhbmNlbEJ0blRtcGw6IFRlbXBsYXRlUmVmPE5vZGU+O1xuICAgIGVkaXRhYmxlSGludFRtcGw6IFRlbXBsYXRlUmVmPE5vZGU+O1xuICAgIGNvbmZpcm1CdG5UbXBsOiBUZW1wbGF0ZVJlZjxOb2RlPjtcbiAgICBpbnB1dEVsZW1lbnQ6IGFueTtcblxuICAgIGVuYWJsZUtleWJvYXJkSW5wdXQ6IGJvb2xlYW47XG4gICAgcHJldmVudE92ZXJsYXlDbGljazogYm9vbGVhbjtcbiAgICBkaXNhYmxlQW5pbWF0aW9uOiBib29sZWFuO1xuICAgIGRpc2FibGVkOiBib29sZWFuO1xuICAgIGFwcGVuZFRvSW5wdXQ6IGJvb2xlYW47XG4gICAgaG91cnNPbmx5OiBib29sZWFuO1xuXG4gICAgZm9ybWF0OiBudW1iZXI7XG4gICAgbWludXRlc0dhcDogbnVtYmVyO1xuXG4gICAgbWluVGltZTogRGF0ZVRpbWU7XG4gICAgbWF4VGltZTogRGF0ZVRpbWU7XG4gICAgdGltZTogc3RyaW5nO1xuXG4gICAgdGltZXBpY2tlckNsYXNzOiBzdHJpbmc7XG4gICAgY2xhc3M6IHN0cmluZztcbiAgICB0aGVtZTogTmd4TWF0ZXJpYWxUaW1lcGlja2VyVGhlbWU7XG4gICAgdGltZXBpY2tlckJhc2VSZWY6IFRpbWVwaWNrZXJSZWY7XG5cbiAgICBASW5wdXQoKVxuICAgIHNldCBkZWZhdWx0VGltZSh0aW1lOiBzdHJpbmcpIHtcbiAgICAgICAgdGhpcy5fZGVmYXVsdFRpbWUgPSB0aW1lO1xuICAgICAgICB0aGlzLnNldERlZmF1bHRUaW1lKHRpbWUpO1xuICAgIH1cblxuICAgIGdldCBkZWZhdWx0VGltZSgpOiBzdHJpbmcge1xuICAgICAgICByZXR1cm4gdGhpcy5fZGVmYXVsdFRpbWU7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBfZGVmYXVsdFRpbWU6IHN0cmluZztcblxuICAgIHByaXZhdGUgdW5zdWJzY3JpYmUgPSBuZXcgU3ViamVjdCgpO1xuXG4gICAgY29uc3RydWN0b3IocHJpdmF0ZSB0aW1lcGlja2VyU2VydmljZTogTmd4TWF0ZXJpYWxUaW1lcGlja2VyU2VydmljZSxcbiAgICAgICAgICAgICAgICBwcml2YXRlIGV2ZW50U2VydmljZTogTmd4TWF0ZXJpYWxUaW1lcGlja2VyRXZlbnRTZXJ2aWNlLFxuICAgICAgICAgICAgICAgIEBJbmplY3QoVElNRV9MT0NBTEUpIHByaXZhdGUgbG9jYWxlOiBzdHJpbmcpIHtcbiAgICB9XG5cbiAgICBASG9zdExpc3RlbmVyKCdrZXlkb3duJywgWyckZXZlbnQnXSlcbiAgICBvbktleWRvd24oZTogYW55KTogdm9pZCB7XG4gICAgICAgIHRoaXMuZXZlbnRTZXJ2aWNlLmRpc3BhdGNoRXZlbnQoZSk7XG4gICAgICAgIGUuc3RvcFByb3BhZ2F0aW9uKCk7XG4gICAgfVxuXG4gICAgbmdPbkluaXQoKTogdm9pZCB7XG5cbiAgICAgICAgdGhpcy5hbmltYXRpb25TdGF0ZSA9ICF0aGlzLmRpc2FibGVBbmltYXRpb24gJiYgQW5pbWF0aW9uU3RhdGUuRU5URVI7XG5cbiAgICAgICAgdGhpcy5kZWZpbmVUaW1lKCk7XG5cbiAgICAgICAgdGhpcy5zZWxlY3RlZEhvdXIgPSB0aGlzLnRpbWVwaWNrZXJTZXJ2aWNlLnNlbGVjdGVkSG91clxuICAgICAgICAgICAgLnBpcGUoc2hhcmVSZXBsYXkoe2J1ZmZlclNpemU6IDEsIHJlZkNvdW50OiB0cnVlfSkpO1xuXG4gICAgICAgIHRoaXMuc2VsZWN0ZWRNaW51dGUgPSB0aGlzLnRpbWVwaWNrZXJTZXJ2aWNlLnNlbGVjdGVkTWludXRlXG4gICAgICAgICAgICAucGlwZShzaGFyZVJlcGxheSh7YnVmZmVyU2l6ZTogMSwgcmVmQ291bnQ6IHRydWV9KSk7XG5cbiAgICAgICAgdGhpcy5zZWxlY3RlZFBlcmlvZCA9IHRoaXMudGltZXBpY2tlclNlcnZpY2Uuc2VsZWN0ZWRQZXJpb2RcbiAgICAgICAgICAgIC5waXBlKHNoYXJlUmVwbGF5KHtidWZmZXJTaXplOiAxLCByZWZDb3VudDogdHJ1ZX0pKTtcblxuICAgICAgICB0aGlzLnRpbWVwaWNrZXJCYXNlUmVmLnRpbWVVcGRhdGVkLnBpcGUodGFrZVVudGlsKHRoaXMudW5zdWJzY3JpYmUpKVxuICAgICAgICAgICAgLnN1YnNjcmliZSh0aGlzLnNldERlZmF1bHRUaW1lLmJpbmQodGhpcykpO1xuICAgIH1cblxuICAgIG9uSG91ckNoYW5nZShob3VyOiBDbG9ja0ZhY2VUaW1lKTogdm9pZCB7XG4gICAgICAgIHRoaXMudGltZXBpY2tlclNlcnZpY2UuaG91ciA9IGhvdXI7XG4gICAgICAgIHRoaXMub25UaW1lQ2hhbmdlKCk7XG4gICAgfVxuXG4gICAgb25Ib3VyU2VsZWN0ZWQoaG91cjogbnVtYmVyKTogdm9pZCB7XG4gICAgICAgIGlmICghdGhpcy5ob3Vyc09ubHkpIHtcbiAgICAgICAgICAgIHRoaXMuY2hhbmdlVGltZVVuaXQoVGltZVVuaXQuTUlOVVRFKTtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLnRpbWVwaWNrZXJCYXNlUmVmLmhvdXJTZWxlY3RlZC5uZXh0KGhvdXIpO1xuICAgIH1cblxuICAgIG9uTWludXRlQ2hhbmdlKG1pbnV0ZTogQ2xvY2tGYWNlVGltZSk6IHZvaWQge1xuICAgICAgICB0aGlzLnRpbWVwaWNrZXJTZXJ2aWNlLm1pbnV0ZSA9IG1pbnV0ZTtcbiAgICAgICAgdGhpcy5vblRpbWVDaGFuZ2UoKTtcbiAgICB9XG5cbiAgICBjaGFuZ2VQZXJpb2QocGVyaW9kOiBUaW1lUGVyaW9kKTogdm9pZCB7XG4gICAgICAgIHRoaXMudGltZXBpY2tlclNlcnZpY2UucGVyaW9kID0gcGVyaW9kO1xuICAgICAgICB0aGlzLm9uVGltZUNoYW5nZSgpO1xuICAgIH1cblxuICAgIGNoYW5nZVRpbWVVbml0KHVuaXQ6IFRpbWVVbml0KTogdm9pZCB7XG4gICAgICAgIHRoaXMuYWN0aXZlVGltZVVuaXQgPSB1bml0O1xuICAgIH1cblxuICAgIHNldFRpbWUoKTogdm9pZCB7XG4gICAgICAgIHRoaXMudGltZXBpY2tlckJhc2VSZWYudGltZVNldC5uZXh0KHRoaXMudGltZXBpY2tlclNlcnZpY2UuZ2V0RnVsbFRpbWUodGhpcy5mb3JtYXQpKTtcbiAgICAgICAgdGhpcy5jbG9zZSgpO1xuICAgIH1cblxuICAgIGNsb3NlKCk6IHZvaWQge1xuICAgICAgICBpZiAodGhpcy5kaXNhYmxlQW5pbWF0aW9uKSB7XG4gICAgICAgICAgICB0aGlzLnRpbWVwaWNrZXJCYXNlUmVmLmNsb3NlKCk7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cblxuICAgICAgICB0aGlzLmFuaW1hdGlvblN0YXRlID0gQW5pbWF0aW9uU3RhdGUuTEVBVkU7XG4gICAgfVxuXG4gICAgYW5pbWF0aW9uRG9uZShldmVudDogQW5pbWF0aW9uRXZlbnQpOiB2b2lkIHtcbiAgICAgICAgaWYgKGV2ZW50LnBoYXNlTmFtZSA9PT0gJ2RvbmUnICYmIGV2ZW50LnRvU3RhdGUgPT09IEFuaW1hdGlvblN0YXRlLkxFQVZFKSB7XG4gICAgICAgICAgICB0aGlzLnRpbWVwaWNrZXJCYXNlUmVmLmNsb3NlKCk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBuZ09uRGVzdHJveSgpOiB2b2lkIHtcbiAgICAgICAgdGhpcy51bnN1YnNjcmliZS5uZXh0KCk7XG4gICAgICAgIHRoaXMudW5zdWJzY3JpYmUuY29tcGxldGUoKTtcbiAgICB9XG5cbiAgICBwcml2YXRlIHNldERlZmF1bHRUaW1lKHRpbWU6IHN0cmluZyk6IHZvaWQge1xuICAgICAgICB0aGlzLnRpbWVwaWNrZXJTZXJ2aWNlLnNldERlZmF1bHRUaW1lSWZBdmFpbGFibGUoXG4gICAgICAgICAgICB0aW1lLCB0aGlzLm1pblRpbWUsIHRoaXMubWF4VGltZSwgdGhpcy5mb3JtYXQsIHRoaXMubWludXRlc0dhcCk7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBkZWZpbmVUaW1lKCk6IHZvaWQge1xuICAgICAgICBjb25zdCBtaW5UaW1lID0gdGhpcy5taW5UaW1lO1xuXG4gICAgICAgIGlmIChtaW5UaW1lICYmICghdGhpcy50aW1lICYmICF0aGlzLmRlZmF1bHRUaW1lKSkge1xuICAgICAgICAgICAgY29uc3QgdGltZSA9IFRpbWVBZGFwdGVyLmZyb21EYXRlVGltZVRvU3RyaW5nKG1pblRpbWUsIHRoaXMuZm9ybWF0KTtcblxuICAgICAgICAgICAgdGhpcy5zZXREZWZhdWx0VGltZSh0aW1lKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHByaXZhdGUgb25UaW1lQ2hhbmdlKCk6IHZvaWQge1xuICAgICAgICBjb25zdCB0aW1lID0gVGltZUFkYXB0ZXIudG9Mb2NhbGVUaW1lU3RyaW5nKHRoaXMudGltZXBpY2tlclNlcnZpY2UuZ2V0RnVsbFRpbWUodGhpcy5mb3JtYXQpLCB7XG4gICAgICAgICAgICBsb2NhbGU6IHRoaXMubG9jYWxlLFxuICAgICAgICAgICAgZm9ybWF0OiB0aGlzLmZvcm1hdFxuICAgICAgICB9KTtcblxuICAgICAgICB0aGlzLnRpbWVwaWNrZXJCYXNlUmVmLnRpbWVDaGFuZ2VkLmVtaXQodGltZSk7XG4gICAgfVxuXG59XG4iXX0=