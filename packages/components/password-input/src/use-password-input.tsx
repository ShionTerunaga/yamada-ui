import type { HTMLUIProps, PropGetter } from "@yamada-ui/core"
import type { FormControlOptions } from "@yamada-ui/form-control"
import type { PointerEvent } from "react"
import { layoutStyleProperties } from "@yamada-ui/core"
import {
  formControlProperties,
  useFormControlProps,
} from "@yamada-ui/form-control"
import { useControllableState } from "@yamada-ui/use-controllable-state"
import { handlerAll, pickObject, splitObject } from "@yamada-ui/utils"
import { useCallback } from "react"

interface UsePasswordInputOptions {
  /**
   * Determines whether the password input is visible by default.
   *
   * @default false
   *
   * @deprecated Use `defaultVisible` instead.
   */
  defaultIsVisible?: boolean
  /**
   * Determines whether the password input is visible by default.
   *
   * @default false
   */
  defaultVisible?: boolean
  /**
   * Determines the visibility of the password input.
   *
   * @default false
   *
   * @deprecated Use `visible` instead.
   */
  isVisible?: boolean
  /**
   * Determines the visibility of the password input.
   *
   * @default false
   */
  visible?: boolean
  /**
   * Callback function that is triggered when the visibility of the password input changes.
   */
  onVisibleChange?: (visible: boolean) => void
}

export interface UsePasswordInputProps
  extends Omit<
      HTMLUIProps<"input">,
      "disabled" | "readOnly" | "required" | "size"
    >,
    FormControlOptions,
    UsePasswordInputOptions {}

export const usePasswordInput = (props: UsePasswordInputProps) => {
  const {
    defaultIsVisible,
    defaultVisible = defaultIsVisible,
    isVisible,
    visible: visibleProp = isVisible,
    onVisibleChange,
    ...rest
  } = useFormControlProps(props)
  const { "aria-readonly": ariaReadonly, ...formControlProps } = pickObject(
    rest,
    formControlProperties,
  )
  const [containerProps, inputProps] = splitObject(rest, layoutStyleProperties)
  const { disabled } = formControlProps
  const [visible, setVisible] = useControllableState({
    defaultValue: defaultVisible,
    value: visibleProp,
    onChange: onVisibleChange,
  })

  const onPointerDown = useCallback(
    (ev: PointerEvent<HTMLDivElement>) => {
      if (disabled || ev.button !== 0) return

      ev.preventDefault()

      setVisible((prev) => !prev)
    },
    [disabled, setVisible],
  )

  const getContainerProps: PropGetter = useCallback(
    (props = {}, ref = null) => ({
      ref,
      ...containerProps,
      ...formControlProps,
      ...props,
    }),
    [containerProps, formControlProps],
  )

  const getInputProps: PropGetter<"input"> = useCallback(
    (props = {}, ref = null) => ({
      ref,
      type: visible ? "text" : "password",
      ...inputProps,
      "aria-readonly": ariaReadonly,
      ...formControlProps,
      ...props,
    }),
    [visible, inputProps, ariaReadonly, formControlProps],
  )

  const getIconProps: PropGetter = useCallback(
    (props = {}, ref = null) => ({
      ref,
      "aria-label": "Toggle password visibility",
      tabIndex: -1,
      ...formControlProps,
      ...props,
      onPointerDown: handlerAll(props.onPointerDown, onPointerDown),
    }),
    [formControlProps, onPointerDown],
  )

  return {
    setVisible,
    visible,
    getContainerProps,
    getIconProps,
    getInputProps,
  }
}

export type UsePasswordInputReturn = ReturnType<typeof usePasswordInput>
