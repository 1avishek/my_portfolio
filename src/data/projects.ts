export type Project = {
  title: string
  category: string
  description: string
  supportingLine?: string
  status?: string
  technologies: string[]
  github?: string
  live?: string
  caseStudy?: {
    challenge: string
    built: string[]
    outcome: string
  }
}

export const projects: Project[] = [
  {
    title: 'Finnish Short-Utterance Data Collection and Recognition Pipeline',
    category: 'Speech AI / Audio Classification / Applied Research',
    supportingLine:
      'Completed as my Bachelor’s thesis in Artificial Intelligence at Satakunta University of Applied Sciences (SAMK).',
    description:
      'A speech-AI pipeline for collecting, validating, exporting, loading, and evaluating very short Finnish spoken responses.',
    status: 'Bachelor’s thesis · Case study · No public demo',
    technologies: [
      'Python',
      'Speech Processing',
      'Audio Classification',
      'Dataset Engineering',
      'Model Evaluation',
    ],
    caseStudy: {
      challenge:
        'General speech-to-text systems can struggle with very short responses such as confirmations, yes-or-no answers, and spoken numbers.',
      built: [
        'Browser-based audio collection',
        'Consent and session metadata',
        'Backend validation',
        'Processed-audio storage',
        'Human review workflow',
        'Dataset export tooling',
        'Python data loader',
        'Audio-classification evaluation tooling',
      ],
      outcome:
        'A specialised short-utterance classification approach was compared with a general Whisper speech-to-text baseline. In the limited pilot, Whisper performed best overall. Training augmentation improved the direct classifier, but it did not surpass the baseline.',
    },
  },
  {
    title: 'Glaucoma Screening CNN',
    category: 'Medical AI / Computer Vision',
    description:
      'A CNN-based screening prototype using retinal images to explore deep-learning methods for glaucoma-related image classification.',
    technologies: ['Python', 'CNN', 'Streamlit', 'Medical AI'],
    live: 'https://avishek-ananda-glaucoma-screening-cnngit.streamlit.app/',
    github: 'https://github.com/1avishek/glaucoma-screening-cnn',
  },
  {
    title: 'Django Chatbot',
    category: 'Web Application / Conversational Interface',
    description:
      'A deployed chatbot application combining Django backend logic with a browser-based conversational interface.',
    technologies: ['Python', 'Django', 'Backend Development', 'Railway'],
    github: 'https://github.com/1avishek/django-chatbot',
  },
  {
    title: 'Knee Osteoarthritis Classification',
    category: 'Medical AI / Deep Learning',
    description:
      'A deep-learning project exploring the classification of knee osteoarthritis from medical X-ray images.',
    technologies: ['Python', 'PyTorch', 'Computer Vision', 'Medical AI'],
    github: 'https://github.com/1avishek/Knee-Classification',
  },
  {
    title: 'End-to-End Taxi Fare Prediction Pipeline',
    category: 'Data Engineering / Machine Learning',
    description:
      'A data-processing and machine-learning pipeline for taxi fare prediction using SQL and PySpark.',
    technologies: ['Python', 'SQL', 'PySpark', 'Data Pipelines'],
    github:
      'https://github.com/1avishek/End-to-End-Taxi-Fare-Prediction-Pipeline-with-SQL-and-PySpark',
  },
  {
    title: 'Student Advisor Reinforcement Learning',
    category: 'Reinforcement Learning / Recommendation Systems',
    description:
      'A Python experiment using tabular Q-learning, simulated student and university profiles, epsilon-greedy exploration, and rule-based reward shaping for academic recommendations.',
    technologies: ['Python', 'Q-Learning', 'NumPy', 'Reinforcement Learning', 'Reward Shaping'],
    github: 'https://github.com/1avishek/student-advisor-rl',
  },
  {
    title: 'Sherlock Holmes Semantic Search',
    category: 'Natural Language Processing / Vector Search',
    description:
      'An NLP project that cleans and chunks a Sherlock Holmes text corpus, creates sentence-transformer embeddings, stores them in ChromaDB, and retrieves semantically similar passages.',
    technologies: ['Python', 'LangChain', 'Sentence Transformers', 'ChromaDB', 'Semantic Search'],
    github: 'https://github.com/1avishek/sherlock-holmes-nlp',
  },
]
