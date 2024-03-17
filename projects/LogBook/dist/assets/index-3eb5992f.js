(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const l of document.querySelectorAll('link[rel="modulepreload"]'))r(l);new MutationObserver(l=>{for(const c of l)if(c.type==="childList")for(const u of c.addedNodes)u.tagName==="LINK"&&u.rel==="modulepreload"&&r(u)}).observe(document,{childList:!0,subtree:!0});function n(l){const c={};return l.integrity&&(c.integrity=l.integrity),l.referrerPolicy&&(c.referrerPolicy=l.referrerPolicy),l.crossOrigin==="use-credentials"?c.credentials="include":l.crossOrigin==="anonymous"?c.credentials="omit":c.credentials="same-origin",c}function r(l){if(l.ep)return;l.ep=!0;const c=n(l);fetch(l.href,c)}})();function g(){}function ye(e){return e()}function _e(){return Object.create(null)}function H(e){e.forEach(ye)}function ke(e){return typeof e=="function"}function M(e,t){return e!=e?t==t:e!==t||e&&typeof e=="object"||typeof e=="function"}function Ee(e){return Object.keys(e).length===0}function Oe(e,...t){if(e==null)return g;const n=e.subscribe(...t);return n.unsubscribe?()=>n.unsubscribe():n}function Le(e,t,n){e.$$.on_destroy.push(Oe(t,n))}function a(e,t){e.appendChild(t)}function K(e,t,n){e.insertBefore(t,n||null)}function W(e){e.parentNode&&e.parentNode.removeChild(e)}function Ce(e,t){for(let n=0;n<e.length;n+=1)e[n]&&e[n].d(t)}function f(e){return document.createElement(e)}function X(e){return document.createTextNode(e)}function _(){return X(" ")}function F(e,t,n,r){return e.addEventListener(t,n,r),()=>e.removeEventListener(t,n,r)}function o(e,t,n){n==null?e.removeAttribute(t):e.getAttribute(t)!==n&&e.setAttribute(t,n)}function xe(e){return e===""?null:+e}function Se(e){return Array.from(e.childNodes)}function se(e,t){t=""+t,e.data!==t&&(e.data=t)}function A(e,t){e.value=t??""}function Ae(e,t,n,r){n==null?e.style.removeProperty(t):e.style.setProperty(t,n,r?"important":"")}let ue;function G(e){ue=e}const T=[],be=[];let j=[];const ve=[],Ne=Promise.resolve();let oe=!1;function Pe(){oe||(oe=!0,Ne.then(Ie))}function ce(e){j.push(e)}const ie=new Set;let N=0;function Ie(){if(N!==0)return;const e=ue;do{try{for(;N<T.length;){const t=T[N];N++,G(t),Te(t.$$)}}catch(t){throw T.length=0,N=0,t}for(G(null),T.length=0,N=0;be.length;)be.pop()();for(let t=0;t<j.length;t+=1){const n=j[t];ie.has(n)||(ie.add(n),n())}j.length=0}while(T.length);for(;ve.length;)ve.pop()();oe=!1,ie.clear(),G(e)}function Te(e){if(e.fragment!==null){e.update(),H(e.before_update);const t=e.dirty;e.dirty=[-1],e.fragment&&e.fragment.p(e.ctx,t),e.after_update.forEach(ce)}}function je(e){const t=[],n=[];j.forEach(r=>e.indexOf(r)===-1?t.push(r):n.push(r)),n.forEach(r=>r()),j=t}const Y=new Set;let L;function De(){L={r:0,c:[],p:L}}function He(){L.r||H(L.c),L=L.p}function O(e,t){e&&e.i&&(Y.delete(e),e.i(t))}function D(e,t,n,r){if(e&&e.o){if(Y.has(e))return;Y.add(e),L.c.push(()=>{Y.delete(e),r&&(n&&e.d(1),r())}),e.o(t)}else r&&r()}function Z(e){e&&e.c()}function z(e,t,n,r){const{fragment:l,after_update:c}=e.$$;l&&l.m(t,n),r||ce(()=>{const u=e.$$.on_mount.map(ye).filter(ke);e.$$.on_destroy?e.$$.on_destroy.push(...u):H(u),e.$$.on_mount=[]}),c.forEach(ce)}function J(e,t){const n=e.$$;n.fragment!==null&&(je(n.after_update),H(n.on_destroy),n.fragment&&n.fragment.d(t),n.on_destroy=n.fragment=null,n.ctx=[])}function Me(e,t){e.$$.dirty[0]===-1&&(T.push(e),Pe(),e.$$.dirty.fill(0)),e.$$.dirty[t/31|0]|=1<<t%31}function R(e,t,n,r,l,c,u,d=[-1]){const s=ue;G(e);const i=e.$$={fragment:null,ctx:[],props:c,update:g,not_equal:l,bound:_e(),on_mount:[],on_destroy:[],on_disconnect:[],before_update:[],after_update:[],context:new Map(t.context||(s?s.$$.context:[])),callbacks:_e(),dirty:d,skip_bound:!1,root:t.target||s.$$.root};u&&u(i.root);let p=!1;if(i.ctx=n?n(e,t.props||{},(h,y,...v)=>{const w=v.length?v[0]:y;return i.ctx&&l(i.ctx[h],i.ctx[h]=w)&&(!i.skip_bound&&i.bound[h]&&i.bound[h](w),p&&Me(e,h)),y}):[],i.update(),p=!0,H(i.before_update),i.fragment=r?r(i.ctx):!1,t.target){if(t.hydrate){const h=Se(t.target);i.fragment&&i.fragment.l(h),h.forEach(W)}else i.fragment&&i.fragment.c();t.intro&&O(e.$$.fragment),z(e,t.target,t.anchor,t.customElement),Ie()}G(s)}class U{$destroy(){J(this,1),this.$destroy=g}$on(t,n){if(!ke(n))return g;const r=this.$$.callbacks[t]||(this.$$.callbacks[t]=[]);return r.push(n),()=>{const l=r.indexOf(n);l!==-1&&r.splice(l,1)}}$set(t){this.$$set&&!Ee(t)&&(this.$$.skip_bound=!0,this.$$set(t),this.$$.skip_bound=!1)}}function We(e){let t;return{c(){t=f("div"),t.innerHTML=`<img class="col-3 p-3 rounded-circle img-fluid" src="./assets/logo.jpg" alt="GOTOMARS_Logo"/> 
  <div class="col-9 p-3"><h1 class="display-1">Logbuch</h1> 
    <p class="lead">Kleine Einträge mit großer Wirkung</p></div>`,o(t,"class","row p-3")},m(n,r){K(n,t,r)},p:g,i:g,o:g,d(n){n&&W(t)}}}class Be extends U{constructor(t){super(),R(this,t,null,We,M,{})}}const P=[];function qe(e,t=g){let n;const r=new Set;function l(d){if(M(e,d)&&(e=d,n)){const s=!P.length;for(const i of r)i[1](),P.push(i,e);if(s){for(let i=0;i<P.length;i+=2)P[i][0](P[i+1]);P.length=0}}}function c(d){l(d(e))}function u(d,s=g){const i=[d,s];return r.add(i),r.size===1&&(n=t(l)||g),d(e),()=>{r.delete(i),r.size===0&&n&&(n(),n=null)}}return{set:l,update:c,subscribe:u}}let ee=[];try{const e=localStorage.getItem("weeks");e&&(ee=JSON.parse(e),Array.isArray(ee)||(ee=[]))}catch(e){console.error("Error parsing stored data:",e)}const te=qe(ee);te.subscribe(e=>{localStorage.setItem("weeks",JSON.stringify(e))});function Fe(e){let t,n,r,l,c,u,d,s,i,p,h,y,v,w,m,$,b,B,ae,Q,k,de,E,q,fe,ne,pe,I,he,V,C,ge,re,le,me;return{c(){t=f("form"),n=f("div"),r=f("div"),l=f("div"),c=f("label"),c.textContent="Week ID",u=_(),d=f("div"),s=f("input"),i=_(),p=f("div"),h=f("div"),h.textContent="Problem",y=_(),v=f("div"),w=f("div"),m=f("input"),$=_(),b=f("div"),B=f("label"),B.textContent="Titel",ae=_(),Q=f("div"),k=f("input"),de=_(),E=f("div"),q=f("label"),q.textContent="Beschreibung",fe=_(),ne=f("br"),pe=_(),I=f("textarea"),he=_(),V=f("div"),C=f("button"),C.innerHTML='<h1 class="svelte-ad7u3t">+</h1>',ge=_(),re=f("div"),o(c,"for","weekId"),o(c,"class","col-4 col-form-label svelte-ad7u3t"),o(s,"id","weekId"),o(s,"class","form-control bg-dark bg-gradient text-light svelte-ad7u3t"),o(s,"type","number"),o(s,"min","1"),o(s,"max","32"),o(s,"placeholder","0"),o(d,"class","col svelte-ad7u3t"),o(l,"class","form-group row svelte-ad7u3t"),o(h,"class","col-4 col-form-label svelte-ad7u3t"),o(m,"type","checkbox"),o(m,"id","problem"),o(m,"class","form-check-input bg-dark svelte-ad7u3t"),o(m,"role","switch"),o(w,"class","form-switch svelte-ad7u3t"),o(v,"class","col svelte-ad7u3t"),o(p,"class","form-group row my-3 svelte-ad7u3t"),o(B,"for","title"),o(B,"class","col-4 col-form-label svelte-ad7u3t"),o(k,"id","title"),o(k,"class","form-control bg-dark bg-gradient text-light svelte-ad7u3t"),o(k,"type","text"),o(k,"placeholder","Hier eingeben ..."),o(Q,"class","col svelte-ad7u3t"),o(b,"class","form-group row svelte-ad7u3t"),o(r,"class","col svelte-ad7u3t"),o(q,"for","description"),o(q,"class","form-label svelte-ad7u3t"),o(ne,"class","svelte-ad7u3t"),o(I,"id","description"),o(I,"class","form-control bg-dark bg-gradient text-light svelte-ad7u3t"),o(I,"placeholder","Hier eingeben ..."),o(I,"rows","4"),o(E,"class","col svelte-ad7u3t"),o(C,"type","button"),o(C,"class","btn btn-primary btn-lg svelte-ad7u3t"),o(V,"class","d-grid gap-1 col-2 svelte-ad7u3t"),o(re,"class","col svelte-ad7u3t"),o(n,"class","row p-2 svelte-ad7u3t"),o(t,"class","my-5 svelte-ad7u3t")},m(x,S){K(x,t,S),a(t,n),a(n,r),a(r,l),a(l,c),a(l,u),a(l,d),a(d,s),A(s,e[0].weekId),a(r,i),a(r,p),a(p,h),a(p,y),a(p,v),a(v,w),a(w,m),m.checked=e[0].problem,a(r,$),a(r,b),a(b,B),a(b,ae),a(b,Q),a(Q,k),A(k,e[0].title),a(n,de),a(n,E),a(E,q),a(E,fe),a(E,ne),a(E,pe),a(E,I),A(I,e[0].description),a(n,he),a(n,V),a(V,C),a(n,ge),a(n,re),le||(me=[F(s,"input",e[2]),F(m,"change",e[3]),F(k,"input",e[4]),F(I,"input",e[5]),F(C,"click",e[1])],le=!0)},p(x,[S]){S&1&&xe(s.value)!==x[0].weekId&&A(s,x[0].weekId),S&1&&(m.checked=x[0].problem),S&1&&k.value!==x[0].title&&A(k,x[0].title),S&1&&A(I,x[0].description)},i:g,o:g,d(x){x&&W(t),le=!1,H(me)}}}function Ge(e,t,n){let r={weekId:null,problem:!1,title:"",description:""},l=[];te.subscribe(p=>l=p),console.log(l);const c=()=>{const p={weekId:r.weekId,problem:r.problem,title:r.title,description:r.description};p.weekId>0&&p.weekId<=32&&!l.some(h=>h.weekId===p.weekId)?(l=[],l.push(p),te.update(h=>[...h,p]),n(0,r={weekId:null,problem:!1,title:"",description:""})):(console.log("The week could not be added. Use a value between 1 and 32 for the week ID or make sure the week ID doesn't exist yet."),alert("The week could not be added. Use a value between 1 and 32 for the week ID or make sure the week ID doesn't exist yet."))};function u(){r.weekId=xe(this.value),n(0,r)}function d(){r.problem=this.checked,n(0,r)}function s(){r.title=this.value,n(0,r)}function i(){r.description=this.value,n(0,r)}return[r,c,u,d,s,i]}class ze extends U{constructor(t){super(),R(this,t,Ge,Fe,M,{})}}function Je(e){let t,n,r,l,c=("0"+e[0].weekId).slice(-2)+"",u,d,s,i=e[0].title+"",p,h,y,v=e[0].description+"",w,m;return{c(){t=f("div"),n=f("div"),r=f("h3"),l=f("strong"),u=X(c),d=_(),s=f("h5"),p=X(i),h=_(),y=f("p"),w=X(v),o(r,"class","card-title"),o(s,"class","card-subtitle mb-4"),o(y,"class","card-text"),o(n,"class","card-body container text-wrap"),Ae(n,"width","15rem"),o(t,"class",m="card "+e[1]+" rounded-4 svelte-9n2ovy")},m($,b){K($,t,b),a(t,n),a(n,r),a(r,l),a(l,u),a(n,d),a(n,s),a(s,p),a(n,h),a(n,y),a(y,w)},p($,[b]){b&1&&c!==(c=("0"+$[0].weekId).slice(-2)+"")&&se(u,c),b&1&&i!==(i=$[0].title+"")&&se(p,i),b&1&&v!==(v=$[0].description+"")&&se(w,v),b&2&&m!==(m="card "+$[1]+" rounded-4 svelte-9n2ovy")&&o(t,"class",m)},i:g,o:g,d($){$&&W(t)}}}function Ke(e,t,n){let{week:r}=t,l="";return r.problem?l="bg-myRed":l="bg-myGreen",e.$$set=c=>{"week"in c&&n(0,r=c.week)},[r,l]}class Re extends U{constructor(t){super(),R(this,t,Ke,Je,M,{week:0})}}function we(e,t,n){const r=e.slice();return r[1]=t[n],r}function $e(e){let t,n;return t=new Re({props:{week:e[1]}}),{c(){Z(t.$$.fragment)},m(r,l){z(t,r,l),n=!0},p(r,l){const c={};l&1&&(c.week=r[1]),t.$set(c)},i(r){n||(O(t.$$.fragment,r),n=!0)},o(r){D(t.$$.fragment,r),n=!1},d(r){J(t,r)}}}function Ue(e){let t,n,r=e[0],l=[];for(let u=0;u<r.length;u+=1)l[u]=$e(we(e,r,u));const c=u=>D(l[u],1,1,()=>{l[u]=null});return{c(){t=f("div");for(let u=0;u<l.length;u+=1)l[u].c();o(t,"class","d-inline-flex flex-wrap gap-4 align-conent-around justify-conent-evenly")},m(u,d){K(u,t,d);for(let s=0;s<l.length;s+=1)l[s]&&l[s].m(t,null);n=!0},p(u,[d]){if(d&1){r=u[0];let s;for(s=0;s<r.length;s+=1){const i=we(u,r,s);l[s]?(l[s].p(i,d),O(l[s],1)):(l[s]=$e(i),l[s].c(),O(l[s],1),l[s].m(t,null))}for(De(),s=r.length;s<l.length;s+=1)c(s);He()}},i(u){if(!n){for(let d=0;d<r.length;d+=1)O(l[d]);n=!0}},o(u){l=l.filter(Boolean);for(let d=0;d<l.length;d+=1)D(l[d]);n=!1},d(u){u&&W(t),Ce(l,u)}}}function Qe(e,t,n){let r;return Le(e,te,l=>n(0,r=l)),[r]}class Ve extends U{constructor(t){super(),R(this,t,Qe,Ue,M,{})}}function Xe(e){let t,n,r,l,c,u,d,s;return r=new Be({}),c=new ze({}),d=new Ve({}),{c(){t=f("main"),n=f("div"),Z(r.$$.fragment),l=_(),Z(c.$$.fragment),u=_(),Z(d.$$.fragment),o(n,"class","p-5 text-sm-start text-light bg-dark")},m(i,p){K(i,t,p),a(t,n),z(r,n,null),a(n,l),z(c,n,null),a(n,u),z(d,n,null),s=!0},p:g,i(i){s||(O(r.$$.fragment,i),O(c.$$.fragment,i),O(d.$$.fragment,i),s=!0)},o(i){D(r.$$.fragment,i),D(c.$$.fragment,i),D(d.$$.fragment,i),s=!1},d(i){i&&W(t),J(r),J(c),J(d)}}}class Ye extends U{constructor(t){super(),R(this,t,null,Xe,M,{})}}new Ye({target:document.getElementById("app")});
