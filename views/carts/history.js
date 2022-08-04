import layout from "../products/layout.js";
export default (carts)=>{
    let renderedItems;
    if (!carts){
        renderedItems="";
    }
    else {
        renderedItems = carts
            .map(cart => {
                return `<div>${cart.date}</div>` + cart.items.map(item => {
                    return `
                        <div class="cart-item message">
                          <h3 class="title">${item.product.title}</h3>
                          <div class="cart-right">
                            <div class="title">
                                ${item.product.price} x ${item.quantity} = ${item.product.price * item.quantity}
                            </div>
                          </div>
                        </div>
                      `;
                }).join("")
                    ;
            }).join("")
    }
    return layout({
        content: `
      <div id="cart" class="container">
        <div class="columns">
          <div class="column"></div>
          <div class="column is-four-fifths">
            <h3 class="subtitle"><b>Your History </b></h3>
            <form method="post" action="/history/clear">
            <button class="button">Clear history</button>
            </form>
              ${ renderedItems}
          </div>
          <div class="column"></div>
        </div>
      </div>
    `
    });
};
