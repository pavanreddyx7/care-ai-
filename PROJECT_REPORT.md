# TUMKUR UNIVERSITY
## Tumkur, Karnataka

---

# PROJECT REPORT
## On

# CareAI — An Intelligent Medical Assistant Web Application

*A dissertation submitted in partial fulfillment of the requirements for the award of degree of*

## BACHELOR OF COMPUTER APPLICATIONS
*of*
### Sri Siddhartha Institute of Business Management

---

**Submitted By**

| Student Names | Register No. |
|---|---|
| Name1 | regno |
| Name2 | regno |
| Name3 | regno |
| Name4 | regno |

---

**DEPARTMENT OF BACHELOR OF COMPUTER APPLICATIONS**

**SRI SIDDHARTHA INSTITUTE OF BUSINESS MANAGEMENT**
SSIT Campus, Maralur, Tumkur – 572105

**Academic Year: 2025–2026**

---

## CERTIFICATE

This is to certify that the project work entitled **"CareAI — An Intelligent Medical Assistant Web Application"** has been carried out in partial fulfillment of the requirements for the award of the degree of Bachelor of Computer Applications at SSIBM, Tumkur, during the academic year 2025–2026. The project has been approved as it meets the academic requirements prescribed for the project work of the Bachelor of Computer Applications, and has been carried out by:

| Name | Register No. |
|---|---|
| Name1 | regno |
| Name2 | regno |
| Name3 | regno |
| Name4 | regno |

---

| Signature of the Guide | Signature of the HOD | Signature of the Principal |
|---|---|---|
| [Guide Name] | Mr. Shivakumar B | Dr. Mamatha G |
| Asst. Professor, Dept. of BCA, SSIBM | Head of the Dept., Dept. of BCA, SSIBM MCA, (Ph.D) | Principal, SSIBM MBA, M.Phil, M.Com, PGDIBO and Ph.D. |

**EXAMINERS:**

1. _________________________ &nbsp;&nbsp;&nbsp;&nbsp; 2. _________________________

---

## ACKNOWLEDGEMENT

The successful completion of any undertaking is truly complete only when we remember and express our gratitude to the Almighty, our parents, teachers, and all those who directly or indirectly supported and guided us throughout the execution of this work.

First of all, we would like to extend our heartfelt thanks to **Dr. Mamatha G**, Principal of SSIBM, for her constant encouragement and unwavering support in the successful completion of this project.

We wish to express our sincere thanks to **Mr. Shivakumar B**, Head of the Department of Bachelor of Computer Applications, for his excellent support and guidance during our time at the institute.

We wish to express our deep sense of gratitude and sincere thanks to our internal guide, **[Guide Name]**, Assistant Professor, Department of Bachelor of Computer Applications, SSIBM, Tumakuru, for his invaluable guidance and support at every phase of this project. His expertise in software development and timely suggestions helped us overcome every technical challenge we encountered.

We are also grateful to all the faculty members of the Department of BCA, SSIBM, for their continuous encouragement and for providing us with the necessary academic foundation to build this project.

We are deeply thankful to our parents, classmates, and friends for their continuous moral support and encouragement throughout this journey.

Finally, we would like to express our sincere thanks to all those who directly or indirectly contributed to the successful completion of this project.

| | |
|---|---|
| Name1 | regno |
| Name2 | regno |
| Name3 | regno |
| Name4 | regno |

---

## DECLARATION

We hereby declare that the project entitled **"CareAI — An Intelligent Medical Assistant Web Application"** has been carried out by us under the supervision of **[Guide Name]**, Assistant Professor, and submitted in partial fulfillment of the requirements for the Project Work of the VI Semester for the degree of Bachelor of Computer Applications, under Tumkur University, for the academic year 2025–2026.

| | |
|---|---|
| Name1 | regno |
| Name2 | regno |
| Name3 | regno |
| Name4 | regno |

This report has not been submitted to any other organization or university for the award of any degree or certificate.

**Name1:** _________________ (Signature)

**Name2:** _________________

**Name3:** _________________

**Name4:** _________________

---

## ABSTRACT

The healthcare industry is undergoing a significant transformation through the integration of Artificial Intelligence and modern web technologies. **CareAI** is a full-stack intelligent medical assistant web application designed to bridge the gap between patients and healthcare information by leveraging the power of Google Gemini AI, Firebase cloud services, and modern web development frameworks.

CareAI provides patients with an AI-powered health analysis system that assesses symptoms, vital signs, and medical history to generate probable diagnoses along with detailed treatment recommendations, medications with dosages, dietary advice, and exercise plans. The platform integrates a real-time doctor-patient chat system, an appointment booking module with a color-coded slot grid, a drug safety interaction checker, a personalized 7-day AI diet planner, and a medical image analysis tool using computer vision.

The system also features a hospital and doctor directory allowing patients to locate nearby healthcare providers using GPS or text search, view doctor profiles, and book appointments directly through the platform. An automated medicine reminder system using Twilio SMS and voice calls ensures patients never miss their medication schedules.

The application supports three distinct user roles — Patient, Doctor, and Hospital — each with a dedicated dashboard and feature set. The backend is built on Node.js/Express and deployed on Render, while the frontend is built on React 18 with Vite and deployed on Firebase Hosting. All data is securely stored in Google Firestore with role-based security rules.

CareAI demonstrates how modern AI, cloud computing, and progressive web technologies can be combined to create an accessible, real-time healthcare assistance platform that is available on both mobile and desktop devices.

**Keywords:** Artificial Intelligence, Healthcare, Google Gemini, Firebase, React.js, Node.js, Twilio, Telemedicine, Symptom Analysis, Drug Safety Checker

---

## CONTENTS

| Sl. No. | Chapter | Page No. |
|---|---|---|
| 1. | INTRODUCTION | 1–5 |
| 1.1 | Project Description | 1 |
| 1.2 | Motivation | 2 |
| 1.3 | Objectives | 3 |
| 1.4 | Scope of the Project | 4 |
| 1.5 | Organization of the Report | 5 |
| 2. | LITERATURE SURVEY | 6–17 |
| 2.1 | Existing and Proposed System | 6 |
| 2.2 | Feasibility Study | 10 |
| 2.3 | Tools and Technologies Used | 12 |
| 2.4 | Hardware and Software Requirements | 17 |
| 3. | SOFTWARE REQUIREMENT SPECIFICATION | 18–20 |
| 3.1 | Users | 18 |
| 3.2 | Functional Requirements | 18 |
| 3.3 | Non-Functional Requirements | 20 |
| 4. | SYSTEM DESIGN | 21–24 |
| 4.1 | System Perspective | 21 |
| 4.2 | System Architecture | 22 |
| 4.3 | Context Diagram | 23 |
| 5. | DETAILED DESIGN | 25–35 |
| 5.1 | Use Case Diagram | 25 |
| 5.2 | Sequence Diagram | 27 |
| 5.3 | Activity Diagram | 29 |
| 5.4 | Database Design | 31 |
| 6. | IMPLEMENTATION | 36–46 |
| 6.1 | Module Description | 36 |
| 6.2 | Screen Shots | 41 |
| 7. | SOFTWARE TESTING | 47–52 |
| 7.1 | Testing Strategy | 47 |
| 7.2 | Unit Testing | 48 |
| 7.3 | Integration Testing | 50 |
| 7.4 | User Acceptance Testing | 51 |
| 8. | CONCLUSION | 53 |
| 9. | FUTURE ENHANCEMENT | 54 |
| Appendix A | BIBLIOGRAPHY | 55 |
| Appendix B | USER MANUAL | 56–62 |

---

# CHAPTER 1

## INTRODUCTION

### 1.1 Project Description

**CareAI** is an intelligent, full-stack medical assistant web application that uses cutting-edge Artificial Intelligence to provide patients with accessible, reliable, and immediate healthcare guidance. The application is designed to function as a virtual health companion — analyzing symptoms, providing AI-generated medical advice, connecting patients with real doctors, managing appointments, and sending automated medicine reminders.

The project integrates Google Gemini AI (gemini-2.5-flash model) for natural language processing and medical image analysis, Google Firebase for authentication and real-time database management, Twilio for automated SMS and voice call medicine reminders, and a modern React.js frontend for a seamless user experience across both mobile and desktop devices.

The platform supports three types of users:

- **Patients** — Can analyze their symptoms and vitals, chat with AI doctor, book appointments, set medicine reminders, find nearby hospitals, and save personalized diet plans.
- **Doctors** — Can manage their profile and consultation slots, view and manage patient appointments, and communicate with patients through real-time chat.
- **Hospitals** — Can manage hospital profiles, link doctors to their institution, and oversee all appointments across their doctor panel.

