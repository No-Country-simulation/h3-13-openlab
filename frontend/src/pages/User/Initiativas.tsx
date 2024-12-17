import { useAppKitAccount } from "@reown/appkit/react";
import { useEffect, useState } from "react";
import { Provider, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import SimpleBar from "simplebar-react";
import "simplebar/dist/simplebar.min.css";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import { dislikeIcon, likeIcon, shareIcon, sumIcon } from "../../assets";
import ModalBuy from "../../components/buyInit/modalBuy";
import ModalCreate from "../../components/createInit/modalCreate";
import MiniGraph from "../../components/graf/Mini";
import "../../index.css";
import {
  useAddJoinsMutation,
  useAddLikesMutation,
  useAddSharesMutation,
  useGetIniciativasQuery,
  useGetIniciativasUserQuery,
} from "../../store/api/apiSlice";
import { selectCurrentUser } from "../../store/auth/authSlice";
import { store } from "../../store/store";

const Initiativas = () => {
  const { id: userId } = useSelector(selectCurrentUser);
  const { data: allInitiatives } = useGetIniciativasQuery(userId);
  const { data: myInitiatives } = useGetIniciativasUserQuery(userId);
  const [addLikes, { isSuccess, isError, error }] = useAddLikesMutation();
  const [addShares] = useAddSharesMutation();
  const [addJoins] = useAddJoinsMutation();
  //-----------
  const [active, setActive] = useState("allInitiatives");
  const [activeInitiatives, setActiveInitiatives] = useState<any>();
  const { isConnected } = useAppKitAccount();
  const MySwal = withReactContent(Swal);

  function handleCreate() {
    MySwal.fire({
      html: (
        <Provider store={store}>
          <ModalCreate />
        </Provider>
      ),
      showConfirmButton: false,
      width: "fit-content",
      scrollbarPadding: false,
    });
  }

  function handleBuy(iniciativa: any) {
    MySwal.fire({
      html: (
        <Provider store={store}>
          <ModalBuy initiative={iniciativa} />
        </Provider>
      ),
      showConfirmButton: false,
      width: "fit-content",
      scrollbarPadding: false,
    });
  }

  const handleLikes = (isLiked: boolean, iniId: number) => {
    const dataToSend = {
      like: !isLiked,
      idCliente: userId,
      idIniciativa: iniId,
    };

    addLikes(dataToSend);
  };

  const handleJoins = (isJoined: boolean, iniId: number) => {
    const dataToSend = {
      join: !isJoined,
      idCliente: userId,
      idIniciativa: iniId,
    };

    addJoins(dataToSend);
  };

  const handleShares = (isShared: boolean, iniId: number) => {
    const URL_DEL_FRONT = import.meta.env.VITE_ORIGIN_URL;
    const initiativeUrl = `${URL_DEL_FRONT}initiative/${iniId}`;
    const dataToSend = {
      share: !isShared,
      idCliente: userId,
      idIniciativa: iniId,
    };

    if (navigator.share) {
      navigator.share({
        title: "Check this initiative!",
        url: initiativeUrl,
      });
      addShares(dataToSend);
    } else {
      toast.warning("Share API is not supported on this device.");
    }
  };

  useEffect(() => {
    if (!allInitiatives) {
      <div className="flex flex-col items-center justify-center bg-gray-100 min-h-dvh">
        <div className="w-16 h-16 border-t-4 border-blue-500 rounded-full animate-spin"></div>
        <p className="p-2">Cargando...</p>
      </div>;
    }
  }, [allInitiatives]);

  useEffect(() => {
    if (active === "allInitiatives") {
      setActiveInitiatives(allInitiatives);
    } else {
      setActiveInitiatives(myInitiatives?.dataIterable);
    }
  }, [active, myInitiatives, allInitiatives]);

  useEffect(() => {
    if (isSuccess) {
      toast.success("Liked successfully!", {
        style: { backgroundColor: "#1e8736", color: "#fff" },
      });
    } else if (isError) {
      toast.error("There was an error on like. Please try again.", {
        style: { backgroundColor: "#991e2a", color: "#fff" },
      });
      console.error("Error:", error);
    }
  }, [isSuccess, isError]);

  if (!allInitiatives || !myInitiatives) {
    return (
      <div className="flex flex-col items-center justify-center bg-gray-100 h-[40em]">
        <div className="w-16 h-16 border-t-4 border-blue-500 rounded-full animate-spin"></div>
        <p className="p-2">Cargando...</p>
      </div>
    );
  }

  return (
    <div className="bg-[#afafaf1a]/10 flex flex-col justify">
      <div className="flex">
        <h1 className="p-4 text-3xl sm:w-full">Initiatives</h1>
      </div>
      <div className="p-5">
        <div className="flex flex-row items-center p-4 place-content-between">
          <div className="flex flex-row gap-4">
            <button
              className={`text-sm font-semibold p-3 w-[116px]  ${
                active === "allInitiatives"
                  ? "text-color-1 shadow border border-color-1 rounded-lg"
                  : "text-black"
              }`}
              onClick={() => setActive("allInitiatives")}
            >
              Initiatives
            </button>
            <button
              className={`text-sm font-semibold p-3 ${
                active === "myInitiatives"
                  ? "text-color-1 shadow border border-color-1 rounded-lg"
                  : "text-black"
              }`}
              onClick={() => setActive("myInitiatives")}
            >
              My Initiatives
            </button>
          </div>

          <div className="flex flex-row justify">
            <input
              type="text"
              placeholder="Search initiatives ..."
              className="border p-1 rounded-lg  w-[30em] mr-4 shadow"
              onClick={() => {}}
            />
          </div>

          <div>
            {isConnected ? (
              <button
                className="flex items-center justify-center bg-color-5 text-white shadow-lg mr-5 text-sm font-semibold p-3 w-[163px] gap-6 rounded-lg"
                onClick={handleCreate}
              >
                <img src={sumIcon} />
                Create
              </button>
            ) : (
              <button
                className="flex items-center justify-center bg-[#E0E0E0] text-black shadow-lg mr-5 text-sm font-semibold p-3 w-[163px] gap-6 rounded-lg"
                onClick={() => {
                  toast.info("Please connect the wallet first");
                }}
              >
                <img src={sumIcon} />
                Create
              </button>
            )}
          </div>
        </div>
        <div className="m-1">
  <SimpleBar style={{ maxHeight: 500 }}>
    <div className="grid grid-cols-10 grid-rows-1 gap-0 bg-[#6193FF]/10 h-[68px] p-1 mr-8 shadow">
      <div className="flex items-center m-auto text-sm font-semibold cursor-pointer">
        Logo
      </div>
      <div className="flex items-center m-auto text-sm font-semibold cursor-pointer">
        Name
      </div>
      <div className="flex items-center m-auto text-sm font-semibold">
        Price Fluctuaction
      </div>
      <div className="flex items-center m-auto text-sm font-semibold cursor-pointer">
        Colaborators
      </div>
      <div className="flex items-center gap-1 m-auto text-sm font-semibold">
        <div className="flex flex-row cursor-pointer">Buy</div>/
        <div className="flex flex-row cursor-pointer">Sell</div>
      </div>
      <div className="flex items-center m-auto text-sm font-semibold">
        Tokens
      </div>
      <div className="flex items-center m-auto text-sm font-semibold">
        Missions
      </div>
      <div className="flex items-center m-auto text-sm font-semibold cursor-pointer">
        Likes
      </div>
      <div className="flex items-center m-auto text-sm font-semibold cursor-pointer">
        Shares
      </div>
      <div className="flex items-center m-auto text-sm font-semibold"> </div>
    </div>

    {activeInitiatives?.map((item: any, index: number) => (
      <div
        key={index}
        className="grid grid-cols-10 grid-rows-1 gap-0 h-[68px] p-2 border-b mr-8"
      >
        {/* Logo */}
        <div className="flex items-center m-auto">
          <img
            src={item?.imagen}
            alt="imagen"
            className="h-[40px] w-[40px] object-cover rounded-full"
          />
        </div>

        {/* Name */}
        <div className="flex items-center m-auto text-sm text-center">
          <Link to={`/initiative/${item?.id}`}>{item?.nombre}</Link>
        </div>

        {/* Price Fluctuation */}
        <div className="flex items-center m-auto text-sm">
          <MiniGraph color="#3D7BFF" />
        </div>

        {/* Collaborators */}
        <div className="flex items-center justify-center m-auto text-sm bg-[#00B2FF]/20 rounded-lg p-1 w-[73px]">
          {item?.colaboradores}
        </div>

        {/* Buy/Sell Prices */}
        <div className="flex items-center text-[#00A065] font-semibold m-auto text-sm">
          {item?.buy_price + "/" + item?.sell_price}
        </div>

        {/* Tokens */}
        <div className="flex items-center m-auto text-sm">
          {item?.monto_requerido}
        </div>

        {/* Missions */}
        <div className="flex items-center m-auto text-sm">
          {item?.misiones_actuales}
        </div>

        {/* Likes */}
        <div className="flex items-center m-auto text-sm">{item?.likes}</div>

        {/* Shares */}
        <div className="flex items-center m-auto text-sm">{item?.shares}</div>

        {/* Actions */}
        <div className="flex flex-row items-center gap-2 m-auto text-sm">
          {isConnected ? (
            <button
              className="bg-[#00B2FF] text-white p-2 rounded-full w-[54px] h-[34px] flex items-center shadow"
              onClick={() => handleBuy(item)}
            >
              Buy
            </button>
          ) : (
            <button
              className="bg-[#E0E0E0] text-black p-2 rounded-full w-[54px] h-[34px] flex items-center shadow"
              onClick={() => {
                toast.info("Please connect the wallet first");
              }}
            >
              Buy
            </button>
          )}

          {!item.isJoined ? (
            <button
              className="bg-[#E0E0E0] text-white p-2 rounded-full w-[54px] h-[34px] flex items-center shadow"
              onClick={() => handleJoins(item.isJoined, item.id)}
            >
              Join
            </button>
          ) : (
            <button
              className="bg-color-1 text-white p-2 rounded-full w-[54px] h-[34px] flex items-center shadow"
              onClick={() => handleJoins(item.isJoined, item.id)}
            >
              Join
            </button>
          )}
          <button
            className="m-1"
            onClick={() => handleLikes(item.isLiked, item.id)}
          >
            <img
              src={item.isLiked ? likeIcon : dislikeIcon}
              className="h-[20px]"
            />
          </button>
          <button
            className="m-1"
            onClick={() => handleShares(item.isShared, item.id)}
          >
            <img src={shareIcon} className="h-[20px]" />
          </button>
        </div>
      </div>
    ))}
  </SimpleBar>
</div>
      </div>
    </div>
  );
};

export default Initiativas;
