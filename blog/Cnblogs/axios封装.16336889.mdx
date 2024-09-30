<div class="cnblogs_code">
<pre>import axios from "axios"<span style="color: #000000;">;
import { Modal, message } from </span>"antd"<span style="color: #000000;">;
import i18next from </span>"i18next"<span style="color: #000000;">;
const { CancelToken } </span>=<span style="color: #000000;"> axios;
const cancelTokenArr </span>=<span style="color: #000000;"> {};

const _axios </span>=<span style="color: #000000;"> axios.create({
  baseURL: </span>"/console/v1"<span style="color: #000000;">,
});

_axios.interceptors.request.use(
  (config) </span>=&gt;<span style="color: #000000;"> {
    const token </span>= sessionStorage.getItem("token"<span style="color: #000000;">);
    </span><span style="color: #0000ff;">if</span><span style="color: #000000;"> (token) {
      config.headers[</span>"token"] =<span style="color: #000000;"> token;
    }
    </span><span style="color: #0000ff;">if</span><span style="color: #000000;"> (config.cancel) {
      config.cancelToken </span>= <span style="color: #0000ff;">new</span> CancelToken((c) =&gt;<span style="color: #000000;"> {
        cancelTokenArr[config.cancel] </span>=<span style="color: #000000;"> c;
      });
    }
    </span><span style="color: #0000ff;">return</span><span style="color: #000000;"> config;
  },
  (error) </span>=&gt;<span style="color: #000000;"> {
    </span><span style="color: #0000ff;">return</span><span style="color: #000000;"> Promise.reject(error);
  }
);

_axios.interceptors.response.use(
  (response) </span>=&gt;<span style="color: #000000;"> {
    const res </span>=<span style="color: #000000;"> response.data;
    </span><span style="color: #0000ff;">if</span> (res <span style="color: #0000ff;">instanceof</span><span style="color: #000000;"> Blob) {
      </span><span style="color: #0000ff;">return</span><span style="color: #000000;"> response;
    } </span><span style="color: #0000ff;">else</span> <span style="color: #0000ff;">if</span> ( res.code == "000401"<span style="color: #000000;">) {
      sessionStorage.removeItem(</span>"token"<span style="color: #000000;">);
      message.destroy();
      Modal.destroyAll();
      Modal.warning({
        title: </span>"登录过期"<span style="color: #000000;">,
        content: </span>"登录状态失效，请重新登录"<span style="color: #000000;">,
        onOk() {
          location.href </span>= ""<span style="color: #000000;">;
        },
      });
    } </span><span style="color: #0000ff;">else</span> <span style="color: #0000ff;">if</span> (res.code !== "000000"<span style="color: #000000;">) {
      message.error(res</span>?<span style="color: #000000;">.message);
    } </span><span style="color: #0000ff;">else</span><span style="color: #000000;"> {
      </span><span style="color: #0000ff;">return</span><span style="color: #000000;"> res;
    }
  },
  (error) </span>=&gt;<span style="color: #000000;"> {
    const res </span>=<span style="color: #000000;"> error.response;
    </span><span style="color: #0000ff;">if</span> (res?.status &amp;&amp; (res?.status === 403 || res?.status === 401<span style="color: #000000;">)) {
       </span><span style="color: #0000ff;">return</span><span style="color: #000000;"> {
         status: </span>"000403"<span style="color: #000000;">,
         message: </span>"验签不通过！请重新登录"<span style="color: #000000;">,
       };
    } </span><span style="color: #0000ff;">else</span><span style="color: #000000;"> {
      message.error(res</span>?.data?<span style="color: #000000;">.error_msg );
      </span><span style="color: #0000ff;">return</span> Promise.reject(res?<span style="color: #000000;">.data);
    }
  }
);

_axios.cancelAjax </span>= (name, msg) =&gt;<span style="color: #000000;"> {
  </span><span style="color: #0000ff;">if</span><span style="color: #000000;"> (cancelTokenArr[name]) {
    cancelTokenArr[name](msg </span>|| "强制中断了请求"<span style="color: #000000;">);
    cancelTokenArr[name] </span>= <span style="color: #0000ff;">null</span><span style="color: #000000;">;
  }
};

export </span><span style="color: #0000ff;">default</span> _axios;</pre>
</div>
<p>&nbsp;</p>