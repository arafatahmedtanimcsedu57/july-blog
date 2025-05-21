import Vue from 'vue'
import App from './App.vue'
import router from "./router"
import axios from "./Plugins/axios";

import { BootstrapVue, IconsPlugin } from 'bootstrap-vue'

import vSelect from 'vue-select'
import 'vue-select/dist/vue-select.css';

Vue.component('v-select', vSelect)


Vue.use(BootstrapVue)
Vue.use(IconsPlugin)

// import * as icons from "./assets/Icons/icons.js";
// Object.keys(icons).forEach(icon=>{
// 	Vue.component(icon, icons[icon])
// })

import { extend } from 'vee-validate';
import { required } from 'vee-validate/dist/rules';

// Override the default message.
extend('required', {
  ...required,
  message: 'This field is required'
});

Vue.config.productionTip = false


Vue.filter(
  'fileSize',
  function (size) {
    var i = size == 0 ? 0 : Math.floor(Math.log(size) / Math.log(1024));
    return +((size / Math.pow(1024, i)).toFixed(2)) * 1 + ' ' + ['B', 'KB', 'MB', 'GB', 'TB'][i];
  }
)

Vue.mixin({
  data() {
    return {
    }
  },
  methods:{
    updateFormStatus(form_uuid=null,status=null, state=null){
      if(!status || !state || !form_uuid) return null;
      let _this = this;
      _this.$root.$emit('overlay',true);

      let APIs = require('./API/api');
      let config={
        errorCode: APIs.PUT_FORM_STATUS_API.errorCode,
        showErrorAlert:true,
        showErrorlog:true,
      };
      axios.put(
        APIs.PUT_FORM_STATUS_API.url(form_uuid), 
        {
          digiregStatus:status,
          digiregState:state
        }, 
        config
      ).then(res=> {
        // console.log(res);
      })
      .catch(err => {
        _this.handleError(err.toJSON());
        _this.$root.$emit('overlay',false);

      })
    },
    destroyActiveToast(){
      this.toasts.forEach(toast=>this.$bvToast.hide(toast))
    },
    handleError(error={}, response={}){
      if(response?.data?.status=='ERROR'){
        if(response?.data?.errors?.message=='TOKEN_EXPIRED'){
          sessionStorage.removeItem('token');
          error.config.showErrorAlert = false;
          this.notify('danger', 'Session expired! Please login again.');
          this.$root.$emit('overlay',true);

          setTimeout(() => {
            this.$router.go()
          }, 3000, this);
        }
      }

      if(error?.config?.showErrorlog){
        console.error(error.config?.errorCode)

      }
      if(error?.config?.showErrorAlert){
        // this.notify('danger', `Error:${error.config.message || ''} ${error.config.errorCode }`)
        const h = this.$createElement;
        const vNodesTitle = h(
          'div',
          [
            // h('b-img', { class: 'pl-1', props:{src:"/dead.svg", fluid :true, width: 200, height: 200 }},),
            h('b-icon', { class: '', props:{icon:'x-circle-fill', variant:'danger' , scale:2.5}},),
            h('div', { class: 'pt-4 pl-1' }, "Aaaah! Something went wrong"),
          ]
        )
        this.$bvModal.msgBoxConfirm('Brace yourself till we get the error fixed.\n You may also refresh the page or try again later.',
          {
            title: [vNodesTitle],
            centered: true,
            headerClass: 'border-bottom-0 pb-0 text-center',
            titleClass:'h4',
            bodyClass:'pt-1 text-center text-7',
            footerClass: 'd-none',
            contentClass:'align-items-center p-4',
            hideHeaderClose: false,
          }
        )
      }
    },
    notify(variant="info",title="Toast notification"){
      // this.$bvToast?.hide();
      this.showToast(variant, title, null, 0);
    },
    showToast(variant='info',title='Toast title', message=null, delay_=5000) {
      let icons={
        info:'info-circle-fill',
        success:'cloud-check-fill',
        warning:'exclamation-triangle-fill',
        danger:'exclamation-circle-fill'
      };
      let delay={
        info:5000,
        success:3500,
        warning:5000,
        danger:6000
      };
      const h = this.$createElement
      const vNodesMsg = h(
        'p',
        { class: ['text-left', 'mb-0'] },
        [
          ` ${message} `,
        ]
      )
      const vNodesTitle = h(
        'div',
        { class: ['d-flex', 'flex-grow-1', 'align-items-baseline', 'mr-2'] },
        [
          h('b-icon', { class: 'mr-2 align-self-center', props:{icon:icons[variant], variant:variant, scale:'1.3'}}),
          h('div', { class: 'pl-1' }, title),
        ]
      )
      this.$bvToast.toast([null], {
        title: [vNodesTitle],
        solid: true,
        variant: variant,
        bodyClass:"d-none",
        autoHideDelay:delay_ || delay[variant],
        toaster:"b-toaster-top-center",
        toastClass:"digiReg-toast",
        // noAutoHide:true,
      });
    }
  }
})

new Vue({
  router: router,
  axios,
  render: h => h(App),
}).$mount('#app')
