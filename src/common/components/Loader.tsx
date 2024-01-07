import React from "react";
import useAxiosLoader, {
  axiosInstanceWithOutCredential,
} from "../../services/http";
import "../../styles/loader.css";

// Spinner component to display loading animation
const Spinner = () => <div className="spinner"></div>;

// Loader component that wraps the Spinner and displays it when axios requests without credentials are loading
function Loader() {
  const [axiosWithOutCredentialLoading] = useAxiosLoader(
    axiosInstanceWithOutCredential
  );

  return (
    <>
      {/* Conditionally render the Spinner if axios request without credentials is loading */}
      {axiosWithOutCredentialLoading && (
        <div className="overlay">
          <Spinner />
        </div>
      )}
    </>
  );
}

export default Loader;
