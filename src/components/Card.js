const Card = (param) => `
      <div class="col-lg-4 col-md-6 col-sm-12 card-div">
        <div class="card h-100">
          <img
            src="./assets/${param.name}.png"
            class="card-img-top"
            alt="${param.name} image"
          />
          <div class="card-body">
            <h5 class="card-title"><b>${param.title}</b></h5>
            <p class="card-text">${param["Short description"]}</p>
            <a href="#projects/#${param.name}" class="btn btn-primary">Details</a>
          </div>
        </div>
      </div>
    `;

export default Card;
