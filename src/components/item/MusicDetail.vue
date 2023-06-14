<template>
    <div class="box">
        <img :src="props.musiclist.al.picUrl" class="bgimg">
    </div>
    <div class="detailTop">
        <div class="detailTopLeft">
            <svg class="icon" aria-hidden="true" @click="updateDetailShow">
                <use xlink:href="#icon-zuojiantou"></use>
            </svg>
            <div class="musicname">
                <Vue3Marquee>
                    {{ props.musiclist.name }}
                </Vue3Marquee>
                <span v-for="item in props.musiclist.ar" :key="item">
                    {{ item.name }}
                </span>
                <svg class="icon" aria-hidden="true">
                    <use xlink:href="#icon-xiangyoujiantou"></use>
                </svg>
            </div>
        </div>
        <div class="detailTopRight">
            <svg class="icon" aria-hidden="true">
                <use xlink:href="#icon-fenxiang"></use>
            </svg>
        </div>
    </div>
    <div class="detailContent" v-show="$store.state.islyricShow" @click="updateislyricShow">
        <img src="@/assets/needle-ab.png" class="needle" :class="{needle_active:!$store.state.isbtnShow}">
        <img src="@/assets/cd.png" class="cd">
        <img :src="props.musiclist.al.picUrl" class="ar" :class="!$store.state.isbtnShow ? 'img_ar_active' : 'img_ar_paused'">
    </div>
    <div class="musicLyric" ref="musicLyric" v-show="!$store.state.islyricShow" @click="updateislyricShow">
        <p v-for="item in lyric" :key="item" :class="{active:($store.state.currentTime >= item.time && $store.state.currentTime <= item.pre)}">
            {{ item.lrc }}
        </p>
    </div>
    <div class="detailFooter">
        <div class="footerTop">
            <svg class="icon" aria-hidden="true">
                <use xlink:href="#icon-aixin"></use>
            </svg>
            <svg class="icon" aria-hidden="true">
                <use xlink:href="#icon-xiazai"></use>
            </svg>
            <svg class="icon" aria-hidden="true">
                <use xlink:href="#icon-heijiaochangpian"></use>
            </svg>
            <svg class="icon" aria-hidden="true">
                <use xlink:href="#icon-xiaoxi-zhihui"></use>
            </svg>
            <svg class="icon" aria-hidden="true">
                <use xlink:href="#icon-liebiao-"></use>
            </svg>
        </div>
        <div class="footerContent">
            <input type="range" class="range" min="0" :max="$store.state.duration" v-model="currentTime" step="0.05">
        </div>
        <div class="footer">
            <svg class="icon" aria-hidden="true">
                <use xlink:href="#icon-xunhuan"></use>
            </svg>
            <svg class="icon" aria-hidden="true" @click="go(-1)">
                <use xlink:href="#icon-shangyishoushangyige"></use>
            </svg>
            <svg class="icon bof" aria-hidden="true" v-if="$store.state.isbtnShow" @click="play">
                <use xlink:href="#icon-bofang1"></use>
            </svg>
            <svg class="icon bof" aria-hidden="true" v-else @click="play">
                <use xlink:href="#icon-zanting2"></use>
            </svg>
            <svg class="icon" aria-hidden="true" @click="go(1)">
                <use xlink:href="#icon-xiayigexiayishou"></use>
            </svg>
            <svg class="icon" aria-hidden="true">
                <use xlink:href="#icon-zu"></use>
            </svg>
        </div>
    </div>
</template>

<script>
import { Vue3Marquee } from 'vue3-marquee';
import 'vue3-marquee/dist/style.css';
import { useStore } from 'vuex';
import { computed } from 'vue';
import { ref } from 'vue';
import { watch } from 'vue';

