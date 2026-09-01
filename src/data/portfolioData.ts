import { Project, Experience, Education, Certification, SkillCategory } from '../types';

import portraitImg from '../assets/images/chaitanya_portrait.jpg';
import cutoutImg from '../assets/images/chaitanya_cutout.png';
import mainframeImg from '../assets/images/project_mainframe_1788232049090.jpg';
import travelImg from '../assets/images/project_travel_1788232064644.jpg';
import dehazeImg from '../assets/images/project_dehaze_1788232080586.jpg';
import salesImg from '../assets/images/project_sales_1788232100727.jpg';
import linkViewImg from '../assets/images/link_view.png';

export const personalInfo = {
  name: "Mulagala Chaitanya",
  headline: "Mainframe Developer & Software Engineer",
  currentRole: "Mainframe Developer at Capgemini India",
  currentClient: "State Farm (Health Host)",
  email: "mulagalachaitanya@gmail.com",
  phone: "+91 7989520785",
  location: "Nellore, Andhra Pradesh, India",
  experienceYears: "1.5+",
  cgpa: "8.5",
  photo: portraitImg,
  cutoutPhoto: cutoutImg,
  linkViewBanner: linkViewImg,
  summary: "Mainframe Developer with 1.5+ years of experience in enterprise Mainframe technology, specializing in COBOL, JCL, DB2, VSAM, PL/I, IMSDB, TSO, and SPOOL. Proven ability to architect and maintain mission-critical batch/online systems, execute complex defect triage, handle high-priority production incidents, and deliver high-volume data extractions under strict SLAs. Experienced in full-stack web and Python data engineering, with strong leadership acumen as an Associate Team Leader.",
  socials: {
    github: "https://github.com/Chaitanya2102",
    linkedin: "https://www.linkedin.com/in/chaitanya-mulagala/",
    email: "mailto:mulagalachaitanya@gmail.com",
    phone: "tel:+917989520785",
    whatsapp: "https://wa.me/917989520785"
  },
  quickStats: [
    { label: "Industry Experience", value: "1.5+ Yrs", subtext: "Capgemini & Enterprise Clients" },
    { label: "B.E. Academic CGPA", value: "8.5 / 10", subtext: "Chennai Institute of Technology" },
    { label: "Client Recognition", value: "Excellence", subtext: "Certified for Outstanding Service" },
    { label: "System Availability", value: "99.9%", subtext: "Zero-Downtime Batch Pipelines" },
    { label: "SLA Compliance", value: "100%", subtext: "Zero-Abend Delivery Record" }
  ]
};

