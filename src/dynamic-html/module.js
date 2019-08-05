"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var dynamic_html_component_1 = require("./dynamic-html.component");
var options_1 = require("./options");
var renderer_1 = require("./renderer");
/**
 * Setup for DynamicHTMLDirective
 *
 * ```ts
 * @NgModule({
 *   imports: [
 *     DynamicHTMLModule.forRoot({
 *       components: [
 *         { component: MyButtonComponent, selector: 'my-button' },
 *       ]
 *     })
 *   ],
 *   declarations: [AppComponent, MyButtonComponent],
 *   bootstrap: [AppComponent]
 * })
 * export class AppModule {
 * }
 * ```
 */
var DynamicHTMLModule = /** @class */ (function () {
    function DynamicHTMLModule() {
    }
    DynamicHTMLModule_1 = DynamicHTMLModule;
    DynamicHTMLModule.forRoot = function (options) {
        return {
            ngModule: DynamicHTMLModule_1,
            providers: [
                renderer_1.DynamicHTMLRenderer,
                { provide: options_1.DynamicHTMLOptions, useValue: options },
                { provide: core_1.ANALYZE_FOR_ENTRY_COMPONENTS, useValue: options.components, multi: true },
            ],
        };
    };
    var DynamicHTMLModule_1;
    DynamicHTMLModule = DynamicHTMLModule_1 = __decorate([
        core_1.NgModule({
            declarations: [dynamic_html_component_1.DynamicHTMLComponent],
            exports: [dynamic_html_component_1.DynamicHTMLComponent],
        })
    ], DynamicHTMLModule);
    return DynamicHTMLModule;
}());
exports.DynamicHTMLModule = DynamicHTMLModule;
