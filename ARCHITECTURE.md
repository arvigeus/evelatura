# Architecture

## System Overview

```txt
app/
├── framework: TanStack Start
│   ├── runtime: React 19 + TypeScript
│   ├── routing: File-based routes → URLs
│   └── rpc: Server functions → Type-safe client calls
│
├── ui/
│   ├── styling: TailwindCSS 4
│   ├── components: React Aria (unstyled, accessible)
│   ├── icons: Lucide React
│   ├── animation: Motion (Framer Motion)
│   ├── editor: Lexical → Rich text editing
│   ├── charts: visx → Data visualization
│   ├── forms: TanStack Form → Complex validation
│   ├── tables: TanStack Table → Data grids
│   └── lists: TanStack Virtual → Infinite scroll
│
├── data/
│   ├── database: SQLite (via Turso edge replicas)
│   ├── queries: Kysely → Type-safe SQL
│   ├── validation: ArkType → Runtime + TypeScript types
│   ├── server-state: TanStack Query → Caching & sync
│   ├── client-state: TanStack Store → Local UI state
│   └── optimization: TanStack Pacer → Rate limiting & debounce
│
├── infrastructure/
│   ├── hosting: Cloudflare Pages (static + SSR)
│   ├── compute: Cloudflare Workers (edge functions)
│   ├── storage: Cloudflare R2 (S3-compatible)
│   └── cdn: Cloudflare (automatic)
│
├── services/
│   ├── auth: Better Auth → Session management
│   ├── payments: Stripe → Vietnamese payment methods
│   ├── email: Resend → Transactional emails
│   └── shipping: GHN API → Local delivery
│
└── operations/
    ├── analytics: PostHog → Product analytics + error tracking
    ├── monitoring: Better Uptime → Availability checks
    ├── i18n: Lingui → Vietnamese/English translations
    └── quality: BiomeJS → Lint + format
```

## Framework

**TanStack Start** - Full-stack React framework with file-based routing. Server functions compile to RPC calls, eliminating API boilerplate. Routes map directly to file structure.

