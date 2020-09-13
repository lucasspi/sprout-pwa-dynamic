import React, {useState, useEffect} from "react";
import Template from './css/template.json'
import {  useDispatch } from 'react-redux';
import { getApi } from './environment/environment'
const server = getApi('url');

function HomeArea() {
    const [business, setBusiness] = useState("")
    const [token, setToken] = useState("")
    // REDUX
    const dispatch = useDispatch();
    
    useEffect(()=>{
        userInfo()
        logo();
    }, [])

    function logo() {
        let pathname = window.location && window.location.pathname;
        let search = window.location && window.location.search;

        if (pathname !== "/") {    
            console.log('Window', window);
            if(pathname){
                pathname = pathname.split("/");
                setBusiness(pathname[1]);
                window.location.href = `${window.location.origin}?cid=${pathname[1]}`
            }else{
                setBusiness(null)
            }
        }else if(search){
            search = search.split("=");
            setBusiness(search[1]);
        }
    }

    async function userInfo(){
        //Requisição de 
        let response = await fetch(server, {
            method: 'POST',
            headers: {
                "Content-Type": "application/json",
                'Access-Control-Allow-Origin': '*',
            },
            body: JSON.stringify({
                "cid": "miaaaa0001", 
                "phn": "5083309917",
                "action": "get_token"
            })
        });
        response = await response.json()
        if (response.status === "success") {
            dispatch({type: "STORAGE_TOKEN", token: response.token})
        }
        console.log('response', response)
    }

    return (
        <div className="bg-grey pb-5 mb-5 animate__animated animate__fadeIn">
            <div className="bg-white pb-5 mb-5 ">
                <div className="container mb-5 ">
                    
                    <div className="py-4 text-center mx-auto">
                        <img className="d-block mx-auto mb-4 animate__animated animate__pulse" src={business ?  Template[business].logoExtended : ""} alt="" height="72"/>
                        <h2 className="display-4 color-df pt-3">Welcome {token}</h2>
                        <p className="lead color-df pb-3" style={{fontWeight: "200"}}>Here is the home area. Let's start!</p>
                        <div className="row mx-auto justify-content-center">
                            <div style={{height: 1, width: "100%", backgroundColor: "#dadada", marginBottom: 25 }}></div>
                        </div>

                        <div className="row pt-2 justify-content-center">
                            <div className="row flex-column justify-content-center align-items-center" style={{height: 200, width: 200, backgroundColor: business? Template[business].color : "white", borderRadius: 150}}>
                                <p style={{fontSize: 50, fontWeight: "700", margin: 0, paddingTop: 20, color: "white"}}>100</p>
                                <p style={{fontSize: 20, fontWeight: "200", margin: 0, paddingTop: 20, color: "white"}}>Points</p>
                            </div>
                        </div>

                    </div>
                </div>
            </div>
            
        </div>
    );
}

export default HomeArea;