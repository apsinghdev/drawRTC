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

export const canvasState = atom({
  key: 'canvasState',
  default: ''
})

export const showMenuState = atom({
  key: "showMenu",
  default: false
})

export const showTextEditor = atom({
  key: "showTextEditor",
  default: false
})


export const textEditorInput = atom({
  key: "textEditorInput",
  default: ''
})

export const collaborationStarted = atom({
  key: "collaboraionstarted",
  default: false
})

export const showMsg = atom({
  key: "showMsg",
  default: false
})


export const roomIdAtom = atom({
  key: "roomIdAtom",
  default: null
})