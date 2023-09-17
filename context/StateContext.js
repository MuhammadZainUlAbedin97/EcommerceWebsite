import React, { createContext, useContext, useState } from "react";
import { toast } from "react-hot-toast";

const Context = createContext();

export const StateContext = ({ children }) => {
	const [showCart, setShowCart] = useState(false);
	const [cartItems, setCartItems] = useState([]);
	const [totalPrice, setTotalPrice] = useState(0);
	const [totalQuantities, setTotalQuantities] = useState(0);
	const [qty, setQty] = useState(1);

	let findProduct;
	let index;

	const onAdd = (product, quantity) => {
		const checkProductInCart = cartItems.find(
			(item) => item._id === product._id
		);

		setTotalPrice(
			(prevTotalPrice) => prevTotalPrice + product.price * quantity
		);
		setTotalQuantities((prevTotalQuantities) => prevTotalQuantities + quantity);

		if (checkProductInCart) {
			const updatedCartItems = cartItems.map((cartProduct) => {
				if (cartProduct._id === product._id)
					return {
						...cartProduct,
						quantity: cartProduct.quantity + quantity,
					};
			});

			setCartItems(updatedCartItems);
		} else {
			product.quantity = quantity;
			setCartItems([...cartItems, { ...product }]);
		}

		toast.success(`${qty} ${product.name} added to the cart.`);
		setQty(1);
	};

	const onRemove = (product) => {
		findProduct = cartItems.find((item) => item._id === product._id);
		const tempCart = cartItems.filter((item) => item._id !== product._id);
		setTotalPrice(totalPrice - findProduct.price * findProduct.quantity);
		setTotalQuantities(totalQuantities - findProduct.quantity);
		setCartItems(tempCart);
	};

	const toggleCartItemQuantity = (id, value) => {
		findProduct = cartItems.find((item) => item._id === id);
		index = cartItems.findIndex((product) => product._id === id);

		if (value === "inc") {
			findProduct.quantity += 1;
			cartItems[index] = findProduct;
			setTotalPrice(totalPrice + findProduct.price);
			setTotalQuantities(totalQuantities + 1);
		}

		if (value === "dec") {
			if (findProduct.quantity > 1) {
				findProduct.quantity -= 1;
				cartItems[index] = findProduct;
				setTotalPrice(totalPrice - findProduct.price);
				setTotalQuantities(totalQuantities - 1);
			}
		}
	};

	const incQty = () => {
		setQty((prevQty) => prevQty + 1);
	};

	const decQty = () => {
		setQty((prevQty) => {
			if (prevQty - 1 < 1) return 1;

			return prevQty - 1;
		});
	};

	return (
		<Context.Provider
			value={{
				showCart,
				cartItems,
				totalPrice,
				totalQuantities,
				qty,
				incQty,
				decQty,
				onAdd,
				setShowCart,
				toggleCartItemQuantity,
				onRemove,
				setCartItems,
				setTotalPrice,
				setTotalQuantities,
			}}
		>
			{children}
		</Context.Provider>
	);
};

export const useStateContext = () => useContext(Context);
