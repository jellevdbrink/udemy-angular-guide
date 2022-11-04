import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { RouterModule, Routes } from "@angular/router";
import { SharedModule } from "../shared/shared.module";
import { AuthComponent } from "./auth.component";

const authRoutes: Routes = [
  { path: '', component: AuthComponent }
]

@NgModule({
  declarations: [AuthComponent],
  imports: [RouterModule.forChild(authRoutes), CommonModule, FormsModule, SharedModule]
})
export class AuthModule {}
