define(function(require, exports, module) {
//1.require����ģ����غ��������ڼ�������ģ�顣
//2.exports�����ӿڵ㣬�����ݻ򷽷��������������䱩¶���ⲿ���á�
//3.module����ģ���Ԫ���ݡ�
//    module.exports = {
//        a: 'a',
//        fn: function() {}
//    };
    // exports�����ṩ  ����
    var $=require('jquery');
    function Spinning(container) {
        this.container = $(container);
    }
    module.exports = Spinning;
    Spinning.prototype.render= function() {
        this.container.html('<h1>Hello seaJs !!!</h1>');
    };
    module.exports.fn1=function(){

        console.log("Hello seaJs");

    }
});
