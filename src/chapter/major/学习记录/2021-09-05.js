let i = 1;

const timer = setInterval(() => {
  console.log(i++);
  const s = Date.now();
  while (Date.now() - s < 3000) { }
}, 2000);

setTimeout(() => {
  clearInterval(timer);
}, 7000);



function Foo() {
  getName = function () { console.log(1); };
  return this;
}
Foo.getName = function () { console.log(2);};
Foo.prototype.getName = function () { console.log(3);};
var getName = function () { console.log(4);};
function getName() { console.log(5);}

//请写出以下输出结果：
Foo.getName();
getName();
Foo().getName();
getName();
new Foo.getName();
new Foo().getName();
new new Foo().getName();
