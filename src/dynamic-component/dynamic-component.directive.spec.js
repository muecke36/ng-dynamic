"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var testing_1 = require("@angular/core/testing");
var core_1 = require("@angular/core");
var common_1 = require("@angular/common");
var index_1 = require("./index");
var TestCmp = /** @class */ (function () {
    function TestCmp() {
        this.context = {
            flag: true,
            text: 'Dynamic'
        };
        this.template = "<div><p *ngIf=\"flag\">{{text}}</p></div>";
    }
    TestCmp = __decorate([
        core_1.Component({
            template: "<div *dynamicComponent=\"template; context: context; selector:'my-component'\"></div>"
        })
    ], TestCmp);
    return TestCmp;
}());
var MultipleCmp = /** @class */ (function () {
    function MultipleCmp() {
        this.list = [
            {
                template: "<div>{{text}}</div>",
                context: {
                    text: 'Dynamic-1'
                },
                selector: 'my-component'
            },
            {
                template: "<div>{{text}}</div>",
                context: {
                    text: 'Dynamic-2'
                },
                selector: 'my-component'
            }
        ];
    }
    MultipleCmp = __decorate([
        core_1.Component({
            template: "\n    <ng-container *ngFor=\"let cmp of list\">\n        <div *dynamicComponent=\"cmp.template; context: cmp.context; selector:cmp.selector\"></div>\n    </ng-container>\n    "
        })
    ], MultipleCmp);
    return MultipleCmp;
}());
var ButtonComponent = /** @class */ (function () {
    function ButtonComponent() {
        this.template = "<div><button (click)=\"onButtonClicked($event)\">Click me</button></div>";
    }
    ButtonComponent.prototype.onButtonClicked = function () {
        console.log('button clicked');
    };
    ButtonComponent = __decorate([
        core_1.Component({
            template: "<div *dynamicComponent=\"template; context: this;\"></div>"
        })
    ], ButtonComponent);
    return ButtonComponent;
}());
describe('dynamicComponent', function () {
    beforeEach(function () {
        testing_1.TestBed.configureTestingModule({
            imports: [
                index_1.DynamicComponentModule.forRoot({
                    imports: [common_1.CommonModule],
                    schemas: [core_1.CUSTOM_ELEMENTS_SCHEMA],
                    declarations: [] // for issue #27
                })
            ],
            declarations: [MultipleCmp, TestCmp, ButtonComponent],
        });
    });
    it('simple', testing_1.async(function () {
        testing_1.TestBed.compileComponents().then(function () {
            var fixture = testing_1.TestBed.createComponent(TestCmp);
            fixture.detectChanges();
            fixture.ngZone.onStable.subscribe(function () {
                var dynamicCmp = fixture.debugElement.query(function (el) { return el.name === 'my-component'; });
                console.log(dynamicCmp.nativeElement.innerHTML);
                expect(dynamicCmp.nativeElement.textContent).toBe('Dynamic');
            });
        });
    }));
    it('multiple', testing_1.async(function () {
        testing_1.TestBed.compileComponents().then(function () {
            var fixture = testing_1.TestBed.createComponent(MultipleCmp);
            fixture.detectChanges();
            fixture.ngZone.onStable.subscribe(function () {
                var dynamicCmps = fixture.debugElement.queryAll(function (el) { return el.name === 'my-component'; });
                expect(dynamicCmps.length).toBe(2);
                dynamicCmps.forEach(function (dynamicCmp, index) {
                    console.log(dynamicCmp.nativeElement.innerHTML);
                    expect(dynamicCmp.nativeElement.textContent).toBe("Dynamic-" + (index + 1));
                });
            });
        });
    }));
    it('without context/selector', testing_1.async(function () {
        testing_1.TestBed.overrideComponent(TestCmp, {
            set: {
                template: "<div *dynamicComponent=\"template\"></div>"
            }
        });
        testing_1.TestBed.compileComponents().then(function () {
            var fixture = testing_1.TestBed.createComponent(TestCmp);
            var now = Date.now();
            fixture.componentInstance.template = "<div><p>" + now + "</p></div>";
            fixture.detectChanges();
            fixture.ngZone.onStable.subscribe(function () {
                console.log(fixture.nativeElement.innerHTML);
                expect(fixture.nativeElement.textContent).toBe("" + now);
            });
        });
    }));
    it('with custom-element', testing_1.async(function () {
        testing_1.TestBed.overrideComponent(TestCmp, {
            set: {
                template: "<div *dynamicComponent=\"template\"></div>"
            }
        });
        testing_1.TestBed.compileComponents().then(function () {
            var fixture = testing_1.TestBed.createComponent(TestCmp);
            var now = Date.now();
            fixture.componentInstance.template = "<unknown-element>" + now + "</unknown-element>";
            fixture.detectChanges();
            fixture.ngZone.onStable.subscribe(function () {
                console.log(fixture.nativeElement.innerHTML);
                expect(fixture.nativeElement.textContent).toBe("" + now);
            });
        });
    }));
    it('button clicked', testing_1.async(function () {
        testing_1.TestBed.compileComponents().then(function () {
            var fixture = testing_1.TestBed.createComponent(ButtonComponent);
            var component = fixture.componentInstance;
            spyOn(component, 'onButtonClicked');
            fixture.detectChanges();
            fixture.ngZone.onStable.subscribe(function () {
                var button = fixture.debugElement.nativeElement.querySelector('button');
                button.click();
                console.log(fixture.nativeElement.innerHTML);
                expect(component.onButtonClicked).toHaveBeenCalled();
            });
        });
    }));
});
