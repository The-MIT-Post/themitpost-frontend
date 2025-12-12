import React, { useEffect, useState } from "react";
import { useAuth } from "./context/AuthContext";
import Loader from "./components/Loader";
import "./index.css";
import AppRouter from "./routes/AppRouter";

const App = () => {
	useEffect(() => {
		const hasVisited = sessionStorage.getItem("visited");

		// If the user has not been counted this session
		if (!hasVisited) {
			// Hit backend
			console.log("/visit endpoint hit");
			fetch(`${import.meta.env.VITE_API_URL}/api/visit`, {
				method: "POST",
				headers: { "Content-Type": "application/json" },
			})
				.then(() => {
					// Mark this session as counted
					sessionStorage.setItem("visited", "true");
				})
				.catch((err) => {
					console.error("Visit logging failed:", err);
				});
		} else {
			console.log("Already visited");
		}
	}, []);

	const [articles, setArticles] = useState([]);
	const { currentUser } = useAuth(); // Now this will work properly
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		const fetchArticles = async () => {
			setLoading(true); // Set loading to true before fetching
			try {
				const headers = {};
				if (currentUser) {
					headers["Authorization"] = `Bearer ${currentUser.token}`;
				}

				const response = await fetch(`${import.meta.env.VITE_API_URL}/api/articles`, {
					headers,
				});

				if (!response.ok) throw new Error("Failed to fetch articles");

				const data = await response.json();
				const sortedArticles = data.sort((a, b) => new Date(b.pubDate) - new Date(a.pubDate));
				setArticles(sortedArticles);
			} catch (error) {
				console.error("Error fetching articles:", error);
			} finally {
				setLoading(false); // Set loading to false once the fetch is done (whether successful or not)
			}
		};

		fetchArticles();
	}, [currentUser]);

	return (
		<>
			{loading && <Loader />} {/* Show the loader only when loading */}
			<AppRouter articles={articles} />
		</>
	);
};

export default App;
