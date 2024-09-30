<p><span style="font-size: 16px;">1.<span class="token function"><span style="background-color: #7e9db5; color: #ffffff;">npm i -g typeorm-model-generator</span> 或者 <span style="background-color: #7e9db5; color: #ffffff;">yarn global add&nbsp;typeorm-model-generator</span></span></span></p>
<p><span class="token function" style="font-size: 16px;">2.修改项目中的<span style="background-color: #7e9db5; color: #ffffff;"> package.json</span> 文件</span></p>
<div class="cnblogs_code">
<pre><span style="font-size: 16px;">"scripts"<span style="color: #000000;">: {
  </span>"db": "rimraf ./src/modules/entities &amp; npx typeorm-model-generator -h 121.36.70.68 -d chat -p 3306 -u root -x 123456 -e mysql -o ./src/modules/entities --noConfig true --ce pascal --cp camel"<span style="color: #000000;">
}</span></span></pre>
</div>
<ul>
<li><span style="font-size: 16px;"><code>rm -rf entities</code>表示先删除文件夹<code><code>entities（window下使用&nbsp;rimraf&nbsp;entities&nbsp;</code></code><code>）</code></span></li>
<li><span style="font-size: 16px;"><code>npx typeorm-model-generator</code>如果全局安装了就不需要加<code>npx</code>没有全局安装就加上去</span></li>
</ul>
<ul>
<li><span style="font-size: 16px;"><code>-h localhost -d 数据库名字 -p 端口 -u 用户名 -x 密码 -e 数据库类型</code></span></li>
<li><span style="font-size: 16px;"><code>-o entities</code>表示输出到指定的文件夹</span></li>
<li><span style="font-size: 16px;"><code>--noConfig true</code>表示不生成<code>ormconfig.json</code>和<code>tsconfig.json</code>文件</span></li>
<li><span style="font-size: 16px;"><code>--ce pascal</code>表示将类名转换首字母是大写的驼峰命名</span></li>
<li><span style="font-size: 16px;"><code>--cp camel</code>表示将数据库中的字段比如<code>create_at</code>转换为<code>createAt</code></span></li>
<li><span style="font-size: 16px;"><code>-a</code>表示会继承一个<code>BaseEntity</code>的类,根据自己需求加</span></li>
</ul>
<p><span style="font-size: 16px;">3.运行代码&nbsp;<span class="token function"><span style="color: #ffffff; background-color: #7e9db5;">npm run db</span> 或 <span style="color: #ffffff; background-color: #7e9db5;">yarn run db</span></span></span></p>
<p><span style="font-size: 16px;">&nbsp;</span></p>
<p><span style="font-size: 16px;">遇到报错</span></p>
<div class="cnblogs_code" onclick="cnblogs_code_show('30628442-9fc1-4826-9a62-7c14e9e156ae')"><img src="./imagesContractedBlock.gif" id="code_img_closed_30628442-9fc1-4826-9a62-7c14e9e156ae" class="code_img_closed" /><img src="./imagesExpandedBlockStart.gif" id="code_img_opened_30628442-9fc1-4826-9a62-7c14e9e156ae" class="code_img_opened" style="display: none;" />
<div id="cnblogs_code_open_30628442-9fc1-4826-9a62-7c14e9e156ae" class="cnblogs_code_hide">
<pre>D:\YYH\nest\project-name\chat-server&gt;<span style="color: #000000;">yarn run db                               
yarn run v1.</span>22.10<span style="color: #000000;">
$ rimraf entities </span>&amp; npx typeorm-model-generator -h 121.36.70.68 -d chat -p 3306 -u root -x 123456 -e mysql -o entities --noConfig <span style="color: #0000ff;">true</span> --ce pascal --<span style="color: #000000;">cp camel 
typeorm</span>-model-generator@0.4.3<span style="color: #000000;">
[</span>10:39:07<span style="color: #000000;"> ├F10: AM┤] Starting creation of model classes.
Table friend_message has no PK.
Error occurred </span><span style="color: #0000ff;">in</span> typeorm-model-<span style="color: #000000;">generator.
typeorm</span>-model-generator@0.4.3  node@v12.18.4<span style="color: #000000;">
If you think </span><span style="color: #0000ff;">this</span> is a bug please open an issue including <span style="color: #0000ff;">this</span> log on https:<span style="color: #008000;">//</span><span style="color: #008000;">github.com/Kononnable/typeorm-model-generator/issues</span>
<span style="color: #000000;">Table user_friend has no PK.
Error occurred </span><span style="color: #0000ff;">in</span> typeorm-model-<span style="color: #000000;">generator.
typeorm</span>-model-generator@0.4.3  node@v12.18.4<span style="color: #000000;">
If you think </span><span style="color: #0000ff;">this</span> is a bug please open an issue including <span style="color: #0000ff;">this</span> log on https:<span style="color: #008000;">//</span><span style="color: #008000;">github.com/Kononnable/typeorm-model-generator/issues</span>
<span style="color: #000000;">Table user_group has no PK.
Error occurred </span><span style="color: #0000ff;">in</span> typeorm-model-<span style="color: #000000;">generator.
typeorm</span>-model-generator@0.4.3  node@v12.18.4<span style="color: #000000;">
If you think </span><span style="color: #0000ff;">this</span> is a bug please open an issue including <span style="color: #0000ff;">this</span> log on https:<span style="color: #008000;">//</span><span style="color: #008000;">github.com/Kononnable/typeorm-model-generator/issues</span>
<span style="color: #000000;">Table group has no PK.
Error occurred </span><span style="color: #0000ff;">in</span> typeorm-model-<span style="color: #000000;">generator.
typeorm</span>-model-generator@0.4.3  node@v12.18.4<span style="color: #000000;">
If you think </span><span style="color: #0000ff;">this</span> is a bug please open an issue including <span style="color: #0000ff;">this</span> log on https:<span style="color: #008000;">//</span><span style="color: #008000;">github.com/Kononnable/typeorm-model-generator/issues</span>
[10:39:08<span style="color: #000000;"> ├F10: AM┤] Typeorm model classes created.
Done </span><span style="color: #0000ff;">in</span> 4.54s.</pre>
</div>
<span class="cnblogs_code_collapse">View Code</span></div>
<p>解决办法：数据库表字段没有设置主键</p>