---
name: jsx-structure-comments
description: JSX readability guardrail for the core-vite-2 repo. Add concise section comments for major JSX blocks in non-trivial component markup.
---

# JSX Structure Comments

Use block-level JSX comments to make complex component structure easier to scan.

## Rules

1. For non-trivial JSX trees (multiple sibling regions, nested conditionals, or long return blocks), add section comments before major blocks.
2. Use short labels in Title Case, such as `{/* Logo */}`, `{/* Content */}`, `{/* Actions */}`, `{/* Background Effects */}`.
3. Place each comment directly above the block it describes.
4. Skip comments for trivial markup or where names already make structure obvious.

## Example

```tsx
<BoxLayout className="relative">
  {/* Logo */}
  {image && <Avatar />}

  {/* Content */}
  <BoxLayout>{children}</BoxLayout>

  {/* Logo Blur */}
  {image && <Avatar className="blur-3xl" />}
</BoxLayout>
```

## Rule

- Use comments to expose structure, not to narrate obvious implementation details.
