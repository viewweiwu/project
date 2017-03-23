<template>
    <div class="container trip-map">
        <page-header title="导航路线" leftArrow="true" @leftClick="$router.go(-1)"></page-header>
        <main class="main">
            <div class="ctrl" @click="onRefreshBtnClick">
                <p>刷新</p>
                <p>导航</p>
            </div>
            <div class="ctrl" @click="onFollowBtnClick" v-if="false">
                <p>{{follow | toText}}</p>
                <p>跟随</p>
            </div>
            <div class="map" id="main">
            
            </div>
        </main>
        <footer class="footer">
            <button class="btn" @click="onDoneBtnClick">完成订单</button>
        </footer>
    </div>
</template>
<script>
    import pageHeader from "../../components/pageHeader.vue";
    import { ajaxGet } from "../../util.js";
    import { MessageBox, Toast } from 'mint-ui';
    export default {
        components: {
            pageHeader
        },
        data() {
            return {
                follow: true,
                startLng: "",
                startLat: "",
                endLng: "",
                endLat: "",
                sn: ""
            }
        },
        mounted() {
            this.startLng = this.$route.query.startLng;
            this.startLat = this.$route.query.startLat;
            this.endLng = this.$route.query.endLng;
            this.endLat = this.$route.query.endLat;
            this.sn = this.$route.query.sn;
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
                driving.search(new AMap.LngLat(this.startLng, this.startLat), new AMap.LngLat(this.endLng, this.endLat));
                // 禁止跳转高德地图
                main.addEventListener("click", (e) => {
                    if(e.target.parentNode.tagName == "A") {
                        e.preventDefault();
                        e.stopPropagation();
                    }
                });
                this.map = map;
                // 不需要跟随
                //this.loadCurrPosition();
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
            },
            onDoneBtnClick() {
                MessageBox.confirm('确定已经完成订单?').then(action => {
                    ajaxGet("driver/order/complete/" + this.sn).then(data => {
                        if(data.status === 'SUCCESS') {
                            Toast("完成订单");
                            this.$router.go(-1);
                        } else {
                            Toast(data.msg);
                        }
                    });
                }, () => {});
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