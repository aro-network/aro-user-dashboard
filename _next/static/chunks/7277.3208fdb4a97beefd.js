"use strict";(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[7277],{85849:function(o,e,r){r.r(e),r.d(e,{W3mTransactionsView:function(){return a}});var t=r(45352),i=r(14810);r(28052),r(65984);var s=(0,t.iv)`
  :host > wui-flex:first-child {
    height: 500px;
    overflow-y: auto;
    overflow-x: hidden;
    scrollbar-width: none;
  }

  :host > wui-flex:first-child::-webkit-scrollbar {
    display: none;
  }
`;let a=class extends t.oi{render(){return(0,t.dy)`
      <wui-flex flexDirection="column" .padding=${["0","m","m","m"]} gap="s">
        <w3m-activity-list page="activity"></w3m-activity-list>
      </wui-flex>
    `}};a.styles=s,a=function(o,e,r,t){var i,s=arguments.length,a=s<3?e:null===t?t=Object.getOwnPropertyDescriptor(e,r):t;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)a=Reflect.decorate(o,e,r,t);else for(var c=o.length-1;c>=0;c--)(i=o[c])&&(a=(s<3?i(a):s>3?i(e,r,a):i(e,r))||a);return s>3&&a&&Object.defineProperty(e,r,a),a}([(0,i.Mo)("w3m-transactions-view")],a)},76129:function(o,e,r){r(518)},8524:function(o,e,r){var t=r(45352),i=r(46491),s=r(3001);r(39045);var a=r(73616),c=r(46454),l=(0,t.iv)`
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
`,n=function(o,e,r,t){var i,s=arguments.length,a=s<3?e:null===t?t=Object.getOwnPropertyDescriptor(e,r):t;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)a=Reflect.decorate(o,e,r,t);else for(var c=o.length-1;c>=0;c--)(i=o[c])&&(a=(s<3?i(a):s>3?i(e,r,a):i(e,r))||a);return s>3&&a&&Object.defineProperty(e,r,a),a};let d=class extends t.oi{constructor(){super(...arguments),this.tabIdx=void 0,this.disabled=!1,this.color="inherit"}render(){return(0,t.dy)`
      <button ?disabled=${this.disabled} tabindex=${(0,s.o)(this.tabIdx)}>
        <slot name="iconLeft"></slot>
        <wui-text variant="small-600" color=${this.color}>
          <slot></slot>
        </wui-text>
        <slot name="iconRight"></slot>
      </button>
    `}};d.styles=[a.ET,a.ZM,l],n([(0,i.Cb)()],d.prototype,"tabIdx",void 0),n([(0,i.Cb)({type:Boolean})],d.prototype,"disabled",void 0),n([(0,i.Cb)()],d.prototype,"color",void 0),n([(0,c.M)("wui-link")],d)},79667:function(o,e,r){var t=r(45352);r(91517),r(87746);var i=r(73616),s=r(46454),a=(0,t.iv)`
  :host > wui-flex:first-child {
    column-gap: var(--wui-spacing-s);
    padding: 7px var(--wui-spacing-l) 7px var(--wui-spacing-xs);
    width: 100%;
  }

  wui-flex {
    display: flex;
    flex: 1;
  }
`;let c=class extends t.oi{render(){return(0,t.dy)`
      <wui-flex alignItems="center">
        <wui-shimmer width="40px" height="40px"></wui-shimmer>
        <wui-flex flexDirection="column" gap="2xs">
          <wui-shimmer width="72px" height="16px" borderRadius="4xs"></wui-shimmer>
          <wui-shimmer width="148px" height="14px" borderRadius="4xs"></wui-shimmer>
        </wui-flex>
        <wui-shimmer width="24px" height="12px" borderRadius="5xs"></wui-shimmer>
      </wui-flex>
    `}};c.styles=[i.ET,a],function(o,e,r,t){var i,s=arguments.length,a=s<3?e:null===t?t=Object.getOwnPropertyDescriptor(e,r):t;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)a=Reflect.decorate(o,e,r,t);else for(var c=o.length-1;c>=0;c--)(i=o[c])&&(a=(s<3?i(a):s>3?i(e,r,a):i(e,r))||a);s>3&&a&&Object.defineProperty(e,r,a)}([(0,s.M)("wui-transaction-list-item-loader")],c)},95789:function(o,e,r){var t=r(45352),i=r(46491),s=r(73616),a=r(46454),c=(0,t.iv)`
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
`,l=function(o,e,r,t){var i,s=arguments.length,a=s<3?e:null===t?t=Object.getOwnPropertyDescriptor(e,r):t;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)a=Reflect.decorate(o,e,r,t);else for(var c=o.length-1;c>=0;c--)(i=o[c])&&(a=(s<3?i(a):s>3?i(e,r,a):i(e,r))||a);return s>3&&a&&Object.defineProperty(e,r,a),a};let n=class extends t.oi{constructor(){super(...arguments),this.src="./path/to/image.jpg",this.alt="Image",this.size=void 0}render(){return this.style.cssText=`
      --local-width: ${this.size?`var(--wui-icon-size-${this.size});`:"100%"};
      --local-height: ${this.size?`var(--wui-icon-size-${this.size});`:"100%"};
      `,(0,t.dy)`<img src=${this.src} alt=${this.alt} @error=${this.handleImageError} />`}handleImageError(){this.dispatchEvent(new CustomEvent("onLoadError",{bubbles:!0,composed:!0}))}};n.styles=[s.ET,s.Bp,c],l([(0,i.Cb)()],n.prototype,"src",void 0),l([(0,i.Cb)()],n.prototype,"alt",void 0),l([(0,i.Cb)()],n.prototype,"size",void 0),l([(0,a.M)("wui-image")],n)},91517:function(o,e,r){var t=r(45352),i=r(46491),s=r(46454),a=(0,t.iv)`
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
`,c=function(o,e,r,t){var i,s=arguments.length,a=s<3?e:null===t?t=Object.getOwnPropertyDescriptor(e,r):t;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)a=Reflect.decorate(o,e,r,t);else for(var c=o.length-1;c>=0;c--)(i=o[c])&&(a=(s<3?i(a):s>3?i(e,r,a):i(e,r))||a);return s>3&&a&&Object.defineProperty(e,r,a),a};let l=class extends t.oi{constructor(){super(...arguments),this.width="",this.height="",this.borderRadius="m",this.variant="default"}render(){return this.style.cssText=`
      width: ${this.width};
      height: ${this.height};
      border-radius: clamp(0px,var(--wui-border-radius-${this.borderRadius}), 40px);
    `,(0,t.dy)`<slot></slot>`}};l.styles=[a],c([(0,i.Cb)()],l.prototype,"width",void 0),c([(0,i.Cb)()],l.prototype,"height",void 0),c([(0,i.Cb)()],l.prototype,"borderRadius",void 0),c([(0,i.Cb)()],l.prototype,"variant",void 0),c([(0,s.M)("wui-shimmer")],l)},518:function(o,e,r){var t=r(45352),i=r(46491);r(88896);var s=r(73616),a=r(46454),c=(0,t.iv)`
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
`,l=function(o,e,r,t){var i,s=arguments.length,a=s<3?e:null===t?t=Object.getOwnPropertyDescriptor(e,r):t;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)a=Reflect.decorate(o,e,r,t);else for(var c=o.length-1;c>=0;c--)(i=o[c])&&(a=(s<3?i(a):s>3?i(e,r,a):i(e,r))||a);return s>3&&a&&Object.defineProperty(e,r,a),a};let n=class extends t.oi{constructor(){super(...arguments),this.size="md",this.backgroundColor="accent-100",this.iconColor="accent-100",this.background="transparent",this.border=!1,this.borderColor="wui-color-bg-125",this.icon="copy"}render(){let o=this.iconSize||this.size,e="lg"===this.size,r="xl"===this.size,i="gray"===this.background,s="opaque"===this.background,a="accent-100"===this.backgroundColor&&s||"success-100"===this.backgroundColor&&s||"error-100"===this.backgroundColor&&s||"inverse-100"===this.backgroundColor&&s,c=`var(--wui-color-${this.backgroundColor})`;return a?c=`var(--wui-icon-box-bg-${this.backgroundColor})`:i&&(c=`var(--wui-color-gray-${this.backgroundColor})`),this.style.cssText=`
       --local-bg-value: ${c};
       --local-bg-mix: ${a||i?"100%":e?"12%":"16%"};
       --local-border-radius: var(--wui-border-radius-${e?"xxs":r?"s":"3xl"});
       --local-size: var(--wui-icon-box-size-${this.size});
       --local-border: ${"wui-color-bg-125"===this.borderColor?"2px":"1px"} solid ${this.border?`var(--${this.borderColor})`:"transparent"}
   `,(0,t.dy)` <wui-icon color=${this.iconColor} size=${o} name=${this.icon}></wui-icon> `}};n.styles=[s.ET,s.ZM,c],l([(0,i.Cb)()],n.prototype,"size",void 0),l([(0,i.Cb)()],n.prototype,"backgroundColor",void 0),l([(0,i.Cb)()],n.prototype,"iconColor",void 0),l([(0,i.Cb)()],n.prototype,"iconSize",void 0),l([(0,i.Cb)()],n.prototype,"background",void 0),l([(0,i.Cb)({type:Boolean})],n.prototype,"border",void 0),l([(0,i.Cb)()],n.prototype,"borderColor",void 0),l([(0,i.Cb)()],n.prototype,"icon",void 0),l([(0,a.M)("wui-icon-box")],n)}}]);