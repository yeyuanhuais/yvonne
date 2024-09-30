<h2>1.通过state传参(HashRouter会丢失，BrowserRouter不会丢失)</h2>
<p>传参页面</p>
<div class="cnblogs_code">
<pre>import { useNavigate } from "react-router-dom"<span style="color: #000000;">;

const navigate </span>=<span style="color: #000000;"> useNavigate()

navigate(</span>"/home",{state:{id:123}})</pre>
</div>
<p>接收页面</p>
<div class="cnblogs_code">
<pre>import { useLocation } from 'react-router-dom'<span style="color: #000000;">;

const location </span>=<span style="color: #000000;"> useLocation()

const back </span>= () =&gt;<span style="color: #000000;"> {
    console.log(location.state.id) </span><span style="color: #008000;">//</span><span style="color: #008000;">打印结果为123</span>
}</pre>
</div>
<p>由于state刷新后值还存在，有时需要删除值</p>
<div class="cnblogs_code">
<pre>useEffect(() =&gt;<span style="color: #000000;"> {
    </span><span style="color: #0000ff;">if</span> (location.state?<span style="color: #000000;">.id) {
      form.setFieldsValue({ id: location.state.id});
      let state </span>=<span style="color: #000000;"> { ...location.state };
      </span><span style="color: #0000ff;">delete</span><span style="color: #000000;"> state.id;</span></pre>
<div>&nbsp; &nbsp; &nbsp; &nbsp; navigate<span>({ ...location, state });</span></div>
<pre><em id="__mceDel"><span style="color: #000000;">    }
  }, [form, history, location]);</span></em></pre>
</div>
<h2 data-id="heading-2">2. 问号（？）形式传参（跳转新标签页只能用此携带参数）</h2>
<p>传参页面</p>
<div class="cnblogs_code">
<pre>import { useNavigate, createSearchParams&nbsp;} from "react-router-dom"<span>;</span></pre>
<pre><em id="__mceDel"><span style="color: #000000;">
const navigate </span>=<span style="color: #000000;"> useNavigate()

navigate(</span>"/home?id=123")</em></pre>
<pre class="hljs language-arcade">navigate({
    <span class="hljs-attr">pathname: <span class="hljs-string">"/</span></span>home<span class="hljs-attr"><span class="hljs-string">", <span class="hljs-attr">search: <span class="hljs-string">`?id=<span class="hljs-subst">123<span class="hljs-subst">` <br />})<br /><br /></span></span></span></span></span></span></pre>
<pre class="hljs language-arcade">navigate({
    <span class="hljs-attr">pathname: <span class="hljs-string">"/home",
    <span class="hljs-attr">search: <span class="hljs-string">`?<span class="hljs-subst">${createSearchParams({id:123})}`
})</span></span></span></span></span></pre>
<pre class="hljs language-arcade"><span class="hljs-attr"><span class="hljs-string"><span class="hljs-attr"><span class="hljs-string"><span class="hljs-subst"><span class="hljs-subst">&nbsp;</span></span></span></span></span></span></pre>
</div>
<p>接收页面</p>
<div class="cnblogs_code">
<pre>import { useSearchParams } from "react-router-dom"<span style="color: #000000;">;

const [searchParams, setSearchParams] </span>=<span style="color: #000000;"> useSearchParams();

const back </span>= () =&gt;<span style="color: #000000;"> {
    console.log(searchParams.getAll(</span>'id')[0])  <span style="color: #008000;">//</span><span style="color: #008000;">打印结果为 123</span>
<span style="color: #000000;">    setSearchParams();  
}</span></pre>
</div>
<h2>3.params传参 (restful格式)，需要在Route上显示写明 :params</h2>
<p>传参页面</p>
<div class="cnblogs_code">
<pre>import { useNavigate } from "react-router-dom"<span style="color: #000000;">;  

</span>&lt;Route path={'/home/:id'} element={&lt;ToPage/&gt;} /&gt;<span style="color: #000000;">

navigate(`</span>/home/${id}`)</pre>
</div>
<p>接收页面</p>
<div class="cnblogs_code">
<pre>import { useParams } from "react-router-dom"<span style="color: #000000;">;

const ToPages </span>= () =&gt;<span style="color: #000000;"> {
const { id } </span>=<span style="color: #000000;"> useParams();
console.log(id)
}</span></pre>
</div>
<h2>&nbsp;</h2>
<h2>&nbsp;</h2>