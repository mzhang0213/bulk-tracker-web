"use client"
import React, {useEffect} from "react";
import { io, Socket } from "socket.io-client";

import {gebi} from "@/app/resources/gebi";
//import Navbar from './resources/Navbar'
import {Background} from "@/app/resources/Background";
import BackgroundDim from "@/app/resources/BackgroundDim";
import Footer from "@/app/resources/Footer";


/*
function SampleCat() {
    return <img
        className={"relative w-[400px]"}
        src={"https://scrumbles.co.uk/cdn/shop/articles/scottish-straight-cat-breed-guide-964256.jpg?v=1720002125"}
    />
}
 */
const mainContainerWidth = 85;
let socket: Socket;

export default function Home() {
    useEffect(() => {
        socket = io({
            path:"/socket.io",
            // If backend is on different origin, add 'url: "http://localhost:80"' or your domain
        });
        socket.on("scan_result", (data:{result:string,files:{name:string,scan_type:string}[]}) => {

            gebi("main-body").innerHTML=data.result;

            gebi("main-links").innerHTML="";

            function createLink(item:{name:string,scan_type:string}){
                const link = document.createElement("a");
                link.href=window.location.origin+"/uploads/"+item.name;
                link.innerHTML=item.scan_type;
                link.target="_blank";
                link.style.marginRight="10px";
                gebi("main-links").appendChild(link);
            }
            for (const file of data.files){
                createLink(file)
            }
        });

        return () => {
            socket.disconnect();
        };
    }, []);
    return (
        <>
            <Background/>
            <BackgroundDim/>

            <div id={"mainContainer"} className={"relative flex rounded-xl py-32 mt-10 mb-36"} style={{width: mainContainerWidth + "vw", backgroundColor:"var(--theme-green)", left: (100 - mainContainerWidth) / 2 + "vw", boxShadow:"8px 8px 0px 0px var(--theme-yellow)", border:"2px solid var(--theme-dark-gray)"}}>
                <div id={"mainContainerLeft"} className={"w-[35%]"}>
                    <img id={"mainImg"} src={"/resources/IMG_1399.jpg"}
                         className={"relative object-cover object-center w-[300px] h-[400px]"} style={{float: "right"}}
                         alt={"portrait photo"}/>
                </div>
                <div id={"mainContainerRight"} className={"w-[65%] ml-5"}>
                    <p id={"main-title"} className={"text-4xl mb-2"}>Scan Result</p>
                    <div id={"mainInfo"} className={"relative h-full flex flex-row"}>
                        <textarea id={"main-body"} className={"w-[50%] h-[100%]"} style={{resize: "none", border:"2px dashed black"}}>
                            body
                        </textarea>
                        <p id={"main-links"} className={"text-sm text-blue-500 underline w-[50%] h-full ml-2 mb-2"}>test_not_a_link</p>
                    </div>
                </div>
            </div>

            <Footer customItems={null}/>
        </>
    );
}