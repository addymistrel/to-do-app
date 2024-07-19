import React, { useState } from "react";
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

export default function AllToDos() {
  const arr = [1, 2, 3, 4, 4, 4, 4, 4, 4, 4, 4];
  const [isFollowed, setIsFollowed] = useState(false);
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
                      20th September, 2024
                    </h4>
                  </div>
                  <Button
                    color="primary"
                    radius="full"
                    size="sm"
                    variant={isFollowed ? "bordered" : "solid"}
                    onPress={() => setIsFollowed(!isFollowed)}
                  >
                    Mark as Done
                  </Button>
                </CardHeader>
                <CardBody className="px-3 py-0 text-small text-default-400">
                  <div className="flex flex-col gap-1 items-start justify-center">
                    <h4 className="text-small font-semibold leading-none text-default-600">
                      Zoey Lang
                    </h4>
                  </div>
                  <span className="pt-2"></span>
                </CardBody>
                <CardFooter className="flex justify-end gap-3">
                  <Button
                    color="secondary"
                    radius="full"
                    size="sm"
                    variant={isFollowed ? "bordered" : "solid"}
                    onPress={() => setIsFollowed(!isFollowed)}
                  >
                    Edit
                  </Button>
                  <Button
                    color="danger"
                    radius="full"
                    size="sm"
                    variant={isFollowed ? "bordered" : "solid"}
                    onPress={() => setIsFollowed(!isFollowed)}
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
