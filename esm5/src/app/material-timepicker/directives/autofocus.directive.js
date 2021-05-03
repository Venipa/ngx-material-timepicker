import * as tslib_1 from "tslib";
import { Directive, ElementRef, Inject, Input, OnChanges, OnDestroy, Optional } from '@angular/core';
import { DOCUMENT } from '@angular/common';
var AutofocusDirective = /** @class */ (function () {
    function AutofocusDirective(element, document) {
        this.element = element;
        this.document = document;
        this.activeElement = this.document.activeElement;
    }
    AutofocusDirective.prototype.ngOnChanges = function () {
        var _this = this;
        if (this.isFocusActive) {
            // To avoid ExpressionChangedAfterItHasBeenCheckedError;
            setTimeout(function () { return _this.element.nativeElement.focus({ preventScroll: true }); });
        }
    };
    AutofocusDirective.prototype.ngOnDestroy = function () {
        var _this = this;
        // To avoid ExpressionChangedAfterItHasBeenCheckedError;
        setTimeout(function () { return _this.activeElement.focus({ preventScroll: true }); });
    };
    AutofocusDirective.ctorParameters = function () { return [
        { type: ElementRef },
        { type: undefined, decorators: [{ type: Optional }, { type: Inject, args: [DOCUMENT,] }] }
    ]; };
    tslib_1.__decorate([
        Input('timepickerAutofocus')
    ], AutofocusDirective.prototype, "isFocusActive", void 0);
    AutofocusDirective = tslib_1.__decorate([
        Directive({
            selector: '[timepickerAutofocus]'
        }),
        tslib_1.__param(1, Optional()), tslib_1.__param(1, Inject(DOCUMENT))
    ], AutofocusDirective);
    return AutofocusDirective;
}());
export { AutofocusDirective };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXV0b2ZvY3VzLmRpcmVjdGl2ZS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL25neC1tYXRlcmlhbC10aW1lcGlja2VyLyIsInNvdXJjZXMiOlsic3JjL2FwcC9tYXRlcmlhbC10aW1lcGlja2VyL2RpcmVjdGl2ZXMvYXV0b2ZvY3VzLmRpcmVjdGl2ZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUEsT0FBTyxFQUFDLFNBQVMsRUFBRSxVQUFVLEVBQUUsTUFBTSxFQUFFLEtBQUssRUFBRSxTQUFTLEVBQUUsU0FBUyxFQUFFLFFBQVEsRUFBQyxNQUFNLGVBQWUsQ0FBQztBQUNuRyxPQUFPLEVBQUMsUUFBUSxFQUFDLE1BQU0saUJBQWlCLENBQUM7QUFLekM7SUFNSSw0QkFBb0IsT0FBbUIsRUFBd0MsUUFBYTtRQUF4RSxZQUFPLEdBQVAsT0FBTyxDQUFZO1FBQXdDLGFBQVEsR0FBUixRQUFRLENBQUs7UUFDeEYsSUFBSSxDQUFDLGFBQWEsR0FBRyxJQUFJLENBQUMsUUFBUSxDQUFDLGFBQWEsQ0FBQztJQUNyRCxDQUFDO0lBRUQsd0NBQVcsR0FBWDtRQUFBLGlCQUtDO1FBSkcsSUFBSSxJQUFJLENBQUMsYUFBYSxFQUFFO1lBQ3BCLHdEQUF3RDtZQUN4RCxVQUFVLENBQUMsY0FBTSxPQUFBLEtBQUksQ0FBQyxPQUFPLENBQUMsYUFBYSxDQUFDLEtBQUssQ0FBQyxFQUFFLGFBQWEsRUFBRSxJQUFJLEVBQUUsQ0FBQyxFQUF6RCxDQUF5RCxDQUFDLENBQUM7U0FDL0U7SUFDTCxDQUFDO0lBRUQsd0NBQVcsR0FBWDtRQUFBLGlCQUdDO1FBRkcsd0RBQXdEO1FBQ3hELFVBQVUsQ0FBQyxjQUFNLE9BQUEsS0FBSSxDQUFDLGFBQWEsQ0FBQyxLQUFLLENBQUMsRUFBRSxhQUFhLEVBQUUsSUFBSSxFQUFFLENBQUMsRUFBakQsQ0FBaUQsQ0FBQyxDQUFDO0lBQ3hFLENBQUM7O2dCQWQ0QixVQUFVO2dEQUFHLFFBQVEsWUFBSSxNQUFNLFNBQUMsUUFBUTs7SUFKdkM7UUFBN0IsS0FBSyxDQUFDLHFCQUFxQixDQUFDOzZEQUF3QjtJQUY1QyxrQkFBa0I7UUFIOUIsU0FBUyxDQUFDO1lBQ1AsUUFBUSxFQUFFLHVCQUF1QjtTQUNwQyxDQUFDO1FBTzRDLG1CQUFBLFFBQVEsRUFBRSxDQUFBLEVBQUUsbUJBQUEsTUFBTSxDQUFDLFFBQVEsQ0FBQyxDQUFBO09BTjdELGtCQUFrQixDQXFCOUI7SUFBRCx5QkFBQztDQUFBLEFBckJELElBcUJDO1NBckJZLGtCQUFrQiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7RGlyZWN0aXZlLCBFbGVtZW50UmVmLCBJbmplY3QsIElucHV0LCBPbkNoYW5nZXMsIE9uRGVzdHJveSwgT3B0aW9uYWx9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHtET0NVTUVOVH0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uJztcblxuQERpcmVjdGl2ZSh7XG4gICAgc2VsZWN0b3I6ICdbdGltZXBpY2tlckF1dG9mb2N1c10nXG59KVxuZXhwb3J0IGNsYXNzIEF1dG9mb2N1c0RpcmVjdGl2ZSBpbXBsZW1lbnRzIE9uQ2hhbmdlcywgT25EZXN0cm95IHtcblxuICAgIEBJbnB1dCgndGltZXBpY2tlckF1dG9mb2N1cycpIGlzRm9jdXNBY3RpdmU6IGJvb2xlYW47XG5cbiAgICBwcml2YXRlIGFjdGl2ZUVsZW1lbnQ6IEhUTUxFbGVtZW50O1xuXG4gICAgY29uc3RydWN0b3IocHJpdmF0ZSBlbGVtZW50OiBFbGVtZW50UmVmLCBAT3B0aW9uYWwoKSBASW5qZWN0KERPQ1VNRU5UKSBwcml2YXRlIGRvY3VtZW50OiBhbnkpIHtcbiAgICAgICAgdGhpcy5hY3RpdmVFbGVtZW50ID0gdGhpcy5kb2N1bWVudC5hY3RpdmVFbGVtZW50O1xuICAgIH1cblxuICAgIG5nT25DaGFuZ2VzKCkge1xuICAgICAgICBpZiAodGhpcy5pc0ZvY3VzQWN0aXZlKSB7XG4gICAgICAgICAgICAvLyBUbyBhdm9pZCBFeHByZXNzaW9uQ2hhbmdlZEFmdGVySXRIYXNCZWVuQ2hlY2tlZEVycm9yO1xuICAgICAgICAgICAgc2V0VGltZW91dCgoKSA9PiB0aGlzLmVsZW1lbnQubmF0aXZlRWxlbWVudC5mb2N1cyh7IHByZXZlbnRTY3JvbGw6IHRydWUgfSkpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgbmdPbkRlc3Ryb3koKSB7XG4gICAgICAgIC8vIFRvIGF2b2lkIEV4cHJlc3Npb25DaGFuZ2VkQWZ0ZXJJdEhhc0JlZW5DaGVja2VkRXJyb3I7XG4gICAgICAgIHNldFRpbWVvdXQoKCkgPT4gdGhpcy5hY3RpdmVFbGVtZW50LmZvY3VzKHsgcHJldmVudFNjcm9sbDogdHJ1ZSB9KSk7XG4gICAgfVxufVxuIl19