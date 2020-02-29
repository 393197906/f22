## f22（typescript-react体系）框架



### 现用vea-vue存在的问题
0. 缺少面向数据模型开发的实体抽象（json在前端业务开发层表达能力不够，对代码生成器也不友好）
1. 缺少浏览器按需polify机制，导致现代浏览器没有办法有效的压缩包体积
2. service 与component 的强制分离导致组件复用率较低
3. service 管理混乱，fetch中间件设计难度高
4. 缺少 api proxy机制，跨域解决依赖后端同事
5. deploy不兼容node 10+版本
6. vue2对typescript支持不够（面向config架构导致），导致负责组件难以维护
7. aev库大量污染vue原型对象，可能会有不兼容第三方库的隐患
8. ssr方案只支持静态渲染，功能不完备
9. 缺少移动端路由机制
10. 不兼容主流vue体系跨端开发方案（uniapp,mpvue等）
11. 缺少api mock
12. vue组件库摇树优化配置繁琐
13. 状态管理框架垃圾（vuex）,为了抄袭而抄袭（redux）,使用及其繁琐
14. 文档不完善
15. 等等(待补充)...

### f22解决方案
0. 使用typescript 基于 interface来抽象
1. 直接用react-script
2. 新的(f22-service)基于hook的service机制，fetch只做简单封装
3. 同上一条
4. 加入api proxy 
5. 升级一下deploy包 或者换一种部署模式（待确定）
6. 使用typescript
7. 使用react技术栈
8. 开发新的基于react的ssr方案
9. 开发f22-router(基于react-router)
10. 兼容taro
11. f22-service 引入mock机制
12. react没这问题
13. 基于Observer模式的简单状态管理库
14. 完善文档






### ToDoList 一期
#### f22-router (使用方法类似于vue-router 没有切换技术的心智负担)

- [x] 基于配置的路由模式 
- [x] NavigationView
- [x] keep-alive机制


####  f22-obserable (废弃)

- [x]  f22-obserable

#### f22-store (代替f22-obserable)
- [x] state and dispatch
- [x] 类型推导
- [ ] 中间件机制 

#### f22-service

- [x] useFetch

#### f22-cli

- [ ] 建立项目模板，直接用creat-react-app





