const Spinner = ({message}:{message?:string}) => {
  return (
    <div className="fixed inset-0 z-40 flex flex-col items-center justify-center gap-3">
      <img src="/spinner.svg" alt="Just wait..." className="w-14" />
      {message && <p>{message}</p>}
    </div>
  );
};

export default Spinner;