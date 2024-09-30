<h2>文件目录</h2>
<p><img src="./images/1798975-20220602111757413-1126951580.png" alt="" width="391" height="742" loading="lazy" /></p>
<p>&nbsp;</p>
<p>&nbsp;</p>
<h2>index.js</h2>
<div class="cnblogs_code">
<pre>import i18n from "i18next"<span style="color: #000000;">;
import { initReactI18next } from </span>"react-i18next"<span style="color: #000000;">;

import LanguageDetector from </span>"i18next-browser-languagedetector"<span style="color: #000000;">;
import resources from </span>"./resources"<span style="color: #000000;">;
const langType </span>= sessionStorage.getItem("langType"<span style="color: #000000;">);
i18n
  .use(LanguageDetector) </span><span style="color: #008000;">//</span><span style="color: #008000;">嗅探当前浏览器语言 zh-CN</span>
<span style="color: #000000;">  .use(initReactI18next)
  .init({
    resources,
    interpolation: {
      escapeValue: </span><span style="color: #0000ff;">false</span><span style="color: #000000;">,
    },
    lng: langType,
    debug: </span><span style="color: #0000ff;">false</span><span style="color: #000000;">,
    </span><span style="color: #008000;">//</span><span style="color: #008000;"> fallbackLng: "zh", //默认当前环境的语言</span>
    fallbackLng: ["en", "fr", "zh", "dev"<span style="color: #000000;">],
    detection: {
      lookupSessionStorage: </span>"langType"<span style="color: #000000;">,
      caches: [</span>"sessionStorage"<span style="color: #000000;">],
      order: [</span>"sessionStorage"<span style="color: #000000;">],
      lookupQuerystring: </span>"lng"<span style="color: #000000;">,
    },
  });

export </span><span style="color: #0000ff;">default</span> i18n;</pre>
</div>
<h2>resources.js</h2>
<div class="cnblogs_code">
<pre><span style="color: #008000;">/*</span><span style="color: #008000;">*
 * 加载语言文件 配置
 *
 *  zh   中文
 *  en   英文
 </span><span style="color: #008000;">*/</span><span style="color: #000000;">
export </span><span style="color: #0000ff;">default</span><span style="color: #000000;"> {
  en: require(</span>"./language/en.js").<span style="color: #0000ff;">default</span><span style="color: #000000;">,
  fr: require(</span>"./language/fr.js").<span style="color: #0000ff;">default</span><span style="color: #000000;">,
  zh: require(</span>"./language/zh.js").<span style="color: #0000ff;">default</span><span style="color: #000000;">,
};</span></pre>
</div>
<h2>language(en.js,zh.js,fr.js)</h2>
<div class="cnblogs_code">
<pre><span style="color: #008000;">/*</span><span style="color: #008000;">*
 * 英文
 </span><span style="color: #008000;">*/</span><span style="color: #000000;">
