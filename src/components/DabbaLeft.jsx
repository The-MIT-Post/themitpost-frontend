// components/DabbaLeft.js
import React from 'react';
import './Dabba.css';
import { Link } from 'react-router-dom';

const DabbaLeft = () => {
  const range = (start, end) =>
    Array.from(
      { length: Math.abs(end - start) + 1 },
      (_, i) => start + i * (start <= end ? 1 : -1)
    );

  const years = range(2024, 2022);

  return (
    <nav className="dabba dabba-left">
      <section className="dabba-content">
        <h2>Newsletters (Upcoming)</h2>
        <ul>
          <li className="category">Weekly Editorials</li>
          <li className="category">Monthly Editorials</li>
          <li className="category">Revels</li>
          <li className="category">Tech Tatva</li>
        </ul>
      </section>
      <section className="dabba-content">
        <h2>Archives</h2>
        <ul>
          {years.map((year) => {
            const params = new URLSearchParams();
            params.set('year', year);

            return (
              <li key={year}>
                <Link to={`/?${params.toString()}`} className="category">
                  {year}
                </Link>
              </li>
            );
          })}
        </ul>
      </section>
    </nav>
  );
};

export default DabbaLeft;
