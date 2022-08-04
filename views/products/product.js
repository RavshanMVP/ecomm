import layout from "./layout.js";

export default ({product, message=""})=>{
    const description = product.description ? product.description : "No description yet"
    const rating = product.rating ? parseFloat(product.rating).toFixed(1) : "No rating yet"
    let renderedProducts =
        `
      <div class="message title product-card" style="position: absolute; top:70px; left: 400px; font-size: 20px;">
        <div class="title">Description</div>
        ${description}</div>
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
        <form method="post" action="/products/${product.id}/rate">
    <h2 class="title text-center rating" >
            <div class="title message is-danger">${message}</div>
           Current Rating  -  ${rating}<h2 class="title rating-2">
    Rate:
    <button class="button" style="border: none; font-size: 30px;" name = "rate" value="1">               
          <span>
                <i class="fa fa-star" ></i>
          </span>
    </button>

    <button class="button" style="border: none; font-size: 30px;" name = "rate" value="2">               
          <span>
                <i class="fa fa-star"></i>
          </span>
    </button>
    
    <button class="button" style="border: none; font-size: 30px;" name = "rate" value="3">               
          <span>
                <i class="fa fa-star"></i>
          </span>
    </button>
 
     <button class="button" style="border: none; font-size: 30px;" name = "rate" value="4">               
          <span>
                <i class="fa fa-star"></i>
          </span>
    </button>
    
    <button class="button" style="border: none; font-size: 30px;" name = "rate" value="5">               
          <span>
                <i class="fa fa-star"></i>
          </span>
    </button>

                </h2>
    </h2>
    </form>
      <form action="/products/${product.id}/comment" method="post">
      <input class="input comment" placeholder="Comment" name="comment"
      style="width: 600px; height: 100px; position: absolute; top:520px;">
    </form>
      </section>   

    `
    });
};
