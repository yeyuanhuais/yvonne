<h1 style="text-align: center;">&nbsp;uniapp中使用colorUI</h1>
<h2 style="text-align: left;">1.开始</h2>
<p>　　下载源码解压获得<code>/Colorui-UniApp</code>文件夹，复制目录下的&nbsp;<code>/colorui</code>&nbsp;文件夹到你的项目根目录</p>
<p><code>　　App.vue</code>&nbsp;引入关键Css&nbsp;<code>main.css</code>&nbsp;<code>icon.css</code></p>
<div class="cnblogs_code">
<pre>&lt;style&gt;
    <span style="color: #008000;">/*</span><span style="color: #008000;"> 引入colorui主体 </span><span style="color: #008000;">*/</span><span style="color: #000000;">
    @import </span>"colorui/main.css"<span style="color: #000000;">;
    </span><span style="color: #008000;">/*</span><span style="color: #008000;"> 引入colorui图标类资源 </span><span style="color: #008000;">*/</span><span style="color: #000000;">
    @import </span>"colorui/icon.css"<span style="color: #000000;">;
</span>&lt;/style&gt;</pre>
</div>
<p>&nbsp;</p>
<h2>2.使用自定义导航栏</h2>
<p><code>　　（1）App.vue</code>&nbsp;获得系统信息</p>
<div class="cnblogs_code">
<pre>onLaunch: <span style="color: #0000ff;">function</span><span style="color: #000000;">() {
    uni.getSystemInfo({
        success: </span><span style="color: #0000ff;">function</span><span style="color: #000000;">(e) {
            </span><span style="color: #008000;">//</span><span style="color: #008000;"> #ifndef MP</span>
            Vue.prototype.StatusBar =<span style="color: #000000;"> e.statusBarHeight;
            </span><span style="color: #0000ff;">if</span> (e.platform == 'android'<span style="color: #000000;">) {
                Vue.prototype.CustomBar </span>= e.statusBarHeight + 50<span style="color: #000000;">;
            } </span><span style="color: #0000ff;">else</span><span style="color: #000000;"> {
                Vue.prototype.CustomBar </span>= e.statusBarHeight + 45<span style="color: #000000;">;
            };
            </span><span style="color: #008000;">//</span><span style="color: #008000;"> #endif</span>
            <span style="color: #008000;">//</span><span style="color: #008000;"> #ifdef MP-WEIXIN</span>
            Vue.prototype.StatusBar =<span style="color: #000000;"> e.statusBarHeight;
            let custom </span>=<span style="color: #000000;"> wx.getMenuButtonBoundingClientRect();
            Vue.prototype.Custom </span>=<span style="color: #000000;"> custom;
            Vue.prototype.CustomBar </span>= custom.bottom + custom.top -<span style="color: #000000;"> e.statusBarHeight;
            </span><span style="color: #008000;">//</span><span style="color: #008000;"> #endif        </span>
            <span style="color: #008000;">//</span><span style="color: #008000;"> #ifdef MP-ALIPAY</span>
            Vue.prototype.StatusBar =<span style="color: #000000;"> e.statusBarHeight;
            Vue.prototype.CustomBar </span>= e.statusBarHeight +<span style="color: #000000;"> e.titleBarHeight;
            </span><span style="color: #008000;">//</span><span style="color: #008000;"> #endif</span>
<span style="color: #000000;">        }
    })
},</span></pre>
</div>
<p><code>　　（2）pages.json</code>&nbsp;配置取消系统导航栏</p>
<div class="cnblogs_code">
<pre>"globalStyle"<span style="color: #000000;">: {
    </span>"navigationStyle": "custom"<span style="color: #000000;">
},</span></pre>
</div>
<p>&nbsp;　　（3）使用封装,在<code>main.js</code>&nbsp;引入&nbsp;<code>cu-custom</code>&nbsp;组件。</p>
<div class="cnblogs_code">
<pre>import cuCustom from './colorui/components/cu-custom.vue'<span style="color: #000000;">
Vue.component(</span>'cu-custom',cuCustom)</pre>
</div>
<p>　　（4）就可以直接在页面中使用</p>
<div class="cnblogs_code">
<pre>&lt;cu-custom bgColor="bg-gradual-blue" :isBack="true"&gt;&lt;view slot="backText"&gt;返回&lt;/view&gt;&lt;view slot="content"&gt;图标&lt;/view&gt;&lt;/cu-custom&gt;</pre>
</div>
<p><img src="./images/1798975-20200818104623505-1300130016.png" alt="" loading="lazy" /></p>
<h2>3.flex布局( "|"表示或，后面涉及同理 )</h2>
<p>父级容器的class需要加入<span style="font-size: 16px;"><strong>flex</strong></span></p>
<p>　　（1）固定尺寸（ 在class中加入<span style="font-size: 16px;"><strong>basis-xs|sm|sub|lg|xl</strong></span>&nbsp; &nbsp; ）</p>
<p>　　　　<img src="./images/1798975-20200818104747679-527896506.png" alt="" loading="lazy" /></p>
<div class="cnblogs_code">
<pre><span style="color: #000000;">例如：
                </span>&lt;view class="flex flex-wrap"&gt;
                    &lt;view class="basis-xs bg-grey margin-xs padding-sm radius"&gt;xs(20%)&lt;/view&gt;
                    &lt;view class="basis-df"&gt;&lt;/view&gt;
                    &lt;view class="basis-sm bg-grey margin-xs padding-sm radius"&gt;sm(40%)&lt;/view&gt;
                    &lt;view class="basis-df"&gt;&lt;/view&gt;
                    &lt;view class="basis-df bg-grey margin-xs padding-sm radius"&gt;sub(50%)&lt;/view&gt;
                    &lt;view class="basis-lg bg-grey margin-xs padding-sm radius"&gt;lg(60%)&lt;/view&gt;
                    &lt;view class="basis-xl bg-grey margin-xs padding-sm radius"&gt;xl(80%)&lt;/view&gt;
                &lt;/view&gt;</pre>
