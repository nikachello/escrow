import { NextResponse, type NextRequest } from "next/server";
import { pinata } from "@/utils/config";
import { prisma } from "@/lib/prisma";
import { auth } from "@/lib/auth/auth";
import { headers } from "next/headers";

async function getSessionOrThrow() {
  const session = await auth.api.getSession({ headers: await headers() });
  if (!session?.user) {
    throw new Response(JSON.stringify({ error: "Unauthorized" }), {
      status: 401,
    });
  }
  return session;
}

export async function POST(request: NextRequest) {
  try {
    const session = await getSessionOrThrow();

    const data = await request.formData();
    const file = data.get("file") as File | null;
    const dealId = data.get("dealId") as string | null;
    const context = data.get("context") as string | null;

    if (!file || !context) {
      return NextResponse.json(
        { error: "საჭირო ველები არ არის" },
        { status: 400 }
      );
    }

    if (context === "tracking") {
      if (!dealId) {
        return NextResponse.json(
          { error: "DealId აუცილებელია tracking კონტექსტისთვის" },
          { status: 400 }
        );
      }

      const deal = await prisma.deal.findUnique({
        where: { id: dealId },
      });

      if (!deal) {
        return NextResponse.json(
          { error: "გარიგება არ მოიძებნა" },
          { status: 404 }
        );
      }

      // ✅ Verify that logged-in user is seller
      if (deal.sellerEmail !== session.user.email) {
        return NextResponse.json({ error: "არაავტორიზებული" }, { status: 403 });
      }

      // ✅ Upload securely
      const fileData = await pinata.upload.public.file(file);
      const url = await pinata.gateways.public.convert(fileData.cid);

      // ✅ Save to DB
      await prisma.deal.update({
        where: { id: dealId },
        data: { trackingImage: url },
      });

      return NextResponse.json({ id: fileData.id, url }, { status: 200 });
    }

    return NextResponse.json({ error: "უცნობი context" }, { status: 400 });
  } catch (err) {
    if (err instanceof Response) return err; // thrown from getSessionOrThrow
    console.error("File Upload Error:", err);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const session = await getSessionOrThrow();

    const data = await request.formData();
    const imageId = data.get("imageId") as string | null;
    const dealId = data.get("dealId") as string | null;
    const context = data.get("context") as string | null;

    if (!imageId || !context) {
      return NextResponse.json(
        { error: "საჭირო ველები არ არის" },
        { status: 400 }
      );
    }

    if (context === "tracking") {
      if (!dealId) {
        return NextResponse.json(
          { error: "DealId აუცილებელია tracking კონტექსტისთვის" },
          { status: 400 }
        );
      }

      const deal = await prisma.deal.findUnique({ where: { id: dealId } });
      if (!deal) {
        return NextResponse.json(
          { error: "გარიგება არ მოიძებნა" },
          { status: 404 }
        );
      }

      // ✅ Authorization check
      if (deal.sellerEmail !== session.user.email) {
        return NextResponse.json({ error: "არაავტორიზებული" }, { status: 403 });
      }

      // ✅ Delete from Pinata
      const unpin = await pinata.files.public.delete([imageId]);
      if (!unpin) {
        return NextResponse.json(
          { error: "ვერ მოხერხდა ფაილის წაშლა" },
          { status: 500 }
        );
      }

      // ✅ Update DB
      await prisma.deal.update({
        where: { id: dealId },
        data: { trackingImage: null },
      });

      return NextResponse.json({}, { status: 200 });
    }

    return NextResponse.json({ error: "უცნობი context" }, { status: 400 });
  } catch (err) {
    if (err instanceof Response) return err;
    console.error("File Delete Error:", err);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
