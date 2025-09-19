import React, { useRef, useEffect } from "react";
import {
  ColorPicker,
  ColorPickerAlpha,
  ColorPickerEyeDropper,
  ColorPickerFormat,
  ColorPickerHue,
  ColorPickerOutput,
  ColorPickerSelection,
} from "@/components/ui/shadcn-io/color-picker";

type ColourPickerPropType = {
  onChange: (value: string | number | number[]) => void;
  setStatePicker: React.Dispatch<
    React.SetStateAction<{
      selectPicker: number;
      openState: boolean;
    }>
  >;
};
export default function ColourPicker({
  onChange,
  setStatePicker,
}: ColourPickerPropType) {
  const colorPickerRef = useRef<HTMLDivElement>(null);

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

  return (
    <div className="h-100" ref={colorPickerRef}>
      <ColorPicker className="max-w-sm rounded-md border bg-background p-4 shadow-sm">
        <ColorPickerSelection />
        <div className="flex items-center gap-4">
          <ColorPickerEyeDropper />
          <div className="grid w-full gap-1">
            <ColorPickerHue />
            <ColorPickerAlpha />
          </div>
        </div>
        <div className="flex items-center gap-2">
          <ColorPickerOutput />
          <ColorPickerFormat onChange={onChange} className="" />
        </div>
      </ColorPicker>
    </div>
  );
}
