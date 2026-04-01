"use client";

import { useState, useMemo, useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  Calendar, MapPin, Users, ChevronRight, Clock, Search,
  X, Trophy, Tag, ArrowUpRight, CalendarDays, Bookmark, BookmarkCheck, Zap
} from "lucide-react";

const EVENT_TYPES = ["All", "Competition", "Trial", "Workshop", "Championship", "Showcase"];

const EVENTS = [
  {
    id: 1, title: "Summer Athletics Open 2026", type: "Competition", sport: "Athletics", featured: true,
    date: "June 24–26, 2026", deadline: "2026-06-20", venue: "Jawaharlal Nehru Stadium, Chennai",
    state: "Tamil Nadu", eligibility: "State/National verified athletes", ageGroup: "Open",
    registered: 480, capacity: 600, status: "Open", entryFee: "₹500",
    prizes: "1st: ₹50,000 | 2nd: ₹25,000 | 3rd: ₹10,000",
    description: "Annual athletics competition featuring 100m, 200m, 400m, 800m, long jump, high jump, and shot put events. Top performers get scouted by SAI coaches.",
    organizer: "Tamil Nadu Athletics Association",
    image: "https://images.unsplash.com/photo-1532444458054-01a7dd3e9fca?auto=format&fit=crop&w=800&q=80"
  },
  {
    id: 2, title: "Inter-College Football Cup Finals", type: "Championship", sport: "Football", featured: true,
    date: "May 15–20, 2026", deadline: "2026-05-10", venue: "NMC Grounds, Pune",
    state: "Maharashtra", eligibility: "College-level teams only", ageGroup: "Under 25",
    registered: 1200, capacity: 2500, status: "Open", entryFee: "₹2,000/team",
    prizes: "Champions: ₹2,00,000 | Runner-up: ₹1,00,000",
    description: "India's largest inter-college football tournament. 64 teams compete across group stages and knockout rounds over 6 days.",
    organizer: "All India Football Federation – Youth Wing",
    image: "https://images.unsplash.com/photo-1431324155629-1a6deb1dec8d?auto=format&fit=crop&w=800&q=80"
  },
  {
    id: 3, title: "Scout Showcase Weekend", type: "Showcase", sport: "Football", featured: true,
    date: "July 02, 2026", deadline: "2026-06-25", venue: "Football Academy, Mumbai",
    state: "Maharashtra", eligibility: "Top 100 ranked athletes on Athlixir", ageGroup: "Under 21",
    registered: 75, capacity: 100, status: "Invite Only", entryFee: "Free",
    prizes: "Direct club trial opportunity",
    description: "Exclusive showcase event where top-ranked footballers are put in front of ISL and I-League club scouts. Invite-only based on platform ranking.",
    organizer: "Athlixir & ISL Scouts Network",
    image: "https://images.unsplash.com/photo-1517649763962-0c623066013b?auto=format&fit=crop&w=800&q=80"
  },
  {
    id: 4, title: "National Swimming Championship Qualifiers", type: "Trial", sport: "Swimming",
    date: "April 10–12, 2026", deadline: "2026-04-05", venue: "SPM Swimming Complex, Delhi",
    state: "Delhi", eligibility: "State-level qualified swimmers", ageGroup: "Under 21",
    registered: 220, capacity: 300, status: "Open", entryFee: "₹750",
    prizes: "National team qualification",
    description: "Qualifying rounds for the 2026 National Swimming Championship. Events include freestyle, backstroke, breaststroke, butterfly, and medley.",
    organizer: "Swimming Federation of India",
    image: "https://images.unsplash.com/photo-1519315901367-f34ff9154487?auto=format&fit=crop&w=800&q=80"
  },
  {
    id: 5, title: "Coimbatore District Cricket Trials", type: "Trial", sport: "Cricket",
    date: "March 28–29, 2026", deadline: "2026-03-25", venue: "SNR College Ground, Coimbatore",
    state: "Tamil Nadu", eligibility: "Registered district players, Age 16+", ageGroup: "Open",
    registered: 340, capacity: 500, status: "Closing Soon", entryFee: "₹200",
    prizes: "District team selection",
    description: "Open selection trials for the Coimbatore district cricket team. Two-day event covering batting, bowling, and fielding assessments.",
    organizer: "Coimbatore District Cricket Association",
    image: "https://images.unsplash.com/photo-1531415074968-036ba1b575da?auto=format&fit=crop&w=800&q=80"
  },
  {
    id: 6, title: "Badminton Skills Workshop", type: "Workshop", sport: "Badminton",
    date: "April 20, 2026", deadline: "2026-04-18", venue: "Pullela Gopichand Academy, Hyderabad",
    state: "Telangana", eligibility: "All levels welcome", ageGroup: "Under 18",
    registered: 60, capacity: 80, status: "Open", entryFee: "₹1,500",
    prizes: "Certificate + Coaching feedback report",
    description: "A one-day intensive workshop by national-level coaches focusing on footwork, smash technique, and match strategy for young players.",
    organizer: "Gopichand Badminton Foundation",
    image: "https://images.unsplash.com/photo-1626224583764-f87db24ac4ea?auto=format&fit=crop&w=800&q=80"
  },
  {
    id: 7, title: "Marathon for Champions 2026", type: "Competition", sport: "Athletics",
    date: "August 15, 2026", deadline: "2026-08-10", venue: "Marina Beach Road, Chennai",
    state: "Tamil Nadu", eligibility: "Open to all registered runners", ageGroup: "Open",
    registered: 1500, capacity: 5000, status: "Open", entryFee: "₹1,000",
    prizes: "1st: ₹1,00,000 | 2nd: ₹50,000 | 3rd: ₹25,000",
    description: "Full marathon (42.195 km) and half marathon categories. Chip-timed, AIMS-certified course along the scenic Marina coastline.",
    organizer: "Chennai Runners Club",
    image: "https://images.unsplash.com/photo-1513593771513-7b58b6c4af38?auto=format&fit=crop&w=800&q=80"
  },
  {
    id: 8, title: "State Boxing Championship 2026", type: "Championship", sport: "Boxing",
    date: "September 5–8, 2026", deadline: "2026-08-30", venue: "Netaji Indoor Stadium, Kolkata",
    state: "West Bengal", eligibility: "District-level boxers, Valid BFI registration", ageGroup: "Senior",
    registered: 180, capacity: 256, status: "Open", entryFee: "₹400",
    prizes: "Gold medalists qualify for National Championship",
    description: "Official state boxing championship across all weight categories. Winners represent the state at the National Boxing Championship.",
    organizer: "West Bengal Boxing Association",
    image: "https://images.unsplash.com/photo-1549719386-74dfcbf7dbed?auto=format&fit=crop&w=800&q=80"
  },
];

