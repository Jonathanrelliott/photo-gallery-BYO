# photo-gallery-BYO

A photo gallery where you bring your own API keys. Photographers and artists connect the cloud storage they already own (S3, R2, B2, GCS, Azure and more), and EditGenlx turns it into client galleries.

Brand: **EditGenlx**. Theme: *Neon Botanicals: Urban Flora & Digital Moss*.

## Status

Step 1 of the plan: the UI, with mocked data.

| Route | What it is |
| --- | --- |
| `/` | Marketing homepage |
| `/login` | Log in / sign up (mocked, goes to the dashboard) |
| `/dashboard` | Gallery overview, filters, search, new gallery |
| `/dashboard/galleries/[id]` | Gallery manager: upload, select, publish, settings |
| `/dashboard/storage` | Connect a storage provider |
| `/dashboard/domains` | Custom domain setup (marked Pro) |
| `/dashboard/settings` | Profile and plan |
| `/g/[slug]` | Public gallery your clients see |

## Roadmap

1. ~~Next.js app and UI~~
2. Accounts with Supabase (auth, profiles, galleries, a `plan` field for free/pro)
3. Bring-your-own storage adapters (one S3-compatible adapter plus GCS and Azure), encrypted keys, direct browser uploads
4. Public galleries on custom domains via the Vercel domains API

## Development

```bash
npm install
npm run dev
```

Placeholder photos in `public/demo` are generated with `node scripts/generate-demo-photos.mjs`.

Provider definitions live in `src/lib/providers.ts`; mock data lives in `src/lib/mock-data.ts`.

## Supabase MCP

`.mcp.json` registers the Supabase MCP server for Claude Code. To authenticate, run `claude /mcp` in a regular terminal, pick `supabase` and choose Authenticate.
