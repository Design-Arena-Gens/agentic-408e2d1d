import Sidebar from "@/app/components/Sidebar";

const mockMetrics = [
  { title: "Active Users", value: "18.4k", delta: "+8.2%", description: "Past 24 hours" },
  { title: "New Signups", value: "1.2k", delta: "+3.9%", description: "Marketing funnel" },
  { title: "Team Velocity", value: "92%", delta: "+6.1%", description: "Sprint analytics" }
];

const mockTimeline = [
  {
    title: "Handoff: Design system 2.0",
    timestamp: "Today · 4:30 PM",
    description: "Assets pushed to shared library",
    pill: "Design"
  },
  {
    title: "Sprint Retrospective",
    timestamp: "Tomorrow · 11:00 AM",
    description: "Review the AI co-pilot beta",
    pill: "Product"
  },
  {
    title: "Launch: Growth Experiment",
    timestamp: "Fri · 9:00 AM",
    description: "Rollout to 5% of orgs",
    pill: "Growth"
  }
];

export default function Home() {
  return (
    <div className="page">
      <Sidebar />
      <main className="content">
        <header className="content__header">
          <div>
            <span className="eyebrow">Control Center</span>
            <h1>Command your workspace</h1>
            <p>
              Stay focused with an adaptive system that tunes itself to your team&apos;s rhythm.
              Everything you need is staged within one immersive canvas.
            </p>
          </div>
          <div className="header__actions">
            <button className="ghost">Schedule sync</button>
            <button className="primary">Create pulse</button>
          </div>
        </header>

        <section className="panel metrics">
          {mockMetrics.map((metric) => (
            <article key={metric.title}>
              <header>
                <span>{metric.title}</span>
                <span className="metric__delta">{metric.delta}</span>
              </header>
              <strong>{metric.value}</strong>
              <p>{metric.description}</p>
            </article>
          ))}
        </section>

        <section className="panel timeline">
          <header>
            <div>
              <span className="eyebrow">Timeline</span>
              <h2>What&apos;s next</h2>
            </div>
            <button className="ghost">View calendar</button>
          </header>

          <div className="timeline__list">
            {mockTimeline.map((entry) => (
              <article key={entry.title} className="timeline__card">
                <div className="timeline__meta">
                  <span className="timeline__pill">{entry.pill}</span>
                  <span className="timeline__stamp">{entry.timestamp}</span>
                </div>
                <h3>{entry.title}</h3>
                <p>{entry.description}</p>
              </article>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
}
