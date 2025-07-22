// app/(auth)/sign-in/[[...sign-in]]/page.tsx

import { SignIn } from "@clerk/nextjs";

export default function SignInPage() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <SignIn
        forceRedirectUrl="/dashboard"
        appearance={{
          elements: {
            card: "shadow-xl rounded-2xl border border-gray-300",
            headerTitle: "text-xl font-semibold",
          },
        }}
        path="/sign-in"
        routing="path"
        signUpUrl="/sign-up"
      />
    </div>
  );
}
