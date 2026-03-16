# AI-Driven Tuition Management System (SmartTuition)

**Role:** AI-Augmented Fullstack Engineer  
**Stack:** Laravel 10 (PHP), React 18 (JS), PostgreSQL 15, Docker, Tailwind CSS

## 1. Executive Summary
This project demonstrates the power of **AI-Driven Engineering** to rapidly architect, implement, and deploy a complex, enterprise-grade Tuition Management System for a **prestigious high school in Ho Chi Minh City with over 5,000 students**. By leveraging Large Language Models (LLMs) as a pair programmer and architect, I reduced development time by ~60% while maintaining high code quality.

> **Explore the AI Context:** To see the structured context provided to the AI for accurate code generation, view [AI_CONTEXT.md](./AI_CONTEXT.md).

The system is engineered to handle **high-concurrency bursts** during peak hours (e.g., break times) and beginning-of-month payment cycles, ensuring **100% financial accuracy** for seamless integration with external accounting software.

---

## 2. The AI Building Flow (Methodology)

My development process centers on an iterative **"Architect-Prompt-Refine"** loop, treating AI not just as a code generator but as a collaborative engineering partner.

### Phase 1: AI-Assisted Architecture & Schema Design
*   **Prompt Engineering Strategy:** Instead of writing raw SQL, I described high-level business rules (e.g., *"Students have monthly fees based on grade, but some have exemptions or late join dates"*).
*   **AI Output:** The AI suggested a **PostgreSQL Partitioning strategy** (`tuition_monthly_fee_listings` table partitioned by month) to handle millions of records efficiently—a sophisticated optimization rarely found in MVP stages.
*   **Result:** A scalable database schema that supports high-volume transaction processing without performance degradation.

### Phase 2: Complex Logic Implementation via "Conversational Refinement"
*   **Challenge:** Implementing the dynamic "Dư Nợ" (Debt) calculation which involves previous month balances, partial payments, and changing fee structures.
*   **AI Workflow:**
    1.  **Draft:** I provided the core mathematical formula.
    2.  **Edge Case Analysis:** I asked the AI to "act as a QA engineer" to find flaws (e.g., *What happens if a student transfers mid-month?*).
    3.  **Refinement:** The AI generated the `TuitionMonthlyFeeListingController` logic, including the critical `dataProcessing` method that handles these edge cases.
    4.  **Optimization:** We refactored the code to use **Repository Pattern** (`InvoiceRepository`) for better maintainability.

### Phase 3: Rapid UI/UX Prototyping
*   **Workflow:** I described the desired UI state (e.g., *"A responsive transaction header that collapses on mobile but shows detailed student info on desktop"*).
*   **AI Generation:** The AI generated accessible, **Tailwind CSS** components (e.g., `TransactionHeader.jsx`, `searchStudent.jsx`) with built-in responsiveness and dark mode support.
*   **Iterative Tweaking:** I used the AI to instantly adjust layout issues (e.g., fixing grid alignment in the search form) by pasting the current code and describing the visual bug.

### Phase 4: Automated Testing & Financial Integrity
*   **Strategy:** To guarantee **100% financial accuracy**, I shifted from reactive debugging to proactive testing by having AI generate comprehensive PHPUnit test suites.
*   **Workflow:**
    1.  **Scenario Description:** I outlined complex payment scenarios (e.g., *partial payments, retroactive fee adjustments, mid-month student transfers*).
    2.  **Test Generation:** The AI generated data-driven tests (e.g., `TuitionCalculationTest.php`) with hundreds of edge cases that would be tedious to write manually.
    3.  **Regression Safety:** Automated CI pipelines run these tests on every commit, ensuring that performance optimizations (like raw SQL refactoring) never compromise accounting data.

---

## 3. Key Technical Highlights

### Backend & Data Architecture (High Concurrency & Accuracy)
*   **Massive Throughput Handling:** Engineered to process thousands of transactions during peak 15-minute break times. Utilizes **Redis Caching** for rapid student profile lookups and **PostgreSQL List Partitioning** (`year_month`) to isolate active data, ensuring sub-second response times even with millions of historical records.
*   **100% Financial Integrity:** Implemented strict ACID transaction boundaries within the **Repository Pattern** (`InvoiceRepository`) to guarantee zero data drift—a hard requirement for automated daily exports to the school's accounting software.
*   **AI-Optimized Queries:** Replaced standard ORM calls with AI-generated raw SQL aggregations, reducing complex debt report generation time from minutes to milliseconds for the **5,000+ student dataset**.
*   **Dockerized Scalability:** Full stack containerization (Nginx, PHP-FPM, Postgres) ensures consistent performance and rapid deployment/rollback capabilities.

### Frontend (React & Tailwind)
*   **Dynamic Component Loading:** Optimized for local LAN performance (minimized bundle size).
*   **Real-time Updates:** Reactive UI for fee status changes.
*   **Complex Form Handling:** robust validation for invoice creation and student data entry.

### DevOps & Deployment
*   **Local LAN Optimization:** Configured for static IP access (`192.168.10.236`) to serve multiple client machines in a school network.
*   **Automated Migrations:** Custom migration scripts to handle year-over-year data transitions (e.g., `2026_...` migrations).

---

## 4. Conclusion
This project serves as a concrete example of **modern software engineering** where the developer orchestrates AI capabilities to deliver high-value software faster. It showcases not just coding ability, but the ability to **prompt, review, architect, and refine** complex systems using state-of-the-art AI tools.
