
import dynamic from 'next/dynamic'
import { Roboto } from 'next/font/google'
import Image from 'next/image'
import React, { lazy, Suspense } from 'react'




const RendimientoPage = () => {
    //La image puede mejorar prolemas en el LCP y FCP
    //Google Fonts mejora CLS y FCP
    const robot = Roboto({subsets:["latin"], weight:["400", "700"]})
    

    //Mejora TBT, Disminuye el bundle inicial( bundle inicial me refiero a el contenido de javascript que vamos a descargar al inicio) y ademas me genera un loading
    const ArchivoMuyPesado = dynamic(() => import("../../components/ArchivoMuyPesado"), {
        loading: () => <p>Cargando Grafico...</p>,
        ssr:false //opcional si necesita "window"
    })

    //BONUS EN CASO DE QUE SEA SOLO REACT SIN NEXT
    const ArchivoMuyPesado2 = lazy(() => import("../../components/ArchivoMuyPesado"))

  return (
    <div>
        <Image src={} alt='' width={} height={} /> {/*Lazy loading se aplica automaticamente en Image */}
        
        <ArchivoMuyPesado/>

        <Suspense fallback={<p>Cargando...</p>}>
            <ArchivoMuyPesado2/>
            <ArchivoCompartido/>
        </Suspense>

    {true ? true : false }
        <Suspense fallback={<p>Analizando...</p>}>
            <ArchivoLiviano/>
        </Suspense>
    </div>
  )
}

export default RendimientoPage