## Why

创意作品集项目（creative-portfolio）原先是一个画廊 Demo，现需改为呈现本项目（ayecai-showcase）自身的信息，使项目卡片点击后展示的是本展示站而不是虚构作品集。

## What Changes

- `creative-portfolio/config.ts`：title 改为「阿椰菜补丁铺」，description 改为展示站介绍，GitHub URL 改为 `https://Nanoicehat.github.io/ayecai-showcase/`

## Capabilities

### New Capabilities

- `project-self-intro`: creative-portfolio 项目卡片作为展示站自述入口，详情页呈现本项目本身的功能介绍和技术栈信息

### Modified Capabilities

<!-- No existing capability requirements are changing -->

## Impact

- `src/projects/creative-portfolio/config.ts` — 修改 title、description、github 字段
