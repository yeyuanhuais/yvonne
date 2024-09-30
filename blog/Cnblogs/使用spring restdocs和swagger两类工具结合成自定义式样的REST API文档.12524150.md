<h1>1 pom文件配置</h1>
<h2>1.1 加入依赖包</h2>
<p>swagger</p>
<div class="cnblogs_code">
<pre>       &lt;dependency&gt;
            &lt;groupId&gt;io.springfox&lt;/groupId&gt;
            &lt;artifactId&gt;springfox-swagger2&lt;/artifactId&gt;
            &lt;version&gt;2.5.0&lt;/version&gt;
        &lt;/dependency&gt;

        &lt;dependency&gt;
            &lt;groupId&gt;io.springfox&lt;/groupId&gt;
            &lt;artifactId&gt;springfox-swagger-ui&lt;/artifactId&gt;
            &lt;version&gt;2.5.0&lt;/version&gt;
        &lt;/dependency&gt;

        &lt;dependency&gt;
            &lt;groupId&gt;io.springfox&lt;/groupId&gt;
            &lt;artifactId&gt;springfox-staticdocs&lt;/artifactId&gt;
            &lt;version&gt;2.6.1&lt;/version&gt;
        &lt;/dependency&gt;</pre>
</div>
<p>restdocs的依赖包</p>
<div class="cnblogs_code">
<pre>           &lt;dependency&gt;
                &lt;groupId&gt;org.springframework.restdocs&lt;/groupId&gt;
                &lt;artifactId&gt;spring-restdocs-mockmvc&lt;/artifactId&gt;
                &lt;version&gt;${spring-restdocs.version}&lt;/version&gt;
                &lt;scope&gt;test&lt;/scope&gt;
            &lt;/dependency&gt;        </pre>
</div>
<h2>1.2 加入restdocs插件</h2>
<div class="cnblogs_code">
<pre>&lt;plugin&gt;
                    &lt;groupId&gt;org.asciidoctor&lt;/groupId&gt;
                    &lt;artifactId&gt;asciidoctor-maven-plugin&lt;/artifactId&gt;
                    &lt;version&gt;${plugin-asciidoctor.version}&lt;/version&gt;
                    &lt;executions&gt;
                        &lt;execution&gt;
                            &lt;id&gt;generate-docs&lt;/id&gt;
                            &lt;phase&gt;prepare-<span style="color: #0000ff;">package</span>&lt;/phase&gt;
                            &lt;goals&gt;
                                &lt;goal&gt;process-asciidoc&lt;/goal&gt;
                            &lt;/goals&gt;
                            &lt;configuration&gt;
                                &lt;backend&gt;html&lt;/backend&gt;
                                &lt;doctype&gt;book&lt;/doctype&gt;
                                &lt;attributes&gt;
                                    &lt;generated&gt;${project.build.directory}/swagger&lt;/generated&gt;
                                &lt;/attributes&gt;
                            &lt;/configuration&gt;
                        &lt;/execution&gt;
                    &lt;/executions&gt;
                    &lt;dependencies&gt;
                        &lt;dependency&gt;
                            &lt;groupId&gt;org.springframework.restdocs&lt;/groupId&gt;
                            &lt;artifactId&gt;spring-restdocs-asciidoctor&lt;/artifactId&gt;
                            &lt;version&gt;${spring-restdocs.version}&lt;/version&gt;
                        &lt;/dependency&gt;
                    &lt;/dependencies&gt;
&lt;/plugin&gt;</pre>
</div>
<h1><strong>2 创建Swagger2配置类</strong></h1>
<div class="cnblogs_code">
<pre><span style="color: #0000ff;">package</span><span style="color: #000000;"> com.example.config;

</span><span style="color: #0000ff;">import</span><span style="color: #000000;"> org.springframework.context.annotation.Bean;
</span><span style="color: #0000ff;">import</span><span style="color: #000000;"> org.springframework.context.annotation.Configuration;

