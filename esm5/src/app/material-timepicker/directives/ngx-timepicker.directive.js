import * as tslib_1 from "tslib";
import { Directive, ElementRef, HostListener, Inject, Input, OnChanges, OnDestroy, SimpleChanges } from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import { TimeAdapter } from '../services/time-adapter';
import { TIME_LOCALE } from '../tokens/time-locale.token';
var TimepickerDirective = /** @class */ (function () {
    function TimepickerDirective(elementRef, locale) {
        this.elementRef = elementRef;
        this.locale = locale;
        this._format = 12;
        this._value = '';
        this.timepickerSubscriptions = [];
        this.onTouched = function () {
        };
        this.onChange = function () {
        };
    }
    TimepickerDirective_1 = TimepickerDirective;
    Object.defineProperty(TimepickerDirective.prototype, "format", {
        get: function () {
            return this._format;
        },
        set: function (value) {
            this._format = value === 24 ? 24 : 12;
            var isDynamicallyChanged = value && (this.previousFormat && this.previousFormat !== this._format);
            if (isDynamicallyChanged) {
                this.value = this._value;
                this._timepicker.updateTime(this._value);
            }
            this.previousFormat = this._format;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(TimepickerDirective.prototype, "min", {
        get: function () {
            return this._min;
        },
        set: function (value) {
            if (typeof value === 'string') {
                this._min = TimeAdapter.parseTime(value, { locale: this.locale, format: this.format });
                return;
            }
            this._min = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(TimepickerDirective.prototype, "max", {
        get: function () {
            return this._max;
        },
        set: function (value) {
            if (typeof value === 'string') {
                this._max = TimeAdapter.parseTime(value, { locale: this.locale, format: this.format });
                return;
            }
            this._max = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(TimepickerDirective.prototype, "timepicker", {
        set: function (picker) {
            this.registerTimepicker(picker);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(TimepickerDirective.prototype, "value", {
        get: function () {
            if (!this._value) {
                return '';
            }
            return TimeAdapter.toLocaleTimeString(this._value, { format: this.format, locale: this.locale });
        },
        set: function (value) {
            if (!value) {
                this._value = '';
                this.updateInputValue();
                return;
            }
            var time = TimeAdapter.formatTime(value, { locale: this.locale, format: this.format });
            var isAvailable = TimeAdapter.isTimeAvailable(time, this._min, this._max, 'minutes', this._timepicker.minutesGap, this._format);
            if (isAvailable) {
                this._value = time;
                this.updateInputValue();
                return;
            }
            console.warn('Selected time doesn\'t match min or max value');
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(TimepickerDirective.prototype, "element", {
        get: function () {
            return this.elementRef && this.elementRef.nativeElement;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(TimepickerDirective.prototype, "defaultTime", {
        set: function (time) {
            this._timepicker.defaultTime = TimeAdapter.formatTime(time, { locale: this.locale, format: this.format });
        },
        enumerable: true,
        configurable: true
    });
    TimepickerDirective.prototype.updateValue = function (value) {
        this.value = value;
        this.onChange(value);
    };
    TimepickerDirective.prototype.ngOnChanges = function (changes) {
        if (changes['value'] && changes['value'].currentValue) {
            this.defaultTime = changes['value'].currentValue;
        }
    };
    TimepickerDirective.prototype.onClick = function (event) {
        if (!this.disableClick) {
            this._timepicker.open();
            event.stopPropagation();
        }
    };
    TimepickerDirective.prototype.writeValue = function (value) {
        this.value = value;
        if (value) {
            this.defaultTime = value;
        }
    };
    TimepickerDirective.prototype.registerOnChange = function (fn) {
        this.onChange = fn;
    };
    TimepickerDirective.prototype.registerOnTouched = function (fn) {
        this.onTouched = fn;
    };
    TimepickerDirective.prototype.setDisabledState = function (isDisabled) {
        this.disabled = isDisabled;
    };
    TimepickerDirective.prototype.ngOnDestroy = function () {
        this.timepickerSubscriptions.forEach(function (s) { return s.unsubscribe(); });
    };
    TimepickerDirective.prototype.registerTimepicker = function (picker) {
        var _this = this;
        if (picker) {
            this._timepicker = picker;
            this._timepicker.registerInput(this);
            this.timepickerSubscriptions.push(this._timepicker.timeSet.subscribe(function (time) {
                _this.value = time;
                _this.onChange(_this.value);
                _this.onTouched();
                _this.defaultTime = _this._value;
            }));
        }
        else {
            throw new Error('NgxMaterialTimepickerComponent is not defined.' +
                ' Please make sure you passed the timepicker to ngxTimepicker directive');
        }
    };
    TimepickerDirective.prototype.updateInputValue = function () {
        this.elementRef.nativeElement.value = this.value;
    };
    var TimepickerDirective_1;
    TimepickerDirective.ctorParameters = function () { return [
        { type: ElementRef },
        { type: String, decorators: [{ type: Inject, args: [TIME_LOCALE,] }] }
    ]; };
    tslib_1.__decorate([
        Input()
    ], TimepickerDirective.prototype, "format", null);
    tslib_1.__decorate([
        Input()
    ], TimepickerDirective.prototype, "min", null);
    tslib_1.__decorate([
        Input()
    ], TimepickerDirective.prototype, "max", null);
    tslib_1.__decorate([
        Input('ngxTimepicker')
    ], TimepickerDirective.prototype, "timepicker", null);
    tslib_1.__decorate([
        Input()
    ], TimepickerDirective.prototype, "value", null);
    tslib_1.__decorate([
        Input()
    ], TimepickerDirective.prototype, "disabled", void 0);
    tslib_1.__decorate([
        Input()
    ], TimepickerDirective.prototype, "disableClick", void 0);
    tslib_1.__decorate([
        HostListener('click', ['$event'])
    ], TimepickerDirective.prototype, "onClick", null);
    TimepickerDirective = TimepickerDirective_1 = tslib_1.__decorate([
        Directive({
            selector: '[ngxTimepicker]',
            providers: [
                {
                    provide: NG_VALUE_ACCESSOR,
                    useExisting: TimepickerDirective_1,
                    multi: true
                }
            ],
            host: {
                '[disabled]': 'disabled',
                '(change)': 'updateValue($event.target.value)',
                '(blur)': 'onTouched()',
            },
        }),
        tslib_1.__param(1, Inject(TIME_LOCALE))
    ], TimepickerDirective);
    return TimepickerDirective;
}());
export { TimepickerDirective };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibmd4LXRpbWVwaWNrZXIuZGlyZWN0aXZlLmpzIiwic291cmNlUm9vdCI6Im5nOi8vbmd4LW1hdGVyaWFsLXRpbWVwaWNrZXIvIiwic291cmNlcyI6WyJzcmMvYXBwL21hdGVyaWFsLXRpbWVwaWNrZXIvZGlyZWN0aXZlcy9uZ3gtdGltZXBpY2tlci5kaXJlY3RpdmUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLE9BQU8sRUFBRSxTQUFTLEVBQUUsVUFBVSxFQUFFLFlBQVksRUFBRSxNQUFNLEVBQUUsS0FBSyxFQUFFLFNBQVMsRUFBRSxTQUFTLEVBQUUsYUFBYSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBRXhILE9BQU8sRUFBd0IsaUJBQWlCLEVBQUUsTUFBTSxnQkFBZ0IsQ0FBQztBQUV6RSxPQUFPLEVBQUUsV0FBVyxFQUFFLE1BQU0sMEJBQTBCLENBQUM7QUFFdkQsT0FBTyxFQUFFLFdBQVcsRUFBRSxNQUFNLDZCQUE2QixDQUFDO0FBaUIxRDtJQXVHSSw2QkFBb0IsVUFBc0IsRUFDRCxNQUFjO1FBRG5DLGVBQVUsR0FBVixVQUFVLENBQVk7UUFDRCxXQUFNLEdBQU4sTUFBTSxDQUFRO1FBdEYvQyxZQUFPLEdBQUcsRUFBRSxDQUFDO1FBdUViLFdBQU0sR0FBRyxFQUFFLENBQUM7UUFLWiw0QkFBdUIsR0FBbUIsRUFBRSxDQUFDO1FBR3JELGNBQVMsR0FBRztRQUNaLENBQUMsQ0FBQTtRQUVPLGFBQVEsR0FBeUI7UUFDekMsQ0FBQyxDQUFBO0lBSUQsQ0FBQzs0QkF6R1EsbUJBQW1CO0lBRzVCLHNCQUFJLHVDQUFNO2FBV1Y7WUFDSSxPQUFPLElBQUksQ0FBQyxPQUFPLENBQUM7UUFDeEIsQ0FBQzthQWJELFVBQVcsS0FBYTtZQUNwQixJQUFJLENBQUMsT0FBTyxHQUFHLEtBQUssS0FBSyxFQUFFLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDO1lBQ3RDLElBQU0sb0JBQW9CLEdBQUcsS0FBSyxJQUFJLENBQUMsSUFBSSxDQUFDLGNBQWMsSUFBSSxJQUFJLENBQUMsY0FBYyxLQUFLLElBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQztZQUVwRyxJQUFJLG9CQUFvQixFQUFFO2dCQUN0QixJQUFJLENBQUMsS0FBSyxHQUFHLElBQUksQ0FBQyxNQUFNLENBQUM7Z0JBQ3pCLElBQUksQ0FBQyxXQUFXLENBQUMsVUFBVSxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQzthQUM1QztZQUNELElBQUksQ0FBQyxjQUFjLEdBQUcsSUFBSSxDQUFDLE9BQU8sQ0FBQztRQUN2QyxDQUFDOzs7T0FBQTtJQVNELHNCQUFJLG9DQUFHO2FBUVA7WUFDSSxPQUFPLElBQUksQ0FBQyxJQUFJLENBQUM7UUFDckIsQ0FBQzthQVZELFVBQVEsS0FBd0I7WUFDNUIsSUFBSSxPQUFPLEtBQUssS0FBSyxRQUFRLEVBQUU7Z0JBQzNCLElBQUksQ0FBQyxJQUFJLEdBQUcsV0FBVyxDQUFDLFNBQVMsQ0FBQyxLQUFLLEVBQUUsRUFBQyxNQUFNLEVBQUUsSUFBSSxDQUFDLE1BQU0sRUFBRSxNQUFNLEVBQUUsSUFBSSxDQUFDLE1BQU0sRUFBQyxDQUFDLENBQUM7Z0JBQ3JGLE9BQU87YUFDVjtZQUNELElBQUksQ0FBQyxJQUFJLEdBQUcsS0FBSyxDQUFDO1FBQ3RCLENBQUM7OztPQUFBO0lBU0Qsc0JBQUksb0NBQUc7YUFRUDtZQUNJLE9BQU8sSUFBSSxDQUFDLElBQUksQ0FBQztRQUNyQixDQUFDO2FBVkQsVUFBUSxLQUF3QjtZQUM1QixJQUFJLE9BQU8sS0FBSyxLQUFLLFFBQVEsRUFBRTtnQkFDM0IsSUFBSSxDQUFDLElBQUksR0FBRyxXQUFXLENBQUMsU0FBUyxDQUFDLEtBQUssRUFBRSxFQUFDLE1BQU0sRUFBRSxJQUFJLENBQUMsTUFBTSxFQUFFLE1BQU0sRUFBRSxJQUFJLENBQUMsTUFBTSxFQUFDLENBQUMsQ0FBQztnQkFDckYsT0FBTzthQUNWO1lBQ0QsSUFBSSxDQUFDLElBQUksR0FBRyxLQUFLLENBQUM7UUFDdEIsQ0FBQzs7O09BQUE7SUFTRCxzQkFBSSwyQ0FBVTthQUFkLFVBQWUsTUFBc0M7WUFDakQsSUFBSSxDQUFDLGtCQUFrQixDQUFDLE1BQU0sQ0FBQyxDQUFDO1FBQ3BDLENBQUM7OztPQUFBO0lBS0Qsc0JBQUksc0NBQUs7YUF3QlQ7WUFDSSxJQUFJLENBQUMsSUFBSSxDQUFDLE1BQU0sRUFBRTtnQkFDZCxPQUFPLEVBQUUsQ0FBQzthQUNiO1lBQ0QsT0FBTyxXQUFXLENBQUMsa0JBQWtCLENBQUMsSUFBSSxDQUFDLE1BQU0sRUFBRSxFQUFDLE1BQU0sRUFBRSxJQUFJLENBQUMsTUFBTSxFQUFFLE1BQU0sRUFBRSxJQUFJLENBQUMsTUFBTSxFQUFDLENBQUMsQ0FBQztRQUNuRyxDQUFDO2FBN0JELFVBQVUsS0FBYTtZQUNuQixJQUFJLENBQUMsS0FBSyxFQUFFO2dCQUNSLElBQUksQ0FBQyxNQUFNLEdBQUcsRUFBRSxDQUFDO2dCQUNqQixJQUFJLENBQUMsZ0JBQWdCLEVBQUUsQ0FBQztnQkFDeEIsT0FBTzthQUNWO1lBQ0QsSUFBTSxJQUFJLEdBQUcsV0FBVyxDQUFDLFVBQVUsQ0FBQyxLQUFLLEVBQUUsRUFBQyxNQUFNLEVBQUUsSUFBSSxDQUFDLE1BQU0sRUFBRSxNQUFNLEVBQUUsSUFBSSxDQUFDLE1BQU0sRUFBQyxDQUFDLENBQUM7WUFDdkYsSUFBTSxXQUFXLEdBQUcsV0FBVyxDQUFDLGVBQWUsQ0FDM0MsSUFBSSxFQUNNLElBQUksQ0FBQyxJQUFJLEVBQ1QsSUFBSSxDQUFDLElBQUksRUFDbkIsU0FBUyxFQUNULElBQUksQ0FBQyxXQUFXLENBQUMsVUFBVSxFQUMzQixJQUFJLENBQUMsT0FBTyxDQUNmLENBQUM7WUFFRixJQUFJLFdBQVcsRUFBRTtnQkFDYixJQUFJLENBQUMsTUFBTSxHQUFHLElBQUksQ0FBQztnQkFDbkIsSUFBSSxDQUFDLGdCQUFnQixFQUFFLENBQUM7Z0JBQ3hCLE9BQU87YUFDVjtZQUNELE9BQU8sQ0FBQyxJQUFJLENBQUMsK0NBQStDLENBQUMsQ0FBQztRQUNsRSxDQUFDOzs7T0FBQTtJQTJCRCxzQkFBSSx3Q0FBTzthQUFYO1lBQ0ksT0FBTyxJQUFJLENBQUMsVUFBVSxJQUFJLElBQUksQ0FBQyxVQUFVLENBQUMsYUFBYSxDQUFDO1FBQzVELENBQUM7OztPQUFBO0lBRUQsc0JBQVksNENBQVc7YUFBdkIsVUFBd0IsSUFBWTtZQUNoQyxJQUFJLENBQUMsV0FBVyxDQUFDLFdBQVcsR0FBRyxXQUFXLENBQUMsVUFBVSxDQUFDLElBQUksRUFBRSxFQUFDLE1BQU0sRUFBRSxJQUFJLENBQUMsTUFBTSxFQUFFLE1BQU0sRUFBRSxJQUFJLENBQUMsTUFBTSxFQUFDLENBQUMsQ0FBQztRQUM1RyxDQUFDOzs7T0FBQTtJQUVELHlDQUFXLEdBQVgsVUFBWSxLQUFhO1FBQ3JCLElBQUksQ0FBQyxLQUFLLEdBQUcsS0FBSyxDQUFDO1FBQ25CLElBQUksQ0FBQyxRQUFRLENBQUMsS0FBSyxDQUFDLENBQUM7SUFDekIsQ0FBQztJQUVELHlDQUFXLEdBQVgsVUFBWSxPQUFzQjtRQUM5QixJQUFJLE9BQU8sQ0FBQyxPQUFPLENBQUMsSUFBSSxPQUFPLENBQUMsT0FBTyxDQUFDLENBQUMsWUFBWSxFQUFFO1lBQ25ELElBQUksQ0FBQyxXQUFXLEdBQUcsT0FBTyxDQUFDLE9BQU8sQ0FBQyxDQUFDLFlBQVksQ0FBQztTQUNwRDtJQUNMLENBQUM7SUFHRCxxQ0FBTyxHQUFQLFVBQVEsS0FBSztRQUNULElBQUksQ0FBQyxJQUFJLENBQUMsWUFBWSxFQUFFO1lBQ3BCLElBQUksQ0FBQyxXQUFXLENBQUMsSUFBSSxFQUFFLENBQUM7WUFDeEIsS0FBSyxDQUFDLGVBQWUsRUFBRSxDQUFDO1NBQzNCO0lBQ0wsQ0FBQztJQUVELHdDQUFVLEdBQVYsVUFBVyxLQUFhO1FBQ3BCLElBQUksQ0FBQyxLQUFLLEdBQUcsS0FBSyxDQUFDO1FBQ25CLElBQUksS0FBSyxFQUFFO1lBQ1AsSUFBSSxDQUFDLFdBQVcsR0FBRyxLQUFLLENBQUM7U0FDNUI7SUFDTCxDQUFDO0lBRUQsOENBQWdCLEdBQWhCLFVBQWlCLEVBQXdCO1FBQ3JDLElBQUksQ0FBQyxRQUFRLEdBQUcsRUFBRSxDQUFDO0lBQ3ZCLENBQUM7SUFFRCwrQ0FBaUIsR0FBakIsVUFBa0IsRUFBYztRQUM1QixJQUFJLENBQUMsU0FBUyxHQUFHLEVBQUUsQ0FBQztJQUN4QixDQUFDO0lBRUQsOENBQWdCLEdBQWhCLFVBQWlCLFVBQW1CO1FBQ2hDLElBQUksQ0FBQyxRQUFRLEdBQUcsVUFBVSxDQUFDO0lBQy9CLENBQUM7SUFFRCx5Q0FBVyxHQUFYO1FBQ0ksSUFBSSxDQUFDLHVCQUF1QixDQUFDLE9BQU8sQ0FBQyxVQUFBLENBQUMsSUFBSSxPQUFBLENBQUMsQ0FBQyxXQUFXLEVBQUUsRUFBZixDQUFlLENBQUMsQ0FBQztJQUMvRCxDQUFDO0lBRU8sZ0RBQWtCLEdBQTFCLFVBQTJCLE1BQXNDO1FBQWpFLGlCQWNDO1FBYkcsSUFBSSxNQUFNLEVBQUU7WUFDUixJQUFJLENBQUMsV0FBVyxHQUFHLE1BQU0sQ0FBQztZQUMxQixJQUFJLENBQUMsV0FBVyxDQUFDLGFBQWEsQ0FBQyxJQUFJLENBQUMsQ0FBQztZQUNyQyxJQUFJLENBQUMsdUJBQXVCLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxXQUFXLENBQUMsT0FBTyxDQUFDLFNBQVMsQ0FBQyxVQUFDLElBQVk7Z0JBQzlFLEtBQUksQ0FBQyxLQUFLLEdBQUcsSUFBSSxDQUFDO2dCQUNsQixLQUFJLENBQUMsUUFBUSxDQUFDLEtBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQztnQkFDMUIsS0FBSSxDQUFDLFNBQVMsRUFBRSxDQUFDO2dCQUNqQixLQUFJLENBQUMsV0FBVyxHQUFHLEtBQUksQ0FBQyxNQUFNLENBQUM7WUFDbkMsQ0FBQyxDQUFDLENBQUMsQ0FBQztTQUNQO2FBQU07WUFDSCxNQUFNLElBQUksS0FBSyxDQUFDLGdEQUFnRDtnQkFDNUQsd0VBQXdFLENBQUMsQ0FBQztTQUNqRjtJQUNMLENBQUM7SUFFTyw4Q0FBZ0IsR0FBeEI7UUFDSSxJQUFJLENBQUMsVUFBVSxDQUFDLGFBQWEsQ0FBQyxLQUFLLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQztJQUNyRCxDQUFDOzs7Z0JBeEUrQixVQUFVOzZDQUM3QixNQUFNLFNBQUMsV0FBVzs7SUFyRy9CO1FBREMsS0FBSyxFQUFFO3FEQVVQO0lBU0Q7UUFEQyxLQUFLLEVBQUU7a0RBT1A7SUFTRDtRQURDLEtBQUssRUFBRTtrREFPUDtJQVNEO1FBREMsS0FBSyxDQUFDLGVBQWUsQ0FBQzt5REFHdEI7SUFLRDtRQURDLEtBQUssRUFBRTtvREF1QlA7SUFXUTtRQUFSLEtBQUssRUFBRTt5REFBbUI7SUFDbEI7UUFBUixLQUFLLEVBQUU7NkRBQXVCO0lBbUMvQjtRQURDLFlBQVksQ0FBQyxPQUFPLEVBQUUsQ0FBQyxRQUFRLENBQUMsQ0FBQztzREFNakM7SUFwSVEsbUJBQW1CO1FBZi9CLFNBQVMsQ0FBQztZQUNQLFFBQVEsRUFBRSxpQkFBaUI7WUFDM0IsU0FBUyxFQUFFO2dCQUNQO29CQUNJLE9BQU8sRUFBRSxpQkFBaUI7b0JBQzFCLFdBQVcsRUFBRSxxQkFBbUI7b0JBQ2hDLEtBQUssRUFBRSxJQUFJO2lCQUNkO2FBQ0o7WUFDRCxJQUFJLEVBQUU7Z0JBQ0YsWUFBWSxFQUFFLFVBQVU7Z0JBQ3hCLFVBQVUsRUFBRSxrQ0FBa0M7Z0JBQzlDLFFBQVEsRUFBRSxhQUFhO2FBQzFCO1NBQ0osQ0FBQztRQXlHZSxtQkFBQSxNQUFNLENBQUMsV0FBVyxDQUFDLENBQUE7T0F4R3ZCLG1CQUFtQixDQWlML0I7SUFBRCwwQkFBQztDQUFBLEFBakxELElBaUxDO1NBakxZLG1CQUFtQiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IERpcmVjdGl2ZSwgRWxlbWVudFJlZiwgSG9zdExpc3RlbmVyLCBJbmplY3QsIElucHV0LCBPbkNoYW5nZXMsIE9uRGVzdHJveSwgU2ltcGxlQ2hhbmdlcyB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgTmd4TWF0ZXJpYWxUaW1lcGlja2VyQ29tcG9uZW50IH0gZnJvbSAnLi4vbmd4LW1hdGVyaWFsLXRpbWVwaWNrZXIuY29tcG9uZW50JztcbmltcG9ydCB7IENvbnRyb2xWYWx1ZUFjY2Vzc29yLCBOR19WQUxVRV9BQ0NFU1NPUiB9IGZyb20gJ0Bhbmd1bGFyL2Zvcm1zJztcbmltcG9ydCB7IFN1YnNjcmlwdGlvbiB9IGZyb20gJ3J4anMnO1xuaW1wb3J0IHsgVGltZUFkYXB0ZXIgfSBmcm9tICcuLi9zZXJ2aWNlcy90aW1lLWFkYXB0ZXInO1xuaW1wb3J0IHsgRGF0ZVRpbWUgfSBmcm9tICdsdXhvbic7XG5pbXBvcnQgeyBUSU1FX0xPQ0FMRSB9IGZyb20gJy4uL3Rva2Vucy90aW1lLWxvY2FsZS50b2tlbic7XG5cbkBEaXJlY3RpdmUoe1xuICAgIHNlbGVjdG9yOiAnW25neFRpbWVwaWNrZXJdJyxcbiAgICBwcm92aWRlcnM6IFtcbiAgICAgICAge1xuICAgICAgICAgICAgcHJvdmlkZTogTkdfVkFMVUVfQUNDRVNTT1IsXG4gICAgICAgICAgICB1c2VFeGlzdGluZzogVGltZXBpY2tlckRpcmVjdGl2ZSxcbiAgICAgICAgICAgIG11bHRpOiB0cnVlXG4gICAgICAgIH1cbiAgICBdLFxuICAgIGhvc3Q6IHtcbiAgICAgICAgJ1tkaXNhYmxlZF0nOiAnZGlzYWJsZWQnLFxuICAgICAgICAnKGNoYW5nZSknOiAndXBkYXRlVmFsdWUoJGV2ZW50LnRhcmdldC52YWx1ZSknLFxuICAgICAgICAnKGJsdXIpJzogJ29uVG91Y2hlZCgpJyxcbiAgICB9LFxufSlcbmV4cG9ydCBjbGFzcyBUaW1lcGlja2VyRGlyZWN0aXZlIGltcGxlbWVudHMgQ29udHJvbFZhbHVlQWNjZXNzb3IsIE9uRGVzdHJveSwgT25DaGFuZ2VzIHtcblxuICAgIEBJbnB1dCgpXG4gICAgc2V0IGZvcm1hdCh2YWx1ZTogbnVtYmVyKSB7XG4gICAgICAgIHRoaXMuX2Zvcm1hdCA9IHZhbHVlID09PSAyNCA/IDI0IDogMTI7XG4gICAgICAgIGNvbnN0IGlzRHluYW1pY2FsbHlDaGFuZ2VkID0gdmFsdWUgJiYgKHRoaXMucHJldmlvdXNGb3JtYXQgJiYgdGhpcy5wcmV2aW91c0Zvcm1hdCAhPT0gdGhpcy5fZm9ybWF0KTtcblxuICAgICAgICBpZiAoaXNEeW5hbWljYWxseUNoYW5nZWQpIHtcbiAgICAgICAgICAgIHRoaXMudmFsdWUgPSB0aGlzLl92YWx1ZTtcbiAgICAgICAgICAgIHRoaXMuX3RpbWVwaWNrZXIudXBkYXRlVGltZSh0aGlzLl92YWx1ZSk7XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5wcmV2aW91c0Zvcm1hdCA9IHRoaXMuX2Zvcm1hdDtcbiAgICB9XG5cbiAgICBnZXQgZm9ybWF0KCk6IG51bWJlciB7XG4gICAgICAgIHJldHVybiB0aGlzLl9mb3JtYXQ7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBfZm9ybWF0ID0gMTI7XG5cbiAgICBASW5wdXQoKVxuICAgIHNldCBtaW4odmFsdWU6IHN0cmluZyB8IERhdGVUaW1lKSB7XG4gICAgICAgIGlmICh0eXBlb2YgdmFsdWUgPT09ICdzdHJpbmcnKSB7XG4gICAgICAgICAgICB0aGlzLl9taW4gPSBUaW1lQWRhcHRlci5wYXJzZVRpbWUodmFsdWUsIHtsb2NhbGU6IHRoaXMubG9jYWxlLCBmb3JtYXQ6IHRoaXMuZm9ybWF0fSk7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5fbWluID0gdmFsdWU7XG4gICAgfVxuXG4gICAgZ2V0IG1pbigpOiBzdHJpbmcgfCBEYXRlVGltZSB7XG4gICAgICAgIHJldHVybiB0aGlzLl9taW47XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBfbWluOiBzdHJpbmcgfCBEYXRlVGltZTtcblxuICAgIEBJbnB1dCgpXG4gICAgc2V0IG1heCh2YWx1ZTogc3RyaW5nIHwgRGF0ZVRpbWUpIHtcbiAgICAgICAgaWYgKHR5cGVvZiB2YWx1ZSA9PT0gJ3N0cmluZycpIHtcbiAgICAgICAgICAgIHRoaXMuX21heCA9IFRpbWVBZGFwdGVyLnBhcnNlVGltZSh2YWx1ZSwge2xvY2FsZTogdGhpcy5sb2NhbGUsIGZvcm1hdDogdGhpcy5mb3JtYXR9KTtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLl9tYXggPSB2YWx1ZTtcbiAgICB9XG5cbiAgICBnZXQgbWF4KCk6IHN0cmluZyB8IERhdGVUaW1lIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX21heDtcbiAgICB9XG5cbiAgICBwcml2YXRlIF9tYXg6IHN0cmluZyB8IERhdGVUaW1lO1xuXG4gICAgQElucHV0KCduZ3hUaW1lcGlja2VyJylcbiAgICBzZXQgdGltZXBpY2tlcihwaWNrZXI6IE5neE1hdGVyaWFsVGltZXBpY2tlckNvbXBvbmVudCkge1xuICAgICAgICB0aGlzLnJlZ2lzdGVyVGltZXBpY2tlcihwaWNrZXIpO1xuICAgIH1cblxuICAgIHByaXZhdGUgX3RpbWVwaWNrZXI6IE5neE1hdGVyaWFsVGltZXBpY2tlckNvbXBvbmVudDtcblxuICAgIEBJbnB1dCgpXG4gICAgc2V0IHZhbHVlKHZhbHVlOiBzdHJpbmcpIHtcbiAgICAgICAgaWYgKCF2YWx1ZSkge1xuICAgICAgICAgICAgdGhpcy5fdmFsdWUgPSAnJztcbiAgICAgICAgICAgIHRoaXMudXBkYXRlSW5wdXRWYWx1ZSgpO1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIGNvbnN0IHRpbWUgPSBUaW1lQWRhcHRlci5mb3JtYXRUaW1lKHZhbHVlLCB7bG9jYWxlOiB0aGlzLmxvY2FsZSwgZm9ybWF0OiB0aGlzLmZvcm1hdH0pO1xuICAgICAgICBjb25zdCBpc0F2YWlsYWJsZSA9IFRpbWVBZGFwdGVyLmlzVGltZUF2YWlsYWJsZShcbiAgICAgICAgICAgIHRpbWUsXG4gICAgICAgICAgICA8RGF0ZVRpbWU+dGhpcy5fbWluLFxuICAgICAgICAgICAgPERhdGVUaW1lPnRoaXMuX21heCxcbiAgICAgICAgICAgICdtaW51dGVzJyxcbiAgICAgICAgICAgIHRoaXMuX3RpbWVwaWNrZXIubWludXRlc0dhcCxcbiAgICAgICAgICAgIHRoaXMuX2Zvcm1hdFxuICAgICAgICApO1xuXG4gICAgICAgIGlmIChpc0F2YWlsYWJsZSkge1xuICAgICAgICAgICAgdGhpcy5fdmFsdWUgPSB0aW1lO1xuICAgICAgICAgICAgdGhpcy51cGRhdGVJbnB1dFZhbHVlKCk7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgY29uc29sZS53YXJuKCdTZWxlY3RlZCB0aW1lIGRvZXNuXFwndCBtYXRjaCBtaW4gb3IgbWF4IHZhbHVlJyk7XG4gICAgfVxuXG4gICAgZ2V0IHZhbHVlKCk6IHN0cmluZyB7XG4gICAgICAgIGlmICghdGhpcy5fdmFsdWUpIHtcbiAgICAgICAgICAgIHJldHVybiAnJztcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gVGltZUFkYXB0ZXIudG9Mb2NhbGVUaW1lU3RyaW5nKHRoaXMuX3ZhbHVlLCB7Zm9ybWF0OiB0aGlzLmZvcm1hdCwgbG9jYWxlOiB0aGlzLmxvY2FsZX0pO1xuICAgIH1cblxuICAgIHByaXZhdGUgX3ZhbHVlID0gJyc7XG5cbiAgICBASW5wdXQoKSBkaXNhYmxlZDogYm9vbGVhbjtcbiAgICBASW5wdXQoKSBkaXNhYmxlQ2xpY2s6IGJvb2xlYW47XG5cbiAgICBwcml2YXRlIHRpbWVwaWNrZXJTdWJzY3JpcHRpb25zOiBTdWJzY3JpcHRpb25bXSA9IFtdO1xuICAgIHByaXZhdGUgcHJldmlvdXNGb3JtYXQ6IG51bWJlcjtcblxuICAgIG9uVG91Y2hlZCA9ICgpID0+IHtcbiAgICB9XG5cbiAgICBwcml2YXRlIG9uQ2hhbmdlOiAodmFsdWU6IGFueSkgPT4gdm9pZCA9ICgpID0+IHtcbiAgICB9XG5cbiAgICBjb25zdHJ1Y3Rvcihwcml2YXRlIGVsZW1lbnRSZWY6IEVsZW1lbnRSZWYsXG4gICAgICAgICAgICAgICAgQEluamVjdChUSU1FX0xPQ0FMRSkgcHJpdmF0ZSBsb2NhbGU6IHN0cmluZykge1xuICAgIH1cblxuICAgIGdldCBlbGVtZW50KCk6IGFueSB7XG4gICAgICAgIHJldHVybiB0aGlzLmVsZW1lbnRSZWYgJiYgdGhpcy5lbGVtZW50UmVmLm5hdGl2ZUVsZW1lbnQ7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBzZXQgZGVmYXVsdFRpbWUodGltZTogc3RyaW5nKSB7XG4gICAgICAgIHRoaXMuX3RpbWVwaWNrZXIuZGVmYXVsdFRpbWUgPSBUaW1lQWRhcHRlci5mb3JtYXRUaW1lKHRpbWUsIHtsb2NhbGU6IHRoaXMubG9jYWxlLCBmb3JtYXQ6IHRoaXMuZm9ybWF0fSk7XG4gICAgfVxuXG4gICAgdXBkYXRlVmFsdWUodmFsdWU6IHN0cmluZykge1xuICAgICAgICB0aGlzLnZhbHVlID0gdmFsdWU7XG4gICAgICAgIHRoaXMub25DaGFuZ2UodmFsdWUpO1xuICAgIH1cblxuICAgIG5nT25DaGFuZ2VzKGNoYW5nZXM6IFNpbXBsZUNoYW5nZXMpIHtcbiAgICAgICAgaWYgKGNoYW5nZXNbJ3ZhbHVlJ10gJiYgY2hhbmdlc1sndmFsdWUnXS5jdXJyZW50VmFsdWUpIHtcbiAgICAgICAgICAgIHRoaXMuZGVmYXVsdFRpbWUgPSBjaGFuZ2VzWyd2YWx1ZSddLmN1cnJlbnRWYWx1ZTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIEBIb3N0TGlzdGVuZXIoJ2NsaWNrJywgWyckZXZlbnQnXSlcbiAgICBvbkNsaWNrKGV2ZW50KSB7XG4gICAgICAgIGlmICghdGhpcy5kaXNhYmxlQ2xpY2spIHtcbiAgICAgICAgICAgIHRoaXMuX3RpbWVwaWNrZXIub3BlbigpO1xuICAgICAgICAgICAgZXZlbnQuc3RvcFByb3BhZ2F0aW9uKCk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICB3cml0ZVZhbHVlKHZhbHVlOiBzdHJpbmcpOiB2b2lkIHtcbiAgICAgICAgdGhpcy52YWx1ZSA9IHZhbHVlO1xuICAgICAgICBpZiAodmFsdWUpIHtcbiAgICAgICAgICAgIHRoaXMuZGVmYXVsdFRpbWUgPSB2YWx1ZTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHJlZ2lzdGVyT25DaGFuZ2UoZm46ICh2YWx1ZTogYW55KSA9PiB2b2lkKTogdm9pZCB7XG4gICAgICAgIHRoaXMub25DaGFuZ2UgPSBmbjtcbiAgICB9XG5cbiAgICByZWdpc3Rlck9uVG91Y2hlZChmbjogKCkgPT4gdm9pZCk6IHZvaWQge1xuICAgICAgICB0aGlzLm9uVG91Y2hlZCA9IGZuO1xuICAgIH1cblxuICAgIHNldERpc2FibGVkU3RhdGUoaXNEaXNhYmxlZDogYm9vbGVhbik6IHZvaWQge1xuICAgICAgICB0aGlzLmRpc2FibGVkID0gaXNEaXNhYmxlZDtcbiAgICB9XG5cbiAgICBuZ09uRGVzdHJveSgpIHtcbiAgICAgICAgdGhpcy50aW1lcGlja2VyU3Vic2NyaXB0aW9ucy5mb3JFYWNoKHMgPT4gcy51bnN1YnNjcmliZSgpKTtcbiAgICB9XG5cbiAgICBwcml2YXRlIHJlZ2lzdGVyVGltZXBpY2tlcihwaWNrZXI6IE5neE1hdGVyaWFsVGltZXBpY2tlckNvbXBvbmVudCk6IHZvaWQge1xuICAgICAgICBpZiAocGlja2VyKSB7XG4gICAgICAgICAgICB0aGlzLl90aW1lcGlja2VyID0gcGlja2VyO1xuICAgICAgICAgICAgdGhpcy5fdGltZXBpY2tlci5yZWdpc3RlcklucHV0KHRoaXMpO1xuICAgICAgICAgICAgdGhpcy50aW1lcGlja2VyU3Vic2NyaXB0aW9ucy5wdXNoKHRoaXMuX3RpbWVwaWNrZXIudGltZVNldC5zdWJzY3JpYmUoKHRpbWU6IHN0cmluZykgPT4ge1xuICAgICAgICAgICAgICAgIHRoaXMudmFsdWUgPSB0aW1lO1xuICAgICAgICAgICAgICAgIHRoaXMub25DaGFuZ2UodGhpcy52YWx1ZSk7XG4gICAgICAgICAgICAgICAgdGhpcy5vblRvdWNoZWQoKTtcbiAgICAgICAgICAgICAgICB0aGlzLmRlZmF1bHRUaW1lID0gdGhpcy5fdmFsdWU7XG4gICAgICAgICAgICB9KSk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ05neE1hdGVyaWFsVGltZXBpY2tlckNvbXBvbmVudCBpcyBub3QgZGVmaW5lZC4nICtcbiAgICAgICAgICAgICAgICAnIFBsZWFzZSBtYWtlIHN1cmUgeW91IHBhc3NlZCB0aGUgdGltZXBpY2tlciB0byBuZ3hUaW1lcGlja2VyIGRpcmVjdGl2ZScpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgcHJpdmF0ZSB1cGRhdGVJbnB1dFZhbHVlKCk6IHZvaWQge1xuICAgICAgICB0aGlzLmVsZW1lbnRSZWYubmF0aXZlRWxlbWVudC52YWx1ZSA9IHRoaXMudmFsdWU7XG4gICAgfVxuXG59XG5cbiJdfQ==