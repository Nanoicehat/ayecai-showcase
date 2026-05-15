---
title: Vue 3 组合式函数设计模式
date: 2025-05-14
category: frontend
summary: 5 种常用 Composable 设计模式，从简单状态封装到复杂异步流控制
---

## 什么是组合式函数

Composable 是 Vue 3 组合式 API 的核心复用机制 — 一个利用 Vue 响应式 API 封装有状态逻辑的函数。

## 模式一：简单状态封装

```typescript
export function useCounter(initial = 0) {
  const count = ref(initial)
  const increment = () => count.value++
  const decrement = () => count.value--
  const reset = () => count.value = initial
  return { count, increment, decrement, reset }
}
```

## 模式二：异步数据获取

```typescript
export function useFetch<T>(url: MaybeRefOrGetter<string>) {
  const data = ref<T | null>(null)
  const error = ref<Error | null>(null)
  const loading = ref(false)

  async function execute() {
    loading.value = true
    error.value = null
    try {
      const res = await fetch(toValue(url))
      data.value = await res.json()
    } catch (e) {
      error.value = e as Error
    } finally {
      loading.value = false
    }
  }

  watchEffect(() => {
    toValue(url)
    execute()
  })

  return { data, error, loading, refresh: execute }
}
```

## 模式三：事件监听自动清理

```typescript
export function useEventListener(
  target: EventTarget,
  event: string,
  handler: EventListener
) {
  onMounted(() => target.addEventListener(event, handler))
  onUnmounted(() => target.removeEventListener(event, handler))
}
```

## 模式四：本地存储响应式同步

```typescript
export function useLocalStorage<T>(key: string, defaultValue: T) {
  const stored = localStorage.getItem(key)
  const data = ref<T>(stored ? JSON.parse(stored) : defaultValue)

  watch(data, (val) => {
    localStorage.setItem(key, JSON.stringify(val))
  }, { deep: true })

  return data
}
```

## 模式五：防抖

```typescript
export function useDebounce<T>(value: Ref<T>, delay = 300) {
  const debounced = ref(value.value) as Ref<T>
  let timer: ReturnType<typeof setTimeout>

  watch(value, (val) => {
    clearTimeout(timer)
    timer = setTimeout(() => debounced.value = val, delay)
  })

  return debounced
}
```

## 设计原则

| 原则 | 说明 |
|:--|:--|
| 命名以 `use` 开头 | 约定俗成，一眼可识别 |
| 返回 ref 而非 reactive | 解构时不丢失响应性 |
| 接受 ref 或 getter 作为参数 | 提高灵活性，用 `toValue()` 取值 |
| 自动清理副作用 | 在 `onUnmounted` 中移除监听器、定时器 |
| 单一职责 | 一个组合式函数只做一件事 |
