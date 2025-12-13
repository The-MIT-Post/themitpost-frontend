import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import "./Navbar.css";

const Navbar = () => {
	const { currentUser, logout } = useAuth();
	const [isOpen, setIsOpen] = useState(false);

	const toggleMenu = () => {
		setIsOpen(!isOpen);
	};

	const sidebarItemsCount = document.querySelectorAll(".sidebar-item").length;
	const [openStates, setOpenStates] = useState(new Array(sidebarItemsCount).fill(false));

	const toggleItem = (index) => {
		const newStates = [...openStates];
		newStates[index] = !newStates[index];
		setOpenStates(newStates);
	};

	return (
		<>
			<nav className="navbar">
				<div className="navbar-links">
					<button onClick={toggleMenu} className="search">
						{isOpen ? (
							// Cross icon
							<svg width="50" height="30" viewBox="0 0 30 30" fill="none">
								<line
									x1="8"
									y1="8"
									x2="22"
									y2="22"
									stroke="currentColor"
									stroke-width="3"
									stroke-linecap="round"
								/>
								<line
									x1="22"
									y1="8"
									x2="8"
									y2="22"
									stroke="currentColor"
									stroke-width="3"
									stroke-linecap="round"
								/>
							</svg>
						) : (
							// Hamburger search icon
							<svg width="50" height="30" viewBox="0 0 80 48" fill="none">
								<path
									fill-rule="evenodd"
									clip-rule="evenodd"
									d="M66.8517 32.0842C68.5359 29.8276 69.5329 27.0282 69.5329 23.996C69.5329 16.5202 63.4727 10.46 55.9969 10.46C48.5212 10.46 42.4609 16.5202 42.4609 23.996C42.4609 31.4717 48.5212 37.532 55.9969 37.532C58.9975 37.532 61.77 36.5557 64.0141 34.9034L69.0904 39.9796L71.9188 37.1512L66.8517 32.0842ZM63.1568 30.3569C64.6606 28.6654 65.5741 26.4374 65.5741 23.996C65.5741 18.7066 61.2863 14.4188 55.9969 14.4188C50.7076 14.4188 46.4197 18.7066 46.4197 23.996C46.4197 29.2853 50.7076 33.5732 55.9969 33.5732C58.4383 33.5732 60.6664 32.6597 62.3579 31.1558L63.1568 30.3569Z"
									fill="currentColor"></path>
								<path
									fill-rule="evenodd"
									clip-rule="evenodd"
									d="M35.7184 33.6973H10.0254V37.6973H38.0738C37.1617 36.4525 36.3708 35.1133 35.7184 33.6973Z"
									fill="currentColor"></path>
								<path
									fill-rule="evenodd"
									clip-rule="evenodd"
									d="M33.6848 21.998H10.0273V25.998H33.6845C33.6283 25.3394 33.5996 24.673 33.5996 23.9998C33.5996 23.3254 33.6284 22.6578 33.6848 21.998Z"
									fill="currentColor"></path>
								<path
									fill-rule="evenodd"
									clip-rule="evenodd"
									d="M38.0747 10.2998H10.0273V14.2998H35.7186C36.3712 12.8837 37.1624 11.5446 38.0747 10.2998Z"
									fill="currentColor"></path>
							</svg>
						)}
					</button>
				</div>
				<div className="navbar-brand">
					<Link to="/" className="navbar-brand-link">
						<img src="/mit-post-logo-new.png" alt="The MIT Post" />
					</Link>
				</div>
				<ul className="navbar-links">
					<li>
						{currentUser ? (
							<button
								onClick={logout}
								className="navbar-link"
								style={{
									background: "none",
									border: "none",
									cursor: "pointer",
								}}>
								Logout ({currentUser.username})
							</button>
						) : (
							<Link to="/login" className="navbar-link">
								Login
							</Link>
						)}
					</li>
				</ul>
			</nav>
			{isOpen && (
				<>
					<div className="sidebar">
						<div className="sidebar-items-container">
							<ul className="sidebar-items">
								<li className={`sidebar-item ${openStates[0] ? "ddown-visible" : ""}`}>
									<div className="sidebar-category" onClick={() => toggleItem(0)}>
										Categories &#9662;
									</div>
									<ul className="sidebar-ddown">
										<li className="sidebar-link">Campus</li>
										<li className="sidebar-link">Arts & Culture</li>
										<li className="sidebar-link">Science & Technology</li>
										<li className="sidebar-link">News</li>
										<li className="sidebar-link">Interviews</li>
										<li className="sidebar-link">Notices</li>
										<li className="sidebar-link">Media</li>
									</ul>
								</li>
								<li className={`sidebar-item ${openStates[1] ? "ddown-visible" : ""}`}>
									<div className="sidebar-category" onClick={() => toggleItem(1)}>
										About &#9662;
									</div>
									<ul className="sidebar-ddown">
										<li className="sidebar-link">
											<Link to="/aboutUs">About Us</Link>
										</li>
										<li className="sidebar-link">
											<Link to="/board">The Board of 2025-26</Link>
										</li>
										<li className="sidebar-link">
											<Link to="/fromTheEditorsDesk">From the Editor's Desk</Link>
										</li>
									</ul>
								</li>
								<li className={`sidebar-item ${openStates[2] ? "ddown-visible" : ""}`}>
									<div className="sidebar-category" onClick={() => toggleItem(2)}>
										Resources &#9662;
									</div>
									<ul className="sidebar-ddown">
										<li className="sidebar-link">
											<a href="/resources/academic_calender.pdf" target="_blank">
												Academic Calender 25-26
											</a>
										</li>
										<li className="sidebar-link">
											<a href="/resources/academic_handbook.pdf" target="_blank">
												Academic Handbook 25-26
											</a>
										</li>
										<li className="sidebar-link">
											<a
												href="https://teams.microsoft.com/l/channel/19%3ATL33jeLE7fX2AMyd610G_9_LOEWe2fNZ4TBIrHlo8_Q1%40thread.tacv2/General?groupId=ea86aefe-31d7-41c4-ba6b-512594ff6c2a&tenantId=29bebd42-f1ff-4c3d-9688-067e3460dc1f"
												target="_blank">
												Manipal OSF
											</a>
										</li>
										<li className="sidebar-link">
											<a href="https://mitmpllibportal.manipal.edu/" target="_blank">
												Library Portal
											</a>
										</li>
										<li className="sidebar-link">
											<a href="https://www.manipal.edu/mit.html" target="_blank">
												MIT Website
											</a>
										</li>
									</ul>
								</li>
								<li className={`sidebar-item ${openStates[3] ? "ddown-visible" : ""}`}>
									<div className="sidebar-category" onClick={() => toggleItem(3)}>
										Archives &#9662;
									</div>
									<ul className="sidebar-ddown">
										<li className="sidebar-link">2024</li>
										<li className="sidebar-link">2023</li>
										<li className="sidebar-link">2022</li>
									</ul>
								</li>
								<li className={`sidebar-item ${openStates[4] ? "ddown-visible" : ""}`}>
									<div className="sidebar-category" onClick={() => toggleItem(4)}>
										Newsletters &#9662;
									</div>
									<ul className="sidebar-ddown">
										<li className="sidebar-link">Weekly Newsletters</li>
										<li className="sidebar-link">Revels</li>
										<li className="sidebar-link">Tech Tatva</li>
									</ul>
								</li>
							</ul>
						</div>
					</div>
					<div className="darken-bg"></div>
				</>
			)}
		</>
	);
};

export default Navbar;
