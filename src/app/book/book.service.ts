import { Injectable, OnInit } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs';
import { Book } from './book';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

@Injectable()
export class BookService {
    constructor(private _httpService: Http) { }


    getAllBooks(): Observable<Book[]> {
        return this._httpService.get("http://localhost:8080/api/book")
            .map((response: Response) => response.json())
            .catch(this.handleError);
    }
    private handleError(error: Response) {
        return Observable.throw(error);
    }

    addBook(book: Book) {
        let body = JSON.parse(JSON.stringify(book));
        let headers = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({ headers: headers });
        if(book.id){
            return this._httpService.put("http://localhost:8080/api/book/"+book.id, body, options);
        }else{
            return this._httpService.post("http://localhost:8080/api/book", body, options);
        }
    }

    deleteBook(bookId: string) {
        return this._httpService.delete("http://localhost:8080/api/book/" + bookId);
    }
    getBookById(bookId: String): Observable<Book> {
        return this._httpService.get("http://localhost:8080/api/book/" + bookId)
            .map((response: Response) => response.json())
            .catch(this.handleError);
    }
}