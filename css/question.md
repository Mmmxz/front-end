# 高频题目
1. css 选择器的优先级是怎样的？  
内联样式 > id 选择器 > 类选择器 > 标签
   > 在具体的计算维度，优先级是由 ABCD 的值来决定的。
   > * A 存在内联样式为 1 ，否则为 0
   > * B id 选择器出现的次数
   > * C 类选择器、属性选择器和伪类出现的总次数
   > * D 标签选择器和伪元素出现的总次数
   ``` css
   /* {0,0,1,3} */
   ul ol li .red {}
   /* {0,1,0,0} */
   #red {}
   /* 从左到右比较每个权重的大小，比较出最大值即可，上述 #red 的优先级更高 */
   ```
2. link 和 @import 的区别？
3. 有哪些方式（css）可以隐藏页面元素？
   * opacity: 0
   * visibility: hidden
   * overflow: hidden
   * display: none
   * z-index: -9999
   * transform: scale(0, 0)
4. em px rem 的区别？
   * em 相对单位，基准点为父节点字体的大小，如果自身定义了 font-size 则按自身来计算。整个页面内 1em 不是一个固定的值。
   * px 绝对单位，页面按精确像素展示。
   * rem 相对单位，可理解为 root em ，相对根节点 html 的字体大小来计算。
5. 块级元素水平居中的方法？
   ``` css
   /* margin: 0 auto; */
   .center{
      height: 200px;
      width:200px;
      margin:0 auto;
      border:1px solid red;
    }
    <div class="center">水平居中</div>

    /* flex */
    .center{
        display:flex;
        justify-content:center;
    }
    <div class="center">
        <div class="flex-div">1</div>
        <div class="flex-div">2</div>
    </div>

    /* table */
    .center{
        display:table;
        margin:0 auto;
        border:1px solid red;
    }
    <div class="center">水平居中</div>

    /* position + (margin | transform) */
   ```
6. css 有几种定位方式？
7. 如何理解 z-index ？   
只对设置了 position 的元素生效。
8. 如何理解层叠上下文？   
是 html 元素的三维概念，这些元素在一条假想的相对于面向（电脑屏幕的）视窗或者网页的用户的 z 轴上延伸， html 元素依据其自身属性按照优先级顺序占用层叠上下文的空间。
   > 参考 [张鑫旭-层叠上下文](https://www.zhangxinxu.com/wordpress/2016/01/understand-css-stacking-context-order-z-index/#comments)
9. 如何产生层叠上下文？
10. 清除浮动有哪些方法？
11. 你对 css sprites 的理解，好处是什么？   
    * 是什么：雪碧图也叫 css 精灵，是 css 图像合成技术，将小图标合并在一起的图片称为雪碧图。
    * 好处：减少加载多张图片的 http 请求数；提前加载资源。
    * 不足：维护成本较高，如果某个图标有改动，要改整张图片；加载速度在 http2 多路复用中不存在优势，多张图片此时可以通过一个连接通道搞定。
12. 你对媒体查询的理解？
13. 你对盒模型的理解？   
盒模型由 content padding border margin 组成。
14. 标准盒模型和怪异盒模型有什么区别？
    * 标准盒模型 box-sizing: content-box; 元素占据的宽度 = margin-left + border-left + padding-left + width + padding-right + border-right + margin-right 高度同理
    * 怪异盒模型 box-sizing: border-box; 元素占据的宽度 = margin-left + width + margin-right 高度同理
15. 谈谈对 BFC 的理解？   
块级格式化上下文是一个独立的渲染区域，让处于 bfc 内部的元素与外部的元素互相隔离。
16. 为什么有时候用 translate 来改变位置而不是定位？   
改变 transform 或 opacity 不会触发浏览器的回流和重绘，只会触发复合；而改变绝对位置会触发重新布局，进而触发重绘和复合。
17. 伪类和伪元素的区别是什么？
18. 你对 flex 的理解？
19. 关于 css 动画与过渡问题？