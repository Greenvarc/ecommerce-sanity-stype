import React from 'react'

import { Product,FooterBanner,HeroBanner } from '../componets'
import { client } from '../lib/client'

function Home({products,bannerData}) {
  return (
    <>
      <HeroBanner HeroBanner={bannerData.length&& bannerData[0]}/>
      {console.log(products)}
      
      <div className='products-heading'>
        <h2>Best Selling Products</h2>
        <p>Speakers of many variations</p>
      </div>

      <div className='products-container'>
        {products?.map(product=><Product key={product._id} product={product}/>)}
      </div>

      <FooterBanner footerBanner={bannerData&& bannerData[0]}/>
    </>
  )
}

export const getServerSideProps=async ()=>{
  const query=`*[_type=="product"]`
  const products=await client.fetch(query);

  const bannerQuery=`*[_type=="banner"]`
  const bannerData=await client.fetch(bannerQuery)

  //return fetched data ../.
  return{
    props:{bannerData,products}
  }
}

export default Home
