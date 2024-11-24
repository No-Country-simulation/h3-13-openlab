import benefit_bg from "../../assets/landing/benefits_bg.svg";
import phone from "../../assets/landing/iPhone X.png";
import { benefitData } from "../../utils/benefitSectionData";

const BenefitSection = () => {
  return (
    <section className="h-[990px] relative flex items-center justify-center">
      <img
        src={benefit_bg}
        alt="benefit_bg"
        className="w-full blur-[1px] absolute left-0 top-0 -z-10"
      />
      <div className="flex items-center justify-around w-[1400px]">
        <div className="w-[500px] h-[700px] flex flex-col items-start justify-between">
          <p className="text-4xl font-medium">Beneficios</p>
          {benefitData.map((data, index) => (
            <div key={index} className="flex items-start gap-10">
              <img src={data.icon} alt="icons" />
              <div className="flex flex-col max-w-[270px]">
                <p className="text-xl font-semibold">{data.title}</p>
                <p className="text-base font-normal">{data.description}</p>
              </div>
            </div>
          ))}
        </div>
        <img src={phone} alt="phone" />
      </div>
    </section>
  );
};

export default BenefitSection;
