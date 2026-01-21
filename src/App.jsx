import React, { useEffect } from "react";
import { useAuth } from "./context/AuthContext";
import Loader from "./components/Loader";
import AppRouter from "./routes/AppRouter";
import { useVisit } from "./hooks/useVisit";
import { useArticles } from "./hooks/useArticles";
import { useSearchParams } from "react-router-dom";

const App = () => {
  useVisit();
  const [searchParams] = useSearchParams();
  const { articles, total, loading } = useArticles(Object.fromEntries(searchParams));

  const { currentUser } = useAuth();

  return (
    <>
      {loading && <Loader />}
      <AppRouter articles={articles} total={total} />
    </>
  );
};

export default App;
