# MONSOON REVOLUTION ARCHIVE

This project is a modern web application built with Next.js and React, featuring a timeline page with alternating left/right event cards and Payload CMS integration.

## Features

- Documenting the July Uprising in Bangladesh

## Getting Started

### 1. Install Dependencies

```bash
npm install
```

### 2. Set Up Environment Variables

Copy `.env.example` to `.env` and update values as needed:

```bash
cp .env.example .env
```

### 3. Run the Development Server

```bash
npm run dev
```

The app will be available at [http://localhost:3000](http://localhost:3000).

### 4. Build for Production

```bash
npm run build
npm start
```

## Useful Commands

- `npm run dev` — Start the development server
- `npm run build` — Build the app for production
- `npm start` — Start the production server
- `npm run lint` — Run ESLint
- `npm run format` — Format code with Prettier

## Project Structure

- `src/app/` — Main application code (pages, components, styles)
- `src/payload/` — Payload CMS configuration and seed data
- `media/` — Media assets (ignored by git)
- `.env` — Environment variables (ignored by git)

## Notes

- The `media/` and `node_modules/` directories are ignored by git.
- For Payload CMS setup and admin access, refer to the documentation in `src/payload/`.

## License

MIT
