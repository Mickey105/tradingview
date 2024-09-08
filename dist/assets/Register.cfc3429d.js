import{M as I}from"./ModalPagesHeader.a711d36d.js";import{x as z,_ as V,b as S,g as _,o as a,c as l,e as r,t as n,w as E,v,h as p,F as C,l as F,i as h,n as m,r as w,d as b,y as D,m as T,j as M,f as y,z as q,A as $,B,C as N}from"./index.8b30e6a1.js";import{i as U}from"./index.bc43380d.js";import{R as A}from"./vue-recaptcha.es.34e22086.js";import"./MainLogo.14cfea8b.js";const Y={name:"CountrySelect",directives:{clickOutside:z.directive},emits:["valid-country","change-value"],data(){return{searchQuery:"",selected:null,isOpen:!1}},computed:{countries(){const e=this.$store.getters["core/countriesList"];return Object.entries(e).map(t=>{const d=t[0].toLowerCase()==="ad"?"andora":t[0].toLowerCase();return{label:t[1],value:t[0],flag:`/public/img/common/flags/${d}.gif`}})},countryList(){const e=this.searchQuery.toLowerCase();return e===""?this.countries:this.countries.filter(t=>t.label.toLowerCase().includes(e))},selectedCountryInfo(){return this.countryList.find(e=>e.value===this.selected)},selectedLabel(){var e;return((e=this.selectedCountryInfo)==null?void 0:e.label)||null},flag(){var e;return((e=this.selectedCountryInfo)==null?void 0:e.flag)||null}},methods:{selectCountry(e){[].includes(e.value)?(this.$emit("valid-country",!1),this.$notify({type:"error",text:this.$t("common.countryIncorrect")})):this.$emit("valid-country",!0),this.close(),this.selected=e.value,this.$emit("change-value",e.value)},close(){this.isOpen=!1,this.searchQuery=""},open(){this.isOpen||(this.isOpen=!0)},toggle(){this.isOpen?this.close():this.open()}}},j={class:"country-select"},H={key:0},Z=["src","alt"],Q={key:1,class:"country-select__label-hint"},G={key:2},W=["placeholder"],J={class:"material-icons country-select__open-close-arrow"},K=["src"],X=["onClick"],ee=["src","alt"];function te(e,t,d,c,s,o){const f=S("click-outside");return _((a(),l("div",j,[r("div",{class:p(["country-select__selected-country",{"country-select__selected-country--opened":s.isOpen}]),onClick:t[2]||(t[2]=(...u)=>o.toggle&&o.toggle(...u))},[s.selected&&!s.isOpen?(a(),l("span",H,[r("img",{src:o.flag,alt:o.selectedLabel,class:"country-select__flag"},null,8,Z),r("span",null,n(o.selectedLabel),1)])):!o.selectedLabel&&!s.isOpen?(a(),l("span",Q,n(e.$t("common.chooseCountry")),1)):(a(),l("span",G,[_(r("input",{ref:"search","onUpdate:modelValue":t[0]||(t[0]=u=>s.searchQuery=u),class:"country-select__filter-input",type:"text",placeholder:e.$t("common.countrySearch"),onClick:t[1]||(t[1]=E(()=>{},["stop"]))},null,8,W),[[v,s.searchQuery]])])),r("i",J,[r("img",{width:"20",src:`/public/img/angle-${s.isOpen?"up":"down"}.svg`},null,8,K)])],2),o.countryList.length?(a(),l("ul",{key:0,class:p(["country-select__list",{"country-select__list--opened":s.isOpen}])},[(a(!0),l(C,null,F(o.countryList,u=>(a(),l("li",{key:u.value,class:"country-select__list-item",onClick:k=>o.selectCountry(u)},[r("img",{src:u.flag,alt:u.value,class:"country-select__flag"},null,8,ee),r("span",null,n(u.label),1)],8,X))),128))],2)):(a(),l(C,{key:1},[s.isOpen?(a(),l("div",{key:0,class:p(["country-select__list country-select__list--empty",{"country-select__list--opened":s.isOpen}])},[r("span",null,n(e.$t("common.countryNotFound")),1)],2)):h("",!0)],64))])),[[f,o.close]])}var re=V(Y,[["render",te]]);const se={name:"PasswordStrength",props:{level:{type:Number,required:!0}},computed:{bgColor(){let e="red";switch(this.level){case 1:case 2:e="#eb1d1d";break;case 3:case 4:e="#e0ae26";break;case 5:e="var(--theme-primary-color)";break}return e}}},oe={class:"password-strength"};function ie(e,t,d,c,s,o){return a(),l("div",oe,[(a(!0),l(C,null,F(d.level,(f,u)=>(a(),l("span",{key:u,style:m(`background-color: ${o.bgColor};`)},null,4))),128))])}var ne=V(se,[["render",ie]]);function x(){return{first_name:"",last_name:"",email:"",birth_day:"",password:"",country:"",subscription:!1}}const ae={name:"ConfirmWithdrawalUrl",metaInfo(){return{title:this.$t("pages.titles.register"),meta:[{name:"description",content:`${this.localConfig.project_title} ${this.$t("pages.registerDescription")}`}]}},components:{PasswordStrength:ne,CountrySelect:re,ModalPagesHeader:I,DatePicker:U,VueRecaptcha:A},props:{refcode:{type:String,required:!1,default:""}},data(){return{stage:"data_gathering",emailToWhichCodeSent:"",captchaResponseError:"",minYearsOld:18,form:x(),terms:!1,showPassPopup:!1,confirmEmailTimer:0,refCode:"",isReferral:!1,successRegister:!1,successTimer:0,registeredUserEmail:null,passwordViewType:"password",isValidCountry:null,showValidationErrorFor:{},confirmationCode:"",captcha:""}},computed:{validateRules(){return{first_name:{required:!0,minLength:2,maxLength:30,validateFunction:this.isCorrectName,invalidMessage:this.$t("common.invalidValueString")},last_name:{required:!0,minLength:2,maxLength:30,validateFunction:this.isCorrectName,invalidMessage:this.$t("common.invalidValueString")},email:{required:!0,validateFunction:this.validateEmail,invalidMessage:this.$t("common.invalidEmail")},password:{required:!0,minLength:6,maxLength:350},birth_day:{required:!0},country:{required:!0}}},validationError(){const e=this.form,t={},d=this.validateRules;for(const c in d)if(c in d){let s=d[c];e[c]?s.minLength&&e[c].length<s.minLength?t[c]=this.$t("common.fieldMinLength")+s.minLength:s.maxLength&&e[c].length>s.maxLength?t[c]=this.$t("common.fieldMaxLength")+s.maxLength:s.validateFunction&&!s.validateFunction(e[c])&&(t[c]=s.invalidMessage):s.required&&(t[c]=this.$t("common.requiredField"))}debugger;return t},showedValidationError(){return Object.fromEntries(Object.entries(this.validationError).filter(([e])=>this.showValidationErrorFor[e]))},isPassNoEmpty(){return this.form.password.length>0},isPassHasUppercase(){return/[A-Z]/.test(this.form.password)},isPassHasLowercase(){return/[a-z]/.test(this.form.password)},isPassHasNumbercase(){return/[\d]/.test(this.form.password)},isPassAnouth(){return this.form.password.length>7&&this.form.password.length<31},datePickerOptions(){return{isClearable:!1,format:"DD.MM.YYYY",editable:!0,firstDay:1,placeholder:this.$locale==="ru"?"\u0427\u0427.\u041C\u041C.\u0413\u0413\u0413\u0413":"DD.MM.YYYY"}},isButtonDisabled(){return Object.keys(this.validationError).length||!this.terms||!this.isValidCountry},passwordStrengthLevel(){let e=1;const{password:t}=this.form,d=new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})"),c=new RegExp("^(((?=.*[a-z])(?=.*[A-Z]))|((?=.*[a-z])(?=.*[0-9]))|((?=.*[A-Z])(?=.*[0-9])))(?=.{8,})"),s=new RegExp("^(((?=.*[a-z])(?=.*[A-Z]))|((?=.*[a-z])(?=.*[0-9]))|((?=.*[A-Z])(?=.*[0-9])))(?=.{6,})");return d.test(t)?e=5:c.test(t)?e=4:s.test(t)?e=3:t.length>=6&&(e=2),e},birthRangeError(){return this.form.birth_day&&!this.isBirthdayCorrect},userExist(){return this.registeredUserEmail!==null&&this.form.email===this.registeredUserEmail},isBirthdayCorrect(){return this.form.birth_day?this.isOlderThen(this.minYearsOld):!1},isCorrectPassword(){let e=/[A-Z]/.test(this.form.password),t=/[a-z]/.test(this.form.password),d=/\d/.test(this.form.password);return e&&t&&d}},watch:{"$i18n.locale":{immediate:!0,handler(e){this.$store.dispatch("core/getCountryList",e)}}},mounted(){const e=localStorage.getItem("p2p.refcode"),t=this.$props.refcode||e;t&&(localStorage.setItem("p2p.refcode",t),this.refCode=t,this.isReferral=!0)},methods:{goToGathering(){this.form=x(),this.stage="data_gathering",this.showValidationErrorFor={country:!0}},confirmEmail(){this.$http.post("auth/registration/verify-email/",{key:this.confirmationCode}).then(()=>{this.$notify({type:"success",title:"",text:this.$t("common.you_were_registered")}),this.$router.push({name:"login"})}).catch(e=>{var t;((t=e.data)==null?void 0:t.type)==="not_found"&&this.$notify({type:"error",title:"",text:this.$t("common.invalid_code")})})},resendCode(){this.$http.post("auth/registration/resend-email/",{email:this.form.email}).then(this.runConfirmEmailTimer)},runConfirmEmailTimer(){this.confirmEmailTimer=300;const e=setInterval(()=>{this.confirmEmailTimer--,this.confirmEmailTimer<0&&clearInterval(e)},1e3)},setValidCountry(e){this.isValidCountry=e},isCorrectName(e){return/^[-\sa-zA-Z]+$/.test(e)},isOlderThen(e){const t=this.form.birth_day,d=new Date;d.setFullYear(d.getFullYear()-e);const c=d.getTime();return t<c},onExpired(){this.$refs.recaptcha.reset()},onSelectCountry(e){this.form.country=e},validateEmail(e){return/\S+@\S+\.\S+/.test(e)},validateData(){return Object.keys(this.validationError).forEach(e=>this.showValidationErrorFor[e]=!0),Object.keys(this.validationError).length===0&&!this.birthRangeError},togglePasswordVisible(){this.passwordViewType=this.passwordViewType==="password"?"text":"password"},handleCaptcha(e){this.captcha=e},handleRegister(){if(this.validateData(this.form)&&!this.birthRangeError&&this.isCorrectPassword){const e={...this.form,lang:localStorage.getItem("planguage")||"en",password1:this.form.password,password2:this.form.password,username:this.form.email,country:this.form.country,captchaResponse:this.captcha};e.birth_day=new Date(this.form.birth_day-new Date(this.form.birth_day).getTimezoneOffset()*6e4).toISOString(),this.isReferral&&(e.affiliate_code=this.refCode),this.$http.post("auth/registration/",e).then(()=>{this.stage="email_confirmation",this.runConfirmEmailTimer(),this.emailToWhichCodeSent=this.form.email,this.isReferral&&localStorage.removeItem("p2p.refcode"),ga("create","UA-141014543-1","auto"),ga("send","form","registration")},t=>{var s,o;const d=["email","birth_day","first_name","last_name","country","password1","captchaResponse"];Object.entries(t.body).forEach(([f,u])=>{d.includes(f)&&u.forEach(k=>{this.$notify({type:"error",title:`${this.$t("common.field")}: ${f}`,text:k.message})})}),((o=(s=t.data)==null?void 0:s.type[0])==null?void 0:o.message)==="country_not_support"&&this.$notify({type:"error",text:this.$t("common.country_not_support")})})}else console.error("Not validated")}}},g=e=>(B("data-v-0eba14b1"),e=e(),N(),e),le={class:"auth"},de={key:0,class:"box mt-5"},ce={class:"text-center"},ue={class:"register__input-group register__input-group--half-width"},me={class:"register__input-wrapper"},pe={key:0,class:"register__input-error-hint"},he={class:"register__input-group register__input-group--half-width"},_e={class:"register__input-wrapper"},ge={key:0,class:"register__input-error-hint"},fe={class:"register__input-group"},ye={class:"register__input-wrapper"},we={key:0,class:"register__input-error-hint"},be={class:"register__input-group register__input-group--half-width"},ve=g(()=>r("div",{class:"register__date-icon"},[r("i",{class:"material-icons"},"calendar_today"),r("i",{class:"material-icons"},"arrow_drop_down")],-1)),ke={key:0,class:"register__input-error-hint register__input-error-hint--birthday"},Ee={key:1,class:"register__birthday-error"},Ce={class:"register__input-group register__input-group--half-width register__password"},Ve={class:"register__input-wrapper"},Te=["type"],qe={key:0,class:"show-password-icon",width:"20",height:"20",viewBox:"0 0 1792 1792",xmlns:"http://www.w3.org/2000/svg"},xe=g(()=>r("path",{d:"M555 1335l78-141q-87-63-136-159t-49-203q0-121 61-225-229 117-381 353 167 258 427 375zm389-759q0-20-14-34t-34-14q-125 0-214.5 89.5t-89.5 214.5q0 20 14 34t34 14 34-14 14-34q0-86 61-147t147-61q20 0 34-14t14-34zm363-191q0 7-1 9-106 189-316 567t-315 566l-49 89q-10 16-28 16-12 0-134-70-16-10-16-28 0-12 44-87-143-65-263.5-173t-208.5-245q-20-31-20-69t20-69q153-235 380-371t496-136q89 0 180 17l54-97q10-16 28-16 5 0 18 6t31 15.5 33 18.5 31.5 18.5 19.5 11.5q16 10 16 27zm37 447q0 139-79 253.5t-209 164.5l280-502q8 45 8 84zm448 128q0 35-20 69-39 64-109 145-150 172-347.5 267t-419.5 95l74-132q212-18 392.5-137t301.5-307q-115-179-282-294l63-112q95 64 182.5 153t144.5 184q20 34 20 69z"},null,-1)),Se=[xe],Fe={key:1,class:"show-password-icon",width:"20",height:"20",viewBox:"0 0 1792 1792",xmlns:"http://www.w3.org/2000/svg"},Pe=g(()=>r("path",{d:"M1664 960q-152-236-381-353 61 104 61 225 0 185-131.5 316.5t-316.5 131.5-316.5-131.5-131.5-316.5q0-121 61-225-229 117-381 353 133 205 333.5 326.5t434.5 121.5 434.5-121.5 333.5-326.5zm-720-384q0-20-14-34t-34-14q-125 0-214.5 89.5t-89.5 214.5q0 20 14 34t34 14 34-14 14-34q0-86 61-147t147-61q20 0 34-14t14-34zm848 384q0 34-20 69-140 230-376.5 368.5t-499.5 138.5-499.5-139-376.5-368q-20-35-20-69t20-69q140-229 376.5-368t499.5-139 499.5 139 376.5 368q20 35 20 69z"},null,-1)),Le=[Pe],Re={key:0,class:"register__input-error-hint register__input-error-hint--password"},Oe=g(()=>r("div",{class:"arrow"},null,-1)),Ie=g(()=>r("span",{class:"icon"},"\u2714",-1)),ze=g(()=>r("span",{class:"icon"},"\u2714",-1)),De=g(()=>r("span",{class:"icon"},"\u2714",-1)),Me=g(()=>r("span",{class:"icon"},"\u2714",-1)),$e={class:"register__input-group register__input-group--country"},Be={class:"register__input-wrapper"},Ne={key:0,class:"register__input-error-hint register__input-error-hint--country"},Ue={class:"register__input-group register__input-group--agree"},Ae={class:"custom-control custom-switch"},Ye={href:"/public/docs/EN_User_Agreement_site.pdf",target:"_blank",rel:"noopener noreferrer nofollow",class:"register__link"},je={href:"/public/docs/EN_Privacy_policy_site.pdf",target:"_blank",rel:"noopener noreferrer nofollow",class:"register__link"},He={class:"custom-control custom-switch"},Ze={class:"register__input-group"},Qe={class:"register__input-wrapper register__input-wrapper--recap"},Ge={key:0,class:"register__input-error-hint register__input-error-hint--recap"},We=["disabled"],Je={key:0,class:"register__user-exist-hint"},Ke={class:"register__have-account"},Xe={key:1,class:"flex flex-col box white max-w-[304px]"},et={class:"logIn__title",style:{"max-width":"600px"}},tt={class:"logIn__descr mb-4"},rt=$('<strong class="logIn__descr mb-4" style="color:#c93d3d;" data-v-0eba14b1> If you do not see the email in a few minutes, check your <span style="color:aquamarine;" data-v-0eba14b1>\u201Cjunk mail\u201D</span> folder or <span style="color:aquamarine;" data-v-0eba14b1>\u201Cspam\u201D</span> folder. </strong><strong class="logIn__descr mb-4" style="color:#f7f7f7;" data-v-0eba14b1> If you have any other issue, please contact us at <a href="mailto:admin@pool4ever.com" data-v-0eba14b1><span style="color:aquamarine;" data-v-0eba14b1>admin@pool4ever.com.</span></a></strong>',2),st={key:0,class:"logIn__descr mb-4"},ot={class:"logIn__form__input logIn__form__input_button block uppercase mb-[13px] !bg-[#4fff9e]",style:{"border-radius":"25px !important"},type:"submit"};function it(e,t,d,c,s,o){const f=w("ModalPagesHeader"),u=w("date-picker"),k=w("PasswordStrength"),P=w("CountrySelect"),L=w("vue-recaptcha"),R=w("router-link"),O=S("pattern");return a(),l("div",le,[r("div",{class:"register pb-5 px-1",style:m(e.loginBackground?`background: ${e.loginBackground} !important`:{})},[b(f),s.stage==="data_gathering"?(a(),l("div",de,[r("div",ce,[r("div",{class:"register__title inline-block",style:m(e.loginText?`color: ${e.loginText} !important`:{})},n(e.$t("common.createAccount")),5)]),r("form",{class:"register__form",autocomplete:"off",novalidate:"",onSubmit:t[20]||(t[20]=E((...i)=>o.handleRegister&&o.handleRegister(...i),["prevent"]))},[r("div",ue,[r("label",{for:"first_name",style:m(e.loginText?`color: ${e.loginText} !important`:{})},n(e.$t("common.firstname"))+":",5),r("span",me,[_(r("input",{id:"first_name","onUpdate:modelValue":t[0]||(t[0]=i=>s.form.first_name=i),type:"text",class:p(["register__input",{"border-red":o.showedValidationError.first_name}]),style:{"border-radius":"25px"},onBlur:t[1]||(t[1]=i=>s.showValidationErrorFor.first_name=!0),onFocus:t[2]||(t[2]=i=>s.showValidationErrorFor.first_name=!1)},null,34),[[v,s.form.first_name]]),o.showedValidationError.first_name?(a(),l("span",pe,n(o.showedValidationError.first_name),1)):h("",!0)])]),r("div",he,[r("label",{for:"last_name",style:m(e.loginText?`color: ${e.loginText} !important`:{})},n(e.$t("common.lastname"))+":",5),r("span",_e,[_(r("input",{id:"last_name","onUpdate:modelValue":t[3]||(t[3]=i=>s.form.last_name=i),type:"text",class:p(["register__input",{"border-red":o.showedValidationError.last_name}]),onBlur:t[4]||(t[4]=i=>s.showValidationErrorFor.last_name=!0),onFocus:t[5]||(t[5]=i=>s.showValidationErrorFor.last_name=!1)},null,34),[[v,s.form.last_name]]),o.showedValidationError.last_name?(a(),l("span",ge,n(o.showedValidationError.last_name),1)):h("",!0)])]),r("div",fe,[r("label",{for:"email",style:m(e.loginText?`color: ${e.loginText} !important`:{})},"Email:",4),r("span",ye,[_(r("input",{id:"email","onUpdate:modelValue":t[6]||(t[6]=i=>s.form.email=i),type:"text",class:p(["register__input",{"border-red":o.showedValidationError.email}]),onBlur:t[7]||(t[7]=i=>s.showValidationErrorFor.email=!0),onFocus:t[8]||(t[8]=i=>s.showValidationErrorFor.email=!1)},null,34),[[v,s.form.email]]),o.showedValidationError.email?(a(),l("span",we,n(o.showedValidationError.email),1)):h("",!0)])]),r("div",be,[r("label",{style:m(e.loginText?`color: ${e.loginText} !important`:{})},n(e.$t("common.birthday"))+":",5),_((a(),D(u,{ref:"datepicker",value:s.form.birth_day,"onUpdate:value":t[9]||(t[9]=i=>s.form.birth_day=i),typeable:!0,clearable:o.datePickerOptions.isClearable,editable:o.datePickerOptions.editable,format:o.datePickerOptions.format,placeholder:o.datePickerOptions.placeholder,"first-day-of-week":o.datePickerOptions.firstDay,"value-type":"timestamp",lang:e.$locale==="en"?"en":"ru",style:{"border-radius":"25px"},class:p(["register__input--birthday",{"register__input--birthday-invalid":o.birthRangeError,"border-red":o.showedValidationError.birth_day}]),onClose:t[10]||(t[10]=i=>s.showValidationErrorFor.birth_day=!0),onFocus:t[11]||(t[11]=i=>s.showValidationErrorFor.birth_day=!1)},{"calendar-icon":T(()=>[ve]),_:1},8,["value","clearable","editable","format","placeholder","first-day-of-week","lang","class"])),[[O,/^[0-9.]*$/]]),o.showedValidationError.birth_day?(a(),l("span",ke,n(o.showedValidationError.birth_day),1)):h("",!0),o.birthRangeError?(a(),l("span",Ee,n(e.$t("common.bdayError")),1)):h("",!0)]),r("div",Ce,[r("label",{for:"password",style:m(e.loginText?`color: ${e.loginText} !important`:{})},n(e.$t("common.password"))+":",5),r("span",Ve,[_(r("input",{id:"password","onUpdate:modelValue":t[12]||(t[12]=i=>s.form.password=i),type:s.passwordViewType,autocomplete:"new-password",class:p(["register__input register__input--password",{"border-red":o.showedValidationError.password}]),style:{height:"auto"},onBlur:t[13]||(t[13]=i=>s.showValidationErrorFor.password=!0),onFocus:t[14]||(t[14]=i=>s.showValidationErrorFor.password=!1)},null,42,Te),[[M,s.form.password]]),r("span",{class:"eye-pass",onClick:t[15]||(t[15]=(...i)=>o.togglePasswordVisible&&o.togglePasswordVisible(...i))},[s.passwordViewType==="text"?(a(),l("svg",qe,Se)):(a(),l("svg",Fe,Le))]),b(k,{level:o.passwordStrengthLevel},null,8,["level"]),o.showedValidationError.password?(a(),l("span",Re,n(o.showedValidationError.password),1)):h("",!0)]),o.isPassNoEmpty?(a(),l("div",{key:0,class:"pass-error-block",onClick:t[16]||(t[16]=i=>s.showPassPopup=!1)},[Oe,r("ul",null,[r("li",{class:p({"no-correct":!o.isPassHasUppercase})},[Ie,y(" "+n(e.$t("common.password_upper")),1)],2),r("li",{class:p({"no-correct":!o.isPassHasLowercase})},[ze,y(" "+n(e.$t("common.password_lower")),1)],2),r("li",{class:p({"no-correct":!o.isPassHasNumbercase})},[De,y(" "+n(e.$t("common.password_number")),1)],2),r("li",{class:p({"no-correct":!o.isPassAnouth})},[Me,y(" "+n(e.$t("common.password_chars")),1)],2)])])):h("",!0)]),r("div",$e,[r("label",{style:m(e.loginText?`color: ${e.loginText} !important`:{}),onClick:t[17]||(t[17]=E(i=>e.$refs.countryselect.toggle(),["stop"]))},n(e.$t("common.country"))+":",5),r("span",Be,[b(P,{ref:"countryselect",class:p({"border-red":o.showedValidationError.country}),onChangeValue:o.onSelectCountry,onValidCountry:o.setValidCountry},null,8,["class","onChangeValue","onValidCountry"]),o.showedValidationError.country?(a(),l("span",Ne,n(o.showedValidationError.country),1)):h("",!0)])]),r("div",Ue,[r("div",Ae,[_(r("input",{id:"terms","onUpdate:modelValue":t[18]||(t[18]=i=>s.terms=i),type:"checkbox",class:"custom-control-input"},null,512),[[q,s.terms]]),r("label",{class:"custom-control-label pt-1",style:m(e.loginText?`color: ${e.loginText} !important`:{}),for:"terms"},[y(n(e.$t("common.agree"))+" ",1),r("a",Ye,n(e.$t("common.terms")),1),y(" & "),r("a",je,n(e.$t("common.privacy")),1)],4)]),r("div",He,[_(r("input",{id:"newspaper","onUpdate:modelValue":t[19]||(t[19]=i=>s.form.subscription=i),type:"checkbox",class:"custom-control-input"},null,512),[[q,s.form.subscription]]),r("label",{class:"custom-control-label pt-1",style:m(e.loginText?`color: ${e.loginText} !important`:{}),for:"newspaper"},n(e.$t("common.newspaper")),5)])]),r("div",Ze,[r("span",Qe,[b(L,{ref:"recaptcha",sitekey:e.localConfig.recaptcha_site_key,onVerify:o.handleCaptcha,onExpired:o.onExpired},null,8,["sitekey","onVerify","onExpired"]),s.captchaResponseError?(a(),l("span",Ge,n(s.captchaResponseError),1)):h("",!0)]),r("button",{class:"register__button mx-auto",style:m(e.mainColor?`background: ${e.mainColor} !important`:{}),disabled:o.isButtonDisabled,type:"submit"},n(e.$t("common.createAccount")),13,We)]),o.userExist?(a(),l("p",Je,n(e.$t("common.user_registered")),1)):h("",!0)],32),r("section",Ke,[b(R,{to:"/login",class:"register__link register__link--hint",style:m(e.loginText?`color: ${e.loginText} !important`:{})},{default:T(()=>[r("span",null,n(e.$t("common.haveaccount")),1)]),_:1},8,["style"])])])):s.stage==="email_confirmation"?(a(),l("div",Xe,[r("div",et,n(e.$t("common.email_confirmation")),1),r("div",tt,[r("strong",null,n(e.$t("common.email_sent")),1)]),rt,r("form",{class:"logIn_form",autocomplete:"off",onSubmit:t[24]||(t[24]=E((...i)=>o.confirmEmail&&o.confirmEmail(...i),["prevent"]))},[_(r("input",{"onUpdate:modelValue":t[21]||(t[21]=i=>s.confirmationCode=i),required:"",autocomplete:"google2fa",class:"text-center mb-4",type:"text"},null,512),[[v,s.confirmationCode]]),s.confirmEmailTimer>0?(a(),l("div",st,[r("strong",null,n(e.$t("common.getCode")),1),y(" "+n(e.$t("common.againAfter",{n:s.confirmEmailTimer})),1)])):(a(),l("button",{key:1,class:"logIn__form__input logIn__form__input_button block uppercase !bg-[#FFD54F]",style:{"border-radius":"25px !important"},type:"button",onClick:t[22]||(t[22]=(...i)=>o.resendCode&&o.resendCode(...i))},n(e.$t("common.resend")),1)),r("button",ot,n(e.$t("common.confirm_email")),1),r("button",{class:"logIn__register block uppercase !bg-[#ff5d55]",style:{"border-radius":"25px !important"},onClick:t[23]||(t[23]=(...i)=>o.goToGathering&&o.goToGathering(...i))},n(e.$t("common.back")),1)],32)])):h("",!0)],4)])}var ut=V(ae,[["render",it],["__scopeId","data-v-0eba14b1"]]);export{ut as default};
