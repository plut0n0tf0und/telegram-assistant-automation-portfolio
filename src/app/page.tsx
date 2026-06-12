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

      {/* HR-Friendly Summary / Impact Card */}
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

      {/* Main Centerpiece: n8n JSON Canvas (Workflow Hero Canvas) */}
      <section className="py-2">
        <WorkflowCanvas />
      </section>

      {/* Telegram Experience Demo Section */}
      <section className="flex flex-col gap-6 pt-2">
        <div className="space-y-2 text-center max-w-4xl mx-auto">
          <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-wide">
            Telegram Experience Demo
          </h2>
          <p className="text-base sm:text-[18px] text-gray-300 leading-relaxed">
            Simulated interaction with the live shop bot interface. Click the options below to trigger automated responses.
          </p>
        </div>

        {/* Premium Bezel-less Smartphone Mockup Centered holding TelegramMock */}
        <div className="flex flex-col items-center justify-center w-full relative py-4">
          {/* Interactive Phone Container with Buttons */}
          <div className="relative mx-auto">
            {/* Volume Up Button */}
            <div className="hidden sm:block absolute -left-[14px] top-[120px] w-[4px] h-[45px] bg-[#222] border-r border-[#333] rounded-l-md shadow-lg" />
            {/* Volume Down Button */}
            <div className="hidden sm:block absolute -left-[14px] top-[180px] w-[4px] h-[45px] bg-[#222] border-r border-[#333] rounded-l-md shadow-lg" />
            {/* Action / Power Button */}
            <div className="hidden sm:block absolute -right-[14px] top-[150px] w-[4px] h-[65px] bg-[#222] border-l border-[#333] rounded-r-md shadow-lg" />

            {/* Premium Outer Chassis */}
            <div className="w-[280px] min-[360px]:w-[320px] sm:w-[375px] h-[530px] min-[360px]:h-[600px] sm:h-[670px] bg-[#0c0c0e] border-[8px] min-[360px]:border-[10px] sm:border-[12px] border-[#1e1e22] rounded-[38px] min-[360px]:rounded-[44px] sm:rounded-[52px] shadow-[0_25px_60px_-15px_rgba(0,0,0,0.95)] ring-1 ring-white/10 overflow-hidden relative flex flex-col transition-all duration-300">
              
              {/* Dynamic Island Floating Notch */}
              <div className="absolute top-3.5 left-1/2 -translate-x-1/2 w-[110px] h-[28px] bg-black rounded-full z-45 flex items-center justify-between px-3.5 shadow-inner border border-neutral-900/50 select-none pointer-events-none">
                {/* Camera Lens Reflection */}
                <div className="w-[7px] h-[7px] rounded-full bg-[#141424] border border-[#2d2d3d] shadow-[inset_0_1px_1px_rgba(255,255,255,0.2)]" />
                {/* Green Active Dot */}
                <div className="w-[4px] h-[4px] rounded-full bg-emerald-500/80 animate-pulse shadow-[0_0_4px_rgba(16,185,129,0.8)]" />
              </div>

              {/* Edge-to-edge Screen Container */}
              <div className="w-full h-full bg-[#0e1621] rounded-[30px] min-[360px]:rounded-[34px] sm:rounded-[40px] overflow-hidden flex flex-col relative">
                <TelegramMock />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Execution Flow & Verification Section */}
      <section className="space-y-6 pt-4 max-w-4xl mx-auto w-full">
        <div className="space-y-2 text-center">
          <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-wide">
            Execution Flow & Verification
          </h2>
          <p className="text-base sm:text-[18px] text-gray-300 leading-relaxed">
            Interactive simulation triggers active n8n automation pathways on backend endpoints:
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-6 justify-center max-w-2xl mx-auto pt-2 w-full">
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
      </section>

      {/* Technical Details Section */}
      <section className="space-y-6 pt-4 border-t border-[#262626]">
        <div className="space-y-1">
          <h2 className="text-2xl font-bold text-white tracking-wide">
            Technical Details
          </h2>
          <p className="text-base text-gray-400 leading-relaxed">
            Integration architecture, technology stack, and self-hosted infrastructure details.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="component-card p-6 space-y-3">
            <h3 className="text-lg font-bold text-white">n8n Automation Engine</h3>
            <p className="text-sm text-gray-300 leading-relaxed">
              Self-hosted workflow manager orchestrating chat states, conditional logic, and formatting sheets data.
            </p>
          </div>
          <div className="component-card p-6 space-y-3">
            <h3 className="text-lg font-bold text-white">Telegram Bot API</h3>
            <p className="text-sm text-gray-300 leading-relaxed">
              Real-time webhook integration delivering response payloads to users with sub-150ms latency.
            </p>
          </div>
          <div className="component-card p-6 space-y-3">
            <h3 className="text-lg font-bold text-white">Google Sheets Integration</h3>
            <p className="text-sm text-gray-300 leading-relaxed">
              Utilized as a serverless store database, allowing instant inventory edits without updating backend code.
            </p>
          </div>
          <div className="component-card p-6 space-y-3">
            <h3 className="text-lg font-bold text-white">Next.js & React Showcase</h3>
            <p className="text-sm text-gray-300 leading-relaxed">
              Portfolio landing container featuring interactive n8n JSON canvas parsing and mobile chat simulators.
            </p>
          </div>
          <div className="component-card p-6 space-y-3">
            <h3 className="text-lg font-bold text-white">Docker Infrastructure</h3>
            <p className="text-sm text-gray-300 leading-relaxed">
              Containerized host environment run via Docker Compose on VPS with automated secure SSL reverse-proxy.
            </p>
          </div>
          <div className="component-card p-6 space-y-3">
            <h3 className="text-lg font-bold text-white">JSON Parser Engine</h3>
            <p className="text-sm text-gray-300 leading-relaxed">
              Custom SVG connection routing math that maps 2D coordinates into responsive node graph charts.
            </p>
          </div>
        </div>
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
