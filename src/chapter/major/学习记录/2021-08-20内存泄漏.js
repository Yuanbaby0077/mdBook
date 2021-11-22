//全局作用域下写了以下代码
//发生内存泄漏的例子
var obj = {};
function outFun (){
    var a = 0;
    return function innerFun(b){
        a+=b;
        return a;
    }
}
setTimeout(function (){
    obj.newFunc = outFun();
    console.log(obj.newFunc(1)); //1
},3000);
setTimeout(function (){
    obj.newFunc = null;
    console.log('clean'); //clean
},16000);
