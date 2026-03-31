"use client";

import { useState, useRef, useEffect } from "react";
import { DayPicker } from "react-day-picker";
import { ChevronLeft, ChevronRight, Calendar } from "lucide-react";
import { inputCls } from "./shared";

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------
function toDate(value: string): Date | undefined {
  if (!value) return undefined;
  const d = new Date(`${value}T00:00:00`);
  return isNaN(d.getTime()) ? undefined : d;
}

function toISOLocal(date: Date): string {
  const y = date.getFullYear();
  const m = String(date.getMonth() + 1).padStart(2, "0");
  const d = String(date.getDate()).padStart(2, "0");
  return `${y}-${m}-${d}`;
}

function formatDisplay(value: string): string {
  if (!value) return "";
  const [y, m, d] = value.split("-");
  if (!y || !m || !d) return value;
  return `${d}-${m}-${y}`;
}

// ---------------------------------------------------------------------------
// Props
// ---------------------------------------------------------------------------
interface DatePickerProps {
  value: string; // YYYY-MM-DD or ""
  onChange: (value: string) => void;
  maxDate?: Date;
  disabled?: boolean;
}

// ---------------------------------------------------------------------------
// Component
// ---------------------------------------------------------------------------
export function DatePicker({ value, onChange, maxDate, disabled }: DatePickerProps) {
  const [open, setOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const selected = toDate(value);
  const today = new Date();
  // default browse month: either selected date or 18 years ago
  const defaultMonth = selected ?? new Date(today.getFullYear() - 18, today.getMonth(), 1);

  // Close when clicking outside
  useEffect(() => {
    function handler(e: MouseEvent) {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    if (open) document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, [open]);

  function handleSelect(date: Date | undefined) {
    if (!date) return;
    onChange(toISOLocal(date));
    setOpen(false);
  }

  return (
    <div ref={containerRef} className="relative w-full">
      {/* Trigger button */}
      <button
        type="button"
        disabled={disabled}
        onClick={() => setOpen((p) => !p)}
        className={`${inputCls} flex items-center justify-between cursor-pointer disabled:cursor-not-allowed disabled:opacity-60 ${
          open ? "border-primary/50" : ""
        }`}
      >
        <span className={value ? "text-white" : "text-white/30"}>
          {value ? formatDisplay(value) : "DD-MM-YYYY"}
        </span>
        <Calendar size={15} className="text-primary shrink-0" />
      </button>

      {/* Calendar popover */}
      {open && (
        <div
          className="absolute z-50 mt-1 left-0 bg-[#0d0d0d] border border-white/10 rounded-xl shadow-2xl p-4 min-w-[280px]"
          style={{ boxShadow: "0 8px 40px rgba(0,0,0,0.7)" }}
        >
          <DayPicker
            mode="single"
            selected={selected}
            onSelect={handleSelect}
            defaultMonth={defaultMonth}
            captionLayout="dropdown"
            startMonth={new Date(1940, 0)}
            endMonth={maxDate ?? today}
            disabled={maxDate ? { after: maxDate } : undefined}
            components={{
              Chevron: ({ orientation }) =>
                orientation === "left" ? (
                  <ChevronLeft size={16} />
                ) : (
                  <ChevronRight size={16} />
                ),
            }}
            classNames={{
              root: "text-white text-sm select-none",
              months: "flex flex-col gap-2",
              month: "space-y-3",
              month_caption: "flex items-center justify-between px-1",
              caption_label: "hidden",
              dropdowns: "flex items-center gap-2 flex-1",
              dropdown:
                "bg-[#1a1a1a] text-white border border-white/10 rounded-lg px-2 py-1 text-sm focus:outline-none focus:border-primary/50 cursor-pointer",
              nav: "flex items-center gap-1",
              button_previous:
                "p-1 rounded-lg text-primary hover:bg-white/10 transition-colors focus:outline-none",
              button_next:
                "p-1 rounded-lg text-primary hover:bg-white/10 transition-colors focus:outline-none",
              month_grid: "w-full border-collapse mt-1",
              weekdays: "flex",
              weekday: "w-9 h-7 text-center text-xs text-white/30 font-medium",
              weeks: "space-y-0.5",
              week: "flex",
              day: "w-9 h-9 text-center p-0",
              day_button:
                "w-9 h-9 rounded-full text-sm flex items-center justify-center hover:bg-white/10 text-white transition-colors focus:outline-none cursor-pointer",
            }}
            modifiersClassNames={{
              selected: "!bg-primary !text-black font-semibold rounded-full",
              today: "text-primary font-semibold",
              outside: "!text-white/20",
              disabled: "!opacity-25 !cursor-not-allowed",
            }}
          />
        </div>
      )}
    </div>
  );
}
