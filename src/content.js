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
      "Testing whether French-language news sentiment improves next-session prediction of the Tunisian index (BVMT) beyond a price-only baseline, adapting Ibrahim, Khan & Kaplan (2025) to a frontier market. Nine scrapers feed 41,597 curated headlines through relevance filtering, near-duplicate removal and trading-calendar alignment, versioned with DVC. Both hypotheses are pre-registered and neither has been tested yet — no sentiment or forecasting result is claimed. Zero budget, running entirely locally.",
    link: "https://github.com/Botkraker/MarketPrediction",
    tags: ["NLP", "Web Scraping", "DVC", "Walk-forward Validation"],
    // Ornamental sparkline only — a shape, not a reading of the index.
    series: [28, 34, 31, 46, 42, 58, 54, 71, 66, 84],
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
      "A reproducible image-classification pipeline built around a ResNet18 backbone with k-fold cross-validation, wired into DVC stages so training and evaluation rerun only when their inputs actually change.",
    detail:
      "Hyperparameters live in params.yaml rather than in the code, data and model artefacts are version-tracked, and a GitHub Actions workflow runs on every push, so a result can be traced back to the exact data and configuration that produced it.",
    video: null,
    tags: ["PyTorch", "ResNet18", "DVC", "GitHub Actions", "MLOps"],
    link: "https://github.com/Botkraker/classification-pytorch",
  },
  {
    id: "project-block-blast",
    index: "05",
    eyebrow: "Reinforcement Learning",
    title: "Block Blast AI",
    subtitle: "An agent that teaches itself to play",
    blurb:
      "A MaskablePPO agent trained on a custom Gymnasium environment for an 8×8 block puzzle. Nobody tells it how to play: it plays millions of games and works out a strategy from the score alone.",
    detail:
      "Every agent is scored on the same 1,000 held-out games with fixed seeds, reported with 95% confidence intervals. The afterstate policy averages 1,299 points against the greedy baseline's 296 — 4.4× better, with the difference between them falling between +935 and +1,073 — and survives 40 rounds to greedy's 12. The simulator is pure Python and NumPy under 179 tests.",
    video: asset("assets/projects/BlockBlast.mp4"),
    tags: ["PyTorch", "Reinforcement Learning", "MaskablePPO", "Gymnasium", "NumPy", "pytest"],
    link: "https://github.com/Botkraker/block-blast-AI",
  },
  {
    id: "project-roadscan",
    index: "06",
    eyebrow: "Computer Vision · Data Engineering",
    title: "RoadScan",
    subtitle: "Damage detection from dashcam video — in progress",
    blurb:
      "A team project mapping road and sidewalk degradation for the Tunisian Ministère de l'Équipement. I own Work Package 1 (Données & Capture): the capture app, the annotated dataset, ground-truth measurements, the annotation guide, and on-device anonymisation.",
    detail:
      "Most of that work is reconciling six public sources into one leakage-safe dataset: 17,732 images mapped to three classes — pothole, crack, manhole — against a single class map that every conversion script reads, then split 70/15/15 by group so no video or near-duplicate lands on two sides at once and the test set measures genuinely unseen scenes. The first run reaches mAP@0.5 of 0.45 on dashcam validation but only 0.08 on my own street footage; closing that domain gap with self-labelled frames is the current work.",
    video: null,
    tags: [
      "YOLO",
      "Object Detection",
      "Dataset Curation",
      "Annotation",
      "DVC",
      "Privacy",
    ],
    link: "https://github.com/Botkraker/RoadScanCV",
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
  {
    title: "Travelling Salesman via Genetic Algorithm",
    blurb:
      "A genetic-algorithm solver for the travelling salesman problem — selection, crossover and mutation over a population of candidate routes — with a live visualisation of each generation converging on a shorter tour.",
    metric: null,
    tags: ["Python", "Genetic Algorithms", "Optimization"],
    link: "https://github.com/Botkraker/salesmanproblemsolvedusingGeneticAlgorithm",
  },
  {
    title: "Game Recommender",
    blurb:
      "A containerised full-stack recommender: a Django REST API with JWT auth over PostgreSQL, a React and Vite front end, and a dev-container setup that brings the whole stack up with one command.",
    metric: null,
    tags: ["Django", "PostgreSQL", "React", "Docker"],
    link: null,
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

/**
 * Soft skills, each tied to the thing that proves it. A bare list of
 * adjectives reads as filler — every candidate claims teamwork — so nothing
 * goes in here without a specific piece of work behind it.
 */
export const waysOfWorking = [
  {
    title: "Ownership on a team",
    proof:
      "One of four on RoadScan, the road-damage project for the Ministère de l'Équipement, holding Work Package 1 end to end while it stays in step with the rest of the team.",
  },
  {
    title: "Teaching",
    proof:
      "Teach cybersecurity sessions to a mini club at Securinets, which means explaining attacks and defenses to members who are newer to it than I am.",
  },
  {
    title: "Fast ramp-up",
    proof:
      "Three internships, three unfamiliar stacks: .NET Core 8, then NestJS and Prisma, then LLM tooling. New programming languages are what I pick up quickest.",
  },
  {
    title: "Technical writing",
    proof:
      "Wrote the annotation guide the Road Map team labels against, so a dataset built by several pairs of hands stays consistent.",
  },
  {
    title: "Presenting",
    proof:
      "Comfortable defending work in front of a room — project defenses, demos, and walking non-specialists through a system.",
  },
  {
    title: "Resourcefulness",
    proof:
      "The Tunindex sentiment pipeline runs on zero budget and entirely on local hardware, so every design choice has to earn its cost.",
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
