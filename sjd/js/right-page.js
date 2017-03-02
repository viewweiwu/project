$(function() {
	/**
	 * 实现思路
	 * ##选择
	 *  1. 将页面分为 3 层面板，分别是 底层(content)，第 1 层(parent)，第 2 层(child)
	 *  2. 当前层面板做选择时打开下一层面板
	 *  3. 当前层面板做选择时添加 active 样式（橙色字体）
	 *  4. 最后一层只能选择，不需要打开下一层面板
	 *  5. 封装一个方法 open($target, $next, $child)
	 *  6. 如果第一个参数存在，则加上 active 样式，并将当前层的其他 active 样式取消，$target 是一个 li
	 *  7. 如果第二个参数存在，则将对应层显示出来，比如底层要打开第一层 this.open($target, this.$parent);
	 *  7. 如果第三个参数存在，则将对应层关闭，其实只可能是最后一层(child);
	 *  8. 前层面板做选择时调用 open 方法，第 1 层(parent)则不需要传递二个参数，最后一层(child)则不需要传第二个和第三个参数
	 *  9. 底层面板做选择时，关闭最后一层面板
	 * 
	 * ##滑动
	 *  1. 滑动分为两种，一种是快划(关闭)，另一种是普通滑动
	 *  2. 通过 touchstart 产生的时间和 touchend 产生的时间一减，如果时间间隔 < 100ms 则认为是快划
	 *  3. 只有移动了一定的距离，才被认为是滑动，而不是点击！(～￣▽￣)～ ，我是判断移动 20px，差不多一个颜色块的大小
	 *  4. 当产生快划时关闭第 1 层(parent)，第 2 层(child)面板
	 *  5. 普通滑动则是监听 touchmove 事件
	 *  6. 如果 X 轴移动像素超过 30 像素，则被认定为左右滑动，而不是上下滚动，这么做是上下滚动的时候尽量少受 滑动的影响。<(￣ˇ￣)/
	 *  7. 在 touchstart 的时候取一个当前的屏幕 X，然后在 touchmove 的时候取一下屏幕的 X，两个 X 一减，则得到了移动的距离
	 *  8. 把这个距离设到 style 的 right 值就会跟着手指动了，这里的 right 要取负值，因为打开是 translateX做的动画
	 *  9. 如果普通滑动超过 50% 宽度的距离，则关闭第 1 层(parent)，第 2 层(child)面板，反之则恢复到打开状态
	 *  10. 快划和普通滑动都会产生关闭，所以封装一个 close() 方法
	 *  11. 因为要关闭两层面板，所以第 2 层(child)是第 1 层(parent)的子元素
	 * */
    var ctrl = {
        init: function() {
            this.$content = $(".type-content");
            this.$parent = $(".right-page.parent");
            this.$child = $(".right-page.child");
            this.isMove = false;
            this.bind();
        },
        bind: function() {
            this.$content.on("click", ".cell-list", this.onContentClick.bind(this));
            this.$parent.on("click", ".cell-list", this.onParentClick.bind(this));
            this.$child.on("click", ".cell-list", this.onChildClick.bind(this));
            this.$parent.on("touchstart", this.onStart.bind(this));
            this.$parent.on("touchmove", this.onMove.bind(this));
            this.$parent.on("touchend", this.onEnd.bind(this));
        },
        onContentClick: function(e) {
            var $target = $(e.target);
            this.open($target, this.$parent, this.$child);
        },
        onParentClick: function(e) {
            var $target = $(e.target);
            this.open($target, this.$child);
        },
        onChildClick: function(e) {
            var $target = $(e.target);
            this.open($target);
        },
        onStart: function(e) {
            e.stopPropagation();
            this.isMove = true;
            // 取屏幕的 X
            this.x = e.originalEvent.touches[0].pageX;
            // 记录时间，用来判断是否为快划
            this.d = new Date();
        },
        onMove: function(e) {
            e.stopPropagation();
            // e.preventDefault();
            if (!this.isMove) return;
            
            var pageX = e.originalEvent.touches[0].pageX; // 取屏幕的 X
            var diff = pageX - this.x; // 计算移动距离
            var r = diff * -1; // 因为要向 右移动，所以是负值
            if (diff > 30) { // 移动距离 > 30 才认为是左右滑动，这么做是为了不要影响 上下滚动
                if (r > 0) { // 如果移动到了原点，就不在向左移动
                    r = 0;
                }
                // 移动
                this.$parent.css({
                    "right": r
                });
            }
        },
        onEnd: function(e) {
            if (!this.isMove) return;
            this.isMove = false;
            var timeDiff = new Date() - this.d; // 计算时间差，如果时间差小于一定数值，则认定为快划
            var r = parseInt(this.$parent.css("right")) * -1; // 取当前面板向右移了多少像素
            var w = this.$parent.width(); // 取宽度，用来判断是否移动超过了一半
            if (timeDiff < 100 && r > 20) { // 如果时间差小于 100，且移动距离有 20 像素，则认定为快划，关闭右侧
                this.close(); // 关闭
            } else {
                if (r < w / 2) { // 判断移动距离是否小于一半，如果是则恢复
                    this.$parent.css("transform", "translateX(0)");
                    this.$parent.animate({ "right": 0 }, 250);
                } else { // 关闭
                    this.close();
                }
            }
        },
        open: function($target, $next, $child) {
            if ($target) { // 取消其他的 active
                if ($target.parents(".type-content").length) { // content 的 li 结构不一样，所以先去掉所有 active 样式，再添加
                    this.$content.find(".active").removeClass("active");
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
        close: function() {
            this.$parent.css("transform", "translateX(100%)");
            setTimeout(function() {
                this.$parent.css("right", 0);
            }.bind(this), 500);
        }
    }
    ctrl.init();
})