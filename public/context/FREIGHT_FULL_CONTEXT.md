# Freight Insurance Quoting System 2026 - Full Context

**Version:** 2.1.0
**Last Updated:** 2026-02-23
**Status:** ✅ **OPERATIONAL - All Systems Verified**

---

## 🎉 February 2026 - System Verification Complete

All core systems have been refactored, verified, and tested:
- **Email System:** Group-specific templates, direct DB column names
- **PDF System:** Aliased variables, all templates working
- **API Upload:** Proper variable mapping, document uploads operational

**Quick Test:** `php freight-insurance-quoting-system-2026/tests/test-all-systems.php`

**Documentation:** See [docs/](freight-insurance-quoting-system-2026/docs/) folder for detailed verification reports.

---

## 1. Project Overview

This project represents a complete modernization of the legacy Freight Insurance plugin. The goal is to provide a unified, maintainable, and robust quoting system for both **Direct Customers** and **Freight Forwarders (FF)**.

### 1.1 The "Memora" Protocol (Context Retention)

> **"If it's not documented, it doesn't exist."**

To prevent knowledge loss between AI sessions (which are stateless), this project follows the **Memora Protocol**:

1.  **Read-First:** Before any task, the AI MUST read `FULL_CONTEXT.md` and `docs/system-architecture/DATABASE.md`.
2.  **Write-Back:** Any architectural change, schema update, or new rule **MUST** be written back to these context files immediately.
3.  **Single Source of Truth:** The `docs/` folder and `FULL_CONTEXT.md` are the ultimate authority. Chat history is ephemeral and unreliable.

### 1.2 Old vs. New

| Feature | Legacy System (`freight-insurance-quote/`) | Modern System (`freight-insurance-quoting-system-2026/`) |
| :--- | :--- | :--- |
| **Structure** | Flat, monolithic classes, mixed concerns | **PSR-4 Namespaced**, Modular, Clean Architecture |
| **Frontend** | Multiple fragmented JS files, separate CSS | **Unified** `unified-quote.js` and `unified-styles.css` |
| **Shortcodes** | 6+ different shortcodes (one per form) | **Single Unified Shortcode** `[fiqs_unified_quote]` |
| **Calculations** | Hardcoded in various files | Dedicated **Calculator Classes** (Strategy Pattern) |
| **User Flow** | Disjointed | Streamlined: Quote -> Accept -> Payment -> Thank You |

## 2. Technical Architecture

### 2.1 Technology Stack
*   **Backend:** PHP 7.4+ (WordPress Plugin)
*   **Frontend:** HTML5, CSS3, jQuery, AJAX
*   **Database:** MySQL (Custom tables + WordPress Meta)
*   **Dependencies:** TCPDF/MPDF (for PDF generation), SecurePay (Payment Gateway)

