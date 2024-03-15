import Header from "./components/Header.js";
import Home from "./components/Home.js";
import About from "./components/About.js";
import Projects from "./components/Projects.js";

class Router {
  root = document.querySelector("#root");

  renderInitialView = () => {
    const { hash } = window.location;
    window.onload = () => {
      const header = document.createElement("header");
      header.innerHTML = Header();
      this.root.appendChild(header);
      this.renderView(hash);
    };
    window.onhashchange = () => {
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
