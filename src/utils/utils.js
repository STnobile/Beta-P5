import jwtDecode from "jwt-decode";
import { axiosReq } from "../api/axiosDefaults"

export const getErrorMessage = (
  err,
  fallback = "Something went wrong. Please try again."
) => {
  const responseData = err?.response?.data;
  if (!responseData) return fallback;

  if (typeof responseData === "string") {
    return responseData;
  }

  if (typeof responseData.detail === "string") {
    return responseData.detail;
  }

  if (typeof responseData.error === "string") {
    return responseData.error;
  }

  if (Array.isArray(responseData.non_field_errors) && responseData.non_field_errors.length) {
    return responseData.non_field_errors[0];
  }

  const firstFieldError = Object.values(responseData).find(
    (value) => Array.isArray(value) && value.length
  );
  if (firstFieldError) {
    return firstFieldError[0];
  }

  return fallback;
};

export const fetchMoreData = async (
  resource,
  setResource,
  setError,
  fallbackErrorMessage
) => {
  try {
    const { data } = await axiosReq.get(resource.next);
    setResource((prevResource) => ({
      ...prevResource,
      next: data.next,
      results: data.results.reduce((acc, cur) => {
        return acc.some((accResult) => accResult.id === cur.id)
          ? acc
          : [...acc, cur];
      }, prevResource.results),
    }));
  } catch (err) {
    if (setError) {
      setError(getErrorMessage(err, fallbackErrorMessage));
    }
  }
};

export const followHelper = (profile, clickedProfile, following_id) => {
  return profile.id === clickedProfile.id
    ? // this is the profile I click on,
    // update its followers count and set its following id
    {
      ...profile,
      followers_count: profile.followers_count + 1,
      following_id,
    }
    : profile.is_owner
      ? // this is the profile of the logged in user
      // update its following count
      { ...profile, following_count: profile.following_count + 1 }
      :  // this is not the profile the user clicked on the profile
      // the user owns, so just return it unchanged.
      profile;
};

export const unfollowHelper = (profile, clickedProfile) => {
  return profile.id === clickedProfile.id
    ? // This is the profile I clicked on,
    // update its followers count and set its following id
    {
      ...profile,
      followers_count: profile.followers_count - 1,
      following_id: null,
    }
    : profile.is_owner
      ? // This is the profile of the logged in user
      // update its following count
      { ...profile, following_count: profile.following_count - 1 }
      : // this is not the profile the user clicked on or the profile
      // the user owns, so just return it unchanged
      profile;
};

export const setTokenTimestamp = (data) => {
  const refreshTokenTimestamp = jwtDecode(data?.refresh_token).exp;
  localStorage.setItem("refreshTokenTimestamp", refreshTokenTimestamp);
};

export const shouldRefreshToken = () => {
  const refreshTokenTimestamp = localStorage.getItem("refreshTokenTimestamp");
  if (!refreshTokenTimestamp) return false;
  return parseInt(refreshTokenTimestamp, 10) > Math.floor(Date.now() / 1000);
};

export const removeTokenTimestamp = () => {
  localStorage.removeItem("refreshTokenTimestamp")
};
