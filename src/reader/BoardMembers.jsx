// components/BoardMembers.js
import React from "react";

const boardData = [
  { name: "Kushal Bayaskar", position: "Editor-In-Chief" },
  { name: "Udita Kumari", position: "Managing Editor" },
  { name: "Akshat Aggarwal", position: "Writing & PAV Head" },
  { name: "Shubham Sharma", position: "Social Media & Graphic Design Head" },
  { name: "Aditi Rishiraj", position: "Web Development Head" },
];

const BoardMembers = () => {
  return (
    <div className="board-section">
      {boardData.map((member, index) => {
        const baseName = member.name.replace(/ /g, "_");

        const src = `/team-pictures/board/${baseName}.webp`;

        return (
          <div className="member-card" key={index}>
            <img src={src} alt={member.name} />
            <div>
              <p>{member.position}</p>
              <h4>{member.name}</h4>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default BoardMembers;
