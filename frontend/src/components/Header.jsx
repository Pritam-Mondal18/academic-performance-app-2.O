// import React from "react";
// import { Link } from "react-router-dom";
// import "./Header.css";

// const Header = ({ darkMode, toggleDarkMode }) => {
//   return (
//     <header className={`header ${darkMode ? "dark" : "light"}`}>
//       <img src="/logostd.png" alt="Student logo" />

//       <h1 className="logo">EduSphere</h1>
//       <nav>
//         <ul className="nav-links">
//           <li>
//             <Link to="/" className="nav-link">
//               Home
//             </Link>
//           </li>
//           <li>
//             <Link to="/about" className="nav-link">
//               About
//             </Link>
//           </li>
//           <li>
//             <Link to="/contact" className="nav-link">
//               Contact
//             </Link>
//           </li>
//         </ul>
//       </nav>
//       <button className="mode-toggle" onClick={toggleDarkMode}>
//         {darkMode ? "☀️ Light" : "🌙 Dark"}
//       </button>
//     </header>
//   );
// };

// export default Header;

import React from "react";
import { Link } from "react-router-dom";
import "./Header.css";

const Header = ({ darkMode, toggleDarkMode }) => {
  return (
    <header className={`header ${darkMode ? "dark" : "light"}`}>
      <div className="logo-container">
        <img src="/logostd.png" alt="Student logo" className="logo-img" />
        <h1 className="logo">EduSphere</h1>
      </div>

      <nav>
        <ul className="nav-links">
          <li>
            <Link to="/" className="nav-link">
              Home
            </Link>
          </li>
          <li>
            <Link to="/about" className="nav-link">
              About
            </Link>
          </li>
          <li>
            <Link to="/contact" className="nav-link">
              Contact
            </Link>
          </li>
        </ul>
      </nav>

      <button className="mode-toggle" onClick={toggleDarkMode}>
        {darkMode ? "☀️ Light" : "🌙 Dark"}
      </button>
    </header>
  );
};

export default Header;
