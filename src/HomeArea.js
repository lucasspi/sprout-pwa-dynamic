import React, {useState, useEffect} from "react";
import Template from './css/template.json'
import {  useDispatch } from 'react-redux';
import { getApi } from './environment/environment'
const server = getApi('url');

function HomeArea() {
    const [business, setBusiness] = useState("")
    const [token, setToken] = useState("")
    const [points, setPoints] = useState("100")
    // REDUX
    const dispatch = useDispatch();
    
    useEffect(()=>{
        userToken()
        logo();
    }, [])

    function logo() {
        let pathname = window.location && window.location.pathname;
        let search = window.location && window.location.search;

        if (pathname !== "/wallet/") {    
            if(pathname){
                pathname = pathname.split("/");
                console.log('', );
                setBusiness(pathname[1]);
            }else{
                setBusiness(null)
            }
        }else if(search){
            search = search.split("=");
            setBusiness(search[1]);
        }
    }

    async function userToken(){
        var myHeaders = new Headers();
        myHeaders.append("Authorization", "Basic Og==");
        myHeaders.append("Content-Type", "text/plain");

        var raw = "{\n    \"cid\": \"miaaaa0001\", \n    \"phn\": \"5083309917\",\n    \"action\": \"get_token\"\n}";

        var requestOptions = {
            method: 'POST',
            headers: myHeaders,
            body: raw,
            redirect: 'follow'
        };

        fetch("http://gatetestb.textripple.com/wallet/", requestOptions)
            .then(response => response.text())
            .then(result => {
                if (result.status === "success") {
                    localStorage.setItem('token', result.token);
                    dispatch({type: "STORAGE_TOKEN", token: result.token})
                    loyalty_points(result.token)
                }
            })
            .catch(error => console.log('error', error));
    }

    async function loyalty_points(token){
        var myHeaders = new Headers();
        myHeaders.append("Authorization", "Basic Og==");
        myHeaders.append("Content-Type", "text/plain");

        var raw = `{\n    \"cid\": \"miaaaa0001\", \n    \"phn\": \"5083309917\",\n    \"action\": \"customer_loyalty_points\",\n    \"token\": \"${token}\"}`;

        var requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: raw,
        redirect: 'follow'
        };

        fetch("http://gatetestb.textripple.com/wallet/", requestOptions)
            .then(response => response.text())
            .then(result => {
                if (result.status === "success") {
                    
                }
                setPoints(result.loyalty_points.total)
            })
            .catch(error => console.log('error', error));
    }

    return (
        <div className="bg-grey pb-5 mb-5 animate__animated animate__fadeIn">
            <div className="bg-white pb-5 mb-5 ">
                <div className="container mb-5 ">
                    
                    <div className="py-4 text-center mx-auto">
                        <img className="d-block mx-auto mb-4 animate__animated animate__pulse" src={business ?  Template[business].logoExtended : ""} alt="" height="72"/>
                        <h2 className="display-4 color-df pt-3">Welcome </h2>
                        <p className="lead color-df pb-3" style={{fontWeight: "200"}}>Here is the home area. Let's start!</p>
                        <div className="row mx-auto justify-content-center">
                            <div style={{height: 1, width: "100%", backgroundColor: "#dadada", marginBottom: 25 }}></div>
                        </div>

                        <div className="row pt-2 justify-content-center">
                            <div className="row flex-column justify-content-center align-items-center" style={{height: 200, width: 200, backgroundColor: business? Template[business].color : "white", borderRadius: 150}}>
                                <p style={{fontSize: 50, fontWeight: "700", margin: 0, paddingTop: 20, color: "white"}}>{points}</p>
                                <p style={{fontSize: 20, fontWeight: "200", margin: 0, paddingTop: 20, color: "white"}}>Points</p>
                                <p style={{fontSize: 10, fontWeight: "200", margin: 0, paddingTop: 20, color: "white"}}>{token}</p>
                            </div>
                        </div>

                    </div>
                </div>
            </div>
            
        </div>
    );
}

export default HomeArea;