import * as tslib_1 from "tslib";
import { Directive, ElementRef, Inject, Input, OnChanges, OnDestroy, Optional } from '@angular/core';
import { DOCUMENT } from '@angular/common';
let AutofocusDirective = class AutofocusDirective {
    constructor(element, document) {
        this.element = element;
        this.document = document;
        this.activeElement = this.document.activeElement;
    }
    ngOnChanges() {
        if (this.isFocusActive) {
            // To avoid ExpressionChangedAfterItHasBeenCheckedError;
            setTimeout(() => this.element.nativeElement.focus({ preventScroll: true }));
        }
    }
    ngOnDestroy() {
        // To avoid ExpressionChangedAfterItHasBeenCheckedError;
        setTimeout(() => this.activeElement.focus({ preventScroll: true }));
    }
};
AutofocusDirective.ctorParameters = () => [
    { type: ElementRef },
    { type: undefined, decorators: [{ type: Optional }, { type: Inject, args: [DOCUMENT,] }] }
];
tslib_1.__decorate([
    Input('timepickerAutofocus')
], AutofocusDirective.prototype, "isFocusActive", void 0);
AutofocusDirective = tslib_1.__decorate([
    Directive({
        selector: '[timepickerAutofocus]'
    }),
    tslib_1.__param(1, Optional()), tslib_1.__param(1, Inject(DOCUMENT))
], AutofocusDirective);
export { AutofocusDirective };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXV0b2ZvY3VzLmRpcmVjdGl2ZS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL25neC1tYXRlcmlhbC10aW1lcGlja2VyLyIsInNvdXJjZXMiOlsic3JjL2FwcC9tYXRlcmlhbC10aW1lcGlja2VyL2RpcmVjdGl2ZXMvYXV0b2ZvY3VzLmRpcmVjdGl2ZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUEsT0FBTyxFQUFDLFNBQVMsRUFBRSxVQUFVLEVBQUUsTUFBTSxFQUFFLEtBQUssRUFBRSxTQUFTLEVBQUUsU0FBUyxFQUFFLFFBQVEsRUFBQyxNQUFNLGVBQWUsQ0FBQztBQUNuRyxPQUFPLEVBQUMsUUFBUSxFQUFDLE1BQU0saUJBQWlCLENBQUM7QUFLekMsSUFBYSxrQkFBa0IsR0FBL0IsTUFBYSxrQkFBa0I7SUFNM0IsWUFBb0IsT0FBbUIsRUFBd0MsUUFBYTtRQUF4RSxZQUFPLEdBQVAsT0FBTyxDQUFZO1FBQXdDLGFBQVEsR0FBUixRQUFRLENBQUs7UUFDeEYsSUFBSSxDQUFDLGFBQWEsR0FBRyxJQUFJLENBQUMsUUFBUSxDQUFDLGFBQWEsQ0FBQztJQUNyRCxDQUFDO0lBRUQsV0FBVztRQUNQLElBQUksSUFBSSxDQUFDLGFBQWEsRUFBRTtZQUNwQix3REFBd0Q7WUFDeEQsVUFBVSxDQUFDLEdBQUcsRUFBRSxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsYUFBYSxDQUFDLEtBQUssQ0FBQyxFQUFFLGFBQWEsRUFBRSxJQUFJLEVBQUUsQ0FBQyxDQUFDLENBQUM7U0FDL0U7SUFDTCxDQUFDO0lBRUQsV0FBVztRQUNQLHdEQUF3RDtRQUN4RCxVQUFVLENBQUMsR0FBRyxFQUFFLENBQUMsSUFBSSxDQUFDLGFBQWEsQ0FBQyxLQUFLLENBQUMsRUFBRSxhQUFhLEVBQUUsSUFBSSxFQUFFLENBQUMsQ0FBQyxDQUFDO0lBQ3hFLENBQUM7Q0FDSixDQUFBOztZQWZnQyxVQUFVOzRDQUFHLFFBQVEsWUFBSSxNQUFNLFNBQUMsUUFBUTs7QUFKdkM7SUFBN0IsS0FBSyxDQUFDLHFCQUFxQixDQUFDO3lEQUF3QjtBQUY1QyxrQkFBa0I7SUFIOUIsU0FBUyxDQUFDO1FBQ1AsUUFBUSxFQUFFLHVCQUF1QjtLQUNwQyxDQUFDO0lBTzRDLG1CQUFBLFFBQVEsRUFBRSxDQUFBLEVBQUUsbUJBQUEsTUFBTSxDQUFDLFFBQVEsQ0FBQyxDQUFBO0dBTjdELGtCQUFrQixDQXFCOUI7U0FyQlksa0JBQWtCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtEaXJlY3RpdmUsIEVsZW1lbnRSZWYsIEluamVjdCwgSW5wdXQsIE9uQ2hhbmdlcywgT25EZXN0cm95LCBPcHRpb25hbH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQge0RPQ1VNRU5UfSBmcm9tICdAYW5ndWxhci9jb21tb24nO1xuXG5ARGlyZWN0aXZlKHtcbiAgICBzZWxlY3RvcjogJ1t0aW1lcGlja2VyQXV0b2ZvY3VzXSdcbn0pXG5leHBvcnQgY2xhc3MgQXV0b2ZvY3VzRGlyZWN0aXZlIGltcGxlbWVudHMgT25DaGFuZ2VzLCBPbkRlc3Ryb3kge1xuXG4gICAgQElucHV0KCd0aW1lcGlja2VyQXV0b2ZvY3VzJykgaXNGb2N1c0FjdGl2ZTogYm9vbGVhbjtcblxuICAgIHByaXZhdGUgYWN0aXZlRWxlbWVudDogSFRNTEVsZW1lbnQ7XG5cbiAgICBjb25zdHJ1Y3Rvcihwcml2YXRlIGVsZW1lbnQ6IEVsZW1lbnRSZWYsIEBPcHRpb25hbCgpIEBJbmplY3QoRE9DVU1FTlQpIHByaXZhdGUgZG9jdW1lbnQ6IGFueSkge1xuICAgICAgICB0aGlzLmFjdGl2ZUVsZW1lbnQgPSB0aGlzLmRvY3VtZW50LmFjdGl2ZUVsZW1lbnQ7XG4gICAgfVxuXG4gICAgbmdPbkNoYW5nZXMoKSB7XG4gICAgICAgIGlmICh0aGlzLmlzRm9jdXNBY3RpdmUpIHtcbiAgICAgICAgICAgIC8vIFRvIGF2b2lkIEV4cHJlc3Npb25DaGFuZ2VkQWZ0ZXJJdEhhc0JlZW5DaGVja2VkRXJyb3I7XG4gICAgICAgICAgICBzZXRUaW1lb3V0KCgpID0+IHRoaXMuZWxlbWVudC5uYXRpdmVFbGVtZW50LmZvY3VzKHsgcHJldmVudFNjcm9sbDogdHJ1ZSB9KSk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBuZ09uRGVzdHJveSgpIHtcbiAgICAgICAgLy8gVG8gYXZvaWQgRXhwcmVzc2lvbkNoYW5nZWRBZnRlckl0SGFzQmVlbkNoZWNrZWRFcnJvcjtcbiAgICAgICAgc2V0VGltZW91dCgoKSA9PiB0aGlzLmFjdGl2ZUVsZW1lbnQuZm9jdXMoeyBwcmV2ZW50U2Nyb2xsOiB0cnVlIH0pKTtcbiAgICB9XG59XG4iXX0=