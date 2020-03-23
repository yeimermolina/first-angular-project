import { Component, Output, EventEmitter } from "@angular/core";

@Component({
  selector: "app-header",
  templateUrl: "./header.component.html"
})
export class HeaderComponent {
  @Output() onLinkClick = new EventEmitter<string>();

  handleClickLink(event: Event, section: string) {
    event.preventDefault();
    this.onLinkClick.emit(section);
  }
}
