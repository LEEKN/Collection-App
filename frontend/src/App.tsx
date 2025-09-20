import { BrowserRouter, Route, Routes } from "react-router-dom";
import Header from "./components/Header.tsx";
import Footer from "./components/Footer.tsx";
import Home from "./pages/Home/Home.tsx";
import About from "./pages/About/About.tsx";
import Login from "./pages/User/Login.tsx";
import Register from "./pages/User/Register.tsx";
import Result from "./pages/Result/Result.tsx";
import Privacypolicy from "./pages/Privacypolicy/Privacypolicy.tsx";
import Favorite from "./pages/Favorite/Favorite.tsx";
import "./App.css";
import SinglePage from "./pages/SinglePage/SinglePage.tsx";
import PageContent from "./pages/SinglePage/PageContent.tsx";
import Admin from "./pages/Admin/Admin.tsx";
import { Div } from "atomize"; // Import Div

// import TodoPage from "./pages/Todo/TodoPage.tsx"; // 暫時註解掉 Todo 頁面

function App() {
  // Define a consistent width for the sidebar
  const sidebarWidth = "240px";

  return (
    <div className="app-container">
      <BrowserRouter>
        {/* The Header is a fixed sidebar with zIndex=10 */}
        <Header />

        {/* Main content area, configured as a flex container to create a sticky footer */}
        <Div
          d="flex"
          flexDir="column"
          minH="100vh"
          m={{ l: sidebarWidth }}
          pos="relative"
          zIndex="1"
        >
          {/* This wrapper div will grow to push the footer down */}
          <Div flexGrow="1">
            <main>
              <Routes>
                <Route path="/" element={<Home />}></Route>
                <Route path="/about" element={<About />}></Route>
                <Route path="/result" element={<Result />}></Route>
                <Route path="/admin" element={<Admin />}></Route>
                <Route path="/login" element={<Login />}></Route>
                <Route path="/register" element={<Register />}></Route>
                <Route path="/privacypolicy" element={<Privacypolicy />}></Route>
                <Route path="/favorite" element={<Favorite />}></Route>
                <Route path="/books/:id" element={<SinglePage />} />
                <Route
                  path="/chapter/:id/:chapter_number"
                  element={<PageContent />}
                />
                {/* 暫時註解掉 Todo List 的路由 */}
                {/* <Route path="/todo" element={<TodoPage />} /> */}
              </Routes>
            </main>
          </Div>

          {/* Footer will be pushed to the bottom */}
          <Footer />
        </Div>
      </BrowserRouter>
    </div>
  );
}

export default App;
