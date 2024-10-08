import { forwardRef } from "@yamada-ui/core"
import { SquareFunction as SquareFunctionIcon } from "lucide-react"
import { LucideIcon } from "../lucide-icon"
import type { LucideIconProps } from "../lucide-icon"

/**
 * `SquareFunction` is [Lucide](https://lucide.dev) SVG icon component.
 *
 * @see Docs https://yamada-ui.com/components/media-and-icons/lucide
 */
export const SquareFunction = forwardRef<LucideIconProps, "svg">(
  (props, ref) => <LucideIcon ref={ref} as={SquareFunctionIcon} {...props} />,
)
