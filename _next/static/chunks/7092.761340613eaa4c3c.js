"use strict";(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[7092],{17092:function(e,t,a){a.r(t),a.d(t,{W3mPayLoadingView:function(){return V},W3mPayView:function(){return M},getExchanges:function(){return G},getIsPaymentInProgress:function(){return H},getPayError:function(){return W},getPayResult:function(){return Y},openPay:function(){return B}}),a(864),a(66411);var i=a(93756);a(62267);var o=a(65659),r=a(8885),n=a(97392),s=a(57750),c=a(62913),l=a(994),u=a(48737),d=a(76711),h=a(14810);a(11908),a(28052),a(73356),a(21633),a(26098),a(20847),a(16553),a(44779),a(34736),a(36566),a(34595),a(10963);var p=a(43882),g=a(6082),w=a(88157),v=a(26393),b=a(66879),y=a(21615);let f={INVALID_PAYMENT_CONFIG:"INVALID_PAYMENT_CONFIG",INVALID_RECIPIENT:"INVALID_RECIPIENT",INVALID_ASSET:"INVALID_ASSET",INVALID_AMOUNT:"INVALID_AMOUNT",UNKNOWN_ERROR:"UNKNOWN_ERROR",UNABLE_TO_INITIATE_PAYMENT:"UNABLE_TO_INITIATE_PAYMENT",INVALID_CHAIN_NAMESPACE:"INVALID_CHAIN_NAMESPACE",GENERIC_PAYMENT_ERROR:"GENERIC_PAYMENT_ERROR",UNABLE_TO_GET_EXCHANGES:"UNABLE_TO_GET_EXCHANGES",ASSET_NOT_SUPPORTED:"ASSET_NOT_SUPPORTED",UNABLE_TO_GET_PAY_URL:"UNABLE_TO_GET_PAY_URL",UNABLE_TO_GET_BUY_STATUS:"UNABLE_TO_GET_BUY_STATUS"},m={[f.INVALID_PAYMENT_CONFIG]:"Invalid payment configuration",[f.INVALID_RECIPIENT]:"Invalid recipient address",[f.INVALID_ASSET]:"Invalid asset specified",[f.INVALID_AMOUNT]:"Invalid payment amount",[f.UNKNOWN_ERROR]:"Unknown payment error occurred",[f.UNABLE_TO_INITIATE_PAYMENT]:"Unable to initiate payment",[f.INVALID_CHAIN_NAMESPACE]:"Invalid chain namespace",[f.GENERIC_PAYMENT_ERROR]:"Unable to process payment",[f.UNABLE_TO_GET_EXCHANGES]:"Unable to get exchanges",[f.ASSET_NOT_SUPPORTED]:"Asset not supported by the selected exchange",[f.UNABLE_TO_GET_PAY_URL]:"Unable to get payment URL",[f.UNABLE_TO_GET_BUY_STATUS]:"Unable to get buy status"};class x extends Error{get message(){return m[this.code]}constructor(e,t){super(m[e]),this.name="AppKitPayError",this.code=e,this.details=t,Error.captureStackTrace&&Error.captureStackTrace(this,x)}}var E=a(41671);class I extends Error{}async function C(e,t){let a=function(){let e=E.OptionsController.getSnapshot().projectId;return`https://rpc.walletconnect.org/v1/json-rpc?projectId=${e}`}(),i=await fetch(a,{method:"POST",body:JSON.stringify({jsonrpc:"2.0",id:1,method:e,params:t}),headers:{"Content-Type":"application/json"}}),o=await i.json();if(o.error)throw new I(o.error.message);return o}async function N(e){return(await C("reown_getExchanges",e)).result}async function P(e){return(await C("reown_getExchangePayUrl",e)).result}async function A(e){return(await C("reown_getExchangeBuyStatus",e)).result}let k={eip155:{native:{assetNamespace:"slip44",assetReference:"60"},defaultTokenNamespace:"erc20"}};var T=a(94019);async function _(e){let{paymentAssetNetwork:t,activeCaipNetwork:a,approvedCaipNetworkIds:i,requestedCaipNetworks:o}=e,r=l.j.sortRequestedNetworks(i,o).find(e=>e.caipNetworkId===t);if(!r)throw new x(f.INVALID_PAYMENT_CONFIG);if(r.caipNetworkId===a.caipNetworkId)return;let n=s.R.getNetworkProp("supportsAllNetworks",r.chainNamespace);if(!(i?.includes(r.caipNetworkId)||n))throw new x(f.INVALID_PAYMENT_CONFIG);try{await s.R.switchActiveNetwork(r)}catch(e){throw new x(f.GENERIC_PAYMENT_ERROR,e)}}async function S(e,t,a){if(t!==v.b.CHAIN.EVM)throw new x(f.INVALID_CHAIN_NAMESPACE);let i="string"==typeof e.amount?parseFloat(e.amount):e.amount;if(isNaN(i))throw new x(f.INVALID_PAYMENT_CONFIG);let o=e.metadata?.decimals??18,r=d.ConnectionController.parseUnits(i.toString(),o);if("bigint"!=typeof r)throw new x(f.GENERIC_PAYMENT_ERROR);if(t!==v.b.CHAIN.EVM)throw new x(f.INVALID_CHAIN_NAMESPACE);return await d.ConnectionController.sendTransaction({chainNamespace:t,to:e.recipient,address:a,value:r,data:"0x"})??void 0}async function R(e,t){let a=e.asset,i=e.recipient,o=Number(e.metadata.decimals),r=d.ConnectionController.parseUnits(e.amount.toString(),o);if(void 0===r)throw new x(f.GENERIC_PAYMENT_ERROR);return await d.ConnectionController.writeContract({fromAddress:t,tokenAddress:a,args:[i,r],method:"transfer",abi:T.g.getERC20Abi(a),chainNamespace:v.b.CHAIN.EVM})??void 0}let $=(0,p.sj)({paymentAsset:{network:"eip155:1",recipient:"0x0",asset:"0x0",amount:0,metadata:{name:"0x0",symbol:"0x0",decimals:0}},isConfigured:!1,error:null,isPaymentInProgress:!1,exchanges:[],isLoading:!1,openInNewTab:!0,redirectUrl:void 0,payWithExchange:void 0,currentPayment:void 0}),z={state:$,subscribe:e=>(0,p.Ld)($,()=>e($)),subscribeKey:(e,t)=>(0,g.VW)($,e,t),async handleOpenPay(e){this.resetState(),this.setPaymentConfig(e),this.subscribeEvents(),$.isConfigured=!0,await c.I.open({view:"Pay"})},resetState(){$.paymentAsset={network:"eip155:1",recipient:"0x0",asset:"0x0",amount:0,metadata:{name:"0x0",symbol:"0x0",decimals:0}},$.isConfigured=!1,$.error=null,$.isPaymentInProgress=!1,$.isLoading=!1,$.currentPayment=void 0},setPaymentConfig(e){if(!e.paymentAsset)throw new x(f.INVALID_PAYMENT_CONFIG);try{$.paymentAsset=e.paymentAsset,$.openInNewTab=e.openInNewTab??!0,$.redirectUrl=e.redirectUrl,$.payWithExchange=e.payWithExchange,$.error=null}catch(e){throw new x(f.INVALID_PAYMENT_CONFIG,e.message)}},getPaymentAsset:()=>$.paymentAsset,getExchanges:()=>$.exchanges,async fetchExchanges(){try{$.isLoading=!0;let e=await N({page:0});$.exchanges=e.exchanges.slice(0,2)}catch(e){throw u.SnackController.showError(m.UNABLE_TO_GET_EXCHANGES),new x(f.UNABLE_TO_GET_EXCHANGES)}finally{$.isLoading=!1}},async getAvailableExchanges(e=0){try{return await N({page:e})}catch(e){throw new x(f.UNABLE_TO_GET_EXCHANGES)}},async getPayUrl(e,t){try{let a=Number(t.amount);return await P({exchangeId:e,asset:function(e,t){let{chainNamespace:a,chainId:i}=w.u.parseCaipNetworkId(e),o=k[a];if(!o)throw Error(`Unsupported chain namespace for CAIP-19 formatting: ${a}`);let r=o.native.assetNamespace,n=o.native.assetReference;"native"!==t&&(r=o.defaultTokenNamespace,n=t);let s=`${a}:${i}`;return`${s}/${r}:${n}`}(t.network,t.asset),amount:a.toString(16),recipient:`${t.network}:${t.recipient}`})}catch(e){if(e instanceof Error&&e.message.includes("is not supported"))throw new x(f.ASSET_NOT_SUPPORTED);throw Error(e.message)}},async openPayUrl(e,t,a=!0){try{let i=await this.getPayUrl(e,t);if(!i)throw new x(f.UNABLE_TO_GET_PAY_URL);return l.j.openHref(i.url,a?"_blank":"_self"),i}catch(e){throw e instanceof x?$.error=e.message:$.error=m.GENERIC_PAYMENT_ERROR,new x(f.UNABLE_TO_GET_PAY_URL)}},subscribeEvents(){$.isConfigured||(y.h.subscribeProviders(async e=>{let t=s.R.state.activeChain;y.h.getProvider(t)&&await this.handlePayment()}),n.AccountController.subscribeKey("caipAddress",async e=>{e&&await this.handlePayment()}))},async handlePayment(){$.currentPayment={type:"wallet"};let e=n.AccountController.state.caipAddress;if(!e)return;let{chainId:t,address:a}=w.u.parseCaipAddress(e),i=s.R.state.activeChain;if(!a||!t||!i||!y.h.getProvider(i))return;let o=s.R.state.activeCaipNetwork;if(o&&!$.isPaymentInProgress)try{$.isPaymentInProgress=!0;let e=s.R.getAllRequestedCaipNetworks(),t=s.R.getAllApprovedCaipNetworkIds();if(await _({paymentAssetNetwork:$.paymentAsset.network,activeCaipNetwork:o,approvedCaipNetworkIds:t,requestedCaipNetworks:e}),await c.I.open({view:"PayLoading"}),i===v.b.CHAIN.EVM)"native"===$.paymentAsset.asset&&($.currentPayment.result=await S($.paymentAsset,i,a)),$.paymentAsset.asset.startsWith("0x")&&($.currentPayment.result=await R($.paymentAsset,a));else throw new x(f.INVALID_CHAIN_NAMESPACE)}catch(e){e instanceof x?$.error=e.message:$.error=m.GENERIC_PAYMENT_ERROR,u.SnackController.showError($.error)}finally{$.isPaymentInProgress=!1}},getExchangeById:e=>$.exchanges.find(t=>t.id===e),validatePayConfig(e){let{paymentAsset:t}=e;if(!t)throw new x(f.INVALID_PAYMENT_CONFIG);if(!t.recipient)throw new x(f.INVALID_RECIPIENT);if(!t.asset)throw new x(f.INVALID_ASSET);if(!t.amount)throw new x(f.INVALID_AMOUNT)},handlePayWithWallet(){let e=n.AccountController.state.caipAddress;if(!e){b.RouterController.push("Connect");return}let{chainId:t,address:a}=w.u.parseCaipAddress(e),i=s.R.state.activeChain;if(!a||!t||!i){b.RouterController.push("Connect");return}this.handlePayment()},async handlePayWithExchange(e){try{$.currentPayment={type:"exchange",exchangeId:e},$.isPaymentInProgress=!0;let{network:t,asset:a,amount:i,recipient:o}=$.paymentAsset,r=await this.getPayUrl(e,{network:t,asset:a,amount:i,recipient:o});if(!r)throw new x(f.UNABLE_TO_INITIATE_PAYMENT);return $.currentPayment.sessionId=r.sessionId,$.currentPayment.status="IN_PROGRESS",$.currentPayment.exchangeId=e,{url:r.url,openInNewTab:$.openInNewTab}}catch(e){return e instanceof x?$.error=e.message:$.error=m.GENERIC_PAYMENT_ERROR,$.isPaymentInProgress=!1,u.SnackController.showError($.error),null}},async getBuyStatus(e,t){try{return await A({sessionId:t,exchangeId:e})}catch(e){throw new x(f.UNABLE_TO_GET_BUY_STATUS)}},async updateBuyStatus(e,t){try{let a=await this.getBuyStatus(e,t);$.currentPayment&&($.currentPayment.status=a.status,$.currentPayment.result=a.txHash),("SUCCESS"===a.status||"FAILED"===a.status)&&($.isPaymentInProgress=!1)}catch(e){throw new x(f.UNABLE_TO_GET_BUY_STATUS)}}};var O=(0,i.iv)`
  wui-separator {
    margin: var(--wui-spacing-m) calc(var(--wui-spacing-m) * -1) var(--wui-spacing-xs)
      calc(var(--wui-spacing-m) * -1);
    width: calc(100% + var(--wui-spacing-s) * 2);
  }

  .token-display {
    padding: var(--wui-spacing-s) var(--wui-spacing-m);
    border-radius: var(--wui-border-radius-s);
    background-color: var(--wui-color-bg-125);
    margin-top: var(--wui-spacing-s);
    margin-bottom: var(--wui-spacing-s);
  }

  .token-display wui-text {
    text-transform: none;
  }

  wui-loading-spinner {
    padding: var(--wui-spacing-xs);
  }
`,L=function(e,t,a,i){var o,r=arguments.length,n=r<3?t:null===i?i=Object.getOwnPropertyDescriptor(t,a):i;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)n=Reflect.decorate(e,t,a,i);else for(var s=e.length-1;s>=0;s--)(o=e[s])&&(n=(r<3?o(n):r>3?o(t,a,n):o(t,a))||n);return r>3&&n&&Object.defineProperty(t,a,n),n};let M=class extends i.oi{constructor(){super(),this.unsubscribe=[],this.amount="",this.tokenSymbol="",this.networkName="",this.exchanges=z.state.exchanges,this.isLoading=z.state.isLoading,this.loadingExchangeId=null,this.connectedWalletInfo=n.AccountController.state.connectedWalletInfo,this.initializePaymentDetails(),this.unsubscribe.push(z.subscribeKey("exchanges",e=>this.exchanges=e)),this.unsubscribe.push(z.subscribeKey("isLoading",e=>this.isLoading=e)),this.unsubscribe.push(n.AccountController.subscribe(e=>this.connectedWalletInfo=e.connectedWalletInfo)),z.fetchExchanges()}get isWalletConnected(){return"connected"===n.AccountController.state.status}render(){return(0,i.dy)`
      <wui-flex flexDirection="column">
        <wui-flex flexDirection="column" .padding=${["0","l","l","l"]} gap="s">
          ${this.renderPaymentHeader()}

          <wui-flex flexDirection="column" gap="s">
            <wui-flex flexDirection="column" gap="s">
              ${this.isWalletConnected?this.renderConnectedView():this.renderDisconnectedView()}
            </wui-flex>
            <wui-separator text="or"></wui-separator>
            ${this.renderExchangeOptions()}
          </wui-flex>
        </wui-flex>
      </wui-flex>
    `}initializePaymentDetails(){let e=z.getPaymentAsset();this.networkName=e.network,this.tokenSymbol=e.metadata.symbol,this.amount=e.amount.toString()}renderPaymentHeader(){let e=this.networkName;if(this.networkName){let t=s.R.getAllRequestedCaipNetworks().find(e=>e.caipNetworkId===this.networkName);t&&(e=t.name)}return(0,i.dy)`
      <wui-flex flexDirection="column" alignItems="center">
        <wui-flex alignItems="center" gap="xs">
          <wui-text variant="large-700" color="fg-100">${this.amount||"0.0000"}</wui-text>
          <wui-flex class="token-display" alignItems="center" gap="xxs">
            <wui-text variant="paragraph-600" color="fg-100">
              ${this.tokenSymbol||"Unknown Asset"}
            </wui-text>
            ${e?(0,i.dy)`
                  <wui-text variant="small-500" color="fg-200"> on ${e} </wui-text>
                `:""}
          </wui-flex>
        </wui-flex>
      </wui-flex>
    `}renderConnectedView(){let e=this.connectedWalletInfo?.name||"connected wallet";return(0,i.dy)`
      <wui-list-item
        @click=${this.onWalletPayment}
        ?chevron=${!0}
        data-testid="wallet-payment-option"
      >
        <wui-flex alignItems="center" gap="s">
          <wui-wallet-image
            size="sm"
            imageSrc=${(0,r.o)(this.connectedWalletInfo?.icon)}
            name=${(0,r.o)(this.connectedWalletInfo?.name)}
          ></wui-wallet-image>
          <wui-text variant="paragraph-500" color="inherit">Pay with ${e}</wui-text>
        </wui-flex>
      </wui-list-item>

      <wui-list-item
        variant="icon"
        iconVariant="overlay"
        icon="disconnect"
        @click=${this.onDisconnect}
        data-testid="disconnect-button"
        ?chevron=${!1}
      >
        <wui-text variant="paragraph-500" color="fg-200">Disconnect</wui-text>
      </wui-list-item>
    `}renderDisconnectedView(){return(0,i.dy)`<wui-list-item
      variant="icon"
      iconVariant="overlay"
      icon="walletPlaceholder"
      @click=${this.onWalletPayment}
      ?chevron=${!0}
      data-testid="wallet-payment-option"
    >
      <wui-text variant="paragraph-500" color="inherit">Pay from wallet</wui-text>
    </wui-list-item>`}renderExchangeOptions(){return this.isLoading?(0,i.dy)`<wui-flex justifyContent="center" alignItems="center">
        <wui-spinner size="md"></wui-spinner>
      </wui-flex>`:0===this.exchanges.length?(0,i.dy)`<wui-flex justifyContent="center" alignItems="center">
        <wui-text variant="paragraph-500" color="fg-100">No exchanges available</wui-text>
      </wui-flex>`:this.exchanges.map(e=>(0,i.dy)`
        <wui-list-item
          @click=${()=>this.onExchangePayment(e.id)}
          data-testid="exchange-option-${e.id}"
          ?chevron=${!0}
          ?disabled=${null!==this.loadingExchangeId}
        >
          <wui-flex alignItems="center" gap="s">
            ${this.loadingExchangeId===e.id?(0,i.dy)`<wui-loading-spinner color="accent-100" size="md"></wui-loading-spinner>`:(0,i.dy)`<wui-wallet-image
                  size="sm"
                  imageSrc=${(0,r.o)(e.imageUrl)}
                  name=${e.name}
                ></wui-wallet-image>`}
            <wui-text flexGrow="1" variant="paragraph-500" color="inherit"
              >Pay with ${e.name} <wui-spinner size="sm" color="fg-200"></wui-spinner
            ></wui-text>
          </wui-flex>
        </wui-list-item>
      `)}onWalletPayment(){z.handlePayWithWallet()}async onExchangePayment(e){try{this.loadingExchangeId=e;let t=await z.handlePayWithExchange(e);t&&(await c.I.open({view:"PayLoading"}),l.j.openHref(t.url,t.openInNewTab?"_blank":"_self"))}catch(e){console.error("Failed to pay with exchange",e),u.SnackController.showError("Failed to pay with exchange")}finally{this.loadingExchangeId=null}}async onDisconnect(e){e.stopPropagation();try{await d.ConnectionController.disconnect(),c.I.close()}catch{console.error("Failed to disconnect"),u.SnackController.showError("Failed to disconnect")}}disconnectedCallback(){this.unsubscribe.forEach(e=>e())}};M.styles=O,L([(0,o.S)()],M.prototype,"amount",void 0),L([(0,o.S)()],M.prototype,"tokenSymbol",void 0),L([(0,o.S)()],M.prototype,"networkName",void 0),L([(0,o.S)()],M.prototype,"exchanges",void 0),L([(0,o.S)()],M.prototype,"isLoading",void 0),L([(0,o.S)()],M.prototype,"loadingExchangeId",void 0),L([(0,o.S)()],M.prototype,"connectedWalletInfo",void 0),M=L([(0,h.Mo)("w3m-pay-view")],M);var U=a(88383);a(96742);var j=(0,i.iv)`
  :host {
    display: block;
    height: 100%;
    width: 100%;
  }
`,D=function(e,t,a,i){var o,r=arguments.length,n=r<3?t:null===i?i=Object.getOwnPropertyDescriptor(t,a):i;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)n=Reflect.decorate(e,t,a,i);else for(var s=e.length-1;s>=0;s--)(o=e[s])&&(n=(r<3?o(n):r>3?o(t,a,n):o(t,a))||n);return r>3&&n&&Object.defineProperty(t,a,n),n};let V=class extends i.oi{constructor(){super(),this.loadingMessage="",this.subMessage="",this.paymentState="in-progress",this.paymentState=z.state.isPaymentInProgress?"in-progress":"completed",this.updateMessages(),this.setupSubscription(),this.setupExchangeSubscription()}disconnectedCallback(){clearInterval(this.exchangeSubscription)}render(){return(0,i.dy)`
      <wui-flex
        flexDirection="column"
        alignItems="center"
        .padding=${["xl","xl","xl","xl"]}
        gap="xl"
      >
        <wui-flex justifyContent="center" alignItems="center"> ${this.getStateIcon()} </wui-flex>
        <wui-flex flexDirection="column" alignItems="center" gap="xs">
          <wui-text align="center" variant="paragraph-500" color="fg-100">
            ${this.loadingMessage}
          </wui-text>
          <wui-text align="center" variant="small-400" color="fg-200">
            ${this.subMessage}
          </wui-text>
        </wui-flex>
      </wui-flex>
    `}updateMessages(){switch(this.paymentState){case"completed":this.loadingMessage="Payment completed",this.subMessage="Your transaction has been successfully processed";break;case"error":this.loadingMessage="Payment failed",this.subMessage="There was an error processing your transaction";break;default:z.state.currentPayment?.type==="exchange"?(this.loadingMessage="Payment initiated",this.subMessage="Please complete the payment on the exchange"):(this.loadingMessage="Awaiting payment confirmation",this.subMessage="Please confirm the payment transaction in your wallet")}}getStateIcon(){switch(this.paymentState){case"completed":return this.successTemplate();case"error":return this.errorTemplate();default:return this.loaderTemplate()}}setupExchangeSubscription(){z.state.currentPayment?.type==="exchange"&&(this.exchangeSubscription=setInterval(async()=>{let e=z.state.currentPayment?.exchangeId,t=z.state.currentPayment?.sessionId;e&&t&&(await z.updateBuyStatus(e,t),z.state.currentPayment?.status==="SUCCESS"&&clearInterval(this.exchangeSubscription))},4e3))}setupSubscription(){z.subscribeKey("isPaymentInProgress",e=>{e||"in-progress"!==this.paymentState||(z.state.error||!z.state.currentPayment?.result?this.paymentState="error":this.paymentState="completed",this.updateMessages(),setTimeout(()=>{"disconnected"!==d.ConnectionController.state.status&&c.I.close()},3e3))}),z.subscribeKey("error",e=>{e&&"in-progress"===this.paymentState&&(this.paymentState="error",this.updateMessages())})}loaderTemplate(){let e=U.ThemeController.state.themeVariables["--w3m-border-radius-master"],t=e?parseInt(e.replace("px",""),10):4;return(0,i.dy)`<wui-loading-thumbnail radius=${9*t}></wui-loading-thumbnail>`}successTemplate(){return(0,i.dy)`<wui-icon size="xl" color="success-100" name="checkmark"></wui-icon>`}errorTemplate(){return(0,i.dy)`<wui-icon size="xl" color="error-100" name="close"></wui-icon>`}};async function B(e){return z.handleOpenPay(e)}function G(){return z.getExchanges()}function Y(){return z.state.currentPayment?.result}function W(){return z.state.error}function H(){return z.state.isPaymentInProgress}V.styles=j,D([(0,o.S)()],V.prototype,"loadingMessage",void 0),D([(0,o.S)()],V.prototype,"subMessage",void 0),D([(0,o.S)()],V.prototype,"paymentState",void 0),V=D([(0,h.Mo)("w3m-pay-loading-view")],V)},11908:function(e,t,a){a(82188)},21633:function(e,t,a){var i=a(45352),o=a(46491);a(88896);var r=a(73616),n=a(46454),s=(0,i.iv)`
  :host {
    position: relative;
  }

  button {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 48px;
    width: 100%;
    background-color: var(--wui-color-accent-glass-010);
    border-radius: var(--wui-border-radius-xs);
    border: 1px solid var(--wui-color-accent-glass-010);
    transition: background-color var(--wui-ease-out-power-1) var(--wui-duration-md);
    will-change: background-color;
  }

  wui-tooltip {
    padding: 7px var(--wui-spacing-s) 8px var(--wui-spacing-s);
    position: absolute;
    top: -8px;
    left: 50%;
    transform: translate(-50%, -100%);
    opacity: 0;
    display: none;
  }

  @media (hover: hover) and (pointer: fine) {
    button:hover:enabled {
      background-color: var(--wui-color-accent-glass-015);
    }

    button:active:enabled {
      background-color: var(--wui-color-accent-glass-020);
    }
  }
`,c=function(e,t,a,i){var o,r=arguments.length,n=r<3?t:null===i?i=Object.getOwnPropertyDescriptor(t,a):i;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)n=Reflect.decorate(e,t,a,i);else for(var s=e.length-1;s>=0;s--)(o=e[s])&&(n=(r<3?o(n):r>3?o(t,a,n):o(t,a))||n);return r>3&&n&&Object.defineProperty(t,a,n),n};let l=class extends i.oi{constructor(){super(...arguments),this.text="",this.icon="card"}render(){return(0,i.dy)`<button>
      <wui-icon color="accent-100" name=${this.icon} size="lg"></wui-icon>
    </button>`}};l.styles=[r.ET,r.ZM,s],c([(0,o.Cb)()],l.prototype,"text",void 0),c([(0,o.Cb)()],l.prototype,"icon",void 0),c([(0,n.M)("wui-icon-button")],l)},26098:function(e,t,a){var i=a(45352),o=a(46491);a(88896);var r=a(73616),n=a(46454),s=(0,i.iv)`
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
`,c=function(e,t,a,i){var o,r=arguments.length,n=r<3?t:null===i?i=Object.getOwnPropertyDescriptor(t,a):i;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)n=Reflect.decorate(e,t,a,i);else for(var s=e.length-1;s>=0;s--)(o=e[s])&&(n=(r<3?o(n):r>3?o(t,a,n):o(t,a))||n);return r>3&&n&&Object.defineProperty(t,a,n),n};let l=class extends i.oi{constructor(){super(...arguments),this.size="md",this.disabled=!1,this.icon="copy",this.iconColor="inherit"}render(){let e="lg"===this.size?"--wui-border-radius-xs":"--wui-border-radius-xxs",t="lg"===this.size?"--wui-spacing-1xs":"--wui-spacing-2xs";return this.style.cssText=`
    --local-border-radius: var(${e});
    --local-padding: var(${t});
`,(0,i.dy)`
      <button ?disabled=${this.disabled}>
        <wui-icon color=${this.iconColor} size=${this.size} name=${this.icon}></wui-icon>
      </button>
    `}};l.styles=[r.ET,r.ZM,r.Bp,s],c([(0,o.Cb)()],l.prototype,"size",void 0),c([(0,o.Cb)({type:Boolean})],l.prototype,"disabled",void 0),c([(0,o.Cb)()],l.prototype,"icon",void 0),c([(0,o.Cb)()],l.prototype,"iconColor",void 0),c([(0,n.M)("wui-icon-link")],l)},73356:function(e,t,a){a(88896)},20847:function(e,t,a){a(95789)},16553:function(e,t,a){var i=a(45352),o=a(46491),r=a(3001);a(88896),a(95789),a(23726),a(39045),a(87746);var n=a(73616),s=a(46454);a(518);var c=(0,i.iv)`
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
`,l=function(e,t,a,i){var o,r=arguments.length,n=r<3?t:null===i?i=Object.getOwnPropertyDescriptor(t,a):i;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)n=Reflect.decorate(e,t,a,i);else for(var s=e.length-1;s>=0;s--)(o=e[s])&&(n=(r<3?o(n):r>3?o(t,a,n):o(t,a))||n);return r>3&&n&&Object.defineProperty(t,a,n),n};let u=class extends i.oi{constructor(){super(...arguments),this.tabIdx=void 0,this.variant="icon",this.disabled=!1,this.imageSrc=void 0,this.alt=void 0,this.chevron=!1,this.loading=!1}render(){return(0,i.dy)`
      <button
        ?disabled=${!!this.loading||!!this.disabled}
        data-loading=${this.loading}
        data-iconvariant=${(0,r.o)(this.iconVariant)}
        tabindex=${(0,r.o)(this.tabIdx)}
      >
        ${this.loadingTemplate()} ${this.visualTemplate()}
        <wui-flex gap="3xs">
          <slot></slot>
        </wui-flex>
        ${this.chevronTemplate()}
      </button>
    `}visualTemplate(){if("image"===this.variant&&this.imageSrc)return(0,i.dy)`<wui-image src=${this.imageSrc} alt=${this.alt??"list item"}></wui-image>`;if("square"===this.iconVariant&&this.icon&&"icon"===this.variant)return(0,i.dy)`<wui-icon name=${this.icon}></wui-icon>`;if("icon"===this.variant&&this.icon&&this.iconVariant){let e=["blue","square-blue"].includes(this.iconVariant)?"accent-100":"fg-200",t="square-blue"===this.iconVariant?"mdl":"md",a=this.iconSize?this.iconSize:t;return(0,i.dy)`
        <wui-icon-box
          data-variant=${this.iconVariant}
          icon=${this.icon}
          iconSize=${a}
          background="transparent"
          iconColor=${e}
          backgroundColor=${e}
          size=${t}
        ></wui-icon-box>
      `}return null}loadingTemplate(){return this.loading?(0,i.dy)`<wui-loading-spinner
        data-testid="wui-list-item-loading-spinner"
        color="fg-300"
      ></wui-loading-spinner>`:(0,i.dy)``}chevronTemplate(){return this.chevron?(0,i.dy)`<wui-icon size="inherit" color="fg-200" name="chevronRight"></wui-icon>`:null}};u.styles=[n.ET,n.ZM,c],l([(0,o.Cb)()],u.prototype,"icon",void 0),l([(0,o.Cb)()],u.prototype,"iconSize",void 0),l([(0,o.Cb)()],u.prototype,"tabIdx",void 0),l([(0,o.Cb)()],u.prototype,"variant",void 0),l([(0,o.Cb)()],u.prototype,"iconVariant",void 0),l([(0,o.Cb)({type:Boolean})],u.prototype,"disabled",void 0),l([(0,o.Cb)()],u.prototype,"imageSrc",void 0),l([(0,o.Cb)()],u.prototype,"alt",void 0),l([(0,o.Cb)({type:Boolean})],u.prototype,"chevron",void 0),l([(0,o.Cb)({type:Boolean})],u.prototype,"loading",void 0),l([(0,s.M)("wui-list-item")],u)},44779:function(e,t,a){a(23726)},96742:function(e,t,a){var i=a(45352),o=a(46491),r=a(73616),n=a(46454),s=(0,i.iv)`
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
`,c=function(e,t,a,i){var o,r=arguments.length,n=r<3?t:null===i?i=Object.getOwnPropertyDescriptor(t,a):i;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)n=Reflect.decorate(e,t,a,i);else for(var s=e.length-1;s>=0;s--)(o=e[s])&&(n=(r<3?o(n):r>3?o(t,a,n):o(t,a))||n);return r>3&&n&&Object.defineProperty(t,a,n),n};let l=class extends i.oi{constructor(){super(...arguments),this.radius=36}render(){return this.svgLoaderTemplate()}svgLoaderTemplate(){let e=this.radius>50?50:this.radius,t=36-e;return(0,i.dy)`
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
    `}};l.styles=[r.ET,s],c([(0,o.Cb)({type:Number})],l.prototype,"radius",void 0),c([(0,n.M)("wui-loading-thumbnail")],l)},34736:function(e,t,a){a(86852)},36566:function(e,t,a){var i=a(45352),o=a(46491);a(39045);var r=a(73616),n=a(46454),s=(0,i.iv)`
  :host {
    position: relative;
    display: flex;
    width: 100%;
    height: 1px;
    background-color: var(--wui-color-gray-glass-005);
    justify-content: center;
    align-items: center;
  }

  :host > wui-text {
    position: absolute;
    padding: 0px 10px;
    background-color: var(--wui-color-modal-bg);
    transition: background-color var(--wui-duration-lg) var(--wui-ease-out-power-1);
    will-change: background-color;
  }
`,c=function(e,t,a,i){var o,r=arguments.length,n=r<3?t:null===i?i=Object.getOwnPropertyDescriptor(t,a):i;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)n=Reflect.decorate(e,t,a,i);else for(var s=e.length-1;s>=0;s--)(o=e[s])&&(n=(r<3?o(n):r>3?o(t,a,n):o(t,a))||n);return r>3&&n&&Object.defineProperty(t,a,n),n};let l=class extends i.oi{constructor(){super(...arguments),this.text=""}render(){return(0,i.dy)`${this.template()}`}template(){return this.text?(0,i.dy)`<wui-text variant="small-500" color="fg-200">${this.text}</wui-text>`:null}};l.styles=[r.ET,s],c([(0,o.Cb)()],l.prototype,"text",void 0),c([(0,n.M)("wui-separator")],l)},10963:function(e,t,a){a(14178)},1840:function(e,t,a){a.d(t,{W:function(){return o}});var i=a(45352);let o=(0,i.YP)`<svg  viewBox="0 0 48 54" fill="none">
  <path
    d="M43.4605 10.7248L28.0485 1.61089C25.5438 0.129705 22.4562 0.129705 19.9515 1.61088L4.53951 10.7248C2.03626 12.2051 0.5 14.9365 0.5 17.886V36.1139C0.5 39.0635 2.03626 41.7949 4.53951 43.2752L19.9515 52.3891C22.4562 53.8703 25.5438 53.8703 28.0485 52.3891L43.4605 43.2752C45.9637 41.7949 47.5 39.0635 47.5 36.114V17.8861C47.5 14.9365 45.9637 12.2051 43.4605 10.7248Z"
  />
</svg>`},95789:function(e,t,a){var i=a(45352),o=a(46491),r=a(73616),n=a(46454),s=(0,i.iv)`
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
`,c=function(e,t,a,i){var o,r=arguments.length,n=r<3?t:null===i?i=Object.getOwnPropertyDescriptor(t,a):i;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)n=Reflect.decorate(e,t,a,i);else for(var s=e.length-1;s>=0;s--)(o=e[s])&&(n=(r<3?o(n):r>3?o(t,a,n):o(t,a))||n);return r>3&&n&&Object.defineProperty(t,a,n),n};let l=class extends i.oi{constructor(){super(...arguments),this.src="./path/to/image.jpg",this.alt="Image",this.size=void 0}render(){return this.style.cssText=`
      --local-width: ${this.size?`var(--wui-icon-size-${this.size});`:"100%"};
      --local-height: ${this.size?`var(--wui-icon-size-${this.size});`:"100%"};
      `,(0,i.dy)`<img src=${this.src} alt=${this.alt} @error=${this.handleImageError} />`}handleImageError(){this.dispatchEvent(new CustomEvent("onLoadError",{bubbles:!0,composed:!0}))}};l.styles=[r.ET,r.Bp,s],c([(0,o.Cb)()],l.prototype,"src",void 0),c([(0,o.Cb)()],l.prototype,"alt",void 0),c([(0,o.Cb)()],l.prototype,"size",void 0),c([(0,n.M)("wui-image")],l)},23726:function(e,t,a){var i=a(45352),o=a(46491),r=a(73616),n=a(46454),s=(0,i.iv)`
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
`,c=function(e,t,a,i){var o,r=arguments.length,n=r<3?t:null===i?i=Object.getOwnPropertyDescriptor(t,a):i;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)n=Reflect.decorate(e,t,a,i);else for(var s=e.length-1;s>=0;s--)(o=e[s])&&(n=(r<3?o(n):r>3?o(t,a,n):o(t,a))||n);return r>3&&n&&Object.defineProperty(t,a,n),n};let l=class extends i.oi{constructor(){super(...arguments),this.color="accent-100",this.size="lg"}render(){return this.style.cssText=`--local-color: ${"inherit"===this.color?"inherit":`var(--wui-color-${this.color})`}`,this.dataset.size=this.size,(0,i.dy)`<svg viewBox="25 25 50 50">
      <circle r="20" cy="50" cx="50"></circle>
    </svg>`}};l.styles=[r.ET,s],c([(0,o.Cb)()],l.prototype,"color",void 0),c([(0,o.Cb)()],l.prototype,"size",void 0),c([(0,n.M)("wui-loading-spinner")],l)},82188:function(e,t,a){var i=a(45352),o=a(46491);a(23726),a(39045);var r=a(73616),n=a(46454),s=(0,i.iv)`
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
`,c=function(e,t,a,i){var o,r=arguments.length,n=r<3?t:null===i?i=Object.getOwnPropertyDescriptor(t,a):i;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)n=Reflect.decorate(e,t,a,i);else for(var s=e.length-1;s>=0;s--)(o=e[s])&&(n=(r<3?o(n):r>3?o(t,a,n):o(t,a))||n);return r>3&&n&&Object.defineProperty(t,a,n),n};let l={main:"inverse-100",inverse:"inverse-000",accent:"accent-100","accent-error":"error-100","accent-success":"success-100",neutral:"fg-100",disabled:"gray-glass-020"},u={lg:"paragraph-600",md:"small-600"},d={lg:"md",md:"md"},h=class extends i.oi{constructor(){super(...arguments),this.size="lg",this.disabled=!1,this.fullWidth=!1,this.loading=!1,this.variant="main",this.hasIconLeft=!1,this.hasIconRight=!1,this.borderRadius="m"}render(){this.style.cssText=`
    --local-width: ${this.fullWidth?"100%":"auto"};
    --local-opacity-100: ${this.loading?0:1};
    --local-opacity-000: ${this.loading?1:0};
    --local-border-radius: var(--wui-border-radius-${this.borderRadius});
    `;let e=this.textVariant??u[this.size];return(0,i.dy)`
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
    `}handleSlotLeftChange(){this.hasIconLeft=!0}handleSlotRightChange(){this.hasIconRight=!0}loadingTemplate(){if(this.loading){let e=d[this.size],t=this.disabled?l.disabled:l[this.variant];return(0,i.dy)`<wui-loading-spinner color=${t} size=${e}></wui-loading-spinner>`}return(0,i.dy)``}};h.styles=[r.ET,r.ZM,s],c([(0,o.Cb)()],h.prototype,"size",void 0),c([(0,o.Cb)({type:Boolean})],h.prototype,"disabled",void 0),c([(0,o.Cb)({type:Boolean})],h.prototype,"fullWidth",void 0),c([(0,o.Cb)({type:Boolean})],h.prototype,"loading",void 0),c([(0,o.Cb)()],h.prototype,"variant",void 0),c([(0,o.Cb)({type:Boolean})],h.prototype,"hasIconLeft",void 0),c([(0,o.Cb)({type:Boolean})],h.prototype,"hasIconRight",void 0),c([(0,o.Cb)()],h.prototype,"borderRadius",void 0),c([(0,o.Cb)()],h.prototype,"textVariant",void 0),c([(0,n.M)("wui-button")],h)},518:function(e,t,a){var i=a(45352),o=a(46491);a(88896);var r=a(73616),n=a(46454),s=(0,i.iv)`
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
`,c=function(e,t,a,i){var o,r=arguments.length,n=r<3?t:null===i?i=Object.getOwnPropertyDescriptor(t,a):i;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)n=Reflect.decorate(e,t,a,i);else for(var s=e.length-1;s>=0;s--)(o=e[s])&&(n=(r<3?o(n):r>3?o(t,a,n):o(t,a))||n);return r>3&&n&&Object.defineProperty(t,a,n),n};let l=class extends i.oi{constructor(){super(...arguments),this.size="md",this.backgroundColor="accent-100",this.iconColor="accent-100",this.background="transparent",this.border=!1,this.borderColor="wui-color-bg-125",this.icon="copy"}render(){let e=this.iconSize||this.size,t="lg"===this.size,a="xl"===this.size,o="gray"===this.background,r="opaque"===this.background,n="accent-100"===this.backgroundColor&&r||"success-100"===this.backgroundColor&&r||"error-100"===this.backgroundColor&&r||"inverse-100"===this.backgroundColor&&r,s=`var(--wui-color-${this.backgroundColor})`;return n?s=`var(--wui-icon-box-bg-${this.backgroundColor})`:o&&(s=`var(--wui-color-gray-${this.backgroundColor})`),this.style.cssText=`
       --local-bg-value: ${s};
       --local-bg-mix: ${n||o?"100%":t?"12%":"16%"};
       --local-border-radius: var(--wui-border-radius-${t?"xxs":a?"s":"3xl"});
       --local-size: var(--wui-icon-box-size-${this.size});
       --local-border: ${"wui-color-bg-125"===this.borderColor?"2px":"1px"} solid ${this.border?`var(--${this.borderColor})`:"transparent"}
   `,(0,i.dy)` <wui-icon color=${this.iconColor} size=${e} name=${this.icon}></wui-icon> `}};l.styles=[r.ET,r.ZM,s],c([(0,o.Cb)()],l.prototype,"size",void 0),c([(0,o.Cb)()],l.prototype,"backgroundColor",void 0),c([(0,o.Cb)()],l.prototype,"iconColor",void 0),c([(0,o.Cb)()],l.prototype,"iconSize",void 0),c([(0,o.Cb)()],l.prototype,"background",void 0),c([(0,o.Cb)({type:Boolean})],l.prototype,"border",void 0),c([(0,o.Cb)()],l.prototype,"borderColor",void 0),c([(0,o.Cb)()],l.prototype,"icon",void 0),c([(0,n.M)("wui-icon-box")],l)},86852:function(e,t,a){var i=a(45352),o=a(46491);let r=(0,i.YP)`<svg width="86" height="96" fill="none">
  <path
    d="M78.3244 18.926L50.1808 2.45078C45.7376 -0.150261 40.2624 -0.150262 35.8192 2.45078L7.6756 18.926C3.23322 21.5266 0.5 26.3301 0.5 31.5248V64.4752C0.5 69.6699 3.23322 74.4734 7.6756 77.074L35.8192 93.5492C40.2624 96.1503 45.7376 96.1503 50.1808 93.5492L78.3244 77.074C82.7668 74.4734 85.5 69.6699 85.5 64.4752V31.5248C85.5 26.3301 82.7668 21.5266 78.3244 18.926Z"
  />
</svg>`;var n=a(1840);let s=(0,i.YP)`
  <svg fill="none" viewBox="0 0 36 40">
    <path
      d="M15.4 2.1a5.21 5.21 0 0 1 5.2 0l11.61 6.7a5.21 5.21 0 0 1 2.61 4.52v13.4c0 1.87-1 3.59-2.6 4.52l-11.61 6.7c-1.62.93-3.6.93-5.22 0l-11.6-6.7a5.21 5.21 0 0 1-2.61-4.51v-13.4c0-1.87 1-3.6 2.6-4.52L15.4 2.1Z"
    />
  </svg>
`;a(88896),a(95789);var c=a(73616),l=a(46454),u=(0,i.iv)`
  :host {
    position: relative;
    border-radius: inherit;
    display: flex;
    justify-content: center;
    align-items: center;
    width: var(--local-width);
    height: var(--local-height);
  }

  :host([data-round='true']) {
    background: var(--wui-color-gray-glass-002);
    border-radius: 100%;
    outline: 1px solid var(--wui-color-gray-glass-005);
  }

  svg {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: 1;
    fill: var(--wui-color-gray-glass-002);
  }

  svg > path {
    stroke: var(--local-stroke);
  }

  wui-image {
    width: 100%;
    height: 100%;
    -webkit-clip-path: var(--local-path);
    clip-path: var(--local-path);
    background: var(--wui-color-gray-glass-002);
  }

  wui-icon {
    transform: translateY(-5%);
    width: var(--local-icon-size);
    height: var(--local-icon-size);
  }
`,d=function(e,t,a,i){var o,r=arguments.length,n=r<3?t:null===i?i=Object.getOwnPropertyDescriptor(t,a):i;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)n=Reflect.decorate(e,t,a,i);else for(var s=e.length-1;s>=0;s--)(o=e[s])&&(n=(r<3?o(n):r>3?o(t,a,n):o(t,a))||n);return r>3&&n&&Object.defineProperty(t,a,n),n};let h=class extends i.oi{constructor(){super(...arguments),this.size="md",this.name="uknown",this.networkImagesBySize={sm:s,md:n.W,lg:r},this.selected=!1,this.round=!1}render(){return this.round?(this.dataset.round="true",this.style.cssText=`
      --local-width: var(--wui-spacing-3xl);
      --local-height: var(--wui-spacing-3xl);
      --local-icon-size: var(--wui-spacing-l);
    `):this.style.cssText=`

      --local-path: var(--wui-path-network-${this.size});
      --local-width:  var(--wui-width-network-${this.size});
      --local-height:  var(--wui-height-network-${this.size});
      --local-icon-size:  var(--wui-icon-size-network-${this.size});
    `,(0,i.dy)`${this.templateVisual()} ${this.svgTemplate()} `}svgTemplate(){return this.round?null:this.networkImagesBySize[this.size]}templateVisual(){return this.imageSrc?(0,i.dy)`<wui-image src=${this.imageSrc} alt=${this.name}></wui-image>`:(0,i.dy)`<wui-icon size="inherit" color="fg-200" name="networkPlaceholder"></wui-icon>`}};h.styles=[c.ET,u],d([(0,o.Cb)()],h.prototype,"size",void 0),d([(0,o.Cb)()],h.prototype,"name",void 0),d([(0,o.Cb)({type:Object})],h.prototype,"networkImagesBySize",void 0),d([(0,o.Cb)()],h.prototype,"imageSrc",void 0),d([(0,o.Cb)({type:Boolean})],h.prototype,"selected",void 0),d([(0,o.Cb)({type:Boolean})],h.prototype,"round",void 0),d([(0,l.M)("wui-network-image")],h)},14178:function(e,t,a){var i=a(45352),o=a(46491);a(88896),a(95789),a(87746);var r=a(73616),n=a(46454);a(518);var s=(0,i.iv)`
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
`,c=function(e,t,a,i){var o,r=arguments.length,n=r<3?t:null===i?i=Object.getOwnPropertyDescriptor(t,a):i;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)n=Reflect.decorate(e,t,a,i);else for(var s=e.length-1;s>=0;s--)(o=e[s])&&(n=(r<3?o(n):r>3?o(t,a,n):o(t,a))||n);return r>3&&n&&Object.defineProperty(t,a,n),n};let l=class extends i.oi{constructor(){super(...arguments),this.size="md",this.name="",this.installed=!1,this.badgeSize="xs"}render(){let e="xxs";return e="lg"===this.size?"m":"md"===this.size?"xs":"xxs",this.style.cssText=`
       --local-border-radius: var(--wui-border-radius-${e});
       --local-size: var(--wui-wallet-image-size-${this.size});
   `,this.walletIcon&&(this.dataset.walletIcon=this.walletIcon),(0,i.dy)`
      <wui-flex justifyContent="center" alignItems="center"> ${this.templateVisual()} </wui-flex>
    `}templateVisual(){return this.imageSrc?(0,i.dy)`<wui-image src=${this.imageSrc} alt=${this.name}></wui-image>`:this.walletIcon?(0,i.dy)`<wui-icon
        data-parent-size="md"
        size="md"
        color="inherit"
        name=${this.walletIcon}
      ></wui-icon>`:(0,i.dy)`<wui-icon
      data-parent-size=${this.size}
      size="inherit"
      color="inherit"
      name="walletPlaceholder"
    ></wui-icon>`}};l.styles=[r.ZM,r.ET,s],c([(0,o.Cb)()],l.prototype,"size",void 0),c([(0,o.Cb)()],l.prototype,"name",void 0),c([(0,o.Cb)()],l.prototype,"imageSrc",void 0),c([(0,o.Cb)()],l.prototype,"walletIcon",void 0),c([(0,o.Cb)({type:Boolean})],l.prototype,"installed",void 0),c([(0,o.Cb)()],l.prototype,"badgeSize",void 0),c([(0,n.M)("wui-wallet-image")],l)}}]);