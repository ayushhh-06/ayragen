import { Injectable, Logger } from '@nestjs/common';
import { WebsiteManifest } from '@auragen/schema';

@Injectable()
export class CodeGeneratorService {
  private readonly logger = new Logger(CodeGeneratorService.name);

  /**
   * Compiles a WebsiteManifest into a production-ready Next.js project structure (as a virtual file system).
   */
  generateNextJsProject(manifest: WebsiteManifest): Record<string, string> {
    this.logger.log(`Compiling universe "${manifest.title}" to Next.js source code.`);

    const files: Record<string, string> = {};

    // 1. package.json
    files['package.json'] = JSON.stringify({
      name: manifest.id,
      version: '1.0.0',
      private: true,
      scripts: {
        dev: 'next dev',
        build: 'next build',
        start: 'next start',
        lint: 'next lint'
      },
      dependencies: {
        'next': 'latest',
        'react': 'latest',
        'react-dom': 'latest',
        'framer-motion': '^11.0.0',
        'lucide-react': 'latest',
        'clsx': 'latest',
        'tailwind-merge': 'latest'
      },
      devDependencies: {
        'autoprefixer': 'latest',
        'postcss': 'latest',
        'tailwindcss': 'latest',
        'typescript': 'latest',
        '@types/node': 'latest',
        '@types/react': 'latest',
        '@types/react-dom': 'latest'
      }
    }, null, 2);

    // 2. tailwind.config.js
    files['tailwind.config.ts'] = `
import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: '${manifest.theme.colors.primary}',
        background: '${manifest.theme.colors.background}',
        accent: '${manifest.theme.colors.accent}',
      },
      fontFamily: {
        heading: ['var(--font-heading)', 'serif'],
        body: ['var(--font-body)', 'sans-serif'],
      },
    },
  },
  plugins: [],
};
export default config;
    `;

    // 3. Global CSS
    files['src/app/globals.css'] = `
@tailwind base;
@tailwind components;
@tailwind utilities;

:root {
  --background: ${manifest.theme.colors.background};
  --foreground: ${manifest.theme.colors.text};
}

body {
  color: var(--foreground);
  background: var(--background);
  font-family: var(--font-body);
}

.text-glow {
  text-shadow: 0 0 20px ${manifest.theme.colors.primary}44;
}

.glass-panel {
  background: rgba(255, 255, 255, 0.03);
  backdrop-filter: blur(12px);
  border: 1px solid rgba(255, 255, 255, 0.08);
}
    `;

    // 4. Main Page Component
    files['src/app/page.tsx'] = this.compileMainPage(manifest);

    // 5. Section Components
    manifest.sections.forEach(section => {
      files[`src/components/sections/${section.type}.tsx`] = this.compileSection(section);
    });

    return files;
  }

  private compileMainPage(manifest: WebsiteManifest): string {
    return `
import React from 'react';
${manifest.sections.map(s => `import { ${this.pascalCase(s.type)} } from '@/components/sections/${s.type}';`).join('\n')}

export default function GeneratedUniverse() {
  return (
    <main className="min-h-screen relative overflow-hidden">
      {/* Background Grain & Atmosphere */}
      <div className="fixed inset-0 pointer-events-none z-[1000] bg-[url('/grain.png')] opacity-[0.03] mix-blend-overlay" />
      
      ${manifest.sections.map(s => `<${this.pascalCase(s.type)} content={${JSON.stringify(s.content)}} />`).join('\n      ')}
    </main>
  );
}
    `;
  }

  private compileSection(section: any): string {
    const type = this.pascalCase(section.type);
    return `
'use client';
import React from 'react';
import { motion } from 'framer-motion';

export const ${type} = ({ content }: { content: any }) => {
  return (
    <section className="relative py-24 px-6 overflow-hidden">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        className="max-w-7xl mx-auto"
      >
        <h2 className="text-4xl md:text-6xl font-black mb-6 tracking-tighter">
          {content.title}
        </h2>
        {content.copy && (
          <p className="text-lg opacity-60 max-w-2xl leading-relaxed">
            {content.copy}
          </p>
        )}
      </motion.div>
    </section>
  );
};
    `;
  }

  private pascalCase(str: string): string {
    return str.split('-').map(part => part.charAt(0).toUpperCase() + part.slice(1)).join('');
  }
}
