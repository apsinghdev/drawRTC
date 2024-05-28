import MenuItem from "./MenuItem";
import Socials from "./Socials";
import SponsorBtn from "./SponsorBtn";
import { useRecoilValue } from "recoil";
import { canvasState, canvasColors } from "../atoms";
import { jsPDF } from "jspdf";

function Menu(){
  const canvas = useRecoilValue(canvasState);
  const canvasColor = useRecoilValue(canvasColors);

  // function to save canvas as pdf
  function saveAsPdf() {
    const canvasDataURL = canvas.toDataURL("image/png");
    const pdf = new jsPDF({
      orientation: "landscape",
      unit: "px",
      format: [canvas.width, canvas.height],
    });
    pdf.setFillColor(canvasColor);
    pdf.rect(0, 0, canvas.width, canvas.height, "F");
    pdf.addImage(canvasDataURL, "PNG", 0, 0, canvas.width, canvas.height);
    pdf.save("drawing.pdf");
  }

  // function to save canvas as pdf
  function saveAsPng() {

    // create a temporary canvas to make a png
    const tempCanvas = document.createElement('canvas');
    const tempCanvasCtx = tempCanvas.getContext('2d');

    tempCanvas.width = canvas.width;
    tempCanvas.height = canvas.height;

    tempCanvasCtx.fillStyle = canvasColor;
    tempCanvasCtx.fillRect(0, 0, tempCanvas.width, tempCanvas.height);
    tempCanvasCtx.drawImage(canvas, 0, 0);


    const canvasDataURL = tempCanvas.toDataURL("image/png");
    const link = document.createElement("a");
    link.href = canvasDataURL;
    link.download = "drawing.png";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }

  return (
    <div className="w-52 h-71 rounded-xl bg-gradient-to-r from-slate-900 to-slate-700 absolute left-52 top-8 rounded-lg shadow-xl">
      <MenuItem feat="Start Collaboration"></MenuItem>
      <MenuItem feat="Start Chat"></MenuItem>
      <MenuItem feat="Save as pdf" clickHandler={saveAsPdf}></MenuItem>
      <MenuItem feat="Save as png" clickHandler={saveAsPng}></MenuItem>
      <SponsorBtn></SponsorBtn>
      <Socials></Socials>
    </div>
  );
}

export default Menu;