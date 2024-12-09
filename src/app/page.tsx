'use client';
import { Suspense, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { checkCode } from "./services";
import LoaderSvg from "./cmps/loading";

function HomeContent() {
  const searchParams = useSearchParams();
  const router = useRouter();

  const checkValidCode = async () => {
    return await checkCode(searchParams.get('code') || '');
  };

  useEffect(() => {
    const checkStatus = async () => {
      try {
        const isAllowedToSendStatus = await checkValidCode();
        if (isAllowedToSendStatus) {
          await fetch('/api/set-cookie');
          router.replace('/status-form');
        } else {
          router.replace('/scan-again');
        }
        console.log(isAllowedToSendStatus);
      } catch (error) {
        console.log('error with checking status', error);
      }
    };

    checkStatus();
  }, [searchParams, router]);

  return <LoaderSvg />;
}

export default function Home() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <HomeContent />
    </Suspense>
  );
}
