// src/data/unifiedPostData.ts
import { PostType, Slide } from "../types/presentation";

// Consolidated post types with template information
export const unifiedPostTypes: (PostType & { templateSlides: Slide[] })[] = [
  {
    id: "research",
    label: "Research Paper",
    name: "Research Paper",
    icon: "🔬",
    color: "slate",
    theme: {
      gradient: "from-slate-600 via-slate-700 to-slate-800",
      accent: "border-slate-300 bg-slate-50",
      text: "text-slate-900",
    },
    description: "Share research findings, papers, or insights",
    template: `🔬 **Research Paper**

**Abstract:**
[Brief summary of your research]

**Key Findings:**
• Finding 1
• Finding 2
• Finding 3

**Methodology:**
[Describe your research approach]

**Conclusion:**
[Main takeaways and implications]
    `,
    templateSlides: [
      {
        id: "research-1",
        layout: "title-content",
        content: {
          title: "Research Overview",
          text: "🎯 Advancing knowledge through rigorous scientific inquiry\n\n📊 This presentation outlines our comprehensive research approach, methodology, and groundbreaking findings that contribute to the academic discourse in our field.\n\n✨ Key highlights include innovative methodologies, robust data analysis, and actionable insights for future research directions."
        },
        theme: "gradient-slate"
      },
      {
        id: "research-2",
        layout: "title-content",
        content: {
          title: "🎯 Research Objectives",
          text: "🔍 Primary Research Question: Define the core hypothesis and research problem\n\n📈 Measurable Objectives: Establish clear, quantifiable goals and success metrics\n\n🌟 Expected Impact: Anticipated contributions to field and practical applications\n\n📋 Scope & Limitations: Define boundaries and acknowledge research constraints\n\n🔗 Stakeholder Value: Benefits for academic community and industry partners"
        },
        theme: "gradient-slate"
      },
      {
        id: "research-3",
        layout: "two-column",
        content: {
          title: "⚙️ Research Methodology",
          text: "📋 **Research Design & Approach**\n\n🔬 Experimental Design\n   • Controlled variables and conditions\n   • Randomization and sampling strategy\n\n📊 Data Collection Methods\n   • Primary data sources and instruments\n   • Secondary data integration\n\n👥 Sample Population\n   • Target demographics and criteria\n   • Sample size calculation and justification",
          text2: "📈 **Analysis Framework**\n\n🧮 Statistical Methods\n   • Descriptive and inferential statistics\n   • Hypothesis testing procedures\n\n✅ Quality Assurance\n   • Validation and reliability measures\n   • Peer review and verification protocols\n\n🔍 Tools & Software\n   • Analysis platforms and instruments\n   • Data visualization techniques"
        },
        theme: "gradient-slate"
      },
      {
        id: "research-4",
        layout: "title-content",
        content: {
          title: "📊 Key Research Findings",
          text: "🎯 **Significant Results & Data Insights**\n\nPresent your breakthrough findings with compelling visualizations:\n\n📈 Statistical significance levels and confidence intervals\n📊 Comparative analysis and trend identification\n💡 Novel discoveries and unexpected outcomes\n🔍 Pattern recognition and correlation analysis\n\n*Interactive charts, graphs, and infographics showcase the depth and impact of your research contributions.*"
        },
        theme: "gradient-slate"
      }
    ]
  },
  {
    id: "question",
    label: "Question",
    name: "Question",
    icon: "❓",
    color: "purple",
    theme: {
      gradient: "from-purple-600 via-purple-700 to-purple-800",
      accent: "border-purple-300 bg-purple-50",
      text: "text-purple-900",
    },
    description: "Ask questions and seek community input",
    template: `❓ **Research Question**

**Question:**
[Your specific question]

**Context:**
[Background information]

**Why it matters:**
[Significance and relevance]

**Looking for:**
[Type of input or expertise needed]
    `,
    templateSlides: [
      {
        id: "question-1",
        layout: "quote",
        content: {
          title: "🤔 Central Research Question",
          quote: "What specific research challenge or intellectual curiosity drives your inquiry and requires the collective wisdom of our academic community?",
          author: "Your Research Focus"
        },
        theme: "gradient-purple"
      },
      {
        id: "question-2",
        layout: "title-content",
        content: {
          title: "📚 Academic Context & Background",
          text: "🎓 **Current State of Knowledge**: Comprehensive review of existing literature and research\n\n🔍 **Research Gap Identification**: Specific areas lacking sufficient investigation or clarity\n\n💡 **Significance & Relevance**: Why this question matters to the broader academic community\n\n📖 **Foundational Studies**: Key research papers and theories that inform this inquiry\n\n🌐 **Interdisciplinary Connections**: How this question bridges multiple fields of study"
        },
        theme: "gradient-purple"
      }
    ]
  },
  {
    id: "collaboration",
    label: "Collaboration",
    name: "Collaboration",
    icon: "🤝",
    color: "green",
    theme: {
      gradient: "from-green-600 via-green-700 to-green-800",
      accent: "border-green-300 bg-green-50",
      text: "text-green-900",
    },
    description: "Propose collaborations and partnerships",
    template: `🤝 **Collaboration Opportunity**

**Project:**
[Project title and overview]

**Looking for:**
[Skills, expertise, or resources needed]

**Timeline:**
[Expected duration and milestones]

**Benefits:**
[What collaborators can expect]
    `,
    templateSlides: [
      {
        id: "collab-1",
        layout: "title-content",
        content: {
          title: "🚀 Project Overview & Vision",
          text: "🌟 **Transformative Research Initiative**\n\nJoin our cutting-edge research project that pushes the boundaries of knowledge and creates meaningful impact in our field.\n\n🎯 **Mission**: Collaborative innovation through interdisciplinary expertise\n📈 **Impact**: Contributing to breakthrough discoveries and academic excellence\n🤝 **Partnership**: Building lasting professional relationships and expanding research networks"
        },
        theme: "gradient-green"
      },
      {
        id: "collab-2",
        layout: "title-content",
        content: {
          title: "🎯 Strategic Goals & Vision",
          text: "🔬 **Primary Objectives**: Clearly defined research goals with measurable outcomes\n\n📊 **Key Deliverables**: Publications, datasets, reports, and innovative solutions\n\n⏰ **Project Timeline**: Structured phases with realistic milestones and deadlines\n\n📈 **Success Metrics**: Quantifiable indicators of progress and achievement\n\n🌍 **Global Impact**: Potential for international recognition and knowledge transfer"
        },
        theme: "gradient-green"
      }
    ]
  },
  {
    id: "announcement",
    label: "Announcement",
    name: "Announcement",
    icon: "📢",
    color: "orange",
    theme: {
      gradient: "from-orange-600 via-orange-700 to-orange-800",
      accent: "border-orange-300 bg-orange-50",
      text: "text-orange-900",
    },
    description: "Make important announcements",
    template: `📢 **Announcement**

**Title:**
[Announcement headline]

**Details:**
[Key information and details]

**Impact:**
[Who this affects and why it matters]

**Next Steps:**
[What people should do]
    `,
    templateSlides: [
      {
        id: "announce-1",
        layout: "title-content",
        content: {
          title: "🚨 Priority Research Update",
          text: "🌟 **Critical Information for Our Research Community**\n\nWe have important updates that will enhance our collaborative research environment and create new opportunities for academic excellence.\n\n📋 **Announcement Type**: [Select from: Policy Update, New Initiative, Event Notice, Deadline Alert, Resource Availability]\n\n🎯 **Community Impact**: This announcement affects our research productivity, collaboration opportunities, and academic success."
        },
        theme: "gradient-orange"
      }
    ]
  },
  {
    id: "discussion",
    label: "Discussion",
    name: "Discussion",
    icon: "💬",
    color: "teal",
    theme: {
      gradient: "from-teal-600 via-teal-700 to-teal-800",
      accent: "border-teal-300 bg-teal-50",
      text: "text-teal-900",
    },
    description: "Start discussions and debates",
    template: `💬 **Discussion Topic**

**Topic:**
[Discussion subject]

**Background:**
[Context and background information]

**Key Questions:**
• Question 1
• Question 2
• Question 3

**Goals:**
[What you hope to achieve]
    `,
    templateSlides: [
      {
        id: "discuss-1",
        layout: "title-content",
        content: {
          title: "💭 Discussion Topic Overview",
          text: "🎯 **Central Discussion Theme**\n\nThis presentation introduces a thought-provoking topic that will benefit from diverse perspectives and collaborative exploration.\n\n💡 **Why This Matters**: The significance of this discussion to our research community\n🤔 **Key Questions**: Primary areas for exploration and debate\n🎪 **Expected Outcomes**: What we hope to achieve through this collaborative dialogue"
        },
        theme: "gradient-teal"
      }
    ]
  },
  {
    id: "dataset",
    label: "Dataset",
    name: "Dataset",
    icon: "📊",
    color: "teal",
    theme: {
      gradient: "from-teal-600 via-teal-700 to-teal-800",
      accent: "border-teal-300 bg-teal-50",
      text: "text-teal-900",
    },
    description: "Share datasets and data resources",
    template: `📊 **Dataset Share**

**Dataset Name:**
[Name of the dataset]

**Description:**
[What the dataset contains]

**Format & Size:**
[File format and data size]

**Access:**
[How to access the data]
    `,
    templateSlides: [
      {
        id: "dataset-1",
        layout: "title-content",
        content: {
          title: "📊 Dataset Introduction",
          text: "🗃️ **Comprehensive Research Dataset**\n\nWe are excited to share a valuable dataset that will advance research in our field and enable new discoveries.\n\n🎯 **Dataset Purpose**: Primary research goals and applications\n📈 **Research Value**: How this data contributes to ongoing academic work\n🌟 **Open Science**: Supporting collaborative research and reproducible findings"
        },
        theme: "gradient-teal"
      }
    ]
  }
];

