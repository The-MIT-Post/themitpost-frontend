import { useEffect } from "react";

export function useVisit() {
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
		}
	}, []);
}
