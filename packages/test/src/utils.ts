import { act } from "@testing-library/react"

export async function queue() {
  await act(() => Promise.resolve())
}

export async function nextTick() {
  await act(
    () =>
      new Promise((resolve) => requestAnimationFrame(() => resolve(void 0))),
  )
}

export async function sleep(ms = 16) {
  await act(() => new Promise((resolve) => setTimeout(resolve, ms)))
  await nextTick()
}