export default {
    name: 'MusicDetail',
    components: {
        Vue3Marquee,
    },
    props: {
        musiclist: {
            type: Object,
            require: true,
        },
    },
    emits: ["play"],
    setup(props, context) {
        const store = useStore();
        const detailShow = computed(() => store.state.detailShow)
        const currentTime = computed(() => store.state.currentTime)
        let index = store.state.playlistIndex;
        const musicLyric = ref(null)
        const play = () => {
            context.emit("play");
        }
        
        const updateDetailShow = function() {
            store.commit('updateDetailShow');
        }
        const updateislyricShow = () => {
            store.commit('updateislyricShow');
        }
        const go = (num) => {
            index = index + num;
            if (index < 0) {
                index = store.state.playlist.length - 1;
            } else if(index >= store.state.playlist.length) {
                index = 0;
            }
            store.commit('updateListIndex', index);
        }
        const lyric = computed(() => {
            let arr;
            if(store.state.lyricList.lyric) {
                arr = store.state.lyricList.lyric.split(/[(\r\n)\r\n]+/).map((item, i) => {
                    let min = item.slice(1,3);
                    let second = item.slice(4,6);
                    let mill = item.slice(7,10);
                    let lrc = item.slice(11,item.length);
                    let time = (parseInt(min) * 60 * 1000 + parseInt(second) * 1000 + parseInt(mill)) / 1000;
                    if(isNaN(Number(mill))) {
                        mill = item.slice(7,9);
                        lrc = item.slice(10,item.length);
                        time = (parseInt(min) * 60 * 1000 + parseInt(second) * 1000 + parseInt(mill)) / 1000;
                    }
                    return{min,second,mill,lrc,time}
                })
                arr.forEach((item, i) => {
                    if (i === arr.length - 1 || isNaN(arr[i + 1].time)) {
                        item.pre = 10000
                    }else {
                        item.pre = arr[i + 1].time
                    }
                });
            }
            return arr;
        })
        watch(currentTime, (newvalue) => {
            let p = document.querySelector('p.active');
            if(p) {
                if(p.offsetTop > 300 ) {
                    musicLyric.value.scrollTop=p.offsetTop - 300
                }
            }
            if(newvalue === store.state.duration) {
                go(1);
            }
        })
        return {
            props,
            detailShow,
            updateDetailShow,
            play,
            lyric,
            musicLyric,
            updateislyricShow,
            go,
            currentTime,
        }
    }
}
</script>

<style lang="less" scoped>
.box {
    position: fixed;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    background-color: rgba(123, 119, 119, 0.3);
    z-index: -1;
    .bgimg {
        width: 100%;
        height: 100%;
        position: absolute;
        z-index: -2;
        filter: blur(1.4rem);
    }
}

.detailTop {
    width: 100%;
    height: 2rem;
    padding: 0 .3rem;
    display: flex;
    justify-content: space-between;
    align-items: center;
    .detailTopLeft {
        width: 65%;
        height: 100%;
        display: flex;
        align-items: center;
        .icon {
            width: 0.7rem;
            height: 0.7rem;
            // fill: #fff;
        }
        .musicname {
            margin-left: 0.4rem;
            span {
                color: #999;
                font-size: 0.32rem;
            }
            .icon {
                width: 0.24rem;
                height: 0.24rem;
                fill: #999;
            }
        }
    }
    .detailTopRight {
        .icon {
            width: 0.7rem;
            height: 0.7rem;
        }
    }
}
.detailContent {
    width: 100%;
    height: 9rem;
    display: flex;
    flex-direction: column;
    align-items: center;
    position: relative;
    .needle {
        width: 2rem;
        height: 3rem;
        position: absolute;
        left: 46%;
        transform-origin: 0 0;
        transform: rotate(-13deg);
        transition: all 1.5s;
    }
    .needle_active {
        width: 2rem;
        height: 3rem;
        position: absolute;
        left: 46%;
        transform-origin: 0 0;
        transform: rotate(0deg);
        transition: all 1.5s;
    }
    .cd {
        width: 5rem;
        height: 5rem;
        position: absolute;
        bottom: 2.3rem;
        z-index: -1;
    }
    .ar {
        width: 3.2rem;
        height: 3.2rem;
        border-radius: 50%;
        position: absolute;
        bottom: 3.14rem;
        animation: rotate_ar 10s linear infinite ;
    }
    .img_ar_active {
        animation-play-state: running;
    }
    .img_ar_paused {
        animation-play-state: paused;
    }
    @keyframes rotate_ar {
        0% {
            transform: rotateZ(0deg);
        }
        100% {
            transform: rotateZ(360deg);
        }
    }
}
.musicLyric {
    width: 100%;
    height: 9rem;
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-top: 0.2rem;
    overflow: scroll;
    p {
        color: rgb(190, 181, 181);
        margin-bottom: 0.4rem;
        transition: all 0.7s;
    }
    .active {
        color: #fff;
        font-size: 0.4rem;
    }
}
.detailFooter {
    width: 100%;
    height: 3rem;
    position: absolute;
    bottom: 0.5rem;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    .footerTop {
        width: 100%;
        height: 1rem;
        display: flex;
        justify-content: space-around;
        align-items: center;
        .icon {
            width: 0.6rem;
            height: 0.6rem;
        }
    }
    .footerContent {
        width: 100%;
        height: 1rem;
        .range {
            width: 100%;
            height: 0.06rem;
            margin-top: 0.48rem;
        }
    }
    .footer {
        width: 100%;
        height: 1rem;
        display: flex;
        justify-content: space-around;
        align-items: center;
        .icon {
            width: 0.6rem;
            height: 0.6rem;
        }
        .bof {
            width: 1rem;
            height: 1rem;
        }
    }
}
</style>