## 不会的正则表达式


### Groups 和 Ranges


字符集 | 含义
---------|----------
 x|y | 匹配x或者y
 [xyz][a-c] | 匹配字符范围，例如/[\w-]/和/[A-Za-z0-9_-]/是一样的
 [^xyz][^a-c] | 匹配任意不包含在该字符集中的，[^abc]和[^a-c]是一样的
 (x) | 匹配x并记住匹配项，捕获组会影响性能
 `(?<Name>x)` | 具名捕获组,匹配x,并将其存储在返回的groups中，该x作为`<name>`的属性

 String.prototype.match()

 参数：
* regexp
  * 如果 regexp 是非Regexp对象，它会隐式地转换为Regexp通过new Regexp(regexp)
  * 如果没有提供任何参数，直接使用match(),会得到一个带有一个空值的数组`["", input: '', index: 0, groups: undefined]`

返回值：
* 返回的内容依赖于(g)标识，如果没有匹配的，则返回null
* 如果设置了`g`标识，返回的内容不会携带分组的内容，而是返回全部匹配的结果
* 如果没有设置`g`标识，则会返回第一个匹配的结果和分组的结果以及其他属性（groups,index,input）

例子
使用组：
try
`‘For more information, see Chapter 3.4.5.1’.match(/see (chapter \d+(\.\d)*)/i)`

```
let personList = `First_Name: John, Last_Name: Doe
First_Name: Jane, Last_Name: Smith`;

let regexpNames =  /First_Name: (\w+), Last_Name: (\w+)/mg;
let match = regexpNames.exec(personList);
do {
  console.log(`Hello ${match[1]} ${match[2]}`);
} while((match = regexpNames.exec(personList)) !== null);
```
使用具名捕获

```
let users= `姓氏: 李, 名字: 雷佳音
姓氏: 韩, 名字: 梅梅`;

let regexpNames =  /姓氏: (?<first>.+), 名字: (?<last>.+)/mg;

let match = regexpNames.exec(users)
while(match) {
    console.log(match[1],match[2])
    match = regexpNames.exec(users)
}
VM1204:8 李 雷佳音
VM1204:8 韩 梅梅
null
```




