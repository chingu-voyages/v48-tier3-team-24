import { useSession } from "next-auth/react";
import { FormEvent } from "react";
import Button from "~/components/Button";
import { TextInput } from "~/components/TextInput";

const MyProfileForm = () => {
  const { data: sessionData } = useSession();

  const onUpdateAccount = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const postData = {
      first_name: formData.get("first_name"),
      last_name: formData.get("last_name"),
      name: formData.get("name"),
      email: formData.get("email"),
      username: formData.get("username"),
      password: formData.get("password"),
    };
    // TODO call api
    console.log("update", postData);
  };

  const onDeleteAccount = () => {
    console.log("delete");
  };

  return (
    <>
      <form className="grid grid-cols-1 gap-5" onSubmit={onUpdateAccount}>
        <div className="rounded p-10 shadow">
          <div className="grid grid-cols-2 grid-rows-1 gap-5">
            <div className="col-span-2">
              <h1 className="text-lg">Your Info</h1>
              <hr className="mt-2"></hr>
            </div>
            <TextInput
              id="first_name"
              label="First Name"
              inputType="text"
              required={true}
              defaultValue={sessionData?.user.firstName ?? ""}
            />
            <TextInput
              id="last_name"
              label="Last Name"
              inputType="text"
              required={true}
              defaultValue={sessionData?.user.lastName ?? ""}
            />
            <TextInput
              id="name"
              label="Name (Discord)"
              inputType="text"
              disable={true}
              readonly={true}
              defaultValue={sessionData?.user.name ?? ""}
            />
            <div className="col-span-2">
              <h1 className="text-lg">Account Info</h1>
              <hr className="mt-2"></hr>
            </div>
            <div className="col-span-2">
              <TextInput
                id="email"
                label="Email"
                inputType="text"
                disable={true}
                readonly={true}
                defaultValue={sessionData?.user.email ?? ""}
              />
            </div>
            <TextInput
              id="username"
              label="Username"
              inputType="text"
              required={true}
              defaultValue={sessionData?.user.username ?? ""}
            />
            <TextInput id="password" label="Password" inputType="text" />
            <div className="col-span-2">
              <div className="flex w-full flex-wrap justify-between">
                <Button variant="primary" type="submit">
                  Update
                </Button>
                <Button
                  outline="danger"
                  onClick={onDeleteAccount}
                  type="button"
                >
                  Delete Account
                </Button>
              </div>
            </div>
          </div>
        </div>
      </form>
    </>
  );
};

export default MyProfileForm;
