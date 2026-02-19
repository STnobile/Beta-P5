import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { BrowserRouter as Router } from 'react-router-dom';
import NavBar from "../NavBar";
import { useCurrentUser, useSetCurrentUser } from "../../contexts/CurrentUserContext";
import { axiosReq } from "../../api/axiosDefaults";

jest.mock("../../contexts/CurrentUserContext", () => ({
  useCurrentUser: jest.fn(),
  useSetCurrentUser: jest.fn(),
}));

jest.mock("../../api/axiosDefaults", () => ({
  axiosReq: {
    get: jest.fn(),
    post: jest.fn(),
  },
}));

test("renders NavBar", () => {
    useCurrentUser.mockReturnValue(null);
    useSetCurrentUser.mockReturnValue(jest.fn());

    render(
        <Router>
            <NavBar />
        </Router>
    );

    const signInLink = screen.getByRole('link', {name: /sign in/i});
    expect(signInLink).toBeInTheDocument();
});

test("renders link to the user profile for logged in user", async () => {
    useCurrentUser.mockReturnValue({
      profile_id: 12,
      profile_image: "https://example.com/avatar.png",
      username: "Dave",
    });
    useSetCurrentUser.mockReturnValue(jest.fn());

    render(
        <Router>
          <NavBar />
        </Router>
    );

    const profileAvatar = await screen.findByText('Profile');
    expect(profileAvatar).toBeInTheDocument();
});

test("renders Sign in and Sign up buttons again on log out", async () => {
    const setCurrentUser = jest.fn();
    useCurrentUser.mockReturnValue({
      profile_id: 12,
      profile_image: "https://example.com/avatar.png",
      username: "Dave",
    });
    useSetCurrentUser.mockReturnValue(setCurrentUser);
    axiosReq.get.mockResolvedValue({ status: 200 });
    axiosReq.post.mockResolvedValue({ status: 200 });

    render(
        <Router>
          <NavBar />
        </Router>
    );

    fireEvent.click(screen.getByText("Profile"));

    const signOutLink = await screen.findByRole("link", { name: /sign out/i });
    fireEvent.click(signOutLink);

    await waitFor(() => {
      expect(setCurrentUser).toHaveBeenCalled();
    });
    expect(axiosReq.get).toHaveBeenCalledWith("dj-rest-auth/csrf/");
    expect(axiosReq.post).toHaveBeenCalledWith("dj-rest-auth/logout/");
});
