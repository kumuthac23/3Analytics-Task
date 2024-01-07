import { Route, Routes } from "react-router-dom";
import "./App.css";
import Posts from "./pages/posts/Posts";
import { paths } from "./paths/paths";
import Loader from "./common/components/Loader";
import PostComments from "./pages/posts/PostComments";
import Layout from "./Layout";
import PrivateRoute from "./common/components/PrivateRoute";
import Login from "./pages/auth/Login";
import { Toaster } from "react-hot-toast";

function App() {
  return (
    <>
      <Toaster position="top-center" />
      <Routes>
        <Route path={paths.ROOT} element={<Layout />}>
          <Route
            index
            element={
              <PrivateRoute>
                <Posts />
              </PrivateRoute>
            }
          ></Route>
          <Route
            path={paths.ROOT}
            element={
              <PrivateRoute>
                <Posts />
              </PrivateRoute>
            }
          ></Route>
          <Route
            path={paths.COMMENTS}
            element={
              <PrivateRoute>
                <PostComments />
              </PrivateRoute>
            }
          ></Route>
          <Route path={paths.LOGIN} element={<Login />}></Route>
        </Route>
      </Routes>
      <Loader />
    </>
  );
}

export default App;
