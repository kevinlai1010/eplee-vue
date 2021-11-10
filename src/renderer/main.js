// eslint-disable-next-line import/no-extraneous-dependencies
import { remote } from 'electron';
import Vue from 'vue';
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import 'element-ui/lib/theme-chalk/reset.css';
import locale from 'element-ui/lib/locale/lang/en';
import VueElectron from 'vue-electron';
import VueBus from 'vue-bus';
import electronLocalshortcut from 'electron-localshortcut';
import path from 'path';
import App from './App';
import router from './router';
import store from './store';
import Database from '../shared/db';

Vue.config.productionTip = false;
Vue.config.devtools = true;

Vue.use(ElementUI, { locale });
Vue.use(VueElectron);
Vue.use(VueBus);
// Vue.use(require('vue-electron'));

Vue.prototype.$db = new Database(
  path.join(remote.app.getPath('appData'), 'eplee', 'books.json')
);
Vue.prototype.$remote = remote;
console.log(path.join(remote.app.getPath('appData'), 'eplee'));
Vue.prototype.$dataPath = path.join(remote.app.getPath('appData'), 'eplee');
Vue.prototype.$bind = electronLocalshortcut.register;
/* eslint-disable no-new */
new Vue({
  components: {
    App,
  },
  router,
  store,
  template: '<App/>',
}).$mount('#app');

/* Enable webpack hot reloading */
if (module.hot) {
  module.hot.accept();
}
