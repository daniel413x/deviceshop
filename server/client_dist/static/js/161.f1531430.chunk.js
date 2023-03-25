"use strict";(self.webpackChunkdeviceshop=self.webpackChunkdeviceshop||[]).push([[161],{3592:function(e,a,t){t(2791);var n=t(6871),s=t(5499),r=t(259),i=t(2249),o=t(184);a.Z=function(){var e="/account"===(0,n.TH)().pathname;return(0,o.jsx)("div",{className:"left-side-col ".concat(e&&"show"),children:(0,o.jsxs)("div",{className:"labeled-col",children:[(0,o.jsx)("span",{className:"label",children:"Your account"}),(0,o.jsx)(i.Z,{items:s.oB,renderAs:function(e){var a=e.to,t=e.label;return(0,o.jsxs)("li",{children:[(0,o.jsx)("div",{className:"divider"}),(0,o.jsx)(r.Z,{to:a,label:t})]},"".concat(a,"_navButton"))}})]})})}},9193:function(e,a,t){var n=t(885),s=t(2791),r=t(2113),i=t(3426),o=t(184);function c(e){var a=e.imageClass,t=e.buttonClass,c=e.initialImage,l=e.pressedSubmit,u=e.setPressedSubmit,d=e.onChange,f=e.onChangeWith,v=e.name,p=e.id,m=e.tabbable,h=(0,s.useState)(),x=(0,n.Z)(h,2),b=x[0],j=x[1],g=(0,s.useState)(""),Z=(0,n.Z)(g,2),w=Z[0],N=Z[1],y=(0,r.Z)({value:b,setPressedSubmit:u,pressedSubmit:l}).warn,C=(0,s.useRef)(null),S=d||function(e){if(e.target.files&&0!==e.target.files.length)j(e.target.files[0]);else{if(b)return;j(void 0)}};return(0,s.useEffect)((function(){if(b){f&&f();var e=URL.createObjectURL(b);return N(e),function(){return URL.revokeObjectURL(e)}}}),[b]),(0,s.useEffect)((function(){if("string"===typeof c)N("".concat("https://deviceshop.onrender.com/").concat(c));else if("object"===typeof c){var e=c,a=e.name,t=e.type,n=new File([c],a,{type:t}),s=new DataTransfer;s.items.add(n),C.current.files=s.files;var r=URL.createObjectURL(c);return N(r),function(){return URL.revokeObjectURL(r)}}}),[c]),(0,o.jsxs)(i.Z,{buttonStyle:"blank",className:"uploaded-image button-overlay preview ".concat(t),onClick:function(){var e;return null===(e=C.current)||void 0===e?void 0:e.click()},tabIndex:m,children:[(0,o.jsx)("img",{src:w,alt:"Uploaded file",className:"preview ".concat(a)}),(0,o.jsx)("input",{id:p,type:"file",onChange:S,className:"replace-image-input hidden ".concat(y&&"warn"),name:v,ref:C}),(0,o.jsx)("input",{id:"".concat(p,"_string"),type:"hidden",name:"images",value:v}),(0,o.jsx)("div",{className:"replace-message",children:"Replace"})]})}c.defaultProps={id:"",imageClass:"",buttonClass:"",initialImage:"",onChange:void 0,onChangeWith:void 0,pressedSubmit:!1,setPressedSubmit:!1,tabbable:void 0,naming:void 0},a.Z=c},7161:function(e,a,t){t.r(a),t.d(a,{default:function(){return E}});var n=t(885),s=t(2791),r=t(32),i=t(4942),o=t(5861),c=t(7757),l=t.n(c),u=t(3958),d=t(7155),f=t(1733),v=t(3426),p=t(7142),m=t(8816),h=t(8886),x=t(184);function b(e){var a=e.close,t=e.field,r=e.previous,c=(0,s.useContext)(u.Z),b=c.notifications,j=c.user,g=(0,s.useState)(!1),Z=(0,n.Z)(g,2),w=Z[0],N=Z[1],y=(0,s.useState)(""),C=(0,n.Z)(y,2),S=C[0],k=C[1],R=(0,s.useState)(""),U=(0,n.Z)(R,2),L=U[0],E=U[1],D=function(){var e=(0,o.Z)(l().mark((function e(n){var s;return l().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return n.preventDefault(),N(!0),e.prev=2,e.next=5,(0,d.uz)((0,i.Z)({},t,S));case 5:s=e.sent,j.set(s),a(),b.message("Field updated"),e.next=14;break;case 11:e.prev=11,e.t0=e.catch(2),b.error(e.t0.response.data.message);case 14:case"end":return e.stop()}}),e,null,[[2,11]])})));return function(a){return e.apply(this,arguments)}}(),I=(0,f.u)(t),P="password"===t;return(0,s.useEffect)((function(){t&&(N(!1),k(""))}),[t]),(0,x.jsxs)(h.Z,{show:t,close:a,className:"edit-field",id:"edit-field",size:"medium",children:[(0,x.jsxs)("div",{className:"window-header",children:[(0,x.jsx)("div",{className:"left-col",children:(0,x.jsx)("span",{className:"name",children:"Change field"})}),(0,x.jsx)(p.Z,{onMouseDown:a})]}),(0,x.jsxs)("form",{onSubmit:D,children:[(0,x.jsxs)("div",{className:"body",children:[(0,x.jsx)("h2",{className:"header",children:"Enter new value"}),(0,x.jsx)(m.Z,{label:I||"Field",input:S,setInput:k,placeholder:(null===r||void 0===r?void 0:r.toString())||"false",type:P?"password":"input",id:"new-value"}),P&&(0,x.jsx)(m.Z,{label:"Confirm password",input:L,setInput:E,placeholder:"",type:"password",id:"confirm-password"})]}),(0,x.jsxs)("div",{className:"bottom-buttons",children:[(0,x.jsx)(v.Z,{className:"submit-button ".concat(w&&"blocked"," ").concat(P&&S!==L&&"blocked"," ").concat(!S&&"blocked"),type:"submit",children:"Confirm"}),(0,x.jsx)(v.Z,{onClick:a,children:"Close"})]})]})]})}b.defaultProps={previous:""};var j=b,g=t(2249),Z=t(7163);function w(e){var a=e.field,t=e.value,n=e.openEditFieldModal,s="avatar"===a,r=(0,f.u)(a);return(0,x.jsxs)("div",{className:"field",children:[(0,x.jsxs)("div",{className:"field-value-col",children:[(0,x.jsx)("span",{className:"key",children:r}),(0,x.jsxs)("span",{className:"value",children:[!s&&(t||"Blank"),s&&(0,x.jsx)("img",{src:"".concat("https://deviceshop.onrender.com/").concat(t),alt:"Your avatar",className:"avatar"})]})]}),(0,x.jsx)(Z.Z,{children:(0,x.jsx)(v.Z,{onClick:n,children:"Change"})})]})}w.defaultProps={value:""};var N=w,y=t(8224),C=t(9193),S=t(4359),k=t(2810);var R=function(e){var a=e.close,t=e.show,r=(0,s.useContext)(u.Z),i=r.notifications,c=r.user,f=(0,s.useState)(!1),m=(0,n.Z)(f,2),b=m[0],j=m[1],g=(0,s.useState)(!1),Z=(0,n.Z)(g,2),w=Z[0],N=Z[1],R=c.avatar===S.tU?"".concat((0,k.Z)(),".jpg"):c.avatar,U=function(){var e=(0,o.Z)(l().mark((function e(a){var t,n,s;return l().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.prev=0,a.preventDefault(),j(!0),(t=new FormData(a.currentTarget)).delete("avatar"),t.append("avatar",R),e.next=8,(0,d.uz)(t);case 8:n=e.sent,s=n.avatar,c.setAvatar(s),N(!0),e.next=17;break;case 14:e.prev=14,e.t0=e.catch(0),i.error("".concat(e.t0.response.data.message));case 17:return e.prev=17,j(!1),e.finish(17);case 20:case"end":return e.stop()}}),e,null,[[0,14,17,20]])})));return function(a){return e.apply(this,arguments)}}();return(0,x.jsxs)(h.Z,{show:t,close:a,className:"edit-avatar",id:"edit-avatar",size:"medium",children:[(0,x.jsxs)("div",{className:"window-header",children:[(0,x.jsx)("div",{className:"left-col",children:(0,x.jsx)("span",{className:"name",children:"Change field"})}),(0,x.jsx)(p.Z,{onMouseDown:a})]}),(0,x.jsxs)("form",{onSubmit:U,children:[(0,x.jsx)("div",{className:"body",children:(0,x.jsx)(C.Z,{name:R,initialImage:c.avatar||"",onChangeWith:function(){return N(!1),void j(!1)}})}),(0,x.jsxs)("div",{className:"bottom-buttons",children:[(0,x.jsxs)(v.Z,{className:"submit-button ".concat((b||w)&&"blocked"),id:"edit-avatar-save-button",type:"submit",children:[w&&(0,x.jsx)(y.r,{}),"".concat(w?"Your avatar was changed":"Save")]}),(0,x.jsx)(v.Z,{onClick:a,children:"Close"})]})]})]})},U=t(8110),L=t(3592);var E=(0,r.Pi)((function(){var e=(0,s.useContext)(u.Z).user,a=(0,s.useState)(""),t=(0,n.Z)(a,2),r=t[0],i=t[1],o=(0,s.useState)(!1),c=(0,n.Z)(o,2),l=c[0],d=c[1],f=(0,s.useState)(""),v=(0,n.Z)(f,2),p=v[0],m=v[1],h=[{field:"avatar",value:e.avatar},{field:"firstName",value:e.firstName},{field:"lastName",value:e.lastName},{field:"password",value:"***"},{field:"phoneNumber",value:e.phoneNumber}];return(0,x.jsxs)(U.Z,{id:"credentials",header:"Your account details",leftSideCol:(0,x.jsx)(L.Z,{}),children:[(0,x.jsx)(j,{field:r,previous:p,close:function(){i(""),m("")}}),(0,x.jsx)(R,{show:l,close:function(){return d(!1)}}),(0,x.jsx)(g.Z,{childrenBefore:!0,className:"field-ul",items:h,renderAs:function(e){return(0,x.jsx)("li",{children:(0,x.jsx)(N,{field:e.field,value:e.value,openEditFieldModal:"avatar"===e.field?function(){return d(!0)}:function(){return a=e.field,t=e.value,i(a),void m(t||"");var a,t}})},e.field)}})]})}))},2810:function(e,a,t){var n;t.d(a,{Z:function(){return d}});var s=new Uint8Array(16);function r(){if(!n&&!(n="undefined"!==typeof crypto&&crypto.getRandomValues&&crypto.getRandomValues.bind(crypto)||"undefined"!==typeof msCrypto&&"function"===typeof msCrypto.getRandomValues&&msCrypto.getRandomValues.bind(msCrypto)))throw new Error("crypto.getRandomValues() not supported. See https://github.com/uuidjs/uuid#getrandomvalues-not-supported");return n(s)}var i=/^(?:[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}|00000000-0000-0000-0000-000000000000)$/i;for(var o=function(e){return"string"===typeof e&&i.test(e)},c=[],l=0;l<256;++l)c.push((l+256).toString(16).substr(1));var u=function(e){var a=arguments.length>1&&void 0!==arguments[1]?arguments[1]:0,t=(c[e[a+0]]+c[e[a+1]]+c[e[a+2]]+c[e[a+3]]+"-"+c[e[a+4]]+c[e[a+5]]+"-"+c[e[a+6]]+c[e[a+7]]+"-"+c[e[a+8]]+c[e[a+9]]+"-"+c[e[a+10]]+c[e[a+11]]+c[e[a+12]]+c[e[a+13]]+c[e[a+14]]+c[e[a+15]]).toLowerCase();if(!o(t))throw TypeError("Stringified UUID is invalid");return t};var d=function(e,a,t){var n=(e=e||{}).random||(e.rng||r)();if(n[6]=15&n[6]|64,n[8]=63&n[8]|128,a){t=t||0;for(var s=0;s<16;++s)a[t+s]=n[s];return a}return u(n)}}}]);
//# sourceMappingURL=161.f1531430.chunk.js.map