export class PagedResult<T> {
    contents: T[];
    totalCount: number;
    currentPage: number;
    lastPage: number;
}