/**
 * Created by jsonstank on 2015/7/6.
 */
define(function(require, exports, module) {

    var seaQuery=function(s){
        switch(typeof(s)){
            case "function":
                window.onload=s;
                break;
            case "string":
                this.doms=select.getStr(s,document);
                break;
            case "object":
                this.doms=s;
                break;
            case "undefined":
                this.doms=window;
                break;
            default:
                break;
        }
        return this;
    };
    //˽��ѡ��������
    var select={
        getStr:function(s,tag){
            var tmpArry=[];
            if(s.indexOf(',')>0){
                tmpArry=s.split(',');
            }else{
                tmpArry=[s];
            }
            for(var i=0;i<tmpArry.length;i++){
                if(tmpArry[i].indexOf(' ')>0){
                    tmpArry[i]=tmpArry[i].split(' ');
                }
            }
            return  this.getelem(tmpArry,tag)
        },
        getelem:function(elemArry,sechtag) {
            var tmpelem = [];
            for (var i = 0; i < elemArry.length; i++) {
                if (elemArry[i] instanceof Array) {
                    var tag= this.backDom(elemArry[i][0],sechtag);
                    //��ָ���ķ�Χ�ڲ���(#id .class)
                    tmpelem=this.backDom(elemArry[i][elemArry[i].length-1],tag[0]);
                }else{
                    tmpelem=this.backDom(elemArry[i],sechtag)
                }
            }
            return tmpelem;
        },
        backDom:function(arry,serchTag){
            var tpDom=[];
            if(serchTag instanceof Array){
                serchTag=serchTag[0];
            }
            switch(arry.charAt(0)){
                case "#":  //��ȡID
                    tpDom.push(serchTag.getElementById(arry.substr(1)));
                    break;
                case "."://��ȡClass
                    //��������֧��getElementsByClassName����ֱ�ӵ���
                    if (document.getElementsByClassName) {
                        tpDom.push(serchTag.getElementsByClassName(arry.substr(1)));
                    }
                    break;
                default: //��ȡDiv��ǩ��
                    if (document.getElementsByTagName) {
                        tpDom.push(serchTag.getElementsByTagName(arry));
                    }
                    break;
            }
            return tpDom;
        }
    };
    //��ȡClass���ȡDom
   var allfn=function() {
        this.domslt = function (elm, dothing) {
            var tmpArr = [];//��ʱ����
            for (i = 0; i < elm.length; i++) {
                //��ȡClass���ص��Ǹ�����
                if (elm[i] instanceof HTMLCollection) {
                    for (n = 0; n < elm[i].length; n++) {
                        tmpArr.push(elm[i][n]);
                    }
                    elm.splice(i, 1); //�Ƴ�����HtmlCollection[1]������
                }
            }
            tmpArr = tmpArr.concat(elm);
            for (f = 0; f < tmpArr.length; f++) {
                dothing(tmpArr[f]);
            }
            return this;
        },
         this.event ={
             add:function (t,e,n){
                 var fn=function(f){
                     EventUtil.addEventHandler(e,f,n);
                 }
                 af.domslt.call(this,t.doms,function(callback){
                     fn(callback);
                 });
             }
         }
    }
    //��������
    var af=new allfn();
    seaQuery.fn=seaQuery.prototype= {
        html: function () {
            var that=this,a=arguments;
            for(var i=0;i< a.length;i++){
                if(a[i] instanceof  Array){
                    a.push(a[i]);
                    a.splice(i, 1);
                }
            }
            var fn=function(c){
                if(c.innerHTML==""){
                    a.length!=0? (c.value=a[0]): (that=c.value);
                }else{
                    a.length!=0? (c.innerHTML=a[0]): (that=c.innerHTML);
                }
            }
            af.domslt.call(this,this.doms,function(callback){
               fn(callback);
             });
            return that;
        },
        val:function(){
            //����ͬ������
           return arguments.length>0?this.html(arguments):this.html();
        },
        attr:function(){
            var that=this,a=arguments;

            var fn=function(c){
                if(a.length==1){
                    that=c.getAttribute(a[0]);
                }else if(arguments.length==2){
                    c.setAttribute(a[0],a[1]);
                }
            }
            af.domslt.call(this,this.doms,function(callback){
                fn(callback);
            });
            return that;
        },
        show:function(){
           var fn=function(s){
                s.style.display="block";
            }
            af.domslt.call(this,this.doms,function(callback){
                fn(callback);
            });
            return this;
        },
        hide:function(){
            fn=function(s){
                s.style.display="none";
            }
            af.domslt.call(this,this.doms,function(callback){
                fn(callback);
            });
          return this;
        },
        find:function(obj){
          this.doms=select.getStr(obj,this.doms)[0][0];
          return this;
        },//��ֹð��
        stopEventBubble:function(){
            var e=this.doms;
            if (e && e.stopPropagation){
                e.stopPropagation();
            }
            else{
                e.cancelBubble=true;
            }
        },
        bind:function(e,n){
           af.event.add(this,e,n);
        }
    };
    var evenName=("blur focus focusin focusout load resize scroll unload click dblclick " +
    "mousedown mouseup mousemove mouseover mouseout mouseenter mouseleave " +
    "change select submit keydown keypress keyup error contextmenu").split(" ");
    //���¼�
    var EventUtil = new Object;
    EventUtil.addEventHandler = function (sEventType,oTarget,fnHandler) {
        if (oTarget.addEventListener) { // �����û�а�click�¼�������а󶨡�ҳ������ʱ���ִ�����
            oTarget.addEventListener(sEventType, fnHandler, false);
        } else if (oTarget.attachEvent) { // �鿴����ʲô�¼�
            oTarget.attachEvent("on" + sEventType, fnHandler);
        } else {
            oTarget["on" + sEventType] = fnHandler;
        }
    };
    //��¶�÷���
    module.exports=function(s){
        return new seaQuery(s);
    }

});