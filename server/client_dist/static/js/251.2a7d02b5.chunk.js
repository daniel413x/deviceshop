"use strict";(self.webpackChunkdeviceshop=self.webpackChunkdeviceshop||[]).push([[251],{251:function(e,n,t){t.r(n);var r=t(5861),s=t(885),a=t(7757),c=t.n(a),i=t(2791),o=t(501),u=t(32),d=t(6478),l=t(3641),f=t(1733),v=t(3958),p=t(4359),h=t(2249),m=t(4256),x=t(6938),y=t(184);function j(e){var n=e.specification,t=n.key;return n.key===p.Y5&&(t="OS"),n.key===p.qH&&(t="Battery capacity"),n.key===p.Hk&&(t="Rear camera"),n.key===p.kp&&(t="Front camera"),(0,y.jsxs)("div",{className:"specification",children:[(0,y.jsx)("span",{className:"key",children:t}),(0,y.jsx)("div",{className:"dots-divider"}),(0,y.jsx)("span",{className:"value",children:n.value})]})}function N(e){var n=e.product,t=e.className,r=n.name,s=(0,f.En)([p.$x,p.qH,p.Y5,p.GV,p.sz,p.kp,p.Hk,p.pI],n.specifications),a=(0,f.Cb)(r);return(0,y.jsxs)("div",{className:"product ".concat(t),children:[(0,y.jsxs)("div",{className:"image-col",children:[(0,y.jsx)("img",{src:"".concat("https://deviceshop.onrender.com/").concat(n.thumbnail),alt:"Product in-depth"}),(0,y.jsx)("span",{className:"name",children:r})]}),(0,y.jsxs)("div",{className:"specifications",children:[(0,y.jsx)("span",{className:"label",children:"Key specifications"}),(0,y.jsx)(h.Z,{className:"list",items:s,renderAs:function(e){return(0,y.jsx)("li",{children:(0,y.jsx)(j,{specification:e})},e.id)}}),(0,y.jsx)(o.OL,{to:"".concat(p.lf,"/").concat(a),className:"shop-now",children:"Shop now"})]})]})}N.defaultProps={className:""},n.default=(0,u.Pi)((function(){var e=(0,i.useContext)(v.Z),n=e.types,t=e.notifications,a=(0,i.useState)(!0),o=(0,s.Z)(a,2),u=o[0],p=o[1],h=(0,i.useState)(),j=(0,s.Z)(h,2),g=j[0],k=j[1],w=(0,i.useState)(),Z=(0,s.Z)(w,2),S=Z[0],b=Z[1],I=n.findType("Smartphone"),E=function(){var e=(0,r.Z)(c().mark((function e(){var r,s,a,i;return c().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(e.prev=0,I){e.next=6;break}return e.next=4,(0,x.D)("smartphone");case 4:r=e.sent,n.set(r);case 6:return e.next=8,(0,l.t2)({limit:5,where:{typeId:I.id}});case 8:s=e.sent,a=(0,f.Iy)(0,4),i=4===a?3:0===a?1:a+1,k(s.rows[a]),b(s.rows[i]),e.next=18;break;case 15:e.prev=15,e.t0=e.catch(0),t.error(e.t0.response.data.message);case 18:return e.prev=18,p(!1),e.finish(18);case 21:case"end":return e.stop()}}),e,null,[[0,15,18,21]])})));return function(){return e.apply(this,arguments)}}();return(0,y.jsxs)("div",{className:"in-depth ".concat(u),id:"in-depth",children:[(0,y.jsx)(d.Z,{header:"In depth"}),(0,y.jsxs)(m.Z,{className:"row",func:E,children:[g&&(0,y.jsx)(N,{product:g,className:"left"}),S&&(0,y.jsx)(N,{product:S,className:"right"})]})]})}))},6478:function(e,n,t){t(2791);var r=t(4256),s=t(184);function a(e){var n=e.header,t=e.colorStyle;return(0,s.jsxs)(r.Z,{className:"section-header ".concat(t),children:[(0,s.jsx)("h2",{children:n}),(0,s.jsx)("div",{className:"divider"})]})}a.defaultProps={colorStyle:""},n.Z=a},4256:function(e,n,t){t.d(n,{Z:function(){return m}});var r=t(2791),s=t(5861),a=t(885),c=t(7757),i=t.n(c);function o(e,n){var t;return"string"===typeof e?n?(null!==(t=n[e])&&void 0!==t||(n[e]=document.querySelectorAll(e)),e=n[e]):e=document.querySelectorAll(e):e instanceof Element&&(e=[e]),Array.from(e||[])}var u=function(e){return"function"===typeof e},d={any:0,all:1};function l(e,n){var t=arguments.length>2&&void 0!==arguments[2]?arguments[2]:{},r=t.root,s=t.margin,a=t.amount,c=void 0===a?"any":a;if("undefined"===typeof IntersectionObserver)return function(){};var i=o(e),l=new WeakMap,f=function(e){e.forEach((function(e){var t=l.get(e.target);if(e.isIntersecting!==Boolean(t))if(e.isIntersecting){var r=n(e);u(r)?l.set(e.target,r):v.unobserve(e.target)}else t&&(t(e),l.delete(e.target))}))},v=new IntersectionObserver(f,{root:r,rootMargin:s,threshold:"number"===typeof c?c:d[c]});return i.forEach((function(e){return v.observe(e)})),function(){return v.disconnect()}}function f(e){var n=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{},t=n.root,s=n.margin,c=n.amount,i=n.once,o=void 0!==i&&i,u=(0,r.useState)(!1),d=(0,a.Z)(u,2),f=d[0],v=d[1];return(0,r.useEffect)((function(){if(!(!e.current||o&&f)){var n={root:t&&t.current||void 0,margin:s,amount:"some"===c?"any":c};return l(e.current,(function(){return v(!0),o?void 0:function(){return v(!1)}}),n)}}),[t,e,s,o]),f}var v=function(e){var n=e.ref,t=e.func,c=e.timeout,o=void 0===c?350:c,u=(0,r.useState)(!1),d=(0,a.Z)(u,2),l=d[0],v=d[1],p=(0,r.useState)(!1),h=(0,a.Z)(p,2),m=h[0],x=h[1],y=f(n);return(0,r.useEffect)((function(){y&&!l&&setTimeout((function(){y&&(v(!0),t&&(0,s.Z)(i().mark((function e(){return i().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.prev=0,e.next=3,t();case 3:return e.prev=3,x(!0),e.finish(3);case 6:case"end":return e.stop()}}),e,null,[[0,,3,6]])})))())}),o)}),[y]),{fixated:l,loaded:m}},p=t(184),h=(0,r.forwardRef)((function(e,n){var t=e.className,s=e.children,a=e.id,c=e.timeout,i=e.func,o=(0,r.useRef)(null),u=n||o,d=v({ref:u,func:i,timeout:c,id:a}),l=d.fixated,f=d.loaded,h=i&&!f;return(0,p.jsx)("div",{className:"".concat(t," shown-in-view ").concat((i&&f||!i&&l)&&"show"),id:a,ref:u,style:{height:h?"100vh":""},children:s})}));h.defaultProps={className:"",id:void 0,timeout:void 0,func:void 0};var m=h}}]);
//# sourceMappingURL=251.2a7d02b5.chunk.js.map