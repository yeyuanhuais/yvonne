<p>转载自<a href="https://blog.csdn.net/qq_34783476/article/details/90774635">https://blog.csdn.net/qq_34783476/article/details/90774635</a></p>
<div class="cnblogs_code">
<pre>&lt;!-- 日期搜索框 --&gt;
&lt;template&gt;
  &lt;div id="myDate"&gt;
    &lt;el-button icon="el-icon-caret-left" @click="dateChange(4)"&gt;&lt;/el-button&gt;
    &lt;el-select v-model="yearsModel" @change="dateChange(1)" placeholder="请选择" style="width:100px;"&gt;
      &lt;el-option v-<span style="color: #0000ff;">for</span>="item in years" :key="item.value" :label="item.label" :value="item.value"&gt;
      &lt;/el-option&gt;
    &lt;/el-select&gt;
    &lt;el-select v-model="monthsModel" @change="dateChange(2)" placeholder="请选择" style="width:100px;"&gt;
      &lt;el-option v-<span style="color: #0000ff;">for</span>="item in months" :key="item.value" :label="item.label" :value="item.value"&gt;
      &lt;/el-option&gt;
    &lt;/el-select&gt;
    &lt;el-select v-model="daysModel" @change="dateChange(3)" placeholder="请选择" style="width:100px;"&gt;
      &lt;el-option v-<span style="color: #0000ff;">for</span>="item in days" :key="item.value" :label="item.label" :value="item.value"&gt;
      &lt;/el-option&gt;
    &lt;/el-select&gt;
    &lt;el-button icon="el-icon-caret-right" @click="dateChange(5)"&gt;&lt;/el-button&gt;

  &lt;/div&gt;
&lt;/template&gt;
 
