import React from "react";

interface UserItemProps {
  user: {
    username: string;
    password: string;
    email: string;
  };
}

const UserItem: React.FC<UserItemProps> = ({ user }) => {
  return (
    <div>
      <p>Username: {user.username}</p>
      <p>Password: {user.password}</p>
      <p>Email: {user.email}</p>
    </div>
  );
};

export default UserItem;
