import hero_phone from "../../assets/landing/hero_img.png";
import button_arrow from "../../assets/landing/send-2.svg";

const Hero = () => {
  return (
    <div
      className="relative flex w-full h-[816] place-content-center bg-primary"
      id="hero_bg"
    >
      <div className="flex items-center justify-between w-[1400px] h-fit">
        <div className="text-white max-w-[600px] flex flex-col gap-10 items-center z-10">
          <p className="text-6xl font-medium">
            Bienvenido al futuro de la innovación
          </p>
          <p className="text-xl">
            Ayuda a crear startups de manera colaborativa y conviértete en
            co-propietario de los proyectos a través de tokens enlazados a la
            propiedad intelectual.
          </p>
          <button className="flex items-center self-start gap-3 p-3 rounded-lg bg-color-1">
            <img src={button_arrow} alt="" />
            <p className="text-lg font-semibold">Empezar</p>
          </button>
        </div>
        <img src={hero_phone} alt="hero_phone" className="w-[650px]" />
      </div>
    </div>
  );
};

export default Hero;
