import * as tslib_1 from "tslib";
/* tslint:disable:triple-equals */
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { isDigit } from '../../utils/timepicker.utils';
import { TimeParserPipe } from '../../pipes/time-parser.pipe';
var NgxMaterialTimepickerDialControlComponent = /** @class */ (function () {
    function NgxMaterialTimepickerDialControlComponent(timeParserPipe) {
        this.timeParserPipe = timeParserPipe;
        this.timeUnitChanged = new EventEmitter();
        this.timeChanged = new EventEmitter();
        this.focused = new EventEmitter();
        this.unfocused = new EventEmitter();
    }
    Object.defineProperty(NgxMaterialTimepickerDialControlComponent.prototype, "selectedTime", {
        get: function () {
            var _this = this;
            if (!!this.time) {
                return this.timeList.find(function (t) { return t.time === +_this.time; });
            }
        },
        enumerable: true,
        configurable: true
    });
    NgxMaterialTimepickerDialControlComponent.prototype.saveTimeAndChangeTimeUnit = function (event, unit) {
        event.preventDefault();
        this.previousTime = this.time;
        this.timeUnitChanged.next(unit);
        this.focused.next();
    };
    NgxMaterialTimepickerDialControlComponent.prototype.updateTime = function () {
        var time = this.selectedTime;
        if (time) {
            this.timeChanged.next(time);
            this.previousTime = time.time;
        }
    };
    NgxMaterialTimepickerDialControlComponent.prototype.changeTimeByKeyboard = function (e) {
        var char = String.fromCharCode(e.keyCode);
        if (isTimeDisabledToChange(this.time, char, this.timeList)) {
            e.preventDefault();
        }
    };
    NgxMaterialTimepickerDialControlComponent.prototype.onKeydown = function (e) {
        if (!isDigit(e)) {
            e.preventDefault();
        }
        else {
            this.changeTimeByArrow(e.keyCode);
        }
    };
    NgxMaterialTimepickerDialControlComponent.prototype.onModelChange = function (value) {
        this.time = this.timeParserPipe.transform(value, this.timeUnit).toString();
    };
    NgxMaterialTimepickerDialControlComponent.prototype.changeTimeByArrow = function (keyCode) {
        var ARROW_UP = 38;
        var ARROW_DOWN = 40;
        var time;
        if (keyCode === ARROW_UP) {
            time = String(+this.time + (this.minutesGap || 1));
        }
        else if (keyCode === ARROW_DOWN) {
            time = String(+this.time - (this.minutesGap || 1));
        }
        if (!isTimeUnavailable(time, this.timeList)) {
            this.time = time;
            this.updateTime();
        }
    };
    NgxMaterialTimepickerDialControlComponent.ctorParameters = function () { return [
        { type: TimeParserPipe }
    ]; };
    tslib_1.__decorate([
        Input()
    ], NgxMaterialTimepickerDialControlComponent.prototype, "timeList", void 0);
    tslib_1.__decorate([
        Input()
    ], NgxMaterialTimepickerDialControlComponent.prototype, "timeUnit", void 0);
    tslib_1.__decorate([
        Input()
    ], NgxMaterialTimepickerDialControlComponent.prototype, "time", void 0);
    tslib_1.__decorate([
        Input()
    ], NgxMaterialTimepickerDialControlComponent.prototype, "isActive", void 0);
    tslib_1.__decorate([
        Input()
    ], NgxMaterialTimepickerDialControlComponent.prototype, "isEditable", void 0);
    tslib_1.__decorate([
        Input()
    ], NgxMaterialTimepickerDialControlComponent.prototype, "minutesGap", void 0);
    tslib_1.__decorate([
        Input()
    ], NgxMaterialTimepickerDialControlComponent.prototype, "disabled", void 0);
    tslib_1.__decorate([
        Output()
    ], NgxMaterialTimepickerDialControlComponent.prototype, "timeUnitChanged", void 0);
    tslib_1.__decorate([
        Output()
    ], NgxMaterialTimepickerDialControlComponent.prototype, "timeChanged", void 0);
    tslib_1.__decorate([
        Output()
    ], NgxMaterialTimepickerDialControlComponent.prototype, "focused", void 0);
    tslib_1.__decorate([
        Output()
    ], NgxMaterialTimepickerDialControlComponent.prototype, "unfocused", void 0);
    NgxMaterialTimepickerDialControlComponent = tslib_1.__decorate([
        Component({
            selector: 'ngx-material-timepicker-dial-control',
            template: "<!--suppress HtmlFormInputWithoutLabel, HtmlUnknownAttribute -->\n<input class=\"timepicker-dial__control timepicker-dial__item\"\n       [ngClass]=\"{'timepicker-dial__item_active': isActive}\"\n       [ngModel]=\"time | timeLocalizer: timeUnit\"\n       (ngModelChange)=\"time = $event\"\n       [disabled]=\"disabled\"\n       (input)=\"updateTime()\" (focus)=\"saveTimeAndChangeTimeUnit($event, timeUnit)\"\n       readonly [timepickerAutofocus]=\"isActive\"\n       *ngIf=\"!isEditable;else editableTemplate\">\n\n<ng-template #editableTemplate>\n    <!--suppress HtmlFormInputWithoutLabel, HtmlUnknownAttribute -->\n    <input class=\"timepicker-dial__control timepicker-dial__item timepicker-dial__control_editable\"\n           [ngClass]=\"{'timepicker-dial__item_active': isActive}\"\n           [ngModel]=\"time | timeParser: timeUnit | timeLocalizer: timeUnit : true\"\n           (ngModelChange)=\"onModelChange($event)\"\n           [disabled]=\"disabled\"\n           (input)=\"updateTime()\" (focus)=\"saveTimeAndChangeTimeUnit($event, timeUnit)\"\n           [timepickerAutofocus]=\"isActive\" (keydown)=\"onKeydown($event)\" (keypress)=\"changeTimeByKeyboard($event)\">\n</ng-template>\n",
            providers: [TimeParserPipe],
            styles: [".timepicker-dial__item{cursor:pointer;color:rgba(255,255,255,.5);font-family:Roboto,sans-serif}@supports (font-family:var(--primary-font-family)){.timepicker-dial__item{font-family:var(--primary-font-family);color:var(--dial-inactive-color)}}.timepicker-dial__item_active{color:#fff}@supports (color:var(--dial-active-color)){.timepicker-dial__item_active{color:var(--dial-active-color)}}.timepicker-dial__control{border:none;background-color:transparent;font-size:50px;width:60px;padding:0;border-radius:3px;text-align:right}.timepicker-dial__control_editable:focus{color:#00bfff;background-color:#fff;outline:#00bfff}@supports (color:var(--dial-editable-active-color)){.timepicker-dial__control_editable:focus{color:var(--dial-editable-active-color)}}@supports (background-color:var(--dial-editable-background-color)){.timepicker-dial__control_editable:focus{background-color:var(--dial-editable-background-color)}}@supports (outline:var(--dial-editable-active-color)){.timepicker-dial__control_editable:focus{outline:var(--dial-editable-active-color)}}.timepicker-dial__control:disabled{cursor:default}"]
        })
    ], NgxMaterialTimepickerDialControlComponent);
    return NgxMaterialTimepickerDialControlComponent;
}());
export { NgxMaterialTimepickerDialControlComponent };
function isTimeDisabledToChange(currentTime, nextTime, timeList) {
    var isNumber = /\d/.test(nextTime);
    if (isNumber) {
        var time = currentTime + nextTime;
        return isTimeUnavailable(time, timeList);
    }
}
function isTimeUnavailable(time, timeList) {
    var selectedTime = timeList.find(function (value) { return value.time === +time; });
    return !selectedTime || (selectedTime && selectedTime.disabled);
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibmd4LW1hdGVyaWFsLXRpbWVwaWNrZXItZGlhbC1jb250cm9sLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiJuZzovL25neC1tYXRlcmlhbC10aW1lcGlja2VyLyIsInNvdXJjZXMiOlsic3JjL2FwcC9tYXRlcmlhbC10aW1lcGlja2VyL2NvbXBvbmVudHMvdGltZXBpY2tlci1kaWFsLWNvbnRyb2wvbmd4LW1hdGVyaWFsLXRpbWVwaWNrZXItZGlhbC1jb250cm9sLmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUEsa0NBQWtDO0FBQ2xDLE9BQU8sRUFBQyxTQUFTLEVBQUUsWUFBWSxFQUFFLEtBQUssRUFBRSxNQUFNLEVBQUMsTUFBTSxlQUFlLENBQUM7QUFHckUsT0FBTyxFQUFDLE9BQU8sRUFBQyxNQUFNLDhCQUE4QixDQUFDO0FBQ3JELE9BQU8sRUFBQyxjQUFjLEVBQUMsTUFBTSw4QkFBOEIsQ0FBQztBQVE1RDtJQWlCSSxtREFBb0IsY0FBOEI7UUFBOUIsbUJBQWMsR0FBZCxjQUFjLENBQWdCO1FBTHhDLG9CQUFlLEdBQUcsSUFBSSxZQUFZLEVBQVksQ0FBQztRQUMvQyxnQkFBVyxHQUFHLElBQUksWUFBWSxFQUFpQixDQUFDO1FBQ2hELFlBQU8sR0FBRyxJQUFJLFlBQVksRUFBUSxDQUFDO1FBQ25DLGNBQVMsR0FBRyxJQUFJLFlBQVksRUFBUSxDQUFDO0lBRy9DLENBQUM7SUFFRCxzQkFBWSxtRUFBWTthQUF4QjtZQUFBLGlCQUlDO1lBSEcsSUFBSSxDQUFDLENBQUMsSUFBSSxDQUFDLElBQUksRUFBRTtnQkFDYixPQUFPLElBQUksQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLFVBQUEsQ0FBQyxJQUFJLE9BQUEsQ0FBQyxDQUFDLElBQUksS0FBSyxDQUFDLEtBQUksQ0FBQyxJQUFJLEVBQXJCLENBQXFCLENBQUMsQ0FBQzthQUN6RDtRQUNMLENBQUM7OztPQUFBO0lBRUQsNkVBQXlCLEdBQXpCLFVBQTBCLEtBQWlCLEVB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RSxzQ0FBc0M7WUFDaEQsZ3NDQUFrRTtZQUVsRSxTQUFTLEVBQUUsQ0FBQyxjQUFjLENBQUM7O1NBQzlCLENBQUM7T0FDVyx5Q0FBeUMsQ0E4RXJEO0lBQUQsZ0RBQUM7Q0FBQSxBQTlFRCxJQThFQztTQTlFWSx5Q0FBeUM7QUFnRnRELFNBQVMsc0JBQXNCLENBQUMsV0FBbUIsRUFBRSxRQUFnQixFQUFFLFFBQXlCO0lBQzVGLElBQU0sUUFBUSxHQUFHLElBQUksQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLENBQUM7SUFFckMsSUFBSSxRQUFRLEVBQUU7UUFDVixJQUFNLElBQUksR0FBRyxXQUFXLEdBQUcsUUFBUSxDQUFDO1FBQ3BDLE9BQU8saUJBQWlCLENBQUMsSUFBSSxFQUFFLFFBQVEsQ0FBQyxDQUFDO0tBQzVDO0FBQ0wsQ0FBQztBQUVELFNBQVMsaUJBQWlCLENBQUMsSUFBWSxFQUFFLFFBQXlCO0lBQzlELElBQU0sWUFBWSxHQUFHLFFBQVEsQ0FBQyxJQUFJLENBQUMsVUFBQSxLQUFLLElBQUksT0FBQSxLQUFLLENBQUMsSUFBSSxLQUFLLENBQUMsSUFBSSxFQUFwQixDQUFvQixDQUFDLENBQUM7SUFDbEUsT0FBTyxDQUFDLFlBQVksSUFBSSxDQUFDLFlBQVksSUFBSSxZQUFZLENBQUMsUUFBUSxDQUFDLENBQUM7QUFDcEUsQ0FBQyIsInNvdXJjZXNDb250ZW50IjpbIi8qIHRzbGludDpkaXNhYmxlOnRyaXBsZS1lcXVhbHMgKi9cbmltcG9ydCB7Q29tcG9uZW50LCBFdmVudEVtaXR0ZXIsIElucHV0LCBPdXRwdXR9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHtDbG9ja0ZhY2VUaW1lfSBmcm9tICcuLi8uLi9tb2RlbHMvY2xvY2stZmFjZS10aW1lLmludGVyZmFjZSc7XG5pbXBvcnQge1RpbWVVbml0fSBmcm9tICcuLi8uLi9tb2RlbHMvdGltZS11bml0LmVudW0nO1xuaW1wb3J0IHtpc0RpZ2l0fSBmcm9tICcuLi8uLi91dGlscy90aW1lcGlja2VyLnV0aWxzJztcbmltcG9ydCB7VGltZVBhcnNlclBpcGV9IGZyb20gJy4uLy4uL3BpcGVzL3RpbWUtcGFyc2VyLnBpcGUnO1xuXG5AQ29tcG9uZW50KHtcbiAgICBzZWxlY3RvcjogJ25neC1tYXRlcmlhbC10aW1lcGlja2VyLWRpYWwtY29udHJvbCcsXG4gICAgdGVtcGxhdGVVcmw6ICduZ3gtbWF0ZXJpYWwtdGltZXBpY2tlci1kaWFsLWNvbnRyb2wuY29tcG9uZW50Lmh0bWwnLFxuICAgIHN0eWxlVXJsczogWyduZ3gtbWF0ZXJpYWwtdGltZXBpY2tlci1kaWFsLWNvbnRyb2wuY29tcG9uZW50LnNjc3MnXSxcbiAgICBwcm92aWRlcnM6IFtUaW1lUGFyc2VyUGlwZV1cbn0pXG5leHBvcnQgY2xhc3MgTmd4TWF0ZXJpYWxUaW1lcGlja2VyRGlhbENvbnRyb2xDb21wb25lbnQge1xuXG4gICAgcHJldmlvdXNUaW1lOiBudW1iZXIgfCBzdHJpbmc7XG5cbiAgICBASW5wdXQoKSB0aW1lTGlzdDogQ2xvY2tGYWNlVGltZVtdO1xuICAgIEBJbnB1dCgpIHRpbWVVbml0OiBUaW1lVW5pdDtcbiAgICBASW5wdXQoKSB0aW1lOiBzdHJpbmc7XG4gICAgQElucHV0KCkgaXNBY3RpdmU6IGJvb2xlYW47XG4gICAgQElucHV0KCkgaXNFZGl0YWJsZTogYm9vbGVhbjtcbiAgICBASW5wdXQoKSBtaW51dGVzR2FwOiBudW1iZXI7XG4gICAgQElucHV0KCkgZGlzYWJsZWQ6IGJvb2xlYW47XG5cbiAgICBAT3V0cHV0KCkgdGltZVVuaXRDaGFuZ2VkID0gbmV3IEV2ZW50RW1pdHRlcjxUaW1lVW5pdD4oKTtcbiAgICBAT3V0cHV0KCkgdGltZUNoYW5nZWQgPSBuZXcgRXZlbnRFbWl0dGVyPENsb2NrRmFjZVRpbWU+KCk7XG4gICAgQE91dHB1dCgpIGZvY3VzZWQgPSBuZXcgRXZlbnRFbWl0dGVyPG51bGw+KCk7XG4gICAgQE91dHB1dCgpIHVuZm9jdXNlZCA9IG5ldyBFdmVudEVtaXR0ZXI8bnVsbD4oKTtcblxuICAgIGNvbnN0cnVjdG9yKHByaXZhdGUgdGltZVBhcnNlclBpcGU6IFRpbWVQYXJzZXJQaXBlKSB7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBnZXQgc2VsZWN0ZWRUaW1lKCk6IENsb2NrRmFjZVRpbWUge1xuICAgICAgICBpZiAoISF0aGlzLnRpbWUpIHtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLnRpbWVMaXN0LmZpbmQodCA9PiB0LnRpbWUgPT09ICt0aGlzLnRpbWUpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgc2F2ZVRpbWVBbmRDaGFuZ2VUaW1lVW5pdChldmVudDogRm9jdXNFdmVudCwgdW5pdDogVGltZVVuaXQpOiB2b2lkIHtcbiAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgdGhpcy5wcmV2aW91c1RpbWUgPSB0aGlzLnRpbWU7XG4gICAgICAgIHRoaXMudGltZVVuaXRDaGFuZ2VkLm5leHQodW5pdCk7XG4gICAgICAgIHRoaXMuZm9jdXNlZC5uZXh0KCk7XG4gICAgfVxuXG4gICAgdXBkYXRlVGltZSgpOiB2b2lkIHtcbiAgICAgICAgY29uc3QgdGltZSA9IHRoaXMuc2VsZWN0ZWRUaW1lO1xuICAgICAgICBpZiAodGltZSkge1xuICAgICAgICAgICAgdGhpcy50aW1lQ2hhbmdlZC5uZXh0KHRpbWUpO1xuICAgICAgICAgICAgdGhpcy5wcmV2aW91c1RpbWUgPSB0aW1lLnRpbWU7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBjaGFuZ2VUaW1lQnlLZXlib2FyZChlOiBhbnkpOiB2b2lkIHtcbiAgICAgICAgY29uc3QgY2hhciA9IFN0cmluZy5mcm9tQ2hhckNvZGUoZS5rZXlDb2RlKTtcblxuICAgICAgICBpZiAoaXNUaW1lRGlzYWJsZWRUb0NoYW5nZSh0aGlzLnRpbWUsIGNoYXIsIHRoaXMudGltZUxpc3QpKSB7XG4gICAgICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBvbktleWRvd24oZTogYW55KTogdm9pZCB7XG4gICAgICAgIGlmICghaXNEaWdpdChlKSkge1xuICAgICAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgdGhpcy5jaGFuZ2VUaW1lQnlBcnJvdyhlLmtleUNvZGUpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgb25Nb2RlbENoYW5nZSh2YWx1ZTogc3RyaW5nKTogdm9pZCB7XG4gICAgICAgIHRoaXMudGltZSA9IHRoaXMudGltZVBhcnNlclBpcGUudHJhbnNmb3JtKHZhbHVlLCB0aGlzLnRpbWVVbml0KS50b1N0cmluZygpO1xuICAgIH1cblxuICAgIHByaXZhdGUgY2hhbmdlVGltZUJ5QXJyb3coa2V5Q29kZTogbnVtYmVyKTogdm9pZCB7XG4gICAgICAgIGNvbnN0IEFSUk9XX1VQID0gMzg7XG4gICAgICAgIGNvbnN0IEFSUk9XX0RPV04gPSA0MDtcbiAgICAgICAgbGV0IHRpbWU6IHN0cmluZztcblxuICAgICAgICBpZiAoa2V5Q29kZSA9PT0gQVJST1dfVVApIHtcbiAgICAgICAgICAgIHRpbWUgPSBTdHJpbmcoK3RoaXMudGltZSArICh0aGlzLm1pbnV0ZXNHYXAgfHwgMSkpO1xuICAgICAgICB9IGVsc2UgaWYgKGtleUNvZGUgPT09IEFSUk9XX0RPV04pIHtcbiAgICAgICAgICAgIHRpbWUgPSBTdHJpbmcoK3RoaXMudGltZSAtICh0aGlzLm1pbnV0ZXNHYXAgfHwgMSkpO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKCFpc1RpbWVVbmF2YWlsYWJsZSh0aW1lLCB0aGlzLnRpbWVMaXN0KSkge1xuICAgICAgICAgICAgdGhpcy50aW1lID0gdGltZTtcbiAgICAgICAgICAgIHRoaXMudXBkYXRlVGltZSgpO1xuICAgICAgICB9XG4gICAgfVxuXG59XG5cbmZ1bmN0aW9uIGlzVGltZURpc2FibGVkVG9DaGFuZ2UoY3VycmVudFRpbWU6IHN0cmluZywgbmV4dFRpbWU6IHN0cmluZywgdGltZUxpc3Q6IENsb2NrRmFjZVRpbWVbXSk6IGJvb2xlYW4ge1xuICAgIGNvbnN0IGlzTnVtYmVyID0gL1xcZC8udGVzdChuZXh0VGltZSk7XG5cbiAgICBpZiAoaXNOdW1iZXIpIHtcbiAgICAgICAgY29uc3QgdGltZSA9IGN1cnJlbnRUaW1lICsgbmV4dFRpbWU7XG4gICAgICAgIHJldHVybiBpc1RpbWVVbmF2YWlsYWJsZSh0aW1lLCB0aW1lTGlzdCk7XG4gICAgfVxufVxuXG5mdW5jdGlvbiBpc1RpbWVVbmF2YWlsYWJsZSh0aW1lOiBzdHJpbmcsIHRpbWVMaXN0OiBDbG9ja0ZhY2VUaW1lW10pOiBib29sZWFuIHtcbiAgICBjb25zdCBzZWxlY3RlZFRpbWUgPSB0aW1lTGlzdC5maW5kKHZhbHVlID0+IHZhbHVlLnRpbWUgPT09ICt0aW1lKTtcbiAgICByZXR1cm4gIXNlbGVjdGVkVGltZSB8fCAoc2VsZWN0ZWRUaW1lICYmIHNlbGVjdGVkVGltZS5kaXNhYmxlZCk7XG59XG4iXX0=