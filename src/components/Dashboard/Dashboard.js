import React, { useState, useEffect } from "react";
import { RxHamburgerMenu } from "react-icons/rx";
import {
  Input,
  DropdownItem,
  DropdownTrigger,
  Dropdown,
  Pagination,
  DropdownMenu,
  Avatar,
  Button,
  Image,
  Divider,
  Calendar,
} from "@nextui-org/react";
import "./Dashboard.css";
import { MdDashboard } from "react-icons/md";
import { RiTodoFill } from "react-icons/ri";
import { MdNotificationImportant } from "react-icons/md";
import { SearchIcon } from "./SearchIcon";
import { FaPowerOff } from "react-icons/fa6";
import { SlClose } from "react-icons/sl";
import useWindowWidth from "../../Hooks/useWindowWidth/useWindowWidth";
import Home from "../Home/Home";
import AllToDos from "../AllToDos/AllToDos";

function Dashboard() {
  const width = useWindowWidth();
  const [isSidebarOpen, setSidebarOpen] = useState(true);

  const toggleSidebar = () => {
    setSidebarOpen(!isSidebarOpen);
  };
  useEffect(() => {
    if (width <= 768) setSidebarOpen(false);
    else setSidebarOpen(true);
  }, [width]);
  return (
    <div className="dashboard-main">
      <div
        className={`${
          width > 768
            ? `${isSidebarOpen ? "sidebar" : "sidebar hide"}`
            : `${isSidebarOpen ? "sidebar" : "sidebar hide"}`
        }`}
      >
        {width <= 768 && (
          <div className="close" onClick={toggleSidebar}>
            <SlClose />
          </div>
        )}
        <div className="flex justify-center items-center flex-col">
          <h1 class="bg-clip-text text-transparent bg-gradient-to-r from-indigo-500 to-teal-500 text-5xl font-black">
            To-Do
          </h1>
          <Image width={150} alt="logo" src="/logo.png" />
        </div>
        <Divider className="my-4 h-0.5 bg-[grey]" />
        <div className="flex justify-center items-center w-full flex-col gap-4">
          <Button
            fullWidth
            color="primary"
            endContent={<MdDashboard style={{ fontSize: "130%" }} />}
            style={{
              fontSize: "110%",
              fontFamily: "font-family: 'Roboto', sans-serif",
              fontWeight: "500",
            }}
            className="flex justify-center items-center"
          >
            Dashboard
          </Button>

          <Button
            fullWidth
            color="primary"
            endContent={<RiTodoFill style={{ fontSize: "130%" }} />}
            style={{
              fontSize: "110%",
              fontFamily: "font-family: 'Roboto', sans-serif",
              fontWeight: "500",
            }}
            className="flex justify-center items-center"
          >
            All To-Dos
          </Button>

          <Button
            fullWidth
            color="primary"
            endContent={
              <MdNotificationImportant style={{ fontSize: "130%" }} />
            }
            style={{
              fontSize: "110%",
              fontFamily: "font-family: 'Roboto', sans-serif",
              fontWeight: "500",
            }}
            className="flex justify-center items-center"
          >
            Priority Tasks
          </Button>
        </div>
        <div className="mt-auto border-t-3">
          <div className="flex justify-between items-center pt-4 w-full">
            <h1>Aditya</h1>
            <Avatar
              isBordered
              as="button"
              className="transition-transform"
              color="secondary"
              name="Jason Hughes"
              size="sm"
              src="https://i.pravatar.cc/150?u=a042581f4e29026704d"
            />
            <Divider className="h-7 bg-[grey]" orientation="vertical" />
            <div className="flex justify-end items-center hover:cursor-pointer">
              <FaPowerOff
                style={{
                  fontSize: "180%",
                  color: "#EF0031",
                  fontWeight: "900",
                }}
              />
            </div>
          </div>
        </div>
      </div>
      <div
        className="main-content"
        onClick={() => {
          if (width <= 768 && isSidebarOpen) setSidebarOpen(false);
        }}
      >
        <div className="upper-nav">
          <div className="ham-menu" onClick={toggleSidebar}>
            <RxHamburgerMenu />
          </div>
          <div className="flex justify-center items-center md:w-[20rem]">
            <Input
              classNames={{
                base: "max-w-full h-10",
                mainWrapper: "h-full",
                input: "text-small",
                inputWrapper:
                  "h-full font-normal text-default-500 bg-default-400/20 dark:bg-default-500/20",
              }}
              type="search"
              placeholder="Type to search..."
              startContent={<SearchIcon size={18} />}
            />
          </div>
          <div className="profile-avatar flex justify-center items-center">
            <Dropdown placement="bottom-end">
              <DropdownTrigger>
                <Avatar
                  isBordered
                  as="button"
                  className="transition-transform"
                  color="secondary"
                  name="Jason Hughes"
                  size="sm"
                  src="https://i.pravatar.cc/150?u=a042581f4e29026704d"
                />
              </DropdownTrigger>
              <DropdownMenu aria-label="Profile Actions" variant="flat">
                <DropdownItem key="profile" className="h-14 gap-2">
                  <p className="font-semibold">Signed in as</p>
                  <p className="font-semibold">zoey@example.com</p>
                </DropdownItem>
                <DropdownItem key="settings">My Settings</DropdownItem>
                <DropdownItem key="team_settings">Team Settings</DropdownItem>
                <DropdownItem key="analytics">Analytics</DropdownItem>
                <DropdownItem key="system">System</DropdownItem>
                <DropdownItem key="configurations">Configurations</DropdownItem>
                <DropdownItem key="help_and_feedback">
                  Help & Feedback
                </DropdownItem>
                <DropdownItem key="logout" color="danger">
                  Log Out
                </DropdownItem>
              </DropdownMenu>
            </Dropdown>
          </div>
        </div>
        {/* <Home /> */}
        <AllToDos />
      </div>
    </div>
  );
}

export default Dashboard;
