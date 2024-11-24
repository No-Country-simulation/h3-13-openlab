import button_arrow from "../../assets/landing/send-1.svg";
import vector from "../../assets/landing/Vector3.svg";

const BannerSection = () => {
  return (
    <section className="relative h-[750px] flex items-center justify-center">
      <img
        src={vector}
        alt="vector"
        className="absolute top-0 left-0 w-full -z-10"
      />
      <div className="flex flex-col gap-20 text-center items-center text-white max-w-[800px]">
        <p className="text-4xl font-medium">
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
