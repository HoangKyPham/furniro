import React from 'react'
import Banner from '../components/Banner'
import ShopGeneral from '../components/ShopGeneral'
import Blog from '../components/Blog'
import Service from '../components/Service'
import ProductList from '../components/ProductList'



const Index = () => {

  return (
    <>
      <Banner />
      <div>
        <section className="news">
          <div className="container">
            <div className="section-heading">
              <h2 className="section-heading__title">New</h2>
            </div>
            <div className="section-body">
              <ProductList featured={true} />
            </div>
          </div>
        </section>
        <div className="container">
          <hr />
        </div>
      </div>

      <ShopGeneral />
      <Blog />
      <Service />
    </>
  )
}

export default Index