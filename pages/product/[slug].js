import React, { useState } from 'react'
import { AiFillStar, AiOutlineMinus, AiOutlinePlus, AiOutlineStar } from 'react-icons/ai'
import { Product } from '../../componets'
import { client, urlFor } from '../../lib/client'

import {useStateContext} from '../../context/StateContext'

const ProductDetails=({product,products})=>{
    const {image,name,Details,price}=product

    const [index, setIndex] = useState(0)
    // react useContext
    const {decQty,incQty,qty,onAdd,setShowCart}=useStateContext()

    const handleBuyNow=()=>{
        onAdd(product,qty)
        setShowCart(true)
    }

  return (
    <div>
        <div className="product-detail-container">
            <div>
                <div className='image-container'>
                    <img src={urlFor(image&&image[index])} alt="product-img" 
                        className='product-detail-image'
                    />
                </div>
                <div className="small-images-container">
                    {image.map((item,i)=>(
                        <img 
                            key={i}
                            src={urlFor(item)}
                            className={i===index? 'small-image selected-image':'small-image'}
                            onMouseEnter={()=>setIndex(i)}
                        />
                    ))}
                </div>

            </div>
            <div className="product-detail-desc">
                <h1>{name}</h1>
                <div className="reviews">
                    <div>
                        <AiFillStar/>
                        <AiFillStar/>
                        <AiFillStar/>
                        <AiFillStar/>
                        <AiOutlineStar/>
                    </div>
                    <p>(20)</p>
                </div>
                <h4>Details :</h4>
                <p>{Details}</p>
                <p className="price">${price}</p>
                <div className="quantity">
                    <h3>Quantity: </h3>
                    <p className="quantity-desc">
                        <span className="minus"
                        onClick={decQty}
                        >
                            <AiOutlineMinus/>
                        </span>
                        <span className="num"
                        >{qty}</span>
                        <span className="plus"
                        onClick={incQty}
                        >
                            <AiOutlinePlus/>
                        </span>
                    </p>
                </div>
                <div className="buttons">
                    <button type='button' className='add-to-cart'
                    // adding function 
                    onClick={()=>onAdd(product,qty)}
                    >Add to Cart</button>

                    <button type='button' className='buy-now'
                    onClick={handleBuyNow}
                    >Buy Now</button>
                </div>
            </div>
        </div>
        <div className="maylike-products-wrapper">
            <h2>You may Also like</h2>
            <div className="marquee">
                <div className="maylike-products-container track">
                    {products.map((item)=>(
                        <Product key={item._id} product={item}/>
                    ))}
                </div>
            </div>
        </div>
    </div>
  )
}



export const getStaticPaths=async()=>{
    const query=`*[_type==product]{
        slug{
            current
        }
    }`;
    const products=await client.fetch(query)
    const paths=products.map((product)=>({
        params:{
            slug:product.slug.current
        }
    }))
    return{
        paths,
        fallback:'blocking'
    }
}

export const getStaticProps=async ({params:{slug}})=>{
    const query=`*[_type=="product" && slug.current == '${slug}'][0]`
    const productQuery=`*[_type=='product']`
    const product=await client.fetch(query); //single
    const products=await client.fetch(productQuery)//others ...
  
    //return fetched data ../.
    return{
      props:{product,products}
    }
  }


export default ProductDetails
