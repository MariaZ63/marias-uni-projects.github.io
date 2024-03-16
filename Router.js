import Header from "./components/Header.js";
import Footer from "./components/Footer.js";
import Home from "./components/Home.js";
import About from "./components/About.js";
import Projects from "./components/Projects.js";

class Router {
  root = document.querySelector("#root");

  renderInitialView = () => {
    const header = document.createElement("header");
    header.innerHTML = Header();
    this.root.appendChild(header);

    let content = document.getElementById("content");
    if (!content) {
      content = document.createElement("div");
      content.setAttribute("id", "content");
      this.root.appendChild(content);
    }

    window.onload = () => {
      const { hash } = window.location;
      this.renderView(hash);
    };

    window.onhashchange = () => {
      const { hash } = window.location;
      this.renderView(hash);
    };

    // Append the footer using the Footer component
    const footer = document.createElement("footer");
    footer.innerHTML = Footer();
    this.root.appendChild(footer);
  };

  renderView = (hash) => {
    const content = document.getElementById("content");
    content.innerHTML = "";

    const navItem = document.querySelector(".active");
    if (navItem) {
      navItem.classList.remove("active");
    }
    let currentNavItem;

    if (hash === "") {
      content.innerHTML = Home();
      currentNavItem = document.querySelector("#homeNav");
    } else if (hash.startsWith("#projects")) {
      const hashParts = hash.split("#").filter((part) => part !== ""); // Remove empty parts
      const projectId = hashParts[1]; // Extract project id
      const targetParagraphId = hashParts[2]; // Extract paragraph id if available

      // Render projects page
      content.innerHTML = Projects();

      // If a specific paragraph is provided, scroll to it
      if (targetParagraphId) {
        const targetParagraph = document.getElementById(targetParagraphId);
        if (targetParagraph) {
          targetParagraph.scrollIntoView({ behavior: "smooth" });
        }
      }

      currentNavItem = document.querySelector("#projectsNav");
    } else if (hash === "#about") {
      content.innerHTML = About();
      currentNavItem = document.querySelector("#aboutNav");
    }

    currentNavItem.classList.add("active");
  };
  /* renderView = (hash) => {
    const content = document.getElementById("content");
    content.innerHTML = "";

    const navItem = document.querySelector(".active");
    if (navItem) {
      navItem.classList.remove("active");
    }
    let currentNavItem;

    if (hash === "") {
      content.innerHTML = Home();
      currentNavItem = document.querySelector("#homeNav");
    }
    if (hash === "#projects") {
      content.innerHTML = Projects();
      currentNavItem = document.querySelector("#projectsNav");
    }
    if (hash === "#about") {
      content.innerHTML = About();
      currentNavItem = document.querySelector("#aboutNav");
    }
    currentNavItem.classList.add("active");
  }; */
}

export default Router;
