import { useAppKitAccount } from "@reown/appkit/react";
import { useEffect } from "react";
import { Provider, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import { close, dislikeIcon, likeIcon, shareIcon } from "../../assets";
import ModalBuy from "../../components/buyInit/modalBuy";
import DetailedGraph from "../../components/graf/Graph";
import {
  useAddJoinsMutation,
  useAddLikesMutation,
  useAddSharesMutation,
  useGetIniciativaByIdQuery,
} from "../../store/api/apiSlice";
import { selectCurrentUser } from "../../store/auth/authSlice";
import { store } from "../../store/store";

const Detail = () => {
  const { id } = useParams();
  const { id: userId } = useSelector(selectCurrentUser);
  const { data } = useGetIniciativaByIdQuery(id);
  const [addLikes, { isSuccess, isError, error }] = useAddLikesMutation();
  const [addShares] = useAddSharesMutation();
  const [addJoins] = useAddJoinsMutation();
  const { isConnected } = useAppKitAccount();
  const MySwal = withReactContent(Swal);
  const navigate = useNavigate();

  console.log(data);

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

  const priceFluctuation = [
    { date: "2024-11-22", value: 15 },
    { date: "2024-11-23", value: 2 },
    { date: "2024-11-24", value: 89 },
    { date: "2024-11-25", value: 45 },
    { date: "2024-11-26", value: 60 },
    { date: "2024-11-27", value: 35 },
    { date: "2024-11-28", value: 40 },
    { date: "2024-11-29", value: 85 },
    { date: "2024-11-30", value: 30 },
    { date: "2024-12-01", value: 55 },
  ];

  useEffect(() => {
    if (!data) {
      <div className="flex flex-col items-center justify-center bg-gray-100 min-h-dvh">
        <div className="w-16 h-16 border-t-4 border-blue-500 rounded-full animate-spin"></div>
        <p className="p-2">Cargando...</p>
      </div>;
    }
  }, [data]);

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

  return (
    <div className="flex flex-col bg-[#afafaf1a]">
      <div className="flex flex-row justify-between gap-2 m-auto">
        <div className="flex flex-col">
          <h1 className="p-3 text-3xl">
            Initiative:{" "}
            <strong>
              {data?.data.nombre} - {data?.data.tokenDao}
            </strong>
          </h1>
          <div className="flex flex-row  m-3 bg-white h-[17em] w-[60em] justify-flex-start gap-5 rounded-lg shadow">
            <div className="flex m-[2em]">
              <img
                src={data?.data.imagen}
                alt={data?.data.nombre}
                className="w-[10em] h-[10em] rounded-lg shadow m-auto "
              />
            </div>
            <div className="flex flex-col gap-2 ">
              <div>
                <h2 className="text-lg italic font-semibold">Problema:</h2>
                <p className="m-1">{data?.data.problema}</p>
              </div>
              <div>
                <h2 className="text-lg italic font-semibold">Oportunidad:</h2>{" "}
                <p className="m-1">{data?.data.oportunidad}</p>
              </div>
              <div>
                <h2 className="text-lg italic font-semibold">Solución:</h2>{" "}
                <p className="m-1">{data?.data.solucion}</p>
              </div>
              <div>
                <h2 className="text-lg italic font-semibold">Idea:</h2>{" "}
                <p className="m-1">{data?.data.idea}</p>
              </div>
            </div>
          </div>
        </div>

        <div className="flex flex-col m-auto">
          <button
            className="items-center mb-1 text-xl font-semibold justify-items-end"
            onClick={() => navigate(-1)}
          >
            <img src={close} className="w-[1.7em]" />
          </button>
          <div className="flex flex-col gap-3 p-2 m-3 mr-12 bg-white rounded-lg shadow">
            <div>
              <h2 className="text-lg italic font-semibold text-center">
                Colaboradores:
              </h2>
              <p className="bg-[#00B2FF]/20 rounded-lg p-1 w-[4.5625em] text-center m-auto text-sm">
                {" "}
                {data?.data.colaboradores}
              </p>
            </div>
            <div>
              <h2 className="text-lg italic font-semibold text-center">
                Misiones:
              </h2>
              <p className="p-1 m-auto text-sm text-center">
                {" "}
                {data?.data.misiones_actuales}
              </p>
            </div>
            <div>
              <h2 className="text-lg italic font-semibold text-center">
                Likes:
              </h2>
              <p className="p-1 m-auto text-sm text-center">
                {" "}
                {data?.data.likes}
              </p>
            </div>
            <div>
              <h2 className="text-lg italic font-semibold text-center">
                Shares:
              </h2>
              <p className="p-1 m-auto text-sm text-center">
                {" "}
                {data?.data.shares}
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="flex flex-row justify-center gap-6">
        <div className="flex flex-row gap-10 p-1 bg-white rounded-lg shadow justify-evenly">
          <div className="">
            <h2 className="font-semibold text-center text-lgg">
              Token {data?.data.tokenDao}
            </h2>
            <DetailedGraph priceFluctuation={priceFluctuation} />
          </div>
          <div className="flex flex-col items-center justify-center gap-4 p-2">
            <div className="flex flex-col items-center">
              <h2 className="text-lg italic font-semibold text-center">
                Precio de venta:
              </h2>
              <p className="m-3">${data?.data.sell_price}</p>
            </div>

            <div className="flex flex-col items-center p-2">
              <h2 className="text-lg italic font-semibold text-center">
                Precio de Compra:
              </h2>
              <p className="m-3">${data?.data.buy_price}</p>
            </div>

            <button className="text-sm italic bg-[#A9A9A9]/80 text-white p-1 rounded-lg shadow">
              Update
            </button>
          </div>
        </div>
        <div className="flex flex-col justify-center gap-4 m-1 bg-white rounded-lg shadow ">
          <div className="flex flex-col w-[25em] p-1">
            <h1 className="text-lg font-semibold text-center">
              ¿Quieres apoyar esta iniciativa?
            </h1>
            <h1 className="italic text-center">
              Puedes participar en ella y formar parte de ella!
            </h1>
            <div className="flex flex-row p-2 justify-evenly">
              {isConnected ? (
                <button
                  className="bg-[#00B2FF] text-white justify-center p-2 rounded-full w-[3.375em] h-[2.125em] flex items-center shadow-lg"
                  onClick={() => handleBuy(data.data)}
                >
                  Buy
                </button>
              ) : (
                <button
                  className="bg-[#E0E0E0] text-black p-2 justify-center rounded-full w-[3.375em] h-[2.125em] flex items-center shadow-lg"
                  onClick={() => {
                    toast.info("Please connect the wallet first");
                  }}
                >
                  Buy
                </button>
              )}

              {!data?.data.isJoined ? (
                <button
                  className="bg-[#E0E0E0] text-white p-2 justify-center rounded-full w-[3.375em] h-[2.125em] flex items-center shadow-lg"
                  onClick={() =>
                    handleJoins(data?.data.isJoined, data?.data.id)
                  }
                >
                  Join
                </button>
              ) : (
                <button
                  className="bg-color-1 text-white p-2 justify-center rounded-full w-[3.375em] h-[2.125em] flex items-center shadow-lg"
                  onClick={() =>
                    handleJoins(data?.data.isJoined, data?.data.id)
                  }
                >
                  Join
                </button>
              )}
            </div>
          </div>

          <div className="flex flex-col w-[25em] p-2">
            <h1 className="text-lg font-semibold text-center">
              ¿Te gustó esta iniciativa?
            </h1>
            <h1 className="italic text-center">
              Ayudarías mucho compartiéndola y dándole like
            </h1>
            <div className="flex flex-row p-2 justify-evenly">
              <button
                className="m-2"
                onClick={() => handleLikes(data?.data.isLiked, data?.data.id)}
              >
                <img
                  src={!data?.data.isLiked ? likeIcon : dislikeIcon}
                  className="h-[1.25em]"
                />
              </button>
              <button
                className="m-2"
                onClick={() => handleShares(data?.data.isShared, data?.data.id)}
              >
                <img src={shareIcon} className="h-[1.25em]" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Detail;
