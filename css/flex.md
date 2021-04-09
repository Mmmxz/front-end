### 解决flex布局最后一行两边分布问题
flex布局的space-between属性，会导致最后一行的元素无法从左向右对齐，根据每行列数（3列、4列、5列……）来分别解决。

1. 3列，最后一行左对齐，使用伪元素解决。
    ```html
    <div class="list">
      <div class="item"></div>
      <div class="item"></div>
      <div class="item"></div>
    </div>
    ```
    ```css
    /* 只需给包裹这所有项的容器一个伪元素即可 */
    .list::after {
      content: '';
      width: 33.33%;
    }
    ```
2. 4列，最后一行左对齐，需要增加1个占位符元素，和伪元素解决。
    ```html
    <div class="list">
      <div class="item"></div>
      <div class="item"></div>
      <div class="item"></div>
      <div class="item"></div>
      <!-- 占位符元素 -->
      <div class="item-placeholder"></div>
    </div>
    ```
    ```css
    .list::after {
      content: '';
      width: 20%;
    }
    .item-placeholder {
      width: 20%;
      border: 1px solid transparent;
    }
    ```
3. 5列，最后一行左对齐，需要增加2个占位符元素，和伪元素解决。
    ```html
    <div class="list">
      <div class="item"></div>
      <div class="item"></div>
      <div class="item"></div>
      <div class="item"></div>
      <div class="item"></div>
      <!-- 占位符元素 -->
      <div class="item-placeholder"></div>
      <div class="item-placeholder"></div>
    </div>
    ```
    ```css
    .list::after {
      content: '';
      width: 20%;
    }
    .item-placeholder {
      width: 20%;
      border: 1px solid transparent;
    }
    ```
**总结**
* 3列元素只需要在包裹元素增加伪元素即可；
* 4列元素需要在包裹元素增加伪元素和内部添加1个宽度相同的占位符；
* 5列元素需要伪元素和2个占位符；
* 其他依次类推。