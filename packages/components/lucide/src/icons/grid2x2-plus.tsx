import type { LucideIconProps } from "../lucide-icon"
import { forwardRef } from "@yamada-ui/core"
import { Grid2x2Plus as Grid2x2PlusIcon } from "lucide-react"
import { LucideIcon } from "../lucide-icon"

/**
 * `Grid2x2Plus` is [Lucide](https://lucide.dev) SVG icon component.
 *
 * @see Docs https://yamada-ui.com/components/media-and-icons/lucide
 */
export const Grid2x2Plus = forwardRef<LucideIconProps, "svg">((props, ref) => (
  <LucideIcon ref={ref} as={Grid2x2PlusIcon} {...props} />
))