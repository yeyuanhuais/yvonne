<div class="cnblogs_code">
<pre>        &lt;el-date-picker class="dataPick" v-model="applyValue"<span style="color: #000000;"> 
type</span>="datetime"<span style="color: #ff0000;"> :popper-class="'currentDatePickerClass'"</span><span style="color: #000000;">
 value</span>-format="yyyy-MM-dd HH:mm"<span style="color: #000000;">
 format</span>="yyyy-MM-dd HH:mm" placeholder="选择日期时间"<span style="color: #000000;">
 :picker</span>-options="<span style="color: #000000;">{ disabledDate: (time) =&gt; { 
return dataTime.startTimeData(time) }, selectableRange: 
this.startTimeRange,}</span>"&gt; &lt;/el-date-picker&gt;</pre>
</div>
<div class="cnblogs_code">
<pre>&lt;style&gt;<span style="color: #ff0000;">
.currentDatePickerClass &gt; .el-picker-panel__footer &gt; .el-button--text:first-child{
  display: none;
}
</span>&lt;/style&gt;</pre>
</div>
<p><img src="./images/1798975-20200824163217580-819514157.png" alt="" loading="lazy" /></p>
<p>&nbsp;</p>