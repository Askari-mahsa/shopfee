"use client";
import Image from "next/image";
import "swiper/css";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Navigation, Pagination } from "swiper/modules";
import { useCallback, useRef, useState } from "react";
import { useRouter } from "next/navigation";
// import "./globals.css";


export default function Onboarding() {
  const router = useRouter();
  const swiperRef = useRef(null);
  const [isLastSlide, setIsLastSlide] = useState(false);

  const handleSlideChange = useCallback(
    (swiper: { isEnd: boolean | ((prevState: boolean) => boolean) }) => {
      setIsLastSlide(swiper.isEnd);
    },
    [],
  );

  const handleNext = useCallback(() => {
    if (!swiperRef.current) return;

    if (isLastSlide) {
      router.push("/register");
    } else {
      swiperRef.current.slideNext();
    }
  }, [isLastSlide, router]);

  return (
    <div className="relative min-h-screen flex flex-col justify-between mt-16 p-4 bg-white">
      <div className="flex justify-end mb-7 mt-7 mx-7">
        <button
          onClick={() => router.push("/register")}
          className="font-poppins font-bold text-sm"
        >
          skip
        </button>
      </div>

      <div className="flex-1">
        <Swiper
          onSwiper={(swiper) => (swiperRef.current = swiper)}
          onSlideChange={handleSlideChange}
          modules={[Navigation, Pagination]}
          pagination={{ clickable: true }}
          loop={false}
        >
          <SwiperSlide>
            <div className="flex flex-col px-8">
              <Image
                src="/ilustrasi.svg"
                alt="drink"
                width={300}
                height={300}
              />
              <h2 className="font-poppins text-xl pt-4 font-bold leading-8 mb-2">
                Choose and customize your Drinks
              </h2>
              <p className="font-poppins text-base leading-6 pb-7 ">
                Customize your own drink exactly how you like it by adding any
                topping you like!
              </p>
            </div>
          </SwiperSlide>
          <SwiperSlide>
            <div className="flex flex-col p-4">
              <Image src="/watch.svg" alt="watch" width={227} height={225} className="relative justify-self-center"/>
              <h2 className="font-poppins text-xl pt-14 font-bold leading-8 mb-2">
                Quickly and easily
              </h2>
              <p className="font-poppins text-base leading-6 pb-7 ">
                You can place your order quickly and easily without wasting
                time. You can also schedule orders via your smartphone.
              </p>
            </div>
          </SwiperSlide>
          <SwiperSlide>
            <div className="flex flex-col pt-2 px-4">
              <Image src="/frame.svg" alt="frame" width={264} height={277} className="flex justify-self-center" />
              <h2 className="font-poppins text-xl pt-5 font-bold leading-8 mb-2">
                Get and Redeem Voucher
              </h2>
              <p className="font-poppins text-base leading-6  pb-7">
                Exciting prizes await you! Redeem yours by collecting all the
                points after purchase in the app!
              </p>
            </div>
          </SwiperSlide>
        
      


      <div className="flex justify-self-end   w-full max-w-[200px] px-4">
        <button
          onClick={handleNext}
          className="w-full h-12 rounded-xl bg-[#5D4037] flex items-center justify-center shadow-lg"
        >
          <span className="text-white font-poppins font-semibold text-sm flex items-center">
            {isLastSlide ? "Login / Register" : "Next"}
            <Image
              src="/arrow.svg"
              alt="arrow"
              width={16}
              height={16}
              className="mr-2"
            />
          </span>
        </button>
      </div>
      </Swiper>
      </div>
    </div>
  );
}
