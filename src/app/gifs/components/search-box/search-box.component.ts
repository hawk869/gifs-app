import { Component } from '@angular/core';

@Component({
    selector: 'gifs-search-box',
    template: `
        <h5>Buscar:</h5>
        <input
            class="form-control"
            type="text"
            placeholder="Buscar gifs..."
        >
    `
})

export class SearchBoxComponent {
    constructor() { }
}