import { ITotalTransactions } from "../total-transactions";
import { ITransaction } from "../transaction";

export interface IGetTransactionParams {
    page: number;
    perPage: number;
    from?: Date;
    to?: Date;
    typeId?: number;
    categoryId?: number;
    searchText?: string;
}

export interface IGetTransactionResponse {
    data: ITransaction[];
    totalRows: number,
    totalPages: number,
    page: number,
    perPage: number,
    totalTransactions: ITotalTransactions

}