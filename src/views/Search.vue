<template>
    <div class="searchTop">
        <svg class="icon" aria-hidden="true" @click="$router.go(-1)">
            <use xlink:href="#icon-zuojiantou"></use>
        </svg>
        <input type="text" placeholder="陈奕迅" v-model="searchKey" @keydown.enter="enterKey">
    </div>
    <div class="searchHistory">
        <span class="history">历史</span>
        <span v-for="item in keywordList" :key="item" class="spankey" @click="searchHistory(item)">
            {{ item }}
        </span>
        <svg class="icon" aria-hidden="true" @click="delhistory">
            <use xlink:href="#icon-shanchu"></use>
        </svg>
    </div>
    <div class="itemList">
            <div class="item" v-for="(item, i) in searchList" :key="i">
                <div class="itemLeft" @click="updateIndex(item)">
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
</template>

<script>
import { ref } from 'vue';
import { getSearchMusic } from '@/request/api/home.js';
import { useStore } from 'vuex';

export default {
  name: 'TopNav',
  components: {
  },
  setup() {
    let keywordList = ref([]);
    let searchKey = ref('');
    let searchList = ref([]);
    const store = useStore();
    keywordList.value = JSON.parse(localStorage.getItem('keywordList')) || []
    const enterKey = async () => {
        if(searchKey.value != '') {
            keywordList.value.unshift(searchKey.value);
            keywordList.value = [...new Set(keywordList.value)];
            localStorage.setItem('keywordList',JSON.stringify(keywordList.value));
            if (keywordList.value.length > 10) {
                keywordList.value.splice(keywordList.value.length-1, 1)
            }
            let res = await getSearchMusic(searchKey.value);
            console.log(res)
            searchList.value = res.data.result.songs;
            searchKey.value = '';
        }
    }
    const delhistory = () => {
        localStorage.removeItem('keywordList');
        keywordList.value = [];
    }
    const searchHistory = async (item) => {
        let res = await getSearchMusic(item);
        console.log(res)
        searchList.value = res.data.result.songs;
    }
    
    const updateIndex = (item) => {
        store.commit('pushplaylist', item);
        store.commit('updateListIndex', store.state.playlist.length -1);
    }
    return {
        keywordList,
        searchKey,
        enterKey,
        delhistory,
        searchHistory,
        searchList,
        updateIndex,
    }
  }
}
</script>

<style lang="less" scoped>
.searchTop {
    width: 100%;
    height: 1rem;
    padding: 0.2rem;
    display: flex;
    align-items: center;
    input {
        margin-left: 0.3rem;
        border: none;
        border-bottom: 0.02rem solid #999;
        width: 90%;
        height: 0.6rem;
        padding: 0.1rem;
    }
}
.searchHistory {
    width: 100%;
    padding: 0.2rem;
    position: relative;
    .history {
        font-size: 0.32rem;
        font-weight: 800;
    }
    .spankey {
        background-color: #a39898;
        padding: 0.1rem 0.2rem;
        margin: 0.1rem 0.2rem;
        border-radius: 0.4rem;
        display: inline-block;
    }
    .icon {
        width: 0.7rem;
        height: 0.7rem;
        position: absolute;
        right: 0.2rem;
        top: 0.06rem;
    }
}
.itemList {
        margin-top: 0.2rem;
        padding: 0 0.1rem;
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
</style>