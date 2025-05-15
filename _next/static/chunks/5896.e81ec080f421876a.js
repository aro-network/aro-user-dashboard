"use strict";(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[5896],{5896:function(e,t,i){i.r(t),i.d(t,{W3mEmailLoginView:function(){return U},W3mEmailVerifyDeviceView:function(){return $},W3mEmailVerifyOtpView:function(){return S},W3mUpdateEmailPrimaryOtpView:function(){return L},W3mUpdateEmailSecondaryOtpView:function(){return V},W3mUpdateEmailWalletView:function(){return j}});var o=i(29113),r=i(57750),n=i(76711),a=i(41671),l=i(62913),s=i(994),c=i(14810),u=i(45352),d=i(46491),p=i(66879),h=i(20090),m=i(48737);i(28052),i(8524),i(44779),i(87746);var f=i(73616),w=i(24441),g=i(46454),v=(0,u.iv)`
  :host {
    position: relative;
    display: inline-block;
  }

  input {
    width: 50px;
    height: 50px;
    background: var(--wui-color-gray-glass-010);
    border-radius: var(--wui-border-radius-xs);
    border: 1px solid var(--wui-color-gray-glass-005);
    font-family: var(--wui-font-family);
    font-size: var(--wui-font-size-large);
    font-weight: var(--wui-font-weight-regular);
    letter-spacing: var(--wui-letter-spacing-large);
    text-align: center;
    color: var(--wui-color-fg-100);
    caret-color: var(--wui-color-accent-100);
    transition:
      background-color var(--wui-ease-inout-power-1) var(--wui-duration-md),
      border-color var(--wui-ease-inout-power-1) var(--wui-duration-md),
      box-shadow var(--wui-ease-inout-power-1) var(--wui-duration-md);
    will-change: background-color, border-color, box-shadow;
    box-sizing: border-box;
    -webkit-appearance: none;
    -moz-appearance: textfield;
    padding: 0px;
  }

  input::-webkit-outer-spin-button,
  input::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }

  input[type='number'] {
    -moz-appearance: textfield;
  }

  input:disabled {
    cursor: not-allowed;
    border: 1px solid var(--wui-color-gray-glass-010);
    background: var(--wui-color-gray-glass-005);
  }

  input:focus:enabled {
    background-color: var(--wui-color-gray-glass-015);
    border: 1px solid var(--wui-color-accent-100);
    -webkit-box-shadow: 0px 0px 0px 4px var(--wui-box-shadow-blue);
    -moz-box-shadow: 0px 0px 0px 4px var(--wui-box-shadow-blue);
    box-shadow: 0px 0px 0px 4px var(--wui-box-shadow-blue);
  }

  @media (hover: hover) and (pointer: fine) {
    input:hover:enabled {
      background-color: var(--wui-color-gray-glass-015);
    }
  }
`,b=function(e,t,i,o){var r,n=arguments.length,a=n<3?t:null===o?o=Object.getOwnPropertyDescriptor(t,i):o;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)a=Reflect.decorate(e,t,i,o);else for(var l=e.length-1;l>=0;l--)(r=e[l])&&(a=(n<3?r(a):n>3?r(t,i,a):r(t,i))||a);return n>3&&a&&Object.defineProperty(t,i,a),a};let y=class extends u.oi{constructor(){super(...arguments),this.disabled=!1,this.value=""}render(){return(0,u.dy)`<input
      type="number"
      maxlength="1"
      inputmode="numeric"
      autofocus
      ?disabled=${this.disabled}
      value=${this.value}
    /> `}};y.styles=[f.ET,f.ZM,v],b([(0,d.Cb)({type:Boolean})],y.prototype,"disabled",void 0),b([(0,d.Cb)({type:String})],y.prototype,"value",void 0),y=b([(0,g.M)("wui-input-numeric")],y);var x=(0,u.iv)`
  :host {
    position: relative;
    display: block;
  }
`,E=function(e,t,i,o){var r,n=arguments.length,a=n<3?t:null===o?o=Object.getOwnPropertyDescriptor(t,i):o;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)a=Reflect.decorate(e,t,i,o);else for(var l=e.length-1;l>=0;l--)(r=e[l])&&(a=(n<3?r(a):n>3?r(t,i,a):r(t,i))||a);return n>3&&a&&Object.defineProperty(t,i,a),a};let C=class extends u.oi{constructor(){super(...arguments),this.length=6,this.otp="",this.values=Array.from({length:this.length}).map(()=>""),this.numerics=[],this.shouldInputBeEnabled=e=>this.values.slice(0,e).every(e=>""!==e),this.handleKeyDown=(e,t)=>{let i=e.target,o=this.getInputElement(i);if(!o)return;["ArrowLeft","ArrowRight","Shift","Delete"].includes(e.key)&&e.preventDefault();let r=o.selectionStart;switch(e.key){case"ArrowLeft":r&&o.setSelectionRange(r+1,r+1),this.focusInputField("prev",t);break;case"ArrowRight":case"Shift":this.focusInputField("next",t);break;case"Delete":case"Backspace":""===o.value?this.focusInputField("prev",t):this.updateInput(o,t,"")}},this.focusInputField=(e,t)=>{if("next"===e){let e=t+1;if(!this.shouldInputBeEnabled(e))return;let i=this.numerics[e<this.length?e:t],o=i?this.getInputElement(i):void 0;o&&(o.disabled=!1,o.focus())}if("prev"===e){let e=t-1,i=this.numerics[e>-1?e:t],o=i?this.getInputElement(i):void 0;o&&o.focus()}}}firstUpdated(){this.otp&&(this.values=this.otp.split(""));let e=this.shadowRoot?.querySelectorAll("wui-input-numeric");e&&(this.numerics=Array.from(e)),this.numerics[0]?.focus()}render(){return(0,u.dy)`
      <wui-flex gap="xxs" data-testid="wui-otp-input">
        ${Array.from({length:this.length}).map((e,t)=>(0,u.dy)`
            <wui-input-numeric
              @input=${e=>this.handleInput(e,t)}
              @click=${e=>this.selectInput(e)}
              @keydown=${e=>this.handleKeyDown(e,t)}
              .disabled=${!this.shouldInputBeEnabled(t)}
              .value=${this.values[t]||""}
            >
            </wui-input-numeric>
          `)}
      </wui-flex>
    `}updateInput(e,t,i){let o=this.numerics[t],r=e||(o?this.getInputElement(o):void 0);r&&(r.value=i,this.values=this.values.map((e,o)=>o===t?i:e))}selectInput(e){let t=e.target;if(t){let e=this.getInputElement(t);e?.select()}}handleInput(e,t){let i=e.target,o=this.getInputElement(i);if(o){let i=o.value;"insertFromPaste"===e.inputType?this.handlePaste(o,i,t):w.H.isNumber(i)&&e.data?(this.updateInput(o,t,e.data),this.focusInputField("next",t)):this.updateInput(o,t,"")}this.dispatchInputChangeEvent()}handlePaste(e,t,i){let o=t[0];if(o&&w.H.isNumber(o)){this.updateInput(e,i,o);let r=t.substring(1);if(i+1<this.length&&r.length){let e=this.numerics[i+1],t=e?this.getInputElement(e):void 0;t&&this.handlePaste(t,r,i+1)}else this.focusInputField("next",i)}else this.updateInput(e,i,"")}getInputElement(e){return e.shadowRoot?.querySelector("input")?e.shadowRoot.querySelector("input"):null}dispatchInputChangeEvent(){let e=this.values.join("");this.dispatchEvent(new CustomEvent("inputChange",{detail:e,bubbles:!0,composed:!0}))}};C.styles=[f.ET,x],E([(0,d.Cb)({type:Number})],C.prototype,"length",void 0),E([(0,d.Cb)({type:String})],C.prototype,"otp",void 0),E([(0,d.SB)()],C.prototype,"values",void 0),C=E([(0,g.M)("wui-otp")],C),i(34595);var I=i(87729),O=(0,u.iv)`
  wui-loading-spinner {
    margin: 9px auto;
  }

  .email-display,
  .email-display wui-text {
    max-width: 100%;
  }
`,R=function(e,t,i,o){var r,n=arguments.length,a=n<3?t:null===o?o=Object.getOwnPropertyDescriptor(t,i):o;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)a=Reflect.decorate(e,t,i,o);else for(var l=e.length-1;l>=0;l--)(r=e[l])&&(a=(n<3?r(a):n>3?r(t,i,a):r(t,i))||a);return n>3&&a&&Object.defineProperty(t,i,a),a};let k=class extends u.oi{firstUpdated(){this.startOTPTimeout()}disconnectedCallback(){clearTimeout(this.OTPTimeout)}constructor(){super(),this.loading=!1,this.timeoutTimeLeft=I.$.getTimeToNextEmailLogin(),this.error="",this.otp="",this.email=p.RouterController.state.data?.email,this.authConnector=h.ConnectorController.getAuthConnector()}render(){if(!this.email)throw Error("w3m-email-otp-widget: No email provided");let e=!!this.timeoutTimeLeft,t=this.getFooterLabels(e);return(0,u.dy)`
      <wui-flex
        flexDirection="column"
        alignItems="center"
        .padding=${["l","0","l","0"]}
        gap="l"
      >
        <wui-flex
          class="email-display"
          flexDirection="column"
          alignItems="center"
          .padding=${["0","xl","0","xl"]}
        >
          <wui-text variant="paragraph-400" color="fg-100" align="center">
            Enter the code we sent to
          </wui-text>
          <wui-text variant="paragraph-500" color="fg-100" lineClamp="1" align="center">
            ${this.email}
          </wui-text>
        </wui-flex>

        <wui-text variant="small-400" color="fg-200">The code expires in 20 minutes</wui-text>

        ${this.loading?(0,u.dy)`<wui-loading-spinner size="xl" color="accent-100"></wui-loading-spinner>`:(0,u.dy)` <wui-flex flexDirection="column" alignItems="center" gap="xs">
              <wui-otp
                dissabled
                length="6"
                @inputChange=${this.onOtpInputChange.bind(this)}
                .otp=${this.otp}
              ></wui-otp>
              ${this.error?(0,u.dy)`
                    <wui-text variant="small-400" align="center" color="error-100">
                      ${this.error}. Try Again
                    </wui-text>
                  `:null}
            </wui-flex>`}

        <wui-flex alignItems="center" gap="xs">
          <wui-text variant="small-400" color="fg-200">${t.title}</wui-text>
          <wui-link @click=${this.onResendCode.bind(this)} .disabled=${e}>
            ${t.action}
          </wui-link>
        </wui-flex>
      </wui-flex>
    `}startOTPTimeout(){this.timeoutTimeLeft=I.$.getTimeToNextEmailLogin(),this.OTPTimeout=setInterval(()=>{this.timeoutTimeLeft>0?this.timeoutTimeLeft=I.$.getTimeToNextEmailLogin():clearInterval(this.OTPTimeout)},1e3)}async onOtpInputChange(e){try{!this.loading&&(this.otp=e.detail,this.authConnector&&6===this.otp.length&&(this.loading=!0,await this.onOtpSubmit?.(this.otp)))}catch(e){this.error=s.j.parseError(e),this.loading=!1}}async onResendCode(){try{if(this.onOtpResend){if(!this.loading&&!this.timeoutTimeLeft){if(this.error="",this.otp="",!h.ConnectorController.getAuthConnector()||!this.email)throw Error("w3m-email-otp-widget: Unable to resend email");this.loading=!0,await this.onOtpResend(this.email),this.startOTPTimeout(),m.SnackController.showSuccess("Code email resent")}}else this.onStartOver&&this.onStartOver()}catch(e){m.SnackController.showError(e)}finally{this.loading=!1}}getFooterLabels(e){return this.onStartOver?{title:"Something wrong?",action:`Try again ${e?`in ${this.timeoutTimeLeft}s`:""}`}:{title:"Didn't receive it?",action:`Resend ${e?`in ${this.timeoutTimeLeft}s`:"Code"}`}}};k.styles=O,R([(0,d.SB)()],k.prototype,"loading",void 0),R([(0,d.SB)()],k.prototype,"timeoutTimeLeft",void 0),R([(0,d.SB)()],k.prototype,"error",void 0),k=R([(0,c.Mo)("w3m-email-otp-widget")],k);let S=class extends k{constructor(){super(...arguments),this.onOtpSubmit=async e=>{try{if(this.authConnector){if(await this.authConnector.provider.connectOtp({otp:e}),o.X.sendEvent({type:"track",event:"EMAIL_VERIFICATION_CODE_PASS"}),r.R.state.activeChain)await n.ConnectionController.connectExternal(this.authConnector,r.R.state.activeChain);else throw Error("Active chain is not set on ChainControll");o.X.sendEvent({type:"track",event:"CONNECT_SUCCESS",properties:{method:"email",name:this.authConnector.name||"Unknown"}}),a.OptionsController.state.siwx||l.I.close()}}catch(e){throw o.X.sendEvent({type:"track",event:"EMAIL_VERIFICATION_CODE_FAIL",properties:{message:s.j.parseError(e)}}),e}},this.onOtpResend=async e=>{this.authConnector&&(await this.authConnector.provider.connectEmail({email:e}),o.X.sendEvent({type:"track",event:"EMAIL_VERIFICATION_CODE_SENT"}))}}};S=function(e,t,i,o){var r,n=arguments.length,a=n<3?t:null===o?o=Object.getOwnPropertyDescriptor(t,i):o;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)a=Reflect.decorate(e,t,i,o);else for(var l=e.length-1;l>=0;l--)(r=e[l])&&(a=(n<3?r(a):n>3?r(t,i,a):r(t,i))||a);return n>3&&a&&Object.defineProperty(t,i,a),a}([(0,c.Mo)("w3m-email-verify-otp-view")],S),i(76129);var T=(0,u.iv)`
  wui-icon-box {
    height: var(--wui-icon-box-size-xl);
    width: var(--wui-icon-box-size-xl);
  }
`,A=function(e,t,i,o){var r,n=arguments.length,a=n<3?t:null===o?o=Object.getOwnPropertyDescriptor(t,i):o;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)a=Reflect.decorate(e,t,i,o);else for(var l=e.length-1;l>=0;l--)(r=e[l])&&(a=(n<3?r(a):n>3?r(t,i,a):r(t,i))||a);return n>3&&a&&Object.defineProperty(t,i,a),a};let $=class extends u.oi{constructor(){super(),this.email=p.RouterController.state.data?.email,this.authConnector=h.ConnectorController.getAuthConnector(),this.loading=!1,this.listenForDeviceApproval()}render(){if(!this.email)throw Error("w3m-email-verify-device-view: No email provided");if(!this.authConnector)throw Error("w3m-email-verify-device-view: No auth connector provided");return(0,u.dy)`
      <wui-flex
        flexDirection="column"
        alignItems="center"
        .padding=${["xxl","s","xxl","s"]}
        gap="l"
      >
        <wui-icon-box
          size="xl"
          iconcolor="accent-100"
          backgroundcolor="accent-100"
          icon="verify"
          background="opaque"
        ></wui-icon-box>

        <wui-flex flexDirection="column" alignItems="center" gap="s">
          <wui-flex flexDirection="column" alignItems="center">
            <wui-text variant="paragraph-400" color="fg-100">
              Approve the login link we sent to
            </wui-text>
            <wui-text variant="paragraph-400" color="fg-100"><b>${this.email}</b></wui-text>
          </wui-flex>

          <wui-text variant="small-400" color="fg-200" align="center">
            The code expires in 20 minutes
          </wui-text>

          <wui-flex alignItems="center" id="w3m-resend-section" gap="xs">
            <wui-text variant="small-400" color="fg-100" align="center">
              Didn't receive it?
            </wui-text>
            <wui-link @click=${this.onResendCode.bind(this)} .disabled=${this.loading}>
              Resend email
            </wui-link>
          </wui-flex>
        </wui-flex>
      </wui-flex>
    `}async listenForDeviceApproval(){if(this.authConnector)try{await this.authConnector.provider.connectDevice(),o.X.sendEvent({type:"track",event:"DEVICE_REGISTERED_FOR_EMAIL"}),o.X.sendEvent({type:"track",event:"EMAIL_VERIFICATION_CODE_SENT"}),p.RouterController.replace("EmailVerifyOtp",{email:this.email})}catch(e){p.RouterController.goBack()}}async onResendCode(){try{if(!this.loading){if(!this.authConnector||!this.email)throw Error("w3m-email-login-widget: Unable to resend email");this.loading=!0,await this.authConnector.provider.connectEmail({email:this.email}),this.listenForDeviceApproval(),m.SnackController.showSuccess("Code email resent")}}catch(e){m.SnackController.showError(e)}finally{this.loading=!1}}};$.styles=T,A([(0,d.SB)()],$.prototype,"loading",void 0),$=A([(0,c.Mo)("w3m-email-verify-device-view")],$);var D=i(31183);i(11908),i(47242);var P=(0,u.iv)`
  wui-email-input {
    width: 100%;
  }

  form {
    width: 100%;
    display: block;
    position: relative;
  }
`,_=function(e,t,i,o){var r,n=arguments.length,a=n<3?t:null===o?o=Object.getOwnPropertyDescriptor(t,i):o;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)a=Reflect.decorate(e,t,i,o);else for(var l=e.length-1;l>=0;l--)(r=e[l])&&(a=(n<3?r(a):n>3?r(t,i,a):r(t,i))||a);return n>3&&a&&Object.defineProperty(t,i,a),a};let j=class extends u.oi{constructor(){super(...arguments),this.formRef=(0,D.V)(),this.initialEmail=p.RouterController.state.data?.email??"",this.redirectView=p.RouterController.state.data?.redirectView,this.email="",this.loading=!1}firstUpdated(){this.formRef.value?.addEventListener("keydown",e=>{"Enter"===e.key&&this.onSubmitEmail(e)})}render(){return(0,u.dy)`
      <wui-flex flexDirection="column" padding="m" gap="m">
        <form ${(0,D.i)(this.formRef)} @submit=${this.onSubmitEmail.bind(this)}>
          <wui-email-input
            value=${this.initialEmail}
            .disabled=${this.loading}
            @inputChange=${this.onEmailInputChange.bind(this)}
          >
          </wui-email-input>
          <input type="submit" hidden />
        </form>
        ${this.buttonsTemplate()}
      </wui-flex>
    `}onEmailInputChange(e){this.email=e.detail}async onSubmitEmail(e){try{if(this.loading)return;this.loading=!0,e.preventDefault();let t=h.ConnectorController.getAuthConnector();if(!t)throw Error("w3m-update-email-wallet: Auth connector not found");let i=await t.provider.updateEmail({email:this.email});o.X.sendEvent({type:"track",event:"EMAIL_EDIT"}),"VERIFY_SECONDARY_OTP"===i.action?p.RouterController.push("UpdateEmailSecondaryOtp",{email:this.initialEmail,newEmail:this.email,redirectView:this.redirectView}):p.RouterController.push("UpdateEmailPrimaryOtp",{email:this.initialEmail,newEmail:this.email,redirectView:this.redirectView})}catch(e){m.SnackController.showError(e),this.loading=!1}}buttonsTemplate(){let e=!this.loading&&this.email.length>3&&this.email!==this.initialEmail;return this.redirectView?(0,u.dy)`
      <wui-flex gap="s">
        <wui-button size="md" variant="neutral" fullWidth @click=${p.RouterController.goBack}>
          Cancel
        </wui-button>

        <wui-button
          size="md"
          variant="main"
          fullWidth
          @click=${this.onSubmitEmail.bind(this)}
          .disabled=${!e}
          .loading=${this.loading}
        >
          Save
        </wui-button>
      </wui-flex>
    `:(0,u.dy)`
        <wui-button
          size="md"
          variant="main"
          fullWidth
          @click=${this.onSubmitEmail.bind(this)}
          .disabled=${!e}
          .loading=${this.loading}
        >
          Save
        </wui-button>
      `}};j.styles=P,_([(0,d.SB)()],j.prototype,"email",void 0),_([(0,d.SB)()],j.prototype,"loading",void 0),j=_([(0,c.Mo)("w3m-update-email-wallet-view")],j);let L=class extends k{constructor(){super(),this.email=p.RouterController.state.data?.email,this.onOtpSubmit=async e=>{try{this.authConnector&&(await this.authConnector.provider.updateEmailPrimaryOtp({otp:e}),o.X.sendEvent({type:"track",event:"EMAIL_VERIFICATION_CODE_PASS"}),p.RouterController.replace("UpdateEmailSecondaryOtp",p.RouterController.state.data))}catch(e){throw o.X.sendEvent({type:"track",event:"EMAIL_VERIFICATION_CODE_FAIL",properties:{message:s.j.parseError(e)}}),e}},this.onStartOver=()=>{p.RouterController.replace("UpdateEmailWallet",p.RouterController.state.data)}}};L=function(e,t,i,o){var r,n=arguments.length,a=n<3?t:null===o?o=Object.getOwnPropertyDescriptor(t,i):o;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)a=Reflect.decorate(e,t,i,o);else for(var l=e.length-1;l>=0;l--)(r=e[l])&&(a=(n<3?r(a):n>3?r(t,i,a):r(t,i))||a);return n>3&&a&&Object.defineProperty(t,i,a),a}([(0,c.Mo)("w3m-update-email-primary-otp-view")],L);let V=class extends k{constructor(){super(),this.email=p.RouterController.state.data?.newEmail,this.redirectView=p.RouterController.state.data?.redirectView,this.onOtpSubmit=async e=>{try{this.authConnector&&(await this.authConnector.provider.updateEmailSecondaryOtp({otp:e}),o.X.sendEvent({type:"track",event:"EMAIL_VERIFICATION_CODE_PASS"}),this.redirectView&&p.RouterController.reset(this.redirectView))}catch(e){throw o.X.sendEvent({type:"track",event:"EMAIL_VERIFICATION_CODE_FAIL",properties:{message:s.j.parseError(e)}}),e}},this.onStartOver=()=>{p.RouterController.replace("UpdateEmailWallet",p.RouterController.state.data)}}};V=function(e,t,i,o){var r,n=arguments.length,a=n<3?t:null===o?o=Object.getOwnPropertyDescriptor(t,i):o;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)a=Reflect.decorate(e,t,i,o);else for(var l=e.length-1;l>=0;l--)(r=e[l])&&(a=(n<3?r(a):n>3?r(t,i,a):r(t,i))||a);return n>3&&a&&Object.defineProperty(t,i,a),a}([(0,c.Mo)("w3m-update-email-secondary-otp-view")],V);var N=i(26393),M=i(83414),F=function(e,t,i,o){var r,n=arguments.length,a=n<3?t:null===o?o=Object.getOwnPropertyDescriptor(t,i):o;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)a=Reflect.decorate(e,t,i,o);else for(var l=e.length-1;l>=0;l--)(r=e[l])&&(a=(n<3?r(a):n>3?r(t,i,a):r(t,i))||a);return n>3&&a&&Object.defineProperty(t,i,a),a};let U=class extends u.oi{constructor(){super(),this.authConnector=h.ConnectorController.getAuthConnector(),this.isEmailEnabled=a.OptionsController.state.features?.email,this.isAuthEnabled=this.checkIfAuthEnabled(h.ConnectorController.state.connectors),this.connectors=h.ConnectorController.state.connectors,h.ConnectorController.subscribeKey("connectors",e=>{this.connectors=e,this.isAuthEnabled=this.checkIfAuthEnabled(this.connectors)})}render(){if(!this.isEmailEnabled)throw Error("w3m-email-login-view: Email is not enabled");if(!this.isAuthEnabled)throw Error("w3m-email-login-view: No auth connector provided");return(0,u.dy)`<wui-flex
      flexDirection="column"
      .padding=${["3xs","m","m","m"]}
      gap="l"
    >
      <w3m-email-login-widget></w3m-email-login-widget>
    </wui-flex> `}checkIfAuthEnabled(e){let t=e.filter(e=>e.type===M.b.CONNECTOR_TYPE_AUTH).map(e=>e.chain);return N.b.AUTH_CONNECTOR_SUPPORTED_CHAINS.some(e=>t.includes(e))}};F([(0,d.SB)()],U.prototype,"connectors",void 0),U=F([(0,c.Mo)("w3m-email-login-view")],U)},47242:function(e,t,i){var o=i(45352),r=i(46491),n=i(3001);i(39045);var a=i(73616),l=i(46454);i(73543);var s=(0,o.iv)`
  :host {
    position: relative;
    display: inline-block;
  }

  wui-text {
    margin: var(--wui-spacing-xxs) var(--wui-spacing-m) var(--wui-spacing-0) var(--wui-spacing-m);
  }
`,c=function(e,t,i,o){var r,n=arguments.length,a=n<3?t:null===o?o=Object.getOwnPropertyDescriptor(t,i):o;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)a=Reflect.decorate(e,t,i,o);else for(var l=e.length-1;l>=0;l--)(r=e[l])&&(a=(n<3?r(a):n>3?r(t,i,a):r(t,i))||a);return n>3&&a&&Object.defineProperty(t,i,a),a};let u=class extends o.oi{constructor(){super(...arguments),this.disabled=!1}render(){return(0,o.dy)`
      <wui-input-text
        type="email"
        placeholder="Email"
        icon="mail"
        size="mdl"
        .disabled=${this.disabled}
        .value=${this.value}
        data-testid="wui-email-input"
        tabIdx=${(0,n.o)(this.tabIdx)}
      ></wui-input-text>
      ${this.templateError()}
    `}templateError(){return this.errorMessage?(0,o.dy)`<wui-text variant="tiny-500" color="error-100">${this.errorMessage}</wui-text>`:null}};u.styles=[a.ET,s],c([(0,r.Cb)()],u.prototype,"errorMessage",void 0),c([(0,r.Cb)({type:Boolean})],u.prototype,"disabled",void 0),c([(0,r.Cb)()],u.prototype,"value",void 0),c([(0,r.Cb)()],u.prototype,"tabIdx",void 0),c([(0,l.M)("wui-email-input")],u)},76129:function(e,t,i){i(518)},8524:function(e,t,i){var o=i(45352),r=i(46491),n=i(3001);i(39045);var a=i(73616),l=i(46454),s=(0,o.iv)`
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
`,c=function(e,t,i,o){var r,n=arguments.length,a=n<3?t:null===o?o=Object.getOwnPropertyDescriptor(t,i):o;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)a=Reflect.decorate(e,t,i,o);else for(var l=e.length-1;l>=0;l--)(r=e[l])&&(a=(n<3?r(a):n>3?r(t,i,a):r(t,i))||a);return n>3&&a&&Object.defineProperty(t,i,a),a};let u=class extends o.oi{constructor(){super(...arguments),this.tabIdx=void 0,this.disabled=!1,this.color="inherit"}render(){return(0,o.dy)`
      <button ?disabled=${this.disabled} tabindex=${(0,n.o)(this.tabIdx)}>
        <slot name="iconLeft"></slot>
        <wui-text variant="small-600" color=${this.color}>
          <slot></slot>
        </wui-text>
        <slot name="iconRight"></slot>
      </button>
    `}};u.styles=[a.ET,a.ZM,s],c([(0,r.Cb)()],u.prototype,"tabIdx",void 0),c([(0,r.Cb)({type:Boolean})],u.prototype,"disabled",void 0),c([(0,r.Cb)()],u.prototype,"color",void 0),c([(0,l.M)("wui-link")],u)},44779:function(e,t,i){i(23726)}}]);