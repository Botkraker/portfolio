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

/**
 * Work is filed under three tracks. Every project carries a `track`, and the
 * Projects section renders one rail from this list — so adding a track here
 * is the only edit needed to add one to the page.
 */
export const tracks = [
  { id: "all", label: "All work", short: "All", accent: "gold" },
  { id: "ml", label: "ML & AI", short: "ML & AI", accent: "emerald" },
  { id: "bi", label: "Data & BI", short: "Data & BI", accent: "cyan" },
  { id: "eng", label: "Engineering & Systems", short: "Engineering", accent: "coral" },
];

export const projects = [
  {
    id: "project-steg",
    track: "bi",
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
    track: "bi",
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
    track: "ml",
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
    track: "ml",
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
    track: "ml",
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
    track: "ml",
    eyebrow: "Computer Vision · Data Engineering",
    title: "RoadScan",
    subtitle: "Damage detection from dashcam video — in progress",
    blurb:
      "A team project mapping road and sidewalk degradation for the Tunisian Ministère de l'Équipement. I own Work Package 1 (Données & Capture): the capture app, the annotated dataset, ground-truth measurements, the annotation guide, and on-device anonymisation.",
    detail:
      "Most of that work is reconciling six public sources into one leakage-safe dataset: 17,732 images mapped to three classes — pothole, crack, manhole — against a single class map that every conversion script reads, then split 70/15/15 by group so no video or near-duplicate lands on two sides at once and the test set measures genuinely unseen scenes. The first run reaches mAP@0.5 of 0.45 on dashcam validation but only 0.08 on my own street footage; closing that domain gap with self-labelled frames is the current work.",
    video: null,
    tags: ["YOLO", "Object Detection", "Dataset Curation", "Annotation", "DVC", "Privacy"],
    link: "https://github.com/Botkraker/RoadScanCV",
  },
  {
    id: "project-elkhadema",
    track: "eng",
    eyebrow: "Full-stack · Software Design",
    title: "ElKhadema",
    subtitle: "A professional network, built twice",
    blurb:
      "A LinkedIn-style professional network: profiles, companies, job offers, posts, reactions, comments, follows and direct messaging. My longest-running codebase — 87 commits on the first version, 26 more on the rewrite.",
    detail:
      "Version one is a JavaFX desktop client over MySQL, layered DAO → Service → controller with the whole domain modelled explicitly (User, Profile, Company, JobOffre, Post, Comment, Reaction, Follow, Message, Experience, Competance) rather than pushed into the UI. Version two rebuilds the same product as a full-stack JavaScript app with a separate server and client, three of us on the team. Building one product twice on two stacks is where most of what I know about layering came from.",
    video: null,
    tags: ["Java", "JavaFX", "MySQL", "Node.js", "React", "Layered Architecture"],
    link: "https://github.com/Botkraker/ElKhadema",
  },
];

/**
 * The long tail: everything else with a commit behind it, including work in
 * other people's repositories. `role` matters here — "Contributor" means the
 * repo belongs to someone else and the commit count is mine alone.
 */
