import { startData } from "../../utils/startSectionData";

const StartSection = () => {
  return (
    <section className="text-color-0 h-[600px] flex flex-col items-center gap-20 my-20">
      <div className="flex gap-5 w-[1400px] items-center flex-col">
        <p className="text-5xl font-medium">¡Comienza ahora!</p>
        <p className="text-lg font-light max-w-[520px] text-center">
          Ayuda a diseñar, construir y promover a las startups del futuro:
          abiertas, descentralizadas y transparentes.
        </p>
      </div>
      <div className="flex gap-5 w-[1400px] items-start justify-evenly">
        {startData.map((user, index) => (
          <div
            className="flex flex-col items-center max-w-[280px] gap-4 p-5"
            key={index}
          >
            <img src={user.icon} alt="icon" className="w-24 h-24" />
            <p className="text-lg font-semibold">{user.title}</p>
            <p className="text-base text-center">{user.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default StartSection;
