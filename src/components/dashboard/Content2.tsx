type Props = { className?: string };

export default function Content2({ className = "" }: Props) {
  return (
    <aside
      className={`rounded-3xl overflow-hidden shadow-sm bg-[var(--content2-bg)]/90 backdrop-blur ${className}`}
    >
      <div className="p-5 sm:p-6 lg:p-8 space-y-5">
        <h3 className="font-semibold text-white">Important Dates</h3>

        <div className="bg-white rounded-2xl p-4 flex items-center justify-between">
          <div className="space-y-1">
            <p className="font-medium text-gray-900"></p>
            <p className="text-sm text-gray-500"></p>
          </div>
          <div className="flex items-center gap-3">
            <span className="text-xs bg-yellow-100 text-yellow-700 px-3 py-1 rounded-full">
            </span>
            <span className="text-sm text-gray-500"></span>
            <button className="bg-gray-100 hover:bg-gray-200 px-3 py-1 rounded-full text-sm">
            </button>
          </div>
        </div>

        <div className="bg-[#FDD06E] rounded-2xl p-4 flex items-center justify-between">
          <div className="space-y-1">
            <p className="font-medium text-gray-900"></p>
            <p className="text-sm text-gray-700"></p>
          </div>
          <div className="flex items-center gap-3">
          </div>
        </div>
      </div>
    </aside>
  );
}
