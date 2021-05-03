import * as tslib_1 from "tslib";
import { Component, ContentChild, Input } from '@angular/core';
import { NgxMaterialTimepickerToggleIconDirective } from '../../directives/ngx-material-timepicker-toggle-icon.directive';
var NgxMaterialTimepickerToggleComponent = /** @class */ (function () {
    function NgxMaterialTimepickerToggleComponent() {
    }
    Object.defineProperty(NgxMaterialTimepickerToggleComponent.prototype, "disabled", {
        get: function () {
            return this._disabled === undefined ? this.timepicker.disabled : this._disabled;
        },
        set: function (value) {
            this._disabled = value;
        },
        enumerable: true,
        configurable: true
    });
    NgxMaterialTimepickerToggleComponent.prototype.open = function (event) {
        if (this.timepicker) {
            this.timepicker.open();
            event.stopPropagation();
        }
    };
    tslib_1.__decorate([
        Input('for')
    ], NgxMaterialTimepickerToggleComponent.prototype, "timepicker", void 0);
    tslib_1.__decorate([
        Input()
    ], NgxMaterialTimepickerToggleComponent.prototype, "disabled", null);
    tslib_1.__decorate([
        ContentChild(NgxMaterialTimepickerToggleIconDirective, { static: true })
    ], NgxMaterialTimepickerToggleComponent.prototype, "customIcon", void 0);
    NgxMaterialTimepickerToggleComponent = tslib_1.__decorate([
        Component({
            selector: 'ngx-material-timepicker-toggle',
            template: "<button class=\"ngx-material-timepicker-toggle\" (click)=\"open($event)\" [disabled]=\"disabled\" type=\"button\">\n    <svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 24 24\" width=\"24px\" height=\"24px\" *ngIf=\"!customIcon\">\n        <path\n            d=\"M 12 2 C 6.4889971 2 2 6.4889971 2 12 C 2 17.511003                   6.4889971 22 12 22 C 17.511003 22 22 17.511003 22 12 C 22 6.4889971 17.511003 2 12 2 z M 12 4 C 16.430123 4 20 7.5698774 20 12 C 20 16.430123 16.430123 20 12 20 C 7.5698774 20 4 16.430123 4 12 C 4 7.5698774 7.5698774 4 12 4 z M 11 6 L 11 12.414062 L 15.292969 16.707031 L 16.707031 15.292969 L 13 11.585938 L 13 6 L 11 6 z\"/>\n    </svg>\n\n    <ng-content select=\"[ngxMaterialTimepickerToggleIcon]\"></ng-content>\n</button>\n",
            styles: [".ngx-material-timepicker-toggle{display:flex;justify-content:center;align-items:center;padding:4px;background-color:transparent;border-radius:50%;text-align:center;border:none;outline:0;-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none;transition:background-color .3s;cursor:pointer}.ngx-material-timepicker-toggle:focus{background-color:rgba(0,0,0,.07)}"]
        })
    ], NgxMaterialTimepickerToggleComponent);
    return NgxMaterialTimepickerToggleComponent;
}());
export { NgxMaterialTimepickerToggleComponent };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibmd4LW1hdGVyaWFsLXRpbWVwaWNrZXItdG9nZ2xlLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiJuZzovL25neC1tYXRlcmlhbC10aW1lcGlja2VyLyIsInNvdXJjZXMiOlsic3JjL2FwcC9tYXRlcmlhbC10aW1lcGlja2VyL2NvbXBvbmVudHMvdGltZXBpY2tlci10b2dnbGUtYnV0dG9uL25neC1tYXRlcmlhbC10aW1lcGlja2VyLXRvZ2dsZS5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLE9BQU8sRUFBQyxTQUFTLEVBQUUsWUFBWSxFQUFFLEtBQUssRUFBQyxNQUFNLGVBQWUsQ0FBQztBQUM3RCxPQUFPLEVBQUMsd0NBQXdDLEVBQUMsTUFBTSxnRUFBZ0UsQ0FBQztBQVN4SDtJQUFBO0lBdUJBLENBQUM7SUFsQkcsc0JBQUksMERBQVE7YUFBWjtZQUNJLE9BQU8sSUFBSSxDQUFDLFNBQVMsS0FBSyxTQUFTLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxVQUFVLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDO1FBQ3BGLENBQUM7YUFFRCxVQUFhLEtBQWM7WUFDdkIsSUFBSSxDQUFDLFNBQVMsR0FBRyxLQUFLLENBQUM7UUFDM0IsQ0FBQzs7O09BSkE7SUFVRCxtREFBSSxHQUFKLFVBQUssS0FBSztRQUNOLElBQUksSUFBSSxDQUFDLFVBQVUsRUFBRTtZQUNqQixJQUFJLENBQUMsVUFBVSxDQUFDLElBQUksRUFBRSxDQUFDO1lBQ3ZCLEtBQUssQ0FBQyxlQUFlLEVBQUUsQ0FBQztTQUMzQjtJQUNMLENBQUM7SUFwQmE7UUFBYixLQUFLLENBQUMsS0FBSyxDQUFDOzRFQUE0QztJQUd6RDtRQURDLEtBQUssRUFBRTt3RUFHUDtJQVF1RTtRQUF2RSxZQUFZLENBQUMsd0NBQXdDLEVBQUUsRUFBQyxNQUFNLEVBQUUsSUFBSSxFQUFDLENBQUM7NEVBQXNEO0lBZnBILG9DQUFvQztRQU5oRCxTQUFTLENBQUM7WUFDUCxRQUFRLEVBQUUsZ0NBQWdDO1lBQzFDLDZ3QkFBNEQ7O1NBRS9ELENBQUM7T0FFVyxvQ0FBb0MsQ0F1QmhEO0lBQUQsMkNBQUM7Q0FBQSxBQXZCRCxJQXVCQztTQXZCWSxvQ0FBb0MiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge0NvbXBvbmVudCwgQ29udGVudENoaWxkLCBJbnB1dH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQge05neE1hdGVyaWFsVGltZXBpY2tlclRvZ2dsZUljb25EaXJlY3RpdmV9IGZyb20gJy4uLy4uL2RpcmVjdGl2ZXMvbmd4LW1hdGVyaWFsLXRpbWVwaWNrZXItdG9nZ2xlLWljb24uZGlyZWN0aXZlJztcbmltcG9ydCB7Tmd4TWF0ZXJpYWxUaW1lcGlja2VyQ29tcG9uZW50fSBmcm9tICcuLi8uLi9uZ3gtbWF0ZXJpYWwtdGltZXBpY2tlci5jb21wb25lbnQnO1xuXG5AQ29tcG9uZW50KHtcbiAgICBzZWxlY3RvcjogJ25neC1tYXRlcmlhbC10aW1lcGlja2VyLXRvZ2dsZScsXG4gICAgdGVtcGxhdGVVcmw6ICduZ3gtbWF0ZXJpYWwtdGltZXBpY2tlci10b2dnbGUuY29tcG9uZW50Lmh0bWwnLFxuICAgIHN0eWxlVXJsczogWyduZ3gtbWF0ZXJpYWwtdGltZXBpY2tlci10b2dnbGUuY29tcG9uZW50LnNjc3MnXVxufSlcblxuZXhwb3J0IGNsYXNzIE5neE1hdGVyaWFsVGltZXBpY2tlclRvZ2dsZUNvbXBvbmVudCB7XG5cbiAgICBASW5wdXQoJ2ZvcicpIHRpbWVwaWNrZXI6IE5neE1hdGVyaWFsVGltZXBpY2tlckNvbXBvbmVudDtcblxuICAgIEBJbnB1dCgpXG4gICAgZ2V0IGRpc2FibGVkKCk6IGJvb2xlYW4ge1xuICAgICAgICByZXR1cm4gdGhpcy5fZGlzYWJsZWQgPT09IHVuZGVmaW5lZCA/IHRoaXMudGltZXBpY2tlci5kaXNhYmxlZCA6IHRoaXMuX2Rpc2FibGVkO1xuICAgIH1cblxuICAgIHNldCBkaXNhYmxlZCh2YWx1ZTogYm9vbGVhbikge1xuICAgICAgICB0aGlzLl9kaXNhYmxlZCA9IHZhbHVlO1xuICAgIH1cblxuICAgIHByaXZhdGUgX2Rpc2FibGVkOiBib29sZWFuO1xuXG4gICAgQENvbnRlbnRDaGlsZChOZ3hNYXRlcmlhbFRpbWVwaWNrZXJUb2dnbGVJY29uRGlyZWN0aXZlLCB7c3RhdGljOiB0cnVlfSkgY3VzdG9tSWNvbjogTmd4TWF0ZXJpYWxUaW1lcGlja2VyVG9nZ2xlSWNvbkRpcmVjdGl2ZTtcblxuICAgIG9wZW4oZXZlbnQpOiB2b2lkIHtcbiAgICAgICAgaWYgKHRoaXMudGltZXBpY2tlcikge1xuICAgICAgICAgICAgdGhpcy50aW1lcGlja2VyLm9wZW4oKTtcbiAgICAgICAgICAgIGV2ZW50LnN0b3BQcm9wYWdhdGlvbigpO1xuICAgICAgICB9XG4gICAgfVxufVxuIl19