import { useSession } from "next-auth/react";
import { useEffect } from "react";
import MyProfileForm from "~/components/dash/my-profile/MyProfileForm";
import Header from "~/components/Header";

function MyProfile() {
  const { data: sessionData } = useSession();

  useEffect(() => {
    console.log(sessionData);
  });

  return (
    <>
      <Header />
      <div className="grid justify-center gap-5 px-20">
        <MyProfileForm />
      </div>
    </>
  );
}

export default MyProfile;
