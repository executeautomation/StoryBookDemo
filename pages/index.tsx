import React, { useState } from "react";
import HeadComponent from "../components/HeadComponent";
import Greeting from "../components/Greetings";
import LoginForm, { LoginFormValues } from "../components/LoginForm";
import styles from "../styles/login.module.css";

interface User {
  name: string;
}

const Page: React.FC = () => {
  const [user, setUser] = useState<User | null>(null);

  const handleLogin: (data: LoginFormValues) => void = ({ username }) => {
    setUser({ name: username });
  };

  return (
    <div className={styles.container}>
      <HeadComponent />
      {user ? (
        <Greeting username={user.name} />
      ) : (
        <LoginForm onSubmit={handleLogin} />
      )}
    </div>
  );
};

export default Page;