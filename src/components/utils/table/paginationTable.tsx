import { useState } from "react";
// import { Button } from "@/components/ui/button";
import {
    Table, TableHead, TableRow,
    TableHeader, TableBody, TableCell
} from "@/components/ui/table";



const PaginationTable = ({ headers, datas }: any) => {
    // const [currentPage, setCurrentPage] = useState(1);
    const [currentPage] = useState(1);

    const data = Array.from({ length: 6 }, () => ({ ...datas[0] }));

    const ITEMS_PER_PAGE = 10;
    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
    const endIndex = startIndex + ITEMS_PER_PAGE;
    const paginatedData = data.slice(startIndex, endIndex);

    // Function to handle page changes
    // const goToPage = (pageNumber: number) => {
    //     setCurrentPage(pageNumber);
    // };
    // const totalPages = Math.ceil(data.length / ITEMS_PER_PAGE);
    // const pageNumbers = Array.from({ length: totalPages }, (_, i) => i + 1);
    return (
        <div className="w-full">
            <Table>
                <TableHeader>
                    <TableRow>
                        {headers.map((e: string) => (
                            <TableHead key={e}>{e}</TableHead>
                        ))}
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {paginatedData.map((e, idx) => (
                        <TableRow key={idx}>
                            <TableCell>{e.fundraiser}</TableCell>
                            <TableCell>{e.title}</TableCell>
                            <TableCell>{e.category}</TableCell>
                            <TableCell>{e.amountRaised}</TableCell>
                            <TableCell>{e.goal}</TableCell>
                            <TableCell>{e.achieved}</TableCell>
                            <TableCell>{e.donors}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>

            {/* Pagination Controls */}
            {/* <div className="flex justify-end items-center gap-2 mt-4">
                <Button onClick={() => goToPage(currentPage - 1)}
                    disabled={currentPage === 1}>
                    Previous
                </Button>
                <div className="flex gap-1">
                    {pageNumbers.map((pageNumber) => (
                        <Button
                            key={pageNumber}
                            onClick={() => goToPage(pageNumber)}
                            variant={pageNumber === currentPage ? "default" : "outline"}
                            size="sm"
                            className={pageNumber === currentPage ? "bg-blue-500 text-white" : ""}
                        >
                            {pageNumber}
                        </Button>
                    ))}
                </div>
                <Button onClick={() => goToPage(currentPage + 1)}
                    disabled={currentPage === totalPages}>
                    Next
                </Button>
            </div> */}
        </div>
    )
}

export default PaginationTable
