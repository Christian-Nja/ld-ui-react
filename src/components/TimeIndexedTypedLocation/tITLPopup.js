import { museumIcon, timeIcon } from '../../icon/ld-ui-icon';

export default function tITLPopup(content) {
    return `<div class="tITL-popup">
                ${museumIcon(`${content.siteLabel} (${content.city})`)}
                ${timeIcon(content.timeInterval)}
            </div>
            `;
}
