"use client";

import Image from "next/image";
import { Button } from "@/components/ui/button";
import { signInWithPopup } from "firebase/auth";
import { auth, provider } from "@/lib/firebase";
import { useRouter } from 'next/navigation';

export default function LoginPage() {

  const router = useRouter();
  const handleLogin = async () => {
    try {
      const result = await signInWithPopup(auth, provider);
      console.log("User Logged In:", result.user);
      router.push('/dashboard');
    } catch (error) {
      console.error("Login Failed:", error);
    }
  };

  return (
    <div className="relative min-h-screen w-full overflow-hidden bg-white">
      <div className="relative z-10 flex h-screen w-full">
        {/* Left Side - Login */}
        <div className="flex w-full flex-col items-center justify-center px-8 md:w-1/2 md:items-start md:px-16 lg:px-24">
          <div className="mb-12 flex items-center">
            <div className="mr-2 flex h-10 w-10 items-center justify-center rounded-md bg-fuchsia-800 text-white">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="lucide lucide-clipboard-list"
              >
                <rect width="8" height="4" x="8" y="2" rx="1" ry="1" />
                <path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2" />
                <path d="M12 11h4" />
                <path d="M12 16h4" />
                <path d="M8 11h.01" />
                <path d="M8 16h.01" />
              </svg>
            </div>
            <h1 className="text-2xl font-bold text-fuchsia-800">TaskBuddy</h1>
          </div>

          <p className="mb-8 max-w-md font-medium text-center text-black md:text-left">
            Streamline your workflow and track progress effortlessly with our
            all-in-one task management app.
          </p>

          <Button
            variant="default"
            className="flex w-full max-w-md rounded-[18.91px] text-xl items-center justify-center gap-2 border-gray-300 py-6"
            onClick={handleLogin}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              x="0px"
              y="0px"
              width="100"
              height="100"
              viewBox="0 0 48 48"
            >
              <path
                fill="#fbc02d"
                d="M43.611,20.083H42V20H24v8h11.303c-1.649,4.657-6.08,8-11.303,8c-6.627,0-12-5.373-12-12	s5.373-12,12-12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C12.955,4,4,12.955,4,24s8.955,20,20,20	s20-8.955,20-20C44,22.659,43.862,21.35,43.611,20.083z"
              ></path>
              <path
                fill="#e53935"
                d="M6.306,14.691l6.571,4.819C14.655,15.108,18.961,12,24,12c3.059,0,5.842,1.154,7.961,3.039	l5.657-5.657C34.046,6.053,29.268,4,24,4C16.318,4,9.656,8.337,6.306,14.691z"
              ></path>
              <path
                fill="#4caf50"
                d="M24,44c5.166,0,9.86-1.977,13.409-5.192l-6.19-5.238C29.211,35.091,26.715,36,24,36	c-5.202,0-9.619-3.317-11.283-7.946l-6.522,5.025C9.505,39.556,16.227,44,24,44z"
              ></path>
              <path
                fill="#1565c0"
                d="M43.611,20.083L43.595,20L42,20H24v8h11.303c-0.792,2.237-2.231,4.166-4.087,5.571	c0.001-0.001,0.002-0.001,0.003-0.002l6.19,5.238C36.971,39.205,44,34,44,24C44,22.659,43.862,21.35,43.611,20.083z"
              ></path>
            </svg>
            Continue with Google
          </Button>
        </div>

        {/* Right Side - App Screenshot */}
        <div className="relative hidden w-1/2 md:block">
          {/* Circle Design Elements */}
          <div className="absolute inset-0 flex items-center justify-center">
            {/* Outer Circle */}
            <div className="h-[90%] w-[90%] rounded-full border border-purple-300 "></div>

            {/* Middle Circle */}
            <div className="absolute h-[110%] w-[110%] rounded-full border border-purple-300 "></div>

            {/* Inner Circle */}
            <div className="absolute h-[100%] w-[100%] rounded-full border border-purple-300 "></div>
          </div>

          {/* App Image */}
          <div className="absolute right-0 top-1/2 w-[80%] -translate-y-1/2 transform rounded-lg bg-white p-6 shadow-lg">
            {/* Placeholder for the app interface image */}
            <div className="mt-4 h-[800px] w-full overflow-hidden rounded-md bg-gray-100">
              <Image
                src="/assets/taskScreenshot.png"
                alt="TaskBuddy App Interface"
                width={500}
                height={800}
                className="h-full w-full object-cover"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
