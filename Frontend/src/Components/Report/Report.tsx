import { Fragment, useEffect, useState } from "react"
import {
    Table,
    Thead,
    Tbody,
    Tfoot,
    Tr,
    Th,
    Td,
    TableCaption,
    TableContainer,
    ChakraProvider,
    theme,
    Spinner,
    Select,
    Container as ChakraContainer
  } from '@chakra-ui/react'
import { Container } from "@mui/material"
import { Shipment, ShipperID, ReportProps, ReportData } from "../../Interfaces/config";
import axios from "axios";
import BarChart from "./ReportBar"
import { api_config, api_url } from "../../utils/api_config";
import ReportPie from "./ReportPie";

const Report = () => {

    const [selectedShipper, setSelectedShipper] = useState("");
    const [shipperData, setShipperData] = useState<[]>([]);
    const [shipmentData, setShipmentData] = useState<Shipment[]>([]);
    const [dataRecieved, setDataRecieved] = useState(false);
    const [dataReady, setDataReady] = useState(false);
    let randomReportData: ReportData[] = [{
        Boxes: 0,
        Dates: ""
    }]
    const [reportData, setReportData] = useState<ReportProps>();

    useEffect(() => {
        axios.get(`${api_url}/get-products-by-shipper/${selectedShipper}`, api_config).then(result => {
            setShipmentData(result.data.Recieved)
            let finalDates:String[] = result.data.Recieved.reduce((acc:[], data:Shipment) => {
                return [...acc, data.Date]
            },[])
            let finalBoxes:Number[] = result.data.Recieved.reduce((acc:[], data:Shipment) => {
                return [...acc, data.BoxesRcvd]
            },[])
            setReportData({Boxes:finalBoxes, Dates: finalDates})
        })
    }, [selectedShipper]);

    useEffect(() => {
        console.log(reportData)
        if(shipmentData.length>0){
            setDataRecieved(true)
        }
        
    }, [shipmentData]);

    useEffect(() => {
        axios.get(`${api_url}/get-shippers`, api_config).then(result => {
            setShipperData(result.data)
        }).then((res) => {
            setDataReady(true);
        })
    }, []);


    const handleShipperChange = (shipperID:string) => {
        setSelectedShipper(shipperID)
    }
    return ( 
        <Fragment>
            {dataReady?
            <Container style={{display:'flex', justifyContent:'center', alignItems:'center', flexDirection:'column', padding:'20px'}}>
                <ChakraProvider>
                    <Select onChange={(event) => handleShipperChange(event?.target.value)} placeholder='Select Shipper ID'>
                        {shipperData.map(shipper => {
                            return(
                                <option value={shipper}>{shipper}</option>
                            )
                        })}
                    </Select>
                </ChakraProvider>
                <Container style={{display:'flex', flexDirection:'row', justifyContent:'center', alignItems:'space-evenly', height:'50vh', width:'30vw'}}>
                    {dataRecieved?
                        <BarChart Dates={reportData?.Dates!} Boxes={reportData?.Boxes!}/>
                        :null
                    }
                    <ReportPie/>
                </Container>
                <ChakraProvider>
                {dataRecieved?
                    <TableContainer mt={10}>
                        <Fragment>
                            <Table variant='striped' colorScheme='teal'>
                                <TableCaption>Detailed Report</TableCaption>
                                <Thead>
                                <Tr>
                                    <Th>Date</Th>
                                    <Th>Warehouse ID</Th>
                                    <Th>Shipping PO</Th>
                                    <Th>Shipment ID</Th>
                                    <Th># Boxes Recieved</Th>
                                </Tr>
                                </Thead>
                                <Tbody>
                                    {shipmentData.map((data) => (
                                        <Tr>
                                            <Td>{data.Date}</Td>
                                            <Td>{data.WarehouseID}</Td>
                                            <Td>{data.ShippingPO}</Td>
                                            <Td>{data.ShipmentID.toString()}</Td>
                                            <Td>{data.BoxesRcvd.toString()}</Td>
                                        </Tr>
                                    ))}
                                </Tbody>
                            </Table>
                        </Fragment>
                    </TableContainer>
                    :
                    <ChakraContainer style={{display:'flex', justifyContent:'center', alignItems:'center', width:'100%', flexDirection:'column', padding:'20px'}}>
                    <Spinner
                        thickness='4px'
                        speed='0.65s'
                        emptyColor='gray.200'
                        color='blue.500'
                        size='xl'
                    />
                    <p>Please select a shipper ID from above to generate complete report</p>
                    </ChakraContainer>
                    }
                </ChakraProvider>
            </Container>
            :
            <ChakraContainer style={{display:'flex', justifyContent:'center', alignItems:'center', width:'100%', flexDirection:'column', padding:'20px'}}>
                <Spinner
                    thickness='4px'
                    speed='0.65s'
                    emptyColor='gray.200'
                    color='blue.500'
                    size='xl'
                />
                <p>Please wait while we recieve data</p>
            </ChakraContainer>
            }
        </Fragment>
     );
}
 
export default Report;

function sleep(ms:number) {
    return new Promise(resolve => setTimeout(resolve, ms));
}