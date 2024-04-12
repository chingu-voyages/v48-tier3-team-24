import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import LoginForm from "~/components/login/LoginForm";

const Login = () => {
  const router = useRouter();
  const session = useSession();

  if(session.status === 'loading') return <>Loading</>;

  // If user is already logged in, redirect them to dashboard.
  if(session.status === 'authenticated') router.push('/dash');

  return (
    <section className="flex flex-col items-center justify-center min-h-screen p-3">
      <LoginForm />
    </section>
  );
};

export default Login;