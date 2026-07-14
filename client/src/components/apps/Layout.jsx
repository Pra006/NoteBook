import React, { useState } from "react";
import {
  LayoutDashboard,
  Notebook,
  User,
  TextAlignEnd,
  CircleUserRound,
  LogOut,
} from "lucide-react";
import { NavLink, Outlet, useNavigate } from "react-router-dom";
import { useSession } from "../../zustand/userSession";

const menuItems = [
  {
    label: "Dashboard",
    icon: <LayoutDashboard className="h-5 w-5" />,
    link: "/app/dashboard",
  },
  {
    label: "Notebook",
    icon: <Notebook className="h-5 w-5" />,
    link: "/app/notebook",
  },
  {
    label: "Profile",
    icon: <User className="h-5 w-5" />,
    link: "/app/profile",
  },
];

const Layout = () => {
  const navigate = useNavigate();

  const [open, setOpen] = useState(false);
  const [sidebarWidth, setSidebarWidth] = useState(250);

  const { user, logout } = useSession((state) => state);

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <div className="bg-gray-100 min-h-screen">
      <aside
        className="fixed left-0 top-0 h-screen border-r border-gray-200 bg-white shadow-sm"
        style={{
          width: sidebarWidth,
          transition: "all .3s ease",
        }}
      >
        <div className="flex h-20 items-center justify-center border-b border-gray-200">
          {sidebarWidth === 250 ? (
            <h1 className="text-2xl font-bold text-blue-600">
              Coding
            </h1>
          ) : (
            <h1 className="text-2xl font-bold text-blue-600">C</h1>
          )}
        </div>

        <div className="mt-6 px-3">
          {menuItems.map((item) => (
            <NavLink
              key={item.link}
              to={item.link}
              className={({ isActive }) =>
                `mb-2 flex items-center rounded-xl px-4 py-3 transition-all ${
                  isActive
                    ? "bg-blue-600 text-white shadow-md"
                    : "text-gray-600 hover:bg-gray-100"
                }`
              }
            >
              {item.icon}

              {sidebarWidth === 250 && (
                <span className="ml-3 font-medium">
                  {item.label}
                </span>
              )}
            </NavLink>
          ))}
        </div>
      </aside>

      <section
        className="min-h-screen"
        style={{
          marginLeft: sidebarWidth,
          transition: "all .3s ease",
        }}
      >
        <nav className="sticky top-0 z-40 flex h-20 items-center justify-between border-b border-gray-200 bg-white px-8 shadow-sm">
          <h2 className="text-2xl font-semibold text-gray-800">
            Dashboard
          </h2>

          <div className="flex items-center gap-4">
            <button
              onClick={() =>
                setSidebarWidth(
                  sidebarWidth === 250 ? 80 : 250
                )
              }
              className="flex h-11 w-11 items-center justify-center rounded-lg bg-gray-100 transition hover:bg-gray-200"
            >
              <TextAlignEnd className="h-5 w-5" />
            </button>

            <div className="relative">
              <button
                onClick={() => setOpen(!open)}
                className="flex h-11 w-11 items-center justify-center rounded-full bg-blue-600 text-lg font-semibold text-white shadow transition hover:bg-blue-700"
              >
                {user?.fullname
                  ? user.fullname.charAt(0).toUpperCase()
                  : <CircleUserRound className="h-6 w-6" />}
              </button>

              {open && user && (
                <div className="absolute right-0 mt-3 w-72 overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-2xl">
                  <div className="flex items-center gap-4 border-b border-gray-100 p-5">
                    <div className="flex h-14 w-14 items-center justify-center rounded-full bg-blue-100 text-xl font-bold text-blue-600">
                      {user.fullname?.charAt(0).toUpperCase()}
                    </div>

                    <div>
                      <h3 className="font-semibold capitalize text-gray-800">
                        {user.fullname}
                      </h3>

                      <p className="text-sm text-gray-500">
                        {user.email}
                      </p>
                    </div>
                  </div>

                  <div className="p-2">
                    <button
                      onClick={handleLogout}
                      className="flex w-full items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium text-gray-700 transition hover:bg-red-50 hover:text-red-600"
                    >
                      <LogOut className="h-5 w-5" />
                      Logout
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </nav>

        <main className="p-8">
          <div className="min-h-[calc(100vh-120px)] rounded-2xl bg-white p-8 shadow-sm">
            <Outlet />
          </div>
        </main>
      </section>
    </div>
  );
};

export default Layout;