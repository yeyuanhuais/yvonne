<div class="cnblogs_code">
<pre>&lt;!-- 选择时间 --&gt;
                  &lt;!-- &lt;el-time-picker style="width:45%"<span style="color: #000000;"> 
placeholder</span>="起始时间" v-model="scope.row.timeStart"<span style="color: #000000;"> 
:disabled</span>="viewDetials" format="HH:mm" value-format="HH:mm"<span style="color: #000000;"> 
:picker</span>-options="{selectableRange:`00:00:00-${scope.row.timeEnd ? scope.row.timeEnd+':00' : '23:59:00'}`}"<span style="color: #000000;">
 size</span>="small"&gt;
                  &lt;/el-time-picker&gt;
                  &lt;span style="width:5%"&gt;-&lt;/span&gt; --&gt;
                  &lt;!-- 选择时间 --&gt;
                  &lt;!-- &lt;el-time-picker style="width:45%"<span style="color: #000000;"> 
placeholder</span>="结束时间" v-model="scope.row.timeEnd"<span style="color: #000000;"> 
:disabled</span>="viewDetials" format="HH:mm" value-format="HH:mm"<span style="color: #000000;"> 
:picker</span>-options="{selectableRange:`${scope.row.timeStart ? scope.row.timeStart+':00' : '00:00:00'}-23:59:00`}"<span style="color: #000000;"> 
size</span>="small"&gt;
                  &lt;/el-time-picker&gt; --&gt;</pre>
</div>
<p>&nbsp;</p>