const language </span>= "en"<span style="color: #000000;">;
export </span><span style="color: #0000ff;">default</span><span style="color: #000000;"> {
  translation: {
    </span><span style="color: #008000;">//</span><span style="color: #008000;"> 公共组件</span>
    components: require("../module/components.js").<span style="color: #0000ff;">default</span><span style="color: #000000;">[language],
    </span><span style="color: #008000;">//</span><span style="color: #008000;"> 菜单</span>
    menu: require("../module/menu.js").<span style="color: #0000ff;">default</span><span style="color: #000000;">[language]
  },
};</span></pre>
</div>
<h2>module(components.js,menu.js)</h2>
<div class="cnblogs_code">
<pre>export <span style="color: #0000ff;">default</span><span style="color: #000000;"> {
  en: {
    </span><span style="color: #0000ff;">with</span>: "common"<span style="color: #000000;">,
    strip_data: </span>"piece of data"<span style="color: #000000;">,
  },
  zh: {
    </span><span style="color: #0000ff;">with</span>: "共"<span style="color: #000000;">,
    strip_data: </span>"条数据"<span style="color: #000000;">,  },
  fr: {
    </span><span style="color: #0000ff;">with</span>: "commun"<span style="color: #000000;">,
    strip_data: </span>" donn&eacute;es"<span style="color: #000000;">,
  },
};</span></pre>
</div>
<h2>main.js</h2>
<div class="cnblogs_code">
<pre>import React, { Suspense, useCallback, useEffect, useState } from "react"<span style="color: #000000;">;
import { ConfigProvider } from </span>"antd"<span style="color: #000000;">;
import { render } from </span>"react-dom"<span style="color: #000000;">;
import { Provider } from </span>"react-redux"<span style="color: #000000;">;
import store from </span>"./redux"<span style="color: #000000;">;
import { BrowserRouter, Switch, Route, Redirect } from </span>"react-router-dom"<span style="color: #000000;">;
<span style="background-color: #ffff00;">import zh from </span></span><span style="background-color: #ffff00;">"antd/lib/locale/zh_CN"<span style="color: #000000;">;
import en from </span>"antd/lib/locale/en_US"<span style="color: #000000;">;
import fr from </span>"antd/lib/locale/fr_FR"</span><span style="color: #000000;"><span style="background-color: #ffff00;">;</span>
import PageLoad from </span>"components/page_load"<span style="color: #000000;">;
import moment from </span>"moment"<span style="color: #000000;">;
<span style="background-color: #ffff00;">import </span></span><span style="background-color: #ffff00;">"moment/locale/zh-cn"<span style="color: #000000;">;
</span><span style="color: #008000;">import "moment/locale/en-nz";</span>
import "moment/locale/fr"</span><span style="color: #000000;"><span style="background-color: #ffff00;">;</span>
import </span>"assets/style/style.less"<span style="color: #000000;">;
import Layout from </span>"pages/layout/index"<span style="color: #000000;">;
<span style="background-color: #ffff00;">import </span></span><span style="background-color: #ffff00;">"./i18n/index"</span><span style="color: #000000;"><span style="background-color: #ffff00;">;</span>
<span style="background-color: #ffff00;">import i18n from </span></span><span style="background-color: #ffff00;">"@/i18n/index"</span><span style="color: #000000;"><span style="background-color: #ffff00;">;</span>
import axios from </span>"@/plugins/axios"<span style="color: #000000;">;
moment.locale(</span>"zh-cn"<span style="color: #000000;">);
const originalSetItem </span>=<span style="color: #000000;"> sessionStorage.setItem;
sessionStorage.setItem </span>= <span style="color: #0000ff;">function</span><span style="color: #000000;"> (key, newValue) {
  const setItemEvent </span>= <span style="color: #0000ff;">new</span> Event("setItemEvent"<span style="color: #000000;">);
  setItemEvent[key] </span>=<span style="color: #000000;"> newValue;
  window.dispatchEvent(setItemEvent);
  originalSetItem.apply(</span><span style="color: #0000ff;">this</span><span style="color: #000000;">, [key, newValue]);
};
const App </span>= () =&gt;<span style="color: #000000;"> {
  const [locale, setLocale] </span>= useState(sessionStorage.getItem("langType"<span style="color: #000000;">));
  const [loading, setLoading] </span>= useState(<span style="color: #0000ff;">true</span>); <span style="color: #008000;">//</span><span style="color: #008000;">当token接口数据获取到后再进行路由渲染</span>
  const REDIRECT_URL = "https://"<span style="color: #000000;">;</span>
  const getPageQueries = (path) =&gt;<span style="color: #000000;"> {
    const query </span>=<span style="color: #000000;"> {};
    path </span>= path ||<span style="color: #000000;"> window.location.href;
    const urlObj </span>= <span style="color: #0000ff;">new</span><span style="color: #000000;"> URL(path);
    const { search } </span>=<span style="color: #000000;"> urlObj;

    </span><span style="color: #0000ff;">if</span><span style="color: #000000;"> (search) {
      const arr </span>= search.replace(/\\#\/.*\?/, "").split("&amp;"<span style="color: #000000;">);
      arr.forEach((item) </span>=&gt;<span style="color: #000000;"> {
        const [key, value] </span>= item.replace("?", "").split("="<span style="color: #000000;">);
        query[key] </span>=<span style="color: #000000;"> value;
      });
    }
    </span><span style="color: #0000ff;">return</span><span style="color: #000000;"> query;
  };
  </span><span style="color: #008000;">/*</span><span style="color: #008000;"> ======== 获取token ======== </span><span style="color: #008000;">*/</span><span style="color: #000000;">
  const getToken </span>= useCallback(async (authCode) =&gt;<span style="color: #000000;"> {
    setLoading(</span><span style="color: #0000ff;">true</span><span style="color: #000000;">);
    let res </span>=<span style="color: #000000;"> await axios.post(
      </span>"/getToken"<span style="color: #000000;">,
      { authCode },
      {
        baseURL: </span>"/not-login/console/v1"<span style="color: #000000;">,
      }
    );
    </span><span style="color: #0000ff;">if</span> (!res) <span style="color: #0000ff;">return</span> <span style="color: #0000ff;">false</span><span style="color: #000000;">;
    sessionStorage.setItem(</span>"token", res.data?.token || ""<span style="color: #000000;">);
    setLoading(</span><span style="color: #0000ff;">false</span><span style="color: #000000;">);
    userInformation();
  }, []);
  </span><span style="color: #008000;">/*</span><span style="color: #008000;">========= 获取用户信息 =========</span><span style="color: #008000;">*/</span><span style="color: #000000;">
  const userInformation </span>= async () =&gt;<span style="color: #000000;"> {
    let res </span>= await axios.post("/get"<span style="color: #000000;">, {});
    </span><span style="color: #0000ff;">if</span> (!res) <span style="color: #0000ff;">return</span> <span style="color: #0000ff;">false</span><span style="color: #000000;">;
    sessionStorage.setItem(</span>"userInfo"<span style="color: #000000;">, JSON.stringify(res.data));
  };
  </span><span style="color: #008000;">/*</span><span style="color: #008000;"> ======== 设置localStorge监听语言是否变化 ======== </span><span style="color: #008000;">*/</span><span style="color: #000000;">
  useEffect(() </span>=&gt;<span style="color: #000000;"> {
    const getLangType </span>= (e) =&gt;<span style="color: #000000;"> {
      e</span>?.langType &amp;&amp;<span style="color: #000000;"> setLocale(e.langType);
    };
    window.addEventListener(</span>"setItemEvent"<span style="color: #000000;">, getLangType);
    </span><span style="color: #0000ff;">return</span> () =&gt;<span style="color: #000000;"> {
      window.removeEventListener(</span>"setItemEvent"<span style="color: #000000;">, getLangType);
    };
  }, []);
  </span><span style="color: #008000;">/*</span><span style="color: #008000;"> ======== 获取路由里面的authCode和lan ======== </span><span style="color: #008000;">*/</span><span style="color: #000000;">
  useEffect(() </span>=&gt;<span style="color: #000000;"> {
    let token </span>= sessionStorage.getItem("token"<span style="color: #000000;">);
    let obj </span>=<span style="color: #000000;"> getPageQueries(window.location);
    i18n.changeLanguage(obj.lan);
    </span><span style="color: #0000ff;">if</span> (obj?<span style="color: #000000;">.authCode) {
      </span><span style="color: #008000;">//</span><span style="color: #008000;"> sessionStorage.setItem("authCode", obj.authCode);</span>
      getToken(obj?<span style="color: #000000;">.authCode);
    } </span><span style="color: #0000ff;">else</span> <span style="color: #0000ff;">if</span><span style="color: #000000;"> (token) {
      setLoading(</span><span style="color: #0000ff;">false</span><span style="color: #000000;">);
    }
  }, [getToken]);
  </span><span style="color: #0000ff;">return</span><span style="color: #000000;"> (
    </span>&lt;ConfigProvider <span style="background-color: #ffff00;">locale={locale === "zh" ? zh : locale === "fr" ? fr : en}</span>&gt;
      &lt;Provider store={store}&gt;
        &lt;Suspense fallback={&lt;PageLoad /&gt;}&gt;
          {!loading ?<span style="color: #000000;"> (
            </span>&lt;BrowserRouter basename="/"&gt;
              &lt;Switch&gt;<span style="color: #000000;">
                {</span><span style="color: #008000;">/*</span><span style="color: #008000;"> &lt;Layout /&gt; </span><span style="color: #008000;">*/</span><span style="color: #000000;">}
                </span>&lt;<span style="color: #000000;">Route
                  path</span>="/"<span style="color: #000000;">
                  render</span>={({ location }) =&gt;<span style="color: #000000;"> {
                    let token </span>= sessionStorage.getItem("token"<span style="color: #000000;">);
                    </span><span style="color: #0000ff;">return</span> token ?<span style="color: #000000;"> (
                      </span>&lt;Layout /&gt;
<span style="color: #000000;">                    ) : (
                      </span>&lt;<span style="color: #000000;">Route
                        component</span>={() =&gt;<span style="color: #000000;"> {
                          window.location.href </span>=<span style="color: #000000;"> `${REDIRECT_URL}`;
                          </span><span style="color: #0000ff;">return</span> <span style="color: #0000ff;">null</span><span style="color: #000000;">;
                        }}
                      </span>/&gt;
<span style="color: #000000;">                    );
                  }}
                </span>/&gt;
              &lt;/Switch&gt;
            &lt;/BrowserRouter&gt;
<span style="color: #000000;">          ) : (
            </span>&lt;PageLoad /&gt;
<span style="color: #000000;">          )}
        </span>&lt;/Suspense&gt;
      &lt;/Provider&gt;
    &lt;/ConfigProvider&gt;
<span style="color: #000000;">  );
};

render(</span>&lt;App /&gt;, document.getElementById("app"));</pre>
</div>
<h2>调用示例</h2>
<div class="cnblogs_code">
<pre>import { useTranslation } from "react-i18next"<span style="color: #000000;">;
export </span><span style="color: #0000ff;">default</span> () =&gt;<span style="color: #000000;"> {
  const { t } </span>=<span style="color: #000000;"> useTranslation();
  </span><span style="color: #0000ff;">return</span><span style="color: #000000;">{
        </span>&lt;p&gt;{t("components.with")}&lt;/p&gt;
<span style="color: #000000;">  }
}


import i18next from </span>"i18next"<span style="color: #000000;">;
export const getMaketTypeName </span>= (val) =&gt;<span style="color: #000000;"> {
  </span><span style="color: #0000ff;">switch</span><span style="color: #000000;"> (val) {
    </span><span style="color: #0000ff;">case</span> "12"<span style="color: #000000;">:
      </span><span style="color: #0000ff;">return</span> i18next.t("components.with"<span style="color: #000000;">);
    </span><span style="color: #0000ff;">default</span><span style="color: #000000;">:
      </span><span style="color: #0000ff;">return</span> ""<span style="color: #000000;">;
  }
};</span></pre>
</div>
<h2>修改语言</h2>
<div class="cnblogs_code">
<pre>import React, { useContext, useMemo, useState, useEffect } from "react"<span style="color: #000000;">;

import { useTranslation } from </span>"react-i18next"<span style="color: #000000;">;
import i18n from </span>"@/i18n/index"<span style="color: #000000;">;
export </span><span style="color: #0000ff;">default</span> () =&gt;<span style="color: #000000;"> {
  const { t } </span>=<span style="color: #000000;"> useTranslation();
  const [language, setLanguage] </span>= useState("zh"<span style="color: #000000;">);

  const changeLanguage </span>= (value) =&gt;<span style="color: #000000;"> {
    setLanguage(value);
    i18n.changeLanguage(value);
  };
  useEffect(() </span>=&gt;<span style="color: #000000;"> {
    let type </span>= sessionStorage.getItem("langType"<span style="color: #000000;">);
    </span><span style="color: #0000ff;">if</span><span style="color: #000000;"> (type) {
      setLanguage(type);
    } </span><span style="color: #0000ff;">else</span><span style="color: #000000;"> {
      </span><span style="color: #008000;">//</span><span style="color: #008000;">如果被清空了 那么当前语言会被设置为默认语言 zh</span>
<span style="color: #000000;">    }
  }, []);
  </span><span style="color: #0000ff;">return</span><span style="color: #000000;"> (
              </span>&lt;Select value={language} onChange={(value) =&gt; changeLanguage(value)} style={{ width: 100 }}&gt;
                &lt;Select.Option value="zh"&gt;中文&lt;/Select.Option&gt;
                &lt;Select.Option value="en"&gt;English&lt;/Select.Option&gt;
                &lt;Select.Option value="fr"&gt;Fran&ccedil;ais&lt;/Select.Option&gt;
              &lt;/Select&gt;
<span style="color: #000000;">  );
};</span></pre>
</div>
<p>&nbsp;</p>