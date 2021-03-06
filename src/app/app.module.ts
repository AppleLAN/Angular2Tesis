import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule, NoopAnimationsModule } from '@angular/platform-browser/animations';
import { AppComponent } from './app.component';
import { routing } from './app.routes';
import { CoreModule } from './appsModule/core/core.module';
import { AuthGuard } from './services/auth.guard';

@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, BrowserAnimationsModule, NoopAnimationsModule, CoreModule, routing],
  providers: [AuthGuard],
  bootstrap: [AppComponent]
})
export class AppModule {}
