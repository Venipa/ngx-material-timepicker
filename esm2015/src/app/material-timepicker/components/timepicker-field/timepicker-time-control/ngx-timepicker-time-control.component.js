import * as tslib_1 from "tslib";
import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { isDigit } from '../../../utils/timepicker.utils';
import { TimeParserPipe } from '../../../pipes/time-parser.pipe';
let NgxTimepickerTimeControlComponent = class NgxTimepickerTimeControlComponent {
    constructor(timeParser) {
        this.timeParser = timeParser;
        this.timeChanged = new EventEmitter();
    }
    ngOnChanges(changes) {
        if (changes.timeList && this.time != null) {
            if (this.isSelectedTimeDisabled(this.time)) {
                this.setAvailableTime();
            }
        }
    }
    changeTime(event) {
        event.stopPropagation();
        const char = String.fromCharCode(event.keyCode);
        const time = concatTime(String(this.time), char);
        this.changeTimeIfValid(time);
    }
    onKeydown(event) {
        event.stopPropagation();
        if (!isDigit(event)) {
            event.preventDefault();
        }
        switch (event.key) {
            case 'ArrowUp':
                this.increase();
                break;
            case 'ArrowDown':
                this.decrease();
                break;
        }
        if (this.preventTyping && event.key !== 'Tab') {
            event.preventDefault();
        }
    }
    increase() {
        if (!this.disabled) {
            let nextTime = +this.time + 1;
            if (nextTime > this.max) {
                nextTime = this.min;
            }
            if (this.isSelectedTimeDisabled(nextTime)) {
                nextTime = this.getAvailableTime(nextTime, this.getNextAvailableTime.bind(this));
            }
            if (nextTime !== this.time) {
                this.timeChanged.emit(nextTime);
            }
        }
    }
    decrease() {
        if (!this.disabled) {
            let previousTime = +this.time - 1;
            if (previousTime < this.min) {
                previousTime = this.max;
            }
            if (this.isSelectedTimeDisabled(previousTime)) {
                previousTime = this.getAvailableTime(previousTime, this.getPrevAvailableTime.bind(this));
            }
            if (previousTime !== this.time) {
                this.timeChanged.emit(previousTime);
            }
        }
    }
    onFocus() {
        this.isFocused = true;
        this.previousTime = this.time;
    }
    onBlur() {
        this.isFocused = false;
        if (this.previousTime !== this.time) {
            this.changeTimeIfValid(+this.time);
        }
    }
    onModelChange(value) {
        this.time = +this.timeParser.transform(value, this.timeUnit);
    }
    changeTimeIfValid(value) {
        if (!isNaN(value)) {
            this.time = value;
            if (this.time > this.max) {
                const timeString = String(value);
                this.time = +timeString[timeString.length - 1];
            }
            if (this.time < this.min) {
                this.time = this.min;
            }
            this.timeChanged.emit(this.time);
        }
    }
    isSelectedTimeDisabled(time) {
        return this.timeList.find((faceTime) => faceTime.time === time).disabled;
    }
    getNextAvailableTime(index) {
        const timeCollection = this.timeList;
        const maxValue = timeCollection.length;
        for (let i = index + 1; i < maxValue; i++) {
            const time = timeCollection[i];
            if (!time.disabled) {
                return time.time;
            }
        }
    }
    getPrevAvailableTime(index) {
        for (let i = index; i >= 0; i--) {
            const time = this.timeList[i];
            if (!time.disabled) {
                return time.time;
            }
        }
    }
    getAvailableTime(currentTime, fn) {
        const currentTimeIndex = this.timeList.findIndex(time => time.time === currentTime);
        const availableTime = fn(currentTimeIndex);
        return availableTime != null ? availableTime : this.time;
    }
    setAvailableTime() {
        this.time = this.timeList.find(t => !t.disabled).time;
        this.timeChanged.emit(this.time);
    }
};
NgxTimepickerTimeControlComponent.ctorParameters = () => [
    { type: TimeParserPipe }
];
tslib_1.__decorate([
    Input()
], NgxTimepickerTimeControlComponent.prototype, "time", void 0);
tslib_1.__decorate([
    Input()
], NgxTimepickerTimeControlComponent.prototype, "min", void 0);
tslib_1.__decorate([
    Input()
], NgxTimepickerTimeControlComponent.prototype, "max", void 0);
tslib_1.__decorate([
    Input()
], NgxTimepickerTimeControlComponent.prototype, "placeholder", void 0);
tslib_1.__decorate([
    Input()
], NgxTimepickerTimeControlComponent.prototype, "timeUnit", void 0);
tslib_1.__decorate([
    Input()
], NgxTimepickerTimeControlComponent.prototype, "disabled", void 0);
tslib_1.__decorate([
    Input()
], NgxTimepickerTimeControlComponent.prototype, "timeList", void 0);
tslib_1.__decorate([
    Input()
], NgxTimepickerTimeControlComponent.prototype, "preventTyping", void 0);
tslib_1.__decorate([
    Output()
], NgxTimepickerTimeControlComponent.prototype, "timeChanged", void 0);
NgxTimepickerTimeControlComponent = tslib_1.__decorate([
    Component({
        selector: 'ngx-timepicker-time-control',
        template: "<div class=\"ngx-timepicker-control\" [ngClass]=\"{'ngx-timepicker-control--active': isFocused}\">\n    <!--suppress HtmlFormInputWithoutLabel -->\n    <input class=\"ngx-timepicker-control__input\"\n           maxlength=\"2\"\n           [ngModel]=\"time | timeParser: timeUnit | timeLocalizer: timeUnit : true\"\n           (ngModelChange)=\"onModelChange($event)\"\n           [placeholder]=\"placeholder\"\n           [disabled]=\"disabled\"\n           (keydown)=\"onKeydown($event)\"\n           (keypress)=\"changeTime($event)\"\n           (focus)=\"onFocus()\"\n           (blur)=\"onBlur()\">\n    <div class=\"ngx-timepicker-control__arrows\">\n            <span class=\"ngx-timepicker-control__arrow\" role=\"button\" (click)=\"increase()\">\n                &#9650;\n            </span>\n        <span class=\"ngx-timepicker-control__arrow\" role=\"button\" (click)=\"decrease()\">\n                &#9660;\n            </span>\n    </div>\n</div>\n",
        changeDetection: ChangeDetectionStrategy.OnPush,
        providers: [TimeParserPipe],
        styles: [".ngx-timepicker-control{position:relative;display:flex;width:60px;height:30px;padding:0 5px;box-sizing:border-box}.ngx-timepicker-control--active:after{content:'';position:absolute;bottom:-2px;left:0;width:100%;height:1px;background-color:#00bfff}.ngx-timepicker-control__input{width:100%;height:100%;padding:0 5px 0 0;border:0;font-size:1rem;color:inherit;outline:0;text-align:center}.ngx-timepicker-control__input:disabled{background-color:transparent}.ngx-timepicker-control__arrows{position:absolute;right:2px;top:0;display:flex;flex-direction:column}.ngx-timepicker-control__arrow{font-size:11px;color:rgba(0,0,0,.4);cursor:pointer;transition:color .2s;-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none}.ngx-timepicker-control__arrow:hover{color:rgba(0,0,0,.9)}"]
    })
], NgxTimepickerTimeControlComponent);
export { NgxTimepickerTimeControlComponent };
function concatTime(currentTime, nextTime) {
    const isNumber = /\d/.test(nextTime);
    if (isNumber) {
        const time = currentTime + nextTime;
        return +time;
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibmd4LXRpbWVwaWNrZXItdGltZS1jb250cm9sLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiJuZzovL25neC1tYXRlcmlhbC10aW1lcGlja2VyLyIsInNvdXJjZXMiOlsic3JjL2FwcC9tYXRlcmlhbC10aW1lcGlja2VyL2NvbXBvbmVudHMvdGltZXBpY2tlci1maWVsZC90aW1lcGlja2VyLXRpbWUtY29udHJvbC9uZ3gtdGltZXBpY2tlci10aW1lLWNvbnRyb2wuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxPQUFPLEVBQUUsdUJBQXVCLEVBQUUsU0FBUyxFQUFFLFlBQVksRUFBRSxLQUFLLEVBQWEsTUFBTSxFQUFpQixNQUFNLGVBQWUsQ0FBQztBQUMxSCxPQUFPLEVBQUUsT0FBTyxFQUFFLE1BQU0saUNBQWlDLENBQUM7QUFFMUQsT0FBTyxFQUFFLGNBQWMsRUFBRSxNQUFNLGlDQUFpQyxDQUFDO0FBV2pFLElBQWEsaUNBQWlDLEdBQTlDLE1BQWEsaUNBQWlDO0lBaUIxQyxZQUFvQixVQUEwQjtRQUExQixlQUFVLEdBQVYsVUFBVSxDQUFnQjtRQU5wQyxnQkFBVyxHQUFHLElBQUksWUFBWSxFQUFVLENBQUM7SUFPbkQsQ0FBQztJQUVELFdBQVcsQ0FBQyxPQUFzQjtRQUM5QixJQUFJLE9BQU8sQ0FBQyxRQUFRLElBQUksSUFBSSxDQUFDLElBQUksSUFBSSxJQUFJLEVBQUU7WUFDdkMsSUFBSSxJQUFJLENBQUMsc0JBQXNCLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxFQUFFO2dCQUN4QyxJQUFJLENBQUMsZ0JBQWdCLEVBQUUsQ0FBQzthQUMzQjtTQUNKO0lBQ0wsQ0FBQztJQUVELFVBQVUsQ0FBQyxLQUFVO1FBQ2pCLEtBQUssQ0FBQyxlQUFlLEVBQUUsQ0FBQztRQUV4QixNQUFNLElBQUksR0FBRyxNQUFNLENBQUMsWUFBWSxDQUFDLEtBQUssQ0FBQyxPQUFPLENBQUMsQ0FBQztRQUNoRCxNQUFNLElBQUksR0FBRyxV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QUFvQjtBQUNuQjtJQUFSLEtBQUssRUFBRTttRUFBbUI7QUFDbEI7SUFBUixLQUFLLEVBQUU7bUVBQTJCO0FBQzFCO0lBQVIsS0FBSyxFQUFFO3dFQUF3QjtBQUV0QjtJQUFULE1BQU0sRUFBRTtzRUFBMEM7QUFYMUMsaUNBQWlDO0lBUjdDLFNBQVMsQ0FBQztRQUNQLFFBQVEsRUFBRSw2QkFBNkI7UUFDdkMsODhCQUEyRDtRQUUzRCxlQUFlLEVBQUUsdUJBQXVCLENBQUMsTUFBTTtRQUMvQyxTQUFTLEVBQUUsQ0FBQyxjQUFjLENBQUM7O0tBQzlCLENBQUM7R0FFVyxpQ0FBaUMsQ0FtSzdDO1NBbktZLGlDQUFpQztBQXFLOUMsU0FBUyxVQUFVLENBQUMsV0FBbUIsRUFBRSxRQUFnQjtJQUNyRCxNQUFNLFFBQVEsR0FBRyxJQUFJLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUFDO0lBRXJDLElBQUksUUFBUSxFQUFFO1FBQ1YsTUFBTSxJQUFJLEdBQUcsV0FBVyxHQUFHLFFBQVEsQ0FBQztRQUNwQyxPQUFPLENBQUMsSUFBSSxDQUFDO0tBQ2hCO0FBQ0wsQ0FBQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENoYW5nZURldGVjdGlvblN0cmF0ZWd5LCBDb21wb25lbnQsIEV2ZW50RW1pdHRlciwgSW5wdXQsIE9uQ2hhbmdlcywgT3V0cHV0LCBTaW1wbGVDaGFuZ2VzIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBpc0RpZ2l0IH0gZnJvbSAnLi4vLi4vLi4vdXRpbHMvdGltZXBpY2tlci51dGlscyc7XG5pbXBvcnQgeyBUaW1lVW5pdCB9IGZyb20gJy4uLy4uLy4uL21vZGVscy90aW1lLXVuaXQuZW51bSc7XG5pbXBvcnQgeyBUaW1lUGFyc2VyUGlwZSB9IGZyb20gJy4uLy4uLy4uL3BpcGVzL3RpbWUtcGFyc2VyLnBpcGUnO1xuaW1wb3J0IHsgQ2xvY2tGYWNlVGltZSB9IGZyb20gJy4uLy4uLy4uL21vZGVscy9jbG9jay1mYWNlLXRpbWUuaW50ZXJmYWNlJztcblxuQENvbXBvbmVudCh7XG4gICAgc2VsZWN0b3I6ICduZ3gtdGltZXBpY2tlci10aW1lLWNvbnRyb2wnLFxuICAgIHRlbXBsYXRlVXJsOiAnLi9uZ3gtdGltZXBpY2tlci10aW1lLWNvbnRyb2wuY29tcG9uZW50Lmh0bWwnLFxuICAgIHN0eWxlVXJsczogWycuL25neC10aW1lcGlja2VyLXRpbWUtY29udHJvbC5jb21wb25lbnQuc2NzcyddLFxuICAgIGNoYW5nZURldGVjdGlvbjogQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3kuT25QdXNoLFxuICAgIHByb3ZpZGVyczogW1RpbWVQYXJzZXJQaXBlXVxufSlcblxuZXhwb3J0IGNsYXNzIE5neFRpbWVwaWNrZXJUaW1lQ29udHJvbENvbXBvbmVudCBpbXBsZW1lbnRzIE9uQ2hhbmdlcyB7XG5cbiAgICBASW5wdXQoKSB0aW1lOiBudW1iZXI7XG4gICAgQElucHV0KCkgbWluOiBudW1iZXI7XG4gICAgQElucHV0KCkgbWF4OiBudW1iZXI7XG4gICAgQElucHV0KCkgcGxhY2Vob2xkZXI6IHN0cmluZztcbiAgICBASW5wdXQoKSB0aW1lVW5pdDogVGltZVVuaXQ7XG4gICAgQElucHV0KCkgZGlzYWJsZWQ6IGJvb2xlYW47XG4gICAgQElucHV0KCkgdGltZUxpc3Q6IENsb2NrRmFjZVRpbWVbXTtcbiAgICBASW5wdXQoKSBwcmV2ZW50VHlwaW5nOiBib29sZWFuO1xuXG4gICAgQE91dHB1dCgpIHRpbWVDaGFuZ2VkID0gbmV3IEV2ZW50RW1pdHRlcjxudW1iZXI+KCk7XG5cbiAgICBpc0ZvY3VzZWQ6IGJvb2xlYW47XG5cbiAgICBwcml2YXRlIHByZXZpb3VzVGltZTogbnVtYmVyO1xuXG4gICAgY29uc3RydWN0b3IocHJpdmF0ZSB0aW1lUGFyc2VyOiBUaW1lUGFyc2VyUGlwZSkge1xuICAgIH1cblxuICAgIG5nT25DaGFuZ2VzKGNoYW5nZXM6IFNpbXBsZUNoYW5nZXMpOiB2b2lkIHtcbiAgICAgICAgaWYgKGNoYW5nZXMudGltZUxpc3QgJiYgdGhpcy50aW1lICE9IG51bGwpIHtcbiAgICAgICAgICAgIGlmICh0aGlzLmlzU2VsZWN0ZWRUaW1lRGlzYWJsZWQodGhpcy50aW1lKSkge1xuICAgICAgICAgICAgICAgIHRoaXMuc2V0QXZhaWxhYmxlVGltZSgpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuXG4gICAgY2hhbmdlVGltZShldmVudDogYW55KTogdm9pZCB7XG4gICAgICAgIGV2ZW50LnN0b3BQcm9wYWdhdGlvbigpO1xuXG4gICAgICAgIGNvbnN0IGNoYXIgPSBTdHJpbmcuZnJvbUNoYXJDb2RlKGV2ZW50LmtleUNvZGUpO1xuICAgICAgICBjb25zdCB0aW1lID0gY29uY2F0VGltZShTdHJpbmcodGhpcy50aW1lKSwgY2hhcik7XG5cbiAgICAgICAgdGhpcy5jaGFuZ2VUaW1lSWZWYWxpZCh0aW1lKTtcbiAgICB9XG5cbiAgICBvbktleWRvd24oZXZlbnQ6IGFueSk6IHZvaWQge1xuICAgICAgICBldmVudC5zdG9wUHJvcGFnYXRpb24oKTtcblxuICAgICAgICBpZiAoIWlzRGlnaXQoZXZlbnQpKSB7XG4gICAgICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICB9XG5cbiAgICAgICAgc3dpdGNoIChldmVudC5rZXkpIHtcbiAgICAgICAgICAgIGNhc2UgJ0Fycm93VXAnOlxuICAgICAgICAgICAgICAgIHRoaXMuaW5jcmVhc2UoKTtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGNhc2UgJ0Fycm93RG93bic6XG4gICAgICAgICAgICAgICAgdGhpcy5kZWNyZWFzZSgpO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKHRoaXMucHJldmVudFR5cGluZyAmJiBldmVudC5rZXkgIT09ICdUYWInKSB7XG4gICAgICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgaW5jcmVhc2UoKTogdm9pZCB7XG4gICAgICAgIGlmICghdGhpcy5kaXNhYmxlZCkge1xuICAgICAgICAgICAgbGV0IG5leHRUaW1lID0gK3RoaXMudGltZSArIDE7XG5cbiAgICAgICAgICAgIGlmIChuZXh0VGltZSA+IHRoaXMubWF4KSB7XG4gICAgICAgICAgICAgICAgbmV4dFRpbWUgPSB0aGlzLm1pbjtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgaWYgKHRoaXMuaXNTZWxlY3RlZFRpbWVEaXNhYmxlZChuZXh0VGltZSkpIHtcbiAgICAgICAgICAgICAgICBuZXh0VGltZSA9IHRoaXMuZ2V0QXZhaWxhYmxlVGltZShuZXh0VGltZSwgdGhpcy5nZXROZXh0QXZhaWxhYmxlVGltZS5iaW5kKHRoaXMpKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgaWYgKG5leHRUaW1lICE9PSB0aGlzLnRpbWUpIHtcbiAgICAgICAgICAgICAgICB0aGlzLnRpbWVDaGFuZ2VkLmVtaXQobmV4dFRpbWUpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuXG4gICAgZGVjcmVhc2UoKTogdm9pZCB7XG4gICAgICAgIGlmICghdGhpcy5kaXNhYmxlZCkge1xuICAgICAgICAgICAgbGV0IHByZXZpb3VzVGltZSA9ICt0aGlzLnRpbWUgLSAxO1xuXG4gICAgICAgICAgICBpZiAocHJldmlvdXNUaW1lIDwgdGhpcy5taW4pIHtcbiAgICAgICAgICAgICAgICBwcmV2aW91c1RpbWUgPSB0aGlzLm1heDtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgaWYgKHRoaXMuaXNTZWxlY3RlZFRpbWVEaXNhYmxlZChwcmV2aW91c1RpbWUpKSB7XG4gICAgICAgICAgICAgICAgcHJldmlvdXNUaW1lID0gdGhpcy5nZXRBdmFpbGFibGVUaW1lKHByZXZpb3VzVGltZSwgdGhpcy5nZXRQcmV2QXZhaWxhYmxlVGltZS5iaW5kKHRoaXMpKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgaWYgKHByZXZpb3VzVGltZSAhPT0gdGhpcy50aW1lKSB7XG4gICAgICAgICAgICAgICAgdGhpcy50aW1lQ2hhbmdlZC5lbWl0KHByZXZpb3VzVGltZSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBvbkZvY3VzKCk6IHZvaWQge1xuICAgICAgICB0aGlzLmlzRm9jdXNlZCA9IHRydWU7XG4gICAgICAgIHRoaXMucHJldmlvdXNUaW1lID0gdGhpcy50aW1lO1xuICAgIH1cblxuICAgIG9uQmx1cigpOiB2b2lkIHtcbiAgICAgICAgdGhpcy5pc0ZvY3VzZWQgPSBmYWxzZTtcblxuICAgICAgICBpZiAodGhpcy5wcmV2aW91c1RpbWUgIT09IHRoaXMudGltZSkge1xuICAgICAgICAgICAgdGhpcy5jaGFuZ2VUaW1lSWZWYWxpZCgrdGhpcy50aW1lKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIG9uTW9kZWxDaGFuZ2UodmFsdWU6IHN0cmluZyk6IHZvaWQge1xuICAgICAgICB0aGlzLnRpbWUgPSArdGhpcy50aW1lUGFyc2VyLnRyYW5zZm9ybSh2YWx1ZSwgdGhpcy50aW1lVW5pdCk7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBjaGFuZ2VUaW1lSWZWYWxpZCh2YWx1ZTogbnVtYmVyIHwgdW5kZWZpbmVkKSB7XG4gICAgICAgIGlmICghaXNOYU4odmFsdWUpKSB7XG4gICAgICAgICAgICB0aGlzLnRpbWUgPSB2YWx1ZTtcblxuICAgICAgICAgICAgaWYgKHRoaXMudGltZSA+IHRoaXMubWF4KSB7XG4gICAgICAgICAgICAgICAgY29uc3QgdGltZVN0cmluZyA9IFN0cmluZyh2YWx1ZSk7XG4gICAgICAgICAgICAgICAgdGhpcy50aW1lID0gK3RpbWVTdHJpbmdbdGltZVN0cmluZy5sZW5ndGggLSAxXTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgaWYgKHRoaXMudGltZSA8IHRoaXMubWluKSB7XG4gICAgICAgICAgICAgICAgdGhpcy50aW1lID0gdGhpcy5taW47XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHRoaXMudGltZUNoYW5nZWQuZW1pdCh0aGlzLnRpbWUpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBpc1NlbGVjdGVkVGltZURpc2FibGVkKHRpbWU6IG51bWJlcik6IGJvb2xlYW4ge1xuICAgICAgICByZXR1cm4gdGhpcy50aW1lTGlzdC5maW5kKChmYWNlVGltZTogQ2xvY2tGYWNlVGltZSkgPT4gZmFjZVRpbWUudGltZSA9PT0gdGltZSkuZGlzYWJsZWQ7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBnZXROZXh0QXZhaWxhYmxlVGltZShpbmRleDogbnVtYmVyKTogbnVtYmVyIHwgdW5kZWZpbmVkIHtcbiAgICAgICAgY29uc3QgdGltZUNvbGxlY3Rpb24gPSB0aGlzLnRpbWVMaXN0O1xuICAgICAgICBjb25zdCBtYXhWYWx1ZSA9IHRpbWVDb2xsZWN0aW9uLmxlbmd0aDtcbiAgICAgICAgZm9yIChsZXQgaSA9IGluZGV4ICsgMTsgaSA8IG1heFZhbHVlOyBpKyspIHtcbiAgICAgICAgICAgIGNvbnN0IHRpbWUgPSB0aW1lQ29sbGVjdGlvbltpXTtcbiAgICAgICAgICAgIGlmICghdGltZS5kaXNhYmxlZCkge1xuICAgICAgICAgICAgICAgIHJldHVybiB0aW1lLnRpbWU7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBwcml2YXRlIGdldFByZXZBdmFpbGFibGVUaW1lKGluZGV4OiBudW1iZXIpOiBudW1iZXIgfCB1bmRlZmluZWQge1xuICAgICAgICBmb3IgKGxldCBpID0gaW5kZXg7IGkgPj0gMDsgaS0tKSB7XG4gICAgICAgICAgICBjb25zdCB0aW1lID0gdGhpcy50aW1lTGlzdFtpXTtcbiAgICAgICAgICAgIGlmICghdGltZS5kaXNhYmxlZCkge1xuICAgICAgICAgICAgICAgIHJldHVybiB0aW1lLnRpbWU7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBwcml2YXRlIGdldEF2YWlsYWJsZVRpbWUoY3VycmVudFRpbWU6IG51bWJlciwgZm46IChpbmRleDogbnVtYmVyKSA9PiBudW1iZXIgfCB1bmRlZmluZWQpOiBudW1iZXIgfCB1bmRlZmluZWQge1xuICAgICAgICBjb25zdCBjdXJyZW50VGltZUluZGV4ID0gdGhpcy50aW1lTGlzdC5maW5kSW5kZXgodGltZSA9PiB0aW1lLnRpbWUgPT09IGN1cnJlbnRUaW1lKTtcbiAgICAgICAgY29uc3QgYXZhaWxhYmxlVGltZSA9IGZuKGN1cnJlbnRUaW1lSW5kZXgpO1xuXG4gICAgICAgIHJldHVybiBhdmFpbGFibGVUaW1lICE9IG51bGwgPyBhdmFpbGFibGVUaW1lIDogdGhpcy50aW1lO1xuICAgIH1cblxuICAgIHByaXZhdGUgc2V0QXZhaWxhYmxlVGltZSgpOiB2b2lkIHtcbiAgICAgICAgdGhpcy50aW1lID0gdGhpcy50aW1lTGlzdC5maW5kKHQgPT4gIXQuZGlzYWJsZWQpLnRpbWU7XG4gICAgICAgIHRoaXMudGltZUNoYW5nZWQuZW1pdCh0aGlzLnRpbWUpO1xuICAgIH1cbn1cblxuZnVuY3Rpb24gY29uY2F0VGltZShjdXJyZW50VGltZTogc3RyaW5nLCBuZXh0VGltZTogc3RyaW5nKTogbnVtYmVyIHtcbiAgICBjb25zdCBpc051bWJlciA9IC9cXGQvLnRlc3QobmV4dFRpbWUpO1xuXG4gICAgaWYgKGlzTnVtYmVyKSB7XG4gICAgICAgIGNvbnN0IHRpbWUgPSBjdXJyZW50VGltZSArIG5leHRUaW1lO1xuICAgICAgICByZXR1cm4gK3RpbWU7XG4gICAgfVxufVxuXG4iXX0=