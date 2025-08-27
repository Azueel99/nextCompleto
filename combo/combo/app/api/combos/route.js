import { connectDB } from "@/lib/mongodb";
import Combo from "@/models/Combo";
import { NextResponse } from "next/server";

export async function GET() {
  await connectDB();
  const combos = await Combo.find();
  return NextResponse.json(combos);
}

export async function POST(request) {
  await connectDB();
  const body = await request.json();
  const { nombre, base, ingredientes, bebida, precioTotal, caloriasTotales } = body;

  if (!nombre || !base || !bebida) {
    return NextResponse.json({ error: "Faltan datos" }, { status: 400 });
  }

  const nuevo = await Combo.create({
    nombre,
    base,
    ingredientes,
    bebida,
    precioTotal,
    caloriasTotales,
  });

  return NextResponse.json(nuevo, { status: 201 });
}
