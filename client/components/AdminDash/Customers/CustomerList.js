import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import {
  Link,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Button,
  Switch,
  FormGroup,
  FormControlLabel,
} from "@material-ui/core";
import DeleteIcon from "@material-ui/icons/Delete";
import Title from "../Title";
import { useDispatch, useSelector } from "react-redux";
import { fetchUsers, updateUser, removeUser } from "../../../store/users.slice";

const useStyles = makeStyles((theme) => ({
  seeMore: {
    marginTop: theme.spacing(3),
  },
}));

export default function CustomerList() {
  const classes = useStyles();
  const dispatch = useDispatch();
  const { users } = useSelector((state) => state.users);

  const [admin, setAdmin] = useState(false);

  console.log(admin);

  useEffect(() => {
    dispatch(fetchUsers());
  }, []);

  const handleChange = (e) => {
    e.preventDefault();
    setAdmin((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.checked,
    }));
  };

  function preventDefault(event) {
    event.preventDefault();
  }

  return (
    <React.Fragment>
      <Title>Customer List</Title>
      <Table size="small">
        <TableHead>
          <TableRow>
            <TableCell>First Name</TableCell>
            <TableCell>Last Name</TableCell>
            <TableCell>Address</TableCell>
            <TableCell>Username</TableCell>
            <TableCell>Email</TableCell>
            <TableCell>Admin</TableCell>
            <TableCell align="right">Remove</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {users.map((user) => (
            <TableRow key={user.id}>
              <TableCell>Placeholder</TableCell>
              <TableCell>Placeholder</TableCell>
              <TableCell>Placeholder</TableCell>
              <TableCell>{user.username}</TableCell>
              <TableCell>{user.email}</TableCell>
              <TableCell>
                <FormGroup row>
                  <FormControlLabel
                    onChange={handleChange}
                    name="isAdmin"
                    control={<Switch />}
                  />
                </FormGroup>
              </TableCell>
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
