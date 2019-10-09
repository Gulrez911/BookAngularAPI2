import { Component, OnInit } from '@angular/core';
import { Book } from './book';
import { BookService } from './book.service';
import { Router } from '@angular/router';

@Component({
    selector: 'app-book',
    templateUrl: './book.component.html',
    styleUrls: ['./book.component.css']
})
export class BookComponent {

    books: Book[];
    statusMessage: string;
    book = new Book();

    constructor(private _bookService: BookService, private _router: Router) { }

    ngOnInit(): void {
        this.getBooks();
    }

    getBooks(): void {
        this._bookService.getAllBooks()
            .subscribe((bookData) => { this.books = bookData, console.log(bookData) },
                (error) => {
                    console.log(error);
                    this.statusMessage = "Problem with service. Please try again later!";
                }
            );
    }


    addBook(): void {
        this._bookService.addBook(this.book)
            .subscribe((response) => { console.log(response); this.getBooks(); this.reset() },
                (error) => {
                    console.log(error);
                    this.statusMessage = "Problem with service. Please try again later!";
                }
            );
    }

    private reset() {
        this.book.id = null;
        this.book.title = null;
        this.book.author = null;
    }

    deleteBook(bookId: string) {
        console.log("Inside the deleteBook Method: BookId" + bookId);
        this._bookService.deleteBook(bookId)
            .subscribe((response) => { console.log(response); this.getBooks(); },
                (error) => {
                    console.log(error);
                    this.statusMessage = "Problem with service. Please try again later!"
                }
            );
    }

    updateBook(bookId: string) {
        return this._bookService.getBookById(bookId)
            .subscribe((booksd) => { this.book = booksd; this.getBooks(); }),
            (error) => {
                console.log(error);
                this.statusMessage = "Problem with service, Please try again later!";
            }
        this.reset();
    }
}