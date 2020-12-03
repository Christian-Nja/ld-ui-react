import { museumIcon, timeIcon, locationIcon } from "../../icon/ld-ui-icon";

// ${museumIcon(`${content.siteLabel} (${content.city})`)}

export default function tITLPopup(content) {
    return `<div class="tITL-popup">
                ${museumIcon(content.culturalProperty)}
                ${timeIcon(content.timeInterval)}
                ${locationIcon(`${content.locationType} (${content.address})`)}
            </div>
            `;
}
