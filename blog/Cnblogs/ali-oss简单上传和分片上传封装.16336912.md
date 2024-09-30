<div class="cnblogs_code">
<pre><span style="color: #008000;">//</span><span style="color: #008000;"> 引入ali-oss(没有用到)</span>
import axios from "@/plugins/axios"<span style="color: #000000;">;
import moment from </span>"moment"<span style="color: #000000;">;

let OSS </span>= require("ali-oss"<span style="color: #000000;">);
</span><span style="color: #008000;">/*</span><span style="color: #008000;">*
 *  [accessKeyId] {String}：通过阿里云控制台创建的AccessKey。
 *  [accessKeySecret] {String}：通过阿里云控制台创建的AccessSecret。
 *  [bucket] {String}：通过控制台或PutBucket创建的bucket。
 *  [region] {String}：bucket所在的区域，。
 </span><span style="color: #008000;">*/</span><span style="color: #000000;">
let client;
</span><span style="color: #008000;">/*</span><span style="color: #008000;">*
 * 生成文件名称后缀
 </span><span style="color: #008000;">*/</span><span style="color: #000000;">
const getClientData </span>= async () =&gt;<span style="color: #000000;"> {
  let { data } </span>= await axios.get("/common/ossali/getsts"<span style="color: #000000;">);
  client </span>= <span style="color: #0000ff;">new</span><span style="color: #000000;"> OSS({
    secure: </span><span style="color: #0000ff;">false</span>, <span style="color: #008000;">//</span><span style="color: #008000;"> secure: 配合region使用，如果指定了secure为true，则使用HTTPS访问</span>
<span style="color: #000000;">    accessKeyId: data.accesskey,
    accessKeySecret: data.accessSecret,
    bucket: data.bucketName,
    stsToken: data</span>?<span style="color: #000000;">.stsToken,
    region: </span>"oss-cn-shanghai"<span style="color: #000000;">,
    </span><span style="color: #008000;">//</span><span style="color: #008000;"> 刷新临时访问凭证。</span>
    refreshSTSToken: async () =&gt;<span style="color: #000000;"> {
      const refreshToken </span>= await axios.get("/common/ossali/getsts"<span style="color: #000000;">);
      </span><span style="color: #0000ff;">return</span><span style="color: #000000;"> {
        secure: </span><span style="color: #0000ff;">false</span>, <span style="color: #008000;">//</span><span style="color: #008000;"> secure: 配合region使用，如果指定了secure为true，则使用HTTPS访问</span>
<span style="color: #000000;">        accessKeyId: refreshToken.accesskey,
        accessKeySecret: refreshToken.accessSecret,
        bucket: refreshToken.bucketName,
        stsToken: refreshToken</span>?<span style="color: #000000;">.stsToken,
        region: </span>"oss-cn-shanghai"<span style="color: #000000;">,
      };
    },
  });
};
</span><span style="color: #008000;">/*</span><span style="color: #008000;">*
 *  上传文件，大小不能超过5GB
 * @param {string} file 本地文件
 * @retruns Promise
 </span><span style="color: #008000;">*/</span><span style="color: #000000;">
export const put </span>= async (file) =&gt;<span style="color: #000000;"> {
  await getClientData();
  let timeData </span>= moment().format("YYYY-MM-DD"<span style="color: #000000;">);
  let result </span>= await client.put(`/${timeData}/${moment().format("x"<span style="color: #000000;">)}_${file.name}`, file);
  </span><span style="color: #008000;">//</span><span style="color: #008000;"> ObjName为文件名字,可以只写名字，就直接储存在 bucket 的根路径，如需放在文件夹下面直接在文件名前面加上文件夹名称</span>
  <span style="color: #0000ff;">return</span><span style="color: #000000;"> result;
};

</span><span style="color: #008000;">/*</span><span style="color: #008000;"> ======== 分片上传(文件大于100M使用) ======== </span><span style="color: #008000;">*/</span><span style="color: #000000;">
export const multipartUpload </span>= async (file, option) =&gt;<span style="color: #000000;"> {
  await getClientData();
  let timeData </span>= moment().format("YYYY-MM-DD"<span style="color: #000000;">);
  let fileName </span>= `${moment().format("x"<span style="color: #000000;">)}_${file.name}`;
  </span><span style="color: #0000ff;">try</span><span style="color: #000000;"> {
    </span><span style="color: #008000;">//</span><span style="color: #008000;"> 依次填写Object完整路径（例如exampledir/exampleobject.txt）和本地文件的完整路径（例如D:\\localpath\\examplefile.txt）。Object完整路径中不能包含Bucket名称。</span>
    <span style="color: #008000;">//</span><span style="color: #008000;"> 如果本地文件的完整路径中未指定本地路径（例如examplefile.txt），则默认从示例程序所属项目对应本地路径中上传文件。</span>
    const result = await client.multipartUpload(`/${timeData}/<span style="color: #000000;">${fileName}`, file, {
      progress: async (p, _checkpoint) </span>=&gt;<span style="color: #000000;"> {
        const e </span>=<span style="color: #000000;"> {};
        e.percent </span>= parseInt(p * 100<span style="color: #000000;">);
        option.onProgress(e);
      },
      partSize: </span>102400 * 5<span style="color: #000000;">,
    });
    </span><span style="color: #008000;">//</span><span style="color: #008000;"> 填写Object完整路径，例如exampledir/exampleobject.txt。Object完整路径中不能包含Bucket名称。</span>
    const head = await client.head(`transsion_saas/console/${timeData}/${fileName}`);
    <span style="color: #0000ff;">if</span> (head.res.status === 200<span style="color: #000000;">) {
      </span><span style="color: #0000ff;">return</span><span style="color: #000000;"> head.res.requestUrls;
    }
  } </span><span style="color: #0000ff;">catch</span><span style="color: #000000;"> (e) {
    </span><span style="color: #008000;">//</span><span style="color: #008000;"> 捕获超时异常。</span>
    <span style="color: #0000ff;">if</span> (e.code === "ConnectionTimeoutError"<span style="color: #000000;">) {
      </span><span style="color: #008000;">//</span><span style="color: #008000;"> do ConnectionTimeoutError operation</span>
<span style="color: #000000;">    }
  }
};</span></pre>
</div>
<h2><strong>调用示例</strong></h2>
<div class="cnblogs_code">
<pre>import { put, multipartUpload } from "@/plugins/ali-oss"<span style="color: #000000;">;

  </span><span style="color: #008000;">/*</span><span style="color: #008000;"> ======== 自定义上传 ======== </span><span style="color: #008000;">*/</span><span style="color: #000000;">
  const customRequest </span>= async (info) =&gt;<span style="color: #000000;"> {
    </span><span style="color: #0000ff;">if</span> (info.file.size / 1024 / 1024 &lt;= 100<span style="color: #000000;">) {
      setLoadNum(</span>1<span style="color: #000000;">);
      let res </span>=<span style="color: #000000;"> await put(info.file);
      setLoadNum(</span>100<span style="color: #000000;">);
      onChange</span>?.(res?<span style="color: #000000;">.url);
    } </span><span style="color: #0000ff;">else</span><span style="color: #000000;"> {
      let res </span>=<span style="color: #000000;"> await multipartUpload(info.file, {
        onProgress: (e) </span>=&gt;<span style="color: #000000;"> {
          setLoadNum(e.percent);
        },
      });
      onChange</span>?.(res[0<span style="color: #000000;">]);
    }
  };</span></pre>
</div>
<p>&nbsp;</p>