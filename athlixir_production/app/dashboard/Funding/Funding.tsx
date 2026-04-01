"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Clock,
  TrendingUp,
  Award,
  ArrowUp,
  BadgeDollarSign,
  Building2,
  Landmark,
} from "lucide-react";

const STATS = [
  { label: "Sponsorships", value: 142, prefix: "", suffix: "", icon: Award, color: "var(--info)", sub: "FOUND" },
  { label: "Per Athlete", value: 12.5, prefix: "$", suffix: "k", icon: TrendingUp, color: "var(--success)", sub: "AVG GRANT" },
  { label: "Applications", value: 28, prefix: "", suffix: "", icon: Clock, color: "var(--info)", sub: "OPEN" },
  { label: "Funding Amount", value: 4.2, prefix: "$", suffix: "M", icon: BadgeDollarSign, color: "#FF5722", sub: "TOTAL" },
];

const GOV_SPONSORS = [
  { name: "Sports Authority of India", detail: "National athlete development grants", amount: "₹5L–₹25L", img: "https://images.unsplash.com/photo-1461896836934-ffe607ba8211?w=80&h=80&fit=crop&q=80" },
  { name: "MYAS – Khelo India", detail: "Youth sports excellence program", amount: "₹2L–₹10L", img: "https://images.unsplash.com/photo-1517649763962-0c623066013b?w=80&h=80&fit=crop&q=80" },
  { name: "TOPS Scheme", detail: "Target Olympic Podium Scheme", amount: "₹50K–₹5L/mo", img: "https://images.unsplash.com/photo-1569517282132-25d22f4573e6?w=80&h=80&fit=crop&q=80" },
  { name: "State Sports Councils", detail: "State-level performance grants", amount: "₹1L–₹8L", img: "https://images.unsplash.com/photo-1526676037777-05a232554f77?w=80&h=80&fit=crop&q=80" },
];

const PRIVATE_SPONSORS = [
  { name: "JSW Sports Foundation", detail: "Elite athlete sponsorship & training", amount: "₹10L–₹1Cr", img: "https://images.unsplash.com/photo-1574629810360-7efbbe195018?w=80&h=80&fit=crop&q=80" },
  { name: "Tata Sports", detail: "Long-term athlete partnerships", amount: "₹5L–₹50L", img: "https://images.unsplash.com/photo-1504025468847-0e438279542c?w=80&h=80&fit=crop&q=80" },
  { name: "Reliance Foundation", detail: "Youth & grassroots sports funding", amount: "₹2L–₹20L", img: "https://images.unsplash.com/photo-1543351611-58f69d7c1781?w=80&h=80&fit=crop&q=80" },
  { name: "Olympic Gold Quest", detail: "High-performance athlete support", amount: "₹8L–₹75L", img: "https://images.unsplash.com/photo-1551698618-1dfe5d97d256?w=80&h=80&fit=crop&q=80" },
  { name: "Inspire Institute of Sport", detail: "Residential training + stipend", amount: "₹3L–₹15L", img: "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=80&h=80&fit=crop&q=80" },
  { name: "Puma India", detail: "Brand sponsorship & gear support", amount: "₹1L–₹10L", img: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=80&h=80&fit=crop&q=80" },
];

function AnimatedCounter({ value, duration = 2, prefix = "", suffix = "" }: {
  value: number; duration?: number; prefix?: string; suffix?: string;
}) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    let startTime: number;
    let animationFrame: number;
    const animate = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = (timestamp - startTime) / (duration * 1000);
      if (progress < 1) {
        setCount(parseFloat((value * progress).toFixed(1)));
        animationFrame = requestAnimationFrame(animate);
      } else {
        setCount(value);
      }
    };
    animationFrame = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animationFrame);
  }, [value, duration]);

  return <span>{prefix}{count}{suffix}</span>;
}

function StatCard({ stat }: { stat: typeof STATS[number] }) {
  const isOpen = stat.sub === "OPEN";
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      whileHover={{ y: -5 }}
      style={{
        ...s.statCard,
        background: isOpen ? "#FF5722" : "rgba(255,255,255,0.03)",
        border: isOpen ? "none" : "1px solid rgba(255,255,255,0.08)",
      }}
    >
      <div style={{ ...s.statIcon, background: isOpen ? "rgba(255,255,255,0.2)" : "rgba(255,255,255,0.05)" }}>
        <stat.icon size={22} style={{ color: isOpen ? "white" : stat.color }} />
      </div>
      <div>
        <div style={{ ...s.statSubLabel, color: isOpen ? "rgba(255,255,255,0.8)" : "var(--text-muted)" }}>{stat.sub}</div>
        <h3 style={{ ...s.statValue, color: "white" }}>
          <AnimatedCounter value={stat.value} prefix={stat.prefix} suffix={stat.suffix} duration={2.5} />
        </h3>
        <p style={{ ...s.statLabel, color: isOpen ? "rgba(255,255,255,0.6)" : "var(--text-muted)" }}>{stat.label}</p>
      </div>
    </motion.div>
  );
}

