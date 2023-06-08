import React from "react";
import Head from "next/head";
import Image from "next/image";
import Link from "next/link";

function Next() {
  return (
    <React.Fragment>
      <Head>
        <title>Next - Nextron (with-typescript-tailwindcss)</title>
      </Head>
      <div className="grid grid-col-1 text-2xl w-full text-center">
        <div className="mr-auto ml-auto w-[200px]">
          <Image
            className="ml-auto mr-auto block"
            src="/images/logo.png"
            alt="123123"
            width={100}
            height={100}
          />
        </div>
        <span>⚡ Nextro1111n222 ⚡</span>
      </div>
      <div className="mt-1 w-full flex-wrap flex justify-center">
        <Link href="/home">
          <a className="btn-blue">Go to home page</a>
        </Link>
      </div>
    </React.Fragment>
  );
}

export default Next;
