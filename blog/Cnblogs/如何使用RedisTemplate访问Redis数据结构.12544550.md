<p>转载：<a href="https://www.jianshu.com/p/7bf5dc61ca06/">https://www.jianshu.com/p/7bf5dc61ca06/</a></p>
<div>
<div>
<h1>Redis 数据结构简介</h1>
<p>Redis 可以存储键与5种不同数据结构类型之间的映射，这5种数据结构类型分别为String（字符串）、List（列表）、Set（集合）、Hash（散列）和 Zset（有序集合）。</p>
<p>下面来对这5种数据结构类型作简单的介绍：</p>
<table>
<thead>
<tr><th>结构类型</th><th>结构存储的值</th><th>结构的读写能力</th></tr>
</thead>
<tbody>
<tr>
<td>String</td>
<td>可以是字符串、整数或者浮点数</td>
<td>对整个字符串或者字符串的其中一部分执行操作；对象和浮点数执行自增(increment)或者自减(decrement)</td>
</tr>
<tr>
<td>List</td>
<td>一个链表，链表上的每个节点都包含了一个字符串</td>
<td>从链表的两端推入或者弹出元素；根据偏移量对链表进行修剪(trim)；读取单个或者多个元素；根据值来查找或者移除元素</td>
</tr>
<tr>
<td>Set</td>
<td>包含字符串的无序收集器(unorderedcollection)，并且被包含的每个字符串都是独一无二的、各不相同</td>
<td>添加、获取、移除单个元素；检查一个元素是否存在于某个集合中；计算交集、并集、差集；从集合里卖弄随机获取元素</td>
</tr>
<tr>
<td>Hash</td>
<td>包含键值对的无序散列表</td>
<td>添加、获取、移除单个键值对；获取所有键值对</td>
</tr>
<tr>
<td>Zset</td>
<td>字符串成员(member)与浮点数分值(score)之间的有序映射，元素的排列顺序由分值的大小决定</td>
<td>添加、获取、删除单个元素；根据分值范围(range)或者成员来获取元素</td>
</tr>
</tbody>
</table>
<p>Redis 5种数据结构的概念大致介绍到这边，下面将结合Spring封装的RedisTemplate来对这5种数据结构的运用进行演示</p>
<h1>RedisTemplate介绍</h1>
<p>spring 封装了 RedisTemplate 对象来进行对redis的各种操作，它支持所有的 redis 原生的 api。</p>
<p><strong>RedisTemplate在spring代码中的结构如下：</strong></p>
<pre class="hljs css"><code class="css"><span class="hljs-selector-tag">org<span class="hljs-selector-class">.springframework<span class="hljs-selector-class">.data<span class="hljs-selector-class">.redis<span class="hljs-selector-class">.core
<span class="hljs-selector-tag">Class <span class="hljs-selector-tag">RedisTemplate&lt;<span class="hljs-selector-tag">K,<span class="hljs-selector-tag">V&gt;
<span class="hljs-selector-tag">java<span class="hljs-selector-class">.lang<span class="hljs-selector-class">.Object
    <span class="hljs-selector-tag">org<span class="hljs-selector-class">.springframework<span class="hljs-selector-class">.data<span class="hljs-selector-class">.redis<span class="hljs-selector-class">.core<span class="hljs-selector-class">.RedisAccessor
        <span class="hljs-selector-tag">org<span class="hljs-selector-class">.springframework<span class="hljs-selector-class">.data<span class="hljs-selector-class">.redis<span class="hljs-selector-class">.core<span class="hljs-selector-class">.RedisTemplate&lt;<span class="hljs-selector-tag">K,<span class="hljs-selector-tag">V&gt;
</span></span></span></span></span></span></span></span></span></span></span></span></span></span></span></span></span></span></span></span></span></span></span></span></span></span></code></pre>
<p>Type Parameters:<br />
K</p>
<ul>
<li>the Redis key type against which the template works (usually a String)<br />
模板中的Redis key的类型（通常为String）如：RedisTemplate&lt;String, Object&gt;<br />
注意：<strong>如果没特殊情况，切勿定义成RedisTemplate&lt;Object, Object&gt;</strong>，否则根据里氏替换原则，使用的时候会造成类型错误 。<br />
V</li>
<li>the Redis value type against which the template works<br />
模板中的Redis value的类型</li>


</ul>
<h3>RedisTemplate中定义了对5种数据结构操作</h3>
<pre class="hljs cpp"><code class="cpp">redisTemplate.opsForValue();<span class="hljs-comment">//操作字符串
redisTemplate.opsForHash();<span class="hljs-comment">//操作hash
redisTemplate.opsForList();<span class="hljs-comment">//操作list
redisTemplate.opsForSet();<span class="hljs-comment">//操作set
redisTemplate.opsForZSet();<span class="hljs-comment">//操作有序set
</span></span></span></span></span></code></pre>
<h1>StringRedisTemplate与RedisTemplate</h1>
<ul>
<li>
<p>两者的关系是StringRedisTemplate继承RedisTemplate。</p>
</li>
<li>
<p>两者的数据是不共通的；也就是说StringRedisTemplate只能管理StringRedisTemplate里面的数据，RedisTemplate只能管理RedisTemplate中的数据。</p>
</li>
<li>
<p>SDR默认采用的序列化策略有两种，一种是String的序列化策略，一种是JDK的序列化策略。</p>
<p>StringRedisTemplate默认采用的是String的序列化策略，保存的key和value都是采用此策略序列化保存的。</p>
<p>RedisTemplate默认采用的是JDK的序列化策略，保存的key和value都是采用此策略序列化保存的。</p>
</li>
</ul>
<p><strong>RedisTemplate配置如下：</strong></p>
<pre class="hljs cpp"><code class="cpp">@Bean
    <span class="hljs-keyword">public RedisTemplate&lt;String, Object&gt; redisTemplate(RedisConnectionFactory redisConnectionFactory)
    {
        Jackson2JsonRedisSerializer&lt;Object&gt; jackson2JsonRedisSerializer = <span class="hljs-keyword">new Jackson2JsonRedisSerializer&lt;Object&gt;(Object.class);
        ObjectMapper om = <span class="hljs-keyword">new ObjectMapper();
        om.setVisibility(PropertyAccessor.ALL, JsonAutoDetect.Visibility.ANY);
        om.enableDefaultTyping(ObjectMapper.DefaultTyping.NON_FINAL);
        jackson2JsonRedisSerializer.setObjectMapper(om);
        RedisTemplate&lt;String, Object&gt; <span class="hljs-keyword">template = <span class="hljs-keyword">new RedisTemplate&lt;String, Object&gt;();
        <span class="hljs-keyword">template.setConnectionFactory(redisConnectionFactory);
        <span class="hljs-keyword">template.setKeySerializer(jackson2JsonRedisSerializer);
        <span class="hljs-keyword">template.setValueSerializer(jackson2JsonRedisSerializer);
        <span class="hljs-keyword">template.setHashKeySerializer(jackson2JsonRedisSerializer);
        <span class="hljs-keyword">template.setHashValueSerializer(jackson2JsonRedisSerializer);
        <span class="hljs-keyword">template.afterPropertiesSet();
        <span class="hljs-keyword">return <span class="hljs-keyword">template;
    }
</span></span></span></span></span></span></span></span></span></span></span></span></span></code></pre>
<h1>Redis的String数据结构 （推荐使用StringRedisTemplate）</h1>
<p><strong>注意：如果使用RedisTemplate需要更改序列化方式</strong></p>
<pre class="hljs cpp"><code class="cpp">RedisSerializer&lt;String&gt; stringSerializer = <span class="hljs-keyword">new StringRedisSerializer();
        <span class="hljs-keyword">template.setKeySerializer(stringSerializer );
        <span class="hljs-keyword">template.setValueSerializer(stringSerializer );
        <span class="hljs-keyword">template.setHashKeySerializer(stringSerializer );
        <span class="hljs-keyword">template.setHashValueSerializer(stringSerializer );
</span></span></span></span></span></code></pre>
<p>public interface ValueOperations&lt;K,V&gt;<br />
Redis operations for simple (or in Redis terminology 'string') values.<br />
ValueOperations可以对String数据结构进行操作：</p>
<ul>
<li>set void set(K key, V value);</li>


</ul>
<pre class="hljs bash"><code class="bash">使用：redisTemplate.opsForValue().<span class="hljs-built_in">set(<span class="hljs-string">"name",<span class="hljs-string">"tom");
结果：redisTemplate.opsForValue().get(<span class="hljs-string">"name")  输出结果为tom
</span></span></span></span></code></pre>
<ul>
<li>set void set(K key, V value, long timeout, TimeUnit unit);</li>
</ul>
<pre class="hljs css"><code class="css">使用：<span class="hljs-selector-tag">redisTemplate<span class="hljs-selector-class">.opsForValue()<span class="hljs-selector-class">.set("<span class="hljs-selector-tag">name","<span class="hljs-selector-tag">tom",10, <span class="hljs-selector-tag">TimeUnit<span class="hljs-selector-class">.SECONDS);
结果：<span class="hljs-selector-tag">redisTemplate<span class="hljs-selector-class">.opsForValue()<span class="hljs-selector-class">.get("<span class="hljs-selector-tag">name")由于设置的是10秒失效，十秒之内查询有结果，十秒之后返回为<span class="hljs-selector-tag">null
</span></span></span></span></span></span></span></span></span></span></span></span></code></pre>
<ul>
<li>set void set(K key, V value, long offset);<br />
该方法是用 value 参数覆写(overwrite)给定 key 所储存的字符串值，从偏移量 offset 开始</li>


</ul>
<pre class="hljs cpp"><code class="cpp">使用：<span class="hljs-keyword">template.opsForValue().<span class="hljs-built_in">set(<span class="hljs-string">"key",<span class="hljs-string">"hello world");
        <span class="hljs-keyword">template.opsForValue().<span class="hljs-built_in">set(<span class="hljs-string">"key",<span class="hljs-string">"redis", <span class="hljs-number">6);
        System.out.println(<span class="hljs-string">"***************"+<span class="hljs-keyword">template.opsForValue().get(<span class="hljs-string">"key"));
结果：***************hello redis
</span></span></span></span></span></span></span></span></span></span></span></span></code></pre>
<ul>
<li>setIfAbsent Boolean setIfAbsent(K key, V value);</li>
</ul>
<pre class="hljs cpp"><code class="cpp">使用：System.out.println(<span class="hljs-keyword">template.opsForValue().setIfAbsent(<span class="hljs-string">"multi1",<span class="hljs-string">"multi1"));<span class="hljs-comment">//false  multi1之前已经存在
        System.out.println(<span class="hljs-keyword">template.opsForValue().setIfAbsent(<span class="hljs-string">"multi111",<span class="hljs-string">"multi111"));<span class="hljs-comment">//true  multi111之前不存在
结果：<span class="hljs-literal">false
<span class="hljs-literal">true
</span></span></span></span></span></span></span></span></span></span></code></pre>
<ul>
<li>multiSet void multiSet(Map&lt;? extends K, ? extends V&gt; m);<br />
为多个键分别设置它们的值</li>


</ul>
<pre class="hljs javascript"><code class="javascript">使用：<span class="hljs-built_in">Map&lt;<span class="hljs-built_in">String,<span class="hljs-built_in">String&gt; maps = <span class="hljs-keyword">new HashMap&lt;<span class="hljs-built_in">String, <span class="hljs-built_in">String&gt;();
        maps.put(<span class="hljs-string">"multi1",<span class="hljs-string">"multi1");
        maps.put(<span class="hljs-string">"multi2",<span class="hljs-string">"multi2");
        maps.put(<span class="hljs-string">"multi3",<span class="hljs-string">"multi3");
        template.opsForValue().multiSet(maps);
        List&lt;<span class="hljs-built_in">String&gt; keys = <span class="hljs-keyword">new ArrayList&lt;<span class="hljs-built_in">String&gt;();
        keys.add(<span class="hljs-string">"multi1");
        keys.add(<span class="hljs-string">"multi2");
        keys.add(<span class="hljs-string">"multi3");
        System.out.println(template.opsForValue().multiGet(keys));
结果：[multi1, multi2, multi3]
</span></span></span></span></span></span></span></span></span></span></span></span></span></span></span></span></span></span></code></pre>
<ul>
<li>multiSetIfAbsent Boolean multiSetIfAbsent(Map&lt;? extends K, ? extends V&gt; m);<br />
为多个键分别设置它们的值，如果存在则返回false，不存在返回true</li>


</ul>
<pre class="hljs javascript"><code class="javascript">使用：<span class="hljs-built_in">Map&lt;<span class="hljs-built_in">String,<span class="hljs-built_in">String&gt; maps = <span class="hljs-keyword">new HashMap&lt;<span class="hljs-built_in">String, <span class="hljs-built_in">String&gt;();
        maps.put(<span class="hljs-string">"multi11",<span class="hljs-string">"multi11");
        maps.put(<span class="hljs-string">"multi22",<span class="hljs-string">"multi22");
        maps.put(<span class="hljs-string">"multi33",<span class="hljs-string">"multi33");
        <span class="hljs-built_in">Map&lt;<span class="hljs-built_in">String,<span class="hljs-built_in">String&gt; maps2 = <span class="hljs-keyword">new HashMap&lt;<span class="hljs-built_in">String, <span class="hljs-built_in">String&gt;();
        maps2.put(<span class="hljs-string">"multi1",<span class="hljs-string">"multi1");
        maps2.put(<span class="hljs-string">"multi2",<span class="hljs-string">"multi2");
        maps2.put(<span class="hljs-string">"multi3",<span class="hljs-string">"multi3");
        System.out.println(template.opsForValue().multiSetIfAbsent(maps));
        System.out.println(template.opsForValue().multiSetIfAbsent(maps2));
结果：<span class="hljs-literal">true
<span class="hljs-literal">false
</span></span></span></span></span></span></span></span></span></span></span></span></span></span></span></span></span></span></span></span></span></span></span></span></span></span></code></pre>
<ul>
<li>get V get(Object key);</li>
</ul>
<pre class="hljs cpp"><code class="cpp">使用：<span class="hljs-keyword">template.opsForValue().<span class="hljs-built_in">set(<span class="hljs-string">"key",<span class="hljs-string">"hello world");
        System.out.println(<span class="hljs-string">"***************"+<span class="hljs-keyword">template.opsForValue().get(<span class="hljs-string">"key"));
结果：***************hello world
</span></span></span></span></span></span></span></code></pre>
<ul>
<li>getAndSet V getAndSet(K key, V value);<br />
设置键的字符串值并返回其旧值</li>


</ul>
<pre class="hljs cpp"><code class="cpp">使用：<span class="hljs-keyword">template.opsForValue().<span class="hljs-built_in">set(<span class="hljs-string">"getSetTest",<span class="hljs-string">"test");
        System.out.println(<span class="hljs-keyword">template.opsForValue().getAndSet(<span class="hljs-string">"getSetTest",<span class="hljs-string">"test2"));
结果：test
</span></span></span></span></span></span></span></code></pre>
<ul>
<li>multiGet List&lt;V&gt; multiGet(Collection&lt;K&gt; keys);<br />
为多个键分别取出它们的值</li>


</ul>
<pre class="hljs javascript"><code class="javascript">使用：<span class="hljs-built_in">Map&lt;<span class="hljs-built_in">String,<span class="hljs-built_in">String&gt; maps = <span class="hljs-keyword">new HashMap&lt;<span class="hljs-built_in">String, <span class="hljs-built_in">String&gt;();
        maps.put(<span class="hljs-string">"multi1",<span class="hljs-string">"multi1");
        maps.put(<span class="hljs-string">"multi2",<span class="hljs-string">"multi2");
        maps.put(<span class="hljs-string">"multi3",<span class="hljs-string">"multi3");
        template.opsForValue().multiSet(maps);
        List&lt;<span class="hljs-built_in">String&gt; keys = <span class="hljs-keyword">new ArrayList&lt;<span class="hljs-built_in">String&gt;();
        keys.add(<span class="hljs-string">"multi1");
        keys.add(<span class="hljs-string">"multi2");
        keys.add(<span class="hljs-string">"multi3");
        System.out.println(template.opsForValue().multiGet(keys));
