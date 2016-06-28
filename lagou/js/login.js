var input=utils.getElementsByClass("inputText")[0];
var inputText=utils.firstChild(input);
var errInfo=utils.lastChild(input);
var reg=/(^1\d{10}$)|^(\w)+(\.\w+)*@(\w)+((\.\w+)+)$/;
inputText.onfocus=function(){
    if(this.value==this.defaultValue){
        this.value="";
    }
}
inputText.onblur=function(){
    var val=this.value;
    if(!reg.test(val)&&val!==""){
        utils.css(inputText,"border-color","#ff4351");
        errInfo.style.display="block";
        return;
    }
    errInfo.style.display="none";
}