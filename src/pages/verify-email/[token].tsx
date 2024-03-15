import { useRouter } from "next/router";
import { useEffect } from "react";
import { api } from "~/utils/api";
import VerifyEmailError from "~/components/verify-email/VerifyEmailError";
import VerifyEmailSuccess from "~/components/verify-email/VerifyEmailSuccess";

const VerifyEmail = () => {
  const router = useRouter();
  const { token } = router.query;
  const verifyEmailMutation = api.auth.verifyEmail.useMutation();

  useEffect(() => {
    if(token) {
      verifyEmailMutation.mutate({ token: String(token) });
    }
  }, [token, router]);

  if(verifyEmailMutation.isError) return <VerifyEmailError />
  if(verifyEmailMutation.isSuccess) return <VerifyEmailSuccess />
  return <>Loading</>
}

export default VerifyEmail;