import React, { useEffect } from "react";
import type { AppProps } from "next/app";

import "../styles/globals.css";
import "windi.css";

function MyApp({ Component, pageProps }: AppProps) {
  const keyDown = (evt) => {
    if (evt.ctrlKey && evt.shiftKey && 73 === evt.keyCode) {
      // 禁用devtool
      evt.preventDefault();
      return false;
    }

    if (evt.ctrlKey && 82 === evt.keyCode) {
      // 禁用刷新
      evt.preventDefault();
      return false;
    }
  };

  useEffect(() => {
    if (process.env.NODE_ENV !== "development") {
      document.addEventListener("keydown", keyDown);
    }
    return () => document.removeEventListener("keydown", keyDown);
  }, []);

  return (
    <>
      <Component {...pageProps} />
    </>
  );
}

export default MyApp;
