"use client";
import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { useEffect, useRef, useState } from "react";
import { useInfiniteQuery } from "@tanstack/react-query";

type Tab = "Coffee" | "Non Coffee" | "Pastry";
type ButtonName = "Filter" | "Rating 4.5+" | "Price" | "Promo";

const fetchProducts = async ({ pageParam = 10 }) => {
  const limit = 10;
  const res = await fetch(
    `https://dummyjson.com/products?limit=${limit}&skip=${pageParam}&select=title,price`,
  );
  console.log("res server", res);
  if (!res.ok) {
    throw new Error("Network response was not ok");
  }
  const data = res.json();
  return data;
};
export default function Home() {
  const {
    data,
    fetchNextPage,
    hasNextPage,
    isLoading,
    isFetchingNextPage,
    error,
  } = useInfiniteQuery({
    queryKey: ["products"],
    queryFn: ({ pageParam = 0 }) => fetchProducts({ pageParam }),
    getNextPageParam: (lastPage, allPages) => {
      if (lastPage.products.length < 2) return undefined;
      return allPages.length * 2;
    },
  });

  const options: ButtonName[] = ["Filter", "Rating 4.5+", "Price", "Promo"];
  const [activeTab, setActiveTab] = useState<Tab>("Non Coffee");
  const handleClick = (tab: Tab) => {
    setActiveTab(tab);
  };
  const [selectedButtons, setSelectedButtons] = useState<ButtonName[]>([]);
  const toggleButton = (name: ButtonName) => {
    setSelectedButtons((prev) => {
      if (prev.includes(name)) {
        return prev.filter((n) => n !== name);
      } else {
        return [...prev, name];
      }
    });
  };
  const loadMoreRef = useRef<HTMLDivElement | null>(null);
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && hasNextPage && !isFetchingNextPage) {
          fetchNextPage();
        }
      },
      { threshold: 1 },
    );

    if (loadMoreRef.current) observer.observe(loadMoreRef.current);

    return () => {
      if (loadMoreRef.current) observer.unobserve(loadMoreRef.current);
    };
  }, [fetchNextPage, hasNextPage, isFetchingNextPage]);

  return (
    <div className="">
      <div className="flex top-7 mt-12 mx-5">
        <div className="flex rounded-2xl w-[294px] h-[40px] border-[#D7CCC8] border-2 mx-3 ">
          <div className="font-display font-normal text-xs py-2 pl-3 text-[#CACACA] top-7">
            what would you like to drink today?
            <Image
              className="inline-flex ml-7 "
              width={24}
              height={24}
              alt="search"
              src="search.svg"
            />
          </div>
        </div>
        <Image
          className="inline-flex"
          width={24}
          height={24}
          alt="search"
          src="bell.svg"
        />
      </div>

      <div>
        <Swiper
          // modules={[Autoplay]}
          //  onSlideChange={handleSlideChange}
          modules={[Navigation, Pagination, Autoplay]}
          autoplay={{
            delay: 3000,
            disableOnInteraction: false,
          }}
          pagination={{ clickable: true }}
          loop={true}
        >
          <SwiperSlide>
            <div>
              <Image
                className="flex justify-self-center my-4 mx-5"
                width={334}
                height={137}
                alt="slider0"
                src="promo.svg"
              />
            </div>
          </SwiperSlide>
          <SwiperSlide>
            <div>
              <Image
                className="flex justify-self-center my-4 mx-5"
                width={334}
                height={137}
                alt="slider1"
                src="promo.svg"
              />
            </div>
          </SwiperSlide>{" "}
          <SwiperSlide>
            <div>
              <Image
                className="flex justify-self-center my-4 mx-5"
                width={334}
                height={137}
                alt="slider2"
                src="promo.svg"
              />
            </div>
          </SwiperSlide>{" "}
          <SwiperSlide>
            <div>
              <Image
                className="flex justify-self-center my-4 mx-5"
                width={334}
                height={137}
                alt="slider3"
                src="promo.svg"
              />
            </div>
          </SwiperSlide>
        </Swiper>
      </div>
      <div>
        <div className="flex justify-center ">
          <div className="text-sm font-medium text-center text-[#CACACA] border-b border-gray-200">
            <ul className="flex flex-wrap -mb-px">
              <li className="me-2">
                <a
                  href="#"
                  className={`inline-block p-4 font-medium text-base border-b-3 rounded-t-lg ${
                    activeTab === "Coffee"
                      ? "border-[#5D4037] text-[#5D4037]"
                      : "border-transparent hover:text-gray-600 hover:border-gray-300"
                  }`}
                  onClick={(e) => {
                    e.preventDefault();
                    handleClick("Coffee");
                  }}
                >
                  Coffee
                </a>
              </li>
              <li className="me-2">
                <a
                  href="#"
                  onClick={(e) => {
                    e.preventDefault();
                    handleClick("Non Coffee");
                  }}
                  className={`inline-block p-4 font-medium text-base border-b-3 rounded-t-lg ${
                    activeTab === "Non Coffee"
                      ? "border-[#5D4037] text-[#5D4037]"
                      : "border-transparent hover:text-gray-600 hover:border-gray-300"
                  }`}
                  aria-current={activeTab === "Non Coffee" ? "page" : undefined}
                >
                  Non Coffee
                </a>
              </li>
              <li className="me-2">
                <a
                  href="#"
                  className={`inline-block p-4 font-medium text-base border-b-3 rounded-t-lg ${
                    activeTab === "Pastry"
                      ? "border-[#5D4037] text-[#5D4037]"
                      : "border-transparent hover:text-gray-600 hover:border-gray-300"
                  }`}
                  onClick={(e) => {
                    e.preventDefault();
                    handleClick("Pastry");
                  }}
                >
                  Pastry
                </a>
              </li>
            </ul>
          </div>
        </div>
        <div className=" overflow-y whitespace-nowrap pt-3 px-5 ">
          {options.map((option) => {
            const isActive = selectedButtons.includes(option);
            return (
              <button
                key={option}
                onClick={() => toggleButton(option)}
                className="m-1 rounded-xl "
                style={{
                  padding: "8px 16px",
                  backgroundColor: isActive ? "#5D4037" : "#EFEBE9",
                  color: isActive ? "#fff" : "#000",
                }}
              >
                {option}
              </button>
            );
          })}
        </div>
        <div className="h-[400px] mx-5 mt-4 ">
          <div className=" h-[400px] overflow-y-scroll flex-nowrap">
            {data?.pages.map((page, i) => (
              <div>
                {page.products.map((product: any) => (
                  <div className="flex py-3">
                    <div className="block justify-items-center bg-[#56483C0D] w-[66px] h-[69px] rounded-full">
                      <Image
                        alt="ice coffee"
                        src="ice.svg"
                        width={58}
                        height={69}
                      />
                      <div className="flex bg-white w-[43px] h-[20px] rounded-xl shadow py-0.5 px-1">
                        <Image
                          alt="yellow star"
                          src="y-star.svg"
                          width={12}
                          height={11}
                        />
                        <p className="flex justify-center font-display font-bold text-xs text-[#3C3C3C] ">
                          4.9
                        </p>
                      </div>
                    </div>
                    <div className="flex justify-around">
                      <div className="flex-wrap pl-2 grid content-evenly">
                        <p className=" font-display text-sm font-medium text-[#555555]">
                          {product.title}
                        </p>
                        <p className="font-display text-xs font-normal text-[#555555]">
                          Ice americano
                        </p>
                      </div>
                      <p className=" flex left-0 pt-2 font-display text-sm font-medium text-[#3C3C3C]">
                        {product.price}
                      </p>
                    </div>
                  </div>
                ))}
                <div
                  className=" overflow-y-scroll overflow-x-hidden w-full max-w-full"
                  ref={loadMoreRef}
                >
                  {isFetchingNextPage ? "Loading" : ""}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className=" fixed bottom-0 bg-white w-[400px] h-[94px] shadow-2xl border-1 border-[#cecccc] rounded-t-2xl">
        <ul className="pt-5 flex flex-wrap justify-around -mb-px text-sm font-medium text-center text-gray-500">
          <li className="">
            <a className=" items-center justify-center  border-b-2 border-transparent rounded-t-lg hover:text-gray-600 hover:border-gray-300">
              <Image
                className=" justify-self-center flex"
                width={24}
                height={24}
                alt="Home"
                src="home.svg"
              />
              Home
            </a>
          </li>
          <li className="">
            <a
              className="items-center justify-center  border-b-2 border-transparent rounded-t-lg hover:text-gray-600 hover:border-gray-300"
              aria-current="page"
            >
              <Image
                className="justify-self-center flex"
                width={24}
                height={24}
                alt="History"
                src="order.svg"
              />
              History
            </a>
          </li>
          <li className="">
            <a className=" items-center justify-center   border-b-2 border-transparent rounded-t-lg hover:text-gray-600 hover:border-gray-300">
              <Image
                className=" justify-self-center flex"
                width={24}
                height={24}
                alt="Account"
                src="user.svg"
              />
              Account
            </a>
          </li>
        </ul>
      </div>
    </div>
  );
}
