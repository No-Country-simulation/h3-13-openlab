import { useAuth0 } from "@auth0/auth0-react";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useLoginUserMutation } from "../../store/api/apiSlice";
import {
  selectTokenUser,
  setUserData,
  setUserToken,
} from "../../store/auth/authSlice";

const Login = () => {
  const { getAccessTokenSilently, handleRedirectCallback } = useAuth0();
  const token = useSelector(selectTokenUser);
  const [loginUser, { isError, isSuccess, error, data }] =
    useLoginUserMutation();
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    if (token) {
      setLoading(false);
      navigate("/home");
    }
  }, []);

  useEffect(() => {
    const processRedirect = async () => {
      try {
        await handleRedirectCallback();

        const accessToken = await getAccessTokenSilently(); // Obtener el token de acceso

        dispatch(setUserToken(accessToken));
        loginUser(accessToken);
      } catch (error) {
        console.error("Error al enviar los datos del usuario:", error);
      }
    };
    processRedirect();
  }, [handleRedirectCallback]);

  useEffect(() => {
    if (isSuccess) {
      toast.success("Welcome to OpenLab!", {
        style: { backgroundColor: "#1e8736", color: "#fff" },
      });

      dispatch(setUserData(data.data));
      setLoading(false);
      navigate("/home");
    } else if (isError) {
      toast.error("There was an error on Login", {
        style: { backgroundColor: "#991e2a", color: "#fff" },
      });
      console.error("Error:", error);
      setLoading(false);
      navigate("/");
    }
  }, [isSuccess, isError]);

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center bg-gray-100 min-h-dvh">
        <div className="w-16 h-16 border-t-4 border-blue-500 rounded-full animate-spin"></div>
        <p className="p-2">Cargando...</p>
      </div>
    );
  }
};

export default Login;
