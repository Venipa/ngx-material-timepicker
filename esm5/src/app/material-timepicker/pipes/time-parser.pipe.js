import * as tslib_1 from "tslib";
import { Inject, Injectable, Pipe } from '@angular/core';
import { TIME_LOCALE } from '../tokens/time-locale.token';
import { TimeUnit } from '../models/time-unit.enum';
import { DateTime } from 'luxon';
var TimeParserPipe = /** @class */ (function () {
    function TimeParserPipe(locale) {
        this.locale = locale;
        this.numberingSystem = DateTime.local().setLocale(this.locale).resolvedLocaleOpts().numberingSystem;
    }
    TimeParserPipe.prototype.transform = function (time, timeUnit) {
        if (timeUnit === void 0) { timeUnit = TimeUnit.HOUR; }
        if (time == null || time === '') {
            return '';
        }
        if (!isNaN(+time)) {
            return time;
        }
        if (timeUnit === TimeUnit.MINUTE) {
            return this.parseTime(time, 'm', 'minute');
        }
        return this.parseTime(time, 'H', 'hour');
    };
    TimeParserPipe.prototype.parseTime = function (time, format, timeMeasure) {
        var parsedTime = DateTime.fromFormat(String(time), format, { numberingSystem: this.numberingSystem })[timeMeasure];
        if (!isNaN(parsedTime)) {
            return parsedTime;
        }
        throw new Error("Cannot parse time - " + time);
    };
    TimeParserPipe.ctorParameters = function () { return [
        { type: String, decorators: [{ type: Inject, args: [TIME_LOCALE,] }] }
    ]; };
    TimeParserPipe = tslib_1.__decorate([
        Pipe({
            name: 'timeParser'
        }),
        Injectable(),
        tslib_1.__param(0, Inject(TIME_LOCALE))
    ], TimeParserPipe);
    return TimeParserPipe;
}());
export { TimeParserPipe };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGltZS1wYXJzZXIucGlwZS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL25neC1tYXRlcmlhbC10aW1lcGlja2VyLyIsInNvdXJjZXMiOlsic3JjL2FwcC9tYXRlcmlhbC10aW1lcGlja2VyL3BpcGVzL3RpbWUtcGFyc2VyLnBpcGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLE9BQU8sRUFBRSxNQUFNLEVBQUUsVUFBVSxFQUFFLElBQUksRUFBaUIsTUFBTSxlQUFlLENBQUM7QUFDeEUsT0FBTyxFQUFFLFdBQVcsRUFBRSxNQUFNLDZCQUE2QixDQUFDO0FBQzFELE9BQU8sRUFBRSxRQUFRLEVBQUUsTUFBTSwwQkFBMEIsQ0FBQztBQUNwRCxPQUFPLEVBQUUsUUFBUSxFQUFFLE1BQU0sT0FBTyxDQUFDO0FBUWpDO0lBSUksd0JBQXlDLE1BQWM7UUFBZCxXQUFNLEdBQU4sTUFBTSxDQUFRO1FBQ25ELElBQUksQ0FBQyxlQUFlLEdBQUcsUUFBUSxDQUFDLEtBQUssRUFBRSxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUMsa0JBQWtCLEVBQUUsQ0FBQyxlQUFlLENBQUM7SUFDeEcsQ0FBQztJQUVELGtDQUFTLEdBQVQsVUFBVSxJQUFxQixFQUFFLFFBQXdCO1FBQXhCLHlCQUFBLEVBQUEsV0FBVyxRQUFRLENBQUMsSUFBSTtRQUNyRCxJQUFJLElBQUksSUFBSSxJQUFJLElBQUksSUFBSSxLQUFLLEVBQUUsRUFBRTtZQUM3QixPQUFPLEVBQUUsQ0FBQztTQUNiO1FBRUQsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDLElBQUksQ0FBQyxFQUFFO1lBQ2YsT0FBTyxJQUFJLENBQUM7U0FDZjtRQUVELElBQUksUUFBUSxLQUFLLFFBQVEsQ0FBQyxNQUFNLEVBQUU7WUFDOUIsT0FBTyxJQUFJLENBQUMsU0FBUyxDQUFDLElBQUksRUFBRSxHQUFHLEVBQUUsUUFBUSxDQUFDLENBQUM7U0FDOUM7UUFFRCxPQUFPLElBQUksQ0FBQyxTQUFTLENBQUMsSUFBSSxFQUFFLEdBQUcsRUFBRSxNQUFNLENBQUMsQ0FBQztJQUU3QyxDQUFDO0lBRU8sa0NBQVMsR0FBakIsVUFBa0IsSUFBcUIsRUFBRSxNQUFjLEVBQUUsV0FBd0I7UUFDN0UsSUFBTSxVQUFVLEdBQUcsUUFBUSxDQUFDLFVBQVUsQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLEVBQUUsTUFBTSxFQUFFLEVBQUMsZUFBZSxFQUFFLElBQUksQ0FBQyxlQUFlLEVBQUMsQ0FBQyxDQUFDLFdBQVcsQ0FBQyxDQUFDO1FBRW5ILElBQUksQ0FBQyxLQUFLLENBQUMsVUFBVSxDQUFDLEVBQUU7WUFDcEIsT0FBTyxVQUFVLENBQUM7U0FDckI7UUFFRCxNQUFNLElBQUksS0FBSyxDQUFDLHlCQUF1QixJQUFNLENBQUMsQ0FBQztJQUNuRCxDQUFDOzs2Q0E3QlksTUFBTSxTQUFDLFdBQVc7O0lBSnRCLGNBQWM7UUFKMUIsSUFBSSxDQUFDO1lBQ0YsSUFBSSxFQUFFLFlBQVk7U0FDckIsQ0FBQztRQUNELFVBQVUsRUFBRTtRQUtJLG1CQUFBLE1BQU0sQ0FBQyxXQUFXLENBQUMsQ0FBQTtPQUp2QixjQUFjLENBbUMxQjtJQUFELHFCQUFDO0NBQUEsQUFuQ0QsSUFtQ0M7U0FuQ1ksY0FBYyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEluamVjdCwgSW5qZWN0YWJsZSwgUGlwZSwgUGlwZVRyYW5zZm9ybSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgVElNRV9MT0NBTEUgfSBmcm9tICcuLi90b2tlbnMvdGltZS1sb2NhbGUudG9rZW4nO1xuaW1wb3J0IHsgVGltZVVuaXQgfSBmcm9tICcuLi9tb2RlbHMvdGltZS11bml0LmVudW0nO1xuaW1wb3J0IHsgRGF0ZVRpbWUgfSBmcm9tICdsdXhvbic7XG5cbnR5cGUgVGltZU1lYXN1cmUgPSAnaG91cicgfCAnbWludXRlJztcblxuQFBpcGUoe1xuICAgIG5hbWU6ICd0aW1lUGFyc2VyJ1xufSlcbkBJbmplY3RhYmxlKClcbmV4cG9ydCBjbGFzcyBUaW1lUGFyc2VyUGlwZSBpbXBsZW1lbnRzIFBpcGVUcmFuc2Zvcm0ge1xuXG4gICAgcHJpdmF0ZSByZWFkb25seSBudW1iZXJpbmdTeXN0ZW06IHN0cmluZztcblxuICAgIGNvbnN0cnVjdG9yKEBJbmplY3QoVElNRV9MT0NBTEUpIHByaXZhdGUgbG9jYWxlOiBzdHJpbmcpIHtcbiAgICAgICAgdGhpcy5udW1iZXJpbmdTeXN0ZW0gPSBEYXRlVGltZS5sb2NhbCgpLnNldExvY2FsZSh0aGlzLmxvY2FsZSkucmVzb2x2ZWRMb2NhbGVPcHRzKCkubnVtYmVyaW5nU3lzdGVtO1xuICAgIH1cblxuICAgIHRyYW5zZm9ybSh0aW1lOiBzdHJpbmcgfCBudW1iZXIsIHRpbWVVbml0ID0gVGltZVVuaXQuSE9VUik6IG51bWJlciB8IHN0cmluZyB7XG4gICAgICAgIGlmICh0aW1lID09IG51bGwgfHwgdGltZSA9PT0gJycpIHtcbiAgICAgICAgICAgIHJldHVybiAnJztcbiAgICAgICAgfVxuXG4gICAgICAgIGlmICghaXNOYU4oK3RpbWUpKSB7XG4gICAgICAgICAgICByZXR1cm4gdGltZTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmICh0aW1lVW5pdCA9PT0gVGltZVVuaXQuTUlOVVRFKSB7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5wYXJzZVRpbWUodGltZSwgJ20nLCAnbWludXRlJyk7XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gdGhpcy5wYXJzZVRpbWUodGltZSwgJ0gnLCAnaG91cicpO1xuXG4gICAgfVxuXG4gICAgcHJpdmF0ZSBwYXJzZVRpbWUodGltZTogc3RyaW5nIHwgbnVtYmVyLCBmb3JtYXQ6IHN0cmluZywgdGltZU1lYXN1cmU6IFRpbWVNZWFzdXJlKTogbnVtYmVyIHtcbiAgICAgICAgY29uc3QgcGFyc2VkVGltZSA9IERhdGVUaW1lLmZyb21Gb3JtYXQoU3RyaW5nKHRpbWUpLCBmb3JtYXQsIHtudW1iZXJpbmdTeXN0ZW06IHRoaXMubnVtYmVyaW5nU3lzdGVtfSlbdGltZU1lYXN1cmVdO1xuXG4gICAgICAgIGlmICghaXNOYU4ocGFyc2VkVGltZSkpIHtcbiAgICAgICAgICAgIHJldHVybiBwYXJzZWRUaW1lO1xuICAgICAgICB9XG5cbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKGBDYW5ub3QgcGFyc2UgdGltZSAtICR7dGltZX1gKTtcbiAgICB9XG5cbn1cbiJdfQ==