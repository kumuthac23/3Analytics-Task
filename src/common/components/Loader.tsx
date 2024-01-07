import React from "react";
import useAxiosLoader, {
  axiosInstanceWithOutCredential,
} from "../../services/http";
import "../../styles/loader.css";

const Spinner = () => <div className="spinner"></div>;

function Loader() {
  const [axiosWithOutCredentialLoading] = useAxiosLoader(
    axiosInstanceWithOutCredential
  );

  return (
    <>
      {axiosWithOutCredentialLoading && (
        <div className="overlay">
          <Spinner />
        </div>
      )}
    </>
  );
}

export default Loader;
