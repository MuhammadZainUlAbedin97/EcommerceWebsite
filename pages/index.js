import React, { useState, useEffect } from "react";
import { client } from "@/lib/client";
import { Product, FooterBanner, HeroBanner } from "../components";

const Home = ({ products, bannerData }) => {
	const [userCountry, setUserCountry] = useState("");
	useEffect(() => {
		const getLocation = async () => {
			const url = "https://ip-geo-location.p.rapidapi.com/ip/check?format=json";
			const options = {
				method: "GET",
				headers: {
					"X-RapidAPI-Key":
						"8549f453f9msh9febfdec9045819p1102a3jsn16cd87b30620",
					"X-RapidAPI-Host": "ip-geo-location.p.rapidapi.com",
				},
			};

			try {
				const response = await fetch(url, options);
				const result = await response.text();
				const jsonResult = await JSON.parse(result);
				setUserCountry(jsonResult.country?.name);
			} catch (error) {
				console.error(error);
			}
		};
		getLocation();
	}, []);
	return (
		<>
			<HeroBanner heroBanner={bannerData.length && bannerData[0]} />
			<div className="products-heading">
				<h2>Best Selling Products</h2>
				<p>Speaker of many variations</p>
			</div>
			<div className="products-container">
				{products?.map((product) => (
					<Product
						key={product._id}
						product={product}
						userCountry={userCountry}
					/>
				))}
			</div>
			<FooterBanner footerBanner={bannerData && bannerData[0]} />
		</>
	);
};

export const getServerSideProps = async () => {
	const query = '*[_type == "product"]';
	const products = await client.fetch(query);

	const bannerQuery = '*[_type == "banner"]';
	const bannerData = await client.fetch(bannerQuery);

	return {
		props: { products, bannerData },
	};
};

export default Home;
