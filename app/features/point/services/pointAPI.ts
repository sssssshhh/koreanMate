import type { Point } from "@/features/point/type";

export async function grantPoint(point: Point): Promise<void> {
    const response = await fetch("https://cfn5sk6i5d.execute-api.us-east-1.amazonaws.com/v1/points/grant", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(point),
    });

    if (response.ok) {
        console.log("Point granted successfully");
    } else {
        throw new Error("Failed to grant point");
    }
}

// how to use
// grantPoint({
//     userId: "abc123",
//     pointId: `POINT#${Date.now()}#${uuidv4()}`,
//     amount: 50,
//     type: PointType.Daily,
//   });

export async function deductPoint(userId: String, amount: number): Promise<void> {
    const response = await fetch("https://1k8qpl6s4g.execute-api.us-east-1.amazonaws.com/v1/points/deduct", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({userId, amount}),
    });

    const result = await response.json();

    if (response.ok) {
        console.log("Deducted point successfully:", result.message);
    } else {
        console.log("Deducted point failed:", result.message);
    }
}

// how to use
    // deductPoint("abc123", 10);

export async function fetchTotalPoints(userId: string) {
    const res = await fetch(`https://6361oi0aah.execute-api.us-east-1.amazonaws.com/v1/points/total?userId=${userId}`);
    const data = await res.json();
    console.log("Remaining points:", data.totalPoints);
}

export async function grantPointTemp(point: Point): Promise<void> {
    const response = await fetch("https://jk859xrw81.execute-api.us-east-1.amazonaws.com/v1/points/grantTemp", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(point),
    });

    if (response.ok) {
        console.log("Point granted successfully");
    } else {
        throw new Error("Failed to grant point");
    }
}