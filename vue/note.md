# 笔记
1. vue中的event
    ```html
    <button @click="increment1">+1</button>
    <button @click="increment2(2, $event)">+1</button>
    ```
    ```javascript
    methods: {
      // 两种获取event方式
      increment1(event) {
      },
      increment1(num, event) {
      }
    }
    ```
   * event是原生的
   * 事件被挂载到当前元素上
2. 事件修饰符
   * stop 阻止单击事件继续传播
    ```html
    <a v-on:click.stop="doThis"></a>
    ```
   * prevent 提交事件不再重载页面
    ```html
    <form v-on:submit.prevent="onSubmit"></form>
    ```
   * 修饰符可以串联
    ```html
    <a v-on:click.stop.prevent="doThat"></a>
    ```
   * 只有修饰符
    ```html
    <form v-on:submit.prevent></form>
    ```
   * 添加事件监听器时使用事件捕获模式 即内部元素触发的事件先在此处理 然后再交由内部元素进行处理
    ```html
    <div v-on:click.capture="doThis">...</div>
    ```
   * 只在当 event.target 是当前元素自身时触发处理函数 即事件不是从内部元素触发的
    ```html
    <div v-on:click.self="doThat">...</div>
    ```
3. watch 监听引用类型时，拿不到oldVal
4. 组件通讯
   * 父子组件：props、`this.$emit`
   * 非父子组件：EventBus `event.$on`、`event.$emit` event是Vue的实例，即`new Vue()` `$on`注册的事件要在`beforeDestroy`生命周期中使用`event.$off`及时销毁，否则容易造成内存泄漏。**注意**：`this.$emit`（调用父组件事件）和`event.$event`（调用自定义事件）不一样，注意区分
   * Vuex
   * inject provide
5. 生命周期
   * 父子组件渲染：父beforeCreate->父created->父beforeMount->子beforeCreate->子created->子beforeMount->子mounted->父mounted
   * 父子组件更新：父beforeUpdate->子beforeUpdate->子updated->父updated
   * 父子组件销毁：父beforeDestroy->子beforeDestroy->子destroyed->父destroyed

6. Vue 原理
   * 组件化和 MVVM ：数据驱动视图 - Vue MVVM ， Model - View - ViewModel
   * 响应式原理： `Object.defineProperty`
   * vdom 和 diff 算法
   * 模板编译
   * 组件渲染过程
   * 前端路由
7. 响应式原理  
   组件 data 的数据一旦变化，立即触发视图的更新。是实现数据驱动视图的第一步。  
   核心 API - `Object.defineProperty` 相关代码见 **observe.js** 包含响应式、监听对象、监听数组的实现
   #### `Object.defineProperty` 缺点：
      * 深度监听，需要递归到底，一次性计算量大
      * 无法监听新增/删除属性（`Vue.set/Vue.delete`）
      * 无法原生监听数组 需要特殊处理
