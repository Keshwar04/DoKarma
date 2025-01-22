import {
    Pagination, PaginationContent, PaginationItem,
    PaginationNext, PaginationPrevious,
} from "@/components/ui/pagination"

const DonatePagination = ({ startIdx, setStartIdx, endIdx, setEndIdx, noOfList }: any) => {

    const handleNext = () => {
        setStartIdx(startIdx + noOfList) //10
        setEndIdx(endIdx + noOfList) //10 + 10 = 20
    }
    const handlePrevious = () => {
        setStartIdx(startIdx - noOfList)
        setEndIdx(endIdx - noOfList)
    }
    return (
        <Pagination>
            <PaginationContent>
                <PaginationItem>
                    <PaginationPrevious
                        className={startIdx === 0 ? "pointer-events-none opacity-50" : undefined}
                        onClick={handlePrevious} />
                </PaginationItem>
                <PaginationItem>
                    <PaginationNext
                        className={endIdx === 10 ? "pointer-events-none opacity-50" : undefined}
                        onClick={handleNext} />
                </PaginationItem>
            </PaginationContent>
        </Pagination>
    )
}

export default DonatePagination
