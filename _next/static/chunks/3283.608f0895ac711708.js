"use strict";(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[3283],{73283:function(e,t,r){r.r(t),r.d(t,{W3mWalletReceiveView:function(){return k}});var a=r(45352),o=r(46491),i=r(3001),n=r(97392),s=r(57750),c=r(48737),l=r(1401),d=r(88383),u=r(66879),w=r(994),p=r(14810);r(14909),r(88896),r(95789),r(39045),r(87746);var h=r(73616),g=r(46454),b=(0,a.iv)`
  button {
    display: flex;
    gap: var(--wui-spacing-xl);
    width: 100%;
    background-color: var(--wui-color-gray-glass-002);
    border-radius: var(--wui-border-radius-xxs);
    padding: var(--wui-spacing-m) var(--wui-spacing-s);
  }

  wui-text {
    width: 100%;
  }

  wui-flex {
    width: auto;
  }

  .network-icon {
    width: var(--wui-spacing-2l);
    height: var(--wui-spacing-2l);
    border-radius: calc(var(--wui-spacing-2l) / 2);
    overflow: hidden;
    box-shadow:
      0 0 0 3px var(--wui-color-gray-glass-002),
      0 0 0 3px var(--wui-color-modal-bg);
  }
`,v=function(e,t,r,a){var o,i=arguments.length,n=i<3?t:null===a?a=Object.getOwnPropertyDescriptor(t,r):a;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)n=Reflect.decorate(e,t,r,a);else for(var s=e.length-1;s>=0;s--)(o=e[s])&&(n=(i<3?o(n):i>3?o(t,r,n):o(t,r))||n);return i>3&&n&&Object.defineProperty(t,r,n),n};let m=class extends a.oi{constructor(){super(...arguments),this.networkImages=[""],this.text=""}render(){return(0,a.dy)`
      <button>
        <wui-text variant="small-400" color="fg-200">${this.text}</wui-text>
        <wui-flex gap="3xs" alignItems="center">
          ${this.networksTemplate()}
          <wui-icon name="chevronRight" size="sm" color="fg-200"></wui-icon>
        </wui-flex>
      </button>
    `}networksTemplate(){let e=this.networkImages.slice(0,5);return(0,a.dy)` <wui-flex class="networks">
      ${e?.map(e=>a.dy` <wui-flex class="network-icon"> <wui-image src=${e}></wui-image> </wui-flex>`)}
    </wui-flex>`}};m.styles=[h.ET,h.ZM,b],v([(0,o.Cb)({type:Array})],m.prototype,"networkImages",void 0),v([(0,o.Cb)()],m.prototype,"text",void 0),m=v([(0,g.M)("wui-compatible-network")],m),r(28052),r(33199),r(34595);var f=r(57772),y=(0,a.iv)`
  wui-compatible-network {
    margin-top: var(--wui-spacing-l);
  }
`,x=function(e,t,r,a){var o,i=arguments.length,n=i<3?t:null===a?a=Object.getOwnPropertyDescriptor(t,r):a;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)n=Reflect.decorate(e,t,r,a);else for(var s=e.length-1;s>=0;s--)(o=e[s])&&(n=(i<3?o(n):i>3?o(t,r,n):o(t,r))||n);return i>3&&n&&Object.defineProperty(t,r,n),n};let k=class extends a.oi{constructor(){super(),this.unsubscribe=[],this.address=n.AccountController.state.address,this.profileName=n.AccountController.state.profileName,this.network=s.R.state.activeCaipNetwork,this.preferredAccountTypes=n.AccountController.state.preferredAccountTypes,this.unsubscribe.push(n.AccountController.subscribe(e=>{e.address?(this.address=e.address,this.profileName=e.profileName,this.preferredAccountTypes=e.preferredAccountTypes):c.SnackController.showError("Account not found")}),s.R.subscribeKey("activeCaipNetwork",e=>{e?.id&&(this.network=e)}))}disconnectedCallback(){this.unsubscribe.forEach(e=>e())}render(){if(!this.address)throw Error("w3m-wallet-receive-view: No account provided");let e=l.f.getNetworkImage(this.network);return(0,a.dy)` <wui-flex
      flexDirection="column"
      .padding=${["0","l","l","l"]}
      alignItems="center"
    >
      <wui-chip-button
        data-testid="receive-address-copy-button"
        @click=${this.onCopyClick.bind(this)}
        text=${p.Hg.getTruncateString({string:this.profileName||this.address||"",charsStart:this.profileName?18:4,charsEnd:this.profileName?0:4,truncate:this.profileName?"end":"middle"})}
        icon="copy"
        size="sm"
        imageSrc=${e||""}
        variant="gray"
      ></wui-chip-button>
      <wui-flex
        flexDirection="column"
        .padding=${["l","0","0","0"]}
        alignItems="center"
        gap="s"
      >
        <wui-qr-code
          size=${232}
          theme=${d.ThemeController.state.themeMode}
          uri=${this.address}
          ?arenaClear=${!0}
          color=${(0,i.o)(d.ThemeController.state.themeVariables["--w3m-qr-color"])}
          data-testid="wui-qr-code"
        ></wui-qr-code>
        <wui-text variant="paragraph-500" color="fg-100" align="center">
          Copy your address or scan this QR code
        </wui-text>
      </wui-flex>
      ${this.networkTemplate()}
    </wui-flex>`}networkTemplate(){let e=s.R.getAllRequestedCaipNetworks(),t=s.R.checkIfSmartAccountEnabled(),r=s.R.state.activeCaipNetwork,o=e.filter(e=>e?.chainNamespace===r?.chainNamespace);if(this.preferredAccountTypes?.[r?.chainNamespace]===f.y_.ACCOUNT_TYPES.SMART_ACCOUNT&&t)return r?(0,a.dy)`<wui-compatible-network
        @click=${this.onReceiveClick.bind(this)}
        text="Only receive assets on this network"
        .networkImages=${[l.f.getNetworkImage(r)??""]}
      ></wui-compatible-network>`:null;let i=(o?.filter(e=>e?.assets?.imageId)?.slice(0,5)).map(l.f.getNetworkImage).filter(Boolean);return(0,a.dy)`<wui-compatible-network
      @click=${this.onReceiveClick.bind(this)}
      text="Only receive assets on these networks"
      .networkImages=${i}
    ></wui-compatible-network>`}onReceiveClick(){u.RouterController.push("WalletCompatibleNetworks")}onCopyClick(){try{this.address&&(w.j.copyToClopboard(this.address),c.SnackController.showSuccess("Address copied"))}catch{c.SnackController.showError("Failed to copy")}}};k.styles=y,x([(0,o.SB)()],k.prototype,"address",void 0),x([(0,o.SB)()],k.prototype,"profileName",void 0),x([(0,o.SB)()],k.prototype,"network",void 0),x([(0,o.SB)()],k.prototype,"preferredAccountTypes",void 0),k=x([(0,p.Mo)("w3m-wallet-receive-view")],k)},14909:function(e,t,r){var a=r(45352),o=r(46491);r(88896),r(95789),r(39045);var i=r(73616),n=r(46454),s=(0,a.iv)`
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
`,c=function(e,t,r,a){var o,i=arguments.length,n=i<3?t:null===a?a=Object.getOwnPropertyDescriptor(t,r):a;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)n=Reflect.decorate(e,t,r,a);else for(var s=e.length-1;s>=0;s--)(o=e[s])&&(n=(i<3?o(n):i>3?o(t,r,n):o(t,r))||n);return i>3&&n&&Object.defineProperty(t,r,n),n};let l=class extends a.oi{constructor(){super(...arguments),this.variant="accent",this.imageSrc="",this.disabled=!1,this.icon="externalLink",this.size="md",this.text=""}render(){let e="sm"===this.size?"small-600":"paragraph-600";return(0,a.dy)`
      <button
        class=${this.disabled?"disabled":""}
        data-variant=${this.variant}
        data-size=${this.size}
      >
        ${this.imageSrc?(0,a.dy)`<wui-image src=${this.imageSrc}></wui-image>`:null}
        <wui-text variant=${e} color="inherit"> ${this.text} </wui-text>
        <wui-icon name=${this.icon} color="inherit" size="inherit"></wui-icon>
      </button>
    `}};l.styles=[i.ET,i.ZM,s],c([(0,o.Cb)()],l.prototype,"variant",void 0),c([(0,o.Cb)()],l.prototype,"imageSrc",void 0),c([(0,o.Cb)({type:Boolean})],l.prototype,"disabled",void 0),c([(0,o.Cb)()],l.prototype,"icon",void 0),c([(0,o.Cb)()],l.prototype,"size",void 0),c([(0,o.Cb)()],l.prototype,"text",void 0),c([(0,n.M)("wui-chip-button")],l)}}]);