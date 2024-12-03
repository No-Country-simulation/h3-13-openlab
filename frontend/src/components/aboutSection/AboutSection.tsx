import { useEffect, useState } from "react";
import aboutImg1 from "../../assets/landing/about1.png";
import aboutImg2 from "../../assets/landing/about2.jpg";
import arrow from "../../assets/landing/arrow-right.svg";
import useWindowSize from "../hooks/Responsive";

const AboutSection = () => {
  const [vision, setVision] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const { width } = useWindowSize();

  useEffect(() => {
    if (width <= 768) {
      setIsMobile(true);
    } else {
      setIsMobile(false);
    }
  }, [width]);

  return (
    <section className="min-h-[900px] flex items-center justify-center overflow-hidden">
      <div className="container flex flex-col-reverse items-center justify-around gap-10 px-5 md:items-start md:flex-row">
        <div className="relative">
          <img src={vision ? aboutImg2 : aboutImg1} alt="aboutImg1" />
          {isMobile ? (
            <>
              <button
                onClick={() => setVision(false)}
                className="bg-color-0 opacity-50 w-[80px] h-[55px] absolute bottom-0 right-0 rounded-t-xl flex justify-center"
              >
                <img src={arrow} alt="arrow" className="mt-2 rotate-90" />
              </button>
              <button
                onClick={() => setVision(true)}
                className="bg-color-3 text-white text-sm w-[80px] h-[55px] absolute top-full right-0 rounded-b-xl flex items-end justify-center"
              >
                <p className="mb-3">Visión</p>
              </button>
            </>
          ) : (
            <>
              <button
                onClick={() => setVision(false)}
                className="bg-color-0 opacity-50 w-[109px] h-[132px] absolute bottom-0 right-0 rounded-l-xl flex items-start"
              >
                <img src={arrow} alt="arrow" className="m-3" />
              </button>
              <button
                onClick={() => setVision(true)}
                className="bg-color-3 text-white text-sm w-[109px] h-[132px] absolute bottom-0 left-full rounded-r-xl flex items-end justify-center"
              >
                <p className="mb-5">Visión</p>
              </button>
            </>
          )}
        </div>
        <div className="md:max-w-[470px] max-w-[300px] flex flex-col gap-10">
          {!vision ? (
            <>
              <p className="text-3xl font-semibold md:text-4xl">Nosotros</p>
              <p className="text-base font-normal md:text-lg">
                Nosotros somos los visionarios locos, los rebeldes, los
                innovadores, los que no se conforman con el mundo como
                es. Pensadores revolucionarios que creen en un solo movimiento
                para todos, en un mundo sin fronteras. Sabemos que la libertad
                no es algo con lo que se nace, sino algo por lo que tienes que
                luchar. Abogamos por un movimiento que represente los intereses
                y el bienestar de la sociedad. No creemos que sea tiempo de
                aprender a jugar el juego, sino de cambiar sus reglas.
              </p>
            </>
          ) : (
            <>
              <p className="text-3xl font-semibold md:text-4xl">
                Nuestra Misión
              </p>
              <p className="text-base font-normal md:text-lg">
                Acelerar la innovación al tiempo que democratizamos el acceso a
                la educación y el trabajo, permitiendo a la humanidad operar
                como una sola organización sin límites imaginados.
              </p>
            </>
          )}
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
