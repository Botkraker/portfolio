/**
 * Single source of truth for every word and link on the site.
 * Sections render from here so copy never drifts between components.
 */

const base = import.meta.env.BASE_URL;
export const asset = (p) => `${base}${p.replace(/^\//, "")}`;

export const profile = {
  firstName: "Yassine",
  lastName: "Ben Sassi",
  eyebrow: "Portfolio — 2026",
  role: "Software Engineer building AI and data systems, heading toward Data Science.",
  location: "Final-year Computer Engineering student in Tunisia.",
  seeking:
    "Open to remote and international Data Science, AI, and Data Engineering internships.",
  email: "yassine.bensassi@fsb.ucar.tn",
  github: "https://github.com/Botkraker",
  linkedin: "https://www.linkedin.com/",
  resume: asset("assets/Yassine_Ben_Sassi_CV.pdf"),
};

export const nav = [
  { id: "about", label: "About" },
  { id: "experience", label: "Experience" },
  { id: "now", label: "Currently" },
  { id: "projects", label: "Projects" },
  { id: "skills", label: "Skills" },
  { id: "contact", label: "Contact" },
];

export const about = {
  kicker: "01 — About",
  heading: "Software engineering, applied to AI and data.",
  lede: "I build systems end to end, from real-time data pipelines to LLM applications with retrieval, and I'm moving toward data science and applied ML.",
  paragraphs: [
    "My work spans backend engineering, data infrastructure, and machine learning. On a data science or AI engineering team, that means I can design the pipeline, train the model, and ship the product around it.",
    "Currently finishing my Computer Engineering degree in Tunisia. Looking for a remote or international internship in data science, AI/ML engineering, or data engineering, especially in the UK and Canada.",
  ],
};

export const experience = [
  {
    id: "axcess",
    role: "WMS Developer Intern",
    org: "Axcess Logistics",
    date: "Jul — Aug 2026",
    video: asset("assets/projects/Axess.mp4"),
    points: [
      "Architected backend services for a multi-tenant Warehouse Management System (WMS) using NestJS, Prisma ORM, and PostgreSQL, structuring the relational data model for warehouse and merchant entities.",
      "Implemented granular Role-Based Access Control across 4 scoped user roles (SUPERADMIN, ADMIN, AGENT, CLIENT), enforcing strict data isolation across warehouse and merchant boundaries.",
      "Built end-to-end audit logging across all state-changing operations for complete data traceability, compliance, and security, a governance pattern that transfers directly to production data-pipeline monitoring.",
    ],
    tags: ["NestJS", "Prisma", "PostgreSQL", "RBAC", "Multi-tenancy"],
    link: "https://github.com/Botkraker/AxessBack",
  },
  {
    id: "scsi",
    role: "PunchTime Machine System Developer Intern",
    org: "SCSI (Société de Conseils et Solutions Informatiques)",
    date: "May — Jul 2025",
    video: asset("assets/projects/Pointeuse.mp4"),
    points: [
      "Developed a full-stack web application using .NET Core 8 and a SQL Server database to manage attendance tracking, schedules, and history for all company employees.",
      "Designed the relational database schema and built a secure admin interface with role-based authentication and access management.",
    ],
    tags: [".NET Core 8", "SQL Server", "RBAC"],
    link: "https://github.com/jbuguy/pointeuse_C-",
  },
  {
    id: "idea-lab-internship",
    role: "Artificial Intelligence Intern",
    org: "Idea Lab, FSB",
    date: "Jul — Aug 2024",
    video: asset("assets/projects/AiMeherzya.mp4"),
    points: [
      "Trained a conversational LLM agent to answer educational questions for students in preparatory (“prépa”) classes.",
      "Collected and structured educational materials via web scraping to build the model's training corpus, an early hands-on exercise in data collection and preprocessing.",
    ],
    tags: ["LLM", "Web Scraping", "Data Preprocessing"],
    link: "https://github.com/Botkraker/AiMeherzya",
  },
];

export const now = [
  {
    title: "Tunindex Sentiment Pipeline",
    status: "In progress",
    blurb:
      "Adapting an NLP + ML + SHAP pipeline (based on Ibrahim, Khan & Kaplan 2025) to predict the Tunisian stock market (BVMT/Tunindex) from news sentiment. Zero budget, running entirely locally. Data extraction has been complete since September 2026.",
    tags: ["NLP", "SHAP", "scikit-learn", "Sentiment Analysis"],
  },
  {
    title: "Road Map Project",
    status: "In progress",
    blurb:
      "Team project mapping road and sidewalk degradation for the Tunisian Ministère de l'Équipement. I own Work Package 1 (Données & Capture): the capture app, the annotated dataset, ground-truth measurements, the annotation guide, and on-device anonymisation.",
    tags: ["Data Collection", "Annotation", "Computer Vision", "Privacy"],
  },
];

