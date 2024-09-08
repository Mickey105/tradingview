import{_ as c,P as h,Q as g,R as u,r as d,o as m,c as p,e as o,t as n,f,d as y}from"./index.8b30e6a1.js";import{f as _}from"./getRegularNumber.a168e36c.js";import{W as k}from"./WalletHistory.4d4db630.js";const w={name:"HistoryPage",metaInfo(){return{title:this.$t("pages.wallet"),meta:[{name:"description",content:`${this.localConfig.project_title} ${this.$t("pages.walletDescription")}`}]}},components:{WalletHistory:k},mixins:[h,g],data(){return{payout_form_view:"pending",curPage:1,txscount:0,amountOnPage:25,amountOfPages:1,timers:[],resend_loader:{},floor10:_}},computed:{...u({coins:"core/coins",profile:"core/profile",isConnectedSocket:"isConnectedSocket",wsUserIsAuthenticated:"wsUserIsAuthenticated",user_notification:"core/user_notification",walletTickerHistory:"core/walletTickerHistory",reconnectError:"reconnectError",lockedBalance:"core/lockedBalance"}),coinImg(){var e,t,a;return((t=(e=this.coins[this.$route.params.walletitem])==null?void 0:e.logo)==null?void 0:t.length)>0?(a=this.coins[this.$route.params.walletitem])==null?void 0:a.logo:`/public/img/common/svgcrypto/${this.$route.params.walletitem.toLowerCase()}.svg`}},watch:{isConnectedSocket(e){e&&localStorage.getItem("token")&&this.$store.dispatch("sendWSMessage",JSON.stringify({token:localStorage.getItem("token")}))},wsUserIsAuthenticated(e){e&&this.getWalletHistory()},reconnectError(e){e&&this.updateWalletHistory(this.curPage,this.amountOnPage)}},mounted(){this.$store.dispatch("core/getUserNotifications"),this.isConnectedSocket&&(localStorage.getItem("token")&&this.$store.dispatch("sendWSMessage",JSON.stringify({token:localStorage.getItem("token")})),this.wsUserIsAuthenticated&&this.getWalletHistory())},beforeUnmount(){for(this.unsubscribeWsData();this.timers.length;)clearTimeout(this.timers.shift())},methods:{toDetails(e,t){this.$router.push({name:`wallet-${e}`,params:{walletitem:t}})},fromPagetoLimits(e){let t=this.amountOnPage,a=t*(e-1);return{limit:t,offset:a,pageNum:e}},getPageCount(){return this.amountOfPages},changePage(e){this.curPage=e},handlePagination(e){this.changePage(e),this.reconnectError?this.updateWalletHistory(e,this.amountOnPage):this.getWalletHistory(e,this.amountOnPage,!0)},getPrettyDate(e){let t=new Date;return t.setTime(parseInt(e)*1e3),t.toLocaleString("ru-RU")},updateTable(){this.getWalletHistory(this.curPage,this.amountOnPage,!0),this.reconnectError&&this.updateWalletHistory(this.curPage)},sendSocketMessage(e,t,a,r){let s={command:e};t&&Object.keys(t)&&(s.params=t),r&&(s.token=localStorage.getItem("token")||null),a&&(s.params.pair_name=`${this.currentPair[0]}-${this.currentPair[1]}`),this.$store.dispatch("sendWSMessage",JSON.stringify(s))},updateWalletHistory(e,t){let a=t*(e-1);this.$store.dispatch("core/getWalletTickerHistory",{limit:t,offset:a,page:e,fc:()=>{this.changePage(e)}})},getWalletHistory(e,t){const a="add_wallet_ticker_history";this.reconnectError||this.sendSocketMessage(a,{limit:t||25,page:e||1,ticker:this.$route.params.walletitem},!1,!0)},unsubscribeWsData(){this.sendSocketMessage("del_wallet_ticker_history",{ticker:this.$route.params.walletitem},!1,!0)}}},P={class:"w-full wallet-history"},$={class:"plate"},H={class:"history__coin"},S=["src"];function W(e,t,a,r,s,i){const l=d("WalletHistory");return m(),p("div",P,[o("div",$,[o("div",{class:"plate-back",onClick:t[0]||(t[0]=v=>e.$router.push({name:"wallet"}))},n(e.$t("common.history")),1),o("div",H,[o("img",{width:"20",height:"20",class:"inline-block",src:i.coinImg},null,8,S),f(" "+n(e.$route.params.walletitem),1)]),y(l,{wallethistory:e.walletTickerHistory.list,"cur-page":e.walletTickerHistory.currentPage,"page-count":e.walletTickerHistory.totalPages,"get-pretty-date":i.getPrettyDate,"handle-pagination":i.handlePagination,"update-table":i.updateTable,onPageChange:i.changePage},null,8,["wallethistory","cur-page","page-count","get-pretty-date","handle-pagination","update-table","onPageChange"])])])}var T=c(w,[["render",W],["__scopeId","data-v-af9f820a"]]);export{T as default};
