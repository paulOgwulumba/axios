function isReadyForSubmit(state){
  let passedTests = 0
  if(state.productName !== ""){
    passedTests += 1
  }
  if(state.productDescription !== ""){
    passedTests += 1
  }
  if(state.productVarieties.length === ( 5 * state.numberOfVarieties)){
    passedTests += 1
  }
  console.log(`Passed tests: ${passedTests}`)
  if(passedTests === 3){
    return true
  } else{
    return false
  }
}

export default isReadyForSubmit