The application is deployed as a cloud-native solution with the frontend on **Firebase Hosting** (https://care-ai-ssibm.web.app) and the backend API server on **Render** (https://care-ai-0yn9.onrender.com), making it globally accessible via any web browser.

### 1.2 Motivation

Access to quality healthcare remains one of the most pressing challenges in developing countries like India. While urban centers have adequate medical infrastructure, rural and semi-urban populations often face significant barriers:

1. **Lack of access to doctors:** In India, there is approximately 1 doctor per 1,000 people — far below the WHO recommended ratio of 1 per 300.
2. **High consultation costs:** A single specialist consultation can cost ₹500–₹2000, which is unaffordable for a large segment of the population.
3. **Medical illiteracy:** Most people are unaware of proper drug dosages, food-drug interactions, or when to seek emergency care.
4. **Medication non-compliance:** Forgetting to take medicines is one of the leading causes of treatment failure, especially for chronic conditions.
5. **Fragmented healthcare information:** Patients lack a single platform to manage their health history, appointments, diet, and reminders.

These challenges motivated the development of CareAI — a platform that democratizes healthcare information using AI, makes preliminary medical guidance available 24/7, and bridges the gap between patients and healthcare providers through technology.

### 1.3 Objectives

The primary objectives of the CareAI project are:

1. **To develop an AI-powered symptom analysis system** that takes patient symptoms, vital signs, and medical history as inputs and provides probable diagnosis along with medical advice.
2. **To build a real-time AI doctor chatbot** capable of answering health-related queries with both conventional medical advice and herbal remedies.
3. **To implement medical image analysis** using computer vision to analyze lab reports, skin conditions, and medical photographs.
4. **To create a drug safety checker** that identifies potentially harmful interactions between two medicines.
5. **To develop an automated medicine reminder system** using Twilio SMS and voice calls that alerts patients at their specified medication times.
6. **To build a doctor and hospital directory** with appointment booking capability featuring color-coded time slot grids.
7. **To provide a personalized AI diet planner** that generates 7-day meal plans based on cuisine preference, dietary type, age, and health goals.
8. **To develop a real-time doctor-patient messaging system** using Firebase Firestore's live listeners.
9. **To implement role-based dashboards** for Patients, Doctors, and Hospitals with appropriate access controls.
10. **To deploy the application on cloud platforms** (Firebase Hosting + Render) for global accessibility.

### 1.4 Scope of the Project

The scope of CareAI covers the following areas:

**In Scope:**

- Web-based application accessible on desktop and mobile browsers
- AI-generated medical analysis (not a replacement for professional diagnosis)
- User registration and login with role-based access (Patient, Doctor, Hospital)
- Appointment booking and management between patients and doctors
- Medicine reminders via SMS and voice calls (India and supported Twilio regions)
- Real-time chat between patients and their selected doctors
- Storage of medical history, diet plans, and reminders in cloud database
- GPS-based and text-based nearby doctor/hospital search
- Secure data storage with Firebase Authentication and Firestore security rules

**Out of Scope:**

- Electronic Medical Records (EMR) integration with government systems
- Payment gateway integration for online consultations
- Video/audio telemedicine calls (future scope)
- Prescription management and pharmacy integration
- Wearable device integration (e.g., smartwatch vital monitoring)

### 1.5 Organization of the Report

This project report is organized as follows:

- **Chapter 1 (Introduction):** Provides an overview of the project, motivation, objectives, and scope.
- **Chapter 2 (Literature Survey):** Reviews existing systems, relevant research papers, and describes the tools and technologies used.
- **Chapter 3 (Software Requirement Specification):** Documents functional and non-functional requirements.
- **Chapter 4 (System Design):** Describes the overall system architecture and context diagram.
- **Chapter 5 (Detailed Design):** Covers UML diagrams including use case, sequence, activity diagrams, and database design.
- **Chapter 6 (Implementation):** Describes module implementation details and includes application screenshots.
- **Chapter 7 (Software Testing):** Documents the testing approach and test cases.
- **Chapter 8 (Conclusion):** Summarizes findings and achievements.
- **Chapter 9 (Future Enhancement):** Outlines potential improvements.
- **Appendix A (Bibliography):** Lists all references.
- **Appendix B (User Manual):** Provides end-user instructions.

---

# CHAPTER 2

## LITERATURE SURVEY

### 2.1 Existing Systems and Proposed System

#### 2.1.1 Review of Existing Systems

**1. Practo (practo.com)**

Practo is one of India's largest healthcare platforms offering doctor discovery, online consultations, appointment booking, and health records storage. While comprehensive, it has several limitations:
- Requires patients to manually describe symptoms without AI analysis
- No automated medication reminder system
- No drug interaction checker
- Consultation fees apply for online doctor access
- No AI-driven diet planning based on health conditions

**2. 1mg (1mg.com)**

1mg provides medicine delivery, doctor consultations, lab tests, and basic health information. Its limitations include:
- No real-time symptom analysis with vital signs
- Drug information exists but no interactive interaction checker
- No appointment scheduling with slot-based availability
- No AI-powered diet planner

**3. WebMD Symptom Checker**

WebMD is a popular global health information portal with a symptom checker. Limitations:
- Rule-based system (not AI-powered with LLMs)
- No integration with doctor appointments or reminders
- No personalized diet planning
- No Indian-context medical advice
- Available as static web pages, not a full patient management platform

**4. Ada Health**

Ada is an AI-powered symptom assessment app. While it uses AI, limitations include:
- Focuses only on symptom assessment, no holistic patient management
- No appointment booking or doctor directory
- No medicine reminders
- No diet or lifestyle recommendations
- Not integrated with Indian healthcare providers

**5. mFine**

mFine offers AI-based triage and telemedicine services. Limitations:
- Requires payment for AI doctor consultations
- No free access to basic health analysis
- Limited to partnered hospitals and doctors
- No automated reminders or diet planner

#### 2.1.2 Comparison Table

| Feature | Practo | 1mg | WebMD | Ada | CareAI |
|---|---|---|---|---|---|
| AI Symptom Analysis | ❌ | ❌ | Partial | ✅ | ✅ |
| Vitals Integration | ❌ | ❌ | ❌ | ❌ | ✅ |
| Drug Interaction Checker | ❌ | ❌ | ❌ | ❌ | ✅ |
| Medicine Reminders (SMS/Call) | ❌ | ❌ | ❌ | ❌ | ✅ |
| AI Diet Planner | ❌ | ❌ | ❌ | ❌ | ✅ |
| Medical Image Analysis | ❌ | ❌ | ❌ | ❌ | ✅ |
| Doctor-Patient Real-time Chat | ✅ | ❌ | ❌ | ❌ | ✅ |
| Doctor Slot Booking | ✅ | ✅ | ❌ | ❌ | ✅ |
| Hospital Dashboard | ✅ | ❌ | ❌ | ❌ | ✅ |
| Free to Use | ❌ | ❌ | ✅ | Partial | ✅ |
| GPS-Based Doctor Finder | ✅ | ✅ | ❌ | ❌ | ✅ |
| Herbal Remedies | ❌ | ❌ | ❌ | ❌ | ✅ |

#### 2.1.3 Proposed System

**CareAI** is proposed as an all-in-one intelligent medical assistant that addresses the limitations of existing systems. The proposed system:

- Uses **Google Gemini AI (LLM)** for dynamic, context-aware medical responses rather than static rule-based systems
- Integrates **vital signs** (temperature, blood pressure, heart rate, SpO2) alongside symptoms for more accurate analysis
- Provides **both conventional medical and herbal remedy** recommendations for each query
- Offers **automated medicine reminders** via Twilio SMS and voice calls — a feature absent in all surveyed systems
- Includes a **drug interaction checker** powered by AI to identify dangerous medication combinations
- Features a **real-time AI diet planner** customized by cuisine, dietary preference, age, and health goals
- Provides **medical image analysis** for skin conditions, lab reports, and X-rays using computer vision
- Maintains a **complete medical history** in the cloud, accessible across all devices
- Connects patients with registered doctors through a **slot-based appointment system** and real-time chat
- Supports **three distinct user roles** (Patient, Doctor, Hospital) with tailored dashboards
- Is **freely accessible** via web browser on any device without app installation

### 2.2 Feasibility Study

#### 2.2.1 Technical Feasibility

The project is technically feasible as all required technologies are mature, well-documented, and available:

- **React.js 18** is a production-grade frontend framework used by companies like Meta, Netflix, and Airbnb. Extensive documentation and community support are available.
- **Node.js and Express.js** are widely used for building RESTful APIs and are capable of handling concurrent requests efficiently.
- **Google Gemini API** (gemini-2.5-flash) provides state-of-the-art language understanding and generation capabilities suitable for medical query processing. The API offers a free tier adequate for academic use.
- **Firebase** (Authentication + Firestore) is a production-ready BaaS (Backend as a Service) platform by Google with generous free tier limits (50,000 reads/day, 20,000 writes/day on Spark plan).
- **Twilio** provides reliable programmable SMS and voice call APIs with a free trial balance sufficient for testing.
- **Render** offers free-tier web service hosting suitable for Node.js backend deployment.
- **Firebase Hosting** provides CDN-backed static file hosting with SSL, suitable for React SPA deployment.

All team members have the required skills in web development, JavaScript, and database management acquired through their BCA curriculum.

#### 2.2.2 Operational Feasibility

- The system operates entirely through a web browser, requiring no installation or specialized hardware
- The UI is designed to be intuitive for users with basic smartphone/computer literacy
- Mobile-responsive design ensures accessibility on budget Android smartphones
- The system operates in English, making it accessible to educated users across India
- The cloud-based architecture ensures 99.9% uptime through Firebase and Render's managed infrastructure
- Firestore real-time listeners ensure instant data synchronization across devices

#### 2.2.3 Economic Feasibility

| Resource | Cost |
|---|---|
| Google Gemini API (free tier) | ₹0 |
| Firebase (Spark Plan - free) | ₹0 |
| Render (free tier hosting) | ₹0 |
| Firebase Hosting (free tier) | ₹0 |
| Twilio (trial credit) | ₹0 (trial balance) |
| Domain Name | ₹0 (using .web.app subdomain) |
| Development Tools (VS Code) | ₹0 (open source) |
| **Total Development Cost** | **₹0** |

The project is economically feasible as the entire infrastructure stack is available at zero cost within free tier limits, making it highly suitable for an academic project and a potential startup prototype.

#### 2.2.4 Schedule Feasibility

The project was completed in approximately 4 months following this schedule:

| Phase | Duration | Activities |
|---|---|---|
| Requirements Analysis | Week 1–2 | Identifying user needs, feature planning |
| System Design | Week 3–4 | Architecture design, database schema, UML diagrams |
| Frontend Development | Week 5–9 | React components, pages, responsive UI |
| Backend Development | Week 7–10 | Express APIs, Gemini integration, Twilio setup |
| Firebase Integration | Week 9–11 | Auth, Firestore CRUD, security rules |
| Testing | Week 12–14 | Unit, integration, and user testing |
| Deployment | Week 15 | Firebase Hosting + Render deployment |
| Documentation | Week 15–16 | Report writing |

### 2.3 Tools and Technologies Used

#### 2.3.1 Frontend Technologies

**React.js 18**

React.js is an open-source JavaScript library developed by Meta (Facebook) for building user interfaces. React uses a component-based architecture where the UI is broken into reusable components. Key features used in CareAI:

- **Hooks (useState, useEffect, useCallback, useContext):** For managing state, side effects, and global context
- **React Router v6:** For client-side routing with nested routes and protected routes
- **Context API:** For sharing user authentication state and role across all components without prop drilling
- **Component-based architecture:** Each page is a self-contained component (Home, Chat, Vision, etc.)

React's virtual DOM ensures optimal rendering performance by batching DOM updates and minimizing reflows.

**Vite**

Vite is a next-generation frontend build tool that offers:
- Extremely fast development server with Hot Module Replacement (HMR)
- ES modules-based development for instant updates
- Optimized production builds using Rollup bundler
- Built-in environment variable support (VITE_ prefix)
- Proxy configuration for API calls during development

**Tailwind CSS (CDN)**

Tailwind CSS is a utility-first CSS framework that provides pre-defined CSS classes for styling. CareAI uses Tailwind CDN (Play CDN) which:
- Generates CSS classes on-demand by scanning the DOM
- Eliminates the need for a build step for CSS
- Provides responsive utilities (sm:, md:, lg: prefixes)
- Includes dark mode support, custom colors, and spacing scales

**React Router v6**

React Router provides declarative routing for React applications. Features used:
- `<BrowserRouter>` for HTML5 history API-based routing
- `<Routes>` and `<Route>` for defining URL-to-component mappings
- `<Navigate>` for programmatic redirections
- `useNavigate`, `useParams`, `useLocation` hooks for navigation control
- Protected routes implemented via wrapper components checking auth state

**Marked.js**

Marked is a markdown-to-HTML parser library used to render AI-generated markdown responses (bold text, bullet points, headings) in the chat interface and health analysis results.

**Axios**

Axios is a Promise-based HTTP client for making API requests from the browser. Features used:
- `axios.defaults.baseURL` for configuring the Render backend URL in production
- `axios.post()` for sending data to the backend
- Automatic JSON serialization/deserialization
- Request/response interceptors

#### 2.3.2 Backend Technologies

**Node.js**

Node.js is a JavaScript runtime built on Chrome's V8 engine that allows executing JavaScript on the server side. Key characteristics:
- **Non-blocking I/O:** Handles multiple concurrent requests efficiently using event loop
- **npm ecosystem:** Access to over 2 million packages
- **ES Modules support:** Used `"type": "module"` in package.json for modern import/export syntax
- **Environment variables:** Using dotenv package for configuration

**Express.js**

Express.js is a minimal and flexible Node.js web application framework. In CareAI, Express is used to:
- Define REST API routes (`/api/recommend`, `/api/chat`, `/api/generate_diet`, etc.)
- Parse JSON request bodies with `express.json()`
- Handle CORS with the `cors` package
- Set up middleware for request processing

**Google Generative AI SDK (@google/generative-ai)**

The official Google Generative AI SDK for Node.js is used to interact with Gemini models. Features used:
- `GoogleGenerativeAI` class for initializing the API client
- `getGenerativeModel()` for specifying the model (gemini-2.5-flash)
- `systemInstruction` for setting the AI persona
- `generateContent()` for sending prompts and receiving responses
- Multimodal support for processing base64-encoded images (Vision feature)

**Firebase Admin SDK (firebase-admin)**

The Firebase Admin SDK allows the backend server to interact with Firebase services with elevated privileges:
- Reading reminders from Firestore for the cron job
- Writing medical history records to Firestore after AI analysis
- Initialized using service account credentials stored as environment variables

**node-cron**

A pure JavaScript implementation of cron for Node.js. Used in CareAI to:
- Schedule a task to run every minute (`* * * * *`)
- Query Firestore for active medicine reminders
- Trigger Twilio SMS and voice calls at the scheduled reminder times

**Twilio (twilio)**

Twilio is a cloud communications platform providing APIs for SMS, voice calls, and messaging. In CareAI:
- **Twilio SMS:** Sends medicine reminder text messages to patients
- **Twilio Voice:** Makes automated voice calls with spoken reminder messages using TwiML
- Uses environment variables for SID, Auth Token, and phone number

**PDFKit (pdfkit)**

PDFKit is a PDF generation library for Node.js. Used to generate downloadable health analysis reports containing:
- Patient diagnosis and disease name
- Detailed description, medications, diet plan, workout, and precautions
- Formatted with colors, fonts, and sections

#### 2.3.3 Database and Authentication

**Firebase Authentication**

Firebase Authentication provides secure user authentication with:
- Email/password authentication
- Automatic token management and refresh
- `onAuthStateChanged()` listener for real-time auth state
- `signInWithEmailAndPassword()` and `createUserWithEmailAndPassword()`
- `signOut()` for secure logout

**Google Firestore**

Firestore is a NoSQL document database from Google Firebase. It stores all application data:
- **Real-time listeners** (`onSnapshot()`) for live doctor-patient chat
- **Security rules** for role-based data access control
- **Subcollections** for organizing medical history per user
- **Compound queries** with `where()` filters
- **Batch operations** for clearing history records

Firestore is chosen over traditional SQL databases because:
- No server-side database management required
- Scales automatically
- Built-in real-time synchronization
- Free tier suitable for academic/prototype use

#### 2.3.4 Deployment and DevOps

**Firebase Hosting**

Firebase Hosting provides:
- Global CDN with automatic SSL
- Zero-configuration deployment with `firebase deploy`
- SPA rewrite rules for React Router compatibility
- HTTP/2 for improved performance
- Cache-Control headers for static asset optimization

**Render**

Render is a cloud platform for deploying web services:
- Free tier Node.js web service hosting
- Automatic deployments from GitHub
- Environment variable management through dashboard
- `PORT` environment variable support
- Automatic HTTPS

**Git and GitHub**

Version control and code hosting:
- Repository: https://github.com/pavanreddyx7/care-ai-
- Branch: `main`
- Commit history for tracking all development changes

### 2.4 Hardware and Software Requirements

#### 2.4.1 Development Hardware Requirements

| Component | Minimum | Recommended |
|---|---|---|
| Processor | Intel Core i3 / AMD Ryzen 3 | Intel Core i5 / AMD Ryzen 5 |
| RAM | 4 GB | 8 GB |
| Storage | 20 GB free space | 50 GB SSD |
| Display | 1280×720 | 1920×1080 |
| Internet | 2 Mbps | 10 Mbps |

#### 2.4.2 End-User Hardware Requirements

| Component | Requirement |
|---|---|
| Device | Any smartphone, tablet, or computer |
| Internet | 1 Mbps or faster |
| Browser | Chrome 90+, Firefox 88+, Safari 14+, Edge 90+ |
| Screen | 360px wide minimum (mobile compatible) |

#### 2.4.3 Software Requirements

**Development Tools:**

| Software | Version | Purpose |
|---|---|---|
| Node.js | v18.0+ | Backend runtime |
| npm | v9.0+ | Package management |
| VS Code | Latest | Code editor |
| Git | v2.30+ | Version control |
| Firebase CLI | v15.0+ | Deployment tool |

**Dependencies — Backend:**

| Package | Version | Purpose |
|---|---|---|
| express | ^4.19.2 | Web framework |
| @google/generative-ai | ^0.21.0 | Gemini AI integration |
| firebase-admin | ^13.10.0 | Firestore Admin access |
| twilio | ^6.0.2 | SMS and voice calls |
| node-cron | ^4.2.1 | Scheduled tasks |
| pdfkit | ^0.15.0 | PDF generation |
| cors | ^2.8.5 | Cross-Origin Resource Sharing |
| dotenv | ^16.4.5 | Environment variable management |
| axios | ^1.7.2 | HTTP requests to external APIs |

**Dependencies — Frontend:**

| Package | Version | Purpose |
|---|---|---|
| react | ^18.3.1 | UI library |
| react-dom | ^18.3.1 | DOM rendering |
| react-router-dom | ^6.23.1 | Client-side routing |
| firebase | ^12.13.0 | Auth and Firestore |
| axios | ^1.7.2 | API calls |
| marked | ^12.0.0 | Markdown rendering |
| vite | ^5.2.11 | Build tool |
| @vitejs/plugin-react | ^4.3.1 | React support for Vite |

---

# CHAPTER 3

## SOFTWARE REQUIREMENT SPECIFICATION

### 3.1 Users

CareAI supports three distinct user roles, each with different permissions and functionalities:

**1. Patient**
- Can register with name, email, phone, and password
- Has access to all health tools: symptom analyzer, AI chat, medical vision, diet planner, drug safety checker, medicine reminders
- Can browse doctor and hospital directories
- Can book and manage appointments
- Can initiate and participate in real-time chat with doctors
- Can view and manage their medical history and saved diet plans
- Can find nearby healthcare providers using GPS or text search

**2. Doctor**
- Registers with professional details (specialty, hospital, bio, fees, experience)
- Can configure available consultation time slots (20-minute slots across 6 days)
- Can view, confirm, complete, and cancel patient appointments
- Can communicate with patients through real-time messaging
- Dashboard focused exclusively on professional features (no patient health tools visible)

**3. Hospital**
- Registers with hospital name, address, city, phone, and departments
- Can link doctors to the hospital (by name match or manual linking)
- Can view all appointments across all linked doctors
- Can update appointment statuses (confirm, complete, cancel)
- Manages hospital profile visible to patients browsing the hospital directory

### 3.2 Functional Requirements

#### 3.2.1 Authentication Module

| Req. ID | Requirement |
|---|---|
| FR-01 | The system shall allow new users to register with email, password, full name, phone, and role selection (Patient/Doctor/Hospital) |
| FR-02 | The system shall validate email format and enforce a minimum 6-character password |
| FR-03 | The system shall authenticate registered users using email and password |
| FR-04 | The system shall redirect users to role-specific dashboards after successful login |
| FR-05 | The system shall display appropriate error messages for invalid credentials |
| FR-06 | The system shall allow users to logout and clear session data |
| FR-07 | The system shall maintain authentication state across page refreshes |

#### 3.2.2 AI Health Analysis Module

| Req. ID | Requirement |
|---|---|
| FR-08 | The system shall display a searchable list of 70+ symptoms for patient selection |
| FR-09 | The system shall accept vital signs input: temperature (°F), systolic BP (mmHg), heart rate (bpm), SpO2 (%) |
| FR-10 | The system shall allow patients to input age, gender, and medical history conditions |
| FR-11 | The system shall send all inputs to the Gemini AI API and return probable diagnosis |
| FR-12 | The system shall display results including: disease name, description, medicines with dosages, precautions, diet, and workouts |
| FR-13 | The system shall highlight emergency cases with a red border and warning indicator |
| FR-14 | The system shall save the analysis result to the patient's medical history in Firestore |
| FR-15 | The system shall allow patients to download the analysis as a formatted PDF report |

#### 3.2.3 AI Chat Module

| Req. ID | Requirement |
|---|---|
| FR-16 | The system shall provide a conversational AI doctor chatbot |
| FR-17 | The system shall display AI responses in two separate cards: Medical advice and Herbal remedies |
| FR-18 | The system shall maintain conversation history for context-aware responses |
| FR-19 | The system shall display a typing indicator while waiting for AI response |

#### 3.2.4 Medical Vision Module

| Req. ID | Requirement |
|---|---|
| FR-20 | The system shall allow patients to upload medical images (JPG/PNG, max 5MB) |
| FR-21 | The system shall send the image to Gemini AI for analysis |
| FR-22 | The system shall display medical analysis and herbal remedy recommendations |
| FR-23 | The system shall support drag-and-drop image upload |

#### 3.2.5 Medicine Reminder Module

| Req. ID | Requirement |
|---|---|
| FR-24 | The system shall allow patients to create medicine reminders with medicine name, phone number, and one or more daily times |
| FR-25 | The backend cron job shall check active reminders every minute |
| FR-26 | The system shall send an SMS reminder via Twilio at scheduled times |
| FR-27 | The system shall make an automated voice call at scheduled times |
| FR-28 | The system shall allow patients to pause, resume, and delete reminders |
| FR-29 | The system shall provide a test function to send an immediate test SMS and call |

#### 3.2.6 Appointment Module

| Req. ID | Requirement |
|---|---|
| FR-30 | Doctors shall be able to define available time slots per day (20-minute intervals, 09:00–17:00) |
| FR-31 | Patients shall select a date and view available/booked slots in color-coded grid (green=available, orange=booked) |
| FR-32 | Patients shall confirm appointment with a reason for visit |
| FR-33 | The system shall save appointment details to Firestore including patient name, phone, doctor, date, time, and status |
| FR-34 | Doctors shall be able to confirm, complete, or cancel appointments from their dashboard |
| FR-35 | Patients shall be able to cancel their appointments |
| FR-36 | Hospital accounts shall view all appointments across linked doctors |

#### 3.2.7 Doctor-Patient Chat Module

| Req. ID | Requirement |
|---|---|
| FR-37 | Patients shall be able to initiate a chat session with a doctor from the doctor's profile page |
| FR-38 | Chat messages shall be synchronized in real-time using Firestore onSnapshot listeners |
| FR-39 | Doctors shall see all patient chat threads in their dashboard |
| FR-40 | The system shall display the last message preview in the chat list |

#### 3.2.8 Doctor and Hospital Directory

| Req. ID | Requirement |
|---|---|
| FR-41 | The system shall display a list of all registered doctors filterable by specialty and searchable by name/hospital |
| FR-42 | Each doctor profile shall display: name, specialty, hospital, rating, experience, fees, bio, and available slots |
| FR-43 | The system shall display a list of registered hospitals with their name, city, specialties, and linked doctors |
| FR-44 | Patients shall be able to book appointments directly from doctor profiles |

#### 3.2.9 Nearby Doctor Finder

| Req. ID | Requirement |
|---|---|
| FR-45 | The system shall use the device GPS to find nearby healthcare providers |
| FR-46 | Patients shall be able to search by city/area if GPS is unavailable |
| FR-47 | Search results shall display name, address, rating, and action buttons (View Map, Directions, Open Maps) |
| FR-48 | The system shall embed a Google Maps iframe for selected locations |

#### 3.2.10 Diet Planner Module

| Req. ID | Requirement |
|---|---|
| FR-49 | The system shall generate a 7-day meal plan based on cuisine, diet type, health goal, and age |
| FR-50 | Each day's plan shall include breakfast, lunch, snack, dinner, and estimated calories |
| FR-51 | Patients shall be able to save diet plans to their profile for future reference |

### 3.3 Non-Functional Requirements

| Req. ID | Category | Requirement |
|---|---|---|
| NFR-01 | Performance | AI health analysis response shall complete within 10 seconds under normal network conditions |
| NFR-02 | Performance | Page load time shall be under 3 seconds on a 4G connection |
| NFR-03 | Security | All user data shall be stored in Firebase with role-based security rules preventing unauthorized access |
| NFR-04 | Security | Passwords shall be handled exclusively by Firebase Authentication (never stored in plaintext) |
| NFR-05 | Security | API keys and credentials shall be stored as environment variables and never exposed in frontend code |
| NFR-06 | Reliability | The system shall be available 99% of the time leveraging Firebase and Render managed infrastructure |
| NFR-07 | Usability | The application shall be fully functional on screens as narrow as 360px (mobile devices) |
| NFR-08 | Usability | All interactive elements shall be accessible via touch on mobile devices (minimum 44px tap targets) |
| NFR-09 | Scalability | The Firestore database shall support up to 50,000 daily reads without requiring a paid plan |
| NFR-10 | Maintainability | Code shall follow component-based architecture enabling independent feature updates |
| NFR-11 | Compatibility | The application shall be compatible with Chrome 90+, Firefox 88+, Safari 14+, and Edge 90+ |
| NFR-12 | Privacy | Medical history data shall be accessible only to the respective patient (Firestore UID-based rules) |

---

# CHAPTER 4

## SYSTEM DESIGN

### 4.1 System Perspective

CareAI follows a **Three-Tier Architecture** consisting of:

1. **Presentation Tier (Frontend):** React.js SPA deployed on Firebase Hosting. Handles all user interactions, form inputs, navigation, and result rendering. Communicates with the application tier via HTTP API calls.

2. **Application Tier (Backend):** Node.js/Express server deployed on Render. Processes AI requests by calling the Gemini API, manages PDF generation, handles Twilio notifications, and runs the cron scheduler for medicine reminders.

3. **Data Tier (Firebase):** Google Firestore NoSQL database and Firebase Authentication manage all persistent data including user accounts, appointments, reminders, medical history, chat messages, and doctor profiles.

```
┌─────────────────────────────────────────────────────────┐
│                 PRESENTATION TIER                        │
│         React.js + Vite (Firebase Hosting)               │
│  ┌──────────┐ ┌────────┐ ┌────────┐ ┌───────────────┐  │
│  │ Patient  │ │ Doctor │ │Hospital│ │  Landing Page  │  │
│  │Dashboard │ │  Dash  │ │  Dash  │ │  (Auth Forms)  │  │
│  └──────────┘ └────────┘ └────────┘ └───────────────┘  │
└──────────────────┬────────────────────────┬─────────────┘
                   │ HTTP/HTTPS (Axios)      │ Firebase SDK
                   ▼                        ▼
┌─────────────────────────┐  ┌─────────────────────────────┐
│   APPLICATION TIER       │  │        DATA TIER             │
│  Node.js + Express       │  │  Firebase Auth + Firestore  │
│  (Render.com)            │  │  (Google Cloud)             │
│  ┌─────────────────────┐│  │  ┌─────────────────────────┐│
│  │ /api/recommend      ││  │  │ users/{uid}              ││
│  │ /api/chat           ││  │  │ doctors/{uid}            ││
│  │ /api/generate_diet  ││  │  │ hospitals/{uid}          ││
│  │ /api/check_safety   ││  │  │ appointments/{id}        ││
│  │ /api/download_report││  │  │ reminders/{id}           ││
│  │ /api/doctors        ││  │  │ chats/{chatId}/messages  ││
│  │ /api/reminders/test ││  │  │ history/{uid}/records    ││
│  └─────────────────────┘│  │  │ saved_diets/{uid}/plans  ││
│  ┌─────────────────────┐│  │  └─────────────────────────┘│
│  │ Gemini AI SDK       ││  └─────────────────────────────┘
│  │ Twilio SDK          ││
│  │ node-cron           ││
│  │ Firebase Admin SDK  ││
│  └─────────────────────┘│
└─────────────────────────┘
```

### 4.2 System Architecture

The CareAI system architecture diagram shows the flow of data between components:

**Patient Flow:**
1. Patient opens the app in browser → Firebase Auth verifies session
2. Patient selects symptoms and enters vitals → Frontend sends POST to `/api/recommend`
3. Backend calls Gemini AI → Receives structured JSON response
4. Backend saves result to Firestore `history/{uid}/records` via Admin SDK
5. Frontend displays results and offers PDF download

**Doctor Appointment Flow:**
1. Patient browses doctor directory → Fetches `doctors` collection from Firestore
2. Patient selects date → Frontend queries Firestore for existing appointments
3. Patient selects slot and confirms → Frontend writes to `appointments` collection
4. Doctor opens dashboard → Firestore query for appointments by doctor name
5. Doctor updates status → Frontend writes `updateDoc` to Firestore

**Medicine Reminder Flow:**
1. Patient sets reminder → Frontend writes to `reminders` collection in Firestore
2. Backend cron runs every minute → Queries `reminders` via Firebase Admin SDK
3. Matches current time → Calls Twilio API to send SMS and voice call
4. Patient receives notification → Takes medicine on time

### 4.3 Context Diagram

The context diagram shows CareAI as a central system interacting with external entities:

**External Entities:**
- **Patient User:** Provides symptoms, vitals, images; receives diagnosis, reminders, appointments
- **Doctor User:** Provides availability; receives appointment requests, patient messages
- **Hospital User:** Provides hospital data; receives appointment overviews
- **Google Gemini AI:** External AI API providing medical analysis and recommendations
- **Firebase (Google Cloud):** Authentication, Firestore database, static file hosting
- **Twilio:** External API for SMS and voice call notifications
- **Google Maps:** External service for location-based doctor search embedding

**Data Flows:**
- Patient → CareAI: Symptoms, vitals, age, gender, images, booking requests
- CareAI → Patient: Diagnosis, chat responses, appointment confirmation, SMS reminders
- CareAI → Gemini AI: Structured medical prompts, base64 images
- Gemini AI → CareAI: JSON-formatted medical responses
- CareAI → Firebase: User records, appointments, reminders, chat messages
- Firebase → CareAI: Real-time query results, auth tokens
- CareAI → Twilio: SMS/call requests with phone numbers and messages
- Twilio → Patient: SMS text, automated voice call

---

# CHAPTER 5

## DETAILED DESIGN

### 5.1 Use Case Diagram

#### 5.1.1 Patient Use Cases

**Actor: Patient**

| Use Case ID | Use Case Name | Description |
|---|---|---|
| UC-01 | Register Account | Patient creates a new account with email, password, name, phone |
| UC-02 | Login | Patient authenticates with email and password |
| UC-03 | Analyze Health | Patient inputs symptoms and vitals for AI analysis |
| UC-04 | Chat with AI Doctor | Patient asks health questions in conversational interface |
| UC-05 | Analyze Medical Image | Patient uploads image for AI vision analysis |
| UC-06 | Check Drug Interaction | Patient enters two medicine names to check safety |
| UC-07 | Generate Diet Plan | Patient sets preferences and receives 7-day meal plan |
| UC-08 | Set Medicine Reminder | Patient creates reminder with medicine name, time, and phone |
| UC-09 | Browse Doctor Directory | Patient searches and filters registered doctors |
| UC-10 | View Doctor Profile | Patient views doctor details, specialties, availability |
| UC-11 | Book Appointment | Patient selects date, slot, and confirms appointment |
| UC-12 | Cancel Appointment | Patient cancels an upcoming appointment |
| UC-13 | Chat with Doctor | Patient initiates and continues real-time chat with doctor |
| UC-14 | Find Nearby Doctors | Patient uses GPS or text to find nearby healthcare providers |
| UC-15 | View Medical History | Patient reviews past AI consultations |
| UC-16 | Save Diet Plan | Patient saves generated diet plan to profile |
| UC-17 | Download Health Report | Patient downloads PDF of health analysis results |
| UC-18 | Browse Hospitals | Patient browses registered hospitals and linked doctors |

#### 5.1.2 Doctor Use Cases

**Actor: Doctor**

| Use Case ID | Use Case Name | Description |
|---|---|---|
| UC-19 | Register as Doctor | Doctor creates account with professional details |
| UC-20 | Edit Doctor Profile | Doctor updates specialty, fees, experience, bio |
| UC-21 | Manage Consultation Slots | Doctor enables/disables time slots per day |
| UC-22 | View Appointments | Doctor sees all appointments with patient details |
| UC-23 | Confirm Appointment | Doctor confirms a pending appointment |
| UC-24 | Complete Appointment | Doctor marks an appointment as completed |
| UC-25 | Cancel Appointment | Doctor cancels a scheduled appointment |
| UC-26 | View Patient Chats | Doctor sees list of active patient chat threads |
| UC-27 | Reply to Patient | Doctor sends messages in patient chat thread |

#### 5.1.3 Hospital Use Cases

**Actor: Hospital**

| Use Case ID | Use Case Name | Description |
|---|---|---|
| UC-28 | Register as Hospital | Hospital creates account with name, address, city, departments |
| UC-29 | Edit Hospital Profile | Hospital updates information and specialties |
| UC-30 | Manage Linked Doctors | Hospital adds/removes doctors from their panel |
| UC-31 | View All Appointments | Hospital sees all appointments for all linked doctors |
| UC-32 | Update Appointment Status | Hospital confirms, completes, or cancels appointments |

### 5.2 Sequence Diagrams

#### 5.2.1 Sequence Diagram: AI Health Analysis

```
Patient        Frontend       Backend         Gemini AI       Firestore
   │               │              │               │               │
   │─ Enter ──────►│              │               │               │
   │  Symptoms     │              │               │               │
   │               │─ POST ──────►│               │               │
   │               │ /api/recommend│              │               │
   │               │              │─ generateAI()►│               │
   │               │              │               │               │
   │               │              │◄─ JSON result─│               │
   │               │              │               │               │
   │               │              │─ Admin.add() ────────────────►│
   │               │              │  history record               │
   │               │              │               │               │
   │               │◄─ response ──│               │               │
   │               │  {disease,   │               │               │
   │               │   medicine,  │               │               │
   │               │   diet...}   │               │               │
   │◄─ Display ────│              │               │               │
   │   Results     │              │               │               │
   │               │              │               │               │
   │─ Click ───────│              │               │               │
   │  Download PDF │              │               │               │
   │               │─ POST ──────►│               │               │
   │               │ /api/download│               │               │
   │               │              │               │               │
   │               │◄─ PDF blob ──│               │               │
   │◄─ Save file ──│              │               │               │
```

#### 5.2.2 Sequence Diagram: Appointment Booking

```
Patient        Frontend       Firestore       Doctor(Frontend)
   │               │              │               │
   │─ Select ──────►│             │               │
   │  Doctor        │             │               │
   │               │─ getDoc ────►│               │
   │               │  doctors/id  │               │
   │               │◄─ doctor data│               │
   │─ Pick Date ───►│             │               │
   │               │─ getDocs ───►│               │
   │               │  appointments│               │
   │               │  where doctorName==           │
   │               │◄─ booked slots               │
   │               │  (color code)│               │
   │─ Pick Slot ───►│             │               │
   │─ Confirm ─────►│             │               │
   │               │─ addDoc ────►│               │
   │               │  appointments│               │
   │               │  {userId,    │               │
   │               │   doctorName,│               │
   │               │   date/time, │               │
   │               │   status:    │               │
   │               │   Confirmed} │               │
   │               │◄─ success ───│               │
   │◄─ "Booked!" ──│              │               │
   │               │              │               │
   │               │              │◄─ getDocs ────│
   │               │              │  appointments │
   │               │              │  where doctor │
   │               │              │  Name==       │
   │               │              │──────────────►│
   │               │              │  list shown   │
```

#### 5.2.3 Sequence Diagram: Medicine Reminder (Cron Job)

```
node-cron       Backend         Firestore       Twilio          Patient
    │               │               │               │               │
    │─ trigger ────►│               │               │               │
    │  (every min)  │               │               │               │
    │               │─ query ──────►│               │               │
    │               │  reminders    │               │               │
    │               │  where        │               │               │
    │               │  active==true │               │               │
    │               │◄─ reminders ──│               │               │
    │               │               │               │               │
    │               │─ check current time vs reminder.times         │
    │               │               │               │               │
    │               │─ sendMessage()────────────────►│               │
    │               │  SMS reminder │               │               │
    │               │               │               │─ SMS ────────►│
    │               │─ calls.create()──────────────►│               │
    │               │  voice call   │               │               │
    │               │               │               │─ Phone call ─►│
    │               │               │               │               │
```

### 5.3 Activity Diagrams

#### 5.3.1 Activity Diagram: User Login and Role Routing

```
START
  │
  ▼
[User opens app]
  │
  ▼
[Check Firebase Auth state]
  │
  ├──── Not logged in ────► [Show Landing Page]
  │                               │
  │                         [User submits login form]
  │                               │
  │                         [Firebase signIn()]
  │                               │
  │                    ┌──── Error ────► [Show error message]
  │                    │                      │
  │                    │               [User tries again]
  │                    │
  │                    └──── Success
  │                               │
  ▼                          [Get user role from Firestore]
[Logged in]                        │
  │                    ┌──── patient ──► [Redirect to /dashboard]
  │                    │
  │                    ├──── doctor ───► [Redirect to /doctor-dashboard]
  │                    │
  │                    └──── hospital ─► [Redirect to /hospital-dashboard]
  │
  ▼
[User uses features]
  │
  ▼
[User clicks Logout]
  │
  ▼
[signOut() → Clear localStorage → Redirect to /]
  │
  ▼
END
```

#### 5.3.2 Activity Diagram: AI Health Analysis

```
START
  │
  ▼
[Patient opens Health Check page]
  │
  ▼
[Enter vitals (optional)] ──► [Click Auto-Measure Demo]
  │
  ▼
[Select medical history conditions]
  │
  ▼
[Search and select symptoms (min 1 required)]
  │
  ▼
[Enter age and gender]
  │
  ▼
[Click "Analyze Health Data"]
  │
  ▼
[Validate: symptoms selected?]
  │
  ├──── No ────► [Alert: "Select at least one symptom"]
  │                    │
  │               [Return to form]
  │
  └──── Yes
          │
          ▼
    [POST /api/recommend with all data]
          │
          ▼
    [Loading spinner shown]
          │
          ▼
    [Backend calls Gemini AI]
          │
          ▼
    [Gemini returns JSON diagnosis]
          │
          ▼
    [Backend saves to history in Firestore]
          │
          ▼
    [Frontend receives result]
          │
          ▼
    [Display result card with disease, medicines, diet]
          │
    ┌─────┴──────┐
    ▼            ▼
[Emergency?]  [Download PDF]
[Red border]
    │
    ▼
  END
```

#### 5.3.3 Activity Diagram: Doctor Slot Management

```
START
  │
  ▼
[Doctor opens My Profile tab]
  │
  ▼
[Load current slots from Firestore]
  │
  ▼
[Select Day (Mon–Sat)]
  │
  ▼
[View 20 time slots for selected day]
  │
  ├──► [Click individual slot] ──► [Toggle on/off]
  │
  ├──► [Click "Select All"] ───► [Enable all 20 slots for day]
  │
  └──► [Click "Deselect All"] ─► [Remove all slots for day]
          │
          ▼
    [Click Save Profile]
          │
          ▼
    [setDoc to doctors/{uid} with updated slots array]
          │
          ▼
    [setDoc to users/{uid} with name and phone]
          │
          ▼
    ["✅ Saved!" shown for 2 seconds]
          │
          ▼
        END
```

### 5.4 Database Design

CareAI uses **Google Firestore**, a NoSQL document-based database. Unlike relational databases, Firestore organizes data into collections containing documents with flexible fields.

#### 5.4.1 Collection: `users`

Document ID: Firebase Auth UID (string)

| Field | Type | Description |
|---|---|---|
| name | string | User's full name |
| email | string | Email address |
| phone | string | Phone number (+91XXXXXXXXXX) |
| role | string | "patient" / "doctor" / "hospital" |
| age | string | Age in years |
| gender | string | "Male" / "Female" / "Other" |
| bloodGroup | string | A+, B-, O+, AB+, etc. |
| weight | string | Weight in kg |
| height | string | Height in cm |
| allergies | string | Known allergies and medical notes |
| createdAt | string | ISO datetime of account creation |

#### 5.4.2 Collection: `doctors`

Document ID: Same as Firebase Auth UID

| Field | Type | Description |
|---|---|---|
| userId | string | Firebase Auth UID |
| name | string | Doctor's full name |
| specialty | string | Medical specialization |
| hospital | string | Hospital/clinic name |
| bio | string | About/professional bio |
| fees | number | Consultation fees in INR |
| rating | number | Doctor rating (1–5) |
| experience | number | Years of experience |
| phone | string | Contact phone number |
| slots | array[string] | Available slots e.g. ["Mon 09:00", "Tue 14:20"] |
| createdAt | string | ISO datetime of registration |

#### 5.4.3 Collection: `hospitals`

Document ID: Same as Firebase Auth UID

| Field | Type | Description |
|---|---|---|
| userId | string | Firebase Auth UID |
| name | string | Hospital/clinic name |
| phone | string | Contact phone number |
| address | string | Full postal address |
| city | string | City name |
| website | string | Hospital website URL |
| description | string | About the hospital |
| specialties | array[string] | Departments e.g. ["Cardiology", "ENT"] |
| doctorIds | array[string] | Manually linked doctor UIDs |
| createdAt | string | ISO datetime |

#### 5.4.4 Collection: `appointments`

Document ID: Auto-generated by Firestore

| Field | Type | Description |
|---|---|---|
| userId | string | Patient's Firebase UID |
| doctorId | string | Doctor's Firebase UID |
| doctorName | string | "Dr. [Name]" (used for queries) |
| appointmentDate | string | ISO format "YYYY-MM-DDTHH:MM" |
| reason | string | Reason for visit |
| status | string | "Confirmed" / "Completed" / "Cancelled" |
| patientName | string | Patient's name |
| patientPhone | string | Patient's phone number |
| createdAt | Timestamp | Firestore server timestamp |

#### 5.4.5 Collection: `reminders`

Document ID: Auto-generated by Firestore

| Field | Type | Description |
|---|---|---|
| userId | string | Patient's Firebase UID |
| medicine | string | Medicine or tablet name |
| times | array[string] | Reminder times e.g. ["08:00", "20:00"] |
| phone | string | Phone number to call/SMS |
| active | boolean | Whether reminder is active |

#### 5.4.6 Collection: `chats`

Document ID: `[doctorUID]_[patientUID]` (sorted alphabetically)

| Field | Type | Description |
|---|---|---|
| doctorUserId | string | Doctor's Firebase UID |
| doctorId | string | Doctor's document ID in doctors collection |
| patientUid | string | Patient's Firebase UID |
| doctorName | string | Doctor's full name |
| patientName | string | Patient's full name |
| lastMessage | string | Preview of the most recent message |
| lastAt | string | ISO datetime of last message |

**Subcollection: `chats/{chatId}/messages`**

| Field | Type | Description |
|---|---|---|
| sender | string | Firebase UID of message sender |
| senderName | string | Display name of sender |
| text | string | Message content |
| timestamp | Timestamp | Firestore server timestamp |

#### 5.4.7 Subcollection: `history/{uid}/records`

| Field | Type | Description |
|---|---|---|
| date | string | ISO datetime of consultation |
| disease | string | AI-diagnosed condition |
| description | string | Detailed description |
| medicine | string | Medication recommendations |
| precautions | string | Safety precautions |
| workouts | string | Exercise recommendations |
| diet | string | Dietary advice |
| symptoms | array[string] | Symptoms reported by patient |
| vitals | object | {temperature, systolic_bp, heart_rate, spo2} |

#### 5.4.8 Subcollection: `saved_diets/{uid}/plans`

| Field | Type | Description |
|---|---|---|
| cuisine | string | Indian / Mediterranean / Asian etc. |
| type | string | Vegetarian / Vegan / Keto etc. |
| goal | string | Weight Loss / Diabetes Management etc. |
| plan | array[object] | 7 day objects with breakfast, lunch, snack, dinner, calories |
| savedAt | Timestamp | When the plan was saved |

#### 5.4.9 Firestore Security Rules

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // Users can only read/write their own profile
    match /users/{uid} {
      allow read, write: if request.auth != null
        && request.auth.uid == uid;
    }
    // Doctors: any authenticated user can read, only the doctor can write
    match /doctors/{uid} {
      allow read: if request.auth != null;
      allow write: if request.auth != null
        && request.auth.uid == uid;
    }
    // Hospitals: any authenticated user can read, only the hospital can write
    match /hospitals/{uid} {
      allow read: if request.auth != null;
      allow write: if request.auth != null
        && request.auth.uid == uid;
    }
    // Chats: any authenticated user can read/write
    match /chats/{chatId} {
      allow read, write: if request.auth != null;
      match /messages/{msgId} {
        allow read, write: if request.auth != null;
      }
    }
    // Appointments: any authenticated user can create/read/update
    match /appointments/{apptId} {
      allow read, update: if request.auth != null;
      allow create: if request.auth != null;
    }
    // Saved diets: user can only access their own plans
    match /saved_diets/{uid}/{document=**} {
      allow read, write: if request.auth != null
        && request.auth.uid == uid;
    }
    // Medical history: user can only access their own records
    match /history/{uid}/records/{id} {
      allow read, write, delete: if request.auth != null
        && request.auth.uid == uid;
    }
    // Reminders: user can access only their own reminders
    match /reminders/{id} {
      allow read, write, delete: if request.auth != null
        && (resource == null
          || resource.data.userId == request.auth.uid);
    }
  }
}
```

---

# CHAPTER 6

## IMPLEMENTATION

### 6.1 Module Description

#### 6.1.1 Authentication Module

The authentication module is implemented using Firebase Authentication with React Context API for state management.

**Key Implementation — `App.jsx`:**
```javascript
useEffect(() => {
  return onAuthStateChanged(auth, async u => {
    setUser(u)
    if (u) {
      const cached = localStorage.getItem('careai_role')
      if (cached) setRole(cached)
      try {
        const snap = await getDoc(doc(db, 'users', u.uid))
        const dbRole = snap.exists()
          ? (snap.data().role || 'patient') : (cached || 'patient')
        setRole(dbRole)
        localStorage.setItem('careai_role', dbRole)
      } catch {
        setRole(cached || 'patient')
      }
    } else {
      setRole(null)
      localStorage.removeItem('careai_role')
    }
  })
}, [])
```

The role is cached in `localStorage` for instant redirect on page load, while Firestore verification ensures role changes are always reflected.

**Protected Routes:**
```javascript
function Private({ user, children }) {
  if (!user) return <Navigate to="/" />
  return (
    <>
      <Navbar />
      <div className="pb-24 md:pb-10">{children}</div>
    </>
  )
}
```

#### 6.1.2 AI Health Analysis Module

**Backend — `/api/recommend` endpoint:**

```javascript
app.post('/api/recommend', async (req, res) => {
  const { symptoms, vitals, history, age, gender, language, user_id } = req.body;
  const sysPrompt = `You are an expert AI Doctor...`;
  const userPrompt = `Patient: ${age}yr ${gender}
Symptoms: ${symptoms.join(', ')}
Vitals: Temp=${vitals.temperature}°F,
        BP=${vitals.systolic_bp}mmHg,
        HR=${vitals.heart_rate}bpm,
        SpO2=${vitals.spo2}%
History: ${history.join(', ')}
Return strict JSON: {disease, description, medicine,
precautions, workouts, diet, is_emergency}`;

  const aiText = await generateAI(sysPrompt, userPrompt);
  const result = parseAI(aiText);

  if (user_id && adminDb) {
    await adminDb.collection('history')
      .doc(user_id).collection('records').add({
        ...result, symptoms, vitals,
        date: new Date().toISOString()
      });
  }
  res.json(result);
});
```

#### 6.1.3 Real-Time Chat Module

**Patient-side chat initiation (DoctorProfile.jsx):**
```javascript
async function startChat() {
  const chatId = [doctor.userId, uid].sort().join('_')
  await setDoc(doc(db, 'chats', chatId), {
    doctorUserId: doctor.userId,
    doctorId: id,
    patientUid: uid,
    doctorName: doctor.name,
    patientName: myName || '',
    lastMessage: '',
    lastAt: new Date().toISOString()
  }, { merge: true })
  navigate(`/doctor-chat/${chatId}`,
    { state: { doctorName: doctor.name } })
}
```

**Real-time message subscription (DoctorChat.jsx):**
```javascript
useEffect(() => {
  const q = query(
    collection(db, 'chats', chatId, 'messages'),
    orderBy('timestamp')
  )
  const unsub = onSnapshot(q, snap => {
    setMessages(snap.docs.map(d => ({
      id: d.id, ...d.data()
    })))
  })
  return unsub
}, [chatId])
```

#### 6.1.4 Medicine Reminder Module

**Backend cron job:**
```javascript
cron.schedule('* * * * *', async () => {
  if (!adminDb || !twilioClient) return;
  const now = new Date();
  const hhmm = `${String(now.getHours()).padStart(2,'0')}
               :${String(now.getMinutes()).padStart(2,'0')}`;

  const snap = await adminDb.collection('reminders')
    .where('active', '==', true).get();

  for (const doc of snap.docs) {
    const r = doc.data();
    if ((r.times || []).includes(hhmm)) {
      await twilioClient.messages.create({
        body: `CareAI Reminder: Time to take ${r.medicine}`,
        from: process.env.TWILIO_PHONE,
        to: r.phone
      });
      await twilioClient.calls.create({
        twiml: `<Response><Say>Hello! This is your CareAI
                medicine reminder. Please take your
                ${r.medicine} now.</Say></Response>`,
        from: process.env.TWILIO_PHONE,
        to: r.phone
      });
    }
  }
});
```

#### 6.1.5 Appointment Booking Module

**Color-coded slot grid (DoctorProfile.jsx):**
```javascript
<div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 gap-2">
  {daySlots.map(t => {
    const booked = bookedTimes.includes(t)
    const selected = selectedTime === t
    return (
      <button key={t}
        onClick={() => !booked && setSelectedTime(t)}
        disabled={booked}
        className={`py-2.5 rounded-xl text-xs font-bold
          transition border-2 ${
          booked
            ? 'bg-orange-100 text-orange-500 border-orange-200
               cursor-not-allowed'
            : selected
              ? 'bg-blue-600 text-white border-blue-600
                 shadow-md scale-105'
              : 'bg-green-50 text-green-700 border-green-200
                 hover:bg-green-100'
        }`}>
        {t}
      </button>
    )
  })}
