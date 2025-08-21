type Props = {
  className?: string;
  student: {
    first_name: string;
    last_name: string;
    g_number: string;
    class_of: string;
    counselor: string;
    support_level: string;
    incentive: string;
  };
};

export default function Content1({ className = "", student }: Props) {
  return (
    <section
      className={`rounded-3xl overflow-hidden shadow-sm bg-[var(--content1-bg)] ${className}`}
    >
      <div className="p-5 sm:p-6 lg:p-8 space-y-5">
        <div className="flex items-start gap-4">
          <div className="w-14 h-14 shrink-0 rounded-2xl bg-[#FDD675] grid place-items-center ring-1 ring-black/10">
            <span className="text-2xl">😊</span>
          </div>

          <div className="flex-1">
            <p className="text-sm text-black">Welcome back</p>
            <h1 className="text-2xl font-semibold tracking-tight text-neutral-900">
              {student.first_name} {student.last_name}
            </h1>
            <p className="text-sm text-black">
              Student ID • {student.g_number} • Class of {student.class_of}
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <p className="text-sm text-black">Assigned counselor</p>
            <p className="text-lg font-bold text-black">{student.counselor}</p>

            <div className="mt-3 flex items-center gap-3">
              <span className="inline-flex items-center rounded-full bg-amber-300/30 px-3 py-1 text-sm text-amber-800 ring-1 ring-amber-300/50">
                {student.support_level}
              </span>
              <span className="text-sm underline text-neutral-600">
                What does this mean?
              </span>
            </div>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <span className="text-sm text-black">Incentive Choice:</span>
          <span className="inline-flex items-center rounded-full bg-[#D8D6CF] px-3 py-1 text-sm text-black">
            {student.incentive}
          </span>
        </div>
      </div>
    </section>
  );
}
