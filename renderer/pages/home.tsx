import React from "react";
import Head from "next/head";
import Image from "next/image";
import Link from "next/link";

function Home() {
  return (
    <>
      <Head>
        <title>Home - Nextron (with-typescript-tailwindcss)</title>
      </Head>
      <div className="grid grid-col-1 text-2xl w-full text-center">
        <Image
          className="ml-auto mr-auto"
          src="/images/logo.png"
          alt="123123222111"
          width={50}
          height={50}
        />
        <span>⚡ Electron ⚡</span>
        <span>+</span>
        <span>Next.js</span>
        <span>+</span>
        <span>tailwindcss</span>
        <span>=</span>
        <span>💕 </span>
      </div>
      <div className="mt-1 w-full flex-wrap flex justify-center">
        <Link href="/next">
          <a className="btn-blue">Go to next page</a>
        </Link>
      </div>
    </>
  );
}

export default Home;