export const projectIndex = [
  // ---- ML & AI ----
  {
    title: "Tunindex Sentiment Pipeline",
    track: "ml",
    kind: "NLP · Finance",
    blurb:
      "Nine scrapers feeding 41,597 curated French headlines through relevance filtering, near-duplicate removal and trading-calendar alignment, versioned with DVC, to test whether news sentiment beats a price-only baseline on the Tunisian index.",
    tags: ["NLP", "Web Scraping", "DVC", "Walk-forward Validation"],
    link: "https://github.com/Botkraker/MarketPrediction",
    role: "Owner",
    commits: 24,
    year: "2026",
    lang: "Python",
  },
  {
    title: "University Chatbot — DevOps to MLOps",
    track: "ml",
    kind: "LLM · MLOps",
    blurb:
      "A retrieval chatbot for university students built to MLOps practice: FastAPI serving PyTorch embeddings, DVC on a Drive remote for data and artefacts, Docker Compose for reproducible environments, GitHub Actions for CI, React on the front.",
    tags: ["FastAPI", "PyTorch", "Embeddings", "DVC", "Docker", "GitHub Actions"],
    link: "https://github.com/jbuguy/projet-dev-ops",
    role: "Contributor",
    commits: 8,
    year: "2026",
    lang: "Python",
  },
  {
    title: "AiMeherzya",
    track: "ml",
    kind: "LLM",
    blurb:
      "A conversational tutor for Algebra 1, serving a large language model through the HuggingFace Inference API and grounded in an educational corpus gathered by scraping.",
    tags: ["LLM", "HuggingFace", "Web Scraping"],
    link: "https://github.com/Botkraker/AiMeherzya",
    role: "Owner",
    commits: 3,
    year: "2024",
    lang: "Python",
  },
  {
    title: "Parkinson's Detection from Voice Biomarkers",
    track: "ml",
    kind: "Classical ML",
    blurb:
      "Non-invasive detection over 195 voice recordings (22 acoustic features) from 31 individuals. PCA cut 22 dimensions to 6, oversampling corrected the class imbalance, and 5 classifiers were benchmarked under grid search.",
    metric: "Best model (MLP): 90% accuracy, 97% recall on positive cases.",
    tags: ["scikit-learn", "PCA", "Grid Search"],
    link: null,
    role: "Owner",
    commits: null,
    year: "2025",
    lang: "Python",
  },
  {
    title: "Insurance Claims Modelling",
    track: "ml",
    kind: "Classical ML",
    blurb:
      "A supervised modelling notebook over a train/test insurance claims dataset — feature work, model selection and evaluation on held-out data.",
    tags: ["Jupyter", "scikit-learn", "Tabular ML"],
    link: "https://github.com/jbuguy/ml_claims",
    role: "Contributor",
    commits: 14,
    year: "2025",
    lang: "Jupyter",
  },
  {
    title: "Vehicle Routing with Time Windows",
    track: "ml",
    kind: "Optimization",
    blurb:
      "A genetic-algorithm solver for VRPTW evaluated on the Solomon benchmark instances (C1/C2, R1/R2, RC), with dedicated harnesses comparing initialisation methods and crossover/mutation operators against each other rather than reporting a single run.",
    tags: ["Genetic Algorithms", "VRPTW", "Solomon Benchmarks", "Python"],
    link: "https://github.com/jbuguy/genetic_algorithm",
    role: "Contributor",
    commits: 10,
    year: "2026",
    lang: "Python",
  },
  {
    title: "Travelling Salesman via Genetic Algorithm",
    track: "ml",
    kind: "Optimization",
    blurb:
      "Selection, crossover and mutation over a population of candidate routes, with a live visualisation of each generation converging on a shorter tour.",
    tags: ["Genetic Algorithms", "Optimization", "Python"],
    link: "https://github.com/Botkraker/salesmanproblemsolvedusingGeneticAlgorithm",
    role: "Owner",
    commits: 9,
    year: "2026",
    lang: "Python",
  },
  {
    title: "DevOps & MLOps Labs",
    track: "ml",
    kind: "Coursework",
    blurb:
      "Hands-on labs across a 10–11 session DevOps-to-MLOps course: Git, CI/CD, Docker, Kubernetes, infrastructure as code, ML pipelines, model serving and monitoring.",
    tags: ["Docker", "Kubernetes", "CI/CD", "IaC", "Model Serving"],
    link: "https://github.com/Botkraker/DevOps-MLOps-Labs",
    role: "Coursework",
    commits: null,
    year: "2025",
    lang: "Python",
  },

  // ---- Data & BI ----
  {
    title: "Tourism BI Dashboard",
    track: "bi",
    kind: "Business Intelligence",
    blurb:
      "A decision-support dashboard for the Tunisian Ministry of Tourism, aggregating international tourism data to position Tunisia against its competitors rather than reporting its numbers in isolation.",
    tags: ["BI", "SQL", "Python", "Dashboarding"],
    link: "https://github.com/MiiN1136/BI_Project",
    role: "Contributor",
    commits: 15,
    year: "2026",
    lang: "Python",
  },
  {
    title: "STEG Energy Lakehouse",
    track: "bi",
    kind: "Data Engineering",
    blurb:
      "A medallion-architecture lakehouse for Tunisia's electricity and gas utility, consolidating operational data against international benchmarks and exposing it through agents, APIs and dashboards.",
    tags: ["Lakehouse", "Medallion", "PostgreSQL", "LLM Analytics"],
    link: "https://github.com/FarahHammamii/pfa_steg_energy",
    role: "Contributor",
    commits: 2,
    year: "2026",
    lang: "Python",
  },
  {
    title: "Scraping to Warehouse Pipeline",
    track: "bi",
    kind: "Data Engineering",
    blurb:
      "An end-to-end pipeline that scrapes source sites and lands the result in a Neon-hosted PostgreSQL warehouse, ready to be queried rather than left as files.",
    tags: ["Web Scraping", "PostgreSQL", "Neon", "ETL"],
    link: "https://github.com/jbuguy/web-scraping",
    role: "Contributor",
    commits: 4,
    year: "2025",
    lang: "Python",
  },

  // ---- Engineering & Systems ----
  {
    title: "Axcess WMS Backend",
    track: "eng",
    kind: "Backend",
    blurb:
      "Multi-tenant warehouse management backend in NestJS and Prisma over PostgreSQL: role-based access across four scoped roles, strict warehouse/merchant data isolation, and audit logging on every state-changing operation.",
    tags: ["NestJS", "Prisma", "PostgreSQL", "RBAC", "Multi-tenancy"],
    link: "https://github.com/Botkraker/AxessBack",
    role: "Owner",
    commits: 99,
    year: "2026",
    lang: "TypeScript",
  },
  {
    title: "Pointeuse — Biometric Attendance",
    track: "eng",
    kind: "Full-stack",
    blurb:
      "An ASP.NET Core system that pulls attendance off ZKTeco biometric terminals, reconciles it against employee schedules and flags anomalies automatically. My largest contribution to someone else's codebase.",
    tags: [".NET 8", "ASP.NET Core", "SQL Server", "ZKTeco"],
    link: "https://github.com/jbuguy/pointeuse_C-",
    role: "Contributor",
    commits: 61,
    year: "2026",
    lang: "C#",
  },
  {
    title: "ElKhadema V2",
    track: "eng",
    kind: "Full-stack",
    blurb:
      "The professional network rebuilt as a full-stack JavaScript app with a separate server and client, three of us on the team, including PDF handling for CV uploads.",
    tags: ["Node.js", "React", "REST APIs", "Teamwork"],
    link: "https://github.com/jbuguy/ElKhademaV2",
    role: "Contributor",
    commits: 26,
    year: "2026",
    lang: "JavaScript",
  },
  {
    title: "GestAbsence",
    track: "eng",
    kind: "Mobile · Backend",
    blurb:
      "An education-management app covering the whole timetable, not just attendance: administrators manage classes, subjects, teachers, students and sessions; teachers see what they teach and when, and take the roll; students track their own absences. Flutter client against a PHP REST API over MySQL, with three role-scoped interfaces.",
    tags: ["Flutter", "Dart", "PHP", "MySQL", "REST APIs"],
    link: "https://github.com/Botkraker/gestabsence",
    role: "Owner",
    commits: 28,
    year: "2026",
    lang: "Dart",
  },
  {
    title: "Pointeuse — First Build",
    track: "eng",
    kind: "Full-stack",
    blurb:
      "The earlier attendance build that preceded the .NET rewrite, pairing a JavaScript front end with a C# service layer.",
    tags: ["JavaScript", "C#", "Attendance"],
    link: "https://github.com/jbuguy/projet_pointeuse",
    role: "Contributor",
    commits: 15,
    year: "2025",
    lang: "JavaScript",
  },
  {
    title: "Home Lab Server",
    track: "eng",
    kind: "Infrastructure",
    blurb:
      "A Proxmox VE server hosting multiple VMs and self-hosted services, with an OpenMediaVault NAS for centralized storage and a WireGuard VPN for secure remote access.",
    tags: ["Proxmox VE", "OpenMediaVault", "WireGuard", "Linux"],
    link: null,
    role: "Owner",
    commits: null,
    year: "2025",
    lang: "Infra",
  },
  {
    title: "Secure University Network",
    track: "eng",
    kind: "Networking",
    blurb:
      "A full university network topology designed in EVE-NG: VLAN and trunking segmentation, dynamic routing with OSPF and EIGRP, and security through ACLs, firewall rules and AAA/RADIUS authentication.",
    tags: ["EVE-NG", "VLANs", "OSPF/EIGRP", "ACLs", "AAA/RADIUS"],
    link: null,
    role: "Owner",
    commits: null,
    year: "2025",
    lang: "Networking",
  },
  {
    title: "Game Recommender",
    track: "eng",
    kind: "Full-stack",
    blurb:
      "A containerised recommender: a Django REST API with JWT auth over PostgreSQL, a React and Vite front end, and a dev-container setup that brings the whole stack up with one command.",
    tags: ["Django", "PostgreSQL", "React", "Docker"],
    link: null,
    role: "Owner",
    commits: null,
    year: "2025",
    lang: "Python",
  },
  {
    title: "This Portfolio",
    track: "eng",
    kind: "Front-end",
    blurb:
      "React and Vite, Tailwind v4 tokens, Lenis-driven scroll and a canvas background that trains a regression as you read. Hand-built rather than templated, which is the point.",
    tags: ["React", "Vite", "Tailwind v4", "Motion", "Canvas"],
    link: "https://github.com/Botkraker/portfolio",
    role: "Owner",
    commits: 23,
    year: "2026",
    lang: "JavaScript",
  },
  {
    title: "Wallpaper Changer",
    track: "eng",
    kind: "Scripting",
    blurb:
      "An early Python script that rotates the desktop wallpaper on a schedule. Small, but the first thing I wrote that ran without me.",
    tags: ["Python", "Scripting", "Automation"],
    link: "https://github.com/Botkraker/wallpaper-changer",
    role: "Owner",
    commits: 4,
    year: "2021",
    lang: "Python",
  },
  {
    title: "Library Database",
    track: "eng",
    kind: "Databases",
    blurb:
      "An early exercise wiring Python against a relational database for a book catalogue — CRUD, schema and queries before any framework was involved.",
    tags: ["Python", "SQL", "CRUD"],
    link: "https://github.com/Botkraker/livreDBpython",
    role: "Owner",
    commits: null,
    year: "2023",
    lang: "Python",
  },
  {
    title: "Questionmark",
    track: "eng",
    kind: "Front-end",
    blurb:
      "A two-page static site in hand-written HTML and CSS from 2020 — the first thing I ever put on GitHub. Kept here on purpose: the distance from this to the rest of the page is the point.",
    tags: ["HTML", "CSS"],
    link: "https://github.com/Botkraker/Questionmark",
    role: "Owner",
    commits: 1,
    year: "2020",
    lang: "HTML",
  },
];

