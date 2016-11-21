/**
 * 日历插件
 */

define(function (req, exp) {
	"use strict";
    var str = req('sys.string');
    var date = req("sys.date");
	
	var dt = new Date();
	exp.today = {
		year: dt.getFullYear(),
		month: dt.getMonth() + 1,
		date: dt.getDate()
	};


    exp.selected = {}; //选中
	//	box: document.body,
	exp.year = exp.today.year;
	exp.month = exp.today.month;
	exp.date = exp.today.date;

    exp.maxDate = 0;
    exp.minDate = 0;
    //选中
    exp.select = function($element, onDateChange){
        exp.input = $element;
        exp.onDateChange = onDateChange;
        exp.show();
        exp.draw();
    };
	
	//设置年份
	exp.setYear = function(){
		exp.year = +exp.element.value;
        exp.date = 0;
		exp.draw();
	};

    //设置月份
    exp.setMonth = function () {
        exp.month = +exp.element.value;
        exp.date = 0;
        exp.draw();
    };

    //设置日期
    exp.setDate = function () {
        exp.selected.year = exp.year;
        exp.selected.month = exp.month;
        exp.selected.date = +exp.element.innerHTML;
        exp.draw();
        if(exp.input){
            var dateStr = str.format("{year}/{month}/{date}", exp.selected);
            dateStr = date.format(dateStr, "yyyy-MM-dd");
            exp.input.val(dateStr);
            exp.onDateChange && exp.onDateChange(exp.input.attr("dateType"),dateStr);
			exp.hide();
        }
    };

    //跳到上一个月
    exp.goPrevMonth = function(){
        var month = exp.month - 1;
        if(month<1){
			exp.year -= 1;
            month = 12;
        }
        exp.month = month;
        exp.draw();
    };

    //跳到下一个月
    exp.goNextMonth = function(){
        var month = exp.month + 1;
        if(month>12){
            exp.year += 1;
            month = 1;
        }
        exp.month = month;
        exp.draw();
    };

	//设置日期
	exp.setDayAndDays = function () {
        exp.day = new Date(exp.year, exp.month - 1, 1).getDay();
        exp.days = new Date(exp.year, exp.month, 0).getDate();
	};
	exp.setDayAndDays();

	//绘制
	exp.draw = function () {
        exp.setDayAndDays();
        exp.canSetDate();
		exp.render();
        exp.ui.style.top = exp.input.position().top+exp.ui.offsetHeight+exp.input.height()+30+"px";
        exp.ui.style.left = exp.input.position().left+exp.ui.offsetWidth+exp.input.width()-110+"px";
        exp.ui.style.position = "absolute";
	};

    exp.canSetDate = function(){
        var maxDate = exp.input.attr("max");
        var minDate = exp.input.attr("min");
        if(maxDate&&maxDate!=""){
            exp.maxDate = date.parseDate(maxDate).getTime();
        }
        if(minDate&&minDate!=""){
            exp.minDate = date.parseDate(minDate).getTime();
        }
    };
});
