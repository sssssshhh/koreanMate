import { useEffect } from "react";
import { useNavigate } from "react-router";
import MainLayout from "@/features/layouts/mainLayout";
import { deductPoint, fetchTotalPoints, grantPoint, grantPointTemp } from "@/features/point/APIs/pointAPI";
import { PointType, type Point } from "@/features/point/type";

export default function HomePage() {
  const navigate = useNavigate();

  useEffect(() => {
    grantPoint({
        userId: "abc12345",
        pointId: "12345678",
        amount: 10
    })
    // fetchTotalPoints("abc123");
    // deductPoint("abc123", 10);


    const urlParams  = new URLSearchParams(window.location.search);
    const code = urlParams.get("code");

    async function fetchToken() {
        if (!code) return;
        console.log("🔑 code:", code);

        const response = await fetch(
        "https://us-east-1qplni92vm.auth.us-east-1.amazoncognito.com/oauth2/token",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
          },
          body: new URLSearchParams({
            grant_type: "authorization_code",
            client_id: import.meta.env.VITE_CLIENT_ID,
            code: code as string,
            redirect_uri: import.meta.env.VITE_REDIRECT_URI,
          }),
        }
      );

      const data = await response.json();
      console.log("🔑 Tokens:", data);

      if (data.id_token) {
        localStorage.setItem("id_token", data.id_token);
        localStorage.setItem("access_token", data.access_token);
        localStorage.setItem("refresh_token", data.refresh_token);
        navigate("/");
      }
    }

    fetchToken();
  }, [navigate]);

  return (
    <MainLayout />
  );
}
