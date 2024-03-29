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
            
            //Переменные для формы добавления книг
            title: '',
            author: '',
            year: '',
            price: '',
            quantity: '',
            category: '',
            sale: '',
            description: '',
            alt: '',
            file: null
        };
    },
    actions: {
        getBooks() {
            // Этот метод С обновлением данных в реальном времени и работает БЕЗ async
            onSnapshot(collection(db, 'books'), (querySnapshot) => {
                const fbBooks = []
                querySnapshot.forEach((val) => {
                    const bookData = val.data()
                    let discountPrice = bookData.price
                    if (bookData.sale > 0) {
                      const discount = bookData.sale / 100
                      discountPrice = discountPrice - discountPrice * discount
                    }
                    const book = {
                      id: val.id,
                      title: bookData.title,
                      author: bookData.author,
                      year: bookData.year,
                      price: bookData.price,
                      discountPrice: typeof discountPrice === 'number' ? discountPrice.toFixed(2) : discountPrice,
                      quantity: bookData.quantity,
                      category: bookData.category,
                      sale:  bookData.sale,
                      image: bookData.image,
                      description: bookData.description,
                      alt: bookData.alt
                    }
                    fbBooks.push(book)
                })
                this.books = fbBooks
            })
        },
        
        addToCart(book) {
            const priceWithDiscount = book.price - (book.price * book.sale / 100)
            const cartItem = this.cart.find(item => item.id === book.id)
            if (cartItem) {
              cartItem.quantity += 1
            } else {
              this.cart.push({
                ...book,
                quantity: 1,
                priceWithDiscount
              })
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
            return state.cart.reduce((sum, item) => {
              const price = item.priceWithDiscount || item.price
              return sum + price * item.quantity
            }, 0).toFixed(2)
        },
        
        filterBooks(state) {
            const query = state.searchQuery ? state.searchQuery.toLowerCase() : ''
            if (query) {
              return state.books.filter(book =>
                book.title.toLowerCase().includes(query)
              )
            } else if (state.filteredBooks.length) {
              return state.filteredBooks
            } else {
              return state.books
            }
        },
        getSearchQuery(state) { 
            return state.searchQuery
        },
        discountBooks(state) {
          return state.books.filter(book => book.sale > 0)
        }
    },
});