结果：[multi1, multi2, multi3]
</span></span></span></span></span></span></span></span></span></span></span></span></span></span></span></span></span></span></code></pre>
<ul>
<li>increment Long increment(K key, long delta);<br />
支持整数</li>


</ul>
<pre class="hljs css"><code class="css">使用：<span class="hljs-selector-tag">template<span class="hljs-selector-class">.opsForValue()<span class="hljs-selector-class">.increment("<span class="hljs-selector-tag">increlong",1);
        <span class="hljs-selector-tag">System<span class="hljs-selector-class">.out<span class="hljs-selector-class">.println("***************"+<span class="hljs-selector-tag">template<span class="hljs-selector-class">.opsForValue()<span class="hljs-selector-class">.get("<span class="hljs-selector-tag">increlong"));
结果：***************1
</span></span></span></span></span></span></span></span></span></span></span></code></pre>
<ul>
<li>increment Double increment(K key, double delta);<br />
也支持浮点数</li>


</ul>
<pre class="hljs css"><code class="css">使用：<span class="hljs-selector-tag">template<span class="hljs-selector-class">.opsForValue()<span class="hljs-selector-class">.increment("<span class="hljs-selector-tag">increlong",1<span class="hljs-selector-class">.2);
        <span class="hljs-selector-tag">System<span class="hljs-selector-class">.out<span class="hljs-selector-class">.println("***************"+<span class="hljs-selector-tag">template<span class="hljs-selector-class">.opsForValue()<span class="hljs-selector-class">.get("<span class="hljs-selector-tag">increlong"));
结果：***************2<span class="hljs-selector-class">.2
</span></span></span></span></span></span></span></span></span></span></span></span></span></code></pre>
<ul>
<li>append Integer append(K key, String value);<br />
如果key已经存在并且是一个字符串，则该命令将该值追加到字符串的末尾。如果键不存在，则它被创建并设置为空字符串，因此APPEND在这种特殊情况下将类似于SET。</li>


</ul>
<pre class="hljs css"><code class="css">使用：<span class="hljs-selector-tag">template<span class="hljs-selector-class">.opsForValue()<span class="hljs-selector-class">.append("<span class="hljs-selector-tag">appendTest","<span class="hljs-selector-tag">Hello");
        <span class="hljs-selector-tag">System<span class="hljs-selector-class">.out<span class="hljs-selector-class">.println(<span class="hljs-selector-tag">template<span class="hljs-selector-class">.opsForValue()<span class="hljs-selector-class">.get("<span class="hljs-selector-tag">appendTest"));
        <span class="hljs-selector-tag">template<span class="hljs-selector-class">.opsForValue()<span class="hljs-selector-class">.append("<span class="hljs-selector-tag">appendTest","<span class="hljs-selector-tag">world");
        <span class="hljs-selector-tag">System<span class="hljs-selector-class">.out<span class="hljs-selector-class">.println(<span class="hljs-selector-tag">template<span class="hljs-selector-class">.opsForValue()<span class="hljs-selector-class">.get("<span class="hljs-selector-tag">appendTest"));
结果：<span class="hljs-selector-tag">Hello
        <span class="hljs-selector-tag">Helloworld
</span></span></span></span></span></span></span></span></span></span></span></span></span></span></span></span></span></span></span></span></span></span></span></span></span></span></code></pre>
<ul>
<li>get String get(K key, long start, long end);<br />
截取key所对应的value字符串</li>


</ul>
<pre class="hljs css"><code class="css">使用：<span class="hljs-selector-tag">appendTest对应的<span class="hljs-selector-tag">value为<span class="hljs-selector-tag">Helloworld
<span class="hljs-selector-tag">System<span class="hljs-selector-class">.out<span class="hljs-selector-class">.println("*********"+<span class="hljs-selector-tag">template<span class="hljs-selector-class">.opsForValue()<span class="hljs-selector-class">.get("<span class="hljs-selector-tag">appendTest",0,5));
结果：*********<span class="hljs-selector-tag">Hellow
使用：<span class="hljs-selector-tag">System<span class="hljs-selector-class">.out<span class="hljs-selector-class">.println("*********"+<span class="hljs-selector-tag">template<span class="hljs-selector-class">.opsForValue()<span class="hljs-selector-class">.get("<span class="hljs-selector-tag">appendTest",0,<span class="hljs-selector-tag">-1));
结果：*********<span class="hljs-selector-tag">Helloworld
使用：<span class="hljs-selector-tag">System<span class="hljs-selector-class">.out<span class="hljs-selector-class">.println("*********"+<span class="hljs-selector-tag">template<span class="hljs-selector-class">.opsForValue()<span class="hljs-selector-class">.get("<span class="hljs-selector-tag">appendTest",<span class="hljs-selector-tag">-3,<span class="hljs-selector-tag">-1));
结果：*********<span class="hljs-selector-tag">rld
</span></span></span></span></span></span></span></span></span></span></span></span></span></span></span></span></span></span></span></span></span></span></span></span></span></span></span></span></span></span></code></pre>
<ul>
<li>size Long size(K key);<br />
返回key所对应的value值得长度</li>


</ul>
<pre class="hljs cpp"><code class="cpp">使用：<span class="hljs-keyword">template.opsForValue().<span class="hljs-built_in">set(<span class="hljs-string">"key",<span class="hljs-string">"hello world");
    System.out.println(<span class="hljs-string">"***************"+<span class="hljs-keyword">template.opsForValue().size(<span class="hljs-string">"key"));
结果：***************<span class="hljs-number">11
</span></span></span></span></span></span></span></span></code></pre>
<ul>
<li>setBit Boolean setBit(K key, long offset, boolean value);<br />
对 key 所储存的字符串值，设置或清除指定偏移量上的位(bit)<br />
key键对应的值value对应的ascii码,在offset的位置(从左向右数)变为value</li>


</ul>
<pre class="hljs cpp"><code class="cpp">使用：<span class="hljs-keyword">template.opsForValue().<span class="hljs-built_in">set(<span class="hljs-string">"bitTest",<span class="hljs-string">"a");
        <span class="hljs-comment">// 'a' 的ASCII码是 97。转换为二进制是：01100001
        <span class="hljs-comment">// 'b' 的ASCII码是 98  转换为二进制是：01100010
        <span class="hljs-comment">// 'c' 的ASCII码是 99  转换为二进制是：01100011
        <span class="hljs-comment">//因为二进制只有0和1，在setbit中true为1，false为0，因此我要变为'b'的话第六位设置为1，第七位设置为0
        <span class="hljs-keyword">template.opsForValue().setBit(<span class="hljs-string">"bitTest",<span class="hljs-number">6, <span class="hljs-literal">true);
        <span class="hljs-keyword">template.opsForValue().setBit(<span class="hljs-string">"bitTest",<span class="hljs-number">7, <span class="hljs-literal">false);
        System.out.println(<span class="hljs-keyword">template.opsForValue().get(<span class="hljs-string">"bitTest"));
结果：b
</span></span></span></span></span></span></span></span></span></span></span></span></span></span></span></span></span></span></code></pre>
<ul>
<li>getBit Boolean getBit(K key, long offset);<br />
获取键对应值的ascii码的在offset处位值</li>


</ul>
<pre class="hljs css"><code class="css">使用：<span class="hljs-selector-tag">System<span class="hljs-selector-class">.out<span class="hljs-selector-class">.println(<span class="hljs-selector-tag">template<span class="hljs-selector-class">.opsForValue()<span class="hljs-selector-class">.getBit("<span class="hljs-selector-tag">bitTest",7));
结果：<span class="hljs-selector-tag">false
</span></span></span></span></span></span></span></span></code></pre>
<h1>Redis的List数据结构</h1>
<p><strong>这边我们把RedisTemplate序列化方式改回之前的</strong></p>
<pre class="hljs javascript"><code class="javascript">Jackson2JsonRedisSerializer&lt;<span class="hljs-built_in">Object&gt; jackson2JsonRedisSerializer = <span class="hljs-keyword">new Jackson2JsonRedisSerializer&lt;<span class="hljs-built_in">Object&gt;(<span class="hljs-built_in">Object.class);
        ObjectMapper om = <span class="hljs-keyword">new ObjectMapper();
        om.setVisibility(PropertyAccessor.ALL, JsonAutoDetect.Visibility.ANY);
        om.enableDefaultTyping(ObjectMapper.DefaultTyping.NON_FINAL);
        jackson2JsonRedisSerializer.setObjectMapper(om);
RedisTemplate&lt;<span class="hljs-built_in">String, <span class="hljs-built_in">Object&gt; template = <span class="hljs-keyword">new RedisTemplate&lt;<span class="hljs-built_in">String, <span class="hljs-built_in">Object&gt;();
       template.setKeySerializer(jackson2JsonRedisSerializer);
        template.setValueSerializer(jackson2JsonRedisSerializer);
        template.setHashKeySerializer(jackson2JsonRedisSerializer);
        template.setHashValueSerializer(jackson2JsonRedisSerializer);
</span></span></span></span></span></span></span></span></span></span></code></pre>
<p>public interface ListOperations&lt;K,V&gt;<br />
Redis列表是简单的字符串列表，按照插入顺序排序。你可以添加一个元素导列表的头部（左边）或者尾部（右边）<br />
ListOperations专门操作list列表：</p>
<ul>
<li>List&lt;V&gt; range(K key, long start, long end);<br />
返回存储在键中的列表的指定元素。偏移开始和停止是基于零的索引，其中0是列表的第一个元素（列表的头部），1是下一个元素</li>