</span><span style="color: #0000ff;">import</span><span style="color: #000000;"> io.swagger.annotations.ApiOperation;
</span><span style="color: #0000ff;">import</span><span style="color: #000000;"> springfox.documentation.builders.ApiInfoBuilder;
</span><span style="color: #0000ff;">import</span><span style="color: #000000;"> springfox.documentation.builders.PathSelectors;
</span><span style="color: #0000ff;">import</span><span style="color: #000000;"> springfox.documentation.builders.RequestHandlerSelectors;
</span><span style="color: #0000ff;">import</span><span style="color: #000000;"> springfox.documentation.service.ApiInfo;
</span><span style="color: #0000ff;">import</span><span style="color: #000000;"> springfox.documentation.spi.DocumentationType;
</span><span style="color: #0000ff;">import</span><span style="color: #000000;"> springfox.documentation.spring.web.plugins.Docket;
</span><span style="color: #0000ff;">import</span><span style="color: #000000;"> springfox.documentation.swagger2.annotations.EnableSwagger2;

@Configuration </span><span style="color: #008000;">//</span><span style="color: #008000;"> 让Spring来加载该类配置</span>
@EnableSwagger2 <span style="color: #008000;">//</span><span style="color: #008000;"> 启用Swagger2</span>
<span style="color: #0000ff;">public</span> <span style="color: #0000ff;">class</span><span style="color: #000000;"> Swagger2Config {

    </span><span style="color: #008000;">/**</span><span style="color: #008000;">
     * swagger2的配置文件，这里可以配置swagger2的一些基本的内容，比如扫描的包等等
     *
     * </span><span style="color: #808080;">@return</span><span style="color: #008000;"> Docket
     </span><span style="color: #008000;">*/</span><span style="color: #000000;">
    @Bean
    </span><span style="color: #0000ff;">public</span><span style="color: #000000;"> Docket createRestApi() {
        </span><span style="color: #0000ff;">return</span> <span style="color: #0000ff;">new</span><span style="color: #000000;"> Docket(DocumentationType.SWAGGER_2).apiInfo(apiInfo()).select()
                </span><span style="color: #008000;">//</span><span style="color: #008000;"> 此包路径下的类，才生成接口文档</span>
                .apis(RequestHandlerSelectors.basePackage("com.example.api"<span style="color: #000000;">))
                </span><span style="color: #008000;">//</span><span style="color: #008000;"> 加了ApiOperation注解的类，才生成接口文档</span>
                .apis(RequestHandlerSelectors.withMethodAnnotation(ApiOperation.<span style="color: #0000ff;">class</span><span style="color: #000000;">)).paths(PathSelectors.any())
                .build();
    }

    </span><span style="color: #008000;">/**</span><span style="color: #008000;">
     * api文档的详细信息函数,注意这里的注解引用的是哪个
     *
     * </span><span style="color: #808080;">@return</span>
     <span style="color: #008000;">*/</span>
    <span style="color: #0000ff;">private</span><span style="color: #000000;"> ApiInfo apiInfo() {
        </span><span style="color: #0000ff;">return</span> <span style="color: #0000ff;">new</span><span style="color: #000000;"> ApiInfoBuilder()
                </span><span style="color: #008000;">//</span> <span style="color: #008000;">//</span><span style="color: #008000;">大标题</span>
                .title("泉州地方文化网站接口"<span style="color: #000000;">)
                </span><span style="color: #008000;">//</span><span style="color: #008000;"> 版本号</span>
                .version("1.0"<span style="color: #000000;">)
</span><span style="color: #008000;">//</span><span style="color: #008000;">                .termsOfServiceUrl("NO terms of service")
                </span><span style="color: #008000;">//</span><span style="color: #008000;"> 描述</span>
                .description("后台服务API接口文档"<span style="color: #000000;">)
                </span><span style="color: #008000;">//</span><span style="color: #008000;"> 作者</span>
                .contact("YYH "<span style="color: #000000;">)
                </span><span style="color: #008000;">//</span><span style="color: #008000;"> .contact(new Contact("admin", " ", " "))
                </span><span style="color: #008000;">//</span><span style="color: #008000;"> .license("The Apache License, Version 2.0")
                </span><span style="color: #008000;">//</span><span style="color: #008000;"> .licenseUrl("</span><span style="color: #008000; text-decoration: underline;">http://www.apache.org/licenses/LICENSE-2.0.html</span><span style="color: #008000;">")</span>
<span style="color: #000000;">                .build();
    }

}</span></pre>
</div>
<h1>3 使用方法</h1>
<div class="cnblogs_code">
<pre><span style="color: #000000;">@RestController
@RequestMapping(</span>"/api/user"<span style="color: #000000;">)
@CrossOrigin
@Api(</span>"用户管理"<span style="color: #000000;">)
</span><span style="color: #0000ff;">public</span> <span style="color: #0000ff;">class</span> UserApi <span style="color: #0000ff;">extends</span><span style="color: #000000;"> BaseApi {
    </span><span style="color: #0000ff;">private</span> <span style="color: #0000ff;">static</span> <span style="color: #0000ff;">int</span> ExpireTime = 1000 * 60; <span style="color: #008000;">//</span><span style="color: #008000;"> redis中存储的过期时间</span>
<span style="color: #000000;">    @Resource
    </span><span style="color: #0000ff;">private</span><span style="color: #000000;"> RedisUtil redisUtil;
    @Autowired
    </span><span style="color: #0000ff;">private</span><span style="color: #000000;"> UserService userService;
    @Autowired
    </span><span style="color: #0000ff;">private</span><span style="color: #000000;"> AuthenticationService authenticationService;

    @UserLoginToken
    @PostMapping(value </span>= "/getAll"<span style="color: #000000;">)
    @ApiOperation(value </span>= "获取所有用户信息"<span style="color: #000000;">)
    </span><span style="color: #0000ff;">public</span> RestResponse&lt;List&lt;UserResponseVM&gt;&gt; getAll() <span style="color: #0000ff;">throws</span><span style="color: #000000;"> Exception {
        List</span>&lt;User&gt; userList =<span style="color: #000000;"> userService.getAll();
        List</span>&lt;UserResponseVM&gt; userVM = userList.stream().map(d -&gt;<span style="color: #000000;"> {
            UserResponseVM vm </span>= modelMapper.map(d, UserResponseVM.<span style="color: #0000ff;">class</span><span style="color: #000000;">);
            vm.setCreateTime(DateTimeUtil.dateFormat(d.getCreateTime()));
            </span><span style="color: #0000ff;">return</span><span style="color: #000000;"> vm;
        }).collect(Collectors.toList());
        </span><span style="color: #0000ff;">return</span><span style="color: #000000;"> RestResponse.ok(userVM);
    }

    @UserLoginToken
    @PostMapping(</span>"/add"<span style="color: #000000;">)
    @ApiOperation(value </span>= "添加用户"<span style="color: #000000;">)
    @ApiImplicitParam(name </span>= "model", value = "用户信息", required = <span style="color: #0000ff;">true</span>, paramType = "body", dataType = "User"<span style="color: #000000;">)
    </span><span style="color: #0000ff;">public</span> RestResponse add(@RequestBody User model) <span style="color: #0000ff;">throws</span><span style="color: #000000;"> Exception {
        userService.add(model);
        </span><span style="color: #0000ff;">return</span><span style="color: #000000;"> RestResponse.ok();
    }

    @UserLoginToken
    @DeleteMapping(</span>"/delete"<span style="color: #000000;">)
    @ApiOperation(value </span>= "添加用户"<span style="color: #000000;">)
    </span><span style="color: #0000ff;">public</span> RestResponse delete(@ApiParam(value = "id", required = <span style="color: #0000ff;">true</span>) @RequestParam("id"<span style="color: #000000;">) Integer id)
            </span><span style="color: #0000ff;">throws</span><span style="color: #000000;"> Exception {
        userService.delete(id);
        </span><span style="color: #0000ff;">return</span><span style="color: #000000;"> RestResponse.ok();
    }</span></pre>
</div>
<p>&nbsp;</p>