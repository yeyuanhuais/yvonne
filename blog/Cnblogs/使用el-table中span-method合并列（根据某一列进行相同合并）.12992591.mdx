<p><span style="font-size: 18px;"><strong>效果图</strong></span></p>
<p><img src="./images/1798975-20210126141304268-2077311812.png" alt="" loading="lazy" /></p>
<h2><span style="background-color: #ccffff;">代码</span></h2>
<div class="cnblogs_Highlighter">
<pre class="brush:html;gutter:true;">&lt;el-table
      :data="tableData"
      <span style="background-color: #ffff00;">:span-method="objectSpanMethod"</span>
      border
      style="width: 100%;"
      height="53vh"
      v-loading="dataListLoading"
    &gt;
</pre>
</div>
<p>　　</p>
<div class="cnblogs_code">
<pre><span style="color: #0000ff;">this</span>.getSpanArr(<span style="color: #0000ff;">this</span>.tableData);<span style="color: #008000;">//</span><span style="color: #008000;">后台获取到数据后进行数据处理</span>
<span style="color: #000000;">
getSpanArr(data) {</span></pre>
<div>
<div>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;this.spanArr=[]</div>
</div>
<pre><span style="color: #0000ff;">for</span> (<span style="color: #0000ff;">var</span> i = 0; i &lt; data.length; i++<span style="color: #000000;">) {
        </span><span style="color: #0000ff;">if</span> (i === 0<span style="color: #000000;">) {
          </span><span style="color: #0000ff;">this</span>.spanArr.push(1<span style="color: #000000;">);
          </span><span style="color: #0000ff;">this</span>.pos = 0<span style="color: #000000;">
        } </span><span style="color: #0000ff;">else</span><span style="color: #000000;"> {
          </span><span style="color: #008000;">//</span><span style="color: #008000;"> 判断当前元素与上一个元素是否相同  inAccessCode（批次字段）</span>
          <span style="color: #0000ff;">if</span> (data[i].inAccessCode === data[i - 1<span style="color: #000000;">].inAccessCode) {
            </span><span style="color: #0000ff;">this</span>.spanArr[<span style="color: #0000ff;">this</span>.pos] += 1<span style="color: #000000;">;
            </span><span style="color: #0000ff;">this</span>.spanArr.push(0<span style="color: #000000;">);
          } </span><span style="color: #0000ff;">else</span><span style="color: #000000;"> {
            </span><span style="color: #0000ff;">this</span>.spanArr.push(1<span style="color: #000000;">);
            </span><span style="color: #0000ff;">this</span>.pos =<span style="color: #000000;"> i;
          }
        }
      }
    },
</span><span style="color: #008000;">//</span><span style="color: #008000;">进行表格合并</span>
<span style="color: #000000;">objectSpanMethod({ row, column, rowIndex, columnIndex }) {
      </span><span style="color: #0000ff;">if</span> (columnIndex === 0<span style="color: #000000;">) {
        const _row </span>= <span style="color: #0000ff;">this</span><span style="color: #000000;">.spanArr[rowIndex];
        const _col </span>= _row &gt; 0 ? 1 : 0<span style="color: #000000;">;
        </span><span style="color: #0000ff;">return</span><span style="color: #000000;"> {
          rowspan: _row,
          colspan: _col
        }
      }
    },</span></pre>
</div>
<h2>原理</h2>
<p>getSpanArr(data)方法 data就是我们从后台拿到的数据，通常是一个数组；spanArr是一个空的数组，用于存放每一行记录的合并数；pos是spanArr的索引。</p>
<p>如果是第一条记录（索引为０），向数组中加入１，并设置索引位置；如果不是第一条记录，则判断它与前一条记录是否相等，如果相等，则向spanArr中添入元素０，并将前一位元素＋１，表示合并行数＋１，</p>
<p>以此往复，得到所有行的合并数，０即表示该行不显示</p>
<div><strong>[0,0] 表示这一行不显示， [2,1]表示行的合并数（该原理引用https://www.cnblogs.com/mmzuo-798/p/11686021.html ）</strong></div>