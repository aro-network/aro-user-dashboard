"use strict";(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[9916],{62666:function(e,t,r){let i,a,o,n,s,l;r.d(t,{EthereumProvider:function(){return U}});var c,d,u,h,p,g,f,w,m=r(32901),v=r(52299),b=r(53570),y=r(12491);let C=["eth_sendTransaction","personal_sign"],x=["eth_accounts","eth_requestAccounts","eth_sendRawTransaction","eth_sign","eth_signTransaction","eth_signTypedData","eth_signTypedData_v3","eth_signTypedData_v4","eth_sendTransaction","personal_sign","wallet_switchEthereumChain","wallet_addEthereumChain","wallet_getPermissions","wallet_requestPermissions","wallet_registerOnboarding","wallet_watchAsset","wallet_scanQRCode","wallet_sendCalls","wallet_getCapabilities","wallet_getCallsStatus","wallet_showCallsStatus"],E=["chainChanged","accountsChanged"],k=["chainChanged","accountsChanged","message","disconnect","connect"];var A=Object.defineProperty,N=Object.defineProperties,I=Object.getOwnPropertyDescriptors,S=Object.getOwnPropertySymbols,_=Object.prototype.hasOwnProperty,T=Object.prototype.propertyIsEnumerable,O=(e,t,r)=>t in e?A(e,t,{enumerable:!0,configurable:!0,writable:!0,value:r}):e[t]=r,P=(e,t)=>{for(var r in t||(t={}))_.call(t,r)&&O(e,r,t[r]);if(S)for(var r of S(t))T.call(t,r)&&O(e,r,t[r]);return e},R=(e,t)=>N(e,I(t)),$=(e,t,r)=>O(e,"symbol"!=typeof t?t+"":t,r);function L(e){return Number(e[0].split(":")[1])}function B(e){return`0x${e.toString(16)}`}class M{constructor(){$(this,"events",new m.EventEmitter),$(this,"namespace","eip155"),$(this,"accounts",[]),$(this,"signer"),$(this,"chainId",1),$(this,"modal"),$(this,"rpc"),$(this,"STORAGE_KEY","wc@2:ethereum_provider:"),$(this,"on",(e,t)=>(this.events.on(e,t),this)),$(this,"once",(e,t)=>(this.events.once(e,t),this)),$(this,"removeListener",(e,t)=>(this.events.removeListener(e,t),this)),$(this,"off",(e,t)=>(this.events.off(e,t),this)),$(this,"parseAccount",e=>this.isCompatibleChainId(e)?this.parseAccountId(e).address:e),this.signer={},this.rpc={}}static async init(e){let t=new M;return await t.initialize(e),t}async request(e,t){return await this.signer.request(e,this.formatChainId(this.chainId),t)}sendAsync(e,t,r){this.signer.sendAsync(e,t,this.formatChainId(this.chainId),r)}get connected(){return!!this.signer.client&&this.signer.client.core.relayer.connected}get connecting(){return!!this.signer.client&&this.signer.client.core.relayer.connecting}async enable(){return this.session||await this.connect(),await this.request({method:"eth_requestAccounts"})}async connect(e){var t;if(!this.signer.client)throw Error("Provider not initialized. Call init() first");this.loadConnectOpts(e);let{required:r,optional:i}=function(e){let{chains:t,optionalChains:r,methods:i,optionalMethods:a,events:o,optionalEvents:n,rpcMap:s}=e;if(!(0,v.qt8)(t))throw Error("Invalid chains");let l={chains:t,methods:i||C,events:o||E,rpcMap:P({},t.length?{[L(t)]:s[L(t)]}:{})},c=o?.filter(e=>!E.includes(e)),d=i?.filter(e=>!C.includes(e));if(!r&&!n&&!a&&!(null!=c&&c.length)&&!(null!=d&&d.length))return{required:t.length?l:void 0};let u={chains:[...new Set(c?.length&&d?.length||!r?l.chains.concat(r||[]):r)],methods:[...new Set(l.methods.concat(null!=a&&a.length?a:x))],events:[...new Set(l.events.concat(null!=n&&n.length?n:k))],rpcMap:s};return{required:t.length?l:void 0,optional:r.length?u:void 0}}(this.rpc);try{let t=await new Promise(async(t,a)=>{var o,n;this.rpc.showQrModal&&(null==(o=this.modal)||o.open(),null==(n=this.modal)||n.subscribeState(e=>{e.open||this.signer.session||(this.signer.abortPairingAttempt(),a(Error("Connection request reset. Please try again.")))}));let s=null!=e&&e.scopedProperties?{[this.namespace]:e.scopedProperties}:void 0;await this.signer.connect(R(P({namespaces:P({},r&&{[this.namespace]:r})},i&&{optionalNamespaces:{[this.namespace]:i}}),{pairingTopic:e?.pairingTopic,scopedProperties:s})).then(e=>{t(e)}).catch(e=>{var t;null==(t=this.modal)||t.showErrorMessage("Unable to connect"),a(Error(e.message))})});if(!t)return;let a=(0,v.guN)(t.namespaces,[this.namespace]);this.setChainIds(this.rpc.chains.length?this.rpc.chains:a),this.setAccounts(a),this.events.emit("connect",{chainId:B(this.chainId)})}catch(e){throw this.signer.logger.error(e),e}finally{null==(t=this.modal)||t.close()}}async authenticate(e,t){var r;if(!this.signer.client)throw Error("Provider not initialized. Call init() first");this.loadConnectOpts({chains:e?.chains});try{let r=await new Promise(async(r,i)=>{var a,o;this.rpc.showQrModal&&(null==(a=this.modal)||a.open(),null==(o=this.modal)||o.subscribeState(e=>{e.open||this.signer.session||(this.signer.abortPairingAttempt(),i(Error("Connection request reset. Please try again.")))})),await this.signer.authenticate(R(P({},e),{chains:this.rpc.chains}),t).then(e=>{r(e)}).catch(e=>{var t;null==(t=this.modal)||t.showErrorMessage("Unable to connect"),i(Error(e.message))})}),i=r.session;if(i){let e=(0,v.guN)(i.namespaces,[this.namespace]);this.setChainIds(this.rpc.chains.length?this.rpc.chains:e),this.setAccounts(e),this.events.emit("connect",{chainId:B(this.chainId)})}return r}catch(e){throw this.signer.logger.error(e),e}finally{null==(r=this.modal)||r.close()}}async disconnect(){this.session&&await this.signer.disconnect(),this.reset()}get isWalletConnect(){return!0}get session(){return this.signer.session}registerEventListeners(){this.signer.on("session_event",e=>{let{params:t}=e,{event:r}=t;"accountsChanged"===r.name?(this.accounts=this.parseAccounts(r.data),this.events.emit("accountsChanged",this.accounts)):"chainChanged"===r.name?this.setChainId(this.formatChainId(r.data)):this.events.emit(r.name,r.data),this.events.emit("session_event",e)}),this.signer.on("accountsChanged",e=>{this.accounts=this.parseAccounts(e),this.events.emit("accountsChanged",this.accounts)}),this.signer.on("chainChanged",e=>{let t=parseInt(e);this.chainId=t,this.events.emit("chainChanged",B(this.chainId)),this.persist()}),this.signer.on("session_update",e=>{this.events.emit("session_update",e)}),this.signer.on("session_delete",e=>{this.reset(),this.events.emit("session_delete",e),this.events.emit("disconnect",R(P({},(0,v.D6H)("USER_DISCONNECTED")),{data:e.topic,name:"USER_DISCONNECTED"}))}),this.signer.on("display_uri",e=>{this.events.emit("display_uri",e)})}switchEthereumChain(e){this.request({method:"wallet_switchEthereumChain",params:[{chainId:e.toString(16)}]})}isCompatibleChainId(e){return"string"==typeof e&&e.startsWith(`${this.namespace}:`)}formatChainId(e){return`${this.namespace}:${e}`}parseChainId(e){return Number(e.split(":")[1])}setChainIds(e){let t=e.filter(e=>this.isCompatibleChainId(e)).map(e=>this.parseChainId(e));t.length&&(this.chainId=t[0],this.events.emit("chainChanged",B(this.chainId)),this.persist())}setChainId(e){if(this.isCompatibleChainId(e)){let t=this.parseChainId(e);this.chainId=t,this.switchEthereumChain(t)}}parseAccountId(e){let[t,r,i]=e.split(":");return{chainId:`${t}:${r}`,address:i}}setAccounts(e){this.accounts=e.filter(e=>this.parseChainId(this.parseAccountId(e).chainId)===this.chainId).map(e=>this.parseAccountId(e).address),this.events.emit("accountsChanged",this.accounts)}getRpcConfig(e){var t,r;let i=null!=(t=e?.chains)?t:[],a=null!=(r=e?.optionalChains)?r:[],o=i.concat(a);if(!o.length)throw Error("No chains specified in either `chains` or `optionalChains`");let n=i.length?e?.methods||C:[],s=i.length?e?.events||E:[],l=e?.optionalMethods||[],c=e?.optionalEvents||[],d=e?.rpcMap||this.buildRpcMap(o,e.projectId),u=e?.qrModalOptions||void 0;return{chains:i?.map(e=>this.formatChainId(e)),optionalChains:a.map(e=>this.formatChainId(e)),methods:n,events:s,optionalMethods:l,optionalEvents:c,rpcMap:d,showQrModal:!!(null!=e&&e.showQrModal),qrModalOptions:u,projectId:e.projectId,metadata:e.metadata}}buildRpcMap(e,t){let r={};return e.forEach(e=>{r[e]=this.getRpcUrl(e,t)}),r}async initialize(e){if(this.rpc=this.getRpcConfig(e),this.chainId=this.rpc.chains.length?L(this.rpc.chains):L(this.rpc.optionalChains),this.signer=await b.k.init({projectId:this.rpc.projectId,metadata:this.rpc.metadata,disableProviderPing:e.disableProviderPing,relayUrl:e.relayUrl,storage:e.storage,storageOptions:e.storageOptions,customStoragePrefix:e.customStoragePrefix,telemetryEnabled:e.telemetryEnabled,logger:e.logger}),this.registerEventListeners(),await this.loadPersistedSession(),this.rpc.showQrModal){let e;try{let{createAppKit:t}=await Promise.resolve().then(function(){return sX}),{convertWCMToAppKitOptions:r}=await Promise.resolve().then(function(){return s9}),i=r(R(P({},this.rpc.qrModalOptions),{chains:[...new Set([...this.rpc.chains,...this.rpc.optionalChains])],metadata:this.rpc.metadata,projectId:this.rpc.projectId}));if(!i.networks.length)throw Error("No networks found for WalletConnect\xb7");e=t(R(P({},i),{universalProvider:this.signer,manualWCControl:!0}))}catch{throw Error("To use QR modal, please install @reown/appkit package")}if(e)try{this.modal=e}catch(e){throw this.signer.logger.error(e),Error("Could not generate WalletConnectModal Instance")}}}loadConnectOpts(e){if(!e)return;let{chains:t,optionalChains:r,rpcMap:i}=e;t&&(0,v.qt8)(t)&&(this.rpc.chains=t.map(e=>this.formatChainId(e)),t.forEach(e=>{this.rpc.rpcMap[e]=i?.[e]||this.getRpcUrl(e)})),r&&(0,v.qt8)(r)&&(this.rpc.optionalChains=[],this.rpc.optionalChains=r?.map(e=>this.formatChainId(e)),r.forEach(e=>{this.rpc.rpcMap[e]=i?.[e]||this.getRpcUrl(e)}))}getRpcUrl(e,t){var r;return(null==(r=this.rpc.rpcMap)?void 0:r[e])||`https://rpc.walletconnect.org/v1/?chainId=eip155:${e}&projectId=${t||this.rpc.projectId}`}async loadPersistedSession(){if(this.session)try{let e=await this.signer.client.core.storage.getItem(`${this.STORAGE_KEY}/chainId`),t=this.session.namespaces[`${this.namespace}:${e}`]?this.session.namespaces[`${this.namespace}:${e}`]:this.session.namespaces[this.namespace];this.setChainIds(e?[this.formatChainId(e)]:t?.accounts),this.setAccounts(t?.accounts)}catch(e){this.signer.logger.error("Failed to load persisted session, clearing state..."),this.signer.logger.error(e),await this.disconnect().catch(e=>this.signer.logger.warn(e))}}reset(){this.chainId=1,this.accounts=[]}persist(){this.session&&this.signer.client.core.storage.setItem(`${this.STORAGE_KEY}/chainId`,this.chainId)}parseAccounts(e){return"string"==typeof e||e instanceof String?[this.parseAccount(e)]:e.map(e=>this.parseAccount(e))}}let U=M;"u">typeof globalThis?globalThis:"u">typeof window?window:"u">typeof r.g?r.g:"u">typeof self&&self;var z={exports:{}};d=function(){var e="millisecond",t="second",r="minute",i="hour",a="week",o="month",n="quarter",s="year",l="date",c="Invalid Date",d=/^(\d{4})[-/]?(\d{1,2})?[-/]?(\d{0,2})[Tt\s]*(\d{1,2})?:?(\d{1,2})?:?(\d{1,2})?[.:]?(\d+)?$/,u=/\[([^\]]+)]|Y{1,4}|M{1,4}|D{1,2}|d{1,4}|H{1,2}|h{1,2}|a|A|m{1,2}|s{1,2}|Z{1,2}|SSS/g,h=function(e,t,r){var i=String(e);return!i||i.length>=t?e:""+Array(t+1-i.length).join(r)+e},p="en",g={};g[p]={name:"en",weekdays:"Sunday_Monday_Tuesday_Wednesday_Thursday_Friday_Saturday".split("_"),months:"January_February_March_April_May_June_July_August_September_October_November_December".split("_"),ordinal:function(e){var t=["th","st","nd","rd"],r=e%100;return"["+e+(t[(r-20)%10]||t[r]||"th")+"]"}};var f="$isDayjsObject",w=function(e){return e instanceof y||!(!e||!e[f])},m=function e(t,r,i){var a;if(!t)return p;if("string"==typeof t){var o=t.toLowerCase();g[o]&&(a=o),r&&(g[o]=r,a=o);var n=t.split("-");if(!a&&n.length>1)return e(n[0])}else{var s=t.name;g[s]=t,a=s}return!i&&a&&(p=a),a||!i&&p},v=function(e,t){if(w(e))return e.clone();var r="object"==typeof t?t:{};return r.date=e,r.args=arguments,new y(r)},b={s:h,z:function(e){var t=-e.utcOffset(),r=Math.abs(t);return(t<=0?"+":"-")+h(Math.floor(r/60),2,"0")+":"+h(r%60,2,"0")},m:function e(t,r){if(t.date()<r.date())return-e(r,t);var i=12*(r.year()-t.year())+(r.month()-t.month()),a=t.clone().add(i,o),n=r-a<0,s=t.clone().add(i+(n?-1:1),o);return+(-(i+(r-a)/(n?a-s:s-a))||0)},a:function(e){return e<0?Math.ceil(e)||0:Math.floor(e)},p:function(c){return({M:o,y:s,w:a,d:"day",D:l,h:i,m:r,s:t,ms:e,Q:n})[c]||String(c||"").toLowerCase().replace(/s$/,"")},u:function(e){return void 0===e}};b.l=m,b.i=w,b.w=function(e,t){return v(e,{locale:t.$L,utc:t.$u,x:t.$x,$offset:t.$offset})};var y=function(){function h(e){this.$L=m(e.locale,null,!0),this.parse(e),this.$x=this.$x||e.x||{},this[f]=!0}var p=h.prototype;return p.parse=function(e){this.$d=function(e){var t=e.date,r=e.utc;if(null===t)return new Date(NaN);if(b.u(t))return new Date;if(t instanceof Date)return new Date(t);if("string"==typeof t&&!/Z$/i.test(t)){var i=t.match(d);if(i){var a=i[2]-1||0,o=(i[7]||"0").substring(0,3);return r?new Date(Date.UTC(i[1],a,i[3]||1,i[4]||0,i[5]||0,i[6]||0,o)):new Date(i[1],a,i[3]||1,i[4]||0,i[5]||0,i[6]||0,o)}}return new Date(t)}(e),this.init()},p.init=function(){var e=this.$d;this.$y=e.getFullYear(),this.$M=e.getMonth(),this.$D=e.getDate(),this.$W=e.getDay(),this.$H=e.getHours(),this.$m=e.getMinutes(),this.$s=e.getSeconds(),this.$ms=e.getMilliseconds()},p.$utils=function(){return b},p.isValid=function(){return this.$d.toString()!==c},p.isSame=function(e,t){var r=v(e);return this.startOf(t)<=r&&r<=this.endOf(t)},p.isAfter=function(e,t){return v(e)<this.startOf(t)},p.isBefore=function(e,t){return this.endOf(t)<v(e)},p.$g=function(e,t,r){return b.u(e)?this[t]:this.set(r,e)},p.unix=function(){return Math.floor(this.valueOf()/1e3)},p.valueOf=function(){return this.$d.getTime()},p.startOf=function(e,n){var c=this,d=!!b.u(n)||n,u=b.p(e),h=function(e,t){var r=b.w(c.$u?Date.UTC(c.$y,t,e):new Date(c.$y,t,e),c);return d?r:r.endOf("day")},p=function(e,t){return b.w(c.toDate()[e].apply(c.toDate("s"),(d?[0,0,0,0]:[23,59,59,999]).slice(t)),c)},g=this.$W,f=this.$M,w=this.$D,m="set"+(this.$u?"UTC":"");switch(u){case s:return d?h(1,0):h(31,11);case o:return d?h(1,f):h(0,f+1);case a:var v=this.$locale().weekStart||0,y=(g<v?g+7:g)-v;return h(d?w-y:w+(6-y),f);case"day":case l:return p(m+"Hours",0);case i:return p(m+"Minutes",1);case r:return p(m+"Seconds",2);case t:return p(m+"Milliseconds",3);default:return this.clone()}},p.endOf=function(e){return this.startOf(e,!1)},p.$set=function(a,n){var c,d=b.p(a),u="set"+(this.$u?"UTC":""),h=((c={}).day=u+"Date",c[l]=u+"Date",c[o]=u+"Month",c[s]=u+"FullYear",c[i]=u+"Hours",c[r]=u+"Minutes",c[t]=u+"Seconds",c[e]=u+"Milliseconds",c)[d],p="day"===d?this.$D+(n-this.$W):n;if(d===o||d===s){var g=this.clone().set(l,1);g.$d[h](p),g.init(),this.$d=g.set(l,Math.min(this.$D,g.daysInMonth())).$d}else h&&this.$d[h](p);return this.init(),this},p.set=function(e,t){return this.clone().$set(e,t)},p.get=function(e){return this[b.p(e)]()},p.add=function(e,n){var l,c=this;e=Number(e);var d=b.p(n),u=function(t){var r=v(c);return b.w(r.date(r.date()+Math.round(t*e)),c)};if(d===o)return this.set(o,this.$M+e);if(d===s)return this.set(s,this.$y+e);if("day"===d)return u(1);if(d===a)return u(7);var h=((l={})[r]=6e4,l[i]=36e5,l[t]=1e3,l)[d]||1,p=this.$d.getTime()+e*h;return b.w(p,this)},p.subtract=function(e,t){return this.add(-1*e,t)},p.format=function(e){var t=this,r=this.$locale();if(!this.isValid())return r.invalidDate||c;var i=e||"YYYY-MM-DDTHH:mm:ssZ",a=b.z(this),o=this.$H,n=this.$m,s=this.$M,l=r.weekdays,d=r.months,h=r.meridiem,p=function(e,r,a,o){return e&&(e[r]||e(t,i))||a[r].slice(0,o)},g=function(e){return b.s(o%12||12,e,"0")},f=h||function(e,t,r){var i=e<12?"AM":"PM";return r?i.toLowerCase():i};return i.replace(u,function(e,i){return i||function(e){switch(e){case"YY":return String(t.$y).slice(-2);case"YYYY":return b.s(t.$y,4,"0");case"M":return s+1;case"MM":return b.s(s+1,2,"0");case"MMM":return p(r.monthsShort,s,d,3);case"MMMM":return p(d,s);case"D":return t.$D;case"DD":return b.s(t.$D,2,"0");case"d":return String(t.$W);case"dd":return p(r.weekdaysMin,t.$W,l,2);case"ddd":return p(r.weekdaysShort,t.$W,l,3);case"dddd":return l[t.$W];case"H":return String(o);case"HH":return b.s(o,2,"0");case"h":return g(1);case"hh":return g(2);case"a":return f(o,n,!0);case"A":return f(o,n,!1);case"m":return String(n);case"mm":return b.s(n,2,"0");case"s":return String(t.$s);case"ss":return b.s(t.$s,2,"0");case"SSS":return b.s(t.$ms,3,"0");case"Z":return a}return null}(e)||a.replace(":","")})},p.utcOffset=function(){return-(15*Math.round(this.$d.getTimezoneOffset()/15))},p.diff=function(e,l,c){var d,u=this,h=b.p(l),p=v(e),g=(p.utcOffset()-this.utcOffset())*6e4,f=this-p,w=function(){return b.m(u,p)};switch(h){case s:d=w()/12;break;case o:d=w();break;case n:d=w()/3;break;case a:d=(f-g)/6048e5;break;case"day":d=(f-g)/864e5;break;case i:d=f/36e5;break;case r:d=f/6e4;break;case t:d=f/1e3;break;default:d=f}return c?d:b.a(d)},p.daysInMonth=function(){return this.endOf(o).$D},p.$locale=function(){return g[this.$L]},p.locale=function(e,t){if(!e)return this.$L;var r=this.clone(),i=m(e,t,!0);return i&&(r.$L=i),r},p.clone=function(){return b.w(this.$d,this)},p.toDate=function(){return new Date(this.valueOf())},p.toJSON=function(){return this.isValid()?this.toISOString():null},p.toISOString=function(){return this.$d.toISOString()},p.toString=function(){return this.$d.toUTCString()},h}(),C=y.prototype;return v.prototype=C,[["$ms",e],["$s",t],["$m",r],["$H",i],["$W","day"],["$M",o],["$y",s],["$D",l]].forEach(function(e){C[e[1]]=function(t){return this.$g(t,e[0],e[1])}}),v.extend=function(e,t){return e.$i||(e(t,y,v),e.$i=!0),v},v.locale=m,v.isDayjs=w,v.unix=function(e){return v(1e3*e)},v.en=g[p],v.Ls=g,v.p={},v},z.exports=d();var D=z.exports,j={exports:{}};u=function(){return{name:"en",weekdays:"Sunday_Monday_Tuesday_Wednesday_Thursday_Friday_Saturday".split("_"),months:"January_February_March_April_May_June_July_August_September_October_November_December".split("_"),ordinal:function(e){var t=["th","st","nd","rd"],r=e%100;return"["+e+(t[(r-20)%10]||t[r]||"th")+"]"}}},j.exports=u();var W=j.exports,H={exports:{}};h=function(){return function(e,t,r){e=e||{};var i=t.prototype,a={future:"in %s",past:"%s ago",s:"a few seconds",m:"a minute",mm:"%d minutes",h:"an hour",hh:"%d hours",d:"a day",dd:"%d days",M:"a month",MM:"%d months",y:"a year",yy:"%d years"};function o(e,t,r,a){return i.fromToBase(e,t,r,a)}r.en.relativeTime=a,i.fromToBase=function(t,i,o,n,s){for(var l,c,d,u=o.$locale().relativeTime||a,h=e.thresholds||[{l:"s",r:44,d:"second"},{l:"m",r:89},{l:"mm",r:44,d:"minute"},{l:"h",r:89},{l:"hh",r:21,d:"hour"},{l:"d",r:35},{l:"dd",r:25,d:"day"},{l:"M",r:45},{l:"MM",r:10,d:"month"},{l:"y",r:17},{l:"yy",d:"year"}],p=h.length,g=0;g<p;g+=1){var f=h[g];f.d&&(l=n?r(t).diff(o,f.d,!0):o.diff(t,f.d,!0));var w=(e.rounding||Math.round)(Math.abs(l));if(d=l>0,w<=f.r||!f.r){w<=1&&g>0&&(f=h[g-1]);var m=u[f.l];s&&(w=s(""+w)),c="string"==typeof m?m.replace("%d",w):m(w,i,f.l,d);break}}if(i)return c;var v=d?u.future:u.past;return"function"==typeof v?v(c):v.replace("%s",c)},i.to=function(e,t){return o(e,t,this,!0)},i.from=function(e,t){return o(e,t,this)};var n=function(e){return e.$u?r.utc():r()};i.toNow=function(e){return this.to(n(this),e)},i.fromNow=function(e){return this.from(n(this),e)}}},H.exports=h();var F=H.exports,V={exports:{}};p=function(){return function(e,t,r){r.updateLocale=function(e,t){var i=r.Ls[e];if(i)return(t?Object.keys(t):[]).forEach(function(e){i[e]=t[e]}),i}}},V.exports=p();var Z=V.exports;D.extend(F),D.extend(Z);let q={...W,name:"en-web3-modal",relativeTime:{future:"in %s",past:"%s ago",s:"%d sec",m:"1 min",mm:"%d min",h:"1 hr",hh:"%d hrs",d:"1 d",dd:"%d d",M:"1 mo",MM:"%d mo",y:"1 yr",yy:"%d yr"}};D.locale("en-web3-modal",q);let G={caipNetworkIdToNumber:e=>e?Number(e.split(":")[1]):void 0,parseEvmChainId(e){return"string"==typeof e?this.caipNetworkIdToNumber(e):e},getNetworksByNamespace:(e,t)=>e?.filter(e=>e.chainNamespace===t)||[],getFirstNetworkByNamespace(e,t){return this.getNetworksByNamespace(e,t)[0]}};var K="[big.js] ",Y=K+"Invalid ",X=Y+"decimal places",J=Y+"rounding mode",Q=K+"Division by zero",ee={},et=void 0,er=/^-?(\d+(\.\d*)?|\.\d+)(e[+-]?\d+)?$/i;function ei(e,t,r,i){var a=e.c;if(r===et&&(r=e.constructor.RM),0!==r&&1!==r&&2!==r&&3!==r)throw Error(J);if(t<1)i=3===r&&(i||!!a[0])||0===t&&(1===r&&a[0]>=5||2===r&&(a[0]>5||5===a[0]&&(i||a[1]!==et))),a.length=1,i?(e.e=e.e-t+1,a[0]=1):a[0]=e.e=0;else if(t<a.length){if(i=1===r&&a[t]>=5||2===r&&(a[t]>5||5===a[t]&&(i||a[t+1]!==et||1&a[t-1]))||3===r&&(i||!!a[0]),a.length=t,i){for(;++a[--t]>9;)if(a[t]=0,0===t){++e.e,a.unshift(1);break}}for(t=a.length;!a[--t];)a.pop()}return e}function ea(e,t,r){var i=e.e,a=e.c.join(""),o=a.length;if(t)a=a.charAt(0)+(o>1?"."+a.slice(1):"")+(i<0?"e":"e+")+i;else if(i<0){for(;++i;)a="0"+a;a="0."+a}else if(i>0){if(++i>o)for(i-=o;i--;)a+="0";else i<o&&(a=a.slice(0,i)+"."+a.slice(i))}else o>1&&(a=a.charAt(0)+"."+a.slice(1));return e.s<0&&r?"-"+a:a}ee.abs=function(){var e=new this.constructor(this);return e.s=1,e},ee.cmp=function(e){var t,r=this.c,i=(e=new this.constructor(e)).c,a=this.s,o=e.s,n=this.e,s=e.e;if(!r[0]||!i[0])return r[0]?a:i[0]?-o:0;if(a!=o)return a;if(t=a<0,n!=s)return n>s^t?1:-1;for(o=(n=r.length)<(s=i.length)?n:s,a=-1;++a<o;)if(r[a]!=i[a])return r[a]>i[a]^t?1:-1;return n==s?0:n>s^t?1:-1},ee.div=function(e){var t=this.constructor,r=this.c,i=(e=new t(e)).c,a=this.s==e.s?1:-1,o=t.DP;if(o!==~~o||o<0||o>1e6)throw Error(X);if(!i[0])throw Error(Q);if(!r[0])return e.s=a,e.c=[e.e=0],e;var n,s,l,c,d,u=i.slice(),h=n=i.length,p=r.length,g=r.slice(0,n),f=g.length,w=e,m=w.c=[],v=0,b=o+(w.e=this.e-e.e)+1;for(w.s=a,a=b<0?0:b,u.unshift(0);f++<n;)g.push(0);do{for(l=0;l<10;l++){if(n!=(f=g.length))c=n>f?1:-1;else for(d=-1,c=0;++d<n;)if(i[d]!=g[d]){c=i[d]>g[d]?1:-1;break}if(c<0){for(s=f==n?i:u;f;){if(g[--f]<s[f]){for(d=f;d&&!g[--d];)g[d]=9;--g[d],g[f]+=10}g[f]-=s[f]}for(;!g[0];)g.shift()}else break}m[v++]=c?l:++l,g[0]&&c?g[f]=r[h]||0:g=[r[h]]}while((h++<p||g[0]!==et)&&a--);return!m[0]&&1!=v&&(m.shift(),w.e--,b--),v>b&&ei(w,b,t.RM,g[0]!==et),w},ee.eq=function(e){return 0===this.cmp(e)},ee.gt=function(e){return this.cmp(e)>0},ee.gte=function(e){return this.cmp(e)>-1},ee.lt=function(e){return 0>this.cmp(e)},ee.lte=function(e){return 1>this.cmp(e)},ee.minus=ee.sub=function(e){var t,r,i,a,o=this.constructor,n=this.s,s=(e=new o(e)).s;if(n!=s)return e.s=-s,this.plus(e);var l=this.c.slice(),c=this.e,d=e.c,u=e.e;if(!l[0]||!d[0])return d[0]?e.s=-s:l[0]?e=new o(this):e.s=1,e;if(n=c-u){for((a=n<0)?(n=-n,i=l):(u=c,i=d),i.reverse(),s=n;s--;)i.push(0);i.reverse()}else for(r=((a=l.length<d.length)?l:d).length,n=s=0;s<r;s++)if(l[s]!=d[s]){a=l[s]<d[s];break}if(a&&(i=l,l=d,d=i,e.s=-e.s),(s=(r=d.length)-(t=l.length))>0)for(;s--;)l[t++]=0;for(s=t;r>n;){if(l[--r]<d[r]){for(t=r;t&&!l[--t];)l[t]=9;--l[t],l[r]+=10}l[r]-=d[r]}for(;0===l[--s];)l.pop();for(;0===l[0];)l.shift(),--u;return l[0]||(e.s=1,l=[u=0]),e.c=l,e.e=u,e},ee.mod=function(e){var t,r=this,i=r.constructor,a=r.s,o=(e=new i(e)).s;if(!e.c[0])throw Error(Q);return r.s=e.s=1,t=1==e.cmp(r),r.s=a,e.s=o,t?new i(r):(a=i.DP,o=i.RM,i.DP=i.RM=0,r=r.div(e),i.DP=a,i.RM=o,this.minus(r.times(e)))},ee.neg=function(){var e=new this.constructor(this);return e.s=-e.s,e},ee.plus=ee.add=function(e){var t,r,i,a=this.constructor;if(e=new a(e),this.s!=e.s)return e.s=-e.s,this.minus(e);var o=this.e,n=this.c,s=e.e,l=e.c;if(!n[0]||!l[0])return l[0]||(n[0]?e=new a(this):e.s=this.s),e;if(n=n.slice(),t=o-s){for(t>0?(s=o,i=l):(t=-t,i=n),i.reverse();t--;)i.push(0);i.reverse()}for(n.length-l.length<0&&(i=l,l=n,n=i),t=l.length,r=0;t;n[t]%=10)r=(n[--t]=n[t]+l[t]+r)/10|0;for(r&&(n.unshift(r),++s),t=n.length;0===n[--t];)n.pop();return e.c=n,e.e=s,e},ee.pow=function(e){var t=this,r=new t.constructor("1"),i=r,a=e<0;if(e!==~~e||e<-1e6||e>1e6)throw Error(Y+"exponent");for(a&&(e=-e);1&e&&(i=i.times(t)),e>>=1;)t=t.times(t);return a?r.div(i):i},ee.prec=function(e,t){if(e!==~~e||e<1||e>1e6)throw Error(Y+"precision");return ei(new this.constructor(this),e,t)},ee.round=function(e,t){if(e===et)e=0;else if(e!==~~e||e<-1e6||e>1e6)throw Error(X);return ei(new this.constructor(this),e+this.e+1,t)},ee.sqrt=function(){var e,t,r,i=this.constructor,a=this.s,o=this.e,n=new i("0.5");if(!this.c[0])return new i(this);if(a<0)throw Error(K+"No square root");0===(a=Math.sqrt(+ea(this,!0,!0)))||a===1/0?((t=this.c.join("")).length+o&1||(t+="0"),o=((o+1)/2|0)-(o<0||1&o),e=new i(((a=Math.sqrt(t))==1/0?"5e":(a=a.toExponential()).slice(0,a.indexOf("e")+1))+o)):e=new i(a+""),o=e.e+(i.DP+=4);do r=e,e=n.times(r.plus(this.div(r)));while(r.c.slice(0,o).join("")!==e.c.slice(0,o).join(""));return ei(e,(i.DP-=4)+e.e+1,i.RM)},ee.times=ee.mul=function(e){var t,r=this.constructor,i=this.c,a=(e=new r(e)).c,o=i.length,n=a.length,s=this.e,l=e.e;if(e.s=this.s==e.s?1:-1,!i[0]||!a[0])return e.c=[e.e=0],e;for(e.e=s+l,o<n&&(t=i,i=a,a=t,l=o,o=n,n=l),t=Array(l=o+n);l--;)t[l]=0;for(s=n;s--;){for(n=0,l=o+s;l>s;)n=t[l]+a[s]*i[l-s-1]+n,t[l--]=n%10,n=n/10|0;t[l]=n}for(n?++e.e:t.shift(),s=t.length;!t[--s];)t.pop();return e.c=t,e},ee.toExponential=function(e,t){var r=this,i=r.c[0];if(e!==et){if(e!==~~e||e<0||e>1e6)throw Error(X);for(r=ei(new r.constructor(r),++e,t);r.c.length<e;)r.c.push(0)}return ea(r,!0,!!i)},ee.toFixed=function(e,t){var r=this,i=r.c[0];if(e!==et){if(e!==~~e||e<0||e>1e6)throw Error(X);for(r=ei(new r.constructor(r),e+r.e+1,t),e=e+r.e+1;r.c.length<e;)r.c.push(0)}return ea(r,!1,!!i)},ee[Symbol.for("nodejs.util.inspect.custom")]=ee.toJSON=ee.toString=function(){var e=this.constructor;return ea(this,this.e<=e.NE||this.e>=e.PE,!!this.c[0])},ee.toNumber=function(){var e=+ea(this,!0,!0);if(!0===this.constructor.strict&&!this.eq(e.toString()))throw Error(K+"Imprecise conversion");return e},ee.toPrecision=function(e,t){var r=this,i=r.constructor,a=r.c[0];if(e!==et){if(e!==~~e||e<1||e>1e6)throw Error(Y+"precision");for(r=ei(new i(r),e,t);r.c.length<e;)r.c.push(0)}return ea(r,e<=r.e||r.e<=i.NE||r.e>=i.PE,!!a)},ee.valueOf=function(){var e=this.constructor;if(!0===e.strict)throw Error(K+"valueOf disallowed");return ea(this,this.e<=e.NE||this.e>=e.PE,!0)};var eo=function e(){function t(r){if(!(this instanceof t))return r===et?e():new t(r);if(r instanceof t)this.s=r.s,this.e=r.e,this.c=r.c.slice();else{if("string"!=typeof r){if(!0===t.strict&&"bigint"!=typeof r)throw TypeError(Y+"value");r=0===r&&1/r<0?"-0":String(r)}!function(e,t){var r,i,a;if(!er.test(t))throw Error(Y+"number");for(e.s="-"==t.charAt(0)?(t=t.slice(1),-1):1,(r=t.indexOf("."))>-1&&(t=t.replace(".","")),(i=t.search(/e/i))>0?(r<0&&(r=i),r+=+t.slice(i+1),t=t.substring(0,i)):r<0&&(r=t.length),a=t.length,i=0;i<a&&"0"==t.charAt(i);)++i;if(i==a)e.c=[e.e=0];else{for(;a>0&&"0"==t.charAt(--a););for(e.e=r-i-1,e.c=[],r=0;i<=a;)e.c[r++]=+t.charAt(i++)}}(this,r)}this.constructor=t}return t.prototype=ee,t.DP=20,t.RM=1,t.NE=-7,t.PE=21,t.strict=!1,t.roundDown=0,t.roundHalfUp=1,t.roundHalfEven=2,t.roundUp=3,t}();let en={bigNumber:e=>new eo(e||0),multiply(e,t){if(void 0===e||void 0===t)return new eo(0);let r=new eo(e),i=new eo(t);return r.times(i)},formatNumberToLocalString:(e,t=2)=>void 0===e?"0.00":"number"==typeof e?e.toLocaleString("en-US",{maximumFractionDigits:t,minimumFractionDigits:t}):parseFloat(e).toLocaleString("en-US",{maximumFractionDigits:t,minimumFractionDigits:t}),parseLocalStringToNumber:e=>void 0===e?0:parseFloat(e.replace(/,/gu,""))},es=[{type:"function",name:"transfer",stateMutability:"nonpayable",inputs:[{name:"_to",type:"address"},{name:"_value",type:"uint256"}],outputs:[{name:"",type:"bool"}]},{type:"function",name:"transferFrom",stateMutability:"nonpayable",inputs:[{name:"_from",type:"address"},{name:"_to",type:"address"},{name:"_value",type:"uint256"}],outputs:[{name:"",type:"bool"}]}],el=[{type:"function",name:"transfer",stateMutability:"nonpayable",inputs:[{name:"recipient",type:"address"},{name:"amount",type:"uint256"}],outputs:[]},{type:"function",name:"transferFrom",stateMutability:"nonpayable",inputs:[{name:"sender",type:"address"},{name:"recipient",type:"address"},{name:"amount",type:"uint256"}],outputs:[{name:"",type:"bool"}]}],ec={BLOCKCHAIN_API_RPC_URL:"https://rpc.walletconnect.org",PULSE_API_URL:"https://pulse.walletconnect.org",W3M_API_URL:"https://api.web3modal.org",CONNECTOR_ID:{WALLET_CONNECT:"walletConnect",INJECTED:"injected",WALLET_STANDARD:"announced",COINBASE:"coinbaseWallet",COINBASE_SDK:"coinbaseWalletSDK",SAFE:"safe",LEDGER:"ledger",OKX:"okx",EIP6963:"eip6963",AUTH:"ID_AUTH"},CONNECTOR_NAMES:{AUTH:"Auth"},AUTH_CONNECTOR_SUPPORTED_CHAINS:["eip155","solana"],CHAIN:{EVM:"eip155",SOLANA:"solana",POLKADOT:"polkadot",BITCOIN:"bip122"},CHAIN_NAME_MAP:{eip155:"EVM Networks",solana:"Solana",polkadot:"Polkadot",bip122:"Bitcoin"},USDT_CONTRACT_ADDRESSES:["0xdac17f958d2ee523a2206206994597c13d831ec7","0xc2132d05d31c914a87c6611c10748aeb04b58e8f","0x9702230a8ea53601f5cd2dc00fdbc13d4df4a8c7","0x919C1c267BC06a7039e03fcc2eF738525769109c","0x48065fbBE25f71C9282ddf5e1cD6D6A887483D5e","0x55d398326f99059fF775485246999027B3197955","0xfd086bc7cd5c481dcc9c85ebe478a1c0b69fcbb9"],HTTP_STATUS_CODES:{SERVICE_UNAVAILABLE:503,FORBIDDEN:403},UNSUPPORTED_NETWORK_NAME:"Unknown Network"},ed={getERC20Abi:e=>ec.USDT_CONTRACT_ADDRESSES.includes(e)?el:es},eu={validateCaipAddress(e){if(e.split(":")?.length!==3)throw Error("Invalid CAIP Address");return e},parseCaipAddress(e){let t=e.split(":");if(3!==t.length)throw Error(`Invalid CAIP-10 address: ${e}`);let[r,i,a]=t;if(!r||!i||!a)throw Error(`Invalid CAIP-10 address: ${e}`);return{chainNamespace:r,chainId:i,address:a}},parseCaipNetworkId(e){let t=e.split(":");if(2!==t.length)throw Error(`Invalid CAIP-2 network id: ${e}`);let[r,i]=t;if(!r||!i)throw Error(`Invalid CAIP-2 network id: ${e}`);return{chainNamespace:r,chainId:i}}},eh={ACTIVE_CAIP_NETWORK_ID:"@appkit/active_caip_network_id",CONNECTED_SOCIAL:"@appkit/connected_social",CONNECTED_SOCIAL_USERNAME:"@appkit-wallet/SOCIAL_USERNAME",RECENT_WALLETS:"@appkit/recent_wallets",DEEPLINK_CHOICE:"WALLETCONNECT_DEEPLINK_CHOICE",ACTIVE_NAMESPACE:"@appkit/active_namespace",CONNECTED_NAMESPACES:"@appkit/connected_namespaces",CONNECTION_STATUS:"@appkit/connection_status",TELEGRAM_SOCIAL_PROVIDER:"@appkit/social_provider",NATIVE_BALANCE_CACHE:"@appkit/native_balance_cache",PORTFOLIO_CACHE:"@appkit/portfolio_cache",ENS_CACHE:"@appkit/ens_cache",IDENTITY_CACHE:"@appkit/identity_cache",PREFERRED_ACCOUNT_TYPES:"@appkit/preferred_account_types"};function ep(e){if(!e)throw Error("Namespace is required for CONNECTED_CONNECTOR_ID");return`@appkit/${e}:connected_connector_id`}let eg={setItem(e,t){ef()&&void 0!==t&&localStorage.setItem(e,t)},getItem(e){if(ef())return localStorage.getItem(e)||void 0},removeItem(e){ef()&&localStorage.removeItem(e)},clear(){ef()&&localStorage.clear()}};function ef(){return"u">typeof window&&"u">typeof localStorage}function ew(e,t){return"light"===t?{"--w3m-accent":e?.["--w3m-accent"]||"hsla(231, 100%, 70%, 1)","--w3m-background":"#fff"}:{"--w3m-accent":e?.["--w3m-accent"]||"hsla(230, 100%, 67%, 1)","--w3m-background":"#121313"}}let em=Symbol(),ev=Object.getPrototypeOf,eb=new WeakMap,ey=e=>e&&(eb.has(e)?eb.get(e):ev(e)===Object.prototype||ev(e)===Array.prototype),eC=e=>ey(e)&&e[em]||null,ex=(e,t=!0)=>{eb.set(e,t)},eE=e=>"object"==typeof e&&null!==e,ek=new WeakMap,eA=new WeakSet,[eN]=((e=Object.is,t=(e,t)=>new Proxy(e,t),r=e=>eE(e)&&!eA.has(e)&&(Array.isArray(e)||!(Symbol.iterator in e))&&!(e instanceof WeakMap)&&!(e instanceof WeakSet)&&!(e instanceof Error)&&!(e instanceof Number)&&!(e instanceof Date)&&!(e instanceof String)&&!(e instanceof RegExp)&&!(e instanceof ArrayBuffer),i=e=>{switch(e.status){case"fulfilled":return e.value;case"rejected":throw e.reason;default:throw e}},a=new WeakMap,o=(e,t,r=i)=>{let n=a.get(e);if(n?.[0]===t)return n[1];let s=Array.isArray(e)?[]:Object.create(Object.getPrototypeOf(e));return ex(s,!0),a.set(e,[t,s]),Reflect.ownKeys(e).forEach(t=>{if(Object.getOwnPropertyDescriptor(s,t))return;let i=Reflect.get(e,t),{enumerable:a}=Reflect.getOwnPropertyDescriptor(e,t),n={value:i,enumerable:a,configurable:!0};if(eA.has(i))ex(i,!1);else if(i instanceof Promise)delete n.value,n.get=()=>r(i);else if(ek.has(i)){let[e,t]=ek.get(i);n.value=o(e,t(),r)}Object.defineProperty(s,t,n)}),Object.preventExtensions(s)},n=new WeakMap,s=[1,1],l=i=>{if(!eE(i))throw Error("object required");let a=n.get(i);if(a)return a;let c=s[0],d=new Set,u=(e,t=++s[0])=>{c!==t&&(c=t,d.forEach(r=>r(e,t)))},h=s[1],p=(e=++s[1])=>(h===e||d.size||(h=e,f.forEach(([t])=>{let r=t[1](e);r>c&&(c=r)})),c),g=e=>(t,r)=>{let i=[...t];i[1]=[e,...i[1]],u(i,r)},f=new Map,w=(e,t)=>{if(f.has(e))throw Error("prop listener already exists");if(d.size){let r=t[3](g(e));f.set(e,[t,r])}else f.set(e,[t])},m=e=>{var t;let r=f.get(e);r&&(f.delete(e),null==(t=r[1])||t.call(r))},v=e=>(d.add(e),1===d.size&&f.forEach(([e,t],r)=>{if(t)throw Error("remove already exists");let i=e[3](g(r));f.set(r,[e,i])}),()=>{d.delete(e),0===d.size&&f.forEach(([e,t],r)=>{t&&(t(),f.set(r,[e]))})}),b=Array.isArray(i)?[]:Object.create(Object.getPrototypeOf(i)),y=t(b,{deleteProperty(e,t){let r=Reflect.get(e,t);m(t);let i=Reflect.deleteProperty(e,t);return i&&u(["delete",[t],r]),i},set(t,i,a,o){let s=Reflect.has(t,i),c=Reflect.get(t,i,o);if(s&&(e(c,a)||n.has(a)&&e(c,n.get(a))))return!0;m(i),eE(a)&&(a=eC(a)||a);let d=a;if(a instanceof Promise)a.then(e=>{a.status="fulfilled",a.value=e,u(["resolve",[i],e])}).catch(e=>{a.status="rejected",a.reason=e,u(["reject",[i],e])});else{!ek.has(a)&&r(a)&&(d=l(a));let e=!eA.has(d)&&ek.get(d);e&&w(i,e)}return Reflect.set(t,i,d,o),u(["set",[i],a,c]),!0}});n.set(i,y);let C=[b,p,o,v];return ek.set(y,C),Reflect.ownKeys(i).forEach(e=>{let t=Object.getOwnPropertyDescriptor(i,e);"value"in t&&(y[e]=i[e],delete t.value,delete t.writable),Object.defineProperty(b,e,t)}),y})=>[l,ek,eA,e,t,r,i,a,o,n,s])();function eI(e={}){return eN(e)}function eS(e,t,r){let i;let a=ek.get(e);a||console.warn("Please use proxy object");let o=[],n=a[3],s=!1,l=n(e=>{if(o.push(e),r){t(o.splice(0));return}i||(i=Promise.resolve().then(()=>{i=void 0,s&&t(o.splice(0))}))});return s=!0,()=>{s=!1,l()}}function e_(e,t){let r=ek.get(e);r||console.warn("Please use proxy object");let[i,a,o]=r;return o(i,a(),t)}function eT(e){return eA.add(e),e}function eO(e,t,r,i){let a=e[t];return eS(e,()=>{let i=e[t];Object.is(a,i)||r(a=i)},i)}let eP=("u">typeof y&&"u">typeof y.env?y.env.NEXT_PUBLIC_SECURE_SITE_ORIGIN:void 0)||"https://secure.walletconnect.org",eR={FOUR_MINUTES_MS:24e4,TEN_SEC_MS:1e4,FIVE_SEC_MS:5e3,THREE_SEC_MS:3e3,ONE_SEC_MS:1e3,SECURE_SITE:eP,SECURE_SITE_DASHBOARD:`${eP}/dashboard`,SECURE_SITE_FAVICON:`${eP}/images/favicon.png`,RESTRICTED_TIMEZONES:["ASIA/SHANGHAI","ASIA/URUMQI","ASIA/CHONGQING","ASIA/HARBIN","ASIA/KASHGAR","ASIA/MACAU","ASIA/HONG_KONG","ASIA/MACAO","ASIA/BEIJING","ASIA/HARBIN"],WC_COINBASE_PAY_SDK_CHAINS:["ethereum","arbitrum","polygon","berachain","avalanche-c-chain","optimism","celo","base"],WC_COINBASE_PAY_SDK_FALLBACK_CHAIN:"ethereum",WC_COINBASE_PAY_SDK_CHAIN_NAME_MAP:{Ethereum:"ethereum","Arbitrum One":"arbitrum",Polygon:"polygon",Berachain:"berachain",Avalanche:"avalanche-c-chain","OP Mainnet":"optimism",Celo:"celo",Base:"base"},WC_COINBASE_ONRAMP_APP_ID:"bf18c88d-495a-463b-b249-0b9d3656cf5e",SWAP_SUGGESTED_TOKENS:["ETH","UNI","1INCH","AAVE","SOL","ADA","AVAX","DOT","LINK","NITRO","GAIA","MILK","TRX","NEAR","GNO","WBTC","DAI","WETH","USDC","USDT","ARB","BAL","BICO","CRV","ENS","MATIC","OP"],SWAP_POPULAR_TOKENS:["ETH","UNI","1INCH","AAVE","SOL","ADA","AVAX","DOT","LINK","NITRO","GAIA","MILK","TRX","NEAR","GNO","WBTC","DAI","WETH","USDC","USDT","ARB","BAL","BICO","CRV","ENS","MATIC","OP","METAL","DAI","CHAMP","WOLF","SALE","BAL","BUSD","MUST","BTCpx","ROUTE","HEX","WELT","amDAI","VSQ","VISION","AURUM","pSP","SNX","VC","LINK","CHP","amUSDT","SPHERE","FOX","GIDDY","GFC","OMEN","OX_OLD","DE","WNT"],BALANCE_SUPPORTED_CHAINS:["eip155","solana"],SWAP_SUPPORTED_NETWORKS:["eip155:1","eip155:42161","eip155:10","eip155:324","eip155:8453","eip155:56","eip155:137","eip155:100","eip155:43114","eip155:250","eip155:8217","eip155:1313161554"],NAMES_SUPPORTED_CHAIN_NAMESPACES:["eip155"],ONRAMP_SUPPORTED_CHAIN_NAMESPACES:["eip155","solana"],ACTIVITY_ENABLED_CHAIN_NAMESPACES:["eip155"],NATIVE_TOKEN_ADDRESS:{eip155:"0xeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee",solana:"So11111111111111111111111111111111111111111",polkadot:"0x",bip122:"0x"},CONVERT_SLIPPAGE_TOLERANCE:1,CONNECT_LABELS:{MOBILE:"Open and continue in a new browser tab"},DEFAULT_FEATURES:{swaps:!0,onramp:!0,receive:!0,send:!0,email:!0,emailShowWallets:!0,socials:["google","x","discord","farcaster","github","apple","facebook"],connectorTypeOrder:["walletConnect","recent","injected","featured","custom","external","recommended"],history:!0,analytics:!0,allWallets:!0,legalCheckbox:!1,smartSessions:!1,collapseWallets:!1,walletFeaturesOrder:["onramp","swaps","receive","send"],connectMethodsOrder:void 0},DEFAULT_ACCOUNT_TYPES:{bip122:"payment",eip155:"smartAccount",polkadot:"eoa",solana:"eoa"},ADAPTER_TYPES:{UNIVERSAL:"universal",SOLANA:"solana",WAGMI:"wagmi",ETHERS:"ethers",ETHERS5:"ethers5",BITCOIN:"bitcoin"}},e$={cacheExpiry:{portfolio:3e4,nativeBalance:3e4,ens:3e5,identity:3e5},isCacheExpired:(e,t)=>Date.now()-e>t,getActiveNetworkProps(){let e=e$.getActiveNamespace(),t=e$.getActiveCaipNetworkId(),r=t?t.split(":")[1]:void 0;return{namespace:e,caipNetworkId:t,chainId:r?isNaN(Number(r))?r:Number(r):void 0}},setWalletConnectDeepLink({name:e,href:t}){try{eg.setItem(eh.DEEPLINK_CHOICE,JSON.stringify({href:t,name:e}))}catch{console.info("Unable to set WalletConnect deep link")}},getWalletConnectDeepLink(){try{let e=eg.getItem(eh.DEEPLINK_CHOICE);if(e)return JSON.parse(e)}catch{console.info("Unable to get WalletConnect deep link")}},deleteWalletConnectDeepLink(){try{eg.removeItem(eh.DEEPLINK_CHOICE)}catch{console.info("Unable to delete WalletConnect deep link")}},setActiveNamespace(e){try{eg.setItem(eh.ACTIVE_NAMESPACE,e)}catch{console.info("Unable to set active namespace")}},setActiveCaipNetworkId(e){try{eg.setItem(eh.ACTIVE_CAIP_NETWORK_ID,e),e$.setActiveNamespace(e.split(":")[0])}catch{console.info("Unable to set active caip network id")}},getActiveCaipNetworkId(){try{return eg.getItem(eh.ACTIVE_CAIP_NETWORK_ID)}catch{console.info("Unable to get active caip network id");return}},deleteActiveCaipNetworkId(){try{eg.removeItem(eh.ACTIVE_CAIP_NETWORK_ID)}catch{console.info("Unable to delete active caip network id")}},deleteConnectedConnectorId(e){try{let t=ep(e);eg.removeItem(t)}catch{console.info("Unable to delete connected connector id")}},setAppKitRecent(e){try{let t=e$.getRecentWallets();t.find(t=>t.id===e.id)||(t.unshift(e),t.length>2&&t.pop(),eg.setItem(eh.RECENT_WALLETS,JSON.stringify(t)))}catch{console.info("Unable to set AppKit recent")}},getRecentWallets(){try{let e=eg.getItem(eh.RECENT_WALLETS);return e?JSON.parse(e):[]}catch{console.info("Unable to get AppKit recent")}return[]},setConnectedConnectorId(e,t){try{let r=ep(e);eg.setItem(r,t)}catch{console.info("Unable to set Connected Connector Id")}},getActiveNamespace(){try{return eg.getItem(eh.ACTIVE_NAMESPACE)}catch{console.info("Unable to get active namespace")}},getConnectedConnectorId(e){if(e)try{let t=ep(e);return eg.getItem(t)}catch{console.info("Unable to get connected connector id in namespace ",e)}},setConnectedSocialProvider(e){try{eg.setItem(eh.CONNECTED_SOCIAL,e)}catch{console.info("Unable to set connected social provider")}},getConnectedSocialProvider(){try{return eg.getItem(eh.CONNECTED_SOCIAL)}catch{console.info("Unable to get connected social provider")}},deleteConnectedSocialProvider(){try{eg.removeItem(eh.CONNECTED_SOCIAL)}catch{console.info("Unable to delete connected social provider")}},getConnectedSocialUsername(){try{return eg.getItem(eh.CONNECTED_SOCIAL_USERNAME)}catch{console.info("Unable to get connected social username")}},getStoredActiveCaipNetworkId:()=>eg.getItem(eh.ACTIVE_CAIP_NETWORK_ID)?.split(":")?.[1],setConnectionStatus(e){try{eg.setItem(eh.CONNECTION_STATUS,e)}catch{console.info("Unable to set connection status")}},getConnectionStatus(){try{return eg.getItem(eh.CONNECTION_STATUS)}catch{return}},getConnectedNamespaces(){try{let e=eg.getItem(eh.CONNECTED_NAMESPACES);return e?.length?e.split(","):[]}catch{return[]}},setConnectedNamespaces(e){try{let t=Array.from(new Set(e));eg.setItem(eh.CONNECTED_NAMESPACES,t.join(","))}catch{console.info("Unable to set namespaces in storage")}},addConnectedNamespace(e){try{let t=e$.getConnectedNamespaces();t.includes(e)||(t.push(e),e$.setConnectedNamespaces(t))}catch{console.info("Unable to add connected namespace")}},removeConnectedNamespace(e){try{let t=e$.getConnectedNamespaces(),r=t.indexOf(e);r>-1&&(t.splice(r,1),e$.setConnectedNamespaces(t))}catch{console.info("Unable to remove connected namespace")}},getTelegramSocialProvider(){try{return eg.getItem(eh.TELEGRAM_SOCIAL_PROVIDER)}catch{return console.info("Unable to get telegram social provider"),null}},setTelegramSocialProvider(e){try{eg.setItem(eh.TELEGRAM_SOCIAL_PROVIDER,e)}catch{console.info("Unable to set telegram social provider")}},removeTelegramSocialProvider(){try{eg.removeItem(eh.TELEGRAM_SOCIAL_PROVIDER)}catch{console.info("Unable to remove telegram social provider")}},getBalanceCache(){let e={};try{let t=eg.getItem(eh.PORTFOLIO_CACHE);e=t?JSON.parse(t):{}}catch{console.info("Unable to get balance cache")}return e},removeAddressFromBalanceCache(e){try{let t=e$.getBalanceCache();eg.setItem(eh.PORTFOLIO_CACHE,JSON.stringify({...t,[e]:void 0}))}catch{console.info("Unable to remove address from balance cache",e)}},getBalanceCacheForCaipAddress(e){try{let t=e$.getBalanceCache()[e];if(t&&!this.isCacheExpired(t.timestamp,this.cacheExpiry.portfolio))return t.balance;e$.removeAddressFromBalanceCache(e)}catch{console.info("Unable to get balance cache for address",e)}},updateBalanceCache(e){try{let t=e$.getBalanceCache();t[e.caipAddress]=e,eg.setItem(eh.PORTFOLIO_CACHE,JSON.stringify(t))}catch{console.info("Unable to update balance cache",e)}},getNativeBalanceCache(){let e={};try{let t=eg.getItem(eh.NATIVE_BALANCE_CACHE);e=t?JSON.parse(t):{}}catch{console.info("Unable to get balance cache")}return e},removeAddressFromNativeBalanceCache(e){try{let t=e$.getBalanceCache();eg.setItem(eh.NATIVE_BALANCE_CACHE,JSON.stringify({...t,[e]:void 0}))}catch{console.info("Unable to remove address from balance cache",e)}},getNativeBalanceCacheForCaipAddress(e){try{let t=e$.getNativeBalanceCache()[e];if(t&&!this.isCacheExpired(t.timestamp,this.cacheExpiry.nativeBalance))return t;console.info("Discarding cache for address",e),e$.removeAddressFromBalanceCache(e)}catch{console.info("Unable to get balance cache for address",e)}},updateNativeBalanceCache(e){try{let t=e$.getNativeBalanceCache();t[e.caipAddress]=e,eg.setItem(eh.NATIVE_BALANCE_CACHE,JSON.stringify(t))}catch{console.info("Unable to update balance cache",e)}},getEnsCache(){let e={};try{let t=eg.getItem(eh.ENS_CACHE);e=t?JSON.parse(t):{}}catch{console.info("Unable to get ens name cache")}return e},getEnsFromCacheForAddress(e){try{let t=e$.getEnsCache()[e];if(t&&!this.isCacheExpired(t.timestamp,this.cacheExpiry.ens))return t.ens;e$.removeEnsFromCache(e)}catch{console.info("Unable to get ens name from cache",e)}},updateEnsCache(e){try{let t=e$.getEnsCache();t[e.address]=e,eg.setItem(eh.ENS_CACHE,JSON.stringify(t))}catch{console.info("Unable to update ens name cache",e)}},removeEnsFromCache(e){try{let t=e$.getEnsCache();eg.setItem(eh.ENS_CACHE,JSON.stringify({...t,[e]:void 0}))}catch{console.info("Unable to remove ens name from cache",e)}},getIdentityCache(){let e={};try{let t=eg.getItem(eh.IDENTITY_CACHE);e=t?JSON.parse(t):{}}catch{console.info("Unable to get identity cache")}return e},getIdentityFromCacheForAddress(e){try{let t=e$.getIdentityCache()[e];if(t&&!this.isCacheExpired(t.timestamp,this.cacheExpiry.identity))return t.identity;e$.removeIdentityFromCache(e)}catch{console.info("Unable to get identity from cache",e)}},updateIdentityCache(e){try{let t=e$.getIdentityCache();t[e.address]={identity:e.identity,timestamp:e.timestamp},eg.setItem(eh.IDENTITY_CACHE,JSON.stringify(t))}catch{console.info("Unable to update identity cache",e)}},removeIdentityFromCache(e){try{let t=e$.getIdentityCache();eg.setItem(eh.IDENTITY_CACHE,JSON.stringify({...t,[e]:void 0}))}catch{console.info("Unable to remove identity from cache",e)}},clearAddressCache(){try{eg.removeItem(eh.PORTFOLIO_CACHE),eg.removeItem(eh.NATIVE_BALANCE_CACHE),eg.removeItem(eh.ENS_CACHE),eg.removeItem(eh.IDENTITY_CACHE)}catch{console.info("Unable to clear address cache")}},setPreferredAccountTypes(e){try{eg.setItem(eh.PREFERRED_ACCOUNT_TYPES,JSON.stringify(e))}catch{console.info("Unable to set preferred account types",e)}},getPreferredAccountTypes(){try{let e=eg.getItem(eh.PREFERRED_ACCOUNT_TYPES);return JSON.parse(e)}catch{console.info("Unable to get preferred account types")}}},eL={isMobile(){return!!this.isClient()&&!!(window?.matchMedia("(pointer:coarse)")?.matches||/Android|webOS|iPhone|iPad|iPod|BlackBerry|Opera Mini/u.test(navigator.userAgent))},checkCaipNetwork:(e,t="")=>e?.caipNetworkId.toLocaleLowerCase().includes(t.toLowerCase()),isAndroid(){if(!this.isMobile())return!1;let e=window?.navigator.userAgent.toLowerCase();return eL.isMobile()&&e.includes("android")},isIos(){if(!this.isMobile())return!1;let e=window?.navigator.userAgent.toLowerCase();return e.includes("iphone")||e.includes("ipad")},isSafari(){return!!this.isClient()&&(window?.navigator.userAgent.toLowerCase()).includes("safari")},isClient:()=>"u">typeof window,isPairingExpired:e=>!e||e-Date.now()<=eR.TEN_SEC_MS,isAllowedRetry:(e,t=eR.ONE_SEC_MS)=>Date.now()-e>=t,copyToClopboard(e){navigator.clipboard.writeText(e)},isIframe(){try{return window?.self!==window?.top}catch{return!1}},getPairingExpiry:()=>Date.now()+eR.FOUR_MINUTES_MS,getNetworkId:e=>e?.split(":")[1],getPlainAddress:e=>e?.split(":")[2],wait:async e=>new Promise(t=>{setTimeout(t,e)}),debounce(e,t=500){let r;return(...i)=>{r&&clearTimeout(r),r=setTimeout(function(){e(...i)},t)}},isHttpUrl:e=>e.startsWith("http://")||e.startsWith("https://"),formatNativeUrl(e,t){if(eL.isHttpUrl(e))return this.formatUniversalUrl(e,t);let r=e;r.includes("://")||(r=e.replaceAll("/","").replaceAll(":",""),r=`${r}://`),r.endsWith("/")||(r=`${r}/`),this.isTelegram()&&this.isAndroid()&&(t=encodeURIComponent(t));let i=encodeURIComponent(t);return{redirect:`${r}wc?uri=${i}`,href:r}},formatUniversalUrl(e,t){if(!eL.isHttpUrl(e))return this.formatNativeUrl(e,t);let r=e;r.endsWith("/")||(r=`${r}/`);let i=encodeURIComponent(t);return{redirect:`${r}wc?uri=${i}`,href:r}},getOpenTargetForPlatform(e){return"popupWindow"===e?e:this.isTelegram()?e$.getTelegramSocialProvider()?"_top":"_blank":e},openHref(e,t,r){window?.open(e,this.getOpenTargetForPlatform(t),r||"noreferrer noopener")},returnOpenHref(e,t,r){return window?.open(e,this.getOpenTargetForPlatform(t),r||"noreferrer noopener")},isTelegram:()=>"u">typeof window&&(!!window.TelegramWebviewProxy||!!window.Telegram||!!window.TelegramWebviewProxyProto),preloadImage:async e=>Promise.race([new Promise((t,r)=>{let i=new Image;i.onload=t,i.onerror=r,i.crossOrigin="anonymous",i.src=e}),eL.wait(2e3)]),formatBalance(e,t){let r="0.000";if("string"==typeof e){let t=Number(e);if(t){let e=Math.floor(1e3*t)/1e3;e&&(r=e.toString())}}return`${r}${t?` ${t}`:""}`},formatBalance2(e,t){let r;if("0"===e)r="0";else if("string"==typeof e){let t=Number(e);t&&(r=t.toString().match(/^-?\d+(?:\.\d{0,3})?/u)?.[0])}return{value:r??"0",rest:"0"===r?"000":"",symbol:t}},getApiUrl:()=>ec.W3M_API_URL,getBlockchainApiUrl:()=>ec.BLOCKCHAIN_API_RPC_URL,getAnalyticsUrl:()=>ec.PULSE_API_URL,getUUID:()=>crypto?.randomUUID?crypto.randomUUID():"xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/gu,e=>{let t=16*Math.random()|0;return("x"===e?t:3&t|8).toString(16)}),parseError:e=>"string"==typeof e?e:"string"==typeof e?.issues?.[0]?.message?e.issues[0].message:e instanceof Error?e.message:"Unknown error",sortRequestedNetworks(e,t=[]){let r={};return t&&e&&(e.forEach((e,t)=>{r[e]=t}),t.sort((e,t)=>{let i=r[e.id],a=r[t.id];return void 0!==i&&void 0!==a?i-a:void 0!==i?-1:void 0!==a?1:0})),t},calculateBalance(e){let t=0;for(let r of e)t+=r.value??0;return t},formatTokenBalance(e){let[t,r]=e.toFixed(2).split(".");return{dollars:t,pennies:r}},isAddress(e,t="eip155"){switch(t){case"eip155":if(/^(?:0x)?[0-9a-f]{40}$/iu.test(e)&&(/^(?:0x)?[0-9a-f]{40}$/iu.test(e)||/^(?:0x)?[0-9A-F]{40}$/iu.test(e)))return!0;return!1;case"solana":return/[1-9A-HJ-NP-Za-km-z]{32,44}$/iu.test(e);default:return!1}},uniqueBy(e,t){let r=new Set;return e.filter(e=>{let i=e[t];return!r.has(i)&&(r.add(i),!0)})},generateSdkVersion(e,t,r){let i=0===e.length?eR.ADAPTER_TYPES.UNIVERSAL:e.map(e=>e.adapterType).join(",");return`${t}-${i}-${r}`},createAccount:(e,t,r,i,a)=>({namespace:e,address:t,type:r,publicKey:i,path:a}),isCaipAddress(e){if("string"!=typeof e)return!1;let t=e.split(":"),r=t[0];return 3===t.filter(Boolean).length&&r in ec.CHAIN_NAME_MAP},isMac(){let e=window?.navigator.userAgent.toLowerCase();return e.includes("macintosh")&&!e.includes("safari")},formatTelegramSocialLoginUrl(e){let t=`--${encodeURIComponent(window?.location.href)}`,r="state=";if("auth.magic.link"===new URL(e).host){let i="provider_authorization_url=",a=e.substring(e.indexOf(i)+i.length),o=this.injectIntoUrl(decodeURIComponent(a),r,t);return e.replace(a,encodeURIComponent(o))}return this.injectIntoUrl(e,r,t)},injectIntoUrl(e,t,r){let i=e.indexOf(t);if(-1===i)throw Error(`${t} parameter not found in the URL: ${e}`);let a=e.indexOf("&",i),o=t.length,n=-1!==a?a:e.length;return e.substring(0,i+o)+(e.substring(i+o,n)+r)+e.substring(a)}};async function eB(...e){let t=await fetch(...e);if(!t.ok)throw Error(`HTTP status code: ${t.status}`,{cause:t});return t}class eM{constructor({baseUrl:e,clientId:t}){this.baseUrl=e,this.clientId=t}async get({headers:e,signal:t,cache:r,...i}){let a=this.createUrl(i);return(await eB(a,{method:"GET",headers:e,signal:t,cache:r})).json()}async getBlob({headers:e,signal:t,...r}){let i=this.createUrl(r);return(await eB(i,{method:"GET",headers:e,signal:t})).blob()}async post({body:e,headers:t,signal:r,...i}){let a=this.createUrl(i);return(await eB(a,{method:"POST",headers:t,body:e?JSON.stringify(e):void 0,signal:r})).json()}async put({body:e,headers:t,signal:r,...i}){let a=this.createUrl(i);return(await eB(a,{method:"PUT",headers:t,body:e?JSON.stringify(e):void 0,signal:r})).json()}async delete({body:e,headers:t,signal:r,...i}){let a=this.createUrl(i);return(await eB(a,{method:"DELETE",headers:t,body:e?JSON.stringify(e):void 0,signal:r})).json()}createUrl({path:e,params:t}){let r=new URL(e,this.baseUrl);return t&&Object.entries(t).forEach(([e,t])=>{t&&r.searchParams.append(e,t)}),this.clientId&&r.searchParams.append("clientId",this.clientId),r}}let eU={handleSolanaDeeplinkRedirect(e){if(oS.state.activeChain===ec.CHAIN.SOLANA){let t=window.location.href,r=encodeURIComponent(t);if("Phantom"===e&&!("phantom"in window)){let e=t.startsWith("https")?"https":"http",i=t.split("/")[2],a=encodeURIComponent(`${e}://${i}`);window.location.href=`https://phantom.app/ul/browse/${r}?ref=${a}`}"Coinbase Wallet"!==e||"coinbaseSolana"in window||(window.location.href=`https://go.cb-w.com/dapp?cb_url=${r}`)}}},ez=eI({walletImages:{},networkImages:{},chainImages:{},connectorImages:{},tokenImages:{},currencyImages:{}}),eD={state:ez,subscribeNetworkImages:e=>eS(ez.networkImages,()=>e(ez.networkImages)),subscribeKey:(e,t)=>eO(ez,e,t),subscribe:e=>eS(ez,()=>e(ez)),setWalletImage(e,t){ez.walletImages[e]=t},setNetworkImage(e,t){ez.networkImages[e]=t},setChainImage(e,t){ez.chainImages[e]=t},setConnectorImage(e,t){ez.connectorImages={...ez.connectorImages,[e]:t}},setTokenImage(e,t){ez.tokenImages[e]=t},setCurrencyImage(e,t){ez.currencyImages[e]=t}},ej={eip155:"ba0ba0cd-17c6-4806-ad93-f9d174f17900",solana:"a1b58899-f671-4276-6a5e-56ca5bd59700",polkadot:"",bip122:"0b4838db-0161-4ffe-022d-532bf03dba00"},eW=eI({networkImagePromises:{}}),eH={async fetchWalletImage(e){if(e)return await e2._fetchWalletImage(e),this.getWalletImageById(e)},async fetchNetworkImage(e){if(e)return this.getNetworkImageById(e)||(eW.networkImagePromises[e]||(eW.networkImagePromises[e]=e2._fetchNetworkImage(e)),await eW.networkImagePromises[e],this.getNetworkImageById(e))},getWalletImageById(e){if(e)return eD.state.walletImages[e]},getWalletImage:e=>e?.image_url?e?.image_url:e?.image_id?eD.state.walletImages[e.image_id]:void 0,getNetworkImage:e=>e?.assets?.imageUrl?e?.assets?.imageUrl:e?.assets?.imageId?eD.state.networkImages[e.assets.imageId]:void 0,getNetworkImageById(e){if(e)return eD.state.networkImages[e]},getConnectorImage:e=>e?.imageUrl?e.imageUrl:e?.imageId?eD.state.connectorImages[e.imageId]:void 0,getChainImage:e=>eD.state.networkImages[ej[e]]},eF={getFeatureValue(e,t){let r=t?.[e];return void 0===r?eR.DEFAULT_FEATURES[e]:r},filterSocialsByPlatform(e){if(!e||!e.length)return e;if(eL.isTelegram()){if(eL.isIos())return e.filter(e=>"google"!==e);if(eL.isMac())return e.filter(e=>"x"!==e);if(eL.isAndroid())return e.filter(e=>!["facebook","x"].includes(e))}return e}},eV=eI({features:eR.DEFAULT_FEATURES,projectId:"",sdkType:"appkit",sdkVersion:"html-wagmi-undefined",defaultAccountTypes:{solana:"eoa",bip122:"payment",polkadot:"eoa",eip155:"smartAccount"},enableNetworkSwitch:!0}),eZ={state:eV,subscribeKey:(e,t)=>eO(eV,e,t),setOptions(e){Object.assign(eV,e)},setFeatures(e){if(!e)return;eV.features||(eV.features=eR.DEFAULT_FEATURES);let t={...eV.features,...e};eV.features=t,eV.features.socials&&(eV.features.socials=eF.filterSocialsByPlatform(eV.features.socials))},setProjectId(e){eV.projectId=e},setCustomRpcUrls(e){eV.customRpcUrls=e},setAllWallets(e){eV.allWallets=e},setIncludeWalletIds(e){eV.includeWalletIds=e},setExcludeWalletIds(e){eV.excludeWalletIds=e},setFeaturedWalletIds(e){eV.featuredWalletIds=e},setTokens(e){eV.tokens=e},setTermsConditionsUrl(e){eV.termsConditionsUrl=e},setPrivacyPolicyUrl(e){eV.privacyPolicyUrl=e},setCustomWallets(e){eV.customWallets=e},setIsSiweEnabled(e){eV.isSiweEnabled=e},setIsUniversalProvider(e){eV.isUniversalProvider=e},setSdkVersion(e){eV.sdkVersion=e},setMetadata(e){eV.metadata=e},setDisableAppend(e){eV.disableAppend=e},setEIP6963Enabled(e){eV.enableEIP6963=e},setDebug(e){eV.debug=e},setEnableWalletConnect(e){eV.enableWalletConnect=e},setEnableWalletGuide(e){eV.enableWalletGuide=e},setEnableAuthLogger(e){eV.enableAuthLogger=e},setEnableWallets(e){eV.enableWallets=e},setHasMultipleAddresses(e){eV.hasMultipleAddresses=e},setSIWX(e){eV.siwx=e},setConnectMethodsOrder(e){eV.features={...eV.features,connectMethodsOrder:e}},setWalletFeaturesOrder(e){eV.features={...eV.features,walletFeaturesOrder:e}},setSocialsOrder(e){eV.features={...eV.features,socials:e}},setCollapseWallets(e){eV.features={...eV.features,collapseWallets:e}},setEnableEmbedded(e){eV.enableEmbedded=e},setAllowUnsupportedChain(e){eV.allowUnsupportedChain=e},setManualWCControl(e){eV.manualWCControl=e},setEnableNetworkSwitch(e){eV.enableNetworkSwitch=e},setDefaultAccountTypes(e={}){Object.entries(e).forEach(([e,t])=>{t&&(eV.defaultAccountTypes[e]=t)})},setUniversalProviderConfigOverride(e){eV.universalProviderConfigOverride=e},getUniversalProviderConfigOverride:()=>eV.universalProviderConfigOverride,getSnapshot:()=>e_(eV)},eq=eI({message:"",variant:"info",open:!1}),eG={state:eq,subscribeKey:(e,t)=>eO(eq,e,t),open(e,t){let{debug:r}=eZ.state,{shortMessage:i,longMessage:a}=e;r&&(eq.message=i,eq.variant=t,eq.open=!0),a&&console.error("function"==typeof a?a():a)},close(){eq.open=!1,eq.message="",eq.variant="info"}},eK=new eM({baseUrl:eL.getAnalyticsUrl(),clientId:null}),eY=["MODAL_CREATED"],eX=eI({timestamp:Date.now(),reportedErrors:{},data:{type:"track",event:"MODAL_CREATED"}}),eJ={state:eX,subscribe:e=>eS(eX,()=>e(eX)),getSdkProperties(){let{projectId:e,sdkType:t,sdkVersion:r}=eZ.state;return{projectId:e,st:t,sv:r||"html-wagmi-4.2.2"}},async _sendAnalyticsEvent(e){try{let t=o$.state.address;if(eY.includes(e.data.event)||typeof window>"u")return;await eK.post({path:"/e",params:eJ.getSdkProperties(),body:{eventId:eL.getUUID(),url:window.location.href,domain:window.location.hostname,timestamp:e.timestamp,props:{...e.data,address:t}}}),eX.reportedErrors.FORBIDDEN=!1}catch(e){e instanceof Error&&e.cause instanceof Response&&e.cause.status===ec.HTTP_STATUS_CODES.FORBIDDEN&&!eX.reportedErrors.FORBIDDEN&&(eG.open({shortMessage:"Invalid App Configuration",longMessage:`Origin ${ef()?window.origin:"uknown"} not found on Allowlist - update configuration on cloud.reown.com`},"error"),eX.reportedErrors.FORBIDDEN=!0)}},sendEvent(e){eX.timestamp=Date.now(),eX.data=e,eZ.state.features?.analytics&&eJ._sendAnalyticsEvent(eX)}},eQ=["1ca0bdd4747578705b1939af023d120677c64fe6ca76add81fda36e350605e79","fd20dc426fb37566d803205b19bbc1d4096b248ac04548e3cfb6b3a38bd033aa","a797aa35c0fadbfc1a53e7f675162ed5226968b44a19ee3d24385c64d1d3c393"],e0=new eM({baseUrl:eL.getApiUrl(),clientId:null}),e1=eI({promises:{},page:1,count:0,featured:[],allFeatured:[],recommended:[],allRecommended:[],wallets:[],search:[],isAnalyticsEnabled:!1,excludedWallets:[],isFetchingRecommendedWallets:!1}),e2={state:e1,subscribeKey:(e,t)=>eO(e1,e,t),_getSdkProperties(){let{projectId:e,sdkType:t,sdkVersion:r}=eZ.state;return{projectId:e,st:t||"appkit",sv:r||"html-wagmi-4.2.2"}},_filterOutExtensions:e=>eZ.state.isUniversalProvider?e.filter(e=>!!(e.mobile_link||e.desktop_link||e.webapp_link)):e,async _fetchWalletImage(e){let t=`${e0.baseUrl}/getWalletImage/${e}`,r=await e0.getBlob({path:t,params:e2._getSdkProperties()});eD.setWalletImage(e,URL.createObjectURL(r))},async _fetchNetworkImage(e){let t=`${e0.baseUrl}/public/getAssetImage/${e}`,r=await e0.getBlob({path:t,params:e2._getSdkProperties()});eD.setNetworkImage(e,URL.createObjectURL(r))},async _fetchConnectorImage(e){let t=`${e0.baseUrl}/public/getAssetImage/${e}`,r=await e0.getBlob({path:t,params:e2._getSdkProperties()});eD.setConnectorImage(e,URL.createObjectURL(r))},async _fetchCurrencyImage(e){let t=`${e0.baseUrl}/public/getCurrencyImage/${e}`,r=await e0.getBlob({path:t,params:e2._getSdkProperties()});eD.setCurrencyImage(e,URL.createObjectURL(r))},async _fetchTokenImage(e){let t=`${e0.baseUrl}/public/getTokenImage/${e}`,r=await e0.getBlob({path:t,params:e2._getSdkProperties()});eD.setTokenImage(e,URL.createObjectURL(r))},async fetchNetworkImages(){let e=oS.getAllRequestedCaipNetworks()?.map(({assets:e})=>e?.imageId).filter(Boolean).filter(e=>!eH.getNetworkImageById(e));e&&await Promise.allSettled(e.map(e=>e2._fetchNetworkImage(e)))},async fetchConnectorImages(){let{connectors:e}=e7.state,t=e.map(({imageId:e})=>e).filter(Boolean);await Promise.allSettled(t.map(e=>e2._fetchConnectorImage(e)))},async fetchCurrencyImages(e=[]){await Promise.allSettled(e.map(e=>e2._fetchCurrencyImage(e)))},async fetchTokenImages(e=[]){await Promise.allSettled(e.map(e=>e2._fetchTokenImage(e)))},async fetchWallets(e){let t=e.exclude??[];return e2._getSdkProperties().sv.startsWith("html-core-")&&t.push(...eQ),await e0.get({path:"/getWallets",params:{...e2._getSdkProperties(),...e,page:String(e.page),entries:String(e.entries),include:e.include?.join(","),exclude:e.exclude?.join(",")}})},async fetchFeaturedWallets(){let{featuredWalletIds:e}=eZ.state;if(e?.length){let t={...e2._getSdkProperties(),page:1,entries:e?.length??4,include:e},{data:r}=await e2.fetchWallets(t);r.sort((t,r)=>e.indexOf(t.id)-e.indexOf(r.id));let i=r.map(e=>e.image_id).filter(Boolean);await Promise.allSettled(i.map(e=>e2._fetchWalletImage(e))),e1.featured=r,e1.allFeatured=r}},async fetchRecommendedWallets(){try{e1.isFetchingRecommendedWallets=!0;let{includeWalletIds:e,excludeWalletIds:t,featuredWalletIds:r}=eZ.state,i=[...t??[],...r??[]].filter(Boolean),a=oS.getRequestedCaipNetworkIds().join(","),{data:o,count:n}=await e2.fetchWallets({page:1,entries:4,include:e,exclude:i,chains:a}),s=e$.getRecentWallets(),l=o.map(e=>e.image_id).filter(Boolean),c=s.map(e=>e.image_id).filter(Boolean);await Promise.allSettled([...l,...c].map(e=>e2._fetchWalletImage(e))),e1.recommended=o,e1.allRecommended=o,e1.count=n??0}catch{}finally{e1.isFetchingRecommendedWallets=!1}},async fetchWalletsByPage({page:e}){let{includeWalletIds:t,excludeWalletIds:r,featuredWalletIds:i}=eZ.state,a=oS.getRequestedCaipNetworkIds().join(","),o=[...e1.recommended.map(({id:e})=>e),...r??[],...i??[]].filter(Boolean),{data:n,count:s}=await e2.fetchWallets({page:e,entries:40,include:t,exclude:o,chains:a}),l=n.slice(0,20).map(e=>e.image_id).filter(Boolean);await Promise.allSettled(l.map(e=>e2._fetchWalletImage(e))),e1.wallets=eL.uniqueBy([...e1.wallets,...e2._filterOutExtensions(n)],"id"),e1.count=s>e1.count?s:e1.count,e1.page=e},async initializeExcludedWallets({ids:e}){let t=oS.getRequestedCaipNetworkIds().join(","),r={page:1,entries:e.length,include:e,chains:t},{data:i}=await e2.fetchWallets(r);i&&i.forEach(e=>{e1.excludedWallets.push({rdns:e.rdns,name:e.name})})},async searchWallet({search:e,badge:t}){let{includeWalletIds:r,excludeWalletIds:i}=eZ.state,a=oS.getRequestedCaipNetworkIds().join(",");e1.search=[];let o={page:1,entries:100,search:e?.trim(),badge_type:t,include:r,exclude:i,chains:a},{data:n}=await e2.fetchWallets(o);eJ.sendEvent({type:"track",event:"SEARCH_WALLET",properties:{badge:t??"",search:e??""}});let s=n.map(e=>e.image_id).filter(Boolean);await Promise.allSettled([...s.map(e=>e2._fetchWalletImage(e)),eL.wait(300)]),e1.search=e2._filterOutExtensions(n)},initPromise:(e,t)=>e1.promises[e]||(e1.promises[e]=t()),prefetch:({fetchConnectorImages:e=!0,fetchFeaturedWallets:t=!0,fetchRecommendedWallets:r=!0,fetchNetworkImages:i=!0}={})=>Promise.allSettled([e&&e2.initPromise("connectorImages",e2.fetchConnectorImages),t&&e2.initPromise("featuredWallets",e2.fetchFeaturedWallets),r&&e2.initPromise("recommendedWallets",e2.fetchRecommendedWallets),i&&e2.initPromise("networkImages",e2.fetchNetworkImages)].filter(Boolean)),prefetchAnalyticsConfig(){eZ.state.features?.analytics&&e2.fetchAnalyticsConfig()},async fetchAnalyticsConfig(){try{let{isAnalyticsEnabled:e}=await e0.get({path:"/getAnalyticsConfig",params:e2._getSdkProperties()});eZ.setFeatures({analytics:e})}catch{eZ.setFeatures({analytics:!1})}},setFilterByNamespace(e){if(!e){e1.featured=e1.allFeatured,e1.recommended=e1.allRecommended;return}let t=oS.getRequestedCaipNetworkIds().join(",");e1.featured=e1.allFeatured.filter(e=>e.chains?.some(e=>t.includes(e))),e1.recommended=e1.allRecommended.filter(e=>e.chains?.some(e=>t.includes(e)))}},e3=eI({view:"Connect",history:["Connect"],transactionStack:[]}),e5={state:e3,subscribeKey:(e,t)=>eO(e3,e,t),pushTransactionStack(e){e3.transactionStack.push(e)},popTransactionStack(e){let t=e3.transactionStack.pop();if(t){if(e)this.goBack(),t?.onCancel?.();else{if(t.goBack)this.goBack();else if(t.replace){let e=e3.history.indexOf("ConnectingSiwe");e>0?this.goBackToIndex(e-1):(oB.close(),e3.history=[])}else t.view&&this.reset(t.view);t?.onSuccess?.()}}},push(e,t){e!==e3.view&&(e3.view=e,e3.history.push(e),e3.data=t)},reset(e,t){e3.view=e,e3.history=[e],e3.data=t},replace(e,t){e3.history.at(-1)===e||(e3.view=e,e3.history[e3.history.length-1]=e,e3.data=t)},goBack(){let e=!oS.state.activeCaipAddress&&"ConnectingFarcaster"===this.state.view;if(e3.history.length>1&&!e3.history.includes("UnsupportedChain")){e3.history.pop();let[e]=e3.history.slice(-1);e&&(e3.view=e)}else oB.close();e3.data?.wallet&&(e3.data.wallet=void 0),setTimeout(()=>{if(e){o$.setFarcasterUrl(void 0,oS.state.activeChain);let e=e7.getAuthConnector();e?.provider?.reload();let t=e_(eZ.state);e?.provider?.syncDappData?.({metadata:t.metadata,sdkVersion:t.sdkVersion,projectId:t.projectId,sdkType:t.sdkType})}},100)},goBackToIndex(e){if(e3.history.length>1){e3.history=e3.history.slice(0,e+1);let[t]=e3.history.slice(-1);t&&(e3.view=t)}}},e4=eI({themeMode:"dark",themeVariables:{},w3mThemeVariables:void 0}),e6={state:e4,subscribe:e=>eS(e4,()=>e(e4)),setThemeMode(e){e4.themeMode=e;try{let t=e7.getAuthConnector();if(t){let r=e6.getSnapshot().themeVariables;t.provider.syncTheme({themeMode:e,themeVariables:r,w3mThemeVariables:ew(r,e)})}}catch{console.info("Unable to sync theme to auth connector")}},setThemeVariables(e){e4.themeVariables={...e4.themeVariables,...e};try{let e=e7.getAuthConnector();if(e){let t=e6.getSnapshot().themeVariables;e.provider.syncTheme({themeVariables:t,w3mThemeVariables:ew(e4.themeVariables,e4.themeMode)})}}catch{console.info("Unable to sync theme to auth connector")}},getSnapshot:()=>e_(e4)},e8={eip155:void 0,solana:void 0,polkadot:void 0,bip122:void 0},e9=eI({allConnectors:[],connectors:[],activeConnector:void 0,filterByNamespace:void 0,activeConnectorIds:{...e8}}),e7={state:e9,subscribe:e=>eS(e9,()=>{e(e9)}),subscribeKey:(e,t)=>eO(e9,e,t),initialize(e){e.forEach(e=>{let t=e$.getConnectedConnectorId(e);t&&this.setConnectorId(t,e)})},setActiveConnector(e){e&&(e9.activeConnector=eT(e))},setConnectors(e){e.filter(e=>!e9.allConnectors.some(t=>t.id===e.id&&this.getConnectorName(t.name)===this.getConnectorName(e.name)&&t.chain===e.chain)).forEach(e=>{"MULTI_CHAIN"!==e.type&&e9.allConnectors.push(eT(e))}),e9.connectors=this.mergeMultiChainConnectors(e9.allConnectors)},removeAdapter(e){e9.allConnectors=e9.allConnectors.filter(t=>t.chain!==e),e9.connectors=this.mergeMultiChainConnectors(e9.allConnectors)},mergeMultiChainConnectors(e){let t=this.generateConnectorMapByName(e),r=[];return t.forEach(e=>{let t=e[0],i=t?.id===ec.CONNECTOR_ID.AUTH;e.length>1&&t?r.push({name:t.name,imageUrl:t.imageUrl,imageId:t.imageId,connectors:[...e],type:i?"AUTH":"MULTI_CHAIN",chain:"eip155",id:t?.id||""}):t&&r.push(t)}),r},generateConnectorMapByName(e){let t=new Map;return e.forEach(e=>{let{name:r}=e,i=this.getConnectorName(r);if(!i)return;let a=t.get(i)||[];a.find(t=>t.chain===e.chain)||a.push(e),t.set(i,a)}),t},getConnectorName:e=>e&&(({"Trust Wallet":"Trust"})[e]||e),getUniqueConnectorsByName(e){let t=[];return e.forEach(e=>{t.find(t=>t.chain===e.chain)||t.push(e)}),t},addConnector(e){if(e.id===ec.CONNECTOR_ID.AUTH){let t=e_(eZ.state),r=e6.getSnapshot().themeMode,i=e6.getSnapshot().themeVariables;e?.provider?.syncDappData?.({metadata:t.metadata,sdkVersion:t.sdkVersion,projectId:t.projectId,sdkType:t.sdkType}),e?.provider?.syncTheme({themeMode:r,themeVariables:i,w3mThemeVariables:ew(i,r)}),this.setConnectors([e])}else this.setConnectors([e])},getAuthConnector(e){let t=e||oS.state.activeChain,r=e9.connectors.find(e=>e.id===ec.CONNECTOR_ID.AUTH);if(r)return r?.connectors?.length?r.connectors.find(e=>e.chain===t):r},getAnnouncedConnectorRdns:()=>e9.connectors.filter(e=>"ANNOUNCED"===e.type).map(e=>e.info?.rdns),getConnectorById:e=>e9.allConnectors.find(t=>t.id===e),getConnector:(e,t)=>e9.allConnectors.filter(e=>e.chain===oS.state.activeChain).find(r=>r.explorerId===e||r.info?.rdns===t),syncIfAuthConnector(e){if("ID_AUTH"!==e.id)return;let t=e_(eZ.state),r=e6.getSnapshot().themeMode,i=e6.getSnapshot().themeVariables;e?.provider?.syncDappData?.({metadata:t.metadata,sdkVersion:t.sdkVersion,sdkType:t.sdkType,projectId:t.projectId}),e.provider.syncTheme({themeMode:r,themeVariables:i,w3mThemeVariables:ew(i,r)})},getConnectorsByNamespace(e){let t=e9.allConnectors.filter(t=>t.chain===e);return this.mergeMultiChainConnectors(t)},selectWalletConnector(e){let t=e7.getConnector(e.id,e.rdns);oS.state.activeChain===ec.CHAIN.SOLANA&&eU.handleSolanaDeeplinkRedirect(t?.name||e.name||""),t?e5.push("ConnectingExternal",{connector:t}):e5.push("ConnectingWalletConnect",{wallet:e})},getConnectors(e){return e?this.getConnectorsByNamespace(e):this.mergeMultiChainConnectors(e9.allConnectors)},setFilterByNamespace(e){e9.filterByNamespace=e,e9.connectors=this.getConnectors(e),e2.setFilterByNamespace(e)},setConnectorId(e,t){e&&(e9.activeConnectorIds={...e9.activeConnectorIds,[t]:e},e$.setConnectedConnectorId(t,e))},removeConnectorId(e){e9.activeConnectorIds={...e9.activeConnectorIds,[e]:void 0},e$.deleteConnectedConnectorId(e)},getConnectorId(e){if(e)return e9.activeConnectorIds[e]},isConnected:e=>e?!!e9.activeConnectorIds[e]:Object.values(e9.activeConnectorIds).some(e=>!!e),resetConnectorIds(){e9.activeConnectorIds={...e8}}};function te(e,t){return e7.getConnectorId(e)===t}"u">typeof y&&"u">typeof y.env&&y.env.NEXT_PUBLIC_SECURE_SITE_SDK_URL,"u">typeof y&&"u">typeof y.env&&y.env.NEXT_PUBLIC_DEFAULT_LOG_LEVEL,"u">typeof y&&"u">typeof y.env&&y.env.NEXT_PUBLIC_SECURE_SITE_SDK_VERSION;let tt={ACCOUNT_TYPES:{EOA:"eoa",SMART_ACCOUNT:"smartAccount"}},tr=Object.freeze({message:"",variant:"success",svg:void 0,open:!1,autoClose:!0}),ti=eI({...tr}),ta={state:ti,subscribeKey:(e,t)=>eO(ti,e,t),showLoading(e,t={}){this._showMessage({message:e,variant:"loading",...t})},showSuccess(e){this._showMessage({message:e,variant:"success"})},showSvg(e,t){this._showMessage({message:e,svg:t})},showError(e){let t=eL.parseError(e);this._showMessage({message:t,variant:"error"})},hide(){ti.message=tr.message,ti.variant=tr.variant,ti.svg=tr.svg,ti.open=tr.open,ti.autoClose=tr.autoClose},_showMessage({message:e,svg:t,variant:r="success",autoClose:i=tr.autoClose}){ti.open?(ti.open=!1,setTimeout(()=>{ti.message=e,ti.variant=r,ti.svg=t,ti.open=!0,ti.autoClose=i},150)):(ti.message=e,ti.variant=r,ti.svg=t,ti.open=!0,ti.autoClose=i)}},to={getSIWX:()=>eZ.state.siwx,async initializeIfEnabled(){let e=eZ.state.siwx,t=oS.getActiveCaipAddress();if(!(e&&t))return;let[r,i,a]=t.split(":");if(oS.checkIfSupportedNetwork(r))try{if((await e.getSessions(`${r}:${i}`,a)).length)return;await oB.open({view:"SIWXSignMessage"})}catch(e){console.error("SIWXUtil:initializeIfEnabled",e),eJ.sendEvent({type:"track",event:"SIWX_AUTH_ERROR",properties:this.getSIWXEventProperties()}),await tc._getClient()?.disconnect().catch(console.error),e5.reset("Connect"),ta.showError("A problem occurred while trying initialize authentication")}},async requestSignMessage(){let e=eZ.state.siwx,t=eL.getPlainAddress(oS.getActiveCaipAddress()),r=oS.getActiveCaipNetwork(),i=tc._getClient();if(!e)throw Error("SIWX is not enabled");if(!t)throw Error("No ActiveCaipAddress found");if(!r)throw Error("No ActiveCaipNetwork or client found");if(!i)throw Error("No ConnectionController client found");try{let a=await e.createMessage({chainId:r.caipNetworkId,accountAddress:t}),o=a.toString();e7.getConnectorId(r.chainNamespace)===ec.CONNECTOR_ID.AUTH&&e5.pushTransactionStack({view:null,goBack:!1,replace:!0});let n=await i.signMessage(o);await e.addSession({data:a,message:o,signature:n}),oB.close(),eJ.sendEvent({type:"track",event:"SIWX_AUTH_SUCCESS",properties:this.getSIWXEventProperties()})}catch(t){let e=this.getSIWXEventProperties();oB.state.open&&"ApproveTransaction"!==e5.state.view||await oB.open({view:"SIWXSignMessage"}),e.isSmartAccount?ta.showError("This application might not support Smart Accounts"):ta.showError("Signature declined"),eJ.sendEvent({type:"track",event:"SIWX_AUTH_ERROR",properties:e}),console.error("SWIXUtil:requestSignMessage",t)}},async cancelSignMessage(){try{this.getSIWX()?.getRequired?.()?await tc.disconnect():oB.close(),e5.reset("Connect"),eJ.sendEvent({event:"CLICK_CANCEL_SIWX",type:"track",properties:this.getSIWXEventProperties()})}catch(e){console.error("SIWXUtil:cancelSignMessage",e)}},async getSessions(){let e=eZ.state.siwx,t=eL.getPlainAddress(oS.getActiveCaipAddress()),r=oS.getActiveCaipNetwork();return e&&t&&r?e.getSessions(r.caipNetworkId,t):[]},async isSIWXCloseDisabled(){let e=this.getSIWX();if(e){let t="ApproveTransaction"===e5.state.view,r="SIWXSignMessage"===e5.state.view;if(t||r)return e.getRequired?.()&&0===(await this.getSessions()).length}return!1},async universalProviderAuthenticate({universalProvider:e,chains:t,methods:r}){let i=to.getSIWX(),a=new Set(t.map(e=>e.split(":")[0]));if(!i||1!==a.size||!a.has("eip155"))return!1;let o=await i.createMessage({chainId:oS.getActiveCaipNetwork()?.caipNetworkId||"",accountAddress:""}),n=await e.authenticate({nonce:o.nonce,domain:o.domain,uri:o.uri,exp:o.expirationTime,iat:o.issuedAt,nbf:o.notBefore,requestId:o.requestId,version:o.version,resources:o.resources,statement:o.statement,chainId:o.chainId,methods:r,chains:[o.chainId,...t.filter(e=>e!==o.chainId)]});if(ta.showLoading("Authenticating...",{autoClose:!1}),o$.setConnectedWalletInfo({...n.session.peer.metadata,name:n.session.peer.metadata.name,icon:n.session.peer.metadata.icons?.[0],type:"WALLET_CONNECT"},Array.from(a)[0]),n?.auths?.length){let t=n.auths.map(t=>{let r=e.client.formatAuthMessage({request:t.p,iss:t.p.iss});return{data:{...t.p,accountAddress:t.p.iss.split(":").slice(-1).join(""),chainId:t.p.iss.split(":").slice(2,4).join(":"),uri:t.p.aud,version:t.p.version||o.version,expirationTime:t.p.exp,issuedAt:t.p.iat,notBefore:t.p.nbf},message:r,signature:t.s.s,cacao:t}});try{await i.setSessions(t),eJ.sendEvent({type:"track",event:"SIWX_AUTH_SUCCESS",properties:to.getSIWXEventProperties()})}catch(t){throw console.error("SIWX:universalProviderAuth - failed to set sessions",t),eJ.sendEvent({type:"track",event:"SIWX_AUTH_ERROR",properties:to.getSIWXEventProperties()}),await e.disconnect().catch(console.error),t}finally{ta.hide()}}return!0},getSIWXEventProperties(){let e=oS.state.activeChain;return{network:oS.state.activeCaipNetwork?.caipNetworkId||"",isSmartAccount:o$.state.preferredAccountTypes?.[e]===tt.ACCOUNT_TYPES.SMART_ACCOUNT}},async clearSessions(){let e=this.getSIWX();e&&await e.setSessions([])}},tn=eI({transactions:[],coinbaseTransactions:{},transactionsByYear:{},lastNetworkInView:void 0,loading:!1,empty:!1,next:void 0}),ts={state:tn,subscribe:e=>eS(tn,()=>e(tn)),setLastNetworkInView(e){tn.lastNetworkInView=e},async fetchTransactions(e,t){if(!e)throw Error("Transactions can't be fetched without an accountAddress");tn.loading=!0;try{let r=await oP.fetchTransactions({account:e,cursor:tn.next,onramp:t,cache:"coinbase"===t?"no-cache":void 0,chainId:oS.state.activeCaipNetwork?.caipNetworkId}),i=this.filterSpamTransactions(r.data),a=this.filterByConnectedChain(i),o=[...tn.transactions,...a];tn.loading=!1,"coinbase"===t?tn.coinbaseTransactions=this.groupTransactionsByYearAndMonth(tn.coinbaseTransactions,r.data):(tn.transactions=o,tn.transactionsByYear=this.groupTransactionsByYearAndMonth(tn.transactionsByYear,a)),tn.empty=0===o.length,tn.next=r.next?r.next:void 0}catch{let t=oS.state.activeChain;eJ.sendEvent({type:"track",event:"ERROR_FETCH_TRANSACTIONS",properties:{address:e,projectId:eZ.state.projectId,cursor:tn.next,isSmartAccount:o$.state.preferredAccountTypes?.[t]===tt.ACCOUNT_TYPES.SMART_ACCOUNT}}),ta.showError("Failed to fetch transactions"),tn.loading=!1,tn.empty=!0,tn.next=void 0}},groupTransactionsByYearAndMonth:(e={},t=[])=>(t.forEach(t=>{let r=new Date(t.metadata.minedAt).getFullYear(),i=new Date(t.metadata.minedAt).getMonth(),a=e[r]??{},o=(a[i]??[]).filter(e=>e.id!==t.id);e[r]={...a,[i]:[...o,t].sort((e,t)=>new Date(t.metadata.minedAt).getTime()-new Date(e.metadata.minedAt).getTime())}}),e),filterSpamTransactions:e=>e.filter(e=>!e.transfers.every(e=>e.nft_info?.flags.is_spam===!0)),filterByConnectedChain(e){let t=oS.state.activeCaipNetwork?.caipNetworkId;return e.filter(e=>e.metadata.chain===t)},clearCursor(){tn.next=void 0},resetTransactions(){tn.transactions=[],tn.transactionsByYear={},tn.lastNetworkInView=void 0,tn.loading=!1,tn.empty=!1,tn.next=void 0}},tl=eI({wcError:!1,buffering:!1,status:"disconnected"}),tc={state:tl,subscribeKey:(e,t)=>eO(tl,e,t),_getClient:()=>tl._client,setClient(e){tl._client=eT(e)},async connectWalletConnect(){if(eL.isTelegram()||eL.isSafari()&&eL.isIos()){if(i){await i,i=void 0;return}if(!eL.isPairingExpired(tl?.wcPairingExpiry)){let e=tl.wcUri;tl.wcUri=e;return}i=this._getClient()?.connectWalletConnect?.().catch(()=>{}),this.state.status="connecting",await i,i=void 0,tl.wcPairingExpiry=void 0,this.state.status="connected"}else await this._getClient()?.connectWalletConnect?.()},async connectExternal(e,t,r=!0){await this._getClient()?.connectExternal?.(e),r&&oS.setActiveNamespace(t)},async reconnectExternal(e){await this._getClient()?.reconnectExternal?.(e);let t=e.chain||oS.state.activeChain;t&&e7.setConnectorId(e.id,t)},async setPreferredAccountType(e,t){oB.setLoading(!0,oS.state.activeChain);let r=e7.getAuthConnector();r&&(o$.setPreferredAccountType(e,t),await r.provider.setPreferredAccount(e),e$.setPreferredAccountTypes(o$.state.preferredAccountTypes??{[t]:e}),await this.reconnectExternal(r),oB.setLoading(!1,oS.state.activeChain),eJ.sendEvent({type:"track",event:"SET_PREFERRED_ACCOUNT_TYPE",properties:{accountType:e,network:oS.state.activeCaipNetwork?.caipNetworkId||""}}))},async signMessage(e){return this._getClient()?.signMessage(e)},parseUnits(e,t){return this._getClient()?.parseUnits(e,t)},formatUnits(e,t){return this._getClient()?.formatUnits(e,t)},async sendTransaction(e){return this._getClient()?.sendTransaction(e)},async getCapabilities(e){return this._getClient()?.getCapabilities(e)},async grantPermissions(e){return this._getClient()?.grantPermissions(e)},async walletGetAssets(e){return this._getClient()?.walletGetAssets(e)??{}},async estimateGas(e){return this._getClient()?.estimateGas(e)},async writeContract(e){return this._getClient()?.writeContract(e)},async getEnsAddress(e){return this._getClient()?.getEnsAddress(e)},async getEnsAvatar(e){return this._getClient()?.getEnsAvatar(e)},checkInstalled(e){return this._getClient()?.checkInstalled?.(e)||!1},resetWcConnection(){tl.wcUri=void 0,tl.wcPairingExpiry=void 0,tl.wcLinking=void 0,tl.recentWallet=void 0,tl.status="disconnected",ts.resetTransactions(),e$.deleteWalletConnectDeepLink()},resetUri(){tl.wcUri=void 0,tl.wcPairingExpiry=void 0},finalizeWcConnection(){let{wcLinking:e,recentWallet:t}=tc.state;e&&e$.setWalletConnectDeepLink(e),t&&e$.setAppKitRecent(t),eJ.sendEvent({type:"track",event:"CONNECT_SUCCESS",properties:{method:e?"mobile":"qrcode",name:e5.state.data?.wallet?.name||"Unknown"}})},setWcBasic(e){tl.wcBasic=e},setUri(e){tl.wcUri=e,tl.wcPairingExpiry=eL.getPairingExpiry()},setWcLinking(e){tl.wcLinking=e},setWcError(e){tl.wcError=e,tl.buffering=!1},setRecentWallet(e){tl.recentWallet=e},setBuffering(e){tl.buffering=e},setStatus(e){tl.status=e},async disconnect(e){try{oB.setLoading(!0,e),await to.clearSessions(),await oS.disconnect(e),oB.setLoading(!1,e),e7.setFilterByNamespace(void 0)}catch{throw Error("Failed to disconnect")}}},td=eI({loading:!1,open:!1,selectedNetworkId:void 0,activeChain:void 0,initialized:!1}),tu={state:td,subscribe:e=>eS(td,()=>e(td)),subscribeOpen:e=>eO(td,"open",e),set(e){Object.assign(td,{...td,...e})}};function th(e,{strict:t=!0}={}){return!!e&&"string"==typeof e&&(t?/^0x[0-9a-fA-F]*$/.test(e):e.startsWith("0x"))}function tp(e){return th(e,{strict:!1})?Math.ceil((e.length-2)/2):e.length}let tg="2.27.0",tf={getDocsUrl:({docsBaseUrl:e,docsPath:t="",docsSlug:r})=>t?`${e??"https://viem.sh"}${t}${r?`#${r}`:""}`:void 0,version:`viem@${tg}`};class tw extends Error{constructor(e,t={}){let r=t.cause instanceof tw?t.cause.details:t.cause?.message?t.cause.message:t.details,i=t.cause instanceof tw&&t.cause.docsPath||t.docsPath,a=tf.getDocsUrl?.({...t,docsPath:i});super([e||"An error occurred.","",...t.metaMessages?[...t.metaMessages,""]:[],...a?[`Docs: ${a}`]:[],...r?[`Details: ${r}`]:[],...tf.version?[`Version: ${tf.version}`]:[]].join(`
`),t.cause?{cause:t.cause}:void 0),Object.defineProperty(this,"details",{enumerable:!0,configurable:!0,writable:!0,value:void 0}),Object.defineProperty(this,"docsPath",{enumerable:!0,configurable:!0,writable:!0,value:void 0}),Object.defineProperty(this,"metaMessages",{enumerable:!0,configurable:!0,writable:!0,value:void 0}),Object.defineProperty(this,"shortMessage",{enumerable:!0,configurable:!0,writable:!0,value:void 0}),Object.defineProperty(this,"version",{enumerable:!0,configurable:!0,writable:!0,value:void 0}),Object.defineProperty(this,"name",{enumerable:!0,configurable:!0,writable:!0,value:"BaseError"}),this.details=r,this.docsPath=i,this.metaMessages=t.metaMessages,this.name=t.name??this.name,this.shortMessage=e,this.version=tg}walk(e){return function e(t,r){return r?.(t)?t:t&&"object"==typeof t&&"cause"in t&&void 0!==t.cause?e(t.cause,r):r?null:t}(this,e)}}class tm extends tw{constructor({offset:e,position:t,size:r}){super(`Slice ${"start"===t?"starting":"ending"} at offset "${e}" is out-of-bounds (size: ${r}).`,{name:"SliceOffsetOutOfBoundsError"})}}class tv extends tw{constructor({size:e,targetSize:t,type:r}){super(`${r.charAt(0).toUpperCase()}${r.slice(1).toLowerCase()} size (${e}) exceeds padding size (${t}).`,{name:"SizeExceedsPaddingSizeError"})}}function tb(e,{dir:t,size:r=32}={}){return"string"==typeof e?function(e,{dir:t,size:r=32}={}){if(null===r)return e;let i=e.replace("0x","");if(i.length>2*r)throw new tv({size:Math.ceil(i.length/2),targetSize:r,type:"hex"});return`0x${i["right"===t?"padEnd":"padStart"](2*r,"0")}`}(e,{dir:t,size:r}):function(e,{dir:t,size:r=32}={}){if(null===r)return e;if(e.length>r)throw new tv({size:e.length,targetSize:r,type:"bytes"});let i=new Uint8Array(r);for(let a=0;a<r;a++){let o="right"===t;i[o?a:r-a-1]=e[o?a:e.length-a-1]}return i}(e,{dir:t,size:r})}class ty extends tw{constructor({max:e,min:t,signed:r,size:i,value:a}){super(`Number "${a}" is not in safe ${i?`${8*i}-bit ${r?"signed":"unsigned"} `:""}integer range ${e?`(${t} to ${e})`:`(above ${t})`}`,{name:"IntegerOutOfRangeError"})}}class tC extends tw{constructor({givenSize:e,maxSize:t}){super(`Size cannot exceed ${t} bytes. Given size: ${e} bytes.`,{name:"SizeOverflowError"})}}function tx(e,{dir:t="left"}={}){let r="string"==typeof e?e.replace("0x",""):e,i=0;for(let e=0;e<r.length-1&&"0"===r["left"===t?e:r.length-e-1].toString();e++)i++;return r="left"===t?r.slice(i):r.slice(0,r.length-i),"string"==typeof e?(1===r.length&&"right"===t&&(r=`${r}0`),`0x${r.length%2==1?`0${r}`:r}`):r}function tE(e,{size:t}){if(tp(e)>t)throw new tC({givenSize:tp(e),maxSize:t})}function tk(e,t={}){let{signed:r}=t;t.size&&tE(e,{size:t.size});let i=BigInt(e);if(!r)return i;let a=(e.length-2)/2;return i<=(1n<<8n*BigInt(a)-1n)-1n?i:i-BigInt(`0x${"f".padStart(2*a,"f")}`)-1n}function tA(e,t={}){return Number(tk(e,t))}let tN=Array.from({length:256},(e,t)=>t.toString(16).padStart(2,"0"));function tI(e,t={}){return"number"==typeof e||"bigint"==typeof e?t_(e,t):"string"==typeof e?tO(e,t):"boolean"==typeof e?function(e,t={}){let r=`0x${Number(e)}`;return"number"==typeof t.size?(tE(r,{size:t.size}),tb(r,{size:t.size})):r}(e,t):tS(e,t)}function tS(e,t={}){let r="";for(let t=0;t<e.length;t++)r+=tN[e[t]];let i=`0x${r}`;return"number"==typeof t.size?(tE(i,{size:t.size}),tb(i,{dir:"right",size:t.size})):i}function t_(e,t={}){let r;let{signed:i,size:a}=t,o=BigInt(e);a?r=i?(1n<<8n*BigInt(a)-1n)-1n:2n**(8n*BigInt(a))-1n:"number"==typeof e&&(r=BigInt(Number.MAX_SAFE_INTEGER));let n="bigint"==typeof r&&i?-r-1n:0;if(r&&o>r||o<n){let t="bigint"==typeof e?"n":"";throw new ty({max:r?`${r}${t}`:void 0,min:`${n}${t}`,signed:i,size:a,value:`${e}${t}`})}let s=`0x${(i&&o<0?(1n<<BigInt(8*a))+BigInt(o):o).toString(16)}`;return a?tb(s,{size:a}):s}let tT=new TextEncoder;function tO(e,t={}){return tS(tT.encode(e),t)}let tP=new TextEncoder;function tR(e,t={}){return"number"==typeof e||"bigint"==typeof e?tB(t_(e,t)):"boolean"==typeof e?function(e,t={}){let r=new Uint8Array(1);return r[0]=Number(e),"number"==typeof t.size?(tE(r,{size:t.size}),tb(r,{size:t.size})):r}(e,t):th(e)?tB(e,t):tM(e,t)}let t$={zero:48,nine:57,A:65,F:70,a:97,f:102};function tL(e){return e>=t$.zero&&e<=t$.nine?e-t$.zero:e>=t$.A&&e<=t$.F?e-(t$.A-10):e>=t$.a&&e<=t$.f?e-(t$.a-10):void 0}function tB(e,t={}){let r=e;t.size&&(tE(r,{size:t.size}),r=tb(r,{dir:"right",size:t.size}));let i=r.slice(2);i.length%2&&(i=`0${i}`);let a=i.length/2,o=new Uint8Array(a);for(let e=0,t=0;e<a;e++){let r=tL(i.charCodeAt(t++)),a=tL(i.charCodeAt(t++));if(void 0===r||void 0===a)throw new tw(`Invalid byte sequence ("${i[t-2]}${i[t-1]}" in "${i}").`);o[e]=16*r+a}return o}function tM(e,t={}){let r=tP.encode(e);return"number"==typeof t.size?(tE(r,{size:t.size}),tb(r,{dir:"right",size:t.size})):r}function tU(e){if(!Number.isSafeInteger(e)||e<0)throw Error("positive integer expected, got "+e)}function tz(e,...t){if(!(e instanceof Uint8Array||ArrayBuffer.isView(e)&&"Uint8Array"===e.constructor.name))throw Error("Uint8Array expected");if(t.length>0&&!t.includes(e.length))throw Error("Uint8Array expected of length "+t+", got length="+e.length)}function tD(e,t=!0){if(e.destroyed)throw Error("Hash instance has been destroyed");if(t&&e.finished)throw Error("Hash#digest() has already been called")}function tj(e,t){tz(e);let r=t.outputLen;if(e.length<r)throw Error("digestInto() expects output buffer of length at least "+r)}let tW=BigInt(4294967296-1),tH=BigInt(32),tF=(e,t,r)=>e<<r|t>>>32-r,tV=(e,t,r)=>t<<r|e>>>32-r,tZ=(e,t,r)=>t<<r-32|e>>>64-r,tq=(e,t,r)=>e<<r-32|t>>>64-r,tG="object"==typeof globalThis&&"crypto"in globalThis?globalThis.crypto:void 0;function tK(e){return new DataView(e.buffer,e.byteOffset,e.byteLength)}function tY(e,t){return e<<32-t|e>>>t}let tX=68===new Uint8Array(new Uint32Array([287454020]).buffer)[0];function tJ(e){for(let r=0;r<e.length;r++){var t;e[r]=(t=e[r])<<24&4278190080|t<<8&16711680|t>>>8&65280|t>>>24&255}}function tQ(e){return"string"==typeof e&&(e=function(e){if("string"!=typeof e)throw Error("utf8ToBytes expected string, got "+typeof e);return new Uint8Array(new TextEncoder().encode(e))}(e)),tz(e),e}class t0{clone(){return this._cloneInto()}}function t1(e){let t=t=>e().update(tQ(t)).digest(),r=e();return t.outputLen=r.outputLen,t.blockLen=r.blockLen,t.create=()=>e(),t}function t2(e=32){if(tG&&"function"==typeof tG.getRandomValues)return tG.getRandomValues(new Uint8Array(e));if(tG&&"function"==typeof tG.randomBytes)return tG.randomBytes(e);throw Error("crypto.getRandomValues must be defined")}let t3=[],t5=[],t4=[],t6=BigInt(0),t8=BigInt(1),t9=BigInt(2),t7=BigInt(7),re=BigInt(256),rt=BigInt(113);for(let e=0,t=t8,r=1,i=0;e<24;e++){[r,i]=[i,(2*r+3*i)%5],t3.push(2*(5*i+r)),t5.push((e+1)*(e+2)/2%64);let a=t6;for(let e=0;e<7;e++)(t=(t<<t8^(t>>t7)*rt)%re)&t9&&(a^=t8<<(t8<<BigInt(e))-t8);t4.push(a)}let[rr,ri]=function(e,t=!1){let r=new Uint32Array(e.length),i=new Uint32Array(e.length);for(let a=0;a<e.length;a++){let{h:o,l:n}=function(e,t=!1){return t?{h:Number(e&tW),l:Number(e>>tH&tW)}:{h:0|Number(e>>tH&tW),l:0|Number(e&tW)}}(e[a],t);[r[a],i[a]]=[o,n]}return[r,i]}(t4,!0),ra=(e,t,r)=>r>32?tZ(e,t,r):tF(e,t,r),ro=(e,t,r)=>r>32?tq(e,t,r):tV(e,t,r);class rn extends t0{constructor(e,t,r,i=!1,a=24){var o;if(super(),this.blockLen=e,this.suffix=t,this.outputLen=r,this.enableXOF=i,this.rounds=a,this.pos=0,this.posOut=0,this.finished=!1,this.destroyed=!1,tU(r),0>=this.blockLen||this.blockLen>=200)throw Error("Sha3 supports only keccak-f1600 function");this.state=new Uint8Array(200),this.state32=new Uint32Array((o=this.state).buffer,o.byteOffset,Math.floor(o.byteLength/4))}keccak(){tX||tJ(this.state32),function(e,t=24){let r=new Uint32Array(10);for(let i=24-t;i<24;i++){for(let t=0;t<10;t++)r[t]=e[t]^e[t+10]^e[t+20]^e[t+30]^e[t+40];for(let t=0;t<10;t+=2){let i=(t+8)%10,a=(t+2)%10,o=r[a],n=r[a+1],s=ra(o,n,1)^r[i],l=ro(o,n,1)^r[i+1];for(let r=0;r<50;r+=10)e[t+r]^=s,e[t+r+1]^=l}let t=e[2],a=e[3];for(let r=0;r<24;r++){let i=t5[r],o=ra(t,a,i),n=ro(t,a,i),s=t3[r];t=e[s],a=e[s+1],e[s]=o,e[s+1]=n}for(let t=0;t<50;t+=10){for(let i=0;i<10;i++)r[i]=e[t+i];for(let i=0;i<10;i++)e[t+i]^=~r[(i+2)%10]&r[(i+4)%10]}e[0]^=rr[i],e[1]^=ri[i]}r.fill(0)}(this.state32,this.rounds),tX||tJ(this.state32),this.posOut=0,this.pos=0}update(e){tD(this);let{blockLen:t,state:r}=this,i=(e=tQ(e)).length;for(let a=0;a<i;){let o=Math.min(t-this.pos,i-a);for(let t=0;t<o;t++)r[this.pos++]^=e[a++];this.pos===t&&this.keccak()}return this}finish(){if(this.finished)return;this.finished=!0;let{state:e,suffix:t,pos:r,blockLen:i}=this;e[r]^=t,(128&t)!=0&&r===i-1&&this.keccak(),e[i-1]^=128,this.keccak()}writeInto(e){tD(this,!1),tz(e),this.finish();let t=this.state,{blockLen:r}=this;for(let i=0,a=e.length;i<a;){this.posOut>=r&&this.keccak();let o=Math.min(r-this.posOut,a-i);e.set(t.subarray(this.posOut,this.posOut+o),i),this.posOut+=o,i+=o}return e}xofInto(e){if(!this.enableXOF)throw Error("XOF is not possible for this instance");return this.writeInto(e)}xof(e){return tU(e),this.xofInto(new Uint8Array(e))}digestInto(e){if(tj(e,this),this.finished)throw Error("digest() was already called");return this.writeInto(e),this.destroy(),e}digest(){return this.digestInto(new Uint8Array(this.outputLen))}destroy(){this.destroyed=!0,this.state.fill(0)}_cloneInto(e){let{blockLen:t,suffix:r,outputLen:i,rounds:a,enableXOF:o}=this;return e||(e=new rn(t,r,i,o,a)),e.state32.set(this.state32),e.pos=this.pos,e.posOut=this.posOut,e.finished=this.finished,e.rounds=a,e.suffix=r,e.outputLen=i,e.enableXOF=o,e.destroyed=this.destroyed,e}}let rs=t1(()=>new rn(136,1,32));class rl extends tw{constructor({address:e}){super(`Address "${e}" is invalid.`,{metaMessages:["- Address must be a hex value of 20 bytes (40 hex characters).","- Address must match its checksum counterpart."],name:"InvalidAddressError"})}}class rc extends Map{constructor(e){super(),Object.defineProperty(this,"maxSize",{enumerable:!0,configurable:!0,writable:!0,value:void 0}),this.maxSize=e}get(e){let t=super.get(e);return super.has(e)&&void 0!==t&&(this.delete(e),super.set(e,t)),t}set(e,t){if(super.set(e,t),this.maxSize&&this.size>this.maxSize){let e=this.keys().next().value;e&&this.delete(e)}return this}}let rd=new rc(8192),ru=/^0x[a-fA-F0-9]{40}$/,rh=new rc(8192);function rp(e,t){let{strict:r=!0}=t??{},i=`${e}.${r}`;if(rh.has(i))return rh.get(i);let a=!!ru.test(e)&&(e.toLowerCase()===e||!r||function(e,t){if(rd.has(`${e}.undefined`))return rd.get(`${e}.undefined`);let r=e.substring(2).toLowerCase(),i=function(e,t){let r=rs(th(e,{strict:!1})?tR(e):e);return"bytes"===(t||"hex")?r:tI(r)}(tM(r),"bytes"),a=(t?r.substring(`${t}0x`.length):r).split("");for(let e=0;e<40;e+=2)i[e>>1]>>4>=8&&a[e]&&(a[e]=a[e].toUpperCase()),(15&i[e>>1])>=8&&a[e+1]&&(a[e+1]=a[e+1].toUpperCase());let o=`0x${a.join("")}`;return rd.set(`${e}.${t}`,o),o}(e)===e);return rh.set(i,a),a}function rg(e){return`0x${e.reduce((e,t)=>e+t.replace("0x",""),"")}`}function rf(e,t){if("number"==typeof t&&t>0&&t>tp(e)-1)throw new tm({offset:t,position:"start",size:tp(e)})}function rw(e,t,r){if("number"==typeof t&&"number"==typeof r&&tp(e)!==r-t)throw new tm({offset:r,position:"end",size:tp(e)})}class rm extends tw{constructor({offset:e}){super(`Offset \`${e}\` cannot be negative.`,{name:"NegativeOffsetError"})}}class rv extends tw{constructor({length:e,position:t}){super(`Position \`${t}\` is out of bounds (\`0 < position < ${e}\`).`,{name:"PositionOutOfBoundsError"})}}class rb extends tw{constructor({count:e,limit:t}){super(`Recursive read limit of \`${t}\` exceeded (recursive read count: \`${e}\`).`,{name:"RecursiveReadLimitExceededError"})}}let ry={bytes:new Uint8Array,dataView:new DataView(new ArrayBuffer(0)),position:0,positionReadCount:new Map,recursiveReadCount:0,recursiveReadLimit:Number.POSITIVE_INFINITY,assertReadLimit(){if(this.recursiveReadCount>=this.recursiveReadLimit)throw new rb({count:this.recursiveReadCount+1,limit:this.recursiveReadLimit})},assertPosition(e){if(e<0||e>this.bytes.length-1)throw new rv({length:this.bytes.length,position:e})},decrementPosition(e){if(e<0)throw new rm({offset:e});let t=this.position-e;this.assertPosition(t),this.position=t},getReadCount(e){return this.positionReadCount.get(e||this.position)||0},incrementPosition(e){if(e<0)throw new rm({offset:e});let t=this.position+e;this.assertPosition(t),this.position=t},inspectByte(e){let t=e??this.position;return this.assertPosition(t),this.bytes[t]},inspectBytes(e,t){let r=t??this.position;return this.assertPosition(r+e-1),this.bytes.subarray(r,r+e)},inspectUint8(e){let t=e??this.position;return this.assertPosition(t),this.bytes[t]},inspectUint16(e){let t=e??this.position;return this.assertPosition(t+1),this.dataView.getUint16(t)},inspectUint24(e){let t=e??this.position;return this.assertPosition(t+2),(this.dataView.getUint16(t)<<8)+this.dataView.getUint8(t+2)},inspectUint32(e){let t=e??this.position;return this.assertPosition(t+3),this.dataView.getUint32(t)},pushByte(e){this.assertPosition(this.position),this.bytes[this.position]=e,this.position++},pushBytes(e){this.assertPosition(this.position+e.length-1),this.bytes.set(e,this.position),this.position+=e.length},pushUint8(e){this.assertPosition(this.position),this.bytes[this.position]=e,this.position++},pushUint16(e){this.assertPosition(this.position+1),this.dataView.setUint16(this.position,e),this.position+=2},pushUint24(e){this.assertPosition(this.position+2),this.dataView.setUint16(this.position,e>>8),this.dataView.setUint8(this.position+2,255&e),this.position+=3},pushUint32(e){this.assertPosition(this.position+3),this.dataView.setUint32(this.position,e),this.position+=4},readByte(){this.assertReadLimit(),this._touch();let e=this.inspectByte();return this.position++,e},readBytes(e,t){this.assertReadLimit(),this._touch();let r=this.inspectBytes(e);return this.position+=t??e,r},readUint8(){this.assertReadLimit(),this._touch();let e=this.inspectUint8();return this.position+=1,e},readUint16(){this.assertReadLimit(),this._touch();let e=this.inspectUint16();return this.position+=2,e},readUint24(){this.assertReadLimit(),this._touch();let e=this.inspectUint24();return this.position+=3,e},readUint32(){this.assertReadLimit(),this._touch();let e=this.inspectUint32();return this.position+=4,e},get remaining(){return this.bytes.length-this.position},setPosition(e){let t=this.position;return this.assertPosition(e),this.position=e,()=>this.position=t},_touch(){if(this.recursiveReadLimit===Number.POSITIVE_INFINITY)return;let e=this.getReadCount();this.positionReadCount.set(this.position,e+1),e>0&&this.recursiveReadCount++}};function rC(e,{recursiveReadLimit:t=8192}={}){let r=Object.create(ry);return r.bytes=e,r.dataView=new DataView(e.buffer,e.byteOffset,e.byteLength),r.positionReadCount=new Map,r.recursiveReadLimit=t,r}let rx=(e,t,r)=>JSON.stringify(e,(e,r)=>{let i="bigint"==typeof r?r.toString():r;return"function"==typeof t?t(e,i):i},r),rE={ether:-9,wei:9};function rk(e,t){let r=e.toString(),i=r.startsWith("-");i&&(r=r.slice(1));let[a,o]=[(r=r.padStart(t,"0")).slice(0,r.length-t),r.slice(r.length-t)];return o=o.replace(/(0+)$/,""),`${i?"-":""}${a||"0"}${o?`.${o}`:""}`}function rA(e,t="wei"){return rk(e,rE[t])}class rN extends tw{constructor({v:e}){super(`Invalid \`v\` value "${e}". Expected 27 or 28.`,{name:"InvalidLegacyVError"})}}class rI extends tw{constructor({transaction:e}){super("Cannot infer a transaction type from provided transaction.",{metaMessages:["Provided Transaction:","{",function(e){let t=Object.entries(e).map(([e,t])=>void 0===t||!1===t?null:[e,t]).filter(Boolean),r=t.reduce((e,[t])=>Math.max(e,t.length),0);return t.map(([e,t])=>`  ${`${e}:`.padEnd(r+1)}  ${t}`).join(`
`)}(e),"}","","To infer the type, either provide:","- a `type` to the Transaction, or","- an EIP-1559 Transaction with `maxFeePerGas`, or","- an EIP-2930 Transaction with `gasPrice` & `accessList`, or","- an EIP-4844 Transaction with `blobs`, `blobVersionedHashes`, `sidecars`, or","- an EIP-7702 Transaction with `authorizationList`, or","- a Legacy Transaction with `gasPrice`"],name:"InvalidSerializableTransactionError"})}}class rS extends tw{constructor({storageKey:e}){super(`Size for storage key "${e}" is invalid. Expected 32 bytes. Got ${Math.floor((e.length-2)/2)} bytes.`,{name:"InvalidStorageKeySizeError"})}}let r_=e=>e;class rT extends tw{constructor({body:e,cause:t,details:r,headers:i,status:a,url:o}){super("HTTP request failed.",{cause:t,details:r,metaMessages:[a&&`Status: ${a}`,`URL: ${r_(o)}`,e&&`Request body: ${rx(e)}`].filter(Boolean),name:"HttpRequestError"}),Object.defineProperty(this,"body",{enumerable:!0,configurable:!0,writable:!0,value:void 0}),Object.defineProperty(this,"headers",{enumerable:!0,configurable:!0,writable:!0,value:void 0}),Object.defineProperty(this,"status",{enumerable:!0,configurable:!0,writable:!0,value:void 0}),Object.defineProperty(this,"url",{enumerable:!0,configurable:!0,writable:!0,value:void 0}),this.body=e,this.headers=i,this.status=a,this.url=o}}class rO extends tw{constructor({body:e,error:t,url:r}){super("RPC Request failed.",{cause:t,details:t.message,metaMessages:[`URL: ${r_(r)}`,`Request body: ${rx(e)}`],name:"RpcRequestError"}),Object.defineProperty(this,"code",{enumerable:!0,configurable:!0,writable:!0,value:void 0}),Object.defineProperty(this,"data",{enumerable:!0,configurable:!0,writable:!0,value:void 0}),this.code=t.code,this.data=t.data}}class rP extends tw{constructor({body:e,url:t}){super("The request took too long to respond.",{details:"The request timed out.",metaMessages:[`URL: ${r_(t)}`,`Request body: ${rx(e)}`],name:"TimeoutError"})}}class rR extends tw{constructor(e,{code:t,docsPath:r,metaMessages:i,name:a,shortMessage:o}){super(o,{cause:e,docsPath:r,metaMessages:i||e?.metaMessages,name:a||"RpcError"}),Object.defineProperty(this,"code",{enumerable:!0,configurable:!0,writable:!0,value:void 0}),this.name=a||e.name,this.code=e instanceof rO?e.code:t??-1}}class r$ extends rR{constructor(e,t){super(e,t),Object.defineProperty(this,"data",{enumerable:!0,configurable:!0,writable:!0,value:void 0}),this.data=t.data}}class rL extends rR{constructor(e){super(e,{code:rL.code,name:"ParseRpcError",shortMessage:"Invalid JSON was received by the server. An error occurred on the server while parsing the JSON text."})}}Object.defineProperty(rL,"code",{enumerable:!0,configurable:!0,writable:!0,value:-32700});class rB extends rR{constructor(e){super(e,{code:rB.code,name:"InvalidRequestRpcError",shortMessage:"JSON is not a valid request object."})}}Object.defineProperty(rB,"code",{enumerable:!0,configurable:!0,writable:!0,value:-32600});class rM extends rR{constructor(e,{method:t}={}){super(e,{code:rM.code,name:"MethodNotFoundRpcError",shortMessage:`The method${t?` "${t}"`:""} does not exist / is not available.`})}}Object.defineProperty(rM,"code",{enumerable:!0,configurable:!0,writable:!0,value:-32601});class rU extends rR{constructor(e){super(e,{code:rU.code,name:"InvalidParamsRpcError",shortMessage:["Invalid parameters were provided to the RPC method.","Double check you have provided the correct parameters."].join(`
`)})}}Object.defineProperty(rU,"code",{enumerable:!0,configurable:!0,writable:!0,value:-32602});class rz extends rR{constructor(e){super(e,{code:rz.code,name:"InternalRpcError",shortMessage:"An internal error was received."})}}Object.defineProperty(rz,"code",{enumerable:!0,configurable:!0,writable:!0,value:-32603});class rD extends rR{constructor(e){super(e,{code:rD.code,name:"InvalidInputRpcError",shortMessage:["Missing or invalid parameters.","Double check you have provided the correct parameters."].join(`
`)})}}Object.defineProperty(rD,"code",{enumerable:!0,configurable:!0,writable:!0,value:-32e3});class rj extends rR{constructor(e){super(e,{code:rj.code,name:"ResourceNotFoundRpcError",shortMessage:"Requested resource not found."}),Object.defineProperty(this,"name",{enumerable:!0,configurable:!0,writable:!0,value:"ResourceNotFoundRpcError"})}}Object.defineProperty(rj,"code",{enumerable:!0,configurable:!0,writable:!0,value:-32001});class rW extends rR{constructor(e){super(e,{code:rW.code,name:"ResourceUnavailableRpcError",shortMessage:"Requested resource not available."})}}Object.defineProperty(rW,"code",{enumerable:!0,configurable:!0,writable:!0,value:-32002});class rH extends rR{constructor(e){super(e,{code:rH.code,name:"TransactionRejectedRpcError",shortMessage:"Transaction creation failed."})}}Object.defineProperty(rH,"code",{enumerable:!0,configurable:!0,writable:!0,value:-32003});class rF extends rR{constructor(e,{method:t}={}){super(e,{code:rF.code,name:"MethodNotSupportedRpcError",shortMessage:`Method${t?` "${t}"`:""} is not supported.`})}}Object.defineProperty(rF,"code",{enumerable:!0,configurable:!0,writable:!0,value:-32004});class rV extends rR{constructor(e){super(e,{code:rV.code,name:"LimitExceededRpcError",shortMessage:"Request exceeds defined limit."})}}Object.defineProperty(rV,"code",{enumerable:!0,configurable:!0,writable:!0,value:-32005});class rZ extends rR{constructor(e){super(e,{code:rZ.code,name:"JsonRpcVersionUnsupportedError",shortMessage:"Version of JSON-RPC protocol is not supported."})}}Object.defineProperty(rZ,"code",{enumerable:!0,configurable:!0,writable:!0,value:-32006});class rq extends r${constructor(e){super(e,{code:rq.code,name:"UserRejectedRequestError",shortMessage:"User rejected the request."})}}Object.defineProperty(rq,"code",{enumerable:!0,configurable:!0,writable:!0,value:4001});class rG extends r${constructor(e){super(e,{code:rG.code,name:"UnauthorizedProviderError",shortMessage:"The requested method and/or account has not been authorized by the user."})}}Object.defineProperty(rG,"code",{enumerable:!0,configurable:!0,writable:!0,value:4100});class rK extends r${constructor(e,{method:t}={}){super(e,{code:rK.code,name:"UnsupportedProviderMethodError",shortMessage:`The Provider does not support the requested method${t?` " ${t}"`:""}.`})}}Object.defineProperty(rK,"code",{enumerable:!0,configurable:!0,writable:!0,value:4200});class rY extends r${constructor(e){super(e,{code:rY.code,name:"ProviderDisconnectedError",shortMessage:"The Provider is disconnected from all chains."})}}Object.defineProperty(rY,"code",{enumerable:!0,configurable:!0,writable:!0,value:4900});class rX extends r${constructor(e){super(e,{code:rX.code,name:"ChainDisconnectedError",shortMessage:"The Provider is not connected to the requested chain."})}}Object.defineProperty(rX,"code",{enumerable:!0,configurable:!0,writable:!0,value:4901});class rJ extends r${constructor(e){super(e,{code:rJ.code,name:"SwitchChainError",shortMessage:"An error occurred when attempting to switch chain."})}}Object.defineProperty(rJ,"code",{enumerable:!0,configurable:!0,writable:!0,value:4902});class rQ extends r${constructor(e){super(e,{code:rQ.code,name:"UnsupportedNonOptionalCapabilityError",shortMessage:"This Wallet does not support a capability that was not marked as optional."})}}Object.defineProperty(rQ,"code",{enumerable:!0,configurable:!0,writable:!0,value:5700});class r0 extends r${constructor(e){super(e,{code:r0.code,name:"UnsupportedChainIdError",shortMessage:"This Wallet does not support the requested chain ID."})}}Object.defineProperty(r0,"code",{enumerable:!0,configurable:!0,writable:!0,value:5710});class r1 extends r${constructor(e){super(e,{code:r1.code,name:"DuplicateIdError",shortMessage:"There is already a bundle submitted with this ID."})}}Object.defineProperty(r1,"code",{enumerable:!0,configurable:!0,writable:!0,value:5720});class r2 extends r${constructor(e){super(e,{code:r2.code,name:"UnknownBundleIdError",shortMessage:"This bundle id is unknown / has not been submitted"})}}Object.defineProperty(r2,"code",{enumerable:!0,configurable:!0,writable:!0,value:5730});class r3 extends r${constructor(e){super(e,{code:r3.code,name:"BundleTooLargeError",shortMessage:"The call bundle is too large for the Wallet to process."})}}Object.defineProperty(r3,"code",{enumerable:!0,configurable:!0,writable:!0,value:5740});class r5 extends r${constructor(e){super(e,{code:r5.code,name:"AtomicReadyWalletRejectedUpgradeError",shortMessage:"The Wallet can support atomicity after an upgrade, but the user rejected the upgrade."})}}Object.defineProperty(r5,"code",{enumerable:!0,configurable:!0,writable:!0,value:5750});class r4 extends r${constructor(e){super(e,{code:r4.code,name:"AtomicityNotSupportedError",shortMessage:"The wallet does not support atomic execution but the request requires it."})}}Object.defineProperty(r4,"code",{enumerable:!0,configurable:!0,writable:!0,value:5760});class r6 extends rR{constructor(e){super(e,{name:"UnknownRpcError",shortMessage:"An unknown RPC error occurred."})}}function r8(e,t="hex"){let r=function e(t){return Array.isArray(t)?function(e){let t=e.reduce((e,t)=>e+t.length,0),r=r9(t);return{length:t<=55?1+t:1+r+t,encode(i){for(let{encode:a}of(t<=55?i.pushByte(192+t):(i.pushByte(247+r),1===r?i.pushUint8(t):2===r?i.pushUint16(t):3===r?i.pushUint24(t):i.pushUint32(t)),e))a(i)}}}(t.map(t=>e(t))):function(e){let t="string"==typeof e?tB(e):e,r=r9(t.length);return{length:1===t.length&&t[0]<128?1:t.length<=55?1+t.length:1+r+t.length,encode(e){1===t.length&&t[0]<128||(t.length<=55?e.pushByte(128+t.length):(e.pushByte(183+r),1===r?e.pushUint8(t.length):2===r?e.pushUint16(t.length):3===r?e.pushUint24(t.length):e.pushUint32(t.length))),e.pushBytes(t)}}}(t)}(e),i=rC(new Uint8Array(r.length));return r.encode(i),"hex"===t?tS(i.bytes):i.bytes}function r9(e){if(e<256)return 1;if(e<65536)return 2;if(e<16777216)return 3;if(e<4294967296)return 4;throw new tw("Length is too large.")}class r7 extends tw{constructor({cause:e,message:t}={}){let r=t?.replace("execution reverted: ","")?.replace("execution reverted","");super(`Execution reverted ${r?`with reason: ${r}`:"for an unknown reason"}.`,{cause:e,name:"ExecutionRevertedError"})}}Object.defineProperty(r7,"code",{enumerable:!0,configurable:!0,writable:!0,value:3}),Object.defineProperty(r7,"nodeMessage",{enumerable:!0,configurable:!0,writable:!0,value:/execution reverted/});class ie extends tw{constructor({cause:e,maxFeePerGas:t}={}){super(`The fee cap (\`maxFeePerGas\`${t?` = ${rA(t)} gwei`:""}) cannot be higher than the maximum allowed value (2^256-1).`,{cause:e,name:"FeeCapTooHighError"})}}Object.defineProperty(ie,"nodeMessage",{enumerable:!0,configurable:!0,writable:!0,value:/max fee per gas higher than 2\^256-1|fee cap higher than 2\^256-1/});class it extends tw{constructor({cause:e,maxPriorityFeePerGas:t,maxFeePerGas:r}={}){super([`The provided tip (\`maxPriorityFeePerGas\`${t?` = ${rA(t)} gwei`:""}) cannot be higher than the fee cap (\`maxFeePerGas\`${r?` = ${rA(r)} gwei`:""}).`].join(`
`),{cause:e,name:"TipAboveFeeCapError"})}}function ir(e,t){return({exclude:r,format:i})=>({exclude:r,format:e=>{let a=t(e);if(r)for(let e of r)delete a[e];return{...a,...i(e)}},type:e})}Object.defineProperty(it,"nodeMessage",{enumerable:!0,configurable:!0,writable:!0,value:/max priority fee per gas higher than max fee per gas|tip higher than fee cap/});let ii={legacy:"0x0",eip2930:"0x1",eip1559:"0x2",eip4844:"0x3",eip7702:"0x4"},ia=ir("transactionRequest",function(e){let t={};return"u">typeof e.authorizationList&&(t.authorizationList=e.authorizationList.map(e=>({address:e.address,r:e.r?t_(BigInt(e.r)):e.r,s:e.s?t_(BigInt(e.s)):e.s,chainId:t_(e.chainId),nonce:t_(e.nonce),..."u">typeof e.yParity?{yParity:t_(e.yParity)}:{},..."u">typeof e.v&&typeof e.yParity>"u"?{v:t_(e.v)}:{}}))),"u">typeof e.accessList&&(t.accessList=e.accessList),"u">typeof e.blobVersionedHashes&&(t.blobVersionedHashes=e.blobVersionedHashes),"u">typeof e.blobs&&("string"!=typeof e.blobs[0]?t.blobs=e.blobs.map(e=>tS(e)):t.blobs=e.blobs),"u">typeof e.data&&(t.data=e.data),"u">typeof e.from&&(t.from=e.from),"u">typeof e.gas&&(t.gas=t_(e.gas)),"u">typeof e.gasPrice&&(t.gasPrice=t_(e.gasPrice)),"u">typeof e.maxFeePerBlobGas&&(t.maxFeePerBlobGas=t_(e.maxFeePerBlobGas)),"u">typeof e.maxFeePerGas&&(t.maxFeePerGas=t_(e.maxFeePerGas)),"u">typeof e.maxPriorityFeePerGas&&(t.maxPriorityFeePerGas=t_(e.maxPriorityFeePerGas)),"u">typeof e.nonce&&(t.nonce=t_(e.nonce)),"u">typeof e.to&&(t.to=e.to),"u">typeof e.type&&(t.type=ii[e.type]),"u">typeof e.value&&(t.value=t_(e.value)),t}),io=2n**256n-1n,is={"0x0":"legacy","0x1":"eip2930","0x2":"eip1559","0x3":"eip4844","0x4":"eip7702"};function il(e){let t={...e,blockHash:e.blockHash?e.blockHash:null,blockNumber:e.blockNumber?BigInt(e.blockNumber):null,chainId:e.chainId?tA(e.chainId):void 0,gas:e.gas?BigInt(e.gas):void 0,gasPrice:e.gasPrice?BigInt(e.gasPrice):void 0,maxFeePerBlobGas:e.maxFeePerBlobGas?BigInt(e.maxFeePerBlobGas):void 0,maxFeePerGas:e.maxFeePerGas?BigInt(e.maxFeePerGas):void 0,maxPriorityFeePerGas:e.maxPriorityFeePerGas?BigInt(e.maxPriorityFeePerGas):void 0,nonce:e.nonce?tA(e.nonce):void 0,to:e.to?e.to:null,transactionIndex:e.transactionIndex?Number(e.transactionIndex):null,type:e.type?is[e.type]:void 0,typeHex:e.type?e.type:void 0,value:e.value?BigInt(e.value):void 0,v:e.v?BigInt(e.v):void 0};return e.authorizationList&&(t.authorizationList=e.authorizationList.map(e=>({address:e.address,chainId:Number(e.chainId),nonce:Number(e.nonce),r:e.r,s:e.s,yParity:Number(e.yParity)}))),t.yParity=(()=>{if(e.yParity)return Number(e.yParity);if("bigint"==typeof t.v){if(0n===t.v||27n===t.v)return 0;if(1n===t.v||28n===t.v)return 1;if(t.v>=35n)return t.v%2n===0n?1:0}})(),"legacy"===t.type&&(delete t.accessList,delete t.maxFeePerBlobGas,delete t.maxFeePerGas,delete t.maxPriorityFeePerGas,delete t.yParity),"eip2930"===t.type&&(delete t.maxFeePerBlobGas,delete t.maxFeePerGas,delete t.maxPriorityFeePerGas),"eip1559"===t.type&&delete t.maxFeePerBlobGas,t}let ic=ir("transaction",il),id=ir("block",function(e){let t=(e.transactions??[]).map(e=>"string"==typeof e?e:il(e));return{...e,baseFeePerGas:e.baseFeePerGas?BigInt(e.baseFeePerGas):null,blobGasUsed:e.blobGasUsed?BigInt(e.blobGasUsed):void 0,difficulty:e.difficulty?BigInt(e.difficulty):void 0,excessBlobGas:e.excessBlobGas?BigInt(e.excessBlobGas):void 0,gasLimit:e.gasLimit?BigInt(e.gasLimit):void 0,gasUsed:e.gasUsed?BigInt(e.gasUsed):void 0,hash:e.hash?e.hash:null,logsBloom:e.logsBloom?e.logsBloom:null,nonce:e.nonce?e.nonce:null,number:e.number?BigInt(e.number):null,size:e.size?BigInt(e.size):void 0,timestamp:e.timestamp?BigInt(e.timestamp):void 0,transactions:t,totalDifficulty:e.totalDifficulty?BigInt(e.totalDifficulty):null}});function iu(e){let{kzg:t}=e,r=e.to??("string"==typeof e.blobs[0]?"hex":"bytes"),i="string"==typeof e.blobs[0]?e.blobs.map(e=>tB(e)):e.blobs,a=[];for(let e of i)a.push(Uint8Array.from(t.blobToKzgCommitment(e)));return"bytes"===r?a:a.map(e=>tS(e))}function ih(e){let{kzg:t}=e,r=e.to??("string"==typeof e.blobs[0]?"hex":"bytes"),i="string"==typeof e.blobs[0]?e.blobs.map(e=>tB(e)):e.blobs,a="string"==typeof e.commitments[0]?e.commitments.map(e=>tB(e)):e.commitments,o=[];for(let e=0;e<i.length;e++){let r=i[e],n=a[e];o.push(Uint8Array.from(t.computeBlobKzgProof(r,n)))}return"bytes"===r?o:o.map(e=>tS(e))}class ip extends t0{constructor(e,t,r,i){super(),this.blockLen=e,this.outputLen=t,this.padOffset=r,this.isLE=i,this.finished=!1,this.length=0,this.pos=0,this.destroyed=!1,this.buffer=new Uint8Array(e),this.view=tK(this.buffer)}update(e){tD(this);let{view:t,buffer:r,blockLen:i}=this,a=(e=tQ(e)).length;for(let o=0;o<a;){let n=Math.min(i-this.pos,a-o);if(n===i){let t=tK(e);for(;i<=a-o;o+=i)this.process(t,o);continue}r.set(e.subarray(o,o+n),this.pos),this.pos+=n,o+=n,this.pos===i&&(this.process(t,0),this.pos=0)}return this.length+=e.length,this.roundClean(),this}digestInto(e){tD(this),tj(e,this),this.finished=!0;let{buffer:t,view:r,blockLen:i,isLE:a}=this,{pos:o}=this;t[o++]=128,this.buffer.subarray(o).fill(0),this.padOffset>i-o&&(this.process(r,0),o=0);for(let e=o;e<i;e++)t[e]=0;(function(e,t,r,i){if("function"==typeof e.setBigUint64)return e.setBigUint64(t,r,i);let a=BigInt(32),o=BigInt(4294967295),n=Number(r>>a&o),s=Number(r&o),l=i?4:0,c=i?0:4;e.setUint32(t+l,n,i),e.setUint32(t+c,s,i)})(r,i-8,BigInt(8*this.length),a),this.process(r,0);let n=tK(e),s=this.outputLen;if(s%4)throw Error("_sha2: outputLen should be aligned to 32bit");let l=s/4,c=this.get();if(l>c.length)throw Error("_sha2: outputLen bigger than state");for(let e=0;e<l;e++)n.setUint32(4*e,c[e],a)}digest(){let{buffer:e,outputLen:t}=this;this.digestInto(e);let r=e.slice(0,t);return this.destroy(),r}_cloneInto(e){e||(e=new this.constructor),e.set(...this.get());let{blockLen:t,buffer:r,length:i,finished:a,destroyed:o,pos:n}=this;return e.length=i,e.pos=n,e.finished=a,e.destroyed=o,i%t&&e.buffer.set(r),e}}let ig=new Uint32Array([1116352408,1899447441,3049323471,3921009573,961987163,1508970993,2453635748,2870763221,3624381080,310598401,607225278,1426881987,1925078388,2162078206,2614888103,3248222580,3835390401,4022224774,264347078,604807628,770255983,1249150122,1555081692,1996064986,2554220882,2821834349,2952996808,3210313671,3336571891,3584528711,113926993,338241895,666307205,773529912,1294757372,1396182291,1695183700,1986661051,2177026350,2456956037,2730485921,2820302411,3259730800,3345764771,3516065817,3600352804,4094571909,275423344,430227734,506948616,659060556,883997877,958139571,1322822218,1537002063,1747873779,1955562222,2024104815,2227730452,2361852424,2428436474,2756734187,3204031479,3329325298]),iw=new Uint32Array([1779033703,3144134277,1013904242,2773480762,1359893119,2600822924,528734635,1541459225]),im=new Uint32Array(64);class iv extends ip{constructor(){super(64,32,8,!1),this.A=0|iw[0],this.B=0|iw[1],this.C=0|iw[2],this.D=0|iw[3],this.E=0|iw[4],this.F=0|iw[5],this.G=0|iw[6],this.H=0|iw[7]}get(){let{A:e,B:t,C:r,D:i,E:a,F:o,G:n,H:s}=this;return[e,t,r,i,a,o,n,s]}set(e,t,r,i,a,o,n,s){this.A=0|e,this.B=0|t,this.C=0|r,this.D=0|i,this.E=0|a,this.F=0|o,this.G=0|n,this.H=0|s}process(e,t){for(let r=0;r<16;r++,t+=4)im[r]=e.getUint32(t,!1);for(let e=16;e<64;e++){let t=im[e-15],r=im[e-2],i=tY(t,7)^tY(t,18)^t>>>3,a=tY(r,17)^tY(r,19)^r>>>10;im[e]=a+im[e-7]+i+im[e-16]|0}let{A:r,B:i,C:a,D:o,E:n,F:s,G:l,H:c}=this;for(let e=0;e<64;e++){var d,u,h,p;let t=c+(tY(n,6)^tY(n,11)^tY(n,25))+((d=n)&s^~d&l)+ig[e]+im[e]|0,g=(tY(r,2)^tY(r,13)^tY(r,22))+((u=r)&(h=i)^u&(p=a)^h&p)|0;c=l,l=s,s=n,n=o+t|0,o=a,a=i,i=r,r=t+g|0}r=r+this.A|0,i=i+this.B|0,a=a+this.C|0,o=o+this.D|0,n=n+this.E|0,s=s+this.F|0,l=l+this.G|0,c=c+this.H|0,this.set(r,i,a,o,n,s,l,c)}roundClean(){im.fill(0)}destroy(){this.set(0,0,0,0,0,0,0,0),this.buffer.fill(0)}}let ib=t1(()=>new iv);class iy extends tw{constructor({maxSize:e,size:t}){super("Blob size is too large.",{metaMessages:[`Max: ${e} bytes`,`Given: ${t} bytes`],name:"BlobSizeTooLargeError"})}}class iC extends tw{constructor(){super("Blob data must not be empty.",{name:"EmptyBlobError"})}}class ix extends tw{constructor({hash:e,size:t}){super(`Versioned hash "${e}" size is invalid.`,{metaMessages:["Expected: 32",`Received: ${t}`],name:"InvalidVersionedHashSizeError"})}}class iE extends tw{constructor({hash:e,version:t}){super(`Versioned hash "${e}" version is invalid.`,{metaMessages:["Expected: 1",`Received: ${t}`],name:"InvalidVersionedHashVersionError"})}}class ik extends tw{constructor({chainId:e}){super("number"==typeof e?`Chain ID "${e}" is invalid.`:"Chain ID is invalid.",{name:"InvalidChainIdError"})}}let iA=new Map;async function iN(e){return new Promise(t=>setTimeout(t,e))}new rc(128);let iI=256,iS,i_=new rc(8192);function iT({key:e,methods:t,name:r,request:i,retryCount:a=3,retryDelay:o=150,timeout:n,type:s},l){return{config:{key:e,methods:t,name:r,request:i,retryCount:a,retryDelay:o,timeout:n,type:s},request:function(e,t={}){return async(r,i={})=>{let{dedupe:a=!1,methods:o,retryDelay:n=150,retryCount:s=3,uid:l}={...t,...i},{method:c}=r;if(o?.exclude?.includes(c)||o?.include&&!o.include.includes(c))throw new rF(Error("method not supported"),{method:c});let d=a?tO(`${l}.${rx(r)}`):void 0;return function(e,{enabled:t=!0,id:r}){if(!t||!r)return e();if(i_.get(r))return i_.get(r);let i=e().finally(()=>i_.delete(r));return i_.set(r,i),i}(()=>(function(e,{delay:t=100,retryCount:r=2,shouldRetry:i=()=>!0}={}){return new Promise((a,o)=>{let n=async({count:s=0}={})=>{let l=async({error:e})=>{let r="function"==typeof t?t({count:s,error:e}):t;r&&await iN(r),n({count:s+1})};try{let t=await e();a(t)}catch(e){if(s<r&&await i({count:s,error:e}))return l({error:e});o(e)}};n()})})(async()=>{try{return await e(r)}catch(e){switch(e.code){case rL.code:throw new rL(e);case rB.code:throw new rB(e);case rM.code:throw new rM(e,{method:r.method});case rU.code:throw new rU(e);case rz.code:throw new rz(e);case rD.code:throw new rD(e);case rj.code:throw new rj(e);case rW.code:throw new rW(e);case rH.code:throw new rH(e);case rF.code:throw new rF(e,{method:r.method});case rV.code:throw new rV(e);case rZ.code:throw new rZ(e);case rq.code:throw new rq(e);case rG.code:throw new rG(e);case rK.code:throw new rK(e);case rY.code:throw new rY(e);case rX.code:throw new rX(e);case rJ.code:throw new rJ(e);case rQ.code:throw new rQ(e);case r0.code:throw new r0(e);case r1.code:throw new r1(e);case r2.code:throw new r2(e);case r3.code:throw new r3(e);case r5.code:throw new r5(e);case r4.code:throw new r4(e);case 5e3:throw new rq(e);default:throw e instanceof tw?e:new r6(e)}}},{delay:({count:e,error:t})=>{if(t&&t instanceof rT){let e=t?.headers?.get("Retry-After");if(e?.match(/\d/))return 1e3*Number.parseInt(e)}return~~(1<<e)*n},retryCount:s,shouldRetry:({error:e})=>"code"in e&&"number"==typeof e.code?-1===e.code||e.code===rV.code||e.code===rz.code:!(e instanceof rT)||!e.status||403===e.status||408===e.status||413===e.status||429===e.status||500===e.status||502===e.status||503===e.status||504===e.status}),{enabled:a,id:d})}}(i,{methods:t,retryCount:a,retryDelay:o,uid:function(e=11){if(!iS||iI+e>512){iS="",iI=0;for(let e=0;e<256;e++)iS+=(256+256*Math.random()|0).toString(16).substring(1)}return iS.substring(iI,iI+++e)}()}),value:l}}function iO(e,t={}){let{key:r="fallback",name:i="Fallback",rank:a=!1,shouldThrow:o=iP,retryCount:n,retryDelay:s}=t;return({chain:t,pollingInterval:l=4e3,timeout:c,...d})=>{let u=e,h=()=>{},p=iT({key:r,name:i,async request({method:e,params:r}){let i;let a=async(n=0)=>{let s=u[n]({...d,chain:t,retryCount:0,timeout:c});try{let t=await s.request({method:e,params:r});return h({method:e,params:r,response:t,transport:s,status:"success"}),t}catch(l){if(h({error:l,method:e,params:r,transport:s,status:"error"}),o(l)||n===u.length-1||!(i??=u.slice(n+1).some(r=>{let{include:i,exclude:a}=r({chain:t}).config.methods||{};return i?i.includes(e):!a||!a.includes(e)})))throw l;return a(n+1)}};return a()},retryCount:n,retryDelay:s,type:"fallback"},{onResponse:e=>h=e,transports:u.map(e=>e({chain:t,retryCount:0}))});if(a){let e="object"==typeof a?a:{};!function({chain:e,interval:t=4e3,onTransports:r,ping:i,sampleCount:a=10,timeout:o=1e3,transports:n,weights:s={}}){let{stability:l=.7,latency:c=.3}=s,d=[],u=async()=>{let s=await Promise.all(n.map(async t=>{let r,a;let n=t({chain:e,retryCount:0,timeout:o}),s=Date.now();try{await (i?i({transport:n}):n.request({method:"net_listening"})),a=1}catch{a=0}finally{r=Date.now()}return{latency:r-s,success:a}}));d.push(s),d.length>a&&d.shift();let h=Math.max(...d.map(e=>Math.max(...e.map(({latency:e})=>e))));r(n.map((e,t)=>{let r=d.map(e=>e[t].latency),i=1-r.reduce((e,t)=>e+t,0)/r.length/h,a=d.map(e=>e[t].success),o=a.reduce((e,t)=>e+t,0)/a.length;return 0===o?[0,t]:[c*i+l*o,t]}).sort((e,t)=>t[0]-e[0]).map(([,e])=>n[e])),await iN(t),u()};u()}({chain:t,interval:e.interval??l,onTransports:e=>u=e,ping:e.ping,sampleCount:e.sampleCount,timeout:e.timeout,transports:u,weights:e.weights})}return p}}function iP(e){return!!("code"in e&&"number"==typeof e.code&&(e.code===rH.code||e.code===rq.code||r7.nodeMessage.test(e.message)||5e3===e.code))}class iR extends tw{constructor(){super("No URL was provided to the Transport. Please provide a valid RPC URL to the Transport.",{docsPath:"/docs/clients/intro",name:"UrlRequiredError"})}}let i$={current:0,take(){return this.current++},reset(){this.current=0}};function iL(e,t={}){let{batch:r,fetchOptions:i,key:a="http",methods:o,name:n="HTTP JSON-RPC",onFetchRequest:s,onFetchResponse:l,retryDelay:c,raw:d}=t;return({chain:u,retryCount:h,timeout:p})=>{let{batchSize:g=1e3,wait:f=0}="object"==typeof r?r:{},w=t.retryCount??h,m=p??t.timeout??1e4,v=e||u?.rpcUrls.default.http[0];if(!v)throw new iR;let b=function(e,t={}){return{async request(r){let{body:i,onRequest:a=t.onRequest,onResponse:o=t.onResponse,timeout:n=t.timeout??1e4}=r,s={...t.fetchOptions??{},...r.fetchOptions??{}},{headers:l,method:c,signal:d}=s;try{let t;let r=await function(e,{errorInstance:t=Error("timed out"),timeout:r,signal:i}){return new Promise((a,o)=>{(async()=>{let n;try{let s=new AbortController;r>0&&(n=setTimeout(()=>{i?s.abort():o(t)},r)),a(await e({signal:s?.signal||null}))}catch(e){e?.name==="AbortError"&&o(t),o(e)}finally{clearTimeout(n)}})()})}(async({signal:t})=>{let r={...s,body:Array.isArray(i)?rx(i.map(e=>({jsonrpc:"2.0",id:e.id??i$.take(),...e}))):rx({jsonrpc:"2.0",id:i.id??i$.take(),...i}),headers:{"Content-Type":"application/json",...l},method:c||"POST",signal:d||(n>0?t:null)},o=new Request(e,r),u=await a?.(o,r)??{...r,url:e};return await fetch(u.url??e,u)},{errorInstance:new rP({body:i,url:e}),timeout:n,signal:!0});if(o&&await o(r),r.headers.get("Content-Type")?.startsWith("application/json"))t=await r.json();else{t=await r.text();try{t=JSON.parse(t||"{}")}catch(e){if(r.ok)throw e;t={error:t}}}if(!r.ok)throw new rT({body:i,details:rx(t.error)||r.statusText,headers:r.headers,status:r.status,url:e});return t}catch(t){throw t instanceof rT||t instanceof rP?t:new rT({body:i,cause:t,url:e})}}}}(v,{fetchOptions:i,onRequest:s,onResponse:l,timeout:m});return iT({key:a,methods:o,name:n,async request({method:e,params:t}){let i={method:e,params:t},{schedule:a}=function({fn:e,id:t,shouldSplitBatch:r,wait:i=0,sort:a}){let o=async()=>{let t=l();n();let r=t.map(({args:e})=>e);0!==r.length&&e(r).then(e=>{a&&Array.isArray(e)&&e.sort(a);for(let r=0;r<t.length;r++){let{resolve:i}=t[r];i?.([e[r],e])}}).catch(e=>{for(let r=0;r<t.length;r++){let{reject:i}=t[r];i?.(e)}})},n=()=>iA.delete(t),s=()=>l().map(({args:e})=>e),l=()=>iA.get(t)||[],c=e=>iA.set(t,[...l(),e]);return{flush:n,async schedule(e){let t,a;let{promise:n,resolve:d,reject:u}=(t=()=>{},a=()=>{},{promise:new Promise((e,r)=>{t=e,a=r}),resolve:t,reject:a});return r?.([...s(),e])&&o(),l().length>0?c({args:e,resolve:d,reject:u}):(c({args:e,resolve:d,reject:u}),setTimeout(o,i)),n}}}({id:v,wait:f,shouldSplitBatch:e=>e.length>g,fn:e=>b.request({body:e}),sort:(e,t)=>e.id-t.id}),o=async e=>r?a(e):[await b.request({body:e})],[{error:n,result:s}]=await o(i);if(d)return{error:n,result:s};if(n)throw new rO({body:i,error:n,url:v});return s},retryCount:w,retryDelay:c,timeout:m,type:"http"},{fetchOptions:i,url:v})}}function iB(e){return{formatters:void 0,fees:void 0,serializers:void 0,...e}}function iM(e){let{chainId:t,maxPriorityFeePerGas:r,maxFeePerGas:i,to:a}=e;if(t<=0)throw new ik({chainId:t});if(a&&!rp(a))throw new rl({address:a});if(i&&i>io)throw new ie({maxFeePerGas:i});if(r&&i&&r>i)throw new it({maxFeePerGas:i,maxPriorityFeePerGas:r})}function iU(e){if(!e||0===e.length)return[];let t=[];for(let r=0;r<e.length;r++){let{address:i,storageKeys:a}=e[r];for(let e=0;e<a.length;e++)if(a[e].length-2!=64)throw new rS({storageKey:a[e]});if(!rp(i,{strict:!1}))throw new rl({address:i});t.push([i,a])}return t}function iz(e,t){let r=t??e,{v:i,yParity:a}=r;if(typeof r.r>"u"||typeof r.s>"u"||typeof i>"u"&&typeof a>"u")return[];let o=tx(r.r),n=tx(r.s);return["number"==typeof a?a?tI(1):"0x":0n===i?"0x":1n===i?tI(1):27n===i?"0x":tI(1),"0x00"===o?"0x":o,"0x00"===n?"0x":n]}let iD={"0x0":"reverted","0x1":"success"},ij=ir("transactionReceipt",function(e){let t={...e,blockNumber:e.blockNumber?BigInt(e.blockNumber):null,contractAddress:e.contractAddress?e.contractAddress:null,cumulativeGasUsed:e.cumulativeGasUsed?BigInt(e.cumulativeGasUsed):null,effectiveGasPrice:e.effectiveGasPrice?BigInt(e.effectiveGasPrice):null,gasUsed:e.gasUsed?BigInt(e.gasUsed):null,logs:e.logs?e.logs.map(e=>(function(e,{args:t,eventName:r}={}){return{...e,blockHash:e.blockHash?e.blockHash:null,blockNumber:e.blockNumber?BigInt(e.blockNumber):null,logIndex:e.logIndex?Number(e.logIndex):null,transactionHash:e.transactionHash?e.transactionHash:null,transactionIndex:e.transactionIndex?Number(e.transactionIndex):null,...r?{args:t,eventName:r}:{}}})(e)):null,to:e.to?e.to:null,transactionIndex:e.transactionIndex?tA(e.transactionIndex):null,status:e.status?iD[e.status]:null,type:e.type?is[e.type]||e.type:null};return e.blobGasPrice&&(t.blobGasPrice=BigInt(e.blobGasPrice)),e.blobGasUsed&&(t.blobGasUsed=BigInt(e.blobGasUsed)),t}),iW=new Uint8Array([7,4,13,1,10,6,15,3,12,0,9,5,2,14,11,8]),iH=new Uint8Array(Array(16).fill(0).map((e,t)=>t)),iF=iH.map(e=>(9*e+5)%16),iV=[iH],iZ=[iF];for(let e=0;e<4;e++)for(let t of[iV,iZ])t.push(t[e].map(e=>iW[e]));let iq=BigInt(0),iG=BigInt(1),iK=BigInt(2);function iY(e){return e instanceof Uint8Array||ArrayBuffer.isView(e)&&"Uint8Array"===e.constructor.name}function iX(e){if(!iY(e))throw Error("Uint8Array expected")}function iJ(e,t){if("boolean"!=typeof t)throw Error(e+" boolean expected, got "+t)}let iQ=Array.from({length:256},(e,t)=>t.toString(16).padStart(2,"0"));function i0(e){iX(e);let t="";for(let r=0;r<e.length;r++)t+=iQ[e[r]];return t}function i1(e){let t=e.toString(16);return 1&t.length?"0"+t:t}function i2(e){if("string"!=typeof e)throw Error("hex string expected, got "+typeof e);return""===e?iq:BigInt("0x"+e)}let i3={_0:48,_9:57,A:65,F:70,a:97,f:102};function i5(e){return e>=i3._0&&e<=i3._9?e-i3._0:e>=i3.A&&e<=i3.F?e-(i3.A-10):e>=i3.a&&e<=i3.f?e-(i3.a-10):void 0}function i4(e){if("string"!=typeof e)throw Error("hex string expected, got "+typeof e);let t=e.length,r=t/2;if(t%2)throw Error("hex string expected, got unpadded hex of length "+t);let i=new Uint8Array(r);for(let t=0,a=0;t<r;t++,a+=2){let r=i5(e.charCodeAt(a)),o=i5(e.charCodeAt(a+1));if(void 0===r||void 0===o)throw Error('hex string expected, got non-hex character "'+(e[a]+e[a+1])+'" at index '+a);i[t]=16*r+o}return i}function i6(e){return i2(i0(e))}function i8(e){return iX(e),i2(i0(Uint8Array.from(e).reverse()))}function i9(e,t){return i4(e.toString(16).padStart(2*t,"0"))}function i7(e,t){return i9(e,t).reverse()}function ae(e,t,r){let i;if("string"==typeof t)try{i=i4(t)}catch(t){throw Error(e+" must be hex string or Uint8Array, cause: "+t)}else if(iY(t))i=Uint8Array.from(t);else throw Error(e+" must be hex string or Uint8Array");let a=i.length;if("number"==typeof r&&a!==r)throw Error(e+" of length "+r+" expected, got "+a);return i}function at(...e){let t=0;for(let r=0;r<e.length;r++){let i=e[r];iX(i),t+=i.length}let r=new Uint8Array(t);for(let t=0,i=0;t<e.length;t++){let a=e[t];r.set(a,i),i+=a.length}return r}let ar=e=>"bigint"==typeof e&&iq<=e;function ai(e,t,r){return ar(e)&&ar(t)&&ar(r)&&t<=e&&e<r}function aa(e,t,r,i){if(!ai(t,r,i))throw Error("expected valid "+e+": "+r+" <= n < "+i+", got "+t)}function ao(e){let t;for(t=0;e>iq;e>>=iG,t+=1);return t}let an=e=>(iK<<BigInt(e-1))-iG,as=e=>new Uint8Array(e),al=e=>Uint8Array.from(e);function ac(e,t,r){if("number"!=typeof e||e<2)throw Error("hashLen must be a number");if("number"!=typeof t||t<2)throw Error("qByteLen must be a number");if("function"!=typeof r)throw Error("hmacFn must be a function");let i=as(e),a=as(e),o=0,n=()=>{i.fill(1),a.fill(0),o=0},s=(...e)=>r(a,i,...e),l=(e=as())=>{a=s(al([0]),e),i=s(),0!==e.length&&(a=s(al([1]),e),i=s())},c=()=>{if(o++>=1e3)throw Error("drbg: tried 1000 values");let e=0,r=[];for(;e<t;){let t=(i=s()).slice();r.push(t),e+=i.length}return at(...r)};return(e,t)=>{let r;for(n(),l(e);!(r=t(c()));)l();return n(),r}}let ad={bigint:e=>"bigint"==typeof e,function:e=>"function"==typeof e,boolean:e=>"boolean"==typeof e,string:e=>"string"==typeof e,stringOrUint8Array:e=>"string"==typeof e||iY(e),isSafeInteger:e=>Number.isSafeInteger(e),array:e=>Array.isArray(e),field:(e,t)=>t.Fp.isValid(e),hash:e=>"function"==typeof e&&Number.isSafeInteger(e.outputLen)};function au(e,t,r={}){let i=(t,r,i)=>{let a=ad[r];if("function"!=typeof a)throw Error("invalid validator function");let o=e[t];if(!(i&&void 0===o)&&!a(o,e))throw Error("param "+String(t)+" is invalid. Expected "+r+", got "+o)};for(let[e,r]of Object.entries(t))i(e,r,!1);for(let[e,t]of Object.entries(r))i(e,t,!0);return e}function ah(e){let t=new WeakMap;return(r,...i)=>{let a=t.get(r);if(void 0!==a)return a;let o=e(r,...i);return t.set(r,o),o}}var ap=Object.freeze({__proto__:null,isBytes:iY,abytes:iX,abool:iJ,bytesToHex:i0,numberToHexUnpadded:i1,hexToNumber:i2,hexToBytes:i4,bytesToNumberBE:i6,bytesToNumberLE:i8,numberToBytesBE:i9,numberToBytesLE:i7,numberToVarBytesBE:function(e){return i4(i1(e))},ensureBytes:ae,concatBytes:at,equalBytes:function(e,t){if(e.length!==t.length)return!1;let r=0;for(let i=0;i<e.length;i++)r|=e[i]^t[i];return 0===r},utf8ToBytes:function(e){if("string"!=typeof e)throw Error("string expected");return new Uint8Array(new TextEncoder().encode(e))},inRange:ai,aInRange:aa,bitLen:ao,bitGet:function(e,t){return e>>BigInt(t)&iG},bitSet:function(e,t,r){return e|(r?iG:iq)<<BigInt(t)},bitMask:an,createHmacDrbg:ac,validateObject:au,notImplemented:()=>{throw Error("not implemented")},memoized:ah});class ag extends Error{constructor(e,t={}){let r=(()=>{if(t.cause instanceof ag){if(t.cause.details)return t.cause.details;if(t.cause.shortMessage)return t.cause.shortMessage}return t.cause?.message?t.cause.message:t.details})(),i=t.cause instanceof ag&&t.cause.docsPath||t.docsPath,a=`https://oxlib.sh${i??""}`;super([e||"An error occurred.",...t.metaMessages?["",...t.metaMessages]:[],...r||i?["",r?`Details: ${r}`:void 0,i?`See: ${a}`:void 0]:[]].filter(e=>"string"==typeof e).join(`
`),t.cause?{cause:t.cause}:void 0),Object.defineProperty(this,"details",{enumerable:!0,configurable:!0,writable:!0,value:void 0}),Object.defineProperty(this,"docs",{enumerable:!0,configurable:!0,writable:!0,value:void 0}),Object.defineProperty(this,"docsPath",{enumerable:!0,configurable:!0,writable:!0,value:void 0}),Object.defineProperty(this,"shortMessage",{enumerable:!0,configurable:!0,writable:!0,value:void 0}),Object.defineProperty(this,"cause",{enumerable:!0,configurable:!0,writable:!0,value:void 0}),Object.defineProperty(this,"name",{enumerable:!0,configurable:!0,writable:!0,value:"BaseError"}),Object.defineProperty(this,"version",{enumerable:!0,configurable:!0,writable:!0,value:"ox@0.1.1"}),this.cause=t.cause,this.details=r,this.docs=a,this.docsPath=i,this.shortMessage=e}walk(e){return function e(t,r){return r?.(t)?t:t&&"object"==typeof t&&"cause"in t&&t.cause?e(t.cause,r):r?null:t}(this,e)}}let af={zero:48,nine:57,A:65,F:70,a:97,f:102};function aw(e){return e>=af.zero&&e<=af.nine?e-af.zero:e>=af.A&&e<=af.F?e-(af.A-10):e>=af.a&&e<=af.f?e-(af.a-10):void 0}function am(e,t){if(aS(e)>t)throw new aT({givenSize:aS(e),maxSize:t})}function av(e,t={}){let{dir:r,size:i=32}=t;if(0===i)return e;let a=e.replace("0x","");if(a.length>2*i)throw new aO({size:Math.ceil(a.length/2),targetSize:i,type:"Hex"});return`0x${a["right"===r?"padEnd":"padStart"](2*i,"0")}`}let ab=new TextEncoder;class ay extends ag{constructor({givenSize:e,maxSize:t}){super(`Size cannot exceed \`${t}\` bytes. Given size: \`${e}\` bytes.`),Object.defineProperty(this,"name",{enumerable:!0,configurable:!0,writable:!0,value:"Bytes.SizeOverflowError"})}}class aC extends ag{constructor({size:e,targetSize:t,type:r}){super(`${r.charAt(0).toUpperCase()}${r.slice(1).toLowerCase()} size (\`${e}\`) exceeds padding size (\`${t}\`).`),Object.defineProperty(this,"name",{enumerable:!0,configurable:!0,writable:!0,value:"Bytes.SizeExceedsPaddingSizeError"})}}let ax=new TextEncoder,aE=Array.from({length:256},(e,t)=>t.toString(16).padStart(2,"0"));function ak(...e){return`0x${e.reduce((e,t)=>e+t.replace("0x",""),"")}`}function aA(e,t={}){let r="";for(let t=0;t<e.length;t++)r+=aE[e[t]];let i=`0x${r}`;return"number"==typeof t.size?(am(i,t.size),aI(i,t.size)):i}function aN(e,t){return av(e,{dir:"left",size:t})}function aI(e,t){return av(e,{dir:"right",size:t})}function aS(e){return Math.ceil((e.length-2)/2)}class a_ extends ag{constructor({max:e,min:t,signed:r,size:i,value:a}){super(`Number \`${a}\` is not in safe${i?` ${8*i}-bit`:""}${r?" signed":" unsigned"} integer range ${e?`(\`${t}\` to \`${e}\`)`:`(above \`${t}\`)`}`),Object.defineProperty(this,"name",{enumerable:!0,configurable:!0,writable:!0,value:"Hex.IntegerOutOfRangeError"})}}class aT extends ag{constructor({givenSize:e,maxSize:t}){super(`Size cannot exceed \`${t}\` bytes. Given size: \`${e}\` bytes.`),Object.defineProperty(this,"name",{enumerable:!0,configurable:!0,writable:!0,value:"Hex.SizeOverflowError"})}}class aO extends ag{constructor({size:e,targetSize:t,type:r}){super(`${r.charAt(0).toUpperCase()}${r.slice(1).toLowerCase()} size (\`${e}\`) exceeds padding size (\`${t}\`).`),Object.defineProperty(this,"name",{enumerable:!0,configurable:!0,writable:!0,value:"Hex.SizeExceedsPaddingSizeError"})}}class aP extends Map{constructor(e){super(),Object.defineProperty(this,"maxSize",{enumerable:!0,configurable:!0,writable:!0,value:void 0}),this.maxSize=e}get(e){let t=super.get(e);return super.has(e)&&void 0!==t&&(this.delete(e),super.set(e,t)),t}set(e,t){if(super.set(e,t),this.maxSize&&this.size>this.maxSize){let e=this.keys().next().value;e&&this.delete(e)}return this}}let aR={checksum:new aP(8192)}.checksum,a$=/^0x[a-fA-F0-9]{40}$/;class aL extends ag{constructor({address:e,cause:t}){super(`Address "${e}" is invalid.`,{cause:t}),Object.defineProperty(this,"name",{enumerable:!0,configurable:!0,writable:!0,value:"Address.InvalidAddressError"})}}class aB extends ag{constructor(){super("Address is not a 20 byte (40 hexadecimal character) value."),Object.defineProperty(this,"name",{enumerable:!0,configurable:!0,writable:!0,value:"Address.InvalidInputError"})}}class aM extends ag{constructor(){super("Address does not match its checksum counterpart."),Object.defineProperty(this,"name",{enumerable:!0,configurable:!0,writable:!0,value:"Address.InvalidChecksumError"})}}let aU=/^(.*)\[([0-9]*)\]$/,az=/^bytes([1-9]|1[0-9]|2[0-9]|3[0-2])?$/,aD=/^(u?int)(8|16|24|32|40|48|56|64|72|80|88|96|104|112|120|128|136|144|152|160|168|176|184|192|200|208|216|224|232|240|248|256)?$/;function aj(e,t){if(e.length!==t.length)throw new aH({expectedLength:e.length,givenLength:t.length});let r=[];for(let i=0;i<e.length;i++){let a=e[i],o=t[i];r.push(aj.encode(a,o))}return ak(...r)}(aj||(aj={})).encode=function e(t,r,i=!1){if("address"===t)return function e(t,r={}){let{strict:i=!0}=r;if(!a$.test(t))throw new aL({address:t,cause:new aB});if(i){if(t.toLowerCase()===t)return;if(function(t){if(aR.has(t))return aR.get(t);e(t,{strict:!1});let r=t.substring(2).toLowerCase(),i=function(e,t={}){let{as:r="string"==typeof e?"Hex":"Bytes"}=t,i=rs(e instanceof Uint8Array?e:"string"==typeof e?function(e,t={}){let{size:r}=t,i=e;r&&(am(e,r),i=aI(e,r));let a=i.slice(2);a.length%2&&(a=`0${a}`);let o=a.length/2,n=new Uint8Array(o);for(let e=0,t=0;e<o;e++){let r=aw(a.charCodeAt(t++)),i=aw(a.charCodeAt(t++));if(void 0===r||void 0===i)throw new ag(`Invalid byte sequence ("${a[t-2]}${a[t-1]}" in "${a}").`);n[e]=16*r+i}return n}(e):e instanceof Uint8Array?e:new Uint8Array(e));return"Bytes"===r?i:aA(i)}(function(e,t={}){let{size:r}=t,i=ab.encode(e);return"number"==typeof r?(function(e,t){if(e.length>t)throw new ay({givenSize:e.length,maxSize:t})}(i,r),function(e,t={}){let{dir:r,size:i=32}=t;if(0===i)return e;if(e.length>i)throw new aC({size:e.length,targetSize:i,type:"Bytes"});let a=new Uint8Array(i);for(let t=0;t<i;t++){let o="right"===r;a[o?t:i-t-1]=e[o?t:e.length-t-1]}return a}(i,{dir:"right",size:r})):i}(r),{as:"Bytes"}),a=r.split("");for(let e=0;e<40;e+=2)i[e>>1]>>4>=8&&a[e]&&(a[e]=a[e].toUpperCase()),(15&i[e>>1])>=8&&a[e+1]&&(a[e+1]=a[e+1].toUpperCase());let o=`0x${a.join("")}`;return aR.set(t,o),o}(t)!==t)throw new aL({address:t,cause:new aM})}}(r),aN(r.toLowerCase(),i?32:0);if("string"===t)return function(e,t={}){return aA(ax.encode(e),t)}(r);if("bytes"===t)return r;if("bool"===t)return aN(function(e,t={}){let r=`0x${Number(e)}`;return"number"==typeof t.size?(am(r,t.size),aN(r,t.size)):r}(r),i?32:1);let a=t.match(aD);if(a){let[e,t,o="256"]=a,n=Number.parseInt(o)/8;return function(e,t={}){let r;let{signed:i,size:a}=t,o=BigInt(e);a?r=i?(1n<<8n*BigInt(a)-1n)-1n:2n**(8n*BigInt(a))-1n:"number"==typeof e&&(r=BigInt(Number.MAX_SAFE_INTEGER));let n="bigint"==typeof r&&i?-r-1n:0;if(r&&o>r||o<n){let t="bigint"==typeof e?"n":"";throw new a_({max:r?`${r}${t}`:void 0,min:`${n}${t}`,signed:i,size:a,value:`${e}${t}`})}let s=`0x${(i&&o<0?(1n<<BigInt(8*a))+BigInt(o):o).toString(16)}`;return a?aN(s,a):s}(r,{size:i?32:n,signed:"int"===t})}let o=t.match(az);if(o){let[e,t]=o;if(Number.parseInt(t)!==(r.length-2)/2)throw new aW({expectedSize:Number.parseInt(t),value:r});return aI(r,i?32:0)}let n=t.match(aU);if(n&&Array.isArray(r)){let[t,i]=n,a=[];for(let t=0;t<r.length;t++)a.push(e(i,r[t],!0));return 0===a.length?"0x":ak(...a)}throw new aF(t)};class aW extends ag{constructor({expectedSize:e,value:t}){super(`Size of bytes "${t}" (bytes${aS(t)}) does not match expected size (bytes${e}).`),Object.defineProperty(this,"name",{enumerable:!0,configurable:!0,writable:!0,value:"AbiParameters.BytesSizeMismatchError"})}}class aH extends ag{constructor({expectedLength:e,givenLength:t}){super(["ABI encoding parameters/values length mismatch.",`Expected length (parameters): ${e}`,`Given length (values): ${t}`].join(`
`)),Object.defineProperty(this,"name",{enumerable:!0,configurable:!0,writable:!0,value:"AbiParameters.LengthMismatchError"})}}class aF extends ag{constructor(e){super(`Type \`${e}\` is not a valid ABI Type.`),Object.defineProperty(this,"name",{enumerable:!0,configurable:!0,writable:!0,value:"AbiParameters.InvalidTypeError"})}}class aV extends t0{constructor(e,t){super(),this.finished=!1,this.destroyed=!1,function(e){if("function"!=typeof e||"function"!=typeof e.create)throw Error("Hash should be wrapped by utils.wrapConstructor");tU(e.outputLen),tU(e.blockLen)}(e);let r=tQ(t);if(this.iHash=e.create(),"function"!=typeof this.iHash.update)throw Error("Expected instance of class which extends utils.Hash");this.blockLen=this.iHash.blockLen,this.outputLen=this.iHash.outputLen;let i=this.blockLen,a=new Uint8Array(i);a.set(r.length>i?e.create().update(r).digest():r);for(let e=0;e<a.length;e++)a[e]^=54;this.iHash.update(a),this.oHash=e.create();for(let e=0;e<a.length;e++)a[e]^=106;this.oHash.update(a),a.fill(0)}update(e){return tD(this),this.iHash.update(e),this}digestInto(e){tD(this),tz(e,this.outputLen),this.finished=!0,this.iHash.digestInto(e),this.oHash.update(e),this.oHash.digestInto(e),this.destroy()}digest(){let e=new Uint8Array(this.oHash.outputLen);return this.digestInto(e),e}_cloneInto(e){e||(e=Object.create(Object.getPrototypeOf(this),{}));let{oHash:t,iHash:r,finished:i,destroyed:a,blockLen:o,outputLen:n}=this;return e.finished=i,e.destroyed=a,e.blockLen=o,e.outputLen=n,e.oHash=t._cloneInto(e.oHash),e.iHash=r._cloneInto(e.iHash),e}destroy(){this.destroyed=!0,this.oHash.destroy(),this.iHash.destroy()}}let aZ=(e,t,r)=>new aV(e,t).update(r).digest();aZ.create=(e,t)=>new aV(e,t);let aq=BigInt(0),aG=BigInt(1),aK=BigInt(2),aY=BigInt(3),aX=BigInt(4),aJ=BigInt(5),aQ=BigInt(8);function a0(e,t){let r=e%t;return r>=aq?r:t+r}function a1(e,t,r){let i=e;for(;t-- >aq;)i*=i,i%=r;return i}function a2(e,t){if(e===aq)throw Error("invert: expected non-zero number");if(t<=aq)throw Error("invert: expected positive modulus, got "+t);let r=a0(e,t),i=t,a=aq,o=aG;for(;r!==aq;){let e=i/r,t=i%r,n=a-o*e;i=r,r=t,a=o,o=n}if(i!==aG)throw Error("invert: does not exist");return a0(a,t)}let a3=["create","isValid","is0","neg","inv","sqrt","sqr","eql","add","sub","mul","pow","div","addN","subN","mulN","sqrN"];function a5(e,t){let r=void 0!==t?t:e.toString(2).length;return{nBitLength:r,nByteLength:Math.ceil(r/8)}}function a4(e,t,r=!1,i={}){let a;if(e<=aq)throw Error("invalid field: expected ORDER > 0, got "+e);let{nBitLength:o,nByteLength:n}=a5(e,t);if(n>2048)throw Error("invalid field: expected ORDER of <= 2048 bytes");let s=Object.freeze({ORDER:e,isLE:r,BITS:o,BYTES:n,MASK:an(o),ZERO:aq,ONE:aG,create:t=>a0(t,e),isValid:t=>{if("bigint"!=typeof t)throw Error("invalid field element: expected bigint, got "+typeof t);return aq<=t&&t<e},is0:e=>e===aq,isOdd:e=>(e&aG)===aG,neg:t=>a0(-t,e),eql:(e,t)=>e===t,sqr:t=>a0(t*t,e),add:(t,r)=>a0(t+r,e),sub:(t,r)=>a0(t-r,e),mul:(t,r)=>a0(t*r,e),pow:(e,t)=>(function(e,t,r){if(r<aq)throw Error("invalid exponent, negatives unsupported");if(r===aq)return e.ONE;if(r===aG)return t;let i=e.ONE,a=t;for(;r>aq;)r&aG&&(i=e.mul(i,a)),a=e.sqr(a),r>>=aG;return i})(s,e,t),div:(t,r)=>a0(t*a2(r,e),e),sqrN:e=>e*e,addN:(e,t)=>e+t,subN:(e,t)=>e-t,mulN:(e,t)=>e*t,inv:t=>a2(t,e),sqrt:i.sqrt||(t=>(a||(a=function(e){if(e%aX===aY){let t=(e+aG)/aX;return function(e,r){let i=e.pow(r,t);if(!e.eql(e.sqr(i),r))throw Error("Cannot find square root");return i}}if(e%aQ===aJ){let t=(e-aJ)/aQ;return function(e,r){let i=e.mul(r,aK),a=e.pow(i,t),o=e.mul(r,a),n=e.mul(e.mul(o,aK),a),s=e.mul(o,e.sub(n,e.ONE));if(!e.eql(e.sqr(s),r))throw Error("Cannot find square root");return s}}return function(e){let t,r,i;let a=(e-aG)/aK;for(t=e-aG,r=0;t%aK===aq;t/=aK,r++);for(i=aK;i<e&&function(e,t,r){if(t<aq)throw Error("invalid exponent, negatives unsupported");if(r<=aq)throw Error("invalid modulus");if(r===aG)return aq;let i=aG;for(;t>aq;)t&aG&&(i=i*e%r),e=e*e%r,t>>=aG;return i}(i,a,e)!==e-aG;i++)if(i>1e3)throw Error("Cannot find square root: likely non-prime P");if(1===r){let t=(e+aG)/aX;return function(e,r){let i=e.pow(r,t);if(!e.eql(e.sqr(i),r))throw Error("Cannot find square root");return i}}let o=(t+aG)/aK;return function(e,n){if(e.pow(n,a)===e.neg(e.ONE))throw Error("Cannot find square root");let s=r,l=e.pow(e.mul(e.ONE,i),t),c=e.pow(n,o),d=e.pow(n,t);for(;!e.eql(d,e.ONE);){if(e.eql(d,e.ZERO))return e.ZERO;let t=1;for(let r=e.sqr(d);t<s&&!e.eql(r,e.ONE);t++)r=e.sqr(r);let r=e.pow(l,aG<<BigInt(s-t-1));l=e.sqr(r),c=e.mul(c,r),d=e.mul(d,l),s=t}return c}}(e)}(e)),a(s,t))),invertBatch:e=>(function(e,t){let r=Array(t.length),i=t.reduce((t,i,a)=>e.is0(i)?t:(r[a]=t,e.mul(t,i)),e.ONE),a=e.inv(i);return t.reduceRight((t,i,a)=>e.is0(i)?t:(r[a]=e.mul(t,r[a]),e.mul(t,i)),a),r})(s,e),cmov:(e,t,r)=>r?t:e,toBytes:e=>r?i7(e,n):i9(e,n),fromBytes:e=>{if(e.length!==n)throw Error("Field.fromBytes: expected "+n+" bytes, got "+e.length);return r?i8(e):i6(e)}});return Object.freeze(s)}function a6(e){if("bigint"!=typeof e)throw Error("field order must be bigint");return Math.ceil(e.toString(2).length/8)}function a8(e){let t=a6(e);return t+Math.ceil(t/2)}let a9=BigInt(0),a7=BigInt(1);function oe(e,t){let r=t.negate();return e?r:t}function ot(e,t){if(!Number.isSafeInteger(e)||e<=0||e>t)throw Error("invalid window size, expected [1.."+t+"], got W="+e)}function or(e,t){return ot(e,t),{windows:Math.ceil(t/e)+1,windowSize:2**(e-1)}}let oi=new WeakMap,oa=new WeakMap;function oo(e){return oa.get(e)||1}function on(e){return au(e.Fp,a3.reduce((e,t)=>(e[t]="function",e),{ORDER:"bigint",MASK:"bigint",BYTES:"isSafeInteger",BITS:"isSafeInteger"})),au(e,{n:"bigint",h:"bigint",Gx:"field",Gy:"field"},{nBitLength:"isSafeInteger",nByteLength:"isSafeInteger"}),Object.freeze({...a5(e.n,e.nBitLength),...e,p:e.Fp.ORDER})}function os(e){void 0!==e.lowS&&iJ("lowS",e.lowS),void 0!==e.prehash&&iJ("prehash",e.prehash)}let{bytesToNumberBE:ol,hexToBytes:oc}=ap;class od extends Error{constructor(e=""){super(e)}}let ou={Err:od,_tlv:{encode:(e,t)=>{let{Err:r}=ou;if(e<0||e>256)throw new r("tlv.encode: wrong tag");if(1&t.length)throw new r("tlv.encode: unpadded data");let i=t.length/2,a=i1(i);if(a.length/2&128)throw new r("tlv.encode: long form length too big");let o=i>127?i1(a.length/2|128):"";return i1(e)+o+a+t},decode(e,t){let{Err:r}=ou,i=0;if(e<0||e>256)throw new r("tlv.encode: wrong tag");if(t.length<2||t[i++]!==e)throw new r("tlv.decode: wrong tlv");let a=t[i++],o=0;if(128&a){let e=127&a;if(!e)throw new r("tlv.decode(long): indefinite length not supported");if(e>4)throw new r("tlv.decode(long): byte length is too big");let n=t.subarray(i,i+e);if(n.length!==e)throw new r("tlv.decode: length bytes not complete");if(0===n[0])throw new r("tlv.decode(long): zero leftmost byte");for(let e of n)o=o<<8|e;if(i+=e,o<128)throw new r("tlv.decode(long): not minimal encoding")}else o=a;let n=t.subarray(i,i+o);if(n.length!==o)throw new r("tlv.decode: wrong value length");return{v:n,l:t.subarray(i+o)}}},_int:{encode(e){let{Err:t}=ou;if(e<oh)throw new t("integer: negative integers are not allowed");let r=i1(e);if(8&Number.parseInt(r[0],16)&&(r="00"+r),1&r.length)throw new t("unexpected DER parsing assertion: unpadded hex");return r},decode(e){let{Err:t}=ou;if(128&e[0])throw new t("invalid signature integer: negative");if(0===e[0]&&!(128&e[1]))throw new t("invalid signature integer: unnecessary leading zero");return ol(e)}},toSig(e){let{Err:t,_int:r,_tlv:i}=ou,a="string"==typeof e?oc(e):e;iX(a);let{v:o,l:n}=i.decode(48,a);if(n.length)throw new t("invalid signature: left bytes after parsing");let{v:s,l:l}=i.decode(2,o),{v:c,l:d}=i.decode(2,l);if(d.length)throw new t("invalid signature: left bytes after parsing");return{r:r.decode(s),s:r.decode(c)}},hexFromSig(e){let{_tlv:t,_int:r}=ou,i=t.encode(2,r.encode(e.r)),a=t.encode(2,r.encode(e.s));return t.encode(48,i+a)}},oh=BigInt(0),op=BigInt(1);BigInt(2);let og=BigInt(3);BigInt(4);let of=BigInt("0xfffffffffffffffffffffffffffffffffffffffffffffffffffffffefffffc2f"),ow=BigInt("0xfffffffffffffffffffffffffffffffebaaedce6af48a03bbfd25e8cd0364141"),om=BigInt(1),ov=BigInt(2),ob=(e,t)=>(e+t/ov)/t,oy=a4(of,void 0,void 0,{sqrt:function(e){let t=BigInt(3),r=BigInt(6),i=BigInt(11),a=BigInt(22),o=BigInt(23),n=BigInt(44),s=BigInt(88),l=e*e*e%of,c=l*l*e%of,d=a1(c,t,of)*c%of,u=a1(d,t,of)*c%of,h=a1(u,ov,of)*l%of,p=a1(h,i,of)*h%of,g=a1(p,a,of)*p%of,f=a1(g,n,of)*g%of,w=a1(f,s,of)*f%of,m=a1(w,n,of)*g%of,v=a1(m,t,of)*c%of,b=a1(v,o,of)*p%of,y=a1(b,r,of)*l%of,C=a1(y,ov,of);if(!oy.eql(oy.sqr(C),e))throw Error("Cannot find square root");return C}});c={a:BigInt(0),b:BigInt(7),Fp:oy,n:ow,Gx:BigInt("55066263022277343669578718895168534326250603453777594175500187360389116729240"),Gy:BigInt("32670510020758816978083085130507043184471273380659243275938904335757337482424"),h:BigInt(1),lowS:!0,endo:{beta:BigInt("0x7ae96a2b657c07106e64479eac3434e99cf0497512f58995c1396c28719501ee"),splitScalar:e=>{let t=BigInt("0x3086d221a7d46bcde86c90e49284eb15"),r=-om*BigInt("0xe4437ed6010e88286f547fa90abfe4c3"),i=BigInt("0x114ca50f7a8e2f3f657c1108d9d44cfd8"),a=BigInt("0x100000000000000000000000000000000"),o=ob(t*e,ow),n=ob(-r*e,ow),s=a0(e-o*t-n*i,ow),l=a0(-o*r-n*t,ow),c=s>a,d=l>a;if(c&&(s=ow-s),d&&(l=ow-l),s>a||l>a)throw Error("splitScalar: Endomorphism failed, k="+e);return{k1neg:c,k1:s,k2neg:d,k2:l}}}},l=ib,function(e){let t=function(e){let t=on(e);return au(t,{hash:"hash",hmac:"function",randomBytes:"function"},{bits2int:"function",bits2int_modN:"function",lowS:"boolean"}),Object.freeze({lowS:!0,...t})}(e),{Fp:r,n:i}=t,a=r.BYTES+1,o=2*r.BYTES+1;function n(e){return a0(e,i)}let{ProjectivePoint:s,normPrivateKeyToScalar:l,weierstrassEquation:c,isWithinCurveOrder:d}=function(e){var t;let r=function(e){let t=on(e);au(t,{a:"field",b:"field"},{allowedPrivateKeyLengths:"array",wrapPrivateKey:"boolean",isTorsionFree:"function",clearCofactor:"function",allowInfinityPoint:"boolean",fromBytes:"function",toBytes:"function"});let{endo:r,Fp:i,a:a}=t;if(r){if(!i.eql(a,i.ZERO))throw Error("invalid endomorphism, can only be defined for Koblitz curves that have a=0");if("object"!=typeof r||"bigint"!=typeof r.beta||"function"!=typeof r.splitScalar)throw Error("invalid endomorphism, expected beta: bigint and splitScalar: function")}return Object.freeze({...t})}(e),{Fp:i}=r,a=a4(r.n,r.nBitLength),o=r.toBytes||((e,t,r)=>{let a=t.toAffine();return at(Uint8Array.from([4]),i.toBytes(a.x),i.toBytes(a.y))}),n=r.fromBytes||(e=>{let t=e.subarray(1);return{x:i.fromBytes(t.subarray(0,i.BYTES)),y:i.fromBytes(t.subarray(i.BYTES,2*i.BYTES))}});function s(e){let{a:t,b:a}=r,o=i.sqr(e),n=i.mul(o,e);return i.add(i.add(n,i.mul(e,t)),a)}if(!i.eql(i.sqr(r.Gy),s(r.Gx)))throw Error("bad generator point: equation left != right");function l(e){let t;let{allowedPrivateKeyLengths:i,nByteLength:a,wrapPrivateKey:o,n:n}=r;if(i&&"bigint"!=typeof e){if(iY(e)&&(e=i0(e)),"string"!=typeof e||!i.includes(e.length))throw Error("invalid private key");e=e.padStart(2*a,"0")}try{t="bigint"==typeof e?e:i6(ae("private key",e,a))}catch{throw Error("invalid private key, expected hex or "+a+" bytes, got "+typeof e)}return o&&(t=a0(t,n)),aa("private key",t,op,n),t}function c(e){if(!(e instanceof h))throw Error("ProjectivePoint expected")}let d=ah((e,t)=>{let{px:r,py:a,pz:o}=e;if(i.eql(o,i.ONE))return{x:r,y:a};let n=e.is0();null==t&&(t=n?i.ONE:i.inv(o));let s=i.mul(r,t),l=i.mul(a,t),c=i.mul(o,t);if(n)return{x:i.ZERO,y:i.ZERO};if(!i.eql(c,i.ONE))throw Error("invZ was invalid");return{x:s,y:l}}),u=ah(e=>{if(e.is0()){if(r.allowInfinityPoint&&!i.is0(e.py))return;throw Error("bad point: ZERO")}let{x:t,y:a}=e.toAffine();if(!i.isValid(t)||!i.isValid(a))throw Error("bad point: x or y not FE");let o=i.sqr(a),n=s(t);if(!i.eql(o,n))throw Error("bad point: equation left != right");if(!e.isTorsionFree())throw Error("bad point: not in prime-order subgroup");return!0});class h{constructor(e,t,r){if(this.px=e,this.py=t,this.pz=r,null==e||!i.isValid(e))throw Error("x required");if(null==t||!i.isValid(t))throw Error("y required");if(null==r||!i.isValid(r))throw Error("z required");Object.freeze(this)}static fromAffine(e){let{x:t,y:r}=e||{};if(!e||!i.isValid(t)||!i.isValid(r))throw Error("invalid affine point");if(e instanceof h)throw Error("projective point not allowed");let a=e=>i.eql(e,i.ZERO);return a(t)&&a(r)?h.ZERO:new h(t,r,i.ONE)}get x(){return this.toAffine().x}get y(){return this.toAffine().y}static normalizeZ(e){let t=i.invertBatch(e.map(e=>e.pz));return e.map((e,r)=>e.toAffine(t[r])).map(h.fromAffine)}static fromHex(e){let t=h.fromAffine(n(ae("pointHex",e)));return t.assertValidity(),t}static fromPrivateKey(e){return h.BASE.multiply(l(e))}static msm(e,t){return function(e,t,r,i){if(function(e,t){if(!Array.isArray(e))throw Error("array expected");e.forEach((e,r)=>{if(!(e instanceof t))throw Error("invalid point at index "+r)})}(r,e),function(e,t){if(!Array.isArray(e))throw Error("array of scalars expected");e.forEach((e,r)=>{if(!t.isValid(e))throw Error("invalid scalar at index "+r)})}(i,t),r.length!==i.length)throw Error("arrays of points and scalars must have equal length");let a=e.ZERO,o=ao(BigInt(r.length)),n=o>12?o-3:o>4?o-2:o?2:1,s=(1<<n)-1,l=Array(s+1).fill(a),c=Math.floor((t.BITS-1)/n)*n,d=a;for(let e=c;e>=0;e-=n){l.fill(a);for(let t=0;t<i.length;t++){let a=Number(i[t]>>BigInt(e)&BigInt(s));l[a]=l[a].add(r[t])}let t=a;for(let e=l.length-1,r=a;e>0;e--)r=r.add(l[e]),t=t.add(r);if(d=d.add(t),0!==e)for(let e=0;e<n;e++)d=d.double()}return d}(h,a,e,t)}_setWindowSize(e){g.setWindowSize(this,e)}assertValidity(){u(this)}hasEvenY(){let{y:e}=this.toAffine();if(i.isOdd)return!i.isOdd(e);throw Error("Field doesn't support isOdd")}equals(e){c(e);let{px:t,py:r,pz:a}=this,{px:o,py:n,pz:s}=e,l=i.eql(i.mul(t,s),i.mul(o,a)),d=i.eql(i.mul(r,s),i.mul(n,a));return l&&d}negate(){return new h(this.px,i.neg(this.py),this.pz)}double(){let{a:e,b:t}=r,a=i.mul(t,og),{px:o,py:n,pz:s}=this,l=i.ZERO,c=i.ZERO,d=i.ZERO,u=i.mul(o,o),p=i.mul(n,n),g=i.mul(s,s),f=i.mul(o,n);return f=i.add(f,f),d=i.mul(o,s),d=i.add(d,d),l=i.mul(e,d),c=i.mul(a,g),c=i.add(l,c),l=i.sub(p,c),c=i.add(p,c),c=i.mul(l,c),l=i.mul(f,l),d=i.mul(a,d),g=i.mul(e,g),f=i.sub(u,g),f=i.mul(e,f),f=i.add(f,d),d=i.add(u,u),u=i.add(d,u),u=i.add(u,g),u=i.mul(u,f),c=i.add(c,u),g=i.mul(n,s),g=i.add(g,g),u=i.mul(g,f),l=i.sub(l,u),d=i.mul(g,p),d=i.add(d,d),new h(l,c,d=i.add(d,d))}add(e){c(e);let{px:t,py:a,pz:o}=this,{px:n,py:s,pz:l}=e,d=i.ZERO,u=i.ZERO,p=i.ZERO,g=r.a,f=i.mul(r.b,og),w=i.mul(t,n),m=i.mul(a,s),v=i.mul(o,l),b=i.add(t,a),y=i.add(n,s);b=i.mul(b,y),y=i.add(w,m),b=i.sub(b,y),y=i.add(t,o);let C=i.add(n,l);return y=i.mul(y,C),C=i.add(w,v),y=i.sub(y,C),C=i.add(a,o),d=i.add(s,l),C=i.mul(C,d),d=i.add(m,v),C=i.sub(C,d),p=i.mul(g,y),d=i.mul(f,v),p=i.add(d,p),d=i.sub(m,p),p=i.add(m,p),u=i.mul(d,p),m=i.add(w,w),m=i.add(m,w),v=i.mul(g,v),y=i.mul(f,y),m=i.add(m,v),v=i.sub(w,v),v=i.mul(g,v),y=i.add(y,v),w=i.mul(m,y),u=i.add(u,w),w=i.mul(C,y),d=i.mul(b,d),d=i.sub(d,w),w=i.mul(b,m),p=i.mul(C,p),new h(d,u,p=i.add(p,w))}subtract(e){return this.add(e.negate())}is0(){return this.equals(h.ZERO)}wNAF(e){return g.wNAFCached(this,e,h.normalizeZ)}multiplyUnsafe(e){let{endo:t,n:a}=r;aa("scalar",e,oh,a);let o=h.ZERO;if(e===oh)return o;if(this.is0()||e===op)return this;if(!t||g.hasPrecomputes(this))return g.wNAFCachedUnsafe(this,e,h.normalizeZ);let{k1neg:n,k1:s,k2neg:l,k2:c}=t.splitScalar(e),d=o,u=o,p=this;for(;s>oh||c>oh;)s&op&&(d=d.add(p)),c&op&&(u=u.add(p)),p=p.double(),s>>=op,c>>=op;return n&&(d=d.negate()),l&&(u=u.negate()),u=new h(i.mul(u.px,t.beta),u.py,u.pz),d.add(u)}multiply(e){let t,a;let{endo:o,n:n}=r;if(aa("scalar",e,op,n),o){let{k1neg:r,k1:n,k2neg:s,k2:l}=o.splitScalar(e),{p:c,f:d}=this.wNAF(n),{p:u,f:p}=this.wNAF(l);c=g.constTimeNegate(r,c),u=g.constTimeNegate(s,u),u=new h(i.mul(u.px,o.beta),u.py,u.pz),t=c.add(u),a=d.add(p)}else{let{p:r,f:i}=this.wNAF(e);t=r,a=i}return h.normalizeZ([t,a])[0]}multiplyAndAddUnsafe(e,t,r){let i=h.BASE,a=(e,t)=>t!==oh&&t!==op&&e.equals(i)?e.multiply(t):e.multiplyUnsafe(t),o=a(this,t).add(a(e,r));return o.is0()?void 0:o}toAffine(e){return d(this,e)}isTorsionFree(){let{h:e,isTorsionFree:t}=r;if(e===op)return!0;if(t)return t(h,this);throw Error("isTorsionFree() has not been declared for the elliptic curve")}clearCofactor(){let{h:e,clearCofactor:t}=r;return e===op?this:t?t(h,this):this.multiplyUnsafe(r.h)}toRawBytes(e=!0){return iJ("isCompressed",e),this.assertValidity(),o(h,this,e)}toHex(e=!0){return iJ("isCompressed",e),i0(this.toRawBytes(e))}}h.BASE=new h(r.Gx,r.Gy,i.ONE),h.ZERO=new h(i.ZERO,i.ONE,i.ZERO);let p=r.nBitLength,g=(t=r.endo?Math.ceil(p/2):p,{constTimeNegate:oe,hasPrecomputes:e=>1!==oo(e),unsafeLadder(e,t,r=h.ZERO){let i=e;for(;t>a9;)t&a7&&(r=r.add(i)),i=i.double(),t>>=a7;return r},precomputeWindow(e,r){let{windows:i,windowSize:a}=or(r,t),o=[],n=e,s=n;for(let e=0;e<i;e++){s=n,o.push(s);for(let e=1;e<a;e++)s=s.add(n),o.push(s);n=s.double()}return o},wNAF(e,r,i){let{windows:a,windowSize:o}=or(e,t),n=h.ZERO,s=h.BASE,l=BigInt(2**e-1),c=2**e,d=BigInt(e);for(let e=0;e<a;e++){let t=e*o,a=Number(i&l);i>>=d,a>o&&(a-=c,i+=a7);let u=t+Math.abs(a)-1,h=e%2!=0,p=a<0;0===a?s=s.add(oe(h,r[t])):n=n.add(oe(p,r[u]))}return{p:n,f:s}},wNAFUnsafe(e,r,i,a=h.ZERO){let{windows:o,windowSize:n}=or(e,t),s=BigInt(2**e-1),l=2**e,c=BigInt(e);for(let e=0;e<o;e++){let t=e*n;if(i===a9)break;let o=Number(i&s);if(i>>=c,o>n&&(o-=l,i+=a7),0===o)continue;let d=r[t+Math.abs(o)-1];o<0&&(d=d.negate()),a=a.add(d)}return a},getPrecomputes(e,t,r){let i=oi.get(t);return i||(i=this.precomputeWindow(t,e),1!==e&&oi.set(t,r(i))),i},wNAFCached(e,t,r){let i=oo(e);return this.wNAF(i,this.getPrecomputes(i,e,r),t)},wNAFCachedUnsafe(e,t,r,i){let a=oo(e);return 1===a?this.unsafeLadder(e,t,i):this.wNAFUnsafe(a,this.getPrecomputes(a,e,r),t,i)},setWindowSize(e,r){ot(r,t),oa.set(e,r),oi.delete(e)}});return{CURVE:r,ProjectivePoint:h,normPrivateKeyToScalar:l,weierstrassEquation:s,isWithinCurveOrder:function(e){return ai(e,op,r.n)}}}({...t,toBytes(e,t,i){let a=t.toAffine(),o=r.toBytes(a.x);return iJ("isCompressed",i),i?at(Uint8Array.from([t.hasEvenY()?2:3]),o):at(Uint8Array.from([4]),o,r.toBytes(a.y))},fromBytes(e){let t=e.length,i=e[0],n=e.subarray(1);if(t===a&&(2===i||3===i)){let e;let t=i6(n);if(!ai(t,op,r.ORDER))throw Error("Point is not on curve");let a=c(t);try{e=r.sqrt(a)}catch(e){throw Error("Point is not on curve"+(e instanceof Error?": "+e.message:""))}return(1&i)==1!=((e&op)===op)&&(e=r.neg(e)),{x:t,y:e}}if(t===o&&4===i)return{x:r.fromBytes(n.subarray(0,r.BYTES)),y:r.fromBytes(n.subarray(r.BYTES,2*r.BYTES))};throw Error("invalid Point, expected length of "+a+", or uncompressed "+o+", got "+t)}}),u=e=>i0(i9(e,t.nByteLength)),h=(e,t,r)=>i6(e.slice(t,r));class p{constructor(e,t,r){this.r=e,this.s=t,this.recovery=r,this.assertValidity()}static fromCompact(e){let r=t.nByteLength;return new p(h(e=ae("compactSignature",e,2*r),0,r),h(e,r,2*r))}static fromDER(e){let{r:t,s:r}=ou.toSig(ae("DER",e));return new p(t,r)}assertValidity(){aa("r",this.r,op,i),aa("s",this.s,op,i)}addRecoveryBit(e){return new p(this.r,this.s,e)}recoverPublicKey(e){let{r:a,s:o,recovery:l}=this,c=w(ae("msgHash",e));if(null==l||![0,1,2,3].includes(l))throw Error("recovery id invalid");let d=2===l||3===l?a+t.n:a;if(d>=r.ORDER)throw Error("recovery id 2 or 3 invalid");let h=(1&l)==0?"02":"03",p=s.fromHex(h+u(d)),g=a2(d,i),f=n(-c*g),m=n(o*g),v=s.BASE.multiplyAndAddUnsafe(p,f,m);if(!v)throw Error("point at infinify");return v.assertValidity(),v}hasHighS(){return this.s>i>>op}normalizeS(){return this.hasHighS()?new p(this.r,n(-this.s),this.recovery):this}toDERRawBytes(){return i4(this.toDERHex())}toDERHex(){return ou.hexFromSig({r:this.r,s:this.s})}toCompactRawBytes(){return i4(this.toCompactHex())}toCompactHex(){return u(this.r)+u(this.s)}}function g(e){let t=iY(e),r="string"==typeof e,i=(t||r)&&e.length;return t?i===a||i===o:r?i===2*a||i===2*o:e instanceof s}let f=t.bits2int||function(e){if(e.length>8192)throw Error("input is too large");let r=i6(e),i=8*e.length-t.nBitLength;return i>0?r>>BigInt(i):r},w=t.bits2int_modN||function(e){return n(f(e))},m=an(t.nBitLength);function v(e){return aa("num < 2^"+t.nBitLength,e,oh,m),i9(e,t.nByteLength)}let b={lowS:t.lowS,prehash:!1},y={lowS:t.lowS,prehash:!1};s.BASE._setWindowSize(8)}({...c,hash:l,hmac:(e,...t)=>aZ(l,e,function(...e){let t=0;for(let r=0;r<e.length;r++){let i=e[r];tz(i),t+=i.length}let r=new Uint8Array(t);for(let t=0,i=0;t<e.length;t++){let a=e[t];r.set(a,i),i+=a.length}return r}(...t)),randomBytes:t2}),BigInt(0);let oC={createBalance(e,t){let r={name:e.metadata.name||"",symbol:e.metadata.symbol||"",decimals:e.metadata.decimals||0,value:e.metadata.value||0,price:e.metadata.price||0,iconUrl:e.metadata.iconUrl||""};return{name:r.name,symbol:r.symbol,chainId:t,address:"native"===e.address?void 0:this.convertAddressToCAIP10Address(e.address,t),value:r.value,price:r.price,quantity:{decimals:r.decimals.toString(),numeric:this.convertHexToBalance({hex:e.balance,decimals:r.decimals})},iconUrl:r.iconUrl}},convertHexToBalance:({hex:e,decimals:t})=>rk(BigInt(e),t),convertAddressToCAIP10Address:(e,t)=>`${t}:${e}`,createCAIP2ChainId:(e,t)=>`${t}:${parseInt(e,16)}`,getChainIdHexFromCAIP2ChainId(e){let t=e.split(":");if(t.length<2||!t[1])return"0x0";let r=parseInt(t[1],10);return isNaN(r)?"0x0":`0x${r.toString(16)}`},isWalletGetAssetsResponse(e){return"object"==typeof e&&null!==e&&Object.values(e).every(e=>Array.isArray(e)&&e.every(e=>this.isValidAsset(e)))},isValidAsset:e=>"object"==typeof e&&null!==e&&"string"==typeof e.address&&"string"==typeof e.balance&&("ERC20"===e.type||"NATIVE"===e.type)&&"object"==typeof e.metadata&&null!==e.metadata&&"string"==typeof e.metadata.name&&"string"==typeof e.metadata.symbol&&"number"==typeof e.metadata.decimals&&"number"==typeof e.metadata.price&&"string"==typeof e.metadata.iconUrl},ox={async getMyTokensWithBalance(e){let t=o$.state.address,r=oS.state.activeCaipNetwork;if(!t||!r)return[];if("eip155"===r.chainNamespace){let e=await this.getEIP155Balances(t,r);if(e)return this.filterLowQualityTokens(e)}let i=await oP.getBalance(t,r.caipNetworkId,e);return this.filterLowQualityTokens(i.balances)},async getEIP155Balances(e,t){try{let r=oC.getChainIdHexFromCAIP2ChainId(t.caipNetworkId);if(!(await tc.getCapabilities(e))?.[r]?.assetDiscovery?.supported)return null;let i=await tc.walletGetAssets({account:e,chainFilter:[r]});return oC.isWalletGetAssetsResponse(i)?(i[r]||[]).map(e=>oC.createBalance(e,t.caipNetworkId)):null}catch{return null}},filterLowQualityTokens:e=>e.filter(e=>"0"!==e.quantity.decimals),mapBalancesToSwapTokens:e=>e?.map(e=>({...e,address:e?.address?e.address:oS.getActiveNetworkTokenAddress(),decimals:parseInt(e.quantity.decimals,10),logoUri:e.iconUrl,eip2612:!1}))||[]},oE=eI({tokenBalances:[],loading:!1}),ok={state:oE,subscribe:e=>eS(oE,()=>e(oE)),subscribeKey:(e,t)=>eO(oE,e,t),setToken(e){e&&(oE.token=eT(e))},setTokenAmount(e){oE.sendTokenAmount=e},setReceiverAddress(e){oE.receiverAddress=e},setReceiverProfileImageUrl(e){oE.receiverProfileImageUrl=e},setReceiverProfileName(e){oE.receiverProfileName=e},setGasPrice(e){oE.gasPrice=e},setGasPriceInUsd(e){oE.gasPriceInUSD=e},setNetworkBalanceInUsd(e){oE.networkBalanceInUSD=e},setLoading(e){oE.loading=e},sendToken(){switch(oS.state.activeCaipNetwork?.chainNamespace){case"eip155":this.sendEvmToken();return;case"solana":this.sendSolanaToken();return;default:throw Error("Unsupported chain")}},sendEvmToken(){let e=oS.state.activeChain,t=o$.state.preferredAccountTypes?.[e];this.state.token?.address&&this.state.sendTokenAmount&&this.state.receiverAddress?(eJ.sendEvent({type:"track",event:"SEND_INITIATED",properties:{isSmartAccount:t===tt.ACCOUNT_TYPES.SMART_ACCOUNT,token:this.state.token.address,amount:this.state.sendTokenAmount,network:oS.state.activeCaipNetwork?.caipNetworkId||""}}),this.sendERC20Token({receiverAddress:this.state.receiverAddress,tokenAddress:this.state.token.address,sendTokenAmount:this.state.sendTokenAmount,decimals:this.state.token.quantity.decimals})):this.state.receiverAddress&&this.state.sendTokenAmount&&this.state.gasPrice&&this.state.token?.quantity.decimals&&(eJ.sendEvent({type:"track",event:"SEND_INITIATED",properties:{isSmartAccount:t===tt.ACCOUNT_TYPES.SMART_ACCOUNT,token:this.state.token?.symbol,amount:this.state.sendTokenAmount,network:oS.state.activeCaipNetwork?.caipNetworkId||""}}),this.sendNativeToken({receiverAddress:this.state.receiverAddress,sendTokenAmount:this.state.sendTokenAmount,gasPrice:this.state.gasPrice,decimals:this.state.token.quantity.decimals}))},async fetchTokenBalance(e){oE.loading=!0;let t=oS.state.activeCaipNetwork?.caipNetworkId,r=oS.state.activeCaipNetwork?.chainNamespace,i=oS.state.activeCaipAddress,a=i?eL.getPlainAddress(i):void 0;if(oE.lastRetry&&!eL.isAllowedRetry(oE.lastRetry,30*eR.ONE_SEC_MS))return oE.loading=!1,[];try{if(a&&t&&r){let e=await ox.getMyTokensWithBalance();return oE.tokenBalances=e,oE.lastRetry=void 0,e}}catch(t){oE.lastRetry=Date.now(),e?.(t),ta.showError("Token Balance Unavailable")}finally{oE.loading=!1}return[]},fetchNetworkBalance(){if(0===oE.tokenBalances.length)return;let e=ox.mapBalancesToSwapTokens(oE.tokenBalances);if(!e)return;let t=e.find(e=>e.address===oS.getActiveNetworkTokenAddress());t&&(oE.networkBalanceInUSD=t?en.multiply(t.quantity.numeric,t.price).toString():"0")},isInsufficientNetworkTokenForGas:(e,t)=>!!en.bigNumber(e).eq(0)||en.bigNumber(en.bigNumber(t||"0")).gt(e),hasInsufficientGasFunds(){let e=oS.state.activeChain,t=!0;return o$.state.preferredAccountTypes?.[e]===tt.ACCOUNT_TYPES.SMART_ACCOUNT?t=!1:oE.networkBalanceInUSD&&(t=this.isInsufficientNetworkTokenForGas(oE.networkBalanceInUSD,oE.gasPriceInUSD)),t},async sendNativeToken(e){let t=oS.state.activeChain;e5.pushTransactionStack({view:"Account",goBack:!1});let r=e.receiverAddress,i=o$.state.address,a=tc.parseUnits(e.sendTokenAmount.toString(),Number(e.decimals));try{await tc.sendTransaction({chainNamespace:"eip155",to:r,address:i,data:"0x",value:a??BigInt(0),gasPrice:e.gasPrice}),ta.showSuccess("Transaction started"),eJ.sendEvent({type:"track",event:"SEND_SUCCESS",properties:{isSmartAccount:o$.state.preferredAccountTypes?.[t]===tt.ACCOUNT_TYPES.SMART_ACCOUNT,token:this.state.token?.symbol||"",amount:e.sendTokenAmount,network:oS.state.activeCaipNetwork?.caipNetworkId||""}}),this.resetSend()}catch(i){console.error("SendController:sendERC20Token - failed to send native token",i);let r=i instanceof Error?i.message:"Unknown error";eJ.sendEvent({type:"track",event:"SEND_ERROR",properties:{message:r,isSmartAccount:o$.state.preferredAccountTypes?.[t]===tt.ACCOUNT_TYPES.SMART_ACCOUNT,token:this.state.token?.symbol||"",amount:e.sendTokenAmount,network:oS.state.activeCaipNetwork?.caipNetworkId||""}}),ta.showError("Something went wrong")}},async sendERC20Token(e){e5.pushTransactionStack({view:"Account",goBack:!1});let t=tc.parseUnits(e.sendTokenAmount.toString(),Number(e.decimals));try{if(o$.state.address&&e.sendTokenAmount&&e.receiverAddress&&e.tokenAddress){let r=eL.getPlainAddress(e.tokenAddress);await tc.writeContract({fromAddress:o$.state.address,tokenAddress:r,args:[e.receiverAddress,t??BigInt(0)],method:"transfer",abi:ed.getERC20Abi(r),chainNamespace:"eip155"}),ta.showSuccess("Transaction started"),this.resetSend()}}catch(r){console.error("SendController:sendERC20Token - failed to send erc20 token",r);let t=r instanceof Error?r.message:"Unknown error";eJ.sendEvent({type:"track",event:"SEND_ERROR",properties:{message:t,isSmartAccount:o$.state.preferredAccountTypes?.eip155===tt.ACCOUNT_TYPES.SMART_ACCOUNT,token:this.state.token?.symbol||"",amount:e.sendTokenAmount,network:oS.state.activeCaipNetwork?.caipNetworkId||""}}),ta.showError("Something went wrong")}},sendSolanaToken(){if(!this.state.sendTokenAmount||!this.state.receiverAddress){ta.showError("Please enter a valid amount and receiver address");return}e5.pushTransactionStack({view:"Account",goBack:!1}),tc.sendTransaction({chainNamespace:"solana",to:this.state.receiverAddress,value:this.state.sendTokenAmount}).then(()=>{this.resetSend(),o$.fetchTokenBalance()}).catch(e=>{ta.showError("Failed to send transaction. Please try again."),console.error("SendController:sendToken - failed to send solana transaction",e)})},resetSend(){oE.token=void 0,oE.sendTokenAmount=void 0,oE.receiverAddress=void 0,oE.receiverProfileImageUrl=void 0,oE.receiverProfileName=void 0,oE.loading=!1,oE.tokenBalances=[]}},oA={currentTab:0,tokenBalance:[],smartAccountDeployed:!1,addressLabels:new Map,allAccounts:[],user:void 0},oN={caipNetwork:void 0,supportsAllNetworks:!0,smartAccountEnabledNetworks:[]},oI=eI({chains:function(e){let t=eI({data:Array.from([]),has(e){return this.data.some(t=>t[0]===e)},set(e,t){let r=this.data.find(t=>t[0]===e);return r?r[1]=t:this.data.push([e,t]),this},get(e){var t;return null==(t=this.data.find(t=>t[0]===e))?void 0:t[1]},delete(e){let t=this.data.findIndex(t=>t[0]===e);return -1!==t&&(this.data.splice(t,1),!0)},clear(){this.data.splice(0)},get size(){return this.data.length},toJSON(){return new Map(this.data)},forEach(e){this.data.forEach(t=>{e(t[1],t[0],this)})},keys(){return this.data.map(e=>e[0]).values()},values(){return this.data.map(e=>e[1]).values()},entries(){return new Map(this.data).entries()},get[Symbol.toStringTag](){return"Map"},[Symbol.iterator](){return this.entries()}});return Object.defineProperties(t,{data:{enumerable:!1},size:{enumerable:!1},toJSON:{enumerable:!1}}),Object.seal(t),t}(),activeCaipAddress:void 0,activeChain:void 0,activeCaipNetwork:void 0,noAdapters:!1,universalAdapter:{networkControllerClient:void 0,connectionControllerClient:void 0},isSwitchingNamespace:!1}),oS={state:oI,subscribe:e=>eS(oI,()=>{e(oI)}),subscribeKey:(e,t)=>eO(oI,e,t),subscribeChainProp(e,t,r){let i;return eS(oI.chains,()=>{let a=r||oI.activeChain;if(a){let r=oI.chains.get(a)?.[e];i!==r&&(i=r,t(r))}})},initialize(e,t,r){let{chainId:i,namespace:a}=e$.getActiveNetworkProps(),o=t?.find(e=>e.id.toString()===i?.toString()),n=e.find(e=>e?.namespace===a)||e?.[0],s=new Set([...t?.map(e=>e.chainNamespace)??[]]);e?.length!==0&&n||(oI.noAdapters=!0),oI.noAdapters||(oI.activeChain=n?.namespace,oI.activeCaipNetwork=o,this.setChainNetworkData(n?.namespace,{caipNetwork:o}),oI.activeChain&&tu.set({activeChain:n?.namespace})),s.forEach(e=>{let i=t?.filter(t=>t.chainNamespace===e);oS.state.chains.set(e,{namespace:e,networkState:eI({...oN,caipNetwork:i?.[0]}),accountState:eI(oA),caipNetworks:i??[],...r}),this.setRequestedCaipNetworks(i??[],e)})},removeAdapter(e){if(oI.activeChain===e){let t=Array.from(oI.chains.entries()).find(([t])=>t!==e);if(t){let e=t[1]?.caipNetworks?.[0];e&&this.setActiveCaipNetwork(e)}}oI.chains.delete(e)},addAdapter(e,{networkControllerClient:t,connectionControllerClient:r},i){oI.chains.set(e.namespace,{namespace:e.namespace,networkState:{...oN,caipNetwork:i[0]},accountState:oA,caipNetworks:i,connectionControllerClient:r,networkControllerClient:t}),this.setRequestedCaipNetworks(i?.filter(t=>t.chainNamespace===e.namespace)??[],e.namespace)},addNetwork(e){let t=oI.chains.get(e.chainNamespace);if(t){let r=[...t.caipNetworks||[]];t.caipNetworks?.find(t=>t.id===e.id)||r.push(e),oI.chains.set(e.chainNamespace,{...t,caipNetworks:r}),this.setRequestedCaipNetworks(r,e.chainNamespace)}},removeNetwork(e,t){let r=oI.chains.get(e);if(r){let i=oI.activeCaipNetwork?.id===t,a=[...r.caipNetworks?.filter(e=>e.id!==t)||[]];i&&r?.caipNetworks?.[0]&&this.setActiveCaipNetwork(r.caipNetworks[0]),oI.chains.set(e,{...r,caipNetworks:a}),this.setRequestedCaipNetworks(a||[],e)}},setAdapterNetworkState(e,t){let r=oI.chains.get(e);r&&(r.networkState={...r.networkState||oN,...t},oI.chains.set(e,r))},setChainAccountData(e,t,r=!0){if(!e)throw Error("Chain is required to update chain account data");let i=oI.chains.get(e);if(i){let r={...i.accountState||oA,...t};oI.chains.set(e,{...i,accountState:r}),(1===oI.chains.size||oI.activeChain===e)&&(t.caipAddress&&(oI.activeCaipAddress=t.caipAddress),o$.replaceState(r))}},setChainNetworkData(e,t){if(!e)return;let r=oI.chains.get(e);if(r){let i={...r.networkState||oN,...t};oI.chains.set(e,{...r,networkState:i})}},setAccountProp(e,t,r,i=!0){this.setChainAccountData(r,{[e]:t},i),"status"===e&&"disconnected"===t&&r&&e7.removeConnectorId(r)},setActiveNamespace(e){oI.activeChain=e;let t=e?oI.chains.get(e):void 0,r=t?.networkState?.caipNetwork;r?.id&&e&&(oI.activeCaipAddress=t?.accountState?.caipAddress,oI.activeCaipNetwork=r,this.setChainNetworkData(e,{caipNetwork:r}),e$.setActiveCaipNetworkId(r?.caipNetworkId),tu.set({activeChain:e,selectedNetworkId:r?.caipNetworkId}))},setActiveCaipNetwork(e){if(!e)return;oI.activeChain!==e.chainNamespace&&this.setIsSwitchingNamespace(!0);let t=oI.chains.get(e.chainNamespace);oI.activeChain=e.chainNamespace,oI.activeCaipNetwork=e,this.setChainNetworkData(e.chainNamespace,{caipNetwork:e}),t?.accountState?.address?oI.activeCaipAddress=`${e.chainNamespace}:${e.id}:${t?.accountState?.address}`:oI.activeCaipAddress=void 0,this.setAccountProp("caipAddress",oI.activeCaipAddress,e.chainNamespace),t&&o$.replaceState(t.accountState),ok.resetSend(),tu.set({activeChain:oI.activeChain,selectedNetworkId:oI.activeCaipNetwork?.caipNetworkId}),e$.setActiveCaipNetworkId(e.caipNetworkId),this.checkIfSupportedNetwork(e.chainNamespace)||!eZ.state.enableNetworkSwitch||eZ.state.allowUnsupportedChain||tc.state.wcBasic||this.showUnsupportedChainUI()},addCaipNetwork(e){if(!e)return;let t=oI.chains.get(e.chainNamespace);t&&t?.caipNetworks?.push(e)},async switchActiveNamespace(e){if(!e)return;let t=e!==oS.state.activeChain,r=oS.getNetworkData(e)?.caipNetwork,i=oS.getCaipNetworkByNamespace(e,r?.id);t&&i&&await oS.switchActiveNetwork(i)},async switchActiveNetwork(e){oS.state.chains.get(oS.state.activeChain)?.caipNetworks?.some(e=>e.id===oI.activeCaipNetwork?.id)||e5.goBack();let t=this.getNetworkControllerClient(e.chainNamespace);t&&(await t.switchCaipNetwork(e),eJ.sendEvent({type:"track",event:"SWITCH_NETWORK",properties:{network:e.caipNetworkId}}))},getNetworkControllerClient(e){let t=e||oI.activeChain,r=oI.chains.get(t);if(!r)throw Error("Chain adapter not found");if(!r.networkControllerClient)throw Error("NetworkController client not set");return r.networkControllerClient},getConnectionControllerClient(e){let t=e||oI.activeChain;if(!t)throw Error("Chain is required to get connection controller client");let r=oI.chains.get(t);if(!r?.connectionControllerClient)throw Error("ConnectionController client not set");return r.connectionControllerClient},getAccountProp(e,t){let r=oI.activeChain;if(t&&(r=t),!r)return;let i=oI.chains.get(r)?.accountState;if(i)return i[e]},getNetworkProp(e,t){let r=oI.chains.get(t)?.networkState;if(r)return r[e]},getRequestedCaipNetworks(e){let t=oI.chains.get(e),{approvedCaipNetworkIds:r=[],requestedCaipNetworks:i=[]}=t?.networkState||{};return eL.sortRequestedNetworks(r,i)},getAllRequestedCaipNetworks(){let e=[];return oI.chains.forEach(t=>{let r=this.getRequestedCaipNetworks(t.namespace);e.push(...r)}),e},setRequestedCaipNetworks(e,t){this.setAdapterNetworkState(t,{requestedCaipNetworks:e})},getAllApprovedCaipNetworkIds(){let e=[];return oI.chains.forEach(t=>{let r=this.getApprovedCaipNetworkIds(t.namespace);e.push(...r)}),e},getActiveCaipNetwork:()=>oI.activeCaipNetwork,getActiveCaipAddress:()=>oI.activeCaipAddress,getApprovedCaipNetworkIds:e=>oI.chains.get(e)?.networkState?.approvedCaipNetworkIds||[],async setApprovedCaipNetworksData(e){let t=await this.getNetworkControllerClient()?.getApprovedCaipNetworksData();this.setAdapterNetworkState(e,{approvedCaipNetworkIds:t?.approvedCaipNetworkIds,supportsAllNetworks:t?.supportsAllNetworks})},checkIfSupportedNetwork(e,t){let r=t||oI.activeCaipNetwork,i=this.getRequestedCaipNetworks(e);return!i.length||i?.some(e=>e.id===r?.id)},checkIfSupportedChainId(e){return!oI.activeChain||this.getRequestedCaipNetworks(oI.activeChain)?.some(t=>t.id===e)},setSmartAccountEnabledNetworks(e,t){this.setAdapterNetworkState(t,{smartAccountEnabledNetworks:e})},checkIfSmartAccountEnabled(){let e=G.caipNetworkIdToNumber(oI.activeCaipNetwork?.caipNetworkId),t=oI.activeChain;return!!t&&!!e&&!!this.getNetworkProp("smartAccountEnabledNetworks",t)?.includes(Number(e))},getActiveNetworkTokenAddress(){let e=oI.activeCaipNetwork?.chainNamespace||"eip155",t=oI.activeCaipNetwork?.id||1,r=eR.NATIVE_TOKEN_ADDRESS[e];return`${e}:${t}:${r}`},showUnsupportedChainUI(){oB.open({view:"UnsupportedChain"})},checkIfNamesSupported(){let e=oI.activeCaipNetwork;return!!(e?.chainNamespace&&eR.NAMES_SUPPORTED_CHAIN_NAMESPACES.includes(e.chainNamespace))},resetNetwork(e){this.setAdapterNetworkState(e,{approvedCaipNetworkIds:void 0,supportsAllNetworks:!0,smartAccountEnabledNetworks:[]})},resetAccount(e){if(!e)throw Error("Chain is required to set account prop");oI.activeCaipAddress=void 0,this.setChainAccountData(e,{smartAccountDeployed:!1,currentTab:0,caipAddress:void 0,address:void 0,balance:void 0,balanceSymbol:void 0,profileName:void 0,profileImage:void 0,addressExplorerUrl:void 0,tokenBalance:[],connectedWalletInfo:void 0,preferredAccountTypes:void 0,socialProvider:void 0,socialWindow:void 0,farcasterUrl:void 0,allAccounts:[],user:void 0,status:"disconnected"}),e7.removeConnectorId(e)},async disconnect(e){let t=function(e){let t=Array.from(oS.state.chains.keys()),r=[];return e?(r.push([e,oS.state.chains.get(e)]),te(e,ec.CONNECTOR_ID.WALLET_CONNECT)?t.forEach(t=>{t!==e&&te(t,ec.CONNECTOR_ID.WALLET_CONNECT)&&r.push([t,oS.state.chains.get(t)])}):te(e,ec.CONNECTOR_ID.AUTH)&&t.forEach(t=>{t!==e&&te(t,ec.CONNECTOR_ID.AUTH)&&r.push([t,oS.state.chains.get(t)])})):r=Array.from(oS.state.chains.entries()),r}(e);try{ok.resetSend();let r=await Promise.allSettled(t.map(async([e,t])=>{try{let{caipAddress:r}=this.getAccountData(e)||{};r&&t.connectionControllerClient?.disconnect&&await t.connectionControllerClient.disconnect(e),this.resetAccount(e),this.resetNetwork(e)}catch(t){throw Error(`Failed to disconnect chain ${e}: ${t.message}`)}}));tc.resetWcConnection();let i=r.filter(e=>"rejected"===e.status);if(i.length>0)throw Error(i.map(e=>e.reason.message).join(", "));e$.deleteConnectedSocialProvider(),e?e7.removeConnectorId(e):e7.resetConnectorIds(),eJ.sendEvent({type:"track",event:"DISCONNECT_SUCCESS",properties:{namespace:e||"all"}})}catch(e){console.error(e.message||"Failed to disconnect chains"),eJ.sendEvent({type:"track",event:"DISCONNECT_ERROR",properties:{message:e.message||"Failed to disconnect chains"}})}},setIsSwitchingNamespace(e){oI.isSwitchingNamespace=e},getFirstCaipNetworkSupportsAuthConnector(){let e=[];if(oI.chains.forEach(t=>{ec.AUTH_CONNECTOR_SUPPORTED_CHAINS.find(e=>e===t.namespace)&&t.namespace&&e.push(t.namespace)}),e.length>0){let t=e[0];return t?oI.chains.get(t)?.caipNetworks?.[0]:void 0}},getAccountData:e=>e?oS.state.chains.get(e)?.accountState:o$.state,getNetworkData(e){let t=e||oI.activeChain;if(t)return oS.state.chains.get(t)?.networkState},getCaipNetworkByNamespace(e,t){if(!e)return;let r=oS.state.chains.get(e);return r?.caipNetworks?.find(e=>e.id===t)||r?.networkState?.caipNetwork||r?.caipNetworks?.[0]},getRequestedCaipNetworkIds(){let e=e7.state.filterByNamespace;return(e?[oI.chains.get(e)]:Array.from(oI.chains.values())).flatMap(e=>e?.caipNetworks||[]).map(e=>e.caipNetworkId)},getCaipNetworks:e=>e?oS.getRequestedCaipNetworks(e):oS.getAllRequestedCaipNetworks()},o_={purchaseCurrencies:[{id:"2b92315d-eab7-5bef-84fa-089a131333f5",name:"USD Coin",symbol:"USDC",networks:[{name:"ethereum-mainnet",display_name:"Ethereum",chain_id:"1",contract_address:"0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48"},{name:"polygon-mainnet",display_name:"Polygon",chain_id:"137",contract_address:"0x2791Bca1f2de4661ED88A30C99A7a9449Aa84174"}]},{id:"2b92315d-eab7-5bef-84fa-089a131333f5",name:"Ether",symbol:"ETH",networks:[{name:"ethereum-mainnet",display_name:"Ethereum",chain_id:"1",contract_address:"0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48"},{name:"polygon-mainnet",display_name:"Polygon",chain_id:"137",contract_address:"0x2791Bca1f2de4661ED88A30C99A7a9449Aa84174"}]}],paymentCurrencies:[{id:"USD",payment_method_limits:[{id:"card",min:"10.00",max:"7500.00"},{id:"ach_bank_account",min:"10.00",max:"25000.00"}]},{id:"EUR",payment_method_limits:[{id:"card",min:"10.00",max:"7500.00"},{id:"ach_bank_account",min:"10.00",max:"25000.00"}]}]},oT=eL.getBlockchainApiUrl(),oO=eI({clientId:null,api:new eM({baseUrl:oT,clientId:null}),supportedChains:{http:[],ws:[]}}),oP={state:oO,async get(e){let{st:t,sv:r}=oP.getSdkProperties(),i=eZ.state.projectId,a={...e.params||{},st:t,sv:r,projectId:i};return oO.api.get({...e,params:a})},getSdkProperties(){let{sdkType:e,sdkVersion:t}=eZ.state;return{st:e||"unknown",sv:t||"unknown"}},async isNetworkSupported(e){if(!e)return!1;try{oO.supportedChains.http.length||await oP.getSupportedNetworks()}catch{return!1}return oO.supportedChains.http.includes(e)},async getSupportedNetworks(){let e=await oP.get({path:"v1/supported-chains"});return oO.supportedChains=e,e},async fetchIdentity({address:e,caipNetworkId:t}){if(!await oP.isNetworkSupported(t))return{avatar:"",name:""};let r=e$.getIdentityFromCacheForAddress(e);if(r)return r;let i=await oP.get({path:`/v1/identity/${e}`,params:{sender:oS.state.activeCaipAddress?eL.getPlainAddress(oS.state.activeCaipAddress):void 0}});return e$.updateIdentityCache({address:e,identity:i,timestamp:Date.now()}),i},fetchTransactions:async({account:e,cursor:t,onramp:r,signal:i,cache:a,chainId:o})=>await oP.isNetworkSupported(oS.state.activeCaipNetwork?.caipNetworkId)?oP.get({path:`/v1/account/${e}/history`,params:{cursor:t,onramp:r,chainId:o},signal:i,cache:a}):{data:[],next:void 0},fetchSwapQuote:async({amount:e,userAddress:t,from:r,to:i,gasPrice:a})=>await oP.isNetworkSupported(oS.state.activeCaipNetwork?.caipNetworkId)?oP.get({path:"/v1/convert/quotes",headers:{"Content-Type":"application/json"},params:{amount:e,userAddress:t,from:r,to:i,gasPrice:a}}):{quotes:[]},fetchSwapTokens:async({chainId:e})=>await oP.isNetworkSupported(oS.state.activeCaipNetwork?.caipNetworkId)?oP.get({path:"/v1/convert/tokens",params:{chainId:e}}):{tokens:[]},fetchTokenPrice:async({addresses:e})=>await oP.isNetworkSupported(oS.state.activeCaipNetwork?.caipNetworkId)?oO.api.post({path:"/v1/fungible/price",body:{currency:"usd",addresses:e,projectId:eZ.state.projectId},headers:{"Content-Type":"application/json"}}):{fungibles:[]},fetchSwapAllowance:async({tokenAddress:e,userAddress:t})=>await oP.isNetworkSupported(oS.state.activeCaipNetwork?.caipNetworkId)?oP.get({path:"/v1/convert/allowance",params:{tokenAddress:e,userAddress:t},headers:{"Content-Type":"application/json"}}):{allowance:"0"},async fetchGasPrice({chainId:e}){let{st:t,sv:r}=oP.getSdkProperties();if(!await oP.isNetworkSupported(oS.state.activeCaipNetwork?.caipNetworkId))throw Error("Network not supported for Gas Price");return oP.get({path:"/v1/convert/gas-price",headers:{"Content-Type":"application/json"},params:{chainId:e,st:t,sv:r}})},async generateSwapCalldata({amount:e,from:t,to:r,userAddress:i,disableEstimate:a}){if(!await oP.isNetworkSupported(oS.state.activeCaipNetwork?.caipNetworkId))throw Error("Network not supported for Swaps");return oO.api.post({path:"/v1/convert/build-transaction",headers:{"Content-Type":"application/json"},body:{amount:e,eip155:{slippage:eR.CONVERT_SLIPPAGE_TOLERANCE},projectId:eZ.state.projectId,from:t,to:r,userAddress:i,disableEstimate:a}})},async generateApproveCalldata({from:e,to:t,userAddress:r}){let{st:i,sv:a}=oP.getSdkProperties();if(!await oP.isNetworkSupported(oS.state.activeCaipNetwork?.caipNetworkId))throw Error("Network not supported for Swaps");return oP.get({path:"/v1/convert/build-approve",headers:{"Content-Type":"application/json"},params:{userAddress:r,from:e,to:t,st:i,sv:a}})},async getBalance(e,t,r){let{st:i,sv:a}=oP.getSdkProperties();if(!await oP.isNetworkSupported(oS.state.activeCaipNetwork?.caipNetworkId))return ta.showError("Token Balance Unavailable"),{balances:[]};let o=`${t}:${e}`,n=e$.getBalanceCacheForCaipAddress(o);if(n)return n;let s=await oP.get({path:`/v1/account/${e}/balance`,params:{currency:"usd",chainId:t,forceUpdate:r,st:i,sv:a}});return e$.updateBalanceCache({caipAddress:o,balance:s,timestamp:Date.now()}),s},lookupEnsName:async e=>await oP.isNetworkSupported(oS.state.activeCaipNetwork?.caipNetworkId)?oP.get({path:`/v1/profile/account/${e}`,params:{apiVersion:"2"}}):{addresses:{},attributes:[]},reverseLookupEnsName:async({address:e})=>await oP.isNetworkSupported(oS.state.activeCaipNetwork?.caipNetworkId)?oP.get({path:`/v1/profile/reverse/${e}`,params:{sender:o$.state.address,apiVersion:"2"}}):[],getEnsNameSuggestions:async e=>await oP.isNetworkSupported(oS.state.activeCaipNetwork?.caipNetworkId)?oP.get({path:`/v1/profile/suggestions/${e}`,params:{zone:"reown.id"}}):{suggestions:[]},registerEnsName:async({coinType:e,address:t,message:r,signature:i})=>await oP.isNetworkSupported(oS.state.activeCaipNetwork?.caipNetworkId)?oO.api.post({path:"/v1/profile/account",body:{coin_type:e,address:t,message:r,signature:i},headers:{"Content-Type":"application/json"}}):{success:!1},generateOnRampURL:async({destinationWallets:e,partnerUserId:t,defaultNetwork:r,purchaseAmount:i,paymentAmount:a})=>await oP.isNetworkSupported(oS.state.activeCaipNetwork?.caipNetworkId)?(await oO.api.post({path:"/v1/generators/onrampurl",params:{projectId:eZ.state.projectId},body:{destinationWallets:e,defaultNetwork:r,partnerUserId:t,defaultExperience:"buy",presetCryptoAmount:i,presetFiatAmount:a}})).url:"",async getOnrampOptions(){if(!await oP.isNetworkSupported(oS.state.activeCaipNetwork?.caipNetworkId))return{paymentCurrencies:[],purchaseCurrencies:[]};try{return await oP.get({path:"/v1/onramp/options"})}catch{return o_}},async getOnrampQuote({purchaseCurrency:e,paymentCurrency:t,amount:r,network:i}){try{return await oP.isNetworkSupported(oS.state.activeCaipNetwork?.caipNetworkId)?await oO.api.post({path:"/v1/onramp/quote",params:{projectId:eZ.state.projectId},body:{purchaseCurrency:e,paymentCurrency:t,amount:r,network:i}}):null}catch{return{coinbaseFee:{amount:r,currency:t.id},networkFee:{amount:r,currency:t.id},paymentSubtotal:{amount:r,currency:t.id},paymentTotal:{amount:r,currency:t.id},purchaseAmount:{amount:r,currency:t.id},quoteId:"mocked-quote-id"}}},getSmartSessions:async e=>await oP.isNetworkSupported(oS.state.activeCaipNetwork?.caipNetworkId)?oP.get({path:`/v1/sessions/${e}`}):[],revokeSmartSession:async(e,t,r)=>await oP.isNetworkSupported(oS.state.activeCaipNetwork?.caipNetworkId)?oO.api.post({path:`/v1/sessions/${e}/revoke`,params:{projectId:eZ.state.projectId},body:{pci:t,signature:r}}):{success:!1},setClientId(e){oO.clientId=e,oO.api=new eM({baseUrl:oT,clientId:e})}},oR=eI({currentTab:0,tokenBalance:[],smartAccountDeployed:!1,addressLabels:new Map,allAccounts:[]}),o$={state:oR,replaceState(e){e&&Object.assign(oR,eT(e))},subscribe:e=>oS.subscribeChainProp("accountState",t=>{if(t)return e(t)}),subscribeKey(e,t,r){let i;return oS.subscribeChainProp("accountState",r=>{if(r){let a=r[e];i!==a&&(i=a,t(a))}},r)},setStatus(e,t){oS.setAccountProp("status",e,t)},getCaipAddress:e=>oS.getAccountProp("caipAddress",e),setCaipAddress(e,t){let r=e?eL.getPlainAddress(e):void 0;t===oS.state.activeChain&&(oS.state.activeCaipAddress=e),oS.setAccountProp("caipAddress",e,t),oS.setAccountProp("address",r,t)},setBalance(e,t,r){oS.setAccountProp("balance",e,r),oS.setAccountProp("balanceSymbol",t,r)},setProfileName(e,t){oS.setAccountProp("profileName",e,t)},setProfileImage(e,t){oS.setAccountProp("profileImage",e,t)},setUser(e,t){oS.setAccountProp("user",e,t)},setAddressExplorerUrl(e,t){oS.setAccountProp("addressExplorerUrl",e,t)},setSmartAccountDeployed(e,t){oS.setAccountProp("smartAccountDeployed",e,t)},setCurrentTab(e){oS.setAccountProp("currentTab",e,oS.state.activeChain)},setTokenBalance(e,t){e&&oS.setAccountProp("tokenBalance",e,t)},setShouldUpdateToAddress(e,t){oS.setAccountProp("shouldUpdateToAddress",e,t)},setAllAccounts(e,t){oS.setAccountProp("allAccounts",e,t)},addAddressLabel(e,t,r){let i=oS.getAccountProp("addressLabels",r)||new Map;i.set(e,t),oS.setAccountProp("addressLabels",i,r)},removeAddressLabel(e,t){let r=oS.getAccountProp("addressLabels",t)||new Map;r.delete(e),oS.setAccountProp("addressLabels",r,t)},setConnectedWalletInfo(e,t){oS.setAccountProp("connectedWalletInfo",e,t,!1)},setPreferredAccountType(e,t){oS.setAccountProp("preferredAccountTypes",{...oR.preferredAccountTypes,[t]:e},t)},setPreferredAccountTypes(e){oR.preferredAccountTypes=e},setSocialProvider(e,t){e&&oS.setAccountProp("socialProvider",e,t)},setSocialWindow(e,t){oS.setAccountProp("socialWindow",e?eT(e):void 0,t)},setFarcasterUrl(e,t){oS.setAccountProp("farcasterUrl",e,t)},async fetchTokenBalance(e){oR.balanceLoading=!0;let t=oS.state.activeCaipNetwork?.caipNetworkId,r=oS.state.activeCaipNetwork?.chainNamespace,i=oS.state.activeCaipAddress,a=i?eL.getPlainAddress(i):void 0;if(oR.lastRetry&&!eL.isAllowedRetry(oR.lastRetry,30*eR.ONE_SEC_MS))return oR.balanceLoading=!1,[];try{if(a&&t&&r){let e=(await oP.getBalance(a,t)).balances.filter(e=>"0"!==e.quantity.decimals);return this.setTokenBalance(e,r),oR.lastRetry=void 0,oR.balanceLoading=!1,e}}catch(t){oR.lastRetry=Date.now(),e?.(t),ta.showError("Token Balance Unavailable")}finally{oR.balanceLoading=!1}return[]},resetAccount(e){oS.resetAccount(e)}},oL=eI({loading:!1,loadingNamespaceMap:new Map,open:!1,shake:!1,namespace:void 0}),oB={state:oL,subscribe:e=>eS(oL,()=>e(oL)),subscribeKey:(e,t)=>eO(oL,e,t),async open(e){let t="connected"===o$.state.status;tc.state.wcBasic?e2.prefetch({fetchNetworkImages:!1,fetchConnectorImages:!1}):await e2.prefetch({fetchConnectorImages:!t,fetchFeaturedWallets:!t,fetchRecommendedWallets:!t}),e?.namespace?(await oS.switchActiveNamespace(e.namespace),oB.setLoading(!0,e.namespace)):oB.setLoading(!0),e7.setFilterByNamespace(e?.namespace);let r=oS.getAccountData(e?.namespace)?.caipAddress;oS.state.noAdapters&&!r?eL.isMobile()?e5.reset("AllWallets"):e5.reset("ConnectingWalletConnectBasic"):e?.view?e5.reset(e.view,e.data):r?e5.reset("Account"):e5.reset("Connect"),oL.open=!0,tu.set({open:!0}),eJ.sendEvent({type:"track",event:"MODAL_OPEN",properties:{connected:!!r}})},close(){let e=eZ.state.enableEmbedded,t=!!oS.state.activeCaipAddress;oL.open&&eJ.sendEvent({type:"track",event:"MODAL_CLOSE",properties:{connected:t}}),oL.open=!1,oB.clearLoading(),e?t?e5.replace("Account"):e5.push("Connect"):tu.set({open:!1}),tc.resetUri()},setLoading(e,t){t&&oL.loadingNamespaceMap.set(t,e),oL.loading=e,tu.set({loading:e})},clearLoading(){oL.loadingNamespaceMap.clear(),oL.loading=!1},shake(){oL.shake||(oL.shake=!0,setTimeout(()=>{oL.shake=!1},500))}},oM={id:"2b92315d-eab7-5bef-84fa-089a131333f5",name:"USD Coin",symbol:"USDC",networks:[{name:"ethereum-mainnet",display_name:"Ethereum",chain_id:"1",contract_address:"0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48"},{name:"polygon-mainnet",display_name:"Polygon",chain_id:"137",contract_address:"0x2791Bca1f2de4661ED88A30C99A7a9449Aa84174"}]};eI({providers:[{label:"Coinbase",name:"coinbase",feeRange:"1-2%",url:"",supportedChains:["eip155"]},{label:"Meld.io",name:"meld",feeRange:"1-2%",url:"https://meldcrypto.com",supportedChains:["eip155","solana"]}],selectedProvider:null,error:null,purchaseCurrency:oM,paymentCurrency:{id:"USD",payment_method_limits:[{id:"card",min:"10.00",max:"7500.00"},{id:"ach_bank_account",min:"10.00",max:"25000.00"}]},purchaseCurrencies:[oM],paymentCurrencies:[],quotesLoading:!1}),eI({initializing:!1,initialized:!1,loadingPrices:!1,loadingQuote:!1,loadingApprovalTransaction:!1,loadingBuildTransaction:!1,loadingTransaction:!1,fetchError:!1,approvalTransaction:void 0,swapTransaction:void 0,transactionError:void 0,sourceToken:void 0,sourceTokenAmount:"",sourceTokenPriceInUSD:0,toToken:void 0,toTokenAmount:"",toTokenPriceInUSD:0,networkPrice:"0",networkBalanceInUSD:"0",networkTokenSymbol:"",inputError:void 0,slippage:eR.CONVERT_SLIPPAGE_TOLERANCE,tokens:void 0,popularTokens:void 0,suggestedTokens:void 0,foundTokens:void 0,myTokensWithBalance:void 0,tokensPriceMap:{},gasFee:"0",gasPriceInUSD:0,priceImpact:void 0,maxSlippage:void 0,providerFee:void 0});let oU=eI({message:"",open:!1,triggerRect:{width:0,height:0,top:0,left:0},variant:"shade"}),oz={state:oU,subscribe:e=>eS(oU,()=>e(oU)),subscribeKey:(e,t)=>eO(oU,e,t),showTooltip({message:e,triggerRect:t,variant:r}){oU.open=!0,oU.message=e,oU.triggerRect=t,oU.variant=r},hide(){oU.open=!1,oU.message="",oU.triggerRect={width:0,height:0,top:0,left:0}}},oD={convertEVMChainIdToCoinType(e){if(e>=2147483648)throw Error("Invalid chainId");return(2147483648|e)>>>0}},oj=eI({suggestions:[],loading:!1}),oW={state:oj,subscribe:e=>eS(oj,()=>e(oj)),subscribeKey:(e,t)=>eO(oj,e,t),async resolveName(e){try{return await oP.lookupEnsName(e)}catch(e){throw Error(e?.reasons?.[0]?.description||"Error resolving name")}},async isNameRegistered(e){try{return await oP.lookupEnsName(e),!0}catch{return!1}},async getSuggestions(e){try{oj.loading=!0,oj.suggestions=[];let t=await oP.getEnsNameSuggestions(e);return oj.suggestions=t.suggestions.map(e=>({...e,name:e.name}))||[],oj.suggestions}catch(e){throw Error(this.parseEnsApiError(e,"Error fetching name suggestions"))}finally{oj.loading=!1}},async getNamesForAddress(e){try{if(!oS.state.activeCaipNetwork)return[];let t=e$.getEnsFromCacheForAddress(e);if(t)return t;let r=await oP.reverseLookupEnsName({address:e});return e$.updateEnsCache({address:e,ens:r,timestamp:Date.now()}),r}catch(e){throw Error(this.parseEnsApiError(e,"Error fetching names for address"))}},async registerName(e){let t=oS.state.activeCaipNetwork;if(!t)throw Error("Network not found");let r=o$.state.address,i=e7.getAuthConnector();if(!r||!i)throw Error("Address or auth connector not found");oj.loading=!0;try{let i=JSON.stringify({name:e,attributes:{},timestamp:Math.floor(Date.now()/1e3)});e5.pushTransactionStack({view:"RegisterAccountNameSuccess",goBack:!1,replace:!0,onCancel(){oj.loading=!1}});let a=await tc.signMessage(i),o=t.id;if(!o)throw Error("Network not found");let n=oD.convertEVMChainIdToCoinType(Number(o));await oP.registerEnsName({coinType:n,address:r,signature:a,message:i}),o$.setProfileName(e,t.chainNamespace),e5.replace("RegisterAccountNameSuccess")}catch(r){let t=this.parseEnsApiError(r,`Error registering name ${e}`);throw e5.replace("RegisterAccountName"),Error(t)}finally{oj.loading=!1}},validateName:e=>/^[a-zA-Z0-9-]{4,}$/u.test(e),parseEnsApiError:(e,t)=>e?.reasons?.[0]?.description||t};eI({isLegalCheckboxChecked:!1});let oH={METMASK_CONNECTOR_NAME:"MetaMask",TRUST_CONNECTOR_NAME:"Trust Wallet",SOLFLARE_CONNECTOR_NAME:"Solflare",PHANTOM_CONNECTOR_NAME:"Phantom",COIN98_CONNECTOR_NAME:"Coin98",MAGIC_EDEN_CONNECTOR_NAME:"Magic Eden",BACKPACK_CONNECTOR_NAME:"Backpack",BITGET_CONNECTOR_NAME:"Bitget Wallet",FRONTIER_CONNECTOR_NAME:"Frontier",XVERSE_CONNECTOR_NAME:"Xverse Wallet",LEATHER_CONNECTOR_NAME:"Leather",EIP155:"eip155",CONNECTOR_TYPE_WALLET_CONNECT:"WALLET_CONNECT",CONNECTOR_TYPE_INJECTED:"INJECTED",CONNECTOR_TYPE_ANNOUNCED:"ANNOUNCED"},oF=(ec.CONNECTOR_ID.COINBASE,ec.CONNECTOR_ID.COINBASE_SDK,ec.CONNECTOR_ID.SAFE,ec.CONNECTOR_ID.LEDGER,ec.CONNECTOR_ID.OKX,oH.METMASK_CONNECTOR_NAME,oH.TRUST_CONNECTOR_NAME,oH.SOLFLARE_CONNECTOR_NAME,oH.PHANTOM_CONNECTOR_NAME,oH.COIN98_CONNECTOR_NAME,oH.MAGIC_EDEN_CONNECTOR_NAME,oH.BACKPACK_CONNECTOR_NAME,oH.BITGET_CONNECTOR_NAME,oH.FRONTIER_CONNECTOR_NAME,oH.XVERSE_CONNECTOR_NAME,oH.LEATHER_CONNECTOR_NAME,{1:"ba0ba0cd-17c6-4806-ad93-f9d174f17900",42161:"3bff954d-5cb0-47a0-9a23-d20192e74600",43114:"30c46e53-e989-45fb-4549-be3bd4eb3b00",56:"93564157-2e8e-4ce7-81df-b264dbee9b00",250:"06b26297-fe0c-4733-5d6b-ffa5498aac00",10:"ab9c186a-c52f-464b-2906-ca59d760a400",137:"41d04d42-da3b-4453-8506-668cc0727900",5e3:"e86fae9b-b770-4eea-e520-150e12c81100",295:"6a97d510-cac8-4e58-c7ce-e8681b044c00",11155111:"e909ea0a-f92a-4512-c8fc-748044ea6800",84532:"a18a7ecd-e307-4360-4746-283182228e00",1301:"4eeea7ef-0014-4649-5d1d-07271a80f600",130:"2257980a-3463-48c6-cbac-a42d2a956e00",10143:"0a728e83-bacb-46db-7844-948f05434900",100:"02b53f6a-e3d4-479e-1cb4-21178987d100",9001:"f926ff41-260d-4028-635e-91913fc28e00",324:"b310f07f-4ef7-49f3-7073-2a0a39685800",314:"5a73b3dd-af74-424e-cae0-0de859ee9400",4689:"34e68754-e536-40da-c153-6ef2e7188a00",1088:"3897a66d-40b9-4833-162f-a2c90531c900",1284:"161038da-44ae-4ec7-1208-0ea569454b00",1285:"f1d73bb6-5450-4e18-38f7-fb6484264a00",7777777:"845c60df-d429-4991-e687-91ae45791600",42220:"ab781bbc-ccc6-418d-d32d-789b15da1f00",8453:"7289c336-3981-4081-c5f4-efc26ac64a00",1313161554:"3ff73439-a619-4894-9262-4470c773a100",2020:"b8101fc0-9c19-4b6f-ec65-f6dfff106e00",2021:"b8101fc0-9c19-4b6f-ec65-f6dfff106e00",80094:"e329c2c9-59b0-4a02-83e4-212ff3779900",2741:"fc2427d1-5af9-4a9c-8da5-6f94627cd900","5eykt4UsFv8P8NJdTREpY1vzqKqZKvdp":"a1b58899-f671-4276-6a5e-56ca5bd59700","4uhcVJyU9pJkvQyS88uRDiswHXSCkY3z":"a1b58899-f671-4276-6a5e-56ca5bd59700",EtWTRABZaYq6iMfeYKouRu166VU2xqa1:"a1b58899-f671-4276-6a5e-56ca5bd59700","000000000019d6689c085ae165831e93":"0b4838db-0161-4ffe-022d-532bf03dba00","000000000933ea01ad0ee984209779ba":"39354064-d79b-420b-065d-f980c4b78200"}),oV={[ec.CONNECTOR_ID.COINBASE]:"0c2840c3-5b04-4c44-9661-fbd4b49e1800",[ec.CONNECTOR_ID.COINBASE_SDK]:"0c2840c3-5b04-4c44-9661-fbd4b49e1800",[ec.CONNECTOR_ID.SAFE]:"461db637-8616-43ce-035a-d89b8a1d5800",[ec.CONNECTOR_ID.LEDGER]:"54a1aa77-d202-4f8d-0fb2-5d2bb6db0300",[ec.CONNECTOR_ID.WALLET_CONNECT]:"ef1a1fcf-7fe8-4d69-bd6d-fda1345b4400",[ec.CONNECTOR_ID.INJECTED]:"07ba87ed-43aa-4adf-4540-9e6a2b9cae00"},oZ={[ec.CONNECTOR_ID.INJECTED]:"Browser Wallet",[ec.CONNECTOR_ID.WALLET_CONNECT]:"WalletConnect",[ec.CONNECTOR_ID.COINBASE]:"Coinbase",[ec.CONNECTOR_ID.COINBASE_SDK]:"Coinbase",[ec.CONNECTOR_ID.LEDGER]:"Ledger",[ec.CONNECTOR_ID.SAFE]:"Safe"},oq=(ec.CONNECTOR_ID.INJECTED,ec.CONNECTOR_ID.WALLET_CONNECT,ec.CONNECTOR_ID.EIP6963,ec.CONNECTOR_ID.AUTH,{getCaipTokens(e){if(!e)return;let t={};return Object.entries(e).forEach(([e,r])=>{t[`${oH.EIP155}:${e}`]=r}),t},isLowerCaseMatch:(e,t)=>e?.toLowerCase()===t?.toLowerCase()}),oG={UniversalProviderErrors:{UNAUTHORIZED_DOMAIN_NOT_ALLOWED:{message:"Unauthorized: origin not allowed",alertErrorKey:"INVALID_APP_CONFIGURATION"},JWT_VALIDATION_ERROR:{message:"JWT validation error: JWT Token is not yet valid",alertErrorKey:"JWT_TOKEN_NOT_VALID"},INVALID_KEY:{message:"Unauthorized: invalid key",alertErrorKey:"INVALID_PROJECT_ID"}},ALERT_ERRORS:{SWITCH_NETWORK_NOT_FOUND:{shortMessage:"Network Not Found",longMessage:"Network not found - please make sure it is included in 'networks' array in createAppKit function"},INVALID_APP_CONFIGURATION:{shortMessage:"Invalid App Configuration",longMessage:()=>`Origin ${"u">typeof window?window.origin:"unknown"} not found on Allowlist - update configuration on cloud.reown.com`},SOCIALS_TIMEOUT:{shortMessage:"Invalid App Configuration",longMessage:()=>"There was an issue loading the embedded wallet. Please verify that your domain is allowed at cloud.reown.com"},JWT_TOKEN_NOT_VALID:{shortMessage:"Session Expired",longMessage:"Invalid session found on UniversalProvider - please check your time settings and connect again"},INVALID_PROJECT_ID:{shortMessage:"Invalid App Configuration",longMessage:"Invalid Project ID - update configuration"},PROJECT_ID_NOT_CONFIGURED:{shortMessage:"Project ID Not Configured",longMessage:"Project ID Not Configured - update configuration on cloud.reown.com"}}};function oK(e){try{return JSON.stringify(e)}catch{return'"[Circular]"'}}let oY=function(e,t,r){var i=r&&r.stringify||oK;if("object"==typeof e&&null!==e){var a=t.length+1;if(1===a)return e;var o=Array(a);o[0]=i(e);for(var n=1;n<a;n++)o[n]=i(t[n]);return o.join(" ")}if("string"!=typeof e)return e;var s=t.length;if(0===s)return e;for(var l="",c=0,d=-1,u=e&&e.length||0,h=0;h<u;){if(37===e.charCodeAt(h)&&h+1<u){switch(d=d>-1?d:0,e.charCodeAt(h+1)){case 100:case 102:if(c>=s||null==t[c])break;d<h&&(l+=e.slice(d,h)),l+=Number(t[c]),d=h+2,h++;break;case 105:if(c>=s||null==t[c])break;d<h&&(l+=e.slice(d,h)),l+=Math.floor(Number(t[c])),d=h+2,h++;break;case 79:case 111:case 106:if(c>=s||void 0===t[c])break;d<h&&(l+=e.slice(d,h));var p=typeof t[c];if("string"===p){l+="'"+t[c]+"'",d=h+2,h++;break}if("function"===p){l+=t[c].name||"<anonymous>",d=h+2,h++;break}l+=i(t[c]),d=h+2,h++;break;case 115:if(c>=s)break;d<h&&(l+=e.slice(d,h)),l+=String(t[c]),d=h+2,h++;break;case 37:d<h&&(l+=e.slice(d,h)),l+="%",d=h+2,h++,c--}++c}++h}return -1===d?e:(d<u&&(l+=e.slice(d)),l)};var oX=oQ;let oJ=function(){function e(e){return"u">typeof e&&e}try{return"u">typeof globalThis||Object.defineProperty(Object.prototype,"globalThis",{get:function(){return delete Object.prototype.globalThis,this.globalThis=this},configurable:!0}),globalThis}catch{return e(self)||e(window)||e(this)||{}}}().console||{};function oQ(e){var t,r;(e=e||{}).browser=e.browser||{};let i=e.browser.transmit;if(i&&"function"!=typeof i.send)throw Error("pino: transmit option must have a send function");let a=e.browser.write||oJ;e.browser.write&&(e.browser.asObject=!0);let o=e.serializers||{},n=Array.isArray(t=e.browser.serialize)?t.filter(function(e){return"!stdSerializers.err"!==e}):!0===t&&Object.keys(o),s=e.browser.serialize;Array.isArray(e.browser.serialize)&&e.browser.serialize.indexOf("!stdSerializers.err")>-1&&(s=!1),"function"==typeof a&&(a.error=a.fatal=a.warn=a.info=a.debug=a.trace=a),!1===e.enabled&&(e.level="silent");let l=e.level||"info",c=Object.create(a);c.log||(c.log=o6),Object.defineProperty(c,"levelVal",{get:function(){return"silent"===this.level?1/0:this.levels.values[this.level]}}),Object.defineProperty(c,"level",{get:function(){return this._level},set:function(e){if("silent"!==e&&!this.levels.values[e])throw Error("unknown level "+e);this._level=e,o0(d,c,"error","log"),o0(d,c,"fatal","error"),o0(d,c,"warn","error"),o0(d,c,"info","log"),o0(d,c,"debug","log"),o0(d,c,"trace","log")}});let d={transmit:i,serialize:n,asObject:e.browser.asObject,levels:["error","fatal","warn","info","debug","trace"],timestamp:"function"==typeof(r=e).timestamp?r.timestamp:!1===r.timestamp?o8:o9};return c.levels=oQ.levels,c.level=l,c.setMaxListeners=c.getMaxListeners=c.emit=c.addListener=c.on=c.prependListener=c.once=c.prependOnceListener=c.removeListener=c.removeAllListeners=c.listeners=c.listenerCount=c.eventNames=c.write=c.flush=o6,c.serializers=o,c._serialize=n,c._stdErrSerialize=s,c.child=function(t,r){if(!t)throw Error("missing bindings for child Pino");r=r||{},n&&t.serializers&&(r.serializers=t.serializers);let a=r.serializers;if(n&&a){var s=Object.assign({},o,a),l=!0===e.browser.serialize?Object.keys(s):n;delete t.serializers,o1([t],l,s,this._stdErrSerialize)}function c(e){this._childLevel=(0|e._childLevel)+1,this.error=o2(e,t,"error"),this.fatal=o2(e,t,"fatal"),this.warn=o2(e,t,"warn"),this.info=o2(e,t,"info"),this.debug=o2(e,t,"debug"),this.trace=o2(e,t,"trace"),s&&(this.serializers=s,this._serialize=l),i&&(this._logEvent=o3([].concat(e._logEvent.bindings,t)))}return c.prototype=this,new c(this)},i&&(c._logEvent=o3()),c}function o0(e,t,r,i){var a;let o=Object.getPrototypeOf(t);t[r]=t.levelVal>t.levels.values[r]?o6:o[r]?o[r]:oJ[r]||oJ[i]||o6,(e.transmit||t[r]!==o6)&&(t[r]=(a=t[r],function(){let i=e.timestamp(),o=Array(arguments.length),n=Object.getPrototypeOf&&Object.getPrototypeOf(this)===oJ?oJ:this;for(var s=0;s<o.length;s++)o[s]=arguments[s];if(e.serialize&&!e.asObject&&o1(o,this._serialize,this.serializers,this._stdErrSerialize),e.asObject?a.call(n,function(e,t,r,i){e._serialize&&o1(r,e._serialize,e.serializers,e._stdErrSerialize);let a=r.slice(),o=a[0],n={};i&&(n.time=i),n.level=oQ.levels.values[t];let s=(0|e._childLevel)+1;if(s<1&&(s=1),null!==o&&"object"==typeof o){for(;s--&&"object"==typeof a[0];)Object.assign(n,a.shift());o=a.length?oY(a.shift(),a):void 0}else"string"==typeof o&&(o=oY(a.shift(),a));return void 0!==o&&(n.msg=o),n}(this,r,o,i)):a.apply(n,o),e.transmit){let a=e.transmit.level||t.level,n=oQ.levels.values[a],s=oQ.levels.values[r];if(s<n)return;(function(e,t,r){let i=t.send,a=t.ts,o=t.methodLevel,n=t.methodValue,s=t.val,l=e._logEvent.bindings;o1(r,e._serialize||Object.keys(e.serializers),e.serializers,void 0===e._stdErrSerialize||e._stdErrSerialize),e._logEvent.ts=a,e._logEvent.messages=r.filter(function(e){return -1===l.indexOf(e)}),e._logEvent.level.label=o,e._logEvent.level.value=n,i(o,e._logEvent,s),e._logEvent=o3(l)})(this,{ts:i,methodLevel:r,methodValue:s,transmitLevel:a,transmitValue:oQ.levels.values[e.transmit.level||t.level],send:e.transmit.send,val:t.levelVal},o)}}))}function o1(e,t,r,i){for(let a in e)if(i&&e[a]instanceof Error)e[a]=oQ.stdSerializers.err(e[a]);else if("object"==typeof e[a]&&!Array.isArray(e[a]))for(let i in e[a])t&&t.indexOf(i)>-1&&i in r&&(e[a][i]=r[i](e[a][i]))}function o2(e,t,r){return function(){let i=Array(1+arguments.length);i[0]=t;for(var a=1;a<i.length;a++)i[a]=arguments[a-1];return e[r].apply(this,i)}}function o3(e){return{ts:0,messages:[],bindings:e||[],level:{label:"",value:0}}}function o5(){return{}}function o4(e){return e}function o6(){}function o8(){return!1}function o9(){return Date.now()}oQ.levels={values:{fatal:60,error:50,warn:40,info:30,debug:20,trace:10},labels:{10:"trace",20:"debug",30:"info",40:"warn",50:"error",60:"fatal"}},oQ.stdSerializers={mapHttpRequest:o5,mapHttpResponse:o5,wrapRequestSerializer:o4,wrapResponseSerializer:o4,wrapErrorSerializer:o4,req:o5,res:o5,err:function(e){let t={type:e.constructor.name,msg:e.message,stack:e.stack};for(let r in e)void 0===t[r]&&(t[r]=e[r]);return t}},oQ.stdTimeFunctions=Object.assign({},{nullTime:o8,epochTime:o9,unixTime:function(){return Math.round(Date.now()/1e3)},isoTime:function(){return new Date(Date.now()).toISOString()}});let o7=e=>JSON.stringify(e,(e,t)=>"bigint"==typeof t?t.toString()+"n":t);function ne(e){return"string"==typeof e?e:o7(e)||""}let nt={level:"info"};class nr{constructor(e){this.nodeValue=e,this.sizeInBytes=new TextEncoder().encode(this.nodeValue).length,this.next=null}get value(){return this.nodeValue}get size(){return this.sizeInBytes}}class ni{constructor(e){this.head=null,this.tail=null,this.lengthInNodes=0,this.maxSizeInBytes=e,this.sizeInBytes=0}append(e){let t=new nr(e);if(t.size>this.maxSizeInBytes)throw Error(`[LinkedList] Value too big to insert into list: ${e} with size ${t.size}`);for(;this.size+t.size>this.maxSizeInBytes;)this.shift();this.head?this.tail&&(this.tail.next=t):this.head=t,this.tail=t,this.lengthInNodes++,this.sizeInBytes+=t.size}shift(){if(!this.head)return;let e=this.head;this.head=this.head.next,this.head||(this.tail=null),this.lengthInNodes--,this.sizeInBytes-=e.size}toArray(){let e=[],t=this.head;for(;null!==t;)e.push(t.value),t=t.next;return e}get length(){return this.lengthInNodes}get size(){return this.sizeInBytes}toOrderedArray(){return Array.from(this)}[Symbol.iterator](){let e=this.head;return{next:()=>{if(!e)return{done:!0,value:null};let t=e.value;return e=e.next,{done:!1,value:t}}}}}class na{constructor(e,t=1024e3){this.level=e??"error",this.levelValue=oX.levels.values[this.level],this.MAX_LOG_SIZE_IN_BYTES=t,this.logs=new ni(this.MAX_LOG_SIZE_IN_BYTES)}forwardToConsole(e,t){t===oX.levels.values.error?console.error(e):t===oX.levels.values.warn?console.warn(e):t===oX.levels.values.debug?console.debug(e):t===oX.levels.values.trace?console.trace(e):console.log(e)}appendToLogs(e){this.logs.append(ne({timestamp:new Date().toISOString(),log:e}));let t="string"==typeof e?JSON.parse(e).level:e.level;t>=this.levelValue&&this.forwardToConsole(e,t)}getLogs(){return this.logs}clearLogs(){this.logs=new ni(this.MAX_LOG_SIZE_IN_BYTES)}getLogArray(){return Array.from(this.logs)}logsToBlob(e){let t=this.getLogArray();return t.push(ne({extraMetadata:e})),new Blob(t,{type:"application/json"})}}class no{constructor(e,t=1024e3){this.baseChunkLogger=new na(e,t)}write(e){this.baseChunkLogger.appendToLogs(e)}getLogs(){return this.baseChunkLogger.getLogs()}clearLogs(){this.baseChunkLogger.clearLogs()}getLogArray(){return this.baseChunkLogger.getLogArray()}logsToBlob(e){return this.baseChunkLogger.logsToBlob(e)}downloadLogsBlobInBrowser(e){let t=URL.createObjectURL(this.logsToBlob(e)),r=document.createElement("a");r.href=t,r.download=`walletconnect-logs-${new Date().toISOString()}.txt`,document.body.appendChild(r),r.click(),document.body.removeChild(r),URL.revokeObjectURL(t)}}class nn{constructor(e,t=1024e3){this.baseChunkLogger=new na(e,t)}write(e){this.baseChunkLogger.appendToLogs(e)}getLogs(){return this.baseChunkLogger.getLogs()}clearLogs(){this.baseChunkLogger.clearLogs()}getLogArray(){return this.baseChunkLogger.getLogArray()}logsToBlob(e){return this.baseChunkLogger.logsToBlob(e)}}var ns=Object.defineProperty,nl=Object.defineProperties,nc=Object.getOwnPropertyDescriptors,nd=Object.getOwnPropertySymbols,nu=Object.prototype.hasOwnProperty,nh=Object.prototype.propertyIsEnumerable,np=(e,t,r)=>t in e?ns(e,t,{enumerable:!0,configurable:!0,writable:!0,value:r}):e[t]=r,ng=(e,t)=>{for(var r in t||(t={}))nu.call(t,r)&&np(e,r,t[r]);if(nd)for(var r of nd(t))nh.call(t,r)&&np(e,r,t[r]);return e},nf=(e,t)=>nl(e,nc(t));let nw={createLogger(e,t="error"){var r,i;let{logger:a}="u">typeof(i={opts:nf(ng({},r={level:t}),{level:r?.level||nt.level})}).loggerOverride&&"string"!=typeof i.loggerOverride?{logger:i.loggerOverride,chunkLoggerController:null}:"u">typeof window?function(e){var t,r;let i=new no(null==(t=e.opts)?void 0:t.level,e.maxSizeInBytes);return{logger:oX(nf(ng({},e.opts),{level:"trace",browser:nf(ng({},null==(r=e.opts)?void 0:r.browser),{write:e=>i.write(e)})})),chunkLoggerController:i}}(i):function(e){var t;let r=new nn(null==(t=e.opts)?void 0:t.level,e.maxSizeInBytes);return{logger:oX(nf(ng({},e.opts),{level:"trace"})),chunkLoggerController:r}}(i);return a.error=(...t)=>{for(let r of t)if(r instanceof Error){e(r,...t);return}e(void 0,...t)},a}};function nm(e,t){let r=new URL("https://rpc.walletconnect.org/v1/");return r.searchParams.set("chainId",e),r.searchParams.set("projectId",t),r.toString()}let nv=["near:mainnet","solana:5eykt4UsFv8P8NJdTREpY1vzqKqZKvdp","eip155:1101","eip155:56","eip155:42161","eip155:7777777","eip155:59144","eip155:324","solana:EtWTRABZaYq6iMfeYKouRu166VU2xqa1","eip155:5000","solana:4sgjmw1sunhzsxgspuhpqldx6wiyjntz","eip155:80084","eip155:5003","eip155:100","eip155:8453","eip155:42220","eip155:1313161555","eip155:17000","eip155:1","eip155:300","eip155:1313161554","eip155:1329","eip155:84532","eip155:421614","eip155:11155111","eip155:8217","eip155:43114","solana:4uhcVJyU9pJkvQyS88uRDiswHXSCkY3z","eip155:999999999","eip155:11155420","eip155:80002","eip155:97","eip155:43113","eip155:137","eip155:10","eip155:1301","bip122:000000000019d6689c085ae165831e93","bip122:000000000933ea01ad0ee984209779ba"],nb={extendRpcUrlWithProjectId(e,t){let r=!1;try{r="rpc.walletconnect.org"===new URL(e).host}catch{r=!1}if(r){let r=new URL(e);return r.searchParams.has("projectId")||r.searchParams.set("projectId",t),r.toString()}return e},isCaipNetwork:e=>"chainNamespace"in e&&"caipNetworkId"in e,getChainNamespace(e){return this.isCaipNetwork(e)?e.chainNamespace:ec.CHAIN.EVM},getCaipNetworkId(e){return this.isCaipNetwork(e)?e.caipNetworkId:`${ec.CHAIN.EVM}:${e.id}`},getDefaultRpcUrl(e,t,r){let i=e.rpcUrls?.default?.http?.[0];return nv.includes(t)?nm(t,r):i||""},extendCaipNetwork(e,{customNetworkImageUrls:t,projectId:r,customRpcUrls:i}){let a=this.getChainNamespace(e),o=this.getCaipNetworkId(e),n=e.rpcUrls.default.http?.[0],s=this.getDefaultRpcUrl(e,o,r),l=e?.rpcUrls?.chainDefault?.http?.[0]||n,c=i?.[o]?.map(e=>e.url)||[],d=[...c,s],u=[...c];return l&&!u.includes(l)&&u.push(l),{...e,chainNamespace:a,caipNetworkId:o,assets:{imageId:oF[e.id],imageUrl:t?.[e.id]},rpcUrls:{...e.rpcUrls,default:{http:d},chainDefault:{http:u}}}},extendCaipNetworks:(e,{customNetworkImageUrls:t,projectId:r,customRpcUrls:i})=>e.map(e=>nb.extendCaipNetwork(e,{customNetworkImageUrls:t,customRpcUrls:i,projectId:r})),getViemTransport(e,t,r){let i=[];return r?.forEach(e=>{i.push(iL(e.url,e.config))}),nv.includes(e.caipNetworkId)&&i.push(iL(nm(e.caipNetworkId,t),{fetchOptions:{headers:{"Content-Type":"text/plain"}}})),e?.rpcUrls?.default?.http?.forEach(e=>{i.push(iL(e))}),iO(i)},extendWagmiTransports(e,t,r){return nv.includes(e.caipNetworkId)?iO([r,iL(this.getDefaultRpcUrl(e,e.caipNetworkId,t))]):r},getUnsupportedNetwork:e=>({id:e.split(":")[1],caipNetworkId:e,name:ec.UNSUPPORTED_NETWORK_NAME,chainNamespace:e.split(":")[0],nativeCurrency:{name:"",decimals:0,symbol:""},rpcUrls:{default:{http:[]}}}),getCaipNetworkFromStorage(e){let t=e$.getActiveCaipNetworkId(),r=oS.getAllRequestedCaipNetworks(),i=Array.from(oS.state.chains?.keys()||[]),a=t?.split(":")[0],o=!!a&&i.includes(a),n=r?.find(e=>e.caipNetworkId===t);return o&&!n&&t?this.getUnsupportedNetwork(t):n||e||r?.[0]}},ny={eip155:void 0,solana:void 0,polkadot:void 0,bip122:void 0},nC=eI({providers:{...ny},providerIds:{...ny}}),nx={state:nC,subscribeKey:(e,t)=>eO(nC,e,t),subscribe:e=>eS(nC,()=>{e(nC)}),subscribeProviders:e=>eS(nC.providers,()=>e(nC.providers)),setProvider(e,t){t&&(nC.providers[e]=eT(t))},getProvider:e=>nC.providers[e],setProviderId(e,t){t&&(nC.providerIds[e]=t)},getProviderId(e){if(e)return nC.providerIds[e]},reset(){nC.providers={...ny},nC.providerIds={...ny}},resetChain(e){nC.providers[e]=void 0,nC.providerIds[e]=void 0}};(g=w||(w={})).Google="google",g.Github="github",g.Apple="apple",g.Facebook="facebook",g.X="x",g.Discord="discord",g.Farcaster="farcaster";let nE={ACCOUNT_TABS:[{label:"Tokens"},{label:"NFTs"},{label:"Activity"}],SECURE_SITE_ORIGIN:("u">typeof y&&"u">typeof y.env?y.env.NEXT_PUBLIC_SECURE_SITE_ORIGIN:void 0)||"https://secure.walletconnect.org",VIEW_DIRECTION:{Next:"next",Prev:"prev"},DEFAULT_CONNECT_METHOD_ORDER:["email","social","wallet"],ANIMATION_DURATIONS:{HeaderText:120,ModalHeight:150,ViewTransition:150}},nk={filterOutDuplicatesByRDNS(e){let t=eZ.state.enableEIP6963?e7.state.connectors:[],r=e$.getRecentWallets(),i=t.map(e=>e.info?.rdns).filter(Boolean),a=r.map(e=>e.rdns).filter(Boolean),o=i.concat(a);if(o.includes("io.metamask.mobile")&&eL.isMobile()){let e=o.indexOf("io.metamask.mobile");o[e]="io.metamask"}return e.filter(e=>!o.includes(String(e?.rdns)))},filterOutDuplicatesByIds(e){let t=e7.state.connectors.filter(e=>"ANNOUNCED"===e.type||"INJECTED"===e.type),r=e$.getRecentWallets(),i=t.map(e=>e.explorerId),a=r.map(e=>e.id),o=i.concat(a);return e.filter(e=>!o.includes(e?.id))},filterOutDuplicateWallets(e){let t=this.filterOutDuplicatesByRDNS(e);return this.filterOutDuplicatesByIds(t)},markWalletsAsInstalled(e){let{connectors:t}=e7.state,r=t.filter(e=>"ANNOUNCED"===e.type).reduce((e,t)=>(t.info?.rdns&&(e[t.info.rdns]=!0),e),{});return e.map(e=>({...e,installed:!!e.rdns&&!!r[e.rdns??""]})).sort((e,t)=>Number(t.installed)-Number(e.installed))},getConnectOrderMethod(e,t){let r=e?.connectMethodsOrder||eZ.state.features?.connectMethodsOrder,i=t||e7.state.connectors;if(r)return r;let{injected:a,announced:o}=nA.getConnectorsByType(i,e2.state.recommended,e2.state.featured),n=a.filter(nA.showConnector),s=o.filter(nA.showConnector);return n.length||s.length?["wallet","email","social"]:nE.DEFAULT_CONNECT_METHOD_ORDER},isExcluded(e){let t=!!e.rdns&&e2.state.excludedWallets.some(t=>t.rdns===e.rdns),r=!!e.name&&e2.state.excludedWallets.some(t=>oq.isLowerCaseMatch(t.name,e.name));return t||r}},nA={getConnectorsByType(e,t,r){let{customWallets:i}=eZ.state,a=e$.getRecentWallets(),o=nk.filterOutDuplicateWallets(t),n=nk.filterOutDuplicateWallets(r),s=e.filter(e=>"MULTI_CHAIN"===e.type),l=e.filter(e=>"ANNOUNCED"===e.type),c=e.filter(e=>"INJECTED"===e.type);return{custom:i,recent:a,external:e.filter(e=>"EXTERNAL"===e.type),multiChain:s,announced:l,injected:c,recommended:o,featured:n}},showConnector(e){let t=e.info?.rdns,r=!!t&&e2.state.excludedWallets.some(e=>!!e.rdns&&e.rdns===t),i=!!e.name&&e2.state.excludedWallets.some(t=>oq.isLowerCaseMatch(t.name,e.name));return!("INJECTED"===e.type&&(!eL.isMobile()&&"Browser Wallet"===e.name||!t&&!tc.checkInstalled()||r||i)||("ANNOUNCED"===e.type||"EXTERNAL"===e.type)&&(r||i))},getIsConnectedWithWC:()=>Array.from(oS.state.chains.values()).some(e=>e7.getConnectorId(e.namespace)===ec.CONNECTOR_ID.WALLET_CONNECT),getConnectorTypeOrder({recommended:e,featured:t,custom:r,recent:i,announced:a,injected:o,multiChain:n,external:s,overriddenConnectors:l=eZ.state.features?.connectorTypeOrder??[]}){let c=nA.getIsConnectedWithWC(),d=[{type:"walletConnect",isEnabled:eZ.state.enableWalletConnect&&!c},{type:"recent",isEnabled:i.length>0},{type:"injected",isEnabled:[...o,...a,...n].length>0},{type:"featured",isEnabled:t.length>0},{type:"custom",isEnabled:r&&r.length>0},{type:"external",isEnabled:s.length>0},{type:"recommended",isEnabled:e.length>0}].filter(e=>e.isEnabled),u=new Set(d.map(e=>e.type)),h=l.filter(e=>u.has(e)).map(e=>({type:e,isEnabled:!0})),p=d.filter(({type:e})=>!h.some(({type:t})=>t===e));return Array.from(new Set([...h,...p].map(({type:e})=>e)))}},nN=globalThis,nI=nN.ShadowRoot&&(void 0===nN.ShadyCSS||nN.ShadyCSS.nativeShadow)&&"adoptedStyleSheets"in Document.prototype&&"replace"in CSSStyleSheet.prototype,nS=Symbol(),n_=new WeakMap;class nT{constructor(e,t,r){if(this._$cssResult$=!0,r!==nS)throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");this.cssText=e,this.t=t}get styleSheet(){let e=this.o,t=this.t;if(nI&&void 0===e){let r=void 0!==t&&1===t.length;r&&(e=n_.get(t)),void 0===e&&((this.o=e=new CSSStyleSheet).replaceSync(this.cssText),r&&n_.set(t,e))}return e}toString(){return this.cssText}}let nO=e=>new nT("string"==typeof e?e:e+"",void 0,nS),nP=(e,...t)=>new nT(1===e.length?e[0]:t.reduce((t,r,i)=>t+(e=>{if(!0===e._$cssResult$)return e.cssText;if("number"==typeof e)return e;throw Error("Value passed to 'css' function must be a 'css' function result: "+e+". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.")})(r)+e[i+1],e[0]),e,nS),nR=(e,t)=>{if(nI)e.adoptedStyleSheets=t.map(e=>e instanceof CSSStyleSheet?e:e.styleSheet);else for(let r of t){let t=document.createElement("style"),i=nN.litNonce;void 0!==i&&t.setAttribute("nonce",i),t.textContent=r.cssText,e.appendChild(t)}},n$=nI?e=>e:e=>e instanceof CSSStyleSheet?(e=>{let t="";for(let r of e.cssRules)t+=r.cssText;return nO(t)})(e):e,{is:nL,defineProperty:nB,getOwnPropertyDescriptor:nM,getOwnPropertyNames:nU,getOwnPropertySymbols:nz,getPrototypeOf:nD}=Object,nj=globalThis,nW=nj.trustedTypes,nH=nW?nW.emptyScript:"",nF=nj.reactiveElementPolyfillSupport,nV=(e,t)=>e,nZ={toAttribute(e,t){switch(t){case Boolean:e=e?nH:null;break;case Object:case Array:e=null==e?e:JSON.stringify(e)}return e},fromAttribute(e,t){let r=e;switch(t){case Boolean:r=null!==e;break;case Number:r=null===e?null:Number(e);break;case Object:case Array:try{r=JSON.parse(e)}catch{r=null}}return r}},nq=(e,t)=>!nL(e,t),nG={attribute:!0,type:String,converter:nZ,reflect:!1,useDefault:!1,hasChanged:nq};Symbol.metadata??=Symbol("metadata"),nj.litPropertyMetadata??=new WeakMap;class nK extends HTMLElement{static addInitializer(e){this._$Ei(),(this.l??=[]).push(e)}static get observedAttributes(){return this.finalize(),this._$Eh&&[...this._$Eh.keys()]}static createProperty(e,t=nG){if(t.state&&(t.attribute=!1),this._$Ei(),this.prototype.hasOwnProperty(e)&&((t=Object.create(t)).wrapped=!0),this.elementProperties.set(e,t),!t.noAccessor){let r=Symbol(),i=this.getPropertyDescriptor(e,r,t);void 0!==i&&nB(this.prototype,e,i)}}static getPropertyDescriptor(e,t,r){let{get:i,set:a}=nM(this.prototype,e)??{get(){return this[t]},set(e){this[t]=e}};return{get:i,set(t){let o=i?.call(this);a?.call(this,t),this.requestUpdate(e,o,r)},configurable:!0,enumerable:!0}}static getPropertyOptions(e){return this.elementProperties.get(e)??nG}static _$Ei(){if(this.hasOwnProperty(nV("elementProperties")))return;let e=nD(this);e.finalize(),void 0!==e.l&&(this.l=[...e.l]),this.elementProperties=new Map(e.elementProperties)}static finalize(){if(this.hasOwnProperty(nV("finalized")))return;if(this.finalized=!0,this._$Ei(),this.hasOwnProperty(nV("properties"))){let e=this.properties;for(let t of[...nU(e),...nz(e)])this.createProperty(t,e[t])}let e=this[Symbol.metadata];if(null!==e){let t=litPropertyMetadata.get(e);if(void 0!==t)for(let[e,r]of t)this.elementProperties.set(e,r)}for(let[e,t]of(this._$Eh=new Map,this.elementProperties)){let r=this._$Eu(e,t);void 0!==r&&this._$Eh.set(r,e)}this.elementStyles=this.finalizeStyles(this.styles)}static finalizeStyles(e){let t=[];if(Array.isArray(e))for(let r of new Set(e.flat(1/0).reverse()))t.unshift(n$(r));else void 0!==e&&t.push(n$(e));return t}static _$Eu(e,t){let r=t.attribute;return!1===r?void 0:"string"==typeof r?r:"string"==typeof e?e.toLowerCase():void 0}constructor(){super(),this._$Ep=void 0,this.isUpdatePending=!1,this.hasUpdated=!1,this._$Em=null,this._$Ev()}_$Ev(){this._$ES=new Promise(e=>this.enableUpdating=e),this._$AL=new Map,this._$E_(),this.requestUpdate(),this.constructor.l?.forEach(e=>e(this))}addController(e){(this._$EO??=new Set).add(e),void 0!==this.renderRoot&&this.isConnected&&e.hostConnected?.()}removeController(e){this._$EO?.delete(e)}_$E_(){let e=new Map;for(let t of this.constructor.elementProperties.keys())this.hasOwnProperty(t)&&(e.set(t,this[t]),delete this[t]);e.size>0&&(this._$Ep=e)}createRenderRoot(){let e=this.shadowRoot??this.attachShadow(this.constructor.shadowRootOptions);return nR(e,this.constructor.elementStyles),e}connectedCallback(){this.renderRoot??=this.createRenderRoot(),this.enableUpdating(!0),this._$EO?.forEach(e=>e.hostConnected?.())}enableUpdating(e){}disconnectedCallback(){this._$EO?.forEach(e=>e.hostDisconnected?.())}attributeChangedCallback(e,t,r){this._$AK(e,r)}_$ET(e,t){let r=this.constructor.elementProperties.get(e),i=this.constructor._$Eu(e,r);if(void 0!==i&&!0===r.reflect){let a=(r.converter?.toAttribute!==void 0?r.converter:nZ).toAttribute(t,r.type);this._$Em=e,null==a?this.removeAttribute(i):this.setAttribute(i,a),this._$Em=null}}_$AK(e,t){let r=this.constructor,i=r._$Eh.get(e);if(void 0!==i&&this._$Em!==i){let e=r.getPropertyOptions(i),a="function"==typeof e.converter?{fromAttribute:e.converter}:e.converter?.fromAttribute!==void 0?e.converter:nZ;this._$Em=i,this[i]=a.fromAttribute(t,e.type)??this._$Ej?.get(i)??null,this._$Em=null}}requestUpdate(e,t,r){if(void 0!==e){let i=this.constructor,a=this[e];if(!(((r??=i.getPropertyOptions(e)).hasChanged??nq)(a,t)||r.useDefault&&r.reflect&&a===this._$Ej?.get(e)&&!this.hasAttribute(i._$Eu(e,r))))return;this.C(e,t,r)}!1===this.isUpdatePending&&(this._$ES=this._$EP())}C(e,t,{useDefault:r,reflect:i,wrapped:a},o){r&&!(this._$Ej??=new Map).has(e)&&(this._$Ej.set(e,o??t??this[e]),!0!==a||void 0!==o)||(this._$AL.has(e)||(this.hasUpdated||r||(t=void 0),this._$AL.set(e,t)),!0===i&&this._$Em!==e&&(this._$Eq??=new Set).add(e))}async _$EP(){this.isUpdatePending=!0;try{await this._$ES}catch(e){Promise.reject(e)}let e=this.scheduleUpdate();return null!=e&&await e,!this.isUpdatePending}scheduleUpdate(){return this.performUpdate()}performUpdate(){if(!this.isUpdatePending)return;if(!this.hasUpdated){if(this.renderRoot??=this.createRenderRoot(),this._$Ep){for(let[e,t]of this._$Ep)this[e]=t;this._$Ep=void 0}let e=this.constructor.elementProperties;if(e.size>0)for(let[t,r]of e){let{wrapped:e}=r,i=this[t];!0!==e||this._$AL.has(t)||void 0===i||this.C(t,void 0,r,i)}}let e=!1,t=this._$AL;try{(e=this.shouldUpdate(t))?(this.willUpdate(t),this._$EO?.forEach(e=>e.hostUpdate?.()),this.update(t)):this._$EM()}catch(t){throw e=!1,this._$EM(),t}e&&this._$AE(t)}willUpdate(e){}_$AE(e){this._$EO?.forEach(e=>e.hostUpdated?.()),this.hasUpdated||(this.hasUpdated=!0,this.firstUpdated(e)),this.updated(e)}_$EM(){this._$AL=new Map,this.isUpdatePending=!1}get updateComplete(){return this.getUpdateComplete()}getUpdateComplete(){return this._$ES}shouldUpdate(e){return!0}update(e){this._$Eq&&=this._$Eq.forEach(e=>this._$ET(e,this[e])),this._$EM()}updated(e){}firstUpdated(e){}}nK.elementStyles=[],nK.shadowRootOptions={mode:"open"},nK[nV("elementProperties")]=new Map,nK[nV("finalized")]=new Map,nF?.({ReactiveElement:nK}),(nj.reactiveElementVersions??=[]).push("2.1.0");let nY=globalThis,nX=nY.trustedTypes,nJ=nX?nX.createPolicy("lit-html",{createHTML:e=>e}):void 0,nQ="$lit$",n0=`lit$${Math.random().toFixed(9).slice(2)}$`,n1="?"+n0,n2=`<${n1}>`,n3=document,n5=()=>n3.createComment(""),n4=e=>null===e||"object"!=typeof e&&"function"!=typeof e,n6=Array.isArray,n8=e=>n6(e)||"function"==typeof e?.[Symbol.iterator],n9=`[ 	
\f\r]`,n7=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,se=/-->/g,st=/>/g,sr=RegExp(`>|${n9}(?:([^\\s"'>=/]+)(${n9}*=${n9}*(?:[^ 	
\f\r"'\`<>=]|("|')|))|$)`,"g"),si=/'/g,sa=/"/g,so=/^(?:script|style|textarea|title)$/i,sn=e=>(t,...r)=>({_$litType$:e,strings:t,values:r}),ss=sn(1),sl=sn(2),sc=Symbol.for("lit-noChange"),sd=Symbol.for("lit-nothing"),su=new WeakMap,sh=n3.createTreeWalker(n3,129);function sp(e,t){if(!n6(e)||!e.hasOwnProperty("raw"))throw Error("invalid template strings array");return void 0!==nJ?nJ.createHTML(t):t}let sg=(e,t)=>{let r=e.length-1,i=[],a,o=2===t?"<svg>":3===t?"<math>":"",n=n7;for(let t=0;t<r;t++){let r=e[t],s,l,c=-1,d=0;for(;d<r.length&&(n.lastIndex=d,null!==(l=n.exec(r)));)d=n.lastIndex,n===n7?"!--"===l[1]?n=se:void 0!==l[1]?n=st:void 0!==l[2]?(so.test(l[2])&&(a=RegExp("</"+l[2],"g")),n=sr):void 0!==l[3]&&(n=sr):n===sr?">"===l[0]?(n=a??n7,c=-1):void 0===l[1]?c=-2:(c=n.lastIndex-l[2].length,s=l[1],n=void 0===l[3]?sr:'"'===l[3]?sa:si):n===sa||n===si?n=sr:n===se||n===st?n=n7:(n=sr,a=void 0);let u=n===sr&&e[t+1].startsWith("/>")?" ":"";o+=n===n7?r+n2:c>=0?(i.push(s),r.slice(0,c)+nQ+r.slice(c)+n0+u):r+n0+(-2===c?t:u)}return[sp(e,o+(e[r]||"<?>")+(2===t?"</svg>":3===t?"</math>":"")),i]};class sf{constructor({strings:e,_$litType$:t},r){let i;this.parts=[];let a=0,o=0,n=e.length-1,s=this.parts,[l,c]=sg(e,t);if(this.el=sf.createElement(l,r),sh.currentNode=this.el.content,2===t||3===t){let e=this.el.content.firstChild;e.replaceWith(...e.childNodes)}for(;null!==(i=sh.nextNode())&&s.length<n;){if(1===i.nodeType){if(i.hasAttributes())for(let e of i.getAttributeNames())if(e.endsWith(nQ)){let t=c[o++],r=i.getAttribute(e).split(n0),n=/([.?@])?(.*)/.exec(t);s.push({type:1,index:a,name:n[2],strings:r,ctor:"."===n[1]?sy:"?"===n[1]?sC:"@"===n[1]?sx:sb}),i.removeAttribute(e)}else e.startsWith(n0)&&(s.push({type:6,index:a}),i.removeAttribute(e));if(so.test(i.tagName)){let e=i.textContent.split(n0),t=e.length-1;if(t>0){i.textContent=nX?nX.emptyScript:"";for(let r=0;r<t;r++)i.append(e[r],n5()),sh.nextNode(),s.push({type:2,index:++a});i.append(e[t],n5())}}}else if(8===i.nodeType){if(i.data===n1)s.push({type:2,index:a});else{let e=-1;for(;-1!==(e=i.data.indexOf(n0,e+1));)s.push({type:7,index:a}),e+=n0.length-1}}a++}}static createElement(e,t){let r=n3.createElement("template");return r.innerHTML=e,r}}function sw(e,t,r=e,i){if(t===sc)return t;let a=void 0!==i?r._$Co?.[i]:r._$Cl,o=n4(t)?void 0:t._$litDirective$;return a?.constructor!==o&&(a?._$AO?.(!1),void 0===o?a=void 0:(a=new o(e))._$AT(e,r,i),void 0!==i?(r._$Co??=[])[i]=a:r._$Cl=a),void 0!==a&&(t=sw(e,a._$AS(e,t.values),a,i)),t}class sm{constructor(e,t){this._$AV=[],this._$AN=void 0,this._$AD=e,this._$AM=t}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}u(e){let{el:{content:t},parts:r}=this._$AD,i=(e?.creationScope??n3).importNode(t,!0);sh.currentNode=i;let a=sh.nextNode(),o=0,n=0,s=r[0];for(;void 0!==s;){if(o===s.index){let t;2===s.type?t=new sv(a,a.nextSibling,this,e):1===s.type?t=new s.ctor(a,s.name,s.strings,this,e):6===s.type&&(t=new sE(a,this,e)),this._$AV.push(t),s=r[++n]}o!==s?.index&&(a=sh.nextNode(),o++)}return sh.currentNode=n3,i}p(e){let t=0;for(let r of this._$AV)void 0!==r&&(void 0!==r.strings?(r._$AI(e,r,t),t+=r.strings.length-2):r._$AI(e[t])),t++}}class sv{get _$AU(){return this._$AM?._$AU??this._$Cv}constructor(e,t,r,i){this.type=2,this._$AH=sd,this._$AN=void 0,this._$AA=e,this._$AB=t,this._$AM=r,this.options=i,this._$Cv=i?.isConnected??!0}get parentNode(){let e=this._$AA.parentNode,t=this._$AM;return void 0!==t&&e?.nodeType===11&&(e=t.parentNode),e}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(e,t=this){n4(e=sw(this,e,t))?e===sd||null==e||""===e?(this._$AH!==sd&&this._$AR(),this._$AH=sd):e!==this._$AH&&e!==sc&&this._(e):void 0!==e._$litType$?this.$(e):void 0!==e.nodeType?this.T(e):n8(e)?this.k(e):this._(e)}O(e){return this._$AA.parentNode.insertBefore(e,this._$AB)}T(e){this._$AH!==e&&(this._$AR(),this._$AH=this.O(e))}_(e){this._$AH!==sd&&n4(this._$AH)?this._$AA.nextSibling.data=e:this.T(n3.createTextNode(e)),this._$AH=e}$(e){let{values:t,_$litType$:r}=e,i="number"==typeof r?this._$AC(e):(void 0===r.el&&(r.el=sf.createElement(sp(r.h,r.h[0]),this.options)),r);if(this._$AH?._$AD===i)this._$AH.p(t);else{let e=new sm(i,this),r=e.u(this.options);e.p(t),this.T(r),this._$AH=e}}_$AC(e){let t=su.get(e.strings);return void 0===t&&su.set(e.strings,t=new sf(e)),t}k(e){n6(this._$AH)||(this._$AH=[],this._$AR());let t=this._$AH,r,i=0;for(let a of e)i===t.length?t.push(r=new sv(this.O(n5()),this.O(n5()),this,this.options)):r=t[i],r._$AI(a),i++;i<t.length&&(this._$AR(r&&r._$AB.nextSibling,i),t.length=i)}_$AR(e=this._$AA.nextSibling,t){for(this._$AP?.(!1,!0,t);e&&e!==this._$AB;){let t=e.nextSibling;e.remove(),e=t}}setConnected(e){void 0===this._$AM&&(this._$Cv=e,this._$AP?.(e))}}class sb{get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}constructor(e,t,r,i,a){this.type=1,this._$AH=sd,this._$AN=void 0,this.element=e,this.name=t,this._$AM=i,this.options=a,r.length>2||""!==r[0]||""!==r[1]?(this._$AH=Array(r.length-1).fill(new String),this.strings=r):this._$AH=sd}_$AI(e,t=this,r,i){let a=this.strings,o=!1;if(void 0===a)(o=!n4(e=sw(this,e,t,0))||e!==this._$AH&&e!==sc)&&(this._$AH=e);else{let i,n;let s=e;for(e=a[0],i=0;i<a.length-1;i++)(n=sw(this,s[r+i],t,i))===sc&&(n=this._$AH[i]),o||=!n4(n)||n!==this._$AH[i],n===sd?e=sd:e!==sd&&(e+=(n??"")+a[i+1]),this._$AH[i]=n}o&&!i&&this.j(e)}j(e){e===sd?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,e??"")}}class sy extends sb{constructor(){super(...arguments),this.type=3}j(e){this.element[this.name]=e===sd?void 0:e}}class sC extends sb{constructor(){super(...arguments),this.type=4}j(e){this.element.toggleAttribute(this.name,!!e&&e!==sd)}}class sx extends sb{constructor(e,t,r,i,a){super(e,t,r,i,a),this.type=5}_$AI(e,t=this){if((e=sw(this,e,t,0)??sd)===sc)return;let r=this._$AH,i=e===sd&&r!==sd||e.capture!==r.capture||e.once!==r.once||e.passive!==r.passive,a=e!==sd&&(r===sd||i);i&&this.element.removeEventListener(this.name,this,r),a&&this.element.addEventListener(this.name,this,e),this._$AH=e}handleEvent(e){"function"==typeof this._$AH?this._$AH.call(this.options?.host??this.element,e):this._$AH.handleEvent(e)}}class sE{constructor(e,t,r){this.element=e,this.type=6,this._$AN=void 0,this._$AM=t,this.options=r}get _$AU(){return this._$AM._$AU}_$AI(e){sw(this,e)}}let sk=nY.litHtmlPolyfillSupport;sk?.(sf,sv),(nY.litHtmlVersions??=[]).push("3.3.0");let sA=(e,t,r)=>{let i=r?.renderBefore??t,a=i._$litPart$;if(void 0===a){let e=r?.renderBefore??null;i._$litPart$=a=new sv(t.insertBefore(n5(),e),e,void 0,r??{})}return a._$AI(e),a},sN=globalThis;class sI extends nK{constructor(){super(...arguments),this.renderOptions={host:this},this._$Do=void 0}createRenderRoot(){let e=super.createRenderRoot();return this.renderOptions.renderBefore??=e.firstChild,e}update(e){let t=this.render();this.hasUpdated||(this.renderOptions.isConnected=this.isConnected),super.update(e),this._$Do=sA(t,this.renderRoot,this.renderOptions)}connectedCallback(){super.connectedCallback(),this._$Do?.setConnected(!0)}disconnectedCallback(){super.disconnectedCallback(),this._$Do?.setConnected(!1)}render(){return sc}}sI._$litElement$=!0,sI.finalized=!0,sN.litElementHydrateSupport?.({LitElement:sI});let sS=sN.litElementPolyfillSupport;function s_(e){o&&n&&("light"===e?(o.removeAttribute("media"),n.media="enabled"):(n.removeAttribute("media"),o.media="enabled"))}function sT(e){return{core:nP`
      @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap');
      @keyframes w3m-shake {
        0% {
          transform: scale(1) rotate(0deg);
        }
        20% {
          transform: scale(1) rotate(-1deg);
        }
        40% {
          transform: scale(1) rotate(1.5deg);
        }
        60% {
          transform: scale(1) rotate(-1.5deg);
        }
        80% {
          transform: scale(1) rotate(1deg);
        }
        100% {
          transform: scale(1) rotate(0deg);
        }
      }
      @keyframes w3m-iframe-fade-out {
        0% {
          opacity: 1;
        }
        100% {
          opacity: 0;
        }
      }
      @keyframes w3m-iframe-zoom-in {
        0% {
          transform: translateY(50px);
          opacity: 0;
        }
        100% {
          transform: translateY(0px);
          opacity: 1;
        }
      }
      @keyframes w3m-iframe-zoom-in-mobile {
        0% {
          transform: scale(0.95);
          opacity: 0;
        }
        100% {
          transform: scale(1);
          opacity: 1;
        }
      }
      :root {
        --w3m-modal-width: 360px;
        --w3m-color-mix-strength: ${nO(e?.["--w3m-color-mix-strength"]?`${e["--w3m-color-mix-strength"]}%`:"0%")};
        --w3m-font-family: ${nO(e?.["--w3m-font-family"]||"Inter, Segoe UI, Roboto, Oxygen, Ubuntu, Cantarell, Fira Sans, Droid Sans, Helvetica Neue, sans-serif;")};
        --w3m-font-size-master: ${nO(e?.["--w3m-font-size-master"]||"10px")};
        --w3m-border-radius-master: ${nO(e?.["--w3m-border-radius-master"]||"4px")};
        --w3m-z-index: ${nO(e?.["--w3m-z-index"]||999)};

        --wui-font-family: var(--w3m-font-family);

        --wui-font-size-mini: calc(var(--w3m-font-size-master) * 0.8);
        --wui-font-size-micro: var(--w3m-font-size-master);
        --wui-font-size-tiny: calc(var(--w3m-font-size-master) * 1.2);
        --wui-font-size-small: calc(var(--w3m-font-size-master) * 1.4);
        --wui-font-size-paragraph: calc(var(--w3m-font-size-master) * 1.6);
        --wui-font-size-medium: calc(var(--w3m-font-size-master) * 1.8);
        --wui-font-size-large: calc(var(--w3m-font-size-master) * 2);
        --wui-font-size-title-6: calc(var(--w3m-font-size-master) * 2.2);
        --wui-font-size-medium-title: calc(var(--w3m-font-size-master) * 2.4);
        --wui-font-size-2xl: calc(var(--w3m-font-size-master) * 4);

        --wui-border-radius-5xs: var(--w3m-border-radius-master);
        --wui-border-radius-4xs: calc(var(--w3m-border-radius-master) * 1.5);
        --wui-border-radius-3xs: calc(var(--w3m-border-radius-master) * 2);
        --wui-border-radius-xxs: calc(var(--w3m-border-radius-master) * 3);
        --wui-border-radius-xs: calc(var(--w3m-border-radius-master) * 4);
        --wui-border-radius-s: calc(var(--w3m-border-radius-master) * 5);
        --wui-border-radius-m: calc(var(--w3m-border-radius-master) * 7);
        --wui-border-radius-l: calc(var(--w3m-border-radius-master) * 9);
        --wui-border-radius-3xl: calc(var(--w3m-border-radius-master) * 20);

        --wui-font-weight-light: 400;
        --wui-font-weight-regular: 500;
        --wui-font-weight-medium: 600;
        --wui-font-weight-bold: 700;

        --wui-letter-spacing-2xl: -1.6px;
        --wui-letter-spacing-medium-title: -0.96px;
        --wui-letter-spacing-title-6: -0.88px;
        --wui-letter-spacing-large: -0.8px;
        --wui-letter-spacing-medium: -0.72px;
        --wui-letter-spacing-paragraph: -0.64px;
        --wui-letter-spacing-small: -0.56px;
        --wui-letter-spacing-tiny: -0.48px;
        --wui-letter-spacing-micro: -0.2px;
        --wui-letter-spacing-mini: -0.16px;

        --wui-spacing-0: 0px;
        --wui-spacing-4xs: 2px;
        --wui-spacing-3xs: 4px;
        --wui-spacing-xxs: 6px;
        --wui-spacing-2xs: 7px;
        --wui-spacing-xs: 8px;
        --wui-spacing-1xs: 10px;
        --wui-spacing-s: 12px;
        --wui-spacing-m: 14px;
        --wui-spacing-l: 16px;
        --wui-spacing-2l: 18px;
        --wui-spacing-xl: 20px;
        --wui-spacing-xxl: 24px;
        --wui-spacing-2xl: 32px;
        --wui-spacing-3xl: 40px;
        --wui-spacing-4xl: 90px;
        --wui-spacing-5xl: 95px;

        --wui-icon-box-size-xxs: 14px;
        --wui-icon-box-size-xs: 20px;
        --wui-icon-box-size-sm: 24px;
        --wui-icon-box-size-md: 32px;
        --wui-icon-box-size-mdl: 36px;
        --wui-icon-box-size-lg: 40px;
        --wui-icon-box-size-2lg: 48px;
        --wui-icon-box-size-xl: 64px;

        --wui-icon-size-inherit: inherit;
        --wui-icon-size-xxs: 10px;
        --wui-icon-size-xs: 12px;
        --wui-icon-size-sm: 14px;
        --wui-icon-size-md: 16px;
        --wui-icon-size-mdl: 18px;
        --wui-icon-size-lg: 20px;
        --wui-icon-size-xl: 24px;
        --wui-icon-size-xxl: 28px;

        --wui-wallet-image-size-inherit: inherit;
        --wui-wallet-image-size-sm: 40px;
        --wui-wallet-image-size-md: 56px;
        --wui-wallet-image-size-lg: 80px;

        --wui-visual-size-size-inherit: inherit;
        --wui-visual-size-sm: 40px;
        --wui-visual-size-md: 55px;
        --wui-visual-size-lg: 80px;

        --wui-box-size-md: 100px;
        --wui-box-size-lg: 120px;

        --wui-ease-out-power-2: cubic-bezier(0, 0, 0.22, 1);
        --wui-ease-out-power-1: cubic-bezier(0, 0, 0.55, 1);

        --wui-ease-in-power-3: cubic-bezier(0.66, 0, 1, 1);
        --wui-ease-in-power-2: cubic-bezier(0.45, 0, 1, 1);
        --wui-ease-in-power-1: cubic-bezier(0.3, 0, 1, 1);

        --wui-ease-inout-power-1: cubic-bezier(0.45, 0, 0.55, 1);

        --wui-duration-lg: 200ms;
        --wui-duration-md: 125ms;
        --wui-duration-sm: 75ms;

        --wui-path-network-sm: path(
          'M15.4 2.1a5.21 5.21 0 0 1 5.2 0l11.61 6.7a5.21 5.21 0 0 1 2.61 4.52v13.4c0 1.87-1 3.59-2.6 4.52l-11.61 6.7c-1.62.93-3.6.93-5.22 0l-11.6-6.7a5.21 5.21 0 0 1-2.61-4.51v-13.4c0-1.87 1-3.6 2.6-4.52L15.4 2.1Z'
        );

        --wui-path-network-md: path(
          'M43.4605 10.7248L28.0485 1.61089C25.5438 0.129705 22.4562 0.129705 19.9515 1.61088L4.53951 10.7248C2.03626 12.2051 0.5 14.9365 0.5 17.886V36.1139C0.5 39.0635 2.03626 41.7949 4.53951 43.2752L19.9515 52.3891C22.4562 53.8703 25.5438 53.8703 28.0485 52.3891L43.4605 43.2752C45.9637 41.7949 47.5 39.0635 47.5 36.114V17.8861C47.5 14.9365 45.9637 12.2051 43.4605 10.7248Z'
        );

        --wui-path-network-lg: path(
          'M78.3244 18.926L50.1808 2.45078C45.7376 -0.150261 40.2624 -0.150262 35.8192 2.45078L7.6756 18.926C3.23322 21.5266 0.5 26.3301 0.5 31.5248V64.4752C0.5 69.6699 3.23322 74.4734 7.6756 77.074L35.8192 93.5492C40.2624 96.1503 45.7376 96.1503 50.1808 93.5492L78.3244 77.074C82.7668 74.4734 85.5 69.6699 85.5 64.4752V31.5248C85.5 26.3301 82.7668 21.5266 78.3244 18.926Z'
        );

        --wui-width-network-sm: 36px;
        --wui-width-network-md: 48px;
        --wui-width-network-lg: 86px;

        --wui-height-network-sm: 40px;
        --wui-height-network-md: 54px;
        --wui-height-network-lg: 96px;

        --wui-icon-size-network-xs: 12px;
        --wui-icon-size-network-sm: 16px;
        --wui-icon-size-network-md: 24px;
        --wui-icon-size-network-lg: 42px;

        --wui-color-inherit: inherit;

        --wui-color-inverse-100: #fff;
        --wui-color-inverse-000: #000;

        --wui-cover: rgba(20, 20, 20, 0.8);

        --wui-color-modal-bg: var(--wui-color-modal-bg-base);

        --wui-color-accent-100: var(--wui-color-accent-base-100);
        --wui-color-accent-090: var(--wui-color-accent-base-090);
        --wui-color-accent-080: var(--wui-color-accent-base-080);

        --wui-color-success-100: var(--wui-color-success-base-100);
        --wui-color-success-125: var(--wui-color-success-base-125);

        --wui-color-warning-100: var(--wui-color-warning-base-100);

        --wui-color-error-100: var(--wui-color-error-base-100);
        --wui-color-error-125: var(--wui-color-error-base-125);

        --wui-color-blue-100: var(--wui-color-blue-base-100);
        --wui-color-blue-90: var(--wui-color-blue-base-90);

        --wui-icon-box-bg-error-100: var(--wui-icon-box-bg-error-base-100);
        --wui-icon-box-bg-blue-100: var(--wui-icon-box-bg-blue-base-100);
        --wui-icon-box-bg-success-100: var(--wui-icon-box-bg-success-base-100);
        --wui-icon-box-bg-inverse-100: var(--wui-icon-box-bg-inverse-base-100);

        --wui-all-wallets-bg-100: var(--wui-all-wallets-bg-100);

        --wui-avatar-border: var(--wui-avatar-border-base);

        --wui-thumbnail-border: var(--wui-thumbnail-border-base);

        --wui-wallet-button-bg: var(--wui-wallet-button-bg-base);

        --wui-box-shadow-blue: var(--wui-color-accent-glass-020);
      }

      @supports (background: color-mix(in srgb, white 50%, black)) {
        :root {
          --wui-color-modal-bg: color-mix(
            in srgb,
            var(--w3m-color-mix) var(--w3m-color-mix-strength),
            var(--wui-color-modal-bg-base)
          );

          --wui-box-shadow-blue: color-mix(in srgb, var(--wui-color-accent-100) 20%, transparent);

          --wui-color-accent-100: color-mix(
            in srgb,
            var(--wui-color-accent-base-100) 100%,
            transparent
          );
          --wui-color-accent-090: color-mix(
            in srgb,
            var(--wui-color-accent-base-100) 90%,
            transparent
          );
          --wui-color-accent-080: color-mix(
            in srgb,
            var(--wui-color-accent-base-100) 80%,
            transparent
          );
          --wui-color-accent-glass-090: color-mix(
            in srgb,
            var(--wui-color-accent-base-100) 90%,
            transparent
          );
          --wui-color-accent-glass-080: color-mix(
            in srgb,
            var(--wui-color-accent-base-100) 80%,
            transparent
          );
          --wui-color-accent-glass-020: color-mix(
            in srgb,
            var(--wui-color-accent-base-100) 20%,
            transparent
          );
          --wui-color-accent-glass-015: color-mix(
            in srgb,
            var(--wui-color-accent-base-100) 15%,
            transparent
          );
          --wui-color-accent-glass-010: color-mix(
            in srgb,
            var(--wui-color-accent-base-100) 10%,
            transparent
          );
          --wui-color-accent-glass-005: color-mix(
            in srgb,
            var(--wui-color-accent-base-100) 5%,
            transparent
          );
          --wui-color-accent-002: color-mix(
            in srgb,
            var(--wui-color-accent-base-100) 2%,
            transparent
          );

          --wui-color-fg-100: color-mix(
            in srgb,
            var(--w3m-color-mix) var(--w3m-color-mix-strength),
            var(--wui-color-fg-100)
          );
          --wui-color-fg-125: color-mix(
            in srgb,
            var(--w3m-color-mix) var(--w3m-color-mix-strength),
            var(--wui-color-fg-125)
          );
          --wui-color-fg-150: color-mix(
            in srgb,
            var(--w3m-color-mix) var(--w3m-color-mix-strength),
            var(--wui-color-fg-150)
          );
          --wui-color-fg-175: color-mix(
            in srgb,
            var(--w3m-color-mix) var(--w3m-color-mix-strength),
            var(--wui-color-fg-175)
          );
          --wui-color-fg-200: color-mix(
            in srgb,
            var(--w3m-color-mix) var(--w3m-color-mix-strength),
            var(--wui-color-fg-200)
          );
          --wui-color-fg-225: color-mix(
            in srgb,
            var(--w3m-color-mix) var(--w3m-color-mix-strength),
            var(--wui-color-fg-225)
          );
          --wui-color-fg-250: color-mix(
            in srgb,
            var(--w3m-color-mix) var(--w3m-color-mix-strength),
            var(--wui-color-fg-250)
          );
          --wui-color-fg-275: color-mix(
            in srgb,
            var(--w3m-color-mix) var(--w3m-color-mix-strength),
            var(--wui-color-fg-275)
          );
          --wui-color-fg-300: color-mix(
            in srgb,
            var(--w3m-color-mix) var(--w3m-color-mix-strength),
            var(--wui-color-fg-300)
          );
          --wui-color-fg-325: color-mix(
            in srgb,
            var(--w3m-color-mix) var(--w3m-color-mix-strength),
            var(--wui-color-fg-325)
          );
          --wui-color-fg-350: color-mix(
            in srgb,
            var(--w3m-color-mix) var(--w3m-color-mix-strength),
            var(--wui-color-fg-350)
          );

          --wui-color-bg-100: color-mix(
            in srgb,
            var(--w3m-color-mix) var(--w3m-color-mix-strength),
            var(--wui-color-bg-100)
          );
          --wui-color-bg-125: color-mix(
            in srgb,
            var(--w3m-color-mix) var(--w3m-color-mix-strength),
            var(--wui-color-bg-125)
          );
          --wui-color-bg-150: color-mix(
            in srgb,
            var(--w3m-color-mix) var(--w3m-color-mix-strength),
            var(--wui-color-bg-150)
          );
          --wui-color-bg-175: color-mix(
            in srgb,
            var(--w3m-color-mix) var(--w3m-color-mix-strength),
            var(--wui-color-bg-175)
          );
          --wui-color-bg-200: color-mix(
            in srgb,
            var(--w3m-color-mix) var(--w3m-color-mix-strength),
            var(--wui-color-bg-200)
          );
          --wui-color-bg-225: color-mix(
            in srgb,
            var(--w3m-color-mix) var(--w3m-color-mix-strength),
            var(--wui-color-bg-225)
          );
          --wui-color-bg-250: color-mix(
            in srgb,
            var(--w3m-color-mix) var(--w3m-color-mix-strength),
            var(--wui-color-bg-250)
          );
          --wui-color-bg-275: color-mix(
            in srgb,
            var(--w3m-color-mix) var(--w3m-color-mix-strength),
            var(--wui-color-bg-275)
          );
          --wui-color-bg-300: color-mix(
            in srgb,
            var(--w3m-color-mix) var(--w3m-color-mix-strength),
            var(--wui-color-bg-300)
          );
          --wui-color-bg-325: color-mix(
            in srgb,
            var(--w3m-color-mix) var(--w3m-color-mix-strength),
            var(--wui-color-bg-325)
          );
          --wui-color-bg-350: color-mix(
            in srgb,
            var(--w3m-color-mix) var(--w3m-color-mix-strength),
            var(--wui-color-bg-350)
          );

          --wui-color-success-100: color-mix(
            in srgb,
            var(--w3m-color-mix) var(--w3m-color-mix-strength),
            var(--wui-color-success-base-100)
          );
          --wui-color-success-125: color-mix(
            in srgb,
            var(--w3m-color-mix) var(--w3m-color-mix-strength),
            var(--wui-color-success-base-125)
          );

          --wui-color-warning-100: color-mix(
            in srgb,
            var(--w3m-color-mix) var(--w3m-color-mix-strength),
            var(--wui-color-warning-base-100)
          );

          --wui-color-error-100: color-mix(
            in srgb,
            var(--w3m-color-mix) var(--w3m-color-mix-strength),
            var(--wui-color-error-base-100)
          );
          --wui-color-blue-100: color-mix(
            in srgb,
            var(--w3m-color-mix) var(--w3m-color-mix-strength),
            var(--wui-color-blue-base-100)
          );
          --wui-color-blue-90: color-mix(
            in srgb,
            var(--w3m-color-mix) var(--w3m-color-mix-strength),
            var(--wui-color-blue-base-90)
          );
          --wui-color-error-125: color-mix(
            in srgb,
            var(--w3m-color-mix) var(--w3m-color-mix-strength),
            var(--wui-color-error-base-125)
          );

          --wui-icon-box-bg-error-100: color-mix(
            in srgb,
            var(--w3m-color-mix) var(--w3m-color-mix-strength),
            var(--wui-icon-box-bg-error-base-100)
          );
          --wui-icon-box-bg-accent-100: color-mix(
            in srgb,
            var(--w3m-color-mix) var(--w3m-color-mix-strength),
            var(--wui-icon-box-bg-blue-base-100)
          );
          --wui-icon-box-bg-success-100: color-mix(
            in srgb,
            var(--w3m-color-mix) var(--w3m-color-mix-strength),
            var(--wui-icon-box-bg-success-base-100)
          );
          --wui-icon-box-bg-inverse-100: color-mix(
            in srgb,
            var(--w3m-color-mix) var(--w3m-color-mix-strength),
            var(--wui-icon-box-bg-inverse-base-100)
          );

          --wui-all-wallets-bg-100: color-mix(
            in srgb,
            var(--w3m-color-mix) var(--w3m-color-mix-strength),
            var(--wui-all-wallets-bg-100)
          );

          --wui-avatar-border: color-mix(
            in srgb,
            var(--w3m-color-mix) var(--w3m-color-mix-strength),
            var(--wui-avatar-border-base)
          );

          --wui-thumbnail-border: color-mix(
            in srgb,
            var(--w3m-color-mix) var(--w3m-color-mix-strength),
            var(--wui-thumbnail-border-base)
          );

          --wui-wallet-button-bg: color-mix(
            in srgb,
            var(--w3m-color-mix) var(--w3m-color-mix-strength),
            var(--wui-wallet-button-bg-base)
          );
        }
      }
    `,light:nP`
      :root {
        --w3m-color-mix: ${nO(e?.["--w3m-color-mix"]||"#fff")};
        --w3m-accent: ${nO(ew(e,"dark")["--w3m-accent"])};
        --w3m-default: #fff;

        --wui-color-modal-bg-base: ${nO(ew(e,"dark")["--w3m-background"])};
        --wui-color-accent-base-100: var(--w3m-accent);

        --wui-color-blueberry-100: hsla(230, 100%, 67%, 1);
        --wui-color-blueberry-090: hsla(231, 76%, 61%, 1);
        --wui-color-blueberry-080: hsla(230, 59%, 55%, 1);
        --wui-color-blueberry-050: hsla(231, 100%, 70%, 0.1);

        --wui-color-fg-100: #e4e7e7;
        --wui-color-fg-125: #d0d5d5;
        --wui-color-fg-150: #a8b1b1;
        --wui-color-fg-175: #a8b0b0;
        --wui-color-fg-200: #949e9e;
        --wui-color-fg-225: #868f8f;
        --wui-color-fg-250: #788080;
        --wui-color-fg-275: #788181;
        --wui-color-fg-300: #6e7777;
        --wui-color-fg-325: #9a9a9a;
        --wui-color-fg-350: #363636;

        --wui-color-bg-100: #141414;
        --wui-color-bg-125: #191a1a;
        --wui-color-bg-150: #1e1f1f;
        --wui-color-bg-175: #222525;
        --wui-color-bg-200: #272a2a;
        --wui-color-bg-225: #2c3030;
        --wui-color-bg-250: #313535;
        --wui-color-bg-275: #363b3b;
        --wui-color-bg-300: #3b4040;
        --wui-color-bg-325: #252525;
        --wui-color-bg-350: #ffffff;

        --wui-color-success-base-100: #26d962;
        --wui-color-success-base-125: #30a46b;

        --wui-color-warning-base-100: #f3a13f;

        --wui-color-error-base-100: #f25a67;
        --wui-color-error-base-125: #df4a34;

        --wui-color-blue-base-100: rgba(102, 125, 255, 1);
        --wui-color-blue-base-90: rgba(102, 125, 255, 0.9);

        --wui-color-success-glass-001: rgba(38, 217, 98, 0.01);
        --wui-color-success-glass-002: rgba(38, 217, 98, 0.02);
        --wui-color-success-glass-005: rgba(38, 217, 98, 0.05);
        --wui-color-success-glass-010: rgba(38, 217, 98, 0.1);
        --wui-color-success-glass-015: rgba(38, 217, 98, 0.15);
        --wui-color-success-glass-020: rgba(38, 217, 98, 0.2);
        --wui-color-success-glass-025: rgba(38, 217, 98, 0.25);
        --wui-color-success-glass-030: rgba(38, 217, 98, 0.3);
        --wui-color-success-glass-060: rgba(38, 217, 98, 0.6);
        --wui-color-success-glass-080: rgba(38, 217, 98, 0.8);

        --wui-color-success-glass-reown-020: rgba(48, 164, 107, 0.2);

        --wui-color-warning-glass-reown-020: rgba(243, 161, 63, 0.2);

        --wui-color-error-glass-001: rgba(242, 90, 103, 0.01);
        --wui-color-error-glass-002: rgba(242, 90, 103, 0.02);
        --wui-color-error-glass-005: rgba(242, 90, 103, 0.05);
        --wui-color-error-glass-010: rgba(242, 90, 103, 0.1);
        --wui-color-error-glass-015: rgba(242, 90, 103, 0.15);
        --wui-color-error-glass-020: rgba(242, 90, 103, 0.2);
        --wui-color-error-glass-025: rgba(242, 90, 103, 0.25);
        --wui-color-error-glass-030: rgba(242, 90, 103, 0.3);
        --wui-color-error-glass-060: rgba(242, 90, 103, 0.6);
        --wui-color-error-glass-080: rgba(242, 90, 103, 0.8);

        --wui-color-error-glass-reown-020: rgba(223, 74, 52, 0.2);

        --wui-color-gray-glass-001: rgba(255, 255, 255, 0.01);
        --wui-color-gray-glass-002: rgba(255, 255, 255, 0.02);
        --wui-color-gray-glass-005: rgba(255, 255, 255, 0.05);
        --wui-color-gray-glass-010: rgba(255, 255, 255, 0.1);
        --wui-color-gray-glass-015: rgba(255, 255, 255, 0.15);
        --wui-color-gray-glass-020: rgba(255, 255, 255, 0.2);
        --wui-color-gray-glass-025: rgba(255, 255, 255, 0.25);
        --wui-color-gray-glass-030: rgba(255, 255, 255, 0.3);
        --wui-color-gray-glass-060: rgba(255, 255, 255, 0.6);
        --wui-color-gray-glass-080: rgba(255, 255, 255, 0.8);
        --wui-color-gray-glass-090: rgba(255, 255, 255, 0.9);

        --wui-color-dark-glass-100: rgba(42, 42, 42, 1);

        --wui-icon-box-bg-error-base-100: #3c2426;
        --wui-icon-box-bg-blue-base-100: #20303f;
        --wui-icon-box-bg-success-base-100: #1f3a28;
        --wui-icon-box-bg-inverse-base-100: #243240;

        --wui-all-wallets-bg-100: #222b35;

        --wui-avatar-border-base: #252525;

        --wui-thumbnail-border-base: #252525;

        --wui-wallet-button-bg-base: var(--wui-color-bg-125);

        --w3m-card-embedded-shadow-color: rgb(17 17 18 / 25%);
      }
    `,dark:nP`
      :root {
        --w3m-color-mix: ${nO(e?.["--w3m-color-mix"]||"#000")};
        --w3m-accent: ${nO(ew(e,"light")["--w3m-accent"])};
        --w3m-default: #000;

        --wui-color-modal-bg-base: ${nO(ew(e,"light")["--w3m-background"])};
        --wui-color-accent-base-100: var(--w3m-accent);

        --wui-color-blueberry-100: hsla(231, 100%, 70%, 1);
        --wui-color-blueberry-090: hsla(231, 97%, 72%, 1);
        --wui-color-blueberry-080: hsla(231, 92%, 74%, 1);

        --wui-color-fg-100: #141414;
        --wui-color-fg-125: #2d3131;
        --wui-color-fg-150: #474d4d;
        --wui-color-fg-175: #636d6d;
        --wui-color-fg-200: #798686;
        --wui-color-fg-225: #828f8f;
        --wui-color-fg-250: #8b9797;
        --wui-color-fg-275: #95a0a0;
        --wui-color-fg-300: #9ea9a9;
        --wui-color-fg-325: #9a9a9a;
        --wui-color-fg-350: #d0d0d0;

        --wui-color-bg-100: #ffffff;
        --wui-color-bg-125: #f5fafa;
        --wui-color-bg-150: #f3f8f8;
        --wui-color-bg-175: #eef4f4;
        --wui-color-bg-200: #eaf1f1;
        --wui-color-bg-225: #e5eded;
        --wui-color-bg-250: #e1e9e9;
        --wui-color-bg-275: #dce7e7;
        --wui-color-bg-300: #d8e3e3;
        --wui-color-bg-325: #f3f3f3;
        --wui-color-bg-350: #202020;

        --wui-color-success-base-100: #26b562;
        --wui-color-success-base-125: #30a46b;

        --wui-color-warning-base-100: #f3a13f;

        --wui-color-error-base-100: #f05142;
        --wui-color-error-base-125: #df4a34;

        --wui-color-blue-base-100: rgba(102, 125, 255, 1);
        --wui-color-blue-base-90: rgba(102, 125, 255, 0.9);

        --wui-color-success-glass-001: rgba(38, 181, 98, 0.01);
        --wui-color-success-glass-002: rgba(38, 181, 98, 0.02);
        --wui-color-success-glass-005: rgba(38, 181, 98, 0.05);
        --wui-color-success-glass-010: rgba(38, 181, 98, 0.1);
        --wui-color-success-glass-015: rgba(38, 181, 98, 0.15);
        --wui-color-success-glass-020: rgba(38, 181, 98, 0.2);
        --wui-color-success-glass-025: rgba(38, 181, 98, 0.25);
        --wui-color-success-glass-030: rgba(38, 181, 98, 0.3);
        --wui-color-success-glass-060: rgba(38, 181, 98, 0.6);
        --wui-color-success-glass-080: rgba(38, 181, 98, 0.8);

        --wui-color-success-glass-reown-020: rgba(48, 164, 107, 0.2);

        --wui-color-warning-glass-reown-020: rgba(243, 161, 63, 0.2);

        --wui-color-error-glass-001: rgba(240, 81, 66, 0.01);
        --wui-color-error-glass-002: rgba(240, 81, 66, 0.02);
        --wui-color-error-glass-005: rgba(240, 81, 66, 0.05);
        --wui-color-error-glass-010: rgba(240, 81, 66, 0.1);
        --wui-color-error-glass-015: rgba(240, 81, 66, 0.15);
        --wui-color-error-glass-020: rgba(240, 81, 66, 0.2);
        --wui-color-error-glass-025: rgba(240, 81, 66, 0.25);
        --wui-color-error-glass-030: rgba(240, 81, 66, 0.3);
        --wui-color-error-glass-060: rgba(240, 81, 66, 0.6);
        --wui-color-error-glass-080: rgba(240, 81, 66, 0.8);

        --wui-color-error-glass-reown-020: rgba(223, 74, 52, 0.2);

        --wui-icon-box-bg-error-base-100: #f4dfdd;
        --wui-icon-box-bg-blue-base-100: #d9ecfb;
        --wui-icon-box-bg-success-base-100: #daf0e4;
        --wui-icon-box-bg-inverse-base-100: #dcecfc;

        --wui-all-wallets-bg-100: #e8f1fa;

        --wui-avatar-border-base: #f3f4f4;

        --wui-thumbnail-border-base: #eaefef;

        --wui-wallet-button-bg-base: var(--wui-color-bg-125);

        --wui-color-gray-glass-001: rgba(0, 0, 0, 0.01);
        --wui-color-gray-glass-002: rgba(0, 0, 0, 0.02);
        --wui-color-gray-glass-005: rgba(0, 0, 0, 0.05);
        --wui-color-gray-glass-010: rgba(0, 0, 0, 0.1);
        --wui-color-gray-glass-015: rgba(0, 0, 0, 0.15);
        --wui-color-gray-glass-020: rgba(0, 0, 0, 0.2);
        --wui-color-gray-glass-025: rgba(0, 0, 0, 0.25);
        --wui-color-gray-glass-030: rgba(0, 0, 0, 0.3);
        --wui-color-gray-glass-060: rgba(0, 0, 0, 0.6);
        --wui-color-gray-glass-080: rgba(0, 0, 0, 0.8);
        --wui-color-gray-glass-090: rgba(0, 0, 0, 0.9);

        --wui-color-dark-glass-100: rgba(233, 233, 233, 1);

        --w3m-card-embedded-shadow-color: rgb(224 225 233 / 25%);
      }
    `}}sS?.({LitElement:sI}),(sN.litElementVersions??=[]).push("4.2.0");let sO=nP`
  *,
  *::after,
  *::before,
  :host {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    font-style: normal;
    text-rendering: optimizeSpeed;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    -webkit-tap-highlight-color: transparent;
    font-family: var(--wui-font-family);
    backface-visibility: hidden;
  }
`,sP=nP`
  button,
  a {
    cursor: pointer;
    display: flex;
    justify-content: center;
    align-items: center;
    position: relative;
    transition:
      color var(--wui-duration-lg) var(--wui-ease-out-power-1),
      background-color var(--wui-duration-lg) var(--wui-ease-out-power-1),
      border var(--wui-duration-lg) var(--wui-ease-out-power-1),
      border-radius var(--wui-duration-lg) var(--wui-ease-out-power-1),
      box-shadow var(--wui-duration-lg) var(--wui-ease-out-power-1);
    will-change: background-color, color, border, box-shadow, border-radius;
    outline: none;
    border: none;
    column-gap: var(--wui-spacing-3xs);
    background-color: transparent;
    text-decoration: none;
  }

  wui-flex {
    transition: border-radius var(--wui-duration-lg) var(--wui-ease-out-power-1);
    will-change: border-radius;
  }

  button:disabled > wui-wallet-image,
  button:disabled > wui-all-wallets-image,
  button:disabled > wui-network-image,
  button:disabled > wui-image,
  button:disabled > wui-transaction-visual,
  button:disabled > wui-logo {
    filter: grayscale(1);
  }

  @media (hover: hover) and (pointer: fine) {
    button:hover:enabled {
      background-color: var(--wui-color-gray-glass-005);
    }

    button:active:enabled {
      background-color: var(--wui-color-gray-glass-010);
    }
  }

  button:disabled > wui-icon-box {
    opacity: 0.5;
  }

  input {
    border: none;
    outline: none;
    appearance: none;
  }
`,sR=nP`
  .wui-color-inherit {
    color: var(--wui-color-inherit);
  }

  .wui-color-accent-100 {
    color: var(--wui-color-accent-100);
  }

  .wui-color-error-100 {
    color: var(--wui-color-error-100);
  }

  .wui-color-blue-100 {
    color: var(--wui-color-blue-100);
  }

  .wui-color-blue-90 {
    color: var(--wui-color-blue-90);
  }

  .wui-color-error-125 {
    color: var(--wui-color-error-125);
  }

  .wui-color-success-100 {
    color: var(--wui-color-success-100);
  }

  .wui-color-success-125 {
    color: var(--wui-color-success-125);
  }

  .wui-color-inverse-100 {
    color: var(--wui-color-inverse-100);
  }

  .wui-color-inverse-000 {
    color: var(--wui-color-inverse-000);
  }

  .wui-color-fg-100 {
    color: var(--wui-color-fg-100);
  }

  .wui-color-fg-200 {
    color: var(--wui-color-fg-200);
  }

  .wui-color-fg-300 {
    color: var(--wui-color-fg-300);
  }

  .wui-color-fg-325 {
    color: var(--wui-color-fg-325);
  }

  .wui-color-fg-350 {
    color: var(--wui-color-fg-350);
  }

  .wui-bg-color-inherit {
    background-color: var(--wui-color-inherit);
  }

  .wui-bg-color-blue-100 {
    background-color: var(--wui-color-accent-100);
  }

  .wui-bg-color-error-100 {
    background-color: var(--wui-color-error-100);
  }

  .wui-bg-color-error-125 {
    background-color: var(--wui-color-error-125);
  }

  .wui-bg-color-success-100 {
    background-color: var(--wui-color-success-100);
  }

  .wui-bg-color-success-125 {
    background-color: var(--wui-color-success-100);
  }

  .wui-bg-color-inverse-100 {
    background-color: var(--wui-color-inverse-100);
  }

  .wui-bg-color-inverse-000 {
    background-color: var(--wui-color-inverse-000);
  }

  .wui-bg-color-fg-100 {
    background-color: var(--wui-color-fg-100);
  }

  .wui-bg-color-fg-200 {
    background-color: var(--wui-color-fg-200);
  }

  .wui-bg-color-fg-300 {
    background-color: var(--wui-color-fg-300);
  }

  .wui-color-fg-325 {
    background-color: var(--wui-color-fg-325);
  }

  .wui-color-fg-350 {
    background-color: var(--wui-color-fg-350);
  }
`,s$={getSpacingStyles:(e,t)=>Array.isArray(e)?e[t]?`var(--wui-spacing-${e[t]})`:void 0:"string"==typeof e?`var(--wui-spacing-${e})`:void 0,getFormattedDate:e=>new Intl.DateTimeFormat("en-US",{month:"short",day:"numeric"}).format(e),getHostName(e){try{return new URL(e).hostname}catch{return""}},getTruncateString:({string:e,charsStart:t,charsEnd:r,truncate:i})=>e.length<=t+r?e:"end"===i?`${e.substring(0,t)}...`:"start"===i?`...${e.substring(e.length-r)}`:`${e.substring(0,Math.floor(t))}...${e.substring(e.length-Math.floor(r))}`,generateAvatarColors(e){let t=e.toLowerCase().replace(/^0x/iu,"").replace(/[^a-f0-9]/gu,"").substring(0,6).padEnd(6,"0"),r=this.hexToRgb(t),i=getComputedStyle(document.documentElement).getPropertyValue("--w3m-border-radius-master"),a=100-3*Number(i?.replace("px","")),o=`${a}% ${a}% at 65% 40%`,n=[];for(let e=0;e<5;e+=1){let t=this.tintColor(r,.15*e);n.push(`rgb(${t[0]}, ${t[1]}, ${t[2]})`)}return`
    --local-color-1: ${n[0]};
    --local-color-2: ${n[1]};
    --local-color-3: ${n[2]};
    --local-color-4: ${n[3]};
    --local-color-5: ${n[4]};
    --local-radial-circle: ${o}
   `},hexToRgb(e){let t=parseInt(e,16);return[t>>16&255,t>>8&255,255&t]},tintColor(e,t){let[r,i,a]=e;return[Math.round(r+(255-r)*t),Math.round(i+(255-i)*t),Math.round(a+(255-a)*t)]},isNumber:e=>/^[0-9]+$/u.test(e),getColorTheme:e=>e||("u">typeof window&&window.matchMedia?window.matchMedia("(prefers-color-scheme: dark)")?.matches?"dark":"light":"dark"),splitBalance(e){let t=e.split(".");return 2===t.length?[t[0],t[1]]:["0","00"]},roundNumber:(e,t,r)=>e.toString().length>=t?Number(e).toFixed(r):e,formatNumberToLocalString:(e,t=2)=>void 0===e?"0.00":"number"==typeof e?e.toLocaleString("en-US",{maximumFractionDigits:t,minimumFractionDigits:t}):parseFloat(e).toLocaleString("en-US",{maximumFractionDigits:t,minimumFractionDigits:t})};function sL(e){return function(t){return"function"==typeof t?(customElements.get(e)||customElements.define(e,t),t):function(e,t){let{kind:r,elements:i}=t;return{kind:r,elements:i,finisher(t){customElements.get(e)||customElements.define(e,t)}}}(e,t)}}var sB=function(e){if(e.length>=255)throw TypeError("Alphabet too long");let t=new Uint8Array(256);for(let e=0;e<t.length;e++)t[e]=255;for(let r=0;r<e.length;r++){let i=e.charAt(r),a=i.charCodeAt(0);if(255!==t[a])throw TypeError(i+" is ambiguous");t[a]=r}let r=e.length,i=e.charAt(0),a=Math.log(r)/Math.log(256),o=Math.log(256)/Math.log(r);function n(e){if("string"!=typeof e)throw TypeError("Expected String");if(0===e.length)return new Uint8Array;let o=0,n=0,s=0;for(;e[o]===i;)n++,o++;let l=(e.length-o)*a+1>>>0,c=new Uint8Array(l);for(;o<e.length;){let i=e.charCodeAt(o);if(i>255)return;let a=t[i];if(255===a)return;let n=0;for(let e=l-1;(0!==a||n<s)&&-1!==e;e--,n++)a+=r*c[e]>>>0,c[e]=a%256>>>0,a=a/256>>>0;if(0!==a)throw Error("Non-zero carry");s=n,o++}let d=l-s;for(;d!==l&&0===c[d];)d++;let u=new Uint8Array(n+(l-d)),h=n;for(;d!==l;)u[h++]=c[d++];return u}return{encode:function(t){if(t instanceof Uint8Array||(ArrayBuffer.isView(t)?t=new Uint8Array(t.buffer,t.byteOffset,t.byteLength):Array.isArray(t)&&(t=Uint8Array.from(t))),!(t instanceof Uint8Array))throw TypeError("Expected Uint8Array");if(0===t.length)return"";let a=0,n=0,s=0,l=t.length;for(;s!==l&&0===t[s];)s++,a++;let c=(l-s)*o+1>>>0,d=new Uint8Array(c);for(;s!==l;){let e=t[s],i=0;for(let t=c-1;(0!==e||i<n)&&-1!==t;t--,i++)e+=256*d[t]>>>0,d[t]=e%r>>>0,e=e/r>>>0;if(0!==e)throw Error("Non-zero carry");n=i,s++}let u=c-n;for(;u!==c&&0===d[u];)u++;let h=i.repeat(a);for(;u<c;++u)h+=e.charAt(d[u]);return h},decodeUnsafe:n,decode:function(e){let t=n(e);if(t)return t;throw Error("Non-base"+r+" character")}}}("123456789ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz");let sM={ERROR_CODE_UNRECOGNIZED_CHAIN_ID:4902,ERROR_CODE_DEFAULT:5e3,ERROR_INVALID_CHAIN_ID:32603},sU={contracts:{gasPriceOracle:{address:"0x420000000000000000000000000000000000000F"},l1Block:{address:"0x4200000000000000000000000000000000000015"},l2CrossDomainMessenger:{address:"0x4200000000000000000000000000000000000007"},l2Erc721Bridge:{address:"0x4200000000000000000000000000000000000014"},l2StandardBridge:{address:"0x4200000000000000000000000000000000000010"},l2ToL1MessagePasser:{address:"0x4200000000000000000000000000000000000016"}},formatters:{block:id({format:e=>({transactions:e.transactions?.map(e=>{if("string"==typeof e)return e;let t=il(e);return"0x7e"===t.typeHex&&(t.isSystemTx=e.isSystemTx,t.mint=e.mint?tk(e.mint):void 0,t.sourceHash=e.sourceHash,t.type="deposit"),t}),stateRoot:e.stateRoot})}),transaction:ic({format(e){let t={};return"0x7e"===e.type&&(t.isSystemTx=e.isSystemTx,t.mint=e.mint?tk(e.mint):void 0,t.sourceHash=e.sourceHash,t.type="deposit"),t}}),transactionReceipt:ij({format:e=>({l1GasPrice:e.l1GasPrice?tk(e.l1GasPrice):null,l1GasUsed:e.l1GasUsed?tk(e.l1GasUsed):null,l1Fee:e.l1Fee?tk(e.l1Fee):null,l1FeeScalar:e.l1FeeScalar?Number(e.l1FeeScalar):null})})},serializers:{transaction:function(e,t){return"deposit"===e.type||"u">typeof e.sourceHash?function(e){!function(e){let{from:t,to:r}=e;if(t&&!rp(t))throw new rl({address:t});if(r&&!rp(r))throw new rl({address:r})}(e);let{sourceHash:t,data:r,from:i,gas:a,isSystemTx:o,mint:n,to:s,value:l}=e;return rg(["0x7e",r8([t,i,s??"0x",n?tI(n):"0x",l?tI(l):"0x",a?tI(a):"0x",o?"0x1":"0x",r??"0x"])])}(e):function(e,t){let r=function(e){if(e.type)return e.type;if("u">typeof e.authorizationList)return"eip7702";if("u">typeof e.blobs||"u">typeof e.blobVersionedHashes||"u">typeof e.maxFeePerBlobGas||"u">typeof e.sidecars)return"eip4844";if("u">typeof e.maxFeePerGas||"u">typeof e.maxPriorityFeePerGas)return"eip1559";if("u">typeof e.gasPrice)return"u">typeof e.accessList?"eip2930":"legacy";throw new rI({transaction:e})}(e);return"eip1559"===r?function(e,t){let{chainId:r,gas:i,nonce:a,to:o,value:n,maxFeePerGas:s,maxPriorityFeePerGas:l,accessList:c,data:d}=e;iM(e);let u=iU(c);return rg(["0x02",r8([tI(r),a?tI(a):"0x",l?tI(l):"0x",s?tI(s):"0x",i?tI(i):"0x",o??"0x",n?tI(n):"0x",d??"0x",u,...iz(e,t)])])}(e,t):"eip2930"===r?function(e,t){let{chainId:r,gas:i,data:a,nonce:o,to:n,value:s,accessList:l,gasPrice:c}=e;!function(e){let{chainId:t,maxPriorityFeePerGas:r,gasPrice:i,maxFeePerGas:a,to:o}=e;if(t<=0)throw new ik({chainId:t});if(o&&!rp(o))throw new rl({address:o});if(r||a)throw new tw("`maxFeePerGas`/`maxPriorityFeePerGas` is not a valid EIP-2930 Transaction attribute.");if(i&&i>io)throw new ie({maxFeePerGas:i})}(e);let d=iU(l);return rg(["0x01",r8([tI(r),o?tI(o):"0x",c?tI(c):"0x",i?tI(i):"0x",n??"0x",s?tI(s):"0x",a??"0x",d,...iz(e,t)])])}(e,t):"eip4844"===r?function(e,t){let{chainId:r,gas:i,nonce:a,to:o,value:n,maxFeePerBlobGas:s,maxFeePerGas:l,maxPriorityFeePerGas:c,accessList:d,data:u}=e;!function(e){let{blobVersionedHashes:t}=e;if(t){if(0===t.length)throw new iC;for(let e of t){let t=tp(e),r=tA(function(e,t,r,{strict:i}={}){return th(e,{strict:!1})?function(e,t,r,{strict:i}={}){rf(e,0);let a=`0x${e.replace("0x","").slice(0*2,2)}`;return i&&rw(a,t,1),a}(e,0,1,{strict:i}):function(e,t,r,{strict:i}={}){rf(e,0);let a=e.slice(t,1);return i&&rw(a,t,r),a}(e,0,1,{strict:i})}(e,0,0));if(32!==t)throw new ix({hash:e,size:t});if(1!==r)throw new iE({hash:e,version:r})}}iM(e)}(e);let h=e.blobVersionedHashes,p=e.sidecars;if(e.blobs&&(typeof h>"u"||typeof p>"u")){let t="string"==typeof e.blobs[0]?e.blobs:e.blobs.map(e=>tS(e)),r=e.kzg,i=iu({blobs:t,kzg:r});if(typeof h>"u"&&(h=function(e){let{commitments:t,version:r}=e,i=e.to??("string"==typeof t[0]?"hex":"bytes"),a=[];for(let e of t)a.push(function(e){let{commitment:t,version:r=1}=e,i=e.to??("string"==typeof t?"hex":"bytes"),a=function(e,t){let r=ib(th(e,{strict:!1})?tR(e):e);return"bytes"===(t||"hex")?r:tI(r)}(t,"bytes");return a.set([r],0),"bytes"===i?a:tS(a)}({commitment:e,to:i,version:r}));return a}({commitments:i})),typeof p>"u"){let e=ih({blobs:t,commitments:i,kzg:r});p=function(e){let{data:t,kzg:r,to:i}=e,a=e.blobs??function(e){let t=e.to??("string"==typeof e.data?"hex":"bytes"),r="string"==typeof e.data?tB(e.data):e.data,i=tp(r);if(!i)throw new iC;if(i>761855)throw new iy({maxSize:761855,size:i});let a=[],o=!0,n=0;for(;o;){let e=rC(new Uint8Array(131072)),t=0;for(;t<4096;){let i=r.slice(n,n+31);if(e.pushByte(0),e.pushBytes(i),i.length<31){e.pushByte(128),o=!1;break}t++,n+=31}a.push(e)}return"bytes"===t?a.map(e=>e.bytes):a.map(e=>tS(e.bytes))}({data:t,to:i}),o=e.commitments??iu({blobs:a,kzg:r,to:i}),n=e.proofs??ih({blobs:a,commitments:o,kzg:r,to:i}),s=[];for(let e=0;e<a.length;e++)s.push({blob:a[e],commitment:o[e],proof:n[e]});return s}({blobs:t,commitments:i,proofs:e})}}let g=iU(d),f=[tI(r),a?tI(a):"0x",c?tI(c):"0x",l?tI(l):"0x",i?tI(i):"0x",o??"0x",n?tI(n):"0x",u??"0x",g,s?tI(s):"0x",h??[],...iz(e,t)],w=[],m=[],v=[];if(p)for(let e=0;e<p.length;e++){let{blob:t,commitment:r,proof:i}=p[e];w.push(t),m.push(r),v.push(i)}return rg(["0x03",r8(p?[f,w,m,v]:f)])}(e,t):"eip7702"===r?function(e,t){let{authorizationList:r,chainId:i,gas:a,nonce:o,to:n,value:s,maxFeePerGas:l,maxPriorityFeePerGas:c,accessList:d,data:u}=e;!function(e){let{authorizationList:t}=e;if(t)for(let e of t){let{chainId:t}=e,r=e.address;if(!rp(r))throw new rl({address:r});if(t<0)throw new ik({chainId:t})}iM(e)}(e);let h=iU(d),p=function(e){if(!e||0===e.length)return[];let t=[];for(let r of e){let{chainId:e,nonce:i,...a}=r,o=r.address;t.push([e?tI(e):"0x",o,i?tI(i):"0x",...iz({},a)])}return t}(r);return rg(["0x04",r8([tI(i),o?tI(o):"0x",c?tI(c):"0x",l?tI(l):"0x",a?tI(a):"0x",n??"0x",s?tI(s):"0x",u??"0x",h,p,...iz(e,t)])])}(e,t):function(e,t){let{chainId:r=0,gas:i,data:a,nonce:o,to:n,value:s,gasPrice:l}=e;!function(e){let{chainId:t,maxPriorityFeePerGas:r,gasPrice:i,maxFeePerGas:a,to:o}=e;if(o&&!rp(o))throw new rl({address:o});if("u">typeof t&&t<=0)throw new ik({chainId:t});if(r||a)throw new tw("`maxFeePerGas`/`maxPriorityFeePerGas` is not a valid Legacy Transaction attribute.");if(i&&i>io)throw new ie({maxFeePerGas:i})}(e);let c=[o?tI(o):"0x",l?tI(l):"0x",i?tI(i):"0x",n??"0x",s?tI(s):"0x",a??"0x"];if(t){let e=(()=>{if(t.v>=35n)return(t.v-35n)/2n>0?t.v:27n+(35n===t.v?0n:1n);if(r>0)return BigInt(2*r)+BigInt(35n+t.v-27n);let e=27n+(27n===t.v?0n:1n);if(t.v!==e)throw new rN({v:t.v});return e})(),i=tx(t.r),a=tx(t.s);c=[...c,tI(e),"0x00"===i?"0x":i,"0x00"===a?"0x":a]}else r>0&&(c=[...c,tI(r),"0x","0x"]);return r8(c)}(e,t)}(e,t)}}};sU.contracts,sU.contracts,sU.contracts,sU.contracts,sU.contracts,iB({id:53456,name:"BirdLayer",nativeCurrency:{decimals:18,name:"Ether",symbol:"ETH"},rpcUrls:{default:{http:["https://rpc.birdlayer.xyz","https://rpc1.birdlayer.xyz"],webSocket:["wss://rpc.birdlayer.xyz/ws"]}},blockExplorers:{default:{name:"BirdLayer Explorer",url:"https://scan.birdlayer.xyz"}}}),sU.contracts,iB({...sU,id:60808,name:"BOB",nativeCurrency:{decimals:18,name:"ETH",symbol:"ETH"},rpcUrls:{default:{http:["https://rpc.gobob.xyz"],webSocket:["wss://rpc.gobob.xyz"]}},blockExplorers:{default:{name:"BOB Explorer",url:"https://explorer.gobob.xyz"}},contracts:{...sU.contracts,multicall3:{address:"0xcA11bde05977b3631167028862bE2a173976CA11",blockCreated:23131},l2OutputOracle:{1:{address:"0xdDa53E23f8a32640b04D7256e651C1db98dB11C1",blockCreated:4462615}},portal:{1:{address:"0x8AdeE124447435fE03e3CD24dF3f4cAE32E65a3E",blockCreated:4462615}}},sourceId:1}),iB({...sU,id:808813,name:"BOB Sepolia",nativeCurrency:{decimals:18,name:"ETH",symbol:"ETH"},rpcUrls:{default:{http:["https://bob-sepolia.rpc.gobob.xyz"],webSocket:["wss://bob-sepolia.rpc.gobob.xyz"]}},blockExplorers:{default:{name:"BOB Sepolia Explorer",url:"https://bob-sepolia.explorer.gobob.xyz"}},contracts:{...sU.contracts,multicall3:{address:"0xcA11bde05977b3631167028862bE2a173976CA11",blockCreated:35677},l2OutputOracle:{11155111:{address:"0x14D0069452b4AE2b250B395b8adAb771E4267d2f",blockCreated:4462615}},portal:{11155111:{address:"0x867B1Aa872b9C8cB5E9F7755feDC45BB24Ad0ae4",blockCreated:4462615}}},testnet:!0,sourceId:11155111});function sz(e){return{formatters:void 0,fees:void 0,serializers:void 0,...e}}id({format:e=>({transactions:e.transactions?.map(e=>"string"==typeof e?e:{...il(e),...e.gatewayFee?{gatewayFee:tk(e.gatewayFee),gatewayFeeRecipient:e.gatewayFeeRecipient}:{},feeCurrency:e.feeCurrency}),...e.randomness?{randomness:e.randomness}:{}})}),ic({format(e){if("0x7e"===e.type)return{isSystemTx:e.isSystemTx,mint:e.mint?tk(e.mint):void 0,sourceHash:e.sourceHash,type:"deposit"};let t={feeCurrency:e.feeCurrency};return"0x7b"===e.type?t.type="cip64":("0x7c"===e.type&&(t.type="cip42"),t.gatewayFee=e.gatewayFee?tk(e.gatewayFee):null,t.gatewayFeeRecipient=e.gatewayFeeRecipient),t}}),ia({format(e){var t,r;let i={};return e.feeCurrency&&(i.feeCurrency=e.feeCurrency),("cip64"===(t=e).type||"u">typeof t.maxFeePerGas&&"u">typeof t.maxPriorityFeePerGas&&!(0===(r=t.feeCurrency)||0n===r||null==r||"0"===r||""===r||"string"==typeof r&&("0x"===tx(r).toLowerCase()||"0x00"===tx(r).toLowerCase())))&&(i.type="0x7b"),i}}),iB({id:44,name:"Crab Network",nativeCurrency:{decimals:18,name:"Crab Network Native Token",symbol:"CRAB"},rpcUrls:{default:{http:["https://crab-rpc.darwinia.network"],webSocket:["wss://crab-rpc.darwinia.network"]}},blockExplorers:{default:{name:"Blockscout",url:"https://crab-scan.darwinia.network"}},contracts:{multicall3:{address:"0xca11bde05977b3631167028862be2a173976ca11",blockCreated:3032593}}}),iB({id:66665,name:"Creator",nativeCurrency:{decimals:18,name:"Ether",symbol:"ETH"},rpcUrls:{default:{http:["https://rpc.creatorchain.io"]}},blockExplorers:{default:{name:"Explorer",url:"https://explorer.creatorchain.io"}},contracts:{multicall3:{address:"0xcA11bde05977b3631167028862bE2a173976CA11"}},testnet:!0}),sU.contracts,sU.contracts,iB({id:53457,name:"DODOchain Testnet",nativeCurrency:{decimals:18,name:"DODO",symbol:"DODO"},rpcUrls:{default:{http:["https://dodochain-testnet.alt.technology"],webSocket:["wss://dodochain-testnet.alt.technology/ws"]}},blockExplorers:{default:{name:"DODOchain Testnet (Sepolia) Explorer",url:"https://testnet-scan.dodochain.com"}},testnet:!0}),sU.contracts,sU.contracts,sU.contracts,sU.contracts,sU.contracts,iB({...sU,id:3397901,network:"funkiSepolia",name:"Funki Sepolia Sandbox",nativeCurrency:{name:"Ether",symbol:"ETH",decimals:18},rpcUrls:{default:{http:["https://funki-testnet.alt.technology"]}},blockExplorers:{default:{name:"Funki Sepolia Sandbox Explorer",url:"https://sepolia-sandbox.funkichain.com/"}},testnet:!0,contracts:{...sU.contracts,multicall3:{address:"0xca11bde05977b3631167028862be2a173976ca11",blockCreated:1620204}},sourceId:11155111}),iB({...sU,name:"Garnet Testnet",testnet:!0,id:17069,sourceId:17e3,nativeCurrency:{name:"Ether",symbol:"ETH",decimals:18},rpcUrls:{default:{http:["https://rpc.garnetchain.com"],webSocket:["wss://rpc.garnetchain.com"]}},blockExplorers:{default:{name:"Blockscout",url:"https://explorer.garnetchain.com"}},contracts:{...sU.contracts,multicall3:{address:"0xca11bde05977b3631167028862be2a173976ca11"},portal:{17e3:{address:"0x57ee40586fbE286AfC75E67cb69511A6D9aF5909",blockCreated:1274684}},l2OutputOracle:{17e3:{address:"0xCb8E7AC561b8EF04F2a15865e9fbc0766FEF569B",blockCreated:1274684}},l1StandardBridge:{17e3:{address:"0x09bcDd311FE398F80a78BE37E489f5D440DB95DE",blockCreated:1274684}}}}),sU.contracts,sU.contracts,iB({id:701,name:"Koi Network",nativeCurrency:{decimals:18,name:"Koi Network Native Token",symbol:"KRING"},rpcUrls:{default:{http:["https://koi-rpc.darwinia.network"],webSocket:["wss://koi-rpc.darwinia.network"]}},blockExplorers:{default:{name:"Blockscout",url:"https://koi-scan.darwinia.network"}},contracts:{multicall3:{address:"0xca11bde05977b3631167028862be2a173976ca11",blockCreated:180001}},testnet:!0}),sU.contracts,sU.contracts,sU.contracts,sU.contracts,sU.contracts,sU.contracts,sU.contracts,sU.contracts,sU.contracts,sU.contracts,iB({...sU,name:"Pyrope Testnet",testnet:!0,id:695569,sourceId:11155111,nativeCurrency:{name:"Ether",symbol:"ETH",decimals:18},rpcUrls:{default:{http:["https://rpc.pyropechain.com"],webSocket:["wss://rpc.pyropechain.com"]}},blockExplorers:{default:{name:"Blockscout",url:"https://pyrope.blockscout.com"}},contracts:{...sU.contracts,l1StandardBridge:{11155111:{address:"0xC24932c31D9621aE9e792576152B7ef010cFC2F8"}}}}),iB({...sU,name:"Redstone",id:690,sourceId:1,nativeCurrency:{decimals:18,name:"Ether",symbol:"ETH"},rpcUrls:{default:{http:["https://rpc.redstonechain.com"],webSocket:["wss://rpc.redstonechain.com"]}},blockExplorers:{default:{name:"Blockscout",url:"https://explorer.redstone.xyz"}},contracts:{...sU.contracts,multicall3:{address:"0xca11bde05977b3631167028862be2a173976ca11"},portal:{1:{address:"0xC7bCb0e8839a28A1cFadd1CF716de9016CdA51ae",blockCreated:19578329}},l2OutputOracle:{1:{address:"0xa426A052f657AEEefc298b3B5c35a470e4739d69",blockCreated:19578337}},l1StandardBridge:{1:{address:"0xc473ca7E02af24c129c2eEf51F2aDf0411c1Df69",blockCreated:19578331}}}}),sU.contracts,sU.contracts,sU.contracts,sU.contracts,sU.contracts,sU.contracts,sU.contracts,sU.contracts,sU.contracts,sU.contracts,sU.contracts,sU.contracts,sU.contracts,sU.contracts,sU.contracts,sU.contracts,sU.contracts,sU.contracts,sU.contracts;let sD=sz({id:"5eykt4UsFv8P8NJdTREpY1vzqKqZKvdp",name:"Solana",network:"solana-mainnet",nativeCurrency:{name:"Solana",symbol:"SOL",decimals:9},rpcUrls:{default:{http:["https://rpc.walletconnect.org/v1"]}},blockExplorers:{default:{name:"Solscan",url:"https://solscan.io"}},testnet:!1,chainNamespace:"solana",caipNetworkId:"solana:5eykt4UsFv8P8NJdTREpY1vzqKqZKvdp",deprecatedCaipNetworkId:"solana:4sGjMW1sUnHzSxGspuhpqLDx6wiyjNtZ"}),sj=sz({id:"EtWTRABZaYq6iMfeYKouRu166VU2xqa1",name:"Solana Devnet",network:"solana-devnet",nativeCurrency:{name:"Solana",symbol:"SOL",decimals:9},rpcUrls:{default:{http:["https://rpc.walletconnect.org/v1"]}},blockExplorers:{default:{name:"Solscan",url:"https://solscan.io"}},testnet:!0,chainNamespace:"solana",caipNetworkId:"solana:EtWTRABZaYq6iMfeYKouRu166VU2xqa1",deprecatedCaipNetworkId:"solana:8E9rvCKLFQia2Y35HXjjpWzj8weVo44K"});sz({id:"4uhcVJyU9pJkvQyS88uRDiswHXSCkY3z",name:"Solana Testnet",network:"solana-testnet",nativeCurrency:{name:"Solana",symbol:"SOL",decimals:9},rpcUrls:{default:{http:["https://rpc.walletconnect.org/v1"]}},blockExplorers:{default:{name:"Solscan",url:"https://solscan.io"}},testnet:!0,chainNamespace:"solana",caipNetworkId:"solana:4uhcVJyU9pJkvQyS88uRDiswHXSCkY3z"}),sz({id:"000000000019d6689c085ae165831e93",caipNetworkId:"bip122:000000000019d6689c085ae165831e93",chainNamespace:"bip122",name:"Bitcoin",nativeCurrency:{name:"Bitcoin",symbol:"BTC",decimals:8},rpcUrls:{default:{http:["https://rpc.walletconnect.org/v1"]}}}),sz({id:"000000000933ea01ad0ee984209779ba",caipNetworkId:"bip122:000000000933ea01ad0ee984209779ba",chainNamespace:"bip122",name:"Bitcoin Testnet",nativeCurrency:{name:"Bitcoin",symbol:"BTC",decimals:8},rpcUrls:{default:{http:["https://rpc.walletconnect.org/v1"]}},testnet:!0});let sW={solana:["solana_signMessage","solana_signTransaction","solana_requestAccounts","solana_getAccounts","solana_signAllTransactions","solana_signAndSendTransaction"],eip155:["eth_accounts","eth_requestAccounts","eth_sendRawTransaction","eth_sign","eth_signTransaction","eth_signTypedData","eth_signTypedData_v3","eth_signTypedData_v4","eth_sendTransaction","personal_sign","wallet_switchEthereumChain","wallet_addEthereumChain","wallet_getPermissions","wallet_requestPermissions","wallet_registerOnboarding","wallet_watchAsset","wallet_scanQRCode","wallet_getCallsStatus","wallet_showCallsStatus","wallet_sendCalls","wallet_getCapabilities","wallet_grantPermissions","wallet_revokePermissions","wallet_getAssets"],bip122:["sendTransfer","signMessage","signPsbt","getAccountAddresses"]},sH={getMethodsByChainNamespace:e=>sW[e]||[],createDefaultNamespace(e){return{methods:this.getMethodsByChainNamespace(e),events:["accountsChanged","chainChanged"],chains:[],rpcMap:{}}},applyNamespaceOverrides(e,t){if(!t)return{...e};let r={...e},i=new Set;if(t.methods&&Object.keys(t.methods).forEach(e=>i.add(e)),t.chains&&Object.keys(t.chains).forEach(e=>i.add(e)),t.events&&Object.keys(t.events).forEach(e=>i.add(e)),t.rpcMap&&Object.keys(t.rpcMap).forEach(e=>{let[t]=e.split(":");t&&i.add(t)}),i.forEach(e=>{r[e]||(r[e]=this.createDefaultNamespace(e))}),t.methods&&Object.entries(t.methods).forEach(([e,t])=>{r[e]&&(r[e].methods=t)}),t.chains&&Object.entries(t.chains).forEach(([e,t])=>{r[e]&&(r[e].chains=t)}),t.events&&Object.entries(t.events).forEach(([e,t])=>{r[e]&&(r[e].events=t)}),t.rpcMap){let e=new Set;Object.entries(t.rpcMap).forEach(([t,i])=>{let[a,o]=t.split(":");a&&o&&r[a]&&(r[a].rpcMap||(r[a].rpcMap={}),e.has(a)||(r[a].rpcMap={},e.add(a)),r[a].rpcMap[o]=i)})}return r},createNamespaces(e,t){let r=e.reduce((e,t)=>{let{id:r,chainNamespace:i,rpcUrls:a}=t,o=a.default.http[0];e[i]||(e[i]=this.createDefaultNamespace(i));let n=`${i}:${r}`,s=e[i];switch(s.chains.push(n),n){case sD.caipNetworkId:s.chains.push(sD.deprecatedCaipNetworkId);break;case sj.caipNetworkId:s.chains.push(sj.deprecatedCaipNetworkId)}return s?.rpcMap&&o&&(s.rpcMap[r]=o),e},{});return this.applyNamespaceOverrides(r,t)},resolveReownName:async e=>{let t=await oW.resolveName(e);return(Object.values(t?.addresses)||[])[0]?.address||!1},getChainsFromNamespaces:(e={})=>Object.values(e).flatMap(e=>Array.from(new Set([...e.chains||[],...e.accounts.map(e=>{let[t,r]=e.split(":");return`${t}:${r}`})]))),isSessionEventData:e=>"object"==typeof e&&null!==e&&"id"in e&&"topic"in e&&"params"in e&&"object"==typeof e.params&&null!==e.params&&"chainId"in e.params&&"event"in e.params&&"object"==typeof e.params.event&&null!==e.params.event};class sF{constructor({provider:e,namespace:t}){this.id=ec.CONNECTOR_ID.WALLET_CONNECT,this.name=oZ[ec.CONNECTOR_ID.WALLET_CONNECT],this.type="WALLET_CONNECT",this.imageId=oV[ec.CONNECTOR_ID.WALLET_CONNECT],this.getCaipNetworks=oS.getCaipNetworks.bind(oS),this.caipNetworks=this.getCaipNetworks(),this.provider=e,this.chain=t}get chains(){return this.getCaipNetworks()}async connectWalletConnect(){if(!await this.authenticate()){let e=this.getCaipNetworks(),t=eZ.state.universalProviderConfigOverride,r=sH.createNamespaces(e,t);await this.provider.connect({optionalNamespaces:r})}return{clientId:await this.provider.client.core.crypto.getClientId(),session:this.provider.session}}async disconnect(){await this.provider.disconnect()}async authenticate(){let e=this.chains.map(e=>e.caipNetworkId);return to.universalProviderAuthenticate({universalProvider:this.provider,chains:e,methods:sV})}}let sV=["eth_accounts","eth_requestAccounts","eth_sendRawTransaction","eth_sign","eth_signTransaction","eth_signTypedData","eth_signTypedData_v3","eth_signTypedData_v4","eth_sendTransaction","personal_sign","wallet_switchEthereumChain","wallet_addEthereumChain","wallet_getPermissions","wallet_requestPermissions","wallet_registerOnboarding","wallet_watchAsset","wallet_scanQRCode","wallet_getCallsStatus","wallet_sendCalls","wallet_getCapabilities","wallet_grantPermissions","wallet_revokePermissions","wallet_getAssets"];class sZ{constructor(e){this.availableConnectors=[],this.eventListeners=new Map,this.getCaipNetworks=e=>oS.getCaipNetworks(e),e&&this.construct(e)}construct(e){this.projectId=e.projectId,this.namespace=e.namespace,this.adapterType=e.adapterType}get connectors(){return this.availableConnectors}get networks(){return this.getCaipNetworks(this.namespace)}setAuthProvider(e){this.addConnector({id:ec.CONNECTOR_ID.AUTH,type:"AUTH",name:ec.CONNECTOR_NAMES.AUTH,provider:e,imageId:oV[ec.CONNECTOR_ID.AUTH],chain:this.namespace,chains:[]})}addConnector(...e){let t=new Set;this.availableConnectors=[...e,...this.availableConnectors].filter(e=>!t.has(e.id)&&(t.add(e.id),!0)),this.emit("connectors",this.availableConnectors)}setStatus(e,t){o$.setStatus(e,t)}on(e,t){this.eventListeners.has(e)||this.eventListeners.set(e,new Set),this.eventListeners.get(e)?.add(t)}off(e,t){let r=this.eventListeners.get(e);r&&r.delete(t)}removeAllEventListeners(){this.eventListeners.forEach(e=>{e.clear()})}emit(e,t){let r=this.eventListeners.get(e);r&&r.forEach(e=>e(t))}async connectWalletConnect(e){return{clientId:(await this.getWalletConnectConnector().connectWalletConnect()).clientId}}async switchNetwork(e){let{caipNetwork:t,providerType:r}=e;if(!e.provider)return;let i="provider"in e.provider?e.provider.provider:e.provider;if("WALLET_CONNECT"===r){i.setDefaultChain(t.caipNetworkId);return}if(i&&"AUTH"===r){let e=o$.state.preferredAccountTypes?.[t.chainNamespace];await i.switchNetwork(t.caipNetworkId);let r=await i.getUser({chainId:t.caipNetworkId,preferredAccountType:e});this.emit("switchNetwork",r)}}getWalletConnectConnector(){let e=this.connectors.find(e=>e instanceof sF);if(!e)throw Error("WalletConnectConnector not found");return e}}class sq extends sZ{setUniversalProvider(e){this.addConnector(new sF({provider:e,caipNetworks:this.getCaipNetworks(),namespace:this.namespace}))}async connect(e){return Promise.resolve({id:"WALLET_CONNECT",type:"WALLET_CONNECT",chainId:Number(e.chainId),provider:this.provider,address:""})}async disconnect(){try{await this.getWalletConnectConnector().disconnect()}catch(e){console.warn("UniversalAdapter:disconnect - error",e)}}async getAccounts({namespace:e}){return Promise.resolve({accounts:(this.provider?.session?.namespaces?.[e]?.accounts?.map(e=>{let[,,t]=e.split(":");return t}).filter((e,t,r)=>r.indexOf(e)===t)||[]).map(t=>eL.createAccount(e,t,"bip122"===e?"payment":"eoa"))})}async syncConnectors(){return Promise.resolve()}async getBalance(e){if(!(e.caipNetwork&&eR.BALANCE_SUPPORTED_CHAINS.includes(e.caipNetwork?.chainNamespace))||e.caipNetwork?.testnet)return{balance:"0.00",symbol:e.caipNetwork?.nativeCurrency.symbol||""};if(o$.state.balanceLoading&&e.chainId===oS.state.activeCaipNetwork?.id)return{balance:o$.state.balance||"0.00",symbol:o$.state.balanceSymbol||""};let t=(await o$.fetchTokenBalance()).find(t=>t.chainId===`${e.caipNetwork?.chainNamespace}:${e.chainId}`&&t.symbol===e.caipNetwork?.nativeCurrency.symbol);return{balance:t?.quantity.numeric||"0.00",symbol:t?.symbol||e.caipNetwork?.nativeCurrency.symbol||""}}async signMessage(e){let{provider:t,message:r,address:i}=e;if(!t)throw Error("UniversalAdapter:signMessage - provider is undefined");return{signature:oS.state.activeCaipNetwork?.chainNamespace===ec.CHAIN.SOLANA?(await t.request({method:"solana_signMessage",params:{message:sB.encode(new TextEncoder().encode(r)),pubkey:i}},oS.state.activeCaipNetwork?.caipNetworkId)).signature:await t.request({method:"personal_sign",params:[r,i]},oS.state.activeCaipNetwork?.caipNetworkId)}}async estimateGas(){return Promise.resolve({gas:BigInt(0)})}async getProfile(){return Promise.resolve({profileImage:"",profileName:""})}async sendTransaction(){return Promise.resolve({hash:""})}walletGetAssets(e){return Promise.resolve({})}async writeContract(){return Promise.resolve({hash:""})}async getEnsAddress(){return Promise.resolve({address:!1})}parseUnits(){return 0n}formatUnits(){return"0"}async getCapabilities(){return Promise.resolve({})}async grantPermissions(){return Promise.resolve({})}async revokePermissions(){return Promise.resolve("0x")}async syncConnection(){return Promise.resolve({id:"WALLET_CONNECT",type:"WALLET_CONNECT",chainId:1,provider:this.provider,address:""})}async switchNetwork(e){let{caipNetwork:t}=e,r=this.getWalletConnectConnector();if(t.chainNamespace===ec.CHAIN.EVM)try{await r.provider?.request({method:"wallet_switchEthereumChain",params:[{chainId:tI(t.id)}]})}catch(e){if(e.code===sM.ERROR_CODE_UNRECOGNIZED_CHAIN_ID||e.code===sM.ERROR_INVALID_CHAIN_ID||e.code===sM.ERROR_CODE_DEFAULT||e?.data?.originalError?.code===sM.ERROR_CODE_UNRECOGNIZED_CHAIN_ID)try{await r.provider?.request({method:"wallet_addEthereumChain",params:[{chainId:tI(t.id),rpcUrls:[t?.rpcUrls.chainDefault?.http],chainName:t.name,nativeCurrency:t.nativeCurrency,blockExplorerUrls:[t.blockExplorers?.default.url]}]})}catch{throw Error("Chain is not supported")}}r.provider.setDefaultChain(t.caipNetworkId)}getWalletConnectProvider(){return this.connectors.find(e=>"WALLET_CONNECT"===e.type)?.provider}}class sG{constructor(e){this.chainNamespaces=[],this.reportedAlertErrors={},this.getCaipNetwork=(e,t)=>e?oS.getNetworkData(e)?.requestedCaipNetworks?.find(e=>e.id===t)||oS.getNetworkData(e)?.caipNetwork||oS.getRequestedCaipNetworks(e).filter(t=>t.chainNamespace===e)?.[0]:oS.state.activeCaipNetwork||this.defaultCaipNetwork,this.getCaipNetworkId=()=>{let e=this.getCaipNetwork();if(e)return e.id},this.getCaipNetworks=e=>oS.getCaipNetworks(e),this.getActiveChainNamespace=()=>oS.state.activeChain,this.setRequestedCaipNetworks=(e,t)=>{oS.setRequestedCaipNetworks(e,t)},this.getApprovedCaipNetworkIds=()=>oS.getAllApprovedCaipNetworkIds(),this.getCaipAddress=e=>oS.state.activeChain!==e&&e?oS.getAccountProp("caipAddress",e):oS.state.activeCaipAddress,this.setClientId=e=>{oP.setClientId(e)},this.getProvider=e=>nx.getProvider(e),this.getProviderType=e=>nx.getProviderId(e),this.getPreferredAccountType=e=>o$.state.preferredAccountTypes?.[e],this.setCaipAddress=(e,t)=>{o$.setCaipAddress(e,t)},this.setBalance=(e,t,r)=>{o$.setBalance(e,t,r)},this.setProfileName=(e,t)=>{o$.setProfileName(e,t)},this.setProfileImage=(e,t)=>{o$.setProfileImage(e,t)},this.setUser=(e,t)=>{o$.setUser(e,t),eZ.state.enableEmbedded&&oB.close()},this.resetAccount=e=>{o$.resetAccount(e)},this.setCaipNetwork=e=>{oS.setActiveCaipNetwork(e)},this.setCaipNetworkOfNamespace=(e,t)=>{oS.setChainNetworkData(t,{caipNetwork:e})},this.setAllAccounts=(e,t)=>{o$.setAllAccounts(e,t),eZ.setHasMultipleAddresses(e?.length>1)},this.setStatus=(e,t)=>{o$.setStatus(e,t),e7.isConnected()?e$.setConnectionStatus("connected"):e$.setConnectionStatus("disconnected")},this.getAddressByChainNamespace=e=>oS.getAccountProp("address",e),this.setConnectors=e=>{let t=[...e7.state.allConnectors,...e];e7.setConnectors(t)},this.fetchIdentity=e=>oP.fetchIdentity(e),this.getReownName=e=>oW.getNamesForAddress(e),this.getConnectors=()=>e7.getConnectors(),this.getConnectorImage=e=>eH.getConnectorImage(e),this.setConnectedWalletInfo=(e,t)=>{let r=nx.getProviderId(t),i=e?{...e,type:r}:void 0;o$.setConnectedWalletInfo(i,t)},this.getIsConnectedState=()=>!!oS.state.activeCaipAddress,this.addAddressLabel=(e,t,r)=>{o$.addAddressLabel(e,t,r)},this.removeAddressLabel=(e,t)=>{o$.removeAddressLabel(e,t)},this.getAddress=e=>oS.state.activeChain!==e&&e?oS.getAccountProp("address",e):o$.state.address,this.setApprovedCaipNetworksData=e=>oS.setApprovedCaipNetworksData(e),this.resetNetwork=e=>{oS.resetNetwork(e)},this.addConnector=e=>{e7.addConnector(e)},this.resetWcConnection=()=>{tc.resetWcConnection()},this.setAddressExplorerUrl=(e,t)=>{o$.setAddressExplorerUrl(e,t)},this.setSmartAccountDeployed=(e,t)=>{o$.setSmartAccountDeployed(e,t)},this.setSmartAccountEnabledNetworks=(e,t)=>{oS.setSmartAccountEnabledNetworks(e,t)},this.setPreferredAccountType=(e,t)=>{o$.setPreferredAccountType(e,t)},this.setEIP6963Enabled=e=>{eZ.setEIP6963Enabled(e)},this.handleUnsafeRPCRequest=()=>{this.isOpen()?this.isTransactionStackEmpty()||this.redirect("ApproveTransaction"):this.open({view:"ApproveTransaction"})},this.options=e,this.version=e.sdkVersion,this.caipNetworks=this.extendCaipNetworks(e),this.chainNamespaces=this.getChainNamespacesSet(e.adapters,this.caipNetworks),this.defaultCaipNetwork=this.extendDefaultCaipNetwork(e),this.chainAdapters=this.createAdapters(e.adapters),this.initialize(e)}getChainNamespacesSet(e,t){let r=e?.map(e=>e.namespace).filter(e=>!!e);return r?.length?[...new Set(r)]:[...new Set(t?.map(e=>e.chainNamespace))]}async initialize(e){this.initControllers(e),await this.initChainAdapters(),await this.injectModalUi(),this.sendInitializeEvent(e),tu.set({initialized:!0}),await this.syncExistingConnection()}sendInitializeEvent(e){let{...t}=e;delete t.adapters,delete t.universalProvider,eJ.sendEvent({type:"track",event:"INITIALIZE",properties:{...t,networks:e.networks.map(e=>e.id),siweConfig:{options:e.siweConfig?.options||{}}}})}initControllers(e){this.initializeOptionsController(e),this.initializeChainController(e),this.initializeThemeController(e),this.initializeConnectionController(e),this.initializeConnectorController()}initializeThemeController(e){e.themeMode&&e6.setThemeMode(e.themeMode),e.themeVariables&&e6.setThemeVariables(e.themeVariables)}initializeChainController(e){if(!this.connectionControllerClient||!this.networkControllerClient)throw Error("ConnectionControllerClient and NetworkControllerClient must be set");oS.initialize(e.adapters??[],this.caipNetworks,{connectionControllerClient:this.connectionControllerClient,networkControllerClient:this.networkControllerClient});let t=this.getDefaultNetwork();t&&oS.setActiveCaipNetwork(t)}initializeConnectionController(e){tc.setWcBasic(e.basic??!1)}initializeConnectorController(){e7.initialize(this.chainNamespaces)}initializeOptionsController(e){eZ.setDebug(!1!==e.debug),eZ.setEnableWalletConnect(!1!==e.enableWalletConnect),eZ.setEnableWalletGuide(!1!==e.enableWalletGuide),eZ.setEnableWallets(!1!==e.enableWallets),eZ.setEIP6963Enabled(!1!==e.enableEIP6963),eZ.setEnableNetworkSwitch(!1!==e.enableNetworkSwitch),eZ.setEnableAuthLogger(!1!==e.enableAuthLogger),eZ.setCustomRpcUrls(e.customRpcUrls),eZ.setSdkVersion(e.sdkVersion),eZ.setProjectId(e.projectId),eZ.setEnableEmbedded(e.enableEmbedded),eZ.setAllWallets(e.allWallets),eZ.setIncludeWalletIds(e.includeWalletIds),eZ.setExcludeWalletIds(e.excludeWalletIds),eZ.setFeaturedWalletIds(e.featuredWalletIds),eZ.setTokens(e.tokens),eZ.setTermsConditionsUrl(e.termsConditionsUrl),eZ.setPrivacyPolicyUrl(e.privacyPolicyUrl),eZ.setCustomWallets(e.customWallets),eZ.setFeatures(e.features),eZ.setAllowUnsupportedChain(e.allowUnsupportedChain),eZ.setUniversalProviderConfigOverride(e.universalProviderConfigOverride),eZ.setDefaultAccountTypes(e.defaultAccountTypes);let t=e$.getPreferredAccountTypes(),r={...eZ.state.defaultAccountTypes,...t};o$.setPreferredAccountTypes(r);let i=this.getDefaultMetaData();if(!e.metadata&&i&&(e.metadata=i),eZ.setMetadata(e.metadata),eZ.setDisableAppend(e.disableAppend),eZ.setEnableEmbedded(e.enableEmbedded),eZ.setSIWX(e.siwx),!e.projectId){eG.open(oG.ALERT_ERRORS.PROJECT_ID_NOT_CONFIGURED,"error");return}if(e.adapters?.find(e=>e.namespace===ec.CHAIN.EVM)&&e.siweConfig){if(e.siwx)throw Error("Cannot set both `siweConfig` and `siwx` options");eZ.setSIWX(e.siweConfig.mapToSIWX())}}getDefaultMetaData(){return"u">typeof window&&"u">typeof document?{name:document.getElementsByTagName("title")?.[0]?.textContent||"",description:document.querySelector('meta[property="og:description"]')?.content||"",url:window.location.origin,icons:[document.querySelector('link[rel~="icon"]')?.href||""]}:null}setUnsupportedNetwork(e){let t=this.getActiveChainNamespace();if(t){let r=nb.getUnsupportedNetwork(`${t}:${e}`);oS.setActiveCaipNetwork(r)}}getDefaultNetwork(){return nb.getCaipNetworkFromStorage(this.defaultCaipNetwork)}extendCaipNetwork(e,t){return nb.extendCaipNetwork(e,{customNetworkImageUrls:t.chainImages,projectId:t.projectId})}extendCaipNetworks(e){return nb.extendCaipNetworks(e.networks,{customNetworkImageUrls:e.chainImages,customRpcUrls:e.customRpcUrls,projectId:e.projectId})}extendDefaultCaipNetwork(e){let t=e.networks.find(t=>t.id===e.defaultNetwork?.id);return t?nb.extendCaipNetwork(t,{customNetworkImageUrls:e.chainImages,customRpcUrls:e.customRpcUrls,projectId:e.projectId}):void 0}createClients(){this.connectionControllerClient={connectWalletConnect:async()=>{let e=oS.state.activeChain,t=this.getAdapter(e),r=this.getCaipNetwork(e)?.id;if(!t)throw Error("Adapter not found");let i=await t.connectWalletConnect(r);this.close(),this.setClientId(i?.clientId||null),e$.setConnectedNamespaces([...oS.state.chains.keys()]),this.chainNamespaces.forEach(e=>{e7.setConnectorId(oH.CONNECTOR_TYPE_WALLET_CONNECT,e)}),await this.syncWalletConnectAccount()},connectExternal:async({id:e,info:t,type:r,provider:i,chain:a,caipNetwork:o})=>{let n=oS.state.activeChain,s=a||n,l=this.getAdapter(s);if(a&&a!==n&&!o){let e=this.getCaipNetworks().find(e=>e.chainNamespace===a);e&&this.setCaipNetwork(e)}if(!l)throw Error("Adapter not found");let c=this.getCaipNetwork(s),d=await l.connect({id:e,info:t,type:r,provider:i,chainId:o?.id||c?.id,rpcUrl:o?.rpcUrls?.default?.http?.[0]||c?.rpcUrls?.default?.http?.[0]});if(!d)return;e$.addConnectedNamespace(s),this.syncProvider({...d,chainNamespace:s});let{accounts:u}=await l.getAccounts({namespace:s,id:e});this.setAllAccounts(u,s),this.setStatus("connected",s)},reconnectExternal:async({id:e,info:t,type:r,provider:i})=>{let a=oS.state.activeChain,o=this.getAdapter(a);o?.reconnect&&(await o?.reconnect({id:e,info:t,type:r,provider:i,chainId:this.getCaipNetwork()?.id}),e$.addConnectedNamespace(a))},disconnect:async e=>{let t=e||oS.state.activeChain,r=this.getAdapter(t),i=nx.getProvider(t),a=nx.getProviderId(t);await r?.disconnect({provider:i,providerType:a}),e$.removeConnectedNamespace(t),nx.resetChain(t),this.setUser(void 0,t),this.setStatus("disconnected",t)},checkInstalled:e=>e?e.some(e=>!!window.ethereum?.[String(e)]):!!window.ethereum,signMessage:async e=>(await this.getAdapter(oS.state.activeChain)?.signMessage({message:e,address:o$.state.address,provider:nx.getProvider(oS.state.activeChain)}))?.signature||"",sendTransaction:async e=>{if(e.chainNamespace===ec.CHAIN.EVM){let t=this.getAdapter(oS.state.activeChain),r=nx.getProvider(oS.state.activeChain);return(await t?.sendTransaction({...e,caipNetwork:this.getCaipNetwork(),provider:r}))?.hash||""}return""},estimateGas:async e=>{if(e.chainNamespace===ec.CHAIN.EVM){let t=this.getAdapter(oS.state.activeChain),r=nx.getProvider(oS.state.activeChain),i=this.getCaipNetwork();if(!i)throw Error("CaipNetwork is undefined");return(await t?.estimateGas({...e,provider:r,caipNetwork:i}))?.gas||0n}return 0n},getEnsAvatar:async()=>(await this.getAdapter(oS.state.activeChain)?.getProfile({address:o$.state.address,chainId:Number(this.getCaipNetwork()?.id)}))?.profileImage||!1,getEnsAddress:async e=>{let t=this.getAdapter(oS.state.activeChain),r=this.getCaipNetwork();return r&&(await t?.getEnsAddress({name:e,caipNetwork:r}))?.address||!1},writeContract:async e=>{let t=this.getAdapter(oS.state.activeChain),r=this.getCaipNetwork(),i=this.getCaipAddress(),a=nx.getProvider(oS.state.activeChain);if(!r||!i)throw Error("CaipNetwork or CaipAddress is undefined");return(await t?.writeContract({...e,caipNetwork:r,provider:a,caipAddress:i}))?.hash},parseUnits:(e,t)=>this.getAdapter(oS.state.activeChain)?.parseUnits({value:e,decimals:t})??0n,formatUnits:(e,t)=>this.getAdapter(oS.state.activeChain)?.formatUnits({value:e,decimals:t})??"0",getCapabilities:async e=>await this.getAdapter(oS.state.activeChain)?.getCapabilities(e),grantPermissions:async e=>await this.getAdapter(oS.state.activeChain)?.grantPermissions(e),revokePermissions:async e=>{let t=this.getAdapter(oS.state.activeChain);return t?.revokePermissions?await t.revokePermissions(e):"0x"},walletGetAssets:async e=>await this.getAdapter(oS.state.activeChain)?.walletGetAssets(e)??{}},this.networkControllerClient={switchCaipNetwork:async e=>await this.switchCaipNetwork(e),getApprovedCaipNetworksData:async()=>this.getApprovedCaipNetworksData()},tc.setClient(this.connectionControllerClient)}getApprovedCaipNetworksData(){if(nx.getProviderId(oS.state.activeChain)===oH.CONNECTOR_TYPE_WALLET_CONNECT){let e=this.universalProvider?.session?.namespaces;return{supportsAllNetworks:this.universalProvider?.session?.peer?.metadata.name==="MetaMask Wallet",approvedCaipNetworkIds:this.getChainsFromNamespaces(e)}}return{supportsAllNetworks:!0,approvedCaipNetworkIds:[]}}async switchCaipNetwork(e){if(!e)return;let t=e.chainNamespace;if(this.getAddressByChainNamespace(e.chainNamespace)){let r=nx.getProvider(t),i=nx.getProviderId(t);if(e.chainNamespace===oS.state.activeChain)await this.getAdapter(t)?.switchNetwork({caipNetwork:e,provider:r,providerType:i});else if(this.setCaipNetwork(e),i===oH.CONNECTOR_TYPE_WALLET_CONNECT)this.syncWalletConnectAccount();else{let r=this.getAddressByChainNamespace(t);r&&this.syncAccount({address:r,chainId:e.id,chainNamespace:t})}}else this.setCaipNetwork(e)}getChainsFromNamespaces(e={}){return Object.values(e).flatMap(e=>Array.from(new Set([...e.chains||[],...e.accounts.map(e=>{let{chainId:t,chainNamespace:r}=eu.parseCaipAddress(e);return`${r}:${t}`})])))}createAdapters(e){return this.createClients(),this.chainNamespaces.reduce((t,r)=>{let i=e?.find(e=>e.namespace===r);return i?(i.construct({namespace:r,projectId:this.options?.projectId,networks:this.getCaipNetworks()}),t[r]=i):t[r]=new sq({namespace:r,networks:this.getCaipNetworks()}),t},{})}async initChainAdapter(e){this.onConnectors(e),this.listenAdapter(e),this.chainAdapters?.[e].syncConnectors(this.options,this),await this.createUniversalProviderForAdapter(e)}async initChainAdapters(){await Promise.all(this.chainNamespaces.map(async e=>{await this.initChainAdapter(e)}))}onConnectors(e){this.getAdapter(e)?.on("connectors",this.setConnectors.bind(this))}listenAdapter(e){let t=this.getAdapter(e);if(!t)return;let r=e$.getConnectionStatus();"connected"===r?this.setStatus("connecting",e):("disconnected"===r&&e$.clearAddressCache(),this.setStatus(r,e)),t.on("switchNetwork",({address:t,chainId:r})=>{let i=this.getCaipNetworks().find(e=>e.id===r||e.caipNetworkId===r),a=oS.state.activeChain===e,o=oS.getAccountProp("address",e);if(i){let r=a&&t?t:o;r&&this.syncAccount({address:r,chainId:i.id,chainNamespace:e})}else this.setUnsupportedNetwork(r)}),t.on("disconnect",this.disconnect.bind(this,e)),t.on("pendingTransactions",()=>{let e=o$.state.address,t=oS.state.activeCaipNetwork;e&&t?.id&&this.updateNativeBalance(e,t.id,t.chainNamespace)}),t.on("accountChanged",({address:t,chainId:r})=>{let i=oS.state.activeChain===e;i&&r?this.syncAccount({address:t,chainId:r,chainNamespace:e}):i&&oS.state.activeCaipNetwork?.id?this.syncAccount({address:t,chainId:oS.state.activeCaipNetwork?.id,chainNamespace:e}):this.syncAccountInfo(t,r,e)})}async createUniversalProviderForAdapter(e){await this.getUniversalProvider(),this.universalProvider&&this.chainAdapters?.[e]?.setUniversalProvider?.(this.universalProvider)}async syncExistingConnection(){await Promise.allSettled(this.chainNamespaces.map(e=>this.syncNamespaceConnection(e)))}async syncNamespaceConnection(e){try{let t=e7.getConnectorId(e);switch(this.setStatus("connecting",e),t){case ec.CONNECTOR_ID.WALLET_CONNECT:await this.syncWalletConnectAccount();break;case ec.CONNECTOR_ID.AUTH:break;default:await this.syncAdapterConnection(e)}}catch(t){console.warn("AppKit couldn't sync existing connection",t),this.setStatus("disconnected",e)}}async syncAdapterConnection(e){let t=this.getAdapter(e),r=e7.getConnectorId(e),i=this.getCaipNetwork(e),a=e7.getConnectors(e).find(e=>e.id===r);try{if(!t||!a)throw Error(`Adapter or connector not found for namespace ${e}`);if(!i?.id)throw Error("CaipNetwork not found");let r=await t?.syncConnection({namespace:e,id:a.id,chainId:i.id,rpcUrl:i?.rpcUrls?.default?.http?.[0]});if(r){let i=await t?.getAccounts({namespace:e,id:a.id});i&&i.accounts.length>0?this.setAllAccounts(i.accounts,e):this.setAllAccounts([eL.createAccount(e,r.address,"eoa")],e),this.syncProvider({...r,chainNamespace:e}),await this.syncAccount({...r,chainNamespace:e}),this.setStatus("connected",e)}else this.setStatus("disconnected",e)}catch{this.setStatus("disconnected",e)}}async syncWalletConnectAccount(){let e=this.chainNamespaces.map(async e=>{let t=this.getAdapter(e),r=this.universalProvider?.session?.namespaces?.[e]?.accounts||[],i=oS.state.activeCaipNetwork?.id,a=r.find(e=>{let{chainId:t}=eu.parseCaipAddress(e);return t===i?.toString()})||r[0];if(a){let r=eu.validateCaipAddress(a),{chainId:i,address:o}=eu.parseCaipAddress(r);if(nx.setProviderId(e,oH.CONNECTOR_TYPE_WALLET_CONNECT),this.caipNetworks&&oS.state.activeCaipNetwork&&t?.namespace!==ec.CHAIN.EVM){let r=t?.getWalletConnectProvider({caipNetworks:this.getCaipNetworks(),provider:this.universalProvider,activeCaipNetwork:oS.state.activeCaipNetwork});nx.setProvider(e,r)}else nx.setProvider(e,this.universalProvider);e7.setConnectorId(ec.CONNECTOR_ID.WALLET_CONNECT,e),e$.addConnectedNamespace(e),this.syncWalletConnectAccounts(e),await this.syncAccount({address:o,chainId:i,chainNamespace:e})}else this.setStatus("disconnected",e);await oS.setApprovedCaipNetworksData(e)});await Promise.all(e)}syncWalletConnectAccounts(e){let t=this.universalProvider?.session?.namespaces?.[e]?.accounts?.map(e=>{let{address:t}=eu.parseCaipAddress(e);return t}).filter((e,t,r)=>r.indexOf(e)===t);t&&this.setAllAccounts(t.map(t=>eL.createAccount(e,t,"bip122"===e?"payment":"eoa")),e)}syncProvider({type:e,provider:t,id:r,chainNamespace:i}){nx.setProviderId(i,e),nx.setProvider(i,t),e7.setConnectorId(r,i)}async syncAccount(e){let t=e.chainNamespace===oS.state.activeChain,r=oS.getCaipNetworkByNamespace(e.chainNamespace,e.chainId),{address:i,chainId:a,chainNamespace:o}=e,{chainId:n}=e$.getActiveNetworkProps(),s=a||n,l=oS.state.activeCaipNetwork?.name===ec.UNSUPPORTED_NETWORK_NAME,c=oS.getNetworkProp("supportsAllNetworks",o);if(this.setStatus("connected",o),!(l&&!c)&&s){let e=this.getCaipNetworks().find(e=>e.id.toString()===s.toString()),a=this.getCaipNetworks().find(e=>e.chainNamespace===o);if(!c&&!e&&!a){let t=this.getApprovedCaipNetworkIds()||[],r=t.find(e=>eu.parseCaipNetworkId(e)?.chainId===s.toString()),i=t.find(e=>eu.parseCaipNetworkId(e)?.chainNamespace===o);e=this.getCaipNetworks().find(e=>e.caipNetworkId===r),a=this.getCaipNetworks().find(e=>e.caipNetworkId===i||"deprecatedCaipNetworkId"in e&&e.deprecatedCaipNetworkId===i)}let n=e||a;n?.chainNamespace===oS.state.activeChain?eZ.state.enableNetworkSwitch&&!eZ.state.allowUnsupportedChain&&oS.state.activeCaipNetwork?.name===ec.UNSUPPORTED_NETWORK_NAME?oS.showUnsupportedChainUI():this.setCaipNetwork(n):t||r&&this.setCaipNetworkOfNamespace(r,o),this.syncConnectedWalletInfo(o),oq.isLowerCaseMatch(i,o$.state.address)||this.syncAccountInfo(i,n?.id,o),t?await this.syncBalance({address:i,chainId:n?.id,chainNamespace:o}):await this.syncBalance({address:i,chainId:r?.id,chainNamespace:o})}}async syncAccountInfo(e,t,r){let i=this.getCaipAddress(r),a=t||i?.split(":")[1];if(!a)return;let o=`${r}:${a}:${e}`;this.setCaipAddress(o,r),await this.syncIdentity({address:e,chainId:a,chainNamespace:r})}async syncReownName(e,t){try{let r=await this.getReownName(e);if(r[0]){let e=r[0];this.setProfileName(e.name,t)}else this.setProfileName(null,t)}catch{this.setProfileName(null,t)}}syncConnectedWalletInfo(e){let t=e7.getConnectorId(e),r=nx.getProviderId(e);if(r===oH.CONNECTOR_TYPE_ANNOUNCED||r===oH.CONNECTOR_TYPE_INJECTED){if(t){let r=this.getConnectors().find(e=>e.id===t);if(r){let{info:t,name:i,imageUrl:a}=r,o=a||this.getConnectorImage(r);this.setConnectedWalletInfo({name:i,icon:o,...t},e)}}}else if(r===oH.CONNECTOR_TYPE_WALLET_CONNECT){let t=nx.getProvider(e);t?.session&&this.setConnectedWalletInfo({...t.session.peer.metadata,name:t.session.peer.metadata.name,icon:t.session.peer.metadata.icons?.[0]},e)}else if(t){if(t===ec.CONNECTOR_ID.COINBASE){let t=this.getConnectors().find(e=>e.id===ec.CONNECTOR_ID.COINBASE);this.setConnectedWalletInfo({name:"Coinbase Wallet",icon:this.getConnectorImage(t)},e)}else this.setConnectedWalletInfo({name:t},e)}}async syncBalance(e){G.getNetworksByNamespace(this.getCaipNetworks(),e.chainNamespace).find(t=>t.id.toString()===e.chainId?.toString())&&e.chainId&&await this.updateNativeBalance(e.address,e.chainId,e.chainNamespace)}async updateNativeBalance(e,t,r){let i=this.getAdapter(r),a=oS.getCaipNetworkByNamespace(r,t);if(i){let o=await i.getBalance({address:e,chainId:t,caipNetwork:a,tokens:this.options.tokens});this.setBalance(o.balance,o.symbol,r)}}async initializeUniversalAdapter(){let e=nw.createLogger((e,...t)=>{e&&this.handleAlertError(e),console.error(...t)}),t={projectId:this.options?.projectId,metadata:{name:this.options?.metadata?this.options?.metadata.name:"",description:this.options?.metadata?this.options?.metadata.description:"",url:this.options?.metadata?this.options?.metadata.url:"",icons:this.options?.metadata?this.options?.metadata.icons:[""]},logger:e};eZ.setManualWCControl(!!this.options?.manualWCControl),this.universalProvider=this.options.universalProvider??await b.Z.init(t),this.listenWalletConnect()}listenWalletConnect(){this.universalProvider&&(this.universalProvider.on("display_uri",e=>{tc.setUri(e)}),this.universalProvider.on("connect",tc.finalizeWcConnection),this.universalProvider.on("disconnect",()=>{this.chainNamespaces.forEach(e=>{this.resetAccount(e)}),tc.resetWcConnection()}),this.universalProvider.on("chainChanged",e=>{let t=this.getCaipNetworks().find(t=>t.id==e),r=this.getCaipNetwork();if(!t){this.setUnsupportedNetwork(e);return}r?.id!==t?.id&&this.setCaipNetwork(t)}),this.universalProvider.on("session_event",e=>{if(sH.isSessionEventData(e)){let{name:t,data:r}=e.params.event;"accountsChanged"===t&&Array.isArray(r)&&eL.isCaipAddress(r[0])&&this.syncAccount(eu.parseCaipAddress(r[0]))}}))}createUniversalProvider(){return!this.universalProviderInitPromise&&eL.isClient()&&this.options?.projectId&&(this.universalProviderInitPromise=this.initializeUniversalAdapter()),this.universalProviderInitPromise}async getUniversalProvider(){if(!this.universalProvider)try{await this.createUniversalProvider()}catch(e){eJ.sendEvent({type:"error",event:"INTERNAL_SDK_ERROR",properties:{errorType:"UniversalProviderInitError",errorMessage:e instanceof Error?e.message:"Unknown",uncaught:!1}}),console.error("AppKit:getUniversalProvider - Cannot create provider",e)}return this.universalProvider}handleAlertError(e){let[t,r]=Object.entries(oG.UniversalProviderErrors).find(([,{message:t}])=>e.message.includes(t))??[],{message:i,alertErrorKey:a}=r??{};if(t&&i&&!this.reportedAlertErrors[t]){let e=oG.ALERT_ERRORS[a];e&&(eG.open(e,"error"),this.reportedAlertErrors[t]=!0)}}getAdapter(e){if(e)return this.chainAdapters?.[e]}createAdapter(e){if(!e)return;let t=e.namespace;t&&(this.createClients(),e.namespace=t,e.construct({namespace:t,projectId:this.options?.projectId,networks:this.getCaipNetworks()}),this.chainNamespaces.includes(t)||this.chainNamespaces.push(t),this.chainAdapters&&(this.chainAdapters[t]=e))}async open(e){return(await this.injectModalUi(),e?.uri&&tc.setUri(e.uri),e?.arguments&&e?.view==="Swap")?oB.open({...e,data:{swap:e.arguments}}):oB.open(e)}async close(){await this.injectModalUi(),oB.close()}setLoading(e,t){oB.setLoading(e,t)}async disconnect(e){await tc.disconnect(e)}getError(){return""}getChainId(){return oS.state.activeCaipNetwork?.id}async switchNetwork(e){let t=this.getCaipNetworks().find(t=>t.id===e.id);if(!t){eG.open(oG.ALERT_ERRORS.SWITCH_NETWORK_NOT_FOUND,"error");return}await oS.switchActiveNetwork(t)}getWalletProvider(){return oS.state.activeChain?nx.state.providers[oS.state.activeChain]:null}getWalletProviderType(){return nx.getProviderId(oS.state.activeChain)}subscribeProviders(e){return nx.subscribeProviders(e)}getThemeMode(){return e6.state.themeMode}getThemeVariables(){return e6.state.themeVariables}setThemeMode(e){e6.setThemeMode(e),s_(e6.state.themeMode)}setTermsConditionsUrl(e){eZ.setTermsConditionsUrl(e)}setPrivacyPolicyUrl(e){eZ.setPrivacyPolicyUrl(e)}setThemeVariables(e){var t;e6.setThemeVariables(e),t=e6.state.themeVariables,a&&o&&n&&(a.textContent=sT(t).core.cssText,o.textContent=sT(t).dark.cssText,n.textContent=sT(t).light.cssText)}subscribeTheme(e){return e6.subscribe(e)}getWalletInfo(){return o$.state.connectedWalletInfo}getAccount(e){let t=e7.getAuthConnector(e),r=oS.getAccountData(e),i=oS.state.activeChain;if(r)return{allAccounts:r.allAccounts,caipAddress:r.caipAddress,address:eL.getPlainAddress(r.caipAddress),isConnected:!!r.caipAddress,status:r.status,embeddedWalletInfo:t?{user:r.user?{...r.user,username:e$.getConnectedSocialUsername()}:void 0,authProvider:r.socialProvider||"email",accountType:r.preferredAccountTypes?.[e||i],isSmartAccountDeployed:!!r.smartAccountDeployed}:void 0}}subscribeAccount(e,t){let r=()=>{let r=this.getAccount(t);r&&e(r)};t?oS.subscribeChainProp("accountState",r,t):oS.subscribe(r),e7.subscribe(r)}subscribeNetwork(e){return oS.subscribe(({activeCaipNetwork:t})=>{e({caipNetwork:t,chainId:t?.id,caipNetworkId:t?.caipNetworkId})})}subscribeWalletInfo(e){return o$.subscribeKey("connectedWalletInfo",e)}subscribeShouldUpdateToAddress(e){o$.subscribeKey("shouldUpdateToAddress",e)}subscribeCaipNetworkChange(e){oS.subscribeKey("activeCaipNetwork",e)}getState(){return tu.state}subscribeState(e){return tu.subscribe(e)}showErrorMessage(e){ta.showError(e)}showSuccessMessage(e){ta.showSuccess(e)}getEvent(){return{...eJ.state}}subscribeEvents(e){return eJ.subscribe(e)}replace(e){e5.replace(e)}redirect(e){e5.push(e)}popTransactionStack(e){e5.popTransactionStack(e)}isOpen(){return oB.state.open}isTransactionStackEmpty(){return 0===e5.state.transactionStack.length}isTransactionShouldReplaceView(){return e5.state.transactionStack[e5.state.transactionStack.length-1]?.replace}static getInstance(){return this.instance}updateFeatures(e){eZ.setFeatures(e)}updateOptions(e){let t={...eZ.state||{},...e};eZ.setOptions(t)}setConnectMethodsOrder(e){eZ.setConnectMethodsOrder(e)}setWalletFeaturesOrder(e){eZ.setWalletFeaturesOrder(e)}setCollapseWallets(e){eZ.setCollapseWallets(e)}setSocialsOrder(e){eZ.setSocialsOrder(e)}getConnectMethodsOrder(){return nk.getConnectOrderMethod(eZ.state.features,e7.getConnectors())}addNetwork(e,t){if(this.chainAdapters&&!this.chainAdapters[e])throw Error(`Adapter for namespace ${e} doesn't exist`);let r=this.extendCaipNetwork(t,this.options);this.getCaipNetworks().find(e=>e.id===r.id)||oS.addNetwork(r)}removeNetwork(e,t){if(this.chainAdapters&&!this.chainAdapters[e])throw Error(`Adapter for namespace ${e} doesn't exist`);this.getCaipNetworks().find(e=>e.id===t)&&oS.removeNetwork(e,t)}}let sK=!1;class sY extends sG{async open(e){e7.isConnected()||await super.open(e)}async close(){await super.close(),this.options.manualWCControl&&tc.finalizeWcConnection()}async syncIdentity(e){return Promise.resolve()}async syncBalance(e){return Promise.resolve()}async injectModalUi(){if(!sK&&eL.isClient()){if(await Promise.resolve().then(function(){return uA}),await Promise.resolve().then(function(){return u7}),!document.querySelector("w3m-modal")){let e=document.createElement("w3m-modal");eZ.state.disableAppend||eZ.state.enableEmbedded||document.body.insertAdjacentElement("beforeend",e)}sK=!0}}}var sX=Object.freeze({__proto__:null,createAppKit:function(e){return new sY({...e,basic:!0,sdkVersion:"html-core-1.7.3"})},AppKit:sY}),sJ=Object.defineProperty,sQ=Object.defineProperties,s0=Object.getOwnPropertyDescriptors,s1=Object.getOwnPropertySymbols,s2=Object.prototype.hasOwnProperty,s3=Object.prototype.propertyIsEnumerable,s5=(e,t,r)=>t in e?sJ(e,t,{enumerable:!0,configurable:!0,writable:!0,value:r}):e[t]=r,s4=(e,t)=>{for(var r in t||(t={}))s2.call(t,r)&&s5(e,r,t[r]);if(s1)for(var r of s1(t))s3.call(t,r)&&s5(e,r,t[r]);return e},s6=(e,t)=>sQ(e,s0(t));let s8=e=>{let[t,r]=e.split(":");return sz({id:r,caipNetworkId:e,chainNamespace:t,name:"",nativeCurrency:{name:"",symbol:"",decimals:8},rpcUrls:{default:{http:["https://rpc.walletconnect.org/v1"]}}})};var s9=Object.freeze({__proto__:null,convertWCMToAppKitOptions:function(e){var t,r,i,a,o,n,s;let l=null==(t=e.chains)?void 0:t.map(s8).filter(Boolean);if(0===l.length)throw Error("At least one chain must be specified");let c=l.find(t=>{var r;return t.id===(null==(r=e.defaultChain)?void 0:r.id)}),d={projectId:e.projectId,networks:l,themeMode:e.themeMode,themeVariables:function(e){if(e)return{"--w3m-font-family":e["--wcm-font-family"],"--w3m-accent":e["--wcm-accent-color"],"--w3m-color-mix":e["--wcm-background-color"],"--w3m-z-index":e["--wcm-z-index"]?Number(e["--wcm-z-index"]):void 0,"--w3m-qr-color":e["--wcm-accent-color"],"--w3m-font-size-master":e["--wcm-text-medium-regular-size"],"--w3m-border-radius-master":e["--wcm-container-border-radius"],"--w3m-color-mix-strength":0}}(e.themeVariables),chainImages:e.chainImages,connectorImages:e.walletImages,defaultNetwork:c,metadata:s6(s4({},e.metadata),{name:(null==(r=e.metadata)?void 0:r.name)||"WalletConnect",description:(null==(i=e.metadata)?void 0:i.description)||"Connect to WalletConnect-compatible wallets",url:(null==(a=e.metadata)?void 0:a.url)||"https://walletconnect.org",icons:(null==(o=e.metadata)?void 0:o.icons)||["https://walletconnect.org/walletconnect-logo.png"]}),showWallets:!0,featuredWalletIds:"NONE"===e.explorerRecommendedWalletIds?[]:Array.isArray(e.explorerRecommendedWalletIds)?e.explorerRecommendedWalletIds:[],excludeWalletIds:"ALL"===e.explorerExcludedWalletIds?[]:Array.isArray(e.explorerExcludedWalletIds)?e.explorerExcludedWalletIds:[],enableEIP6963:!1,enableInjected:!1,enableCoinbase:!0,enableWalletConnect:!0,features:{email:!1,socials:!1}};if(null!=(n=e.mobileWallets)&&n.length||null!=(s=e.desktopWallets)&&s.length){let t=[...(e.mobileWallets||[]).map(e=>({id:e.id,name:e.name,links:e.links})),...(e.desktopWallets||[]).map(e=>({id:e.id,name:e.name,links:{native:e.links.native,universal:e.links.universal}}))],r=[...d.featuredWalletIds||[],...d.excludeWalletIds||[]],i=t.filter(e=>!r.includes(e.id));i.length&&(d.customWallets=i)}return d}});let s7={attribute:!0,type:String,converter:nZ,reflect:!1,hasChanged:nq},le=(e=s7,t,r)=>{let{kind:i,metadata:a}=r,o=globalThis.litPropertyMetadata.get(a);if(void 0===o&&globalThis.litPropertyMetadata.set(a,o=new Map),"setter"===i&&((e=Object.create(e)).wrapped=!0),o.set(r.name,e),"accessor"===i){let{name:i}=r;return{set(r){let a=t.get.call(this);t.set.call(this,r),this.requestUpdate(i,a,e)},init(t){return void 0!==t&&this.C(i,void 0,e,t),t}}}if("setter"===i){let{name:i}=r;return function(r){let a=this[i];t.call(this,r),this.requestUpdate(i,a,e)}}throw Error("Unsupported decorator location: "+i)};function lt(e){return(t,r)=>"object"==typeof r?le(e,t,r):((e,t,r)=>{let i=t.hasOwnProperty(r);return t.constructor.createProperty(r,e),i?Object.getOwnPropertyDescriptor(t,r):void 0})(e,t,r)}function lr(e){return lt({...e,state:!0,attribute:!1})}var li=nP`
  :host {
    display: flex;
    width: inherit;
    height: inherit;
  }
`,la=function(e,t,r,i){var a,o=arguments.length,n=o<3?t:null===i?i=Object.getOwnPropertyDescriptor(t,r):i;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)n=Reflect.decorate(e,t,r,i);else for(var s=e.length-1;s>=0;s--)(a=e[s])&&(n=(o<3?a(n):o>3?a(t,r,n):a(t,r))||n);return o>3&&n&&Object.defineProperty(t,r,n),n};let lo=class extends sI{render(){return this.style.cssText=`
      flex-direction: ${this.flexDirection};
      flex-wrap: ${this.flexWrap};
      flex-basis: ${this.flexBasis};
      flex-grow: ${this.flexGrow};
      flex-shrink: ${this.flexShrink};
      align-items: ${this.alignItems};
      justify-content: ${this.justifyContent};
      column-gap: ${this.columnGap&&`var(--wui-spacing-${this.columnGap})`};
      row-gap: ${this.rowGap&&`var(--wui-spacing-${this.rowGap})`};
      gap: ${this.gap&&`var(--wui-spacing-${this.gap})`};
      padding-top: ${this.padding&&s$.getSpacingStyles(this.padding,0)};
      padding-right: ${this.padding&&s$.getSpacingStyles(this.padding,1)};
      padding-bottom: ${this.padding&&s$.getSpacingStyles(this.padding,2)};
      padding-left: ${this.padding&&s$.getSpacingStyles(this.padding,3)};
      margin-top: ${this.margin&&s$.getSpacingStyles(this.margin,0)};
      margin-right: ${this.margin&&s$.getSpacingStyles(this.margin,1)};
      margin-bottom: ${this.margin&&s$.getSpacingStyles(this.margin,2)};
      margin-left: ${this.margin&&s$.getSpacingStyles(this.margin,3)};
    `,ss`<slot></slot>`}};lo.styles=[sO,li],la([lt()],lo.prototype,"flexDirection",void 0),la([lt()],lo.prototype,"flexWrap",void 0),la([lt()],lo.prototype,"flexBasis",void 0),la([lt()],lo.prototype,"flexGrow",void 0),la([lt()],lo.prototype,"flexShrink",void 0),la([lt()],lo.prototype,"alignItems",void 0),la([lt()],lo.prototype,"justifyContent",void 0),la([lt()],lo.prototype,"columnGap",void 0),la([lt()],lo.prototype,"rowGap",void 0),la([lt()],lo.prototype,"gap",void 0),la([lt()],lo.prototype,"padding",void 0),la([lt()],lo.prototype,"margin",void 0),lo=la([sL("wui-flex")],lo);let ln=e=>e??sd,ls=e=>null===e||"object"!=typeof e&&"function"!=typeof e,ll=e=>void 0===e.strings,lc=e=>(...t)=>({_$litDirective$:e,values:t});class ld{constructor(e){}get _$AU(){return this._$AM._$AU}_$AT(e,t,r){this._$Ct=e,this._$AM=t,this._$Ci=r}_$AS(e,t){return this.update(e,t)}update(e,t){return this.render(...t)}}let lu=(e,t)=>{let r=e._$AN;if(void 0===r)return!1;for(let e of r)e._$AO?.(t,!1),lu(e,t);return!0},lh=e=>{let t,r;do{if(void 0===(t=e._$AM))break;(r=t._$AN).delete(e),e=t}while(r?.size===0)},lp=e=>{for(let t;t=e._$AM;e=t){let r=t._$AN;if(void 0===r)t._$AN=r=new Set;else if(r.has(e))break;r.add(e),lw(t)}};function lg(e){void 0!==this._$AN?(lh(this),this._$AM=e,lp(this)):this._$AM=e}function lf(e,t=!1,r=0){let i=this._$AH,a=this._$AN;if(void 0!==a&&0!==a.size){if(t){if(Array.isArray(i))for(let e=r;e<i.length;e++)lu(i[e],!1),lh(i[e]);else null!=i&&(lu(i,!1),lh(i))}else lu(this,e)}}let lw=e=>{2==e.type&&(e._$AP??=lf,e._$AQ??=lg)};class lm extends ld{constructor(){super(...arguments),this._$AN=void 0}_$AT(e,t,r){super._$AT(e,t,r),lp(this),this.isConnected=e._$AU}_$AO(e,t=!0){e!==this.isConnected&&(this.isConnected=e,e?this.reconnected?.():this.disconnected?.()),t&&(lu(this,e),lh(this))}setValue(e){if(ll(this._$Ct))this._$Ct._$AI(e,this);else{let t=[...this._$Ct._$AH];t[this._$Ci]=e,this._$Ct._$AI(t,this,0)}}disconnected(){}reconnected(){}}class lv{constructor(e){this.G=e}disconnect(){this.G=void 0}reconnect(e){this.G=e}deref(){return this.G}}class lb{constructor(){this.Y=void 0,this.Z=void 0}get(){return this.Y}pause(){this.Y??=new Promise(e=>this.Z=e)}resume(){this.Z?.(),this.Y=this.Z=void 0}}let ly=e=>!ls(e)&&"function"==typeof e.then;class lC extends lm{constructor(){super(...arguments),this._$Cwt=1073741823,this._$Cbt=[],this._$CK=new lv(this),this._$CX=new lb}render(...e){return e.find(e=>!ly(e))??sc}update(e,t){let r=this._$Cbt,i=r.length;this._$Cbt=t;let a=this._$CK,o=this._$CX;this.isConnected||this.disconnected();for(let e=0;e<t.length&&!(e>this._$Cwt);e++){let n=t[e];if(!ly(n))return this._$Cwt=e,n;e<i&&n===r[e]||(this._$Cwt=1073741823,i=0,Promise.resolve(n).then(async e=>{for(;o.get();)await o.get();let t=a.deref();if(void 0!==t){let r=t._$Cbt.indexOf(n);r>-1&&r<t._$Cwt&&(t._$Cwt=r,t.setValue(e))}}))}return sc}disconnected(){this._$CK.disconnect(),this._$CX.pause()}reconnected(){this._$CK.reconnect(this),this._$CX.resume()}}let lx=lc(lC);class lE{constructor(){this.cache=new Map}set(e,t){this.cache.set(e,t)}get(e){return this.cache.get(e)}has(e){return this.cache.has(e)}delete(e){this.cache.delete(e)}clear(){this.cache.clear()}}let lk=new lE;var lA=nP`
  :host {
    display: flex;
    aspect-ratio: var(--local-aspect-ratio);
    color: var(--local-color);
    width: var(--local-width);
  }

  svg {
    width: inherit;
    height: inherit;
    object-fit: contain;
    object-position: center;
  }

  .fallback {
    width: var(--local-width);
    height: var(--local-height);
  }
`,lN=function(e,t,r,i){var a,o=arguments.length,n=o<3?t:null===i?i=Object.getOwnPropertyDescriptor(t,r):i;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)n=Reflect.decorate(e,t,r,i);else for(var s=e.length-1;s>=0;s--)(a=e[s])&&(n=(o<3?a(n):o>3?a(t,r,n):a(t,r))||n);return o>3&&n&&Object.defineProperty(t,r,n),n};let lI={add:async()=>(await Promise.resolve().then(function(){return he})).addSvg,allWallets:async()=>(await Promise.resolve().then(function(){return ht})).allWalletsSvg,arrowBottomCircle:async()=>(await Promise.resolve().then(function(){return hr})).arrowBottomCircleSvg,appStore:async()=>(await Promise.resolve().then(function(){return hi})).appStoreSvg,apple:async()=>(await Promise.resolve().then(function(){return ha})).appleSvg,arrowBottom:async()=>(await Promise.resolve().then(function(){return ho})).arrowBottomSvg,arrowLeft:async()=>(await Promise.resolve().then(function(){return hn})).arrowLeftSvg,arrowRight:async()=>(await Promise.resolve().then(function(){return hs})).arrowRightSvg,arrowTop:async()=>(await Promise.resolve().then(function(){return hl})).arrowTopSvg,bank:async()=>(await Promise.resolve().then(function(){return hc})).bankSvg,browser:async()=>(await Promise.resolve().then(function(){return hd})).browserSvg,card:async()=>(await Promise.resolve().then(function(){return hu})).cardSvg,checkmark:async()=>(await Promise.resolve().then(function(){return hh})).checkmarkSvg,checkmarkBold:async()=>(await Promise.resolve().then(function(){return hp})).checkmarkBoldSvg,chevronBottom:async()=>(await Promise.resolve().then(function(){return hg})).chevronBottomSvg,chevronLeft:async()=>(await Promise.resolve().then(function(){return hf})).chevronLeftSvg,chevronRight:async()=>(await Promise.resolve().then(function(){return hw})).chevronRightSvg,chevronTop:async()=>(await Promise.resolve().then(function(){return hm})).chevronTopSvg,chromeStore:async()=>(await Promise.resolve().then(function(){return hv})).chromeStoreSvg,clock:async()=>(await Promise.resolve().then(function(){return hb})).clockSvg,close:async()=>(await Promise.resolve().then(function(){return hy})).closeSvg,compass:async()=>(await Promise.resolve().then(function(){return hC})).compassSvg,coinPlaceholder:async()=>(await Promise.resolve().then(function(){return hx})).coinPlaceholderSvg,copy:async()=>(await Promise.resolve().then(function(){return hE})).copySvg,cursor:async()=>(await Promise.resolve().then(function(){return hk})).cursorSvg,cursorTransparent:async()=>(await Promise.resolve().then(function(){return hA})).cursorTransparentSvg,desktop:async()=>(await Promise.resolve().then(function(){return hN})).desktopSvg,disconnect:async()=>(await Promise.resolve().then(function(){return hI})).disconnectSvg,discord:async()=>(await Promise.resolve().then(function(){return hS})).discordSvg,etherscan:async()=>(await Promise.resolve().then(function(){return h_})).etherscanSvg,extension:async()=>(await Promise.resolve().then(function(){return hT})).extensionSvg,externalLink:async()=>(await Promise.resolve().then(function(){return hO})).externalLinkSvg,facebook:async()=>(await Promise.resolve().then(function(){return hP})).facebookSvg,farcaster:async()=>(await Promise.resolve().then(function(){return hR})).farcasterSvg,filters:async()=>(await Promise.resolve().then(function(){return h$})).filtersSvg,github:async()=>(await Promise.resolve().then(function(){return hL})).githubSvg,google:async()=>(await Promise.resolve().then(function(){return hB})).googleSvg,helpCircle:async()=>(await Promise.resolve().then(function(){return hM})).helpCircleSvg,image:async()=>(await Promise.resolve().then(function(){return hU})).imageSvg,id:async()=>(await Promise.resolve().then(function(){return hz})).idSvg,infoCircle:async()=>(await Promise.resolve().then(function(){return hD})).infoCircleSvg,lightbulb:async()=>(await Promise.resolve().then(function(){return hj})).lightbulbSvg,mail:async()=>(await Promise.resolve().then(function(){return hW})).mailSvg,mobile:async()=>(await Promise.resolve().then(function(){return hH})).mobileSvg,more:async()=>(await Promise.resolve().then(function(){return hF})).moreSvg,networkPlaceholder:async()=>(await Promise.resolve().then(function(){return hV})).networkPlaceholderSvg,nftPlaceholder:async()=>(await Promise.resolve().then(function(){return hZ})).nftPlaceholderSvg,off:async()=>(await Promise.resolve().then(function(){return hq})).offSvg,playStore:async()=>(await Promise.resolve().then(function(){return hG})).playStoreSvg,plus:async()=>(await Promise.resolve().then(function(){return hK})).plusSvg,qrCode:async()=>(await Promise.resolve().then(function(){return hY})).qrCodeIcon,recycleHorizontal:async()=>(await Promise.resolve().then(function(){return hX})).recycleHorizontalSvg,refresh:async()=>(await Promise.resolve().then(function(){return hJ})).refreshSvg,search:async()=>(await Promise.resolve().then(function(){return hQ})).searchSvg,send:async()=>(await Promise.resolve().then(function(){return h0})).sendSvg,swapHorizontal:async()=>(await Promise.resolve().then(function(){return h1})).swapHorizontalSvg,swapHorizontalMedium:async()=>(await Promise.resolve().then(function(){return h2})).swapHorizontalMediumSvg,swapHorizontalBold:async()=>(await Promise.resolve().then(function(){return h3})).swapHorizontalBoldSvg,swapHorizontalRoundedBold:async()=>(await Promise.resolve().then(function(){return h5})).swapHorizontalRoundedBoldSvg,swapVertical:async()=>(await Promise.resolve().then(function(){return h4})).swapVerticalSvg,telegram:async()=>(await Promise.resolve().then(function(){return h6})).telegramSvg,threeDots:async()=>(await Promise.resolve().then(function(){return h8})).threeDotsSvg,twitch:async()=>(await Promise.resolve().then(function(){return h9})).twitchSvg,twitter:async()=>(await Promise.resolve().then(function(){return h7})).xSvg,twitterIcon:async()=>(await Promise.resolve().then(function(){return pe})).twitterIconSvg,verify:async()=>(await Promise.resolve().then(function(){return pt})).verifySvg,verifyFilled:async()=>(await Promise.resolve().then(function(){return pr})).verifyFilledSvg,wallet:async()=>(await Promise.resolve().then(function(){return pi})).walletSvg,walletConnect:async()=>(await Promise.resolve().then(function(){return pa})).walletConnectSvg,walletConnectLightBrown:async()=>(await Promise.resolve().then(function(){return pa})).walletConnectLightBrownSvg,walletConnectBrown:async()=>(await Promise.resolve().then(function(){return pa})).walletConnectBrownSvg,walletPlaceholder:async()=>(await Promise.resolve().then(function(){return po})).walletPlaceholderSvg,warningCircle:async()=>(await Promise.resolve().then(function(){return pn})).warningCircleSvg,x:async()=>(await Promise.resolve().then(function(){return h7})).xSvg,info:async()=>(await Promise.resolve().then(function(){return ps})).infoSvg,exclamationTriangle:async()=>(await Promise.resolve().then(function(){return pl})).exclamationTriangleSvg,reown:async()=>(await Promise.resolve().then(function(){return pc})).reownSvg};async function lS(e){if(lk.has(e))return lk.get(e);let t=(lI[e]??lI.copy)();return lk.set(e,t),t}let l_=class extends sI{constructor(){super(...arguments),this.size="md",this.name="copy",this.color="fg-300",this.aspectRatio="1 / 1"}render(){return this.style.cssText=`
      --local-color: var(--wui-color-${this.color});
      --local-width: var(--wui-icon-size-${this.size});
      --local-aspect-ratio: ${this.aspectRatio}
    `,ss`${lx(lS(this.name),ss`<div class="fallback"></div>`)}`}};l_.styles=[sO,sR,lA],lN([lt()],l_.prototype,"size",void 0),lN([lt()],l_.prototype,"name",void 0),lN([lt()],l_.prototype,"color",void 0),lN([lt()],l_.prototype,"aspectRatio",void 0),l_=lN([sL("wui-icon")],l_);let lT=lc(class extends ld{constructor(e){if(super(e),1!==e.type||"class"!==e.name||e.strings?.length>2)throw Error("`classMap()` can only be used in the `class` attribute and must be the only part in the attribute.")}render(e){return" "+Object.keys(e).filter(t=>e[t]).join(" ")+" "}update(e,[t]){if(void 0===this.st){for(let r in this.st=new Set,void 0!==e.strings&&(this.nt=new Set(e.strings.join(" ").split(/\s/).filter(e=>""!==e))),t)t[r]&&!this.nt?.has(r)&&this.st.add(r);return this.render(t)}let r=e.element.classList;for(let e of this.st)e in t||(r.remove(e),this.st.delete(e));for(let e in t){let i=!!t[e];i===this.st.has(e)||this.nt?.has(e)||(i?(r.add(e),this.st.add(e)):(r.remove(e),this.st.delete(e)))}return sc}});var lO=nP`
  :host {
    display: inline-flex !important;
  }

  slot {
    width: 100%;
    display: inline-block;
    font-style: normal;
    font-family: var(--wui-font-family);
    font-feature-settings:
      'tnum' on,
      'lnum' on,
      'case' on;
    line-height: 130%;
    font-weight: var(--wui-font-weight-regular);
    overflow: inherit;
    text-overflow: inherit;
    text-align: var(--local-align);
    color: var(--local-color);
  }

  .wui-line-clamp-1 {
    overflow: hidden;
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 1;
  }

  .wui-line-clamp-2 {
    overflow: hidden;
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 2;
  }

  .wui-font-medium-400 {
    font-size: var(--wui-font-size-medium);
    font-weight: var(--wui-font-weight-light);
    letter-spacing: var(--wui-letter-spacing-medium);
  }

  .wui-font-medium-600 {
    font-size: var(--wui-font-size-medium);
    letter-spacing: var(--wui-letter-spacing-medium);
  }

  .wui-font-title-600 {
    font-size: var(--wui-font-size-title);
    letter-spacing: var(--wui-letter-spacing-title);
  }

  .wui-font-title-6-600 {
    font-size: var(--wui-font-size-title-6);
    letter-spacing: var(--wui-letter-spacing-title-6);
  }

  .wui-font-mini-700 {
    font-size: var(--wui-font-size-mini);
    letter-spacing: var(--wui-letter-spacing-mini);
    text-transform: uppercase;
  }

  .wui-font-large-500,
  .wui-font-large-600,
  .wui-font-large-700 {
    font-size: var(--wui-font-size-large);
    letter-spacing: var(--wui-letter-spacing-large);
  }

  .wui-font-2xl-500,
  .wui-font-2xl-600,
  .wui-font-2xl-700 {
    font-size: var(--wui-font-size-2xl);
    letter-spacing: var(--wui-letter-spacing-2xl);
  }

  .wui-font-paragraph-400,
  .wui-font-paragraph-500,
  .wui-font-paragraph-600,
  .wui-font-paragraph-700 {
    font-size: var(--wui-font-size-paragraph);
    letter-spacing: var(--wui-letter-spacing-paragraph);
  }

  .wui-font-small-400,
  .wui-font-small-500,
  .wui-font-small-600 {
    font-size: var(--wui-font-size-small);
    letter-spacing: var(--wui-letter-spacing-small);
  }

  .wui-font-tiny-400,
  .wui-font-tiny-500,
  .wui-font-tiny-600 {
    font-size: var(--wui-font-size-tiny);
    letter-spacing: var(--wui-letter-spacing-tiny);
  }

  .wui-font-micro-700,
  .wui-font-micro-600 {
    font-size: var(--wui-font-size-micro);
    letter-spacing: var(--wui-letter-spacing-micro);
    text-transform: uppercase;
  }

  .wui-font-tiny-400,
  .wui-font-small-400,
  .wui-font-medium-400,
  .wui-font-paragraph-400 {
    font-weight: var(--wui-font-weight-light);
  }

  .wui-font-large-700,
  .wui-font-paragraph-700,
  .wui-font-micro-700,
  .wui-font-mini-700 {
    font-weight: var(--wui-font-weight-bold);
  }

  .wui-font-medium-600,
  .wui-font-medium-title-600,
  .wui-font-title-6-600,
  .wui-font-large-600,
  .wui-font-paragraph-600,
  .wui-font-small-600,
  .wui-font-tiny-600,
  .wui-font-micro-600 {
    font-weight: var(--wui-font-weight-medium);
  }

  :host([disabled]) {
    opacity: 0.4;
  }
`,lP=function(e,t,r,i){var a,o=arguments.length,n=o<3?t:null===i?i=Object.getOwnPropertyDescriptor(t,r):i;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)n=Reflect.decorate(e,t,r,i);else for(var s=e.length-1;s>=0;s--)(a=e[s])&&(n=(o<3?a(n):o>3?a(t,r,n):a(t,r))||n);return o>3&&n&&Object.defineProperty(t,r,n),n};let lR=class extends sI{constructor(){super(...arguments),this.variant="paragraph-500",this.color="fg-300",this.align="left",this.lineClamp=void 0}render(){let e={[`wui-font-${this.variant}`]:!0,[`wui-color-${this.color}`]:!0,[`wui-line-clamp-${this.lineClamp}`]:!!this.lineClamp};return this.style.cssText=`
      --local-align: ${this.align};
      --local-color: var(--wui-color-${this.color});
    `,ss`<slot class=${lT(e)}></slot>`}};lR.styles=[sO,lO],lP([lt()],lR.prototype,"variant",void 0),lP([lt()],lR.prototype,"color",void 0),lP([lt()],lR.prototype,"align",void 0),lP([lt()],lR.prototype,"lineClamp",void 0),lR=lP([sL("wui-text")],lR);var l$=nP`
  :host {
    display: inline-flex;
    justify-content: center;
    align-items: center;
    position: relative;
    overflow: hidden;
    background-color: var(--wui-color-gray-glass-020);
    border-radius: var(--local-border-radius);
    border: var(--local-border);
    box-sizing: content-box;
    width: var(--local-size);
    height: var(--local-size);
    min-height: var(--local-size);
    min-width: var(--local-size);
  }

  @supports (background: color-mix(in srgb, white 50%, black)) {
    :host {
      background-color: color-mix(in srgb, var(--local-bg-value) var(--local-bg-mix), transparent);
    }
  }
`,lL=function(e,t,r,i){var a,o=arguments.length,n=o<3?t:null===i?i=Object.getOwnPropertyDescriptor(t,r):i;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)n=Reflect.decorate(e,t,r,i);else for(var s=e.length-1;s>=0;s--)(a=e[s])&&(n=(o<3?a(n):o>3?a(t,r,n):a(t,r))||n);return o>3&&n&&Object.defineProperty(t,r,n),n};let lB=class extends sI{constructor(){super(...arguments),this.size="md",this.backgroundColor="accent-100",this.iconColor="accent-100",this.background="transparent",this.border=!1,this.borderColor="wui-color-bg-125",this.icon="copy"}render(){let e=this.iconSize||this.size,t="lg"===this.size,r="xl"===this.size,i="gray"===this.background,a="opaque"===this.background,o="accent-100"===this.backgroundColor&&a||"success-100"===this.backgroundColor&&a||"error-100"===this.backgroundColor&&a||"inverse-100"===this.backgroundColor&&a,n=`var(--wui-color-${this.backgroundColor})`;return o?n=`var(--wui-icon-box-bg-${this.backgroundColor})`:i&&(n=`var(--wui-color-gray-${this.backgroundColor})`),this.style.cssText=`
       --local-bg-value: ${n};
       --local-bg-mix: ${o||i?"100%":t?"12%":"16%"};
       --local-border-radius: var(--wui-border-radius-${t?"xxs":r?"s":"3xl"});
       --local-size: var(--wui-icon-box-size-${this.size});
       --local-border: ${"wui-color-bg-125"===this.borderColor?"2px":"1px"} solid ${this.border?`var(--${this.borderColor})`:"transparent"}
   `,ss` <wui-icon color=${this.iconColor} size=${e} name=${this.icon}></wui-icon> `}};lB.styles=[sO,sP,l$],lL([lt()],lB.prototype,"size",void 0),lL([lt()],lB.prototype,"backgroundColor",void 0),lL([lt()],lB.prototype,"iconColor",void 0),lL([lt()],lB.prototype,"iconSize",void 0),lL([lt()],lB.prototype,"background",void 0),lL([lt({type:Boolean})],lB.prototype,"border",void 0),lL([lt()],lB.prototype,"borderColor",void 0),lL([lt()],lB.prototype,"icon",void 0),lB=lL([sL("wui-icon-box")],lB);var lM=nP`
  :host {
    display: block;
    width: var(--local-width);
    height: var(--local-height);
  }

  img {
    display: block;
    width: 100%;
    height: 100%;
    object-fit: cover;
    object-position: center center;
    border-radius: inherit;
  }
`,lU=function(e,t,r,i){var a,o=arguments.length,n=o<3?t:null===i?i=Object.getOwnPropertyDescriptor(t,r):i;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)n=Reflect.decorate(e,t,r,i);else for(var s=e.length-1;s>=0;s--)(a=e[s])&&(n=(o<3?a(n):o>3?a(t,r,n):a(t,r))||n);return o>3&&n&&Object.defineProperty(t,r,n),n};let lz=class extends sI{constructor(){super(...arguments),this.src="./path/to/image.jpg",this.alt="Image",this.size=void 0}render(){return this.style.cssText=`
      --local-width: ${this.size?`var(--wui-icon-size-${this.size});`:"100%"};
      --local-height: ${this.size?`var(--wui-icon-size-${this.size});`:"100%"};
      `,ss`<img src=${this.src} alt=${this.alt} @error=${this.handleImageError} />`}handleImageError(){this.dispatchEvent(new CustomEvent("onLoadError",{bubbles:!0,composed:!0}))}};lz.styles=[sO,sR,lM],lU([lt()],lz.prototype,"src",void 0),lU([lt()],lz.prototype,"alt",void 0),lU([lt()],lz.prototype,"size",void 0),lz=lU([sL("wui-image")],lz);var lD=nP`
  :host {
    position: relative;
    background-color: var(--wui-color-gray-glass-002);
    display: flex;
    justify-content: center;
    align-items: center;
    width: var(--local-size);
    height: var(--local-size);
    border-radius: inherit;
    border-radius: var(--local-border-radius);
  }

  :host > wui-flex {
    overflow: hidden;
    border-radius: inherit;
    border-radius: var(--local-border-radius);
  }

  :host::after {
    content: '';
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    border-radius: inherit;
    border: 1px solid var(--wui-color-gray-glass-010);
    pointer-events: none;
  }

  :host([name='Extension'])::after {
    border: 1px solid var(--wui-color-accent-glass-010);
  }

  :host([data-wallet-icon='allWallets']) {
    background-color: var(--wui-all-wallets-bg-100);
  }

  :host([data-wallet-icon='allWallets'])::after {
    border: 1px solid var(--wui-color-accent-glass-010);
  }

  wui-icon[data-parent-size='inherit'] {
    width: 75%;
    height: 75%;
    align-items: center;
  }

  wui-icon[data-parent-size='sm'] {
    width: 18px;
    height: 18px;
  }

  wui-icon[data-parent-size='md'] {
    width: 24px;
    height: 24px;
  }

  wui-icon[data-parent-size='lg'] {
    width: 42px;
    height: 42px;
  }

  wui-icon[data-parent-size='full'] {
    width: 100%;
    height: 100%;
  }

  :host > wui-icon-box {
    position: absolute;
    overflow: hidden;
    right: -1px;
    bottom: -2px;
    z-index: 1;
    border: 2px solid var(--wui-color-bg-150, #1e1f1f);
    padding: 1px;
  }
`,lj=function(e,t,r,i){var a,o=arguments.length,n=o<3?t:null===i?i=Object.getOwnPropertyDescriptor(t,r):i;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)n=Reflect.decorate(e,t,r,i);else for(var s=e.length-1;s>=0;s--)(a=e[s])&&(n=(o<3?a(n):o>3?a(t,r,n):a(t,r))||n);return o>3&&n&&Object.defineProperty(t,r,n),n};let lW=class extends sI{constructor(){super(...arguments),this.size="md",this.name="",this.installed=!1,this.badgeSize="xs"}render(){let e="xxs";return e="lg"===this.size?"m":"md"===this.size?"xs":"xxs",this.style.cssText=`
       --local-border-radius: var(--wui-border-radius-${e});
       --local-size: var(--wui-wallet-image-size-${this.size});
   `,this.walletIcon&&(this.dataset.walletIcon=this.walletIcon),ss`
      <wui-flex justifyContent="center" alignItems="center"> ${this.templateVisual()} </wui-flex>
    `}templateVisual(){return this.imageSrc?ss`<wui-image src=${this.imageSrc} alt=${this.name}></wui-image>`:this.walletIcon?ss`<wui-icon
        data-parent-size="md"
        size="md"
        color="inherit"
        name=${this.walletIcon}
      ></wui-icon>`:ss`<wui-icon
      data-parent-size=${this.size}
      size="inherit"
      color="inherit"
      name="walletPlaceholder"
    ></wui-icon>`}};lW.styles=[sP,sO,lD],lj([lt()],lW.prototype,"size",void 0),lj([lt()],lW.prototype,"name",void 0),lj([lt()],lW.prototype,"imageSrc",void 0),lj([lt()],lW.prototype,"walletIcon",void 0),lj([lt({type:Boolean})],lW.prototype,"installed",void 0),lj([lt()],lW.prototype,"badgeSize",void 0),lW=lj([sL("wui-wallet-image")],lW);var lH=nP`
  :host {
    position: relative;
    border-radius: var(--wui-border-radius-xxs);
    width: 40px;
    height: 40px;
    overflow: hidden;
    background: var(--wui-color-gray-glass-002);
    display: flex;
    justify-content: center;
    align-items: center;
    flex-wrap: wrap;
    gap: var(--wui-spacing-4xs);
    padding: 3.75px !important;
  }

  :host::after {
    content: '';
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    border-radius: inherit;
    border: 1px solid var(--wui-color-gray-glass-010);
    pointer-events: none;
  }

  :host > wui-wallet-image {
    width: 14px;
    height: 14px;
    border-radius: var(--wui-border-radius-5xs);
  }

  :host > wui-flex {
    padding: 2px;
    position: fixed;
    overflow: hidden;
    left: 34px;
    bottom: 8px;
    background: var(--dark-background-150, #1e1f1f);
    border-radius: 50%;
    z-index: 2;
    display: flex;
  }
`,lF=function(e,t,r,i){var a,o=arguments.length,n=o<3?t:null===i?i=Object.getOwnPropertyDescriptor(t,r):i;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)n=Reflect.decorate(e,t,r,i);else for(var s=e.length-1;s>=0;s--)(a=e[s])&&(n=(o<3?a(n):o>3?a(t,r,n):a(t,r))||n);return o>3&&n&&Object.defineProperty(t,r,n),n};let lV=class extends sI{constructor(){super(...arguments),this.walletImages=[]}render(){let e=this.walletImages.length<4;return ss`${this.walletImages.slice(0,4).map(({src:e,walletName:t})=>ss`
            <wui-wallet-image
              size="inherit"
              imageSrc=${e}
              name=${ln(t)}
            ></wui-wallet-image>
          `)}
      ${e?[...Array(4-this.walletImages.length)].map(()=>ss` <wui-wallet-image size="inherit" name=""></wui-wallet-image>`):null}
      <wui-flex>
        <wui-icon-box
          size="xxs"
          iconSize="xxs"
          iconcolor="success-100"
          backgroundcolor="success-100"
          icon="checkmark"
          background="opaque"
        ></wui-icon-box>
      </wui-flex>`}};lV.styles=[sO,lH],lF([lt({type:Array})],lV.prototype,"walletImages",void 0),lV=lF([sL("wui-all-wallets-image")],lV);var lZ=nP`
  :host {
    display: flex;
    justify-content: center;
    align-items: center;
    height: var(--wui-spacing-m);
    padding: 0 var(--wui-spacing-3xs) !important;
    border-radius: var(--wui-border-radius-5xs);
    transition:
      border-radius var(--wui-duration-lg) var(--wui-ease-out-power-1),
      background-color var(--wui-duration-lg) var(--wui-ease-out-power-1);
    will-change: border-radius, background-color;
  }

  :host > wui-text {
    transform: translateY(5%);
  }

  :host([data-variant='main']) {
    background-color: var(--wui-color-accent-glass-015);
    color: var(--wui-color-accent-100);
  }

  :host([data-variant='shade']) {
    background-color: var(--wui-color-gray-glass-010);
    color: var(--wui-color-fg-200);
  }

  :host([data-variant='success']) {
    background-color: var(--wui-icon-box-bg-success-100);
    color: var(--wui-color-success-100);
  }

  :host([data-variant='error']) {
    background-color: var(--wui-icon-box-bg-error-100);
    color: var(--wui-color-error-100);
  }

  :host([data-size='lg']) {
    padding: 11px 5px !important;
  }

  :host([data-size='lg']) > wui-text {
    transform: translateY(2%);
  }
`,lq=function(e,t,r,i){var a,o=arguments.length,n=o<3?t:null===i?i=Object.getOwnPropertyDescriptor(t,r):i;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)n=Reflect.decorate(e,t,r,i);else for(var s=e.length-1;s>=0;s--)(a=e[s])&&(n=(o<3?a(n):o>3?a(t,r,n):a(t,r))||n);return o>3&&n&&Object.defineProperty(t,r,n),n};let lG=class extends sI{constructor(){super(...arguments),this.variant="main",this.size="lg"}render(){this.dataset.variant=this.variant,this.dataset.size=this.size;let e="md"===this.size?"mini-700":"micro-700";return ss`
      <wui-text data-variant=${this.variant} variant=${e} color="inherit">
        <slot></slot>
      </wui-text>
    `}};lG.styles=[sO,lZ],lq([lt()],lG.prototype,"variant",void 0),lq([lt()],lG.prototype,"size",void 0),lG=lq([sL("wui-tag")],lG);var lK=nP`
  button {
    column-gap: var(--wui-spacing-s);
    padding: 7px var(--wui-spacing-l) 7px var(--wui-spacing-xs);
    width: 100%;
    background-color: var(--wui-color-gray-glass-002);
    border-radius: var(--wui-border-radius-xs);
    color: var(--wui-color-fg-100);
  }

  button > wui-text:nth-child(2) {
    display: flex;
    flex: 1;
  }

  button:disabled {
    background-color: var(--wui-color-gray-glass-015);
    color: var(--wui-color-gray-glass-015);
  }

  button:disabled > wui-tag {
    background-color: var(--wui-color-gray-glass-010);
    color: var(--wui-color-fg-300);
  }

  wui-icon {
    color: var(--wui-color-fg-200) !important;
  }
`,lY=function(e,t,r,i){var a,o=arguments.length,n=o<3?t:null===i?i=Object.getOwnPropertyDescriptor(t,r):i;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)n=Reflect.decorate(e,t,r,i);else for(var s=e.length-1;s>=0;s--)(a=e[s])&&(n=(o<3?a(n):o>3?a(t,r,n):a(t,r))||n);return o>3&&n&&Object.defineProperty(t,r,n),n};let lX=class extends sI{constructor(){super(...arguments),this.walletImages=[],this.imageSrc="",this.name="",this.tabIdx=void 0,this.installed=!1,this.disabled=!1,this.showAllWallets=!1,this.loading=!1,this.loadingSpinnerColor="accent-100"}render(){return ss`
      <button ?disabled=${this.disabled} tabindex=${ln(this.tabIdx)}>
        ${this.templateAllWallets()} ${this.templateWalletImage()}
        <wui-text variant="paragraph-500" color="inherit">${this.name}</wui-text>
        ${this.templateStatus()}
      </button>
    `}templateAllWallets(){return this.showAllWallets&&this.imageSrc?ss` <wui-all-wallets-image .imageeSrc=${this.imageSrc}> </wui-all-wallets-image> `:this.showAllWallets&&this.walletIcon?ss` <wui-wallet-image .walletIcon=${this.walletIcon} size="sm"> </wui-wallet-image> `:null}templateWalletImage(){return!this.showAllWallets&&this.imageSrc?ss`<wui-wallet-image
        size="sm"
        imageSrc=${this.imageSrc}
        name=${this.name}
        .installed=${this.installed}
      ></wui-wallet-image>`:this.showAllWallets||this.imageSrc?null:ss`<wui-wallet-image size="sm" name=${this.name}></wui-wallet-image>`}templateStatus(){return this.loading?ss`<wui-loading-spinner
        size="lg"
        color=${this.loadingSpinnerColor}
      ></wui-loading-spinner>`:this.tagLabel&&this.tagVariant?ss`<wui-tag variant=${this.tagVariant}>${this.tagLabel}</wui-tag>`:this.icon?ss`<wui-icon color="inherit" size="sm" name=${this.icon}></wui-icon>`:null}};lX.styles=[sO,sP,lK],lY([lt({type:Array})],lX.prototype,"walletImages",void 0),lY([lt()],lX.prototype,"imageSrc",void 0),lY([lt()],lX.prototype,"name",void 0),lY([lt()],lX.prototype,"tagLabel",void 0),lY([lt()],lX.prototype,"tagVariant",void 0),lY([lt()],lX.prototype,"icon",void 0),lY([lt()],lX.prototype,"walletIcon",void 0),lY([lt()],lX.prototype,"tabIdx",void 0),lY([lt({type:Boolean})],lX.prototype,"installed",void 0),lY([lt({type:Boolean})],lX.prototype,"disabled",void 0),lY([lt({type:Boolean})],lX.prototype,"showAllWallets",void 0),lY([lt({type:Boolean})],lX.prototype,"loading",void 0),lY([lt({type:String})],lX.prototype,"loadingSpinnerColor",void 0),lX=lY([sL("wui-list-wallet")],lX);var lJ=function(e,t,r,i){var a,o=arguments.length,n=o<3?t:null===i?i=Object.getOwnPropertyDescriptor(t,r):i;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)n=Reflect.decorate(e,t,r,i);else for(var s=e.length-1;s>=0;s--)(a=e[s])&&(n=(o<3?a(n):o>3?a(t,r,n):a(t,r))||n);return o>3&&n&&Object.defineProperty(t,r,n),n};let lQ=class extends sI{constructor(){super(),this.unsubscribe=[],this.tabIdx=void 0,this.connectors=e7.state.connectors,this.count=e2.state.count,this.isFetchingRecommendedWallets=e2.state.isFetchingRecommendedWallets,this.unsubscribe.push(e7.subscribeKey("connectors",e=>this.connectors=e),e2.subscribeKey("count",e=>this.count=e),e2.subscribeKey("isFetchingRecommendedWallets",e=>this.isFetchingRecommendedWallets=e))}disconnectedCallback(){this.unsubscribe.forEach(e=>e())}render(){let e=this.connectors.find(e=>"walletConnect"===e.id),{allWallets:t}=eZ.state;if(!e||"HIDE"===t||"ONLY_MOBILE"===t&&!eL.isMobile())return null;let r=e2.state.featured.length,i=this.count+r,a=i<10?i:10*Math.floor(i/10),o=a<i?`${a}+`:`${a}`;return ss`
      <wui-list-wallet
        name="All Wallets"
        walletIcon="allWallets"
        showAllWallets
        @click=${this.onAllWallets.bind(this)}
        tagLabel=${o}
        tagVariant="shade"
        data-testid="all-wallets"
        tabIdx=${ln(this.tabIdx)}
        .loading=${this.isFetchingRecommendedWallets}
        loadingSpinnerColor=${this.isFetchingRecommendedWallets?"fg-300":"accent-100"}
      ></wui-list-wallet>
    `}onAllWallets(){eJ.sendEvent({type:"track",event:"CLICK_ALL_WALLETS"}),e5.push("AllWallets")}};lJ([lt()],lQ.prototype,"tabIdx",void 0),lJ([lr()],lQ.prototype,"connectors",void 0),lJ([lr()],lQ.prototype,"count",void 0),lJ([lr()],lQ.prototype,"isFetchingRecommendedWallets",void 0),lQ=lJ([sL("w3m-all-wallets-widget")],lQ);var l0=function(e,t,r,i){var a,o=arguments.length,n=o<3?t:null===i?i=Object.getOwnPropertyDescriptor(t,r):i;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)n=Reflect.decorate(e,t,r,i);else for(var s=e.length-1;s>=0;s--)(a=e[s])&&(n=(o<3?a(n):o>3?a(t,r,n):a(t,r))||n);return o>3&&n&&Object.defineProperty(t,r,n),n};let l1=class extends sI{constructor(){super(),this.unsubscribe=[],this.tabIdx=void 0,this.connectors=e7.state.connectors,this.unsubscribe.push(e7.subscribeKey("connectors",e=>this.connectors=e))}disconnectedCallback(){this.unsubscribe.forEach(e=>e())}render(){let e=this.connectors.filter(e=>"ANNOUNCED"===e.type);return e?.length?ss`
      <wui-flex flexDirection="column" gap="xs">
        ${e.filter(nA.showConnector).map(e=>ss`
              <wui-list-wallet
                imageSrc=${ln(eH.getConnectorImage(e))}
                name=${e.name??"Unknown"}
                @click=${()=>this.onConnector(e)}
                tagVariant="success"
                tagLabel="installed"
                data-testid=${`wallet-selector-${e.id}`}
                .installed=${!0}
                tabIdx=${ln(this.tabIdx)}
              >
              </wui-list-wallet>
            `)}
      </wui-flex>
    `:(this.style.cssText="display: none",null)}onConnector(e){"walletConnect"===e.id?eL.isMobile()?e5.push("AllWallets"):e5.push("ConnectingWalletConnect"):e5.push("ConnectingExternal",{connector:e})}};l0([lt()],l1.prototype,"tabIdx",void 0),l0([lr()],l1.prototype,"connectors",void 0),l1=l0([sL("w3m-connect-announced-widget")],l1);var l2=function(e,t,r,i){var a,o=arguments.length,n=o<3?t:null===i?i=Object.getOwnPropertyDescriptor(t,r):i;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)n=Reflect.decorate(e,t,r,i);else for(var s=e.length-1;s>=0;s--)(a=e[s])&&(n=(o<3?a(n):o>3?a(t,r,n):a(t,r))||n);return o>3&&n&&Object.defineProperty(t,r,n),n};let l3=class extends sI{constructor(){super(),this.unsubscribe=[],this.tabIdx=void 0,this.connectors=e7.state.connectors,this.loading=!1,this.unsubscribe.push(e7.subscribeKey("connectors",e=>this.connectors=e)),eL.isTelegram()&&eL.isIos()&&(this.loading=!tc.state.wcUri,this.unsubscribe.push(tc.subscribeKey("wcUri",e=>this.loading=!e)))}disconnectedCallback(){this.unsubscribe.forEach(e=>e())}render(){let{customWallets:e}=eZ.state;if(!e?.length)return this.style.cssText="display: none",null;let t=this.filterOutDuplicateWallets(e);return ss`<wui-flex flexDirection="column" gap="xs">
      ${t.map(e=>ss`
          <wui-list-wallet
            imageSrc=${ln(eH.getWalletImage(e))}
            name=${e.name??"Unknown"}
            @click=${()=>this.onConnectWallet(e)}
            data-testid=${`wallet-selector-${e.id}`}
            tabIdx=${ln(this.tabIdx)}
            ?loading=${this.loading}
          >
          </wui-list-wallet>
        `)}
    </wui-flex>`}filterOutDuplicateWallets(e){let t=e$.getRecentWallets(),r=this.connectors.map(e=>e.info?.rdns).filter(Boolean),i=t.map(e=>e.rdns).filter(Boolean),a=r.concat(i);if(a.includes("io.metamask.mobile")&&eL.isMobile()){let e=a.indexOf("io.metamask.mobile");a[e]="io.metamask"}return e.filter(e=>!a.includes(String(e?.rdns)))}onConnectWallet(e){this.loading||e5.push("ConnectingWalletConnect",{wallet:e})}};l2([lt()],l3.prototype,"tabIdx",void 0),l2([lr()],l3.prototype,"connectors",void 0),l2([lr()],l3.prototype,"loading",void 0),l3=l2([sL("w3m-connect-custom-widget")],l3);var l5=function(e,t,r,i){var a,o=arguments.length,n=o<3?t:null===i?i=Object.getOwnPropertyDescriptor(t,r):i;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)n=Reflect.decorate(e,t,r,i);else for(var s=e.length-1;s>=0;s--)(a=e[s])&&(n=(o<3?a(n):o>3?a(t,r,n):a(t,r))||n);return o>3&&n&&Object.defineProperty(t,r,n),n};let l4=class extends sI{constructor(){super(),this.unsubscribe=[],this.tabIdx=void 0,this.connectors=e7.state.connectors,this.unsubscribe.push(e7.subscribeKey("connectors",e=>this.connectors=e))}disconnectedCallback(){this.unsubscribe.forEach(e=>e())}render(){let e=this.connectors.filter(e=>"EXTERNAL"===e.type).filter(nA.showConnector).filter(e=>e.id!==ec.CONNECTOR_ID.COINBASE_SDK);return e?.length?ss`
      <wui-flex flexDirection="column" gap="xs">
        ${e.map(e=>ss`
            <wui-list-wallet
              imageSrc=${ln(eH.getConnectorImage(e))}
              .installed=${!0}
              name=${e.name??"Unknown"}
              data-testid=${`wallet-selector-external-${e.id}`}
              @click=${()=>this.onConnector(e)}
              tabIdx=${ln(this.tabIdx)}
            >
            </wui-list-wallet>
          `)}
      </wui-flex>
    `:(this.style.cssText="display: none",null)}onConnector(e){e5.push("ConnectingExternal",{connector:e})}};l5([lt()],l4.prototype,"tabIdx",void 0),l5([lr()],l4.prototype,"connectors",void 0),l4=l5([sL("w3m-connect-external-widget")],l4);var l6=function(e,t,r,i){var a,o=arguments.length,n=o<3?t:null===i?i=Object.getOwnPropertyDescriptor(t,r):i;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)n=Reflect.decorate(e,t,r,i);else for(var s=e.length-1;s>=0;s--)(a=e[s])&&(n=(o<3?a(n):o>3?a(t,r,n):a(t,r))||n);return o>3&&n&&Object.defineProperty(t,r,n),n};let l8=class extends sI{constructor(){super(...arguments),this.tabIdx=void 0,this.wallets=[]}render(){return this.wallets.length?ss`
      <wui-flex flexDirection="column" gap="xs">
        ${this.wallets.map(e=>ss`
            <wui-list-wallet
              data-testid=${`wallet-selector-featured-${e.id}`}
              imageSrc=${ln(eH.getWalletImage(e))}
              name=${e.name??"Unknown"}
              @click=${()=>this.onConnectWallet(e)}
              tabIdx=${ln(this.tabIdx)}
            >
            </wui-list-wallet>
          `)}
      </wui-flex>
    `:(this.style.cssText="display: none",null)}onConnectWallet(e){e7.selectWalletConnector(e)}};l6([lt()],l8.prototype,"tabIdx",void 0),l6([lt()],l8.prototype,"wallets",void 0),l8=l6([sL("w3m-connect-featured-widget")],l8);var l9=function(e,t,r,i){var a,o=arguments.length,n=o<3?t:null===i?i=Object.getOwnPropertyDescriptor(t,r):i;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)n=Reflect.decorate(e,t,r,i);else for(var s=e.length-1;s>=0;s--)(a=e[s])&&(n=(o<3?a(n):o>3?a(t,r,n):a(t,r))||n);return o>3&&n&&Object.defineProperty(t,r,n),n};let l7=class extends sI{constructor(){super(...arguments),this.tabIdx=void 0,this.connectors=[]}render(){let e=this.connectors;return e?.length&&(1!==e.length||e[0]?.name!=="Browser Wallet"||eL.isMobile())?ss`
      <wui-flex flexDirection="column" gap="xs">
        ${e.map(e=>{let t=e.info?.rdns;return eL.isMobile()||"Browser Wallet"!==e.name?t||tc.checkInstalled()?nA.showConnector(e)?ss`
            <wui-list-wallet
              imageSrc=${ln(eH.getConnectorImage(e))}
              .installed=${!0}
              name=${e.name??"Unknown"}
              tagVariant="success"
              tagLabel="installed"
              data-testid=${`wallet-selector-${e.id}`}
              @click=${()=>this.onConnector(e)}
              tabIdx=${ln(this.tabIdx)}
            >
            </wui-list-wallet>
          `:null:(this.style.cssText="display: none",null):null})}
      </wui-flex>
    `:(this.style.cssText="display: none",null)}onConnector(e){e7.setActiveConnector(e),e5.push("ConnectingExternal",{connector:e})}};l9([lt()],l7.prototype,"tabIdx",void 0),l9([lt()],l7.prototype,"connectors",void 0),l7=l9([sL("w3m-connect-injected-widget")],l7);var ce=function(e,t,r,i){var a,o=arguments.length,n=o<3?t:null===i?i=Object.getOwnPropertyDescriptor(t,r):i;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)n=Reflect.decorate(e,t,r,i);else for(var s=e.length-1;s>=0;s--)(a=e[s])&&(n=(o<3?a(n):o>3?a(t,r,n):a(t,r))||n);return o>3&&n&&Object.defineProperty(t,r,n),n};let ct=class extends sI{constructor(){super(),this.unsubscribe=[],this.tabIdx=void 0,this.connectors=e7.state.connectors,this.unsubscribe.push(e7.subscribeKey("connectors",e=>this.connectors=e))}disconnectedCallback(){this.unsubscribe.forEach(e=>e())}render(){let e=this.connectors.filter(e=>"MULTI_CHAIN"===e.type&&"WalletConnect"!==e.name);return e?.length?ss`
      <wui-flex flexDirection="column" gap="xs">
        ${e.map(e=>ss`
            <wui-list-wallet
              imageSrc=${ln(eH.getConnectorImage(e))}
              .installed=${!0}
              name=${e.name??"Unknown"}
              tagVariant="shade"
              tagLabel="multichain"
              data-testid=${`wallet-selector-${e.id}`}
              @click=${()=>this.onConnector(e)}
              tabIdx=${ln(this.tabIdx)}
            >
            </wui-list-wallet>
          `)}
      </wui-flex>
    `:(this.style.cssText="display: none",null)}onConnector(e){e7.setActiveConnector(e),e5.push("ConnectingMultiChain")}};ce([lt()],ct.prototype,"tabIdx",void 0),ce([lr()],ct.prototype,"connectors",void 0),ct=ce([sL("w3m-connect-multi-chain-widget")],ct);var cr=function(e,t,r,i){var a,o=arguments.length,n=o<3?t:null===i?i=Object.getOwnPropertyDescriptor(t,r):i;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)n=Reflect.decorate(e,t,r,i);else for(var s=e.length-1;s>=0;s--)(a=e[s])&&(n=(o<3?a(n):o>3?a(t,r,n):a(t,r))||n);return o>3&&n&&Object.defineProperty(t,r,n),n};let ci=class extends sI{constructor(){super(),this.unsubscribe=[],this.tabIdx=void 0,this.connectors=e7.state.connectors,this.loading=!1,this.unsubscribe.push(e7.subscribeKey("connectors",e=>this.connectors=e)),eL.isTelegram()&&eL.isIos()&&(this.loading=!tc.state.wcUri,this.unsubscribe.push(tc.subscribeKey("wcUri",e=>this.loading=!e)))}render(){let e=e$.getRecentWallets().filter(e=>!nk.isExcluded(e)).filter(e=>!this.hasWalletConnector(e)).filter(e=>this.isWalletCompatibleWithCurrentChain(e));return e.length?ss`
      <wui-flex flexDirection="column" gap="xs">
        ${e.map(e=>ss`
            <wui-list-wallet
              imageSrc=${ln(eH.getWalletImage(e))}
              name=${e.name??"Unknown"}
              @click=${()=>this.onConnectWallet(e)}
              tagLabel="recent"
              tagVariant="shade"
              tabIdx=${ln(this.tabIdx)}
              ?loading=${this.loading}
            >
            </wui-list-wallet>
          `)}
      </wui-flex>
    `:(this.style.cssText="display: none",null)}onConnectWallet(e){this.loading||e7.selectWalletConnector(e)}hasWalletConnector(e){return this.connectors.some(t=>t.id===e.id||t.name===e.name)}isWalletCompatibleWithCurrentChain(e){let t=oS.state.activeChain;return!t||!e.chains||e.chains.some(e=>t===e.split(":")[0])}};cr([lt()],ci.prototype,"tabIdx",void 0),cr([lr()],ci.prototype,"connectors",void 0),cr([lr()],ci.prototype,"loading",void 0),ci=cr([sL("w3m-connect-recent-widget")],ci);var ca=function(e,t,r,i){var a,o=arguments.length,n=o<3?t:null===i?i=Object.getOwnPropertyDescriptor(t,r):i;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)n=Reflect.decorate(e,t,r,i);else for(var s=e.length-1;s>=0;s--)(a=e[s])&&(n=(o<3?a(n):o>3?a(t,r,n):a(t,r))||n);return o>3&&n&&Object.defineProperty(t,r,n),n};let co=class extends sI{constructor(){super(),this.unsubscribe=[],this.tabIdx=void 0,this.wallets=[],this.loading=!1,eL.isTelegram()&&eL.isIos()&&(this.loading=!tc.state.wcUri,this.unsubscribe.push(tc.subscribeKey("wcUri",e=>this.loading=!e)))}render(){let{connectors:e}=e7.state,{customWallets:t,featuredWalletIds:r}=eZ.state,i=e$.getRecentWallets(),a=e.find(e=>"walletConnect"===e.id),o=e.filter(e=>"INJECTED"===e.type||"ANNOUNCED"===e.type||"MULTI_CHAIN"===e.type).filter(e=>"Browser Wallet"!==e.name);if(!a)return null;if(r||t||!this.wallets.length)return this.style.cssText="display: none",null;let n=o.length+i.length,s=nk.filterOutDuplicateWallets(this.wallets).slice(0,Math.max(0,2-n));return s.length?ss`
      <wui-flex flexDirection="column" gap="xs">
        ${s.map(e=>ss`
            <wui-list-wallet
              imageSrc=${ln(eH.getWalletImage(e))}
              name=${e?.name??"Unknown"}
              @click=${()=>this.onConnectWallet(e)}
              tabIdx=${ln(this.tabIdx)}
              ?loading=${this.loading}
            >
            </wui-list-wallet>
          `)}
      </wui-flex>
    `:(this.style.cssText="display: none",null)}onConnectWallet(e){if(this.loading)return;let t=e7.getConnector(e.id,e.rdns);t?e5.push("ConnectingExternal",{connector:t}):e5.push("ConnectingWalletConnect",{wallet:e})}};ca([lt()],co.prototype,"tabIdx",void 0),ca([lt()],co.prototype,"wallets",void 0),ca([lr()],co.prototype,"loading",void 0),co=ca([sL("w3m-connect-recommended-widget")],co);var cn=function(e,t,r,i){var a,o=arguments.length,n=o<3?t:null===i?i=Object.getOwnPropertyDescriptor(t,r):i;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)n=Reflect.decorate(e,t,r,i);else for(var s=e.length-1;s>=0;s--)(a=e[s])&&(n=(o<3?a(n):o>3?a(t,r,n):a(t,r))||n);return o>3&&n&&Object.defineProperty(t,r,n),n};let cs=class extends sI{constructor(){super(),this.unsubscribe=[],this.tabIdx=void 0,this.connectors=e7.state.connectors,this.connectorImages=eD.state.connectorImages,this.unsubscribe.push(e7.subscribeKey("connectors",e=>this.connectors=e),eD.subscribeKey("connectorImages",e=>this.connectorImages=e))}disconnectedCallback(){this.unsubscribe.forEach(e=>e())}render(){if(eL.isMobile())return this.style.cssText="display: none",null;let e=this.connectors.find(e=>"walletConnect"===e.id);if(!e)return this.style.cssText="display: none",null;let t=e.imageUrl||this.connectorImages[e?.imageId??""];return ss`
      <wui-list-wallet
        imageSrc=${ln(t)}
        name=${e.name??"Unknown"}
        @click=${()=>this.onConnector(e)}
        tagLabel="qr code"
        tagVariant="main"
        tabIdx=${ln(this.tabIdx)}
        data-testid="wallet-selector-walletconnect"
      >
      </wui-list-wallet>
    `}onConnector(e){e7.setActiveConnector(e),e5.push("ConnectingWalletConnect")}};cn([lt()],cs.prototype,"tabIdx",void 0),cn([lr()],cs.prototype,"connectors",void 0),cn([lr()],cs.prototype,"connectorImages",void 0),cs=cn([sL("w3m-connect-walletconnect-widget")],cs);var cl=nP`
  :host {
    margin-top: var(--wui-spacing-3xs);
  }
  wui-separator {
    margin: var(--wui-spacing-m) calc(var(--wui-spacing-m) * -1) var(--wui-spacing-xs)
      calc(var(--wui-spacing-m) * -1);
    width: calc(100% + var(--wui-spacing-s) * 2);
  }
`,cc=function(e,t,r,i){var a,o=arguments.length,n=o<3?t:null===i?i=Object.getOwnPropertyDescriptor(t,r):i;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)n=Reflect.decorate(e,t,r,i);else for(var s=e.length-1;s>=0;s--)(a=e[s])&&(n=(o<3?a(n):o>3?a(t,r,n):a(t,r))||n);return o>3&&n&&Object.defineProperty(t,r,n),n};let cd=class extends sI{constructor(){super(),this.unsubscribe=[],this.tabIdx=void 0,this.connectors=e7.state.connectors,this.recommended=e2.state.recommended,this.featured=e2.state.featured,this.unsubscribe.push(e7.subscribeKey("connectors",e=>this.connectors=e),e2.subscribeKey("recommended",e=>this.recommended=e),e2.subscribeKey("featured",e=>this.featured=e))}disconnectedCallback(){this.unsubscribe.forEach(e=>e())}render(){return ss`
      <wui-flex flexDirection="column" gap="xs"> ${this.connectorListTemplate()} </wui-flex>
    `}connectorListTemplate(){let{custom:e,recent:t,announced:r,injected:i,multiChain:a,recommended:o,featured:n,external:s}=nA.getConnectorsByType(this.connectors,this.recommended,this.featured);return nA.getConnectorTypeOrder({custom:e,recent:t,announced:r,injected:i,multiChain:a,recommended:o,featured:n,external:s}).map(e=>{switch(e){case"injected":return ss`
            ${a.length?ss`<w3m-connect-multi-chain-widget
                  tabIdx=${ln(this.tabIdx)}
                ></w3m-connect-multi-chain-widget>`:null}
            ${r.length?ss`<w3m-connect-announced-widget
                  tabIdx=${ln(this.tabIdx)}
                ></w3m-connect-announced-widget>`:null}
            ${i.length?ss`<w3m-connect-injected-widget
                  .connectors=${i}
                  tabIdx=${ln(this.tabIdx)}
                ></w3m-connect-injected-widget>`:null}
          `;case"walletConnect":return ss`<w3m-connect-walletconnect-widget
            tabIdx=${ln(this.tabIdx)}
          ></w3m-connect-walletconnect-widget>`;case"recent":return ss`<w3m-connect-recent-widget
            tabIdx=${ln(this.tabIdx)}
          ></w3m-connect-recent-widget>`;case"featured":return ss`<w3m-connect-featured-widget
            .wallets=${n}
            tabIdx=${ln(this.tabIdx)}
          ></w3m-connect-featured-widget>`;case"custom":return ss`<w3m-connect-custom-widget
            tabIdx=${ln(this.tabIdx)}
          ></w3m-connect-custom-widget>`;case"external":return ss`<w3m-connect-external-widget
            tabIdx=${ln(this.tabIdx)}
          ></w3m-connect-external-widget>`;case"recommended":return ss`<w3m-connect-recommended-widget
            .wallets=${o}
            tabIdx=${ln(this.tabIdx)}
          ></w3m-connect-recommended-widget>`;default:return console.warn(`Unknown connector type: ${e}`),null}})}};cd.styles=cl,cc([lt()],cd.prototype,"tabIdx",void 0),cc([lr()],cd.prototype,"connectors",void 0),cc([lr()],cd.prototype,"recommended",void 0),cc([lr()],cd.prototype,"featured",void 0),cd=cc([sL("w3m-connector-list")],cd);var cu=nP`
  :host {
    display: inline-flex;
    background-color: var(--wui-color-gray-glass-002);
    border-radius: var(--wui-border-radius-3xl);
    padding: var(--wui-spacing-3xs);
    position: relative;
    height: 36px;
    min-height: 36px;
    overflow: hidden;
  }

  :host::before {
    content: '';
    position: absolute;
    pointer-events: none;
    top: 4px;
    left: 4px;
    display: block;
    width: var(--local-tab-width);
    height: 28px;
    border-radius: var(--wui-border-radius-3xl);
    background-color: var(--wui-color-gray-glass-002);
    box-shadow: inset 0 0 0 1px var(--wui-color-gray-glass-002);
    transform: translateX(calc(var(--local-tab) * var(--local-tab-width)));
    transition: transform var(--wui-ease-out-power-1) var(--wui-duration-md);
    will-change: background-color, opacity;
  }

  :host([data-type='flex'])::before {
    left: 3px;
    transform: translateX(calc((var(--local-tab) * 34px) + (var(--local-tab) * 4px)));
  }

  :host([data-type='flex']) {
    display: flex;
    padding: 0px 0px 0px 12px;
    gap: 4px;
  }

  :host([data-type='flex']) > button > wui-text {
    position: absolute;
    left: 18px;
    opacity: 0;
  }

  button[data-active='true'] > wui-icon,
  button[data-active='true'] > wui-text {
    color: var(--wui-color-fg-100);
  }

  button[data-active='false'] > wui-icon,
  button[data-active='false'] > wui-text {
    color: var(--wui-color-fg-200);
  }

  button[data-active='true']:disabled,
  button[data-active='false']:disabled {
    background-color: transparent;
    opacity: 0.5;
    cursor: not-allowed;
  }

  button[data-active='true']:disabled > wui-text {
    color: var(--wui-color-fg-200);
  }

  button[data-active='false']:disabled > wui-text {
    color: var(--wui-color-fg-300);
  }

  button > wui-icon,
  button > wui-text {
    pointer-events: none;
    transition: color var(--wui-e ase-out-power-1) var(--wui-duration-md);
    will-change: color;
  }

  button {
    width: var(--local-tab-width);
    transition: background-color var(--wui-ease-out-power-1) var(--wui-duration-md);
    will-change: background-color;
  }

  :host([data-type='flex']) > button {
    width: 34px;
    position: relative;
    display: flex;
    justify-content: flex-start;
  }

  button:hover:enabled,
  button:active:enabled {
    background-color: transparent !important;
  }

  button:hover:enabled > wui-icon,
  button:active:enabled > wui-icon {
    transition: all var(--wui-ease-out-power-1) var(--wui-duration-lg);
    color: var(--wui-color-fg-125);
  }

  button:hover:enabled > wui-text,
  button:active:enabled > wui-text {
    transition: all var(--wui-ease-out-power-1) var(--wui-duration-lg);
    color: var(--wui-color-fg-125);
  }

  button {
    border-radius: var(--wui-border-radius-3xl);
  }
`,ch=function(e,t,r,i){var a,o=arguments.length,n=o<3?t:null===i?i=Object.getOwnPropertyDescriptor(t,r):i;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)n=Reflect.decorate(e,t,r,i);else for(var s=e.length-1;s>=0;s--)(a=e[s])&&(n=(o<3?a(n):o>3?a(t,r,n):a(t,r))||n);return o>3&&n&&Object.defineProperty(t,r,n),n};let cp=class extends sI{constructor(){super(...arguments),this.tabs=[],this.onTabChange=()=>null,this.buttons=[],this.disabled=!1,this.localTabWidth="100px",this.activeTab=0,this.isDense=!1}render(){return this.isDense=this.tabs.length>3,this.style.cssText=`
      --local-tab: ${this.activeTab};
      --local-tab-width: ${this.localTabWidth};
    `,this.dataset.type=this.isDense?"flex":"block",this.tabs.map((e,t)=>{let r=t===this.activeTab;return ss`
        <button
          ?disabled=${this.disabled}
          @click=${()=>this.onTabClick(t)}
          data-active=${r}
          data-testid="tab-${e.label?.toLowerCase()}"
        >
          ${this.iconTemplate(e)}
          <wui-text variant="small-600" color="inherit"> ${e.label} </wui-text>
        </button>
      `})}firstUpdated(){this.shadowRoot&&this.isDense&&(this.buttons=[...this.shadowRoot.querySelectorAll("button")],setTimeout(()=>{this.animateTabs(0,!0)},0))}iconTemplate(e){return e.icon?ss`<wui-icon size="xs" color="inherit" name=${e.icon}></wui-icon>`:null}onTabClick(e){this.buttons&&this.animateTabs(e,!1),this.activeTab=e,this.onTabChange(e)}animateTabs(e,t){let r=this.buttons[this.activeTab],i=this.buttons[e],a=r?.querySelector("wui-text"),o=i?.querySelector("wui-text"),n=i?.getBoundingClientRect(),s=o?.getBoundingClientRect();r&&a&&!t&&e!==this.activeTab&&(a.animate([{opacity:0}],{duration:50,easing:"ease",fill:"forwards"}),r.animate([{width:"34px"}],{duration:500,easing:"ease",fill:"forwards"})),i&&n&&s&&o&&(e!==this.activeTab||t)&&(this.localTabWidth=`${Math.round(n.width+s.width)+6}px`,i.animate([{width:`${n.width+s.width}px`}],{duration:t?0:500,fill:"forwards",easing:"ease"}),o.animate([{opacity:1}],{duration:t?0:125,delay:t?0:200,fill:"forwards",easing:"ease"}))}};cp.styles=[sO,sP,cu],ch([lt({type:Array})],cp.prototype,"tabs",void 0),ch([lt()],cp.prototype,"onTabChange",void 0),ch([lt({type:Array})],cp.prototype,"buttons",void 0),ch([lt({type:Boolean})],cp.prototype,"disabled",void 0),ch([lt()],cp.prototype,"localTabWidth",void 0),ch([lr()],cp.prototype,"activeTab",void 0),ch([lr()],cp.prototype,"isDense",void 0),cp=ch([sL("wui-tabs")],cp);var cg=function(e,t,r,i){var a,o=arguments.length,n=o<3?t:null===i?i=Object.getOwnPropertyDescriptor(t,r):i;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)n=Reflect.decorate(e,t,r,i);else for(var s=e.length-1;s>=0;s--)(a=e[s])&&(n=(o<3?a(n):o>3?a(t,r,n):a(t,r))||n);return o>3&&n&&Object.defineProperty(t,r,n),n};let cf=class extends sI{constructor(){super(),this.platformTabs=[],this.unsubscribe=[],this.platforms=[],this.onSelectPlatfrom=void 0,this.buffering=!1,this.unsubscribe.push(tc.subscribeKey("buffering",e=>this.buffering=e))}disconnectCallback(){this.unsubscribe.forEach(e=>e())}render(){let e=this.generateTabs();return ss`
      <wui-flex justifyContent="center" .padding=${["0","0","l","0"]}>
        <wui-tabs
          ?disabled=${this.buffering}
          .tabs=${e}
          .onTabChange=${this.onTabChange.bind(this)}
        ></wui-tabs>
      </wui-flex>
    `}generateTabs(){let e=this.platforms.map(e=>"browser"===e?{label:"Browser",icon:"extension",platform:"browser"}:"mobile"===e?{label:"Mobile",icon:"mobile",platform:"mobile"}:"qrcode"===e?{label:"Mobile",icon:"mobile",platform:"qrcode"}:"web"===e?{label:"Webapp",icon:"browser",platform:"web"}:"desktop"===e?{label:"Desktop",icon:"desktop",platform:"desktop"}:{label:"Browser",icon:"extension",platform:"unsupported"});return this.platformTabs=e.map(({platform:e})=>e),e}onTabChange(e){let t=this.platformTabs[e];t&&this.onSelectPlatfrom?.(t)}};cg([lt({type:Array})],cf.prototype,"platforms",void 0),cg([lt()],cf.prototype,"onSelectPlatfrom",void 0),cg([lr()],cf.prototype,"buffering",void 0),cf=cg([sL("w3m-connecting-header")],cf);var cw=nP`
  :host {
    display: flex;
  }

  :host([data-size='sm']) > svg {
    width: 12px;
    height: 12px;
  }

  :host([data-size='md']) > svg {
    width: 16px;
    height: 16px;
  }

  :host([data-size='lg']) > svg {
    width: 24px;
    height: 24px;
  }

  :host([data-size='xl']) > svg {
    width: 32px;
    height: 32px;
  }

  svg {
    animation: rotate 2s linear infinite;
  }

  circle {
    fill: none;
    stroke: var(--local-color);
    stroke-width: 4px;
    stroke-dasharray: 1, 124;
    stroke-dashoffset: 0;
    stroke-linecap: round;
    animation: dash 1.5s ease-in-out infinite;
  }

  :host([data-size='md']) > svg > circle {
    stroke-width: 6px;
  }

  :host([data-size='sm']) > svg > circle {
    stroke-width: 8px;
  }

  @keyframes rotate {
    100% {
      transform: rotate(360deg);
    }
  }

  @keyframes dash {
    0% {
      stroke-dasharray: 1, 124;
      stroke-dashoffset: 0;
    }

    50% {
      stroke-dasharray: 90, 124;
      stroke-dashoffset: -35;
    }

    100% {
      stroke-dashoffset: -125;
    }
  }
`,cm=function(e,t,r,i){var a,o=arguments.length,n=o<3?t:null===i?i=Object.getOwnPropertyDescriptor(t,r):i;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)n=Reflect.decorate(e,t,r,i);else for(var s=e.length-1;s>=0;s--)(a=e[s])&&(n=(o<3?a(n):o>3?a(t,r,n):a(t,r))||n);return o>3&&n&&Object.defineProperty(t,r,n),n};let cv=class extends sI{constructor(){super(...arguments),this.color="accent-100",this.size="lg"}render(){return this.style.cssText=`--local-color: ${"inherit"===this.color?"inherit":`var(--wui-color-${this.color})`}`,this.dataset.size=this.size,ss`<svg viewBox="25 25 50 50">
      <circle r="20" cy="50" cx="50"></circle>
    </svg>`}};cv.styles=[sO,cw],cm([lt()],cv.prototype,"color",void 0),cm([lt()],cv.prototype,"size",void 0),cv=cm([sL("wui-loading-spinner")],cv);var cb=nP`
  :host {
    width: var(--local-width);
    position: relative;
  }

  button {
    border: none;
    border-radius: var(--local-border-radius);
    width: var(--local-width);
    white-space: nowrap;
  }

  /* -- Sizes --------------------------------------------------- */
  button[data-size='md'] {
    padding: 8.2px var(--wui-spacing-l) 9px var(--wui-spacing-l);
    height: 36px;
  }

  button[data-size='md'][data-icon-left='true'][data-icon-right='false'] {
    padding: 8.2px var(--wui-spacing-l) 9px var(--wui-spacing-s);
  }

  button[data-size='md'][data-icon-right='true'][data-icon-left='false'] {
    padding: 8.2px var(--wui-spacing-s) 9px var(--wui-spacing-l);
  }

  button[data-size='lg'] {
    padding: var(--wui-spacing-m) var(--wui-spacing-2l);
    height: 48px;
  }

  /* -- Variants --------------------------------------------------------- */
  button[data-variant='main'] {
    background-color: var(--wui-color-accent-100);
    color: var(--wui-color-inverse-100);
    border: none;
    box-shadow: inset 0 0 0 1px var(--wui-color-gray-glass-010);
  }

  button[data-variant='inverse'] {
    background-color: var(--wui-color-inverse-100);
    color: var(--wui-color-inverse-000);
    border: none;
    box-shadow: inset 0 0 0 1px var(--wui-color-gray-glass-010);
  }

  button[data-variant='accent'] {
    background-color: var(--wui-color-accent-glass-010);
    color: var(--wui-color-accent-100);
    border: none;
    box-shadow: inset 0 0 0 1px var(--wui-color-gray-glass-005);
  }

  button[data-variant='accent-error'] {
    background: var(--wui-color-error-glass-015);
    color: var(--wui-color-error-100);
    border: none;
    box-shadow: inset 0 0 0 1px var(--wui-color-error-glass-010);
  }

  button[data-variant='accent-success'] {
    background: var(--wui-color-success-glass-015);
    color: var(--wui-color-success-100);
    border: none;
    box-shadow: inset 0 0 0 1px var(--wui-color-success-glass-010);
  }

  button[data-variant='neutral'] {
    background: transparent;
    color: var(--wui-color-fg-100);
    border: none;
    box-shadow: inset 0 0 0 1px var(--wui-color-gray-glass-005);
  }

  /* -- Focus states --------------------------------------------------- */
  button[data-variant='main']:focus-visible:enabled {
    background-color: var(--wui-color-accent-090);
    box-shadow:
      inset 0 0 0 1px var(--wui-color-accent-100),
      0 0 0 4px var(--wui-color-accent-glass-020);
  }
  button[data-variant='inverse']:focus-visible:enabled {
    background-color: var(--wui-color-inverse-100);
    box-shadow:
      inset 0 0 0 1px var(--wui-color-gray-glass-010),
      0 0 0 4px var(--wui-color-accent-glass-020);
  }
  button[data-variant='accent']:focus-visible:enabled {
    background-color: var(--wui-color-accent-glass-010);
    box-shadow:
      inset 0 0 0 1px var(--wui-color-accent-100),
      0 0 0 4px var(--wui-color-accent-glass-020);
  }
  button[data-variant='accent-error']:focus-visible:enabled {
    background: var(--wui-color-error-glass-015);
    box-shadow:
      inset 0 0 0 1px var(--wui-color-error-100),
      0 0 0 4px var(--wui-color-error-glass-020);
  }
  button[data-variant='accent-success']:focus-visible:enabled {
    background: var(--wui-color-success-glass-015);
    box-shadow:
      inset 0 0 0 1px var(--wui-color-success-100),
      0 0 0 4px var(--wui-color-success-glass-020);
  }
  button[data-variant='neutral']:focus-visible:enabled {
    background: var(--wui-color-gray-glass-005);
    box-shadow:
      inset 0 0 0 1px var(--wui-color-gray-glass-010),
      0 0 0 4px var(--wui-color-gray-glass-002);
  }

  /* -- Hover & Active states ----------------------------------------------------------- */
  @media (hover: hover) and (pointer: fine) {
    button[data-variant='main']:hover:enabled {
      background-color: var(--wui-color-accent-090);
    }

    button[data-variant='main']:active:enabled {
      background-color: var(--wui-color-accent-080);
    }

    button[data-variant='accent']:hover:enabled {
      background-color: var(--wui-color-accent-glass-015);
    }

    button[data-variant='accent']:active:enabled {
      background-color: var(--wui-color-accent-glass-020);
    }

    button[data-variant='accent-error']:hover:enabled {
      background: var(--wui-color-error-glass-020);
      color: var(--wui-color-error-100);
    }

    button[data-variant='accent-error']:active:enabled {
      background: var(--wui-color-error-glass-030);
      color: var(--wui-color-error-100);
    }

    button[data-variant='accent-success']:hover:enabled {
      background: var(--wui-color-success-glass-020);
      color: var(--wui-color-success-100);
    }

    button[data-variant='accent-success']:active:enabled {
      background: var(--wui-color-success-glass-030);
      color: var(--wui-color-success-100);
    }

    button[data-variant='neutral']:hover:enabled {
      background: var(--wui-color-gray-glass-002);
    }

    button[data-variant='neutral']:active:enabled {
      background: var(--wui-color-gray-glass-005);
    }

    button[data-size='lg'][data-icon-left='true'][data-icon-right='false'] {
      padding-left: var(--wui-spacing-m);
    }

    button[data-size='lg'][data-icon-right='true'][data-icon-left='false'] {
      padding-right: var(--wui-spacing-m);
    }
  }

  /* -- Disabled state --------------------------------------------------- */
  button:disabled {
    background-color: var(--wui-color-gray-glass-002);
    box-shadow: inset 0 0 0 1px var(--wui-color-gray-glass-002);
    color: var(--wui-color-gray-glass-020);
    cursor: not-allowed;
  }

  button > wui-text {
    transition: opacity var(--wui-ease-out-power-1) var(--wui-duration-md);
    will-change: opacity;
    opacity: var(--local-opacity-100);
  }

  ::slotted(*) {
    transition: opacity var(--wui-ease-out-power-1) var(--wui-duration-md);
    will-change: opacity;
    opacity: var(--local-opacity-100);
  }

  wui-loading-spinner {
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    opacity: var(--local-opacity-000);
  }
`,cy=function(e,t,r,i){var a,o=arguments.length,n=o<3?t:null===i?i=Object.getOwnPropertyDescriptor(t,r):i;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)n=Reflect.decorate(e,t,r,i);else for(var s=e.length-1;s>=0;s--)(a=e[s])&&(n=(o<3?a(n):o>3?a(t,r,n):a(t,r))||n);return o>3&&n&&Object.defineProperty(t,r,n),n};let cC={main:"inverse-100",inverse:"inverse-000",accent:"accent-100","accent-error":"error-100","accent-success":"success-100",neutral:"fg-100",disabled:"gray-glass-020"},cx={lg:"paragraph-600",md:"small-600"},cE={lg:"md",md:"md"},ck=class extends sI{constructor(){super(...arguments),this.size="lg",this.disabled=!1,this.fullWidth=!1,this.loading=!1,this.variant="main",this.hasIconLeft=!1,this.hasIconRight=!1,this.borderRadius="m"}render(){this.style.cssText=`
    --local-width: ${this.fullWidth?"100%":"auto"};
    --local-opacity-100: ${this.loading?0:1};
    --local-opacity-000: ${this.loading?1:0};
    --local-border-radius: var(--wui-border-radius-${this.borderRadius});
    `;let e=this.textVariant??cx[this.size];return ss`
      <button
        data-variant=${this.variant}
        data-icon-left=${this.hasIconLeft}
        data-icon-right=${this.hasIconRight}
        data-size=${this.size}
        ?disabled=${this.disabled}
      >
        ${this.loadingTemplate()}
        <slot name="iconLeft" @slotchange=${()=>this.handleSlotLeftChange()}></slot>
        <wui-text variant=${e} color="inherit">
          <slot></slot>
        </wui-text>
        <slot name="iconRight" @slotchange=${()=>this.handleSlotRightChange()}></slot>
      </button>
    `}handleSlotLeftChange(){this.hasIconLeft=!0}handleSlotRightChange(){this.hasIconRight=!0}loadingTemplate(){if(this.loading){let e=cE[this.size],t=this.disabled?cC.disabled:cC[this.variant];return ss`<wui-loading-spinner color=${t} size=${e}></wui-loading-spinner>`}return ss``}};ck.styles=[sO,sP,cb],cy([lt()],ck.prototype,"size",void 0),cy([lt({type:Boolean})],ck.prototype,"disabled",void 0),cy([lt({type:Boolean})],ck.prototype,"fullWidth",void 0),cy([lt({type:Boolean})],ck.prototype,"loading",void 0),cy([lt()],ck.prototype,"variant",void 0),cy([lt({type:Boolean})],ck.prototype,"hasIconLeft",void 0),cy([lt({type:Boolean})],ck.prototype,"hasIconRight",void 0),cy([lt()],ck.prototype,"borderRadius",void 0),cy([lt()],ck.prototype,"textVariant",void 0),ck=cy([sL("wui-button")],ck);var cA=nP`
  button {
    padding: var(--wui-spacing-4xs) var(--wui-spacing-xxs);
    border-radius: var(--wui-border-radius-3xs);
    background-color: transparent;
    color: var(--wui-color-accent-100);
  }

  button:disabled {
    background-color: transparent;
    color: var(--wui-color-gray-glass-015);
  }

  button:hover {
    background-color: var(--wui-color-gray-glass-005);
  }
`,cN=function(e,t,r,i){var a,o=arguments.length,n=o<3?t:null===i?i=Object.getOwnPropertyDescriptor(t,r):i;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)n=Reflect.decorate(e,t,r,i);else for(var s=e.length-1;s>=0;s--)(a=e[s])&&(n=(o<3?a(n):o>3?a(t,r,n):a(t,r))||n);return o>3&&n&&Object.defineProperty(t,r,n),n};let cI=class extends sI{constructor(){super(...arguments),this.tabIdx=void 0,this.disabled=!1,this.color="inherit"}render(){return ss`
      <button ?disabled=${this.disabled} tabindex=${ln(this.tabIdx)}>
        <slot name="iconLeft"></slot>
        <wui-text variant="small-600" color=${this.color}>
          <slot></slot>
        </wui-text>
        <slot name="iconRight"></slot>
      </button>
    `}};cI.styles=[sO,sP,cA],cN([lt()],cI.prototype,"tabIdx",void 0),cN([lt({type:Boolean})],cI.prototype,"disabled",void 0),cN([lt()],cI.prototype,"color",void 0),cI=cN([sL("wui-link")],cI);var cS=nP`
  :host {
    display: block;
    width: var(--wui-box-size-md);
    height: var(--wui-box-size-md);
  }

  svg {
    width: var(--wui-box-size-md);
    height: var(--wui-box-size-md);
  }

  rect {
    fill: none;
    stroke: var(--wui-color-accent-100);
    stroke-width: 4px;
    stroke-linecap: round;
    animation: dash 1s linear infinite;
  }

  @keyframes dash {
    to {
      stroke-dashoffset: 0px;
    }
  }
`,c_=function(e,t,r,i){var a,o=arguments.length,n=o<3?t:null===i?i=Object.getOwnPropertyDescriptor(t,r):i;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)n=Reflect.decorate(e,t,r,i);else for(var s=e.length-1;s>=0;s--)(a=e[s])&&(n=(o<3?a(n):o>3?a(t,r,n):a(t,r))||n);return o>3&&n&&Object.defineProperty(t,r,n),n};let cT=class extends sI{constructor(){super(...arguments),this.radius=36}render(){return this.svgLoaderTemplate()}svgLoaderTemplate(){let e=this.radius>50?50:this.radius,t=36-e;return ss`
      <svg viewBox="0 0 110 110" width="110" height="110">
        <rect
          x="2"
          y="2"
          width="106"
          height="106"
          rx=${e}
          stroke-dasharray="${116+t} ${245+t}"
          stroke-dashoffset=${360+1.75*t}
        />
      </svg>
    `}};cT.styles=[sO,cS],c_([lt({type:Number})],cT.prototype,"radius",void 0),cT=c_([sL("wui-loading-thumbnail")],cT);var cO=nP`
  button {
    border: none;
    border-radius: var(--wui-border-radius-3xl);
  }

  button[data-variant='main'] {
    background-color: var(--wui-color-accent-100);
    color: var(--wui-color-inverse-100);
    box-shadow: inset 0 0 0 1px var(--wui-color-gray-glass-010);
  }

  button[data-variant='accent'] {
    background-color: var(--wui-color-accent-glass-010);
    color: var(--wui-color-accent-100);
    box-shadow: inset 0 0 0 1px var(--wui-color-gray-glass-005);
  }

  button[data-variant='gray'] {
    background-color: transparent;
    color: var(--wui-color-fg-200);
    box-shadow: inset 0 0 0 1px var(--wui-color-gray-glass-010);
  }

  button[data-variant='shade'] {
    background-color: transparent;
    color: var(--wui-color-accent-100);
    box-shadow: inset 0 0 0 1px var(--wui-color-gray-glass-010);
  }

  button[data-size='sm'] {
    height: 32px;
    padding: 0 var(--wui-spacing-s);
  }

  button[data-size='md'] {
    height: 40px;
    padding: 0 var(--wui-spacing-l);
  }

  button[data-size='sm'] > wui-image {
    width: 16px;
    height: 16px;
  }

  button[data-size='md'] > wui-image {
    width: 24px;
    height: 24px;
  }

  button[data-size='sm'] > wui-icon {
    width: 12px;
    height: 12px;
  }

  button[data-size='md'] > wui-icon {
    width: 14px;
    height: 14px;
  }

  wui-image {
    border-radius: var(--wui-border-radius-3xl);
    overflow: hidden;
  }

  button.disabled > wui-icon,
  button.disabled > wui-image {
    filter: grayscale(1);
  }

  button[data-variant='main'] > wui-image {
    box-shadow: inset 0 0 0 1px var(--wui-color-accent-090);
  }

  button[data-variant='shade'] > wui-image,
  button[data-variant='gray'] > wui-image {
    box-shadow: inset 0 0 0 1px var(--wui-color-gray-glass-010);
  }

  @media (hover: hover) and (pointer: fine) {
    button[data-variant='main']:focus-visible {
      background-color: var(--wui-color-accent-090);
    }

    button[data-variant='main']:hover:enabled {
      background-color: var(--wui-color-accent-090);
    }

    button[data-variant='main']:active:enabled {
      background-color: var(--wui-color-accent-080);
    }

    button[data-variant='accent']:hover:enabled {
      background-color: var(--wui-color-accent-glass-015);
    }

    button[data-variant='accent']:active:enabled {
      background-color: var(--wui-color-accent-glass-020);
    }

    button[data-variant='shade']:focus-visible,
    button[data-variant='gray']:focus-visible,
    button[data-variant='shade']:hover,
    button[data-variant='gray']:hover {
      background-color: var(--wui-color-gray-glass-002);
    }

    button[data-variant='gray']:active,
    button[data-variant='shade']:active {
      background-color: var(--wui-color-gray-glass-005);
    }
  }

  button.disabled {
    color: var(--wui-color-gray-glass-020);
    background-color: var(--wui-color-gray-glass-002);
    box-shadow: inset 0 0 0 1px var(--wui-color-gray-glass-002);
    pointer-events: none;
  }
`,cP=function(e,t,r,i){var a,o=arguments.length,n=o<3?t:null===i?i=Object.getOwnPropertyDescriptor(t,r):i;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)n=Reflect.decorate(e,t,r,i);else for(var s=e.length-1;s>=0;s--)(a=e[s])&&(n=(o<3?a(n):o>3?a(t,r,n):a(t,r))||n);return o>3&&n&&Object.defineProperty(t,r,n),n};let cR=class extends sI{constructor(){super(...arguments),this.variant="accent",this.imageSrc="",this.disabled=!1,this.icon="externalLink",this.size="md",this.text=""}render(){let e="sm"===this.size?"small-600":"paragraph-600";return ss`
      <button
        class=${this.disabled?"disabled":""}
        data-variant=${this.variant}
        data-size=${this.size}
      >
        ${this.imageSrc?ss`<wui-image src=${this.imageSrc}></wui-image>`:null}
        <wui-text variant=${e} color="inherit"> ${this.text} </wui-text>
        <wui-icon name=${this.icon} color="inherit" size="inherit"></wui-icon>
      </button>
    `}};cR.styles=[sO,sP,cO],cP([lt()],cR.prototype,"variant",void 0),cP([lt()],cR.prototype,"imageSrc",void 0),cP([lt({type:Boolean})],cR.prototype,"disabled",void 0),cP([lt()],cR.prototype,"icon",void 0),cP([lt()],cR.prototype,"size",void 0),cP([lt()],cR.prototype,"text",void 0),cR=cP([sL("wui-chip-button")],cR);var c$=nP`
  wui-flex {
    width: 100%;
    background-color: var(--wui-color-gray-glass-002);
    border-radius: var(--wui-border-radius-xs);
  }
`,cL=function(e,t,r,i){var a,o=arguments.length,n=o<3?t:null===i?i=Object.getOwnPropertyDescriptor(t,r):i;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)n=Reflect.decorate(e,t,r,i);else for(var s=e.length-1;s>=0;s--)(a=e[s])&&(n=(o<3?a(n):o>3?a(t,r,n):a(t,r))||n);return o>3&&n&&Object.defineProperty(t,r,n),n};let cB=class extends sI{constructor(){super(...arguments),this.disabled=!1,this.label="",this.buttonLabel=""}render(){return ss`
      <wui-flex
        justifyContent="space-between"
        alignItems="center"
        .padding=${["1xs","2l","1xs","2l"]}
      >
        <wui-text variant="paragraph-500" color="fg-200">${this.label}</wui-text>
        <wui-chip-button size="sm" variant="shade" text=${this.buttonLabel} icon="chevronRight">
        </wui-chip-button>
      </wui-flex>
    `}};cB.styles=[sO,sP,c$],cL([lt({type:Boolean})],cB.prototype,"disabled",void 0),cL([lt()],cB.prototype,"label",void 0),cL([lt()],cB.prototype,"buttonLabel",void 0),cB=cL([sL("wui-cta-button")],cB);var cM=nP`
  :host {
    display: block;
    padding: 0 var(--wui-spacing-xl) var(--wui-spacing-xl);
  }
`,cU=function(e,t,r,i){var a,o=arguments.length,n=o<3?t:null===i?i=Object.getOwnPropertyDescriptor(t,r):i;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)n=Reflect.decorate(e,t,r,i);else for(var s=e.length-1;s>=0;s--)(a=e[s])&&(n=(o<3?a(n):o>3?a(t,r,n):a(t,r))||n);return o>3&&n&&Object.defineProperty(t,r,n),n};let cz=class extends sI{constructor(){super(...arguments),this.wallet=void 0}render(){if(!this.wallet)return this.style.display="none",null;let{name:e,app_store:t,play_store:r,chrome_store:i,homepage:a}=this.wallet,o=eL.isMobile(),n=eL.isIos(),s=eL.isAndroid(),l=[t,r,a,i].filter(Boolean).length>1,c=s$.getTruncateString({string:e,charsStart:12,charsEnd:0,truncate:"end"});return l&&!o?ss`
        <wui-cta-button
          label=${`Don't have ${c}?`}
          buttonLabel="Get"
          @click=${()=>e5.push("Downloads",{wallet:this.wallet})}
        ></wui-cta-button>
      `:!l&&a?ss`
        <wui-cta-button
          label=${`Don't have ${c}?`}
          buttonLabel="Get"
          @click=${this.onHomePage.bind(this)}
        ></wui-cta-button>
      `:t&&n?ss`
        <wui-cta-button
          label=${`Don't have ${c}?`}
          buttonLabel="Get"
          @click=${this.onAppStore.bind(this)}
        ></wui-cta-button>
      `:r&&s?ss`
        <wui-cta-button
          label=${`Don't have ${c}?`}
          buttonLabel="Get"
          @click=${this.onPlayStore.bind(this)}
        ></wui-cta-button>
      `:(this.style.display="none",null)}onAppStore(){this.wallet?.app_store&&eL.openHref(this.wallet.app_store,"_blank")}onPlayStore(){this.wallet?.play_store&&eL.openHref(this.wallet.play_store,"_blank")}onHomePage(){this.wallet?.homepage&&eL.openHref(this.wallet.homepage,"_blank")}};cz.styles=[cM],cU([lt({type:Object})],cz.prototype,"wallet",void 0),cz=cU([sL("w3m-mobile-download-links")],cz);var cD=nP`
  @keyframes shake {
    0% {
      transform: translateX(0);
    }
    25% {
      transform: translateX(3px);
    }
    50% {
      transform: translateX(-3px);
    }
    75% {
      transform: translateX(3px);
    }
    100% {
      transform: translateX(0);
    }
  }

  wui-flex:first-child:not(:only-child) {
    position: relative;
  }

  wui-loading-thumbnail {
    position: absolute;
  }

  wui-icon-box {
    position: absolute;
    right: calc(var(--wui-spacing-3xs) * -1);
    bottom: calc(var(--wui-spacing-3xs) * -1);
    opacity: 0;
    transform: scale(0.5);
    transition-property: opacity, transform;
    transition-duration: var(--wui-duration-lg);
    transition-timing-function: var(--wui-ease-out-power-2);
    will-change: opacity, transform;
  }

  wui-text[align='center'] {
    width: 100%;
    padding: 0px var(--wui-spacing-l);
  }

  [data-error='true'] wui-icon-box {
    opacity: 1;
    transform: scale(1);
  }

  [data-error='true'] > wui-flex:first-child {
    animation: shake 250ms cubic-bezier(0.36, 0.07, 0.19, 0.97) both;
  }

  [data-retry='false'] wui-link {
    display: none;
  }

  [data-retry='true'] wui-link {
    display: block;
    opacity: 1;
  }
`,cj=function(e,t,r,i){var a,o=arguments.length,n=o<3?t:null===i?i=Object.getOwnPropertyDescriptor(t,r):i;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)n=Reflect.decorate(e,t,r,i);else for(var s=e.length-1;s>=0;s--)(a=e[s])&&(n=(o<3?a(n):o>3?a(t,r,n):a(t,r))||n);return o>3&&n&&Object.defineProperty(t,r,n),n};class cW extends sI{constructor(){super(),this.wallet=e5.state.data?.wallet,this.connector=e5.state.data?.connector,this.timeout=void 0,this.secondaryBtnIcon="refresh",this.onConnect=void 0,this.onRender=void 0,this.onAutoConnect=void 0,this.isWalletConnect=!0,this.unsubscribe=[],this.imageSrc=eH.getWalletImage(this.wallet)??eH.getConnectorImage(this.connector),this.name=this.wallet?.name??this.connector?.name??"Wallet",this.isRetrying=!1,this.uri=tc.state.wcUri,this.error=tc.state.wcError,this.ready=!1,this.showRetry=!1,this.secondaryBtnLabel="Try again",this.secondaryLabel="Accept connection request in the wallet",this.buffering=!1,this.isLoading=!1,this.isMobile=!1,this.onRetry=void 0,this.unsubscribe.push(tc.subscribeKey("wcUri",e=>{this.uri=e,this.isRetrying&&this.onRetry&&(this.isRetrying=!1,this.onConnect?.())}),tc.subscribeKey("wcError",e=>this.error=e),tc.subscribeKey("buffering",e=>this.buffering=e)),(eL.isTelegram()||eL.isSafari())&&eL.isIos()&&tc.state.wcUri&&this.onConnect?.()}firstUpdated(){this.onAutoConnect?.(),this.showRetry=!this.onAutoConnect}disconnectedCallback(){this.unsubscribe.forEach(e=>e()),clearTimeout(this.timeout)}render(){this.onRender?.(),this.onShowRetry();let e=this.error?"Connection can be declined if a previous request is still active":this.secondaryLabel,t=`Continue in ${this.name}`;return this.buffering&&(t="Connecting..."),this.error&&(t="Connection declined"),ss`
      <wui-flex
        data-error=${ln(this.error)}
        data-retry=${this.showRetry}
        flexDirection="column"
        alignItems="center"
        .padding=${["3xl","xl","xl","xl"]}
        gap="xl"
      >
        <wui-flex justifyContent="center" alignItems="center">
          <wui-wallet-image size="lg" imageSrc=${ln(this.imageSrc)}></wui-wallet-image>

          ${this.error?null:this.loaderTemplate()}

          <wui-icon-box
            backgroundColor="error-100"
            background="opaque"
            iconColor="error-100"
            icon="close"
            size="sm"
            border
            borderColor="wui-color-bg-125"
          ></wui-icon-box>
        </wui-flex>

        <wui-flex flexDirection="column" alignItems="center" gap="xs">
          <wui-text variant="paragraph-500" color=${this.error?"error-100":"fg-100"}>
            ${t}
          </wui-text>
          <wui-text align="center" variant="small-500" color="fg-200">${e}</wui-text>
        </wui-flex>

        ${this.secondaryBtnLabel?ss`
              <wui-button
                variant="accent"
                size="md"
                ?disabled=${this.isRetrying||!this.error&&this.buffering||this.isLoading}
                @click=${this.onTryAgain.bind(this)}
                data-testid="w3m-connecting-widget-secondary-button"
              >
                <wui-icon color="inherit" slot="iconLeft" name=${this.secondaryBtnIcon}></wui-icon>
                ${this.secondaryBtnLabel}
              </wui-button>
            `:null}
      </wui-flex>

      ${this.isWalletConnect?ss`
            <wui-flex .padding=${["0","xl","xl","xl"]} justifyContent="center">
              <wui-link @click=${this.onCopyUri} color="fg-200" data-testid="wui-link-copy">
                <wui-icon size="xs" color="fg-200" slot="iconLeft" name="copy"></wui-icon>
                Copy link
              </wui-link>
            </wui-flex>
          `:null}

      <w3m-mobile-download-links .wallet=${this.wallet}></w3m-mobile-download-links>
    `}onShowRetry(){this.error&&!this.showRetry&&(this.showRetry=!0,this.shadowRoot?.querySelector("wui-button")?.animate([{opacity:0},{opacity:1}],{fill:"forwards",easing:"ease"}))}onTryAgain(){this.buffering||(tc.setWcError(!1),this.onRetry?(this.isRetrying=!0,this.onRetry?.()):this.onConnect?.())}loaderTemplate(){let e=e6.state.themeVariables["--w3m-border-radius-master"],t=e?parseInt(e.replace("px",""),10):4;return ss`<wui-loading-thumbnail radius=${9*t}></wui-loading-thumbnail>`}onCopyUri(){try{this.uri&&(eL.copyToClopboard(this.uri),ta.showSuccess("Link copied"))}catch{ta.showError("Failed to copy")}}}cW.styles=cD,cj([lr()],cW.prototype,"isRetrying",void 0),cj([lr()],cW.prototype,"uri",void 0),cj([lr()],cW.prototype,"error",void 0),cj([lr()],cW.prototype,"ready",void 0),cj([lr()],cW.prototype,"showRetry",void 0),cj([lr()],cW.prototype,"secondaryBtnLabel",void 0),cj([lr()],cW.prototype,"secondaryLabel",void 0),cj([lr()],cW.prototype,"buffering",void 0),cj([lr()],cW.prototype,"isLoading",void 0),cj([lt({type:Boolean})],cW.prototype,"isMobile",void 0),cj([lt()],cW.prototype,"onRetry",void 0);let cH=class extends cW{constructor(){if(super(),!this.wallet)throw Error("w3m-connecting-wc-browser: No wallet provided");this.onConnect=this.onConnectProxy.bind(this),this.onAutoConnect=this.onConnectProxy.bind(this),eJ.sendEvent({type:"track",event:"SELECT_WALLET",properties:{name:this.wallet.name,platform:"browser"}})}async onConnectProxy(){try{this.error=!1;let{connectors:e}=e7.state,t=e.find(e=>"ANNOUNCED"===e.type&&e.info?.rdns===this.wallet?.rdns||"INJECTED"===e.type||e.name===this.wallet?.name);if(t)await tc.connectExternal(t,t.chain);else throw Error("w3m-connecting-wc-browser: No connector found");oB.close(),eJ.sendEvent({type:"track",event:"CONNECT_SUCCESS",properties:{method:"browser",name:this.wallet?.name||"Unknown"}})}catch(e){eJ.sendEvent({type:"track",event:"CONNECT_ERROR",properties:{message:e?.message??"Unknown"}}),this.error=!0}}};cH=function(e,t,r,i){var a,o=arguments.length,n=o<3?t:null===i?i=Object.getOwnPropertyDescriptor(t,r):i;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)n=Reflect.decorate(e,t,r,i);else for(var s=e.length-1;s>=0;s--)(a=e[s])&&(n=(o<3?a(n):o>3?a(t,r,n):a(t,r))||n);return o>3&&n&&Object.defineProperty(t,r,n),n}([sL("w3m-connecting-wc-browser")],cH);let cF=class extends cW{constructor(){if(super(),!this.wallet)throw Error("w3m-connecting-wc-desktop: No wallet provided");this.onConnect=this.onConnectProxy.bind(this),this.onRender=this.onRenderProxy.bind(this),eJ.sendEvent({type:"track",event:"SELECT_WALLET",properties:{name:this.wallet.name,platform:"desktop"}})}onRenderProxy(){!this.ready&&this.uri&&(this.ready=!0,this.onConnect?.())}onConnectProxy(){if(this.wallet?.desktop_link&&this.uri)try{this.error=!1;let{desktop_link:e,name:t}=this.wallet,{redirect:r,href:i}=eL.formatNativeUrl(e,this.uri);tc.setWcLinking({name:t,href:i}),tc.setRecentWallet(this.wallet),eL.openHref(r,"_blank")}catch{this.error=!0}}};cF=function(e,t,r,i){var a,o=arguments.length,n=o<3?t:null===i?i=Object.getOwnPropertyDescriptor(t,r):i;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)n=Reflect.decorate(e,t,r,i);else for(var s=e.length-1;s>=0;s--)(a=e[s])&&(n=(o<3?a(n):o>3?a(t,r,n):a(t,r))||n);return o>3&&n&&Object.defineProperty(t,r,n),n}([sL("w3m-connecting-wc-desktop")],cF);let cV=class extends cW{constructor(){if(super(),this.btnLabelTimeout=void 0,this.labelTimeout=void 0,this.onRender=()=>{!this.ready&&this.uri&&(this.ready=!0,this.onConnect?.())},this.onConnect=()=>{if(this.wallet?.mobile_link&&this.uri)try{this.error=!1;let{mobile_link:e,name:t}=this.wallet,{redirect:r,href:i}=eL.formatNativeUrl(e,this.uri);tc.setWcLinking({name:t,href:i}),tc.setRecentWallet(this.wallet);let a=eL.isIframe()?"_top":"_self";eL.openHref(r,a),clearTimeout(this.labelTimeout),this.secondaryLabel=eR.CONNECT_LABELS.MOBILE}catch(e){eJ.sendEvent({type:"track",event:"CONNECT_PROXY_ERROR",properties:{message:e instanceof Error?e.message:"Error parsing the deeplink",uri:this.uri,mobile_link:this.wallet.mobile_link,name:this.wallet.name}}),this.error=!0}},!this.wallet)throw Error("w3m-connecting-wc-mobile: No wallet provided");this.initializeStateAndTimers(),document.addEventListener("visibilitychange",this.onBuffering.bind(this)),eJ.sendEvent({type:"track",event:"SELECT_WALLET",properties:{name:this.wallet.name,platform:"mobile"}})}disconnectedCallback(){super.disconnectedCallback(),document.removeEventListener("visibilitychange",this.onBuffering.bind(this)),clearTimeout(this.btnLabelTimeout),clearTimeout(this.labelTimeout)}initializeStateAndTimers(){this.secondaryBtnLabel=void 0,this.secondaryLabel=eR.CONNECT_LABELS.MOBILE,this.btnLabelTimeout=setTimeout(()=>{this.secondaryBtnLabel="Try again",this.secondaryLabel=eR.CONNECT_LABELS.MOBILE},eR.FIVE_SEC_MS),this.labelTimeout=setTimeout(()=>{this.secondaryLabel="Hold tight... it's taking longer than expected"},eR.THREE_SEC_MS)}onBuffering(){let e=eL.isIos();document?.visibilityState==="visible"&&!this.error&&e&&(tc.setBuffering(!0),setTimeout(()=>{tc.setBuffering(!1)},5e3))}onTryAgain(){this.buffering||(clearTimeout(this.btnLabelTimeout),clearTimeout(this.labelTimeout),this.initializeStateAndTimers(),tc.setWcError(!1),this.onConnect())}};cV=function(e,t,r,i){var a,o=arguments.length,n=o<3?t:null===i?i=Object.getOwnPropertyDescriptor(t,r):i;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)n=Reflect.decorate(e,t,r,i);else for(var s=e.length-1;s>=0;s--)(a=e[s])&&(n=(o<3?a(n):o>3?a(t,r,n):a(t,r))||n);return o>3&&n&&Object.defineProperty(t,r,n),n}([sL("w3m-connecting-wc-mobile")],cV);var cZ={},cq={},cG={};let cK=[0,26,44,70,100,134,172,196,242,292,346,404,466,532,581,655,733,815,901,991,1085,1156,1258,1364,1474,1588,1706,1828,1921,2051,2185,2323,2465,2611,2761,2876,3034,3196,3362,3532,3706];cG.getSymbolSize=function(e){if(!e)throw Error('"version" cannot be null or undefined');if(e<1||e>40)throw Error('"version" should be in range from 1 to 40');return 4*e+17},cG.getSymbolTotalCodewords=function(e){return cK[e]},cG.getBCHDigit=function(e){let t=0;for(;0!==e;)t++,e>>>=1;return t},cG.setToSJISFunction=function(e){if("function"!=typeof e)throw Error('"toSJISFunc" is not a valid function.');s=e},cG.isKanjiModeEnabled=function(){return"u">typeof s},cG.toSJIS=function(e){return s(e)};var cY={};function cX(){this.buffer=[],this.length=0}function cJ(e){if(!e||e<1)throw Error("BitMatrix size must be defined and greater than 0");this.size=e,this.data=new Uint8Array(e*e),this.reservedBit=new Uint8Array(e*e)}cY.L={bit:1},cY.M={bit:0},cY.Q={bit:3},cY.H={bit:2},cY.isValid=function(e){return e&&"u">typeof e.bit&&e.bit>=0&&e.bit<4},cY.from=function(e,t){if(cY.isValid(e))return e;try{return function(e){if("string"!=typeof e)throw Error("Param is not a string");switch(e.toLowerCase()){case"l":case"low":return cY.L;case"m":case"medium":return cY.M;case"q":case"quartile":return cY.Q;case"h":case"high":return cY.H;default:throw Error("Unknown EC Level: "+e)}}(e)}catch{return t}},cX.prototype={get:function(e){return(this.buffer[Math.floor(e/8)]>>>7-e%8&1)==1},put:function(e,t){for(let r=0;r<t;r++)this.putBit((e>>>t-r-1&1)==1)},getLengthInBits:function(){return this.length},putBit:function(e){let t=Math.floor(this.length/8);this.buffer.length<=t&&this.buffer.push(0),e&&(this.buffer[t]|=128>>>this.length%8),this.length++}},cJ.prototype.set=function(e,t,r,i){let a=e*this.size+t;this.data[a]=r,i&&(this.reservedBit[a]=!0)},cJ.prototype.get=function(e,t){return this.data[e*this.size+t]},cJ.prototype.xor=function(e,t,r){this.data[e*this.size+t]^=r},cJ.prototype.isReserved=function(e,t){return this.reservedBit[e*this.size+t]};var cQ={};!function(e){let t=cG.getSymbolSize;e.getRowColCoords=function(e){if(1===e)return[];let r=Math.floor(e/7)+2,i=t(e),a=145===i?26:2*Math.ceil((i-13)/(2*r-2)),o=[i-7];for(let e=1;e<r-1;e++)o[e]=o[e-1]-a;return o.push(6),o.reverse()},e.getPositions=function(t){let r=[],i=e.getRowColCoords(t),a=i.length;for(let e=0;e<a;e++)for(let t=0;t<a;t++)0===e&&0===t||0===e&&t===a-1||e===a-1&&0===t||r.push([i[e],i[t]]);return r}}(cQ);var c0={};let c1=cG.getSymbolSize;c0.getPositions=function(e){let t=c1(e);return[[0,0],[t-7,0],[0,t-7]]};var c2={};!function(e){e.Patterns={PATTERN000:0,PATTERN001:1,PATTERN010:2,PATTERN011:3,PATTERN100:4,PATTERN101:5,PATTERN110:6,PATTERN111:7};let t={N1:3,N2:3,N3:40,N4:10};e.isValid=function(e){return null!=e&&""!==e&&!isNaN(e)&&e>=0&&e<=7},e.from=function(t){return e.isValid(t)?parseInt(t,10):void 0},e.getPenaltyN1=function(e){let r=e.size,i=0,a=0,o=0,n=null,s=null;for(let l=0;l<r;l++){a=o=0,n=s=null;for(let c=0;c<r;c++){let r=e.get(l,c);r===n?a++:(a>=5&&(i+=t.N1+(a-5)),n=r,a=1),(r=e.get(c,l))===s?o++:(o>=5&&(i+=t.N1+(o-5)),s=r,o=1)}a>=5&&(i+=t.N1+(a-5)),o>=5&&(i+=t.N1+(o-5))}return i},e.getPenaltyN2=function(e){let r=e.size,i=0;for(let t=0;t<r-1;t++)for(let a=0;a<r-1;a++){let r=e.get(t,a)+e.get(t,a+1)+e.get(t+1,a)+e.get(t+1,a+1);(4===r||0===r)&&i++}return i*t.N2},e.getPenaltyN3=function(e){let r=e.size,i=0,a=0,o=0;for(let t=0;t<r;t++){a=o=0;for(let n=0;n<r;n++)a=a<<1&2047|e.get(t,n),n>=10&&(1488===a||93===a)&&i++,o=o<<1&2047|e.get(n,t),n>=10&&(1488===o||93===o)&&i++}return i*t.N3},e.getPenaltyN4=function(e){let r=0,i=e.data.length;for(let t=0;t<i;t++)r+=e.data[t];return Math.abs(Math.ceil(100*r/i/5)-10)*t.N4},e.applyMask=function(t,r){let i=r.size;for(let a=0;a<i;a++)for(let o=0;o<i;o++)r.isReserved(o,a)||r.xor(o,a,function(t,r,i){switch(t){case e.Patterns.PATTERN000:return(r+i)%2==0;case e.Patterns.PATTERN001:return r%2==0;case e.Patterns.PATTERN010:return i%3==0;case e.Patterns.PATTERN011:return(r+i)%3==0;case e.Patterns.PATTERN100:return(Math.floor(r/2)+Math.floor(i/3))%2==0;case e.Patterns.PATTERN101:return r*i%2+r*i%3==0;case e.Patterns.PATTERN110:return(r*i%2+r*i%3)%2==0;case e.Patterns.PATTERN111:return(r*i%3+(r+i)%2)%2==0;default:throw Error("bad maskPattern:"+t)}}(t,o,a))},e.getBestMask=function(t,r){let i=Object.keys(e.Patterns).length,a=0,o=1/0;for(let n=0;n<i;n++){r(n),e.applyMask(n,t);let i=e.getPenaltyN1(t)+e.getPenaltyN2(t)+e.getPenaltyN3(t)+e.getPenaltyN4(t);e.applyMask(n,t),i<o&&(o=i,a=n)}return a}}(c2);var c3={};let c5=[1,1,1,1,1,1,1,1,1,1,2,2,1,2,2,4,1,2,4,4,2,4,4,4,2,4,6,5,2,4,6,6,2,5,8,8,4,5,8,8,4,5,8,11,4,8,10,11,4,9,12,16,4,9,16,16,6,10,12,18,6,10,17,16,6,11,16,19,6,13,18,21,7,14,21,25,8,16,20,25,8,17,23,25,9,17,23,34,9,18,25,30,10,20,27,32,12,21,29,35,12,23,34,37,12,25,34,40,13,26,35,42,14,28,38,45,15,29,40,48,16,31,43,51,17,33,45,54,18,35,48,57,19,37,51,60,19,38,53,63,20,40,56,66,21,43,59,70,22,45,62,74,24,47,65,77,25,49,68,81],c4=[7,10,13,17,10,16,22,28,15,26,36,44,20,36,52,64,26,48,72,88,36,64,96,112,40,72,108,130,48,88,132,156,60,110,160,192,72,130,192,224,80,150,224,264,96,176,260,308,104,198,288,352,120,216,320,384,132,240,360,432,144,280,408,480,168,308,448,532,180,338,504,588,196,364,546,650,224,416,600,700,224,442,644,750,252,476,690,816,270,504,750,900,300,560,810,960,312,588,870,1050,336,644,952,1110,360,700,1020,1200,390,728,1050,1260,420,784,1140,1350,450,812,1200,1440,480,868,1290,1530,510,924,1350,1620,540,980,1440,1710,570,1036,1530,1800,570,1064,1590,1890,600,1120,1680,1980,630,1204,1770,2100,660,1260,1860,2220,720,1316,1950,2310,750,1372,2040,2430];c3.getBlocksCount=function(e,t){switch(t){case cY.L:return c5[(e-1)*4+0];case cY.M:return c5[(e-1)*4+1];case cY.Q:return c5[(e-1)*4+2];case cY.H:return c5[(e-1)*4+3];default:return}},c3.getTotalCodewordsCount=function(e,t){switch(t){case cY.L:return c4[(e-1)*4+0];case cY.M:return c4[(e-1)*4+1];case cY.Q:return c4[(e-1)*4+2];case cY.H:return c4[(e-1)*4+3];default:return}};var c6={},c8={};let c9=new Uint8Array(512),c7=new Uint8Array(256);function de(e){this.genPoly=void 0,this.degree=e,this.degree&&this.initialize(this.degree)}(function(){let e=1;for(let t=0;t<255;t++)c9[t]=e,c7[e]=t,256&(e<<=1)&&(e^=285);for(let e=255;e<512;e++)c9[e]=c9[e-255]})(),c8.log=function(e){if(e<1)throw Error("log("+e+")");return c7[e]},c8.exp=function(e){return c9[e]},c8.mul=function(e,t){return 0===e||0===t?0:c9[c7[e]+c7[t]]},c6.mul=function(e,t){let r=new Uint8Array(e.length+t.length-1);for(let i=0;i<e.length;i++)for(let a=0;a<t.length;a++)r[i+a]^=c8.mul(e[i],t[a]);return r},c6.mod=function(e,t){let r=new Uint8Array(e);for(;r.length-t.length>=0;){let e=r[0];for(let i=0;i<t.length;i++)r[i]^=c8.mul(t[i],e);let i=0;for(;i<r.length&&0===r[i];)i++;r=r.slice(i)}return r},c6.generateECPolynomial=function(e){let t=new Uint8Array([1]);for(let r=0;r<e;r++)t=c6.mul(t,new Uint8Array([1,c8.exp(r)]));return t},de.prototype.initialize=function(e){this.degree=e,this.genPoly=c6.generateECPolynomial(this.degree)},de.prototype.encode=function(e){if(!this.genPoly)throw Error("Encoder not initialized");let t=new Uint8Array(e.length+this.degree);t.set(e);let r=c6.mod(t,this.genPoly),i=this.degree-r.length;if(i>0){let e=new Uint8Array(this.degree);return e.set(r,i),e}return r};var dt={},dr={},di={};di.isValid=function(e){return!isNaN(e)&&e>=1&&e<=40};var da={};let dn="[0-9]+",ds="(?:[u3000-u303F]|[u3040-u309F]|[u30A0-u30FF]|[uFF00-uFFEF]|[u4E00-u9FAF]|[u2605-u2606]|[u2190-u2195]|u203B|[u2010u2015u2018u2019u2025u2026u201Cu201Du2225u2260]|[u0391-u0451]|[u00A7u00A8u00B1u00B4u00D7u00F7])+",dl="(?:(?![A-Z0-9 $%*+\\-./:]|"+(ds=ds.replace(/u/g,"\\u"))+`)(?:.|[\r
]))+`;da.KANJI=RegExp(ds,"g"),da.BYTE_KANJI=RegExp("[^A-Z0-9 $%*+\\-./:]+","g"),da.BYTE=RegExp(dl,"g"),da.NUMERIC=RegExp(dn,"g"),da.ALPHANUMERIC=RegExp("[A-Z $%*+\\-./:]+","g");let dc=RegExp("^"+ds+"$"),dd=RegExp("^"+dn+"$"),du=RegExp("^[A-Z0-9 $%*+\\-./:]+$");da.testKanji=function(e){return dc.test(e)},da.testNumeric=function(e){return dd.test(e)},da.testAlphanumeric=function(e){return du.test(e)},dr.NUMERIC={id:"Numeric",bit:1,ccBits:[10,12,14]},dr.ALPHANUMERIC={id:"Alphanumeric",bit:2,ccBits:[9,11,13]},dr.BYTE={id:"Byte",bit:4,ccBits:[8,16,16]},dr.KANJI={id:"Kanji",bit:8,ccBits:[8,10,12]},dr.MIXED={bit:-1},dr.getCharCountIndicator=function(e,t){if(!e.ccBits)throw Error("Invalid mode: "+e);if(!di.isValid(t))throw Error("Invalid version: "+t);return t>=1&&t<10?e.ccBits[0]:t<27?e.ccBits[1]:e.ccBits[2]},dr.getBestModeForData=function(e){return da.testNumeric(e)?dr.NUMERIC:da.testAlphanumeric(e)?dr.ALPHANUMERIC:da.testKanji(e)?dr.KANJI:dr.BYTE},dr.toString=function(e){if(e&&e.id)return e.id;throw Error("Invalid mode")},dr.isValid=function(e){return e&&e.bit&&e.ccBits},dr.from=function(e,t){if(dr.isValid(e))return e;try{return function(e){if("string"!=typeof e)throw Error("Param is not a string");switch(e.toLowerCase()){case"numeric":return dr.NUMERIC;case"alphanumeric":return dr.ALPHANUMERIC;case"kanji":return dr.KANJI;case"byte":return dr.BYTE;default:throw Error("Unknown mode: "+e)}}(e)}catch{return t}},function(e){let t=cG.getBCHDigit(7973);function r(e,t){return dr.getCharCountIndicator(e,t)+4}e.from=function(e,t){return di.isValid(e)?parseInt(e,10):t},e.getCapacity=function(e,t,i){if(!di.isValid(e))throw Error("Invalid QR Code version");typeof i>"u"&&(i=dr.BYTE);let a=(cG.getSymbolTotalCodewords(e)-c3.getTotalCodewordsCount(e,t))*8;if(i===dr.MIXED)return a;let o=a-r(i,e);switch(i){case dr.NUMERIC:return Math.floor(o/10*3);case dr.ALPHANUMERIC:return Math.floor(o/11*2);case dr.KANJI:return Math.floor(o/13);case dr.BYTE:default:return Math.floor(o/8)}},e.getBestVersionForData=function(t,i){let a;let o=cY.from(i,cY.M);if(Array.isArray(t)){if(t.length>1)return function(t,i){for(let a=1;a<=40;a++)if(function(e,t){let i=0;return e.forEach(function(e){let a=r(e.mode,t);i+=a+e.getBitsLength()}),i}(t,a)<=e.getCapacity(a,i,dr.MIXED))return a}(t,o);if(0===t.length)return 1;a=t[0]}else a=t;return function(t,r,i){for(let a=1;a<=40;a++)if(r<=e.getCapacity(a,i,t))return a}(a.mode,a.getLength(),o)},e.getEncodedBits=function(e){if(!di.isValid(e)||e<7)throw Error("Invalid QR Code version");let r=e<<12;for(;cG.getBCHDigit(r)-t>=0;)r^=7973<<cG.getBCHDigit(r)-t;return e<<12|r}}(dt);var dh={};let dp=cG.getBCHDigit(1335);dh.getEncodedBits=function(e,t){let r=e.bit<<3|t,i=r<<10;for(;cG.getBCHDigit(i)-dp>=0;)i^=1335<<cG.getBCHDigit(i)-dp;return(r<<10|i)^21522};var dg={};function df(e){this.mode=dr.NUMERIC,this.data=e.toString()}df.getBitsLength=function(e){return 10*Math.floor(e/3)+(e%3?e%3*3+1:0)},df.prototype.getLength=function(){return this.data.length},df.prototype.getBitsLength=function(){return df.getBitsLength(this.data.length)},df.prototype.write=function(e){let t,r;for(t=0;t+3<=this.data.length;t+=3)r=parseInt(this.data.substr(t,3),10),e.put(r,10);let i=this.data.length-t;i>0&&(r=parseInt(this.data.substr(t),10),e.put(r,3*i+1))};let dw=["0","1","2","3","4","5","6","7","8","9","A","B","C","D","E","F","G","H","I","J","K","L","M","N","O","P","Q","R","S","T","U","V","W","X","Y","Z"," ","$","%","*","+","-",".","/",":"];function dm(e){this.mode=dr.ALPHANUMERIC,this.data=e}dm.getBitsLength=function(e){return 11*Math.floor(e/2)+e%2*6},dm.prototype.getLength=function(){return this.data.length},dm.prototype.getBitsLength=function(){return dm.getBitsLength(this.data.length)},dm.prototype.write=function(e){let t;for(t=0;t+2<=this.data.length;t+=2){let r=45*dw.indexOf(this.data[t]);r+=dw.indexOf(this.data[t+1]),e.put(r,11)}this.data.length%2&&e.put(dw.indexOf(this.data[t]),6)};let dv=function(e){for(var t=[],r=e.length,i=0;i<r;i++){var a=e.charCodeAt(i);if(a>=55296&&a<=56319&&r>i+1){var o=e.charCodeAt(i+1);o>=56320&&o<=57343&&(a=(a-55296)*1024+o-56320+65536,i+=1)}if(a<128){t.push(a);continue}if(a<2048){t.push(a>>6|192),t.push(63&a|128);continue}if(a<55296||a>=57344&&a<65536){t.push(a>>12|224),t.push(a>>6&63|128),t.push(63&a|128);continue}if(a>=65536&&a<=1114111){t.push(a>>18|240),t.push(a>>12&63|128),t.push(a>>6&63|128),t.push(63&a|128);continue}t.push(239,191,189)}return new Uint8Array(t).buffer};function db(e){this.mode=dr.BYTE,"string"==typeof e&&(e=dv(e)),this.data=new Uint8Array(e)}function dy(e){this.mode=dr.KANJI,this.data=e}db.getBitsLength=function(e){return 8*e},db.prototype.getLength=function(){return this.data.length},db.prototype.getBitsLength=function(){return db.getBitsLength(this.data.length)},db.prototype.write=function(e){for(let t=0,r=this.data.length;t<r;t++)e.put(this.data[t],8)},dy.getBitsLength=function(e){return 13*e},dy.prototype.getLength=function(){return this.data.length},dy.prototype.getBitsLength=function(){return dy.getBitsLength(this.data.length)},dy.prototype.write=function(e){let t;for(t=0;t<this.data.length;t++){let r=cG.toSJIS(this.data[t]);if(r>=33088&&r<=40956)r-=33088;else if(r>=57408&&r<=60351)r-=49472;else throw Error("Invalid SJIS character: "+this.data[t]+`
Make sure your charset is UTF-8`);r=(r>>>8&255)*192+(255&r),e.put(r,13)}};var dC={exports:{}};function dx(e,t,r){let i,a;let o=e.size,n=dh.getEncodedBits(t,r);for(i=0;i<15;i++)a=(n>>i&1)==1,i<6?e.set(i,8,a,!0):i<8?e.set(i+1,8,a,!0):e.set(o-15+i,8,a,!0),i<8?e.set(8,o-i-1,a,!0):i<9?e.set(8,15-i-1+1,a,!0):e.set(8,15-i-1,a,!0);e.set(o-8,8,1,!0)}f={single_source_shortest_paths:function(e,t,r){var i,a,o,n,s,l,c,d={},u={};u[t]=0;var h=f.PriorityQueue.make();for(h.push(t,0);!h.empty();)for(o in a=(i=h.pop()).value,n=i.cost,s=e[a]||{})s.hasOwnProperty(o)&&(l=n+s[o],c=u[o],(typeof u[o]>"u"||c>l)&&(u[o]=l,h.push(o,l),d[o]=a));if("u">typeof r&&typeof u[r]>"u")throw Error(["Could not find a path from ",t," to ",r,"."].join(""));return d},extract_shortest_path_from_predecessor_list:function(e,t){for(var r=[],i=t;i;)r.push(i),e[i],i=e[i];return r.reverse(),r},find_path:function(e,t,r){var i=f.single_source_shortest_paths(e,t,r);return f.extract_shortest_path_from_predecessor_list(i,r)},PriorityQueue:{make:function(e){var t,r=f.PriorityQueue,i={};for(t in e=e||{},r)r.hasOwnProperty(t)&&(i[t]=r[t]);return i.queue=[],i.sorter=e.sorter||r.default_sorter,i},default_sorter:function(e,t){return e.cost-t.cost},push:function(e,t){this.queue.push({value:e,cost:t}),this.queue.sort(this.sorter)},pop:function(){return this.queue.shift()},empty:function(){return 0===this.queue.length}}},dC.exports=f,function(e){let t=dC.exports;function r(e){return unescape(encodeURIComponent(e)).length}function i(e,t,r){let i;let a=[];for(;null!==(i=e.exec(r));)a.push({data:i[0],index:i.index,mode:t,length:i[0].length});return a}function a(e){let t,r;let a=i(da.NUMERIC,dr.NUMERIC,e),o=i(da.ALPHANUMERIC,dr.ALPHANUMERIC,e);return cG.isKanjiModeEnabled()?(t=i(da.BYTE,dr.BYTE,e),r=i(da.KANJI,dr.KANJI,e)):(t=i(da.BYTE_KANJI,dr.BYTE,e),r=[]),a.concat(o,t,r).sort(function(e,t){return e.index-t.index}).map(function(e){return{data:e.data,mode:e.mode,length:e.length}})}function o(e,t){switch(t){case dr.NUMERIC:return df.getBitsLength(e);case dr.ALPHANUMERIC:return dm.getBitsLength(e);case dr.KANJI:return dy.getBitsLength(e);case dr.BYTE:return db.getBitsLength(e)}}function n(e,t){let r;let i=dr.getBestModeForData(e);if((r=dr.from(t,i))!==dr.BYTE&&r.bit<i.bit)throw Error('"'+e+'" cannot be encoded with mode '+dr.toString(r)+`.
 Suggested mode is: `+dr.toString(i));switch(r!==dr.KANJI||cG.isKanjiModeEnabled()||(r=dr.BYTE),r){case dr.NUMERIC:return new df(e);case dr.ALPHANUMERIC:return new dm(e);case dr.KANJI:return new dy(e);case dr.BYTE:return new db(e)}}e.fromArray=function(e){return e.reduce(function(e,t){return"string"==typeof t?e.push(n(t,null)):t.data&&e.push(n(t.data,t.mode)),e},[])},e.fromString=function(i,n){let s=function(e,t){let r={},i={start:{}},a=["start"];for(let n=0;n<e.length;n++){let s=e[n],l=[];for(let e=0;e<s.length;e++){let c=s[e],d=""+n+e;l.push(d),r[d]={node:c,lastCount:0},i[d]={};for(let e=0;e<a.length;e++){let n=a[e];r[n]&&r[n].node.mode===c.mode?(i[n][d]=o(r[n].lastCount+c.length,c.mode)-o(r[n].lastCount,c.mode),r[n].lastCount+=c.length):(r[n]&&(r[n].lastCount=c.length),i[n][d]=o(c.length,c.mode)+4+dr.getCharCountIndicator(c.mode,t))}}a=l}for(let e=0;e<a.length;e++)i[a[e]].end=0;return{map:i,table:r}}(function(e){let t=[];for(let i=0;i<e.length;i++){let a=e[i];switch(a.mode){case dr.NUMERIC:t.push([a,{data:a.data,mode:dr.ALPHANUMERIC,length:a.length},{data:a.data,mode:dr.BYTE,length:a.length}]);break;case dr.ALPHANUMERIC:t.push([a,{data:a.data,mode:dr.BYTE,length:a.length}]);break;case dr.KANJI:t.push([a,{data:a.data,mode:dr.BYTE,length:r(a.data)}]);break;case dr.BYTE:t.push([{data:a.data,mode:dr.BYTE,length:r(a.data)}])}}return t}(a(i,cG.isKanjiModeEnabled())),n),l=t.find_path(s.map,"start","end"),c=[];for(let e=1;e<l.length-1;e++)c.push(s.table[l[e]].node);return e.fromArray(c.reduce(function(e,t){let r=e.length-1>=0?e[e.length-1]:null;return r&&r.mode===t.mode?e[e.length-1].data+=t.data:e.push(t),e},[]))},e.rawSplit=function(t){return e.fromArray(a(t,cG.isKanjiModeEnabled()))}}(dg),cq.create=function(e,t){if(typeof e>"u"||""===e)throw Error("No input text");let r=cY.M,i,a;return"u">typeof t&&(r=cY.from(t.errorCorrectionLevel,cY.M),i=dt.from(t.version),a=c2.from(t.maskPattern),t.toSJISFunc&&cG.setToSJISFunction(t.toSJISFunc)),function(e,t,r,i){let a;if(Array.isArray(e))a=dg.fromArray(e);else if("string"==typeof e){let i=t;if(!i){let t=dg.rawSplit(e);i=dt.getBestVersionForData(t,r)}a=dg.fromString(e,i||40)}else throw Error("Invalid data");let o=dt.getBestVersionForData(a,r);if(!o)throw Error("The amount of data is too big to be stored in a QR Code");if(t){if(t<o)throw Error(`
The chosen QR Code version cannot contain this amount of data.
Minimum version required to store current data is: `+o+`.
`)}else t=o;let n=function(e,t,r){let i=new cX;r.forEach(function(t){i.put(t.mode.bit,4),i.put(t.getLength(),dr.getCharCountIndicator(t.mode,e)),t.write(i)});let a=(cG.getSymbolTotalCodewords(e)-c3.getTotalCodewordsCount(e,t))*8;for(i.getLengthInBits()+4<=a&&i.put(0,4);i.getLengthInBits()%8!=0;)i.putBit(0);let o=(a-i.getLengthInBits())/8;for(let e=0;e<o;e++)i.put(e%2?17:236,8);return function(e,t,r){let i=cG.getSymbolTotalCodewords(t),a=i-c3.getTotalCodewordsCount(t,r),o=c3.getBlocksCount(t,r),n=i%o,s=o-n,l=Math.floor(i/o),c=Math.floor(a/o),d=c+1,u=l-c,h=new de(u),p=0,g=Array(o),f=Array(o),w=0,m=new Uint8Array(e.buffer);for(let e=0;e<o;e++){let t=e<s?c:d;g[e]=m.slice(p,p+t),f[e]=h.encode(g[e]),p+=t,w=Math.max(w,t)}let v=new Uint8Array(i),b=0,y,C;for(y=0;y<w;y++)for(C=0;C<o;C++)y<g[C].length&&(v[b++]=g[C][y]);for(y=0;y<u;y++)for(C=0;C<o;C++)v[b++]=f[C][y];return v}(i,e,t)}(t,r,a),s=new cJ(cG.getSymbolSize(t));return function(e,t){let r=e.size,i=c0.getPositions(t);for(let t=0;t<i.length;t++){let a=i[t][0],o=i[t][1];for(let t=-1;t<=7;t++)if(!(a+t<=-1||r<=a+t))for(let i=-1;i<=7;i++)o+i<=-1||r<=o+i||(t>=0&&t<=6&&(0===i||6===i)||i>=0&&i<=6&&(0===t||6===t)||t>=2&&t<=4&&i>=2&&i<=4?e.set(a+t,o+i,!0,!0):e.set(a+t,o+i,!1,!0))}}(s,t),function(e){let t=e.size;for(let r=8;r<t-8;r++){let t=r%2==0;e.set(r,6,t,!0),e.set(6,r,t,!0)}}(s),function(e,t){let r=cQ.getPositions(t);for(let t=0;t<r.length;t++){let i=r[t][0],a=r[t][1];for(let t=-2;t<=2;t++)for(let r=-2;r<=2;r++)-2===t||2===t||-2===r||2===r||0===t&&0===r?e.set(i+t,a+r,!0,!0):e.set(i+t,a+r,!1,!0)}}(s,t),dx(s,r,0),t>=7&&function(e,t){let r,i,a;let o=e.size,n=dt.getEncodedBits(t);for(let t=0;t<18;t++)r=Math.floor(t/3),i=t%3+o-8-3,a=(n>>t&1)==1,e.set(r,i,a,!0),e.set(i,r,a,!0)}(s,t),function(e,t){let r=e.size,i=-1,a=r-1,o=7,n=0;for(let s=r-1;s>0;s-=2)for(6===s&&s--;;){for(let r=0;r<2;r++)if(!e.isReserved(a,s-r)){let i=!1;n<t.length&&(i=(t[n]>>>o&1)==1),e.set(a,s-r,i),-1==--o&&(n++,o=7)}if((a+=i)<0||r<=a){a-=i,i=-i;break}}}(s,n),isNaN(i)&&(i=c2.getBestMask(s,dx.bind(null,s,r))),c2.applyMask(i,s),dx(s,r,i),{modules:s,version:t,errorCorrectionLevel:r,maskPattern:i,segments:a}}(e,i,r,a)};var dE={},dk={};(function(e){function t(e){if("number"==typeof e&&(e=e.toString()),"string"!=typeof e)throw Error("Color should be defined as hex string");let t=e.slice().replace("#","").split("");if(t.length<3||5===t.length||t.length>8)throw Error("Invalid hex color: "+e);(3===t.length||4===t.length)&&(t=Array.prototype.concat.apply([],t.map(function(e){return[e,e]}))),6===t.length&&t.push("F","F");let r=parseInt(t.join(""),16);return{r:r>>24&255,g:r>>16&255,b:r>>8&255,a:255&r,hex:"#"+t.slice(0,6).join("")}}e.getOptions=function(e){e||(e={}),e.color||(e.color={});let r=typeof e.margin>"u"||null===e.margin||e.margin<0?4:e.margin,i=e.width&&e.width>=21?e.width:void 0,a=e.scale||4;return{width:i,scale:i?4:a,margin:r,color:{dark:t(e.color.dark||"#000000ff"),light:t(e.color.light||"#ffffffff")},type:e.type,rendererOpts:e.rendererOpts||{}}},e.getScale=function(e,t){return t.width&&t.width>=e+2*t.margin?t.width/(e+2*t.margin):t.scale},e.getImageWidth=function(t,r){let i=e.getScale(t,r);return Math.floor((t+2*r.margin)*i)},e.qrToImageData=function(t,r,i){let a=r.modules.size,o=r.modules.data,n=e.getScale(a,i),s=Math.floor((a+2*i.margin)*n),l=i.margin*n,c=[i.color.light,i.color.dark];for(let e=0;e<s;e++)for(let r=0;r<s;r++){let d=(e*s+r)*4,u=i.color.light;e>=l&&r>=l&&e<s-l&&r<s-l&&(u=c[o[Math.floor((e-l)/n)*a+Math.floor((r-l)/n)]?1:0]),t[d++]=u.r,t[d++]=u.g,t[d++]=u.b,t[d]=u.a}}})(dk),dE.render=function(e,t,r){var i;let a=r,o=t;!(typeof a>"u")||t&&t.getContext||(a=t,t=void 0),t||(o=function(){try{return document.createElement("canvas")}catch{throw Error("You need to specify a canvas element")}}()),a=dk.getOptions(a);let n=dk.getImageWidth(e.modules.size,a),s=o.getContext("2d"),l=s.createImageData(n,n);return dk.qrToImageData(l.data,e,a),i=o,s.clearRect(0,0,i.width,i.height),i.style||(i.style={}),i.height=n,i.width=n,i.style.height=n+"px",i.style.width=n+"px",s.putImageData(l,0,0),o},dE.renderToDataURL=function(e,t,r){let i=r;!(typeof i>"u")||t&&t.getContext||(i=t,t=void 0),i||(i={});let a=dE.render(e,t,i),o=i.type||"image/png",n=i.rendererOpts||{};return a.toDataURL(o,n.quality)};var dA={};function dN(e,t){let r=e.a/255,i=t+'="'+e.hex+'"';return r<1?i+" "+t+'-opacity="'+r.toFixed(2).slice(1)+'"':i}function dI(e,t,r){let i=e+t;return"u">typeof r&&(i+=" "+r),i}function dS(e,t,r,i,a){let o=[].slice.call(arguments,1),n=o.length,s="function"==typeof o[n-1];if(!s&&!("function"==typeof Promise&&Promise.prototype&&Promise.prototype.then))throw Error("Callback required as last argument");if(s){if(n<2)throw Error("Too few arguments provided");2===n?(a=r,r=t,t=i=void 0):3===n&&(t.getContext&&typeof a>"u"?(a=i,i=void 0):(a=i,i=r,r=t,t=void 0))}else{if(n<1)throw Error("Too few arguments provided");return 1===n?(r=t,t=i=void 0):2!==n||t.getContext||(i=r,r=t,t=void 0),new Promise(function(a,o){try{let o=cq.create(r,i);a(e(o,t,i))}catch(e){o(e)}})}try{let o=cq.create(r,i);a(null,e(o,t,i))}catch(e){a(e)}}function d_(e,t,r){return e!==t&&(e-t<0?t-e:e-t)<=r+.1}dA.render=function(e,t,r){let i=dk.getOptions(t),a=e.modules.size,o=e.modules.data,n=a+2*i.margin,s=i.color.light.a?"<path "+dN(i.color.light,"fill")+' d="M0 0h'+n+"v"+n+'H0z"/>':"",l="<path "+dN(i.color.dark,"stroke")+' d="'+function(e,t,r){let i="",a=0,o=!1,n=0;for(let s=0;s<e.length;s++){let l=Math.floor(s%t),c=Math.floor(s/t);l||o||(o=!0),e[s]?(n++,s>0&&l>0&&e[s-1]||(i+=o?dI("M",l+r,.5+c+r):dI("m",a,0),a=0,o=!1),l+1<t&&e[s+1]||(i+=dI("h",n),n=0)):a++}return i}(o,a,i.margin)+'"/>',c='<svg xmlns="http://www.w3.org/2000/svg" '+(i.width?'width="'+i.width+'" height="'+i.width+'" ':"")+('viewBox="0 0 '+n)+" "+n+'" shape-rendering="crispEdges">'+s+l+`</svg>
`;return"function"==typeof r&&r(null,c),c},cZ.create=cq.create,cZ.toCanvas=dS.bind(null,dE.render),cZ.toDataURL=dS.bind(null,dE.renderToDataURL),cZ.toString=dS.bind(null,function(e,t,r){return dA.render(e,r)});let dT={generate({uri:e,size:t,logoSize:r,dotColor:i="#141414"}){let a=[],o=function(e,t){let r=Array.prototype.slice.call(cZ.create(e,{errorCorrectionLevel:"Q"}).modules.data,0),i=Math.sqrt(r.length);return r.reduce((e,t,r)=>(r%i==0?e.push([t]):e[e.length-1].push(t))&&e,[])}(e,0),n=t/o.length,s=[{x:0,y:0},{x:1,y:0},{x:0,y:1}];s.forEach(({x:e,y:t})=>{let r=(o.length-7)*n*e,l=(o.length-7)*n*t;for(let e=0;e<s.length;e+=1){let t=n*(7-2*e);a.push(sl`
            <rect
              fill=${2===e?i:"transparent"}
              width=${0===e?t-5:t}
              rx= ${0===e?(t-5)*.45:.45*t}
              ry= ${0===e?(t-5)*.45:.45*t}
              stroke=${i}
              stroke-width=${0===e?5:0}
              height=${0===e?t-5:t}
              x= ${0===e?l+n*e+2.5:l+n*e}
              y= ${0===e?r+n*e+2.5:r+n*e}
            />
          `)}});let l=Math.floor((r+25)/n),c=o.length/2-l/2,d=o.length/2+l/2-1,u=[];o.forEach((e,t)=>{e.forEach((e,r)=>{!o[t][r]||t<7&&r<7||t>o.length-8&&r<7||t<7&&r>o.length-8||t>c&&t<d&&r>c&&r<d||u.push([t*n+n/2,r*n+n/2])})});let h={};return u.forEach(([e,t])=>{h[e]?h[e]?.push(t):h[e]=[t]}),Object.entries(h).map(([e,t])=>{let r=t.filter(e=>t.every(t=>!d_(e,t,n)));return[Number(e),r]}).forEach(([e,t])=>{t.forEach(t=>{a.push(sl`<circle cx=${e} cy=${t} fill=${i} r=${n/2.5} />`)})}),Object.entries(h).filter(([e,t])=>t.length>1).map(([e,t])=>{let r=t.filter(e=>t.some(t=>d_(e,t,n)));return[Number(e),r]}).map(([e,t])=>{t.sort((e,t)=>e<t?-1:1);let r=[];for(let e of t){let t=r.find(t=>t.some(t=>d_(e,t,n)));t?t.push(e):r.push([e])}return[e,r.map(e=>[e[0],e[e.length-1]])]}).forEach(([e,t])=>{t.forEach(([t,r])=>{a.push(sl`
              <line
                x1=${e}
                x2=${e}
                y1=${t}
                y2=${r}
                stroke=${i}
                stroke-width=${n/1.25}
                stroke-linecap="round"
              />
            `)})}),a}};var dO=nP`
  :host {
    position: relative;
    user-select: none;
    display: block;
    overflow: hidden;
    aspect-ratio: 1 / 1;
    width: var(--local-size);
  }

  :host([data-theme='dark']) {
    border-radius: clamp(0px, var(--wui-border-radius-l), 40px);
    background-color: var(--wui-color-inverse-100);
    padding: var(--wui-spacing-l);
  }

  :host([data-theme='light']) {
    box-shadow: 0 0 0 1px var(--wui-color-bg-125);
    background-color: var(--wui-color-bg-125);
  }

  :host([data-clear='true']) > wui-icon {
    display: none;
  }

  svg:first-child,
  wui-image,
  wui-icon {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translateY(-50%) translateX(-50%);
  }

  wui-image {
    width: 25%;
    height: 25%;
    border-radius: var(--wui-border-radius-xs);
  }

  wui-icon {
    width: 100%;
    height: 100%;
    color: var(--local-icon-color) !important;
    transform: translateY(-50%) translateX(-50%) scale(0.25);
  }
`,dP=function(e,t,r,i){var a,o=arguments.length,n=o<3?t:null===i?i=Object.getOwnPropertyDescriptor(t,r):i;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)n=Reflect.decorate(e,t,r,i);else for(var s=e.length-1;s>=0;s--)(a=e[s])&&(n=(o<3?a(n):o>3?a(t,r,n):a(t,r))||n);return o>3&&n&&Object.defineProperty(t,r,n),n};let dR=class extends sI{constructor(){super(...arguments),this.uri="",this.size=0,this.theme="dark",this.imageSrc=void 0,this.alt=void 0,this.arenaClear=void 0,this.farcaster=void 0}render(){return this.dataset.theme=this.theme,this.dataset.clear=String(this.arenaClear),this.style.cssText=`
     --local-size: ${this.size}px;
     --local-icon-color: ${this.color??"#3396ff"}
    `,ss`${this.templateVisual()} ${this.templateSvg()}`}templateSvg(){let e="light"===this.theme?this.size:this.size-32;return sl`
      <svg height=${e} width=${e}>
        ${dT.generate({uri:this.uri,size:e,logoSize:this.arenaClear?0:e/4,dotColor:this.color})}
      </svg>
    `}templateVisual(){return this.imageSrc?ss`<wui-image src=${this.imageSrc} alt=${this.alt??"logo"}></wui-image>`:this.farcaster?ss`<wui-icon
        class="farcaster"
        size="inherit"
        color="inherit"
        name="farcaster"
      ></wui-icon>`:ss`<wui-icon size="inherit" color="inherit" name="walletConnect"></wui-icon>`}};dR.styles=[sO,dO],dP([lt()],dR.prototype,"uri",void 0),dP([lt({type:Number})],dR.prototype,"size",void 0),dP([lt()],dR.prototype,"theme",void 0),dP([lt()],dR.prototype,"imageSrc",void 0),dP([lt()],dR.prototype,"alt",void 0),dP([lt()],dR.prototype,"color",void 0),dP([lt({type:Boolean})],dR.prototype,"arenaClear",void 0),dP([lt({type:Boolean})],dR.prototype,"farcaster",void 0),dR=dP([sL("wui-qr-code")],dR);var d$=nP`
  :host {
    display: block;
    box-shadow: inset 0 0 0 1px var(--wui-color-gray-glass-005);
    background: linear-gradient(
      120deg,
      var(--wui-color-bg-200) 5%,
      var(--wui-color-bg-200) 48%,
      var(--wui-color-bg-300) 55%,
      var(--wui-color-bg-300) 60%,
      var(--wui-color-bg-300) calc(60% + 10px),
      var(--wui-color-bg-200) calc(60% + 12px),
      var(--wui-color-bg-200) 100%
    );
    background-size: 250%;
    animation: shimmer 3s linear infinite reverse;
  }

  :host([variant='light']) {
    background: linear-gradient(
      120deg,
      var(--wui-color-bg-150) 5%,
      var(--wui-color-bg-150) 48%,
      var(--wui-color-bg-200) 55%,
      var(--wui-color-bg-200) 60%,
      var(--wui-color-bg-200) calc(60% + 10px),
      var(--wui-color-bg-150) calc(60% + 12px),
      var(--wui-color-bg-150) 100%
    );
    background-size: 250%;
  }

  @keyframes shimmer {
    from {
      background-position: -250% 0;
    }
    to {
      background-position: 250% 0;
    }
  }
`,dL=function(e,t,r,i){var a,o=arguments.length,n=o<3?t:null===i?i=Object.getOwnPropertyDescriptor(t,r):i;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)n=Reflect.decorate(e,t,r,i);else for(var s=e.length-1;s>=0;s--)(a=e[s])&&(n=(o<3?a(n):o>3?a(t,r,n):a(t,r))||n);return o>3&&n&&Object.defineProperty(t,r,n),n};let dB=class extends sI{constructor(){super(...arguments),this.width="",this.height="",this.borderRadius="m",this.variant="default"}render(){return this.style.cssText=`
      width: ${this.width};
      height: ${this.height};
      border-radius: clamp(0px,var(--wui-border-radius-${this.borderRadius}), 40px);
    `,ss`<slot></slot>`}};dB.styles=[d$],dL([lt()],dB.prototype,"width",void 0),dL([lt()],dB.prototype,"height",void 0),dL([lt()],dB.prototype,"borderRadius",void 0),dL([lt()],dB.prototype,"variant",void 0),dB=dL([sL("wui-shimmer")],dB);var dM=nP`
  .reown-logo {
    height: var(--wui-spacing-xxl);
  }
`;let dU=class extends sI{render(){return ss`
      <wui-flex
        justifyContent="center"
        alignItems="center"
        gap="xs"
        .padding=${["0","0","l","0"]}
      >
        <wui-text variant="small-500" color="fg-100"> UX by </wui-text>
        <wui-icon name="reown" size="xxxl" class="reown-logo"></wui-icon>
      </wui-flex>
    `}};dU.styles=[sO,sP,dM],dU=function(e,t,r,i){var a,o=arguments.length,n=o<3?t:null===i?i=Object.getOwnPropertyDescriptor(t,r):i;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)n=Reflect.decorate(e,t,r,i);else for(var s=e.length-1;s>=0;s--)(a=e[s])&&(n=(o<3?a(n):o>3?a(t,r,n):a(t,r))||n);return o>3&&n&&Object.defineProperty(t,r,n),n}([sL("wui-ux-by-reown")],dU);var dz=nP`
  @keyframes fadein {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }

  wui-shimmer {
    width: 100%;
    aspect-ratio: 1 / 1;
    border-radius: clamp(0px, var(--wui-border-radius-l), 40px) !important;
  }

  wui-qr-code {
    opacity: 0;
    animation-duration: 200ms;
    animation-timing-function: ease;
    animation-name: fadein;
    animation-fill-mode: forwards;
  }
`;let dD=class extends cW{constructor(){super(),this.forceUpdate=()=>{this.requestUpdate()},window.addEventListener("resize",this.forceUpdate),eJ.sendEvent({type:"track",event:"SELECT_WALLET",properties:{name:this.wallet?.name??"WalletConnect",platform:"qrcode"}})}disconnectedCallback(){super.disconnectedCallback(),this.unsubscribe?.forEach(e=>e()),window.removeEventListener("resize",this.forceUpdate)}render(){return this.onRenderProxy(),ss`
      <wui-flex
        flexDirection="column"
        alignItems="center"
        .padding=${["0","xl","xl","xl"]}
        gap="xl"
      >
        <wui-shimmer borderRadius="l" width="100%"> ${this.qrCodeTemplate()} </wui-shimmer>

        <wui-text variant="paragraph-500" color="fg-100">
          Scan this QR Code with your phone
        </wui-text>
        ${this.copyTemplate()}
      </wui-flex>
      <w3m-mobile-download-links .wallet=${this.wallet}></w3m-mobile-download-links>
    `}onRenderProxy(){!this.ready&&this.uri&&(this.timeout=setTimeout(()=>{this.ready=!0},200))}qrCodeTemplate(){if(!this.uri||!this.ready)return null;let e=this.getBoundingClientRect().width-40,t=this.wallet?this.wallet.name:void 0;return tc.setWcLinking(void 0),tc.setRecentWallet(this.wallet),ss` <wui-qr-code
      size=${e}
      theme=${e6.state.themeMode}
      uri=${this.uri}
      imageSrc=${ln(eH.getWalletImage(this.wallet))}
      color=${ln(e6.state.themeVariables["--w3m-qr-color"])}
      alt=${ln(t)}
      data-testid="wui-qr-code"
    ></wui-qr-code>`}copyTemplate(){let e=!this.uri||!this.ready;return ss`<wui-link
      .disabled=${e}
      @click=${this.onCopyUri}
      color="fg-200"
      data-testid="copy-wc2-uri"
    >
      <wui-icon size="xs" color="fg-200" slot="iconLeft" name="copy"></wui-icon>
      Copy link
    </wui-link>`}};dD.styles=dz,dD=function(e,t,r,i){var a,o=arguments.length,n=o<3?t:null===i?i=Object.getOwnPropertyDescriptor(t,r):i;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)n=Reflect.decorate(e,t,r,i);else for(var s=e.length-1;s>=0;s--)(a=e[s])&&(n=(o<3?a(n):o>3?a(t,r,n):a(t,r))||n);return o>3&&n&&Object.defineProperty(t,r,n),n}([sL("w3m-connecting-wc-qrcode")],dD);let dj=class extends sI{constructor(){if(super(),this.wallet=e5.state.data?.wallet,!this.wallet)throw Error("w3m-connecting-wc-unsupported: No wallet provided");eJ.sendEvent({type:"track",event:"SELECT_WALLET",properties:{name:this.wallet.name,platform:"browser"}})}render(){return ss`
      <wui-flex
        flexDirection="column"
        alignItems="center"
        .padding=${["3xl","xl","xl","xl"]}
        gap="xl"
      >
        <wui-wallet-image
          size="lg"
          imageSrc=${ln(eH.getWalletImage(this.wallet))}
        ></wui-wallet-image>

        <wui-text variant="paragraph-500" color="fg-100">Not Detected</wui-text>
      </wui-flex>

      <w3m-mobile-download-links .wallet=${this.wallet}></w3m-mobile-download-links>
    `}};dj=function(e,t,r,i){var a,o=arguments.length,n=o<3?t:null===i?i=Object.getOwnPropertyDescriptor(t,r):i;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)n=Reflect.decorate(e,t,r,i);else for(var s=e.length-1;s>=0;s--)(a=e[s])&&(n=(o<3?a(n):o>3?a(t,r,n):a(t,r))||n);return o>3&&n&&Object.defineProperty(t,r,n),n}([sL("w3m-connecting-wc-unsupported")],dj);var dW=function(e,t,r,i){var a,o=arguments.length,n=o<3?t:null===i?i=Object.getOwnPropertyDescriptor(t,r):i;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)n=Reflect.decorate(e,t,r,i);else for(var s=e.length-1;s>=0;s--)(a=e[s])&&(n=(o<3?a(n):o>3?a(t,r,n):a(t,r))||n);return o>3&&n&&Object.defineProperty(t,r,n),n};let dH=class extends cW{constructor(){if(super(),this.isLoading=!0,!this.wallet)throw Error("w3m-connecting-wc-web: No wallet provided");this.onConnect=this.onConnectProxy.bind(this),this.secondaryBtnLabel="Open",this.secondaryLabel="Open and continue in a new browser tab",this.secondaryBtnIcon="externalLink",this.updateLoadingState(),this.unsubscribe.push(tc.subscribeKey("wcUri",()=>{this.updateLoadingState()})),eJ.sendEvent({type:"track",event:"SELECT_WALLET",properties:{name:this.wallet.name,platform:"web"}})}updateLoadingState(){this.isLoading=!this.uri}onConnectProxy(){if(this.wallet?.webapp_link&&this.uri)try{this.error=!1;let{webapp_link:e,name:t}=this.wallet,{redirect:r,href:i}=eL.formatUniversalUrl(e,this.uri);tc.setWcLinking({name:t,href:i}),tc.setRecentWallet(this.wallet),eL.openHref(r,"_blank")}catch{this.error=!0}}};dW([lr()],dH.prototype,"isLoading",void 0),dH=dW([sL("w3m-connecting-wc-web")],dH);var dF=function(e,t,r,i){var a,o=arguments.length,n=o<3?t:null===i?i=Object.getOwnPropertyDescriptor(t,r):i;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)n=Reflect.decorate(e,t,r,i);else for(var s=e.length-1;s>=0;s--)(a=e[s])&&(n=(o<3?a(n):o>3?a(t,r,n):a(t,r))||n);return o>3&&n&&Object.defineProperty(t,r,n),n};let dV=class extends sI{constructor(){super(),this.wallet=e5.state.data?.wallet,this.platform=void 0,this.platforms=[],this.isSiwxEnabled=!!eZ.state.siwx,this.determinePlatforms(),this.initializeConnection()}render(){return ss`
      ${this.headerTemplate()}
      <div>${this.platformTemplate()}</div>
      <wui-ux-by-reown></wui-ux-by-reown>
    `}async initializeConnection(e=!1){if(!("browser"===this.platform||eZ.state.manualWCControl&&!e))try{let{wcPairingExpiry:t,status:r}=tc.state;(e||eZ.state.enableEmbedded||eL.isPairingExpired(t)||"connecting"===r)&&(await tc.connectWalletConnect(),this.isSiwxEnabled||oB.close())}catch(e){eJ.sendEvent({type:"track",event:"CONNECT_ERROR",properties:{message:e?.message??"Unknown"}}),tc.setWcError(!0),ta.showError(e.message??"Connection error"),tc.resetWcConnection(),e5.goBack()}}determinePlatforms(){if(!this.wallet){this.platforms.push("qrcode"),this.platform="qrcode";return}if(this.platform)return;let{mobile_link:e,desktop_link:t,webapp_link:r,injected:i,rdns:a}=this.wallet,o=i?.map(({injected_id:e})=>e).filter(Boolean),n=[...a?[a]:o??[]],s=!eZ.state.isUniversalProvider&&n.length,l=tc.checkInstalled(n),c=s&&l,d=t&&!eL.isMobile();c&&!oS.state.noAdapters&&this.platforms.push("browser"),e&&this.platforms.push(eL.isMobile()?"mobile":"qrcode"),r&&this.platforms.push("web"),d&&this.platforms.push("desktop"),c||!s||oS.state.noAdapters||this.platforms.push("unsupported"),this.platform=this.platforms[0]}platformTemplate(){switch(this.platform){case"browser":return ss`<w3m-connecting-wc-browser></w3m-connecting-wc-browser>`;case"web":return ss`<w3m-connecting-wc-web></w3m-connecting-wc-web>`;case"desktop":return ss`
          <w3m-connecting-wc-desktop .onRetry=${()=>this.initializeConnection(!0)}>
          </w3m-connecting-wc-desktop>
        `;case"mobile":return ss`
          <w3m-connecting-wc-mobile isMobile .onRetry=${()=>this.initializeConnection(!0)}>
          </w3m-connecting-wc-mobile>
        `;case"qrcode":return ss`<w3m-connecting-wc-qrcode></w3m-connecting-wc-qrcode>`;default:return ss`<w3m-connecting-wc-unsupported></w3m-connecting-wc-unsupported>`}}headerTemplate(){return this.platforms.length>1?ss`
      <w3m-connecting-header
        .platforms=${this.platforms}
        .onSelectPlatfrom=${this.onSelectPlatform.bind(this)}
      >
      </w3m-connecting-header>
    `:null}async onSelectPlatform(e){let t=this.shadowRoot?.querySelector("div");t&&(await t.animate([{opacity:1},{opacity:0}],{duration:200,fill:"forwards",easing:"ease"}).finished,this.platform=e,t.animate([{opacity:0},{opacity:1}],{duration:200,fill:"forwards",easing:"ease"}))}};dF([lr()],dV.prototype,"platform",void 0),dF([lr()],dV.prototype,"platforms",void 0),dF([lr()],dV.prototype,"isSiwxEnabled",void 0),dV=dF([sL("w3m-connecting-wc-view")],dV);var dZ=function(e,t,r,i){var a,o=arguments.length,n=o<3?t:null===i?i=Object.getOwnPropertyDescriptor(t,r):i;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)n=Reflect.decorate(e,t,r,i);else for(var s=e.length-1;s>=0;s--)(a=e[s])&&(n=(o<3?a(n):o>3?a(t,r,n):a(t,r))||n);return o>3&&n&&Object.defineProperty(t,r,n),n};let dq=class extends sI{constructor(){super(...arguments),this.isMobile=eL.isMobile()}render(){if(this.isMobile){let{featured:e,recommended:t}=e2.state,{customWallets:r}=eZ.state,i=e$.getRecentWallets(),a=e.length||t.length||r?.length||i.length;return ss`<wui-flex
        flexDirection="column"
        gap="xs"
        .margin=${["3xs","s","s","s"]}
      >
        ${a?ss`<w3m-connector-list></w3m-connector-list>`:null}
        <w3m-all-wallets-widget></w3m-all-wallets-widget>
      </wui-flex>`}return ss`<wui-flex flexDirection="column" .padding=${["0","0","l","0"]}>
      <w3m-connecting-wc-view></w3m-connecting-wc-view>
      <wui-flex flexDirection="column" .padding=${["0","m","0","m"]}>
        <w3m-all-wallets-widget></w3m-all-wallets-widget> </wui-flex
    ></wui-flex>`}};dZ([lr()],dq.prototype,"isMobile",void 0),dq=dZ([sL("w3m-connecting-wc-basic-view")],dq);let dG=()=>new dK;class dK{}let dY=new WeakMap,dX=lc(class extends lm{render(e){return sd}update(e,[t]){let r=t!==this.G;return r&&void 0!==this.G&&this.rt(void 0),(r||this.lt!==this.ct)&&(this.G=t,this.ht=e.options?.host,this.rt(this.ct=e.element)),sd}rt(e){if(this.isConnected||(e=void 0),"function"==typeof this.G){let t=this.ht??globalThis,r=dY.get(t);void 0===r&&(r=new WeakMap,dY.set(t,r)),void 0!==r.get(this.G)&&this.G.call(this.ht,void 0),r.set(this.G,e),void 0!==e&&this.G.call(this.ht,e)}else this.G.value=e}get lt(){return"function"==typeof this.G?dY.get(this.ht??globalThis)?.get(this.G):this.G?.value}disconnected(){this.lt===this.ct&&this.rt(void 0)}reconnected(){this.rt(this.ct)}});var dJ=nP`
  :host {
    display: flex;
    align-items: center;
    justify-content: center;
  }

  label {
    position: relative;
    display: inline-block;
    width: 32px;
    height: 22px;
  }

  input {
    width: 0;
    height: 0;
    opacity: 0;
  }

  span {
    position: absolute;
    cursor: pointer;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: var(--wui-color-blue-100);
    border-width: 1px;
    border-style: solid;
    border-color: var(--wui-color-gray-glass-002);
    border-radius: 999px;
    transition:
      background-color var(--wui-ease-inout-power-1) var(--wui-duration-md),
      border-color var(--wui-ease-inout-power-1) var(--wui-duration-md);
    will-change: background-color, border-color;
  }

  span:before {
    position: absolute;
    content: '';
    height: 16px;
    width: 16px;
    left: 3px;
    top: 2px;
    background-color: var(--wui-color-inverse-100);
    transition: transform var(--wui-ease-inout-power-1) var(--wui-duration-lg);
    will-change: transform;
    border-radius: 50%;
  }

  input:checked + span {
    border-color: var(--wui-color-gray-glass-005);
    background-color: var(--wui-color-blue-100);
  }

  input:not(:checked) + span {
    background-color: var(--wui-color-gray-glass-010);
  }

  input:checked + span:before {
    transform: translateX(calc(100% - 7px));
  }
`,dQ=function(e,t,r,i){var a,o=arguments.length,n=o<3?t:null===i?i=Object.getOwnPropertyDescriptor(t,r):i;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)n=Reflect.decorate(e,t,r,i);else for(var s=e.length-1;s>=0;s--)(a=e[s])&&(n=(o<3?a(n):o>3?a(t,r,n):a(t,r))||n);return o>3&&n&&Object.defineProperty(t,r,n),n};let d0=class extends sI{constructor(){super(...arguments),this.inputElementRef=dG(),this.checked=void 0}render(){return ss`
      <label>
        <input
          ${dX(this.inputElementRef)}
          type="checkbox"
          ?checked=${ln(this.checked)}
          @change=${this.dispatchChangeEvent.bind(this)}
        />
        <span></span>
      </label>
    `}dispatchChangeEvent(){this.dispatchEvent(new CustomEvent("switchChange",{detail:this.inputElementRef.value?.checked,bubbles:!0,composed:!0}))}};d0.styles=[sO,sP,sR,dJ],dQ([lt({type:Boolean})],d0.prototype,"checked",void 0),d0=dQ([sL("wui-switch")],d0);var d1=nP`
  :host {
    height: 100%;
  }

  button {
    display: flex;
    align-items: center;
    justify-content: center;
    column-gap: var(--wui-spacing-1xs);
    padding: var(--wui-spacing-xs) var(--wui-spacing-s);
    background-color: var(--wui-color-gray-glass-002);
    border-radius: var(--wui-border-radius-xs);
    box-shadow: inset 0 0 0 1px var(--wui-color-gray-glass-002);
    transition: background-color var(--wui-ease-out-power-1) var(--wui-duration-md);
    will-change: background-color;
    cursor: pointer;
  }

  wui-switch {
    pointer-events: none;
  }
`,d2=function(e,t,r,i){var a,o=arguments.length,n=o<3?t:null===i?i=Object.getOwnPropertyDescriptor(t,r):i;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)n=Reflect.decorate(e,t,r,i);else for(var s=e.length-1;s>=0;s--)(a=e[s])&&(n=(o<3?a(n):o>3?a(t,r,n):a(t,r))||n);return o>3&&n&&Object.defineProperty(t,r,n),n};let d3=class extends sI{constructor(){super(...arguments),this.checked=void 0}render(){return ss`
      <button>
        <wui-icon size="xl" name="walletConnectBrown"></wui-icon>
        <wui-switch ?checked=${ln(this.checked)}></wui-switch>
      </button>
    `}};d3.styles=[sO,sP,d1],d2([lt({type:Boolean})],d3.prototype,"checked",void 0),d3=d2([sL("wui-certified-switch")],d3);var d5=nP`
  button {
    background-color: var(--wui-color-fg-300);
    border-radius: var(--wui-border-radius-4xs);
    width: 16px;
    height: 16px;
  }

  button:disabled {
    background-color: var(--wui-color-bg-300);
  }

  wui-icon {
    color: var(--wui-color-bg-200) !important;
  }

  button:focus-visible {
    background-color: var(--wui-color-fg-250);
    border: 1px solid var(--wui-color-accent-100);
  }

  @media (hover: hover) and (pointer: fine) {
    button:hover:enabled {
      background-color: var(--wui-color-fg-250);
    }

    button:active:enabled {
      background-color: var(--wui-color-fg-225);
    }
  }
`,d4=function(e,t,r,i){var a,o=arguments.length,n=o<3?t:null===i?i=Object.getOwnPropertyDescriptor(t,r):i;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)n=Reflect.decorate(e,t,r,i);else for(var s=e.length-1;s>=0;s--)(a=e[s])&&(n=(o<3?a(n):o>3?a(t,r,n):a(t,r))||n);return o>3&&n&&Object.defineProperty(t,r,n),n};let d6=class extends sI{constructor(){super(...arguments),this.icon="copy"}render(){return ss`
      <button>
        <wui-icon color="inherit" size="xxs" name=${this.icon}></wui-icon>
      </button>
    `}};d6.styles=[sO,sP,d5],d4([lt()],d6.prototype,"icon",void 0),d6=d4([sL("wui-input-element")],d6);var d8=nP`
  :host {
    position: relative;
    width: 100%;
    display: inline-block;
    color: var(--wui-color-fg-275);
  }

  input {
    width: 100%;
    border-radius: var(--wui-border-radius-xs);
    box-shadow: inset 0 0 0 1px var(--wui-color-gray-glass-002);
    background: var(--wui-color-gray-glass-002);
    font-size: var(--wui-font-size-paragraph);
    letter-spacing: var(--wui-letter-spacing-paragraph);
    color: var(--wui-color-fg-100);
    transition:
      background-color var(--wui-ease-inout-power-1) var(--wui-duration-md),
      border-color var(--wui-ease-inout-power-1) var(--wui-duration-md),
      box-shadow var(--wui-ease-inout-power-1) var(--wui-duration-md);
    will-change: background-color, border-color, box-shadow;
    caret-color: var(--wui-color-accent-100);
  }

  input:disabled {
    cursor: not-allowed;
    border: 1px solid var(--wui-color-gray-glass-010);
  }

  input:disabled::placeholder,
  input:disabled + wui-icon {
    color: var(--wui-color-fg-300);
  }

  input::placeholder {
    color: var(--wui-color-fg-275);
  }

  input:focus:enabled {
    background-color: var(--wui-color-gray-glass-005);
    -webkit-box-shadow:
      inset 0 0 0 1px var(--wui-color-accent-100),
      0px 0px 0px 4px var(--wui-box-shadow-blue);
    -moz-box-shadow:
      inset 0 0 0 1px var(--wui-color-accent-100),
      0px 0px 0px 4px var(--wui-box-shadow-blue);
    box-shadow:
      inset 0 0 0 1px var(--wui-color-accent-100),
      0px 0px 0px 4px var(--wui-box-shadow-blue);
  }

  input:hover:enabled {
    background-color: var(--wui-color-gray-glass-005);
  }

  wui-icon {
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    pointer-events: none;
  }

  .wui-size-sm {
    padding: 9px var(--wui-spacing-m) 10px var(--wui-spacing-s);
  }

  wui-icon + .wui-size-sm {
    padding: 9px var(--wui-spacing-m) 10px 36px;
  }

  wui-icon[data-input='sm'] {
    left: var(--wui-spacing-s);
  }

  .wui-size-md {
    padding: 15px var(--wui-spacing-m) var(--wui-spacing-l) var(--wui-spacing-m);
  }

  wui-icon + .wui-size-md,
  wui-loading-spinner + .wui-size-md {
    padding: 10.5px var(--wui-spacing-3xl) 10.5px var(--wui-spacing-3xl);
  }

  wui-icon[data-input='md'] {
    left: var(--wui-spacing-l);
  }

  .wui-size-lg {
    padding: var(--wui-spacing-s) var(--wui-spacing-s) var(--wui-spacing-s) var(--wui-spacing-l);
    letter-spacing: var(--wui-letter-spacing-medium-title);
    font-size: var(--wui-font-size-medium-title);
    font-weight: var(--wui-font-weight-light);
    line-height: 130%;
    color: var(--wui-color-fg-100);
    height: 64px;
  }

  .wui-padding-right-xs {
    padding-right: var(--wui-spacing-xs);
  }

  .wui-padding-right-s {
    padding-right: var(--wui-spacing-s);
  }

  .wui-padding-right-m {
    padding-right: var(--wui-spacing-m);
  }

  .wui-padding-right-l {
    padding-right: var(--wui-spacing-l);
  }

  .wui-padding-right-xl {
    padding-right: var(--wui-spacing-xl);
  }

  .wui-padding-right-2xl {
    padding-right: var(--wui-spacing-2xl);
  }

  .wui-padding-right-3xl {
    padding-right: var(--wui-spacing-3xl);
  }

  .wui-padding-right-4xl {
    padding-right: var(--wui-spacing-4xl);
  }

  .wui-padding-right-5xl {
    padding-right: var(--wui-spacing-5xl);
  }

  wui-icon + .wui-size-lg,
  wui-loading-spinner + .wui-size-lg {
    padding-left: 50px;
  }

  wui-icon[data-input='lg'] {
    left: var(--wui-spacing-l);
  }

  .wui-size-mdl {
    padding: 17.25px var(--wui-spacing-m) 17.25px var(--wui-spacing-m);
  }
  wui-icon + .wui-size-mdl,
  wui-loading-spinner + .wui-size-mdl {
    padding: 17.25px var(--wui-spacing-3xl) 17.25px 40px;
  }
  wui-icon[data-input='mdl'] {
    left: var(--wui-spacing-m);
  }

  input:placeholder-shown ~ ::slotted(wui-input-element),
  input:placeholder-shown ~ ::slotted(wui-icon) {
    opacity: 0;
    pointer-events: none;
  }

  input::-webkit-outer-spin-button,
  input::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }

  input[type='number'] {
    -moz-appearance: textfield;
  }

  ::slotted(wui-input-element),
  ::slotted(wui-icon) {
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
  }

  ::slotted(wui-input-element) {
    right: var(--wui-spacing-m);
  }

  ::slotted(wui-icon) {
    right: 0px;
  }
`,d9=function(e,t,r,i){var a,o=arguments.length,n=o<3?t:null===i?i=Object.getOwnPropertyDescriptor(t,r):i;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)n=Reflect.decorate(e,t,r,i);else for(var s=e.length-1;s>=0;s--)(a=e[s])&&(n=(o<3?a(n):o>3?a(t,r,n):a(t,r))||n);return o>3&&n&&Object.defineProperty(t,r,n),n};let d7=class extends sI{constructor(){super(...arguments),this.inputElementRef=dG(),this.size="md",this.disabled=!1,this.placeholder="",this.type="text",this.value=""}render(){let e=`wui-padding-right-${this.inputRightPadding}`,t={[`wui-size-${this.size}`]:!0,[e]:!!this.inputRightPadding};return ss`${this.templateIcon()}
      <input
        data-testid="wui-input-text"
        ${dX(this.inputElementRef)}
        class=${lT(t)}
        type=${this.type}
        enterkeyhint=${ln(this.enterKeyHint)}
        ?disabled=${this.disabled}
        placeholder=${this.placeholder}
        @input=${this.dispatchInputChangeEvent.bind(this)}
        .value=${this.value||""}
        tabindex=${ln(this.tabIdx)}
      />
      <slot></slot>`}templateIcon(){return this.icon?ss`<wui-icon
        data-input=${this.size}
        size=${this.size}
        color="inherit"
        name=${this.icon}
      ></wui-icon>`:null}dispatchInputChangeEvent(){this.dispatchEvent(new CustomEvent("inputChange",{detail:this.inputElementRef.value?.value,bubbles:!0,composed:!0}))}};d7.styles=[sO,sP,d8],d9([lt()],d7.prototype,"size",void 0),d9([lt()],d7.prototype,"icon",void 0),d9([lt({type:Boolean})],d7.prototype,"disabled",void 0),d9([lt()],d7.prototype,"placeholder",void 0),d9([lt()],d7.prototype,"type",void 0),d9([lt()],d7.prototype,"keyHint",void 0),d9([lt()],d7.prototype,"value",void 0),d9([lt()],d7.prototype,"inputRightPadding",void 0),d9([lt()],d7.prototype,"tabIdx",void 0),d7=d9([sL("wui-input-text")],d7);var ue=nP`
  :host {
    position: relative;
    display: inline-block;
    width: 100%;
  }
`;let ut=class extends sI{constructor(){super(...arguments),this.inputComponentRef=dG()}render(){return ss`
      <wui-input-text
        ${dX(this.inputComponentRef)}
        placeholder="Search wallet"
        icon="search"
        type="search"
        enterKeyHint="search"
        size="sm"
      >
        <wui-input-element @click=${this.clearValue} icon="close"></wui-input-element>
      </wui-input-text>
    `}clearValue(){let e=this.inputComponentRef.value?.inputElementRef.value;e&&(e.value="",e.focus(),e.dispatchEvent(new Event("input")))}};ut.styles=[sO,ue],ut=function(e,t,r,i){var a,o=arguments.length,n=o<3?t:null===i?i=Object.getOwnPropertyDescriptor(t,r):i;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)n=Reflect.decorate(e,t,r,i);else for(var s=e.length-1;s>=0;s--)(a=e[s])&&(n=(o<3?a(n):o>3?a(t,r,n):a(t,r))||n);return o>3&&n&&Object.defineProperty(t,r,n),n}([sL("wui-search-bar")],ut);let ur=sl`<svg  viewBox="0 0 48 54" fill="none">
  <path
    d="M43.4605 10.7248L28.0485 1.61089C25.5438 0.129705 22.4562 0.129705 19.9515 1.61088L4.53951 10.7248C2.03626 12.2051 0.5 14.9365 0.5 17.886V36.1139C0.5 39.0635 2.03626 41.7949 4.53951 43.2752L19.9515 52.3891C22.4562 53.8703 25.5438 53.8703 28.0485 52.3891L43.4605 43.2752C45.9637 41.7949 47.5 39.0635 47.5 36.114V17.8861C47.5 14.9365 45.9637 12.2051 43.4605 10.7248Z"
  />
</svg>`;var ui=nP`
  :host {
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 104px;
    row-gap: var(--wui-spacing-xs);
    padding: var(--wui-spacing-xs) 10px;
    background-color: var(--wui-color-gray-glass-002);
    border-radius: clamp(0px, var(--wui-border-radius-xs), 20px);
    position: relative;
  }

  wui-shimmer[data-type='network'] {
    border: none;
    -webkit-clip-path: var(--wui-path-network);
    clip-path: var(--wui-path-network);
  }

  svg {
    position: absolute;
    width: 48px;
    height: 54px;
    z-index: 1;
  }

  svg > path {
    stroke: var(--wui-color-gray-glass-010);
    stroke-width: 1px;
  }

  @media (max-width: 350px) {
    :host {
      width: 100%;
    }
  }
`,ua=function(e,t,r,i){var a,o=arguments.length,n=o<3?t:null===i?i=Object.getOwnPropertyDescriptor(t,r):i;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)n=Reflect.decorate(e,t,r,i);else for(var s=e.length-1;s>=0;s--)(a=e[s])&&(n=(o<3?a(n):o>3?a(t,r,n):a(t,r))||n);return o>3&&n&&Object.defineProperty(t,r,n),n};let uo=class extends sI{constructor(){super(...arguments),this.type="wallet"}render(){return ss`
      ${this.shimmerTemplate()}
      <wui-shimmer width="56px" height="20px" borderRadius="xs"></wui-shimmer>
    `}shimmerTemplate(){return"network"===this.type?ss` <wui-shimmer
          data-type=${this.type}
          width="48px"
          height="54px"
          borderRadius="xs"
        ></wui-shimmer>
        ${ur}`:ss`<wui-shimmer width="56px" height="56px" borderRadius="xs"></wui-shimmer>`}};uo.styles=[sO,sP,ui],ua([lt()],uo.prototype,"type",void 0),uo=ua([sL("wui-card-select-loader")],uo);var un=nP`
  :host {
    display: grid;
    width: inherit;
    height: inherit;
  }
`,us=function(e,t,r,i){var a,o=arguments.length,n=o<3?t:null===i?i=Object.getOwnPropertyDescriptor(t,r):i;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)n=Reflect.decorate(e,t,r,i);else for(var s=e.length-1;s>=0;s--)(a=e[s])&&(n=(o<3?a(n):o>3?a(t,r,n):a(t,r))||n);return o>3&&n&&Object.defineProperty(t,r,n),n};let ul=class extends sI{render(){return this.style.cssText=`
      grid-template-rows: ${this.gridTemplateRows};
      grid-template-columns: ${this.gridTemplateColumns};
      justify-items: ${this.justifyItems};
      align-items: ${this.alignItems};
      justify-content: ${this.justifyContent};
      align-content: ${this.alignContent};
      column-gap: ${this.columnGap&&`var(--wui-spacing-${this.columnGap})`};
      row-gap: ${this.rowGap&&`var(--wui-spacing-${this.rowGap})`};
      gap: ${this.gap&&`var(--wui-spacing-${this.gap})`};
      padding-top: ${this.padding&&s$.getSpacingStyles(this.padding,0)};
      padding-right: ${this.padding&&s$.getSpacingStyles(this.padding,1)};
      padding-bottom: ${this.padding&&s$.getSpacingStyles(this.padding,2)};
      padding-left: ${this.padding&&s$.getSpacingStyles(this.padding,3)};
      margin-top: ${this.margin&&s$.getSpacingStyles(this.margin,0)};
      margin-right: ${this.margin&&s$.getSpacingStyles(this.margin,1)};
      margin-bottom: ${this.margin&&s$.getSpacingStyles(this.margin,2)};
      margin-left: ${this.margin&&s$.getSpacingStyles(this.margin,3)};
    `,ss`<slot></slot>`}};ul.styles=[sO,un],us([lt()],ul.prototype,"gridTemplateRows",void 0),us([lt()],ul.prototype,"gridTemplateColumns",void 0),us([lt()],ul.prototype,"justifyItems",void 0),us([lt()],ul.prototype,"alignItems",void 0),us([lt()],ul.prototype,"justifyContent",void 0),us([lt()],ul.prototype,"alignContent",void 0),us([lt()],ul.prototype,"columnGap",void 0),us([lt()],ul.prototype,"rowGap",void 0),us([lt()],ul.prototype,"gap",void 0),us([lt()],ul.prototype,"padding",void 0),us([lt()],ul.prototype,"margin",void 0),ul=us([sL("wui-grid")],ul);var uc=nP`
  button {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    cursor: pointer;
    width: 104px;
    row-gap: var(--wui-spacing-xs);
    padding: var(--wui-spacing-s) var(--wui-spacing-0);
    background-color: var(--wui-color-gray-glass-002);
    border-radius: clamp(0px, var(--wui-border-radius-xs), 20px);
    transition:
      color var(--wui-duration-lg) var(--wui-ease-out-power-1),
      background-color var(--wui-duration-lg) var(--wui-ease-out-power-1),
      border-radius var(--wui-duration-lg) var(--wui-ease-out-power-1);
    will-change: background-color, color, border-radius;
    outline: none;
    border: none;
  }

  button > wui-flex > wui-text {
    color: var(--wui-color-fg-100);
    max-width: 86px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    justify-content: center;
  }

  button > wui-flex > wui-text.certified {
    max-width: 66px;
  }

  button:hover:enabled {
    background-color: var(--wui-color-gray-glass-005);
  }

  button:disabled > wui-flex > wui-text {
    color: var(--wui-color-gray-glass-015);
  }

  [data-selected='true'] {
    background-color: var(--wui-color-accent-glass-020);
  }

  @media (hover: hover) and (pointer: fine) {
    [data-selected='true']:hover:enabled {
      background-color: var(--wui-color-accent-glass-015);
    }
  }

  [data-selected='true']:active:enabled {
    background-color: var(--wui-color-accent-glass-010);
  }

  @media (max-width: 350px) {
    button {
      width: 100%;
    }
  }
`,ud=function(e,t,r,i){var a,o=arguments.length,n=o<3?t:null===i?i=Object.getOwnPropertyDescriptor(t,r):i;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)n=Reflect.decorate(e,t,r,i);else for(var s=e.length-1;s>=0;s--)(a=e[s])&&(n=(o<3?a(n):o>3?a(t,r,n):a(t,r))||n);return o>3&&n&&Object.defineProperty(t,r,n),n};let uu=class extends sI{constructor(){super(),this.observer=new IntersectionObserver(()=>{}),this.visible=!1,this.imageSrc=void 0,this.imageLoading=!1,this.wallet=void 0,this.observer=new IntersectionObserver(e=>{e.forEach(e=>{e.isIntersecting?(this.visible=!0,this.fetchImageSrc()):this.visible=!1})},{threshold:.01})}firstUpdated(){this.observer.observe(this)}disconnectedCallback(){this.observer.disconnect()}render(){let e=this.wallet?.badge_type==="certified";return ss`
      <button>
        ${this.imageTemplate()}
        <wui-flex flexDirection="row" alignItems="center" justifyContent="center" gap="3xs">
          <wui-text
            variant="tiny-500"
            color="inherit"
            class=${ln(e?"certified":void 0)}
            >${this.wallet?.name}</wui-text
          >
          ${e?ss`<wui-icon size="sm" name="walletConnectBrown"></wui-icon>`:null}
        </wui-flex>
      </button>
    `}imageTemplate(){return(this.visible||this.imageSrc)&&!this.imageLoading?ss`
      <wui-wallet-image
        size="md"
        imageSrc=${ln(this.imageSrc)}
        name=${this.wallet?.name}
        .installed=${this.wallet?.installed}
        badgeSize="sm"
      >
      </wui-wallet-image>
    `:this.shimmerTemplate()}shimmerTemplate(){return ss`<wui-shimmer width="56px" height="56px" borderRadius="xs"></wui-shimmer>`}async fetchImageSrc(){this.wallet&&(this.imageSrc=eH.getWalletImage(this.wallet),this.imageSrc||(this.imageLoading=!0,this.imageSrc=await eH.fetchWalletImage(this.wallet.image_id),this.imageLoading=!1))}};uu.styles=uc,ud([lr()],uu.prototype,"visible",void 0),ud([lr()],uu.prototype,"imageSrc",void 0),ud([lr()],uu.prototype,"imageLoading",void 0),ud([lt()],uu.prototype,"wallet",void 0),uu=ud([sL("w3m-all-wallets-list-item")],uu);var uh=nP`
  wui-grid {
    max-height: clamp(360px, 400px, 80vh);
    overflow: scroll;
    scrollbar-width: none;
    grid-auto-rows: min-content;
    grid-template-columns: repeat(auto-fill, 104px);
  }

  @media (max-width: 350px) {
    wui-grid {
      grid-template-columns: repeat(2, 1fr);
    }
  }

  wui-grid[data-scroll='false'] {
    overflow: hidden;
  }

  wui-grid::-webkit-scrollbar {
    display: none;
  }

  wui-loading-spinner {
    padding-top: var(--wui-spacing-l);
    padding-bottom: var(--wui-spacing-l);
    justify-content: center;
    grid-column: 1 / span 4;
  }
`,up=function(e,t,r,i){var a,o=arguments.length,n=o<3?t:null===i?i=Object.getOwnPropertyDescriptor(t,r):i;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)n=Reflect.decorate(e,t,r,i);else for(var s=e.length-1;s>=0;s--)(a=e[s])&&(n=(o<3?a(n):o>3?a(t,r,n):a(t,r))||n);return o>3&&n&&Object.defineProperty(t,r,n),n};let ug="local-paginator",uf=class extends sI{constructor(){super(),this.unsubscribe=[],this.paginationObserver=void 0,this.loading=!e2.state.wallets.length,this.wallets=e2.state.wallets,this.recommended=e2.state.recommended,this.featured=e2.state.featured,this.unsubscribe.push(e2.subscribeKey("wallets",e=>this.wallets=e),e2.subscribeKey("recommended",e=>this.recommended=e),e2.subscribeKey("featured",e=>this.featured=e))}firstUpdated(){this.initialFetch(),this.createPaginationObserver()}disconnectedCallback(){this.unsubscribe.forEach(e=>e()),this.paginationObserver?.disconnect()}render(){return ss`
      <wui-grid
        data-scroll=${!this.loading}
        .padding=${["0","s","s","s"]}
        columnGap="xxs"
        rowGap="l"
        justifyContent="space-between"
      >
        ${this.loading?this.shimmerTemplate(16):this.walletsTemplate()}
        ${this.paginationLoaderTemplate()}
      </wui-grid>
    `}async initialFetch(){this.loading=!0;let e=this.shadowRoot?.querySelector("wui-grid");e&&(await e2.fetchWalletsByPage({page:1}),await e.animate([{opacity:1},{opacity:0}],{duration:200,fill:"forwards",easing:"ease"}).finished,this.loading=!1,e.animate([{opacity:0},{opacity:1}],{duration:200,fill:"forwards",easing:"ease"}))}shimmerTemplate(e,t){return[...Array(e)].map(()=>ss`
        <wui-card-select-loader type="wallet" id=${ln(t)}></wui-card-select-loader>
      `)}walletsTemplate(){let e=eL.uniqueBy([...this.featured,...this.recommended,...this.wallets],"id");return nk.markWalletsAsInstalled(e).map(e=>ss`
        <w3m-all-wallets-list-item
          @click=${()=>this.onConnectWallet(e)}
          .wallet=${e}
        ></w3m-all-wallets-list-item>
      `)}paginationLoaderTemplate(){let{wallets:e,recommended:t,featured:r,count:i}=e2.state,a=window.innerWidth<352?3:4,o=e.length+t.length,n=Math.ceil(o/a)*a-o+a;return n-=e.length?r.length%a:0,0===i&&r.length>0?null:0===i||[...r,...e,...t].length<i?this.shimmerTemplate(n,ug):null}createPaginationObserver(){let e=this.shadowRoot?.querySelector(`#${ug}`);e&&(this.paginationObserver=new IntersectionObserver(([e])=>{if(e?.isIntersecting&&!this.loading){let{page:e,count:t,wallets:r}=e2.state;r.length<t&&e2.fetchWalletsByPage({page:e+1})}}),this.paginationObserver.observe(e))}onConnectWallet(e){e7.selectWalletConnector(e)}};uf.styles=uh,up([lr()],uf.prototype,"loading",void 0),up([lr()],uf.prototype,"wallets",void 0),up([lr()],uf.prototype,"recommended",void 0),up([lr()],uf.prototype,"featured",void 0),uf=up([sL("w3m-all-wallets-list")],uf);var uw=nP`
  wui-grid,
  wui-loading-spinner,
  wui-flex {
    height: 360px;
  }

  wui-grid {
    overflow: scroll;
    scrollbar-width: none;
    grid-auto-rows: min-content;
    grid-template-columns: repeat(auto-fill, 104px);
  }

  wui-grid[data-scroll='false'] {
    overflow: hidden;
  }

  wui-grid::-webkit-scrollbar {
    display: none;
  }

  wui-loading-spinner {
    justify-content: center;
    align-items: center;
  }

  @media (max-width: 350px) {
    wui-grid {
      grid-template-columns: repeat(2, 1fr);
    }
  }
`,um=function(e,t,r,i){var a,o=arguments.length,n=o<3?t:null===i?i=Object.getOwnPropertyDescriptor(t,r):i;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)n=Reflect.decorate(e,t,r,i);else for(var s=e.length-1;s>=0;s--)(a=e[s])&&(n=(o<3?a(n):o>3?a(t,r,n):a(t,r))||n);return o>3&&n&&Object.defineProperty(t,r,n),n};let uv=class extends sI{constructor(){super(...arguments),this.prevQuery="",this.prevBadge=void 0,this.loading=!0,this.query=""}render(){return this.onSearch(),this.loading?ss`<wui-loading-spinner color="accent-100"></wui-loading-spinner>`:this.walletsTemplate()}async onSearch(){(this.query.trim()!==this.prevQuery.trim()||this.badge!==this.prevBadge)&&(this.prevQuery=this.query,this.prevBadge=this.badge,this.loading=!0,await e2.searchWallet({search:this.query,badge:this.badge}),this.loading=!1)}walletsTemplate(){let{search:e}=e2.state,t=nk.markWalletsAsInstalled(e);return e.length?ss`
      <wui-grid
        data-testid="wallet-list"
        .padding=${["0","s","s","s"]}
        rowGap="l"
        columnGap="xs"
        justifyContent="space-between"
      >
        ${t.map(e=>ss`
            <w3m-all-wallets-list-item
              @click=${()=>this.onConnectWallet(e)}
              .wallet=${e}
              data-testid="wallet-search-item-${e.id}"
            ></w3m-all-wallets-list-item>
          `)}
      </wui-grid>
    `:ss`
        <wui-flex
          data-testid="no-wallet-found"
          justifyContent="center"
          alignItems="center"
          gap="s"
          flexDirection="column"
        >
          <wui-icon-box
            size="lg"
            iconColor="fg-200"
            backgroundColor="fg-300"
            icon="wallet"
            background="transparent"
          ></wui-icon-box>
          <wui-text data-testid="no-wallet-found-text" color="fg-200" variant="paragraph-500">
            No Wallet found
          </wui-text>
        </wui-flex>
      `}onConnectWallet(e){e7.selectWalletConnector(e)}};uv.styles=uw,um([lr()],uv.prototype,"loading",void 0),um([lt()],uv.prototype,"query",void 0),um([lt()],uv.prototype,"badge",void 0),uv=um([sL("w3m-all-wallets-search")],uv);var ub=function(e,t,r,i){var a,o=arguments.length,n=o<3?t:null===i?i=Object.getOwnPropertyDescriptor(t,r):i;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)n=Reflect.decorate(e,t,r,i);else for(var s=e.length-1;s>=0;s--)(a=e[s])&&(n=(o<3?a(n):o>3?a(t,r,n):a(t,r))||n);return o>3&&n&&Object.defineProperty(t,r,n),n};let uy=class extends sI{constructor(){super(...arguments),this.search="",this.onDebouncedSearch=eL.debounce(e=>{this.search=e})}render(){let e=this.search.length>=2;return ss`
      <wui-flex .padding=${["0","s","s","s"]} gap="xs">
        <wui-search-bar @inputChange=${this.onInputChange.bind(this)}></wui-search-bar>
        <wui-certified-switch
          ?checked=${this.badge}
          @click=${this.onClick.bind(this)}
          data-testid="wui-certified-switch"
        ></wui-certified-switch>
        ${this.qrButtonTemplate()}
      </wui-flex>
      ${e||this.badge?ss`<w3m-all-wallets-search
            query=${this.search}
            badge=${ln(this.badge)}
          ></w3m-all-wallets-search>`:ss`<w3m-all-wallets-list badge=${ln(this.badge)}></w3m-all-wallets-list>`}
    `}onInputChange(e){this.onDebouncedSearch(e.detail)}onClick(){if("certified"===this.badge){this.badge=void 0;return}this.badge="certified",ta.showSvg("Only WalletConnect certified",{icon:"walletConnectBrown",iconColor:"accent-100"})}qrButtonTemplate(){return eL.isMobile()?ss`
        <wui-icon-box
          size="lg"
          iconSize="xl"
          iconColor="accent-100"
          backgroundColor="accent-100"
          icon="qrCode"
          background="transparent"
          border
          borderColor="wui-accent-glass-010"
          @click=${this.onWalletConnectQr.bind(this)}
        ></wui-icon-box>
      `:null}onWalletConnectQr(){e5.push("ConnectingWalletConnect")}};ub([lr()],uy.prototype,"search",void 0),ub([lr()],uy.prototype,"badge",void 0),uy=ub([sL("w3m-all-wallets-view")],uy);var uC=nP`
  button {
    column-gap: var(--wui-spacing-s);
    padding: 11px 18px 11px var(--wui-spacing-s);
    width: 100%;
    background-color: var(--wui-color-gray-glass-002);
    border-radius: var(--wui-border-radius-xs);
    color: var(--wui-color-fg-250);
    transition:
      color var(--wui-ease-out-power-1) var(--wui-duration-md),
      background-color var(--wui-ease-out-power-1) var(--wui-duration-md);
    will-change: color, background-color;
  }

  button[data-iconvariant='square'],
  button[data-iconvariant='square-blue'] {
    padding: 6px 18px 6px 9px;
  }

  button > wui-flex {
    flex: 1;
  }

  button > wui-image {
    width: 32px;
    height: 32px;
    box-shadow: 0 0 0 2px var(--wui-color-gray-glass-005);
    border-radius: var(--wui-border-radius-3xl);
  }

  button > wui-icon {
    width: 36px;
    height: 36px;
    transition: opacity var(--wui-ease-out-power-1) var(--wui-duration-md);
    will-change: opacity;
  }

  button > wui-icon-box[data-variant='blue'] {
    box-shadow: 0 0 0 2px var(--wui-color-accent-glass-005);
  }

  button > wui-icon-box[data-variant='overlay'] {
    box-shadow: 0 0 0 2px var(--wui-color-gray-glass-005);
  }

  button > wui-icon-box[data-variant='square-blue'] {
    border-radius: var(--wui-border-radius-3xs);
    position: relative;
    border: none;
    width: 36px;
    height: 36px;
  }

  button > wui-icon-box[data-variant='square-blue']::after {
    content: '';
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    border-radius: inherit;
    border: 1px solid var(--wui-color-accent-glass-010);
    pointer-events: none;
  }

  button > wui-icon:last-child {
    width: 14px;
    height: 14px;
  }

  button:disabled {
    color: var(--wui-color-gray-glass-020);
  }

  button[data-loading='true'] > wui-icon {
    opacity: 0;
  }

  wui-loading-spinner {
    position: absolute;
    right: 18px;
    top: 50%;
    transform: translateY(-50%);
  }
`,ux=function(e,t,r,i){var a,o=arguments.length,n=o<3?t:null===i?i=Object.getOwnPropertyDescriptor(t,r):i;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)n=Reflect.decorate(e,t,r,i);else for(var s=e.length-1;s>=0;s--)(a=e[s])&&(n=(o<3?a(n):o>3?a(t,r,n):a(t,r))||n);return o>3&&n&&Object.defineProperty(t,r,n),n};let uE=class extends sI{constructor(){super(...arguments),this.tabIdx=void 0,this.variant="icon",this.disabled=!1,this.imageSrc=void 0,this.alt=void 0,this.chevron=!1,this.loading=!1}render(){return ss`
      <button
        ?disabled=${!!this.loading||!!this.disabled}
        data-loading=${this.loading}
        data-iconvariant=${ln(this.iconVariant)}
        tabindex=${ln(this.tabIdx)}
      >
        ${this.loadingTemplate()} ${this.visualTemplate()}
        <wui-flex gap="3xs">
          <slot></slot>
        </wui-flex>
        ${this.chevronTemplate()}
      </button>
    `}visualTemplate(){if("image"===this.variant&&this.imageSrc)return ss`<wui-image src=${this.imageSrc} alt=${this.alt??"list item"}></wui-image>`;if("square"===this.iconVariant&&this.icon&&"icon"===this.variant)return ss`<wui-icon name=${this.icon}></wui-icon>`;if("icon"===this.variant&&this.icon&&this.iconVariant){let e=["blue","square-blue"].includes(this.iconVariant)?"accent-100":"fg-200",t="square-blue"===this.iconVariant?"mdl":"md",r=this.iconSize?this.iconSize:t;return ss`
        <wui-icon-box
          data-variant=${this.iconVariant}
          icon=${this.icon}
          iconSize=${r}
          background="transparent"
          iconColor=${e}
          backgroundColor=${e}
          size=${t}
        ></wui-icon-box>
      `}return null}loadingTemplate(){return this.loading?ss`<wui-loading-spinner
        data-testid="wui-list-item-loading-spinner"
        color="fg-300"
      ></wui-loading-spinner>`:ss``}chevronTemplate(){return this.chevron?ss`<wui-icon size="inherit" color="fg-200" name="chevronRight"></wui-icon>`:null}};uE.styles=[sO,sP,uC],ux([lt()],uE.prototype,"icon",void 0),ux([lt()],uE.prototype,"iconSize",void 0),ux([lt()],uE.prototype,"tabIdx",void 0),ux([lt()],uE.prototype,"variant",void 0),ux([lt()],uE.prototype,"iconVariant",void 0),ux([lt({type:Boolean})],uE.prototype,"disabled",void 0),ux([lt()],uE.prototype,"imageSrc",void 0),ux([lt()],uE.prototype,"alt",void 0),ux([lt({type:Boolean})],uE.prototype,"chevron",void 0),ux([lt({type:Boolean})],uE.prototype,"loading",void 0),uE=ux([sL("wui-list-item")],uE);let uk=class extends sI{constructor(){super(...arguments),this.wallet=e5.state.data?.wallet}render(){if(!this.wallet)throw Error("w3m-downloads-view");return ss`
      <wui-flex gap="xs" flexDirection="column" .padding=${["s","s","l","s"]}>
        ${this.chromeTemplate()} ${this.iosTemplate()} ${this.androidTemplate()}
        ${this.homepageTemplate()}
      </wui-flex>
    `}chromeTemplate(){return this.wallet?.chrome_store?ss`<wui-list-item
      variant="icon"
      icon="chromeStore"
      iconVariant="square"
      @click=${this.onChromeStore.bind(this)}
      chevron
    >
      <wui-text variant="paragraph-500" color="fg-100">Chrome Extension</wui-text>
    </wui-list-item>`:null}iosTemplate(){return this.wallet?.app_store?ss`<wui-list-item
      variant="icon"
      icon="appStore"
      iconVariant="square"
      @click=${this.onAppStore.bind(this)}
      chevron
    >
      <wui-text variant="paragraph-500" color="fg-100">iOS App</wui-text>
    </wui-list-item>`:null}androidTemplate(){return this.wallet?.play_store?ss`<wui-list-item
      variant="icon"
      icon="playStore"
      iconVariant="square"
      @click=${this.onPlayStore.bind(this)}
      chevron
    >
      <wui-text variant="paragraph-500" color="fg-100">Android App</wui-text>
    </wui-list-item>`:null}homepageTemplate(){return this.wallet?.homepage?ss`
      <wui-list-item
        variant="icon"
        icon="browser"
        iconVariant="square-blue"
        @click=${this.onHomePage.bind(this)}
        chevron
      >
        <wui-text variant="paragraph-500" color="fg-100">Website</wui-text>
      </wui-list-item>
    `:null}onChromeStore(){this.wallet?.chrome_store&&eL.openHref(this.wallet.chrome_store,"_blank")}onAppStore(){this.wallet?.app_store&&eL.openHref(this.wallet.app_store,"_blank")}onPlayStore(){this.wallet?.play_store&&eL.openHref(this.wallet.play_store,"_blank")}onHomePage(){this.wallet?.homepage&&eL.openHref(this.wallet.homepage,"_blank")}};uk=function(e,t,r,i){var a,o=arguments.length,n=o<3?t:null===i?i=Object.getOwnPropertyDescriptor(t,r):i;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)n=Reflect.decorate(e,t,r,i);else for(var s=e.length-1;s>=0;s--)(a=e[s])&&(n=(o<3?a(n):o>3?a(t,r,n):a(t,r))||n);return o>3&&n&&Object.defineProperty(t,r,n),n}([sL("w3m-downloads-view")],uk);var uA=Object.freeze({__proto__:null,get W3mConnectingWcBasicView(){return dq},get W3mAllWalletsView(){return uy},get W3mDownloadsView(){return uk}}),uN=nP`
  :host {
    display: block;
    border-radius: clamp(0px, var(--wui-border-radius-l), 44px);
    box-shadow: 0 0 0 1px var(--wui-color-gray-glass-005);
    background-color: var(--wui-color-modal-bg);
    overflow: hidden;
  }

  :host([data-embedded='true']) {
    box-shadow:
      0 0 0 1px var(--wui-color-gray-glass-005),
      0px 4px 12px 4px var(--w3m-card-embedded-shadow-color);
  }
`;let uI=class extends sI{render(){return ss`<slot></slot>`}};uI.styles=[sO,uN],uI=function(e,t,r,i){var a,o=arguments.length,n=o<3?t:null===i?i=Object.getOwnPropertyDescriptor(t,r):i;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)n=Reflect.decorate(e,t,r,i);else for(var s=e.length-1;s>=0;s--)(a=e[s])&&(n=(o<3?a(n):o>3?a(t,r,n):a(t,r))||n);return o>3&&n&&Object.defineProperty(t,r,n),n}([sL("wui-card")],uI);var uS=nP`
  :host {
    display: flex;
    align-items: center;
    justify-content: center;
    padding: var(--wui-spacing-s);
    border-radius: var(--wui-border-radius-s);
    border: 1px solid var(--wui-color-dark-glass-100);
    box-sizing: border-box;
    background-color: var(--wui-color-bg-325);
    box-shadow: 0px 0px 16px 0px rgba(0, 0, 0, 0.25);
  }

  wui-flex {
    width: 100%;
  }

  wui-text {
    word-break: break-word;
    flex: 1;
  }

  .close {
    cursor: pointer;
  }

  .icon-box {
    height: 40px;
    width: 40px;
    border-radius: var(--wui-border-radius-3xs);
    background-color: var(--local-icon-bg-value);
  }
`,u_=function(e,t,r,i){var a,o=arguments.length,n=o<3?t:null===i?i=Object.getOwnPropertyDescriptor(t,r):i;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)n=Reflect.decorate(e,t,r,i);else for(var s=e.length-1;s>=0;s--)(a=e[s])&&(n=(o<3?a(n):o>3?a(t,r,n):a(t,r))||n);return o>3&&n&&Object.defineProperty(t,r,n),n};let uT=class extends sI{constructor(){super(...arguments),this.message="",this.backgroundColor="accent-100",this.iconColor="accent-100",this.icon="info"}render(){return this.style.cssText=`
      --local-icon-bg-value: var(--wui-color-${this.backgroundColor});
   `,ss`
      <wui-flex flexDirection="row" justifyContent="space-between" alignItems="center">
        <wui-flex columnGap="xs" flexDirection="row" alignItems="center">
          <wui-flex
            flexDirection="row"
            alignItems="center"
            justifyContent="center"
            class="icon-box"
          >
            <wui-icon color=${this.iconColor} size="md" name=${this.icon}></wui-icon>
          </wui-flex>
          <wui-text variant="small-500" color="bg-350" data-testid="wui-alertbar-text"
            >${this.message}</wui-text
          >
        </wui-flex>
        <wui-icon
          class="close"
          color="bg-350"
          size="sm"
          name="close"
          @click=${this.onClose}
        ></wui-icon>
      </wui-flex>
    `}onClose(){eG.close()}};uT.styles=[sO,uS],u_([lt()],uT.prototype,"message",void 0),u_([lt()],uT.prototype,"backgroundColor",void 0),u_([lt()],uT.prototype,"iconColor",void 0),u_([lt()],uT.prototype,"icon",void 0),uT=u_([sL("wui-alertbar")],uT);var uO=nP`
  :host {
    display: block;
    position: absolute;
    top: var(--wui-spacing-s);
    left: var(--wui-spacing-l);
    right: var(--wui-spacing-l);
    opacity: 0;
    pointer-events: none;
  }
`,uP=function(e,t,r,i){var a,o=arguments.length,n=o<3?t:null===i?i=Object.getOwnPropertyDescriptor(t,r):i;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)n=Reflect.decorate(e,t,r,i);else for(var s=e.length-1;s>=0;s--)(a=e[s])&&(n=(o<3?a(n):o>3?a(t,r,n):a(t,r))||n);return o>3&&n&&Object.defineProperty(t,r,n),n};let uR={info:{backgroundColor:"fg-350",iconColor:"fg-325",icon:"info"},success:{backgroundColor:"success-glass-reown-020",iconColor:"success-125",icon:"checkmark"},warning:{backgroundColor:"warning-glass-reown-020",iconColor:"warning-100",icon:"warningCircle"},error:{backgroundColor:"error-glass-reown-020",iconColor:"error-125",icon:"exclamationTriangle"}},u$=class extends sI{constructor(){super(),this.unsubscribe=[],this.open=eG.state.open,this.onOpen(!0),this.unsubscribe.push(eG.subscribeKey("open",e=>{this.open=e,this.onOpen(!1)}))}disconnectedCallback(){this.unsubscribe.forEach(e=>e())}render(){let{message:e,variant:t}=eG.state,r=uR[t];return ss`
      <wui-alertbar
        message=${e}
        backgroundColor=${r?.backgroundColor}
        iconColor=${r?.iconColor}
        icon=${r?.icon}
      ></wui-alertbar>
    `}onOpen(e){this.open?(this.animate([{opacity:0,transform:"scale(0.85)"},{opacity:1,transform:"scale(1)"}],{duration:150,fill:"forwards",easing:"ease"}),this.style.cssText="pointer-events: auto"):e||(this.animate([{opacity:1,transform:"scale(1)"},{opacity:0,transform:"scale(0.85)"}],{duration:150,fill:"forwards",easing:"ease"}),this.style.cssText="pointer-events: none")}};u$.styles=uO,uP([lr()],u$.prototype,"open",void 0),u$=uP([sL("w3m-alertbar")],u$);var uL=nP`
  button {
    border-radius: var(--local-border-radius);
    color: var(--wui-color-fg-100);
    padding: var(--local-padding);
  }

  @media (max-width: 700px) {
    button {
      padding: var(--wui-spacing-s);
    }
  }

  button > wui-icon {
    pointer-events: none;
  }

  button:disabled > wui-icon {
    color: var(--wui-color-bg-300) !important;
  }

  button:disabled {
    background-color: transparent;
  }
`,uB=function(e,t,r,i){var a,o=arguments.length,n=o<3?t:null===i?i=Object.getOwnPropertyDescriptor(t,r):i;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)n=Reflect.decorate(e,t,r,i);else for(var s=e.length-1;s>=0;s--)(a=e[s])&&(n=(o<3?a(n):o>3?a(t,r,n):a(t,r))||n);return o>3&&n&&Object.defineProperty(t,r,n),n};let uM=class extends sI{constructor(){super(...arguments),this.size="md",this.disabled=!1,this.icon="copy",this.iconColor="inherit"}render(){let e="lg"===this.size?"--wui-border-radius-xs":"--wui-border-radius-xxs",t="lg"===this.size?"--wui-spacing-1xs":"--wui-spacing-2xs";return this.style.cssText=`
    --local-border-radius: var(${e});
    --local-padding: var(${t});
`,ss`
      <button ?disabled=${this.disabled}>
        <wui-icon color=${this.iconColor} size=${this.size} name=${this.icon}></wui-icon>
      </button>
    `}};uM.styles=[sO,sP,sR,uL],uB([lt()],uM.prototype,"size",void 0),uB([lt({type:Boolean})],uM.prototype,"disabled",void 0),uB([lt()],uM.prototype,"icon",void 0),uB([lt()],uM.prototype,"iconColor",void 0),uM=uB([sL("wui-icon-link")],uM);var uU=nP`
  button {
    display: block;
    display: flex;
    align-items: center;
    padding: var(--wui-spacing-xxs);
    gap: var(--wui-spacing-xxs);
    transition: all var(--wui-ease-out-power-1) var(--wui-duration-md);
    border-radius: var(--wui-border-radius-xxs);
  }

  wui-image {
    border-radius: 100%;
    width: var(--wui-spacing-xl);
    height: var(--wui-spacing-xl);
  }

  wui-icon-box {
    width: var(--wui-spacing-xl);
    height: var(--wui-spacing-xl);
  }

  button:hover {
    background-color: var(--wui-color-gray-glass-002);
  }

  button:active {
    background-color: var(--wui-color-gray-glass-005);
  }
`,uz=function(e,t,r,i){var a,o=arguments.length,n=o<3?t:null===i?i=Object.getOwnPropertyDescriptor(t,r):i;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)n=Reflect.decorate(e,t,r,i);else for(var s=e.length-1;s>=0;s--)(a=e[s])&&(n=(o<3?a(n):o>3?a(t,r,n):a(t,r))||n);return o>3&&n&&Object.defineProperty(t,r,n),n};let uD=class extends sI{constructor(){super(...arguments),this.imageSrc=""}render(){return ss`<button>
      ${this.imageTemplate()}
      <wui-icon size="xs" color="fg-200" name="chevronBottom"></wui-icon>
    </button>`}imageTemplate(){return this.imageSrc?ss`<wui-image src=${this.imageSrc} alt="select visual"></wui-image>`:ss`<wui-icon-box
      size="xxs"
      iconColor="fg-200"
      backgroundColor="fg-100"
      background="opaque"
      icon="networkPlaceholder"
    ></wui-icon-box>`}};uD.styles=[sO,sP,sR,uU],uz([lt()],uD.prototype,"imageSrc",void 0),uD=uz([sL("wui-select")],uD);var uj=nP`
  :host {
    height: 64px;
  }

  wui-text {
    text-transform: capitalize;
  }

  wui-flex.w3m-header-title {
    transform: translateY(0);
    opacity: 1;
  }

  wui-flex.w3m-header-title[view-direction='prev'] {
    animation:
      slide-down-out 120ms forwards var(--wui-ease-out-power-2),
      slide-down-in 120ms forwards var(--wui-ease-out-power-2);
    animation-delay: 0ms, 200ms;
  }

  wui-flex.w3m-header-title[view-direction='next'] {
    animation:
      slide-up-out 120ms forwards var(--wui-ease-out-power-2),
      slide-up-in 120ms forwards var(--wui-ease-out-power-2);
    animation-delay: 0ms, 200ms;
  }

  wui-icon-link[data-hidden='true'] {
    opacity: 0 !important;
    pointer-events: none;
  }

  @keyframes slide-up-out {
    from {
      transform: translateY(0px);
      opacity: 1;
    }
    to {
      transform: translateY(3px);
      opacity: 0;
    }
  }

  @keyframes slide-up-in {
    from {
      transform: translateY(-3px);
      opacity: 0;
    }
    to {
      transform: translateY(0);
      opacity: 1;
    }
  }

  @keyframes slide-down-out {
    from {
      transform: translateY(0px);
      opacity: 1;
    }
    to {
      transform: translateY(-3px);
      opacity: 0;
    }
  }

  @keyframes slide-down-in {
    from {
      transform: translateY(3px);
      opacity: 0;
    }
    to {
      transform: translateY(0);
      opacity: 1;
    }
  }
`,uW=function(e,t,r,i){var a,o=arguments.length,n=o<3?t:null===i?i=Object.getOwnPropertyDescriptor(t,r):i;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)n=Reflect.decorate(e,t,r,i);else for(var s=e.length-1;s>=0;s--)(a=e[s])&&(n=(o<3?a(n):o>3?a(t,r,n):a(t,r))||n);return o>3&&n&&Object.defineProperty(t,r,n),n};let uH=["SmartSessionList"];function uF(){let e=e5.state.data?.connector?.name,t=e5.state.data?.wallet?.name,r=e5.state.data?.network?.name,i=t??e,a=e7.getConnectors();return{Connect:`Connect ${1===a.length&&a[0]?.id==="w3m-email"?"Email":""} Wallet`,Create:"Create Wallet",ChooseAccountName:void 0,Account:void 0,AccountSettings:void 0,AllWallets:"All Wallets",ApproveTransaction:"Approve Transaction",BuyInProgress:"Buy",ConnectingExternal:i??"Connect Wallet",ConnectingWalletConnect:i??"WalletConnect",ConnectingWalletConnectBasic:"WalletConnect",ConnectingSiwe:"Sign In",Convert:"Convert",ConvertSelectToken:"Select token",ConvertPreview:"Preview convert",Downloads:i?`Get ${i}`:"Downloads",EmailLogin:"Email Login",EmailVerifyOtp:"Confirm Email",EmailVerifyDevice:"Register Device",GetWallet:"Get a wallet",Networks:"Choose Network",OnRampProviders:"Choose Provider",OnRampActivity:"Activity",OnRampTokenSelect:"Select Token",OnRampFiatSelect:"Select Currency",Profile:void 0,SwitchNetwork:r??"Switch Network",SwitchAddress:"Switch Address",Transactions:"Activity",UnsupportedChain:"Switch Network",UpgradeEmailWallet:"Upgrade your Wallet",UpdateEmailWallet:"Edit Email",UpdateEmailPrimaryOtp:"Confirm Current Email",UpdateEmailSecondaryOtp:"Confirm New Email",WhatIsABuy:"What is Buy?",RegisterAccountName:"Choose name",RegisterAccountNameSuccess:"",WalletReceive:"Receive",WalletCompatibleNetworks:"Compatible Networks",Swap:"Swap",SwapSelectToken:"Select token",SwapPreview:"Preview swap",WalletSend:"Send",WalletSendPreview:"Review send",WalletSendSelectToken:"Select Token",WhatIsANetwork:"What is a network?",WhatIsAWallet:"What is a wallet?",ConnectWallets:"Connect wallet",ConnectSocials:"All socials",ConnectingSocial:o$.state.socialProvider?o$.state.socialProvider:"Connect Social",ConnectingMultiChain:"Select chain",ConnectingFarcaster:"Farcaster",SwitchActiveChain:"Switch chain",SmartSessionCreated:void 0,SmartSessionList:"Smart Sessions",SIWXSignMessage:"Sign In"}}let uV=class extends sI{constructor(){super(),this.unsubscribe=[],this.heading=uF()[e5.state.view],this.network=oS.state.activeCaipNetwork,this.networkImage=eH.getNetworkImage(this.network),this.buffering=!1,this.showBack=!1,this.prevHistoryLength=1,this.view=e5.state.view,this.viewDirection="",this.headerText=uF()[e5.state.view],this.unsubscribe.push(eD.subscribeNetworkImages(()=>{this.networkImage=eH.getNetworkImage(this.network)}),e5.subscribeKey("view",e=>{setTimeout(()=>{this.view=e,this.headerText=uF()[e]},nE.ANIMATION_DURATIONS.HeaderText),this.onViewChange(),this.onHistoryChange()}),tc.subscribeKey("buffering",e=>this.buffering=e),oS.subscribeKey("activeCaipNetwork",e=>{this.network=e,this.networkImage=eH.getNetworkImage(this.network)}))}disconnectCallback(){this.unsubscribe.forEach(e=>e())}render(){return ss`
      <wui-flex .padding=${this.getPadding()} justifyContent="space-between" alignItems="center">
        ${this.leftHeaderTemplate()} ${this.titleTemplate()} ${this.rightHeaderTemplate()}
      </wui-flex>
    `}onWalletHelp(){eJ.sendEvent({type:"track",event:"CLICK_WALLET_HELP"}),e5.push("WhatIsAWallet")}async onClose(){"UnsupportedChain"===e5.state.view||await to.isSIWXCloseDisabled()?oB.shake():oB.close()}rightHeaderTemplate(){let e=eZ?.state?.features?.smartSessions;return"Account"===e5.state.view&&e?ss`<wui-flex>
      <wui-icon-link
        icon="clock"
        @click=${()=>e5.push("SmartSessionList")}
        data-testid="w3m-header-smart-sessions"
      ></wui-icon-link>
      ${this.closeButtonTemplate()}
    </wui-flex> `:this.closeButtonTemplate()}closeButtonTemplate(){return ss`
      <wui-icon-link
        ?disabled=${this.buffering}
        icon="close"
        @click=${this.onClose.bind(this)}
        data-testid="w3m-header-close"
      ></wui-icon-link>
    `}titleTemplate(){let e=uH.includes(this.view);return ss`
      <wui-flex
        view-direction="${this.viewDirection}"
        class="w3m-header-title"
        alignItems="center"
        gap="xs"
      >
        <wui-text variant="paragraph-700" color="fg-100" data-testid="w3m-header-text"
          >${this.headerText}</wui-text
        >
        ${e?ss`<wui-tag variant="main">Beta</wui-tag>`:null}
      </wui-flex>
    `}leftHeaderTemplate(){let{view:e}=e5.state,t="Connect"===e,r=eZ.state.enableEmbedded,i=eZ.state.enableNetworkSwitch;return"Account"===e&&i?ss`<wui-select
        id="dynamic"
        data-testid="w3m-account-select-network"
        active-network=${ln(this.network?.name)}
        @click=${this.onNetworks.bind(this)}
        imageSrc=${ln(this.networkImage)}
      ></wui-select>`:this.showBack&&!("ApproveTransaction"===e||"ConnectingSiwe"===e||t&&r)?ss`<wui-icon-link
        data-testid="header-back"
        id="dynamic"
        icon="chevronLeft"
        ?disabled=${this.buffering}
        @click=${this.onGoBack.bind(this)}
      ></wui-icon-link>`:ss`<wui-icon-link
      data-hidden=${!t}
      id="dynamic"
      icon="helpCircle"
      @click=${this.onWalletHelp.bind(this)}
    ></wui-icon-link>`}onNetworks(){this.isAllowedNetworkSwitch()&&(eJ.sendEvent({type:"track",event:"CLICK_NETWORKS"}),e5.push("Networks"))}isAllowedNetworkSwitch(){let e=oS.getAllRequestedCaipNetworks(),t=!!e&&e.length>1,r=e?.find(({id:e})=>e===this.network?.id);return t||!r}getPadding(){return this.heading?["l","2l","l","2l"]:["0","2l","0","2l"]}onViewChange(){let{history:e}=e5.state,t=nE.VIEW_DIRECTION.Next;e.length<this.prevHistoryLength&&(t=nE.VIEW_DIRECTION.Prev),this.prevHistoryLength=e.length,this.viewDirection=t}async onHistoryChange(){let{history:e}=e5.state,t=this.shadowRoot?.querySelector("#dynamic");e.length>1&&!this.showBack&&t?(await t.animate([{opacity:1},{opacity:0}],{duration:200,fill:"forwards",easing:"ease"}).finished,this.showBack=!0,t.animate([{opacity:0},{opacity:1}],{duration:200,fill:"forwards",easing:"ease"})):e.length<=1&&this.showBack&&t&&(await t.animate([{opacity:1},{opacity:0}],{duration:200,fill:"forwards",easing:"ease"}).finished,this.showBack=!1,t.animate([{opacity:0},{opacity:1}],{duration:200,fill:"forwards",easing:"ease"}))}onGoBack(){e5.goBack()}};uV.styles=uj,uW([lr()],uV.prototype,"heading",void 0),uW([lr()],uV.prototype,"network",void 0),uW([lr()],uV.prototype,"networkImage",void 0),uW([lr()],uV.prototype,"buffering",void 0),uW([lr()],uV.prototype,"showBack",void 0),uW([lr()],uV.prototype,"prevHistoryLength",void 0),uW([lr()],uV.prototype,"view",void 0),uW([lr()],uV.prototype,"viewDirection",void 0),uW([lr()],uV.prototype,"headerText",void 0),uV=uW([sL("w3m-header")],uV);var uZ=nP`
  :host {
    display: flex;
    column-gap: var(--wui-spacing-s);
    align-items: center;
    padding: var(--wui-spacing-xs) var(--wui-spacing-m) var(--wui-spacing-xs) var(--wui-spacing-xs);
    border-radius: var(--wui-border-radius-s);
    border: 1px solid var(--wui-color-gray-glass-005);
    box-sizing: border-box;
    background-color: var(--wui-color-bg-175);
    box-shadow:
      0px 14px 64px -4px rgba(0, 0, 0, 0.15),
      0px 8px 22px -6px rgba(0, 0, 0, 0.15);

    max-width: 300px;
  }

  :host wui-loading-spinner {
    margin-left: var(--wui-spacing-3xs);
  }
`,uq=function(e,t,r,i){var a,o=arguments.length,n=o<3?t:null===i?i=Object.getOwnPropertyDescriptor(t,r):i;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)n=Reflect.decorate(e,t,r,i);else for(var s=e.length-1;s>=0;s--)(a=e[s])&&(n=(o<3?a(n):o>3?a(t,r,n):a(t,r))||n);return o>3&&n&&Object.defineProperty(t,r,n),n};let uG=class extends sI{constructor(){super(...arguments),this.backgroundColor="accent-100",this.iconColor="accent-100",this.icon="checkmark",this.message="",this.loading=!1,this.iconType="default"}render(){return ss`
      ${this.templateIcon()}
      <wui-text variant="paragraph-500" color="fg-100" data-testid="wui-snackbar-message"
        >${this.message}</wui-text
      >
    `}templateIcon(){return this.loading?ss`<wui-loading-spinner size="md" color="accent-100"></wui-loading-spinner>`:"default"===this.iconType?ss`<wui-icon size="xl" color=${this.iconColor} name=${this.icon}></wui-icon>`:ss`<wui-icon-box
      size="sm"
      iconSize="xs"
      iconColor=${this.iconColor}
      backgroundColor=${this.backgroundColor}
      icon=${this.icon}
      background="opaque"
    ></wui-icon-box>`}};uG.styles=[sO,uZ],uq([lt()],uG.prototype,"backgroundColor",void 0),uq([lt()],uG.prototype,"iconColor",void 0),uq([lt()],uG.prototype,"icon",void 0),uq([lt()],uG.prototype,"message",void 0),uq([lt()],uG.prototype,"loading",void 0),uq([lt()],uG.prototype,"iconType",void 0),uG=uq([sL("wui-snackbar")],uG);var uK=nP`
  :host {
    display: block;
    position: absolute;
    opacity: 0;
    pointer-events: none;
    top: 11px;
    left: 50%;
    width: max-content;
  }
`,uY=function(e,t,r,i){var a,o=arguments.length,n=o<3?t:null===i?i=Object.getOwnPropertyDescriptor(t,r):i;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)n=Reflect.decorate(e,t,r,i);else for(var s=e.length-1;s>=0;s--)(a=e[s])&&(n=(o<3?a(n):o>3?a(t,r,n):a(t,r))||n);return o>3&&n&&Object.defineProperty(t,r,n),n};let uX={loading:void 0,success:{backgroundColor:"success-100",iconColor:"success-100",icon:"checkmark"},error:{backgroundColor:"error-100",iconColor:"error-100",icon:"close"}},uJ=class extends sI{constructor(){super(),this.unsubscribe=[],this.timeout=void 0,this.open=ta.state.open,this.unsubscribe.push(ta.subscribeKey("open",e=>{this.open=e,this.onOpen()}))}disconnectedCallback(){clearTimeout(this.timeout),this.unsubscribe.forEach(e=>e())}render(){let{message:e,variant:t,svg:r}=ta.state,i=uX[t],{icon:a,iconColor:o}=r??i??{};return ss`
      <wui-snackbar
        message=${e}
        backgroundColor=${i?.backgroundColor}
        iconColor=${o}
        icon=${a}
        .loading=${"loading"===t}
      ></wui-snackbar>
    `}onOpen(){clearTimeout(this.timeout),this.open?(this.animate([{opacity:0,transform:"translateX(-50%) scale(0.85)"},{opacity:1,transform:"translateX(-50%) scale(1)"}],{duration:150,fill:"forwards",easing:"ease"}),this.timeout&&clearTimeout(this.timeout),ta.state.autoClose&&(this.timeout=setTimeout(()=>ta.hide(),2500))):this.animate([{opacity:1,transform:"translateX(-50%) scale(1)"},{opacity:0,transform:"translateX(-50%) scale(0.85)"}],{duration:150,fill:"forwards",easing:"ease"})}};uJ.styles=uK,uY([lr()],uJ.prototype,"open",void 0),uJ=uY([sL("w3m-snackbar")],uJ);var uQ=nP`
  :host {
    pointer-events: none;
  }

  :host > wui-flex {
    display: var(--w3m-tooltip-display);
    opacity: var(--w3m-tooltip-opacity);
    padding: 9px var(--wui-spacing-s) 10px var(--wui-spacing-s);
    border-radius: var(--wui-border-radius-xxs);
    color: var(--wui-color-bg-100);
    position: fixed;
    top: var(--w3m-tooltip-top);
    left: var(--w3m-tooltip-left);
    transform: translate(calc(-50% + var(--w3m-tooltip-parent-width)), calc(-100% - 8px));
    max-width: calc(var(--w3m-modal-width) - var(--wui-spacing-xl));
    transition: opacity 0.2s var(--wui-ease-out-power-2);
    will-change: opacity;
  }

  :host([data-variant='shade']) > wui-flex {
    background-color: var(--wui-color-bg-150);
    border: 1px solid var(--wui-color-gray-glass-005);
  }

  :host([data-variant='shade']) > wui-flex > wui-text {
    color: var(--wui-color-fg-150);
  }

  :host([data-variant='fill']) > wui-flex {
    background-color: var(--wui-color-fg-100);
    border: none;
  }

  wui-icon {
    position: absolute;
    width: 12px !important;
    height: 4px !important;
    color: var(--wui-color-bg-150);
  }

  wui-icon[data-placement='top'] {
    bottom: 0px;
    left: 50%;
    transform: translate(-50%, 95%);
  }

  wui-icon[data-placement='bottom'] {
    top: 0;
    left: 50%;
    transform: translate(-50%, -95%) rotate(180deg);
  }

  wui-icon[data-placement='right'] {
    top: 50%;
    left: 0;
    transform: translate(-65%, -50%) rotate(90deg);
  }

  wui-icon[data-placement='left'] {
    top: 50%;
    right: 0%;
    transform: translate(65%, -50%) rotate(270deg);
  }
`,u0=function(e,t,r,i){var a,o=arguments.length,n=o<3?t:null===i?i=Object.getOwnPropertyDescriptor(t,r):i;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)n=Reflect.decorate(e,t,r,i);else for(var s=e.length-1;s>=0;s--)(a=e[s])&&(n=(o<3?a(n):o>3?a(t,r,n):a(t,r))||n);return o>3&&n&&Object.defineProperty(t,r,n),n};let u1=class extends sI{constructor(){super(),this.unsubscribe=[],this.open=oz.state.open,this.message=oz.state.message,this.triggerRect=oz.state.triggerRect,this.variant=oz.state.variant,this.unsubscribe.push(oz.subscribe(e=>{this.open=e.open,this.message=e.message,this.triggerRect=e.triggerRect,this.variant=e.variant}))}disconnectedCallback(){this.unsubscribe.forEach(e=>e())}render(){this.dataset.variant=this.variant;let e=this.triggerRect.top,t=this.triggerRect.left;return this.style.cssText=`
    --w3m-tooltip-top: ${e}px;
    --w3m-tooltip-left: ${t}px;
    --w3m-tooltip-parent-width: ${this.triggerRect.width/2}px;
    --w3m-tooltip-display: ${this.open?"flex":"none"};
    --w3m-tooltip-opacity: ${this.open?1:0};
    `,ss`<wui-flex>
      <wui-icon data-placement="top" color="fg-100" size="inherit" name="cursor"></wui-icon>
      <wui-text color="inherit" variant="small-500">${this.message}</wui-text>
    </wui-flex>`}};u1.styles=[uQ],u0([lr()],u1.prototype,"open",void 0),u0([lr()],u1.prototype,"message",void 0),u0([lr()],u1.prototype,"triggerRect",void 0),u0([lr()],u1.prototype,"variant",void 0),u1=u0([sL("w3m-tooltip"),sL("w3m-tooltip")],u1);var u2=nP`
  :host {
    --prev-height: 0px;
    --new-height: 0px;
    display: block;
  }

  div.w3m-router-container {
    transform: translateY(0);
    opacity: 1;
  }

  div.w3m-router-container[view-direction='prev'] {
    animation:
      slide-left-out 150ms forwards ease,
      slide-left-in 150ms forwards ease;
    animation-delay: 0ms, 200ms;
  }

  div.w3m-router-container[view-direction='next'] {
    animation:
      slide-right-out 150ms forwards ease,
      slide-right-in 150ms forwards ease;
    animation-delay: 0ms, 200ms;
  }

  @keyframes slide-left-out {
    from {
      transform: translateX(0px);
      opacity: 1;
    }
    to {
      transform: translateX(10px);
      opacity: 0;
    }
  }

  @keyframes slide-left-in {
    from {
      transform: translateX(-10px);
      opacity: 0;
    }
    to {
      transform: translateX(0);
      opacity: 1;
    }
  }

  @keyframes slide-right-out {
    from {
      transform: translateX(0px);
      opacity: 1;
    }
    to {
      transform: translateX(-10px);
      opacity: 0;
    }
  }

  @keyframes slide-right-in {
    from {
      transform: translateX(10px);
      opacity: 0;
    }
    to {
      transform: translateX(0);
      opacity: 1;
    }
  }
`,u3=function(e,t,r,i){var a,o=arguments.length,n=o<3?t:null===i?i=Object.getOwnPropertyDescriptor(t,r):i;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)n=Reflect.decorate(e,t,r,i);else for(var s=e.length-1;s>=0;s--)(a=e[s])&&(n=(o<3?a(n):o>3?a(t,r,n):a(t,r))||n);return o>3&&n&&Object.defineProperty(t,r,n),n};let u5=class extends sI{constructor(){super(),this.resizeObserver=void 0,this.prevHeight="0px",this.prevHistoryLength=1,this.unsubscribe=[],this.view=e5.state.view,this.viewDirection="",this.unsubscribe.push(e5.subscribeKey("view",e=>this.onViewChange(e)))}firstUpdated(){this.resizeObserver=new ResizeObserver(([e])=>{let t=`${e?.contentRect.height}px`;"0px"!==this.prevHeight&&(this.style.setProperty("--prev-height",this.prevHeight),this.style.setProperty("--new-height",t),this.style.animation="w3m-view-height 150ms forwards ease",this.style.height="auto"),setTimeout(()=>{this.prevHeight=t,this.style.animation="unset"},nE.ANIMATION_DURATIONS.ModalHeight)}),this.resizeObserver?.observe(this.getWrapper())}disconnectedCallback(){this.resizeObserver?.unobserve(this.getWrapper()),this.unsubscribe.forEach(e=>e())}render(){return ss`<div class="w3m-router-container" view-direction="${this.viewDirection}">
      ${this.viewTemplate()}
    </div>`}viewTemplate(){switch(this.view){case"AccountSettings":return ss`<w3m-account-settings-view></w3m-account-settings-view>`;case"Account":return ss`<w3m-account-view></w3m-account-view>`;case"AllWallets":return ss`<w3m-all-wallets-view></w3m-all-wallets-view>`;case"ApproveTransaction":return ss`<w3m-approve-transaction-view></w3m-approve-transaction-view>`;case"BuyInProgress":return ss`<w3m-buy-in-progress-view></w3m-buy-in-progress-view>`;case"ChooseAccountName":return ss`<w3m-choose-account-name-view></w3m-choose-account-name-view>`;case"Connect":default:return ss`<w3m-connect-view></w3m-connect-view>`;case"Create":return ss`<w3m-connect-view walletGuide="explore"></w3m-connect-view>`;case"ConnectingWalletConnect":return ss`<w3m-connecting-wc-view></w3m-connecting-wc-view>`;case"ConnectingWalletConnectBasic":return ss`<w3m-connecting-wc-basic-view></w3m-connecting-wc-basic-view>`;case"ConnectingExternal":return ss`<w3m-connecting-external-view></w3m-connecting-external-view>`;case"ConnectingSiwe":return ss`<w3m-connecting-siwe-view></w3m-connecting-siwe-view>`;case"ConnectWallets":return ss`<w3m-connect-wallets-view></w3m-connect-wallets-view>`;case"ConnectSocials":return ss`<w3m-connect-socials-view></w3m-connect-socials-view>`;case"ConnectingSocial":return ss`<w3m-connecting-social-view></w3m-connecting-social-view>`;case"Downloads":return ss`<w3m-downloads-view></w3m-downloads-view>`;case"EmailLogin":return ss`<w3m-email-login-view></w3m-email-login-view>`;case"EmailVerifyOtp":return ss`<w3m-email-verify-otp-view></w3m-email-verify-otp-view>`;case"EmailVerifyDevice":return ss`<w3m-email-verify-device-view></w3m-email-verify-device-view>`;case"GetWallet":return ss`<w3m-get-wallet-view></w3m-get-wallet-view>`;case"Networks":return ss`<w3m-networks-view></w3m-networks-view>`;case"SwitchNetwork":return ss`<w3m-network-switch-view></w3m-network-switch-view>`;case"Profile":return ss`<w3m-profile-view></w3m-profile-view>`;case"SwitchAddress":return ss`<w3m-switch-address-view></w3m-switch-address-view>`;case"Transactions":return ss`<w3m-transactions-view></w3m-transactions-view>`;case"OnRampProviders":return ss`<w3m-onramp-providers-view></w3m-onramp-providers-view>`;case"OnRampActivity":return ss`<w3m-onramp-activity-view></w3m-onramp-activity-view>`;case"OnRampTokenSelect":return ss`<w3m-onramp-token-select-view></w3m-onramp-token-select-view>`;case"OnRampFiatSelect":return ss`<w3m-onramp-fiat-select-view></w3m-onramp-fiat-select-view>`;case"UpgradeEmailWallet":return ss`<w3m-upgrade-wallet-view></w3m-upgrade-wallet-view>`;case"UpdateEmailWallet":return ss`<w3m-update-email-wallet-view></w3m-update-email-wallet-view>`;case"UpdateEmailPrimaryOtp":return ss`<w3m-update-email-primary-otp-view></w3m-update-email-primary-otp-view>`;case"UpdateEmailSecondaryOtp":return ss`<w3m-update-email-secondary-otp-view></w3m-update-email-secondary-otp-view>`;case"UnsupportedChain":return ss`<w3m-unsupported-chain-view></w3m-unsupported-chain-view>`;case"Swap":return ss`<w3m-swap-view></w3m-swap-view>`;case"SwapSelectToken":return ss`<w3m-swap-select-token-view></w3m-swap-select-token-view>`;case"SwapPreview":return ss`<w3m-swap-preview-view></w3m-swap-preview-view>`;case"WalletSend":return ss`<w3m-wallet-send-view></w3m-wallet-send-view>`;case"WalletSendSelectToken":return ss`<w3m-wallet-send-select-token-view></w3m-wallet-send-select-token-view>`;case"WalletSendPreview":return ss`<w3m-wallet-send-preview-view></w3m-wallet-send-preview-view>`;case"WhatIsABuy":return ss`<w3m-what-is-a-buy-view></w3m-what-is-a-buy-view>`;case"WalletReceive":return ss`<w3m-wallet-receive-view></w3m-wallet-receive-view>`;case"WalletCompatibleNetworks":return ss`<w3m-wallet-compatible-networks-view></w3m-wallet-compatible-networks-view>`;case"WhatIsAWallet":return ss`<w3m-what-is-a-wallet-view></w3m-what-is-a-wallet-view>`;case"ConnectingMultiChain":return ss`<w3m-connecting-multi-chain-view></w3m-connecting-multi-chain-view>`;case"WhatIsANetwork":return ss`<w3m-what-is-a-network-view></w3m-what-is-a-network-view>`;case"ConnectingFarcaster":return ss`<w3m-connecting-farcaster-view></w3m-connecting-farcaster-view>`;case"SwitchActiveChain":return ss`<w3m-switch-active-chain-view></w3m-switch-active-chain-view>`;case"RegisterAccountName":return ss`<w3m-register-account-name-view></w3m-register-account-name-view>`;case"RegisterAccountNameSuccess":return ss`<w3m-register-account-name-success-view></w3m-register-account-name-success-view>`;case"SmartSessionCreated":return ss`<w3m-smart-session-created-view></w3m-smart-session-created-view>`;case"SmartSessionList":return ss`<w3m-smart-session-list-view></w3m-smart-session-list-view>`;case"SIWXSignMessage":return ss`<w3m-siwx-sign-message-view></w3m-siwx-sign-message-view>`}}onViewChange(e){oz.hide();let t=nE.VIEW_DIRECTION.Next,{history:r}=e5.state;r.length<this.prevHistoryLength&&(t=nE.VIEW_DIRECTION.Prev),this.prevHistoryLength=r.length,this.viewDirection=t,setTimeout(()=>{this.view=e},nE.ANIMATION_DURATIONS.ViewTransition)}getWrapper(){return this.shadowRoot?.querySelector("div")}};u5.styles=u2,u3([lr()],u5.prototype,"view",void 0),u3([lr()],u5.prototype,"viewDirection",void 0),u5=u3([sL("w3m-router")],u5);var u4=nP`
  :host {
    z-index: var(--w3m-z-index);
    display: block;
    backface-visibility: hidden;
    will-change: opacity;
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    pointer-events: none;
    opacity: 0;
    background-color: var(--wui-cover);
    transition: opacity 0.2s var(--wui-ease-out-power-2);
    will-change: opacity;
  }

  :host(.open) {
    opacity: 1;
  }

  :host(.embedded) {
    position: relative;
    pointer-events: unset;
    background: none;
    width: 100%;
    opacity: 1;
  }

  wui-card {
    max-width: var(--w3m-modal-width);
    width: 100%;
    position: relative;
    animation: zoom-in 0.2s var(--wui-ease-out-power-2);
    animation-fill-mode: backwards;
    outline: none;
    transition:
      border-radius var(--wui-duration-lg) var(--wui-ease-out-power-1),
      background-color var(--wui-duration-lg) var(--wui-ease-out-power-1);
    will-change: border-radius, background-color;
  }

  :host(.embedded) wui-card {
    max-width: 400px;
  }

  wui-card[shake='true'] {
    animation:
      zoom-in 0.2s var(--wui-ease-out-power-2),
      w3m-shake 0.5s var(--wui-ease-out-power-2);
  }

  wui-flex {
    overflow-x: hidden;
    overflow-y: auto;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: 100%;
  }

  @media (max-height: 700px) and (min-width: 431px) {
    wui-flex {
      align-items: flex-start;
    }

    wui-card {
      margin: var(--wui-spacing-xxl) 0px;
    }
  }

  @media (max-width: 430px) {
    wui-flex {
      align-items: flex-end;
    }

    wui-card {
      max-width: 100%;
      border-bottom-left-radius: var(--local-border-bottom-mobile-radius);
      border-bottom-right-radius: var(--local-border-bottom-mobile-radius);
      border-bottom: none;
      animation: slide-in 0.2s var(--wui-ease-out-power-2);
    }

    wui-card[shake='true'] {
      animation:
        slide-in 0.2s var(--wui-ease-out-power-2),
        w3m-shake 0.5s var(--wui-ease-out-power-2);
    }
  }

  @keyframes zoom-in {
    0% {
      transform: scale(0.95) translateY(0);
    }
    100% {
      transform: scale(1) translateY(0);
    }
  }

  @keyframes slide-in {
    0% {
      transform: scale(1) translateY(50px);
    }
    100% {
      transform: scale(1) translateY(0);
    }
  }

  @keyframes w3m-shake {
    0% {
      transform: scale(1) rotate(0deg);
    }
    20% {
      transform: scale(1) rotate(-1deg);
    }
    40% {
      transform: scale(1) rotate(1.5deg);
    }
    60% {
      transform: scale(1) rotate(-1.5deg);
    }
    80% {
      transform: scale(1) rotate(1deg);
    }
    100% {
      transform: scale(1) rotate(0deg);
    }
  }

  @keyframes w3m-view-height {
    from {
      height: var(--prev-height);
    }
    to {
      height: var(--new-height);
    }
  }
`,u6=function(e,t,r,i){var a,o=arguments.length,n=o<3?t:null===i?i=Object.getOwnPropertyDescriptor(t,r):i;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)n=Reflect.decorate(e,t,r,i);else for(var s=e.length-1;s>=0;s--)(a=e[s])&&(n=(o<3?a(n):o>3?a(t,r,n):a(t,r))||n);return o>3&&n&&Object.defineProperty(t,r,n),n};let u8="scroll-lock",u9=class extends sI{constructor(){super(),this.unsubscribe=[],this.abortController=void 0,this.hasPrefetched=!1,this.enableEmbedded=eZ.state.enableEmbedded,this.open=oB.state.open,this.caipAddress=oS.state.activeCaipAddress,this.caipNetwork=oS.state.activeCaipNetwork,this.shake=oB.state.shake,this.filterByNamespace=e7.state.filterByNamespace,this.initializeTheming(),e2.prefetchAnalyticsConfig(),this.unsubscribe.push(oB.subscribeKey("open",e=>e?this.onOpen():this.onClose()),oB.subscribeKey("shake",e=>this.shake=e),oS.subscribeKey("activeCaipNetwork",e=>this.onNewNetwork(e)),oS.subscribeKey("activeCaipAddress",e=>this.onNewAddress(e)),eZ.subscribeKey("enableEmbedded",e=>this.enableEmbedded=e),e7.subscribeKey("filterByNamespace",e=>{this.filterByNamespace===e||oS.getAccountData(e)?.caipAddress||(e2.fetchRecommendedWallets(),this.filterByNamespace=e)}))}firstUpdated(){if(this.caipAddress){if(this.enableEmbedded){oB.close(),this.prefetch();return}this.onNewAddress(this.caipAddress)}this.open&&this.onOpen(),this.enableEmbedded&&this.prefetch()}disconnectedCallback(){this.unsubscribe.forEach(e=>e()),this.onRemoveKeyboardListener()}render(){return this.style.cssText=`
      --local-border-bottom-mobile-radius: ${this.enableEmbedded?"clamp(0px, var(--wui-border-radius-l), 44px)":"0px"};
    `,this.enableEmbedded?ss`${this.contentTemplate()}
        <w3m-tooltip></w3m-tooltip> `:this.open?ss`
          <wui-flex @click=${this.onOverlayClick.bind(this)} data-testid="w3m-modal-overlay">
            ${this.contentTemplate()}
          </wui-flex>
          <w3m-tooltip></w3m-tooltip>
        `:null}contentTemplate(){return ss` <wui-card
      shake="${this.shake}"
      data-embedded="${ln(this.enableEmbedded)}"
      role="alertdialog"
      aria-modal="true"
      tabindex="0"
      data-testid="w3m-modal-card"
    >
      <w3m-header></w3m-header>
      <w3m-router></w3m-router>
      <w3m-snackbar></w3m-snackbar>
      <w3m-alertbar></w3m-alertbar>
    </wui-card>`}async onOverlayClick(e){e.target===e.currentTarget&&await this.handleClose()}async handleClose(){"UnsupportedChain"===e5.state.view||await to.isSIWXCloseDisabled()?oB.shake():oB.close()}initializeTheming(){let{themeVariables:e,themeMode:t}=e6.state,r=s$.getColorTheme(t);a=document.createElement("style"),o=document.createElement("style"),n=document.createElement("style"),a.textContent=sT(e).core.cssText,o.textContent=sT(e).dark.cssText,n.textContent=sT(e).light.cssText,document.head.appendChild(a),document.head.appendChild(o),document.head.appendChild(n),s_(r)}onClose(){this.open=!1,this.classList.remove("open"),this.onScrollUnlock(),ta.hide(),this.onRemoveKeyboardListener()}onOpen(){this.open=!0,this.classList.add("open"),this.onScrollLock(),this.onAddKeyboardListener()}onScrollLock(){let e=document.createElement("style");e.dataset.w3m=u8,e.textContent=`
      body {
        touch-action: none;
        overflow: hidden;
        overscroll-behavior: contain;
      }
      w3m-modal {
        pointer-events: auto;
      }
    `,document.head.appendChild(e)}onScrollUnlock(){let e=document.head.querySelector(`style[data-w3m="${u8}"]`);e&&e.remove()}onAddKeyboardListener(){this.abortController=new AbortController;let e=this.shadowRoot?.querySelector("wui-card");e?.focus(),window.addEventListener("keydown",t=>{if("Escape"===t.key)this.handleClose();else if("Tab"===t.key){let{tagName:r}=t.target;!r||r.includes("W3M-")||r.includes("WUI-")||e?.focus()}},this.abortController)}onRemoveKeyboardListener(){this.abortController?.abort(),this.abortController=void 0}async onNewAddress(e){let t=oS.state.isSwitchingNamespace,r=eL.getPlainAddress(e);r||t?t&&r&&e5.goBack():oB.close(),await to.initializeIfEnabled(),this.caipAddress=e,oS.setIsSwitchingNamespace(!1)}onNewNetwork(e){let t=this.caipNetwork,r=t?.caipNetworkId?.toString(),i=t?.chainNamespace,a=e?.caipNetworkId?.toString(),o=e?.chainNamespace,n=r!==a,s=t?.name===ec.UNSUPPORTED_NETWORK_NAME,l="ConnectingExternal"===e5.state.view,c=!this.caipAddress,d="UnsupportedChain"===e5.state.view,u=oB.state.open,h=!1;u&&!l&&(c?n&&(h=!0):(d||n&&!(i!==o)&&!s)&&(h=!0)),h&&"SIWXSignMessage"!==e5.state.view&&e5.goBack(),this.caipNetwork=e}prefetch(){this.hasPrefetched||(e2.prefetch(),e2.fetchWalletsByPage({page:1}),this.hasPrefetched=!0)}};u9.styles=u4,u6([lt({type:Boolean})],u9.prototype,"enableEmbedded",void 0),u6([lr()],u9.prototype,"open",void 0),u6([lr()],u9.prototype,"caipAddress",void 0),u6([lr()],u9.prototype,"caipNetwork",void 0),u6([lr()],u9.prototype,"shake",void 0),u6([lr()],u9.prototype,"filterByNamespace",void 0),u9=u6([sL("w3m-modal")],u9);var u7=Object.freeze({__proto__:null,get W3mModal(){return u9}}),he=Object.freeze({__proto__:null,addSvg:sl`<svg
  width="14"
  height="14"
  viewBox="0 0 14 14"
  fill="none"
  xmlns="http://www.w3.org/2000/svg"
>
  <path
    fill="currentColor"
    fill-rule="evenodd"
    clip-rule="evenodd"
    d="M7.0023 0.875C7.48571 0.875 7.8776 1.26675 7.8776 1.75V6.125H12.2541C12.7375 6.125 13.1294 6.51675 13.1294 7C13.1294 7.48325 12.7375 7.875 12.2541 7.875H7.8776V12.25C7.8776 12.7332 7.48571 13.125 7.0023 13.125C6.51889 13.125 6.12701 12.7332 6.12701 12.25V7.875H1.75054C1.26713 7.875 0.875244 7.48325 0.875244 7C0.875244 6.51675 1.26713 6.125 1.75054 6.125H6.12701V1.75C6.12701 1.26675 6.51889 0.875 7.0023 0.875Z"
    fill="#667dff"
  /></svg
>`}),ht=Object.freeze({__proto__:null,allWalletsSvg:sl`<svg fill="none" viewBox="0 0 24 24">
  <path
    style="fill: var(--wui-color-accent-100);"
    d="M10.2 6.6a3.6 3.6 0 1 1-7.2 0 3.6 3.6 0 0 1 7.2 0ZM21 6.6a3.6 3.6 0 1 1-7.2 0 3.6 3.6 0 0 1 7.2 0ZM10.2 17.4a3.6 3.6 0 1 1-7.2 0 3.6 3.6 0 0 1 7.2 0ZM21 17.4a3.6 3.6 0 1 1-7.2 0 3.6 3.6 0 0 1 7.2 0Z"
  />
</svg>`}),hr=Object.freeze({__proto__:null,arrowBottomCircleSvg:sl`<svg
  fill="none"
  viewBox="0 0 21 20"
>
  <path
    fill="currentColor"
    fill-rule="evenodd"
    d="M10.5 2.42908C6.31875 2.42908 2.92859 5.81989 2.92859 10.0034C2.92859 14.1869 6.31875 17.5777 10.5 17.5777C14.6813 17.5777 18.0714 14.1869 18.0714 10.0034C18.0714 5.81989 14.6813 2.42908 10.5 2.42908ZM0.928589 10.0034C0.928589 4.71596 5.21355 0.429077 10.5 0.429077C15.7865 0.429077 20.0714 4.71596 20.0714 10.0034C20.0714 15.2908 15.7865 19.5777 10.5 19.5777C5.21355 19.5777 0.928589 15.2908 0.928589 10.0034ZM10.5 5.75003C11.0523 5.75003 11.5 6.19774 11.5 6.75003L11.5 10.8343L12.7929 9.54137C13.1834 9.15085 13.8166 9.15085 14.2071 9.54137C14.5976 9.9319 14.5976 10.5651 14.2071 10.9556L11.2071 13.9556C10.8166 14.3461 10.1834 14.3461 9.79291 13.9556L6.79291 10.9556C6.40239 10.5651 6.40239 9.9319 6.79291 9.54137C7.18343 9.15085 7.8166 9.15085 8.20712 9.54137L9.50002 10.8343L9.50002 6.75003C9.50002 6.19774 9.94773 5.75003 10.5 5.75003Z"
    clip-rule="evenodd"
  /></svg
>`}),hi=Object.freeze({__proto__:null,appStoreSvg:sl`
<svg width="36" height="36">
  <path
    d="M28.724 0H7.271A7.269 7.269 0 0 0 0 7.272v21.46A7.268 7.268 0 0 0 7.271 36H28.73A7.272 7.272 0 0 0 36 28.728V7.272A7.275 7.275 0 0 0 28.724 0Z"
    fill="url(#a)"
  />
  <path
    d="m17.845 8.271.729-1.26a1.64 1.64 0 1 1 2.843 1.638l-7.023 12.159h5.08c1.646 0 2.569 1.935 1.853 3.276H6.434a1.632 1.632 0 0 1-1.638-1.638c0-.909.73-1.638 1.638-1.638h4.176l5.345-9.265-1.67-2.898a1.642 1.642 0 0 1 2.844-1.638l.716 1.264Zm-6.317 17.5-1.575 2.732a1.64 1.64 0 1 1-2.844-1.638l1.17-2.025c1.323-.41 2.398-.095 3.249.931Zm13.56-4.954h4.262c.909 0 1.638.729 1.638 1.638 0 .909-.73 1.638-1.638 1.638h-2.367l1.597 2.772c.45.788.185 1.782-.602 2.241a1.642 1.642 0 0 1-2.241-.603c-2.69-4.666-4.711-8.159-6.052-10.485-1.372-2.367-.391-4.743.576-5.549 1.075 1.846 2.682 4.631 4.828 8.348Z"
    fill="#fff"
  />
  <defs>
    <linearGradient id="a" x1="18" y1="0" x2="18" y2="36" gradientUnits="userSpaceOnUse">
      <stop stop-color="#18BFFB" />
      <stop offset="1" stop-color="#2072F3" />
    </linearGradient>
  </defs>
</svg>`}),ha=Object.freeze({__proto__:null,appleSvg:sl`<svg fill="none" viewBox="0 0 40 40">
  <g clip-path="url(#a)">
    <g clip-path="url(#b)">
      <circle cx="20" cy="19.89" r="20" fill="#000" />
      <g clip-path="url(#c)">
        <path
          fill="#fff"
          d="M28.77 23.3c-.69 1.99-2.75 5.52-4.87 5.56-1.4.03-1.86-.84-3.46-.84-1.61 0-2.12.81-3.45.86-2.25.1-5.72-5.1-5.72-9.62 0-4.15 2.9-6.2 5.42-6.25 1.36-.02 2.64.92 3.47.92.83 0 2.38-1.13 4.02-.97.68.03 2.6.28 3.84 2.08-3.27 2.14-2.76 6.61.75 8.25ZM24.2 7.88c-2.47.1-4.49 2.69-4.2 4.84 2.28.17 4.47-2.39 4.2-4.84Z"
        />
      </g>
    </g>
  </g>
  <defs>
    <clipPath id="a"><rect width="40" height="40" fill="#fff" rx="20" /></clipPath>
    <clipPath id="b"><path fill="#fff" d="M0 0h40v40H0z" /></clipPath>
    <clipPath id="c"><path fill="#fff" d="M8 7.89h24v24H8z" /></clipPath>
  </defs>
</svg>`}),ho=Object.freeze({__proto__:null,arrowBottomSvg:sl`<svg fill="none" viewBox="0 0 14 15">
  <path
    fill="currentColor"
    fill-rule="evenodd"
    d="M7 1.99a1 1 0 0 1 1 1v7.58l2.46-2.46a1 1 0 0 1 1.41 1.42L7.7 13.69a1 1 0 0 1-1.41 0L2.12 9.53A1 1 0 0 1 3.54 8.1L6 10.57V3a1 1 0 0 1 1-1Z"
    clip-rule="evenodd"
  />
</svg>`}),hn=Object.freeze({__proto__:null,arrowLeftSvg:sl`<svg fill="none" viewBox="0 0 14 15">
  <path
    fill="currentColor"
    fill-rule="evenodd"
    d="M13 7.99a1 1 0 0 1-1 1H4.4l2.46 2.46a1 1 0 1 1-1.41 1.41L1.29 8.7a1 1 0 0 1 0-1.41L5.46 3.1a1 1 0 0 1 1.41 1.42L4.41 6.99H12a1 1 0 0 1 1 1Z"
    clip-rule="evenodd"
  />
</svg>`}),hs=Object.freeze({__proto__:null,arrowRightSvg:sl`<svg fill="none" viewBox="0 0 14 15">
  <path
    fill="currentColor"
    fill-rule="evenodd"
    d="M1 7.99a1 1 0 0 1 1-1h7.58L7.12 4.53A1 1 0 1 1 8.54 3.1l4.16 4.17a1 1 0 0 1 0 1.41l-4.16 4.17a1 1 0 1 1-1.42-1.41l2.46-2.46H2a1 1 0 0 1-1-1Z"
    clip-rule="evenodd"
  />
</svg>`}),hl=Object.freeze({__proto__:null,arrowTopSvg:sl`<svg fill="none" viewBox="0 0 14 15">
  <path
    fill="currentColor"
    fill-rule="evenodd"
    d="M7 13.99a1 1 0 0 1-1-1V5.4L3.54 7.86a1 1 0 0 1-1.42-1.41L6.3 2.28a1 1 0 0 1 1.41 0l4.17 4.17a1 1 0 1 1-1.41 1.41L8 5.4v7.59a1 1 0 0 1-1 1Z"
    clip-rule="evenodd"
  />
</svg>`}),hc=Object.freeze({__proto__:null,bankSvg:sl`<svg
  xmlns="http://www.w3.org/2000/svg"
  width="12"
  height="13"
  viewBox="0 0 12 13"
  fill="none"
>
  <path
    fill-rule="evenodd"
    clip-rule="evenodd"
    d="M5.61391 1.57124C5.85142 1.42873 6.14813 1.42873 6.38564 1.57124L11.0793 4.38749C11.9179 4.89067 11.5612 6.17864 10.5832 6.17864H9.96398V10.0358H10.2854C10.6996 10.0358 11.0354 10.3716 11.0354 10.7858C11.0354 11.2 10.6996 11.5358 10.2854 11.5358H1.71416C1.29995 11.5358 0.964172 11.2 0.964172 10.7858C0.964172 10.3716 1.29995 10.0358 1.71416 10.0358H2.03558L2.03558 6.17864H1.41637C0.438389 6.17864 0.0816547 4.89066 0.920263 4.38749L5.61391 1.57124ZM3.53554 6.17864V10.0358H5.24979V6.17864H3.53554ZM6.74976 6.17864V10.0358H8.46401V6.17864H6.74976ZM8.64913 4.67864H3.35043L5.99978 3.089L8.64913 4.67864Z"
    fill="currentColor"
  /></svg
>`}),hd=Object.freeze({__proto__:null,browserSvg:sl`<svg fill="none" viewBox="0 0 20 20">
  <path
    fill="currentColor"
    fill-rule="evenodd"
    d="M4 6.4a1 1 0 0 1-.46.89 6.98 6.98 0 0 0 .38 6.18A7 7 0 0 0 16.46 7.3a1 1 0 0 1-.47-.92 7 7 0 0 0-12 .03Zm-2.02-.5a9 9 0 1 1 16.03 8.2A9 9 0 0 1 1.98 5.9Z"
    clip-rule="evenodd"
  />
  <path
    fill="currentColor"
    fill-rule="evenodd"
    d="M6.03 8.63c-1.46-.3-2.72-.75-3.6-1.35l-.02-.01-.14-.11a1 1 0 0 1 1.2-1.6l.1.08c.6.4 1.52.74 2.69 1 .16-.99.39-1.88.67-2.65.3-.79.68-1.5 1.15-2.02A2.58 2.58 0 0 1 9.99 1c.8 0 1.45.44 1.92.97.47.52.84 1.23 1.14 2.02.29.77.52 1.66.68 2.64a8 8 0 0 0 2.7-1l.26-.18h.48a1 1 0 0 1 .12 2c-.86.51-2.01.91-3.34 1.18a22.24 22.24 0 0 1-.03 3.19c1.45.29 2.7.73 3.58 1.31a1 1 0 0 1-1.1 1.68c-.6-.4-1.56-.76-2.75-1-.15.8-.36 1.55-.6 2.2-.3.79-.67 1.5-1.14 2.02-.47.53-1.12.97-1.92.97-.8 0-1.45-.44-1.91-.97a6.51 6.51 0 0 1-1.15-2.02c-.24-.65-.44-1.4-.6-2.2-1.18.24-2.13.6-2.73.99a1 1 0 1 1-1.1-1.67c.88-.58 2.12-1.03 3.57-1.31a22.03 22.03 0 0 1-.04-3.2Zm2.2-1.7c.15-.86.34-1.61.58-2.24.24-.65.51-1.12.76-1.4.25-.28.4-.29.42-.29.03 0 .17.01.42.3.25.27.52.74.77 1.4.23.62.43 1.37.57 2.22a19.96 19.96 0 0 1-3.52 0Zm-.18 4.6a20.1 20.1 0 0 1-.03-2.62 21.95 21.95 0 0 0 3.94 0 20.4 20.4 0 0 1-.03 2.63 21.97 21.97 0 0 0-3.88 0Zm.27 2c.13.66.3 1.26.49 1.78.24.65.51 1.12.76 1.4.25.28.4.29.42.29.03 0 .17-.01.42-.3.25-.27.52-.74.77-1.4.19-.5.36-1.1.49-1.78a20.03 20.03 0 0 0-3.35 0Z"
    clip-rule="evenodd"
  />
</svg>`}),hu=Object.freeze({__proto__:null,cardSvg:sl`<svg
  xmlns="http://www.w3.org/2000/svg"
  width="12"
  height="13"
  viewBox="0 0 12 13"
  fill="none"
>
  <path
    fill-rule="evenodd"
    clip-rule="evenodd"
    d="M4.16072 2C4.17367 2 4.18665 2 4.19968 2L7.83857 2C8.36772 1.99998 8.82398 1.99996 9.19518 2.04018C9.5895 2.0829 9.97577 2.17811 10.3221 2.42971C10.5131 2.56849 10.6811 2.73647 10.8198 2.92749C11.0714 3.27379 11.1666 3.66007 11.2094 4.0544C11.2496 4.42561 11.2496 4.88188 11.2495 5.41105V7.58896C11.2496 8.11812 11.2496 8.57439 11.2094 8.94561C11.1666 9.33994 11.0714 9.72621 10.8198 10.0725C10.6811 10.2635 10.5131 10.4315 10.3221 10.5703C9.97577 10.8219 9.5895 10.9171 9.19518 10.9598C8.82398 11 8.36772 11 7.83856 11H4.16073C3.63157 11 3.17531 11 2.80411 10.9598C2.40979 10.9171 2.02352 10.8219 1.67722 10.5703C1.48621 10.4315 1.31824 10.2635 1.17946 10.0725C0.927858 9.72621 0.832652 9.33994 0.78993 8.94561C0.749713 8.5744 0.749733 8.11813 0.749757 7.58896L0.749758 5.45C0.749758 5.43697 0.749758 5.42399 0.749757 5.41104C0.749733 4.88188 0.749713 4.42561 0.78993 4.0544C0.832652 3.66007 0.927858 3.27379 1.17946 2.92749C1.31824 2.73647 1.48621 2.56849 1.67722 2.42971C2.02352 2.17811 2.40979 2.0829 2.80411 2.04018C3.17531 1.99996 3.63157 1.99998 4.16072 2ZM2.96567 3.53145C2.69897 3.56034 2.60687 3.60837 2.55888 3.64324C2.49521 3.6895 2.43922 3.74549 2.39296 3.80916C2.35809 3.85715 2.31007 3.94926 2.28117 4.21597C2.26629 4.35335 2.25844 4.51311 2.25431 4.70832H9.74498C9.74085 4.51311 9.733 4.35335 9.71812 4.21597C9.68922 3.94926 9.6412 3.85715 9.60633 3.80916C9.56007 3.74549 9.50408 3.6895 9.44041 3.64324C9.39242 3.60837 9.30031 3.56034 9.03362 3.53145C8.75288 3.50103 8.37876 3.5 7.79961 3.5H4.19968C3.62053 3.5 3.24641 3.50103 2.96567 3.53145ZM9.74956 6.20832H2.24973V7.55C2.24973 8.12917 2.25076 8.5033 2.28117 8.78404C2.31007 9.05074 2.35809 9.14285 2.39296 9.19084C2.43922 9.25451 2.49521 9.31051 2.55888 9.35677C2.60687 9.39163 2.69897 9.43966 2.96567 9.46856C3.24641 9.49897 3.62053 9.5 4.19968 9.5H7.79961C8.37876 9.5 8.75288 9.49897 9.03362 9.46856C9.30032 9.43966 9.39242 9.39163 9.44041 9.35677C9.50408 9.31051 9.56007 9.25451 9.60633 9.19084C9.6412 9.14285 9.68922 9.05075 9.71812 8.78404C9.74854 8.5033 9.74956 8.12917 9.74956 7.55V6.20832ZM6.74963 8C6.74963 7.58579 7.08541 7.25 7.49961 7.25H8.2496C8.6638 7.25 8.99958 7.58579 8.99958 8C8.99958 8.41422 8.6638 8.75 8.2496 8.75H7.49961C7.08541 8.75 6.74963 8.41422 6.74963 8Z"
    fill="currentColor"
  /></svg
>`}),hh=Object.freeze({__proto__:null,checkmarkSvg:sl`<svg
  width="28"
  height="28"
  viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg">
  <path
    fill-rule="evenodd"
    clip-rule="evenodd"
    d="M25.5297 4.92733C26.1221 5.4242 26.1996 6.30724 25.7027 6.89966L12.2836 22.8997C12.0316 23.2001 11.6652 23.3811 11.2735 23.3986C10.8817 23.4161 10.5006 23.2686 10.2228 22.9919L2.38218 15.1815C1.83439 14.6358 1.83268 13.7494 2.37835 13.2016C2.92403 12.6538 3.81046 12.6521 4.35825 13.1978L11.1183 19.9317L23.5573 5.10036C24.0542 4.50794 24.9372 4.43047 25.5297 4.92733Z"
    fill="currentColor"/>
</svg>
`}),hp=Object.freeze({__proto__:null,checkmarkBoldSvg:sl`<svg fill="none" viewBox="0 0 14 14">
  <path
    fill="currentColor"
    fill-rule="evenodd"
    d="M12.9576 2.23383C13.3807 2.58873 13.4361 3.21947 13.0812 3.64263L6.37159 11.6426C6.19161 11.8572 5.92989 11.9865 5.65009 11.999C5.3703 12.0115 5.09808 11.9062 4.89965 11.7085L0.979321 7.80331C0.588042 7.41354 0.586817 6.78038 0.976585 6.3891C1.36635 5.99782 1.99952 5.99659 2.3908 6.38636L5.53928 9.52268L11.5488 2.35742C11.9037 1.93426 12.5344 1.87893 12.9576 2.23383Z"
    clip-rule="evenodd"
  />
</svg>`}),hg=Object.freeze({__proto__:null,chevronBottomSvg:sl`<svg fill="none" viewBox="0 0 16 16">
  <path
    fill="currentColor"
    fill-rule="evenodd"
    d="M1.46 4.96a1 1 0 0 1 1.41 0L8 10.09l5.13-5.13a1 1 0 1 1 1.41 1.41l-5.83 5.84a1 1 0 0 1-1.42 0L1.46 6.37a1 1 0 0 1 0-1.41Z"
    clip-rule="evenodd"
  />
</svg>`}),hf=Object.freeze({__proto__:null,chevronLeftSvg:sl`<svg fill="none" viewBox="0 0 16 16">
  <path
    fill="currentColor"
    fill-rule="evenodd"
    d="M11.04 1.46a1 1 0 0 1 0 1.41L5.91 8l5.13 5.13a1 1 0 1 1-1.41 1.41L3.79 8.71a1 1 0 0 1 0-1.42l5.84-5.83a1 1 0 0 1 1.41 0Z"
    clip-rule="evenodd"
  />
</svg>`}),hw=Object.freeze({__proto__:null,chevronRightSvg:sl`<svg fill="none" viewBox="0 0 16 16">
  <path
    fill="currentColor"
    fill-rule="evenodd"
    d="M4.96 14.54a1 1 0 0 1 0-1.41L10.09 8 4.96 2.87a1 1 0 0 1 1.41-1.41l5.84 5.83a1 1 0 0 1 0 1.42l-5.84 5.83a1 1 0 0 1-1.41 0Z"
    clip-rule="evenodd"
  />
</svg>`}),hm=Object.freeze({__proto__:null,chevronTopSvg:sl`<svg fill="none" viewBox="0 0 16 16">
  <path
    fill="currentColor"
    fill-rule="evenodd"
    d="M14.54 11.04a1 1 0 0 1-1.41 0L8 5.92l-5.13 5.12a1 1 0 1 1-1.41-1.41l5.83-5.84a1 1 0 0 1 1.42 0l5.83 5.84a1 1 0 0 1 0 1.41Z"
    clip-rule="evenodd"
  />
</svg>`}),hv=Object.freeze({__proto__:null,chromeStoreSvg:sl`<svg width="36" height="36" fill="none">
  <path
    fill="#fff"
    fill-opacity=".05"
    d="M0 14.94c0-5.55 0-8.326 1.182-10.4a9 9 0 0 1 3.359-3.358C6.614 0 9.389 0 14.94 0h6.12c5.55 0 8.326 0 10.4 1.182a9 9 0 0 1 3.358 3.359C36 6.614 36 9.389 36 14.94v6.12c0 5.55 0 8.326-1.182 10.4a9 9 0 0 1-3.359 3.358C29.386 36 26.611 36 21.06 36h-6.12c-5.55 0-8.326 0-10.4-1.182a9 9 0 0 1-3.358-3.359C0 29.386 0 26.611 0 21.06v-6.12Z"
  />
  <path
    stroke="#fff"
    stroke-opacity=".05"
    d="M14.94.5h6.12c2.785 0 4.84 0 6.46.146 1.612.144 2.743.43 3.691.97a8.5 8.5 0 0 1 3.172 3.173c.541.948.826 2.08.971 3.692.145 1.62.146 3.675.146 6.459v6.12c0 2.785 0 4.84-.146 6.46-.145 1.612-.43 2.743-.97 3.691a8.5 8.5 0 0 1-3.173 3.172c-.948.541-2.08.826-3.692.971-1.62.145-3.674.146-6.459.146h-6.12c-2.784 0-4.84 0-6.46-.146-1.612-.145-2.743-.43-3.691-.97a8.5 8.5 0 0 1-3.172-3.173c-.541-.948-.827-2.08-.971-3.692C.5 25.9.5 23.845.5 21.06v-6.12c0-2.784 0-4.84.146-6.46.144-1.612.43-2.743.97-3.691A8.5 8.5 0 0 1 4.79 1.617C5.737 1.076 6.869.79 8.48.646 10.1.5 12.156.5 14.94.5Z"
  />
  <path
    fill="url(#a)"
    d="M17.998 10.8h12.469a14.397 14.397 0 0 0-24.938.001l6.234 10.798.006-.001a7.19 7.19 0 0 1 6.23-10.799Z"
  />
  <path
    fill="url(#b)"
    d="m24.237 21.598-6.234 10.798A14.397 14.397 0 0 0 30.47 10.798H18.002l-.002.006a7.191 7.191 0 0 1 6.237 10.794Z"
  />
  <path
    fill="url(#c)"
    d="M11.765 21.601 5.531 10.803A14.396 14.396 0 0 0 18.001 32.4l6.235-10.798-.004-.004a7.19 7.19 0 0 1-12.466.004Z"
  />
  <path fill="#fff" d="M18 25.2a7.2 7.2 0 1 0 0-14.4 7.2 7.2 0 0 0 0 14.4Z" />
  <path fill="#1A73E8" d="M18 23.7a5.7 5.7 0 1 0 0-11.4 5.7 5.7 0 0 0 0 11.4Z" />
  <defs>
    <linearGradient
      id="a"
      x1="6.294"
      x2="41.1"
      y1="5.995"
      y2="5.995"
      gradientUnits="userSpaceOnUse"
    >
      <stop stop-color="#D93025" />
      <stop offset="1" stop-color="#EA4335" />
    </linearGradient>
    <linearGradient
      id="b"
      x1="20.953"
      x2="37.194"
      y1="32.143"
      y2="2.701"
      gradientUnits="userSpaceOnUse"
    >
      <stop stop-color="#FCC934" />
      <stop offset="1" stop-color="#FBBC04" />
    </linearGradient>
    <linearGradient
      id="c"
      x1="25.873"
      x2="9.632"
      y1="31.2"
      y2="1.759"
      gradientUnits="userSpaceOnUse"
    >
      <stop stop-color="#1E8E3E" />
      <stop offset="1" stop-color="#34A853" />
    </linearGradient>
  </defs>
</svg>`}),hb=Object.freeze({__proto__:null,clockSvg:sl`<svg width="14" height="14" viewBox="0 0 14 14" fill="none">
  <path 
    fill-rule="evenodd" 
    clip-rule="evenodd" 
    d="M7.00235 2C4.24 2 2.00067 4.23858 2.00067 7C2.00067 9.76142 4.24 12 7.00235 12C9.7647 12 12.004 9.76142 12.004 7C12.004 4.23858 9.7647 2 7.00235 2ZM0 7C0 3.13401 3.13506 0 7.00235 0C10.8696 0 14.0047 3.13401 14.0047 7C14.0047 10.866 10.8696 14 7.00235 14C3.13506 14 0 10.866 0 7ZM7.00235 3C7.55482 3 8.00269 3.44771 8.00269 4V6.58579L9.85327 8.43575C10.2439 8.82627 10.2439 9.45944 9.85327 9.84996C9.46262 10.2405 8.82924 10.2405 8.43858 9.84996L6.29501 7.70711C6.10741 7.51957 6.00201 7.26522 6.00201 7V4C6.00201 3.44771 6.44988 3 7.00235 3Z" 
    fill="currentColor"
  />
</svg>`}),hy=Object.freeze({__proto__:null,closeSvg:sl`<svg fill="none" viewBox="0 0 16 16">
  <path
    fill="currentColor"
    fill-rule="evenodd"
    d="M2.54 2.54a1 1 0 0 1 1.42 0L8 6.6l4.04-4.05a1 1 0 1 1 1.42 1.42L9.4 8l4.05 4.04a1 1 0 0 1-1.42 1.42L8 9.4l-4.04 4.05a1 1 0 0 1-1.42-1.42L6.6 8 2.54 3.96a1 1 0 0 1 0-1.42Z"
    clip-rule="evenodd"
  />
</svg>`}),hC=Object.freeze({__proto__:null,compassSvg:sl`<svg fill="none" viewBox="0 0 16 16">
  <path
    fill="currentColor"
    fill-rule="evenodd"
    d="M8 2a6 6 0 1 0 0 12A6 6 0 0 0 8 2ZM0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8Zm10.66-2.65a1 1 0 0 1 .23 1.06L9.83 9.24a1 1 0 0 1-.59.58l-2.83 1.06A1 1 0 0 1 5.13 9.6l1.06-2.82a1 1 0 0 1 .58-.59L9.6 5.12a1 1 0 0 1 1.06.23ZM7.9 7.89l-.13.35.35-.13.12-.35-.34.13Z"
    clip-rule="evenodd"
  />
</svg>`}),hx=Object.freeze({__proto__:null,coinPlaceholderSvg:sl`<svg fill="none" viewBox="0 0 20 20">
  <path
    fill="currentColor"
    fill-rule="evenodd"
    d="M10 3a7 7 0 0 0-6.85 8.44l8.29-8.3C10.97 3.06 10.49 3 10 3Zm3.49.93-9.56 9.56c.32.55.71 1.06 1.16 1.5L15 5.1a7.03 7.03 0 0 0-1.5-1.16Zm2.7 2.8-9.46 9.46a7 7 0 0 0 9.46-9.46ZM1.99 5.9A9 9 0 1 1 18 14.09 9 9 0 0 1 1.98 5.91Z"
    clip-rule="evenodd"
  />
</svg>`}),hE=Object.freeze({__proto__:null,copySvg:sl`<svg
  xmlns="http://www.w3.org/2000/svg"
  width="16"
  height="16"
  viewBox="0 0 16 16"
  fill="none"
>
  <path
    fill="currentColor"
    fill-rule="evenodd"
    clip-rule="evenodd"
    d="M9.21498 1.28565H10.5944C11.1458 1.28562 11.6246 1.2856 12.0182 1.32093C12.4353 1.35836 12.853 1.44155 13.2486 1.66724C13.7005 1.92498 14.0749 2.29935 14.3326 2.75122C14.5583 3.14689 14.6415 3.56456 14.6789 3.9817C14.7143 4.37531 14.7142 4.85403 14.7142 5.40545V6.78489C14.7142 7.33631 14.7143 7.81503 14.6789 8.20865C14.6415 8.62578 14.5583 9.04345 14.3326 9.43912C14.0749 9.89099 13.7005 10.2654 13.2486 10.5231C12.853 10.7488 12.4353 10.832 12.0182 10.8694C11.7003 10.8979 11.3269 10.9034 10.9045 10.9045C10.9034 11.3269 10.8979 11.7003 10.8694 12.0182C10.832 12.4353 10.7488 12.853 10.5231 13.2486C10.2654 13.7005 9.89099 14.0749 9.43912 14.3326C9.04345 14.5583 8.62578 14.6415 8.20865 14.6789C7.81503 14.7143 7.33631 14.7142 6.78489 14.7142H5.40545C4.85403 14.7142 4.37531 14.7143 3.9817 14.6789C3.56456 14.6415 3.14689 14.5583 2.75122 14.3326C2.29935 14.0749 1.92498 13.7005 1.66724 13.2486C1.44155 12.853 1.35836 12.4353 1.32093 12.0182C1.2856 11.6246 1.28562 11.1458 1.28565 10.5944V9.21498C1.28562 8.66356 1.2856 8.18484 1.32093 7.79122C1.35836 7.37409 1.44155 6.95642 1.66724 6.56074C1.92498 6.10887 2.29935 5.73451 2.75122 5.47677C3.14689 5.25108 3.56456 5.16789 3.9817 5.13045C4.2996 5.10192 4.67301 5.09645 5.09541 5.09541C5.09645 4.67302 5.10192 4.2996 5.13045 3.9817C5.16789 3.56456 5.25108 3.14689 5.47676 2.75122C5.73451 2.29935 6.10887 1.92498 6.56074 1.66724C6.95642 1.44155 7.37409 1.35836 7.79122 1.32093C8.18484 1.2856 8.66356 1.28562 9.21498 1.28565ZM5.09541 7.09552C4.68397 7.09667 4.39263 7.10161 4.16046 7.12245C3.88053 7.14757 3.78516 7.18949 3.74214 7.21403C3.60139 7.29431 3.48478 7.41091 3.4045 7.55166C3.37997 7.59468 3.33804 7.69005 3.31292 7.96999C3.28659 8.26345 3.28565 8.65147 3.28565 9.25708V10.5523C3.28565 11.1579 3.28659 11.5459 3.31292 11.8394C3.33804 12.1193 3.37997 12.2147 3.4045 12.2577C3.48478 12.3985 3.60139 12.5151 3.74214 12.5954C3.78516 12.6199 3.88053 12.6618 4.16046 12.6869C4.45393 12.7133 4.84195 12.7142 5.44755 12.7142H6.74279C7.3484 12.7142 7.73641 12.7133 8.02988 12.6869C8.30981 12.6618 8.40518 12.6199 8.44821 12.5954C8.58895 12.5151 8.70556 12.3985 8.78584 12.2577C8.81038 12.2147 8.8523 12.1193 8.87742 11.8394C8.89825 11.6072 8.90319 11.3159 8.90435 10.9045C8.48219 10.9034 8.10898 10.8979 7.79122 10.8694C7.37409 10.832 6.95641 10.7488 6.56074 10.5231C6.10887 10.2654 5.73451 9.89099 5.47676 9.43912C5.25108 9.04345 5.16789 8.62578 5.13045 8.20865C5.10194 7.89089 5.09645 7.51767 5.09541 7.09552ZM7.96999 3.31292C7.69005 3.33804 7.59468 3.37997 7.55166 3.4045C7.41091 3.48478 7.29431 3.60139 7.21403 3.74214C7.18949 3.78516 7.14757 3.88053 7.12245 4.16046C7.09611 4.45393 7.09517 4.84195 7.09517 5.44755V6.74279C7.09517 7.3484 7.09611 7.73641 7.12245 8.02988C7.14757 8.30981 7.18949 8.40518 7.21403 8.4482C7.29431 8.58895 7.41091 8.70556 7.55166 8.78584C7.59468 8.81038 7.69005 8.8523 7.96999 8.87742C8.26345 8.90376 8.65147 8.9047 9.25708 8.9047H10.5523C11.1579 8.9047 11.5459 8.90376 11.8394 8.87742C12.1193 8.8523 12.2147 8.81038 12.2577 8.78584C12.3985 8.70556 12.5151 8.58895 12.5954 8.4482C12.6199 8.40518 12.6618 8.30981 12.6869 8.02988C12.7133 7.73641 12.7142 7.3484 12.7142 6.74279V5.44755C12.7142 4.84195 12.7133 4.45393 12.6869 4.16046C12.6618 3.88053 12.6199 3.78516 12.5954 3.74214C12.5151 3.60139 12.3985 3.48478 12.2577 3.4045C12.2147 3.37997 12.1193 3.33804 11.8394 3.31292C11.5459 3.28659 11.1579 3.28565 10.5523 3.28565H9.25708C8.65147 3.28565 8.26345 3.28659 7.96999 3.31292Z"
    fill="#788181"
  /></svg
>`}),hk=Object.freeze({__proto__:null,cursorSvg:sl` <svg fill="none" viewBox="0 0 13 4">
  <path fill="currentColor" d="M.5 0h12L8.9 3.13a3.76 3.76 0 0 1-4.8 0L.5 0Z" />
</svg>`}),hA=Object.freeze({__proto__:null,cursorTransparentSvg:sl`<svg fill="none" viewBox="0 0 14 6">
  <path style="fill: var(--wui-color-bg-150);" d="M0 1h14L9.21 5.12a3.31 3.31 0 0 1-4.49 0L0 1Z" />
  <path
    style="stroke: var(--wui-color-inverse-100);"
    stroke-opacity=".05"
    d="M1.33 1.5h11.32L8.88 4.75l-.01.01a2.81 2.81 0 0 1-3.8 0l-.02-.01L1.33 1.5Z"
  />
  <path
    style="fill: var(--wui-color-bg-150);"
    d="M1.25.71h11.5L9.21 3.88a3.31 3.31 0 0 1-4.49 0L1.25.71Z"
  />
</svg> `}),hN=Object.freeze({__proto__:null,desktopSvg:sl`<svg fill="none" viewBox="0 0 20 20">
  <path
    fill="currentColor"
    fill-rule="evenodd"
    d="M13.66 2H6.34c-1.07 0-1.96 0-2.68.08-.74.08-1.42.25-2.01.68a4 4 0 0 0-.89.89c-.43.6-.6 1.27-.68 2.01C0 6.38 0 7.26 0 8.34v.89c0 1.07 0 1.96.08 2.68.08.74.25 1.42.68 2.01a4 4 0 0 0 .89.89c.6.43 1.27.6 2.01.68a27 27 0 0 0 2.68.08h7.32a27 27 0 0 0 2.68-.08 4.03 4.03 0 0 0 2.01-.68 4 4 0 0 0 .89-.89c.43-.6.6-1.27.68-2.01.08-.72.08-1.6.08-2.68v-.89c0-1.07 0-1.96-.08-2.68a4.04 4.04 0 0 0-.68-2.01 4 4 0 0 0-.89-.89c-.6-.43-1.27-.6-2.01-.68C15.62 2 14.74 2 13.66 2ZM2.82 4.38c.2-.14.48-.25 1.06-.31C4.48 4 5.25 4 6.4 4h7.2c1.15 0 1.93 0 2.52.07.58.06.86.17 1.06.31a2 2 0 0 1 .44.44c.14.2.25.48.31 1.06.07.6.07 1.37.07 2.52v.77c0 1.15 0 1.93-.07 2.52-.06.58-.17.86-.31 1.06a2 2 0 0 1-.44.44c-.2.14-.48.25-1.06.32-.6.06-1.37.06-2.52.06H6.4c-1.15 0-1.93 0-2.52-.06-.58-.07-.86-.18-1.06-.32a2 2 0 0 1-.44-.44c-.14-.2-.25-.48-.31-1.06C2 11.1 2 10.32 2 9.17V8.4c0-1.15 0-1.93.07-2.52.06-.58.17-.86.31-1.06a2 2 0 0 1 .44-.44Z"
    clip-rule="evenodd"
  />
  <path fill="currentColor" d="M6.14 17.57a1 1 0 1 0 0 2h7.72a1 1 0 1 0 0-2H6.14Z" />
</svg>`}),hI=Object.freeze({__proto__:null,disconnectSvg:sl`<svg fill="none" viewBox="0 0 16 16">
  <path
    fill="currentColor"
    fill-rule="evenodd"
    d="M6.07 1h.57a1 1 0 0 1 0 2h-.52c-.98 0-1.64 0-2.14.06-.48.05-.7.14-.84.24-.13.1-.25.22-.34.35-.1.14-.2.35-.25.83-.05.5-.05 1.16-.05 2.15v2.74c0 .99 0 1.65.05 2.15.05.48.14.7.25.83.1.14.2.25.34.35.14.1.36.2.84.25.5.05 1.16.05 2.14.05h.52a1 1 0 0 1 0 2h-.57c-.92 0-1.69 0-2.3-.07a3.6 3.6 0 0 1-1.8-.61c-.3-.22-.57-.49-.8-.8a3.6 3.6 0 0 1-.6-1.79C.5 11.11.5 10.35.5 9.43V6.58c0-.92 0-1.7.06-2.31a3.6 3.6 0 0 1 .62-1.8c.22-.3.48-.57.79-.79a3.6 3.6 0 0 1 1.8-.61C4.37 1 5.14 1 6.06 1ZM9.5 3a1 1 0 0 1 1.42 0l4.28 4.3a1 1 0 0 1 0 1.4L10.93 13a1 1 0 0 1-1.42-1.42L12.1 9H6.8a1 1 0 1 1 0-2h5.3L9.51 4.42a1 1 0 0 1 0-1.41Z"
    clip-rule="evenodd"
  />
</svg>`}),hS=Object.freeze({__proto__:null,discordSvg:sl`<svg fill="none" viewBox="0 0 40 40">
  <g clip-path="url(#a)">
    <g clip-path="url(#b)">
      <circle cx="20" cy="19.89" r="20" fill="#5865F2" />
      <path
        fill="#fff"
        fill-rule="evenodd"
        d="M25.71 28.15C30.25 28 32 25.02 32 25.02c0-6.61-2.96-11.98-2.96-11.98-2.96-2.22-5.77-2.15-5.77-2.15l-.29.32c3.5 1.07 5.12 2.61 5.12 2.61a16.75 16.75 0 0 0-10.34-1.93l-.35.04a15.43 15.43 0 0 0-5.88 1.9s1.71-1.63 5.4-2.7l-.2-.24s-2.81-.07-5.77 2.15c0 0-2.96 5.37-2.96 11.98 0 0 1.73 2.98 6.27 3.13l1.37-1.7c-2.6-.79-3.6-2.43-3.6-2.43l.58.35.09.06.08.04.02.01.08.05a17.25 17.25 0 0 0 4.52 1.58 14.4 14.4 0 0 0 8.3-.86c.72-.27 1.52-.66 2.37-1.21 0 0-1.03 1.68-3.72 2.44.61.78 1.35 1.67 1.35 1.67Zm-9.55-9.6c-1.17 0-2.1 1.03-2.1 2.28 0 1.25.95 2.28 2.1 2.28 1.17 0 2.1-1.03 2.1-2.28.01-1.25-.93-2.28-2.1-2.28Zm7.5 0c-1.17 0-2.1 1.03-2.1 2.28 0 1.25.95 2.28 2.1 2.28 1.17 0 2.1-1.03 2.1-2.28 0-1.25-.93-2.28-2.1-2.28Z"
        clip-rule="evenodd"
      />
    </g>
  </g>
  <defs>
    <clipPath id="a"><rect width="40" height="40" fill="#fff" rx="20" /></clipPath>
    <clipPath id="b"><path fill="#fff" d="M0 0h40v40H0z" /></clipPath>
  </defs>
</svg>`}),h_=Object.freeze({__proto__:null,etherscanSvg:sl`<svg fill="none" viewBox="0 0 16 16">
  <path
    fill="currentColor"
    d="M4.25 7a.63.63 0 0 0-.63.63v3.97c0 .28-.2.51-.47.54l-.75.07a.93.93 0 0 1-.9-.47A7.51 7.51 0 0 1 5.54.92a7.5 7.5 0 0 1 9.54 4.62c.12.35.06.72-.16 1-.74.97-1.68 1.78-2.6 2.44V4.44a.64.64 0 0 0-.63-.64h-1.06c-.35 0-.63.3-.63.64v5.5c0 .23-.12.42-.32.5l-.52.23V6.05c0-.36-.3-.64-.64-.64H7.45c-.35 0-.64.3-.64.64v4.97c0 .25-.17.46-.4.52a5.8 5.8 0 0 0-.45.11v-4c0-.36-.3-.65-.64-.65H4.25ZM14.07 12.4A7.49 7.49 0 0 1 3.6 14.08c4.09-.58 9.14-2.5 11.87-6.6v.03a7.56 7.56 0 0 1-1.41 4.91Z"
  />
</svg>`}),hT=Object.freeze({__proto__:null,extensionSvg:sl`<svg fill="none" viewBox="0 0 14 15">
  <path
    fill="currentColor"
    fill-rule="evenodd"
    d="M6.71 2.99a.57.57 0 0 0-.57.57 1 1 0 0 1-1 1c-.58 0-.96 0-1.24.03-.27.03-.37.07-.42.1a.97.97 0 0 0-.36.35c-.04.08-.09.21-.11.67a2.57 2.57 0 0 1 0 5.13c.02.45.07.6.11.66.09.15.21.28.36.36.07.04.21.1.67.12a2.57 2.57 0 0 1 5.12 0c.46-.03.6-.08.67-.12a.97.97 0 0 0 .36-.36c.03-.04.07-.14.1-.41.02-.29.03-.66.03-1.24a1 1 0 0 1 1-1 .57.57 0 0 0 0-1.15 1 1 0 0 1-1-1c0-.58 0-.95-.03-1.24a1.04 1.04 0 0 0-.1-.42.97.97 0 0 0-.36-.36 1.04 1.04 0 0 0-.42-.1c-.28-.02-.65-.02-1.24-.02a1 1 0 0 1-1-1 .57.57 0 0 0-.57-.57ZM5.15 13.98a1 1 0 0 0 .99-1v-.78a.57.57 0 0 1 1.14 0v.78a1 1 0 0 0 .99 1H8.36a66.26 66.26 0 0 0 .73 0 3.78 3.78 0 0 0 1.84-.38c.46-.26.85-.64 1.1-1.1.23-.4.32-.8.36-1.22.02-.2.03-.4.03-.63a2.57 2.57 0 0 0 0-4.75c0-.23-.01-.44-.03-.63a2.96 2.96 0 0 0-.35-1.22 2.97 2.97 0 0 0-1.1-1.1c-.4-.22-.8-.31-1.22-.35a8.7 8.7 0 0 0-.64-.04 2.57 2.57 0 0 0-4.74 0c-.23 0-.44.02-.63.04-.42.04-.83.13-1.22.35-.46.26-.84.64-1.1 1.1-.33.57-.37 1.2-.39 1.84a21.39 21.39 0 0 0 0 .72v.1a1 1 0 0 0 1 .99h.78a.57.57 0 0 1 0 1.15h-.77a1 1 0 0 0-1 .98v.1a63.87 63.87 0 0 0 0 .73c0 .64.05 1.27.38 1.83.26.47.64.85 1.1 1.11.56.32 1.2.37 1.84.38a20.93 20.93 0 0 0 .72 0h.1Z"
    clip-rule="evenodd"
  />
</svg>`}),hO=Object.freeze({__proto__:null,externalLinkSvg:sl`<svg fill="none" viewBox="0 0 14 15">
  <path
    fill="currentColor"
    fill-rule="evenodd"
    d="M3.74 3.99a1 1 0 0 1 1-1H11a1 1 0 0 1 1 1v6.26a1 1 0 0 1-2 0V6.4l-6.3 6.3a1 1 0 0 1-1.4-1.42l6.29-6.3H4.74a1 1 0 0 1-1-1Z"
    clip-rule="evenodd"
  />
</svg>`}),hP=Object.freeze({__proto__:null,facebookSvg:sl`<svg fill="none" viewBox="0 0 40 40">
  <g clip-path="url(#a)">
    <g clip-path="url(#b)">
      <circle cx="20" cy="19.89" r="20" fill="#1877F2" />
      <g clip-path="url(#c)">
        <path
          fill="#fff"
          d="M26 12.38h-2.89c-.92 0-1.61.38-1.61 1.34v1.66H26l-.36 4.5H21.5v12H17v-12h-3v-4.5h3V12.5c0-3.03 1.6-4.62 5.2-4.62H26v4.5Z"
        />
      </g>
    </g>
    <path
      fill="#1877F2"
      d="M40 20a20 20 0 1 0-23.13 19.76V25.78H11.8V20h5.07v-4.4c0-5.02 3-7.79 7.56-7.79 2.19 0 4.48.4 4.48.4v4.91h-2.53c-2.48 0-3.25 1.55-3.25 3.13V20h5.54l-.88 5.78h-4.66v13.98A20 20 0 0 0 40 20Z"
    />
    <path
      fill="#fff"
      d="m27.79 25.78.88-5.78h-5.55v-3.75c0-1.58.78-3.13 3.26-3.13h2.53V8.2s-2.3-.39-4.48-.39c-4.57 0-7.55 2.77-7.55 7.78V20H11.8v5.78h5.07v13.98a20.15 20.15 0 0 0 6.25 0V25.78h4.67Z"
    />
  </g>
  <defs>
    <clipPath id="a"><rect width="40" height="40" fill="#fff" rx="20" /></clipPath>
    <clipPath id="b"><path fill="#fff" d="M0 0h40v40H0z" /></clipPath>
    <clipPath id="c"><path fill="#fff" d="M8 7.89h24v24H8z" /></clipPath>
  </defs>
</svg>`}),hR=Object.freeze({__proto__:null,farcasterSvg:sl`<svg style="border-radius: 9999px; overflow: hidden;"  fill="none" viewBox="0 0 1000 1000">
  <rect width="1000" height="1000" rx="9999" ry="9999" fill="#855DCD"/>
  <path fill="#855DCD" d="M0 0h1000v1000H0V0Z" />
  <path
    fill="#fff"
    d="M320 248h354v504h-51.96V521.13h-.5c-5.76-63.8-59.31-113.81-124.54-113.81s-118.78 50-124.53 113.81h-.5V752H320V248Z"
  />
  <path
    fill="#fff"
    d="m225 320 21.16 71.46h17.9v289.09a16.29 16.29 0 0 0-16.28 16.24v19.49h-3.25a16.3 16.3 0 0 0-16.28 16.24V752h182.26v-19.48a16.22 16.22 0 0 0-16.28-16.24h-3.25v-19.5a16.22 16.22 0 0 0-16.28-16.23h-19.52V320H225Zm400.3 360.55a16.3 16.3 0 0 0-15.04 10.02 16.2 16.2 0 0 0-1.24 6.22v19.49h-3.25a16.29 16.29 0 0 0-16.27 16.24V752h182.24v-19.48a16.23 16.23 0 0 0-16.27-16.24h-3.25v-19.5a16.2 16.2 0 0 0-10.04-15 16.3 16.3 0 0 0-6.23-1.23v-289.1h17.9L775 320H644.82v360.55H625.3Z"
  />
</svg>`}),h$=Object.freeze({__proto__:null,filtersSvg:sl`<svg fill="none" viewBox="0 0 16 16">
  <path
    fill="currentColor"
    fill-rule="evenodd"
    d="M0 3a1 1 0 0 1 1-1h14a1 1 0 1 1 0 2H1a1 1 0 0 1-1-1Zm2.63 5.25a1 1 0 0 1 1-1h8.75a1 1 0 1 1 0 2H3.63a1 1 0 0 1-1-1Zm2.62 5.25a1 1 0 0 1 1-1h3.5a1 1 0 0 1 0 2h-3.5a1 1 0 0 1-1-1Z"
    clip-rule="evenodd"
  />
</svg>`}),hL=Object.freeze({__proto__:null,githubSvg:sl`<svg fill="none" viewBox="0 0 40 40">
  <g clip-path="url(#a)">
    <g clip-path="url(#b)">
      <circle cx="20" cy="19.89" r="20" fill="#1B1F23" />
      <g clip-path="url(#c)">
        <path
          fill="#fff"
          d="M8 19.89a12 12 0 1 1 15.8 11.38c-.6.12-.8-.26-.8-.57v-3.3c0-1.12-.4-1.85-.82-2.22 2.67-.3 5.48-1.31 5.48-5.92 0-1.31-.47-2.38-1.24-3.22.13-.3.54-1.52-.12-3.18 0 0-1-.32-3.3 1.23a11.54 11.54 0 0 0-6 0c-2.3-1.55-3.3-1.23-3.3-1.23a4.32 4.32 0 0 0-.12 3.18 4.64 4.64 0 0 0-1.24 3.22c0 4.6 2.8 5.63 5.47 5.93-.34.3-.65.83-.76 1.6-.69.31-2.42.84-3.5-1 0 0-.63-1.15-1.83-1.23 0 0-1.18-.02-.09.73 0 0 .8.37 1.34 1.76 0 0 .7 2.14 4.03 1.41v2.24c0 .31-.2.68-.8.57A12 12 0 0 1 8 19.9Z"
        />
      </g>
    </g>
  </g>
  <defs>
    <clipPath id="a"><rect width="40" height="40" fill="#fff" rx="20" /></clipPath>
    <clipPath id="b"><path fill="#fff" d="M0 0h40v40H0z" /></clipPath>
    <clipPath id="c"><path fill="#fff" d="M8 7.89h24v24H8z" /></clipPath>
  </defs>
</svg>`}),hB=Object.freeze({__proto__:null,googleSvg:sl`<svg fill="none" viewBox="0 0 40 40">
  <path
    fill="#4285F4"
    d="M32.74 20.3c0-.93-.08-1.81-.24-2.66H20.26v5.03h7a6 6 0 0 1-2.62 3.91v3.28h4.22c2.46-2.27 3.88-5.6 3.88-9.56Z"
  />
  <path
    fill="#34A853"
    d="M20.26 33a12.4 12.4 0 0 0 8.6-3.14l-4.22-3.28a7.74 7.74 0 0 1-4.38 1.26 7.76 7.76 0 0 1-7.28-5.36H8.65v3.36A12.99 12.99 0 0 0 20.26 33Z"
  />
  <path
    fill="#FBBC05"
    d="M12.98 22.47a7.79 7.79 0 0 1 0-4.94v-3.36H8.65a12.84 12.84 0 0 0 0 11.66l3.37-2.63.96-.73Z"
  />
  <path
    fill="#EA4335"
    d="M20.26 12.18a7.1 7.1 0 0 1 4.98 1.93l3.72-3.72A12.47 12.47 0 0 0 20.26 7c-5.08 0-9.47 2.92-11.6 7.17l4.32 3.36a7.76 7.76 0 0 1 7.28-5.35Z"
  />
</svg>`}),hM=Object.freeze({__proto__:null,helpCircleSvg:sl`<svg fill="none" viewBox="0 0 16 16">
  <path
    fill="currentColor"
    d="M8.51 5.66a.83.83 0 0 0-.57-.2.83.83 0 0 0-.52.28.8.8 0 0 0-.25.52 1 1 0 0 1-2 0c0-.75.34-1.43.81-1.91a2.75 2.75 0 0 1 4.78 1.92c0 1.24-.8 1.86-1.25 2.2l-.04.03c-.47.36-.5.43-.5.65a1 1 0 1 1-2 0c0-1.25.8-1.86 1.24-2.2l.04-.04c.47-.36.5-.43.5-.65 0-.3-.1-.49-.24-.6ZM9.12 11.87a1.13 1.13 0 1 1-2.25 0 1.13 1.13 0 0 1 2.25 0Z"
  />
  <path
    fill="currentColor"
    fill-rule="evenodd"
    d="M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8Zm8-6a6 6 0 1 0 0 12A6 6 0 0 0 8 2Z"
    clip-rule="evenodd"
  />
</svg>`}),hU=Object.freeze({__proto__:null,imageSvg:sl`<svg width="14" height="14" viewBox="0 0 14 14" fill="none">
  <path d="M4.98926 3.73932C4.2989 3.73932 3.73926 4.29896 3.73926 4.98932C3.73926 5.67968 4.2989 6.23932 4.98926 6.23932C5.67962 6.23932 6.23926 5.67968 6.23926 4.98932C6.23926 4.29896 5.67962 3.73932 4.98926 3.73932Z" fill="currentColor"/>
  <path fill-rule="evenodd" clip-rule="evenodd" d="M7.60497 0.500001H6.39504C5.41068 0.499977 4.59185 0.499958 3.93178 0.571471C3.24075 0.64634 2.60613 0.809093 2.04581 1.21619C1.72745 1.44749 1.44749 1.72745 1.21619 2.04581C0.809093 2.60613 0.64634 3.24075 0.571471 3.93178C0.499958 4.59185 0.499977 5.41065 0.500001 6.39501V7.57815C0.499998 8.37476 0.499995 9.05726 0.534869 9.62725C0.570123 10.2034 0.644114 10.7419 0.828442 11.2302C0.925651 11.4877 1.05235 11.7287 1.21619 11.9542C1.44749 12.2726 1.72745 12.5525 2.04581 12.7838C2.60613 13.1909 3.24075 13.3537 3.93178 13.4285C4.59185 13.5001 5.41066 13.5 6.39503 13.5H7.60496C8.58933 13.5 9.40815 13.5001 10.0682 13.4285C10.7593 13.3537 11.3939 13.1909 11.9542 12.7838C12.2726 12.5525 12.5525 12.2726 12.7838 11.9542C13.1909 11.3939 13.3537 10.7593 13.4285 10.0682C13.5 9.40816 13.5 8.58935 13.5 7.60497V6.39505C13.5 5.41068 13.5 4.59185 13.4285 3.93178C13.3537 3.24075 13.1909 2.60613 12.7838 2.04581C12.5525 1.72745 12.2726 1.44749 11.9542 1.21619C11.3939 0.809093 10.7593 0.64634 10.0682 0.571471C9.40816 0.499958 8.58933 0.499977 7.60497 0.500001ZM3.22138 2.83422C3.38394 2.71612 3.62634 2.61627 4.14721 2.55984C4.68679 2.50138 5.39655 2.5 6.45 2.5H7.55C8.60345 2.5 9.31322 2.50138 9.8528 2.55984C10.3737 2.61627 10.6161 2.71612 10.7786 2.83422C10.9272 2.94216 11.0578 3.07281 11.1658 3.22138C11.2839 3.38394 11.3837 3.62634 11.4402 4.14721C11.4986 4.68679 11.5 5.39655 11.5 6.45V6.49703C10.9674 6.11617 10.386 5.84936 9.74213 5.81948C8.40536 5.75745 7.3556 6.73051 6.40509 7.84229C6.33236 7.92737 6.27406 7.98735 6.22971 8.02911L6.1919 8.00514L6.17483 7.99427C6.09523 7.94353 5.98115 7.87083 5.85596 7.80302C5.56887 7.64752 5.18012 7.4921 4.68105 7.4921C4.66697 7.4921 4.6529 7.49239 4.63884 7.49299C3.79163 7.52878 3.09922 8.1106 2.62901 8.55472C2.58751 8.59392 2.54594 8.6339 2.50435 8.6745C2.50011 8.34653 2.5 7.97569 2.5 7.55V6.45C2.5 5.39655 2.50138 4.68679 2.55984 4.14721C2.61627 3.62634 2.71612 3.38394 2.83422 3.22138C2.94216 3.07281 3.07281 2.94216 3.22138 2.83422ZM10.3703 8.14825C10.6798 8.37526 11.043 8.71839 11.4832 9.20889C11.4744 9.44992 11.4608 9.662 11.4402 9.8528C11.3837 10.3737 11.2839 10.6161 11.1658 10.7786C11.0578 10.9272 10.9272 11.0578 10.7786 11.1658C10.6161 11.2839 10.3737 11.3837 9.8528 11.4402C9.31322 11.4986 8.60345 11.5 7.55 11.5H6.45C5.39655 11.5 4.68679 11.4986 4.14721 11.4402C3.62634 11.3837 3.38394 11.2839 3.22138 11.1658C3.15484 11.1174 3.0919 11.0645 3.03298 11.0075C3.10126 10.9356 3.16806 10.8649 3.23317 10.7959L3.29772 10.7276C3.55763 10.4525 3.78639 10.2126 4.00232 10.0087C4.22016 9.80294 4.39412 9.66364 4.53524 9.57742C4.63352 9.51738 4.69022 9.49897 4.71275 9.49345C4.76387 9.49804 4.81803 9.51537 4.90343 9.56162C4.96409 9.59447 5.02355 9.63225 5.11802 9.69238L5.12363 9.69595C5.20522 9.74789 5.32771 9.82587 5.46078 9.89278C5.76529 10.0459 6.21427 10.186 6.74977 10.0158C7.21485 9.86796 7.59367 9.52979 7.92525 9.14195C8.91377 7.98571 9.38267 7.80495 9.64941 7.81733C9.7858 7.82366 10.0101 7.884 10.3703 8.14825Z" fill="currentColor"/>
</svg>`}),hz=Object.freeze({__proto__:null,idSvg:sl`<svg
 xmlns="http://www.w3.org/2000/svg"
 width="28"
 height="28"
 viewBox="0 0 28 28"
 fill="none">
  <path
    fill="#949E9E"
    fill-rule="evenodd"
    d="M7.974 2.975h12.052c1.248 0 2.296 0 3.143.092.89.096 1.723.307 2.461.844a4.9 4.9 0 0 1 1.084 1.084c.537.738.748 1.57.844 2.461.092.847.092 1.895.092 3.143v6.802c0 1.248 0 2.296-.092 3.143-.096.89-.307 1.723-.844 2.461a4.9 4.9 0 0 1-1.084 1.084c-.738.537-1.57.748-2.461.844-.847.092-1.895.092-3.143.092H7.974c-1.247 0-2.296 0-3.143-.092-.89-.096-1.723-.307-2.461-.844a4.901 4.901 0 0 1-1.084-1.084c-.537-.738-.748-1.571-.844-2.461C.35 19.697.35 18.649.35 17.4v-6.802c0-1.248 0-2.296.092-3.143.096-.89.307-1.723.844-2.461A4.9 4.9 0 0 1 2.37 3.91c.738-.537 1.571-.748 2.461-.844.847-.092 1.895-.092 3.143-.092ZM5.133 5.85c-.652.071-.936.194-1.117.326a2.1 2.1 0 0 0-.465.465c-.132.181-.255.465-.325 1.117-.074.678-.076 1.573-.076 2.917v6.65c0 1.344.002 2.239.076 2.917.07.652.193.936.325 1.117a2.1 2.1 0 0 0 .465.465c.181.132.465.255 1.117.326.678.073 1.574.075 2.917.075h11.9c1.344 0 2.239-.002 2.917-.075.652-.071.936-.194 1.117-.326.179-.13.335-.286.465-.465.132-.181.255-.465.326-1.117.073-.678.075-1.573.075-2.917v-6.65c0-1.344-.002-2.239-.075-2.917-.071-.652-.194-.936-.326-1.117a2.1 2.1 0 0 0-.465-.465c-.181-.132-.465-.255-1.117-.326-.678-.073-1.573-.075-2.917-.075H8.05c-1.343 0-2.239.002-2.917.075Zm.467 7.275a3.15 3.15 0 1 1 6.3 0 3.15 3.15 0 0 1-6.3 0Zm8.75-1.75a1.4 1.4 0 0 1 1.4-1.4h3.5a1.4 1.4 0 0 1 0 2.8h-3.5a1.4 1.4 0 0 1-1.4-1.4Zm0 5.25a1.4 1.4 0 0 1 1.4-1.4H21a1.4 1.4 0 1 1 0 2.8h-5.25a1.4 1.4 0 0 1-1.4-1.4Z"
    clip-rule="evenodd"/>
</svg>`}),hD=Object.freeze({__proto__:null,infoCircleSvg:sl`<svg fill="none" viewBox="0 0 14 15">
  <path
    fill="currentColor"
    d="M6 10.49a1 1 0 1 0 2 0v-2a1 1 0 0 0-2 0v2ZM7 4.49a1 1 0 1 0 0 2 1 1 0 0 0 0-2Z"
  />
  <path
    fill="currentColor"
    fill-rule="evenodd"
    d="M7 14.99a7 7 0 1 0 0-14 7 7 0 0 0 0 14Zm5-7a5 5 0 1 1-10 0 5 5 0 0 1 10 0Z"
    clip-rule="evenodd"
  />
</svg>`}),hj=Object.freeze({__proto__:null,lightbulbSvg:sl`<svg width="10" height="10" viewBox="0 0 10 10" fill="none" xmlns="http://www.w3.org/2000/svg">
<path fill-rule="evenodd" clip-rule="evenodd" d="M5.00177 1.78569C3.8179 1.78569 2.85819 2.74508 2.85819 3.92855C2.85819 4.52287 3.09928 5.05956 3.49077 5.4485L3.5005 5.45817C3.64381 5.60054 3.76515 5.72108 3.85631 5.81845C3.93747 5.90512 4.05255 6.03218 4.12889 6.1805C4.16999 6.26034 4.19 6.30843 4.21768 6.39385C4.22145 6.40546 4.22499 6.41703 4.22833 6.42855H5.77521C5.77854 6.41703 5.78208 6.40547 5.78585 6.39385C5.81353 6.30843 5.83354 6.26034 5.87464 6.1805C5.95098 6.03218 6.06606 5.90512 6.14722 5.81845C6.23839 5.72108 6.35973 5.60053 6.50304 5.45816L6.51276 5.4485C6.90425 5.05956 7.14534 4.52287 7.14534 3.92855C7.14534 2.74508 6.18563 1.78569 5.00177 1.78569ZM5.71629 7.85712H4.28724C4.28724 8.21403 4.28876 8.40985 4.30703 8.54571C4.30727 8.54748 4.30751 8.54921 4.30774 8.55091C4.30944 8.55115 4.31118 8.55138 4.31295 8.55162C4.44884 8.56989 4.64474 8.5714 5.00177 8.5714C5.3588 8.5714 5.55469 8.56989 5.69059 8.55162C5.69236 8.55138 5.69409 8.55115 5.69579 8.55091C5.69603 8.54921 5.69627 8.54748 5.6965 8.54571C5.71477 8.40985 5.71629 8.21403 5.71629 7.85712ZM2.85819 7.14283C2.85819 6.9948 2.85796 6.91114 2.8548 6.85032C2.85461 6.84656 2.85441 6.84309 2.85421 6.83988C2.84393 6.8282 2.83047 6.81334 2.81301 6.79469C2.74172 6.71856 2.63908 6.61643 2.48342 6.46178C1.83307 5.81566 1.42914 4.91859 1.42914 3.92855C1.42914 1.9561 3.02866 0.357117 5.00177 0.357117C6.97487 0.357117 8.57439 1.9561 8.57439 3.92855C8.57439 4.91859 8.17047 5.81566 7.52012 6.46178C7.36445 6.61643 7.26182 6.71856 7.19053 6.79469C7.17306 6.81334 7.1596 6.8282 7.14932 6.83988C7.14912 6.84309 7.14892 6.84656 7.14873 6.85032C7.14557 6.91114 7.14534 6.9948 7.14534 7.14283V7.85712C7.14534 7.87009 7.14535 7.88304 7.14535 7.89598C7.14541 8.19889 7.14547 8.49326 7.11281 8.73606C7.076 9.00978 6.98631 9.32212 6.72678 9.58156C6.46726 9.841 6.15481 9.93065 5.881 9.96745C5.63813 10.0001 5.34365 10 5.04064 9.99998C5.0277 9.99998 5.01474 9.99998 5.00177 9.99998C4.98879 9.99998 4.97583 9.99998 4.96289 9.99998C4.65988 10 4.36541 10.0001 4.12253 9.96745C3.84872 9.93065 3.53628 9.841 3.27675 9.58156C3.01722 9.32212 2.92753 9.00978 2.89072 8.73606C2.85807 8.49326 2.85812 8.19889 2.85818 7.89598C2.85819 7.88304 2.85819 7.87008 2.85819 7.85712V7.14283ZM7.1243 6.86977C7.12366 6.87069 7.1233 6.87116 7.12327 6.87119C7.12323 6.87123 7.12356 6.87076 7.1243 6.86977ZM2.88027 6.8712C2.88025 6.87119 2.87988 6.8707 2.87921 6.86975C2.87995 6.87072 2.88028 6.8712 2.88027 6.8712Z" fill="#949E9E"/>
</svg>`}),hW=Object.freeze({__proto__:null,mailSvg:sl`<svg fill="none" viewBox="0 0 16 16">
  <path
    fill="currentColor"
    fill-rule="evenodd"
    d="M4.83 1.34h6.34c.68 0 1.26 0 1.73.04.5.05.97.15 1.42.4.52.3.95.72 1.24 1.24.26.45.35.92.4 1.42.04.47.04 1.05.04 1.73v3.71c0 .69 0 1.26-.04 1.74-.05.5-.14.97-.4 1.41-.3.52-.72.95-1.24 1.25-.45.25-.92.35-1.42.4-.47.03-1.05.03-1.73.03H4.83c-.68 0-1.26 0-1.73-.04-.5-.04-.97-.14-1.42-.4-.52-.29-.95-.72-1.24-1.24a3.39 3.39 0 0 1-.4-1.41A20.9 20.9 0 0 1 0 9.88v-3.7c0-.7 0-1.27.04-1.74.05-.5.14-.97.4-1.42.3-.52.72-.95 1.24-1.24.45-.25.92-.35 1.42-.4.47-.04 1.05-.04 1.73-.04ZM3.28 3.38c-.36.03-.51.08-.6.14-.21.11-.39.29-.5.5a.8.8 0 0 0-.08.19l5.16 3.44c.45.3 1.03.3 1.48 0L13.9 4.2a.79.79 0 0 0-.08-.2c-.11-.2-.29-.38-.5-.5-.09-.05-.24-.1-.6-.13-.37-.04-.86-.04-1.6-.04H4.88c-.73 0-1.22 0-1.6.04ZM14 6.54 9.85 9.31a3.33 3.33 0 0 1-3.7 0L2 6.54v3.3c0 .74 0 1.22.03 1.6.04.36.1.5.15.6.11.2.29.38.5.5.09.05.24.1.6.14.37.03.86.03 1.6.03h6.25c.73 0 1.22 0 1.6-.03.35-.03.5-.09.6-.14.2-.12.38-.3.5-.5.05-.1.1-.24.14-.6.03-.38.03-.86.03-1.6v-3.3Z"
    clip-rule="evenodd"
  />
</svg>`}),hH=Object.freeze({__proto__:null,mobileSvg:sl`<svg fill="none" viewBox="0 0 20 20">
  <path fill="currentColor" d="M10.81 5.81a2 2 0 1 1-4 0 2 2 0 0 1 4 0Z" />
  <path
    fill="currentColor"
    fill-rule="evenodd"
    d="M3 4.75A4.75 4.75 0 0 1 7.75 0h4.5A4.75 4.75 0 0 1 17 4.75v10.5A4.75 4.75 0 0 1 12.25 20h-4.5A4.75 4.75 0 0 1 3 15.25V4.75ZM7.75 2A2.75 2.75 0 0 0 5 4.75v10.5A2.75 2.75 0 0 0 7.75 18h4.5A2.75 2.75 0 0 0 15 15.25V4.75A2.75 2.75 0 0 0 12.25 2h-4.5Z"
    clip-rule="evenodd"
  />
</svg>`}),hF=Object.freeze({__proto__:null,moreSvg:sl`<svg fill="none" viewBox="0 0 41 40">
  <path
    style="fill: var(--wui-color-fg-100);"
    fill-opacity=".05"
    d="M.6 20a20 20 0 1 1 40 0 20 20 0 0 1-40 0Z"
  />
  <path
    fill="#949E9E"
    d="M15.6 20.31a2.5 2.5 0 1 1-5 0 2.5 2.5 0 0 1 5 0ZM23.1 20.31a2.5 2.5 0 1 1-5 0 2.5 2.5 0 0 1 5 0ZM28.1 22.81a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5Z"
  />
</svg>`}),hV=Object.freeze({__proto__:null,networkPlaceholderSvg:sl`<svg fill="none" viewBox="0 0 22 20">
  <path
    fill="currentColor"
    fill-rule="evenodd"
    d="M16.32 13.62a3.14 3.14 0 1 1-.99 1.72l-1.6-.93a3.83 3.83 0 0 1-3.71 1 3.66 3.66 0 0 1-1.74-1l-1.6.94a3.14 3.14 0 1 1-1-1.73l1.6-.94a3.7 3.7 0 0 1 0-2 3.81 3.81 0 0 1 1.8-2.33c.29-.17.6-.3.92-.38V6.1a3.14 3.14 0 1 1 2 0l-.01.02v1.85H12a3.82 3.82 0 0 1 2.33 1.8 3.7 3.7 0 0 1 .39 2.91l1.6.93ZM2.6 16.54a1.14 1.14 0 0 0 1.98-1.14 1.14 1.14 0 0 0-1.98 1.14ZM11 2.01a1.14 1.14 0 1 0 0 2.28 1.14 1.14 0 0 0 0-2.28Zm1.68 10.45c.08-.19.14-.38.16-.58v-.05l.02-.13v-.13a1.92 1.92 0 0 0-.24-.8l-.11-.15a1.89 1.89 0 0 0-.74-.6 1.86 1.86 0 0 0-.77-.17h-.19a1.97 1.97 0 0 0-.89.34 1.98 1.98 0 0 0-.61.74 1.99 1.99 0 0 0-.16.9v.05a1.87 1.87 0 0 0 .24.74l.1.15c.12.16.26.3.42.42l.16.1.13.07.04.02a1.84 1.84 0 0 0 .76.17h.17a2 2 0 0 0 .91-.35 1.78 1.78 0 0 0 .52-.58l.03-.05a.84.84 0 0 0 .05-.11Zm5.15 4.5a1.14 1.14 0 0 0 1.14-1.97 1.13 1.13 0 0 0-1.55.41c-.32.55-.13 1.25.41 1.56Z"
    clip-rule="evenodd"
  />
  <path
    fill="currentColor"
    fill-rule="evenodd"
    d="M4.63 9.43a1.5 1.5 0 1 0 1.5-2.6 1.5 1.5 0 0 0-1.5 2.6Zm.32-1.55a.5.5 0 0 1 .68-.19.5.5 0 0 1 .18.68.5.5 0 0 1-.68.19.5.5 0 0 1-.18-.68ZM17.94 8.88a1.5 1.5 0 1 1-2.6-1.5 1.5 1.5 0 1 1 2.6 1.5ZM16.9 7.69a.5.5 0 0 0-.68.19.5.5 0 0 0 .18.68.5.5 0 0 0 .68-.19.5.5 0 0 0-.18-.68ZM9.75 17.75a1.5 1.5 0 1 1 2.6 1.5 1.5 1.5 0 1 1-2.6-1.5Zm1.05 1.18a.5.5 0 0 0 .68-.18.5.5 0 0 0-.18-.68.5.5 0 0 0-.68.18.5.5 0 0 0 .18.68Z"
    clip-rule="evenodd"
  />
</svg>`}),hZ=Object.freeze({__proto__:null,nftPlaceholderSvg:sl`<svg fill="none" viewBox="0 0 20 20">
  <path
    fill="currentColor"
    fill-rule="evenodd"
    d="M9.13 1h1.71c1.46 0 2.63 0 3.56.1.97.1 1.8.33 2.53.85a5 5 0 0 1 1.1 1.11c.53.73.75 1.56.86 2.53.1.93.1 2.1.1 3.55v1.72c0 1.45 0 2.62-.1 3.55-.1.97-.33 1.8-.86 2.53a5 5 0 0 1-1.1 1.1c-.73.53-1.56.75-2.53.86-.93.1-2.1.1-3.55.1H9.13c-1.45 0-2.62 0-3.56-.1-.96-.1-1.8-.33-2.52-.85a5 5 0 0 1-1.1-1.11 5.05 5.05 0 0 1-.86-2.53c-.1-.93-.1-2.1-.1-3.55V9.14c0-1.45 0-2.62.1-3.55.1-.97.33-1.8.85-2.53a5 5 0 0 1 1.1-1.1 5.05 5.05 0 0 1 2.53-.86C6.51 1 7.67 1 9.13 1ZM5.79 3.09a3.1 3.1 0 0 0-1.57.48 3 3 0 0 0-.66.67c-.24.32-.4.77-.48 1.56-.1.82-.1 1.88-.1 3.4v1.6c0 1.15 0 2.04.05 2.76l.41-.42c.5-.5.93-.92 1.32-1.24.41-.33.86-.6 1.43-.7a3 3 0 0 1 .94 0c.35.06.66.2.95.37a17.11 17.11 0 0 0 .8.45c.1-.08.2-.2.41-.4l.04-.03a27 27 0 0 1 1.95-1.84 4.03 4.03 0 0 1 1.91-.94 4 4 0 0 1 1.25 0c.73.11 1.33.46 1.91.94l.64.55V9.2c0-1.52 0-2.58-.1-3.4a3.1 3.1 0 0 0-.48-1.56 3 3 0 0 0-.66-.67 3.1 3.1 0 0 0-1.56-.48C13.37 3 12.3 3 10.79 3h-1.6c-1.52 0-2.59 0-3.4.09Zm11.18 10-.04-.05a26.24 26.24 0 0 0-1.83-1.74c-.45-.36-.73-.48-.97-.52a2 2 0 0 0-.63 0c-.24.04-.51.16-.97.52-.46.38-1.01.93-1.83 1.74l-.02.02c-.17.18-.34.34-.49.47a2.04 2.04 0 0 1-1.08.5 1.97 1.97 0 0 1-1.25-.27l-.79-.46-.02-.02a.65.65 0 0 0-.24-.1 1 1 0 0 0-.31 0c-.08.02-.21.06-.49.28-.3.24-.65.59-1.2 1.14l-.56.56-.65.66a3 3 0 0 0 .62.6c.33.24.77.4 1.57.49.81.09 1.88.09 3.4.09h1.6c1.52 0 2.58 0 3.4-.09a3.1 3.1 0 0 0 1.56-.48 3 3 0 0 0 .66-.67c.24-.32.4-.77.49-1.56l.07-1.12Zm-8.02-1.03ZM4.99 7a2 2 0 1 1 4 0 2 2 0 0 1-4 0Z"
    clip-rule="evenodd"
  />
</svg>`}),hq=Object.freeze({__proto__:null,offSvg:sl`<svg fill="none" viewBox="0 0 16 16">
  <path
    fill="currentColor"
    fill-rule="evenodd"
    d="M8 0a1 1 0 0 1 1 1v5.38a1 1 0 0 1-2 0V1a1 1 0 0 1 1-1ZM5.26 2.6a1 1 0 0 1-.28 1.39 5.46 5.46 0 1 0 6.04 0 1 1 0 1 1 1.1-1.67 7.46 7.46 0 1 1-8.25 0 1 1 0 0 1 1.4.28Z"
    clip-rule="evenodd"
  />
</svg>`}),hG=Object.freeze({__proto__:null,playStoreSvg:sl` <svg
  width="36"
  height="36"
  fill="none"
>
  <path
    d="M0 8a8 8 0 0 1 8-8h20a8 8 0 0 1 8 8v20a8 8 0 0 1-8 8H8a8 8 0 0 1-8-8V8Z"
    fill="#fff"
    fill-opacity=".05"
  />
  <path
    d="m18.262 17.513-8.944 9.49v.01a2.417 2.417 0 0 0 3.56 1.452l.026-.017 10.061-5.803-4.703-5.132Z"
    fill="#EA4335"
  />
  <path
    d="m27.307 15.9-.008-.008-4.342-2.52-4.896 4.36 4.913 4.912 4.325-2.494a2.42 2.42 0 0 0 .008-4.25Z"
    fill="#FBBC04"
  />
  <path
    d="M9.318 8.997c-.05.202-.084.403-.084.622V26.39c0 .218.025.42.084.621l9.246-9.247-9.246-8.768Z"
    fill="#4285F4"
  />
  <path
    d="m18.33 18 4.627-4.628-10.053-5.828a2.427 2.427 0 0 0-3.586 1.444L18.329 18Z"
    fill="#34A853"
  />
  <path
    d="M8 .5h20A7.5 7.5 0 0 1 35.5 8v20a7.5 7.5 0 0 1-7.5 7.5H8A7.5 7.5 0 0 1 .5 28V8A7.5 7.5 0 0 1 8 .5Z"
    stroke="#fff"
    stroke-opacity=".05"
  />
</svg>`}),hK=Object.freeze({__proto__:null,plusSvg:sl`<svg
  width="13"
  height="12"
  viewBox="0 0 13 12"
  fill="none"
>
  <path
    fill="currentColor"
    fill-rule="evenodd"
    clip-rule="evenodd"
    d="M0.794373 5.99982C0.794373 5.52643 1.17812 5.14268 1.6515 5.14268H5.643V1.15109C5.643 0.677701 6.02675 0.293946 6.50012 0.293945C6.9735 0.293946 7.35725 0.677701 7.35725 1.15109V5.14268H11.3488C11.8221 5.14268 12.2059 5.52643 12.2059 5.99982C12.2059 6.47321 11.8221 6.85696 11.3488 6.85696H7.35725V10.8486C7.35725 11.3219 6.9735 11.7057 6.50012 11.7057C6.02675 11.7057 5.643 11.3219 5.643 10.8486V6.85696H1.6515C1.17812 6.85696 0.794373 6.47321 0.794373 5.99982Z"
  /></svg
>`}),hY=Object.freeze({__proto__:null,qrCodeIcon:sl`<svg fill="none" viewBox="0 0 20 20">
  <path
    fill="currentColor"
    d="M3 6a3 3 0 0 1 3-3h1a1 1 0 1 0 0-2H6a5 5 0 0 0-5 5v1a1 1 0 0 0 2 0V6ZM13 1a1 1 0 1 0 0 2h1a3 3 0 0 1 3 3v1a1 1 0 1 0 2 0V6a5 5 0 0 0-5-5h-1ZM3 13a1 1 0 1 0-2 0v1a5 5 0 0 0 5 5h1a1 1 0 1 0 0-2H6a3 3 0 0 1-3-3v-1ZM19 13a1 1 0 1 0-2 0v1a3 3 0 0 1-3 3h-1a1 1 0 1 0 0 2h1.01a5 5 0 0 0 5-5v-1ZM5.3 6.36c-.04.2-.04.43-.04.89s0 .7.05.89c.14.52.54.92 1.06 1.06.19.05.42.05.89.05.46 0 .7 0 .88-.05A1.5 1.5 0 0 0 9.2 8.14c.06-.2.06-.43.06-.89s0-.7-.06-.89A1.5 1.5 0 0 0 8.14 5.3c-.19-.05-.42-.05-.88-.05-.47 0-.7 0-.9.05a1.5 1.5 0 0 0-1.05 1.06ZM10.8 6.36c-.04.2-.04.43-.04.89s0 .7.05.89c.14.52.54.92 1.06 1.06.19.05.42.05.89.05.46 0 .7 0 .88-.05a1.5 1.5 0 0 0 1.06-1.06c.06-.2.06-.43.06-.89s0-.7-.06-.89a1.5 1.5 0 0 0-1.06-1.06c-.19-.05-.42-.05-.88-.05-.47 0-.7 0-.9.05a1.5 1.5 0 0 0-1.05 1.06ZM5.26 12.75c0-.46 0-.7.05-.89a1.5 1.5 0 0 1 1.06-1.06c.19-.05.42-.05.89-.05.46 0 .7 0 .88.05.52.14.93.54 1.06 1.06.06.2.06.43.06.89s0 .7-.06.89a1.5 1.5 0 0 1-1.06 1.06c-.19.05-.42.05-.88.05-.47 0-.7 0-.9-.05a1.5 1.5 0 0 1-1.05-1.06c-.05-.2-.05-.43-.05-.89ZM10.8 11.86c-.04.2-.04.43-.04.89s0 .7.05.89c.14.52.54.92 1.06 1.06.19.05.42.05.89.05.46 0 .7 0 .88-.05a1.5 1.5 0 0 0 1.06-1.06c.06-.2.06-.43.06-.89s0-.7-.06-.89a1.5 1.5 0 0 0-1.06-1.06c-.19-.05-.42-.05-.88-.05-.47 0-.7 0-.9.05a1.5 1.5 0 0 0-1.05 1.06Z"
  />
</svg>`}),hX=Object.freeze({__proto__:null,recycleHorizontalSvg:sl`<svg
  fill="none"
  viewBox="0 0 21 20"
>
  <path
    fill="currentColor"
    d="M8.8071 0.292893C9.19763 0.683417 9.19763 1.31658 8.8071 1.70711L6.91421 3.6H11.8404C14.3368 3.6 16.5533 5.1975 17.3427 7.56588L17.4487 7.88377C17.6233 8.40772 17.3402 8.97404 16.8162 9.14868C16.2923 9.32333 15.726 9.04017 15.5513 8.51623L15.4453 8.19834C14.9281 6.64664 13.476 5.6 11.8404 5.6H6.91421L8.8071 7.49289C9.19763 7.88342 9.19763 8.51658 8.8071 8.90711C8.41658 9.29763 7.78341 9.29763 7.39289 8.90711L3.79289 5.30711C3.40236 4.91658 3.40236 4.28342 3.79289 3.89289L7.39289 0.292893C7.78341 -0.0976311 8.41658 -0.0976311 8.8071 0.292893ZM4.18377 10.8513C4.70771 10.6767 5.27403 10.9598 5.44868 11.4838L5.55464 11.8017C6.07188 13.3534 7.52401 14.4 9.15964 14.4L14.0858 14.4L12.1929 12.5071C11.8024 12.1166 11.8024 11.4834 12.1929 11.0929C12.5834 10.7024 13.2166 10.7024 13.6071 11.0929L17.2071 14.6929C17.5976 15.0834 17.5976 15.7166 17.2071 16.1071L13.6071 19.7071C13.2166 20.0976 12.5834 20.0976 12.1929 19.7071C11.8024 19.3166 11.8024 18.6834 12.1929 18.2929L14.0858 16.4L9.15964 16.4C6.66314 16.4 4.44674 14.8025 3.65728 12.4341L3.55131 12.1162C3.37667 11.5923 3.65983 11.026 4.18377 10.8513Z"
  /></svg
>`}),hJ=Object.freeze({__proto__:null,refreshSvg:sl`<svg fill="none" viewBox="0 0 14 16">
  <path
    fill="currentColor"
    fill-rule="evenodd"
    d="M3.94 1.04a1 1 0 0 1 .7 1.23l-.48 1.68a5.85 5.85 0 0 1 8.53 4.32 5.86 5.86 0 0 1-11.4 2.56 1 1 0 0 1 1.9-.57 3.86 3.86 0 1 0 1.83-4.5l1.87.53a1 1 0 0 1-.55 1.92l-4.1-1.15a1 1 0 0 1-.69-1.23l1.16-4.1a1 1 0 0 1 1.23-.7Z"
    clip-rule="evenodd"
  />
</svg>`}),hQ=Object.freeze({__proto__:null,searchSvg:sl`<svg fill="none" viewBox="0 0 20 20">
  <path
    fill="currentColor"
    fill-rule="evenodd"
    d="M9.36 4.21a5.14 5.14 0 1 0 0 10.29 5.14 5.14 0 0 0 0-10.29ZM1.64 9.36a7.71 7.71 0 1 1 14 4.47l2.52 2.5a1.29 1.29 0 1 1-1.82 1.83l-2.51-2.51A7.71 7.71 0 0 1 1.65 9.36Z"
    clip-rule="evenodd"
  />
</svg>`}),h0=Object.freeze({__proto__:null,sendSvg:sl`<svg fill="none" viewBox="0 0 21 20">
  <path
    fill="currentColor"
    fill-rule="evenodd"
    d="M14.3808 4.34812C13.72 4.47798 12.8501 4.7587 11.5748 5.17296L9.00869 6.00646C6.90631 6.68935 5.40679 7.17779 4.38121 7.63178C3.87166 7.85734 3.5351 8.05091 3.32022 8.22035C3.11183 8.38466 3.07011 8.48486 3.05969 8.51817C2.98058 8.77103 2.98009 9.04195 3.05831 9.29509C3.06861 9.32844 3.10998 9.42878 3.31777 9.59384C3.53205 9.76404 3.86792 9.95881 4.37667 10.1862C5.29287 10.5957 6.58844 11.0341 8.35529 11.6164L10.8876 8.59854C11.2426 8.17547 11.8733 8.12028 12.2964 8.47528C12.7195 8.83029 12.7746 9.46104 12.4196 9.88412L9.88738 12.9019C10.7676 14.5408 11.4244 15.7406 11.9867 16.5718C12.299 17.0333 12.5491 17.3303 12.7539 17.5117C12.9526 17.6877 13.0586 17.711 13.0932 17.7154C13.3561 17.7484 13.6228 17.7009 13.8581 17.5791C13.8891 17.563 13.9805 17.5046 14.1061 17.2708C14.2357 17.0298 14.3679 16.6647 14.5015 16.1237C14.7705 15.0349 14.9912 13.4733 15.2986 11.2843L15.6738 8.61249C15.8603 7.28456 15.9857 6.37917 15.9989 5.7059C16.012 5.03702 15.9047 4.8056 15.8145 4.69183C15.7044 4.55297 15.5673 4.43792 15.4114 4.35365C15.2837 4.28459 15.0372 4.2191 14.3808 4.34812ZM7.99373 13.603C6.11919 12.9864 4.6304 12.4902 3.5606 12.0121C2.98683 11.7557 2.4778 11.4808 2.07383 11.1599C1.66337 10.8339 1.31312 10.4217 1.14744 9.88551C0.949667 9.24541 0.950886 8.56035 1.15094 7.92096C1.31852 7.38534 1.67024 6.97442 2.08185 6.64985C2.48697 6.33041 2.99697 6.05734 3.57166 5.80295C4.70309 5.3021 6.30179 4.78283 8.32903 4.12437L11.0196 3.25042C12.2166 2.86159 13.2017 2.54158 13.9951 2.38566C14.8065 2.22618 15.6202 2.19289 16.3627 2.59437C16.7568 2.80747 17.1035 3.09839 17.3818 3.4495C17.9062 4.111 18.0147 4.91815 17.9985 5.74496C17.9827 6.55332 17.8386 7.57903 17.6636 8.82534L17.2701 11.6268C16.9737 13.7376 16.7399 15.4022 16.4432 16.6034C16.2924 17.2135 16.1121 17.7632 15.8678 18.2176C15.6197 18.6794 15.2761 19.0971 14.7777 19.3551C14.1827 19.6632 13.5083 19.7833 12.8436 19.6997C12.2867 19.6297 11.82 19.3563 11.4277 19.0087C11.0415 18.6666 10.6824 18.213 10.3302 17.6925C9.67361 16.722 8.92648 15.342 7.99373 13.603Z"
    clip-rule="evenodd"
  />
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="21"
    height="20"
    viewBox="0 0 21 20"
    fill="none"
  ></svg></svg
>`}),h1=Object.freeze({__proto__:null,swapHorizontalSvg:sl`<svg fill="none" viewBox="0 0 20 20">
  <path
    fill="currentColor"
    fill-rule="evenodd"
    d="M6.76.3a1 1 0 0 1 0 1.4L4.07 4.4h9a1 1 0 1 1 0 2h-9l2.69 2.68a1 1 0 1 1-1.42 1.42L.95 6.09a1 1 0 0 1 0-1.4l4.4-4.4a1 1 0 0 1 1.4 0Zm6.49 9.21a1 1 0 0 1 1.41 0l4.39 4.4a1 1 0 0 1 0 1.4l-4.39 4.4a1 1 0 0 1-1.41-1.42l2.68-2.68h-9a1 1 0 0 1 0-2h9l-2.68-2.68a1 1 0 0 1 0-1.42Z"
    clip-rule="evenodd"
  />
</svg>`}),h2=Object.freeze({__proto__:null,swapHorizontalMediumSvg:sl`<svg
  width="14"
  height="14"
  viewBox="0 0 14 14"
  fill="none"
  xmlns="http://www.w3.org/2000/svg"
>
  <path
    fill-rule="evenodd"
    clip-rule="evenodd"
    d="M13.7306 3.24213C14.0725 3.58384 14.0725 4.13786 13.7306 4.47957L10.7418 7.46737C10.4 7.80908 9.84581 7.80908 9.50399 7.46737C9.16216 7.12567 9.16216 6.57165 9.50399 6.22994L10.9986 4.73585H5.34082C4.85741 4.73585 4.46553 4.3441 4.46553 3.86085C4.46553 3.3776 4.85741 2.98585 5.34082 2.98585L10.9986 2.98585L9.50399 1.49177C9.16216 1.15006 9.16216 0.596037 9.50399 0.254328C9.84581 -0.0873803 10.4 -0.0873803 10.7418 0.254328L13.7306 3.24213ZM9.52515 10.1352C9.52515 10.6185 9.13327 11.0102 8.64986 11.0102L2.9921 11.0102L4.48669 12.5043C4.82852 12.846 4.82852 13.4001 4.48669 13.7418C4.14487 14.0835 3.59066 14.0835 3.24884 13.7418L0.26003 10.754C0.0958806 10.5899 0.0036621 10.3673 0.00366211 10.1352C0.00366212 9.90318 0.0958806 9.68062 0.26003 9.51652L3.24884 6.52872C3.59066 6.18701 4.14487 6.18701 4.48669 6.52872C4.82851 6.87043 4.82851 7.42445 4.48669 7.76616L2.9921 9.26024L8.64986 9.26024C9.13327 9.26024 9.52515 9.65199 9.52515 10.1352Z"
    fill="currentColor"
  />
</svg>

`}),h3=Object.freeze({__proto__:null,swapHorizontalBoldSvg:sl`<svg width="10" height="10" viewBox="0 0 10 10">
  <path
    fill="currentColor"
    fill-rule="evenodd"
    d="M3.77986 0.566631C4.0589 0.845577 4.0589 1.29784 3.77986 1.57678L3.08261 2.2738H6.34184C6.73647 2.2738 7.05637 2.5936 7.05637 2.98808C7.05637 3.38257 6.73647 3.70237 6.34184 3.70237H3.08261L3.77986 4.39938C4.0589 4.67833 4.0589 5.13059 3.77986 5.40954C3.50082 5.68848 3.04841 5.68848 2.76937 5.40954L0.852346 3.49316C0.573306 3.21421 0.573306 2.76195 0.852346 2.48301L2.76937 0.566631C3.04841 0.287685 3.50082 0.287685 3.77986 0.566631ZM6.22 4.59102C6.49904 4.31208 6.95145 4.31208 7.23049 4.59102L9.14751 6.5074C9.42655 6.78634 9.42655 7.23861 9.14751 7.51755L7.23049 9.43393C6.95145 9.71287 6.49904 9.71287 6.22 9.43393C5.94096 9.15498 5.94096 8.70272 6.22 8.42377L6.91725 7.72676L3.65802 7.72676C3.26339 7.72676 2.94349 7.40696 2.94349 7.01247C2.94349 6.61798 3.26339 6.29819 3.65802 6.29819L6.91725 6.29819L6.22 5.60117C5.94096 5.32223 5.94096 4.86997 6.22 4.59102Z"
    clip-rule="evenodd"
  />
</svg>`}),h5=Object.freeze({__proto__:null,swapHorizontalRoundedBoldSvg:sl`<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none">
  <path 
    fill="currentColor"
    fill-rule="evenodd" 
    clip-rule="evenodd" 
    d="M8.3071 0.292893C8.69763 0.683417 8.69763 1.31658 8.3071 1.70711L6.41421 3.6H11.3404C13.8368 3.6 16.0533 5.1975 16.8427 7.56588L16.9487 7.88377C17.1233 8.40772 16.8402 8.97404 16.3162 9.14868C15.7923 9.32333 15.226 9.04017 15.0513 8.51623L14.9453 8.19834C14.4281 6.64664 12.976 5.6 11.3404 5.6H6.41421L8.3071 7.49289C8.69763 7.88342 8.69763 8.51658 8.3071 8.90711C7.91658 9.29763 7.28341 9.29763 6.89289 8.90711L3.29289 5.30711C2.90236 4.91658 2.90236 4.28342 3.29289 3.89289L6.89289 0.292893C7.28341 -0.0976311 7.91658 -0.0976311 8.3071 0.292893ZM3.68377 10.8513C4.20771 10.6767 4.77403 10.9598 4.94868 11.4838L5.05464 11.8017C5.57188 13.3534 7.024 14.4 8.65964 14.4L13.5858 14.4L11.6929 12.5071C11.3024 12.1166 11.3024 11.4834 11.6929 11.0929C12.0834 10.7024 12.7166 10.7024 13.1071 11.0929L16.7071 14.6929C17.0976 15.0834 17.0976 15.7166 16.7071 16.1071L13.1071 19.7071C12.7166 20.0976 12.0834 20.0976 11.6929 19.7071C11.3024 19.3166 11.3024 18.6834 11.6929 18.2929L13.5858 16.4L8.65964 16.4C6.16314 16.4 3.94674 14.8025 3.15728 12.4341L3.05131 12.1162C2.87667 11.5923 3.15983 11.026 3.68377 10.8513Z" 
  />
</svg>`}),h4=Object.freeze({__proto__:null,swapVerticalSvg:sl`<svg fill="none" viewBox="0 0 14 14">
  <path
    fill="currentColor"
    fill-rule="evenodd"
    d="M3.48 2.18a1 1 0 0 1 1.41 0l2.68 2.68a1 1 0 1 1-1.41 1.42l-.98-.98v4.56a1 1 0 0 1-2 0V5.3l-.97.98A1 1 0 0 1 .79 4.86l2.69-2.68Zm6.34 2.93a1 1 0 0 1 1 1v4.56l.97-.98a1 1 0 1 1 1.42 1.42l-2.69 2.68a1 1 0 0 1-1.41 0l-2.68-2.68a1 1 0 0 1 1.41-1.42l.98.98V6.1a1 1 0 0 1 1-1Z"
    clip-rule="evenodd"
  />
</svg>`}),h6=Object.freeze({__proto__:null,telegramSvg:sl`<svg width="32" height="32" fill="none" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32">
  <g clip-path="url(#a)">
    <path fill="url(#b)" d="M0 0h32v32H0z"/>
    <path fill-rule="evenodd" clip-rule="evenodd" d="M7.034 15.252c4.975-2.167 8.293-3.596 9.953-4.287 4.74-1.971 5.725-2.314 6.366-2.325.142-.002.457.033.662.198.172.14.22.33.243.463.022.132.05.435.028.671-.257 2.7-1.368 9.248-1.933 12.27-.24 1.28-.71 1.708-1.167 1.75-.99.091-1.743-.655-2.703-1.284-1.502-.985-2.351-1.598-3.81-2.558-1.684-1.11-.592-1.721.368-2.718.252-.261 4.619-4.233 4.703-4.594.01-.045.02-.213-.08-.301-.1-.09-.246-.059-.353-.035-.15.034-2.55 1.62-7.198 4.758-.682.468-1.298.696-1.851.684-.61-.013-1.782-.344-2.653-.628-1.069-.347-1.918-.53-1.845-1.12.039-.308.462-.623 1.27-.944Z" fill="#fff"/>
  </g>
  <path d="M.5 16C.5 7.44 7.44.5 16 .5 24.56.5 31.5 7.44 31.5 16c0 8.56-6.94 15.5-15.5 15.5C7.44 31.5.5 24.56.5 16Z" stroke="#141414" stroke-opacity=".05"/>
  <defs>
    <linearGradient id="b" x1="1600" y1="0" x2="1600" y2="3176.27" gradientUnits="userSpaceOnUse">
      <stop stop-color="#2AABEE"/>
      <stop offset="1" stop-color="#229ED9"/>
    </linearGradient>
    <clipPath id="a">
      <path d="M0 16C0 7.163 7.163 0 16 0s16 7.163 16 16-7.163 16-16 16S0 24.837 0 16Z" fill="#fff"/>
    </clipPath>
  </defs>
</svg>`}),h8=Object.freeze({__proto__:null,threeDotsSvg:sl`<svg width="14" height="15" viewBox="0 0 14 15" fill="none" xmlns="http://www.w3.org/2000/svg">
  <path d="M7 3.71875C6.0335 3.71875 5.25 2.93525 5.25 1.96875C5.25 1.00225 6.0335 0.21875 7 0.21875C7.9665 0.21875 8.75 1.00225 8.75 1.96875C8.75 2.93525 7.9665 3.71875 7 3.71875Z" fill="#949E9E"/>
  <path d="M7 8.96875C6.0335 8.96875 5.25 8.18525 5.25 7.21875C5.25 6.25225 6.0335 5.46875 7 5.46875C7.9665 5.46875 8.75 6.25225 8.75 7.21875C8.75 8.18525 7.9665 8.96875 7 8.96875Z" fill="#949E9E"/>
  <path d="M5.25 12.4688C5.25 13.4352 6.0335 14.2187 7 14.2187C7.9665 14.2187 8.75 13.4352 8.75 12.4688C8.75 11.5023 7.9665 10.7188 7 10.7188C6.0335 10.7188 5.25 11.5023 5.25 12.4688Z" fill="#949E9E"/>
</svg>`}),h9=Object.freeze({__proto__:null,twitchSvg:sl`<svg fill="none" viewBox="0 0 40 40">
  <g clip-path="url(#a)">
    <g clip-path="url(#b)">
      <circle cx="20" cy="19.89" r="20" fill="#5A3E85" />
      <g clip-path="url(#c)">
        <path
          fill="#fff"
          d="M18.22 25.7 20 23.91h3.34l2.1-2.1v-6.68H15.4v8.78h2.82v1.77Zm3.87-8.16h1.25v3.66H22.1v-3.66Zm-3.34 0H20v3.66h-1.25v-3.66ZM20 7.9a12 12 0 1 0 0 24 12 12 0 0 0 0-24Zm6.69 14.56-3.66 3.66h-2.72l-1.77 1.78h-1.88V26.1H13.3v-9.82l.94-2.4H26.7v8.56Z"
        />
      </g>
    </g>
  </g>
  <defs>
    <clipPath id="a"><rect width="40" height="40" fill="#fff" rx="20" /></clipPath>
    <clipPath id="b"><path fill="#fff" d="M0 0h40v40H0z" /></clipPath>
    <clipPath id="c"><path fill="#fff" d="M8 7.89h24v24H8z" /></clipPath>
  </defs>
</svg>`}),h7=Object.freeze({__proto__:null,xSvg:sl`<svg fill="none" viewBox="0 0 41 40">
  <g clip-path="url(#a)">
    <path fill="#000" d="M.8 0h40v40H.8z" />
    <path
      fill="#fff"
      d="m22.63 18.46 7.14-8.3h-1.69l-6.2 7.2-4.96-7.2H11.2l7.5 10.9-7.5 8.71h1.7l6.55-7.61 5.23 7.61h5.72l-7.77-11.31Zm-9.13-7.03h2.6l11.98 17.13h-2.6L13.5 11.43Z"
    />
  </g>
  <defs>
    <clipPath id="a"><path fill="#fff" d="M.8 20a20 20 0 1 1 40 0 20 20 0 0 1-40 0Z" /></clipPath>
  </defs>
</svg>`}),pe=Object.freeze({__proto__:null,twitterIconSvg:sl`<svg fill="none" viewBox="0 0 16 16">
  <path
    fill="currentColor"
    d="m14.36 4.74.01.42c0 4.34-3.3 9.34-9.34 9.34A9.3 9.3 0 0 1 0 13.03a6.6 6.6 0 0 0 4.86-1.36 3.29 3.29 0 0 1-3.07-2.28c.5.1 1 .07 1.48-.06A3.28 3.28 0 0 1 .64 6.11v-.04c.46.26.97.4 1.49.41A3.29 3.29 0 0 1 1.11 2.1a9.32 9.32 0 0 0 6.77 3.43 3.28 3.28 0 0 1 5.6-3 6.59 6.59 0 0 0 2.08-.8 3.3 3.3 0 0 1-1.45 1.82A6.53 6.53 0 0 0 16 3.04c-.44.66-1 1.23-1.64 1.7Z"
  />
</svg>`}),pt=Object.freeze({__proto__:null,verifySvg:sl`<svg fill="none" viewBox="0 0 28 28">
  <path
    fill="currentColor"
    fill-rule="evenodd"
    d="M18.1 4.76c-.42-.73-1.33-1.01-2.09-.66l-1.42.66c-.37.18-.8.18-1.18 0l-1.4-.65a1.63 1.63 0 0 0-2.1.66l-.84 1.45c-.2.34-.53.59-.92.67l-1.7.35c-.83.17-1.39.94-1.3 1.78l.19 1.56c.04.39-.08.78-.33 1.07l-1.12 1.3c-.52.6-.52 1.5 0 2.11L5 16.38c.25.3.37.68.33 1.06l-.18 1.57c-.1.83.46 1.6 1.28 1.78l1.7.35c.4.08.73.32.93.66l.84 1.43a1.63 1.63 0 0 0 2.09.66l1.41-.66c.37-.17.8-.17 1.18 0l1.43.67c.76.35 1.66.07 2.08-.65l.86-1.45c.2-.34.54-.58.92-.66l1.68-.35A1.63 1.63 0 0 0 22.84 19l-.18-1.57a1.4 1.4 0 0 1 .33-1.06l1.12-1.32c.52-.6.52-1.5 0-2.11l-1.12-1.3a1.4 1.4 0 0 1-.33-1.07l.18-1.57c.1-.83-.46-1.6-1.28-1.77l-1.68-.35a1.4 1.4 0 0 1-.92-.66l-.86-1.47Zm-3.27-3.2a4.43 4.43 0 0 1 5.69 1.78l.54.93 1.07.22a4.43 4.43 0 0 1 3.5 4.84l-.11.96.7.83a4.43 4.43 0 0 1 .02 5.76l-.72.85.1.96a4.43 4.43 0 0 1-3.5 4.84l-1.06.22-.54.92a4.43 4.43 0 0 1-5.68 1.77l-.84-.4-.82.39a4.43 4.43 0 0 1-5.7-1.79l-.51-.89-1.09-.22a4.43 4.43 0 0 1-3.5-4.84l.1-.96-.72-.85a4.43 4.43 0 0 1 .01-5.76l.71-.83-.1-.95a4.43 4.43 0 0 1 3.5-4.84l1.08-.23.53-.9a4.43 4.43 0 0 1 5.7-1.8l.81.38.83-.39ZM18.2 9.4c.65.42.84 1.28.42 1.93l-4.4 6.87a1.4 1.4 0 0 1-2.26.14L9.5 15.39a1.4 1.4 0 0 1 2.15-1.8l1.23 1.48 3.38-5.26a1.4 1.4 0 0 1 1.93-.42Z"
    clip-rule="evenodd"
  />
</svg>`}),pr=Object.freeze({__proto__:null,verifyFilledSvg:sl`<svg fill="none" viewBox="0 0 14 14">
  <path
    fill="currentColor"
    fill-rule="evenodd"
    d="m4.1 12.43-.45-.78-.93-.2a1.65 1.65 0 0 1-1.31-1.8l.1-.86-.61-.71a1.65 1.65 0 0 1 0-2.16l.6-.7-.09-.85c-.1-.86.47-1.64 1.3-1.81l.94-.2.45-.78A1.65 1.65 0 0 1 6.23.9l.77.36.78-.36c.77-.36 1.69-.07 2.12.66l.47.8.91.2c.84.17 1.4.95 1.31 1.8l-.1.86.6.7c.54.62.54 1.54.01 2.16l-.6.71.09.86c.1.85-.47 1.63-1.3 1.8l-.92.2-.47.79a1.65 1.65 0 0 1-2.12.66L7 12.74l-.77.36c-.78.35-1.7.07-2.13-.67Zm5.74-6.9a1 1 0 1 0-1.68-1.07L6.32 7.3l-.55-.66a1 1 0 0 0-1.54 1.28l1.43 1.71a1 1 0 0 0 1.61-.1l2.57-4Z"
    clip-rule="evenodd"
  />
</svg>`}),pi=Object.freeze({__proto__:null,walletSvg:sl`<svg fill="none" viewBox="0 0 20 20">
  <path
    fill="currentColor"
    fill-rule="evenodd"
    d="M0 5.5c0-1.8 1.46-3.25 3.25-3.25H14.5c1.8 0 3.25 1.46 3.25 3.25v.28A3.25 3.25 0 0 1 20 8.88v2.24c0 1.45-.94 2.68-2.25 3.1v.28c0 1.8-1.46 3.25-3.25 3.25H3.25A3.25 3.25 0 0 1 0 14.5v-9Zm15.75 8.88h-2.38a4.38 4.38 0 0 1 0-8.76h2.38V5.5c0-.69-.56-1.25-1.25-1.25H3.25C2.56 4.25 2 4.81 2 5.5v9c0 .69.56 1.25 1.25 1.25H14.5c.69 0 1.25-.56 1.25-1.25v-.13Zm-2.38-6.76a2.37 2.37 0 1 0 0 4.75h3.38c.69 0 1.25-.55 1.25-1.24V8.87c0-.69-.56-1.24-1.25-1.24h-3.38Z"
    clip-rule="evenodd"
  />
</svg>`}),pa=Object.freeze({__proto__:null,walletConnectSvg:sl`<svg fill="none" viewBox="0 0 96 67">
  <path
    fill="currentColor"
    d="M25.32 18.8a32.56 32.56 0 0 1 45.36 0l1.5 1.47c.63.62.63 1.61 0 2.22l-5.15 5.05c-.31.3-.82.3-1.14 0l-2.07-2.03a22.71 22.71 0 0 0-31.64 0l-2.22 2.18c-.31.3-.82.3-1.14 0l-5.15-5.05a1.55 1.55 0 0 1 0-2.22l1.65-1.62Zm56.02 10.44 4.59 4.5c.63.6.63 1.6 0 2.21l-20.7 20.26c-.62.61-1.63.61-2.26 0L48.28 41.83a.4.4 0 0 0-.56 0L33.03 56.21c-.63.61-1.64.61-2.27 0L10.07 35.95a1.55 1.55 0 0 1 0-2.22l4.59-4.5a1.63 1.63 0 0 1 2.27 0L31.6 43.63a.4.4 0 0 0 .57 0l14.69-14.38a1.63 1.63 0 0 1 2.26 0l14.69 14.38a.4.4 0 0 0 .57 0l14.68-14.38a1.63 1.63 0 0 1 2.27 0Z"
  />
  <path
    stroke="#000"
    stroke-opacity=".1"
    d="M25.67 19.15a32.06 32.06 0 0 1 44.66 0l1.5 1.48c.43.42.43 1.09 0 1.5l-5.15 5.05a.31.31 0 0 1-.44 0l-2.07-2.03a23.21 23.21 0 0 0-32.34 0l-2.22 2.18a.31.31 0 0 1-.44 0l-5.15-5.05a1.05 1.05 0 0 1 0-1.5l1.65-1.63ZM81 29.6l4.6 4.5c.42.41.42 1.09 0 1.5l-20.7 20.26c-.43.43-1.14.43-1.57 0L48.63 41.47a.9.9 0 0 0-1.26 0L32.68 55.85c-.43.43-1.14.43-1.57 0L10.42 35.6a1.05 1.05 0 0 1 0-1.5l4.59-4.5a1.13 1.13 0 0 1 1.57 0l14.68 14.38a.9.9 0 0 0 1.27 0l-.35-.35.35.35L47.22 29.6a1.13 1.13 0 0 1 1.56 0l14.7 14.38a.9.9 0 0 0 1.26 0L79.42 29.6a1.13 1.13 0 0 1 1.57 0Z"
  />
</svg>`,walletConnectLightBrownSvg:sl`
<svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
<g clip-path="url(#clip0_22274_4692)">
<path d="M0 6.64C0 4.17295 0 2.93942 0.525474 2.01817C0.880399 1.39592 1.39592 0.880399 2.01817 0.525474C2.93942 0 4.17295 0 6.64 0H9.36C11.8271 0 13.0606 0 13.9818 0.525474C14.6041 0.880399 15.1196 1.39592 15.4745 2.01817C16 2.93942 16 4.17295 16 6.64V9.36C16 11.8271 16 13.0606 15.4745 13.9818C15.1196 14.6041 14.6041 15.1196 13.9818 15.4745C13.0606 16 11.8271 16 9.36 16H6.64C4.17295 16 2.93942 16 2.01817 15.4745C1.39592 15.1196 0.880399 14.6041 0.525474 13.9818C0 13.0606 0 11.8271 0 9.36V6.64Z" fill="#C7B994"/>
<path d="M4.49038 5.76609C6.42869 3.86833 9.5713 3.86833 11.5096 5.76609L11.7429 5.99449C11.8398 6.08938 11.8398 6.24323 11.7429 6.33811L10.9449 7.11942C10.8964 7.16686 10.8179 7.16686 10.7694 7.11942L10.4484 6.80512C9.09617 5.48119 6.90381 5.48119 5.5516 6.80512L5.20782 7.14171C5.15936 7.18915 5.08079 7.18915 5.03234 7.14171L4.23434 6.3604C4.13742 6.26552 4.13742 6.11167 4.23434 6.01678L4.49038 5.76609ZM13.1599 7.38192L13.8702 8.07729C13.9671 8.17217 13.9671 8.32602 13.8702 8.4209L10.6677 11.5564C10.5708 11.6513 10.4137 11.6513 10.3168 11.5564L8.04388 9.33105C8.01965 9.30733 7.98037 9.30733 7.95614 9.33105L5.6833 11.5564C5.58638 11.6513 5.42925 11.6513 5.33234 11.5564L2.12982 8.42087C2.0329 8.32598 2.0329 8.17213 2.12982 8.07724L2.84004 7.38188C2.93695 7.28699 3.09408 7.28699 3.191 7.38188L5.46392 9.60726C5.48815 9.63098 5.52743 9.63098 5.55166 9.60726L7.82447 7.38188C7.92138 7.28699 8.07851 7.28699 8.17543 7.38187L10.4484 9.60726C10.4726 9.63098 10.5119 9.63098 10.5361 9.60726L12.809 7.38192C12.9059 7.28703 13.063 7.28703 13.1599 7.38192Z" fill="#202020"/>
</g>
<defs>
<clipPath id="clip0_22274_4692">
<path d="M0 8C0 3.58172 3.58172 0 8 0C12.4183 0 16 3.58172 16 8C16 12.4183 12.4183 16 8 16C3.58172 16 0 12.4183 0 8Z" fill="white"/>
</clipPath>
</defs>
</svg>
`,walletConnectBrownSvg:sl`
<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<circle cx="11" cy="11" r="11" transform="matrix(-1 0 0 1 23 1)" fill="#202020"/>
<circle cx="11" cy="11" r="11.5" transform="matrix(-1 0 0 1 23 1)" stroke="#C7B994" stroke-opacity="0.7"/>
<path d="M15.4523 11.0686L16.7472 9.78167C13.8205 6.87297 10.1838 6.87297 7.25708 9.78167L8.55201 11.0686C10.7779 8.85645 13.2279 8.85645 15.4538 11.0686H15.4523Z" fill="#C7B994"/>
<path d="M15.0199 14.067L12 11.0656L8.98 14.067L5.96004 11.0656L4.66663 12.3511L8.98 16.6393L12 13.638L15.0199 16.6393L19.3333 12.3511L18.0399 11.0656L15.0199 14.067Z" fill="#C7B994"/>
</svg>
`}),po=Object.freeze({__proto__:null,walletPlaceholderSvg:sl`
  <svg fill="none" viewBox="0 0 48 44">
    <path
      style="fill: var(--wui-color-bg-300);"
      d="M4.56 8.64c-1.23 1.68-1.23 4.08-1.23 8.88v8.96c0 4.8 0 7.2 1.23 8.88.39.55.87 1.02 1.41 1.42C7.65 38 10.05 38 14.85 38h14.3c4.8 0 7.2 0 8.88-1.22a6.4 6.4 0 0 0 1.41-1.42c.83-1.14 1.1-2.6 1.19-4.92a6.4 6.4 0 0 0 5.16-4.65c.21-.81.21-1.8.21-3.79 0-1.98 0-2.98-.22-3.79a6.4 6.4 0 0 0-5.15-4.65c-.1-2.32-.36-3.78-1.19-4.92a6.4 6.4 0 0 0-1.41-1.42C36.35 6 33.95 6 29.15 6h-14.3c-4.8 0-7.2 0-8.88 1.22a6.4 6.4 0 0 0-1.41 1.42Z"
    />
    <path
      style="fill: var(--wui-color-fg-200);"
      fill-rule="evenodd"
      d="M2.27 11.33a6.4 6.4 0 0 1 6.4-6.4h26.66a6.4 6.4 0 0 1 6.4 6.4v1.7a6.4 6.4 0 0 1 5.34 6.3v5.34a6.4 6.4 0 0 1-5.34 6.3v1.7a6.4 6.4 0 0 1-6.4 6.4H8.67a6.4 6.4 0 0 1-6.4-6.4V11.33ZM39.6 31.07h-6.93a9.07 9.07 0 1 1 0-18.14h6.93v-1.6a4.27 4.27 0 0 0-4.27-4.26H8.67a4.27 4.27 0 0 0-4.27 4.26v21.34a4.27 4.27 0 0 0 4.27 4.26h26.66a4.27 4.27 0 0 0 4.27-4.26v-1.6Zm-6.93-16a6.93 6.93 0 0 0 0 13.86h8a4.27 4.27 0 0 0 4.26-4.26v-5.34a4.27 4.27 0 0 0-4.26-4.26h-8Z"
      clip-rule="evenodd"
    />
  </svg>
`}),pn=Object.freeze({__proto__:null,warningCircleSvg:sl`<svg fill="none" viewBox="0 0 20 20">
  <path
    fill="currentColor"
    d="M11 6.67a1 1 0 1 0-2 0v2.66a1 1 0 0 0 2 0V6.67ZM10 14.5a1.25 1.25 0 1 0 0-2.5 1.25 1.25 0 0 0 0 2.5Z"
  />
  <path
    fill="currentColor"
    fill-rule="evenodd"
    d="M10 1a9 9 0 1 0 0 18 9 9 0 0 0 0-18Zm-7 9a7 7 0 1 1 14 0 7 7 0 0 1-14 0Z"
    clip-rule="evenodd"
  />
</svg>`}),ps=Object.freeze({__proto__:null,infoSvg:sl`<svg width="22" height="22" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M9.125 6.875C9.125 6.57833 9.21298 6.28832 9.3778 6.04165C9.54262 5.79497 9.77689 5.60271 10.051 5.48918C10.3251 5.37565 10.6267 5.34594 10.9176 5.40382C11.2086 5.4617 11.4759 5.60456 11.6857 5.81434C11.8954 6.02412 12.0383 6.29139 12.0962 6.58236C12.1541 6.87334 12.1244 7.17494 12.0108 7.44903C11.8973 7.72311 11.705 7.95738 11.4584 8.1222C11.2117 8.28703 10.9217 8.375 10.625 8.375C10.2272 8.375 9.84565 8.21696 9.56434 7.93566C9.28304 7.65436 9.125 7.27282 9.125 6.875ZM21.125 11C21.125 13.0025 20.5312 14.9601 19.4186 16.6251C18.3061 18.2902 16.7248 19.5879 14.8747 20.3543C13.0246 21.1206 10.9888 21.3211 9.02471 20.9305C7.06066 20.5398 5.25656 19.5755 3.84055 18.1595C2.42454 16.7435 1.46023 14.9393 1.06955 12.9753C0.678878 11.0112 0.879387 8.97543 1.64572 7.12533C2.41206 5.27523 3.70981 3.69392 5.37486 2.58137C7.0399 1.46882 8.99747 0.875 11 0.875C13.6844 0.877978 16.258 1.94567 18.1562 3.84383C20.0543 5.74199 21.122 8.3156 21.125 11ZM18.875 11C18.875 9.44247 18.4131 7.91992 17.5478 6.62488C16.6825 5.32985 15.4526 4.32049 14.0136 3.72445C12.5747 3.12841 10.9913 2.97246 9.46367 3.27632C7.93607 3.58017 6.53288 4.3302 5.43154 5.43153C4.3302 6.53287 3.58018 7.93606 3.27632 9.46366C2.97246 10.9913 3.12841 12.5747 3.72445 14.0136C4.32049 15.4526 5.32985 16.6825 6.62489 17.5478C7.91993 18.4131 9.44248 18.875 11 18.875C13.0879 18.8728 15.0896 18.0424 16.566 16.566C18.0424 15.0896 18.8728 13.0879 18.875 11ZM12.125 14.4387V11.375C12.125 10.8777 11.9275 10.4008 11.5758 10.0492C11.2242 9.69754 10.7473 9.5 10.25 9.5C9.98433 9.4996 9.72708 9.59325 9.52383 9.76435C9.32058 9.93544 9.18444 10.173 9.13952 10.4348C9.09461 10.6967 9.14381 10.966 9.27843 11.195C9.41304 11.4241 9.62438 11.5981 9.875 11.6863V14.75C9.875 15.2473 10.0725 15.7242 10.4242 16.0758C10.7758 16.4275 11.2527 16.625 11.75 16.625C12.0157 16.6254 12.2729 16.5318 12.4762 16.3607C12.6794 16.1896 12.8156 15.952 12.8605 15.6902C12.9054 15.4283 12.8562 15.159 12.7216 14.93C12.587 14.7009 12.3756 14.5269 12.125 14.4387Z" fill="currentColor"/>
</svg>`}),pl=Object.freeze({__proto__:null,exclamationTriangleSvg:sl`<svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M15.0162 11.6312L9.55059 2.13937C9.39228 1.86862 9.16584 1.64405 8.8938 1.48798C8.62176 1.33192 8.3136 1.2498 7.99997 1.2498C7.68634 1.2498 7.37817 1.33192 7.10613 1.48798C6.83409 1.64405 6.60765 1.86862 6.44934 2.13937L0.983716 11.6312C0.830104 11.894 0.749146 12.1928 0.749146 12.4972C0.749146 12.8015 0.830104 13.1004 0.983716 13.3631C1.14027 13.6352 1.3664 13.8608 1.63889 14.0166C1.91139 14.1725 2.22044 14.253 2.53434 14.25H13.4656C13.7793 14.2528 14.0881 14.1721 14.3603 14.0163C14.6326 13.8604 14.8585 13.635 15.015 13.3631C15.1688 13.1005 15.2499 12.8017 15.2502 12.4973C15.2504 12.193 15.1696 11.8941 15.0162 11.6312ZM13.7162 12.6125C13.6908 12.6558 13.6541 12.6914 13.6101 12.7157C13.5661 12.7399 13.5164 12.7517 13.4662 12.75H2.53434C2.48415 12.7517 2.43442 12.7399 2.39042 12.7157C2.34641 12.6914 2.30976 12.6558 2.28434 12.6125C2.26278 12.5774 2.25137 12.5371 2.25137 12.4959C2.25137 12.4548 2.26278 12.4144 2.28434 12.3794L7.74997 2.88749C7.77703 2.84583 7.81408 2.8116 7.85774 2.7879C7.9014 2.7642 7.95029 2.75178 7.99997 2.75178C8.04964 2.75178 8.09854 2.7642 8.1422 2.7879C8.18586 2.8116 8.2229 2.84583 8.24997 2.88749L13.715 12.3794C13.7367 12.4143 13.7483 12.4546 13.7486 12.4958C13.7488 12.5369 13.7376 12.5773 13.7162 12.6125ZM7.24997 8.49999V6.49999C7.24997 6.30108 7.32898 6.11031 7.46964 5.96966C7.61029 5.82901 7.80105 5.74999 7.99997 5.74999C8.19888 5.74999 8.38964 5.82901 8.5303 5.96966C8.67095 6.11031 8.74997 6.30108 8.74997 6.49999V8.49999C8.74997 8.6989 8.67095 8.88967 8.5303 9.03032C8.38964 9.17097 8.19888 9.24999 7.99997 9.24999C7.80105 9.24999 7.61029 9.17097 7.46964 9.03032C7.32898 8.88967 7.24997 8.6989 7.24997 8.49999ZM8.99997 11C8.99997 11.1978 8.94132 11.3911 8.83144 11.5556C8.72155 11.72 8.56538 11.8482 8.38265 11.9239C8.19992 11.9996 7.99886 12.0194 7.80488 11.9808C7.6109 11.9422 7.43271 11.847 7.29286 11.7071C7.15301 11.5672 7.05777 11.3891 7.01918 11.1951C6.9806 11.0011 7.0004 10.8 7.07609 10.6173C7.15177 10.4346 7.27995 10.2784 7.4444 10.1685C7.60885 10.0586 7.80219 9.99999 7.99997 9.99999C8.26518 9.99999 8.51954 10.1053 8.70707 10.2929C8.89461 10.4804 8.99997 10.7348 8.99997 11Z" fill="currentColor"/>
</svg>
`}),pc=Object.freeze({__proto__:null,reownSvg:sl`<svg width="60" height="16" viewBox="0 0 60 16" fill="none"">
  <path d="M9.3335 4.66667C9.3335 2.08934 11.4229 0 14.0002 0H20.6669C23.2442 0 25.3335 2.08934 25.3335 4.66667V11.3333C25.3335 13.9106 23.2442 16 20.6669 16H14.0002C11.4229 16 9.3335 13.9106 9.3335 11.3333V4.66667Z" fill="#363636"/>
  <path d="M15.6055 11.0003L17.9448 4.66699H18.6316L16.2923 11.0003H15.6055Z" fill="#F6F6F6"/>
  <path d="M0 4.33333C0 1.9401 1.9401 0 4.33333 0C6.72657 0 8.66669 1.9401 8.66669 4.33333V11.6667C8.66669 14.0599 6.72657 16 4.33333 16C1.9401 16 0 14.0599 0 11.6667V4.33333Z" fill="#363636"/>
  <path d="M3.9165 9.99934V9.16602H4.74983V9.99934H3.9165Z" fill="#F6F6F6"/>
  <path d="M26 8C26 3.58172 29.3517 0 33.4863 0H52.5137C56.6483 0 60 3.58172 60 8C60 12.4183 56.6483 16 52.5137 16H33.4863C29.3517 16 26 12.4183 26 8Z" fill="#363636"/>
  <path d="M49.3687 9.95834V6.26232H50.0213V6.81966C50.256 6.40899 50.7326 6.16699 51.2606 6.16699C52.0599 6.16699 52.6173 6.67299 52.6173 7.65566V9.95834H51.972V7.69234C51.972 7.04696 51.6053 6.70966 51.07 6.70966C50.4906 6.70966 50.0213 7.17168 50.0213 7.82433V9.95834H49.3687Z" fill="#F6F6F6"/>
  <path d="M45.2538 9.95773L44.5718 6.26172H45.1877L45.6717 9.31242L46.3098 7.30306H46.9184L47.5491 9.29041L48.0404 6.26172H48.6564L47.9744 9.95773H47.2411L46.6178 8.03641L45.9871 9.95773H45.2538Z" fill="#F6F6F6"/>
  <path d="M42.3709 10.0536C41.2489 10.0536 40.5889 9.21765 40.5889 8.1103C40.5889 7.01035 41.2489 6.16699 42.3709 6.16699C43.4929 6.16699 44.1529 7.01035 44.1529 8.1103C44.1529 9.21765 43.4929 10.0536 42.3709 10.0536ZM42.3709 9.51096C43.1775 9.51096 43.4856 8.82164 43.4856 8.10296C43.4856 7.39163 43.1775 6.70966 42.3709 6.70966C41.5642 6.70966 41.2562 7.39163 41.2562 8.10296C41.2562 8.82164 41.5642 9.51096 42.3709 9.51096Z" fill="#F6F6F6"/>
  <path d="M38.2805 10.0536C37.1952 10.0536 36.5132 9.22499 36.5132 8.1103C36.5132 7.00302 37.1952 6.16699 38.2805 6.16699C39.1972 6.16699 40.0038 6.68766 39.9159 8.27896H37.1805C37.2319 8.96103 37.5472 9.5183 38.2805 9.5183C38.7718 9.5183 39.0945 9.21765 39.2045 8.87299H39.8499C39.7472 9.48903 39.1679 10.0536 38.2805 10.0536ZM37.1952 7.78765H39.2852C39.2338 7.04696 38.8892 6.70232 38.2805 6.70232C37.6132 6.70232 37.2832 7.18635 37.1952 7.78765Z" fill="#F6F6F6"/>
  <path d="M33.3828 9.95773V6.26172H34.0501V6.88506C34.2848 6.47439 34.6882 6.26172 35.1061 6.26172H35.9935V6.88506H35.0548C34.4682 6.88506 34.0501 7.26638 34.0501 8.00706V9.95773H33.3828Z" fill="#F6F6F6"/>
</svg>`})}}]);