import styles from "./App.module.css";
import NavBar from './components/NavBar';
import Container from "react-bootstrap/Container";
import { Route, Switch } from 'react-router-dom';
import './api/axiosDefaults';
import SignUpForm from "./page/auth/SignUpForm";
import SignInForm from "./page/auth/SignInForm";
import PostCreateForm from "./page/posts/PostCreateForm";


function App() {
  return (
    <div className={styles.App}>
      <NavBar />
      <Container className={styles.Main}>
        <Switch>
          <Route exact path="/" render={()=> <h1>Home Page</h1> } />
          <Route exact path="/signin" render={()=> <SignInForm /> } />
          <Route exact path="/signup" render={()=> <SignUpForm /> } />
          <Route exact path="/posts/create" render={() => <PostCreateForm />} />
          <Route render={()=> <p>Page Not Found!</p> } />
        </Switch>
      </Container>
    </div>
   
  );
}

export default App;