import service from "..";

//获取首页轮播图的数据
export function getBanner() {
    return service({
        method:'get',
        url: '/banner?type=2',
    })
}
//获取推荐歌单的数据
export function getMusicList() {
    return service({
        method: 'get',
        url: '/personalized?limit=10',
    })
}
//获取搜索列表
export function getSearchMusic(data) {
    return service({
        method: 'get',
        url: `/cloudsearch?keywords=${data}`,
    })
}
//登录
export function getLogin(data) {
    return service({
        method: 'get',
        url: `/login/cellphone?phone=${data.username}&password=${data.password}`,
    })
}