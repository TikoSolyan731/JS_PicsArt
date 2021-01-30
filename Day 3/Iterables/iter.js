const myFavouriteBooks = {
  scienceFiction: ['Dune'],
  dystopia: ['1984', 'We', 'Fahrenheit 451'],
  russian: ['Master and Margarita', 'Crime and Punishment'],

  [Symbol.iterator]: function () {
    const genres = Object.values(this);

    let currentGenreIndex = 0;
    let currentBookIndex = 0;

    return {
      next: function () {
        let books = genres[currentGenreIndex];

        const noMoreBooks = currentBookIndex >= books.length;
        if (noMoreBooks) {
          currentGenreIndex++;
          currentBookIndex = 0;
        }

        books = genres[currentGenreIndex];

        const noMoreGenres = currentGenreIndex >= genres.length;
        if (noMoreGenres) {
          return {
            value: undefined,
            done: true,
          };
        }

        return {
          value: books[currentBookIndex++],
          done: false,
        };
      },
    };
  },
};

// myFavouriteBooks[Symbol.iterator]();
for (const book of myFavouriteBooks) console.log(book);

const copy = [...myFavouriteBooks];

console.log(copy);