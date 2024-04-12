import { useRouter } from "next/router";
import ResetPasswordForm from "~/components/reset-password/ResetPasswordForm";

const ResetPassword = () => {
  const router = useRouter();
  const { token } = router.query;
  const { username } = router.query;

  if(!token || Array.isArray(token)|| !username || Array.isArray(username))
    return <p>Error</p>;

  return (
    <section>
      <ResetPasswordForm token={token} username={username}/>
    </section>
  );
}

export default ResetPassword;