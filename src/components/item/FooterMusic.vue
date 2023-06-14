<template>
    <div class="footerMusic">
        <audio ref="audio" :src="`https://music.163.com/song/media/outer/url?id=${playlist[playlistIndex].id}`" @timeupdate="updateTime"></audio>
        <div class="footerLeft" @click="detail">
            <img :src="playlist[playlistIndex].al.picUrl">
            <div>
                <p>{{ playlist[playlistIndex].name }}</p>
                <span>横滑切换上下首哦</span>
            </div>
        </div>
        <div class="footerRight">
            <svg class="icon" aria-hidden="true" @click="play" v-if="$store.state.isbtnShow">
                <use xlink:href="#icon-bofang"></use>
            </svg>
            <svg class="icon" aria-hidden="true" @click="play" v-else>
                <use xlink:href="#icon-zanting"></use>
            </svg>
            <svg class="icon" aria-hidden="true">
                <use xlink:href="#icon-zu"></use>
            </svg>
        </div>
        <van-popup v-model:show="detailShow" position="bottom" :style="{ height: '100%' }">
            <MusicDetail :musiclist = 'playlist[playlistIndex]' @play = "play"/>
        </van-popup>
    </div>
</template>

<script>
import { useStore } from 'vuex';
import { ref, onMounted } from 'vue';
import { computed } from 'vue';
import { watch } from 'vue';
import MusicDetail from '@/components/item/MusicDetail.vue';

export default {
    name: "FooterMusic",
    components: {
        MusicDetail,
    },

    setup() {
        const store = useStore();
        const playlist = computed(() => store.state.playlist)
        const playlistIndex = computed(() => (store.state.playlistIndex));
        const detailShow = computed(() => (store.state.detailShow));
        let currentTime = computed(() => store.state.currentTime); 
        const audio = ref(null)
        onMounted(() => {
        })
        watch(playlistIndex, () => {
            audio.value.autoplay = true;
            if (audio.value.paused) {
                store.commit('updateIsbtnShow', false)
            }
            store.dispatch('getLyric', store.state.playlist[store.state.playlistIndex].id)
        })
        watch(playlist, () => {
            if(store.state.isbtnShow) {
                audio.value.autoplay = true;
                store.commit('updateIsbtnShow', false)
            }
            store.dispatch('getLyric', store.state.playlist[store.state.playlistIndex].id)
        })
        watch(currentTime, () => {
            store.commit('updateDuration', audio.value.duration);
        })
        const play = () => {
            if(audio.value.paused) {
                audio.value.play();
                store.commit('updateIsbtnShow', false)
            }else {
                audio.value.pause();
                store.commit('updateIsbtnShow', true)
            }
        }
        const detail = function () {
            store.commit('updateDetailShow');
        }
        store.dispatch('getLyric', store.state.playlist[store.state.playlistIndex].id);
        const updateTime = () => {
            store.commit('updateCurrentTime', audio.value.currentTime)
        }
        
        return {
            store,
            playlist,
            playlistIndex,
            audio,
            play,
            detailShow,
            detail,
            updateTime,
        }
    },
    
}
</script>

<style lang="less" scoped>
.footerMusic {
    width: 100%;
    height: 1.4rem;
    background-color: #fff;
    position: fixed;
    bottom: 0;
    border-top: 0.02rem solid #777;
    display: flex;
    justify-content: space-between;
    padding: .2rem;
    .footerLeft {
        width: 65%;
        height: 100%;
        display: flex;
        justify-content: space-around;
        align-items: center;
        div {
            width: 70%;
        }
        img {
            width: 1rem;
            height: 1rem;
            border-radius: 50%;
        }
    }
    .footerRight {
        width: 20%;
        height: 100%;
        display: flex;
        justify-content: space-between;
        align-items: center;
        .icon {
            width: 0.6rem;
            height: 0.6rem;
        }
    }
}
</style>