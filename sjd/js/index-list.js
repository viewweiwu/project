$(function() {
	var ctrl = {
		init: function() {
			this.$right = $(".type-select ul"); // 右边的字母
			this.$type = $(".type-pnl"); // 主体的每一个字母的容器
			this.$title = this.$type.find(".title"); // 主体的所有字母
			this.$show = $(".type-show"); // 中间的小黑块
			this.$content = $(".type-content"); // 主体
			this.isMove = false; // 是否按下了？
			this.bind();
		},
		bind: function() {
			this.$right.on("mousedown", "li", this.onStart.bind(this));
			this.$right.on("mousemove", "li", this.onMove.bind(this));
			$(document).on("mouseup", this.onEnd.bind(this));
			this.$right.on("touchstart", "li", this.onStart.bind(this));
			this.$right.on("touchend", this.onEnd.bind(this));
			this.$right.on("touchcancel", this.onEnd.bind(this));
			// 移动端的 touch 事件的 target 始终是 touchstart 的 targe，所以不能掉用 pc 的 onMove 事件
			this.$right.on("touchmove", "li", this.onTouchMove.bind(this));
		},
		onStart: function(e) {
			var $target = $(e.target);
			this.isMove = true;
			// 变胖，让手指可以脱离右边，再屏幕中央仍可以滑动
			this.$right.parent().width('100%');

			// 显示中间的小圈
			this.showType($target.text());
			// 移动到对应字母的坐标
			this.scrollToTitle($target);
		},
		onMove: function(e) {
			if(!this.isMove) return;
			var $target = $(e.target);
			
			// 显示中间的小圈
			this.showType($target.text());
			// 移动到对应字母的坐标
			this.scrollToTitle($target);
		},
		onTouchMove: function(e) {
			e.stopPropagation();
			e.preventDefault();
			// 具体字母的 index = (当前手指的 Y - 头部的高度) / 单个字母的高度
			var pageY = e.originalEvent.touches[0].pageY;
			var headerHeight = $(".header").height();
			var singleHeight = $(e.target).parent().height();
			var index = Math.ceil((pageY - headerHeight) / singleHeight);
			var $target;
			
			// 计算出目标字母的 index
			index = index < 0 ? 0 : (index > 25 ? 25 : index);
			// 取到目标字母
			$target = this.$right.find("li").eq(index);

			// 显示中间的小圈
			this.showType($target.text());
			// 移动到对应字母的坐标
			this.scrollToTitle($target);
		},
		onEnd: function(e) {
			this.isMove = false;
			this.hideType();
			// 结束了就变瘦
			this.$right.parent().width('auto');
		},
		// 显示中间小黑块
		showType: function(text) {
			this.$show.show().html(text);
		},
		// 隐藏中间小黑块
		hideType: function() {
			this.$show.hide();
		},
		// 移动到对应主题对应字母的头部
		scrollToTitle: function($target) {
			var $targetTitle;
			
			// 从 主体 里面找出 跟 右边 对应的字母
			this.$title.each(function() {
				if($(this).html() == $target.text()) {
					$targetTitle = $(this);
					return false;
				}
			});

			// 找到了！
			if($targetTitle) {
				// 取到主体字母距离顶部的高度
				var top = $targetTitle[0].offsetTop;
				// just set
				this.$content[0].scrollTop = top;
			}
		}
	}
	
	ctrl.init();
})