import React from 'react'
import Products from '../Components/Products'
import UploadProduct from '../Components/UploadProduct'
import API_BASE_URL from '../Utils/apiUrl'
import unpack from '../Utils/unpack'
import '../CSS/bootstrap.min.css'

class Seller extends React.Component{
  constructor(props){
    super(props)

    this.state = { 
      products: [], 
      fetched: false,
      uploadProduct: false,
      index: 0
    }

    this.toggleUpload = this.toggleUpload.bind(this)
    this.handleClick = this.handleClick.bind(this)
  }

  componentDidMount(){
    fetch(`${API_BASE_URL}/product`)
      .then(response => response.json())
      .then(data => {
        console.log(data)
        this.setState({ products: unpack(data.data), fetched: true })
      })
      .catch(error => console.log(error))
  }

  handleClick(event){
    const index = event.target.getAttribute("index")
    this.setState({
      index: index,
      uploadProduct: true,
      update: true
    })
    
    // console.log(Array.prototype.indexOf.call(Children_of_parent, child))

  }

  toggleUpload(event){
    this.setState({uploadProduct: !this.state.uploadProduct})
  }
  render(){
    return (
      <div>
        { 
          this.state.uploadProduct ? 
          
          <>{console.log(this.state)}
            <button className="toggle-upload btn btn-outline-dark" onClick = { this.toggleUpload }>Display Products </button>
            <UploadProduct update={this.state.update} data={this.state.products[this.state.index]}/> 
          </> :
          <>
            <button className="toggle-upload btn btn-outline-dark" onClick = { this.toggleUpload }>Upload New Product </button>
            <Products products={this.state.products} loading={!this.state.fetched} seller={true} onClick = { this.handleClick }/>
          </>
          
        }
      </div>
    )
  }
  
}

export default Seller