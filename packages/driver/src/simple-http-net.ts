import { Net } from "./interfaces";
import { SimpleNet } from "./simple-net"

export class SimpleHttpNet extends SimpleNet {

    public override async http(
        method: 'GET' | 'POST',
        path: string,
        params?: Net.Params): Promise<any> {
            try {
                const resp = await this.axios.request({
                    method,
                    url: path,
                    data: params.body,
                    headers: params.headers,
                    params: params.query,
                    withCredentials: true
                })
                if (params.validateResponseHeader) {
                    params.validateResponseHeader(resp.headers)
                }
                return resp.data
            } catch (err) {
                if (err.isAxiosError) {
                    throw convertError(err)
                }
                throw new Error(`${method} ${resolve(this.baseURL, path)}: ${err.message}`)
            }
        }

}