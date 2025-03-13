import smallScreenImg from "@images/auth/small-screen-security.png";
import Image from "next/image";
import { FC } from "react";
import SecurityVerificationForm from "./_components/form";

const SecurityVerificationPage: FC = () => {
    return (
        <div className="flex w-full max-w-[28.75rem] flex-col p-1">
            <h1 className="text-3xl font-bold">
                Account Security Verification
            </h1>

            <Image
                src={smallScreenImg}
                alt="security verification"
                className="mt-4 h-[12.5rem] w-[12.5rem] self-center object-cover lg:hidden"
                width={200}
                height={200}
                priority
            />

            <SecurityVerificationForm />
        </div>
    );
};

export default SecurityVerificationPage;
