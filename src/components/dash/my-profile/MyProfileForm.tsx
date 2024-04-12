import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { type FormEvent, useState } from "react";
import toast from "react-hot-toast";
import Button from "~/components/Button";
import { TextInput } from "~/components/TextInput";
import { api } from "~/utils/api";
import Model from "~/components/Modal";
import Link from "next/link";
import { IoMdArrowBack } from "react-icons/io";

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
    onError: (error) => {
      toast.error(error.message);
    },
  });
  const userUpdatePasswordMutation = api.user.updatePassword.useMutation({
    onSuccess: async () => {
      toast.success("Updated Successfully");
      onSetPasswordUpdateModalOpen();
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });
  const userUpdateEmailMutation = api.user.updateEmail.useMutation({
    onSuccess: async () => {
      toast.success(
        "Updated Successfully. Please check you email and verify your account .",
      );
      onSetEmailUpdateModalOpen();
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });
  const { data: user } = api.user.getCurrentUser.useQuery();
  const [updatePasswordModalOpen, setUpdatePasswordModalOpen] =
    useState<boolean>(false);
  const [updateEmailModalOpen, setUpdateEmailModalOpen] =
    useState<boolean>(false);

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

  const onSetPasswordUpdateModalOpen = () => {
    setUpdatePasswordModalOpen(!updatePasswordModalOpen);
  };

  const onUpdatePassword = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const password = String(formData.get("password"));
    const confirmPassword = String(formData.get("confirmPassword"));
    if (password != confirmPassword) {
      toast.error("Confirm password does not match with password");
      return;
    }
    const postData = {
      password,
      confirmPassword,
    };
    userUpdatePasswordMutation.mutate(postData);
  };

  const onSetEmailUpdateModalOpen = () => {
    setUpdateEmailModalOpen(!updateEmailModalOpen);
  };

  const onUpdateEmail = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const email = String(formData.get("email"));
    const postData = {
      email,
    };
    userUpdateEmailMutation.mutate(postData);
  };

  const onDeleteAccount = () => {
    // TODO handle delete account
    console.log("delete");
  };

  return (
    <>
      <form className="grid grid-cols-1 gap-5" onSubmit={onUpdateAccount}>
        <div className="rounded p-10 shadow">
          <div className="grid grid-cols-2 grid-rows-1 items-end gap-5">
            <Link href="/dash" className="text-gray-500">
              <div className="flex items-center gap-2">
                <IoMdArrowBack />
                Back
              </div>
            </Link>
            <div className="col-span-2">
              <h1 className="text-lg">Your Info</h1>
              <hr className="mt-2"></hr>
            </div>
            <TextInput
              id="firstName"
              label="First Name"
              type="text"
              required={true}
              defaultValue={user?.firstName ?? ""}
            />
            <TextInput
              id="lastName"
              label="Last Name"
              type="text"
              required={true}
              defaultValue={user?.lastName ?? ""}
            />
            <TextInput
              id="name"
              label="Discord Name"
              type="text"
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
              type="text"
              required={true}
              defaultValue={user?.username ?? ""}
            />
            <TextInput
              id="email"
              label="Email"
              type="text"
              disable={true}
              readonly={true}
              defaultValue={user?.email ?? ""}
            />
            <Button outline="warning" onClick={onSetPasswordUpdateModalOpen}>
              Change Password
            </Button>
            <Button outline="primary" onClick={onSetEmailUpdateModalOpen}>
              Change Email
            </Button>
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
      <Model modalOpen={updatePasswordModalOpen}>
        <p className="mb-5 text-lg">Update Password</p>
        <form className="grid grid-cols-1 gap-5" onSubmit={onUpdatePassword}>
          <TextInput
            id="password"
            label="New Password"
            type="text"
            required={true}
          />
          <TextInput
            id="confirmPassword"
            label="Confirm Password"
            type="text"
            required={true}
          />
          <hr />
          <div className="flex w-full justify-between gap-5">
            <Button outline="info" onClick={onSetPasswordUpdateModalOpen}>
              Cancel
            </Button>
            <Button variant="primary" type="submit">
              Confirm
            </Button>
          </div>
        </form>
      </Model>
      <Model modalOpen={updateEmailModalOpen}>
        <p className="mb-5 text-lg">Update Email</p>
        <form className="grid grid-cols-1 gap-5" onSubmit={onUpdateEmail}>
          <TextInput
            id="email"
            label="New Email"
            type="text"
            required={true}
          />
          <hr />
          <div className="flex w-full justify-between gap-5">
            <Button outline="info" onClick={onSetEmailUpdateModalOpen}>
              Cancel
            </Button>
            <Button variant="primary" type="submit">
              Confirm
            </Button>
          </div>
        </form>
      </Model>
    </>
  );
}

export default MyProfileForm;
