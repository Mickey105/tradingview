import{_ as a,o as c,c as l,e as t,t as s,i as d}from"./index.8b30e6a1.js";const r={props:{notification:{type:Object,default:null},callback:{type:Function,default:null},buttonText:{type:String,default:"OK"}},emits:["close"],computed:{shownNotification(){return this.notification||this.$store.state.userNotifications[0]}},methods:{removeNotification(o){this.notification||this.$store.dispatch("core/deleteUserNotifications",o),this.callback&&this.callback(),this.$modal.close()}}},_={key:0,class:"modal-dialog wallet-modal",role:"document"},f={class:"modal-content"},u={class:"modal-body"},h={class:"text-capitalize"},m={class:"security-notice"},p=["innerHTML"],v={class:"text-center"};function b(o,i,n,y,N,e){return e.shownNotification?(c(),l("div",_,[t("div",f,[t("div",u,[t("div",null,[t("h3",h,s(e.shownNotification.title),1),t("div",m,[t("p",{class:"my-3",innerHTML:e.shownNotification.text},null,8,p),t("div",v,[t("button",{type:"button",class:"btn btn-primary btn-block py-2",onClick:i[0]||(i[0]=x=>e.removeNotification(e.shownNotification.id))},s(n.buttonText),1)])])])])])])):d("",!0)}var w=a(r,[["render",b],["__scopeId","data-v-8f60ef48"]]);export{w as I};
