import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { Toaster } from "@/components/ui/toaster"
import App from './App'
import './index.css'
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const rootElement = document.getElementById('root');
if (rootElement) {
  createRoot(rootElement).render(
    <StrictMode>
      <App />
      <Toaster />
    </StrictMode>
  )
}