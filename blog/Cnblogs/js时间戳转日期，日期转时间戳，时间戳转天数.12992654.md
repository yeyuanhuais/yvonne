<h2>时间戳转日期</h2>
<div class="cnblogs_code">
<pre><span style="color: #008000;">//</span><span style="color: #008000;">parseInt()字符串转数字</span><span style="color: #008000;">
//</span><span style="color: #008000;">new Date()放入时间戳，没有放默认当前时间</span>
<span style="color: #0000ff;">this</span>.tableData[i].createTime = <span style="color: #0000ff;">this</span>.formatDate(<span style="color: #0000ff;">new</span> Date(parseInt(<span style="color: #0000ff;">this</span><span style="color: #000000;">.tableData[i].createTime)))

</span><span style="color: #008000;">//</span><span style="color: #008000;"> 时间戳转换日期格式</span>
<span style="color: #000000;">    formatDate(now) {
      </span><span style="color: #0000ff;">var</span> year = now.getFullYear();  <span style="color: #008000;">//</span><span style="color: #008000;">取得4位数的年份</span>
      <span style="color: #0000ff;">var</span> month = now.getMonth() + 1;  <span style="color: #008000;">//</span><span style="color: #008000;">取得日期中的月份，其中0表示1月，11表示12月</span>
      <span style="color: #0000ff;">var</span> date = now.getDate();      <span style="color: #008000;">//</span><span style="color: #008000;">返回日期月份中的天数（1到31）</span>
      <span style="color: #0000ff;">var</span> hour = now.getHours();     <span style="color: #008000;">//</span><span style="color: #008000;">返回日期中的小时数（0到23）</span>
      <span style="color: #0000ff;">var</span> minute = now.getMinutes(); <span style="color: #008000;">//</span><span style="color: #008000;">返回日期中的分钟数（0到59）</span>
      <span style="color: #0000ff;">var</span> second = now.getSeconds(); <span style="color: #008000;">//</span><span style="color: #008000;">返回日期中的秒数（0到59）</span>
      <span style="color: #0000ff;">return</span> year + "-" + month + "-" + date + " " + hour + ":" + minute + ":" +<span style="color: #000000;"> second;
    }</span></pre>
</div>
<h2>日期转时间戳转天数</h2>
<div class="cnblogs_code">
<pre>let day=(Date.parse(val)-Date.parse(<span style="color: #0000ff;">this</span>.addForm.checkCycleStart))/(1*24*60*60*1000);</pre>
</div>
<p>&nbsp;</p>