export const projects = [
  {
    id: "project-steg",
    index: "01",
    eyebrow: "Data Engineering",
    title: "STEG Observatory",
    blurb:
      "A real-time data observatory built on a lakehouse architecture, built to handle continuous ingestion, storage, and querying at scale rather than batch-only processing.",
    video: asset("assets/projects/steg.mp4"),
    tags: ["Lakehouse", "Streaming", "ETL", "Cloud"],
    link: "https://github.com/FarahHammamii/pfa_steg_energy",
  },
  {
    id: "project-tourism-bi",
    index: "02",
    eyebrow: "Business Intelligence",
    title: "Tourism BI Dashboard",
    blurb:
      "A KPI dashboard that turns raw tourism data into decisions a stakeholder can act on, built around a specific business question rather than a generic chart collection.",
    video: asset("assets/projects/tourism.mp4"),
    tags: ["BI", "SQL", "Dashboarding"],
    link: "https://github.com/MiiN1136/BI_Project",
  },
  {
    id: "project-fridguard",
    index: "03",
    eyebrow: "IoT · Computer Vision",
    title: "Fridguard",
    subtitle: "An AI-Powered Smart Refrigerator",
    blurb:
      "An AI-powered fridge-monitoring system built to reduce household food waste, combining an AI camera, environmental sensors, and a mobile app.",
    detail:
      "A Raspberry Pi 4 with camera, temperature, air-quality, and door sensors captures data every 5 seconds and posts it to a Node.js hub, which orchestrates a YOLO computer-vision service for food recognition and a MongoDB inventory store. Event-driven Firebase alerts flag spoilage risk, with REST APIs powering an Android app.",
    video: asset("assets/projects/Fridgard.mp4"),
    tags: ["IoT", "YOLO", "Raspberry Pi", "Node.js", "MongoDB", "Android", "Firebase"],
    link: null,
  },
  {
    id: "project-mlops",
    index: "04",
    eyebrow: "MLOps",
    title: "Computer Vision MLOps Pipeline",
    blurb:
      "An MLOps pipeline automating the training, versioning, and deployment of a computer vision model, applying experiment tracking and model-registry practices for reproducibility.",
    video: null,
    tags: ["Python", "MLOps", "MLflow"],
    link: "https://github.com/Botkraker/DevOps-MLOps-Labs",
  },
];

export const moreProjects = [
  {
    title: "Parkinson's Disease Detection from Voice Biomarkers",
    blurb:
      "Non-invasive detection pipeline over 195 voice recordings (22 acoustic features) from 31 individuals. Reduced dimensionality from 22 to 6 components with PCA, corrected class imbalance with oversampling, and benchmarked 5 classifiers with grid-search tuning.",
    metric: "Best model (MLP): 90% accuracy, 97% recall on positive cases.",
    tags: ["Python", "scikit-learn", "PCA"],
  },
  {
    title: "Home Lab Server",
    blurb:
      "Proxmox VE server hosting multiple VMs and self-hosted services, with an OpenMediaVault NAS for centralized storage and a WireGuard VPN for secure remote access.",
    metric: null,
    tags: ["Proxmox", "NAS", "WireGuard"],
  },
  {
    title: "Secure University Network",
    blurb:
      "Full-scale university network topology designed in EVE-NG: VLAN/trunking segmentation, dynamic routing (OSPF/EIGRP), and security via ACLs, firewall rules, and AAA/RADIUS authentication.",
    metric: null,
    tags: ["EVE-NG", "VLANs", "OSPF/EIGRP"],
  },
];

export const skillGroups = [
  {
    title: "Data & ML",
    items: ["Python", "scikit-learn", "PCA", "Statistical modeling", "MLOps", "MLflow"],
  },
  {
    title: "Data Engineering",
    items: ["SQL", "ETL / ELT", "Data pipelines", "Docker", "Apache Airflow", "AWS"],
  },
  {
    title: "Backend & Systems",
    items: ["Node.js", "MongoDB", "Firebase", "REST APIs", "IoT (Raspberry Pi, YOLO)"],
  },
  {
    title: "Infrastructure & Networking",
    items: ["Proxmox VE", "WireGuard", "EVE-NG", "VLANs", "OSPF/EIGRP", "ACLs", "AAA/RADIUS"],
  },
];

export const certifications = [
  "AWS Cloud Practitioner Essentials, AWS Skill Builder",
  "Understanding Data Engineering, DataCamp",
  "Introduction to Docker, DataCamp",
  "Introduction to Airflow in Python, DataCamp",
  "Web Development, GoMYCODE",
];

export const languages = [
  { name: "Arabic", level: "Native" },
  { name: "English", level: "Fluent" },
  { name: "French", level: "Intermediate" },
  { name: "German", level: "Beginner" },
];

export const contact = {
  kicker: "06 — Contact",
  heading: "Let's talk.",
  text: "Open to remote and international internships in Data Science, AI/ML Engineering, and Data Engineering. The fastest way to reach me is email.",
};

/** Marquee strip content — the skills ticker under the hero. */
export const marqueeItems = [
  "Python", "PyTorch", "scikit-learn", "SQL", "Apache Airflow", "Docker",
  "AWS", "MLflow", "NestJS", "PostgreSQL", "MongoDB", "Node.js",
  "YOLO", "Retrieval-Augmented Generation", "Lakehouse", "Streaming ETL",
];
