import Header from "./components/Header";
import Home from "./components/Home";
import About from "./components/About";
import Projects from "./components/Projects";

class Router {
  root = document.querySelector("#root");

  renderInitialView = () => {
    window.onload = () => {
      const header = document.createElement("header");
      header.innerHTML = Header();
      this.root.appendChild(header);
      this.renderView("");
    };
    window.onhashchange = () => {
      const { hash } = window.location;
      this.renderView(hash);
    };
  };

  renderView = (hash) => {
    let content = document.getElementById("content");
    if (!content) {
      content = document.createElement("div");
      content.setAttribute("id", "content");
      this.root.appendChild(content);
    }
    content.innerHTML = "";
    if (hash === "") {
      content.innerHTML = Home();
    }
    if (hash === "#projects") {
      content.innerHTML = Projects();
    }
    if (hash === "#about") {
      content.innerHTML = About();
    }
  };
}

export default Router;
