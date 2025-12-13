import React, { useEffect, useState } from "react";
import { useAuth } from "./context/AuthContext";
import Loader from "./components/Loader";
import AppRouter from "./routes/AppRouter";

const App = () => {
	useEffect(() => {
		const hasVisited = sessionStorage.getItem("visited");

		if (!hasVisited) {
			fetch(`${import.meta.env.VITE_API_URL}/api/visit`, {
				method: "POST",
				headers: { "Content-Type": "application/json" },
			})
				.then(() => {
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
	const { currentUser } = useAuth();
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		const fetchArticles = async () => {
			setLoading(true);
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
				setLoading(false);
			}
		};

		fetchArticles();
	}, [currentUser]);

	return (
		<>
			{loading && <Loader />}
			<AppRouter articles={articles} />
		</>
	);
};

export default App;
