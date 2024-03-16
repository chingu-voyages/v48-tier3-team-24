import Link from "next/link";


const RecoverSuccess = () => {
  return (
    <p>
      Recovery was successful. If you provided the correct information, you should receive an email.
      <Link href="/login">Go to login</Link>
    </p>
  );
};

export default RecoverSuccess;