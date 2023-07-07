"use strict";(self.webpackChunkdeviceshop=self.webpackChunkdeviceshop||[]).push([[185],{234:function(e,t,n){n.d(t,{r:function(){return s}});var r,a=n(2791),i=["title","titleId"];function c(){return c=Object.assign||function(e){for(var t=1;t<arguments.length;t++){var n=arguments[t];for(var r in n)Object.prototype.hasOwnProperty.call(n,r)&&(e[r]=n[r])}return e},c.apply(this,arguments)}function l(e,t){if(null==e)return{};var n,r,a=function(e,t){if(null==e)return{};var n,r,a={},i=Object.keys(e);for(r=0;r<i.length;r++)n=i[r],t.indexOf(n)>=0||(a[n]=e[n]);return a}(e,t);if(Object.getOwnPropertySymbols){var i=Object.getOwnPropertySymbols(e);for(r=0;r<i.length;r++)n=i[r],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(a[n]=e[n])}return a}function o(e,t){var n=e.title,o=e.titleId,s=l(e,i);return a.createElement("svg",c({width:16,height:17,viewBox:"0 0 16 17",fill:"none",xmlns:"http://www.w3.org/2000/svg",ref:t,"aria-labelledby":o},s),n?a.createElement("title",{id:o},n):null,r||(r=a.createElement("path",{d:"M14.9755 5.70652L10.3362 4.96716L8.26231 0.356665C8.20566 0.230432 8.11247 0.128244 7.99736 0.0661293C7.70866 -0.0901587 7.35783 0.0400813 7.21348 0.356665L5.13958 4.96716L0.500265 5.70652C0.372359 5.72656 0.255417 5.79268 0.165883 5.89287C0.0576417 6.01486 -0.0020043 6.179 5.14289e-05 6.34919C0.00210715 6.51939 0.0656964 6.68173 0.176847 6.80054L3.53345 10.3892L2.74044 15.4565C2.72184 15.5744 2.73374 15.6956 2.77478 15.8064C2.81582 15.9173 2.88435 16.0133 2.97262 16.0836C3.06089 16.1539 3.16536 16.1957 3.27417 16.2042C3.38299 16.2127 3.4918 16.1876 3.58827 16.1317L7.73789 13.7393L11.8875 16.1317C12.0008 16.1979 12.1324 16.2199 12.2584 16.1959C12.5764 16.1357 12.7902 15.8051 12.7353 15.4565L11.9423 10.3892L15.2989 6.80054C15.3903 6.70236 15.4506 6.57412 15.4689 6.43386C15.5182 6.08322 15.2953 5.75862 14.9755 5.70652Z",fill:"#FFCF88"})))}var s=a.forwardRef(o);n.p},6478:function(e,t,n){n(2791);var r=n(4256),a=n(184);function i(e){var t=e.header,n=e.colorStyle;return(0,a.jsxs)(r.Z,{className:"section-header ".concat(n),children:[(0,a.jsx)("h2",{children:t}),(0,a.jsx)("div",{className:"divider"})]})}i.defaultProps={colorStyle:""},t.Z=i},2185:function(e,t,n){n.r(t),n.d(t,{default:function(){return g}});var r=n(2791),a=n(32),i=n(5861),c=n(885),l=n(7757),o=n.n(l),s=n(6478),u=n(6632),d=n(2249),f=n(4256),p=n(184);function h(e){var t=e.api,n=e.header,a=e.className,l=(0,r.useState)(!0),h=(0,c.Z)(l,2),v=h[0],m=h[1],y=(0,r.useState)([]),g=(0,c.Z)(y,2),x=g[0],j=g[1],b=function(){var e=(0,i.Z)(o().mark((function e(){var n;return o().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.prev=0,e.next=3,t();case 3:n=e.sent,j(n.rows);case 5:return e.prev=5,m(!1),e.finish(5);case 8:case"end":return e.stop()}}),e,null,[[0,,5,8]])})));return function(){return e.apply(this,arguments)}}();return(0,p.jsxs)(f.Z,{className:"trending-items ".concat(a," ").concat(v),func:b,children:[(0,p.jsx)(s.Z,{header:n}),(0,p.jsx)(d.Z,{className:"items",items:x,renderAs:function(e){return(0,p.jsx)("li",{children:(0,p.jsx)(u.Z,{product:e})},e.name)}})]})}h.defaultProps={className:!1};var v=h,m=n(3641),y=n(3958);var g=(0,a.Pi)((function(){var e=(0,r.useContext)(y.Z).types,t=e.findType("Smartphone"),n=null;t&&(n=function(){return(0,m.t2)({limit:3,order:{byMostSold:!0},where:{typeId:t.id}})});var a=e.findType("Laptop"),i=null;a&&(i=function(){return(0,m.t2)({limit:3,order:{byMostSold:!0},where:{typeId:a.id}})});var c=e.findType("Tablet"),l=null;c&&(l=function(){return(0,m.t2)({limit:3,order:{byMostSold:!0},where:{typeId:c.id}})});var o=e.findType("Accessory"),s=null;return o&&(s=function(){return(0,m.t2)({limit:3,order:{byMostSold:!0},where:{typeId:o.id}})}),(0,p.jsxs)("div",{id:"trending",className:"trending",children:[(0,p.jsx)(v,{header:"Trending now",className:"top-row",api:function(){return(0,m.t2)({limit:4,order:{byMostSold:!0}})}}),(0,p.jsxs)("div",{className:"columns",children:[n&&(0,p.jsx)(v,{header:"Smartphones",api:n}),i&&(0,p.jsx)(v,{header:"Laptops",api:i}),l&&(0,p.jsx)(v,{header:"Tablets",api:l}),s&&(0,p.jsx)(v,{header:"Accessories",api:s})]})]})}))},4912:function(e,t,n){n(2791);var r=n(1733),a=n(184);function i(e){var t=e.price,n=e.discount,i=(0,r.T4)((0,r.ti)(t)),c=(0,r.T4)((0,r.ti)(t,n));return(0,a.jsxs)("div",{className:"price-tags ".concat(n&&"with-discount"),children:[(0,a.jsxs)("span",{className:"undiscounted-price",children:["$",i]}),n&&(0,a.jsxs)("span",{className:"discounted-price",children:["$",c]})]})}i.defaultProps={discount:""},t.Z=i},773:function(e,t,n){n.d(t,{Z:function(){return Z}});var r,a,i=n(2791),c=n(234),l=["title","titleId"];function o(){return o=Object.assign||function(e){for(var t=1;t<arguments.length;t++){var n=arguments[t];for(var r in n)Object.prototype.hasOwnProperty.call(n,r)&&(e[r]=n[r])}return e},o.apply(this,arguments)}function s(e,t){if(null==e)return{};var n,r,a=function(e,t){if(null==e)return{};var n,r,a={},i=Object.keys(e);for(r=0;r<i.length;r++)n=i[r],t.indexOf(n)>=0||(a[n]=e[n]);return a}(e,t);if(Object.getOwnPropertySymbols){var i=Object.getOwnPropertySymbols(e);for(r=0;r<i.length;r++)n=i[r],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(a[n]=e[n])}return a}function u(e,t){var n=e.title,c=e.titleId,u=s(e,l);return i.createElement("svg",o({width:16,height:17,viewBox:"0 0 16 17",fill:"none",xmlns:"http://www.w3.org/2000/svg",ref:t,"aria-labelledby":c},u),n?i.createElement("title",{id:c},n):null,r||(r=i.createElement("path",{fillRule:"evenodd",clipRule:"evenodd",d:"M3.8213 17H2.88466C2.83821 16.9442 2.80092 16.8796 2.77478 16.809C2.73374 16.6982 2.72184 16.5769 2.74044 16.4591L3.53345 11.3917L0.176847 7.8031C0.0656964 7.68429 0.00210715 7.52195 5.14289e-05 7.35176C-0.0020043 7.18156 0.0576417 7.01743 0.165883 6.89543C0.255417 6.79525 0.372359 6.72912 0.500265 6.70909L5.13958 5.96973L7.21348 1.35923C7.35783 1.04264 7.70866 0.912405 7.99736 1.06869C7.99824 1.06917 7.99912 1.06965 8 1.07013V14.893L7.73789 14.7419L3.8213 17Z",fill:"#FFCF88"})),a||(a=i.createElement("path",{fillRule:"evenodd",clipRule:"evenodd",d:"M11.6544 17H12.591C12.6375 16.9443 12.6748 16.8797 12.7009 16.8091C12.742 16.6982 12.7539 16.577 12.7353 16.4591L11.9423 11.3918L15.2989 7.80317C15.41 7.68436 15.4736 7.52202 15.4757 7.35183C15.4777 7.18163 15.4181 7.0175 15.3098 6.8955C15.2203 6.79532 15.1034 6.72919 14.9754 6.70916L10.3361 5.9698L8.26223 1.3593C8.20322 1.22987 8.10969 1.13158 8 1.07129V14.8931L11.6544 17Z",fill:"#FFCF88",fillOpacity:.66})))}var d,f,p=i.forwardRef(u),h=(n.p,["title","titleId"]);function v(){return v=Object.assign||function(e){for(var t=1;t<arguments.length;t++){var n=arguments[t];for(var r in n)Object.prototype.hasOwnProperty.call(n,r)&&(e[r]=n[r])}return e},v.apply(this,arguments)}function m(e,t){if(null==e)return{};var n,r,a=function(e,t){if(null==e)return{};var n,r,a={},i=Object.keys(e);for(r=0;r<i.length;r++)n=i[r],t.indexOf(n)>=0||(a[n]=e[n]);return a}(e,t);if(Object.getOwnPropertySymbols){var i=Object.getOwnPropertySymbols(e);for(r=0;r<i.length;r++)n=i[r],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(a[n]=e[n])}return a}function y(e,t){var n=e.title,r=e.titleId,a=m(e,h);return i.createElement("svg",v({width:16,height:17,viewBox:"0 0 16 17",fill:"none",xmlns:"http://www.w3.org/2000/svg",ref:t,"aria-labelledby":r},a),n?i.createElement("title",{id:r},n):null,d||(d=i.createElement("path",{fillRule:"evenodd",clipRule:"evenodd",d:"M3.8213 16.2031H2.88466C2.83821 16.1473 2.80092 16.0827 2.77478 16.0121C2.73374 15.9013 2.72184 15.7801 2.74044 15.6622L3.53345 10.5948L0.176847 7.00623C0.0656964 6.88742 0.00210715 6.72508 5.14289e-05 6.55488C-0.0020043 6.38468 0.0576417 6.22055 0.165883 6.09856C0.255417 5.99837 0.372359 5.93225 0.500265 5.91221L5.13958 5.17285L7.21348 0.562353C7.35783 0.24577 7.70866 0.11553 7.99736 0.271818C7.99824 0.272293 7.99912 0.272771 8 0.273252V14.0961L7.73789 13.945L3.8213 16.2031Z",fill:"#FFCF88",fillOpacity:.44})),f||(f=i.createElement("path",{fillRule:"evenodd",clipRule:"evenodd",d:"M11.6544 16.2031H12.5911C12.6375 16.1474 12.6748 16.0828 12.7009 16.0122C12.742 15.9014 12.7539 15.7801 12.7353 15.6622L11.9423 10.5949L15.2989 7.0063C15.41 6.88749 15.4736 6.72515 15.4757 6.55495C15.4777 6.38475 15.4181 6.22062 15.3098 6.09863C15.2203 5.99844 15.1034 5.93232 14.9755 5.91228L10.3361 5.17292L8.26224 0.562423C8.20322 0.43299 8.10969 0.334705 8 0.274414V14.0962L11.6544 16.2031Z",fill:"#FFCF88",fillOpacity:.44})))}var g,x=i.forwardRef(y),j=(n.p,["title","titleId"]);function b(){return b=Object.assign||function(e){for(var t=1;t<arguments.length;t++){var n=arguments[t];for(var r in n)Object.prototype.hasOwnProperty.call(n,r)&&(e[r]=n[r])}return e},b.apply(this,arguments)}function w(e,t){if(null==e)return{};var n,r,a=function(e,t){if(null==e)return{};var n,r,a={},i=Object.keys(e);for(r=0;r<i.length;r++)n=i[r],t.indexOf(n)>=0||(a[n]=e[n]);return a}(e,t);if(Object.getOwnPropertySymbols){var i=Object.getOwnPropertySymbols(e);for(r=0;r<i.length;r++)n=i[r],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(a[n]=e[n])}return a}function C(e,t){var n=e.title,r=e.titleId,a=w(e,j);return i.createElement("svg",b({width:16,height:17,viewBox:"0 0 16 17",fill:"none",xmlns:"http://www.w3.org/2000/svg",ref:t,"aria-labelledby":r},a),n?i.createElement("title",{id:r},n):null,g||(g=i.createElement("path",{d:"M14.9755 5.70652L10.3362 4.96716L8.26231 0.356665C8.20566 0.230432 8.11247 0.128244 7.99736 0.0661293C7.70866 -0.0901587 7.35783 0.0400813 7.21348 0.356665L5.13958 4.96716L0.500265 5.70652C0.372359 5.72656 0.255417 5.79268 0.165883 5.89287C0.0576417 6.01486 -0.0020043 6.179 5.14289e-05 6.34919C0.00210715 6.51939 0.0656964 6.68173 0.176847 6.80054L3.53345 10.3892L2.74044 15.4565C2.72184 15.5744 2.73374 15.6956 2.77478 15.8064C2.81582 15.9173 2.88435 16.0133 2.97262 16.0836C3.06089 16.1539 3.16536 16.1957 3.27417 16.2042C3.38299 16.2127 3.4918 16.1876 3.58827 16.1317L7.73789 13.7393L11.8875 16.1317C12.0008 16.1979 12.1324 16.2199 12.2584 16.1959C12.5764 16.1357 12.7902 15.8051 12.7353 15.4565L11.9423 10.3892L15.2989 6.80054C15.3903 6.70236 15.4506 6.57412 15.4689 6.43386C15.5182 6.08322 15.2953 5.75862 14.9755 5.70652V5.70652Z",fill:"#D5D7DE"})))}var O=i.forwardRef(C),L=(n.p,n(184));function N(e){for(var t=e.rating,n=e.nameForKey,r=e.setRating,a=Number(t),i=[],l=Math.ceil(a),o=Math.floor(a),s=l-a,u=0;u<o;u+=1)i.push((0,L.jsx)(c.r,{className:"full-star"},"".concat(n).concat(i.length)));if(0===i.length)for(var d=0;d<5;d+=1)i.push((0,L.jsx)(O,{className:"gray-star"},"".concat(n).concat(i.length)));if(i.length<5){0===s?i.push((0,L.jsx)(x,{className:"empty-star"},"".concat(n).concat(i.length))):s>=.5?i.push((0,L.jsx)(c.r,{className:"full-star"},"".concat(n).concat(i.length))):i.push((0,L.jsx)(p,{className:"half-star"},"".concat(n).concat(i.length)));for(var f=5-i.length,h=0;h<f;h+=1)i.push((0,L.jsx)(x,{},"".concat(n).concat(i.length)))}return(0,L.jsx)("div",{className:"rating-stars",children:i.map((function(e,t){return r?(0,L.jsx)("button",{type:"button",onClick:function(){return r(t+1)},children:e},"".concat(n).concat(t)):e}))})}N.defaultProps={setRating:void 0};var Z=N},6632:function(e,t,n){n(2791);var r=n(501),a=n(4359),i=n(1733),c=n(2249),l=n(4912),o=n(773),s=n(4256),u=n(184);function d(e){var t=e.product,n=e.expanded,d=e.listView,f=t.name,p=t.price,h=t.discount,v=t.brand.name,m=t.type.name,y=t.rating,g=t.reviews,x=t.specificationsByCategory,j=t.id,b=t.thumbnail,w=(0,i.Cb)(f),C=d?(0,i.BL)(x):(0,i.zq)(x),O=n&&!d,L=d;return(0,u.jsxs)(r.OL,{className:"shop-product-card ".concat(n&&"expanded"," ").concat(d&&"list-view"),to:"/".concat(a.lf,"/").concat(w),title:f,children:[(0,u.jsx)(s.Z,{children:(0,u.jsxs)("div",{className:"img-wrapper",children:[(0,u.jsx)("img",{src:"".concat("https://deviceshop.onrender.com/").concat(b),alt:"Shop now"}),(0,u.jsx)(l.Z,{price:p,discount:h})]})}),(0,u.jsxs)("div",{className:"lower-col",children:[(0,u.jsx)("span",{className:"name",children:f}),(0,u.jsxs)("div",{className:"brand-rating-row",children:[!n&&(0,u.jsx)("span",{className:"brand",children:v}),(0,u.jsx)(o.Z,{rating:Number(y),nameForKey:f}),n&&(0,u.jsx)("span",{className:"review-count",children:"(".concat(g.length,")")})]}),O&&(0,u.jsx)("div",{className:"attributes",children:C}),L&&(0,u.jsx)("div",{className:"attributes",children:(0,u.jsx)(c.Z,{items:C,className:"attributes-column-ul",renderAs:function(e){return(0,u.jsx)("li",{children:(0,u.jsxs)("div",{children:[(0,u.jsx)("span",{className:"label",children:e.category}),(0,u.jsx)(c.Z,{items:e.values,className:"values-ul",renderAs:function(t,n){return(0,u.jsx)("li",{children:(0,u.jsx)("span",{children:t})},"".concat(j).concat(e.category).concat(t).concat(n))}})]})},"".concat(j).concat(e.category))}})}),n&&(0,u.jsx)("div",{className:"type",children:m})]})]})}d.defaultProps={expanded:!1,listView:!1},t.Z=d},4256:function(e,t,n){n.d(t,{Z:function(){return m}});var r=n(2791),a=n(5861),i=n(885),c=n(7757),l=n.n(c);function o(e,t){var n;return"string"===typeof e?t?(null!==(n=t[e])&&void 0!==n||(t[e]=document.querySelectorAll(e)),e=t[e]):e=document.querySelectorAll(e):e instanceof Element&&(e=[e]),Array.from(e||[])}var s=function(e){return"function"===typeof e},u={any:0,all:1};function d(e,t){var n=arguments.length>2&&void 0!==arguments[2]?arguments[2]:{},r=n.root,a=n.margin,i=n.amount,c=void 0===i?"any":i;if("undefined"===typeof IntersectionObserver)return function(){};var l=o(e),d=new WeakMap,f=function(e){e.forEach((function(e){var n=d.get(e.target);if(e.isIntersecting!==Boolean(n))if(e.isIntersecting){var r=t(e);s(r)?d.set(e.target,r):p.unobserve(e.target)}else n&&(n(e),d.delete(e.target))}))},p=new IntersectionObserver(f,{root:r,rootMargin:a,threshold:"number"===typeof c?c:u[c]});return l.forEach((function(e){return p.observe(e)})),function(){return p.disconnect()}}function f(e){var t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{},n=t.root,a=t.margin,c=t.amount,l=t.once,o=void 0!==l&&l,s=(0,r.useState)(!1),u=(0,i.Z)(s,2),f=u[0],p=u[1];return(0,r.useEffect)((function(){if(!(!e.current||o&&f)){var t={root:n&&n.current||void 0,margin:a,amount:"some"===c?"any":c};return d(e.current,(function(){return p(!0),o?void 0:function(){return p(!1)}}),t)}}),[n,e,a,o]),f}var p=function(e){var t=e.ref,n=e.func,c=e.timeout,o=void 0===c?350:c,s=(0,r.useState)(!1),u=(0,i.Z)(s,2),d=u[0],p=u[1],h=(0,r.useState)(!1),v=(0,i.Z)(h,2),m=v[0],y=v[1],g=f(t);return(0,r.useEffect)((function(){g&&!d&&setTimeout((function(){g&&(p(!0),n&&(0,a.Z)(l().mark((function e(){return l().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.prev=0,e.next=3,n();case 3:return e.prev=3,y(!0),e.finish(3);case 6:case"end":return e.stop()}}),e,null,[[0,,3,6]])})))())}),o)}),[g]),{fixated:d,loaded:m}},h=n(184),v=(0,r.forwardRef)((function(e,t){var n=e.className,a=e.children,i=e.id,c=e.timeout,l=e.func,o=(0,r.useRef)(null),s=t||o,u=p({ref:s,func:l,timeout:c,id:i}),d=u.fixated,f=u.loaded,v=l&&!f;return(0,h.jsx)("div",{className:"".concat(n," shown-in-view ").concat((l&&f||!l&&d)&&"show"),id:i,ref:s,style:{height:v?"100vh":""},children:a})}));v.defaultProps={className:"",id:void 0,timeout:void 0,func:void 0};var m=v}}]);
//# sourceMappingURL=185.7c648af1.chunk.js.map