// Extract just the post types without template slides
export const postTypes: PostType[] = unifiedPostTypes.map(({ templateSlides, ...postType }) => postType);

// Template lookup functions
export const getTemplateByPostType = (postTypeId: string) => {
  const postType = unifiedPostTypes.find(p => p.id === postTypeId);
  return postType ? {
    id: postType.id,
    title: `${postType.icon} ${postType.name} Presentation`,
    description: `Professional template for ${postType.name.toLowerCase()} presentations`,
    slides: postType.templateSlides
  } : null;
};

export const getAllTemplates = () => {
  return unifiedPostTypes.map(postType => ({
    id: postType.id,
    title: `${postType.icon} ${postType.name} Presentation`,
    description: `Professional template for ${postType.name.toLowerCase()} presentations`,
    slides: postType.templateSlides
  }));
};

// Blank template generator
export const createBlankTemplate = (postTypeId?: string) => {
  const postType = unifiedPostTypes.find(p => p.id === postTypeId);
  const color = postType?.color || "blue";
  
  return {
    id: "blank",
    title: "Blank Presentation",
    description: "Start with a clean slate",
    slides: [
      {
        id: "blank-1",
        layout: "title-content" as const,
        content: {
          title: "New Slide",
          text: "Add your content here...",
        },
        theme: `gradient-${color}`,
      },
    ],
  };
};