import { createFileRoute } from "@tanstack/react-router";
import { Link } from "@tanstack/react-router";

const App = () => {
  return (
    <>
      <div className="flex items-center flex-col space-y-7 max-w-3xl m-auto mt-5 mb-5">
        <h1 className="text-7xl font-black font-display text-primary mb-1 text-center">
          LOGO VIBE
        </h1>
        <h2 className="text-4xl font-black font-display text-info mb-15 text-center">
          AI-powered logo generation
        </h2>
        <p className="text-center">
          Transform your brand vision into professional logos instantly. Just
          provide your company name, industry, preferred colors, and style
          preferences - our AI does the rest.
        </p>
        <div className="flex mr-2 gap-5 mb-15 mt-15">
          <button className="btn btn-primary rounded-sm">
            <Link
              to="/createLogo"
              className="[&.active]:font-bold text-amber-50"
            >
              Start Creating Logo
            </Link>
          </button>
          <button className="btn border-1 border-info text-info rounded-sm">
            <Link to="/gallery" className="[&.active]:font-bold">
              View Example
            </Link>
          </button>
        </div>
        <div className="mb-10">
          <img src="logo.svg" width="80" />
        </div>
        <h2 className="text-4xl font-black font-display text-info mb-2">
          How it works
        </h2>
        <p className="text-center">
          Create professional logos in four simple steps. No design experience
          required.
        </p>
        <div className="grid grid-cols-2 gap-4 mt-10">
          <div className="p-4 border-2 border-[#E3D403] rounded-sm">
            <div className="text-accent font-bold">01</div>{" "}
            <p className="font-bold">Enter Your Details</p>
            <p>
              Provide your company name, industry type, and brand description to
              get started.
            </p>
          </div>
          <div className="p-4 border-2 border-[#E3D403] rounded-sm">
            <div className="text-accent font-bold">02</div>{" "}
            <p className="font-bold">Choose Your Style</p>
            <p>
              Select preferred colors, design styles, and icon types that match
              your vision
            </p>
          </div>
          <div className="p-4 border-2 border-[#E3D403] rounded-sm">
            <div className="text-accent font-bold">03</div>{" "}
            <p className="font-bold">AI Generation</p>
            <p>
              Our AI creates multiple unique logo variations based on your
              specifications
            </p>
          </div>
          <div className="p-4 border-2 border-[#E3D403] rounded-sm">
            <div className="text-accent font-bold">04</div>{" "}
            <p className="font-bold">Download & Use</p>
            <p>
              Choose your favorite design and download in multiple high-quality
              formats.
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export const Route = createFileRoute("/")({
  component: App,
});
