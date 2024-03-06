function App() {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "700px",
        width: "100%",
      }}
    >
      <canvas
        style={{
          height: "70vh",
          width: "70vh",
          border: "0.5px solid black",
          boxShadow: "0 0 5px #000",
        }}
      ></canvas>
    </div>
  );
}

export default App;