</div>
```

#### 6.1.6 Mobile Responsive Navigation

**Dual-layout Navbar (Navbar.jsx):**

The navigation bar uses two separate layouts:
- **Desktop (md: and above):** Horizontal sticky top navbar with logo and all navigation links
- **Mobile (below md):** Sticky top bar with logo and logout only, plus a fixed bottom tab bar with icon and label for each navigation item

```javascript
{/* Mobile bottom tab bar */}
<div className="md:hidden fixed bottom-0 left-0 right-0 z-50
  bg-white border-t border-slate-200 flex overflow-x-auto
  scrollbar-hide safe-bottom">
  {links.map(l => (
    <Link key={l.to} to={l.to}
      className={`flex flex-col items-center justify-center
        pt-2 pb-3 px-3 min-w-[64px] flex-shrink-0 transition-colors
        ${pathname === l.to ? 'text-blue-600' : 'text-slate-400'}`}>
      <span className="text-2xl">{l.icon}</span>
      <span className="text-[10px] font-semibold mt-1">
        {l.label}
      </span>
    </Link>
  ))}
</div>
```

#### 6.1.7 PDF Report Generation

**Backend — `/api/download_report` endpoint:**
```javascript
app.post('/api/download_report', (req, res) => {
  const { disease, description, medicine, diet,
          workouts, precautions } = req.body;
  const doc = new PDFDocument({ margin: 50 });
  res.setHeader('Content-Type', 'application/pdf');
  res.setHeader('Content-Disposition',
    'attachment; filename=CareAI_Report.pdf');
  doc.pipe(res);

  // Header
  doc.rect(0, 0, doc.page.width, 70).fill('#2563eb');
  doc.fillColor('white').fontSize(22)
    .font('Helvetica-Bold')
    .text('Care AI Health Report', 50, 22, { align: 'center' });

  // Sections
  section('Diagnosis', disease);
  section('Overview', description);
  section('Medications', medicine);
  section('Diet Plan', diet);
  section('Workout', workouts);
  section('Precautions', precautions);

  doc.end();
});
```

### 6.2 Screenshots

*(The following sections describe the application screens)*

**Screen 1: Landing Page (Login/Register)**
The landing page features an animated aurora background with gradient blobs in blue, purple, and green. The glass-morphism card contains tabs for Login and Register. The register form includes role selection buttons (Patient, Doctor, Hospital) with distinctive color coding.

**Screen 2: Health Check Dashboard (Patient)**
The main patient dashboard shows four vital sign input cards (Temperature, Blood Pressure, Heart Rate, SpO2) in a 2×2 grid on mobile and 1×4 on desktop. Below are medical history checkboxes and a searchable symptom grid with 70+ conditions. The "Analyze Health Data" button triggers the AI analysis.

**Screen 3: AI Analysis Results**
Results appear below the form in a white card with a blue (normal) or red (emergency) top border. The disease name appears in large bold text. A download PDF button is positioned in the header. Four colored cards display medicine, precautions, workout, and diet recommendations.

**Screen 4: AI Doctor Chat**
The chat interface resembles a messaging app with user messages on the right (blue bubbles) and AI responses displayed in a two-card grid — blue card for Medical advice and green card for Herbal remedies. A text input with Send button sits at the bottom.

**Screen 5: Medical Vision**
A large drag-and-drop area accepts medical image uploads. After upload, the image preview is shown. An optional context textarea allows additional description. Results appear in two cards (Medical Analysis and Herbal Remedies).

**Screen 6: Drug Safety Checker**
Two input fields separated by a lightning bolt icon accept medicine names. Results show a color-coded card: green (Safe), yellow (Caution), or red (Danger) with the interaction description and recommendation.

**Screen 7: Doctor Profile and Booking**
Doctor profile shows avatar, name, specialty, hospital, rating, experience, fees, and bio. A slot booking section has a date picker followed by a color-coded grid: green slots are available, orange are booked, blue is selected. After slot selection, a reason field and confirm button appear.

**Screen 8: Doctor Dashboard**
The doctor dashboard has three tabs: My Profile (with slot management grid), Appointments (with status filters and action buttons), and Chats (with patient chat thread list and inline chat panel).

**Screen 9: Medicine Reminders**
A form accepts medicine name, phone number, and multiple time inputs. Active reminders are shown as cards with Pause, Test, and Delete action buttons. Active reminders show a green "Active" badge; paused ones show grey "Paused".

**Screen 10: Hospital Finder**
Hospital cards are expandable accordions showing hospital name, city, phone, specialty tags, and doctor count. Expanded view shows linked doctors in a 2-column grid with Book Appointment buttons.

**Screen 11: Mobile Navigation**
On mobile, a fixed bottom tab bar shows icons and labels for all navigation items. The active tab is highlighted in blue with a small indicator dot. The tab bar is horizontally scrollable for the 10 patient navigation items.

---

# CHAPTER 7

## SOFTWARE TESTING

### 7.1 Testing Strategy

Software testing for CareAI was conducted in three phases:

1. **Unit Testing** — Individual functions and components tested in isolation
2. **Integration Testing** — Testing interactions between frontend, backend, and Firebase
3. **User Acceptance Testing (UAT)** — End-to-end testing by actual users

**Testing Tools Used:**
- Manual testing via browser developer tools (Chrome DevTools)
- Firebase Emulator Suite for local database testing
- Postman for API endpoint testing
- Console logging for backend debugging
- React DevTools for component state inspection

### 7.2 Unit Testing

#### 7.2.1 Authentication Module Test Cases

| Test ID | Test Description | Input | Expected Output | Actual Output | Status |
|---|---|---|---|---|---|
| UT-01 | Valid user login | Correct email + password | Redirect to role dashboard | Redirected to /dashboard | PASS |
| UT-02 | Invalid password | Correct email + wrong password | "Invalid email or password" message | Error message shown | PASS |
| UT-03 | Unregistered email | Non-existent email | Error message | Error message shown | PASS |
| UT-04 | Weak password registration | Password < 6 chars | "Password must be at least 6 characters" | Error shown | PASS |
| UT-05 | Empty name registration | Name field empty | "Please enter your name" | Alert shown | PASS |
| UT-06 | Doctor registration | Role: Doctor | Creates records in users + doctors collections | Both records created | PASS |
| UT-07 | Logout | Click Logout | Clear session, redirect to landing | Logged out, redirected | PASS |
| UT-08 | Auth persistence | Refresh page while logged in | Stay logged in | Remained logged in | PASS |

#### 7.2.2 Health Analysis Module Test Cases

| Test ID | Test Description | Input | Expected Output | Actual Output | Status |
|---|---|---|---|---|---|
| UT-09 | Empty symptom submission | No symptoms selected | Alert "Select at least one symptom" | Alert shown | PASS |
| UT-10 | Single symptom analysis | Symptom: Headache | AI returns diagnosis | Diagnosis displayed | PASS |
| UT-11 | Multiple symptoms with vitals | Fever + Cough + abnormal vitals | AI analysis with emergency flag if needed | Analysis displayed | PASS |
| UT-12 | Auto-measure demo | Click Auto-Measure | Vitals populated with random values | Vitals filled | PASS |
| UT-13 | Emergency detection | Chest Pain + High Fever | Red border on result card | Red border shown | PASS |
| UT-14 | PDF download | Click Download PDF | PDF file downloaded | PDF downloaded | PASS |
| UT-15 | History save | Complete analysis | Record saved to Firestore | Record in history | PASS |

#### 7.2.3 Appointment Module Test Cases

| Test ID | Test Description | Input | Expected Output | Actual Output | Status |
|---|---|---|---|---|---|
| UT-16 | Book available slot | Select green slot + confirm | Appointment created in Firestore | Created successfully | PASS |
| UT-17 | Booked slot disabled | Select orange slot | Button disabled, no action | Slot not selectable | PASS |
| UT-18 | Date in past | Select yesterday's date | No slots shown (min date set) | Input blocked | PASS |
| UT-19 | Doctor confirms appointment | Click Confirm button | Status changed to "Confirmed" | Status updated | PASS |
| UT-20 | Doctor completes appointment | Click Complete button | Status changed to "Completed" | Status updated | PASS |
| UT-21 | Patient cancels appointment | Click Cancel | Confirmation dialog + status update | Cancelled successfully | PASS |

#### 7.2.4 Medicine Reminder Test Cases

| Test ID | Test Description | Input | Expected Output | Actual Output | Status |
|---|---|---|---|---|---|
| UT-22 | Add reminder without phone | No phone number | "Enter your phone number" message | Message shown | PASS |
| UT-23 | Add valid reminder | Medicine + phone + time | Reminder saved to Firestore | Saved and listed | PASS |
| UT-24 | Add multiple times | Click + Add Time | New time field added | Time field added | PASS |
| UT-25 | Pause reminder | Click Pause | active set to false in Firestore | Status shows "Paused" | PASS |
| UT-26 | Test reminder | Click Test Now | Twilio SMS and call triggered | SMS received | PASS |
| UT-27 | Delete reminder | Click Delete + confirm | Reminder deleted from Firestore | Removed from list | PASS |

#### 7.2.5 Chat Module Test Cases

| Test ID | Test Description | Input | Expected Output | Actual Output | Status |
|---|---|---|---|---|---|
| UT-28 | Start chat with doctor | Click "Chat with Doctor" | Chat room created, navigate to chat page | Navigated to chat | PASS |
| UT-29 | Send message as patient | Type message + Enter | Message appears in real-time | Message shown | PASS |
| UT-30 | Doctor receives message | Patient sends message | Doctor dashboard shows chat notification | Chat listed | PASS |
| UT-31 | Real-time synchronization | Send message | Recipient sees message within 1 second | Immediate display | PASS |

### 7.3 Integration Testing

Integration testing verifies that different modules work together correctly.

| Test ID | Integration Scenario | Steps | Expected Result | Actual Result | Status |
|---|---|---|---|---|---|
| IT-01 | Login → Role Redirect | Login as doctor | Redirected to doctor dashboard, not patient dashboard | Correct redirect | PASS |
| IT-02 | Health Analysis → History | Run health analysis | Result appears in Medical History page | History updated | PASS |
| IT-03 | Doctor Register → Slot Setup → Patient Booking | Register doctor, set slots, patient books | Patient sees doctor's slots for booking | Booking successful | PASS |
| IT-04 | Patient Books → Doctor Views | Patient books appointment | Appointment appears in doctor's dashboard | Appointment visible | PASS |
| IT-05 | Reminder Created → Cron Fires | Set reminder for current+1 minute | SMS and call received at set time | SMS received | PASS |
| IT-06 | Diet Plan Generated → Profile Saved | Generate diet → Save | Plan appears in Saved Diets tab | Plan saved | PASS |
| IT-07 | Hospital Links Doctor → Patient Books | Hospital links doctor, patient books via hospital page | Booking goes through | Booking works | PASS |
| IT-08 | Image Upload → AI Analysis | Upload skin photo | Medical and herbal analysis displayed | Analysis shown | PASS |
| IT-09 | Auth Guard | Try to access /dashboard without login | Redirect to landing page | Redirected | PASS |
| IT-10 | Firestore Security Rules | Try to access another user's reminders | Access denied | Permission error | PASS |

### 7.4 User Acceptance Testing

UAT was conducted with 5 volunteer participants: 2 patients (students), 1 doctor (local physician), 1 hospital administrator, and 1 technical reviewer.

#### 7.4.1 UAT Scenarios

| Scenario | User Type | Task | Result | Feedback |
|---|---|---|---|---|
| UAT-01 | Patient | Register and complete health analysis | Completed in 4 minutes | "Very easy to use, results are detailed" |
| UAT-02 | Patient | Book appointment with a doctor | Completed in 2 minutes | "Color coding makes it clear which slots are available" |
| UAT-03 | Patient | Set up medicine reminder | Completed in 1 minute | "Received SMS as expected" |
| UAT-04 | Patient | Use AI chat for back pain query | Completed in 1 minute | "Two-column layout is clean" |
| UAT-05 | Doctor | Set up profile and manage slots | Completed in 5 minutes | "Slot grid is intuitive" |
| UAT-06 | Doctor | View and confirm patient appointment | Completed in 30 seconds | "Dashboard is focused and not cluttered" |
| UAT-07 | Hospital | Link doctors and view appointments | Completed in 3 minutes | "Clear overview of all appointments" |
| UAT-08 | Patient | Use app on mobile (smartphone) | Completed all tasks | "Bottom navigation is very convenient" |
| UAT-09 | Patient | Upload lab report for analysis | Completed in 1 minute | "Accurate identification of report contents" |
| UAT-10 | Patient | Check drug interaction | Completed in 30 seconds | "Simple and clear result" |

#### 7.4.2 UAT Rating Summary

| Feature | Average Rating (1–5) |
|---|---|
| Ease of Registration | 4.8 |
| UI Design and Aesthetics | 4.7 |
| AI Health Analysis Accuracy | 4.3 |
| Appointment Booking | 4.9 |
| Medicine Reminders | 4.6 |
| Mobile Usability | 4.8 |
| AI Chat Responses | 4.4 |
| Overall Satisfaction | **4.6 / 5** |

#### 7.4.3 Bugs Found and Fixed During UAT

| Bug ID | Description | Severity | Fix Applied |
|---|---|---|---|
| BUG-01 | Doctor appointments not loading due to Firestore security rule | High | Changed rule to `allow read: if request.auth != null` |
| BUG-02 | Chat input focus lost after each keystroke | High | Moved helper components to module level to prevent React remount |
| BUG-03 | Firestore Timestamp crash in Saved Diets | Medium | Added `.toDate()` conversion before `.toLocaleDateString()` |
| BUG-04 | Booking slot grid too cramped on mobile (4 columns) | Low | Changed to `grid-cols-3 sm:grid-cols-4 md:grid-cols-5` |
| BUG-05 | Chat input hidden behind mobile bottom tab bar | Medium | Added `.chat-panel` CSS with responsive height calculation |
| BUG-06 | Stale reminder closures in useEffect | Medium | Wrapped fetch function in `useCallback` |

---

# CHAPTER 8

## CONCLUSION

The CareAI project successfully demonstrates the effective integration of Artificial Intelligence, cloud computing, and modern web development to create a comprehensive medical assistant platform. The following objectives were achieved:

1. **AI-Powered Health Analysis:** The system accurately analyzes patient symptoms, vital signs, age, and medical history using Google Gemini AI to provide probable diagnoses with detailed treatment recommendations. The AI's ability to process natural language prompts and return structured JSON responses enables dynamic, context-aware medical guidance.

2. **Complete Patient Management:** CareAI provides patients with a unified platform for all their healthcare needs — from initial symptom analysis to booking appointments, managing reminders, and saving diet plans — eliminating the need for multiple separate applications.

3. **Effective Telemedicine Foundation:** The real-time doctor-patient chat system using Firebase Firestore's live listeners provides instant communication, laying the groundwork for a complete telemedicine platform.

4. **Automated Medication Compliance:** The Twilio-powered medicine reminder system that sends both SMS and voice calls addresses one of the most critical challenges in chronic disease management — medication non-compliance.

5. **Multi-Role Platform:** The role-based architecture successfully serves three distinct user types (Patient, Doctor, Hospital) with tailored dashboards and appropriate access controls, making the platform viable for real-world healthcare use.

6. **Mobile Accessibility:** The responsive design with a mobile-optimized bottom tab bar ensures the platform is fully functional on budget smartphones, making AI-powered healthcare guidance accessible to a wider population.

7. **Successful Cloud Deployment:** The application is live and accessible globally at https://care-ai-ssibm.web.app, demonstrating practical deployment skills using Firebase Hosting and Render.

**Limitations:**

- The AI analysis is meant for informational purposes only and does not replace professional medical diagnosis
- The Render free tier causes a 30–60 second cold start delay after periods of inactivity
- The application currently only supports English language
- Video telemedicine calls are not yet implemented
- The GPS-based doctor search depends on the Google Maps/Gemini API which may have usage limits

**Overall Assessment:**

CareAI successfully meets all its defined objectives and represents a complete, deployable healthcare technology solution built by undergraduate students using industry-standard tools and technologies. The project demonstrates proficiency in full-stack web development, AI API integration, cloud services, real-time databases, and responsive UI design.

---

# CHAPTER 9

## FUTURE ENHANCEMENTS

The following enhancements are planned for future versions of CareAI:

### 9.1 Video Telemedicine Integration

Integrate WebRTC or a third-party service like Agora.io or Twilio Video for real-time video and audio consultations between patients and doctors. This would transform CareAI from a messaging platform into a full telemedicine solution, allowing doctors to conduct virtual appointments directly through the platform.

### 9.2 Multi-Language Support

Implement internationalization (i18n) using the `react-i18next` library to support Indian regional languages including Kannada, Hindi, Tamil, Telugu, and Malayalam. The Gemini AI API supports multiple languages, making it feasible to provide health guidance in the patient's native language.

### 9.3 Wearable Device Integration

Connect CareAI with wearable devices (smartwatches, fitness bands) using Bluetooth Web API or vendor SDKs to automatically capture real-time vital signs (heart rate, SpO2, steps, sleep data) and feed them into health analysis without manual entry.

### 9.4 Electronic Health Records (EHR)

Develop a comprehensive EHR module that stores:
- Complete medical history from all consultations
- Uploaded documents (prescriptions, lab reports, X-rays)
- Vaccination records
- Allergy and medication history
- Shareable patient health summary for doctor consultations

### 9.5 Payment Gateway Integration

Integrate Razorpay or PayU payment gateway to enable:
- Online payment for paid doctor consultations
- Hospital appointment deposits
- Subscription plans for premium AI analysis features
- Doctor revenue management dashboard

### 9.6 AI Prescription Analysis

Use Gemini Vision AI to:
- Extract medicine names and dosages from handwritten or typed prescriptions
- Automatically create medicine reminders from uploaded prescriptions
- Check prescribed medications for known interactions
- Provide detailed information about each prescribed medicine

### 9.7 Progressive Web App (PWA)

Convert CareAI into a PWA by adding:
- Service Worker for offline functionality
- Web App Manifest for home screen installation
- Push Notifications via Web Push API for appointment and reminder alerts
- Background sync for offline form submissions

### 9.8 Analytics Dashboard

Add an analytics module for:
- Doctors: patient visit trends, most common conditions, appointment statistics
- Hospitals: department-wise appointment analysis, peak hours
- Admin: platform usage metrics, AI query patterns

### 9.9 Emergency Services Integration

Add a one-touch emergency button that:
- Sends GPS location to selected emergency contacts via SMS
- Dials the local emergency number (112 in India)
- Alerts the nearest registered hospital on the platform

### 9.10 AI-Powered Report Interpretation

Enhance the Vision module to specifically interpret:
- Blood test reports (CBC, LFT, KFT, lipid profiles)
- Urine analysis reports
- ECG traces
- MRI and CT scan reports
- Provide layman explanations alongside medical analysis

---

# APPENDIX A — BIBLIOGRAPHY

### Books

1. Flanagan, D. (2020). *JavaScript: The Definitive Guide* (7th ed.). O'Reilly Media.
2. Banks, A., & Porcello, E. (2020). *Learning React: Modern Patterns for Developing React Apps* (2nd ed.). O'Reilly Media.
3. Hahn, E. (2020). *Express in Action: Writing, Building, and Testing Node.js Applications*. Manning Publications.
4. Pressman, R. S. (2014). *Software Engineering: A Practitioner's Approach* (8th ed.). McGraw-Hill Education.
5. Sommerville, I. (2015). *Software Engineering* (10th ed.). Pearson Education.

### Research Papers and Articles

6. Topol, E. J. (2019). High-performance medicine: the convergence of human and artificial intelligence. *Nature Medicine*, 25(1), 44–56.
7. Obermeyer, Z., & Emanuel, E. J. (2016). Predicting the Future — Big Data, Machine Learning, and Clinical Medicine. *New England Journal of Medicine*, 375(13), 1216–1219.
8. Esteva, A., et al. (2019). A guide to deep learning in healthcare. *Nature Medicine*, 25(1), 24–29.
9. Bates, D. W., et al. (2014). Big data in health care: using analytics to identify and manage high-risk and high-cost patients. *Health Affairs*, 33(7), 1123–1131.
10. Nguyen, P., et al. (2017). Deep learning in healthcare: Review, opportunities and challenges. *arXiv:1802.02315*.

### Online References

11. React Documentation. (2024). *Getting Started with React*. Retrieved from https://react.dev
12. Firebase Documentation. (2024). *Firebase Firestore*. Retrieved from https://firebase.google.com/docs/firestore
13. Google AI. (2024). *Gemini API Documentation*. Retrieved from https://ai.google.dev
14. Twilio Documentation. (2024). *Programmable Messaging API*. Retrieved from https://www.twilio.com/docs/sms
15. Vite Documentation. (2024). *Vite Build Tool*. Retrieved from https://vitejs.dev
16. Tailwind CSS Documentation. (2024). *Tailwind CSS Utility Classes*. Retrieved from https://tailwindcss.com/docs
17. Node.js Documentation. (2024). *Node.js API*. Retrieved from https://nodejs.org/docs
18. Express.js Documentation. (2024). *Express 4.x API Reference*. Retrieved from https://expressjs.com
19. MDN Web Docs. (2024). *Web Technologies for Developers*. Retrieved from https://developer.mozilla.org
20. World Health Organization. (2023). *World Health Statistics 2023*. Retrieved from https://www.who.int

---

# APPENDIX B — USER MANUAL

## CareAI User Manual

### B.1 Getting Started

**Accessing CareAI**

CareAI is available as a web application at:
**https://care-ai-ssibm.web.app**

No installation is required. Open the URL in any modern web browser (Chrome, Firefox, Safari, or Edge) on your smartphone or computer.

**System Requirements**
- Any device with a modern web browser
- Internet connection (Wi-Fi or mobile data)
- For medicine reminders: a valid phone number capable of receiving SMS

---

### B.2 Account Registration

1. Open https://care-ai-ssibm.web.app in your browser
2. Click **"Create Account"** below the Sign In button
3. Fill in the registration form:
   - **Full Name:** Your complete name
   - **Email Address:** A valid email (used for login)
   - **Phone Number:** In format +91XXXXXXXXXX
   - **Password:** Minimum 6 characters
4. Select your **Role:**
   - 🙋 **Patient** — For individuals seeking health guidance
   - 👨‍⚕️ **Doctor** — For registered medical practitioners
   - 🏥 **Hospital** — For hospital or clinic administrators
5. Click **"Create Account"**

You will be automatically logged in and redirected to your role-specific dashboard.

---

### B.3 Patient Guide

#### B.3.1 Health Check (AI Analysis)

1. Navigate to **🩺 Health** from the navigation bar
2. Optionally enter your vital signs:
   - Temperature (°F) — e.g., 98.6
   - Systolic Blood Pressure (mmHg) — e.g., 120
   - Heart Rate (bpm) — e.g., 72
   - SpO2 (%) — e.g., 98
   - Or click **⚡ Auto-Measure (Demo)** for test values
3. Check any applicable **Medical History** conditions
4. Enter your **Age** and select **Gender**
5. Use the search box to find symptoms, then click to select them (selected symptoms show ✓)
6. Click **🔍 Analyze Health Data**
7. View your results — if marked with a red border, seek immediate medical attention
8. Click **⬇ Download PDF** to save your report

**Note:** Minimum one symptom must be selected to proceed.

#### B.3.2 AI Doctor Chat

1. Navigate to **💬 AI Chat** from the navigation
2. Type your health question in the text box at the bottom
3. Press **Enter** or click **Send**
4. The AI response appears in two cards:
   - **Blue card (🩺 Medical):** Conventional medical advice and medications
   - **Green card (🌿 Herbal):** Natural and herbal remedy suggestions
5. Continue the conversation — the AI remembers context from previous messages

#### B.3.3 Medical Vision (Image Analysis)

1. Navigate to **📷 Vision** from the navigation
2. Click the upload area or drag and drop your medical image
3. Optionally add context in the text area (e.g., "This rash has been present for 3 days")
4. Click **🔍 Analyze Image**
5. View the Medical Analysis and Herbal Remedies in separate cards

**Supported:** JPG, PNG images up to 5MB. Suitable for: skin conditions, lab reports, medicines, rashes, wounds.

#### B.3.4 Drug Safety Checker

1. Navigate to **💊 Safety** from the navigation
2. Enter the **first medicine name** (e.g., "Aspirin")
3. Enter the **second medicine name** (e.g., "Ibuprofen")
4. Click **🔍 Check Interaction**
5. View the result:
   - 🟢 **Safe** — Medicines can be taken together
   - 🟡 **Caution** — Take with care, consult doctor
   - 🔴 **Danger** — Do not combine these medicines

#### B.3.5 Medicine Reminders

1. Navigate to **👤 Profile** → Select **Reminders** tab
2. Fill the **Add Medicine Reminder** form:
   - Medicine name (e.g., "Metformin 500mg")
   - Your phone number (+91XXXXXXXXXX)
   - Add one or more reminder times using the time picker
   - Click **+ Add Time** for multiple daily doses
3. Click **⏰ Set Reminder**
4. Your reminder appears in the list below

**Managing Reminders:**
- **⏸ Pause** — Temporarily disable the reminder
- **▶ Resume** — Re-activate a paused reminder
- **📲 Test Now** — Send an immediate test SMS and call
- **🗑 Delete** — Permanently remove the reminder

**Note:** Reminders fire within 1 minute of the set time. Ensure your phone can receive international calls and SMS.

#### B.3.6 Finding and Booking Doctors

**Browse Doctor Directory:**
1. Navigate to **👨‍⚕️ Doctors**
2. Search by doctor name or hospital name
3. Filter by specialty using the pill buttons
4. Click **"View Profile & Book"** on any doctor card

**On Doctor Profile:**
1. Read the doctor's bio, specialty, fees, and experience
2. Click **"📅 Book Appointment"**
3. Select a **date** using the date picker
4. The slot grid appears showing:
   - 🟢 **Green** = Available (click to select)
   - 🟠 **Orange** = Already booked (cannot select)
   - 🔵 **Blue** = Your selected slot
5. Enter the **reason for visit**
6. Click **"✅ Confirm"**

**Browse Hospital Directory:**
1. Navigate to **🏥 Hospitals**
2. Search by hospital name or city
3. Click any hospital card to expand it
4. View linked doctors and click **"📅 Book Appointment"**

#### B.3.7 Chatting with a Doctor

1. Open any doctor's profile page
2. Click **"💬 Chat with Doctor"**
3. Type your message and press Enter or click Send
4. The doctor will respond from their dashboard
5. Messages sync in real-time

#### B.3.8 Diet Planner

1. Navigate to **🥗 Diet**
2. Select:
   - **Cuisine:** Indian, Mediterranean, Asian, etc.
   - **Diet Type:** Vegetarian, Non-Vegetarian, Vegan, Keto, etc.
   - **Health Goal:** Weight Loss, Diabetes Management, Muscle Building, etc.
   - **Age**
3. Click **🥗 Generate 7-Day Meal Plan**
4. View your personalized meal plan with breakfast, lunch, snack, dinner, and calorie count for each day
5. Click **💾 Save Plan** to save it to your profile

#### B.3.9 Nearby Doctor Finder

1. Navigate to **📍 Nearby**
2. Select the medical specialty needed
3. Click **📡 Use My GPS Location** (allow browser location permission) or
4. Enter a **city/area** and click **🔍 Search by City**
5. Click on any result to view it on the map
6. Use **🚗 Directions** or **📍 Open Maps** to navigate

---

### B.4 Doctor Guide

#### B.4.1 Setting Up Your Profile

1. Login with your Doctor account
2. You are directed to the **Doctor Dashboard**
3. Click **"My Profile"** tab
4. Fill in your professional details:
   - Full Name, Phone, Specialty
   - Hospital/Clinic name
   - Consultation Fees and Years of Experience
   - About/Bio
5. **Configure Available Slots:**
   - Select a day (Mon–Sat) using the day buttons
   - Click individual time slots to enable/disable them
   - Or use **"Select All"** / **"Deselect All"**
   - Blue slots = Available, Grey slots = Not Available
6. Click **"Save Profile"**

#### B.4.2 Managing Appointments

1. Click the **"Appointments"** tab in your dashboard
2. View all patient appointments with:
   - Patient name, date, time, and reason
   - Contact phone number
   - Current status
3. Use action buttons:
   - **✓ Confirm** — Accept a pending appointment
   - **✔ Complete** — Mark appointment as done
   - **✕ Cancel** — Cancel the appointment
   - **↩ Restore** — Restore a cancelled/completed appointment
4. Click **↻ Refresh** to load latest appointments

#### B.4.3 Patient Chats

1. Click the **"Chats"** tab in your dashboard
2. See all patient chat threads with the last message preview
3. Click any chat to open the conversation
4. Type your response and press Enter or click **Send**
5. Click **←** to return to the chat list

---

### B.5 Hospital Guide

#### B.5.1 Setting Up Hospital Profile

1. Login with your Hospital account
2. Fill in **Hospital Profile** tab:
   - Hospital name, phone, city, address, website
   - Description
   - Toggle department specialties
3. Click **"💾 Save Hospital Profile"**

#### B.5.2 Managing Doctors

1. Click **"Our Doctors"** tab
2. Doctors who entered your hospital name in their profile appear automatically
3. To manually add a doctor, click **"+ Add Doctor"**, search by name/specialty, and click **"+ Add"**
4. To remove a doctor, click **"✕ Remove from hospital"**

#### B.5.3 Viewing Appointments

1. Click **"Appointments"** tab
2. View all appointments across all linked doctors
3. Filter by status: All, Confirmed, Completed, Cancelled
4. Search by doctor name or reason
5. Update appointment status using action buttons

---

### B.6 Troubleshooting

| Issue | Solution |
|---|---|
| AI analysis is slow or not responding | The backend server may be waking up (Render free tier). Wait 30–60 seconds and try again |
| "Could not process" error in chat | Retry after 1 minute — backend may have been sleeping |
| Medicine reminder SMS not received | Verify phone number is in +91XXXXXXXXXX format. Check if phone can receive international SMS |
| Doctor appointment not showing | Click ↻ Refresh button. Check internet connection |
| Location not found for nearby doctors | Allow browser location permission or enter city/area manually |
| Slot grid not loading | Select a date and ensure the doctor has set availability for that day |
| Page appears blank after login | Hard refresh the page (Ctrl+Shift+R on desktop) |

---

*End of Project Report*

---

**Document Information:**
- Project Title: CareAI — An Intelligent Medical Assistant Web Application
- Institution: Sri Siddhartha Institute of Business Management, Tumkur
- University: Tumkur University
- Degree: Bachelor of Computer Applications
- Academic Year: 2025–2026
- Live URL: https://care-ai-ssibm.web.app
- GitHub Repository: https://github.com/pavanreddyx7/care-ai-
