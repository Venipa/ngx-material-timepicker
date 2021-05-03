import * as tslib_1 from "tslib";
import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { isDigit } from '../../../utils/timepicker.utils';
import { TimeParserPipe } from '../../../pipes/time-parser.pipe';
var NgxTimepickerTimeControlComponent = /** @class */ (function () {
    function NgxTimepickerTimeControlComponent(timeParser) {
        this.timeParser = timeParser;
        this.timeChanged = new EventEmitter();
    }
    NgxTimepickerTimeControlComponent.prototype.ngOnChanges = function (changes) {
        if (changes.timeList && this.time != null) {
            if (this.isSelectedTimeDisabled(this.time)) {
                this.setAvailableTime();
            }
        }
    };
    NgxTimepickerTimeControlComponent.prototype.changeTime = function (event) {
        event.stopPropagation();
        var char = String.fromCharCode(event.keyCode);
        var time = concatTime(String(this.time), char);
        this.changeTimeIfValid(time);
    };
    NgxTimepickerTimeControlComponent.prototype.onKeydown = function (event) {
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
    };
    NgxTimepickerTimeControlComponent.prototype.increase = function () {
        if (!this.disabled) {
            var nextTime = +this.time + 1;
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
    };
    NgxTimepickerTimeControlComponent.prototype.decrease = function () {
        if (!this.disabled) {
            var previousTime = +this.time - 1;
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
    };
    NgxTimepickerTimeControlComponent.prototype.onFocus = function () {
        this.isFocused = true;
        this.previousTime = this.time;
    };
    NgxTimepickerTimeControlComponent.prototype.onBlur = function () {
        this.isFocused = false;
        if (this.previousTime !== this.time) {
            this.changeTimeIfValid(+this.time);
        }
    };
    NgxTimepickerTimeControlComponent.prototype.onModelChange = function (value) {
        this.time = +this.timeParser.transform(value, this.timeUnit);
    };
    NgxTimepickerTimeControlComponent.prototype.changeTimeIfValid = function (value) {
        if (!isNaN(value)) {
            this.time = value;
            if (this.time > this.max) {
                var timeString = String(value);
                this.time = +timeString[timeString.length - 1];
            }
            if (this.time < this.min) {
                this.time = this.min;
            }
            this.timeChanged.emit(this.time);
        }
    };
    NgxTimepickerTimeControlComponent.prototype.isSelectedTimeDisabled = function (time) {
        return this.timeList.find(function (faceTime) { return faceTime.time === time; }).disabled;
    };
    NgxTimepickerTimeControlComponent.prototype.getNextAvailableTime = function (index) {
        var timeCollection = this.timeList;
        var maxValue = timeCollection.length;
        for (var i = index + 1; i < maxValue; i++) {
            var time = timeCollection[i];
            if (!time.disabled) {
                return time.time;
            }
        }
    };
    NgxTimepickerTimeControlComponent.prototype.getPrevAvailableTime = function (index) {
        for (var i = index; i >= 0; i--) {
            var time = this.timeList[i];
            if (!time.disabled) {
                return time.time;
            }
        }
    };
    NgxTimepickerTimeControlComponent.prototype.getAvailableTime = function (currentTime, fn) {
        var currentTimeIndex = this.timeList.findIndex(function (time) { return time.time === currentTime; });
        var availableTime = fn(currentTimeIndex);
        return availableTime != null ? availableTime : this.time;
    };
    NgxTimepickerTimeControlComponent.prototype.setAvailableTime = function () {
        this.time = this.timeList.find(function (t) { return !t.disabled; }).time;
        this.timeChanged.emit(this.time);
    };
    NgxTimepickerTimeControlComponent.ctorParameters = function () { return [
        { type: TimeParserPipe }
    ]; };
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
    return NgxTimepickerTimeControlComponent;
}());
export { NgxTimepickerTimeControlComponent };
function concatTime(currentTime, nextTime) {
    var isNumber = /\d/.test(nextTime);
    if (isNumber) {
        var time = currentTime + nextTime;
        return +time;
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibmd4LXRpbWVwaWNrZXItdGltZS1jb250cm9sLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiJuZzovL25neC1tYXRlcmlhbC10aW1lcGlja2VyLyIsInNvdXJjZXMiOlsic3JjL2FwcC9tYXRlcmlhbC10aW1lcGlja2VyL2NvbXBvbmVudHMvdGltZXBpY2tlci1maWVsZC90aW1lcGlja2VyLXRpbWUtY29udHJvbC9uZ3gtdGltZXBpY2tlci10aW1lLWNvbnRyb2wuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxPQUFPLEVBQUUsdUJBQXVCLEVBQUUsU0FBUyxFQUFFLFlBQVksRUFBRSxLQUFLLEVBQWEsTUFBTSxFQUFpQixNQUFNLGVBQWUsQ0FBQztBQUMxSCxPQUFPLEVBQUUsT0FBTyxFQUFFLE1BQU0saUNBQWlDLENBQUM7QUFFMUQsT0FBTyxFQUFFLGNBQWMsRUFBRSxNQUFNLGlDQUFpQyxDQUFDO0FBV2pFO0lBaUJJLDJDQUFvQixVQUEwQjtRQUExQixlQUFVLEdBQVYsVUFBVSxDQUFnQjtRQU5wQyxnQkFBVyxHQUFHLElBQUksWUFBWSxFQUFVLENBQUM7SUFPbkQsQ0FBQztJQUVELHVEQUFXLEdBQVgsVUFBWSxPQUFzQjtRQUM5QixJQUFJLE9BQU8sQ0FBQyxRQUFRLElBQUksSUFBSSxDQUFDLElBQUksSUFBSSxJQUFJLEVBQUU7WUFDdkMsSUFBSSxJQUFJLENBQUMsc0JBQXNCLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxFQUFFO2dCQUN4QyxJQUFJLENBQUMsZ0JBQWdCLEVBQUUsQ0FBQzthQUMzQjtTQUNKO0lBQ0wsQ0FBQztJQUVELHNEQUFVLEdBQVYsVUFBVyxLQUFVO1FBQ2pCLEtBQUssQ0FBQyxlQUFlLEVBQUUsQ0FBQztRQUV4QixJQUFNLElBQUksR0FBRyxNQUFNLENBQUMsWUFBWSxDQUFDLEtBQUssQ0FBQyxPQUFPLENBQUMsQ0FBQztRQUNoRCxJQUFNLElBQUksR0FBRyxVQUFVLENBQUMsTUFBTSxDQUFD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YTtJQUNaO1FBQVIsS0FBSyxFQUFFO2tFQUFhO0lBQ1o7UUFBUixLQUFLLEVBQUU7MEVBQXFCO0lBQ3BCO1FBQVIsS0FBSyxFQUFFO3VFQUFvQjtJQUNuQjtRQUFSLEtBQUssRUFBRTt1RUFBbUI7SUFDbEI7UUFBUixLQUFLLEVBQUU7dUVBQTJCO0lBQzFCO1FBQVIsS0FBSyxFQUFFOzRFQUF3QjtJQUV0QjtRQUFULE1BQU0sRUFBRTswRUFBMEM7SUFYMUMsaUNBQWlDO1FBUjdDLFNBQVMsQ0FBQztZQUNQLFFBQVEsRUFBRSw2QkFBNkI7WUFDdkMsODhCQUEyRDtZQUUzRCxlQUFlLEVBQUUsdUJBQXVCLENBQUMsTUFBTTtZQUMvQyxTQUFTLEVBQUUsQ0FBQyxjQUFjLENBQUM7O1NBQzlCLENBQUM7T0FFVyxpQ0FBaUMsQ0FtSzdDO0lBQUQsd0NBQUM7Q0FBQSxBQW5LRCxJQW1LQztTQW5LWSxpQ0FBaUM7QUFxSzlDLFNBQVMsVUFBVSxDQUFDLFdBQW1CLEVBQUUsUUFBZ0I7SUFDckQsSUFBTSxRQUFRLEdBQUcsSUFBSSxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQztJQUVyQyxJQUFJLFFBQVEsRUFBRTtRQUNWLElBQU0sSUFBSSxHQUFHLFdBQVcsR0FBRyxRQUFRLENBQUM7UUFDcEMsT0FBTyxDQUFDLElBQUksQ0FBQztLQUNoQjtBQUNMLENBQUMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneSwgQ29tcG9uZW50LCBFdmVudEVtaXR0ZXIsIElucHV0LCBPbkNoYW5nZXMsIE91dHB1dCwgU2ltcGxlQ2hhbmdlcyB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgaXNEaWdpdCB9IGZyb20gJy4uLy4uLy4uL3V0aWxzL3RpbWVwaWNrZXIudXRpbHMnO1xuaW1wb3J0IHsgVGltZVVuaXQgfSBmcm9tICcuLi8uLi8uLi9tb2RlbHMvdGltZS11bml0LmVudW0nO1xuaW1wb3J0IHsgVGltZVBhcnNlclBpcGUgfSBmcm9tICcuLi8uLi8uLi9waXBlcy90aW1lLXBhcnNlci5waXBlJztcbmltcG9ydCB7IENsb2NrRmFjZVRpbWUgfSBmcm9tICcuLi8uLi8uLi9tb2RlbHMvY2xvY2stZmFjZS10aW1lLmludGVyZmFjZSc7XG5cbkBDb21wb25lbnQoe1xuICAgIHNlbGVjdG9yOiAnbmd4LXRpbWVwaWNrZXItdGltZS1jb250cm9sJyxcbiAgICB0ZW1wbGF0ZVVybDogJy4vbmd4LXRpbWVwaWNrZXItdGltZS1jb250cm9sLmNvbXBvbmVudC5odG1sJyxcbiAgICBzdHlsZVVybHM6IFsnLi9uZ3gtdGltZXBpY2tlci10aW1lLWNvbnRyb2wuY29tcG9uZW50LnNjc3MnXSxcbiAgICBjaGFuZ2VEZXRlY3Rpb246IENoYW5nZURldGVjdGlvblN0cmF0ZWd5Lk9uUHVzaCxcbiAgICBwcm92aWRlcnM6IFtUaW1lUGFyc2VyUGlwZV1cbn0pXG5cbmV4cG9ydCBjbGFzcyBOZ3hUaW1lcGlja2VyVGltZUNvbnRyb2xDb21wb25lbnQgaW1wbGVtZW50cyBPbkNoYW5nZXMge1xuXG4gICAgQElucHV0KCkgdGltZTogbnVtYmVyO1xuICAgIEBJbnB1dCgpIG1pbjogbnVtYmVyO1xuICAgIEBJbnB1dCgpIG1heDogbnVtYmVyO1xuICAgIEBJbnB1dCgpIHBsYWNlaG9sZGVyOiBzdHJpbmc7XG4gICAgQElucHV0KCkgdGltZVVuaXQ6IFRpbWVVbml0O1xuICAgIEBJbnB1dCgpIGRpc2FibGVkOiBib29sZWFuO1xuICAgIEBJbnB1dCgpIHRpbWVMaXN0OiBDbG9ja0ZhY2VUaW1lW107XG4gICAgQElucHV0KCkgcHJldmVudFR5cGluZzogYm9vbGVhbjtcblxuICAgIEBPdXRwdXQoKSB0aW1lQ2hhbmdlZCA9IG5ldyBFdmVudEVtaXR0ZXI8bnVtYmVyPigpO1xuXG4gICAgaXNGb2N1c2VkOiBib29sZWFuO1xuXG4gICAgcHJpdmF0ZSBwcmV2aW91c1RpbWU6IG51bWJlcjtcblxuICAgIGNvbnN0cnVjdG9yKHByaXZhdGUgdGltZVBhcnNlcjogVGltZVBhcnNlclBpcGUpIHtcbiAgICB9XG5cbiAgICBuZ09uQ2hhbmdlcyhjaGFuZ2VzOiBTaW1wbGVDaGFuZ2VzKTogdm9pZCB7XG4gICAgICAgIGlmIChjaGFuZ2VzLnRpbWVMaXN0ICYmIHRoaXMudGltZSAhPSBudWxsKSB7XG4gICAgICAgICAgICBpZiAodGhpcy5pc1NlbGVjdGVkVGltZURpc2FibGVkKHRoaXMudGltZSkpIHtcbiAgICAgICAgICAgICAgICB0aGlzLnNldEF2YWlsYWJsZVRpbWUoKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cblxuICAgIGNoYW5nZVRpbWUoZXZlbnQ6IGFueSk6IHZvaWQge1xuICAgICAgICBldmVudC5zdG9wUHJvcGFnYXRpb24oKTtcblxuICAgICAgICBjb25zdCBjaGFyID0gU3RyaW5nLmZyb21DaGFyQ29kZShldmVudC5rZXlDb2RlKTtcbiAgICAgICAgY29uc3QgdGltZSA9IGNvbmNhdFRpbWUoU3RyaW5nKHRoaXMudGltZSksIGNoYXIpO1xuXG4gICAgICAgIHRoaXMuY2hhbmdlVGltZUlmVmFsaWQodGltZSk7XG4gICAgfVxuXG4gICAgb25LZXlkb3duKGV2ZW50OiBhbnkpOiB2b2lkIHtcbiAgICAgICAgZXZlbnQuc3RvcFByb3BhZ2F0aW9uKCk7XG5cbiAgICAgICAgaWYgKCFpc0RpZ2l0KGV2ZW50KSkge1xuICAgICAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHN3aXRjaCAoZXZlbnQua2V5KSB7XG4gICAgICAgICAgICBjYXNlICdBcnJvd1VwJzpcbiAgICAgICAgICAgICAgICB0aGlzLmluY3JlYXNlKCk7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBjYXNlICdBcnJvd0Rvd24nOlxuICAgICAgICAgICAgICAgIHRoaXMuZGVjcmVhc2UoKTtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgfVxuXG4gICAgICAgIGlmICh0aGlzLnByZXZlbnRUeXBpbmcgJiYgZXZlbnQua2V5ICE9PSAnVGFiJykge1xuICAgICAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGluY3JlYXNlKCk6IHZvaWQge1xuICAgICAgICBpZiAoIXRoaXMuZGlzYWJsZWQpIHtcbiAgICAgICAgICAgIGxldCBuZXh0VGltZSA9ICt0aGlzLnRpbWUgKyAxO1xuXG4gICAgICAgICAgICBpZiAobmV4dFRpbWUgPiB0aGlzLm1heCkge1xuICAgICAgICAgICAgICAgIG5leHRUaW1lID0gdGhpcy5taW47XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGlmICh0aGlzLmlzU2VsZWN0ZWRUaW1lRGlzYWJsZWQobmV4dFRpbWUpKSB7XG4gICAgICAgICAgICAgICAgbmV4dFRpbWUgPSB0aGlzLmdldEF2YWlsYWJsZVRpbWUobmV4dFRpbWUsIHRoaXMuZ2V0TmV4dEF2YWlsYWJsZVRpbWUuYmluZCh0aGlzKSk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGlmIChuZXh0VGltZSAhPT0gdGhpcy50aW1lKSB7XG4gICAgICAgICAgICAgICAgdGhpcy50aW1lQ2hhbmdlZC5lbWl0KG5leHRUaW1lKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cblxuICAgIGRlY3JlYXNlKCk6IHZvaWQge1xuICAgICAgICBpZiAoIXRoaXMuZGlzYWJsZWQpIHtcbiAgICAgICAgICAgIGxldCBwcmV2aW91c1RpbWUgPSArdGhpcy50aW1lIC0gMTtcblxuICAgICAgICAgICAgaWYgKHByZXZpb3VzVGltZSA8IHRoaXMubWluKSB7XG4gICAgICAgICAgICAgICAgcHJldmlvdXNUaW1lID0gdGhpcy5tYXg7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGlmICh0aGlzLmlzU2VsZWN0ZWRUaW1lRGlzYWJsZWQocHJldmlvdXNUaW1lKSkge1xuICAgICAgICAgICAgICAgIHByZXZpb3VzVGltZSA9IHRoaXMuZ2V0QXZhaWxhYmxlVGltZShwcmV2aW91c1RpbWUsIHRoaXMuZ2V0UHJldkF2YWlsYWJsZVRpbWUuYmluZCh0aGlzKSk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGlmIChwcmV2aW91c1RpbWUgIT09IHRoaXMudGltZSkge1xuICAgICAgICAgICAgICAgIHRoaXMudGltZUNoYW5nZWQuZW1pdChwcmV2aW91c1RpbWUpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuXG4gICAgb25Gb2N1cygpOiB2b2lkIHtcbiAgICAgICAgdGhpcy5pc0ZvY3VzZWQgPSB0cnVlO1xuICAgICAgICB0aGlzLnByZXZpb3VzVGltZSA9IHRoaXMudGltZTtcbiAgICB9XG5cbiAgICBvbkJsdXIoKTogdm9pZCB7XG4gICAgICAgIHRoaXMuaXNGb2N1c2VkID0gZmFsc2U7XG5cbiAgICAgICAgaWYgKHRoaXMucHJldmlvdXNUaW1lICE9PSB0aGlzLnRpbWUpIHtcbiAgICAgICAgICAgIHRoaXMuY2hhbmdlVGltZUlmVmFsaWQoK3RoaXMudGltZSk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBvbk1vZGVsQ2hhbmdlKHZhbHVlOiBzdHJpbmcpOiB2b2lkIHtcbiAgICAgICAgdGhpcy50aW1lID0gK3RoaXMudGltZVBhcnNlci50cmFuc2Zvcm0odmFsdWUsIHRoaXMudGltZVVuaXQpO1xuICAgIH1cblxuICAgIHByaXZhdGUgY2hhbmdlVGltZUlmVmFsaWQodmFsdWU6IG51bWJlciB8IHVuZGVmaW5lZCkge1xuICAgICAgICBpZiAoIWlzTmFOKHZhbHVlKSkge1xuICAgICAgICAgICAgdGhpcy50aW1lID0gdmFsdWU7XG5cbiAgICAgICAgICAgIGlmICh0aGlzLnRpbWUgPiB0aGlzLm1heCkge1xuICAgICAgICAgICAgICAgIGNvbnN0IHRpbWVTdHJpbmcgPSBTdHJpbmcodmFsdWUpO1xuICAgICAgICAgICAgICAgIHRoaXMudGltZSA9ICt0aW1lU3RyaW5nW3RpbWVTdHJpbmcubGVuZ3RoIC0gMV07XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGlmICh0aGlzLnRpbWUgPCB0aGlzLm1pbikge1xuICAgICAgICAgICAgICAgIHRoaXMudGltZSA9IHRoaXMubWluO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICB0aGlzLnRpbWVDaGFuZ2VkLmVtaXQodGhpcy50aW1lKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHByaXZhdGUgaXNTZWxlY3RlZFRpbWVEaXNhYmxlZCh0aW1lOiBudW1iZXIpOiBib29sZWFuIHtcbiAgICAgICAgcmV0dXJuIHRoaXMudGltZUxpc3QuZmluZCgoZmFjZVRpbWU6IENsb2NrRmFjZVRpbWUpID0+IGZhY2VUaW1lLnRpbWUgPT09IHRpbWUpLmRpc2FibGVkO1xuICAgIH1cblxuICAgIHByaXZhdGUgZ2V0TmV4dEF2YWlsYWJsZVRpbWUoaW5kZXg6IG51bWJlcik6IG51bWJlciB8IHVuZGVmaW5lZCB7XG4gICAgICAgIGNvbnN0IHRpbWVDb2xsZWN0aW9uID0gdGhpcy50aW1lTGlzdDtcbiAgICAgICAgY29uc3QgbWF4VmFsdWUgPSB0aW1lQ29sbGVjdGlvbi5sZW5ndGg7XG4gICAgICAgIGZvciAobGV0IGkgPSBpbmRleCArIDE7IGkgPCBtYXhWYWx1ZTsgaSsrKSB7XG4gICAgICAgICAgICBjb25zdCB0aW1lID0gdGltZUNvbGxlY3Rpb25baV07XG4gICAgICAgICAgICBpZiAoIXRpbWUuZGlzYWJsZWQpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gdGltZS50aW1lO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBnZXRQcmV2QXZhaWxhYmxlVGltZShpbmRleDogbnVtYmVyKTogbnVtYmVyIHwgdW5kZWZpbmVkIHtcbiAgICAgICAgZm9yIChsZXQgaSA9IGluZGV4OyBpID49IDA7IGktLSkge1xuICAgICAgICAgICAgY29uc3QgdGltZSA9IHRoaXMudGltZUxpc3RbaV07XG4gICAgICAgICAgICBpZiAoIXRpbWUuZGlzYWJsZWQpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gdGltZS50aW1lO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBnZXRBdmFpbGFibGVUaW1lKGN1cnJlbnRUaW1lOiBudW1iZXIsIGZuOiAoaW5kZXg6IG51bWJlcikgPT4gbnVtYmVyIHwgdW5kZWZpbmVkKTogbnVtYmVyIHwgdW5kZWZpbmVkIHtcbiAgICAgICAgY29uc3QgY3VycmVudFRpbWVJbmRleCA9IHRoaXMudGltZUxpc3QuZmluZEluZGV4KHRpbWUgPT4gdGltZS50aW1lID09PSBjdXJyZW50VGltZSk7XG4gICAgICAgIGNvbnN0IGF2YWlsYWJsZVRpbWUgPSBmbihjdXJyZW50VGltZUluZGV4KTtcblxuICAgICAgICByZXR1cm4gYXZhaWxhYmxlVGltZSAhPSBudWxsID8gYXZhaWxhYmxlVGltZSA6IHRoaXMudGltZTtcbiAgICB9XG5cbiAgICBwcml2YXRlIHNldEF2YWlsYWJsZVRpbWUoKTogdm9pZCB7XG4gICAgICAgIHRoaXMudGltZSA9IHRoaXMudGltZUxpc3QuZmluZCh0ID0+ICF0LmRpc2FibGVkKS50aW1lO1xuICAgICAgICB0aGlzLnRpbWVDaGFuZ2VkLmVtaXQodGhpcy50aW1lKTtcbiAgICB9XG59XG5cbmZ1bmN0aW9uIGNvbmNhdFRpbWUoY3VycmVudFRpbWU6IHN0cmluZywgbmV4dFRpbWU6IHN0cmluZyk6IG51bWJlciB7XG4gICAgY29uc3QgaXNOdW1iZXIgPSAvXFxkLy50ZXN0KG5leHRUaW1lKTtcblxuICAgIGlmIChpc051bWJlcikge1xuICAgICAgICBjb25zdCB0aW1lID0gY3VycmVudFRpbWUgKyBuZXh0VGltZTtcbiAgICAgICAgcmV0dXJuICt0aW1lO1xuICAgIH1cbn1cblxuIl19