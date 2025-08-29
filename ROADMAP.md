# E-commerce Implementation Tasks

## Instructions for Developers

- Reference `ARCHITECTURE.md` for system design, tech stack, and conventions
- Follow `CONTRIBUTING.md` for code quality standards and workflow
- Code snippets in this document are **reference only** - implementation details are up to you
- Each task should result in a focused, single-purpose PR
- Don't add features that will only be needed in future tasks
- Ensure all features comply with Vietnamese e-commerce regulations
- Test each feature thoroughly before moving to the next task
- Keep the design coherent across all components (warm, joyful, earthy tones, Vietnamese aesthetics)

---

## Phase 1: Foundation

### Task 1.1: Initialize TanStack Start Project

**Goal**: Set up the base project with all core dependencies

- [x] Initialize TanStack Start with TypeScript
- [ ] Configure Cloudflare Pages deployment settings
- [x] Set up BiomeJS for linting/formatting
- [x] Set up React Aria components
- [x] Set up Storybook
- [x] Configure TailwindCSS 4 with custom theme (Be Vietnam Pro for body, Patrick Hand for headings)
- [x] Add `.editorconfig` for consistent formatting
- [ ] Set up git hooks for pre-commit quality checks
- [ ] Create base folder structure following feature-based organization

```css
/* Reference: TailwindCSS 4 theme configuration in CSS */
@theme {
  --font-sans: "Be Vietnam Pro", system-ui, sans-serif;
  --font-display: "Patrick Hand", serif;

  /* Warm, joyful, light earthy Vietnamese-inspired palette */
  --color-primary-50: /* light */;
  --color-primary-500: /* main */;
  --color-primary-900: /* dark */;

  --color-secondary-50: /* light */;
  --color-secondary-500: /* main */;
  --color-secondary-900: /* dark */;

  --color-accent-50: /* light */;
  --color-accent-500: /* main */;
  --color-accent-900: /* dark */;
}
```

### Task 1.2: Database Setup with Turso

**Goal**: Configure SQLite database with edge replication

- [ ] Set up Turso account and create database
- [ ] Configure Kysely with TypeScript types
- [ ] Create migration system structure
- [ ] Add database connection with edge replica configuration
- [ ] Create base migration runner scripts
- [ ] Set up development seed data scripts using `@faker-js/faker`

### Task 1.3: Environment Configuration

**Goal**: Proper secrets and configuration management

- [ ] Set up environment variables structure
- [ ] Configure Cloudflare secrets for production
- [ ] Create type-safe environment config module
- [ ] Add validation for required environment variables
- [ ] Document all required variables in `.env.example`

---

## Phase 2: Authentication & User Management

### Task 2.1: Better Auth Integration

**Goal**: Complete authentication system with social providers

- [ ] Integrate Better Auth with SQLite session storage
- [ ] Configure OAuth providers (Google, Facebook, Zalo)
- [ ] Implement magic link authentication
- [ ] Create auth context and hooks
- [ ] Add session management utilities

```typescript
// Reference: Social provider configuration
const authConfig = {
  providers: [
    GoogleProvider({
      /* config */
    }),
    FacebookProvider({
      /* config */
    }),
    // Zalo OAuth requires custom provider setup
    CustomProvider({
      id: "zalo",
      name: "Zalo",
      authorizationUrl: "https://oauth.zaloapp.com/v4/permission",
      tokenUrl: "https://oauth.zaloapp.com/v4/access_token",
      profileUrl: "https://graph.zalo.me/v2.0/me",
    }),
  ],
};
```

### Task 2.2: User Roles and Permissions

**Goal**: Simple role system for admin and customer accounts

- [ ] Create user roles schema (admin, customer)
- [ ] Implement permission checking utilities
- [ ] Add role-based route protection
- [ ] Create admin account initialization migration

### Task 2.3: User Profile Management

**Goal**: Allow users to manage their own account details

- [ ] Build user profile page with details (name, email, etc.)
- [ ] Implement password change functionality
- [ ] Add order history view (linking to Phase 5)
- [ ] Create notification preferences management

---

## Phase 3: Product System Foundation

### Task 3.1: Template-Instance Database Schema

**Goal**: Flexible product system following the template pattern