export const projectsData: Project[] = [
  {
    id: "health-host-mainframe",
    title: "Health Host — State Farm Enterprise Platform",
    subtitle: "Mission-Critical Mainframe Batch & Online Data Processing Engine",
    category: "mainframe",
    categoryLabel: "Enterprise Mainframe",
    image: mainframeImg,
    featured: true,
    clientOrContext: "Capgemini India / Client: State Farm",
    duration: "Sep 2024 – Present",
    summary: "High-throughput batch and online enterprise system handling mass policyholder data extraction, DB2 SQL queries, VSAM datasets, and regulatory compliance reporting.",
    description: [
      "Engineered, designed, and unit-tested functional mainframe modules for enterprise healthcare policy and claims processing.",
      "Developed robust COBOL/JCL programming logic for high-volume mass data extractions adhering to complex enterprise business rules and database schemas.",
      "Performed defect root-cause analysis, production incident resolution, and seamless system integration testing.",
      "Generated automated weekly and monthly analytical reports distributed to engineering leads and executive management.",
      "Assumed Associate Team Leader responsibilities, facilitating cross-system defect tracking, GitLab versioning, and compliance documentation."
    ],
    keyHighlights: [
      "Zero-downtime batch execution under strict SLA time windows",
      "Optimized DB2 SQL cursor performance for mass record queries",
      "Seamless FTP data exchange between host environment and downstream distributed services",
      "Active participant in technical design governance and code reviews"
    ],
    techStack: ["COBOL", "JCL", "DB2", "SQL", "VSAM", "FTP", "TSO/ISPF", "SPOOL", "ServiceNow", "GitLab"],
    architecture: {
      overview: "Host architecture orchestrating scheduled JCL batch streams that extract relational DB2 datasets into structured VSAM clusters, validating transactional integrity and routing via secure FTP to distributed systems.",
      flowSteps: [
        "1. Scheduled JCL batch jobs trigger during overnight batch window",
        "2. COBOL core programs execute embedded DB2 SQL cursors with buffered I/O",
        "3. VSAM KSDS files are updated with transactional state and error trapping",
        "4. Mass extracted datasets are partitioned and securely transferred via FTP",
        "5. Automated audit and logging utilities record MAXCC status and throughput"
      ]
    },
    metrics: [
      { label: "Client Service", value: "Excellence Award" },
      { label: "Batch Reliability", value: "99.9% MAXCC 0000" },
      { label: "Data Integrity", value: "100% Compliant" },
      { label: "Role", value: "Assoc. Team Leader" }
    ],
    demoType: "mainframe-console",
    codeSnippet: {
      language: "cobol",
      filename: "EXTRACT_HEALTH_HOST.cbl",
      code: `       IDENTIFICATION DIVISION.
       PROGRAM-ID.    HLTHHOST.
       AUTHOR.        M-CHAITANYA.
      *****************************************************************
      * HEALTH HOST ENTERPRISE BATCH DATA EXTRACTION & DB2 PROCESSING
      *****************************************************************
       ENVIRONMENT DIVISION.
       INPUT-OUTPUT SECTION.
       FILE-CONTROL.
           SELECT POLICY-OUT-FILE ASSIGN TO UT-S-POLICIES
           ORGANIZATION IS SEQUENTIAL
           ACCESS MODE  IS SEQUENTIAL
           FILE STATUS  IS WS-FILE-STATUS.

       DATA DIVISION.
       FILE SECTION.
       FD  POLICY-OUT-FILE
           RECORDING MODE IS F
           LABEL RECORDS ARE STANDARD
           BLOCK CONTAINS 0 RECORDS.
       01  POLICY-RECORD-OUT        PIC X(250).

       WORKING-STORAGE SECTION.
       01  WS-COUNTERS.
           05 WS-REC-READ           PIC 9(07) VALUE ZERO.
           05 WS-REC-PROCESSED      PIC 9(07) VALUE ZERO.
           05 WS-ERR-COUNT          PIC 9(05) VALUE ZERO.
       01  WS-FILE-STATUS           PIC X(02).
       
       EXEC SQL INCLUDE SQLCA END-EXEC.
       EXEC SQL
           DECLARE C_POLICY CURSOR FOR
           SELECT POLICY_ID, MEMBER_ID, STATUS_CD, PREMIUM_AMT
           FROM   DB2_HEALTH_HOST.POLICIES
           WHERE  REC_ACTIVE_FLAG = 'Y'
           WITH UR
       END-EXEC.

       PROCEDURE DIVISION.
       0000-MAIN-LOGIC.
           PERFORM 1000-INIT-PROCESS
           PERFORM 2000-FETCH-PROCESS UNTIL SQLCODE = +100
           PERFORM 3000-TERMINATE-PROCESS
           GOBACK.

       1000-INIT-PROCESS.
           OPEN OUTPUT POLICY-OUT-FILE
           EXEC SQL OPEN C_POLICY END-EXEC
           IF SQLCODE NOT = 0
              DISPLAY 'ERROR OPENING DB2 CURSOR: ' SQLCODE
              PERFORM 9999-ABEND-ROUTINE
           END-IF.

       2000-FETCH-PROCESS.
           EXEC SQL
               FETCH C_POLICY INTO :WS-POLICY-ID, :WS-MEMBER-ID,
                                   :WS-STATUS-CD, :WS-PREMIUM-AMT
           END-EXEC
           IF SQLCODE = 0
              ADD 1 TO WS-REC-PROCESSED
              PERFORM 2100-WRITE-VSAM-EXTRACT
           END-IF.`
    }
  },
  {
    id: "tourism-booking-platform",
    title: "Global Wanderlust — Tour & Experience Booking Platform",
    subtitle: "Modern Full-Stack Travel Booking Engine with Real-Time Inventory",
    category: "web",
    categoryLabel: "Full-Stack Web",
    image: travelImg,
    featured: true,
    clientOrContext: "Academic & Full-Stack Initiative",
    summary: "End-to-end travel platform featuring intuitive package exploration, dynamic itinerary builder, real-time availability checks, and secure multi-gateway checkout.",
    description: [
      "Engineered an intuitive, responsive user interface making it seamless for visitors to navigate international and regional tour packages.",
      "Constructed a structured relational and document schema capturing comprehensive tour details: destinations, duration, day-by-day itineraries, pricing, and live dates.",
      "Developed a secure booking engine with real-time seat availability calculation, booking confirmation dispatch, and multi-payment workflows."
    ],
    keyHighlights: [
      "Dynamic filtering by destination, budget range, and duration",
      "Interactive itinerary day-by-day explorer with integrated map tags",
      "Automated booking confirmation generation and customer receipt pipeline",
      "Mobile-first responsive architecture designed for swift performance"
    ],
    techStack: ["Angular", "JavaScript", "TypeScript", "Node.js", "Express", "MongoDB", "MySQL", "CSS3", "REST APIs"],
    architecture: {
      overview: "Client-side SPA communicating with an Express/Node.js API layer that manages package inventory transactions in MongoDB/MySQL with transactional reservation locks.",
      flowSteps: [
        "1. User explores curated packages with live search and facet filters",
        "2. Client requests dynamic package details and real-time inventory slots",
        "3. User configures traveler headcount and dates; API reserves temporary cart lock",
        "4. Payment is verified and transactional status is finalized",
        "5. Booking confirmation email & itinerary PDF are dispatched"
      ]
    },
    metrics: [
      { label: "Interface Speed", value: "< 1.2s Load" },
      { label: "Payment Flows", value: "Multi-Gateway" },
      { label: "Responsive", value: "100% Mobile Ready" }
    ],
    demoType: "booking-simulator",
    codeSnippet: {
      language: "typescript",
      filename: "booking.service.ts",
      code: `@Injectable({ providedIn: 'root' })
export class TourBookingService {
  private apiUrl = '/api/tours';

  constructor(private http: HttpClient) {}

  checkAvailability(packageId: string, travelDate: Date, travelers: number): Observable<AvailabilityResult> {
    return this.http.post<AvailabilityResult>(\`\${this.apiUrl}/\${packageId}/check-slots\`, {
      date: travelDate.toISOString(),
      count: travelers
    });
  }

  processReservation(payload: BookingPayload): Observable<BookingConfirmation> {
    return this.http.post<BookingConfirmation>(\`\${this.apiUrl}/book\`, payload).pipe(
      tap(confirmation => {
        this.analyticsService.trackEvent('tour_booked', { id: confirmation.bookingId });
      })
    );
  }
}`
    }
  },
  {
    id: "image-dehazing-system",
    title: "Computer Vision Image Dehazing & Dust Detection",
    subtitle: "Atmospheric Artifact Removal & High-Clarity Image Restoration",
    category: "ai-data",
    categoryLabel: "Computer Vision & AI",
    image: dehazeImg,
    featured: true,
    clientOrContext: "Computer Science Research & Project",
    summary: "Computer vision algorithm using dark channel priors, histogram equalization, and morphological dust detection to restore degraded outdoor photography.",
    description: [
      "Implemented a comprehensive image preprocessing stage to detect and eliminate atmospheric haze and airborne dust particles.",
      "Employed dark channel prior estimation, adaptive histogram equalization, and guided filtering to recover genuine scene radiance.",
      "Engineered an automated dust detection algorithm highlighting particulates and optical artifacts across diverse lighting conditions.",
      "Achieved significant enhancements in image contrast, color fidelity, and peak signal-to-noise ratio (PSNR)."
    ],
    keyHighlights: [
      "Dark Channel Prior (DCP) atmospheric transmission estimation",
      "Morphological filtering for discrete dust particle isolation",
      "Adaptive Contrast Enhancement (CLAHE) preserving fine edge details",
      "Interactive side-by-side comparative inspection visualizer"
    ],
    techStack: ["Python", "OpenCV", "NumPy", "Scikit-Image", "Matplotlib", "Digital Image Processing"],
    architecture: {
      overview: "Multi-stage digital signal pipeline computing dark channel minimums, calculating transmission maps with soft matting, and inverting atmospheric scattering equations.",
      flowSteps: [
        "1. Image ingestion and color space conversion (RGB to YUV / Lab)",
        "2. Dark channel extraction across local patch windows",
        "3. Transmission map estimation and guided filter smoothing",
        "4. Scene radiance recovery via inverse atmospheric scattering model",
        "5. Morphological dust artifact identification and adaptive contrast boost"
      ]
    },
    metrics: [
      { label: "Contrast Gain", value: "+42% Boost" },
      { label: "PSNR Metric", value: "28.4 dB" },
      { label: "SSIM Score", value: "0.94 Index" }
    ],
    demoType: "dehaze-slider",
    codeSnippet: {
      language: "python",
      filename: "dehaze_processor.py",
      code: `import cv2
import numpy as np

def compute_dark_channel(image, window_size=15):
    """Compute dark channel prior from RGB input image."""
    min_channel = np.amin(image, axis=2)
    kernel = cv2.getStructuringElement(cv2.MORPH_RECT, (window_size, window_size))
    dark_channel = cv2.erode(min_channel, kernel)
    return dark_channel

def estimate_transmission(image, atmospheric_light, omega=0.95):
    """Estimate transmission map based on physical scattering model."""
    normalized_img = image.astype(np.float64) / atmospheric_light
    dark_channel = compute_dark_channel(normalized_img)
    transmission = 1.0 - omega * dark_channel
    return np.clip(transmission, 0.1, 1.0)

def recover_radiance(image, transmission, atmospheric_light, t0=0.1):
    """Recover genuine scene radiance without haze."""
    t_clamped = np.maximum(transmission, t0)
    recovered = np.empty_like(image, dtype=np.float64)
    for c in range(3):
        recovered[:, :, c] = (image[:, :, c] - atmospheric_light[c]) / t_clamped + atmospheric_light[c]
    return np.clip(recovered, 0, 255).astype(np.uint8)`
    }
  },
  {
    id: "sales-prediction-powerbi",
    title: "Predictive Sales Forecasting & Power BI Analytics",
    subtitle: "Enterprise Business Intelligence & Machine Learning Pipeline",
    category: "ai-data",
    categoryLabel: "Data Science & BI",
    image: salesImg,
    featured: true,
    clientOrContext: "Data Engineering Initiative",
    summary: "End-to-end forecasting pipeline combining Python regression modeling with dynamic Power BI dashboards to predict revenue trends and seasonal demand.",
    description: [
      "Gathered and cleaned extensive historical transaction data, incorporating seasonality, marketing campaign spends, and economic indices.",
      "Engineered feature transformations and trained predictive regression models to forecast multi-quarter sales performance.",
      "Integrated machine learning inferences into Power BI via Power Query Editor and DAX (Data Analysis Expressions).",
      "Designed an interactive executive dashboard visualizing trend projections, variance analysis, and promotional ROI."
    ],
    keyHighlights: [
      "Power BI + Python ML integration using automated Power Query scripts",
      "Complex DAX formulas for Year-over-Year (YoY) and moving average metrics",
      "Scenario simulation enabling executives to adjust marketing budget weights",
      "Automated anomaly detection alerting on demand surges and dips"
    ],
    techStack: ["Python", "Power BI", "DAX", "Power Query", "Pandas", "Scikit-Learn", "SQL", "Excel"],
    architecture: {
      overview: "ETL pipeline loading cleaned SQL transactions into Python feature engineering, generating ML forecasts, and feeding dynamic DAX visual models in Power BI.",
      flowSteps: [
        "1. Raw historical sales data ingested from enterprise SQL database",
        "2. Python ETL script normalizes outliers, dates, and campaign markers",
        "3. Predictive model computes seasonal regression coefficients and predictions",
        "4. Power Query consumes model output and builds relational star schema",
        "5. Power BI presents interactive DAX-driven KPI cards and forecast graphs"
      ]
    },
    metrics: [
      { label: "Forecast Accuracy", value: "93.8% MAPE" },
      { label: "Data Scope", value: "500k+ Transactions" },
      { label: "BI Platform", value: "Power BI & DAX" }
    ],
    demoType: "sales-calculator",
    codeSnippet: {
      language: "sql",
      filename: "sales_forecast_dax.txt",
      code: `// DAX Measure: Forecasted Sales with Dynamic Marketing Multiplier
ForecastedSales = 
VAR BaseRegression = CALCULATE(
    SUM(Sales[PredictedBaseValue]),
    FILTER(Sales, Sales[DateKey] >= TODAY())
)
VAR SeasonalityFactor = CALCULATE(
    AVERAGE(SeasonalityIndex[QuarterWeight]),
    RELATEDTABLE(SeasonalityIndex)
)
VAR CampaignLift = [SelectedMarketingSpend] * 0.145
RETURN
    BaseRegression * SeasonalityFactor + CampaignLift

// DAX Measure: Variance % to Target
VarianceToTarget% = 
DIVIDE(
    [ForecastedSales] - [TargetRevenue],
    [TargetRevenue],
    0
)`
    }
  }
];