&lt;script&gt;<span style="color: #000000;">
export </span><span style="color: #0000ff;">default</span><span style="color: #000000;"> {
  props: {
  },
  data() {
    </span><span style="color: #0000ff;">return</span><span style="color: #000000;"> {
      yearsModel: </span><span style="color: #0000ff;">null</span><span style="color: #000000;">,
      years: [],
      monthsModel: </span><span style="color: #0000ff;">null</span><span style="color: #000000;">,
      months: [],
      daysModel: </span><span style="color: #0000ff;">null</span><span style="color: #000000;">,
      days: [],
    }
  },

  created() {
    </span><span style="color: #0000ff;">this</span><span style="color: #000000;">.init();
  },
  methods: {
    init() {
      </span><span style="color: #0000ff;">var</span> myDate = <span style="color: #0000ff;">new</span><span style="color: #000000;"> Date;
      </span><span style="color: #0000ff;">var</span> year = myDate.getFullYear();<span style="color: #008000;">//</span><span style="color: #008000;">获取当前年</span>
      <span style="color: #0000ff;">var</span> month = myDate.getMonth() + 1;<span style="color: #008000;">//</span><span style="color: #008000;">获取当前月</span>
      <span style="color: #0000ff;">var</span> day = myDate.getDate();<span style="color: #008000;">//</span><span style="color: #008000;">获取当前日</span>

      <span style="color: #0000ff;">this</span><span style="color: #000000;">.initSelectYear(year)
      </span><span style="color: #0000ff;">this</span><span style="color: #000000;">.initSelectMonth();
      </span><span style="color: #0000ff;">this</span><span style="color: #000000;">.initSelectDay(year, month);
      </span><span style="color: #0000ff;">this</span>.yearsModel =<span style="color: #000000;"> year;
      </span><span style="color: #0000ff;">this</span>.monthsModel =<span style="color: #000000;"> month;
      </span><span style="color: #0000ff;">this</span>.daysModel =<span style="color: #000000;"> day;
      let obj </span>= { year: <span style="color: #0000ff;">this</span>.yearsModel, month: <span style="color: #0000ff;">this</span>.monthsModel, day: <span style="color: #0000ff;">this</span><span style="color: #000000;">.daysModel }
      </span><span style="color: #0000ff;">this</span><span style="color: #000000;">.$parent.dateChange(obj);
    },
    initSelectYear(year) {
      </span><span style="color: #0000ff;">this</span>.years =<span style="color: #000000;"> [];
      </span><span style="color: #0000ff;">for</span> (let i = 0; i &lt; 30; i++<span style="color: #000000;">) {
        </span><span style="color: #0000ff;">this</span>.years.push({ value: (year - i), label: (year - i) + "年"<span style="color: #000000;"> });
      }
    },
    initSelectMonth() {
      </span><span style="color: #0000ff;">this</span>.months =<span style="color: #000000;"> [];
      </span><span style="color: #0000ff;">this</span>.months.push({ value: 0, label: "全部"<span style="color: #000000;"> });
      </span><span style="color: #0000ff;">for</span> (let i = 1; i &lt;= 12; i++<span style="color: #000000;">) {
        </span><span style="color: #0000ff;">this</span>.months.push({ value: i, label: i + "月"<span style="color: #000000;"> });
      }
    },
    initSelectDay(year, month) {
      </span><span style="color: #0000ff;">var</span> maxDay = <span style="color: #0000ff;">this</span><span style="color: #000000;">.getMaxDay(year, month);
      </span><span style="color: #0000ff;">this</span>.days =<span style="color: #000000;"> [];
      </span><span style="color: #0000ff;">this</span>.days.push({ value: 0, label: "全部"<span style="color: #000000;"> });
      </span><span style="color: #0000ff;">for</span> (<span style="color: #0000ff;">var</span> i = 1; i &lt;= maxDay; i++<span style="color: #000000;">) {
        </span><span style="color: #0000ff;">this</span>.days.push({ value: i, label: i + "日"<span style="color: #000000;"> });
      }
    },
    dateChange(type) {
      </span><span style="color: #008000;">//</span><span style="color: #008000;">1年 2月 3日 4 左 5右</span>
      <span style="color: #0000ff;">if</span> (type == 1 || type == 2<span style="color: #000000;">) {
        </span><span style="color: #0000ff;">if</span> (<span style="color: #0000ff;">this</span>.monthsModel == 0<span style="color: #000000;">) {
          </span><span style="color: #0000ff;">this</span>.daysModel = 0<span style="color: #000000;">;
          </span><span style="color: #0000ff;">this</span>.initSelectDay(<span style="color: #0000ff;">this</span>.yearsModel, 1<span style="color: #000000;">);
        } </span><span style="color: #0000ff;">else</span><span style="color: #000000;"> {
          </span><span style="color: #0000ff;">this</span>.initSelectDay(<span style="color: #0000ff;">this</span>.yearsModel, <span style="color: #0000ff;">this</span><span style="color: #000000;">.monthsModel);
        }
      }
      </span><span style="color: #0000ff;">if</span> (type == 4<span style="color: #000000;">) {
        </span><span style="color: #0000ff;">this</span><span style="color: #000000;">.dayleft();
      }
      </span><span style="color: #0000ff;">if</span> (type == 5<span style="color: #000000;">) {
        </span><span style="color: #0000ff;">this</span><span style="color: #000000;">.dayright();
      }

      </span><span style="color: #008000;">//</span><span style="color: #008000;">操作父组件方法</span>
      let obj = { year: <span style="color: #0000ff;">this</span>.yearsModel, month: <span style="color: #0000ff;">this</span>.monthsModel, day: <span style="color: #0000ff;">this</span><span style="color: #000000;">.daysModel }
      </span><span style="color: #0000ff;">this</span><span style="color: #000000;">.$parent.dateChange(obj);

    },
    dayleft() {

      </span><span style="color: #0000ff;">var</span> tmpYear = <span style="color: #0000ff;">this</span><span style="color: #000000;">.yearsModel;
      </span><span style="color: #0000ff;">var</span> tmpMonth = <span style="color: #0000ff;">this</span><span style="color: #000000;">.monthsModel;
      </span><span style="color: #0000ff;">var</span> tmpDay = <span style="color: #0000ff;">this</span><span style="color: #000000;">.daysModel;
      </span><span style="color: #0000ff;">if</span> (tmpYear == <span style="color: #0000ff;">null</span><span style="color: #000000;">) {
        </span><span style="color: #0000ff;">var</span> myDate = <span style="color: #0000ff;">new</span><span style="color: #000000;"> Date;
        </span><span style="color: #0000ff;">var</span> year = myDate.getFullYear();<span style="color: #008000;">//</span><span style="color: #008000;">获取当前年</span>
        <span style="color: #0000ff;">var</span> month = myDate.getMonth() + 1;<span style="color: #008000;">//</span><span style="color: #008000;">获取当前月</span>
        <span style="color: #0000ff;">var</span> day = myDate.getDate();<span style="color: #008000;">//</span><span style="color: #008000;">获取当前日</span>
        <span style="color: #0000ff;">this</span>.yearsModel =<span style="color: #000000;"> year;
        </span><span style="color: #0000ff;">this</span>.monthsModel =<span style="color: #000000;"> month;
        </span><span style="color: #0000ff;">this</span>.daysModel =<span style="color: #000000;"> day;
        </span><span style="color: #0000ff;">return</span><span style="color: #000000;">;
      }
      </span><span style="color: #0000ff;">if</span> (tmpMonth == <span style="color: #0000ff;">null</span>) { tmpMonth = 0<span style="color: #000000;"> }
      </span><span style="color: #0000ff;">if</span> (tmpDay == <span style="color: #0000ff;">null</span>) { tmpDay = 0<span style="color: #000000;"> }

      </span><span style="color: #0000ff;">var</span> yearV =<span style="color: #000000;"> tmpYear;
      </span><span style="color: #0000ff;">var</span> monthV =<span style="color: #000000;"> tmpMonth;
      </span><span style="color: #0000ff;">var</span> dayV =<span style="color: #000000;"> tmpDay;

      </span><span style="color: #0000ff;">if</span> ((tmpMonth == 0 || tmpMonth == 1) &amp;&amp; (tmpDay == 0 || tmpDay == 1<span style="color: #000000;">)) {
        yearV </span>= tmpYear - 1; monthV = 12<span style="color: #000000;">;
        dayV </span>= <span style="color: #0000ff;">this</span><span style="color: #000000;">.getMaxDay(tmpYear, tmpMonth);
      }
      </span><span style="color: #0000ff;">if</span> (!(tmpMonth == 0 || tmpMonth == 1) &amp;&amp; (tmpDay == 0 || tmpDay == 1<span style="color: #000000;">)) {
        monthV </span>= tmpMonth - 1<span style="color: #000000;">;
        dayV </span>= <span style="color: #0000ff;">this</span><span style="color: #000000;">.getMaxDay(tmpYear, tmpMonth);
      }
      </span><span style="color: #0000ff;">if</span> ((tmpMonth == 0 || tmpMonth == 1) &amp;&amp; !(tmpDay == 0 || tmpDay == 1<span style="color: #000000;">)) {
        dayV </span>= tmpDay - 1<span style="color: #000000;">;
      }
      </span><span style="color: #0000ff;">if</span> (!(tmpMonth == 0 || tmpMonth == 1) &amp;&amp; !(tmpDay == 0 || tmpDay == 1<span style="color: #000000;">)) {
        dayV </span>= tmpDay - 1<span style="color: #000000;">;
      }
      </span><span style="color: #0000ff;">this</span>.yearsModel =<span style="color: #000000;"> yearV;
      </span><span style="color: #0000ff;">this</span>.monthsModel =<span style="color: #000000;"> monthV;
      </span><span style="color: #0000ff;">this</span>.daysModel =<span style="color: #000000;"> dayV;
    },
    dayright() {

      </span><span style="color: #0000ff;">var</span> myDate = <span style="color: #0000ff;">new</span><span style="color: #000000;"> Date;
      </span><span style="color: #0000ff;">var</span> year = myDate.getFullYear();<span style="color: #008000;">//</span><span style="color: #008000;">获取当前年</span>
      <span style="color: #0000ff;">var</span> month = myDate.getMonth() + 1;<span style="color: #008000;">//</span><span style="color: #008000;">获取当前月</span>
      <span style="color: #0000ff;">var</span> day = myDate.getDate();<span style="color: #008000;">//</span><span style="color: #008000;">获取当前日</span>

      <span style="color: #0000ff;">var</span> tmpYear = <span style="color: #0000ff;">this</span><span style="color: #000000;">.yearsModel;
      </span><span style="color: #0000ff;">var</span> tmpMonth = <span style="color: #0000ff;">this</span><span style="color: #000000;">.monthsModel;
      </span><span style="color: #0000ff;">var</span> tmpDay = <span style="color: #0000ff;">this</span><span style="color: #000000;">.daysModel;

      </span><span style="color: #0000ff;">if</span> (tmpYear == <span style="color: #0000ff;">null</span><span style="color: #000000;">) {
        </span><span style="color: #0000ff;">var</span> myDate = <span style="color: #0000ff;">new</span><span style="color: #000000;"> Date;
        </span><span style="color: #0000ff;">var</span> year = myDate.getFullYear();<span style="color: #008000;">//</span><span style="color: #008000;">获取当前年</span>
        <span style="color: #0000ff;">var</span> month = myDate.getMonth() + 1;<span style="color: #008000;">//</span><span style="color: #008000;">获取当前月</span>
        <span style="color: #0000ff;">var</span> day = myDate.getDate();<span style="color: #008000;">//</span><span style="color: #008000;">获取当前日</span>
        <span style="color: #0000ff;">this</span>.yearsModel =<span style="color: #000000;"> year;
        </span><span style="color: #0000ff;">this</span>.monthsModel =<span style="color: #000000;"> month;
        </span><span style="color: #0000ff;">this</span>.daysModel =<span style="color: #000000;"> day;
        </span><span style="color: #0000ff;">return</span><span style="color: #000000;">;
      }

      </span><span style="color: #0000ff;">if</span> (tmpMonth == <span style="color: #0000ff;">null</span>) { tmpMonth = 0<span style="color: #000000;"> }
      </span><span style="color: #0000ff;">if</span> (tmpDay == <span style="color: #0000ff;">null</span>) { tmpDay = 0<span style="color: #000000;"> }
      </span><span style="color: #0000ff;">if</span> (tmpYear &gt;<span style="color: #000000;"> year) {
        </span><span style="color: #0000ff;">this</span>.yearsModel =<span style="color: #000000;"> year;
        </span><span style="color: #0000ff;">this</span>.monthsModel =<span style="color: #000000;"> month;
        </span><span style="color: #0000ff;">this</span>.daysModel =<span style="color: #000000;"> day;
        </span><span style="color: #0000ff;">return</span><span style="color: #000000;">;
      }
      </span><span style="color: #0000ff;">if</span> (tmpYear ==<span style="color: #000000;"> year) {
        </span><span style="color: #0000ff;">if</span> ((tmpMonth &gt; month || tmpMonth == 0) || (tmpMonth == month) &amp;&amp; (tmpDay &gt;= day || tmpDay == 0<span style="color: #000000;">)) {
          </span><span style="color: #0000ff;">this</span>.yearsModel =<span style="color: #000000;"> year;
          </span><span style="color: #0000ff;">this</span>.monthsModel =<span style="color: #000000;"> month;
          </span><span style="color: #0000ff;">this</span>.daysModel =<span style="color: #000000;"> day;
          </span><span style="color: #0000ff;">return</span><span style="color: #000000;">;
        }
      }

      </span><span style="color: #0000ff;">var</span> maxDay = <span style="color: #0000ff;">this</span><span style="color: #000000;">.getMaxDay(tmpYear, tmpMonth);
      </span><span style="color: #0000ff;">var</span> yearV =<span style="color: #000000;"> tmpYear;
      </span><span style="color: #0000ff;">var</span> monthV =<span style="color: #000000;"> tmpMonth;
      </span><span style="color: #0000ff;">var</span> dayV =<span style="color: #000000;"> tmpDay;

      </span><span style="color: #0000ff;">if</span> ((tmpMonth == 0 || tmpMonth == 12) &amp;&amp; (tmpDay == 0 || tmpDay ==<span style="color: #000000;"> maxDay)) {
        yearV </span>= tmpYear + 1; monthV = 1<span style="color: #000000;">;
        dayV </span>= 1<span style="color: #000000;">;
      }
      </span><span style="color: #0000ff;">if</span> (!(tmpMonth == 0 || tmpMonth == 12) &amp;&amp; (tmpDay == 0 || tmpDay ==<span style="color: #000000;"> maxDay)) {
        monthV </span>= tmpMonth + 1<span style="color: #000000;">;
        dayV </span>= 1<span style="color: #000000;">;
      }
      </span><span style="color: #0000ff;">if</span> (!(tmpMonth == 0 || tmpMonth == 12) &amp;&amp; !(tmpDay == 0 || tmpDay ==<span style="color: #000000;"> maxDay)) {
        dayV </span>= tmpDay + 1<span style="color: #000000;">;
      }

      </span><span style="color: #0000ff;">this</span>.yearsModel =<span style="color: #000000;"> yearV;
      </span><span style="color: #0000ff;">this</span>.monthsModel =<span style="color: #000000;"> monthV;
      </span><span style="color: #0000ff;">this</span>.daysModel =<span style="color: #000000;"> dayV;

    },
    getMaxDay(year, month) {
      </span><span style="color: #0000ff;">var</span> new_year = year;  <span style="color: #008000;">//</span><span style="color: #008000;">取当前的年份</span>
      <span style="color: #0000ff;">var</span> new_month = month++;<span style="color: #008000;">//</span><span style="color: #008000;">取下一个月的第一天，方便计算（最后一天不固定）</span>
      <span style="color: #0000ff;">if</span> (month &gt; 12)      <span style="color: #008000;">//</span><span style="color: #008000;">如果当前大于12月，则年份转到下一年</span>
<span style="color: #000000;">      {
        new_month </span>-= 12;    <span style="color: #008000;">//</span><span style="color: #008000;">月份减</span>
        new_year++;      <span style="color: #008000;">//</span><span style="color: #008000;">年份增</span>
<span style="color: #000000;">      }
      </span><span style="color: #0000ff;">var</span> new_date = <span style="color: #0000ff;">new</span> Date(new_year, new_month, 1);<span style="color: #008000;">//</span><span style="color: #008000;">取当年当月中的第一天</span>
      <span style="color: #0000ff;">return</span> (<span style="color: #0000ff;">new</span> Date(new_date.getTime() - 1000 * 60 * 60 * 24)).getDate();<span style="color: #008000;">//</span><span style="color: #008000;">获取当月最后一天日期</span>
<span style="color: #000000;">    }
  }
}
</span>&lt;/script&gt;</pre>
</div>
<p>&nbsp;</p>