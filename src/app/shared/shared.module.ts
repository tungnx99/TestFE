import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ModalHeaderComponent } from './components/modals/modal-header/modal-header.component';
import { ModalFooterComponent } from './components/modals/modal-footer/modal-footer.component';
import { BreadcrumbComponent } from './components/breadcrumb/breadcrumb.component';
import { FooterComponent } from './components/footer/footer.component';
import { HeaderComponent } from './components/header/header.component';
import { RightSidebarComponent } from './components/right-sidebar/right-sidebar.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { ContentLayoutComponent } from './layout/content-layout/content-layout.component';
import { RouterModule } from '@angular/router';
import { NavService } from './service/nav.service';
import { WINDOW_PROVIDERS } from './service/windows.service';
import { FeatherIconsComponent } from './components/feather-icons/feather-icons.component';
import { ToggleFullscreenDirective } from './directives/fullscreen.directive';

@NgModule({
  imports: [CommonModule, RouterModule],
  declarations: [
    ToggleFullscreenDirective,
    FeatherIconsComponent,
    ModalHeaderComponent,
    ModalFooterComponent,
    FooterComponent,
    HeaderComponent,
    SidebarComponent,
    ContentLayoutComponent,
    BreadcrumbComponent,
    RightSidebarComponent,
  ],
  exports: [
    FeatherIconsComponent,
    ToggleFullscreenDirective,
    ModalHeaderComponent,
    ModalFooterComponent,
  ],
  providers: [NavService, WINDOW_PROVIDERS],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class SharedModule {}
