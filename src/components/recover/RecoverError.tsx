import { useRouter } from "next/router";
import Button from "../Button";

const RecoverError = ({errorMessage}:{errorMessage:string|undefined}) => {
  const router = useRouter();

  const refresh = () => { router.reload(); }

  return (
    <div>
      <p>Something went wrong. Please try again.</p>
      <p>Error: {errorMessage}</p>
      <Button variant="primary" onClick={refresh}>Click to try again.</Button>
    </div>
  );
};

export default RecoverError;