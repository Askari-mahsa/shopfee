"use client"
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function splashscreen() {

  const router = useRouter();

  useEffect(() => {
    const timer = setTimeout(() => {
      router.push("/onboarding");
    }, 10000);

    return () => clearTimeout(timer); 
  }, []);
 
  return (
    <div>
      {" "}
      <Image
        className="flex justify-self-center py-64  "
        src="/logo1.jpg"
        alt="logo"
        width={274}
        height={202}
      />
     
    </div>
  );
}
