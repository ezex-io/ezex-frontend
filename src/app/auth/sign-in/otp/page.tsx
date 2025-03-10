import smallScreenImg from "@images/auth/small-screen-otp.png";
import Image from "next/image";
import { FC } from "react";
import OTPForm from "./_components/form";

const SigninOTPPage: FC = () => {
    return (
        <div className="flex w-full max-w-[28.75rem] flex-col p-1">
            <h1 className="text-3xl font-bold">
                Enter the 6-digit code we emailed you
            </h1>

            <Image
                src={smallScreenImg}
                alt="green crypto crystal"
                className="mt-4 h-[12.5rem] w-[12.5rem] self-center object-cover lg:hidden"
                width={200}
                height={200}
                priority
            />

            <p className="mt-5 mb-8 text-gray-300">
                Verify your email mohyedinsa@gmail.com. This helps us keep your
                account secure by verifying that it’s really you.
            </p>

            <OTPForm />
        </div>
    );
};

export default SigninOTPPage;
