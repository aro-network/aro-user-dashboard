"use strict";(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[1896],{79677:function(e,t,o){o.d(t,{y0:function(){return g}});var r=o(26393),i=o(97392),a=o(57750),n=o(20090),s=o(29113),l=o(66879),c=o(48737),d=o(994),u=o(55998);async function h(){l.RouterController.push("ConnectingFarcaster");let e=n.ConnectorController.getAuthConnector();if(e&&!i.AccountController.state.farcasterUrl)try{let{url:t}=await e.provider.getFarcasterUri();i.AccountController.setFarcasterUrl(t,a.R.state.activeChain)}catch(e){l.RouterController.goBack(),c.SnackController.showError(e)}}async function p(e){l.RouterController.push("ConnectingSocial");let t=n.ConnectorController.getAuthConnector(),o=null;try{let n=setTimeout(()=>{throw Error("Social login timed out. Please try again.")},45e3);if(t&&e){if(d.j.isTelegram()||(o=function(){try{return d.j.returnOpenHref(`${r.b.SECURE_SITE_SDK_ORIGIN}/loading`,"popupWindow","width=600,height=800,scrollbars=yes")}catch(e){throw Error("Could not open social popup")}}()),o)i.AccountController.setSocialWindow(o,a.R.state.activeChain);else if(!d.j.isTelegram())throw Error("Could not create social popup");let{uri:s}=await t.provider.getSocialRedirectUri({provider:e});if(!s)throw o?.close(),Error("Could not fetch the social redirect uri");if(o&&(o.location.href=s),d.j.isTelegram()){u.M.setTelegramSocialProvider(e);let t=d.j.formatTelegramSocialLoginUrl(s);d.j.openHref(t,"_top")}clearTimeout(n)}}catch(e){o?.close(),c.SnackController.showError(e?.message)}}async function g(e){i.AccountController.setSocialProvider(e,a.R.state.activeChain),s.X.sendEvent({type:"track",event:"SOCIAL_LOGIN_STARTED",properties:{provider:e}}),"farcaster"===e?await h():await p(e)}},95138:function(e,t,o){o.r(t),o.d(t,{W3mConnectSocialsView:function(){return m},W3mConnectingFarcasterView:function(){return U},W3mConnectingSocialView:function(){return j}});var r=o(45352),i=o(46491),a=o(3001),n=o(77827),s=o(41671),l=o(14810);o(28052),o(96511),o(92725);var c=o(20090),d=o(66879),u=o(96005),h=o(89436),p=o(79677),g=o(994);o(99994);var v=o(63346),w=(0,r.iv)`
  :host {
    margin-top: var(--wui-spacing-3xs);
  }
  wui-separator {
    margin: var(--wui-spacing-m) calc(var(--wui-spacing-m) * -1) var(--wui-spacing-xs)
      calc(var(--wui-spacing-m) * -1);
    width: calc(100% + var(--wui-spacing-s) * 2);
  }
`,b=function(e,t,o,r){var i,a=arguments.length,n=a<3?t:null===r?r=Object.getOwnPropertyDescriptor(t,o):r;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)n=Reflect.decorate(e,t,o,r);else for(var s=e.length-1;s>=0;s--)(i=e[s])&&(n=(a<3?i(n):a>3?i(t,o,n):i(t,o))||n);return a>3&&n&&Object.defineProperty(t,o,n),n};let f=class extends r.oi{constructor(){super(),this.unsubscribe=[],this.tabIdx=void 0,this.connectors=c.ConnectorController.state.connectors,this.authConnector=this.connectors.find(e=>"AUTH"===e.type),this.features=s.OptionsController.state.features,this.isPwaLoading=!1,this.unsubscribe.push(c.ConnectorController.subscribeKey("connectors",e=>{this.connectors=e,this.authConnector=this.connectors.find(e=>"AUTH"===e.type)}),s.OptionsController.subscribeKey("features",e=>this.features=e))}connectedCallback(){super.connectedCallback(),this.handlePwaFrameLoad()}disconnectedCallback(){this.unsubscribe.forEach(e=>e())}render(){let e=this.features?.socials||[],t=!!this.authConnector,o=e?.length,i="ConnectSocials"===d.RouterController.state.view;return t&&o||i?(i&&!o&&(e=u.bq.DEFAULT_FEATURES.socials),(0,r.dy)` <wui-flex flexDirection="column" gap="xs">
      ${e.map(e=>(0,r.dy)`<wui-list-social
            @click=${()=>{this.onSocialClick(e)}}
            data-testid=${`social-selector-${e}`}
            name=${e}
            logo=${e}
            ?disabled=${this.isPwaLoading}
          ></wui-list-social>`)}
    </wui-flex>`):null}async onSocialClick(e){e&&await (0,p.y0)(e)}async handlePwaFrameLoad(){if(g.j.isPWA()){this.isPwaLoading=!0;try{this.authConnector?.provider instanceof v.S&&await this.authConnector.provider.init()}catch(e){h.AlertController.open({shortMessage:"Error loading embedded wallet in PWA",longMessage:e.message},"error")}finally{this.isPwaLoading=!1}}}};f.styles=w,b([(0,i.Cb)()],f.prototype,"tabIdx",void 0),b([(0,i.SB)()],f.prototype,"connectors",void 0),b([(0,i.SB)()],f.prototype,"authConnector",void 0),b([(0,i.SB)()],f.prototype,"features",void 0),b([(0,i.SB)()],f.prototype,"isPwaLoading",void 0),f=b([(0,l.Mo)("w3m-social-login-list")],f);var y=(0,r.iv)`
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
`,x=function(e,t,o,r){var i,a=arguments.length,n=a<3?t:null===r?r=Object.getOwnPropertyDescriptor(t,o):r;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)n=Reflect.decorate(e,t,o,r);else for(var s=e.length-1;s>=0;s--)(i=e[s])&&(n=(a<3?i(n):a>3?i(t,o,n):i(t,o))||n);return a>3&&n&&Object.defineProperty(t,o,n),n};let m=class extends r.oi{constructor(){super(),this.unsubscribe=[],this.checked=n.M.state.isLegalCheckboxChecked,this.unsubscribe.push(n.M.subscribeKey("isLegalCheckboxChecked",e=>{this.checked=e}))}disconnectedCallback(){this.unsubscribe.forEach(e=>e())}render(){let{termsConditionsUrl:e,privacyPolicyUrl:t}=s.OptionsController.state,o=s.OptionsController.state.features?.legalCheckbox,i=!!(e||t)&&!!o,n=i&&!this.checked;return(0,r.dy)`
      <w3m-legal-checkbox></w3m-legal-checkbox>
      <wui-flex
        flexDirection="column"
        .padding=${i?["0","s","s","s"]:"s"}
        gap="xs"
        class=${(0,a.o)(n?"disabled":void 0)}
      >
        <w3m-social-login-list tabIdx=${(0,a.o)(n?-1:void 0)}></w3m-social-login-list>
      </wui-flex>
      <w3m-legal-footer></w3m-legal-footer>
    `}};m.styles=y,x([(0,i.SB)()],m.prototype,"checked",void 0),m=x([(0,l.Mo)("w3m-connect-socials-view")],m);var C=o(97392),k=o(57750),S=o(29113),$=o(55998),R=o(76711),P=o(48737),E=o(62913),T=o(88383);o(76129),o(96742),o(66828),o(34595);var O=o(69490),z=o(92421),I=(0,r.iv)`
  wui-logo {
    width: 80px;
    height: 80px;
    border-radius: var(--wui-border-radius-m);
  }
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
    transition: all var(--wui-ease-out-power-2) var(--wui-duration-lg);
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
  .capitalize {
    text-transform: capitalize;
  }
`,L=function(e,t,o,r){var i,a=arguments.length,n=a<3?t:null===r?r=Object.getOwnPropertyDescriptor(t,o):r;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)n=Reflect.decorate(e,t,o,r);else for(var s=e.length-1;s>=0;s--)(i=e[s])&&(n=(a<3?i(n):a>3?i(t,o,n):i(t,o))||n);return a>3&&n&&Object.defineProperty(t,o,n),n};let j=class extends r.oi{constructor(){super(),this.unsubscribe=[],this.socialProvider=C.AccountController.state.socialProvider,this.socialWindow=C.AccountController.state.socialWindow,this.error=!1,this.connecting=!1,this.message="Connect in the provider window",this.authConnector=c.ConnectorController.getAuthConnector(),this.handleSocialConnection=async e=>{if(e.data?.resultUri){if(e.origin===z.b.SECURE_SITE_ORIGIN){window.removeEventListener("message",this.handleSocialConnection,!1);try{if(this.authConnector&&!this.connecting){this.socialWindow&&(this.socialWindow.close(),C.AccountController.setSocialWindow(void 0,k.R.state.activeChain)),this.connecting=!0,this.updateMessage();let t=e.data.resultUri;this.socialProvider&&S.X.sendEvent({type:"track",event:"SOCIAL_LOGIN_REQUEST_USER_DATA",properties:{provider:this.socialProvider}}),await this.authConnector.provider.connectSocial(t),this.socialProvider&&($.M.setConnectedSocialProvider(this.socialProvider),await R.ConnectionController.connectExternal(this.authConnector,this.authConnector.chain),S.X.sendEvent({type:"track",event:"SOCIAL_LOGIN_SUCCESS",properties:{provider:this.socialProvider}}))}}catch(e){this.error=!0,this.updateMessage(),this.socialProvider&&S.X.sendEvent({type:"track",event:"SOCIAL_LOGIN_ERROR",properties:{provider:this.socialProvider}})}}else d.RouterController.goBack(),P.SnackController.showError("Untrusted Origin"),this.socialProvider&&S.X.sendEvent({type:"track",event:"SOCIAL_LOGIN_ERROR",properties:{provider:this.socialProvider}})}},O.j.EmbeddedWalletAbortController.signal.addEventListener("abort",()=>{this.socialWindow&&(this.socialWindow.close(),C.AccountController.setSocialWindow(void 0,k.R.state.activeChain))}),this.unsubscribe.push(C.AccountController.subscribe(e=>{e.socialProvider&&(this.socialProvider=e.socialProvider),e.socialWindow&&(this.socialWindow=e.socialWindow),e.address&&(E.I.state.open||s.OptionsController.state.enableEmbedded)&&E.I.close()})),this.authConnector&&this.connectSocial()}disconnectedCallback(){this.unsubscribe.forEach(e=>e()),window.removeEventListener("message",this.handleSocialConnection,!1),this.socialWindow?.close(),C.AccountController.setSocialWindow(void 0,k.R.state.activeChain)}render(){return(0,r.dy)`
      <wui-flex
        data-error=${(0,a.o)(this.error)}
        flexDirection="column"
        alignItems="center"
        .padding=${["3xl","xl","xl","xl"]}
        gap="xl"
      >
        <wui-flex justifyContent="center" alignItems="center">
          <wui-logo logo=${(0,a.o)(this.socialProvider)}></wui-logo>
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
          <wui-text align="center" variant="paragraph-500" color="fg-100"
            >Log in with
            <span class="capitalize">${this.socialProvider??"Social"}</span></wui-text
          >
          <wui-text align="center" variant="small-400" color=${this.error?"error-100":"fg-200"}
            >${this.message}</wui-text
          ></wui-flex
        >
      </wui-flex>
    `}loaderTemplate(){let e=T.ThemeController.state.themeVariables["--w3m-border-radius-master"],t=e?parseInt(e.replace("px",""),10):4;return(0,r.dy)`<wui-loading-thumbnail radius=${9*t}></wui-loading-thumbnail>`}connectSocial(){let e=setInterval(()=>{this.socialWindow?.closed&&(this.connecting||"ConnectingSocial"!==d.RouterController.state.view||(this.socialProvider&&S.X.sendEvent({type:"track",event:"SOCIAL_LOGIN_CANCELED",properties:{provider:this.socialProvider}}),d.RouterController.goBack()),clearInterval(e))},1e3);window.addEventListener("message",this.handleSocialConnection,!1)}updateMessage(){this.error?this.message="Something went wrong":this.connecting?this.message="Retrieving user data":this.message="Connect in the provider window"}};j.styles=I,L([(0,i.SB)()],j.prototype,"socialProvider",void 0),L([(0,i.SB)()],j.prototype,"socialWindow",void 0),L([(0,i.SB)()],j.prototype,"error",void 0),L([(0,i.SB)()],j.prototype,"connecting",void 0),L([(0,i.SB)()],j.prototype,"message",void 0),j=L([(0,l.Mo)("w3m-connecting-social-view")],j),o(11908),o(73356),o(8524),o(33199),o(64542);var A=(0,r.iv)`
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

  wui-logo {
    width: 80px;
    height: 80px;
    border-radius: var(--wui-border-radius-m);
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
    transition: all var(--wui-ease-out-power-2) var(--wui-duration-lg);
  }
`,_=function(e,t,o,r){var i,a=arguments.length,n=a<3?t:null===r?r=Object.getOwnPropertyDescriptor(t,o):r;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)n=Reflect.decorate(e,t,o,r);else for(var s=e.length-1;s>=0;s--)(i=e[s])&&(n=(a<3?i(n):a>3?i(t,o,n):i(t,o))||n);return a>3&&n&&Object.defineProperty(t,o,n),n};let U=class extends r.oi{constructor(){super(),this.unsubscribe=[],this.timeout=void 0,this.socialProvider=C.AccountController.state.socialProvider,this.uri=C.AccountController.state.farcasterUrl,this.ready=!1,this.loading=!1,this.authConnector=c.ConnectorController.getAuthConnector(),this.forceUpdate=()=>{this.requestUpdate()},this.unsubscribe.push(C.AccountController.subscribeKey("farcasterUrl",e=>{e&&(this.uri=e,this.connectFarcaster())}),C.AccountController.subscribeKey("socialProvider",e=>{e&&(this.socialProvider=e)})),window.addEventListener("resize",this.forceUpdate)}disconnectedCallback(){super.disconnectedCallback(),clearTimeout(this.timeout),window.removeEventListener("resize",this.forceUpdate)}render(){return this.onRenderProxy(),(0,r.dy)`${this.platformTemplate()}`}platformTemplate(){return g.j.isMobile()?(0,r.dy)`${this.mobileTemplate()}`:(0,r.dy)`${this.desktopTemplate()}`}desktopTemplate(){return this.loading?(0,r.dy)`${this.loadingTemplate()}`:(0,r.dy)`${this.qrTemplate()}`}qrTemplate(){return(0,r.dy)` <wui-flex
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
    </wui-flex>`}loadingTemplate(){return(0,r.dy)`
      <wui-flex
        flexDirection="column"
        alignItems="center"
        .padding=${["xl","xl","xl","xl"]}
        gap="xl"
      >
        <wui-flex justifyContent="center" alignItems="center">
          <wui-logo logo="farcaster"></wui-logo>
          ${this.loaderTemplate()}
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
          <wui-text align="center" variant="paragraph-500" color="fg-100">
            Loading user data
          </wui-text>
          <wui-text align="center" variant="small-400" color="fg-200">
            Please wait a moment while we load your data.
          </wui-text>
        </wui-flex>
      </wui-flex>
    `}mobileTemplate(){return(0,r.dy)` <wui-flex
      flexDirection="column"
      alignItems="center"
      .padding=${["3xl","xl","xl","xl"]}
      gap="xl"
    >
      <wui-flex justifyContent="center" alignItems="center">
        <wui-logo logo="farcaster"></wui-logo>
        ${this.loaderTemplate()}
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
        <wui-text align="center" variant="paragraph-500" color="fg-100"
          >Continue in Farcaster</span></wui-text
        >
        <wui-text align="center" variant="small-400" color="fg-200"
          >Accept connection request in the app</wui-text
        ></wui-flex
      >
      ${this.mobileLinkTemplate()}
    </wui-flex>`}loaderTemplate(){let e=T.ThemeController.state.themeVariables["--w3m-border-radius-master"],t=e?parseInt(e.replace("px",""),10):4;return(0,r.dy)`<wui-loading-thumbnail radius=${9*t}></wui-loading-thumbnail>`}async connectFarcaster(){if(this.authConnector)try{await this.authConnector?.provider.connectFarcaster(),this.socialProvider&&($.M.setConnectedSocialProvider(this.socialProvider),S.X.sendEvent({type:"track",event:"SOCIAL_LOGIN_REQUEST_USER_DATA",properties:{provider:this.socialProvider}})),this.loading=!0,await R.ConnectionController.connectExternal(this.authConnector,this.authConnector.chain),this.socialProvider&&S.X.sendEvent({type:"track",event:"SOCIAL_LOGIN_SUCCESS",properties:{provider:this.socialProvider}}),this.loading=!1,E.I.close()}catch(e){this.socialProvider&&S.X.sendEvent({type:"track",event:"SOCIAL_LOGIN_ERROR",properties:{provider:this.socialProvider}}),d.RouterController.goBack(),P.SnackController.showError(e)}}mobileLinkTemplate(){return(0,r.dy)`<wui-button
      size="md"
      ?loading=${this.loading}
      ?disabled=${!this.uri||this.loading}
      @click=${()=>{this.uri&&g.j.openHref(this.uri,"_blank")}}
    >
      Open farcaster</wui-button
    >`}onRenderProxy(){!this.ready&&this.uri&&(this.timeout=setTimeout(()=>{this.ready=!0},200))}qrCodeTemplate(){if(!this.uri||!this.ready)return null;let e=this.getBoundingClientRect().width-40;return(0,r.dy)` <wui-qr-code
      size=${e}
      theme=${T.ThemeController.state.themeMode}
      uri=${this.uri}
      ?farcaster=${!0}
      data-testid="wui-qr-code"
      color=${(0,a.o)(T.ThemeController.state.themeVariables["--w3m-qr-color"])}
    ></wui-qr-code>`}copyTemplate(){let e=!this.uri||!this.ready;return(0,r.dy)`<wui-link
      .disabled=${e}
      @click=${this.onCopyUri}
      color="fg-200"
      data-testid="copy-wc2-uri"
    >
      <wui-icon size="xs" color="fg-200" slot="iconLeft" name="copy"></wui-icon>
      Copy link
    </wui-link>`}onCopyUri(){try{this.uri&&(g.j.copyToClopboard(this.uri),P.SnackController.showSuccess("Link copied"))}catch{P.SnackController.showError("Failed to copy")}}};U.styles=A,_([(0,i.SB)()],U.prototype,"socialProvider",void 0),_([(0,i.SB)()],U.prototype,"uri",void 0),_([(0,i.SB)()],U.prototype,"ready",void 0),_([(0,i.SB)()],U.prototype,"loading",void 0),U=_([(0,l.Mo)("w3m-connecting-farcaster-view")],U)},11908:function(e,t,o){o(82188)},99994:function(e,t,o){var r=o(45352),i=o(46491),a=o(3001);o(39045);var n=o(73616),s=o(46454);o(66828);var l=(0,r.iv)`
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
`,c=function(e,t,o,r){var i,a=arguments.length,n=a<3?t:null===r?r=Object.getOwnPropertyDescriptor(t,o):r;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)n=Reflect.decorate(e,t,o,r);else for(var s=e.length-1;s>=0;s--)(i=e[s])&&(n=(a<3?i(n):a>3?i(t,o,n):i(t,o))||n);return a>3&&n&&Object.defineProperty(t,o,n),n};let d=class extends r.oi{constructor(){super(...arguments),this.logo="google",this.name="Continue with google",this.align="left",this.disabled=!1}render(){return(0,r.dy)`
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
    `}templatePlacement(){return"center"===this.align?(0,r.dy)` <wui-logo class="invisible" logo=${this.logo}></wui-logo>`:null}};d.styles=[n.ET,n.ZM,l],c([(0,i.Cb)()],d.prototype,"logo",void 0),c([(0,i.Cb)()],d.prototype,"name",void 0),c([(0,i.Cb)()],d.prototype,"align",void 0),c([(0,i.Cb)()],d.prototype,"tabIdx",void 0),c([(0,i.Cb)({type:Boolean})],d.prototype,"disabled",void 0),c([(0,s.M)("wui-list-social")],d)},64542:function(e,t,o){o(91517)},23726:function(e,t,o){var r=o(45352),i=o(46491),a=o(73616),n=o(46454),s=(0,r.iv)`
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
`,l=function(e,t,o,r){var i,a=arguments.length,n=a<3?t:null===r?r=Object.getOwnPropertyDescriptor(t,o):r;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)n=Reflect.decorate(e,t,o,r);else for(var s=e.length-1;s>=0;s--)(i=e[s])&&(n=(a<3?i(n):a>3?i(t,o,n):i(t,o))||n);return a>3&&n&&Object.defineProperty(t,o,n),n};let c=class extends r.oi{constructor(){super(...arguments),this.color="accent-100",this.size="lg"}render(){return this.style.cssText=`--local-color: ${"inherit"===this.color?"inherit":`var(--wui-color-${this.color})`}`,this.dataset.size=this.size,(0,r.dy)`<svg viewBox="25 25 50 50">
      <circle r="20" cy="50" cx="50"></circle>
    </svg>`}};c.styles=[a.ET,s],l([(0,i.Cb)()],c.prototype,"color",void 0),l([(0,i.Cb)()],c.prototype,"size",void 0),l([(0,n.M)("wui-loading-spinner")],c)},82188:function(e,t,o){var r=o(45352),i=o(46491);o(23726),o(39045);var a=o(73616),n=o(46454),s=(0,r.iv)`
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
`,l=function(e,t,o,r){var i,a=arguments.length,n=a<3?t:null===r?r=Object.getOwnPropertyDescriptor(t,o):r;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)n=Reflect.decorate(e,t,o,r);else for(var s=e.length-1;s>=0;s--)(i=e[s])&&(n=(a<3?i(n):a>3?i(t,o,n):i(t,o))||n);return a>3&&n&&Object.defineProperty(t,o,n),n};let c={main:"inverse-100",inverse:"inverse-000",accent:"accent-100","accent-error":"error-100","accent-success":"success-100",neutral:"fg-100",disabled:"gray-glass-020"},d={lg:"paragraph-600",md:"small-600"},u={lg:"md",md:"md"},h=class extends r.oi{constructor(){super(...arguments),this.size="lg",this.disabled=!1,this.fullWidth=!1,this.loading=!1,this.variant="main",this.hasIconLeft=!1,this.hasIconRight=!1,this.borderRadius="m"}render(){this.style.cssText=`
    --local-width: ${this.fullWidth?"100%":"auto"};
    --local-opacity-100: ${this.loading?0:1};
    --local-opacity-000: ${this.loading?1:0};
    --local-border-radius: var(--wui-border-radius-${this.borderRadius});
    `;let e=this.textVariant??d[this.size];return(0,r.dy)`
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
    `}handleSlotLeftChange(){this.hasIconLeft=!0}handleSlotRightChange(){this.hasIconRight=!0}loadingTemplate(){if(this.loading){let e=u[this.size],t=this.disabled?c.disabled:c[this.variant];return(0,r.dy)`<wui-loading-spinner color=${t} size=${e}></wui-loading-spinner>`}return(0,r.dy)``}};h.styles=[a.ET,a.ZM,s],l([(0,i.Cb)()],h.prototype,"size",void 0),l([(0,i.Cb)({type:Boolean})],h.prototype,"disabled",void 0),l([(0,i.Cb)({type:Boolean})],h.prototype,"fullWidth",void 0),l([(0,i.Cb)({type:Boolean})],h.prototype,"loading",void 0),l([(0,i.Cb)()],h.prototype,"variant",void 0),l([(0,i.Cb)({type:Boolean})],h.prototype,"hasIconLeft",void 0),l([(0,i.Cb)({type:Boolean})],h.prototype,"hasIconRight",void 0),l([(0,i.Cb)()],h.prototype,"borderRadius",void 0),l([(0,i.Cb)()],h.prototype,"textVariant",void 0),l([(0,n.M)("wui-button")],h)},518:function(e,t,o){var r=o(45352),i=o(46491);o(88896);var a=o(73616),n=o(46454),s=(0,r.iv)`
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
`,l=function(e,t,o,r){var i,a=arguments.length,n=a<3?t:null===r?r=Object.getOwnPropertyDescriptor(t,o):r;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)n=Reflect.decorate(e,t,o,r);else for(var s=e.length-1;s>=0;s--)(i=e[s])&&(n=(a<3?i(n):a>3?i(t,o,n):i(t,o))||n);return a>3&&n&&Object.defineProperty(t,o,n),n};let c=class extends r.oi{constructor(){super(...arguments),this.size="md",this.backgroundColor="accent-100",this.iconColor="accent-100",this.background="transparent",this.border=!1,this.borderColor="wui-color-bg-125",this.icon="copy"}render(){let e=this.iconSize||this.size,t="lg"===this.size,o="xl"===this.size,i="gray"===this.background,a="opaque"===this.background,n="accent-100"===this.backgroundColor&&a||"success-100"===this.backgroundColor&&a||"error-100"===this.backgroundColor&&a||"inverse-100"===this.backgroundColor&&a,s=`var(--wui-color-${this.backgroundColor})`;return n?s=`var(--wui-icon-box-bg-${this.backgroundColor})`:i&&(s=`var(--wui-color-gray-${this.backgroundColor})`),this.style.cssText=`
       --local-bg-value: ${s};
       --local-bg-mix: ${n||i?"100%":t?"12%":"16%"};
       --local-border-radius: var(--wui-border-radius-${t?"xxs":o?"s":"3xl"});
       --local-size: var(--wui-icon-box-size-${this.size});
       --local-border: ${"wui-color-bg-125"===this.borderColor?"2px":"1px"} solid ${this.border?`var(--${this.borderColor})`:"transparent"}
   `,(0,r.dy)` <wui-icon color=${this.iconColor} size=${e} name=${this.icon}></wui-icon> `}};c.styles=[a.ET,a.ZM,s],l([(0,i.Cb)()],c.prototype,"size",void 0),l([(0,i.Cb)()],c.prototype,"backgroundColor",void 0),l([(0,i.Cb)()],c.prototype,"iconColor",void 0),l([(0,i.Cb)()],c.prototype,"iconSize",void 0),l([(0,i.Cb)()],c.prototype,"background",void 0),l([(0,i.Cb)({type:Boolean})],c.prototype,"border",void 0),l([(0,i.Cb)()],c.prototype,"borderColor",void 0),l([(0,i.Cb)()],c.prototype,"icon",void 0),l([(0,n.M)("wui-icon-box")],c)},66828:function(e,t,o){var r=o(45352),i=o(46491);o(88896);var a=o(73616),n=o(46454),s=(0,r.iv)`
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
`,l=function(e,t,o,r){var i,a=arguments.length,n=a<3?t:null===r?r=Object.getOwnPropertyDescriptor(t,o):r;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)n=Reflect.decorate(e,t,o,r);else for(var s=e.length-1;s>=0;s--)(i=e[s])&&(n=(a<3?i(n):a>3?i(t,o,n):i(t,o))||n);return a>3&&n&&Object.defineProperty(t,o,n),n};let c=class extends r.oi{constructor(){super(...arguments),this.logo="google"}render(){return(0,r.dy)`<wui-icon color="inherit" size="inherit" name=${this.logo}></wui-icon> `}};c.styles=[a.ET,s],l([(0,i.Cb)()],c.prototype,"logo",void 0),l([(0,n.M)("wui-logo")],c)},31183:function(e,t,o){o.d(t,{V:function(){return n},i:function(){return c}});var r=o(66411),i=o(44775),a=o(46240);let n=()=>new s;class s{}let l=new WeakMap,c=(0,a.XM)(class extends i.sR{render(e){return r.Ld}update(e,[t]){let o=t!==this.G;return o&&void 0!==this.G&&this.rt(void 0),(o||this.lt!==this.ct)&&(this.G=t,this.ht=e.options?.host,this.rt(this.ct=e.element)),r.Ld}rt(e){if(this.isConnected||(e=void 0),"function"==typeof this.G){let t=this.ht??globalThis,o=l.get(t);void 0===o&&(o=new WeakMap,l.set(t,o)),void 0!==o.get(this.G)&&this.G.call(this.ht,void 0),o.set(this.G,e),void 0!==e&&this.G.call(this.ht,e)}else this.G.value=e}get lt(){return"function"==typeof this.G?l.get(this.ht??globalThis)?.get(this.G):this.G?.value}disconnected(){this.lt===this.ct&&this.rt(void 0)}reconnected(){this.rt(this.ct)}})}}]);