import { defineStore } from "pinia";

import { db } from '@/firebase'
import { collection, onSnapshot } from 'firebase/firestore';

export const useBooksStore = defineStore('booksStore', {
    state: () => {
        return {
            books: [],
            cart: [],
            filteredBooks: [],
            searchQuery: '',
            fileUrl: null
        };
    },
    actions: {

        setFileUrl(fileUrl) {
            this.fileUrl = fileUrl
        },
        setBooks(updatedBooks) {
            this.books = updatedBooks
        },

        getBooks() {
            // Этот метод БЕЗ обновления данных в реальном времени, и работает С async
            // const querySnapshot = await getDocs(collection(db, 'books'))
            // let fbBooks = []
            // querySnapshot.forEach((val) => {
            //     const book = {
            //       id: val.id,
            //       title: val.data().title,
            //       author: val.data().author,
            //       year: val.data().year,
            //       price: val.data().price,
            //       quantity: val.data().quantity,
            //       category: val.data().category,
            //       image: val.data().image,
            //       description: val.data().description,
            //       alt: val.data().alt
            //     }
            //     fbBooks.push(book)
            //   })
            //   this.books = fbBooks

            // Этот метод С обновлением данных в реальном времени и работает БЕЗ async
            onSnapshot(collection(db, 'books'), (querySnapshot) => {
                const fbBooks = []
                querySnapshot.forEach((val) => {
                    const book = {
                      id: val.id,
                      title: val.data().title,
                      author: val.data().author,
                      year: val.data().year,
                      price: val.data().price,
                      quantity: val.data().quantity,
                      category: val.data().category,
                      image: val.data().image,
                      description: val.data().description,
                      alt: val.data().alt
                    }
                    fbBooks.push(book)
                })
                this.books = fbBooks
                console.log(this.books)
            })
        },

        addToCart(book) {
            if(this.cart.length) {
                let bookIsPresent = false
                this.cart.map(item => {
                    if(item.id === book.id) {
                        bookIsPresent = true
                        item.quantity++
                    }
                });
                if(!bookIsPresent) {
                    this.cart.push(book)
                }
            } else {
                this.cart.push(book)
            }
        },

        removeCartItem(index) {
            this.cart.splice(index, 1)
        },

        addCountQty(cartItem) {
            cartItem.quantity++
        },

        reduceCountQty(cartItem) {
            if(this.cart) {
                if(cartItem.quantity <= 1) {
                    return;
                } else {
                    cartItem.quantity--
                }
            }
        },
        setSearchQuery(searchQuery) {
            this.searchQuery = searchQuery
        }
    },

    getters: {
        cartTotal(state) {
            return state.cart.reduce((sum, item) => sum + item.price * item.quantity, 0).toFixed(2)
        },
        filterBooks(state) {
            if(state.searchQuery) {
                const query = state.searchQuery.toLowerCase()
                if (!query) {
                    return state.books // возвращаем полный массив, если запрос не указан
                }
                    return state.books.filter(book => book.title.toLowerCase().includes(query))
            }
            if(state.filteredBooks.length) {
              return state.filteredBooks
            } else {
              return state.books
            }
        },
        getSearchQuery(state) {
            return state.searchQuery
        },
    },
});