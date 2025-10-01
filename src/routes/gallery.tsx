import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/gallery")({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <div className="flex justify-center flex-col mt-10 text-primary max-w-3xl m-auto">
      <h1 className="text-4xl font-black font-display text-info mb-15 text-center">
        Submit Your Logo for This Page
      </h1>

      <img src="aa.png" alt="Gallery" />
      <img src="dd.png" alt="Gallery" />
      <img src="dda.png" alt="Gallery" />
      <img src="fasf.png" alt="Gallery" />
      <img src="monkey.png" alt="Gallery" />
      <img src="sd.png" alt="Gallery" />
    </div>
  );
}