function HorizontalScrollWrapper({ children, title, subtitle }: {
  children: React.ReactNode;
  title?: React.ReactNode;
  subtitle?: string;
}) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [scrollProgress, setScrollProgress] = useState(0);
  const isDragging = useRef(false);
  const startX = useRef(0);
  const startScrollLeft = useRef(0);

  const checkScroll = () => {
    if (scrollRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
      setScrollProgress(scrollLeft / (scrollWidth - clientWidth || 1));
    }
  };

  useEffect(() => { checkScroll(); }, [children]);

  const onMouseDown = (e: React.MouseEvent) => {
    isDragging.current = true;
    startX.current = e.pageX - scrollRef.current!.offsetLeft;
    startScrollLeft.current = scrollRef.current!.scrollLeft;
    scrollRef.current!.style.cursor = "grabbing";
    scrollRef.current!.style.userSelect = "none";
  };

  const onMouseMove = (e: React.MouseEvent) => {
    if (!isDragging.current) return;
    e.preventDefault();
    const x = e.pageX - scrollRef.current!.offsetLeft;
    scrollRef.current!.scrollLeft = startScrollLeft.current - (x - startX.current) * 1.5;
  };

  const onMouseUp = () => {
    isDragging.current = false;
    if (scrollRef.current) {
      scrollRef.current.style.cursor = "grab";
      scrollRef.current.style.userSelect = "";
    }
  };

  const onTouchStart = (e: React.TouchEvent) => {
    startX.current = e.touches[0].pageX;
    startScrollLeft.current = scrollRef.current!.scrollLeft;
  };

  const onTouchMove = (e: React.TouchEvent) => {
    scrollRef.current!.scrollLeft = startScrollLeft.current + (startX.current - e.touches[0].pageX) * 1.5;
  };

  return (
    <div style={s.scrollWrapperContainer}>
      {(title || subtitle) && (
        <div style={s.scrollWrapperHeader}>
          {title && <h2 style={s.scrollWrapperTitle}>{title}</h2>}
          {subtitle && <p style={s.scrollWrapperSubtitle}>{subtitle}</p>}
        </div>
      )}
      <div
        ref={scrollRef}
        onScroll={checkScroll}
        onMouseDown={onMouseDown}
        onMouseMove={onMouseMove}
        onMouseUp={onMouseUp}
        onMouseLeave={onMouseUp}
        onTouchStart={onTouchStart}
        onTouchMove={onTouchMove}
        style={{ ...s.scrollContent, cursor: "grab" }}
      >
        <div style={s.scrollInner}>{children}</div>
      </div>
      <div style={s.scrollDots}>
        {[...Array(3)].map((_, i) => (
          <div
            key={i}
            style={{
              ...s.scrollDot,
              background: Math.abs(scrollProgress - i / 2) < 0.25 ? "#FF5722" : "rgba(255,255,255,0.1)",
              width: Math.abs(scrollProgress - i / 2) < 0.25 ? "20px" : "6px",
            }}
          />
        ))}
      </div>
    </div>
  );
}

