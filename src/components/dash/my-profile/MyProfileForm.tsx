import { Session } from "next-auth";
import Button from "~/components/Button";
import { TextInput } from "~/components/TextInput";

interface myProfileFormProps {
  sessionData: Session | null;
}

const MyProfileForm = (props: myProfileFormProps) => {
  const onUpdateAccount = () => {
    console.log("update");
  };

  const onDeleteAccount = () => {
    console.log("delete");
  };

  return (
    <>
      <form className="grid grid-cols-1 gap-5">
        <div className="rounded p-10 shadow">
          <div className="grid grid-cols-2 grid-rows-1 gap-5">
            <div className="col-span-2">
              <h1 className="text-lg">Your Info</h1>
              <hr className="mt-2"></hr>
            </div>
            <TextInput id="first_name" label="First Name" inputType="text" />
            <TextInput id="last_name" label="Last Name" inputType="text" />
            <TextInput id="name" label="Name (Discord)" inputType="text" />
            <div className="col-span-2">
              <h1 className="text-lg">Account Info</h1>
              <hr className="mt-2"></hr>
            </div>
            <div className="col-span-2">
              <TextInput id="email" label="Email" inputType="text" />
            </div>
            <TextInput id="username" label="Username" inputType="text" />
            <TextInput id="password" label="Password" inputType="text" />
            <div className="col-span-2">
              <div className="flex w-full flex-wrap justify-between">
                <Button variant="primary" onClick={onUpdateAccount}>
                  Update
                </Button>
                <Button outline="danger" onClick={onDeleteAccount}>
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
