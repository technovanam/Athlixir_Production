"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { Shield, Check, Zap, Play } from "lucide-react";
import { useState, useRef, useEffect } from "react";

export default function HeroSection() {

  const videoRef = useRef<HTMLVideoElement>(null);

  return (
    <section 
      id="home" 
      className="relative h-screen w-full flex items-center justify-center overflow-hidden bg-background"
      aria-label="Hero section with video background"
    >
      {/* Background Video - Optimized for Instant Render */}
      <div className="absolute inset-0 z-0">
        <video
          ref={videoRef}
          className="absolute inset-0 w-full h-full object-cover"
          src="/Hero Section.mp4"
          autoPlay
          loop
          muted
          playsInline
          preload="auto"
          poster="/window.svg"
          aria-hidden="true"
        />
        <div className="absolute inset-0 bg-black/60" />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-black/40" />
      </div>

      {/* Optimized Floating Cards */}
      <motion.div
        initial={{ opacity: 0, x: -50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
        className="hidden xl:flex absolute left-6 xl:left-12 top-[30%] z-30 flex-col p-4 rounded-2xl bg-white/5 backdrop-blur-xl border border-white/10 shadow-2xl w-56"
        role="complementary"
        aria-label="Scouting reach statistics"
      >
        <div className="flex items-center space-x-2 mb-3">
          <Zap className="w-3 h-3 text-primary" aria-hidden="true" />
          <span className="text-[10px] uppercase tracking-widest text-secondary font-bold">Scouting Reach</span>
        </div>

        <div className="flex items-center justify-between mb-3 pb-3 border-b border-white/5">
          <div className="flex flex-col">
            <span className="text-xl font-bold text-muted leading-none">12%</span>
            <span className="text-[8px] uppercase tracking-wider text-muted font-bold">Manual Profile</span>
          </div>
          <div className="w-8 h-4 bg-white/5 rounded-full relative" role="progressbar" aria-valuenow={12} aria-valuemin={0} aria-valuemax={100}>
            <div className="absolute left-1 top-1 w-2 h-2 bg-white/30 rounded-full" />
          </div>
        </div>

        <div className="flex items-center justify-between">
          <div className="flex flex-col">
            <span className="text-xl font-bold text-primary leading-none">94%</span>
            <span className="text-[8px] uppercase tracking-wider text-white font-bold">Athlixir Powered</span>
          </div>
          <div className="w-8 h-4 bg-primary/20 rounded-full relative" role="progressbar" aria-valuenow={94} aria-valuemin={0} aria-valuemax={100}>
            <div className="absolute right-1 top-1 w-2 h-2 bg-primary rounded-full shadow-[0_0_8px_rgba(255,87,34,0.6)]" />
          </div>
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, x: 50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 1, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
        className="hidden xl:flex absolute right-6 xl:right-12 bottom-[25%] z-30 flex-col items-center p-6 rounded-3xl bg-white/5 backdrop-blur-xl border border-white/10 shadow-2xl w-56"
        role="complementary"
        aria-label="Verified athlete ID status"
      >
        <div className="flex items-center space-x-2 mb-6 self-start">
          <div className="p-1 bg-primary/20 rounded-full">
            <Check className="w-3 h-3 text-primary" aria-hidden="true" />
          </div>
          <span className="text-[10px] uppercase tracking-widest text-secondary font-bold">Verified Athlete ID</span>
        </div>

        <div className="relative" aria-hidden="true">
          {[...Array(6)].map((_, i) => (
            <motion.div
              key={i}
              animate={{ scale: [1, 1.5, 1], opacity: [0.3, 0.6, 0.3] }}
              transition={{ duration: 2 + (i % 2), repeat: Infinity, delay: i * 0.3 }}
              className="absolute w-1 h-1 bg-primary rounded-full"
              style={{
                top: `${Math.sin(i * 60) * 40 + 40}%`,
                left: `${Math.cos(i * 60) * 40 + 40}%`,
              }}
            />
          ))}
          <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center relative z-10">
            <div className="w-14 h-14 bg-gradient-to-br from-primary to-[#E64A19] rounded-full flex items-center justify-center shadow-[0_0_20px_rgba(255,87,34,0.4)]">
              <Shield className="w-7 h-7 text-white" fill="white" aria-hidden="true" />
            </div>
          </div>
        </div>
      </motion.div>

      {/* Main Content */}
      <div className="relative z-20 container mx-auto px-6 lg:px-12 flex flex-col items-center justify-center h-full text-white text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="px-5 py-2 rounded-full border border-primary/30 bg-primary/10 text-[11px] font-bold uppercase tracking-[0.25em] mb-10 text-primary backdrop-blur-sm"
        >
          AI-Powered Athlete Ecosystem
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          className="text-4xl md:text-6xl lg:text-7xl font-bold leading-[1.1] mb-8 max-w-4xl tracking-tight"
        >
          Your Talent. <span className="text-secondary">Your Data.</span>
          <br />
          <span className="text-primary">Your Future.</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          className="text-base md:text-lg text-white/70 max-w-2xl mb-12 leading-relaxed font-light"
        >
          Empowering grassroots athletes with verified digital profiles,<br />
          injury tracking, performance analytics, and real career opportunities.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
          className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-5"
        >
          <Link
            href="/signup"
            className="group px-10 py-4 bg-primary text-white font-bold rounded-full hover:bg-primary-hover transition-all shadow-[0_0_20px_rgba(255,87,34,0.4)] text-sm uppercase tracking-widest hover:scale-105 flex items-center justify-center focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 focus:ring-offset-background"
            aria-label="Sign up to get started with Athlixir"
          >
            <span>Get Started</span>
          </Link>
          <Link
            href="/login"
            className="px-10 py-4 bg-white/5 backdrop-blur-md border border-white/20 text-white font-bold rounded-full hover:bg-white hover:text-black transition-all text-sm uppercase tracking-widest hover:scale-105 flex items-center justify-center focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-background"
            aria-label="Explore the Athlixir platform"
          >
            Explore Platform
          </Link>
        </motion.div>
      </div>
    </section>
  );
}