/**
 * Commit counts come from a GitHub commit search for author:Botkraker, so
 * "external" below means repositories owned by someone else that I pushed
 * commits into. Snapshot date is stamped on the section so the figure is
 * never presented as live.
 */
export const commitLedger = {
  asOf: "September 2026",
  totals: [
    { label: "Commits authored", value: 476 },
    { label: "Repositories touched", value: 22 },
    { label: "In others' repos", value: 8 },
    { label: "Contributions, 12 mo", value: 335 },
  ],
  /** Top repositories by commits authored, for the ledger bars. */
  top: [
    { repo: "AxessBack", commits: 99, track: "eng", external: false },
    { repo: "ElKhadema", commits: 87, track: "eng", external: false },
    { repo: "pointeuse_C-", commits: 61, track: "eng", external: true },
    { repo: "gestabsence", commits: 28, track: "eng", external: false },
    { repo: "ElKhademaV2", commits: 26, track: "eng", external: true },
    { repo: "MarketPrediction", commits: 24, track: "ml", external: false },
    { repo: "portfolio", commits: 23, track: "eng", external: false },
    { repo: "RoadScanCV", commits: 22, track: "ml", external: false },
    { repo: "projet_pointeuse", commits: 15, track: "eng", external: true },
    { repo: "BI_Project", commits: 15, track: "bi", external: true },
    { repo: "ml_claims", commits: 14, track: "ml", external: true },
    { repo: "block-blast-AI", commits: 10, track: "ml", external: false },
    { repo: "genetic_algorithm", commits: 10, track: "ml", external: true },
  ],
};

