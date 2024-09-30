<div>
<div>
<p>在vue2.0中使用v-html渲染时有可能我门会需要微调一下样式,今天在使用v-html时候发现一个问题，渲染出来的在&lt;style&gt;&lt;/style&gt;中无法直接改变样式。</p>
<div class="image-package">
<div class="image-container">
<div class="image-container-fill">&nbsp;</div>
<div class="image-view" data-width="627" data-height="80"><img src="./images/16877695-71313d6855265ced.webp" alt="" data-original-src="//upload-images.jianshu.io/upload_images/16877695-71313d6855265ced.png" data-original-width="627" data-original-height="80" data-original-format="image/png" data-original-filesize="7336" data-image-index="0" /></div>
</div>
<div class="image-caption">tp.png</div>
</div>
<p>当我们使用v-html渲染页面，使用下面这种方式去修改样式并没有效果，</p>
<div class="image-package">
<div class="image-container">
<div class="image-container-fill">&nbsp;</div>
<div class="image-view" data-width="497" data-height="77"><img src="./images/16877695-b86445f5a9f29ef0.webp" alt="" data-original-src="//upload-images.jianshu.io/upload_images/16877695-b86445f5a9f29ef0.png" data-original-width="497" data-original-height="77" data-original-format="image/png" data-original-filesize="3452" data-image-index="1" /></div>
</div>
<div class="image-caption">tp2.png</div>
</div>
<p>我在网上找了好多解决的方法<br />
</p>
<p>&nbsp;</p>


一.
<div class="image-package">
<div class="image-container">
<div class="image-container-fill">&nbsp;</div>
<div class="image-view" data-width="534" data-height="79"><img src="./images/16877695-93a44cb6e53f7a84.webp" alt="" data-original-src="//upload-images.jianshu.io/upload_images/16877695-93a44cb6e53f7a84.png" data-original-width="534" data-original-height="79" data-original-format="image/png" data-original-filesize="3952" data-image-index="2" /></div>


</div>
<div class="image-caption">微信截图_20190330140624.png</div>


</div>

<br />
我们可以 给 width：100% !important; 这样就可以改变 它的属性<br />
<p>二.<br />
去掉style标签中的scoped属性<br />
scoped属性导致css仅对当前组件生效（用css3的属性选择器+生成的随机属性实现的），而html绑定渲染出的内容可以理解为是子组件的内容，子组件不会被加上对应的属性，所以不会应用css.<br />
但是我使用这种方法也并没有生效<br />
三.<br />
这种方法使我使用的试了下它可以生效<br />
在updated生命周期函数中，js动态配置样式，代码如下：</p>


<br />
<div class="image-package">
<div class="image-container">
<div class="image-container-fill">&nbsp;</div>
<div class="image-view" data-width="720" data-height="265"><img src="./images/16877695-49f44a3b76d8c5f3.webp" alt="" data-original-src="//upload-images.jianshu.io/upload_images/16877695-49f44a3b76d8c5f3.png" data-original-width="720" data-original-height="265" data-original-format="image/png" data-original-filesize="26108" data-image-index="3" /></div>


</div>
<div class="image-caption">微信截图_20190330140805.png</div>


</div>
<p>如果大家在使用前2个方法没有生效时,可以试一下第三中方法。</p>

</div>

<br /><br />作者：去看一场黑白电影<br />链接：https://www.jianshu.com/p/c8758c16fcf4<br />来源：简书</div>