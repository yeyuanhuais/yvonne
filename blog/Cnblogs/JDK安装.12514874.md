<ol>
<li>oracle的jdk下载需要登录，<a href="https://blog.csdn.net/qq_40298231/article/details/98485608">https://blog.csdn.net/qq_40298231/article/details/98485608</a></li>
<li>安装JDK，傻瓜式操作</li>
<li>配置环境变量</li>
</ol>
<p>　　　　右击&ldquo;我的电脑&rdquo;--&gt;"属性"--&gt;"高级系统设置"--&gt;"高级"--&gt;"环境变量"&nbsp;</p>
<ul>
<li style="list-style-type: none;">
<ul>
<li>　　在系统变量里新建"JAVA_HOME"变量，变量值为：C:\Program Files\Java\jdk1.8.0_241（JDK的安装路径）；</li>
<li>　　在系统变量里新建"classpath"变量</li>
</ul>
</li>
</ul>
<pre>　　　　　　　<span style="font-size: 15px;">　.;%JAVA_HOME%\lib;%JAVA_HOME%\lib\tools.jar<br /></span></pre>
<ul>
<li style="list-style-type: none;">
<ul>
<li>　　找到path变量（已存在不用新建）添加变量值（win10直接新建不需要加；）</li>
</ul>
</li>
</ul>
<p>　　　　　　　　%JAVA_HOME%\bin;%JAVA_HOME%\jre\bin</p>
<p>　　　　　　<img src="./images/1798975-20200318040242309-1908799030.png" alt="" /></p>
<p>&nbsp;</p>
<p>&nbsp;</p>
<p>&nbsp;　　　　　　<img src="./images/1798975-20200318040413290-1909941043.png" alt="" /></p>
<p>&nbsp;</p>
<p>　　　　　　　<img src="./images/1798975-20200318040709902-72178962.png" alt="" /></p>
<p>&nbsp;</p>
<p>&nbsp;</p>
<p>&nbsp;</p>
<p>　　4.&nbsp; &nbsp;&nbsp;测试是否成功</p>
<p>　　　　java -version</p>
<p>　　　　&nbsp;<img src="./images/1798975-20200318041140035-693391046.png" alt="" /></p>
<p>&nbsp;</p>
<p>&nbsp;</p>
<h3><span style="background-color: #99cc00;">打开cmd,输入java，java -version没有问题，但是javac提示不是内部命令</span></h3>
<p><span style="background-color: #99cc00;"><img src="./images/1798975-20200318042425522-304995721.png" alt="" /></span></p>
<p>&nbsp;</p>
<p><span style="background-color: #99cc00;"></span></p>
<p>&nbsp;<img src="./images/1798975-20200318042438479-1198790073.png" alt="" /></p>
<p>&nbsp;</p>
<p>&nbsp;<img src="./images/1798975-20200318042450313-111204381.png" alt="" /></p>
<p>&nbsp;</p>
<ul>
<li>&nbsp;找到java安装下的bin目录，运行cmd,输入javac，能提示，说明环境配置有问题</li>
</ul>
<p>&nbsp;<a href="https://blog.csdn.net/qq_40670946/article/details/90200364">https://blog.csdn.net/qq_40670946/article/details/90200364</a>参考此处</p>