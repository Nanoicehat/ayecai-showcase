---
title: Agent信息收集
date: 2025-05-15
category: ai
summary: 个人Agent环境方案、工具功能对照、模型配置推荐与好用的AI编程工具集合
---

## 学习链接

[LangGraph 入门教程](https://www.runoob.com/ai-agent/langgraph-quick-start.html)

## 个人Agent环境方案

已为您将工具介绍与套餐推荐拆分为两个独立表格，结构更清晰，方便对照查阅：

### 工具功能对照表

| 工具名称             | 核心定位                  | 主要特点与适用场景                                               |
| :--------------- | :-------------------- | :------------------------------------------------------ |
| **CherryStudio** | 桌面端多模型 AI 对话客户端       | 支持一站式接入主流 API，界面直观友好，适合日常问答、文案创作、多会话管理与文档整理             |
| **Obsidian**     | 双向链接笔记与知识库            | 搭配 AI 插件可实现智能摘要、知识检索与笔记生成，适合非代码类知识沉淀、学习管理与个人"第二大脑"构建    |
| **VS Code**      | 主流集成开发环境 (IDE)        | 通过 Cline / Copilot 等插件实现代码补全、重构、调试与版本控制，适合全栈开发与中大型工程化项目 |
| **Claude Code**  | Anthropic 官方 AI 编程终端  | 原生 CLI 交互，支持项目级代码生成、自动化脚本、复杂调试与多文件操作，适合重度开发与架构设计        |
| **cc switch**    | Claude Code 上下文/环境切换器 | 快速切换项目上下文、工作流与 API 配置，提升多项目并行开发时的效率、隔离性与配置管理            |
| **QClaw**        | 终端 AI 编程代理 (Agent)    | 专注于代码生成、命令执行与自动化任务流，适合轻量级脚本编写、快速原型搭建与日常开发提效             |

---

### 套餐与模型配置推荐表

| 适用场景 | 推荐配置 | 获取方式/时间节点 | 推荐搭配工具 |
|:---|:---|:---|:---|
| **轻功能使用** | 邀请码【`MAAS-38AC422D`】 | 点击链接前往订阅：https://maas.xfyun.cn/packageSubscription?inviteCode=MAAS-38AC422D | `CherryStudio`、`Obsidian` 等日常对话与笔记场景 |
| **其他功能使用** | **5月底前**：`deepseek v4pro`<br>**5月底后**：`claude4.6` 系列模型 | 通过以下 API 地址接入：https://api.vectorengine.ai | `VS Code`、`Claude Code`、`cc switch`、`QClaw` 等代码开发与自动化场景 |

### 好用的工具

排行榜网站：https://www.claudepluginhub.com/

| 工具名称                  | 安装命令                                                                                                                                                                    | 功能说明                                                                                                                                                                                                            |
| --------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **OpenSpec**          | `npx openspec init`                                                                                                                                                     | 规格驱动开发初始化器。生成规格文档模板，建立"先写规格后写代码"的工作流，和 AI 编程工具配合使用。                                                                                                                                                             |
| **Superpowers 中文增强版** | `npx superpowers-zh`                                                                                                                                                    | 开源 AI 编程技能包（116k+ ⭐）的汉化版，额外加了 6 个中国本地化 skill。涵盖需求分析、TDD、调试、代码审查、并行 Agent 等 20 个方法论，适配 Gitee/Coding 等国内平台。支持 Claude Code、Cursor、Copilot CLI 等 17 款工具，一键安装。                                                       |
| **Caveman**           | `npx claudepluginhub juliusbrussee/caveman --plugin caveman`                                                                                                            | 让 AI 少说废话，省 65-75% token，响应快约 3 倍。4 种模式：`lite` / `full` / `ultra` / `wenyan`（文言文）。附带命令：`/caveman-commit` 极简提交信息、`/caveman-review` 单行代码审查、`/caveman-stats` 查 token 用量、`/caveman-compress` 压缩记忆文件。兼容 30+ AI 编程工具。 |
| **Claude-HUD**        | `npx claudepluginhub jarrodwatts/claude-hud --plugin claude-hud`  | 终端底部状态栏。显示上下文占用率（绿/黄/红预警）、当前读写文件和子 Agent 状态、API 额度消耗。基于官方 statusline API，无性能损耗。 |
| **Humanizer-zh**      | `npx skills add https://github.com/op7418/Humanizer-zh.git`                                                                                                             | 去除文本中的 AI 痕迹。能识别 24 种常见 AI 写作模式（夸大、填充词、破折号滥用等），重写后给出 5 维度质量评分。用法：`/humanizer-zh [文本]`。基于维基百科 AI Cleanup 指南。                                                                                                     |

## 多模型对比

| 排名 | 模型名称 | 厂商 | 总参数量 | 激活参数 | 架构 | 核心特性 |
|---|---|---|---|---|---|---|
| 1 | Claude Opus 4.7 | Anthropic | ~6.5T | — | MoE | 科学推理第一，视觉/代码大幅跃升 |
| 2 | Claude Opus 4.6 | Anthropic | ~5.2T | ~95B | MoE | 前代旗舰，逻辑推理与多模态能力扎实 |
| 3 | GPT-5.5 | OpenAI | ~3.8T | — | MoE | Coding SOTA，支持 100 万上下文 |
| 4 | Gemini 3.1 Pro | Google | ~3.5T | — | MoE | 多模态理解与长程规划第一梯队 |
| 5 | LLaMA 4 Behemoth | Meta | ~2.0T | 288B | MoE | 开源界"巨无霸"，多语言基座最强 |
| 6 | Claude Sonnet 4.6 | Anthropic | ~1.8T | ~60B | MoE | 中端主力，代码/长文本/多模态性价比之选 |
| 7 | DeepSeek-V4 Pro | DeepSeek | ~1.6T | 49B | MoE | 混合注意力架构，百万 Token 上下文标杆 |
| 8 | Kimi K2.6 | 月之暗面 | ~1.0T | 32B | MoE | Agent 集群之王，支持 300 子智能体并行 |
| 9 | Ling-1T | 蚂蚁集团 | ~1.0T | 50B | MoE | 企业级复杂推理与金融逻辑处理强 |
| 10 | GLM-5 | 智谱 AI | 744B | 40B | MoE | 代码与多模态原生对齐，SWE-bench 优异 |

## OpenClaw 好用的 Skill

- [Self-Improving + Proactive Agent](https://clawhub.ai/ivangdavila/self-improving) — 被纠正时自动学习，完成重要工作后自检，发现重复模式时提为规则
- [Ontology](https://clawhub.ai/oswalpalash/ontology) — 结构化知识图谱，存储带类型约束的实体和关系
- [GitHub](https://clawhub.ai/steipete/github) — 查 PR 状态、Issue、CI 日志等 GitHub 操作
- [Multi Search Engine](https://clawhub.ai/gpyangyoujun/multi-search-engine) — 16 个搜索引擎聚合（7 国内 + 9 国际），无需 API Key
- [Word / DOCX](https://clawhub.ai/ivangdavila/word-docx) — 创建、检查、编辑 Word 文档
- [Desktop Control](https://clawhub.ai/matagul/desktop-control) — 桌面自动化，鼠标键盘控制、截图、窗口管理
- [Himalaya](https://clawhub.ai/lamelas/himalaya) — 邮件管理
- [BlogWatcher](https://clawhub.ai/steipete/blogwatcher) — 博客监控
