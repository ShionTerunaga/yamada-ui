import type { CSSProperties, UIProperties } from "."

type ShorthandProps = { [key in CSSProperties | UIProperties]?: string[] }

export const shorthandProps: ShorthandProps = {
  fontSize: ["text"],
  accentColor: ["accent"],
  caretColor: ["caret"],
  letterSpacing: ["tracking"],
  lineHeight: ["leading"],
  background: ["bg"],
  boxShadow: ["shadow"],
  backgroundColor: ["bgColor"],
  backgroundImage: ["bgImage", "bgImg", "bgGradient"],
  backgroundClip: ["bgClip"],
  backgroundSize: ["bgSize"],
  backgroundOrigin: ["bgOrigin"],
  backgroundPosition: ["bgPosition"],
  backgroundPositionX: ["bgPositionX", "bgPosX"],
  backgroundPositionY: ["bgPositionY", "bgPosY"],
  backgroundRepeat: ["bgRepeat"],
  backgroundAttachment: ["bgAttachment"],
  color: ["textColor"],
  width: ["w"],
  height: ["h"],
  minWidth: ["minW"],
  minHeight: ["minH"],
  maxWidth: ["maxW"],
  maxHeight: ["maxH"],
  mixBlendMode: ["blendMode"],
  backgroundBlendMode: ["bgBlendMode"],
  overscrollBehavior: ["overscroll"],
  overscrollBehaviorX: ["overscrollX"],
  overscrollBehaviorY: ["overscrollY"],
  flexDirection: ["flexDir"],
  textDecoration: ["textDecor"],
  margin: ["m"],
  marginTop: ["mt"],
  marginRight: ["mr"],
  marginInlineEnd: ["me", "marginEnd"],
  marginBottom: ["mb"],
  marginLeft: ["ml"],
  marginInlineStart: ["ms", "marginStart"],
  marginX: ["mx"],
  marginY: ["my"],
  padding: ["p"],
  paddingTop: ["pt"],
  paddingY: ["py"],
  paddingX: ["px"],
  paddingBottom: ["pb"],
  paddingLeft: ["pl"],
  paddingInlineStart: ["ps", "paddingStart"],
  paddingRight: ["pr"],
  paddingInlineEnd: ["pe", "paddingEnd"],
  gap: ["g"],
  columnGap: ["gx", "gapX"],
  rowGap: ["gy", "gapY"],
  position: ["pos"],
  zIndex: ["z"],
  insetInlineStart: ["insetStart"],
  insetInlineEnd: ["insetEnd"],
  listStylePosition: ["listStylePos"],
  listStyleImage: ["listStyleImg"],
  borderInlineStart: ["borderStart"],
  borderInlineStartWidth: ["borderStartWidth"],
  borderInlineStartStyle: ["borderStartStyle"],
  borderInlineStartColor: ["borderStartColor"],
  borderInlineEnd: ["borderEnd"],
  borderInlineEndWidth: ["borderEndWidth"],
  borderInlineEndStyle: ["borderEndStyle"],
  borderInlineEndColor: ["borderEndColor"],
  borderStartStartRadius: ["borderTopStartRadius", "roundedTopStart"],
  borderStartEndRadius: ["borderTopEndRadius", "roundedTopEnd"],
  borderEndStartRadius: ["borderBottomStartRadius", "roundedBottomStart"],
  borderEndEndRadius: ["borderBottomEndRadius", "roundedBottomEnd"],
  borderInlineStartRadius: ["borderStartRadius", "roundedStart"],
  borderInlineEndRadius: ["borderEndRadius", "roundedEnd"],
  borderRadius: ["rounded"],
  borderTopRightRadius: ["roundedTopRight"],
  borderTopLeftRadius: ["roundedTopLeft"],
  borderBottomLeftRadius: ["roundedBottomLeft"],
  borderBottomRightRadius: ["roundedBottomRight"],
  borderTopRadius: ["roundedTop"],
  borderBottomRadius: ["roundedBottom"],
  borderRightRadius: ["roundedRight"],
  borderLeftRadius: ["roundedLeft"],
}
