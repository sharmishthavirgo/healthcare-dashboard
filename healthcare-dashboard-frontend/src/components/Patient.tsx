import { useEffect } from "react"
import { getPatients } from "../api/patientApi"

const Patient = () => {
    const getPateintData = async() => {
        const response = await getPatients();
        console.log(response);
    }
    useEffect(()=> {
        getPateintData();
    },[])
    return<div></div>
}

export default Patient