import { NavLink } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHouse as faHouseRegular,
  faEnvelope as faEnvelopeRegular,
  faUser as faUserRegular,
} from "@fortawesome/free-regular-svg-icons";
import {
  faHouse as faHouseSolid,
  faEnvelope as faEnvelopeSolid,
  faUser as faUserSolid,
  faHammer,
} from "@fortawesome/free-solid-svg-icons";

const Navbar = () => {
  const navItems = [
    {
      id: "home",
      label: "Home",
      regular: faHouseRegular,
      solid: faHouseSolid,
      path: "/home",
    },
    {
      id: "projects",
      label: "Projects",
      regular: faHammer,
      solid: faHammer,
      path: "/projects",
    },
    {
      id: "messages",
      label: "Messages",
      regular: faEnvelopeRegular,
      solid: faEnvelopeSolid,
      path: "/messages",
      unread: 3, // 👈 static unread count for now
    },
    {
      id: "profile",
      label: "Profile",
      regular: faUserRegular,
      solid: faUserSolid,
      path: "/profile",
    },
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-white/80 backdrop-blur-sm border-t border-gray-200 shadow-lg flex justify-around items-center py-4 px-4 z-50">
      {navItems.map((item) => (
        <NavLink
          key={item.id}
          to={item.path}
          end
          className={({ isActive }) =>
            `relative flex flex-col items-center justify-center space-y-1 transition-all duration-200 ${
              isActive
                ? "text-[#1B7339] scale-110"
                : "text-gray-500 hover:text-[#1B7339]"
            }`
          }
        >
          {({ isActive }) => (
            <>
              <div className="relative">
                <FontAwesomeIcon
                  icon={isActive ? item.solid : item.regular}
                  size="lg"
                  className="transition-transform duration-200"
                />
                {/* 🔔 Unread badge (only for messages) */}
                {item.id === "messages" && item.unread > 0 && (
                  <span className="absolute -top-1.5 -right-2 bg-red-500 text-white text-[10px] font-semibold rounded-full w-4 h-4 flex items-center justify-center shadow-sm">
                    {item.unread}
                  </span>
                )}
              </div>
              <span className="text-xs font-medium">{item.label}</span>
            </>
          )}
        </NavLink>
      ))}
    </nav>
  );
};

export default Navbar;
