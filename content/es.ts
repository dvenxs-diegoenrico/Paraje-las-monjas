/**
 * Copy in Spanish (primary). Edit text here; components never hold copy.
 * Anything marked [por confirmar] is waiting on the client and must not be
 * replaced with a guess.
 */
import type { Locale } from '@/lib/i18n';

export const es = {
  locale: 'es' as Locale,
  htmlLang: 'es-MX',
  meta: {
    siteName: 'Paraje Las Monjas',
    descriptor: 'Jardín · Atlixco, Puebla',
    description:
      'Un jardín cuidado en Atlixco, Puebla. Arquitectura de tabique, piedra y cal, un pabellón de cristal y dos jardines para bodas, bodas íntimas, celebraciones familiares y jornadas.',
    pages: {
      home: { title: 'Paraje Las Monjas · Un jardín cuidado en Atlixco', description: '' },
      lugar: { title: 'El lugar', description: 'Salón de Pilares, Pabellón de Cristal, El Arbolado y La Pradera: los cuatro espacios de Paraje Las Monjas en Atlixco.' },
      celebraciones: { title: 'Celebraciones', description: 'Bodas, bodas íntimas, celebraciones familiares y jornadas de trabajo en un jardín de Atlixco, Puebla.' },
      planear: { title: 'Planear', description: 'Paquetes, servicios incluidos, menú, mobiliario y preguntas frecuentes para planear tu celebración en Paraje Las Monjas.' },
      galeria: { title: 'Galería', description: 'Arquitectura, jardines, mesa y noche: fotografías de Paraje Las Monjas.' },
      visita: { title: 'Agendar visita', description: 'Agenda una visita privada a Paraje Las Monjas, jardín en Atlixco, Puebla.' },
      privacidad: { title: 'Aviso de privacidad', description: 'Aviso de privacidad de Paraje Las Monjas.' },
    },
  },
  a11y: {
    skip: 'Saltar al contenido',
    logo: 'Paraje Las Monjas, jardín en Atlixco',
    mainNav: 'Navegación principal',
    openMenu: 'Abrir menú',
    closeMenu: 'Cerrar menú',
    language: 'Cambiar idioma',
    footerNav: 'Navegación secundaria',
    prev: 'Anterior',
    next: 'Siguiente',
    close: 'Cerrar',
    openImage: 'Ampliar imagen',
  },
  nav: {
    home: 'Inicio',
    lugar: 'El lugar',
    celebraciones: 'Celebraciones',
    planear: 'Planear',
    galeria: 'Galería',
    visita: 'Agendar visita',
    privacidad: 'Aviso de privacidad',
    whatsapp: 'WhatsApp',
    langShort: 'EN',
    langName: 'English',
  },
  whatsappMessage: 'Hola, me gustaría agendar una visita privada a Paraje Las Monjas.',
  priceFrom: 'Desde {price} por invitado',
  pricesNote: 'Precios sujetos a disponibilidad.',
  perGuest: 'por invitado',
  tbc: '[por confirmar]',

  home: {
    hero: {
      eyebrow: 'Jardín · Atlixco, Puebla',
      line1: 'Un jardín',
      line2: 'cuidado',
      line3: 'en Atlixco.',
      lede: 'Tabique, piedra y cal; un pabellón de cristal y dos jardines. Celebraciones con atención y sin prisa.',
      cta: 'Agendar visita',
      secondary: 'Conocer el lugar',
      seal: 'Un jardín cuidado · Atlixco · Puebla · ',
      scroll: 'Desliza',
    },
    manifesto: {
      eyebrow: 'Manifiesto',
      lines: [
        'Hay lugares que se rentan y lugares que se eligen.',
        'Este se hizo con tabique, piedra y cal, como se construye en Puebla desde siempre.',
        'Tiene un pabellón de cristal para mirar el jardín sin salir de la fiesta, y dos jardines: uno de sombra y otro abierto al cielo de Atlixco.',
        'Aquí a las catarinas les dicen monjas, y se quedan porque el jardín está cuidado.',
        'Nosotros también: cuidamos la mesa, el tiempo y a quien llega.',
        'No hace falta disfrazar el lugar. Basta con recibirte bien.',
      ],
    },
    lugar: {
      eyebrow: 'El lugar',
      title: 'Cuatro espacios, un mismo cuidado.',
      link: 'Recorrer el lugar',
    },
    editorial: {
      eyebrow: 'Cuaderno de imágenes',
      title: 'La luz de Atlixco hace casi todo el trabajo.',
    },
    adentro: {
      eyebrow: 'Adentro y afuera',
      title: 'Celebrar con el jardín a la vista.',
      body: [
        'El Pabellón de Cristal es un salón de perfil negro y ventanales: la mesa queda bajo techo y el jardín sigue presente a cada lado.',
        'Si cambia el clima, la fiesta no se mueve. Si cae la tarde, la luz entra hasta la mesa.',
      ],
      link: 'Ver el Pabellón de Cristal',
    },
    capacidades: {
      eyebrow: 'Capacidades',
      title: 'Tres escalas de celebración.',
      intro: 'Escenarios ilustrativos para darte una idea de cómo se usa el jardín según el número de invitados.',
      label: 'escenarios ilustrativos',
      factsTitle: 'Lo que está documentado',
      spacesLabel: 'Espacios que suelen usarse',
      offerLabel: 'Oferta que corresponde',
      link: 'Planear con detalle',
    },
    galeria: {
      eyebrow: 'Galería',
      title: 'Arquitectura, jardines, mesa y noche.',
      link: 'Ver la galería',
    },
    filosofia: {
      eyebrow: 'Filosofía',
      title: 'Menos montaje, más lugar.',
      body: [
        'Un jardín bien cuidado no necesita telones ni escenografía. Por eso la arquitectura queda a la vista: el tabique aparente, la piedra, la cal y el cristal hacen su parte.',
        'Cuidamos el pasto, los setos y la sombra todo el año, no sólo la víspera de una fiesta. Lo que recibes es el lugar como es, preparado con atención.',
      ],
    },
  },

  spaces: [
    {
      id: 'salon-de-pilares',
      name: 'Salón de Pilares',
      blurb: 'Tabique aparente, vigas oscuras, arco y muro de piedra.',
      body: 'Un salón de pilares de tabique aparente que ordenan la mesa, y un muro de piedra que da fondo a la noche.',
      image: 'salonPilares',
    },
    {
      id: 'pabellon-de-cristal',
      name: 'Pabellón de Cristal',
      blurb: 'Cristal y perfil negro: la fiesta con el jardín a la vista.',
      body: 'Ventanales del piso al techo y piso de piedra. Bajo techo, con el verde alrededor.',
      image: 'pabellonCristal',
    },
    {
      id: 'el-arbolado',
      name: 'El Arbolado',
      blurb: 'Sombra moteada, árboles maduros y una fuente.',
      body: 'El jardín de sombra: un pasto amplio bajo árboles maduros, con la fuente al centro y focos colgantes entre las ramas.',
      image: 'arbolado',
    },
    {
      id: 'la-pradera',
      name: 'La Pradera',
      blurb: 'Un prado largo entre setos y cipreses, con luces colgantes.',
      body: 'El jardín abierto al cielo de Atlixco: un prado largo, limitado por setos altos y cipreses.',
      image: 'pradera',
    },
  ],

  materials: {
    eyebrow: 'Materiales',
    title: 'Construido como se construye en Puebla.',
    items: [
      { name: 'Tabique', text: 'Aparente, sin aplanar. El color del barro cocido ordena el salón.' },
      { name: 'Piedra', text: 'En muros y pisos: textura que se siente al caminar y que recibe bien la luz baja.' },
      { name: 'Cal', text: 'Muros encalados que suavizan la luz y dejan respirar al edificio.' },
      { name: 'Cristal', text: 'Un pabellón de perfil negro para celebrar bajo techo sin perder el jardín.' },
    ],
  },

  scales: [
    {
      id: '50',
      guests: 50,
      title: 'Una mesa larga',
      text: 'Ceremonia en El Arbolado y banquete en el Pabellón de Cristal, todos alrededor de una misma mesa.',
      spaces: ['El Arbolado', 'Pabellón de Cristal'],
      offer: 'Bodas íntimas (30 a 50 personas) o Mesa larga con mezcal Irónico',
    },
    {
      id: '150',
      guests: 150,
      title: 'Una fiesta completa',
      text: 'Recepción en el jardín de sombra y banquete en el Salón de Pilares, con el pabellón como sala para la sobremesa.',
      spaces: ['El Arbolado', 'Salón de Pilares', 'Pabellón de Cristal'],
      offer: 'Renta del jardín o Jardín servido',
    },
    {
      id: '300',
      guests: 300,
      title: 'Todo el jardín',
      text: 'La Pradera abierta para la recepción y la pista, con los salones como refugio y lugar de la mesa.',
      spaces: ['La Pradera', 'Salón de Pilares', 'Pabellón de Cristal', 'El Arbolado'],
      offer: 'Jardín servido',
    },
  ],
  scalesFootnote: 'Capacidades por confirmar con la coordinación del jardín.',
  howItWorks: {
    eyebrow: 'Cómo funciona',
    title: 'De la primera pregunta a la última mesa.',
    steps: [
      { icon: 'chat' as const, t: 'Escríbenos', d: 'Fecha tentativa, número de invitados y tipo de celebración. Por WhatsApp o con el formulario.' },
      { icon: 'calendario' as const, t: 'Visita privada', d: 'Recorre el jardín entre semana o el sábado por la mañana, sin prisa.' },
      { icon: 'mesa' as const, t: 'Elige tu paquete', d: 'Renta del jardín, jardín servido, mesa larga con mezcal o boda íntima.' },
      { icon: 'brindis' as const, t: 'Celebra', d: 'Llegas a un jardín preparado con atención. Tú sólo recibes a los tuyos.' },
    ],
  },
  spacesGroups: { roof: 'Bajo techo', open: 'Al aire libre', caption: 'Cuatro espacios que se recorren a pie.' },
  dotsLegend: '= 10 invitados',


  facts: [
    { icon: 'bano' as const, k: 'Baños', v: '4 · dos de damas y dos de caballeros, con papel, jabón y toallas para manos' },
    { icon: 'auto' as const, k: 'Estacionamiento', v: 'Privado, con personal de vigilancia' },
    { icon: 'flama' as const, k: 'Cocina', v: 'Con gas y dos mesas de trabajo, tinas para enfriar (paquetes de renta)' },
    { icon: 'reloj' as const, k: 'Servicio', v: '7 u 8 horas según paquete' },
    { icon: 'personas' as const, k: 'Mínimos', v: '50 invitados · bodas íntimas de 30 a 50 · jornadas desde 25' },
  ],

  offers: {
    eyebrow: 'Paquetes 2026',
    items: [
      {
        id: 'renta-del-jardin',
        name: 'Renta del jardín',
        tagline: 'El lugar, el mobiliario y la cocina para tu propio banquete.',
        variants: [
          {
            name: 'Paquete 1 · Básico',
            price: 120,
            detail: 'Sillas Tiffany',
            includes: [
              'Mesas cuadradas o redondas',
              'Mantel y cubremantel',
              'Sillas Tiffany',
              'Cocina con gas para calentar sus alimentos y dos mesas de trabajo',
              'Tinas para enfriar',
              '4 baños (dos de damas y dos de caballeros)',
              'Papel higiénico, jabón y toallas para manos',
              'Estacionamiento privado y personal de vigilancia',
            ],
          },
          {
            name: 'Paquete 2 · Premium',
            price: 150,
            detail: 'Sillas Cross Back',
            includes: [
              'Mesas cuadradas o redondas',
              'Mantel y cubremantel',
              'Sillas Cross Back',
              'Cocina con gas para calentar sus alimentos y dos mesas de trabajo',
              'Tinas para enfriar',
              '4 baños (dos de damas y dos de caballeros)',
              'Papel higiénico, jabón y toallas para manos',
              'Estacionamiento privado y personal de vigilancia',
            ],
          },
        ],
        terms: '7 horas de servicio · mínimo 50 personas',
      },
      {
        id: 'jardin-servido',
        name: 'Jardín servido',
        tagline: 'El jardín, la mesa puesta y un menú de tres tiempos.',
        variants: [
          {
            name: 'Paquete 3 · Premium + alimentos',
            price: 450,
            detail: '1 mesero por cada 20 invitados',
            includes: [
              'Mesas cuadradas o redondas',
              'Sillas Tiffany',
              'Manteles y cubremanteles',
              'Mesa principal y mesa para pastel',
              '4 baños (dos de damas y dos de caballeros)',
              'Loza para tres tiempos',
              'Meseros (1 por cada 20 invitados)',
              'Agua de sabor, refresco Coca-Cola e hielo para todo el evento',
              'Menú de tres tiempos: crema, pasta y plato principal con guarnición',
              'Estacionamiento privado y personal de vigilancia',
            ],
          },
        ],
        terms: '8 horas de servicio · mínimo 50 personas',
      },
      {
        id: 'mesa-larga-ironico',
        name: 'Mesa larga con mezcal Irónico',
        tagline: 'Mesas vintage, sillas Cross Back y una botella de mezcal por mesa.',
        variants: [
          {
            name: 'Paquete Irónico · Básico + mezcal',
            price: 195,
            detail: 'Una botella de mezcal artesanal Irónico por mesa',
            includes: [
              'Mesas vintage rectangulares',
              'Mantel y cubremantel',
              'Sillas Cross Back',
              'Cocina con gas para calentar sus alimentos y dos mesas de trabajo',
              'Tinas para enfriar',
              '4 baños (dos de damas y dos de caballeros)',
              'Papel higiénico, jabón y toallas para manos',
              'Estacionamiento privado y personal de vigilancia',
              'Una botella de mezcal artesanal Irónico por mesa',
            ],
          },
        ],
        terms: '7 horas de servicio · mínimo 50 personas',
      },
      {
        id: 'bodas-intimas',
        name: 'Bodas íntimas',
        tagline: 'Ceremonia civil en el jardín y banquete servido, de 30 a 50 invitados.',
        variants: [
          {
            name: 'Clásica',
            price: 709,
            detail: 'Sillas Tiffany · mantel de lino beige',
            includes: [
              'Ceremonia civil en el jardín con arco de follaje y flores',
              'Mesa para el juez con mantel de lino beige',
              'Sillas Tiffany para ceremonia y banquete',
              'Banquete en el salón: mesa imperial o mesas redondas',
              'Mantel de lino color beige y centros de mesa estilo romántico',
              'Mesa de novios y mesa para pastel',
              'Loza blanca, cubiertos plateados, copa de vino y vaso',
              'Servilletas de tela',
              'Banquete de tres tiempos: crema, pasta y plato fuerte con guarnición',
              'Agua de sabor, refresco Coca-Cola e hielo',
              'Brindis con espumoso',
              'Meseros (1 por cada 15 invitados) y coordinadora del día',
              '4 baños con papel, jabón y toallas para manos',
              'Estacionamiento privado y personal de vigilancia',
            ],
          },
          {
            name: 'De madera',
            price: 919,
            detail: 'Sillas Cross Back · mesas vintage de madera',
            includes: [
              'Ceremonia civil en el jardín con arco de follaje y flores naturales',
              'Mesa para el juez con mantel de lino beige',
              'Sillas Cross Back para ceremonia y banquete',
              'Banquete en el salón con mesas vintage de madera',
              'Camino de mesa color beige y centros de mesa estilo romántico',
              'Mesa de novios y mesa para pastel',
              'Loza blanca, cubiertos dorados, copa de vino y copa flauta',
              'Servilletas de tela',
              'Banquete de tres tiempos: crema, pasta y plato fuerte con guarnición',
              'Agua de sabor, refresco Coca-Cola e hielo',
              'Brindis con espumoso o mezcalina de mezcal Irónico',
              'Meseros (1 por cada 15 invitados) y coordinadora del día',
              '4 baños con papel, jabón y toallas para manos',
              'Estacionamiento privado y personal de vigilancia',
            ],
          },
        ],
        terms: '7 horas de servicio · de 30 a 50 personas',
      },
      {
        id: 'jornadas',
        name: 'Jornadas',
        tagline: 'Paquete Ejecutivo: un día de trabajo fuera de la oficina, de lunes a viernes.',
        variants: [
          {
            name: 'Medio día · 5 horas',
            price: 200,
            detail: 'Sillas negras acojinadas · $220 con sillas Tiffany',
            includes: [],
          },
          {
            name: 'Día completo · 8 horas',
            price: 240,
            detail: 'Sillas negras acojinadas · $260 con sillas Tiffany',
            includes: [],
          },
        ],
        sharedIncludes: [
          'Área techada exclusiva',
          'Montaje a elegir: tipo escuela o herradura',
          'Dos mesas de trabajo',
          'Sillas negras acojinadas o sillas Tiffany',
          'Coffee break de la mañana: café, té, pan dulce y fruta',
          'Proyector y bocina',
          'Agua en mesa',
          '4 baños con papel, jabón y toallas para manos',
          'Estacionamiento privado y personal de vigilancia',
        ],
        terms: 'Lunes a viernes · mínimo 25 personas · precios más IVA',
      },
    ],
  },

  celebraciones: {
    eyebrow: 'Celebraciones',
    title: 'Cada celebración tiene su escala.',
    intro: 'Bodas, bodas íntimas, reuniones familiares y jornadas de trabajo. El jardín es el mismo; cambia la mesa y el tiempo.',
    kinds: [
      {
        id: 'bodas',
        name: 'Bodas',
        text: 'Ceremonia bajo los árboles, banquete entre pilares de tabique y la pista abierta al cielo. Renta el jardín con tu propio banquete o recíbelo servido.',
        offers: ['renta-del-jardin', 'jardin-servido', 'mesa-larga-ironico'],
        image: 'salonPilares',
      },
      {
        id: 'bodas-intimas',
        name: 'Bodas íntimas',
        text: 'De 30 a 50 invitados, con ceremonia civil en el jardín, banquete de tres tiempos y coordinadora del día.',
        offers: ['bodas-intimas'],
        image: 'mesaLarga',
      },
      {
        id: 'familia',
        name: 'Familia',
        text: 'Aniversarios, bautizos, cumpleaños y comidas largas. La misma atención, a la medida de la familia.',
        offers: ['renta-del-jardin', 'jardin-servido'],
        image: 'mesaCristal',
      },
      {
        id: 'jornadas',
        name: 'Jornadas',
        text: 'Juntas, capacitaciones y retiros de lunes a viernes en un área techada exclusiva, con coffee break y proyector.',
        offers: ['jornadas'],
        image: 'jornadaTiffany',
      },
    ],
    seeOffer: 'Ver qué incluye',
    hideOffer: 'Ocultar detalle',
    includes: 'Incluye',
  },

  menu: {
    eyebrow: 'Menú',
    title: 'Menú general · tres tiempos',
    intro: 'Elige una opción de cada tiempo.',
    courses: [
      { name: 'Cremas', options: ['Champiñón', 'Cilantro', 'Elote', 'Rajas poblanas', 'Calabaza'] },
      { name: 'Pasta', options: ['Roja tradicional', 'Roja horneada tipo lasaña', 'Alfredo', 'A la boloñesa'] },
      { name: 'Pierna', options: ['Adobada', 'Al mango con habanero', 'Al vino con crema', 'En salsa de ciruela con un toque de chipotle'] },
      { name: 'Ensalada o guarnición', options: ['Mix de lechuga con frutos rojos', 'Pastel de papa', 'Puré de papa'] },
    ],
    drinks: 'Agua de sabor a la llegada de los invitados, refresco para acompañar los alimentos y hielo para todo el evento.',
    kids: {
      name: 'Menú infantil',
      price: 180,
      unit: 'por niño',
      items: ['Pizza o hamburguesa (servida en contenedor desechable)', 'Papas gajo (servidas en contenedor desechable)', 'Porción de pasta (servida en plato)'],
    },
  },

  catalogue: {
    eyebrow: 'Catálogo de renta',
    title: 'Mantelería, loza, cristalería y mobiliario.',
    note: 'Precios por evento, sujetos a disponibilidad. Cotiza por WhatsApp.',
    groups: [
      {
        name: 'Mantelería',
        items: [
          ['Mantel redondo', '$60'],
          ['Cubre mantel', '$20'],
          ['Mantel rosa de lino', '$100'],
          ['Mantel beige de lino', '$100'],
          ['Caminos de mesa de gasa beige', '$60'],
          ['Servilletas de tela', '$9'],
        ],
      },
      {
        name: 'Loza',
        items: [
          ['Plato extendido', '$7.50'],
          ['Plato hondo', '$7.50'],
          ['Plato de ensalada', '$8'],
          ['Plato de postre', '$8'],
          ['Plato extendido de barro', '$10'],
          ['Plato hondo de barro', '$10'],
          ['Plato negro extendido', '$10'],
          ['Plato negro hondo', '$10'],
          ['Plato negro para ensalada', '$10'],
          ['Tazas blancas', '$8'],
          ['Sopera', '$100'],
          ['Escofier', '$50'],
          ['Cafeteras', '$80'],
          ['Azucareras con azúcar', '$10'],
        ],
      },
      {
        name: 'Cubiertos',
        items: [
          ['Cuchara, tenedor o cuchillo plateado', '$5.50 c/u'],
          ['Cuchara, tenedor o cuchillo dorado', '$12 c/u'],
        ],
      },
      {
        name: 'Cristalería',
        items: [
          ['Vaso highball', '$7'],
          ['Copa de vino', '$12'],
          ['Copa flauta', '$12'],
          ['Copa diamante rosa', '$15'],
          ['Copa diamante humo', '$15'],
          ['Jarras de cristal', '$35'],
        ],
      },
      {
        name: 'Servicio de mesa',
        items: [
          ['Servilleteros', '$5 · sin costo al rentar loza'],
          ['Salseros', '$5 · sin costo al rentar loza'],
          ['Saleros', '$5 · sin costo al rentar loza'],
          ['Tortilleros', '$5 · sin costo al rentar loza'],
        ],
      },
      {
        name: 'Mobiliario',
        items: [
          ['Sillas Tiffany', '$25'],
          ['Sillas Cross Back', '$45'],
          ['Sillas negras acojinadas', '$10'],
          ['Mesas vintage de madera', '$300'],
          ['Tripié color blanco', '$100'],
          ['Paquete de inflables', '$1,600'],
          ['Equipo de sonido', '[por confirmar]'],
          ['Botella de mezcal artesanal Irónico', '[por confirmar]'],
        ],
      },
      {
        name: 'Arreglos florales',
        items: [
          ['Arreglo floral redondo · follaje, gerberas, lisianthus y clavel', '$250'],
          ['Arreglo floral alto · follaje, rosas, clavel y perritos', '$300'],
          ['Arreglo para mesa principal · troncos con musgo natural, rosas, lisianthus', '$350'],
        ],
      },
    ],
  },

  faq: {
    eyebrow: 'Preguntas frecuentes',
    title: 'Lo que suelen preguntarnos.',
    items: [
      {
        q: '¿Cuántas horas de servicio incluye cada paquete?',
        a: 'Siete horas en Renta del jardín, Mesa larga con mezcal Irónico y Bodas íntimas; ocho horas en Jardín servido. Las jornadas son de medio día (5 horas) o día completo (8 horas).',
      },
      {
        q: '¿Hay un mínimo de invitados?',
        a: 'Los paquetes de celebración son para un mínimo de 50 personas. Las bodas íntimas son de 30 a 50 personas, y las jornadas de trabajo, desde 25 personas.',
      },
      {
        q: '¿Qué incluye la renta del jardín?',
        a: 'Mesas cuadradas o redondas, mantel y cubremantel, sillas Tiffany (Paquete 1) o Cross Back (Paquete 2), cocina con gas y dos mesas de trabajo, tinas para enfriar, 4 baños con papel, jabón y toallas para manos, y estacionamiento privado con personal de vigilancia.',
      },
      {
        q: '¿Puedo traer mi propio banquete?',
        a: 'Sí. Los paquetes de renta incluyen una cocina con gas para calentar los alimentos, dos mesas de trabajo y tinas para enfriar.',
      },
      {
        q: '¿Hay estacionamiento y seguridad?',
        a: 'Sí. El jardín cuenta con estacionamiento privado y personal de vigilancia en todos los paquetes.',
      },
      {
        q: '¿Cuántos baños hay?',
        a: 'Cuatro: dos de damas y dos de caballeros, con papel higiénico, jabón y toallas para manos.',
      },
      {
        q: '¿Qué mobiliario puedo rentar?',
        a: 'Mantelería de lino, loza blanca, negra y de barro, cubiertos plateados o dorados, cristalería, sillas Tiffany, Cross Back y negras acojinadas, mesas vintage de madera, arreglos florales, tripié blanco y paquete de inflables. Los precios están en el catálogo de renta.',
      },
      {
        q: '¿Cómo funciona el menú?',
        a: 'Es un menú de tres tiempos: eliges una crema, una pasta y una pierna con ensalada o guarnición. Incluye agua de sabor a la llegada, refresco e hielo para todo el evento. El menú infantil cuesta $180 por niño.',
      },
      {
        q: '¿Cuántos invitados caben en cada espacio?',
        a: '[por confirmar] La coordinación del jardín te confirma la capacidad según el montaje y la fecha.',
      },
      {
        q: '¿Dónde está el jardín y cuál es el horario de visitas?',
        a: 'Estamos en Atlixco, Puebla. La dirección exacta y el horario de visitas están [por confirmar]; escríbenos por WhatsApp y te compartimos la ubicación al agendar tu visita.',
      },
    ],
  },

  form: {
    title: 'Cuéntanos qué imaginas',
    intro: 'Te respondemos en menos de 24 horas. Los campos marcados con * son necesarios.',
    name: 'Nombre',
    email: 'Correo',
    phone: 'Teléfono o WhatsApp',
    contactHint: 'Déjanos al menos un medio de contacto.',
    type: 'Tipo de celebración',
    types: [
      ['boda', 'Boda'],
      ['boda-intima', 'Boda íntima'],
      ['familiar', 'Familiar'],
      ['jornada', 'Jornada'],
      ['otra', 'Otra'],
    ],
    guests: 'Invitados aproximados',
    date: 'Fecha tentativa',
    visit: 'Preferencia de visita',
    visits: [
      ['entre-semana', 'Entre semana'],
      ['sabado', 'Sábado por la mañana'],
      ['sin-preferencia', 'Sin preferencia'],
    ],
    message: '¿Algo más que debamos saber?',
    submit: 'Enviar',
    sending: 'Enviando…',
    success: 'Gracias. Te escribimos en menos de 24 horas.',
    errors: {
      name: 'Escribe tu nombre.',
      contact: 'Déjanos un correo o un teléfono para responderte.',
      email: 'Revisa el correo; parece incompleto.',
      phone: 'Revisa el teléfono; usa sólo números, espacios o +.',
      date: 'Elige una fecha tentativa.',
      guests: 'Escribe un número de invitados válido.',
      generic: 'No pudimos enviar tu mensaje. Inténtalo de nuevo o escríbenos por WhatsApp.',
      rate: 'Recibimos varios mensajes desde tu conexión. Espera unos minutos o escríbenos por WhatsApp.',
      captcha: 'No pudimos verificar el envío. Recarga la página e inténtalo de nuevo.',
      unavailable: 'El formulario aún no está conectado. Escríbenos por WhatsApp y te respondemos hoy.',
    },
    required: 'obligatorio',
    privacy: 'Usamos tus datos sólo para responderte. Consulta el aviso de privacidad.',
  },

  visit: {
    eyebrow: 'Visita privada',
    title: 'Ven a conocerlo en persona.',
    body: 'Recorre el jardín con la coordinación, a tu ritmo. Ofrecemos visitas entre semana o el sábado por la mañana; te confirmamos el horario por WhatsApp.',
    whatsappCta: 'Escribir por WhatsApp',
    or: 'o, si lo prefieres,',
    slots: ['Entre semana', 'Sábado por la mañana'],
  },

  visitaPage: {
    eyebrow: 'Agendar visita',
    title: 'Una visita sin prisa.',
    intro: 'Cuéntanos la fecha que imaginas y el tipo de celebración. La coordinación del jardín te escribe para confirmar el día y la hora de tu visita.',
    contactTitle: 'Contacto',
    addressLabel: 'Dirección',
    address: '[dirección por confirmar] · Atlixco, Puebla',
    hoursLabel: 'Horario de visitas',
    hours: '[horario por confirmar] · entre semana o sábado por la mañana',
    mapTitle: 'Mapa',
    mapPlaceholder: 'El mapa se publica cuando confirmemos la dirección. Mientras tanto, te compartimos la ubicación por WhatsApp.',
  },

  lugarPage: {
    eyebrow: 'El lugar',
    title: 'Arquitectura poblana, un pabellón de cristal y dos jardines.',
    intro: 'Paraje Las Monjas está en Atlixco, Puebla. Lo forman cuatro espacios que se recorren a pie: dos bajo techo y dos al aire libre.',
    monjas: {
      title: '¿Por qué Las Monjas?',
      text: 'En Atlixco a las catarinas se les dice monjas, y Las Monjas es también el nombre del barrio. Nos gusta pensar que se quedan porque el jardín está cuidado.',
    },
  },

  planearPage: {
    eyebrow: 'Planear',
    title: 'Todo lo que necesitas para planear.',
    intro: 'Paquetes, servicios incluidos, menú, mobiliario y respuestas a las preguntas frecuentes. Si algo no está aquí, pregúntanos.',
    toc: ['Capacidades', 'Paquetes', 'Menú', 'Mobiliario', 'Preguntas'],
    includedTitle: 'Incluido en todos los paquetes',
  },

  galeriaPage: {
    eyebrow: 'Galería',
    title: 'Un cuaderno de imágenes.',
    intro: 'Fotografías de muestra, ordenadas por capítulo. Pronto, fotografía nueva de cada espacio.',
    chapters: {
      arquitectura: { name: 'Arquitectura', intro: 'Tabique, piedra, cal y cristal: la construcción a la vista.' },
      jardines: { name: 'Jardines', intro: 'Un jardín de sombra y otro abierto al cielo de Atlixco.' },
      mesa: { name: 'Mesa', intro: 'Lino, madera, barro y lo que se sirve encima.' },
      noche: { name: 'Noche', intro: 'Cuando se encienden las luces colgantes. Fotografía nocturna por confirmar.' },
    },
  },

  privacidad: {
    title: 'Aviso de privacidad',
    updated: 'Última actualización: noviembre de 2026',
    sections: [
      {
        h: 'Responsable',
        p: 'Paraje Las Monjas ([razón social por confirmar]), con domicilio en [dirección por confirmar], Atlixco, Puebla, es responsable del tratamiento de los datos personales que nos compartes.',
      },
      {
        h: 'Datos que recabamos',
        p: 'Nombre, correo electrónico, teléfono o WhatsApp, tipo de celebración, número aproximado de invitados, fecha tentativa y la información adicional que decidas escribir en el formulario.',
      },
      {
        h: 'Finalidad',
        p: 'Usamos tus datos únicamente para responder tu solicitud, agendar una visita y preparar una cotización. No los usamos con fines publicitarios ni los vendemos.',
      },
      {
        h: 'Transferencias',
        p: 'Tus datos se envían por correo electrónico a la coordinación del jardín mediante un proveedor de envío de correo. No los compartimos con terceros para otros fines.',
      },
      {
        h: 'Derechos ARCO',
        p: 'Puedes solicitar el acceso, rectificación, cancelación u oposición al tratamiento de tus datos escribiendo por WhatsApp al +52 244 785 5365 o al correo [correo por confirmar].',
      },
      {
        h: 'Cookies y medición',
        p: 'Este sitio no usa cookies de seguimiento. Medimos visitas de forma agregada y anónima con Vercel Analytics.',
      },
    ],
  },

  footer: {
    tagline: 'Un jardín cuidado.',
    addressLabel: 'Dirección',
    address: '[dirección por confirmar]',
    city: 'Atlixco, Puebla, México',
    hoursLabel: 'Visitas',
    hours: '[horario de visitas por confirmar]',
    followLabel: 'Síguenos',
    contactLabel: 'Contacto',
    privacy: 'Aviso de privacidad',
    rights: 'Paraje Las Monjas',
  },
};

export type Content = typeof es;
