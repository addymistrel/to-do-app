import React, { useState, useEffect } from "react";
import { RxHamburgerMenu } from "react-icons/rx";
import {
  Input,
  DropdownItem,
  DropdownTrigger,
  Dropdown,
  DropdownMenu,
  Avatar,
  Button,
  Image,
  Divider,
  Modal,
  RadioGroup,
  Radio,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Textarea,
  useDisclosure,
} from "@nextui-org/react";

import "./Dashboard.css";
import { MdDashboard } from "react-icons/md";
import { RiTodoFill } from "react-icons/ri";
import { MdNotificationImportant } from "react-icons/md";
import { SearchIcon } from "./SearchIcon";
import { FaPowerOff } from "react-icons/fa6";
import { SlClose } from "react-icons/sl";
import { CalendarDate, today } from "@internationalized/date";
import { IoAddSharp } from "react-icons/io5";
import useWindowWidth from "../../Hooks/useWindowWidth/useWindowWidth";
import Home from "../Home/Home";
import AllToDos from "../AllToDos/AllToDos";
import PriorityTasks from "../PriorityTasks/PriorityTasks";
import { useSnackbar } from "notistack";
import { useDispatch, useSelector } from "react-redux";

function Dashboard() {
  const { isOpen, onOpen, onClose, onOpenChange } = useDisclosure();
  const { enqueueSnackbar } = useSnackbar();
  const userData = useSelector((state) => JSON.parse(state.user.user));
  const [colorval, setColorVal] = useState("success");
  const dispatch = useDispatch();
  const width = useWindowWidth();
  const [option, setOption] = useState(1);
  const [isSidebarOpen, setSidebarOpen] = useState(true);

  const showToast = (msg, vnt) => {
    enqueueSnackbar(msg, {
      variant: vnt,
      autoHideDuration: 3000,
      anchorOrigin: {
        vertical: "top",
        horizontal: "right",
      },
    });
  };

  const toggleSidebar = () => {
    setSidebarOpen(!isSidebarOpen);
  };

  useEffect(() => {
    if (width <= 768) setSidebarOpen(false);
    else setSidebarOpen(true);
  }, [width]);

  function getOrdinalSuffix(day) {
    if (day > 3 && day < 21) return "th";
    switch (day % 10) {
      case 1:
        return "st";
      case 2:
        return "nd";
      case 3:
        return "rd";
      default:
        return "th";
    }
  }

  function getNumericDate(date) {
    const day = date.getDate();
    const month = date.getMonth() + 1;
    const year = date.getFullYear();
    return `${day}-${month < 10 ? `0${month}` : `${month}`}-${year}`;
  }
  function formatDate(date) {
    const day = date.getDate();
    const month = date.toLocaleString("en-US", { month: "long" });
    const year = date.getFullYear();

    const suffix = getOrdinalSuffix(day);
    return `${day}${suffix} ${month}, ${year}`;
  }
  // Get the current date
  const currentDate = new Date();

  // Format the current date
  const formattedDate = formatDate(currentDate);

  function generateUniqueId() {
    return Date.now().toString(36) + Math.random().toString(36).substr(2, 9);
  }

  const blankTaskData = {
    date: getNumericDate(currentDate),
    description: "",
    status: "pending",
    isPrioritized: false,
    id: generateUniqueId(),
  };

  const [taskData, setTaskData] = useState(blankTaskData);
  const [refresh, setRefresh] = useState(false);

  function isBlank(data) {
    for (const k in data) {
      if (data[k].length === 0) {
        return true;
      }
    }
    return false;
  }

  const handleAdd = async () => {
    if (isBlank(taskData)) {
      showToast("All Fields are mandatory", "warning");
    } else {
      await fetch(`http://localhost:8080/data/${userData.id}`, {
        method: "GET",
      })
        .then((res) => res.json())
        .then((data) => {
          data.todos.push(taskData);
          return fetch(`http://localhost:8080/data/${userData.id}`, {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
          });
        })
        .then((response) => response.json())
        .then((updatedUser) => {
          showToast("Successfully Added", "success");
          dispatch({
            type: "LOGIN_SUCCESS",
            payload: JSON.stringify(updatedUser),
          });
          onClose();
        })
        .catch((err) => console.log("Error:", err));
    }
  };

  return (
    <>
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
              onPress={() => {
                setOption(1);
                if (width <= 768) toggleSidebar();
              }}
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
              onPress={() => {
                setOption(2);
                if (width <= 768) toggleSidebar();
              }}
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
              onPress={() => {
                setOption(3);
                if (width <= 768) toggleSidebar();
              }}
            >
              Priority Tasks
            </Button>
          </div>
          <div className="mt-auto border-t-3">
            <div className="flex justify-between items-center pt-4 w-full">
              <h1>{userData.name}</h1>
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
              <div
                className="flex justify-end items-center hover:cursor-pointer"
                onClick={() => dispatch({ type: "LOGOUT" })}
              >
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
            {width > 768 && (
              <div>
                <Button
                  color="success"
                  endContent={<IoAddSharp />}
                  className="text-1xl text-white bg-gradient-to-r from-indigo-500 to-teal-500 "
                  onPress={() => onOpen()}
                >
                  New Todo
                </Button>
              </div>
            )}
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
                    <p className="font-semibold">{userData.email}</p>
                  </DropdownItem>
                  <DropdownItem
                    key="help_and_feedback"
                    className="bg-[#333] text-white cursor-default"
                  >
                    {userData.name}
                  </DropdownItem>
                  <DropdownItem
                    key="logout"
                    className="bg-danger text-white"
                    onClick={() => dispatch({ type: "LOGOUT" })}
                  >
                    Log Out
                  </DropdownItem>
                </DropdownMenu>
              </Dropdown>
            </div>
          </div>
          {option === 1 ? (
            <>
              {width <= 768 && (
                <div className="flex justify-center pt-6 pb-2">
                  <Button
                    color="success"
                    endContent={<IoAddSharp />}
                    className="text-1xl text-white bg-gradient-to-r from-indigo-500 to-teal-500 "
                    onPress={() => onOpen()}
                  >
                    New Todo
                  </Button>
                </div>
              )}
              <Home
                isSidebarOpen={isSidebarOpen}
                refresh={refresh}
                setRefresh={setRefresh}
              />
            </>
          ) : option == 2 ? (
            <>
              {width <= 768 && (
                <div className="flex justify-center pt-6 pb-2">
                  <Button
                    color="success"
                    endContent={<IoAddSharp />}
                    className="text-1xl text-white bg-gradient-to-r from-indigo-500 to-teal-500 "
                    onPress={() => onOpen()}
                  >
                    New Todo
                  </Button>
                </div>
              )}
              <AllToDos refresh={refresh} setRefresh={setRefresh} />
            </>
          ) : (
            <>
              {width <= 768 && (
                <div className="flex justify-center pt-6 pb-2">
                  <Button
                    color="success"
                    endContent={<IoAddSharp />}
                    className="text-1xl text-white bg-gradient-to-r from-indigo-500 to-teal-500 "
                    onPress={() => onOpen()}
                  >
                    New Todo
                  </Button>
                </div>
              )}
              <PriorityTasks refresh={refresh} setRefresh={setRefresh} />
            </>
          )}
        </div>
      </div>

      <Modal
        backdrop="opaque"
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        motionProps={{
          variants: {
            enter: {
              y: 0,
              opacity: 1,
              transition: {
                duration: 0.3,
                ease: "easeOut",
              },
            },
            exit: {
              y: -20,
              opacity: 0,
              transition: {
                duration: 0.2,
                ease: "easeIn",
              },
            },
          },
        }}
      >
        <ModalContent className="bg-[#333]">
          {(onClose) => (
            <>
              {/* <ModalHeader className="flex flex-col gap-1 text-center text-2xl text-white">
                Add a New Todo
              </ModalHeader> */}
              <ModalHeader className="flex flex-col gap-1 text-center text-2xl text-white">
                {formattedDate}
              </ModalHeader>
              <ModalBody>
                <form>
                  <label for="task" className="text-white">
                    Task Description
                  </label>
                  <Textarea
                    isRequired
                    id="task"
                    variant="bordered"
                    color="success"
                    className="pt-2 pb-3"
                    classNames={{ inputWrapper: "bg-white" }}
                    placeholder="Enter your description"
                    onChange={(e) =>
                      setTaskData((prev) => ({
                        ...prev,
                        description: e.target.value,
                      }))
                    }
                  />

                  <label for="priority" className="text-white">
                    Is this High Priority ?
                    <span style={{ color: "red" }}>*</span>
                  </label>
                  <RadioGroup
                    orientation="horizontal"
                    className="pt-3"
                    color={colorval}
                  >
                    <Radio
                      value="yes"
                      onChange={() => {
                        setColorVal("success");
                        setTaskData((prev) => ({
                          ...prev,
                          isPrioritized: true,
                        }));
                      }}
                    >
                      Yes
                    </Radio>
                    <Radio
                      value="no"
                      onChange={() => {
                        setColorVal("danger");
                        setTaskData((prev) => ({
                          ...prev,
                          isPrioritized: false,
                        }));
                      }}
                    >
                      No
                    </Radio>
                  </RadioGroup>
                </form>
              </ModalBody>
              <ModalFooter>
                <Button color="danger" variant="light" onPress={onClose}>
                  Close
                </Button>
                <Button color="primary" onPress={handleAdd}>
                  Add
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}

export default Dashboard;
