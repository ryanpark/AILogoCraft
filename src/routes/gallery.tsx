import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/gallery")({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <div className="flex justify-center mt-10 text-primary">
      Get Ready! Submit Your Logo for This Page
    </div>
  );
}
