<h2>element ui中DateTimePicker坑</h2>
<div class="cnblogs_code">
<pre>&lt;el-date-<span style="color: #000000;">picker
      v</span>-model="value1"<span style="color: #000000;">
      type</span>="datetime"<span style="color: #000000;">
      placeholder</span>="选择日期时间"<span style="color: #000000;">
      value</span>-format="yyyy-MM-dd HH:mm"<span style="color: #000000;">
      format</span>="yyyy-MM-dd HH:mm" :picker-options="<span style="color: #000000;">{
         disabledDate: time =&gt; { 
              return time.getTime() &lt; new Date().getTime()  - 8.64e7
         },
         selectableRange: '10:00:00 - 23:59:59'
      }</span>"&gt;    </pre>
</div>
<p>当selectableRange&nbsp; format value-format 同时存在，点击此刻毫无反应<img src="./images/1798975-20200827105339915-1574158283.png" alt="" loading="lazy" /></p>
<p>&nbsp;</p>
<p>&nbsp;</p>
<p>将&nbsp; format value-format 去掉，然后对获取到的标准时间值进行格式化</p>
<p>&nbsp;</p>