"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var options_1 = require("./options");
function isBrowserPlatform() {
    return window != null && window.document != null;
}
var DynamicHTMLRenderer = /** @class */ (function () {
    function DynamicHTMLRenderer(options, cfr, injector) {
        var _this = this;
        this.options = options;
        this.cfr = cfr;
        this.injector = injector;
        this.componentFactories = new Map();
        this.componentRefs = new Map();
        this.options.components.forEach(function (_a) {
            var selector = _a.selector, component = _a.component;
            var cf;
            cf = _this.cfr.resolveComponentFactory(component);
            _this.componentFactories.set(selector, cf);
        });
    }
    DynamicHTMLRenderer.prototype.renderInnerHTML = function (elementRef, html) {
        var _this = this;
        if (!isBrowserPlatform()) {
            throw new Error('dynamic-html supports only browser platform.');
        }
        elementRef.nativeElement.innerHTML = html;
        var componentRefs = [];
        this.options.components.forEach(function (_a) {
            var selector = _a.selector;
            var elements = elementRef.nativeElement.querySelectorAll(selector);
            Array.prototype.forEach.call(elements, function (el) {
                var content = el.innerHTML;
                var cmpRef = _this.componentFactories.get(selector).create(_this.injector, [], el);
                // remove `ng-version` attribute
                el.removeAttribute('ng-version');
                if (cmpRef.instance.dynamicOnMount) {
                    var attrsMap_1 = new Map();
                    if (el.hasAttributes()) {
                        Array.prototype.forEach.call(el.attributes, function (attr) {
                            attrsMap_1.set(attr.name, attr.value);
                        });
                    }
                    cmpRef.instance.dynamicOnMount(attrsMap_1, content, el);
                }
                componentRefs.push(cmpRef);
            });
        });
        this.componentRefs.set(elementRef, componentRefs);
        return {
            check: function () { return componentRefs.forEach(function (ref) { return ref.changeDetectorRef.detectChanges(); }); },
            destroy: function () {
                componentRefs.forEach(function (ref) { return ref.destroy(); });
                _this.componentRefs.delete(elementRef);
            },
        };
    };
    DynamicHTMLRenderer = __decorate([
        core_1.Injectable(),
        __metadata("design:paramtypes", [options_1.DynamicHTMLOptions, core_1.ComponentFactoryResolver, core_1.Injector])
    ], DynamicHTMLRenderer);
    return DynamicHTMLRenderer;
}());
exports.DynamicHTMLRenderer = DynamicHTMLRenderer;
