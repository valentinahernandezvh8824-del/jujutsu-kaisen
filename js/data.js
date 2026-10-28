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
    descripcion:
      "Hechicero que sobrevive desde hace más de mil años trasplantando su cerebro a distintos cuerpos, incluido el de Suguru Geto. Es el arquitecto del Incidente de Shibuya y busca fusionar a la humanidad con la energía maldita.",
    tecnicas: ["Trasplante de cerebro", "Manipulación de Espíritus Malditos", "Dominios sellados", "Ritual de fusión"],
    dominio: null,
    stats: { fuerza: 76, velocidad: 80, energia: 94, tecnica: 99, inteligencia: 100 }
  },
  {
    id: "jogo",
    nombre: "Jogo",
    kanji: "漏瑚",
    epiteto: "La maldición del volcán",
    afiliacion: "Espíritus Malditos",
    grado: "maldicion",
    clan: "—",
    color: "#e8590c",
    inicial: "漏",
    descripcion:
      "Espíritu maldito de Grado Especial nacido del miedo a la tierra y los volcanes. Tiene un solo ojo y una cabeza con forma de cráter. Desprecia a los humanos y se une al plan de Geto para acabar con la hechicería, aunque su orgullo lo lleva a subestimar a sus enemigos.",
    tecnicas: ["Llamas malditas", "Insectos de brasa", "Meteoro", "Erupción"],
    dominio: "Ataúd de la Montaña de Hierro",
    stats: { fuerza: 82, velocidad: 84, energia: 91, tecnica: 87, inteligencia: 78 }
  },
  {
    id: "hanami",
    nombre: "Hanami",
    kanji: "花御",
    epiteto: "La maldición del bosque",
    afiliacion: "Espíritus Malditos",
    grado: "maldicion",
    clan: "—",
    color: "#2b8a3e",
    inicial: "花",
    descripcion:
      "Espíritu maldito nacido del miedo a la naturaleza. Su cuerpo es de madera y raíces, y puede absorber energía vital a distancia. Aprecia la vida vegetal y considera que los humanos son una plaga que debe desaparecer para que el planeta sane.",
    tecnicas: ["Raíces malditas", "Semillas de flor", "Drenaje de vida", "Escudo de madera"],
    dominio: null,
    stats: { fuerza: 85, velocidad: 76, energia: 88, tecnica: 84, inteligencia: 80 }
  },
  {
    id: "dagon",
    nombre: "Dagon",
    kanji: "陀艮",
    epiteto: "La maldición del mar",
    afiliacion: "Espíritus Malditos",
    grado: "maldicion",
    clan: "—",
    color: "#1c7ed6",
    inicial: "陀",
    descripcion:
      "Espíritu maldito de Grado Especial con forma de criatura marina. Invoca shikigami acuáticos y ahoga a sus rivales dentro de su dominio, donde el agua lo cubre todo. Es uno de los tres espíritus que atacan Shibuya junto a Jogo y Hanami.",
    tecnicas: ["Olas malditas", "Shikigami acuáticos", "Tentáculos", "Marea"],
    dominio: "Horizonte del Skandha Cautivador",
    stats: { fuerza: 80, velocidad: 78, energia: 90, tecnica: 85, inteligencia: 76 }
  },
  {
    id: "uraume",
    nombre: "Uraume",
    kanji: "裏梅",
    epiteto: "La mano derecha de Sukuna",
    afiliacion: "Antagonista",
    grado: "especial",
    clan: "—",
    color: "#74c0fc",
    inicial: "裏",
    descripcion:
      "Hechicero que sirvió a Ryomen Sukuna hace mil años y que reaparece para ayudarlo a recuperar su cuerpo completo. Domina una técnica de hielo capaz de congelar el campo de batalla entero y de conservar alimento durante siglos.",
    tecnicas: ["Técnica de hielo", "Congelación", "Esculturas de hielo", "Curación inversa"],
    dominio: null,
    stats: { fuerza: 78, velocidad: 82, energia: 88, tecnica: 90, inteligencia: 86 }
  },
  {
    id: "naoya",
    nombre: "Naoya Zenin",
    kanji: "禪院直哉",
    epiteto: "El heredero arrogante",
    afiliacion: "Antagonista",
    grado: "grado1",
    clan: "Clan Zenin",
    color: "#f59f00",
    inicial: "禪",
    descripcion:
      "Primo de Maki y heredero favorito del clan Zenin. Su Técnica de Proyección divide un segundo en 24 fotogramas y le permite moverse a velocidades imposibles trazando trayectorias rectas. Su desprecio hacia las mujeres y hacia Maki lo convierte en uno de los villanos más detestables de la obra.",
    tecnicas: ["Técnica de Proyección", "Velocidad extrema", "Refuerzo maldito", "Combate cuerpo a cuerpo"],
    dominio: null,
    stats: { fuerza: 84, velocidad: 96, energia: 74, tecnica: 82, inteligencia: 80 }
  },
  {
    id: "hakari",
    nombre: "Kinji Hakari",
    kanji: "秤金次",
    epiteto: "El jugador de pachinko",
    afiliacion: "Escuela de Tokio",
    grado: "grado1",
    clan: "—",
    color: "#e64980",
    inicial: "秤",
    descripcion:
      "Hechicero de Grado 1 suspendido por pelear en torneos clandestinos. Su técnica expande un dominio con forma de máquina de pachinko: si gana la partida, obtiene energía maldita infinita y curación automática durante cuatro minutos y once segundos.",
    tecnicas: ["Apuesta Mortal Ociosa", "Curación inversa automática", "Energía ilimitada", "Refuerzo maldito"],
    dominio: "Apuesta Mortal Ociosa",
    stats: { fuerza: 88, velocidad: 86, energia: 95, tecnica: 94, inteligencia: 84 }
  },
  {
    id: "higuruma",
    nombre: "Hiromi Higuruma",
    kanji: "日車寛見",
    epiteto: "El abogado hechicero",
    afiliacion: "Escuela de Tokio",
    grado: "grado1",
    clan: "—",
    color: "#868e96",
    inicial: "日",
    descripcion:
      "Abogado penalista que despierta la hechicería durante el Juego del Abismo. Su técnica convierte un juicio en combate: si el veredicto es culpable, la pena se ejecuta de inmediato con su martillo y su espada del juicio.",
    tecnicas: ["Sentencia Mortal", "Martillo del juez", "Espada del veredicto", "Dominio judicial"],
    dominio: "Sentencia Mortal",
    stats: { fuerza: 86, velocidad: 82, energia: 88, tecnica: 95, inteligencia: 97 }
  },
  {
    id: "kusakabe",
    nombre: "Atsuya Kusakabe",
    kanji: "日下部篤也",
    epiteto: "El espadachín veterano",
    afiliacion: "Escuela de Tokio",
    grado: "grado1",
    clan: "—",
    color: "#4c6ef5",
    inicial: "日",
    descripcion:
      "Profesor de segundo año y veterano de Grado 1. No tiene una técnica hereditaria, pero domina el Estilo Nueva Sombra y el Dominio Simple con una precisión que le permite sobrevivir a enemigos superiores. Prefiere evitar peleas innecesarias.",
    tecnicas: ["Estilo Nueva Sombra", "Dominio Simple", "Barrera de sombra", "Espada maldita"],
    dominio: null,
    stats: { fuerza: 80, velocidad: 84, energia: 78, tecnica: 88, inteligencia: 92 }
  },
  {
    id: "meimei",
    nombre: "Mei Mei",
    kanji: "冥冥",
    epiteto: "La mercenaria de los cuervos",
    afiliacion: "Independiente",
    grado: "grado1",
    clan: "—",
    color: "#7048e8",
    inicial: "冥",
    descripcion:
      "Hechicera de Grado 1 que trabaja solo por dinero. Controla cuervos con energía maldita y los usa como exploradores o como proyectiles explosivos. Su hermano Ui Ui la acompaña y se encarga de transportarla y protegerla.",
    tecnicas: ["Control de cuervos", "Cuervos explosivos", "Exploración aérea", "Hacha maldita"],
    dominio: null,
    stats: { fuerza: 80, velocidad: 84, energia: 86, tecnica: 90, inteligencia: 91 }
  },
  {
    id: "utahime",
    nombre: "Utahime Iori",
    kanji: "庵歌姫",
    epiteto: "La maestra de Kioto",
    afiliacion: "Escuela de Kioto",
    grado: "grado1",
    clan: "—",
    color: "#c2255c",
    inicial: "庵",
    descripcion:
      "Profesora del Instituto de Kioto y organizadora del evento de intercambio. Su técnica de canto potencia la energía maldita de sus aliados dentro de un área, lo que la convierte en una apoyo invaluable en batallas de equipo.",
    tecnicas: ["Canto maldito", "Refuerzo de aliados", "Barrera", "Análisis de técnicas"],
    dominio: null,
    stats: { fuerza: 66, velocidad: 72, energia: 80, tecnica: 86, inteligencia: 89 }
  }
];
