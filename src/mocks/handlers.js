import { rest } from "msw";

const baseURL = "https://drf-api-recc-56264b48b50b.herokuapp.com/"

export const handlers = [
    rest.get(`${baseURL}dj-rest-auth/user/`, (req, res, ctx) => {
        return res(
            ctx.json({
                "pk": 12,
                "username": "Dave",
                "email": "",
                "first_name": "",
                "last_name": "",
                "profile_id": 12,
                "profile_image": "https://res.cloudinary.com/dj3sy6ut7/image/upload/v1/media/../default_prof_wfmwmp.png"
            })
        );
    }),
    rest.post(`${baseURL}dj-rest-auth/logout/`, (req, res, ctx) => {
        return res(ctx.status(200));
    }),
];