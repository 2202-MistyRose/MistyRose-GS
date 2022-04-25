import React, { useEffect } from "react";
import Link from "@material-ui/core/Link";
import { makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Button from "@material-ui/core/Button";
import DeleteIcon from "@material-ui/icons/Delete";
import VisibilityIcon from "@material-ui/icons/Visibility";
import Title from "../Title";
import { useDispatch, useSelector } from "react-redux";
import { fetchUsers } from "../../../store/users.slice";
import { removeUser } from "../../../store/users.slice";

const useStyles = makeStyles((theme) => ({
  seeMore: {
    marginTop: theme.spacing(3),
  },
}));

export default function CustomerList() {
  const classes = useStyles();
  const dispatch = useDispatch();
  const { users } = useSelector((state) => state.users);

  useEffect(() => {
    dispatch(fetchUsers());
  }, []);

  function preventDefault(event) {
    event.preventDefault();
  }

  return (
    <React.Fragment>
      <Title>Customer List</Title>
      <Table size="small">
        <TableHead>
          <TableRow>
            <TableCell>View</TableCell>
            <TableCell>First Name</TableCell>
            <TableCell>Last Name</TableCell>
            <TableCell>Address</TableCell>
            <TableCell>Username</TableCell>
            <TableCell>Email</TableCell>
            <TableCell align="right">Remove</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {users.map((user) => (
            <TableRow key={user.id}>
              <TableCell>
                <Button>
                  <VisibilityIcon />
                </Button>
              </TableCell>
              <TableCell>Placeholder</TableCell>
              <TableCell>Placeholder</TableCell>
              <TableCell>Placeholder</TableCell>
              <TableCell>{user.username}</TableCell>
              <TableCell>{user.email}</TableCell>
              <TableCell align="right">
                <Button onClick={() => dispatch(removeUser(user.id))}>
                  <DeleteIcon />
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <div className={classes.seeMore}>
        <Link color="primary" href="#" onClick={preventDefault}>
          See more customers
        </Link>
      </div>
    </React.Fragment>
  );
}
