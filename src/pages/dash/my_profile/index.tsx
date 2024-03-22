import MyProfileForm from "~/components/dash/my-profile/MyProfileForm";
import Header from "~/components/Header";

function MyProfile() {
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
