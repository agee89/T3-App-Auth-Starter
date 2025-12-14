# T3 App Authentication Starter

## 📋 Deskripsi Project

Aplikasi starter/boilerplate dengan sistem autentikasi lengkap yang dibangun menggunakan T3 Stack. Project ini dirancang sebagai foundation untuk semua aplikasi yang membutuhkan sistem autentikasi yang robust dan production-ready.

## 🎯 Fitur Autentikasi

### ✅ Fitur Utama
- **Login dengan Google OAuth** - Social authentication menggunakan Google
- **Register via Email** - Pendaftaran menggunakan email dan password
- **Email Verification** - Konfirmasi email setelah registrasi
- **Forgot Password** - Reset password via email
- **Password Reset** - Ubah password dengan link verifikasi
- **Session Management** - Kelola sesi user dengan aman
- **Protected Routes** - Middleware untuk route yang membutuhkan autentikasi
- **User Profile** - Halaman profil user basic

### 🔐 Keamanan
- Password hashing dengan bcrypt
- JWT tokens untuk session
- CSRF protection
- Rate limiting untuk login attempts
- Secure password reset tokens dengan expiry

## 🛠️ Tech Stack

### Core Framework
- **Next.js 14+** - React framework dengan App Router
- **TypeScript** - Type-safe development
- **Tailwind CSS** - Utility-first styling
- **shadcn/ui** - Re-usable components built with Radix UI
- **Lucide React** - Beautiful icon library

### Authentication & Database
- **NextAuth.js** - Authentication solution
- **Prisma** - Type-safe ORM
- **PostgreSQL** - Database (recommended)

### API & State Management
- **tRPC** - End-to-end type-safe APIs
- **Zod** - Schema validation
- **React Query** - Server state management (via tRPC)

### Email Service
- **SMTP Server Sendiri** - Custom SMTP configuration
- **Nodemailer** - Email sending library
- **React Email** - Email templates

## 📦 Instalasi

### Prerequisites
- Node.js 18+ 
- PostgreSQL database
- Google OAuth credentials
- SMTP Server credentials (bisa gunakan Gmail, server email hosting, atau SMTP server sendiri)

### Dependencies

Project ini menggunakan dependencies berikut:

**Core:**
```json
{
  "next": "^14.0.0",
  "react": "^18.2.0",
  "typescript": "^5.0.0"
}
```

**Authentication & Database:**
```json
{
  "next-auth": "^4.24.0",
  "@prisma/client": "^5.0.0",
  "prisma": "^5.0.0",
  "bcrypt": "^5.1.0",
  "@types/bcrypt": "^5.0.0"
}
```

**API & Validation:**
```json
{
  "@trpc/server": "^10.45.0",
  "@trpc/client": "^10.45.0",
  "@trpc/react-query": "^10.45.0",
  "@tanstack/react-query": "^5.0.0",
  "zod": "^3.22.0"
}
```

**UI Components:**
```json
{
  "tailwindcss": "^3.4.0",
  "lucide-react": "^0.400.0",
  "@radix-ui/react-slot": "^1.0.0",
  "@radix-ui/react-label": "^2.0.0",
  "@radix-ui/react-dialog": "^1.0.0",
  "class-variance-authority": "^0.7.0",
  "clsx": "^2.1.0",
  "tailwind-merge": "^2.0.0"
}
```

**Loading States:**
```json
{
  "next-nprogress-bar": "^2.3.0",
  "react-loading-skeleton": "^3.4.0",
  "framer-motion": "^10.16.0"
}
```

**Email:**
```json
{
  "nodemailer": "^6.9.0",
  "@types/nodemailer": "^6.4.0"
}
```

**Form Handling:**
```json
{
  "react-hook-form": "^7.49.0",
  "@hookform/resolvers": "^3.3.0"
}
```

### Setup Steps

```bash
# 1. Clone atau copy project ini
git clone <repository-url>
cd auth-starter

# 2. Install dependencies
npm install

# 3. Setup shadcn/ui
npx shadcn-ui@latest init

# 4. Install shadcn components yang diperlukan
npx shadcn-ui@latest add button input label card form select toast

# 5. Setup environment variables
cp .env.example .env

# 6. Konfigurasi .env file (lihat bagian Environment Variables)

# 7. Push database schema
npx prisma db push

# 8. Seed database
npx prisma db seed

# 9. Run development server
npm run dev
```

Aplikasi akan berjalan di `http://localhost:3000`

## 🔧 Environment Variables

Buat file `.env` di root project dengan konfigurasi berikut:

```env
# Database
DATABASE_URL="postgresql://user:password@localhost:5432/auth_db"

# NextAuth
NEXTAUTH_SECRET="your-random-secret-key-here"
NEXTAUTH_URL="http://localhost:3000"

# Google OAuth
GOOGLE_CLIENT_ID="your-google-client-id"
GOOGLE_CLIENT_SECRET="your-google-client-secret"

# SMTP Configuration (Custom SMTP Server)
SMTP_HOST="mail.yourdomain.com"
SMTP_PORT="587"
SMTP_SECURE="false"  # true untuk port 465, false untuk port 587
SMTP_USER="noreply@yourdomain.com"
SMTP_PASSWORD="your-smtp-password"
EMAIL_FROM="noreply@yourdomain.com"

# Optional: Rate Limiting
RATE_LIMIT_MAX_REQUESTS="5"
RATE_LIMIT_WINDOW_MS="900000"
```

### Contoh Konfigurasi SMTP

#### Gmail SMTP (untuk development/testing)
```env
SMTP_HOST="smtp.gmail.com"
SMTP_PORT="587"
SMTP_SECURE="false"
SMTP_USER="your-email@gmail.com"
SMTP_PASSWORD="your-app-password"  # Gunakan App Password, bukan password biasa
EMAIL_FROM="your-email@gmail.com"
```

#### SMTP Server Hosting (cPanel/Plesk)
```env
SMTP_HOST="mail.yourdomain.com"
SMTP_PORT="587"
SMTP_SECURE="false"
SMTP_USER="noreply@yourdomain.com"
SMTP_PASSWORD="your-email-password"
EMAIL_FROM="noreply@yourdomain.com"
```