### 2.2 Directory Structure
```
freight-insurance-quoting-system-2026/
├── freight-insurance-quoting-system.php  # Main Plugin Entry
├── assets/
│   ├── css/
│   │   └── unified-styles.css           # Global Styles
│   └── js/
│       ├── unified-quote.js             # Global Frontend Logic
│       └── vehiclepersonal-form.js      # Vehicle/PE Form Specific Logic
├── includes/
│   ├── Core/                            # Core Infrastructure
│   │   ├── Autoloader.php               # PSR-4 Autoloader
│   │   ├── Data_Provider.php            # Database Access Layer
│   │   ├── Functions.php                # Global Helpers
│   │   └── Constants.php                # Global Constants
│   ├── Calculators/                     # Business Logic (The Brain)
│   │   ├── Calculator.php               # Base Class
│   │   ├── DirectQuoteCalculator.php    # Retail Logic
│   │   ├── FFQuoteCalculator.php        # Wholesale Logic
│   │   ├── VehiclePersonalCalculator.php # Vehicle/PE Calculations
│   │   └── AnnualTransitCalculator.php  # Annual Transit Logic
│   ├── Processors/                      # Request Handlers
│   │   ├── BaseProcessor.php            # Base Processor
│   │   ├── AnnualTransitProcessor.php   # Annual Transit Processor
│   │   ├── PaymentCallbackProcessor.php # Payment Callback Handler
│   │   ├── Direct/                      # Direct Quote Processors
│   │   │   ├── DirectBaseProcessor.php
│   │   │   ├── DirectDomesticProcessor.php
│   │   │   ├── DirectImpExpProcessor.php
│   │   │   └── DirectVehicleProcessor.php
│   │   └── FF/                          # FF Quote Processors
│   │       ├── FFBaseProcessor.php
│   │       ├── FFDomesticProcessor.php
│   │       ├── FFImpExpProcessor.php
│   │       └── FFVehicleProcessor.php
│   ├── Services/                        # Support Services
│   │   ├── EmailService.php
│   │   ├── PDFService.php
│   │   ├── SerialNumberService.php
│   │   ├── InsightAPIService.php
│   │   ├── CurrencyUpdateService.php
│   │   └── UserPreferencesService.php
│   ├── Ajax/                            # AJAX Handlers
│   │   ├── UnifiedQuoteAjax.php         # Main Router
│   │   ├── QuoteCalculateAjax.php       # Calculate, preview
│   │   ├── QuoteSaveAjax.php            # Save, update_referral
│   │   ├── QuotePdfAjax.php             # PDF generation
│   │   ├── QuoteAcceptAjax.php          # Accept & Payment Flow
│   │   └── PaymentAjax.php              # Standalone Payment
│   ├── Frontend/Shortcodes/             # Frontend Entry Points
│   │   ├── UnifiedQuoteShortcode.php
│   │   ├── Accept_Quote.php
│   │   ├── Payment.php
│   │   ├── Standalone_Payment.php
│   │   ├── Step2_Payment.php
│   │   └── Thank_You.php
│   ├── Admin/                           # Admin Features
│   │   ├── AdminMenu.php
│   │   ├── AdminReferralEdit.php
│   │   ├── AdminReferralList.php
│   │   └── AdminSettingsPage.php
│   ├── Helpers/
│   │   ├── DataMapper.php               # Central data transformation
│   │   ├── TableSchema.php              # Table name mappings
│   │   └── ScheduleGenerator.php        # Annual Transit Schedule
│   ├── Development/
│   │   └── TestMode.php                 # Test Mode Helper
│   └── RestAPI/
│       └── PaymentCallback.php          # Payment Webhook
└── templates/
    ├── emails/                          # Email Templates
    │   ├── annual_transit/              # Annual Transit Emails
    │   ├── pevh/                        # Vehicle/PE Emails
    │   ├── transit/                     # Domestic/ImpExp Emails
    │   └── (shared templates)
    ├── forms/                           # HTML Forms
    │   ├── annual-transit.php
    │   ├── direct-*.php
    │   └── ff-*.php
    ├── frontend/                        # Frontend Partials
    │   ├── accept/                      # Acceptance Pages
    │   ├── payment-iframe.php
    │   └── standalone-payment-*.php
    ├── pdfs/                            # PDF Templates
    │   └── annual-transit-quote.php
    └── schedules/                       # Schedule Templates
        └── annual-transit-schedule.php
```

### DataMapper Status (February 2026)

**Purpose:** Centralizes data transformation between database layer and output systems (Email, PDF, API).

| Method | Status | Purpose |
|--------|--------|---------|
| `map_db_to_standard()` | ✅ **Active** | Unpacks JSON fields, standardizes column names, creates aliases. Used by all processors before Email/PDF/API generation. |
| `prepare_for_email()` | ❌ **Removed** | Was creating email-specific aliases. No longer needed since email templates use `$data['key']` directly. |
| `prepare_for_pdf()` | ✅ **Active** | Creates aliases for PDF templates AND provides variables for API calls. Serves dual purpose. |
| `prepare_for_api()` | ⚠️ **Exists but unused** | API-specific mapping method exists but isn't currently called (prepare_for_pdf() handles it). |

