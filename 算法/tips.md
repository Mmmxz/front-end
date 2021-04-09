### 二维数组转一维
* row 行 col 列的二维数组，转换成一维坐标格式是 i * col + j
* 一维数组转换为二维坐标 i = index / col; j = index % col
``` javascript
// 二维坐标转换为一维坐标 3行4列依次输出0-11
var searchMatrix = function(matrix, target) {
  const m = matrix.length, n = matrix[0].length
  for (let i = 0; i < m; i++) {
    for (let j = 0; j < n; j++) {
      console.log(i * n + j)
    }
  }
};
// 一维坐标转换为二维坐标
var searchMatrix = function(matrix) {
  const m = matrix.length, n = matrix[0].length
  for (let index = 0; index < m * n; index++) {
    console.log(Math.floor(index / n), index % n)
  }
};
```