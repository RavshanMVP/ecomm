import layout from "./layout.js";

export default ({product})=>{
    let renderedProducts =
        `
      <div class="message title" style="position: absolute; top:100px; left: 400px;">${product.description}</div>
        <div class="column is-one-quarter">
          <div class="card product-card" >
            <figure >
              <img style="width: 200px; height: 270px;"  src="data:image/png;base64, ${product.image}"/>
            </figure>
            <div class="card-content">
              <h3 class="subtitle">${product.title}</h3>
              <h5>$${product.price}</h5>
            </div>
            <footer class="card-footer">
              <form action="/cart/products/${product.id}" method="POST">
                <button class="button has-icon is-inverted">
                  <i class="fa fa-shopping-cart"></i> Add to cart
                </button>
              </form>
            </footer>
          </div>
        </div>
  
      `;

    return layout({
        content: `      
      <section>
        <div class="container">
          <div class="columns">
            <div class="column "></div>
            <div class="column is-four-fifths">
              <div>
                <h2 class="title text-center">Info about ${product.title}</h2>
                <div class="columns products">
                  ${renderedProducts}  
                </div>
              </div>
            </div>
            <div class="column "></div>
          </div>
        </div>
      </section>
    `
    });
};
