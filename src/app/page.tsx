'use client';
import { useSearchParams } from "next/navigation";
import { checkCode } from "./services";
import { useEffect, useState } from "react";
import SendStatus from "./cmps/sendStatus";
import LoaderSvg from "./cmps/loading";

export default function Home() {
  const [allowedToSendStatus, setAllowedToSendStatus] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const searchParams = useSearchParams();
  const checkValidCode = async () => {
    return await checkCode(searchParams.values().toString());
  };
  useEffect(() => {
    try {
      (async () => {
        setAllowedToSendStatus(await checkValidCode());
      })();
    } catch (error) {
      console.log('error with checking status', error);
    } finally {
      setIsLoading(false);
    }
  }, []);

  return (<>
    <div>
      <h1 >
        סטטוס פטרול כוח אריאל
      </h1>
      {allowedToSendStatus ?
        <div>
          <SendStatus />
        </div>
        :
        <div>
          לא ניתן לשלוח סטטוס פטרול, סרוק שנית        </div>}
    </div>
    {isLoading &&
      <LoaderSvg />
    }
  </>
  );
}