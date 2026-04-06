"use client";

import { motion } from "framer-motion";
import { Dumbbell, ChevronLeft, ChevronRight, Loader2, Star } from "lucide-react";
import { FieldLabel, SectionCard, inputCls, StyledSelect } from "./shared";
import { FormState, CURRENT_LEVELS, PREFERRED_TRAINING_TYPES, DISABILITY_CATEGORIES, SPORT_CATEGORIES, SPORTS_LIST } from "./types";

interface Step2Props {
  form: FormState;
  showDominantHand: boolean;
  updateField: <K extends keyof FormState>(key: K, value: FormState[K]) => void;
  saving: boolean;
  onBack: () => void;
  onComplete: () => void;
}

export function Step2({
  form,
  showDominantHand,
  updateField,
  saving,
  onBack,
  onComplete,
}: Step2Props) {
  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      className="space-y-4"
    >
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 items-stretch">

        {/* Specialization */}
        <SectionCard icon={<Star size={18} className="text-primary" />} title="Specialization">
          <p className="text-muted text-xs mb-3">Defines the athlete&apos;s specialization.</p>
          <div className="grid gap-4">

            <div>
              <FieldLabel>Primary Sport</FieldLabel>
              <StyledSelect
                value={form.primarySport}
                onChange={(e) => updateField("primarySport", e.target.value)}
              >
                <option value="">Select sport</option>
                {SPORTS_LIST.map((s) => (
                  <option key={s} value={s}>{s}</option>
                ))}
              </StyledSelect>
            </div>

            <div>
              <FieldLabel>Category</FieldLabel>
              <StyledSelect
                value={form.category}
                onChange={(e) => updateField("category", e.target.value)}
                disabled={!form.primarySport}
              >
                <option value="">Select category</option>
                {(SPORT_CATEGORIES[form.primarySport] ?? []).map((c) => (
                  <option key={c} value={c}>{c}</option>
                ))}
              </StyledSelect>
            </div>

            <div>
              <FieldLabel>Athlete Level</FieldLabel>
              <StyledSelect
                value={form.currentLevel}
                onChange={(e) => updateField("currentLevel", e.target.value)}
              >
                <option value="">Select level</option>
                {CURRENT_LEVELS.map((l) => (
                  <option key={l.value} value={l.value}>{l.label}</option>
                ))}
              </StyledSelect>
            </div>

          </div>
        </SectionCard>

        

        {/* Training Information */}
        <SectionCard icon={<Dumbbell size={18} className="text-primary" />} title="Training Information">
          <div className="grid gap-4">

            {/* Currently Training toggle */}
            <div>
              <FieldLabel>Currently Training?</FieldLabel>
              <div className="flex gap-3 mt-1">
                {(["yes", "no"] as const).map((v) => (
                  <button
                    key={v}
                    type="button"
                    onClick={() => updateField("currentlyTraining", v)}
                    className={`px-6 py-2 rounded-md text-[10px] font-bold uppercase tracking-widest border transition-all ${
                      form.currentlyTraining === v
                        ? "bg-primary text-white border-primary"
                        : "bg-white/5 text-white/60 border-white/10 hover:bg-white/10"
                    }`}
                  >
                    {v === "yes" ? "Yes" : "No"}
                  </button>
                ))}
              </div>
            </div>

            {form.currentlyTraining === "yes" && (
              <>
                <div>
                  <FieldLabel>Academy Name</FieldLabel>
                  <input
                    type="text"
                    className={inputCls}
                    placeholder="Enter academy name"
                    value={form.currentAcademy}
                    onChange={(e) => updateField("currentAcademy", e.target.value)}
                  />
                </div>

                <div>
                  <FieldLabel>Coach Name</FieldLabel>
                  <input
                    type="text"
                    className={inputCls}
                    placeholder="Enter coach name"
                    value={form.currentCoach}
                    onChange={(e) => updateField("currentCoach", e.target.value)}
                  />
                </div>

                <div>
                  <FieldLabel>Training Type</FieldLabel>
                  <StyledSelect
                    value={form.preferredTrainingType}
                    onChange={(e) => updateField("preferredTrainingType", e.target.value)}
                  >
                    <option value="">Select training type</option>
                    {PREFERRED_TRAINING_TYPES.map((t) => (
                      <option key={t} value={t}>{t}</option>
                    ))}
                  </StyledSelect>
                </div>

                <div>
                  <FieldLabel>Year of Training</FieldLabel>
                  <StyledSelect
                    value={form.trainingStartYear}
                    onChange={(e) => updateField("trainingStartYear", e.target.value)}
                  >
                    <option value="">Select year</option>
                    {Array.from({ length: 2026 - 1980 + 1 }, (_, i) => 2026 - i).map((y) => (
                      <option key={y} value={String(y)}>{y}</option>
                    ))}
                  </StyledSelect>
                </div>

                <div>
                  <FieldLabel>Training Days per Week</FieldLabel>
                  <StyledSelect
                    value={form.trainingDaysPerWeek}
                    onChange={(e) => updateField("trainingDaysPerWeek", e.target.value)}
                  >
                    <option value="">Select days</option>
                    {["1", "2", "3", "4", "5", "6", "7"].map((d) => (
                      <option key={d} value={d}>{d} {d === "1" ? "day" : "days"}</option>
                    ))}
                  </StyledSelect>
                </div>
              </>
            )}

          </div>
        </SectionCard>

      </div>

      <div className="flex justify-between">
        <button
          type="button"
          onClick={onBack}
          className="px-6 py-3 bg-white/5 border border-white/10 hover:bg-white/10 text-white font-bold rounded-md text-[10px] uppercase tracking-widest flex items-center gap-2 transition-all"
        >
          <ChevronLeft size={18} />
          Back
        </button>

        <button
          type="button"
          onClick={onComplete}
          disabled={saving}
          className="px-8 py-4 bg-primary hover:bg-primary-hover text-white font-black rounded-md text-[10px] uppercase tracking-widest flex items-center gap-2 shadow-md transition-all disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {saving && <Loader2 className="w-4 h-4 animate-spin" />}
          Complete Profile
          <ChevronRight size={18} />
        </button>
      </div>
    </motion.div>
  );
}
