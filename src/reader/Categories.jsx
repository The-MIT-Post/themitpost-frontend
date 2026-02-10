// components/Categories.js
import React from "react";
import "./Categories.css";
import { Link } from "react-router-dom";

const categories = ["Campus", "Arts & Culture", "Science & Technology", "World", "Media", "FAQ"];

function Categories() {
	return (
		<nav className="categories">
			<ul>
				{categories.map((category) => {
					const params = new URLSearchParams();
					params.set("category", category);

					return (
						<li key={category}>
							<Link to={`/?${params.toString()}`} className="category">
								{category}
							</Link>
						</li>
					);
				})}
			</ul>
		</nav>
	);
}

export default Categories;
