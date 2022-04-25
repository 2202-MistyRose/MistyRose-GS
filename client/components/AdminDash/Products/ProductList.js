import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { productsFetch } from "../../../store/allProducts";
import { makeStyles } from "@material-ui/core/styles";
import ImageList from "@material-ui/core/ImageList";
import ImageListItem from "@material-ui/core/ImageListItem";
import ImageListItemBar from "@material-ui/core/ImageListItemBar";
import ListSubheader from "@material-ui/core/ListSubheader";
import IconButton from "@material-ui/core/IconButton";
import InfoIcon from "@material-ui/icons/Info";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "space-around",
    overflow: "hidden",
    backgroundColor: theme.palette.background.paper,
  },
  imageList: {
    width: 500,
    height: 450,
  },
  icon: {
    color: "rgba(255, 255, 255, 0.54)",
  },
}));

export default function ProductList() {
  const classes = useStyles();
  const dispatch = useDispatch();
  const { products } = useSelector((state) => state.products);

  useEffect(() => {
    dispatch(productsFetch());
  }, []);

  return (
    <div className={classes.root}>
      <ImageList rowHeight={180} gap={10} className={classes.imageList}>
        <ImageListItem key="Subheader" cols={2} style={{ height: "auto" }}>
          <ListSubheader component="div">Product Lineup</ListSubheader>
        </ImageListItem>
        {products.map((product) => (
          <ImageListItem key={product.img}>
            <img src={product.imageUrl} alt={product.name} />
            <ImageListItemBar
              title={product.name}
              actionIcon={
                <IconButton
                  aria-label={`info about ${product.name}`}
                  className={classes.icon}
                >
                  <InfoIcon />
                </IconButton>
              }
            />
          </ImageListItem>
        ))}
      </ImageList>
    </div>
  );
}
