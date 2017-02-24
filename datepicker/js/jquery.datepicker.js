;
(($) => {
    const DEFAULTS = {

    }
    class Picker {
        constructor() {
            this.date = new Date();
            this.$input = $("input");
            this.create();
            this.bind();
        }
        bind() {
            this.$header.on("click", ">div", (e) => {
                let $target = $(e.target);
                if ($target.is(".left")) {
                    this.onLeftBtnClick();
                } else if ($target.is(".right")) {
                    this.onRightBtnClick();
                }
            });
        }
        onLeftBtnClick() {
            this.date.setMonth(this.date.getMonth() - 1);
            let $html = $(this.createDay(this.date));
            let count = $(".picker-day").length;
            this.$title.html(this.getTitle(this.date));

            $html.css({
                "left": -300,
                "bottom": 0,
                "position": "absolute"
            }).animate({
                "left": 0
            }, 500, function() {
                $(this).siblings().remove();
            });

            this.$content.append($html);
        }
        onRightBtnClick() {
            this.date.setMonth(this.date.getMonth() + 1);
            let $html = $(this.createDay(this.date));
            let count = $(".picker-day").length;
            this.$title.html(this.getTitle(this.date));

            $html.css({
                "left": 300,
                "bottom": 0,
                "position": "absolute"
            }).animate({
                "left": 0
            }, 500, function() {
                $(this).siblings().remove();
            });

            this.$content.append($html);
        }
        create() {
            let $html = $(
                `<div class="picker">
					<div class="picker-header">
						<div class="left">&lt;</div>
						<div class="center">${this.getTitle(this.date)}</div>
						<div class="right">&gt;</div>
					</div>
					<div class="picker-body">
						<ul class="picker-week">
							<li>日</li>
							<li>一</li>
							<li>二</li>
							<li>三</li>
							<li>四</li>
							<li>五</li>
							<li>六</li>
						</ul>
						<div class="picker-content">
							${this.createDay(this.date)}
						</div>
					</div>
				</div>`
            );

            this.$el = $html;
            this.$header = $html.find(".picker-header");
            this.$body = $html.find(".picker-body");
            this.$title = this.$header.find(".center")
            this.$content = this.$body.find(".picker-content");

            this.$input.after($html);
        }
        createDay(date) {
            let currMonth = date.getMonth() + 1;
            let prevMonth = currMonth != 1 ? currMonth - 1 : 12;
            let nextMonth = currMonth != 12 ? currMonth + 1 : 1;
            let currYear = date.getFullYear();
            let prevYear = currYear - 1;
            let nextYear = currYear + 1;
            let currWeek = date.getDay();

            let currMonthDayCount = this.getDayCount(currYear, currMonth);
            let prevMonthDayCount = this.getDayCount(prevMonth != 12 ? currYear : prevYear, prevMonth);

            let html = `<ul class="picker-day" data-date="${this.getTitle(date)}">`;

            for (let i = prevMonthDayCount - currWeek + 3; i <= prevMonthDayCount; i++) {
                html += `<li class="gray-font">${i}</li>`;
            }
            for (let i = 1; i <= currMonthDayCount; i++) {
                html += `<li>${i}</li>`;
            }
            for (let i = 1; i <= 43 - currMonthDayCount - currWeek; i++) {
                html += `<li class="gray-font">${i}</li>`;
            }

            html += '</ul>';

            return html;
        }
        getTitle(date) {
            let month = date.getMonth() + 1;
            month = month < 10 ? "0" + month : month;
            return date.getFullYear() + "年" + month + "月";
        }
        getDayCount(year, month) {
            let bigMonth = [1, 3, 5, 7, 8, 10, 12];
            let smallMonth = [4, 6, 9, 11];

            if ($.inArray(month, bigMonth) > -1) {
                return 31;
            } else if ($.inArray(month, bigMonth) > -1) {
                return 30;
            } else if ((year % 4 == 0 && year % 100 != 0) || year % 400 == 0) {
                return 29;
            } else {
                return 28;
            }
        }
    }




    new Picker();
})(jQuery);