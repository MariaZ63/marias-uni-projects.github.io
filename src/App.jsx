import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";
import Header from "./components/Header";
import Home from "./components/Home";
import Footer from "./components/Footer";
import NotFound from "./components/NotFound";
import About from "./components/About";
import Projects from "./components/Projects";

function App() {
  return (
    <>
      <Router>
        <div className="container">
          <Header />
          <Routes>
            <Route path="/">
              <Route index element={<Home/>} />
              <Route path="marias-uni-projects.github.io" element={<Navigate to="/" replace={true} />} />
              <Route path="projects" element={<Projects/>} />
              <Route path="about" element={<About/>} />
            </Route>
            <Route path="*" element={<NotFound />} />
          </Routes>
          <Footer />
        </div>
      </Router>
    </>
  );
}

export default App;
