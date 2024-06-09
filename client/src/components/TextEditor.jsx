import { useSetRecoilState } from "recoil";
import { showTextEditor } from "../atoms";

function TextEditor() {
  const setTextEditorFalse = useSetRecoilState(showTextEditor);

  function removeTextEditor() {
    setTextEditorFalse(false);
  }

  return (
    <div className="w-96 h-96 absolute shadow rounded absolute">
      <div className="bg-gray bg-slate-800 w-96 h-14 content-center">
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
        className="w-96 h-80 border rounded absolute focus:outline-none focus:ring-0 focus:border-transparent"
        placeholder="E.g. Make a painting with trees..."
      ></textarea>
    </div>
  );
}

export default TextEditor;
