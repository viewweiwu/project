<template>
    <div class="container car-select">
        <page-header title="车型选择" leftArrow="true" @leftClick="$router.go(-1)"></page-header>
        <main class="main">
            <aside :class="['type-select',{full: isMove}]" ref="right" >
                <ul>
                    <li v-for="item in alphabet" :key="item" @touchstart="onStart" @touchmove="onMove" @touchend="onEnd"><span>{{item}}</span></li>
                </ul>
            </aside>
            <div class="type-show" v-show="isShow">{{showText}}</div>
            <div class="type-content"  ref="content">
                <div class="type-pnl" v-for="t in typeList">
                    <div class="title">{{t.title}}</div>
                    <ul class="cell-list">
                        <li v-for="item in t.list" @click.stop="onContentClick(item)" :key="item.id">{{item.text}}</li>
                    </ul>
                </div>
            </div>
            <div class="right-page parent" ref="parent">
                <div class="content">
                    <ul class="cell-list" id="list">
                        <li v-for="item in parentList" @click.stop="onParentClick(item)" :key="item.id">{{item.text}}</li>
                    </ul>
                </div>
                <div class="right-page child" ref="child">
                    <div class="content">
                        <ul class="cell-list">
                            <li v-for="item in colors" @click.stop="opChildClick" :key="item.style">{{item.text}}<span :class="item.style"></span></li>
                        </ul>
                    </div>
                </div>
            </div>
        </main>
    </div>
</template>

<script>
    import $ from 'jquery';
    import pageHeader from "../../components/pageHeader.vue";
    import { ajaxGet } from "../../util.js";

    export default {
        components: {
            pageHeader
        },
        data() {
            return {
                typeList: [],
                parentList: [],
                alphabet: ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'N', 'M', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'],
                colors: [{
                    text: "黑色",
                    style: "black"
                },{
                    text: "银色",
                    style: "silvery"
                },{
                    text: "白色",
                    style: "white"
                },{
                    text: "红色",
                    style: "red"
                },{
                    text: "金色",
                    style: "gold"
                },{
                    text: "蓝色",
                    style: "blue"
                },{
                    text: "棕色",
                    style: "brown"
                },{
                    text: "紫色",
                    style: "purple"
                },{
                    text: "绿色",
                    style: "green"
                },{
                    text: "粉色",
                    style: "pink"
                },{
                    text: "黄色",
                    style: "yellow"
                }],
                isMove: false,
                showText: "A",
                selectText: {
                    content: "",
                    contentId: "",
                    parent: "",
                    parentId: "",
                    child: ""
                },
                isShow: false
            }
        },
        mounted() {
            this.parentList = [{
                text: "类型1"
            },{
                text: "类型2"
            }];
            this.getData();
        },
        methods: {
            getData() {
                ajaxGet("common/seriesTree").then(data => {
                    this.typeList = data.map(obj => {
                        obj.title = obj.initials;
                        return obj;
                    });
                });
            },
            onAddTypeBtnClick() {
                this.$router.push({
                    name: 'car/addType'
                });
            },
            onStart(e) {
                let $target = $(e.target);
                // 开始移动
                this.isMove = true;
                // 显示中间的小圈
                this.isShow = true;
                // 改变文字
                this.showText = $target.text();
                // 移动到对应字母的坐标
                this.scrollToTitle($target);
            },
            onContentClick(item) {
                let $target = $(event.target);
                this.parentList = item.children;
                this.selectText.contentId = item.id;
                this.selectText.content = item.text;
                this.open($target, $(this.$refs.parent), $(this.$refs.child));
            },
            onParentClick(item) {
                let $target = $(event.target);
                this.selectText.parentId = item.id;
                this.selectText.parent = item.text;
                this.open($target, $(this.$refs.child));
            },
            opChildClick(e) {
                let $target = $(e.target);
                if($target.is("span")) {
                    $target = $target.parent();
                }
                this.selectText.child = $target.text();
                this.open($target);
                this.save();
            },
            onMove(e) {
                e.stopPropagation();
                e.preventDefault();
                // 具体字母的 index = (当前手指的 Y - 头部的高度) / 单个字母的高度
                let pageY = e.touches[0].pageY;
                let headerHeight = $(".header").height();
                let singleHeight = $(e.target).height();
                let index = Math.ceil((pageY - headerHeight) / singleHeight);
                let $target;

                // 计算出目标字母的 index
                index = index < 0 ? 0 : (index > 25 ? 25 : index);
                // 取到目标字母
                $target = $(this.$refs.right).find("li").eq(index);

                // 显示中间的小圈
                this.isShow = true;
                // 改变文字
                this.showText = $target.text();
                // 移动到对应字母的坐标
                this.scrollToTitle($target);
            },
            onEnd(e) {
                this.isMove = false;
                this.isShow = false;
            },
            open($target, $next, $child) {
                if ($target) { // 取消其他的 active
                    if ($target.parents(".type-content").length) { // content 的 li 结构不一样，所以先去掉所有 active 样式，再添加
                        $target.parents(".type-content").find(".active").removeClass("active");
                        $target.addClass("active");
                    } else {
                        $target.addClass("active").siblings(".active").removeClass("active");
                    }
                }
                if ($next) {
                    $next.css({
                        "transform": "translateX(0)"
                    });
                }
                if ($child) {
                    $child.css({
                        "transform": "translateX(110%)"
                    });
                }
            },
            save() {
                sessionStorage.setItem("selectTypeData", JSON.stringify(this.selectText));
                this.$router.go(-1);
            },
            // 移动到对应主题对应字母的头部
            scrollToTitle($target) {
                let text = $target.text();
                let singleHeight = $(".content li").outerHeight();
                let top = 0;

                // 从 主体 里面找出跟 右边 对应的字母
                for(let i = 0; i < this.typeList.length; i++) {
                    let obj = this.typeList[i];
                    if(obj.title == text) {
                        break;
                    } else {
                        top += obj.list.length + 1;
                    }
                }

                // 找到了！
                this.$refs.content.scrollTop = top * singleHeight;
            }
        }
    }
</script>