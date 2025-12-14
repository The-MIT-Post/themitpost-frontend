// components/ArticleDetail.js
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Navbar from "./Navbar";
import Footer from "./Footer";
import parse from "html-react-parser";
import { Link } from "react-router-dom";
import RotatingCircle from "./RotatingCircle";
import "./ArticleDetail.css";

const ArticleDetail = ({ articles }) => {
	const { id } = useParams();
	const [article, setArticle] = useState(null);
	const [suggestedArticles, setSuggestedArticles] = useState([]);
	const fallbackImage = "/test.jpg";
	const fallback2 = "/test_2.jpg"; // Fallback for content images

	useEffect(() => {
		const fetchArticle = async () => {
			try {
				// Fetch the specific article
				const response = await fetch(`${import.meta.env.VITE_API_URL}/api/articles/${id}`);
				const data = await response.json();
				setArticle(data);

				// Get 3 random articles for suggestions
				if (articles.length > 0) {
					const filtered = articles.filter((a) => a._id !== id);
					const randomArticles = filtered.sort(() => 0.5 - Math.random()).slice(0, 3);
					setSuggestedArticles(randomArticles);
				}
			} catch (error) {
				console.error("Error fetching article:", error);
			}
		};

		fetchArticle();
		// Scroll to top when component mounts
		window.scrollTo(0, 0);
	}, [id, articles]);

	// Function to replace <img> tags with fallback2
	const replaceImages = (node) => {
		if (node.name === "img") {
			return (
				<img
					src={fallback2} // Replace with fallback2
					alt={node.attribs.alt || "Fallback Image"}
					className="article-image"
				/>
			);
		}
	};

	if (!article) {
		return <div className="loading">Loading...</div>;
	}

	return (
		<>
			<Navbar />
			<RotatingCircle />
			<div className="app-container">
				<div className="article-detail">
					<div className="article-header">
						<h1 className="article-title">{article.title}</h1>
						<div className="article-meta">
							<span className="article-date">{new Date(article.pubDate).toLocaleDateString()}</span>
							<span className="article-author">By {article.creator}</span>
						</div>
					</div>
					<div className="article-content">
						{/* Parse the content and replace images with fallback2 */}
						{parse(article.content, { replace: replaceImages })}
					</div>
				</div>

				<div className="suggested-articles">
					<h2 className="section-title">Suggested Articles</h2>
					<div className="famous-articles-grid">
						{suggestedArticles.map((article) => (
							<div key={article._id} className="card">
								<img src={fallbackImage} alt={article.title} className="card-image" />
								<div className="card__content">
									<p className="card__title">{article.title}</p>
									<p className="card__description">{article.summary}</p>
									<Link to={`/articles/${article._id}`} className="read-more-button">
										Read More
									</Link>
								</div>
							</div>
						))}
					</div>
				</div>
			</div>
			<Footer />
		</>
	);
};

export default ArticleDetail;
