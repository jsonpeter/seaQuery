define(function(require, exports, module) {
//1.require——模块加载函数，用于记载依赖模块。
//2.exports——接口点，将数据或方法定义在其上则将其暴露给外部调用。
//3.module——模块的元数据。
//    module.exports = {
//        a: 'a',
//        fn: function() {}
//    };
    // exports对外提供  属性
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
