import * as tslib_1 from "tslib";
import { ChangeDetectionStrategy, Component, EventEmitter, HostListener, Input, Output, ViewChild } from '@angular/core';
import { TimeUnit } from '../../models/time-unit.enum';
const CLOCK_HAND_STYLES = {
    small: {
        height: '75px',
        top: 'calc(50% - 75px)'
    },
    large: {
        height: '103px',
        top: 'calc(50% - 103px)'
    }
};
let NgxMaterialTimepickerFaceComponent = class NgxMaterialTimepickerFaceComponent {
    constructor() {
        this.timeUnit = TimeUnit;
        this.innerClockFaceSize = 85;
        this.timeChange = new EventEmitter();
        this.timeSelected = new EventEmitter();
    }
    ngAfterViewInit() {
        this.setClockHandPosition();
        this.addTouchEvents();
    }
    ngOnChanges(changes) {
        const faceTimeChanges = changes['faceTime'];
        const selectedTimeChanges = changes['selectedTime'];
        if ((faceTimeChanges && faceTimeChanges.currentValue)
            && (selectedTimeChanges && selectedTimeChanges.currentValue)) {
            /* Set time according to passed an input value */
            this.selectedTime = this.faceTime.find(time => time.time === this.selectedTime.time);
        }
        if (selectedTimeChanges && selectedTimeChanges.currentValue) {
            this.setClockHandPosition();
        }
        if (faceTimeChanges && faceTimeChanges.currentValue) {
            // To avoid an error ExpressionChangedAfterItHasBeenCheckedError
            setTimeout(() => this.selectAvailableTime());
        }
    }
    trackByTime(_, time) {
        return time.time;
    }
    onMousedown(e) {
        e.preventDefault();
        this.isStarted = true;
    }
    selectTime(e) {
        if (!this.isStarted && (e instanceof MouseEvent && e.type !== 'click')) {
            return;
        }
        const clockFaceCords = this.clockFace.nativeElement.getBoundingClientRect();
        /* Get x0 and y0 of the circle */
        const centerX = clockFaceCords.left + clockFaceCords.width / 2;
        const centerY = clockFaceCords.top + clockFaceCords.height / 2;
        /* Counting the arctangent and convert it to from radian to deg */
        const arctangent = Math.atan(Math.abs(e.clientX - centerX) / Math.abs(e.clientY - centerY)) * 180 / Math.PI;
        /* Get angle according to quadrant */
        const circleAngle = countAngleByCords(centerX, centerY, e.clientX, e.clientY, arctangent);
        /* Check if selected time from the inner clock face (24 hours format only) */
        const isInnerClockChosen = this.format && this.isInnerClockFace(centerX, centerY, e.clientX, e.clientY);
        /* Round angle according to angle step */
        const angleStep = this.unit === TimeUnit.MINUTE ? (6 * (this.minutesGap || 1)) : 30;
        const roundedAngle = roundAngle(circleAngle, angleStep);
        const angle = (roundedAngle || 360) + (isInnerClockChosen ? 360 : 0);
        const selectedTime = this.faceTime.find(val => val.angle === angle);
        if (selectedTime && !selectedTime.disabled) {
            this.timeChange.next(selectedTime);
            /* To let know whether user ended interaction with clock face */
            if (!this.isStarted) {
                this.timeSelected.next(selectedTime.time);
            }
        }
    }
    onMouseup(e) {
        e.preventDefault();
        this.isStarted = false;
    }
    ngOnDestroy() {
        this.removeTouchEvents();
    }
    addTouchEvents() {
        this.touchStartHandler = this.onMousedown.bind(this);
        this.touchEndHandler = this.onMouseup.bind(this);
        this.clockFace.nativeElement.addEventListener('touchstart', this.touchStartHandler);
        this.clockFace.nativeElement.addEventListener('touchend', this.touchEndHandler);
    }
    removeTouchEvents() {
        this.clockFace.nativeElement.removeEventListener('touchstart', this.touchStartHandler);
        this.clockFace.nativeElement.removeEventListener('touchend', this.touchEndHandler);
    }
    setClockHandPosition() {
        if (this.format === 24) {
            if (this.selectedTime.time > 12 || this.selectedTime.time === 0) {
                this.decreaseClockHand();
            }
            else {
                this.increaseClockHand();
            }
        }
        this.clockHand.nativeElement.style.transform = `rotate(${this.selectedTime.angle}deg)`;
    }
    selectAvailableTime() {
        const currentTime = this.faceTime.find(time => this.selectedTime.time === time.time);
        this.isClockFaceDisabled = this.faceTime.every(time => time.disabled);
        if ((currentTime && currentTime.disabled) && !this.isClockFaceDisabled) {
            const availableTime = this.faceTime.find(time => !time.disabled);
            this.timeChange.next(availableTime);
        }
    }
    isInnerClockFace(x0, y0, x, y) {
        /* Detect whether time from the inner clock face or not (24 format only) */
        return Math.sqrt(Math.pow(x - x0, 2) + Math.pow(y - y0, 2)) < this.innerClockFaceSize;
    }
    decreaseClockHand() {
        this.clockHand.nativeElement.style.height = CLOCK_HAND_STYLES.small.height;
        this.clockHand.nativeElement.style.top = CLOCK_HAND_STYLES.small.top;
    }
    increaseClockHand() {
        this.clockHand.nativeElement.style.height = CLOCK_HAND_STYLES.large.height;
        this.clockHand.nativeElement.style.top = CLOCK_HAND_STYLES.large.top;
    }
};
tslib_1.__decorate([
    Input()
], NgxMaterialTimepickerFaceComponent.prototype, "faceTime", void 0);
tslib_1.__decorate([
    Input()
], NgxMaterialTimepickerFaceComponent.prototype, "selectedTime", void 0);
tslib_1.__decorate([
    Input()
], NgxMaterialTimepickerFaceComponent.prototype, "unit", void 0);
tslib_1.__decorate([
    Input()
], NgxMaterialTimepickerFaceComponent.prototype, "format", void 0);
tslib_1.__decorate([
    Input()
], NgxMaterialTimepickerFaceComponent.prototype, "minutesGap", void 0);
tslib_1.__decorate([
    Output()
], NgxMaterialTimepickerFaceComponent.prototype, "timeChange", void 0);
tslib_1.__decorate([
    Output()
], NgxMaterialTimepickerFaceComponent.prototype, "timeSelected", void 0);
tslib_1.__decorate([
    ViewChild('clockFace', { static: true })
], NgxMaterialTimepickerFaceComponent.prototype, "clockFace", void 0);
tslib_1.__decorate([
    ViewChild('clockHand', { static: true })
], NgxMaterialTimepickerFaceComponent.prototype, "clockHand", void 0);
tslib_1.__decorate([
    HostListener('mousedown', ['$event'])
], NgxMaterialTimepickerFaceComponent.prototype, "onMousedown", null);
tslib_1.__decorate([
    HostListener('click', ['$event']),
    HostListener('touchmove', ['$event.changedTouches[0]']),
    HostListener('touchend', ['$event.changedTouches[0]']),
    HostListener('mousemove', ['$event'])
], NgxMaterialTimepickerFaceComponent.prototype, "selectTime", null);
tslib_1.__decorate([
    HostListener('mouseup', ['$event'])
], NgxMaterialTimepickerFaceComponent.prototype, "onMouseup", null);
NgxMaterialTimepickerFaceComponent = tslib_1.__decorate([
    Component({
        selector: 'ngx-material-timepicker-face',
        template: "<div class=\"clock-face\" #clockFace>\n    <div *ngIf=\"unit !== timeUnit.MINUTE;else minutesFace\" class=\"clock-face__container\">\n        <div class=\"clock-face__number clock-face__number--outer\"\n             [ngStyle]=\"{'transform': 'rotateZ('+ time.angle +'deg) translateX(-50%)'}\"\n             *ngFor=\"let time of faceTime | slice: 0 : 12; trackBy: trackByTime\">\n\t\t\t<span [ngStyle]=\"{'transform': 'rotateZ(-'+ time.angle +'deg)'}\"\n                  [ngClass]=\"{'active': time.time | activeHour: selectedTime.time : isClockFaceDisabled,\n                   'disabled': time.disabled}\">\n                {{time.time | timeLocalizer: timeUnit.HOUR}}\n            </span>\n        </div>\n        <div class=\"clock-face__inner\" *ngIf=\"faceTime.length > 12\"\n             [style.top]=\"'calc(50% - ' + innerClockFaceSize + 'px)'\">\n            <div class=\"clock-face__number clock-face__number--inner\"\n                 [ngStyle]=\"{'transform': 'rotateZ('+ time.angle +'deg) translateX(-50%)'}\"\n                 [style.height.px]=\"innerClockFaceSize\"\n                 *ngFor=\"let time of faceTime | slice: 12 : 24; trackBy: trackByTime\">\n\t\t\t<span [ngStyle]=\"{'transform': 'rotateZ(-'+ time.angle +'deg)'}\"\n                  [ngClass]=\"{'active': time.time | activeHour: selectedTime?.time : isClockFaceDisabled,\n                   'disabled': time.disabled}\">\n                {{time.time | timeLocalizer: timeUnit.HOUR}}</span>\n            </div>\n        </div>\n    </div>\n\n    <span class=\"clock-face__clock-hand\" [ngClass]=\"{'clock-face__clock-hand_minute': unit === timeUnit.MINUTE}\"\n          #clockHand [hidden]=\"isClockFaceDisabled\"></span>\n</div>\n<ng-template #minutesFace>\n    <div class=\"clock-face__container\">\n        <div class=\"clock-face__number clock-face__number--outer\"\n             [ngStyle]=\"{'transform': 'rotateZ('+ time.angle +'deg) translateX(-50%)'}\"\n             *ngFor=\"let time of faceTime; trackBy: trackByTime\">\n\t<span [ngStyle]=\"{'transform': 'rotateZ(-'+ time.angle +'deg)'}\"\n          [ngClass]=\"{'active': time.time | activeMinute: selectedTime?.time:minutesGap:isClockFaceDisabled,\n           'disabled': time.disabled}\">\n\t{{time.time | minutesFormatter: minutesGap | timeLocalizer: timeUnit.MINUTE}}</span>\n        </div>\n    </div>\n</ng-template>\n",
        changeDetection: ChangeDetectionStrategy.OnPush,
        styles: [".clock-face{width:290px;height:290px;border-radius:50%;position:relative;display:flex;justify-content:center;padding:20px;box-sizing:border-box;background-color:#f0f0f0}@supports (background-color:var(--clock-face-background-color)){.clock-face{background-color:var(--clock-face-background-color)}}.clock-face__inner{position:absolute}.clock-face__container{margin-left:-2px}.clock-face__number{position:absolute;transform-origin:0 100%;width:50px;text-align:center;z-index:2}.clock-face__number--outer{height:calc(290px / 2 - 20px)}.clock-face__number--outer>span{font-size:16px;color:#6c6c6c}@supports (color:var(--clock-face-time-inactive-color)){.clock-face__number--outer>span{color:var(--clock-face-time-inactive-color)}}.clock-face__number--inner>span{font-size:14px;color:#929292}@supports (color:var(--clock-face-inner-time-inactive-color)){.clock-face__number--inner>span{color:var(--clock-face-inner-time-inactive-color)}}.clock-face__number>span{-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none;width:30px;height:30px;display:flex;justify-content:center;align-items:center;margin:auto;border-radius:50%;font-weight:500;font-family:Roboto,sans-serif}@supports (font-family:var(--primary-font-family)){.clock-face__number>span{font-family:var(--primary-font-family)}}.clock-face__number>span.active{background-color:#00bfff;color:#fff}@supports (background-color:var(--clock-hand-color)){.clock-face__number>span.active{background-color:var(--clock-hand-color);color:var(--clock-face-time-active-color)}}.clock-face__number>span.disabled{color:#c5c5c5}@supports (color:var(--clock-face-time-disabled-color)){.clock-face__number>span.disabled{color:var(--clock-face-time-disabled-color)}}.clock-face__clock-hand{height:103px;width:2px;transform-origin:0 100%;position:absolute;top:calc(50% - 103px);z-index:1;background-color:#00bfff}@supports (background-color:var(--clock-hand-color)){.clock-face__clock-hand{background-color:var(--clock-hand-color)}}.clock-face__clock-hand:after{content:'';width:7px;height:7px;border-radius:50%;background-color:inherit;position:absolute;bottom:-3px;left:-3.5px}.clock-face__clock-hand_minute:before{content:'';width:7px;height:7px;background-color:#fff;border-radius:50%;position:absolute;top:-8px;left:calc(50% - 8px);box-sizing:content-box;border:4px solid #00bfff}@supports (border-color:var(--clock-hand-color)){.clock-face__clock-hand_minute:before{border-color:var(--clock-hand-color)}}@media (max-device-width:1023px) and (orientation:landscape){.clock-face{width:225px;height:225px;padding:5px}.clock-face__number--outer{height:calc(225px / 2 - 5px)}.clock-face__clock-hand_minute:before{top:0}}"]
    })
], NgxMaterialTimepickerFaceComponent);
export { NgxMaterialTimepickerFaceComponent };
function roundAngle(angle, step) {
    return Math.round(angle / step) * step;
}
function countAngleByCords(x0, y0, x, y, currentAngle) {
    if (y > y0 && x >= x0) { // II quarter
        return 180 - currentAngle;
    }
    else if (y > y0 && x < x0) { // III quarter
        return 180 + currentAngle;
    }
    else if (y < y0 && x < x0) { // IV quarter
        return 360 - currentAngle;
    }
    else { // I quarter
        return currentAngle;
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibmd4LW1hdGVyaWFsLXRpbWVwaWNrZXItZmFjZS5jb21wb25lbnQuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9uZ3gtbWF0ZXJpYWwtdGltZXBpY2tlci8iLCJzb3VyY2VzIjpbInNyYy9hcHAvbWF0ZXJpYWwtdGltZXBpY2tlci9jb21wb25lbnRzL3RpbWVwaWNrZXItZmFjZS9uZ3gtbWF0ZXJpYWwtdGltZXBpY2tlci1mYWNlLmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUEsT0FBTyxFQUVILHVCQUF1QixFQUN2QixTQUFTLEVBRVQsWUFBWSxFQUNaLFlBQVksRUFDWixLQUFLLEVBR0wsTUFBTSxFQUVOLFNBQVMsRUFDWixNQUFNLGVBQWUsQ0FBQztBQUV2QixPQUFPLEVBQUUsUUFBUSxFQUFFLE1BQU0sNkJBQTZCLENBQUM7QUFFdkQsTUFBTSxpQkFBaUIsR0FBRztJQUN0QixLQUFLLEVBQUU7UUFDSCxNQUFNLEVBQUUsTUFBTTtRQUNkLEdBQUcsRUFBRSxrQkFBa0I7S0FDMUI7SUFDRCxLQUFLLEVBQUU7UUFDSCxNQUFNLEVBQUUsT0FBTztRQUNmLEdBQUcsRUFBRSxtQkFBbUI7S0FDM0I7Q0FDSixDQUFDO0FBUUYsSUFBYSxrQ0FBa0MsR0FBL0MsTUFBYSxrQ0FBa0M7SUFOL0M7UUFRSSxhQUFRLEdBQUcsUUFBUSxDQUFDO1FBR3BCLHVCQUFrQixHQUFHLEVBQUUsQ0FBQztRQVFkLGVBQVUsR0FBRyxJQUFJLFlBQVksRUFBaUIsQ0FBQztRQUMvQyxpQkFBWSxHQUFHLElBQUksWUFBWSxFQUFVLENBQUM7SUE2SXhELENBQUM7SUFwSUcsZUFBZTtRQUNYLElBQUksQ0FBQyxvQkFBb0IsRUFBRSxDQUFDO1FBQzVCLElBQUksQ0FBQyxjQUFjLEVBQUUsQ0FBQztJQUMxQixDQUFDO0lBRUQsV0FBVyxDQUFDLE9BQXNCO1FBQzlCLE1BQU0sZUFBZSxHQUFHLE9BQU8sQ0FBQyxVQUFVLENBQUMsQ0FBQztRQUM1QyxNQUFNLG1CQUFtQixH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LEdBQUcsRUFBRSxFQUFFLEVBQUMsY0FBYztRQUN4QyxPQUFPLEdBQUcsR0FBRyxZQUFZLENBQUM7S0FDN0I7U0FBTSxJQUFJLENBQUMsR0FBRyxFQUFFLElBQUksQ0FBQyxHQUFHLEVBQUUsRUFBRSxFQUFDLGFBQWE7UUFDdkMsT0FBTyxHQUFHLEdBQUcsWUFBWSxDQUFDO0tBQzdCO1NBQU0sRUFBQyxZQUFZO1FBQ2hCLE9BQU8sWUFBWSxDQUFDO0tBQ3ZCO0FBQ0wsQ0FBQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7XG4gICAgQWZ0ZXJWaWV3SW5pdCxcbiAgICBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneSxcbiAgICBDb21wb25lbnQsXG4gICAgRWxlbWVudFJlZixcbiAgICBFdmVudEVtaXR0ZXIsXG4gICAgSG9zdExpc3RlbmVyLFxuICAgIElucHV0LFxuICAgIE9uQ2hhbmdlcyxcbiAgICBPbkRlc3Ryb3ksXG4gICAgT3V0cHV0LFxuICAgIFNpbXBsZUNoYW5nZXMsXG4gICAgVmlld0NoaWxkXG59IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgQ2xvY2tGYWNlVGltZSB9IGZyb20gJy4uLy4uL21vZGVscy9jbG9jay1mYWNlLXRpbWUuaW50ZXJmYWNlJztcbmltcG9ydCB7IFRpbWVVbml0IH0gZnJvbSAnLi4vLi4vbW9kZWxzL3RpbWUtdW5pdC5lbnVtJztcblxuY29uc3QgQ0xPQ0tfSEFORF9TVFlMRVMgPSB7XG4gICAgc21hbGw6IHtcbiAgICAgICAgaGVpZ2h0OiAnNzVweCcsXG4gICAgICAgIHRvcDogJ2NhbGMoNTAlIC0gNzVweCknXG4gICAgfSxcbiAgICBsYXJnZToge1xuICAgICAgICBoZWlnaHQ6ICcxMDNweCcsXG4gICAgICAgIHRvcDogJ2NhbGMoNTAlIC0gMTAzcHgpJ1xuICAgIH1cbn07XG5cbkBDb21wb25lbnQoe1xuICAgIHNlbGVjdG9yOiAnbmd4LW1hdGVyaWFsLXRpbWVwaWNrZXItZmFjZScsXG4gICAgdGVtcGxhdGVVcmw6ICcuL25neC1tYXRlcmlhbC10aW1lcGlja2VyLWZhY2UuY29tcG9uZW50Lmh0bWwnLFxuICAgIHN0eWxlVXJsczogWycuL25neC1tYXRlcmlhbC10aW1lcGlja2VyLWZhY2UuY29tcG9uZW50LnNjc3MnXSxcbiAgICBjaGFuZ2VEZXRlY3Rpb246IENoYW5nZURldGVjdGlvblN0cmF0ZWd5Lk9uUHVzaFxufSlcbmV4cG9ydCBjbGFzcyBOZ3hNYXRlcmlhbFRpbWVwaWNrZXJGYWNlQ29tcG9uZW50IGltcGxlbWVudHMgQWZ0ZXJWaWV3SW5pdCwgT25DaGFuZ2VzLCBPbkRlc3Ryb3kge1xuXG4gICAgdGltZVVuaXQgPSBUaW1lVW5pdDtcblxuICAgIGlzQ2xvY2tGYWNlRGlzYWJsZWQ6IGJvb2xlYW47XG4gICAgaW5uZXJDbG9ja0ZhY2VTaXplID0gODU7XG5cbiAgICBASW5wdXQoKSBmYWNlVGltZTogQ2xvY2tGYWNlVGltZVtdO1xuICAgIEBJbnB1dCgpIHNlbGVjdGVkVGltZTogQ2xvY2tGYWNlVGltZTtcbiAgICBASW5wdXQoKSB1bml0OiBUaW1lVW5pdDtcbiAgICBASW5wdXQoKSBmb3JtYXQ6IG51bWJlcjtcbiAgICBASW5wdXQoKSBtaW51dGVzR2FwOiBudW1iZXI7XG5cbiAgICBAT3V0cHV0KCkgdGltZUNoYW5nZSA9IG5ldyBFdmVudEVtaXR0ZXI8Q2xvY2tGYWNlVGltZT4oKTtcbiAgICBAT3V0cHV0KCkgdGltZVNlbGVjdGVkID0gbmV3IEV2ZW50RW1pdHRlcjxudW1iZXI+KCk7XG5cbiAgICBAVmlld0NoaWxkKCdjbG9ja0ZhY2UnLCB7c3RhdGljOiB0cnVlfSkgY2xvY2tGYWNlOiBFbGVtZW50UmVmO1xuICAgIEBWaWV3Q2hpbGQoJ2Nsb2NrSGFuZCcsIHtzdGF0aWM6IHRydWV9KSBjbG9ja0hhbmQ6IEVsZW1lbnRSZWY7XG5cbiAgICBwcml2YXRlIGlzU3RhcnRlZDogYm9vbGVhbjtcbiAgICBwcml2YXRlIHRvdWNoU3RhcnRIYW5kbGVyOiAoKSA9PiBhbnk7XG4gICAgcHJpdmF0ZSB0b3VjaEVuZEhhbmRsZXI6ICgpID0+IGFueTtcblxuICAgIG5nQWZ0ZXJWaWV3SW5pdCgpIHtcbiAgICAgICAgdGhpcy5zZXRDbG9ja0hhbmRQb3NpdGlvbigpO1xuICAgICAgICB0aGlzLmFkZFRvdWNoRXZlbnRzKCk7XG4gICAgfVxuXG4gICAgbmdPbkNoYW5nZXMoY2hhbmdlczogU2ltcGxlQ2hhbmdlcykge1xuICAgICAgICBjb25zdCBmYWNlVGltZUNoYW5nZXMgPSBjaGFuZ2VzWydmYWNlVGltZSddO1xuICAgICAgICBjb25zdCBzZWxlY3RlZFRpbWVDaGFuZ2VzID0gY2hhbmdlc1snc2VsZWN0ZWRUaW1lJ107XG5cbiAgICAgICAgaWYgKChmYWNlVGltZUNoYW5nZXMgJiYgZmFjZVRpbWVDaGFuZ2VzLmN1cnJlbnRWYWx1ZSlcbiAgICAgICAgICAgICYmIChzZWxlY3RlZFRpbWVDaGFuZ2VzICYmIHNlbGVjdGVkVGltZUNoYW5nZXMuY3VycmVudFZhbHVlKSkge1xuICAgICAgICAgICAgLyogU2V0IHRpbWUgYWNjb3JkaW5nIHRvIHBhc3NlZCBhbiBpbnB1dCB2YWx1ZSAqL1xuICAgICAgICAgICAgdGhpcy5zZWxlY3RlZFRpbWUgPSB0aGlzLmZhY2VUaW1lLmZpbmQodGltZSA9PiB0aW1lLnRpbWUgPT09IHRoaXMuc2VsZWN0ZWRUaW1lLnRpbWUpO1xuICAgICAgICB9XG4gICAgICAgIGlmIChzZWxlY3RlZFRpbWVDaGFuZ2VzICYmIHNlbGVjdGVkVGltZUNoYW5nZXMuY3VycmVudFZhbHVlKSB7XG4gICAgICAgICAgICB0aGlzLnNldENsb2NrSGFuZFBvc2l0aW9uKCk7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKGZhY2VUaW1lQ2hhbmdlcyAmJiBmYWNlVGltZUNoYW5nZXMuY3VycmVudFZhbHVlKSB7XG4gICAgICAgICAgICAvLyBUbyBhdm9pZCBhbiBlcnJvciBFeHByZXNzaW9uQ2hhbmdlZEFmdGVySXRIYXNCZWVuQ2hlY2tlZEVycm9yXG4gICAgICAgICAgICBzZXRUaW1lb3V0KCgpID0+IHRoaXMuc2VsZWN0QXZhaWxhYmxlVGltZSgpKTtcbiAgICAgICAgfVxuICAgIH1cblxuXG4gICAgdHJhY2tCeVRpbWUoXywgdGltZTogQ2xvY2tGYWNlVGltZSk6IHN0cmluZyB8IG51bWJlciB7XG4gICAgICAgIHJldHVybiB0aW1lLnRpbWU7XG4gICAgfVxuXG4gICAgQEhvc3RMaXN0ZW5lcignbW91c2Vkb3duJywgWyckZXZlbnQnXSlcbiAgICBvbk1vdXNlZG93bihlOiBhbnkpIHtcbiAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICB0aGlzLmlzU3RhcnRlZCA9IHRydWU7XG4gICAgfVxuXG4gICAgQEhvc3RMaXN0ZW5lcignY2xpY2snLCBbJyRldmVudCddKVxuICAgIEBIb3N0TGlzdGVuZXIoJ3RvdWNobW92ZScsIFsnJGV2ZW50LmNoYW5nZWRUb3VjaGVzWzBdJ10pXG4gICAgQEhvc3RMaXN0ZW5lcigndG91Y2hlbmQnLCBbJyRldmVudC5jaGFuZ2VkVG91Y2hlc1swXSddKVxuICAgIEBIb3N0TGlzdGVuZXIoJ21vdXNlbW92ZScsIFsnJGV2ZW50J10pXG4gICAgc2VsZWN0VGltZShlOiBhbnkpOiB2b2lkIHtcblxuICAgICAgICBpZiAoIXRoaXMuaXNTdGFydGVkICYmIChlIGluc3RhbmNlb2YgTW91c2VFdmVudCAmJiBlLnR5cGUgIT09ICdjbGljaycpKSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgY29uc3QgY2xvY2tGYWNlQ29yZHMgPSB0aGlzLmNsb2NrRmFjZS5uYXRpdmVFbGVtZW50LmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpO1xuXG4gICAgICAgIC8qIEdldCB4MCBhbmQgeTAgb2YgdGhlIGNpcmNsZSAqL1xuICAgICAgICBjb25zdCBjZW50ZXJYID0gY2xvY2tGYWNlQ29yZHMubGVmdCArIGNsb2NrRmFjZUNvcmRzLndpZHRoIC8gMjtcbiAgICAgICAgY29uc3QgY2VudGVyWSA9IGNsb2NrRmFjZUNvcmRzLnRvcCArIGNsb2NrRmFjZUNvcmRzLmhlaWdodCAvIDI7XG4gICAgICAgIC8qIENvdW50aW5nIHRoZSBhcmN0YW5nZW50IGFuZCBjb252ZXJ0IGl0IHRvIGZyb20gcmFkaWFuIHRvIGRlZyAqL1xuICAgICAgICBjb25zdCBhcmN0YW5nZW50ID0gTWF0aC5hdGFuKE1hdGguYWJzKGUuY2xpZW50WCAtIGNlbnRlclgpIC8gTWF0aC5hYnMoZS5jbGllbnRZIC0gY2VudGVyWSkpICogMTgwIC8gTWF0aC5QSTtcbiAgICAgICAgLyogR2V0IGFuZ2xlIGFjY29yZGluZyB0byBxdWFkcmFudCAqL1xuICAgICAgICBjb25zdCBjaXJjbGVBbmdsZSA9IGNvdW50QW5nbGVCeUNvcmRzKGNlbnRlclgsIGNlbnRlclksIGUuY2xpZW50WCwgZS5jbGllbnRZLCBhcmN0YW5nZW50KTtcbiAgICAgICAgLyogQ2hlY2sgaWYgc2VsZWN0ZWQgdGltZSBmcm9tIHRoZSBpbm5lciBjbG9jayBmYWNlICgyNCBob3VycyBmb3JtYXQgb25seSkgKi9cbiAgICAgICAgY29uc3QgaXNJbm5lckNsb2NrQ2hvc2VuID0gdGhpcy5mb3JtYXQgJiYgdGhpcy5pc0lubmVyQ2xvY2tGYWNlKGNlbnRlclgsIGNlbnRlclksIGUuY2xpZW50WCwgZS5jbGllbnRZKTtcbiAgICAgICAgLyogUm91bmQgYW5nbGUgYWNjb3JkaW5nIHRvIGFuZ2xlIHN0ZXAgKi9cbiAgICAgICAgY29uc3QgYW5nbGVTdGVwID0gdGhpcy51bml0ID09PSBUaW1lVW5pdC5NSU5VVEUgPyAoNiAqICh0aGlzLm1pbnV0ZXNHYXAgfHwgMSkpIDogMzA7XG4gICAgICAgIGNvbnN0IHJvdW5kZWRBbmdsZSA9IHJvdW5kQW5nbGUoY2lyY2xlQW5nbGUsIGFuZ2xlU3RlcCk7XG4gICAgICAgIGNvbnN0IGFuZ2xlID0gKHJvdW5kZWRBbmdsZSB8fCAzNjApICsgKGlzSW5uZXJDbG9ja0Nob3NlbiA/IDM2MCA6IDApO1xuXG4gICAgICAgIGNvbnN0IHNlbGVjdGVkVGltZSA9IHRoaXMuZmFjZVRpbWUuZmluZCh2YWwgPT4gdmFsLmFuZ2xlID09PSBhbmdsZSk7XG5cbiAgICAgICAgaWYgKHNlbGVjdGVkVGltZSAmJiAhc2VsZWN0ZWRUaW1lLmRpc2FibGVkKSB7XG4gICAgICAgICAgICB0aGlzLnRpbWVDaGFuZ2UubmV4dChzZWxlY3RlZFRpbWUpO1xuXG4gICAgICAgICAgICAvKiBUbyBsZXQga25vdyB3aGV0aGVyIHVzZXIgZW5kZWQgaW50ZXJhY3Rpb24gd2l0aCBjbG9jayBmYWNlICovXG4gICAgICAgICAgICBpZiAoIXRoaXMuaXNTdGFydGVkKSB7XG4gICAgICAgICAgICAgICAgdGhpcy50aW1lU2VsZWN0ZWQubmV4dChzZWxlY3RlZFRpbWUudGltZSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgIH1cblxuICAgIEBIb3N0TGlzdGVuZXIoJ21vdXNldXAnLCBbJyRldmVudCddKVxuICAgIG9uTW91c2V1cChlOiBhbnkpIHtcbiAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICB0aGlzLmlzU3RhcnRlZCA9IGZhbHNlO1xuICAgIH1cblxuICAgIG5nT25EZXN0cm95KCkge1xuICAgICAgICB0aGlzLnJlbW92ZVRvdWNoRXZlbnRzKCk7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBhZGRUb3VjaEV2ZW50cygpOiB2b2lkIHtcbiAgICAgICAgdGhpcy50b3VjaFN0YXJ0SGFuZGxlciA9IHRoaXMub25Nb3VzZWRvd24uYmluZCh0aGlzKTtcbiAgICAgICAgdGhpcy50b3VjaEVuZEhhbmRsZXIgPSB0aGlzLm9uTW91c2V1cC5iaW5kKHRoaXMpO1xuXG4gICAgICAgIHRoaXMuY2xvY2tGYWNlLm5hdGl2ZUVsZW1lbnQuYWRkRXZlbnRMaXN0ZW5lcigndG91Y2hzdGFydCcsIHRoaXMudG91Y2hTdGFydEhhbmRsZXIpO1xuICAgICAgICB0aGlzLmNsb2NrRmFjZS5uYXRpdmVFbGVtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ3RvdWNoZW5kJywgdGhpcy50b3VjaEVuZEhhbmRsZXIpO1xuICAgIH1cblxuICAgIHByaXZhdGUgcmVtb3ZlVG91Y2hFdmVudHMoKTogdm9pZCB7XG4gICAgICAgIHRoaXMuY2xvY2tGYWNlLm5hdGl2ZUVsZW1lbnQucmVtb3ZlRXZlbnRMaXN0ZW5lcigndG91Y2hzdGFydCcsIHRoaXMudG91Y2hTdGFydEhhbmRsZXIpO1xuICAgICAgICB0aGlzLmNsb2NrRmFjZS5uYXRpdmVFbGVtZW50LnJlbW92ZUV2ZW50TGlzdGVuZXIoJ3RvdWNoZW5kJywgdGhpcy50b3VjaEVuZEhhbmRsZXIpO1xuICAgIH1cblxuICAgIHByaXZhdGUgc2V0Q2xvY2tIYW5kUG9zaXRpb24oKTogdm9pZCB7XG4gICAgICAgIGlmICh0aGlzLmZvcm1hdCA9PT0gMjQpIHtcbiAgICAgICAgICAgIGlmICh0aGlzLnNlbGVjdGVkVGltZS50aW1lID4gMTIgfHwgdGhpcy5zZWxlY3RlZFRpbWUudGltZSA9PT0gMCkge1xuICAgICAgICAgICAgICAgIHRoaXMuZGVjcmVhc2VDbG9ja0hhbmQoKTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgdGhpcy5pbmNyZWFzZUNsb2NrSGFuZCgpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy5jbG9ja0hhbmQubmF0aXZlRWxlbWVudC5zdHlsZS50cmFuc2Zvcm0gPSBgcm90YXRlKCR7dGhpcy5zZWxlY3RlZFRpbWUuYW5nbGV9ZGVnKWA7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBzZWxlY3RBdmFpbGFibGVUaW1lKCk6IHZvaWQge1xuICAgICAgICBjb25zdCBjdXJyZW50VGltZSA9IHRoaXMuZmFjZVRpbWUuZmluZCh0aW1lID0+IHRoaXMuc2VsZWN0ZWRUaW1lLnRpbWUgPT09IHRpbWUudGltZSk7XG4gICAgICAgIHRoaXMuaXNDbG9ja0ZhY2VEaXNhYmxlZCA9IHRoaXMuZmFjZVRpbWUuZXZlcnkodGltZSA9PiB0aW1lLmRpc2FibGVkKTtcblxuICAgICAgICBpZiAoKGN1cnJlbnRUaW1lICYmIGN1cnJlbnRUaW1lLmRpc2FibGVkKSAmJiAhdGhpcy5pc0Nsb2NrRmFjZURpc2FibGVkKSB7XG4gICAgICAgICAgICBjb25zdCBhdmFpbGFibGVUaW1lID0gdGhpcy5mYWNlVGltZS5maW5kKHRpbWUgPT4gIXRpbWUuZGlzYWJsZWQpO1xuXG4gICAgICAgICAgICB0aGlzLnRpbWVDaGFuZ2UubmV4dChhdmFpbGFibGVUaW1lKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHByaXZhdGUgaXNJbm5lckNsb2NrRmFjZSh4MDogbnVtYmVyLCB5MDogbnVtYmVyLCB4OiBudW1iZXIsIHk6IG51bWJlcik6IGJvb2xlYW4ge1xuICAgICAgICAvKiBEZXRlY3Qgd2hldGhlciB0aW1lIGZyb20gdGhlIGlubmVyIGNsb2NrIGZhY2Ugb3Igbm90ICgyNCBmb3JtYXQgb25seSkgKi9cbiAgICAgICAgcmV0dXJuIE1hdGguc3FydChNYXRoLnBvdyh4IC0geDAsIDIpICsgTWF0aC5wb3coeSAtIHkwLCAyKSkgPCB0aGlzLmlubmVyQ2xvY2tGYWNlU2l6ZTtcbiAgICB9XG5cbiAgICBwcml2YXRlIGRlY3JlYXNlQ2xvY2tIYW5kKCk6IHZvaWQge1xuICAgICAgICB0aGlzLmNsb2NrSGFuZC5uYXRpdmVFbGVtZW50LnN0eWxlLmhlaWdodCA9IENMT0NLX0hBTkRfU1RZTEVTLnNtYWxsLmhlaWdodDtcbiAgICAgICAgdGhpcy5jbG9ja0hhbmQubmF0aXZlRWxlbWVudC5zdHlsZS50b3AgPSBDTE9DS19IQU5EX1NUWUxFUy5zbWFsbC50b3A7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBpbmNyZWFzZUNsb2NrSGFuZCgpOiB2b2lkIHtcbiAgICAgICAgdGhpcy5jbG9ja0hhbmQubmF0aXZlRWxlbWVudC5zdHlsZS5oZWlnaHQgPSBDTE9DS19IQU5EX1NUWUxFUy5sYXJnZS5oZWlnaHQ7XG4gICAgICAgIHRoaXMuY2xvY2tIYW5kLm5hdGl2ZUVsZW1lbnQuc3R5bGUudG9wID0gQ0xPQ0tfSEFORF9TVFlMRVMubGFyZ2UudG9wO1xuICAgIH1cbn1cblxuZnVuY3Rpb24gcm91bmRBbmdsZShhbmdsZTogbnVtYmVyLCBzdGVwOiBudW1iZXIpOiBudW1iZXIge1xuICAgIHJldHVybiBNYXRoLnJvdW5kKGFuZ2xlIC8gc3RlcCkgKiBzdGVwO1xufVxuXG5mdW5jdGlvbiBjb3VudEFuZ2xlQnlDb3Jkcyh4MDogbnVtYmVyLCB5MDogbnVtYmVyLCB4OiBudW1iZXIsIHk6IG51bWJlciwgY3VycmVudEFuZ2xlOiBudW1iZXIpOiBudW1iZXIge1xuICAgIGlmICh5ID4geTAgJiYgeCA+PSB4MCkgey8vIElJIHF1YXJ0ZXJcbiAgICAgICAgcmV0dXJuIDE4MCAtIGN1cnJlbnRBbmdsZTtcbiAgICB9IGVsc2UgaWYgKHkgPiB5MCAmJiB4IDwgeDApIHsvLyBJSUkgcXVhcnRlclxuICAgICAgICByZXR1cm4gMTgwICsgY3VycmVudEFuZ2xlO1xuICAgIH0gZWxzZSBpZiAoeSA8IHkwICYmIHggPCB4MCkgey8vIElWIHF1YXJ0ZXJcbiAgICAgICAgcmV0dXJuIDM2MCAtIGN1cnJlbnRBbmdsZTtcbiAgICB9IGVsc2Ugey8vIEkgcXVhcnRlclxuICAgICAgICByZXR1cm4gY3VycmVudEFuZ2xlO1xuICAgIH1cbn1cbiJdfQ==