export default function SponsorshipFundingPage() {
  const [showScrollTop, setShowScrollTop] = useState(false);

  useEffect(() => {
    const handleScroll = () => setShowScrollTop(window.scrollY > 400);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div style={s.root}>
      {/* Header */}
      <div style={s.centeredHeader}>
        <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} style={s.globalHubBadge}>
          GLOBAL FUNDING HUB
        </motion.div>
        <h1 style={s.pageTitleCentered}>
          Fueling the Future of <br />
          <span style={{ color: "#FF5722" }}>Performance</span>
        </h1>
      </div>

      {/* Global Metrics */}
      <div style={s.metricsSection}>
        <HorizontalScrollWrapper
          title={<>Global <span style={{ color: "#FF5722" }}>Metrics</span></>}
          subtitle="Real-time performance distribution"
        >
          {STATS.map((stat, idx) => <StatCard key={idx} stat={stat} />)}
        </HorizontalScrollWrapper>
      </div>

      {/* Sponsorships */}
      <section style={s.sponsorSection}>
        <div style={s.sponsorGroup}>
          <div style={s.sponsorGroupHeader}>
            <Landmark size={18} style={{ color: "#FF5722" }} />
            <h2 style={s.sponsorGroupTitle}>Government Sponsorships</h2>
          </div>
          <div style={s.sponsorGrid}>
            {GOV_SPONSORS.map((sp) => (
              <div key={sp.name} style={s.sponsorCard}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={sp.img} alt={sp.name} style={s.sponsorImg} />
                <div>
                  <p style={s.sponsorName}>{sp.name}</p>
                  <p style={s.sponsorDetail}>{sp.detail}</p>
                </div>
                <span style={{ ...s.sponsorBadge, background: "rgba(255,87,34,0.1)", color: "#FF5722" }}>{sp.amount}</span>
              </div>
            ))}
          </div>
        </div>

        <div style={s.sponsorGroup}>
          <div style={s.sponsorGroupHeader}>
            <Building2 size={18} style={{ color: "#4FC3F7" }} />
            <h2 style={{ ...s.sponsorGroupTitle, color: "#4FC3F7" }}>Private Sponsorships</h2>
          </div>
          <div style={s.sponsorGrid}>
            {PRIVATE_SPONSORS.map((sp) => (
              <div key={sp.name} style={s.sponsorCard}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={sp.img} alt={sp.name} style={s.sponsorImg} />
                <div>
                  <p style={s.sponsorName}>{sp.name}</p>
                  <p style={s.sponsorDetail}>{sp.detail}</p>
                </div>
                <span style={{ ...s.sponsorBadge, background: "rgba(79,195,247,0.1)", color: "#4FC3F7" }}>{sp.amount}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Evolution Section */}
      <section style={s.evolutionSection}>
        <motion.div initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} style={s.evolutionCard}>
          <span style={s.evolutionBadge}>STITCH FOR ATHLETICS</span>
          <h2 style={s.evolutionTitle}>THE NEXT <span style={{ color: "#FF5722" }}>EVOLUTION</span></h2>
          <p style={s.evolutionDesc}>
            Access global liquidity and institutional-grade sponsorship pipelines directly through our
            decentralized performative infrastructure. Leveling the playing field for the world&apos;s most talented athletes.
          </p>
          <div style={s.evolutionActions}>
            <div style={s.launchPill}>LAUNCHING JAN 1 2027</div>
            <button style={s.earlyAccessBtn}>GET EARLY ACCESS</button>
          </div>
        </motion.div>
      </section>

      {/* Support & Impact */}
      <section style={s.supportSectionCustom}>
        <div style={s.supportCardCustom}>
          <div style={s.supportLeftCustom}>
            <h2 style={s.supportTitleCustom}>Support the <br /><span style={{ color: "#FF5722" }}>Journey</span></h2>
            <p style={s.supportTextCustom}>
              Help us bridge the gap between pure talent and peak performance.
              Our ecosystem transforms contributions into direct athletic impact.
            </p>
          </div>
          <div style={s.supportRightCustom}>
            <div style={s.paymentGridCustom}>
              {["VISA", "MC", "PAYPAL", "USDT"].map((p) => (
                <div key={p} style={s.paymentLogoCustom}>{p}</div>
              ))}
            </div>
          </div>
        </div>

        <div style={s.impactFooterCustom}>
          <span style={s.impactBadgeCustom}>TOTAL IMPACT</span>
          <h2 style={s.impactValueCustom}>5,400+</h2>
          <div style={s.impactUnderline} />
          <p style={s.impactLabelCustom}>Active athletes receiving global support from local contributors.</p>
        </div>
      </section>

      <footer style={s.siteFooter}>
        <h3 style={s.footerLogo}>ATHLIXIR</h3>
        <p style={s.footerCopyright}>© 2024 Athlixir Platform. All rights reserved.</p>
      </footer>

      <AnimatePresence>
        {showScrollTop && (
          <motion.button
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            style={s.scrollTopBtn}
          >
            <ArrowUp size={20} style={{ color: "white" }} />
          </motion.button>
        )}
      </AnimatePresence>
    </div>
  );
}

const s: Record<string, React.CSSProperties> = {
  root: {
    background: "#000000",
    color: "#ffffff",
    fontFamily: "var(--font-primary)",
    display: "flex",
    flexDirection: "column",
    gap: "var(--space-24)",
    paddingBottom: "var(--space-80)",
    overflowX: "hidden",
    minHeight: "100vh",
  },
  centeredHeader: {
    textAlign: "center",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: "var(--space-12)",
    margin: "var(--space-48) auto var(--space-32)",
    maxWidth: "900px",
  },
  globalHubBadge: {
    padding: "4px 16px",
    background: "rgba(255,87,34,0.05)",
    border: "1px solid rgba(255,87,34,0.3)",
    color: "#FF5722",
    borderRadius: "var(--radius-full)",
    fontSize: "10px",
    fontWeight: 700,
    letterSpacing: "1.5px",
    textTransform: "uppercase",
  },
  pageTitleCentered: {
    fontSize: "clamp(2.5rem, 6vw, 4.5rem)",
    fontWeight: 850,
    lineHeight: 1.05,
    color: "#ffffff",
    margin: "var(--space-8) 0",
  },
  metricsSection: { padding: "0 var(--space-24)", marginBottom: "var(--space-64)" },
  scrollWrapperContainer: { width: "100%", marginBottom: "var(--space-32)" },
  scrollWrapperHeader: { marginBottom: "var(--space-16)" },
  scrollWrapperTitle: {
    fontSize: "var(--fs-sm)",
    fontWeight: 800,
    color: "#ffffff",
    margin: 0,
    letterSpacing: "1px",
    textTransform: "uppercase",
  },
  scrollWrapperSubtitle: { fontSize: "10px", color: "rgba(255,255,255,0.4)", marginTop: "2px" },
  scrollContent: {
    width: "100%",
    overflowX: "auto",
    msOverflowStyle: "none",
    scrollbarWidth: "none",
    paddingBottom: "var(--space-12)",
  },
  scrollInner: { display: "flex", gap: "var(--space-12)", minWidth: "max-content" },
  scrollDots: { display: "flex", gap: "4px", marginTop: "var(--space-8)" },
  scrollDot: { height: "2px", borderRadius: "var(--radius-full)", transition: "all 0.3s ease" },
  statCard: {
    borderRadius: "var(--radius-lg)",
    padding: "var(--space-16) var(--space-20)",
    display: "flex",
    alignItems: "center",
    gap: "var(--space-16)",
    transition: "all 0.3s ease",
    cursor: "default",
    flex: "0 0 240px",
  },
  statIcon: {
    width: "44px",
    height: "44px",
    borderRadius: "var(--radius-md)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    flexShrink: 0,
  },
  statSubLabel: { fontSize: "9px", fontWeight: 700, letterSpacing: "1px", textTransform: "uppercase", marginBottom: "2px" },
  statValue: { fontSize: "var(--fs-h3)", fontWeight: 800, margin: 0, lineHeight: 1 },
  statLabel: { fontSize: "9px", fontWeight: 600, letterSpacing: "0.5px", textTransform: "uppercase", marginTop: "2px" },
  sponsorSection: { padding: "0 var(--space-24)", display: "flex", flexDirection: "column", gap: "var(--space-48)", marginBottom: "var(--space-64)" },
  sponsorGroup: { display: "flex", flexDirection: "column", gap: "var(--space-16)" },
  sponsorGroupHeader: { display: "flex", alignItems: "center", gap: "var(--space-8)", marginBottom: "var(--space-8)" },
  sponsorGroupTitle: { fontSize: "var(--fs-sm)", fontWeight: 800, color: "#FF5722", letterSpacing: "1px", textTransform: "uppercase", margin: 0 },
  sponsorGrid: { display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))", gap: "var(--space-12)" },
  sponsorCard: {
    background: "rgba(255,255,255,0.03)",
    border: "1px solid rgba(255,255,255,0.07)",
    borderRadius: "var(--radius-lg)",
    padding: "var(--space-16) var(--space-20)",
    display: "flex",
    alignItems: "center",
    gap: "var(--space-16)",
  },
  sponsorImg: { width: "44px", height: "44px", borderRadius: "var(--radius-md)", objectFit: "cover", flexShrink: 0 },
  sponsorName: { fontSize: "var(--fs-sm)", fontWeight: 700, color: "#ffffff", margin: 0 },
  sponsorDetail: { fontSize: "10px", color: "rgba(255,255,255,0.4)", margin: "2px 0 0" },
  sponsorBadge: { marginLeft: "auto", fontSize: "10px", fontWeight: 800, padding: "4px 10px", borderRadius: "var(--radius-full)", whiteSpace: "nowrap", flexShrink: 0 },
  evolutionSection: { padding: "0 var(--space-24)", marginBottom: "var(--space-80)" },
  evolutionCard: {
    background: "#ffffff",
    borderRadius: "var(--radius-xl)",
    padding: "var(--space-64)",
    textAlign: "center",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: "var(--space-24)",
    boxShadow: "0 20px 80px rgba(0,0,0,0.5)",
  },
  evolutionBadge: {
    fontSize: "10px",
    fontWeight: 800,
    color: "#000000",
    letterSpacing: "2px",
    background: "rgba(0,0,0,0.05)",
    padding: "6px 16px",
    borderRadius: "var(--radius-full)",
  },
  evolutionTitle: { fontSize: "clamp(2rem, 5vw, 3.5rem)", fontWeight: 900, color: "#000000", lineHeight: 1, margin: 0 },
  evolutionDesc: { fontSize: "var(--fs-body)", color: "rgba(0,0,0,0.5)", lineHeight: 1.6, maxWidth: "600px" },
  evolutionActions: { display: "flex", gap: "var(--space-16)", marginTop: "var(--space-12)", alignItems: "center" },
  launchPill: {
    padding: "10px 24px",
    border: "1px solid #FF5722",
    color: "#FF5722",
    fontSize: "var(--fs-xs)",
    fontWeight: 800,
    borderRadius: "var(--radius-full)",
  },
  earlyAccessBtn: {
    padding: "12px 32px",
    background: "#000000",
    color: "#ffffff",
    border: "none",
    borderRadius: "var(--radius-full)",
    fontSize: "var(--fs-sm)",
    fontWeight: 800,
    cursor: "pointer",
  },
  supportSectionCustom: { padding: "0 var(--space-24)", display: "flex", flexDirection: "column", gap: "var(--space-80)" },
  supportCardCustom: {
    background: "#121212",
    borderRadius: "var(--radius-xl)",
    padding: "var(--space-64)",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    border: "1px solid rgba(255,255,255,0.05)",
    gap: "var(--space-48)",
  },
  supportLeftCustom: { flex: 1 },
  supportTitleCustom: { fontSize: "var(--fs-h2)", fontWeight: 900, color: "#ffffff", lineHeight: 1.1 },
  supportTextCustom: { fontSize: "var(--fs-body)", color: "rgba(255,255,255,0.4)", lineHeight: 1.6, maxWidth: "400px", marginTop: "var(--space-16)" },
  supportRightCustom: { flex: "0 0 auto" },
  paymentGridCustom: { display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: "var(--space-20)" },
  paymentLogoCustom: {
    background: "rgba(255,255,255,0.03)",
    height: "60px",
    width: "100px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: "14px",
    fontWeight: 800,
    color: "rgba(255,255,255,0.3)",
    borderRadius: "var(--radius-lg)",
    letterSpacing: "2px",
    border: "1px solid rgba(255,255,255,0.06)",
  },
  impactFooterCustom: {
    textAlign: "center",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: "var(--space-20)",
    paddingBottom: "var(--space-80)",
  },
  impactBadgeCustom: { fontSize: "10px", fontWeight: 800, color: "#FF5722", letterSpacing: "2px" },
  impactValueCustom: { fontSize: "clamp(3rem, 12vw, 8rem)", fontWeight: 900, color: "#ffffff", lineHeight: 0.8 },
  impactUnderline: { width: "120px", height: "8px", background: "#FF5722", borderRadius: "var(--radius-full)", marginTop: "-10px" },
  impactLabelCustom: { fontSize: "var(--fs-body-sm)", color: "rgba(255,255,255,0.4)", maxWidth: "340px", lineHeight: 1.5 },
  siteFooter: {
    padding: "var(--space-48) 0",
    textAlign: "center",
    borderTop: "1px solid var(--border-subtle)",
    display: "flex",
    flexDirection: "column",
    gap: "12px",
    marginTop: "var(--space-80)",
  },
  footerLogo: { fontSize: "var(--fs-h4)", fontWeight: 900, letterSpacing: "4px", color: "var(--text-main)" },
  footerCopyright: { fontSize: "12px", color: "var(--text-muted)" },
  scrollTopBtn: {
    position: "fixed",
    bottom: "var(--space-32)",
    right: "var(--space-32)",
    width: "48px",
    height: "48px",
    borderRadius: "var(--radius-full)",
    background: "#FF5722",
    border: "none",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    cursor: "pointer",
    boxShadow: "0 10px 20px rgba(255,87,34,0.3)",
    zIndex: 100,
  },
};
