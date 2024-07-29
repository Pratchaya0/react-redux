// @ts-nocheck

import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createUser, editUser, fetchUser } from "../slices/user-slice";
import { useParams } from "react-router-dom";

const UserEdit = () => {
  const [userData, setUserData] = useState({
    name: "",
    email: "",
    phoneNumber: "",
  });
  const [message, setMessage] = useState("");
  const [isError, setIsError] = useState(false);
  const dispatch = useDispatch();
  const { id } = useParams();
  const currentUser = useSelector((state) => state.user.currentUser);

  useEffect(() => {
    if (id) {
      dispatch(fetchUser(id));
    }
  }, [id, dispatch]);

  useEffect(() => {
    if (currentUser) {
      setUserData(currentUser);
    }
  }, [currentUser]);

  const handleSave = async () => {
    const result = userData.id
      ? await dispatch(editUser(userData))
      : await dispatch(createUser(userData));

    if (result.success) {
      setMessage("User saved successfully.");
      setIsError(false);
      history.push("/"); // Redirect after successful save
    } else {
      setMessage(result.message || "An error occurred.");
      setIsError(true);
    }
  };

  const handleChange = (e) => {
    setUserData({ ...userData, [e.target.name]: e.target.value });
  };

  return (
    <div className="container mx-auto p-4">
      <input
        type="text"
        name="name"
        value={userData.name}
        onChange={handleChange}
        placeholder="Name"
        className="mb-2 w-full rounded border p-2"
      />
      <input
        type="email"
        name="email"
        value={userData.email}
        onChange={handleChange}
        placeholder="Email"
        className="mb-2 w-full rounded border p-2"
      />
      <input
        type="text"
        name="phoneNumber"
        value={userData.phone}
        onChange={handleChange}
        placeholder="Phone Number"
        className="mb-4 w-full rounded border p-2"
      />
      {message && <div className={isError ? "text-red-500" : "text-green-500"}>{message}</div>}

      <button onClick={handleSave} className="rounded bg-green-500 px-4 py-2 text-white">
        Save
      </button>
    </div>
  );
};

export default UserEdit;