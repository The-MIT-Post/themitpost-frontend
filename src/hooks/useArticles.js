import { useEffect, useState } from "react";
import { useLoading } from "../context/LoadingContext";

export function useArticles(searchParams = {}) {
	const [articles, setArticles] = useState([]);
	const [total, setTotal] = useState(0);
	const { loading, startLoading, stopLoading } = useLoading();
	const [error, setError] = useState(null);

	useEffect(() => {
		const fetchArticles = async () => {
			startLoading();
			setError(null);

			try {
				const url = new URL(`${import.meta.env.VITE_API_URL}/api/articles`);

				Object.entries(searchParams).forEach(([key, value]) => {
					if (value != null) {
						url.searchParams.set(key, value);
					}
				});

				const response = await fetch(url.toString());

				if (!response.ok) {
					throw new Error("Failed to fetch articles");
				}

				const data = await response.json();

				setArticles(data.articles);
				setTotal(data.total);
			} catch (err) {
				console.error(err);
				setError(err);
			} finally {
				console.log("Stopping loading");
				stopLoading();
			}
		};

		fetchArticles();
	}, [JSON.stringify(searchParams)]);

	return { articles, total, loading, error };
}
