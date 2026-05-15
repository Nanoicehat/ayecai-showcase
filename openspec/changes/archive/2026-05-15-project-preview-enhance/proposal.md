## Why

当前 4 个项目的 preview.vue 动画效果偏简单，creative-portfolio 只有浮动卡片、minimal-blog 只有骨架线条、tech-dashboard 数据动画还行但缺乏层次、ai-chat-app 气泡弹入缺少交互感。需要让每个项目的首页预览动画更丰富、更有辨识度，匹配各自项目的性格。

## What Changes

- **creative-portfolio** preview：从简单浮动卡片升级为画廊拼贴布局，图片卡交错入场 + 悬浮旋转 + 光影效果
- **tech-dashboard** preview：增加折线图绘制动画 + 实时数据脉冲效果 + 指标卡片翻转入场
- **minimal-blog** preview：从纯骨架线条升级为模拟真实排版效果，段落逐行淡入 + 光标打字 + 引用块装饰
- **ai-chat-app** preview：增加消息流动感，气泡弹入更弹性 + 头像呼吸光圈 + AI 思考状态动画升级

## Capabilities

### New Capabilities
- `preview-creative-portfolio`: 创意作品集首页预览动画——画廊拼贴、交错入场、光影效果
- `preview-tech-dashboard`: 数据仪表盘首页预览动画——折线图绘制、数据脉冲、翻转卡片
- `preview-minimal-blog`: 极简博客首页预览动画——逐行排版、打字光标、引用装饰
- `preview-ai-chat-app`: AI 聊天助手首页预览动画——弹性气泡、呼吸光圈、思考状态

### Modified Capabilities

## Impact

- `src/projects/creative-portfolio/preview.vue` — 重写动画
- `src/projects/tech-dashboard/preview.vue` — 增加折线图和脉冲效果
- `src/projects/minimal-blog/preview.vue` — 升级排版动画
- `src/projects/ai-chat-app/preview.vue` — 升级气泡和交互动画
