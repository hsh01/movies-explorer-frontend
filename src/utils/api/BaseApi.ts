type ApiError = {
    status: number;
    statusText: string;
    body?: any;
}

const json_or_error = async (res: Response) => {
    if (res.ok) {
        return await res.json();
    }
    const err: ApiError = {
        status: res.status,
        statusText: res.statusText,
        body: (await res.json()).message ?? await res.text()
    }
    return Promise.reject(err);
}

export class BaseApi {
    private _baseUrl: string;
    private readonly _headers: HeadersInit;

    constructor({baseUrl, headers}: any) {
        this._baseUrl = baseUrl;
        this._headers = headers;
    }

    _request(path: string, options: RequestInit | undefined = undefined, withCredentials: boolean = false) {
        options = {
            ...options,
            headers: {...options?.headers, ...this._headers},
        };
        if (withCredentials) {
            options['credentials'] = 'include';
        }
        return fetch(`${this._baseUrl}${path}`, options)
            .then(json_or_error);
    }

}