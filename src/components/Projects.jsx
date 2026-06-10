import { motion, useInView } from 'framer-motion'
import { useRef, useState } from 'react'
import { ExternalLink, Github, ChevronRight } from 'lucide-react'
import SectionHeader from './ui/SectionHeader'
import MetricBadge from './ui/MetricBadge'
import TiltCard from './ui/TiltCard'

/**
 * Headline metrics — placeholder values approved in spec §3.7.
 * Mohith to confirm or replace before publishing.
 */
const projects = [
  {
    title: 'Enterprise Data Engineering Platform',
    metric: { value: '60% ↓', label: 'runtime reduction' },
    description:
      'Designed scalable ETL pipelines using Talend and AWS Glue to ingest data into AWS S3 and Delta Lake. Used PySpark on Databricks for distributed data transformation and ML-based analytics.',
    tech: ['Databricks', 'PySpark', 'AWS', 'Talend', 'Snowflake', 'Airflow'],
    github: '#',
    live: null,
    pipeline: {
      label: 'Data Pipeline Flow',
      stages: [
        { name: 'Sources', color: 'bg-amber-500/80' },
        { name: 'S3 / Delta Lake', color: 'bg-orange-500/80' },
        { name: 'PySpark Transform', color: 'bg-violet' },
        { name: 'Snowflake', color: 'bg-accent' },
        { name: 'Analytics', color: 'bg-emerald-500/80' },
      ],
    },
  },
  {
    title: 'Predictive Analytics Platform',
    metric: { value: '3 domains', label: 'modeled' },
    description:
      'Built ML models on Databricks to forecast trends in stock prices, player performance, and taxi demand. Stored analytics-ready datasets in Snowflake with interactive QuickSight dashboards.',
    tech: ['ML', 'Databricks', 'PySpark', 'Snowflake', 'AWS QuickSight'],
    github: '#',
    live: null,
    pipeline: {
      label: 'Medallion Architecture',
      stages: [
        { name: 'Raw Data', color: 'bg-gray-500' },
        { name: 'Bronze', color: 'bg-amber-700/80' },
        { name: 'Silver', color: 'bg-gray-400' },
        { name: 'Gold', color: 'bg-yellow-500/80' },
        { name: 'ML / Dashboards', color: 'bg-emerald-500/80' },
      ],
    },
  },
  {
    title: 'Data Platform CI/CD & Infra Automation',
    metric: { value: '100%', label: 'infra as code' },
    description:
      'Created automated CI/CD pipelines using GitHub Actions and Jenkins for Databricks notebooks and infrastructure updates. Used Terraform to provision AWS resources.',
    tech: ['Terraform', 'GitHub Actions', 'Jenkins', 'Groovy', 'AWS'],
    github: '#',
    live: null,
    pipeline: {
      label: 'CI/CD Pipeline',
      stages: [
        { name: 'Code Push', color: 'bg-gray-500' },
        { name: 'GitHub Actions', color: 'bg-violet' },
        { name: 'Terraform Plan', color: 'bg-violet/70' },
        { name: 'Deploy', color: 'bg-accent' },
        { name: 'Monitor', color: 'bg-emerald-500/80' },
      ],
    },
  },
  {
    title: 'AI Agents & MCP Server Development',
    metric: { value: '4+ agents', label: 'in production' },
    description:
      'Building enterprise AI agents using multiple agentic workflows and frameworks at Deloitte. Developing MCP servers for seamless AI integrations and optimizing agent performance.',
    tech: ['Python', 'LangChain', 'LLMs', 'MCP Protocol', 'Agentic Frameworks'],
    github: '#',
    live: null,
    pipeline: {
      label: 'Agentic Workflow',
      stages: [
        { name: 'User Input', color: 'bg-gray-500' },
        { name: 'LangChain', color: 'bg-emerald-600/80' },
        { name: 'LLM', color: 'bg-violet' },
        { name: 'MCP Server', color: 'bg-accent' },
        { name: 'Response', color: 'bg-emerald-500/80' },
      ],
    },
  },
]

