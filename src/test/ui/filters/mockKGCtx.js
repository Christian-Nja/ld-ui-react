import * as KGCtx from "../../../knowledgegraph/KGCtx/useKGCtx";
import KnowledgeGraph from "../../../classes/KnowledgeGraph";

export default function mockKGCtx() {
    const mockedKGCtx = { knowledgeGraph: KnowledgeGraph.create() };
    jest.spyOn(KGCtx, "useKGCtx").mockImplementation(() => mockedKGCtx);
}
