import button_arrow from "../../assets/landing/send-1.svg";
import vector from "../../assets/landing/Vector3.svg";

const BannerSection = () => {
  return (
    <section className="relative min-h-[750px] flex items-center justify-center overflow-hidden">
      <img
        src={vector}
        alt="vector"
        className="absolute top-0 -z-10 max-w-fit"
      />
      <div className="flex flex-col gap-20 text-center items-center px-5 text-white md:max-w-[800px]">
        <p className="text-3xl font-medium md:text-4xl">
          No es tiempo de aprender a jugar el juego, sino de cambiar sus reglas
        </p>
        <p className="text-lg font-light">
          Creemos que la única manera de cambiar realmente a la sociedad, es a
          través de la democratización del acceso a una educación práctica en la
          que se le permita a cualquier persona de cualquier parte del mundo,
          contribuir a crear los proyectos y tecnologías que determinarán el
          curso de la civilización.
        </p>
        <button className="flex items-center gap-3 px-5 py-3 bg-white rounded-lg text-color-1">
          <img src={button_arrow} alt="arrow" />
          <p className="text-lg font-semibold">Más información</p>
        </button>
      </div>
    </section>
  );
};

export default BannerSection;
