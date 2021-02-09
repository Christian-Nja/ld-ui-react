import Pipe from "../classes/Pipe";
import Filter from "../filters/Filter";
import { map } from "lodash";

export default class KnowledgeGraphPipe {
    constructor(knowledgeGraph) {
        this.knowledgeGraph = knowledgeGraph.copy();
        this.pipe = new Pipe(this.knowledgeGraph.getResources());
    }
    static create(knowledgeGraph) {
        return new KnowledgeGraphPipe(knowledgeGraph);
    }
    chain(filters) {
        // encapsulate generic filter callbacks in a callback that when
        // resource is discarded by filters drop it from knowledge graph
        const wrappedFilters = map(filters, (f) => {
            if (f.options.filterCallback) {
                const genericFilterCallback = f.options.filterCallback;
                return Filter.create({
                    id: f.id,
                    options: {
                        active: f.isActive(),
                        filterCallback: (r) => {
                            if (genericFilterCallback(r)) {
                                return r;
                            } else {
                                this.knowledgeGraph.removeResource(r.getUri());
                            }
                        },
                    },
                });
            } else {
                return filter;
            }
        });

        const newResources = this.pipe.chain(wrappedFilters).toArray();
        return this;
    }
    toGraph() {
        return this.knowledgeGraph;
    }
}
