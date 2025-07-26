export interface SignUpData {
  email: string;
  password: string;
}

export function validateForm(formData: SignUpData, confirmPassword: string): { isValid: boolean; message: string } {
  if (!formData.email || !formData.password) {
    return { isValid: false, message: "Please fill in all fields." };
  }

  if (formData.password !== confirmPassword) {
    return { isValid: false, message: "The password does not match." };
  }

  if (formData.password.length < 8) {
    return { isValid: false, message: "The password must be at least 8 characters long." };
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(formData.email)) {
    return { isValid: false, message: "Please enter a valid email address." };
  }

  return { isValid: true, message: "" };
}