export const experienceData: Experience[] = [
  {
    id: "capgemini-mainframe",
    role: "Mainframe Developer",
    company: "Capgemini Technology Services India Pvt Ltd",
    companyLocation: "India",
    client: "State Farm",
    project: "Health Host",
    period: "Sep 2024 – Present",
    badge: "Current Role • 1.5+ Yrs Experience",
    environment: ["COBOL", "JCL", "DB2", "SQL", "VSAM", "FTP", "TSO/ISPF", "SPOOL", "ServiceNow", "GitLab"],
    achievements: [
      "Developed, designed, and unit-tested functional mainframe modules for Health Host, conducting rigorous integration testing across interconnected host systems.",
      "Authored optimized programming logic for mass data extraction, rigorously validating datasets against strict regulatory business rules and architecture guidelines.",
      "Spearheaded defect analysis, investigated root causes, and resolved critical system defects within aggressive SLA deadlines.",
      "Developed and maintained batch and online systems ensuring uninterrupted 24/7 reliability and peak performance.",
      "Handled enterprise incidents and communicated promptly with end-users and client leads to resolve high-priority requests.",
      "Monitored and maintained the DB2 database records for precision tracking and compliance audit trails.",
      "Generated weekly and monthly analytical reports and distributed them to project managers and client technical teams.",
      "Reviewed, authored, and updated technical process documents to enforce operational compliance.",
      "Assumed responsibilities of an Associate Team Leader, assisting with sprint coordination, peer code reviews, and deliverable readiness."
    ],
    leadershipHighlights: [
      "Client Certification of Excellence for outstanding project service",
      "Associate Team Leader responsibilities managing deliverables and sprint milestones",
      "Cross-functional communication resolving production incidents directly with client teams"
    ]
  }
];