</div>
<p>　　（2）比例布局（在class中加入<span style="font-size: 16px;"><strong>flex-sub|twice|treble</strong></span>）</p>
<p>　　　　<img src="./images/1798975-20200818110144908-1992936093.png" alt="" loading="lazy" /></p>
<div class="cnblogs_code">
<pre><span style="color: #000000;">例如：
</span><span style="color: #ff6600;">1:1</span>
                &lt;view class="flex"&gt;
                    &lt;view class="flex-sub bg-grey padding-sm margin-xs radius"&gt;1&lt;/view&gt;
                    &lt;view class="flex-sub bg-grey padding-sm margin-xs radius"&gt;1&lt;/view&gt;
                &lt;/view&gt;
<span style="color: #ff6600;">1:2</span>
                &lt;view class="flex  p-xs margin-bottom-sm mb-sm"&gt;
                    &lt;view class="flex-sub bg-grey padding-sm margin-xs radius"&gt;1&lt;/view&gt;
                    &lt;view class="flex-twice bg-grey padding-sm margin-xs radius"&gt;2&lt;/view&gt;
                &lt;/view&gt;
<span style="color: #ff6600;">1:2:3</span>
                &lt;view class="flex  p-xs margin-bottom-sm mb-sm"&gt;
                    &lt;view class="flex-sub bg-grey padding-sm margin-xs radius"&gt;1&lt;/view&gt;
                    &lt;view class="flex-twice bg-grey padding-sm margin-xs radius"&gt;2&lt;/view&gt;
                    &lt;view class="flex-treble bg-grey padding-sm margin-xs radius"&gt;3&lt;/view&gt;
                &lt;/view&gt;</pre>
