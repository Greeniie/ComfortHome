import { useNavigate } from "react-router-dom";

const Signup = () => {
  const navigate = useNavigate();

  return (
    <div className="h-screen flex flex-col justify-center items-center bg-gray-50 px-6">
      <h1 className="text-3xl font-bold text-[#1B7339] mb-4">Create Account</h1>
      <p className="text-gray-500 mb-8 text-center max-w-sm">
        This is your sign-up screen. Add form fields later.
      </p>
       <div className="text-center mt-6 text-gray-500 text-sm">
          Already have an account?{" "}
          <button
            onClick={() => navigate("/login")}
            className="text-[#1B7339] font-semibold hover:underline"
          >
            Login
          </button>
        </div>
    </div>
  );
};

export default Signup;
