/**
 * This file is generated by the Angular 2 template compiler.
 * Do not edit.
 */
 /* tslint:disable */

import * as import0 from '@angular/core/src/render/api';
import * as import1 from '@angular/core/src/linker/view';
import * as import2 from '@angular/core/src/linker/element';
import * as import3 from './login';
import * as import4 from '@angular/core/src/linker/view_utils';
import * as import5 from '@angular/core/src/di/injector';
import * as import6 from '@angular/core/src/linker/view_type';
import * as import7 from '@angular/core/src/change_detection/change_detection';
import * as import8 from 'ionic-angular/navigation/nav-controller';
import * as import9 from '@angular/core/src/metadata/view';
import * as import10 from '@angular/core/src/linker/component_factory';
import * as import11 from 'ionic-angular/components/toolbar/toolbar';
import * as import12 from 'ionic-angular/components/content/content';
import * as import13 from '@angular/forms/src/directives/ng_form';
import * as import14 from '@angular/forms/src/directives/ng_control_status';
import * as import15 from 'ionic-angular/components/item/item';
import * as import16 from '@angular/core/src/linker/query_list';
import * as import17 from 'ionic-angular/components/input/input';
import * as import18 from 'ionic-angular/components/icon/icon';
import * as import19 from 'ionic-angular/config/config';
import * as import20 from '@angular/core/src/linker/element_ref';
import * as import21 from 'ionic-angular/navigation/view-controller';
import * as import22 from '../../node_modules/ionic-angular/components/content/content.ngfactory';
import * as import23 from 'ionic-angular/components/app/app';
import * as import24 from 'ionic-angular/util/keyboard';
import * as import25 from '@angular/core/src/zone/ng_zone';
import * as import26 from 'ionic-angular/components/tabs/tabs';
import * as import27 from '../../node_modules/ionic-angular/components/item/item.ngfactory';
import * as import28 from 'ionic-angular/util/form';
import * as import29 from '../../node_modules/ionic-angular/components/input/input.ngfactory';
import * as import30 from 'ionic-angular/platform/platform';
import * as import31 from '@angular/forms/src/directives/ng_control';
import * as import32 from '@angular/forms/src/directives/control_container';
var renderType_Login_Host:import0.RenderComponentType = (null as any);
class _View_Login_Host0 extends import1.AppView<any> {
  _el_0:any;
  /*private*/ _appEl_0:import2.AppElement;
  _Login_0_4:import3.Login;
  constructor(viewUtils:import4.ViewUtils,parentInjector:import5.Injector,declarationEl:import2.AppElement) {
    super(_View_Login_Host0,renderType_Login_Host,import6.ViewType.HOST,viewUtils,parentInjector,declarationEl,import7.ChangeDetectorStatus.CheckAlways);
  }
  createInternal(rootSelector:string):import2.AppElement {
    this._el_0 = this.selectOrCreateHostElement('page-login',rootSelector,(null as any));
    this._appEl_0 = new import2.AppElement(0,(null as any),this,this._el_0);
    var compView_0:any = viewFactory_Login0(this.viewUtils,this.injector(0),this._appEl_0);
    this._Login_0_4 = new import3.Login(this.parentInjector.get(import8.NavController));
    this._appEl_0.initComponent(this._Login_0_4,([] as any[]),compView_0);
    compView_0.create(this._Login_0_4,this.projectableNodes,(null as any));
    this.init(([] as any[]).concat([this._el_0]),[this._el_0],([] as any[]),([] as any[]));
    return this._appEl_0;
  }
  injectorGetInternal(token:any,requestNodeIndex:number,notFoundResult:any):any {
    if (((token === import3.Login) && (0 === requestNodeIndex))) { return this._Login_0_4; }
    return notFoundResult;
  }
}
function viewFactory_Login_Host0(viewUtils:import4.ViewUtils,parentInjector:import5.Injector,declarationEl:import2.AppElement):import1.AppView<any> {
  if ((renderType_Login_Host === (null as any))) { (renderType_Login_Host = viewUtils.createRenderComponentType('',0,import9.ViewEncapsulation.None,([] as any[]),{})); }
  return new _View_Login_Host0(viewUtils,parentInjector,declarationEl);
}
export const LoginNgFactory:import10.ComponentFactory<import3.Login> = new import10.ComponentFactory<import3.Login>('page-login',viewFactory_Login_Host0,import3.Login);
const styles_Login:any[] = ([] as any[]);
var renderType_Login:import0.RenderComponentType = (null as any);
class _View_Login0 extends import1.AppView<import3.Login> {
  _text_0:any;
  _el_1:any;
  _Header_1_3:import11.Header;
  _text_2:any;
  _text_3:any;
  _el_4:any;
  /*private*/ _appEl_4:import2.AppElement;
  _Content_4_4:import12.Content;
  _text_5:any;
  _el_6:any;
  _text_7:any;
  _el_8:any;
  _text_9:any;
  _text_10:any;
  _el_11:any;
  _NgForm_11_3:import13.NgForm;
  _ControlContainer_11_4:any;
  _NgControlStatusGroup_11_5:import14.NgControlStatusGroup;
  _text_12:any;
  _el_13:any;
  _text_14:any;
  _el_15:any;
  /*private*/ _appEl_15:import2.AppElement;
  _Item_15_4:import15.Item;
  _ItemContent_15_5:import15.ItemContent;
  _query_Label_15_0:import16.QueryList<any>;
  _query_Button_15_1:import16.QueryList<any>;
  _query_Icon_15_2:import16.QueryList<any>;
  _text_16:any;
  _el_17:any;
  /*private*/ _appEl_17:import2.AppElement;
  _TextInput_17_4:import17.TextInput;
  _text_18:any;
  _el_19:any;
  _Icon_19_3:import18.Icon;
  _text_20:any;
  _text_21:any;
  _el_22:any;
  _text_23:any;
  _el_24:any;
  /*private*/ _appEl_24:import2.AppElement;
  _Item_24_4:import15.Item;
  _ItemContent_24_5:import15.ItemContent;
  _query_Label_24_0:import16.QueryList<any>;
  _query_Button_24_1:import16.QueryList<any>;
  _query_Icon_24_2:import16.QueryList<any>;
  _text_25:any;
  _el_26:any;
  /*private*/ _appEl_26:import2.AppElement;
  _TextInput_26_4:import17.TextInput;
  _text_27:any;
  _el_28:any;
  _Icon_28_3:import18.Icon;
  _text_29:any;
  _text_30:any;
  _text_31:any;
  _el_32:any;
  _text_33:any;
  _el_34:any;
  _text_35:any;
  _text_36:any;
  _el_37:any;
  _text_38:any;
  _text_39:any;
  _el_40:any;
  _el_41:any;
  _el_42:any;
  _text_43:any;
  _text_44:any;
  _text_45:any;
  _text_46:any;
  _text_47:any;
  /*private*/ _expr_0:any;
  /*private*/ _expr_4:any;
  /*private*/ _expr_5:any;
  /*private*/ _expr_6:any;
  /*private*/ _expr_7:any;
  /*private*/ _expr_8:any;
  /*private*/ _expr_9:any;
  /*private*/ _expr_10:any;
  /*private*/ _expr_11:any;
  /*private*/ _expr_12:any;
  /*private*/ _expr_13:any;
  /*private*/ _expr_14:any;
  /*private*/ _expr_15:any;
  /*private*/ _expr_16:any;
  /*private*/ _expr_17:any;
  constructor(viewUtils:import4.ViewUtils,parentInjector:import5.Injector,declarationEl:import2.AppElement) {
    super(_View_Login0,renderType_Login,import6.ViewType.COMPONENT,viewUtils,parentInjector,declarationEl,import7.ChangeDetectorStatus.CheckAlways);
  }
  createInternal(rootSelector:string):import2.AppElement {
    const parentRenderNode:any = this.renderer.createViewRoot(this.declarationAppElement.nativeElement);
    this._text_0 = this.renderer.createText(parentRenderNode,'\n',(null as any));
    this._el_1 = this.renderer.createElement(parentRenderNode,'ion-header',(null as any));
    this._Header_1_3 = new import11.Header(this.parentInjector.get(import19.Config),new import20.ElementRef(this._el_1),this.renderer,this.parentInjector.get(import21.ViewController,(null as any)));
    this._text_2 = this.renderer.createText(this._el_1,'\n\n',(null as any));
    this._text_3 = this.renderer.createText(parentRenderNode,'\n\n\n',(null as any));
    this._el_4 = this.renderer.createElement(parentRenderNode,'ion-content',(null as any));
    this.renderer.setElementAttribute(this._el_4,'class','container');
    this.renderer.setElementAttribute(this._el_4,'padding','');
    this._appEl_4 = new import2.AppElement(4,(null as any),this,this._el_4);
    var compView_4:any = import22.viewFactory_Content0(this.viewUtils,this.injector(4),this._appEl_4);
    this._Content_4_4 = new import12.Content(this.parentInjector.get(import19.Config),new import20.ElementRef(this._el_4),this.renderer,this.parentInjector.get(import23.App),this.parentInjector.get(import24.Keyboard),this.parentInjector.get(import25.NgZone),this.parentInjector.get(import21.ViewController,(null as any)),this.parentInjector.get(import26.Tabs,(null as any)));
    this._appEl_4.initComponent(this._Content_4_4,([] as any[]),compView_4);
    this._text_5 = this.renderer.createText((null as any),'\n  ',(null as any));
    this._el_6 = this.renderer.createElement((null as any),'div',(null as any));
    this.renderer.setElementAttribute(this._el_6,'class','vtop-bar');
    this._text_7 = this.renderer.createText(this._el_6,'\n    ',(null as any));
    this._el_8 = this.renderer.createElement(this._el_6,'img',(null as any));
    this.renderer.setElementAttribute(this._el_8,'class','vkirirom-img');
    this.renderer.setElementAttribute(this._el_8,'src','img/vkirirom_logo.svg');
    this._text_9 = this.renderer.createText(this._el_6,'\n  ',(null as any));
    this._text_10 = this.renderer.createText((null as any),'\n  ',(null as any));
    this._el_11 = this.renderer.createElement((null as any),'form',(null as any));
    this._NgForm_11_3 = new import13.NgForm((null as any),(null as any));
    this._ControlContainer_11_4 = this._NgForm_11_3;
    this._NgControlStatusGroup_11_5 = new import14.NgControlStatusGroup(this._ControlContainer_11_4);
    this._text_12 = this.renderer.createText(this._el_11,'\n    ',(null as any));
    this._el_13 = this.renderer.createElement(this._el_11,'div',(null as any));
    this.renderer.setElementAttribute(this._el_13,'class','input-login');
    this._text_14 = this.renderer.createText(this._el_13,'\n        ',(null as any));
    this._el_15 = this.renderer.createElement(this._el_13,'ion-item',(null as any));
    this.renderer.setElementAttribute(this._el_15,'class','input-field item item-block');
    this._appEl_15 = new import2.AppElement(15,13,this,this._el_15);
    var compView_15:any = import27.viewFactory_Item0(this.viewUtils,this.injector(15),this._appEl_15);
    this._Item_15_4 = new import15.Item(this.parentInjector.get(import28.Form),this.parentInjector.get(import19.Config),new import20.ElementRef(this._el_15),this.renderer);
    this._ItemContent_15_5 = new import15.ItemContent();
    this._query_Label_15_0 = new import16.QueryList<any>();
    this._query_Button_15_1 = new import16.QueryList<any>();
    this._query_Icon_15_2 = new import16.QueryList<any>();
    this._appEl_15.initComponent(this._Item_15_4,([] as any[]),compView_15);
    this._text_16 = this.renderer.createText((null as any),'\n          ',(null as any));
    this._el_17 = this.renderer.createElement((null as any),'ion-input',(null as any));
    this.renderer.setElementAttribute(this._el_17,'id','username');
    this.renderer.setElementAttribute(this._el_17,'name','username');
    this.renderer.setElementAttribute(this._el_17,'placeholder','Username');
    this.renderer.setElementAttribute(this._el_17,'type','text');
    this._appEl_17 = new import2.AppElement(17,15,this,this._el_17);
    var compView_17:any = import29.viewFactory_TextInput0(this.viewUtils,this.injector(17),this._appEl_17);
    this._TextInput_17_4 = new import17.TextInput(this.parentInjector.get(import19.Config),this.parentInjector.get(import28.Form),this._Item_15_4,this.parentInjector.get(import23.App),this.parentInjector.get(import30.Platform),new import20.ElementRef(this._el_17),this.renderer,this._Content_4_4,this.parentInjector.get(import8.NavController,(null as any)),this.parentInjector.get(import31.NgControl,(null as any)));
    this._appEl_17.initComponent(this._TextInput_17_4,([] as any[]),compView_17);
    compView_17.create(this._TextInput_17_4,([] as any[]),(null as any));
    this._text_18 = this.renderer.createText((null as any),'\n          ',(null as any));
    this._el_19 = this.renderer.createElement((null as any),'ion-icon',(null as any));
    this.renderer.setElementAttribute(this._el_19,'item-left','');
    this.renderer.setElementAttribute(this._el_19,'name','ios-person-outline');
    this.renderer.setElementAttribute(this._el_19,'role','img');
    this._Icon_19_3 = new import18.Icon(this.parentInjector.get(import19.Config),new import20.ElementRef(this._el_19),this.renderer);
    this._text_20 = this.renderer.createText((null as any),'\n        ',(null as any));
    this._query_Label_15_0.reset(([] as any[]));
    this._Item_15_4.contentLabel = this._query_Label_15_0.first;
    compView_15.create(this._Item_15_4,[
      ([] as any[]).concat([this._el_19]),
      ([] as any[]),
      ([] as any[]).concat([
        this._text_16,
        this._text_18,
        this._text_20
      ]
      ),
      ([] as any[]).concat([this._el_17]),
      ([] as any[])
    ]
    ,(null as any));
    this._text_21 = this.renderer.createText(this._el_13,'\n        ',(null as any));
    this._el_22 = this.renderer.createElement(this._el_13,'br',(null as any));
    this._text_23 = this.renderer.createText(this._el_13,'\n        ',(null as any));
    this._el_24 = this.renderer.createElement(this._el_13,'ion-item',(null as any));
    this.renderer.setElementAttribute(this._el_24,'class','input-field item item-block');
    this._appEl_24 = new import2.AppElement(24,13,this,this._el_24);
    var compView_24:any = import27.viewFactory_Item0(this.viewUtils,this.injector(24),this._appEl_24);
    this._Item_24_4 = new import15.Item(this.parentInjector.get(import28.Form),this.parentInjector.get(import19.Config),new import20.ElementRef(this._el_24),this.renderer);
    this._ItemContent_24_5 = new import15.ItemContent();
    this._query_Label_24_0 = new import16.QueryList<any>();
    this._query_Button_24_1 = new import16.QueryList<any>();
    this._query_Icon_24_2 = new import16.QueryList<any>();
    this._appEl_24.initComponent(this._Item_24_4,([] as any[]),compView_24);
    this._text_25 = this.renderer.createText((null as any),'\n          ',(null as any));
    this._el_26 = this.renderer.createElement((null as any),'ion-input',(null as any));
    this.renderer.setElementAttribute(this._el_26,'id','password');
    this.renderer.setElementAttribute(this._el_26,'name','password');
    this.renderer.setElementAttribute(this._el_26,'placeholder','Password');
    this.renderer.setElementAttribute(this._el_26,'type','password');
    this._appEl_26 = new import2.AppElement(26,24,this,this._el_26);
    var compView_26:any = import29.viewFactory_TextInput0(this.viewUtils,this.injector(26),this._appEl_26);
    this._TextInput_26_4 = new import17.TextInput(this.parentInjector.get(import19.Config),this.parentInjector.get(import28.Form),this._Item_24_4,this.parentInjector.get(import23.App),this.parentInjector.get(import30.Platform),new import20.ElementRef(this._el_26),this.renderer,this._Content_4_4,this.parentInjector.get(import8.NavController,(null as any)),this.parentInjector.get(import31.NgControl,(null as any)));
    this._appEl_26.initComponent(this._TextInput_26_4,([] as any[]),compView_26);
    compView_26.create(this._TextInput_26_4,([] as any[]),(null as any));
    this._text_27 = this.renderer.createText((null as any),'\n          ',(null as any));
    this._el_28 = this.renderer.createElement((null as any),'ion-icon',(null as any));
    this.renderer.setElementAttribute(this._el_28,'item-left','');
    this.renderer.setElementAttribute(this._el_28,'name','ios-lock-outline');
    this.renderer.setElementAttribute(this._el_28,'role','img');
    this._Icon_28_3 = new import18.Icon(this.parentInjector.get(import19.Config),new import20.ElementRef(this._el_28),this.renderer);
    this._text_29 = this.renderer.createText((null as any),'\n        ',(null as any));
    this._query_Label_24_0.reset(([] as any[]));
    this._Item_24_4.contentLabel = this._query_Label_24_0.first;
    compView_24.create(this._Item_24_4,[
      ([] as any[]).concat([this._el_28]),
      ([] as any[]),
      ([] as any[]).concat([
        this._text_25,
        this._text_27,
        this._text_29
      ]
      ),
      ([] as any[]).concat([this._el_26]),
      ([] as any[])
    ]
    ,(null as any));
    this._text_30 = this.renderer.createText(this._el_13,'\n    ',(null as any));
    this._text_31 = this.renderer.createText(this._el_11,'\n    ',(null as any));
    this._el_32 = this.renderer.createElement(this._el_11,'div',(null as any));
    this.renderer.setElementAttribute(this._el_32,'class','submit-login');
    this._text_33 = this.renderer.createText(this._el_32,'\n      ',(null as any));
    this._el_34 = this.renderer.createElement(this._el_32,'button',(null as any));
    this.renderer.setElementAttribute(this._el_34,'class','forgot-btn');
    this.renderer.setElementAttribute(this._el_34,'type','button');
    this._text_35 = this.renderer.createText(this._el_34,'Forgot your password?',(null as any));
    this._text_36 = this.renderer.createText(this._el_32,'\n      ',(null as any));
    this._el_37 = this.renderer.createElement(this._el_32,'button',(null as any));
    this.renderer.setElementAttribute(this._el_37,'class','signin-btn');
    this.renderer.setElementAttribute(this._el_37,'type','submit');
    this._text_38 = this.renderer.createText(this._el_37,'Sign In',(null as any));
    this._text_39 = this.renderer.createText(this._el_32,'\n      ',(null as any));
    this._el_40 = this.renderer.createElement(this._el_32,'button',(null as any));
    this.renderer.setElementAttribute(this._el_40,'class','signin-fb-btn');
    this.renderer.setElementAttribute(this._el_40,'type','button');
    this._el_41 = this.renderer.createElement(this._el_40,'span',(null as any));
    this.renderer.setElementAttribute(this._el_41,'class','fb-logo-in-btn');
    this._el_42 = this.renderer.createElement(this._el_41,'img',(null as any));
    this.renderer.setElementAttribute(this._el_42,'src','img/fb-logo.png');
    this._text_43 = this.renderer.createText(this._el_40,'Sign In with Facebook',(null as any));
    this._text_44 = this.renderer.createText(this._el_32,'\n    ',(null as any));
    this._text_45 = this.renderer.createText(this._el_11,'\n  ',(null as any));
    this._text_46 = this.renderer.createText((null as any),'\n',(null as any));
    compView_4.create(this._Content_4_4,[
      ([] as any[]),
      ([] as any[]).concat([
        this._text_5,
        this._el_6,
        this._text_10,
        this._el_11,
        this._text_46
      ]
      ),
      ([] as any[])
    ]
    ,(null as any));
    this._text_47 = this.renderer.createText(parentRenderNode,'\n',(null as any));
    this._expr_0 = import7.UNINITIALIZED;
    var disposable_0:Function = this.renderer.listen(this._el_11,'ngSubmit',this.eventHandler(this._handle_ngSubmit_11_0.bind(this)));
    var disposable_1:Function = this.renderer.listen(this._el_11,'submit',this.eventHandler(this._handle_submit_11_1.bind(this)));
    var disposable_2:Function = this.renderer.listen(this._el_11,'reset',this.eventHandler(this._handle_reset_11_2.bind(this)));
    const subscription_0:any = this._NgForm_11_3.ngSubmit.subscribe(this.eventHandler(this._handle_ngSubmit_11_0.bind(this)));
    this._expr_4 = import7.UNINITIALIZED;
    this._expr_5 = import7.UNINITIALIZED;
    this._expr_6 = import7.UNINITIALIZED;
    this._expr_7 = import7.UNINITIALIZED;
    this._expr_8 = import7.UNINITIALIZED;
    this._expr_9 = import7.UNINITIALIZED;
    this._expr_10 = import7.UNINITIALIZED;
    this._expr_11 = import7.UNINITIALIZED;
    this._expr_12 = import7.UNINITIALIZED;
    this._expr_13 = import7.UNINITIALIZED;
    this._expr_14 = import7.UNINITIALIZED;
    this._expr_15 = import7.UNINITIALIZED;
    this._expr_16 = import7.UNINITIALIZED;
    this._expr_17 = import7.UNINITIALIZED;
    this.init(([] as any[]),[
      this._text_0,
      this._el_1,
      this._text_2,
      this._text_3,
      this._el_4,
      this._text_5,
      this._el_6,
      this._text_7,
      this._el_8,
      this._text_9,
      this._text_10,
      this._el_11,
      this._text_12,
      this._el_13,
      this._text_14,
      this._el_15,
      this._text_16,
      this._el_17,
      this._text_18,
      this._el_19,
      this._text_20,
      this._text_21,
      this._el_22,
      this._text_23,
      this._el_24,
      this._text_25,
      this._el_26,
      this._text_27,
      this._el_28,
      this._text_29,
      this._text_30,
      this._text_31,
      this._el_32,
      this._text_33,
      this._el_34,
      this._text_35,
      this._text_36,
      this._el_37,
      this._text_38,
      this._text_39,
      this._el_40,
      this._el_41,
      this._el_42,
      this._text_43,
      this._text_44,
      this._text_45,
      this._text_46,
      this._text_47
    ]
    ,[
      disposable_0,
      disposable_1,
      disposable_2
    ]
    ,[subscription_0]);
    return (null as any);
  }
  injectorGetInternal(token:any,requestNodeIndex:number,notFoundResult:any):any {
    if (((token === import11.Header) && ((1 <= requestNodeIndex) && (requestNodeIndex <= 2)))) { return this._Header_1_3; }
    if (((token === import17.TextInput) && (17 === requestNodeIndex))) { return this._TextInput_17_4; }
    if (((token === import18.Icon) && (19 === requestNodeIndex))) { return this._Icon_19_3; }
    if (((token === import15.Item) && ((15 <= requestNodeIndex) && (requestNodeIndex <= 20)))) { return this._Item_15_4; }
    if (((token === import15.ItemContent) && ((15 <= requestNodeIndex) && (requestNodeIndex <= 20)))) { return this._ItemContent_15_5; }
    if (((token === import17.TextInput) && (26 === requestNodeIndex))) { return this._TextInput_26_4; }
    if (((token === import18.Icon) && (28 === requestNodeIndex))) { return this._Icon_28_3; }
    if (((token === import15.Item) && ((24 <= requestNodeIndex) && (requestNodeIndex <= 29)))) { return this._Item_24_4; }
    if (((token === import15.ItemContent) && ((24 <= requestNodeIndex) && (requestNodeIndex <= 29)))) { return this._ItemContent_24_5; }
    if (((token === import13.NgForm) && ((11 <= requestNodeIndex) && (requestNodeIndex <= 45)))) { return this._NgForm_11_3; }
    if (((token === import32.ControlContainer) && ((11 <= requestNodeIndex) && (requestNodeIndex <= 45)))) { return this._ControlContainer_11_4; }
    if (((token === import14.NgControlStatusGroup) && ((11 <= requestNodeIndex) && (requestNodeIndex <= 45)))) { return this._NgControlStatusGroup_11_5; }
    if (((token === import12.Content) && ((4 <= requestNodeIndex) && (requestNodeIndex <= 46)))) { return this._Content_4_4; }
    return notFoundResult;
  }
  detectChangesInternal(throwOnChange:boolean):void {
    if (((this.numberOfChecks === 0) && !throwOnChange)) { this._Content_4_4.ngOnInit(); }
    const currVal_10:any = 'Username';
    if (import4.checkBinding(throwOnChange,this._expr_10,currVal_10)) {
      this._TextInput_17_4.placeholder = currVal_10;
      this._expr_10 = currVal_10;
    }
    const currVal_11:any = 'text';
    if (import4.checkBinding(throwOnChange,this._expr_11,currVal_11)) {
      this._TextInput_17_4.type = currVal_11;
      this._expr_11 = currVal_11;
    }
    if (((this.numberOfChecks === 0) && !throwOnChange)) { this._TextInput_17_4.ngOnInit(); }
    const currVal_12:any = 'ios-person-outline';
    if (import4.checkBinding(throwOnChange,this._expr_12,currVal_12)) {
      this._Icon_19_3.name = currVal_12;
      this._expr_12 = currVal_12;
    }
    const currVal_14:any = 'Password';
    if (import4.checkBinding(throwOnChange,this._expr_14,currVal_14)) {
      this._TextInput_26_4.placeholder = currVal_14;
      this._expr_14 = currVal_14;
    }
    const currVal_15:any = 'password';
    if (import4.checkBinding(throwOnChange,this._expr_15,currVal_15)) {
      this._TextInput_26_4.type = currVal_15;
      this._expr_15 = currVal_15;
    }
    if (((this.numberOfChecks === 0) && !throwOnChange)) { this._TextInput_26_4.ngOnInit(); }
    const currVal_16:any = 'ios-lock-outline';
    if (import4.checkBinding(throwOnChange,this._expr_16,currVal_16)) {
      this._Icon_28_3.name = currVal_16;
      this._expr_16 = currVal_16;
    }
    this.detectContentChildrenChanges(throwOnChange);
    if (!throwOnChange) {
      if (this._query_Button_15_1.dirty) {
        this._query_Button_15_1.reset(([] as any[]));
        this._Item_15_4._buttons = this._query_Button_15_1;
        this._query_Button_15_1.notifyOnChanges();
      }
      if (this._query_Icon_15_2.dirty) {
        this._query_Icon_15_2.reset([this._Icon_19_3]);
        this._Item_15_4._icons = this._query_Icon_15_2;
        this._query_Icon_15_2.notifyOnChanges();
      }
      if (this._query_Button_24_1.dirty) {
        this._query_Button_24_1.reset(([] as any[]));
        this._Item_24_4._buttons = this._query_Button_24_1;
        this._query_Button_24_1.notifyOnChanges();
      }
      if (this._query_Icon_24_2.dirty) {
        this._query_Icon_24_2.reset([this._Icon_28_3]);
        this._Item_24_4._icons = this._query_Icon_24_2;
        this._query_Icon_24_2.notifyOnChanges();
      }
      this._TextInput_17_4.ngAfterContentChecked();
      if ((this.numberOfChecks === 0)) { this._Item_15_4.ngAfterContentInit(); }
      this._TextInput_26_4.ngAfterContentChecked();
      if ((this.numberOfChecks === 0)) { this._Item_24_4.ngAfterContentInit(); }
    }
    const currVal_0:any = this._Content_4_4._sbPadding;
    if (import4.checkBinding(throwOnChange,this._expr_0,currVal_0)) {
      this.renderer.setElementClass(this._el_4,'statusbar-padding',currVal_0);
      this._expr_0 = currVal_0;
    }
    const currVal_4:any = this._NgControlStatusGroup_11_5.ngClassUntouched;
    if (import4.checkBinding(throwOnChange,this._expr_4,currVal_4)) {
      this.renderer.setElementClass(this._el_11,'ng-untouched',currVal_4);
      this._expr_4 = currVal_4;
    }
    const currVal_5:any = this._NgControlStatusGroup_11_5.ngClassTouched;
    if (import4.checkBinding(throwOnChange,this._expr_5,currVal_5)) {
      this.renderer.setElementClass(this._el_11,'ng-touched',currVal_5);
      this._expr_5 = currVal_5;
    }
    const currVal_6:any = this._NgControlStatusGroup_11_5.ngClassPristine;
    if (import4.checkBinding(throwOnChange,this._expr_6,currVal_6)) {
      this.renderer.setElementClass(this._el_11,'ng-pristine',currVal_6);
      this._expr_6 = currVal_6;
    }
    const currVal_7:any = this._NgControlStatusGroup_11_5.ngClassDirty;
    if (import4.checkBinding(throwOnChange,this._expr_7,currVal_7)) {
      this.renderer.setElementClass(this._el_11,'ng-dirty',currVal_7);
      this._expr_7 = currVal_7;
    }
    const currVal_8:any = this._NgControlStatusGroup_11_5.ngClassValid;
    if (import4.checkBinding(throwOnChange,this._expr_8,currVal_8)) {
      this.renderer.setElementClass(this._el_11,'ng-valid',currVal_8);
      this._expr_8 = currVal_8;
    }
    const currVal_9:any = this._NgControlStatusGroup_11_5.ngClassInvalid;
    if (import4.checkBinding(throwOnChange,this._expr_9,currVal_9)) {
      this.renderer.setElementClass(this._el_11,'ng-invalid',currVal_9);
      this._expr_9 = currVal_9;
    }
    const currVal_13:any = this._Icon_19_3._hidden;
    if (import4.checkBinding(throwOnChange,this._expr_13,currVal_13)) {
      this.renderer.setElementClass(this._el_19,'hide',currVal_13);
      this._expr_13 = currVal_13;
    }
    const currVal_17:any = this._Icon_28_3._hidden;
    if (import4.checkBinding(throwOnChange,this._expr_17,currVal_17)) {
      this.renderer.setElementClass(this._el_28,'hide',currVal_17);
      this._expr_17 = currVal_17;
    }
    this.detectViewChildrenChanges(throwOnChange);
  }
  destroyInternal():void {
    this._TextInput_17_4.ngOnDestroy();
    this._Icon_19_3.ngOnDestroy();
    this._TextInput_26_4.ngOnDestroy();
    this._Icon_28_3.ngOnDestroy();
    this._Content_4_4.ngOnDestroy();
  }
  private _handle_ngSubmit_11_0($event:any):boolean {
    this.markPathToRootAsCheckOnce();
    const pd_0:any = ((<any>this.context.loginForm()) !== false);
    return (true && pd_0);
  }
  private _handle_submit_11_1($event:any):boolean {
    this.markPathToRootAsCheckOnce();
    const pd_0:any = ((<any>this._NgForm_11_3.onSubmit($event)) !== false);
    return (true && pd_0);
  }
  private _handle_reset_11_2($event:any):boolean {
    this.markPathToRootAsCheckOnce();
    const pd_0:any = ((<any>this._NgForm_11_3.onReset()) !== false);
    return (true && pd_0);
  }
}
export function viewFactory_Login0(viewUtils:import4.ViewUtils,parentInjector:import5.Injector,declarationEl:import2.AppElement):import1.AppView<import3.Login> {
  if ((renderType_Login === (null as any))) { (renderType_Login = viewUtils.createRenderComponentType('',0,import9.ViewEncapsulation.None,styles_Login,{})); }
  return new _View_Login0(viewUtils,parentInjector,declarationEl);
}