function getStatusColor(status) {
  const map = {
    "Open": "bg-emerald-500/10 text-emerald-500",
    "Closing Soon": "bg-amber-500/10 text-amber-500",
    "Invite Only": "bg-purple-500/10 text-purple-500",
    "Completed": "bg-gray-500/10 text-gray-500",
  };
  return map[status] || "bg-gray-500/10 text-gray-500";
}

function getTypeColor(type) {
  const map = {
    "Competition": "bg-blue-500/10 text-blue-400",
    "Trial": "bg-orange-500/10 text-orange-400",
    "Workshop": "bg-teal-500/10 text-teal-400",
    "Championship": "bg-red-500/10 text-red-400",
    "Showcase": "bg-violet-500/10 text-violet-400",
  };
  return map[type] || "bg-gray-500/10 text-gray-400";
}

const inputClass = "w-full bg-white/[0.06] border border-white/[0.08] rounded-lg px-3 py-2 text-sm text-white placeholder:text-gray-500 outline-none focus:border-primary/50";

const featuredEvents = EVENTS.filter((e) => e.featured);

function FeaturedSlider({ onSelect }) {
  const [idx, setIdx] = useState(0);

  useEffect(() => {
    if (featuredEvents.length <= 1) return;
    const t = setInterval(() => setIdx((i) => (i + 1) % featuredEvents.length), 4000);
    return () => clearInterval(t);
  }, []);

  if (featuredEvents.length === 0) return null;

  return (
    <section className="relative h-72 sm:h-80 rounded-2xl overflow-hidden">
      {/* Render all slides stacked, animate opacity */}
      {featuredEvents.map((ev, i) => (
        <div
          key={ev.id}
          className="absolute inset-0 transition-opacity duration-1000"
          style={{ opacity: i === idx ? 1 : 0, zIndex: i === idx ? 1 : 0 }}
        >
          <motion.img
            src={ev.image}
            alt={ev.title}
            className="w-full h-full object-cover"
            whileHover={{ scale: 1.06 }}
            transition={{ duration: 0.5 }}
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/85 via-black/50 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
        </div>
      ))}

      {/* Content — always on top */}
      <motion.div
        className="absolute inset-0 z-10 p-6 sm:p-8 flex flex-col justify-end cursor-pointer"
        onClick={() => onSelect(featuredEvents[idx].id)}
        whileHover="hover"
        whileTap={{ scale: 0.99 }}
      >
        <AnimatePresence mode="wait">
          <motion.div
            key={idx}
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.45 }}
          >
            <div className="flex items-center gap-2 mb-3">
              <span className="px-2 py-0.5 rounded text-[10px] font-semibold bg-primary/90 text-white flex items-center gap-1">
                <Zap size={10} /> Featured
              </span>
              <span className={`px-2 py-0.5 rounded text-[10px] font-medium ${getStatusColor(featuredEvents[idx].status)}`}>{featuredEvents[idx].status}</span>
              <span className={`px-2 py-0.5 rounded text-[10px] font-medium ${getTypeColor(featuredEvents[idx].type)}`}>{featuredEvents[idx].type}</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold text-white mb-2 leading-tight">{featuredEvents[idx].title}</h2>
            <div className="flex flex-wrap gap-4 text-sm text-gray-300">
              <span className="flex items-center gap-1"><CalendarDays size={13} className="text-primary" /> {featuredEvents[idx].date}</span>
              <span className="flex items-center gap-1"><MapPin size={13} className="text-primary" /> {featuredEvents[idx].venue}</span>
              <span className="flex items-center gap-1"><Users size={13} className="text-primary" /> {featuredEvents[idx].registered}/{featuredEvents[idx].capacity} registered</span>
            </div>
          </motion.div>
        </AnimatePresence>
      </motion.div>

      {/* Dot indicators */}
      {featuredEvents.length > 1 && (
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex items-center gap-1.5 z-20">
          {featuredEvents.map((_, i) => (
            <div
              key={i}
              className={`rounded-full transition-all duration-500 ${
                i === idx ? "w-6 h-1.5 bg-primary" : "w-1.5 h-1.5 bg-white/40"
              }`}
            />
          ))}
        </div>
      )}
    </section>
  );
}

