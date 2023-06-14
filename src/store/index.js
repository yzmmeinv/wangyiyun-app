import { createStore } from 'vuex'
import { getMusicLyric } from './../request/api/item';
import { getLogin } from './../request/api/home';

export default createStore({
  state: {
    playlist: [{
      al: {
        id: 74800935,
        name: "爱殇",
        pic: 109951163870763630,
        picUrl: "https://p2.music.126.net/U8gz-goWF6O0KNWxAQN01Q==/109951163870763627.jpg",
        pic_str: "109951163870763627",
      },
      ar:[{
        name: '小时姑娘',
      }],
      name: "爱殇",
      id: 1332153723,
    }],
    playlistIndex: 0,
    isbtnShow: true,
    detailShow: false,
    lyricList: {
    },
    currentTime: 0,
    islyricShow: true,
    duration: 0,
    isLogin: false,
    isFooterMusic: true,
  },
  getters: {
  },
  mutations: {
    updateIsbtnShow(state, value) {
      state.isbtnShow = value;
    },
    updateplaylist(state, value) {
      state.playlist = value;
    },
    pushplaylist(state, value) {
      state.playlist.push(value);
    },
    updateListIndex(state,value) {
      state.playlistIndex = value;
    },
    updateDetailShow(state) {
      state.detailShow = !state.detailShow;
    },
    updateLyricList(state,value) {
      state.lyricList = value;
    },
    updateCurrentTime(state,value) {
      state.currentTime = value;
    },
    updateislyricShow(state) {
      state.islyricShow = !state.islyricShow;
    },
    updateDuration(state, value) {
      state.duration = value;
    }
  },
  actions: {
    getLyric: async function(context, value) {
      let res = await getMusicLyric(value);
      context.commit('updateLyricList', res.data.lrc);
    },
    getLogin: async function(context, value) {
      let res = await getLogin(value);
    }
  },
  modules: {
  }
})
