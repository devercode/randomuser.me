import React, { useEffect, useState } from "react";
import Text from "../Text/Text";
import Spinner from "../Spinner/Spinner";
import IconButton from "@material-ui/core/IconButton";
import FavoriteIcon from "@material-ui/icons/Favorite";
import * as Style from "./style";
import _ from "lodash";
import { usePeopleFetch } from "../../hooks/usePeopleFetch";
const UserListFavorite = ({}) => {
  const { users, isLoading, setUsers, page, setPage } = usePeopleFetch();
  const [hoveredUserId, setHoveredUserId] = useState();
  const [checkHeart, setCheckHeart] = useState(false);
  const [favorite, setFavorite] = useState([]);

  const handleMouseEnter = (index) => {
    setHoveredUserId(index);
  };

  const handleMouseLeave = () => {
    setHoveredUserId();
  };

  // CLICK ICON HEART TO REMOVE THEM
  const handleClick = (user, indexx) => {
    setCheckHeart(!checkHeart);
    const newArray = favorite;
    let index = favorite.indexOf(user);
    if (index !== -1) {
      newArray.splice(index, 1);
    }
    localStorage.setItem("user", JSON.stringify(newArray));
  };

  // GET USER FAVORITE FROM LOCAL
  useEffect(() => {
    let getUsers = JSON.parse(localStorage.getItem("user"));
    setFavorite(getUsers);
  }, []);

  return (
    <Style.UserList>
      <Style.List>
        {favorite &&
          favorite.map((user, index) => {
            return (
              <Style.User
                key={index}
                onMouseEnter={() => handleMouseEnter(index)}
                onMouseLeave={handleMouseLeave}
              >
                <Style.UserPicture src={user.picture.large} alt="" />
                <Style.UserInfo>
                  <Text size="22px" bold>
                    {user.name.title} {user.name.first} {user.name.last}
                  </Text>
                  <Text size="14px">{user.email}</Text>
                  <Text size="14px">
                    {user.location.street.number} {user.location.street.name}
                  </Text>
                  <Text size="14px">
                    {user.location.city} {user.location.country}
                  </Text>
                </Style.UserInfo>
                <Style.IconButtonWrapper
                  style={{ opacity: "1" }}
                  onClick={() => handleClick(user)}
                >
                  <IconButton>
                    <FavoriteIcon color="error" />
                  </IconButton>
                </Style.IconButtonWrapper>
              </Style.User>
            );
          })}
        {isLoading && (
          <Style.SpinnerWrapper>
            <Spinner color="primary" size="45px" thickness={6} variant="indeterminate" />
          </Style.SpinnerWrapper>
        )}
      </Style.List>
    </Style.UserList>
  );
};

export default UserListFavorite;
