import Link from "next/link";
import Button from "../Button";

const ResetPasswordSuccess = () => {
  return (
    <div>
      <p>Your password successfully reset.</p>
      <Link href="/login"><Button variant="primary">Go to login</Button></Link>
    </div>
  );
};

export default ResetPasswordSuccess;