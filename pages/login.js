import Layout from "@/components/Layout";
import Link from "next/link";
import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { signIn, useSession } from "next-auth/react";
import { getError } from "@/utils/error";
import { toast } from "react-toastify";
import { useRouter } from "next/router";

export default function Login() {
  const { data: session } = useSession();
  const router = useRouter();
  const { redirect } = router.query;

  useEffect(() => {
    if (session?.user) {
      router.push(redirect || "/");
    }
  }, [router, session, redirect]);
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm();

  async function submitHandler({ email, password }) {
    //console.log(email, password);
    try {
      const result = await signIn("credentials", {
        redirect: false,
        email,
        password,
      });
      if (result.error) {
        toast.error(result.error);
      }
    } catch (err) {
      toast.error(getError(err));
    }
  }
  return (
    <Layout title="Login">
      <form
        onSubmit={handleSubmit(submitHandler)}
        style={{ height: "30rem" }}
        className="mx-auto max-w-screen-full  bg-gray-200"
      >
        <h1 className="mb-4 text-center text-xl">Login</h1>
        <div className="mb-4 p-2">
          <label htmlFor="email">Email</label>
          <input
            {...register("email", {
              required: "Please enter an email!",
              pattern: {
                value: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$/i,
                message: "Please enter valid email",
              },
            })}
            type="email"
            id="email"
            className="w-full"
            autoFocus
          />
          {errors.email && (
            <div className="text-red-500">{errors.email.message}</div>
          )}
        </div>
        <div className="mb-4 p-2">
          <label htmlFor="password">Password</label>
          <input
            {...register("password", {
              required: "Please enter password",
              minLength: {
                value: 6,
                message: "password should be at least 6 chars",
              },
            })}
            type="password"
            id="password"
            className="w-full"
            // autoFocus
          />
          {errors.password && (
            <div className="text-red-500 ">{errors.password.message}</div>
          )}
        </div>
        <div
          className="mb-4 m-auto text-center hover:opacity-90 rounded-lg bg-gray-800 w-60"
          style={{ color: "#4cf2f5" }}
        >
          <button className="primary-button">Login</button>
        </div>
        <div className="mb-4 pl-4 ">
          Don&apos;t have an account? &nbsp;
          <Link className="text-blue-500" href="/register">
            Register
          </Link>
        </div>
      </form>
    </Layout>
  );
}
