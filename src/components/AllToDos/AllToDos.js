import React, { useEffect, useState } from "react";
import {
  Tabs,
  Tab,
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Avatar,
  Button,
} from "@nextui-org/react";
import { IoMdTime } from "react-icons/io";
import { IoCheckmarkDoneCircleSharp } from "react-icons/io5";
import "../Dashboard/Dashboard.css";
import { useSelector } from "react-redux";

export default function AllToDos() {
  const allData = useSelector((state) => JSON.parse(state.user.user)).todos;
  const [arr, setArr] = useState(
    allData.filter((item) => item.status === "completed")
  );
  const [selected, setSelected] = useState("completed");

  useEffect(() => {
    if (selected === "completed")
      setArr(allData.filter((item) => item.status === "completed"));
    if (selected === "pending")
      setArr(allData.filter((item) => item.status === "pending"));
  }, [selected]);

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

  return (
    <div className="flex flex-col">
      <div className="flex w-full justify-center items-center pt-6">
        <Tabs
          aria-label="Options"
          color="prim"
          selectedKey={selected}
          classNames={{
            tabList: "bg-[#333]",
          }}
          variant="bordered"
          onSelectionChange={setSelected}
        >
          <Tab
            key="completed"
            title={
              <div className="flex items-center space-x-2">
                <IoCheckmarkDoneCircleSharp
                  style={{ fontSize: "x-large", color: "#006fee" }}
                />
                <span>Completed</span>
              </div>
            }
          />
          <Tab
            key="pending"
            title={
              <div className="flex items-center space-x-2">
                <IoMdTime style={{ fontSize: "x-large", color: "#EF0031" }} />
                <span>Pending</span>
              </div>
            }
          />
        </Tabs>
      </div>
      <div className="envelope-div">
        <div className="items-div">
          {arr.map((item) => {
            return (
              <Card className="w-[340px]">
                <CardHeader className="justify-between">
                  <div className="flex gap-5">
                    <Avatar
                      isBordered
                      radius="full"
                      size="md"
                      src="https://nextui.org/avatars/avatar-1.png"
                    />
                  </div>
                  <div className="flex flex-col gap-1 items-start justify-center">
                    <h4 className="text-1xl font-semibold leading-none text-default-600">
                      {formatDate(item.date)}
                    </h4>
                  </div>
                  {selected === "completed" ? (
                    <Button
                      color="success"
                      radius="full"
                      size="sm"
                      variant="solid"
                    >
                      Completed
                    </Button>
                  ) : (
                    <Button
                      color="primary"
                      radius="full"
                      size="sm"
                      variant="solid"
                    >
                      Mark as Done
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
                  {/* {item.isPrioritized === true && (
                    <Button
                      color="warning"
                      radius="full"
                      size="sm"
                      variant="solid"
                    >
                      Prioritize
                    </Button>
                  )} */}
                  {selected === "pending" && (
                    <Button
                      color="secondary"
                      radius="full"
                      size="sm"
                      variant="solid"
                    >
                      Edit
                    </Button>
                  )}
                  <Button
                    color="danger"
                    radius="full"
                    size="sm"
                    variant="solid"
                  >
                    Delete
                  </Button>
                </CardFooter>
              </Card>
            );
          })}
        </div>
      </div>
    </div>
  );
}
