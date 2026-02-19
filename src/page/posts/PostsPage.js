import React, { useEffect, useState } from "react";

import Form from "react-bootstrap/Form";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Container from "react-bootstrap/Container";

import Post from "./Post";
import Asset from "../../components/Asset";

import appStyles from "../../App.module.css";
import styles from "../../styles/PostsPage.module.css";
import { useLocation } from "react-router";
import { axiosReq } from "../../api/axiosDefaults";
import ErrorBanner from "../../components/ErrorBanner";

import NoResults from "../../assets/no-results.png";
import InfiniteScroll from "react-infinite-scroll-component";
import { fetchMoreData } from "../../utils/utils";
import PopularProfiles from "../profiles/PopularProfiles";

function PostsPage({ message, filter = "" }) {
  const [posts, setPosts] = useState({ results: [] });
  const [hasLoaded, setHasLoaded] = useState(false);
  const [error, setError] = useState("");
  const {pathname} = useLocation();

  const [query, setQuery] = useState("");
  const isFeed = pathname === "/feed";
  const isLiked = pathname === "/liked";
  const pageTitle = isFeed
    ? "Your Feed"
    : isLiked
      ? "Liked Stories"
      : "Museum Stories";
  const pageSubtitle = isFeed
    ? "Latest posts from people you follow."
    : isLiked
      ? "Posts you have appreciated most."
      : "Discover moments shared by the community.";

  useEffect(() => {
    let isMounted = true; // This will keep track of whether the component is still mounted
    const controller = new AbortController();
  
    const fetchPosts = async () => {
      try {
        const { data } = await axiosReq.get(
          `/posts/?${filter}search=${query}`,
          { signal: controller.signal }
        );
        if (isMounted) { // Only update the state if the component is still mounted
          setPosts(data);
          setHasLoaded(true);
        }
      } catch (err) {
        if (err.code === "ERR_CANCELED") return;
        if (isMounted) {
          setError("Something went wrong while loading posts.");
          setHasLoaded(true);
        }
      }
    };
  
    setHasLoaded(false);
    setError("");
    const timer = setTimeout(() => {
      fetchPosts();
    }, 1000);
  
    return () => {
      clearTimeout(timer);
      controller.abort();
      isMounted = false; 
    };
  }, [filter, query, pathname]);

  return (
    <Row className={`h-100 ${styles.PageRow}`}>
      <Col className={`py-2 p-0 p-lg-2 ${styles.MainCol}`} lg={8}>
        <PopularProfiles mobile />
        <Container className={`${appStyles.Content} ${styles.HeaderPanel}`}>
          <h1 className={styles.PageTitle}>{pageTitle}</h1>
          <p className={styles.PageSubtitle}>{pageSubtitle}</p>
          <i className={`fas fa-search ${styles.SearchIcon}`} />
          <Form
            className={styles.SearchBar}
            onSubmit={(event) => event.preventDefault()}
          >
            <Form.Control
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              type="text"
              className="mr-sm-2"
              placeholder="Search posts by title or summary"
              aria-label="Search posts"
            />
          </Form>
        </Container>

        {hasLoaded ? (
          <>
            {error ? (
              <Container className={appStyles.Content}>
                <ErrorBanner message={error} />
              </Container>
            ) : posts.results.length ? (
              <div className={styles.FeedList}>
                <InfiniteScroll
                  children={posts.results.map((post) => (
                    <Post key={post.id} {...post} setPosts={setPosts} />
                  ))}
                  dataLength={posts.results.length}
                  loader={<Asset spinner />}
                  hasMore={!!posts.next}
                  next={() =>
                    fetchMoreData(
                      posts,
                      setPosts,
                      setError,
                      "Something went wrong while loading more posts."
                    )
                  }
                />
              </div>
            ) : (
              <Container className={appStyles.Content}>
                <Asset src={NoResults} message={message} />
              </Container>
            )}
          </>
        ) : (
          <Container className={appStyles.Content}>
            <Asset spinner />
          </Container>
        )}
      </Col>
      <Col md={4} className={`d-none d-lg-block p-0 p-lg-2 ${styles.SideCol}`}>
        <PopularProfiles />
      </Col>
    </Row>
  );
}

export default PostsPage;
