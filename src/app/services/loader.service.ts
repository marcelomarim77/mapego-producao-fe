import { Injectable } from '@angular/core';

import Swal from 'sweetalert2';

@Injectable({
    providedIn: 'root'
})
export class LoaderService {

    constructor() { }

    async show(message: string) {
        Swal.fire({
            title: message,
            allowOutsideClick: false,
            allowEscapeKey: false,
        });
        Swal.showLoading();
    }

    hide() {
        Swal.close();
    }
}
