function remSize() {
    var deviceWidth = document.documentElement.clientWidth || window.innerWidth;
    if (deviceWidth >= 750) {
        deviceWidth = 750
    }
    if (deviceWidth <= 320) {
        deviceWidth = 320
    }
    // 750->1rem = 100px 375px -> 1rem = 50px
    document.documentElement.style.fontSize = (deviceWidth / 7.5) + 'px';
    document.querySelector('body').style.fontSize = 0.3 + 'rem';
}
remSize();
window.onresize = function() {
    remSize();
}