import SectionHeader from './ui/SectionHeader'
import BentoTile from './ui/BentoTile'

/**
 * Bento layout — varied tile sizes for visual rhythm.
 * `span` is honored at md+ breakpoints; mobile is a single column stack.
 *
 * Layout intent (md grid is 4 cols):
 *  Row 1:  [ AI 2x2 (featured)              ] [ Programming 1x1 ] [ Databases 1x1 ]
 *  Row 2:  [ AI continues                   ] [ Big Data 2x1                       ]
 *  Row 3:  [ Cloud Platforms 2x1            ] [ DevOps 1x1      ] [ Orchestration 1x1 ]
 *  Row 4:  [ Data Engineering 1x1 ] [ ML 1x1 ] [ Visualization 1x1 ] [ (empty) ]
 */
const tiles = [
  {
    title: 'AI & Generative AI',
    span: '2x2', accent: 'violet', featured: true,
    skills: ['Large Language Models', 'LangChain', 'AI Agents', 'MCP Servers', 'LangGraph', 'AWS Strands', 'Prompt Tuning', 'Agentic Workflows', 'Generative AI'],
  },
  {
    title: 'Programming',
    span: '1x1', accent: 'cyan',
    skills: ['Python', 'SQL', 'PySpark', 'Spark SQL', 'Shell'],
  },
  {
    title: 'Databases',
    span: '1x1', accent: 'cyan',
    skills: ['Snowflake', 'Redshift', 'RDS', 'MySQL', 'DynamoDB', 'MongoDB'],
  },
  {
    title: 'Big Data & Processing',
    span: '2x1', accent: 'cyan',
    skills: ['Databricks', 'Apache Spark', 'Apache Airflow', 'AWS Glue', 'AWS EMR', 'Delta Lake'],
  },
  {
    title: 'Cloud Platforms',
    span: '2x1', accent: 'cyan',
    skills: ['Amazon Web Services (AWS)', 'Google Cloud Platform (GCP)', 'Microsoft Azure'],
  },
  {
    title: 'DevOps & CI/CD',
    span: '1x1', accent: 'cyan',
    skills: ['GitHub Actions', 'Jenkins', 'Terraform', 'Docker', 'Groovy'],
  },
  {
    title: 'Orchestration',
    span: '1x1', accent: 'cyan',
    skills: ['Airflow', 'Step Functions', 'Lambda', 'EventBridge'],
  },
  {
    title: 'Data Engineering',
    span: '1x1', accent: 'cyan',
    skills: ['ETL/ELT', 'Data Lakes', 'Warehousing', 'Modeling', 'Governance'],
  },
  {
    title: 'Machine Learning',
    span: '1x1', accent: 'cyan',
    skills: ['Model Development', 'Feature Engineering', 'Predictive Analytics', 'MLOps'],
  },
  {
    title: 'Visualization',
    span: '1x1', accent: 'cyan',
    skills: ['AWS QuickSight', 'SFMC Dashboards', 'Storytelling'],
  },
]

function SkillChips({ skills, accent }) {
  const chipClass =
    accent === 'violet'
      ? 'text-violet/90 bg-violet/5 border-violet/15 hover:bg-violet/10'
      : 'text-ink-muted bg-white/[0.02] border-white/10 hover:border-violet/30 hover:text-violet'
  return (
    <div className="flex flex-wrap gap-1.5 mt-auto">
      {skills.map((s) => (
        <span
          key={s}
          className={`font-mono text-[10px] px-2.5 py-1 rounded-full border transition-colors duration-300 ${chipClass}`}
        >
          {s}
        </span>
      ))}
    </div>
  )
}

export default function Skills() {
  return (
    <section id="skills" className="section-pad">
      <div className="max-w-[1120px] mx-auto">
        <SectionHeader number="03" title="The toolkit." italicWord="toolkit" />

        <div className="grid grid-cols-1 md:grid-cols-4 md:auto-rows-[180px] gap-4">
          {tiles.map((tile, i) => (
            <BentoTile
              key={tile.title}
              span={tile.span}
              label={tile.title}
              accent={tile.accent}
              featured={tile.featured}
              index={i}
            >
              <SkillChips skills={tile.skills} accent={tile.accent} />
            </BentoTile>
          ))}
        </div>
      </div>
    </section>
  )
}
