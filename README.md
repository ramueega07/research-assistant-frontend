<# Smart Research Assistant - Frontend

A modern, responsive React frontend for the Smart Research Assistant, built with Next.js. This interface provides an intuitive chat-based experience for uploading research documents and querying them using AI-powered analysis.

## Features

- **Document Upload**: Drag-and-drop PDF upload with validation (max 5 files, 10 pages each)
- **Real-time Chat Interface**: Interactive conversation with the research assistant
- **PDF Viewer Integration**: Built-in PDF viewer with text highlighting and search
- **Source Citation**: Clickable source buttons showing document pages and web links
- **Responsive Design**: Mobile-friendly interface with modern UI components
- **Markdown Support**: Rich text rendering for AI responses
- **Auto-scroll**: Automatic scrolling to latest messages
- **Loading States**: Visual feedback during processing

## Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **PDF Viewer**: @react-pdf-viewer/core with search plugin
- **HTTP Client**: Axios
- **Markdown Rendering**: react-markdown

## Setup Instructions

### Prerequisites

- Node.js 18+
- npm, yarn, or pnpm
- Backend server running (see backend README)

### Installation

1. **Navigate to frontend directory:**
   ```bash
   cd frontend
   ```

2. **Install dependencies:**
   ```bash
   npm install
   # or
   yarn install
   # or
   pnpm install
   ```

3. **Set up environment variables:**

   Create a `.env.local` file in the frontend directory:

   ```env
   NEXT_PUBLIC_BACKEND_URL=http://0.0.0.0:8000
   ```

   For production deployment, set this to your backend URL.

## Running the Application

1. **Start the development server:**
   ```bash
   npm run dev
   # or
   yarn dev
   # or
   pnpm dev
   ```

2. **Open your browser:** Visit `http://localhost:3000`

3. **Build for production:**
   ```bash
   npm run build
   npm start
   ```

## Project Structure

```
frontend/
├── src/
│   └── app/
│       ├── fonts/          # Custom fonts (Geist)
│       ├── globals.css     # Global styles
│       ├── layout.tsx      # Root layout component
│       └── page.tsx        # Main chat interface
├── package.json            # Dependencies and scripts
├── tailwind.config.ts      # Tailwind configuration
├── next.config.mjs         # Next.js configuration
└── README.md
```

## Key Components

### Main Chat Interface (`page.tsx`)

- **File Upload**: Handles PDF selection and upload to backend
- **Chat Display**: Shows conversation history with user/assistant messages
- **Message Rendering**: Markdown support with source citations
- **PDF Modal**: Integrated PDF viewer with highlighting
- **Input Handling**: Question submission with keyboard shortcuts

### Features Breakdown

- **Upload Validation**: Client-side checks for file type and count
- **Real-time Updates**: Immediate UI feedback for uploads and queries
- **Source Navigation**: Direct links to PDF pages or web sources
- **Error Handling**: Graceful error display for failed requests
- **Responsive Layout**: Sidebar for uploads, main area for chat

## API Integration

The frontend communicates with the backend via REST API:

- **POST `/upload/`**: Upload PDF files
- **POST `/query/`**: Send questions and receive answers
- **GET `/view-pdf/{filename}`**: Serve PDF files for viewing

## Styling

- **Tailwind CSS**: Utility-first CSS framework
- **Custom Fonts**: Geist Sans and Mono fonts
- **Color Scheme**: Blue-based professional theme
- **Animations**: Smooth transitions and loading indicators

## Configuration

### Next.js Config (`next.config.mjs`)

```javascript
/** @type {import('next').NextConfig} */
const nextConfig = {
  // Configuration options
};

export default nextConfig;
```

### Tailwind Config (`tailwind.config.ts`)

```typescript
import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      // Custom theme extensions
    },
  },
  plugins: [],
};

export default config;
```

## Deployment

### Vercel Deployment

1. **Connect Repository**: Link your GitHub repo to Vercel
2. **Set Environment Variables**: Configure `NEXT_PUBLIC_BACKEND_URL`
3. **Deploy**: Automatic deployments on push

### Manual Deployment

1. **Build the application:**
   ```bash
   npm run build
   ```

2. **Start production server:**
   ```bash
   npm start
   ```

## Development

- **TypeScript**: Full type safety
- **ESLint**: Code linting and formatting
- **Hot Reload**: Automatic page refreshes during development
- **Component Architecture**: Modular, reusable components

## Browser Support

- Modern browsers (Chrome, Firefox, Safari, Edge)
- Mobile browsers (iOS Safari, Chrome Mobile)
- PDF viewing requires modern browser with PDF.js support

## Contributing

1. Follow the existing code style
2. Add TypeScript types for new features
3. Test UI changes across different screen sizes
4. Ensure accessibility compliance

## License

See LICENSE file for details.

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
=======
# research-assistant-frontend
>>>>>>> 31bd46cfdfbdfb6275e2fd0cbc13105ede269769
=======
# research-assistant-frontend
>>>>>>> 31bd46cfdfbdfb6275e2fd0cbc13105ede269769
