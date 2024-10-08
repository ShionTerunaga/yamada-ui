import type { BoxProps } from "@yamada-ui/react"
import { Box, Text } from "@yamada-ui/react"
import dynamic from "next/dynamic"
import { Highlight as ReactHighlight, themes } from "prism-react-renderer"
import type { HighlightProps as ReactHighlightProps } from "prism-react-renderer"
import type { DetailedHTMLProps, FC, HTMLAttributes } from "react"
import { CopyButton } from "components/forms"
import { toBoolean } from "utils/boolean"

const EditableCodeBlock = dynamic(() => import("./editable-code-block"))

interface Children {
  props: {
    className?: string
    title?: string
    functional?: string | boolean
    iframe?: string | boolean
    live?: string | boolean
    noInline?: string | boolean
    children?: string
    highlight?: string
  }
}

export interface PreProps
  extends DetailedHTMLProps<HTMLAttributes<HTMLPreElement>, HTMLPreElement> {}

export const Pre: FC<PreProps> = ({ children }) => {
  let {
    className,
    title,
    live = true,
    functional = false,
    iframe = false,
    noInline,
    children: raw,
    highlight,
  } = (children as Children).props

  live = toBoolean(live)
  functional = toBoolean(functional)
  iframe = toBoolean(iframe)
  noInline = toBoolean(noInline)

  const language = className?.replace(/language-/, "") ?? "sh"
  const code = raw?.trim() ?? ""
  const theme = themes.oneDark
  const isJSXorTSX = language === "jsx" || language === "tsx"

  if (isJSXorTSX && live) {
    return (
      <EditableCodeBlock
        {...{ code, language, theme, noInline, functional, iframe }}
      />
    )
  }

  return <CodeBlock {...{ title, code, language, theme, highlight }} />
}

export interface CodeBlockProps extends HighlightProps, BoxProps {
  title?: string
  innerProps?: BoxProps
}

export const CodeBlock: FC<CodeBlockProps> = ({
  title,
  code,
  language,
  theme,
  highlight,
  innerProps,
  ...rest
}) => {
  return (
    <Box position="relative" my="6" {...rest}>
      <Box
        h="full"
        rounded="md"
        bg={["neutral.800", "neutral.900"]}
        sx={{ "& > div": { py: "6" } }}
        overflow="hidden"
        {...innerProps}
      >
        {title ? (
          <Text
            display="block"
            py="sm"
            px="md"
            borderBottomWidth="1px"
            bg={["whiteAlpha.200", "whiteAlpha.100"]}
            fontSize="xs"
            color={["whiteAlpha.700", "whiteAlpha.600"]}
            isTruncated
          >
            {title}
          </Text>
        ) : null}

        <Highlight {...{ code, language, theme, highlight }} />
      </Box>

      <CopyButton
        value={code}
        position="absolute"
        top={title ? "3.3rem" : "1.125rem"}
        right="4"
        zIndex="1"
      />
    </Box>
  )
}

const REG = /{([\d,-]+)}/

const computeHighlight = (highlight: string) => {
  if (!REG.test(highlight)) return () => false

  const lines = REG.exec(highlight)?.[1]
    .split(`,`)
    .map((str) => str.split(`-`).map((x) => parseInt(x, 10)))

  return (index: number) => {
    const line = index + 1

    return lines?.some(([start, end]) =>
      end ? line >= start && line <= end : line === start,
    )
  }
}

export interface HighlightProps extends Omit<ReactHighlightProps, "children"> {
  highlight?: string
}

export const Highlight: FC<HighlightProps> = ({
  language,
  highlight,
  ...rest
}) => {
  const shouldHighlight = computeHighlight(highlight ?? "")

  return (
    <ReactHighlight language={language} {...rest}>
      {({ className, style, tokens, getLineProps, getTokenProps }) => (
        <Box fontSize="sm" overflowX="auto" data-language={language}>
          <Box
            as="pre"
            className={className}
            minW="fit-content"
            style={{ ...style, backgroundColor: "inherit" }}
          >
            {tokens.map((line, index) => (
              <Box
                key={index}
                minW="fit-content"
                pl="4"
                pr="16"
                bg={shouldHighlight(index) ? "whiteAlpha.200" : undefined}
                {...getLineProps({ line })}
              >
                {line.map((token, index) => (
                  <Text key={index} as="span" {...getTokenProps({ token })} />
                ))}
              </Box>
            ))}
          </Box>
        </Box>
      )}
    </ReactHighlight>
  )
}
