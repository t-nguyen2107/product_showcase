import Image from "next/image"
import Link from "next/link"
import { Bot, CheckCircle2, Code2, ExternalLink, Linkedin, Mail, ShieldCheck, Sparkles } from "lucide-react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"

const projectStats = [
  { label: "Real-world flagship systems", value: "2" },
  { label: "Delivery ownership", value: "Solo + AI Coding" },
  { label: "Development acceleration with AI", value: "~60%" },
  { label: "Operational student scale", value: "5,000+" },
  { label: "Financial data accuracy target", value: "100%" },
]

const coreSkills = [
  "Solo End-to-End Delivery",
  "Context-First AI Engineering",
  "Fullstack Architecture Design",
  "High-Concurrency Optimization",
  "Integration Hardening",
  "Documentation-Driven Delivery",
]

const aiEngineeringStack = [
  "Claude Code",
  "GLM Model (Z.AI)",
  "VS Code",
  "Prompt-Refine-Test Loop",
  "Context Files as Source of Truth",
  "AI-Assisted Test Scenario Design",
]

export default function Home() {
  return (
    <main className="relative min-h-screen overflow-hidden bg-background">
      <div className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(circle_at_10%_20%,oklch(0.92_0.08_256.9/.6),transparent_35%),radial-gradient(circle_at_80%_10%,oklch(0.94_0.06_282/.7),transparent_30%),radial-gradient(circle_at_50%_90%,oklch(0.9_0.05_195/.6),transparent_35%)]" />
      <section className="mx-auto flex w-full max-w-6xl flex-col gap-10 px-4 py-10 md:px-8 md:py-14">
        <Card className="border border-border/70 bg-card/90 shadow-xl backdrop-blur-sm">
          <CardHeader className="gap-4">
            <div className="flex flex-wrap items-center justify-between gap-4 rounded-xl border border-border/70 bg-background/80 p-4">
              <div className="flex items-center gap-3">
                <Image
                  src="/projects/thien-nguyen.jpg"
                  alt="Thiện Nguyễn"
                  width={96}
                  height={96}
                  className="size-20 rounded-full border border-border object-cover md:size-24"
                />
                <div className="space-y-0.5">
                  <p className="text-xl font-semibold md:text-2xl">Thiện Nguyễn</p>
                  <p className="text-base text-muted-foreground">Senior Developer</p>
                </div>
              </div>
              <div className="flex flex-wrap items-center gap-2">
                <a
                  href="https://www.linkedin.com/in/thien-nguyen-a6a052116/"
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex h-8 items-center gap-1.5 rounded-lg border border-border bg-background px-2.5 text-xs font-medium text-primary transition-colors hover:bg-muted"
                >
                  <Linkedin className="size-3.5" />
                  LinkedIn
                </a>
                <a
                  href="mailto:t.cnguyen168@gmail.com"
                  className="inline-flex h-8 items-center gap-1.5 rounded-lg border border-border bg-background px-2.5 text-xs font-medium text-primary transition-colors hover:bg-muted"
                >
                  <Mail className="size-3.5" />
                  t.cnguyen168@gmail.com
                </a>
              </div>
            </div>
            <div className="flex flex-wrap items-center justify-between gap-3">
              <span className="inline-flex h-6 items-center rounded-full bg-secondary px-3 text-xs font-medium text-secondary-foreground">
                AI-Augmented Fullstack Engineer
              </span>
              <div className="flex -space-x-2">
                <span className="inline-flex size-7 items-center justify-center rounded-full border border-border bg-background text-xs font-semibold">AI</span>
                <span className="inline-flex size-7 items-center justify-center rounded-full border border-border bg-background text-xs font-semibold">FS</span>
                <span className="inline-flex size-7 items-center justify-center rounded-full border border-border bg-background text-xs font-semibold">UX</span>
              </div>
            </div>
            <CardTitle className="max-w-3xl text-3xl font-semibold tracking-tight md:text-5xl">
              AI-Driven Product Showcase for Fullstack Engineering Roles
            </CardTitle>
            <CardDescription className="max-w-3xl text-base md:text-lg">
              This portfolio presents two production-grade systems: a freight insurance quoting platform and a high-scale tuition management platform. Both projects were delivered solo with AI coding support using a context-first workflow across architecture, implementation, integration, and verification.
            </CardDescription>
          </CardHeader>
          <CardContent className="grid grid-cols-2 gap-3 md:grid-cols-5">
            {projectStats.map((item) => (
              <div key={item.label} className="rounded-xl border border-border/70 bg-background/80 p-4">
                <p className="text-xl font-semibold md:text-2xl">{item.value}</p>
                <p className="text-xs text-muted-foreground md:text-sm">{item.label}</p>
              </div>
            ))}
          </CardContent>
          <CardFooter className="flex flex-wrap items-center justify-between gap-3 border-0 bg-transparent px-4 pb-5">
            <div className="flex flex-wrap items-center gap-2">
              {coreSkills.map((skill) => (
                <span
                  key={skill}
                  className="inline-flex h-6 items-center rounded-full border border-border px-2.5 text-xs text-foreground"
                >
                  {skill}
                </span>
              ))}
            </div>
            <a
              href="#projects"
              className="inline-flex h-8 items-center justify-center rounded-lg bg-primary px-2.5 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
            >
              View Projects
            </a>
          </CardFooter>
        </Card>

        <Card className="border border-border/70 bg-card/90 shadow-xl">
          <CardHeader>
            <CardTitle className="text-xl">AI Engineering Stack</CardTitle>
            <CardDescription>
              Recommended stack for AI Fullstack delivery based on this showcase: coding agents, IDE workflow, and context-driven execution.
            </CardDescription>
          </CardHeader>
          <CardContent className="flex flex-wrap gap-2">
            {aiEngineeringStack.map((item) => (
              <span
                key={item}
                className="inline-flex h-7 items-center rounded-full border border-border bg-background px-3 text-xs font-medium text-foreground"
              >
                {item}
              </span>
            ))}
          </CardContent>
        </Card>

        <Card className="border border-border/70 bg-card/90 shadow-xl">
          <CardHeader>
            <CardTitle className="text-xl">Source Context Documents</CardTitle>
            <CardDescription>
              The original context files are copied into this project so reviewers can inspect the exact source material used to build this showcase.
            </CardDescription>
          </CardHeader>
          <CardContent className="grid gap-3 md:grid-cols-2">
            <Link
              href="/sources/freight"
              className="flex items-center justify-between rounded-xl border border-border bg-background/70 p-4 transition-colors hover:bg-muted/50"
            >
              <div className="space-y-1">
                <p className="text-sm font-semibold">Freight Context (HTML)</p>
                <p className="text-xs text-muted-foreground">Rendered from AI-PRODUCT-SHOWCASE.md</p>
              </div>
              <ExternalLink className="size-4 text-primary" />
            </Link>
            <Link
              href="/sources/tuition"
              className="flex items-center justify-between rounded-xl border border-border bg-background/70 p-4 transition-colors hover:bg-muted/50"
            >
              <div className="space-y-1">
                <p className="text-sm font-semibold">SmartTuition Context (HTML)</p>
                <p className="text-xs text-muted-foreground">Rendered from PRODUCT_SHOWCASE.md</p>
              </div>
              <ExternalLink className="size-4 text-primary" />
            </Link>
          </CardContent>
        </Card>

        <section id="projects" className="grid gap-4">
          <Card className="border border-border/70 bg-card/90 shadow-xl">
              <div className="relative aspect-[16/9] overflow-hidden rounded-t-xl">
                <Image src="/projects/freight-quote.png" alt="Freight insurance quote platform" fill className="object-cover" priority />
              </div>
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-2xl">
                  <ShieldCheck className="size-5 text-primary" />
                  Freight Insurance Quoting System 2026
                </CardTitle>
                <CardDescription>
                  A full rewrite of a complex legacy WordPress plugin into a modular architecture built around Calculators, Processors, and Services. Delivered solo with AI coding support, this platform now supports an end-to-end quote lifecycle from validation and pricing to payment callbacks, PDF generation, and external API synchronization.
                </CardDescription>
              </CardHeader>
              <CardContent className="grid gap-4 md:grid-cols-3">
                <div className="flex flex-wrap items-center gap-3 rounded-xl border border-border/70 bg-background/70 p-4 md:col-span-3">
                  <a
                    href="https://fi.winsols.tech/obtain-a-quote/cargo-transit-insurance/"
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex h-9 items-center gap-2 rounded-lg bg-primary px-3 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
                  >
                    View Live Demo
                    <ExternalLink className="size-4" />
                  </a>
                  <p className="text-xs text-muted-foreground">
                    Source code is private due to client confidentiality and production data policies.
                  </p>
                </div>
                <div className="space-y-2 rounded-xl border border-border/70 bg-background/70 p-4">
                  <p className="flex items-center gap-2 text-sm font-medium"><Sparkles className="size-4 text-primary" /> AI Engineering Workflow</p>
                  <ul className="space-y-1.5 text-sm text-muted-foreground">
                    <li className="flex items-start gap-2"><CheckCircle2 className="mt-0.5 size-4 text-primary" /> Designed task-specific prompt chains for Calculator, Processor, and Service layers with strict context gates from schema and existing rules.</li>
                    <li className="flex items-start gap-2"><CheckCircle2 className="mt-0.5 size-4 text-primary" /> Ran AI-assisted refactoring loops with compatibility checks to preserve legacy behavior while moving to modular PSR-4 architecture.</li>
                    <li className="flex items-start gap-2"><CheckCircle2 className="mt-0.5 size-4 text-primary" /> Enforced verify-first delivery via scenario replay for quote calculation, payment callback, PDF/email output, and API upload consistency.</li>
                  </ul>
                </div>
                <div className="space-y-2 rounded-xl border border-border/70 bg-background/70 p-4">
                  <p className="flex items-center gap-2 text-sm font-medium"><ShieldCheck className="size-4 text-primary" /> Architecture & Integrations</p>
                  <ul className="space-y-1.5 text-sm text-muted-foreground">
                    <li className="flex items-start gap-2"><CheckCircle2 className="mt-0.5 size-4 text-primary" /> PSR-4 autoloading under FIQS namespace with clear module boundaries.</li>
                    <li className="flex items-start gap-2"><CheckCircle2 className="mt-0.5 size-4 text-primary" /> Unified quote pipeline: validate, calculate, persist, issue PDF/email, process callbacks.</li>
                    <li className="flex items-start gap-2"><CheckCircle2 className="mt-0.5 size-4 text-primary" /> Hardened integrations for SecurePay, mPDF/TCPDF, and Insight Insurance API.</li>
                  </ul>
                </div>
                <div className="space-y-2 rounded-xl border border-border/70 bg-background/70 p-4">
                  <p className="flex items-center gap-2 text-sm font-medium"><Code2 className="size-4 text-primary" /> Tech Stack</p>
                  <div className="flex flex-wrap gap-2">
                    {["WordPress", "PHP 8", "MySQL", "SecurePay", "mPDF/TCPDF", "Insight API"].map((tech) => (
                      <span key={tech} className="inline-flex h-6 items-center rounded-full bg-secondary px-2.5 text-xs text-secondary-foreground">{tech}</span>
                    ))}
                  </div>
                </div>
              </CardContent>
          </Card>

          <Card className="border border-border/70 bg-card/90 shadow-xl">
              <div className="relative aspect-[16/9] overflow-hidden rounded-t-xl">
                <Image src="/projects/smart-tuition.png" alt="Smart tuition management dashboard" fill className="object-cover" />
              </div>
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-2xl">
                  <Bot className="size-5 text-primary" />
                  AI-Driven Tuition Management (SmartTuition)
                </CardTitle>
                <CardDescription>
                  An enterprise-grade tuition platform for a major high school in Ho Chi Minh City. Delivered solo with AI coding support, the system is engineered for high-concurrency payment periods, strict accounting integrity, and rapid iterative delivery.
                </CardDescription>
              </CardHeader>
              <CardContent className="grid gap-4 md:grid-cols-3">
                <div className="flex flex-wrap items-center gap-3 rounded-xl border border-border/70 bg-background/70 p-4 md:col-span-3">
                  <p className="text-xs text-muted-foreground">
                    Live demo is not publicly available because the client deployment runs on a local LAN and contains sensitive financial data.
                  </p>
                </div>
                <div className="space-y-2 rounded-xl border border-border/70 bg-background/70 p-4">
                  <p className="flex items-center gap-2 text-sm font-medium"><Sparkles className="size-4 text-primary" /> AI Engineering Workflow</p>
                  <ul className="space-y-1.5 text-sm text-muted-foreground">
                    <li className="flex items-start gap-2"><CheckCircle2 className="mt-0.5 size-4 text-primary" /> Applied an Architect → Prompt → Refine → Validate cycle to speed delivery by around 60% while keeping accounting constraints explicit.</li>
                    <li className="flex items-start gap-2"><CheckCircle2 className="mt-0.5 size-4 text-primary" /> Converted business formulas and edge cases into deterministic AI prompts for debt, receivable, and payment-period exception handling.</li>
                    <li className="flex items-start gap-2"><CheckCircle2 className="mt-0.5 size-4 text-primary" /> Used AI-generated regression scenarios to stress-test high-concurrency payment windows and protect financial accuracy.</li>
                  </ul>
                </div>
                <div className="space-y-2 rounded-xl border border-border/70 bg-background/70 p-4">
                  <p className="flex items-center gap-2 text-sm font-medium"><ShieldCheck className="size-4 text-primary" /> Scale & Reliability</p>
                  <ul className="space-y-1.5 text-sm text-muted-foreground">
                    <li className="flex items-start gap-2"><CheckCircle2 className="mt-0.5 size-4 text-primary" /> Handles high traffic bursts during break-time and monthly payment cycles.</li>
                    <li className="flex items-start gap-2"><CheckCircle2 className="mt-0.5 size-4 text-primary" /> Uses PostgreSQL partitioning and Redis caching for performance at 5,000+ student scale.</li>
                    <li className="flex items-start gap-2"><CheckCircle2 className="mt-0.5 size-4 text-primary" /> Enforces strict financial integrity through transaction-safe data processing.</li>
                  </ul>
                </div>
                <div className="space-y-2 rounded-xl border border-border/70 bg-background/70 p-4">
                  <p className="flex items-center gap-2 text-sm font-medium"><Code2 className="size-4 text-primary" /> Tech Stack</p>
                  <div className="flex flex-wrap gap-2">
                    {["Laravel 10", "React 18", "PostgreSQL 15", "Docker", "Tailwind CSS", "Redis"].map((tech) => (
                      <span key={tech} className="inline-flex h-6 items-center rounded-full bg-secondary px-2.5 text-xs text-secondary-foreground">{tech}</span>
                    ))}
                  </div>
                </div>
              </CardContent>
          </Card>
        </section>
      </section>
    </main>
  )
}
