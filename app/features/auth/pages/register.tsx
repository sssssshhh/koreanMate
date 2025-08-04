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
import { Button } from "@/common/components/ui/button";

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
      navigate('/login');
    } catch (error: any) {
      console.error("Sign Up Error:", error);
      setMessage({ type: "error", text: error.message || "Registration failed" });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#FFFDD0] py-12 px-4 sm:px-6 lg:px-8">
      <div className="w-[1284px] h-[1092px] px-6 relative bg-white border-l border-r border-t border-amber-200 flex flex-col justify-center items-center gap-7 overflow-hidden">
      
        
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
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
                  <FormLabel>First Name</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter your first name" {...field} />
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
                  <FormLabel>Last Name</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter your last name" {...field} />
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
                  <FormLabel>Email address</FormLabel>
                  <FormControl>
                    <Input type="email" placeholder="Enter your email" {...field} />
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
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <Input type="password" placeholder="Enter your password" {...field} />
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
                  <FormLabel>Confirm Password</FormLabel>
                  <FormControl>
                    <Input type="password" placeholder="Confirm your password" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button
              type="submit"
              disabled={isLoading}
              className="w-full"
            >
              {isLoading ? "Processing..." : "Sign Up"}
            </Button>

            <div className="text-center text-sm text-gray-600">
              Already have an account?{" "}
              <Link to="/login" className="text-blue-600 hover:text-blue-500">
                Login
              </Link>
            </div>
          </form>
        </Form>
      </div>
    </div>
  );
}