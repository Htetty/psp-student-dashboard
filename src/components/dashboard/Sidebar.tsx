import { HomeIcon, CalendarIcon, ChartBarIcon, Cog6ToothIcon } from "@heroicons/react/24/outline";

const NavButton = ({
  children,
  active = false,
}: {
  children: React.ReactNode;
  active?: boolean;
}) => (
  <button
    className={[
      "w-14 h-14 lg:w-16 lg:h-16 rounded-2xl flex items-center justify-center transition",
      active ? "bg-neutral-900 text-white" : "bg-neutral-100 text-neutral-500 hover:bg-neutral-200",
    ].join(" ")}
    aria-current={active ? "page" : undefined}
  >
    <div className="flex items-center justify-center">{children}</div>
  </button>
);

export default function Sidebar() {
  return (
    <aside className="w-20 lg:w-24 h-full bg-white rounded-r-[2rem] shadow-lg flex flex-col items-center py-6 px-4">
      <nav className="flex flex-col gap-4">
        <NavButton> <img src="/images/SkylineLogo.png" alt="Custom icon" className="w-10 h-10 lg:w-15 lg:h-15 object-contain" /> </NavButton>
        <NavButton active><HomeIcon className="w-6 h-6 lg:w-7 lg:h-7" /></NavButton>
        <NavButton><CalendarIcon className="w-6 h-6 lg:w-7 lg:h-7" /></NavButton>
        <NavButton><ChartBarIcon className="w-6 h-6 lg:w-7 lg:h-7" /></NavButton>
        <NavButton><Cog6ToothIcon className="w-6 h-6 lg:w-7 lg:h-7" /></NavButton>
      </nav>

      <div className="mt-auto" />

      <div className="w-12 h-12 lg:w-14 lg:h-14 rounded-full bg-neutral-300" />
    </aside>
  );
}
