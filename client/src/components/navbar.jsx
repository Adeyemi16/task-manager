import { Avatar, AvatarImage, AvatarFallback } from "../components/ui/avatar";
import { Fragment } from "react";
import { Menu, Transition } from "@headlessui/react";
import { NavLink } from "react-router-dom";
import { Account } from "./Account";
import { useStore } from "../config/store";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}
const Navbar = () => {
  const { currentUser, logOut } = useStore();
  return (
    <nav
      className="flex lg:px-20 px-4 py-2 w-100 justify-between"
      style={{
        alignItems: "center",
        borderColor: "lightgray",
        borderStyle: "solid",
        borderWidth: "thin",
      }}
    >
      <NavLink to="/">
        <img src="../../Logo.png" alt="" className="h-9" />
      </NavLink>
      <div
        className="flex w-64 h-10 justify-evenly relative"
        style={{ alignItems: "center" }}
      >
        <NavLink to={"./new-task"}>
          <p className="lg:font-normal font-semibold text-xl lg:block hidden">New Task</p>
        </NavLink>
        <NavLink to={"./tasks"}>
          <p className="lg:font-normal font-semibold text-xl">All task</p>
        </NavLink>

        {currentUser ? (
          <Menu as="div" className="relative inline-block text-left">
            <div>
              <Menu.Button>
                <Avatar>
                  <AvatarImage
                    src={currentUser?.user?.profileImg}
                    alt={currentUser?.user?.username}
                  />
                  <AvatarFallback />
                </Avatar>
              </Menu.Button>
            </div>
            <Transition
              as={Fragment}
              enter="transition ease-out duration-100"
              enterFrom="transform opacity-0 scale-95"
              enterTo="transform opacity-100 scale-100"
              leave="transition ease-in duration-75"
              leaveFrom="transform opacity-100 scale-100"
              leaveTo="transform opacity-0 scale-95"
            >
              <Menu.Items className="absolute right-0 z-10 mt-2 w-56 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                <div className="py-1">
                  <Menu.Item>
                    {({ active }) => (
                      <NavLink to={`account/${currentUser?.user?.username}`}>
                        <a
                          className={classNames(
                            active
                              ? "bg-gray-100 text-gray-900"
                              : "text-gray-700",
                            "block px-4 py-2 text-sm"
                          )}
                        >
                          Profile
                        </a>
                      </NavLink>
                    )}
                  </Menu.Item>

                  <Menu.Item>
                    {({ active }) => (
                      <button
                        onClick={logOut}
                        className={classNames(
                          active
                            ? "bg-gray-100 text-gray-900"
                            : "text-gray-700",
                          "block w-full px-4 py-2 text-left text-sm"
                        )}
                      >
                        Sign out
                      </button>
                    )}
                  </Menu.Item>
                </div>
              </Menu.Items>
            </Transition>
          </Menu>
        ) : (
          <Account />
        )}
      </div>
    </nav>
  );
};

export default Navbar;
