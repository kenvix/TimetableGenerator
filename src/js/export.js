import jQuery from 'jquery';
import { contactUs, modalAlert, parseMcColor, scrollToEl, showModal, goToPage } from "./utils";

window.$ = window.jQuery = jQuery;
window.showModal = showModal;
window.alert = modalAlert;
window.scrollToEl = scrollToEl;
window.parseMcColor = parseMcColor;
window.contactUs = contactUs;
window.goToPage = goToPage;

window.markdown = options => new MarkdownIt(options).use(lazyHeaders);
