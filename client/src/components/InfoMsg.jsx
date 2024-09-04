const InfoMsg = (props) => {
    return (
        <div className="fixed top-4 left-1/2 transform -translate-x-1/2 inline-block max-w-lg max-h-40 overflow-auto p-3 m-2 max-w-full break-words rounded-xl bg-gradient-to-r from-slate-900 to-slate-700 absolute rounded-lg shadow-xl content-center animate-slide-in" >
            <h6 className="font-sans text-emerald-300 cursor-pointer justify-center flex absolute top-0 right-2 mb-1" onClick={props.clickHandler}>×</h6>
            <h6 className="font-sans text-white justify-center flex">{props.message}</h6>
        </div>
    )
}

export default InfoMsg;