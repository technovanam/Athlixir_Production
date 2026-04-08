"use client";

import React from "react";
import {
  Activity,
  Calendar,
  Flame,
  Trophy,
  Briefcase,
  DollarSign,
  MessageSquare,
  Clock,
  Zap,
} from "lucide-react";

const COMING_SOON_CARDS = [
  {
    title: "Performance Overview",
    description: "Track your stats, PRs, and training insights at a glance.",
    icon: Activity,
    color: "var(--primary)",
    wide: true,
  },
  {
    title: "Upcoming Events",
    description: "Your next matches, tournaments, and training sessions.",
    icon: Calendar,
    color: "var(--info)",
    wide: false,
  },
  {
    title: "Injury & Recovery",
    description: "Monitor your recovery status and health alerts.",
    icon: Flame,
    color: "var(--warning)",
    wide: false,
  },
  {
    title: "Leaderboard",
    description: "See where you rank among athletes in your sport.",
    icon: Trophy,
    color: "var(--chart-5)",
    wide: false,
  },
  {
    title: "Opportunities",
    description: "Scouting calls, tryouts, and career pathways.",
    icon: Briefcase,
    color: "var(--success)",
    wide: false,
  },
  {
    title: "Sponsorship & Funding",
    description: "Grants, sponsors, and financial support for athletes.",
    icon: DollarSign,
    color: "var(--chart-4)",
    wide: false,
  },
  {
    title: "Messages",
    description: "Connect with coaches, scouts, and teams.",
    icon: MessageSquare,
    color: "var(--chart-3)",
    wide: false,
  },
];

export default function DashboardPage() {
  return (
    <>
      {/* Page Header */}
      <div style={st.pageHeader}>
        <div>
          <h1 style={st.pageTitle}>Dashboard</h1>
          <p style={st.pageSubtitle}>
            Welcome back — your command center awaits.
          </p>
        </div>
        <div style={st.liveBadge}>
          <Zap size={14} style={{ color: "var(--primary)" }} />
          <span style={st.liveBadgeText}>Coming Soon</span>
        </div>
      </div>

      {/* Cards Grid */}
      <div style={st.grid}>
        {COMING_SOON_CARDS.map((card) => (
          <div
            key={card.title}
            style={{
              ...st.card,
              gridColumn: card.wide ? "span 2" : "span 1",
            }}
          >
            {/* Diffuse glow */}
            <div
              style={{
                ...st.cardGlow,
                background: card.color,
              }}
            />

            {/* Icon */}
            <div
              style={{
                ...st.cardIconWrap,
                background: `color-mix(in srgb, ${card.color} 14%, transparent)`,
                border: `1px solid color-mix(in srgb, ${card.color} 28%, transparent)`,
              }}
            >
              <card.icon size={22} style={{ color: card.color }} />
            </div>

            <h3 style={st.cardTitle}>{card.title}</h3>
            <p style={st.cardDesc}>{card.description}</p>

            {/* Badge */}
            <div style={st.comingSoonBadge}>
              <Clock size={11} style={{ color: "var(--text-muted)" }} />
              <span style={st.comingSoonText}>Coming Soon</span>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}

const st: Record<string, React.CSSProperties> = {
  pageHeader: {
    display: "flex",
    alignItems: "flex-start",
    justifyContent: "space-between",
    flexWrap: "wrap",
    gap: "var(--space-16)",
    marginBottom: "var(--space-40)",
  },
  pageTitle: {
    fontSize: "var(--fs-h1)",
    fontWeight: "700",
    letterSpacing: "var(--ls-hero)",
    color: "var(--text-main)",
    margin: 0,
    textTransform: "uppercase",
  },
  pageSubtitle: {
    fontSize: "var(--fs-body-sm)",
    color: "var(--text-muted)",
    margin: "var(--space-8) 0 0 0",
    lineHeight: "var(--lh-relaxed)",
  },
  liveBadge: {
    display: "flex",
    alignItems: "center",
    gap: "var(--space-8)",
    background: "var(--primary-soft)",
    border: "1px solid rgba(255,87,34,0.22)",
    borderRadius: "var(--radius-full)",
    padding: "var(--space-8) var(--space-16)",
    flexShrink: 0,
  },
  liveBadgeText: {
    fontSize: "var(--fs-micro)",
    fontWeight: "700",
    color: "var(--primary)",
    letterSpacing: "var(--ls-caps)",
    textTransform: "uppercase",
  },
  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))",
    gap: "var(--space-24)",
  },
  card: {
    position: "relative",
    background: "var(--surface-1)",
    border: "1px solid var(--border-subtle)",
    borderRadius: "var(--radius-xl)",
    padding: "var(--space-32)",
    overflow: "hidden",
    display: "flex",
    flexDirection: "column",
    gap: "var(--space-12)",
    transition: "all var(--transition-fast)",
  },
  cardGlow: {
    position: "absolute",
    top: "-50px",
    right: "-50px",
    width: "140px",
    height: "140px",
    borderRadius: "var(--radius-full)",
    opacity: 0.07,
    filter: "blur(50px)",
    pointerEvents: "none",
  },
  cardIconWrap: {
    width: "46px",
    height: "46px",
    borderRadius: "var(--radius-lg)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    flexShrink: 0,
    marginBottom: "var(--space-4)",
  },
  cardTitle: {
    fontSize: "var(--fs-h5)",
    fontWeight: "700",
    color: "var(--text-main)",
    margin: 0,
    textTransform: "uppercase",
    letterSpacing: "var(--ls-heading)",
  },
  cardDesc: {
    fontSize: "var(--fs-body-sm)",
    color: "var(--text-muted)",
    margin: 0,
    lineHeight: "var(--lh-body)",
    flex: 1,
  },
  comingSoonBadge: {
    display: "inline-flex",
    alignItems: "center",
    gap: "var(--space-4)",
    background: "var(--surface-2)",
    border: "1px solid var(--border-default)",
    borderRadius: "var(--radius-full)",
    padding: "var(--space-4) var(--space-12)",
    alignSelf: "flex-start",
    marginTop: "var(--space-4)",
  },
  comingSoonText: {
    fontSize: "var(--fs-micro)",
    fontWeight: "700",
    color: "var(--text-muted)",
    letterSpacing: "var(--ls-caps)",
    textTransform: "uppercase",
  },
};
