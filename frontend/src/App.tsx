import { BrowserRouter, Routes, Route } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "react-query";

import ChartPage from "./pages/chart_page";
import SharePage from "./pages/share_page";

import styles from "./app.module.css";

const queryClient = new QueryClient();

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <div className={styles.app}>
        <div className={styles.sidebar} />
        <div className={styles.content}>
          <BrowserRouter>
            <Routes>
              <Route path="/share/:shareId?" element={<SharePage />} />
              <Route path="/" element={<ChartPage />} />
            </Routes>
          </BrowserRouter>
        </div>
      </div>
    </QueryClientProvider>
  );
}
