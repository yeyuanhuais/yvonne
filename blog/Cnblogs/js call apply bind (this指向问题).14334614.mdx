<h1>1.this的指向（this 永远指向最后调用它的那个对象）</h1>
<div class="cnblogs_code">
<pre><span style="color: #0000ff;">var</span> name = "windowsName"<span style="color: #000000;">;
</span><span style="color: #0000ff;">function</span><span style="color: #000000;"> a() {
 </span><span style="color: #0000ff;">var</span> name = "Cherry"<span style="color: #000000;">;
 console.log(</span><span style="color: #0000ff;">this</span>.name);   <span style="color: #008000;">//</span><span style="color: #008000;"> windowsName</span>
 console.log("inner:" + <span style="color: #0000ff;">this</span>); <span style="color: #008000;">//</span><span style="color: #008000;"> inner: Window</span>
<span style="color: #000000;">}
a();
console.log(</span>"outer:" + <span style="color: #0000ff;">this</span>)   <span style="color: #008000;">//</span><span style="color: #008000;"> outer: Window</span>


<span style="color: #0000ff;">var</span> name = "windowsName"<span style="color: #000000;">;
 </span><span style="color: #0000ff;">var</span> a =<span style="color: #000000;"> {
  name: </span>"Cherry"<span style="color: #000000;">,
  fn : </span><span style="color: #0000ff;">function</span><span style="color: #000000;"> () {
   console.log(</span><span style="color: #0000ff;">this</span>.name);  <span style="color: #008000;">//</span><span style="color: #008000;"> Cherry</span>
<span style="color: #000000;">  }
 }
 a.fn();


</span><span style="color: #008000;">//</span><span style="color: #008000;">f 并没有调用，所以 fn() 最后仍然是被 window 调用的。所以 this 指向的也就是 window。</span>
<span style="color: #0000ff;">var</span> name = "windowsName"<span style="color: #000000;">;
</span><span style="color: #0000ff;">var</span> a =<span style="color: #000000;"> {
 name : </span><span style="color: #0000ff;">null</span><span style="color: #000000;">,
 </span><span style="color: #008000;">//</span><span style="color: #008000;"> name: "Cherry",</span>
 fn : <span style="color: #0000ff;">function</span><span style="color: #000000;"> () {
  console.log(</span><span style="color: #0000ff;">this</span>.name);  <span style="color: #008000;">//</span><span style="color: #008000;"> windowsName</span>
<span style="color: #000000;"> }
}
</span><span style="color: #0000ff;">var</span> f =<span style="color: #000000;"> a.fn;
f();


</span><span style="color: #0000ff;">var</span> name = "windowsName"<span style="color: #000000;">;
</span><span style="color: #0000ff;">var</span> a =<span style="color: #000000;"> {
 name : </span><span style="color: #0000ff;">null</span><span style="color: #000000;">,
 </span><span style="color: #008000;">//</span><span style="color: #008000;"> name: "Cherry",</span>
 fn : <span style="color: #0000ff;">function</span><span style="color: #000000;"> () {
  console.log(</span><span style="color: #0000ff;">this</span>.name);  <span style="color: #008000;">//</span><span style="color: #008000;"> null</span>
<span style="color: #000000;"> }
}
</span><span style="color: #0000ff;">var</span> f =<span style="color: #000000;"> a.fn();
f;</span></pre>
</div>
<h1>2.改变this指向</h1>
<div class="cnblogs_code">
<pre><span style="color: #0000ff;">var</span> name = "windowsName"<span style="color: #000000;">;
 </span><span style="color: #0000ff;">var</span> a =<span style="color: #000000;"> {
  name : </span>"Cherry"<span style="color: #000000;">,
  func1: </span><span style="color: #0000ff;">function</span><span style="color: #000000;"> () {
   console.log(</span><span style="color: #0000ff;">this</span><span style="color: #000000;">.name)  
  },
  func2: </span><span style="color: #0000ff;">function</span><span style="color: #000000;"> () {
   setTimeout( </span><span style="color: #0000ff;">function</span><span style="color: #000000;"> () {
    </span><span style="color: #0000ff;">this</span><span style="color: #000000;">.func1()
   },</span>100<span style="color: #000000;">);
  }
 };
 a.func2()  </span><span style="color: #008000;">//</span><span style="color: #008000;">报错 this.func1 is not a function</span></pre>
