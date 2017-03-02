;
(($, window) => {
    const DEFAULTS = {
        "w": 200,
        "space": 5,
        "size": 30,
        "bg": "#fff",
        "border": "1px solid #333", // 边框色
        "color": "#333",
        "time": 5000000,
        "speed": 300,
        "icon": "info",
        "iconColor": "#6cf", // 图标颜色
        "iconBg": "rgb(231, 244, 251)", // 图标背景色
        "text": "我们都是神枪手，每一颗子弹消灭一个队友！"
    }

    class Msg {
        constructor(opts) {
            this.opts = $.extend(true, DEFAULTS, opts);
            this.getMsgBox();
            this.createEl();
            this.bind();
        }
        show() {
            this.$msgBox.append(this.$el);
            this.$el.slideDown(this.opts.speed);

            setTimeout(() => this.close(), this.opts.time);
        }
        close() {
            this.$el.slideUp(this.opts.speed, () => this.$el.remove());
        }
        bind() {
            this.$closeBtn.on("click", () => this.close());
        }
        getMsgBox() {
            let $msg = $("#msgBox");

            if (!$msg.length) {
                $('body').append(`<div class="msg-box" id="msgBox" style="right: ${this.opts.space}px;bottom:${this.opts.space}px"></div>`);
                return this.getMsgBox();
            }

            this.$msgBox = $msg;
        }
        createEl() {
            let $el = $(
                `<div class="msg-panel">
					<div class="msg-content">
						<div class="msg-icon"></div>
						<div class="msg-text">${this.opts.text}</div>
					</div>
					<button class="btn-close"></button>
				</div>
			`);

            this.$el = $el;
            this.$content = this.$el.find(".msg-content");
            this.$icon = this.$content.find(".msg-icon");
            this.$text = this.$content.find(".msg-text");
            this.$closeBtn = this.$el.find(".btn-close");

            this.renderEl();
        }
        renderEl() {
            this.renderDefault();
            this.renderIcon();
        }
        renderDefault() {
            let [space, size, opts] = [this.opts.space, this.opts.size, this.opts];
            this.$el.css({
                "width": opts.w,
                "margin-top": space,
                "border": opts.border
            });
            this.$content.css({
                "padding": space * 2,
                "color": opts.color,
                "background": opts.bg
            });
            this.$icon.css({
                "width": size,
                "height": size,
                "color": opts.iconColor,
                "background": opts.iconBg
            });
            this.$text.css({
                "line-height": size + "px",
                "margin-left": size + space * 2
            });
        }
        renderIcon() {
            let [size, space, opts] = [this.opts.size, this.opts.space * 2 / 3, this.opts];

            // 设置背景色
            this.$icon.css("border-color", opts.iconColor);
            // css icon 零件
            let $part1 = $("<div></div>").css("background", opts.iconColor);
            let $part2 = $("<div></div>").css("background", opts.iconColor);

            // 添加class
            if (this.opts.icon == "info") {
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
})(jQuery, window);