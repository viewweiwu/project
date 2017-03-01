(function($) {
	function Picker() {
		this.init();
	}
	
	Picker.prototype = {
		init: function() {
			this.data = [
				{
					isMove: false,
					y: 0
				}
			];
			this.$pickers = $(".panel > ul");
			this.isMove = false;
			this.bind()
		},
		bind: function() {
			this.$pickers.on({
				"mousedown": this.onMouseDown.bind(this),
				"touchstart": this.onMouseDown.bind(this)
			});
			
			$(document).on({
				"mousemove": this.onMouseMove.bind(this),
				"touchmove": this.onMouseMove.bind(this),
				"mouseup": this.onMouseUp.bind(this),
				"touchup": this.onMouseUp.bind(this)
			});
			
		},
		onMouseDown(e) {
			var $target = $(e.target).parent();
			var d = this.data[$target.index()];
			d.isMove = true;
			d.y= e.pageY;
		},
		onMouseMove(e) {
			var self = this;
			$.each(this.data || [], function(i, iObj) {
				if(iObj.isMove) {
					var diff = iObj.y - e.pageY;
					var $target = self.$pickers.eq(i);
					$target.css({
						"margin-top": parseInt($target.css('margin-top')) + diff * -1
					});
					iObj.y = e.pageY;
					console.log(diff);
				}
			});
		},
		onMouseUp(e) {
			$.each(this.data || [], function(i, iObj) {
				iObj.isMove = false;
				iObj.y = e.pageY;
			});
		}
	}
//	
	var obj = new Set([1, 2, 3]);
	for(item of obj){
		console.log(item);
	}
	
	
	new Picker();
	
	

})(jQuery)
