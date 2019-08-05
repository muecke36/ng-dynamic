"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var platform_browser_dynamic_1 = require("@angular/platform-browser-dynamic");
var dynamic_component_directive_1 = require("./dynamic-component.directive");
var options_1 = require("./options");
function createJitCompiler(options) {
    options = options || [];
    return new platform_browser_dynamic_1.JitCompilerFactory().createCompiler(options);
}
exports.createJitCompiler = createJitCompiler;
/**
 * Setup for DynamicComponentDirective
 *
 * ```ts
 * @NgModule({
 *   imports: [
 *     DynamicComponentModule.forRoot({
 *       imports: [CommonModule]
 *     })
 *   ],
 * })
 * class AppModule {}
 * ```
 */
var DynamicComponentModule = /** @class */ (function () {
    function DynamicComponentModule() {
    }
    DynamicComponentModule_1 = DynamicComponentModule;
    DynamicComponentModule.forRoot = function (metadata) {
        return {
            ngModule: DynamicComponentModule_1,
            providers: [
                {
                    provide: core_1.Compiler, useFactory: createJitCompiler, deps: [[core_1.Optional(), core_1.COMPILER_OPTIONS]]
                },
                {
                    provide: options_1.DynamicComponentOptions, useValue: {
                        ngModuleMetadata: metadata,
                    }
                },
            ],
        };
    };
    var DynamicComponentModule_1;
    DynamicComponentModule = DynamicComponentModule_1 = __decorate([
        core_1.NgModule({
            declarations: [dynamic_component_directive_1.DynamicComponentDirective],
            exports: [dynamic_component_directive_1.DynamicComponentDirective],
        })
    ], DynamicComponentModule);
    return DynamicComponentModule;
}());
exports.DynamicComponentModule = DynamicComponentModule;
