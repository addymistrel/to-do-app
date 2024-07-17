import React from "react";
import { Tabs, Tab } from "@nextui-org/react";
import { IoMdTime } from "react-icons/io";
import { IoCheckmarkDoneCircleSharp } from "react-icons/io5";

export default function AllToDos() {
  return (
    <div className="flex flex-col">
      <div className="flex w-full justify-center items-center pt-6">
        <Tabs
          aria-label="Options"
          color="prim"
          classNames={{
            tabList: "bg-[#333]",
          }}
          variant="bordered"
        >
          <Tab
            key="done"
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
      <div className="items-div">
        <AllToDos />
      </div>
    </div>
  );
}
