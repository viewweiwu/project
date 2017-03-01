$(function() {
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
            this.open($target, this.$parent);
            this.$child.css({
                "transform": "translateX(110%)"
            });
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
            this.x = e.originalEvent.touches[0].pageX;
            this.d = new Date();
        },
        onMove: function(e) {
            e.stopPropagation();
            // e.preventDefault();
            if (!this.isMove) return;
            var pageX = e.originalEvent.touches[0].pageX;
            var diff = pageX - this.x;
            var r = diff * -1;
            if (diff > 30) {
                if (r > 0) {
                    r = 0;
                }
                this.$parent.css({
                    "right": r
                });
            }
        },
        onEnd: function(e) {
            if (!this.isMove) return;
            this.isMove = false;
            var timeDiff = new Date() - this.d;
            var r = parseInt(this.$parent.css("right")) * -1;
            var w = this.$parent.width();
            if (timeDiff < 100 && r > 20) {
                this.close();
            } else {
                if (r < w / 2) {
                    this.$parent.css("transform", "translateX(0)");
                    this.$parent.animate({ "right": 0 }, 250);
                } else {
                    this.close();
                }
            }
        },
        open: function($target, $next) {
            if ($target) {
                if ($target.parents(".type-content").length) {
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