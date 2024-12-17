import { useSelector } from "react-redux";
import { selectCurrentUser } from "../../store/auth/authSlice";

const UserProfile = () => {
  const userInfo = useSelector(selectCurrentUser);

  return (
    <div className="flex items-center justify-center">
      <div className="container flex items-center justify-between p-14">
        <div className="flex items-center gap-5">
          <img
            src={userInfo?.picture}
            alt="avatar"
            className="w-20 h-20 rounded-full"
          />
          <div>
            <p className="text-lg font-semibold">{userInfo?.nombreCompleto}</p>
            <p>{userInfo?.usuario?.email}</p>
          </div>
        </div>
        <div className="h-[90px] border-l"></div>
        <p className="max-w-[625px]">
          Lorem ipsum dolor sit amet consectetur. Sit aenean enim blandit
          commodo lorem vivamus tellus nec. At id molestie turpis posuere sed
          odio dui gravida. Interdum turpis nunc id in eros pulvinar id pharetra
          cum. Quis adipiscing.
        </p>
      </div>
    </div>
  );
};

export default UserProfile;
