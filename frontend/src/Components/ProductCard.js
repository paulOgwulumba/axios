function ProductCard(props){
  return(
    <div className = "slider">
      <div className = "slides">
        {
          Array.from({length: props.product.product_varieties.length})
            .map((_, index) => (
              <div className="product-card" key={index}>
                <div className="badge">Hot</div>
                <div className="product-tumb">
                  <img src = {props.product.product_varieties[index]["images"][0]} alt=""/>
                </div>
                <div className="product-details">
                  <h4>
                    <a href="#">{props.product.product_name}</a>
                  </h4>
                  <span className="product-catagory">Size: {props.product.product_varieties[index]["size"]},   Color: {props.product.product_varieties[index]["color"]},   Quantity: {props.product.product_varieties[index]["quantity"]},</span>
                  <p>{props.product.product_description}</p>
                  <div className="product-bottom-details">
                    <div className="product-price">Price:  {props.product.product_varieties[index]["price"]}</div>
                    <div className="product-links">
                      <a href=""><i className="fa fa-heart"></i></a>
                      <a href=""><i className="fa fa-shopping-cart"></i></a>
                    </div>
                  </div>
                </div>
              </div>
            )
          )     
        }
        
      </div>
      { 
        props.seller ? 
          <button 
            className='btn btn-sm btn-primary' 
            onClick = {props.onClick}
            style={{marginTop: '10px'}} 
            index={props.index}>
              Edit Product
          </button> : null
      }
    </div>
  )
}

export default ProductCard