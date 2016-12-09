/**
 * 日历插件
 */

var pipe = require("sys.pipe");

var dt = new Date();

exports.today = {
    year: dt.getFullYear(),
    month: dt.getMonth() + 1,
    date: dt.getDate()
};

exports.selected = {}; //选中
//	box: document.body,
exports.year = exports.today.year;
exports.month = exports.today.month;
exports.date = exports.today.date;

exports.maxDate = 0;
exports.minDate = 0;

exports.Lang = {
    pt:{
        monday:"Segunda",
        tuesday:"Terça",
        wednesday:"Quarta",
        thursday:"Quinta",
        friday:"Sexta",
        saturday:"Sábado",
        sunday:"Domingo",
        year:"Ano",
        month:"Mês"
    },
    cn:{
        monday:"周一",
        tuesday:"周二",
        wednesday:"周三",
        thursday:"周四",
        friday:"周五",
        saturday:"周六",
        sunday:"周日",
        year:" 年",
        month:"月"
    }
};

exports.currentLang = exports.app.langType?exports.Lang[exports.app.langType] : exports.Lang.cn;
//选中
exports.select = function(element, onDateChange){
    exports.input = element;
    exports.onDateChange = onDateChange;
    exports.show();
    exports.draw();
};

//设置年份
exports.setYear = function(){
    exports.year = +exports.element.value;
    exports.date = 0;
    exports.draw();
};

//设置月份
exports.setMonth = function () {
    exports.month = +exports.element.value;
    exports.date = 0;
    exports.draw();
};

//设置日期
exports.setDate = function () {
    exports.selected.year = exports.year;
    exports.selected.month = exports.month;
    exports.selected.date = +exports.element.innerHTML;
    exports.draw();
    if(exports.input){
        var dateStr = `${exports.selected.year}/${exports.selected.month}/${exports.selected.date}`;
        dateStr = pipe.date_format(dateStr, "yyyy-MM-dd");
        exports.input.val(dateStr);
        exports.onDateChange && exports.onDateChange(exports.input.attr("dateType"),dateStr);
        exports.hide();
    }
};

//跳到上一个月
exports.goPrevMonth = function(){
    var month = exports.month - 1;
    if(month<1){
        exports.year -= 1;
        month = 12;
    }
    exports.month = month;
    exports.draw();
};

//跳到下一个月
exports.goNextMonth = function(){
    var month = exports.month + 1;
    if(month>12){
        exports.year += 1;
        month = 1;
    }
    exports.month = month;
    exports.draw();
};

//设置日期
exports.setDayAndDays = function () {
    exports.day = new Date(exports.year, exports.month - 1, 1).getDay();
    exports.days = new Date(exports.year, exports.month, 0).getDate();
};
exports.setDayAndDays();

//绘制
exports.draw = function () {
    exports.setDayAndDays();
    exports.canSetDate();
    exports.render();
    exports.show();
    exports.ui.style.top = exports.input.position().top+exports.ui.offsetHeight+exports.input.height()+30+"px";
    exports.ui.style.left = exports.input.position().left+exports.ui.offsetWidth+exports.input.width()-110+"px";
    exports.ui.style.position = "absolute";
};

exports.canSetDate = function(){
    var maxDate = exports.input[0].max;
    var minDate = exports.input[0].min;
    if(maxDate&&maxDate!=""){
        exports.minDate = 0;
        exports.maxDate = pipe.parseDate(maxDate).getTime();
    }
    if(minDate&&minDate!=""){
        exports.maxDate = 0;
        exports.minDate = pipe.parseDate(minDate).getTime();
    }
    if(maxDate==undefined&&minDate==undefined){
        exports.maxDate = 0;
        exports.minDate = 0;
    }
    if(maxDate==undefined)exports.maxDate = 0;
    if(minDate==undefined)exports.minDate = 0;
};