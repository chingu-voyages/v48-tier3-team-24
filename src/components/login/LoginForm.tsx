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

    const res = await signIn("credentials", {
      username,
      password,
      redirect: false,
      callbackUrl: "/dash",
    });
    if (res?.ok) toast.success("Login successful");
    else toast.error("Login failed");
  };

  const loginWithDiscord = async () => {
    await signIn("discord", { callbackUrl: "/dash" });
  };

  return (
    <form
      onSubmit={loginWithCredentials}
      className="flex h-full w-full flex-col items-center gap-5 sm:w-2/5"
    >
      <h1 className="text-3xl font-bold text-blue-800">EventSync</h1>
      <div className="relative flex flex-col w-full sm:w-96">
        <label htmlFor="username" className="text-sm">
          Username
        </label>
        <FaRegCircleUser className="absolute left-4 top-9 text-blue-800" />
        <input
          id="username"
          type="text"
          name="username"
          required
          className="w-full border py-3 pl-10 pr-5 text-base"
        />
      </div>
      <div className="relative flex flex-col w-full sm:w-96">
        <label htmlFor="password" className="text-sm">
          Password
        </label>
        <FiLock className="absolute left-4 top-9 text-blue-800" />
        <input
          id="password"
          type="password"
          name="password"
          required
          className="w-full border py-3 pl-10 pr-5 text-base"
        />
      </div>
      <button
        type="submit"
        className="w-full cursor-pointer rounded border border-blue-800 px-10 py-3 font-bold text-blue-800 hover:bg-blue-800 hover:text-white sm:w-96"
      >
        Login
      </button>
      <button
        type="button"
        onClick={loginWithDiscord}
        className="w-full cursor-pointer rounded border border-[#5865F2] px-10 py-3 font-bold text-[#5865F2] hover:bg-[#5865F2] hover:text-white sm:w-96"
      >
        <span className="flex flex-row items-center justify-center gap-3 text-xs sm:text-base">
          <FaDiscord className="text-3xl" /> Sign in with Discord
        </span>
      </button>
      <Link href="/register" className="text-lg hover:text-blue-800">
        Register
      </Link>
      <Link href="/recover" className="text-sm sm:text-lg hover:text-blue-800">
        Forgot username or password?
      </Link>
    </form>
  );
};

export default LoginForm;
