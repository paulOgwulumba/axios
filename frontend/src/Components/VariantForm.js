function VariantForm(props){
  const size = `size${props.index + 1}`
  const color = `color${props.index + 1}`
  const quantity = `quantity${props.index + 1}`
  const price = `price${props.index + 1}`
  const image = `image${props.index + 1}`

  return(
    props.update ? 
    <div>
      <h6>Variant {props.index + 1}</h6>
      <div className="form-row">
        <div className="col">
          <input type="text" className="form-control" placeholder="Size" id={size} onChange={ props.handleChange } value={fetchVariant(size, props.data.productVarietiesID, props.data.productVarieties)}/>
        </div>
        <div className="col">
          <input type="text" className="form-control" placeholder="Color" id={color} onChange={ props.handleChange } value={fetchVariant(color, props.data.productVarietiesID, props.data.productVarieties)}/>
        </div>
      </div>
      <hr />
      <div className="form-row">
        <div className="col">
          <input type="text" className="form-control" placeholder="Quantity" id={quantity} onChange={ props.handleChange } value={fetchVariant(quantity, props.data.productVarietiesID, props.data.productVarieties)}/>
        </div>
        <div className="col">
          <input type="text" className="form-control" placeholder="Price" id={price} onChange={ props.handleChange } value={fetchVariant(price, props.data.productVarietiesID, props.data.productVarieties)}/>
        </div>
      </div>
      <hr />
      <div className="form-group">
        <label>Upload product Image</label> 
        <input type="file" id={image} onChange={ props.handleChange } accept="image/*" />
      </div>
      <hr />
      <hr />
    </div>
    :
    <div>
      <h6>Variant {props.index + 1}</h6>
      <div className="form-row">
        <div className="col">
          <input type="text" className="form-control" placeholder="Size" id={size} onChange={ props.handleChange } />
        </div>
        <div className="col">
          <input type="text" className="form-control" placeholder="Color" id={color} onChange={ props.handleChange } />
        </div>
      </div>
      <hr />
      <div className="form-row">
        <div className="col">
          <input type="text" className="form-control" placeholder="Quantity" id={quantity} onChange={ props.handleChange } />
        </div>
        <div className="col">
          <input type="text" className="form-control" placeholder="Price" id={price} onChange={ props.handleChange } />
        </div>
      </div>
      <hr />
      <div className="form-group">
        <label>Upload product Image</label> 
        <input type="file" id={image} onChange={ props.handleChange } accept="image/*"/>
      </div>
      <hr />
      <hr />
    </div>
  )  
}

function fetchVariant(variantID, productVarietiesID, productVarieties){
  let index = productVarietiesID.indexOf(variantID)
  return productVarieties[index]
}
export default VariantForm