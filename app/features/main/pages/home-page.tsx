import { useEffect } from "react";
import { useNavigate } from "react-router";
import MainLayout from "@/features/layouts/mainLayout";
import { deductPoint, fetchTotalPoints, grantPointTemp } from "@/features/point/services/pointAPI";
import { PointType, type Point } from "@/features/point/type";

export default function HomePage() {
  const navigate = useNavigate();

  useEffect(() => {
    grantPointTemp({
        userId: "abc123",
        pointId: "123456",
        amount: 10
    })
    // fetchTotalPoints("abc123");
    //  deductPoint("abc123", 10);


    const urlParams  = new URLSearchParams(window.location.search);
    const code = urlParams.get("code");

    async function fetchToken() {
        if (!code) return;
        console.log("🔑 code:", code);
        const response = await fetch(
        "https://ap-northeast-1yqlvcbctk.auth.us-east-1.amazoncognito.com/oauth2/token",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
          },
          body: new URLSearchParams({
            grant_type: "authorization_code",
            client_id: "4fq95s8bn126sm56e769tunmk6",
            code: code as string,
            redirect_uri: "http://localhost:5173/",
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
