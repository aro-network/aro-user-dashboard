"use strict";(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[3163],{34925:function(e,t,i){i.d(t,{U:function(){return o}});let o={URLS:{FAQ:"https://walletconnect.com/faq"}}},79677:function(e,t,i){i.d(t,{y0:function(){return w}});var o=i(26393),r=i(97392),a=i(57750),n=i(20090),s=i(29113),l=i(66879),c=i(48737),d=i(994),u=i(55998);async function p(){l.RouterController.push("ConnectingFarcaster");let e=n.ConnectorController.getAuthConnector();if(e&&!r.AccountController.state.farcasterUrl)try{let{url:t}=await e.provider.getFarcasterUri();r.AccountController.setFarcasterUrl(t,a.R.state.activeChain)}catch(e){l.RouterController.goBack(),c.SnackController.showError(e)}}async function h(e){l.RouterController.push("ConnectingSocial");let t=n.ConnectorController.getAuthConnector(),i=null;try{let n=setTimeout(()=>{throw Error("Social login timed out. Please try again.")},45e3);if(t&&e){if(d.j.isTelegram()||(i=function(){try{return d.j.returnOpenHref(`${o.b.SECURE_SITE_SDK_ORIGIN}/loading`,"popupWindow","width=600,height=800,scrollbars=yes")}catch(e){throw Error("Could not open social popup")}}()),i)r.AccountController.setSocialWindow(i,a.R.state.activeChain);else if(!d.j.isTelegram())throw Error("Could not create social popup");let{uri:s}=await t.provider.getSocialRedirectUri({provider:e});if(!s)throw i?.close(),Error("Could not fetch the social redirect uri");if(i&&(i.location.href=s),d.j.isTelegram()){u.M.setTelegramSocialProvider(e);let t=d.j.formatTelegramSocialLoginUrl(s);d.j.openHref(t,"_top")}clearTimeout(n)}}catch(e){i?.close(),c.SnackController.showError(e?.message)}}async function w(e){r.AccountController.setSocialProvider(e,a.R.state.activeChain),s.X.sendEvent({type:"track",event:"SOCIAL_LOGIN_STARTED",properties:{provider:e}}),"farcaster"===e?await p():await h(e)}},53163:function(e,t,i){i.r(t),i.d(t,{AppKitAccountButton:function(){return k},AppKitButton:function(){return A},AppKitConnectButton:function(){return B},AppKitNetworkButton:function(){return H},W3mAccountButton:function(){return C},W3mAccountSettingsView:function(){return es},W3mAccountView:function(){return e_},W3mAllWalletsView:function(){return t$},W3mButton:function(){return T},W3mChooseAccountNameView:function(){return iZ},W3mConnectButton:function(){return P},W3mConnectView:function(){return iv},W3mConnectWalletsView:function(){return i6},W3mConnectingExternalView:function(){return iO},W3mConnectingMultiChainView:function(){return iN},W3mConnectingWcBasicView:function(){return iF},W3mConnectingWcView:function(){return iq},W3mDownloadsView:function(){return iJ},W3mGetWalletView:function(){return iQ},W3mNetworkButton:function(){return V},W3mNetworkSwitchView:function(){return ot},W3mNetworksView:function(){return os},W3mProfileView:function(){return eX},W3mRouter:function(){return q.A},W3mSIWXSignMessageView:function(){return oO},W3mSwitchActiveChainView:function(){return ou},W3mSwitchAddressView:function(){return e3},W3mUnsupportedChainView:function(){return ob},W3mWalletCompatibleNetworksView:function(){return oC},W3mWhatIsANetworkView:function(){return oh},W3mWhatIsAWalletView:function(){return i2}});var o=i(45352),r=i(46491),a=i(3001),n=i(57750),s=i(1401),l=i(41671),c=i(37824),d=i(97392),u=i(994),p=i(62913),h=i(14810);i(95789),i(23726),i(39045),i(87746);var w=i(73616),g=i(24441),b=i(46454);i(50227),i(518);var f=(0,o.iv)`
  :host {
    display: block;
  }

  button {
    border-radius: var(--wui-border-radius-3xl);
    background: var(--wui-color-gray-glass-002);
    display: flex;
    gap: var(--wui-spacing-xs);
    padding: var(--wui-spacing-3xs) var(--wui-spacing-xs) var(--wui-spacing-3xs)
      var(--wui-spacing-xs);
    border: 1px solid var(--wui-color-gray-glass-005);
  }

  button:disabled {
    background: var(--wui-color-gray-glass-015);
  }

  button:disabled > wui-text {
    color: var(--wui-color-gray-glass-015);
  }

  button:disabled > wui-flex > wui-text {
    color: var(--wui-color-gray-glass-015);
  }

  button:disabled > wui-image,
  button:disabled > wui-flex > wui-avatar {
    filter: grayscale(1);
  }

  button:has(wui-image) {
    padding: var(--wui-spacing-3xs) var(--wui-spacing-3xs) var(--wui-spacing-3xs)
      var(--wui-spacing-xs);
  }

  wui-text {
    color: var(--wui-color-fg-100);
  }

  wui-flex > wui-text {
    color: var(--wui-color-fg-200);
  }

  wui-image,
  wui-icon-box {
    border-radius: var(--wui-border-radius-3xl);
    width: 24px;
    height: 24px;
    box-shadow: 0 0 0 2px var(--wui-color-gray-glass-005);
  }

  wui-flex {
    border-radius: var(--wui-border-radius-3xl);
    border: 1px solid var(--wui-color-gray-glass-005);
    background: var(--wui-color-gray-glass-005);
    padding: 4px var(--wui-spacing-m) 4px var(--wui-spacing-xxs);
  }

  button.local-no-balance {
    border-radius: 0px;
    border: none;
    background: transparent;
  }

  wui-avatar {
    width: 20px;
    height: 20px;
    box-shadow: 0 0 0 2px var(--wui-color-accent-glass-010);
  }

  @media (max-width: 500px) {
    button {
      gap: 0px;
      padding: var(--wui-spacing-3xs) var(--wui-spacing-xs) !important;
      height: 32px;
    }
    wui-image,
    wui-icon-box,
    button > wui-text {
      visibility: hidden;
      width: 0px;
      height: 0px;
    }
    button {
      border-radius: 0px;
      border: none;
      background: transparent;
      padding: 0px;
    }
  }

  @media (hover: hover) and (pointer: fine) {
    button:hover:enabled > wui-flex > wui-text {
      color: var(--wui-color-fg-175);
    }

    button:active:enabled > wui-flex > wui-text {
      color: var(--wui-color-fg-175);
    }
  }
`,m=function(e,t,i,o){var r,a=arguments.length,n=a<3?t:null===o?o=Object.getOwnPropertyDescriptor(t,i):o;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)n=Reflect.decorate(e,t,i,o);else for(var s=e.length-1;s>=0;s--)(r=e[s])&&(n=(a<3?r(n):a>3?r(t,i,n):r(t,i))||n);return a>3&&n&&Object.defineProperty(t,i,n),n};let v=class extends o.oi{constructor(){super(...arguments),this.networkSrc=void 0,this.avatarSrc=void 0,this.balance=void 0,this.isUnsupportedChain=void 0,this.disabled=!1,this.loading=!1,this.address="",this.profileName="",this.charsStart=4,this.charsEnd=6}render(){return(0,o.dy)`
      <button
        ?disabled=${this.disabled}
        class=${(0,a.o)(this.balance?void 0:"local-no-balance")}
      >
        ${this.balanceTemplate()}
        <wui-flex gap="xxs" alignItems="center">
          <wui-avatar
            .imageSrc=${this.avatarSrc}
            alt=${this.address}
            address=${this.address}
          ></wui-avatar>
          <wui-text variant="paragraph-600" color="inherit">
            ${this.address?g.H.getTruncateString({string:this.profileName||this.address,charsStart:this.profileName?18:this.charsStart,charsEnd:this.profileName?0:this.charsEnd,truncate:this.profileName?"end":"middle"}):null}
          </wui-text>
        </wui-flex>
      </button>
    `}balanceTemplate(){if(this.isUnsupportedChain)return(0,o.dy)` <wui-icon-box
          size="sm"
          iconColor="error-100"
          backgroundColor="error-100"
          icon="warningCircle"
        ></wui-icon-box>
        <wui-text variant="paragraph-600" color="inherit"> Switch Network</wui-text>`;if(this.balance){let e=this.networkSrc?(0,o.dy)`<wui-image src=${this.networkSrc}></wui-image>`:(0,o.dy)`
            <wui-icon-box
              size="sm"
              iconColor="fg-200"
              backgroundColor="fg-300"
              icon="networkPlaceholder"
            ></wui-icon-box>
          `,t=this.loading?(0,o.dy)`<wui-loading-spinner size="md" color="fg-200"></wui-loading-spinner>`:(0,o.dy)`<wui-text variant="paragraph-600" color="inherit"> ${this.balance}</wui-text>`;return(0,o.dy)`${e} ${t}`}return null}};v.styles=[w.ET,w.ZM,f],m([(0,r.Cb)()],v.prototype,"networkSrc",void 0),m([(0,r.Cb)()],v.prototype,"avatarSrc",void 0),m([(0,r.Cb)()],v.prototype,"balance",void 0),m([(0,r.Cb)({type:Boolean})],v.prototype,"isUnsupportedChain",void 0),m([(0,r.Cb)({type:Boolean})],v.prototype,"disabled",void 0),m([(0,r.Cb)({type:Boolean})],v.prototype,"loading",void 0),m([(0,r.Cb)()],v.prototype,"address",void 0),m([(0,r.Cb)()],v.prototype,"profileName",void 0),m([(0,r.Cb)()],v.prototype,"charsStart",void 0),m([(0,r.Cb)()],v.prototype,"charsEnd",void 0),v=m([(0,b.M)("wui-account-button")],v);var y=function(e,t,i,o){var r,a=arguments.length,n=a<3?t:null===o?o=Object.getOwnPropertyDescriptor(t,i):o;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)n=Reflect.decorate(e,t,i,o);else for(var s=e.length-1;s>=0;s--)(r=e[s])&&(n=(a<3?r(n):a>3?r(t,i,n):r(t,i))||n);return a>3&&n&&Object.defineProperty(t,i,n),n};class x extends o.oi{constructor(){super(...arguments),this.unsubscribe=[],this.disabled=!1,this.balance="show",this.charsStart=4,this.charsEnd=6,this.namespace=void 0,this.caipAddress=n.R.getAccountData(this.namespace)?.caipAddress,this.balanceVal=n.R.getAccountData(this.namespace)?.balance,this.balanceSymbol=n.R.getAccountData(this.namespace)?.balanceSymbol,this.profileName=n.R.getAccountData(this.namespace)?.profileName,this.profileImage=n.R.getAccountData(this.namespace)?.profileImage,this.network=n.R.getNetworkData(this.namespace)?.caipNetwork,this.networkImage=s.f.getNetworkImage(this.network),this.isSupported=!!l.OptionsController.state.allowUnsupportedChain||!n.R.state.activeChain||n.R.checkIfSupportedNetwork(n.R.state.activeChain)}firstUpdated(){let e=this.namespace;e?this.unsubscribe.push(n.R.subscribeChainProp("accountState",e=>{this.caipAddress=e?.caipAddress,this.balanceVal=e?.balance,this.balanceSymbol=e?.balanceSymbol,this.profileName=e?.profileName,this.profileImage=e?.profileImage},e),n.R.subscribeChainProp("networkState",t=>{this.network=t?.caipNetwork,this.isSupported=n.R.checkIfSupportedNetwork(e,t?.caipNetwork),this.networkImage=s.f.getNetworkImage(t?.caipNetwork)},e)):this.unsubscribe.push(c.W.subscribeNetworkImages(()=>{this.networkImage=s.f.getNetworkImage(this.network)}),n.R.subscribeKey("activeCaipAddress",e=>{this.caipAddress=e}),d.AccountController.subscribeKey("balance",e=>this.balanceVal=e),d.AccountController.subscribeKey("balanceSymbol",e=>this.balanceSymbol=e),d.AccountController.subscribeKey("profileName",e=>this.profileName=e),d.AccountController.subscribeKey("profileImage",e=>this.profileImage=e),n.R.subscribeKey("activeCaipNetwork",e=>{this.network=e,this.networkImage=s.f.getNetworkImage(e),this.isSupported=!e?.chainNamespace||n.R.checkIfSupportedNetwork(e?.chainNamespace),this.fetchNetworkImage(e)}))}updated(){this.fetchNetworkImage(this.network)}disconnectedCallback(){this.unsubscribe.forEach(e=>e())}render(){if(!n.R.state.activeChain)return null;let e="show"===this.balance,t="string"!=typeof this.balanceVal;return(0,o.dy)`
      <wui-account-button
        .disabled=${!!this.disabled}
        .isUnsupportedChain=${!l.OptionsController.state.allowUnsupportedChain&&!this.isSupported}
        address=${(0,a.o)(u.j.getPlainAddress(this.caipAddress))}
        profileName=${(0,a.o)(this.profileName)}
        networkSrc=${(0,a.o)(this.networkImage)}
        avatarSrc=${(0,a.o)(this.profileImage)}
        balance=${e?u.j.formatBalance(this.balanceVal,this.balanceSymbol):""}
        @click=${this.onClick.bind(this)}
        data-testid=${`account-button${this.namespace?`-${this.namespace}`:""}`}
        .charsStart=${this.charsStart}
        .charsEnd=${this.charsEnd}
        ?loading=${t}
      >
      </wui-account-button>
    `}async onClick(){await n.R.switchActiveNamespace(this.namespace),this.isSupported||l.OptionsController.state.allowUnsupportedChain?p.I.open():p.I.open({view:"UnsupportedChain"})}async fetchNetworkImage(e){e?.assets?.imageId&&(this.networkImage=await s.f.fetchNetworkImage(e?.assets?.imageId))}}y([(0,r.Cb)({type:Boolean})],x.prototype,"disabled",void 0),y([(0,r.Cb)()],x.prototype,"balance",void 0),y([(0,r.Cb)()],x.prototype,"charsStart",void 0),y([(0,r.Cb)()],x.prototype,"charsEnd",void 0),y([(0,r.Cb)()],x.prototype,"namespace",void 0),y([(0,r.SB)()],x.prototype,"caipAddress",void 0),y([(0,r.SB)()],x.prototype,"balanceVal",void 0),y([(0,r.SB)()],x.prototype,"balanceSymbol",void 0),y([(0,r.SB)()],x.prototype,"profileName",void 0),y([(0,r.SB)()],x.prototype,"profileImage",void 0),y([(0,r.SB)()],x.prototype,"network",void 0),y([(0,r.SB)()],x.prototype,"networkImage",void 0),y([(0,r.SB)()],x.prototype,"isSupported",void 0);let C=class extends x{};C=y([(0,h.Mo)("w3m-account-button")],C);let k=class extends x{};k=y([(0,h.Mo)("appkit-account-button")],k);var $=(0,o.iv)`
  :host {
    display: block;
    width: max-content;
  }
`,S=function(e,t,i,o){var r,a=arguments.length,n=a<3?t:null===o?o=Object.getOwnPropertyDescriptor(t,i):o;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)n=Reflect.decorate(e,t,i,o);else for(var s=e.length-1;s>=0;s--)(r=e[s])&&(n=(a<3?r(n):a>3?r(t,i,n):r(t,i))||n);return a>3&&n&&Object.defineProperty(t,i,n),n};class R extends o.oi{constructor(){super(...arguments),this.unsubscribe=[],this.disabled=!1,this.balance=void 0,this.size=void 0,this.label=void 0,this.loadingLabel=void 0,this.charsStart=4,this.charsEnd=6,this.namespace=void 0,this.caipAddress=n.R.state.activeCaipAddress}firstUpdated(){this.namespace?this.unsubscribe.push(n.R.subscribeChainProp("accountState",e=>{this.caipAddress=e?.caipAddress},this.namespace)):this.unsubscribe.push(n.R.subscribeKey("activeCaipAddress",e=>this.caipAddress=e))}disconnectedCallback(){this.unsubscribe.forEach(e=>e())}render(){return this.caipAddress?(0,o.dy)`
          <appkit-account-button
            .disabled=${!!this.disabled}
            balance=${(0,a.o)(this.balance)}
            .charsStart=${(0,a.o)(this.charsStart)}
            .charsEnd=${(0,a.o)(this.charsEnd)}
            namespace=${(0,a.o)(this.namespace)}
          >
          </appkit-account-button>
        `:(0,o.dy)`
          <appkit-connect-button
            size=${(0,a.o)(this.size)}
            label=${(0,a.o)(this.label)}
            loadingLabel=${(0,a.o)(this.loadingLabel)}
            namespace=${(0,a.o)(this.namespace)}
          ></appkit-connect-button>
        `}}R.styles=$,S([(0,r.Cb)({type:Boolean})],R.prototype,"disabled",void 0),S([(0,r.Cb)()],R.prototype,"balance",void 0),S([(0,r.Cb)()],R.prototype,"size",void 0),S([(0,r.Cb)()],R.prototype,"label",void 0),S([(0,r.Cb)()],R.prototype,"loadingLabel",void 0),S([(0,r.Cb)()],R.prototype,"charsStart",void 0),S([(0,r.Cb)()],R.prototype,"charsEnd",void 0),S([(0,r.Cb)()],R.prototype,"namespace",void 0),S([(0,r.SB)()],R.prototype,"caipAddress",void 0);let T=class extends R{};T=S([(0,h.Mo)("w3m-button")],T);let A=class extends R{};A=S([(0,h.Mo)("appkit-button")],A);var I=(0,o.iv)`
  :host {
    position: relative;
    display: block;
  }

  button {
    background: var(--wui-color-accent-100);
    border: 1px solid var(--wui-color-gray-glass-010);
    border-radius: var(--wui-border-radius-m);
    gap: var(--wui-spacing-xs);
  }

  button.loading {
    background: var(--wui-color-gray-glass-010);
    border: 1px solid var(--wui-color-gray-glass-010);
    pointer-events: none;
  }

  button:disabled {
    background-color: var(--wui-color-gray-glass-015);
    border: 1px solid var(--wui-color-gray-glass-010);
  }

  button:disabled > wui-text {
    color: var(--wui-color-gray-glass-015);
  }

  @media (hover: hover) and (pointer: fine) {
    button:hover:enabled {
      background-color: var(--wui-color-accent-090);
    }

    button:active:enabled {
      background-color: var(--wui-color-accent-080);
    }
  }

  button:focus-visible {
    border: 1px solid var(--wui-color-gray-glass-010);
    background-color: var(--wui-color-accent-090);
    -webkit-box-shadow: 0px 0px 0px 4px var(--wui-box-shadow-blue);
    -moz-box-shadow: 0px 0px 0px 4px var(--wui-box-shadow-blue);
    box-shadow: 0px 0px 0px 4px var(--wui-box-shadow-blue);
  }

  button[data-size='sm'] {
    padding: 6.75px 10px 7.25px;
  }

  ::slotted(*) {
    transition: opacity var(--wui-ease-out-power-1) var(--wui-duration-md);
    will-change: opacity;
    opacity: var(--local-opacity-100);
  }

  button > wui-text {
    transition: opacity var(--wui-ease-out-power-1) var(--wui-duration-md);
    will-change: opacity;
    opacity: var(--local-opacity-100);
    color: var(--wui-color-inverse-100);
  }

  button[data-size='md'] {
    padding: 9px var(--wui-spacing-l) 9px var(--wui-spacing-l);
  }

  button[data-size='md'] + wui-text {
    padding-left: var(--wui-spacing-3xs);
  }

  @media (max-width: 500px) {
    button[data-size='md'] {
      height: 32px;
      padding: 5px 12px;
    }

    button[data-size='md'] > wui-text > slot {
      font-size: 14px !important;
    }
  }

  wui-loading-spinner {
    width: 14px;
    height: 14px;
  }

  wui-loading-spinner::slotted(svg) {
    width: 10px !important;
    height: 10px !important;
  }

  button[data-size='sm'] > wui-loading-spinner {
    width: 12px;
    height: 12px;
  }
`,O=function(e,t,i,o){var r,a=arguments.length,n=a<3?t:null===o?o=Object.getOwnPropertyDescriptor(t,i):o;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)n=Reflect.decorate(e,t,i,o);else for(var s=e.length-1;s>=0;s--)(r=e[s])&&(n=(a<3?r(n):a>3?r(t,i,n):r(t,i))||n);return a>3&&n&&Object.defineProperty(t,i,n),n};let E=class extends o.oi{constructor(){super(...arguments),this.size="md",this.loading=!1}render(){let e="md"===this.size?"paragraph-600":"small-600";return(0,o.dy)`
      <button data-size=${this.size} ?disabled=${this.loading}>
        ${this.loadingTemplate()}
        <wui-text variant=${e} color=${this.loading?"accent-100":"inherit"}>
          <slot></slot>
        </wui-text>
      </button>
    `}loadingTemplate(){return this.loading?(0,o.dy)`<wui-loading-spinner size=${this.size} color="accent-100"></wui-loading-spinner>`:null}};E.styles=[w.ET,w.ZM,I],O([(0,r.Cb)()],E.prototype,"size",void 0),O([(0,r.Cb)({type:Boolean})],E.prototype,"loading",void 0),E=O([(0,b.M)("wui-connect-button")],E);var j=function(e,t,i,o){var r,a=arguments.length,n=a<3?t:null===o?o=Object.getOwnPropertyDescriptor(t,i):o;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)n=Reflect.decorate(e,t,i,o);else for(var s=e.length-1;s>=0;s--)(r=e[s])&&(n=(a<3?r(n):a>3?r(t,i,n):r(t,i))||n);return a>3&&n&&Object.defineProperty(t,i,n),n};class N extends o.oi{constructor(){super(),this.unsubscribe=[],this.size="md",this.label="Connect Wallet",this.loadingLabel="Connecting...",this.open=p.I.state.open,this.loading=this.namespace?p.I.state.loadingNamespaceMap.get(this.namespace):p.I.state.loading,this.unsubscribe.push(p.I.subscribe(e=>{this.open=e.open,this.loading=this.namespace?e.loadingNamespaceMap.get(this.namespace):e.loading}))}disconnectedCallback(){this.unsubscribe.forEach(e=>e())}render(){return(0,o.dy)`
      <wui-connect-button
        size=${(0,a.o)(this.size)}
        .loading=${this.loading}
        @click=${this.onClick.bind(this)}
        data-testid=${`connect-button${this.namespace?`-${this.namespace}`:""}`}
      >
        ${this.loading?this.loadingLabel:this.label}
      </wui-connect-button>
    `}onClick(){this.open?p.I.close():this.loading||p.I.open({view:"Connect",namespace:this.namespace})}}j([(0,r.Cb)()],N.prototype,"size",void 0),j([(0,r.Cb)()],N.prototype,"label",void 0),j([(0,r.Cb)()],N.prototype,"loadingLabel",void 0),j([(0,r.Cb)()],N.prototype,"namespace",void 0),j([(0,r.SB)()],N.prototype,"open",void 0),j([(0,r.SB)()],N.prototype,"loading",void 0);let P=class extends N{};P=j([(0,h.Mo)("w3m-connect-button")],P);let B=class extends N{};B=j([(0,h.Mo)("appkit-connect-button")],B);var D=i(29113),M=(0,o.iv)`
  :host {
    display: block;
  }

  button {
    border-radius: var(--wui-border-radius-3xl);
    display: flex;
    gap: var(--wui-spacing-xs);
    padding: var(--wui-spacing-2xs) var(--wui-spacing-s) var(--wui-spacing-2xs)
      var(--wui-spacing-xs);
    border: 1px solid var(--wui-color-gray-glass-010);
    background-color: var(--wui-color-gray-glass-005);
    color: var(--wui-color-fg-100);
  }

  button:disabled {
    border: 1px solid var(--wui-color-gray-glass-005);
    background-color: var(--wui-color-gray-glass-015);
    color: var(--wui-color-gray-glass-015);
  }

  @media (hover: hover) and (pointer: fine) {
    button:hover:enabled {
      background-color: var(--wui-color-gray-glass-010);
    }

    button:active:enabled {
      background-color: var(--wui-color-gray-glass-015);
    }
  }

  wui-image,
  wui-icon-box {
    border-radius: var(--wui-border-radius-3xl);
    width: 24px;
    height: 24px;
    box-shadow: 0 0 0 2px var(--wui-color-gray-glass-005);
  }
`,W=function(e,t,i,o){var r,a=arguments.length,n=a<3?t:null===o?o=Object.getOwnPropertyDescriptor(t,i):o;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)n=Reflect.decorate(e,t,i,o);else for(var s=e.length-1;s>=0;s--)(r=e[s])&&(n=(a<3?r(n):a>3?r(t,i,n):r(t,i))||n);return a>3&&n&&Object.defineProperty(t,i,n),n};let L=class extends o.oi{constructor(){super(...arguments),this.imageSrc=void 0,this.isUnsupportedChain=void 0,this.disabled=!1}render(){return(0,o.dy)`
      <button data-testid="wui-network-button" ?disabled=${this.disabled}>
        ${this.visualTemplate()}
        <wui-text variant="paragraph-600" color="inherit">
          <slot></slot>
        </wui-text>
      </button>
    `}visualTemplate(){return this.isUnsupportedChain?(0,o.dy)`
        <wui-icon-box
          size="sm"
          iconColor="error-100"
          backgroundColor="error-100"
          icon="warningCircle"
        ></wui-icon-box>
      `:this.imageSrc?(0,o.dy)`<wui-image src=${this.imageSrc}></wui-image>`:(0,o.dy)`
      <wui-icon-box
        size="sm"
        iconColor="inverse-100"
        backgroundColor="fg-100"
        icon="networkPlaceholder"
      ></wui-icon-box>
    `}};L.styles=[w.ET,w.ZM,M],W([(0,r.Cb)()],L.prototype,"imageSrc",void 0),W([(0,r.Cb)({type:Boolean})],L.prototype,"isUnsupportedChain",void 0),W([(0,r.Cb)({type:Boolean})],L.prototype,"disabled",void 0),L=W([(0,b.M)("wui-network-button")],L);var z=(0,o.iv)`
  :host {
    display: block;
    width: max-content;
  }
`,U=function(e,t,i,o){var r,a=arguments.length,n=a<3?t:null===o?o=Object.getOwnPropertyDescriptor(t,i):o;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)n=Reflect.decorate(e,t,i,o);else for(var s=e.length-1;s>=0;s--)(r=e[s])&&(n=(a<3?r(n):a>3?r(t,i,n):r(t,i))||n);return a>3&&n&&Object.defineProperty(t,i,n),n};class _ extends o.oi{constructor(){super(),this.unsubscribe=[],this.disabled=!1,this.network=n.R.state.activeCaipNetwork,this.networkImage=s.f.getNetworkImage(this.network),this.caipAddress=n.R.state.activeCaipAddress,this.loading=p.I.state.loading,this.isSupported=!!l.OptionsController.state.allowUnsupportedChain||!n.R.state.activeChain||n.R.checkIfSupportedNetwork(n.R.state.activeChain),this.unsubscribe.push(c.W.subscribeNetworkImages(()=>{this.networkImage=s.f.getNetworkImage(this.network)}),n.R.subscribeKey("activeCaipAddress",e=>{this.caipAddress=e}),n.R.subscribeKey("activeCaipNetwork",e=>{this.network=e,this.networkImage=s.f.getNetworkImage(e),this.isSupported=!e?.chainNamespace||n.R.checkIfSupportedNetwork(e.chainNamespace),s.f.fetchNetworkImage(e?.assets?.imageId)}),p.I.subscribeKey("loading",e=>this.loading=e))}firstUpdated(){s.f.fetchNetworkImage(this.network?.assets?.imageId)}disconnectedCallback(){this.unsubscribe.forEach(e=>e())}render(){let e=!this.network||n.R.checkIfSupportedNetwork(this.network.chainNamespace);return(0,o.dy)`
      <wui-network-button
        .disabled=${!!(this.disabled||this.loading)}
        .isUnsupportedChain=${!l.OptionsController.state.allowUnsupportedChain&&!e}
        imageSrc=${(0,a.o)(this.networkImage)}
        @click=${this.onClick.bind(this)}
        data-testid="w3m-network-button"
      >
        ${this.getLabel()}
        <slot></slot>
      </wui-network-button>
    `}getLabel(){return this.network?this.isSupported||l.OptionsController.state.allowUnsupportedChain?this.network.name:"Switch Network":this.label?this.label:this.caipAddress?"Unknown Network":"Select Network"}onClick(){this.loading||(D.X.sendEvent({type:"track",event:"CLICK_NETWORKS"}),p.I.open({view:"Networks"}))}}_.styles=z,U([(0,r.Cb)({type:Boolean})],_.prototype,"disabled",void 0),U([(0,r.Cb)({type:String})],_.prototype,"label",void 0),U([(0,r.SB)()],_.prototype,"network",void 0),U([(0,r.SB)()],_.prototype,"networkImage",void 0),U([(0,r.SB)()],_.prototype,"caipAddress",void 0),U([(0,r.SB)()],_.prototype,"loading",void 0),U([(0,r.SB)()],_.prototype,"isSupported",void 0);let V=class extends _{};V=U([(0,h.Mo)("w3m-network-button")],V);let H=class extends _{};H=U([(0,h.Mo)("appkit-network-button")],H);var q=i(2660),K=i(26393),F=i(20090),G=i(96005),X=i(48737),Y=i(66879),Z=i(76711),J=i(67994);i(28052),i(26098),i(16553),i(88896),i(82188);var Q=(0,o.iv)`
  :host {
    display: block;
  }

  button {
    width: 100%;
    display: block;
    padding-top: var(--wui-spacing-l);
    padding-bottom: var(--wui-spacing-l);
    padding-left: var(--wui-spacing-s);
    padding-right: var(--wui-spacing-2l);
    border-radius: var(--wui-border-radius-s);
    background-color: var(--wui-color-accent-glass-010);
  }

  button:hover {
    background-color: var(--wui-color-accent-glass-015) !important;
  }

  button:active {
    background-color: var(--wui-color-accent-glass-020) !important;
  }
`,ee=function(e,t,i,o){var r,a=arguments.length,n=a<3?t:null===o?o=Object.getOwnPropertyDescriptor(t,i):o;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)n=Reflect.decorate(e,t,i,o);else for(var s=e.length-1;s>=0;s--)(r=e[s])&&(n=(a<3?r(n):a>3?r(t,i,n):r(t,i))||n);return a>3&&n&&Object.defineProperty(t,i,n),n};let et=class extends o.oi{constructor(){super(...arguments),this.label="",this.description="",this.icon="wallet"}render(){return(0,o.dy)`
      <button>
        <wui-flex gap="m" alignItems="center" justifyContent="space-between">
          <wui-icon-box
            size="lg"
            iconcolor="accent-100"
            backgroundcolor="accent-100"
            icon=${this.icon}
            background="transparent"
          ></wui-icon-box>

          <wui-flex flexDirection="column" gap="3xs">
            <wui-text variant="paragraph-500" color="fg-100">${this.label}</wui-text>
            <wui-text variant="small-400" color="fg-200">${this.description}</wui-text>
          </wui-flex>

          <wui-icon size="md" color="fg-200" name="chevronRight"></wui-icon>
        </wui-flex>
      </button>
    `}};et.styles=[w.ET,w.ZM,Q],ee([(0,r.Cb)()],et.prototype,"label",void 0),ee([(0,r.Cb)()],et.prototype,"description",void 0),ee([(0,r.Cb)()],et.prototype,"icon",void 0),et=ee([(0,b.M)("wui-notice-card")],et),i(34595);var ei=i(57772),eo=i(55998),er=function(e,t,i,o){var r,a=arguments.length,n=a<3?t:null===o?o=Object.getOwnPropertyDescriptor(t,i):o;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)n=Reflect.decorate(e,t,i,o);else for(var s=e.length-1;s>=0;s--)(r=e[s])&&(n=(a<3?r(n):a>3?r(t,i,n):r(t,i))||n);return a>3&&n&&Object.defineProperty(t,i,n),n};let ea=class extends o.oi{constructor(){super(),this.unsubscribe=[],this.socialProvider=eo.M.getConnectedSocialProvider(),this.socialUsername=eo.M.getConnectedSocialUsername(),this.namespace=n.R.state.activeChain,this.unsubscribe.push(n.R.subscribeKey("activeChain",e=>{this.namespace=e}))}disconnectedCallback(){this.unsubscribe.forEach(e=>e())}render(){let e=F.ConnectorController.getConnectorId(this.namespace),t=F.ConnectorController.getAuthConnector();if(!t||e!==K.b.CONNECTOR_ID.AUTH)return this.style.cssText="display: none",null;let i=t.provider.getEmail()??"";return i||this.socialUsername?(0,o.dy)`
      <wui-list-item
        variant="icon"
        iconVariant="overlay"
        icon=${this.socialProvider??"mail"}
        iconSize=${this.socialProvider?"xxl":"sm"}
        data-testid="w3m-account-email-update"
        ?chevron=${!this.socialProvider}
        @click=${()=>{this.onGoToUpdateEmail(i,this.socialProvider)}}
      >
        <wui-text variant="paragraph-500" color="fg-100">${this.getAuthName(i)}</wui-text>
      </wui-list-item>
    `:(this.style.cssText="display: none",null)}onGoToUpdateEmail(e,t){t||Y.RouterController.push("UpdateEmailWallet",{email:e,redirectView:"Account"})}getAuthName(e){return this.socialUsername?"discord"===this.socialProvider&&this.socialUsername.endsWith("0")?this.socialUsername.slice(0,-1):this.socialUsername:e.length>30?`${e.slice(0,-3)}...`:e}};er([(0,r.SB)()],ea.prototype,"namespace",void 0),ea=er([(0,h.Mo)("w3m-account-auth-button")],ea);var en=function(e,t,i,o){var r,a=arguments.length,n=a<3?t:null===o?o=Object.getOwnPropertyDescriptor(t,i):o;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)n=Reflect.decorate(e,t,i,o);else for(var s=e.length-1;s>=0;s--)(r=e[s])&&(n=(a<3?r(n):a>3?r(t,i,n):r(t,i))||n);return a>3&&n&&Object.defineProperty(t,i,n),n};let es=class extends o.oi{constructor(){super(),this.usubscribe=[],this.networkImages=c.W.state.networkImages,this.address=d.AccountController.state.address,this.profileImage=d.AccountController.state.profileImage,this.profileName=d.AccountController.state.profileName,this.network=n.R.state.activeCaipNetwork,this.preferredAccountTypes=d.AccountController.state.preferredAccountTypes,this.disconnecting=!1,this.loading=!1,this.switched=!1,this.text="",this.usubscribe.push(d.AccountController.subscribe(e=>{e.address&&(this.address=e.address,this.profileImage=e.profileImage,this.profileName=e.profileName,this.preferredAccountTypes=e.preferredAccountTypes)}),d.AccountController.subscribeKey("preferredAccountTypes",e=>this.preferredAccountTypes=e),n.R.subscribeKey("activeCaipNetwork",e=>{e?.id&&(this.network=e)}))}disconnectedCallback(){this.usubscribe.forEach(e=>e())}render(){if(!this.address)throw Error("w3m-account-settings-view: No account provided");let e=this.networkImages[this.network?.assets?.imageId??""];return(0,o.dy)`
      <wui-flex
        flexDirection="column"
        alignItems="center"
        gap="l"
        .padding=${["0","xl","m","xl"]}
      >
        <wui-avatar
          alt=${this.address}
          address=${this.address}
          imageSrc=${(0,a.o)(this.profileImage)}
          size="2lg"
        ></wui-avatar>
        <wui-flex flexDirection="column" alignItems="center">
          <wui-flex gap="3xs" alignItems="center" justifyContent="center">
            <wui-text variant="title-6-600" color="fg-100" data-testid="account-settings-address">
              ${h.Hg.getTruncateString({string:this.address,charsStart:4,charsEnd:6,truncate:"middle"})}
            </wui-text>
            <wui-icon-link
              size="md"
              icon="copy"
              iconColor="fg-200"
              @click=${this.onCopyAddress}
            ></wui-icon-link>
          </wui-flex>
        </wui-flex>
      </wui-flex>
      <wui-flex flexDirection="column" gap="m">
        <wui-flex flexDirection="column" gap="xs" .padding=${["0","l","m","l"]}>
          ${this.authCardTemplate()}
          <w3m-account-auth-button></w3m-account-auth-button>
          <wui-list-item
            .variant=${e?"image":"icon"}
            iconVariant="overlay"
            icon="networkPlaceholder"
            imageSrc=${(0,a.o)(e)}
            ?chevron=${this.isAllowedNetworkSwitch()}
            @click=${this.onNetworks.bind(this)}
            data-testid="account-switch-network-button"
          >
            <wui-text variant="paragraph-500" color="fg-100">
              ${this.network?.name??"Unknown"}
            </wui-text>
          </wui-list-item>
          ${this.togglePreferredAccountBtnTemplate()} ${this.chooseNameButtonTemplate()}
          <wui-list-item
            variant="icon"
            iconVariant="overlay"
            icon="disconnect"
            ?chevron=${!1}
            .loading=${this.disconnecting}
            @click=${this.onDisconnect.bind(this)}
            data-testid="disconnect-button"
          >
            <wui-text variant="paragraph-500" color="fg-200">Disconnect</wui-text>
          </wui-list-item>
        </wui-flex>
      </wui-flex>
    `}chooseNameButtonTemplate(){let e=this.network?.chainNamespace,t=F.ConnectorController.getConnectorId(e),i=F.ConnectorController.getAuthConnector();return n.R.checkIfNamesSupported()&&i&&t===K.b.CONNECTOR_ID.AUTH&&!this.profileName?(0,o.dy)`
      <wui-list-item
        variant="icon"
        iconVariant="overlay"
        icon="id"
        iconSize="sm"
        ?chevron=${!0}
        @click=${this.onChooseName.bind(this)}
        data-testid="account-choose-name-button"
      >
        <wui-text variant="paragraph-500" color="fg-100">Choose account name </wui-text>
      </wui-list-item>
    `:null}authCardTemplate(){let e=this.network?.chainNamespace,t=F.ConnectorController.getConnectorId(e),i=F.ConnectorController.getAuthConnector(),{origin:r}=location;return!i||t!==K.b.CONNECTOR_ID.AUTH||r.includes(G.bq.SECURE_SITE)?null:(0,o.dy)`
      <wui-notice-card
        @click=${this.onGoToUpgradeView.bind(this)}
        label="Upgrade your wallet"
        description="Transition to a self-custodial wallet"
        icon="wallet"
        data-testid="w3m-wallet-upgrade-card"
      ></wui-notice-card>
    `}isAllowedNetworkSwitch(){let e=n.R.getAllRequestedCaipNetworks(),t=!!e&&e.length>1,i=e?.find(({id:e})=>e===this.network?.id);return t||!i}onCopyAddress(){try{this.address&&(u.j.copyToClopboard(this.address),X.SnackController.showSuccess("Address copied"))}catch{X.SnackController.showError("Failed to copy")}}togglePreferredAccountBtnTemplate(){let e=this.network?.chainNamespace,t=n.R.checkIfSmartAccountEnabled(),i=F.ConnectorController.getConnectorId(e);return F.ConnectorController.getAuthConnector()&&i===K.b.CONNECTOR_ID.AUTH&&t?(this.switched||(this.text=this.preferredAccountTypes?.[e]===ei.y_.ACCOUNT_TYPES.SMART_ACCOUNT?"Switch to your EOA":"Switch to your smart account"),(0,o.dy)`
      <wui-list-item
        variant="icon"
        iconVariant="overlay"
        icon="swapHorizontalBold"
        iconSize="sm"
        ?chevron=${!0}
        ?loading=${this.loading}
        @click=${this.changePreferredAccountType.bind(this)}
        data-testid="account-toggle-preferred-account-type"
      >
        <wui-text variant="paragraph-500" color="fg-100">${this.text}</wui-text>
      </wui-list-item>
    `):null}onChooseName(){Y.RouterController.push("ChooseAccountName")}async changePreferredAccountType(){let e=this.network?.chainNamespace,t=n.R.checkIfSmartAccountEnabled(),i=this.preferredAccountTypes?.[e]!==ei.y_.ACCOUNT_TYPES.SMART_ACCOUNT&&t?ei.y_.ACCOUNT_TYPES.SMART_ACCOUNT:ei.y_.ACCOUNT_TYPES.EOA;F.ConnectorController.getAuthConnector()&&(this.loading=!0,await Z.ConnectionController.setPreferredAccountType(i,e),this.text=i===ei.y_.ACCOUNT_TYPES.SMART_ACCOUNT?"Switch to your EOA":"Switch to your smart account",this.switched=!0,J.S.resetSend(),this.loading=!1,this.requestUpdate())}onNetworks(){this.isAllowedNetworkSwitch()&&Y.RouterController.push("Networks")}async onDisconnect(){try{this.disconnecting=!0,await Z.ConnectionController.disconnect(),p.I.close()}catch{D.X.sendEvent({type:"track",event:"DISCONNECT_ERROR"}),X.SnackController.showError("Failed to disconnect")}finally{this.disconnecting=!1}}onGoToUpgradeView(){D.X.sendEvent({type:"track",event:"EMAIL_UPGRADE_FROM_MODAL"}),Y.RouterController.push("UpgradeEmailWallet")}};en([(0,r.SB)()],es.prototype,"address",void 0),en([(0,r.SB)()],es.prototype,"profileImage",void 0),en([(0,r.SB)()],es.prototype,"profileName",void 0),en([(0,r.SB)()],es.prototype,"network",void 0),en([(0,r.SB)()],es.prototype,"preferredAccountTypes",void 0),en([(0,r.SB)()],es.prototype,"disconnecting",void 0),en([(0,r.SB)()],es.prototype,"loading",void 0),en([(0,r.SB)()],es.prototype,"switched",void 0),en([(0,r.SB)()],es.prototype,"text",void 0),es=en([(0,h.Mo)("w3m-account-settings-view")],es),i(11908),i(73356);var el=(0,o.iv)`
  button {
    background-color: var(--wui-color-gray-glass-002);
    border-radius: var(--wui-border-radius-3xl);
    border: 1px solid var(--wui-color-gray-glass-002);
    padding: var(--wui-spacing-xs) var(--wui-spacing-s) var(--wui-spacing-xs) var(--wui-spacing-xs);
    position: relative;
  }

  wui-avatar {
    width: 32px;
    height: 32px;
    box-shadow: 0 0 0 0;
    outline: 3px solid var(--wui-color-gray-glass-005);
  }

  wui-icon-box,
  wui-image {
    width: 16px;
    height: 16px;
    border-radius: var(--wui-border-radius-3xl);
    position: absolute;
    left: 26px;
    top: 24px;
  }

  wui-image {
    outline: 2px solid var(--wui-color-bg-125);
  }

  wui-icon-box {
    outline: 2px solid var(--wui-color-bg-200);
    background-color: var(--wui-color-bg-250);
  }
`,ec=function(e,t,i,o){var r,a=arguments.length,n=a<3?t:null===o?o=Object.getOwnPropertyDescriptor(t,i):o;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)n=Reflect.decorate(e,t,i,o);else for(var s=e.length-1;s>=0;s--)(r=e[s])&&(n=(a<3?r(n):a>3?r(t,i,n):r(t,i))||n);return a>3&&n&&Object.defineProperty(t,i,n),n};let ed=class extends o.oi{constructor(){super(...arguments),this.avatarSrc=void 0,this.profileName="",this.address="",this.icon="mail"}render(){let e=n.R.state.activeChain,t=F.ConnectorController.getConnectorId(e)===K.b.CONNECTOR_ID.AUTH;return(0,o.dy)`<button data-testid="wui-profile-button" @click=${this.handleClick}>
      <wui-flex gap="xs" alignItems="center">
        <wui-avatar
          .imageSrc=${this.avatarSrc}
          alt=${this.address}
          address=${this.address}
        ></wui-avatar>
        ${t?this.getIconTemplate(this.icon):""}
        <wui-flex gap="xs" alignItems="center">
          <wui-text variant="large-600" color="fg-100">
            ${g.H.getTruncateString({string:this.profileName||this.address,charsStart:this.profileName?18:4,charsEnd:this.profileName?0:4,truncate:this.profileName?"end":"middle"})}
          </wui-text>
          <wui-icon size="sm" color="fg-200" name="copy" id="copy-address"></wui-icon>
        </wui-flex>
      </wui-flex>
    </button>`}handleClick(e){if(e.target instanceof HTMLElement&&"copy-address"===e.target.id){this.onCopyClick?.(e);return}this.onProfileClick?.(e)}getIconTemplate(e){return(0,o.dy)`
      <wui-icon-box
        size="xxs"
        iconColor="fg-200"
        backgroundColor="bg-100"
        icon="${e||"networkPlaceholder"}"
      ></wui-icon-box>
    `}};ed.styles=[w.ET,w.ZM,el],ec([(0,r.Cb)()],ed.prototype,"avatarSrc",void 0),ec([(0,r.Cb)()],ed.prototype,"profileName",void 0),ec([(0,r.Cb)()],ed.prototype,"address",void 0),ec([(0,r.Cb)()],ed.prototype,"icon",void 0),ec([(0,r.Cb)()],ed.prototype,"onProfileClick",void 0),ec([(0,r.Cb)()],ed.prototype,"onCopyClick",void 0),ed=ec([(0,b.M)("wui-profile-button-v2")],ed);var eu=(0,o.iv)`
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
`,ep=function(e,t,i,o){var r,a=arguments.length,n=a<3?t:null===o?o=Object.getOwnPropertyDescriptor(t,i):o;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)n=Reflect.decorate(e,t,i,o);else for(var s=e.length-1;s>=0;s--)(r=e[s])&&(n=(a<3?r(n):a>3?r(t,i,n):r(t,i))||n);return a>3&&n&&Object.defineProperty(t,i,n),n};let eh=class extends o.oi{constructor(){super(...arguments),this.tabs=[],this.onTabChange=()=>null,this.buttons=[],this.disabled=!1,this.localTabWidth="100px",this.activeTab=0,this.isDense=!1}render(){return this.isDense=this.tabs.length>3,this.style.cssText=`
      --local-tab: ${this.activeTab};
      --local-tab-width: ${this.localTabWidth};
    `,this.dataset.type=this.isDense?"flex":"block",this.tabs.map((e,t)=>{let i=t===this.activeTab;return(0,o.dy)`
        <button
          ?disabled=${this.disabled}
          @click=${()=>this.onTabClick(t)}
          data-active=${i}
          data-testid="tab-${e.label?.toLowerCase()}"
        >
          ${this.iconTemplate(e)}
          <wui-text variant="small-600" color="inherit"> ${e.label} </wui-text>
        </button>
      `})}firstUpdated(){this.shadowRoot&&this.isDense&&(this.buttons=[...this.shadowRoot.querySelectorAll("button")],setTimeout(()=>{this.animateTabs(0,!0)},0))}iconTemplate(e){return e.icon?(0,o.dy)`<wui-icon size="xs" color="inherit" name=${e.icon}></wui-icon>`:null}onTabClick(e){this.buttons&&this.animateTabs(e,!1),this.activeTab=e,this.onTabChange(e)}animateTabs(e,t){let i=this.buttons[this.activeTab],o=this.buttons[e],r=i?.querySelector("wui-text"),a=o?.querySelector("wui-text"),n=o?.getBoundingClientRect(),s=a?.getBoundingClientRect();i&&r&&!t&&e!==this.activeTab&&(r.animate([{opacity:0}],{duration:50,easing:"ease",fill:"forwards"}),i.animate([{width:"34px"}],{duration:500,easing:"ease",fill:"forwards"})),o&&n&&s&&a&&(e!==this.activeTab||t)&&(this.localTabWidth=`${Math.round(n.width+s.width)+6}px`,o.animate([{width:`${n.width+s.width}px`}],{duration:t?0:500,fill:"forwards",easing:"ease"}),a.animate([{opacity:1}],{duration:t?0:125,delay:t?0:200,fill:"forwards",easing:"ease"}))}};eh.styles=[w.ET,w.ZM,eu],ep([(0,r.Cb)({type:Array})],eh.prototype,"tabs",void 0),ep([(0,r.Cb)()],eh.prototype,"onTabChange",void 0),ep([(0,r.Cb)({type:Array})],eh.prototype,"buttons",void 0),ep([(0,r.Cb)({type:Boolean})],eh.prototype,"disabled",void 0),ep([(0,r.Cb)()],eh.prototype,"localTabWidth",void 0),ep([(0,r.SB)()],eh.prototype,"activeTab",void 0),ep([(0,r.SB)()],eh.prototype,"isDense",void 0),eh=ep([(0,b.M)("wui-tabs")],eh),i(84026);var ew=(0,o.iv)`
  wui-flex {
    width: 100%;
  }

  :host > wui-flex:first-child {
    transform: translateY(calc(var(--wui-spacing-xxs) * -1));
  }

  wui-icon-link {
    margin-right: calc(var(--wui-icon-box-size-md) * -1);
  }

  wui-notice-card {
    margin-bottom: var(--wui-spacing-3xs);
  }

  wui-list-item > wui-text {
    flex: 1;
  }

  w3m-transactions-view {
    max-height: 200px;
  }

  .tab-content-container {
    height: 300px;
    overflow-y: auto;
    overflow-x: hidden;
    scrollbar-width: none;
  }

  .tab-content-container::-webkit-scrollbar {
    display: none;
  }

  .account-button {
    width: auto;
    border: none;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: var(--wui-spacing-s);
    height: 48px;
    padding: var(--wui-spacing-xs);
    padding-right: var(--wui-spacing-s);
    box-shadow: inset 0 0 0 1px var(--wui-color-gray-glass-002);
    background-color: var(--wui-color-gray-glass-002);
    border-radius: 24px;
    transition: background-color 0.2s linear;
  }

  .account-button:hover {
    background-color: var(--wui-color-gray-glass-005);
  }

  .avatar-container {
    position: relative;
  }

  wui-avatar.avatar {
    width: 32px;
    height: 32px;
    box-shadow: 0 0 0 2px var(--wui-color-gray-glass-005);
  }

  wui-avatar.network-avatar {
    width: 16px;
    height: 16px;
    position: absolute;
    left: 100%;
    top: 100%;
    transform: translate(-75%, -75%);
    box-shadow: 0 0 0 2px var(--wui-color-gray-glass-005);
  }

  .account-links {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  .account-links wui-flex {
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    flex: 1;
    background: red;
    align-items: center;
    justify-content: center;
    height: 48px;
    padding: 10px;
    flex: 1 0 0;
    border-radius: var(--XS, 16px);
    border: 1px solid var(--dark-accent-glass-010, rgba(71, 161, 255, 0.1));
    background: var(--dark-accent-glass-010, rgba(71, 161, 255, 0.1));
    transition:
      background-color var(--wui-ease-out-power-1) var(--wui-duration-md),
      opacity var(--wui-ease-out-power-1) var(--wui-duration-md);
    will-change: background-color, opacity;
  }

  .account-links wui-flex:hover {
    background: var(--dark-accent-glass-015, rgba(71, 161, 255, 0.15));
  }

  .account-links wui-flex wui-icon {
    width: var(--S, 20px);
    height: var(--S, 20px);
  }

  .account-links wui-flex wui-icon svg path {
    stroke: #667dff;
  }
`,eg=function(e,t,i,o){var r,a=arguments.length,n=a<3?t:null===o?o=Object.getOwnPropertyDescriptor(t,i):o;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)n=Reflect.decorate(e,t,i,o);else for(var s=e.length-1;s>=0;s--)(r=e[s])&&(n=(a<3?r(n):a>3?r(t,i,n):r(t,i))||n);return a>3&&n&&Object.defineProperty(t,i,n),n};let eb=class extends o.oi{constructor(){super(),this.unsubscribe=[],this.caipAddress=d.AccountController.state.caipAddress,this.address=u.j.getPlainAddress(d.AccountController.state.caipAddress),this.allAccounts=d.AccountController.state.allAccounts,this.profileImage=d.AccountController.state.profileImage,this.profileName=d.AccountController.state.profileName,this.disconnecting=!1,this.balance=d.AccountController.state.balance,this.balanceSymbol=d.AccountController.state.balanceSymbol,this.features=l.OptionsController.state.features,this.namespace=n.R.state.activeChain,this.chainId=n.R.state.activeCaipNetwork?.id,this.unsubscribe.push(d.AccountController.subscribeKey("caipAddress",e=>{this.address=u.j.getPlainAddress(e),this.caipAddress=e}),d.AccountController.subscribeKey("balance",e=>this.balance=e),d.AccountController.subscribeKey("balanceSymbol",e=>this.balanceSymbol=e),d.AccountController.subscribeKey("profileName",e=>this.profileName=e),d.AccountController.subscribeKey("profileImage",e=>this.profileImage=e),l.OptionsController.subscribeKey("features",e=>this.features=e),d.AccountController.subscribeKey("allAccounts",e=>{this.allAccounts=e}),n.R.subscribeKey("activeChain",e=>this.namespace=e),n.R.subscribeKey("activeCaipNetwork",e=>{if(e){let[t,i]=e?.caipNetworkId?.split(":")||[];t&&i&&(this.namespace=t,this.chainId=i)}}))}disconnectedCallback(){this.unsubscribe.forEach(e=>e())}render(){if(!this.caipAddress)return null;let e=n.R.state.activeChain!==K.b.CHAIN.SOLANA&&this.allAccounts.length>1;return(0,o.dy)`<wui-flex
        flexDirection="column"
        .padding=${["0","xl","m","xl"]}
        alignItems="center"
        gap="l"
      >
        ${e?this.multiAccountTemplate():this.singleAccountTemplate()}
        <wui-flex flexDirection="column" alignItems="center">
          <wui-text variant="paragraph-500" color="fg-200">
            ${u.j.formatBalance(this.balance,this.balanceSymbol)}
          </wui-text>
        </wui-flex>
        ${this.explorerBtnTemplate()}
      </wui-flex>

      <wui-flex flexDirection="column" gap="xs" .padding=${["0","s","s","s"]}>
        ${this.authCardTemplate()} <w3m-account-auth-button></w3m-account-auth-button>
        ${this.orderedFeaturesTemplate()} ${this.activityTemplate()}
        <wui-list-item
          variant="icon"
          iconVariant="overlay"
          icon="disconnect"
          ?chevron=${!1}
          .loading=${this.disconnecting}
          @click=${this.onDisconnect.bind(this)}
          data-testid="disconnect-button"
        >
          <wui-text variant="paragraph-500" color="fg-200">Disconnect</wui-text>
        </wui-list-item>
      </wui-flex>`}onrampTemplate(){if(!this.namespace)return null;let e=this.features?.onramp,t=G.bq.ONRAMP_SUPPORTED_CHAIN_NAMESPACES.includes(this.namespace);return e&&t?(0,o.dy)`
      <wui-list-item
        data-testid="w3m-account-default-onramp-button"
        iconVariant="blue"
        icon="card"
        ?chevron=${!0}
        @click=${this.handleClickPay.bind(this)}
      >
        <wui-text variant="paragraph-500" color="fg-100">Buy crypto</wui-text>
      </wui-list-item>
    `:null}orderedFeaturesTemplate(){return(this.features?.walletFeaturesOrder||G.bq.DEFAULT_FEATURES.walletFeaturesOrder).map(e=>{switch(e){case"onramp":return this.onrampTemplate();case"swaps":return this.swapsTemplate();case"send":return this.sendTemplate();default:return null}})}activityTemplate(){return this.namespace&&this.features?.history&&G.bq.ACTIVITY_ENABLED_CHAIN_NAMESPACES.includes(this.namespace)?(0,o.dy)` <wui-list-item
          iconVariant="blue"
          icon="clock"
          iconSize="sm"
          ?chevron=${!0}
          @click=${this.onTransactions.bind(this)}
          data-testid="w3m-account-default-activity-button"
        >
          <wui-text variant="paragraph-500" color="fg-100">Activity</wui-text>
        </wui-list-item>`:null}swapsTemplate(){let e=this.features?.swaps,t=n.R.state.activeChain===K.b.CHAIN.EVM;return e&&t?(0,o.dy)`
      <wui-list-item
        iconVariant="blue"
        icon="recycleHorizontal"
        ?chevron=${!0}
        @click=${this.handleClickSwap.bind(this)}
        data-testid="w3m-account-default-swaps-button"
      >
        <wui-text variant="paragraph-500" color="fg-100">Swap</wui-text>
      </wui-list-item>
    `:null}sendTemplate(){let e=this.features?.send,t=n.R.state.activeChain,i=G.bq.SEND_SUPPORTED_NAMESPACES.includes(t);return e&&i?(0,o.dy)`
      <wui-list-item
        iconVariant="blue"
        icon="send"
        ?chevron=${!0}
        @click=${this.handleClickSend.bind(this)}
        data-testid="w3m-account-default-send-button"
      >
        <wui-text variant="paragraph-500" color="fg-100">Send</wui-text>
      </wui-list-item>
    `:null}authCardTemplate(){let e=n.R.state.activeChain,t=F.ConnectorController.getConnectorId(e),i=F.ConnectorController.getAuthConnector(),{origin:r}=location;return!i||t!==K.b.CONNECTOR_ID.AUTH||r.includes(G.bq.SECURE_SITE)?null:(0,o.dy)`
      <wui-notice-card
        @click=${this.onGoToUpgradeView.bind(this)}
        label="Upgrade your wallet"
        description="Transition to a self-custodial wallet"
        icon="wallet"
        data-testid="w3m-wallet-upgrade-card"
      ></wui-notice-card>
    `}handleSwitchAccountsView(){Y.RouterController.push("SwitchAddress")}handleClickPay(){Y.RouterController.push("OnRampProviders")}handleClickSwap(){Y.RouterController.push("Swap")}handleClickSend(){Y.RouterController.push("WalletSend")}explorerBtnTemplate(){return d.AccountController.state.addressExplorerUrl?(0,o.dy)`
      <wui-button size="md" variant="neutral" @click=${this.onExplorer.bind(this)}>
        <wui-icon size="sm" color="inherit" slot="iconLeft" name="compass"></wui-icon>
        Block Explorer
        <wui-icon size="sm" color="inherit" slot="iconRight" name="externalLink"></wui-icon>
      </wui-button>
    `:null}singleAccountTemplate(){return(0,o.dy)`
      <wui-avatar
        alt=${(0,a.o)(this.caipAddress)}
        address=${(0,a.o)(u.j.getPlainAddress(this.caipAddress))}
        imageSrc=${(0,a.o)(null===this.profileImage?void 0:this.profileImage)}
        data-testid="single-account-avatar"
      ></wui-avatar>
      <wui-flex flexDirection="column" alignItems="center">
        <wui-flex gap="3xs" alignItems="center" justifyContent="center">
          <wui-text variant="large-600" color="fg-100">
            ${this.profileName?h.Hg.getTruncateString({string:this.profileName,charsStart:20,charsEnd:0,truncate:"end"}):h.Hg.getTruncateString({string:this.address||"",charsStart:4,charsEnd:4,truncate:"middle"})}
          </wui-text>
          <wui-icon-link
            size="md"
            icon="copy"
            iconColor="fg-200"
            @click=${this.onCopyAddress}
          ></wui-icon-link> </wui-flex
      ></wui-flex>
    `}multiAccountTemplate(){if(!this.address)throw Error("w3m-account-view: No account provided");let e=this.allAccounts.find(e=>e.address===this.address),t=d.AccountController.state.addressLabels.get(this.address);return"bip122"===this.namespace?this.btcAccountsTemplate():(0,o.dy)`
      <wui-profile-button-v2
        .onProfileClick=${this.handleSwitchAccountsView.bind(this)}
        address=${(0,a.o)(this.address)}
        icon="${e?.type===ei.y_.ACCOUNT_TYPES.SMART_ACCOUNT&&n.R.state.activeChain===K.b.CHAIN.EVM?"lightbulb":"mail"}"
        avatarSrc=${(0,a.o)(this.profileImage?this.profileImage:void 0)}
        profileName=${(0,a.o)(t||this.profileName)}
        .onCopyClick=${this.onCopyAddress.bind(this)}
      ></wui-profile-button-v2>
    `}btcAccountsTemplate(){return(0,o.dy)`<wui-flex gap="m" alignItems="center" flexDirection="column">
      <wui-avatar
        .imageSrc=${(0,a.o)(this.profileImage?this.profileImage:void 0)}
        alt=${this.address}
        address=${this.address}
      ></wui-avatar>
      <wui-tabs
        .tabs=${[{label:"Payment"},{label:"Ordinals"}]}
        .onTabChange=${e=>d.AccountController.setCaipAddress(`bip122:${this.chainId}:${this.allAccounts[e]?.address||""}`,this.namespace)}
      ></wui-tabs>
      <wui-flex gap="xs" alignItems="center" justifyContent="center">
        <wui-text variant="large-600" color="fg-100">
          ${h.Hg.getTruncateString({string:this.profileName||this.address||"",charsStart:this.profileName?18:4,charsEnd:this.profileName?0:4,truncate:this.profileName?"end":"middle"})}
        </wui-text>
        <wui-icon-link
          size="md"
          icon="copy"
          iconColor="fg-200"
          @click=${this.onCopyAddress}
        ></wui-icon-link>
      </wui-flex>
    </wui-flex>`}onCopyAddress(){try{this.address&&(u.j.copyToClopboard(this.address),X.SnackController.showSuccess("Address copied"))}catch{X.SnackController.showError("Failed to copy")}}onTransactions(){let e=n.R.state.activeChain;D.X.sendEvent({type:"track",event:"CLICK_TRANSACTIONS",properties:{isSmartAccount:d.AccountController.state.preferredAccountTypes?.[e]===ei.y_.ACCOUNT_TYPES.SMART_ACCOUNT}}),Y.RouterController.push("Transactions")}async onDisconnect(){try{this.disconnecting=!0,await Z.ConnectionController.disconnect(),p.I.close()}catch{D.X.sendEvent({type:"track",event:"DISCONNECT_ERROR"}),X.SnackController.showError("Failed to disconnect")}finally{this.disconnecting=!1}}onExplorer(){let e=d.AccountController.state.addressExplorerUrl;e&&u.j.openHref(e,"_blank")}onGoToUpgradeView(){D.X.sendEvent({type:"track",event:"EMAIL_UPGRADE_FROM_MODAL"}),Y.RouterController.push("UpgradeEmailWallet")}};eb.styles=ew,eg([(0,r.SB)()],eb.prototype,"caipAddress",void 0),eg([(0,r.SB)()],eb.prototype,"address",void 0),eg([(0,r.SB)()],eb.prototype,"allAccounts",void 0),eg([(0,r.SB)()],eb.prototype,"profileImage",void 0),eg([(0,r.SB)()],eb.prototype,"profileName",void 0),eg([(0,r.SB)()],eb.prototype,"disconnecting",void 0),eg([(0,r.SB)()],eb.prototype,"balance",void 0),eg([(0,r.SB)()],eb.prototype,"balanceSymbol",void 0),eg([(0,r.SB)()],eb.prototype,"features",void 0),eg([(0,r.SB)()],eb.prototype,"namespace",void 0),eg([(0,r.SB)()],eb.prototype,"chainId",void 0),eb=eg([(0,h.Mo)("w3m-account-default-widget")],eb);var ef=(0,o.iv)`
  span {
    font-weight: 500;
    font-size: 40px;
    color: var(--wui-color-fg-100);
    line-height: 130%; /* 52px */
    letter-spacing: -1.6px;
    text-align: center;
  }

  .pennies {
    color: var(--wui-color-fg-200);
  }
`,em=function(e,t,i,o){var r,a=arguments.length,n=a<3?t:null===o?o=Object.getOwnPropertyDescriptor(t,i):o;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)n=Reflect.decorate(e,t,i,o);else for(var s=e.length-1;s>=0;s--)(r=e[s])&&(n=(a<3?r(n):a>3?r(t,i,n):r(t,i))||n);return a>3&&n&&Object.defineProperty(t,i,n),n};let ev=class extends o.oi{constructor(){super(...arguments),this.dollars="0",this.pennies="00"}render(){return(0,o.dy)`<span>$${this.dollars}<span class="pennies">.${this.pennies}</span></span>`}};ev.styles=[w.ET,ef],em([(0,r.Cb)()],ev.prototype,"dollars",void 0),em([(0,r.Cb)()],ev.prototype,"pennies",void 0),ev=em([(0,b.M)("wui-balance")],ev),i(21633);var ey=(0,o.iv)`
  button {
    background-color: var(--wui-color-gray-glass-002);
    border-radius: var(--wui-border-radius-3xl);
    border: 1px solid var(--wui-color-gray-glass-002);
    padding: var(--wui-spacing-xs) var(--wui-spacing-s) var(--wui-spacing-xs) var(--wui-spacing-xs);
    position: relative;
  }

  wui-avatar {
    width: 32px;
    height: 32px;
    box-shadow: 0 0 0 0;
    outline: 3px solid var(--wui-color-gray-glass-005);
  }

  wui-icon-box,
  wui-image {
    width: 16px;
    height: 16px;
    border-radius: var(--wui-border-radius-3xl);
    position: absolute;
    left: 26px;
    top: 24px;
  }

  wui-image {
    outline: 2px solid var(--wui-color-bg-125);
  }

  wui-icon-box {
    outline: 2px solid var(--wui-color-bg-200);
    background-color: var(--wui-color-bg-250);
  }
`,ex=function(e,t,i,o){var r,a=arguments.length,n=a<3?t:null===o?o=Object.getOwnPropertyDescriptor(t,i):o;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)n=Reflect.decorate(e,t,i,o);else for(var s=e.length-1;s>=0;s--)(r=e[s])&&(n=(a<3?r(n):a>3?r(t,i,n):r(t,i))||n);return a>3&&n&&Object.defineProperty(t,i,n),n};let eC=class extends o.oi{constructor(){super(...arguments),this.networkSrc=void 0,this.avatarSrc=void 0,this.profileName="",this.address="",this.icon="chevronBottom"}render(){return(0,o.dy)`<button data-testid="wui-profile-button">
      <wui-flex gap="xs" alignItems="center">
        <wui-avatar
          .imageSrc=${this.avatarSrc}
          alt=${this.address}
          address=${this.address}
        ></wui-avatar>
        ${this.networkImageTemplate()}
        <wui-flex gap="xs" alignItems="center">
          <wui-text variant="large-600" color="fg-100">
            ${g.H.getTruncateString({string:this.profileName||this.address,charsStart:this.profileName?18:4,charsEnd:this.profileName?0:4,truncate:this.profileName?"end":"middle"})}
          </wui-text>
          <wui-icon size="sm" color="fg-200" name=${this.icon}></wui-icon>
        </wui-flex>
      </wui-flex>
    </button>`}networkImageTemplate(){return this.networkSrc?(0,o.dy)`<wui-image src=${this.networkSrc}></wui-image>`:(0,o.dy)`
      <wui-icon-box
        size="xxs"
        iconColor="fg-200"
        backgroundColor="bg-100"
        icon="networkPlaceholder"
      ></wui-icon-box>
    `}};eC.styles=[w.ET,w.ZM,ey],ex([(0,r.Cb)()],eC.prototype,"networkSrc",void 0),ex([(0,r.Cb)()],eC.prototype,"avatarSrc",void 0),ex([(0,r.Cb)()],eC.prototype,"profileName",void 0),ex([(0,r.Cb)()],eC.prototype,"address",void 0),ex([(0,r.Cb)()],eC.prototype,"icon",void 0),eC=ex([(0,b.M)("wui-profile-button")],eC);var ek=(0,o.iv)`
  :host {
    display: block;
    padding: 9px var(--wui-spacing-s) 10px var(--wui-spacing-s);
    border-radius: var(--wui-border-radius-xxs);

    color: var(--wui-color-bg-100);
    position: relative;
  }

  :host([data-variant='shade']) {
    background-color: var(--wui-color-bg-150);
    border: 1px solid var(--wui-color-gray-glass-005);
  }

  :host([data-variant='shade']) > wui-text {
    color: var(--wui-color-fg-150);
  }

  :host([data-variant='fill']) {
    background-color: var(--wui-color-fg-100);
    border: none;
  }

  wui-icon {
    position: absolute;
    width: 12px !important;
    height: 4px !important;
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
`,e$=function(e,t,i,o){var r,a=arguments.length,n=a<3?t:null===o?o=Object.getOwnPropertyDescriptor(t,i):o;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)n=Reflect.decorate(e,t,i,o);else for(var s=e.length-1;s>=0;s--)(r=e[s])&&(n=(a<3?r(n):a>3?r(t,i,n):r(t,i))||n);return a>3&&n&&Object.defineProperty(t,i,n),n};let eS=class extends o.oi{constructor(){super(...arguments),this.placement="top",this.variant="fill",this.message=""}render(){return this.dataset.variant=this.variant,(0,o.dy)`<wui-icon
        data-placement=${this.placement}
        color="fg-100"
        size="inherit"
        name=${"fill"===this.variant?"cursor":"cursorTransparent"}
      ></wui-icon>
      <wui-text color="inherit" variant="small-500">${this.message}</wui-text>`}};eS.styles=[w.ET,w.ZM,ek],e$([(0,r.Cb)()],eS.prototype,"placement",void 0),e$([(0,r.Cb)()],eS.prototype,"variant",void 0),e$([(0,r.Cb)()],eS.prototype,"message",void 0),eS=e$([(0,b.M)("wui-tooltip")],eS);var eR=i(92421);let eT=e=>e&&e===K.b.CHAIN.EVM?eR.b.ACCOUNT_TABS:[];i(65984);var eA=(0,o.iv)`
  :host {
    width: 100%;
    max-height: 280px;
    overflow: scroll;
    scrollbar-width: none;
  }

  :host::-webkit-scrollbar {
    display: none;
  }
`;let eI=class extends o.oi{render(){return(0,o.dy)`<w3m-activity-list page="account"></w3m-activity-list>`}};eI.styles=eA,eI=function(e,t,i,o){var r,a=arguments.length,n=a<3?t:null===o?o=Object.getOwnPropertyDescriptor(t,i):o;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)n=Reflect.decorate(e,t,i,o);else for(var s=e.length-1;s>=0;s--)(r=e[s])&&(n=(a<3?r(n):a>3?r(t,i,n):r(t,i))||n);return a>3&&n&&Object.defineProperty(t,i,n),n}([(0,h.Mo)("w3m-account-activity-widget")],eI),i(76129),i(8524);var eO=(0,o.iv)`
  .contentContainer {
    height: 280px;
  }

  .contentContainer > wui-icon-box {
    width: 40px;
    height: 40px;
    border-radius: var(--wui-border-radius-xxs);
  }

  .contentContainer > .textContent {
    width: 65%;
  }
`;let eE=class extends o.oi{render(){return(0,o.dy)`${this.nftTemplate()}`}nftTemplate(){return(0,o.dy)` <wui-flex
      class="contentContainer"
      alignItems="center"
      justifyContent="center"
      flexDirection="column"
      gap="l"
    >
      <wui-icon-box
        icon="wallet"
        size="inherit"
        iconColor="fg-200"
        backgroundColor="fg-200"
        iconSize="lg"
      ></wui-icon-box>
      <wui-flex
        class="textContent"
        gap="xs"
        flexDirection="column"
        justifyContent="center"
        flexDirection="column"
      >
        <wui-text
          variant="paragraph-500"
          align="center"
          color="fg-100"
          data-testid="nft-template-title"
          >Coming soon</wui-text
        >
        <wui-text
          variant="small-400"
          align="center"
          color="fg-200"
          data-testid="nft-template-description"
          >Stay tuned for our upcoming NFT feature</wui-text
        >
      </wui-flex>
      <wui-link @click=${this.onReceiveClick.bind(this)} data-testid="link-receive-funds"
        >Receive funds</wui-link
      >
    </wui-flex>`}onReceiveClick(){Y.RouterController.push("WalletReceive")}};eE.styles=eO,eE=function(e,t,i,o){var r,a=arguments.length,n=a<3?t:null===o?o=Object.getOwnPropertyDescriptor(t,i):o;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)n=Reflect.decorate(e,t,i,o);else for(var s=e.length-1;s>=0;s--)(r=e[s])&&(n=(a<3?r(n):a>3?r(t,i,n):r(t,i))||n);return a>3&&n&&Object.defineProperty(t,i,n),n}([(0,h.Mo)("w3m-account-nfts-widget")],eE),i(24174);var ej=(0,o.iv)`
  button {
    width: 100%;
    display: flex;
    gap: var(--wui-spacing-s);
    align-items: center;
    justify-content: flex-start;
    padding: var(--wui-spacing-s) var(--wui-spacing-m) var(--wui-spacing-s) var(--wui-spacing-s);
    background-color: var(--wui-color-gray-glass-002);
    border-radius: var(--wui-border-radius-xs);
  }

  wui-icon-box {
    width: var(--wui-spacing-2xl);
    height: var(--wui-spacing-2xl);
  }

  wui-flex {
    width: auto;
  }
`,eN=function(e,t,i,o){var r,a=arguments.length,n=a<3?t:null===o?o=Object.getOwnPropertyDescriptor(t,i):o;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)n=Reflect.decorate(e,t,i,o);else for(var s=e.length-1;s>=0;s--)(r=e[s])&&(n=(a<3?r(n):a>3?r(t,i,n):r(t,i))||n);return a>3&&n&&Object.defineProperty(t,i,n),n};let eP=class extends o.oi{constructor(){super(...arguments),this.icon="card",this.text="",this.description="",this.tag=void 0,this.iconBackgroundColor="accent-100",this.iconColor="accent-100",this.disabled=!1}render(){return(0,o.dy)`
      <button ?disabled=${this.disabled}>
        <wui-icon-box
          iconColor=${this.iconColor}
          backgroundColor=${this.iconBackgroundColor}
          size="inherit"
          icon=${this.icon}
          iconSize="md"
        ></wui-icon-box>
        <wui-flex flexDirection="column" justifyContent="spaceBetween">
          ${this.titleTemplate()}
          <wui-text variant="small-400" color="fg-200"> ${this.description}</wui-text></wui-flex
        >
      </button>
    `}titleTemplate(){return this.tag?(0,o.dy)` <wui-flex alignItems="center" gap="xxs"
        ><wui-text variant="paragraph-500" color="fg-100">${this.text}</wui-text
        ><wui-tag tagType="main" size="md">${this.tag}</wui-tag>
      </wui-flex>`:(0,o.dy)`<wui-text variant="paragraph-500" color="fg-100">${this.text}</wui-text>`}};eP.styles=[w.ET,w.ZM,ej],eN([(0,r.Cb)()],eP.prototype,"icon",void 0),eN([(0,r.Cb)()],eP.prototype,"text",void 0),eN([(0,r.Cb)()],eP.prototype,"description",void 0),eN([(0,r.Cb)()],eP.prototype,"tag",void 0),eN([(0,r.Cb)()],eP.prototype,"iconBackgroundColor",void 0),eN([(0,r.Cb)()],eP.prototype,"iconColor",void 0),eN([(0,r.Cb)({type:Boolean})],eP.prototype,"disabled",void 0),eP=eN([(0,b.M)("wui-list-description")],eP),i(40680);var eB=(0,o.iv)`
  :host {
    width: 100%;
  }

  wui-flex {
    width: 100%;
  }

  .contentContainer {
    max-height: 280px;
    overflow: scroll;
    scrollbar-width: none;
  }

  .contentContainer::-webkit-scrollbar {
    display: none;
  }
`,eD=function(e,t,i,o){var r,a=arguments.length,n=a<3?t:null===o?o=Object.getOwnPropertyDescriptor(t,i):o;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)n=Reflect.decorate(e,t,i,o);else for(var s=e.length-1;s>=0;s--)(r=e[s])&&(n=(a<3?r(n):a>3?r(t,i,n):r(t,i))||n);return a>3&&n&&Object.defineProperty(t,i,n),n};let eM=class extends o.oi{constructor(){super(),this.unsubscribe=[],this.tokenBalance=d.AccountController.state.tokenBalance,this.unsubscribe.push(d.AccountController.subscribe(e=>{this.tokenBalance=e.tokenBalance}))}disconnectedCallback(){this.unsubscribe.forEach(e=>e())}render(){return(0,o.dy)`${this.tokenTemplate()}`}tokenTemplate(){return this.tokenBalance&&this.tokenBalance?.length>0?(0,o.dy)`<wui-flex class="contentContainer" flexDirection="column" gap="xs">
        ${this.tokenItemTemplate()}
      </wui-flex>`:(0,o.dy)` <wui-flex flexDirection="column" gap="xs"
      ><wui-list-description
        @click=${this.onBuyClick.bind(this)}
        text="Buy Crypto"
        description="Easy with card or bank account"
        icon="card"
        iconColor="success-100"
        iconBackgroundColor="success-100"
        tag="popular"
        data-testid="buy-crypto"
      ></wui-list-description
      ><wui-list-description
        @click=${this.onReceiveClick.bind(this)}
        text="Receive funds"
        description="Transfer tokens on your wallet"
        icon="arrowBottomCircle"
        iconColor="fg-200"
        iconBackgroundColor="fg-200"
        data-testid="receive-funds"
      ></wui-list-description
    ></wui-flex>`}tokenItemTemplate(){return this.tokenBalance?.map(e=>o.dy`<wui-list-token
          tokenName=${e.name}
          tokenImageUrl=${e.iconUrl}
          tokenAmount=${e.quantity.numeric}
          tokenValue=${e.value}
          tokenCurrency=${e.symbol}
        ></wui-list-token>`)}onReceiveClick(){Y.RouterController.push("WalletReceive")}onBuyClick(){let e=n.R.state.activeChain;D.X.sendEvent({type:"track",event:"SELECT_BUY_CRYPTO",properties:{isSmartAccount:d.AccountController.state.preferredAccountTypes?.[e]===ei.y_.ACCOUNT_TYPES.SMART_ACCOUNT}}),Y.RouterController.push("OnRampProviders")}};eM.styles=eB,eD([(0,r.SB)()],eM.prototype,"tokenBalance",void 0),eM=eD([(0,h.Mo)("w3m-account-tokens-widget")],eM),i(2024),i(76276);var eW=(0,o.iv)`
  wui-flex {
    width: 100%;
  }

  wui-promo {
    position: absolute;
    top: -32px;
  }

  wui-profile-button {
    margin-top: calc(-1 * var(--wui-spacing-2l));
  }

  wui-promo + wui-profile-button {
    margin-top: var(--wui-spacing-2l);
  }

  wui-tabs {
    width: 100%;
  }

  .contentContainer {
    height: 280px;
  }

  .contentContainer > wui-icon-box {
    width: 40px;
    height: 40px;
    border-radius: var(--wui-border-radius-xxs);
  }

  .contentContainer > .textContent {
    width: 65%;
  }
`,eL=function(e,t,i,o){var r,a=arguments.length,n=a<3?t:null===o?o=Object.getOwnPropertyDescriptor(t,i):o;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)n=Reflect.decorate(e,t,i,o);else for(var s=e.length-1;s>=0;s--)(r=e[s])&&(n=(a<3?r(n):a>3?r(t,i,n):r(t,i))||n);return a>3&&n&&Object.defineProperty(t,i,n),n};let ez=class extends o.oi{constructor(){super(),this.unsubscribe=[],this.address=d.AccountController.state.address,this.profileImage=d.AccountController.state.profileImage,this.profileName=d.AccountController.state.profileName,this.network=n.R.state.activeCaipNetwork,this.currentTab=d.AccountController.state.currentTab,this.tokenBalance=d.AccountController.state.tokenBalance,this.features=l.OptionsController.state.features,this.networkImage=s.f.getNetworkImage(this.network),this.unsubscribe.push(c.W.subscribeNetworkImages(()=>{this.networkImage=s.f.getNetworkImage(this.network)}),d.AccountController.subscribe(e=>{e.address?(this.address=e.address,this.profileImage=e.profileImage,this.profileName=e.profileName,this.currentTab=e.currentTab,this.tokenBalance=e.tokenBalance):p.I.close()}),n.R.subscribeKey("activeCaipNetwork",e=>this.network=e),l.OptionsController.subscribeKey("features",e=>this.features=e)),this.watchSwapValues()}disconnectedCallback(){this.unsubscribe.forEach(e=>e()),clearInterval(this.watchTokenBalance)}firstUpdated(){d.AccountController.fetchTokenBalance()}render(){if(!this.address)throw Error("w3m-account-view: No account provided");return(0,o.dy)`<wui-flex
      flexDirection="column"
      .padding=${["0","xl","m","xl"]}
      alignItems="center"
      gap="m"
      data-testid="w3m-account-wallet-features-widget"
    >
      <wui-profile-button
        @click=${this.onProfileButtonClick.bind(this)}
        address=${(0,a.o)(this.address)}
        networkSrc=${(0,a.o)(this.networkImage)}
        icon="chevronBottom"
        avatarSrc=${(0,a.o)(this.profileImage?this.profileImage:void 0)}
        profileName=${(0,a.o)(this.profileName??void 0)}
        data-testid="w3m-profile-button"
      ></wui-profile-button>

      ${this.tokenBalanceTemplate()} ${this.orderedWalletFeatures()} ${this.tabsTemplate()}
      ${this.listContentTemplate()}
    </wui-flex>`}orderedWalletFeatures(){let e=this.features?.walletFeaturesOrder||G.bq.DEFAULT_FEATURES.walletFeaturesOrder;return e.every(e=>!this.features?.[e])?null:(0,o.dy)`<wui-flex gap="s">
      ${e.map(e=>{switch(e){case"onramp":return this.onrampTemplate();case"swaps":return this.swapsTemplate();case"receive":return this.receiveTemplate();case"send":return this.sendTemplate();default:return null}})}
    </wui-flex>`}onrampTemplate(){return this.features?.onramp?(0,o.dy)`
      <w3m-tooltip-trigger text="Buy">
        <wui-icon-button
          data-testid="wallet-features-onramp-button"
          @click=${this.onBuyClick.bind(this)}
          icon="card"
        ></wui-icon-button>
      </w3m-tooltip-trigger>
    `:null}swapsTemplate(){let e=this.features?.swaps,t=n.R.state.activeChain===K.b.CHAIN.EVM;return e&&t?(0,o.dy)`
      <w3m-tooltip-trigger text="Swap">
        <wui-icon-button
          data-testid="wallet-features-swaps-button"
          @click=${this.onSwapClick.bind(this)}
          icon="recycleHorizontal"
        >
        </wui-icon-button>
      </w3m-tooltip-trigger>
    `:null}receiveTemplate(){return this.features?.receive?(0,o.dy)`
      <w3m-tooltip-trigger text="Receive">
        <wui-icon-button
          data-testid="wallet-features-receive-button"
          @click=${this.onReceiveClick.bind(this)}
          icon="arrowBottomCircle"
        >
        </wui-icon-button>
      </w3m-tooltip-trigger>
    `:null}sendTemplate(){let e=this.features?.send,t=n.R.state.activeChain,i=G.bq.SEND_SUPPORTED_NAMESPACES.includes(t);return e&&i?(0,o.dy)`
      <w3m-tooltip-trigger text="Send">
        <wui-icon-button
          data-testid="wallet-features-send-button"
          @click=${this.onSendClick.bind(this)}
          icon="send"
        ></wui-icon-button>
      </w3m-tooltip-trigger>
    `:null}watchSwapValues(){this.watchTokenBalance=setInterval(()=>d.AccountController.fetchTokenBalance(e=>this.onTokenBalanceError(e)),1e4)}onTokenBalanceError(e){e instanceof Error&&e.cause instanceof Response&&e.cause.status===K.b.HTTP_STATUS_CODES.SERVICE_UNAVAILABLE&&clearInterval(this.watchTokenBalance)}listContentTemplate(){return 0===this.currentTab?(0,o.dy)`<w3m-account-tokens-widget></w3m-account-tokens-widget>`:1===this.currentTab?(0,o.dy)`<w3m-account-nfts-widget></w3m-account-nfts-widget>`:2===this.currentTab?(0,o.dy)`<w3m-account-activity-widget></w3m-account-activity-widget>`:(0,o.dy)`<w3m-account-tokens-widget></w3m-account-tokens-widget>`}tokenBalanceTemplate(){if(this.tokenBalance&&this.tokenBalance?.length>=0){let e=u.j.calculateBalance(this.tokenBalance),{dollars:t="0",pennies:i="00"}=u.j.formatTokenBalance(e);return(0,o.dy)`<wui-balance dollars=${t} pennies=${i}></wui-balance>`}return(0,o.dy)`<wui-balance dollars="0" pennies="00"></wui-balance>`}tabsTemplate(){let e=eT(n.R.state.activeChain);return 0===e.length?null:(0,o.dy)`<wui-tabs
      .onTabChange=${this.onTabChange.bind(this)}
      .activeTab=${this.currentTab}
      localTabWidth=${u.j.isMobile()&&window.innerWidth<430?`${(window.innerWidth-48)/3}px`:"104px"}
      .tabs=${e}
    ></wui-tabs>`}onTabChange(e){d.AccountController.setCurrentTab(e)}onProfileButtonClick(){let{allAccounts:e}=d.AccountController.state;e.length>1?Y.RouterController.push("Profile"):Y.RouterController.push("AccountSettings")}onBuyClick(){Y.RouterController.push("OnRampProviders")}onSwapClick(){let e=n.R.state.activeChain;this.network?.caipNetworkId&&!G.bq.SWAP_SUPPORTED_NETWORKS.includes(this.network?.caipNetworkId)?Y.RouterController.push("UnsupportedChain",{swapUnsupportedChain:!0}):(D.X.sendEvent({type:"track",event:"OPEN_SWAP",properties:{network:this.network?.caipNetworkId||"",isSmartAccount:d.AccountController.state.preferredAccountTypes?.[e]===ei.y_.ACCOUNT_TYPES.SMART_ACCOUNT}}),Y.RouterController.push("Swap"))}onReceiveClick(){Y.RouterController.push("WalletReceive")}onSendClick(){let e=n.R.state.activeChain;D.X.sendEvent({type:"track",event:"OPEN_SEND",properties:{network:this.network?.caipNetworkId||"",isSmartAccount:d.AccountController.state.preferredAccountTypes?.[e]===ei.y_.ACCOUNT_TYPES.SMART_ACCOUNT}}),Y.RouterController.push("WalletSend")}};ez.styles=eW,eL([(0,r.SB)()],ez.prototype,"watchTokenBalance",void 0),eL([(0,r.SB)()],ez.prototype,"address",void 0),eL([(0,r.SB)()],ez.prototype,"profileImage",void 0),eL([(0,r.SB)()],ez.prototype,"profileName",void 0),eL([(0,r.SB)()],ez.prototype,"network",void 0),eL([(0,r.SB)()],ez.prototype,"currentTab",void 0),eL([(0,r.SB)()],ez.prototype,"tokenBalance",void 0),eL([(0,r.SB)()],ez.prototype,"features",void 0),eL([(0,r.SB)()],ez.prototype,"networkImage",void 0),ez=eL([(0,h.Mo)("w3m-account-wallet-features-widget")],ez);var eU=function(e,t,i,o){var r,a=arguments.length,n=a<3?t:null===o?o=Object.getOwnPropertyDescriptor(t,i):o;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)n=Reflect.decorate(e,t,i,o);else for(var s=e.length-1;s>=0;s--)(r=e[s])&&(n=(a<3?r(n):a>3?r(t,i,n):r(t,i))||n);return a>3&&n&&Object.defineProperty(t,i,n),n};let e_=class extends o.oi{constructor(){super(),this.unsubscribe=[],this.namespace=n.R.state.activeChain,this.unsubscribe.push(n.R.subscribeKey("activeChain",e=>{this.namespace=e}))}render(){if(!this.namespace)return null;let e=F.ConnectorController.getConnectorId(this.namespace),t=F.ConnectorController.getAuthConnector();return(0,o.dy)`
      ${t&&e===K.b.CONNECTOR_ID.AUTH?this.walletFeaturesTemplate():this.defaultTemplate()}
    `}walletFeaturesTemplate(){return(0,o.dy)`<w3m-account-wallet-features-widget></w3m-account-wallet-features-widget>`}defaultTemplate(){return(0,o.dy)`<w3m-account-default-widget></w3m-account-default-widget>`}};eU([(0,r.SB)()],e_.prototype,"namespace",void 0),e_=eU([(0,h.Mo)("w3m-account-view")],e_);var eV=i(91392),eH=(0,o.iv)`
  button {
    padding: 6.5px var(--wui-spacing-l) 6.5px var(--wui-spacing-xs);
    display: flex;
    justify-content: space-between;
    width: 100%;
    border-radius: var(--wui-border-radius-xs);
    background-color: var(--wui-color-gray-glass-002);
  }

  button[data-clickable='false'] {
    pointer-events: none;
    background-color: transparent;
  }

  wui-image {
    width: var(--wui-spacing-3xl);
    height: var(--wui-spacing-3xl);
    border-radius: var(--wui-border-radius-3xl);
  }

  wui-avatar {
    width: var(--wui-spacing-3xl);
    height: var(--wui-spacing-3xl);
    box-shadow: 0 0 0 0;
  }
  .address {
    color: var(--wui-color-fg-base-100);
  }
  .address-description {
    text-transform: capitalize;
    color: var(--wui-color-fg-base-200);
  }

  wui-icon-box {
    position: relative;
    right: 15px;
    top: 15px;
    border: 2px solid var(--wui-color-bg-150);
    background-color: var(--wui-color-bg-125);
  }
`,eq=function(e,t,i,o){var r,a=arguments.length,n=a<3?t:null===o?o=Object.getOwnPropertyDescriptor(t,i):o;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)n=Reflect.decorate(e,t,i,o);else for(var s=e.length-1;s>=0;s--)(r=e[s])&&(n=(a<3?r(n):a>3?r(t,i,n):r(t,i))||n);return a>3&&n&&Object.defineProperty(t,i,n),n};let eK=class extends o.oi{constructor(){super(...arguments),this.accountAddress="",this.accountType="",this.labels=d.AccountController.state.addressLabels,this.caipNetwork=n.R.state.activeCaipNetwork,this.socialProvider=eo.M.getConnectedSocialProvider(),this.balance=0,this.fetchingBalance=!0,this.shouldShowIcon=!1,this.selected=!1}connectedCallback(){super.connectedCallback(),eV.L.getBalance(this.accountAddress,this.caipNetwork?.caipNetworkId).then(e=>{let t=this.balance;e.balances.length>0&&(t=e.balances.reduce((e,t)=>e+(t?.value||0),0)),this.balance=t,this.fetchingBalance=!1,this.requestUpdate()}).catch(()=>{this.fetchingBalance=!1,this.requestUpdate()})}render(){let e=this.getLabel(),t=n.R.state.activeChain,i=F.ConnectorController.getConnectorId(t);return this.shouldShowIcon=i===K.b.CONNECTOR_ID.AUTH,(0,o.dy)`
      <wui-flex
        flexDirection="row"
        justifyContent="space-between"
        .padding=${["0","0","s","1xs"]}
      >
        <wui-flex gap="md" alignItems="center">
          <wui-avatar address=${this.accountAddress}></wui-avatar>
          ${this.shouldShowIcon?(0,o.dy)`<wui-icon-box
                size="sm"
                iconcolor="fg-200"
                backgroundcolor="fg-300"
                icon=${this.accountType===ei.y_.ACCOUNT_TYPES.EOA?this.socialProvider??"mail":"lightbulb"}
                background="fg-300"
              ></wui-icon-box>`:(0,o.dy)`<wui-flex .padding="${["0","0","0","s"]}"></wui-flex>`}
          <wui-flex flexDirection="column">
            <wui-text class="address" variant="paragraph-500" color="fg-100"
              >${g.H.getTruncateString({string:this.accountAddress,charsStart:4,charsEnd:6,truncate:"middle"})}</wui-text
            >
            <wui-text class="address-description" variant="small-400">${e}</wui-text></wui-flex
          >
        </wui-flex>
        <wui-flex gap="s" alignItems="center">
          <slot name="action"></slot>
          ${this.fetchingBalance?(0,o.dy)`<wui-loading-spinner size="sm" color="accent-100"></wui-loading-spinner>`:(0,o.dy)` <wui-text variant="small-400">$${this.balance.toFixed(2)}</wui-text>`}
        </wui-flex>
      </wui-flex>
    `}getLabel(){let e=this.labels?.get(this.accountAddress),t=n.R.state.activeChain,i=F.ConnectorController.getConnectorId(t);return e||i!==K.b.CONNECTOR_ID.AUTH?e||(e="EOA"):e=`${"eoa"===this.accountType?this.socialProvider??"Email":"Smart"} Account`,e}};eK.styles=[w.ET,w.ZM,eH],eq([(0,r.Cb)()],eK.prototype,"accountAddress",void 0),eq([(0,r.Cb)()],eK.prototype,"accountType",void 0),eq([(0,r.Cb)({type:Boolean})],eK.prototype,"selected",void 0),eq([(0,r.Cb)({type:Function})],eK.prototype,"onSelect",void 0),eK=eq([(0,b.M)("wui-list-account")],eK);var eF=(0,o.iv)`
  wui-flex {
    width: 100%;
  }

  wui-icon-link {
    margin-right: calc(var(--wui-icon-box-size-md) * -1);
  }

  .account-links {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  .account-links wui-flex {
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    flex: 1;
    background: red;
    align-items: center;
    justify-content: center;
    height: 48px;
    padding: 10px;
    flex: 1 0 0;

    border-radius: var(--XS, 16px);
    border: 1px solid var(--dark-accent-glass-010, rgba(71, 161, 255, 0.1));
    background: var(--dark-accent-glass-010, rgba(71, 161, 255, 0.1));
    transition: background-color var(--wui-ease-out-power-1) var(--wui-duration-md);
    will-change: background-color;
  }

  .account-links wui-flex:hover {
    background: var(--dark-accent-glass-015, rgba(71, 161, 255, 0.15));
  }

  .account-links wui-flex wui-icon {
    width: var(--S, 20px);
    height: var(--S, 20px);
  }

  .account-links wui-flex wui-icon svg path {
    stroke: #47a1ff;
  }

  .account-settings-button {
    padding: calc(var(--wui-spacing-m) - 1px) var(--wui-spacing-2l);
    height: 40px;
    border-radius: var(--wui-border-radius-xxs);
    border: 1px solid var(--wui-color-gray-glass-002);
    background: var(--wui-color-gray-glass-002);
    cursor: pointer;
  }

  .account-settings-button:hover {
    background: var(--wui-color-gray-glass-005);
  }
`,eG=function(e,t,i,o){var r,a=arguments.length,n=a<3?t:null===o?o=Object.getOwnPropertyDescriptor(t,i):o;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)n=Reflect.decorate(e,t,i,o);else for(var s=e.length-1;s>=0;s--)(r=e[s])&&(n=(a<3?r(n):a>3?r(t,i,n):r(t,i))||n);return a>3&&n&&Object.defineProperty(t,i,n),n};let eX=class extends o.oi{constructor(){super(),this.usubscribe=[],this.address=d.AccountController.state.address,this.profileImage=d.AccountController.state.profileImage,this.profileName=d.AccountController.state.profileName,this.accounts=d.AccountController.state.allAccounts,this.loading=!1,this.usubscribe.push(d.AccountController.subscribeKey("address",e=>{e?this.address=e:p.I.close()})),this.usubscribe.push(d.AccountController.subscribeKey("profileImage",e=>{this.profileImage=e})),this.usubscribe.push(d.AccountController.subscribeKey("profileName",e=>{this.profileName=e}))}disconnectedCallback(){this.usubscribe.forEach(e=>e())}render(){if(!this.address)throw Error("w3m-profile-view: No account provided");return(0,o.dy)`
      <wui-flex flexDirection="column" gap="l" .padding=${["0","xl","m","xl"]}>
        <wui-flex flexDirection="column" alignItems="center" gap="l">
          <wui-avatar
            alt=${this.address}
            address=${this.address}
            imageSrc=${(0,a.o)(this.profileImage)}
            size="2lg"
          ></wui-avatar>
          <wui-flex flexDirection="column" alignItems="center">
            <wui-flex gap="3xs" alignItems="center" justifyContent="center">
              <wui-text variant="title-6-600" color="fg-100" data-testid="account-settings-address">
                ${this.profileName?h.Hg.getTruncateString({string:this.profileName,charsStart:20,charsEnd:0,truncate:"end"}):h.Hg.getTruncateString({string:this.address,charsStart:4,charsEnd:6,truncate:"middle"})}
              </wui-text>
              <wui-icon-link
                size="md"
                icon="copy"
                iconColor="fg-200"
                @click=${this.onCopyAddress}
              ></wui-icon-link>
            </wui-flex>
          </wui-flex>
        </wui-flex>
        <wui-flex
          data-testid="account-settings-button"
          justifyContent="center"
          alignItems="center"
          class="account-settings-button"
          @click=${()=>Y.RouterController.push("AccountSettings")}
        >
          <wui-text variant="paragraph-500" color="fg-100">Account Settings</wui-text>
        </wui-flex>
        ${this.accountsTemplate()}
      </wui-flex>
    `}accountsTemplate(){return(0,o.dy)`<wui-flex flexDirection="column">
      <wui-flex .padding=${["3xs","m","s","s"]}>
        <wui-text color="fg-200" variant="paragraph-400">Your accounts</wui-text>
      </wui-flex>
      <wui-flex flexDirection="column" gap="xxs">
        ${this.accounts.map(e=>this.accountTemplate(e))}
      </wui-flex>
    </wui-flex>`}async onSwitchAccount(e){let t=n.R.state.activeCaipNetwork?.chainNamespace;if(this.loading=!0,F.ConnectorController.getAuthConnector()){let i=e.type;await Z.ConnectionController.setPreferredAccountType(i,t)}d.AccountController.setShouldUpdateToAddress(e.address,t),this.loading=!1}accountTemplate(e){return(0,o.dy)`<wui-list-account accountAddress=${e.address} accountType=${e.type}>
      ${e.address===this.address?"":(0,o.dy)`<wui-button
            slot="action"
            textVariant="small-600"
            size="md"
            variant="accent"
            @click=${()=>this.onSwitchAccount(e)}
            .loading=${this.loading}
            >Switch</wui-button
          >`}
    </wui-list-account>`}onCopyAddress(){try{this.address&&(u.j.copyToClopboard(this.address),X.SnackController.showSuccess("Address copied"))}catch{X.SnackController.showError("Failed to copy")}}};eX.styles=eF,eG([(0,r.SB)()],eX.prototype,"address",void 0),eG([(0,r.SB)()],eX.prototype,"profileImage",void 0),eG([(0,r.SB)()],eX.prototype,"profileName",void 0),eG([(0,r.SB)()],eX.prototype,"accounts",void 0),eG([(0,r.SB)()],eX.prototype,"loading",void 0),eX=eG([(0,h.Mo)("w3m-profile-view")],eX);var eY=(0,o.iv)`
  wui-flex {
    width: 100%;
    background-color: var(--wui-color-gray-glass-005);
    border-radius: var(--wui-border-radius-m);
    padding: var(--wui-spacing-1xs) var(--wui-spacing-s) var(--wui-spacing-1xs)
      var(--wui-spacing-1xs);
  }
`,eZ=function(e,t,i,o){var r,a=arguments.length,n=a<3?t:null===o?o=Object.getOwnPropertyDescriptor(t,i):o;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)n=Reflect.decorate(e,t,i,o);else for(var s=e.length-1;s>=0;s--)(r=e[s])&&(n=(a<3?r(n):a>3?r(t,i,n):r(t,i))||n);return a>3&&n&&Object.defineProperty(t,i,n),n};let eJ=class extends o.oi{constructor(){super(...arguments),this.imageSrc="",this.text="",this.size=""}render(){return(0,o.dy)`
      <wui-flex gap="1xs" alignItems="center">
        <wui-avatar size=${this.size} imageSrc=${this.imageSrc}></wui-avatar>
        <wui-text variant="small-400" color="fg-200">${this.text}</wui-text>
      </wui-flex>
    `}};eJ.styles=[w.ET,w.ZM,eY],eZ([(0,r.Cb)()],eJ.prototype,"imageSrc",void 0),eZ([(0,r.Cb)()],eJ.prototype,"text",void 0),eZ([(0,r.Cb)()],eJ.prototype,"size",void 0),eJ=eZ([(0,b.M)("wui-banner-img")],eJ);var eQ=(0,o.iv)`
  wui-avatar {
    width: var(--wui-spacing-3xl);
    height: var(--wui-spacing-3xl);
    box-shadow: 0 0 0 0;
  }

  wui-icon-box {
    position: relative;
    right: 15px;
    top: 15px;
    border: 2px solid var(--wui-color-bg-150);
    background-color: var(--wui-color-bg-125);
  }
`,e0=function(e,t,i,o){var r,a=arguments.length,n=a<3?t:null===o?o=Object.getOwnPropertyDescriptor(t,i):o;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)n=Reflect.decorate(e,t,i,o);else for(var s=e.length-1;s>=0;s--)(r=e[s])&&(n=(a<3?r(n):a>3?r(t,i,n):r(t,i))||n);return a>3&&n&&Object.defineProperty(t,i,n),n};let e3=class extends o.oi{constructor(){super(),this.metadata=l.OptionsController.state.metadata,this.allAccounts=d.AccountController.state.allAccounts||[],this.balances={},this.labels=d.AccountController.state.addressLabels,this.currentAddress=d.AccountController.state.address||"",this.caipNetwork=n.R.state.activeCaipNetwork,d.AccountController.subscribeKey("allAccounts",e=>{this.allAccounts=e})}connectedCallback(){super.connectedCallback(),this.allAccounts.forEach(e=>{eV.L.getBalance(e.address,this.caipNetwork?.caipNetworkId).then(t=>{let i=this.balances[e.address]||0;t.balances.length>0&&(i=t.balances.reduce((e,t)=>e+(t?.value||0),0)),this.balances[e.address]=i,this.requestUpdate()})})}getAddressIcon(e){return"smartAccount"===e?"lightbulb":"mail"}render(){return(0,o.dy)`
      <wui-flex justifyContent="center" .padding=${["xl","0","xl","0"]}>
        <wui-banner-img
          imageSrc=${(0,a.o)(this.metadata?.icons[0])}
          text=${(0,a.o)(this.metadata?.url)}
          size="sm"
        ></wui-banner-img>
      </wui-flex>
      <wui-flex flexDirection="column" gap="xxl" .padding=${["l","xl","xl","xl"]}>
        ${this.allAccounts.map((e,t)=>this.getAddressTemplate(e,t))}
      </wui-flex>
    `}getAddressTemplate(e,t){let i=this.labels?.get(e.address),r=n.R.state.activeChain,a=F.ConnectorController.getConnectorId(r)===K.b.CONNECTOR_ID.AUTH;return(0,o.dy)`
      <wui-flex
        flexDirection="row"
        justifyContent="space-between"
        data-testid="switch-address-item"
      >
        <wui-flex alignItems="center">
          <wui-avatar address=${e.address}></wui-avatar>
          ${a?(0,o.dy)`<wui-icon-box
                size="sm"
                iconcolor="fg-200"
                backgroundcolor="glass-002"
                background="gray"
                icon="${this.getAddressIcon(e.type)}"
                ?border=${!0}
              ></wui-icon-box>`:(0,o.dy)`<wui-flex .padding="${["0","0","0","s"]}"></wui-flex>`}
          <wui-flex flexDirection="column">
            <wui-text class="address" variant="paragraph-500" color="fg-100"
              >${i||h.Hg.getTruncateString({string:e.address,charsStart:4,charsEnd:6,truncate:"middle"})}</wui-text
            >
            <wui-text class="address-description" variant="small-400">
              ${"number"==typeof this.balances[e.address]?`$${this.balances[e.address]?.toFixed(2)}`:(0,o.dy)`<wui-loading-spinner size="sm" color="accent-100"></wui-loading-spinner>`}
            </wui-text>
          </wui-flex>
        </wui-flex>
        <wui-flex gap="s" alignItems="center">
          ${e.address?.toLowerCase()===this.currentAddress?.toLowerCase()?"":(0,o.dy)`
                <wui-button
                  data-testid=${`w3m-switch-address-button-${t}`}
                  textVariant="small-600"
                  size="md"
                  variant="accent"
                  @click=${()=>this.onSwitchAddress(e.address)}
                  >Switch to</wui-button
                >
              `}
        </wui-flex>
      </wui-flex>
    `}onSwitchAddress(e){let t=n.R.state.activeCaipNetwork,i=t?.chainNamespace,o=`${i}:${t?.id}:${e}`;d.AccountController.setCaipAddress(o,i),p.I.close()}};e3.styles=eQ,e0([(0,r.SB)()],e3.prototype,"allAccounts",void 0),e0([(0,r.SB)()],e3.prototype,"balances",void 0),e3=e0([(0,h.Mo)("w3m-switch-address-view")],e3);var e1=i(31183),e2=(0,o.iv)`
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
`,e5=function(e,t,i,o){var r,a=arguments.length,n=a<3?t:null===o?o=Object.getOwnPropertyDescriptor(t,i):o;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)n=Reflect.decorate(e,t,i,o);else for(var s=e.length-1;s>=0;s--)(r=e[s])&&(n=(a<3?r(n):a>3?r(t,i,n):r(t,i))||n);return a>3&&n&&Object.defineProperty(t,i,n),n};let e4=class extends o.oi{constructor(){super(...arguments),this.inputElementRef=(0,e1.V)(),this.checked=void 0}render(){return(0,o.dy)`
      <label>
        <input
          ${(0,e1.i)(this.inputElementRef)}
          type="checkbox"
          ?checked=${(0,a.o)(this.checked)}
          @change=${this.dispatchChangeEvent.bind(this)}
        />
        <span></span>
      </label>
    `}dispatchChangeEvent(){this.dispatchEvent(new CustomEvent("switchChange",{detail:this.inputElementRef.value?.checked,bubbles:!0,composed:!0}))}};e4.styles=[w.ET,w.ZM,w.Bp,e2],e5([(0,r.Cb)({type:Boolean})],e4.prototype,"checked",void 0),e4=e5([(0,b.M)("wui-switch")],e4);var e6=(0,o.iv)`
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
`,e7=function(e,t,i,o){var r,a=arguments.length,n=a<3?t:null===o?o=Object.getOwnPropertyDescriptor(t,i):o;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)n=Reflect.decorate(e,t,i,o);else for(var s=e.length-1;s>=0;s--)(r=e[s])&&(n=(a<3?r(n):a>3?r(t,i,n):r(t,i))||n);return a>3&&n&&Object.defineProperty(t,i,n),n};let e8=class extends o.oi{constructor(){super(...arguments),this.checked=void 0}render(){return(0,o.dy)`
      <button>
        <wui-icon size="xl" name="walletConnectBrown"></wui-icon>
        <wui-switch ?checked=${(0,a.o)(this.checked)}></wui-switch>
      </button>
    `}};e8.styles=[w.ET,w.ZM,e6],e7([(0,r.Cb)({type:Boolean})],e8.prototype,"checked",void 0),e8=e7([(0,b.M)("wui-certified-switch")],e8);var e9=(0,o.iv)`
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
`,te=function(e,t,i,o){var r,a=arguments.length,n=a<3?t:null===o?o=Object.getOwnPropertyDescriptor(t,i):o;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)n=Reflect.decorate(e,t,i,o);else for(var s=e.length-1;s>=0;s--)(r=e[s])&&(n=(a<3?r(n):a>3?r(t,i,n):r(t,i))||n);return a>3&&n&&Object.defineProperty(t,i,n),n};let tt=class extends o.oi{constructor(){super(...arguments),this.icon="copy"}render(){return(0,o.dy)`
      <button>
        <wui-icon color="inherit" size="xxs" name=${this.icon}></wui-icon>
      </button>
    `}};tt.styles=[w.ET,w.ZM,e9],te([(0,r.Cb)()],tt.prototype,"icon",void 0),tt=te([(0,b.M)("wui-input-element")],tt),i(73543);var ti=(0,o.iv)`
  :host {
    position: relative;
    display: inline-block;
    width: 100%;
  }
`;let to=class extends o.oi{constructor(){super(...arguments),this.inputComponentRef=(0,e1.V)()}render(){return(0,o.dy)`
      <wui-input-text
        ${(0,e1.i)(this.inputComponentRef)}
        placeholder="Search wallet"
        icon="search"
        type="search"
        enterKeyHint="search"
        size="sm"
      >
        <wui-input-element @click=${this.clearValue} icon="close"></wui-input-element>
      </wui-input-text>
    `}clearValue(){let e=this.inputComponentRef.value,t=e?.inputElementRef.value;t&&(t.value="",t.focus(),t.dispatchEvent(new Event("input")))}};to.styles=[w.ET,ti],to=function(e,t,i,o){var r,a=arguments.length,n=a<3?t:null===o?o=Object.getOwnPropertyDescriptor(t,i):o;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)n=Reflect.decorate(e,t,i,o);else for(var s=e.length-1;s>=0;s--)(r=e[s])&&(n=(a<3?r(n):a>3?r(t,i,n):r(t,i))||n);return a>3&&n&&Object.defineProperty(t,i,n),n}([(0,b.M)("wui-search-bar")],to);var tr=i(65092),ta=i(1840);i(91517);var tn=(0,o.iv)`
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
`,ts=function(e,t,i,o){var r,a=arguments.length,n=a<3?t:null===o?o=Object.getOwnPropertyDescriptor(t,i):o;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)n=Reflect.decorate(e,t,i,o);else for(var s=e.length-1;s>=0;s--)(r=e[s])&&(n=(a<3?r(n):a>3?r(t,i,n):r(t,i))||n);return a>3&&n&&Object.defineProperty(t,i,n),n};let tl=class extends o.oi{constructor(){super(...arguments),this.type="wallet"}render(){return(0,o.dy)`
      ${this.shimmerTemplate()}
      <wui-shimmer width="56px" height="20px" borderRadius="xs"></wui-shimmer>
    `}shimmerTemplate(){return"network"===this.type?(0,o.dy)` <wui-shimmer
          data-type=${this.type}
          width="48px"
          height="54px"
          borderRadius="xs"
        ></wui-shimmer>
        ${ta.W}`:(0,o.dy)`<wui-shimmer width="56px" height="56px" borderRadius="xs"></wui-shimmer>`}};tl.styles=[w.ET,w.ZM,tn],ts([(0,r.Cb)()],tl.prototype,"type",void 0),tl=ts([(0,b.M)("wui-card-select-loader")],tl);var tc=(0,o.iv)`
  :host {
    display: grid;
    width: inherit;
    height: inherit;
  }
`,td=function(e,t,i,o){var r,a=arguments.length,n=a<3?t:null===o?o=Object.getOwnPropertyDescriptor(t,i):o;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)n=Reflect.decorate(e,t,i,o);else for(var s=e.length-1;s>=0;s--)(r=e[s])&&(n=(a<3?r(n):a>3?r(t,i,n):r(t,i))||n);return a>3&&n&&Object.defineProperty(t,i,n),n};let tu=class extends o.oi{render(){return this.style.cssText=`
      grid-template-rows: ${this.gridTemplateRows};
      grid-template-columns: ${this.gridTemplateColumns};
      justify-items: ${this.justifyItems};
      align-items: ${this.alignItems};
      justify-content: ${this.justifyContent};
      align-content: ${this.alignContent};
      column-gap: ${this.columnGap&&`var(--wui-spacing-${this.columnGap})`};
      row-gap: ${this.rowGap&&`var(--wui-spacing-${this.rowGap})`};
      gap: ${this.gap&&`var(--wui-spacing-${this.gap})`};
      padding-top: ${this.padding&&g.H.getSpacingStyles(this.padding,0)};
      padding-right: ${this.padding&&g.H.getSpacingStyles(this.padding,1)};
      padding-bottom: ${this.padding&&g.H.getSpacingStyles(this.padding,2)};
      padding-left: ${this.padding&&g.H.getSpacingStyles(this.padding,3)};
      margin-top: ${this.margin&&g.H.getSpacingStyles(this.margin,0)};
      margin-right: ${this.margin&&g.H.getSpacingStyles(this.margin,1)};
      margin-bottom: ${this.margin&&g.H.getSpacingStyles(this.margin,2)};
      margin-left: ${this.margin&&g.H.getSpacingStyles(this.margin,3)};
    `,(0,o.dy)`<slot></slot>`}};tu.styles=[w.ET,tc],td([(0,r.Cb)()],tu.prototype,"gridTemplateRows",void 0),td([(0,r.Cb)()],tu.prototype,"gridTemplateColumns",void 0),td([(0,r.Cb)()],tu.prototype,"justifyItems",void 0),td([(0,r.Cb)()],tu.prototype,"alignItems",void 0),td([(0,r.Cb)()],tu.prototype,"justifyContent",void 0),td([(0,r.Cb)()],tu.prototype,"alignContent",void 0),td([(0,r.Cb)()],tu.prototype,"columnGap",void 0),td([(0,r.Cb)()],tu.prototype,"rowGap",void 0),td([(0,r.Cb)()],tu.prototype,"gap",void 0),td([(0,r.Cb)()],tu.prototype,"padding",void 0),td([(0,r.Cb)()],tu.prototype,"margin",void 0),tu=td([(0,b.M)("wui-grid")],tu);var tp=i(4235);i(64542),i(10963);var th=(0,o.iv)`
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
`,tw=function(e,t,i,o){var r,a=arguments.length,n=a<3?t:null===o?o=Object.getOwnPropertyDescriptor(t,i):o;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)n=Reflect.decorate(e,t,i,o);else for(var s=e.length-1;s>=0;s--)(r=e[s])&&(n=(a<3?r(n):a>3?r(t,i,n):r(t,i))||n);return a>3&&n&&Object.defineProperty(t,i,n),n};let tg=class extends o.oi{constructor(){super(),this.observer=new IntersectionObserver(()=>void 0),this.visible=!1,this.imageSrc=void 0,this.imageLoading=!1,this.wallet=void 0,this.observer=new IntersectionObserver(e=>{e.forEach(e=>{e.isIntersecting?(this.visible=!0,this.fetchImageSrc()):this.visible=!1})},{threshold:.01})}firstUpdated(){this.observer.observe(this)}disconnectedCallback(){this.observer.disconnect()}render(){let e=this.wallet?.badge_type==="certified";return(0,o.dy)`
      <button>
        ${this.imageTemplate()}
        <wui-flex flexDirection="row" alignItems="center" justifyContent="center" gap="3xs">
          <wui-text
            variant="tiny-500"
            color="inherit"
            class=${(0,a.o)(e?"certified":void 0)}
            >${this.wallet?.name}</wui-text
          >
          ${e?(0,o.dy)`<wui-icon size="sm" name="walletConnectBrown"></wui-icon>`:null}
        </wui-flex>
      </button>
    `}imageTemplate(){return(this.visible||this.imageSrc)&&!this.imageLoading?(0,o.dy)`
      <wui-wallet-image
        size="md"
        imageSrc=${(0,a.o)(this.imageSrc)}
        name=${this.wallet?.name}
        .installed=${this.wallet?.installed}
        badgeSize="sm"
      >
      </wui-wallet-image>
    `:this.shimmerTemplate()}shimmerTemplate(){return(0,o.dy)`<wui-shimmer width="56px" height="56px" borderRadius="xs"></wui-shimmer>`}async fetchImageSrc(){this.wallet&&(this.imageSrc=s.f.getWalletImage(this.wallet),this.imageSrc||(this.imageLoading=!0,this.imageSrc=await s.f.fetchWalletImage(this.wallet.image_id),this.imageLoading=!1))}};tg.styles=th,tw([(0,r.SB)()],tg.prototype,"visible",void 0),tw([(0,r.SB)()],tg.prototype,"imageSrc",void 0),tw([(0,r.SB)()],tg.prototype,"imageLoading",void 0),tw([(0,r.Cb)()],tg.prototype,"wallet",void 0),tg=tw([(0,h.Mo)("w3m-all-wallets-list-item")],tg);var tb=(0,o.iv)`
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
`,tf=function(e,t,i,o){var r,a=arguments.length,n=a<3?t:null===o?o=Object.getOwnPropertyDescriptor(t,i):o;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)n=Reflect.decorate(e,t,i,o);else for(var s=e.length-1;s>=0;s--)(r=e[s])&&(n=(a<3?r(n):a>3?r(t,i,n):r(t,i))||n);return a>3&&n&&Object.defineProperty(t,i,n),n};let tm="local-paginator",tv=class extends o.oi{constructor(){super(),this.unsubscribe=[],this.paginationObserver=void 0,this.loading=!tr.ApiController.state.wallets.length,this.wallets=tr.ApiController.state.wallets,this.recommended=tr.ApiController.state.recommended,this.featured=tr.ApiController.state.featured,this.filteredWallets=tr.ApiController.state.filteredWallets,this.unsubscribe.push(tr.ApiController.subscribeKey("wallets",e=>this.wallets=e),tr.ApiController.subscribeKey("recommended",e=>this.recommended=e),tr.ApiController.subscribeKey("featured",e=>this.featured=e),tr.ApiController.subscribeKey("filteredWallets",e=>this.filteredWallets=e))}firstUpdated(){this.initialFetch(),this.createPaginationObserver()}disconnectedCallback(){this.unsubscribe.forEach(e=>e()),this.paginationObserver?.disconnect()}render(){return(0,o.dy)`
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
    `}async initialFetch(){this.loading=!0;let e=this.shadowRoot?.querySelector("wui-grid");e&&(await tr.ApiController.fetchWalletsByPage({page:1}),await e.animate([{opacity:1},{opacity:0}],{duration:200,fill:"forwards",easing:"ease"}).finished,this.loading=!1,e.animate([{opacity:0},{opacity:1}],{duration:200,fill:"forwards",easing:"ease"}))}shimmerTemplate(e,t){return[...Array(e)].map(()=>(0,o.dy)`
        <wui-card-select-loader type="wallet" id=${(0,a.o)(t)}></wui-card-select-loader>
      `)}walletsTemplate(){let e=this.filteredWallets?.length>0?u.j.uniqueBy([...this.featured,...this.recommended,...this.filteredWallets],"id"):u.j.uniqueBy([...this.featured,...this.recommended,...this.wallets],"id");return tp.J.markWalletsAsInstalled(e).map(e=>(0,o.dy)`
        <w3m-all-wallets-list-item
          @click=${()=>this.onConnectWallet(e)}
          .wallet=${e}
        ></w3m-all-wallets-list-item>
      `)}paginationLoaderTemplate(){let{wallets:e,recommended:t,featured:i,count:o}=tr.ApiController.state,r=window.innerWidth<352?3:4,a=e.length+t.length,n=Math.ceil(a/r)*r-a+r;return(n-=e.length?i.length%r:0,0===o&&i.length>0)?null:0===o||[...i,...e,...t].length<o?this.shimmerTemplate(n,tm):null}createPaginationObserver(){let e=this.shadowRoot?.querySelector(`#${tm}`);e&&(this.paginationObserver=new IntersectionObserver(([e])=>{if(e?.isIntersecting&&!this.loading){let{page:e,count:t,wallets:i}=tr.ApiController.state;i.length<t&&tr.ApiController.fetchWalletsByPage({page:e+1})}}),this.paginationObserver.observe(e))}onConnectWallet(e){F.ConnectorController.selectWalletConnector(e)}};tv.styles=tb,tf([(0,r.SB)()],tv.prototype,"loading",void 0),tf([(0,r.SB)()],tv.prototype,"wallets",void 0),tf([(0,r.SB)()],tv.prototype,"recommended",void 0),tf([(0,r.SB)()],tv.prototype,"featured",void 0),tf([(0,r.SB)()],tv.prototype,"filteredWallets",void 0),tv=tf([(0,h.Mo)("w3m-all-wallets-list")],tv),i(44779);var ty=(0,o.iv)`
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
`,tx=function(e,t,i,o){var r,a=arguments.length,n=a<3?t:null===o?o=Object.getOwnPropertyDescriptor(t,i):o;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)n=Reflect.decorate(e,t,i,o);else for(var s=e.length-1;s>=0;s--)(r=e[s])&&(n=(a<3?r(n):a>3?r(t,i,n):r(t,i))||n);return a>3&&n&&Object.defineProperty(t,i,n),n};let tC=class extends o.oi{constructor(){super(...arguments),this.prevQuery="",this.prevBadge=void 0,this.loading=!0,this.query=""}render(){return this.onSearch(),this.loading?(0,o.dy)`<wui-loading-spinner color="accent-100"></wui-loading-spinner>`:this.walletsTemplate()}async onSearch(){(this.query.trim()!==this.prevQuery.trim()||this.badge!==this.prevBadge)&&(this.prevQuery=this.query,this.prevBadge=this.badge,this.loading=!0,await tr.ApiController.searchWallet({search:this.query,badge:this.badge}),this.loading=!1)}walletsTemplate(){let{search:e}=tr.ApiController.state,t=tp.J.markWalletsAsInstalled(e);return e.length?(0,o.dy)`
      <wui-grid
        data-testid="wallet-list"
        .padding=${["0","s","s","s"]}
        rowGap="l"
        columnGap="xs"
        justifyContent="space-between"
      >
        ${t.map(e=>(0,o.dy)`
            <w3m-all-wallets-list-item
              @click=${()=>this.onConnectWallet(e)}
              .wallet=${e}
              data-testid="wallet-search-item-${e.id}"
            ></w3m-all-wallets-list-item>
          `)}
      </wui-grid>
    `:(0,o.dy)`
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
      `}onConnectWallet(e){F.ConnectorController.selectWalletConnector(e)}};tC.styles=ty,tx([(0,r.SB)()],tC.prototype,"loading",void 0),tx([(0,r.Cb)()],tC.prototype,"query",void 0),tx([(0,r.Cb)()],tC.prototype,"badge",void 0),tC=tx([(0,h.Mo)("w3m-all-wallets-search")],tC);var tk=function(e,t,i,o){var r,a=arguments.length,n=a<3?t:null===o?o=Object.getOwnPropertyDescriptor(t,i):o;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)n=Reflect.decorate(e,t,i,o);else for(var s=e.length-1;s>=0;s--)(r=e[s])&&(n=(a<3?r(n):a>3?r(t,i,n):r(t,i))||n);return a>3&&n&&Object.defineProperty(t,i,n),n};let t$=class extends o.oi{constructor(){super(...arguments),this.search="",this.onDebouncedSearch=u.j.debounce(e=>{this.search=e})}render(){let e=this.search.length>=2;return(0,o.dy)`
      <wui-flex .padding=${["0","s","s","s"]} gap="xs">
        <wui-search-bar @inputChange=${this.onInputChange.bind(this)}></wui-search-bar>
        <wui-certified-switch
          ?checked=${this.badge}
          @click=${this.onClick.bind(this)}
          data-testid="wui-certified-switch"
        ></wui-certified-switch>
        ${this.qrButtonTemplate()}
      </wui-flex>
      ${e||this.badge?(0,o.dy)`<w3m-all-wallets-search
            query=${this.search}
            badge=${(0,a.o)(this.badge)}
          ></w3m-all-wallets-search>`:(0,o.dy)`<w3m-all-wallets-list badge=${(0,a.o)(this.badge)}></w3m-all-wallets-list>`}
    `}onInputChange(e){this.onDebouncedSearch(e.detail)}onClick(){if("certified"===this.badge){this.badge=void 0;return}this.badge="certified",X.SnackController.showSvg("Only WalletConnect certified",{icon:"walletConnectBrown",iconColor:"accent-100"})}qrButtonTemplate(){return u.j.isMobile()?(0,o.dy)`
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
      `:null}onWalletConnectQr(){Y.RouterController.push("ConnectingWalletConnect")}};tk([(0,r.SB)()],t$.prototype,"search",void 0),tk([(0,r.SB)()],t$.prototype,"badge",void 0),t$=tk([(0,h.Mo)("w3m-all-wallets-view")],t$);var tS=i(65659),tR=i(51904),tT=i(77827),tA=(0,o.iv)`
  button {
    column-gap: var(--wui-spacing-s);
    padding: 16.5px var(--wui-spacing-l) 16.5px var(--wui-spacing-xs);
    width: 100%;
    background-color: var(--wui-color-gray-glass-002);
    border-radius: var(--wui-border-radius-xs);
    color: var(--wui-color-fg-100);
    justify-content: center;
    align-items: center;
  }

  button:disabled {
    background-color: var(--wui-color-gray-glass-015);
    color: var(--wui-color-gray-glass-015);
  }
`,tI=function(e,t,i,o){var r,a=arguments.length,n=a<3?t:null===o?o=Object.getOwnPropertyDescriptor(t,i):o;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)n=Reflect.decorate(e,t,i,o);else for(var s=e.length-1;s>=0;s--)(r=e[s])&&(n=(a<3?r(n):a>3?r(t,i,n):r(t,i))||n);return a>3&&n&&Object.defineProperty(t,i,n),n};let tO=class extends o.oi{constructor(){super(...arguments),this.text="",this.disabled=!1,this.tabIdx=void 0}render(){return(0,o.dy)`
      <button ?disabled=${this.disabled} tabindex=${(0,a.o)(this.tabIdx)}>
        <wui-text align="center" variant="paragraph-500" color="inherit">${this.text}</wui-text>
      </button>
    `}};tO.styles=[w.ET,w.ZM,tA],tI([(0,r.Cb)()],tO.prototype,"text",void 0),tI([(0,r.Cb)({type:Boolean})],tO.prototype,"disabled",void 0),tI([(0,r.Cb)()],tO.prototype,"tabIdx",void 0),tO=tI([(0,b.M)("wui-list-button")],tO),i(36566);var tE=i(83414);i(47242);var tj=(0,o.iv)`
  wui-separator {
    margin: var(--wui-spacing-s) calc(var(--wui-spacing-s) * -1);
    width: calc(100% + var(--wui-spacing-s) * 2);
  }

  wui-email-input {
    width: 100%;
  }

  form {
    width: 100%;
    display: block;
    position: relative;
  }

  wui-icon-link,
  wui-loading-spinner {
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
  }

  wui-icon-link {
    right: var(--wui-spacing-xs);
  }

  wui-loading-spinner {
    right: var(--wui-spacing-m);
  }

  wui-text {
    margin: var(--wui-spacing-xxs) var(--wui-spacing-m) var(--wui-spacing-0) var(--wui-spacing-m);
  }
`,tN=function(e,t,i,o){var r,a=arguments.length,n=a<3?t:null===o?o=Object.getOwnPropertyDescriptor(t,i):o;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)n=Reflect.decorate(e,t,i,o);else for(var s=e.length-1;s>=0;s--)(r=e[s])&&(n=(a<3?r(n):a>3?r(t,i,n):r(t,i))||n);return a>3&&n&&Object.defineProperty(t,i,n),n};let tP=class extends o.oi{constructor(){super(...arguments),this.unsubscribe=[],this.formRef=(0,e1.V)(),this.email="",this.loading=!1,this.error=""}disconnectedCallback(){this.unsubscribe.forEach(e=>e())}firstUpdated(){this.formRef.value?.addEventListener("keydown",e=>{"Enter"===e.key&&this.onSubmitEmail(e)})}render(){return(0,o.dy)`
      <form ${(0,e1.i)(this.formRef)} @submit=${this.onSubmitEmail.bind(this)}>
        <wui-email-input
          @focus=${this.onFocusEvent.bind(this)}
          .disabled=${this.loading}
          @inputChange=${this.onEmailInputChange.bind(this)}
          tabIdx=${(0,a.o)(this.tabIdx)}
        >
        </wui-email-input>

        ${this.submitButtonTemplate()}${this.loadingTemplate()}
        <input type="submit" hidden />
      </form>
      ${this.templateError()}
    `}submitButtonTemplate(){return!this.loading&&this.email.length>3?(0,o.dy)`
          <wui-icon-link
            size="sm"
            icon="chevronRight"
            iconcolor="accent-100"
            @click=${this.onSubmitEmail.bind(this)}
          >
          </wui-icon-link>
        `:null}loadingTemplate(){return this.loading?(0,o.dy)`<wui-loading-spinner size="md" color="accent-100"></wui-loading-spinner>`:null}templateError(){return this.error?(0,o.dy)`<wui-text variant="tiny-500" color="error-100">${this.error}</wui-text>`:null}onEmailInputChange(e){this.email=e.detail.trim(),this.error=""}async onSubmitEmail(e){if(!K.b.AUTH_CONNECTOR_SUPPORTED_CHAINS.find(e=>e===n.R.state.activeChain)){let e=n.R.getFirstCaipNetworkSupportsAuthConnector();if(e){Y.RouterController.push("SwitchNetwork",{network:e});return}}try{if(this.loading)return;this.loading=!0,e.preventDefault();let t=F.ConnectorController.getAuthConnector();if(!t)throw Error("w3m-email-login-widget: Auth connector not found");let{action:i}=await t.provider.connectEmail({email:this.email});D.X.sendEvent({type:"track",event:"EMAIL_SUBMITTED"}),"VERIFY_OTP"===i?(D.X.sendEvent({type:"track",event:"EMAIL_VERIFICATION_CODE_SENT"}),Y.RouterController.push("EmailVerifyOtp",{email:this.email})):"VERIFY_DEVICE"===i?Y.RouterController.push("EmailVerifyDevice",{email:this.email}):"CONNECT"===i&&(await Z.ConnectionController.connectExternal(t,n.R.state.activeChain),Y.RouterController.replace("Account"))}catch(t){let e=u.j.parseError(t);e?.includes("Invalid email")?this.error="Invalid email. Try again.":X.SnackController.showError(t)}finally{this.loading=!1}}onFocusEvent(){D.X.sendEvent({type:"track",event:"EMAIL_LOGIN_SELECTED"})}};tP.styles=tj,tN([(0,r.Cb)()],tP.prototype,"tabIdx",void 0),tN([(0,r.SB)()],tP.prototype,"email",void 0),tN([(0,r.SB)()],tP.prototype,"loading",void 0),tN([(0,r.SB)()],tP.prototype,"error",void 0),tP=tN([(0,h.Mo)("w3m-email-login-widget")],tP),i(96511),i(92725);var tB=i(89436),tD=i(79677);i(99994),i(66828);var tM=(0,o.iv)`
  :host {
    display: block;
    width: 100%;
  }

  button {
    width: 100%;
    height: 56px;
    background: var(--wui-color-gray-glass-002);
    border-radius: var(--wui-border-radius-xs);
  }
`,tW=function(e,t,i,o){var r,a=arguments.length,n=a<3?t:null===o?o=Object.getOwnPropertyDescriptor(t,i):o;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)n=Reflect.decorate(e,t,i,o);else for(var s=e.length-1;s>=0;s--)(r=e[s])&&(n=(a<3?r(n):a>3?r(t,i,n):r(t,i))||n);return a>3&&n&&Object.defineProperty(t,i,n),n};let tL=class extends o.oi{constructor(){super(...arguments),this.logo="google",this.disabled=!1,this.tabIdx=void 0}render(){return(0,o.dy)`
      <button ?disabled=${this.disabled} tabindex=${(0,a.o)(this.tabIdx)}>
        <wui-logo logo=${this.logo}></wui-logo>
      </button>
    `}};tL.styles=[w.ET,w.ZM,tM],tW([(0,r.Cb)()],tL.prototype,"logo",void 0),tW([(0,r.Cb)({type:Boolean})],tL.prototype,"disabled",void 0),tW([(0,r.Cb)()],tL.prototype,"tabIdx",void 0),tL=tW([(0,b.M)("wui-logo-select")],tL);var tz=i(63346),tU=(0,o.iv)`
  wui-separator {
    margin: var(--wui-spacing-m) calc(var(--wui-spacing-m) * -1) var(--wui-spacing-m)
      calc(var(--wui-spacing-m) * -1);
    width: calc(100% + var(--wui-spacing-s) * 2);
  }
`,t_=function(e,t,i,o){var r,a=arguments.length,n=a<3?t:null===o?o=Object.getOwnPropertyDescriptor(t,i):o;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)n=Reflect.decorate(e,t,i,o);else for(var s=e.length-1;s>=0;s--)(r=e[s])&&(n=(a<3?r(n):a>3?r(t,i,n):r(t,i))||n);return a>3&&n&&Object.defineProperty(t,i,n),n};let tV=class extends o.oi{constructor(){super(),this.unsubscribe=[],this.walletGuide="get-started",this.tabIdx=void 0,this.connectors=F.ConnectorController.state.connectors,this.features=l.OptionsController.state.features,this.authConnector=this.connectors.find(e=>"AUTH"===e.type),this.isPwaLoading=!1,this.unsubscribe.push(F.ConnectorController.subscribeKey("connectors",e=>{this.connectors=e,this.authConnector=this.connectors.find(e=>"AUTH"===e.type)}),l.OptionsController.subscribeKey("features",e=>this.features=e))}connectedCallback(){super.connectedCallback(),this.handlePwaFrameLoad()}disconnectedCallback(){this.unsubscribe.forEach(e=>e())}render(){return(0,o.dy)`
      <wui-flex
        class="container"
        flexDirection="column"
        gap="xs"
        data-testid="w3m-social-login-widget"
      >
        ${this.topViewTemplate()}${this.bottomViewTemplate()}
      </wui-flex>
    `}topViewTemplate(){let e="explore"===this.walletGuide,t=this.features?.socials;return!t&&e?(t=G.bq.DEFAULT_FEATURES.socials,this.renderTopViewContent(t)):t?this.renderTopViewContent(t):null}renderTopViewContent(e){return 2===e.length?(0,o.dy)` <wui-flex gap="xs">
        ${e.slice(0,2).map(e=>(0,o.dy)`<wui-logo-select
              data-testid=${`social-selector-${e}`}
              @click=${()=>{this.onSocialClick(e)}}
              logo=${e}
              tabIdx=${(0,a.o)(this.tabIdx)}
              ?disabled=${this.isPwaLoading}
            ></wui-logo-select>`)}
      </wui-flex>`:(0,o.dy)` <wui-list-social
      data-testid=${`social-selector-${e[0]}`}
      @click=${()=>{this.onSocialClick(e[0])}}
      logo=${(0,a.o)(e[0])}
      align="center"
      name=${`Continue with ${e[0]}`}
      tabIdx=${(0,a.o)(this.tabIdx)}
      ?disabled=${this.isPwaLoading}
    ></wui-list-social>`}bottomViewTemplate(){let e=this.features?.socials,t="explore"===this.walletGuide;return(this.authConnector&&e&&e?.length||!t||(e=G.bq.DEFAULT_FEATURES.socials),!e||e.length<=2)?null:e&&e.length>6?(0,o.dy)`<wui-flex gap="xs">
        ${e.slice(1,5).map(e=>(0,o.dy)`<wui-logo-select
              data-testid=${`social-selector-${e}`}
              @click=${()=>{this.onSocialClick(e)}}
              logo=${e}
              tabIdx=${(0,a.o)(this.tabIdx)}
              ?focusable=${void 0!==this.tabIdx&&this.tabIdx>=0}
              ?disabled=${this.isPwaLoading}
            ></wui-logo-select>`)}
        <wui-logo-select
          logo="more"
          tabIdx=${(0,a.o)(this.tabIdx)}
          @click=${this.onMoreSocialsClick.bind(this)}
          ?disabled=${this.isPwaLoading}
        ></wui-logo-select>
      </wui-flex>`:e?(0,o.dy)`<wui-flex gap="xs">
      ${e.slice(1,e.length).map(e=>(0,o.dy)`<wui-logo-select
            data-testid=${`social-selector-${e}`}
            @click=${()=>{this.onSocialClick(e)}}
            logo=${e}
            tabIdx=${(0,a.o)(this.tabIdx)}
            ?focusable=${void 0!==this.tabIdx&&this.tabIdx>=0}
            ?disabled=${this.isPwaLoading}
          ></wui-logo-select>`)}
    </wui-flex>`:null}onMoreSocialsClick(){Y.RouterController.push("ConnectSocials")}async onSocialClick(e){if(!K.b.AUTH_CONNECTOR_SUPPORTED_CHAINS.find(e=>e===n.R.state.activeChain)){let e=n.R.getFirstCaipNetworkSupportsAuthConnector();if(e){Y.RouterController.push("SwitchNetwork",{network:e});return}}e&&await (0,tD.y0)(e)}async handlePwaFrameLoad(){if(u.j.isPWA()){this.isPwaLoading=!0;try{this.authConnector?.provider instanceof tz.S&&await this.authConnector.provider.init()}catch(e){tB.AlertController.open({shortMessage:"Error loading embedded wallet in PWA",longMessage:e.message},"error")}finally{this.isPwaLoading=!1}}}};tV.styles=tU,t_([(0,r.Cb)()],tV.prototype,"walletGuide",void 0),t_([(0,r.Cb)()],tV.prototype,"tabIdx",void 0),t_([(0,r.SB)()],tV.prototype,"connectors",void 0),t_([(0,r.SB)()],tV.prototype,"features",void 0),t_([(0,r.SB)()],tV.prototype,"authConnector",void 0),t_([(0,r.SB)()],tV.prototype,"isPwaLoading",void 0),tV=t_([(0,h.Mo)("w3m-social-login-widget")],tV),i(36721);var tH=(0,o.iv)`
  :host {
    padding-bottom: var(--wui-spacing-s);
  }
  wui-flex {
    width: 100%;
  }

  .wallet-guide {
    width: 100%;
  }

  .chip-box {
    width: fit-content;
    background-color: var(--wui-color-gray-glass-005);
    border-radius: var(--wui-border-radius-3xl);
  }
`,tq=function(e,t,i,o){var r,a=arguments.length,n=a<3?t:null===o?o=Object.getOwnPropertyDescriptor(t,i):o;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)n=Reflect.decorate(e,t,i,o);else for(var s=e.length-1;s>=0;s--)(r=e[s])&&(n=(a<3?r(n):a>3?r(t,i,n):r(t,i))||n);return a>3&&n&&Object.defineProperty(t,i,n),n};let tK=class extends o.oi{constructor(){super(...arguments),this.walletGuide="get-started"}render(){return"explore"===this.walletGuide?(0,o.dy)`<wui-flex
          class="wallet-guide"
          flexDirection="column"
          alignItems="center"
          justifyContent="center"
          rowGap="xs"
          data-testid="w3m-wallet-guide-explore"
        >
          <wui-text variant="small-400" color="fg-200" align="center">
            Looking for a self-custody wallet?
          </wui-text>

          <wui-flex class="chip-box">
            <wui-chip
              imageIcon="walletConnectLightBrown"
              icon="externalLink"
              variant="transparent"
              href="https://walletguide.walletconnect.network"
              title="Find one on WalletGuide"
            ></wui-chip>
          </wui-flex>
        </wui-flex>`:(0,o.dy)`<wui-flex
          columnGap="4xs"
          flexDirection="row"
          alignItems="center"
          justifyContent="center"
          .padding=${["s","0","s","0"]}
        >
          <wui-text variant="small-400" class="title" color="fg-200"
            >Haven't got a wallet?</wui-text
          >
          <wui-link
            data-testid="w3m-wallet-guide-get-started"
            color="blue-100"
            class="get-started-link"
            @click=${this.onGetStarted}
            tabIdx=${(0,a.o)(this.tabIdx)}
          >
            Get started
          </wui-link>
        </wui-flex>`}onGetStarted(){Y.RouterController.push("Create")}};tK.styles=tH,tq([(0,r.Cb)()],tK.prototype,"tabIdx",void 0),tq([(0,r.Cb)()],tK.prototype,"walletGuide",void 0),tK=tq([(0,h.Mo)("w3m-wallet-guide")],tK),i(14178);var tF=(0,o.iv)`
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
`,tG=function(e,t,i,o){var r,a=arguments.length,n=a<3?t:null===o?o=Object.getOwnPropertyDescriptor(t,i):o;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)n=Reflect.decorate(e,t,i,o);else for(var s=e.length-1;s>=0;s--)(r=e[s])&&(n=(a<3?r(n):a>3?r(t,i,n):r(t,i))||n);return a>3&&n&&Object.defineProperty(t,i,n),n};let tX=class extends o.oi{constructor(){super(...arguments),this.walletImages=[]}render(){let e=this.walletImages.length<4;return(0,o.dy)`${this.walletImages.slice(0,4).map(({src:e,walletName:t})=>(0,o.dy)`
            <wui-wallet-image
              size="inherit"
              imageSrc=${e}
              name=${(0,a.o)(t)}
            ></wui-wallet-image>
          `)}
      ${e?[...Array(4-this.walletImages.length)].map(()=>(0,o.dy)` <wui-wallet-image size="inherit" name=""></wui-wallet-image>`):null}
      <wui-flex>
        <wui-icon-box
          size="xxs"
          iconSize="xxs"
          iconcolor="success-100"
          backgroundcolor="success-100"
          icon="checkmark"
          background="opaque"
        ></wui-icon-box>
      </wui-flex>`}};tX.styles=[w.ET,tF],tG([(0,r.Cb)({type:Array})],tX.prototype,"walletImages",void 0),tX=tG([(0,b.M)("wui-all-wallets-image")],tX);var tY=(0,o.iv)`
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
`,tZ=function(e,t,i,o){var r,a=arguments.length,n=a<3?t:null===o?o=Object.getOwnPropertyDescriptor(t,i):o;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)n=Reflect.decorate(e,t,i,o);else for(var s=e.length-1;s>=0;s--)(r=e[s])&&(n=(a<3?r(n):a>3?r(t,i,n):r(t,i))||n);return a>3&&n&&Object.defineProperty(t,i,n),n};let tJ=class extends o.oi{constructor(){super(...arguments),this.walletImages=[],this.imageSrc="",this.name="",this.tabIdx=void 0,this.installed=!1,this.disabled=!1,this.showAllWallets=!1,this.loading=!1,this.loadingSpinnerColor="accent-100"}render(){return(0,o.dy)`
      <button ?disabled=${this.disabled} tabindex=${(0,a.o)(this.tabIdx)}>
        ${this.templateAllWallets()} ${this.templateWalletImage()}
        <wui-text variant="paragraph-500" color="inherit">${this.name}</wui-text>
        ${this.templateStatus()}
      </button>
    `}templateAllWallets(){return this.showAllWallets&&this.imageSrc?(0,o.dy)` <wui-all-wallets-image .imageeSrc=${this.imageSrc}> </wui-all-wallets-image> `:this.showAllWallets&&this.walletIcon?(0,o.dy)` <wui-wallet-image .walletIcon=${this.walletIcon} size="sm"> </wui-wallet-image> `:null}templateWalletImage(){return!this.showAllWallets&&this.imageSrc?(0,o.dy)`<wui-wallet-image
        size="sm"
        imageSrc=${this.imageSrc}
        name=${this.name}
        .installed=${this.installed}
      ></wui-wallet-image>`:this.showAllWallets||this.imageSrc?null:(0,o.dy)`<wui-wallet-image size="sm" name=${this.name}></wui-wallet-image>`}templateStatus(){return this.loading?(0,o.dy)`<wui-loading-spinner
        size="lg"
        color=${this.loadingSpinnerColor}
      ></wui-loading-spinner>`:this.tagLabel&&this.tagVariant?(0,o.dy)`<wui-tag variant=${this.tagVariant}>${this.tagLabel}</wui-tag>`:this.icon?(0,o.dy)`<wui-icon color="inherit" size="sm" name=${this.icon}></wui-icon>`:null}};tJ.styles=[w.ET,w.ZM,tY],tZ([(0,r.Cb)({type:Array})],tJ.prototype,"walletImages",void 0),tZ([(0,r.Cb)()],tJ.prototype,"imageSrc",void 0),tZ([(0,r.Cb)()],tJ.prototype,"name",void 0),tZ([(0,r.Cb)()],tJ.prototype,"tagLabel",void 0),tZ([(0,r.Cb)()],tJ.prototype,"tagVariant",void 0),tZ([(0,r.Cb)()],tJ.prototype,"icon",void 0),tZ([(0,r.Cb)()],tJ.prototype,"walletIcon",void 0),tZ([(0,r.Cb)()],tJ.prototype,"tabIdx",void 0),tZ([(0,r.Cb)({type:Boolean})],tJ.prototype,"installed",void 0),tZ([(0,r.Cb)({type:Boolean})],tJ.prototype,"disabled",void 0),tZ([(0,r.Cb)({type:Boolean})],tJ.prototype,"showAllWallets",void 0),tZ([(0,r.Cb)({type:Boolean})],tJ.prototype,"loading",void 0),tZ([(0,r.Cb)({type:String})],tJ.prototype,"loadingSpinnerColor",void 0),tJ=tZ([(0,b.M)("wui-list-wallet")],tJ);var tQ=function(e,t,i,o){var r,a=arguments.length,n=a<3?t:null===o?o=Object.getOwnPropertyDescriptor(t,i):o;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)n=Reflect.decorate(e,t,i,o);else for(var s=e.length-1;s>=0;s--)(r=e[s])&&(n=(a<3?r(n):a>3?r(t,i,n):r(t,i))||n);return a>3&&n&&Object.defineProperty(t,i,n),n};let t0=class extends o.oi{constructor(){super(),this.unsubscribe=[],this.tabIdx=void 0,this.connectors=F.ConnectorController.state.connectors,this.count=tr.ApiController.state.count,this.filteredCount=tr.ApiController.state.filteredWallets.length,this.isFetchingRecommendedWallets=tr.ApiController.state.isFetchingRecommendedWallets,this.unsubscribe.push(F.ConnectorController.subscribeKey("connectors",e=>this.connectors=e),tr.ApiController.subscribeKey("count",e=>this.count=e),tr.ApiController.subscribeKey("filteredWallets",e=>this.filteredCount=e.length),tr.ApiController.subscribeKey("isFetchingRecommendedWallets",e=>this.isFetchingRecommendedWallets=e))}disconnectedCallback(){this.unsubscribe.forEach(e=>e())}render(){let e=this.connectors.find(e=>"walletConnect"===e.id),{allWallets:t}=l.OptionsController.state;if(!e||"HIDE"===t||"ONLY_MOBILE"===t&&!u.j.isMobile())return null;let i=tr.ApiController.state.featured.length,r=this.count+i,n=this.filteredCount>0?this.filteredCount:r<10?r:10*Math.floor(r/10),s=`${n}`;return this.filteredCount>0?s=`${this.filteredCount}`:n<r&&(s=`${n}+`),(0,o.dy)`
      <wui-list-wallet
        name="All Wallets"
        walletIcon="allWallets"
        showAllWallets
        @click=${this.onAllWallets.bind(this)}
        tagLabel=${s}
        tagVariant="shade"
        data-testid="all-wallets"
        tabIdx=${(0,a.o)(this.tabIdx)}
        .loading=${this.isFetchingRecommendedWallets}
        loadingSpinnerColor=${this.isFetchingRecommendedWallets?"fg-300":"accent-100"}
      ></wui-list-wallet>
    `}onAllWallets(){D.X.sendEvent({type:"track",event:"CLICK_ALL_WALLETS"}),Y.RouterController.push("AllWallets")}};tQ([(0,r.Cb)()],t0.prototype,"tabIdx",void 0),tQ([(0,r.SB)()],t0.prototype,"connectors",void 0),tQ([(0,r.SB)()],t0.prototype,"count",void 0),tQ([(0,r.SB)()],t0.prototype,"filteredCount",void 0),tQ([(0,r.SB)()],t0.prototype,"isFetchingRecommendedWallets",void 0),t0=tQ([(0,h.Mo)("w3m-all-wallets-widget")],t0);var t3=i(22034),t1=function(e,t,i,o){var r,a=arguments.length,n=a<3?t:null===o?o=Object.getOwnPropertyDescriptor(t,i):o;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)n=Reflect.decorate(e,t,i,o);else for(var s=e.length-1;s>=0;s--)(r=e[s])&&(n=(a<3?r(n):a>3?r(t,i,n):r(t,i))||n);return a>3&&n&&Object.defineProperty(t,i,n),n};let t2=class extends o.oi{constructor(){super(),this.unsubscribe=[],this.tabIdx=void 0,this.connectors=F.ConnectorController.state.connectors,this.unsubscribe.push(F.ConnectorController.subscribeKey("connectors",e=>this.connectors=e))}disconnectedCallback(){this.unsubscribe.forEach(e=>e())}render(){let e=this.connectors.filter(e=>"ANNOUNCED"===e.type);return e?.length?(0,o.dy)`
      <wui-flex flexDirection="column" gap="xs">
        ${e.filter(t3.C.showConnector).map(e=>(0,o.dy)`
              <wui-list-wallet
                imageSrc=${(0,a.o)(s.f.getConnectorImage(e))}
                name=${e.name??"Unknown"}
                @click=${()=>this.onConnector(e)}
                tagVariant="success"
                tagLabel="installed"
                data-testid=${`wallet-selector-${e.id}`}
                .installed=${!0}
                tabIdx=${(0,a.o)(this.tabIdx)}
              >
              </wui-list-wallet>
            `)}
      </wui-flex>
    `:(this.style.cssText="display: none",null)}onConnector(e){"walletConnect"===e.id?u.j.isMobile()?Y.RouterController.push("AllWallets"):Y.RouterController.push("ConnectingWalletConnect"):Y.RouterController.push("ConnectingExternal",{connector:e})}};t1([(0,r.Cb)()],t2.prototype,"tabIdx",void 0),t1([(0,r.SB)()],t2.prototype,"connectors",void 0),t2=t1([(0,h.Mo)("w3m-connect-announced-widget")],t2);var t5=function(e,t,i,o){var r,a=arguments.length,n=a<3?t:null===o?o=Object.getOwnPropertyDescriptor(t,i):o;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)n=Reflect.decorate(e,t,i,o);else for(var s=e.length-1;s>=0;s--)(r=e[s])&&(n=(a<3?r(n):a>3?r(t,i,n):r(t,i))||n);return a>3&&n&&Object.defineProperty(t,i,n),n};let t4=class extends o.oi{constructor(){super(),this.unsubscribe=[],this.tabIdx=void 0,this.connectors=F.ConnectorController.state.connectors,this.loading=!1,this.unsubscribe.push(F.ConnectorController.subscribeKey("connectors",e=>this.connectors=e)),u.j.isTelegram()&&u.j.isIos()&&(this.loading=!Z.ConnectionController.state.wcUri,this.unsubscribe.push(Z.ConnectionController.subscribeKey("wcUri",e=>this.loading=!e)))}disconnectedCallback(){this.unsubscribe.forEach(e=>e())}render(){let{customWallets:e}=l.OptionsController.state;if(!e?.length)return this.style.cssText="display: none",null;let t=this.filterOutDuplicateWallets(e);return(0,o.dy)`<wui-flex flexDirection="column" gap="xs">
      ${t.map(e=>(0,o.dy)`
          <wui-list-wallet
            imageSrc=${(0,a.o)(s.f.getWalletImage(e))}
            name=${e.name??"Unknown"}
            @click=${()=>this.onConnectWallet(e)}
            data-testid=${`wallet-selector-${e.id}`}
            tabIdx=${(0,a.o)(this.tabIdx)}
            ?loading=${this.loading}
          >
          </wui-list-wallet>
        `)}
    </wui-flex>`}filterOutDuplicateWallets(e){let t=eo.M.getRecentWallets(),i=this.connectors.map(e=>e.info?.rdns).filter(Boolean),o=t.map(e=>e.rdns).filter(Boolean),r=i.concat(o);if(r.includes("io.metamask.mobile")&&u.j.isMobile()){let e=r.indexOf("io.metamask.mobile");r[e]="io.metamask"}return e.filter(e=>!r.includes(String(e?.rdns)))}onConnectWallet(e){this.loading||Y.RouterController.push("ConnectingWalletConnect",{wallet:e})}};t5([(0,r.Cb)()],t4.prototype,"tabIdx",void 0),t5([(0,r.SB)()],t4.prototype,"connectors",void 0),t5([(0,r.SB)()],t4.prototype,"loading",void 0),t4=t5([(0,h.Mo)("w3m-connect-custom-widget")],t4);var t6=function(e,t,i,o){var r,a=arguments.length,n=a<3?t:null===o?o=Object.getOwnPropertyDescriptor(t,i):o;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)n=Reflect.decorate(e,t,i,o);else for(var s=e.length-1;s>=0;s--)(r=e[s])&&(n=(a<3?r(n):a>3?r(t,i,n):r(t,i))||n);return a>3&&n&&Object.defineProperty(t,i,n),n};let t7=class extends o.oi{constructor(){super(),this.unsubscribe=[],this.tabIdx=void 0,this.connectors=F.ConnectorController.state.connectors,this.unsubscribe.push(F.ConnectorController.subscribeKey("connectors",e=>this.connectors=e))}disconnectedCallback(){this.unsubscribe.forEach(e=>e())}render(){let e=this.connectors.filter(e=>"EXTERNAL"===e.type).filter(t3.C.showConnector).filter(e=>e.id!==K.b.CONNECTOR_ID.COINBASE_SDK);return e?.length?(0,o.dy)`
      <wui-flex flexDirection="column" gap="xs">
        ${e.map(e=>(0,o.dy)`
            <wui-list-wallet
              imageSrc=${(0,a.o)(s.f.getConnectorImage(e))}
              .installed=${!0}
              name=${e.name??"Unknown"}
              data-testid=${`wallet-selector-external-${e.id}`}
              @click=${()=>this.onConnector(e)}
              tabIdx=${(0,a.o)(this.tabIdx)}
            >
            </wui-list-wallet>
          `)}
      </wui-flex>
    `:(this.style.cssText="display: none",null)}onConnector(e){Y.RouterController.push("ConnectingExternal",{connector:e})}};t6([(0,r.Cb)()],t7.prototype,"tabIdx",void 0),t6([(0,r.SB)()],t7.prototype,"connectors",void 0),t7=t6([(0,h.Mo)("w3m-connect-external-widget")],t7);var t8=function(e,t,i,o){var r,a=arguments.length,n=a<3?t:null===o?o=Object.getOwnPropertyDescriptor(t,i):o;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)n=Reflect.decorate(e,t,i,o);else for(var s=e.length-1;s>=0;s--)(r=e[s])&&(n=(a<3?r(n):a>3?r(t,i,n):r(t,i))||n);return a>3&&n&&Object.defineProperty(t,i,n),n};let t9=class extends o.oi{constructor(){super(...arguments),this.tabIdx=void 0,this.wallets=[]}render(){return this.wallets.length?(0,o.dy)`
      <wui-flex flexDirection="column" gap="xs">
        ${this.wallets.map(e=>(0,o.dy)`
            <wui-list-wallet
              data-testid=${`wallet-selector-featured-${e.id}`}
              imageSrc=${(0,a.o)(s.f.getWalletImage(e))}
              name=${e.name??"Unknown"}
              @click=${()=>this.onConnectWallet(e)}
              tabIdx=${(0,a.o)(this.tabIdx)}
            >
            </wui-list-wallet>
          `)}
      </wui-flex>
    `:(this.style.cssText="display: none",null)}onConnectWallet(e){F.ConnectorController.selectWalletConnector(e)}};t8([(0,r.Cb)()],t9.prototype,"tabIdx",void 0),t8([(0,r.Cb)()],t9.prototype,"wallets",void 0),t9=t8([(0,h.Mo)("w3m-connect-featured-widget")],t9);var ie=function(e,t,i,o){var r,a=arguments.length,n=a<3?t:null===o?o=Object.getOwnPropertyDescriptor(t,i):o;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)n=Reflect.decorate(e,t,i,o);else for(var s=e.length-1;s>=0;s--)(r=e[s])&&(n=(a<3?r(n):a>3?r(t,i,n):r(t,i))||n);return a>3&&n&&Object.defineProperty(t,i,n),n};let it=class extends o.oi{constructor(){super(...arguments),this.tabIdx=void 0,this.connectors=[]}render(){let e=this.connectors.filter(t3.C.showConnector);return 0===e.length?(this.style.cssText="display: none",null):(0,o.dy)`
      <wui-flex flexDirection="column" gap="xs">
        ${e.map(e=>(0,o.dy)`
            <wui-list-wallet
              imageSrc=${(0,a.o)(s.f.getConnectorImage(e))}
              .installed=${!0}
              name=${e.name??"Unknown"}
              tagVariant="success"
              tagLabel="installed"
              data-testid=${`wallet-selector-${e.id}`}
              @click=${()=>this.onConnector(e)}
              tabIdx=${(0,a.o)(this.tabIdx)}
            >
            </wui-list-wallet>
          `)}
      </wui-flex>
    `}onConnector(e){F.ConnectorController.setActiveConnector(e),Y.RouterController.push("ConnectingExternal",{connector:e})}};ie([(0,r.Cb)()],it.prototype,"tabIdx",void 0),ie([(0,r.Cb)()],it.prototype,"connectors",void 0),it=ie([(0,h.Mo)("w3m-connect-injected-widget")],it);var ii=function(e,t,i,o){var r,a=arguments.length,n=a<3?t:null===o?o=Object.getOwnPropertyDescriptor(t,i):o;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)n=Reflect.decorate(e,t,i,o);else for(var s=e.length-1;s>=0;s--)(r=e[s])&&(n=(a<3?r(n):a>3?r(t,i,n):r(t,i))||n);return a>3&&n&&Object.defineProperty(t,i,n),n};let io=class extends o.oi{constructor(){super(),this.unsubscribe=[],this.tabIdx=void 0,this.connectors=F.ConnectorController.state.connectors,this.unsubscribe.push(F.ConnectorController.subscribeKey("connectors",e=>this.connectors=e))}disconnectedCallback(){this.unsubscribe.forEach(e=>e())}render(){let e=this.connectors.filter(e=>"MULTI_CHAIN"===e.type&&"WalletConnect"!==e.name);return e?.length?(0,o.dy)`
      <wui-flex flexDirection="column" gap="xs">
        ${e.map(e=>(0,o.dy)`
            <wui-list-wallet
              imageSrc=${(0,a.o)(s.f.getConnectorImage(e))}
              .installed=${!0}
              name=${e.name??"Unknown"}
              tagVariant="shade"
              tagLabel="multichain"
              data-testid=${`wallet-selector-${e.id}`}
              @click=${()=>this.onConnector(e)}
              tabIdx=${(0,a.o)(this.tabIdx)}
            >
            </wui-list-wallet>
          `)}
      </wui-flex>
    `:(this.style.cssText="display: none",null)}onConnector(e){F.ConnectorController.setActiveConnector(e),Y.RouterController.push("ConnectingMultiChain")}};ii([(0,r.Cb)()],io.prototype,"tabIdx",void 0),ii([(0,r.SB)()],io.prototype,"connectors",void 0),io=ii([(0,h.Mo)("w3m-connect-multi-chain-widget")],io);var ir=function(e,t,i,o){var r,a=arguments.length,n=a<3?t:null===o?o=Object.getOwnPropertyDescriptor(t,i):o;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)n=Reflect.decorate(e,t,i,o);else for(var s=e.length-1;s>=0;s--)(r=e[s])&&(n=(a<3?r(n):a>3?r(t,i,n):r(t,i))||n);return a>3&&n&&Object.defineProperty(t,i,n),n};let ia=class extends o.oi{constructor(){super(),this.unsubscribe=[],this.tabIdx=void 0,this.connectors=F.ConnectorController.state.connectors,this.loading=!1,this.unsubscribe.push(F.ConnectorController.subscribeKey("connectors",e=>this.connectors=e)),u.j.isTelegram()&&u.j.isIos()&&(this.loading=!Z.ConnectionController.state.wcUri,this.unsubscribe.push(Z.ConnectionController.subscribeKey("wcUri",e=>this.loading=!e)))}render(){let e=eo.M.getRecentWallets().filter(e=>!tp.J.isExcluded(e)).filter(e=>!this.hasWalletConnector(e)).filter(e=>this.isWalletCompatibleWithCurrentChain(e));return e.length?(0,o.dy)`
      <wui-flex flexDirection="column" gap="xs">
        ${e.map(e=>(0,o.dy)`
            <wui-list-wallet
              imageSrc=${(0,a.o)(s.f.getWalletImage(e))}
              name=${e.name??"Unknown"}
              @click=${()=>this.onConnectWallet(e)}
              tagLabel="recent"
              tagVariant="shade"
              tabIdx=${(0,a.o)(this.tabIdx)}
              ?loading=${this.loading}
            >
            </wui-list-wallet>
          `)}
      </wui-flex>
    `:(this.style.cssText="display: none",null)}onConnectWallet(e){this.loading||F.ConnectorController.selectWalletConnector(e)}hasWalletConnector(e){return this.connectors.some(t=>t.id===e.id||t.name===e.name)}isWalletCompatibleWithCurrentChain(e){let t=n.R.state.activeChain;return!t||!e.chains||e.chains.some(e=>t===e.split(":")[0])}};ir([(0,r.Cb)()],ia.prototype,"tabIdx",void 0),ir([(0,r.SB)()],ia.prototype,"connectors",void 0),ir([(0,r.SB)()],ia.prototype,"loading",void 0),ia=ir([(0,h.Mo)("w3m-connect-recent-widget")],ia);var is=function(e,t,i,o){var r,a=arguments.length,n=a<3?t:null===o?o=Object.getOwnPropertyDescriptor(t,i):o;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)n=Reflect.decorate(e,t,i,o);else for(var s=e.length-1;s>=0;s--)(r=e[s])&&(n=(a<3?r(n):a>3?r(t,i,n):r(t,i))||n);return a>3&&n&&Object.defineProperty(t,i,n),n};let il=class extends o.oi{constructor(){super(),this.unsubscribe=[],this.tabIdx=void 0,this.wallets=[],this.loading=!1,u.j.isTelegram()&&u.j.isIos()&&(this.loading=!Z.ConnectionController.state.wcUri,this.unsubscribe.push(Z.ConnectionController.subscribeKey("wcUri",e=>this.loading=!e)))}render(){let{connectors:e}=F.ConnectorController.state,{customWallets:t,featuredWalletIds:i}=l.OptionsController.state,r=eo.M.getRecentWallets(),n=e.find(e=>"walletConnect"===e.id),c=e.filter(e=>"INJECTED"===e.type||"ANNOUNCED"===e.type||"MULTI_CHAIN"===e.type).filter(e=>"Browser Wallet"!==e.name);if(!n)return null;if(i||t||!this.wallets.length)return this.style.cssText="display: none",null;let d=c.length+r.length,u=tp.J.filterOutDuplicateWallets(this.wallets).slice(0,Math.max(0,2-d));return u.length?(0,o.dy)`
      <wui-flex flexDirection="column" gap="xs">
        ${u.map(e=>(0,o.dy)`
            <wui-list-wallet
              imageSrc=${(0,a.o)(s.f.getWalletImage(e))}
              name=${e?.name??"Unknown"}
              @click=${()=>this.onConnectWallet(e)}
              tabIdx=${(0,a.o)(this.tabIdx)}
              ?loading=${this.loading}
            >
            </wui-list-wallet>
          `)}
      </wui-flex>
    `:(this.style.cssText="display: none",null)}onConnectWallet(e){if(this.loading)return;let t=F.ConnectorController.getConnector(e.id,e.rdns);t?Y.RouterController.push("ConnectingExternal",{connector:t}):Y.RouterController.push("ConnectingWalletConnect",{wallet:e})}};is([(0,r.Cb)()],il.prototype,"tabIdx",void 0),is([(0,r.Cb)()],il.prototype,"wallets",void 0),is([(0,r.SB)()],il.prototype,"loading",void 0),il=is([(0,h.Mo)("w3m-connect-recommended-widget")],il);var ic=function(e,t,i,o){var r,a=arguments.length,n=a<3?t:null===o?o=Object.getOwnPropertyDescriptor(t,i):o;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)n=Reflect.decorate(e,t,i,o);else for(var s=e.length-1;s>=0;s--)(r=e[s])&&(n=(a<3?r(n):a>3?r(t,i,n):r(t,i))||n);return a>3&&n&&Object.defineProperty(t,i,n),n};let id=class extends o.oi{constructor(){super(),this.unsubscribe=[],this.tabIdx=void 0,this.connectors=F.ConnectorController.state.connectors,this.connectorImages=c.W.state.connectorImages,this.unsubscribe.push(F.ConnectorController.subscribeKey("connectors",e=>this.connectors=e),c.W.subscribeKey("connectorImages",e=>this.connectorImages=e))}disconnectedCallback(){this.unsubscribe.forEach(e=>e())}render(){if(u.j.isMobile())return this.style.cssText="display: none",null;let e=this.connectors.find(e=>"walletConnect"===e.id);if(!e)return this.style.cssText="display: none",null;let t=e.imageUrl||this.connectorImages[e?.imageId??""];return(0,o.dy)`
      <wui-list-wallet
        imageSrc=${(0,a.o)(t)}
        name=${e.name??"Unknown"}
        @click=${()=>this.onConnector(e)}
        tagLabel="qr code"
        tagVariant="main"
        tabIdx=${(0,a.o)(this.tabIdx)}
        data-testid="wallet-selector-walletconnect"
      >
      </wui-list-wallet>
    `}onConnector(e){F.ConnectorController.setActiveConnector(e),Y.RouterController.push("ConnectingWalletConnect")}};ic([(0,r.Cb)()],id.prototype,"tabIdx",void 0),ic([(0,r.SB)()],id.prototype,"connectors",void 0),ic([(0,r.SB)()],id.prototype,"connectorImages",void 0),id=ic([(0,h.Mo)("w3m-connect-walletconnect-widget")],id);var iu=(0,o.iv)`
  :host {
    margin-top: var(--wui-spacing-3xs);
  }
  wui-separator {
    margin: var(--wui-spacing-m) calc(var(--wui-spacing-m) * -1) var(--wui-spacing-xs)
      calc(var(--wui-spacing-m) * -1);
    width: calc(100% + var(--wui-spacing-s) * 2);
  }
`,ip=function(e,t,i,o){var r,a=arguments.length,n=a<3?t:null===o?o=Object.getOwnPropertyDescriptor(t,i):o;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)n=Reflect.decorate(e,t,i,o);else for(var s=e.length-1;s>=0;s--)(r=e[s])&&(n=(a<3?r(n):a>3?r(t,i,n):r(t,i))||n);return a>3&&n&&Object.defineProperty(t,i,n),n};let ih=class extends o.oi{constructor(){super(),this.unsubscribe=[],this.tabIdx=void 0,this.connectors=F.ConnectorController.state.connectors,this.recommended=tr.ApiController.state.recommended,this.featured=tr.ApiController.state.featured,this.unsubscribe.push(F.ConnectorController.subscribeKey("connectors",e=>this.connectors=e),tr.ApiController.subscribeKey("recommended",e=>this.recommended=e),tr.ApiController.subscribeKey("featured",e=>this.featured=e))}disconnectedCallback(){this.unsubscribe.forEach(e=>e())}render(){return(0,o.dy)`
      <wui-flex flexDirection="column" gap="xs"> ${this.connectorListTemplate()} </wui-flex>
    `}connectorListTemplate(){let{custom:e,recent:t,announced:i,injected:r,multiChain:n,recommended:s,featured:l,external:c}=t3.C.getConnectorsByType(this.connectors,this.recommended,this.featured);return t3.C.getConnectorTypeOrder({custom:e,recent:t,announced:i,injected:r,multiChain:n,recommended:s,featured:l,external:c}).map(e=>{switch(e){case"injected":return(0,o.dy)`
            ${n.length?(0,o.dy)`<w3m-connect-multi-chain-widget
                  tabIdx=${(0,a.o)(this.tabIdx)}
                ></w3m-connect-multi-chain-widget>`:null}
            ${i.length?(0,o.dy)`<w3m-connect-announced-widget
                  tabIdx=${(0,a.o)(this.tabIdx)}
                ></w3m-connect-announced-widget>`:null}
            ${r.length?(0,o.dy)`<w3m-connect-injected-widget
                  .connectors=${r}
                  tabIdx=${(0,a.o)(this.tabIdx)}
                ></w3m-connect-injected-widget>`:null}
          `;case"walletConnect":return(0,o.dy)`<w3m-connect-walletconnect-widget
            tabIdx=${(0,a.o)(this.tabIdx)}
          ></w3m-connect-walletconnect-widget>`;case"recent":return(0,o.dy)`<w3m-connect-recent-widget
            tabIdx=${(0,a.o)(this.tabIdx)}
          ></w3m-connect-recent-widget>`;case"featured":return(0,o.dy)`<w3m-connect-featured-widget
            .wallets=${l}
            tabIdx=${(0,a.o)(this.tabIdx)}
          ></w3m-connect-featured-widget>`;case"custom":return(0,o.dy)`<w3m-connect-custom-widget
            tabIdx=${(0,a.o)(this.tabIdx)}
          ></w3m-connect-custom-widget>`;case"external":return(0,o.dy)`<w3m-connect-external-widget
            tabIdx=${(0,a.o)(this.tabIdx)}
          ></w3m-connect-external-widget>`;case"recommended":return(0,o.dy)`<w3m-connect-recommended-widget
            .wallets=${s}
            tabIdx=${(0,a.o)(this.tabIdx)}
          ></w3m-connect-recommended-widget>`;default:return console.warn(`Unknown connector type: ${e}`),null}})}};ih.styles=iu,ip([(0,r.Cb)()],ih.prototype,"tabIdx",void 0),ip([(0,r.SB)()],ih.prototype,"connectors",void 0),ip([(0,r.SB)()],ih.prototype,"recommended",void 0),ip([(0,r.SB)()],ih.prototype,"featured",void 0),ih=ip([(0,h.Mo)("w3m-connector-list")],ih);var iw=function(e,t,i,o){var r,a=arguments.length,n=a<3?t:null===o?o=Object.getOwnPropertyDescriptor(t,i):o;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)n=Reflect.decorate(e,t,i,o);else for(var s=e.length-1;s>=0;s--)(r=e[s])&&(n=(a<3?r(n):a>3?r(t,i,n):r(t,i))||n);return a>3&&n&&Object.defineProperty(t,i,n),n};let ig=class extends o.oi{constructor(){super(...arguments),this.tabIdx=void 0}render(){return(0,o.dy)`
      <wui-flex flexDirection="column" gap="xs">
        <w3m-connector-list tabIdx=${(0,a.o)(this.tabIdx)}></w3m-connector-list>
        <w3m-all-wallets-widget tabIdx=${(0,a.o)(this.tabIdx)}></w3m-all-wallets-widget>
      </wui-flex>
    `}};iw([(0,r.Cb)()],ig.prototype,"tabIdx",void 0),ig=iw([(0,h.Mo)("w3m-wallet-login-list")],ig);var ib=(0,o.iv)`
  :host {
    --connect-scroll--top-opacity: 0;
    --connect-scroll--bottom-opacity: 0;
    --connect-mask-image: none;
  }

  .connect {
    max-height: clamp(360px, 470px, 80vh);
    scrollbar-width: none;
    overflow-y: scroll;
    overflow-x: hidden;
    transition: opacity var(--wui-ease-out-power-1) var(--wui-duration-md);
    will-change: opacity;
    mask-image: var(--connect-mask-image);
  }

  .guide {
    transition: opacity var(--wui-ease-out-power-1) var(--wui-duration-md);
    will-change: opacity;
  }

  .connect::-webkit-scrollbar {
    display: none;
  }

  .all-wallets {
    flex-flow: column;
  }

  .connect.disabled,
  .guide.disabled {
    opacity: 0.3;
    pointer-events: none;
    user-select: none;
  }

  wui-separator {
    margin: var(--wui-spacing-s) calc(var(--wui-spacing-s) * -1);
    width: calc(100% + var(--wui-spacing-s) * 2);
  }
`,im=function(e,t,i,o){var r,a=arguments.length,n=a<3?t:null===o?o=Object.getOwnPropertyDescriptor(t,i):o;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)n=Reflect.decorate(e,t,i,o);else for(var s=e.length-1;s>=0;s--)(r=e[s])&&(n=(a<3?r(n):a>3?r(t,i,n):r(t,i))||n);return a>3&&n&&Object.defineProperty(t,i,n),n};let iv=class extends o.oi{constructor(){super(),this.unsubscribe=[],this.connectors=F.ConnectorController.state.connectors,this.authConnector=this.connectors.find(e=>"AUTH"===e.type),this.features=l.OptionsController.state.features,this.enableWallets=l.OptionsController.state.enableWallets,this.noAdapters=n.R.state.noAdapters,this.walletGuide="get-started",this.checked=tT.M.state.isLegalCheckboxChecked,this.isEmailEnabled=this.features?.email&&!n.R.state.noAdapters,this.isSocialEnabled=this.features?.socials&&this.features.socials.length>0&&!n.R.state.noAdapters,this.isAuthEnabled=this.checkIfAuthEnabled(this.connectors),this.unsubscribe.push(F.ConnectorController.subscribeKey("connectors",e=>{this.connectors=e,this.authConnector=this.connectors.find(e=>"AUTH"===e.type),this.isAuthEnabled=this.checkIfAuthEnabled(this.connectors)}),l.OptionsController.subscribeKey("features",e=>this.setEmailAndSocialEnableCheck(e,this.noAdapters)),l.OptionsController.subscribeKey("enableWallets",e=>this.enableWallets=e),n.R.subscribeKey("noAdapters",e=>this.setEmailAndSocialEnableCheck(this.features,e)),tT.M.subscribeKey("isLegalCheckboxChecked",e=>this.checked=e))}disconnectedCallback(){this.unsubscribe.forEach(e=>e()),this.resizeObserver?.disconnect();let e=this.shadowRoot?.querySelector(".connect");e?.removeEventListener("scroll",this.handleConnectListScroll.bind(this))}firstUpdated(){let e=this.shadowRoot?.querySelector(".connect");e&&(requestAnimationFrame(this.handleConnectListScroll.bind(this)),e?.addEventListener("scroll",this.handleConnectListScroll.bind(this)),this.resizeObserver=new ResizeObserver(()=>{this.handleConnectListScroll()}),this.resizeObserver?.observe(e),this.handleConnectListScroll())}render(){let{termsConditionsUrl:e,privacyPolicyUrl:t}=l.OptionsController.state,i=l.OptionsController.state.features?.legalCheckbox,r=!!(e||t)&&!!i&&"get-started"===this.walletGuide&&!this.checked,a=l.OptionsController.state.enableWalletGuide,n=this.enableWallets,s=this.isSocialEnabled||this.authConnector,c=r?-1:void 0;return(0,o.dy)`
      <wui-flex flexDirection="column">
        ${this.legalCheckboxTemplate()}
        <wui-flex
          data-testid="w3m-connect-scroll-view"
          flexDirection="column"
          class=${(0,tR.$)({connect:!0,disabled:r})}
        >
          <wui-flex
            class="connect-methods"
            flexDirection="column"
            gap="s"
            .padding=${s&&n&&a&&"get-started"===this.walletGuide?["3xs","s","0","s"]:["3xs","s","s","s"]}
          >
            ${this.renderConnectMethod(c)}
          </wui-flex>
        </wui-flex>
        ${this.guideTemplate(r)}
        <w3m-legal-footer></w3m-legal-footer>
      </wui-flex>
    `}setEmailAndSocialEnableCheck(e,t){this.isEmailEnabled=e?.email&&!t,this.isSocialEnabled=e?.socials&&e.socials.length>0&&!t,this.features=e,this.noAdapters=t}checkIfAuthEnabled(e){let t=e.filter(e=>e.type===tE.b.CONNECTOR_TYPE_AUTH).map(e=>e.chain);return K.b.AUTH_CONNECTOR_SUPPORTED_CHAINS.some(e=>t.includes(e))}renderConnectMethod(e){let t=tp.J.getConnectOrderMethod(this.features,this.connectors);return(0,o.dy)`${t.map((t,i)=>{switch(t){case"email":return(0,o.dy)`${this.emailTemplate(e)} ${this.separatorTemplate(i,"email")}`;case"social":return(0,o.dy)`${this.socialListTemplate(e)}
          ${this.separatorTemplate(i,"social")}`;case"wallet":return(0,o.dy)`${this.walletListTemplate(e)}
          ${this.separatorTemplate(i,"wallet")}`;default:return null}})}`}checkMethodEnabled(e){switch(e){case"wallet":return this.enableWallets;case"social":return this.isSocialEnabled&&this.isAuthEnabled;case"email":return this.isEmailEnabled&&this.isAuthEnabled;default:return null}}checkIsThereNextMethod(e){let t=tp.J.getConnectOrderMethod(this.features,this.connectors)[e+1];return t?this.checkMethodEnabled(t)?t:this.checkIsThereNextMethod(e+1):void 0}separatorTemplate(e,t){let i=this.checkIsThereNextMethod(e),r="explore"===this.walletGuide;switch(t){case"wallet":return this.enableWallets&&i&&!r?(0,o.dy)`<wui-separator data-testid="wui-separator" text="or"></wui-separator>`:null;case"email":return this.isAuthEnabled&&this.isEmailEnabled&&"social"!==i&&i?(0,o.dy)`<wui-separator
              data-testid="w3m-email-login-or-separator"
              text="or"
            ></wui-separator>`:null;case"social":return this.isAuthEnabled&&this.isSocialEnabled&&"email"!==i&&i?(0,o.dy)`<wui-separator data-testid="wui-separator" text="or"></wui-separator>`:null;default:return null}}emailTemplate(e){return this.isEmailEnabled&&this.isAuthEnabled?(0,o.dy)`<w3m-email-login-widget
      walletGuide=${this.walletGuide}
      tabIdx=${(0,a.o)(e)}
    ></w3m-email-login-widget>`:null}socialListTemplate(e){return this.isSocialEnabled&&this.isAuthEnabled?(0,o.dy)`<w3m-social-login-widget
      walletGuide=${this.walletGuide}
      tabIdx=${(0,a.o)(e)}
    ></w3m-social-login-widget>`:null}walletListTemplate(e){let t=this.enableWallets,i=this.features?.emailShowWallets===!1,r=this.features?.collapseWallets;return t?((u.j.isTelegram()||u.j.isSafari())&&u.j.isIos()&&Z.ConnectionController.connectWalletConnect().catch(e=>({})),"explore"===this.walletGuide)?null:this.isAuthEnabled&&(this.isEmailEnabled||this.isSocialEnabled)&&(i||r)?(0,o.dy)`<wui-list-button
        data-testid="w3m-collapse-wallets-button"
        tabIdx=${(0,a.o)(e)}
        @click=${this.onContinueWalletClick.bind(this)}
        text="Continue with a wallet"
      ></wui-list-button>`:(0,o.dy)`<w3m-wallet-login-list tabIdx=${(0,a.o)(e)}></w3m-wallet-login-list>`:null}guideTemplate(e=!1){return l.OptionsController.state.enableWalletGuide&&(this.authConnector||this.isSocialEnabled)?(0,o.dy)`
      ${"explore"!==this.walletGuide||n.R.state.noAdapters?null:(0,o.dy)`<wui-separator data-testid="wui-separator" id="explore" text="or"></wui-separator>`}
      <wui-flex flexDirection="column" .padding=${["l","0","0","0"]} class=${(0,tR.$)({guide:!0,disabled:e})}>
        <w3m-wallet-guide
          tabIdx=${(0,a.o)(e?-1:void 0)}
          walletGuide=${this.walletGuide}
        ></w3m-wallet-guide>
      </wui-flex>
    `:null}legalCheckboxTemplate(){return"explore"===this.walletGuide?null:(0,o.dy)`<w3m-legal-checkbox data-testid="w3m-legal-checkbox"></w3m-legal-checkbox>`}handleConnectListScroll(){let e=this.shadowRoot?.querySelector(".connect");e&&(e.scrollHeight>470?(e.style.setProperty("--connect-mask-image",`linear-gradient(
          to bottom,
          rgba(0, 0, 0, calc(1 - var(--connect-scroll--top-opacity))) 0px,
          rgba(200, 200, 200, calc(1 - var(--connect-scroll--top-opacity))) 1px,
          black 40px,
          black calc(100% - 40px),
          rgba(155, 155, 155, calc(1 - var(--connect-scroll--bottom-opacity))) calc(100% - 1px),
          rgba(0, 0, 0, calc(1 - var(--connect-scroll--bottom-opacity))) 100%
        )`),e.style.setProperty("--connect-scroll--top-opacity",h.kj.interpolate([0,50],[0,1],e.scrollTop).toString()),e.style.setProperty("--connect-scroll--bottom-opacity",h.kj.interpolate([0,50],[0,1],e.scrollHeight-e.scrollTop-e.offsetHeight).toString())):(e.style.setProperty("--connect-mask-image","none"),e.style.setProperty("--connect-scroll--top-opacity","0"),e.style.setProperty("--connect-scroll--bottom-opacity","0")))}onContinueWalletClick(){Y.RouterController.push("ConnectWallets")}};iv.styles=ib,im([(0,tS.S)()],iv.prototype,"connectors",void 0),im([(0,tS.S)()],iv.prototype,"authConnector",void 0),im([(0,tS.S)()],iv.prototype,"features",void 0),im([(0,tS.S)()],iv.prototype,"enableWallets",void 0),im([(0,tS.S)()],iv.prototype,"noAdapters",void 0),im([(0,r.Cb)()],iv.prototype,"walletGuide",void 0),im([(0,tS.S)()],iv.prototype,"checked",void 0),im([(0,tS.S)()],iv.prototype,"isEmailEnabled",void 0),im([(0,tS.S)()],iv.prototype,"isSocialEnabled",void 0),im([(0,tS.S)()],iv.prototype,"isAuthEnabled",void 0),iv=im([(0,h.Mo)("w3m-connect-view")],iv);var iy=i(88383);i(96742),i(14909);var ix=(0,o.iv)`
  wui-flex {
    width: 100%;
    background-color: var(--wui-color-gray-glass-002);
    border-radius: var(--wui-border-radius-xs);
  }
`,iC=function(e,t,i,o){var r,a=arguments.length,n=a<3?t:null===o?o=Object.getOwnPropertyDescriptor(t,i):o;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)n=Reflect.decorate(e,t,i,o);else for(var s=e.length-1;s>=0;s--)(r=e[s])&&(n=(a<3?r(n):a>3?r(t,i,n):r(t,i))||n);return a>3&&n&&Object.defineProperty(t,i,n),n};let ik=class extends o.oi{constructor(){super(...arguments),this.disabled=!1,this.label="",this.buttonLabel=""}render(){return(0,o.dy)`
      <wui-flex
        justifyContent="space-between"
        alignItems="center"
        .padding=${["1xs","2l","1xs","2l"]}
      >
        <wui-text variant="paragraph-500" color="fg-200">${this.label}</wui-text>
        <wui-chip-button size="sm" variant="shade" text=${this.buttonLabel} icon="chevronRight">
        </wui-chip-button>
      </wui-flex>
    `}};ik.styles=[w.ET,w.ZM,ix],iC([(0,r.Cb)({type:Boolean})],ik.prototype,"disabled",void 0),iC([(0,r.Cb)()],ik.prototype,"label",void 0),iC([(0,r.Cb)()],ik.prototype,"buttonLabel",void 0),ik=iC([(0,b.M)("wui-cta-button")],ik);var i$=(0,o.iv)`
  :host {
    display: block;
    padding: 0 var(--wui-spacing-xl) var(--wui-spacing-xl);
  }
`,iS=function(e,t,i,o){var r,a=arguments.length,n=a<3?t:null===o?o=Object.getOwnPropertyDescriptor(t,i):o;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)n=Reflect.decorate(e,t,i,o);else for(var s=e.length-1;s>=0;s--)(r=e[s])&&(n=(a<3?r(n):a>3?r(t,i,n):r(t,i))||n);return a>3&&n&&Object.defineProperty(t,i,n),n};let iR=class extends o.oi{constructor(){super(...arguments),this.wallet=void 0}render(){if(!this.wallet)return this.style.display="none",null;let{name:e,app_store:t,play_store:i,chrome_store:r,homepage:a}=this.wallet,n=u.j.isMobile(),s=u.j.isIos(),l=u.j.isAndroid(),c=[t,i,a,r].filter(Boolean).length>1,d=h.Hg.getTruncateString({string:e,charsStart:12,charsEnd:0,truncate:"end"});return c&&!n?(0,o.dy)`
        <wui-cta-button
          label=${`Don't have ${d}?`}
          buttonLabel="Get"
          @click=${()=>Y.RouterController.push("Downloads",{wallet:this.wallet})}
        ></wui-cta-button>
      `:!c&&a?(0,o.dy)`
        <wui-cta-button
          label=${`Don't have ${d}?`}
          buttonLabel="Get"
          @click=${this.onHomePage.bind(this)}
        ></wui-cta-button>
      `:t&&s?(0,o.dy)`
        <wui-cta-button
          label=${`Don't have ${d}?`}
          buttonLabel="Get"
          @click=${this.onAppStore.bind(this)}
        ></wui-cta-button>
      `:i&&l?(0,o.dy)`
        <wui-cta-button
          label=${`Don't have ${d}?`}
          buttonLabel="Get"
          @click=${this.onPlayStore.bind(this)}
        ></wui-cta-button>
      `:(this.style.display="none",null)}onAppStore(){this.wallet?.app_store&&u.j.openHref(this.wallet.app_store,"_blank")}onPlayStore(){this.wallet?.play_store&&u.j.openHref(this.wallet.play_store,"_blank")}onHomePage(){this.wallet?.homepage&&u.j.openHref(this.wallet.homepage,"_blank")}};iR.styles=[i$],iS([(0,r.Cb)({type:Object})],iR.prototype,"wallet",void 0),iR=iS([(0,h.Mo)("w3m-mobile-download-links")],iR);var iT=(0,o.iv)`
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
`,iA=function(e,t,i,o){var r,a=arguments.length,n=a<3?t:null===o?o=Object.getOwnPropertyDescriptor(t,i):o;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)n=Reflect.decorate(e,t,i,o);else for(var s=e.length-1;s>=0;s--)(r=e[s])&&(n=(a<3?r(n):a>3?r(t,i,n):r(t,i))||n);return a>3&&n&&Object.defineProperty(t,i,n),n};class iI extends o.oi{constructor(){super(),this.wallet=Y.RouterController.state.data?.wallet,this.connector=Y.RouterController.state.data?.connector,this.timeout=void 0,this.secondaryBtnIcon="refresh",this.onConnect=void 0,this.onRender=void 0,this.onAutoConnect=void 0,this.isWalletConnect=!0,this.unsubscribe=[],this.imageSrc=s.f.getWalletImage(this.wallet)??s.f.getConnectorImage(this.connector),this.name=this.wallet?.name??this.connector?.name??"Wallet",this.isRetrying=!1,this.uri=Z.ConnectionController.state.wcUri,this.error=Z.ConnectionController.state.wcError,this.ready=!1,this.showRetry=!1,this.secondaryBtnLabel="Try again",this.secondaryLabel="Accept connection request in the wallet",this.buffering=!1,this.isLoading=!1,this.isMobile=!1,this.onRetry=void 0,this.unsubscribe.push(Z.ConnectionController.subscribeKey("wcUri",e=>{this.uri=e,this.isRetrying&&this.onRetry&&(this.isRetrying=!1,this.onConnect?.())}),Z.ConnectionController.subscribeKey("wcError",e=>this.error=e),Z.ConnectionController.subscribeKey("buffering",e=>this.buffering=e)),(u.j.isTelegram()||u.j.isSafari())&&u.j.isIos()&&Z.ConnectionController.state.wcUri&&this.onConnect?.()}firstUpdated(){this.onAutoConnect?.(),this.showRetry=!this.onAutoConnect}disconnectedCallback(){this.unsubscribe.forEach(e=>e()),clearTimeout(this.timeout)}render(){this.onRender?.(),this.onShowRetry();let e=this.error?"Connection can be declined if a previous request is still active":this.secondaryLabel,t=`Continue in ${this.name}`;return this.buffering&&(t="Connecting..."),this.error&&(t="Connection declined"),(0,o.dy)`
      <wui-flex
        data-error=${(0,a.o)(this.error)}
        data-retry=${this.showRetry}
        flexDirection="column"
        alignItems="center"
        .padding=${["3xl","xl","xl","xl"]}
        gap="xl"
      >
        <wui-flex justifyContent="center" alignItems="center">
          <wui-wallet-image size="lg" imageSrc=${(0,a.o)(this.imageSrc)}></wui-wallet-image>

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

        ${this.secondaryBtnLabel?(0,o.dy)`
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

      ${this.isWalletConnect?(0,o.dy)`
            <wui-flex .padding=${["0","xl","xl","xl"]} justifyContent="center">
              <wui-link @click=${this.onCopyUri} color="fg-200" data-testid="wui-link-copy">
                <wui-icon size="xs" color="fg-200" slot="iconLeft" name="copy"></wui-icon>
                Copy link
              </wui-link>
            </wui-flex>
          `:null}

      <w3m-mobile-download-links .wallet=${this.wallet}></w3m-mobile-download-links>
    `}onShowRetry(){if(this.error&&!this.showRetry){this.showRetry=!0;let e=this.shadowRoot?.querySelector("wui-button");e?.animate([{opacity:0},{opacity:1}],{fill:"forwards",easing:"ease"})}}onTryAgain(){this.buffering||(Z.ConnectionController.setWcError(!1),this.onRetry?(this.isRetrying=!0,this.onRetry?.()):this.onConnect?.())}loaderTemplate(){let e=iy.ThemeController.state.themeVariables["--w3m-border-radius-master"],t=e?parseInt(e.replace("px",""),10):4;return(0,o.dy)`<wui-loading-thumbnail radius=${9*t}></wui-loading-thumbnail>`}onCopyUri(){try{this.uri&&(u.j.copyToClopboard(this.uri),X.SnackController.showSuccess("Link copied"))}catch{X.SnackController.showError("Failed to copy")}}}iI.styles=iT,iA([(0,r.SB)()],iI.prototype,"isRetrying",void 0),iA([(0,r.SB)()],iI.prototype,"uri",void 0),iA([(0,r.SB)()],iI.prototype,"error",void 0),iA([(0,r.SB)()],iI.prototype,"ready",void 0),iA([(0,r.SB)()],iI.prototype,"showRetry",void 0),iA([(0,r.SB)()],iI.prototype,"secondaryBtnLabel",void 0),iA([(0,r.SB)()],iI.prototype,"secondaryLabel",void 0),iA([(0,r.SB)()],iI.prototype,"buffering",void 0),iA([(0,r.SB)()],iI.prototype,"isLoading",void 0),iA([(0,r.Cb)({type:Boolean})],iI.prototype,"isMobile",void 0),iA([(0,r.Cb)()],iI.prototype,"onRetry",void 0);let iO=class extends iI{constructor(){if(super(),this.externalViewUnsubscribe=[],!this.connector)throw Error("w3m-connecting-view: No connector provided");D.X.sendEvent({type:"track",event:"SELECT_WALLET",properties:{name:this.connector.name??"Unknown",platform:"browser"}}),this.onConnect=this.onConnectProxy.bind(this),this.onAutoConnect=this.onConnectProxy.bind(this),this.isWalletConnect=!1,this.externalViewUnsubscribe.push(n.R.subscribeKey("activeCaipAddress",e=>{e&&p.I.close()}))}disconnectedCallback(){this.externalViewUnsubscribe.forEach(e=>e())}async onConnectProxy(){try{this.error=!1,this.connector&&(this.connector.id!==K.b.CONNECTOR_ID.COINBASE_SDK||!this.error)&&(await Z.ConnectionController.connectExternal(this.connector,this.connector.chain),D.X.sendEvent({type:"track",event:"CONNECT_SUCCESS",properties:{method:"browser",name:this.connector.name||"Unknown"}}))}catch(e){D.X.sendEvent({type:"track",event:"CONNECT_ERROR",properties:{message:e?.message??"Unknown"}}),this.error=!0}}};iO=function(e,t,i,o){var r,a=arguments.length,n=a<3?t:null===o?o=Object.getOwnPropertyDescriptor(t,i):o;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)n=Reflect.decorate(e,t,i,o);else for(var s=e.length-1;s>=0;s--)(r=e[s])&&(n=(a<3?r(n):a>3?r(t,i,n):r(t,i))||n);return a>3&&n&&Object.defineProperty(t,i,n),n}([(0,h.Mo)("w3m-connecting-external-view")],iO);var iE=(0,o.iv)`
  wui-flex,
  wui-list-wallet {
    width: 100%;
  }
`,ij=function(e,t,i,o){var r,a=arguments.length,n=a<3?t:null===o?o=Object.getOwnPropertyDescriptor(t,i):o;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)n=Reflect.decorate(e,t,i,o);else for(var s=e.length-1;s>=0;s--)(r=e[s])&&(n=(a<3?r(n):a>3?r(t,i,n):r(t,i))||n);return a>3&&n&&Object.defineProperty(t,i,n),n};let iN=class extends o.oi{constructor(){super(),this.unsubscribe=[],this.activeConnector=F.ConnectorController.state.activeConnector,this.unsubscribe.push(F.ConnectorController.subscribeKey("activeConnector",e=>this.activeConnector=e))}disconnectedCallback(){this.unsubscribe.forEach(e=>e())}render(){return(0,o.dy)`
      <wui-flex
        flexDirection="column"
        alignItems="center"
        .padding=${["m","xl","xl","xl"]}
        gap="xl"
      >
        <wui-flex justifyContent="center" alignItems="center">
          <wui-wallet-image
            size="lg"
            imageSrc=${(0,a.o)(s.f.getConnectorImage(this.activeConnector))}
          ></wui-wallet-image>
        </wui-flex>
        <wui-flex
          flexDirection="column"
          alignItems="center"
          gap="xs"
          .padding=${["0","s","0","s"]}
        >
          <wui-text variant="paragraph-500" color="fg-100">
            Select Chain for ${this.activeConnector?.name}
          </wui-text>
          <wui-text align="center" variant="small-500" color="fg-200"
            >Select which chain to connect to your multi chain wallet</wui-text
          >
        </wui-flex>
        <wui-flex
          flexGrow="1"
          flexDirection="column"
          alignItems="center"
          gap="xs"
          .padding=${["xs","0","xs","0"]}
        >
          ${this.networksTemplate()}
        </wui-flex>
      </wui-flex>
    `}networksTemplate(){return this.activeConnector?.connectors?.map(e=>e.name?o.dy`
            <wui-list-wallet
              imageSrc=${a.o(s.f.getChainImage(e.chain))}
              name=${K.b.CHAIN_NAME_MAP[e.chain]}
              @click=${()=>this.onConnector(e)}
              data-testid="wui-list-chain-${e.chain}"
            ></wui-list-wallet>
          `:null)}onConnector(e){let t=this.activeConnector?.connectors?.find(t=>t.chain===e.chain);if(!t){X.SnackController.showError("Failed to find connector");return}"walletConnect"===t.id?u.j.isMobile()?Y.RouterController.push("AllWallets"):Y.RouterController.push("ConnectingWalletConnect"):Y.RouterController.push("ConnectingExternal",{connector:t})}};iN.styles=iE,ij([(0,r.SB)()],iN.prototype,"activeConnector",void 0),iN=ij([(0,h.Mo)("w3m-connecting-multi-chain-view")],iN);var iP=function(e,t,i,o){var r,a=arguments.length,n=a<3?t:null===o?o=Object.getOwnPropertyDescriptor(t,i):o;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)n=Reflect.decorate(e,t,i,o);else for(var s=e.length-1;s>=0;s--)(r=e[s])&&(n=(a<3?r(n):a>3?r(t,i,n):r(t,i))||n);return a>3&&n&&Object.defineProperty(t,i,n),n};let iB=class extends o.oi{constructor(){super(),this.platformTabs=[],this.unsubscribe=[],this.platforms=[],this.onSelectPlatfrom=void 0,this.buffering=!1,this.unsubscribe.push(Z.ConnectionController.subscribeKey("buffering",e=>this.buffering=e))}disconnectCallback(){this.unsubscribe.forEach(e=>e())}render(){let e=this.generateTabs();return(0,o.dy)`
      <wui-flex justifyContent="center" .padding=${["0","0","l","0"]}>
        <wui-tabs
          ?disabled=${this.buffering}
          .tabs=${e}
          .onTabChange=${this.onTabChange.bind(this)}
        ></wui-tabs>
      </wui-flex>
    `}generateTabs(){let e=this.platforms.map(e=>"browser"===e?{label:"Browser",icon:"extension",platform:"browser"}:"mobile"===e?{label:"Mobile",icon:"mobile",platform:"mobile"}:"qrcode"===e?{label:"Mobile",icon:"mobile",platform:"qrcode"}:"web"===e?{label:"Webapp",icon:"browser",platform:"web"}:"desktop"===e?{label:"Desktop",icon:"desktop",platform:"desktop"}:{label:"Browser",icon:"extension",platform:"unsupported"});return this.platformTabs=e.map(({platform:e})=>e),e}onTabChange(e){let t=this.platformTabs[e];t&&this.onSelectPlatfrom?.(t)}};iP([(0,r.Cb)({type:Array})],iB.prototype,"platforms",void 0),iP([(0,r.Cb)()],iB.prototype,"onSelectPlatfrom",void 0),iP([(0,r.SB)()],iB.prototype,"buffering",void 0),iB=iP([(0,h.Mo)("w3m-connecting-header")],iB);let iD=class extends iI{constructor(){if(super(),!this.wallet)throw Error("w3m-connecting-wc-browser: No wallet provided");this.onConnect=this.onConnectProxy.bind(this),this.onAutoConnect=this.onConnectProxy.bind(this),D.X.sendEvent({type:"track",event:"SELECT_WALLET",properties:{name:this.wallet.name,platform:"browser"}})}async onConnectProxy(){try{this.error=!1;let{connectors:e}=F.ConnectorController.state,t=e.find(e=>"ANNOUNCED"===e.type&&e.info?.rdns===this.wallet?.rdns||"INJECTED"===e.type||e.name===this.wallet?.name);if(t)await Z.ConnectionController.connectExternal(t,t.chain);else throw Error("w3m-connecting-wc-browser: No connector found");p.I.close(),D.X.sendEvent({type:"track",event:"CONNECT_SUCCESS",properties:{method:"browser",name:this.wallet?.name||"Unknown"}})}catch(e){D.X.sendEvent({type:"track",event:"CONNECT_ERROR",properties:{message:e?.message??"Unknown"}}),this.error=!0}}};iD=function(e,t,i,o){var r,a=arguments.length,n=a<3?t:null===o?o=Object.getOwnPropertyDescriptor(t,i):o;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)n=Reflect.decorate(e,t,i,o);else for(var s=e.length-1;s>=0;s--)(r=e[s])&&(n=(a<3?r(n):a>3?r(t,i,n):r(t,i))||n);return a>3&&n&&Object.defineProperty(t,i,n),n}([(0,h.Mo)("w3m-connecting-wc-browser")],iD);let iM=class extends iI{constructor(){if(super(),!this.wallet)throw Error("w3m-connecting-wc-desktop: No wallet provided");this.onConnect=this.onConnectProxy.bind(this),this.onRender=this.onRenderProxy.bind(this),D.X.sendEvent({type:"track",event:"SELECT_WALLET",properties:{name:this.wallet.name,platform:"desktop"}})}onRenderProxy(){!this.ready&&this.uri&&(this.ready=!0,this.onConnect?.())}onConnectProxy(){if(this.wallet?.desktop_link&&this.uri)try{this.error=!1;let{desktop_link:e,name:t}=this.wallet,{redirect:i,href:o}=u.j.formatNativeUrl(e,this.uri);Z.ConnectionController.setWcLinking({name:t,href:o}),Z.ConnectionController.setRecentWallet(this.wallet),u.j.openHref(i,"_blank")}catch{this.error=!0}}};iM=function(e,t,i,o){var r,a=arguments.length,n=a<3?t:null===o?o=Object.getOwnPropertyDescriptor(t,i):o;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)n=Reflect.decorate(e,t,i,o);else for(var s=e.length-1;s>=0;s--)(r=e[s])&&(n=(a<3?r(n):a>3?r(t,i,n):r(t,i))||n);return a>3&&n&&Object.defineProperty(t,i,n),n}([(0,h.Mo)("w3m-connecting-wc-desktop")],iM);let iW=class extends iI{constructor(){if(super(),this.btnLabelTimeout=void 0,this.labelTimeout=void 0,this.onRender=()=>{!this.ready&&this.uri&&(this.ready=!0,this.onConnect?.())},this.onConnect=()=>{if(this.wallet?.mobile_link&&this.uri)try{this.error=!1;let{mobile_link:e,name:t}=this.wallet,{redirect:i,href:o}=u.j.formatNativeUrl(e,this.uri);Z.ConnectionController.setWcLinking({name:t,href:o}),Z.ConnectionController.setRecentWallet(this.wallet);let r=u.j.isIframe()?"_top":"_self";u.j.openHref(i,r),clearTimeout(this.labelTimeout),this.secondaryLabel=G.bq.CONNECT_LABELS.MOBILE}catch(e){D.X.sendEvent({type:"track",event:"CONNECT_PROXY_ERROR",properties:{message:e instanceof Error?e.message:"Error parsing the deeplink",uri:this.uri,mobile_link:this.wallet.mobile_link,name:this.wallet.name}}),this.error=!0}},!this.wallet)throw Error("w3m-connecting-wc-mobile: No wallet provided");this.initializeStateAndTimers(),document.addEventListener("visibilitychange",this.onBuffering.bind(this)),D.X.sendEvent({type:"track",event:"SELECT_WALLET",properties:{name:this.wallet.name,platform:"mobile"}})}disconnectedCallback(){super.disconnectedCallback(),document.removeEventListener("visibilitychange",this.onBuffering.bind(this)),clearTimeout(this.btnLabelTimeout),clearTimeout(this.labelTimeout)}initializeStateAndTimers(){this.secondaryBtnLabel=void 0,this.secondaryLabel=G.bq.CONNECT_LABELS.MOBILE,this.btnLabelTimeout=setTimeout(()=>{this.secondaryBtnLabel="Try again",this.secondaryLabel=G.bq.CONNECT_LABELS.MOBILE},G.bq.FIVE_SEC_MS),this.labelTimeout=setTimeout(()=>{this.secondaryLabel="Hold tight... it's taking longer than expected"},G.bq.THREE_SEC_MS)}onBuffering(){let e=u.j.isIos();document?.visibilityState==="visible"&&!this.error&&e&&(Z.ConnectionController.setBuffering(!0),setTimeout(()=>{Z.ConnectionController.setBuffering(!1)},5e3))}onTryAgain(){this.buffering||(clearTimeout(this.btnLabelTimeout),clearTimeout(this.labelTimeout),this.initializeStateAndTimers(),Z.ConnectionController.setWcError(!1),this.onConnect())}};iW=function(e,t,i,o){var r,a=arguments.length,n=a<3?t:null===o?o=Object.getOwnPropertyDescriptor(t,i):o;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)n=Reflect.decorate(e,t,i,o);else for(var s=e.length-1;s>=0;s--)(r=e[s])&&(n=(a<3?r(n):a>3?r(t,i,n):r(t,i))||n);return a>3&&n&&Object.defineProperty(t,i,n),n}([(0,h.Mo)("w3m-connecting-wc-mobile")],iW),i(33199),i(28364);var iL=(0,o.iv)`
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
`;let iz=class extends iI{constructor(){super(),this.forceUpdate=()=>{this.requestUpdate()},window.addEventListener("resize",this.forceUpdate),D.X.sendEvent({type:"track",event:"SELECT_WALLET",properties:{name:this.wallet?.name??"WalletConnect",platform:"qrcode"}})}disconnectedCallback(){super.disconnectedCallback(),this.unsubscribe?.forEach(e=>e()),window.removeEventListener("resize",this.forceUpdate)}render(){return this.onRenderProxy(),(0,o.dy)`
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
    `}onRenderProxy(){!this.ready&&this.uri&&(this.timeout=setTimeout(()=>{this.ready=!0},200))}qrCodeTemplate(){if(!this.uri||!this.ready)return null;let e=this.getBoundingClientRect().width-40,t=this.wallet?this.wallet.name:void 0;return Z.ConnectionController.setWcLinking(void 0),Z.ConnectionController.setRecentWallet(this.wallet),(0,o.dy)` <wui-qr-code
      size=${e}
      theme=${iy.ThemeController.state.themeMode}
      uri=${this.uri}
      imageSrc=${(0,a.o)(s.f.getWalletImage(this.wallet))}
      color=${(0,a.o)(iy.ThemeController.state.themeVariables["--w3m-qr-color"])}
      alt=${(0,a.o)(t)}
      data-testid="wui-qr-code"
    ></wui-qr-code>`}copyTemplate(){let e=!this.uri||!this.ready;return(0,o.dy)`<wui-link
      .disabled=${e}
      @click=${this.onCopyUri}
      color="fg-200"
      data-testid="copy-wc2-uri"
    >
      <wui-icon size="xs" color="fg-200" slot="iconLeft" name="copy"></wui-icon>
      Copy link
    </wui-link>`}};iz.styles=iL,iz=function(e,t,i,o){var r,a=arguments.length,n=a<3?t:null===o?o=Object.getOwnPropertyDescriptor(t,i):o;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)n=Reflect.decorate(e,t,i,o);else for(var s=e.length-1;s>=0;s--)(r=e[s])&&(n=(a<3?r(n):a>3?r(t,i,n):r(t,i))||n);return a>3&&n&&Object.defineProperty(t,i,n),n}([(0,h.Mo)("w3m-connecting-wc-qrcode")],iz);let iU=class extends o.oi{constructor(){if(super(),this.wallet=Y.RouterController.state.data?.wallet,!this.wallet)throw Error("w3m-connecting-wc-unsupported: No wallet provided");D.X.sendEvent({type:"track",event:"SELECT_WALLET",properties:{name:this.wallet.name,platform:"browser"}})}render(){return(0,o.dy)`
      <wui-flex
        flexDirection="column"
        alignItems="center"
        .padding=${["3xl","xl","xl","xl"]}
        gap="xl"
      >
        <wui-wallet-image
          size="lg"
          imageSrc=${(0,a.o)(s.f.getWalletImage(this.wallet))}
        ></wui-wallet-image>

        <wui-text variant="paragraph-500" color="fg-100">Not Detected</wui-text>
      </wui-flex>

      <w3m-mobile-download-links .wallet=${this.wallet}></w3m-mobile-download-links>
    `}};iU=function(e,t,i,o){var r,a=arguments.length,n=a<3?t:null===o?o=Object.getOwnPropertyDescriptor(t,i):o;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)n=Reflect.decorate(e,t,i,o);else for(var s=e.length-1;s>=0;s--)(r=e[s])&&(n=(a<3?r(n):a>3?r(t,i,n):r(t,i))||n);return a>3&&n&&Object.defineProperty(t,i,n),n}([(0,h.Mo)("w3m-connecting-wc-unsupported")],iU);var i_=function(e,t,i,o){var r,a=arguments.length,n=a<3?t:null===o?o=Object.getOwnPropertyDescriptor(t,i):o;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)n=Reflect.decorate(e,t,i,o);else for(var s=e.length-1;s>=0;s--)(r=e[s])&&(n=(a<3?r(n):a>3?r(t,i,n):r(t,i))||n);return a>3&&n&&Object.defineProperty(t,i,n),n};let iV=class extends iI{constructor(){if(super(),this.isLoading=!0,!this.wallet)throw Error("w3m-connecting-wc-web: No wallet provided");this.onConnect=this.onConnectProxy.bind(this),this.secondaryBtnLabel="Open",this.secondaryLabel="Open and continue in a new browser tab",this.secondaryBtnIcon="externalLink",this.updateLoadingState(),this.unsubscribe.push(Z.ConnectionController.subscribeKey("wcUri",()=>{this.updateLoadingState()})),D.X.sendEvent({type:"track",event:"SELECT_WALLET",properties:{name:this.wallet.name,platform:"web"}})}updateLoadingState(){this.isLoading=!this.uri}onConnectProxy(){if(this.wallet?.webapp_link&&this.uri)try{this.error=!1;let{webapp_link:e,name:t}=this.wallet,{redirect:i,href:o}=u.j.formatUniversalUrl(e,this.uri);Z.ConnectionController.setWcLinking({name:t,href:o}),Z.ConnectionController.setRecentWallet(this.wallet),u.j.openHref(i,"_blank")}catch{this.error=!0}}};i_([(0,r.SB)()],iV.prototype,"isLoading",void 0),iV=i_([(0,h.Mo)("w3m-connecting-wc-web")],iV);var iH=function(e,t,i,o){var r,a=arguments.length,n=a<3?t:null===o?o=Object.getOwnPropertyDescriptor(t,i):o;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)n=Reflect.decorate(e,t,i,o);else for(var s=e.length-1;s>=0;s--)(r=e[s])&&(n=(a<3?r(n):a>3?r(t,i,n):r(t,i))||n);return a>3&&n&&Object.defineProperty(t,i,n),n};let iq=class extends o.oi{constructor(){super(),this.wallet=Y.RouterController.state.data?.wallet,this.platform=void 0,this.platforms=[],this.isSiwxEnabled=!!l.OptionsController.state.siwx,this.determinePlatforms(),this.initializeConnection()}render(){return(0,o.dy)`
      ${this.headerTemplate()}
      <div>${this.platformTemplate()}</div>
      <wui-ux-by-reown></wui-ux-by-reown>
    `}async initializeConnection(e=!1){if("browser"!==this.platform&&(!l.OptionsController.state.manualWCControl||e))try{let{wcPairingExpiry:t,status:i}=Z.ConnectionController.state;(e||l.OptionsController.state.enableEmbedded||u.j.isPairingExpired(t)||"connecting"===i)&&(await Z.ConnectionController.connectWalletConnect(),this.isSiwxEnabled||p.I.close())}catch(e){D.X.sendEvent({type:"track",event:"CONNECT_ERROR",properties:{message:e?.message??"Unknown"}}),Z.ConnectionController.setWcError(!0),X.SnackController.showError(e.message??"Connection error"),Z.ConnectionController.resetWcConnection(),Y.RouterController.goBack()}}determinePlatforms(){if(!this.wallet){this.platforms.push("qrcode"),this.platform="qrcode";return}if(this.platform)return;let{mobile_link:e,desktop_link:t,webapp_link:i,injected:o,rdns:r}=this.wallet,a=o?.map(({injected_id:e})=>e).filter(Boolean),s=[...r?[r]:a??[]],c=!l.OptionsController.state.isUniversalProvider&&s.length,d=Z.ConnectionController.checkInstalled(s),p=c&&d,h=t&&!u.j.isMobile();p&&!n.R.state.noAdapters&&this.platforms.push("browser"),e&&this.platforms.push(u.j.isMobile()?"mobile":"qrcode"),i&&this.platforms.push("web"),h&&this.platforms.push("desktop"),p||!c||n.R.state.noAdapters||this.platforms.push("unsupported"),this.platform=this.platforms[0]}platformTemplate(){switch(this.platform){case"browser":return(0,o.dy)`<w3m-connecting-wc-browser></w3m-connecting-wc-browser>`;case"web":return(0,o.dy)`<w3m-connecting-wc-web></w3m-connecting-wc-web>`;case"desktop":return(0,o.dy)`
          <w3m-connecting-wc-desktop .onRetry=${()=>this.initializeConnection(!0)}>
          </w3m-connecting-wc-desktop>
        `;case"mobile":return(0,o.dy)`
          <w3m-connecting-wc-mobile isMobile .onRetry=${()=>this.initializeConnection(!0)}>
          </w3m-connecting-wc-mobile>
        `;case"qrcode":return(0,o.dy)`<w3m-connecting-wc-qrcode></w3m-connecting-wc-qrcode>`;default:return(0,o.dy)`<w3m-connecting-wc-unsupported></w3m-connecting-wc-unsupported>`}}headerTemplate(){return this.platforms.length>1?(0,o.dy)`
      <w3m-connecting-header
        .platforms=${this.platforms}
        .onSelectPlatfrom=${this.onSelectPlatform.bind(this)}
      >
      </w3m-connecting-header>
    `:null}async onSelectPlatform(e){let t=this.shadowRoot?.querySelector("div");t&&(await t.animate([{opacity:1},{opacity:0}],{duration:200,fill:"forwards",easing:"ease"}).finished,this.platform=e,t.animate([{opacity:0},{opacity:1}],{duration:200,fill:"forwards",easing:"ease"}))}};iH([(0,r.SB)()],iq.prototype,"platform",void 0),iH([(0,r.SB)()],iq.prototype,"platforms",void 0),iH([(0,r.SB)()],iq.prototype,"isSiwxEnabled",void 0),iq=iH([(0,h.Mo)("w3m-connecting-wc-view")],iq);var iK=function(e,t,i,o){var r,a=arguments.length,n=a<3?t:null===o?o=Object.getOwnPropertyDescriptor(t,i):o;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)n=Reflect.decorate(e,t,i,o);else for(var s=e.length-1;s>=0;s--)(r=e[s])&&(n=(a<3?r(n):a>3?r(t,i,n):r(t,i))||n);return a>3&&n&&Object.defineProperty(t,i,n),n};let iF=class extends o.oi{constructor(){super(...arguments),this.isMobile=u.j.isMobile()}render(){if(this.isMobile){let{featured:e,recommended:t}=tr.ApiController.state,{customWallets:i}=l.OptionsController.state,r=eo.M.getRecentWallets(),a=e.length||t.length||i?.length||r.length;return(0,o.dy)`<wui-flex
        flexDirection="column"
        gap="xs"
        .margin=${["3xs","s","s","s"]}
      >
        ${a?(0,o.dy)`<w3m-connector-list></w3m-connector-list>`:null}
        <w3m-all-wallets-widget></w3m-all-wallets-widget>
      </wui-flex>`}return(0,o.dy)`<wui-flex flexDirection="column" .padding=${["0","0","l","0"]}>
      <w3m-connecting-wc-view></w3m-connecting-wc-view>
      <wui-flex flexDirection="column" .padding=${["0","m","0","m"]}>
        <w3m-all-wallets-widget></w3m-all-wallets-widget> </wui-flex
    ></wui-flex>`}};iK([(0,r.SB)()],iF.prototype,"isMobile",void 0),iF=iK([(0,h.Mo)("w3m-connecting-wc-basic-view")],iF);var iG=i(34925),iX=(0,o.iv)`
  .continue-button-container {
    width: 100%;
  }
`,iY=function(e,t,i,o){var r,a=arguments.length,n=a<3?t:null===o?o=Object.getOwnPropertyDescriptor(t,i):o;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)n=Reflect.decorate(e,t,i,o);else for(var s=e.length-1;s>=0;s--)(r=e[s])&&(n=(a<3?r(n):a>3?r(t,i,n):r(t,i))||n);return a>3&&n&&Object.defineProperty(t,i,n),n};let iZ=class extends o.oi{constructor(){super(...arguments),this.loading=!1}render(){return(0,o.dy)`
      <wui-flex
        flexDirection="column"
        alignItems="center"
        gap="xxl"
        .padding=${["0","0","l","0"]}
      >
        ${this.onboardingTemplate()} ${this.buttonsTemplate()}
        <wui-link
          @click=${()=>{u.j.openHref(iG.U.URLS.FAQ,"_blank")}}
        >
          Learn more about names
          <wui-icon color="inherit" slot="iconRight" name="externalLink"></wui-icon>
        </wui-link>
      </wui-flex>
    `}onboardingTemplate(){return(0,o.dy)` <wui-flex
      flexDirection="column"
      gap="xxl"
      alignItems="center"
      .padding=${["0","xxl","0","xxl"]}
    >
      <wui-flex gap="s" alignItems="center" justifyContent="center">
        <wui-icon-box
          icon="id"
          size="xl"
          iconSize="xxl"
          iconColor="fg-200"
          backgroundColor="fg-200"
        ></wui-icon-box>
      </wui-flex>
      <wui-flex flexDirection="column" alignItems="center" gap="s">
        <wui-text align="center" variant="medium-600" color="fg-100">
          Choose your account name
        </wui-text>
        <wui-text align="center" variant="paragraph-400" color="fg-100">
          Finally say goodbye to 0x addresses, name your account to make it easier to exchange
          assets
        </wui-text>
      </wui-flex>
    </wui-flex>`}buttonsTemplate(){return(0,o.dy)`<wui-flex
      .padding=${["0","2l","0","2l"]}
      gap="s"
      class="continue-button-container"
    >
      <wui-button
        fullWidth
        .loading=${this.loading}
        size="lg"
        borderRadius="xs"
        @click=${this.handleContinue.bind(this)}
        >Choose name
      </wui-button>
    </wui-flex>`}handleContinue(){let e=n.R.state.activeChain;Y.RouterController.push("RegisterAccountName"),D.X.sendEvent({type:"track",event:"OPEN_ENS_FLOW",properties:{isSmartAccount:d.AccountController.state.preferredAccountTypes?.[e]===ei.y_.ACCOUNT_TYPES.SMART_ACCOUNT}})}};iZ.styles=iX,iY([(0,r.SB)()],iZ.prototype,"loading",void 0),iZ=iY([(0,h.Mo)("w3m-choose-account-name-view")],iZ);let iJ=class extends o.oi{constructor(){super(...arguments),this.wallet=Y.RouterController.state.data?.wallet}render(){if(!this.wallet)throw Error("w3m-downloads-view");return(0,o.dy)`
      <wui-flex gap="xs" flexDirection="column" .padding=${["s","s","l","s"]}>
        ${this.chromeTemplate()} ${this.iosTemplate()} ${this.androidTemplate()}
        ${this.homepageTemplate()}
      </wui-flex>
    `}chromeTemplate(){return this.wallet?.chrome_store?(0,o.dy)`<wui-list-item
      variant="icon"
      icon="chromeStore"
      iconVariant="square"
      @click=${this.onChromeStore.bind(this)}
      chevron
    >
      <wui-text variant="paragraph-500" color="fg-100">Chrome Extension</wui-text>
    </wui-list-item>`:null}iosTemplate(){return this.wallet?.app_store?(0,o.dy)`<wui-list-item
      variant="icon"
      icon="appStore"
      iconVariant="square"
      @click=${this.onAppStore.bind(this)}
      chevron
    >
      <wui-text variant="paragraph-500" color="fg-100">iOS App</wui-text>
    </wui-list-item>`:null}androidTemplate(){return this.wallet?.play_store?(0,o.dy)`<wui-list-item
      variant="icon"
      icon="playStore"
      iconVariant="square"
      @click=${this.onPlayStore.bind(this)}
      chevron
    >
      <wui-text variant="paragraph-500" color="fg-100">Android App</wui-text>
    </wui-list-item>`:null}homepageTemplate(){return this.wallet?.homepage?(0,o.dy)`
      <wui-list-item
        variant="icon"
        icon="browser"
        iconVariant="square-blue"
        @click=${this.onHomePage.bind(this)}
        chevron
      >
        <wui-text variant="paragraph-500" color="fg-100">Website</wui-text>
      </wui-list-item>
    `:null}onChromeStore(){this.wallet?.chrome_store&&u.j.openHref(this.wallet.chrome_store,"_blank")}onAppStore(){this.wallet?.app_store&&u.j.openHref(this.wallet.app_store,"_blank")}onPlayStore(){this.wallet?.play_store&&u.j.openHref(this.wallet.play_store,"_blank")}onHomePage(){this.wallet?.homepage&&u.j.openHref(this.wallet.homepage,"_blank")}};iJ=function(e,t,i,o){var r,a=arguments.length,n=a<3?t:null===o?o=Object.getOwnPropertyDescriptor(t,i):o;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)n=Reflect.decorate(e,t,i,o);else for(var s=e.length-1;s>=0;s--)(r=e[s])&&(n=(a<3?r(n):a>3?r(t,i,n):r(t,i))||n);return a>3&&n&&Object.defineProperty(t,i,n),n}([(0,h.Mo)("w3m-downloads-view")],iJ);let iQ=class extends o.oi{render(){return(0,o.dy)`
      <wui-flex flexDirection="column" .padding=${["0","s","s","s"]} gap="xs">
        ${this.recommendedWalletsTemplate()}
        <wui-list-wallet
          name="Explore all"
          showAllWallets
          walletIcon="allWallets"
          icon="externalLink"
          @click=${()=>{u.j.openHref("https://walletconnect.com/explorer?type=wallet","_blank")}}
        ></wui-list-wallet>
      </wui-flex>
    `}recommendedWalletsTemplate(){let{recommended:e,featured:t}=tr.ApiController.state,{customWallets:i}=l.OptionsController.state;return[...t,...i??[],...e].slice(0,4).map(e=>(0,o.dy)`
        <wui-list-wallet
          name=${e.name??"Unknown"}
          tagVariant="main"
          imageSrc=${(0,a.o)(s.f.getWalletImage(e))}
          @click=${()=>{u.j.openHref(e.homepage??"https://walletconnect.com/explorer","_blank")}}
        ></wui-list-wallet>
      `)}};iQ=function(e,t,i,o){var r,a=arguments.length,n=a<3?t:null===o?o=Object.getOwnPropertyDescriptor(t,i):o;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)n=Reflect.decorate(e,t,i,o);else for(var s=e.length-1;s>=0;s--)(r=e[s])&&(n=(a<3?r(n):a>3?r(t,i,n):r(t,i))||n);return a>3&&n&&Object.defineProperty(t,i,n),n}([(0,h.Mo)("w3m-get-wallet-view")],iQ),i(38305);var i0=function(e,t,i,o){var r,a=arguments.length,n=a<3?t:null===o?o=Object.getOwnPropertyDescriptor(t,i):o;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)n=Reflect.decorate(e,t,i,o);else for(var s=e.length-1;s>=0;s--)(r=e[s])&&(n=(a<3?r(n):a>3?r(t,i,n):r(t,i))||n);return a>3&&n&&Object.defineProperty(t,i,n),n};let i3=class extends o.oi{constructor(){super(...arguments),this.data=[]}render(){return(0,o.dy)`
      <wui-flex flexDirection="column" alignItems="center" gap="l">
        ${this.data.map(e=>(0,o.dy)`
            <wui-flex flexDirection="column" alignItems="center" gap="xl">
              <wui-flex flexDirection="row" justifyContent="center" gap="1xs">
                ${e.images.map(e=>(0,o.dy)`<wui-visual name=${e}></wui-visual>`)}
              </wui-flex>
            </wui-flex>
            <wui-flex flexDirection="column" alignItems="center" gap="xxs">
              <wui-text variant="paragraph-500" color="fg-100" align="center">
                ${e.title}
              </wui-text>
              <wui-text variant="small-500" color="fg-200" align="center">${e.text}</wui-text>
            </wui-flex>
          `)}
      </wui-flex>
    `}};i0([(0,r.Cb)({type:Array})],i3.prototype,"data",void 0),i3=i0([(0,h.Mo)("w3m-help-widget")],i3);let i1=[{images:["login","profile","lock"],title:"One login for all of web3",text:"Log in to any app by connecting your wallet. Say goodbye to countless passwords!"},{images:["defi","nft","eth"],title:"A home for your digital assets",text:"A wallet lets you store, send and receive digital assets like cryptocurrencies and NFTs."},{images:["browser","noun","dao"],title:"Your gateway to a new web",text:"With your wallet, you can explore and interact with DeFi, NFTs, DAOs, and much more."}],i2=class extends o.oi{render(){return(0,o.dy)`
      <wui-flex
        flexDirection="column"
        .padding=${["xxl","xl","xl","xl"]}
        alignItems="center"
        gap="xl"
      >
        <w3m-help-widget .data=${i1}></w3m-help-widget>
        <wui-button variant="main" size="md" @click=${this.onGetWallet.bind(this)}>
          <wui-icon color="inherit" slot="iconLeft" name="wallet"></wui-icon>
          Get a wallet
        </wui-button>
      </wui-flex>
    `}onGetWallet(){D.X.sendEvent({type:"track",event:"CLICK_GET_WALLET"}),Y.RouterController.push("GetWallet")}};i2=function(e,t,i,o){var r,a=arguments.length,n=a<3?t:null===o?o=Object.getOwnPropertyDescriptor(t,i):o;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)n=Reflect.decorate(e,t,i,o);else for(var s=e.length-1;s>=0;s--)(r=e[s])&&(n=(a<3?r(n):a>3?r(t,i,n):r(t,i))||n);return a>3&&n&&Object.defineProperty(t,i,n),n}([(0,h.Mo)("w3m-what-is-a-wallet-view")],i2);var i5=(0,o.iv)`
  wui-flex {
    max-height: clamp(360px, 540px, 80vh);
    overflow: scroll;
    scrollbar-width: none;
    transition: opacity var(--wui-ease-out-power-1) var(--wui-duration-md);
    will-change: opacity;
  }
  wui-flex::-webkit-scrollbar {
    display: none;
  }
  wui-flex.disabled {
    opacity: 0.3;
    pointer-events: none;
    user-select: none;
  }
`,i4=function(e,t,i,o){var r,a=arguments.length,n=a<3?t:null===o?o=Object.getOwnPropertyDescriptor(t,i):o;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)n=Reflect.decorate(e,t,i,o);else for(var s=e.length-1;s>=0;s--)(r=e[s])&&(n=(a<3?r(n):a>3?r(t,i,n):r(t,i))||n);return a>3&&n&&Object.defineProperty(t,i,n),n};let i6=class extends o.oi{constructor(){super(),this.unsubscribe=[],this.checked=tT.M.state.isLegalCheckboxChecked,this.unsubscribe.push(tT.M.subscribeKey("isLegalCheckboxChecked",e=>{this.checked=e}))}disconnectedCallback(){this.unsubscribe.forEach(e=>e())}render(){let{termsConditionsUrl:e,privacyPolicyUrl:t}=l.OptionsController.state,i=l.OptionsController.state.features?.legalCheckbox,r=!!(e||t)&&!!i,n=r&&!this.checked;return(0,o.dy)`
      <w3m-legal-checkbox></w3m-legal-checkbox>
      <wui-flex
        flexDirection="column"
        .padding=${r?["0","s","s","s"]:"s"}
        gap="xs"
        class=${(0,a.o)(n?"disabled":void 0)}
      >
        <w3m-wallet-login-list tabIdx=${(0,a.o)(n?-1:void 0)}></w3m-wallet-login-list>
      </wui-flex>
      <w3m-legal-footer></w3m-legal-footer>
    `}};i6.styles=i5,i4([(0,r.SB)()],i6.prototype,"checked",void 0),i6=i4([(0,h.Mo)("w3m-connect-wallets-view")],i6);var i7=(0,o.iv)`
  :host {
    display: block;
    width: var(--wui-box-size-lg);
    height: var(--wui-box-size-lg);
  }

  svg {
    width: var(--wui-box-size-lg);
    height: var(--wui-box-size-lg);
    fill: none;
    stroke: transparent;
    stroke-linecap: round;
  }

  use {
    stroke: var(--wui-color-accent-100);
    stroke-width: 2px;
    stroke-dasharray: 54, 118;
    stroke-dashoffset: 172;
    animation: dash 1s linear infinite;
  }

  @keyframes dash {
    to {
      stroke-dashoffset: 0px;
    }
  }
`;let i8=class extends o.oi{render(){return(0,o.dy)`
      <svg viewBox="0 0 54 59">
        <path
          id="wui-loader-path"
          d="M17.22 5.295c3.877-2.277 5.737-3.363 7.72-3.726a11.44 11.44 0 0 1 4.12 0c1.983.363 3.844 1.45 7.72 3.726l6.065 3.562c3.876 2.276 5.731 3.372 7.032 4.938a11.896 11.896 0 0 1 2.06 3.63c.683 1.928.688 4.11.688 8.663v7.124c0 4.553-.005 6.735-.688 8.664a11.896 11.896 0 0 1-2.06 3.63c-1.3 1.565-3.156 2.66-7.032 4.937l-6.065 3.563c-3.877 2.276-5.737 3.362-7.72 3.725a11.46 11.46 0 0 1-4.12 0c-1.983-.363-3.844-1.449-7.72-3.726l-6.065-3.562c-3.876-2.276-5.731-3.372-7.032-4.938a11.885 11.885 0 0 1-2.06-3.63c-.682-1.928-.688-4.11-.688-8.663v-7.124c0-4.553.006-6.735.688-8.664a11.885 11.885 0 0 1 2.06-3.63c1.3-1.565 3.156-2.66 7.032-4.937l6.065-3.562Z"
        />
        <use xlink:href="#wui-loader-path"></use>
      </svg>
    `}};i8.styles=[w.ET,i7],i8=function(e,t,i,o){var r,a=arguments.length,n=a<3?t:null===o?o=Object.getOwnPropertyDescriptor(t,i):o;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)n=Reflect.decorate(e,t,i,o);else for(var s=e.length-1;s>=0;s--)(r=e[s])&&(n=(a<3?r(n):a>3?r(t,i,n):r(t,i))||n);return a>3&&n&&Object.defineProperty(t,i,n),n}([(0,b.M)("wui-loading-hexagon")],i8),i(34736);var i9=(0,o.iv)`
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

  wui-loading-hexagon {
    position: absolute;
  }

  wui-icon-box {
    position: absolute;
    right: 4px;
    bottom: 0;
    opacity: 0;
    transform: scale(0.5);
    z-index: 1;
  }

  wui-button {
    display: none;
  }

  [data-error='true'] wui-icon-box {
    opacity: 1;
    transform: scale(1);
  }

  [data-error='true'] > wui-flex:first-child {
    animation: shake 250ms cubic-bezier(0.36, 0.07, 0.19, 0.97) both;
  }

  wui-button[data-retry='true'] {
    display: block;
    opacity: 1;
  }
`,oe=function(e,t,i,o){var r,a=arguments.length,n=a<3?t:null===o?o=Object.getOwnPropertyDescriptor(t,i):o;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)n=Reflect.decorate(e,t,i,o);else for(var s=e.length-1;s>=0;s--)(r=e[s])&&(n=(a<3?r(n):a>3?r(t,i,n):r(t,i))||n);return a>3&&n&&Object.defineProperty(t,i,n),n};let ot=class extends o.oi{constructor(){super(),this.network=Y.RouterController.state.data?.network,this.unsubscribe=[],this.showRetry=!1,this.error=!1}disconnectedCallback(){this.unsubscribe.forEach(e=>e())}firstUpdated(){this.onSwitchNetwork()}render(){if(!this.network)throw Error("w3m-network-switch-view: No network provided");this.onShowRetry();let e=this.getLabel(),t=this.getSubLabel();return(0,o.dy)`
      <wui-flex
        data-error=${this.error}
        flexDirection="column"
        alignItems="center"
        .padding=${["3xl","xl","3xl","xl"]}
        gap="xl"
      >
        <wui-flex justifyContent="center" alignItems="center">
          <wui-network-image
            size="lg"
            imageSrc=${(0,a.o)(s.f.getNetworkImage(this.network))}
          ></wui-network-image>

          ${this.error?null:(0,o.dy)`<wui-loading-hexagon></wui-loading-hexagon>`}

          <wui-icon-box
            backgroundColor="error-100"
            background="opaque"
            iconColor="error-100"
            icon="close"
            size="sm"
            ?border=${!0}
            borderColor="wui-color-bg-125"
          ></wui-icon-box>
        </wui-flex>

        <wui-flex flexDirection="column" alignItems="center" gap="xs">
          <wui-text align="center" variant="paragraph-500" color="fg-100">${e}</wui-text>
          <wui-text align="center" variant="small-500" color="fg-200">${t}</wui-text>
        </wui-flex>

        <wui-button
          data-retry=${this.showRetry}
          variant="accent"
          size="md"
          .disabled=${!this.error}
          @click=${this.onSwitchNetwork.bind(this)}
        >
          <wui-icon color="inherit" slot="iconLeft" name="refresh"></wui-icon>
          Try again
        </wui-button>
      </wui-flex>
    `}getSubLabel(){let e=n.R.state.activeChain,t=F.ConnectorController.getConnectorId(e);return F.ConnectorController.getAuthConnector()&&t===K.b.CONNECTOR_ID.AUTH?"":this.error?"Switch can be declined if chain is not supported by a wallet or previous request is still active":"Accept connection request in your wallet"}getLabel(){let e=n.R.state.activeChain,t=F.ConnectorController.getConnectorId(e);return F.ConnectorController.getAuthConnector()&&t===K.b.CONNECTOR_ID.AUTH?`Switching to ${this.network?.name??"Unknown"} network...`:this.error?"Switch declined":"Approve in wallet"}onShowRetry(){if(this.error&&!this.showRetry){this.showRetry=!0;let e=this.shadowRoot?.querySelector("wui-button");e?.animate([{opacity:0},{opacity:1}],{fill:"forwards",easing:"ease"})}}async onSwitchNetwork(){try{this.error=!1,n.R.state.activeChain!==this.network?.chainNamespace&&n.R.setIsSwitchingNamespace(!0),this.network&&await n.R.switchActiveNetwork(this.network)}catch(e){this.error=!0}}};ot.styles=i9,oe([(0,r.SB)()],ot.prototype,"showRetry",void 0),oe([(0,r.SB)()],ot.prototype,"error",void 0),ot=oe([(0,h.Mo)("w3m-network-switch-view")],ot),i(91936),i(86852);var oi=(0,o.iv)`
  button {
    column-gap: var(--wui-spacing-s);
    padding: 7px var(--wui-spacing-l) 7px var(--wui-spacing-xs);
    width: 100%;
    transition: all var(--wui-ease-out-power-1) var(--wui-duration-md);
    border-radius: var(--wui-border-radius-xs);
    color: var(--wui-color-fg-100);
  }

  button > wui-text:nth-child(2) {
    display: flex;
    flex: 1;
  }

  button[data-transparent='true'] {
    pointer-events: none;
    background-color: transparent;
  }

  button:hover {
    background-color: var(--wui-color-gray-glass-002);
  }

  button:active {
    background-color: var(--wui-color-gray-glass-005);
  }

  wui-image {
    width: var(--wui-spacing-3xl);
    height: var(--wui-spacing-3xl);
    border-radius: 100%;
  }

  button:disabled {
    background-color: var(--wui-color-gray-glass-002);
    opacity: 0.5;
    cursor: not-allowed;
  }

  button:disabled > wui-tag {
    background-color: var(--wui-color-gray-glass-010);
    color: var(--wui-color-fg-300);
  }
`,oo=function(e,t,i,o){var r,a=arguments.length,n=a<3?t:null===o?o=Object.getOwnPropertyDescriptor(t,i):o;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)n=Reflect.decorate(e,t,i,o);else for(var s=e.length-1;s>=0;s--)(r=e[s])&&(n=(a<3?r(n):a>3?r(t,i,n):r(t,i))||n);return a>3&&n&&Object.defineProperty(t,i,n),n};let or=class extends o.oi{constructor(){super(...arguments),this.imageSrc="",this.name="",this.disabled=!1,this.selected=!1,this.transparent=!1}render(){return(0,o.dy)`
      <button data-transparent=${this.transparent} ?disabled=${this.disabled}>
        <wui-flex gap="s" alignItems="center">
          ${this.templateNetworkImage()}
          <wui-text variant="paragraph-500" color="inherit">${this.name}</wui-text></wui-flex
        >
        ${this.checkmarkTemplate()}
      </button>
    `}checkmarkTemplate(){return this.selected?(0,o.dy)`<wui-icon size="sm" color="accent-100" name="checkmarkBold"></wui-icon>`:null}templateNetworkImage(){return this.imageSrc?(0,o.dy)`<wui-image size="sm" src=${this.imageSrc} name=${this.name}></wui-image>`:this.imageSrc?null:(0,o.dy)`<wui-network-image
        ?round=${!0}
        size="md"
        name=${this.name}
      ></wui-network-image>`}};or.styles=[w.ET,w.ZM,oi],oo([(0,r.Cb)()],or.prototype,"imageSrc",void 0),oo([(0,r.Cb)()],or.prototype,"name",void 0),oo([(0,r.Cb)({type:Boolean})],or.prototype,"disabled",void 0),oo([(0,r.Cb)({type:Boolean})],or.prototype,"selected",void 0),oo([(0,r.Cb)({type:Boolean})],or.prototype,"transparent",void 0),or=oo([(0,b.M)("wui-list-network")],or);var oa=(0,o.iv)`
  .container {
    max-height: 360px;
    overflow: auto;
  }

  .container::-webkit-scrollbar {
    display: none;
  }
`,on=function(e,t,i,o){var r,a=arguments.length,n=a<3?t:null===o?o=Object.getOwnPropertyDescriptor(t,i):o;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)n=Reflect.decorate(e,t,i,o);else for(var s=e.length-1;s>=0;s--)(r=e[s])&&(n=(a<3?r(n):a>3?r(t,i,n):r(t,i))||n);return a>3&&n&&Object.defineProperty(t,i,n),n};let os=class extends o.oi{constructor(){super(),this.unsubscribe=[],this.network=n.R.state.activeCaipNetwork,this.requestedCaipNetworks=n.R.getCaipNetworks(),this.search="",this.onDebouncedSearch=u.j.debounce(e=>{this.search=e},100),this.unsubscribe.push(c.W.subscribeNetworkImages(()=>this.requestUpdate()),n.R.subscribeKey("activeCaipNetwork",e=>this.network=e),n.R.subscribe(()=>{this.requestedCaipNetworks=n.R.getAllRequestedCaipNetworks()}))}disconnectedCallback(){this.unsubscribe.forEach(e=>e())}render(){return(0,o.dy)`
      ${this.templateSearchInput()}
      <wui-flex
        class="container"
        .padding=${["0","s","s","s"]}
        flexDirection="column"
        gap="xs"
      >
        ${this.networksTemplate()}
      </wui-flex>

      <wui-separator></wui-separator>

      <wui-flex padding="s" flexDirection="column" gap="m" alignItems="center">
        <wui-text variant="small-400" color="fg-300" align="center">
          Your connected wallet may not support some of the networks available for this dApp
        </wui-text>
        <wui-link @click=${this.onNetworkHelp.bind(this)}>
          <wui-icon size="xs" color="accent-100" slot="iconLeft" name="helpCircle"></wui-icon>
          What is a network
        </wui-link>
      </wui-flex>
    `}templateSearchInput(){return(0,o.dy)`
      <wui-flex gap="xs" .padding=${["0","s","s","s"]}>
        <wui-input-text
          @inputChange=${this.onInputChange.bind(this)}
          class="network-search-input"
          size="md"
          placeholder="Search network"
          icon="search"
        ></wui-input-text>
      </wui-flex>
    `}onInputChange(e){this.onDebouncedSearch(e.detail)}onNetworkHelp(){D.X.sendEvent({type:"track",event:"CLICK_NETWORK_HELP"}),Y.RouterController.push("WhatIsANetwork")}networksTemplate(){let e=n.R.getAllApprovedCaipNetworkIds(),t=u.j.sortRequestedNetworks(e,this.requestedCaipNetworks);return this.search?this.filteredNetworks=t?.filter(e=>e?.name?.toLowerCase().includes(this.search.toLowerCase())):this.filteredNetworks=t,this.filteredNetworks?.map(e=>o.dy`
        <wui-list-network
          .selected=${this.network?.id===e.id}
          imageSrc=${a.o(s.f.getNetworkImage(e))}
          type="network"
          name=${e.name??e.id}
          @click=${()=>this.onSwitchNetwork(e)}
          .disabled=${this.getNetworkDisabled(e)}
          data-testid=${`w3m-network-switch-${e.name??e.id}`}
        ></wui-list-network>
      `)}getNetworkDisabled(e){let t=e.chainNamespace,i=d.AccountController.getCaipAddress(t),o=n.R.getAllApprovedCaipNetworkIds(),r=!1!==n.R.getNetworkProp("supportsAllNetworks",t),a=F.ConnectorController.getConnectorId(t),s=F.ConnectorController.getAuthConnector(),l=a===K.b.CONNECTOR_ID.AUTH&&s;return!!i&&!r&&!l&&!o?.includes(e.caipNetworkId)}onSwitchNetwork(e){let t=Y.RouterController.state.data;if(e.id===this.network?.id)return;let i=e.chainNamespace!==n.R.state.activeChain,o=d.AccountController.state.caipAddress,r=d.AccountController.getCaipAddress(e.chainNamespace),a=F.ConnectorController.getConnectorId(n.R.state.activeChain)===K.b.CONNECTOR_ID.AUTH,s=K.b.AUTH_CONNECTOR_SUPPORTED_CHAINS.find(t=>t===e.chainNamespace);o?a&&s?Y.RouterController.push("SwitchNetwork",{...t,network:e}):a&&!s||i&&!r?Y.RouterController.push("SwitchActiveChain",{switchToChain:e.chainNamespace,navigateTo:"Connect",navigateWithReplace:!0,network:e}):Y.RouterController.push("SwitchNetwork",{...t,network:e}):Y.RouterController.push("SwitchNetwork",{...t,network:e})}};os.styles=oa,on([(0,r.SB)()],os.prototype,"network",void 0),on([(0,r.SB)()],os.prototype,"requestedCaipNetworks",void 0),on([(0,r.SB)()],os.prototype,"filteredNetworks",void 0),on([(0,r.SB)()],os.prototype,"search",void 0),os=on([(0,h.Mo)("w3m-networks-view")],os);var ol=(0,o.iv)`
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

  wui-visual {
    width: var(--wui-wallet-image-size-lg);
    height: var(--wui-wallet-image-size-lg);
    border-radius: calc(var(--wui-border-radius-5xs) * 9 - var(--wui-border-radius-xxs));
    position: relative;
    overflow: hidden;
  }

  wui-visual::after {
    content: '';
    display: block;
    width: 100%;
    height: 100%;
    position: absolute;
    inset: 0;
    border-radius: calc(var(--wui-border-radius-5xs) * 9 - var(--wui-border-radius-xxs));
    box-shadow: inset 0 0 0 1px var(--wui-color-gray-glass-005);
  }

  wui-icon-box {
    position: absolute;
    right: calc(var(--wui-spacing-3xs) * -1);
    bottom: calc(var(--wui-spacing-3xs) * -1);
    opacity: 0;
    transform: scale(0.5);
    transition:
      opacity var(--wui-ease-out-power-2) var(--wui-duration-lg),
      transform var(--wui-ease-out-power-2) var(--wui-duration-lg);
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

  wui-link {
    padding: var(--wui-spacing-4xs) var(--wui-spacing-xxs);
  }

  .capitalize {
    text-transform: capitalize;
  }
`,oc=function(e,t,i,o){var r,a=arguments.length,n=a<3?t:null===o?o=Object.getOwnPropertyDescriptor(t,i):o;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)n=Reflect.decorate(e,t,i,o);else for(var s=e.length-1;s>=0;s--)(r=e[s])&&(n=(a<3?r(n):a>3?r(t,i,n):r(t,i))||n);return a>3&&n&&Object.defineProperty(t,i,n),n};let od={eip155:"eth",solana:"solana",bip122:"bitcoin",polkadot:void 0},ou=class extends o.oi{constructor(){super(...arguments),this.unsubscribe=[],this.switchToChain=Y.RouterController.state.data?.switchToChain,this.caipNetwork=Y.RouterController.state.data?.network,this.activeChain=n.R.state.activeChain}firstUpdated(){this.unsubscribe.push(n.R.subscribeKey("activeChain",e=>this.activeChain=e))}disconnectedCallback(){this.unsubscribe.forEach(e=>e())}render(){let e=this.switchToChain?K.b.CHAIN_NAME_MAP[this.switchToChain]:"supported";if(!this.switchToChain)return null;let t=K.b.CHAIN_NAME_MAP[this.switchToChain];return(0,o.dy)`
      <wui-flex
        flexDirection="column"
        alignItems="center"
        .padding=${["3xl","xl","xl","xl"]}
        gap="xl"
      >
        <wui-flex justifyContent="center" flexDirection="column" alignItems="center" gap="xl">
          <wui-visual name=${(0,a.o)(od[this.switchToChain])}></wui-visual>
          <wui-text
            data-testid=${`w3m-switch-active-chain-to-${t}`}
            variant="paragraph-500"
            color="fg-100"
            align="center"
            >Switch to <span class="capitalize">${t}</span></wui-text
          >
          <wui-text variant="small-400" color="fg-200" align="center">
            Connected wallet doesn't support connecting to ${e} chain. You
            need to connect with a different wallet.
          </wui-text>
          <wui-button
            data-testid="w3m-switch-active-chain-button"
            size="md"
            @click=${this.switchActiveChain.bind(this)}
            >Switch</wui-button
          >
        </wui-flex>
      </wui-flex>
    `}async switchActiveChain(){this.switchToChain&&(n.R.setIsSwitchingNamespace(!0),F.ConnectorController.setFilterByNamespace(this.switchToChain),this.caipNetwork?await n.R.switchActiveNetwork(this.caipNetwork):n.R.setActiveNamespace(this.switchToChain),Y.RouterController.reset("Connect"))}};ou.styles=ol,oc([(0,r.Cb)()],ou.prototype,"activeChain",void 0),ou=oc([(0,h.Mo)("w3m-switch-active-chain-view")],ou);let op=[{images:["network","layers","system"],title:"The system’s nuts and bolts",text:"A network is what brings the blockchain to life, as this technical infrastructure allows apps to access the ledger and smart contract services."},{images:["noun","defiAlt","dao"],title:"Designed for different uses",text:"Each network is designed differently, and may therefore suit certain apps and experiences."}],oh=class extends o.oi{render(){return(0,o.dy)`
      <wui-flex
        flexDirection="column"
        .padding=${["xxl","xl","xl","xl"]}
        alignItems="center"
        gap="xl"
      >
        <w3m-help-widget .data=${op}></w3m-help-widget>
        <wui-button
          variant="main"
          size="md"
          @click=${()=>{u.j.openHref("https://ethereum.org/en/developers/docs/networks/","_blank")}}
        >
          Learn more
          <wui-icon color="inherit" slot="iconRight" name="externalLink"></wui-icon>
        </wui-button>
      </wui-flex>
    `}};oh=function(e,t,i,o){var r,a=arguments.length,n=a<3?t:null===o?o=Object.getOwnPropertyDescriptor(t,i):o;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)n=Reflect.decorate(e,t,i,o);else for(var s=e.length-1;s>=0;s--)(r=e[s])&&(n=(a<3?r(n):a>3?r(t,i,n):r(t,i))||n);return a>3&&n&&Object.defineProperty(t,i,n),n}([(0,h.Mo)("w3m-what-is-a-network-view")],oh);var ow=(0,o.iv)`
  :host > wui-flex {
    max-height: clamp(360px, 540px, 80vh);
    overflow: scroll;
    scrollbar-width: none;
  }

  :host > wui-flex::-webkit-scrollbar {
    display: none;
  }
`,og=function(e,t,i,o){var r,a=arguments.length,n=a<3?t:null===o?o=Object.getOwnPropertyDescriptor(t,i):o;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)n=Reflect.decorate(e,t,i,o);else for(var s=e.length-1;s>=0;s--)(r=e[s])&&(n=(a<3?r(n):a>3?r(t,i,n):r(t,i))||n);return a>3&&n&&Object.defineProperty(t,i,n),n};let ob=class extends o.oi{constructor(){super(),this.swapUnsupportedChain=Y.RouterController.state.data?.swapUnsupportedChain,this.unsubscribe=[],this.disconecting=!1,this.unsubscribe.push(c.W.subscribeNetworkImages(()=>this.requestUpdate()))}disconnectedCallback(){this.unsubscribe.forEach(e=>e())}render(){return(0,o.dy)`
      <wui-flex class="container" flexDirection="column" gap="0">
        <wui-flex
          class="container"
          flexDirection="column"
          .padding=${["m","xl","xs","xl"]}
          alignItems="center"
          gap="xl"
        >
          ${this.descriptionTemplate()}
        </wui-flex>

        <wui-flex flexDirection="column" padding="s" gap="xs">
          ${this.networksTemplate()}
        </wui-flex>

        <wui-separator text="or"></wui-separator>
        <wui-flex flexDirection="column" padding="s" gap="xs">
          <wui-list-item
            variant="icon"
            iconVariant="overlay"
            icon="disconnect"
            ?chevron=${!1}
            .loading=${this.disconecting}
            @click=${this.onDisconnect.bind(this)}
            data-testid="disconnect-button"
          >
            <wui-text variant="paragraph-500" color="fg-200">Disconnect</wui-text>
          </wui-list-item>
        </wui-flex>
      </wui-flex>
    `}descriptionTemplate(){return this.swapUnsupportedChain?(0,o.dy)`
        <wui-text variant="small-400" color="fg-200" align="center">
          The swap feature doesn’t support your current network. Switch to an available option to
          continue.
        </wui-text>
      `:(0,o.dy)`
      <wui-text variant="small-400" color="fg-200" align="center">
        This app doesn’t support your current network. Switch to an available option to continue.
      </wui-text>
    `}networksTemplate(){let e=n.R.getAllRequestedCaipNetworks(),t=n.R.getAllApprovedCaipNetworkIds(),i=u.j.sortRequestedNetworks(t,e);return(this.swapUnsupportedChain?i.filter(e=>G.bq.SWAP_SUPPORTED_NETWORKS.includes(e.caipNetworkId)):i).map(e=>(0,o.dy)`
        <wui-list-network
          imageSrc=${(0,a.o)(s.f.getNetworkImage(e))}
          name=${e.name??"Unknown"}
          @click=${()=>this.onSwitchNetwork(e)}
        >
        </wui-list-network>
      `)}async onDisconnect(){try{this.disconecting=!0,await Z.ConnectionController.disconnect(),p.I.close()}catch{D.X.sendEvent({type:"track",event:"DISCONNECT_ERROR"}),X.SnackController.showError("Failed to disconnect")}finally{this.disconecting=!1}}async onSwitchNetwork(e){let t=d.AccountController.state.caipAddress,i=n.R.getAllApprovedCaipNetworkIds(),o=(n.R.getNetworkProp("supportsAllNetworks",e.chainNamespace),Y.RouterController.state.data);t?i?.includes(e.caipNetworkId)?await n.R.switchActiveNetwork(e):Y.RouterController.push("SwitchNetwork",{...o,network:e}):t||(n.R.setActiveCaipNetwork(e),Y.RouterController.push("Connect"))}};ob.styles=ow,og([(0,r.SB)()],ob.prototype,"disconecting",void 0),ob=og([(0,h.Mo)("w3m-unsupported-chain-view")],ob);var of=(0,o.iv)`
  wui-flex {
    width: 100%;
    background-color: var(--wui-color-gray-glass-005);
    border-radius: var(--wui-border-radius-s);
    padding: var(--wui-spacing-1xs) var(--wui-spacing-s) var(--wui-spacing-1xs)
      var(--wui-spacing-1xs);
  }
`,om=function(e,t,i,o){var r,a=arguments.length,n=a<3?t:null===o?o=Object.getOwnPropertyDescriptor(t,i):o;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)n=Reflect.decorate(e,t,i,o);else for(var s=e.length-1;s>=0;s--)(r=e[s])&&(n=(a<3?r(n):a>3?r(t,i,n):r(t,i))||n);return a>3&&n&&Object.defineProperty(t,i,n),n};let ov=class extends o.oi{constructor(){super(...arguments),this.icon="externalLink",this.text=""}render(){return(0,o.dy)`
      <wui-flex gap="1xs" alignItems="center">
        <wui-icon-box
          size="sm"
          iconcolor="fg-200"
          backgroundcolor="fg-200"
          icon=${this.icon}
          background="transparent"
        ></wui-icon-box>
        <wui-text variant="small-400" color="fg-200">${this.text}</wui-text>
      </wui-flex>
    `}};ov.styles=[w.ET,w.ZM,of],om([(0,r.Cb)()],ov.prototype,"icon",void 0),om([(0,r.Cb)()],ov.prototype,"text",void 0),ov=om([(0,b.M)("wui-banner")],ov);var oy=(0,o.iv)`
  :host > wui-flex {
    max-height: clamp(360px, 540px, 80vh);
    overflow: scroll;
    scrollbar-width: none;
  }

  :host > wui-flex::-webkit-scrollbar {
    display: none;
  }
`,ox=function(e,t,i,o){var r,a=arguments.length,n=a<3?t:null===o?o=Object.getOwnPropertyDescriptor(t,i):o;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)n=Reflect.decorate(e,t,i,o);else for(var s=e.length-1;s>=0;s--)(r=e[s])&&(n=(a<3?r(n):a>3?r(t,i,n):r(t,i))||n);return a>3&&n&&Object.defineProperty(t,i,n),n};let oC=class extends o.oi{constructor(){super(),this.unsubscribe=[],this.preferredAccountTypes=d.AccountController.state.preferredAccountTypes,this.unsubscribe.push(d.AccountController.subscribeKey("preferredAccountTypes",e=>{this.preferredAccountTypes=e}))}disconnectedCallback(){this.unsubscribe.forEach(e=>e())}render(){return(0,o.dy)` <wui-flex
      flexDirection="column"
      .padding=${["xs","s","m","s"]}
      gap="xs"
    >
      <wui-banner
        icon="warningCircle"
        text="You can only receive assets on these networks"
      ></wui-banner>
      ${this.networkTemplate()}
    </wui-flex>`}networkTemplate(){let e=n.R.getAllRequestedCaipNetworks(),t=n.R.getAllApprovedCaipNetworkIds(),i=n.R.state.activeCaipNetwork,r=n.R.checkIfSmartAccountEnabled(),l=u.j.sortRequestedNetworks(t,e);if(r&&this.preferredAccountTypes?.[i?.chainNamespace]===ei.y_.ACCOUNT_TYPES.SMART_ACCOUNT){if(!i)return null;l=[i]}return l.filter(e=>e.chainNamespace===i?.chainNamespace).map(e=>(0,o.dy)`
        <wui-list-network
          imageSrc=${(0,a.o)(s.f.getNetworkImage(e))}
          name=${e.name??"Unknown"}
          ?transparent=${!0}
        >
        </wui-list-network>
      `)}};oC.styles=oy,ox([(0,r.SB)()],oC.prototype,"preferredAccountTypes",void 0),oC=ox([(0,h.Mo)("w3m-wallet-compatible-networks-view")],oC);var ok=i(15603),o$=(0,o.iv)`
  :host {
    display: flex;
    justify-content: center;
    align-items: center;
    width: var(--wui-icon-box-size-xl);
    height: var(--wui-icon-box-size-xl);
    box-shadow: 0 0 0 8px var(--wui-thumbnail-border);
    border-radius: var(--local-border-radius);
    overflow: hidden;
  }

  wui-icon {
    width: 32px;
    height: 32px;
  }
`,oS=function(e,t,i,o){var r,a=arguments.length,n=a<3?t:null===o?o=Object.getOwnPropertyDescriptor(t,i):o;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)n=Reflect.decorate(e,t,i,o);else for(var s=e.length-1;s>=0;s--)(r=e[s])&&(n=(a<3?r(n):a>3?r(t,i,n):r(t,i))||n);return a>3&&n&&Object.defineProperty(t,i,n),n};let oR=class extends o.oi{render(){return this.style.cssText=`--local-border-radius: ${this.borderRadiusFull?"1000px":"20px"}; background-color: var(--wui-color-modal-bg);`,(0,o.dy)`${this.templateVisual()}`}templateVisual(){return this.imageSrc?(0,o.dy)`<wui-image src=${this.imageSrc} alt=${this.alt??""}></wui-image>`:(0,o.dy)`<wui-icon
      data-parent-size="md"
      size="inherit"
      color="inherit"
      name="walletPlaceholder"
    ></wui-icon>`}};oR.styles=[w.ET,o$],oS([(0,r.Cb)()],oR.prototype,"imageSrc",void 0),oS([(0,r.Cb)()],oR.prototype,"alt",void 0),oS([(0,r.Cb)({type:Boolean})],oR.prototype,"borderRadiusFull",void 0),oR=oS([(0,b.M)("wui-visual-thumbnail")],oR);var oT=(0,o.iv)`
  :host {
    display: flex;
    justify-content: center;
    gap: var(--wui-spacing-2xl);
  }

  wui-visual-thumbnail:nth-child(1) {
    z-index: 1;
  }
`;let oA=class extends o.oi{constructor(){super(...arguments),this.dappImageUrl=l.OptionsController.state.metadata?.icons,this.walletImageUrl=d.AccountController.state.connectedWalletInfo?.icon}firstUpdated(){let e=this.shadowRoot?.querySelectorAll("wui-visual-thumbnail");e?.[0]&&this.createAnimation(e[0],"translate(18px)"),e?.[1]&&this.createAnimation(e[1],"translate(-18px)")}render(){return(0,o.dy)`
      <wui-visual-thumbnail
        ?borderRadiusFull=${!0}
        .imageSrc=${this.dappImageUrl?.[0]}
      ></wui-visual-thumbnail>
      <wui-visual-thumbnail .imageSrc=${this.walletImageUrl}></wui-visual-thumbnail>
    `}createAnimation(e,t){e.animate([{transform:"translateX(0px)"},{transform:t}],{duration:1600,easing:"cubic-bezier(0.56, 0, 0.48, 1)",direction:"alternate",iterations:1/0})}};oA.styles=oT,oA=function(e,t,i,o){var r,a=arguments.length,n=a<3?t:null===o?o=Object.getOwnPropertyDescriptor(t,i):o;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)n=Reflect.decorate(e,t,i,o);else for(var s=e.length-1;s>=0;s--)(r=e[s])&&(n=(a<3?r(n):a>3?r(t,i,n):r(t,i))||n);return a>3&&n&&Object.defineProperty(t,i,n),n}([(0,h.Mo)("w3m-siwx-sign-message-thumbnails")],oA);var oI=function(e,t,i,o){var r,a=arguments.length,n=a<3?t:null===o?o=Object.getOwnPropertyDescriptor(t,i):o;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)n=Reflect.decorate(e,t,i,o);else for(var s=e.length-1;s>=0;s--)(r=e[s])&&(n=(a<3?r(n):a>3?r(t,i,n):r(t,i))||n);return a>3&&n&&Object.defineProperty(t,i,n),n};let oO=class extends o.oi{constructor(){super(...arguments),this.dappName=l.OptionsController.state.metadata?.name,this.isCancelling=!1,this.isSigning=!1}render(){return(0,o.dy)`
      <wui-flex justifyContent="center" .padding=${["2xl","0","xxl","0"]}>
        <w3m-siwx-sign-message-thumbnails></w3m-siwx-sign-message-thumbnails>
      </wui-flex>
      <wui-flex
        .padding=${["0","4xl","l","4xl"]}
        gap="s"
        justifyContent="space-between"
      >
        <wui-text variant="paragraph-500" align="center" color="fg-100"
          >${this.dappName??"Dapp"} needs to connect to your wallet</wui-text
        >
      </wui-flex>
      <wui-flex
        .padding=${["0","3xl","l","3xl"]}
        gap="s"
        justifyContent="space-between"
      >
        <wui-text variant="small-400" align="center" color="fg-200"
          >Sign this message to prove you own this wallet and proceed. Canceling will disconnect
          you.</wui-text
        >
      </wui-flex>
      <wui-flex .padding=${["l","xl","xl","xl"]} gap="s" justifyContent="space-between">
        <wui-button
          size="lg"
          borderRadius="xs"
          fullWidth
          variant="neutral"
          ?loading=${this.isCancelling}
          @click=${this.onCancel.bind(this)}
          data-testid="w3m-connecting-siwe-cancel"
        >
          ${this.isCancelling?"Cancelling...":"Cancel"}
        </wui-button>
        <wui-button
          size="lg"
          borderRadius="xs"
          fullWidth
          variant="main"
          @click=${this.onSign.bind(this)}
          ?loading=${this.isSigning}
          data-testid="w3m-connecting-siwe-sign"
        >
          ${this.isSigning?"Signing...":"Sign"}
        </wui-button>
      </wui-flex>
    `}async onSign(){this.isSigning=!0,await ok.w.requestSignMessage().finally(()=>this.isSigning=!1)}async onCancel(){this.isCancelling=!0,await ok.w.cancelSignMessage().finally(()=>this.isCancelling=!1)}};oI([(0,r.SB)()],oO.prototype,"isCancelling",void 0),oI([(0,r.SB)()],oO.prototype,"isSigning",void 0),oO=oI([(0,h.Mo)("w3m-siwx-sign-message-view")],oO)},2024:function(e,t,i){var o=i(45352),r=i(46491),a=i(57677),n=i(66879),s=i(62913),l=i(14810),c=(0,o.iv)`
  :host {
    width: 100%;
    display: block;
  }
`,d=function(e,t,i,o){var r,a=arguments.length,n=a<3?t:null===o?o=Object.getOwnPropertyDescriptor(t,i):o;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)n=Reflect.decorate(e,t,i,o);else for(var s=e.length-1;s>=0;s--)(r=e[s])&&(n=(a<3?r(n):a>3?r(t,i,n):r(t,i))||n);return a>3&&n&&Object.defineProperty(t,i,n),n};let u=class extends o.oi{constructor(){super(),this.unsubscribe=[],this.text="",this.open=a.f.state.open,this.unsubscribe.push(n.RouterController.subscribeKey("view",()=>{a.f.hide()}),s.I.subscribeKey("open",e=>{e||a.f.hide()}),a.f.subscribeKey("open",e=>{this.open=e}))}disconnectedCallback(){this.unsubscribe.forEach(e=>e()),a.f.hide()}render(){return(0,o.dy)`
      <div
        @pointermove=${this.onMouseEnter.bind(this)}
        @pointerleave=${this.onMouseLeave.bind(this)}
      >
        ${this.renderChildren()}
      </div>
    `}renderChildren(){return(0,o.dy)`<slot></slot> `}onMouseEnter(){let e=this.getBoundingClientRect();this.open||a.f.showTooltip({message:this.text,triggerRect:{width:e.width,height:e.height,left:e.left,top:e.top},variant:"shade"})}onMouseLeave(e){this.contains(e.relatedTarget)||a.f.hide()}};u.styles=[c],d([(0,r.Cb)()],u.prototype,"text",void 0),d([(0,r.SB)()],u.prototype,"open",void 0),d([(0,l.Mo)("w3m-tooltip-trigger")],u)},36721:function(e,t,i){var o=i(45352),r=i(46491);i(88896),i(95789),i(39045);var a=i(73616),n=i(24441),s=i(46454),l=(0,o.iv)`
  a {
    border: 1px solid var(--wui-color-gray-glass-010);
    border-radius: var(--wui-border-radius-3xl);
  }

  wui-image {
    border-radius: var(--wui-border-radius-3xl);
    overflow: hidden;
  }

  a.disabled > wui-icon:not(.image-icon),
  a.disabled > wui-image {
    filter: grayscale(1);
  }

  a[data-variant='fill'] {
    color: var(--wui-color-inverse-100);
    background-color: var(--wui-color-accent-100);
  }

  a[data-variant='shade'],
  a[data-variant='shadeSmall'] {
    background-color: transparent;
    background-color: var(--wui-color-gray-glass-010);
    color: var(--wui-color-fg-200);
  }

  a[data-variant='success'] {
    column-gap: var(--wui-spacing-xxs);
    border: 1px solid var(--wui-color-success-glass-010);
    background-color: var(--wui-color-success-glass-010);
    color: var(--wui-color-success-100);
  }

  a[data-variant='error'] {
    column-gap: var(--wui-spacing-xxs);
    border: 1px solid var(--wui-color-error-glass-010);
    background-color: var(--wui-color-error-glass-010);
    color: var(--wui-color-error-100);
  }

  a[data-variant='transparent'] {
    column-gap: var(--wui-spacing-xxs);
    background-color: transparent;
    color: var(--wui-color-fg-150);
  }

  a[data-variant='transparent'],
  a[data-variant='success'],
  a[data-variant='shadeSmall'],
  a[data-variant='error'] {
    padding: 7px var(--wui-spacing-s) 7px 10px;
  }

  a[data-variant='transparent']:has(wui-text:first-child),
  a[data-variant='success']:has(wui-text:first-child),
  a[data-variant='shadeSmall']:has(wui-text:first-child),
  a[data-variant='error']:has(wui-text:first-child) {
    padding: 7px var(--wui-spacing-s);
  }

  a[data-variant='fill'],
  a[data-variant='shade'] {
    column-gap: var(--wui-spacing-xs);
    padding: var(--wui-spacing-xxs) var(--wui-spacing-m) var(--wui-spacing-xxs)
      var(--wui-spacing-xs);
  }

  a[data-variant='fill']:has(wui-text:first-child),
  a[data-variant='shade']:has(wui-text:first-child) {
    padding: 9px var(--wui-spacing-m) 9px var(--wui-spacing-m);
  }

  a[data-variant='fill'] > wui-image,
  a[data-variant='shade'] > wui-image {
    width: 24px;
    height: 24px;
  }

  a[data-variant='fill'] > wui-image {
    box-shadow: inset 0 0 0 1px var(--wui-color-accent-090);
  }

  a[data-variant='shade'] > wui-image,
  a[data-variant='shadeSmall'] > wui-image {
    box-shadow: inset 0 0 0 1px var(--wui-color-gray-glass-010);
  }

  a[data-variant='fill'] > wui-icon:not(.image-icon),
  a[data-variant='shade'] > wui-icon:not(.image-icon) {
    width: 14px;
    height: 14px;
  }

  a[data-variant='transparent'] > wui-image,
  a[data-variant='success'] > wui-image,
  a[data-variant='shadeSmall'] > wui-image,
  a[data-variant='error'] > wui-image {
    width: 14px;
    height: 14px;
  }

  a[data-variant='transparent'] > wui-icon:not(.image-icon),
  a[data-variant='success'] > wui-icon:not(.image-icon),
  a[data-variant='shadeSmall'] > wui-icon:not(.image-icon),
  a[data-variant='error'] > wui-icon:not(.image-icon) {
    width: 12px;
    height: 12px;
  }

  a[data-variant='fill']:focus-visible {
    background-color: var(--wui-color-accent-090);
  }

  a[data-variant='shade']:focus-visible,
  a[data-variant='shadeSmall']:focus-visible {
    background-color: var(--wui-color-gray-glass-015);
  }

  a[data-variant='transparent']:focus-visible {
    background-color: var(--wui-color-gray-glass-005);
  }

  a[data-variant='success']:focus-visible {
    background-color: var(--wui-color-success-glass-015);
  }

  a[data-variant='error']:focus-visible {
    background-color: var(--wui-color-error-glass-015);
  }

  a.disabled {
    color: var(--wui-color-gray-glass-015);
    background-color: var(--wui-color-gray-glass-015);
    pointer-events: none;
  }

  @media (hover: hover) and (pointer: fine) {
    a[data-variant='fill']:hover {
      background-color: var(--wui-color-accent-090);
    }

    a[data-variant='shade']:hover,
    a[data-variant='shadeSmall']:hover {
      background-color: var(--wui-color-gray-glass-015);
    }

    a[data-variant='transparent']:hover {
      background-color: var(--wui-color-gray-glass-005);
    }

    a[data-variant='success']:hover {
      background-color: var(--wui-color-success-glass-015);
    }

    a[data-variant='error']:hover {
      background-color: var(--wui-color-error-glass-015);
    }
  }

  a[data-variant='fill']:active {
    background-color: var(--wui-color-accent-080);
  }

  a[data-variant='shade']:active,
  a[data-variant='shadeSmall']:active {
    background-color: var(--wui-color-gray-glass-020);
  }

  a[data-variant='transparent']:active {
    background-color: var(--wui-color-gray-glass-010);
  }

  a[data-variant='success']:active {
    background-color: var(--wui-color-success-glass-020);
  }

  a[data-variant='error']:active {
    background-color: var(--wui-color-error-glass-020);
  }
`,c=function(e,t,i,o){var r,a=arguments.length,n=a<3?t:null===o?o=Object.getOwnPropertyDescriptor(t,i):o;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)n=Reflect.decorate(e,t,i,o);else for(var s=e.length-1;s>=0;s--)(r=e[s])&&(n=(a<3?r(n):a>3?r(t,i,n):r(t,i))||n);return a>3&&n&&Object.defineProperty(t,i,n),n};let d=class extends o.oi{constructor(){super(...arguments),this.variant="fill",this.imageSrc=void 0,this.imageIcon=void 0,this.imageIconSize="md",this.disabled=!1,this.icon="externalLink",this.href="",this.text=void 0}render(){let e="success"===this.variant||"transparent"===this.variant||"shadeSmall"===this.variant;return(0,o.dy)`
      <a
        rel="noreferrer"
        target="_blank"
        href=${this.href}
        class=${this.disabled?"disabled":""}
        data-variant=${this.variant}
      >
        ${this.imageTemplate()}
        <wui-text variant=${e?"small-600":"paragraph-600"} color="inherit">
          ${this.title?this.title:n.H.getHostName(this.href)}
        </wui-text>
        <wui-icon name=${this.icon} color="inherit" size="inherit"></wui-icon>
      </a>
    `}imageTemplate(){return this.imageSrc?(0,o.dy)`<wui-image src=${this.imageSrc}></wui-image>`:this.imageIcon?(0,o.dy)`<wui-icon
        name=${this.imageIcon}
        color="inherit"
        size=${this.imageIconSize}
        class="image-icon"
      ></wui-icon>`:null}};d.styles=[a.ET,a.ZM,l],c([(0,r.Cb)()],d.prototype,"variant",void 0),c([(0,r.Cb)()],d.prototype,"imageSrc",void 0),c([(0,r.Cb)()],d.prototype,"imageIcon",void 0),c([(0,r.Cb)()],d.prototype,"imageIconSize",void 0),c([(0,r.Cb)({type:Boolean})],d.prototype,"disabled",void 0),c([(0,r.Cb)()],d.prototype,"icon",void 0),c([(0,r.Cb)()],d.prototype,"href",void 0),c([(0,r.Cb)()],d.prototype,"text",void 0),c([(0,s.M)("wui-chip")],d)},47242:function(e,t,i){var o=i(45352),r=i(46491),a=i(3001);i(39045);var n=i(73616),s=i(46454);i(73543);var l=(0,o.iv)`
  :host {
    position: relative;
    display: inline-block;
  }

  wui-text {
    margin: var(--wui-spacing-xxs) var(--wui-spacing-m) var(--wui-spacing-0) var(--wui-spacing-m);
  }
`,c=function(e,t,i,o){var r,a=arguments.length,n=a<3?t:null===o?o=Object.getOwnPropertyDescriptor(t,i):o;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)n=Reflect.decorate(e,t,i,o);else for(var s=e.length-1;s>=0;s--)(r=e[s])&&(n=(a<3?r(n):a>3?r(t,i,n):r(t,i))||n);return a>3&&n&&Object.defineProperty(t,i,n),n};let d=class extends o.oi{constructor(){super(...arguments),this.disabled=!1}render(){return(0,o.dy)`
      <wui-input-text
        type="email"
        placeholder="Email"
        icon="mail"
        size="mdl"
        .disabled=${this.disabled}
        .value=${this.value}
        data-testid="wui-email-input"
        tabIdx=${(0,a.o)(this.tabIdx)}
      ></wui-input-text>
      ${this.templateError()}
    `}templateError(){return this.errorMessage?(0,o.dy)`<wui-text variant="tiny-500" color="error-100">${this.errorMessage}</wui-text>`:null}};d.styles=[n.ET,l],c([(0,r.Cb)()],d.prototype,"errorMessage",void 0),c([(0,r.Cb)({type:Boolean})],d.prototype,"disabled",void 0),c([(0,r.Cb)()],d.prototype,"value",void 0),c([(0,r.Cb)()],d.prototype,"tabIdx",void 0),c([(0,s.M)("wui-email-input")],d)},21633:function(e,t,i){var o=i(45352),r=i(46491);i(88896);var a=i(73616),n=i(46454),s=(0,o.iv)`
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
`,l=function(e,t,i,o){var r,a=arguments.length,n=a<3?t:null===o?o=Object.getOwnPropertyDescriptor(t,i):o;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)n=Reflect.decorate(e,t,i,o);else for(var s=e.length-1;s>=0;s--)(r=e[s])&&(n=(a<3?r(n):a>3?r(t,i,n):r(t,i))||n);return a>3&&n&&Object.defineProperty(t,i,n),n};let c=class extends o.oi{constructor(){super(...arguments),this.text="",this.icon="card"}render(){return(0,o.dy)`<button>
      <wui-icon color="accent-100" name=${this.icon} size="lg"></wui-icon>
    </button>`}};c.styles=[a.ET,a.ZM,s],l([(0,r.Cb)()],c.prototype,"text",void 0),l([(0,r.Cb)()],c.prototype,"icon",void 0),l([(0,n.M)("wui-icon-button")],c)},99994:function(e,t,i){var o=i(45352),r=i(46491),a=i(3001);i(39045);var n=i(73616),s=i(46454);i(66828);var l=(0,o.iv)`
  button {
    column-gap: var(--wui-spacing-s);
    padding: 7px var(--wui-spacing-l) 7px var(--wui-spacing-xs);
    width: 100%;
    justify-content: flex-start;
    background-color: var(--wui-color-gray-glass-002);
    border-radius: var(--wui-border-radius-xs);
    color: var(--wui-color-fg-100);
  }

  wui-text {
    text-transform: capitalize;
  }

  wui-text[data-align='left'] {
    display: flex;
    flex: 1;
  }

  wui-text[data-align='center'] {
    display: flex;
    flex: 1;
    justify-content: center;
  }

  .invisible {
    opacity: 0;
    pointer-events: none;
  }

  button:disabled {
    background-color: var(--wui-color-gray-glass-015);
    color: var(--wui-color-gray-glass-015);
  }
`,c=function(e,t,i,o){var r,a=arguments.length,n=a<3?t:null===o?o=Object.getOwnPropertyDescriptor(t,i):o;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)n=Reflect.decorate(e,t,i,o);else for(var s=e.length-1;s>=0;s--)(r=e[s])&&(n=(a<3?r(n):a>3?r(t,i,n):r(t,i))||n);return a>3&&n&&Object.defineProperty(t,i,n),n};let d=class extends o.oi{constructor(){super(...arguments),this.logo="google",this.name="Continue with google",this.align="left",this.disabled=!1}render(){return(0,o.dy)`
      <button ?disabled=${this.disabled} tabindex=${(0,a.o)(this.tabIdx)}>
        <wui-logo logo=${this.logo}></wui-logo>
        <wui-text
          data-align=${this.align}
          variant="paragraph-500"
          color="inherit"
          align=${this.align}
          >${this.name}</wui-text
        >
        ${this.templatePlacement()}
      </button>
    `}templatePlacement(){return"center"===this.align?(0,o.dy)` <wui-logo class="invisible" logo=${this.logo}></wui-logo>`:null}};d.styles=[n.ET,n.ZM,l],c([(0,r.Cb)()],d.prototype,"logo",void 0),c([(0,r.Cb)()],d.prototype,"name",void 0),c([(0,r.Cb)()],d.prototype,"align",void 0),c([(0,r.Cb)()],d.prototype,"tabIdx",void 0),c([(0,r.Cb)({type:Boolean})],d.prototype,"disabled",void 0),c([(0,s.M)("wui-list-social")],d)},40680:function(e,t,i){var o=i(45352),r=i(46491);i(88896),i(95789),i(39045),i(87746);var a=i(73616),n=i(24441),s=i(46454),l=(0,o.iv)`
  button {
    padding: 6.5px var(--wui-spacing-l) 6.5px var(--wui-spacing-xs);
    display: flex;
    justify-content: space-between;
    width: 100%;
    border-radius: var(--wui-border-radius-xs);
    background-color: var(--wui-color-gray-glass-002);
  }

  button[data-clickable='false'] {
    pointer-events: none;
    background-color: transparent;
  }

  wui-image,
  wui-icon {
    width: var(--wui-spacing-3xl);
    height: var(--wui-spacing-3xl);
  }

  wui-image {
    border-radius: var(--wui-border-radius-3xl);
  }
`,c=function(e,t,i,o){var r,a=arguments.length,n=a<3?t:null===o?o=Object.getOwnPropertyDescriptor(t,i):o;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)n=Reflect.decorate(e,t,i,o);else for(var s=e.length-1;s>=0;s--)(r=e[s])&&(n=(a<3?r(n):a>3?r(t,i,n):r(t,i))||n);return a>3&&n&&Object.defineProperty(t,i,n),n};let d=class extends o.oi{constructor(){super(...arguments),this.tokenName="",this.tokenImageUrl="",this.tokenValue=0,this.tokenAmount="0.0",this.tokenCurrency="",this.clickable=!1}render(){return(0,o.dy)`
      <button data-clickable=${String(this.clickable)}>
        <wui-flex gap="s" alignItems="center">
          ${this.visualTemplate()}
          <wui-flex flexDirection="column" justifyContent="spaceBetween">
            <wui-text variant="paragraph-500" color="fg-100">${this.tokenName}</wui-text>
            <wui-text variant="small-400" color="fg-200">
              ${n.H.formatNumberToLocalString(this.tokenAmount,4)} ${this.tokenCurrency}
            </wui-text>
          </wui-flex>
        </wui-flex>
        <wui-text variant="paragraph-500" color="fg-100">$${this.tokenValue.toFixed(2)}</wui-text>
      </button>
    `}visualTemplate(){return this.tokenName&&this.tokenImageUrl?(0,o.dy)`<wui-image alt=${this.tokenName} src=${this.tokenImageUrl}></wui-image>`:(0,o.dy)`<wui-icon name="coinPlaceholder" color="fg-100"></wui-icon>`}};d.styles=[a.ET,a.ZM,l],c([(0,r.Cb)()],d.prototype,"tokenName",void 0),c([(0,r.Cb)()],d.prototype,"tokenImageUrl",void 0),c([(0,r.Cb)({type:Number})],d.prototype,"tokenValue",void 0),c([(0,r.Cb)()],d.prototype,"tokenAmount",void 0),c([(0,r.Cb)()],d.prototype,"tokenCurrency",void 0),c([(0,r.Cb)({type:Boolean})],d.prototype,"clickable",void 0),c([(0,s.M)("wui-list-token")],d)},34736:function(e,t,i){i(86852)},36566:function(e,t,i){var o=i(45352),r=i(46491);i(39045);var a=i(73616),n=i(46454),s=(0,o.iv)`
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
`,l=function(e,t,i,o){var r,a=arguments.length,n=a<3?t:null===o?o=Object.getOwnPropertyDescriptor(t,i):o;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)n=Reflect.decorate(e,t,i,o);else for(var s=e.length-1;s>=0;s--)(r=e[s])&&(n=(a<3?r(n):a>3?r(t,i,n):r(t,i))||n);return a>3&&n&&Object.defineProperty(t,i,n),n};let c=class extends o.oi{constructor(){super(...arguments),this.text=""}render(){return(0,o.dy)`${this.template()}`}template(){return this.text?(0,o.dy)`<wui-text variant="small-500" color="fg-200">${this.text}</wui-text>`:null}};c.styles=[a.ET,s],l([(0,r.Cb)()],c.prototype,"text",void 0),l([(0,n.M)("wui-separator")],c)},64542:function(e,t,i){i(91517)},10963:function(e,t,i){i(14178)},1840:function(e,t,i){i.d(t,{W:function(){return r}});var o=i(45352);let r=(0,o.YP)`<svg  viewBox="0 0 48 54" fill="none">
  <path
    d="M43.4605 10.7248L28.0485 1.61089C25.5438 0.129705 22.4562 0.129705 19.9515 1.61088L4.53951 10.7248C2.03626 12.2051 0.5 14.9365 0.5 17.886V36.1139C0.5 39.0635 2.03626 41.7949 4.53951 43.2752L19.9515 52.3891C22.4562 53.8703 25.5438 53.8703 28.0485 52.3891L43.4605 43.2752C45.9637 41.7949 47.5 39.0635 47.5 36.114V17.8861C47.5 14.9365 45.9637 12.2051 43.4605 10.7248Z"
  />
</svg>`},50227:function(e,t,i){var o=i(45352),r=i(46491);i(95789);var a=i(73616),n=i(24441),s=i(46454),l=(0,o.iv)`
  :host {
    display: block;
    width: var(--local-width);
    height: var(--local-height);
    border-radius: var(--wui-border-radius-3xl);
    box-shadow: 0 0 0 8px var(--wui-color-gray-glass-005);
    overflow: hidden;
    position: relative;
  }

  :host([data-variant='generated']) {
    --mixed-local-color-1: var(--local-color-1);
    --mixed-local-color-2: var(--local-color-2);
    --mixed-local-color-3: var(--local-color-3);
    --mixed-local-color-4: var(--local-color-4);
    --mixed-local-color-5: var(--local-color-5);
  }

  @supports (background: color-mix(in srgb, white 50%, black)) {
    :host([data-variant='generated']) {
      --mixed-local-color-1: color-mix(
        in srgb,
        var(--w3m-color-mix) var(--w3m-color-mix-strength),
        var(--local-color-1)
      );
      --mixed-local-color-2: color-mix(
        in srgb,
        var(--w3m-color-mix) var(--w3m-color-mix-strength),
        var(--local-color-2)
      );
      --mixed-local-color-3: color-mix(
        in srgb,
        var(--w3m-color-mix) var(--w3m-color-mix-strength),
        var(--local-color-3)
      );
      --mixed-local-color-4: color-mix(
        in srgb,
        var(--w3m-color-mix) var(--w3m-color-mix-strength),
        var(--local-color-4)
      );
      --mixed-local-color-5: color-mix(
        in srgb,
        var(--w3m-color-mix) var(--w3m-color-mix-strength),
        var(--local-color-5)
      );
    }
  }

  :host([data-variant='generated']) {
    box-shadow: 0 0 0 8px var(--wui-color-gray-glass-005);
    background: radial-gradient(
      var(--local-radial-circle),
      #fff 0.52%,
      var(--mixed-local-color-5) 31.25%,
      var(--mixed-local-color-3) 51.56%,
      var(--mixed-local-color-2) 65.63%,
      var(--mixed-local-color-1) 82.29%,
      var(--mixed-local-color-4) 100%
    );
  }

  :host([data-variant='default']) {
    box-shadow: 0 0 0 8px var(--wui-color-gray-glass-005);
    background: radial-gradient(
      75.29% 75.29% at 64.96% 24.36%,
      #fff 0.52%,
      #f5ccfc 31.25%,
      #dba4f5 51.56%,
      #9a8ee8 65.63%,
      #6493da 82.29%,
      #6ebdea 100%
    );
  }
`,c=function(e,t,i,o){var r,a=arguments.length,n=a<3?t:null===o?o=Object.getOwnPropertyDescriptor(t,i):o;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)n=Reflect.decorate(e,t,i,o);else for(var s=e.length-1;s>=0;s--)(r=e[s])&&(n=(a<3?r(n):a>3?r(t,i,n):r(t,i))||n);return a>3&&n&&Object.defineProperty(t,i,n),n};let d=class extends o.oi{constructor(){super(...arguments),this.imageSrc=void 0,this.alt=void 0,this.address=void 0,this.size="xl"}render(){return this.style.cssText=`
    --local-width: var(--wui-icon-box-size-${this.size});
    --local-height: var(--wui-icon-box-size-${this.size});
    `,(0,o.dy)`${this.visualTemplate()}`}visualTemplate(){if(this.imageSrc)return this.dataset.variant="image",(0,o.dy)`<wui-image src=${this.imageSrc} alt=${this.alt??"avatar"}></wui-image>`;if(this.address){this.dataset.variant="generated";let e=n.H.generateAvatarColors(this.address);return this.style.cssText+=`
 ${e}`,null}return this.dataset.variant="default",null}};d.styles=[a.ET,l],c([(0,r.Cb)()],d.prototype,"imageSrc",void 0),c([(0,r.Cb)()],d.prototype,"alt",void 0),c([(0,r.Cb)()],d.prototype,"address",void 0),c([(0,r.Cb)()],d.prototype,"size",void 0),c([(0,s.M)("wui-avatar")],d)},14909:function(e,t,i){var o=i(45352),r=i(46491);i(88896),i(95789),i(39045);var a=i(73616),n=i(46454),s=(0,o.iv)`
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
`,l=function(e,t,i,o){var r,a=arguments.length,n=a<3?t:null===o?o=Object.getOwnPropertyDescriptor(t,i):o;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)n=Reflect.decorate(e,t,i,o);else for(var s=e.length-1;s>=0;s--)(r=e[s])&&(n=(a<3?r(n):a>3?r(t,i,n):r(t,i))||n);return a>3&&n&&Object.defineProperty(t,i,n),n};let c=class extends o.oi{constructor(){super(...arguments),this.variant="accent",this.imageSrc="",this.disabled=!1,this.icon="externalLink",this.size="md",this.text=""}render(){let e="sm"===this.size?"small-600":"paragraph-600";return(0,o.dy)`
      <button
        class=${this.disabled?"disabled":""}
        data-variant=${this.variant}
        data-size=${this.size}
      >
        ${this.imageSrc?(0,o.dy)`<wui-image src=${this.imageSrc}></wui-image>`:null}
        <wui-text variant=${e} color="inherit"> ${this.text} </wui-text>
        <wui-icon name=${this.icon} color="inherit" size="inherit"></wui-icon>
      </button>
    `}};c.styles=[a.ET,a.ZM,s],l([(0,r.Cb)()],c.prototype,"variant",void 0),l([(0,r.Cb)()],c.prototype,"imageSrc",void 0),l([(0,r.Cb)({type:Boolean})],c.prototype,"disabled",void 0),l([(0,r.Cb)()],c.prototype,"icon",void 0),l([(0,r.Cb)()],c.prototype,"size",void 0),l([(0,r.Cb)()],c.prototype,"text",void 0),l([(0,n.M)("wui-chip-button")],c)},66828:function(e,t,i){var o=i(45352),r=i(46491);i(88896);var a=i(73616),n=i(46454),s=(0,o.iv)`
  :host {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 40px;
    height: 40px;
    border-radius: var(--wui-border-radius-3xl);
    border: 1px solid var(--wui-color-gray-glass-005);
    overflow: hidden;
  }

  wui-icon {
    width: 100%;
    height: 100%;
  }
`,l=function(e,t,i,o){var r,a=arguments.length,n=a<3?t:null===o?o=Object.getOwnPropertyDescriptor(t,i):o;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)n=Reflect.decorate(e,t,i,o);else for(var s=e.length-1;s>=0;s--)(r=e[s])&&(n=(a<3?r(n):a>3?r(t,i,n):r(t,i))||n);return a>3&&n&&Object.defineProperty(t,i,n),n};let c=class extends o.oi{constructor(){super(...arguments),this.logo="google"}render(){return(0,o.dy)`<wui-icon color="inherit" size="inherit" name=${this.logo}></wui-icon> `}};c.styles=[a.ET,s],l([(0,r.Cb)()],c.prototype,"logo",void 0),l([(0,n.M)("wui-logo")],c)},86852:function(e,t,i){var o=i(45352),r=i(46491);let a=(0,o.YP)`<svg width="86" height="96" fill="none">
  <path
    d="M78.3244 18.926L50.1808 2.45078C45.7376 -0.150261 40.2624 -0.150262 35.8192 2.45078L7.6756 18.926C3.23322 21.5266 0.5 26.3301 0.5 31.5248V64.4752C0.5 69.6699 3.23322 74.4734 7.6756 77.074L35.8192 93.5492C40.2624 96.1503 45.7376 96.1503 50.1808 93.5492L78.3244 77.074C82.7668 74.4734 85.5 69.6699 85.5 64.4752V31.5248C85.5 26.3301 82.7668 21.5266 78.3244 18.926Z"
  />
</svg>`;var n=i(1840);let s=(0,o.YP)`
  <svg fill="none" viewBox="0 0 36 40">
    <path
      d="M15.4 2.1a5.21 5.21 0 0 1 5.2 0l11.61 6.7a5.21 5.21 0 0 1 2.61 4.52v13.4c0 1.87-1 3.59-2.6 4.52l-11.61 6.7c-1.62.93-3.6.93-5.22 0l-11.6-6.7a5.21 5.21 0 0 1-2.61-4.51v-13.4c0-1.87 1-3.6 2.6-4.52L15.4 2.1Z"
    />
  </svg>
`;i(88896),i(95789);var l=i(73616),c=i(46454),d=(0,o.iv)`
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
`,u=function(e,t,i,o){var r,a=arguments.length,n=a<3?t:null===o?o=Object.getOwnPropertyDescriptor(t,i):o;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)n=Reflect.decorate(e,t,i,o);else for(var s=e.length-1;s>=0;s--)(r=e[s])&&(n=(a<3?r(n):a>3?r(t,i,n):r(t,i))||n);return a>3&&n&&Object.defineProperty(t,i,n),n};let p=class extends o.oi{constructor(){super(...arguments),this.size="md",this.name="uknown",this.networkImagesBySize={sm:s,md:n.W,lg:a},this.selected=!1,this.round=!1}render(){return this.round?(this.dataset.round="true",this.style.cssText=`
      --local-width: var(--wui-spacing-3xl);
      --local-height: var(--wui-spacing-3xl);
      --local-icon-size: var(--wui-spacing-l);
    `):this.style.cssText=`

      --local-path: var(--wui-path-network-${this.size});
      --local-width:  var(--wui-width-network-${this.size});
      --local-height:  var(--wui-height-network-${this.size});
      --local-icon-size:  var(--wui-icon-size-network-${this.size});
    `,(0,o.dy)`${this.templateVisual()} ${this.svgTemplate()} `}svgTemplate(){return this.round?null:this.networkImagesBySize[this.size]}templateVisual(){return this.imageSrc?(0,o.dy)`<wui-image src=${this.imageSrc} alt=${this.name}></wui-image>`:(0,o.dy)`<wui-icon size="inherit" color="fg-200" name="networkPlaceholder"></wui-icon>`}};p.styles=[l.ET,d],u([(0,r.Cb)()],p.prototype,"size",void 0),u([(0,r.Cb)()],p.prototype,"name",void 0),u([(0,r.Cb)({type:Object})],p.prototype,"networkImagesBySize",void 0),u([(0,r.Cb)()],p.prototype,"imageSrc",void 0),u([(0,r.Cb)({type:Boolean})],p.prototype,"selected",void 0),u([(0,r.Cb)({type:Boolean})],p.prototype,"round",void 0),u([(0,c.M)("wui-network-image")],p)},14178:function(e,t,i){var o=i(45352),r=i(46491);i(88896),i(95789),i(87746);var a=i(73616),n=i(46454);i(518);var s=(0,o.iv)`
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
`,l=function(e,t,i,o){var r,a=arguments.length,n=a<3?t:null===o?o=Object.getOwnPropertyDescriptor(t,i):o;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)n=Reflect.decorate(e,t,i,o);else for(var s=e.length-1;s>=0;s--)(r=e[s])&&(n=(a<3?r(n):a>3?r(t,i,n):r(t,i))||n);return a>3&&n&&Object.defineProperty(t,i,n),n};let c=class extends o.oi{constructor(){super(...arguments),this.size="md",this.name="",this.installed=!1,this.badgeSize="xs"}render(){let e="xxs";return e="lg"===this.size?"m":"md"===this.size?"xs":"xxs",this.style.cssText=`
       --local-border-radius: var(--wui-border-radius-${e});
       --local-size: var(--wui-wallet-image-size-${this.size});
   `,this.walletIcon&&(this.dataset.walletIcon=this.walletIcon),(0,o.dy)`
      <wui-flex justifyContent="center" alignItems="center"> ${this.templateVisual()} </wui-flex>
    `}templateVisual(){return this.imageSrc?(0,o.dy)`<wui-image src=${this.imageSrc} alt=${this.name}></wui-image>`:this.walletIcon?(0,o.dy)`<wui-icon
        data-parent-size="md"
        size="md"
        color="inherit"
        name=${this.walletIcon}
      ></wui-icon>`:(0,o.dy)`<wui-icon
      data-parent-size=${this.size}
      size="inherit"
      color="inherit"
      name="walletPlaceholder"
    ></wui-icon>`}};c.styles=[a.ZM,a.ET,s],l([(0,r.Cb)()],c.prototype,"size",void 0),l([(0,r.Cb)()],c.prototype,"name",void 0),l([(0,r.Cb)()],c.prototype,"imageSrc",void 0),l([(0,r.Cb)()],c.prototype,"walletIcon",void 0),l([(0,r.Cb)({type:Boolean})],c.prototype,"installed",void 0),l([(0,r.Cb)()],c.prototype,"badgeSize",void 0),l([(0,n.M)("wui-wallet-image")],c)}}]);