module.exports = function parseVarieties(varietiesArray){
  let varieties = []
  let varietiesID = []
  for(let i = 0; i < varietiesArray.length; i++){
    let keys = Object.keys(varietiesArray[i])
    for(let key of keys){
      varietiesID.push( key + (i + 1))
      varieties.push(varietiesArray[i][key])
    }
  }
  return { varieties: varieties, varietiesID: varietiesID }
}