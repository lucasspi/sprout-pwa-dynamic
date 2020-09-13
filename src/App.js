import React, { useState, useEffect } from "react";
import { Row } from "reactstrap";
import ProfileArea from "./ProfileArea";
import HomeArea from "./HomeArea";
import RewardsArea from "./RewardsArea";
import { Colxx } from "./CustomBootstrap";
import Template from './css/template.json'
import Lottie from 'react-lottie';
import animationData from './css/loading.json';
import { Provider } from 'react-redux';
import { configureStore } from './redux/store';

function Sprout({}) {

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
    const [business, setBusiness] = useState(null);
    const [ready, setReady] = useState(false);

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

    function logo() {
        let pathname = window.location && window.location.pathname;
        let search = window.location && window.location.search;

        if (pathname !== "/wallet") {    
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
            setReady(true);
        }
    }

    function closeModal(){
        setModal(false);
        localStorage.setItem('closeModal', true);
    }

    // Checks if should display install popup notification:
    if (ready) {
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
                            <i className="icones-bar iconsminds-home" style={{color: page === "home" && business ? Template[business].color : "#616161"}}></i>
                            <p style={{fontSize: 13, paddingBottom: 5, color: page === "home" && business ? Template[business].color : "#616161"}}>Home</p>
                        </div>
                        <div onClick={() => {setPage("rewards");}} className="d-flex flex-column justify-content-center align-items-center">
                            <i className="icones-bar iconsminds-gift-box" style={{color: page === "rewards" &&  business ? Template[business].color : "#616161"}}></i>
                            <p style={{fontSize: 13, paddingBottom: 5, color: page === "rewards" && business ? Template[business].color : "#616161"}}>Rewards</p>
                        </div>
                        <div onClick={() => {setPage("profile");}} className="d-flex flex-column justify-content-center align-items-center">
                            <i className="icones-bar iconsminds-user" style={{color: page === "profile" && business ? Template[business].color : "#616161"}}></i>
                            <p style={{fontSize: 13, paddingBottom: 5, color: page === "profile" && business ? Template[business].color : "#616161"}}>Profile</p>
                        </div>
                        <div onClick={() => null} className="d-flex flex-column justify-content-center align-items-center ">
                            <i className="cart-shopping-icon iconsminds-shopping-cart" style={{color: page === "cart" && business ? Template[business].color : "#616161"}}></i>
                            <p style={{fontSize: 13, paddingBottom: 5, color: page === "cart" &&  business ? Template[business].color : "#616161"}}>Shop</p>
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