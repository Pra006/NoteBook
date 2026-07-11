import React from "react";
import { useState } from "react";
import { TextAlignEnd } from "lucide-react";
import { CircleUserRound } from "lucide-react";
import { LogOut, LogIn } from "lucide-react";
import { useSession } from "../../zustand/userSession";
import { Outlet, useNavigate } from "react-router-dom";
const Layout = () => {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const [toggelSize, setToggelSize] = useState(250);
  const { user, logout } = useSession((state) => state);
  const handleLogout = () => {
    logout();
    navigate("/login");
  };
  return (
    <div>
      <aside
        className="fixed top-0 left-0 h-full bg-gray-300"
        style={{ width: toggelSize, transition: "300ms" }}
      ></aside>
      <section style={{ marginLeft: toggelSize, transition: "300ms" }}>
        <nav className="sticky top-0 flex items-center justify-between bg-white px-12 py-8 shadow">
          <h1 className="font-semibold text-xl">Coding</h1>

          <div className="flex gap-3">
            <button
              onClick={() => setToggelSize(toggelSize === 250 ? 0 : 250)}
              className="bg-gray-200 p-2 rounded-md hover:bg-gray-300 transition-all"
            >
              <TextAlignEnd />
            </button>
            <div className="relative">
              <button
                onClick={() => setOpen(!open)}
                className="flex h-11 w-11 items-center justify-center rounded-full border border-gray-200 bg-white shadow-sm transition hover:bg-gray-100"
              >
                <CircleUserRound className="h-7 w-7 text-gray-700" />
              </button>

              {user && open && (
                <div className="absolute right-0 top-14 z-50 w-72 overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-2xl">
                  <div className="flex items-center gap-4 border-b border-gray-100 p-5">
                    <div className="flex h-14 w-14 items-center justify-center rounded-full bg-blue-100">
                      <CircleUserRound className="h-8 w-8 text-blue-600" />
                    </div>

                    <div>
                      <h3 className="font-semibold text-gray-800 capitalize">
                        {user.fullname}
                      </h3>
                      <p className="text-sm text-gray-500">{user.email}</p>
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
        <div className="px-12 py-8">
          <Outlet />
        </div>
      </section>
    </div>
  );
};

export default Layout;
