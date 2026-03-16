import { access, readFile } from "node:fs/promises"
import path from "node:path"
import Link from "next/link"
import { notFound } from "next/navigation"
import { ArrowLeft } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { markdownToHtml } from "@/lib/markdown-to-html"

const sourceMap = {
  freight: {
    fileName: "AI-PRODUCT-SHOWCASE.md",
    title: "Freight Insurance Quoting System Context",
  },
  tuition: {
    fileName: "PRODUCT_SHOWCASE.md",
    title: "SmartTuition Product Showcase Context",
  },
  "freight-full-context": {
    fileName: "FULL_CONTEXT.md",
    title: "Freight FULL_CONTEXT",
  },
  "tuition-ai-context": {
    fileName: "AI_CONTEXT.md",
    title: "SmartTuition AI_CONTEXT",
  },
} as const

type SourceSlug = keyof typeof sourceMap

type SourcePageProps = {
  params: Promise<{
    slug: string
  }>
}

async function removeMissingMarkdownLinks(markdown: string, filePath: string) {
  const linkPattern = /\[([^\]]+)\]\(([^)]+)\)/g
  const fileDirectory = path.dirname(filePath)

  const replacements = await Promise.all(
    Array.from(markdown.matchAll(linkPattern)).map(async (match) => {
      const fullMatch = match[0]
      const label = match[1]
      const rawTarget = match[2].trim()
      const cleanTarget = rawTarget.split("#")[0].split("?")[0]

      if (!cleanTarget || cleanTarget.startsWith("http://") || cleanTarget.startsWith("https://")) {
        return [fullMatch, fullMatch] as const
      }

      if (cleanTarget.startsWith("mailto:") || cleanTarget.startsWith("#")) {
        return [fullMatch, fullMatch] as const
      }

      if (cleanTarget.startsWith("/sources/")) {
        const slug = cleanTarget.replace("/sources/", "")
        return [fullMatch, slug in sourceMap ? fullMatch : label] as const
      }

      if (cleanTarget.startsWith("/")) {
        return [fullMatch, label] as const
      }

      const targetPath = path.resolve(fileDirectory, cleanTarget)
      try {
        await access(targetPath)
        return [fullMatch, fullMatch] as const
      } catch {
        return [fullMatch, label] as const
      }
    })
  )

  let result = markdown
  for (const [original, replacement] of replacements) {
    result = result.replace(original, replacement)
  }

  return result
}

export default async function SourcePage({ params }: SourcePageProps) {
  const { slug } = await params
  if (!(slug in sourceMap)) notFound()

  const sourceSlug = slug as SourceSlug
  const source = sourceMap[sourceSlug]
  const filePath = path.join(process.cwd(), "public", "context", source.fileName)
  let markdown = await readFile(filePath, "utf8")

  if (sourceSlug === "freight") {
    markdown = markdown.replace(
      /(\*\*Primary Context File:\*\*)\s*`[^`]+`/g,
      "$1 [View full AI CONTEXT here](/sources/freight-full-context)"
    )
  }

  if (sourceSlug === "tuition") {
    markdown = markdown.replace(
      /view\s+\[AI_CONTEXT\.md\]\(\.\/AI_CONTEXT\.md\)\./gi,
      "[View full AI CONTEXT here](/sources/tuition-ai-context)."
    )
  }

  markdown = await removeMissingMarkdownLinks(markdown, filePath)

  const html = markdownToHtml(markdown)

  return (
    <main className="min-h-screen bg-background px-4 py-8 md:px-8 md:py-12">
      <section className="mx-auto flex w-full max-w-5xl flex-col gap-4">
        <Link
          href="/"
          className="inline-flex w-fit items-center gap-2 rounded-lg border border-border bg-background px-3 py-1.5 text-sm font-medium transition-colors hover:bg-muted"
        >
          <ArrowLeft className="size-4" />
          Back to showcase
        </Link>

        <Card className="border border-border/70 bg-card/90 shadow-xl">
          <CardHeader className="gap-2">
            <CardTitle className="text-2xl md:text-3xl">{source.title}</CardTitle>
          </CardHeader>
          <CardContent>
            <article
              className="[&_a]:text-primary [&_a]:underline [&_a]:underline-offset-4 [&_blockquote]:border-l-4 [&_blockquote]:border-primary [&_blockquote]:pl-4 [&_blockquote]:text-muted-foreground [&_code]:rounded [&_code]:bg-muted [&_code]:px-1 [&_code]:py-0.5 [&_h1]:mb-4 [&_h1]:text-3xl [&_h1]:font-semibold [&_h2]:mb-3 [&_h2]:mt-8 [&_h2]:text-2xl [&_h2]:font-semibold [&_h3]:mb-2 [&_h3]:mt-6 [&_h3]:text-xl [&_h3]:font-semibold [&_hr]:my-6 [&_li]:leading-relaxed [&_ol]:mb-4 [&_ol]:list-decimal [&_ol]:space-y-1 [&_ol]:pl-6 [&_p]:mb-4 [&_p]:leading-relaxed [&_pre]:mb-4 [&_pre]:overflow-x-auto [&_pre]:rounded-lg [&_pre]:border [&_pre]:border-border [&_pre]:bg-muted/70 [&_pre]:p-4 [&_pre_code]:bg-transparent [&_pre_code]:p-0 [&_pre_code]:font-mono [&_pre_code]:text-sm [&_strong]:font-semibold [&_table]:mb-4 [&_table]:w-full [&_table]:border-collapse [&_table]:overflow-hidden [&_table]:rounded-lg [&_td]:border [&_td]:border-border [&_td]:px-3 [&_td]:py-2 [&_th]:border [&_th]:border-border [&_th]:bg-muted/60 [&_th]:px-3 [&_th]:py-2 [&_th]:text-left [&_th]:font-semibold [&_ul]:mb-4 [&_ul]:list-disc [&_ul]:space-y-1 [&_ul]:pl-6"
              dangerouslySetInnerHTML={{ __html: html }}
            />
          </CardContent>
        </Card>
      </section>
    </main>
  )
}
