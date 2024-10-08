import type { CSSUIObject, HTMLUIProps, ThemeProps } from "@yamada-ui/core"
import {
  ui,
  forwardRef,
  useComponentMultiStyle,
  omitThemeProps,
} from "@yamada-ui/core"
import type { UseInfiniteScrollProps } from "@yamada-ui/use-infinite-scroll"
import { useInfiniteScroll } from "@yamada-ui/use-infinite-scroll"
import { createContext, cx, mergeRefs } from "@yamada-ui/utils"
import type { ReactNode } from "react"
import { useMemo, useRef } from "react"

interface InfiniteScrollAreaContext {
  [key: string]: CSSUIObject
}

const [InfiniteScrollAreaProvider, useInfiniteScrollAreaContext] =
  createContext<InfiniteScrollAreaContext>({
    name: "InfiniteScrollAreaContext",
    errorMessage: `useInfiniteScrollAreaContext returned is 'undefined'. Seems you forgot to wrap the components in "<InfiniteScrollArea />"`,
  })

interface InfiniteScrollAreaOptions {
  /**
   * Props for infinite scroll area trigger component.
   */
  triggerProps?: HTMLUIProps
  /**
   * The infinite scroll area loading to use.
   */
  loading?: ReactNode
  /**
   * The infinite scroll area finish to use.
   */
  finish?: ReactNode
}

export interface InfiniteScrollAreaProps
  extends Omit<HTMLUIProps, keyof UseInfiniteScrollProps>,
    UseInfiniteScrollProps,
    ThemeProps<"InfiniteScrollArea">,
    InfiniteScrollAreaOptions {}

/**
 * `InfiniteScrollArea` is for providing infinite scroll functionality.
 * This feature provides a smooth scrolling experience by automatically loading and displaying the next dataset when the user reaches the end of the page.
 *
 * @see Docs https://yamada-ui.com/components/data-display/infinite-scroll-area
 */
export const InfiniteScrollArea = forwardRef<InfiniteScrollAreaProps, "div">(
  ({ orientation: _orientation = "vertical", ...props }, ref) => {
    const [styles, mergedProps] = useComponentMultiStyle("InfiniteScrollArea", {
      orientation: _orientation,
      ...props,
    })
    const {
      rootRef: rootRefProp,
      orientation,
      rootMargin,
      threshold,
      startIndex,
      onLoad,
      resetRef,
      indexRef,
      className,
      children,
      triggerProps,
      loading,
      finish,
      isDisabled,
      isReverse,
      initialLoad,
      ...rest
    } = omitThemeProps(mergedProps)
    const isVertical = orientation === "vertical"
    const rootRef = useRef<HTMLDivElement>(null)
    const { ref: triggerRef, isFinish } = useInfiniteScroll({
      orientation,
      rootRef: rootRefProp ?? rootRef,
      rootMargin,
      threshold,
      startIndex,
      onLoad,
      resetRef,
      indexRef,
      isDisabled,
      isReverse,
      initialLoad,
    })

    const css: CSSUIObject = useMemo(
      () => ({
        w: "100%",
        display: "flex",
        flexDirection: isVertical ? "column" : "row",
        gap: "1rem",
        ...styles.container,
      }),
      [isVertical, styles],
    )

    const hasFinish = !!finish
    const showTrigger = !isDisabled && (hasFinish || !isFinish)

    return (
      <InfiniteScrollAreaProvider value={styles}>
        <ui.div
          ref={mergeRefs(rootRef, ref)}
          className={cx("ui-infinite-scroll-area", className)}
          role="feed"
          aria-busy="false"
          __css={css}
          {...rest}
        >
          {isReverse && showTrigger ? (
            <InfiniteScrollTrigger ref={triggerRef} {...triggerProps}>
              {isFinish ? finish : loading}
            </InfiniteScrollTrigger>
          ) : null}

          {children}

          {!isReverse && showTrigger ? (
            <InfiniteScrollTrigger ref={triggerRef} {...triggerProps}>
              {isFinish ? finish : loading}
            </InfiniteScrollTrigger>
          ) : null}
        </ui.div>
      </InfiniteScrollAreaProvider>
    )
  },
)

interface InfiniteScrollTriggerProps extends HTMLUIProps {}

const InfiniteScrollTrigger = forwardRef<InfiniteScrollTriggerProps, "div">(
  ({ className, ...rest }, ref) => {
    const styles = useInfiniteScrollAreaContext()
    const css: CSSUIObject = useMemo(
      () => ({
        w: "100%",
        flex: 1,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        ...styles.trigger,
      }),
      [styles],
    )

    return (
      <ui.div
        ref={ref}
        className={cx("ui-infinite-scroll-area__trigger", className)}
        __css={css}
        {...rest}
      />
    )
  },
)
