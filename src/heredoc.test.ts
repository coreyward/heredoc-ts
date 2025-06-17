import { describe, it, expect } from "vitest"
import { heredoc } from "./heredoc"

describe("heredoc", () => {
  it("strips leading and trailing spaces", () => {
    expect(
      heredoc`
        Hello, world!
      `
    ).toBe("Hello, world!")
  })

  it("only strips consistent leading spaces", () => {
    expect(
      heredoc`
        Hello, world!
          This is a test.
      `
    ).toBe("Hello, world!\n  This is a test.")
  })

  it("allows interpolation", () => {
    expect(
      heredoc`
        Hello, ${"world"}!
      `
    ).toBe("Hello, world!")
  })

  it("treats leading whitespace in interpolated strings independently", () => {
    expect(
      heredoc`
        Hello!
        ${"This\nis\na\ntest."}
        Goodbye!
      `
    ).toBe("Hello!\nThis\nis\na\ntest.\nGoodbye!")
  })

  it("handles complex interpolations with arrays and variables", () => {
    const words = ["one", "two", "three", "four"]
    const objectiveId = 1

    expect(
      heredoc`
        Objective ${objectiveId}:
        ${words.map((word, index) => `  ${index + 1}. ${word}`).join("\n")}
      `
    ).toBe("Objective 1:\n  1. one\n  2. two\n  3. three\n  4. four")
  })

  it("handles interpolation at the start and end of the string", () => {
    expect(heredoc`${"Start"} middle ${"End"}`).toBe("Start middle End")
  })

  it("handles multiple interpolations in a line", () => {
    expect(
      heredoc`This is a ${"test"} with multiple ${"interpolations"} in a ${"line"}.`
    ).toBe("This is a test with multiple interpolations in a line.")
  })

  it("handles multiline interpolations with varying indents", () => {
    expect(
      heredoc`
        Start
        ${"  Indented\nNon-indented\n    More indented"}
        End
      `
    ).toBe("Start\n  Indented\nNon-indented\n    More indented\nEnd")
  })

  it("preserves indentation in interpolated lines", () => {
    expect(
      heredoc`
        <fake-html>
          <li>
            ${["one", "two", "three"].map((s) => `<li>${s}</li>`).join("\n")}
          </li>
        </fake-html>
      `
    ).toBe(
      "<fake-html>\n  <li>\n    <li>one</li>\n    <li>two</li>\n    <li>three</li>\n  </li>\n</fake-html>"
    )
  })

  it("handles nested calls", () => {
    expect(
      heredoc`
        Start
        ${heredoc`
          Indented
          Some
          More
        `}
        End
      `
    ).toBe("Start\nIndented\nSome\nMore\nEnd")
  })

  it("handles empty lines correctly", () => {
    expect(
      heredoc`
        Line 1

        Line 3

        Line 5
      `
    ).toBe("Line 1\n\nLine 3\n\nLine 5")
  })

  it("handles non-string interpolations (number, boolean, null, undefined)", () => {
    expect(
      heredoc`Number: ${42}, Boolean: ${true}, Null: ${null}, Undefined: ${undefined}`
    ).toBe("Number: 42, Boolean: true, Null: , Undefined: ")
  })

  it("works best with interpolated values with newlines on their own line", () => {
    const story = `I sit at the mat.\nAt the mat, I nap.\nI nap and nap.`

    const value = heredoc`
      Here is an example story.

      <example>
      ${story}
      </example>
    `

    expect(value).toBe(
      "Here is an example story.\n\n<example>\nI sit at the mat.\nAt the mat, I nap.\nI nap and nap.\n</example>"
    )
  })
})
