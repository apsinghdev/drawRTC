import { useSetRecoilState, useRecoilValue, useRecoilState } from "recoil";
import { showTextEditor, docState, textState, textEditorInput } from "../atoms";

function TextEditor() {
  const setTextEditorFalse = useSetRecoilState(showTextEditor);
  const doc = useRecoilValue(docState);
  const text = useRecoilValue(textState);
  const [input, setInput] =  useRecoilState(textEditorInput)

  function removeTextEditor() {
    setTextEditorFalse(false);
  }

  function handleChange(event) {
    setInput(event.target.value);
    if(!doc) return;
    const newText = input;
    const yText = doc.getText("text");
    yText.delete(0, yText.length);
    yText.insert(0, newText);
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
        value={text}
      ></textarea>
    </div>
  );
}

export default TextEditor;
