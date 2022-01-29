import '../CSS/Home.css'

function Home(){
  return (
    <div className="padding">
      <h2>Welcome to AVIOS</h2>
      <h3><a href='/customer'>Login as Customer</a></h3>
      <h3><a href='/seller'>Login as Seller</a></h3>
    </div>
  )
}

export default Home