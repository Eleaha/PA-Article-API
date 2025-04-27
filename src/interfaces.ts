export interface Article {
    article_id? : number;
    summary: string | null;
    author: string;
    body?: string;
    publication_date: string;
}