"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  Activity,
  Calendar,
  Trophy,
  Briefcase,
  DollarSign,
  MessageSquare,
  Settings,
  ChevronLeft,
  ChevronRight,
  Flame,
  User,
} from "lucide-react";

const NAV_ITEMS = [
  { label: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
  { label: "Performance", href: "/dashboard/performance", icon: Activity },
  { label: "Events", href: "/dashboard/events", icon: Calendar },
  { label: "Recovery", href: "/dashboard/recovery", icon: Flame },
  { label: "Leaderboard", href: "/dashboard/leaderboard", icon: Trophy },
  { label: "Opportunities", href: "/dashboard/opportunities", icon: Briefcase },
  { label: "Sponsorship", href: "/dashboard/Funding", icon: DollarSign },
  { label: "Messages", href: "/dashboard/messages", icon: MessageSquare },
];

const BOTTOM_ITEMS = [
  { label: "Profile", href: "/dashboard/profile", icon: User },
  { label: "Settings", href: "/dashboard/settings", icon: Settings },
];

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [collapsed, setCollapsed] = useState(false);
  const pathname = usePathname();

  return (
    <div style={st.root}>
      {/* Sidebar */}
      <aside
        style={{
          ...st.sidebar,
          width: collapsed
            ? "var(--sidebar-collapsed-width)"
            : "var(--sidebar-width)",
        }}
      >
        {/* Logo */}
        <div style={st.logoRow}>
          {!collapsed && <span style={st.logoText}>ATHLIXIR</span>}
          <button
            style={st.collapseBtn}
            onClick={() => setCollapsed((p) => !p)}
            aria-label={collapsed ? "Expand sidebar" : "Collapse sidebar"}
          >
            {collapsed ? <ChevronRight size={16} /> : <ChevronLeft size={16} />}
          </button>
        </div>

        {/* Main nav */}
        <nav style={st.nav}>
          {NAV_ITEMS.map((item) => {
            const active = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                style={{
                  ...st.navItem,
                  ...(active ? st.navItemActive : {}),
                  justifyContent: collapsed ? "center" : "flex-start",
                }}
                title={collapsed ? item.label : undefined}
              >
                <item.icon
                  size={18}
                  style={{
                    color: active
                      ? "var(--primary)"
                      : "var(--text-muted)",
                    flexShrink: 0,
                  }}
                />
                {!collapsed && (
                  <span
                    style={{
                      ...st.navLabel,
                      color: active ? "var(--text-main)" : "var(--text-muted)",
                    }}
                  >
                    {item.label}
                  </span>
                )}
              </Link>
            );
          })}
        </nav>

        {/* Bottom nav */}
        <div style={st.bottomNav}>
          <div style={st.divider} />
          {BOTTOM_ITEMS.map((item) => {
            const active = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                style={{
                  ...st.navItem,
                  ...(active ? st.navItemActive : {}),
                  justifyContent: collapsed ? "center" : "flex-start",
                }}
                title={collapsed ? item.label : undefined}
              >
                <item.icon
                  size={18}
                  style={{
                    color: active ? "var(--primary)" : "var(--text-muted)",
                    flexShrink: 0,
                  }}
                />
                {!collapsed && (
                  <span
                    style={{
                      ...st.navLabel,
                      color: active ? "var(--text-main)" : "var(--text-muted)",
                    }}
                  >
                    {item.label}
                  </span>
                )}
              </Link>
            );
          })}
        </div>
      </aside>

      {/* Main content */}
      <main style={st.main}>{children}</main>
    </div>
  );
}

const st: Record<string, React.CSSProperties> = {
  root: {
    display: "flex",
    minHeight: "100vh",
    background: "var(--background)",
  },
  sidebar: {
    display: "flex",
    flexDirection: "column",
    background: "var(--surface-1)",
    borderRight: "1px solid var(--border-subtle)",
    transition: "width var(--transition-base)",
    overflow: "hidden",
    flexShrink: 0,
    position: "sticky",
    top: 0,
    height: "100vh",
  },
  logoRow: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    padding: "var(--space-20) var(--space-16)",
    borderBottom: "1px solid var(--border-subtle)",
    minHeight: "64px",
    gap: "var(--space-8)",
  },
  logoText: {
    fontSize: "var(--fs-body-sm)",
    fontWeight: "700",
    letterSpacing: "var(--ls-caps)",
    color: "var(--primary)",
    whiteSpace: "nowrap",
  },
  collapseBtn: {
    background: "var(--surface-2)",
    border: "1px solid var(--border-default)",
    borderRadius: "var(--radius-md)",
    color: "var(--text-muted)",
    cursor: "pointer",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    width: "28px",
    height: "28px",
    flexShrink: 0,
    transition: "all var(--transition-fast)",
  },
  nav: {
    display: "flex",
    flexDirection: "column",
    gap: "var(--space-4)",
    padding: "var(--space-12) var(--space-8)",
    flex: 1,
    overflowY: "auto",
  },
  navItem: {
    display: "flex",
    alignItems: "center",
    gap: "var(--space-12)",
    padding: "var(--space-8) var(--space-12)",
    borderRadius: "var(--radius-md)",
    textDecoration: "none",
    transition: "all var(--transition-fast)",
    cursor: "pointer",
  },
  navItemActive: {
    background: "var(--primary-soft)",
    border: "1px solid rgba(255,87,34,0.18)",
  },
  navLabel: {
    fontSize: "var(--fs-body-sm)",
    fontWeight: "500",
    whiteSpace: "nowrap",
    letterSpacing: "var(--ls-body)",
  },
  bottomNav: {
    display: "flex",
    flexDirection: "column",
    gap: "var(--space-4)",
    padding: "var(--space-8) var(--space-8) var(--space-16)",
  },
  divider: {
    height: "1px",
    background: "var(--border-subtle)",
    margin: "var(--space-8) 0",
  },
  main: {
    flex: 1,
    padding: "var(--space-40) var(--space-48)",
    overflowY: "auto",
    minWidth: 0,
  },
};
