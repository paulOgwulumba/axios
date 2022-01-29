import ProductCard from "./ProductCard";
import '../CSS/Carousel.css'
import '../CSS/Product.css'
import '../CSS/bootstrap.min.css'


function Products (props){
  if(props.loading){
    return(
      <h3>Loading....</h3>
    )
  } else {
    return(
      <div>
        <h2>{props.seller? "Uploaded": "Available"} Products</h2>
        <h5>Use horizontal scroll-bar under product to see its variants</h5>

        <div className = "product-wrapper">
          {
            Array.from({length: props.products.length})
            .map((_, index) => (
              <ProductCard product={props.products[index]} key={index+1} index={index} onClick = {props.onClick} seller = {props.seller}/>
            ))
          }
        </div>
      </div>
  )
  }
  
}

export default Products