export const educationData: Education[] = [
  {
    id: "cit-chennai",
    institution: "Chennai Institute of Technology",
    degree: "Bachelor of Engineering (B.E.) — Computer Science and Engineering",
    period: "2020 – 2024",
    score: "8.5 CGPA",
    scoreLabel: "First Class with Distinction",
    highlights: [
      "Graduated with 8.5 CGPA in Computer Science and Engineering",
      "Demonstrated excellence in Data Structures, Algorithms, DBMS, Operating Systems, and Distributed Computing",
      "Excelled in technical paper presentations and collegiate hackathons",
      "Active participant in sports and extracurricular collegiate events"
    ]
  },
  {
    id: "narayana-college",
    institution: "Narayana Junior College",
    degree: "Higher Secondary Education (Class XII)",
    period: "2018 – 2020",
    score: "9.1 CGPA",
    scoreLabel: "Outstanding Academic Merit",
    highlights: [
      "Awarded 'Best Outgoing Student' in Intermediate (Class XII)",
      "Ranked at the top of the graduating cohort in Mathematics, Physics, and Chemistry",
      "Awarded 'Best Outgoing Student' in Class X"
    ]
  }
];

export const certificationsData: Certification[] = [
  {
    id: "capgemini-excellence",
    title: "Certification of Excellence for Outstanding Service",
    issuer: "Capgemini / Client: State Farm",
    year: "2024",
    description: "Awarded for exceptional service delivery, defect triage speed, and high client satisfaction in the Health Host project.",
    category: "enterprise"
  },
  {
    id: "cisco-python",
    title: "Programming Essentials in Python",
    issuer: "Cisco Networking Academy",
    year: "Certified",
    description: "Validated competencies in core Python, OOP, algorithmic logic, data processing, and scripting.",
    category: "cisco"
  },
  {
    id: "cisco-cybersecurity-essentials",
    title: "Cyber Security Essentials",
    issuer: "Cisco Networking Academy",
    year: "Certified",
    description: "Comprehensive understanding of network vulnerabilities, data encryption, access controls, and cyber threat mitigation.",
    category: "cisco"
  },
  {
    id: "cisco-cybersecurity-intro",
    title: "Introduction to Cyber Security",
    issuer: "Cisco Networking Academy",
    year: "Certified",
    description: "Foundational mastery of information security principles, confidentiality, integrity, and privacy governance.",
    category: "cisco"
  },
  {
    id: "best-outgoing-student",
    title: "Best Outgoing Student Award",
    issuer: "Narayana Educational Institutions",
    year: "Class XII & X",
    description: "Recognized for supreme all-around academic excellence, leadership in student initiatives, and extracurricular achievements.",
    category: "academic"
  }
];

