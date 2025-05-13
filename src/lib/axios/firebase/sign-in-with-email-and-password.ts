import { auth } from "@/config/firebase";
import { signInWithEmailAndPassword, UserCredential } from "firebase/auth";

export interface SigninWithEmailAndPasswordAPIBody {
    email: string;
    password: string;
}

export const signinWithEmailAndPasswordAPI = async ({
    email,
    password,
}: SigninWithEmailAndPasswordAPIBody): Promise<UserCredential> => {
    return await signInWithEmailAndPassword(auth, email, password);
};
