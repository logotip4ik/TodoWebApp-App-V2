import Vue from 'vue';
import VueHooks from '@u3u/vue-hooks';
import VueCompositionApi from '@vue/composition-api';

import App from './App.vue';
import router from './router';
import store from './store';

Vue.config.productionTip = false;

Vue.use(VueHooks);
Vue.use(VueCompositionApi);

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount('#app');