/**
 * A snapshot of the GitHub contribution calendar, taken 25 September 2026.
 * Rows are weekdays (Sunday first), columns are weeks; `levels` holds
 * GitHub's own 0–4 intensity and `counts` the exact per-day figure in
 * base 36. Baked rather than fetched — github.com sends no CORS header,
 * so a browser cannot read this at runtime.
 */
export const contributionCalendar = {
  start: "2025-09-21",
  end: "2026-09-25",
  total: 335,
  activeDays: 82,
  levels: [
    "01010110100100011000200000000000000000111001100000004",
    "00000000100000001000100000001210000000011010100000011",
    "00000001000000001000000000011010100000111021100000002",
    "00000000000000100000000000011000000001111021000000011",
    "00100000000000110000000000011000001000111001100000021",
    "00000001000000102000000000001001000001101101000000010",
    "00200000000000111000000000010000000000000000100000040",
  ],
  counts: [
    "0404041060010005100090000000000000000021400340000000o",
    "00000000100000004000100000004910000000062020100000012",
    "0000000200000000100000000005304020000015207410000000b",
    "000000000000005000000000000530000000044410a5000000062",
    "002000000000004100000000000230000050006330011000000b2",
    "0000000100000050c000000000001002000002502101000000050",
    "009000000000004440000000000600000000000000001000000m0",
  ],
};

export const skillGroups = [
  {
    title: "ML & AI",
    items: [
      "Python", "PyTorch", "scikit-learn", "YOLO", "Reinforcement Learning",
      "LLMs & Retrieval", "PCA", "Genetic Algorithms", "MLflow", "DVC",
    ],
  },
  {
    title: "Data & BI",
    items: [
      "SQL", "PostgreSQL", "ETL / ELT", "Lakehouse", "Apache Airflow",
      "Web Scraping", "Dashboarding", "AWS",
    ],
  },
  {
    title: "Engineering & Systems",
    items: [
      "TypeScript", "NestJS", "Prisma", "Node.js", "Django", ".NET Core 8",
      "Java · JavaFX", "Flutter · Dart", "PHP", "React", "MongoDB", "Docker",
    ],
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
  "AWS", "MLflow", "DVC", "NestJS", "Prisma", "PostgreSQL", "MongoDB", "Node.js",
  "TypeScript", "Java", "JavaFX", "C#", ".NET Core", "Flutter", "Dart", "PHP",
  "YOLO", "Retrieval-Augmented Generation", "Lakehouse", "Streaming ETL",
];
