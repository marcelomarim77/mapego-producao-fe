import { Component, OnDestroy } from '@angular/core';
import { MediaChange, MediaObserver } from "@angular/flex-layout";
import { Subscription } from 'rxjs';

import { NavItem } from './ui/model/nav-item';
import { menu } from './ui/model/menu';

@Component({
  selector: 'app-features',
  templateUrl: './features.component.html',
  styleUrls: ['./features.component.css']
})
export class FeaturesComponent implements OnDestroy {

    public opened: boolean = true;
    public menu: NavItem[] = menu;
    private mediaWatcher: Subscription;

    softwareName = 'Nome do Software';

    constructor(private media: MediaObserver) {
        this.mediaWatcher = this.media.media$.subscribe((mediaChange: MediaChange) => {
            this.handleMediaChange(mediaChange);
        })
    }

    ngOnDestroy(): void {
        this.mediaWatcher.unsubscribe();
    }

    private handleMediaChange(mediaChange: MediaChange) {
        if (this.media.isActive('lt-md')) {
            this.opened = false;
        } else {
            this.opened = true;
        }
    }

}
