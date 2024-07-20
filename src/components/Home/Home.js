import React, { useEffect, useState } from "react";
import "../Dashboard/Dashboard.css";
import TodoCards from "../TodoCards/TodoCards";
import { Calendar, Pagination } from "@nextui-org/react";
import { today, getLocalTimeZone } from "@internationalized/date";
import useWindowWidth from "../../Hooks/useWindowWidth/useWindowWidth";
import { useSelector } from "react-redux";

function Home({ isSidebarOpen, refresh, setRefresh }) {
  const width = useWindowWidth();
  const allData = useSelector((state) => JSON.parse(state.user.user)).todos;
  const [date, setDate] = useState(today(getLocalTimeZone()));

  //For Pending Section
  const todoData_pending = allData.filter((item) => item.status === "pending");
  const [totalPages_pending, setTotalPage_pending] = useState(
    Math.ceil(todoData_pending.length / 2)
  );
  const [currentPage_pending, setCurrentPage_pending] = useState(1);
  const [pageSize_pending, setPageSize_pending] = useState(2);

  useEffect(() => {
    if (width > 768) {
      if (isSidebarOpen) {
        if (width <= 1040) {
          setTotalPage_pending(Math.ceil(todoData_pending.length / 1));
          setPageSize_pending(1);
        }
        if (width > 1040) {
          setTotalPage_pending(Math.ceil(todoData_pending.length / 2));
          setPageSize_pending(2);
        }
      } else {
        if (width >= 1120 && width <= 1227) {
          setTotalPage_pending(Math.ceil(todoData_pending.length / 3));
          setPageSize_pending(3);
        } else {
          setTotalPage_pending(Math.ceil(todoData_pending.length / 2));
          setPageSize_pending(2);
        }
      }
    } else {
      setTotalPage_pending(Math.ceil(todoData_pending.length / 1));
      setPageSize_pending(1);
    }
  }, [width, isSidebarOpen, allData.length]);

  //For Completed Section
  const todoData_completed = allData.filter(
    (item) => item.status === "completed"
  );
  const [totalPages_completed, setTotalPage_completed] = useState(
    Math.ceil(todoData_completed.length / 2)
  );
  const [currentPage_completed, setCurrentPage_completed] = useState(1);
  const [pageSize_completed, setPageSize_completed] = useState(3);

  useEffect(() => {
    if (width > 768) {
      if (isSidebarOpen) {
        if (width <= 1040) {
          setTotalPage_completed(Math.ceil(todoData_completed.length / 1));
          setPageSize_completed(1);
        } else if (width > 1040 && width < 1357) {
          setTotalPage_completed(Math.ceil(todoData_completed.length / 2));
          setPageSize_completed(2);
        } else if (width >= 1357) {
          setTotalPage_completed(Math.ceil(todoData_completed.length / 3));
          setPageSize_completed(3);
        }
      } else {
        if (width >= 1120) {
          setTotalPage_completed(Math.ceil(todoData_completed.length / 3));
          setPageSize_completed(3);
        } else if (width < 1120) {
          setTotalPage_completed(Math.ceil(todoData_completed.length / 2));
          setPageSize_completed(2);
        }
      }
    } else {
      setTotalPage_completed(Math.ceil(todoData_completed.length / 1));
      setPageSize_completed(1);
    }
  }, [width, isSidebarOpen, refresh]);

  console.log("Hi", isSidebarOpen);

  const handlePageChange_pending = (page) => {
    setCurrentPage_pending(page);
  };

  const handlePageChange_completed = (page) => {
    setCurrentPage_completed(page);
  };

  return (
    <div className="main-work">
      <h1 class="text-3xl font-normal font-semibold leading-normal mt-0 mb-2 text-[#EF0031]">
        Pending
      </h1>
      <div className="flex">
        <div
          className={`flex ${
            width >= 1228 ? "w-4/5" : "w-full"
          } flex-col gap-4 bg-[#333] pt-6 rounded-xl md:mr-5 lg:mr-5`}
        >
          <div className="flex justify-around px-3">
            <TodoCards
              currentPage={currentPage_pending}
              pageSize={pageSize_pending}
              refresh={refresh}
              setRefresh={setRefresh}
              todoData={todoData_pending}
              status={"pending"}
            />
          </div>
          <div className="flex justify-center items-center py-3">
            <Pagination
              isCompact
              showControls
              total={totalPages_pending}
              initialPage={currentPage_pending}
              className="rounded-[10px]"
              onChange={handlePageChange_pending}
            />
          </div>
        </div>
        {width > 1228 && (
          <div className="w-1/5">
            <Calendar
              color="primary"
              aria-label="Date (Show Month and Year Picker)"
              showMonthAndYearPickers
              defaultValue={date}
            />
          </div>
        )}
      </div>
      <h1 class="text-3xl font-normal font-semibold leading-normal mt-2 mb-2 text-[#006fee]">
        Completed
      </h1>
      <div className="flex ">
        <div
          className="flex w-full
              flex-col gap-4 bg-[#333] pt-6 rounded-xl md:mr-5 lg:mr-5"
        >
          <div className="flex justify-around">
            <TodoCards
              currentPage={currentPage_completed}
              pageSize={pageSize_completed}
              todoData={todoData_completed}
              status={"completed"}
            />
          </div>
          <div className="flex justify-center items-center py-3">
            <Pagination
              isCompact
              showControls
              total={totalPages_completed}
              initialPage={currentPage_completed}
              className="rounded-[10px]"
              onChange={handlePageChange_completed}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;
