<p><span style="font-size: 16px; font-family: 宋体;">使用watch时有一个特点，就是当值第一次绑定的时候，不会执行监听函数，只有值发生改变才会执行。如果我们需要在最初绑定值的时候也执行函数，则就需要用到immediate属性。&nbsp;</span></p>
<h1><span style="font-size: 16px; font-family: 宋体;">handler方法和immediate属性</span></h1>
<p><span style="font-size: 16px; font-family: 宋体;">当父组件向子组件动态传值时，子组件props首次获取到父组件传来的默认值时，也需要执行函数，此时就需要将immediate设为true</span></p>
<p><span style="font-size: 16px; font-family: 宋体;">之前我们写的 watch 方法其实默认写的就是这个handler，Vue.js会去处理这个逻辑，最终编译出来其实就是这个handler。</span></p>
<p><span style="font-size: 16px; font-family: 宋体;">immediate:true代表如果在 wacth 里声明了 viewDetials之后，就会立即先去执行里面的handler方法，如果为 false就跟我们以前的效果一样，不会在绑定的时候就执行</span></p>
<h1><span style="font-size: 16px; font-family: 宋体;">deep属性</span></h1>
<p><span style="font-size: 16px; font-family: 宋体;">watch 里面还有一个属性 deep，默认值是 false，代表是否深度监听当需要监听一个对象的改变时，普通的watch方法无法监听到对象内部属性的改变，只有data中的数据才能够监听到变化，此时就需要deep属性对对象进行深度监听。</span></p>
<p><span style="font-size: 16px; font-family: 宋体;">设置deep: true 则可以监听到newTemplateForm&nbsp;的变化，此时会给newTemplateForm&nbsp;的所有属性都加上这个监听器，当对象属性较多时，每个属性值的变化都会执行handler。如果只需要监听对象中的一个属性值，则可以做以下优化：使用字符串的形式监听对象属性：'newTemplateForm .cycleUpkeep'</span></p>
<p>&nbsp;</p>
<div class="cnblogs_code">
<pre><span style="font-size: 16px; font-family: 宋体;"><span style="color: #000000;">newTemplateForm: {
  handler(val) {
    </span><span style="color: #008000;">//</span><span style="color: #008000;"> 频次任务 table 是否为数组</span>
    <span style="color: #0000ff;">if</span> (!<span style="color: #000000;">Array.isArray(val.cycleUpkeep)) {
      </span><span style="color: #0000ff;">this</span>.newTemplateForm.cycleUpkeep =<span style="color: #000000;"> [{
        dayNum: </span>1<span style="color: #000000;">,
        timeStart: </span>''<span style="color: #000000;">,
        timeEnd: </span>''<span style="color: #000000;">
      }]
    }
    </span><span style="color: #008000;">//</span><span style="color: #008000;"> 次数大于table数据条目数</span>
    <span style="color: #0000ff;">if</span> (val.cycleUpkeep.dayNum &gt;<span style="color: #000000;"> val.cycleUpkeep.length) {
      console.log(</span>1111<span style="color: #000000;">)
      </span><span style="color: #0000ff;">for</span> (<span style="color: #0000ff;">var</span> i = <span style="color: #0000ff;">this</span>.newTemplateForm.cycleUpkeep.length + 1; i &lt;= <span style="color: #0000ff;">this</span>.newTemplateForm.cycleUpkeep.dayNum; i++<span style="color: #000000;">) {
        </span><span style="color: #0000ff;">this</span><span style="color: #000000;">.newTemplateForm.cycleUpkeep.push({
          dayNum: i,
          timeStart: </span>''<span style="color: #000000;">,
          timeEnd: </span>''<span style="color: #000000;">
        })
      }
    }
    </span><span style="color: #008000;">//</span><span style="color: #008000;"> 时间间隔为 undefined 时</span>
    <span style="color: #0000ff;">if</span> (!<span style="color: #0000ff;">this</span><span style="color: #000000;">.newTemplateForm.cycleTypeNum) {
      </span><span style="color: #0000ff;">this</span>.newTemplateForm.cycleTypeNum = 1<span style="color: #000000;">
    }
    </span><span style="color: #008000;">//</span><span style="color: #008000;"> 时间单位 可能为 0：天</span>
    <span style="color: #0000ff;">if</span> (!<span style="color: #0000ff;">this</span><span style="color: #000000;">.newTemplateForm.cycleType) {
      </span><span style="color: #0000ff;">if</span> (<span style="color: #0000ff;">this</span>.newTemplateForm.cycleType === 0<span style="color: #000000;">) {
        </span><span style="color: #0000ff;">this</span>.newTemplateForm.cycleType = 0<span style="color: #000000;">
      } </span><span style="color: #0000ff;">else</span><span style="color: #000000;"> {
        </span><span style="color: #0000ff;">this</span>.newTemplateForm.cycleType = 1<span style="color: #000000;">
      }
    }
    </span><span style="color: #008000;">//</span><span style="color: #008000;"> 次数为 undefined 时</span>
    <span style="color: #0000ff;">if</span> (!<span style="color: #0000ff;">this</span><span style="color: #000000;">.newTemplateForm.cycleUpkeep.dayNum) {
      </span><span style="color: #0000ff;">this</span>.newTemplateForm.cycleUpkeep.dayNum = 1<span style="color: #000000;">
    }
  },
  immediate: </span><span style="color: #0000ff;">true</span><span style="color: #000000;">,
  deep: </span><span style="color: #0000ff;">true</span><span style="color: #000000;">
},</span></span></pre>
</div>
<p><span style="font-size: 16px; font-family: 宋体;">&nbsp;</span></p>
<div class="cnblogs_code">
<pre><span style="font-size: 16px; font-family: 宋体;"><span style="color: #000000;">viewDetials: {
   handler(val) {
   console.log(val)
   },
   immediate: </span><span style="color: #0000ff;">true</span><span style="color: #000000;">,
}</span></span></pre>
</div>
<p><span style="font-size: 16px; font-family: 宋体;">&nbsp;</span></p>