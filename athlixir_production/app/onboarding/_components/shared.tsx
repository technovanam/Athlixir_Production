import React, { useState, useRef, useEffect } from "react";
import { createPortal } from "react-dom";
import { ChevronDown, Search } from "lucide-react";

export const inputCls =
  "w-full bg-white/5 border border-white/10 rounded-md px-4 py-2.5 text-white placeholder:text-muted focus:outline-none focus:border-primary/50 text-sm transition-colors";

// ---------------------------------------------------------------------------
// Custom fully-themed select — replaces native <select> so option highlight
// colour can be controlled (browser native options ignore CSS colour rules).
// ---------------------------------------------------------------------------
interface SelectOption { value: string; label: string }

interface StyledSelectProps {
  value: string;
  onChange: (e: { target: { value: string } }) => void;
  children: React.ReactNode;
  className?: string;
  disabled?: boolean;
}

function parseOptions(children: React.ReactNode): SelectOption[] {
  const options: SelectOption[] = [];
  React.Children.forEach(children, (child) => {
    if (!React.isValidElement(child)) return;
    const el = child as React.ReactElement<{ value?: string; children?: React.ReactNode }>;
    if (el.type === "option") {
      const val = el.props.value ?? "";
      const label = typeof el.props.children === "string" ? el.props.children : String(val);
      options.push({ value: String(val), label });
    }
  });
  return options;
}

export function StyledSelect({ value, onChange, children, disabled }: StyledSelectProps) {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [dropPos, setDropPos] = useState<{ top: number; left: number; width: number } | null>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const searchRef = useRef<HTMLInputElement>(null);
  const listRef = useRef<HTMLUListElement>(null);

  const allOptions = parseOptions(children);
  const selected = allOptions.find((o) => o.value === value);

  const searchable = allOptions.filter((o) => o.value !== "");
  const filtered = query.trim()
    ? searchable.filter((o) => o.label.toLowerCase().includes(query.toLowerCase()))
    : searchable;

  // Calculate fixed position from trigger on open
  function openDropdown() {
    if (!triggerRef.current) return;
    const r = triggerRef.current.getBoundingClientRect();
    setDropPos({ top: r.bottom + 4, left: r.left, width: r.width });
    setOpen(true);
  }

  // Close on outside click or scroll
  useEffect(() => {
    if (!open) return;
    function close() { setOpen(false); setQuery(""); }
    function onMouseDown(e: MouseEvent) {
      const panel = document.getElementById("styled-select-panel");
      if (
        triggerRef.current?.contains(e.target as Node) ||
        panel?.contains(e.target as Node)
      ) return;
      close();
    }
    function onScroll(e: Event) {
      const panel = document.getElementById("styled-select-panel");
      if (panel?.contains(e.target as Node)) return; // ignore scrolls inside the list
      close();
    }
    document.addEventListener("mousedown", onMouseDown);
    window.addEventListener("scroll", onScroll, true);
    return () => {
      document.removeEventListener("mousedown", onMouseDown);
      window.removeEventListener("scroll", onScroll, true);
    };
  }, [open]);

  // Auto-focus search when opening
  useEffect(() => {
    if (open) setTimeout(() => searchRef.current?.focus(), 50);
    else setQuery("");
  }, [open]);

  function select(val: string) {
    onChange({ target: { value: val } });
    setOpen(false);
    setQuery("");
  }

  return (
    <div className="relative w-full">
      {/* Trigger */}
      <button
        ref={triggerRef}
        type="button"
        disabled={disabled}
        onClick={openDropdown}
        className={`w-full flex items-center justify-between bg-white/5 border ${
          open ? "border-primary/50 ring-1 ring-primary/20" : "border-white/10"
        } rounded-md px-4 py-2.5 text-sm text-white transition-colors focus:outline-none disabled:opacity-50 disabled:cursor-not-allowed`}
        suppressHydrationWarning
      >
        <span className={selected && selected.value !== "" ? "text-white" : "text-muted"}>
          {selected && selected.value !== "" ? selected.label : "Select"}
        </span>
        <ChevronDown
          size={14}
          className={`text-primary transition-transform duration-200 ${open ? "rotate-180" : ""}`}
        />
      </button>

      {/* Dropdown portal — rendered on document.body, position: fixed */}
      {open && dropPos && typeof document !== "undefined" &&
        createPortal(
          <div
            id="styled-select-panel"
            className="bg-[#0d0d0d] border border-white/10 rounded-md"
            style={{
              position: "fixed",
              top: dropPos.top,
              left: dropPos.left,
              width: dropPos.width,
              zIndex: 9999,
              boxShadow: "0 8px 32px rgba(0,0,0,0.7)",
            }}
          >
            {/* Search — shown only when list > 5 items */}
            {searchable.length > 5 && (
              <div className="flex items-center gap-2 px-3 py-2 border-b border-white/10">
                <Search size={13} className="text-white/30 shrink-0" />
                <input
                  ref={searchRef}
                  type="text"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Search…"
                  className="flex-1 bg-transparent text-sm text-white placeholder:text-white/30 focus:outline-none"
                />
              </div>
            )}

            {/* Scrollable list — thin custom scrollbar */}
            <ul
              ref={listRef}
              onWheel={(e) => e.stopPropagation()}
              className="max-h-64 overflow-y-auto [&::-webkit-scrollbar]:w-1.5 [&::-webkit-scrollbar-track]:bg-white/5 [&::-webkit-scrollbar-thumb]:bg-white/20 [&::-webkit-scrollbar-thumb]:rounded-full"
              style={{ scrollbarWidth: "thin", scrollbarColor: "rgba(255,255,255,0.2) transparent" } as React.CSSProperties}
            >
              {filtered.length === 0 ? (
                <li className="px-4 py-3 text-sm text-white/30 text-center">No results</li>
              ) : (
                filtered.map((opt) => (
                  <li
                    key={opt.value}
                    onClick={() => select(opt.value)}
                    className={`px-4 py-2.5 text-sm cursor-pointer transition-colors ${
                      opt.value === value
                        ? "bg-primary/20 text-primary font-semibold"
                        : "text-white/70 hover:bg-white/5 hover:text-white"
                    }`}
                  >
                    {opt.label}
                  </li>
                ))
              )}
            </ul>
          </div>,
          document.body
        )
      }
    </div>
  );
}

export function FieldLabel({ children }: { children: React.ReactNode }) {
  return (
    <label className="block text-[10px] font-black uppercase tracking-widest text-muted mb-1.5">
      {children}
    </label>
  );
}

export function SectionCard({
  icon,
  title,
  children,
}: {
  icon: React.ReactNode;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section className="bg-black/40 border border-white/10 rounded-xl p-6">
      <h2 className="text-base font-black uppercase tracking-tight text-white mb-4 flex items-center gap-2">
        {icon}
        {title}
      </h2>
      {children}
    </section>
  );
}