- [ ] Create product template tables and types
- [ ] Implement field definition system
- [ ] Create product instance tables
- [ ] Add variant support schema
- [ ] Implement category hierarchy tables
- [ ] Add vendor/supplier tables

```sql
-- Reference: Core schema structure
CREATE TABLE product_templates (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  field_definitions JSON NOT NULL
);

CREATE TABLE products (
  id TEXT PRIMARY KEY,
  template_id TEXT REFERENCES product_templates(id),
  name TEXT NOT NULL,
  custom_fields JSON,
  base_price INTEGER NOT NULL
);

CREATE TABLE product_variants (
  id TEXT PRIMARY KEY,
  product_id TEXT REFERENCES products(id),
  attributes JSON NOT NULL,
  price INTEGER,
  inventory_quantity INTEGER DEFAULT 0
);
```

### Task 3.2: Product Template Management

**Goal**: Admin interface for creating/editing product templates

- [ ] Build template creation form with field builder
- [ ] Implement field type components (text, select, number, etc.)
- [ ] Add validation rule configuration
- [ ] Create template listing and search
- [ ] Build template preview system

### Task 3.3: Product Creation from Templates

**Goal**: Dynamic product creation based on templates

- [ ] Build dynamic form generation from templates
- [ ] Implement custom field validation
- [ ] Create product variant builder interface
- [ ] Add bulk variant generation (size × color matrix)
- [ ] Implement SKU generation system

### Task 3.4: Product Media Management

**Goal**: Image upload and management with Cloudflare R2

- [ ] Set up R2 bucket configuration
- [ ] Build image upload component with drag-drop
- [ ] Implement image optimization pipeline
- [ ] Create gallery management for products
- [ ] Add variant-specific image assignment

---

## Phase 4: Shopping Experience

### Task 4.1: Product Catalog Frontend

**Goal**: Customer-facing product browsing

- [ ] Create product listing pages with virtual scrolling
- [ ] Build product card components
- [ ] Implement category navigation
- [ ] Add product filtering and sorting
- [ ] Create product search with debouncing

### Task 4.2: Product Detail Pages

**Goal**: Rich product presentation with variants

- [ ] Build product detail layout
- [ ] Create image gallery with zoom
- [ ] Implement variant selector (size, color, etc.)
- [ ] Add product information tabs
- [ ] Build "related products" section

### Task 4.3: Shopping Cart with TanStack Store

**Goal**: Persistent cart management

- [ ] Create cart store with local storage sync
- [ ] Build cart drawer/sidebar component
- [ ] Implement add/update/remove operations
- [ ] Add cart quantity validation against inventory
- [ ] Create cart summary calculations

```typescript
// Reference: Cart store structure
interface CartStore {
  items: CartItem[];
  addItem: (product: Product, variant: Variant, quantity: number) => void;
  updateQuantity: (itemId: string, quantity: number) => void;
  removeItem: (itemId: string) => void;
  clearCart: () => void;
  getTotals: () => { subtotal: number; tax: number; total: number };
}
```

---

## Phase 5: Checkout & Payments

### Task 5.1: Guest Checkout Flow

**Goal**: Allow purchases without registration

- [ ] Create multi-step checkout form
- [ ] Build shipping address collection
- [ ] Implement email/phone validation
- [ ] Add order review step
- [ ] Create guest order tracking system

### Task 5.2: Stripe Payment Integration

**Goal**: Support Vietnamese payment methods

