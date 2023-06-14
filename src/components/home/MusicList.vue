<template>
    <div class="musicList">
        <div class="musicTop">
            <div class="title">发现好歌单</div>
            <div class="more">查看更多</div>
        </div>
        <div class="musicContent">
            <van-swipe :loop="false" :width="120" class="my-swipe" :show-indicators="false">

                    <van-swipe-item v-for="item in state.musicList" :key="item" class="swipe-item">
                        <router-link :to="{path:'/itemmusic', query:{id:item.id}}">
                            <img :src="item.picUrl" alt="">
                            <span class="playCount">
                                <svg class="icon" aria-hidden="true">
                                    <use xlink:href="#icon-bofang2"></use>
                                </svg>
                                {{ changeCount(item.playCount) }}
                            </span>
                            
                            <span class="name">{{ item.name }}</span>
                        </router-link>
                    </van-swipe-item>
                
            </van-swipe>
        </div>
    </div>
</template>

<script>
import { getMusicList,} from '@/request/api/home';
import { reactive, onMounted } from 'vue';
export default {
  name: 'MusicList',
  components: {
  },
  setup() {
    const state = reactive({
      musicList: [],
    })
    const changeCount = function(num) {
        if (num >= 100000000) {
            return (num/100000000).toFixed(1) + '亿'
        } else if (num >= 10000) {
            return (num/10000).toFixed(1) + '万'
        }
    }
    onMounted(async ()=> {
      let res = await getMusicList();
      state.musicList = res.data.result;
    })
    return {
        state,
        changeCount,
    };
  }
}
</script>
<style lang="less" scoped>
* {
    box-sizing: border-box;
}
.musicList {
    width: 100%;
    padding: 0.2rem;
    .musicTop {
        width: 100%;
        height: 0.6rem;
        display: flex;
        justify-content: space-between;
        margin-bottom: 0.2rem;
        .title {
            font-size: 0.4rem;
            font-weight: 900;
        }
        .more {
            border: 0.02rem solid #ccc;
            border-radius: 0.4rem;
            padding: 0 0.2rem;
            text-align: center;
            line-height: 0.6rem;
        }
    }
    .musicContent {
        width: 100%;
        .my-swipe {
            height: 100%;
            .swipe-item {
                position: relative;
                width: 100%;
                margin-right: 0.2rem;
                img {
                    width: 100%;
                    height: 2.4rem;
                    border-radius: 0.2rem;
                }
                .playCount {
                    position: absolute;
                    top: 0.1rem;
                    right: 0.1rem;
                    font-size: .3rem;
                    color: white;
                    .icon {
                        width: .3rem;
                        height: 0.25rem;
                        color: white;
                    }
                }
            }
            
        }
    }
}
</style>