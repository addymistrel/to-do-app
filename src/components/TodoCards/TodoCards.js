import React, { useEffect, useState } from "react";
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Avatar,
  Modal,
  RadioGroup,
  Radio,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Textarea,
  useDisclosure,
  Button,
} from "@nextui-org/react";
import { useDispatch, useSelector } from "react-redux";
import { MdPriorityHigh } from "react-icons/md";
import { useSnackbar } from "notistack";

export default function TodoCards({
  currentPage,
  pageSize,
  todoData,
  status,
  refresh,
  setRefresh,
}) {
  const dispatch = useDispatch();
  const userData = useSelector((state) => JSON.parse(state.user.user));
  const { enqueueSnackbar } = useSnackbar();
  const { isOpen, onOpen, onClose, onOpenChange } = useDisclosure();
  const [colorval, setColorVal] = useState("success");
  const paginate = (arr, pageNumber, pageSize) => {
    const startIndex = (pageNumber - 1) * pageSize;
    return arr.slice(startIndex, startIndex + pageSize);
  };
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

  const currentData = paginate(todoData, currentPage, pageSize);

  function formatDate(dateStr) {
    const months = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];
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

    const [dayStr, monthStr, yearStr] = dateStr.split("-");
    const day = parseInt(dayStr, 10);
    const month = parseInt(monthStr, 10) - 1;
    const year = parseInt(yearStr, 10);

    const suffix = getOrdinalSuffix(day);
    return `${day}${suffix} ${months[month]}, ${year}`;
  }

  const [editData, setEditData] = useState({
    date: "",
    description: "",
    status: "",
    isPrioritized: "",
    id: "",
  });

  function updateTaskById(tasks, id, newContent) {
    return tasks.map((task) =>
      task.id === id ? { ...task, ...newContent } : task
    );
  }

  function isBlank(data) {
    for (const k in data) {
      if (data[k].length === 0) {
        return true;
      }
    }
    return false;
  }

  function deleteTaskById(tasks, id) {
    return tasks.filter((task) => task.id !== id);
  }

  const [action, setAction] = useState("edit");

  const handleUpdate = async () => {
    if (isBlank(editData)) {
      showToast("All Fields are Mandatory", "warning");
    } else {
      await fetch(`${process.env.REACT_APP_BACKEND_URL}/data/${userData.id}`, {
        method: "GET",
      })
        .then((res) => res.json())
        .then((data) => {
          data.todos =
            action === "delete"
              ? deleteTaskById(data.todos, editData.id)
              : updateTaskById(data.todos, editData.id, editData);
          console.log(data);
          return fetch(
            `${process.env.REACT_APP_BACKEND_URL}/data/${userData.id}`,
            {
              method: "PUT",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify(data),
            }
          );
        })
        .then((response) => response.json())
        .then((updatedUser) => {
          showToast("Successfully Updated", "success");
          dispatch({
            type: "LOGIN_SUCCESS",
            payload: JSON.stringify(updatedUser),
          });
          onClose();
          setRefresh(!refresh);
        })
        .catch((err) => console.log("Error:", err));
    }
  };

  async function handleDone(item) {
    item.status = "completed";
    await fetch(`${process.env.REACT_APP_BACKEND_URL}/data/${userData.id}`, {
      method: "GET",
    })
      .then((res) => res.json())
      .then((data) => {
        data.todos = updateTaskById(data.todos, item.id, item);
        console.log(data);
        return fetch(
          `${process.env.REACT_APP_BACKEND_URL}/data/${userData.id}`,
          {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
          }
        );
      })
      .then((response) => response.json())
      .then((updatedUser) => {
        showToast("Successfully Updated", "success");
        dispatch({
          type: "LOGIN_SUCCESS",
          payload: JSON.stringify(updatedUser),
        });
        onClose();
        setRefresh(!refresh);
      })
      .catch((err) => console.log("Error:", err));
  }

  return (
    <>
      {currentData.map((item) => {
        return (
          <Card className="w-[340px]">
            <CardHeader className="justify-between">
              <div className="flex gap-5">
                <Avatar
                  isBordered
                  radius="full"
                  size="md"
                  src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTeeqq5bu1g9ATW_JOPSWo2AbOV2j0OdVFG8A&s"
                />
              </div>
              <div className="flex flex-col gap-1 items-start justify-center">
                <h4 className="text-1xl font-semibold leading-none text-default-600">
                  {formatDate(item.date)}
                </h4>
              </div>
              {status === "pending" ? (
                <Button
                  color="primary"
                  radius="full"
                  size="sm"
                  variant="solid"
                  onPress={() => {
                    setAction("done");
                    item.status = "completed";
                    handleDone(item);
                  }}
                >
                  Mark as Done
                </Button>
              ) : (
                <Button color="success" radius="full" size="sm" variant="solid">
                  Completed
                </Button>
              )}
            </CardHeader>
            <CardBody className="px-3 py-0 text-small text-default-400">
              <div className="flex flex-col gap-1 items-start justify-center">
                <h4 className="text-small font-semibold leading-none text-default-600">
                  {item.description}
                </h4>
              </div>
              <span className="pt-2"></span>
            </CardBody>
            <CardFooter className="flex justify-end gap-3">
              {item.isPrioritized === true && (
                <Button
                  color="warning"
                  radius="full"
                  size="sm"
                  variant="solid"
                  className="text-1.5xl"
                >
                  <MdPriorityHigh />
                </Button>
              )}
              {status === "pending" && (
                <Button
                  color="secondary"
                  radius="full"
                  size="sm"
                  variant="solid"
                  onPress={() => {
                    setAction("edit");
                    setEditData(item);
                    onOpen();
                  }}
                >
                  Edit
                </Button>
              )}
              <Button
                color="danger"
                radius="full"
                size="sm"
                variant="solid"
                onPress={() => {
                  setAction("delete");
                  setEditData(item);
                  onOpen();
                }}
              >
                Delete
              </Button>
            </CardFooter>
          </Card>
        );
      })}

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
              {action === "edit" ? (
                <>
                  {/* <ModalHeader className="flex flex-col gap-1 text-center text-2xl text-white">
                Add a New Todo
              </ModalHeader> */}
                  <ModalHeader className="flex flex-col gap-1 text-center text-2xl text-white">
                    {formatDate(editData.date)}
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
                        defaultValue={editData.description}
                        classNames={{ inputWrapper: "bg-white" }}
                        placeholder="Enter your description"
                        onChange={(e) =>
                          setEditData((prev) => ({
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
                        defaultValue={editData.isPrioritized ? "yes" : "no"}
                      >
                        <Radio
                          value="yes"
                          onChange={() => {
                            setColorVal("success");
                            setEditData((prev) => ({
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
                            setEditData((prev) => ({
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
                    <Button color="primary" onPress={handleUpdate}>
                      Update
                    </Button>
                  </ModalFooter>
                </>
              ) : (
                <>
                  <ModalHeader className="flex flex-col gap-1 text-center text-2xl text-white">
                    Delete this Task ?
                  </ModalHeader>
                  <ModalBody>
                    <div className="flex justify-center gap-6">
                      <Button color="danger" onPress={handleUpdate}>
                        Yes
                      </Button>
                      <Button color="success" onPress={onClose}>
                        No
                      </Button>
                    </div>
                  </ModalBody>
                </>
              )}
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}
