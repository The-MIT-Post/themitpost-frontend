// components/SubboardMembers.js
import React from "react";

const boardData = [
  { name: "Akshat Aggarwal", position: "Writing & PAV Subhead" },
  { name: "Aastha Sharma", position: "Art Subhead" },
  { name: "Ojas Gupta", position: "Public Relations Subhead" },
  { name: "Shubham Sharma", position: "Social Media & Graphic Design Subhead" },
  { name: "Aditi Rishiraj", position: "Web Development Head" },
];

const SubboardMembers = () => {
  return (
    <div className="board-section">
      {boardData.map((member, index) => {
        const baseName = member.name.replace(/ /g, "_");

        const src = `/team-pictures/board/${baseName}.webp`;

        return (
          <div className="member-card" key={index}>
            <img src={src} alt={member.name} />
            <p>{member.position}</p>
            <h4>{member.name}</h4>
          </div>
        );
      })}
    </div>
  );
};

export default SubboardMembers;
