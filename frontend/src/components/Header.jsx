import React, { useState, useRef, useEffect } from "react";
import { Dropdown, DropdownItem } from "./features/Dropdowns";
import Input from "./common/forms/Input";
import { Avatar, Badge } from "./features/Avatar";

function Header({ toggleSidebar }) {
  const [isNotificationsMenuOpen, setIsNotificationsMenuOpen] = useState(false);
  const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false);

  const notificationsRef = useRef(null);
  const profileRef = useRef(null);

  useEffect(() => {
    function handleClickOutside(event) {
      if (
        notificationsRef.current &&
        !notificationsRef.current.contains(event.target)
      ) {
        setIsNotificationsMenuOpen(false);
      }
      if (profileRef.current && !profileRef.current.contains(event.target)) {
        setIsProfileMenuOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  function handleNotificationsClick() {
    setIsNotificationsMenuOpen(!isNotificationsMenuOpen);
  }

  function handleProfileClick() {
    setIsProfileMenuOpen(!isProfileMenuOpen);
  }

  return (
    <header className="bg-white shadow-sm">
      <div className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <button
              className="text-gray-500 focus:outline-none lg:hidden"
              onClick={toggleSidebar}
            >
              <svg
                className="h-6 w-6"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M4 6H20M4 12H20M4 18H11"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>

            <div className="relative mx-4 lg:mx-0">
              <span className="absolute inset-y-0 left-0 pl-3 flex items-center">
                <svg
                  className="h-5 w-5 text-gray-500"
                  viewBox="0 0 24 24"
                  fill="none"
                >
                  <path
                    d="M21 21L15 15M17 10C17 13.866 13.866 17 10 17C6.13401 17 3 13.866 3 10C3 6.13401 6.13401 3 10 3C13.866 3 17 6.13401 17 10Z"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </span>

              <Input
                className="form-input w-32 sm:w-64 rounded-md pl-10 pr-4 focus:border-indigo-600"
                type="text"
                placeholder="Search"
              />
            </div>
          </div>

          <div className="flex items-center">
            <div className="relative" ref={notificationsRef}>
              <button
                className="flex mx-4 text-gray-600 focus:outline-none"
                onClick={handleNotificationsClick}
              >
                <svg
                  className="h-6 w-6"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M15 17H20L18.5951 15.5951C18.2141 15.2141 18 14.6973 18 14.1585V11C18 8.38757 16.3304 6.16509 14 5.34142V5C14 3.89543 13.1046 3 12 3C10.8954 3 10 3.89543 10 5V5.34142C7.66962 6.16509 6 8.38757 6 11V14.1585C6 14.6973 5.78595 15.2141 5.40493 15.5951L4 17H9M15 17V18C15 19.6569 13.6569 21 12 21C10.3431 21 9 19.6569 9 18V17M15 17H9"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </button>

              <Dropdown
                align="right"
                isOpen={isNotificationsMenuOpen}
                onClose={() => setIsNotificationsMenuOpen(false)}
              >
                <DropdownItem onClick={() => alert("Messages!")}>
                  <span>Messages</span>
                  <Badge type="danger">13</Badge>
                </DropdownItem>
                <DropdownItem onClick={() => alert("Sales!")}>
                  <span>Sales</span>
                  <Badge type="danger">2</Badge>
                </DropdownItem>
                <DropdownItem onClick={() => alert("Alerts!")}>
                  <span>Alerts</span>
                </DropdownItem>
              </Dropdown>
            </div>

            <div className="relative" ref={profileRef}>
              <button
                className="relative z-10 block h-8 w-8 rounded-full overflow-hidden shadow focus:outline-none"
                onClick={handleProfileClick}
              >
                <Avatar
                  className="h-full w-full object-cover"
                  src="https://images.unsplash.com/photo-1502378735452-bc7d86632805?ixlib=rb-0.3.5&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=200&fit=max&s=aa3a807e1bbdfd4364d1f449eaa96d82"
                  alt="Your avatar"
                />
              </button>

              <Dropdown
                align="right"
                isOpen={isProfileMenuOpen}
                onClose={() => setIsProfileMenuOpen(false)}
              >
                <DropdownItem onClick={() => alert("Profile!")}>
                  <span>Profile</span>
                </DropdownItem>
                <DropdownItem onClick={() => alert("Settings!")}>
                  <span>Settings</span>
                </DropdownItem>
                <DropdownItem onClick={() => alert("Log out!")}>
                  <span>Log out</span>
                </DropdownItem>
              </Dropdown>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}

export default Header;