</div>
<p>　　（3）水平对齐（父容器的class中加入<span style="font-size: 16px;"><strong>justify-start|end|center|between|around</strong></span>）</p>
<p>　　　　<img src="./images/1798975-20200818110916980-1528474258.png" alt="" loading="lazy" /></p>
<div class="cnblogs_code">
<pre><span style="color: #000000;">例如：
                </span>&lt;view class="flex solid-bottom padding justify-start"&gt;
                    &lt;view class="bg-grey padding-sm margin-xs radius"&gt;start&lt;/view&gt;
                    &lt;view class="bg-grey padding-sm margin-xs radius"&gt;start&lt;/view&gt;
                &lt;/view&gt;
                &lt;view class="flex solid-bottom padding justify-end"&gt;
                    &lt;view class="bg-grey padding-sm margin-xs radius"&gt;end&lt;/view&gt;
                    &lt;view class="bg-grey padding-sm margin-xs radius"&gt;end&lt;/view&gt;
                &lt;/view&gt;
                &lt;view class="flex solid-bottom padding justify-center"&gt;
                    &lt;view class="bg-grey padding-sm margin-xs radius"&gt;center&lt;/view&gt;
                    &lt;view class="bg-grey padding-sm margin-xs radius"&gt;center&lt;/view&gt;
                &lt;/view&gt;
                &lt;view class="flex solid-bottom padding justify-between"&gt;
                    &lt;view class="bg-grey padding-sm margin-xs radius"&gt;between&lt;/view&gt;
                    &lt;view class="bg-grey padding-sm margin-xs radius"&gt;between&lt;/view&gt;
                &lt;/view&gt;
                &lt;view class="flex solid-bottom padding justify-around"&gt;
                    &lt;view class="bg-grey padding-sm margin-xs radius"&gt;around&lt;/view&gt;
                    &lt;view class="bg-grey padding-sm margin-xs radius"&gt;around&lt;/view&gt;
                &lt;/view&gt;</pre>
</div>
<p>　　（4）垂直对齐（父容器的class中加入<strong>align-start|end|center</strong>）</p>
<p>　　　　<img src="./images/1798975-20200818111328626-2012183691.png" alt="" loading="lazy" /></p>
<div class="cnblogs_code">
<pre><span style="color: #000000;">例如：
                </span>&lt;view class="flex solid-bottom padding align-start"&gt;
                    &lt;view class="bg-grey padding-lg margin-xs radius"&gt;ColorUi&lt;/view&gt;
                    &lt;view class="bg-grey padding-sm margin-xs radius"&gt;start&lt;/view&gt;
                &lt;/view&gt;
                &lt;view class="flex solid-bottom padding align-end"&gt;
                    &lt;view class="bg-grey padding-lg margin-xs radius"&gt;ColorUi&lt;/view&gt;
                    &lt;view class="bg-grey padding-sm margin-xs radius"&gt;end&lt;/view&gt;
                &lt;/view&gt;
                &lt;view class="flex solid-bottom padding align-center"&gt;
                    &lt;view class="bg-grey padding-lg margin-xs radius"&gt;ColorUi&lt;/view&gt;
                    &lt;view class="bg-grey padding-sm margin-xs radius"&gt;center&lt;/view&gt;
                &lt;/view&gt;</pre>
</div>
<p>&nbsp;</p>
<h2>4.Grid布局</h2>
<p>　　（1）等分列（class加入<span style="font-size: 16px;"><strong>grid col-1|2|3|...</strong></span>）</p>
<p>　　　　<img src="./images/1798975-20200818111657072-875861402.png" alt="" loading="lazy" /></p>
<p>　　　　<img src="./images/1798975-20200818112837149-2130521841.png" alt="" loading="lazy" /></p>
<div class="cnblogs_code">
<pre>                &lt;view class="grid margin-bottom text-center" v-<span style="color: #0000ff;">for</span>="(item,index) in 5"<span style="color: #000000;">
                 :key</span>="index" :class="'col-' + (index+1)"&gt;
                    &lt;view class="padding" :class="indexs%2==0?'bg-cyan':'bg-blue'"<span style="color: #000000;">
                     v</span>-<span style="color: #0000ff;">for</span>="(item,indexs) in (index+1)*2" :key="indexs"&gt;<span style="color: #000000;">
                     {{indexs</span>+1<span style="color: #000000;">}}
                    </span>&lt;/view&gt;
                &lt;/view&gt;</pre>
