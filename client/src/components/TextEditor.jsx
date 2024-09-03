import { useSetRecoilState, useRecoilState, useRecoilValue } from "recoil";
import { showTextEditor, textEditorInput, collaborationStarted } from "../atoms";
import socket from "../socket";
import { useCallback, useEffect, useRef } from "react";

function TextEditor() {
  const setTextEditorFalse = useSetRecoilState(showTextEditor);
  // const text = useRecoilValue(textEditorInput);
  const [input, setInput] =  useRecoilState(textEditorInput)
  const hasCollaborationStarted = useRecoilValue(collaborationStarted);
  const isRendering = useRef(false);

  const removeTextEditor = useCallback(() => {
    setTextEditorFalse(false);
    if (!isRendering.current && hasCollaborationStarted) {
      socket.emit("close-text-editor");
    }
  }, [setTextEditorFalse, hasCollaborationStarted])

  const handleRemoveTextEditor = useCallback((rendering) => {
    isRendering.current = rendering;
    removeTextEditor();
  }, [removeTextEditor]);

  const handleTextEditorUpdate = useCallback((data) => {
    setInput(data);
  }, [setInput]);

  useEffect(() => {
    if (hasCollaborationStarted) {
      socket.on("close-text-editor", () => {
        handleRemoveTextEditor(true);
      });
  
      socket.on("text-updated", data => {
        handleTextEditorUpdate(data);
      });
  
      return () => {
        socket.off("close-text-editor", handleRemoveTextEditor);
      };
    }
  }, [handleRemoveTextEditor, handleTextEditorUpdate, hasCollaborationStarted]);

  function handleChange(event) {
    const value = event.target.value;
    setInput(value);
    if (hasCollaborationStarted) {
      socket.emit("text-updated", value);
    }
  }

  return (
    <div className="w-96 h-96 absolute absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
      <div className="bg-gray bg-slate-800 w-96 h-14 content-center rounded-t-2xl">
        <h1 className="font-sans text-white text-lg justify-center flex">
          Plan your drawing
        </h1>
        <h1
          className="font-sans text-white text-2xl justify-center absolute right-5 top-3 cursor-pointer hover:text-emerald-300"
          onClick={removeTextEditor}
        >
          ×
        </h1>
      </div>
      <textarea
        className="w-96 h-80 border rounded absolute focus:outline-none focus:ring-0 focus:border-transparent rounded-b-2xl p-2"
        placeholder="E.g. Make a painting with trees..."
        onChange={handleChange}
        value={input}
      ></textarea>
    </div>
  );
}

export default TextEditor;
