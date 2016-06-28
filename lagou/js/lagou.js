//搜索框点击事件
!function () {
    var oInput = document.getElementsByTagName("input")[0];
    oInput.onfocus = function () {
        oInput.placeholder = "搜索职位、公司或地点";
    }
    oInput.onblur = function () {
        oInput.placeholder = "视觉设计";
    }
}();
//动画
var bannerBox = document.getElementById("bannerLin");
var bannerList = bannerBox.getElementsByTagName("li");
var minImgBox = document.getElementById("bannerR");
var minBoxBorder = document.getElementById("imgBtnStyle");
var minImgList = minImgBox.getElementsByTagName("li");
var toTop=document.getElementById("toTop");
var timer = null;
!function () {
    //左侧banner动画
    var step = 0;
    utils.addClass(utils.firstChild(minImgList[0]), "select");
    bannerBox.onmouseover = function () {
        clearInterval(timer);
    }
    bannerBox.onmouseout = function () {
        timer = setInterval(move, 4000);
    }
    function move() {
        if (step >= bannerList.length - 1) {
            step = 0;
            animate(bannerBox, {top: 0}, 200);
            animate(minBoxBorder, {top: 0}, 200);
            bannerBox.style.top = 0;
        } else {
            step++;
            animate(minBoxBorder, {top: step * 55}, 300);
            animate(bannerBox, {top: -step * 160}, 300);
        }
        select(step);
    }

    var timer = setInterval(move, 4000);
//右侧背景
    function select(n) {
        for (var i = 0; i < minImgList.length; i++) {
            utils.removeClass(utils.firstChild(minImgList[i]), "select");
        }
        utils.addClass(utils.firstChild(minImgList[n]), "select");
    }

    //右侧小图点击事件
    for (var i = 0; i < minImgList.length; i++) {
        var cur = minImgList[i];
        cur.index = i;
        cur.onmouseover = function () {
            clearInterval(timer);
            utils.addClass(utils.firstChild(minImgList[this.index]), "select");
            animate(bannerBox, {top: -this.index * 160}, 300);
            animate(minBoxBorder, {top: this.index * 55}, 300);
            select(this.index);
        }
        cur.onmouseout = function () {
            timer = setInterval(move, 4000);
        }
    }
}();
//广告动画
!function () {
    var advBox = document.getElementById("adv");
    var liList = advBox.getElementsByTagName("li");
    var showList = advBox.getElementsByTagName("div");
    var DivPrePos= [{left: 0, top: -liList[0].offsetHeight}, {left:  liList[0].offsetWidth, top: 0}, {left: 0, top:liList[0].offsetHeight}, {left: -liList[0].offsetWidth, top: 0}];
    for (var i = 0; i < liList.length; i++) {
        liList[i].index = i;
        liList[i].onmouseenter = function (e) {
            e=e||window.event;
            var showDiv=showList[this.index];
            var direction = director.call(this, e.pageX, e.pageY);
            utils.css(showDiv,DivPrePos[direction]);
            utils.css(showDiv, "display", "block");
            animate(showDiv, {left: 0, top: 0}, 300);
        };
        liList[i].onmouseleave = function (e) {
            e=e||window.event;
            var showDiv=showList[this.index];
            var direction = director.call(this, e.pageX, e.pageY);
           animate(showDiv, DivPrePos[direction], 300);
          utils.css(showDiv,"display", "block");
        };
    }
//判断鼠标进入方向的公司
    function director(pageX, pageY) {
        var w = this.offsetWidth;
        var h = this.offsetHeight;
        var x = (pageX - this.offsetLeft - (w / 2)) * (w > h ? (h / w) : 1);
        var y = (pageY - this.offsetTop - (h / 2)) * (h > w ? (w / h) : 1);
        var direction = Math.round((((Math.atan2(y, x) * (180 / Math.PI)) + 180) / 90) + 3) % 4;
        return direction;
    }
}();
//选项卡
!(function tabChange(){
    var oUl=document.getElementById("tab");
    var tab1=document.getElementById("tab1");
    var tab2=document.getElementById("tab2");
    oUl.onclick= function (e) {
        e=e||window.event;
        e.target= e.target|| e.srcElement;
        if(e.target.tagName.toUpperCase()==="LI"){
            var index=utils.index(e.target);//获取当前点击li的索引用来控制对应索引DIV的显示
            utils.removeClass(utils.siblings(e.target)[0],"select");
            utils.addClass(e.target,"select");
            if(index==0){
                tab1.style.display="block";
                tab1.style.opacity=0;
                tab2.style.opacity=0;
                animate(tab1,{opacity:1},400);
                tab2.style.display="none";
            }else{
                tab1.style.display="none";
                tab2.style.display="block";
                tab1.style.opacity=0;
                animate(tab2,{opacity:1},400);
            }

        }
    }
})();
//底部鼠标滚动定位
!function(){
    var footer=document.getElementById("footer");
    var bottom=document.getElementById("bottom");
    window.onscroll= function () {
        var bot= (document.documentElement.scrollTop||document.body.scrollTop)+document.body.clientHeight-utils.offset(bottom).top;
        var positionB=bot<0?0:bot;
        utils.css(footer,"bottom",positionB);
        //回到顶部图标显示
        if(document.documentElement.scrollTop>0||document.body.scrollTop>0){
            toTop.style.display="block";
        }else{
            toTop.style.display="none";
        }
        //回到顶部后清掉定时器
        if(document.body.scrollTop===0){
            clearTimeout(toTop.timer);
        }
    }
}();
//回到顶部效果
!function () {
    toTop.onclick= function () {
        toTop.timer=setInterval(function () {
            document.body.scrollTop-=40;
        },10);
    }
}();
//二维码显示
!function () {
    var erwei=document.getElementById("erweima");
    var img=erwei.getElementsByTagName("img")[0];
    erwei.onmouseover= function () {
        img.style.display="block";
        animate(img,{opacity:1},400);
    }
    erwei.onmouseout= function () {
        img.style.opacity=0;
        img.style.display="none";
    }
}();
//意见框
var sug=document.getElementById("comment");
var sugBox=document.getElementById("suggest");
var close=utils.getElementsByClass("close")[0];
var submit=utils.getElementsByClass("submit")[0];
sug.onclick= function () {
    utils.css(sugBox,"display","block");
    animate(sugBox,{opacity:1},400);
}
close.onclick=function(){
    clearTimeout(timer);
    animate(sugBox,{opacity:0},400);
    var timer=setTimeout(function () {
        utils.css(sugBox,"display","none");
    },500)
}
submit.onclick= function () {
    clearTimeout(timer);
    var sugTxt=utils.getElementsByClass("sugTxt")[0];
    var text=utils.firstChild(sugTxt);
    var errorBox=utils.getElementsByClass("error")[0];
    if(text.value.replace(/^ +| +$/,"")===""){
        utils.css(errorBox,"display","block");
        var timer=setTimeout(function () {
            utils.css(errorBox,"display","none");
        },2000);
    }else{
        var sugSucces=document.getElementById("sugSucces");
        utils.css(sugSucces,"display","block");
        utils.css(sugBox,"display","none");
        timer=setTimeout(function () {
            animate(sugSucces,{opacity:0},500);
            utils.css(sugSucces,"display","none");
        },2000)
    }
}
//拉勾搜索框
var searchText=document.getElementById("searchText");
var searchList=utils.getElementsByClass("searchList")[0];
var searchTop=utils.getElementsByClass("searchTop")[0];
var searchBot=utils.getElementsByClass("searchBot")[0];
var val=null;
searchText.oninput= function () {
    val=this.value.replace(/^ +| +$/,"");
    if(val.length>0){
        searchBind();
        searchList.style.display="block";
        return;
    }else{
        searchList.style.display="none";
    }
}
//将点击的Li的值赋给文本框
searchList.onclick= function (e) {
    e= e||window.event;
    var tar= e.target|| e.srcElement;
    if(tar.tagName.toUpperCase()==="LI"){
        searchText.value=utils.firstChild(tar).innerHTML;
    }
    searchList.style.display="none";
    window.open("http://www.lagou.com/jobs/list_"+searchText.value+"?labelWords=sug&fromSearch=true");
}
function dataBind(data) {
    var topList = document.getElementById("topList");
    var company = data["COMPANY"], position = data["POSITION"];
    var str = "";
    if (position.length > 0) {
        searchTop.style.display = "block";
        for (var i = 0; i < position.length; i++) {
            var cur = position[i];
            str += "<li><span>" + cur["cont"] + "</span><i>共<em>" + cur["hotness"] + "</em>个职位</i></li>";
        }
        topList.innerHTML = str;
    } else {
        searchTop.style.display = "none";
    }
    str = "";
    if (company.length > 0) {
        var botList = document.getElementById("botList");
        searchBot.style.display = "block";
        for (var i = 0; i < company.length; i++) {
            var cur = company[i];
            str += "<li><span>" + cur["cont"] + "</span><i>共<em>" + cur["hotness"] + "</em>个职位</i></li>";
        }
        botList.innerHTML=str;
    }else
        {
            searchBot.style.display = "none";
            searchTop.style.border="none";
        }
}
function searchBind(){
    !function getJson(){
        var type= 1,num=10;
        var url="http://suggest.lagou.com/suggestion/mix?input="+val+"&suggestback=dataBind&type="+type+"&num="+num+"&_="+Math.random();
        var script=document.createElement("script");
        script.setAttribute("src",url);
        document.getElementsByTagName("body")[0].appendChild(script);
    }();
}



//动画库
function animate(ele, target, duration) {
    var liner = function (t, d, c, b) {
        return t / d * c + b;
    };
    var time = null, interval = 20;
    var begin = {}, change = {};
    for (var key in target) {
        if (target.hasOwnProperty) {
            for (var key in target) {
                begin[key] = utils.css(ele, key);
                change[key] = target[key] - begin[key];
            }
        }
    }
    clearInterval(ele.timer);
    ele.timer = setInterval(function () {
        time += interval;
        if (time > duration) {
            clearInterval(ele.timer);
            utils.css(target);
        } else {
            for (var key in target) {
                if (target.hasOwnProperty) {
                    var curPos = liner(time, duration, change[key], begin[key]);
                    utils.css(ele, key, curPos);
                }
            }
        }
    }, interval)
}