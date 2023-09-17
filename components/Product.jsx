import React, { useEffect, useState } from "react";
import Link from "next/link";

import { urlFor } from "@/lib/client";

const Product = ({
	product: { image, name, nameInGerman, slug, price },
	userCountry,
}) => {
	const [productName, setProductName] = useState("");
	useEffect(() => {
		switch (userCountry) {
			case "Pakistan":
				setProductName(name);
				break;
			case "Germany":
				setProductName(nameInGerman);
				break;
			default:
				setProductName(name);
				break;
		}
	}, [userCountry]);
	return (
		<div>
			<Link href={`/product/${slug.current}`}>
				<div className="product-card">
					<img
						src={urlFor(image && image[0])}
						width={250}
						height={250}
						className="product-image"
					/>
					<p className="product-name">{productName}</p>
					<p className="product-price">ر.ع.{price}</p>
				</div>
			</Link>
		</div>
	);
};

export default Product;
