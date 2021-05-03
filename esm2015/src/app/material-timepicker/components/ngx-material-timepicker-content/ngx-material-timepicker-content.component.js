import * as tslib_1 from "tslib";
import { Component, Input } from '@angular/core';
let NgxMaterialTimepickerContentComponent = class NgxMaterialTimepickerContentComponent {
};
tslib_1.__decorate([
    Input()
], NgxMaterialTimepickerContentComponent.prototype, "appendToInput", void 0);
tslib_1.__decorate([
    Input()
], NgxMaterialTimepickerContentComponent.prototype, "inputElement", void 0);
NgxMaterialTimepickerContentComponent = tslib_1.__decorate([
    Component({
        selector: 'ngx-material-timepicker-content',
        template: "<div [ngxAppendToInput]=\"inputElement\" *ngIf=\"appendToInput;else timepickerModal\">\n    <!--suppress HtmlUnknownAttribute -->\n    <ng-container *ngTemplateOutlet=\"timepickerOutlet\"></ng-container>\n</div>\n\n<ng-template #timepickerModal>\n    <!--suppress HtmlUnknownAttribute -->\n    <ng-container *ngTemplateOutlet=\"timepickerOutlet\"></ng-container>\n</ng-template>\n\n<ng-template #timepickerOutlet>\n    <ng-content></ng-content>\n</ng-template>\n"
    })
], NgxMaterialTimepickerContentComponent);
export { NgxMaterialTimepickerContentComponent };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibmd4LW1hdGVyaWFsLXRpbWVwaWNrZXItY29udGVudC5jb21wb25lbnQuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9uZ3gtbWF0ZXJpYWwtdGltZXBpY2tlci8iLCJzb3VyY2VzIjpbInNyYy9hcHAvbWF0ZXJpYWwtdGltZXBpY2tlci9jb21wb25lbnRzL25neC1tYXRlcmlhbC10aW1lcGlja2VyLWNvbnRlbnQvbmd4LW1hdGVyaWFsLXRpbWVwaWNrZXItY29udGVudC5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLE9BQU8sRUFBRSxTQUFTLEVBQUUsS0FBSyxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBTWpELElBQWEscUNBQXFDLEdBQWxELE1BQWEscUNBQXFDO0NBR2pELENBQUE7QUFGWTtJQUFSLEtBQUssRUFBRTs0RUFBd0I7QUFDdkI7SUFBUixLQUFLLEVBQUU7MkVBQW1CO0FBRmxCLHFDQUFxQztJQUpqRCxTQUFTLENBQUM7UUFDUCxRQUFRLEVBQUUsaUNBQWlDO1FBQzNDLDBkQUErRDtLQUNsRSxDQUFDO0dBQ1cscUNBQXFDLENBR2pEO1NBSFkscUNBQXFDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ29tcG9uZW50LCBJbnB1dCB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuXG5AQ29tcG9uZW50KHtcbiAgICBzZWxlY3RvcjogJ25neC1tYXRlcmlhbC10aW1lcGlja2VyLWNvbnRlbnQnLFxuICAgIHRlbXBsYXRlVXJsOiAnLi9uZ3gtbWF0ZXJpYWwtdGltZXBpY2tlci1jb250ZW50LmNvbXBvbmVudC5odG1sJyxcbn0pXG5leHBvcnQgY2xhc3MgTmd4TWF0ZXJpYWxUaW1lcGlja2VyQ29udGVudENvbXBvbmVudCB7XG4gICAgQElucHV0KCkgYXBwZW5kVG9JbnB1dDogYm9vbGVhbjtcbiAgICBASW5wdXQoKSBpbnB1dEVsZW1lbnQ6IGFueTtcbn1cbiJdfQ==