import { useCallback, useState } from "react";
import ColourPicker from "@/components/ui/ColourPicker";

// import { GoogleGenerativeAI } from '@google/generative-ai'; // Assuming this is the package you're using (or similar; confirm via npm)
// import { GoogleGenAI } from "@google/genai";

import "./App.css";

const App = () => {
  // const [generatedImage, setGeneratedImage] = useState(null);
  const [statePicker, setStatePicker] = useState({
    openState: false,
    selectPicker: 0,
  });

  const [primaryColor, setPrimaryColor] = useState("#fff");
  const [secondaryColor, setSecondaryColor] = useState("#fff");

  // const [loading, setLoading] = useState(false);

  // const genAI = new GoogleGenAI({
  //   apiKey: "AIzaSyDoMVv2MdPr5iOip3UdK0oG46wSVUe8TZg",
  // });

  // const generateImage = async () => {
  //   setLoading(true);
  //   try {
  //     // const model = genAI.models.get({
  //     //   model: "gemini-2.5-flash-image-preview",
  //     // });

  //     const prompt =
  //       "Generate a vibrant image of a futuristic cityscape at sunset with flying cars and neon lights."; // Replace with your desired prompt

  //     //const result = await model.generateContent(prompt);

  //     const response = await genAI.models.generateContent({
  //       model: "gemini-2.5-flash-image-preview",
  //       contents: prompt,
  //     });

  //     //const response = await result.response;

  //     const parts = response.candidates[0].content.parts;

  //     return;
  //     for (const part of parts) {
  //       if (part.inlineData) {
  //         // Extract base64 image data
  //         const base64Image = part.inlineData.data;
  //         setGeneratedImage(`data:image/png;base64,${base64Image}`); // For display in <img>
  //         // Optionally, save to file: const link = document.createElement('a'); link.href = base64ImageUrl; link.download = 'generated-image.png'; link.click();
  //         break;
  //       }
  //     }

  //     if (!generatedImage) {
  //       console.log("No image generated; check response:", response);
  //     }
  //   } catch (error) {
  //     console.error("Error generating image:", error);
  //   } finally {
  //     setLoading(false);
  //   }
  // };

  const updateColor = useCallback(
    (c: string) => {
      if (statePicker.selectPicker === 1) {
        setPrimaryColor(c);
      } else if (statePicker.selectPicker === 2) {
        setSecondaryColor(c);
      }
    },
    [statePicker.selectPicker]
  );

  // to do

  // const updateColor = useCallback(
  //   (c) => {
  //     const key =
  //       statePicker.selectPicker === 1
  //         ? "primaryColor"
  //         : statePicker.selectPicker === 2
  //         ? "secondaryColor"
  //         : null;

  //     if (key) {
  //       setColors((prev) => ({
  //         ...prev,
  //         [key]: c,
  //       }));
  //     }
  //   },
  //   [statePicker.selectPicker]
  // );

  return (
    <>
      <button
        onClick={() =>
          setStatePicker({ openState: !statePicker.openState, selectPicker: 1 })
        }
        className="text-white"
      >
        Select Primary Color
      </button>

      <button
        onClick={() =>
          setStatePicker({ openState: !statePicker.openState, selectPicker: 2 })
        }
        className="text-white"
      >
        Select Secondary Color
      </button>

      {primaryColor}
      {secondaryColor}
      {statePicker.openState && (
        <ColourPicker
          setStatePicker={setStatePicker}
          onChange={(v: string | number | number[]) => {
            updateColor(v as string);
          }}
        />

        //     /* <button onClick={generateImage} className="text-red">
        //   Generate Image
        // </button>
        // <h1 className="text-xl">XYZ-Logo</h1>
        // {loading && <p>Generating image...</p>} */

        //     {/* <ColorPicker className="max-w-sm rounded-md border bg-background p-4 shadow-sm">
        //       <ColorPickerSelection />
        //       <div className="flex items-center gap-4">
        //         <ColorPickerEyeDropper />
        //         <div className="grid w-full gap-1">
        //           <ColorPickerHue />
        //           <ColorPickerAlpha />
        //         </div>
        //       </div>
        //       <div className="flex items-center gap-2">
        //         <ColorPickerOutput />
        //         <ColorPickerFormat getValue={getValue} />
        //       </div>
        //     </ColorPicker> */}
      )}
      {/* {generatedImage && (
        <img
          src={generatedImage}
          alt="Generated"
          style={{ maxWidth: "100%" }}
        />
      )} */}
    </>
  );
};

export default App;
