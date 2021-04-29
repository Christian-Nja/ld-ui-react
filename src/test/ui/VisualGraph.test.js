import { configure, shallow, mount } from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import React from "react";
import VisualGraph from "../../components/KnowledgeGraph/VisualGraph";

configure({ adapter: new Adapter() }); //enzyme - react 16 hooks support

describe("<VisualGraph />", () => {
    it("renders without explode", () => {
        shallow(<VisualGraph />);
    });
});
