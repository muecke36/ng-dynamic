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
var renderer_1 = require("./renderer");
/**
 * ComponentOutlet is a directive to create dynamic component.
 *
 * Example:
 *
 * ```ts
 * @Component({
 *   selector: 'my-app',
 *   template: `
 *     <dynamic-html [content]="content"></dynamic-html>
 *   `
 * })
 * export class AppComponent {
 *   content = `
 *   <article>
 *     <h1>Awesome Document</h1>
 *     <div>
 *       <p>bla bla bla</p>
 *       <my-button></my-button>
 *     </div>
 *   </article>
 *   `;
 * }
 * ```
 *
 */
var DynamicHTMLComponent = /** @class */ (function () {
    function DynamicHTMLComponent(renderer, elementRef) {
        this.renderer = renderer;
        this.elementRef = elementRef;
        this.ref = null;
    }
    DynamicHTMLComponent.prototype.ngOnChanges = function (_) {
        if (this.ref) {
            this.ref.destroy();
            this.ref = null;
        }
        if (this.content && this.elementRef) {
            this.ref = this.renderer.renderInnerHTML(this.elementRef, this.content);
        }
    };
    DynamicHTMLComponent.prototype.ngDoCheck = function () {
        if (this.ref) {
            this.ref.check();
        }
    };
    DynamicHTMLComponent.prototype.ngOnDestroy = function () {
        if (this.ref) {
            this.ref.destroy();
            this.ref = null;
        }
    };
    __decorate([
        core_1.Input(),
        __metadata("design:type", String)
    ], DynamicHTMLComponent.prototype, "content", void 0);
    DynamicHTMLComponent = __decorate([
        core_1.Component({
            selector: 'dynamic-html',
            template: '',
        }),
        __metadata("design:paramtypes", [renderer_1.DynamicHTMLRenderer,
            core_1.ElementRef])
    ], DynamicHTMLComponent);
    return DynamicHTMLComponent;
}());
exports.DynamicHTMLComponent = DynamicHTMLComponent;
