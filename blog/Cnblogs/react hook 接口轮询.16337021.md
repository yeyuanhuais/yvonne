<div class="cnblogs_code">
<pre><span style="color: #008000;">//</span><span style="color: #008000;"> 轮询接口</span>
<span style="color: #000000;">
import { useCallback, useRef, useEffect } from </span>"react"<span style="color: #000000;">;
const sleep </span>= (time) =&gt;<span style="color: #000000;"> {
  </span><span style="color: #0000ff;">return</span> <span style="color: #0000ff;">new</span> Promise((resolve) =&gt;<span style="color: #000000;"> setTimeout(resolve, time));
};
const useUnMount </span>= (fn) =&gt;<span style="color: #000000;"> {
  useEffect(
    () </span>=&gt; () =&gt;<span style="color: #000000;"> {
      fn();
    },
    [fn]
  );
};

const usePolling </span>= (polling) =&gt;<span style="color: #000000;"> {
  const isPollingRef </span>= useRef(<span style="color: #0000ff;">false</span><span style="color: #000000;">);
  const cancelRef </span>= useRef(<span style="color: #0000ff;">false</span><span style="color: #000000;">);

  const doPolling </span>= useCallback(() =&gt;<span style="color: #000000;"> {
    </span><span style="color: #008000;">//</span><span style="color: #008000;"> 是否正在轮询，是，返回，不能多个接口同时轮询，避免这些接口有先后顺序相互影响</span>
    <span style="color: #0000ff;">if</span><span style="color: #000000;"> (isPollingRef.current) {
      </span><span style="color: #0000ff;">return</span><span style="color: #000000;">;
    }
    isPollingRef.current </span>= <span style="color: #0000ff;">true</span><span style="color: #000000;">;

    const pollNext </span>= async () =&gt;<span style="color: #000000;"> {
      </span><span style="color: #008000;">//</span><span style="color: #008000;"> 如果掉了取消轮询，那么就返回不执行</span>
      <span style="color: #0000ff;">if</span><span style="color: #000000;"> (cancelRef.current) {
        isPollingRef.current </span>= <span style="color: #0000ff;">false</span><span style="color: #000000;">;
        cancelRef.current </span>= <span style="color: #0000ff;">false</span><span style="color: #000000;">;
        </span><span style="color: #0000ff;">return</span><span style="color: #000000;">;
      }
      </span><span style="color: #008000;">//</span><span style="color: #008000;"> 发送请求，返回值组装一下，给个 hasFinshed 判断是否还要继续轮询</span>
      const { hasFinshed } =<span style="color: #000000;"> await polling();

      </span><span style="color: #0000ff;">if</span> (!<span style="color: #000000;">hasFinshed) {
        await sleep(</span>3000<span style="color: #000000;">);
        pollNext();
      } </span><span style="color: #0000ff;">else</span><span style="color: #000000;"> {
        isPollingRef.current </span>= <span style="color: #0000ff;">false</span><span style="color: #000000;">;
      }
    };

    pollNext();
  }, [polling]);

  const cancelPolling </span>= useCallback(() =&gt;<span style="color: #000000;"> {
    </span><span style="color: #0000ff;">if</span><span style="color: #000000;"> (isPollingRef.current) {
      cancelRef.current </span>= <span style="color: #0000ff;">true</span><span style="color: #000000;">;
    }
  }, []);

  useUnMount(cancelPolling);

  </span><span style="color: #0000ff;">return</span><span style="color: #000000;"> [doPolling, cancelPolling];
};

export </span><span style="color: #0000ff;">default</span> usePolling;</pre>
</div>
<h2>调用示例</h2>
<div class="cnblogs_code">
<pre>import usePolling from "@/plugins/usePolling"<span style="color: #000000;">; 

 </span><span style="color: #008000;">/*</span><span style="color: #008000;"> ========== 导入轮询 ========== </span><span style="color: #008000;">*/</span><span style="color: #000000;">
  const submitPublicBagPolling </span>= useCallback(async () =&gt;<span style="color: #000000;"> {
    let resPolling </span>=<span style="color: #000000;"> await axios
      .post(</span>"/progress"<span style="color: #000000;">, {
        id: id,
      })
      .</span><span style="color: #0000ff;">catch</span>(() =&gt;<span style="color: #000000;"> {
        setLoading(</span><span style="color: #0000ff;">false</span><span style="color: #000000;">);
      });
    </span><span style="color: #0000ff;">if</span> (!<span style="color: #000000;">resPolling) {
      setLoading(</span><span style="color: #0000ff;">false</span><span style="color: #000000;">);
      </span><span style="color: #0000ff;">return</span> { hasFinshed: <span style="color: #0000ff;">true</span><span style="color: #000000;"> };
    }
    </span><span style="color: #0000ff;">if</span> (resPolling.data?<span style="color: #000000;">.finish) {
      message.success(``);
      setLoading(</span><span style="color: #0000ff;">false</span><span style="color: #000000;">);
    }
    </span><span style="color: #0000ff;">return</span> { hasFinshed: resPolling.data?<span style="color: #000000;">.finish };
    </span><span style="color: #008000;">//</span><span style="color: #008000;"> eslint-disable-next-line react-hooks/exhaustive-deps</span>
<span style="color: #000000;">  }, [id]);
  const [doPollingType, cancelPollingType] </span>= usePolling(submitPublicBagPolling); <span style="color: #008000;">//</span><span style="color: #008000;">接口轮询hook</span>
  <span style="color: #008000;">/*</span><span style="color: #008000;"> ========== 导入 ========== </span><span style="color: #008000;">*/</span><span style="color: #000000;">
  const submitPublicBag </span>= async (values) =&gt;<span style="color: #000000;"> {
    </span><span style="color: #0000ff;">if</span> (Object.keys(values).length == 0<span style="color: #000000;">) {
      setPublicBagVis(</span><span style="color: #0000ff;">false</span><span style="color: #000000;">);
      </span><span style="color: #0000ff;">return</span><span style="color: #000000;">;
    }
    setLoading(</span><span style="color: #0000ff;">true</span><span style="color: #000000;">);
    let res </span>= await axios.post("/batchsms/contact/crowdpack/submit"<span style="color: #000000;">, {
      ...values,
        id: id,
    });
    </span><span style="color: #0000ff;">if</span> (!<span style="color: #000000;">res) {
      setLoading(</span><span style="color: #0000ff;">false</span><span style="color: #000000;">);
      </span><span style="color: #0000ff;">return</span> <span style="color: #0000ff;">false</span><span style="color: #000000;">;
    }
    </span><span style="color: #0000ff;">if</span> (res.data?<span style="color: #000000;">.finish) {
      message.success(``);
      setLoading(</span><span style="color: #0000ff;">false</span><span style="color: #000000;">);
    } </span><span style="color: #0000ff;">else</span><span style="color: #000000;"> {
      doPollingType();
    }
  };</span></pre>
</div>
<p>&nbsp;</p>
<p>参考：https://juejin.cn/post/7085174569484582925</p>