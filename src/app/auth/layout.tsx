import { PropsWithChildren } from "react";

const AuthPageLayout = ({ children }: PropsWithChildren) => {
    return (
        <div className="flex min-h-full p-4 md:p-6">
            <div className="bg-primary-600 hidden w-1/2 flex-1 rounded-2xl md:flex">
                <div className="p-4">Sidebar</div>
            </div>

            <div className="flex flex-1 items-center justify-center">
                <div className="max-h-[460px]">{children}</div>
            </div>
        </div>
    );
};

export default AuthPageLayout;
