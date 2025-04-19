import { FC } from "react";
import PasswordForm from "./_components/form";

const SigninWithEmailPage: FC = () => {
    return (
        <div className="flex w-full max-w-[28.75rem] flex-col p-1">
            <PasswordForm />
        </div>
    );
};

export default SigninWithEmailPage;
