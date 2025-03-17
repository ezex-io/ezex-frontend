import { FC } from "react";
import SecurityVerificationForm from "./_components/form";

export const metadata = {
    title: "Account Security | EZEX",
    description: "Manage your account security settings",
};

const SecurityPage: FC = () => {
    return (
        <div className="flex w-full max-w-[28.75rem] flex-col p-1">
            <h1 className="text-3xl font-bold">
                Account Security Verification
            </h1>

            <SecurityVerificationForm />
        </div>
    );
};

export default SecurityPage;
