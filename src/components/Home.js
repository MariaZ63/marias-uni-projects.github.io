import descriptions from "../descriptions.js";
import Card from "./Card.js";

const Home = () => `
      <div class="row">
        <div class="col-12 text-left">
          <p>
            I am a student at university of Bamberg, doing a master&apos;s
            program in
            <a href="https://www.uni-bamberg.de/ma-cith/">
              Computing in the Humanities
            </a>
            . It focuses on applied computer science.
          </p>
          <p>
            I particularly enjoy web development and data visualization. Below,
            you can see a selection of works I did during the last semesters.
          </p>
          <p>
              You want to take a look at the source code? You can do so in my
              <a href="https://github.com/MariaZ63/marias-uni-projects.github.io">
                GitHub repository
              </a>
              .
            </p>
        </div>
        <div class="row">
          ${descriptions.map((elem) => Card(elem)).join("")}
        </div>
    `;

export default Home;
