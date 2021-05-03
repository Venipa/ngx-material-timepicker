import * as tslib_1 from "tslib";
import { Directive, HostListener, Input } from '@angular/core';
import { NgxMaterialTimepickerEventService } from '../services/ngx-material-timepicker-event.service';
let OverlayDirective = class OverlayDirective {
    constructor(eventService) {
        this.eventService = eventService;
    }
    onClick(e) {
        if (!this.preventClick) {
            this.eventService.dispatchEvent(e);
        }
        e.preventDefault();
    }
};
OverlayDirective.ctorParameters = () => [
    { type: NgxMaterialTimepickerEventService }
];
tslib_1.__decorate([
    Input('overlay')
], OverlayDirective.prototype, "preventClick", void 0);
tslib_1.__decorate([
    HostListener('click', ['$event'])
], OverlayDirective.prototype, "onClick", null);
OverlayDirective = tslib_1.__decorate([
    Directive({
        selector: '[overlay]'
    })
], OverlayDirective);
export { OverlayDirective };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoib3ZlcmxheS5kaXJlY3RpdmUuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9uZ3gtbWF0ZXJpYWwtdGltZXBpY2tlci8iLCJzb3VyY2VzIjpbInNyYy9hcHAvbWF0ZXJpYWwtdGltZXBpY2tlci9kaXJlY3RpdmVzL292ZXJsYXkuZGlyZWN0aXZlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxPQUFPLEVBQUUsU0FBUyxFQUFFLFlBQVksRUFBRSxLQUFLLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDL0QsT0FBTyxFQUFDLGlDQUFpQyxFQUFDLE1BQU0sbURBQW1ELENBQUM7QUFLcEcsSUFBYSxnQkFBZ0IsR0FBN0IsTUFBYSxnQkFBZ0I7SUFJekIsWUFBb0IsWUFBK0M7UUFBL0MsaUJBQVksR0FBWixZQUFZLENBQW1DO0lBQ25FLENBQUM7SUFJRCxPQUFPLENBQUMsQ0FBTTtRQUNWLElBQUksQ0FBQyxJQUFJLENBQUMsWUFBWSxFQUFFO1lBQ3BCLElBQUksQ0FBQyxZQUFZLENBQUMsYUFBYSxDQUFDLENBQUMsQ0FBQyxDQUFDO1NBQ3RDO1FBQ0QsQ0FBQyxDQUFDLGNBQWMsRUFBRSxDQUFDO0lBQ3ZCLENBQUM7Q0FFSixDQUFBOztZQVpxQyxpQ0FBaUM7O0FBRmpEO0lBQWpCLEtBQUssQ0FBQyxTQUFTLENBQUM7c0RBQXVCO0FBT3hDO0lBREMsWUFBWSxDQUFDLE9BQU8sRUFBRSxDQUFDLFFBQVEsQ0FBQyxDQUFDOytDQU1qQztBQWRRLGdCQUFnQjtJQUg1QixTQUFTLENBQUM7UUFDUCxRQUFRLEVBQUUsV0FBVztLQUN4QixDQUFDO0dBQ1csZ0JBQWdCLENBZ0I1QjtTQWhCWSxnQkFBZ0IiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBEaXJlY3RpdmUsIEhvc3RMaXN0ZW5lciwgSW5wdXQgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7Tmd4TWF0ZXJpYWxUaW1lcGlja2VyRXZlbnRTZXJ2aWNlfSBmcm9tICcuLi9zZXJ2aWNlcy9uZ3gtbWF0ZXJpYWwtdGltZXBpY2tlci1ldmVudC5zZXJ2aWNlJztcblxuQERpcmVjdGl2ZSh7XG4gICAgc2VsZWN0b3I6ICdbb3ZlcmxheV0nXG59KVxuZXhwb3J0IGNsYXNzIE92ZXJsYXlEaXJlY3RpdmUge1xuXG4gICAgQElucHV0KCdvdmVybGF5JykgcHJldmVudENsaWNrOiBib29sZWFuO1xuXG4gICAgY29uc3RydWN0b3IocHJpdmF0ZSBldmVudFNlcnZpY2U6IE5neE1hdGVyaWFsVGltZXBpY2tlckV2ZW50U2VydmljZSkge1xuICAgIH1cblxuXG4gICAgQEhvc3RMaXN0ZW5lcignY2xpY2snLCBbJyRldmVudCddKVxuICAgIG9uQ2xpY2soZTogYW55KSB7XG4gICAgICAgIGlmICghdGhpcy5wcmV2ZW50Q2xpY2spIHtcbiAgICAgICAgICAgIHRoaXMuZXZlbnRTZXJ2aWNlLmRpc3BhdGNoRXZlbnQoZSk7XG4gICAgICAgIH1cbiAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAgIH1cblxufVxuIl19