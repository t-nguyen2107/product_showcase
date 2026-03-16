# AI Context for SmartTuition (App Thu Học Phí)

This document provides essential context for AI assistants working on the SmartTuition project. Use this information to generate accurate code, suggest relevant optimizations, and maintain architectural integrity.

## 1. Project Overview
- **Name:** SmartTuition (App Thu Học Phí)
- **Domain:** Tuition Management System for a High School (5000+ students).
- **Core Constraints:**
  - **High Concurrency:** Must handle 1000+ simultaneous transactions during break times (15-20 mins).
  - **Accuracy:** 100% financial precision (Zero Data Drift) for accounting audits.
  - **Network:** Deployed on local LAN (School Intranet), Static IP: `192.168.10.236`. No internet dependency for core operations.

## 2. Tech Stack & Infrastructure

### 2.1 Codebase Structure
- **`backend/`** (Laravel 10)
  - `app/Http/Controllers/`: API endpoints & request handling.
  - `app/Models/`: Eloquent ORM & Relationships.
  - `app/Repositories/`: Business logic abstraction (e.g., `InvoiceRepository`).
  - `database/migrations/`: Schema definitions and table partitioning scripts.
  - `tests/`: Automated PHPUnit tests for financial logic.
- **`frontend/`** (React 18)
  - `src/components/`: Reusable UI modules (grouped by feature like `transaction/`, `students/`).
  - `src/services/`: API client configurations (Axios/React Query).
  - `src/App.jsx`: Main routing configuration.
- **`docs/`**: Comprehensive project documentation (See section 9).

### 2.2 Backend (Laravel 10 + PHP 8.2)
- **Design Pattern:** Repository Pattern (e.g., `InvoiceRepository`) for business logic decoupling.
- **Database:** PostgreSQL 15.
  - **Partitioning:** `tuition_monthly_fee_listings` uses **LIST Partitioning** by `year_month` (e.g., `2024-09`, `2024-10`) to manage millions of records efficiently.
  - **Optimization:** Use Raw SQL for complex aggregations (Summing fees across partitions) to bypass Eloquent overhead.
- **Queue System:** Redis (for asynchronous tasks like email notifications, though primary usage is synchronous for immediate receipt generation).
- **Authentication:** Sanctum (SPA Authentication).

### 2.3 Frontend (React 18 + Vite)
- **Styling:** Tailwind CSS (Utility-first).
- **State Management:** React Query (TanStack Query) for server state; Context API for local UI state.
- **Performance:** 
  - Component Lazy Loading for heavy modules (e.g., `AccountingDashboard`).
  - Debounced Search Inputs (300ms) to reduce API calls during student lookup.
- **Responsive Design:** Mobile-first approach (Optimized for teachers using tablets/phones).

### 2.4 Deployment Environment
- **Operating System:** Windows 10/11 (64-bit).
- **Hardware Requirements:**
  - **RAM:** Minimum 8GB (Recommended 16GB for Docker + heavy load).
  - **Storage:** 5GB+ free space.
- **Software Dependencies:**
  - Docker Desktop (WSL2 backend recommended).
  - pgAdmin 4 (for database management).
  - Git Desktop (for version control).
- **Network Configuration:**
  - **Static IP:** Server must be set to `192.168.10.236` to serve LAN clients.
  - **Ports:** 
    - Frontend: `3000` (Mapped to 80 via Nginx).
    - Backend API: `8000`.
    - Database: `5432`.

## 3. Key Business Rules (Domain Knowledge)

### Tuition Calculation Logic
- **Formula:** `Dư Nợ Cuối Kỳ` = `(Dư Nợ Đầu Kỳ + Phải Thu Trong Tháng) - Đã Thu Trong Tháng`.
  - `phaithu` (Receivable): Based on Grade, Class, and active Fee Policies.
  - `dathu` (Paid): Sum of all transactions successfully recorded in the current month.
  - `duno` (Debt): Remaining balance.
- **Edge Cases:**
  - **Mid-Month Transfer:** Student moves classes -> Recalculate `phaithu` pro-rata or full month (configurable).
  - **Exemptions:** Specific students have `discount` flags (e.g., Children of staff).
  - **Manual Invoice Dates:** Cashiers can backdate invoices; system must align `year_month` correctly based on `created_at` or `updated_at`.

### Invoice Generation
- **Format:** `YYYY/MM/ID` (e.g., `2024/09/0001`).
- **Concurrency Control:** Use Database Locks or Atomic Updates to prevent duplicate Invoice IDs during high load.
- **Validation:** Strict checks on `amount` > 0 and valid `student_id` before creation.

## 4. Detailed Business Workflows

