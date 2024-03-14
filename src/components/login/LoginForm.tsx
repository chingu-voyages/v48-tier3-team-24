import { signIn } from "next-auth/react";
import { FaRegCircleUser } from "react-icons/fa6";
import { FiLock } from "react-icons/fi";
import { FaDiscord } from "react-icons/fa";
import type { FormEvent } from "react";
import toast from "react-hot-toast";
import Link from "next/link";

const LoginForm = () => {
  const loginWithCredentials = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const username = formData.get("username");
    const password = formData.get("password");
    
    const res = await signIn("credentials", { username, password, redirect: false, callbackUrl: "/" /* @TODO Replace with dashboard route */ });
    if(res?.ok) toast.success("Login successful");
    else toast.error("Login failed");
  };

  const loginWithDiscord = async () => { 
    await signIn("discord", { callbackUrl: "/" /* @TODO Replace with dashboard route */ });
  };

  return (
    <form onSubmit={loginWithCredentials} className="h-full flex flex-col items-center gap-5 w-full sm:w-2/5">
      <h1 className="text-blue-800 text-3xl font-bold">EventSync</h1>
      <div className="flex flex-col relative">
        <label htmlFor="username" className="text-sm">
          Username
        </label>
        <FaRegCircleUser className="absolute top-9 left-4 text-blue-800" />
        <input id="username" type="text" name="username" required className="pl-10 pr-5 py-3 text-base border w-full sm:w-96" />
      </div>
      <div className="flex flex-col relative">
        <label htmlFor="password" className="text-sm">
          Password
        </label>
        <FiLock className="absolute top-9 left-4 text-blue-800" />
        <input id="password" type="password" name="password" required className="pl-10 pr-5 py-3 text-base border w-full sm:w-96" />
      </div>
      <button type="submit" className="rounded border border-blue-800 px-10 py-3 text-blue-800 font-bold w-full sm:w-96 hover:bg-blue-800 hover:text-white cursor-pointer">
        Login
      </button>
      <button type="button" onClick={loginWithDiscord} className="rounded border border-[#5865F2] px-10 py-3 text-[#5865F2] font-bold w-full sm:w-96 hover:bg-[#5865F2] hover:text-white cursor-pointer">
        <span className="flex flex-row justify-center items-center gap-3 text-xs sm:text-base">
          <FaDiscord className="text-3xl" /> Sign in with Discord
        </span>
      </button>
      <Link href="/register" className="text-lg hover:text-blue-800">Register</Link>
    </form>
  );
}

export default LoginForm;