**Reference**: [How I Stay Sane Implementing Stripe](https://github.com/t3dotgg/stripe-recommendations)

- [ ] Configure Stripe with Vietnamese payment methods
- [ ] Implement payment method selection UI
- [ ] Add MoMo integration
- [ ] Add ZaloPay integration
- [ ] Configure bank transfer support
- [ ] Implement COD as payment option

### Task 5.3: Order Processing System

**Goal**: Order creation and management

- [ ] Create order database schema
- [ ] Build order creation from cart
- [ ] Implement order status workflow
- [ ] Add order confirmation emails with Resend
- [ ] Create order history for customers

---

## Phase 6: Shipping Integration

### Task 6.1: GHN (Giao Hàng Nhanh) Integration

**Goal**: Primary shipping provider integration

- [ ] Set up GHN API credentials
- [ ] Implement shipping rate calculation
- [ ] Build shipping method selection
- [ ] Create label generation system
- [ ] Add tracking number management

### Task 6.2: Additional Shipping Providers

**Goal**: Support for GHTK and Viettel Post

- [ ] Add GHTK API integration
- [ ] Implement Viettel Post support
- [ ] Create unified shipping interface
- [ ] Build provider selection logic
- [ ] Add fallback handling

### Task 6.3: Local Delivery Options

**Goal**: In-store pickup and local delivery

- [ ] Add pickup location configuration
- [ ] Create pickup scheduling system
- [ ] Implement local delivery zones
- [ ] Build delivery time slot selection
- [ ] Add pickup notification system

---

## Phase 7: Admin Dashboard

### Task 7.1: Dashboard Foundation

**Goal**: Admin interface structure

- [ ] Create admin layout with navigation
- [ ] Build dashboard home with metrics
- [ ] Implement admin route protection
- [ ] Add responsive mobile admin view
- [ ] Create admin notification system

### Task 7.2: Order Management

**Goal**: Complete order administration

- [ ] Build order listing with filters
- [ ] Create order detail view
- [ ] Implement order status updates
- [ ] Add shipping label printing
- [ ] Build refund/return initiation

### Task 7.3: Product Management Page

**Goal**: Traditional admin interface for editing products

- [ ] Build product list view with search and filtering
- [ ] Create a dedicated "Edit Product" page with a form
- [ ] This form will use the dynamic template system from Phase 3
- [ ] Implement product creation and deletion functionality

### Task 7.4: Inline Product Editing

**Goal**: Edit products while browsing (Progressive Enhancement)

- [ ] Create inline edit mode toggle on product pages
- [ ] Build in-place field editors
- [ ] Implement auto-save with debouncing
- [ ] Add validation feedback
- [ ] Create bulk edit operations

```typescript
// Reference: Inline editing component
interface InlineEdit {
  value: any;
  onSave: (newValue: any) => Promise<void>;
  validation?: ValidationRule[];
  renderEditor: () => JSX.Element;
  renderDisplay: () => JSX.Element;
}
```

### Task 7.5: Inventory Management

**Goal**: Real-time inventory tracking

- [ ] Create inventory adjustment interface
- [ ] Build low stock alerts
- [ ] Implement inventory history tracking
- [ ] Add bulk inventory updates
- [ ] Create inventory reports

### Task 7.6: Rich Text Editor Integration

**Goal**: Lexical editor for content management

- [ ] Configure Lexical editor with Vietnamese language support
- [ ] Build rich text editor component for product descriptions
- [ ] Add image upload and embedding capabilities
- [ ] Implement editor plugins for links and lists
- [ ] Create editor toolbar with formatting options
- [ ] Add auto-save functionality for content drafts

```typescript
// Reference: Lexical editor configuration
interface EditorConfig {
  namespace: string;
  theme: LexicalTheme;
  plugins: EditorPlugin[];
  nodes: LexicalNode[];
  onError: (error: Error) => void;
}
```

### Task 7.7: Analytics Dashboard with visx

**Goal**: Data visualization for admin insights

- [ ] Set up visx components for sales charts
- [ ] Build revenue trend visualizations
- [ ] Create inventory level charts
- [ ] Implement customer analytics graphs
- [ ] Add interactive chart tooltips and legends
- [ ] Build responsive chart layouts for mobile admin

```typescript
// Reference: Chart component structure
interface ChartProps {
  data: ChartDataPoint[];
  width: number;
  height: number;
  margin: { top: number; right: number; bottom: number; left: number };
  xAccessor: (d: ChartDataPoint) => any;
  yAccessor: (d: ChartDataPoint) => any;
}
```

---

## Phase 8: Marketing Features

### Task 8.1: Blog System with Product Integration

**Goal**: SEO-optimized blog with product links

- [ ] Create blog post schema
- [ ] Build blog editor with product embedding
- [ ] Implement SEO metadata management
- [ ] Add blog category system
- [ ] Create blog listing and archives

### Task 8.2: Core Discount Engine

**Goal**: Implement the basic promotion rules engine

- [ ] Create promotion rules engine
- [ ] Build percentage discount support
- [ ] Add fixed amount discounts
- [ ] Implement time-limited promotions

### Task 8.3: Advanced Promotion Types

**Goal**: Add more complex promotion logic

- [ ] Implement BOGO (Buy One Get One) logic
- [ ] Create bundle deal system

### Task 8.4: Condition-Based Promotions

**Goal**: Add rules for promotion applicability

- [ ] Build first-time customer discounts
- [ ] Implement promotion stacking rules
- [ ] Add conditions for min purchase, specific products, or categories

```typescript
// Reference: Promotion rule structure
interface PromotionRule {
  type: "percentage" | "fixed" | "bogo" | "bundle";
  conditions: {
    minPurchase?: number;
    validFrom?: Date;
    validTo?: Date;
    firstTimeBuyer?: boolean;
    specificProducts?: string[];
    categories?: string[];
  };
  discount: {
    value: number;
    maxDiscount?: number;
  };
}
```

### Task 8.5: Coupon Management

**Goal**: Coupon code system

- [ ] Create coupon generation system
- [ ] Build coupon validation
- [ ] Add usage tracking and limits
- [ ] Implement coupon distribution
- [ ] Create coupon analytics

### Task 8.6: Loyalty Points System

**Goal**: Simple points-based rewards

- [ ] Create points earning rules
- [ ] Build points balance tracking
- [ ] Implement points redemption
- [ ] Add points history view
- [ ] Create points expiration handling

---

## Phase 9: Customer Communication

### Task 9.1: Email Templates with Resend

**Goal**: Transactional email system

- [ ] Create React Email templates
- [ ] Build order confirmation emails
- [ ] Add shipping notification emails
- [ ] Implement return/refund emails
- [ ] Create promotional email templates

### Task 9.2: Customer Support Features

**Goal**: Basic support functionality

- [ ] Create contact form
- [ ] Build FAQ system
- [ ] Add order status checking
- [ ] Implement return request form
- [ ] Create support ticket system

---

## Phase 10: Analytics & Monitoring

### Task 10.1: PostHog Analytics Integration

**Goal**: Comprehensive product analytics and error tracking

- [ ] Configure PostHog for web analytics and product insights
- [ ] Set up error tracking and session replay
- [ ] Implement e-commerce conversion funnels
- [ ] Add custom event tracking for user behavior
- [ ] Create feature flags for A/B testing
- [ ] Build analytics dashboard widgets
- [ ] Implement cohort analysis for customer retention

```typescript
// Reference: PostHog configuration
interface PostHogConfig {
  apiKey: string;
  host: string; // Self-hosted or cloud
  capturePageViews: boolean;
  captureClicks: boolean;
  enableSessionRecording: boolean;
  enableErrorTracking: boolean;
}
```

### Task 10.2: Uptime Monitoring

**Goal**: Service availability tracking

- [ ] Configure Better Uptime checks
- [ ] Create status page
- [ ] Set up alert channels
- [ ] Add API endpoint monitoring
- [ ] Implement health check endpoints

---

## Phase 11: Internationalization

### Task 11.1: Lingui i18n Setup

**Goal**: Vietnamese and English support

- [ ] Configure Lingui with locale detection
- [ ] Create translation infrastructure
- [ ] Extract initial message catalog
- [ ] Add language switcher component
- [ ] Implement number/currency formatting

### Task 11.2: Content Translation

**Goal**: Full site translation

- [ ] Translate all UI strings to Vietnamese
- [ ] Add product translation support
- [ ] Implement URL localization
- [ ] Create localized email templates
- [ ] Add admin interface translations

---

## Phase 12: Legal Compliance

### Task 12.1: Vietnamese E-commerce Law Compliance

**Goal**: Ensure legal operation in Vietnam

- [ ] Implement business registration display (required)
- [ ] Add tax ID (MST) display
- [ ] Create terms of service page
- [ ] Build privacy policy page
- [ ] Implement return/refund policy (as per Decree 52/2013/ND-CP)
- [ ] Add product origin disclosure (as per Law on Consumer Protection)
- [ ] Implement price display rules (VND, including VAT)

```typescript
// Reference: Required business information display
interface BusinessInfo {
  businessName: string;
  taxId: string; // Mã số thuế
  businessLicense: string; // Giấy phép kinh doanh
  address: string;
  phone: string;
  email: string;
  representative: string; // Legal representative name
}
```

### Task 12.2: Consumer Protection Features

**Goal**: Comply with Vietnamese consumer protection laws

- [ ] Add 7-day return policy for online purchases
- [ ] Implement product warranty information
- [ ] Create complaint handling process
- [ ] Add product authenticity guarantees
- [ ] Build price history tracking

### Task 12.3: Data Protection Compliance

**Goal**: Personal data protection per Decree 13/2023/ND-CP

- [ ] Implement data collection consent
- [ ] Create data deletion requests
- [ ] Add data export functionality
- [ ] Build consent management system
- [ ] Implement data breach notification

### Task 12.4: Cookie Consent Banner

**Goal**: Inform users about cookie usage

- [ ] Implement a cookie consent banner
- [ ] Link to the privacy policy
- [ ] Allow users to accept or reject non-essential cookies

### Task 12.5: Business Operations Documentation

**Goal**: Guide for shop owners on Vietnamese e-commerce

- [ ] Create comprehensive documentation covering:
  - Business registration requirements for online selling
  - Tax obligations (VAT, CIT, PIT)
  - Required licenses for specific product categories
  - Invoice requirements (e-invoice regulations)
  - Consumer protection obligations
  - Advertising law compliance
  - Social commerce regulations
  - Payment processing regulations
  - Shipping and delivery requirements
  - Record keeping requirements

---

## Phase 13: Performance Optimization

### Task 13.1: Frontend Performance

**Goal**: Optimal loading and runtime performance

- [ ] Implement code splitting
- [ ] Add image lazy loading
- [ ] Configure CDN caching rules
- [ ] Optimize bundle sizes
- [ ] Add performance budgets

### Task 13.2: Database Optimization

**Goal**: Efficient data queries

- [ ] Add database indexes
- [ ] Implement query optimization
- [ ] Create materialized views for reports
- [ ] Add connection pooling
- [ ] Implement caching strategy

### Task 13.3: Search Engine Optimization

**Goal**: Better search visibility

- [ ] Implement structured data (JSON-LD)
- [ ] Create XML sitemap generation
- [ ] Add robots.txt configuration
- [ ] Implement canonical URLs
- [ ] Create Open Graph tags

---

## Phase 14: Testing & Quality Assurance

### Task 14.1: Unit Testing Setup

**Goal**: Component and utility testing

- [ ] Configure Vitest
- [ ] Create testing utilities
- [ ] Add component tests
- [ ] Implement API testing
- [ ] Create test data factories

### Task 14.2: Integration Testing

**Goal**: End-to-end flow validation

- [ ] Set up Playwright
- [ ] Create checkout flow tests
- [ ] Add admin workflow tests
- [ ] Implement payment flow testing
- [ ] Create cross-browser tests

### Task 14.3: Load Testing

**Goal**: Ensure scalability

- [ ] Configure load testing tools
- [ ] Create traffic simulation scripts
- [ ] Test database performance
- [ ] Validate CDN caching
- [ ] Document performance baselines

---

## Phase 15: Deployment & Go-Live

### Task 15.1: Production Environment Setup

**Goal**: Configure production infrastructure

- [ ] Set up production database
- [ ] Configure production secrets
- [ ] Create backup strategies
- [ ] Implement monitoring alerts
- [ ] Set up staging environment

### Task 15.2: Deployment Pipeline

**Goal**: Automated deployment process

- [ ] Configure GitHub Actions for CI/CD
- [ ] Create deployment workflows
- [ ] Add rollback procedures
- [ ] Implement health checks
- [ ] Create deployment documentation

### Task 15.3: Pre-Launch Checklist

**Goal**: Ensure production readiness

- [ ] Verify all payment methods
- [ ] Test shipping integrations
- [ ] Validate email delivery
- [ ] Check mobile responsiveness
- [ ] Confirm legal compliance
- [ ] Test backup/restore procedures
- [ ] Verify monitoring systems
- [ ] Create launch runbook

### Task 15.4: Production Launch

**Goal**: Go live with confidence

- [ ] Deploy to production
- [ ] Configure DNS
- [ ] Enable SSL certificates
- [ ] Activate payment processing
- [ ] Start monitoring services
- [ ] Create initial admin accounts
- [ ] Document operational procedures

---

## Notes

- Each task should be completed and tested before moving to the next
- Consider creating feature flags for gradual rollout of new features
- Maintain a changelog for all significant changes
- Regular security updates should be scheduled post-launch
- Consider implementing A/B testing infrastructure for future optimization
- Plan for regular backups and disaster recovery procedures
