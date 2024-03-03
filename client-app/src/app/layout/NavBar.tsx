import {
  Button,
  Container,
  DropdownItem,
  DropdownMenu,
  Dropdown,
  Image,
  Menu,
  MenuItem,
} from "semantic-ui-react";
import { Link, NavLink } from "react-router-dom";
import { useStore } from "../stores/store";
import { observer } from "mobx-react-lite";

export default observer(function NavBar() {
  const {
    userStore: { user, logout, isLoggedIn },
  } = useStore();
  user;
  return (
    <Menu inverted fixed="top">
      <Container>
        {isLoggedIn ? (
          <>
            <Menu.Item as={NavLink} to="/" header>
              <img src="/assets/logo.png" style={{ marginRight: 10 }} />
              Reactivities
            </Menu.Item>
            <Menu.Item as={NavLink} to="/activities" name="Activities" />
            <Menu.Item as={NavLink} to="/errors" name="Errors" />
            <Menu.Item>
              <Button
                positive
                content="Create Activity"
                as={NavLink}
                to="/createActivity"
              />
            </Menu.Item>
            <MenuItem position="right">
              <Image
                avatar
                src={user?.image || "/assets/user.png"}
                spaced="right"
              />
              <Dropdown pointing="top left" text={user?.displayName}>
                <DropdownMenu>
                  <DropdownItem
                    as={Link}
                    to={`/profile/${user?.username}`}
                    text="My Profile"
                    icon="settings"
                  />
                  <DropdownItem onClick={logout} text="logout" icon="power" />
                </DropdownMenu>
              </Dropdown>
            </MenuItem>
          </>
        ) : (
          <Menu.Item as={NavLink} to="/" header>
            <img src="/assets/logo.png" style={{ marginRight: 10 }} />
            Reactivities
          </Menu.Item>
        )}
      </Container>
    </Menu>
  );
});
