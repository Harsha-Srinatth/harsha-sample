import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import Index from "./pages/Index.tsx";
import GalleryPage from "./pages/GalleryPage.tsx";
import QuizPage from "./pages/QuizPage.tsx";
import GamePage from "./pages/GamePage.tsx";
import CakePage from "./pages/CakePage.tsx";
import LetterPage from "./pages/LetterPage.tsx";
import NotFound from "./pages/NotFound.tsx";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/gallery" element={<GalleryPage />} />
          <Route path="/quiz" element={<QuizPage />} />
          <Route path="/game" element={<GamePage />} />
          <Route path="/cake" element={<CakePage />} />
          <Route path="/letter" element={<LetterPage />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
