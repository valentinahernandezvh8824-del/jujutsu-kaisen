/* ============================================================
   Archivo de datos de Jujutsu Kaisen
   Cada personaje contiene su información, técnicas y estadísticas.
   ============================================================ */

const GRADOS = {
  especial: { label: "Grado Especial", color: "#b026ff" },
  grado1: { label: "Grado 1", color: "#ff5c00" },
  grado2: { label: "Grado 2", color: "#2f9e44" },
  grado3: { label: "Grado 3", color: "#1c7ed6" },
  grado4: { label: "Grado 4", color: "#868e96" },
  maldicion: { label: "Espíritu Maldito", color: "#c92a2a" }
};

const PERSONAJES = [
  {
    id: "yuji",
    nombre: "Yuji Itadori",
    kanji: "虎杖悠仁",
    epiteto: "El recipiente de Sukuna",
    afiliacion: "Escuela de Tokio",
    grado: "grado4",
    clan: "—",
    color: "#e63946",
    inicial: "虎",
    arte: "assets/personajes/yuji.svg",
    descripcion:
      "Estudiante de primer año del Instituto Técnico de Jujutsu de Tokio. Tras tragar el dedo de Ryomen Sukuna se convierte en su recipiente y acepta ser ejecutado el día que consuma los veinte dedos restantes. Su fuerza física es sobrehumana incluso sin energía maldita.",
    tecnicas: ["Puño Divergente", "Black Flash", "Control del cuerpo de Sukuna", "Golpe de energía maldita"],
    dominio: null,
    stats: { fuerza: 92, velocidad: 85, energia: 78, tecnica: 70, inteligencia: 74 }
  },
  {
    id: "megumi",
    nombre: "Megumi Fushiguro",
    kanji: "伏黒恵",
    epiteto: "Heredero de los Diez Sombras",
    afiliacion: "Escuela de Tokio",
    grado: "grado2",
    clan: "Clan Zenin",
    color: "#4c6ef5",
    inicial: "伏",
    arte: "assets/personajes/megumi.svg",
    descripcion:
      "Usuario de la Técnica de las Diez Sombras, la técnica hereditaria del clan Zenin. Invoca shikigami desde su sombra y hereda sus habilidades cuando los derrota. Fue criado por Satoru Gojo y sueña con salvar a gente que no puede salvarse a sí misma.",
    tecnicas: ["Diez Sombras", "Perros Divinos", "Nue", "Gran Serpiente", "Máximo: Mahoraga"],
    dominio: "Jardín de Chimera (incompleto)",
    stats: { fuerza: 74, velocidad: 80, energia: 88, tecnica: 95, inteligencia: 90 }
  },
  {
    id: "nobara",
    nombre: "Nobara Kugisaki",
    kanji: "釘崎野薔薇",
    epiteto: "La bruja del martillo",
    afiliacion: "Escuela de Tokio",
    grado: "grado3",
    clan: "—",
    color: "#f08c00",
    inicial: "釘",
    arte: "assets/personajes/nobara.svg",
    descripcion:
      "Llegó a Tokio desde el campo con la promesa de vivir para sí misma. Su Técnica de Muñeco de Paja conecta su martillo, sus clavos y la energía maldita de sus objetivos, ignorando distancias para destruirlos desde dentro.",
    tecnicas: ["Técnica de Muñeco de Paja", "Resonancia", "Pasador", "Clavos malditos"],
    dominio: null,
    stats: { fuerza: 68, velocidad: 76, energia: 80, tecnica: 88, inteligencia: 82 }
  },
  {
    id: "gojo",
    nombre: "Satoru Gojo",
    kanji: "五条悟",
    epiteto: "El hechicero más fuerte",
    afiliacion: "Escuela de Tokio",
    grado: "especial",
    clan: "Clan Gojo",
    color: "#22b8cf",
    inicial: "五",
    arte: "assets/personajes/gojo.svg",
    descripcion:
      "Portador de los Seis Ojos y de la técnica Ilimitado. Puede manipular el infinito entre él y cualquier amenaza, por lo que casi nada llega a tocarlo. Es profesor de primer año y su objetivo es reformar el mundo de la hechicería desde la educación.",
    tecnicas: ["Ilimitado", "Infinito", "Azul", "Rojo", "Púrpura", "Seis Ojos"],
    dominio: "Vacío Infinito",
    stats: { fuerza: 90, velocidad: 98, energia: 100, tecnica: 100, inteligencia: 96 }
  },
  {
    id: "maki",
    nombre: "Maki Zenin",
    kanji: "禪院真希",
    epiteto: "La que rechazó su clan",
    afiliacion: "Escuela de Tokio",
    grado: "grado4",
    clan: "Clan Zenin",
    color: "#2f9e44",
    inicial: "禪",
    arte: "assets/personajes/maki.svg",
    descripcion:
      "Nacida sin capacidad para ver espíritus malditos, Maki compensa su falta de energía maldita con una Restricción Celestial que potencia su cuerpo al máximo. Tras los sucesos del Incidente de Shibuya despierta un poder que iguala a los de Grado Especial.",
    tecnicas: ["Restricción Celestial", "Maestría con herramientas malditas", "Lanza de la División del Cielo", "Combate cuerpo a cuerpo"],
    dominio: null,
    stats: { fuerza: 96, velocidad: 94, energia: 30, tecnica: 86, inteligencia: 90 }
  },
  {
    id: "inumaki",
    nombre: "Toge Inumaki",
    kanji: "狗巻棘",
    epiteto: "El hechicero de la palabra",
    afiliacion: "Escuela de Tokio",
    grado: "grado2",
    clan: "Clan Inumaki",
    color: "#7950f2",
    inicial: "狗",
    arte: "assets/personajes/inumaki.svg",
    descripcion:
      "Usuario de la Palabra Maldita: cada frase que pronuncia se convierte en una orden que la energía maldita obliga a cumplir. Por eso habla en nombres de ingredientes de onigiri y evita herir a sus aliados con su propia voz.",
    tecnicas: ["Palabra Maldita", "¡No te muevas!", "¡Explota!", "¡Duerme!"],
    dominio: null,
    stats: { fuerza: 60, velocidad: 72, energia: 82, tecnica: 91, inteligencia: 88 }
  },
  {
    id: "panda",
    nombre: "Panda",
    kanji: "パンダ",
    epiteto: "Cadáver maldito mutante",
    afiliacion: "Escuela de Tokio",
    grado: "grado2",
    clan: "—",
    color: "#adb5bd",
    inicial: "熊",
    arte: "assets/personajes/panda.svg",
    descripcion:
      "No es un panda real, sino un cadáver maldito mutante creado por el director Masamichi Yaga. Tiene tres núcleos que le permiten cambiar entre modos de combate: Panda, Gorila y Hermana. Es el alma comedia del grupo de primer año.",
    tecnicas: ["Modo Gorila", "Modo Hermana", "Tres núcleos", "Fuerza bruta maldita"],
    dominio: null,
    stats: { fuerza: 88, velocidad: 70, energia: 76, tecnica: 68, inteligencia: 78 }
  },
  {
    id: "yuta",
    nombre: "Yuta Okkotsu",
    kanji: "乙骨憂太",
    epiteto: "El hechicero de la reina maldita",
    afiliacion: "Escuela de Tokio",
    grado: "especial",
    clan: "Clan Gojo",
    color: "#f06595",
    inicial: "乙",
    arte: "assets/personajes/yuta.svg",
    descripcion:
      "Estudiante de segundo año y uno de los cuatro hechiceros de Grado Especial. Está maldito por Rika, su amiga de la infancia convertida en espíritu maldito de poder inmenso. Su técnica Copiar le permite replicar las habilidades de otros hechiceros.",
    tecnicas: ["Copiar", "Rika", "Espada maldita", "Refuerzo de energía maldita"],
    dominio: "Auténtico Amor Verdadero",
    stats: { fuerza: 86, velocidad: 88, energia: 99, tecnica: 97, inteligencia: 84 }
  },
  {
    id: "nanami",
    nombre: "Kento Nanami",
    kanji: "七海建人",
    epiteto: "El asalariado de la hechicería",
    afiliacion: "Escuela de Tokio",
    grado: "grado1",
    clan: "—",
    color: "#f59f00",
    inicial: "七",
    arte: "assets/personajes/nanami.svg",
    descripcion:
      "Ex ejecutivo que dejó el mundo corporativo para volver a la hechicería por vocación. Su Técnica de Proporción divide a su objetivo en siete partes iguales y crea un punto débil que multiplica el daño de sus golpes.",
    tecnicas: ["Técnica de Proporción", "Hora Extra", "Colapso", "Espada envuelta en trapo"],
    dominio: null,
    stats: { fuerza: 82, velocidad: 84, energia: 85, tecnica: 90, inteligencia: 94 }
  },
  {
    id: "geto",
    nombre: "Suguru Geto",
    kanji: "夏油傑",
    epiteto: "El hechicero que odiaba a los humanos",
    afiliacion: "Antagonista",
    grado: "especial",
    clan: "—",
    color: "#7048e8",
    inicial: "夏",
    arte: "assets/personajes/geto.svg",
    descripcion:
      "Compañero de clase de Gojo en su juventud y uno de los cuatro de Grado Especial. Puede manipular espíritus malditos devorándolos y usarlos como soldados. Su desprecio hacia los humanos comunes lo lleva a fundar un culto y a declarar la guerra a la hechicería.",
    tecnicas: ["Manipulación de Espíritus Malditos", "Máximo: Uzumaki", "Espíritus de Grado Especial", "Refuerzo maldito"],
    dominio: null,
    stats: { fuerza: 80, velocidad: 86, energia: 95, tecnica: 96, inteligencia: 92 }
  },
  {
    id: "sukuna",
    nombre: "Ryomen Sukuna",
    kanji: "両面宿儺",
    epiteto: "El Rey de las Maldiciones",
    afiliacion: "Antagonista",
    grado: "especial",
    clan: "—",
    color: "#c92a2a",
    inicial: "宿",
    arte: "assets/personajes/sukuna.svg",
    descripcion:
      "El hechicero más poderoso de la historia, con cuatro brazos y dos rostros. Fue sellado en veinte dedos que ahora se dispersan por Japón. Su técnica Cortar y Desgarrar divide la materia sin necesidad de tocarla, y su dominio no requiere barrera.",
    tecnicas: ["Desgarrar", "Cortar", "Flecha de Fuego", "Santuario Maligno", "Curación inversa"],
    dominio: "Santuario Maligno",
    stats: { fuerza: 100, velocidad: 99, energia: 100, tecnica: 100, inteligencia: 98 }
  },
  {
    id: "mahito",
    nombre: "Mahito",
    kanji: "真人",
    epiteto: "La maldición del alma",
    afiliacion: "Espíritus Malditos",
    grado: "maldicion",
    clan: "—",
    color: "#0ca678",
    inicial: "真",
    arte: "assets/personajes/mahito.svg",
    descripcion:
      "Espíritu maldito nacido del miedo y el odio entre humanos. Su Transfiguración Ociosa le permite remodelar el alma de cualquier persona que toque, deformando su cuerpo a voluntad. Considera a los humanos como juguetes para experimentar.",
    tecnicas: ["Transfiguración Ociosa", "Transfiguración de sí mismo", "Cuerpos transfigurados", "Toque del alma"],
    dominio: "Autoencarnación de la Perfección",
    stats: { fuerza: 78, velocidad: 84, energia: 90, tecnica: 95, inteligencia: 86 }
  },
  {
    id: "choso",
    nombre: "Choso",
    kanji: "脹相",
    epiteto: "El hermano mayor",
    afiliacion: "Espíritus Malditos",
    grado: "especial",
    clan: "—",
    color: "#e03131",
    inicial: "脹",
    arte: "assets/personajes/choso.svg",
    descripcion:
      "Híbrido entre humano y espíritu maldito creado por Kenjaku. Domina la Manipulación de la Sangre y puede endurecerla, dispararla o convertirla en explosivos. Su vínculo con Yuji lo lleva a protegerlo como a un hermano pequeño.",
    tecnicas: ["Manipulación de la Sangre", "Sangre Perforante", "Supernova", "Escudo de sangre"],
    dominio: null,
    stats: { fuerza: 84, velocidad: 85, energia: 88, tecnica: 91, inteligencia: 87 }
  },
  {
    id: "toji",
    nombre: "Toji Fushiguro",
    kanji: "伏黒甚爾",
    epiteto: "El asesino de hechiceros",
    afiliacion: "Antagonista",
    grado: "especial",
    clan: "Clan Zenin",
    color: "#495057",
    inicial: "甚",
    arte: "assets/personajes/toji.svg",
    descripcion:
      "Padre de Megumi y el único conocido con Restricción Celestial de energía maldita cero. A cambio, sus cinco sentidos y su físico alcanzan límites imposibles. Usa herramientas malditas e inventario de espíritus para anular técnicas ajenas.",
    tecnicas: ["Restricción Celestial", "Lanza Invertida del Cielo", "Cadena de Mil Millas", "Inventario de espíritus"],
    dominio: null,
    stats: { fuerza: 98, velocidad: 96, energia: 0, tecnica: 85, inteligencia: 93 }
  },
  {
    id: "todo",
    nombre: "Aoi Todo",
    kanji: "東堂葵",
    epiteto: "El hermano de Yuji",
    afiliacion: "Escuela de Kioto",
    grado: "grado1",
    clan: "—",
    color: "#d6336c",
    inicial: "東",
    arte: "assets/personajes/todo.svg",
    descripcion:
      "Hechicero de Grado 1 del Instituto de Kioto, obsesionado con el idol Takada-chan. Su Boogie Woogie intercambia la posición de dos objetos con energía maldita, lo que le permite reordenar el campo de batalla a su antojo.",
    tecnicas: ["Boogie Woogie", "Golpe de energía maldita", "Combate cuerpo a cuerpo", "Táctica de equipo"],
    dominio: null,
    stats: { fuerza: 90, velocidad: 82, energia: 86, tecnica: 88, inteligencia: 85 }
  },
  {
    id: "miwa",
    nombre: "Kasumi Miwa",
    kanji: "三輪霞",
    epiteto: "La espadachina de Kioto",
    afiliacion: "Escuela de Kioto",
    grado: "grado3",
    clan: "—",
    color: "#4dabf7",
    inicial: "三",
    arte: "assets/personajes/miwa.svg",
    descripcion:
      "Estudiante de Kioto que practica el Estilo Nueva Sombra con su espada maldita. Aprendió el Dominio Simple para defenderse de ataques de área y sueña con un trabajo estable que le permita mantener a su familia.",
    tecnicas: ["Estilo Nueva Sombra", "Dominio Simple", "Filo de energía maldita", "Batōjutsu"],
    dominio: null,
    stats: { fuerza: 62, velocidad: 78, energia: 64, tecnica: 80, inteligencia: 76 }
  },
  {
    id: "yuki",
    nombre: "Yuki Tsukumo",
    kanji: "九十九由基",
    epiteto: "La hechicera de la estrella",
    afiliacion: "Independiente",
    grado: "especial",
    clan: "—",
    color: "#f783ac",
    inicial: "九",
    arte: "assets/personajes/yuki.svg",
    descripcion:
      "Una de los cuatro hechiceros de Grado Especial y la única que no trabaja para el mundo de la hechicería. Investiga cómo eliminar la energía maldita del mundo. Su técnica le permite manipular masa virtual y golpear con la fuerza de un asteroide.",
    tecnicas: ["Masa Virtual", "Fuerza Estelar", "Manipulación de masa", "Curación inversa"],
    dominio: null,
    stats: { fuerza: 95, velocidad: 88, energia: 96, tecnica: 92, inteligencia: 90 }
  },
  {
    id: "kenjaku",
    nombre: "Kenjaku",
    kanji: "羂索",
    epiteto: "El cerebro de mil años",
    afiliacion: "Antagonista",
    grado: "especial",
    clan: "—",
    color: "#66a80f",
    inicial: "羂",
    arte: "assets/personajes/kenjaku.svg",
    descripcion:
      "Hechicero que sobrevive desde hace más de mil años trasplantando su cerebro a distintos cuerpos, incluido el de Suguru Geto. Es el arquitecto del Incidente de Shibuya y busca fusionar a la humanidad con la energía maldita.",
    tecnicas: ["Trasplante de cerebro", "Manipulación de Espíritus Malditos", "Dominios sellados", "Ritual de fusión"],
    dominio: null,
    stats: { fuerza: 76, velocidad: 80, energia: 94, tecnica: 99, inteligencia: 100 }
  }
];
