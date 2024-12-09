'use client';
import React, { useState } from 'react';
import LoginCmp from '../cmps/loginCmp';
import Loading from '../cmps/loading';


const Login = () => {
    const [isLoading, setIsLoading] = useState<boolean>(false);


    return (<>
      { !isLoading ? <div className='login-page1'>
            <h2>
                כוח אריאל- התחברות    </h2>
            <LoginCmp setIsLoading={setIsLoading} />
        </div> : 
        <div style={{display:'block',marginInline:'auto',marginBlock:'auto'}}>
         <Loading />
        </div>
         }
    </>
    );
};

export default Login;
