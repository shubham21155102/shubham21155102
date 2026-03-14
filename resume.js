const fs = require("fs");
const {
  Document, Packer, Paragraph, TextRun, ExternalHyperlink,
  AlignmentType, TabStopType, TabStopPosition, BorderStyle,
  LevelFormat, PageBreak
} = require("docx");

// Colors
const DARK = "1A1A1A";
const ACCENT = "2B5797";
const GRAY = "555555";
const RULE_COLOR = "AAAAAA";

const sectionHeading = (text) => new Paragraph({
  spacing: { before: 200, after: 80 },
  border: { bottom: { style: BorderStyle.SINGLE, size: 6, color: ACCENT, space: 2 } },
  children: [new TextRun({ text: text.toUpperCase(), bold: true, size: 22, font: "Arial", color: ACCENT })]
});

const roleHeader = (role, company, location) => new Paragraph({
  spacing: { before: 140, after: 10 },
  tabStops: [{ type: TabStopType.RIGHT, position: TabStopPosition.MAX }],
  children: [
    new TextRun({ text: role, bold: true, size: 21, font: "Arial", color: DARK }),
    new TextRun({ text: `  |  ${company}`, size: 21, font: "Arial", color: GRAY }),
    ...(location ? [new TextRun({ text: `\t${location}`, size: 19, font: "Arial", color: GRAY, italics: true })] : [])
  ]
});

const dateLine = (dateStr) => new Paragraph({
  spacing: { before: 5, after: 40 },
  children: [
    new TextRun({ text: dateStr, size: 19, font: "Arial", color: GRAY, italics: true }),
  ]
});

const bulletItem = (textParts) => new Paragraph({
  numbering: { reference: "bullets", level: 0 },
  spacing: { before: 20, after: 20 },
  children: textParts.map(part => {
    if (typeof part === "string") return new TextRun({ text: part, size: 20, font: "Arial", color: DARK });
    return new TextRun({ text: part.text, size: 20, font: "Arial", color: DARK, bold: part.bold || false });
  })
});

const techLine = (text) => new Paragraph({
  spacing: { before: 15, after: 15 },
  indent: { left: 360 },
  children: [
    new TextRun({ text: "Tech: ", bold: true, size: 19, font: "Arial", color: ACCENT }),
    new TextRun({ text, size: 19, font: "Arial", color: GRAY })
  ]
});

const eduRow = (school, detail, date) => new Paragraph({
  spacing: { before: 30, after: 30 },
  tabStops: [{ type: TabStopType.RIGHT, position: TabStopPosition.MAX }],
  children: [
    new TextRun({ text: school, bold: true, size: 20, font: "Arial", color: DARK }),
    new TextRun({ text: `  ${detail}`, size: 20, font: "Arial", color: GRAY }),
    ...(date ? [new TextRun({ text: `\t${date}`, size: 20, font: "Arial", color: GRAY })] : []),
  ]
});

