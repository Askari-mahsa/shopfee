"use client";

import Image from "next/image";
import "../globals.css";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function Register() {
  const router = useRouter();

  const goToLogin = () => {
    router.push("/login");
  };

  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [error, setError] = useState("");
  const [showErrors, setShowErrors] = useState(false);
  const [isFeildsFilled, setIsFeildsFilled] = useState(false);

  const [fieldError, setFieldError] = useState<{
    name?: boolean;
    phone?: boolean;
  }>({});
  const handleChangeName = (e: React.ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value);
    if (fieldError.name && e.target.value.trim() !== "") {
      setFieldError((prev) => ({ ...prev, name: false }));
    }
    setIsFeildsFilled(e.target.value.trim() !== "");
  };

  const handleChangePhone = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPhone(e.target.value);
    if (fieldError.phone && e.target.value.trim() !== "") {
      setFieldError((prev) => ({ ...prev, phone: false }));
    }
    setIsFeildsFilled(e.target.value.trim() !== "");
  };
  const handleRegister = () => {
    let nameEmpty = name.trim() === "";
    let phoneEmpty = phone.trim() === "";
    if (!name && !phone) {
      setError("Enter your mobile number first.");
      setTimeout(() => {
        setError("");
      }, 3000);
    } else if (!name || !phone) {
      setFieldError({
        name: nameEmpty,
        phone: phoneEmpty,
      });
      setShowErrors(true);
    } else {
      fetch("https://dummyjson.com/users/add", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          firstName: name,
          lastName: phone,
          age: 25,
          /* other user data */
        }),
      })
        .then((res) => res.json())
        .then(console.log);
      setError("");

      alert("you registered!");
    }
  };

  return (
    <div>
      <div className=" mt-8 h-10 min-h-10">
        {error && (
          <p className=" w-[335px] h-[40px] pl-3 top-2.5 rounded-lg flex justify-self-center items-center text-white bg-[#E33131] mb-2">
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
          <div>
            <p className="text-[#3C3C3C] pl-7 font-xs font-normal font-poppine pb-1">
              Name
            </p>

            <input
              placeholder="Input your name"
              type="text"
              value={name}
              onChange={handleChangeName}
              className={`pl-4 focus:outline-none focus:border-[#5D4037]  focus:shadow-[0px_0px_4px_0px_#9F4A00] placeholder-[#8A8A8A]  flex justify-self-center border-1 border-[#D0D0D0] rounded-2xl py-4 text-[#8A8A8A] font-normal text-sm font-poppins w-[335px] h-[48px] ${
                fieldError.name ? "border-red-500" : ""
              }`}
            ></input>
            <span
              className={`${
                showErrors && fieldError.name
                  ? "text-red-500 text-sm ml-9"
                  : "hidden"
              }`}
            >
              Please fill this section
            </span>
          </div>
          <div className="py-2">
            <p className="text-[#3C3C3C] pl-7 font-xs font-normal font-poppine pb-1">
              No.Handphone
            </p>
            <input
              placeholder="Input your No.Handphone"
              type="tel"
              value={phone}
              onChange={handleChangePhone}
              className={`pl-4 focus:outline-none focus:border-[#5D4037]  focus:shadow-[0px_0px_4px_0px_#9F4A00] placeholder-[#8A8A8A]  flex justify-self-center border-1 border-[#D0D0D0] rounded-2xl py-4 text-[#8A8A8A] font-normal text-sm font-poppins w-[335px] h-[48px] ${
                fieldError.phone ? "border-red-500" : ""
              }`}
            ></input>
            <span
              className={`${
                showErrors && fieldError.phone
                  ? "text-red-500 text-sm ml-9"
                  : "hidden"
              }`}
            >
              Please fill this section
            </span>
          </div>
        </div>
        <div>
          <p className="block  py-4  justify-self-center w-[232px] h-[36px] text-[#7C7C7C] text-xs font-normal font-poppine ">
            By tapping "Register" you agree to our
            <span className="text-[#032172]">Terms of Use</span> and
            <span className="text-[#032172]"> Privacy Policy </span>
          </p>

          <button
            onClick={handleRegister}
            className={`mt-10 flex justify-self-center rounded-2xl font-medium text-sm w-[335px] ${
              name.trim() !== "" && phone.trim() !== ""
                ? "bg-[#5D4037] text-white cursor-pointer"
                : "bg-[#CACACA] text-[#FFFFFF80] cursor-not-allowed"
            }`}
          >
            <p className="flex justify-center py-4 px-35">Register</p>
          </button>
        </div>
        <div>
          <p className="w-[170px] h-[20px] text-[#555555] font-medium text-sm font-poppine  justify-self-center py-4 fixed bottom-[56px] mx-[112px] ">
            Have an account?{" "}
            <span className="text-[#5D4037]" onClick={goToLogin}>
              Login
            </span>
          </p>
        </div>
      </div>
    </div>
  );
}
