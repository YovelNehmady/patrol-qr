'use client';
import { useRouter, useSearchParams } from "next/navigation";
import { checkCode } from "./services";
import { useEffect, useState } from "react";
import LoaderSvg from "./cmps/loading";

export default function Home() {
  const searchParams = useSearchParams();
  const router = useRouter();

  const checkValidCode = async () => {

    return await checkCode(searchParams.get('code') || '');
  };

  useEffect(() => {
    try {
      (async () => {
        const isAllowedToSendStatus = (await checkValidCode());
        if (isAllowedToSendStatus) {
          await fetch('/api/set-cookie');
          router.replace('/status-form');
        }
        else {
          router.replace('/scan-again');
        }
        console.log(isAllowedToSendStatus);

      })();
    } catch (error) {
      console.log('error with checking status', error);
    }
  }, []);

  return (
    <LoaderSvg />
  );
}