#### SMTP Server Sendiri (Self-hosted)
```env
SMTP_HOST="192.168.1.100"  # atau domain Anda
SMTP_PORT="587"
SMTP_SECURE="false"
SMTP_USER="admin@localhost"
SMTP_PASSWORD="your-password"
EMAIL_FROM="noreply@yourdomain.com"
```

### Cara Mendapatkan Credentials

#### Google OAuth
1. Buka [Google Cloud Console](https://console.cloud.google.com/)
2. Buat project baru atau pilih existing project
3. Enable Google+ API
4. Buat OAuth 2.0 credentials
5. Tambahkan authorized redirect URI: `http://localhost:3000/api/auth/callback/google`
6. Copy Client ID dan Client Secret

#### SMTP Server Setup

**Opsi 1: Gmail (untuk development)**
1. Login ke Gmail account
2. Buka [Google Account Settings](https://myaccount.google.com/)
3. Go to Security → 2-Step Verification (aktifkan jika belum)
4. Go to Security → App passwords
5. Generate app password untuk "Mail"
6. Gunakan app password ini di `SMTP_PASSWORD`

**Opsi 2: Email Hosting (cPanel/Plesk)**
1. Login ke cPanel/Plesk
2. Buat email account (misal: noreply@yourdomain.com)
3. Cari informasi SMTP di Email Accounts settings
4. Biasanya: `mail.yourdomain.com`, port 587
5. Gunakan email dan password yang dibuat

**Opsi 3: SMTP Server Sendiri**
1. Install mail server (Postfix, Sendmail, dll) di server Anda
2. Konfigurasi domain dan DNS records (MX, SPF, DKIM)
3. Buat user untuk SMTP authentication
4. Test koneksi dengan telnet atau mail client
5. Gunakan host, port, dan credentials server Anda

**Testing SMTP Connection**
```bash
# Install nodemailer untuk test
npm install nodemailer

# Buat file test-smtp.js
node test-smtp.js
```

File `test-smtp.js`:
```javascript
const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: process.env.SMTP_PORT,
  secure: process.env.SMTP_SECURE === 'true',
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASSWORD,
  },
});

transporter.verify((error, success) => {
  if (error) {
    console.log('SMTP Error:', error);
  } else {
    console.log('SMTP Ready to send emails');
  }
});
```

## 📁 Struktur Project

```
auth-starter/
├── prisma/
│   ├── schema.prisma          # Database schema
│   └── seed.ts                # Database seeding
├── src/
│   ├── app/                   # Next.js App Router
│   │   ├── api/
│   │   │   └── auth/[...nextauth]/
│   │   │       └── route.ts   # NextAuth API routes
│   │   ├── auth/              # Auth pages
│   │   │   ├── signin/
│   │   │   ├── signup/
│   │   │   ├── verify-email/
│   │   │   ├── forgot-password/
│   │   │   └── reset-password/
│   │   ├── dashboard/         # Protected pages
│   │   │   └── loading.tsx    # Route loading state
│   │   └── layout.tsx
│   ├── components/            # React components
│   │   ├── auth/              # Auth-specific components
│   │   │   ├── signin-form.tsx
│   │   │   ├── signup-form.tsx
│   │   │   └── reset-password-form.tsx
│   │   ├── loading/           # Loading components
│   │   │   ├── app-loader.tsx
│   │   │   └── brand-loader.tsx
│   │   ├── skeletons/         # Skeleton loaders
│   │   │   ├── dashboard-skeleton.tsx
│   │   │   ├── user-card-skeleton.tsx
│   │   │   └── user-list-skeleton.tsx
│   │   └── ui/                # shadcn/ui components
│   │       ├── button.tsx
│   │       ├── loading-button.tsx
│   │       ├── input.tsx
│   │       ├── label.tsx
│   │       ├── card.tsx
│   │       ├── form.tsx
│   │       ├── skeleton.tsx
│   │       └── toast.tsx
│   ├── lib/
│   │   ├── auth.ts           # NextAuth configuration
│   │   ├── email.ts          # Email utilities with Nodemailer
│   │   ├── smtp.ts           # SMTP configuration
│   │   ├── loading-context.tsx # Global loading context
│   │   └── utils.ts
│   ├── server/
│   │   ├── api/
│   │   │   ├── routers/      # tRPC routers
│   │   │   │   ├── auth.ts   # Auth endpoints
│   │   │   │   └── user.ts   # User endpoints
│   │   │   └── root.ts
│   │   └── db.ts             # Prisma client
│   └── styles/
│       └── globals.css
├── .env.example
├── components.json            # shadcn/ui config
├── CLAUDE.md                  # Dokumentasi ini
└── package.json
```

## 🗃️ Database Schema

### User Model
```prisma
model User {
  id                String    @id @default(cuid())
  name              String?
  email             String    @unique
  emailVerified     DateTime?
  image             String?
  password          String?   // Hashed, null untuk OAuth users
  accounts          Account[]
  sessions          Session[]
  verificationToken VerificationToken[]
  resetToken        PasswordResetToken[]
  createdAt         DateTime  @default(now())
  updatedAt         DateTime  @updatedAt
}
```

### Supporting Models
- **Account** - OAuth accounts (Google, etc)
- **Session** - User sessions
- **VerificationToken** - Email verification tokens
- **PasswordResetToken** - Password reset tokens

## 🚀 API Endpoints (tRPC)

### Auth Router

```typescript
// Register user
auth.register({
  email: string,
  password: string,
  name?: string
})

// Verify email
auth.verifyEmail({
  token: string
})

// Request password reset
auth.forgotPassword({
  email: string
})

// Reset password
auth.resetPassword({
  token: string,
  password: string
})

// Resend verification email
auth.resendVerification({
  email: string
})
```

### User Router

```typescript
// Get current user (protected)
user.me()

// Update profile (protected)
user.updateProfile({
  name?: string,
  email?: string
})

// Change password (protected)
user.changePassword({
  currentPassword: string,
  newPassword: string
})
```

## 🎨 UI Pages

### Public Pages
- `/` - Landing page
- `/auth/signin` - Login page
- `/auth/signup` - Registration page
- `/auth/verify-email` - Email verification page
- `/auth/forgot-password` - Forgot password page
- `/auth/reset-password` - Reset password page

### Protected Pages
- `/dashboard` - User dashboard (requires authentication)
- `/profile` - User profile page

### UI Components dengan shadcn/ui

Project ini menggunakan **shadcn/ui** untuk komponen UI yang konsisten dan customizable.

**Komponen yang digunakan:**
- `Button` - Tombol dengan berbagai variant
- `Input` - Text input fields
- `Label` - Form labels
- `Card` - Container untuk content
- `Form` - Form dengan validation (react-hook-form + zod)
- `Select` - Dropdown select
- `Toast` - Notifications
- `Dialog` - Modal dialogs
- `Alert` - Alert messages

**Icons dengan Lucide React:**

```tsx
import { 
  Mail, 
  Lock, 
  Eye, 
  EyeOff, 
  LogIn, 
  UserPlus,
  CheckCircle,
  AlertCircle,
  Loader2
} from 'lucide-react';

// Contoh penggunaan
<Button>
  <Mail className="mr-2 h-4 w-4" />
  Sign in with Email
</Button>
```

**Contoh Form Component:**

```tsx
// components/auth/signin-form.tsx
'use client';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Mail, Lock, Loader2 } from 'lucide-react';
import { useState } from 'react';

export function SignInForm() {
  const [isLoading, setIsLoading] = useState(false);
  
  return (
    <Card className="w-full max-w-md">
      <CardHeader>
        <CardTitle>Sign In</CardTitle>
      </CardHeader>
      <CardContent>
        <form className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <div className="relative">
              <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input
                id="email"
                type="email"
                placeholder="name@example.com"
                className="pl-9"
              />
            </div>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="password">Password</Label>
            <div className="relative">
              <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input
                id="password"
                type="password"
                className="pl-9"
              />
            </div>
          </div>
          
          <Button className="w-full" disabled={isLoading}>
            {isLoading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Loading...
              </>
            ) : (
              'Sign In'
            )}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
```

**Customization:**

Semua komponen shadcn/ui bisa dikustomisasi di file `components/ui/`. Anda memiliki full control atas styling dan behavior karena komponen disimpan di project Anda sendiri, bukan di node_modules.

## ⏳ Loading States & UX Enhancement

### Pentingnya Loading States

Loading states yang baik sangat penting untuk:
- ✅ **User Experience** - User tahu app masih bekerja, tidak freeze
- ✅ **Perceived Performance** - App terasa lebih cepat
- ✅ **Prevent Errors** - Disable actions saat loading
- ✅ **Professional Look** - Polished, production-ready feel
- ✅ **Reduce Bounce Rate** - User tidak abandon karena bingung

### Loading Strategy Berdasarkan Use Case

| Use Case | Loading Type | Library/Method | Priority |
|----------|--------------|----------------|----------|
| Page Navigation | Top Loader | NProgress | ⭐ Must Have |
| Data Fetching (Lists) | Skeleton | react-loading-skeleton | ⭐ Must Have |
| Form Submission | Button Spinner | Lucide React | ⭐ Must Have |
| Initial App Load | Full Page Loader | Custom | ⭐ Must Have |
| Auth State | Suspense | Next.js native | ⭐ Must Have |
| Infinite Scroll | Inline Spinner | Lucide React | ⭐ Nice to Have |
| Route Transitions | Page Transitions | Framer Motion | 💫 Optional |
| Optimistic Updates | Instant Feedback | tRPC + React Query | 💫 Optional |

### Required Dependencies

Tambahkan dependencies untuk loading states:

```json
{
  "dependencies": {
    "next-nprogress-bar": "^2.3.0",
    "react-loading-skeleton": "^3.4.0"
  },
  "devDependencies": {
    "framer-motion": "^10.16.0"
  }
}
```

Install:
```bash
npm install next-nprogress-bar react-loading-skeleton
npm install -D framer-motion  # Optional
```

### 1. Top Loader (Page Navigation)

**Setup NProgress Bar** untuk page transitions:

```tsx
// app/layout.tsx
import { AppProgressBar as ProgressBar } from 'next-nprogress-bar';

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        {/* Top progress bar */}
        <ProgressBar
          height="3px"
          color="#0070f3"
          options={{ showSpinner: false }}
          shallowRouting
        />
        {children}
      </body>
    </html>
  );
}
```

**Customization:**
```tsx
<ProgressBar
  height="4px"
  color="#6366f1"
  options={{ 
    showSpinner: false,
    trickle: true,
    trickleSpeed: 200,
    minimum: 0.08,
    easing: 'ease',
    speed: 200,
  }}
  shallowRouting
  startPosition={0.3}
  delay={300}
/>
```

### 2. Skeleton Loaders (Data Fetching)

**Setup React Loading Skeleton:**

```tsx
// components/ui/skeleton.tsx (shadcn alternative)
import { cn } from "@/lib/utils";

function Skeleton({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn("animate-pulse rounded-md bg-muted", className)}
      {...props}
    />
  );
}

export { Skeleton };
```

**Atau gunakan react-loading-skeleton:**

```tsx
// components/skeletons/user-card-skeleton.tsx
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

export function UserCardSkeleton() {
  return (
    <div className="rounded-lg border p-6">
      <div className="flex items-center space-x-4">
        <Skeleton circle width={64} height={64} />
        <div className="flex-1">
          <Skeleton width="60%" height={24} />
          <Skeleton width="40%" height={16} className="mt-2" />
        </div>
      </div>
      <div className="mt-4 space-y-2">
        <Skeleton count={3} />
      </div>
    </div>
  );
}
```

**Usage dengan shadcn Skeleton:**

```tsx
// components/skeletons/dashboard-skeleton.tsx
import { Skeleton } from "@/components/ui/skeleton";
import { Card, CardContent, CardHeader } from "@/components/ui/card";

export function DashboardSkeleton() {
  return (
    <div className="space-y-6">
      {/* Header Skeleton */}
      <div className="space-y-2">
        <Skeleton className="h-8 w-64" />
        <Skeleton className="h-4 w-96" />
      </div>

      {/* Stats Cards Skeleton */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {[...Array(4)].map((_, i) => (
          <Card key={i}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <Skeleton className="h-4 w-24" />
              <Skeleton className="h-4 w-4 rounded-full" />
            </CardHeader>
            <CardContent>
              <Skeleton className="h-7 w-20" />
              <Skeleton className="h-3 w-32 mt-1" />
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Table Skeleton */}
      <Card>
        <CardHeader>
          <Skeleton className="h-6 w-48" />
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {[...Array(5)].map((_, i) => (
              <div key={i} className="flex items-center space-x-4">
                <Skeleton className="h-12 w-12 rounded-full" />
                <div className="flex-1 space-y-2">
                  <Skeleton className="h-4 w-full" />
                  <Skeleton className="h-3 w-3/4" />
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
```

**Usage in Page:**

```tsx
// app/dashboard/page.tsx
import { Suspense } from 'react';
import { DashboardSkeleton } from '@/components/skeletons/dashboard-skeleton';
import { DashboardContent } from '@/components/dashboard-content';

export default function DashboardPage() {
  return (
    <Suspense fallback={<DashboardSkeleton />}>
      <DashboardContent />
    </Suspense>
  );
}
```

### 3. Button Loading States

**Button Component dengan Loading State:**

```tsx
// components/ui/button.tsx (extend shadcn button)
import { Loader2 } from "lucide-react";
import { Button as ShadcnButton, ButtonProps } from "@/components/ui/button";

interface LoadingButtonProps extends ButtonProps {
  loading?: boolean;
  loadingText?: string;
}

export function LoadingButton({ 
  children, 
  loading, 
  loadingText,
  disabled,
  ...props 
}: LoadingButtonProps) {
  return (
    <ShadcnButton disabled={disabled || loading} {...props}>
      {loading ? (
        <>
          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          {loadingText || "Loading..."}
        </>
      ) : (
        children
      )}
    </ShadcnButton>
  );
}
```

**Usage:**

```tsx
// components/auth/signin-form.tsx
'use client';

import { useState } from 'react';
import { LoadingButton } from '@/components/ui/loading-button';

export function SignInForm() {
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    try {
      // Auth logic
      await signIn();
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      {/* Form fields */}
      <LoadingButton 
        type="submit" 
        loading={isLoading}
        loadingText="Signing in..."
        className="w-full"
      >
        Sign In
      </LoadingButton>
    </form>
  );
}
```

### 4. Full Page Loader (Initial Load)

**App Loading Component:**

```tsx
// components/loading/app-loader.tsx
import { Loader2 } from "lucide-react";

export function AppLoader() {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-background">
      <div className="flex flex-col items-center space-y-4">
        <Loader2 className="h-12 w-12 animate-spin text-primary" />
        <p className="text-sm text-muted-foreground">Loading...</p>
      </div>
    </div>
  );
}

// Dengan brand logo
export function BrandLoader() {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-background">
      <div className="flex flex-col items-center space-y-6">
        {/* Logo */}
        <div className="relative">
          <div className="h-20 w-20 rounded-full border-4 border-primary/20" />
          <Loader2 className="absolute inset-0 h-20 w-20 animate-spin text-primary" />
        </div>
        
        <div className="text-center">
          <h2 className="text-2xl font-bold">Your App Name</h2>
          <p className="text-sm text-muted-foreground mt-2">
            Setting things up...
          </p>
        </div>
      </div>
    </div>
  );
}
```

### 5. Loading with Suspense (Next.js Native)

**Route-level Loading:**

```tsx
// app/dashboard/loading.tsx
import { DashboardSkeleton } from '@/components/skeletons/dashboard-skeleton';

export default function Loading() {
  return <DashboardSkeleton />;
}
```

**Component-level Suspense:**

```tsx
// app/dashboard/page.tsx
import { Suspense } from 'react';
import { UserList } from '@/components/user-list';
import { UserListSkeleton } from '@/components/skeletons/user-list-skeleton';

export default function DashboardPage() {
  return (
    <div>
      <h1>Dashboard</h1>
      
      <Suspense fallback={<UserListSkeleton />}>
        <UserList />
      </Suspense>
    </div>
  );
}
```

### 6. tRPC Loading States

**With React Query from tRPC:**

```tsx
// components/user-profile.tsx
'use client';

import { api } from '@/lib/trpc/client';
import { Skeleton } from '@/components/ui/skeleton';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { AlertCircle } from 'lucide-react';

export function UserProfile() {
  const { data, isLoading, isError, error } = api.user.getProfile.useQuery();

  if (isLoading) {
    return (
      <div className="space-y-4">
        <Skeleton className="h-8 w-48" />
        <Skeleton className="h-4 w-64" />
        <Skeleton className="h-32 w-full" />
      </div>
    );
  }

  if (isError) {
    return (
      <Alert variant="destructive">
        <AlertCircle className="h-4 w-4" />
        <AlertDescription>
          {error.message || 'Failed to load profile'}
        </AlertDescription>
      </Alert>
    );
  }

  return (
    <div>
      <h2>{data.name}</h2>
      <p>{data.email}</p>
    </div>
  );
}
```

### 7. Infinite Scroll Loading

**Inline Spinner untuk Load More:**

```tsx
// components/infinite-list.tsx
'use client';

import { useEffect, useRef } from 'react';
import { api } from '@/lib/trpc/client';
import { Loader2 } from 'lucide-react';

export function InfiniteList() {
  const observerTarget = useRef(null);
  
  const { 
    data, 
    fetchNextPage, 
    hasNextPage, 
    isFetchingNextPage 
  } = api.posts.getInfinite.useInfiniteQuery(
    { limit: 10 },
    { getNextPageParam: (lastPage) => lastPage.nextCursor }
  );

  useEffect(() => {
    const observer = new IntersectionObserver(
      entries => {
        if (entries[0]?.isIntersecting && hasNextPage) {
          fetchNextPage();
        }
      },
      { threshold: 1 }
    );

    if (observerTarget.current) {
      observer.observe(observerTarget.current);
    }

    return () => observer.disconnect();
  }, [fetchNextPage, hasNextPage]);

  return (
    <div>
      {/* List items */}
      {data?.pages.map((page) =>
        page.items.map((item) => (
          <div key={item.id}>{item.title}</div>
        ))
      )}

      {/* Loading indicator */}
      {isFetchingNextPage && (
        <div className="flex justify-center py-4">
          <Loader2 className="h-6 w-6 animate-spin text-primary" />
        </div>
      )}

      {/* Observer target */}
      <div ref={observerTarget} />
    </div>
  );
}
```

### 8. Optimistic Updates (Advanced)

**Instant Feedback dengan tRPC:**

```tsx
// components/like-button.tsx
'use client';

import { api } from '@/lib/trpc/client';
import { Heart } from 'lucide-react';
import { Button } from '@/components/ui/button';

export function LikeButton({ postId, initialLikes }: Props) {
  const utils = api.useUtils();
  
  const { mutate, isLoading } = api.post.like.useMutation({
    // Optimistic update
    onMutate: async () => {
      await utils.post.get.cancel({ id: postId });
      
      const previousData = utils.post.get.getData({ id: postId });
      
      // Update cache optimistically
      utils.post.get.setData({ id: postId }, (old) => ({
        ...old!,
        likes: old!.likes + 1,
        isLiked: true,
      }));
      
      return { previousData };
    },
    
    // Revert on error
    onError: (err, variables, context) => {
      if (context?.previousData) {
        utils.post.get.setData({ id: postId }, context.previousData);
      }
    },
    
    // Refetch on success
    onSettled: () => {
      utils.post.get.invalidate({ id: postId });
    },
  });

  return (
    <Button
      variant="ghost"
      size="sm"
      onClick={() => mutate({ postId })}
      disabled={isLoading}
    >
      <Heart className="mr-2 h-4 w-4" />
      {initialLikes}
    </Button>
  );
}
```

### 9. Page Transitions (Optional)

**Smooth transitions dengan Framer Motion:**

```tsx
// components/page-transition.tsx
'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { usePathname } from 'next/navigation';

export function PageTransition({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={pathname}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        transition={{ duration: 0.3 }}
      >
        {children}
      </motion.div>
    </AnimatePresence>
  );
}
```

```tsx
// app/layout.tsx
import { PageTransition } from '@/components/page-transition';

export default function RootLayout({ children }) {
  return (
    <html>
      <body>
        <PageTransition>
          {children}
        </PageTransition>
      </body>
    </html>
  );
}
```

### 10. Global Loading State (Advanced)

**Context untuk global loading:**

```tsx
// lib/loading-context.tsx
'use client';

import { createContext, useContext, useState } from 'react';
import { AppLoader } from '@/components/loading/app-loader';

const LoadingContext = createContext({
  isLoading: false,
  setLoading: (loading: boolean) => {},
});

export function LoadingProvider({ children }: { children: React.ReactNode }) {
  const [isLoading, setIsLoading] = useState(false);

  return (
    <LoadingContext.Provider value={{ isLoading, setLoading: setIsLoading }}>
      {isLoading && <AppLoader />}
      {children}
    </LoadingContext.Provider>
  );
}

export const useLoading = () => useContext(LoadingContext);
```

**Usage:**

```tsx
const { setLoading } = useLoading();

const handleLongOperation = async () => {
  setLoading(true);
  try {
    await longOperation();
  } finally {
    setLoading(false);
  }
};
```

### Loading States Checklist

**Must Implement:**
- ✅ Top progress bar untuk page navigation
- ✅ Button loading states untuk forms
- ✅ Skeleton loaders untuk dashboard/lists
- ✅ Error states dengan fallback UI
- ✅ Suspense boundaries untuk code splitting

**Nice to Have:**
- ⭐ Optimistic updates untuk instant feedback
- ⭐ Infinite scroll loading indicators
- ⭐ Loading context untuk global state

**Optional Enhancements:**
- 💫 Page transitions dengan animations
- 💫 Custom loading animations
- 💫 Progress indicators untuk multi-step forms

### Best Practices

1. **Always Show Feedback** - Never leave user wondering if something is happening
2. **Match Loading to Content** - Use appropriate loader for each use case
3. **Disable During Loading** - Prevent double submissions
4. **Show Errors Gracefully** - Don't just hide loading, show what went wrong
5. **Skeleton > Spinner** - Skeleton loaders feel faster than spinners
6. **Progressive Loading** - Show data as it arrives, don't wait for everything
7. **Timeout Handling** - Show error if loading takes too long
8. **Accessible Loading** - Use aria-live and aria-busy attributes
9. **Cancel Operations** - Allow users to cancel long operations
10. **Test Edge Cases** - Slow network, errors, empty states

### Performance Tips

```tsx
// Good: Lazy load components
const HeavyComponent = lazy(() => import('./heavy-component'));

<Suspense fallback={<Skeleton />}>
  <HeavyComponent />
</Suspense>

// Good: Prefetch on hover
<Link 
  href="/dashboard" 
  prefetch={true}
  onMouseEnter={() => router.prefetch('/dashboard')}
>
  Dashboard
</Link>

// Good: Show stale data while revalidating
const { data } = api.user.get.useQuery(undefined, {
  staleTime: 5000,
  refetchOnWindowFocus: false,
});
```

## 🔒 Middleware & Protection

### Server-side Protection
```typescript
// Di tRPC router
export const protectedProcedure = t.procedure.use(async ({ ctx, next }) => {
  if (!ctx.session || !ctx.session.user) {
    throw new TRPCError({ code: 'UNAUTHORIZED' });
  }
  return next({
    ctx: {
      session: { ...ctx.session, user: ctx.session.user },
    },
  });
});
```

### Client-side Protection
```typescript
// Di component atau page
import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";

export default function ProtectedPage() {
  const { data: session, status } = useSession({
    required: true,
    onUnauthenticated() {
      redirect('/auth/signin');
    },
  });
  
  if (status === "loading") return <div>Loading...</div>;
  
  return <div>Protected content</div>;
}
```

## 📧 Email Templates

Email templates menggunakan Nodemailer dengan SMTP server Anda sendiri.

Email templates tersedia untuk:
- Welcome email setelah registrasi
- Email verification dengan link
- Password reset dengan secure token
- Password changed confirmation
- Login alert (optional)

### Contoh Implementasi Email dengan Nodemailer

```typescript
// src/lib/smtp.ts
import nodemailer from 'nodemailer';

export const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: parseInt(process.env.SMTP_PORT || '587'),
  secure: process.env.SMTP_SECURE === 'true', // true untuk 465, false untuk 587
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASSWORD,
  },
});

// Verify connection
transporter.verify((error, success) => {
  if (error) {
    console.error('SMTP connection error:', error);
  } else {
    console.log('SMTP server ready to send emails');
  }
});
```

```typescript
// src/lib/email.ts
import { transporter } from './smtp';

export async function sendVerificationEmail(email: string, token: string) {
  const verificationUrl = `${process.env.NEXTAUTH_URL}/auth/verify-email?token=${token}`;
  
  await transporter.sendMail({
    from: process.env.EMAIL_FROM,
    to: email,
    subject: 'Verify your email address',
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h2>Verify Your Email</h2>
        <p>Thank you for registering! Please click the button below to verify your email address.</p>
        <a href="${verificationUrl}" 
           style="display: inline-block; padding: 12px 24px; background-color: #0070f3; 
                  color: white; text-decoration: none; border-radius: 5px; margin: 20px 0;">
          Verify Email
        </a>
        <p>Or copy this link: ${verificationUrl}</p>
        <p>This link will expire in 24 hours.</p>
      </div>
    `,
  });
}

