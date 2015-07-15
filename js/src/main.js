// 所有模块都通过 define 来定义
define(function(require, exports, module) {

    var Spinning = require('../test/index');
    var s = new Spinning('#container');
    s.render();
    Spinning.fn1();
});