export const skillCategories: SkillCategory[] = [
  {
    id: "mainframe",
    title: "Mainframe & Enterprise Systems",
    iconName: "Terminal",
    skills: [
      { name: "COBOL", level: 92, category: "Mainframe", description: "Batch programs, file handling, string manipulation, subprograms", yearsOrDepth: "1.5+ Yrs" },
      { name: "JCL", level: 90, category: "Mainframe", description: "Job control language, PROCs, GDGs, conditional execution, sorting", yearsOrDepth: "1.5+ Yrs" },
      { name: "DB2 & SQL", level: 88, category: "Mainframe & Database", description: "Embedded SQL, cursors, table joins, performance tuning, indexing", yearsOrDepth: "1.5+ Yrs" },
      { name: "VSAM (KSDS/ESDS)", level: 85, category: "File Systems", description: "Key-sequenced files, IDCAMS utilities, DEFINE CLUSTER, repro", yearsOrDepth: "1.5+ Yrs" },
      { name: "PL/I", level: 80, category: "Mainframe", description: "Procedural enterprise logic and structured program maintenance", yearsOrDepth: "1+ Yr" },
      { name: "TSO / ISPF", level: 88, category: "Environment", description: "Dataset allocation, member editing, SDSF, job spool monitoring", yearsOrDepth: "1.5+ Yrs" },
      { name: "IMSDB", level: 75, category: "Database", description: "Hierarchical database navigation and DL/I segment queries", yearsOrDepth: "1+ Yr" },
      { name: "FTP & SPOOL", level: 86, category: "Utilities", description: "Cross-platform batch data transfer and spool log diagnostics", yearsOrDepth: "1.5+ Yrs" }
    ]
  },
  {
    id: "programming",
    title: "Core Programming & Backend",
    iconName: "Code2",
    skills: [
      { name: "Python", level: 86, category: "Languages", description: "Data manipulation (Pandas/NumPy), automation scripts, OpenCV, ML", yearsOrDepth: "Proficient" },
      { name: "Java", level: 82, category: "Languages", description: "OOP concepts, collections framework, backend application logic", yearsOrDepth: "Solid" },
      { name: "JavaScript / TypeScript", level: 84, category: "Languages", description: "ES6+, async/await, modern web development and APIs", yearsOrDepth: "Solid" },
      { name: "SQL & Relational DBMS", level: 88, category: "Databases", description: "Complex queries, stored procedures, joins, schema design", yearsOrDepth: "1.5+ Yrs" },
      { name: "MySQL & MongoDB", level: 80, category: "Databases", description: "Relational modeling and NoSQL document storage", yearsOrDepth: "Practical" }
    ]
  },
  {
    id: "web-frontend",
    title: "Web & Frontend Engineering",
    iconName: "Globe",
    skills: [
      { name: "Angular", level: 80, category: "Frontend", description: "Components, services, dependency injection, RxJS observables", yearsOrDepth: "Project Experience" },
      { name: "React & Vite", level: 82, category: "Frontend", description: "Hooks, state management, modern component design", yearsOrDepth: "Proficient" },
      { name: "HTML5 & CSS3 / Tailwind", level: 90, category: "Frontend", description: "Responsive layouts, animations, accessible semantic UI", yearsOrDepth: "Advanced" },
      { name: "RESTful API Integration", level: 85, category: "Full-Stack", description: "Endpoint design, JSON serialization, client-server handshake", yearsOrDepth: "Practical" }
    ]
  },
  {
    id: "tools-devops",
    title: "Enterprise Tools & Analytics",
    iconName: "Cpu",
    skills: [
      { name: "ServiceNow", level: 88, category: "ITSM", description: "Incident management, change requests, problem ticketing", yearsOrDepth: "1.5+ Yrs" },
      { name: "GitLab / Version Control", level: 86, category: "DevOps", description: "Branching, merge requests, code reviews, versioning tools", yearsOrDepth: "1.5+ Yrs" },
      { name: "SoapUI", level: 82, category: "Testing", description: "Web service testing, XML payload verification, API calls", yearsOrDepth: "1+ Yr" },
      { name: "Power BI & DAX", level: 84, category: "Analytics", description: "Interactive dashboards, DAX measures, Power Query ETL", yearsOrDepth: "Project Experience" },
      { name: "Shovel & Environment Sheet", level: 85, category: "Enterprise", description: "Environment configuration management and deployment tracking", yearsOrDepth: "1.5+ Yrs" }
    ]
  }
];
