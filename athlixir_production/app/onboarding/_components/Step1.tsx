"use client";

import { useRef, useState } from "react";
import { motion } from "framer-motion";
import { User, ChevronRight, Loader2 } from "lucide-react";
import { FieldLabel, SectionCard, inputCls, StyledSelect } from "./shared";
import { DatePicker } from "./DatePicker";
import { FormState, BLOOD_GROUPS, INDIAN_STATES, STATE_DISTRICTS, DISTRICT_CITIES, SPORTS_LIST, SPORT_CATEGORIES, CURRENT_LEVELS } from "./types";

// ---------------------------------------------------------------------------
// Named export: Personal Info Step (used by onboarding/page.tsx)
// ---------------------------------------------------------------------------

interface Step1Props {
  form: FormState;
  age: string;
  updateField: <K extends keyof FormState>(key: K, value: FormState[K]) => void;
  saving: boolean;
  onNext: () => void;
}

export function Step1({ form, age, updateField, saving, onNext }: Step1Props) {
  const fileRef = useRef<HTMLInputElement>(null);
  const [photoError, setPhotoError] = useState("");
  const [fileKey, setFileKey] = useState(0);

  function handlePhotoChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;

    function reject(msg: string) {
      setPhotoError(msg);
      setFileKey((k) => k + 1);
      updateField("profilePhoto", "");
    }

    // 1. Extension check
    const name = file.name.toLowerCase();
    if (!name.endsWith(".jpg") && !name.endsWith(".jpeg")) {
      reject("The image needs to be in JPG.");
      return;
    }

    // 2. Size check
    if (file.size > 10 * 1024 * 1024) {
      reject("Upload image less than 10 MB.");
      return;
    }

    // 3. Magic bytes check — real JPEG always starts with FF D8 FF
    const headerReader = new FileReader();
    headerReader.onload = (evt) => {
      const buf = evt.target?.result as ArrayBuffer;
      const bytes = new Uint8Array(buf);
      if (bytes[0] !== 0xFF || bytes[1] !== 0xD8 || bytes[2] !== 0xFF) {
        reject("The image needs to be in JPG.");
        return;
      }
      // Read full file as base64 so it survives sessionStorage serialization
      const base64Reader = new FileReader();
      base64Reader.onload = (e) => {
        setPhotoError("");
        updateField("profilePhoto", e.target?.result as string);
      };
      base64Reader.readAsDataURL(file);
    };
    headerReader.readAsArrayBuffer(file.slice(0, 4));
  }

  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 20 }}
      className="space-y-4"
    >
      <SectionCard icon={<User size={18} className="text-primary" />} title="Personal Information">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">

          {/* Name */}
          <div>
            <FieldLabel>
              Full Name{" "}
              <span className="text-primary uppercase font-bold">(auto-filled from signup)</span>
            </FieldLabel>
            <input
              type="text"
              className={`${inputCls} cursor-not-allowed opacity-60`}
              placeholder="John Doe"
              value={form.name}
              readOnly
              tabIndex={-1}
              suppressHydrationWarning
            />
          </div>

          {/* Date of Birth */}
          <div>
            <FieldLabel>
              Date of Birth <span className="text-primary">(locked after save)</span>
            </FieldLabel>
            <DatePicker
              value={form.dateOfBirth}
              onChange={(val) => updateField("dateOfBirth", val)}
              maxDate={new Date()}
            />
          </div>

          {/* Age */}
          <div>
            <FieldLabel>Age <span className="text-primary">(auto)</span></FieldLabel>
            <input
              type="text"
              className={`${inputCls} cursor-not-allowed text-muted`}
              value={age}
              readOnly
              placeholder="—"
              suppressHydrationWarning
            />
          </div>

          {/* Gender */}
          <div>
            <FieldLabel>Gender</FieldLabel>
            <StyledSelect
              value={form.gender}
              onChange={(e) => updateField("gender", e.target.value)}
            >
              <option value="">Select</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
              <option value="Other">Other</option>
            </StyledSelect>
          </div>

          {/* Nationality */}
          <div>
            <FieldLabel>Nationality</FieldLabel>
            <div className={`${inputCls} cursor-not-allowed flex items-center gap-2`}>
              <span className="font-semibold text-sm">
  <span className="text-primary">IN</span>
