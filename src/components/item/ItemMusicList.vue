<template>
    <div class="itemMusicList">
        <div class="itemListTop">
            <div class="listLeft">
                <svg class="icon" aria-hidden="true">
                    <use xlink:href="#icon-bofang"></use>
                </svg>
                <p>
                    <span class="span1">播放全部</span>
                    <span class="span2">(共{{ itemlist.length }}首)</span>
                </p>
            </div>
            <div class="listRight">
                <svg class="icon" aria-hidden="true">
                    <use xlink:href="#icon-plus-line"></use>
                </svg>
                <span>收藏({{ subscribedCount }})</span>
            </div>
        </div>
        <div class="itemList">
            <div class="item" v-for="(item, i) in itemlist" :key="i">
                <div class="itemLeft" @click="playMusic(i)">
                    <span class="index">{{ i + 1 }}</span>
                    <div>
                        <p>{{ item.name }}</p>
                        <span v-for="(item1, index) in item.ar" :key="index">
                            {{ item1.name }}&ensp; 
                        </span>
                    </div>
                </div>
                <div class="itemRight">
                    <svg class="icon one" aria-hidden="true" v-if="item.mv !== 0">
                        <use xlink:href="#icon-shipin"></use>
                    </svg>
                    <svg class="icon two" aria-hidden="true">
                        <use xlink:href="#icon-liebiao"></use>
                    </svg>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { useStore } from 'vuex';

export default {
    name: 'ItemMusicList',
    components: {
    },
    setup(props) {
        const store = useStore();
        const playMusic = function(i) {
            store.commit('updateplaylist', props.itemlist)
            store.commit('updateListIndex', i)
        }
        return {
            playMusic,
        }
    },
    props:['itemlist','subscribedCount'],
}
</script>

<style lang="less" scoped>
.itemMusicList {
    width: 100%;
    height: 100%;
    background-color: #fff;
    padding: 0 0.2rem;
    border-top-left-radius: 0.4rem;
    border-top-right-radius: 0.4rem;
    .itemListTop {
        width: 100%;
        height: 1rem;
        display: flex;
        justify-content: space-between;
        align-items: center;
        .listLeft {
            width: 45%;
            height: 100%;
            display: flex;
            justify-content: space-between;
            align-items: center;
            margin-left: 0.1rem;
            .span1 {
                font-size: 0.32rem;
                font-weight: 700;
            }
            .span2 {
                font-size: .28rem;
                color: darkgray;
            }
        }
        .listRight {
            height: 0.83rem;
            display: flex;
            align-items: center;
            padding: 0 .15rem;
            background-color: red;
            color: #fff;
            border-radius: 0.4rem;
            .icon {
                fill: #fff;
                width: .4rem;
                height: 0.4rem;
            }
        }
    }
    .itemList {
        margin-top: 0.2rem;
        margin-bottom: 1.3rem;
        .item {
            width: 100%;
            height: 1.2rem;
            display: flex;
            justify-content: space-between;
            align-items: center;
            .itemLeft {
                height: 100%;
                display: flex;
                justify-content: space-around;
                align-items: center;
                margin-left: 0.2rem;
                .index {
                    display: inline-block;
                    width: 0.4rem;
                    text-align: center;
                    color: #4B4B4B;
                    font-size: .36rem;
                }
                div {
                    margin-left: 0.3rem;
                    width: 4.9rem;
                    p {
                        margin-bottom: 0.1rem;
                        font-size: 0.32rem;
                        font-weight: 600;
                        overflow: hidden;
                        white-space: nowrap;
                        text-overflow: ellipsis;
                    }
                    span {
                        font-size: 0.28rem;
                        color: #C0C0C0;
                    }
                }
            }
            .itemRight {
                width: 1.2rem;
                height: 100%;
                position: relative;
                .one {
                    position: absolute;
                    left: 0;
                }
                .two {
                    position: absolute;
                    right: 0;
                }
            }
        }
    }
}
</style>
