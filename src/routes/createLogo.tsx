import { createFileRoute } from "@tanstack/react-router";

import { useState, useRef, useEffect } from "react";
import { ColorPicker, useColor } from "react-color-palette";

import { useForm } from "@tanstack/react-form";
import type { AnyFieldApi } from "@tanstack/react-form";
import { GoogleGenAI } from "@google/genai";
import "../App.css";

// eslint-disable-next-line
import "react-color-palette/css";

export const Route = createFileRoute("/createLogo")({
  component: CreateLogo,
});

function CreateLogo() {
  const [generatedImage, setGeneratedImage] = useState("");
  const [color, setColor] = useColor("#E84855");
  const [statePicker, setStatePicker] = useState({
    openState: false,
    selectPicker: 0,
  });
  const [loading, setLoading] = useState(false);
  const colorPickerRef = useRef<HTMLDivElement>(null);

  function FieldInfo({ field }: { field: AnyFieldApi }) {
    return (
      <>
        {field.state.meta.isTouched && !field.state.meta.isValid ? (
          <em>{field.state.meta.errors.join(", ")}</em>
        ) : null}
        {field.state.meta.isValidating ? "Validating..." : null}
      </>
    );
  }

  const form = useForm({
    defaultValues: {
      BrandName: "",
      Industry: "",
      Styles: "",
      Symbols: "",
      PrimaryColor: "#E84855",
      SecondaryColor: "#FF9B71",
    },
    onSubmit: async ({ value }) => {
      console.log(value);
      // Call generateImage with form values
      setLoading(true);
      try {
        const prompt = `Create Logo brand/company name is ${value.BrandName}, Industry type is ${value.Industry}, Logo style should be ${value.Styles}, use ${value.Symbols} as icon or symbol, Colour should be ${value.PrimaryColor} and ${value.SecondaryColor}`;

        const response = await genAI.models.generateContent({
          model: "gemini-2.5-flash-image-preview",
          contents: prompt,
        });

        const parts = response?.candidates?.[0]?.content?.parts;

        if (Array.isArray(parts)) {
          for (const part of parts) {
            if (part.inlineData) {
              const base64Image = part.inlineData.data;
              setGeneratedImage(`data:image/png;base64,${base64Image}`);
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
    },
  });

  useEffect(() => {
    if (statePicker.selectPicker === 1) {
      form.setFieldValue("PrimaryColor", color.hex);
    } else if (statePicker.selectPicker === 2) {
      form.setFieldValue("SecondaryColor", color.hex);
    }
  }, [color, form]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        colorPickerRef.current &&
        !colorPickerRef.current.contains(event.target as Node)
      ) {
        setStatePicker({
          selectPicker: 0,
          openState: false,
        });
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const genAI = new GoogleGenAI({
    apiKey: import.meta.env.VITE_API_KEY,
  });

  const validateColor = ({ value }: { value: string }) => {
    if (!value) {
      return "Color is required";
    }
    const hexRegex = /^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/;
    if (!hexRegex.test(value)) {
      return "Invalid color format. Please use a valid hex color (e.g., #RRGGBB or #RGB).";
    }
    return undefined;
  };

  return (
    <>
      <div className="flex items-center flex-col space-y-7 max-w-3xl m-auto mt-5 mb-5">
        <h1 className="text-7xl font-black font-display text-primary mb-1 text-center">
          LOGO VIBE
        </h1>
        <h2 className="text-4xl font-black font-display text-info mb-15 text-center">
          AI-powered logo generation
        </h2>
        <p className="text-center mb-20">
          Transform your brand vision into professional logos instantly. Just
          provide your company name, industry, preferred colors, and style
          preferences - our AI does the rest.
        </p>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            e.stopPropagation();
            form.handleSubmit();
          }}
          className="space-y-7 md:min-w-2xl m-auto"
        >
          <form.Field
            name="BrandName"
            validators={{
              onChange: ({ value }) =>
                !value
                  ? "Brand or Company name is required"
                  : value.length < 3
                    ? "Brand or Company name must be at least 3 characters"
                    : undefined,
              onChangeAsyncDebounceMs: 500,
              onChangeAsync: async ({ value }) => {
                await new Promise((resolve) => setTimeout(resolve, 1000));
                return (
                  value.includes("error") && 'No "error" allowed in brand name'
                );
              },
            }}
            children={(field) => (
              <>
                <div className="md:grid md:grid-cols-2 md:gap-2 md:items-center">
                  <label
                    htmlFor={field.name}
                    className="text-right w-full mr-3 mb-5 text-primary font-bold"
                  >
                    Brand or Company name
                  </label>
                  <input
                    type="text"
                    placeholder="Type here"
                    className="input border-2 w-full border-info rounded-sm text-gray-500 focus:outline-2 focus:outline-offset-2 focus:outline-primary"
                    id={field.name}
                    name={field.name}
                    value={field.state.value}
                    onBlur={field.handleBlur}
                    onChange={(e) => field.handleChange(e.target.value)}
                  />
                  <div className="col-span-2 text-right text-info">
                    <FieldInfo field={field} />
                  </div>
                </div>
              </>
            )}
          />
          <form.Field
            name="Industry"
            validators={{
              onChange: ({ value }) =>
                !value ? "Please select an industry" : undefined,
            }}
            children={(field) => (
              <>
                <div className="md:grid md:grid-cols-2 md:gap-2 md:items-centerr">
                  <label
                    htmlFor={field.name}
                    className="text-right w-full mr-3 text-primary font-bold"
                  >
                    Industry
                  </label>
                  <select
                    name={field.name}
                    id={field.name}
                    className="select border-2 w-full border-info rounded-sm text-gray-500 focus:outline-2 focus:outline-offset-2 focus:outline-primary"
                    value={field.state.value}
                    onChange={(e) => field.handleChange(e.target.value)}
                    onBlur={field.handleBlur}
                  >
                    <option value="">Select Industry</option>
                    <option value="technology">Technology</option>
                    <option value="ecommerce">E-commerce</option>
                    <option value="finance-accounting">
                      Finance & Accounting
                    </option>
                    <option value="health-wellness">Health & Wellness</option>
                    <option value="real-estate">Real Estate</option>
                    <option value="education">Education</option>
                    <option value="food-beverage">Food & Beverage</option>
                    <option value="fashion-beauty">Fashion & Beauty</option>
                    <option value="sports-fitness">Sports & Fitness</option>
                    <option value="travel-hospitality">
                      Travel & Hospitality
                    </option>
                    <option value="automotive">Automotive</option>
                    <option value="media-entertainment">
                      Media & Entertainment
                    </option>
                    <option value="marketing-advertising">
                      Marketing & Advertising
                    </option>
                    <option value="nonprofit-charity">
                      Non-Profit / Charity
                    </option>
                    <option value="legal-law">Legal & Law</option>
                    <option value="construction-architecture">
                      Construction & Architecture
                    </option>
                    <option value="art-design">Art & Design</option>
                    <option value="photography">Photography</option>
                    <option value="pet-animal-services">
                      Pet & Animal Services
                    </option>
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
                  <div className="col-span-2 text-right text-info">
                    <FieldInfo field={field} />
                  </div>
                </div>
              </>
            )}
          />
          <form.Field
            name="Styles"
            validators={{
              onChange: ({ value }) =>
                !value ? "Please select a logo style" : undefined,
            }}
            children={(field) => (
              <>
                <div className="md:grid md:grid-cols-2 md:gap-2 md:items-center">
                  <label
                    htmlFor={field.name}
                    className="text-right w-full mr-3 text-primary font-bold"
                  >
                    Style
                  </label>
                  <select
                    name={field.name}
                    id={field.name}
                    className="select border-2 w-full border-info rounded-sm text-gray-500 focus:outline-2 focus:outline-offset-2 focus:outline-primary"
                    value={field.state.value}
                    onChange={(e) => field.handleChange(e.target.value)}
                    onBlur={field.handleBlur}
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
                  <div className="col-span-2 text-right text-info">
                    <FieldInfo field={field} />
                  </div>
                </div>
              </>
            )}
          />

          <form.Field
            name="Symbols"
            validators={{
              onChange: ({ value }) =>
                !value
                  ? "Icon or Symbol is required"
                  : value.length < 3
                    ? "Icon or Symbol must be at least 3 characters"
                    : undefined,
            }}
            children={(field) => (
              <>
                <div className="md:grid md:grid-cols-2 md:gap-2 md:items-center">
                  <label
                    htmlFor={field.name}
                    className="text-right w-full mr-3 text-primary font-bold"
                  >
                    Icon or Symbol
                  </label>
                  <input
                    type="text"
                    id={field.name}
                    placeholder="Icon or Symbol Preferences"
                    className="input border-2 w-full border-info rounded-sm text-gray-500 focus:outline-2 focus:outline-offset-2 focus:outline-primary"
                    value={field.state.value}
                    onBlur={field.handleBlur}
                    onChange={(e) => field.handleChange(e.target.value)}
                  />
                  <div className="col-span-2 text-right text-info">
                    <FieldInfo field={field} />
                  </div>
                </div>
              </>
            )}
          />

          <div className="flex items-center">
            <form.Field
              name="PrimaryColor"
              validators={{
                onChange: validateColor,
              }}
              children={(field) => (
                <div className="flex w-full items-center">
                  <label className="text-right w-full mr-3 text-primary font-bold">
                    Colors
                  </label>
                  <div
                    style={{ backgroundColor: field.state.value }}
                    onClick={() =>
                      setStatePicker({
                        openState: !statePicker.openState,
                        selectPicker: 1,
                      })
                    }
                    className="btn w-3 h-9 rounded-full focus:outline-2 focus:outline-offset-2 focus:outline-primary"
                  ></div>
                  <FieldInfo field={field} />
                </div>
              )}
            />
            <form.Field
              name="SecondaryColor"
              validators={{
                onChange: validateColor,
              }}
              children={(field) => (
                <div className="flex w-full">
                  <div
                    style={{ backgroundColor: field.state.value }}
                    onClick={() =>
                      setStatePicker({
                        openState: !statePicker.openState,
                        selectPicker: 2,
                      })
                    }
                    className="btn w-3 h-9 rounded-full focus:outline-2 focus:outline-offset-2 focus:outline-primary"
                  ></div>
                  <FieldInfo field={field} />
                </div>
              )}
            />
          </div>

          <div ref={colorPickerRef}>
            {statePicker.openState && (
              <ColorPicker color={color} onChange={setColor} />
            )}
          </div>

          <div className="flex items-center justify-center mt-30">
            <form.Subscribe
              selector={(state) => [state.canSubmit, state.isSubmitting]}
              children={([canSubmit, isSubmitting]) => (
                <button
                  type="submit"
                  disabled={!canSubmit || loading || statePicker.openState}
                  className="btn p-4 btn-primary text-amber-100 rounded-sm"
                >
                  {loading || isSubmitting ? (
                    <div className="flex">
                      <span className="loading loading-spinner loading-xl mr-3"></span>
                      Generating image ....
                    </div>
                  ) : (
                    <h1 className="text-lg">Start Generating Your Logo</h1>
                  )}
                </button>
              )}
            />
          </div>
          <div>
            {generatedImage && (
              <div className="flex items-center justify-center mt-10">
                <img
                  src={generatedImage}
                  alt="Generated"
                  style={{ maxWidth: "100%" }}
                />
              </div>
            )}
          </div>
        </form>
      </div>
    </>
  );
}
