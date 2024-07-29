// @ts-nocheck

import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchUsers, deleteUser } from "../slices/user-slice";
import { Link } from "react-router-dom";

const UserList = () => {
  const dispatch = useDispatch();
  const users = useSelector((state) => state.user.users);

  useEffect(() => {
    dispatch(fetchUsers());
  }, [dispatch]);

  return (
    <div className="container mx-auto p-4">
      <h3 className="mb-4 text-lg font-semibold">User List</h3>
      {users.map((user) => (
        <div key={user.id} className="flex items-center justify-between border-b py-2">
          <div>
            <p>Name: {user.name}</p>
            <p>Email: {user.email}</p>
            <p>Phone: {user.phone}</p>
          </div>
          <div>
            <button
              className="mr-2 rounded bg-red-500 px-3 py-1 text-white"
              onClick={() => dispatch(deleteUser(user.id))}
            >
              Delete
            </button>
            <Link to={`/edit/${user.id}`}>
              <button className="rounded bg-blue-500 px-3 py-1 text-white">Edit</button>
            </Link>
          </div>
        </div>
      ))}
    </div>
  );
};

export default UserList;