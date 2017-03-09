<template>
    <div class="container trip-map">
        <page-header title="导航路线" leftArrow="true" @leftClick="$router.go(-1)"></page-header>
        <main class="main">
            <div class="ctrl refresh" @click="onRefreshBtnClick">
                <p>刷新</p>
                <p>导航</p>
            </div>
            <div class="ctrl" @click="onFollowBtnClick">
                <p>{{follow | toText}}</p>
                <p>跟随</p>
            </div>
            <div class="map" id="main">
            
            </div>
        </main>
        <footer class="footer">
            <button class="btn" @click="">完成导航</button>
        </footer>
    </div>
</template>
<script>
    import pageHeader from "../../components/page-header.vue";
    export default {
        components: {
            pageHeader
        },
        data() {
            return {
                follow: true
            }
        },
        mounted() {
            this.loadMap();
        },
        methods: {
            onRefreshBtnClick() {
                this.loadMap();
            },
            onFollowBtnClick() {
                this.follow = !this.follow;
            },
            loadMap() {
                let map = new AMap.Map("main", {
                    resizeEnable: true,
                    zoom: 15 //地图显示的缩放级别
                }); 
                let driving = new AMap.Driving({
                    map: map
                }); 
                // 根据起终点经纬度规划驾车导航路线
                driving.search(new AMap.LngLat(120.318818,30.287778), new AMap.LngLat(120.325633,30.309347));
                // 禁止跳转高德地图
                main.addEventListener("click", (e) => {
                    if(e.target.parentNode.tagName == "A") {
                        e.preventDefault();
                        e.stopPropagation();
                    }
                });
                this.map = map;
                this.loadCurrPosition();
            },
            loadCurrPosition() {
                let map = this.map;
                map.plugin('AMap.Geolocation', () => {
                    let geolocation = new AMap.Geolocation({
                        timeout: 10000,          //超过10秒后停止定位，默认：无穷大
                        zoomToAccuracy: false,      //定位成功后调整地图视野范围使定位位置及精度范围视野内可见，默认：false
                    });
                    map.addControl(geolocation);
                    geolocation.getCurrentPosition();
                    setInterval(() => {
                        if(this.follow) {
                            geolocation.getCurrentPosition();
                        }
                    }, 5000);
                });
            }
        },
        filters: {
            toText(value) {
                if(value) {
                    return "关闭"
                } else {
                    return "开启"
                }
            }
        }
    }
</script>