</div>
<p>　　自己试用：<img src="./images/1798975-20200818112715861-2056531567.png" alt="" loading="lazy" /></p>
<div class="cnblogs_code">
<pre>        &lt;view class="grid margin-bottom text-center col-5"&gt;
            &lt;view class="padding bg-cyan"&gt;{{1}}&lt;/view&gt;
            &lt;view class="padding bg-cyan"&gt;{{2}}&lt;/view&gt;
            &lt;view class="padding bg-cyan"&gt;{{3}}&lt;/view&gt;
        &lt;/view&gt;</pre>
</div>
<p>　　（2）等高(在class中加入<span style="font-size: 16px;"><strong>grid col-4|5|... grid-square</strong></span>)</p>
<p>　　　　<img src="./images/1798975-20200818112946301-1422219558.png" alt="" loading="lazy" /></p>
<div class="cnblogs_code">
<pre>　　　　　　　　　　&lt;view class="grid col-4 grid-square"&gt;                    <br />　　　　　　　　　　　　&lt;view class="bg-img" v-for="(item,index) in avatar"
                     :key="index"
                     :style="[{ backgroundImage:'url(' + avatar[index] + ')' }]"&gt;&lt;/view&gt;<br />　　　　　　　　　　&lt;/view&gt;

data(){return{
avatar:['https://ossweb-img.qq.com/images/lol/web201310/skin/big10001.jpg',
'https://ossweb-img.qq.com/images/lol/web201310/skin/big81005.jpg',
'https://ossweb-img.qq.com/images/lol/web201310/skin/big25002.jpg',
'https://ossweb-img.qq.com/images/lol/web201310/skin/big99008.jpg']
}}</pre>

