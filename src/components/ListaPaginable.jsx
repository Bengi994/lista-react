import React, { useState, useEffect } from 'react';
import { useReactTable, getCoreRowModel, flexRender } from '@tanstack/react-table'
import { Table, Tbody, Tr, Td, Th, Thead, Tfoot, Box } from "@chakra-ui/react";

import Paginador from './Paginador';
import axios from 'axios'


function ListaPaginable() {

    const [apiData, setApiData] = useState([]);
    const [apiTotalPages, setApiTotalPages] = useState() 
    const [currentPage,setCurrentPage] = useState(1);
    

    useEffect(() => {

        fetchData(currentPage); 
    }, []); 

    const fetchData = async (page) => {
        try {
            const response = await axios.get(`https://api.mochillea.com/api/v1/landing/places?page=${page}&pageSize=1`);
            setApiData(response.data.data.data)
            setApiTotalPages(response.data.data.pagination.total)
            setCurrentPage(response.data.data.pagination.currentPage)
            console.log(response.data.data.data)
        } catch (error) {
            console.error('Error fetching data:', error)
        }
    };

    const cambiarPagina = (nuevaPagina) => {
        fetchData(nuevaPagina)
    }

    
    const columns = [
        {
            header: "Name",
            accessorKey: 'name',
            footer: 'Nombre de lago'
            
        },
        {
            header: "Cover",
            accessorKey: 'cover',
            footer: 'Imagen del lago',
            //cell: (row) => <img src={row?.cover} alt={row?.name} style={{ maxWidth: `100px`, maxHeight: `400px` }} />,
            
        }
    ]

    const table = useReactTable({
        data: apiData,
        columns,
        getCoreRowModel: getCoreRowModel()
    })

    return(
        <>
        <Box p="4">
            <Table variant="simple" colorScheme="teal">
               <Thead>
                {table.getHeaderGroups().map((headerGroup) => (
                    <Tr key={headerGroup.id}>
                        {
                           headerGroup.headers.map((header) => (
                            <Th key={header.id}>
                                {flexRender(
                                header.column.columnDef.header,
                                header.getContext()
                                )}
                            </Th>
                        ))}
                    </Tr>
                ))}
               </Thead>
               <Tbody>
                  {table.getRowModel().rows.map((row) => (

                    <Tr key={row.id}>
                        {row.getVisibleCells().map((cell) => (
                            <Td>
                                {flexRender(cell.column.columnDef.cell, cell.getContext())}
                            </Td>
                        ))}
                    </Tr>
                  ))}
               </Tbody>
               <tfoot>
                  {table.getFooterGroups().map((footerGroup) => (
                        <Tr key={footerGroup.id}> 
                           {footerGroup.headers.map((footer) => (
                            <Th key={footer.id}>
                                {flexRender(
                                    footer.column.columnDef.footer,
                                    footer.getContext()
                                )}
                            </Th>
                           ))}
                        </Tr>
                    ))}
               </tfoot>
            </Table>
        </Box>
        <Paginador 
        apiTotalPages={apiTotalPages}
        currentPage={currentPage} 
        setCurrentPage={cambiarPagina}
        />
       </>
    )
}

export default ListaPaginable