import GuestLayout from "@/features/layouts/guestLayout";
import MainLayout from "@/features/layouts/mainLayout";

export default function HomePage() {
  let isLoggedIn = true;
  return (isLoggedIn ? 
      <MainLayout />
    : <GuestLayout />
  );
}