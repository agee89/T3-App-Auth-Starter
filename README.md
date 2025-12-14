# T3 App Auth Starter

A comprehensive authentication starter/boilerplate built with the T3 Stack (Next.js, tRPC, Prisma, NextAuth.js, Tailwind CSS). Designed as a production-ready foundation for applications requiring robust authentication.

## 🚀 Features

- **Authentication**:
  - Google OAuth Login (with account linking)
  - Email/Password Registration
  - Email Verification (with Auto-Login)
  - Forgot & Reset Password flows
  - Protected Routes & Middleware
  - **Configurable Auth**: Enable/disable Google or Email providers via environment variables.
- **Email**: 
   - Welcome Emails upon verification
   - Custom branding with React Email
- **Type Safety**: End-to-end type safety with tRPC and Zod.
- **Database**: Prisma ORM with PostgreSQL.
- **UI/UX**: 
  - Built with [shadcn/ui](https://ui.shadcn.com/) components.
  - Responsive Dashboard.
  - Loading states and skeletons.
  - Toast notifications.
- **Email**: Custom email sender using Nodemailer.

## 🛠️ Tech Stack

- **Framework**: [Next.js 14](https://nextjs.org/) (App Router)
- **Language**: [TypeScript](https://www.typescriptlang.org/)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)
- **Components**: [shadcn/ui](https://ui.shadcn.com/) & [Lucide React](https://lucide.dev/)
- **Auth**: [NextAuth.js](https://next-auth.js.org/)
- **Database**: [Prisma](https://www.prisma.io/) & PostgreSQL
- **API**: [tRPC](https://trpc.io/)
- **Forms**: [React Hook Form](https://react-hook-form.com/) & [Zod](https://zod.dev/)

## 📦 Getting Started

### Prerequisites

- Node.js 18+
- PostgreSQL database
- Google Cloud Console credentials (for OAuth)
- SMTP Server credentials (for emails)

### Installation

1.  **Clone the repository**
    ```bash
    git clone <repository-url>
    cd t3-app-auth-starter
    ```

2.  **Install dependencies**
    ```bash
    npm install
    # If you encounter peer dependency issues:
    npm install --legacy-peer-deps
    ```

3.  **Configure Environment Variables**
    Copy the example env file:
    ```bash
    cp .env.example .env
    ```
    Update `.env` with your actual credentials:
    - `DATABASE_URL`: Connection string to your PostgreSQL database.
    - `NEXTAUTH_SECRET`: Generate one with `openssl rand -base64 32`.
    - `GOOGLE_CLIENT_ID` & `GOOGLE_CLIENT_SECRET`: From Google Cloud Console.
        - **Authorized JavaScript origins**: `http://localhost:3000`
        - **Authorized redirect URIs**: `http://localhost:3000/api/auth/callback/google`
    - `SMTP_*`: Your email server details.
    - `SENDER_NAME` (Optional): Custom name for email sender (e.g., "My App Team").
    - `ENABLE_GOOGLE_AUTH` (Optional): Set to "false" to disable Google Login/Register (default: "true").
    - `ENABLE_EMAIL_AUTH` (Optional): Set to "false" to disable Email Login/Register (default: "true").

4.  **Database Setup**
    Push the schema to your database:
    ```bash
    npx prisma db push
    ```
    (Optional) Seed the database with a test user:
    ```bash
    npm run db:seed
    ```

5.  **Run Development Server**
    ```bash
    npm run dev
    ```
    Open [http://localhost:3000](http://localhost:3000) with your browser.

## 📜 Scripts

- `npm run dev`: Starts the development server.
- `npm run build`: Builds the application for production.
- `npm run start`: Starts the production server.
- `npm run lint`: Runs ESLint.
- `npm run db:push`: Pushes the Prisma schema to the database.
- `npm run db:seed`: Seeds the database.
- `npm run db:studio`: Opens Prisma Studio to view/edit data.

## 🗄️ Database Management (Prisma Studio)

Anda bisa melihat dan mengelola data di database (User, Session, dll) menggunakan Prisma Studio.

**Cara membuka:**
```bash
npm run db:studio
```
Dashboard akan terbuka otomatis di browser pada alamat `http://localhost:5555`.

## 📂 Project Structure

```
src/
├── app/                  # Next.js App Router pages
│   ├── api/              # API routes (tRPC & Auth)
│   ├── auth/             # Auth pages (Signin, Signup, etc)
│   └── dashboard/        # Protected dashboard
├── components/           # React components
│   ├── auth/             # Auth forms
│   └── ui/               # shadcn/ui components
├── lib/                  # Utilities (auth config, email, utils)
├── server/               # Backend logic
│   ├── api/              # tRPC routers
│   └── db.ts             # Prisma client
└── styles/               # Global styles
```

## 🔒 Security

- Passwords are hashed using `bcrypt`.
- Protected routes enforce server-side session checks.
- CSRF protection enabled by default in NextAuth.
- Rate limiting on API routes is recommended for production.

## � Push ke Git

Berikut adalah langkah-langkah untuk mengupload project ini ke GitHub/GitLab:

1.  **Inisialisasi Git**
    ```bash
    git init
    ```

2.  **Tambah Remote Repository**
    Buat repository baru di GitHub/GitLab, lalu jalankan:
    ```bash
    git remote add origin https://github.com/agee89/T3-App-Auth-Starter.git
    ```

3.  **Stage & Commit**
    ```bash
    git add .
    git commit -m "Initial commit: T3 App Auth Starter"
    ```

4.  **Push ke Main Branch**
    ```bash
    git branch -M main
    git push -u origin main
    ```

## �📄 License

This project is open source and available under the [MIT License](LICENSE).
