"use client";

import Image from "next/image";
import "../globals.css";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function Login() {
  const [error, setError] = useState("");
  const [phone, setPhone] = useState("");
  const [isPhoneFilled, setIsPhoneFilled] = useState(false);
  const router = useRouter();
  const goToRegister = () => {
    router.push("/register");
  };
  const handleChangePhone = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setPhone(value);
    setIsPhoneFilled(value.trim() !== "");
  };
  const handleLogin = () => {
    let phoneEmpty = phone.trim() === "";
    if (phoneEmpty) {
      setError("Enter your mobile number first.");
      setTimeout(() => {
        setError("");
      }, 3000);
    } else  if (phone === "emilys") {
      fetch("https://dummyjson.com/user/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          username: "emilys",
          password: "emilyspass",
          expiresInMins: 30, 
        }),
      })
        .then((res) => res.json())
        .then(console.log);
      setError("");
      alert("you logged in");
    } else {
      alert("you dont have an access");
     
    }
  };

  return (
    <div>
      <div className="mt-8 h-10 min-h-10">
        {error && (
          <p className="w-[335px] h-[40px] pl-3 top-2.5 rounded-lg flex justify-self-center items-center text-white bg-[#E33131] mb-2">
            {error}
          </p>
        )}
      </div>
      <div>
        <Image
          className="flex justify-self-center pt-30 pb-7"
          alt="logoRegister"
          src="logoregister.svg"
          width={200}
          height={100}
        />
        <div>
          <div className="py-2">
            <p className="text-[#3C3C3C] pl-7 font-xs font-normal font-poppine pb-1">
              No.Handphone
            </p>
            <input
              onChange={handleChangePhone}
              placeholder="Input your No.Handphone"
              type="string"
              value={phone}
              className=" pl-4 focus:outline-none focus:border-[#5D4037]  focus:shadow-[0px_0px_4px_0px_#9F4A00] placeholder-[#8A8A8A]  flex justify-self-center border-1 border-[#D0D0D0] rounded-2xl py-4 text-[#8A8A8A] font-normal text-sm font-poppins w-[335px] h-[48px]"
            ></input>
          </div>
        </div>

        <button
          onClick={handleLogin}
          className={`mt-3 flex justify-self-center rounded-2xl font-medium text-sm w-[335px] ${
            isPhoneFilled
              ? "bg-[#5D4037] text-white"
              : "bg-[#CACACA] text-[#FFFFFF80]"
          }`}
        >
          <p className="flex justify-center py-4 px-35">Login</p>
        </button>

        <div className="flex justify-center">
          <p className="w-[250px] h-[20px] text-[#555555] font-medium text-sm font-poppine  py-4 fixed bottom-[56px] mx-[80px] ">
            Don’t have an account?{" "}
            <span onClick={goToRegister} className="text-[#5D4037]">
              Register
            </span>
          </p>
        </div>
      </div>
    </div>
  );
}
