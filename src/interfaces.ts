export interface Article {
    id? : number;
    summary: string | null;
    author: string;
    body: string;
    publication_date: string;
}