import React from "react";
import styles from "../styles/login.module.css";

interface GreetingProps {
  username: string;
}

const Greeting: React.FC<GreetingProps> = ({ username }) => (
  <div className={styles.greeting}>
    <h2>Welcome back, {username}!</h2>
  </div>
);

export default Greeting;