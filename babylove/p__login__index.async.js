"use strict";(self.webpackChunk=self.webpackChunk||[]).push([[939],{47866:function(b,h,n){n.d(h,{Al:function(){return T},D2:function(){return I},Lk:function(){return G},M1:function(){return r},Pp:function(){return t},Qc:function(){return L},Vr:function(){return B},X2:function(){return P},Xh:function(){return c},aV:function(){return u},c5:function(){return e},cl:function(){return o},d0:function(){return m},gR:function(){return R},i4:function(){return g},i9:function(){return S},kP:function(){return v},nc:function(){return f},rx:function(){return s},tz:function(){return y},ws:function(){return A},x4:function(){return d}});var y="/admin/goods/addGoods",u="/admin/goods/updateGoods",c="/admin/goods/removeGoods",g="/admin/goodsPictures/addGoodsPictures",f="/admin/shoppingCarts/addGoods",e="/admin/shoppingCarts/batchRemoveGoods",o="/admin/shoppingCarts/updateBuyCount",p="/admin/shoppingCarts/addShoppingCart",S="/admin/goods/queryAllGoods",A="/admin/goods/queryGoodsDetails",B="/admin/shoppingCarts/queryAllShoppingCarts",L="/admin/shoppingCarts/queryAllGoods",v="/admin/shoppingCarts/batchUpdateSelected",R="/custom/shoppingCarts/queryAllGoods",T="/custom/shoppingCarts/updateBuyCount",G="/custom/goods/queryAllGoods",I="/custom/goods/queryGoodsDetails",P="/custom/shoppingCarts/addShoppingCart",m="/custom/shoppingCarts/addGoods",s="/custom/shoppingCarts/batchRemoveGoods",t="/custom/shoppingCarts/queryAllGoodsCount",r="/custom/shoppingCarts/batchUpdateSelected",d="/user/login",i="/user/logout"},42912:function(b,h,n){var y=n(6154),u=n(48705),c=function(o){u.FN.show({icon:"fail",content:o||"\u8BF7\u6C42\u5931\u8D25\uFF0C\u8BF7\u7A0D\u540E\u518D\u8BD5"})},g=function(o){if(!o){window.navigator.onLine?c("\u8BF7\u6C42\u5F02\u5E38\uFF0C\u8BF7\u7A0D\u540E\u518D\u8BD5"):c("\u7F51\u7EDC\u5DF2\u65AD\u5F00");return}var p=o.status,S=o.data;if(p){switch(p){case 401:c("\u8BF7\u5148\u767B\u5F55"),sessionStorage.removeItem("babyLoveToken");break;case 404:c("\u8BF7\u6C42\u4E0D\u5B58\u5728");break;default:c(S.message||"\u8BF7\u6C42\u9519\u8BEF\uFF0C\u8BF7\u7A0D\u540E\u518D\u8BD5")}return Promise.reject(o)}},f=y.Z.create({timeout:12e3});f.defaults.headers.post["Content-Type"]="application/json;charset=UTF-8",f.interceptors.request.use(function(e){return e},function(e){return Promise.error(e)}),f.interceptors.response.use(function(e){var o=e.status,p=e.data;return o===200?((!p||p.code!==200||!p.success)&&c(p.message),Promise.resolve(e.data)):Promise.reject(e.data)},function(e){return g}),h.Z=f},82405:function(b,h,n){n.d(h,{JG:function(){return m},xE:function(){return P},YX:function(){return G},WF:function(){return v},GJ:function(){return B},Xn:function(){return L},YM:function(){return A},Te:function(){return I},GL:function(){return R}});var y=n(15009),u=n.n(y),c=n(99289),g=n.n(c),f=n(82188),e=n(42912),o=function(t){return{custom:[{title:"\u5546\u54C1",onClick:function(){return v("/goods/list",!0)}},{title:"\u8D2D\u7269\u8F66",onClick:function(){return v("/shopping-cart?shoppingCartCode=".concat(t||""),!0)}}],admin:[{title:"\u5546\u54C1",onClick:function(){return v("/goods/list",!0)}},{title:"\u8D2D\u7269\u8F66",onClick:function(){return v("/shopping-cart?shoppingCartCode=".concat(t||""),!0)}}]}},p=n(48705),S=n(47866),A=!!sessionStorage.getItem("babyLoveToken"),B=location.pathname.startsWith("/view/admin"),L=["/view/admin/login","/view/custom/login","/view/login"].includes(location.pathname),v=function(t,r){t&&(location.pathname.startsWith("/view/admin/")?t="/view/admin".concat(t):t="/view".concat(t),r?location.href=t:f.m8.push(t))},R=function(){v("/login",!0)},T=function(){var s=g()(u()().mark(function t(){var r,d;return u()().wrap(function(a){for(;;)switch(a.prev=a.next){case 0:return a.next=2,e.Z.post(S.X2);case 2:return r=a.sent,d=r.data,a.abrupt("return",d?d.shoppingCartCode:null);case 5:case"end":return a.stop()}},t)}));return function(){return s.apply(this,arguments)}}(),G=function(){var s=g()(u()().mark(function t(){var r;return u()().wrap(function(i){for(;;)switch(i.prev=i.next){case 0:if(r=localStorage.getItem("babyloveShoppingCartCode"),r){i.next=5;break}return i.next=4,T();case 4:r=i.sent;case 5:if(r){i.next=7;break}return i.abrupt("return",p.FN.show({icon:"fail",content:"\u6DFB\u52A0\u5931\u8D25\uFF0C\u8BF7\u7A0D\u540E\u518D\u8BD5"}));case 7:return localStorage.setItem("babyloveShoppingCartCode",r),i.abrupt("return",r);case 9:case"end":return i.stop()}},t)}));return function(){return s.apply(this,arguments)}}(),I=function(t){t&&localStorage.setItem("babyloveShoppingCartCode",t)},P=function(){var s=g()(u()().mark(function t(){var r,d;return u()().wrap(function(a){for(;;)switch(a.prev=a.next){case 0:return a.next=2,G();case 2:if(r=a.sent,d=o(r),!B){a.next=6;break}return a.abrupt("return",d.admin);case 6:return a.abrupt("return",d.custom);case 7:case"end":return a.stop()}},t)}));return function(){return s.apply(this,arguments)}}(),m=function(t){if(t)try{var r=document.createElement("input");return r.value=t,r.style.height=0,document.body.append(r),r.select(),document.execCommand("Copy"),r.remove(),!0}catch(d){return!1}}},37514:function(b,h,n){n.r(h),n.d(h,{default:function(){return i}});var y=n(15009),u=n.n(y),c=n(99289),g=n.n(c),f=n(12444),e=n.n(f),o=n(72004),p=n.n(o),S=n(25098),A=n.n(S),B=n(31996),L=n.n(B),v=n(26037),R=n.n(v),T=n(9783),G=n.n(T),I=n(47866),P=n(42912),m=n(48705),s=n(82405),t=n(67294),r=n(85893),d=function(a){L()(F,a);var w=R()(F);function F(D){var C;return e()(this,F),C=w.call(this,D),G()(A()(C),"formRef",t.createRef()),G()(A()(C),"login",g()(u()().mark(function z(){var j,$,U,Q,E,N;return u()().wrap(function(l){for(;;)switch(l.prev=l.next){case 0:return C.setState({isLoading:!0}),$=(j=C.formRef.current)===null||j===void 0?void 0:j.getFieldsValue(["username","password"]),U=$.username,Q=$.password,l.prev=2,l.next=5,P.Z.post(I.x4,{username:U,password:Q});case 5:if(E=l.sent,N=E.success,!N){l.next=10;break}return sessionStorage.setItem("babyLoveToken","1"),l.abrupt("return",(0,s.WF)("/"));case 10:l.next=15;break;case 12:l.prev=12,l.t0=l.catch(2),console.error(l.t0);case 15:C.setState({isLoading:!1});case 16:case"end":return l.stop()}},z,null,[[2,12]])}))),C.state={isLoading:!1},C}return p()(F,[{key:"render",value:function(){return(0,r.jsx)("div",{className:"baby-love-login",children:(0,r.jsx)("div",{className:"baby-love-login-form",children:(0,r.jsxs)(m.l0,{ref:this.formRef,layout:"horizontal",footer:(0,r.jsx)(m.zx,{block:!0,type:"submit",color:"primary",size:"large",onClick:this.login,loading:this.state.isLoading,children:"\u767B\u5F55"}),children:[(0,r.jsx)(m.l0.Item,{name:"username",label:"\u767B\u5F55\u540D",rules:[{required:!0,message:"\u767B\u5F55\u540D\u4E0D\u80FD\u4E3A\u7A7A"}],children:(0,r.jsx)(m.II,{onChange:console.log,placeholder:"\u8BF7\u8F93\u5165\u767B\u5F55\u540D"})}),(0,r.jsx)(m.l0.Item,{name:"password",label:"\u767B\u5F55\u5BC6\u7801",rules:[{required:!0,message:"\u767B\u5F55\u540D\u4E0D\u80FD\u4E3A\u7A7A"}],children:(0,r.jsx)(m.II,{type:"password",onChange:console.log,placeholder:"\u8BF7\u8F93\u5165\u767B\u5F55\u5BC6\u7801"})})]})})})}}]),F}(t.Component),i=d}}]);
