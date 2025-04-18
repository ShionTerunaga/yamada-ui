import type { IconProps } from "@yamada-ui/icon"
import { forwardRef } from "@yamada-ui/core"
import { Icon } from "@yamada-ui/icon"
import { cx } from "@yamada-ui/utils"
import { GripHorizontal as OriginalGripHorizontal } from "lucide-react"

/**
 * `GripHorizontalIcon` is [Lucide](https://lucide.dev) SVG icon component.
 *
 * @see Docs https://yamada-ui.com/components/media-and-icons/lucide
 */
export const GripHorizontalIcon = forwardRef<IconProps, "svg">(
  ({ className, ...rest }, ref) => (
    <Icon
      ref={ref}
      as={OriginalGripHorizontal}
      className={cx("ui-lucide-icon", className)}
      {...rest}
    />
  ),
)

/**
 * `GripHorizontal` is [Lucide](https://lucide.dev) SVG icon component.
 *
 * @see Docs https://yamada-ui.com/components/media-and-icons/lucide
 *
 * @deprecated Use `GripHorizontalIcon` instead.
 */
export const GripHorizontal = GripHorizontalIcon
