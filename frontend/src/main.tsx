import 'bootstrap/dist/css/bootstrap.min.css';
import "./assets/css/all.min.css"
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.tsx';

// 1. Import Styletron
import { Provider as StyletronProvider } from "styletron-react";
import { Client as Styletron } from "styletron-engine-atomic";

// 2. Import Atomize
import { ThemeProvider, StyleReset } from "atomize";

// 3. Create a client instance of Styletron
const engine = new Styletron();

// 4. Define our OWN theme from scratch. We are NOT extending DefaultTheme.
const theme = {
  colors: {
    // Brand colors
    primary: 'tomato',
    accent: 'yellow',

    // Status colors (for login error)
    danger100: '#FEE2E2',
    danger500: '#EF4444',
    danger800: '#991B1B',

    // Grays (for sidebar)
    gray200: '#E5E7EB', // Sidebar background
    gray400: '#9CA3AF', // Logout button bg
    gray500: '#6B7282', // Logout button hover bg
    gray700: '#374151', // Category link text
    gray800: '#1F2937', // Sidebar link text
    gray900: '#11182C', // "Hi, user" text
    
    // Basic colors
    black: '#000000',
    white: '#FFFFFF',
  },
  rounded: {
    brandRadius: "20px",
    sm: "0.125rem",
    md: "0.25rem",
    lg: "0.5rem",
    circle: "50%",
  },
  // We can add more theme properties like spacing, fonts, etc. later
};

// We are NOT using StrictMode to allow Collapse/Dropdown animations to work.
createRoot(document.getElementById('root')!).render(
  <StyletronProvider value={engine}>
    <ThemeProvider theme={theme}>
      <StyleReset />
      <App />
    </ThemeProvider>
  </StyletronProvider>
);
