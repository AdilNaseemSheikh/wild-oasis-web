"use client";

import { useFormStatus } from "react-dom";
import SpinnerMini from "./SpinnerMini";
const SubmitButton = ({ children }) => {
  // this hook can only be called in a component which is inside a form element only
  const { pending } = useFormStatus();
  return (
    <button
      disabled={pending}
      className="bg-accent-500 px-8 py-4 text-primary-800 font-semibold hover:bg-accent-600 transition-all disabled:cursor-not-allowed disabled:bg-gray-500 disabled:text-gray-300"
    >
      {pending ? (
        <span className="mx-auto">
          <SpinnerMini />
        </span>
      ) : (
        children
      )}
    </button>
  );
};

export default SubmitButton;
