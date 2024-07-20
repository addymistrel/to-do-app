import React, { useState } from "react";
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Avatar,
  Button,
} from "@nextui-org/react";
import "../Dashboard/Dashboard.css";
import { useSelector } from "react-redux";

export default function PriorityTasks() {
  const arr = useSelector((state) => JSON.parse(state.user.user)).todos.filter(
    (item) => item.isPrioritized === true
  );
  const [isFollowed, setIsFollowed] = useState(false);
  return (
    <div className="flex flex-col">
      <div className="envelope-div" style={{ height: "90vh" }}>
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
                  {item.status === "pending" ? (
                    <Button
                      color="primary"
                      radius="full"
                      size="sm"
                      variant={isFollowed ? "bordered" : "solid"}
                      onPress={() => setIsFollowed(!isFollowed)}
                    >
                      Mark as Done
                    </Button>
                  ) : (
                    <Button
                      color="success"
                      radius="full"
                      size="sm"
                      variant={isFollowed ? "bordered" : "solid"}
                      onPress={() => setIsFollowed(!isFollowed)}
                    >
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
                  {item.status === "pending" && (
                    <Button
                      color="secondary"
                      radius="full"
                      size="sm"
                      variant={isFollowed ? "bordered" : "solid"}
                      onPress={() => setIsFollowed(!isFollowed)}
                    >
                      Edit
                    </Button>
                  )}
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
