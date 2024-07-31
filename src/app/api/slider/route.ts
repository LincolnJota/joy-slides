let slideIndex = 0;

export async function GET() {
  return Response.json({ index: slideIndex })
}

export async function POST(req: Request) {
  const result = await req.json()
  //slideIndex = result.index;
  if (result.action == "next") {
    if (slideIndex == 8) return Response.json({ index: slideIndex })
    slideIndex++;
  } else if (result.action == "back") {
    if (slideIndex == 0) return Response.json({ index: slideIndex })

    slideIndex--;
  } else if (result.action == "clear") {
    slideIndex = 0;
  }

  return Response.json({ index: slideIndex })
}