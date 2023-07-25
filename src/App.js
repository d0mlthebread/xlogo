import React, { useState, useRef } from "react";
import "./custom-font.css"
import "./index.css"
import logo from "./x_logo.png";

function App() {
  const [character, setCharacter] = useState("A");
  const [fontSize, setFontSize] = useState(96);
  const [canvasWidth, setCanvasWidth] = useState(200);
  const [canvasHeight, setCanvasHeight] = useState(200);
  const svgRef = useRef(null);

  const handleInputChange = (event) => {
    setCharacter(event.target.value.trim().charAt(0));
  };

  const handleFontSizeChange = (event) => {
    setFontSize(Number(event.target.value));
  };

  const handleCanvasWidthChange = (event) => {
    setCanvasWidth(Number(event.target.value));
    setFontSize(Number(event.target.value * 0.8));
  };

  const handleCanvasHeightChange = (event) => {
    setCanvasHeight(Number(event.target.value));
  };

  const generateImage = () => {
    if (!character) {
      alert("Please enter a character.");
      return;
    }
    const canvas = document.createElement("canvas");
    canvas.width = canvasWidth;
    canvas.height = canvasWidth;

    const ctx = canvas.getContext("2d");
    ctx.fillStyle = "#000";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = "#eff3f4";
    ctx.font = `${fontSize}px CustomFont`;
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.fillText(character, canvas.width / 2, canvas.width / 2.66);



    const imageURI = canvas.toDataURL("image/png");
    const link = document.createElement("a");
    link.href = imageURI;
    link.download = `${character}_logo_image.png`;
    link.click();
  };

  const handleDownloadSvg = () => {
    const svgContent = `
      <svg width="${canvasWidth}" height="${canvasWidth}" xmlns="http://www.w3.org/2000/svg">
        <rect width="100%" height="100%" fill="#000"/>
        <text x="50%" y="50%" font-family="CustomFont" font-size="${fontSize}" fill="#eff3f4" text-anchor="middle" dominant-baseline="middle">${character}</text>
      </svg>
    `;

    const svgBlob = new Blob([svgContent], { type: "image/svg+xml" });
    const svgURL = URL.createObjectURL(svgBlob);

    const link = document.createElement("a");
    link.href = svgURL;
    link.download = `${character}_logo_image.svg`;
    link.click();

    URL.revokeObjectURL(svgURL);
  };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        height: "100vh",
        background: "#000",
        margin: 0,
      }}
      className="overflow-hidden"
    >
      <h1 className="text-center text-white absolute top-0 text-2xl">Generate your new profile pic to please our master <a href="https://twitter.com/elonmusk" target="_blank" className="hover:text-blue-600">@elonmusk</a></h1>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "#000",
          color: "#eff3f4",
          fontSize: `${canvasWidth * 0.8}px`,
          width: `${canvasWidth}px`,
          height: `${canvasWidth}px`,
          border: "1px solid #fff",
          fontFamily: "CustomFont",
        }}
        className="pt-6"
      >
        {character}
      </div>
      <div className="bg-gray-600 absolute z-10 bottom-8 w-[320px]  p-10">
        <input
          type="text"
          onChange={handleInputChange}
          placeholder="Enter character"
          className="px-4 w-full h-10 uppercase mb-4"
        />
        {/*
      <input
        type="range"
        min="50"
        max="1000"
        value={fontSize}
        onChange={handleFontSizeChange}
      /> */}

        <label className="block text-sm font-medium text-gray-900 dark:text-white mb-4">
          Size: {canvasWidth}px
          <input
            type="range"
            min="200"
            max="1000"
            value={canvasWidth}
            onChange={handleCanvasWidthChange}
            className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer dark:bg-gray-700"
          />
        </label>
        <button
          className="inline-flex items-center rounded-md bg-white/10 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-white/20 "
          onClick={generateImage}
        >
          Generate Image (PNG)
        </button>
        <a href="https://twitter.com/xlogonow" className="absolute bottom-0 right-0">
          <img
            src={logo}
            alt="X Logo"
            className="w-8 h-8 hover:w-10 hover:h-10 transition-all"
            target="_blank"
          />
        </a>
      </div>
      {/* <button onClick={handleDownloadSvg}>Download Image (SVG)</button> */}
      <div style={{ display: "none" }}>
        <div ref={svgRef}>
          <svg
            width={canvasWidth}
            height={canvasHeight}
            xmlns="http://www.w3.org/2000/svg"
          >
            <rect width="100%" height="100%" fill="#000" />
            <text
              x="50%"
              y="50%"
              fontFamily="CustomFont"
              fontSize={`${fontSize}`}
              fill="#fff"
              textAnchor="middle"
              dominantBaseline="middle"
            >
              {character}
            </text>
          </svg>
        </div>
      </div>
      <div className="w-full absolute bottom-0 p-8"></div>
    </div>
  );
}

export default App;
