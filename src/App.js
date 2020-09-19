import React, { useState, useEffect } from "react";
import { Row } from "reactstrap";
import ProfileArea from "./ProfileArea";
import HomeArea from "./HomeArea";
import RewardsArea from "./RewardsArea";
import { Colxx } from "./CustomBootstrap";
import Template from './css/template.json'
import Lottie from 'react-lottie';
import animationData from './css/loading.json';
import {  useDispatch, useSelector } from 'react-redux';
import { server } from './environment/environment'

function Sprout() {

    const defaultOptions = {
      loop: true,
      autoplay: true,
      animationData: animationData,
      rendererSettings: {
        preserveAspectRatio: "xMidYMid slice"
      }
    };

    const [page, setPage] = useState("home");
    const [modal, setModal] = useState(false);
    const [cid, setCid] = useState(null);
    const [token, setToken] = useState(null);
    const [ready, setReady] = useState(false);
    const dispatch = useDispatch();
    const setup = useSelector(state => state.InfosDash.walletSetup);
    // Detects if device is on iOS 
    const isIos = () => {
        const userAgent = window.navigator.userAgent.toLowerCase();
        return /iphone|ipad|ipod/.test( userAgent );
    }
    // Detects if device is in standalone mode
    const isInStandaloneMode = () => ('standalone' in window.navigator) && (window.navigator.standalone);
    
    useEffect(() => {
        let closeModal = localStorage.getItem('closeModal');
        closeModal = closeModal ? closeModal : false;
        logo();
        if (isIos() && !isInStandaloneMode() && !closeModal) {
            setModal(true);
        }
    }, [])

    async function userToken(cid, phn){
        var myHeaders = new Headers();
        myHeaders.append("Authorization", "Basic Og==");
        myHeaders.append("Content-Type", "text/plain");

        var raw = `{
            \"cid\": \"${cid}\", 
            \"phn\": \"guest\",
            \"action\": \"get_token\"
        }`;

        var requestOptions = {
            method: 'POST',
            headers: myHeaders,
            body: raw,
            redirect: 'follow'
        };

        fetch(server, requestOptions)
            .then(response => response.json())
            .then(result => {
                if (result.status === "success") {
                    localStorage.setItem('token', result.token);
                    setToken(result.token)
                    appSetup(result.token, cid)
                }
            })
            .catch(error => console.log('error', error));
    }

    function logo() {
        let pathname = window.location && window.location.pathname;
        let search = window.location && window.location.search;

        if (pathname !== "/wallet/" && pathname !== "/wallet") {    
            if(search){
                search = search.split("=");
                setCid(search[1]);
                userToken(search[1])
                dispatch({type: "STORAGE_CID", cid: search[1]})
            }else{
                setCid(null)
            }
        }else if(search){
            search = search.split("&");
            if (search[0]) {
                const cid = search[0].split("=");
                setCid(cid[1]);
                userToken(cid[1])
                dispatch({type: "STORAGE_CID", cid: cid[1]})
                localStorage.setItem('cid', cid[1]);
                
            }
            if(search[1]){
                const phone = search[1].split("=");
                dispatch({type: "STORAGE_PHONE", phone: phone[1]})
                localStorage.setItem('phone', phone[1]);
            }
            setReady(true);
        }
    }

    function appSetup (token, cid) {
        var myHeaders = new Headers();
        myHeaders.append("Authorization", "Basic Og==");
        myHeaders.append("Content-Type", "text/plain");
        var raw = `{
            \"cid\": \"${cid}\",
            \"token\": \"${token}\",
            \"phn\": \"guest\",
            \"action\": \"wallet_setup\"
        }`;

        var requestOptions = {
            method: 'POST',
            headers: myHeaders,
            body: raw,
            redirect: 'follow'
        };
        //gatetestb.textripple.com
        fetch(server, requestOptions)
            .then(response => response.json())
            .then(result => {
                // setSetup(result.setup)
                dispatch({type: "STORAGE_WALLET_SETUP", walletSetup: result.setup})
            })
        .catch(error => console.log('error', error));
    }

    function navigationColor (current) {
        if(page === current) {  
            if(setup.color) {
                return setup.color
            }
            if(Template[cid])
                return Template[cid].color

            return "#03a9f4"
        }
        return "#616161"
    }

    function closeModal(){
        setModal(false);
        localStorage.setItem('closeModal', true);
    }

    // Checks if should display install popup notification:
    if (ready && cid) {
        return (
            <div>
                {page === "home" && <HomeArea className=""/>}
                {page === "profile" && <ProfileArea/>}
                {page === "rewards" && <RewardsArea/>}
                
                <div className="content-bar px-5">
                {<div className={modal ? "pt-2 pb-3 mx-auto bg-alert animate__animated animate__backInUp" : "pt-2 pb-3 mx-auto bg-alert animate__animated animate__backOutDown"}>
                    <Row>
                        <Colxx xxs="12" className="mx-2 d-flex justify-content-between align-items-center">
                            <p style={{margin: 0, fontWeight: "600", textAlign: "left", fontSize: 14, }} className="lead weight-700 ">Sprout Application</p>
                            <div onClick={closeModal} className="pr-4 pl-5 pb-2" style={{fontSize: 18, margin: 0}}>x</div>
                        </Colxx>
                    </Row>
                    <Row>
                        <Colxx xxs="12" className="mx-2">
                            <p style={{margin: 0, textAlign: "left", fontWeight: "300", fontSize: 14,}} className="">
                                <span>Install this app on your iPhone: tap</span>
                                <span><img alt="" style={{height: 17, marginLeft: 6, marginRight: 6, marginBottom: 4}} src="/assets/share.png" /></span>
                                and then Add to homescreen
                            </p>
                        </Colxx>
                    </Row>
                </div>}
                    
                    <Row className="justify-content-between align-items-center px-2 py-2">
                        <div onClick={() => {setPage("home");}} className=" d-flex flex-column justify-content-center align-items-center">
                            <i className="icones-bar iconsminds-home" style={{color: navigationColor("home")}}></i>
                            <p style={{fontSize: 13, paddingBottom: 5, color: navigationColor("home")}}>Home</p>
                        </div>
                        <div onClick={() => {setPage("rewards");}} className="d-flex flex-column justify-content-center align-items-center">
                            <i className="icones-bar iconsminds-gift-box" style={{color: navigationColor("rewards")}}></i>
                            <p style={{fontSize: 13, paddingBottom: 5, color: navigationColor("rewards")}}>Rewards</p>
                        </div>
                        <div onClick={() => {setPage("profile");}} className="d-flex flex-column justify-content-center align-items-center">
                            <i className="icones-bar iconsminds-user" style={{color: navigationColor("profile")}}></i>
                            <p style={{fontSize: 13, paddingBottom: 5, color: navigationColor("profile")}}>Profile</p>
                        </div>
                        <div onClick={()=> window.open(setup.shopping_cart, "_blank")} className={"flex-column justify-content-center align-items-center " + (setup.shopping_cart && setup.shopping_cart != "" ? 'd-flex' : 'd-none')} >
                            <i className="cart-shopping-icon iconsminds-shopping-cart" style={{color: navigationColor("cart")}}></i>
                            <p style={{fontSize: 13, paddingBottom: 5, color: navigationColor("cart")}}>Shop</p>
                        </div>
                    </Row>
                </div>
            </div>
        );
    }else{
        return(
            <div className=" h-100 w-100 d-flex align-items-center ">
                <Row className="align-items-center mx-auto my-auto w-100">
                    <Lottie 
                        options={defaultOptions}
                        height={100}
                        width={100}
                    />
                    <p className="text-center w-100 pt-4" style={{color: "#6b6a6a"}}>Specify the desired app</p>
                </Row>
            </div>
        )
    }
}

export default Sprout;