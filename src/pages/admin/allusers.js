import { VisibilitySharp } from "@mui/icons-material";
import SearchIcon from "@mui/icons-material/Search";
import { Box, IconButton, TextField } from "@mui/material";
import Button from "@mui/material/Button";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import { navigate } from "@reach/router";
import * as React from "react";
import { getallusers } from "../../config/services";
import {
  AddRemoveAdmin,
  ConfirmKyc,
  DeclineKyc,
  DeleteUser,
} from "./compoinents";

export default function AllUserTablesmain() {
  const [searchQuery, setSearchQuery] = React.useState("");
  const [users, setUsers] = React.useState([]);
  const [usersConst, setUsersConst] = React.useState([]);

  React.useEffect(() => {
    getallusers().subscribe((users) => {
      console.log(users);
      setUsers(users);
      setUsersConst(users);
    });
  }, []);

  const handleChange = (e) => {
    setSearchQuery(e.target.value);
    setUsers(usersConst);
  };

  const search = (e) => {
    let filteredUsers = users.filter((user) => {
      return user.email === searchQuery || user.accountnumber === searchQuery;
    });
    setUsers(filteredUsers);
  };

  return (
    <TableContainer>
      <Box display={"flex"} justifyContent={"center"} p={2}>
        <TextField
          id="search-bar"
          label="Search Account Number or email"
          variant="outlined"
          onChange={handleChange}
         // onBlur={search}
          size="small"
          fullWidth
        />
        <IconButton
          onClick={search}
          sx={{ ml: 1 }}
          type="submit"
          aria-label="search"
        >
          <SearchIcon />
        </IconButton>
      </Box>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell align="left">Add trnx</TableCell>
            <TableCell align="left">Email</TableCell>
            <TableCell align="left">id doc</TableCell>
            <TableCell align="left">vrify kyc</TableCell>
            <TableCell align="left">Delete user</TableCell>
            <TableCell align="left">Admin</TableCell>
            <TableCell align="left">Password</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {users.map((row, index) => (
            <TableRow key={index}>
              <TableCell align="left">
                <Button
                  fullWidth
                  variant="contained"
                  disableElevation
                  onClick={() => navigate(`addtransaction/${row.uid}`)}
                >
                  Add transaction
                </Button>
              </TableCell>
              <TableCell align="left">{row.email}</TableCell>
              <TableCell align="left">
                {row.activated ? (
                  <IconButton
                    size="large"
                    aria-label="showid"
                    onClick={() => window.open(row.image_url, "_blank")}
                  >
                    <VisibilitySharp fontSize="small" />
                  </IconButton>
                ) : (
                  "Not verified"
                )}
              </TableCell>
              <TableCell align="left">
                <ConfirmKyc row={row} />
                <DeclineKyc row={row} />
              </TableCell>
              <TableCell align="left">
                <DeleteUser row={row} />
              </TableCell>
              <TableCell align="left">
                <AddRemoveAdmin row={row} />
              </TableCell>
              <TableCell align="left">{row.password}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
