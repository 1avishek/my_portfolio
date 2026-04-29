export type Project = {
  title: string
  category: string
  description: string
  tech: string[]
  githubUrl: string
  liveDemoUrl?: string
  accent: 'cyan' | 'violet' | 'emerald' | 'amber'
}

export const projects: Project[] = [
  {
    title: 'Glaucoma Screening CNN',
    category: 'Medical AI / Computer Vision',
    description:
      'CNN-based glaucoma screening system using deep learning and medical image analysis.',
    tech: ['Python', 'CNN', 'Streamlit', 'Deep Learning', 'Medical AI'],
    githubUrl: 'https://github.com/1avishek/glaucoma-screening-cnn.git',
    liveDemoUrl:
      'https://avishek-ananda-glaucoma-screening-cnngit.streamlit.app/',
    accent: 'cyan',
  },
  {
    title: 'Django Chatbot',
    category: 'Web Application / Chatbot',
    description:
      'Django based chatbot application with backend deployment and conversational interaction.',
    tech: ['Django', 'Python', 'Railway', 'Backend Development'],
    githubUrl: 'https://github.com/1avishek/django-chatbot.git',
    liveDemoUrl: 'https://web-production-3887f.up.railway.app/',
    accent: 'violet',
  },
  {
    title: 'Knee Osteoarthritis Classification',
    category: 'Medical AI / Deep Learning',
    description:
      'Deep learning framework for knee osteoarthritis classification using X-ray imaging and KL grading.',
    tech: ['PyTorch', 'ResNet', 'Computer Vision', 'Medical AI'],
    githubUrl: 'https://github.com/1avishek/Knee-Classification.git',
    accent: 'emerald',
  },
  {
    title: 'End-to-End Taxi Fare Prediction Pipeline',
    category: 'Data Engineering / Machine Learning',
    description:
      'End-to-end machine learning and data engineering pipeline using SQL and PySpark.',
    tech: ['SQL', 'PySpark', 'Machine Learning', 'Data Pipeline'],
    githubUrl:
      'https://github.com/1avishek/End-to-End-Taxi-Fare-Prediction-Pipeline-with-SQL-and-PySpark.git',
    accent: 'amber',
  },
]
