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
/**
 * DynamicComponent is a directive to create dynamic component.
 *
 * Example:
 *
 * ```ts
 * @Component({
 *   selector: 'my-app',
 *   template: `
 *     <div *dynamicComponent="template; context: self; selector:'my-component'"></div>
 *   `
 * })
 * export class AppComponent {
 *   self = this;
 *
 *   template = `
 *   <div>
 *     <p>Dynamic Component</p>
 *   </div>`;
 * }
 * ```
 *
 * Result:
 *
 * ```html
 * <my-component>
 *    <div>
 *      <p>Dynamic Component</p>
 *    </div>
 * </my-component>
 * ```
 *
 */
var DynamicComponentDirective = /** @class */ (function () {
    function DynamicComponentDirective(options, vcRef, compiler) {
        this.options = options;
        this.vcRef = vcRef;
        this.compiler = compiler;
    }
    DynamicComponentDirective.prototype.createComponentType = function () {
        var metadata = new core_1.Component({
            selector: this.selector,
            template: this.template,
        });
        var cmpClass = /** @class */ (function () {
            function _() {
            }
            return _;
        }());
        return core_1.Component(metadata)(cmpClass);
    };
    DynamicComponentDirective.prototype.createNgModuleType = function (componentType) {
        var declarations = [].concat(this.options.ngModuleMetadata.declarations || []);
        declarations.push(componentType);
        var moduleMeta = {
            imports: this.options.ngModuleMetadata.imports,
            providers: this.options.ngModuleMetadata.providers,
            schemas: this.options.ngModuleMetadata.schemas,
            declarations: declarations
        };
        return core_1.NgModule(moduleMeta)(/** @class */ (function () {
            function _() {
            }
            return _;
        }()));
    };
    DynamicComponentDirective.prototype.ngOnChanges = function (changes) {
        var _this = this;
        if (!this.template) {
            return;
        }
        this.cmpType = this.createComponentType();
        this.moduleType = this.createNgModuleType(this.cmpType);
        var injector = core_1.ReflectiveInjector.fromResolvedProviders([], this.vcRef.parentInjector);
        this.compiler.compileModuleAndAllComponentsAsync(this.moduleType)
            .then(function (factory) {
            var cmpFactory;
            for (var i = factory.componentFactories.length - 1; i >= 0; i--) {
                if (factory.componentFactories[i].componentType === _this.cmpType) {
                    cmpFactory = factory.componentFactories[i];
                    break;
                }
            }
            return cmpFactory;
        }, function (error) {
        })
            .then(function (cmpFactory) {
            if (cmpFactory) {
                _this.vcRef.clear();
                _this.component = _this.vcRef.createComponent(cmpFactory, 0, injector);
                if (_this.context !== null && _this.context !== undefined) {
                    Object.assign(_this.component.instance, _this.context);
                    var proto = Object.getPrototypeOf(_this.context);
                    // don't copy default functions from plain objects
                    if (proto !== undefined && proto !== null && proto !== Object.prototype) {
                        var func = Object
                            .getOwnPropertyNames(proto)
                            .filter(function (entry) { return typeof _this.context[entry] === 'function' && entry !== 'constructor'; });
                        var funcMap_1 = {};
                        func.forEach(function (funcName) { return funcMap_1[funcName] = _this.context[funcName].bind(_this.context); });
                        Object.assign(_this.component.instance, funcMap_1);
                    }
                }
                _this.component.changeDetectorRef.detectChanges();
            }
        });
    };
    DynamicComponentDirective.prototype.ngOnDestroy = function () {
        if (this.component) {
            this.component.destroy();
        }
        if (this.compiler) {
            if (this.cmpType) {
                this.compiler.clearCacheFor(this.cmpType);
            }
            if (this.moduleType) {
                this.compiler.clearCacheFor(this.moduleType);
            }
        }
    };
    __decorate([
        core_1.Input('dynamicComponent'),
        __metadata("design:type", String)
    ], DynamicComponentDirective.prototype, "template", void 0);
    __decorate([
        core_1.Input('dynamicComponentSelector'),
        __metadata("design:type", String)
    ], DynamicComponentDirective.prototype, "selector", void 0);
    __decorate([
        core_1.Input('dynamicComponentContext'),
        __metadata("design:type", Object)
    ], DynamicComponentDirective.prototype, "context", void 0);
    DynamicComponentDirective = __decorate([
        core_1.Directive({
            selector: '[dynamicComponent]',
        }),
        __metadata("design:paramtypes", [options_1.DynamicComponentOptions,
            core_1.ViewContainerRef,
            core_1.Compiler])
    ], DynamicComponentDirective);
    return DynamicComponentDirective;
}());
exports.DynamicComponentDirective = DynamicComponentDirective;
