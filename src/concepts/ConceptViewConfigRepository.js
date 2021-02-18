export default class ConceptViewConfigRepository {
    upsert(conceptId, newViewConfig) {
        window.sessionStorage.setItem(
            `view_config-${conceptId}`,
            JSON.stringify(newViewConfig)
        );
    }
    read(conceptId) {
        try {
            return JSON.parse(
                window.sessionStorage.getItem(`view_config-${conceptId}`)
            );
        } catch (e) {
            return undefined;
        }
    }
    remove() {}
}
