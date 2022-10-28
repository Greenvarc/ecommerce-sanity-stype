import React,{createContext,useContext,useState,useEffect} from "react";
import toast, { Toast } from "react-hot-toast";

const Context=createContext()

export const StateContext=({children})=>{
    const [showCart, setShowCart] = useState(false);
    const [cartItems, setCartItems] = useState([]);
    const [totalPrice, setTotalPrice] = useState(0)
    const [totalQuantity, setTotalQuantity] = useState(0)
    const [qty, setQty] = useState(1)

    // for Cart
    let foundProduct;
    let index

    const incQty=()=>{
        setQty((prevQty)=>prevQty+1)
    }
    const decQty=()=>{
        setQty((prevQty)=>{
            if (prevQty-1<1) return 1
            return prevQty-1
        })
    }
    const onAdd=(product,quanity)=>{
        const checkProductInCart=cartItems.find((item)=>item._id===product._id)
        setTotalPrice((prevTotal)=>prevTotal+product.price*quanity);
        setTotalQuantity((prevTotalQuantity)=>prevTotalQuantity+product.quanity)
        if(checkProductInCart){
            //if products re on the cart
            const updatedCartItems=cartItems.map((cartProduct)=>{
                if(cartProduct._id==product._id) return {
                    ...cartProduct,
                    //change only the quantity
                    quanity:cartProduct.quanity+quanity
                }
            })
            //update cart items
            setCartItems(updatedCartItems)
        }else{
            product.quanity=quanity;
            //update cart Items ... by adding it,because don't exist
            setCartItems([...cartItems,{...product}])
        }
        toast.success(`${qty} ${product.name} added to the cart.`);
    }

    //remove itemon the cart
    const onRemove=(product)=>{
        foundProduct=cartItems.find((item)=>item._id===product._id)
        let newCartItems=cartItems.filter((item)=>item._id !==product._id)

        setTotalPrice(prevPrice=>prevPrice-foundProduct.price*foundProduct.quanity)
        setCartItems(newCartItems)
        setTotalQuantity(prevTotal=>prevTotal-foundProduct.quanity)
        setCartItems(newCartItems)
    }
    
    // manage cart Items
    const toggleitemQuantity=(id,value)=>{
        //found item
        foundProduct=cartItems.find((item)=>item._id===id)
        //find index of the ??..founded product 
        index=cartItems.findIndex((product)=>product._id===id)
        // firsty ,we remove the founded element,then it will be readded ehile updating
        let newCartItems=cartItems.filter((item)=>item._id !==id)

        if (value==='inc'){
            //change the quantity
            setCartItems([...newCartItems,{...foundProduct,quanity:foundProduct.quanity+1}])
            setTotalPrice((prevTotal)=>prevTotal+foundProduct.price)
            setTotalQuantity((prevQty)=>prevQty+1)
        }
        else if (value==='dec'){
            if(foundProduct.quanity>1){
                setCartItems([...newCartItems,{...foundProduct,quanity:foundProduct.quanity-1}])
                setTotalPrice((prevTotal)=>prevTotal-foundProduct.price)
                setTotalQuantity((prevQty)=>prevQty-1)
            }
        }

    }

    return(
        <Context.Provider
            value={{
                showCart,
                setShowCart,
                cartItems,
                totalPrice,
                totalQuantity,
                qty,
                incQty,
                decQty,
                onAdd,
                toggleitemQuantity,
                onRemove,
                setCartItems,
                setTotalQuantity,
                setTotalPrice,
            }}
        >
            {children}
        </Context.Provider>
    )
}

export const useStateContext=()=>useContext(Context)