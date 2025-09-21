import { useState, useRef, useEffect } from "react";
import { ColorPicker, useColor } from "react-color-palette";
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import "react-color-palette/css";

import { GoogleGenAI } from "@google/genai";

import "./App.css";

const App = () => {
  const [generatedImage, setGeneratedImage] = useState("");
  const [color, setColor] = useColor("#561ecb");
  const [statePicker, setStatePicker] = useState({
    openState: false,
    selectPicker: 0,
  });
  const [name, setName] = useState("");
  const [symbol, setSymbol] = useState("");
  const [industry, setIndustry] = useState("");
  const [loading, setLoading] = useState(false);
  const [style, setStyle] = useState("");
  const colorPickerRef = useRef<HTMLDivElement>(null);

  const [primaryColor, setPrimaryColor] = useState("#D7C0D0");
  const [secondaryColor, setSecondaryColor] = useState("#EFF0D1");

  useEffect(() => {
    if (statePicker.selectPicker === 1) {
      setPrimaryColor(color.hex);
    } else if (statePicker.selectPicker === 2) {
      setSecondaryColor(color.hex);
    }
  }, [color]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        colorPickerRef.current &&
        !colorPickerRef.current.contains(event.target as Node)
      ) {
        setStatePicker(() => ({
          selectPicker: 0,
          openState: false,
        }));
      }
    };

    // Add event listener for mousedown
    document.addEventListener("mousedown", handleClickOutside);

    // Cleanup event listener on component unmount
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [setStatePicker]);

  const genAI = new GoogleGenAI({
    apiKey: import.meta.env.VITE_API_KEY,
  });

  const generateImage = async () => {
    setLoading(true);
    try {
      // const model = genAI.models.get({
      //   model: "gemini-2.5-flash-image-preview",
      // });

      const prompt = `Create Logo brand/comapny name is ${name},
        Industry type is ${industry}, // Replace with your desired prompt
        Logo style should be ${style}, use ${symbol} as icon or symbol
        Colour should be  ${primaryColor} and ${secondaryColor}
        `;

      //const result = await model.generateContent(prompt);

      const response = await genAI.models.generateContent({
        model: "gemini-2.5-flash-image-preview",
        contents: prompt,
      });

      // const response = await result.response;

      const parts = response?.candidates?.[0]?.content?.parts;

      if (Array.isArray(parts)) {
        for (const part of parts) {
          if (part.inlineData) {
            // Extract base64 image data
            const base64Image = part.inlineData.data;
            setGeneratedImage(`data:image/png;base64,${base64Image}`); // For display in <img>
            // Optionally, save to file: const link = document.createElement('a'); link.href = base64ImageUrl; link.download = 'generated-image.png'; link.click();
            break;
          }
        }
      }

      if (!generatedImage) {
        console.log("No image generated; check response:", response);
      }
    } catch (error) {
      console.error("Error generating image:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div className="flex items-center flex-col space-y-7 max-w-3xl m-auto mt-5 mb-5">
        <h1 className="text-4xl">AI LogoCraft</h1>
        <h2 className="text-3xl">Create stunning logos with AI precision</h2>
        {generatedImage && (
          <img
            src={generatedImage}
            alt="Generated"
            style={{ maxWidth: "100%" }}
          />
        )}
      </div>
      <div className="flex items-center flex-col space-y-7 max-w-3xl m-auto bg-base-100 rounded-md border-1 p-10">
        <p className="text-left">Brand or Company name</p>
        <input
          type="text"
          placeholder="Type here"
          className="input border-2"
          id="name"
          onChange={(val) => setName(val.target.value)}
        />
        <p className="text-left">Industry</p>
        <select
          name="industry"
          defaultValue="Pick a industry"
          className="select border-2"
          id="industry"
          onChange={(e) => setIndustry(e.target.value)}
        >
          <option value="">Select Industry</option>
          <option value="technology">Technology</option>
          <option value="ecommerce">E-commerce</option>
          <option value="finance-accounting">Finance & Accounting</option>
          <option value="health-wellness">Health & Wellness</option>
          <option value="real-estate">Real Estate</option>
          <option value="education">Education</option>
          <option value="food-beverage">Food & Beverage</option>
          <option value="fashion-beauty">Fashion & Beauty</option>
          <option value="sports-fitness">Sports & Fitness</option>
          <option value="travel-hospitality">Travel & Hospitality</option>
          <option value="automotive">Automotive</option>
          <option value="media-entertainment">Media & Entertainment</option>
          <option value="marketing-advertising">Marketing & Advertising</option>
          <option value="nonprofit-charity">Non-Profit / Charity</option>
          <option value="legal-law">Legal & Law</option>
          <option value="construction-architecture">
            Construction & Architecture
          </option>
          <option value="art-design">Art & Design</option>
          <option value="photography">Photography</option>
          <option value="pet-animal-services">Pet & Animal Services</option>
          <option value="gaming">Gaming</option>
          <option value="event-planning">Event Planning</option>
          <option value="home-services">Home Services</option>
          <option value="consulting">Consulting</option>
          <option value="logistics-transportation">
            Logistics & Transportation
          </option>
          <option value="agriculture">Agriculture</option>
          <option value="energy-utilities">Energy & Utilities</option>
          <option value="government-public-sector">
            Government & Public Sector
          </option>
          <option value="human-resources">Human Resources</option>
          <option value="retail">Retail</option>
          <option value="craft-handmade">Craft & Handmade</option>
        </select>
        <p className="text-left">Style</p>
        <select
          name="logoStyle"
          id="logoStyle"
          className="select border-2"
          onChange={(e) => setStyle(e.target.value)}
        >
          <option value="">Select Logo Style</option>
          <option value="minimalist">Minimalist</option>
          <option value="modern">Modern</option>
          <option value="classic">Classic / Vintage</option>
          <option value="elegant">Elegant / Luxury</option>
          <option value="bold">Bold / Strong</option>
          <option value="playful">Playful / Fun</option>
          <option value="abstract">Abstract</option>
          <option value="typography">Typography-Based</option>
          <option value="emblem">Emblem / Badge</option>
          <option value="handwritten">Handwritten / Script</option>
        </select>
        <p className="text-left">Icon or Symbol</p>
        <input
          type="text"
          id="symbol"
          placeholder="Icon or Symbol Preferences"
          className="input border-4"
          onChange={(val) => setSymbol(val.target.value)}
        />
        <p className="text-left">Colours</p>
        <div ref={colorPickerRef}>
          {statePicker.openState && (
            <ColorPicker color={color} onChange={setColor} />
          )}
        </div>
        <p>Primary Color</p>
        <button
          style={{ backgroundColor: primaryColor }}
          onClick={() =>
            setStatePicker({
              openState: !statePicker.openState,
              selectPicker: 1,
            })
          }
          // className={`btn bg-[#50d71e]`}
          className="btn w-3 rounded-3"
        ></button>
        <p>Secondary Color</p>
        <button
          style={{ backgroundColor: secondaryColor }}
          onClick={() =>
            setStatePicker({
              openState: !statePicker.openState,
              selectPicker: 2,
            })
          }
          className="btn w-3 rounded-3"
        ></button>
        <button className="btn p-8 btn-primary" onClick={generateImage}>
          {loading && <p>Generating image...</p>}{" "}
          <h1 className="text-xl">Start Generating Your Logo</h1>
        </button>
        {name} ,{primaryColor} ,{secondaryColor} ,{industry} ,{symbol} ,
      </div>
    </>
  );
};

export default App;
