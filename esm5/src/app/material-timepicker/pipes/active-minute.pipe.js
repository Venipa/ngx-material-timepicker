import * as tslib_1 from "tslib";
import { Pipe } from '@angular/core';
var ActiveMinutePipe = /** @class */ (function () {
    function ActiveMinutePipe() {
    }
    ActiveMinutePipe.prototype.transform = function (minute, currentMinute, gap, isClockFaceDisabled) {
        if (minute == null || isClockFaceDisabled) {
            return false;
        }
        var defaultGap = 5;
        return ((currentMinute === minute) && (minute % (gap || defaultGap) === 0));
    };
    ActiveMinutePipe = tslib_1.__decorate([
        Pipe({
            name: 'activeMinute'
        })
    ], ActiveMinutePipe);
    return ActiveMinutePipe;
}());
export { ActiveMinutePipe };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYWN0aXZlLW1pbnV0ZS5waXBlLmpzIiwic291cmNlUm9vdCI6Im5nOi8vbmd4LW1hdGVyaWFsLXRpbWVwaWNrZXIvIiwic291cmNlcyI6WyJzcmMvYXBwL21hdGVyaWFsLXRpbWVwaWNrZXIvcGlwZXMvYWN0aXZlLW1pbnV0ZS5waXBlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxPQUFPLEVBQUUsSUFBSSxFQUFpQixNQUFNLGVBQWUsQ0FBQztBQUtwRDtJQUFBO0lBV0EsQ0FBQztJQVRHLG9DQUFTLEdBQVQsVUFBVSxNQUFjLEVBQUUsYUFBcUIsRUFBRSxHQUFXLEVBQUUsbUJBQTRCO1FBQ3RGLElBQUksTUFBTSxJQUFJLElBQUksSUFBSSxtQkFBbUIsRUFBRTtZQUN2QyxPQUFPLEtBQUssQ0FBQztTQUNoQjtRQUNELElBQU0sVUFBVSxHQUFHLENBQUMsQ0FBQztRQUVyQixPQUFPLENBQUMsQ0FBQyxhQUFhLEtBQUssTUFBTSxDQUFDLElBQUksQ0FBQyxNQUFNLEdBQUcsQ0FBQyxHQUFHLElBQUksVUFBVSxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQztJQUNoRixDQUFDO0lBVFEsZ0JBQWdCO1FBSDVCLElBQUksQ0FBQztZQUNGLElBQUksRUFBRSxjQUFjO1NBQ3ZCLENBQUM7T0FDVyxnQkFBZ0IsQ0FXNUI7SUFBRCx1QkFBQztDQUFBLEFBWEQsSUFXQztTQVhZLGdCQUFnQiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IFBpcGUsIFBpcGVUcmFuc2Zvcm0gfSBmcm9tICdAYW5ndWxhci9jb3JlJztcblxuQFBpcGUoe1xuICAgIG5hbWU6ICdhY3RpdmVNaW51dGUnXG59KVxuZXhwb3J0IGNsYXNzIEFjdGl2ZU1pbnV0ZVBpcGUgaW1wbGVtZW50cyBQaXBlVHJhbnNmb3JtIHtcblxuICAgIHRyYW5zZm9ybShtaW51dGU6IG51bWJlciwgY3VycmVudE1pbnV0ZTogbnVtYmVyLCBnYXA6IG51bWJlciwgaXNDbG9ja0ZhY2VEaXNhYmxlZDogYm9vbGVhbik6IGJvb2xlYW4ge1xuICAgICAgICBpZiAobWludXRlID09IG51bGwgfHwgaXNDbG9ja0ZhY2VEaXNhYmxlZCkge1xuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICB9XG4gICAgICAgIGNvbnN0IGRlZmF1bHRHYXAgPSA1O1xuXG4gICAgICAgIHJldHVybiAoKGN1cnJlbnRNaW51dGUgPT09IG1pbnV0ZSkgJiYgKG1pbnV0ZSAlIChnYXAgfHwgZGVmYXVsdEdhcCkgPT09IDApKTtcbiAgICB9XG5cbn1cbiJdfQ==