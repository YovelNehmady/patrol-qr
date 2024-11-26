'use client';
import { useSearchParams } from "next/navigation";
import { checkCode } from "./services";
import { useEffect, useState } from "react";
import SendStatus from "./cmps/sendStatus";

export default function Home() {
  const [allowedToSendStatus, setAllowedToSendStatus] = useState(false);
  const searchParams = useSearchParams();
  const checkValidCode = async () => {
    return await checkCode(searchParams.values().toString());
  };
  useEffect(() => {
    (async () => {
      setAllowedToSendStatus(await checkValidCode());
    })();
  }, []);

  return (
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
          לא ניתן לסרוק
        </div>}

    </div>
  );
}
