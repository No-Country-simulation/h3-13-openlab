import { useAppKitAccount } from "@reown/appkit/react";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { toast, ToastContainer } from "react-toastify";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import { addCircle, close, tickCircle } from "../../assets";
import { useAddIniciativaMutation } from "../../store/api/apiSlice";
import { selectCurrentUser } from "../../store/auth/authSlice";
import useWindowSize from "../hooks/Responsive";
import React, { ChangeEvent } from "react";

const ModalCreate = () => {
  const preset_name = "openlab";
  const cloud_name = "dyuq16otf";
  const [image, setImage] = useState("");

  const { address } = useAppKitAccount();
  const [addIniciativa, { isSuccess, isError, error }] =
    useAddIniciativaMutation();
  const MySwal = withReactContent(Swal);
  const { id } = useSelector(selectCurrentUser);

  const { width } = useWindowSize();
  const isMobile = width <= 768;

  const [data, setData] = useState({
    image: null as File | null,
    imageUrl: "",
    name: "",
    idea: "",
    problem: "",
    oportunity: "",
    solution: "",
  });

  const [errors, setErrors] = useState({
    name: "",
    idea: "",
    problem: "",
    oportunity: "",
    solution: "",
    image: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  // const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  //   const file = e.target.files ? e.target.files[0] : null;
  //   if (file) {
  //     const reader = new FileReader();
  //     reader.onloadend = () => {
  //       setData((prevData) => ({
  //         ...prevData,
  //         image: file,
  //         imageUrl: reader.result as string,
  //       }));
  //     };
  //     reader.readAsDataURL(file);
  //   }
  // };

  const uploadImage = async (e: ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;
  
    const data = new FormData();
    data.append("file", files[0]);
    data.append("upload_preset", preset_name); // reemplaza con tu nombre de preset
  
    try {
      const response = await fetch(
        `https://api.cloudinary.com/v1_1/${cloud_name}/image/upload`,
        {
          method: "POST",
          body: data,
        }
      );
  
      const file = await response.json();
      setImage(file.secure_url);
      console.log(file.secure_url);
    } catch (error) {
      console.error("Error uploading image:", error);
    }
  };

  const validateFields = () => {
    const newErrors = {
      name: "",
      idea: "",
      problem: "",
      oportunity: "",
      solution: "",
      image: "",
    };
    let isValid = true;

    if (!data.name) {
      newErrors.name = "Name is required";
      isValid = false;
    }
    if (!data.idea) {
      newErrors.idea = "Idea is required";
      isValid = false;
    }
    if (!data.problem) {
      newErrors.problem = "Problem is required";
      isValid = false;
    }
    if (!data.oportunity) {
      newErrors.oportunity = "Oportunity is required";
      isValid = false;
    }
    if (!data.solution) {
      newErrors.solution = "Solution is required";
      isValid = false;
    }
    // if (!data.image) {
    //   newErrors.image = 'Image is required';
    //   isValid = false;
    // }

    setErrors(newErrors);
    return isValid;
  };

  const handleCreate = () => {
    const { name, idea, problem, oportunity, solution} = data;

    if (!validateFields()) {
      toast.error("Please complete all the data in the form", {
        style: { backgroundColor: "#991e2a", color: "#fff" },
      });
    }

    const requestData = {
      nombre: name,
      idea: idea,
      problema: problem,
      oportunidad: oportunity,
      solucion: solution,
      monto_requerido: 100,
      imagen: image,
      billetera: address,
      clienteId: id,
    };

    addIniciativa(requestData);
  };

  useEffect(() => {
    if (isSuccess) {
      toast.success("Initiative successfully created!", {
        style: { backgroundColor: "#1e8736", color: "#fff" },
      });

      setData({
        image: null,
        imageUrl: "",
        name: "",
        idea: "",
        problem: "",
        oportunity: "",
        solution: "",
      });

      MySwal.close();
    } else if (isError) {
      toast.error(
        "There was an error creating the initiative. Please try again.",
        {
          style: { backgroundColor: "#991e2a", color: "#fff" },
        }
      );
      console.error("Error:", error);
    }
  }, [isSuccess, isError]);

  return (
    <div className="fixed inset-0 bg-black bg-opacity-70 flex justify-center items-center z-50">
      {isMobile ? (
        <>
          {/* Mobile */}
          <div className="bg-white rounded shadow-lg w-[320px] max-h-[90vh] mt-[100px] flex flex-col gap-4 overflow-hidden">
            <div className="flex flex-row justify-between items-center p-6">
              <h1 className="text-3xl font-semibold mt-4 ml-5">
                New Initiative
              </h1>
              <button onClick={() => MySwal.close()} className="p-2 mt-4">
                <img src={close} alt="close" />
              </button>
            </div>

            <div className="flex flex-col gap-4 items-center justify-around overflow-auto max-h-[70vh] w-full">
              <div className="flex flex-col gap-3 w-full px-5">
                <h1 className="text-sm font-bold m-2">Image</h1>
                <div className="relative inline-block">
                  <input
                    type="file"
                    accept="image/*"
                    className="absolute inset-0 opacity-0 cursor-pointer"
                    style={{ width: "260px", height: "94px" }}
                    onChange={(e) => uploadImage(e)}
                  />
                  {data.imageUrl ? (
                    <img
                      src={data.imageUrl}
                      alt="Preview"
                      className="object-cover rounded-lg shadow-sm border w-[113px] h-[113px] m-auto"
                    />
                  ) : (
                    <img
                      src={addCircle}
                      alt="Upload"
                      className="object-cover p-8 rounded-lg shadow-sm border pr-[113px] pl-[113px]"
                    />
                  )}
                  {errors.image && (
                    <p className="text-red-500 text-sm">{errors.image}</p>
                  )}
                </div>
              </div>

              <div className="flex flex-col gap-3 w-full px-5">
                <h1 className="text-sm font-bold m-2">Name</h1>
                <input
                  type="text"
                  className="border w-[260px] h-[39px] p-2 rounded shadow-sm text-sm"
                  placeholder="Name"
                  name="name"
                  value={data.name}
                  onChange={handleChange}
                />
                {errors.name && (
                  <p className="text-red-500 text-sm">{errors.name}</p>
                )}
              </div>

              <div className="flex flex-col gap-3 w-full px-5">
                <h1 className="text-sm font-bold m-2">Idea</h1>
                <textarea
                  className="border w-[260px] h-[143px] p-2 rounded shadow-sm text-sm"
                  placeholder="Idea"
                  name="idea"
                  value={data.idea}
                  onChange={handleChange}
                />
                {errors.idea && (
                  <p className="text-red-500 text-sm">{errors.idea}</p>
                )}
              </div>

              <div className="flex flex-col gap-3 w-full px-5">
                <h1 className="text-sm font-bold m-2">Problem</h1>
                <textarea
                  className="border w-[260px] h-[94px] p-2 rounded shadow-sm text-sm"
                  placeholder="Problem"
                  name="problem"
                  value={data.problem}
                  onChange={handleChange}
                />
                {errors.problem && (
                  <p className="text-red-500 text-sm">{errors.problem}</p>
                )}
              </div>

              <div className="flex flex-col gap-3 w-full px-5">
                <h1 className="text-sm font-bold m-2">Oportunity</h1>
                <textarea
                  className="border w-[260px] h-[94px] p-2 rounded shadow-sm text-sm"
                  placeholder="Oportunity"
                  name="oportunity"
                  value={data.oportunity}
                  onChange={handleChange}
                />
                {errors.oportunity && (
                  <p className="text-red-500 text-sm">{errors.oportunity}</p>
                )}
              </div>

              <div className="flex flex-col gap-3 w-full px-5">
                <h1 className="text-sm font-bold m-2">Solution</h1>
                <textarea
                  className="border w-[260px] h-[94px] p-2 rounded shadow-sm text-sm"
                  placeholder="Solution"
                  name="solution"
                  value={data.solution}
                  onChange={handleChange}
                />
                {errors.solution && (
                  <p className="text-red-500 text-sm">{errors.solution}</p>
                )}
              </div>

              <div className="flex items-center justify-center text-white text-base font-semibold mt-5 w-full px-5">
                <button
                  className="flex flex-row bg-[#3D7BFF] w-[260px] h-[45px] justify-center items-center rounded-lg"
                  onClick={handleCreate}
                >
                  <img src={tickCircle} className="mr-2" />
                  Create DAO
                </button>
              </div>
            </div>
          </div>
        </>
      ) : (
        <>
          {/* WebApp */}
          <div className="bg-white rounded shadow-lg w-[964px] h-[678px] flex flex-col gap-2">
            <div className="flex flex-row justify-between items-center p-6">
              <h1 className="text-3xl font-semibold mt-4 ml-5">
                New Inititive
              </h1>
              <button className="p-2" onClick={() => MySwal.close()}>
                <img src={close} />
              </button>
            </div>

            <div className="flex flex-row gap-4 items-center justify-around">
              <div className="flex flex-col gap-3 ml-5">
                <h1 className="text-sm font-bold m-2">Image</h1>
                <div className="relative inline-block">
                  <input
                    type="file"
                    accept="image/*"
                    className="absolute inset-0 opacity-0 cursor-pointer"
                    style={{ width: "109px", height: "92px" }}
                    onChange={(e) => uploadImage(e)}
                  />
                  {data.imageUrl ? (
                    <img
                      src={data.imageUrl}
                      alt="Preview"
                      className="object-cover rounded-lg shadow-sm border w-[150px] h-[130px]"
                    />
                  ) : (
                    <img
                      src={addCircle}
                      alt="Upload"
                      className="object-cover p-8 rounded-lg shadow-sm border"
                    />
                  )}
                  {errors.image && (
                    <p className="text-red-500 text-sm">{errors.image}</p>
                  )}
                </div>
                <div>
                  <h1 className="text-sm font-bold m-2">Name</h1>
                  <input
                    type="text"
                    className="border w-[406px] h-[40px] p-2 rounded shadow-sm text-sm"
                    placeholder="Name"
                    name="name"
                    value={data.name}
                    onChange={handleChange}
                  />
                  {errors.name && (
                    <p className="text-red-500 text-sm">{errors.name}</p>
                  )}
                </div>
                <div>
                  <h1 className="text-sm font-bold m-2">Idea</h1>
                  <textarea
                    className="border w-[406px] h-[143px] p-2 rounded shadow-sm text-sm"
                    placeholder="Idea"
                    name="idea"
                    value={data.idea}
                    onChange={handleChange}
                  />
                  {errors.idea && (
                    <p className="text-red-500 text-sm mn-10">{errors.idea}</p>
                  )}
                </div>
              </div>
              <div className="flex flex-col gap-3 mr-5">
                <div>
                  <h1 className="text-sm font-bold m-2">Problem</h1>
                  <textarea
                    className="border w-[406px] h-[94px] rounded p-2 shadow-sm text-sm"
                    placeholder="Problem"
                    name="problem"
                    value={data.problem}
                    onChange={handleChange}
                  />
                  {errors.problem && (
                    <p className="text-red-500 text-sm mn-10">
                      {errors.problem}
                    </p>
                  )}
                </div>
                <div>
                  <h1 className="text-sm font-bold m-2">Oportunity</h1>
                  <textarea
                    className="border w-[406px] h-[94px] rounded p-2 shadow-sm text-sm"
                    placeholder="Oportunity"
                    name="oportunity"
                    value={data.oportunity}
                    onChange={handleChange}
                  />
                  {errors.oportunity && (
                    <p className="text-red-500 text-sm mn-10">
                      {errors.oportunity}
                    </p>
                  )}
                </div>
                <div>
                  <h1 className="text-sm font-bold m-2">Solution</h1>
                  <textarea
                    className="border w-[406px] h-[94px] rounded p-2 shadow-sm text-sm"
                    placeholder="Solution"
                    name="solution"
                    value={data.solution}
                    onChange={handleChange}
                  />
                  {errors.solution && (
                    <p className="text-red-500 text-sm mn-10">
                      {errors.solution}
                    </p>
                  )}
                </div>
              </div>
            </div>

            <div className="flex items-center justify-center text-white text-base font-semibold mt-5">
              <button
                className=" flex flex-row bg-[#3D7BFF] w-[894px] h-[45px] justify-center items-center rounded-lg"
                onClick={handleCreate}
              >
                <img src={tickCircle} className="mr-2" />
                Create DAO
              </button>
            </div>
          </div>
        </>
      )}
      <ToastContainer />
    </div>
  );
};

export default ModalCreate;
