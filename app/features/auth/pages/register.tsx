import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router";
import { signUp } from 'aws-amplify/auth';
import { validateForm, type SignUpData } from "@/features/auth/utils/validation";
import { useForm } from "react-hook-form";
import { Form, FormDescription, FormMessage } from "@/common/components/ui/form";
import { FormControl } from "@/common/components/ui/form";
import { FormLabel } from "@/common/components/ui/form";
import { FormItem } from "@/common/components/ui/form";
import { FormField } from "@/common/components/ui/form";
import { Input } from "@/common/components/ui/input";
import { PrimaryButton } from "@/common/components/ui/primary-button";
import { Icon } from "@/common/components/ui/icon";
import AuthLayout from "@/features/auth/layouts/AuthLayout";

interface RegisterFormData {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  confirmPassword: string;
}

export default function Register() {
  const form = useForm<RegisterFormData>({
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  });
  
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState<{ type: "success" | "error"; text: string } | null>(null);

  const onSubmit = async (data: RegisterFormData) => {
    if (data.password !== data.confirmPassword) {
      setMessage({ type: "error", text: "Passwords do not match" });
      return;
    }

    const validation = validateForm({
      email: data.email,
      password: data.password,
      familyName: data.lastName,
      givenName: data.firstName,
    }, data.confirmPassword);

    if (!validation.isValid) {
      setMessage({ type: "error", text: validation.message });
      return;
    }

    setIsLoading(true);

    try {
      const { isSignUpComplete, userId, nextStep } = await signUp({
        username: data.email,
        password: data.password,
        options: {
          userAttributes: {
            email: data.email,
            family_name: data.lastName,
            given_name: data.firstName,
          },
        },
      });
      navigate('/registration-success');
    } catch (error: any) {
      console.error("Sign Up Error:", error);
      setMessage({ type: "error", text: error.message || "Registration failed" });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <AuthLayout
      title="Ready to start learning Korean?"
      subtitle="Start your learning journey with KoreanMate."
      iconSrc="/images/book.svg"
      iconAlt="Sign up"
    >
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 w-full pt-14" noValidate>
          {message && (
            <div className={`p-3 rounded-md ${
              message.type === "error" 
                ? "bg-red-50 border border-red-200 text-red-800" 
                : "bg-green-50 border border-green-200 text-green-800"
            }`}>
              {message.text}
            </div>
          )}

          <FormField
            control={form.control}
            name="firstName"
            rules={{ required: "First name is required" }}
            render={({ field }) => (
              <FormItem>
                <FormLabel>
                  First Name
                  <span className="text-red-500 ml-1">*</span>
                </FormLabel>
                <FormControl>
                  <Input placeholder="Enter your first name" required {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="lastName"
            rules={{ required: "Last name is required" }}
            render={({ field }) => (
              <FormItem>
                <FormLabel>
                  Last Name
                  <span className="text-red-500 ml-1">*</span>
                </FormLabel>
                <FormControl>
                  <Input placeholder="Enter your last name" required {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="email"
            rules={{ 
              required: "Email is required",
              pattern: {
                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                message: "Invalid email address"
              }
            }}
            render={({ field }) => (
              <FormItem>
                <FormLabel>
                  Email address
                  <span className="text-red-500 ml-1">*</span>
                </FormLabel>
                <FormControl>
                  <Input type="email" placeholder="Enter your email" required {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="password"
            rules={{ 
              required: "Password is required",
              minLength: {
                value: 8,
                message: "Password must be at least 8 characters"
              }
            }}
            render={({ field }) => (
              <FormItem>
                <FormLabel>
                  Password
                  <span className="text-red-500 ml-1">*</span>
                </FormLabel>
                <FormControl>
                  <Input type="password" placeholder="Enter your password" required {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="confirmPassword"
            rules={{ 
              required: "Please confirm your password",
              validate: (value) => {
                const password = form.getValues("password");
                return value === password || "Passwords do not match";
              }
            }}
            render={({ field }) => (
              <FormItem>
                <FormLabel>
                  Confirm Password
                  <span className="text-red-500 ml-1">*</span>
                </FormLabel>
                <FormControl>
                  <Input type="password" placeholder="Confirm your password" required {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          
          <div className="flex flex-col justify-center items-center pt-14 gap-4">
            <PrimaryButton
              type="submit"
              disabled={isLoading}
              className="w-full flex items-center justify-center gap-2"
              bgColor="#0057FF"
            >
              <Icon name="envelope" size="sm" />
              Sign Up with email
            </PrimaryButton>
            <PrimaryButton
              type="submit"
              disabled={isLoading}
              className="w-full flex items-center justify-center gap-2"
              bgColor="#0F0F0F"
            >
              <Icon name="apple" type="brands" size="sm" />
              Sign Up with apple
            </PrimaryButton>
            <PrimaryButton
              type="submit"
              disabled={isLoading}
              className="w-full flex items-center justify-center gap-2"
              bgColor="#FFFFFF"
              textColor="#000000"
            >
              <img 
                src="/images/google.svg" 
                alt="Google" 
                className="w-4 h-4"
              />
              Sign Up with Google
            </PrimaryButton>
          </div>
        </form>
      </Form>
    </AuthLayout>
  );
}