function PipelineViz({ pipeline, active }) {
  return (
    <div className={`overflow-hidden transition-all duration-500 ease-in-out ${
      active ? 'max-h-40 opacity-100 mt-5' : 'max-h-0 opacity-0 mt-0'
    }`}>
      <p className="font-mono text-[10px] text-ink-dim uppercase tracking-[0.2em] mb-3">
        {pipeline.label}
      </p>
      <div className="flex items-center gap-1">
        {pipeline.stages.map((stage, i) => (
          <div key={stage.name} className="flex items-center gap-1 flex-1 min-w-0">
            <div className="flex-1 min-w-0">
              <div className={`h-1.5 rounded-full ${stage.color} flow-dot`} style={{ animationDelay: `${i * 0.4}s` }} />
              <p className="font-mono text-[9px] text-ink-dim mt-1.5 truncate">{stage.name}</p>
            </div>
            {i < pipeline.stages.length - 1 && (
              <ChevronRight size={10} className="text-ink-faint shrink-0 -mt-3" />
            )}
          </div>
        ))}
      </div>
    </div>
  )
}

function ProjectCard({ project, index }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })
  const [showPipeline, setShowPipeline] = useState(false)

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 32 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="h-full"
      onMouseEnter={() => setShowPipeline(true)}
      onMouseLeave={() => setShowPipeline(false)}
    >
      <TiltCard maxTilt={5} className="glass project-glow p-7 flex flex-col group h-full">
      <div className="flex items-start justify-between mb-5">
        <MetricBadge value={project.metric.value} label={project.metric.label} />
        <button
          onClick={() => setShowPipeline(!showPipeline)}
          className={`font-mono text-[10px] uppercase tracking-[0.2em] px-2.5 py-1 rounded-full border transition-all duration-300 ${
            showPipeline
              ? 'text-violet border-violet/30 bg-violet/10'
              : 'text-ink-dim border-white/5 hover:border-violet/20 hover:text-ink-muted'
          }`}
        >
          Pipeline
        </button>
      </div>

      <h3 className="font-display text-2xl text-ink mb-3 tracking-tight group-hover:text-violet transition-colors duration-300">
        {project.title}
      </h3>

      <p className="text-ink-muted text-sm leading-relaxed mb-4 flex-1">
        {project.description}
      </p>

      <PipelineViz pipeline={project.pipeline} active={showPipeline} />

      <div className="flex flex-wrap gap-1.5 mb-5 mt-4">
        {project.tech.map((t) => (
          <span key={t} className="font-mono text-[10px] text-ink-muted bg-white/[0.02] border border-white/10 px-2.5 py-1 rounded-full">
            {t}
          </span>
        ))}
      </div>

      <div className="flex items-center gap-4">
        {project.github && project.github !== '#' && (
          <a href={project.github} target="_blank" rel="noopener noreferrer" className="text-ink-dim hover:text-violet transition-colors" aria-label="View source code">
            <Github size={18} />
          </a>
        )}
        {project.live && (
          <a href={project.live} target="_blank" rel="noopener noreferrer" className="text-ink-dim hover:text-violet transition-colors" aria-label="View live demo">
            <ExternalLink size={18} />
          </a>
        )}
      </div>
      </TiltCard>
    </motion.div>
  )
}

export default function Projects() {
  return (
    <section id="projects" className="section-pad">
      <div className="max-w-[1120px] mx-auto">
        <SectionHeader
          number="05"
          title="Selected work."
          italicWord="work"
          subtitle="Hover or tap Pipeline to see the architecture flow."
        />

        <div className="grid md:grid-cols-2 gap-6">
          {projects.map((project, i) => (
            <ProjectCard key={project.title} project={project} index={i} />
          ))}
        </div>
      </div>
    </section>
  )
}
