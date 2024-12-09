'use client';
import SendStatus from "../cmps/sendStatus";
import { useRouter } from 'next/navigation';
import { useEffect } from "react";

const StatusForm = () => {
  const router = useRouter();

  useEffect(() => {
    const validateAndDeleteCookie = async () => {
      try {
        // Validate the cookie
        const validationResponse = await fetch('/api/validate-cookie');
        if (!validationResponse.ok) {
          // Redirect to error page if validation fails
          router.replace('/scan-again');
          return;
        }

        // If validation is successful, delete the cookie
        const deleteResponse = await fetch('/api/clear-cookie');
        if (!deleteResponse.ok) {
          console.error('Failed to clear the cookie');
        }
      } catch (error) {
        console.error('Error during cookie validation or deletion:', error);
        router.replace('/error'); // Redirect on error
      }
    };

    validateAndDeleteCookie();
  }, [router]);



  return (<>
    <div>
      <h1 >
        סטטוס פטרול כוח אריאל
      </h1>
      <div>
        <SendStatus />
      </div>
    </div>
  </>
  );
};

export default StatusForm;