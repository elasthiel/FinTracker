import { useState, useEffect } from "react";
import { NavLink, Link } from "react-router";
import { FaMoneyBillTransfer } from "react-icons/fa6";
import { LogOut, Menu, X, ChevronDown } from "lucide-react";
import useLogOut from "../hooks/useLogout";
import useAuthUser from "../hooks/useAuthUser";
import toast from "react-hot-toast";

const navLinks = [
  { to: "/dashboard", label: "Overview" },
  { to: "/transactions", label: "Transactions" },
];

const Navbar = () => {
  const { isLoading, error, logoutMutation } = useLogOut();
  const { authUser } = useAuthUser();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);

  useEffect(() => {
    if (error) {
      toast.error(error.message);
    }
  }, [error]);

  const getInitials = (name) => {
    if (!name) return "U";
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
      .slice(0, 2);
  };

  return (
    <nav className="bg-base-100 border-b border-base-300 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center h-16 gap-8">
          {/* Logo */}
          <Link to="/dashboard" className="flex items-center gap-2.5 group">
            <div className="p-2 rounded-xl bg-gradient-to-br from-lime-500 to-emerald-600 shadow-md group-hover:shadow-lg transition-shadow">
              <FaMoneyBillTransfer className="text-xl text-white" />
            </div>
            <span className="text-xl font-extrabold tracking-tight hidden sm:block">
              FinTracker
            </span>
          </Link>

          {/* Desktop Navigation - simple text links */}
          <div className="hidden md:flex items-center gap-6 flex-1">
            {navLinks.map(({ to, label }) => (
              <NavLink
                key={to}
                to={to}
                className={({ isActive }) =>
                  `text-sm font-medium transition-colors relative py-5 ${
                    isActive
                      ? "text-primary"
                      : "text-base-content/60 hover:text-base-content"
                  }`
                }
              >
                {({ isActive }) => (
                  <>
                    {label}
                    {isActive && (
                      <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary rounded-full" />
                    )}
                  </>
                )}
              </NavLink>
            ))}
          </div>

          {/* Desktop Profile */}
          {authUser && (
            <div className="hidden md:flex items-center">
              <div className="relative">
                <button
                  onClick={() => setProfileOpen(!profileOpen)}
                  className="flex items-center gap-2 px-2 py-1.5 rounded-lg hover:bg-base-200 transition-colors"
                >
                  <div className="w-8 h-8 rounded-full bg-gradient-to-br from-lime-500 to-emerald-600 flex items-center justify-center text-white text-sm font-semibold">
                    {getInitials(authUser.fullName)}
                  </div>
                  <ChevronDown
                    className={`w-4 h-4 text-base-content/50 transition-transform ${
                      profileOpen ? "rotate-180" : ""
                    }`}
                  />
                </button>

                {profileOpen && (
                  <>
                    <div
                      className="fixed inset-0 z-10"
                      onClick={() => setProfileOpen(false)}
                    />
                    <div className="absolute right-0 mt-2 w-56 bg-base-100 rounded-xl shadow-lg border border-base-300 py-2 z-20">
                      <div className="px-4 py-3 border-b border-base-300">
                        <p className="font-semibold truncate">{authUser.fullName}</p>
                        <p className="text-sm text-base-content/60 truncate">
                          {authUser.email}
                        </p>
                      </div>
                      <div className="py-1">
                        <button
                          onClick={() => {
                            setProfileOpen(false);
                            logoutMutation();
                          }}
                          disabled={isLoading}
                          className="w-full flex items-center gap-3 px-4 py-2 text-error hover:bg-error/10 transition-colors"
                        >
                          {isLoading ? (
                            <span className="loading loading-spinner loading-sm" />
                          ) : (
                            <LogOut className="w-4 h-4" />
                          )}
                          <span>Logout</span>
                        </button>
                      </div>
                    </div>
                  </>
                )}
              </div>
            </div>
          )}

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 rounded-lg hover:bg-base-200 transition-colors ml-auto"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-base-300 bg-base-100">
          <div className="px-4 py-3 space-y-1">
            {navLinks.map(({ to, label }) => (
              <NavLink
                key={to}
                to={to}
                onClick={() => setMobileMenuOpen(false)}
                className={({ isActive }) =>
                  `block px-4 py-3 rounded-lg font-medium transition-all ${
                    isActive
                      ? "bg-primary/10 text-primary"
                      : "text-base-content/70 hover:bg-base-200"
                  }`
                }
              >
                {label}
              </NavLink>
            ))}
          </div>

          {authUser && (
            <div className="px-4 py-3 border-t border-base-300">
              <div className="flex items-center gap-3 px-4 py-3">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-lime-500 to-emerald-600 flex items-center justify-center text-white font-semibold">
                  {getInitials(authUser.fullName)}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-semibold truncate">{authUser.fullName}</p>
                  <p className="text-sm text-base-content/60 truncate">
                    {authUser.email}
                  </p>
                </div>
              </div>
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  logoutMutation();
                }}
                disabled={isLoading}
                className="w-full flex items-center justify-center gap-2 mt-2 px-4 py-3 rounded-lg bg-error/10 text-error font-medium hover:bg-error/20 transition-colors"
              >
                {isLoading ? (
                  <span className="loading loading-spinner loading-sm" />
                ) : (
                  <LogOut className="w-5 h-5" />
                )}
                <span>Logout</span>
              </button>
            </div>
          )}
        </div>
      )}
    </nav>
  );
};

export default Navbar;
