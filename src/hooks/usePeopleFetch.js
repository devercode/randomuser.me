import { useState, useEffect, useContext } from "react";
import axios from "axios";
import AppContext from "../AppContext";

export const usePeopleFetch = () => {
  const {
    users,
    setUsers,
    isLoading,
    setIsLoading,
    page,
    setPage,
    selectNat,
    setSelectNat,
  } = useContext(AppContext);

  useEffect(() => {
    if (selectNat.toString() == "") {
      fetchUsers(page);
    } else {
      fetchUsersSelect(page);
    }
  }, [page]);

  // Fetch all data users
  const fetchUsers = async (page) => {
    const newUsers = [];
    setIsLoading(true);
    const response = await axios.get(`https://randomuser.me/api/?results=${page}&page=1`);
    setIsLoading(false);

    // Add property clicked into array users
    response.data.results &&
      response.data.results.forEach((element) => {
        newUsers.push({ ...element, clicked: false });
      });

    setUsers(newUsers);
  };

  const fetchUsersSelect = (page) => {
    axios
      .get(`https://randomuser.me/api/?nat=${selectNat.toString()}&&results=${page}`)
      .then((res) => {
        if (res && res.status === 200) {
          setUsers(res.data.results);
        }
      })
      .catch((error) => {
        throw error;
      });
  };

  return {
    users,
    isLoading,
    fetchUsers,
    setUsers,
    page,
    setPage,
    selectNat,
    setSelectNat,
    fetchUsersSelect,
    fetchUsers,
  };
};
