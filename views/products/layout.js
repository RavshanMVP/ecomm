export default ({ content, signin }) => {
    let sign;
    if(signin){
        sign = `            
             <form action="/signin" method="post" style="display: inline">
            <button class="button is-primary">
                    <h1 class="title" style="color: black">Sign in</h1>
            </button>
            </form>`;
    }
    else {
        sign = `<form action="/signout" method="post" style="display: inline">
                <button class="button is-danger">
                    <h1 class="title" style="color: black">Sign out</h1>
                </button>
            </form>`;
    }
    return `
    <!DOCTYPE html>
      <html lang="en">
      <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Shop</title>
        
        <link href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.11.2/css/all.min.css" rel="stylesheet">
        <link href="/css/main.css" rel="stylesheet">
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/bulma/0.7.5/css/bulma.min.css"></link>
      </head>

      <body>
        <header>
          <nav class="navbar navbar-top">
            <div class="container navbar-container">
              <div>
                <ul class="social">
                  <li>
                    <a href="/"><i class="fa fa-phone"></i>+1 555 987 6543</a>
                  </li>
                  <li>
                    <a href="/"><i class="fa fa-envelope"></i> shop@myshop.com</a>
                  </li>
                </ul>
              </div>
              <div>
             ${sign}
            <form action="/history" method="post"  style="display: inline">
            <button class="button is-link" >
                    <h1 class="title" style="color: black">History</h1>
            </button>
            </form>
              </div>
            </div>
          </nav>
          <nav class="navbar navbar-bottom">
            <div class="container navbar-container">
              <div>
                <a href="/">
                  <h3 class="title">EComm Shop</h3>
                </a>
              </div>
              <div class="navbar-item">
                <div class="navbar-buttons">
                  <div class="navbar-item">
                    <a href="/"><i class="fa fa-star"></i> Products</a>
                  </div>
                  <div class="navbar-item">
                    <a href="/cart"><i class="fa fa-shopping-cart"></i> Cart</a>
                  </div>
                </div>
              </div>
            </div>
          </nav>
        </header>

        ${content}
      </body>
    </html>
  `;
};
