import VerifyEmailError from "~/components/verify-email/VerifyEmailError";
import VerifyEmailSuccess from "~/components/verify-email/VerifyEmailSuccess";
import { GetServerSideProps, InferGetServerSidePropsType } from "next";
import { getServerAuthSession } from "~/server/auth";
import { createCaller } from "~/utils/trpcCaller";

type Result = {
  success: boolean;
};

export const getServerSideProps = (async (context) => {
  try {
    const { req, res } = context;
    const { token } = context.query;
    const session = await getServerAuthSession({ req, res });
    const caller = createCaller(session);
    await caller.auth.verifyEmail({ token: String(token) });
    const result:Result = { success: true };
    return { props: { result } };
  } catch(error) {
    const result:Result = { success: false };
    return { props: { result } };
  }
}) satisfies GetServerSideProps<{ result: Result }>

const VerifyEmail = ({ result }:InferGetServerSidePropsType<typeof getServerSideProps>) => {
  if(result.success) return <VerifyEmailSuccess />
  else return <VerifyEmailError />
}

export default VerifyEmail;