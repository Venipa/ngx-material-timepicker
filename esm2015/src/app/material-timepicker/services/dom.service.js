import * as tslib_1 from "tslib";
import { ApplicationRef, ComponentFactoryResolver, ComponentRef, EmbeddedViewRef, Inject, Injectable, Injector, Optional, Type, } from "@angular/core";
import { DOCUMENT } from "@angular/common";
import * as i0 from "@angular/core";
import * as i1 from "@angular/common";
let DomService = class DomService {
    constructor(cfr, appRef, injector, document) {
        this.cfr = cfr;
        this.appRef = appRef;
        this.injector = injector;
        this.document = document;
    }
    appendTimepickerToBody(timepicker, config) {
        this.componentRef = this.cfr
            .resolveComponentFactory(timepicker)
            .create(this.injector);
        Object.keys(config).forEach((key) => (this.componentRef.instance[key] = config[key]));
        this.appRef.attachView(this.componentRef.hostView);
        const domElement = this.componentRef
            .hostView
            .rootNodes[0];
        this.document.body.appendChild(domElement);
    }
    destroyTimepicker() {
        this.componentRef.destroy();
        this.appRef.detachView(this.componentRef.hostView);
    }
};
DomService.ctorParameters = () => [
    { type: ComponentFactoryResolver },
    { type: ApplicationRef },
    { type: Injector },
    { type: undefined, decorators: [{ type: Optional }, { type: Inject, args: [DOCUMENT,] }] }
];
DomService.ngInjectableDef = i0.ɵɵdefineInjectable({ factory: function DomService_Factory() { return new DomService(i0.ɵɵinject(i0.ComponentFactoryResolver), i0.ɵɵinject(i0.ApplicationRef), i0.ɵɵinject(i0.INJECTOR), i0.ɵɵinject(i1.DOCUMENT, 8)); }, token: DomService, providedIn: "root" });
DomService = tslib_1.__decorate([
    Injectable({
        providedIn: "root",
    }),
    tslib_1.__param(3, Optional()), tslib_1.__param(3, Inject(DOCUMENT))
], DomService);
export { DomService };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZG9tLnNlcnZpY2UuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9uZ3gtbWF0ZXJpYWwtdGltZXBpY2tlci8iLCJzb3VyY2VzIjpbInNyYy9hcHAvbWF0ZXJpYWwtdGltZXBpY2tlci9zZXJ2aWNlcy9kb20uc2VydmljZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUEsT0FBTyxFQUNILGNBQWMsRUFDZCx3QkFBd0IsRUFDeEIsWUFBWSxFQUNaLGVBQWUsRUFDZixNQUFNLEVBQ04sVUFBVSxFQUNWLFFBQVEsRUFDUixRQUFRLEVBQ1IsSUFBSSxHQUNQLE1BQU0sZUFBZSxDQUFDO0FBQ3ZCLE9BQU8sRUFBRSxRQUFRLEVBQUUsTUFBTSxpQkFBaUIsQ0FBQzs7O0FBTzNDLElBQWEsVUFBVSxHQUF2QixNQUFhLFVBQVU7SUFHbkIsWUFDWSxHQUE2QixFQUM3QixNQUFzQixFQUN0QixRQUFrQixFQUNZLFFBQWE7UUFIM0MsUUFBRyxHQUFILEdBQUcsQ0FBMEI7UUFDN0IsV0FBTSxHQUFOLE1BQU0sQ0FBZ0I7UUFDdEIsYUFBUSxHQUFSLFFBQVEsQ0FBVTtRQUNZLGFBQVEsR0FBUixRQUFRLENBQUs7SUFDcEQsQ0FBQztJQUVKLHNCQUFzQixDQUNsQixVQUF5RCxFQUN6RCxNQUF3QjtRQUV4QixJQUFJLENBQUMsWUFBWSxHQUFHLElBQUksQ0FBQyxHQUFHO2FBQ3ZCLHVCQUF1QixDQUFDLFVBQVUsQ0FBQzthQUNuQyxNQUFNLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUFDO1FBRTNCLE1BQU0sQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUMsT0FBTyxDQUN2QixDQUFDLEdBQUcsRUFBRSxFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsWUFBWSxDQUFDLFFBQVEsQ0FBQyxHQUFHLENBQUMsR0FBRyxNQUFNLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FDM0QsQ0FBQztRQUVGLElBQUksQ0FBQyxNQUFNLENBQUMsVUFBVSxDQUFDLElBQUksQ0FBQyxZQUFZLENBQUMsUUFBUSxDQUFDLENBQUM7UUFDbkQsTUFBTSxVQUFVLEdBQWlCLElBQUksQ0FBQyxZQUFZO2FBQzdDLFFBQXFFO2FBQ3JFLFNBQVMsQ0FBQyxDQUFDLENBQUMsQ0FBQztRQUNsQixJQUFJLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxXQUFXLENBQUMsVUFBVSxDQUFDLENBQUM7SUFDL0MsQ0FBQztJQUVELGlCQUFpQjtRQUNiLElBQUksQ0FBQyxZQUFZLENBQUMsT0FBTyxFQUFFLENBQUM7UUFDNUIsSUFBSSxDQUFDLE1BQU0sQ0FBQyxVQUFVLENBQUMsSUFBSSxDQUFDLFlBQVksQ0FBQyxRQUFRLENBQUMsQ0FBQztJQUN2RCxDQUFDO0NBQ0osQ0FBQTs7WUE3Qm9CLHdCQUF3QjtZQUNyQixjQUFjO1lBQ1osUUFBUTs0Q0FDekIsUUFBUSxZQUFJLE1BQU0sU0FBQyxRQUFROzs7QUFQdkIsVUFBVTtJQUh0QixVQUFVLENBQUM7UUFDUixVQUFVLEVBQUUsTUFBTTtLQUNyQixDQUFDO0lBUU8sbUJBQUEsUUFBUSxFQUFFLENBQUEsRUFBRSxtQkFBQSxNQUFNLENBQUMsUUFBUSxDQUFDLENBQUE7R0FQeEIsVUFBVSxDQWlDdEI7U0FqQ1ksVUFBVSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7XG4gICAgQXBwbGljYXRpb25SZWYsXG4gICAgQ29tcG9uZW50RmFjdG9yeVJlc29sdmVyLFxuICAgIENvbXBvbmVudFJlZixcbiAgICBFbWJlZGRlZFZpZXdSZWYsXG4gICAgSW5qZWN0LFxuICAgIEluamVjdGFibGUsXG4gICAgSW5qZWN0b3IsXG4gICAgT3B0aW9uYWwsXG4gICAgVHlwZSxcbn0gZnJvbSBcIkBhbmd1bGFyL2NvcmVcIjtcbmltcG9ydCB7IERPQ1VNRU5UIH0gZnJvbSBcIkBhbmd1bGFyL2NvbW1vblwiO1xuaW1wb3J0IHsgTmd4TWF0ZXJpYWxUaW1lcGlja2VyQ29udGFpbmVyQ29tcG9uZW50IH0gZnJvbSBcIi4uL2NvbXBvbmVudHMvbmd4LW1hdGVyaWFsLXRpbWVwaWNrZXItY29udGFpbmVyL25neC1tYXRlcmlhbC10aW1lcGlja2VyLWNvbnRhaW5lci5jb21wb25lbnRcIjtcbmltcG9ydCB7IFRpbWVwaWNrZXJDb25maWcgfSBmcm9tIFwiLi4vbW9kZWxzL3RpbWVwaWNrZXItY29uZmlnLmludGVyZmFjZVwiO1xuXG5ASW5qZWN0YWJsZSh7XG4gICAgcHJvdmlkZWRJbjogXCJyb290XCIsXG59KVxuZXhwb3J0IGNsYXNzIERvbVNlcnZpY2Uge1xuICAgIHByaXZhdGUgY29tcG9uZW50UmVmOiBDb21wb25lbnRSZWY8Tmd4TWF0ZXJpYWxUaW1lcGlja2VyQ29udGFpbmVyQ29tcG9uZW50PjtcblxuICAgIGNvbnN0cnVjdG9yKFxuICAgICAgICBwcml2YXRlIGNmcjogQ29tcG9uZW50RmFjdG9yeVJlc29sdmVyLFxuICAgICAgICBwcml2YXRlIGFwcFJlZjogQXBwbGljYXRpb25SZWYsXG4gICAgICAgIHByaXZhdGUgaW5qZWN0b3I6IEluamVjdG9yLFxuICAgICAgICBAT3B0aW9uYWwoKSBASW5qZWN0KERPQ1VNRU5UKSBwcml2YXRlIGRvY3VtZW50OiBhbnlcbiAgICApIHt9XG5cbiAgICBhcHBlbmRUaW1lcGlja2VyVG9Cb2R5KFxuICAgICAgICB0aW1lcGlja2VyOiBUeXBlPE5neE1hdGVyaWFsVGltZXBpY2tlckNvbnRhaW5lckNvbXBvbmVudD4sXG4gICAgICAgIGNvbmZpZzogVGltZXBpY2tlckNvbmZpZ1xuICAgICk6IHZvaWQge1xuICAgICAgICB0aGlzLmNvbXBvbmVudFJlZiA9IHRoaXMuY2ZyXG4gICAgICAgICAgICAucmVzb2x2ZUNvbXBvbmVudEZhY3RvcnkodGltZXBpY2tlcilcbiAgICAgICAgICAgIC5jcmVhdGUodGhpcy5pbmplY3Rvcik7XG5cbiAgICAgICAgT2JqZWN0LmtleXMoY29uZmlnKS5mb3JFYWNoKFxuICAgICAgICAgICAgKGtleSkgPT4gKHRoaXMuY29tcG9uZW50UmVmLmluc3RhbmNlW2tleV0gPSBjb25maWdba2V5XSlcbiAgICAgICAgKTtcblxuICAgICAgICB0aGlzLmFwcFJlZi5hdHRhY2hWaWV3KHRoaXMuY29tcG9uZW50UmVmLmhvc3RWaWV3KTtcbiAgICAgICAgY29uc3QgZG9tRWxlbWVudDogSFRNTEVsZW1lbnQgPSAodGhpcy5jb21wb25lbnRSZWZcbiAgICAgICAgICAgIC5ob3N0VmlldyBhcyBFbWJlZGRlZFZpZXdSZWY8Tmd4TWF0ZXJpYWxUaW1lcGlja2VyQ29udGFpbmVyQ29tcG9uZW50PilcbiAgICAgICAgICAgIC5yb290Tm9kZXNbMF07XG4gICAgICAgIHRoaXMuZG9jdW1lbnQuYm9keS5hcHBlbmRDaGlsZChkb21FbGVtZW50KTtcbiAgICB9XG5cbiAgICBkZXN0cm95VGltZXBpY2tlcigpOiB2b2lkIHtcbiAgICAgICAgdGhpcy5jb21wb25lbnRSZWYuZGVzdHJveSgpO1xuICAgICAgICB0aGlzLmFwcFJlZi5kZXRhY2hWaWV3KHRoaXMuY29tcG9uZW50UmVmLmhvc3RWaWV3KTtcbiAgICB9XG59XG4iXX0=