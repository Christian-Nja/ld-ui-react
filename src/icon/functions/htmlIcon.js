export default function htmlIcon(src, message, customClass) {
    return `
            <i>
                <img
                    class="ld-ui-div-icon"
                    src="${src}"
                 class="simple-icon"
                ></img>
                <p class="icon-description cultural-property-click">${message}</p>
                <br />
            </i>
            `;
}
