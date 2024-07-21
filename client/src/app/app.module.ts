import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { NodeColorClassPipe } from 'src/pipes/nodeColorClass.pipe';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { PathfindingVisualizationComponent } from './pathfinding-visualization/pathfinding-visualization.component';
import { NavbarComponent } from './navbar/navbar.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { FormsModule } from '@angular/forms';
import { DropdownComponent } from './dropdown/dropdown.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { GridNodesPipe } from 'src/pipes/gridNodes.pipe';

@NgModule({
  declarations: [
    AppComponent,
    PathfindingVisualizationComponent,
    NodeColorClassPipe,
    GridNodesPipe,
    NavbarComponent,
    DropdownComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FontAwesomeModule,
    FormsModule,
    BrowserAnimationsModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
