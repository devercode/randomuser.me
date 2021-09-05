import React, { useEffect, useState } from "react";
import Text from "../Text/Text";
import Spinner from "../Spinner/Spinner";
import CheckBox from "../CheckBox/CheckBox";
import IconButton from "@material-ui/core/IconButton";
import FavoriteIcon from "@material-ui/icons/Favorite";
import * as Style from "./style";
import axios from "axios";
import { usePeopleFetch } from "../../hooks/usePeopleFetch";
import { useLocalStorage } from "@rehooks/local-storage";

const UserList = ({}) => {
  const {
    users,
    isLoading,
    setUsers,
    page,
    setPage,
    selectNat,
    setSelectNat,
    fetchUsersSelect,
    fetchUsers,
  } = usePeopleFetch();
  const [hoveredUserId, setHoveredUserId] = useState();
  const [checkHandleChange, setCheckHandleChange] = useState(false);
  const [checkHeart, setCheckHeart] = useState(false);
  const [favorite, setFavorite] = useState([]);
  const [arrayTemp, setArrayTemp] = useState();
  const [nation, setNation] = useState([
    { value: "AU", label: "Brazil" },
    { value: "BR", label: "Australia" },
    { value: "CA", label: "Canada" },
    { value: "CH", label: "Switzerland" },
    { value: "DE", label: "Germany" },
    { value: "DK", label: "Denmark" },
    { value: "ES", label: "Spain" },
    { value: "FI", label: "Finland" },
    { value: "FR", label: "France" },
    { value: "GB", label: "United Kingdom" },
    { value: "IE", label: "Ireland" },
    { value: "IR", label: "Iran" },
    { value: "NO", label: "Norway" },
    { value: "NL", label: "Netherlands" },
    { value: "NZ", label: "New Zealand" },
    { value: "TR", label: "Turkey" },
    { value: "US", label: "United States" },
  ]);

  const handleMouseEnter = (index) => {
    setHoveredUserId(index);
  };

  const handleMouseLeave = () => {
    setHoveredUserId();
  };

  // FUNCTION CLICK ICON HEART TO GET FAVORITE USERS
  const handleClick = (user, indexx) => {
    user.clicked = !user.clicked;
    setCheckHeart(!checkHeart);
    let newArray = favorite;
    let index = favorite.indexOf(user);
    if (index === -1) {
      newArray.push(user);
    } else {
      newArray.splice(index, 1);
    }
    localStorage.setItem("user", JSON.stringify(newArray));
  };

  // FUNCTION CHECKBOX FILTER
  const handleChangeCheck = (value) => {
    let newArray = selectNat;
    let index = selectNat.indexOf(value);
    if (index === -1) {
      newArray.push(value);
    } else {
      newArray.splice(index, 1);
    }
    setSelectNat(newArray);
    setCheckHandleChange(!checkHandleChange);
  };

  // SET CONDITION TO GET USERS FILTER
  useEffect(() => {
    if (selectNat.toString() !== "") {
      fetchUsersSelect(page);
    } else {
      fetchUsers(page);
    }
  }, [checkHandleChange]);

  // SCROLL LOAD MORE USER
  const handleScroll = (e) => {
    const { scrollTop, clientHeight, scrollHeight } = e.currentTarget;
    if (scrollHeight - scrollTop === clientHeight) {
      setPage((prev) => prev + 5);
    }
  };

  return (
    <Style.UserList>
      <Style.Filters>
        {/* SHOW OPTION SELECT NATION */}
        {nation.map((na, index) => (
          <CheckBox
            key={index}
            value={na.value}
            label={na.label}
            onChange={handleChangeCheck}
          />
        ))}
      </Style.Filters>
      <Style.List onScroll={handleScroll}>
        {users &&
          users.map((user, index) => {
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
                  isVisible={index === hoveredUserId}
                  style={{ opacity: user.clicked ? "1" : "" }}
                >
                  <IconButton onClick={() => handleClick(user, index)}>
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

export default UserList;
