const unpack = (data) => {
  if (data) {
    return data.map((product) => {
      try{
        product.product_varieties = JSON.parse(product.product_varieties);
      } catch (e) {
        console.log(product.product_varieties)
      }
      return product;
    })
  } else {
    return []
  }
}

export default unpack