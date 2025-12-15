// components/SubboardMembers.js
import React from "react";

const boardData = [
  { name: "Atharv Hrishikesh Pawar", position: "Writing" },
  { name: "Kamav Bansal", position: "Writing" },
  { name: "Deekshith Reddy", position: "Writing" },
  { name: "Parinita Mahanty", position: "Writing" },
  { name: "Vaibhav Shukla", position: "Writing" },
  { name: "Aastha Sharma", position: "Art" },
  { name: "Anyuta Kumar", position: "Art" },
  { name: "Ashi Sharma", position: "SMGD" },
  { name: "Dhruv Tewtia", position: "SMGD" },
  { name: "Niharika Sujit", position: "SMGD" },
  { name: "Eknoor Singh Chhabra", position: "SMGD" },
  { name: "Shreyansh Giri", position: "PAV" },
  { name: "Vihang", position: "PAV" },
  { name: "Ojas Gupta", position: "Public Relations" },
  { name: "Armaan Gupta", position: "Web Development" },
  { name: "Arnavpreet Shergill", position: "Web Development" },
  { name: "Smeet Pancholi", position: "Web Development" },
];

const SubboardMembers = () => {
  return (
    <div className="board-section subboard">
      {boardData.map((member, index) => {
        const baseName = member.name.replace(/ /g, "_");

        const src = `/team-pictures/subboard/${baseName}.webp`;

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

export default SubboardMembers;
