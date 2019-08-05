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
var testing_1 = require("@angular/core/testing");
var core_1 = require("@angular/core");
var index_1 = require("./index");
var ChildCmp = /** @class */ (function () {
    function ChildCmp() {
    }
    ChildCmp.prototype.dynamicOnMount = function (attr) {
        this.text = attr.get('text');
    };
    ChildCmp.selector = 'child-cmp';
    __decorate([
        core_1.Input(),
        __metadata("design:type", String)
    ], ChildCmp.prototype, "text", void 0);
    ChildCmp = __decorate([
        core_1.Component({
            selector: 'child-cmp',
            template: "<p>child:{{text}}</p>",
        })
    ], ChildCmp);
    return ChildCmp;
}());
var ChildWithTimeoutCmp = /** @class */ (function () {
    function ChildWithTimeoutCmp() {
        this.show = true;
    }
    ChildWithTimeoutCmp.prototype.dynamicOnMount = function (attr) {
        this.text = attr.get('text');
    };
    ChildWithTimeoutCmp.prototype.ngOnInit = function () {
        var _this = this;
        setTimeout(function () {
            _this.show = false;
        }, 500);
    };
    ChildWithTimeoutCmp.selector = 'child-to-cmp';
    __decorate([
        core_1.Input(),
        __metadata("design:type", String)
    ], ChildWithTimeoutCmp.prototype, "text", void 0);
    ChildWithTimeoutCmp = __decorate([
        core_1.Component({
            selector: 'child-to-cmp',
            template: "<p *ngIf=\"show\">child:{{text}}</p>",
        })
    ], ChildWithTimeoutCmp);
    return ChildWithTimeoutCmp;
}());
var TestCmp = /** @class */ (function () {
    function TestCmp() {
        this.content = '';
    }
    TestCmp = __decorate([
        core_1.Component({
            template: "<dynamic-html [content]=\"content\"></dynamic-html>",
        })
    ], TestCmp);
    return TestCmp;
}());
var MultipleCmp = /** @class */ (function () {
    function MultipleCmp() {
        this.list = [
            "<div>1:<child-cmp text=\"dynamic\"></child-cmp></div>",
            "<div>2:<child-cmp text=\"dynamic\"></child-cmp></div>",
        ];
    }
    MultipleCmp = __decorate([
        core_1.Component({
            template: "\n    <ng-container *ngFor=\"let content of list\">\n        <dynamic-html [content]=\"content\"></dynamic-html>\n    </ng-container>\n    ",
        })
    ], MultipleCmp);
    return MultipleCmp;
}());
describe('DynamicHTMLComponent', function () {
    beforeEach(function () {
        testing_1.TestBed.configureTestingModule({
            imports: [
                index_1.DynamicHTMLModule.forRoot({
                    components: [
                        { selector: ChildCmp.selector, component: ChildCmp },
                        { selector: ChildWithTimeoutCmp.selector, component: ChildWithTimeoutCmp },
                    ]
                }),
            ],
            schemas: [core_1.CUSTOM_ELEMENTS_SCHEMA],
            declarations: [MultipleCmp, TestCmp, ChildCmp, ChildWithTimeoutCmp],
        });
    });
    it('should project a simple content', testing_1.async(function () {
        testing_1.TestBed.compileComponents().then(function () {
            var fixture = testing_1.TestBed.createComponent(TestCmp);
            fixture.componentInstance.content = "<div><p>dynamic</p><child-cmp text=\"dynamic\"></child-cmp></div>";
            fixture.detectChanges();
            var dynamicHTML = fixture.nativeElement.querySelector('dynamic-html');
            console.info(dynamicHTML.innerHTML);
            expect(dynamicHTML.innerHTML).toBe('<div><p>dynamic</p><child-cmp text="dynamic"><p>child:dynamic</p></child-cmp></div>');
        });
    }));
    it('should project multiple content', testing_1.async(function () {
        testing_1.TestBed.compileComponents().then(function () {
            var fixture = testing_1.TestBed.createComponent(MultipleCmp);
            fixture.detectChanges();
            var dynamicHTMLs = fixture.nativeElement.querySelectorAll('dynamic-html');
            expect(dynamicHTMLs.length).toBe(2);
            Array.prototype.forEach.call(dynamicHTMLs, function (dynamicHTML, index) {
                console.info(dynamicHTML.innerHTML);
                expect(dynamicHTML.textContent).toBe(index + 1 + ":child:dynamic");
            });
        });
    }));
    it('should detect changes', testing_1.fakeAsync(function () {
        testing_1.TestBed.compileComponents().then(function () {
            var fixture = testing_1.TestBed.createComponent(TestCmp);
            fixture.componentInstance.content = "<div><p>dynamic</p><child-to-cmp text=\"dynamic\"></child-to-cmp></div>";
            {
                fixture.detectChanges();
                var dynamicHTML = fixture.nativeElement.querySelector('dynamic-html');
                console.info(dynamicHTML.innerHTML);
                expect(dynamicHTML.textContent).toBe('dynamicchild:dynamic');
            }
            testing_1.tick(500);
            {
                fixture.detectChanges();
                var dynamicHTML = fixture.nativeElement.querySelector('dynamic-html');
                console.info(dynamicHTML.innerHTML);
                expect(dynamicHTML.textContent).toBe('dynamic');
            }
        });
    }));
    it('with custom-element', testing_1.async(function () {
        testing_1.TestBed.overrideComponent(TestCmp, {
            set: {
                template: "<dynamic-html [content]=\"content\"></dynamic-html>"
            }
        });
        testing_1.TestBed.compileComponents().then(function () {
            var fixture = testing_1.TestBed.createComponent(TestCmp);
            var now = Date.now();
            fixture.componentInstance.content = "<unknown-element>" + now + "</unknown-element>";
            fixture.detectChanges();
            console.info(fixture.nativeElement.innerHTML);
            expect(fixture.nativeElement.textContent).toBe("" + now);
        });
    }));
});
