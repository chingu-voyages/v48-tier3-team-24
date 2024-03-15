import Link from "next/link";
import type { FormEvent } from "react";
import toast from "react-hot-toast";
import { api } from "~/utils/api";
import RegistrationSuccess from "./RegistrationSuccess";

const RegisterForm = () => {
  const signUpMutation = api.auth.signUp.useMutation();

  const signUp = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const username = String(formData.get("username"));
    const firstName = String(formData.get("firstName"));
    const lastName = String(formData.get("lastName"));
    const email = String(formData.get("email"));
    const password = String(formData.get("password"));
    const confirmPassword = String(formData.get("confirmPassword"));

    if(password !== confirmPassword) {
      toast.error("The passwords do not match.");
      return;
    }
    signUpMutation.mutate({
      username, firstName, lastName, email, password
    });
  };
  if(signUpMutation.isSuccess) return <RegistrationSuccess />;
  return (
    <form onSubmit={signUp} className="h-full flex flex-col items-center gap-5 w-full sm:w-2/5">
      {signUpMutation.isError &&
        <div className="rounded border border-red-500 bg-red-200 text-red-800 px-3 py-1">
          <p>{signUpMutation.error.message}</p>
        </div>
      }
      <h1 className="text-blue-800 text-3xl font-bold">EventSync</h1>
      <div className="flex flex-col">
        <label htmlFor="username" className="text-sm">
            Username
        </label>
        <input id="username" type="text" name="username" required className="p-3 text-base border-b border-[#0A2A75] w-full sm:w-96" />
      </div>
      <div className="flex flex-col">
        <label htmlFor="firstName" className="text-sm">
            First Name
        </label>
        <input id="firstName" type="text" name="firstName" required className="p-3 text-base border-b border-[#0A2A75] w-full sm:w-96" />
      </div>
      <div className="flex flex-col">
        <label htmlFor="lastName" className="text-sm">
            Last Name
        </label>
        <input id="lastName" type="text" name="lastName" required className="p-3 text-base border-b border-[#0A2A75] w-full sm:w-96" />
      </div>
      <div className="flex flex-col">
        <label htmlFor="email" className="text-sm">
            Email
        </label>
        <input id="email" type="email" name="email" required className="p-3 text-base border-b border-[#0A2A75] w-full sm:w-96" />
      </div>
      <div className="flex flex-col">
        <label htmlFor="password" className="text-sm">
            Password
        </label>
        <input id="password" type="password" name="password" required className="p-3 text-base border-b border-[#0A2A75] w-full sm:w-96" />
      </div>
      <div className="flex flex-col">
        <label htmlFor="confirmPassword" className="text-sm">
            Confirm Password
        </label>
        <input id="confirmPassword" type="password" name="confirmPassword" required className="p-3 text-base border-b border-[#0A2A75] w-full sm:w-96" />
      </div>
      <button disabled={signUpMutation.isLoading} type="submit" className="rounded border border-blue-800 px-10 py-3 text-blue-800 font-bold w-full sm:w-96 hover:bg-blue-800 hover:text-white cursor-pointer">
        Sign Up
      </button>
      <Link href="/login" className="text-lg hover:text-blue-800">Already a member?</Link>
    </form>
  );
};

export default RegisterForm;