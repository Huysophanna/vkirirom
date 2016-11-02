import { Directive, ElementRef, Input } from '@angular/core';
import { Platform } from 'ionic-angular';
import { Keyboard } from 'ionic-native';
/**
 * @name KeyboardAttachDirective
 * @description
 * The `keyboardAttach` directive will cause an element to float above the
 * keyboard when the keyboard shows. Currently only supports the `ion-footer` element.
 *
 * ### Notes
 * - This directive requires [Ionic Native](https://github.com/driftyco/ionic-native)
 * and the [Ionic Keyboard Plugin](https://github.com/driftyco/ionic-plugin-keyboard).
 * - Currently only tested to work on iOS.
 * - If there is an input in your footer, you will need to set
 *   `Keyboard.disableScroll(true)`.
 *
 * @usage
 *
 * ```html
 * <ion-content #content>
 * </ion-content>
 *
 * <ion-footer [keyboardAttach]="content">
 *   <ion-toolbar>
 *     <ion-item>
 *       <ion-input></ion-input>
 *     </ion-item>
 *   </ion-toolbar>
 * </ion-footer>
 * ```
 */
export var KeyboardAttachDirective = (function () {
    function KeyboardAttachDirective(elementRef, platform) {
        var _this = this;
        this.elementRef = elementRef;
        this.platform = platform;
        if (this.platform.is('cordova') && this.platform.is('ios')) {
            this.onShowSubscription = Keyboard.onKeyboardShow().subscribe(function (e) { return _this.onShow(e); });
            this.onHideSubscription = Keyboard.onKeyboardHide().subscribe(function () { return _this.onHide(); });
        }
    }
    KeyboardAttachDirective.prototype.ngOnDestroy = function () {
        if (this.onShowSubscription) {
            this.onShowSubscription.unsubscribe();
        }
        if (this.onHideSubscription) {
            this.onHideSubscription.unsubscribe();
        }
    };
    KeyboardAttachDirective.prototype.onShow = function (e) {
        var keyboardHeight = e.keyboardHeight || (e.detail && e.detail.keyboardHeight);
        this.setElementPosition(keyboardHeight);
    };
    ;
    KeyboardAttachDirective.prototype.onHide = function () {
        this.setElementPosition(0);
    };
    ;
    KeyboardAttachDirective.prototype.setElementPosition = function (pixels) {
        this.elementRef.nativeElement.style.paddingBottom = pixels + 'px';
        this.content.resize();
    };
    KeyboardAttachDirective.decorators = [
        { type: Directive, args: [{
                    selector: '[keyboardAttach]'
                },] },
    ];
    /** @nocollapse */
    KeyboardAttachDirective.ctorParameters = [
        { type: ElementRef, },
        { type: Platform, },
    ];
    KeyboardAttachDirective.propDecorators = {
        'content': [{ type: Input, args: ['keyboardAttach',] },],
    };
    return KeyboardAttachDirective;
}());
