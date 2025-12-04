// components/Hero.js
import React from "react";
import "./Categories.css";

const Categories = () => {
	return (
		<nav className="categories">
			<ul>
				<li className="category">Campus</li>
				<li className="category">Arts & Culture</li>
				<li className="category">Science & Technology</li>
				<li className="category">News</li>
				<li className="category">Interviews</li>
				<li className="category">Notices</li>
				<li className="category">Media</li>
			</ul>
		</nav>
	);
};

export default Categories;
