import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";

export async function GET(request: Request) {
    const { searchParams } = new URL(request.url);
    const name = searchParams.get("name");

    if (!name) {
        return new NextResponse("Missing component name", { status: 400 });
    }

    try {
        const filePath = path.join(process.cwd(), "components", `${name}.tsx`);
        const code = fs.readFileSync(filePath, "utf-8");
        return new NextResponse(code, { status: 200 });
    } catch (error) {
        console.log('error', error)
        return new NextResponse("Component file not found", { status: 404 });

    }
}
