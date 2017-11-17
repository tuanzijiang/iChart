- iChart
|- app //项目案例文件（先不要删）
|- DESIGN //项目axure设计样稿
|- e2e-test //测试文件
|- src // 源文件（工程在这个地方 importane!!!)
   |- css //由less生成的css文件
   |- image //图片文件
      |-icon //页面使用的图标文件（按照页面视图分类存放）
   |- less  //less文件夹（自动编译成css，需要配置less，但如果不修改css就不用配置less）
   |- script  // js文件（important!!!）
      |- config // 页面路由文件控制跳转，以及每一个跳转的控制器,记录了哪一个页面在哪一段js代码里面控制(important!!!)
      |- controller // 每个页面控制器的文件，负责页面初始化配置以及操纵页面控制数据（angular是数据驱动的）。
                    // 里面内置了很多服务,代替了很多js的操作（包括settime\http...）（需要知道哪个控制器控制哪一段
                    // 代码的，就去config文件夹里面找路由绑定的地方（important!!!）。
      |- directive //自定义指令的文件（前端指令的构建）
      |- service //自定义服务的构建
      |- ... js包文件以及页面app绑定文件
   |- view //视图文件（路由视图保存的html）
      |- iChart系列（数据编辑器主视图的三个子视图：Edit-编辑区，Data-数据区，Work-工作区）
      |- update系列（上传文件主视图的三个子视图：Load-上传，Scan-预览，Attrs-属性）
   |- readme 文件结构描述
   |- ... 主视图html问文件
|- tec-test //技术尝试文件
|- ...  // 项目配置文件
