import React from "react";
import "../Dashboard/Dashboard.css";
import TodoCards from "../TodoCards/TodoCards";
import { Calendar, Pagination } from "@nextui-org/react";
import useWindowWidth from "../../Hooks/useWindowWidth/useWindowWidth";

function Home() {
  const width = useWindowWidth();
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
            <TodoCards />
          </div>
          <div className="flex justify-center items-center py-3">
            <Pagination
              isCompact
              showControls
              total={3}
              initialPage={1}
              className="rounded-[10px]"
            />
          </div>
        </div>
        {width > 1228 && (
          <div className="w-1/5">
            <Calendar
              color="primary"
              aria-label="Date (Show Month and Year Picker)"
              showMonthAndYearPickers
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
            <TodoCards />
          </div>
          <div className="flex justify-center items-center py-3">
            <Pagination
              isCompact
              showControls
              total={3}
              initialPage={1}
              className="rounded-[10px]"
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;
