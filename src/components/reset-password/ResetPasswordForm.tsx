import type { FormEvent } from "react";
import { api } from "~/utils/api";
import ResetPasswordSuccess from "./ResetPasswordSuccess";
import ResetPasswordError from "./ResetPasswordError";
import Button from "~/components/Button";
import toast from "react-hot-toast";
import Link from "next/link";

/**
 * User landed on this form because they probably clicked the password reset link.
 * User will enter their new password here.
 * 
 * @param {UUID} token the verification token required for password reset
 * @param {string} username username for which the password is being reset. Only for displaying.
 */
const ResetPasswordForm = ({token, username}:{token:string, username:string}) => {
  const resetPasswordMutation = api.auth.resetPassword.useMutation();

  const onSubmit = async (event:FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const token = String(formData.get("token"));
    const password = String(formData.get("password"));
    const confirmPassword = String(formData.get("confirmPassword"));
    if(password !== confirmPassword) {
      toast.error("Passwords do not match");
      return false;
    }
    resetPasswordMutation.mutate({token, password});
  };

  if(resetPasswordMutation.isSuccess) return <ResetPasswordSuccess />
  if(resetPasswordMutation.isError) return <ResetPasswordError />

  return (
    <form onSubmit={onSubmit}>
      {/* A hidden input for storing the token value */}
      <input hidden name="token" value={token} readOnly />
      <div className="flex flex-col">
        <label htmlFor="username">Username</label>
        <input id="username" type="text" value={username} readOnly />
      </div>
      <div className="flex flex-col">
        <label>Password</label>
        <input type="password" name="password" required />
      </div>
      <div className="flex flex-col">
        <label>Confirm Password</label>
        <input type="password" name="confirmPassword" required />
      </div>
      <Button type="submit" variant="primary">Submit</Button>
      <Link href="/"><Button type="button" variant="danger">Cancel</Button></Link>
    </form>
  );
};

export default ResetPasswordForm;