'use client';
import { useState, useEffect } from 'react';
import axios from 'axios';
import {
  hamburguesasBase,
  ingredientesOpcionales,
  bebidas,
} from '@/lib/data';

export default function Home() {
  const [nombreCombo, setNombreCombo] = useState('');
  const [base, setBase] = useState('');
  const [bebida, setBebida] = useState('');
  const [ingredientes, setIngredientes] = useState([]);
  const [precio, setPrecio] = useState(0);
  const [calorias, setCalorias] = useState(0);
  const [combos, setCombos] = useState([]);

  useEffect(() => {
    calcularTotales();
  }, [base, bebida, ingredientes]);

  const calcularTotales = () => {
    let totalPrecio = 0;
    let totalCalorias = 0;

    const baseObj = hamburguesasBase.find((b) => b.nombre === base);
    if (baseObj) {
      totalPrecio += baseObj.precio;
      totalCalorias += baseObj.calorias;
    }

    const bebidaObj = bebidas.find((b) => b.nombre === bebida);
    if (bebidaObj) {
      totalPrecio += bebidaObj.precio;
      totalCalorias += bebidaObj.calorias;
    }

    ingredientes.forEach((ing) => {
      const ingObj = ingredientesOpcionales.find((i) => i.nombre === ing);
      if (ingObj) {
        totalPrecio += ingObj.precio;
        totalCalorias += ingObj.calorias;
      }
    });

    setPrecio(totalPrecio);
    setCalorias(totalCalorias);
  };

  const toggleIngrediente = (ing) => {
    if (ingredientes.includes(ing)) {
      setIngredientes(ingredientes.filter((i) => i !== ing));
    } else {
      setIngredientes([...ingredientes, ing]);
    }
  };

  const guardarCombo = async () => {
    try {
      const res = await axios.post('/api/combos', {
        nombre: nombreCombo,
        base,
        ingredientes,
        bebida,
        precioTotal: precio,
        caloriasTotales: calorias,
      });

      setCombos((prev) => [...prev, res.data]);
      setNombreCombo('');
      setBase('');
      setBebida('');
      setIngredientes([]);
    } catch {
      alert('Error al guardar combo');
    }
  };

  return (
    <main className="p-6 max-w-2xl mx-auto font-sans">
      <h1 className="text-3xl font-bold mb-4 text-center">🍔 Armá tu Combo</h1>

      <input
        className="w-full border px-4 py-2 rounded mb-4"
        placeholder="Nombre del combo"
        value={nombreCombo}
        onChange={(e) => setNombreCombo(e.target.value)}
      />

      <h2 className="text-xl font-semibold mb-2">Hamburguesa base</h2>
      <div className="mb-4 space-y-2">
        {hamburguesasBase.map((b) => (
          <label key={b.nombre} className="block">
            <input
              type="radio"
              name="base"
              className="mr-2"
              checked={base === b.nombre}
              onChange={() => setBase(b.nombre)}
            />
            {b.nombre} (${b.precio}) – {b.calorias} cal
          </label>
        ))}
      </div>

      <h2 className="text-xl font-semibold mb-2">Ingredientes</h2>
      <div className="mb-4 space-y-1">
        {ingredientesOpcionales.map((i) => (
          <label key={i.nombre} className="block">
            <input
              type="checkbox"
              className="mr-2"
              checked={ingredientes.includes(i.nombre)}
              onChange={() => toggleIngrediente(i.nombre)}
            />
            {i.nombre} (${i.precio}) – {i.calorias} cal
          </label>
        ))}
      </div>

      <h2 className="text-xl font-semibold mb-2">Bebida</h2>
      <div className="mb-6 space-y-2">
        {bebidas.map((b) => (
          <label key={b.nombre} className="block">
            <input
              type="radio"
              name="bebida"
              className="mr-2"
              checked={bebida === b.nombre}
              onChange={() => setBebida(b.nombre)}
            />
            {b.nombre} (${b.precio}) – {b.calorias} cal
          </label>
        ))}
      </div>

      <div className="text-lg font-medium mb-4">
        Total: <span className="font-bold">${precio}</span> –{' '}
        <span className="text-red-600">{calorias} cal</span>
      </div>

      <button
        className="bg-yellow-500 hover:bg-yellow-600 text-white px-4 py-2 rounded w-full"
        onClick={guardarCombo}
      >
        ✅ Confirmar Combo
      </button>

      <h2 className="text-2xl mt-8 font-bold">🥤 Combos creados</h2>
      <ul className="mt-4 space-y-2">
        {combos.map((c) => (
          <li key={c._id} className="border p-3 rounded shadow">
            <strong>{c.nombre}</strong> – ${c.precioTotal} – {c.caloriasTotales} cal
            <br />
            <span className="text-sm text-gray-600">
              {c.base} + {c.ingredientes.join(', ')} + {c.bebida}
            </span>
          </li>
        ))}
      </ul>
    </main>
  );
}