</div>
<h2>&nbsp;5.辅助布局</h2>
<p>　　（1）浮动（在class加入<span style="font-size: 16px;"><strong>fl|fr</strong></span>,在父容器class加入<span style="font-size: 16px;"><strong>cf</strong></span>）</p>
<p>　　　　<img src="./images/1798975-20200818114236032-654605673.png" alt="" loading="lazy" /></p>
<p>&nbsp;　　(2)内外边距</p>
<p>　　　　<span style="font-size: 16px;"><strong>size=xs|sm|df|lg|xl</strong></span></p>
<table style="height: 458px; width: 448px;" border="0" cellspacing="3" cellpadding="3" align="left">
<tbody>
<tr>
<td>外边距</td>
<td>margin-{size}</td>
</tr>
<tr>
<td>内边距　</td>
<td>padding-{size}</td>
</tr>
<tr>
<td>水平方向外边距</td>
<td>margin-lr-{size}</td>
</tr>
<tr>
<td>水平方向内边距</td>
<td>padding-lr-{size}</td>
</tr>
<tr>
<td>垂直方向外边距</td>
<td>margin-tb-{size}</td>
</tr>
<tr>
<td>垂直方向内边距</td>
<td>padding-tb-{size}</td>
</tr>
<tr>
<td>上外边距</td>
<td>margin-top-{size}</td>
</tr>
<tr>
<td>上内边距</td>
<td>padding-top-{size}</td>
</tr>
<tr>
<td>右外边距</td>
<td>margin-right-{size}</td>
</tr>
<tr>
<td style="text-align: left;">右内边距</td>
<td>padding-right-{size}</td>
</tr>
<tr>
<td>下外边距</td>
<td>margin-bottom-{size}</td>
</tr>
<tr>
<td>下内边距</td>
<td>padding-bottom-{size}</td>
</tr>
<tr>
<td>左外边距</td>
<td>margin-left-{size}</td>
</tr>
<tr>
<td>左内边距</td>
<td>padding-left-{size}</td>
</tr>
</tbody>
</table>
<p style="text-align: left;"><span style="font-size: 16px;"><strong>&nbsp;</strong></span></p>
<p style="text-align: left;">&nbsp;</p>
<p style="text-align: left;">&nbsp;</p>
<p style="text-align: left;">&nbsp;</p>
<p style="text-align: left;">&nbsp;</p>
<p style="text-align: left;">&nbsp;</p>
<p style="text-align: left;">&nbsp;</p>
<p style="text-align: left;">&nbsp;</p>
<p style="text-align: left;">&nbsp;</p>
<p style="text-align: left;">&nbsp;</p>
<p style="text-align: left;">&nbsp;</p>
<p style="text-align: left;">&nbsp;</p>
<p style="text-align: left;">&nbsp;</p>
<p style="text-align: left;">&nbsp;</p>
<p style="text-align: left;">&nbsp;</p>
<h2 style="text-align: left;">&nbsp;</h2>
<h2 style="text-align: left;">&nbsp;</h2>
<h2 style="text-align: left;"><strong>6.图标（在class上添加 cuIcon-pepole|check|...）</strong></h2>
<p><strong>例如</strong></p>
<div class="cnblogs_code">
<pre>&lt;text class="cuIcon-people"&gt;&lt;/text&gt;</pre>
</div>
<p style="text-align: left;"><span style="font-size: 16px;"><strong><img src="./images/1798975-20200818141801184-1482330171.png" alt="" loading="lazy" /></strong><strong><img src="./images/1798975-20200818141317436-733981831.png" alt="" loading="lazy" /><img src="./images/1798975-20200818141344306-1884420028.png" alt="" loading="lazy" /><img src="./images/1798975-20200818141432266-526688410.png" alt="" loading="lazy" /><img src="./images/1798975-20200818141526666-812374326.png" alt="" loading="lazy" /><img src="./images/1798975-20200818141549835-1658160024.png" alt="" loading="lazy" /><img src="./images/1798975-20200818141607409-1949427598.png" alt="" loading="lazy" /><img src="./images/1798975-20200818141623169-1249671115.png" alt="" loading="lazy" /><img src="./images/1798975-20200818141640835-1693903784.png" alt="" loading="lazy" /><img src="./images/1798975-20200818141654462-1163053121.png" alt="" loading="lazy" /><img src="./images/1798975-20200818141710051-1749426932.png" alt="" loading="lazy" /><img src="./images/1798975-20200818141730945-1865277178.png" alt="" loading="lazy" /><img src="./images/1798975-20200818141744426-881732646.png" alt="" loading="lazy" /><img src="./images/1798975-20200818141819451-1230458262.png" alt="" loading="lazy" /></strong></span></p>
<p><img src="./images/1798975-20200818141851577-1521824749.png" alt="" loading="lazy" /></p>
<p>&nbsp;</p>
<h2>&nbsp;7.背景</h2>
<p>　　(1)当想要深色的背景的时候，</p>
<p>　　　　在class中加入<span style="font-size: 16px;"><strong>&nbsp;bg-Red|Orange|...</strong></span></p>
<div class="cnblogs_code">
<pre>　　&lt;view class="padding radius text-center shadow-blur" :class="'bg-' + name"&gt;&lt;/view&gt;<strong style="font-size: 16px; background-color: #ffffff; font-family: 'PingFang SC', 'Helvetica Neue', Helvetica, Arial, sans-serif;">&nbsp;</strong></pre>
</div>
<p>　　<img src="./images/1798975-20200818142133625-1998662362.png" alt="" loading="lazy" /></p>
<p>　　(2)当想要淡色的背景的时候，</p>
<p>　　　　在class中加入<strong>&nbsp;bg-Red|Orange|...，</strong></p>
<p>　　　　在class中再加入 <span style="font-size: 16px;"><strong>light</strong></span></p>
<div class="cnblogs_code">
<pre>　　&lt;view class="padding radius text-center light" :class="'bg-' + name"&gt;&lt;/view&gt;</pre>
</div>
<p>　　<img src="./images/1798975-20200818142154271-639139339.png" alt="" loading="lazy" /></p>
<p>　　(3)当想要渐变的背景的时候，</p>
<p>　　　　在class中加入<strong>&nbsp;bg-gradual-red|orange|...，</strong></p>
<div class="cnblogs_code">
<pre>                &lt;view class="bg-gradual-red padding radius text-center shadow-blur"&gt;
                    &lt;view class="text-lg"&gt;魅红&lt;/view&gt;
                    &lt;view class="margin-top-sm text-Abc"&gt;#f43f3b - #ec008c&lt;/view&gt;
                &lt;/view&gt;</pre>
