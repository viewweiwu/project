;(($, window) => {
	class Dialog {
		constructor(textList) {
			this.textList= textList;
			this.index = 0;
			this.next();
		}
		next() {
			if(this.index >= this.textList.length) {
				this.clear();
				return;
			}
			this.clear();
			this.create();
			this.render();
			this.index++;
		}
		clear() {
			$(".dialog").remove();
		}
		render() {
			$("body").append(this.$el);
			this.$text.show();
		}
		create() {
			let $el = $(
				`<div class="dialog">
					<div class="content">
						<div class="text normal">
							${this.textList[this.index]}
						</div>
					</div>
				</div>`
			)
			this.$el = $el;
			this.$content = this.$el.find(">.content");
			this.$text = this.$content.find(">.text").hide();
		}
	}
	window.Dialog = Dialog;
})(jQuery, window);
