import { Injectable } from '@angular/core';
import { StreamInt } from './streamInterface';

@Injectable({
  providedIn: 'root'
})
export class StreamListService {

  url = 'http://localhost:3000/streams';

  async getAllStreams(): Promise<StreamInt[]> {
    console.log(this.url)
    const data = await fetch(this.url);
    console.log('getall')
    console.log(await data)
    return await data.json() ?? [];
  }

  async getStreambyID(id: number): Promise<StreamInt | undefined> {
    const data = await fetch(`${this.url}/${id}`);
    return await data.json() ?? {};
  }

}
