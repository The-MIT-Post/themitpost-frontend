//components/Pagination.jsx
import { useState, useEffect } from "react";
import { Link, useSearchParams } from "react-router-dom";
import "./Pagination.css";

const Pagination = ({ total }) => {
  const articlesPerPage = 10;
  const [searchParams, setSearchParams] = useSearchParams();
  const [currentPage, setCurrentPage] = useState(1);
  const [gotoPage, setGotoPage] = useState("");
  const totalPages = Math.ceil(total / articlesPerPage);

  useEffect(() => {
    window.scrollTo({ top: 0 });
  }, [searchParams.get("offset")]);

  const getPaginationItems = () => {
    if (totalPages <= 1) return [1];
    const items = [1, 2];
    if (currentPage > 4) items.push("left-ellipsis");
    items.push(
      ...[currentPage - 1, currentPage, currentPage + 1].filter(
        (p) => p >= 3 && p <= totalPages - 2
      )
    );
    if (currentPage < totalPages - 3) items.push("right-ellipsis");
    if (totalPages > 2) items.push(totalPages - 1, totalPages);
    return items;
  };

  const goToSpecificPage = () => {
    let page = parseInt(gotoPage, 10);
    if (isNaN(page)) return;
    page = Math.max(1, Math.min(page, totalPages));

    setCurrentPage(page);
    const nextParams = new URLSearchParams(searchParams);
    nextParams.set("offset", ((page - 1) * articlesPerPage).toString());
    setSearchParams(nextParams);
  };

  return (
    <>
      <div className="pagination-bar">
        {getPaginationItems().map((item, index) =>
          typeof item === "number" ? (
            <Link
              key={item}
              className={`pagination-button ${currentPage === item ? "active" : ""}`}
              onClick={() => setCurrentPage(item)}
              to={`?${new URLSearchParams({ ...Object.fromEntries(searchParams), offset: ((item - 1) * articlesPerPage).toString() }).toString()}`}>
              {item}
            </Link>
          ) : (
            <span key={item + index} className="pagination-ellipsis">
              . . .
            </span>
          )
        )}
      </div>

      <div className="pagination-goto">
        <span>Go to page </span>
        <input
          type="number"
          min="1"
          max={totalPages}
          value={gotoPage}
          onChange={(e) => setGotoPage(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && goToSpecificPage()}
        />
        <span>/ {totalPages}</span>
      </div>
    </>
  );
};

export default Pagination;
