import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'
import { GraduationCap } from 'lucide-react'

const experiences = [
  {
    role: 'AI Engineer',
    company: 'Deloitte',
    duration: 'Sep 2024 — Present',
    location: 'Bengaluru, India',
    highlights: [
      'Building and evaluating AI Agents using multiple agentic workflows and frameworks',
      'Developing MCP (Model Context Protocol) servers for enterprise AI integrations',
      'Designing and implementing AI agentic workflows for client solutions',
      'Working with Large Language Models (LLMs), LangChain, and Generative AI technologies',
      'Building AI-powered automation pipelines for intelligent decision-making',
    ],
  },
  {
    role: 'Data Engineering, Management & Governance Analyst',
    company: 'Accenture',
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
]

const education = {
  degree: 'Bachelor of Technology (B.Tech)',
  field: 'Electronics & Communication Engineering',
  institution: 'Sree Vidyanikethan Engineering College, Tirupati',
  duration: 'June 2018 — June 2022',
}

function TimelineCard({ exp, index }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })
  const isLeft = index % 2 === 0

  return (
    <div
      ref={ref}
      className={`relative flex mb-12 last:mb-0 ${
        isLeft ? 'md:flex-row' : 'md:flex-row-reverse'
      }`}
    >
      {/* Timeline node — desktop */}
      <div className="hidden md:block absolute left-1/2 -translate-x-1/2 top-6 w-3 h-3 rounded-full bg-accent shadow-[0_0_12px_rgba(0,212,255,0.5)] z-10" />
      {/* Timeline node — mobile */}
      <div className="md:hidden absolute left-[18px] top-6 w-3 h-3 rounded-full bg-accent shadow-[0_0_12px_rgba(0,212,255,0.5)] z-10" />

      <motion.div
        initial={{ opacity: 0, x: isLeft ? -50 : 50 }}
        animate={inView ? { opacity: 1, x: 0 } : {}}
        transition={{ duration: 0.6, delay: 0.1 }}
        className={`ml-12 md:ml-0 md:w-[calc(50%-40px)] glass glass-hover p-6 ${
          isLeft ? 'md:mr-auto' : 'md:ml-auto'
        }`}
      >
        <p className="text-accent text-xs font-medium tracking-wider uppercase mb-2">
          {exp.duration}
        </p>
        <h3 className="font-heading font-bold text-lg text-white mb-1">
          {exp.role}
        </h3>
        <p className="text-gray-500 text-sm mb-1">{exp.company}</p>
        <p className="text-gray-600 text-xs mb-4">{exp.location}</p>
        <ul className="space-y-2">
          {exp.highlights.map((h, i) => (
            <li
              key={i}
              className="text-gray-400 text-sm leading-relaxed flex gap-2"
            >
              <span className="text-accent mt-1 shrink-0">&#8226;</span>
              {h}
            </li>
          ))}
        </ul>
      </motion.div>
    </div>
  )
}

export default function Experience() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-100px' })
  const eduRef = useRef(null)
  const eduInView = useInView(eduRef, { once: true, margin: '-80px' })

  return (
    <section id="experience" className="section-pad" ref={ref}>
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
        >
          <p className="text-accent font-medium text-sm tracking-[0.2em] uppercase mb-3">
            Experience
          </p>
          <h2 className="font-heading font-bold text-3xl md:text-4xl text-white mb-16">
            Where I&apos;ve worked<span className="text-accent">.</span>
          </h2>
        </motion.div>

        <div className="relative">
          <div className="timeline-line" />

          {experiences.map((exp, i) => (
            <TimelineCard key={i} exp={exp} index={i} />
          ))}

          {/* Education card at bottom of timeline */}
          <div ref={eduRef} className="relative flex mb-0 md:flex-row">
            <div className="hidden md:block absolute left-1/2 -translate-x-1/2 top-6 w-3 h-3 rounded-full bg-purple-400 shadow-[0_0_12px_rgba(168,85,247,0.5)] z-10" />
            <div className="md:hidden absolute left-[18px] top-6 w-3 h-3 rounded-full bg-purple-400 shadow-[0_0_12px_rgba(168,85,247,0.5)] z-10" />

            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={eduInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="ml-12 md:ml-0 md:w-[calc(50%-40px)] glass p-6 border-purple-500/10"
            >
              <div className="flex items-center gap-3 mb-3">
                <div className="w-9 h-9 rounded-lg bg-purple-500/10 flex items-center justify-center">
                  <GraduationCap size={18} className="text-purple-400" />
                </div>
                <p className="text-purple-400 text-xs font-medium tracking-wider uppercase">
                  {education.duration}
                </p>
              </div>
              <h3 className="font-heading font-bold text-lg text-white mb-1">
                {education.degree}
              </h3>
              <p className="text-gray-400 text-sm mb-1">{education.field}</p>
              <p className="text-gray-600 text-xs">{education.institution}</p>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  )
}
