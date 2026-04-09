// src/components/landing/MedEdSection.jsx

export default function MedEdSection() {
  const medEdFeatures = [
    {
      icon: "🎙️",
      title: "Real-time voice AI for clinicians",
      description:
        "Hands-free agents clinicians can query during ward rounds, clinics or post-op reviews—grounded in your CME content and internal guidelines.",
    },
    {
      icon: "🤖",
      title: "RAG-powered clinical assistants",
      description:
        "Disease- or program-specific assistants that answer questions strictly from your approved CME materials, slide decks, summaries and monographs.",
    },
    {
      icon: "🧩",
      title: "Interactive bedside modules",
      description:
        "Turn session insights into step-by-step decision flows that help clinicians apply what they learned to real patient scenarios.",
    },
    {
      icon: "🩺",
      title: "Structured symptom & triage tools",
      description:
        "Replace unstructured intake (emails, WhatsApp, vague notes) with guided flows that mirror the best practices you already teach.",
    },
  ];

  return (
    <section
      id="meded"
      className="bg-slate-50 border-y border-slate-200 py-16 sm:py-20"
    >
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        {/* Section header */}
        <div className="max-w-3xl">
          <span className="inline-flex items-center rounded-full bg-sky-100 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-sky-800">
            🎓 For CME, MedEd & conference teams
          </span>

          <h2 className="mt-4 text-3xl font-semibold tracking-tight text-slate-900 sm:text-4xl">
            Turn medical education into always-on point-of-care support
          </h2>

          <p className="mt-4 text-base text-slate-600 sm:text-lg">
            You already run high-impact programs at meetings like ASH and
            NACLC. MedGuide AI helps keep that impact alive after the session by
            turning static CME content into dynamic tools clinicians can use in
            real time—at the bedside, in clinic or on call.
          </p>
        </div>

        {/* Two-column content */}
        <div className="mt-10 grid gap-10 lg:grid-cols-2 lg:items-start">
          {/* Left column: narrative */}
          <div className="space-y-5 text-sm text-slate-600 sm:text-base">
            <h3 className="text-lg font-semibold text-slate-900 sm:text-xl">
              Bridge the gap between what&apos;s taught and what&apos;s used
            </h3>

            <p>
              Today, most CME lives in slide decks, replays and PDF summaries.
              Meanwhile, real decisions happen in the clinic, OT and ward—with
              limited tools to bring that education into the moment of care.
            </p>

            <p>
              MedGuide AI sits on top of your accredited content and internal
              pathways, so clinicians can ask natural-language questions and get
              clear, source-cited answers based only on the material you trust.
            </p>

            <ul className="space-y-3">
              <li className="flex gap-2">
                <span className="mt-1 text-sky-600">•</span>
                <span>
                  Reinforce session learning at the point of care instead of
                  hoping clinicians re-open a deck or replay.
                </span>
              </li>
              <li className="flex gap-2">
                <span className="mt-1 text-sky-600">•</span>
                <span>
                  Capture anonymised, aggregate insight into what clinicians
                  still ask about after the meeting.
                </span>
              </li>
              <li className="flex gap-2">
                <span className="mt-1 text-sky-600">•</span>
                <span>
                  Align bedside decisions with the same science and guidance
                  your faculty presented on stage.
                </span>
              </li>
            </ul>

            <div className="mt-6 flex flex-wrap gap-3">
              <a
                href="#contact"
                className="inline-flex items-center justify-center rounded-md border border-sky-600 bg-sky-600 px-4 py-2 text-sm font-semibold text-white shadow-sm transition hover:bg-sky-700"
              >
                Talk to us about MedEd use cases
              </a>
              <a
                href="#contact"
                className="inline-flex items-center justify-center rounded-md border border-slate-300 px-4 py-2 text-sm font-semibold text-slate-700 transition hover:border-slate-400 hover:bg-white/60"
              >
                Request a CME assistant demo
              </a>
            </div>
          </div>

          {/* Right column: feature grid */}
          <div className="grid gap-4 sm:grid-cols-2">
            {medEdFeatures.map((item) => (
              <div
                key={item.title}
                className="flex flex-col rounded-xl border border-slate-200 bg-white p-4 shadow-sm"
              >
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-sky-50 text-xl">
                  <span aria-hidden="true">{item.icon}</span>
                </div>
                <h4 className="mt-3 text-sm font-semibold text-slate-900 sm:text-base">
                  {item.title}
                </h4>
                <p className="mt-2 text-xs text-slate-600 sm:text-sm">
                  {item.description}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom hint about data / feedback loop */}
        <div className="mt-10 rounded-lg border border-dashed border-slate-300 bg-white/70 px-4 py-4 text-xs text-slate-600 sm:text-sm">
          <p>
            MedGuide AI can provide anonymised, aggregate analytics on what
            clinicians ask, which topics cause confusion and how your education
            is being used in practice—giving CME and MedEd teams a real feedback
            loop from the bedside back to content planning.
          </p>
        </div>
      </div>
    </section>
  );
}
