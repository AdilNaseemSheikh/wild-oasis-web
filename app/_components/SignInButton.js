import { signInAction } from "../_lib/actions";

function SignInButton() {
  return (
    // whole signin flow should stay on server so this component also needs to be server side.
    // we can't add onClick to button and connect signin function.

    // What we can do is create a server action. Server actions allow us to add interactivity to server components,
    // usually to forms. So the idea is to connect a server action with form that contains only our signin button.
    // and on its submission, we want to call signin provided by google through our server action
    <form action={signInAction}>
      <button className="flex items-center gap-6 text-lg border border-primary-300 px-10 py-4 font-medium">
        <img
          src="https://authjs.dev/img/providers/google.svg"
          alt="Google logo"
          height="24"
          width="24"
        />
        <span>Continue with Google</span>
      </button>
    </form>
  );
}

export default SignInButton;
