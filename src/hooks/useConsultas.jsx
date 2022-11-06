import { useContext } from "react";
import consultasContext from "../context/ConsultasProvider";





const useConsultas = () => useContext(consultasContext);



export default useConsultas;