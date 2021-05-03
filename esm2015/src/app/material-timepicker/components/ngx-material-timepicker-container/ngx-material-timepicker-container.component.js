import * as tslib_1 from "tslib";
import { Component, HostBinding, HostListener, Inject, Input, } from "@angular/core";
import { TimeUnit } from "../../models/time-unit.enum";
import { animate, style, transition, trigger, } from "@angular/animations";
import { NgxMaterialTimepickerService } from "../../services/ngx-material-timepicker.service";
import { Subject } from "rxjs";
import { shareReplay, takeUntil } from "rxjs/operators";
import { TimeAdapter } from "../../services/time-adapter";
import { NgxMaterialTimepickerEventService } from "../../services/ngx-material-timepicker-event.service";
import { TIME_LOCALE } from "../../tokens/time-locale.token";
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
    get class() {
        return this.hostClass;
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
        this.selectedHour = this.timepickerService.selectedHour.pipe(shareReplay({ bufferSize: 1, refCount: true }));
        this.selectedMinute = this.timepickerService.selectedMinute.pipe(shareReplay({ bufferSize: 1, refCount: true }));
        this.selectedPeriod = this.timepickerService.selectedPeriod.pipe(shareReplay({ bufferSize: 1, refCount: true }));
        this.timepickerBaseRef.timeUpdated
            .pipe(takeUntil(this.unsubscribe))
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
        if (event.phaseName === "done" &&
            event.toState === AnimationState.LEAVE) {
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
        if (minTime && !this.time && !this.defaultTime) {
            const time = TimeAdapter.fromDateTimeToString(minTime, this.format);
            this.setDefaultTime(time);
        }
    }
    onTimeChange() {
        const time = TimeAdapter.toLocaleTimeString(this.timepickerService.getFullTime(this.format), {
            locale: this.locale,
            format: this.format,
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
    HostBinding("class")
], NgxMaterialTimepickerContainerComponent.prototype, "class", null);
tslib_1.__decorate([
    Input()
], NgxMaterialTimepickerContainerComponent.prototype, "defaultTime", null);
tslib_1.__decorate([
    HostListener("keydown", ["$event"])
], NgxMaterialTimepickerContainerComponent.prototype, "onKeydown", null);
NgxMaterialTimepickerContainerComponent = tslib_1.__decorate([
    Component({
        selector: "ngx-material-timepicker-container",
        template: "<div class=\"timepicker-backdrop-overlay\" [overlay]=\"preventOverlayClick\"\n     [ngClass]=\"{'timepicker-backdrop-overlay--transparent': appendToInput}\"></div>\n<div class=\"timepicker-overlay\">\n    <ngx-material-timepicker-content [appendToInput]=\"appendToInput\"\n                                     [inputElement]=\"inputElement\"\n                                     [ngxMaterialTimepickerTheme]=\"theme\">\n        <div class=\"timepicker\"\n             [@timepicker]=\"animationState\"\n             (@timepicker.done)=\"animationDone($event)\"\n             [ngClass]=\"timepickerClass\">\n            <header class=\"timepicker__header\">\n                <ngx-material-timepicker-dial [format]=\"format\" [hour]=\"(selectedHour | async)?.time\"\n                                              [minute]=\"(selectedMinute | async)?.time\"\n                                              [period]=\"selectedPeriod | async\"\n                                              [activeTimeUnit]=\"activeTimeUnit\"\n                                              [minTime]=\"minTime\"\n                                              [maxTime]=\"maxTime\"\n                                              [isEditable]=\"enableKeyboardInput\"\n                                              [editableHintTmpl]=\"editableHintTmpl\"\n                                              [minutesGap]=\"minutesGap\"\n                                              [hoursOnly]=\"hoursOnly\"\n                                              (periodChanged)=\"changePeriod($event)\"\n                                              (timeUnitChanged)=\"changeTimeUnit($event)\"\n                                              (hourChanged)=\"onHourChange($event)\"\n                                              (minuteChanged)=\"onMinuteChange($event)\"\n                ></ngx-material-timepicker-dial>\n            </header>\n            <div class=\"timepicker__main-content\">\n                <div class=\"timepicker__body\" [ngSwitch]=\"activeTimeUnit\">\n                    <div *ngSwitchCase=\"timeUnit.HOUR\">\n                        <ngx-material-timepicker-24-hours-face *ngIf=\"format === 24;else ampmHours\"\n                                                               (hourChange)=\"onHourChange($event)\"\n                                                               [selectedHour]=\"selectedHour | async\"\n                                                               [minTime]=\"minTime\"\n                                                               [maxTime]=\"maxTime\"\n                                                               [format]=\"format\"\n                                                               (hourSelected)=\"onHourSelected($event)\"></ngx-material-timepicker-24-hours-face>\n                        <ng-template #ampmHours>\n                            <ngx-material-timepicker-12-hours-face\n                                (hourChange)=\"onHourChange($event)\"\n                                [selectedHour]=\"selectedHour | async\"\n                                [period]=\"selectedPeriod | async\"\n                                [minTime]=\"minTime\"\n                                [maxTime]=\"maxTime\"\n                                (hourSelected)=\"onHourSelected($event)\"></ngx-material-timepicker-12-hours-face>\n                        </ng-template>\n                    </div>\n                    <ngx-material-timepicker-minutes-face *ngSwitchCase=\"timeUnit.MINUTE\"\n                                                          [selectedMinute]=\"selectedMinute | async\"\n                                                          [selectedHour]=\"(selectedHour | async)?.time\"\n                                                          [minTime]=\"minTime\"\n                                                          [maxTime]=\"maxTime\"\n                                                          [format]=\"format\"\n                                                          [period]=\"selectedPeriod | async\"\n                                                          [minutesGap]=\"minutesGap\"\n                                                          (minuteChange)=\"onMinuteChange($event)\"></ngx-material-timepicker-minutes-face>\n                </div>\n                <div class=\"timepicker__actions\">\n                    <div (click)=\"close()\">\n                        <!--suppress HtmlUnknownAttribute -->\n                        <ng-container\n                            *ngTemplateOutlet=\"cancelBtnTmpl ? cancelBtnTmpl : cancelBtnDefault\"></ng-container>\n                    </div>\n                    <div (click)=\"setTime()\">\n                        <!--suppress HtmlUnknownAttribute -->\n                        <ng-container\n                            *ngTemplateOutlet=\"confirmBtnTmpl ? confirmBtnTmpl : confirmBtnDefault\"></ng-container>\n                    </div>\n                </div>\n            </div>\n        </div>\n    </ngx-material-timepicker-content>\n</div>\n<ng-template #cancelBtnDefault>\n    <ngx-material-timepicker-button>Cancel</ngx-material-timepicker-button>\n</ng-template>\n<ng-template #confirmBtnDefault>\n    <ngx-material-timepicker-button>Ok</ngx-material-timepicker-button>\n</ng-template>\n",
        animations: [
            trigger("timepicker", [
                transition(`* => ${AnimationState.ENTER}`, [
                    style({ transform: "translateY(-30%)" }),
                    animate("0.2s ease-out", style({ transform: "translateY(0)" })),
                ]),
                transition(`${AnimationState.ENTER} => ${AnimationState.LEAVE}`, [
                    style({ transform: "translateY(0)", opacity: 1 }),
                    animate("0.2s ease-out", style({ transform: "translateY(-30%)", opacity: 0 })),
                ]),
            ]),
        ],
        providers: [NgxMaterialTimepickerService],
        styles: [".timepicker-backdrop-overlay{position:fixed;top:0;bottom:0;right:0;left:0;background-color:rgba(0,0,0,.3);z-index:999;pointer-events:auto}.timepicker-backdrop-overlay--transparent{background-color:transparent}.timepicker-overlay{position:fixed;top:0;left:0;width:100%;height:100%;display:flex;justify-content:center;align-items:center;z-index:999;pointer-events:none}.timepicker{width:300px;border-radius:2px;box-shadow:rgba(0,0,0,.25) 0 14px 45px,rgba(0,0,0,.22) 0 10px 18px;outline:0;position:static;z-index:999;pointer-events:auto}.timepicker__header{padding:15px 30px;background-color:#00bfff}@supports (background-color:var(--dial-background-color)){.timepicker__header{background-color:var(--dial-background-color)}}.timepicker__body{padding:15px 5px;display:flex;justify-content:center;align-items:center;background-color:#fff}@supports (background-color:var(--body-background-color)){.timepicker__body{background-color:var(--body-background-color)}}.timepicker__actions{display:flex;justify-content:flex-end;padding:15px;background-color:#fff}@supports (background-color:var(--body-background-color)){.timepicker__actions{background-color:var(--body-background-color)}}@media (max-device-width:1023px) and (orientation:landscape){.timepicker{display:flex;width:515px}.timepicker__header{display:flex;align-items:center}.timepicker__main-content{display:flex;flex-direction:column;width:100%}.timepicker__actions{padding:5px;margin-top:-1px}}"]
    }),
    tslib_1.__param(2, Inject(TIME_LOCALE))
], NgxMaterialTimepickerContainerComponent);
export { NgxMaterialTimepickerContainerComponent };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibmd4LW1hdGVyaWFsLXRpbWVwaWNrZXItY29udGFpbmVyLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiJuZzovL25neC1tYXRlcmlhbC10aW1lcGlja2VyLyIsInNvdXJjZXMiOlsic3JjL2FwcC9tYXRlcmlhbC10aW1lcGlja2VyL2NvbXBvbmVudHMvbmd4LW1hdGVyaWFsLXRpbWVwaWNrZXItY29udGFpbmVyL25neC1tYXRlcmlhbC10aW1lcGlja2VyLWNvbnRhaW5lci5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLE9BQU8sRUFDSCxTQUFTLEVBQ1QsV0FBVyxFQUNYLFlBQVksRUFDWixNQUFNLEVBQ04sS0FBSyxHQUlSLE1BQU0sZUFBZSxDQUFDO0FBR3ZCLE9BQU8sRUFBRSxRQUFRLEVBQUUsTUFBTSw2QkFBNkIsQ0FBQztBQUV2RCxPQUFPLEVBQ0gsT0FBTyxFQUVQLEtBQUssRUFDTCxVQUFVLEVBQ1YsT0FBTyxHQUNWLE1BQU0scUJBQXFCLENBQUM7QUFDN0IsT0FBTyxFQUFFLDRCQUE0QixFQUFFLE1BQU0sZ0RBQWdELENBQUM7QUFDOUYsT0FBTyxFQUFjLE9BQU8sRUFBRSxNQUFNLE1BQU0sQ0FBQztBQUMzQyxPQUFPLEVBQUUsV0FBVyxFQUFFLFNBQVMsRUFBRSxNQUFNLGdCQUFnQixDQUFDO0FBQ3hELE9BQU8sRUFBRSxXQUFXLEVBQUUsTUFBTSw2QkFBNkIsQ0FBQztBQUcxRCxPQUFPLEVBQUUsaUNBQWlDLEVBQUUsTUFBTSxzREFBc0QsQ0FBQztBQUV6RyxPQUFPLEVBQUUsV0FBVyxFQUFFLE1BQU0sZ0NBQWdDLENBQUM7QUFFN0QsTUFBTSxDQUFOLElBQVksY0FHWDtBQUhELFdBQVksY0FBYztJQUN0QixpQ0FBZSxDQUFBO0lBQ2YsaUNBQWUsQ0FBQTtBQUNuQixDQUFDLEVBSFcsY0FBYyxLQUFkLGNBQWMsUUFHekI7QUF1QkQsSUFBYSx1Q0FBdUMsR0FBcEQsTUFBYSx1Q0FBdUM7SUFxRGhELFlBQ1ksaUJB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LGNBQWMsQ0FBQyxLQUFLLE9BQU8sY0FBYyxDQUFDLEtBQUssRUFBRSxFQUFFO29CQUM3RCxLQUFLLENBQUMsRUFBRSxTQUFTLEVBQUUsZUFBZSxFQUFFLE9BQU8sRUFBRSxDQUFDLEVBQUUsQ0FBQztvQkFDakQsT0FBTyxDQUNILGVBQWUsRUFDZixLQUFLLENBQUMsRUFBRSxTQUFTLEVBQUUsa0JBQWtCLEVBQUUsT0FBTyxFQUFFLENBQUMsRUFBRSxDQUFDLENBQ3ZEO2lCQUNKLENBQUM7YUFDTCxDQUFDO1NBQ0w7UUFDRCxTQUFTLEVBQUUsQ0FBQyw0QkFBNEIsQ0FBQzs7S0FDNUMsQ0FBQztJQXlETyxtQkFBQSxNQUFNLENBQUMsV0FBVyxDQUFDLENBQUE7R0F4RGYsdUNBQXVDLENBOEtuRDtTQTlLWSx1Q0FBdUMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge1xuICAgIENvbXBvbmVudCxcbiAgICBIb3N0QmluZGluZyxcbiAgICBIb3N0TGlzdGVuZXIsXG4gICAgSW5qZWN0LFxuICAgIElucHV0LFxuICAgIE9uRGVzdHJveSxcbiAgICBPbkluaXQsXG4gICAgVGVtcGxhdGVSZWYsXG59IGZyb20gXCJAYW5ndWxhci9jb3JlXCI7XG5pbXBvcnQgeyBDbG9ja0ZhY2VUaW1lIH0gZnJvbSBcIi4uLy4uL21vZGVscy9jbG9jay1mYWNlLXRpbWUuaW50ZXJmYWNlXCI7XG5pbXBvcnQgeyBUaW1lUGVyaW9kIH0gZnJvbSBcIi4uLy4uL21vZGVscy90aW1lLXBlcmlvZC5lbnVtXCI7XG5pbXBvcnQgeyBUaW1lVW5pdCB9IGZyb20gXCIuLi8uLi9tb2RlbHMvdGltZS11bml0LmVudW1cIjtcbmltcG9ydCB7IERhdGVUaW1lIH0gZnJvbSBcImx1eG9uXCI7XG5pbXBvcnQge1xuICAgIGFuaW1hdGUsXG4gICAgQW5pbWF0aW9uRXZlbnQsXG4gICAgc3R5bGUsXG4gICAgdHJhbnNpdGlvbixcbiAgICB0cmlnZ2VyLFxufSBmcm9tIFwiQGFuZ3VsYXIvYW5pbWF0aW9uc1wiO1xuaW1wb3J0IHsgTmd4TWF0ZXJpYWxUaW1lcGlja2VyU2VydmljZSB9IGZyb20gXCIuLi8uLi9zZXJ2aWNlcy9uZ3gtbWF0ZXJpYWwtdGltZXBpY2tlci5zZXJ2aWNlXCI7XG5pbXBvcnQgeyBPYnNlcnZhYmxlLCBTdWJqZWN0IH0gZnJvbSBcInJ4anNcIjtcbmltcG9ydCB7IHNoYXJlUmVwbGF5LCB0YWtlVW50aWwgfSBmcm9tIFwicnhqcy9vcGVyYXRvcnNcIjtcbmltcG9ydCB7IFRpbWVBZGFwdGVyIH0gZnJvbSBcIi4uLy4uL3NlcnZpY2VzL3RpbWUtYWRhcHRlclwiO1xuaW1wb3J0IHsgVGltZXBpY2tlclJlZiB9IGZyb20gXCIuLi8uLi9tb2RlbHMvdGltZXBpY2tlci1yZWYuaW50ZXJmYWNlXCI7XG5pbXBvcnQgeyBUaW1lcGlja2VyQ29uZmlnIH0gZnJvbSBcIi4uLy4uL21vZGVscy90aW1lcGlja2VyLWNvbmZpZy5pbnRlcmZhY2VcIjtcbmltcG9ydCB7IE5neE1hdGVyaWFsVGltZXBpY2tlckV2ZW50U2VydmljZSB9IGZyb20gXCIuLi8uLi9zZXJ2aWNlcy9uZ3gtbWF0ZXJpYWwtdGltZXBpY2tlci1ldmVudC5zZXJ2aWNlXCI7XG5pbXBvcnQgeyBOZ3hNYXRlcmlhbFRpbWVwaWNrZXJUaGVtZSB9IGZyb20gXCIuLi8uLi9tb2RlbHMvbmd4LW1hdGVyaWFsLXRpbWVwaWNrZXItdGhlbWUuaW50ZXJmYWNlXCI7XG5pbXBvcnQgeyBUSU1FX0xPQ0FMRSB9IGZyb20gXCIuLi8uLi90b2tlbnMvdGltZS1sb2NhbGUudG9rZW5cIjtcblxuZXhwb3J0IGVudW0gQW5pbWF0aW9uU3RhdGUge1xuICAgIEVOVEVSID0gXCJlbnRlclwiLFxuICAgIExFQVZFID0gXCJsZWF2ZVwiLFxufVxuXG5AQ29tcG9uZW50KHtcbiAgICBzZWxlY3RvcjogXCJuZ3gtbWF0ZXJpYWwtdGltZXBpY2tlci1jb250YWluZXJcIixcbiAgICB0ZW1wbGF0ZVVybDogXCIuL25neC1tYXRlcmlhbC10aW1lcGlja2VyLWNvbnRhaW5lci5jb21wb25lbnQuaHRtbFwiLFxuICAgIHN0eWxlVXJsczogW1wiLi9uZ3gtbWF0ZXJpYWwtdGltZXBpY2tlci1jb250YWluZXIuY29tcG9uZW50LnNjc3NcIl0sXG4gICAgYW5pbWF0aW9uczogW1xuICAgICAgICB0cmlnZ2VyKFwidGltZXBpY2tlclwiLCBbXG4gICAgICAgICAgICB0cmFuc2l0aW9uKGAqID0+ICR7QW5pbWF0aW9uU3RhdGUuRU5URVJ9YCwgW1xuICAgICAgICAgICAgICAgIHN0eWxlKHsgdHJhbnNmb3JtOiBcInRyYW5zbGF0ZVkoLTMwJSlcIiB9KSxcbiAgICAgICAgICAgICAgICBhbmltYXRlKFwiMC4ycyBlYXNlLW91dFwiLCBzdHlsZSh7IHRyYW5zZm9ybTogXCJ0cmFuc2xhdGVZKDApXCIgfSkpLFxuICAgICAgICAgICAgXSksXG4gICAgICAgICAgICB0cmFuc2l0aW9uKGAke0FuaW1hdGlvblN0YXRlLkVOVEVSfSA9PiAke0FuaW1hdGlvblN0YXRlLkxFQVZFfWAsIFtcbiAgICAgICAgICAgICAgICBzdHlsZSh7IHRyYW5zZm9ybTogXCJ0cmFuc2xhdGVZKDApXCIsIG9wYWNpdHk6IDEgfSksXG4gICAgICAgICAgICAgICAgYW5pbWF0ZShcbiAgICAgICAgICAgICAgICAgICAgXCIwLjJzIGVhc2Utb3V0XCIsXG4gICAgICAgICAgICAgICAgICAgIHN0eWxlKHsgdHJhbnNmb3JtOiBcInRyYW5zbGF0ZVkoLTMwJSlcIiwgb3BhY2l0eTogMCB9KVxuICAgICAgICAgICAgICAgICksXG4gICAgICAgICAgICBdKSxcbiAgICAgICAgXSksXG4gICAgXSxcbiAgICBwcm92aWRlcnM6IFtOZ3hNYXRlcmlhbFRpbWVwaWNrZXJTZXJ2aWNlXSxcbn0pXG5leHBvcnQgY2xhc3MgTmd4TWF0ZXJpYWxUaW1lcGlja2VyQ29udGFpbmVyQ29tcG9uZW50XG4gICAgaW1wbGVtZW50cyBPbkluaXQsIE9uRGVzdHJveSwgVGltZXBpY2tlckNvbmZpZyB7XG4gICAgc2VsZWN0ZWRIb3VyOiBPYnNlcnZhYmxlPENsb2NrRmFjZVRpbWU+O1xuICAgIHNlbGVjdGVkTWludXRlOiBPYnNlcnZhYmxlPENsb2NrRmFjZVRpbWU+O1xuICAgIHNlbGVjdGVkUGVyaW9kOiBPYnNlcnZhYmxlPFRpbWVQZXJpb2Q+O1xuXG4gICAgdGltZVVuaXQgPSBUaW1lVW5pdDtcbiAgICBhY3RpdmVUaW1lVW5pdCA9IFRpbWVVbml0LkhPVVI7XG5cbiAgICBhbmltYXRpb25TdGF0ZTogQW5pbWF0aW9uU3RhdGU7XG5cbiAgICBjYW5jZWxCdG5UbXBsOiBUZW1wbGF0ZVJlZjxOb2RlPjtcbiAgICBlZGl0YWJsZUhpbnRUbXBsOiBUZW1wbGF0ZVJlZjxOb2RlPjtcbiAgICBjb25maXJtQnRuVG1wbDogVGVtcGxhdGVSZWY8Tm9kZT47XG4gICAgaW5wdXRFbGVtZW50OiBhbnk7XG5cbiAgICBlbmFibGVLZXlib2FyZElucHV0OiBib29sZWFuO1xuICAgIHByZXZlbnRPdmVybGF5Q2xpY2s6IGJvb2xlYW47XG4gICAgZGlzYWJsZUFuaW1hdGlvbjogYm9vbGVhbjtcbiAgICBkaXNhYmxlZDogYm9vbGVhbjtcbiAgICBhcHBlbmRUb0lucHV0OiBib29sZWFuO1xuICAgIGhvdXJzT25seTogYm9vbGVhbjtcblxuICAgIGZvcm1hdDogbnVtYmVyO1xuICAgIG1pbnV0ZXNHYXA6IG51bWJlcjtcblxuICAgIG1pblRpbWU6IERhdGVUaW1lO1xuICAgIG1heFRpbWU6IERhdGVUaW1lO1xuICAgIHRpbWU6IHN0cmluZztcblxuICAgIHRpbWVwaWNrZXJDbGFzczogc3RyaW5nO1xuICAgIGhvc3RDbGFzczogc3RyaW5nO1xuICAgIEBIb3N0QmluZGluZyhcImNsYXNzXCIpXG4gICAgZ2V0IGNsYXNzKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5ob3N0Q2xhc3M7XG4gICAgfVxuICAgIHRoZW1lOiBOZ3hNYXRlcmlhbFRpbWVwaWNrZXJUaGVtZTtcbiAgICB0aW1lcGlja2VyQmFzZVJlZjogVGltZXBpY2tlclJlZjtcblxuICAgIEBJbnB1dCgpXG4gICAgc2V0IGRlZmF1bHRUaW1lKHRpbWU6IHN0cmluZykge1xuICAgICAgICB0aGlzLl9kZWZhdWx0VGltZSA9IHRpbWU7XG4gICAgICAgIHRoaXMuc2V0RGVmYXVsdFRpbWUodGltZSk7XG4gICAgfVxuXG4gICAgZ2V0IGRlZmF1bHRUaW1lKCk6IHN0cmluZyB7XG4gICAgICAgIHJldHVybiB0aGlzLl9kZWZhdWx0VGltZTtcbiAgICB9XG5cbiAgICBwcml2YXRlIF9kZWZhdWx0VGltZTogc3RyaW5nO1xuXG4gICAgcHJpdmF0ZSB1bnN1YnNjcmliZSA9IG5ldyBTdWJqZWN0KCk7XG5cbiAgICBjb25zdHJ1Y3RvcihcbiAgICAgICAgcHJpdmF0ZSB0aW1lcGlja2VyU2VydmljZTogTmd4TWF0ZXJpYWxUaW1lcGlja2VyU2VydmljZSxcbiAgICAgICAgcHJpdmF0ZSBldmVudFNlcnZpY2U6IE5neE1hdGVyaWFsVGltZXBpY2tlckV2ZW50U2VydmljZSxcbiAgICAgICAgQEluamVjdChUSU1FX0xPQ0FMRSkgcHJpdmF0ZSBsb2NhbGU6IHN0cmluZ1xuICAgICkge31cblxuICAgIEBIb3N0TGlzdGVuZXIoXCJrZXlkb3duXCIsIFtcIiRldmVudFwiXSlcbiAgICBvbktleWRvd24oZTogYW55KTogdm9pZCB7XG4gICAgICAgIHRoaXMuZXZlbnRTZXJ2aWNlLmRpc3BhdGNoRXZlbnQoZSk7XG4gICAgICAgIGUuc3RvcFByb3BhZ2F0aW9uKCk7XG4gICAgfVxuXG4gICAgbmdPbkluaXQoKTogdm9pZCB7XG4gICAgICAgIHRoaXMuYW5pbWF0aW9uU3RhdGUgPSAhdGhpcy5kaXNhYmxlQW5pbWF0aW9uICYmIEFuaW1hdGlvblN0YXRlLkVOVEVSO1xuXG4gICAgICAgIHRoaXMuZGVmaW5lVGltZSgpO1xuXG4gICAgICAgIHRoaXMuc2VsZWN0ZWRIb3VyID0gdGhpcy50aW1lcGlja2VyU2VydmljZS5zZWxlY3RlZEhvdXIucGlwZShcbiAgICAgICAgICAgIHNoYXJlUmVwbGF5KHsgYnVmZmVyU2l6ZTogMSwgcmVmQ291bnQ6IHRydWUgfSlcbiAgICAgICAgKTtcblxuICAgICAgICB0aGlzLnNlbGVjdGVkTWludXRlID0gdGhpcy50aW1lcGlja2VyU2VydmljZS5zZWxlY3RlZE1pbnV0ZS5waXBlKFxuICAgICAgICAgICAgc2hhcmVSZXBsYXkoeyBidWZmZXJTaXplOiAxLCByZWZDb3VudDogdHJ1ZSB9KVxuICAgICAgICApO1xuXG4gICAgICAgIHRoaXMuc2VsZWN0ZWRQZXJpb2QgPSB0aGlzLnRpbWVwaWNrZXJTZXJ2aWNlLnNlbGVjdGVkUGVyaW9kLnBpcGUoXG4gICAgICAgICAgICBzaGFyZVJlcGxheSh7IGJ1ZmZlclNpemU6IDEsIHJlZkNvdW50OiB0cnVlIH0pXG4gICAgICAgICk7XG5cbiAgICAgICAgdGhpcy50aW1lcGlja2VyQmFzZVJlZi50aW1lVXBkYXRlZFxuICAgICAgICAgICAgLnBpcGUodGFrZVVudGlsKHRoaXMudW5zdWJzY3JpYmUpKVxuICAgICAgICAgICAgLnN1YnNjcmliZSh0aGlzLnNldERlZmF1bHRUaW1lLmJpbmQodGhpcykpO1xuICAgIH1cblxuICAgIG9uSG91ckNoYW5nZShob3VyOiBDbG9ja0ZhY2VUaW1lKTogdm9pZCB7XG4gICAgICAgIHRoaXMudGltZXBpY2tlclNlcnZpY2UuaG91ciA9IGhvdXI7XG4gICAgICAgIHRoaXMub25UaW1lQ2hhbmdlKCk7XG4gICAgfVxuXG4gICAgb25Ib3VyU2VsZWN0ZWQoaG91cjogbnVtYmVyKTogdm9pZCB7XG4gICAgICAgIGlmICghdGhpcy5ob3Vyc09ubHkpIHtcbiAgICAgICAgICAgIHRoaXMuY2hhbmdlVGltZVVuaXQoVGltZVVuaXQuTUlOVVRFKTtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLnRpbWVwaWNrZXJCYXNlUmVmLmhvdXJTZWxlY3RlZC5uZXh0KGhvdXIpO1xuICAgIH1cblxuICAgIG9uTWludXRlQ2hhbmdlKG1pbnV0ZTogQ2xvY2tGYWNlVGltZSk6IHZvaWQge1xuICAgICAgICB0aGlzLnRpbWVwaWNrZXJTZXJ2aWNlLm1pbnV0ZSA9IG1pbnV0ZTtcbiAgICAgICAgdGhpcy5vblRpbWVDaGFuZ2UoKTtcbiAgICB9XG5cbiAgICBjaGFuZ2VQZXJpb2QocGVyaW9kOiBUaW1lUGVyaW9kKTogdm9pZCB7XG4gICAgICAgIHRoaXMudGltZXBpY2tlclNlcnZpY2UucGVyaW9kID0gcGVyaW9kO1xuICAgICAgICB0aGlzLm9uVGltZUNoYW5nZSgpO1xuICAgIH1cblxuICAgIGNoYW5nZVRpbWVVbml0KHVuaXQ6IFRpbWVVbml0KTogdm9pZCB7XG4gICAgICAgIHRoaXMuYWN0aXZlVGltZVVuaXQgPSB1bml0O1xuICAgIH1cblxuICAgIHNldFRpbWUoKTogdm9pZCB7XG4gICAgICAgIHRoaXMudGltZXBpY2tlckJhc2VSZWYudGltZVNldC5uZXh0KFxuICAgICAgICAgICAgdGhpcy50aW1lcGlja2VyU2VydmljZS5nZXRGdWxsVGltZSh0aGlzLmZvcm1hdClcbiAgICAgICAgKTtcbiAgICAgICAgdGhpcy5jbG9zZSgpO1xuICAgIH1cblxuICAgIGNsb3NlKCk6IHZvaWQge1xuICAgICAgICBpZiAodGhpcy5kaXNhYmxlQW5pbWF0aW9uKSB7XG4gICAgICAgICAgICB0aGlzLnRpbWVwaWNrZXJCYXNlUmVmLmNsb3NlKCk7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cblxuICAgICAgICB0aGlzLmFuaW1hdGlvblN0YXRlID0gQW5pbWF0aW9uU3RhdGUuTEVBVkU7XG4gICAgfVxuXG4gICAgYW5pbWF0aW9uRG9uZShldmVudDogQW5pbWF0aW9uRXZlbnQpOiB2b2lkIHtcbiAgICAgICAgaWYgKFxuICAgICAgICAgICAgZXZlbnQucGhhc2VOYW1lID09PSBcImRvbmVcIiAmJlxuICAgICAgICAgICAgZXZlbnQudG9TdGF0ZSA9PT0gQW5pbWF0aW9uU3RhdGUuTEVBVkVcbiAgICAgICAgKSB7XG4gICAgICAgICAgICB0aGlzLnRpbWVwaWNrZXJCYXNlUmVmLmNsb3NlKCk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBuZ09uRGVzdHJveSgpOiB2b2lkIHtcbiAgICAgICAgdGhpcy51bnN1YnNjcmliZS5uZXh0KCk7XG4gICAgICAgIHRoaXMudW5zdWJzY3JpYmUuY29tcGxldGUoKTtcbiAgICB9XG5cbiAgICBwcml2YXRlIHNldERlZmF1bHRUaW1lKHRpbWU6IHN0cmluZyk6IHZvaWQge1xuICAgICAgICB0aGlzLnRpbWVwaWNrZXJTZXJ2aWNlLnNldERlZmF1bHRUaW1lSWZBdmFpbGFibGUoXG4gICAgICAgICAgICB0aW1lLFxuICAgICAgICAgICAgdGhpcy5taW5UaW1lLFxuICAgICAgICAgICAgdGhpcy5tYXhUaW1lLFxuICAgICAgICAgICAgdGhpcy5mb3JtYXQsXG4gICAgICAgICAgICB0aGlzLm1pbnV0ZXNHYXBcbiAgICAgICAgKTtcbiAgICB9XG5cbiAgICBwcml2YXRlIGRlZmluZVRpbWUoKTogdm9pZCB7XG4gICAgICAgIGNvbnN0IG1pblRpbWUgPSB0aGlzLm1pblRpbWU7XG5cbiAgICAgICAgaWYgKG1pblRpbWUgJiYgIXRoaXMudGltZSAmJiAhdGhpcy5kZWZhdWx0VGltZSkge1xuICAgICAgICAgICAgY29uc3QgdGltZSA9IFRpbWVBZGFwdGVyLmZyb21EYXRlVGltZVRvU3RyaW5nKG1pblRpbWUsIHRoaXMuZm9ybWF0KTtcblxuICAgICAgICAgICAgdGhpcy5zZXREZWZhdWx0VGltZSh0aW1lKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHByaXZhdGUgb25UaW1lQ2hhbmdlKCk6IHZvaWQge1xuICAgICAgICBjb25zdCB0aW1lID0gVGltZUFkYXB0ZXIudG9Mb2NhbGVUaW1lU3RyaW5nKFxuICAgICAgICAgICAgdGhpcy50aW1lcGlja2VyU2VydmljZS5nZXRGdWxsVGltZSh0aGlzLmZvcm1hdCksXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgbG9jYWxlOiB0aGlzLmxvY2FsZSxcbiAgICAgICAgICAgICAgICBmb3JtYXQ6IHRoaXMuZm9ybWF0LFxuICAgICAgICAgICAgfVxuICAgICAgICApO1xuXG4gICAgICAgIHRoaXMudGltZXBpY2tlckJhc2VSZWYudGltZUNoYW5nZWQuZW1pdCh0aW1lKTtcbiAgICB9XG59XG4iXX0=