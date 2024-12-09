import type { Config } from 'tailwindcss';

export default {
  content: [
    './src/app/**/*.{js,ts,jsx,tsx,mdx}', // Scans all files in `app`
    './src/components/**/*.{js,ts,jsx,tsx,mdx}', // Scans all files in `components`
  ],
  theme: {
    extend: {
      colors: {
        background: 'var(--background)', // Background color using CSS variable
        foreground: 'var(--foreground)', // Foreground color using CSS variable
        primary: '#2563eb', // Example custom primary color (blue-600)
        secondary: '#10b981', // Example custom secondary color (green-500)
      },
      spacing: {
        128: '32rem', // Adds larger spacing values (useful for layout adjustments)
        144: '36rem',
      },
      maxWidth: {
        '2xl': '42rem', // For content containers
        '4xl': '56rem',
      },
    },
  },
  plugins: [
    require('@tailwindcss/typography'), // Optional: Adds better typography utilities
    require('@tailwindcss/forms'), // Optional: Adds better form input styling
  ],
} satisfies Config;
