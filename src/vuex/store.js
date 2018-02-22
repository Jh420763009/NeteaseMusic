import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

import user from './modules/common'
import music from './modules/music'
import publics from './modules/public'

export default new Vuex.Store({
	modules:{
		user,
		music,
		publics
	}
});