8. 虚拟 DOM(vdom) 和 diff
   #### 背景
      * DOM 操作非常消耗性能
      * 以前用 jQuery ，可以自行控制 DOM 操作的时机，手动调整
      * Vue 和 React 是数据驱动视图，如何有效控制 DOM 操作
   #### 解决方案 - vdom
      * 有了一定复杂度，想减少计算次数比较难
      * 能不能把计算，更多的转移为 JS 计算，因为 JS 执行速度很快
      * vdom - 用 JS 模拟 DOM 结构，计算出最小的变更，操作 DOM
      ```html
      <div id="div1" class="container">
         <p>vdom</p>
         <ul style="font-size: 20px">
            <li>a</li>
         </ul>
      </div>
      ```
      ```javascript
      <!-- JS 模拟 DOM 结构 -->
      var vdom = {
         tag: 'div',
         props: {
            id: 'div1',
            className: 'container'
         },
         children: [
            {
               tag: 'p',
               children: 'vdom'
            },
            {
               tag: 'ul',
               props: {
                  style: 'font-size: 20px'
               },
               children: [
                  {
                     tag: 'li',
                     children: 'a'
                  }
               ]
            }
         ]
      }
      ```
   #### h(sel: string, data?: vnodeData, children?: vnode) 函数
   * 参数：sel(string-标签) VnodeData children
   * 返回：vnode()
   #### patch(oldVnode: Element | Vnode, vnode: VNode) 函数
   1. 执行 pre hook
   2. 如果第一个参数不是 vnode ，创建一个空的 vnode，关联到这个 DOM 元素
   3. 如果是相同的 vnode ，执行 patchVnode()
   #### diff 算法 优化时间复杂度至 O(n)
      * 只比较同一层级，不跨级比较
      * tag 不相同，则直接删掉重建，不再深度比较
      * tag 和 key ，两者都相同，则认为是相同结点，不再深度比较
   #### diff 算法关键点
      * patchVnode
      * addVnodes removeVnodes
      * updateChildren (key 的重要性)
   > 判断 sameVnode: key 和 sel 都相等，不同的 vnode 直接删掉重建。
   #### patchVnode：vnode对比，入参 oldVnode vnode
   1. 执行 prepatch hook
   2. 设置 vnode.elem 即将 vnode 挂载到 oldVnode 的元素上
   3. 定义变量保存旧 children 和新 children，以便下一步使用
   4. 处理 node 节点（children和text一定有一个不为空）
      1. vnode.text === undefined 时，说明 vnode.children 一般有值。分4种情况：新旧都有children，**更新操作**；新有旧没有，清空旧的text，为当前dom节点加入children；旧有新没有，移除旧节点的children；旧text有，直接清空旧的text。
      2. vnode.text !== undefined 时，说明 vnode.children 无值。新旧节点的文本不相等，直接移除旧的 children，设置新的 text。
   #### diff 算法总结
   * patchVnode
   * addVnodes removeVnodes
   * updateChildren（key 的重要性）
   > 参考资料：https://blog.csdn.net/qq_39045755/article/details/113512304
9.  模板编译
    > 会通过**组件渲染和更新过程**来考察
   #### `template` 经过模板编译( `vue-template-compiler` )变成了什么
   ```javascript
   const template = `<p>{{ message }}</p>`
   // with(this) { return _c('p', [_v(_s(message))]) }
   // _c -> createElement _v -> createTextVNode _s -> toString

   // 以上 with 函数即 render 函数 返回 vNode 用于渲染
   ```
   * 模板编译为 `render` 函数，执行 `render` 函数返回 `vnode`
   * 基于 `vNode` 再执行 `patch` 和 `diff`
   * 使用 `webpack` 、 `vue-loader` ，会在开发环境下编译模板（优化性能）
   #### vue 中使用 `render` 代替 `template`
   ```javascript
   const h = this.$createElement
   // this.$message 为 element-ui 的弹出框 其属性 message 支持 vNode 语法
   this.$message({
      message: h("div", null, [
         h(
            "span",
            {
               style: {
                  color: "#909399",
                  fontSize: "14px"
               }
            },
            res.description
         ),
         h(
            "a",
            {
               on: {
                  click: this.goSameEidt
               },
               class: "e-text-link",
               style: {
                  fontSize: "14px"
               }
            },
            " 查看"
         )
      ]),
      type: "info",
      duration: 5000
   });
   ```
   #### 总结
   * `with` 语法
   * 模板到 `render` 函数，再到 `vNode` ，再到渲染和更新
   * vue 组件可以用 `render` 代替 `template`
11. 组件渲染/更新过程
    #### 回顾
    * 响应式：监听 data 属性 `getter setter` （包括数组）
    * 模板编译：模板到 `render` 函数 再到 `vNode`
    * vdom ： `patch(elem, vNode)` 和 `patch(vNode, newVNode)`
    #### 初次渲染过程
    * 解析模板为 `render` 函数（或在开发环境已完成 vue-loader）
    * 触发响应式 监听 data 属性 `getter setter`
    #### 更新过程
    #### 异步渲染