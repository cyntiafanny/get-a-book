import {createStyles, makeStyles, Theme} from "@material-ui/core/styles";

import Background from "../assets/bg.png";
import BackgroundLight from "../assets/bg2.png";

export const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        //mainPage
        root: {
            width: "100%",
            minHeight: "100vh",
            backgroundImage: "url(" + Background + ")",
            color: "#dacf54"
        },
        logo: {
            width: "30%",
            display: "flex",
            padding: "20px 20px 0",
            margin: "0 auto"
        },
        searchContainer: {
            display: "flex",
            flexDirection: "row",
            width: "45%",
            margin: "0 auto",
        },
        input: {
            border: "2px solid #f5e5b4",
            borderTopLeftRadius: "8px",
            borderBottomLeftRadius: "8px",
            width: "95%",
            height: "40px",
            display: "flex",
            padding: "10px 20px",
            backgroundColor: "#290a34",
            color: "#f5e5b4",
            "&.result": {
                backgroundColor: "#f5e5b4 !important",
                border: "2px solid #290a34",
                color: "#290a34",
                margin: "30px 0 10px"
            }
        },
        button: {
            backgroundColor: "#f5e5b4",
            borderTopRightRadius: "8px",
            borderBottomRightRadius: "8px",
            borderTopLeftRadius: "0px !important",
            borderBottomLeftRadius: "0px !important",
            color: "#290a34",
            height: "40px",
            padding: "10px",
            textTransform: "none",
            "&:hover": {
                backgroundColor: "#f5f1ba !important",
            },
            "&.result": {
                backgroundColor: "#290a34",
                color: "#f5e5b4",
                margin: "30px 0 10px"
            },
            "&.fav": {
                borderTopLeftRadius: "8px !important",
                borderBottomLeftRadius: "8px !important",
                marginLeft: "15px !important"
            }
        },
        buttonFav: {

        },
        circularProgress: {
            color: "#290a34",
        },

        //resultPage
        resultRoot: {
            width: "100%",
            minHeight: "100vh",
            backgroundImage: "url(" + BackgroundLight + ")",
            color: "#290a34",
            position: "relative"
        },
        booksContainer: {
            width: "90%",
            display: "flex",
            flexDirection: "row",
            justifyContent: "spaceBetween",
            flexWrap: "wrap",
            margin: "20px auto 0",
            textAlign: "center"
        },
        bookCard: {
            backgroundColor: "#ffffff",
            borderRadius: "5px",
            width: "20%",
            margin: "20px 25px",
            height: "300px",
            position: "relative"
        },
        thumbnail: {
            objectFit: "cover",
            width: "100%",
            height: "150px !important",
            borderTopLeftRadius: "5px",
            borderTopRightRadius: "5px",
        },
        detailsContainer: {
            padding: "0 20px"
        },
        title: {
            margin: "5px 0 !important",
            color: "#3d2762 !important",
            overflow: "hidden",
            textOverflow: "ellipsis",
            display: "-webkit-box",
            "-webkit-line-clamp": 3,
            "-webkit-box-orient": "vertical"
        },
        author: {
            margin: "5px 0 15px !important",
            color: "#290a34 !important",
        },
        favButtonContainer: {
            backgroundColor: "#ffffff",
            width: "30px",
            height: "30px",
            borderRadius: "20px",
            position: "absolute",
            top: "10px",
            right: "10px",
            boxShadow: "0 4px 8px 0 rgba(0, 0, 0, 0.2)",
            cursor: "pointer"
        },
        favIcon: {
            color: "#290a34",
            opacity: "0.4",
            fontSize: "16px",
            display: "flex",
            margin: "auto !important",
            textAlign: "center",
            paddingTop: "3px",
            paddingLeft: "3px",
            "&.active": {
                color: "#d64c4b !important",
                opacity: "1 !important"
            }
        },
        favBookmark: {
            position: "absolute",
            right: "9%",
            cursor: "pointer"
        },
        favBookmarkImg: {
            width: "100px"
        },

        //page 2
        favTitle: {
          margin: "0 auto !important",
          textAlign: "center",
          color: "#290a34",
          padding: "30px 0 10px"
        },
        bookshelfImg: {
            width: "30%"
        },
        emptyBookshelfContainer: {
          width: "80%",
          margin: "20px auto 0"
        },
        backIcon: {
          color: "#545d53",
          cursor: "pointer",
          position: "absolute",
          top: "33px",
          left: "319px",
          fontSize: "40px !important"
        }
    })
)
