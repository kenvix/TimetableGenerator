import jQuery from 'jquery';
import { contactUs, modalAlert, parseMcColor, scrollToEl, showModal, goToPage, createAndDownloadFile } from "./utils";
import { userClasses, reloadClass, reloadAllClasses, exportClasses} from "./index"

window.$ = window.jQuery = jQuery;
window.showModal = showModal;
window.alert = modalAlert;
window.scrollToEl = scrollToEl;
window.parseMcColor = parseMcColor;
window.contactUs = contactUs;
window.goToPage = goToPage;
window.createAndDownloadFile = createAndDownloadFile;

window.userClasses = userClasses;
window.reloadClass = reloadClass;
window.reloadAllClasses = reloadAllClasses;
window.exportClasses = exportClasses;

//window.markdown = options => new MarkdownIt(options).use(lazyHeaders);
