"use client";

import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import {
  TextField,
  FormControl,
  Select,
  Box,
  MenuItem,
  CircularProgress,
  Typography,
} from "@mui/material";

import OwnCard from "../components/OwnCard";
import {
  setUsersState,
  setSearchTerm,
  setSortKey,
  setSortOrder,
  setSelectedUserId,
} from "../lib/features/users/usersSlice.js";
import { useAppDispatch, useAppSelector } from "../lib/hooks";
import { filterUsers } from "./utility/filterUsers.js";
import { sortByKey } from "./utility/sortBykey.js";
import { Grid } from "@mui/material";

function Users() {
  const dispatch = useAppDispatch();
  const [isHydrated, setIsHydrated] = useState(false);
  const [error, setError] = useState();
  const router = useRouter();
  const { users, searchTerm, sortKey, sortOrder } = useAppSelector(
    (state) => state.users
  );
  const [filterResults, setFilterResults] = useState([]);
  const timeoutRef = useRef();

  useEffect(() => {
    if (users.length === 0) {
      fetch("/api/users")
        .then((res) => res.json())
        .then((data) => {
          setIsHydrated(true);
          dispatch(setUsersState(data));
        })
        .catch((err) => {
          console.warn("Fetch erro : " + err);
          setError(err);
        });
    } else {
      setIsHydrated(true);
    }
  }, []);

  useEffect(() => {
    let filtered = filterUsers(users, searchTerm);
    filtered = sortByKey(filtered, sortKey, sortOrder);
    setFilterResults(filtered);
  }, [users, searchTerm, sortKey, sortOrder]);

  const handleSearch = (e) => {
    const value = e.target.value;
    clearTimeout(timeoutRef.current);
    timeoutRef.current = setTimeout(() => {
      dispatch(setSearchTerm(value));
    }, 100);
  };

  const handleSort = (e) => {
    const [order, key] = e.target.value.split(",");
    dispatch(setSortOrder(order));
    dispatch(setSortKey(key));
  };

  const handleViewPosts = (userId) => {
    dispatch(setSelectedUserId(userId));
    router.push(`posts/${userId}`);
  };

  if (error) throw error;

  if (!isHydrated)
    return (
      <>
        <Box sx={{ display: "flex", justifyContent: "center" }}>
          <CircularProgress />
        </Box>
      </>
    );
  return (
    <div>
      {isHydrated && (
        <div className="flex justify-around align-middle items-center">
          <TextField
            id="outlined-search"
            label="Search users"
            type="search"
            value={searchTerm}
            onChange={handleSearch}
            variant="outlined"
            // fullWidth
          />

          <FormControl sx={{ m: 1, minWidth: 120 }}>
            <Select
              value={`${sortOrder},${sortKey}`}
              onChange={handleSort}
              displayEmpty
              inputProps={{ "aria-label": "Without label" }}
            >
              <MenuItem value="asc,name">Name,Asc</MenuItem>
              <MenuItem value="desc,name">Name,Desc</MenuItem>
              <MenuItem value="asc,email">Email,Asc</MenuItem>
              <MenuItem value="desc,email">Email,Desc</MenuItem>
            </Select>
          </FormControl>
        </div>
      )}

      <div className="mt-4">
        <Typography >{`Result : ${
          filterResults.length === 0 ? "User Not Found" : filterResults.length
        } `}</Typography>
        {/* {filterResults.length === 0 && <p>User Not Found</p>} */}
        <Grid
          container
          spacing={{ xs: 2, md: 2, lg: 2 }}
          columns={{ xs: 4, sm: 8, md: 12, lg: 12 }}
          className="p-2"
          justifyContent="flex-start"
        >
          {filterResults.map((user) => (
            <Grid item size={{ xs: 4, sm: 8, md: 4, lg: 3 }} key={user.id}>
              <div className="m-2 h-[100%]  ">
                <OwnCard user={user} handleViewPosts={handleViewPosts} />
              </div>
            </Grid>
          ))}
        </Grid>
      </div>
    </div>
  );
}

export default Users;
