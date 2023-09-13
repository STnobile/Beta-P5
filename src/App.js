import styles from "./App.module.css";
import NavBar from './components/NavBar';
import Container from "react-bootstrap/Container";
import { Route, Switch } from 'react-router-dom';
import './api/axiosDefaults';
import SignUpForm from "./page/auth/SignUpForm";
import SignInForm from "./page/auth/SignInForm";
import PostCreateForm from "./page/posts/PostCreateForm";
import PostPage from "./page/posts/PostPage";
import PostsPage from "./page/posts/PostsPage";
import { useCurrentUser } from "./contexts/CurrentUserContext";
import PostEditForm from "./page/posts/PostEditForm";
import ProfilePage from "./page/profiles/ProfilePage";
import UserNameForm from "./page/profiles/UserNameForm";
import UserPasswordForm from "./page/profiles/UserPasswordForm";
import ProfileEditForm from "./page/profiles/ProfileEditForm";


function App() {
  const currentUser = useCurrentUser();
  const profile_id = currentUser?.profile_id || "";

  return (
    <div className={styles.App}>
      <NavBar />
      <Container className={styles.Main}>
        <Switch>
          <Route
            exact
            path="/"
            render={() => (
              <PostsPage message="No results found. Adjust the search keyword." />
            )}
          />

          <Route
            exact
            path="/feed"
            render={() => (
              <PostsPage
                message="No results found. Adjust the search keyword or follow a user."
                filter={`owner__followed__owner__profile=${profile_id}&`}
              />
            )}
          />

          <Route
            exact
            path="/liked"
            render={() => (
              <PostsPage
                message="No results found. Adjust the search keyword or like a post."
                filter={`likes__owner__profile=${profile_id}&ordering=-likes__created_at&`}
              />
            )}
          />
          <Route exact path="/signin" render={() => <SignInForm />} />
          <Route exact path="/signup" render={() => <SignUpForm />} />
          <Route exact path="/posts/create" render={() => <PostCreateForm />} />
          <Route exact path="/posts/:id" render={() => <PostPage />} />
          <Route exact path="/posts/:id/edit" render={() => <PostEditForm />} />
          <Route exact path="/profiles/:id" render={() => <ProfilePage />} />
          <Route render={() => <p>Page Not Found!</p>} />
          <Route
            exact
            path="/profiles/:id/edit/username"
            render={() => <UserNameForm />}
          />
          <Route
            exact
            path="/profiles/:id/edit/password"
            render={() => <UserPasswordForm />}
          />
          <Route
            exact
            path="/profiles/:id/edit"
            render={() => <ProfileEditForm />}
          />
        </Switch>
      </Container>
    </div>

  );
}

export default App;