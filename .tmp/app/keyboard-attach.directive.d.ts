import { ElementRef } from '@angular/core';
import { Content, Platform } from 'ionic-angular';
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
export declare class KeyboardAttachDirective {
    private elementRef;
    private platform;
    content: Content;
    private onShowSubscription;
    private onHideSubscription;
    constructor(elementRef: ElementRef, platform: Platform);
    ngOnDestroy(): void;
    private onShow(e);
    private onHide();
    private setElementPosition(pixels);
}
