import logo from "../assets/logos/logo.png";

const Loader = () => {
  return (
    <div className="flex items-center justify-center h-screen w-full bg-[#fff]">
      <img
        src={logo}
        alt="Loading..."
        className="h-[200px] w-auto animate-pulse"
      />
    </div>
  );
};

export default Loader;
