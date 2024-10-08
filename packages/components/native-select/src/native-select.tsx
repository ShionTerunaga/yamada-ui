import type { FC, CSSUIObject, HTMLUIProps, ThemeProps } from "@yamada-ui/core"
import {
  ui,
  forwardRef,
  useComponentMultiStyle,
  omitThemeProps,
  layoutStyleProperties,
} from "@yamada-ui/core"
import type { FormControlOptions } from "@yamada-ui/form-control"
import {
  formControlProperties,
  useFormControlProps,
} from "@yamada-ui/form-control"
import { ChevronIcon } from "@yamada-ui/icon"
import {
  createContext,
  cx,
  splitObject,
  getValidChildren,
  isValidElement,
  pickObject,
  omitObject,
} from "@yamada-ui/utils"
import type {
  DetailedHTMLProps,
  OptionHTMLAttributes,
  ReactElement,
} from "react"
import { cloneElement } from "react"

interface NativeSelectBaseItem
  extends Omit<
    DetailedHTMLProps<
      OptionHTMLAttributes<HTMLOptionElement>,
      HTMLOptionElement
    >,
    "label" | "children" | "value"
  > {
  label?: string
}

type Value = DetailedHTMLProps<
  OptionHTMLAttributes<HTMLOptionElement>,
  HTMLOptionElement
>["value"]

interface NativeSelectItemWithValue extends NativeSelectBaseItem {
  value?: Value
}

interface NativeSelectItemWithItems extends NativeSelectBaseItem {
  items?: NativeSelectItemWithValue[]
}

export interface NativeSelectItem
  extends NativeSelectItemWithValue,
    NativeSelectItemWithItems {}

interface NativeSelectContext {
  [key: string]: CSSUIObject
}

const [NativeSelectProvider, useNativeSelect] =
  createContext<NativeSelectContext>({
    name: "NativeSelectContext",
    errorMessage: `useNativeSelect returned is 'undefined'. Seems you forgot to wrap the components in "<NativeSelect />"`,
  })

interface NativeSelectOptions {
  /**
   * If provided, generate options based on items.
   *
   * @default '[]'
   */
  items?: NativeSelectItem[]
  /**
   * The placeholder for select.
   */
  placeholder?: string
  /**
   * If `true`, include placeholders in options.
   *
   * @default true
   */
  placeholderInOptions?: boolean
  /**
   * The border color when the input is focused.
   */
  focusBorderColor?: string
  /**
   * The border color when the input is invalid.
   */
  errorBorderColor?: string
  /**
   * Props for container element.
   */
  containerProps?: Omit<HTMLUIProps, "children">
  /**
   * Props for icon element.
   */
  iconProps?: HTMLUIProps
}

export interface NativeSelectProps
  extends Omit<HTMLUIProps<"select">, "size">,
    ThemeProps<"NativeSelect">,
    NativeSelectOptions,
    FormControlOptions {}

/**
 * `NativeSelect` is a component used for allowing users to select one option from a list. It displays a native dropdown list provided by the browser (user agent).
 *
 * @see Docs https://yamada-ui.com/components/forms/native-select
 */
export const NativeSelect = forwardRef<NativeSelectProps, "select">(
  (props, ref) => {
    const [styles, mergedProps] = useComponentMultiStyle("NativeSelect", props)
    const {
      className,
      children,
      placeholderInOptions = true,
      color,
      items = [],
      placeholder,
      containerProps,
      iconProps,
      ...rest
    } = useFormControlProps(omitThemeProps(mergedProps))
    const {
      "aria-readonly": _ariaReadonly,
      onFocus: _onFocus,
      onBlur: _onBlur,
      ...formControlProps
    } = pickObject(rest, formControlProperties)
    const [{ h, height, minH, minHeight, ...layoutProps }, selectProps] =
      splitObject(omitObject(rest, ["aria-readonly"]), layoutStyleProperties)

    let computedChildren: ReactElement[] = []

    if (!children && items.length) {
      computedChildren = items
        .map((item, i) => {
          if ("value" in item) {
            const { label, value, ...props } = item

            return (
              <NativeOption key={i} value={value} {...props}>
                {label}
              </NativeOption>
            )
          } else if ("items" in item) {
            const { label, items = [], ...props } = item

            return (
              <NativeOptionGroup key={i} label={label} {...props}>
                {items.map(({ label, value, ...props }, i) => (
                  <NativeOption key={i} value={value} {...props}>
                    {label}
                  </NativeOption>
                ))}
              </NativeOptionGroup>
            )
          }
        })
        .filter(Boolean) as ReactElement[]
    }

    return (
      <NativeSelectProvider value={styles}>
        <ui.div
          className="ui-select"
          __css={{
            position: "relative",
            w: "100%",
            h: "fit-content",
            color,
            ...styles.container,
          }}
          {...layoutProps}
          {...containerProps}
          {...formControlProps}
        >
          <ui.select
            ref={ref}
            className={cx("ui-select__field", className)}
            __css={{
              pe: "2rem",
              h: h ?? height,
              minH: minH ?? minHeight,
              ...styles.field,
            }}
            {...selectProps}
          >
            {placeholder ? (
              <NativeOption value="" hidden={!placeholderInOptions}>
                {placeholder}
              </NativeOption>
            ) : null}
            {children ?? computedChildren}
          </ui.select>

          <NativeSelectIcon {...iconProps} {...formControlProps} />
        </ui.div>
      </NativeSelectProvider>
    )
  },
)

NativeSelect.displayName = "NativeSelect"
NativeSelect.__ui__ = "NativeSelect"

interface NativeSelectIconProps extends HTMLUIProps {}

const NativeSelectIcon: FC<NativeSelectIconProps> = ({
  className,
  children,
  ...rest
}) => {
  const styles = useNativeSelect()

  const css: CSSUIObject = {
    position: "absolute",
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    pointerEvents: "none",
    top: "50%",
    transform: "translateY(-50%)",
    ...styles.icon,
  }

  const validChildren = getValidChildren(children)

  const cloneChildren = validChildren.map((child) =>
    cloneElement(child, {
      focusable: false,
      "aria-hidden": true,
      style: {
        width: "1em",
        height: "1em",
        color: "currentColor",
      },
    }),
  )

  return (
    <ui.div className={cx("ui-select__icon", className)} __css={css} {...rest}>
      {isValidElement(children) ? cloneChildren : <ChevronIcon />}
    </ui.div>
  )
}

NativeSelectIcon.displayName = "NativeSelectIcon"
NativeSelectIcon.__ui__ = "NativeSelectIcon"

export interface NativeOptionGroupProps extends HTMLUIProps<"optgroup"> {}

export const NativeOptionGroup = forwardRef<NativeOptionGroupProps, "optgroup">(
  (props, ref) => <ui.optgroup ref={ref} {...props} />,
)

NativeOptionGroup.displayName = "NativeOptionGroup"
NativeOptionGroup.__ui__ = "NativeOptionGroup"

export interface NativeOptionProps
  extends Omit<HTMLUIProps<"option">, "children"> {
  children?: string
}

export const NativeOption = forwardRef<NativeOptionProps, "option">(
  (props, ref) => <ui.option ref={ref} {...props} />,
)

NativeOption.displayName = "NativeOption"
NativeOption.__ui__ = "NativeOption"
