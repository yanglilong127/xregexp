//github：  https://github.com/slevithan/xregexp
// 官网：http://xregexp.com/api/
//XRegExp(pattern, [flags])
/**
标志的任意组合。
本机标志：
g - 全球
i - 忽略大小写
m - 多线锚
u - unicode（ES6）
y - 粘性（Firefox 3 +，ES6）
其他XRegExp标志：
n - 明确的捕获
s - 点匹配所有（又名单行）
x - 自由间距和行注释（又名扩展）
A - astral（需要Unicode Base插件）
 **/
// 使用了'x'修饰符，所以忽略空格且支持行注释
//忽略空格指的是正则中的空格被忽略
//(?<name>…)这种写法即命名的捕获组
// #...为行注释
const date = XRegExp(
    `(?<year>  [0-9]{4} ) -?  # year
     (?<month> [0-9]{2} ) -?  # month
     (?<day>   [0-9]{2} )     # day`, 'x');
 
let match = XRegExp.exec('2017-02-22', date);
console.log(match)  //是一个对象
let format_date=XRegExp.replace('2017-02-22', date, '$<month>/$<day>/$<year>');
console.log(format_date)// -> '02/22/2017'

console.log(date.test('2017-02-22')) //ture


//匹配链方法matchChain
//匹配链方法可以从之前的匹配结果中调用下一个正则继续匹配，就像从一个大范围中使用不同的正则不断筛选出你要的数据。
//它的语法是XRegExp.matchChain(str, chain)
//基本用法：抽取每个<b>标记包裹的数字
//(?is)是XRegExp中修饰符前置的语法，它等同于在正则后加修饰符i s
XRegExp.matchChain('1 <b>2</b> 3 <b>4 a 56</b>', [
  XRegExp('(?is)<b>.*?</b>'),
  /\d+/
]);
// -> ['2', '4', '56']


//所有Unicode令牌都可以使用\P{…}或反转\p{^…}。令牌名称不区分大小写，任何空格，连字符和下划线都将被忽略。您可以省略单个字母的标记名称的大括号。

//测试Unicode类别L(Letter)，单词    ^表示开头 $表示结尾
var unicodeWord = XRegExp('^\\p{L}+$');  //名牌名称L外面的{}可以省略
console.log(unicodeWord.test('Русский')) //  - > true 
console.log(unicodeWord.test('日本语倒萨大大缩短dssd')) ; //  - > true 
console.log(unicodeWord.test('العربية')) ; //  - > true 
console.log(unicodeWord.test(',')) ; //  - > false

//令牌名称Sc:货币符号  N:数字
var unicodeWord = XRegExp('^\\p{Sc}+\\p{N}*$');
console.log(unicodeWord.test('￥$')) //  - > true 
console.log(unicodeWord.test('￥$12')) //  - > true 

//令牌名称P:标点符号
var unicodeWord = XRegExp('\\p{P}+');
var biaodian=',，。!¡¿-.\\'
console.log(unicodeWord.test(biaodian)) //  - > true 
var str='我是,，bu*-rt。!¡¿-.\\-请多指教.﹋﹌︴111'
//匹配全部标点符号并替换为空
console.log(XRegExp.replace(str, XRegExp('\\p{P}+','g'), (match)=>{
	//console.log(match)
	return ''
}));

console.log(XRegExp.replace(str, XRegExp('\\p{P}?\\p{N}?','g'), (match)=>{
	//console.log(match)
	return ''
}));
