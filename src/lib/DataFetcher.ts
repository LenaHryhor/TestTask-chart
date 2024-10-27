
export interface IDataFetcher {
    fetchData<T>(url: string, params: Record<string, string>): Promise<T>;
}

export class DataFetcher implements IDataFetcher {

    constructor() {
    }

    private constructUrl(url: string, params: Record<string, string>): string {
        const _url = new URL(url);
        Object.keys(params).forEach(key => _url.searchParams.append(key, params[key]));
        return _url.toString();
    }

    async fetchData<T>(url: string, params: Record<string, string>): Promise<T> {
        const finalUrl = this.constructUrl(url, params);
        try {
            const response = await fetch(finalUrl);
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            const data = await response.json();
            return data as T;
        } catch (error) {
            console.error('Error fetching data:', error);
            throw error;
        }
    }
}