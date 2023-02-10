import axios from "axios";

const BASE_URL = process.env.REACT_APP_BASE_URL || "http://localhost:5001";

/** API Class.
 *
 * Static class tying together methods used to get/send to to the API.
 * There shouldn't be any frontend-specific stuff here, and there shouldn't
 * be any API-aware stuff elsewhere in the frontend.
 *
 */

class ShareBnBApi {

    static token = '';

    static async request(endpoint, data = {}, method = "get") {
        console.debug("API Call:", endpoint, data, method);

        const url = `${BASE_URL}/${endpoint}`;
        const headers = { Authorization: `Bearer ${ShareBnBApi.token}` };
        const params = (method === "get")
          ? data
          : {};

        try {
          return (await axios({ url, method, data, params, headers })).data;
        } catch (err) {
          console.error("API Error:", err.response);
          let message = err.response.data.error.message;
          throw Array.isArray(message) ? message : [message];
        }
    }

    // Individual API Routes
//#####################################################################
// LISTING ROUTES

    /** Get listings */

    static async getListings() {
        let res = await this.request('');
        return res.listings;
    }

    /** Get details for listing on a listing id */

    static async getListing(id) {
        let res = await this.request(`listing/${id}`);
        return res.listing;
    }

    /**Create new listing */

    static async createListing(data) {
        let res = await this.request(`listing`, data, "post");
        return res.listing;
    }


//#####################################################################
// USER ROUTES

    /** User signup */

    static async signup(data) {
        let res = await this.request(`signup`, data, "post");
        this.token = res.token
        return res.user;
    }

    /** User login */

    static async login(data) {
        let res = await this.request(`login`, data, "post");
        this.token = res.token
        return res.user;
    }
}

export default ShareBnBApi;