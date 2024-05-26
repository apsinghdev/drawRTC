import { atom} from "recoil";

export const eraserState = atom({
    key: "eraser",
    default: false
});

export const cursorPosition = atom({
    key: "cursor-position",
    default: {x: 0, y: 0}
})

export const canvasColors = atom({
  key: "canvasColor",
  default: "#D2B55B",
});