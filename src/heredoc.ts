type Stringish = string | number | boolean | null | undefined

/**
 * A template tag that allows you to write multiline strings without needing to
 * worry about indentation. The first and last lines will be stripped if they
 * are empty.
 *
 * This works by determining the largest consistent left padding of all lines
 * and removing it. Blank lines are not considered when determining the padding.
 *
 * Interpolated values without newlines work as expected, but for interpolated
 * values with newlines, the indentation of the interpolated value is added to
 * each line after the initial line of the value. This allows you to write code
 * without manually inserting the correct left padding into each line of code.
 */
export function heredoc(strings: TemplateStringsArray, ...values: Stringish[]) {
  const lines = withoutLeadingAndTrailingBlankLines(
    zipString(strings, values).split("\n")
  )

  return stripIndent(lines, smallestIndent(lines) ?? 0).join("\n")
}

function zipString(
  strings: TemplateStringsArray,
  values: readonly Stringish[]
) {
  let s = ""
  for (const [i, string] of strings.entries()) {
    const lastLine = string.split("\n").at(-1)!
    const linePad = " ".repeat(/^ +$/.test(lastLine) ? lastLine.length : 0)

    const value = String(values[i] ?? "")

    s +=
      string +
      value
        .split("\n")
        .map((line, index) => (index === 0 ? line : linePad + line))
        .join("\n")
  }
  return s
}

function smallestIndent(lines: readonly string[]) {
  let smallest = null
  for (const line of lines) {
    const indent = line.search(/[^ ]/)
    if (indent !== -1 && (smallest === null || indent < smallest)) {
      smallest = indent
    }
  }
  return smallest
}

function stripIndent(lines: readonly string[], spacesToStrip: number) {
  const findIndent = new RegExp(`^ {${spacesToStrip}}`)
  return lines.map((line) => {
    return findIndent.test(line) ? line.replace(findIndent, "") : line
  })
}

// Written verbosely to avoid the cost of slice (array copy) if unnecessary
function withoutLeadingAndTrailingBlankLines(lines: readonly string[]) {
  const leadingBlankLine = isWhitespace(lines[0]!)
  const trailingBlankLine = isWhitespace(lines.at(-1)!)
  return leadingBlankLine || trailingBlankLine
    ? lines.slice(
        leadingBlankLine ? 1 : 0,
        trailingBlankLine ? lines.length - 1 : lines.length
      )
    : lines
}

function isWhitespace(s: string) {
  return /^\s*$/.test(s)
}