const doc = new Document({
  numbering: {
    config: [{
      reference: "bullets",
      levels: [{
        level: 0, format: LevelFormat.BULLET, text: "\u2022", alignment: AlignmentType.LEFT,
        style: { paragraph: { indent: { left: 360, hanging: 200 } } }
      }]
    }]
  },
  styles: {
    default: { document: { run: { font: "Arial", size: 20 } } }
  },
  sections: [{
    properties: {
      page: {
        size: { width: 12240, height: 15840 },
        margin: { top: 680, right: 860, bottom: 680, left: 860 }
      }
    },
    children: [
      // ===== HEADER =====
      new Paragraph({
        alignment: AlignmentType.CENTER,
        spacing: { after: 30 },
        children: [new TextRun({ text: "SHUBHAM KUMAR", bold: true, size: 36, font: "Arial", color: DARK })]
      }),
      new Paragraph({
        alignment: AlignmentType.CENTER,
        spacing: { after: 20 },
        children: [
          new TextRun({ text: "(+91) 6201060889", size: 19, font: "Arial", color: GRAY }),
          new TextRun({ text: "  |  ", size: 19, font: "Arial", color: RULE_COLOR }),
          new ExternalHyperlink({
            children: [new TextRun({ text: "shubham.kumar.min21@itbhu.ac.in", size: 19, font: "Arial", color: ACCENT, underline: {} })],
            link: "mailto:shubham.kumar.min21@itbhu.ac.in"
          }),
        ]
      }),
      new Paragraph({
        alignment: AlignmentType.CENTER,
        spacing: { after: 40 },
        children: [
          new ExternalHyperlink({
            children: [new TextRun({ text: "GitHub", size: 19, font: "Arial", color: ACCENT, underline: {} })],
            link: "https://github.com/shubham21155102"
          }),
          new TextRun({ text: "  |  ", size: 19, font: "Arial", color: RULE_COLOR }),
          new ExternalHyperlink({
            children: [new TextRun({ text: "LinkedIn", size: 19, font: "Arial", color: ACCENT, underline: {} })],
            link: "https://www.linkedin.com/in/shubham-kumar-9a6a13232/"
          }),
        ]
      }),

      // ===== TECHNICAL SKILLS =====
      sectionHeading("Technical Skills"),
      new Paragraph({
        spacing: { before: 50, after: 15 },
        children: [
          new TextRun({ text: "Languages: ", bold: true, size: 20, font: "Arial", color: DARK }),
          new TextRun({ text: "TypeScript, JavaScript, Python, Go, Kotlin, SQL", size: 20, font: "Arial", color: GRAY }),
        ]
      }),
      new Paragraph({
        spacing: { before: 15, after: 15 },
        children: [
          new TextRun({ text: "Backend: ", bold: true, size: 20, font: "Arial", color: DARK }),
          new TextRun({ text: "NestJS, Express.js, FastAPI, Flask, Django, Spring Boot, gRPC", size: 20, font: "Arial", color: GRAY }),
        ]
      }),
      new Paragraph({
        spacing: { before: 15, after: 15 },
        children: [
          new TextRun({ text: "Frontend: ", bold: true, size: 20, font: "Arial", color: DARK }),
          new TextRun({ text: "Next.js, React, Angular, React Native", size: 20, font: "Arial", color: GRAY }),
        ]
      }),
      new Paragraph({
        spacing: { before: 15, after: 15 },
        children: [
          new TextRun({ text: "Data & ML: ", bold: true, size: 20, font: "Arial", color: DARK }),
          new TextRun({ text: "PostgreSQL, Snowflake, ClickHouse, Redis, Elasticsearch, MongoDB, Kafka, Apache Airflow, CatBoost, LangChain", size: 20, font: "Arial", color: GRAY }),
        ]
      }),
      new Paragraph({
        spacing: { before: 15, after: 15 },
        children: [
          new TextRun({ text: "Infrastructure: ", bold: true, size: 20, font: "Arial", color: DARK }),
          new TextRun({ text: "AWS (EC2, S3, ECS, EKS), Kubernetes, Docker, Terraform, GitHub Actions, Nginx, Grafana", size: 20, font: "Arial", color: GRAY }),
        ]
      }),

      // ===== EXPERIENCE =====
      sectionHeading("Experience"),

      // --- Grassstone ---
      roleHeader("Software Engineer", "Grassstone Venture Studio"),
      dateLine("2025 \u2013 Present"),

      // Architecture
      bulletItem([{ text: "Architected RP360", bold: true }, ", a scalable, cloud-native multi-tenant SaaS platform for FDA regulatory analytics serving medical device companies. Designed the full multi-tenancy model with database-level tenant separation, row-level isolation, and per-tenant URL routing across NestJS, Next.js/Angular frontends, and a Golang core backend exposing RESTful APIs."]),

      // Environments
      bulletItem(["Provisioned ", { text: "three-tier deployment infrastructure", bold: true }, ": Docker Compose for local dev, self-managed Kubernetes (kubeadm on EC2) for staging at staging.rp360.io, and ", { text: "AWS EKS for production", bold: true }, " \u2014 spanning 13 microservices across Python/FastAPI, Go, and Node.js with Terraform IaC, Nginx ingress, and GitHub Actions CI/CD."]),

      // Data warehouse
      bulletItem(["Designed a ", { text: "Snowflake star-schema data warehouse", bold: true }, " (78 tables across 5 schemas) ingesting 9.4M+ adverse event records, UDI, 510(k), PMA, recalls, and classification datasets. Created fuzzy-matching bridge tables linking UDI devices to 510(k) clearances where no direct key existed."]),

      // Data pipeline
      bulletItem(["Developed a production ", { text: "OpenFDA data pipeline", bold: true }, " (26 Python files) with change detection, JSON\u2192Parquet conversion, S3 upload, and schema validation against FDA reference files. Orchestrated pipelines using ", { text: "Apache Airflow", bold: true }, " for scheduled ingestion and transformation."]),

      // Auth
      bulletItem(["Implemented ", { text: "enterprise SSO and authentication", bold: true }, " (Google, Microsoft, Okta via SAML + OIDC), TOTP/SMS MFA, SCIM 2.0 provisioning, and JWT security with RS256 \u2014 integrated with NextAuth on the frontend."]),

      // Authorization
      bulletItem(["Constructed a ", { text: "Zanzibar-inspired authorization system using OpenFGA", bold: true }, " with a five-level hierarchy (SuperAdmin \u2192 Tenant \u2192 OrgAdmin \u2192 Custom Roles \u2192 Users) and Redis-cached permission checks, replacing per-request DB lookups."]),

      // ML + gRPC
      bulletItem(["Connected ", { text: "machine learning risk-scoring models via gRPC", bold: true }, " with the Golang backend, enabling low-latency inference calls. Reviewed and fixed data leakage in a CatBoost time-series forecasting model used for device risk prediction."]),

      // Elasticsearch + Doc versioning
      bulletItem(["Integrated ", { text: "Elasticsearch", bold: true }, " for cross-dataset search, created a Git-like document versioning system, and established a centralized ", { text: "observability stack", bold: true }, " with ClickHouse for log analytics, Uber Zap for structured logging in Go, and Grafana for real-time performance monitoring and alerting."]),

      techLine("NestJS, Next.js, Angular, Golang (Uber Zap), FastAPI, PostgreSQL, Snowflake, ClickHouse, AWS (EKS, EC2, S3), Kubernetes, Docker, Terraform, OpenFGA, Elasticsearch, Grafana, Apache Airflow, Kafka, gRPC, Redis"),

      // --- Acencore ---
      roleHeader("Full-Stack Developer Intern", "Acencore"),
      dateLine("2024"),
      bulletItem(["Built an ", { text: "AI-powered video interview platform", bold: true }, " with automated scoring using ML models, handling 50+ concurrent interviews with a backend optimized for 10,000+ resume uploads."]),
      bulletItem(["Deployed an ", { text: "RTMP streaming server", bold: true }, " with OpenAI Whisper for real-time speech-to-text at 95% transcription accuracy. Designed the full pipeline: video ingestion (Amazon IVS), real-time processing (Kafka + WebSocket), storage (S3), and scoring."]),
      techLine("NestJS, FastAPI, Kafka, Amazon IVS, RTMP, WebSocket, Whisper, Docker, AWS EC2/S3"),

      // --- Ostello ---
      roleHeader("Backend Developer & DevOps Intern", "Ostello India Pvt. Ltd."),
      dateLine("2024"),
      bulletItem(["Engineered backend services with NestJS and integrated ", { text: "PostgreSQL + Redis caching", bold: true }, ", reducing data retrieval latency by 50% and improving API response times across the platform."]),
      bulletItem(["Led deployment on ", { text: "AWS Elastic Beanstalk with Nginx", bold: true }, ", achieving 99.9% uptime. Configured CI/CD pipelines with Docker and GitHub Actions for zero-downtime deployments."]),
      techLine("NestJS, PostgreSQL, Redis, AWS Elastic Beanstalk, Nginx, Docker, GitHub Actions"),

      // PAGE BREAK
      new Paragraph({ children: [new PageBreak()] }),

      // --- JSPL ---
      roleHeader("Summer Intern", "Jindal Steel and Power Limited", "Onsite, Odisha"),
      dateLine("2023"),
      bulletItem(["Developed a ", { text: "real-time vehicle management system", bold: true }, " (web + mobile) with GPS tracking for Utkal C mining equipment, improving operational efficiency by 40%."]),
      bulletItem(["Automated ", { text: "coal seam visualization and reserve estimation", bold: true }, " \u2014 reduced AutoCAD drawing generation from 7 days to 20 seconds using Python scripting and DataMine integration."]),
      bulletItem(["Created 3D sump dewatering models, calculating water volumes and pump efficiency with 30% improved accuracy over manual methods."]),
      techLine("Python, JavaScript, Kotlin, Next.js, NestJS, Redis, PostgreSQL, AutoCAD, DataMine"),

      // ===== EDUCATION =====
      sectionHeading("Education"),
      eduRow("Indian Institute of Technology (BHU) Varanasi", "\u2014 B.Tech, CPI: 8.67/10", "2021 \u2013 2025"),
      eduRow("Simultala Awasiya Vidyalaya", "\u2014 Class 10th, 88.2% (State Rank: 14)", ""),
      eduRow("Daudnagar College", "\u2014 Class 12th, 89.4% (State Rank: 28)", ""),

      // ===== LEADERSHIP =====
      sectionHeading("Leadership & Activities"),
      bulletItem([{ text: "Tech Head, Film & Media Council", bold: true }, ", IIT BHU \u2014 Directed technical operations for FMC Weekend; developed event website with auto-email triggers and scalability for peak traffic."]),
      bulletItem([{ text: "Technical Executive, Science & Technology Council", bold: true }, ", IIT BHU \u2014 Led a team of 10 to organize a tech symposium for 500+ participants."]),
      bulletItem([{ text: "Core Team, Software Development Group", bold: true }, ", IIT BHU \u2014 Mentored 100+ students in software development year-round."]),
    ]
  }]
});

Packer.toBuffer(doc).then(buffer => {
  fs.writeFileSync("/home/claude/Shubham_Kumar_Resume_v3.docx", buffer);
  console.log("Done");
});
