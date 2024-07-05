import React from 'react';
import { ThemeProvider } from "@/components/ui/theme-provider";
import DemoPage from "./Products/page";
import '../app/globals.css'

function App() {
  return (
    <div className=''>
      <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
         <DemoPage /> 
      </ThemeProvider>
    </div>

  );
}

export default App;