export default function EventsPage() {
  const [typeFilter, setTypeFilter] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [detailId, setDetailId] = useState(null);
  const [bookmarks, setBookmarks] = useState([]);
  const [modalRoot, setModalRoot] = useState(null);
  const topRef = useRef(null);

  useEffect(() => {
    setModalRoot(document.getElementById("modal-root"));
  }, []);

  const filtered = useMemo(() => {
    return EVENTS.filter((ev) => {
      if (typeFilter !== "All" && ev.type !== typeFilter) return false;
      if (searchQuery && !(ev.title + " " + ev.sport + " " + ev.venue).toLowerCase().includes(searchQuery.toLowerCase())) return false;
      return true;
    });
  }, [typeFilter, searchQuery]);

  const detailEvent = detailId ? EVENTS.find((e) => e.id === detailId) : null;

  const openDetail = (id) => setDetailId(id);
  const closeDetail = () => setDetailId(null);

  const toggleBookmark = (id) =>
    setBookmarks((prev) => prev.includes(id) ? prev.filter((b) => b !== id) : [...prev, id]);

  const capacityPercent = (ev) => Math.round((ev.registered / ev.capacity) * 100);

  return (
    <div className="space-y-8 pb-12 max-w-6xl mx-auto">
      <div ref={topRef} />

      {/* Header */}
      <header>
        <h1 className="text-2xl font-bold text-white/95 flex items-center gap-2">
          <Calendar size={28} className="text-primary" />
          Event Chronicle
        </h1>
        <p className="text-sm text-gray-500 mt-1">Upcoming competitions, trials, workshops & championships</p>
      </header>

      {/* Featured Slider — admin-controlled via featured: true */}
      <FeaturedSlider onSelect={openDetail} />

      {/* Search & Type Filters */}
      <section className="rounded-2xl border border-white/[0.06] bg-white/[0.02] p-5 space-y-4">
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" size={16} />
          <input
            type="text"
            placeholder="Search events by name, sport, venue..."
            className={inputClass + " pl-9"}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <div className="flex gap-2 flex-wrap">
          {EVENT_TYPES.map((t) => (
            <button
              key={t}
              type="button"
              onClick={() => setTypeFilter(t)}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${
                typeFilter === t
                  ? "bg-primary text-white"
                  : "bg-white/[0.06] text-gray-400 hover:text-white border border-white/[0.08]"
              }`}
            >
              {t}
            </button>
          ))}
        </div>
        <p className="text-xs text-gray-500">{filtered.length} events found</p>
      </section>

      {/* Events Grid */}
      {filtered.length === 0 ? (
        <div className="text-center py-12 text-sm text-gray-500">
          No events match your filters. Try a different type or keyword.
        </div>
      ) : (
        <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((ev, i) => {
            const pct = capacityPercent(ev);
            const bookmarked = bookmarks.includes(ev.id);
            return (
              <motion.div
                key={ev.id}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.05 }}
                whileHover={{ scale: 1.03, y: -4, boxShadow: "0 16px 40px rgba(0,0,0,0.6)" }}
                whileTap={{ scale: 0.98 }}
                onClick={() => openDetail(ev.id)}
                className="rounded-2xl border border-white/[0.06] bg-white/[0.02] overflow-hidden flex flex-col hover:border-white/20 transition-colors cursor-pointer group"
                style={{ willChange: "transform" }}
              >
                <div className="h-40 relative overflow-hidden">
                  <motion.img
                    src={ev.image}
                    alt={ev.title}
                    className="w-full h-full object-cover"
                    loading="lazy"
                    whileHover={{ scale: 1.08 }}
                    transition={{ duration: 0.4 }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
                  <div className="absolute top-3 left-3">
                    <span className={`px-2 py-0.5 rounded text-[10px] font-medium ${getStatusColor(ev.status)}`}>{ev.status}</span>
                  </div>
                  <button
                    type="button"
                    onClick={(e) => { e.stopPropagation(); toggleBookmark(ev.id); }}
                    className="absolute top-3 right-3 p-1.5 rounded-lg bg-black/40 text-gray-300 hover:text-primary transition-colors"
                  >
                    {bookmarked ? <BookmarkCheck size={14} className="text-primary" /> : <Bookmark size={14} />}
                  </button>
                  <div className="absolute bottom-3 left-3">
                    <span className={`px-2 py-0.5 rounded text-[10px] font-medium ${getTypeColor(ev.type)}`}>{ev.type} • {ev.sport}</span>
                  </div>
                </div>

                <div className="p-4 flex flex-col flex-1">
                  <h3 className="font-semibold text-white text-sm">
                    {ev.title}
                  </h3>
                  <div className="mt-2 space-y-1">
                    <p className="text-xs text-gray-500 flex items-center gap-1"><CalendarDays size={12} /> {ev.date}</p>
                    <p className="text-xs text-gray-500 flex items-center gap-1"><MapPin size={12} /> {ev.venue}</p>
                  </div>
                  <p className="text-xs text-gray-400 mt-2">{ev.eligibility}</p>

                  <div className="mt-auto pt-4">
                    <div className="flex justify-between text-[10px] text-gray-500 mb-1">
                      <span>{ev.registered} / {ev.capacity} registered</span>
                      <span>{pct}%</span>
                    </div>
                    <div className="h-1.5 bg-white/[0.06] rounded-full overflow-hidden">
                      <div
                        className={`h-full rounded-full transition-all ${pct >= 90 ? "bg-red-500" : pct >= 70 ? "bg-amber-500" : "bg-primary"}`}
                        style={{ width: `${pct}%` }}
                      />
                    </div>
                  </div>

                  <div className="flex items-center justify-between mt-3 pt-3 border-t border-white/[0.06]">
                    <span className="text-xs text-gray-500 flex items-center gap-1"><Tag size={12} /> {ev.entryFee}</span>
                    <span className="text-xs text-white/50 font-medium flex items-center gap-1">
                      View details <ChevronRight size={14} />
                    </span>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </section>
      )}

      {/* Host CTA */}
      <div className="rounded-2xl border border-dashed border-white/10 bg-white/[0.02] p-6 flex flex-col sm:flex-row items-center gap-4">
        <div className="p-3 bg-primary/10 text-primary rounded-xl shrink-0"><Trophy size={24} /></div>
        <div className="flex-1 text-center sm:text-left">
          <h3 className="font-semibold text-white text-sm">Host your own event</h3>
          <p className="text-xs text-gray-500 mt-0.5">Organizing a meet or championship? Publish it on Athlixir to reach thousands of athletes.</p>
        </div>
        <button type="button" className="px-4 py-2.5 rounded-xl bg-white/[0.06] border border-white/[0.08] text-sm font-medium text-white/90 hover:bg-white/10 transition-colors">Submit Event</button>
      </div>

      {/* Modal portal into #modal-root (outside body transform stacking context) */}
      {modalRoot && createPortal(
        <AnimatePresence>
          {detailEvent && (
            <motion.div
              key="overlay"
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              onClick={closeDetail}
              style={{ position: "fixed", inset: 0, zIndex: 99999, display: "flex", alignItems: "center", justifyContent: "center", padding: 20, background: "rgba(0,0,0,0.75)", backdropFilter: "blur(10px)", WebkitBackdropFilter: "blur(10px)" }}
            >
              <motion.div
                key="modal"
                initial={{ opacity: 0, scale: 0.93, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.93, y: 20 }}
                transition={{ duration: 0.22, ease: "easeOut" }}
                onClick={(e) => e.stopPropagation()}
                style={{ position: "relative", width: "100%", maxWidth: 580, maxHeight: "calc(100vh - 40px)", background: "#111", border: "1px solid rgba(255,255,255,0.1)", borderRadius: 20, overflow: "hidden", boxShadow: "0 32px 80px rgba(0,0,0,0.95)", display: "flex", flexDirection: "column" }}
              >
                {/* Image */}
                <div style={{ position: "relative", height: 175, flexShrink: 0 }}>
                  <img src={detailEvent.image} alt={detailEvent.title} style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }} />
                  <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to top, #111 0%, transparent 55%)" }} />
                  <div style={{ position: "absolute", bottom: 12, left: 16, display: "flex", gap: 6 }}>
                    <span className={`px-2 py-0.5 rounded text-[10px] font-medium ${getStatusColor(detailEvent.status)}`}>{detailEvent.status}</span>
                    <span className={`px-2 py-0.5 rounded text-[10px] font-medium ${getTypeColor(detailEvent.type)}`}>{detailEvent.type}</span>
                    <span style={{ padding: "2px 8px", borderRadius: 4, fontSize: 10, fontWeight: 500, background: "rgba(255,255,255,0.08)", color: "#aaa" }}>{detailEvent.sport}</span>
                  </div>
                </div>

                {/* X close button */}
                <button onClick={closeDetail} style={{ position: "absolute", top: 12, right: 12, zIndex: 10, width: 34, height: 34, borderRadius: 10, background: "rgba(0,0,0,0.6)", border: "1px solid rgba(255,255,255,0.2)", color: "white", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center" }}>
                  <X size={16} strokeWidth={2.5} />
                </button>

                {/* Scrollable body */}
                <div style={{ overflowY: "auto", padding: "16px 20px 20px", display: "flex", flexDirection: "column", gap: 12, flex: 1 }}>
                  <div>
                    <h2 style={{ fontSize: 18, fontWeight: 800, color: "white", margin: 0, lineHeight: 1.3 }}>{detailEvent.title}</h2>
                    <p style={{ fontSize: 11, color: "#555", margin: "3px 0 0" }}>by {detailEvent.organizer}</p>
                  </div>
                  <p style={{ fontSize: 12, color: "#777", margin: 0, lineHeight: 1.65 }}>{detailEvent.description}</p>
                  <div style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 6 }}>
                    {[{ label: "Date", value: detailEvent.date }, { label: "Entry Fee", value: detailEvent.entryFee }, { label: "Age Group", value: detailEvent.ageGroup }, { label: "Registered", value: `${detailEvent.registered}/${detailEvent.capacity}` }].map(({ label, value }) => (
                      <div key={label} style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.07)", borderRadius: 10, padding: "8px 10px" }}>
                        <p style={{ fontSize: 9, color: "#555", textTransform: "uppercase", letterSpacing: 1, margin: 0 }}>{label}</p>
                        <p style={{ fontSize: 11, fontWeight: 700, color: "white", margin: "2px 0 0" }}>{value}</p>
                      </div>
                    ))}
                  </div>
                  <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 6 }}>
                    <div style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.06)", borderRadius: 10, padding: "8px 10px" }}>
                      <p style={{ fontSize: 9, color: "#555", textTransform: "uppercase", letterSpacing: 1, margin: "0 0 3px" }}>Venue</p>
                      <p style={{ fontSize: 11, color: "rgba(255,255,255,0.8)", margin: 0, display: "flex", alignItems: "flex-start", gap: 4 }}><MapPin size={11} style={{ flexShrink: 0, marginTop: 1 }} />{detailEvent.venue}</p>
                    </div>
                    <div style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.06)", borderRadius: 10, padding: "8px 10px" }}>
                      <p style={{ fontSize: 9, color: "#555", textTransform: "uppercase", letterSpacing: 1, margin: "0 0 3px" }}>Deadline</p>
                      <p style={{ fontSize: 11, color: "rgba(255,255,255,0.8)", margin: 0, display: "flex", alignItems: "center", gap: 4 }}><Clock size={11} style={{ flexShrink: 0 }} />{detailEvent.deadline}</p>
                    </div>
                    <div style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.06)", borderRadius: 10, padding: "8px 10px" }}>
                      <p style={{ fontSize: 9, color: "#555", textTransform: "uppercase", letterSpacing: 1, margin: "0 0 3px" }}>Prizes</p>
                      <p style={{ fontSize: 11, fontWeight: 700, color: "white", margin: 0 }}>{detailEvent.prizes}</p>
                    </div>
                  </div>
                  <div style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.06)", borderRadius: 10, padding: "8px 12px" }}>
                    <p style={{ fontSize: 9, color: "#555", textTransform: "uppercase", letterSpacing: 1, margin: "0 0 2px" }}>Eligibility</p>
                    <p style={{ fontSize: 11, color: "rgba(255,255,255,0.8)", margin: 0 }}>{detailEvent.eligibility}</p>
                  </div>
                  <div style={{ display: "flex", gap: 8 }}>
                    <button type="button" onClick={() => toggleBookmark(detailEvent.id)} style={{ padding: "10px 16px", borderRadius: 10, border: "1px solid rgba(255,255,255,0.1)", background: "rgba(255,255,255,0.04)", color: "rgba(255,255,255,0.85)", fontSize: 12, fontWeight: 500, cursor: "pointer", display: "flex", alignItems: "center", gap: 6 }}>
                      {bookmarks.includes(detailEvent.id) ? <BookmarkCheck size={14} /> : <Bookmark size={14} />}
                      {bookmarks.includes(detailEvent.id) ? "Saved" : "Save"}
                    </button>
                    <button type="button" style={{ flex: 1, padding: "10px", borderRadius: 10, border: "none", background: "white", color: "black", fontSize: 13, fontWeight: 700, cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", gap: 6 }}>
                      Register Now <ArrowUpRight size={14} />
                    </button>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>,
        modalRoot
      )}
    </div>
  );
}
