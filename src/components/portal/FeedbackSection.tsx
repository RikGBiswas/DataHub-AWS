import { MessageSquare, KeyRound } from "lucide-react";

const cards = [
  {
    icon: KeyRound,
    title: "Request Data or Access",
    description: "Need a dataset, API key, or elevated permissions? Submit a request and our team will follow up.",
    href: "/request-access",
  },
  {
    icon: MessageSquare,
    title: "Provide Feedback",
    description: "Help us improve the portal. Share ideas, report issues, or suggest new datasets and features.",
    href: "/feedback",
  },
];

const FeedbackSection = () => (
  <section className="bg-section-alt py-14">
    <div className="container mx-auto px-4">
      <h2 className="text-2xl font-bold text-foreground md:text-3xl">Get Involved</h2>
      <div className="mt-8 grid gap-6 sm:grid-cols-2">
        {cards.map((card) => (
          <a
            key={card.href}
            href={card.href}
            onClick={(e) => e.preventDefault()}
            className="group flex gap-4 rounded-lg border border-border bg-card p-6 transition-shadow hover:shadow-md"
          >
            <card.icon className="mt-1 h-6 w-6 shrink-0 text-accent" />
            <div>
              <h3 className="font-semibold text-foreground group-hover:text-secondary">
                {card.title}
              </h3>
              <p className="mt-1 text-sm leading-relaxed text-muted-foreground">
                {card.description}
              </p>
            </div>
          </a>
        ))}
      </div>
    </div>
  </section>
);

export default FeedbackSection;
