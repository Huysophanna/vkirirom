/**
 * This file is generated by the Angular 2 template compiler.
 * Do not edit.
 */
 /* tslint:disable */

import * as import0 from '@angular/core/src/render/api';
import * as import1 from '@angular/core/src/linker/view';
import * as import2 from '@angular/core/src/linker/element';
import * as import3 from './membership';
import * as import4 from '@angular/core/src/linker/view_utils';
import * as import5 from '@angular/core/src/di/injector';
import * as import6 from '@angular/core/src/linker/view_type';
import * as import7 from '@angular/core/src/change_detection/change_detection';
import * as import8 from 'ionic-angular/navigation/nav-controller';
import * as import9 from '@angular/core/src/metadata/view';
import * as import10 from '@angular/core/src/linker/component_factory';
import * as import11 from 'ionic-angular/components/toolbar/toolbar';
import * as import12 from 'ionic-angular/components/navbar/navbar';
import * as import13 from 'ionic-angular/components/toolbar/toolbar-title';
import * as import14 from 'ionic-angular/components/toolbar/toolbar-item';
import * as import15 from '@angular/core/src/linker/query_list';
import * as import16 from '@angular/common/src/directives/ng_style';
import * as import17 from 'ionic-angular/components/icon/icon';
import * as import18 from 'ionic-angular/components/content/content';
import * as import19 from '@angular/common/src/directives/ng_if';
import * as import20 from 'ionic-angular/components/grid/grid';
import * as import21 from 'ionic-angular/config/config';
import * as import22 from '@angular/core/src/linker/element_ref';
import * as import23 from 'ionic-angular/navigation/view-controller';
import * as import24 from '../../node_modules/ionic-angular/components/navbar/navbar.ngfactory';
import * as import25 from 'ionic-angular/components/app/app';
import * as import26 from '../../node_modules/ionic-angular/components/toolbar/toolbar-title.ngfactory';
import * as import27 from '@angular/core/src/change_detection/differs/keyvalue_differs';
import * as import28 from '../../node_modules/ionic-angular/components/content/content.ngfactory';
import * as import29 from 'ionic-angular/util/keyboard';
import * as import30 from '@angular/core/src/zone/ng_zone';
import * as import31 from 'ionic-angular/components/tabs/tabs';
import * as import32 from '@angular/core/src/linker/template_ref';
import * as import33 from '@angular/core/src/security';
var renderType_Membership_Host:import0.RenderComponentType = (null as any);
class _View_Membership_Host0 extends import1.AppView<any> {
  _el_0:any;
  /*private*/ _appEl_0:import2.AppElement;
  _Membership_0_4:import3.Membership;
  constructor(viewUtils:import4.ViewUtils,parentInjector:import5.Injector,declarationEl:import2.AppElement) {
    super(_View_Membership_Host0,renderType_Membership_Host,import6.ViewType.HOST,viewUtils,parentInjector,declarationEl,import7.ChangeDetectorStatus.CheckAlways);
  }
  createInternal(rootSelector:string):import2.AppElement {
    this._el_0 = this.selectOrCreateHostElement('page-membership',rootSelector,(null as any));
    this._appEl_0 = new import2.AppElement(0,(null as any),this,this._el_0);
    var compView_0:any = viewFactory_Membership0(this.viewUtils,this.injector(0),this._appEl_0);
    this._Membership_0_4 = new import3.Membership(this.parentInjector.get(import8.NavController));
    this._appEl_0.initComponent(this._Membership_0_4,[],compView_0);
    compView_0.create(this._Membership_0_4,this.projectableNodes,(null as any));
    this.init([].concat([this._el_0]),[this._el_0],[],[]);
    return this._appEl_0;
  }
  injectorGetInternal(token:any,requestNodeIndex:number,notFoundResult:any):any {
    if (((token === import3.Membership) && (0 === requestNodeIndex))) { return this._Membership_0_4; }
    return notFoundResult;
  }
}
function viewFactory_Membership_Host0(viewUtils:import4.ViewUtils,parentInjector:import5.Injector,declarationEl:import2.AppElement):import1.AppView<any> {
  if ((renderType_Membership_Host === (null as any))) { (renderType_Membership_Host = viewUtils.createRenderComponentType('',0,import9.ViewEncapsulation.None,[],{})); }
  return new _View_Membership_Host0(viewUtils,parentInjector,declarationEl);
}
export const MembershipNgFactory:import10.ComponentFactory<import3.Membership> = new import10.ComponentFactory<import3.Membership>('page-membership',viewFactory_Membership_Host0,import3.Membership);
const styles_Membership:any[] = [];
var renderType_Membership:import0.RenderComponentType = (null as any);
class _View_Membership0 extends import1.AppView<import3.Membership> {
  _text_0:any;
  _el_1:any;
  _Header_1_3:import11.Header;
  _text_2:any;
  _el_3:any;
  /*private*/ _appEl_3:import2.AppElement;
  _Navbar_3_4:import12.Navbar;
  _text_4:any;
  _el_5:any;
  /*private*/ _appEl_5:import2.AppElement;
  _ToolbarTitle_5_4:import13.ToolbarTitle;
  _text_6:any;
  _text_7:any;
  _el_8:any;
  _ToolbarItem_8_3:import14.ToolbarItem;
  _query_Button_8_0:import15.QueryList<any>;
  _text_9:any;
  _el_10:any;
  _NgStyle_10_3:import16.NgStyle;
  _Icon_10_4:import17.Icon;
  _text_11:any;
  _text_12:any;
  _text_13:any;
  _text_14:any;
  _el_15:any;
  /*private*/ _appEl_15:import2.AppElement;
  _Content_15_4:import18.Content;
  _text_16:any;
  _el_17:any;
  _text_18:any;
  _el_19:any;
  _text_20:any;
  _anchor_21:any;
  /*private*/ _appEl_21:import2.AppElement;
  _TemplateRef_21_5:any;
  _NgIf_21_6:import19.NgIf;
  _text_22:any;
  _anchor_23:any;
  /*private*/ _appEl_23:import2.AppElement;
  _TemplateRef_23_5:any;
  _NgIf_23_6:import19.NgIf;
  _text_24:any;
  _text_25:any;
  _el_26:any;
  _text_27:any;
  _anchor_28:any;
  /*private*/ _appEl_28:import2.AppElement;
  _TemplateRef_28_5:any;
  _NgIf_28_6:import19.NgIf;
  _text_29:any;
  _anchor_30:any;
  /*private*/ _appEl_30:import2.AppElement;
  _TemplateRef_30_5:any;
  _NgIf_30_6:import19.NgIf;
  _text_31:any;
  _text_32:any;
  _el_33:any;
  _text_34:any;
  _el_35:any;
  _text_36:any;
  _text_37:any;
  _text_38:any;
  _el_39:any;
  _Grid_39_3:import20.Grid;
  _text_40:any;
  _el_41:any;
  _Row_41_3:import20.Row;
  _text_42:any;
  _el_43:any;
  _Col_43_3:import20.Col;
  _text_44:any;
  _el_45:any;
  _Icon_45_3:import17.Icon;
  _text_46:any;
  _el_47:any;
  _text_48:any;
  _el_49:any;
  _text_50:any;
  _text_51:any;
  _text_52:any;
  _el_53:any;
  _Col_53_3:import20.Col;
  _text_54:any;
  _el_55:any;
  _Icon_55_3:import17.Icon;
  _text_56:any;
  _el_57:any;
  _text_58:any;
  _el_59:any;
  _el_60:any;
  _text_61:any;
  _text_62:any;
  _text_63:any;
  _text_64:any;
  _text_65:any;
  _el_66:any;
  _text_67:any;
  _el_68:any;
  _text_69:any;
  _text_70:any;
  _text_71:any;
  _text_72:any;
  /*private*/ _expr_0:any;
  /*private*/ _expr_1:any;
  _map_0:any;
  /*private*/ _expr_2:any;
  /*private*/ _expr_3:any;
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
  constructor(viewUtils:import4.ViewUtils,parentInjector:import5.Injector,declarationEl:import2.AppElement) {
    super(_View_Membership0,renderType_Membership,import6.ViewType.COMPONENT,viewUtils,parentInjector,declarationEl,import7.ChangeDetectorStatus.CheckAlways);
  }
  createInternal(rootSelector:string):import2.AppElement {
    const parentRenderNode:any = this.renderer.createViewRoot(this.declarationAppElement.nativeElement);
    this._text_0 = this.renderer.createText(parentRenderNode,'\n',(null as any));
    this._el_1 = this.renderer.createElement(parentRenderNode,'ion-header',(null as any));
    this.renderer.setElementAttribute(this._el_1,'class','header');
    this._Header_1_3 = new import11.Header(this.parentInjector.get(import21.Config),new import22.ElementRef(this._el_1),this.renderer,this.parentInjector.get(import23.ViewController,(null as any)));
    this._text_2 = this.renderer.createText(this._el_1,'\n\n    ',(null as any));
    this._el_3 = this.renderer.createElement(this._el_1,'ion-navbar',(null as any));
    this.renderer.setElementAttribute(this._el_3,'class','toolbar');
    this._appEl_3 = new import2.AppElement(3,1,this,this._el_3);
    var compView_3:any = import24.viewFactory_Navbar0(this.viewUtils,this.injector(3),this._appEl_3);
    this._Navbar_3_4 = new import12.Navbar(this.parentInjector.get(import25.App),this.parentInjector.get(import23.ViewController,(null as any)),this.parentInjector.get(import8.NavController,(null as any)),this.parentInjector.get(import21.Config),new import22.ElementRef(this._el_3),this.renderer);
    this._appEl_3.initComponent(this._Navbar_3_4,[],compView_3);
    this._text_4 = this.renderer.createText((null as any),'\n        ',(null as any));
    this._el_5 = this.renderer.createElement((null as any),'ion-title',(null as any));
    this._appEl_5 = new import2.AppElement(5,3,this,this._el_5);
    var compView_5:any = import26.viewFactory_ToolbarTitle0(this.viewUtils,this.injector(5),this._appEl_5);
    this._ToolbarTitle_5_4 = new import13.ToolbarTitle(this.parentInjector.get(import21.Config),new import22.ElementRef(this._el_5),this.renderer,this.parentInjector.get(import11.Toolbar,(null as any)),this._Navbar_3_4);
    this._appEl_5.initComponent(this._ToolbarTitle_5_4,[],compView_5);
    this._text_6 = this.renderer.createText((null as any),'Membership Card',(null as any));
    compView_5.create(this._ToolbarTitle_5_4,[[].concat([this._text_6])],(null as any));
    this._text_7 = this.renderer.createText((null as any),'\n        ',(null as any));
    this._el_8 = this.renderer.createElement((null as any),'ion-buttons',(null as any));
    this.renderer.setElementAttribute(this._el_8,'right','');
    this._ToolbarItem_8_3 = new import14.ToolbarItem(this.parentInjector.get(import21.Config),new import22.ElementRef(this._el_8),this.renderer,this.parentInjector.get(import11.Toolbar,(null as any)),this._Navbar_3_4);
    this._query_Button_8_0 = new import15.QueryList<any>();
    this._text_9 = this.renderer.createText(this._el_8,'\n            ',(null as any));
    this._el_10 = this.renderer.createElement(this._el_8,'ion-icon',(null as any));
    this.renderer.setElementAttribute(this._el_10,'name','ios-notifications');
    this.renderer.setElementAttribute(this._el_10,'role','img');
    this._NgStyle_10_3 = new import16.NgStyle(this.parentInjector.get(import27.KeyValueDiffers),new import22.ElementRef(this._el_10),this.renderer);
    this._Icon_10_4 = new import17.Icon(this.parentInjector.get(import21.Config),new import22.ElementRef(this._el_10),this.renderer);
    this._text_11 = this.renderer.createText(this._el_8,'\n        ',(null as any));
    this._text_12 = this.renderer.createText((null as any),'\n    ',(null as any));
    compView_3.create(this._Navbar_3_4,[
      [],
      [],
      [].concat([this._el_8]),
      [].concat([
        this._text_4,
        this._el_5,
        this._text_7,
        this._text_12
      ]
      )
    ]
    ,(null as any));
    this._text_13 = this.renderer.createText(this._el_1,'\n\n',(null as any));
    this._text_14 = this.renderer.createText(parentRenderNode,'\n\n\n',(null as any));
    this._el_15 = this.renderer.createElement(parentRenderNode,'ion-content',(null as any));
    this.renderer.setElementAttribute(this._el_15,'class','member-container');
    this.renderer.setElementAttribute(this._el_15,'padding','');
    this._appEl_15 = new import2.AppElement(15,(null as any),this,this._el_15);
    var compView_15:any = import28.viewFactory_Content0(this.viewUtils,this.injector(15),this._appEl_15);
    this._Content_15_4 = new import18.Content(this.parentInjector.get(import21.Config),new import22.ElementRef(this._el_15),this.renderer,this.parentInjector.get(import25.App),this.parentInjector.get(import29.Keyboard),this.parentInjector.get(import30.NgZone),this.parentInjector.get(import23.ViewController,(null as any)),this.parentInjector.get(import31.Tabs,(null as any)));
    this._appEl_15.initComponent(this._Content_15_4,[],compView_15);
    this._text_16 = this.renderer.createText((null as any),'\n\n    ',(null as any));
    this._el_17 = this.renderer.createElement((null as any),'div',(null as any));
    this.renderer.setElementAttribute(this._el_17,'class','profile-wrapper');
    this._text_18 = this.renderer.createText(this._el_17,'\n        ',(null as any));
    this._el_19 = this.renderer.createElement(this._el_17,'div',(null as any));
    this.renderer.setElementAttribute(this._el_19,'class','profile');
    this._text_20 = this.renderer.createText(this._el_19,'\n            ',(null as any));
    this._anchor_21 = this.renderer.createTemplateAnchor(this._el_19,(null as any));
    this._appEl_21 = new import2.AppElement(21,19,this,this._anchor_21);
    this._TemplateRef_21_5 = new import32.TemplateRef_(this._appEl_21,viewFactory_Membership1);
    this._NgIf_21_6 = new import19.NgIf(this._appEl_21.vcRef,this._TemplateRef_21_5);
    this._text_22 = this.renderer.createText(this._el_19,'\n            ',(null as any));
    this._anchor_23 = this.renderer.createTemplateAnchor(this._el_19,(null as any));
    this._appEl_23 = new import2.AppElement(23,19,this,this._anchor_23);
    this._TemplateRef_23_5 = new import32.TemplateRef_(this._appEl_23,viewFactory_Membership2);
    this._NgIf_23_6 = new import19.NgIf(this._appEl_23.vcRef,this._TemplateRef_23_5);
    this._text_24 = this.renderer.createText(this._el_19,'\n        ',(null as any));
    this._text_25 = this.renderer.createText(this._el_17,'\n\n        ',(null as any));
    this._el_26 = this.renderer.createElement(this._el_17,'div',(null as any));
    this.renderer.setElementAttribute(this._el_26,'class','profile-info');
    this._text_27 = this.renderer.createText(this._el_26,'\n            ',(null as any));
    this._anchor_28 = this.renderer.createTemplateAnchor(this._el_26,(null as any));
    this._appEl_28 = new import2.AppElement(28,26,this,this._anchor_28);
    this._TemplateRef_28_5 = new import32.TemplateRef_(this._appEl_28,viewFactory_Membership3);
    this._NgIf_28_6 = new import19.NgIf(this._appEl_28.vcRef,this._TemplateRef_28_5);
    this._text_29 = this.renderer.createText(this._el_26,'\n            ',(null as any));
    this._anchor_30 = this.renderer.createTemplateAnchor(this._el_26,(null as any));
    this._appEl_30 = new import2.AppElement(30,26,this,this._anchor_30);
    this._TemplateRef_30_5 = new import32.TemplateRef_(this._appEl_30,viewFactory_Membership4);
    this._NgIf_30_6 = new import19.NgIf(this._appEl_30.vcRef,this._TemplateRef_30_5);
    this._text_31 = this.renderer.createText(this._el_26,'\n        ',(null as any));
    this._text_32 = this.renderer.createText(this._el_17,'\n\n        ',(null as any));
    this._el_33 = this.renderer.createElement(this._el_17,'div',(null as any));
    this.renderer.setElementAttribute(this._el_33,'class','profile-info');
    this._text_34 = this.renderer.createText(this._el_33,'\n            ID: ',(null as any));
    this._el_35 = this.renderer.createElement(this._el_33,'span',(null as any));
    this._text_36 = this.renderer.createText(this._el_35,' 9412558112 ',(null as any));
    this._text_37 = this.renderer.createText(this._el_33,'\n        ',(null as any));
    this._text_38 = this.renderer.createText(this._el_17,'\n\n        ',(null as any));
    this._el_39 = this.renderer.createElement(this._el_17,'ion-grid',(null as any));
    this.renderer.setElementAttribute(this._el_39,'class','detail');
    this._Grid_39_3 = new import20.Grid();
    this._text_40 = this.renderer.createText(this._el_39,'\n            ',(null as any));
    this._el_41 = this.renderer.createElement(this._el_39,'ion-row',(null as any));
    this._Row_41_3 = new import20.Row();
    this._text_42 = this.renderer.createText(this._el_41,'\n                ',(null as any));
    this._el_43 = this.renderer.createElement(this._el_41,'ion-col',(null as any));
    this.renderer.setElementAttribute(this._el_43,'class','detail-item');
    this.renderer.setElementAttribute(this._el_43,'width-50','');
    this._Col_43_3 = new import20.Col();
    this._text_44 = this.renderer.createText(this._el_43,'\n                    ',(null as any));
    this._el_45 = this.renderer.createElement(this._el_43,'ion-icon',(null as any));
    this.renderer.setElementAttribute(this._el_45,'name','basket');
    this.renderer.setElementAttribute(this._el_45,'role','img');
    this._Icon_45_3 = new import17.Icon(this.parentInjector.get(import21.Config),new import22.ElementRef(this._el_45),this.renderer);
    this._text_46 = this.renderer.createText(this._el_43,'  vPoint',(null as any));
    this._el_47 = this.renderer.createElement(this._el_43,'br',(null as any));
    this._text_48 = this.renderer.createText(this._el_43,'\n                    ',(null as any));
    this._el_49 = this.renderer.createElement(this._el_43,'span',(null as any));
    this._text_50 = this.renderer.createText(this._el_49,'168',(null as any));
    this._text_51 = this.renderer.createText(this._el_43,'\n                ',(null as any));
    this._text_52 = this.renderer.createText(this._el_41,'\n                ',(null as any));
    this._el_53 = this.renderer.createElement(this._el_41,'ion-col',(null as any));
    this.renderer.setElementAttribute(this._el_53,'class','detail-item');
    this.renderer.setElementAttribute(this._el_53,'width-50','');
    this._Col_53_3 = new import20.Col();
    this._text_54 = this.renderer.createText(this._el_53,'\n                    ',(null as any));
    this._el_55 = this.renderer.createElement(this._el_53,'ion-icon',(null as any));
    this.renderer.setElementAttribute(this._el_55,'name','logo-buffer');
    this.renderer.setElementAttribute(this._el_55,'role','img');
    this._Icon_55_3 = new import17.Icon(this.parentInjector.get(import21.Config),new import22.ElementRef(this._el_55),this.renderer);
    this._text_56 = this.renderer.createText(this._el_53,'  Type',(null as any));
    this._el_57 = this.renderer.createElement(this._el_53,'br',(null as any));
    this._text_58 = this.renderer.createText(this._el_53,'\n                    ',(null as any));
    this._el_59 = this.renderer.createElement(this._el_53,'span',(null as any));
    this._el_60 = this.renderer.createElement(this._el_59,'b',(null as any));
    this._text_61 = this.renderer.createText(this._el_60,'Gold',(null as any));
    this._text_62 = this.renderer.createText(this._el_53,'\n                ',(null as any));
    this._text_63 = this.renderer.createText(this._el_41,'\n            ',(null as any));
    this._text_64 = this.renderer.createText(this._el_39,'\n        ',(null as any));
    this._text_65 = this.renderer.createText(this._el_17,'\n\n        ',(null as any));
    this._el_66 = this.renderer.createElement(this._el_17,'div',(null as any));
    this.renderer.setElementAttribute(this._el_66,'class','expire-date');
    this._text_67 = this.renderer.createText(this._el_66,'\n            Expire Date: ',(null as any));
    this._el_68 = this.renderer.createElement(this._el_66,'span',(null as any));
    this._text_69 = this.renderer.createText(this._el_68,'10/ Oct/ 2017',(null as any));
    this._text_70 = this.renderer.createText(this._el_66,'\n        ',(null as any));
    this._text_71 = this.renderer.createText(this._el_17,'\n    ',(null as any));
    this._text_72 = this.renderer.createText((null as any),'\n\n',(null as any));
    compView_15.create(this._Content_15_4,[
      [],
      [].concat([
        this._text_16,
        this._el_17,
        this._text_72
      ]
      ),
      []
    ]
    ,(null as any));
    this._expr_0 = import7.UNINITIALIZED;
    this._expr_1 = import7.UNINITIALIZED;
    this._map_0 = import4.pureProxy1((p0:any):{[key: string]:any} => {
      return {color: p0};
    });
    this._expr_2 = import7.UNINITIALIZED;
    this._expr_3 = import7.UNINITIALIZED;
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
    this.init([],[
      this._text_0,
      this._el_1,
      this._text_2,
      this._el_3,
      this._text_4,
      this._el_5,
      this._text_6,
      this._text_7,
      this._el_8,
      this._text_9,
      this._el_10,
      this._text_11,
      this._text_12,
      this._text_13,
      this._text_14,
      this._el_15,
      this._text_16,
      this._el_17,
      this._text_18,
      this._el_19,
      this._text_20,
      this._anchor_21,
      this._text_22,
      this._anchor_23,
      this._text_24,
      this._text_25,
      this._el_26,
      this._text_27,
      this._anchor_28,
      this._text_29,
      this._anchor_30,
      this._text_31,
      this._text_32,
      this._el_33,
      this._text_34,
      this._el_35,
      this._text_36,
      this._text_37,
      this._text_38,
      this._el_39,
      this._text_40,
      this._el_41,
      this._text_42,
      this._el_43,
      this._text_44,
      this._el_45,
      this._text_46,
      this._el_47,
      this._text_48,
      this._el_49,
      this._text_50,
      this._text_51,
      this._text_52,
      this._el_53,
      this._text_54,
      this._el_55,
      this._text_56,
      this._el_57,
      this._text_58,
      this._el_59,
      this._el_60,
      this._text_61,
      this._text_62,
      this._text_63,
      this._text_64,
      this._text_65,
      this._el_66,
      this._text_67,
      this._el_68,
      this._text_69,
      this._text_70,
      this._text_71,
      this._text_72
    ]
    ,[],[]);
    return (null as any);
  }
  injectorGetInternal(token:any,requestNodeIndex:number,notFoundResult:any):any {
    if (((token === import13.ToolbarTitle) && ((5 <= requestNodeIndex) && (requestNodeIndex <= 6)))) { return this._ToolbarTitle_5_4; }
    if (((token === import16.NgStyle) && (10 === requestNodeIndex))) { return this._NgStyle_10_3; }
    if (((token === import17.Icon) && (10 === requestNodeIndex))) { return this._Icon_10_4; }
    if (((token === import14.ToolbarItem) && ((8 <= requestNodeIndex) && (requestNodeIndex <= 11)))) { return this._ToolbarItem_8_3; }
    if (((token === import12.Navbar) && ((3 <= requestNodeIndex) && (requestNodeIndex <= 12)))) { return this._Navbar_3_4; }
    if (((token === import11.Header) && ((1 <= requestNodeIndex) && (requestNodeIndex <= 13)))) { return this._Header_1_3; }
    if (((token === import32.TemplateRef) && (21 === requestNodeIndex))) { return this._TemplateRef_21_5; }
    if (((token === import19.NgIf) && (21 === requestNodeIndex))) { return this._NgIf_21_6; }
    if (((token === import32.TemplateRef) && (23 === requestNodeIndex))) { return this._TemplateRef_23_5; }
    if (((token === import19.NgIf) && (23 === requestNodeIndex))) { return this._NgIf_23_6; }
    if (((token === import32.TemplateRef) && (28 === requestNodeIndex))) { return this._TemplateRef_28_5; }
    if (((token === import19.NgIf) && (28 === requestNodeIndex))) { return this._NgIf_28_6; }
    if (((token === import32.TemplateRef) && (30 === requestNodeIndex))) { return this._TemplateRef_30_5; }
    if (((token === import19.NgIf) && (30 === requestNodeIndex))) { return this._NgIf_30_6; }
    if (((token === import17.Icon) && (45 === requestNodeIndex))) { return this._Icon_45_3; }
    if (((token === import20.Col) && ((43 <= requestNodeIndex) && (requestNodeIndex <= 51)))) { return this._Col_43_3; }
    if (((token === import17.Icon) && (55 === requestNodeIndex))) { return this._Icon_55_3; }
    if (((token === import20.Col) && ((53 <= requestNodeIndex) && (requestNodeIndex <= 62)))) { return this._Col_53_3; }
    if (((token === import20.Row) && ((41 <= requestNodeIndex) && (requestNodeIndex <= 63)))) { return this._Row_41_3; }
    if (((token === import20.Grid) && ((39 <= requestNodeIndex) && (requestNodeIndex <= 64)))) { return this._Grid_39_3; }
    if (((token === import18.Content) && ((15 <= requestNodeIndex) && (requestNodeIndex <= 72)))) { return this._Content_15_4; }
    return notFoundResult;
  }
  detectChangesInternal(throwOnChange:boolean):void {
    const currVal_2:any = this._map_0('white');
    if (import4.checkBinding(throwOnChange,this._expr_2,currVal_2)) {
      this._NgStyle_10_3.ngStyle = currVal_2;
      this._expr_2 = currVal_2;
    }
    if (!throwOnChange) { this._NgStyle_10_3.ngDoCheck(); }
    const currVal_3:any = 'ios-notifications';
    if (import4.checkBinding(throwOnChange,this._expr_3,currVal_3)) {
      this._Icon_10_4.name = currVal_3;
      this._expr_3 = currVal_3;
    }
    if (((this.numberOfChecks === 0) && !throwOnChange)) { this._Content_15_4.ngOnInit(); }
    const currVal_6:any = this.context.userPhoto;
    if (import4.checkBinding(throwOnChange,this._expr_6,currVal_6)) {
      this._NgIf_21_6.ngIf = currVal_6;
      this._expr_6 = currVal_6;
    }
    const currVal_7:boolean = !this.context.userPhoto;
    if (import4.checkBinding(throwOnChange,this._expr_7,currVal_7)) {
      this._NgIf_23_6.ngIf = currVal_7;
      this._expr_7 = currVal_7;
    }
    const currVal_8:any = this.context.userName;
    if (import4.checkBinding(throwOnChange,this._expr_8,currVal_8)) {
      this._NgIf_28_6.ngIf = currVal_8;
      this._expr_8 = currVal_8;
    }
    const currVal_9:boolean = !this.context.userName;
    if (import4.checkBinding(throwOnChange,this._expr_9,currVal_9)) {
      this._NgIf_30_6.ngIf = currVal_9;
      this._expr_9 = currVal_9;
    }
    const currVal_10:any = 'basket';
    if (import4.checkBinding(throwOnChange,this._expr_10,currVal_10)) {
      this._Icon_45_3.name = currVal_10;
      this._expr_10 = currVal_10;
    }
    const currVal_12:any = 'logo-buffer';
    if (import4.checkBinding(throwOnChange,this._expr_12,currVal_12)) {
      this._Icon_55_3.name = currVal_12;
      this._expr_12 = currVal_12;
    }
    this.detectContentChildrenChanges(throwOnChange);
    if (!throwOnChange) { if (this._query_Button_8_0.dirty) {
      this._query_Button_8_0.reset([]);
      this._ToolbarItem_8_3._buttons = this._query_Button_8_0;
      this._query_Button_8_0.notifyOnChanges();
    } }
    const currVal_0:any = this._Navbar_3_4._hidden;
    if (import4.checkBinding(throwOnChange,this._expr_0,currVal_0)) {
      this.renderer.setElementProperty(this._el_3,'hidden',currVal_0);
      this._expr_0 = currVal_0;
    }
    const currVal_1:any = this._Navbar_3_4._sbPadding;
    if (import4.checkBinding(throwOnChange,this._expr_1,currVal_1)) {
      this.renderer.setElementClass(this._el_3,'statusbar-padding',currVal_1);
      this._expr_1 = currVal_1;
    }
    const currVal_4:any = this._Icon_10_4._hidden;
    if (import4.checkBinding(throwOnChange,this._expr_4,currVal_4)) {
      this.renderer.setElementClass(this._el_10,'hide',currVal_4);
      this._expr_4 = currVal_4;
    }
    const currVal_5:any = this._Content_15_4._sbPadding;
    if (import4.checkBinding(throwOnChange,this._expr_5,currVal_5)) {
      this.renderer.setElementClass(this._el_15,'statusbar-padding',currVal_5);
      this._expr_5 = currVal_5;
    }
    const currVal_11:any = this._Icon_45_3._hidden;
    if (import4.checkBinding(throwOnChange,this._expr_11,currVal_11)) {
      this.renderer.setElementClass(this._el_45,'hide',currVal_11);
      this._expr_11 = currVal_11;
    }
    const currVal_13:any = this._Icon_55_3._hidden;
    if (import4.checkBinding(throwOnChange,this._expr_13,currVal_13)) {
      this.renderer.setElementClass(this._el_55,'hide',currVal_13);
      this._expr_13 = currVal_13;
    }
    this.detectViewChildrenChanges(throwOnChange);
    if (!throwOnChange) { if ((this.numberOfChecks === 0)) { this._Navbar_3_4.ngAfterViewInit(); } }
  }
  destroyInternal():void {
    this._Icon_10_4.ngOnDestroy();
    this._Icon_45_3.ngOnDestroy();
    this._Icon_55_3.ngOnDestroy();
    this._Content_15_4.ngOnDestroy();
  }
}
export function viewFactory_Membership0(viewUtils:import4.ViewUtils,parentInjector:import5.Injector,declarationEl:import2.AppElement):import1.AppView<import3.Membership> {
  if ((renderType_Membership === (null as any))) { (renderType_Membership = viewUtils.createRenderComponentType('/Users/sbc/ionic_project/vkirirom/.tmp/pages/membership/membership.html',0,import9.ViewEncapsulation.None,styles_Membership,{})); }
  return new _View_Membership0(viewUtils,parentInjector,declarationEl);
}
class _View_Membership1 extends import1.AppView<any> {
  _el_0:any;
  /*private*/ _expr_0:any;
  constructor(viewUtils:import4.ViewUtils,parentInjector:import5.Injector,declarationEl:import2.AppElement) {
    super(_View_Membership1,renderType_Membership,import6.ViewType.EMBEDDED,viewUtils,parentInjector,declarationEl,import7.ChangeDetectorStatus.CheckAlways);
  }
  createInternal(rootSelector:string):import2.AppElement {
    this._el_0 = this.renderer.createElement((null as any),'img',(null as any));
    this.renderer.setElementAttribute(this._el_0,'alt','Profile Picture');
    this._expr_0 = import7.UNINITIALIZED;
    this.init([].concat([this._el_0]),[this._el_0],[],[]);
    return (null as any);
  }
  detectChangesInternal(throwOnChange:boolean):void {
    this.detectContentChildrenChanges(throwOnChange);
    const currVal_0:any = import4.interpolate(1,'',this.parent.context.userPhoto,'');
    if (import4.checkBinding(throwOnChange,this._expr_0,currVal_0)) {
      this.renderer.setElementProperty(this._el_0,'src',this.viewUtils.sanitizer.sanitize(import33.SecurityContext.URL,currVal_0));
      this._expr_0 = currVal_0;
    }
    this.detectViewChildrenChanges(throwOnChange);
  }
}
function viewFactory_Membership1(viewUtils:import4.ViewUtils,parentInjector:import5.Injector,declarationEl:import2.AppElement):import1.AppView<any> {
  return new _View_Membership1(viewUtils,parentInjector,declarationEl);
}
class _View_Membership2 extends import1.AppView<any> {
  _el_0:any;
  constructor(viewUtils:import4.ViewUtils,parentInjector:import5.Injector,declarationEl:import2.AppElement) {
    super(_View_Membership2,renderType_Membership,import6.ViewType.EMBEDDED,viewUtils,parentInjector,declarationEl,import7.ChangeDetectorStatus.CheckAlways);
  }
  createInternal(rootSelector:string):import2.AppElement {
    this._el_0 = this.renderer.createElement((null as any),'img',(null as any));
    this.renderer.setElementAttribute(this._el_0,'alt','Profile Picture');
    this.renderer.setElementAttribute(this._el_0,'src','img/profile.svg');
    this.init([].concat([this._el_0]),[this._el_0],[],[]);
    return (null as any);
  }
}
function viewFactory_Membership2(viewUtils:import4.ViewUtils,parentInjector:import5.Injector,declarationEl:import2.AppElement):import1.AppView<any> {
  return new _View_Membership2(viewUtils,parentInjector,declarationEl);
}
class _View_Membership3 extends import1.AppView<any> {
  _el_0:any;
  _text_1:any;
  /*private*/ _expr_0:any;
  constructor(viewUtils:import4.ViewUtils,parentInjector:import5.Injector,declarationEl:import2.AppElement) {
    super(_View_Membership3,renderType_Membership,import6.ViewType.EMBEDDED,viewUtils,parentInjector,declarationEl,import7.ChangeDetectorStatus.CheckAlways);
  }
  createInternal(rootSelector:string):import2.AppElement {
    this._el_0 = this.renderer.createElement((null as any),'span',(null as any));
    this._text_1 = this.renderer.createText(this._el_0,'',(null as any));
    this._expr_0 = import7.UNINITIALIZED;
    this.init([].concat([this._el_0]),[
      this._el_0,
      this._text_1
    ]
    ,[],[]);
    return (null as any);
  }
  detectChangesInternal(throwOnChange:boolean):void {
    this.detectContentChildrenChanges(throwOnChange);
    const currVal_0:any = import4.interpolate(1,'',this.parent.context.userName,'');
    if (import4.checkBinding(throwOnChange,this._expr_0,currVal_0)) {
      this.renderer.setText(this._text_1,currVal_0);
      this._expr_0 = currVal_0;
    }
    this.detectViewChildrenChanges(throwOnChange);
  }
}
function viewFactory_Membership3(viewUtils:import4.ViewUtils,parentInjector:import5.Injector,declarationEl:import2.AppElement):import1.AppView<any> {
  return new _View_Membership3(viewUtils,parentInjector,declarationEl);
}
class _View_Membership4 extends import1.AppView<any> {
  _el_0:any;
  _text_1:any;
  constructor(viewUtils:import4.ViewUtils,parentInjector:import5.Injector,declarationEl:import2.AppElement) {
    super(_View_Membership4,renderType_Membership,import6.ViewType.EMBEDDED,viewUtils,parentInjector,declarationEl,import7.ChangeDetectorStatus.CheckAlways);
  }
  createInternal(rootSelector:string):import2.AppElement {
    this._el_0 = this.renderer.createElement((null as any),'span',(null as any));
    this._text_1 = this.renderer.createText(this._el_0,'Username',(null as any));
<<<<<<< HEAD
    this.init(([] as any[]).concat([this._el_0]),[
=======
    this.init([].concat([this._el_0]),[
>>>>>>> c18e1ad94fb66bd01177fb05cc4052462bdcd9c0
      this._el_0,
      this._text_1
    ]
    ,[],[]);
    return (null as any);
  }
}
function viewFactory_Membership4(viewUtils:import4.ViewUtils,parentInjector:import5.Injector,declarationEl:import2.AppElement):import1.AppView<any> {
  return new _View_Membership4(viewUtils,parentInjector,declarationEl);
}