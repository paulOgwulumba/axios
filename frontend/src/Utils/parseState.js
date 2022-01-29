function parseState(state){
  let object = {
    productName: "",
    productDescription: "",
    productVarieties: [],
    dateUploaded: "",
    dateEdited: ""
  }
  object.productName = state.productName
  object.productDescription = state.productDescription
  let date = new Date()
  let dateString = date.getDate() + "/" + date.getMonth() + 1 + "/" + date.getFullYear()
  object.dateEdited = dateString
  if(state.dateUploaded === ""){
    object.dateUploaded = dateString
  } else {
    object.dateUploaded = state.dateUploaded
  }
  
  
  for(let i = 0; i < state.numberOfVarieties; i++){
    object.productVarieties.push({
      size: "",
      color: "",
      quantity: "",
      images: [],
      price: ""
    })
  }
  for(let i = 0; i < state.productVarieties.length; i++){
    let variantIndex = parseInt(state.productVarietiesID[i].slice(-1)) - 1
    let variantName = state.productVarietiesID[i].slice(0, -1)
    if(variantName === 'image'){
      object.productVarieties[variantIndex].images.push(state.productVarieties[i])
    } else{
      object.productVarieties[variantIndex][variantName] = state.productVarieties[i]
    }
  }
  return object
}

export default parseState