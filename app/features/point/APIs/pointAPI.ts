import type { Point } from "@/features/point/type";

export async function grantPoint(point: Point): Promise<void> {
    const response = await fetch("https://s8kmgytpe1.execute-api.us-east-1.amazonaws.com/v1/points/grant", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(point),
    });

    if (response.ok) {
        console.log("Point granted successfully");
    } else {
        const result = await response.json();
        throw new Error(`Failed to grant point: ${result.message || response.statusText}`);
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

    if (response.ok) {
        console.log("Point deducted successfully");
    } else {
        const result = await response.json();
        throw new Error(`Failed to deduct point: ${result.message || response.statusText}`);
    }
}

export async function fetchTotalPoints(userId: string): Promise<number> {
    const response = await fetch(`https://6361oi0aah.execute-api.us-east-1.amazonaws.com/v1/points/total?userId=${userId}`);
    const result = await response.json();

    if (response.ok) {
        console.log("Remaining points:", result.totalPoints);
        return result.totalPoints;
    } else {
        throw new Error(`Failed to fetch total points: ${result.message || result.statusText}`);
    }
}

export async function grantPointTemp(point: Point): Promise<void> {
    const response = await fetch("https://d0emspcwka.execute-api.us-east-1.amazonaws.com/v1/points/daily", {
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