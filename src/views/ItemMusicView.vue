<template>
    <ItemMusicTop :playlist="state.playlist"/>
    <ItemMusicList :itemlist="state.itemlist" :subscribedCount="state.playlist.subscribedCount"/>
</template>

<script>
import { useRoute } from 'vue-router';
import { onMounted, reactive } from 'vue';
import { getMusicItemList, getItemList } from "@/request/api/item.js";
import ItemMusicTop from '@/components/item/ItemMusicTop.vue';
import ItemMusicList from '@/components/item/ItemMusicList.vue';

export default {
  name: 'ItemMusic',
  components: {
    ItemMusicTop,
    ItemMusicList,
  },
  setup() {
    const state = reactive({
        playlist: {},
        itemlist: [],
    });

    onMounted(async () => {
        let id = useRoute().query.id;
        let res = await getMusicItemList(id);
        let result = await getItemList(id);
        state.playlist = res.data.playlist;
        state.itemlist = result.data.songs;
    });
    return {
        state,
    }
  }
}
</script>