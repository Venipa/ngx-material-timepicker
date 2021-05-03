import * as tslib_1 from "tslib";
import { ApplicationRef, ComponentFactoryResolver, ComponentRef, EmbeddedViewRef, Inject, Injectable, Injector, Optional, Type, } from "@angular/core";
import { DOCUMENT } from "@angular/common";
import * as i0 from "@angular/core";
import * as i1 from "@angular/common";
var DomService = /** @class */ (function () {
    function DomService(cfr, appRef, injector, document) {
        this.cfr = cfr;
        this.appRef = appRef;
        this.injector = injector;
        this.document = document;
    }
    DomService.prototype.appendTimepickerToBody = function (timepicker, config) {
        var _this = this;
        this.componentRef = this.cfr
            .resolveComponentFactory(timepicker)
            .create(this.injector);
        Object.keys(config).forEach(function (key) { return (_this.componentRef.instance[key] = config[key]); });
        this.appRef.attachView(this.componentRef.hostView);
        var domElement = this.componentRef
            .hostView
            .rootNodes[0];
        this.document.body.appendChild(domElement);
    };
    DomService.prototype.destroyTimepicker = function () {
        this.componentRef.destroy();
        this.appRef.detachView(this.componentRef.hostView);
    };
    DomService.ctorParameters = function () { return [
        { type: ComponentFactoryResolver },
        { type: ApplicationRef },
        { type: Injector },
        { type: undefined, decorators: [{ type: Optional }, { type: Inject, args: [DOCUMENT,] }] }
    ]; };
    DomService.ngInjectableDef = i0.ɵɵdefineInjectable({ factory: function DomService_Factory() { return new DomService(i0.ɵɵinject(i0.ComponentFactoryResolver), i0.ɵɵinject(i0.ApplicationRef), i0.ɵɵinject(i0.INJECTOR), i0.ɵɵinject(i1.DOCUMENT, 8)); }, token: DomService, providedIn: "root" });
    DomService = tslib_1.__decorate([
        Injectable({
            providedIn: "root",
        }),
        tslib_1.__param(3, Optional()), tslib_1.__param(3, Inject(DOCUMENT))
    ], DomService);
    return DomService;
}());
export { DomService };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZG9tLnNlcnZpY2UuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9uZ3gtbWF0ZXJpYWwtdGltZXBpY2tlci8iLCJzb3VyY2VzIjpbInNyYy9hcHAvbWF0ZXJpYWwtdGltZXBpY2tlci9zZXJ2aWNlcy9kb20uc2VydmljZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUEsT0FBTyxFQUNILGNBQWMsRUFDZCx3QkFBd0IsRUFDeEIsWUFBWSxFQUNaLGVBQWUsRUFDZixNQUFNLEVBQ04sVUFBVSxFQUNWLFFBQVEsRUFDUixRQUFRLEVBQ1IsSUFBSSxHQUNQLE1BQU0sZUFBZSxDQUFDO0FBQ3ZCLE9BQU8sRUFBRSxRQUFRLEVBQUUsTUFBTSxpQkFBaUIsQ0FBQzs7O0FBTzNDO0lBR0ksb0JBQ1ksR0FBNkIsRUFDN0IsTUFBc0IsRUFDdEIsUUFBa0IsRUFDWSxRQUFhO1FBSDNDLFFBQUcsR0FBSCxHQUFHLENBQTBCO1FBQzdCLFdBQU0sR0FBTixNQUFNLENBQWdCO1FBQ3RCLGFBQVEsR0FBUixRQUFRLENBQVU7UUFDWSxhQUFRLEdBQVIsUUFBUSxDQUFLO0lBQ3BELENBQUM7SUFFSiwyQ0FBc0IsR0FBdEIsVUFDSSxVQUF5RCxFQUN6RCxNQUF3QjtRQUY1QixpQkFpQkM7UUFiRyxJQUFJLENBQUMsWUFBWSxHQUFHLElBQUksQ0FBQyxHQUFHO2FBQ3ZCLHVCQUF1QixDQUFDLFVBQVUsQ0FBQzthQUNuQyxNQUFNLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUFDO1FBRTNCLE1BQU0sQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUMsT0FBTyxDQUN2QixVQUFDLEdBQUcsSUFBSyxPQUFBLENBQUMsS0FBSSxDQUFDLFlBQVksQ0FBQyxRQUFRLENBQUMsR0FBRyxDQUFDLEdBQUcsTUFBTSxDQUFDLEdBQUcsQ0FBQyxDQUFDLEVBQS9DLENBQStDLENBQzNELENBQUM7UUFFRixJQUFJLENBQUMsTUFBTSxDQUFDLFVBQVUsQ0FBQyxJQUFJLENBQUMsWUFBWSxDQUFDLFFBQVEsQ0FBQyxDQUFDO1FBQ25ELElBQU0sVUFBVSxHQUFpQixJQUFJLENBQUMsWUFBWTthQUM3QyxRQUFxRTthQUNyRSxTQUFTLENBQUMsQ0FBQyxDQUFDLENBQUM7UUFDbEIsSUFBSSxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsV0FBVyxDQUFDLFVBQVUsQ0FBQyxDQUFDO0lBQy9DLENBQUM7SUFFRCxzQ0FBaUIsR0FBakI7UUFDSSxJQUFJLENBQUMsWUFBWSxDQUFDLE9BQU8sRUFBRSxDQUFDO1FBQzVCLElBQUksQ0FBQyxNQUFNLENBQUMsVUFBVSxDQUFDLElBQUksQ0FBQyxZQUFZLENBQUMsUUFBUSxDQUFDLENBQUM7SUFDdkQsQ0FBQzs7Z0JBNUJnQix3QkFBd0I7Z0JBQ3JCLGNBQWM7Z0JBQ1osUUFBUTtnREFDekIsUUFBUSxZQUFJLE1BQU0sU0FBQyxRQUFROzs7SUFQdkIsVUFBVTtRQUh0QixVQUFVLENBQUM7WUFDUixVQUFVLEVBQUUsTUFBTTtTQUNyQixDQUFDO1FBUU8sbUJBQUEsUUFBUSxFQUFFLENBQUEsRUFBRSxtQkFBQSxNQUFNLENBQUMsUUFBUSxDQUFDLENBQUE7T0FQeEIsVUFBVSxDQWlDdEI7cUJBbkREO0NBbURDLEFBakNELElBaUNDO1NBakNZLFVBQVUiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge1xuICAgIEFwcGxpY2F0aW9uUmVmLFxuICAgIENvbXBvbmVudEZhY3RvcnlSZXNvbHZlcixcbiAgICBDb21wb25lbnRSZWYsXG4gICAgRW1iZWRkZWRWaWV3UmVmLFxuICAgIEluamVjdCxcbiAgICBJbmplY3RhYmxlLFxuICAgIEluamVjdG9yLFxuICAgIE9wdGlvbmFsLFxuICAgIFR5cGUsXG59IGZyb20gXCJAYW5ndWxhci9jb3JlXCI7XG5pbXBvcnQgeyBET0NVTUVOVCB9IGZyb20gXCJAYW5ndWxhci9jb21tb25cIjtcbmltcG9ydCB7IE5neE1hdGVyaWFsVGltZXBpY2tlckNvbnRhaW5lckNvbXBvbmVudCB9IGZyb20gXCIuLi9jb21wb25lbnRzL25neC1tYXRlcmlhbC10aW1lcGlja2VyLWNvbnRhaW5lci9uZ3gtbWF0ZXJpYWwtdGltZXBpY2tlci1jb250YWluZXIuY29tcG9uZW50XCI7XG5pbXBvcnQgeyBUaW1lcGlja2VyQ29uZmlnIH0gZnJvbSBcIi4uL21vZGVscy90aW1lcGlja2VyLWNvbmZpZy5pbnRlcmZhY2VcIjtcblxuQEluamVjdGFibGUoe1xuICAgIHByb3ZpZGVkSW46IFwicm9vdFwiLFxufSlcbmV4cG9ydCBjbGFzcyBEb21TZXJ2aWNlIHtcbiAgICBwcml2YXRlIGNvbXBvbmVudFJlZjogQ29tcG9uZW50UmVmPE5neE1hdGVyaWFsVGltZXBpY2tlckNvbnRhaW5lckNvbXBvbmVudD47XG5cbiAgICBjb25zdHJ1Y3RvcihcbiAgICAgICAgcHJpdmF0ZSBjZnI6IENvbXBvbmVudEZhY3RvcnlSZXNvbHZlcixcbiAgICAgICAgcHJpdmF0ZSBhcHBSZWY6IEFwcGxpY2F0aW9uUmVmLFxuICAgICAgICBwcml2YXRlIGluamVjdG9yOiBJbmplY3RvcixcbiAgICAgICAgQE9wdGlvbmFsKCkgQEluamVjdChET0NVTUVOVCkgcHJpdmF0ZSBkb2N1bWVudDogYW55XG4gICAgKSB7fVxuXG4gICAgYXBwZW5kVGltZXBpY2tlclRvQm9keShcbiAgICAgICAgdGltZXBpY2tlcjogVHlwZTxOZ3hNYXRlcmlhbFRpbWVwaWNrZXJDb250YWluZXJDb21wb25lbnQ+LFxuICAgICAgICBjb25maWc6IFRpbWVwaWNrZXJDb25maWdcbiAgICApOiB2b2lkIHtcbiAgICAgICAgdGhpcy5jb21wb25lbnRSZWYgPSB0aGlzLmNmclxuICAgICAgICAgICAgLnJlc29sdmVDb21wb25lbnRGYWN0b3J5KHRpbWVwaWNrZXIpXG4gICAgICAgICAgICAuY3JlYXRlKHRoaXMuaW5qZWN0b3IpO1xuXG4gICAgICAgIE9iamVjdC5rZXlzKGNvbmZpZykuZm9yRWFjaChcbiAgICAgICAgICAgIChrZXkpID0+ICh0aGlzLmNvbXBvbmVudFJlZi5pbnN0YW5jZVtrZXldID0gY29uZmlnW2tleV0pXG4gICAgICAgICk7XG5cbiAgICAgICAgdGhpcy5hcHBSZWYuYXR0YWNoVmlldyh0aGlzLmNvbXBvbmVudFJlZi5ob3N0Vmlldyk7XG4gICAgICAgIGNvbnN0IGRvbUVsZW1lbnQ6IEhUTUxFbGVtZW50ID0gKHRoaXMuY29tcG9uZW50UmVmXG4gICAgICAgICAgICAuaG9zdFZpZXcgYXMgRW1iZWRkZWRWaWV3UmVmPE5neE1hdGVyaWFsVGltZXBpY2tlckNvbnRhaW5lckNvbXBvbmVudD4pXG4gICAgICAgICAgICAucm9vdE5vZGVzWzBdO1xuICAgICAgICB0aGlzLmRvY3VtZW50LmJvZHkuYXBwZW5kQ2hpbGQoZG9tRWxlbWVudCk7XG4gICAgfVxuXG4gICAgZGVzdHJveVRpbWVwaWNrZXIoKTogdm9pZCB7XG4gICAgICAgIHRoaXMuY29tcG9uZW50UmVmLmRlc3Ryb3koKTtcbiAgICAgICAgdGhpcy5hcHBSZWYuZGV0YWNoVmlldyh0aGlzLmNvbXBvbmVudFJlZi5ob3N0Vmlldyk7XG4gICAgfVxufVxuIl19