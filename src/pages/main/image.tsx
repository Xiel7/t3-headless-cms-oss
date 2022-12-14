import { GetServerSideProps, NextPage } from 'next';
import { useSession } from 'next-auth/react';
import Head from 'next/head';
import Router from 'next/router';
import { useEffect, useState } from 'react';
import { trpc } from '../../utils/trpc';
import Image from 'next/image';


const Main: NextPage = () => {
    // const put = trpc.useMutation(["oss.putFile"]);
    const { data: img, refetch: refetchImages } = trpc.useQuery(["oss.getFile", {key: 'files/avg_8_37.png'}], {
        refetchOnWindowFocus: false, 
        refetchOnMount: false,
        refetchOnReconnect: false,
        retry: false,
    });
    // const [imageUrl, setImageUrl] = useState('/');


    // const submitPic = async () => {
    //     const url = await put.mutateAsync();
    //     setImageUrl(url);
    // }

    const refresh = () => {
        refetchImages();
    }

    return (
        <>
            <Head>
                <title>Create T3 App</title>
                <meta name="description" content="Generated by create-t3-app" />
                <link rel="icon" href="/favicon.ico" />
            </Head>

            <main className="gap-4 h-screen container mx-auto flex flex-col items-center justify-center min-h-screen p-4">
                <h1 className="text-5xl md:text-[5rem] leading-normal font-extrabold text-gray-700">
                    Create <span className="text-purple-300">T3</span> App
                </h1>
                {/* <button className='p-8 rounded-lg bg-purple-300 text-2xl font-extrabold' onClick={submitPic}>Test</button> */}
                <button className='p-4  rounded-lg bg-purple-300 text-2xl font-extrabold' onClick={refresh}>Test</button>
                {/* <div className='relative w-full h-full'>
                    {img ? <Image key={img?.signedUrl} src={img?.signedUrl!} alt='imageUrl' layout="fill" objectFit="contain" /> : <div>...Loading</div>}
                </div> */}
                {img ? <div className='w-full h-full relative'><Image key={img?.signedUrl} src={img?.signedUrl!} alt='imageUrl' layout="fill" objectFit="contain" /></div> : <div>...Loading</div>}


            </main>
        </>
    );
}

export default Main;