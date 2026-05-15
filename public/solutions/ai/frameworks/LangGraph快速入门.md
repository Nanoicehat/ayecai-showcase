---
title: LangGraph 快速入门指南
date: 2025-05-10
category: ai/frameworks
summary: 从零搭建一个基于 LangGraph 的多步骤 Agent，涵盖状态管理、节点定义和条件路由
---

## 什么是 LangGraph

LangGraph 是 LangChain 团队推出的图结构 Agent 编排框架，核心思想是将 Agent 的执行流程建模为有向图。

## 核心概念

### 状态（State）

```python
from typing import TypedDict, Annotated
from langgraph.graph import StateGraph

class AgentState(TypedDict):
    messages: list
    next_action: str
```

### 节点（Node）

每个节点是一个处理函数，接收 state，返回更新后的 state。

```python
def call_llm(state: AgentState) -> AgentState:
    response = llm.invoke(state["messages"])
    return {"messages": state["messages"] + [response]}
```

### 边（Edge）

条件边根据 state 决定下一步走哪个节点：

```python
def should_continue(state: AgentState) -> str:
    if state["next_action"] == "end":
        return "end"
    return "call_tool"
```

## 最小可运行示例

```python
from langgraph.graph import StateGraph, END

graph = StateGraph(AgentState)
graph.add_node("llm", call_llm)
graph.add_node("tool", call_tool)
graph.add_conditional_edges("llm", should_continue, {"end": END, "call_tool": "tool"})
graph.add_edge("tool", "llm")
graph.set_entry_point("llm")

app = graph.compile()
result = app.invoke({"messages": [user_input], "next_action": ""})
```

## 适用场景

- 多步骤推理 Agent
- 带工具调用的对话系统
- 需要人工审批节点的工作流
- 复杂的条件分支逻辑
