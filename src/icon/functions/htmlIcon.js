export default function htmlIcon(src, message) {
    return `
            <i>
                <img
                    class="ld-ui-div-icon"
                    src="${src}"
                 class="simple-icon"
                ></img>
                <p class="icon-description">${message}</p>
                <br />
            </i>
            `;
}