</div>
<p>　　<img src="./images/1798975-20200818142218727-424980997.png" alt="" loading="lazy" /></p>
<p>　　（4）当想要背景图片的时候，</p>
<p>　　　　在class中加入 <span style="font-size: 16px;"><strong>bg-img bg-mask</strong></span></p>
<div class="cnblogs_code">
<pre>        &lt;view class="bg-img bg-mask flex align-center"<span style="color: #000000;">
         style</span>="background-image: url('https://ossweb-img.qq.com/images/lol/web201310/skin/big10006.jpg');height: 414upx;"&gt;
            &lt;view class="padding-xl text-white"&gt;
                &lt;view class="padding-xs text-xxl text-bold"&gt;<span style="color: #000000;">
                    钢铁之翼
                </span>&lt;/view&gt;
                &lt;view class="padding-xs text-lg"&gt;<span style="color: #000000;">
                    Only the guilty need fear me.
                </span>&lt;/view&gt;
            &lt;/view&gt;
        &lt;/view&gt;</pre>
</div>
<p>　　（5）当文字需要透明背景时</p>
<p>　　　　在class中加入<span style="font-size: 16px;"><strong> bg-shadeBottom|shadeTop</strong></span></p>
<div class="cnblogs_code">
<pre>            &lt;view class="bg-img padding-bottom-xl" style="background-image: url('https://ossweb-img.qq.com/images/lol/web201310/skin/big10007.jpg');height: 207upx;"&gt;
                &lt;view class="bg-shadeTop padding padding-bottom-xl"&gt;<span style="color: #000000;">
                    上面开始
                </span>&lt;/view&gt;
            &lt;/view&gt;
            &lt;view class="bg-img padding-top-xl flex align-end" style="background-image: url('https://ossweb-img.qq.com/images/lol/web201310/skin/big10001.jpg');height: 207upx;"&gt;
                &lt;view class="bg-shadeBottom padding padding-top-xl flex-sub"&gt;<span style="color: #000000;">
                    下面开始
                </span>&lt;/view&gt;
            &lt;/view&gt;</pre>
