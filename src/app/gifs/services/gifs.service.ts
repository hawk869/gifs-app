import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Gif, SearchResponse } from '../interfaces/gifs.interfaces';

@Injectable({providedIn: 'root'})
export class GifsService {

    private _tagsHistory: string[] = [];
    private apiKey: string = 'HlMjX6oSN0hIpJJ8GlFo8FamPoaSWFKu';
    private serviceUrl: string = 'https://api.giphy.com/v1/gifs';
    public gifsList: Gif[] = [];

    constructor( private http: HttpClient ) { }

    get tagsHistory() {
        return [...this._tagsHistory];
    }
    
    async searchTag( tag: string ): Promise<void> {
        if ( tag.length === 0 ) return;
        this.organizeHistory( tag.toLowerCase() );
        // fetch('https://api.giphy.com/v1/gifs/search?api_key=HlMjX6oSN0hIpJJ8GlFo8FamPoaSWFKu&q=valorant&limit=10')
        // .then( resp => resp.json() )
        // .then( data => console.log(data));
        const params = new HttpParams()
            .set('api_key', this.apiKey)
            .set('limit', 10)
            .set('q', tag);

        this.http.get<SearchResponse>(`${this.serviceUrl}/search`, { params })
            .subscribe( resp => {
                this.gifsList = resp.data;
                console.log({ gifs: this.gifsList })
            });
    }

    organizeHistory( tag: string ) {
        if ( this._tagsHistory.includes( tag )) {
            this._tagsHistory = this._tagsHistory.filter( (oldTag) => oldTag !== tag );
        }
        this._tagsHistory.unshift( tag );
        this._tagsHistory = this._tagsHistory.splice( 0,10 );
    }
}