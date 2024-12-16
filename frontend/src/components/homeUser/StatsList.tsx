import { useSelector } from "react-redux";
import { useGetStadisticsUserQuery } from "../../store/api/apiSlice";
import { selectCurrentUser } from "../../store/auth/authSlice";

const StatsList = () => {
  const { id } = useSelector(selectCurrentUser);
  const { data } = useGetStadisticsUserQuery(id);

  return (
    <div className="flex flex-col w-[420px] min-h-[500px] rounded-2xl shadow-lg items-center justify-evenly p-10">
      <div className="flex items-center justify-between w-full gap-8 p-5 border-b">
        <p className="text-lg font-medium">Founded projects</p>
        <div className="flex items-center justify-center w-20 h-6 rounded-xl bg-primary-semi-light">
          <p className="text-lg font-medium">{data?.data.createdInitiatives}</p>
        </div>
      </div>
      <div className="flex items-center justify-between w-full gap-8 p-5 border-b">
        <p className="text-lg font-medium">Participated projects</p>
        <div className="flex items-center justify-center w-20 h-6 rounded-xl bg-primary-semi-light">
          <p className="text-lg font-medium">{data?.data.joinedInitiatives}</p>
        </div>
      </div>
      <div className="flex items-center justify-between w-full gap-8 p-5 border-b">
        <p className="text-lg font-medium">Solved missions</p>
        <div className="flex items-center justify-center w-20 h-6 rounded-xl bg-primary-semi-light">
          <p className="text-lg font-medium">{data?.data.solvedMissions}</p>
        </div>
      </div>
      <div className="flex items-center justify-between w-full gap-8 p-5 border-b">
        <p className="text-lg font-medium">Validated missions</p>
        <div className="flex items-center justify-center w-20 h-6 rounded-xl bg-primary-semi-light">
          <p className="text-lg font-medium">{data?.data.validatedMissions}</p>
        </div>
      </div>
      <div className="flex items-center justify-between w-full gap-8 p-5 border-b">
        <p className="text-lg font-medium">Likes</p>
        <div className="flex items-center justify-center w-20 h-6 rounded-xl bg-primary-semi-light">
          <p className="text-lg font-medium">{data?.data.initiativeLikes}</p>
        </div>
      </div>
      <div className="flex items-center justify-between w-full gap-8 p-5 border-b">
        <p className="text-lg font-medium">Shares</p>
        <div className="flex items-center justify-center w-20 h-6 rounded-xl bg-primary-semi-light">
          <p className="text-lg font-medium">{data?.data.sharedInitiatives}</p>
        </div>
      </div>
      <div className="flex items-center justify-between w-full gap-8 p-5 border-b">
        <p className="text-lg font-medium">Generated tokens</p>
        <div className="flex items-center justify-center w-20 h-6 rounded-xl bg-primary-semi-light">
          <p className="text-lg font-medium">{data?.data.generatedTokens}</p>
        </div>
      </div>
    </div>
  );
};

export default StatsList;
