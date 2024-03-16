import { type ChangeEvent, type FormEvent, useState } from "react";
import { api } from "~/utils/api";
import RecoverError from "./RecoverError";
import RecoverSuccess from "./RecoverSuccess";
import Button from "~/components/Button";

/**
 * This is a password/username recovery form.
 * User landed here because they do not remember either their username or their password.
 * 
 * If user is recovering their username, then they must enter their email address, to which
 * the server will send an email with their username.
 * 
 * If user is recovering their password, then they must enter their username and the server
 * will send a password reset link to the email address associated with the user account.
 */
const RecoverForm = () => {
  // Mode determines if user wishes to recover their username or password.
  // If mode is "username", then user selected to recover their username.
  // If mode is "password", then user selected to recover their password.
  const [ mode, setMode ] = useState<"username"|"password">("username");
  const usernameRecMutation = api.auth.recoverUsername.useMutation();
  const passwordRecMutation = api.auth.recoverPassword.useMutation();

  const onSubmit = async (event:FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    if(mode === "username") {
      const email = String(formData.get("email"));
      usernameRecMutation.mutate({email});
    }
    if(mode === "password") {
      const username = String(formData.get("username"));
      passwordRecMutation.mutate({username});
    }
  };

  const onModeChanged = (event:ChangeEvent<HTMLInputElement>) => {
    setMode(event.target.value as "username" | "password");
  }

  if(usernameRecMutation.isError)
    return <RecoverError errorMessage={usernameRecMutation.error?.message}/>;
  if(passwordRecMutation.isError)
    return <RecoverError errorMessage={passwordRecMutation.error?.message}/>;
  if(usernameRecMutation.isSuccess || passwordRecMutation.isSuccess)
    return <RecoverSuccess />

  return (
    <form onSubmit={onSubmit}>
      <div>
        <p>Please select one.</p>
        <label>
          <input type="radio" name="mode" value="username" onChange={onModeChanged} required checked={mode === "username"} />
          Recover my username
        </label>
        <label>
          <input type="radio" name="mode" value="password" onChange={onModeChanged} checked={mode === "password"} />
          Recover my password
        </label>
      </div>
      { mode === "username" &&
        <div>
          <label>Email</label>
          <input type="email" name="email" required />
        </div>
      }
      { mode === "password" &&
        <div>
          <label>Username</label>
          <input type="text" name="username" required />
        </div>
      }
      <Button type="submit" variant="primary">Submit</Button>
    </form>
  );
};

export default RecoverForm;