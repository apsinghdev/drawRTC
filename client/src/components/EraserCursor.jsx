import eraserSvg from "../assets/eraserSvg.svg"

function EraserCursor(){
    return(
        <div className="h-7 w-7 left-36 transform rotate-90 absolute">
            <img src={eraserSvg}></img>
        </div>
    )
}

export default EraserCursor;