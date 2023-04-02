import { BrowserRouter, Routes, Route } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "react-query";

import ChartPage from "./chart_page";
import SharePage from "./share_page";

const queryClient = new QueryClient();

function App() {
  //  comment tool active

  //  adding comment threads
  //  adding comments

  return (
    <QueryClientProvider client={queryClient}>
      <div>
        <BrowserRouter>
          <Routes>
            <Route path="/share/:shareId?" element={<SharePage />} />
            <Route path="/" element={<ChartPage />} />
          </Routes>
        </BrowserRouter>

        <header>Username, button for comments</header>
        <div>Charts</div>
        <p>Start your solution here. Good luck!</p>
      </div>
    </QueryClientProvider>
  );
}

export default App;
