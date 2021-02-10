const tutorialLocalStorageKey = "tutorial-key";

export function safelyLoadTutorialCookieFromLocalStorage() {
    try {
        const isFirstAccess = JSON.parse(
            window.localStorage.getItem(tutorialLocalStorageKey)
        );

        return isFirstAccess === null;
    } catch (e) {
        return true;
    }
}

export function saveFirstAccessToLocalStorage() {
    window.localStorage.setItem(tutorialLocalStorageKey, JSON.stringify(false));
}
