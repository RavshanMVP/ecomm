import layout from "./layout.js";

export default ({products, searchName=""})=>{
    let renderedProducts = products
        .map(product => {
            return `
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
              <form action="products/${product.id}" method="POST">
                <button class="button has-icon is-inverted">
                  <i class="fa fa-shopping-cart"></i> Add to cart
                </button>
              </form>
            </footer>
          </div>
        </div>
      `;
        })
        .join('\n');

    if(!renderedProducts){
        renderedProducts = `<h2 class="title text-center"> No products found with ${searchName}.</h2>`
    }

    return layout({
        content: `
          <form method="POST" action="/search"> 
            <div class="field" align="center">
              <label class="label">Search for a clothing</label>
              <input class="input" placeholder="Search" name="search" style="width: 500px;">
            </div>
            </form>
            <form method="POST" action="/sort"> 
            <div class="field" align="center">
                <button class="button is-info" name = "sort" value="1">Sort by price</button>
                <button class="button is-info" name = "sort" value="2">Sort by title</button>
            </div>
            </form>
      <section class="banner">
        <div class="container">
          <div class="columns is-centered">
            <img src="/images/banner.jpg" />
          </div>
        </div>
      </section>
      
      <section>
        <div class="container">
          <div class="columns">
            <div class="column "></div>
            <div class="column is-four-fifths">
              <div>
                <h2 class="title text-center">Featured Items</h2>
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
