import { REACT_APP_MOVIES_API_BASE_PATH } from "../../config";
import { BaseApi } from "./BaseApi";

class BeatfilmMoviesApi extends BaseApi {
    public getMovies() {
        return this._request('/beatfilm-movies');
    }
}

export const beatfilmMoviesApi = new BeatfilmMoviesApi({
    baseUrl: REACT_APP_MOVIES_API_BASE_PATH,
});