### 4.1 Student Lifecycle & Fee Impact
- **Registration:** New student -> `active` status. Immediately liable for current month's tuition.
- **Active:** Regular monthly fee generation via `TuitionMonthlyFeeListingController`.
- **Leave School:**
  - Status changes to `leave_school = true`.
  - **Critical Rule:** If student has **outstanding debt** (`duno > 0`), they MUST remain in the `tuition_monthly_fee_listings` for subsequent months until debt is cleared. The system automatically carries over debt for "left" students.
- **Grade Promotion:** Bulk update of `grade` and `class` fields at year-end.

### 4.2 Tuition Collection Flow
1.  **Search:** Teacher searches student by Name/ID (Debounced API call).
2.  **Debt Check:** System queries `tuition_monthly_fee_listings` for current `duno`.
3.  **Payment Entry:**
    - Teacher enters amount.
    - System allocates payment to oldest debt first (FIFO) or specific month (configurable).
4.  **Invoice Generation:**
    - Backend creates `Invoice` record.
    - **Concurrency Lock:** Ensures no duplicate Invoice IDs.
    - Updates `tuition_monthly_fee_listings` (`dathu` increases, `duno` decreases).
5.  **Receipt:** PDF generated instantly for printing.

## 5. Key File Map (Where Logic Lives)

| Feature | Key File / Controller | Description |
| :--- | :--- | :--- |
| **Monthly Calculation** | `TuitionMonthlyFeeListingController.php` | The "Brain". Calculates `phaithu`, `dathu`, `duno` for all students. Handles partition checks. |
| **Invoice Logic** | `PaymentController.php` | Handles invoice ID generation, grade fallback, and transaction recording. |
| **Data Access** | `InvoiceRepository.php` | Abstraction layer for invoice queries. Fixes timezone/date logic. |
| **Student Search** | `StudentController.php` | Optimized search with caching. |
| **Frontend UI** | `TransactionHeader.jsx` | The main cashier interface. Handles responsive layout and student info display. |

## 6. Database Strategy & Partitioning
- **Table:** `tuition_monthly_fee_listings`
- **Partition Key:** `year_month` (e.g., `2024-09`).
- **Mechanism:** LIST Partitioning.
- **Management:**
  - **Automatic Creation:** The system checks/creates partitions before monthly processing (`ensureTuitionMonthlyFeeListingsPartitionExists`).
  - **Migration:** `2026_...` migration files handle future year setups.
- **JSON Fields:**
  - `duno` (Debt) is stored as JSONB to allow flexible breakdown by fee type (e.g., `{ "tuition": 500000, "meal": 200000 }`).

## 7. Common Tasks & Commands
- **Run Migrations (Safe):** `php artisan migrate` (Includes partition checks).
- **Recalculate Fees:** Trigger via API `/api/tuition-monthly/calculate/{month}/{year}`.
- **Clear Cache:** `php artisan cache:clear` (Crucial after updating Fee Policies).
- **Log Cleanup:** `php artisan log:clean` (Rotates daily logs to save space).

## 8. Coding Conventions & Best Practices

### Backend (PHP)
- **Strict Typing:** Declare return types (e.g., `: JsonResponse`, `: float`).
- **Error Handling:** Use `try-catch` blocks in Controllers; Log errors with context (`Log::error('FeeCalcFailed', ['student_id' => $id, 'error' => $e])`).
- **Null Safety:** Always check for null on optional relationships (e.g., `$student->class ?? 'N/A'`).

### Frontend (React)
- **Component Structure:** Functional Components with Hooks.
- **Props:** Use PropTypes or TypeScript interfaces (if TS is enabled) for prop validation.
- **Effect Hooks:** Minimize `useEffect`; prefer Event Handlers for user interactions.

## 5. Common Pitfalls to Avoid
- **N+1 Queries:** Always use `with()` eager loading for relationships (e.g., `Student::with('tuitions')`).
- **Timezone Issues:** Always use `Carbon::now('Asia/Bangkok')` to match the school's local time.
- **Floating Point Math:** Use `bcmath` or store currency as Integers (cents) to avoid rounding errors.

## 9. Detailed Documentation
For deep dives into specific modules, schema, or deployment guides, always refer to the **[Documentation Index](./docs/README.md)**.
- **[Database Schema](./docs/DATABASE_SCHEMA.md)**
- **[API Reference](./docs/API_DOCUMENTATION.md)**
- **[Deployment Guide](./docs/dev-deployment.md)**
- **[Project Structure](./docs/PROJECT_STRUCTURE.md)**

---
*This file is automatically maintained to provide context for AI-assisted development.*
