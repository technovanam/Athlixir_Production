"use client";

import { useState, useEffect, useMemo } from "react";
// useMemo kept for age calculation
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { Lock, ArrowRight } from "lucide-react";
import { Step1 } from "./_components/Step1";
import { Step2 } from "./_components/Step2";
import {
  FormState,
  INITIAL_FORM,
  calculateAge,
} from "./_components/types";

export default function OnboardingPage() {
  const [form, setForm] = useState<FormState>(INITIAL_FORM);
  const [error, setError] = useState("");
  const [saving, setSaving] = useState(false);
  const [step, setStep] = useState(1);

  // Hydrate draft to prevent hydration mismatch
  useEffect(() => {
    const draft = sessionStorage.getItem("athlixir_onboarding_draft");
    if (draft) {
      try { 
        setForm(JSON.parse(draft) as FormState); 
        return;
      } catch {}
    }
    setForm({
      ...INITIAL_FORM,
      name: localStorage.getItem("athlixir_signup_name") || "",
    });
  }, []);

  // Auto-dismiss error
  useEffect(() => {
    if (!error) return;
    const t = setTimeout(() => setError(""), 5000);
    return () => clearTimeout(t);
  }, [error]);

  const age = useMemo(() => calculateAge(form.dateOfBirth), [form.dateOfBirth]);

  function updateField<K extends keyof FormState>(key: K, value: FormState[K]) {
    if (key === "dateOfBirth" && value) {
      const ageNum = parseInt(calculateAge(value as string), 10);
      if (!isNaN(ageNum) && ageNum < 16) {
        setError("You must be at least 16 years old. Date has been reset.");
        setForm((prev) => ({ ...prev, dateOfBirth: "" }));
        return;
      }
    }
    setForm((prev) => {
      const next = { ...prev, [key]: value };
      if (key === "primarySport") next.category = "";
      if (key === "state") { next.district = ""; next.cityTown = ""; }
      if (key === "district") next.cityTown = "";
      if (key === "currentlyTraining" && value === "no") {
        next.currentAcademy = "";
        next.currentCoach = "";
        next.preferredTrainingType = "";
        next.trainingStartYear = "";
        next.trainingDaysPerWeek = "";
      }
      return next;
    });
    setError("");
  }

  function validateStep1(): boolean {
    const checks: [boolean, string][] = [
      [!!form.name.trim(), "Name is required."],
      [!!form.dateOfBirth, "Date of birth is required."],
      [parseInt(age, 10) >= 16, "Age must be at least 16."],
      [!!form.gender, "Gender is required."],
      [!!form.height, "Height is required."],
      [!!form.weight, "Weight is required."],
      [!!form.state, "State is required."],
      [!!form.district, "District is required."],
      [!!form.cityTown.trim(), "City / Town is required."],
      [!!form.profilePhoto, "Profile photo is required."],
    ];
    for (const [valid, msg] of checks) {
      if (!valid) { setError(msg); return false; }
    }
    return true;
  }

  function validateStep2(): boolean {
    const checks: [boolean, string][] = [
      [!!form.primarySport, "Primary sport is required."],
      [!!form.currentLevel, "Athlete level is required."],
    ];
    for (const [valid, msg] of checks) {
      if (!valid) { setError(msg); return false; }
    }
    return true;
  }

  function handleNext() {
    if (validateStep1()) {
      setStep(2);
    }
  }

  async function handleSave() {
    if (!validateStep2()) return;
    setSaving(true);
    try {
      // TODO: wire up your save/API call here
      await new Promise((r) => setTimeout(r, 1000));
      sessionStorage.setItem("athlixir_onboarding_draft", JSON.stringify(form));
      window.location.assign("/terms");
    } catch {
      setError("Failed to save. Please try again.");
    } finally {
      setSaving(false);
    }
  }

  return (
    <div className="relative h-screen w-full flex flex-col items-center justify-center overflow-hidden">

      {/* Background */}
      <div className="absolute inset-0 -z-10">
        <img
          src="https://images.unsplash.com/photo-1517836357463-d25dfeac3438?auto=format&fit=crop&q=80"
          alt=""
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/75" />
        <div className="absolute inset-0 bg-linear-to-t from-black via-transparent to-black/40" />
      </div>

      {/* Back button */}
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        className="absolute top-10 left-6 lg:left-12 z-20"
      >
        <Link
          href="/"
          className="flex items-center gap-2 text-secondary hover:text-white transition-colors text-sm font-bold uppercase tracking-widest"
        >
          <ArrowRight className="rotate-180 text-primary" size={18} />
          Back to Home
        </Link>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, scale: 0.97 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-5xl px-4 md:px-6 relative z-10 flex flex-col max-h-[calc(100vh-4rem)]"
      >
        
        {/* Header */}
        <div className="flex flex-col items-center mb-3 shrink-0">

          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-primary/20 flex items-center justify-center shrink-0">
              <Lock className="w-4 h-4 text-primary" />
            </div>
            <div>
              <h1 className="text-xl md:text-2xl font-black uppercase tracking-tight text-white leading-tight">
                Complete Your Athlete Profile
              </h1>
              <p className="text-[10px] font-bold uppercase tracking-widest text-muted mt-0.5">
                Secured &amp; Verified
              </p>
            </div>
          </div>


        </div>

        {/* Card */}
        <div
          className="bg-black/40 backdrop-blur-3xl border border-white/10 rounded-[3rem] p-4 md:p-6 shadow-lg overflow-y-auto flex-1"
          onFocus={() => setError("")}
        >
          {/* Error banner */}
          <AnimatePresence>
            {error && (
              <motion.div
                key="error"
                initial={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0, marginBottom: 0 }}
                transition={{ duration: 0.25, ease: "easeOut" }}
                className="mb-6 overflow-hidden"
              >
                <div className="p-4 bg-red-500/10 border border-red-500/20 rounded-md text-red-400 text-xs font-bold uppercase tracking-widest text-center">
                  {error}
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          <AnimatePresence mode="wait">
            {step === 1 ? (
              <Step1
                key="step1"
                form={form}
                age={age}
                updateField={updateField}
                saving={saving}
                onNext={handleNext}
              />
            ) : (
              <Step2
                key="step2"
                form={form}
                showDominantHand={false}
                updateField={updateField}
                saving={saving}
                onBack={() => setStep(1)}
                onComplete={handleSave}
              />
            )}
          </AnimatePresence>
        </div>
      </motion.div>
    </div>
  );
}
