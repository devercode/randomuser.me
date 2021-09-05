import React, { useState } from "react";

const AppContext = React.createContext();

const AppProvider = (props) => {
  const [users, setUsers] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  // useState page to use load more user (default 10 users)
  const [page, setPage] = useState(10);

  return (
    <AppContext.Provider
      value={{ users, setUsers, isLoading, setIsLoading, page, setPage }}
    >
      {props.children}
    </AppContext.Provider>
  );
};

export default AppContext;
export { AppProvider };
