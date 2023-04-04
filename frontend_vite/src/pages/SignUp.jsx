import UserForm from "../components/UserForm";

function SignUp(props) {
  return (
    <div className="flex items-center justify-center">
      <div className="bg-neutral border-2 border-neutral-content rounded p-10">
        <h2 className="text-xl">Create Account</h2>
        <UserForm formType="signup" />
      </div>
    </div>
  );
}

export default SignUp;
