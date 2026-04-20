import { useEffect, useRef, useState } from 'react'
import { useScroll, useTransform, motion, useInView } from 'framer-motion'
import { GraduationCap } from 'lucide-react'
import SectionHeader from './ui/SectionHeader'

const timelineData = [
  {
    title: 'Deloitte',
    content: {
      role: 'AI Engineer',
      duration: 'Sep 2025 — Present',
      location: 'Bengaluru, India',
      highlights: [
        'Building MCP server marketplace and tooling — designing reusable Model Context Protocol integrations that let enterprise agents plug into internal data, APIs, and tools.',
        'Multi-agent orchestration with LangGraph and AWS Strands — composing collaborating agent graphs (planner → researcher → executor) for complex enterprise workflows.',
        'Building and evaluating AI Agents using multiple agentic workflows and frameworks',
        'Designing and implementing AI agentic workflows for client solutions',
        'Working with Large Language Models (LLMs), LangChain, and Generative AI technologies',
        'Building AI-powered automation pipelines for intelligent decision-making',
      ],
    },
  },
  {
    title: 'Accenture',
    content: {
      role: 'Data Engineering, Management & Governance Analyst',
      duration: 'Jan 2023 — Sep 2024',
      location: 'Bengaluru, India',
      highlights: [
        'Developed and automated ETL pipelines using AWS Glue, EMR, Lambda, EventBridge, Step Functions, and Airflow',
        'Utilized Databricks with PySpark for data aggregation, processing, and building ML models across stock, cricket, and taxi datasets',
        'Optimized data pipelines using Spark SQL for real-time analytics and high-performance querying',
        'Integrated processed data into Snowflake using stored procedures, tasks, functions, and Snowpark Python',
        'Built interactive dashboards and managed Salesforce Marketing Cloud (SFMC) data extensions and automations',
        'Worked with Amazon Redshift and Amazon RDS for large-scale data storage and querying',
        'Managed CI/CD workflows using GitHub Actions, Jenkins, Groovy scripts, and Terraform',
        'Conducted extensive performance tuning and refactored ETL jobs to reduce runtime and cost',
      ],
    },
  },
  {
    title: 'Education',
    content: {
      isEducation: true,
      degree: 'Bachelor of Technology (B.Tech)',
      field: 'Electronics & Communication Engineering',
      institution: 'Sree Vidyanikethan Engineering College, Tirupati',
      duration: 'June 2018 — June 2022',
    },
  },
]

export default function Experience() {
  const sectionRef = useRef(null)
  const timelineRef = useRef(null)
  const [height, setHeight] = useState(0)

  useEffect(() => {
    if (timelineRef.current) {
      const rect = timelineRef.current.getBoundingClientRect()
      setHeight(rect.height)
    }
  }, [])

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start 10%', 'end 50%'],
  })

  const heightTransform = useTransform(scrollYProgress, [0, 1], [0, height])
  const opacityTransform = useTransform(scrollYProgress, [0, 0.1], [0, 1])

  return (
    <section id="experience" className="section-pad" ref={sectionRef}>
      <div className="max-w-[1120px] mx-auto">
        <SectionHeader
          number="02"
          title="Where I have built."
          italicWord="built"
          subtitle="My professional journey in AI & Data engineering."
        />

        <div ref={timelineRef} className="relative pb-10">
          {timelineData.map((item, index) => (
            <TimelineEntry
              key={index}
              title={item.title}
              content={item.content}
              isEducation={item.content.isEducation}
            />
          ))}

          <div
            className="absolute md:left-8 left-8 top-0 overflow-hidden w-[2px] bg-gradient-to-b from-transparent via-white/[0.04] to-transparent"
            style={{
              height: height + 'px',
              maskImage:
                'linear-gradient(to bottom, transparent 0%, black 10%, black 90%, transparent 100%)',
            }}
          >
            <motion.div
              style={{ height: heightTransform, opacity: opacityTransform }}
              className="absolute inset-x-0 top-0 w-[2px] bg-gradient-to-t from-violet via-violet/60 to-transparent rounded-full"
            />
          </div>
        </div>
      </div>
    </section>
  )
}

function TimelineEntry({ title, content, isEducation }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <div ref={ref} className="flex justify-start pt-10 md:pt-20 md:gap-10">
      <div className="sticky flex flex-col md:flex-row z-40 items-center top-40 self-start max-w-xs lg:max-w-sm md:w-full">
        <div className="h-10 absolute left-3 md:left-3 w-10 rounded-full bg-surface flex items-center justify-center">
          <div
            className={`h-4 w-4 rounded-full border ${
              isEducation
                ? 'bg-violet/20 border-violet/40'
                : 'bg-violet/10 border-violet/40'
            }`}
          />
        </div>
        <h3 className="hidden md:block font-display text-3xl md:pl-20 md:text-5xl text-ink/10 tracking-tight">
          {title}
        </h3>
      </div>

      <div className="relative pl-20 pr-4 md:pl-4 w-full">
        <h3 className="md:hidden block font-display text-2xl mb-4 text-ink/15 tracking-tight">
          {title}
        </h3>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="glass p-7"
        >
          {isEducation ? (
            <>
              <div className="flex items-center gap-3 mb-3">
                <div className="w-9 h-9 rounded-lg bg-violet/10 flex items-center justify-center">
                  <GraduationCap size={18} className="text-violet" />
                </div>
                <p className="font-mono text-[11px] text-violet tracking-widest uppercase">
                  {content.duration}
                </p>
              </div>
              <h4 className="font-display text-xl text-ink mb-1">{content.degree}</h4>
              <p className="text-ink-muted text-sm mb-1">{content.field}</p>
              <p className="text-ink-dim text-xs">{content.institution}</p>
            </>
          ) : (
            <>
              <p className="font-mono text-[11px] text-accent tracking-widest uppercase mb-3">
                {content.duration}
              </p>
              <h4 className="font-display text-2xl text-ink mb-1 tracking-tight">{content.role}</h4>
              <p className="font-mono text-[10px] text-ink-dim uppercase tracking-wider mb-5">
                {content.location}
              </p>
              <ul className="space-y-2.5">
                {content.highlights.map((h, i) => (
                  <li key={i} className="text-ink-muted text-sm leading-relaxed flex gap-3">
                    <span className="text-violet/60 mt-1.5 shrink-0 text-[10px]">▸</span>
                    <span>{h}</span>
                  </li>
                ))}
              </ul>
            </>
          )}
        </motion.div>
      </div>
    </div>
  )
}
