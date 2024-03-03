# Bellhop

Bellhop is a managed hosting platform for WordPress websites. 

## Getting Started

Create a `.env.local` file in the root of the project. Add the following variables (replace with your own values): 

```bash
NEXT_PUBLIC_SUPABASE_URL="your supabase url"
NEXT_PUBLIC_SUPABASE_ANON_KEY="your supabase anon key"
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY="your clerk publishable key"
NEXT_PUBLIC_CLERK_SIGN_IN_URL=/sign-in
NEXT_PUBLIC_CLERK_SIGN_UP_URL=/sign-up
NEXT_PUBLIC_CLERK_AFTER_SIGN_IN_URL=/dashboard
NEXT_PUBLIC_CLERK_AFTER_SIGN_UP_URL=/dashboard
CLERK_SECRET_KEY="your clerk secret key"
CLERK_WEBHOOK_SECRET="your clerk webhook secret"
UPLOADTHING_APP_ID="your uploadthing app ID"
UPLOADTHING_SECRET="your uploadthing secret"
SENDGRID_API_HOST="your Sendgrid API host"
SENDGRID_API_KEY="your Sendgrid API key"
ZENDESK_API_HOST="your Zendesk API host"
ZENDESK_API_USERNAME="your Zendesk API username"
ZENDESK_API_PASSWORD="your Zendesk API password"
```

Seed the database:
```bash
npx prisma db seed
```

Run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) and log in with one of the seeded user accounts.


## Technologies Used
- [Next.js](https://nextjs.org/) - Application framework ([Documentation](https://nextjs.org/docs))
- [Clerk](https://clerk.com/) - Authentication and user management ([Documentation](https://clerk.com/docs))
- [Supabase](https://supabase.com/) - Postgres database ([Documentation](https://supabase.com/docs))
- [Prisma](https://www.prisma.io/) - Node.js and Typescript ORM ([Documentation](https://www.prisma.io/docs))
- [ShadcnUI](https://ui.shadcn.com/) - UI component library ([Documentation](https://ui.shadcn.com/docs))
- [TailwindCSS](https://tailwindcss.com/) - Composable CSS framework ([Documentation](https://tailwindcss.com/docs/installation))
- [Zendesk API](https://www.zendesk.com/) - Support ticket management ([API Reference](https://developer.zendesk.com/api-reference))
- [Sendgrid API](https://sendgrid.com/) - Transactional email API ([API Reference](https://docs.sendgrid.com/api-reference/how-to-use-the-sendgrid-v3-api/authentication))


