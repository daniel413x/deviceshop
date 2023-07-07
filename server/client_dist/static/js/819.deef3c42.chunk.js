"use strict";(self.webpackChunkdeviceshop=self.webpackChunkdeviceshop||[]).push([[819],{406:function(e,n,s){s(2791);var t=s(6871),r=s(5499),a=s(259),c=s(2249),i=s(184);n.Z=function(){var e="/admin"===(0,t.TH)().pathname;return(0,i.jsx)("div",{className:"left-side-col ".concat(e&&"show"),children:(0,i.jsxs)("div",{className:"labeled-col",children:[(0,i.jsx)("span",{className:"label",children:"Admin"}),(0,i.jsx)(c.Z,{items:r.VF,renderAs:function(e){var n=e.to,s=e.label;return(0,i.jsxs)("li",{children:[(0,i.jsx)("div",{className:"divider"}),(0,i.jsx)(a.Z,{to:n,label:s})]},"".concat(n,"_navButton"))}})]})})}},2131:function(e,n,s){s(2791);var t=s(184);n.Z=function(e){var n=e.children;return(0,t.jsx)("div",{className:"filter-links",children:n})}},461:function(e,n,s){s(2791);var t=s(32),r=s(501),a=s(184);n.Z=(0,t.Pi)((function(e){var n=e.label,s=e.to;return(0,a.jsx)(r.OL,{to:s,className:"filter-link",children:n})}))},6925:function(e,n,s){var t=s(885),r=s(2791),a=s(734),c=s(184);function i(e){var n=e.label,s=e.boolean,i=e.className,o=e.light,l=e.id,u=e.onClick,d=e.name,h=e.value,f=(0,r.useState)(!1),x=(0,t.Z)(f,2),m=x[0],p=x[1],v=(0,r.useState)(!1),j=(0,t.Z)(v,2),b=j[0],Z=j[1],N=(0,r.useRef)(null);(0,a.Z)(N,(function(){return Z(!1)})),(0,r.useEffect)((function(){Z(s)}),[s]);var w=null;return o&&b?w="box-shadow-light":b&&(w="box-shadow"),(0,c.jsxs)("button",{className:"labeled-checkbox-button ".concat(i),ref:N,type:"button",onMouseUp:function(){return p(!1)},onMouseLeave:function(){return p(!1)},onMouseDown:function(){return p(!0)},onMouseEnter:function(e){e.buttons>0&&p(!0)},onClick:u,children:[(0,c.jsx)("input",{type:"hidden",name:d,value:h,id:l}),(0,c.jsx)("div",{className:"checkbox-div ".concat(s&&"checked"," ").concat(m&&"active"," ").concat(w)}),(0,c.jsx)("span",{className:"label",children:n})]})}i.defaultProps={light:!1,className:"",id:"",name:"",value:""},n.Z=i},8819:function(e,n,s){s.r(n),s.d(n,{default:function(){return R}});var t=s(5861),r=s(885),a=s(7757),c=s.n(a),i=s(2791),o=s(6871),l=s(32),u=s(2249),d=s(6847),h=s(4359),f=s(4482),x=s(983),m=s(3597),p=s(1413),v=s(2982),j=s(3958),b=s(580),Z=s(3426),N=s(7142),w=s(6925),g=s(8886),C=s(184);function O(e){var n=e.show,s=e.close,a=e.orders,o=e.setOrders,l=(0,i.useContext)(j.Z).notifications,u=(0,i.useState)([]),d=(0,r.Z)(u,2),f=d[0],x=d[1],m=function(e){-1===f.indexOf(e)?x([].concat((0,v.Z)(f),[e])):x(f.filter((function(n){return n!==e})))},O=function(){var e=(0,t.Z)(c().mark((function e(t){var r;return c().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return t.preventDefault(),r=n.id,e.next=4,(0,b.wW)(r,{status:f});case 4:o(a.map((function(e){return e.id===r?(0,p.Z)((0,p.Z)({},e),{},{status:f}):e}))),l.message("Order status changed"),s();case 7:case"end":return e.stop()}}),e)})));return function(n){return e.apply(this,arguments)}}();return(0,i.useEffect)((function(){n&&x(n.status)}),[n]),(0,C.jsxs)(g.Z,{show:n,close:s,className:"new-status-modal",id:"new-status-modal",children:[(0,C.jsxs)("div",{className:"window-header",children:[(0,C.jsx)("div",{className:"left-col",children:"Change status"}),(0,C.jsx)(N.Z,{onMouseDown:s})]}),(0,C.jsxs)("form",{onSubmit:O,children:[(0,C.jsx)("div",{className:"body",children:(0,C.jsxs)("ul",{className:"checkboxes-ul",children:[(0,C.jsx)("li",{children:(0,C.jsx)(w.Z,{boolean:f.indexOf(h.vi)>=0,label:h.vi,onClick:function(){return m(h.vi)}})}),(0,C.jsx)("li",{children:(0,C.jsx)(w.Z,{boolean:f.indexOf(h.HO)>=0,label:h.HO,onClick:function(){return m(h.HO)}})}),(0,C.jsx)("li",{children:(0,C.jsx)(w.Z,{boolean:f.indexOf(h.J$)>=0,label:h.J$,onClick:function(){return m(h.J$)}})})]})}),(0,C.jsxs)("div",{className:"bottom-buttons",children:[(0,C.jsx)(Z.Z,{type:"submit",className:"submit-button",children:"Confirm"}),(0,C.jsx)(Z.Z,{onClick:s,children:"Close"})]})]})]})}O.defaultProps={show:void 0};var k=O,P=s(461),y=s(624),S=s(2131),A=s(8110),L=s(406);var R=(0,l.Pi)((function(){var e=(0,i.useContext)(j.Z).adminOrders,n=e.unshippedOrdersCount,s=e.allOrdersCount,a=e.setUnshippedOrdersCount.bind(e),l=e.setAllOrdersCount.bind(e),p=(0,o.TH)().pathname.includes(h.Xx),v=(0,i.useState)(),Z=(0,r.Z)(v,2),N=Z[0],w=Z[1],g=(0,m.Z)({noFirstRender:!0,initialSorting:"byNewest",fetchAPI:b.I7,itemsPerPage:10,concurrentlySetQuery:!0,queryProps:p?{unshipped:!0}:void 0}),O=g.items,R=g.fetchPageNumber,E=g.pageLimitReached,H=g.pageLimit,I=g.page,M=g.dbCount,D=g.setSearchParams,F=g.setItems,X=g.loading;return(0,i.useEffect)((function(){(0,t.Z)(c().mark((function e(){var n,s;return c().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,(0,b.I7)({unshipped:!0,countOnly:!0,distinct:!0});case 2:return n=e.sent,a(n.count),e.next=6,(0,b.I7)({countOnly:!0,distinct:!0});case 6:s=e.sent,l(s.count);case 8:case"end":return e.stop()}}),e)})))()}),[]),(0,C.jsxs)(A.Z,{id:"admin-orders",className:"admin-search-page",header:"Orders",leftSideCol:(0,C.jsx)(L.Z,{}),noDiv:!0,noEllipses:!0,children:[(0,C.jsx)(k,{show:N,close:function(){return w(void 0)},setOrders:F,orders:O}),(0,C.jsxs)("div",{className:"upper-row",children:[(0,C.jsx)(d.Z,{dontRenderResults:!0,setSearchParams:D}),(0,C.jsxs)(S.Z,{children:[(0,C.jsx)(P.Z,{label:"All (".concat(s,")"),to:"/".concat(h.Fd,"/").concat(h.Xr)}),(0,C.jsx)(P.Z,{label:"Unshipped (".concat(n,")"),to:"/".concat(h.Fd,"/").concat(h.Xr,"/").concat(h.Xx)})]})]}),(0,C.jsx)(u.Z,{className:"search-results-ul ".concat(X&&"loading"),items:O,childrenBefore:!0,renderAs:function(e){return(0,C.jsx)("li",{children:(0,C.jsx)(y.Z,{order:e,setNewStatusOrder:w})},e.id)}}),(0,C.jsx)(f.Z,{page:I,itemsPerPage:10,dbCount:M,descriptor:"orders"}),(0,C.jsx)(x.Z,{page:I,changePage:R,pageLimitReached:E,pageLimit:H})]})}))}}]);
//# sourceMappingURL=819.deef3c42.chunk.js.map