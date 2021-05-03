import * as tslib_1 from "tslib";
import { Inject, Pipe } from '@angular/core';
import { TIME_LOCALE } from '../tokens/time-locale.token';
import { TimeUnit } from '../models/time-unit.enum';
import { DateTime } from 'luxon';
var TimeLocalizerPipe = /** @class */ (function () {
    function TimeLocalizerPipe(locale) {
        this.locale = locale;
    }
    TimeLocalizerPipe.prototype.transform = function (time, timeUnit, isKeyboardEnabled) {
        if (isKeyboardEnabled === void 0) { isKeyboardEnabled = false; }
        if (time == null || time === '') {
            return '';
        }
        switch (timeUnit) {
            case TimeUnit.HOUR: {
                var format = (time === 0 || isKeyboardEnabled) ? 'HH' : 'H';
                return this.formatTime('hour', time, format);
            }
            case TimeUnit.MINUTE:
                return this.formatTime('minute', time, 'mm');
            default:
                throw new Error("There is no Time Unit with type " + timeUnit);
        }
    };
    TimeLocalizerPipe.prototype.formatTime = function (timeMeasure, time, format) {
        var _a;
        try {
            return DateTime.fromObject((_a = {}, _a[timeMeasure] = +time, _a)).setLocale(this.locale).toFormat(format);
        }
        catch (_b) {
            throw new Error("Cannot format provided time - " + time + " to locale - " + this.locale);
        }
    };
    TimeLocalizerPipe.ctorParameters = function () { return [
        { type: String, decorators: [{ type: Inject, args: [TIME_LOCALE,] }] }
    ]; };
    TimeLocalizerPipe = tslib_1.__decorate([
        Pipe({
            name: 'timeLocalizer'
        }),
        tslib_1.__param(0, Inject(TIME_LOCALE))
    ], TimeLocalizerPipe);
    return TimeLocalizerPipe;
}());
export { TimeLocalizerPipe };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGltZS1sb2NhbGl6ZXIucGlwZS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL25neC1tYXRlcmlhbC10aW1lcGlja2VyLyIsInNvdXJjZXMiOlsic3JjL2FwcC9tYXRlcmlhbC10aW1lcGlja2VyL3BpcGVzL3RpbWUtbG9jYWxpemVyLnBpcGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLE9BQU8sRUFBRSxNQUFNLEVBQUUsSUFBSSxFQUFpQixNQUFNLGVBQWUsQ0FBQztBQUM1RCxPQUFPLEVBQUUsV0FBVyxFQUFFLE1BQU0sNkJBQTZCLENBQUM7QUFDMUQsT0FBTyxFQUFFLFFBQVEsRUFBRSxNQUFNLDBCQUEwQixDQUFDO0FBQ3BELE9BQU8sRUFBRSxRQUFRLEVBQUUsTUFBTSxPQUFPLENBQUM7QUFPakM7SUFFSSwyQkFBeUMsTUFBYztRQUFkLFdBQU0sR0FBTixNQUFNLENBQVE7SUFDdkQsQ0FBQztJQUVELHFDQUFTLEdBQVQsVUFBVSxJQUFxQixFQUFFLFFBQWtCLEVBQUUsaUJBQXlCO1FBQXpCLGtDQUFBLEVBQUEseUJBQXlCO1FBQzFFLElBQUksSUFBSSxJQUFJLElBQUksSUFBSSxJQUFJLEtBQUssRUFBRSxFQUFFO1lBQzdCLE9BQU8sRUFBRSxDQUFDO1NBQ2I7UUFFRCxRQUFRLFFBQVEsRUFBRTtZQUNkLEtBQUssUUFBUSxDQUFDLElBQUksQ0FBQyxDQUFDO2dCQUNoQixJQUFNLE1BQU0sR0FBRyxDQUFDLElBQUksS0FBSyxDQUFDLElBQUksaUJBQWlCLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUM7Z0JBQzlELE9BQU8sSUFBSSxDQUFDLFVBQVUsQ0FBQyxNQUFNLEVBQUUsSUFBSSxFQUFFLE1BQU0sQ0FBQyxDQUFDO2FBQ2hEO1lBQ0QsS0FBSyxRQUFRLENBQUMsTUFBTTtnQkFDaEIsT0FBTyxJQUFJLENBQUMsVUFBVSxDQUFDLFFBQVEsRUFBRSxJQUFJLEVBQUUsSUFBSSxDQUFDLENBQUM7WUFDakQ7Z0JBQ0ksTUFBTSxJQUFJLEtBQUssQ0FBQyxxQ0FBbUMsUUFBVSxDQUFDLENBQUM7U0FDdEU7SUFDTCxDQUFDO0lBRU8sc0NBQVUsR0FBbEIsVUFBbUIsV0FBd0IsRUFBRSxJQUFxQixFQUFFLE1BQWM7O1FBQzlFLElBQUk7WUFDQSxPQUFPLFFBQVEsQ0FBQyxVQUFVLFdBQUUsR0FBQyxXQUFXLElBQUcsQ0FBQyxJQUFJLE1BQUUsQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDLFFBQVEsQ0FBQyxNQUFNLENBQUMsQ0FBQztTQUM5RjtRQUFDLFdBQU07WUFDSixNQUFNLElBQUksS0FBSyxDQUFDLG1DQUFpQyxJQUFJLHFCQUFnQixJQUFJLENBQUMsTUFBUSxDQUFDLENBQUM7U0FDdkY7SUFDTCxDQUFDOzs2Q0ExQlksTUFBTSxTQUFDLFdBQVc7O0lBRnRCLGlCQUFpQjtRQUg3QixJQUFJLENBQUM7WUFDRixJQUFJLEVBQUUsZUFBZTtTQUN4QixDQUFDO1FBR2UsbUJBQUEsTUFBTSxDQUFDLFdBQVcsQ0FBQyxDQUFBO09BRnZCLGlCQUFpQixDQTZCN0I7SUFBRCx3QkFBQztDQUFBLEFBN0JELElBNkJDO1NBN0JZLGlCQUFpQiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEluamVjdCwgUGlwZSwgUGlwZVRyYW5zZm9ybSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgVElNRV9MT0NBTEUgfSBmcm9tICcuLi90b2tlbnMvdGltZS1sb2NhbGUudG9rZW4nO1xuaW1wb3J0IHsgVGltZVVuaXQgfSBmcm9tICcuLi9tb2RlbHMvdGltZS11bml0LmVudW0nO1xuaW1wb3J0IHsgRGF0ZVRpbWUgfSBmcm9tICdsdXhvbic7XG5cbnR5cGUgVGltZU1lYXN1cmUgPSAnaG91cicgfCAnbWludXRlJztcblxuQFBpcGUoe1xuICAgIG5hbWU6ICd0aW1lTG9jYWxpemVyJ1xufSlcbmV4cG9ydCBjbGFzcyBUaW1lTG9jYWxpemVyUGlwZSBpbXBsZW1lbnRzIFBpcGVUcmFuc2Zvcm0ge1xuXG4gICAgY29uc3RydWN0b3IoQEluamVjdChUSU1FX0xPQ0FMRSkgcHJpdmF0ZSBsb2NhbGU6IHN0cmluZykge1xuICAgIH1cblxuICAgIHRyYW5zZm9ybSh0aW1lOiBudW1iZXIgfCBzdHJpbmcsIHRpbWVVbml0OiBUaW1lVW5pdCwgaXNLZXlib2FyZEVuYWJsZWQgPSBmYWxzZSk6IHN0cmluZyB7XG4gICAgICAgIGlmICh0aW1lID09IG51bGwgfHwgdGltZSA9PT0gJycpIHtcbiAgICAgICAgICAgIHJldHVybiAnJztcbiAgICAgICAgfVxuXG4gICAgICAgIHN3aXRjaCAodGltZVVuaXQpIHtcbiAgICAgICAgICAgIGNhc2UgVGltZVVuaXQuSE9VUjoge1xuICAgICAgICAgICAgICAgIGNvbnN0IGZvcm1hdCA9ICh0aW1lID09PSAwIHx8IGlzS2V5Ym9hcmRFbmFibGVkKSA/ICdISCcgOiAnSCc7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMuZm9ybWF0VGltZSgnaG91cicsIHRpbWUsIGZvcm1hdCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBjYXNlIFRpbWVVbml0Lk1JTlVURTpcbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5mb3JtYXRUaW1lKCdtaW51dGUnLCB0aW1lLCAnbW0nKTtcbiAgICAgICAgICAgIGRlZmF1bHQ6XG4gICAgICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKGBUaGVyZSBpcyBubyBUaW1lIFVuaXQgd2l0aCB0eXBlICR7dGltZVVuaXR9YCk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBwcml2YXRlIGZvcm1hdFRpbWUodGltZU1lYXN1cmU6IFRpbWVNZWFzdXJlLCB0aW1lOiBzdHJpbmcgfCBudW1iZXIsIGZvcm1hdDogc3RyaW5nKTogc3RyaW5nIHtcbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgIHJldHVybiBEYXRlVGltZS5mcm9tT2JqZWN0KHtbdGltZU1lYXN1cmVdOiArdGltZX0pLnNldExvY2FsZSh0aGlzLmxvY2FsZSkudG9Gb3JtYXQoZm9ybWF0KTtcbiAgICAgICAgfSBjYXRjaCB7XG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoYENhbm5vdCBmb3JtYXQgcHJvdmlkZWQgdGltZSAtICR7dGltZX0gdG8gbG9jYWxlIC0gJHt0aGlzLmxvY2FsZX1gKTtcbiAgICAgICAgfVxuICAgIH1cbn1cbiJdfQ==