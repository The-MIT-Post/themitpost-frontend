// components/Categories.js
import React from "react";
import "./Categories.css";

const Categories = () => {
	return (
		<nav className="categories">
			<ul>
				<li className="category">Campus</li>
				<li className="category">Arts & Culture</li>
				<li className="category">Science & Technology</li>
				<li className="category">World</li>
				<li className="category">Media</li>
				<li className="category">Notices</li>
				<li className="category">FAQ</li>
			</ul>
		</nav>
	);
};

export default Categories;
