import Link from 'next/link'
import React,{useEffect, useState} from 'react'

import {BsBagCheckFill} from 'react-icons/bs'

import { useStateContext } from '../context/StateContext'
import { runFirework } from '../lib/utils'

function Success() {
  const{ setCartItems,setTotalQuantity,setTotalPrice}=useStateContext()
  const [order, setOrder] = useState(null)


  useEffect(()=>{
    localStorage.clear();
    setCartItems([])
    setTotalPrice(0)
    setTotalQuantity(0)
    runFirework()
  },[])

  return (
    <div className='suces-wrapper'>
      <div className="success">
        <p className="icon">
          <BsBagCheckFill/>
        </p>
        <h2>Thank you for your order</h2>
        <p className="email-msg">
          Check your emailinbox for your recept ../
        </p>
        <p className="description">
          if you have any question, please email,
          <a href="mailto:order@gmail.com" className="email">
              mallOrders@gmail.com
          </a>
        </p>
        <Link href='/'>
          <button type='button' width='300px' className='btn'>
            Continue Shopping 🛒
          </button>
        </Link>
      </div>
    </div>
  )
}

export default Success