</div>
<h2>（1）使用箭头函数</h2>
<p>　　箭头函数中没有 this 绑定，必须通过查找作用域链来决定其值，如果箭头函数被非箭头函数包含，则 this 绑定的是最近一层非箭头函数的 this，否则，this 为 undefined</p>
<div class="cnblogs_code">
<pre><span style="color: #0000ff;">var</span> name = "windowsName"<span style="color: #000000;">;
</span><span style="color: #0000ff;">var</span> a =<span style="color: #000000;"> {
 name : </span>"Cherry"<span style="color: #000000;">,
 func1: </span><span style="color: #0000ff;">function</span><span style="color: #000000;"> () {
  console.log(</span><span style="color: #0000ff;">this</span><span style="color: #000000;">.name)  
 },
 func2: </span><span style="color: #0000ff;">function</span><span style="color: #000000;"> () {
  setTimeout( () </span>=&gt;<span style="color: #000000;"> {
   </span><span style="color: #0000ff;">this</span><span style="color: #000000;">.func1() <span style="color: #339966;">//this为a</span>
  },</span>100<span style="color: #000000;">);
 }
};
a.func2()  </span><span style="color: #008000;">//</span><span style="color: #008000;"> Cherry</span></pre>
</div>
<h2>（2）在函数内部使用 _this = this</h2>
<p>　　在 func2 中，首先设置 var _this = this;，这里的 this 是调用 func2 的对象 a，为了防止在 func2 中的 setTimeout 被 window 调用而导致的在 setTimeout 中的 this 为 window。我们将 this(指向变量 a) 赋值给一个变量 _this，这样，在 func2 中我们使用 _this 就是指向对象 a 了。</p>
<div class="cnblogs_code">
<pre><span style="color: #0000ff;">var</span> name = "windowsName"<span style="color: #000000;">;
</span><span style="color: #0000ff;">var</span> a =<span style="color: #000000;"> {
 name : </span>"Cherry"<span style="color: #000000;">,
 func1: </span><span style="color: #0000ff;">function</span><span style="color: #000000;"> () {
  console.log(</span><span style="color: #0000ff;">this</span><span style="color: #000000;">.name)  
 },
 func2: </span><span style="color: #0000ff;">function</span><span style="color: #000000;"> () {
  </span><span style="color: #0000ff;">var</span> _this = <span style="color: #0000ff;">this</span><span style="color: #000000;">;
  setTimeout( </span><span style="color: #0000ff;">function</span><span style="color: #000000;">() {
   _this.func1()
  },</span>100<span style="color: #000000;">);
 }
};
a.func2()  </span><span style="color: #008000;">//</span><span style="color: #008000;"> Cherry</span></pre>
</div>
<h1>3.call，apply，bind使用</h1>
<div class="cnblogs_code">
<pre><span style="color: #0000ff;">var</span> cat =<span style="color: #000000;"> {
  name: </span>"喵喵"<span style="color: #000000;">,
  eatFish: </span><span style="color: #0000ff;">function</span><span style="color: #000000;"> (param1, param2) {
    console.log(</span><span style="color: #0000ff;">this</span>.name, "吃鱼"<span style="color: #000000;">);
    console.log(param1, param2);
  }
};

</span><span style="color: #0000ff;">var</span> dog =<span style="color: #000000;"> {
  name: </span>"汪汪"<span style="color: #000000;">,
  eatBone: </span><span style="color: #0000ff;">function</span><span style="color: #000000;"> (param1, param2) {
    console.log(</span><span style="color: #0000ff;">this</span>.name, "啃骨头"<span style="color: #000000;">);
    console.log(param1, param2);
  }
};
cat.eatFish();
console.log(</span>"================================="<span style="color: #000000;">);
cat.eatFish.apply(dog, [</span>"旺财-13岁", "apply"<span style="color: #000000;">]);
console.log(</span>"================================="<span style="color: #000000;">);
cat.eatFish.call(dog, </span>"旺财-13岁", "call"<span style="color: #000000;">);
console.log(</span>"================================="<span style="color: #000000;">);
cat.eatFish.bind(dog, </span>"旺财-13岁", "bind")();</pre>
</div>
<p><img src="./images/1798975-20210127135403356-453137781.png" alt="" loading="lazy" /></p>
<p>&nbsp;参考（https://www.jb51.net/article/124024.htm）</p>