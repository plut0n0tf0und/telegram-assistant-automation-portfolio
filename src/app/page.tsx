"use client";

import React from "react";
import WorkflowCanvas from "../components/WorkflowCanvas";
import TelegramMock from "../components/TelegramMock";
import { 
  ArrowLeft, 
  Cpu, 
  ArrowSquareOut,
  Lightning,
  Table,
  Globe,
  Check
} from "@phosphor-icons/react";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen bg-[#050505] text-[#f3f4f6] font-sans antialiased px-4 sm:px-8 pt-20 pb-10 sm:pt-24 max-w-7xl mx-auto space-y-12 relative">
      
      {/* Outbound Back Button (Top-Left of Page - scrolls away naturally) */}
      <a 
        href="https://github.com/plut0n0tf0und" 
        target="_blank" 
        rel="noopener noreferrer" 
        className="absolute top-4 left-4 sm:top-6 sm:left-6 z-50 resume-link-btn text-base py-2.5 px-5 bg-black/70 backdrop-blur-md border border-neutral-800 text-white rounded-full hover:bg-white hover:text-black transition-all flex items-center gap-2 shadow-lg"
      >
        <ArrowLeft className="w-5 h-5" />
        <span>Back to Portfolio</span>
      </a>

      {/* Top Header */}
      <header className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 pt-4 pb-8 border-b border-[#262626]">
        <div className="space-y-2">
          <div className="flex items-center gap-2 text-sm font-mono text-gray-500 uppercase tracking-widest">
            <Cpu className="w-4.5 h-4.5" />
            <span>Workflow Automation Project</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-white">
            n8n Telegram Bot & Sheets Integration
          </h1>
        </div>
      </header>

      {/* HR-Friendly Summary / Impact Card (Project Overview) */}
      <section className="component-card p-8 sm:p-10 flex flex-col lg:flex-row justify-between gap-8">
        <div className="space-y-4 lg:max-w-3xl">
          <div className="flex items-center gap-2.5">
            <span className="w-2.5 h-2.5 rounded-full bg-sky-500" />
            <h3 className="text-base font-bold text-white uppercase tracking-wider">
              Project Overview
            </h3>
          </div>
          <p className="text-base sm:text-[17px] text-gray-300 leading-relaxed">
            A self-hosted Telegram assistant that enables customers to browse product inventories and check pricing in real-time. The bot is fully automated using an n8n workflow and uses Google Sheets as a live database, allowing store owners to edit products instantly without code.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row lg:flex-col gap-6 justify-center shrink-0 border-t lg:border-t-0 lg:border-l border-[#262626] pt-6 lg:pt-0 lg:pl-8">
          <div className="flex items-center gap-3">
            <Lightning weight="duotone" className="w-6 h-6 text-white shrink-0" />
            <span className="text-base text-gray-300 leading-normal">
              <strong>Instant Answers:</strong> Replies delivered in under 150ms.
            </span>
          </div>
          <div className="flex items-center gap-3">
            <Table weight="duotone" className="w-6 h-6 text-gray-300 shrink-0" />
            <span className="text-base text-gray-300 leading-normal">
              <strong>Easy Updates:</strong> Managed via simple Google Sheets.
            </span>
          </div>
          <div className="flex items-center gap-3">
            <Globe weight="duotone" className="w-6 h-6 text-gray-400 shrink-0" />
            <span className="text-base text-gray-300 leading-normal">
              <strong>Self-Hosted:</strong> Deployed secure on custom n8n.
            </span>
          </div>
        </div>
      </section>

      {/* Interactive Telegram Demo (Moved higher) */}
      <section className="flex flex-col gap-10 pt-6">
        {/* Full-width block */}
        <div className="space-y-6 text-center max-w-4xl mx-auto">
          <div className="space-y-3">
            <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-wide">
              Execution Flow & Verification
            </h2>
            <p className="text-base sm:text-[18px] text-gray-300 leading-relaxed">
              When a user interacts with the Telegram chat interface below, it triggers the active n8n automation workflow in real-time:
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-6 justify-center max-w-2xl mx-auto pt-2">
            <div className="flex items-center gap-2.5 text-left bg-neutral-950 border border-[#262626] rounded-xl p-4 flex-1">
              <Check className="w-5 h-5 text-neutral-400 shrink-0 mt-0.5" />
              <span className="text-base text-gray-300">
                <strong className="text-white">Instant Data Lookup:</strong> Reads spreadsheet items and formats a clean reply.
              </span>
            </div>
            <div className="flex items-center gap-2.5 text-left bg-neutral-950 border border-[#262626] rounded-xl p-4 flex-1">
              <Check className="w-5 h-5 text-neutral-400 shrink-0 mt-0.5" />
              <span className="text-base text-gray-300">
                <strong className="text-white">Smart Routing:</strong> Routes orders and tickets automatically via logic branches.
              </span>
            </div>
          </div>
        </div>

        {/* Premium Bezel-less Smartphone Mockup Centered holding TelegramMock */}
        <div className="flex flex-col items-center justify-center w-full relative py-6">
          <div className="w-full text-center mb-6">
            <h4 className="text-xs sm:text-sm font-mono text-gray-500 uppercase tracking-wider">
              Simulated Interaction Verification
            </h4>
          </div>
          
          {/* Interactive Phone Container with Buttons */}
          <div className="relative mx-auto w-full flex justify-center">
            {/* Volume Up Button (hidden on mobile to prevent overflow) */}
            <div className="hidden sm:block absolute left-[calc(50%-202px)] top-[120px] w-[4px] h-[45px] bg-[#222] border-r border-[#333] rounded-l-md shadow-lg z-10" />
            {/* Volume Down Button (hidden on mobile to prevent overflow) */}
            <div className="hidden sm:block absolute left-[calc(50%-202px)] top-[180px] w-[4px] h-[45px] bg-[#222] border-r border-[#333] rounded-l-md shadow-lg z-10" />
            {/* Action / Power Button (hidden on mobile to prevent overflow) */}
            <div className="hidden sm:block absolute right-[calc(50%-202px)] top-[150px] w-[4px] h-[65px] bg-[#222] border-l border-[#333] rounded-r-md shadow-lg z-10" />

            {/* Simple & Premium Smartphone Mockup Chassis */}
            <div className="phone-container-frame mx-auto">
              {/* Dynamic Island Floating Notch */}
              <div className="absolute top-3.5 left-1/2 -translate-x-1/2 w-[110px] h-[28px] bg-black rounded-full z-45 flex items-center justify-between px-3.5 shadow-inner border border-neutral-950 select-none pointer-events-none">
                {/* Camera Lens Reflection */}
                <div className="w-[7px] h-[7px] rounded-full bg-[#141424] border border-[#2d2d3d] shadow-[inset_0_1px_1px_rgba(255,255,255,0.2)]" />
                {/* Green Active Dot */}
                <div className="w-[4px] h-[4px] rounded-full bg-emerald-500/80 animate-pulse shadow-[0_0_4px_rgba(16,185,129,0.8)]" />
              </div>

              {/* Edge-to-edge Screen Container */}
              <div className="w-full h-full rounded-[30px] overflow-hidden flex flex-col relative">
                <TelegramMock />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Main Centerpiece: n8n JSON Canvas */}
      <section className="space-y-6">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="space-y-1">
            <h2 className="text-xl sm:text-2xl font-extrabold tracking-[-0.03em] text-white">
              n8n Active Workflow Canvas
            </h2>
            <p className="text-sm text-[var(--color-on-surface-variant)] leading-relaxed">
              Interactive structural layout parsed directly from the production n8n JSON file. Pan/Zoom to explore.
            </p>
          </div>
          <span className="text-xs sm:text-sm font-mono text-gray-400 bg-neutral-900 border border-neutral-850 px-4 py-1.5 rounded-full flex items-center gap-2 shrink-0 select-none">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            36 Nodes Rendered
          </span>
        </div>

        <WorkflowCanvas />
      </section>

      {/* Footer (Left or right aligned text layout only in mobile views) */}
      <footer className="pt-10 pb-6 border-t border-[#262626] flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4 sm:gap-6 text-sm text-gray-500 font-mono">
        <span className="text-left">Portfolio Showcase Workflow App</span>
        <div className="flex flex-wrap items-center gap-x-6 gap-y-2 justify-end sm:justify-start">
          <span>Built with Next.js & Tailwind</span>
          <span>•</span>
          <a 
            href="https://github.com/plut0n0tf0und" 
            target="_blank" 
            rel="noopener noreferrer" 
            className="hover:text-white transition-colors flex items-center gap-1.5"
          >
            <span>Developer Source</span>
            <ArrowSquareOut className="w-4 h-4" />
          </a>
        </div>
      </footer>
    </div>
  );
}
