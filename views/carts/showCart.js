import layout from "../products/layout.js";

export default ({items, signin = true})=>{
    const total = items.reduce((prev, curr)=>{
        return prev + curr.product.price *curr.quantity;
    }, 0)

    let renderedDiscount;
    if (total>=200){
        renderedDiscount = `<strike><h1 >$${total}</h1></strike><h1 class="title">$${(0.8*total).toFixed(2)}</h1>`
    }
    else if (total>=100){
        renderedDiscount = `<strike><h1 >$${total}</h1></strike><h1 class="title">$${(0.9*total).toFixed(2)}</h1>`
    }
    else{
        renderedDiscount = `<h1 class="title">$${total}</h1>`
    }
    const renderedItems = items
        .map(item => {
            return `
        <div class="cart-item message">
          <h3 class="subtitle">${item.product.title}</h3>
          <div class="cart-right">
            <div>
              $${item.product.price}  X  ${item.quantity} = 
            </div>
            <div class="price is-size-4">
              $${item.product.price * item.quantity}
            </div>
            <div class="remove">
              <form method="POST" style="display:inline;" action="/cart/${item.product.id}/inc">
                <button class="button is-warning">                
                  <span class="icon is-small">
                    <i class="fa fa-plus"></i>
                  </span>
                  </button>
                  </form>
              <form method="POST" style="display:inline;" action="/cart/${item.product.id}/dec">
                <button class="button is-warning">               
                  <span class="icon is-small">
                    <i class="fa fa-minus"></i>
                  </span>
                </button>
                </form>
               <form method="POST" style="display:inline;" action="/cart/${item.product.id}">
                <button class="button is-danger">                   
                  <span class="icon is-small">
                    <i class="fas fa-times"></i>
                  </span>
                </button>
              </form>
            </div>
          </div>
        </div>
      `;
        })
        .join('');

    return layout({
        content: `
      <div id="cart" class="container">
        <div class="columns">
          <div class="column"></div>
          <div class="column is-four-fifths">
            <h3 class="subtitle"><b>Shopping Cart</b></h3>
            <div>
              ${renderedItems}
            </div>
            <div class="total message is-info">
              <div class="message-header">
                Total
              </div>
              ${renderedDiscount}
              <form method="POST" action="/buy">
              <button class="button is-primary">Buy</button>
              </form>
            </div>
          </div>
          <div class="column"></div>
        </div>
      </div>
    `,
        signin
    });
};