**Key Change:** EmailService no longer calls `prepare_for_email()` - templates receive raw data via `extract($data)` and use `$data['column_name']` directly.

**Data Flow:**
```
Database Row → map_db_to_standard() → prepare_for_pdf()
                                            ↓
                    ┌───────────────┬───────────────┐
                    ↓               ↓               ↓
              PDF Templates    Email Templates   API Upload
          (uses aliases)  (uses $data[key])  (uses aliases)
```

└── templates/
    ├── forms/                           # HTML Forms
    │   ├── direct-domestic-transit.php
    │   ├── direct-impexp-transit.php
    │   ├── direct-vehiclepersonal-transit.php
    │   ├── ff-domestic-transit.php
    │   ├── ff-impexp-transit.php
    │   └── ff-vehiclepersonal-transit.php
    ├── frontend/accept/                 # Acceptance Templates
    │   ├── direct-domestic.php
    │   ├── direct-impexp.php
    │   ├── direct-vehiclepersonal.php
    │   ├── ff-domestic.php
    │   ├── ff-impexp.php
    │   └── ff-vehiclepersonal.php
    └── emails/                          # Email Templates
        ├── pevh/                         # Vehicle/PE email templates
        │   ├── quote-direct.php          # Direct quote email
        │   ├── quote-ff.php              # FF quote email
        │   ├── receipt-email.php        # Payment receipt
        │   └── referral-email.php        # Referral notification
        ├── transit/                      # Domestic/ImpExp email templates
        │   ├── quote-direct.php          # Direct quote email
        │   ├── quote-ff.php              # FF quote email
        │   ├── receipt-email.php        # Payment receipt
        │   └── referral-email.php        # Referral notification
        ├── professional-email-template.php  # Shared email layout
        ├── payment-confirmation.php       # Standalone payment confirmation
        └── policy-documents-email.php     # Policy documents with attachments
```

### Email Template Organization (February 2026 Refactoring)

**Status:** ✅ Complete - Templates separated by data group

| Group | Table | Templates | Field Names |
|-------|-------|-----------|-------------|
| **PEVH** | `qtn_diraus_perveh` | `pevh/quote-direct.php`, `pevh/quote-ff.php`, `pevh/receipt-email.php`, `pevh/referral-email.php` | `$data['name']`, `$data['transitfrom']`, `$data['totalGst']` |
| **Transit** | `fiqs_transit_quotes` | `transit/quote-direct.php`, `transit/quote-ff.php`, `transit/receipt-email.php`, `transit/referral-email.php` | `$data['insured_name']`, `$data['location_from']`, `$data['total_gst']` |

**Key Principle:** No field mapping - templates use database column names directly via `$data['key']` syntax.

**Deleted Old Templates:** `quote-email.php`, `quote-direct.php`, `quote-ff.php`, `receipt-email.php`, `referral-email.php` (root level)

**Processor Logic:** Auto-selects correct group template based on `TableSchema::get_table_from_types()`
```

## 3. Database Schema

The system relies on specific custom tables for storing quotes:

*   **Unified Transit Quotes** (Domestic & Import/Export)
    *   `fiqs_transit_quotes` (Direct & FF)
*   **Vehicle & Personal Effects:**
    *   `qtn_diraus_perveh` (Direct & FF - shared table)
*   **Master Data:**
    *   `wp_quote_general_data` (Commodities, Companies, Rates)

### Recent Schema Changes (2026-02)

**Vehicle/Personal Effects Table (`qtn_diraus_perveh`):**
- Added `storage_premium` column after `premium` for storing storage-specific premium amounts
- Quote type selection restored: `withinpereff`, `withinvehicles`, `withinCombination` flags now set based on user selection
- Simplified to single `insurance_val` field instead of separate `vehicle_value` + `personal_effects_value`
- Self-Storage Facility decline logic implemented (triggers DECLINE status)

