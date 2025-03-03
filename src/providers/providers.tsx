import { FC, PropsWithChildren } from "react";
import ReactQueryProvider from "./reactQuery/reactQuery.provider";

const Providers: FC<PropsWithChildren> = ({ children }) => {
    return <ReactQueryProvider>{children}</ReactQueryProvider>;
};

export default Providers;
