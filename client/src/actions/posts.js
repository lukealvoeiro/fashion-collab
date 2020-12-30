import axios from "axios";
import {
  FETCH_POSTS,
  NEW_POST,
  LIKE_POST,
  FAIL_FETCH_POSTS,
} from "../actions/types";
import { generateUUID } from "../utils/files";

export const newPost = (values, history) => async (dispatch) => {
  const { file, description } = values;
  const filename = generateUUID().toString() + "." + file.name.split(".").pop();
  var signedUrlResult = await axios.get("/api/file/signed_url/", {
    params: {
      filename: filename,
      filetype: file.type,
    },
  });
  console.log(signedUrlResult);
  try {
    let signedUrl = signedUrlResult.data;
    let result = await axios.put(signedUrl, file, {
      headers: {
        "Content-Type": file.type,
      },
    });
    let newPost = await axios.post("/api/posts", {
      description: description,
      filename: filename,
    });
    history.goBack();
    dispatch({ type: NEW_POST, payload: newPost.data });
  } catch (err) {
    console.log(err);
  }
};

export const fetchUserPosts = (userId) => async (dispatch) => {
  const res = await axios.get("/api/user/posts", {
    params: {
      userId: userId,
    },
  });
  console.log(res);
  if (res.data.posts) {
    dispatch({ type: FETCH_POSTS, payload: res.data });
  } else dispatch({ type: FAIL_FETCH_POSTS, payload: res.data });
};

export const fetchAllPosts = () => async (dispatch) => {
  const res = await axios.get("/api/posts/all");
  if (res.data.results)
    dispatch({ type: FETCH_POSTS, payload: res.data.results });
  else dispatch({ type: FAIL_FETCH_POSTS, payload: res.data });
};

export const likePost = (reqObj) => async (dispatch) => {
  console.log(reqObj);
  const res = await axios.post("api/posts/like", reqObj);
  dispatch({ type: LIKE_POST, payload: res.data });
};
