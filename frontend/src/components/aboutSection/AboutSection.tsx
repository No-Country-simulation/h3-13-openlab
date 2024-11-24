import aboutImg1 from "../../assets/landing/about1.png";

const AboutSection = () => {
  return (
    <section className="h-[900px] flex items-center justify-center">
      <div className="flex items-start justify-around w-[1400px]">
        <div>
          <img src={aboutImg1} alt="aboutImg1" />
        </div>
        <div className="max-w-[470px] flex flex-col gap-10">
          <p className="text-4xl font-semibold">Nosotros</p>
          <p className="text-lg font-normal">
            Nosotros somos los visionarios locos, los rebeldes, los innovadores,
            los que no se conforman con el mundo como es. Pensadores
            revolucionarios que creen en un solo movimiento para todos, en un
            mundo sin fronteras. Sabemos que la libertad no es algo con lo que
            se nace, sino algo por lo que tienes que luchar. Abogamos por un
            movimiento que represente los intereses y el bienestar de la
            sociedad. No creemos que sea tiempo de aprender a jugar el juego,
            sino de cambiar sus reglas.
          </p>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
