import * as tslib_1 from "tslib";
import { AfterViewInit, Directive, ElementRef, Input } from '@angular/core';
let NgxMaterialTimepickerThemeDirective = class NgxMaterialTimepickerThemeDirective {
    constructor(elementRef) {
        this.element = elementRef.nativeElement;
    }
    ngAfterViewInit() {
        if (this.theme) {
            this.setTheme(this.theme);
        }
    }
    setTheme(theme) {
        for (const val in theme) {
            if (theme.hasOwnProperty(val)) {
                if (typeof theme[val] === 'string') {
                    for (const prop in theme) {
                        if (theme.hasOwnProperty(prop)) {
                            this.element.style.setProperty(`--${camelCaseToDash(prop)}`, theme[prop]);
                        }
                    }
                    return;
                }
                this.setTheme(theme[val]);
            }
        }
    }
};
NgxMaterialTimepickerThemeDirective.ctorParameters = () => [
    { type: ElementRef }
];
tslib_1.__decorate([
    Input('ngxMaterialTimepickerTheme')
], NgxMaterialTimepickerThemeDirective.prototype, "theme", void 0);
NgxMaterialTimepickerThemeDirective = tslib_1.__decorate([
    Directive({ selector: '[ngxMaterialTimepickerTheme]' })
], NgxMaterialTimepickerThemeDirective);
export { NgxMaterialTimepickerThemeDirective };
function camelCaseToDash(myStr) {
    return myStr.replace(/([a-z])([A-Z])/g, '$1-$2').toLowerCase();
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibmd4LW1hdGVyaWFsLXRpbWVwaWNrZXItdGhlbWUuZGlyZWN0aXZlLmpzIiwic291cmNlUm9vdCI6Im5nOi8vbmd4LW1hdGVyaWFsLXRpbWVwaWNrZXIvIiwic291cmNlcyI6WyJzcmMvYXBwL21hdGVyaWFsLXRpbWVwaWNrZXIvZGlyZWN0aXZlcy9uZ3gtbWF0ZXJpYWwtdGltZXBpY2tlci10aGVtZS5kaXJlY3RpdmUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLE9BQU8sRUFBQyxhQUFhLEVBQUUsU0FBUyxFQUFFLFVBQVUsRUFBRSxLQUFLLEVBQUMsTUFBTSxlQUFlLENBQUM7QUFJMUUsSUFBYSxtQ0FBbUMsR0FBaEQsTUFBYSxtQ0FBbUM7SUFNNUMsWUFBWSxVQUFzQjtRQUM5QixJQUFJLENBQUMsT0FBTyxHQUFHLFVBQVUsQ0FBQyxhQUFhLENBQUM7SUFDNUMsQ0FBQztJQUVELGVBQWU7UUFDWCxJQUFJLElBQUksQ0FBQyxLQUFLLEVBQUU7WUFDWixJQUFJLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQztTQUM3QjtJQUNMLENBQUM7SUFFTyxRQUFRLENBQUMsS0FBSztRQUNsQixLQUFLLE1BQU0sR0FBRyxJQUFJLEtBQUssRUFBRTtZQUNyQixJQUFJLEtBQUssQ0FBQyxjQUFjLENBQUMsR0FBRyxDQUFDLEVBQUU7Z0JBQzNCLElBQUksT0FBTyxLQUFLLENBQUMsR0FBRyxDQUFDLEtBQUssUUFBUSxFQUFFO29CQUNoQyxLQUFLLE1BQU0sSUFBSSxJQUFJLEtBQUssRUFBRTt3QkFDdEIsSUFBSSxLQUFLLENBQUMsY0FBYyxDQUFDLElBQUksQ0FBQyxFQUFFOzRCQUM1QixJQUFJLENBQUMsT0FBTyxDQUFDLEtBQUssQ0FBQyxXQUFXLENBQUMsS0FBSyxlQUFlLENBQUMsSUFBSSxDQUFDLEVBQUUsRUFBRSxLQUFLLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQzt5QkFDN0U7cUJBQ0o7b0JBQ0QsT0FBTztpQkFDVjtnQkFDRCxJQUFJLENBQUMsUUFBUSxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDO2FBQzdCO1NBRUo7SUFDTCxDQUFDO0NBQ0osQ0FBQTs7WUExQjJCLFVBQVU7O0FBSkc7SUFBcEMsS0FBSyxDQUFDLDRCQUE0QixDQUFDO2tFQUFtQztBQUY5RCxtQ0FBbUM7SUFEL0MsU0FBUyxDQUFDLEVBQUMsUUFBUSxFQUFFLDhCQUE4QixFQUFDLENBQUM7R0FDekMsbUNBQW1DLENBZ0MvQztTQWhDWSxtQ0FBbUM7QUFrQ2hELFNBQVMsZUFBZSxDQUFDLEtBQUs7SUFDMUIsT0FBTyxLQUFLLENBQUMsT0FBTyxDQUFDLGlCQUFpQixFQUFFLE9BQU8sQ0FBQyxDQUFDLFdBQVcsRUFBRSxDQUFDO0FBQ25FLENBQUMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge0FmdGVyVmlld0luaXQsIERpcmVjdGl2ZSwgRWxlbWVudFJlZiwgSW5wdXR9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHtOZ3hNYXRlcmlhbFRpbWVwaWNrZXJUaGVtZX0gZnJvbSAnLi4vbW9kZWxzL25neC1tYXRlcmlhbC10aW1lcGlja2VyLXRoZW1lLmludGVyZmFjZSc7XG5cbkBEaXJlY3RpdmUoe3NlbGVjdG9yOiAnW25neE1hdGVyaWFsVGltZXBpY2tlclRoZW1lXSd9KVxuZXhwb3J0IGNsYXNzIE5neE1hdGVyaWFsVGltZXBpY2tlclRoZW1lRGlyZWN0aXZlIGltcGxlbWVudHMgQWZ0ZXJWaWV3SW5pdCB7XG5cbiAgICBASW5wdXQoJ25neE1hdGVyaWFsVGltZXBpY2tlclRoZW1lJykgdGhlbWU6IE5neE1hdGVyaWFsVGltZXBpY2tlclRoZW1lO1xuXG4gICAgcHJpdmF0ZSBlbGVtZW50OiBIVE1MRWxlbWVudDtcblxuICAgIGNvbnN0cnVjdG9yKGVsZW1lbnRSZWY6IEVsZW1lbnRSZWYpIHtcbiAgICAgICAgdGhpcy5lbGVtZW50ID0gZWxlbWVudFJlZi5uYXRpdmVFbGVtZW50O1xuICAgIH1cblxuICAgIG5nQWZ0ZXJWaWV3SW5pdCgpIHtcbiAgICAgICAgaWYgKHRoaXMudGhlbWUpIHtcbiAgICAgICAgICAgIHRoaXMuc2V0VGhlbWUodGhpcy50aGVtZSk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBwcml2YXRlIHNldFRoZW1lKHRoZW1lKTogdm9pZCB7XG4gICAgICAgIGZvciAoY29uc3QgdmFsIGluIHRoZW1lKSB7XG4gICAgICAgICAgICBpZiAodGhlbWUuaGFzT3duUHJvcGVydHkodmFsKSkge1xuICAgICAgICAgICAgICAgIGlmICh0eXBlb2YgdGhlbWVbdmFsXSA9PT0gJ3N0cmluZycpIHtcbiAgICAgICAgICAgICAgICAgICAgZm9yIChjb25zdCBwcm9wIGluIHRoZW1lKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAodGhlbWUuaGFzT3duUHJvcGVydHkocHJvcCkpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmVsZW1lbnQuc3R5bGUuc2V0UHJvcGVydHkoYC0tJHtjYW1lbENhc2VUb0Rhc2gocHJvcCl9YCwgdGhlbWVbcHJvcF0pO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgdGhpcy5zZXRUaGVtZSh0aGVtZVt2YWxdKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICB9XG4gICAgfVxufVxuXG5mdW5jdGlvbiBjYW1lbENhc2VUb0Rhc2gobXlTdHIpIHtcbiAgICByZXR1cm4gbXlTdHIucmVwbGFjZSgvKFthLXpdKShbQS1aXSkvZywgJyQxLSQyJykudG9Mb3dlckNhc2UoKTtcbn1cbiJdfQ==