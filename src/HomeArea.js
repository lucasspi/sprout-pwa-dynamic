import React, {useState, useEffect} from "react";
import Template from './css/template.json'
import { useDispatch, useSelector } from 'react-redux';
import { getApi } from './environment/environment'
import { Row, Label, Button } from "reactstrap";
import { Colxx } from "./CustomBootstrap";
const server = getApi('url');

function HomeArea() {
    const [token, setToken] = useState(useSelector(state => state.InfosDash.token))
    const [points, setPoints] = useState(useSelector(state => state.InfosDash.points))
    const [businessIndex, setBusinessIndex] = useState(useSelector(state => state.InfosDash.businessIndex))
    // REDUX
    const dispatch = useDispatch();
    const InfosDash = useSelector(state => state.InfosDash);
    const phone = useSelector(state => state.InfosDash.phone);
    const cid = useSelector(state => state.InfosDash.cid);

    useEffect(()=>{
        if (cid && !token) {
            userToken()
        }else if(token && points){
            setPoints(points)
        }
    }, [])

    async function userToken(){
        var myHeaders = new Headers();
        myHeaders.append("Authorization", "Basic Og==");
        myHeaders.append("Content-Type", "text/plain");

        var raw = `{
            \"cid\": \"${cid}\", 
            \"phn\": \"${phone}\",
            \"action\": \"get_token\"
        }`;

        var requestOptions = {
            method: 'POST',
            headers: myHeaders,
            body: raw,
            redirect: 'follow'
        };

        fetch("http://gatetestb.textripple.com/wallet/", requestOptions)
            .then(response => response.json())
            .then(result => {
                if (result.status === "success") {
                    localStorage.setItem('token', result.token);
                    setToken(result.token)
                    dispatch({type: "STORAGE_TOKEN", token: result.token})
                    loyalty_points(result.token)
                }
            })
            .catch(error => console.log('error', error));
    }
    // dca5ywt73f991u4tmdda
    async function loyalty_points(token){
        var myHeaders = new Headers();
        myHeaders.append("Authorization", "Basic Og==");
        myHeaders.append("Content-Type", "text/plain");

        var raw = `{
            \"cid\": \"${cid}\", 
            \"phn\": \"${phone}\",
            \"action\": \"customer_loyalty_points\",
            \"token\": \"${token}\"
        }`;

        var requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: raw,
        redirect: 'follow'
        };

        fetch("http://gatetestb.textripple.com/wallet/", requestOptions)
            .then(response => response.json())
            .then(result => {
                if (result.status === "success") {
                    setPoints(result.loyalty_points)
                    dispatch({type: "STORAGE_POINTS", points: result.loyalty_points})
                }
            })
            .catch(error => console.log('error', error));
    }

    function handleField(event) {
        setBusinessIndex(event.target.value);   
        dispatch({type: "STORAGE_BUSINESS_INDEX", businessIndex: event.target.value})
    }
    
    if(points){
        return (
            <div className="bg-grey pb-5 mb-5 animate__animated animate__fadeIn">
                <div className="bg-white pb-5 mb-5 ">
                    <div className="container mb-5 ">
                        
                        <div className="py-4 text-center mx-auto">
                            <img className="d-block mx-auto mb-4 animate__animated animate__pulse" src={cid ?  Template[cid].logoExtended : ""} alt="" height="72"/>
                            <h2 className="display-4 color-df pt-3">Welcome </h2>
                            <p className="lead color-df pb-3" style={{fontWeight: "200"}}>Here is the home area. Let's start!</p>
                            <Colxx xxs="10" md="6" className="mx-auto my-auto mt-3">
                                <Label className="form-group has-float-label mb-4">
                                    <select
                                        className="form-control" 
                                        value={businessIndex}
                                        name="businessIndex"
                                        onChange={handleField}>
                                        {points.map((item, index) => {return(
                                            <option value={index}>{item.location_name}</option>
                                        )})}
                                        </select>
                                    <span>Select the store</span>
                                </Label>
                            </Colxx>
                            <div className="row mx-auto justify-content-center">
                                <div style={{height: 1, width: "100%", backgroundColor: "#dadada", marginBottom: 25 }}></div>
                            </div>
                            <div className="row pt-2 pb-4 justify-content-center">
                                <div className="row flex-column justify-content-center align-items-center" style={{height: 200, width: 200, backgroundColor: cid? Template[cid].color : "white", borderRadius: 150}}>
                                    <p style={{fontSize: 50, fontWeight: "700", margin: 0, paddingTop: 20, color: "white"}}>{points && points[businessIndex] && points[businessIndex].total_points}</p>
                                    <p style={{fontSize: 20, fontWeight: "200", margin: 0, paddingTop: 20, color: "white"}}>Points</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                
            </div>
        );
    }else{
        return(
            <div>
                <div className="loading" />
            </div>
        )
    }
}

export default HomeArea;