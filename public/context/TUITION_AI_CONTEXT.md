# AI Context for SmartTuition (App Thu Học Phí)

This document provides essential context for AI assistants working on the SmartTuition project. Use this information to generate accurate code, suggest relevant optimizations, and maintain architectural integrity.

## 1. Project Overview
- **Name:** SmartTuition (App Thu Học Phí)
- **Domain:** Tuition Management System for a High School (5000+ students).
- **Core Constraints:**
  - **High Concurrency:** Must handle 1000+ simultaneous transactions during break times (15-20 mins).
  - **Accuracy:** 100% financial precision (Zero Data Drift) for accounting audits.
  - **Network:** Deployed on local LAN (School Intranet), Static IP: `192.168.10.236`. No internet dependency for core operations.

## 2. Tech Stack & Architecture

### Backend (Laravel 10 + PHP 8.2)
- **Design Pattern:** Repository Pattern (e.g., `InvoiceRepository`) for business logic decoupling.
- **Database:** PostgreSQL 15.
  - **Partitioning:** `tuition_monthly_fee_listings` uses **LIST Partitioning** by `year_month` (e.g., `2024-09`, `2024-10`) to manage millions of records efficiently.
  - **Optimization:** Use Raw SQL for complex aggregations (Summing fees across partitions) to bypass Eloquent overhead.
- **Queue System:** Redis (for asynchronous tasks like email notifications, though primary usage is synchronous for immediate receipt generation).
- **Authentication:** Sanctum (SPA Authentication).

### Frontend (React 18 + Vite)
- **Styling:** Tailwind CSS (Utility-first).
- **State Management:** React Query (TanStack Query) for server state; Context API for local UI state.
- **Performance:** 
  - Component Lazy Loading for heavy modules (e.g., `AccountingDashboard`).
  - Debounced Search Inputs (300ms) to reduce API calls during student lookup.
- **Responsive Design:** Mobile-first approach (Optimized for teachers using tablets/phones).

### Infrastructure (Docker)
- **Containerization:** Nginx, PHP-FPM, PostgreSQL, Redis.
- **Deployment:** `docker-compose.yml` orchestrates services.
- **Migration Strategy:** Custom `2026_...` migration files handle year-over-year schema evolution and data archiving.

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

## 4. Coding Conventions & Best Practices

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

---
*This file is automatically maintained to provide context for AI-assisted development.*
