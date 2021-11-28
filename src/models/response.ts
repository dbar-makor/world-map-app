interface IServerResponseData {
    readonly success: boolean;
    readonly message: string;
};

export interface IGetCountriesDataResponse extends IServerResponseData {
    data?: {
        location: string;
        company1: number;
        company2: number;
        company3: number;
    }[];
};