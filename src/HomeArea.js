import React, {useState, useEffect} from "react";
import Template from './css/template.json'

function HomeArea() {
    const [business, setBusiness] = useState("")
    
    useEffect(()=>{
        logo();
    }, [])

    function logo() {
        let search = window.location.pathname;
        if(search){
            search = search.split("/");
            setBusiness(search[1]);
        }else{
            setBusiness(null)
        }
    }
    return (
        <div className="bg-grey pb-5 mb-5 animate__animated animate__fadeIn">
            <div className="bg-white pb-5 mb-5 ">
                <div className="container mb-5 ">
                    
                    <div className="py-4 text-center mx-auto">
                        <img className="d-block mx-auto mb-4 animate__animated animate__pulse" src={business ?  Template[business].logoExtended : ""} alt="" height="72"/>
                        <h2 className="display-4 color-df pt-3">Welcome</h2>
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