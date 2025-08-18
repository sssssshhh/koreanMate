import type { Star } from "../point/types";

// POST /api/stars/grant
export async function grantStar(star: Star): Promise<void> {
    const response = await fetch("https://ffo8jmbc7l.execute-api.us-east-1.amazonaws.com/v1/stars/grant", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(star),
    });

    if (response.ok) {
        console.log("Star granted successfully");
    } else {
        const result = await response.json();
        throw new Error(`Failed to grant star: ${result.message || response.statusText}`);
    }
}