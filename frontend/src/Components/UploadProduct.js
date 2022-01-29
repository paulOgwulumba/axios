import React from 'react'
import '../CSS/bootstrap.min.css'
import convertToBase64 from '../Utils/convertToBase64'
import isReadyForSubmit from '../Utils/isReadyForSubmit'
import parseState from '../Utils/parseState'
import VariantForm from './VariantForm'
import parseVarieties from '../Utils/parseVarieties'
import API_BASE_URL from '../Utils/apiUrl'

class UploadProduct extends React.Component {
  constructor(props){
    super(props)

    props.update ? 
    this.state = {
      numberOfVarieties: props.data.product_varieties.length,
      productName: props.data.product_name,
      productDescription: props.data.product_description,
      dateUploaded: props.data.date_uploaded,
      dateEdited: props.data.date_edited,
      productVarietiesID: parseVarieties(props.data.product_varieties).varietiesID,
      productVarieties: parseVarieties(props.data.product_varieties).varieties,
      displayNotReadyForSubmit: false,
      uploadSuccessful: false
    } :
    this.state = {
      numberOfVarieties: 1,
      productName: "",
      productDescription: "",
      dateUploaded: "",
      dateEdited: "",
      productVarietiesID: [],
      productVarieties: [],
      displayNotReadyForSubmit: false,
      uploadSuccessful: false
    }
    this.handleVarietiesChange = this.handleVarietiesChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleChange = this.handleChange.bind(this)
    // console.log(this.state)
  }

  handleVarietiesChange(event){
    let numberOfVarieties = event.target.value
    let productVarietiesID = this.state.productVarietiesID
    let idCache = productVarietiesID.slice()
    let productVarieties = this.state.productVarieties

    for(let spec of idCache){
      let variantIndex = parseInt(spec.slice(-1))
      // console.log(spec + " " + variantIndex)
      if(variantIndex > numberOfVarieties){
        productVarietiesID.splice(productVarietiesID.indexOf(spec), 1)
        productVarieties.splice(productVarietiesID.indexOf(spec), 1)
      }
    }
    this.setState({
      numberOfVarieties: event.target.value,
      productVarietiesID: productVarietiesID,
      productVarieties: productVarieties
    })
  }

  handleSubmit(event){
    event.preventDefault()
    if(isReadyForSubmit(this.state)){
      this.setState({
        displayNotReadyForSubmit: false
      })
      
      let data = parseState(this.state)
      if(this.props.update) data.productKey = this.props.data.product_key
      console.log(data)

      let url = `${API_BASE_URL}/product`
      let options = {
        method: this.props.update? 'PUT' : 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data)
      }

      fetch(url, options)
        .then(response => response.json())
        .then(data => { 
          console.log(data)
          if(data.status === "success"){
            this.setState({uploadSuccessful: true})
          }
        })
    } 
    else{
      this.setState({
        displayNotReadyForSubmit: true
      })
    }
  }

  async handleChange(event){
    // console.log("id: " + event.target.id + "\n value: " + event.target.value)
    if((event.target.id === "productName")||(event.target.id === "productDescription")){
      this.setState({
        [event.target.id] : event.target.value
      })
    } 
    else if(event.target.id.includes('image')){   // checks if image is uploaded
      let productVarietiesID = this.state.productVarietiesID
      let productVarieties = this.state.productVarieties
      let index = productVarietiesID.indexOf(event.target.id)
      const base64 = await convertToBase64(event.target.files[0])
      if(index !== -1){
        productVarieties.splice(index, 1, base64)
        this.setState({
          productVarieties: productVarieties
        })
      } else{
        productVarietiesID.push(event.target.id)
        productVarieties.push(base64)
      }

    } 
    else{ //pours all gotten values into two arrays, one holding the IDs and the other, their correspnding html value
      let productVarietiesID = this.state.productVarietiesID
      let productVarieties = this.state.productVarieties
      let index = productVarietiesID.indexOf(event.target.id)
      if(index !== -1){
        productVarieties.splice(index, 1, event.target.value)
        this.setState({
          productVarieties: productVarieties
        })
      } else{
        productVarietiesID.push(event.target.id)
        productVarieties.push(event.target.value)
      }
    }

  }

  render(){
    
    return(
      this.state.uploadSuccessful ? <h3>Upload Successful.. Refresh page to view</h3> : 
      <div>
        <h2>Upload New Product</h2>
        {this.state.displayNotReadyForSubmit? <small>All fields must be filled</small> : null  }
        <form>
          <div className="form-group">
            <input type="text" className="form-control" placeholder="Product Name" id="productName" onChange={this.handleChange} value={this.state.productName} disabled={this.props.update ? true : false}/>
          </div>
          
          <div className="form-group">
            <textarea className="form-control" rows="2" placeholder="Product Description" id="productDescription" onChange={this.handleChange} value={this.state.productDescription}/>
          </div>
  
          <div className="form-group">
            <label>Number of varieties </label>
            <input type="number" min="1" max="9" onChange= { this.handleVarietiesChange } value={this.state.numberOfVarieties}/>
          </div>
          {
            Array.from({length: this.state.numberOfVarieties})
                .map((_, index) => (
                    <VariantForm index={index} key={index} handleChange={this.handleChange} update={this.props.update} data = { {productVarieties: this.state.productVarieties, productVarietiesID: this.state.productVarietiesID}}/>
                )
            )
          }
          <button type="submit" className="btn btn-outline-dark" onClick= { this.handleSubmit }>Submit</button> 
          
        </form>
      </div>
    )
  }
  
}

export default UploadProduct