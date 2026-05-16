## Design

### UI 方案

在 ImportDialog 文件选择区域上方加一个 tab 切换：

```
[ 📁 浏览选择 ] [ ✏️ 输入路径 ]
```

- 选「浏览选择」：显示现有文件浏览器
- 选「输入路径」：显示一个文本框输入绝对路径

两种模式共享同一个 `selectedPath` 变量，切换模式时不清空已选路径。

### 实现范围

仅改动 `admin/src/components/ImportDialog.vue`，无后端改动。
