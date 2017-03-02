;(($, window) => {
	const DEFAULTS = {
		"space": 5, // 间隙
		"size": 30, // 图标大小 以及 文字行高
		"width": 200, //  宽度
		"background": "#fff", // 背景色
		"border": "1px solid #333", // 边框色
		"color": "#333", // 文字颜色
		"time": 500000, // 存在事件
		"speed": 500, // 动画时间
		"iconColor": "#6cf", // 图标颜色
		"iconBg": "rgb(231, 244, 251)", // 图标背景色
		"icon": "info", // 图标样式 info success trophy
		"text": "" // 你那可爱的文本
	}
	class Msg{
		constructor(opts) {
			this.opts = $.extend(true, DEFAULTS, opts);
			this.$box = this.getMsgBox();
			this.creatEl();
			this.bind();
		}
		// 显示
		show() {
			this.$box.append(this.$el);
			this.$el.slideDown(this.opts.speed);
			// 一段时间后消失
			setTimeout(() => this.close(), this.opts.time);
		}
		// 关闭
		close() {
			this.$el.slideUp(this.opts.speed, ()=> this.$el.remove())
		}
		// 绑定事件
		bind() {
			this.$closeBtn.on("click", () => this.close())
		}
		// 拿到所有消息的主容器
		getMsgBox() {
			let msgBox = $("#msgBox");
			// 如果页面没有就创建一个, 第一次加载的时候会执行
			if(msgBox.length == 0) {
				$("body").append(`<div class="msg-box" id="msgBox" style="right: ${this.opts.space}px;bottom: ${this.opts.space}px"></div>'`);
				return this.getMsgBox();
			}
			return msgBox;
		}
		// 创建元素
		creatEl() {
			let $html = $(
				`<div class="msg-panel">
					<div class="content">
						<div class="msg-icon"></div>
						<div class="msg-text">${this.opts.text}</div>
					</div>
					<button class="btn-close"></button>
				</div>`
			);
			this.$el = $html;
			this.$content = this.$el.find(".content");
			this.$icon = this.$el.find(".msg-icon");
			this.$text = this.$el.find(".msg-text");
			this.$closeBtn = this.$el.find(".btn-close");
			this.renderEl();
		}
		// 渲染 元素 样式
		renderEl() {
			// 文本直接就在 default 里面渲染了
			// 渲染默认消息款
			this.renderDefault();
			// 渲染 icon
			this.renderIcon();
		}
		// 渲染默认消息框
		renderDefault() {
			let [size, space, opts] = [this.opts.size, this.opts.space, this.opts];
			// 主容器样式
			this.$el.css({
				"width": opts.width,
				"border": opts.border,
				"margin-top": opts.space,
				"color": opts.color,
				"background": opts.background
			});
			// 内容样式
			this.$content.css({
				"padding": opts.space * 2
			});
			// 图标样式
			this.$icon.css({
				"width": size,
				"height": size,
				"color": opts.iconColor,
				"background": opts.iconBg
			});
			// 文本样式
			this.$text.css({
				"min-height": size,
				"line-height": size + "px",
				"margin-left": this.$icon.width() + space * 2
			});
		}
		// 渲染 icon 样式
		renderIcon() {
			let [size, space, opts] = [this.opts.size, this.opts.space * 2 / 3, this.opts];
			
			// 设置背景色
			this.$icon.css("border-color", opts.iconColor);
			// css icon 零件
			let $part1 = $("<div></div>").css("background", opts.iconColor);
			let $part2 = $("<div></div>").css("background", opts.iconColor);
			
			// 添加class
			if(this.opts.icon == "info") {
				this.$icon.addClass("info");
			} else if (this.opts.icon == "success") {
				this.$icon.addClass("success");
			} else if (this.opts.icon == "trophy") {
				$part1.css("border-color", opts.iconColor).css("background", opts.iconBg);
				this.$icon.addClass("trophy");
			}
			
			this.$icon.append($part1, $part2);
		}
	}
	$.Msg = Msg;
	// ru guo ni kan dong le zhe tiao zhu shi, ni hui fa xian hao wu yi yi.
})(jQuery, window);
