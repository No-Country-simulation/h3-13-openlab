import { startData } from "../../utils/startSectionData";

const StartSection = () => {
  return (
    <section className="text-color-0 min-h-[600px] flex flex-col items-center gap-20 my-20">
      <div className="container flex flex-col items-center gap-5">
        <p className="text-3xl font-medium md:text-5xl">¡Comienza ahora!</p>
        <p className="md:text-lg text-base font-light md:max-w-[520px] max-w-[300px] text-center">
          Ayuda a diseñar, construir y promover a las startups del futuro:
          abiertas, descentralizadas y transparentes.
        </p>
      </div>
      <div className="container flex flex-col items-center gap-5 md:items-start md:flex-row justify-evenly">
        {startData.map((user, index) => (
          <div
            className="flex md:flex-col items-center md:max-w-[280px] gap-4 p-5"
            key={index}
          >
            <img src={user.icon} alt="icon" className="w-24 h-24" />
            <div className="flex flex-col gap-3 md:items-center">
              <p className="text-lg font-semibold md:text-center">
                {user.title}
              </p>
              <p className="text-base md:text-center">{user.description}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default StartSection;
