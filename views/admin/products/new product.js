import layout from "../auth/layout.js";
import helper from "../../helper.js";

export default  ({errors})=>{
    return layout({
        content: `
      <div class="columns is-centered">
        <div class="column is-half">
          <h1 class="subtitle">Create a Product</h1>

          <form method="POST" enctype="multipart/form-data" style="display:inline;">
            <div class="field">
              <label class="label">Title</label>
              <input class="input" placeholder="Title" name="title">
              <p class="help is-danger">${helper.getError(errors, 'title')}</p>
            </div>
            
            <div class="field">
              <label class="label">Price</label>
              <input class="input" placeholder="Price" name="price">
              <p class="help is-danger">${helper.getError(errors, 'price')}</p>
            </div>
            
            <div class="field">
              <label class="label">Description</label>
              <textarea class="input" placeholder="Description" name="description"></textarea> 
            </div>
            
            <div class="field">
              <label class="label">Image</label>            
              <input type="file" name="image" />
            </div>
            <br />
            <button class="button is-primary" name="button_id" value="1">Create</button>
            <form method="post" enctype="multipart/form-data" 
             style="display:inline;">
                <button class="button is-info" name="button_id" value="2">Create and add another</button>
            </form>
          </form>

        </div>
      </div>
    `
    })
}