</ul>
<pre class="hljs css"><code class="css">使用：<span class="hljs-selector-tag">System<span class="hljs-selector-class">.out<span class="hljs-selector-class">.println(<span class="hljs-selector-tag">template<span class="hljs-selector-class">.opsForList()<span class="hljs-selector-class">.range("<span class="hljs-selector-tag">list",0,<span class="hljs-selector-tag">-1));
结果:<span class="hljs-selector-attr">[c#, c++, python, java, c#, c#]
</span></span></span></span></span></span></span></span></span></code></pre>
<ul>
<li>void trim(K key, long start, long end);<br />
修剪现有列表，使其只包含指定的指定范围的元素，起始和停止都是基于0的索引</li>


</ul>
<pre class="hljs cpp"><code class="cpp">使用：System.out.println(<span class="hljs-keyword">template.opsForList().range(<span class="hljs-string">"list",<span class="hljs-number">0,<span class="hljs-number">-1));
<span class="hljs-keyword">template.opsForList().trim(<span class="hljs-string">"list",<span class="hljs-number">1,<span class="hljs-number">-1);<span class="hljs-comment">//裁剪第一个元素
System.out.println(<span class="hljs-keyword">template.opsForList().range(<span class="hljs-string">"list",<span class="hljs-number">0,<span class="hljs-number">-1));
结果:[c#, c++, python, java, c#, c#]
[c++, python, java, c#, c#]
</span></span></span></span></span></span></span></span></span></span></span></span></span></code></pre>
<ul>
<li>Long size(K key);<br />
返回存储在键中的列表的长度。如果键不存在，则将其解释为空列表，并返回0。当key存储的值不是列表时返回错误。</li>


</ul>
<pre class="hljs css"><code class="css">使用：<span class="hljs-selector-tag">System<span class="hljs-selector-class">.out<span class="hljs-selector-class">.println(<span class="hljs-selector-tag">template<span class="hljs-selector-class">.opsForList()<span class="hljs-selector-class">.size("<span class="hljs-selector-tag">list"));
结果<span class="hljs-selector-pseudo">:6
</span></span></span></span></span></span></span></span></code></pre>
<ul>
<li>Long leftPush(K key, V value);<br />
将所有指定的值插入存储在键的列表的头部。如果键不存在，则在执行推送操作之前将其创建为空列表。（从左边插入）</li>


</ul>
<pre class="hljs cpp"><code class="cpp">使用：<span class="hljs-keyword">template.opsForList().leftPush(<span class="hljs-string">"list",<span class="hljs-string">"java");
        <span class="hljs-keyword">template.opsForList().leftPush(<span class="hljs-string">"list",<span class="hljs-string">"python");
        <span class="hljs-keyword">template.opsForList().leftPush(<span class="hljs-string">"list",<span class="hljs-string">"c++");
结果:返回的结果为推送操作后的列表的长度
<span class="hljs-number">1
<span class="hljs-number">2
<span class="hljs-number">3
</span></span></span></span></span></span></span></span></span></span></span></span></code></pre>
<ul>
<li>Long leftPushAll(K key, V... values);<br />
批量把一个数组插入到列表中</li>


</ul>
<pre class="hljs cpp"><code class="cpp">使用：String[] stringarrays = <span class="hljs-keyword">new String[]{<span class="hljs-string">"1",<span class="hljs-string">"2",<span class="hljs-string">"3"};
        <span class="hljs-keyword">template.opsForList().leftPushAll(<span class="hljs-string">"listarray",stringarrays);
        System.out.println(<span class="hljs-keyword">template.opsForList().range(<span class="hljs-string">"listarray",<span class="hljs-number">0,<span class="hljs-number">-1));
结果:[<span class="hljs-number">3, <span class="hljs-number">2, <span class="hljs-number">1]
</span></span></span></span></span></span></span></span></span></span></span></span></span></code></pre>
<ul>
<li>Long leftPushAll(K key, Collection&lt;V&gt; values);<br />
批量把一个集合插入到列表中</li>


</ul>
<pre class="hljs cpp"><code class="cpp">使用：List&lt;Object&gt; strings = <span class="hljs-keyword">new ArrayList&lt;Object&gt;();
        strings.add(<span class="hljs-string">"1");
        strings.add(<span class="hljs-string">"2");
        strings.add(<span class="hljs-string">"3");
        <span class="hljs-keyword">template.opsForList().leftPushAll(<span class="hljs-string">"listcollection4", strings);
        System.out.println(<span class="hljs-keyword">template.opsForList().range(<span class="hljs-string">"listcollection4",<span class="hljs-number">0,<span class="hljs-number">-1));
结果:[<span class="hljs-number">3, <span class="hljs-number">2, <span class="hljs-number">1]
</span></span></span></span></span></span></span></span></span></span></span></span></span></code></pre>
<ul>
<li>Long leftPushIfPresent(K key, V value);<br />
只有存在key对应的列表才能将这个value值插入到key所对应的列表中</li>


</ul>
<pre class="hljs cpp"><code class="cpp">使用：System.out.println(<span class="hljs-keyword">template.opsForList().leftPushIfPresent(<span class="hljs-string">"leftPushIfPresent",<span class="hljs-string">"aa"));
        System.out.println(<span class="hljs-keyword">template.opsForList().leftPushIfPresent(<span class="hljs-string">"leftPushIfPresent",<span class="hljs-string">"bb"));
==========分割线===========
System.out.println(<span class="hljs-keyword">template.opsForList().leftPush(<span class="hljs-string">"leftPushIfPresent",<span class="hljs-string">"aa"));
        System.out.println(<span class="hljs-keyword">template.opsForList().leftPushIfPresent(<span class="hljs-string">"leftPushIfPresent",<span class="hljs-string">"bb"));
结果:
<span class="hljs-number">0
<span class="hljs-number">0
==========分割线===========
<span class="hljs-number">1
<span class="hljs-number">2
</span></span></span></span></span></span></span></span></span></span></span></span></span></span></span></span></code></pre>
<ul>
<li>Long leftPush(K key, V pivot, V value);<br />
把value值放到key对应列表中pivot值的左面，如果pivot值存在的话</li>


</ul>
<pre class="hljs css"><code class="css">使用：<span class="hljs-selector-tag">template<span class="hljs-selector-class">.opsForList()<span class="hljs-selector-class">.leftPush("<span class="hljs-selector-tag">list","<span class="hljs-selector-tag">java","<span class="hljs-selector-tag">oc");
        <span class="hljs-selector-tag">System<span class="hljs-selector-class">.out<span class="hljs-selector-class">.print(<span class="hljs-selector-tag">template<span class="hljs-selector-class">.opsForList()<span class="hljs-selector-class">.range("<span class="hljs-selector-tag">list",0,<span class="hljs-selector-tag">-1));
结果：<span class="hljs-selector-attr">[c++, python, oc, java, c#, c#]
</span></span></span></span></span></span></span></span></span></span></span></span></span></span></span></code></pre>
<ul>
<li>Long rightPush(K key, V value);<br />
将所有指定的值插入存储在键的列表的头部。如果键不存在，则在执行推送操作之前将其创建为空列表。（从右边插入）</li>


</ul>
<pre class="hljs cpp"><code class="cpp">使用：<span class="hljs-keyword">template.opsForList().rightPush(<span class="hljs-string">"listRight",<span class="hljs-string">"java");
        <span class="hljs-keyword">template.opsForList().rightPush(<span class="hljs-string">"listRight",<span class="hljs-string">"python");
        <span class="hljs-keyword">template.opsForList().rightPush(<span class="hljs-string">"listRight",<span class="hljs-string">"c++");
结果:
<span class="hljs-number">1
<span class="hljs-number">2
<span class="hljs-number">3
</span></span></span></span></span></span></span></span></span></span></span></span></code></pre>
<ul>
<li>Long rightPushAll(K key, V... values);</li>
</ul>
<pre class="hljs cpp"><code class="cpp">使用：String[] stringarrays = <span class="hljs-keyword">new String[]{<span class="hljs-string">"1",<span class="hljs-string">"2",<span class="hljs-string">"3"};
        <span class="hljs-keyword">template.opsForList().rightPushAll(<span class="hljs-string">"listarrayright",stringarrays);
        System.out.println(<span class="hljs-keyword">template.opsForList().range(<span class="hljs-string">"listarrayright",<span class="hljs-number">0,<span class="hljs-number">-1));
结果:[<span class="hljs-number">1, <span class="hljs-number">2, <span class="hljs-number">3]
</span></span></span></span></span></span></span></span></span></span></span></span></span></code></pre>
<ul>
<li>Long rightPushAll(K key, Collection&lt;V&gt; values);</li>
</ul>
<pre class="hljs cpp"><code class="cpp">使用：List&lt;Object&gt; strings = <span class="hljs-keyword">new ArrayList&lt;Object&gt;();
        strings.add(<span class="hljs-string">"1");
        strings.add(<span class="hljs-string">"2");
        strings.add(<span class="hljs-string">"3");
        <span class="hljs-keyword">template.opsForList().rightPushAll(<span class="hljs-string">"listcollectionright", strings);
        System.out.println(<span class="hljs-keyword">template.opsForList().range(<span class="hljs-string">"listcollectionright",<span class="hljs-number">0,<span class="hljs-number">-1));
结果:[<span class="hljs-number">1, <span class="hljs-number">2, <span class="hljs-number">3]
</span></span></span></span></span></span></span></span></span></span></span></span></span></code></pre>
<ul>
<li>Long rightPushIfPresent(K key, V value);<br />
只有存在key对应的列表才能将这个value值插入到key所对应的列表中</li>


</ul>
<pre class="hljs cpp"><code class="cpp">使用：System.out.println(<span class="hljs-keyword">template.opsForList().rightPushIfPresent(<span class="hljs-string">"rightPushIfPresent",<span class="hljs-string">"aa"));
        System.out.println(<span class="hljs-keyword">template.opsForList().rightPushIfPresent(<span class="hljs-string">"rightPushIfPresent",<span class="hljs-string">"bb"));
        System.out.println(<span class="hljs-string">"==========分割线===========");
        System.out.println(<span class="hljs-keyword">template.opsForList().rightPush(<span class="hljs-string">"rightPushIfPresent",<span class="hljs-string">"aa"));
        System.out.println(<span class="hljs-keyword">template.opsForList().rightPushIfPresent(<span class="hljs-string">"rightPushIfPresent",<span class="hljs-string">"bb"));
结果:<span class="hljs-number">0
<span class="hljs-number">0
==========分割线===========
<span class="hljs-number">1
<span class="hljs-number">2
</span></span></span></span></span></span></span></span></span></span></span></span></span></span></span></span></span></code></pre>
<ul>
<li>Long rightPush(K key, V pivot, V value);<br />
把value值放到key对应列表中pivot值的右面，如果pivot值存在的话</li>


</ul>
<pre class="hljs css"><code class="css">使用：<span class="hljs-selector-tag">System<span class="hljs-selector-class">.out<span class="hljs-selector-class">.println(<span class="hljs-selector-tag">template<span class="hljs-selector-class">.opsForList()<span class="hljs-selector-class">.range("<span class="hljs-selector-tag">listRight",0,<span class="hljs-selector-tag">-1));
        <span class="hljs-selector-tag">template<span class="hljs-selector-class">.opsForList()<span class="hljs-selector-class">.rightPush("<span class="hljs-selector-tag">listRight","<span class="hljs-selector-tag">python","<span class="hljs-selector-tag">oc");
        <span class="hljs-selector-tag">System<span class="hljs-selector-class">.out<span class="hljs-selector-class">.println(<span class="hljs-selector-tag">template<span class="hljs-selector-class">.opsForList()<span class="hljs-selector-class">.range("<span class="hljs-selector-tag">listRight",0,<span class="hljs-selector-tag">-1));
结果:<span class="hljs-selector-attr">[java, python, c++]
<span class="hljs-selector-attr">[java, python, oc, c++]
</span></span></span></span></span></span></span></span></span></span></span></span></span></span></span></span></span></span></span></span></span></span></span></span></code></pre>
<ul>
<li>void set(K key, long index, V value);<br />
在列表中index的位置设置value值</li>


</ul>
<pre class="hljs css"><code class="css">使用：<span class="hljs-selector-tag">System<span class="hljs-selector-class">.out<span class="hljs-selector-class">.println(<span class="hljs-selector-tag">template<span class="hljs-selector-class">.opsForList()<span class="hljs-selector-class">.range("<span class="hljs-selector-tag">listRight",0,<span class="hljs-selector-tag">-1));
        <span class="hljs-selector-tag">template<span class="hljs-selector-class">.opsForList()<span class="hljs-selector-class">.set("<span class="hljs-selector-tag">listRight",1,"<span class="hljs-selector-tag">setValue");
        <span class="hljs-selector-tag">System<span class="hljs-selector-class">.out<span class="hljs-selector-class">.println(<span class="hljs-selector-tag">template<span class="hljs-selector-class">.opsForList()<span class="hljs-selector-class">.range("<span class="hljs-selector-tag">listRight",0,<span class="hljs-selector-tag">-1));
结果:<span class="hljs-selector-attr">[java, python, oc, c++]
<span class="hljs-selector-attr">[java, setValue, oc, c++]
</span></span></span></span></span></span></span></span></span></span></span></span></span></span></span></span></span></span></span></span></span></span></span></code></pre>
<ul>
<li>Long remove(K key, long count, Object value);<br />
从存储在键中的列表中删除等于值的元素的第一个计数事件。<br />
计数参数以下列方式影响操作：<br />
count&gt; 0：删除等于从头到尾移动的值的元素。<br />
count &lt;0：删除等于从尾到头移动的值的元素。<br />
count = 0：删除等于value的所有元素。</li>


</ul>
<pre class="hljs cpp"><code class="cpp">使用：System.out.println(<span class="hljs-keyword">template.opsForList().range(<span class="hljs-string">"listRight",<span class="hljs-number">0,<span class="hljs-number">-1));
        <span class="hljs-keyword">template.opsForList().remove(<span class="hljs-string">"listRight",<span class="hljs-number">1,<span class="hljs-string">"setValue");<span class="hljs-comment">//将删除列表中存储的列表中第一次次出现的&ldquo;setValue&rdquo;。
        System.out.println(<span class="hljs-keyword">template.opsForList().range(<span class="hljs-string">"listRight",<span class="hljs-number">0,<span class="hljs-number">-1));
结果:[java, setValue, oc, c++]
[java, oc, c++]
</span></span></span></span></span></span></span></span></span></span></span></span></span></code></pre>
<ul>
<li>V index(K key, long index);<br />
根据下表获取列表中的值，下标是从0开始的</li>


</ul>
<pre class="hljs css"><code class="css">使用：<span class="hljs-selector-tag">System<span class="hljs-selector-class">.out<span class="hljs-selector-class">.println(<span class="hljs-selector-tag">template<span class="hljs-selector-class">.opsForList()<span class="hljs-selector-class">.range("<span class="hljs-selector-tag">listRight",0,<span class="hljs-selector-tag">-1));
<span class="hljs-selector-tag">System<span class="hljs-selector-class">.out<span class="hljs-selector-class">.println(<span class="hljs-selector-tag">template<span class="hljs-selector-class">.opsForList()<span class="hljs-selector-class">.index("<span class="hljs-selector-tag">listRight",2));
结果:<span class="hljs-selector-attr">[java, oc, c++]
<span class="hljs-selector-tag">c++
</span></span></span></span></span></span></span></span></span></span></span></span></span></span></span></span></span></code></pre>
<ul>
<li>V leftPop(K key);<br />
弹出最左边的元素，弹出之后该值在列表中将不复存在</li>


</ul>
<pre class="hljs css"><code class="css">使用：<span class="hljs-selector-tag">System<span class="hljs-selector-class">.out<span class="hljs-selector-class">.println(<span class="hljs-selector-tag">template<span class="hljs-selector-class">.opsForList()<span class="hljs-selector-class">.range("<span class="hljs-selector-tag">list",0,<span class="hljs-selector-tag">-1));
        <span class="hljs-selector-tag">System<span class="hljs-selector-class">.out<span class="hljs-selector-class">.println(<span class="hljs-selector-tag">template<span class="hljs-selector-class">.opsForList()<span class="hljs-selector-class">.leftPop("<span class="hljs-selector-tag">list"));
        <span class="hljs-selector-tag">System<span class="hljs-selector-class">.out<span class="hljs-selector-class">.println(<span class="hljs-selector-tag">template<span class="hljs-selector-class">.opsForList()<span class="hljs-selector-class">.range("<span class="hljs-selector-tag">list",0,<span class="hljs-selector-tag">-1));
结果:
<span class="hljs-selector-attr">[c++, python, oc, java, c#, c#]
<span class="hljs-selector-tag">c++
<span class="hljs-selector-attr">[python, oc, java, c#, c#]
</span></span></span></span></span></span></span></span></span></span></span></span></span></span></span></span></span></span></span></span></span></span></span></span></span></span></code></pre>
<ul>
<li>V leftPop(K key, long timeout, TimeUnit unit);<br />
移出并获取列表的第一个元素， 如果列表没有元素会阻塞列表直到等待超时或发现可弹出元素为止。</li>


</ul>
<pre class="hljs undefined"><code>使用：用法与 leftPop(K key);一样
</code></pre>
<ul>
<li>V rightPop(K key);<br />
弹出最右边的元素，弹出之后该值在列表中将不复存在</li>


</ul>
<pre class="hljs css"><code class="css">使用： <span class="hljs-selector-tag">System<span class="hljs-selector-class">.out<span class="hljs-selector-class">.println(<span class="hljs-selector-tag">template<span class="hljs-selector-class">.opsForList()<span class="hljs-selector-class">.range("<span class="hljs-selector-tag">list",0,<span class="hljs-selector-tag">-1));
        <span class="hljs-selector-tag">System<span class="hljs-selector-class">.out<span class="hljs-selector-class">.println(<span class="hljs-selector-tag">template<span class="hljs-selector-class">.opsForList()<span class="hljs-selector-class">.rightPop("<span class="hljs-selector-tag">list"));
        <span class="hljs-selector-tag">System<span class="hljs-selector-class">.out<span class="hljs-selector-class">.println(<span class="hljs-selector-tag">template<span class="hljs-selector-class">.opsForList()<span class="hljs-selector-class">.range("<span class="hljs-selector-tag">list",0,<span class="hljs-selector-tag">-1));
结果:<span class="hljs-selector-attr">[python, oc, java, c#, c#]
<span class="hljs-selector-tag">c#
<span class="hljs-selector-attr">[python, oc, java, c#]
</span></span></span></span></span></span></span></span></span></span></span></span></span></span></span></span></span></span></span></span></span></span></span></span></span></span></code></pre>
<ul>
<li>V rightPop(K key, long timeout, TimeUnit unit);<br />
移出并获取列表的最后一个元素， 如果列表没有元素会阻塞列表直到等待超时或发现可弹出元素为止。</li>


</ul>
<pre class="hljs undefined"><code>使用：用法与 rightPop(K key);一样
</code></pre>
<ul>
<li>V rightPopAndLeftPush(K sourceKey, K destinationKey);<br />
用于移除列表的最后一个元素，并将该元素添加到另一个列表并返回。</li>


</ul>
<pre class="hljs css"><code class="css">使用：<span class="hljs-selector-tag">System<span class="hljs-selector-class">.out<span class="hljs-selector-class">.println(<span class="hljs-selector-tag">template<span class="hljs-selector-class">.opsForList()<span class="hljs-selector-class">.range("<span class="hljs-selector-tag">list",0,<span class="hljs-selector-tag">-1));
<span class="hljs-selector-tag">template<span class="hljs-selector-class">.opsForList()<span class="hljs-selector-class">.rightPopAndLeftPush("<span class="hljs-selector-tag">list","<span class="hljs-selector-tag">rightPopAndLeftPush");
    <span class="hljs-selector-tag">System<span class="hljs-selector-class">.out<span class="hljs-selector-class">.println(<span class="hljs-selector-tag">template<span class="hljs-selector-class">.opsForList()<span class="hljs-selector-class">.range("<span class="hljs-selector-tag">list",0,<span class="hljs-selector-tag">-1));
    <span class="hljs-selector-tag">System<span class="hljs-selector-class">.out<span class="hljs-selector-class">.println(<span class="hljs-selector-tag">template<span class="hljs-selector-class">.opsForList()<span class="hljs-selector-class">.range("<span class="hljs-selector-tag">rightPopAndLeftPush",0,<span class="hljs-selector-tag">-1));
结果:<span class="hljs-selector-attr">[oc, java,c#]
<span class="hljs-selector-attr">[oc, java]
<span class="hljs-selector-attr">[c#]
</span></span></span></span></span></span></span></span></span></span></span></span></span></span></span></span></span></span></span></span></span></span></span></span></span></span></span></span></span></span></span></span></code></pre>
<ul>
<li>V rightPopAndLeftPush(K sourceKey, K destinationKey, long timeout, TimeUnit unit);<br />
用于移除列表的最后一个元素，并将该元素添加到另一个列表并返回，如果列表没有元素会阻塞列表直到等待超时或发现可弹出元素为止。</li>


</ul>
<pre class="hljs undefined"><code>使用：用法与rightPopAndLeftPush(K sourceKey, K destinationKey)一样
</code></pre>
<h1>Redis的Hash数据机构</h1>
<p>Redis的散列可以让用户将多个键值对存储到一个Redis键里面。<br />
public interface HashOperations&lt;H,HK,HV&gt;<br />
HashOperations提供一系列方法操作hash：</p>
<pre class="hljs ruby"><code class="ruby">初始数据:
<span class="hljs-regexp">//template.opsForHash().put(<span class="hljs-string">"redisHash",<span class="hljs-string">"name",<span class="hljs-string">"tom");
        <span class="hljs-regexp">//template.opsForHash().put(<span class="hljs-string">"redisHash",<span class="hljs-string">"age",<span class="hljs-number">26);
        <span class="hljs-regexp">//template.opsForHash().put(<span class="hljs-string">"redisHash",<span class="hljs-string">"class",<span class="hljs-string">"6");

<span class="hljs-regexp">//Map&lt;String,Object&gt; testMap = new HashMap();
        <span class="hljs-regexp">//testMap.put(<span class="hljs-string">"name",<span class="hljs-string">"jack");
        <span class="hljs-regexp">//testMap.put(<span class="hljs-string">"age",<span class="hljs-number">27);
        <span class="hljs-regexp">//testMap.put(<span class="hljs-string">"class",<span class="hljs-string">"1");
        <span class="hljs-regexp">//template.opsForHash().putAll(<span class="hljs-string">"redisHash1",testMap);
</span></span></span></span></span></span></span></span></span></span></span></span></span></span></span></span></span></span></span></span></span></span></span></span></code></pre>
<ul>
<li>Long delete(H key, Object... hashKeys);<br />
删除给定的哈希hashKeys</li>


</ul>
<pre class="hljs cpp"><code class="cpp">使用：System.out.println(<span class="hljs-keyword">template.opsForHash().<span class="hljs-keyword">delete(<span class="hljs-string">"redisHash",<span class="hljs-string">"name"));
        System.out.println(<span class="hljs-keyword">template.opsForHash().entries(<span class="hljs-string">"redisHash"));
结果：<span class="hljs-number">1
{<span class="hljs-class"><span class="hljs-keyword">class=6, <span class="hljs-title">age=28.1}
</span></span></span></span></span></span></span></span></span></span></code></pre>
<ul>
<li>Boolean hasKey(H key, Object hashKey);<br />
确定哈希hashKey是否存在</li>


</ul>
<pre class="hljs cpp"><code class="cpp">使用：System.out.println(<span class="hljs-keyword">template.opsForHash().hasKey(<span class="hljs-string">"redisHash",<span class="hljs-string">"age"));
        System.out.println(<span class="hljs-keyword">template.opsForHash().hasKey(<span class="hljs-string">"redisHash",<span class="hljs-string">"ttt"));
结果：<span class="hljs-literal">true
<span class="hljs-literal">false
</span></span></span></span></span></span></span></span></code></pre>
<ul>
<li>HV get(H key, Object hashKey);<br />
从键中的哈希获取给定hashKey的值</li>


</ul>
<pre class="hljs css"><code class="css">使用：<span class="hljs-selector-tag">System<span class="hljs-selector-class">.out<span class="hljs-selector-class">.println(<span class="hljs-selector-tag">template<span class="hljs-selector-class">.opsForHash()<span class="hljs-selector-class">.get("<span class="hljs-selector-tag">redisHash","<span class="hljs-selector-tag">age"));
结果：26
</span></span></span></span></span></span></span></span></code></pre>
<ul>
<li>List&lt;HV&gt; multiGet(H key, Collection&lt;HK&gt; hashKeys);<br />
从哈希中获取给定hashKey的值</li>


</ul>
<pre class="hljs javascript"><code class="javascript">使用：List&lt;<span class="hljs-built_in">Object&gt; kes = <span class="hljs-keyword">new ArrayList&lt;<span class="hljs-built_in">Object&gt;();
        kes.add(<span class="hljs-string">"name");
        kes.add(<span class="hljs-string">"age");
        System.out.println(template.opsForHash().multiGet(<span class="hljs-string">"redisHash",kes));
结果：[jack, <span class="hljs-number">28.1]
</span></span></span></span></span></span></span></code></pre>
<ul>
<li>Long increment(H key, HK hashKey, long delta);<br />
通过给定的delta增加散列hashKey的值（整型）</li>


</ul>
<pre class="hljs css"><code class="css">使用：<span class="hljs-selector-tag">System<span class="hljs-selector-class">.out<span class="hljs-selector-class">.println(<span class="hljs-selector-tag">template<span class="hljs-selector-class">.opsForHash()<span class="hljs-selector-class">.get("<span class="hljs-selector-tag">redisHash","<span class="hljs-selector-tag">age"));
    <span class="hljs-selector-tag">System<span class="hljs-selector-class">.out<span class="hljs-selector-class">.println(<span class="hljs-selector-tag">template<span class="hljs-selector-class">.opsForHash()<span class="hljs-selector-class">.increment("<span class="hljs-selector-tag">redisHash","<span class="hljs-selector-tag">age",1));
结果：26
27
</span></span></span></span></span></span></span></span></span></span></span></span></span></span></span></span></code></pre>
<ul>
<li>Double increment(H key, HK hashKey, double delta);<br />
通过给定的delta增加散列hashKey的值（浮点数）</li>


</ul>
<pre class="hljs css"><code class="css">使用：<span class="hljs-selector-tag">System<span class="hljs-selector-class">.out<span class="hljs-selector-class">.println(<span class="hljs-selector-tag">template<span class="hljs-selector-class">.opsForHash()<span class="hljs-selector-class">.get("<span class="hljs-selector-tag">redisHash","<span class="hljs-selector-tag">age"));
    <span class="hljs-selector-tag">System<span class="hljs-selector-class">.out<span class="hljs-selector-class">.println(<span class="hljs-selector-tag">template<span class="hljs-selector-class">.opsForHash()<span class="hljs-selector-class">.increment("<span class="hljs-selector-tag">redisHash","<span class="hljs-selector-tag">age",1<span class="hljs-selector-class">.1));
结果：27
28<span class="hljs-selector-class">.1
</span></span></span></span></span></span></span></span></span></span></span></span></span></span></span></span></span></span></code></pre>
<ul>
<li>Set&lt;HK&gt; keys(H key);<br />
获取key所对应的散列表的key</li>


</ul>
<pre class="hljs cpp"><code class="cpp">使用：System.out.println(<span class="hljs-keyword">template.opsForHash().keys(<span class="hljs-string">"redisHash1"));
<span class="hljs-comment">//redisHash1所对应的散列表为{class=1, name=jack, age=27}
结果：[name, <span class="hljs-class"><span class="hljs-keyword">class, <span class="hljs-title">age]
</span></span></span></span></span></span></code></pre>
<ul>
<li>Long size(H key);<br />
获取key所对应的散列表的大小个数</li>


</ul>
<pre class="hljs cpp"><code class="cpp">使用：System.out.println(<span class="hljs-keyword">template.opsForHash().size(<span class="hljs-string">"redisHash1"));
<span class="hljs-comment">//redisHash1所对应的散列表为{class=1, name=jack, age=27}
结果：<span class="hljs-number">3
</span></span></span></span></code></pre>
<ul>
<li>void putAll(H key, Map&lt;? extends HK, ? extends HV&gt; m);<br />
使用m中提供的多个散列字段设置到key对应的散列表中</li>


</ul>
<pre class="hljs javascript"><code class="javascript">使用：<span class="hljs-built_in">Map&lt;<span class="hljs-built_in">String,<span class="hljs-built_in">Object&gt; testMap = <span class="hljs-keyword">new HashMap();
        testMap.put(<span class="hljs-string">"name",<span class="hljs-string">"jack");
        testMap.put(<span class="hljs-string">"age",<span class="hljs-number">27);
        testMap.put(<span class="hljs-string">"class",<span class="hljs-string">"1");
        template.opsForHash().putAll(<span class="hljs-string">"redisHash1",testMap);
        System.out.println(template.opsForHash().entries(<span class="hljs-string">"redisHash1"));
结果：{<span class="hljs-class"><span class="hljs-keyword">class=<span class="hljs-number">1, name=jack, age=<span class="hljs-number">27}
</span></span></span></span></span></span></span></span></span></span></span></span></span></span></span></span></code></pre>
<ul>
<li>void put(H key, HK hashKey, HV value);<br />
设置散列hashKey的值</li>


</ul>
<pre class="hljs cpp"><code class="cpp">使用：<span class="hljs-keyword">template.opsForHash().put(<span class="hljs-string">"redisHash",<span class="hljs-string">"name",<span class="hljs-string">"tom");
        <span class="hljs-keyword">template.opsForHash().put(<span class="hljs-string">"redisHash",<span class="hljs-string">"age",<span class="hljs-number">26);
        <span class="hljs-keyword">template.opsForHash().put(<span class="hljs-string">"redisHash",<span class="hljs-string">"class",<span class="hljs-string">"6");
System.out.println(<span class="hljs-keyword">template.opsForHash().entries(<span class="hljs-string">"redisHash"));
结果：{age=<span class="hljs-number">26, class=<span class="hljs-number">6, name=tom}
</span></span></span></span></span></span></span></span></span></span></span></span></span></span></span></span></code></pre>
<ul>
<li>Boolean putIfAbsent(H key, HK hashKey, HV value);<br />
仅当hashKey不存在时才设置散列hashKey的值。</li>


</ul>
<pre class="hljs cpp"><code class="cpp">使用：System.out.println(<span class="hljs-keyword">template.opsForHash().putIfAbsent(<span class="hljs-string">"redisHash",<span class="hljs-string">"age",<span class="hljs-number">30));
System.out.println(<span class="hljs-keyword">template.opsForHash().putIfAbsent(<span class="hljs-string">"redisHash",<span class="hljs-string">"kkk",<span class="hljs-string">"kkk"));
结果：<span class="hljs-literal">false
<span class="hljs-literal">true
</span></span></span></span></span></span></span></span></span></span></code></pre>
<ul>
<li>List&lt;HV&gt; values(H key);<br />
获取整个哈希存储的值根据密钥</li>


</ul>
<pre class="hljs css"><code class="css">使用：<span class="hljs-selector-tag">System<span class="hljs-selector-class">.out<span class="hljs-selector-class">.println(<span class="hljs-selector-tag">template<span class="hljs-selector-class">.opsForHash()<span class="hljs-selector-class">.values("<span class="hljs-selector-tag">redisHash"));
结果：<span class="hljs-selector-attr">[tom, 26, 6]
</span></span></span></span></span></span></span></span></code></pre>
<ul>
<li>Map&lt;HK, HV&gt; entries(H key);<br />
获取整个哈希存储根据密钥</li>


</ul>
<pre class="hljs java"><code class="java">使用：System.out.println(template.opsForHash().entries(<span class="hljs-string">"redisHash"));
结果：{age=<span class="hljs-number">26, <span class="hljs-class"><span class="hljs-keyword">class=<span class="hljs-number">6, name=tom}
</span></span></span></span></span></code></pre>
<ul>
<li>Cursor&lt;Map.Entry&lt;HK, HV&gt;&gt; scan(H key, ScanOptions options);<br />
使用Cursor在key的hash中迭代，相当于迭代器。</li>


</ul>
<pre class="hljs cpp"><code class="cpp">使用：Cursor&lt;Map.Entry&lt;Object, Object&gt;&gt; curosr = <span class="hljs-keyword">template.opsForHash().scan(<span class="hljs-string">"redisHash", ScanOptions.ScanOptions.NONE);
        <span class="hljs-keyword">while(curosr.hasNext()){
            Map.Entry&lt;Object, Object&gt; entry = curosr.next();
            System.out.println(entry.getKey()+<span class="hljs-string">":"+entry.getValue());
        }
结果：age:<span class="hljs-number">28.1
<span class="hljs-class"><span class="hljs-keyword">class:<span class="hljs-number">6
kkk:kkk
</span></span></span></span></span></span></span></span></code></pre>
<h1>Redis的Set数据结构</h1>
<p>Redis的Set是string类型的无序集合。集合成员是唯一的，这就意味着集合中不能出现重复的数据。<br />
Redis 中 集合是通过哈希表实现的，所以添加，删除，查找的复杂度都是O(1)。<br />
public interface SetOperations&lt;K,V&gt;<br />
SetOperations提供了对无序集合的一系列操作：</p>
<ul>
<li>Long add(K key, V... values);<br />
无序集合中添加元素，返回添加个数<br />
也可以直接在add里面添加多个值 如：template.opsForSet().add("setTest","aaa","bbb")</li>


</ul>
<pre class="hljs javascript"><code class="javascript">使用：<span class="hljs-built_in">String[] strarrays = <span class="hljs-keyword">new <span class="hljs-built_in">String[]{<span class="hljs-string">"strarr1",<span class="hljs-string">"sgtarr2"};
        System.out.println(template.opsForSet().add(<span class="hljs-string">"setTest", strarrays));
结果：<span class="hljs-number">2
</span></span></span></span></span></span></span></code></pre>
<ul>
<li>Long remove(K key, Object... values);<br />
移除集合中一个或多个成员</li>


</ul>
<pre class="hljs javascript"><code class="javascript">使用：<span class="hljs-built_in">String[] strarrays = <span class="hljs-keyword">new <span class="hljs-built_in">String[]{<span class="hljs-string">"strarr1",<span class="hljs-string">"sgtarr2"};
System.out.println(template.opsForSet().remove(<span class="hljs-string">"setTest",strarrays));
结果：<span class="hljs-number">2
</span></span></span></span></span></span></span></code></pre>
<ul>
<li>V pop(K key);<br />
移除并返回集合中的一个随机元素</li>


</ul>
<pre class="hljs css"><code class="css">使用：<span class="hljs-selector-tag">System<span class="hljs-selector-class">.out<span class="hljs-selector-class">.println(<span class="hljs-selector-tag">template<span class="hljs-selector-class">.opsForSet()<span class="hljs-selector-class">.pop("<span class="hljs-selector-tag">setTest"));
<span class="hljs-selector-tag">System<span class="hljs-selector-class">.out<span class="hljs-selector-class">.println(<span class="hljs-selector-tag">template<span class="hljs-selector-class">.opsForSet()<span class="hljs-selector-class">.members("<span class="hljs-selector-tag">setTest"));
结果：<span class="hljs-selector-tag">bbb
<span class="hljs-selector-attr">[aaa, ccc]
</span></span></span></span></span></span></span></span></span></span></span></span></span></span></span></span></code></pre>
<ul>
<li>Boolean move(K key, V value, K destKey);<br />
将 member 元素从 source 集合移动到 destination 集合</li>


</ul>
<pre class="hljs css"><code class="css">使用：<span class="hljs-selector-tag">template<span class="hljs-selector-class">.opsForSet()<span class="hljs-selector-class">.move("<span class="hljs-selector-tag">setTest","<span class="hljs-selector-tag">aaa","<span class="hljs-selector-tag">setTest2");
        <span class="hljs-selector-tag">System<span class="hljs-selector-class">.out<span class="hljs-selector-class">.println(<span class="hljs-selector-tag">template<span class="hljs-selector-class">.opsForSet()<span class="hljs-selector-class">.members("<span class="hljs-selector-tag">setTest"));
        <span class="hljs-selector-tag">System<span class="hljs-selector-class">.out<span class="hljs-selector-class">.println(<span class="hljs-selector-tag">template<span class="hljs-selector-class">.opsForSet()<span class="hljs-selector-class">.members("<span class="hljs-selector-tag">setTest2"));
结果：<span class="hljs-selector-attr">[ccc]
<span class="hljs-selector-attr">[aaa]
</span></span></span></span></span></span></span></span></span></span></span></span></span></span></span></span></span></span></span></span></span></span></code></pre>
<ul>
<li>Long size(K key);<br />
无序集合的大小长度</li>


</ul>
<pre class="hljs css"><code class="css">使用：<span class="hljs-selector-tag">System<span class="hljs-selector-class">.out<span class="hljs-selector-class">.println(<span class="hljs-selector-tag">template<span class="hljs-selector-class">.opsForSet()<span class="hljs-selector-class">.size("<span class="hljs-selector-tag">setTest"));
结果：1
</span></span></span></span></span></span></span></code></pre>
<ul>
<li>Boolean isMember(K key, Object o);<br />
判断 member 元素是否是集合 key 的成员</li>


</ul>
<pre class="hljs cpp"><code class="cpp">使用：System.out.println(<span class="hljs-keyword">template.opsForSet().isMember(<span class="hljs-string">"setTest",<span class="hljs-string">"ccc"));
        System.out.println(<span class="hljs-keyword">template.opsForSet().isMember(<span class="hljs-string">"setTest",<span class="hljs-string">"asd"));
结果：<span class="hljs-literal">true
<span class="hljs-literal">false
</span></span></span></span></span></span></span></span></code></pre>
<ul>
<li>Set&lt;V&gt; intersect(K key, K otherKey);<br />
key对应的无序集合与otherKey对应的无序集合求交集</li>


</ul>
<pre class="hljs css"><code class="css">使用：<span class="hljs-selector-tag">System<span class="hljs-selector-class">.out<span class="hljs-selector-class">.println(<span class="hljs-selector-tag">template<span class="hljs-selector-class">.opsForSet()<span class="hljs-selector-class">.members("<span class="hljs-selector-tag">setTest"));
        <span class="hljs-selector-tag">System<span class="hljs-selector-class">.out<span class="hljs-selector-class">.println(<span class="hljs-selector-tag">template<span class="hljs-selector-class">.opsForSet()<span class="hljs-selector-class">.members("<span class="hljs-selector-tag">setTest2"));
        <span class="hljs-selector-tag">System<span class="hljs-selector-class">.out<span class="hljs-selector-class">.println(<span class="hljs-selector-tag">template<span class="hljs-selector-class">.opsForSet()<span class="hljs-selector-class">.intersect("<span class="hljs-selector-tag">setTest","<span class="hljs-selector-tag">setTest2"));
结果：<span class="hljs-selector-attr">[aaa, ccc]
<span class="hljs-selector-attr">[aaa]
<span class="hljs-selector-attr">[aaa]
</span></span></span></span></span></span></span></span></span></span></span></span></span></span></span></span></span></span></span></span></span></span></span></span></span></code></pre>
<ul>
<li>Set&lt;V&gt; intersect(K key, Collection&lt;K&gt; otherKeys);<br />
key对应的无序集合与多个otherKey对应的无序集合求交集</li>


</ul>
<pre class="hljs cpp"><code class="cpp">使用：System.out.println(<span class="hljs-keyword">template.opsForSet().members(<span class="hljs-string">"setTest"));
        System.out.println(<span class="hljs-keyword">template.opsForSet().members(<span class="hljs-string">"setTest2"));
        System.out.println(<span class="hljs-keyword">template.opsForSet().members(<span class="hljs-string">"setTest3"));
        List&lt;String&gt; strlist = <span class="hljs-keyword">new ArrayList&lt;String&gt;();
        strlist.add(<span class="hljs-string">"setTest2");
        strlist.add(<span class="hljs-string">"setTest3");
        System.out.println(<span class="hljs-keyword">template.opsForSet().intersect(<span class="hljs-string">"setTest",strlist));
结果：[aaa, ccc]
[aaa]
[ccc, aaa]
[aaa]
</span></span></span></span></span></span></span></span></span></span></span></code></pre>
<ul>
<li>Long intersectAndStore(K key, K otherKey, K destKey);<br />
key无序集合与otherkey无序集合的交集存储到destKey无序集合中</li>


</ul>
<pre class="hljs css"><code class="css">使用：<span class="hljs-selector-tag">System<span class="hljs-selector-class">.out<span class="hljs-selector-class">.println("<span class="hljs-selector-tag">setTest<span class="hljs-selector-pseudo">:" + <span class="hljs-selector-tag">template<span class="hljs-selector-class">.opsForSet()<span class="hljs-selector-class">.members("<span class="hljs-selector-tag">setTest"));
<span class="hljs-selector-tag">System<span class="hljs-selector-class">.out<span class="hljs-selector-class">.println("<span class="hljs-selector-tag">setTest2<span class="hljs-selector-pseudo">:" + <span class="hljs-selector-tag">template<span class="hljs-selector-class">.opsForSet()<span class="hljs-selector-class">.members("<span class="hljs-selector-tag">setTest2"));
<span class="hljs-selector-tag">System<span class="hljs-selector-class">.out<span class="hljs-selector-class">.println(<span class="hljs-selector-tag">template<span class="hljs-selector-class">.opsForSet()<span class="hljs-selector-class">.intersectAndStore("<span class="hljs-selector-tag">setTest","<span class="hljs-selector-tag">setTest2","<span class="hljs-selector-tag">destKey1"));
<span class="hljs-selector-tag">System<span class="hljs-selector-class">.out<span class="hljs-selector-class">.println(<span class="hljs-selector-tag">template<span class="hljs-selector-class">.opsForSet()<span class="hljs-selector-class">.members("<span class="hljs-selector-tag">destKey1"));
结果：<span class="hljs-selector-tag">setTest:<span class="hljs-selector-attr">[ddd, bbb, aaa, ccc]
<span class="hljs-selector-tag">setTest2:<span class="hljs-selector-attr">[ccc, aaa]
2
<span class="hljs-selector-attr">[aaa, ccc]
</span></span></span></span></span></span></span></span></span></span></span></span></span></span></span></span></span></span></span></span></span></span></span></span></span></span></span></span></span></span></span></span></span></span></span></span></span></span></span></code></pre>
<ul>
<li>Long intersectAndStore(K key, Collection&lt;K&gt; otherKeys, K destKey);<br />
key对应的无序集合与多个otherKey对应的无序集合求交集存储到destKey无序集合中</li>


</ul>
<pre class="hljs cpp"><code class="cpp">使用：System.out.println(<span class="hljs-string">"setTest:" + <span class="hljs-keyword">template.opsForSet().members(<span class="hljs-string">"setTest"));
        System.out.println(<span class="hljs-string">"setTest2:" + <span class="hljs-keyword">template.opsForSet().members(<span class="hljs-string">"setTest2"));
        System.out.println(<span class="hljs-string">"setTest3:" + <span class="hljs-keyword">template.opsForSet().members(<span class="hljs-string">"setTest3"));
        List&lt;String&gt; strlist = <span class="hljs-keyword">new ArrayList&lt;String&gt;();
        strlist.add(<span class="hljs-string">"setTest2");
        strlist.add(<span class="hljs-string">"setTest3");
        System.out.println(<span class="hljs-keyword">template.opsForSet().intersectAndStore(<span class="hljs-string">"setTest",strlist,<span class="hljs-string">"destKey2"));
        System.out.println(<span class="hljs-keyword">template.opsForSet().members(<span class="hljs-string">"destKey2"));
结果：setTest:[ddd, bbb, aaa, ccc]
setTest2:[ccc, aaa]
setTest3:[ccc, aaa]
<span class="hljs-number">2
[aaa, ccc]
</span></span></span></span></span></span></span></span></span></span></span></span></span></span></span></span></span></span></code></pre>
<ul>
<li>Set&lt;V&gt; union(K key, K otherKey);<br />
key无序集合与otherKey无序集合的并集</li>


</ul>
<pre class="hljs css"><code class="css">使用：<span class="hljs-selector-tag">System<span class="hljs-selector-class">.out<span class="hljs-selector-class">.println("<span class="hljs-selector-tag">setTest<span class="hljs-selector-pseudo">:" + <span class="hljs-selector-tag">template<span class="hljs-selector-class">.opsForSet()<span class="hljs-selector-class">.members("<span class="hljs-selector-tag">setTest"));
        <span class="hljs-selector-tag">System<span class="hljs-selector-class">.out<span class="hljs-selector-class">.println("<span class="hljs-selector-tag">setTest2<span class="hljs-selector-pseudo">:" + <span class="hljs-selector-tag">template<span class="hljs-selector-class">.opsForSet()<span class="hljs-selector-class">.members("<span class="hljs-selector-tag">setTest2"));
        <span class="hljs-selector-tag">System<span class="hljs-selector-class">.out<span class="hljs-selector-class">.println(<span class="hljs-selector-tag">template<span class="hljs-selector-class">.opsForSet()<span class="hljs-selector-class">.union("<span class="hljs-selector-tag">setTest","<span class="hljs-selector-tag">setTest2"));
结果：<span class="hljs-selector-tag">setTest:<span class="hljs-selector-attr">[ddd, bbb, aaa, ccc]
<span class="hljs-selector-tag">setTest2:<span class="hljs-selector-attr">[ccc, aaa]
<span class="hljs-selector-attr">[ccc, aaa, ddd, bbb]
</span></span></span></span></span></span></span></span></span></span></span></span></span></span></span></span></span></span></span></span></span></span></span></span></span></span></span></span></span></span></span></code></pre>
<ul>
<li>Set&lt;V&gt; union(K key, Collection&lt;K&gt; otherKeys);<br />
key无序集合与多个otherKey无序集合的并集</li>


</ul>
<pre class="hljs cpp"><code class="cpp">使用：System.out.println(<span class="hljs-string">"setTest:" + <span class="hljs-keyword">template.opsForSet().members(<span class="hljs-string">"setTest"));
        System.out.println(<span class="hljs-string">"setTest2:" + <span class="hljs-keyword">template.opsForSet().members(<span class="hljs-string">"setTest2"));
        System.out.println(<span class="hljs-string">"setTest3:" + <span class="hljs-keyword">template.opsForSet().members(<span class="hljs-string">"setTest3"));
        List&lt;String&gt; strlist = <span class="hljs-keyword">new ArrayList&lt;String&gt;();
        strlist.add(<span class="hljs-string">"setTest2");
        strlist.add(<span class="hljs-string">"setTest3");
        System.out.println(<span class="hljs-keyword">template.opsForSet().<span class="hljs-keyword">union(<span class="hljs-string">"setTest",strlist));
结果：setTest:[ddd, bbb, aaa, ccc]
setTest2:[ccc, aaa]
setTest3:[xxx, ccc, aaa]
[ddd, xxx, bbb, aaa, ccc]
</span></span></span></span></span></span></span></span></span></span></span></span></span></span></span></code></pre>
<ul>
<li>Long unionAndStore(K key, K otherKey, K destKey);<br />
key无序集合与otherkey无序集合的并集存储到destKey无序集合中</li>


</ul>
<pre class="hljs css"><code class="css">使用：<span class="hljs-selector-tag">System<span class="hljs-selector-class">.out<span class="hljs-selector-class">.println("<span class="hljs-selector-tag">setTest<span class="hljs-selector-pseudo">:" + <span class="hljs-selector-tag">template<span class="hljs-selector-class">.opsForSet()<span class="hljs-selector-class">.members("<span class="hljs-selector-tag">setTest"));
        <span class="hljs-selector-tag">System<span class="hljs-selector-class">.out<span class="hljs-selector-class">.println("<span class="hljs-selector-tag">setTest2<span class="hljs-selector-pseudo">:" + <span class="hljs-selector-tag">template<span class="hljs-selector-class">.opsForSet()<span class="hljs-selector-class">.members("<span class="hljs-selector-tag">setTest2"));
        <span class="hljs-selector-tag">System<span class="hljs-selector-class">.out<span class="hljs-selector-class">.println(<span class="hljs-selector-tag">template<span class="hljs-selector-class">.opsForSet()<span class="hljs-selector-class">.unionAndStore("<span class="hljs-selector-tag">setTest","<span class="hljs-selector-tag">setTest2","<span class="hljs-selector-tag">unionAndStoreTest1"));
        <span class="hljs-selector-tag">System<span class="hljs-selector-class">.out<span class="hljs-selector-class">.println("<span class="hljs-selector-tag">unionAndStoreTest1<span class="hljs-selector-pseudo">:" + <span class="hljs-selector-tag">template<span class="hljs-selector-class">.opsForSet()<span class="hljs-selector-class">.members("<span class="hljs-selector-tag">unionAndStoreTest1"));
结果：<span class="hljs-selector-tag">setTest:<span class="hljs-selector-attr">[ddd, bbb, aaa, ccc]
<span class="hljs-selector-tag">setTest2:<span class="hljs-selector-attr">[ccc, aaa]
4
<span class="hljs-selector-tag">unionAndStoreTest1:<span class="hljs-selector-attr">[ccc, aaa, ddd, bbb]
</span></span></span></span></span></span></span></span></span></span></span></span></span></span></span></span></span></span></span></span></span></span></span></span></span></span></span></span></span></span></span></span></span></span></span></span></span></span></span></span></span></span></code></pre>
<ul>
<li>Long unionAndStore(K key, Collection&lt;K&gt; otherKeys, K destKey);<br />
key无序集合与多个otherkey无序集合的并集存储到destKey无序集合中</li>


</ul>
<pre class="hljs cpp"><code class="cpp">使用：System.out.println(<span class="hljs-string">"setTest:" + <span class="hljs-keyword">template.opsForSet().members(<span class="hljs-string">"setTest"));
        System.out.println(<span class="hljs-string">"setTest2:" + <span class="hljs-keyword">template.opsForSet().members(<span class="hljs-string">"setTest2"));
        System.out.println(<span class="hljs-string">"setTest3:" + <span class="hljs-keyword">template.opsForSet().members(<span class="hljs-string">"setTest3"));
        List&lt;String&gt; strlist = <span class="hljs-keyword">new ArrayList&lt;String&gt;();
        strlist.add(<span class="hljs-string">"setTest2");
        strlist.add(<span class="hljs-string">"setTest3");
        System.out.println(<span class="hljs-keyword">template.opsForSet().unionAndStore(<span class="hljs-string">"setTest",strlist,<span class="hljs-string">"unionAndStoreTest2"));
        System.out.println(<span class="hljs-string">"unionAndStoreTest2:" + <span class="hljs-keyword">template.opsForSet().members(<span class="hljs-string">"unionAndStoreTest2"));
结果：setTest:[ddd, bbb, aaa, ccc]
setTest2:[ccc, aaa]
setTest3:[xxx, ccc, aaa]
<span class="hljs-number">5
unionAndStoreTest2:[ddd, xxx, bbb, aaa, ccc]
</span></span></span></span></span></span></span></span></span></span></span></span></span></span></span></span></span></span></span></code></pre>
<ul>
<li>Set&lt;V&gt; difference(K key, K otherKey);<br />
key无序集合与otherKey无序集合的差集</li>


</ul>
<pre class="hljs css"><code class="css">使用：<span class="hljs-selector-tag">System<span class="hljs-selector-class">.out<span class="hljs-selector-class">.println("<span class="hljs-selector-tag">setTest<span class="hljs-selector-pseudo">:" + <span class="hljs-selector-tag">template<span class="hljs-selector-class">.opsForSet()<span class="hljs-selector-class">.members("<span class="hljs-selector-tag">setTest"));
        <span class="hljs-selector-tag">System<span class="hljs-selector-class">.out<span class="hljs-selector-class">.println("<span class="hljs-selector-tag">setTest2<span class="hljs-selector-pseudo">:" + <span class="hljs-selector-tag">template<span class="hljs-selector-class">.opsForSet()<span class="hljs-selector-class">.members("<span class="hljs-selector-tag">setTest2"));
        <span class="hljs-selector-tag">System<span class="hljs-selector-class">.out<span class="hljs-selector-class">.println(<span class="hljs-selector-tag">template<span class="hljs-selector-class">.opsForSet()<span class="hljs-selector-class">.difference("<span class="hljs-selector-tag">setTest","<span class="hljs-selector-tag">setTest2"));
结果：<span class="hljs-selector-tag">setTest:<span class="hljs-selector-attr">[ddd, bbb, aaa, ccc]
<span class="hljs-selector-tag">setTest2:<span class="hljs-selector-attr">[ccc, aaa]
<span class="hljs-selector-attr">[bbb, ddd]
</span></span></span></span></span></span></span></span></span></span></span></span></span></span></span></span></span></span></span></span></span></span></span></span></span></span></span></span></span></span></span></code></pre>
<ul>
<li>Set&lt;V&gt; difference(K key, Collection&lt;K&gt; otherKeys);<br />
key无序集合与多个otherKey无序集合的差集</li>


</ul>
<pre class="hljs cpp"><code class="cpp">使用：System.out.println(<span class="hljs-string">"setTest:" + <span class="hljs-keyword">template.opsForSet().members(<span class="hljs-string">"setTest"));
        System.out.println(<span class="hljs-string">"setTest2:" + <span class="hljs-keyword">template.opsForSet().members(<span class="hljs-string">"setTest2"));
        System.out.println(<span class="hljs-string">"setTest3:" + <span class="hljs-keyword">template.opsForSet().members(<span class="hljs-string">"setTest3"));
        List&lt;String&gt; strlist = <span class="hljs-keyword">new ArrayList&lt;String&gt;();
        strlist.add(<span class="hljs-string">"setTest2");
        strlist.add(<span class="hljs-string">"setTest3");
        System.out.println(<span class="hljs-keyword">template.opsForSet().difference(<span class="hljs-string">"setTest",strlist));
结果：setTest:[ddd, bbb, aaa, ccc]
setTest2:[ccc, aaa]
setTest3:[xxx, ccc, aaa]
[bbb, ddd]
</span></span></span></span></span></span></span></span></span></span></span></span></span></span></code></pre>
<ul>
<li>Long differenceAndStore(K key, K otherKey, K destKey);<br />
key无序集合与otherkey无序集合的差集存储到destKey无序集合中</li>


</ul>
<pre class="hljs css"><code class="css">使用：<span class="hljs-selector-tag">System<span class="hljs-selector-class">.out<span class="hljs-selector-class">.println("<span class="hljs-selector-tag">setTest<span class="hljs-selector-pseudo">:" + <span class="hljs-selector-tag">template<span class="hljs-selector-class">.opsForSet()<span class="hljs-selector-class">.members("<span class="hljs-selector-tag">setTest"));
        <span class="hljs-selector-tag">System<span class="hljs-selector-class">.out<span class="hljs-selector-class">.println("<span class="hljs-selector-tag">setTest2<span class="hljs-selector-pseudo">:" + <span class="hljs-selector-tag">template<span class="hljs-selector-class">.opsForSet()<span class="hljs-selector-class">.members("<span class="hljs-selector-tag">setTest2"));
        <span class="hljs-selector-tag">System<span class="hljs-selector-class">.out<span class="hljs-selector-class">.println(<span class="hljs-selector-tag">template<span class="hljs-selector-class">.opsForSet()<span class="hljs-selector-class">.differenceAndStore("<span class="hljs-selector-tag">setTest","<span class="hljs-selector-tag">setTest2","<span class="hljs-selector-tag">differenceAndStore1"));
        <span class="hljs-selector-tag">System<span class="hljs-selector-class">.out<span class="hljs-selector-class">.println("<span class="hljs-selector-tag">differenceAndStore1<span class="hljs-selector-pseudo">:" + <span class="hljs-selector-tag">template<span class="hljs-selector-class">.opsForSet()<span class="hljs-selector-class">.members("<span class="hljs-selector-tag">differenceAndStore1"));
结果：<span class="hljs-selector-tag">setTest:<span class="hljs-selector-attr">[ddd, bbb, aaa, ccc]
<span class="hljs-selector-tag">setTest2:<span class="hljs-selector-attr">[ccc, aaa]
2
<span class="hljs-selector-tag">differenceAndStore1:<span class="hljs-selector-attr">[bbb, ddd]
</span></span></span></span></span></span></span></span></span></span></span></span></span></span></span></span></span></span></span></span></span></span></span></span></span></span></span></span></span></span></span></span></span></span></span></span></span></span></span></span></span></span></code></pre>
<ul>
<li>Long differenceAndStore(K key, Collection&lt;K&gt; otherKeys, K destKey);<br />
key无序集合与多个otherkey无序集合的差集存储到destKey无序集合中</li>


</ul>
<pre class="hljs cpp"><code class="cpp">使用：System.out.println(<span class="hljs-string">"setTest:" + <span class="hljs-keyword">template.opsForSet().members(<span class="hljs-string">"setTest"));
        System.out.println(<span class="hljs-string">"setTest2:" + <span class="hljs-keyword">template.opsForSet().members(<span class="hljs-string">"setTest2"));
        System.out.println(<span class="hljs-string">"setTest3:" + <span class="hljs-keyword">template.opsForSet().members(<span class="hljs-string">"setTest3"));
        List&lt;String&gt; strlist = <span class="hljs-keyword">new ArrayList&lt;String&gt;();
        strlist.add(<span class="hljs-string">"setTest2");
        strlist.add(<span class="hljs-string">"setTest3");
        System.out.println(<span class="hljs-keyword">template.opsForSet().differenceAndStore(<span class="hljs-string">"setTest",strlist,<span class="hljs-string">"differenceAndStore2"));
        System.out.println(<span class="hljs-string">"differenceAndStore2:" + <span class="hljs-keyword">template.opsForSet().members(<span class="hljs-string">"differenceAndStore2"));
结果：setTest:[ddd, bbb, aaa, ccc]
setTest2:[ccc, aaa]
setTest3:[xxx, ccc, aaa]
<span class="hljs-number">2
differenceAndStore2:[bbb, ddd]
</span></span></span></span></span></span></span></span></span></span></span></span></span></span></span></span></span></span></span></code></pre>
<ul>
<li>Set&lt;V&gt; members(K key);<br />
返回集合中的所有成员</li>


</ul>
<pre class="hljs css"><code class="css">使用：<span class="hljs-selector-tag">System<span class="hljs-selector-class">.out<span class="hljs-selector-class">.println(<span class="hljs-selector-tag">template<span class="hljs-selector-class">.opsForSet()<span class="hljs-selector-class">.members("<span class="hljs-selector-tag">setTest"));
结果：<span class="hljs-selector-attr">[ddd, bbb, aaa, ccc]
</span></span></span></span></span></span></span></span></code></pre>
<ul>
<li>V randomMember(K key);<br />
随机获取key无序集合中的一个元素</li>


</ul>
<pre class="hljs css"><code class="css">使用：<span class="hljs-selector-tag">System<span class="hljs-selector-class">.out<span class="hljs-selector-class">.println("<span class="hljs-selector-tag">setTest<span class="hljs-selector-pseudo">:" + <span class="hljs-selector-tag">template<span class="hljs-selector-class">.opsForSet()<span class="hljs-selector-class">.members("<span class="hljs-selector-tag">setTest"));
        <span class="hljs-selector-tag">System<span class="hljs-selector-class">.out<span class="hljs-selector-class">.println("<span class="hljs-selector-tag">setTestrandomMember<span class="hljs-selector-pseudo">:" + <span class="hljs-selector-tag">template<span class="hljs-selector-class">.opsForSet()<span class="hljs-selector-class">.randomMember("<span class="hljs-selector-tag">setTest"));
        <span class="hljs-selector-tag">System<span class="hljs-selector-class">.out<span class="hljs-selector-class">.println("<span class="hljs-selector-tag">setTestrandomMember<span class="hljs-selector-pseudo">:" + <span class="hljs-selector-tag">template<span class="hljs-selector-class">.opsForSet()<span class="hljs-selector-class">.randomMember("<span class="hljs-selector-tag">setTest"));
        <span class="hljs-selector-tag">System<span class="hljs-selector-class">.out<span class="hljs-selector-class">.println("<span class="hljs-selector-tag">setTestrandomMember<span class="hljs-selector-pseudo">:" + <span class="hljs-selector-tag">template<span class="hljs-selector-class">.opsForSet()<span class="hljs-selector-class">.randomMember("<span class="hljs-selector-tag">setTest"));
        <span class="hljs-selector-tag">System<span class="hljs-selector-class">.out<span class="hljs-selector-class">.println("<span class="hljs-selector-tag">setTestrandomMember<span class="hljs-selector-pseudo">:" + <span class="hljs-selector-tag">template<span class="hljs-selector-class">.opsForSet()<span class="hljs-selector-class">.randomMember("<span class="hljs-selector-tag">setTest"));
结果：<span class="hljs-selector-tag">setTest:<span class="hljs-selector-attr">[ddd, bbb, aaa, ccc]
<span class="hljs-selector-tag">setTestrandomMember<span class="hljs-selector-pseudo">:aaa
<span class="hljs-selector-tag">setTestrandomMember<span class="hljs-selector-pseudo">:bbb
<span class="hljs-selector-tag">setTestrandomMember<span class="hljs-selector-pseudo">:aaa
<span class="hljs-selector-tag">setTestrandomMember<span class="hljs-selector-pseudo">:ddd
</span></span></span></span></span></span></span></span></span></span></span></span></span></span></span></span></span></span></span></span></span></span></span></span></span></span></span></span></span></span></span></span></span></span></span></span></span></span></span></span></span></span></span></span></span></span></span></span></span></span></span></span></span></span></span></code></pre>
<ul>
<li>Set&lt;V&gt; distinctRandomMembers(K key, long count);<br />
获取多个key无序集合中的元素（去重），count表示个数</li>


</ul>
<pre class="hljs css"><code class="css">使用：<span class="hljs-selector-tag">System<span class="hljs-selector-class">.out<span class="hljs-selector-class">.println("<span class="hljs-selector-tag">randomMembers<span class="hljs-selector-pseudo">:" + <span class="hljs-selector-tag">template<span class="hljs-selector-class">.opsForSet()<span class="hljs-selector-class">.distinctRandomMembers("<span class="hljs-selector-tag">setTest",5));
结果：<span class="hljs-selector-tag">randomMembers:<span class="hljs-selector-attr">[aaa, bbb, ddd, ccc]
</span></span></span></span></span></span></span></span></span></span></span></code></pre>
<ul>
<li>List&lt;V&gt; randomMembers(K key, long count);<br />
获取多个key无序集合中的元素，count表示个数</li>


</ul>
<pre class="hljs css"><code class="css">使用：<span class="hljs-selector-tag">System<span class="hljs-selector-class">.out<span class="hljs-selector-class">.println("<span class="hljs-selector-tag">randomMembers<span class="hljs-selector-pseudo">:" + <span class="hljs-selector-tag">template<span class="hljs-selector-class">.opsForSet()<span class="hljs-selector-class">.randomMembers("<span class="hljs-selector-tag">setTest",5));
结果：<span class="hljs-selector-tag">randomMembers:<span class="hljs-selector-attr">[ccc, ddd, ddd, ddd, aaa]
</span></span></span></span></span></span></span></span></span></span></span></code></pre>
<ul>
<li>Cursor&lt;V&gt; scan(K key, ScanOptions options);<br />
遍历set</li>


</ul>
<pre class="hljs cpp"><code class="cpp">使用： Cursor&lt;Object&gt; curosr = <span class="hljs-keyword">template.opsForSet().scan(<span class="hljs-string">"setTest", ScanOptions.NONE);
        <span class="hljs-keyword">while(curosr.hasNext()){
            System.out.println(curosr.next());
        }
结果：ddd
bbb
aaa
ccc
</span></span></span></code></pre>
<h1>Redis的ZSet数据结构</h1>
<p>Redis 有序集合和无序集合一样也是string类型元素的集合,且不允许重复的成员。<br />
不同的是每个元素都会关联一个double类型的分数。redis正是通过分数来为集合中的成员进行从小到大的排序。<br />
有序集合的成员是唯一的,但分数(score)却可以重复。<br />
public interface ZSetOperations&lt;K,V&gt;<br />
ZSetOperations提供了一系列方法对有序集合进行操作：</p>
<ul>
<li>Boolean add(K key, V value, double score);<br />
新增一个有序集合，存在的话为false，不存在的话为true</li>


</ul>
<pre class="hljs css"><code class="css">使用：<span class="hljs-selector-tag">System<span class="hljs-selector-class">.out<span class="hljs-selector-class">.println(<span class="hljs-selector-tag">template<span class="hljs-selector-class">.opsForZSet()<span class="hljs-selector-class">.add("<span class="hljs-selector-tag">zset1","<span class="hljs-selector-tag">zset-1",1<span class="hljs-selector-class">.0));
结果：<span class="hljs-selector-tag">true
</span></span></span></span></span></span></span></span></span></span></code></pre>
<ul>
<li>Long add(K key, Set&lt;TypedTuple&lt;V&gt;&gt; tuples);<br />
新增一个有序集合</li>


</ul>
<pre class="hljs javascript"><code class="javascript">使用：ZSetOperations.TypedTuple&lt;<span class="hljs-built_in">Object&gt; objectTypedTuple1 = <span class="hljs-keyword">new DefaultTypedTuple&lt;<span class="hljs-built_in">Object&gt;(<span class="hljs-string">"zset-5",<span class="hljs-number">9.6);
        ZSetOperations.TypedTuple&lt;<span class="hljs-built_in">Object&gt; objectTypedTuple2 = <span class="hljs-keyword">new DefaultTypedTuple&lt;<span class="hljs-built_in">Object&gt;(<span class="hljs-string">"zset-6",<span class="hljs-number">9.9);
        <span class="hljs-built_in">Set&lt;ZSetOperations.TypedTuple&lt;<span class="hljs-built_in">Object&gt;&gt; tuples = <span class="hljs-keyword">new HashSet&lt;ZSetOperations.TypedTuple&lt;<span class="hljs-built_in">Object&gt;&gt;();
        tuples.add(objectTypedTuple1);
        tuples.add(objectTypedTuple2);
        System.out.println(template.opsForZSet().add(<span class="hljs-string">"zset1",tuples));
        System.out.println(template.opsForZSet().range(<span class="hljs-string">"zset1",<span class="hljs-number">0,<span class="hljs-number">-1));
结果：[zset<span class="hljs-number">-1, zset<span class="hljs-number">-2, zset<span class="hljs-number">-3, zset<span class="hljs-number">-4, zset<span class="hljs-number">-5, zset<span class="hljs-number">-6]
</span></span></span></span></span></span></span></span></span></span></span></span></span></span></span></span></span></span></span></span></span></span></span></span></code></pre>
<ul>
<li>Long remove(K key, Object... values);<br />
从有序集合中移除一个或者多个元素</li>


</ul>
<pre class="hljs css"><code class="css">使用：<span class="hljs-selector-tag">System<span class="hljs-selector-class">.out<span class="hljs-selector-class">.println(<span class="hljs-selector-tag">template<span class="hljs-selector-class">.opsForZSet()<span class="hljs-selector-class">.range("<span class="hljs-selector-tag">zset1",0,<span class="hljs-selector-tag">-1));
        <span class="hljs-selector-tag">System<span class="hljs-selector-class">.out<span class="hljs-selector-class">.println(<span class="hljs-selector-tag">template<span class="hljs-selector-class">.opsForZSet()<span class="hljs-selector-class">.remove("<span class="hljs-selector-tag">zset1","<span class="hljs-selector-tag">zset-6"));
        <span class="hljs-selector-tag">System<span class="hljs-selector-class">.out<span class="hljs-selector-class">.println(<span class="hljs-selector-tag">template<span class="hljs-selector-class">.opsForZSet()<span class="hljs-selector-class">.range("<span class="hljs-selector-tag">zset1",0,<span class="hljs-selector-tag">-1));
结果：<span class="hljs-selector-attr">[zset-1, zset-2, zset-3, zset-4, zset-5, zset-6]
1
<span class="hljs-selector-attr">[zset-1, zset-2, zset-3, zset-4, zset-5]
</span></span></span></span></span></span></span></span></span></span></span></span></span></span></span></span></span></span></span></span></span></span></span></span></span></span></code></pre>
<ul>
<li>Double incrementScore(K key, V value, double delta);<br />
增加元素的score值，并返回增加后的值</li>


</ul>
<pre class="hljs cpp"><code class="cpp">使用：System.out.println(<span class="hljs-keyword">template.opsForZSet().incrementScore(<span class="hljs-string">"zset1",<span class="hljs-string">"zset-1",<span class="hljs-number">1.1));  <span class="hljs-comment">//原为1.1
结果：<span class="hljs-number">2.2
</span></span></span></span></span></span></code></pre>
<ul>
<li>Long rank(K key, Object o);<br />
返回有序集中指定成员的排名，其中有序集成员按分数值递增(从小到大)顺序排列</li>


</ul>
<pre class="hljs cpp"><code class="cpp">使用：System.out.println(<span class="hljs-keyword">template.opsForZSet().range(<span class="hljs-string">"zset1",<span class="hljs-number">0,<span class="hljs-number">-1));
        System.out.println(<span class="hljs-keyword">template.opsForZSet().rank(<span class="hljs-string">"zset1",<span class="hljs-string">"zset-2"));
结果：[zset<span class="hljs-number">-2, zset<span class="hljs-number">-1, zset<span class="hljs-number">-3, zset<span class="hljs-number">-4, zset<span class="hljs-number">-5]
<span class="hljs-number">0   <span class="hljs-comment">//表明排名第一
</span></span></span></span></span></span></span></span></span></span></span></span></span></span></code></pre>
<ul>
<li>Long reverseRank(K key, Object o);<br />
返回有序集中指定成员的排名，其中有序集成员按分数值递减(从大到小)顺序排列</li>


</ul>
<pre class="hljs cpp"><code class="cpp">使用：System.out.println(<span class="hljs-keyword">template.opsForZSet().range(<span class="hljs-string">"zset1",<span class="hljs-number">0,<span class="hljs-number">-1));
        System.out.println(<span class="hljs-keyword">template.opsForZSet().reverseRank(<span class="hljs-string">"zset1",<span class="hljs-string">"zset-2"));
结果：[zset<span class="hljs-number">-2, zset<span class="hljs-number">-1, zset<span class="hljs-number">-3, zset<span class="hljs-number">-4, zset<span class="hljs-number">-5]
<span class="hljs-number">4 <span class="hljs-comment">//递减之后排到第五位去了
</span></span></span></span></span></span></span></span></span></span></span></span></span></span></code></pre>
<ul>
<li>Set&lt;V&gt; range(K key, long start, long end);<br />
通过索引区间返回有序集合成指定区间内的成员，其中有序集成员按分数值递增(从小到大)顺序排列</li>


</ul>
<pre class="hljs css"><code class="css">使用：<span class="hljs-selector-tag">System<span class="hljs-selector-class">.out<span class="hljs-selector-class">.println(<span class="hljs-selector-tag">template<span class="hljs-selector-class">.opsForZSet()<span class="hljs-selector-class">.range("<span class="hljs-selector-tag">zset1",0,<span class="hljs-selector-tag">-1));
结果：<span class="hljs-selector-attr">[zset-2, zset-1, zset-3, zset-4, zset-5]
</span></span></span></span></span></span></span></span></span></code></pre>
<ul>
<li>Set&lt;TypedTuple&lt;V&gt;&gt; rangeWithScores(K key, long start, long end);<br />
通过索引区间返回有序集合成指定区间内的成员对象，其中有序集成员按分数值递增(从小到大)顺序排列</li>


</ul>
<pre class="hljs javascript"><code class="javascript">使用：<span class="hljs-built_in">Set&lt;ZSetOperations.TypedTuple&lt;<span class="hljs-built_in">Object&gt;&gt; tuples = template.opsForZSet().rangeWithScores(<span class="hljs-string">"zset1",<span class="hljs-number">0,<span class="hljs-number">-1);
        Iterator&lt;ZSetOperations.TypedTuple&lt;<span class="hljs-built_in">Object&gt;&gt; iterator = tuples.iterator();
        <span class="hljs-keyword">while (iterator.hasNext())
        {
            ZSetOperations.TypedTuple&lt;<span class="hljs-built_in">Object&gt; typedTuple = iterator.next();
            System.out.println(<span class="hljs-string">"value:" + typedTuple.getValue() + <span class="hljs-string">"score:" + typedTuple.getScore());
        }
结果：value:zset<span class="hljs-number">-2score:<span class="hljs-number">1.2
value:zset<span class="hljs-number">-1score:<span class="hljs-number">2.2
value:zset<span class="hljs-number">-3score:<span class="hljs-number">2.3
value:zset<span class="hljs-number">-4score:<span class="hljs-number">6.6
value:zset<span class="hljs-number">-5score:<span class="hljs-number">9.6
</span></span></span></span></span></span></span></span></span></span></span></span></span></span></span></span></span></span></span></span></code></pre>
<ul>
<li>Set&lt;V&gt; rangeByScore(K key, double min, double max);<br />
通过分数返回有序集合指定区间内的成员，其中有序集成员按分数值递增(从小到大)顺序排列</li>


</ul>
<pre class="hljs css"><code class="css">使用：<span class="hljs-selector-tag">System<span class="hljs-selector-class">.out<span class="hljs-selector-class">.println(<span class="hljs-selector-tag">template<span class="hljs-selector-class">.opsForZSet()<span class="hljs-selector-class">.rangeByScore("<span class="hljs-selector-tag">zset1",0,5));
结果：<span class="hljs-selector-attr">[zset-2, zset-1, zset-3]
</span></span></span></span></span></span></span></span></code></pre>
<ul>
<li>Set&lt;TypedTuple&lt;V&gt;&gt; rangeByScoreWithScores(K key, double min, double max);<br />
通过分数返回有序集合指定区间内的成员对象，其中有序集成员按分数值递增(从小到大)顺序排列</li>


</ul>
<pre class="hljs javascript"><code class="javascript">使用：<span class="hljs-built_in">Set&lt;ZSetOperations.TypedTuple&lt;<span class="hljs-built_in">Object&gt;&gt; tuples = template.opsForZSet().rangeByScoreWithScores(<span class="hljs-string">"zset1",<span class="hljs-number">0,<span class="hljs-number">5);
        Iterator&lt;ZSetOperations.TypedTuple&lt;<span class="hljs-built_in">Object&gt;&gt; iterator = tuples.iterator();
        <span class="hljs-keyword">while (iterator.hasNext())
        {
            ZSetOperations.TypedTuple&lt;<span class="hljs-built_in">Object&gt; typedTuple = iterator.next();
            System.out.println(<span class="hljs-string">"value:" + typedTuple.getValue() + <span class="hljs-string">"score:" + typedTuple.getScore());
        }
结果：value:zset<span class="hljs-number">-2score:<span class="hljs-number">1.2
value:zset<span class="hljs-number">-1score:<span class="hljs-number">2.2
value:zset<span class="hljs-number">-3score:<span class="hljs-number">2.3
</span></span></span></span></span></span></span></span></span></span></span></span></span></span></span></span></code></pre>
<ul>
<li>Set&lt;V&gt; rangeByScore(K key, double min, double max, long offset, long count);<br />
通过分数返回有序集合指定区间内的成员，并在索引范围内，其中有序集成员按分数值递增(从小到大)顺序排列</li>


</ul>
<pre class="hljs css"><code class="css">使用： <span class="hljs-selector-tag">System<span class="hljs-selector-class">.out<span class="hljs-selector-class">.println(<span class="hljs-selector-tag">template<span class="hljs-selector-class">.opsForZSet()<span class="hljs-selector-class">.rangeByScore("<span class="hljs-selector-tag">zset1",0,5));
    <span class="hljs-selector-tag">System<span class="hljs-selector-class">.out<span class="hljs-selector-class">.println(<span class="hljs-selector-tag">template<span class="hljs-selector-class">.opsForZSet()<span class="hljs-selector-class">.rangeByScore("<span class="hljs-selector-tag">zset1",0,5,1,2));
结果：<span class="hljs-selector-attr">[zset-2, zset-1, zset-3]
<span class="hljs-selector-attr">[zset-1, zset-3]
</span></span></span></span></span></span></span></span></span></span></span></span></span></span></span></span></code></pre>
<ul>
<li>Set&lt;TypedTuple&lt;V&gt;&gt; rangeByScoreWithScores(K key, double min, double max, long offset, long count);<br />
通过分数返回有序集合指定区间内的成员对象，并在索引范围内，其中有序集成员按分数值递增(从小到大)顺序排列</li>


</ul>
<pre class="hljs javascript"><code class="javascript">使用：<span class="hljs-built_in">Set&lt;ZSetOperations.TypedTuple&lt;<span class="hljs-built_in">Object&gt;&gt; tuples = template.opsForZSet().rangeByScoreWithScores(<span class="hljs-string">"zset1",<span class="hljs-number">0,<span class="hljs-number">5,<span class="hljs-number">1,<span class="hljs-number">2);
        Iterator&lt;ZSetOperations.TypedTuple&lt;<span class="hljs-built_in">Object&gt;&gt; iterator = tuples.iterator();
        <span class="hljs-keyword">while (iterator.hasNext())
        {
            ZSetOperations.TypedTuple&lt;<span class="hljs-built_in">Object&gt; typedTuple = iterator.next();
            System.out.println(<span class="hljs-string">"value:" + typedTuple.getValue() + <span class="hljs-string">"score:" + typedTuple.getScore());
        }
结果：value:zset<span class="hljs-number">-1score:<span class="hljs-number">2.2
value:zset<span class="hljs-number">-3score:<span class="hljs-number">2.3
</span></span></span></span></span></span></span></span></span></span></span></span></span></span></span></span></code></pre>
<ul>
<li>Set&lt;V&gt; reverseRange(K key, long start, long end);<br />
通过索引区间返回有序集合成指定区间内的成员，其中有序集成员按分数值递减(从大到小)顺序排列</li>


</ul>
<pre class="hljs css"><code class="css">使用：<span class="hljs-selector-tag">System<span class="hljs-selector-class">.out<span class="hljs-selector-class">.println(<span class="hljs-selector-tag">template<span class="hljs-selector-class">.opsForZSet()<span class="hljs-selector-class">.reverseRange("<span class="hljs-selector-tag">zset1",0,<span class="hljs-selector-tag">-1));
结果：<span class="hljs-selector-attr">[zset-5, zset-4, zset-3, zset-1, zset-2]
</span></span></span></span></span></span></span></span></span></code></pre>
<ul>
<li>Set&lt;TypedTuple&lt;V&gt;&gt; reverseRangeWithScores(K key, long start, long end);<br />
通过索引区间返回有序集合成指定区间内的成员对象，其中有序集成员按分数值递减(从大到小)顺序排列</li>


</ul>
<pre class="hljs javascript"><code class="javascript">使用：<span class="hljs-built_in">Set&lt;ZSetOperations.TypedTuple&lt;<span class="hljs-built_in">Object&gt;&gt; tuples = template.opsForZSet().reverseRangeWithScores(<span class="hljs-string">"zset1",<span class="hljs-number">0,<span class="hljs-number">-1);
        Iterator&lt;ZSetOperations.TypedTuple&lt;<span class="hljs-built_in">Object&gt;&gt; iterator = tuples.iterator();
        <span class="hljs-keyword">while (iterator.hasNext())
        {
            ZSetOperations.TypedTuple&lt;<span class="hljs-built_in">Object&gt; typedTuple = iterator.next();
            System.out.println(<span class="hljs-string">"value:" + typedTuple.getValue() + <span class="hljs-string">"score:" + typedTuple.getScore());
        }
结果：value:zset<span class="hljs-number">-5score:<span class="hljs-number">9.6
value:zset<span class="hljs-number">-4score:<span class="hljs-number">6.6
value:zset<span class="hljs-number">-3score:<span class="hljs-number">2.3
value:zset<span class="hljs-number">-1score:<span class="hljs-number">2.2
value:zset<span class="hljs-number">-2score:<span class="hljs-number">1.2
</span></span></span></span></span></span></span></span></span></span></span></span></span></span></span></span></span></span></span></span></code></pre>
<ul>
<li>Set&lt;V&gt; reverseRangeByScore(K key, double min, double max);</li>
</ul>
<pre class="hljs undefined"><code>使用：与rangeByScore调用方法一样，其中有序集成员按分数值递减(从大到小)顺序排列
</code></pre>
<ul>
<li>Set&lt;TypedTuple&lt;V&gt;&gt; reverseRangeByScoreWithScores(K key, double min, double max);</li>
</ul>
<pre class="hljs undefined"><code>使用：与rangeByScoreWithScores调用方法一样，其中有序集成员按分数值递减(从大到小)顺序排列
</code></pre>
<ul>
<li>Set&lt;V&gt; reverseRangeByScore(K key, double min, double max, long offset, long count);</li>
</ul>
<pre class="hljs undefined"><code>使用：与rangeByScore调用方法一样，其中有序集成员按分数值递减(从大到小)顺序排列
</code></pre>
<ul>
<li>Set&lt;TypedTuple&lt;V&gt;&gt; reverseRangeByScoreWithScores(K key, double min, double max, long offset, long count);</li>
</ul>
<pre class="hljs undefined"><code>使用：与rangeByScoreWithScores调用方法一样，其中有序集成员按分数值递减(从大到小)顺序排列
</code></pre>
<ul>
<li>Long count(K key, double min, double max);<br />
通过分数返回有序集合指定区间内的成员个数</li>


</ul>
<pre class="hljs css"><code class="css">使用：<span class="hljs-selector-tag">System<span class="hljs-selector-class">.out<span class="hljs-selector-class">.println(<span class="hljs-selector-tag">template<span class="hljs-selector-class">.opsForZSet()<span class="hljs-selector-class">.rangeByScore("<span class="hljs-selector-tag">zset1",0,5));
        <span class="hljs-selector-tag">System<span class="hljs-selector-class">.out<span class="hljs-selector-class">.println(<span class="hljs-selector-tag">template<span class="hljs-selector-class">.opsForZSet()<span class="hljs-selector-class">.count("<span class="hljs-selector-tag">zset1",0,5));
结果：<span class="hljs-selector-attr">[zset-2, zset-1, zset-3]
3
</span></span></span></span></span></span></span></span></span></span></span></span></span></span></span></code></pre>
<ul>
<li>Long size(K key);<br />
获取有序集合的成员数，内部调用的就是zCard方法</li>


</ul>
<pre class="hljs css"><code class="css">使用：<span class="hljs-selector-tag">System<span class="hljs-selector-class">.out<span class="hljs-selector-class">.println(<span class="hljs-selector-tag">template<span class="hljs-selector-class">.opsForZSet()<span class="hljs-selector-class">.size("<span class="hljs-selector-tag">zset1"));
结果：6
</span></span></span></span></span></span></span></code></pre>
<ul>
<li>Long zCard(K key);<br />
获取有序集合的成员数</li>


</ul>
<pre class="hljs css"><code class="css">使用：<span class="hljs-selector-tag">System<span class="hljs-selector-class">.out<span class="hljs-selector-class">.println(<span class="hljs-selector-tag">template<span class="hljs-selector-class">.opsForZSet()<span class="hljs-selector-class">.zCard("<span class="hljs-selector-tag">zset1"));
结果：6
</span></span></span></span></span></span></span></code></pre>
<ul>
<li>Double score(K key, Object o);<br />
获取指定成员的score值</li>


</ul>
<pre class="hljs css"><code class="css">使用：<span class="hljs-selector-tag">System<span class="hljs-selector-class">.out<span class="hljs-selector-class">.println(<span class="hljs-selector-tag">template<span class="hljs-selector-class">.opsForZSet()<span class="hljs-selector-class">.score("<span class="hljs-selector-tag">zset1","<span class="hljs-selector-tag">zset-1"));
结果：2<span class="hljs-selector-class">.2
</span></span></span></span></span></span></span></span></span></code></pre>
<ul>
<li>Long removeRange(K key, long start, long end);<br />
移除指定索引位置的成员，其中有序集成员按分数值递增(从小到大)顺序排列</li>


</ul>
<pre class="hljs css"><code class="css">使用：<span class="hljs-selector-tag">System<span class="hljs-selector-class">.out<span class="hljs-selector-class">.println(<span class="hljs-selector-tag">template<span class="hljs-selector-class">.opsForZSet()<span class="hljs-selector-class">.range("<span class="hljs-selector-tag">zset2",0,<span class="hljs-selector-tag">-1));
        <span class="hljs-selector-tag">System<span class="hljs-selector-class">.out<span class="hljs-selector-class">.println(<span class="hljs-selector-tag">template<span class="hljs-selector-class">.opsForZSet()<span class="hljs-selector-class">.removeRange("<span class="hljs-selector-tag">zset2",1,2));
        <span class="hljs-selector-tag">System<span class="hljs-selector-class">.out<span class="hljs-selector-class">.println(<span class="hljs-selector-tag">template<span class="hljs-selector-class">.opsForZSet()<span class="hljs-selector-class">.range("<span class="hljs-selector-tag">zset2",0,<span class="hljs-selector-tag">-1));
结果：<span class="hljs-selector-attr">[zset-1, zset-2, zset-3, zset-4]
2
<span class="hljs-selector-attr">[zset-1, zset-4]
</span></span></span></span></span></span></span></span></span></span></span></span></span></span></span></span></span></span></span></span></span></span></span></span></span></code></pre>
<ul>
<li>Long removeRangeByScore(K key, double min, double max);<br />
根据指定的score值得范围来移除成员</li>


</ul>
<pre class="hljs bash"><code class="bash">使用：//System.out.println(template.opsForZSet().add(<span class="hljs-string">"zset2",<span class="hljs-string">"zset-1",1.1));
        //System.out.println(template.opsForZSet().add(<span class="hljs-string">"zset2",<span class="hljs-string">"zset-2",1.2));
        //System.out.println(template.opsForZSet().add(<span class="hljs-string">"zset2",<span class="hljs-string">"zset-3",2.3));
        //System.out.println(template.opsForZSet().add(<span class="hljs-string">"zset2",<span class="hljs-string">"zset-4",6.6));
System.out.println(template.opsForZSet().range(<span class="hljs-string">"zset2",0,-1));
System.out.println(template.opsForZSet().removeRangeByScore(<span class="hljs-string">"zset2",2,3));
    System.out.println(template.opsForZSet().range(<span class="hljs-string">"zset2",0,-1));
结果：[zset-1, zset-2, zset-3,zset-4]
1
[zset-1, zset-2, zset-4]
</span></span></span></span></span></span></span></span></span></span></span></code></pre>
<ul>
<li>Long unionAndStore(K key, K otherKey, K destKey);<br />
计算给定的一个有序集的并集，并存储在新的 destKey中，key相同的话会把score值相加</li>


</ul>
<pre class="hljs cpp"><code class="cpp">使用：System.out.println(<span class="hljs-keyword">template.opsForZSet().add(<span class="hljs-string">"zzset1",<span class="hljs-string">"zset-1",<span class="hljs-number">1.0));
        System.out.println(<span class="hljs-keyword">template.opsForZSet().add(<span class="hljs-string">"zzset1",<span class="hljs-string">"zset-2",<span class="hljs-number">2.0));
        System.out.println(<span class="hljs-keyword">template.opsForZSet().add(<span class="hljs-string">"zzset1",<span class="hljs-string">"zset-3",<span class="hljs-number">3.0));
        System.out.println(<span class="hljs-keyword">template.opsForZSet().add(<span class="hljs-string">"zzset1",<span class="hljs-string">"zset-4",<span class="hljs-number">6.0));

        System.out.println(<span class="hljs-keyword">template.opsForZSet().add(<span class="hljs-string">"zzset2",<span class="hljs-string">"zset-1",<span class="hljs-number">1.0));
        System.out.println(<span class="hljs-keyword">template.opsForZSet().add(<span class="hljs-string">"zzset2",<span class="hljs-string">"zset-2",<span class="hljs-number">2.0));
        System.out.println(<span class="hljs-keyword">template.opsForZSet().add(<span class="hljs-string">"zzset2",<span class="hljs-string">"zset-3",<span class="hljs-number">3.0));
        System.out.println(<span class="hljs-keyword">template.opsForZSet().add(<span class="hljs-string">"zzset2",<span class="hljs-string">"zset-4",<span class="hljs-number">6.0));
        System.out.println(<span class="hljs-keyword">template.opsForZSet().add(<span class="hljs-string">"zzset2",<span class="hljs-string">"zset-5",<span class="hljs-number">7.0));
        System.out.println(<span class="hljs-keyword">template.opsForZSet().unionAndStore(<span class="hljs-string">"zzset1",<span class="hljs-string">"zzset2",<span class="hljs-string">"destZset11"));

        Set&lt;ZSetOperations.TypedTuple&lt;Object&gt;&gt; tuples = <span class="hljs-keyword">template.opsForZSet().rangeWithScores(<span class="hljs-string">"destZset11",<span class="hljs-number">0,<span class="hljs-number">-1);
        Iterator&lt;ZSetOperations.TypedTuple&lt;Object&gt;&gt; iterator = tuples.iterator();
        <span class="hljs-keyword">while (iterator.hasNext())
        {
            ZSetOperations.TypedTuple&lt;Object&gt; typedTuple = iterator.next();
            System.out.println(<span class="hljs-string">"value:" + typedTuple.getValue() + <span class="hljs-string">"score:" + typedTuple.getScore());
        }
结果：value:zset<span class="hljs-number">-1score:<span class="hljs-number">2.0
value:zset<span class="hljs-number">-2score:<span class="hljs-number">4.0
value:zset<span class="hljs-number">-3score:<span class="hljs-number">6.0
value:zset<span class="hljs-number">-5score:<span class="hljs-number">7.0
value:zset<span class="hljs-number">-4score:<span class="hljs-number">12.0
</span></span></span></span></span></span></span></span></span></span></span></span></span></span></span></span></span></span></span></span></span></span></span></span></span></span></span></span></span></span></span></span></span></span></span></span></span></span></span></span></span></span></span></span></span></span></span></span></span></span></span></span></span></span></span></span></span></code></pre>
<ul>
<li>Long unionAndStore(K key, Collection&lt;K&gt; otherKeys, K destKey);<br />
计算给定的多个有序集的并集，并存储在新的 destKey中</li>


</ul>
<pre class="hljs bash"><code class="bash">使用：//System.out.println(template.opsForZSet().add(<span class="hljs-string">"zzset1",<span class="hljs-string">"zset-1",1.0));
        //System.out.println(template.opsForZSet().add(<span class="hljs-string">"zzset1",<span class="hljs-string">"zset-2",2.0));
        //System.out.println(template.opsForZSet().add(<span class="hljs-string">"zzset1",<span class="hljs-string">"zset-3",3.0));
        //System.out.println(template.opsForZSet().add(<span class="hljs-string">"zzset1",<span class="hljs-string">"zset-4",6.0));
        //
        //System.out.println(template.opsForZSet().add(<span class="hljs-string">"zzset2",<span class="hljs-string">"zset-1",1.0));
        //System.out.println(template.opsForZSet().add(<span class="hljs-string">"zzset2",<span class="hljs-string">"zset-2",2.0));
        //System.out.println(template.opsForZSet().add(<span class="hljs-string">"zzset2",<span class="hljs-string">"zset-3",3.0));
        //System.out.println(template.opsForZSet().add(<span class="hljs-string">"zzset2",<span class="hljs-string">"zset-4",6.0));
        //System.out.println(template.opsForZSet().add(<span class="hljs-string">"zzset2",<span class="hljs-string">"zset-5",7.0));

        System.out.println(template.opsForZSet().add(<span class="hljs-string">"zzset3",<span class="hljs-string">"zset-1",1.0));
        System.out.println(template.opsForZSet().add(<span class="hljs-string">"zzset3",<span class="hljs-string">"zset-2",2.0));
        System.out.println(template.opsForZSet().add(<span class="hljs-string">"zzset3",<span class="hljs-string">"zset-3",3.0));
        System.out.println(template.opsForZSet().add(<span class="hljs-string">"zzset3",<span class="hljs-string">"zset-4",6.0));
        System.out.println(template.opsForZSet().add(<span class="hljs-string">"zzset3",<span class="hljs-string">"zset-5",7.0));

        List&lt;String&gt; stringList = new ArrayList&lt;String&gt;();
        stringList.add(<span class="hljs-string">"zzset2");
        stringList.add(<span class="hljs-string">"zzset3");
        System.out.println(template.opsForZSet().unionAndStore(<span class="hljs-string">"zzset1",stringList,<span class="hljs-string">"destZset22"));

        Set&lt;ZSetOperations.TypedTuple&lt;Object&gt;&gt; tuples = template.opsForZSet().rangeWithScores(<span class="hljs-string">"destZset22",0,-1);
        Iterator&lt;ZSetOperations.TypedTuple&lt;Object&gt;&gt; iterator = tuples.iterator();
        <span class="hljs-keyword">while (iterator.hasNext())
        {
            ZSetOperations.TypedTuple&lt;Object&gt; typedTuple = iterator.next();
            System.out.println(<span class="hljs-string">"value:" + typedTuple.getValue() + <span class="hljs-string">"score:" + typedTuple.getScore());
        }
结果：value:zset-1score:3.0
value:zset-2score:6.0
value:zset-3score:9.0
value:zset-5score:14.0
value:zset-4score:18.0
</span></span></span></span></span></span></span></span></span></span></span></span></span></span></span></span></span></span></span></span></span></span></span></span></span></span></span></span></span></span></span></span></span></span></span></span></code></pre>
<ul>
<li>Long intersectAndStore(K key, K otherKey, K destKey);<br />
计算给定的一个或多个有序集的交集并将结果集存储在新的有序集合 key 中</li>


</ul>
<pre class="hljs javascript"><code class="javascript">使用：System.out.println(template.opsForZSet().intersectAndStore(<span class="hljs-string">"zzset1",<span class="hljs-string">"zzset2",<span class="hljs-string">"destZset33"));

        <span class="hljs-built_in">Set&lt;ZSetOperations.TypedTuple&lt;<span class="hljs-built_in">Object&gt;&gt; tuples = template.opsForZSet().rangeWithScores(<span class="hljs-string">"destZset33",<span class="hljs-number">0,<span class="hljs-number">-1);
        Iterator&lt;ZSetOperations.TypedTuple&lt;<span class="hljs-built_in">Object&gt;&gt; iterator = tuples.iterator();
        <span class="hljs-keyword">while (iterator.hasNext())
        {
            ZSetOperations.TypedTuple&lt;<span class="hljs-built_in">Object&gt; typedTuple = iterator.next();
            System.out.println(<span class="hljs-string">"value:" + typedTuple.getValue() + <span class="hljs-string">"score:" + typedTuple.getScore());
        }
结果：value:zset<span class="hljs-number">-1score:<span class="hljs-number">2.0
value:zset<span class="hljs-number">-2score:<span class="hljs-number">4.0
value:zset<span class="hljs-number">-3score:<span class="hljs-number">6.0
value:zset<span class="hljs-number">-4score:<span class="hljs-number">12.0
</span></span></span></span></span></span></span></span></span></span></span></span></span></span></span></span></span></span></span></span></span></code></pre>
<ul>
<li>Long intersectAndStore(K key, Collection&lt;K&gt; otherKeys, K destKey);<br />
计算给定的一个或多个有序集的交集并将结果集存储在新的有序集合 key 中</li>


</ul>
<pre class="hljs javascript"><code class="javascript">使用：List&lt;<span class="hljs-built_in">String&gt; stringList = <span class="hljs-keyword">new ArrayList&lt;<span class="hljs-built_in">String&gt;();
        stringList.add(<span class="hljs-string">"zzset2");
        stringList.add(<span class="hljs-string">"zzset3");
        System.out.println(template.opsForZSet().intersectAndStore(<span class="hljs-string">"zzset1",stringList,<span class="hljs-string">"destZset44"));

        <span class="hljs-built_in">Set&lt;ZSetOperations.TypedTuple&lt;<span class="hljs-built_in">Object&gt;&gt; tuples = template.opsForZSet().rangeWithScores(<span class="hljs-string">"destZset44",<span class="hljs-number">0,<span class="hljs-number">-1);
        Iterator&lt;ZSetOperations.TypedTuple&lt;<span class="hljs-built_in">Object&gt;&gt; iterator = tuples.iterator();
        <span class="hljs-keyword">while (iterator.hasNext())
        {
            ZSetOperations.TypedTuple&lt;<span class="hljs-built_in">Object&gt; typedTuple = iterator.next();
            System.out.println(<span class="hljs-string">"value:" + typedTuple.getValue() + <span class="hljs-string">"score:" + typedTuple.getScore());
        }
结果：value:zset<span class="hljs-number">-1score:<span class="hljs-number">3.0
value:zset<span class="hljs-number">-2score:<span class="hljs-number">6.0
value:zset<span class="hljs-number">-3score:<span class="hljs-number">9.0
value:zset<span class="hljs-number">-4score:<span class="hljs-number">18.0
</span></span></span></span></span></span></span></span></span></span></span></span></span></span></span></span></span></span></span></span></span></span></span></span></span></code></pre>
<ul>
<li>Cursor&lt;TypedTuple&lt;V&gt;&gt; scan(K key, ScanOptions options);<br />
遍历zset</li>


</ul>
<pre class="hljs javascript"><code class="javascript">使用： Cursor&lt;ZSetOperations.TypedTuple&lt;<span class="hljs-built_in">Object&gt;&gt; cursor = template.opsForZSet().scan(<span class="hljs-string">"zzset1", ScanOptions.NONE);
        <span class="hljs-keyword">while (cursor.hasNext()){
            ZSetOperations.TypedTuple&lt;<span class="hljs-built_in">Object&gt; item = cursor.next();
            System.out.println(item.getValue() + <span class="hljs-string">":" + item.getScore());
        }
结果：zset<span class="hljs-number">-1:<span class="hljs-number">1.0
zset<span class="hljs-number">-2:<span class="hljs-number">2.0
zset<span class="hljs-number">-3:<span class="hljs-number">3.0
zset<span class="hljs-number">-4:<span class="hljs-number">6.0
</span></span></span></span></span></span></span></span></span></span></span></span></span></code></pre>
<p>注：TimeUnit是java.util.concurrent包下面的一个类，表示给定单元粒度的时间段<br />
常用的颗粒度<br />
TimeUnit.DAYS          //天<br />
TimeUnit.HOURS         //小时<br />
TimeUnit.MINUTES       //分钟<br />
TimeUnit.SECONDS       //秒<br />
TimeUnit.MILLISECONDS  //毫秒</p>
<p>参考文档：Redis实战[约西亚 L.卡尔森 (Josiah L.Carlson)]<br />
Spring官方文档</p>

</div>

<br /><br />作者：DreamerRzc<br />链接：https://www.jianshu.com/p/7bf5dc61ca06/<br />来源：简书<br />简书著作权归作者所有，任何形式的转载都请联系作者获得授权并注明出处。</div>