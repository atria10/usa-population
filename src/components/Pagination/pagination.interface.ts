export interface Props{
    onPageChange:(page:number)=>void;
    totalCount:number;
    currentPage: number;
    pageSize:number;
}