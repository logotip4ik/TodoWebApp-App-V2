import Vue from 'vue';
import VueHooks from '@u3u/vue-hooks';
import VueCompositionApi from '@vue/composition-api';

import App from './App.vue';
import router from './router';
import store from './store';
import vuetify from './plugins/vuetify';

Vue.config.productionTip = false;

Vue.use(VueHooks);
Vue.use(VueCompositionApi);

new Vue({
  router,
  store,
  vuetify,
  render: (h) => h(App),
}).$mount('#app');
