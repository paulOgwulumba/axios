import React from 'react'
import Products from '../Components/Products'
import API_BASE_URL from '../Utils/apiUrl'
import unpack from '../Utils/unpack'

class Customer extends React.Component{
  constructor(props){
    super(props)

    this.state = { 
      products: [], 
      fetched: false
    }
  }

  componentDidMount(){
    fetch(`${API_BASE_URL}/product`)
      .then(response => response.json())
      .then(data => {
        this.setState({ products: unpack(data.data), fetched: true })
      })
      .catch(error => console.log(error))
  }

  render(){
    return (
      <div>
        <Products products={this.state.products} loading={!this.state.fetched} seller={false}/>
      </div>
    )
  }
  
}

export default Customer