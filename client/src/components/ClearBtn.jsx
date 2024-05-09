function ClearBtn(){
    return (
      <div className="border block flex items-center justify-center mt-5">
        <button
          type="button"
          className="text-white bg-gradient-to-r from-red-400 via-red-500 to-red-600 hover:bg-gradient-to-br font-medium rounded-lg text-sm px-5 py-2.5 text-center"
        >
          Clear
        </button>
      </div>
    );
}

export default ClearBtn;