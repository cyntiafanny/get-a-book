import React, {useState, useEffect, useRef} from 'react';
import {Button, CircularProgress, Grid, Input, Snackbar} from "@material-ui/core";
import SearchIcon from '@mui/icons-material/Search';
import Rating from '@mui/material/Rating';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import {useStyles} from "./AppStyle";
import MuiAlert, { AlertProps } from '@mui/material/Alert';
import clsx from 'clsx';
import {child, get, getDatabase, ref, set } from "firebase/database";

import Logo from "../assets/logo.png";
import FavoriteBookmark from "../assets/bookmark.png";
import BookShelf from "../assets/bookshelf.png";
import {submitKeyword} from "../requests/requestAPI";
import {TBook} from "./types";

const App = () => {
  const classes = useStyles();
  const db = getDatabase();
  const dbRef = ref(db);
  const submitButtonRef = useRef<HTMLButtonElement>(null);

  const [page, setPage] = useState<number>(0);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isError, setIsError] = useState<boolean>(false);
  const [isWarning, setIsWarning] = useState<boolean>(false);
  const [keyword, setKeyword] = useState<string>("");
  const [books, setBooks] = useState<TBook[]>([]);
  const [favorites, setFavorites] = useState<string[]>([]);
  const [favDetails, setFavDetails] = useState<TBook[]>([]);

  useEffect(() => {
    fetchFav();
  }, [])

  useEffect(() => {
    let tempFav: string[] = []
    favDetails.map((singleFav: TBook) => {

      tempFav.push(singleFav.id)
    })

    setFavorites(tempFav)
  }, [favDetails])

  useEffect(() => {
  }, [favDetails])

  const handleEnterKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
      if (e.key === "Enter" && submitButtonRef.current) {
          submitButtonRef.current.click();
      }
  };

  const fetchFav = () => {
    get(child(dbRef, `get-a-book`)).then((snapshot) => {
      let tempFav: any[] = [];
      if (snapshot.exists()) {
        const data = snapshot.val();

        Object.keys(data).map(function(key, ) {
          tempFav.push(data[key])
        });
      }
      setFavDetails(tempFav)
    }).catch((error) => {
      setIsError(true);
    });
  }

  const deleteFav = (book: TBook) => {
    set(ref(db, 'get-a-book/' + book.id), {}).then(() => {
      fetchFav();
    });
  }

  const addFav = (book: TBook) => {
    set(ref(db, 'get-a-book/' + book.id), {
      id: book.id,
      title: book.title,
      author: book.author,
      thumbnail: book.thumbnail,
      rating: book.rating,
    }).then(() => {
      fetchFav();
    });
  }

  const listAuthor = (authors: string[]) => {
      let singleLineAuthors = authors[0]

      authors.map((author, index) => {
          if(index !== 0)
          singleLineAuthors = singleLineAuthors + ", " + author
      })

      return singleLineAuthors;
  }

  const createRating = () => {
      return (Math.random() * (5.0 - 1.0) + 1.0)
  }

  const handleClose = (event?: React.SyntheticEvent | Event, reason?: string) => {
      if (reason === 'clickaway') {
          return;
      }

      setIsError(false);
      setIsWarning(false);
  };

  const handleSubmitInput = () => {
      setIsLoading(true)
      submitKeyword(keyword)
          .then((res) => {
              if(res.data.totalItems > 0) {
                  const datas = res.data.items
                  let tempBooks: TBook[] = []

                  datas.forEach((data: any) => {
                      tempBooks.push({
                          id: data.id,
                          title: data.volumeInfo.title,
                          author: data.volumeInfo.authors ? listAuthor(data.volumeInfo.authors) : "authored by unknown",
                          thumbnail:data.volumeInfo.imageLinks.thumbnail,
                          //karena tidak ada rating dari data yang direquest (hanya ada maturity rating tidak berangka),
                          //maka dibuat nilai rating sendiri dengan rentang 1-5 secara random
                          rating: createRating(),
                      });
                  });
                  setBooks(tempBooks);
                  setIsError(false);
                  setPage(1);
              }
              else {
                  setIsWarning(true);
              }
              setIsLoading(false);
          })
          .catch(() => {
              setIsLoading(false);
              setIsError(true);
          });
  }

  const renderBook = (book: TBook) => {
      return(
          <Grid key={book.id}
                className={classes.bookCard}
          >
              <Grid className={classes.favButtonContainer}>
                  {
                    favorites.includes(book.id) ?
                          <FavoriteIcon className={clsx(classes.favIcon, "active")} onClick={() => deleteFav(book)}/> :
                          <FavoriteBorderIcon className={classes.favIcon} onClick={() => addFav(book)}/>
                  }
              </Grid>
              <img className={classes.thumbnail}
                   src={book.thumbnail}
                   alt={book.title}
              />
              <Grid className={classes.detailsContainer}>
                  <h4 className={classes.title}>{book.title}</h4>
                  <h6 className={classes.author}>{book.author}</h6>
                  <Rating name="read-only"
                          value={book.rating}
                          readOnly
                          precision={0.25}
                  />
              </Grid>
          </Grid>
      )
  }

  switch(page) {
    case 1: {
        return(
            <Grid className={classes.resultRoot}>
                <Grid className={classes.favBookmark}
                      onClick={() => setPage(2)}
                >
                    <img src={FavoriteBookmark} alt="Favorite" className={classes.favBookmarkImg}/>
                </Grid>
                <Grid className={classes.searchContainer}>
                    <Input className={clsx(classes.input, "result")}
                           placeholder={"Discover millions of books by title or author... "}
                           disableUnderline={true}
                           value={keyword}
                           onChange={(ev) => setKeyword(ev.target.value)}
                           onKeyDown={handleEnterKeyPress}
                    />
                    <Button className={clsx(classes.button, "result")}
                            onClick={handleSubmitInput}
                            ref={submitButtonRef}
                            disabled={isLoading}
                    >
                        {
                            isLoading ?
                                <CircularProgress className={classes.circularProgress}
                                                  size="20px"
                                /> :
                                <SearchIcon/>
                        }
                    </Button>
                </Grid>
                <Grid className={classes.booksContainer}>
                    {
                        books.map(book => renderBook(book))
                    }
                </Grid>
              <Snackbar open={isError} autoHideDuration={6000} onClose={handleClose}>
                <Alert onClose={handleClose} severity="error" sx={{ width: '100%' }}>
                  Error fetch data!
                </Alert>
              </Snackbar>
              <Snackbar open={isWarning} autoHideDuration={6000} onClose={handleClose}>
                <Alert onClose={handleClose} severity="warning" sx={{ width: '100%' }}>
                  Book not found!
                </Alert>
              </Snackbar>
            </Grid>
        );
        break;
    }
      case 2: {
          return(
              <Grid className={classes.resultRoot}>
                  <ArrowBackIcon onClick={() => setPage(0)} className={classes.backIcon}/>
                  <h1 className={classes.favTitle}>Your Bookshelf</h1>
                  <Grid className={classes.booksContainer}>
                      {
                        favDetails.length > 0 ?
                          favDetails.map(book => renderBook(book)) :
                          <Grid className={classes.emptyBookshelfContainer}>
                            <img src={BookShelf} alt="Bookshelf" className={classes.bookshelfImg}/>
                            <h3>Your bookshelf is empty</h3>
                            <h5>Try to add some by tapping love icon</h5>
                          </Grid>
                      }
                  </Grid>
              </Grid>
          )
      }
      break;
      default: {
          return(
              <Grid className={classes.root}>
                  <img src={Logo} alt="Get A Book" className={classes.logo}/>
                  <Grid className={classes.searchContainer}>
                      <Input className={classes.input}
                             placeholder={"Discover millions of books by title or author... "}
                             disableUnderline={true}
                             value={keyword}
                             onChange={(ev) => setKeyword(ev.target.value)}
                             onKeyDown={handleEnterKeyPress}
                      />
                      <Button className={classes.button}
                              onClick={handleSubmitInput}
                              ref={submitButtonRef}
                              disabled={isLoading}
                      >
                          {
                              isLoading ?
                                  <CircularProgress className={classes.circularProgress}
                                                    size="20px"
                                  /> :
                                  <SearchIcon/>
                          }
                      </Button>
                      <Button className={clsx(classes.button, "fav")}
                              onClick={() => setPage(2)}
                      >
                        {
                            <FavoriteIcon/>
                        }
                      </Button>
                  </Grid>
                <Snackbar open={isError} autoHideDuration={6000} onClose={handleClose}>
                  <Alert onClose={handleClose} severity="error" sx={{ width: '100%' }}>
                    Error fetch data!
                  </Alert>
                </Snackbar>
                <Snackbar open={isWarning} autoHideDuration={6000} onClose={handleClose}>
                  <Alert onClose={handleClose} severity="warning" sx={{ width: '100%' }}>
                    Book not found!
                  </Alert>
                </Snackbar>
              </Grid>
          );
      }
  }
}

const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(
    props,
    ref,
) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

export default App;
