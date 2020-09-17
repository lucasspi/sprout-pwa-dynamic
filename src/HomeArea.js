import React, {useState, useEffect} from "react";
import Template from './css/template.json'
import { useDispatch, useSelector } from 'react-redux';
import { getApi } from './environment/environment'
const server = getApi('url');

function HomeArea() {
    const [token, setToken] = useState(useSelector(state => state.InfosDash.token))
    const [points, setPoints] = useState(useSelector(state => state.InfosDash.points))
    const setup = useSelector(state => state.InfosDash.walletSetup);
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

        fetch(server, requestOptions)
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

        fetch(server, requestOptions)
            .then(response => response.json())
            .then(result => {
                if (result.status === "success") {
                    setPoints(result.loyalty_points[0].total_points)
                    dispatch({type: "STORAGE_POINTS", points: result.loyalty_points[0].total_points})
                }
            })
            .catch(error => console.log('error', error));
    }

    function logo() {
        return setup.image || Template[cid].logoExtended;
    }

    function color () {
        return setup.color || Template[cid].color; 
    }
    function message () {
        return setup.points || "Here is the home area. Let's start!";
    }


    
    return (
        <div className="bg-grey pb-5 mb-5 animate__animated animate__fadeIn">
            <div className="bg-white pb-5 mb-5 ">
                <div className="container mb-5 ">
                    
                    <div className="py-4 text-center mx-auto">
                        <img className="d-block mx-auto mb-4 animate__animated animate__pulse" src={logo()} alt="" height="72"/>
                        <h2 className="display-4 color-df pt-3">Welcome </h2>
                        <p className="lead color-df pb-3" style={{fontWeight: "200"}}>{points ? message() : "You don't have any points yet"}</p>
                        <div className="row mx-auto justify-content-center">
                            <div style={{height: 1, width: "100%", backgroundColor: "#dadada", marginBottom: 25 }}></div>
                        </div>

                        <div className="row pt-2 justify-content-center">
                            <div className="row flex-column justify-content-center align-items-center" style={{height: 200, width: 200, backgroundColor: color(), borderRadius: 150}}>
                                <p style={{fontSize: 50, fontWeight: "700", margin: 0, paddingTop: 20, color: "white"}}>{points || 0}</p>
                                <p style={{fontSize: 20, fontWeight: "200", margin: 0, paddingTop: 20, color: "white"}}>Points</p>
                                {/* <p style={{fontSize: 10, fontWeight: "200", margin: 0, paddingTop: 20, color: "white"}}>{token}</p> */}
                            </div>
                        </div>

                    </div>
                </div>
            </div>
            
        </div>
    );
}

export default HomeArea;