export async function sendPasswordResetEmail(email: string, token: string) {
  const resetUrl = `${process.env.NEXTAUTH_URL}/auth/reset-password?token=${token}`;
  
  await transporter.sendMail({
    from: process.env.EMAIL_FROM,
    to: email,
    subject: 'Reset your password',
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h2>Reset Your Password</h2>
        <p>You requested to reset your password. Click the button below to proceed.</p>
        <a href="${resetUrl}" 
           style="display: inline-block; padding: 12px 24px; background-color: #0070f3; 
                  color: white; text-decoration: none; border-radius: 5px; margin: 20px 0;">
          Reset Password
        </a>
        <p>Or copy this link: ${resetUrl}</p>
        <p>This link will expire in 1 hour.</p>
        <p>If you didn't request this, please ignore this email.</p>
      </div>
    `,
  });
}
```

Untuk templating yang lebih advanced, Anda bisa menggunakan:
- **React Email** - Build email templates dengan React components
- **Handlebars** - Template engine untuk HTML emails
- **MJML** - Responsive email framework

Customize templates di `src/lib/email.ts` sesuai branding Anda.

## 🧪 Testing

```bash
# Run unit tests
npm run test

# Run E2E tests
npm run test:e2e

# Type checking
npm run type-check

# Linting
npm run lint
```

## 🔍 ESLint & Linting Configuration

### Pentingnya Linting

Linting penting untuk:
- ✅ Catch errors sebelum runtime
- ✅ Konsistensi code style
- ✅ Deteksi unused variables/imports
- ✅ Best practices enforcement
- ✅ TypeScript errors yang terlewat

### Masalah Umum

**Problem:** Build gagal karena lint errors
```bash
npm run build
# Error: ESLint found 47 problems (23 errors, 24 warnings)
```

**Solusi:** Gunakan konfigurasi yang balanced antara strict dan praktis.

### Recommended ESLint Configuration

Buat atau update `.eslintrc.cjs`:

```javascript
/** @type {import("eslint").Linter.Config} */
const config = {
  parser: "@typescript-eslint/parser",
  parserOptions: {
    project: true,
  },
  plugins: ["@typescript-eslint"],
  extends: [
    "next/core-web-vitals",
    "plugin:@typescript-eslint/recommended-type-checked",
    "plugin:@typescript-eslint/stylistic-type-checked",
  ],
  rules: {
    // TypeScript rules - set to warning untuk tidak block build
    "@typescript-eslint/no-unused-vars": [
      "warn",
      {
        argsIgnorePattern: "^_",
        varsIgnorePattern: "^_",
      },
    ],
    "@typescript-eslint/no-explicit-any": "warn",
    "@typescript-eslint/consistent-type-imports": [
      "warn",
      {
        prefer: "type-imports",
        fixStyle: "inline-type-imports",
      },
    ],
    "@typescript-eslint/no-misused-promises": [
      "error",
      {
        checksVoidReturn: {
          attributes: false,
        },
      },
    ],

    // React/Next.js rules
    "react/no-unescaped-entities": "off",
    "@next/next/no-html-link-for-pages": "off",
    "react-hooks/exhaustive-deps": "warn",

    // General rules
    "no-console": ["warn", { allow: ["warn", "error"] }],
    
    // Relaxed rules untuk development
    ...(process.env.NODE_ENV === "development" && {
      "@typescript-eslint/no-unsafe-assignment": "off",
      "@typescript-eslint/no-unsafe-member-access": "off",
      "@typescript-eslint/no-unsafe-call": "off",
    }),
  },
};

module.exports = config;
```

### Next.js Configuration

Update `next.config.js` untuk handling lint saat build:

```javascript
/** @type {import("next").NextConfig} */
const config = {
  // Opsi 1: Ignore lint saat build (Quick Fix)
  // eslint: {
  //   ignoreDuringBuilds: true,
  // },
  
  // Opsi 2: Allow lint warnings tapi block untuk errors (Recommended)
  eslint: {
    // Hanya error yang block build, warning tetap jalan
    ignoreDuringBuilds: false,
  },
  
  // TypeScript tetap strict
  typescript: {
    ignoreBuildErrors: false,
  },
};

module.exports = config;
```

### Package.json Scripts

Update `package.json` dengan scripts yang berguna:

```json
{
  "scripts": {
    "dev": "next dev",
    "build": "next build",
    "start": "next start",
    
    // Lint scripts
    "lint": "next lint",
    "lint:fix": "next lint --fix",
    "lint:strict": "next lint --max-warnings 0",
    
    // Type checking
    "type-check": "tsc --noEmit",
    
    // Combined check sebelum push/deploy
    "check": "npm run type-check && npm run lint",
    "check:fix": "npm run type-check && npm run lint:fix",
    
    // Build dengan full validation
    "build:check": "npm run check && npm run build",
    
    // Pre-commit check (optional, bisa pakai husky)
    "precommit": "npm run lint:fix && npm run type-check"
  }
}
```

### Git Hooks dengan Husky (Optional)

Untuk auto-lint sebelum commit:

```bash
# Install husky dan lint-staged
npm install -D husky lint-staged

# Setup husky
npx husky init
```

Buat `.husky/pre-commit`:

```bash
#!/usr/bin/env sh
. "$(dirname -- "$0")/_/husky.sh"

npx lint-staged
```

Tambahkan di `package.json`:

```json
{
  "lint-staged": {
    "*.{js,jsx,ts,tsx}": [
      "eslint --fix",
      "prettier --write"
    ],
    "*.{json,md}": [
      "prettier --write"
    ]
  }
}
```

### VS Code Integration

Buat `.vscode/settings.json` untuk auto-fix on save:

```json
{
  "editor.formatOnSave": true,
  "editor.codeActionsOnSave": {
    "source.fixAll.eslint": true,
    "source.organizeImports": true
  },
  "eslint.validate": [
    "javascript",
    "javascriptreact",
    "typescript",
    "typescriptreact"
  ],
  "typescript.tsdk": "node_modules/typescript/lib",
  "typescript.enablePromptUseWorkspaceTsdk": true
}
```

### Prettier Configuration (Optional)

Untuk consistent formatting, tambahkan `.prettierrc`:

```json
{
  "semi": true,
  "trailingComma": "es5",
  "singleQuote": false,
  "tabWidth": 2,
  "printWidth": 100,
  "plugins": ["prettier-plugin-tailwindcss"]
}
```

Install prettier:

```bash
npm install -D prettier prettier-plugin-tailwindcss
```

### Ignore Files

Buat `.eslintignore`:

```
# dependencies
node_modules
.pnp
.pnp.js

# testing
coverage

# next.js
.next/
out/
build
dist

# production
.vercel

# misc
.DS_Store
*.pem

# debug
npm-debug.log*
yarn-debug.log*
yarn-error.log*

# local env files
.env
.env*.local

# typescript
*.tsbuildinfo
next-env.d.ts

# prisma
prisma/migrations
```

### Workflow Recommendations

**Development:**
```bash
npm run dev           # Develop tanpa worry tentang lint
npm run lint:fix      # Fix semua yang bisa di-autofix
npm run check         # Check sebelum commit
```

**Before Commit:**
```bash
npm run check:fix     # Auto-fix + type check
git add .
git commit -m "message"
```

**Before Deploy:**
```bash
npm run build:check   # Full validation + build
```

**CI/CD Pipeline:**
```yaml
# .github/workflows/lint.yml (example)
name: Lint

on: [push, pull_request]

jobs:
  lint:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
        with:
          node-version: '18'
      - run: npm ci
      - run: npm run lint
      - run: npm run type-check
```

### Troubleshooting Lint Issues

**1. Too many errors:**
```bash
# Fix yang bisa di-autofix dulu
npm run lint:fix

# Sisanya fix manual atau adjust rules
```

**2. Build gagal di production:**
```javascript
// Temporary: Allow build dengan warnings
// next.config.js
eslint: {
  ignoreDuringBuilds: true, // HANYA untuk emergency
}
```

**3. Conflict dengan Prettier:**
```bash
# Install eslint-config-prettier
npm install -D eslint-config-prettier

# Tambahkan di .eslintrc.cjs extends
extends: [
  "next/core-web-vitals",
  "plugin:@typescript-eslint/recommended-type-checked",
  "prettier" // Harus paling akhir
]
```

**4. Slow linting:**
```javascript
// .eslintrc.cjs
parserOptions: {
  project: true,
  tsconfigRootDir: __dirname,
}
```

### Best Practices

1. **Start Relaxed, Tighten Gradually** - Jangan langsung strict di awal project
2. **Auto-fix adalah Teman** - Gunakan `--fix` flag sesering mungkin
3. **Use Editor Integration** - Setup VS Code auto-fix on save
4. **Separate Lint dari Build** - Jangan block build untuk warnings
5. **Document Custom Rules** - Explain kenapa disable certain rules
6. **Team Agreement** - Pastikan team setuju dengan lint config
7. **Regular Updates** - Update ESLint dan plugins secara berkala

### When to Ignore Lint

Kadang perlu ignore lint untuk kasus spesifik:

```typescript
// Untuk satu line
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const data: any = await fetch();

// Untuk satu file
/* eslint-disable @typescript-eslint/no-explicit-any */
// ... file content
/* eslint-enable @typescript-eslint/no-explicit-any */

// Untuk block
/* eslint-disable */
// ... code
/* eslint-enable */
```

**⚠️ Warning:** Jangan abuse `eslint-disable`. Gunakan hanya kalau memang necessary dan ada alasan jelas.

## 🚢 Deployment

### Vercel (Recommended)
```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel

# Set environment variables di Vercel dashboard
```

### Docker
```bash
# Build image
docker build -t auth-starter .

# Run container
docker run -p 3000:3000 auth-starter
```

### Environment Variables di Production
Pastikan semua environment variables sudah diset dengan nilai production:
- `NEXTAUTH_URL` → URL production Anda
- `DATABASE_URL` → Production database
- `GOOGLE_CLIENT_ID/SECRET` → Production OAuth credentials
- `EMAIL_*` → Production email service

## 📝 Development Guidelines

### Menambah Provider OAuth Baru
1. Install provider di `src/lib/auth.ts`
2. Tambahkan credentials di `.env`
3. Update UI di signin page

### Menambah Field User Baru
1. Update Prisma schema
2. Run `npx prisma db push`
3. Update tRPC router & types
4. Update UI forms

### Custom Email Template
1. Edit `src/lib/email.ts`
2. Atau gunakan React Email untuk templating advanced

## 🐛 Troubleshooting

### Database Connection Error
- Cek `DATABASE_URL` di `.env`
- Pastikan PostgreSQL service running
- Run `npx prisma db push` untuk sync schema

### Email Tidak Terkirim (SMTP Issues)
- **Test SMTP Connection**: Jalankan `test-smtp.js` untuk verify credentials
- **Port Issues**: 
  - Port 587 = STARTTLS (SMTP_SECURE=false)
  - Port 465 = SSL/TLS (SMTP_SECURE=true)
  - Port 25 = sering diblok ISP
- **Authentication Failed**: 
  - Pastikan username/password benar
  - Untuk Gmail: gunakan App Password, bukan password biasa
  - Cek apakah SMTP server butuh authentication
- **Firewall**: Pastikan port SMTP tidak diblok firewall
- **DNS Issues**: Verify domain MX records jika self-hosted
- **SPF/DKIM**: Setup SPF dan DKIM untuk menghindari spam folder
- **Rate Limiting**: Beberapa SMTP server punya limit per jam/hari
- **SSL Certificate**: Untuk self-hosted, pastikan SSL certificate valid

**Debug Mode**:
```javascript
// Tambahkan di smtp.ts untuk debugging
export const transporter = nodemailer.createTransport({
  // ... config
  debug: true, // Enable debug output
  logger: true, // Log to console
});
```

### OAuth Error
- Verify redirect URIs di provider console
- Cek CLIENT_ID dan SECRET
- Pastikan `NEXTAUTH_URL` sesuai

### shadcn/ui Components Tidak Muncul
- Pastikan sudah run `npx shadcn-ui@latest init`
- Cek `components.json` sudah terkonfigurasi
- Verify import path di `tsconfig.json`
- Re-install component: `npx shadcn-ui@latest add [component-name]`

### Lint/Build Errors
- **Build gagal karena lint**: 
  - Quick fix: `npm run lint:fix`
  - Adjust rules di `.eslintrc.cjs` (lihat ESLint section)
  - Temporary: Set `ignoreDuringBuilds: true` di next.config.js
- **TypeScript errors**: 
  - Run `npm run type-check` untuk isolated check
  - Fix type errors sebelum worry tentang lint
- **Too many warnings**: 
  - Change rules dari "error" ke "warn"
  - Gradually fix warnings over time
- **Prettier conflict**: 
  - Install `eslint-config-prettier`
  - Add "prettier" di extends (paling akhir)

## 📚 Resources & Documentation

- [Next.js Docs](https://nextjs.org/docs)
- [NextAuth.js Docs](https://next-auth.js.org/)
- [Prisma Docs](https://www.prisma.io/docs)
- [tRPC Docs](https://trpc.io/docs)
- [Tailwind CSS](https://tailwindcss.com/docs)
- [shadcn/ui](https://ui.shadcn.com/)
- [Lucide React Icons](https://lucide.dev/)
- [Nodemailer Docs](https://nodemailer.com/)
- [React Hook Form](https://react-hook-form.com/)
- [Zod Validation](https://zod.dev/)
- [React Loading Skeleton](https://github.com/dvtng/react-loading-skeleton)
- [NextTopLoader](https://github.com/TheSGJ/nextjs-toploader)
- [Framer Motion](https://www.framer.com/motion/)
- [T3 Stack](https://create.t3.gg/)

## 🤝 Contributing

Jika Anda ingin berkontribusi atau customize untuk project spesifik:

1. Fork repository ini
2. Buat feature branch
3. Commit changes
4. Push dan create Pull Request

## 📄 License

MIT License - bebas digunakan untuk project pribadi atau komersial.

## 💡 Tips & Best Practices

### Security
1. **Password Security** - Selalu hash password dengan bcrypt, gunakan HTTPS di production
2. **Rate Limiting** - Implementasikan rate limiting untuk mencegah brute force attacks
3. **Validation** - Validasi input di client dan server side dengan Zod
4. **Error Handling** - Berikan error message yang jelas tapi tidak expose sistem details
5. **Logging** - Log aktivitas autentikasi untuk audit trail
6. **Backup** - Regular backup database dan environment variables
7. **Secrets** - Jangan commit `.env` ke git, gunakan `.env.example` sebagai template

### Email & SMTP
1. **Always Show Feedback** - Never leave user wondering if something is happening
2. **SPF Records** - Setup SPF untuk domain Anda agar email tidak masuk spam
3. **DKIM Signing** - Implement DKIM untuk email authentication
4. **DMARC Policy** - Setup DMARC untuk melindungi domain dari spoofing
5. **Rate Limiting** - Limit pengiriman email untuk mencegah abuse (misal: max 5 verification emails per hour)
6. **Email Validation** - Validasi format email di client dan server
7. **Retry Logic** - Implement retry untuk failed email sends
8. **Logging** - Log semua email yang terkirim untuk tracking
9. **Testing** - Test email di berbagai email clients (Gmail, Outlook, dll)
10. **Unsubscribe** - Tambahkan unsubscribe link untuk marketing emails (jika ada)
11. **Plain Text Alternative** - Selalu sediakan plain text version dari HTML emails

### Loading States & UX
1. **Match Loading to Context** - Use appropriate loader (skeleton, spinner, progress bar) untuk setiap use case
2. **Skeleton > Spinner** - Skeleton loaders feel faster dan more informative
3. **Disable During Loading** - Prevent double submissions dan race conditions
4. **Show Errors Gracefully** - Jangan just hide loading, show what went wrong
5. **Progressive Loading** - Show data as it arrives, don't wait for everything
6. **Accessible Loading** - Use aria-live, aria-busy, dan screen reader friendly states
7. **Timeout Handling** - Show error atau retry option jika loading takes too long
8. **Cancel Operations** - Allow users to cancel long-running operations
9. **Optimistic Updates** - Show instant feedback untuk better perceived performance
10. **Consistent Patterns** - Use same loading patterns across entire app

### Development
1. **Type Safety** - Leverage TypeScript untuk catch errors early
2. **Component Reusability** - Gunakan shadcn/ui components yang sudah ada
3. **Icons Consistency** - Stick dengan Lucide React untuk konsistensi visual
4. **Form Validation** - Gunakan react-hook-form + Zod untuk form handling
5. **Error Boundaries** - Implement error boundaries untuk graceful error handling
6. **Loading States** - Selalu show loading indicator saat proses async
7. **Linting Workflow**:
   - Auto-fix on save di VS Code
   - Run `npm run lint:fix` sebelum commit
   - Use `npm run check` untuk full validation
   - Don't let lint block your development flow
   - Fix warnings gradually, prioritize errors

### Production
1. **Environment Variables** - Verify semua env vars di production
2. **Database Backups** - Automated daily backups
3. **Monitoring** - Setup monitoring untuk SMTP success/failure rate
4. **SSL/TLS** - Enforce HTTPS untuk semua endpoints
5. **CORS** - Configure CORS properly jika ada separate frontend
6. **CDN** - Use CDN untuk static assets

## 📞 Support

Jika ada pertanyaan atau issue:
- Cek dokumentasi di atas
- Review code comments
- Check existing issues
- Tanya Claude untuk guidance lebih lanjut!

---