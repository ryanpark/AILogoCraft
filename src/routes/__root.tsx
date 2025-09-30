import { createRootRoute, Link, Outlet } from "@tanstack/react-router";

const RootLayout = () => (
  <>
    <div className="p-2 flex gap-2">
      <Link to="/" className="[&.active]:font-bold">
        <img src="logo.svg" />
      </Link>{" "}
    </div>
    <Outlet />
  </>
);
export const Route = createRootRoute({ component: RootLayout });
