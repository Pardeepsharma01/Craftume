import type { ResumeData, ResumeSection } from "../types/resume.types";

/**
 * Creates a brand new sample resume populated with realistic example content
 * (Personal Info, Summary, Experience, Education, Skills, Projects)
 * demonstrating proper formatting, bullet points, metrics, and quality.
 */
export function createSampleResume(userId: string): ResumeData {
  const now = new Date().toISOString();

  const sampleSections: ResumeSection[] = [
    {
      id: crypto.randomUUID(),
      type: "summary",
      title: "Professional Summary",
      order: 0,
      visible: true,
      data: {
        content:
          "Impact-driven Senior Product Designer with 6+ years of experience crafting intuitive digital experiences for enterprise SaaS and mobile applications. Specialized in end-to-end user research, accessible design systems, and cross-functional team leadership. Proven track record of increasing user engagement by 35% and streamlining design-to-engineering workflows.",
      },
    },
    {
      id: crypto.randomUUID(),
      type: "experience",
      title: "Work Experience",
      order: 1,
      visible: true,
      data: [
        {
          id: crypto.randomUUID(),
          company: "Apex Digital Labs",
          position: "Senior Product Designer",
          location: "San Francisco, CA",
          startDate: "2022-03",
          endDate: "",
          isCurrent: true,
          responsibilities: [
            "Spearheaded the redesign of core SaaS application design system, reducing component development cycles by 40% across 5 feature teams.",
            "Architected and conducted usability research studies with 50+ enterprise clients, driving product decisions that boosted monthly active user retention by 28%.",
            "Mentored 4 junior designers and established design token documentation ensuring WCAG 2.1 AA accessibility compliance across all digital products.",
            "Partnered with product managers and senior engineers to deliver 12+ major feature releases, directly contributing to a 22% increase in annual recurring revenue.",
          ],
          technologies: [
            "Figma",
            "Design Systems",
            "User Research",
            "Prototyping",
            "A/B Testing",
          ],
        },
        {
          id: crypto.randomUUID(),
          company: "Crestview Interactive",
          position: "UX/UI Designer",
          location: "Austin, TX",
          startDate: "2019-06",
          endDate: "2022-02",
          isCurrent: false,
          responsibilities: [
            "Designed end-to-end user flows, interactive wireframes, and high-fidelity prototypes for mobile iOS and Android ecommerce applications.",
            "Collaborated with data analytics team to optimize checkout conversion funnels, resulting in a 15% reduction in shopping cart abandonment.",
            "Created comprehensive UI component kits and interactive micro-animations that elevated brand consistency across all customer touchpoints.",
          ],
          technologies: [
            "Figma",
            "Sketch",
            "Principle",
            "User Testing",
            "HTML/CSS",
          ],
        },
      ],
    },
    {
      id: crypto.randomUUID(),
      type: "education",
      title: "Education",
      order: 2,
      visible: true,
      data: [
        {
          id: crypto.randomUUID(),
          degree: "Bachelor of Science in Human-Computer Interaction",
          institution: "University of California, Berkeley",
          startDate: "2015-08",
          endDate: "2019-05",
          grade: "3.8 GPA (Dean's List)",
        },
      ],
    },
    {
      id: crypto.randomUUID(),
      type: "skills",
      title: "Skills",
      order: 3,
      visible: true,
      data: [
        {
          id: crypto.randomUUID(),
          categoryName: "Design & Strategy",
          skills: [
            "UI/UX Design",
            "Design Systems",
            "User Research",
            "Wireframing",
            "Prototyping",
            "Information Architecture",
          ],
        },
        {
          id: crypto.randomUUID(),
          categoryName: "Tools & Software",
          skills: [
            "Figma",
            "Adobe Creative Cloud",
            "Framer",
            "Principle",
            "Miro",
            "Jira",
          ],
        },
        {
          id: crypto.randomUUID(),
          categoryName: "Technical & Methods",
          skills: [
            "HTML/CSS",
            "Design Tokens",
            "Agile/Scrum",
            "Usability Testing",
            "WCAG Accessibility",
          ],
        },
      ],
    },
    {
      id: crypto.randomUUID(),
      type: "projects",
      title: "Projects",
      order: 4,
      visible: true,
      data: [
        {
          id: crypto.randomUUID(),
          name: "Design System Hub",
          description: [
            "Architected an open-source documentation portal for enterprise UI component libraries, serving 10,000+ monthly developer visits.",
            "Integrated automated WCAG contrast checks and interactive component playground code previews.",
          ],
          technologies: ["Figma", "Framer", "Design Tokens", "Storybook"],
          githubUrl: "github.com/alexmorgan/design-system-hub",
          liveUrl: "designsystemhub.example.com",
        },
        {
          id: crypto.randomUUID(),
          name: "FinanceFlow Mobile App",
          description: [
            "Designed and prototyped a modern mobile expense tracking application emphasizing clean data visualization and intuitive budgeting.",
            "Validated product concepts through 3 rounds of qualitative testing with 25 target users.",
          ],
          technologies: ["iOS", "Figma", "Prototyping", "User Research"],
          githubUrl: "github.com/alexmorgan/finance-flow",
          liveUrl: "financeflow.example.com",
        },
      ],
    },
  ];

  return {
    id: crypto.randomUUID(),
    userId,
    title: "Sample Resume (Alex Morgan)",
    templateId: "modern",
    isSampleData: true,
    personalInfo: {
      fullName: "Alex Morgan",
      email: "alex.morgan@example.com",
      jobTitle: "Senior Product Designer",
      phone: "(555) 234-5678",
      address: "San Francisco, CA",
      linkedin: "linkedin.com/in/alexmorgan",
      github: "github.com/alexmorgan",
      portfolio: "alexmorgan.design",
      website: "alexmorgan.design",
    },
    sections: sampleSections,
    createdAt: now,
    updatedAt: now,
  };
}
