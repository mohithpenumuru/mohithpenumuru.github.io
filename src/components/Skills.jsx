import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'

const skillCategories = [
  {
    title: 'Programming',
    color: 'accent',
    skills: ['Python', 'SQL', 'PySpark', 'Spark SQL', 'Shell Scripting'],
  },
  {
    title: 'Big Data & Processing',
    color: 'accent',
    skills: ['Databricks', 'Apache Spark', 'Apache Airflow', 'AWS Glue', 'AWS EMR', 'Delta Lake'],
  },
  {
    title: 'Cloud Platforms',
    color: 'accent',
    skills: ['Amazon Web Services (AWS)', 'Google Cloud Platform (GCP)', 'Microsoft Azure'],
  },
  {
    title: 'Data Engineering',
    color: 'accent',
    skills: ['ETL/ELT Pipelines', 'Data Lakes', 'Data Warehousing', 'Data Modeling', 'Data Governance'],
  },
  {
    title: 'Databases',
    color: 'accent',
    skills: ['Snowflake', 'Amazon Redshift', 'AWS RDS', 'MySQL', 'DynamoDB', 'MongoDB'],
  },
  {
    title: 'DevOps & CI/CD',
    color: 'accent',
    skills: ['GitHub Actions', 'Jenkins', 'Terraform', 'Groovy Scripting', 'Docker', 'Version Control'],
  },
  {
    title: 'Orchestration',
    color: 'accent',
    skills: ['Apache Airflow', 'AWS Step Functions', 'AWS Lambda', 'EventBridge'],
  },
  {
    title: 'AI & Generative AI',
    color: 'emerald',
    skills: ['Large Language Models', 'LangChain', 'AI Agents', 'MCP Servers', 'Prompt Tuning', 'Agentic Workflows', 'Generative AI'],
  },
  {
    title: 'Machine Learning',
    color: 'emerald',
    skills: ['ML Model Development', 'Feature Engineering', 'Predictive Analytics', 'MLOps'],
  },
  {
    title: 'Visualization',
    color: 'accent',
    skills: ['AWS QuickSight', 'SFMC Dashboards', 'Data-Driven Storytelling'],
  },
]

function SkillCard({ category, index }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-50px' })
  const isAI = category.color === 'emerald'

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay: index * 0.06 }}
      className={`glass p-5 ${isAI ? 'border-emerald-500/10' : ''}`}
    >
      <h3 className="font-heading font-semibold text-white text-base mb-4 flex items-center gap-2">
        <span className={`w-2 h-2 rounded-full ${isAI ? 'bg-emerald-400' : 'bg-accent'}`} />
        {category.title}
      </h3>
      <div className="flex flex-wrap gap-2">
        {category.skills.map((skill, si) => (
          <motion.span
            key={skill}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={inView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.3, delay: index * 0.06 + si * 0.04 }}
            className={`text-xs font-medium px-3 py-1.5 rounded-full border ${
              isAI
                ? 'text-emerald-400/90 bg-emerald-500/5 border-emerald-500/15'
                : 'text-accent/80 bg-accent/5 border-accent/10'
            }`}
          >
            {skill}
          </motion.span>
        ))}
      </div>
    </motion.div>
  )
}

export default function Skills() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-100px' })

  return (
    <section id="skills" className="section-pad" ref={ref}>
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
        >
          <p className="text-accent font-medium text-sm tracking-[0.2em] uppercase mb-3">
            Skills
          </p>
          <h2 className="font-heading font-bold text-3xl md:text-4xl text-white mb-12">
            My toolkit<span className="text-accent">.</span>
          </h2>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {skillCategories.map((cat, i) => (
            <SkillCard key={cat.title} category={cat} index={i} />
          ))}
        </div>
      </div>
    </section>
  )
}
