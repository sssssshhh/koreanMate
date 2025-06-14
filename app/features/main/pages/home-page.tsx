import GuestLayout from "~/features/layouts/guestLayout";
import Chapters from "~/features/stories/pages/chapters";

export default function HomePage() {
  let isLoggedIn = true;
  return (isLoggedIn ? 
      <Chapters />
    : <GuestLayout />
  );
}