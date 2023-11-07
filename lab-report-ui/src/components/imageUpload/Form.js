import axios from "axios";
import { useCallback } from "react";
import { useDropzone } from "react-dropzone";

const access_token = localStorage.getItem("access_token");

const Form = ({
  image,
  setImage,
  isPending,
  setIsPending,
  url,
  setUrl,
  setError,
}) => {
  const uploadImage = async (image) => {
    setError(false);
    setIsPending(true);
    const formData = new FormData();
    formData.append("image", image);
    try {
      const res = await axios({
        url: "http://localhost:6060/api/image/createImage",
        headers: {
          "Content-Type": "multipart/form-data;",
          Authorization: `Bearer ${access_token}`,
        },
        method: "post",
        data: formData,
      });
      if (!res.status === 200) {
        throw Error("Internal Server Error");
      }
      const data = res.config.url;
      setUrl(data);
      setIsPending(false);
    } catch (error) {
      console.log(error);
      setIsPending(false);
      setError(true);
    }
  };

  const onDrop = useCallback(
    async (acceptedFiles) => {
      let file = acceptedFiles[0];
      let reader = new FileReader();

      reader.readAsDataURL(file);
      reader.onload = () => {
        setImage(reader.result);
        uploadImage(file);
      };
    },
    [setImage]
  );

  const { getRootProps, getInputProps, open } = useDropzone({
    onDrop,
    maxFiles: 1,
    accept: { "image/*": [] },
    noClick: true,
    noKeyboard: true,
  });

  return (
    <div className="text-slate-400 drop-shadow-lg p-5 justify-between bg-white rounded-md">
      <p className="text-center font-semibold text-lg md:text-xl mb-2">
        Upload your image
      </p>
      <p className="text-center font-thin text-xs text-slate-400 mb-2">
        File should be Jpeg , Png...
      </p>
      <div
        {...getRootProps({
          className:
            "md:h-52 sm:h-44 h-auto bg-light-grey border-2 border-light-blue border-dashed rounded-md",
        })}
      >
        <input {...getInputProps({ name: "image" })} />
        <p className="text-slate-400 md:text-md text-center mt-4 text-sm">
          Drag & Drop your image here
        </p>
      </div>
      <p className="text-center font-normal text-slate-400 text-md mt-2 mb-2">
        Or
      </p>
      <button
        onClick={open}
        className="bg-blue text-slate-400 font-normal p-1 rounded-lg w-auto mx-auto px-4 py-2 text-md"
      >
        Choose a file
      </button>
    </div>
  );
};

export default Form;
