import { Box, FormControl, Grid, MenuItem, Select, Typography } from "@mui/material"
import { useEffect } from "react";
import { CardReporte } from "../components/reportes/CardReporte";
import useConsultas from "../hooks/useConsultas";

export const Informes = () => {

    const {cargarReportes, reportes,setReportes , reportesBackup} = useConsultas();



    const tiposDeReportes = () =>{
      const tipos = [... new Set(reportesBackup.map(({TIPO_REPORTE})=>(TIPO_REPORTE)))];
      return tipos;
    }
  
    const onChangeTipo = ({target}) => {
      if(target.value === 'all') return setReportes(reportesBackup);
      if(target.value === 'consultor' || target.value === 'administrador'){
        const filtradoAutor = reportesBackup.filter(({AUTOR})=>(AUTOR === target.value));
        return setReportes(filtradoAutor);
      } 

      const filtrado = reportesBackup.filter(({TIPO_REPORTE})=>(TIPO_REPORTE === target.value));
      setReportes(filtrado)
    }
  
    useEffect(()=>{
      cargarReportes();
    },[setReportes])

  return (
    <Box justifyContent={'center'} textAlign={'center'}>
        <Typography variant="h3" >Informes</Typography>
        <Box marginTop={5} width={'100%'} justifyContent={'center'}>
            <FormControl>
                <Select variant="filled" defaultValue={'all'} onChange={onChangeTipo}>
                        <MenuItem value="all">Todos los Reportes</MenuItem>
                        <MenuItem value="consultor">Autor: Consultor</MenuItem>
                        <MenuItem value="administrador">Autor: Administrador</MenuItem>
                        {
                            tiposDeReportes().map((TIPO)=>(
                            <MenuItem key={TIPO} value={TIPO}>{TIPO}</MenuItem>
                        ))
                        }
                </Select>
            <Typography>Seleccione el tipo de reporte que desea ver</Typography>

            </FormControl>
            <Grid  alignItems={'start'} flexDirection="row" width={'75vw'}  container  spacing={1}    marginTop={5} >
                {
                    reportes.length > 0 && reportes.map((reporte)=>(
                        <CardReporte key={reporte.ID_REPORTE} {...reporte}/>
                    ))
                }
            </Grid>

        </Box>
    </Box>
  )
}
