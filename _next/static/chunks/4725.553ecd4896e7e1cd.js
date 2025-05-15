"use strict";(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[4725],{93423:function(e,t,o){o.r(t),o.d(t,{W3mModal:function(){return Q}});var r=o(45352),i=o(46491),a=o(3001),s=o(26393),n=o(41671),l=o(62913),c=o(57750),d=o(20090),u=o(65092),h=o(66879),p=o(15603),w=o(88383),g=o(48737),b=o(994),m=o(14810),f=o(73616),v=o(46454),y=(0,r.iv)`
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
`;let C=class extends r.oi{render(){return(0,r.dy)`<slot></slot>`}};C.styles=[f.ET,y],C=function(e,t,o,r){var i,a=arguments.length,s=a<3?t:null===r?r=Object.getOwnPropertyDescriptor(t,o):r;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)s=Reflect.decorate(e,t,o,r);else for(var n=e.length-1;n>=0;n--)(i=e[n])&&(s=(a<3?i(s):a>3?i(t,o,s):i(t,o))||s);return a>3&&s&&Object.defineProperty(t,o,s),s}([(0,v.M)("wui-card")],C),o(28052);var k=o(89436);o(88896),o(39045),o(87746);var x=(0,r.iv)`
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
`,S=function(e,t,o,r){var i,a=arguments.length,s=a<3?t:null===r?r=Object.getOwnPropertyDescriptor(t,o):r;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)s=Reflect.decorate(e,t,o,r);else for(var n=e.length-1;n>=0;n--)(i=e[n])&&(s=(a<3?i(s):a>3?i(t,o,s):i(t,o))||s);return a>3&&s&&Object.defineProperty(t,o,s),s};let R=class extends r.oi{constructor(){super(...arguments),this.message="",this.backgroundColor="accent-100",this.iconColor="accent-100",this.icon="info"}render(){return this.style.cssText=`
      --local-icon-bg-value: var(--wui-color-${this.backgroundColor});
   `,(0,r.dy)`
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
    `}onClose(){k.AlertController.close()}};R.styles=[f.ET,x],S([(0,i.Cb)()],R.prototype,"message",void 0),S([(0,i.Cb)()],R.prototype,"backgroundColor",void 0),S([(0,i.Cb)()],R.prototype,"iconColor",void 0),S([(0,i.Cb)()],R.prototype,"icon",void 0),R=S([(0,v.M)("wui-alertbar")],R);var $=(0,r.iv)`
  :host {
    display: block;
    position: absolute;
    top: var(--wui-spacing-s);
    left: var(--wui-spacing-l);
    right: var(--wui-spacing-l);
    opacity: 0;
    pointer-events: none;
  }
`,T=function(e,t,o,r){var i,a=arguments.length,s=a<3?t:null===r?r=Object.getOwnPropertyDescriptor(t,o):r;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)s=Reflect.decorate(e,t,o,r);else for(var n=e.length-1;n>=0;n--)(i=e[n])&&(s=(a<3?i(s):a>3?i(t,o,s):i(t,o))||s);return a>3&&s&&Object.defineProperty(t,o,s),s};let N={info:{backgroundColor:"fg-350",iconColor:"fg-325",icon:"info"},success:{backgroundColor:"success-glass-reown-020",iconColor:"success-125",icon:"checkmark"},warning:{backgroundColor:"warning-glass-reown-020",iconColor:"warning-100",icon:"warningCircle"},error:{backgroundColor:"error-glass-reown-020",iconColor:"error-125",icon:"exclamationTriangle"}},O=class extends r.oi{constructor(){super(),this.unsubscribe=[],this.open=k.AlertController.state.open,this.onOpen(!0),this.unsubscribe.push(k.AlertController.subscribeKey("open",e=>{this.open=e,this.onOpen(!1)}))}disconnectedCallback(){this.unsubscribe.forEach(e=>e())}render(){let{message:e,variant:t}=k.AlertController.state,o=N[t];return(0,r.dy)`
      <wui-alertbar
        message=${e}
        backgroundColor=${o?.backgroundColor}
        iconColor=${o?.iconColor}
        icon=${o?.icon}
      ></wui-alertbar>
    `}onOpen(e){this.open?(this.animate([{opacity:0,transform:"scale(0.85)"},{opacity:1,transform:"scale(1)"}],{duration:150,fill:"forwards",easing:"ease"}),this.style.cssText="pointer-events: auto"):e||(this.animate([{opacity:1,transform:"scale(1)"},{opacity:0,transform:"scale(0.85)"}],{duration:150,fill:"forwards",easing:"ease"}),this.style.cssText="pointer-events: none")}};O.styles=$,T([(0,i.SB)()],O.prototype,"open",void 0),O=T([(0,m.Mo)("w3m-alertbar")],O);var E=o(97392),A=o(1401),I=o(37824),z=o(29113);o(26098),o(95789),o(518);var B=(0,r.iv)`
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
`,P=function(e,t,o,r){var i,a=arguments.length,s=a<3?t:null===r?r=Object.getOwnPropertyDescriptor(t,o):r;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)s=Reflect.decorate(e,t,o,r);else for(var n=e.length-1;n>=0;n--)(i=e[n])&&(s=(a<3?i(s):a>3?i(t,o,s):i(t,o))||s);return a>3&&s&&Object.defineProperty(t,o,s),s};let W=class extends r.oi{constructor(){super(...arguments),this.imageSrc=""}render(){return(0,r.dy)`<button>
      ${this.imageTemplate()}
      <wui-icon size="xs" color="fg-200" name="chevronBottom"></wui-icon>
    </button>`}imageTemplate(){return this.imageSrc?(0,r.dy)`<wui-image src=${this.imageSrc} alt="select visual"></wui-image>`:(0,r.dy)`<wui-icon-box
      size="xxs"
      iconColor="fg-200"
      backgroundColor="fg-100"
      background="opaque"
      icon="networkPlaceholder"
    ></wui-icon-box>`}};W.styles=[f.ET,f.ZM,f.Bp,B],P([(0,i.Cb)()],W.prototype,"imageSrc",void 0),W=P([(0,v.M)("wui-select")],W),o(84026),o(34595);var j=o(92421),D=(0,r.iv)`
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
`,L=function(e,t,o,r){var i,a=arguments.length,s=a<3?t:null===r?r=Object.getOwnPropertyDescriptor(t,o):r;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)s=Reflect.decorate(e,t,o,r);else for(var n=e.length-1;n>=0;n--)(i=e[n])&&(s=(a<3?i(s):a>3?i(t,o,s):i(t,o))||s);return a>3&&s&&Object.defineProperty(t,o,s),s};let M=["SmartSessionList"];function K(){let e=h.RouterController.state.data?.connector?.name,t=h.RouterController.state.data?.wallet?.name,o=h.RouterController.state.data?.network?.name,r=t??e,i=d.ConnectorController.getConnectors(),a=1===i.length&&i[0]?.id==="w3m-email";return{Connect:`Connect ${a?"Email":""} Wallet`,Create:"Create Wallet",ChooseAccountName:void 0,Account:void 0,AccountSettings:void 0,AllWallets:"All Wallets",ApproveTransaction:"Approve Transaction",BuyInProgress:"Buy",ConnectingExternal:r??"Connect Wallet",ConnectingWalletConnect:r??"WalletConnect",ConnectingWalletConnectBasic:"WalletConnect",ConnectingSiwe:"Sign In",Convert:"Convert",ConvertSelectToken:"Select token",ConvertPreview:"Preview convert",Downloads:r?`Get ${r}`:"Downloads",EmailLogin:"Email Login",EmailVerifyOtp:"Confirm Email",EmailVerifyDevice:"Register Device",GetWallet:"Get a wallet",Networks:"Choose Network",OnRampProviders:"Choose Provider",OnRampActivity:"Activity",OnRampTokenSelect:"Select Token",OnRampFiatSelect:"Select Currency",Pay:"How you pay",Profile:void 0,SwitchNetwork:o??"Switch Network",SwitchAddress:"Switch Address",Transactions:"Activity",UnsupportedChain:"Switch Network",UpgradeEmailWallet:"Upgrade your Wallet",UpdateEmailWallet:"Edit Email",UpdateEmailPrimaryOtp:"Confirm Current Email",UpdateEmailSecondaryOtp:"Confirm New Email",WhatIsABuy:"What is Buy?",RegisterAccountName:"Choose name",RegisterAccountNameSuccess:"",WalletReceive:"Receive",WalletCompatibleNetworks:"Compatible Networks",Swap:"Swap",SwapSelectToken:"Select token",SwapPreview:"Preview swap",WalletSend:"Send",WalletSendPreview:"Review send",WalletSendSelectToken:"Select Token",WhatIsANetwork:"What is a network?",WhatIsAWallet:"What is a wallet?",ConnectWallets:"Connect wallet",ConnectSocials:"All socials",ConnectingSocial:E.AccountController.state.socialProvider?E.AccountController.state.socialProvider:"Connect Social",ConnectingMultiChain:"Select chain",ConnectingFarcaster:"Farcaster",SwitchActiveChain:"Switch chain",SmartSessionCreated:void 0,SmartSessionList:"Smart Sessions",SIWXSignMessage:"Sign In",PayLoading:"Payment in progress"}}let H=class extends r.oi{constructor(){super(),this.unsubscribe=[],this.heading=K()[h.RouterController.state.view],this.network=c.R.state.activeCaipNetwork,this.networkImage=A.f.getNetworkImage(this.network),this.showBack=!1,this.prevHistoryLength=1,this.view=h.RouterController.state.view,this.viewDirection="",this.headerText=K()[h.RouterController.state.view],this.unsubscribe.push(I.W.subscribeNetworkImages(()=>{this.networkImage=A.f.getNetworkImage(this.network)}),h.RouterController.subscribeKey("view",e=>{setTimeout(()=>{this.view=e,this.headerText=K()[e]},j.b.ANIMATION_DURATIONS.HeaderText),this.onViewChange(),this.onHistoryChange()}),c.R.subscribeKey("activeCaipNetwork",e=>{this.network=e,this.networkImage=A.f.getNetworkImage(this.network)}))}disconnectCallback(){this.unsubscribe.forEach(e=>e())}render(){return(0,r.dy)`
      <wui-flex .padding=${this.getPadding()} justifyContent="space-between" alignItems="center">
        ${this.leftHeaderTemplate()} ${this.titleTemplate()} ${this.rightHeaderTemplate()}
      </wui-flex>
    `}onWalletHelp(){z.X.sendEvent({type:"track",event:"CLICK_WALLET_HELP"}),h.RouterController.push("WhatIsAWallet")}async onClose(){"UnsupportedChain"===h.RouterController.state.view||await p.w.isSIWXCloseDisabled()?l.I.shake():l.I.close(!0)}rightHeaderTemplate(){let e=n.OptionsController?.state?.features?.smartSessions;return"Account"===h.RouterController.state.view&&e?(0,r.dy)`<wui-flex>
      <wui-icon-link
        icon="clock"
        @click=${()=>h.RouterController.push("SmartSessionList")}
        data-testid="w3m-header-smart-sessions"
      ></wui-icon-link>
      ${this.closeButtonTemplate()}
    </wui-flex> `:this.closeButtonTemplate()}closeButtonTemplate(){return(0,r.dy)`
      <wui-icon-link
        icon="close"
        @click=${this.onClose.bind(this)}
        data-testid="w3m-header-close"
      ></wui-icon-link>
    `}titleTemplate(){let e=M.includes(this.view);return(0,r.dy)`
      <wui-flex
        view-direction="${this.viewDirection}"
        class="w3m-header-title"
        alignItems="center"
        gap="xs"
      >
        <wui-text variant="paragraph-700" color="fg-100" data-testid="w3m-header-text"
          >${this.headerText}</wui-text
        >
        ${e?(0,r.dy)`<wui-tag variant="main">Beta</wui-tag>`:null}
      </wui-flex>
    `}leftHeaderTemplate(){let{view:e}=h.RouterController.state,t="Connect"===e,o=n.OptionsController.state.enableEmbedded,i=n.OptionsController.state.enableNetworkSwitch;return"Account"===e&&i?(0,r.dy)`<wui-select
        id="dynamic"
        data-testid="w3m-account-select-network"
        active-network=${(0,a.o)(this.network?.name)}
        @click=${this.onNetworks.bind(this)}
        imageSrc=${(0,a.o)(this.networkImage)}
      ></wui-select>`:this.showBack&&!("ApproveTransaction"===e||"ConnectingSiwe"===e||t&&o)?(0,r.dy)`<wui-icon-link
        data-testid="header-back"
        id="dynamic"
        icon="chevronLeft"
        @click=${this.onGoBack.bind(this)}
      ></wui-icon-link>`:(0,r.dy)`<wui-icon-link
      data-hidden=${!t}
      id="dynamic"
      icon="helpCircle"
      @click=${this.onWalletHelp.bind(this)}
    ></wui-icon-link>`}onNetworks(){this.isAllowedNetworkSwitch()&&(z.X.sendEvent({type:"track",event:"CLICK_NETWORKS"}),h.RouterController.push("Networks"))}isAllowedNetworkSwitch(){let e=c.R.getAllRequestedCaipNetworks(),t=!!e&&e.length>1,o=e?.find(({id:e})=>e===this.network?.id);return t||!o}getPadding(){return this.heading?["l","2l","l","2l"]:["0","2l","0","2l"]}onViewChange(){let{history:e}=h.RouterController.state,t=j.b.VIEW_DIRECTION.Next;e.length<this.prevHistoryLength&&(t=j.b.VIEW_DIRECTION.Prev),this.prevHistoryLength=e.length,this.viewDirection=t}async onHistoryChange(){let{history:e}=h.RouterController.state,t=this.shadowRoot?.querySelector("#dynamic");e.length>1&&!this.showBack&&t?(await t.animate([{opacity:1},{opacity:0}],{duration:200,fill:"forwards",easing:"ease"}).finished,this.showBack=!0,t.animate([{opacity:0},{opacity:1}],{duration:200,fill:"forwards",easing:"ease"})):e.length<=1&&this.showBack&&t&&(await t.animate([{opacity:1},{opacity:0}],{duration:200,fill:"forwards",easing:"ease"}).finished,this.showBack=!1,t.animate([{opacity:0},{opacity:1}],{duration:200,fill:"forwards",easing:"ease"}))}onGoBack(){h.RouterController.goBack()}};H.styles=D,L([(0,i.SB)()],H.prototype,"heading",void 0),L([(0,i.SB)()],H.prototype,"network",void 0),L([(0,i.SB)()],H.prototype,"networkImage",void 0),L([(0,i.SB)()],H.prototype,"showBack",void 0),L([(0,i.SB)()],H.prototype,"prevHistoryLength",void 0),L([(0,i.SB)()],H.prototype,"view",void 0),L([(0,i.SB)()],H.prototype,"viewDirection",void 0),L([(0,i.SB)()],H.prototype,"headerText",void 0),H=L([(0,m.Mo)("w3m-header")],H),o(23726);var U=(0,r.iv)`
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
`,Y=function(e,t,o,r){var i,a=arguments.length,s=a<3?t:null===r?r=Object.getOwnPropertyDescriptor(t,o):r;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)s=Reflect.decorate(e,t,o,r);else for(var n=e.length-1;n>=0;n--)(i=e[n])&&(s=(a<3?i(s):a>3?i(t,o,s):i(t,o))||s);return a>3&&s&&Object.defineProperty(t,o,s),s};let _=class extends r.oi{constructor(){super(...arguments),this.backgroundColor="accent-100",this.iconColor="accent-100",this.icon="checkmark",this.message="",this.loading=!1,this.iconType="default"}render(){return(0,r.dy)`
      ${this.templateIcon()}
      <wui-text variant="paragraph-500" color="fg-100" data-testid="wui-snackbar-message"
        >${this.message}</wui-text
      >
    `}templateIcon(){return this.loading?(0,r.dy)`<wui-loading-spinner size="md" color="accent-100"></wui-loading-spinner>`:"default"===this.iconType?(0,r.dy)`<wui-icon size="xl" color=${this.iconColor} name=${this.icon}></wui-icon>`:(0,r.dy)`<wui-icon-box
      size="sm"
      iconSize="xs"
      iconColor=${this.iconColor}
      backgroundColor=${this.backgroundColor}
      icon=${this.icon}
      background="opaque"
    ></wui-icon-box>`}};_.styles=[f.ET,U],Y([(0,i.Cb)()],_.prototype,"backgroundColor",void 0),Y([(0,i.Cb)()],_.prototype,"iconColor",void 0),Y([(0,i.Cb)()],_.prototype,"icon",void 0),Y([(0,i.Cb)()],_.prototype,"message",void 0),Y([(0,i.Cb)()],_.prototype,"loading",void 0),Y([(0,i.Cb)()],_.prototype,"iconType",void 0),_=Y([(0,v.M)("wui-snackbar")],_);var X=(0,r.iv)`
  :host {
    display: block;
    position: absolute;
    opacity: 0;
    pointer-events: none;
    top: 11px;
    left: 50%;
    width: max-content;
  }
`,q=function(e,t,o,r){var i,a=arguments.length,s=a<3?t:null===r?r=Object.getOwnPropertyDescriptor(t,o):r;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)s=Reflect.decorate(e,t,o,r);else for(var n=e.length-1;n>=0;n--)(i=e[n])&&(s=(a<3?i(s):a>3?i(t,o,s):i(t,o))||s);return a>3&&s&&Object.defineProperty(t,o,s),s};let G={loading:void 0,success:{backgroundColor:"success-100",iconColor:"success-100",icon:"checkmark"},error:{backgroundColor:"error-100",iconColor:"error-100",icon:"close"}},V=class extends r.oi{constructor(){super(),this.unsubscribe=[],this.timeout=void 0,this.open=g.SnackController.state.open,this.unsubscribe.push(g.SnackController.subscribeKey("open",e=>{this.open=e,this.onOpen()}))}disconnectedCallback(){clearTimeout(this.timeout),this.unsubscribe.forEach(e=>e())}render(){let{message:e,variant:t,svg:o}=g.SnackController.state,i=G[t],{icon:a,iconColor:s}=o??i??{};return(0,r.dy)`
      <wui-snackbar
        message=${e}
        backgroundColor=${i?.backgroundColor}
        iconColor=${s}
        icon=${a}
        .loading=${"loading"===t}
      ></wui-snackbar>
    `}onOpen(){clearTimeout(this.timeout),this.open?(this.animate([{opacity:0,transform:"translateX(-50%) scale(0.85)"},{opacity:1,transform:"translateX(-50%) scale(1)"}],{duration:150,fill:"forwards",easing:"ease"}),this.timeout&&clearTimeout(this.timeout),g.SnackController.state.autoClose&&(this.timeout=setTimeout(()=>g.SnackController.hide(),2500))):this.animate([{opacity:1,transform:"translateX(-50%) scale(1)"},{opacity:0,transform:"translateX(-50%) scale(0.85)"}],{duration:150,fill:"forwards",easing:"ease"})}};V.styles=X,q([(0,i.SB)()],V.prototype,"open",void 0),V=q([(0,m.Mo)("w3m-snackbar")],V),o(76276),o(2660);var F=(0,r.iv)`
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
`,Z=function(e,t,o,r){var i,a=arguments.length,s=a<3?t:null===r?r=Object.getOwnPropertyDescriptor(t,o):r;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)s=Reflect.decorate(e,t,o,r);else for(var n=e.length-1;n>=0;n--)(i=e[n])&&(s=(a<3?i(s):a>3?i(t,o,s):i(t,o))||s);return a>3&&s&&Object.defineProperty(t,o,s),s};let J="scroll-lock",Q=class extends r.oi{constructor(){super(),this.unsubscribe=[],this.abortController=void 0,this.hasPrefetched=!1,this.enableEmbedded=n.OptionsController.state.enableEmbedded,this.open=l.I.state.open,this.caipAddress=c.R.state.activeCaipAddress,this.caipNetwork=c.R.state.activeCaipNetwork,this.shake=l.I.state.shake,this.filterByNamespace=d.ConnectorController.state.filterByNamespace,this.initializeTheming(),u.ApiController.prefetchAnalyticsConfig(),this.unsubscribe.push(l.I.subscribeKey("open",e=>e?this.onOpen():this.onClose()),l.I.subscribeKey("shake",e=>this.shake=e),c.R.subscribeKey("activeCaipNetwork",e=>this.onNewNetwork(e)),c.R.subscribeKey("activeCaipAddress",e=>this.onNewAddress(e)),n.OptionsController.subscribeKey("enableEmbedded",e=>this.enableEmbedded=e),d.ConnectorController.subscribeKey("filterByNamespace",e=>{this.filterByNamespace===e||c.R.getAccountData(e)?.caipAddress||(u.ApiController.fetchRecommendedWallets(),this.filterByNamespace=e)}))}firstUpdated(){if(this.caipAddress){if(this.enableEmbedded){l.I.close(),this.prefetch();return}this.onNewAddress(this.caipAddress)}this.open&&this.onOpen(),this.enableEmbedded&&this.prefetch()}disconnectedCallback(){this.unsubscribe.forEach(e=>e()),this.onRemoveKeyboardListener()}render(){return(this.style.cssText=`
      --local-border-bottom-mobile-radius: ${this.enableEmbedded?"clamp(0px, var(--wui-border-radius-l), 44px)":"0px"};
    `,this.enableEmbedded)?(0,r.dy)`${this.contentTemplate()}
        <w3m-tooltip></w3m-tooltip> `:this.open?(0,r.dy)`
          <wui-flex @click=${this.onOverlayClick.bind(this)} data-testid="w3m-modal-overlay">
            ${this.contentTemplate()}
          </wui-flex>
          <w3m-tooltip></w3m-tooltip>
        `:null}contentTemplate(){return(0,r.dy)` <wui-card
      shake="${this.shake}"
      data-embedded="${(0,a.o)(this.enableEmbedded)}"
      role="alertdialog"
      aria-modal="true"
      tabindex="0"
      data-testid="w3m-modal-card"
    >
      <w3m-header></w3m-header>
      <w3m-router></w3m-router>
      <w3m-snackbar></w3m-snackbar>
      <w3m-alertbar></w3m-alertbar>
    </wui-card>`}async onOverlayClick(e){e.target===e.currentTarget&&await this.handleClose()}async handleClose(){"UnsupportedChain"===h.RouterController.state.view||await p.w.isSIWXCloseDisabled()?l.I.shake():l.I.close()}initializeTheming(){let{themeVariables:e,themeMode:t}=w.ThemeController.state,o=m.Hg.getColorTheme(t);(0,m.n)(e,o)}onClose(){this.open=!1,this.classList.remove("open"),this.onScrollUnlock(),g.SnackController.hide(),this.onRemoveKeyboardListener()}onOpen(){this.open=!0,this.classList.add("open"),this.onScrollLock(),this.onAddKeyboardListener()}onScrollLock(){let e=document.createElement("style");e.dataset.w3m=J,e.textContent=`
      body {
        touch-action: none;
        overflow: hidden;
        overscroll-behavior: contain;
      }
      w3m-modal {
        pointer-events: auto;
      }
    `,document.head.appendChild(e)}onScrollUnlock(){let e=document.head.querySelector(`style[data-w3m="${J}"]`);e&&e.remove()}onAddKeyboardListener(){this.abortController=new AbortController;let e=this.shadowRoot?.querySelector("wui-card");e?.focus(),window.addEventListener("keydown",t=>{if("Escape"===t.key)this.handleClose();else if("Tab"===t.key){let{tagName:o}=t.target;!o||o.includes("W3M-")||o.includes("WUI-")||e?.focus()}},this.abortController)}onRemoveKeyboardListener(){this.abortController?.abort(),this.abortController=void 0}async onNewAddress(e){let t=c.R.state.isSwitchingNamespace,o=b.j.getPlainAddress(e);o||t?t&&o&&h.RouterController.goBack():l.I.close(),await p.w.initializeIfEnabled(),this.caipAddress=e,c.R.setIsSwitchingNamespace(!1)}onNewNetwork(e){let t=this.caipNetwork,o=t?.caipNetworkId?.toString(),r=t?.chainNamespace,i=e?.caipNetworkId?.toString(),a=e?.chainNamespace,n=o!==i,c=t?.name===s.b.UNSUPPORTED_NETWORK_NAME,d="ConnectingExternal"===h.RouterController.state.view,u=!this.caipAddress,p="UnsupportedChain"===h.RouterController.state.view,w=l.I.state.open,g=!1;w&&!d&&(u?n&&(g=!0):p?g=!0:!n||r!==a||c||(g=!0)),g&&"SIWXSignMessage"!==h.RouterController.state.view&&h.RouterController.goBack(),this.caipNetwork=e}prefetch(){this.hasPrefetched||(u.ApiController.prefetch(),u.ApiController.fetchWalletsByPage({page:1}),this.hasPrefetched=!0)}};Q.styles=F,Z([(0,i.Cb)({type:Boolean})],Q.prototype,"enableEmbedded",void 0),Z([(0,i.SB)()],Q.prototype,"open",void 0),Z([(0,i.SB)()],Q.prototype,"caipAddress",void 0),Z([(0,i.SB)()],Q.prototype,"caipNetwork",void 0),Z([(0,i.SB)()],Q.prototype,"shake",void 0),Z([(0,i.SB)()],Q.prototype,"filterByNamespace",void 0),Q=Z([(0,m.Mo)("w3m-modal")],Q)},73356:function(e,t,o){o(88896)},95789:function(e,t,o){var r=o(45352),i=o(46491),a=o(73616),s=o(46454),n=(0,r.iv)`
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
`,l=function(e,t,o,r){var i,a=arguments.length,s=a<3?t:null===r?r=Object.getOwnPropertyDescriptor(t,o):r;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)s=Reflect.decorate(e,t,o,r);else for(var n=e.length-1;n>=0;n--)(i=e[n])&&(s=(a<3?i(s):a>3?i(t,o,s):i(t,o))||s);return a>3&&s&&Object.defineProperty(t,o,s),s};let c=class extends r.oi{constructor(){super(...arguments),this.src="./path/to/image.jpg",this.alt="Image",this.size=void 0}render(){return this.style.cssText=`
      --local-width: ${this.size?`var(--wui-icon-size-${this.size});`:"100%"};
      --local-height: ${this.size?`var(--wui-icon-size-${this.size});`:"100%"};
      `,(0,r.dy)`<img src=${this.src} alt=${this.alt} @error=${this.handleImageError} />`}handleImageError(){this.dispatchEvent(new CustomEvent("onLoadError",{bubbles:!0,composed:!0}))}};c.styles=[a.ET,a.Bp,n],l([(0,i.Cb)()],c.prototype,"src",void 0),l([(0,i.Cb)()],c.prototype,"alt",void 0),l([(0,i.Cb)()],c.prototype,"size",void 0),l([(0,s.M)("wui-image")],c)},23726:function(e,t,o){var r=o(45352),i=o(46491),a=o(73616),s=o(46454),n=(0,r.iv)`
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
`,l=function(e,t,o,r){var i,a=arguments.length,s=a<3?t:null===r?r=Object.getOwnPropertyDescriptor(t,o):r;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)s=Reflect.decorate(e,t,o,r);else for(var n=e.length-1;n>=0;n--)(i=e[n])&&(s=(a<3?i(s):a>3?i(t,o,s):i(t,o))||s);return a>3&&s&&Object.defineProperty(t,o,s),s};let c=class extends r.oi{constructor(){super(...arguments),this.color="accent-100",this.size="lg"}render(){return this.style.cssText=`--local-color: ${"inherit"===this.color?"inherit":`var(--wui-color-${this.color})`}`,this.dataset.size=this.size,(0,r.dy)`<svg viewBox="25 25 50 50">
      <circle r="20" cy="50" cx="50"></circle>
    </svg>`}};c.styles=[a.ET,n],l([(0,i.Cb)()],c.prototype,"color",void 0),l([(0,i.Cb)()],c.prototype,"size",void 0),l([(0,s.M)("wui-loading-spinner")],c)},518:function(e,t,o){var r=o(45352),i=o(46491);o(88896);var a=o(73616),s=o(46454),n=(0,r.iv)`
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
`,l=function(e,t,o,r){var i,a=arguments.length,s=a<3?t:null===r?r=Object.getOwnPropertyDescriptor(t,o):r;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)s=Reflect.decorate(e,t,o,r);else for(var n=e.length-1;n>=0;n--)(i=e[n])&&(s=(a<3?i(s):a>3?i(t,o,s):i(t,o))||s);return a>3&&s&&Object.defineProperty(t,o,s),s};let c=class extends r.oi{constructor(){super(...arguments),this.size="md",this.backgroundColor="accent-100",this.iconColor="accent-100",this.background="transparent",this.border=!1,this.borderColor="wui-color-bg-125",this.icon="copy"}render(){let e=this.iconSize||this.size,t="lg"===this.size,o="xl"===this.size,i="gray"===this.background,a="opaque"===this.background,s="accent-100"===this.backgroundColor&&a||"success-100"===this.backgroundColor&&a||"error-100"===this.backgroundColor&&a||"inverse-100"===this.backgroundColor&&a,n=`var(--wui-color-${this.backgroundColor})`;return s?n=`var(--wui-icon-box-bg-${this.backgroundColor})`:i&&(n=`var(--wui-color-gray-${this.backgroundColor})`),this.style.cssText=`
       --local-bg-value: ${n};
       --local-bg-mix: ${s||i?"100%":t?"12%":"16%"};
       --local-border-radius: var(--wui-border-radius-${t?"xxs":o?"s":"3xl"});
       --local-size: var(--wui-icon-box-size-${this.size});
       --local-border: ${"wui-color-bg-125"===this.borderColor?"2px":"1px"} solid ${this.border?`var(--${this.borderColor})`:"transparent"}
   `,(0,r.dy)` <wui-icon color=${this.iconColor} size=${e} name=${this.icon}></wui-icon> `}};c.styles=[a.ET,a.ZM,n],l([(0,i.Cb)()],c.prototype,"size",void 0),l([(0,i.Cb)()],c.prototype,"backgroundColor",void 0),l([(0,i.Cb)()],c.prototype,"iconColor",void 0),l([(0,i.Cb)()],c.prototype,"iconSize",void 0),l([(0,i.Cb)()],c.prototype,"background",void 0),l([(0,i.Cb)({type:Boolean})],c.prototype,"border",void 0),l([(0,i.Cb)()],c.prototype,"borderColor",void 0),l([(0,i.Cb)()],c.prototype,"icon",void 0),l([(0,s.M)("wui-icon-box")],c)}}]);