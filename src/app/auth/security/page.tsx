import { redirect } from "next/navigation";

export const metadata = {
    title: "Account Security | EZEX",
    description: "Manage your account security settings",
};

export default function SecurityPage() {
    // Redirect to the verification page
    redirect("/auth/security/verification");
}
