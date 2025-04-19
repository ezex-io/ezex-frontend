import smallScreenImg from "@images/auth/small-screen-email.png";
import Image from "next/image";
import Link from "next/link";
import { FC } from "react";
import EmailForm from "./_components/form";

const SignupWithEmailPage: FC = () => {
    return (
        <div className="flex w-full max-w-[28.75rem] flex-col p-1">
            <p className="mb-6 text-xl">
                Welcome to{" "}
                <span className="text-primary-500 font-bold">ezeX</span>
            </p>

            <h1 className="mb-0 text-3xl font-bold lg:mb-10">
                Create your account
            </h1>

            <Image
                src={smallScreenImg}
                alt="green crypto crystal"
                className="mt-4 h-[12.5rem] w-[12.5rem] self-center object-cover lg:hidden"
                width={200}
                height={200}
                priority
            />

            <div className="flex flex-col-reverse lg:flex-col">
                <EmailForm />

                {/* TODO: enable when api is ready */}
                {/* <div className="flex flex-col-reverse lg:flex-col">
                    <span className="my-4 self-center text-gray-500 lg:my-8">
                        OR
                    </span>

                    <div className="flex w-full items-center justify-between">
                        <Button
                            size="lg"
                            color="white"
                            className="lg:w-full lg:max-w-60"
                        >
                            <GoogleLogoIcon />
                            Sign in with Google
                        </Button>
                        <div className="flex items-center gap-2">
                            <Button color="white" size="icon">
                                <XLogoIcon className="size-6" />
                            </Button>
                            <Button color="white" size="icon">
                                <FacebookLogoIcon className="size-6" />
                            </Button>
                            <Button color="white" size="icon">
                                <AppleLogoIcon className="size-7" />
                            </Button>
                        </div>
                    </div>
                </div> */}
            </div>

            <p className="mt-8 text-sm">
                By creating an account you certify that you are over the age of
                18 and agree to the{" "}
                <Link className="text-primary-500" href="#">
                    Privacy Policy
                </Link>
            </p>
        </div>
    );
};

export default SignupWithEmailPage;
