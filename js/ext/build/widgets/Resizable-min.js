﻿/*
 * Ext JS Library 2.1
 * Copyright(c) 2006-2008, Ext JS, LLC.
 * licensing@extjs.com
 * 
 * http://extjs.com/license
 */

Ext.Resizable=function(D,E){this.el=Ext.get(D);if(E&&E.wrap){E.resizeChild=this.el;this.el=this.el.wrap(typeof E.wrap=="object"?E.wrap:{cls:"xresizable-wrap"});this.el.id=this.el.dom.id=E.resizeChild.id+"-rzwrap";this.el.setStyle("overflow","hidden");this.el.setPositioning(E.resizeChild.getPositioning());E.resizeChild.clearPositioning();if(!E.width||!E.height){var F=E.resizeChild.getSize();this.el.setSize(F.width,F.height)}if(E.pinned&&!E.adjustments){E.adjustments="auto"}}this.proxy=this.el.createProxy({tag:"div",cls:"x-resizable-proxy",id:this.el.id+"-rzproxy"});this.proxy.unselectable();this.proxy.enableDisplayMode("block");Ext.apply(this,E);if(this.pinned){this.disableTrackOver=true;this.el.addClass("x-resizable-pinned")}var I=this.el.getStyle("position");if(I!="absolute"&&I!="fixed"){this.el.setStyle("position","relative")}if(!this.handles){this.handles="s,e,se";if(this.multiDirectional){this.handles+=",n,w"}}if(this.handles=="all"){this.handles="n s e w ne nw se sw"}var M=this.handles.split(/\s*?[,;]\s*?| /);var C=Ext.Resizable.positions;for(var H=0,J=M.length;H<J;H++){if(M[H]&&C[M[H]]){var L=C[M[H]];this[L]=new Ext.Resizable.Handle(this,L,this.disableTrackOver,this.transparent)}}this.corner=this.southeast;if(this.handles.indexOf("n")!=-1||this.handles.indexOf("w")!=-1){this.updateBox=true}this.activeHandle=null;if(this.resizeChild){if(typeof this.resizeChild=="boolean"){this.resizeChild=Ext.get(this.el.dom.firstChild,true)}else{this.resizeChild=Ext.get(this.resizeChild,true)}}if(this.adjustments=="auto"){var B=this.resizeChild;var K=this.west,G=this.east,A=this.north,M=this.south;if(B&&(K||A)){B.position("relative");B.setLeft(K?K.el.getWidth():0);B.setTop(A?A.el.getHeight():0)}this.adjustments=[(G?-G.el.getWidth():0)+(K?-K.el.getWidth():0),(A?-A.el.getHeight():0)+(M?-M.el.getHeight():0)-1]}if(this.draggable){this.dd=this.dynamic?this.el.initDD(null):this.el.initDDProxy(null,{dragElId:this.proxy.id});this.dd.setHandleElId(this.resizeChild?this.resizeChild.id:this.el.id)}this.addEvents("beforeresize","resize");if(this.width!==null&&this.height!==null){this.resizeTo(this.width,this.height)}else{this.updateChildSize()}if(Ext.isIE){this.el.dom.style.zoom=1}Ext.Resizable.superclass.constructor.call(this)};Ext.extend(Ext.Resizable,Ext.util.Observable,{resizeChild:false,adjustments:[0,0],minWidth:5,minHeight:5,maxWidth:10000,maxHeight:10000,enabled:true,animate:false,duration:0.35,dynamic:false,handles:false,multiDirectional:false,disableTrackOver:false,easing:"easeOutStrong",widthIncrement:0,heightIncrement:0,pinned:false,width:null,height:null,preserveRatio:false,transparent:false,minX:0,minY:0,draggable:false,resizeTo:function(B,A){this.el.setSize(B,A);this.updateChildSize();this.fireEvent("resize",this,B,A,null)},startSizing:function(C,B){this.fireEvent("beforeresize",this,C);if(this.enabled){if(!this.overlay){this.overlay=this.el.createProxy({tag:"div",cls:"x-resizable-overlay",html:"&#160;"},Ext.getBody());this.overlay.unselectable();this.overlay.enableDisplayMode("block");this.overlay.on("mousemove",this.onMouseMove,this);this.overlay.on("mouseup",this.onMouseUp,this)}this.overlay.setStyle("cursor",B.el.getStyle("cursor"));this.resizing=true;this.startBox=this.el.getBox();this.startPoint=C.getXY();this.offsets=[(this.startBox.x+this.startBox.width)-this.startPoint[0],(this.startBox.y+this.startBox.height)-this.startPoint[1]];this.overlay.setSize(Ext.lib.Dom.getViewWidth(true),Ext.lib.Dom.getViewHeight(true));this.overlay.show();if(this.constrainTo){var A=Ext.get(this.constrainTo);this.resizeRegion=A.getRegion().adjust(A.getFrameWidth("t"),A.getFrameWidth("l"),-A.getFrameWidth("b"),-A.getFrameWidth("r"))}this.proxy.setStyle("visibility","hidden");this.proxy.show();this.proxy.setBox(this.startBox);if(!this.dynamic){this.proxy.setStyle("visibility","visible")}}},onMouseDown:function(A,B){if(this.enabled){B.stopEvent();this.activeHandle=A;this.startSizing(B,A)}},onMouseUp:function(B){var A=this.resizeElement();this.resizing=false;this.handleOut();this.overlay.hide();this.proxy.hide();this.fireEvent("resize",this,A.width,A.height,B)},updateChildSize:function(){if(this.resizeChild){var C=this.el;var D=this.resizeChild;var B=this.adjustments;if(C.dom.offsetWidth){var A=C.getSize(true);D.setSize(A.width+B[0],A.height+B[1])}if(Ext.isIE){setTimeout(function(){if(C.dom.offsetWidth){var E=C.getSize(true);D.setSize(E.width+B[0],E.height+B[1])}},10)}}},snap:function(C,E,B){if(!E||!C){return C}var D=C;var A=C%E;if(A>0){if(A>(E/2)){D=C+(E-A)}else{D=C-A}}return Math.max(B,D)},resizeElement:function(){var A=this.proxy.getBox();if(this.updateBox){this.el.setBox(A,false,this.animate,this.duration,null,this.easing)}else{this.el.setSize(A.width,A.height,this.animate,this.duration,null,this.easing)}this.updateChildSize();if(!this.dynamic){this.proxy.hide()}return A},constrain:function(B,C,A,D){if(B-C<A){C=B-A}else{if(B-C>D){C=D-B}}return C},onMouseMove:function(S){if(this.enabled){try{if(this.resizeRegion&&!this.resizeRegion.contains(S.getPoint())){return }var Q=this.curSize||this.startBox;var I=this.startBox.x,H=this.startBox.y;var C=I,B=H;var J=Q.width,R=Q.height;var D=J,L=R;var K=this.minWidth,T=this.minHeight;var P=this.maxWidth,W=this.maxHeight;var F=this.widthIncrement;var A=this.heightIncrement;var U=S.getXY();var O=-(this.startPoint[0]-Math.max(this.minX,U[0]));var M=-(this.startPoint[1]-Math.max(this.minY,U[1]));var G=this.activeHandle.position;switch(G){case"east":J+=O;J=Math.min(Math.max(K,J),P);break;case"south":R+=M;R=Math.min(Math.max(T,R),W);break;case"southeast":J+=O;R+=M;J=Math.min(Math.max(K,J),P);R=Math.min(Math.max(T,R),W);break;case"north":M=this.constrain(R,M,T,W);H+=M;R-=M;break;case"west":O=this.constrain(J,O,K,P);I+=O;J-=O;break;case"northeast":J+=O;J=Math.min(Math.max(K,J),P);M=this.constrain(R,M,T,W);H+=M;R-=M;break;case"northwest":O=this.constrain(J,O,K,P);M=this.constrain(R,M,T,W);H+=M;R-=M;I+=O;J-=O;break;case"southwest":O=this.constrain(J,O,K,P);R+=M;R=Math.min(Math.max(T,R),W);I+=O;J-=O;break}var N=this.snap(J,F,K);var V=this.snap(R,A,T);if(N!=J||V!=R){switch(G){case"northeast":H-=V-R;break;case"north":H-=V-R;break;case"southwest":I-=N-J;break;case"west":I-=N-J;break;case"northwest":I-=N-J;H-=V-R;break}J=N;R=V}if(this.preserveRatio){switch(G){case"southeast":case"east":R=L*(J/D);R=Math.min(Math.max(T,R),W);J=D*(R/L);break;case"south":J=D*(R/L);J=Math.min(Math.max(K,J),P);R=L*(J/D);break;case"northeast":J=D*(R/L);J=Math.min(Math.max(K,J),P);R=L*(J/D);break;case"north":var X=J;J=D*(R/L);J=Math.min(Math.max(K,J),P);R=L*(J/D);I+=(X-J)/2;break;case"southwest":R=L*(J/D);R=Math.min(Math.max(T,R),W);var X=J;J=D*(R/L);I+=X-J;break;case"west":var E=R;R=L*(J/D);R=Math.min(Math.max(T,R),W);H+=(E-R)/2;var X=J;J=D*(R/L);I+=X-J;break;case"northwest":var X=J;var E=R;R=L*(J/D);R=Math.min(Math.max(T,R),W);J=D*(R/L);H+=E-R;I+=X-J;break}}this.proxy.setBounds(I,H,J,R);if(this.dynamic){this.resizeElement()}}catch(S){}}},handleOver:function(){if(this.enabled){this.el.addClass("x-resizable-over")}},handleOut:function(){if(!this.resizing){this.el.removeClass("x-resizable-over")}},getEl:function(){return this.el},getResizeChild:function(){return this.resizeChild},destroy:function(C){this.proxy.remove();if(this.overlay){this.overlay.removeAllListeners();this.overlay.remove()}var D=Ext.Resizable.positions;for(var A in D){if(typeof D[A]!="function"&&this[D[A]]){var B=this[D[A]];B.el.removeAllListeners();B.el.remove()}}if(C){this.el.update("");this.el.remove()}},syncHandleHeight:function(){var A=this.el.getHeight(true);if(this.west){this.west.el.setHeight(A)}if(this.east){this.east.el.setHeight(A)}}});Ext.Resizable.positions={n:"north",s:"south",e:"east",w:"west",se:"southeast",sw:"southwest",nw:"northwest",ne:"northeast"};Ext.Resizable.Handle=function(C,E,B,D){if(!this.tpl){var A=Ext.DomHelper.createTemplate({tag:"div",cls:"x-resizable-handle x-resizable-handle-{0}"});A.compile();Ext.Resizable.Handle.prototype.tpl=A}this.position=E;this.rz=C;this.el=this.tpl.append(C.el.dom,[this.position],true);this.el.unselectable();if(D){this.el.setOpacity(0)}this.el.on("mousedown",this.onMouseDown,this);if(!B){this.el.on("mouseover",this.onMouseOver,this);this.el.on("mouseout",this.onMouseOut,this)}};Ext.Resizable.Handle.prototype={afterResize:function(A){},onMouseDown:function(A){this.rz.onMouseDown(this,A)},onMouseOver:function(A){this.rz.handleOver(this,A)},onMouseOut:function(A){this.rz.handleOut(this,A)}};