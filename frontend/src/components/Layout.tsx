import { BarChart3, BrainCircuit, GraduationCap, Search } from "lucide-react";
import { NavLink, Outlet } from "react-router-dom";

const links = [
  { to: "/", label: "Explore", icon: Search },
  { to: "/compare", label: "Compare", icon: BarChart3 },
  { to: "/predictor", label: "Predictor", icon: BrainCircuit }
];

export default function Layout() {
  return (
    <div className="min-h-screen">
      <header className="border-b border-slate-200 bg-white/90 backdrop-blur">
        <div className="mx-auto flex max-w-7xl flex-col gap-4 px-4 py-4 sm:flex-row sm:items-center sm:justify-between lg:px-8">
          <NavLink to="/" className="flex items-center gap-3">
            <span className="grid h-11 w-11 place-items-center rounded-lg bg-ink text-white">
              <GraduationCap size={24} aria-hidden="true" />
            </span>
            <span>
              <span className="block text-lg font-semibold tracking-normal">College Compass</span>
              <span className="block text-sm text-slate-500">Discover, compare, decide</span>
            </span>
          </NavLink>
          <nav className="flex gap-2 overflow-x-auto">
            {links.map((link) => {
              const Icon = link.icon;
              return (
                <NavLink
                  key={link.to}
                  to={link.to}
                  className={({ isActive }) =>
                    `flex min-h-10 items-center gap-2 rounded-lg px-3 text-sm font-medium transition ${
                      isActive ? "bg-moss text-white" : "text-slate-600 hover:bg-slate-100"
                    }`
                  }
                >
                  <Icon size={17} aria-hidden="true" />
                  {link.label}
                </NavLink>
              );
            })}
          </nav>
        </div>
      </header>
      <main className="mx-auto max-w-7xl px-4 py-6 lg:px-8">
        <Outlet />
      </main>
    </div>
  );
}
