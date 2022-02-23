import { useState } from "react";
import "antd/dist/antd.css";
import type { AppProps } from "next/app";
import { UserContext } from "../utils/context/userContext";

function MyApp({ Component, pageProps }: AppProps) {
  const [currentUser, setUser] = useState<string | null>(null);

  return (
    <UserContext.Provider value={{ currentUser, setUser }}>
      <Component {...pageProps} />
    </UserContext.Provider>
  );
}

export default MyApp;
