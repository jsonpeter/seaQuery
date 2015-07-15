define(function(require, exports, module) {
    var $ = require('seaQuery');
    $(function () {

        alert($("#container").html());
        $("#test,.test").html("js wirteout");
        $("#container b").html("hellooooooooooo!");

       var obj=$("#container").html("111111");
        obj.hide();
        //$(".same").click(function(){
        //      alert($(this).html());
        //})
        $(".same").bind("click",function(){
                  alert($(this).html());
             })
        $("input").bind("click",function(e){
            alert($(this).find("p").html());
            $(e).stopEventBubble();
        })
        $("#container").html("<input type='button' value='insert btn'>");
        $("input").bind("click",function(e){
            alert($("#container").val());
            $(e).stopEventBubble();
        })
        $(window).bind("click",function(){
            alert("window");
        })
    })
})