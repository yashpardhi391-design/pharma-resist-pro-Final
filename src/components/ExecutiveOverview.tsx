import React from "react";
import {
  Shield,
  AlertTriangle,
  HeartPulse,
  Building2,
  ScanLine,
  Sliders,
  FileText,
  KeyRound,
  ArrowRight,
  Sparkles,
  CheckCircle2,
  XCircle,
  Clock,
  Layers,
  Activity,
  Dna,
  ExternalLink,
} from "lucide-react";
import { PatientData, ComparativeDrugRow, AnalysisOutput } from "../types";
import { SAMPLE_SCENARIOS } from "../data/mockData";
import { HostSusceptibilityExplainer } from "./HostSusceptibilityExplainer";
import { PharmaShieldRadarScanner } from "./PharmaShieldRadarScanner";

interface ExecutiveOverviewProps {
  patient1: PatientData;
  patient2: PatientData;
  comparativeRows: ComparativeDrugRow[];
  analysis: AnalysisOutput | null;
  onNavigateTab: (tab: "scanner" | "hospital" | "analytics" | "records") => void;
  onSelectScenario: (scenarioKey: "icuCarbapenem" | "postOpSurgery" | "cityCentralLab") => void;
  onOpenCodeLookup: (code?: string) => void;
}

export const ExecutiveOverview: React.FC<ExecutiveOverviewProps> = ({
  patient1,
  patient2,
  comparativeRows,
  analysis,
  onNavigateTab,
  onSelectScenario,
  onOpenCodeLookup,
}) => {
  const sharedResistantCount = comparativeRows.filter(
    (r) => r.crossCompatibility === "Shared Resistance"
  ).length;

  const sensitiveToBothCount = comparativeRows.filter(
    (r) => r.crossCompatibility === "Sensitive to Both"
  ).length;

  const topCriticalRows = comparativeRows.slice(0, 6);

  return (
    <div className="space-y-6">
      {/* 1. Header Command Strip & Stylish Cyber-Medical Radar Scanner */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left Column: Clinical Surveillance Command Header & KPI Cards */}
        <div className="lg:col-span-7 xl:col-span-8 space-y-6">
          {/* Header Command Strip */}
          <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/90 p-6 shadow-sm dark:shadow-xl relative overflow-hidden transition-colors">
            <div className="absolute top-0 right-0 w-96 h-96 bg-teal-500/5 rounded-full blur-3xl pointer-events-none" />

            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 relative z-10">
              <div>
                <div className="flex items-center space-x-2 text-xs font-mono font-medium text-teal-600 dark:text-teal-400 mb-1.5">
                  <span className="w-2 h-2 rounded-full bg-teal-500 animate-pulse" />
                  <span>ANTI-BACTERIAL RESISTANCE (AMR) SURVEILLANCE &bull; ACTIVE CLINICAL ROUNDS</span>
                </div>
                <h1 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white tracking-tight">
                  Anti-Bacterial Resistance (AMR) &amp; Hospital AST Surveillance
                </h1>
                <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 mt-1 max-w-2xl leading-relaxed">
                  Clinical surveillance platform for tracking <strong>Anti-Bacterial Resistance (AMR)</strong>, multi-drug resistant bacterial superbugs, and cross-resistance between <strong>{patient1.name}</strong> and <strong>{patient2.name}</strong>.
                </p>
              </div>

              {/* Quick Scenario & Verification Pills */}
              <div className="flex flex-wrap items-center gap-2">
                <button
                  onClick={() => onSelectScenario("cityCentralLab")}
                  className="px-3 py-1.5 rounded-lg bg-teal-50 hover:bg-teal-100 dark:bg-teal-950/80 dark:hover:bg-teal-900/80 text-teal-800 dark:text-teal-200 border border-teal-300 dark:border-teal-700 text-xs font-semibold transition-colors cursor-pointer shadow-sm"
                >
                  Load City Central (P-204119)
                </button>
                <button
                  onClick={() => onSelectScenario("icuCarbapenem")}
                  className="px-3 py-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-800 dark:text-slate-200 border border-slate-200 dark:border-slate-700 text-xs font-medium transition-colors cursor-pointer"
                >
                  Load ICU CRE
                </button>
                <button
                  onClick={() => onSelectScenario("postOpSurgery")}
                  className="px-3 py-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-800 dark:text-slate-200 border border-slate-200 dark:border-slate-700 text-xs font-medium transition-colors cursor-pointer"
                >
                  Load Post-Op
                </button>
                <button
                  onClick={() => onOpenCodeLookup(analysis?.uniqueAccessCode)}
                  className="px-3 py-1.5 rounded-lg bg-teal-50 text-teal-800 hover:bg-teal-100 dark:bg-teal-950 dark:text-teal-300 dark:hover:bg-teal-900 border border-teal-200 dark:border-teal-700/60 text-xs font-mono font-bold transition-colors flex items-center space-x-1.5 cursor-pointer shadow-sm"
                >
                  <KeyRound className="w-3.5 h-3.5" />
                  <span>Verify [{analysis?.uniqueAccessCode || "PRP-9021-8842-8801"}]</span>
                </button>
              </div>
            </div>
          </div>

          {/* 2. Executive KPI Cards (Original 4 Cards) */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {/* KPI 1: Active Patients */}
            <div className="rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/60 p-4 space-y-1 shadow-sm transition-colors">
              <div className="flex items-center justify-between text-slate-500 dark:text-slate-400 text-xs">
                <span className="font-mono uppercase font-semibold">Active Patients</span>
                <HeartPulse className="w-4 h-4 text-teal-600 dark:text-teal-400" />
              </div>
              <div className="text-lg font-bold text-slate-900 dark:text-white">2 Patients In Cohort</div>
              <p className="text-[11px] text-slate-500 dark:text-slate-400 truncate">
                {patient1.id} ({patient1.ward}) &bull; {patient2.id} ({patient2.ward})
              </p>
            </div>

            {/* KPI 2: Cross-Resistance Score */}
            <div className="rounded-xl border border-rose-200 dark:border-rose-500/30 bg-white dark:bg-slate-900/60 p-4 space-y-1 shadow-sm transition-colors">
              <div className="flex items-center justify-between text-slate-500 dark:text-slate-400 text-xs">
                <span className="font-mono uppercase font-semibold">Cross-Resistance Overlap</span>
                <AlertTriangle className="w-4 h-4 text-rose-500 dark:text-rose-400" />
              </div>
              <div className="flex items-baseline space-x-2">
                <span className="text-xl font-bold font-mono text-rose-600 dark:text-rose-400">
                  {analysis?.riskScore ?? 84}%
                </span>
                <span className="text-xs font-bold text-rose-800 dark:text-rose-300 px-1.5 py-0.2 rounded bg-rose-100 dark:bg-rose-500/20">
                  {analysis?.riskLevel ?? "High Risk"}
                </span>
              </div>
              <p className="text-[11px] text-slate-500 dark:text-slate-400">
                Compatibility Index: {analysis?.compatibilityPercentage ?? 28}%
              </p>
            </div>

            {/* KPI 3: Concordant Resistance */}
            <div className="rounded-xl border border-amber-200 dark:border-amber-500/30 bg-white dark:bg-slate-900/60 p-4 space-y-1 shadow-sm transition-colors">
              <div className="flex items-center justify-between text-slate-500 dark:text-slate-400 text-xs">
                <span className="font-mono uppercase font-semibold">Shared Resistant Drugs</span>
                <Dna className="w-4 h-4 text-amber-500 dark:text-amber-400" />
              </div>
              <div className="text-lg font-bold font-mono text-amber-600 dark:text-amber-300">
                {sharedResistantCount} Antibiotics Non-Susceptible
              </div>
              <p className="text-[11px] text-slate-500 dark:text-slate-400">
                Pan-beta-lactam &amp; fluoroquinolones invalidated
              </p>
            </div>

            {/* KPI 4: Hospital Cohorting Rule */}
            <div className="rounded-xl border border-teal-200 dark:border-teal-500/30 bg-white dark:bg-slate-900/60 p-4 space-y-1 shadow-sm transition-colors">
              <div className="flex items-center justify-between text-slate-500 dark:text-slate-400 text-xs">
                <span className="font-mono uppercase font-semibold">HICC Ward Directive</span>
                <Building2 className="w-4 h-4 text-teal-600 dark:text-teal-400" />
              </div>
              <div className="text-sm font-bold text-teal-700 dark:text-teal-300 mt-1">
                Spatial Segregation Mandate
              </div>
              <p className="text-[11px] text-slate-500 dark:text-slate-400">
                Protocol 4B: Separate ICU bays required
              </p>
            </div>
          </div>
        </div>

        {/* Right Column: The Stylish Radar Scanner from the reference website */}
        <div className="lg:col-span-5 xl:col-span-4">
          <PharmaShieldRadarScanner
            onScanClick={() => onNavigateTab("scanner")}
            riskLevel={analysis?.riskLevel || "High Risk"}
            riskScore={analysis?.riskScore || 84}
          />
        </div>
      </div>

      {/* 3. Primary Two-Column Command Center */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column: Active Antibiogram Concordance Summary */}
        <div className="lg:col-span-7 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/70 p-6 space-y-4 shadow-sm dark:shadow-xl transition-colors">
          <div className="flex items-center justify-between border-b border-slate-200 dark:border-slate-800 pb-3">
            <div>
              <h2 className="text-base font-bold text-slate-900 dark:text-white flex items-center space-x-2">
                <FileText className="w-4 h-4 text-teal-600 dark:text-teal-400" />
                <span>Antibiogram (AST) Cross-Resistance Profile</span>
              </h2>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Direct antimicrobial susceptibility concordance between isolates.
              </p>
            </div>
            <button
              onClick={() => onNavigateTab("scanner")}
              className="text-xs text-teal-600 dark:text-teal-400 hover:text-teal-700 dark:hover:text-teal-300 font-semibold inline-flex items-center space-x-1 cursor-pointer"
            >
              <span>Workstation</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Quick AST Table */}
          <div className="overflow-x-auto rounded-xl border border-slate-200 dark:border-slate-800">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-50 dark:bg-slate-950 text-slate-600 dark:text-slate-400 border-b border-slate-200 dark:border-slate-800">
                <tr>
                  <th className="py-2.5 px-3 font-semibold">Antibiotic Agent</th>
                  <th className="py-2.5 px-2 font-semibold">{patient1.name}</th>
                  <th className="py-2.5 px-2 font-semibold">{patient2.name}</th>
                  <th className="py-2.5 px-3 font-semibold text-right">Concordance</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200 dark:divide-slate-800/60 text-[11px]">
                {topCriticalRows.map((row) => {
                  const isSharedR = row.crossCompatibility === "Shared Resistance";
                  const isBothS = row.crossCompatibility === "Sensitive to Both";

                  return (
                    <tr key={row.id} className="hover:bg-slate-50 dark:hover:bg-slate-800/40 transition-colors">
                      <td className="py-2 px-3">
                        <span className="font-semibold text-slate-900 dark:text-white">{row.drug}</span>
                        <span className="text-[10px] text-slate-500 dark:text-slate-400 block">{row.drugClass}</span>
                      </td>

                      <td className="py-2 px-2">
                        <span
                          className={`px-1.5 py-0.5 rounded font-mono font-bold text-[10px] ${
                            row.p1Status === "Resistant"
                              ? "bg-rose-100 text-rose-800 dark:bg-rose-500/20 dark:text-rose-300"
                              : row.p1Status === "Sensitive"
                              ? "bg-emerald-100 text-emerald-800 dark:bg-emerald-500/20 dark:text-emerald-300"
                              : "bg-amber-100 text-amber-800 dark:bg-amber-500/20 dark:text-amber-300"
                          }`}
                        >
                          {row.p1Status}
                        </span>
                      </td>

                      <td className="py-2 px-2">
                        <span
                          className={`px-1.5 py-0.5 rounded font-mono font-bold text-[10px] ${
                            row.p2Status === "Resistant"
                              ? "bg-rose-100 text-rose-800 dark:bg-rose-500/20 dark:text-rose-300"
                              : row.p2Status === "Sensitive"
                              ? "bg-emerald-100 text-emerald-800 dark:bg-emerald-500/20 dark:text-emerald-300"
                              : "bg-amber-100 text-amber-800 dark:bg-amber-500/20 dark:text-amber-300"
                          }`}
                        >
                          {row.p2Status}
                        </span>
                      </td>

                      <td className="py-2 px-3 text-right">
                        <span
                          className={`px-2 py-0.5 rounded-full font-mono text-[10px] font-bold ${
                            isSharedR
                              ? "bg-rose-100 text-rose-800 dark:bg-rose-500/20 dark:text-rose-300 border border-rose-300 dark:border-rose-500/40"
                              : isBothS
                              ? "bg-emerald-100 text-emerald-800 dark:bg-emerald-500/20 dark:text-emerald-300 border border-emerald-300 dark:border-emerald-500/40"
                              : "bg-cyan-100 text-cyan-800 dark:bg-cyan-500/20 dark:text-cyan-300 border border-cyan-300 dark:border-cyan-500/40"
                          }`}
                        >
                          {row.crossCompatibility}
                        </span>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>

          {/* Quick Stats Footer */}
          <div className="flex flex-wrap items-center justify-between text-xs text-slate-500 dark:text-slate-400 pt-1">
            <span>
              Showing top 6 critical agents of {comparativeRows.length} evaluated
            </span>
            <span className="text-emerald-600 dark:text-emerald-400 font-medium">
              {sensitiveToBothCount} Effective Alternative(s) Available
            </span>
          </div>
        </div>

        {/* Right Column: Hospital Clinical Suite & HICC Actions */}
        <div className="lg:col-span-5 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/70 p-6 space-y-4 shadow-sm dark:shadow-xl flex flex-col justify-between transition-colors">
          <div className="space-y-4">
            <div className="flex items-center justify-between border-b border-slate-200 dark:border-slate-800 pb-3">
              <div>
                <h2 className="text-base font-bold text-slate-900 dark:text-white flex items-center space-x-2">
                  <Building2 className="w-4 h-4 text-teal-600 dark:text-teal-400" />
                  <span>Hospital Clinical Suite</span>
                </h2>
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  Official pathology slips, HICC directives &amp; scenario simulator.
                </p>
              </div>
              <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-amber-100 dark:bg-amber-500/20 text-amber-800 dark:text-amber-300 border border-amber-300 dark:border-amber-500/40">
                ICU Ward Active
              </span>
            </div>

            {/* Pathogen & Ward Card */}
            <div className="space-y-2 text-xs">
              <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 flex items-center justify-between">
                <div>
                  <span className="text-[10px] text-slate-500 dark:text-slate-400 block font-mono">PATIENT 1 &bull; {patient1.ward}</span>
                  <span className="font-bold text-slate-900 dark:text-white">{patient1.pathogen}</span>
                </div>
                <span className="px-2 py-0.5 rounded bg-rose-100 dark:bg-rose-500/20 text-rose-800 dark:text-rose-300 font-mono font-bold text-[10px]">
                  KPC-3+
                </span>
              </div>

              <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 flex items-center justify-between">
                <div>
                  <span className="text-[10px] text-slate-500 dark:text-slate-400 block font-mono">PATIENT 2 &bull; {patient2.ward}</span>
                  <span className="font-bold text-slate-900 dark:text-white">{patient2.pathogen}</span>
                </div>
                <span className="px-2 py-0.5 rounded bg-rose-100 dark:bg-rose-500/20 text-rose-800 dark:text-rose-300 font-mono font-bold text-[10px]">
                  CRAB MDR
                </span>
              </div>
            </div>

            {/* Recommended Action Summary */}
            <div className="p-3.5 rounded-xl bg-teal-50 dark:bg-teal-950/30 border border-teal-200 dark:border-teal-500/30 text-xs text-slate-700 dark:text-slate-200 space-y-1.5">
              <div className="flex items-center space-x-1.5 text-teal-700 dark:text-teal-400 font-semibold text-xs">
                <CheckCircle2 className="w-4 h-4 text-teal-600 dark:text-teal-400" />
                <span>Primary Salvage Line Selected</span>
              </div>
              <p className="text-[11px] text-slate-600 dark:text-slate-300 leading-relaxed">
                Ceftazidime-Avibactam (Avycaz) 2.5g IV q8h extended 3-hour infusion with renal dose adjustment for {patient1.name} (eGFR: {patient1.clinicalParams?.bloodReport.eGfr || 42} mL/min).
              </p>
            </div>
          </div>

          {/* Navigation Action Buttons */}
          <div className="pt-2 grid grid-cols-1 sm:grid-cols-2 gap-2.5">
            <button
              onClick={() => onNavigateTab("hospital")}
              className="w-full px-4 py-2.5 rounded-xl bg-teal-600 hover:bg-teal-500 text-white font-bold text-xs flex items-center justify-center space-x-2 transition-colors shadow-sm cursor-pointer"
            >
              <Building2 className="w-3.5 h-3.5" />
              <span>Open Hospital Suite</span>
            </button>

            <button
              onClick={() => onNavigateTab("scanner")}
              className="w-full px-4 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-800 dark:text-white font-semibold text-xs flex items-center justify-center space-x-2 transition-colors border border-slate-200 dark:border-slate-700 cursor-pointer"
            >
              <ScanLine className="w-3.5 h-3.5 text-teal-600 dark:text-teal-400" />
              <span>Full Workstation</span>
            </button>
          </div>
        </div>
      </div>

      {/* 4. Anti-Bacterial Resistance (AMR) Core Framework & Academic Viva Reference */}
      <div className="rounded-2xl border border-teal-200 dark:border-teal-500/30 bg-white dark:bg-slate-900/80 p-6 space-y-6 shadow-sm dark:shadow-xl transition-colors">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-200 dark:border-slate-800 pb-4">
          <div>
            <div className="flex items-center space-x-2 text-xs font-mono text-teal-600 dark:text-teal-400 font-bold uppercase mb-1">
              <Dna className="w-4 h-4 text-teal-600 dark:text-teal-400" />
              <span>Academic Curriculum &bull; Clinical Microbiology &bull; WHO Global Action Plan</span>
            </div>
            <h2 className="text-base sm:text-lg font-bold text-slate-900 dark:text-white tracking-tight">
              Anti-Bacterial Resistance (AMR) Mechanisms &amp; Stewardship Framework
            </h2>
          </div>
          <span className="px-2.5 py-1 rounded-full text-xs font-mono font-semibold bg-teal-100 dark:bg-teal-500/10 text-teal-800 dark:text-teal-300 border border-teal-200 dark:border-teal-500/30 self-start sm:self-center">
            ICMR &bull; CDC &bull; WHO Aligned
          </span>
        </div>

        {/* 4 Core Biochemical Resistance Mechanisms */}
        <div>
          <h3 className="text-xs font-mono font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300 mb-3">
            1. The 4 Primary Biochemical Mechanisms of Bacterial Resistance
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-950/80 border border-slate-200 dark:border-slate-800 space-y-2">
              <div className="flex items-center space-x-2 text-rose-600 dark:text-rose-400 text-xs font-bold font-mono">
                <span className="w-5 h-5 rounded bg-rose-100 dark:bg-rose-500/20 flex items-center justify-center text-[10px]">M1</span>
                <span>Enzymatic Inactivation</span>
              </div>
              <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                Bacteria produce enzymes that chemically hydrolyze or modify the antibiotic molecule before it reaches its target.
              </p>
              <div className="text-[11px] font-mono text-slate-600 dark:text-slate-400 bg-white dark:bg-slate-900 p-2 rounded border border-slate-200 dark:border-slate-800">
                <strong className="text-rose-700 dark:text-rose-300">Examples:</strong> Beta-lactamases, ESBLs (CTX-M), Carbapenemases (KPC, NDM-1, OXA-48).
              </div>
            </div>

            <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-950/80 border border-slate-200 dark:border-slate-800 space-y-2">
              <div className="flex items-center space-x-2 text-amber-600 dark:text-amber-400 text-xs font-bold font-mono">
                <span className="w-5 h-5 rounded bg-amber-100 dark:bg-amber-500/20 flex items-center justify-center text-[10px]">M2</span>
                <span>Target Site Modification</span>
              </div>
              <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                Chromosomal mutations or acquisition of foreign genes alter the binding site, reducing antibiotic affinity.
              </p>
              <div className="text-[11px] font-mono text-slate-600 dark:text-slate-400 bg-white dark:bg-slate-900 p-2 rounded border border-slate-200 dark:border-slate-800">
                <strong className="text-amber-700 dark:text-amber-300">Examples:</strong> PBP2a in MRSA (mecA gene), DNA gyrase mutations (gyrA/parC in Quinolones).
              </div>
            </div>

            <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-950/80 border border-slate-200 dark:border-slate-800 space-y-2">
              <div className="flex items-center space-x-2 text-teal-600 dark:text-cyan-400 text-xs font-bold font-mono">
                <span className="w-5 h-5 rounded bg-teal-100 dark:bg-cyan-500/20 flex items-center justify-center text-[10px]">M3</span>
                <span>Membrane Impermeability</span>
              </div>
              <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                Downregulation or loss of outer membrane protein (porin) channels prevents hydrophilic drugs from entering the bacterial periplasm.
              </p>
              <div className="text-[11px] font-mono text-slate-600 dark:text-slate-400 bg-white dark:bg-slate-900 p-2 rounded border border-slate-200 dark:border-slate-800">
                <strong className="text-teal-700 dark:text-cyan-300">Examples:</strong> OmpK35/36 loss in Klebsiella, OprD downregulation in Pseudomonas.
              </div>
            </div>

            <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-950/80 border border-slate-200 dark:border-slate-800 space-y-2">
              <div className="flex items-center space-x-2 text-purple-600 dark:text-purple-400 text-xs font-bold font-mono">
                <span className="w-5 h-5 rounded bg-purple-100 dark:bg-purple-500/20 flex items-center justify-center text-[10px]">M4</span>
                <span>Active Efflux Pumps</span>
              </div>
              <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                Energy-dependent transport complexes actively pump antibiotics out of the bacterial cell, keeping internal concentrations sub-lethal.
              </p>
              <div className="text-[11px] font-mono text-slate-600 dark:text-slate-400 bg-white dark:bg-slate-900 p-2 rounded border border-slate-200 dark:border-slate-800">
                <strong className="text-purple-700 dark:text-purple-300">Examples:</strong> MexAB-OprM, AcrAB-TolC multidrug resistance efflux systems.
              </div>
            </div>
          </div>
        </div>

        {/* WHO ESKAPE Pathogens & AWaRe Stewardship */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 pt-2">
          {/* ESKAPE Superbugs Box */}
          <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-950/80 border border-slate-200 dark:border-slate-800 space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-mono font-bold text-rose-600 dark:text-rose-400 uppercase">
                2. WHO Priority ESKAPE Bacterial Pathogens
              </span>
              <span className="text-[10px] font-mono text-slate-500 dark:text-slate-400">Critical Nosocomial Threats</span>
            </div>
            <p className="text-xs text-slate-600 dark:text-slate-300">
              The ESKAPE group represents the leading cause of nosocomial (hospital-acquired) infections capable of "escaping" conventional biocidal antibiotics:
            </p>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 text-[11px]">
              <div className="p-2 rounded bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800">
                <strong className="text-slate-900 dark:text-white block font-mono">E</strong>
                <span className="text-slate-500 dark:text-slate-400">Enterococcus faecium (VRE)</span>
              </div>
              <div className="p-2 rounded bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800">
                <strong className="text-slate-900 dark:text-white block font-mono">S</strong>
                <span className="text-slate-500 dark:text-slate-400">Staph aureus (MRSA)</span>
              </div>
              <div className="p-2 rounded bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800">
                <strong className="text-slate-900 dark:text-white block font-mono">K</strong>
                <span className="text-teal-700 dark:text-teal-300">Klebsiella pneumoniae</span>
              </div>
              <div className="p-2 rounded bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800">
                <strong className="text-slate-900 dark:text-white block font-mono">A</strong>
                <span className="text-teal-700 dark:text-teal-300">Acinetobacter baumannii</span>
              </div>
              <div className="p-2 rounded bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800">
                <strong className="text-slate-900 dark:text-white block font-mono">P</strong>
                <span className="text-slate-500 dark:text-slate-400">Pseudomonas aeruginosa</span>
              </div>
              <div className="p-2 rounded bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800">
                <strong className="text-slate-900 dark:text-white block font-mono">E</strong>
                <span className="text-slate-500 dark:text-slate-400">Enterobacter spp.</span>
              </div>
            </div>
          </div>

          {/* WHO AWaRe Classification */}
          <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-950/80 border border-slate-200 dark:border-slate-800 space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-mono font-bold text-teal-700 dark:text-teal-400 uppercase">
                3. WHO AWaRe Antibiotic Classification
              </span>
              <span className="text-[10px] font-mono text-slate-500 dark:text-slate-400">Stewardship Guidance</span>
            </div>
            <div className="space-y-2 text-xs">
              <div className="flex items-start space-x-2.5 p-2 rounded bg-emerald-50 dark:bg-emerald-950/20 border border-emerald-200 dark:border-emerald-500/20">
                <span className="px-1.5 py-0.5 rounded font-mono font-bold text-[10px] bg-emerald-100 dark:bg-emerald-500/20 text-emerald-800 dark:text-emerald-300 shrink-0">
                  ACCESS
                </span>
                <span className="text-[11px] text-slate-700 dark:text-slate-300">
                  First/second-choice empiric drugs with low resistance potential (e.g. Amoxicillin, Doxycycline). Target: &gt;60% of total hospital usage.
                </span>
              </div>

              <div className="flex items-start space-x-2.5 p-2 rounded bg-amber-50 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-500/20">
                <span className="px-1.5 py-0.5 rounded font-mono font-bold text-[10px] bg-amber-100 dark:bg-amber-500/20 text-amber-800 dark:text-amber-300 shrink-0">
                  WATCH
                </span>
                <span className="text-[11px] text-slate-700 dark:text-slate-300">
                  Higher resistance risk, prioritized for specific indications (e.g. Ciprofloxacin, Ceftriaxone, Meropenem). Requires strict audit.
                </span>
              </div>

              <div className="flex items-start space-x-2.5 p-2 rounded bg-rose-50 dark:bg-rose-950/20 border border-rose-200 dark:border-rose-500/20">
                <span className="px-1.5 py-0.5 rounded font-mono font-bold text-[10px] bg-rose-100 dark:bg-rose-500/20 text-rose-800 dark:text-rose-300 shrink-0">
                  RESERVE
                </span>
                <span className="text-[11px] text-slate-700 dark:text-slate-300">
                  "Last-resort" salvage antibiotics for confirmed MDR/XDR infections (e.g. Ceftazidime-Avibactam, Colistin). Mandatory pre-authorization.
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 5. Why Does a Bacteria Harm Person 1 But NOT Person 2? (Host-Pathogen Triad) */}
      <HostSusceptibilityExplainer
        patient1={patient1}
        patient2={patient2}
      />
    </div>
  );
};
