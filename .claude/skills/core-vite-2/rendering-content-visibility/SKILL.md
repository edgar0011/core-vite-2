---
name: rendering-content-visibility
description: Rendering performance guardrail for the core-vite-2 repo. Use Tailwind arbitrary properties for `content-visibility` on long lists so off-screen items defer layout and paint.
---

# CSS content-visibility for Long Lists

impact: HIGH  
impactDescription: faster initial render  
tags: rendering, css, content-visibility, long-lists

Apply `content-visibility: auto` to defer off-screen rendering.

**Tailwind example:**

```tsx
function MessageList({ messages }: { messages: Message[] }) {
  return (
    <div className="h-screen overflow-y-auto">
      {messages.map(msg => (
        <div
          key={msg.id}
          className="[content-visibility:auto] [contain-intrinsic-size:0_80px]"
        >
          <Avatar user={msg.author} />
          <div>{msg.content}</div>
        </div>
      ))}
    </div>
  )
}
```

For 1000 messages, browser skips layout/paint for around 990 off-screen items (about 10x faster initial render).