- [Awesome React Frameworks](https://github.com/brillout/awesome-react-frameworks)
- [Awesome NodeJs](https://github.com/sindresorhus/awesome-nodejs)

## UI Layer

**TailwindCSS 4** - Utility-first CSS framework. Classes compile to minimal CSS at build time. Works with React Aria's unstyled components.

- [Awesome Tailwind CSS](https://github.com/aniftyco/awesome-tailwindcss)

**React Aria** - Adobe's unstyled component library. Provides WCAG-compliant behavior, keyboard navigation, and ARIA attributes. Style with Tailwind classes.

**Lucide React** - Icon library with 1400+ consistent SVG icons. Tree-shakeable imports keep bundle small.

- [Awesome React Components](https://github.com/brillout/awesome-react-components)

**Motion** - Animation library (Framer Motion v12+). Handles layout animations, gestures, and scroll-triggered effects. Powers cart drawer and product galleries.

**Lexical** - Meta's extensible rich text editor framework. Handles product descriptions, blog posts, and admin content editing. Plugin-based architecture with collaborative editing support.

**visx** - Low-level visualization components built on D3. Powers sales charts, analytics dashboards, and inventory reports. Composable primitives for custom data visualizations.

**TanStack Form** - Form state management with validation. Handles complex checkout flows, field dependencies, and async validation. Integrates with ArkType for schema validation.

**TanStack Table** - Headless table component. Powers admin dashboards, order lists, and product management. Handles sorting, filtering, and pagination.

**TanStack Virtual** - Virtualizes long lists for performance. Renders only visible items in product grids and search results. Enables infinite scrolling without memory issues.

## Data Management

**Turso** - Managed SQLite with edge replication. Provides local reads from Cloudflare Workers while writes go to primary instance. Handles backups and point-in-time recovery.

**Kysely** - Type-safe SQL query builder. Generates TypeScript types from database schema. Migrations are plain SQL files.

- [Awesome Database Tools](https://github.com/mgramin/awesome-db-tools)

**ArkType** - Runtime validation with TypeScript inference. Validates user input, API responses, and webhook payloads. Types flow from validation to application code.

**TanStack Query** - Server state management. Caches API responses, handles background refetching, and manages loading states. Provides optimistic updates for cart operations.

**TanStack Store** - Client state management. Lighter than Zustand, integrates with TanStack ecosystem. Manages UI state, cart persistence, and user preferences.

**TanStack Pacer** - Performance optimization primitives. Debounces search input, throttles infinite scroll, rate limits API calls, and batches cart updates. Prevents API abuse and optimizes database writes.

- [Awesome State Management](https://github.com/olegrjumin/awesome-react-state-management)

## Infrastructure

**Cloudflare Pages** - Hosts static assets and server-side rendered pages. Git push triggers automatic deployments. Preview deployments for pull requests.

**Cloudflare Workers** - Runs server functions at the edge. Handles API routes and SSR. Zero cold starts, automatic scaling.

**Cloudflare R2** - Object storage for product images and uploads. S3-compatible API with no egress fees.

- [Awesome Cloudflare](https://github.com/zhuima/awesome-cloudflare/blob/master/README-EN.md)

## Services

**Better Auth** - Authentication library built for edge environments. Manages sessions in SQLite, handles magic links and OAuth providers.

**Stripe** - Payment processing with support for Vietnamese methods (MoMo, ZaloPay, bank transfers). Webhooks confirm async payments.

**Resend** - Transactional email service. React Email templates for order confirmations and shipping updates.

**GHN (Giao Hàng Nhanh)** - Vietnamese shipping provider. REST API for rates and label generation.

## Operations

**PostHog** - Product analytics platform with error tracking. Captures user behavior, feature flags, A/B testing, and session replays. Self-hostable with privacy controls for Vietnamese compliance. Handles web analytics, conversion tracking, and user journey analysis.

- [Awesome Monitoring](https://github.com/Enapiuz/awesome-monitoring)

**Better Uptime** - Monitors critical endpoints. SMS alerts for downtime. Public status page.

**Lingui** - Internationalization with Vietnamese and English. Compile-time extraction, lazy-loaded translations, smaller bundle than alternatives.

- [Awesome I18n](https://github.com/jpomykala/awesome-i18n)

**BiomeJS** - Code linting and formatting. Single tool replacing ESLint and Prettier. Rust-based for speed.

- [Awesome Code Quality](https://github.com/analysis-tools-dev/static-analysis)

## Development

- **Version Control**: GitHub with Actions for CI/CD
- **Package Manager**: npm (bundled with Node.js)
- **Testing**: Vitest for unit tests
- **Database Migrations**: Kysely migration CLI

- [Awesome GitHub Actions](https://github.com/sdras/awesome-actions)

## Patterns & Conventions

### Code Organization: Feature-Based Modules

Code is organized by business domain rather than technical layer. Each feature contains its own components, queries, types, and utilities together.

```txt
features/
├── product/
│   ├── components/     # ProductCard, ProductGallery
│   ├── queries/        # useProduct, useProducts
│   ├── schemas/        # Product validation schemas
│   ├── server/         # Product server functions
│   └── types/          # Product-related types
│
├── cart/
│   ├── components/     # CartDrawer, CartItem
│   ├── store/          # Cart state management
│   ├── utils/          # Price calculations
│   └── types/          # Cart types
│
└── checkout/
    ├── components/     # CheckoutForm, PaymentStep
    ├── forms/          # Form configurations
    ├── server/         # Order processing
    └── types/          # Order types
```

Related code lives together. Changes to a feature touch files in one directory. New developers understand the codebase by exploring business concepts, not technical layers.

### Database Design: Template-Instance Pattern

Products use a flexible template-instance pattern that adapts to different product types without schema changes.

**Templates** define the structure and fields for a product type. A "Shoes" template specifies that shoes need size, color, and material fields, while a "Computer" template requires CPU, RAM, and storage fields. Each field has its type (text, number, select), validation rules, and UI hints. Templates act as schemas that define what data a product type can have.

**Products** are instances created from templates. They inherit the field structure from their template and populate those fields with actual values. A product links to its template and stores custom field values based on the template's field definitions. This allows selling completely different product types (clothing, electronics, books) using the same database structure.

**Variants** handle combinations within a product. A shoe product might have variants for each size-color combination (Size 10 Red, Size 10 Blue, Size 11 Red). Each variant can override price, maintain separate inventory, and have specific images. Variants share the product's base information but differ in specific attributes.

**Categories** organize products hierarchically and can restrict which templates are allowed. Electronics category might only accept Computer and Phone templates, while Clothing accepts Shirt and Shoes templates. This maintains catalog consistency.

**Vendors** provide another organization axis. Products link to vendors, enabling marketplace features, vendor-specific pages, and commission tracking. Vendors have profiles, payment details, and can be restricted to certain categories or templates.

This pattern enables a flexible product catalog without code changes when adding new product types. New product types just need a new template definition, and the system automatically handles the UI, validation, and storage.
