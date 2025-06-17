# heredoc-ts

A TypeScript heredoc implementation with smart indentation handling and
interpolation support.

## Installation

```bash
npm install heredoc-ts
```

## Usage

```typescript
import { heredoc } from "heredoc-ts"

const message = heredoc`
  Hello, world!
  This is a multiline string
  with proper indentation handling.
`

console.log(message)
// "Hello, world!\nThis is a multiline string\nwith proper indentation handling."
```

## Features

### Smart Indentation

The `heredoc` function automatically detects and removes the common leading
indentation from all lines:

```typescript
const code = heredoc`
  function example() {
    console.log("Hello world")
  }
`
// `function example() {\n  console.log("Hello world")\n}`
```

### Interpolation Support

Supports template literal interpolation with intelligent handling of multiline
values. This automatically handles the leading spacing (i.e., each newline in
the template value has the leading spacing prepended).

```typescript
const items = ["apple", "banana", "orange"]
const list = heredoc`
  Shopping list:
  ${items.map((item) => `- ${item}`).join("\n")}
`
// "Shopping list:\n- apple\n- banana\n- orange"
```

### Nested Heredocs

You can nest heredoc calls for complex formatting. This will process the
indentation of the nested value first, allowing for indented code for
readability while maintaining consistent outputs without excessive leading
spaces.

```typescript
const nested = heredoc`
  Outer content
  ${heredoc`
    Inner content
    with its own
    indentation
  `}
  Back to outer
`
// "Outer content\nInner content\nwith its own\nindentation\nBack to outer"
```

### Type Safety

Fully typed with TypeScript, supporting string, number, boolean, null, and
undefined interpolations.

## API

### `heredoc(strings: TemplateStringsArray, ...values: Stringish[]): string`

A template tag function that processes multiline strings:

- Removes leading and trailing blank lines
- Detects the smallest common indentation and strips it from all lines
- Preserves relative indentation between lines
- Intelligently handles interpolated values with newlines

## Examples

### Basic Usage

```typescript
const text = heredoc`
  This text starts with proper indentation.
  It maintains relative indentation.
    Like this indented line.
`
```

### With Interpolation

```typescript
const name = "Alice"
const greeting = heredoc`
  Hello, ${name}!
  Welcome to our application.
`
```

### Complex Interpolation

```typescript
const data = ["one", "two", "three"]
const html = heredoc`
  <ul>
    ${data.map((item) => `<li>${item}</li>`).join("\n")}
  </ul>
`
```

## Development

```bash
# Install dependencies
pnpm install

# Run tests
pnpm test

# Build the package
pnpm build

# Run linting
pnpm lint

# Type checking
pnpm typecheck
```

## License

Copyright © 2025 Corey Ward. Available under the MIT license.

## Credits

This package was originally based on the now-archived package
[`theredoc`](https://github.com/testdouble/theredoc) by Justin Searls. This
package began as a TypeScript port, and has had several additions. Thank you,
Justin!
