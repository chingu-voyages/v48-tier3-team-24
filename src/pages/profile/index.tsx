import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import LoginForm from "~/components/login/LoginForm";

const Profile = () => {
  const router = useRouter();
  const session = useSession();

  if(session.status === 'loading') return <>Loading</>;

  // If user is already logged in, redirect them to dashboard.
  if(session.status === 'authenticated') router.push('/' /* @TODO change the route to actual dashboard */);

  return (
    <section className="flex flex-col items-center justify-center min-h-screen p-3">
      <LoginForm />
    </section>
  );
};

export default Profile;