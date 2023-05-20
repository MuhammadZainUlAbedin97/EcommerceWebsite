import React, { useRef } from "react";
import Link from "next/link";
import {
	AiOutlineMinus,
	AiOutlinePlus,
	AiOutlineRight,
	AiOutlineShopping,
} from "react-icons/ai";
import { TiDeleteOutline } from "react-icons/ti";
import { toast } from "react-hot-toast";
import { useStateContext } from "@/context/StateContext";
import { urlFor } from "@/lib/client";
import GooglePayButton from "@google-pay/button-react";

const Cart = () => {
	const cartRef = useRef();
	const {
		totalPrice,
		totalQuantities,
		cartItems,
		setShowCart,
		toggleCartItemQuantity,
		onRemove,
	} = useStateContext();
	return (
		<div className="cart-wrapper" ref={cartRef}>
			<div className="cart-container">
				<button
					type="button"
					className="cart-heading"
					onClick={() => setShowCart(false)}
				>
					<AiOutlineRight />
					<span className="heading">Your Cart</span>
					<span className="cart-num-items">({totalQuantities} items)</span>
				</button>
				{cartItems.length < 1 && (
					<div className="empty-cart">
						<AiOutlineShopping size={150} />
						<h3>Your shopping bag is empty</h3>
						<Link href="/">
							<button
								type="button"
								onClick={() => setShowCart(false)}
								className="btn"
							>
								Continue Shopping
							</button>
						</Link>
					</div>
				)}

				<div className="product-container">
					{cartItems.length >= 1 &&
						cartItems.map((item) => (
							<div className="product" key={item._id}>
								<img
									src={urlFor(item?.image[0])}
									className="cart-product-image"
								/>
								<div className="item-desc">
									<div className="flex top">
										<h5>{item?.name}</h5>
										<h4>ر.ع.{item.price}</h4>
									</div>
									<div className="flex bottom">
										<div>
											<p className="quantity-desc">
												<span
													className="minus"
													onClick={() =>
														toggleCartItemQuantity(item._id, "dec")
													}
												>
													<AiOutlineMinus />
												</span>
												<span className="num">{item.quantity}</span>
												<span
													className="plus"
													onClick={() =>
														toggleCartItemQuantity(item._id, "inc")
													}
												>
													<AiOutlinePlus />
												</span>
											</p>
										</div>
										<button
											type="button"
											className="remove-item"
											onClick={() => onRemove(item)}
										>
											<TiDeleteOutline />
										</button>
									</div>
								</div>
							</div>
						))}
				</div>
				{cartItems.length >= 1 && (
					<div className="cart-bottom">
						<div className="total">
							<h3>Subtotal:</h3>
							<h3>ر.ع.{totalPrice}</h3>
						</div>
						<div className="btn-container">
							<GooglePayButton
								environment="TEST"
								paymentRequest={{
									apiVersion: 2,
									apiVersionMinor: 0,
									allowedPaymentMethods: [
										{
											type: "CARD",
											parameters: {
												allowedAuthMethods: ["PAN_ONLY", "CRYPTOGRAM_3DS"],
												allowedCardNetworks: ["MASTERCARD", "VISA"],
											},
											tokenizationSpecification: {
												type: "PAYMENT_GATEWAY",
												parameters: {
													gateway: "example",
													gatewayMerchantId: "exampleGatewayMerchantId",
												},
											},
										},
									],
									merchantInfo: {
										merchantId: "BCR2DN4TZKQ75JCP",
										merchantName: "Demo Merchant",
									},
									transactionInfo: {
										totalPriceStatus: "FINAL",
										totalPriceLabel: "Total",
										totalPrice: `${totalPrice}`,
										currencyCode: "OMR",
										countryCode: "OM",
									},
									shippingAddressRequired: true,
									callbackIntents: [
										"SHIPPING_ADDRESS",
										"PAYMENT_AUTHORIZATION",
									],
								}}
								onLoadPaymentData={(paymentRequest) => {
									console.log("Success", paymentRequest);
									window.location.href =
										"https://ecommerce-website-79e7.vercel.app/success";
									return { transactionState: "SUCCESS" };
								}}
								onPaymentAuthorized={(paymentData) => {
									console.log("Payment Authorised Success", paymentData);
									return { transactionState: "SUCCESS" };
								}}
								onPaymentDataChanged={(paymentData) => {
									console.log("On Payment Data Changed", paymentData);
									return {};
								}}
								existingPaymentMethodRequired="false"
								buttonColor="black"
								buttonType="Buy"
							/>
						</div>
					</div>
				)}
			</div>
		</div>
	);
};

export default Cart;