</span>
              <span className="font-semibold text-sm">
               INDIAN
              </span>
            </div>
          </div>

          {/* Height */}
          <div>
            <FieldLabel>Height (cm)</FieldLabel>
            <input
             
              min="0"
              className={inputCls}
              placeholder="175"
              value={form.height}
              onChange={(e) => updateField("height", e.target.value)}
              suppressHydrationWarning
            />
          </div>

          {/* Weight */}
          <div>
            <FieldLabel>Weight (kg)</FieldLabel>
            <input
              
              min="0"
              className={inputCls}
              placeholder="70"
              value={form.weight}
              onChange={(e) => updateField("weight", e.target.value)}
              suppressHydrationWarning
            />
          </div>

          {/* Blood Group */}
          <div>
            <FieldLabel>Blood Group</FieldLabel>
            <StyledSelect
              value={form.bloodGroup}
              onChange={(e) => updateField("bloodGroup", e.target.value)}
            >
              <option value="">Select</option>
              {BLOOD_GROUPS.map((b) => (
                <option key={b} value={b}>{b}</option>
              ))}
            </StyledSelect>
          </div>

          {/* State */}
          <div>
            <FieldLabel>State</FieldLabel>
            <StyledSelect
              value={form.state}
              onChange={(e) => updateField("state", e.target.value)}
            >
              <option value="">Select</option>
              {INDIAN_STATES.map((s) => (
                <option key={s} value={s}>{s}</option>
              ))}
            </StyledSelect>
          </div>

          {/* District */}
          <div>
            <FieldLabel>District</FieldLabel>
            {form.state && STATE_DISTRICTS[form.state] ? (
              <StyledSelect
                value={form.district}
                onChange={(e) => updateField("district", e.target.value)}
                disabled={!form.state}
              >
                <option value="">Select district</option>
                {(STATE_DISTRICTS[form.state] ?? []).map((d) => (
                  <option key={d} value={d}>{d}</option>
                ))}
              </StyledSelect>
            ) : (
              <input
                type="text"
                className={`${inputCls} cursor-not-allowed opacity-50`}
                placeholder="Select a state first"
                readOnly
                suppressHydrationWarning
              />
            )}
          </div>

          {/* City / Town */}
          <div>
            <FieldLabel>City / Town</FieldLabel>
            {form.district && DISTRICT_CITIES[form.district] ? (
              <StyledSelect
                value={form.cityTown}
                onChange={(e) => updateField("cityTown", e.target.value)}
                disabled={!form.district}
              >
                <option value="">Select city / town</option>
                {(DISTRICT_CITIES[form.district] ?? []).map((c) => (
                  <option key={c} value={c}>{c}</option>
                ))}
              </StyledSelect>
            ) : (
              <input
                type="text"
                className={`${inputCls} ${!form.district ? "cursor-not-allowed opacity-50" : ""}`}
                placeholder={form.district ? "Enter city / town" : "Select a district first"}
                readOnly={!form.district}
                value={form.cityTown}
                onChange={(e) => !form.district ? undefined : updateField("cityTown", e.target.value)}
                suppressHydrationWarning
              />
            )}
          </div>

          {/* Profile Photo */}
          <div>
            <FieldLabel>Profile Photo</FieldLabel>
            <input
              key={fileKey}
              ref={fileRef}
              type="file"
              accept="image/jpeg,.jpg,.jpeg"
              onChange={handlePhotoChange}
              className={`${inputCls} file:mr-3 file:py-1 file:px-3 file:rounded-none file:border-0 file:text-xs file:font-bold file:uppercase file:tracking-widest file:bg-primary/20 file:text-primary hover:file:bg-primary/30 cursor-pointer`}
              suppressHydrationWarning
            />
            {photoError && (
              <p className="mt-1 text-[11px] text-red-400 font-semibold">{photoError}</p>
            )}
          </div>

        </div>
      </SectionCard>

      <div className="flex justify-end">
        <button
          type="button"
          onClick={onNext}
          disabled={saving}
          className="px-8 py-4 bg-primary hover:bg-primary-hover text-white font-black rounded-md text-[10px] uppercase tracking-widest flex items-center gap-2 shadow-md transition-all disabled:opacity-50 disabled:cursor-not-allowed"
          suppressHydrationWarning
        >
          {saving && <Loader2 className="w-4 h-4 animate-spin" />}
          Save & Continue
          <ChevronRight size={18} />
        </button>
      </div>
    </motion.div>
  );
}
