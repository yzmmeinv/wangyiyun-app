<template>
    <div class="itemMusicTop">
        <img :src="playlist.coverImgUrl" class="bgimg">
        <div class="itemLeft">
            <svg class="icon" aria-hidden="true" @click="$router.go(-1)">
                <use xlink:href="#icon-zuojiantou"></use>
            </svg>
            <span>歌单</span>
        </div>
        <div class="itemRight">
            <svg class="icon" aria-hidden="true">
                <use xlink:href="#icon-sousuo1"></use>
            </svg>
            <svg class="icon" aria-hidden="true">
                <use xlink:href="#icon-liebiao"></use>
            </svg>
        </div>
    </div>
    <div class="itemTopContent" v-if="playlist.creator != null">
        <img :src="playlist.coverImgUrl" class="contentLeft">
        <span class="playCount">
            <svg class="icon" aria-hidden="true">
                <use xlink:href="#icon-bofang2"></use>
            </svg>
            {{ changeCount(playlist.playCount) }}
        </span>
        <div class="contentRight">
            <p class="rightp_one">{{ playlist.name }}</p>
            <div class="right_img">
                <img :src="playlist.creator.backgroundUrl" alt="">
                <span>{{ playlist.creator.nickname }}</span>
                <svg class="icon" aria-hidden="true">
                    <use xlink:href="#icon-youjiantou"></use>
                </svg>
            </div>
            <p class="rightp_two">
                <span>{{ playlist.description }}</span>
                <svg class="icon" aria-hidden="true">
                    <use xlink:href="#icon-youjiantou"></use>
                </svg>
            </p>
        </div>
    </div>
    <div class="itemTopFooter">
        <div class="footerItem">
            <svg class="icon" aria-hidden="true">
                <use xlink:href="#icon-xiaoxi-zhihui"></use>
            </svg>
            <span>{{ playlist.commentCount }}</span>
        </div>
        <div class="footerItem">
            <svg class="icon" aria-hidden="true">
                <use xlink:href="#icon-fenxiang"></use>
            </svg>
            <span>{{ playlist.shareCount }}</span>
        </div>
        <div class="footerItem">
            <svg class="icon" aria-hidden="true">
                <use xlink:href="#icon-xiazai"></use>
            </svg>
            <span>下载</span>
        </div>
        <div class="footerItem">
            <svg class="icon" aria-hidden="true">
                <use xlink:href="#icon-show_duoxuan"></use>
            </svg>
            <span>多选</span>
        </div>
    </div>
</template>

<script>

export default {
  name: 'ItemMusicTop',
  components: {
  },
  setup(props) {
    const changeCount = function(num) {
        if (num >= 100000000) {
            return (num/100000000).toFixed(1) + '亿'
        } else if (num >= 10000) {
            return (num/10000).toFixed(1) + '万'
        }
    }
    return {
        changeCount,
        props,
    }
  },
  props: ['playlist']
}
</script>

<style lang="less" scoped>
.itemMusicTop {
    width: 100%;
    height: 1rem;
    display: flex;
    justify-content: space-between;
    align-items: center;
    position: relative;
    .itemLeft, .itemRight {
        width: 25%;
        height: 100%;
        margin: 0 .2rem;
        display: flex;
        justify-content: space-between;
        align-items: center;
        span {
            font-size: 0.4rem;
            color: #fff;
        }
        .icon {
            fill: #fff;
        }
    }
    .bgimg {
        width: 100%;
        height: 11rem;
        position: fixed;
        z-index: -1;
        filter: blur(.6rem);
    }
}
.itemTopContent {
    width: 100%;
    height: 3rem;
    padding: 0.1rem 0.2rem;
    position: relative;
    display: flex;
    justify-content: space-around;
    .playCount {
        position: absolute;
        top: 0.1rem;
        right: 4.6rem;
        font-size: .3rem;
        color: white;
        .icon {
            width: .3rem;
            height: 0.25rem;
            color: white;
        }
    }
    .contentLeft {
        width: 2.7rem;
        height: 2.7rem;
        border-radius: 0.2rem;
    }
    .contentRight {
        width: 4rem;
        height: 100%;
        .rightp_one{
            color: #fff;
            font-weight: 900;
            font-size: .32rem;
            padding: 0
        }
        .right_img {
            width: 100%;
            height: 1rem;
            line-height: 1rem;
            
            img {
                width: .64rem;
                height: .64rem;
                border-radius: .3rem;
                margin: 0.2rem;
                vertical-align:middle
            }
            span {
                color: darkslategray;
                font-size: 0.3rem;
                
            }
            .icon {
                width: 0.2rem;
                height: 0.2rem;
                fill: darkslategray;
                margin-left: 0.04rem;
            }
        }
        .rightp_two {
            width: 100%;
            height: .8rem;
            display: flex;
            justify-content: space-around;
            span {
                display: inline-block;
                width: 95%;
                font-size: 0.28rem;
                color: darkslategray;
                display: -webkit-box;
                -webkit-box-orient: vertical;
                -webkit-line-clamp: 2;
                overflow: hidden;
            }
            .icon {
                width: 0.25rem;
                height: 0.25rem;
                margin-left: 0.04rem;
                margin-top: 0.24rem;
            }
        }
    }
}
.itemTopFooter {
    width: 100%;
    height: 1.7rem;
    display: flex;
    justify-content: space-around;
    .footerItem {
        width: 25%;
        display: flex;
        flex-direction: column;
        justify-content: space-evenly;
        align-items: center;
        margin-bottom: 0.2rem;
        .icon {
            width: .6rem;
            height: .6rem;
        }
    }
}
</style>