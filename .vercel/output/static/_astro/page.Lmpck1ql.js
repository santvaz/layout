var w,R=-1,m=function(e){addEventListener("pageshow",function(t){t.persisted&&(R=t.timeStamp,e(t))},!0)},M=function(){var e=self.performance&&performance.getEntriesByType&&performance.getEntriesByType("navigation")[0];if(e&&e.responseStart>0&&e.responseStart<performance.now())return e},C=function(){var e=M();return e&&e.activationStart||0},d=function(e,t){var i=M(),r="navigate";return R>=0?r="back-forward-cache":i&&(document.prerendering||C()>0?r="prerender":document.wasDiscarded?r="restore":i.type&&(r=i.type.replace(/_/g,"-"))),{name:e,value:t===void 0?-1:t,rating:"good",delta:0,entries:[],id:"v4-".concat(Date.now(),"-").concat(Math.floor(8999999999999*Math.random())+1e12),navigationType:r}},h=function(e,t,i){try{if(PerformanceObserver.supportedEntryTypes.includes(e)){var r=new PerformanceObserver(function(n){Promise.resolve().then(function(){t(n.getEntries())})});return r.observe(Object.assign({type:e,buffered:!0},i||{})),r}}catch{}},l=function(e,t,i,r){var n,a;return function(c){t.value>=0&&(c||r)&&((a=t.value-(n||0))||n===void 0)&&(n=t.value,t.delta=a,t.rating=function(u,s){return u>s[1]?"poor":u>s[0]?"needs-improvement":"good"}(t.value,i),e(t))}},k=function(e){requestAnimationFrame(function(){return requestAnimationFrame(function(){return e()})})},b=function(e){document.addEventListener("visibilitychange",function(){document.visibilityState==="hidden"&&e()})},I=function(e){var t=!1;return function(){t||(e(),t=!0)}},v=-1,B=function(){return document.visibilityState!=="hidden"||document.prerendering?1/0:0},S=function(e){document.visibilityState==="hidden"&&v>-1&&(v=e.type==="visibilitychange"?e.timeStamp:0,V())},F=function(){addEventListener("visibilitychange",S,!0),addEventListener("prerenderingchange",S,!0)},V=function(){removeEventListener("visibilitychange",S,!0),removeEventListener("prerenderingchange",S,!0)},D=function(){return v<0&&(v=B(),F(),m(function(){setTimeout(function(){v=B(),F()},0)})),{get firstHiddenTime(){return v}}},A=function(e){document.prerendering?addEventListener("prerenderingchange",function(){return e()},!0):e()},O=[1800,3e3],j=function(e,t){t=t||{},A(function(){var i,r=D(),n=d("FCP"),a=h("paint",function(c){c.forEach(function(u){u.name==="first-contentful-paint"&&(a.disconnect(),u.startTime<r.firstHiddenTime&&(n.value=Math.max(u.startTime-C(),0),n.entries.push(u),i(!0)))})});a&&(i=l(e,n,O,t.reportAllChanges),m(function(c){n=d("FCP"),i=l(e,n,O,t.reportAllChanges),k(function(){n.value=performance.now()-c.timeStamp,i(!0)})}))})},q=[.1,.25],W=function(e,t){t=t||{},j(I(function(){var i,r=d("CLS",0),n=0,a=[],c=function(s){s.forEach(function(o){if(!o.hadRecentInput){var g=a[0],p=a[a.length-1];n&&o.startTime-p.startTime<1e3&&o.startTime-g.startTime<5e3?(n+=o.value,a.push(o)):(n=o.value,a=[o])}}),n>r.value&&(r.value=n,r.entries=a,i())},u=h("layout-shift",c);u&&(i=l(e,r,q,t.reportAllChanges),b(function(){c(u.takeRecords()),i(!0)}),m(function(){n=0,r=d("CLS",0),i=l(e,r,q,t.reportAllChanges),k(function(){return i()})}),setTimeout(i,0))}))},z=0,L=1/0,y=0,$=function(e){e.forEach(function(t){t.interactionId&&(L=Math.min(L,t.interactionId),y=Math.max(y,t.interactionId),z=y?(y-L)/7+1:0)})},K=function(){"interactionCount"in performance||w||(w=h("event",$,{type:"event",buffered:!0,durationThreshold:0}))},f=[],T=new Map,J=0,U=function(){return(w?z:performance.interactionCount||0)-J},X=[],Y=function(e){if(X.forEach(function(n){return n(e)}),e.interactionId||e.entryType==="first-input"){var t=f[f.length-1],i=T.get(e.interactionId);if(i||f.length<10||e.duration>t.latency){if(i)e.duration>i.latency?(i.entries=[e],i.latency=e.duration):e.duration===i.latency&&e.startTime===i.entries[0].startTime&&i.entries.push(e);else{var r={id:e.interactionId,latency:e.duration,entries:[e]};T.set(r.id,r),f.push(r)}f.sort(function(n,a){return a.latency-n.latency}),f.length>10&&f.splice(10).forEach(function(n){return T.delete(n.id)})}}},x=[200,500],Z=function(e,t){t=t||{},A(function(){var i;K();var r,n=d("INP"),a=function(u){u.forEach(Y);var s,o=(s=Math.min(f.length-1,Math.floor(U()/50)),f[s]);o&&o.latency!==n.value&&(n.value=o.latency,n.entries=o.entries,r())},c=h("event",a,{durationThreshold:(i=t.durationThreshold)!==null&&i!==void 0?i:40});r=l(e,n,x,t.reportAllChanges),c&&("PerformanceEventTiming"in self&&"interactionId"in PerformanceEventTiming.prototype&&c.observe({type:"first-input",buffered:!0}),b(function(){a(c.takeRecords()),r(!0)}),m(function(){J=0,f.length=0,T.clear(),n=d("INP"),r=l(e,n,x,t.reportAllChanges)}))})},N=[2500,4e3],P={},ee=function(e,t){t=t||{},A(function(){var i,r=D(),n=d("LCP"),a=function(s){t.reportAllChanges||(s=s.slice(-1)),s.forEach(function(o){o.startTime<r.firstHiddenTime&&(n.value=Math.max(o.startTime-C(),0),n.entries=[o],i())})},c=h("largest-contentful-paint",a);if(c){i=l(e,n,N,t.reportAllChanges);var u=I(function(){P[n.id]||(a(c.takeRecords()),c.disconnect(),P[n.id]=!0,i(!0))});["keydown","click"].forEach(function(s){addEventListener(s,function(){return o=u,g=self.requestIdleCallback||self.setTimeout,p=-1,o=I(o),document.visibilityState==="hidden"?o():(p=g(o),b(o)),p;var o,g,p},!0)}),b(u),m(function(s){n=d("LCP"),i=l(e,n,N,t.reportAllChanges),k(function(){n.value=performance.now()-s.timeStamp,P[n.id]=!0,i(!0)})})}})},_=[800,1800],te=function e(t){document.prerendering?A(function(){return e(t)}):document.readyState!=="complete"?addEventListener("load",function(){return e(t)},!0):setTimeout(t,0)},ne=function(e,t){t=t||{};var i=d("TTFB"),r=l(e,i,_,t.reportAllChanges);te(function(){var n=M();n&&(i.value=Math.max(n.responseStart-C(),0),i.entries=[n],r(!0),m(function(){i=d("TTFB",0),(r=l(e,i,_,t.reportAllChanges))(!0)}))})};const H="/_web-vitals",Q=location.pathname.replace(/(?<=.)\/$/,""),ie=document.querySelector('meta[name="x-astro-vitals-route"]')?.getAttribute("content")||Q,E=new Set,re=e=>E.add(e);function G(){if(!E.size)return;const e=[...E].map(({name:i,id:r,value:n,rating:a})=>({pathname:Q,route:ie,name:i,id:r,value:n,rating:a})),t=JSON.stringify(e);navigator.sendBeacon?navigator.sendBeacon(H,t):fetch(H,{body:t,method:"POST",keepalive:!0}),E.clear()}for(const e of[W,ee,Z,j,ne])e(re);addEventListener("visibilitychange",()=>{document.visibilityState==="hidden"&&G()});addEventListener("pagehide",G);
