import GuestLayout from "@/features/layouts/guestLayout";
import MainLayout from "@/features/layouts/mainLayout";

export default function HomePage() {
  let isLoggedIn = false;
  return (isLoggedIn ? 
      <MainLayout />
    : <GuestLayout />
  );
}