import { NgModule } from "@angular/core"
import { CommonModule } from "@angular/common";
import { HttpClientModule } from "@angular/common/http";
import { RouterModule } from "@angular/router";
import { NavComponent } from "./nav.component";

@NgModule({
    declarations: [
    ],
    imports: [
        RouterModule,
        CommonModule,
        HttpClientModule,
        NavComponent
    ],
    exports: [
        NavComponent,
    ]
})
export class NavModule {}