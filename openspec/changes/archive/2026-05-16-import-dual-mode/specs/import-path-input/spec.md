## import-path-input

### Tab 切换

- `mode` ref: `'browse' | 'input'`，默认 `'browse'`
- Tab 样式：两个按钮并排，active 状态底部主色下划线 + 加粗

### 输入路径模式

- 一个 text input，placeholder: `/Users/.../文章名.md`
- 输入后 slug 自动从路径末尾文件名提取（同浏览模式逻辑）
- `selectedPath` 直接绑定到 input 的 v-model

### 模式切换行为

- 切换时不清空 selectedPath
- 如果在浏览模式选了文件，切换到输入模式后 input 显示完整路径
- 如果在输入模式手动输入了路径，切换到浏览模式后 selectedPath 保留（但文件浏览器不跳转）
