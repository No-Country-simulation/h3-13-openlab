import { useSelector } from "react-redux";
import { RootState } from "../../store/store";


export const StatisticsProfile =()=>{

const {statistics} = useSelector((state:RootState) => state.userStadistics);

return(

    <div className="flex flex-col bg-white rounded-lg shadow-lg w-[35em]">
        <ul className="p-4 w-[27em] m-auto">
            <li className=" p-6 flex flex-row justify-between font-semibold border-b border-gray-300 text-xl ">
                Founded projects 
                <p className="bg-[#00B2FF]/20 w-[87px] h-[23px] flex justify-center rounded-lg">{statistics.createdInitiatives}</p>
            </li>
            <li className=" p-6 flex flex-row justify-between font-semibold border-b border-gray-300 text-xl ">
                Participated projects 
                <p className="bg-[#00B2FF]/20 w-[87px] h-[23px] flex justify-center rounded-lg">{statistics.createdInitiatives}</p>
            </li>
            <li className="p-6 flex flex-row  justify-between font-semibold border-b border-gray-300 text-xl ">
                Solved missions 
                <p className="bg-[#00B2FF]/20 w-[87px] h-[23px] flex justify-center rounded-lg">{statistics.createdInitiatives}</p>
            </li>
            <li className="p-6 flex flex-row justify-between font-semibold border-b border-gray-300 text-xl ">
                Validated missions 
                <p className="bg-[#00B2FF]/20 w-[87px] h-[23px] flex justify-center rounded-lg">{statistics.createdInitiatives}</p>
            </li>
            <li className="p-6 flex flex-row justify-between font-semibold border-b border-gray-300 text-xl ">
                Likes per missions
                <p className="bg-[#00B2FF]/20 w-[87px] h-[23px] flex justify-center rounded-lg">{statistics.createdInitiatives}</p>
            </li>
            <li className="p-6 flex flex-row justify-between font-semibold border-b border-gray-300 text-xl ">
                Generated tokens
                <p className="bg-[#00B2FF]/20 w-[87px] h-[23px] flex justify-center rounded-lg">{statistics.createdInitiatives}</p>
            </li>
        </ul>
  </div>
)

}