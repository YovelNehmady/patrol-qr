'use client';
import { useRouter, useSearchParams } from "next/navigation";
import { checkCode } from "../services";
import { useEffect, useState } from "react";
import SendStatus from "../cmps/sendStatus";
import LoaderSvg from "../cmps/loading";

const SendStatus = ()=> {
  const [allowedToSendStatus, setAllowedToSendStatus] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const searchParams = useSearchParams();
  const checkValidCode = async () => {
    return await checkCode(searchParams.values().toString());
  };

  const router = useRouter()
  useEffect(() => {
    try {
      (async () => {
        setAllowedToSendStatus(await checkValidCode());
      })();
    } catch (error) {
      console.log('error with checking status', error);
    } finally {
      setIsLoading(false);
      router.replace('/ppp')
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

export default SendStatus;