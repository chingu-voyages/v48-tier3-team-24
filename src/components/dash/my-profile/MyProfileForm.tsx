import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { FormEvent } from "react";
import toast from "react-hot-toast";
import Button from "~/components/Button";
import { TextInput } from "~/components/TextInput";
import { api } from "~/utils/api";
import { PiPasswordFill } from "react-icons/pi";

function MyProfileForm() {
  const router = useRouter();
  useSession({
    required: true,
    onUnauthenticated() {
      router.push("/login");
    },
  });
  const userUpdateMutation = api.user.update.useMutation({
    onSuccess: async () => {
      toast.success("Updated Successfully");
    },
    onError: (error, variables) => {
      toast.error(error.message);
    },
  });
  const { data: user } = api.user.getCurrentUser.useQuery();

  const onUpdateAccount = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const postData = {
      firstName: String(formData.get("firstName")),
      lastName: String(formData.get("lastName")),
      username: String(formData.get("username")),
      password: String(formData.get("password")),
    };
    // update user info
    userUpdateMutation.mutate(postData);
  };

  const onUpdatePassword = () => {
    // TODO handle update password
    console.log("update password")
  }

  const onDeleteAccount = () => {
    // TODO handle delete account
    console.log("delete");
  };

  return (
    <>
      <form className="grid grid-cols-1 gap-5" onSubmit={onUpdateAccount}>
        <div className="rounded p-10 shadow">
          <div className="grid grid-cols-2 grid-rows-1 items-end gap-5">
            <div className="col-span-2">
              <h1 className="text-lg">Your Info</h1>
              <hr className="mt-2"></hr>
            </div>
            <TextInput
              id="firstName"
              label="First Name"
              inputType="text"
              required={true}
              defaultValue={user?.firstName ?? ""}
            />
            <TextInput
              id="lastName"
              label="Last Name"
              inputType="text"
              required={true}
              defaultValue={user?.lastName ?? ""}
            />
            <TextInput
              id="name"
              label="Name (Discord)"
              inputType="text"
              disable={true}
              readonly={true}
              defaultValue={user?.name ?? ""}
            />
            <div className="col-span-2">
              <h1 className="text-lg">Account Info</h1>
              <hr className="mt-2"></hr>
            </div>
            <TextInput
              id="username"
              label="Username"
              inputType="text"
              required={true}
              defaultValue={user?.username ?? ""}
            />
            <TextInput
              id="email"
              label="Email"
              inputType="text"
              disable={true}
              readonly={true}
              defaultValue={user?.email ?? ""}
            />
            {/* <Button outline="primary">Update Email</Button> */}

            <Button outline="warning" onClick={onUpdatePassword}>Click here to update password</Button>
            {/* <TextInput id="password" label="Password" inputType="text" /> */}
            <div className="col-span-2 mt-10">
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
}

export default MyProfileForm;
