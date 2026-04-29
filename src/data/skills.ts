export type SkillCategory = {
  title: string
  icon: 'core' | 'ai' | 'applied' | 'research'
  summary: string
  skills: string[]
}

export const skillCategories: SkillCategory[] = [
  {
    title: 'Core Technical Stack',
    icon: 'core',
    summary: 'Practical tools for data work, project infrastructure, and reproducible builds.',
    skills: ['Python', 'SQL', 'Git', 'Docker', 'SQLite', 'PostgreSQL', 'PySpark'],
  },
  {
    title: 'AI / ML',
    icon: 'ai',
    summary: 'Practical machine learning, deep learning, and computer vision tooling.',
    skills: [
      'Machine Learning',
      'Deep Learning',
      'Computer Vision',
      'PyTorch',
      'OpenCV',
      'scikit-learn',
      'Pandas',
      'NumPy',
    ],
  },
  {
    title: 'Applied Development',
    icon: 'applied',
    summary: 'Interfaces, backends, demos, and deployable AI applications.',
    skills: ['Django', 'FastAPI', 'Streamlit', 'Backend systems', 'Interactive interfaces'],
  },
  {
    title: 'Research Focus',
    icon: 'research',
    summary: 'Research-oriented habits for applied and healthcare-adjacent AI.',
    skills: [
      'Medical AI',
      'Audio Classification',
      'Speech Processing',
      'Data Analysis',
      'Model Evaluation',
    ],
  },
]

export const stackHighlights = [
  'Research-aware product thinking',
  'Interactive technical storytelling',
  'Medical and speech AI exploration',
  'Practical model evaluation',
  'Backend and frontend experimentation',
  'Data pipeline fundamentals',
]