</div>
<p>　　<img src="./images/1798975-20200818142229048-1330252862.png" alt="" loading="lazy" /></p>
<p>&nbsp;</p>
<h2>&nbsp;8.文字</h2>
<p>&nbsp;　　（1）文字大小</p>
<p>　　　　.text-xsl　　文字大小 60px 用于图标、数字等特大显示</p>
<p>　　　　.text-sl　　&nbsp; 文字大小 40px 用于图标、数字等较大显示</p>
<p>　　　　.text-xxl　　文字大小 22px 用于金额数字等信息</p>
<p>　　　　.text-xl　　&nbsp; 文字大小 18px 页面大标题，用于结果页等单一信息页</p>
<p>　　　　.text-lg　　&nbsp; 文字大小 16px 页面小标题，首要层级显示内容</p>
<p>　　　　.text-df　　&nbsp; 文字大小 14px 页面默认字号，用于摘要或阅读文本</p>
<p>　　　　.text-sm　&nbsp; &nbsp; 文字大小 12px 页面辅助信息，次级内容等</p>
<p>　　　　.text-xs　　 文字大小 10px 说明文本，标签文字等关注度低的文字</p>
<p>　　（2）文字颜色（在class中加入 <span style="font-size: 16px;"><strong>text-red|orange|...</strong></span>）颜色参考7.背景</p>
<p>　　（3）文字阴影（在class中加入&nbsp;<strong><span style="font-size: 16px;">text-shadow</span></strong>）</p>
<p>　　（4）文字截断 ...(在class中加入&nbsp;<strong><span style="font-size: 16px;">text-cut&nbsp;</span> ,要给定容器宽度</strong>)</p>
<p>　　（5）文字对齐（在class中加入<span style="font-size: 16px;">&nbsp;<strong>text-center|left|right</strong></span>)</p>
<p>　　（6）特殊文字</p>
<p>&nbsp;　　　　text-price　　价格￥</p>
<p>　　　　&nbsp;text-Abc　　&nbsp;英文单词首字母大写</p>
<p>　　　　&nbsp;text-abc　　 全部英文字母小写</p>
<p>　　　　&nbsp;text-ABC　&nbsp; &nbsp;全部英文字母大写</p>
<p style="text-align: left;">&nbsp;</p>
<h2>&nbsp;9.按钮</h2>
<p>　　（1）按钮形状</p>
<p>　　　　cu-btn（默认）　　　　cu-btn round（圆角）　　　　cu-btn cuIcon（图标按钮）</p>
<p>　　　　<img src="./images/1798975-20200818152308417-1622322563.png" alt="" loading="lazy" /></p>
<div class="cnblogs_code">
<pre>            &lt;button class="cu-btn"&gt;默认&lt;/button&gt;
            &lt;button class="cu-btn round"&gt;圆角&lt;/button&gt;
            &lt;button class="cu-btn cuIcon"&gt;
                &lt;text class="cuIcon-emojifill"&gt;&lt;/text&gt;
            &lt;/button&gt;</pre>
</div>
<p>　　（2）按钮尺寸</p>
<p>　　　　cu-btn sm（小尺寸）　　　　cu-btn（默认）　　　　cu-btn lg（大尺寸）</p>
<p>　　（3）按钮颜色</p>
<p>　　　　bg-red|...</p>
<p>　　　　阴影&nbsp; &nbsp; &nbsp;&nbsp;shadow</p>
<p>　　（4）按钮镂空</p>
<p>　　　　lines-red|...　　(边框深）　　　　line-red|...　　（边框浅）</p>
<p>　　（5）按钮块状</p>
<p>　　　　cu-btn lg</p>
<p>　　（6）按钮无效</p>
<p>　　　　disabled</p>
<p>　　（7）按钮加图标</p>
<p>　　　　<img src="./images/1798975-20200818160409059-1207782222.png" alt="" loading="lazy" /></p>
<div class="cnblogs_code">
<pre>            &lt;button class="cu-btn block line-orange lg"&gt;
                &lt;text class="cuIcon-upload"&gt;&lt;/text&gt; 图标&lt;/button&gt;
            &lt;button class="cu-btn block bg-blue margin-tb-sm lg"&gt;
                &lt;text class="cuIcon-loading2 cuIconfont-spin"&gt;&lt;/text&gt; 加载&lt;/button&gt;
            &lt;button class="cu-btn block bg-black margin-tb-sm lg" loading&gt; 原生加载&lt;/button&gt;</pre>
</div>
<p>&nbsp;</p>
<p style="text-align: left;">&nbsp;</p>
<p>&nbsp;</p>
<p style="text-align: left;">&nbsp;</p>
<p>&nbsp;</p>
<p style="text-align: left;">&nbsp;</p>
<p>&nbsp;</p>
<p style="text-align: left;">&nbsp;</p>
<p>&nbsp;</p>
<p style="text-align: left;">&nbsp;</p>
<p>&nbsp;</p>
<p style="text-align: left;">&nbsp;</p>
<p>&nbsp;</p>
<p style="text-align: left;">&nbsp;</p>
<p>&nbsp;</p>
<p style="text-align: left;">&nbsp;</p>
<p style="text-align: left;">&nbsp;</p>
<p style="text-align: left;">&nbsp;</p>
<p style="text-align: left;">&nbsp;</p>
<p style="text-align: left;">&nbsp;</p>
<p style="text-align: left;">&nbsp;</p>
<p style="text-align: left;">&nbsp;</p>
