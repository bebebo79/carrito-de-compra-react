import { useState, useEffect } from "react"
import Header from "./components/Header"
import Guitar from "./components/Guitar"
import { db } from "./data/db"



function App() {

    //creamos la variabla de como inicia el localStorage
    // siendo un string que hay que pasar a un array
    const initialCart= ()=>{
        const localStorageCart = localStorage.getItem('cart')
        return localStorageCart ? JSON.parse(localStorageCart) : []
    }
  
    // State
    const [data] = useState(db)
    const [cart, setCart] = useState(initialCart)

    //variables
    const MAX_ITEMS = 5
    const MIN_ITEMS = 1
    

    //para almacenarlos datos de array de cart, pero hay que pasarlo a srting
    useEffect (()=>{
        localStorage.setItem('cart', JSON.stringify(cart))
    },[cart])


    // funcion para llenar el carrito de compra
    function addToCart(item){
        const itemExist = cart.findIndex(guitar=> guitar.id === item.id)
        if(itemExist >= 0){//exite el elmento en el array de cart
            if(cart[itemExist].quantity >= MAX_ITEMS) return
            const updateCart = [...cart]
            updateCart[itemExist].quantity++ 
            setCart(updateCart)
        }else{
            item.quantity = 1
            setCart([...cart,item])

        }  

    } 
    //funcion para eliminar un elemento del carrito de compra
    function removeFromCart(id){
        //sacar del array Cart el id que hemos clikeado con filter(filtramos)
        //quiere decir que dejamos solo las que no hemos clikeado
        setCart(prevCart=>prevCart.filter(guitar=>guitar.id !== id))
    } 
    
    //funcion para incrementar las cantidades por id añadidas al carrito
    function increaseQuantity(id){
        const updateCart = cart.map(item =>{
            if(item.id === id && item.quantity < MAX_ITEMS){
                return {
                    ...item,
                    quantity : item.quantity + 1
                }
            } return item
        })
        setCart(updateCart)
        
    }  
    
    //funcion para decrementar cantidades
    function decreaseQuantity(id){
        const updateCart = cart.map(item =>{
            if(item.id === id && item.quantity > MIN_ITEMS){
                return {
                    ...item,
                    quantity : item.quantity - 1
                }
            }return item

        })
        setCart(updateCart)

    }

    //funcion para vaciar el carrito
    function clearCart() {
        setCart([]) //volvemos al state vacio
    }

   
        
    


  return (
    <>
    <Header
        cart = {cart}
        removeFromCart = {removeFromCart}
        increaseQuantity={increaseQuantity}
        decreaseQuantity ={decreaseQuantity}
        clearCart={clearCart}
    />
    
    <main className="container-xl mt-5">
        <h2 className="text-center">Nuestra Colección</h2>

        <div className="row mt-5">
            
            {data.map((guitar)=>(     
                <Guitar 
                    key = {guitar.id}
                    guitar = {guitar}
                    setCart={setCart}
                    addToCart = {addToCart}
                />
            ))}
           
            
        </div>
    </main>


    <footer className="bg-dark mt-5 py-5">
        <div className="container-xl">
            <p className="text-white text-center fs-4 mt-4 m-md-0">GuitarLA - Todos los derechos Reservados</p>
        </div>
    </footer>

      
    </>
  )
}

export default App