### PEVH Financial Data Pipeline (storage_premium & stampDuty)

The `storage_premium` and `stampDuty` fields flow through the entire system:

| Layer | File | What Happens |
|-------|------|--------------|
| **Calculator** | `VehiclePersonalCalculator.php` | Calculates `storage_premium` (rate × replacement_value) and `stampDuty` |
| **AJAX Preview** | `QuoteCalculateAjax.php` | Returns both fields in JSON response |
| **Frontend JS** | `vehiclepersonal-form.js`, `unified-quote.js` | Renders conditional summary rows |
| **Processor** | `DirectVehicleProcessor.php`, `FFVehicleProcessor.php` | Saves to DB |
| **Accept Page** | `templates/frontend/accept/vehicle-pe.php` | Full financial breakdown table |
| **DataMapper** | `Helpers/DataMapper.php` | Maps `storage_premium` in `$maps` and `prepare_for_pdf()` |
| **Quote Email** | `templates/emails/quote-email.php` | Conditional Storage Base Premium row |
| **Receipt Email** | `templates/emails/receipt-email.php` | Conditional Storage Base Premium row |
| **PDF** | `lib/pdf/mpdfContentPP.php`, `lib/pdf/direct/mpdfContentPP.php` | Storage Premium column in financial table |

## 4. Key Workflows

### 4.1 The Unified Quote Flow
1.  **User Visits:** `/unified-quote/` (contains `[fiqs_unified_quote]`)
2.  **Selection:** User selects Quote Type (Domestic/ImpExp/Vehicle) and User Type (auto-detected or toggled).
3.  **AJAX Load:** `unified-quote.js` requests the specific form HTML via `fiqs_get_form`.
4.  **Interaction:**
    *   User fills fields.
    *   `unified-quote.js` triggers `fiqs_calculate_quote_preview` on change.
    *   Backend calculates premium using `DirectQuoteCalculator` or `FFQuoteCalculator`.
5.  **Submission:** User clicks "Get Quote". Form submits via `fiqs_save_quote`.
6.  **Redirect:** On success, user is redirected to `/quote-acceptance/?quote_id=...`

### 4.2 The Payment Flow
1.  **Acceptance:** User reviews details on `/quote-acceptance/`. Clicks "Accept".
2.  **Payment:** User is redirected to `/payment/`. Enters card details.
3.  **Processing:** `[fiqs_payment]` shortcode handles SecurePay transaction.
4.  **Completion:** User redirected to `/thank-you/`. Email sent.

## 5. Development Guidelines

### 5.1 Adding a New Feature
1.  **Identify Domain:** Is it Logic (Calculators), Data (Provider), or UI (Templates)?
2.  **Implement:** Add code in the appropriate `includes/` class.
3.  **Expose:** If needed, add AJAX action in `UnifiedQuoteAjax.php`.
4.  **Render:** Update `templates/` or `assets/js/unified-quote.js`.

### 5.2 Modifying Calculations
*   **NEVER** modify `freight-insurance-quote/` (Old Code).
*   **ALWAYS** modify `includes/Calculators/`.
*   **Direct:** `DirectQuoteCalculator.php`
*   **FF:** `FFQuoteCalculator.php`

## 6. Reference Documentation
*   [Documentation Index](docs/README.md)
*   [System Overview](docs/system-architecture/OVERVIEW.md)
*   [Database Schema](docs/system-architecture/DATABASE.md)
*   [Form Details](docs/forms/FORMS-OVERVIEW.md)
*   [Frontend Architecture](docs/javascript/JAVASCRIPT-OVERVIEW.md)
*   [AI Rules Context](AI_CONTEXT.md)
*   [Project Rules](PROJECT_RULES.md)
